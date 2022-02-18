# HTML Accessibility

Accessibility in HTML is as easy as using semantic HTML elements.

**HTML Semantics Cheat Sheet**: <https://learn-the-web.algonquindesign.ca/topics/html-semantics-cheat-sheet/>

## Elements to Use

To make websites accessible, use the element that best fits the content. A good semantic HTML markup may look like the following.

```html
<header>
  <h1>Heading</h1>
</header>

<nav></nav>

<main>
  <article>
    <h2>Article heading</h2>
    <section>
      <h3>Article section</h3>
    </section>
  </article>

  <aside>
    <h2>Related</h2>
  </aside>
</main>

<footer></footer>
```

## UI Controls

UI controls are the elements that users interact with. These are mostly buttons, links and form controls. The semantic elements are keyboard accessible by default.

Making unsemantic markup keyboard accessible.

1. `role="button"`
2. `tabindex`
   1. `tabindex="0"` — makes element tabbable, focusable and also allow specifying a custom tab order.
   2. `tabindex="-1"` — allows not normally tabbable elements receive focus programmatically.
3. Add keyboard interaction.

   ```js
   document.addEventListener("keydown", (e) => {
     if (e.code === "Enter") {
       document.activeElement.click();
     }
   });
   ```

### Meaningful Text Labels

For links, buttons and such, use meaningful label text so that screen readers can have better understanding.

**Example:**

**Bad:** `<p>Cats are lazy. <a href="#">Click me</a></p>`\
**Good:** `<p>Cats are lazy. <a href="#">Find out why cats are lazy.</a></p>`

Also make sure to use labels along with form controls.

```html
<label for="name">Name</label>
<input name="name" id="name" type="text />
```

### Accessible Data Tables

Tables should use semantic markup like `<th>`, `<summary>`, `<caption>`, `<thead>`, `<tfoot>` etc.

## Text Alternatives

Text alternatives should be specified for visible elements like icons and images.

```html
<img
  src="cat.png"
  aria-labelledby="Cat"
  alt="Cat"
  title="Cat"
  longdesc="cat.html"
/>
```

Screen readers can read the `src` image attribute but sometimes image names do not make sense. In this case having alternative text helps.

**Note:** Do not include text in images. It's not copyable and accessible along with some other disadvantages. Text should always be outside the image.

### Figure

```html
<figure>
  <img src="dinosaur.png" alt="Dinosaur" />
  <figcaption>A dinosaur standing on two legs</figcaption>
</figure>
```

### Empty `alt` Attributes

Empty `alt` attributes on images indicate that the image has no real meaning. Another option is to use `role="presentation"` as this prevents screen readers reading out alternative text.

## Links

### Styling

Links should be styled in a way that they are distinguishable from regular text. The **difference should not only be in the color**. All states like `focus`, `visited`, `active` etc. should have difference in color with a 4:5 contrast between all of them.

### External Links

Not all screen readers perceive and read the `target="_blank"` to indicate that the link will open in a new tab. Ideally, it should be specified in the link text, that it opens in a new tab.

```html
<a target="_blank" href="http://example.com">
  Go to example (opens in new tab)
</a>
```

## Proximity/Distance

Elements should be placed at a fair distance so people suffering from motor control issues (their hands shake a lot), don't click the wrong content.
