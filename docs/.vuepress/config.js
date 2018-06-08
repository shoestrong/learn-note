module.exports = {
  base: '/',
  logoImage: '/logo.png',
  ga: 'UA-120438114-2',
  title: '码上学习',
  description: '码上学习 - 求知若渴，虚心若愚！',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  port: '8000',
  markdown: {
    lineNumbers: true,
    toc: {
      includeLevel: [2, 3, 4, 5, 6],
      listType: 'ul',
      format: function (param) {
        return '--> ' + param;
      }
    }
  },
  themeConfig: {
    // repo: 'Shoestrong/learn_note',
    docsDir: 'docs',
    // editLinks: true,
    // editLinkText: '错别字纠正',
    sidebarDepth: 3,
    activeHeaderLinks: false,
    lastUpdated: '更新于 ',
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: 'vue学习笔记',
        link: '/vue-note/'
      },
      {
        text: 'vue源码分析',
        link: '/vue-source/'
      }
    ],
    sidebar: {
      '/vue-note/': [
        {
          title: 'vue学习笔记',
          children: [
            'vue-tip'
          ]
        }
      ],
      '/vue-source/': [
        {
          title: '目录',
          children: [
            '',
            '1start-learn',
            '2vue-constructor',
            '3vue-example',
            '4vue-normalize',
            '5vue-merge',
            '6vue-init-start',
            '7vue-reactive',
            '8vue-reactive-dep-watch',
            '9vue-state-init',
            '80vue-compiler-start',
            '81vue-parse-ast',
            '82vue-parsing',
            '83vue-codegen',
            '84vue-vdom',
            '85vue-vdom-patch'
          ]
        }
      ]
    }
  }
}
