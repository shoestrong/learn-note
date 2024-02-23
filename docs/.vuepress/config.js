module.exports = {
  base: '/learn-note/',
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
    repo: 'Shoestrong/learn_note',
    repoLabel: 'Github',
    docsDir: 'docs',
    logo: '/logo.png',
    // editLinks: true,
    // editLinkText: '错别字纠正',
    sidebarDepth: 3,
    activeHeaderLinks: false,
    lastUpdated: '更新于 '+new Date(),
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Javascript',
        link: '/javascript-note/'
      },
      {
        text: 'Vue',
        link: '/vue-note/'
      },
      {
        text: 'Collect',
        link: '/collect-note/'
      }
    ],
    sidebarDepth: 0,
    sidebar: {
      '/javascript-note/': [
        '',
        'base',
        'dom',
        'size&Position',
        'array',
        'es6'
      ],
      '/vue-note/': [
        '',
        'base',
        'component',
        'http',
        'ie9',
        'plugin',
        'hoc',
        'tip'
      ],
      '/collect-note/': [
        '',
        'base',
        'website',
        'interview',
      ]
    }
  }
}
