import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineDemoSite } from '@sparknest/vuepress-plugins-vue'
import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from 'vuepress-theme-hope'

const temp = resolve('docs/.vuepress', process.argv.includes('build') ? '.temp-build' : '.temp')
const bilingual = existsSync('docs/home.en-US.md')
const title = JSON.parse(readFileSync('package.json', 'utf8')).name

export default defineDemoSite({
  title,
  temp,
  public: resolve('public'),
  pagePatterns: ['*.md', '../src/*/docs/*.md'],
  locales: { '/': { lang: 'zh-CN' }, ...(bilingual ? { '/en/': { lang: 'en-US' } } : {}) },
  theme: hopeTheme({
    locales: {
      '/': { navbar: [{ text: '按钮', link: '/button/' }] },
      ...(bilingual ? { '/en/': { navbar: [{ text: 'Button', link: '/en/button/' }] } } : {}),
    },
    plugins: { git: false, redirect: { switchLocale: false } },
  }),
  plugins: [{
    name: 'maple:library-documentation',
    extendsPageOptions(options) {
      const match = /\/(?:src\/([^/]+)\/docs\/(zh-CN|en-US)|docs\/(home)\.(zh-CN|en-US))\.md$/.exec(options.filePath ?? '')
      if (match) {
        const prefix = (match[2] ?? match[4]) === 'en-US' ? '/en/' : '/'
        options.path = match[1] ? prefix + match[1] + '/' : prefix
      }
    },
  }],
  bundler: viteBundler({
    viteOptions: {
      root: resolve(temp, 'vite-root'),
      publicDir: resolve('public'),
      resolve: {
        alias: { [title + '/button']: resolve('src/button/index.ts') },
        dedupe: ['vue', 'vue-router', '@vuepress/client'],
      },
      plugins: [vueJsx()],
      oxc: { jsx: 'preserve' },
    },
  }),
})
