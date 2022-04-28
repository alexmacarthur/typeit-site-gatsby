---
title: Instance Methods
description: How to use TypeIt's chainable & non-chainable instance methods to fine-tune an animation.
enable_sidebar: true
---

A handful of chainable and non-chainable instance methods are also available to reign full, detailed control over an instance you create.

## Chainable Methods

These methods must be used _before_ the `.go()` method is called on your instance. For example:

```javascript
// This will work!
new TypeIt("#element", {
  speed: 50,
})
  .type("Helo!")
  .pause(500)
  .move(-2)
  .type("l")
  .go();

// This will NOT work!
const instance = new TypeIt("#element", {
  speed: 50,
})
  .type("Helo!")
  .go();

instance.pause(500).move(-2).type("l");
```

### .type()

```typescript
instance.type(string: string | Function, actionOptions?: ActionOptions);
```

Type the string that's passed.

```javascript
instance.type("My string!").go();
```

A string can be defined via function as well. For example:

```javascript
instance.type(() => "My string from a function!").go();
```

### .delete()

```typescript
instance.delete(numberToDelete?: number | string | () => number | string, actionOptions?: ActionOptions);
```

Delete the number characters passed.

```javascript
// Delete five characters.
instance.delete(5).go();
```

If left empty or `null`, everything that's been typed will be deleted:

```javascript
// Delete everything.
instance.delete().go();
```

Alternatively, you can pass a CSS selector to determine how far a deletion will span.

```javascript
// Delete up until the <strong> element is deleted.
instance
  .type('Jack and <strong class="name">Jill</strong> went up the hill')
  .delete(".name")
  .go();
```

By default, passing a selector will delete until the "start" of the target element. To only delete up until the end of the target element, pass `END` in the `to` option.

```javascript
// Delete up until right before the <strong> element.
instance
  .type('Jack and <strong class="name">Jill</strong> went up the hill')
  .delete(".name", { to: "END" })
  .go();
```

### .pause()

```typescript
instance.pause(milliseconds: number | (() => number), actionOptions?: ActionOptions);
```

Pause the number (in milliseconds) passed.

```javascript
// Pause for 500 milliseconds.
instance.pause(500).go();
```

If left blank, no pause will be inserted. Just calling that out.

```javascript
// There will be no pause. Why are you doing this?
instance.pause().go();
```

### .break()

```typescript
instance.break(actionOptions?: ActionOptions);
```

Insert a `<br>` tag.

```javascript
// A <br> will be inserted.
instance.type("A").break().type("B").go();
```

### .options()

```typescript
instance.options(options: Options, actionOptions?: ActionOptions);
```

Update options on the fly. This will only impact options that are actively used during queue execution, which currently includes `speed`, `lifeLike`, and `html`.

```javascript
instance.options({ speed: 500, lifeLike: false }).go();
```

### .empty()

```typescript
instance.empty(actionOptions?: ActionOptions);
```

Instantly wipe out the contents of the target element.

```javascript
instance.empty().go();
```

### .move()

```typescript
instance.move(
  movementArg: number | string | null | (() => string | number | null),
  actionOptions?: ActionOptions
);
```

Move the cursor backward or forward a certain number of characters. This can be accomplished by passing a number:

```javascript
// Move the cursor five characters back.
instance.move(-5).go();

// Move the cursor seven characters forward.
instance.move(7).go();
```

Alternatively, you can pass a CSS selector to move the cursor to a particular typed element in the animation.

```javascript
// Move the cursor to the beginning of the <strong> element.
instance
  .type("Jack and <strong class='a-class'>Jill</strong> went up the hill")
  .move(".a-class")
  .go();
```

By default, passing a selector will move the cursor to the "start" of the target element. To move it to the end of the element, pass `END` in the `to` option.

```javascript
// Move the cursor to the END of the <strong> element.
instance
  .type("Jack and <strong>Jill</strong> went up the hill")
  .move(".a-class", { to: "END" })
  .go();
```

If `null` or no argument is passed, the cursor will be moved to the beginning of the element, unless changed with the `to` option.

```javascript
// Move the cursor to the start of the element.
instance.type("Hello.").move().go();
```

### .exec()

```typescript
instance.exec(func: () => any, actionOpts?: ActionOpts);
```

Fire any arbitrary function wherever this is placed in the queue. This method is asyncronous, so you may configure it to completely pause the queue's execution until a returned Promise is made to resolve.

```javascript
instance.exec(async () => await doSomethingAsync()).go();
```

### Tweaking Options Per Action

Many of the above methods allow optional configuration to be defined for controlling how individual actions behave.

#### Insert Delay After Instance Method

Instead of inserting `.pause()` after each action, you can set a `delay` after any given action is fired. For example:

```javascript
// This will work!
new TypeIt("#element", {
  speed: 50,
})
  .type("Hello!", { delay: 2000 })
  .delete(null, { delay: 1000 })
  .type("Goodbye!")
  .go();
```

#### Instantly Executing an Action

The `type()`, `delete()`, and `move()` methods accept an `instant` option that will cause the action to be executed immediately, rather than waiting one character at a time. This is useful, for example, when you'd like to type a longer amount of text instantly, in order to simulate a terminal effect.

```javascript
// This will work!
new TypeIt("#element", {
  speed: 50,
})
  .type("Hello!", { instant: true }) // Type instantly.
  .delete(null, { instant: true }) // Delete everything instantly.
  .type("Hi, again!")
  .move(null, { instant: true }) // Move instantly to the beginning.
  .go();
```

## Non-Chainable Methods

The following methods are intended to be used _after_ an instance has been initialized and kicked off with `go()`:

### .destroy()

```typescript
instance.destroy(removeCursor?: boolean);
```

Use the `.destroy()` method to cancel all timeouts and destroy an instance. Running this method will update the status of the instance to `destroyed` and remove cursor from DOM. If `false` is passed, the cursor will not be removed.

```javascript
const instance = new TypeIt("#myElement", {
  strings: "This will be destroyed.",
}).go();

instance.destroy();
```

### .reset()

```typescript
instance.reset();
```

Use the `.reset()` method to reset an active instance to a brand new state.

```javascript
const instance = new TypeIt("#myElement", {
  strings: "Some strings and stuff.",
}).go();

instance.reset();
```

### .freeze() / .unfreeze()

```typescript
instance.freeze();
instance.unfreeze();
```

Use the `.freeze()` and `.unfreeze()` methods on a active instance to pause and resume its execution any time.

```javascript
new TypeIt("#myElement", {
  strings: "After 500ms, pause for 3 seconds and resume.",
}).go();

setTimeout(() => {
  instance.freeze();

  setTimeout(() => {
    instance.unfreeze();
  }, 3000);
}, 500);
```

### .is()

```typescript
instance.is(status: started | complete | frozen | destroyed);
```

Use the `.is()` method to check the current status of an instance at any time. Available statuses to check include `started`, `complete`, `frozen`, and `destroyed`. A boolean will always be returned.

```javascript
let instance = new TypeIt('#myElement', {...});

instance.is('started');
instance.is('completed');
instance.is('frozen');
instance.is('destroyed');
```

## Kicking Off an Animation

After building an animation, there are two methods you can use to kick it off.

### .go()

```typescript
instance.go();
```

Most of the time, this what you should reach for. Running go will execute each item in your animation's queue, eventually get to a "completed" status (which you can check using the [`.is()` method](/docs/vanilla/instance-methods#is)), and run your [`afterComplete` callback](/docs/vanilla/usage/#callback-methods) (if defined).

```javascript
new TypeIt("#element", {
  afterComplete: () => console.log("I am done!"),
})
  //... instance methods building the animation
  .go();
```

After you've run `.go()` and the animation has completed, you can reset it using the [`.reset()` method](http://localhost:8000/docs/vanilla/instance-methods/#reset) and then calling `.go()` again.

### .flush()

```typescript
instance.flush(callback?: () => any);
```

Sometimes, you might want to type out some one-off strings at unknown periods of time (ex: you're responding to user input). In this event, the `.flush()` method might be more appropriate. This method will execute all non-executed items in your animation queue, and then immediately remove them. You will not be able to replay these items after a `.reset()`, and your `afterComplete` callback will not be executed.

Optionally, `.flush()` accepts a callback that will be executed after the animation is completed.

```javascript
new TypeIt("#element")
  //... instance methods building the animation
  .flush(() => "i am done!");
```

#### Using .go() + .flush() Together

Depending on your needs, it might make sense to use both `.go()` and `.flush()` together. For example, you may want to start with an initial animation to run, but then follow up with some uknown, one-off content, but still want to preserve the ability to reset it all to the intitial animation.

```javascript
const instance = new TypeIt("#element", {
  afterComplete: () => console.log("Initial animation is done!"),
})
  .type("initial!")
  .go();

// Later... type some other stuff.

instance.type("some one-off stuff!").flush();

// Later... reset & re-run from the beginning.

instance.reset().go();
```

To see something like this in action, check out [this demo](/demos/flush).
