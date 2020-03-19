---
name: hero
---

```js
new TypeIt("#hero", {
  speed: 50,
  startDelay: 900
})
  .type("the mot versti", {delay: 100})
  .move(-8, {speed: 25, delay: 100})
  .type('s')
  .move('START')
  .move(1, {delay: 200})
  .delete(1)
  .type('T')
  .move(12, {delay: 200})
  .type('a', {delay: 250})
  .move('END')
  .type('le animated typing utlity')
  .move(-4)
  .type('i')
  .move('END')
  .type(' on the internet', {delay: 400})
  .delete(8, {delay: 600})
  .type('<em><strong>planet.</strong></em>');
  .go();
```
