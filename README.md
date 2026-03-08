# tdeb.js (Tiny DOM Element Builder)

A zero-dependency, lightweight JavaScript utility for building native DOM elements.

`tdeb.js` is a wrapper around `document.createElement`. It was written to help build standard web interfaces without the overhead, build steps, or complexity of modern virtual DOM frameworks. It is designed for projects where you want to write vanilla JavaScript but need a slightly more ergonomic way to compose DOM nodes.

## Motivation

When building simple Single Page Applications (SPAs) or retro-style web projects, adding a heavy framework or a build step is often unnecessary. However, manually writing `document.createElement` and `setAttribute` repeatedly becomes tedious. 

`tdeb.js` aims to solve this by providing a functional approach to DOM creation. It maps directly to standard HTML properties and provides a few essential quality-of-life features:

*   **No build tools required:** It is a single file that can be dropped into any project.
*   **Text handling by default:** Children are appended using `document.createTextNode`, meaning strings are safely rendered as text rather than parsed as HTML.
*   **Conditional classes:** It handles arrays for `class` attributes, automatically filtering out falsy values.
*   **Conditional children:** It ignores null, undefined, or false values in child arrays, making ternary rendering straightforward.

## Installation

The recommended approach is simply to copy the `tdeb.js` file into your project repository. 

Alternatively, if you prefer package managers or rely on CDNs, it is published on npm:

```bash
npm install @ristellise/tdeb.js
```

Or via CDN:
```html
<script type="module">
  import { el } from 'https://cdn.jsdelivr.net/npm/@ristellise/tdeb.js@latest/tdeb.min.js';
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
Takes an HTML string and returns a `DocumentFragment` using a `<template>` element. 
*Warning: This function does not sanitize input. It should only be used with trusted or static strings.*

### `interleave(arr, item)`
A utility function that inserts a specified item between every element in an array. Useful for adding visual dividers between lists of elements.

## Usage Examples

**Basic Element Creation:**
```javascript
import { el } from './tdeb.js';

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
    class:['wrapper', isActive && 'active', hasError && 'error']
});
// Renders: <div class="wrapper active"></div>
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
// Renders: <div data-user-id="123" data-role="member"></div>
```

## Using with AI Assistants

Because `tdeb.js` relies strictly on standard HTML attributes rather than a custom DSL (Domain Specific Language), it works very well with Large Language Models (like Claude, Gemini, or ChatGPT). 

If you are generating code, you can provide the `tdeb.js` source code (or the provided `llms.txt` file) to the assistant as context. This helps the model output standard, framework-agnostic JavaScript instead of defaulting to React or Vue boilerplate. 

## Limitations

It is important to understand what `tdeb.js` is not. 

*   **It is not a framework.** It has no concept of state management, lifecycle hooks, or reactivity.
*   **It does not have a router.** 
*   **It uses real DOM manipulation.** There is no Virtual DOM or intelligent diffing. If you need to update a component, you must manually update the DOM node's properties or replace it entirely.

If your application requires complex, two-way data binding, global state management, or highly granular reactive updates, `tdeb.js` is likely the wrong tool for the job. In those cases, adopting a standard framework like React, Vue, or Svelte is highly recommended. 

## License

MIT