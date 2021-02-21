module.exports = {
  title: 'vuepress-theme-saltedfish',
  description: 'Just playing around',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/logo.svg',
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