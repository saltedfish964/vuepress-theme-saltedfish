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
    sidebar: {
      '/cheatsheet/': [
        ['vue', 'vue'],
      ]
    },
  },
}