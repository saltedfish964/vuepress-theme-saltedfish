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

## 文档内容过渡动画

你可以通过 `themeConfig.contentTransition` 增加文档过渡动画：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    contentTransition: 'fade-in-up',
  }
}
```

你也可以通过 `YAML front matter` 来设置某个指定页面的文档过渡动画：

``` yaml
---
contentTransition: fade-in-right
---
```

### contentTransition

- 类型：`arstringray`
- 默认值：`fade`
- 可选值：`fade`、`fade-in-up`、`fade-in-right`、`fade-in-down`、`fade-in-left`

## 文档 cheatsheet 主题

你可以通过 `YAML front matter` 的 `pageTheme: cheatsheet` 属性来设置某个指定页面的文档为 `cheatsheet` 主题：

``` yaml
---
pageTheme: cheatsheet
---
```

此属性需要配合 `cheatsheet` 容器使用：

``` md
---
pageTheme: cheatsheet
---

markdown 内容

::: cheatsheet
markdown 内容
:::

markdown 内容

::: cheatsheet
markdown 内容
:::
```

> 效果演示：[pageTheme](/example/page-theme)

## 代码块复制

你可以给代码块复制添加一些属性：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    clickCopy: {
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // 代码块选择器
      copyMessage: '复制成功', // 复制成功提示文本
      duration: 3000, // 文本展示时间
      showInMobile: false, // 是否在手机也显示复制按钮
    }
  }
}
```

如果你需要国际化的话可以这样配置：

``` js
// .vuepress/config.js
module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      copyMessage: '复制成功',
    },
    '/en/': {
      lang: 'en-US',
      copyMessage: 'Copy Success',
    }
  }
}
```

## 组件 Demo 容器

::: tip
此容器根据 [vuepress-plugin-demo-container](https://docs.chenjianhui.site/vuepress-plugin-demo-container/zh/) 进行二次开发与优化。
:::

使用方法：

![](/demo-container.png)

会输出成下方的效果：

::: demo 代码块内提示
``` vue
<template>
  <div>{{ message }}</div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Salted Fish',
    };
  },
}
</script>
```
:::