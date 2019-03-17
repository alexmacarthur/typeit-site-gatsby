---
name: hero
---

```js
new TypeIt("#hero", {
  speed: 50,
  startDelay: 900
})
  .type("The most versatile animated typing utility on the internte")
  .pause(300)
  .delete(2)
  .pause(250)
  .type("et")
  .pause(750)
  .options({ speed: 100, deleteSpeed: 75 })
  .delete(8)
  .pause(750)
  .type("<em>planet.</em>")
  .go();
```
