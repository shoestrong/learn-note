import { defineConfig } from 'vitepress'
import * as path from "path";
import { generateSidebar } from 'vitepress-sidebar'

// https://www.npmjs.com/package/vitepress-sidebar
const renderPath = (path) => {
  return {
    documentRootPath: './docs',
    useTitleFromFileHeading: true,
    capitalizeEachWords: true,
    useFolderLinkFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
    collapsed: false,
    collapseDepth: 2,
    scanStartPath: path,
    resolvePath: `/${path}/`,
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "码上学习",
  description: '码上学习 - 求知若渴，虚心若愚！',
  appearance: false,
  head: [
    ['link', { rel: 'icon', href: '/learn-note/favicon.ico' }]
  ],
  base: '/learn-note/',
  srcDir: './docs',
  outDir: './dist',
  ignoreDeadLinks: true,
  vite: {
    resolve: {
      alias: {
        '@hooks': path.resolve(__dirname, '../hooks'),
      },
      // extensions: ['.vue', '.js', '.json'],
    },
  },
  themeConfig: {
    logo: '/image/logo.png',
    logoLink: '/learn-note/',
    siteTitle: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/shoestrong/learn-note' }
    ],
    editLink: {
      pattern: 'https://github.com/shoestrong/learn-note/edit/master/docs/:path',
      text: '更正错误'
    },
    search: {
      provider: 'local'
    },
    footer: {
      copyright: 'Copyright © 2018-2024 by Shoestrong'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Javascript',
        link: '/javascript/'
      },
      {
        text: 'Vue',
        link: '/vue/'
      },
      {
        text: 'Engine',
        link: '/engine/'
      },
      {
        text: 'Code Snippets',
        link: '/snippet/'
      },
      {
        text: 'Collect',
        link: '/collect/'
      }
    ],
    sidebar: generateSidebar([
      renderPath('javascript'),
      renderPath('vue'),
      renderPath('engine'),
      renderPath('snippet'),
      renderPath('collect'),
    ])
  },
})
