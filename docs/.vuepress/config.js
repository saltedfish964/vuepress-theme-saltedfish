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
    },
    '/en/': {
      lang: 'en-US',
      title: 'vuepress-theme-saltedfish',
      description: 'vuepress theme',
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    clickCopy: {
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // 代码块选择器
      copyMessage: '复制成功', // 复制成功提示文本
      duration: 3000, // 文本展示时间
      showInMobile: false, // 是否在手机也显示复制按钮
    },
    locales: {
      '/': {
        selectText: '选择语言',
        label: '简体中文',
      },
      '/en/': {
        selectText: 'Languages',
        label: 'English',
      },
    },
    nav: [{ text: '指南', link: '/docs/introduce' },],
    search: false,
    // contentTransition: 'fade-in-up',
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
}