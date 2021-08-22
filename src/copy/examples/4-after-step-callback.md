```html
<p id="callback"></p>
```

```javascript
const instance = new TypeIt("#callback", {
  strings: ["Look, it's rainbow text!"],
  afterStep: function (instance) {
    instance.getElement().style.color = getRandomColor();
  },
}).go();
```
