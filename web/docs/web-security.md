# Web Security

## Cross-Site Scripting (XSS)

In cross-site scripting, the attacker makes the client involuntarily execute client-side code. This allows execution of aribtrary code that can end up sending sensitive data to the attacker.

**Examples:**

- Passing JavaScript code through the URL.

  ```
  https://somewebsite.com/search?q="<script>alert(document.cookie)</script>"
  ```

  This will end up putting the snippet into the HTML page and executing it.

- Adding a comment that includes client side code on a page. In this way, when a user loads the page, the code in the comment becomes part of the page and gets executed without the user noticing it.

## Cross-Site Request Forgery (XSRF/CSRF)

In cross-site request forgery, the attacker tries to trick and fool you into making a request that you did not intend. This could be like sending a link that changes your settings on a website. Or sending you a link to a form which looks exactly like another site (e.g. Facebook) tricking you into inputting your sensitive data.

Examples:

- A malicious link: `https://somewebsite.com/update-password?password=abc`
- Link to a replica website where you enter data into forms.
