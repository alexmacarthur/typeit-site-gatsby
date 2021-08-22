```html
<p id="pauseResume"></p>
```

```javascript
const instance = new TypeIt("#pauseResume", {
  strings:
    "Click the 'freeze' button to freeze and unfreeze this instance as much as you want.",
  waitUntilVisible: true,
}).go();

document.querySelector("#freezeButton").addEventListener("click", function (e) {
  if (instance.is("frozen")) {
    instance.unfreeze();
    return;
  }

  instance.freeze();
});
```
