/**
 * tdeb.js v3 - Tiny DOM Element Builder
 * DOM elements without the pain. Zero dependencies. No Virtual DOM.
 *
 * @author Shinon
 * @license MIT
 */
export const htmlToNodes=e=>{let t=document.createElement("template");return t.innerHTML=e,t.content};export const interleave=(e,t)=>e.flatMap(e=>[e,t]).slice(0,-1);export const el=(e,t,s)=>{let n=document.createElement(e),l={},r=[];for(let[a,o]of(null!=t&&(Array.isArray(t)||"string"==typeof t||"number"==typeof t||t instanceof Node)?r=t:(l=t||{},r=s||[]),Object.entries(l)))if(null!=o){if(a.startsWith("on")&&"function"==typeof o)n.addEventListener(a.substring(2).toLowerCase(),o);else if("className"===a||"classList"===a||"class"===a)Array.isArray(o)?n.className=o.filter(Boolean).join(" "):"string"==typeof o&&(n.className=o);else if("dataset"===a&&"object"==typeof o)for(let[i,f]of Object.entries(o))n.dataset[i]=f;else"style"===a&&"object"==typeof o?Object.assign(n.style,o):a in n?n[a]=o:n.setAttribute(a,o)}let c=e=>{null!=e&&!1!==e&&(Array.isArray(e)?e.forEach(c):e instanceof Node?n.appendChild(e):n.appendChild(document.createTextNode(String(e))))};return c(r),n};