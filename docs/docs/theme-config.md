# 主题配置

::: tip 提示
本页所列的选项仅对当前主题生效。如果你在使用一个自定义主题，选项可能会有不同。
:::

## 首页

`vuepress-theme-saltedfish` 提供了另一套首页布局（CheatsheetHome）。想要使用它，需要在你的根级 `README.md` 的 [Front Matter](https://vuepress.vuejs.org/zh/guide/markdown.html#front-matter) 指定 `homeTheme: cheatsheet`。以下是一个如何使用的例子：

``` yaml
---
home: true
homeTheme: cheatsheet
cheatsheetsSort:
- text: 介绍
  link: /docs/introduce
- text: 快速开始
  link: /docs/getting-started
- text: 主题配置
  link: /docs/theme-config
---
```

> 效果演示：[Cheatsheet](/example/cheatsheet-home)

### home

- 类型：`boolean`
- 默认值：`false`

是否以开启首页样式。

### homeTheme

- 类型：`string`
- 默认值：`''`

首页使用的主题，默认为空，就是 `vuepress` 的默认首页主题。

### cheatsheetsSort

- 类型：`array`
- 默认值：`[]`

可搜索参数列表，`text` 为名字，`link` 为链接地址。