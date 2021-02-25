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
              dirname: 'blog',
              path: '/blog/',
              itemPermalink: '/blog/:year/:month/:day/:slug',
              layout: 'BlogLayout',
              // pagination: {
              //   lengthPerPage: 2,
              //   prevText: '上一页',
              //   nextText: '下一页',
              // },
            },
          ],
          frontmatters: [
            {
              // Unique ID of current classification
              id: 'tag',
              // Decide that the frontmatter keys will be grouped under this classification
              keys: ['tag'],
              // Path of the `entry page` (or `list page`)
              path: '/tag/',
              // Layout of the `entry page`
              layout: 'BlogLayout',
              // Layout of the `scope page`
              scopeLayout: 'BlogLayout'
            },
          ],
          globalPagination: {
            lengthPerPage: 2,
            prevText: '上一页',
            nextText: '下一页',
          },
        },
      ]
    ]
  }
}
