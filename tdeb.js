/**
 * tdeb.js v3 - Tiny DOM Element Builder
 * DOM elements without the pain. Zero dependencies. No Virtual DOM.
 * 
 * @author Shinon
 * @license MIT
 */

(function (global) {
  "use strict";

  function htmlToNodes(string) {
    var tmp = document.createElement("div");
    tmp.innerHTML = string;
    var frag = document.createDocumentFragment();
    while (tmp.firstChild) {
      frag.appendChild(tmp.firstChild);
    }
    return frag;
  }

  function interleave(arr, x) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      result.push(arr[i]);
      if (i < arr.length - 1) {
        result.push(x);
      }
    }
    return result;
  }

  function el(tag, arg1, arg2) {
    var element = document.createElement(tag);
    var props = {};
    var children = [];

    if (
      arg1 !== undefined &&
      arg1 !== null &&
      (Object.prototype.toString.call(arg1) === "[object Array]" ||
        typeof arg1 === "string" ||
        typeof arg1 === "number" ||
        (arg1 && arg1.nodeType))
    ) {
      children = arg1;
    } else {
      props = arg1 || {};
      children = arg2 || [];
    }

    for (var key in props) {
      if (!props.hasOwnProperty(key)) continue;
      var val = props[key];
      if (val === undefined || val === null) continue;

      if (key.indexOf("on") === 0 && typeof val === "function") {
        element.addEventListener(key.substring(2).toLowerCase(), val, false);
      } else if (
        key === "className" ||
        key === "classList" ||
        key === "class"
      ) {
        if (Object.prototype.toString.call(val) === "[object Array]") {
          var filtered = [];
          for (var i = 0; i < val.length; i++) {
            if (val[i]) filtered.push(val[i]);
          }
          element.className = filtered.join(" ");
        } else if (typeof val === "string") {
          element.className = val;
        }
      } else if (key === "dataset" && typeof val === "object") {
        for (var dataKey in val) {
          if (!val.hasOwnProperty(dataKey)) continue;
          if (element.dataset) {
            element.dataset[dataKey] = val[dataKey];
          } else {
            var attrName =
              "data-" + dataKey.replace(/([A-Z])/g, "-$1").toLowerCase();
            element.setAttribute(attrName, val[dataKey]);
          }
        }
      } else if (key === "style" && typeof val === "object") {
        for (var styleKey in val) {
          if (val.hasOwnProperty(styleKey)) {
            element.style[styleKey] = val[styleKey];
          }
        }
      } else {
        if (key in element) {
          element[key] = val;
        } else {
          element.setAttribute(key, val);
        }
      }
    }

    function append(c) {
      if (c === undefined || c === null || c === false) return;
      if (Object.prototype.toString.call(c) === "[object Array]") {
        for (var j = 0; j < c.length; j++) {
          append(c[j]);
        }
      } else if (c && c.nodeType) {
        element.appendChild(c);
      } else {
        element.appendChild(document.createTextNode(String(c)));
      }
    }
    append(children);

    return element;
  }

  // Export for CommonJS (Node/Browserify) or attach to global window
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      el: el,
      htmlToNodes: htmlToNodes,
      interleave: interleave,
    };
  } else {
    global.el = el;
    global.htmlToNodes = htmlToNodes;
    global.interleave = interleave;
  }
})(typeof window !== "undefined" ? window : this);
