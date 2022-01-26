# Shadow DOM

Shadow DOM API provides a way of creating encapsulated web components by attaching a hidden separated DOM to an element.

**Link:** <https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM>

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

## Example Web Component

```js
class TooltipElement extends HTMLElement {
  #shadowDOM = null;
  #wrapper = null;

  constructor() {
    super();

    // Attach shadow DOM to this element.
    this.#shadowDOM = this.attachShadow({ mode: "open" });
    // Create and append elements to the DOM.
    this.#createStyles();
    this.#createWrapper();
    this.#createTooltip();

    this.#shadowDOM.appendChild(this.#wrapper);
  }

  #createWrapper() {
    this.#wrapper = document.createElement("span");
    this.#wrapper.classList.add("wrapper");
    this.#wrapper.setAttribute("tabindex", 0);
    this.#wrapper.innerHTML = this.innerHTML;
  }

  #createTooltip() {
    const span = document.createElement("span");
    span.classList.add("tooltip");
    span.textContent = this.dataset.tooltip;

    this.#wrapper.appendChild(span);
  }

  #createStyles() {
    const style = document.createElement("style");
    style.textContent = `
    .wrapper {
      position: relative;
      width: 200px;
    }

    .wrapper:hover > .tooltip, .wrapper:focus > .tooltip {
      display: block;
    }

    .tooltip {
      position: absolute;
      left: 50%;
      top: 110%;
      transform: translateX(-50%);
      padding: 0.25rem;
      color: white;
      background: dimgray;
      display: none;
    }
    `;

    this.#shadowDOM.appendChild(style);
  }
}
```

### Defining a Custom Element

```js
customElements.define("tooltip-info", TooltipElement);
```

```xml
<tooltip-info data-tooltip="Some tooltip">Data tooltip is added to</tooltip-info>
```

### External Styles

External styles can also be added to the shadow DOM using the `<link>` element like we normally do in a regular DOM.

```js
const link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", "styles.css");

shadowDOM.appendChild(link);
```
