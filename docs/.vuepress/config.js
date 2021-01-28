module.exports = {
  title: 'vuepress-theme-saltedfish',
  description: 'Just playing around',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
      {
        text: 'Languages',
        items: [
          { text: 'Group1', link: '/guide/1212/' },
          { text: 'Group2', link: '/guide/11/' }
        ]
      },
    ],
  },
}