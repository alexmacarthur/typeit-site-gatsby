---
title: Use in Website Builders
description: Learn how to use TypeIt inside popular website builders like Wix and Squarespace.
enable_sidebar: true
---

## Squarespace

To use TypeIt on a Squarespace, you'll need to find the features that allow you to inject custom HTML and JavaScript. Here are the high-level steps to do that:

**1\. Open up the page you want the effect to appear and add a new [code block](https://support.squarespace.com/hc/en-us/articles/205815928-Adding-custom-HTML-CSS-and-JavaScript#toc-adding-code).**

In that block, create an empty element that will serve as the anchor for TypeIt. For example:

```html
<h3 id="myElement"></h3>
```

**2\. Navigate to the Advanced Settings section to find where you can [inject code](https://support.squarespace.com/hc/en-us/articles/205815908-Using-Code-Injection) into the footer of every page.**

In that textarea, paste the following code that will load the TypeIt source script and initialize your instance.

Note: If you don't want to load the script on every page, you could also paste this snippet below the element you created in the first step.

```html
<script src="https://unpkg.com/typeit@%typeItVersion%/dist/index.umd.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    new TypeIt("#element", {
      strings: ["This is my string!"],
    }).go();
  });
</script>
```

## Wix

Again, in order to use TypeIt with Wix, you'll need to locate where you can inject custom HTML and JavaScript into your site. Wix has a "Dev Mode" that allows you to get fairly involved, but a simpler approach will look like the following:

**1\. In the website editor, hover over the "plus" icon, select "Embed," and choose "HTML iframe."**

![HTML Embed Block](../../images/wix-html-embed.png)

**2\. Click "Enter Code" above the box that appears, and paste the HTML, source `<script>` tag, and your initialization inside the textarea.**

<div style="margin: 0 auto 1rem; max-width: 300px;">
  <img src="../../images/wix-embed-code.png" alt="HTML Embed Code">
</div>

What you paste into that box must look something like this:

```html
<span id="myElement"></span>

<script src="https://unpkg.com/typeit@%typeItVersion%/dist/index.umd.js"></script>
<script>
  new TypeIt("#myElement", {
    strings: "This is what will be typed!",
  }).go();
</script>
```

For more information on this, dig into Wix's documentation on [adding custom code to your site.](https://support.wix.com/en/article/adding-code-to-your-site)

## WordPress

For use within a WordPress site, it's recommended that you leverage the [WordPress plugin for TypeIt](/docs/wordpress).
