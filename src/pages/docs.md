---
title: Documentation
description: >-
  It's extremely easy to configure and start using TypeIt. Here's the
  documentation to show you how to fully leverage it.
enable_sidebar: true
---

## Overview

TypeIt is the most versatile JavaScript typewriter effect utility on the planet. With simple, straightforward configuration, it allows you to type single or multiple strings that break lines, delete & replace each other, and it even handles strings that contain HTML.

For more advanced, controlled typing effects, TypeIt comes with companion functions that can be chained to control your typing down to a single character, enabling you to type an dynamic narrative, with complete reign over speed changes, line breaks, deletions, and pauses.

## Version 6 is Here!

TypeIt v6 is a significant update to the library with a couple of breaking changes, but also a whole lotta neatness.

### Breaking Changes

- The `autoStart` option has been changed to `waitUntilVisible`.
- Checking for instance states requires the use of the `.is()` method.
- By default, all instances are inactive until the `.go()` method is explicitly called.
- As a result, the `autoInit` parameter no longer exists.

### New Features / Improvements

- Leverages modern JS features like async/await.
- Introduces an improved, more intuitive, and flexible API.
- Significantly expands test coverage.
- Supports typing into form inputs and textareas.
- Introduces an _asynchronous_ `.exec()` companion method.

## Get a License

Using TypeIt for an open source or personal project is completely free. To use it in a commercial project, however, a license is required.

- **Personal or Open Source** - Just take it! It's free to use, as long as the project remains personal or open source.
- **Single Commercial License** - Use TypeIt for a single commercial project of any sort.
- **Extended Commercial License** - Use TypeIt in an unlimited number of commercial projects, for as long as you're sucking air on Earth.

## Installation

**Get the Code**

- [CDN](https://www.jsdelivr.com/package/npm/typeit) - Include this on your page:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/typeit@VERSION_NUMBER/dist/typeit.min.js"></script>
  ```

- [npm / yarn](https://www.npmjs.com/package/typeit) - Install with `npm install typeit` or `yarn add typeit`.

- [Clone the Repo](https://github.com/alexmacarthur/typeit) - The compiled source files will be in the `/dist` directory.

**Load the Script**

Depending on your setup, you'll load TypeIt with a `script` tag , or an `import`, which will require the use of some sort of bundler, obviously.

```html
<script src="typeit.min.js"></script>
```

```javascript
import TypeIt from "typeit";
```

Whatever the case, just be sure you load and instantiate TypeIt _after_ your markup as loaded on the page.

**Create a Target Element**

You'll be able to designate a target element by tag name, class, ID, or anything else. For example, you might want to target elements with a .`type-effect` class attached to it.

```html
<span class="type-effect"></span>
```

If you want a fallback for users without JavaScript, you can put a string or strings right into this element. For more on that, see the [Defining Strings](https://typeitjs.com/docs/#defining-strings) section. This will also be helpful if you're concerned about SEO.

## Usage

**Basic Configuration**

A fresh instance of TypeIt accepts two arguments:

- element: The element where text will be typed. This can be a DOM node, or a string reference to an element, class, ID, etc. For example, all of these are valid:

```javascript
new TypeIt('#myID', {...});
new TypeIt('.my-class', {...});
new TypeIt('h1', {...});
new TypeIt('[data-attribute="typeable"]', {...}).go();
```

- options: An object that determines how the instance will behave. This is _often_ where you'll define what strings will be typed, by passing them into the `strings` option:

```javascript
new TypeIt("#myElement", {
  strings: "This will be typed!"
}).go();
```

**Initialization**

Declaring a new instance of TypeIt only gives you an inert instance with a ready-to-go queue of steps to type. To make your newly created instance actually go, use the `go()` method.

```javascript
new TypeIt("#myElement", {
  strings: "This will be typed!"
}).go();

//-- Or!

let myTypeItInstance = new TypeIt("#myElement", {
  strings: "This will be typed!"
});

myTypeItInstance.go();
```

**Defining Strings**

You can define strings to be typed in a variety of ways.

1. Define them in your options as a string **_or_** an array of strings.

```javascript
new TypeIt("#myElement", {
  strings: "This will be typed!"
}).go();

//-- Or!

new TypeIt("#myElement", {
  strings: ["This will be typed!", "And this will be typed too."]
}).go();
```

2. Hard-code them in your target element.

This is a great option for those looking to optimize SEO. Include your string in your target element, and you're good to go.

```html
<span id="myElement">This string will be typed on page load.</span>
```

3. It's also possible to define _multiple_ strings by separating them with a `<br>` tag.

```html
<span id="myElement">My first string.<br />And my second string!</span>
```

4. Define them with companion methods.\*\* To define your strings more manually, use the `type()` companion method, and customize the effect even further by combining these with the other methods, described more below.

```javascript
new TypeIt("#myElement")
  .type("This is my first string!")
  .pause(1000)
  .type("Plus a little more.")
  .go();
```

**Typing in Form Elements**

As of v6, TypeIt supports typing into form elements like inputs and textareas. No added configuration is needed to do this. However, due to the nature of these elements, some functionality maybe limited, like the use of a blinking cursor.

**Companion Methods**

TypeIt includes a handful of chainable companion methods you can use to reign full, detailed control over an instance you create.

<!-- Method                       | Description                                                                                                                                                                                                                                             | Arguments
---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------
.type()                      | When a string is passed, that string will be queued to be typed.                                                                                                                                                                                        | `[string]` String of characters and/or HTML.
.delete()                    | If a number is passed, that number of characters will be queued for deletion. If nothing is passed, the entire printed string will be queued for deletion.                                                                                              | `[number                                     | void]` Number of characters.
pause()                      | If a number is passed, a pause of that length in milliseconds will be added to the queue.                                                                                                                                                               | `[number                                     | void]` Time in milliseconds.
break()                      | When called, a `<br>` tag will be queued.                                                                                                                                                                                                               | `[void]`
options()                    | Can be used to update options on the fly. This will only impact options that are actively used during queue execution, which currently includes `speed`, `lifeLike`, and `html`.                                                                        | `[object]` Settings to be updated.
empty()                      | When called, an action will be queued to completely wipe out the contents of the element.                                                                                                                                                               | `[void]`
destroy(removeCursor = true) | Cancel all timeouts attached to the instance, update the status of instance to `destroyed`, and remove cursor from DOM. If `false` is passed, the cursor will _not_ be removed.                                                                         | `[void]`
exec()                       | Fire any arbitrary function wherever this is placed in the queue. This method is asyncronous, so you may configure it to completely pause the queue's execution until a returned Promise is made to resolve. See directly below for a terrible example. | `[void]` -->

**Using the New `exec()` Method**

The `.exec()` companion method, introduced in v6, allows you to fire code at any part of the queue. It's also asyncronous, meaning you can leverage stuff like `async/await` to pause queue execution until a returned Promise resolves. I'm sure you can think of more realistic, useful examples, but here's one anyway:

```javascript
new TypeIt("#someID")
  .type("Hold up!")
  .exec(async () => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve();
      }, 2000);
    });
  })
  .type(" OK, now go.")
  .go();
```

**Resetting an Instance**

Use the `.reset()` method to reset an active instance to a brand new state.

```javascript
const instance = new TypeIt("#myElement", {
  strings: "Some strings and stuff."
}).go();

instance.reset();
```

**Pausing & Resuming** Use the `.freeze()` and `.unfreeze()` methods on a active instance to pause its execution at any time.

```javascript
new TypeIt("#myElement", {
  strings: "After 500ms, pause for 3 seconds and resume."
}).go();

setTimeout(() => {
  instance.freeze();

  setTimeout(() => {
    instance.unfreeze();
  }, 3000);
}, 500);
```

**Checking State**

Use TypeIt's `.is()` method to check the current status of an instance at any time. Available statuses to check include `started`, `complete`, `frozen`, and `destroyed`. A boolean will always be returned.

```javascript
let instance = new TypeIt('#myElement', {...});

instance.is('started');
instance.is('completed');
instance.is('frozen');
instance.is('destroyed');
```

**Callback Methods**

Included in the options are five callback methods available for use at certain times during the execution of a queue.

- `step` : The relevant step in the queue being handled when each callback fires.
- `queue` : The entire queue of steps used by the instance. Each queue will contain a `waiting` property storing steps yet to be processed, as well as an `executed` property storing the ones that have already been executed.
- `instance` : This is the `TypeIt` instance itself, should you need it.

```javascript
new TypeIt("#element", {
  beforeStep: (step, queue, instance) => {
    //-- Will fire before each step in the queue.
  },

  beforeString: (step, queue, instance) => {
    //-- Will fire before each string in the queue.
  },

  afterStep: (step, queue, instance) => {
    //-- Will fire after each step in the queue.
  },

  afterString: (step, queue, instance) => {
    //-- Will fire after each string in the queue,
    // including those added by the `.type()` companion method.
  },

  afterComplete: instance => {
    //-- Will fire after the entire instance has completed typing.
    //-- NOTE: If "loop" is enabled, this will never fire.
  }
});
```

## Options

Set any options for an instance by passing them as the second argument in TypeIt's constructor:

```javascript
new TypeIt("#element", {
  //-- Options go here!
}).go();
```

<!-- **Name & Default Value**  | **Description**
------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`strings: []`             | `[string                                                                                                                                                                                                                                                        | array]` String(s) of text to be typed.
`speed: 100`              | `[number]` Typing speed, measured in milliseconds between each step.
`deleteSpeed: null`       | `[number                                                                                                                                                                                                                                                        | null]` Deletion speed. If left null, will be 1/3 of the type speed.
`lifeLike: true`          | `[boolean]` Makes the typing pace irregular, as if a real person is doing it.
`cursor: true`            | `[boolean]` Show a blinking cursor at the end of the string(s).
`cursorSpeed: 1000`       | `[number]` The blinking speed of the cursor, measured in milliseconds.
`cursorChar:              | `                                                                                                                                                                                                                                                               | `[string]` The character used for the cursor. HTML works too!
`breakLines: true`        | `[boolean]` Controls whether multiple strings are printed on top of each other (`breakLines: true`), or if they're deleted and replaced by each other (`breakLines: false`).
`nextStringDelay: 750`    | `[number                                                                                                                                                                                                                                                        | array]`The amount of time (in milliseconds) between typing multiple strings. If an array is passed, the first value will be used as the delay before a new string starts, and the second value will be used as the delay after a string has just ended. For example, passing`[1000, 2000]`will tell TypeIt to pause for 1000ms before typing a new string, and wait for 2000ms after a string has just completed. This would be equivalent to`instance.type('String 1').pause(2000).delete().pause(1000).type('String 2')`.go(). If a number is passed, that value will be halved.
`waitUntilVisible: false` | `[boolean]` Determines if the instance will begin typing automatically on `.go()`, or only when the target element becomes visible in the viewport. If you don't want instances far down on the page to begin until they're visible, set this option to `true`.
`startDelete: false`      | `[boolean]` Whether to begin instance by deleting strings inside element, and then typing what strings are defined via JSON or companion functions. Obviously, if this is set to `true`, you should have strings defined hard-coded in your target element.
`startDelay: 250`         | `[number]` The amount of time before the plugin begins typing after being initialized.
`loop: false`             | `[boolean]` Whether your strings will continuously loop after completing.
`loopDelay: null`         | `[number                                                                                                                                                                                                                                                        | array]`The amount of time between looping over a string or set of strings again. This option behaves identically to`nextStringDelay`. If an array is passed, the first value will be the time before typing begins again (after the set of strings has been deleted), and the second value will be the time immediately after the set of strings has finished typing, before they're deleted to restart. If left undefined, the`nextStringDelay` option will be used.
`html: true`              | `[boolean]` Controls whether strings are parsed as HTML, or handled literally. If your target element is a form input or textarea, this value will automatically be overridden to `false`. -->

## Browser Support

TypeIt is built with modern JavaScript that's largely supported by most of today's browsers. However, if you're working with Internet Explorer, you will need to load a polyfill for ES20165 Promises.

You can use any you like, but if you want a quick solution, use the one here:

```html
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
<script src="dist/typeit.min.js"></script>
```

It should also go without saying that it's wise to test any implementation of TypeIt (or anything else) in your target browsers.

## Examples

I have a few CodePen examples that illustrate how to do some interesting things with TypeIt.

- [TypeIt as a React Component](https://codepen.io/alexmacarthur/pen/gXNyBJ)
- [Cute Rainbow Effect Using a Callback Method](https://codepen.io/alexmacarthur/pen/jzybpB)
- [Chained Typing Animations](https://codepen.io/alexmacarthur/pen/MOPQvp)
- ['Fill in the Blank' Effect](https://codepen.io/alexmacarthur/pen/pdXLRG)

## Need Help?

If you're working with a custom implementation of TypeIt and would like some help, I'm available for hire. [Get in touch!](https://macarthur.me/contact)

## License

[GPL-2.0](https://github.com/alexmacarthur/typeit/blob/master/LICENSE) © Alex MacArthur
