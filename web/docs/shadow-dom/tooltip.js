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

customElements.define("tooltip-info", TooltipElement);
