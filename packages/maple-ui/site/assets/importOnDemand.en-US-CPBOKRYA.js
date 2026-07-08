import { p as a, e, l as i, Q as n, b as r, m as s, w as t, f as u } from './index-CLBN0B2q.js'

const m = { components: {} },
  c = { class: 'maple-site-doc' },
  d = { class: 'card' },
  j = { id: 'Intro' },
  h = { class: 'card' },
  g = { id: 'AutomaticImport' },
  y = { class: 'card' },
  f = { id: 'Manualimport' },
  w = { class: 'card' },
  k = { id: 'Manualimportandautomaticimportcomparison' }
function v(b, l, I, x, M, A) {
  const o = e('router-link'),
    p = e('mp-site-code-example')
  return (
    u(),
    i('div', c, [
      l[27] || (l[27] = s('h1', null, 'Import On Demand', -1)),
      s('div', d, [
        s('h3', j, [
          a(o, { to: '#Intro' }, { default: t(() => l[0] || (l[0] = [n('#')])), _: 1 }),
          l[1] || (l[1] = n('Intro')),
        ]),
        l[2] ||
          (l[2] = s(
            'p',
            null,
            'On-demand import avoids the full import of components, which can effectively reduce the size of the release package.',
            -1,
          )),
      ]),
      s('div', h, [
        s('h3', g, [
          a(o, { to: '#AutomaticImport' }, { default: t(() => l[3] || (l[3] = [n('#')])), _: 1 }),
          l[4] || (l[4] = n('Automatic Import')),
        ]),
        l[9] ||
          (l[9] = s(
            'p',
            null,
            [
              n('via plugin '),
              s('a', { href: 'https://github.com/antfu/unplugin-vue-components' }, 'unplugin-vue-components'),
              n(' and '),
              s('a', { href: 'https://github.com/antfu/unplugin-auto-import' }, 'unplugin-auto-import'),
              n(' Implement components to automatically import on demand, This is our most recommended way.'),
            ],
            -1,
          )),
        l[10] || (l[10] = s('h4', null, 'Install Plugin', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                l[5] ||
                (l[5] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' npm'),
                        n(`
npm i @maplejs/maple-import-resolver unplugin-vue-components unplugin-auto-import -D
`),
                        s(
                          'span',
                          { class: 'hljs-meta' },
                          `
#`,
                        ),
                        s('span', { class: 'bash' }, ' yarn'),
                        n(`
yarn add @maplejs/maple-import-resolver unplugin-vue-components unplugin-auto-import -D
`),
                        s(
                          'span',
                          { class: 'hljs-meta' },
                          `
#`,
                        ),
                        s('span', { class: 'bash' }, ' pnpm'),
                        n(`
pnpm add @maplejs/maple-import-resolver unplugin-vue-components unplugin-auto-import -D
`),
                      ]),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        l[11] || (l[11] = s('h4', null, 'Vite', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                l[6] ||
                (l[6] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-comment' }, '// vite.config.js'),
                        n(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        n(' vue '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'@vitejs/plugin-vue'"),
                        n(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        n(' components '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'unplugin-vue-components/vite'"),
                        n(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        n(' autoImport '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'unplugin-auto-import/vite'"),
                        n(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        n(' { MapleImportResolver } '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-import-resolver'"),
                        n(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        n(' { defineConfig } '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'vite'"),
                        n(`

`),
                        s('span', { class: 'hljs-keyword' }, 'export'),
                        n(),
                        s('span', { class: 'hljs-keyword' }, 'default'),
                        n(` defineConfig({
  `),
                        s('span', { class: 'hljs-attr' }, 'plugins'),
                        n(`: [
    vue(),
    components({
      `),
                        s('span', { class: 'hljs-attr' }, 'resolvers'),
                        n(`: [MapleImportResolver()]
    }),
    autoImport({
      `),
                        s('span', { class: 'hljs-attr' }, 'resolvers'),
                        n(': [MapleImportResolver({ '),
                        s('span', { class: 'hljs-attr' }, 'autoImport'),
                        n(': '),
                        s('span', { class: 'hljs-literal' }, 'true'),
                        n(` })]
    })
  ]
})
`),
                      ]),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        l[12] || (l[12] = s('h4', null, 'Vue CLI', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                l[7] ||
                (l[7] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-comment' }, '// vue.config.js'),
                        n(`
`),
                        s('span', { class: 'hljs-keyword' }, 'const'),
                        n(' Components = '),
                        s('span', { class: 'hljs-built_in' }, 'require'),
                        n('('),
                        s('span', { class: 'hljs-string' }, "'unplugin-vue-components/webpack'"),
                        n(`)
`),
                        s('span', { class: 'hljs-keyword' }, 'const'),
                        n(' AutoImport = '),
                        s('span', { class: 'hljs-built_in' }, 'require'),
                        n('('),
                        s('span', { class: 'hljs-string' }, "'unplugin-auto-import/webpack'"),
                        n(`)
`),
                        s('span', { class: 'hljs-keyword' }, 'const'),
                        n(' { MapleImportResolver } = '),
                        s('span', { class: 'hljs-built_in' }, 'require'),
                        n('('),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-import-resolver'"),
                        n(`)

`),
                        s('span', { class: 'hljs-built_in' }, 'module'),
                        n(`.exports = {
  `),
                        s('span', { class: 'hljs-attr' }, 'configureWebpack'),
                        n(`: {
    `),
                        s('span', { class: 'hljs-attr' }, 'plugins'),
                        n(`: [
      Components.default({
        `),
                        s('span', { class: 'hljs-attr' }, 'resolvers'),
                        n(`: [MapleImportResolver()]
      }),
      AutoImport.default({
        `),
                        s('span', { class: 'hljs-attr' }, 'resolvers'),
                        n(': [MapleImportResolver({ '),
                        s('span', { class: 'hljs-attr' }, 'autoImport'),
                        n(': '),
                        s('span', { class: 'hljs-literal' }, 'true'),
                        n(` })]
      })
    ]
  }
}
`),
                      ]),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        l[13] || (l[13] = s('h4', null, 'Typescript configuration note', -1)),
        l[14] ||
          (l[14] = s(
            'p',
            null,
            [
              n(
                'In order to get good IDE syntax highlighting, please make sure that the type declaration files generated by the above two plugins are include by ',
              ),
              s('code', null, 'typescript'),
              n(', which can be configured as follows in '),
              s('code', null, 'tsconfig.json'),
              n(':'),
            ],
            -1,
          )),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                l[8] ||
                (l[8] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        n(`{
  `),
                        s('span', { class: 'hljs-attr' }, '"include"'),
                        n(': ['),
                        s('span', { class: 'hljs-string' }, '"auto-imports.d.ts"'),
                        n(', '),
                        s('span', { class: 'hljs-string' }, '"components.d.ts"'),
                        n(`]
}
`),
                      ]),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
      ]),
      s('div', y, [
        s('h3', f, [
          a(o, { to: '#Manualimport' }, { default: t(() => l[15] || (l[15] = [n('#')])), _: 1 }),
          l[16] || (l[16] = n('Manual import')),
        ]),
        l[19] ||
          (l[19] = s(
            'p',
            null,
            [
              n('Each component is a '),
              s('code', null, 'Vue plugin'),
              n(' and consists of '),
              s('code', null, 'component logic'),
              n(' and '),
              s('code', null, 'style files'),
              n(', which are manually imported and used as follows.'),
            ],
            -1,
          )),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                l[17] ||
                (l[17] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        n(' App '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'./App.vue'"),
                        n(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        n(' { createApp } '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'vue'"),
                        n(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        n(' { Button } '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        n(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui/es/button/style/index'"),
                        n(`

createApp(App).use(Button)
`),
                      ]),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        l[20] || (l[20] = s('p', null, 'OR', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                l[18] ||
                (l[18] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-tag' }, [
                          n('<'),
                          s('span', { class: 'hljs-name' }, 'script'),
                          n(),
                          s('span', { class: 'hljs-attr' }, 'setup'),
                          n('>'),
                        ]),
                        s('span', { class: 'javascript' }, [
                          n(`
`),
                          s('span', { class: 'hljs-keyword' }, 'import'),
                          n(' { Button '),
                          s('span', { class: 'hljs-keyword' }, 'as'),
                          n(' VarButton } '),
                          s('span', { class: 'hljs-keyword' }, 'from'),
                          n(),
                          s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                          n(`
`),
                          s('span', { class: 'hljs-keyword' }, 'import'),
                          n(),
                          s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui/es/button/style/index'"),
                          n(`
`),
                        ]),
                        s('span', { class: 'hljs-tag' }, [
                          n('</'),
                          s('span', { class: 'hljs-name' }, 'script'),
                          n('>'),
                        ]),
                        n(`

`),
                        s('span', { class: 'hljs-tag' }, [
                          n('<'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          n('>'),
                        ]),
                        n(`
  `),
                        s('span', { class: 'hljs-tag' }, [
                          n('<'),
                          s('span', { class: 'hljs-name' }, 'mp-button'),
                          n('>'),
                        ]),
                        n('Say Hello'),
                        s('span', { class: 'hljs-tag' }, [
                          n('</'),
                          s('span', { class: 'hljs-name' }, 'mp-button'),
                          n('>'),
                        ]),
                        n(`
`),
                        s('span', { class: 'hljs-tag' }, [
                          n('</'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          n('>'),
                        ]),
                        n(`
`),
                      ]),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
      ]),
      s('div', w, [
        s('h3', k, [
          a(
            o,
            { to: '#Manualimportandautomaticimportcomparison' },
            { default: t(() => l[21] || (l[21] = [n('#')])), _: 1 },
          ),
          l[22] || (l[22] = n('Manual import and automatic import comparison')),
        ]),
        l[25] || (l[25] = s('p', null, 'Manual import', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                l[23] ||
                (l[23] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-tag' }, [
                          n('<'),
                          s('span', { class: 'hljs-name' }, 'script'),
                          n(),
                          s('span', { class: 'hljs-attr' }, 'setup'),
                          n('>'),
                        ]),
                        s('span', { class: 'javascript' }, [
                          n(`
`),
                          s('span', { class: 'hljs-keyword' }, 'import'),
                          n(' { Button '),
                          s('span', { class: 'hljs-keyword' }, 'as'),
                          n(' VarButton, Snackbar } '),
                          s('span', { class: 'hljs-keyword' }, 'from'),
                          n(),
                          s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                          n(`
`),
                          s('span', { class: 'hljs-keyword' }, 'import'),
                          n(),
                          s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui/es/button/style/index'"),
                          n(`
`),
                          s('span', { class: 'hljs-keyword' }, 'import'),
                          n(),
                          s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui/es/snackbar/style/index'"),
                          n(`

`),
                          s('span', { class: 'hljs-function' }, [
                            s('span', { class: 'hljs-keyword' }, 'function'),
                            n(),
                            s('span', { class: 'hljs-title' }, 'handleClick'),
                            n('('),
                            s('span', { class: 'hljs-params' }),
                            n(') '),
                          ]),
                          n(`{
  Snackbar(`),
                          s('span', { class: 'hljs-string' }, "'Hello!'"),
                          n(`)
}
`),
                        ]),
                        s('span', { class: 'hljs-tag' }, [
                          n('</'),
                          s('span', { class: 'hljs-name' }, 'script'),
                          n('>'),
                        ]),
                        n(`

`),
                        s('span', { class: 'hljs-tag' }, [
                          n('<'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          n('>'),
                        ]),
                        n(`
  `),
                        s('span', { class: 'hljs-tag' }, [
                          n('<'),
                          s('span', { class: 'hljs-name' }, 'mp-button'),
                          n(' @'),
                          s('span', { class: 'hljs-attr' }, 'click'),
                          n('='),
                          s('span', { class: 'hljs-string' }, '"handleClick"'),
                          n('>'),
                        ]),
                        n('Say Hello'),
                        s('span', { class: 'hljs-tag' }, [
                          n('</'),
                          s('span', { class: 'hljs-name' }, 'mp-button'),
                          n('>'),
                        ]),
                        n(`
`),
                        s('span', { class: 'hljs-tag' }, [
                          n('</'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          n('>'),
                        ]),
                        n(`
`),
                      ]),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        l[26] || (l[26] = s('p', null, 'Automatic import', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                l[24] ||
                (l[24] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-tag' }, [
                          n('<'),
                          s('span', { class: 'hljs-name' }, 'script'),
                          n(),
                          s('span', { class: 'hljs-attr' }, 'setup'),
                          n('>'),
                        ]),
                        s('span', { class: 'javascript' }, [
                          n(`
`),
                          s('span', { class: 'hljs-function' }, [
                            s('span', { class: 'hljs-keyword' }, 'function'),
                            n(),
                            s('span', { class: 'hljs-title' }, 'handleClick'),
                            n('('),
                            s('span', { class: 'hljs-params' }),
                            n(') '),
                          ]),
                          n(`{
  Snackbar(`),
                          s('span', { class: 'hljs-string' }, "'Hello!'"),
                          n(`)
}
`),
                        ]),
                        s('span', { class: 'hljs-tag' }, [
                          n('</'),
                          s('span', { class: 'hljs-name' }, 'script'),
                          n('>'),
                        ]),
                        n(`

`),
                        s('span', { class: 'hljs-tag' }, [
                          n('<'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          n('>'),
                        ]),
                        n(`
  `),
                        s('span', { class: 'hljs-tag' }, [
                          n('<'),
                          s('span', { class: 'hljs-name' }, 'mp-button'),
                          n(' @'),
                          s('span', { class: 'hljs-attr' }, 'click'),
                          n('='),
                          s('span', { class: 'hljs-string' }, '"handleClick"'),
                          n('>'),
                        ]),
                        n('Say Hello'),
                        s('span', { class: 'hljs-tag' }, [
                          n('</'),
                          s('span', { class: 'hljs-name' }, 'mp-button'),
                          n('>'),
                        ]),
                        n(`
`),
                        s('span', { class: 'hljs-tag' }, [
                          n('</'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          n('>'),
                        ]),
                        n(`
`),
                      ]),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
      ]),
    ])
  )
}
const B = r(m, [['render', v]])
export { B as default }
