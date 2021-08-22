---
title: Usage
description: Learn how to use TypeIt.
enable_sidebar: true
---

## Configuration Basics

A fresh instance of TypeIt accepts two arguments:

- **element**: The element where text will be typed. This can be a DOM node or an element selector (class, ID, etc.). For example, all of the examples below will work.

```javascript
new TypeIt('#myID', {...});
new TypeIt('.my-class', {...});
new TypeIt(document.querySelector('h2'), {...});
new TypeIt('[data-attribute="typeable"]', {...});
```

<div class="highlight">
  <p>
    Note: If a selector that applies to several elements on the page (like a class), the _first_ element found will be targeted. Targeting multiple elements at once is not supported.
  </p>
</div>

- **options**: An object that determines how the instance will behave. This is often where you'll define what strings will be typed, by passing them into the `strings` option:

```javascript
new TypeIt("#myElement", {
  strings: "This will be typed!",
  // ... other options
}).go();
```

## Initialization

Declaring a new instance of TypeIt only gives you an inert instance with a ready-to-go queue of steps to type. To make your newly created instance actually "go", use the `go()` method.

```javascript
new TypeIt("#myElement", {
  strings: "This will be typed!"
}).go(); // <!-- This will make it `go`.

// Or!

const myTypeItInstance = new TypeIt("#myElement", {
  strings: "This will be typed!"
});

myTypeItInstance.go();
```

## Defining Strings

You can define strings to be typed in a variety of ways.

### Configuration Options

You can define them in your options as a string **_or_** an array of strings.

```javascript
new TypeIt("#myElement", {
  strings: "This will be typed!"
}).go();

// Or!

new TypeIt("#myElement", {
  strings: ["This will be typed!", "And this will be typed too."]
}).go();
```

### Hard-Coded in HTML

Youc an also hard-code them in your target element. This is a good option for those looking to optimize SEO. Include your string in your target element, and you're good to go.

```html
<span id="myElement">This string will be typed on page load.</span>
```

It's also possible to define _multiple_ strings by separating them with a `<br>` tag.

```html
<span id="myElement">My first string.<br />And my second string!</span>
```

Note: This approach may cause a flash of text before the instance is started. This is because the text will already be rendered on the page before TypeIt has a chance to parse it for the animation.

### Instance Methods

To define your strings more manually, use the `type()` instance method, and customize the effect even further by combining these with the other methods, described more below.

```javascript
new TypeIt("#myElement")
  .type("This is my first string!")
  .pause(1000)
  .type("Plus a little more.")
  .go();
```

For more information about this approach, [see here](/docs/vanilla/instance-methods).

## Callback Methods

Included in the options are five callback methods available for use at certain times during the execution of a queue.

- `step` : The relevant step in the queue being handled when each callback fires.
- `instance` : This is the `TypeIt` instance itself, should you need it.

```javascript
new TypeIt("#element", {

  beforeStep: async (instance: TypeIt) => {
    // Will fire before each step in the queue.
  },

  beforeString: async (characters: Character[], instance: TypeIt) => {
    // Will fire before each string in the queue.
  },

  afterStep: async (instance: TypeIt) => {
    // Will fire after each step in the queue.
  },

  afterString: async (characters: Character[], instance: TypeIt) => {
    // Will fire after each string in the queue,
    // including those added by the `.type()` instance method.
  },

  afterComplete: async (instance: TypeIt) => {
    // Will fire after the entire instance has completed typing.
    // NOTE: If "loop" is enabled, this will never fire.
  }
});
```

## Cursor Styling

When an animation is initialized, the cursor is dynamically styled based on the font properties in which it lives. These values are set with CSS custom properties, which fall back to those dynamically-calculated values. For example, when you inspect an animation, you'll see something like this: 

![CSS properties in browser dev tools](./../../images/css-in-dev-tools.png)

You're welcome to customize these values as needed by setting the value for a property in your CSS. For example: 

```css
:root {
  --ti-cursor-color: dodgerblue;
}
```

### Custom Properties

Here are all of the custom properties defined for styling the cursor, along with the default values.

Property | Default Value
--- | ---
--ti-cursor-font-family | computed from inherited styles
--ti-cursor-font-weight | computed from inherited styles
--ti-cursor-font-size | computed from inherited styles
--ti-cursor-font-style | computed from inherited styles
--ti-cursor-line-height | computed from inherited styles
--ti-cursor-color | computed from inherited styles
--ti-cursor-margin-left | -.125em
--ti-cursor-margin-right | .125em

### Special Note About Cursor Positioning

Note the default `margin-left` and `margin-right` values above. These properties are used to control the cursor's positioning next to a given character, and it's rather difficult to reliably calculate a computed value based on inherited styles. The values that are set should be fine for just about every animation. But, if you find yourself wanting to move the cursor closer or farther from a character, those are the properties to tweak.

## Typing in Form Elements

TypeIt supports typing into form elements like text inputs and textareas. However, due to the nature of these elements, some functionality maybe limited, like the use of a blinking cursor.

## Configuration Options

Set any options for an instance by passing them as the second argument in TypeIt's constructor:

```javascript
new TypeIt("#element", {
  // Options go here!
}).go();
```

**Name & Default Value**  | **Description**
------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`strings: []`             | `[string \| array]` String(s) of text to be typed.
`speed: 100`              | `[number]` Typing speed, measured in milliseconds between each step.
`deleteSpeed: null`       | `[number \| null]` Deletion speed. If left null, will be 1/3 of the type speed.
`lifeLike: true`          | `[boolean]` Makes the typing pace irregular, as if a real person is doing it.
`cursor: true`            | `[boolean]` Show a blinking cursor at the end of the string(s).
`cursorSpeed: 1000`       | `[number]` The blinking speed of the cursor, measured in milliseconds.
`cursorChar:              | `[string]` The character used for the cursor. HTML works too!
`breakLines: true`        | `[boolean]` Controls whether multiple strings are printed on top of each other (`breakLines: true`), or if they're deleted and replaced by each other (`breakLines: false`).
`nextStringDelay: 750`    | `[number \| array]`The amount of time (in milliseconds) between typing multiple strings. If an array is passed, the first value will be used as the delay before a new string starts, and the second value will be used as the delay after a string has just ended. For example, passing`[1000, 2000]`will tell TypeIt to pause for 1000ms before typing a new string, and wait for 2000ms after a string has just completed. If a number is passed, that value will be halved.
`waitUntilVisible: false` | `[boolean]` Determines if the instance will begin typing automatically on `.go()`, or only when the target element becomes visible in the viewport. If you don't want instances far down on the page to begin until they're visible, set this option to `true`.
`startDelete: false`      | `[boolean]` Whether to begin instance by deleting strings inside element, and then typing what strings are defined via JSON or companion functions. Obviously, if this is set to `true`, you should have strings defined hard-coded in your target element.
`startDelay: 250`         | `[number]` The amount of time before the plugin begins typing after being initialized.
`loop: false`             | `[boolean]` Whether your strings will continuously loop after completing.
`loopDelay: null`         | `[number \| array]`The amount of time between looping over a string or set of strings again. This option behaves identically to`nextStringDelay`. If an array is passed, the first value will be the time before typing begins again (after the set of strings has been deleted), and the second value will be the time immediately after the set of strings has finished typing, before they're deleted to restart. If left undefined, the`nextStringDelay` option will be used.
`html: true`              | `[boolean]` Controls whether strings are parsed as HTML, or handled literally. If your target element is a form input or textarea, this value will automatically be overridden to `false`.
