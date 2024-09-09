import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "e-utils",
  description: "e 工具类，常见 JavaScript / TypeScript 实用程序合集",
  // srcDir: './src',
  cleanUrls: true,
  // lang: 'zh-Hans',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],
  themeConfig: {
    aside: true,
    search: {
      provider: 'local'
    },
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      // { text: '示例', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '介绍',
        collapsed: false,
        items: [
          { text: '快速开始', link: '/getting-started' },
          // { text: '安装', link: '/installation' },
        ]
      },
      // {
      //   text: '分类模块',
      //   collapsed: false,
      //   items: [
      // //     { text: 'Number', link: '/components' },
      //     { text: 'String', link: '/string' },
      // //     { text: 'Function', link: '/type-guards' },
      // //     { text: 'Array', link: '/webflow' },
      //     { text: 'Object', link: '/object' },
      //     { text: 'Lang', link: '/lang' },
      // //     { text: 'Collection', link: '/helpers' },
      // //     { text: 'Time', link: '/helpers' },
      // //     { text: 'Util', link: '/helpers' },
      //   ],
      // },
      {
        text: '全局模块',
        collapsed: false,
        items: [
          { text: 'addClass', link: '/addClass' },
          { text: 'addCommas', link: '/addCommas' },
          { text: 'camelCase', link: '/camelCase' },
          { text: 'convertToUnit', link: '/convertToUnit' },
          { text: 'currentTime', link: '/currentTime' },
          { text: 'downloadFile', link: '/downloadFile' },
          { text: 'eq', link: '/eq' },
          { text: 'formatTime', link: '/formatTime' },
          { text: 'formatTimeToHm', link: '/formatTimeToHm' },
          { text: 'hasClass', link: '/hasClass' },
          { text: 'isArguments', link: '/isArguments' },
          { text: 'isArray', link: '/isArray' },
          { text: 'isArrayLike', link: '/isArrayLike' },
          { text: 'isArrayLikeObject', link: '/isArrayLikeObject' },
          { text: 'isBoolean', link: '/isBoolean' },
          { text: 'isBuffer', link: '/isBuffer' },
          { text: 'isDate', link: '/isDate' },
          { text: 'isElement', link: '/isElement' },
          { text: 'isFunction', link: '/isFunction' },
          { text: 'isNil', link: '/isNil' },
          { text: 'isNull', link: '/isNull' },
          { text: 'isNumber', link: '/isNumber' },
          { text: 'isNumberLike', link: '/isNumberLike' },
          { text: 'isObject', link: '/isObject' },
          { text: 'isObjectLike', link: '/isObjectLike' },
          { text: 'isPlainObject', link: '/isPlainObject' },
          { text: 'isSameDay', link: '/isSameDay' },
          { text: 'isSameWeek', link: '/isSameWeek' },
          { text: 'isString', link: '/isString' },
          { text: 'isSymbol', link: '/isSymbol' },
          { text: 'isUndefined', link: '/isUndefined' },
          { text: 'kebabCase', link: '/kebabCase' },
          // { text: 'parseTime', link: '/parseTime' },
          { text: 'parseInt', link: '/parseInt' },
          { text: 'timestamp', link: '/timestamp' },
          { text: 'toLower', link: '/toLower' },
          { text: 'toLowerFirst', link: '/toLowerFirst' },
          { text: 'toNumber', link: '/toNumber' },
          { text: 'toPlainObject', link: '/toPlainObject' },
          { text: 'toString', link: '/toString' },
          { text: 'toUpper', link: '/toUpper' },
          { text: 'toUpperFirst', link: '/toUpperFirst' },
          { text: 'trim', link: '/trim' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Appleec/e-utils' }
    ],

    footer: {
      message: '基于 MIT 许可发布.',
      copyright: `版权所有 © 2023-${new Date().getFullYear()} Appleex`,
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    returnToTopLabel: '回到顶部',
  },
})
