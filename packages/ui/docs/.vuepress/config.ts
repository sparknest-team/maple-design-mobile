import { prepareDocsBuild } from '@sparknest/vuepress-plugins-vue/docs-build'
import { resolve } from 'node:path'
import {
  documentationRedirect,
  getDocumentationViteOptions,
  getSectionMenu,
  getDocumentationPlugins,
  getMapleConfig,
} from '@maple-design/cli-vue/docs'
import { vuepressDemoMarkdown } from '@maple-design/vite-plugins-vue'
import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from 'vuepress-theme-hope'
import { createPage } from 'vuepress/core'
import { defineDemoSite } from '@sparknest/vuepress-plugins-vue'
import { legacyRoute } from './legacy-route'

if (process.argv.includes('build')) {prepareDocsBuild('maple', process.cwd(), 'public', 'site')}

const maple = await getMapleConfig(true)
const docsVite = getDocumentationViteOptions(maple)
const base = process.env.FX_BASE || '/'
const logo = /^https?:\/\//.test(maple.logo) ? maple.logo : '/' + maple.logo.replace(/^\/+/, '')
const favicon = logo.startsWith('/') ? base + logo.slice(1) : logo
const temp = resolve('docs/.vuepress', process.argv.includes('build') ? '.temp-build' : '.temp')
const locales = ['zh-CN', 'en-US'] as const
const sectionDocs = maple.pc.sections.flatMap((section) => section.docs ?? [])
const themeLocales = Object.fromEntries(
  locales.map((lang) => {
    const link = (id: string) => '/' + lang + '/' + id + '/'
    const sidebar: Record<string, { text: string; children: { text: string; link: string }[] }[]> = {}
    const navbar = maple.pc.sections.map((section) => {
      const groups: (typeof sidebar)[string] = []
      for (const item of getSectionMenu(maple.pc.menu, section, maple.pc.sections)) {
        if (item.type === 1) {
          groups.push({ text: item.text[lang], children: [] })
        } else if (item.doc) {
          groups.at(-1)?.children.push({ text: item.text[lang], link: link(item.doc) })
        }
      }
      // Maple has flat page URLs. The components section is the sidebar fallback.
      for (const prefix of section.docs ? section.docs.map(link) : ['/' + lang + '/']) {
        sidebar[prefix] = groups
      }
      const paths = (section.docs ?? sectionDocs).map((id) => id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
      const match = section.docs ? '(?:' + paths + ')(?:/|$)' : '(?!(?:' + paths + ')(?:/|$))[^/]+'
      return {
        text: section.text[lang],
        link: link(section.entry),
        activeMatch: '^/' + lang + '/' + match,
      }
    })
    return [
      '/' + lang + '/',
      {
        selectLanguageName: lang === 'en-US' ? 'English' : '简体中文',
        home: '/' + lang + '/',
        navbar,
        sidebar,
      },
    ]
  }),
)

export default defineDemoSite({
  title: 'Maple Design Mobile',
  base,
  port: maple.port,
  temp,
  head: [['link', { rel: 'icon', href: favicon }]],
  public: resolve('public'),
  locales: { '/': { lang: 'zh-CN' }, '/zh-CN/': { lang: 'zh-CN' }, '/en-US/': { lang: 'en-US' } },
  pagePatterns: ['*.zh-CN.md', '*.en-US.md', '../src/*/docs/*.md', 'README.md'],
  theme: hopeTheme(
    {
      hostname: 'https://maple.show',
      logo,
      navbarLayout: { start: ['Brand'], center: ['Links'], end: ['MapleThemeMenu'] },
      locales: { '/': { navbar: themeLocales['/zh-CN/'].navbar, home: '/zh-CN/' }, ...themeLocales },
      plugins: { activeHeaderLinks: false, git: false, redirect: { switchLocale: false } },
      markdown: { include: true, highlighter: { type: 'prismjs', themes: { light: 'one-light', dark: 'one-dark' } } },
    },
    { custom: true },
  ),
  plugins: [
    {
      name: 'maple:pages',
      async onInitialized(app) {
        for (const lang of locales) {
          app.pages.push(
            await createPage(app, {
              path: '/' + lang + '/',
              frontmatter: { title: 'Maple Design Mobile', layout: 'Landing', sidebar: false, toc: false, lang },
            }),
          )
        }
      },
      extendsPageOptions(options) {
        if (!options.filePath) {
          return
        }
        const match =
          /\/src\/([^/]+)\/docs\/(zh-CN|en-US)\.md$/.exec(options.filePath) ??
          /\/docs\/([^/]+)\.(zh-CN|en-US)\.md$/.exec(options.filePath)
        if (!match) {
          const supplement = /\/src\/([^/]+)\/docs\/([^/]+)\.md$/.exec(options.filePath)
          if (supplement) {
            options.path = '/zh-CN/' + supplement[1] + '/' + supplement[2] + '/'
          }
          return
        }
        const [, id, lang] = match
        options.path = '/' + lang + '/' + id + '/'
        options.frontmatter = { ...options.frontmatter, lang }
      },
      extendsPage(page) {
        // Source files also live outside docs/. Their filesystem paths are not public routes.
        if (page.filePath && /^\/(en-US|zh-CN)\//.test(page.path)) {
          page.pathInferred = page.path
        }
        if (page.frontmatter.redirectTo) {
          page.routeMeta.redirectTo = page.frontmatter.redirectTo
        }
      },
      extendsMarkdown(md) {
        const normalize = md.normalizeLink.bind(md)
        md.normalizeLink = (href) => normalize(legacyRoute(href) ?? href)
        const render = md.render.bind(md)
        md.render = (source, env) => {
          const localizedPage = /(?:zh-CN|en-US)\.md$/.test(env?.filePath ?? '')
          const markdown =
            localizedPage && !documentationRedirect(source) ? vuepressDemoMarkdown(source, env.filePath) : source
          return render(markdown, env)
        }
      },
    },
  ],
  bundler: viteBundler({
    viteOptions: {
      root: resolve(temp, 'vite-root'),
      publicDir: resolve('public'),
      resolve: { ...docsVite.resolve, dedupe: ['vue', 'vue-router', '@vuepress/client'] },
      css: {
        ...docsVite.css,
        preprocessorMaxWorkers: 2,
        postcss: {
          plugins: [
            {
              postcssPlugin: 'maple-docs-prose-tables',
              Once(root) {
                // Hope imports these element selectors globally. The docs stylesheet
                // owns Markdown table layout; examples must keep their standalone CSS.
                if (!root.source?.input.file?.endsWith('/@vuepress/helper/dist/client/styles/normalize.css')) {
                  return
                }
                root.walkRules((rule) => {
                  if (['table', 'table code', 'tbody tr:nth-child(odd)', 'th, td'].includes(rule.selector)) {
                    rule.remove()
                  }
                })
              },
            },
          ],
        },
      },
      optimizeDeps: { include: ['vue-router', 'vue-router/experimental'] },
      oxc: { jsx: 'preserve' },
      plugins: getDocumentationPlugins(),
    },
  }),
})
