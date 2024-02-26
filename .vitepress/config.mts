import { defineConfig } from 'vitepress'
import * as path from "path";
import { generateSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "码上学习",
  description: '码上学习 - 求知若渴，虚心若愚！',
  appearance: false,
  head: [
    ['link', { rel: 'icon', href: './favicon.ico' }]
  ],
  base: '/learn-note/',
  srcDir: './docs',
  outDir: './dist',
  ignoreDeadLinks: true,
  themeConfig: {
    logo: '/imgs/logo.png',
    logoLink: '/learn-note/',
    siteTitle: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shoestrong/learn-note' }
    ],
    editLink: {
      pattern: 'https://github.com/shoestrong/learn-note/edit/master/docs/:path',
      text: '更正错误'
    },
    footer: {
      copyright: 'Copyright © 2018-2024 by Shoestrong'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
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
    sidebar: generateSidebar([
      {
        documentRootPath: './docs',
        useTitleFromFileHeading: true,
        excludeFolders: ['vue-source'],
        scanStartPath: 'javascript-note',
        resolvePath: '/javascript-note/',
      },
      {
        documentRootPath: './docs',
        useTitleFromFileHeading: true,
        excludeFolders: ['vue-source'],
        scanStartPath: 'vue-note',
        resolvePath: '/vue-note/',
      },
      {
        documentRootPath: './docs',
        useTitleFromFileHeading: true,
        excludeFolders: ['vue-source'],
        scanStartPath: 'collect-note',
        resolvePath: '/collect-note/',
      },
    ])
  },
})
