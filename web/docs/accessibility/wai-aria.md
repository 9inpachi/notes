# WAI-ARIA

Web Accessibility Initiative - Accessibility Rich Internet Applications

WAI-ARIA is a specification written by the W3C (World Wide Web Consortium) that defines additional attributes which can be applied to elements for additional semantics and improve accessibility.

## Links

- **Specification:** <https://www.w3.org/TR/wai-aria-1.1>
- **Authoring Practices:** <https://www.w3.org/TR/wai-aria-practices-1.1/>
- **Role Definitions:** <https://www.w3.org/TR/wai-aria-1.1/#role_definitions>
- **States and Properties (all `aria-*` attributes):** <https://www.w3.org/TR/wai-aria-1.1/#state_prop_def>

## Features

The spec defines 3 main features.

1. **Roles**\
   These specify what an element is or does.\
   **Examples:** `role="navigation"`, `role="tab"`, `role="search"`.
2. **Properties**\
   These define properties of elements which can be used to give them extra meaning or semantics.\
   **Examples:** `aria-required="true"`, `aria-labelledby="labelElementId"`.
3. **States**\
   These are special properties that define the current state of the element. States differ from properties as properties don't change through a web page's life cycle.\
   **Examples:** `aria-disabled="true"`, `aria-checked="false"`.

## Support

Not all features of the spec are supported.

- The browser support is quite good at about [98% global support](https://caniuse.com/#feat=wai-aria).
- The screenreaders are a bit behind browsers.
