# CSS and JavaScript Accessibility

## CSS

### Correct Semantics

Do not use CSS to make semantic elements totally different from how they are supposed to look. For example, there should be a clear distinction between headings and regular text.

The rule of thumb is to update the styles to fit your design, but don't change it so much that it no longer looks or works as expected.

### Standard Content Look

Make sure to:

- Use sensible font sizes, line height, letter spacing etc. so that the text is easily readable and perceivable.
- The headings should stand out from regular content and list should be shown like lists.
- The color contrast should be distinguishable. For example, the text colors should contrast well with the background.

### Element Styling

Elements can have custom styles, but the styles should handle all states of elements. They should not significantly deviate in a way that changes the expected behavior.

Some examples:

- **Links:** Links should be styled for all its states like active, visited etc.
- **Tables:** Tables should have notable headers. Rows should be distinguishable so they are easier to read, like using zebra striping.

### Color Contrast

Your design might look cool, but be sure to use the right color contrast for text and background colors so everything is visible.

**Note:** A high contrast also helps in making the content visible on handheld devices being used in a bright environment like sunlight.

### Hiding Things

Screen readers don't care about hidden things.

For example, tabbed panels. While they visually make a difference for regular users, screen readers only want the content in the right order.\
The practice here is to use absolute positioning to move the content out of the viewport, so it's hidden for the regular users but still available to screen readers. Because going through tabs is not something peope using screen readers want.

`display: none` and `visibility: hidden` hide content from screen readers and should be used only when the content is to be hidden from screen readers.

## JavaScript

JavaScript can also break accessibility. Most of the accessibility features can be handled by using semantic HTML markup but for applications that are built entirely around JavaScript, like a browser game that completely renders on a `<canvas>`, the accessibility aspects have to be manually addressed.
