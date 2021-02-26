const path = require('path')
const cheatsheetContainer = require('./plugin/cheatsheet-container/index')
const demoContainer = require('./plugin/demo-container/index')
const clickCopy = require('./plugin/click-copy/index')

function checkObj(obj) {
  const isObj = Object.prototype.toString.call(obj) === '[object Object]'

  return isObj ? obj : {}
}

// Theme API.
module.exports = (options, ctx) => {
  const { themeConfig, siteConfig } = ctx

  // resolve algolia
  const isAlgoliaSearch = (
    themeConfig.algolia
    || Object
      .keys(siteConfig.locales && themeConfig.locales || {})
      .some(base => themeConfig.locales[base].algolia)
  )

  const enableSmoothScroll = themeConfig.smoothScroll === true

  const clickCopyConfig = checkObj(themeConfig.clickCopy)

  return {
    alias() {
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
          : path.resolve(__dirname, 'noopModule.js')
      }
    },

    plugins: [
      ['@vuepress/active-header-links', options.activeHeaderLinks],
      '@vuepress/search',
      '@vuepress/plugin-nprogress',
      ['container', {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
          '/zh/': '提示'
        }
      }],
      ['container', {
        type: 'warning',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '注意'
        }
      }],
      ['container', {
        type: 'danger',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '警告'
        }
      }],
      ['container', {
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n'
      }],
      ['smooth-scroll', true],
      cheatsheetContainer,
      demoContainer,
      [clickCopy, clickCopyConfig],
      [
        '@vuepress/blog',
        {
          directories: [
            {
              id: 'blog',
              dirname: 'blog/article',
              path: '/blog/article/',
              itemPermalink: '/blog/article/:year/:month/:day/:slug',
              layout: 'BlogLayout',
            },
          ],
          frontmatters: [
            {
              id: 'tag',
              keys: ['tag'],
              path: '/tag/',
              layout: 'BlogLayout',
              scopeLayout: 'BlogLayout'
            },
          ],
          globalPagination: {
            lengthPerPage: 2,
            prevText: '上一页',
            nextText: '下一页',
            sorter: (prev, next) => {
              const dayjs = require('dayjs');
              const prevTime = dayjs(prev.frontmatter.date);
              const nextTime = dayjs(next.frontmatter.date);
              return prevTime - nextTime > 0 ? -1 : 1;
            },
          },
        },
      ]
    ]
  }
}
