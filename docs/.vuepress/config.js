module.exports = {
  title: 'vuepress-theme-saltedfish',
  description: 'Just playing around',
  markdown: {
    lineNumbers: true
  },
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'vuepress-theme-saltedfish',
      description: 'vuepress 主题',
      copyMessage: '复制成功',
    },
    '/en/': {
      lang: 'en-US',
      title: 'vuepress-theme-saltedfish',
      description: 'vuepress theme',
      copyMessage: '复制成功(外语)',
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    clickCopy: {
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // 代码块选择器
      copyMessage: '复制成功', // 文本展示
      duration: 3000, // 文本展示时间
      showInMobile: false, // 是否在手机也显示复制按钮
    },
    locales: {
      '/': {
        selectText: '选择语言',
        label: '简体中文',
        nav: [
          { text: '指南', link: '/docs/' },
          { text: '博客', link: '/blog/' },
        ],
        sidebar: {
          '/docs/': [
            {
              title: '指南',
              collapsable: false,
              children: [
                ['/docs/introduce', '介绍'],
                ['/docs/getting-started', '快速开始'],
                ['/docs/theme-config', '主题配置'],
              ]
            },
          ],
          '/cheatsheet/': [
            ['vue', 'vue'],
            ['vue2', 'vue2'],
          ]
        },
      },
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        nav: [{ text: 'Guid', link: '/en/docs/' },],
        sidebar: {
          '/en/docs/': [
            {
              title: 'Guid',
              collapsable: false,
              children: [
                ['/en/docs/introduce', 'Introduce'],
                ['/en/docs/getting-started', 'QuickStart'],
                ['/en/docs/theme-config', 'ThemeConfig'],
              ]
            },
          ],
          '/cheatsheet/': [
            ['vue', 'vue'],
            ['vue2', 'vue2'],
          ]
        },
      },
    },
    search: false,
    contentTransition: 'fade-in-up',
  },
}