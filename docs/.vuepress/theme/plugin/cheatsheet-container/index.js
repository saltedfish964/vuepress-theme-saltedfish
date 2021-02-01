const cheatsheetContainer = require('./containers')

module.exports = (options = {}, ctx) => {
  return {
    chainMarkdown(config) {
      config.plugin('containers')
        .use(cheatsheetContainer(options))
        .end();
    },
  }
}