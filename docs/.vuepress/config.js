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
    clickCopy: {},
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
    // nav: [{ text: 'Home', link: '/' },],
    search: false,
    contentTransition: 'fade-in-up',
    sidebar: {
      '/cheatsheet/': [
        ['vue', 'vue'],
        ['vue2', 'vue2'],
      ]
    },
  },
}