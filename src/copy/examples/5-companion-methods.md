```html
<p id="companionMethods"></p>
```

```javascript
new TypeIt("#companionMethods", {
  speed: 200,
  waitUntilVisible: true
})
  .type("THe")
  .pause(200)
  .delete(2)
  .type("he, ")
  .pause(1000)
  .type("possibilities are...")
  .break()
  .pause(750)
  .options({ speed: 50 })
  .type(" totally endlss!")
  .pause(750)
  .delete(3)
  .pause(200)
  .type("ess!")
  .go();
```
