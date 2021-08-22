---
title: Vanilla JavaScript
description: Learn how to set up TypeIt in an application.
enable_sidebar: true
---

## Installation

**1\. Get the code through one of the following means:**

- [CDN](https://www.jsdelivr.com/package/npm/typeit) - Include the source on your page.

  ```html
  <script src="https://unpkg.com/typeit@%typeItVersion%/dist/index.umd.js"></script>
  ```

- [npm / yarn](https://www.npmjs.com/package/typeit) - Install with `npm install typeit` or `yarn add typeit`.

- [Clone the Repo](https://github.com/alexmacarthur/typeit) - The compiled source files will be in the `/dist` directory.

**2\. Load the script on your page.**

Depending on your setup, you'll load TypeIt with a `script` tag , or an `import`, which will require the use of some sort of bundler.

```html
<script src="/path/to/typeit/source"></script>
```

```javascript
import TypeIt from "typeit";
```

Whatever the case, just be sure you load and instantiate TypeIt _after_ the script and your target element are loaded on the page. This can usually be accomplished by loading & running the script at the bottom of your page. But if you can't you can use the `DOMContentLoaded` event to execute it anywhere on the page. Example:

```html
<script src="<https://unpkg.com/typeit@%typeItVersion%/dist/index.umd.js>"></script>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    new TypeIt("#element", {
      strings: ["This is my string!"],
    }).go();
  });
</script>
```

**3\. Create a Target Element**

You'll be able to target an element by tag name, class, ID, or any other selector. For example, you might want to target an element with a `.type-effect` class attached to it.

```html
<span class="type-effect"></span>
```

If you want a fallback for users without JavaScript enabled, you can put a string or strings directly into this element. For more on that, see the [Defining Strings](#defining-strings) section. This will also be helpful if you're concerned about SEO.

## Quick-Start Template

If you're looking for a super simple template for how TypeIt would ideally be loaded on an HTML page, here you go:

```html
<html>
  <head></head>
  <body>
    <!-- A root element for TypeIt to target. -->
    <span id="myElement"></span>

    <!-- The script itself, loaded AFTER your root element. -->
    <script src="<https://unpkg.com/typeit@%typeItVersion%/dist/index.umd.js>"></script>
    <script>
      new TypeIt("#myElement", {
        strings: "This is what will be typed!",
      }).go();
    </script>
  </body>
</html>
```
