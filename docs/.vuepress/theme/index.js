module.exports = (options, ctx) => {
  console.log('themeConfig：', ctx);
  return {
    themeConfig: {
      title: 'vuepress-theme-saltedfish'
    },
  }
}