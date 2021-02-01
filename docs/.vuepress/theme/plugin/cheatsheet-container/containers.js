const mdContainer = require('markdown-it-container');

module.exports = () => {
  return md => {
    md.use(mdContainer, 'cheatsheet', {
      validate(params) {
        return params.trim().match(/^cheatsheet\s*(.*)$/);
      },
      render(tokens, idx) {
        const m = tokens[idx].info.trim().match(/^cheatsheet\s*(.*)$/);
        if (tokens[idx].nesting === 1) {
          return '<div class="cheatsheet-code">' + md.utils.escapeHtml(m[1]) + '\n';
        }
        return '</div>\n';
      }
    });
  };
}