```html
<p id="asyncExec"></p>
```

```javascript
new TypeIt("#asyncExec", {
  waitUntilVisible: true
})
  .type("Hold up!")
  .exec(async () => {
    //-- Return a promise that resolves after something happens.
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve();
      }, 2000);
    });
  })
  .type(" OK, now go.")
  .go();
```
