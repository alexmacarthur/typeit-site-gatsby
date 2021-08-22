```html
<fieldset>
  <label for="formElement">Full Name</label>
  <input type="text" id="formElement" />
</fieldset>
```

```javascript
new TypeIt("#formElement", {
  strings: "Alex MacArthur",
  waitUntilVisible: true,
}).go();
```
