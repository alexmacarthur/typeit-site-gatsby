```html
<p id="callback"></p>
```

```javascript
const element = document.getElementById("callback");

const instance = new TypeIt(element, {
  strings: ["Look, it's rainbow text!"],
  afterStep: function(step, queue, instance) {
    element.style.color = getRandomColor();
  }
}).go();
```
