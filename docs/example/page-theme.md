---
pageTheme: cheatsheet
---

## 插值 

::: cheatsheet
```html
<div id="app">
  <p>I have a {{ product }}</p>
  <p>{{ product + 's' }}</p>
  <p>{{ isWorking ? 'YES' : 'NO' }}</p>
  <p>{{ product.getSalePrice() }}</p>
</div>
```

See: [Delimiters](https://vuejs.org/v2/api/#delimiters)
:::