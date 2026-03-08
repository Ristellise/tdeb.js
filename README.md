# tdeb.js (Tiny DOM Element Builder)

A zero-dependency, lightweight JavaScript utility for building native DOM elements.

`tdeb.js` is a wrapper around `document.createElement`. It was written to help build standard web interfaces without the overhead, build steps, or complexity of virtual DOM frameworks. It is designed for projects where you want to write vanilla JavaScript but require a more ergonomic way to compose DOM nodes.

## Distribution and Compatibility

To provide maximum compatibility while still taking advantage of modern JavaScript engine optimizations, this library is distributed as two separate files:

*   **`tdeb.mjs` (Modern ES Module):** Written in ES6+. It utilizes modern JavaScript features like arrow functions, `Object.entries`, and `flatMap`. It is intended for modern bundlers, Node.js environments supporting ES modules, and modern browsers using `<script type="module">`.
*   **`tdeb.js` (Legacy CommonJS / Global):** Written in pure ES5. It uses `var`, standard function declarations, and manual DOM iteration. It is intended for older Node.js environments (`require`), legacy browsers, or as a drop-in global script without a module system.

## Installation

If you are using a package manager, install via npm:

```bash
npm install @ristellise/tdeb.js
```

The package includes an `exports` map that will automatically route bundlers and Node.js to the correct file (`.mjs` for `import`, `.js` for `require`).

### Browser Usage (ES Modules)

For modern web projects, import the `.mjs` file directly:

```html
<script type="module">
  import { el } from 'https://cdn.jsdelivr.net/npm/@ristellise/tdeb.js@latest/tdeb.mjs';
  
  const container = el('div', { class: 'wrapper' }, 'Hello World');
  document.body.appendChild(container);
</script>
```

### Browser Usage (Global Script)

If you are not using ES modules or need to support older browsers, include the `.js` file via a standard script tag. The functions (`el`, `htmlToNodes`, `interleave`) will be attached to the global `window` object automatically.

```html
<script src="https://cdn.jsdelivr.net/npm/@ristellise/tdeb.js@latest/tdeb.js"></script>
<script>
  var container = el('div', { class: 'wrapper' }, 'Hello World');
  document.body.appendChild(container);
</script>
```

## API Reference

### `el(tag, [props], [children])`
Creates and returns an `HTMLElement`.

*   `tag` (String): The HTML tag to create (e.g., `'div'`, `'button'`).
*   `props` (Object, Optional): An object representing HTML attributes, properties, and event listeners.
*   `children` (Array | String | Node, Optional): The elements or text to append inside the created node.

*Note: The arguments shift dynamically. If you pass an array or string as the second argument, it will be treated as the `children`, allowing you to omit the `props` object entirely if it is not needed.*

### `htmlToNodes(string)`
Takes an HTML string and returns a `DocumentFragment`. 
*Warning: This function does not sanitize input. It should only be used with trusted or static strings.*

### `interleave(arr, item)`
A utility function that inserts a specified item between every element in an array. Useful for adding visual dividers between lists of elements.

## Usage Examples

**Basic Element Creation:**
```javascript
import { el } from '@ristellise/tdeb.js';

const button = el('button', { 
    id: 'submit-btn',
    onclick: () => alert('Clicked') 
}, 'Click Me');

document.body.appendChild(button);
```

**Conditional Classes:**
You can pass an array to the `class` or `className` property. Falsy values are ignored.

```javascript
const isActive = true;
const hasError = false;

const container = el('div', {
    class: ['wrapper', isActive && 'active', hasError && 'error']
});
```

**Conditional Rendering & Nesting:**
Arrays of children work similarly. If a condition evaluates to false, it is simply skipped.

```javascript
const showBadge = false;

const userCard = el('div', { class: 'card' },[
    el('h2', 'User Profile'),
    el('p', 'A simple description.'),
    showBadge && el('span', { class: 'badge' }, 'Admin')
]);
```

**Data Attributes:**
Data attributes can be passed as a nested object for cleaner grouping.

```javascript
const item = el('div', {
    dataset: {
        userId: '123',
        role: 'member'
    }
});
```

## Using with AI Assistants

Because `tdeb.js` relies strictly on standard HTML attributes rather than a custom DSL (Domain Specific Language), it works very well with Large Language Models. 

If you are generating code, you can provide the `tdeb.js` source code or the provided `llms.txt` file to the assistant as context. This helps the model output standard, framework-agnostic JavaScript instead of defaulting to React or Vue boilerplate. 

## Limitations

`tdeb.js` is not: 

*   **A framework.** It has no concept of state management, lifecycle hooks, or reactivity.
*   **A router.**
*   **A Virtual DOM.** It does not perform intelligent diffing. 

If your application requires complex, two-way data binding, global state management, or highly granular reactive updates, `tdeb.js` is likely the wrong tool for the job. In those cases, adopting a standard framework like React, Vue, or Svelte is recommended. 

## License

MIT