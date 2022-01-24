# Shadow DOM

Shadow DOM API provides a way of creating encapsulated web components by attaching a hidden separated DOM to an element.

## Terminologies

- **Shadow Host:** The host (regular) element in the DOM to which the shadow DOM is attached to.
- **Shadow Tree:** The DOM tree inside the shadow DOM.
- **Shadow Boundary:** The place where the shadow DOM ends and regular DOM begins.
- **Shadow Root:** Root node of the shadow tree.

## Basics

`Element.attachShadow()` can be used to attach a shadow DOM to an element.

```js
const element = document.getElementById("someElement");
const shadowDOM = element.attachShadow({ mode: "open" });
```

For the mode, `open` makes the shadow DOM accessible from the main page's context (regular DOM). The shadow DOM cannot be accessed if the mode is set to `closed`.

Accessing shadow DOM.

```js
const shadowDOM = element.shadowRoot;
```
