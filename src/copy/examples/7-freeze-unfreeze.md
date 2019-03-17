```html
<p id="pauseResume"></p>
```

```javascript
const instance = new TypeIt("#pauseResume", {
  strings: [
    "After two seconds, this string will be paused for three seconds, and then resume."
  ],
  waitUntilVisible: true
}).go();

setTimeout(() => {
  instance.freeze();

  setTimeout(() => {
    instance.unfreeze();
  }, 3000);
}, 2000);
```
