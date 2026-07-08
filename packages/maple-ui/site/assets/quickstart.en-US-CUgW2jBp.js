import { f as d, l as i, p as l, Q as n, e as p, b as r, m as s, w as t } from './index-CLBN0B2q.js'

const m = { components: {} },
  c = { class: 'maple-site-doc' },
  u = { class: 'card' },
  h = { id: 'Intro' },
  j = { class: 'card' },
  g = { id: 'Install' },
  y = { class: 'card' },
  f = { id: 'SupportDesktop' },
  b = { class: 'card' },
  k = { id: 'Chooseadesignsystem' },
  w = { class: 'card' },
  v = { id: 'ComponentsPlayground' }
function M(D, a, S, x, C, A) {
  const o = p('router-link'),
    e = p('mp-site-code-example')
  return (
    d(),
    i('div', c, [
      a[22] || (a[22] = s('h1', null, 'Quick Start', -1)),
      s('div', u, [
        s('h3', h, [
          l(o, { to: '#Intro' }, { default: t(() => a[0] || (a[0] = [n('#')])), _: 1 }),
          a[1] || (a[1] = n('Intro')),
        ]),
        a[2] ||
          (a[2] = s(
            'p',
            null,
            'Here are the most basic ways to access component libraries in common development patterns.',
            -1,
          )),
      ]),
      s('div', j, [
        s('h3', g, [
          l(o, { to: '#Install' }, { default: t(() => a[3] || (a[3] = [n('#')])), _: 1 }),
          a[4] || (a[4] = n('Install')),
        ]),
        a[8] || (a[8] = s('h4', null, 'CDN', -1)),
        a[9] ||
          (a[9] = s(
            'p',
            null,
            [
              s('code', null, 'maple.js'),
              n(' contain all the styles and logic of the component library, and you can import them.'),
            ],
            -1,
          )),
        l(
          e,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                a[5] ||
                (a[5] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-tag' }, [
                          n('<'),
                          s('span', { class: 'hljs-name' }, 'div'),
                          n(),
                          s('span', { class: 'hljs-attr' }, 'id'),
                          n('='),
                          s('span', { class: 'hljs-string' }, '"app"'),
                          n('>'),
                        ]),
                        s('span', { class: 'hljs-tag' }, [n('</'), s('span', { class: 'hljs-name' }, 'div'), n('>')]),
                        n(`
`),
                        s('span', { class: 'hljs-tag' }, [
                          n('<'),
                          s('span', { class: 'hljs-name' }, 'script'),
                          n(),
                          s('span', { class: 'hljs-attr' }, 'src'),
                          n('='),
                          s('span', { class: 'hljs-string' }, '"https://cdn.jsdelivr.net/npm/vue"'),
                          n('>'),
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
                          s('span', { class: 'hljs-name' }, 'script'),
                          n(),
                          s('span', { class: 'hljs-attr' }, 'src'),
                          n('='),
                          s(
                            'span',
                            { class: 'hljs-string' },
                            '"https://cdn.jsdelivr.net/npm/@maplejs/maple-ui/umd/maple.js"',
                          ),
                          n('>'),
                        ]),
                        s('span', { class: 'hljs-tag' }, [
                          n('</'),
                          s('span', { class: 'hljs-name' }, 'script'),
                          n('>'),
                        ]),
                        n(`
`),
                        s('span', { class: 'hljs-tag' }, [n('<'), s('span', { class: 'hljs-name' }, 'script'), n('>')]),
                        s('span', { class: 'javascript' }, [
                          n(`
  `),
                          s('span', { class: 'hljs-keyword' }, 'const'),
                          n(` app = Vue.createApp({
    `),
                          s('span', { class: 'hljs-attr' }, 'template'),
                          n(': '),
                          s('span', { class: 'hljs-string' }, "'<mp-button>Button</mp-button>'"),
                          n(`
  })
  app.use(Maple).mount(`),
                          s('span', { class: 'hljs-string' }, "'#app'"),
                          n(`)
`),
                        ]),
                        s('span', { class: 'hljs-tag' }, [
                          n('</'),
                          s('span', { class: 'hljs-name' }, 'script'),
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
        a[10] || (a[10] = s('h4', null, 'Webpack/Vite', -1)),
        l(
          e,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                a[6] ||
                (a[6] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' Install with npm, yarn or pnpm'),
                        n(`
`),
                        s(
                          'span',
                          { class: 'hljs-meta' },
                          `
#`,
                        ),
                        s('span', { class: 'bash' }, ' npm'),
                        n(`
npm i @maplejs/maple-ui -S
`),
                        s(
                          'span',
                          { class: 'hljs-meta' },
                          `
#`,
                        ),
                        s('span', { class: 'bash' }, ' yarn'),
                        n(`
yarn add @maplejs/maple-ui
`),
                        s(
                          'span',
                          { class: 'hljs-meta' },
                          `
#`,
                        ),
                        s('span', { class: 'bash' }, ' pnpm'),
                        n(`
pnpm add @maplejs/maple-ui
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
        l(
          e,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                a[7] ||
                (a[7] = [
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
                        n(' Maple '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
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
                        n(),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui/es/style'"),
                        n(`

createApp(App).use(Maple).mount(`),
                        s('span', { class: 'hljs-string' }, "'#app'"),
                        n(`)
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
          l(o, { to: '#SupportDesktop' }, { default: t(() => a[11] || (a[11] = [n('#')])), _: 1 }),
          a[12] || (a[12] = n('Support Desktop')),
        ]),
        a[13] ||
          (a[13] = s(
            'p',
            null,
            [
              s('code', null, 'Maple'),
              n(' is a mobile-first component library. To support desktop, you need to install an adapter. See '),
              s('a', { href: '#/en-US/browserAdaptation' }, 'browser adaptation'),
              n(' for details.'),
            ],
            -1,
          )),
      ]),
      s('div', b, [
        s('h3', k, [
          l(o, { to: '#Chooseadesignsystem' }, { default: t(() => a[14] || (a[14] = [n('#')])), _: 1 }),
          a[15] || (a[15] = n('Choose a design system')),
        ]),
        a[18] ||
          (a[18] = s(
            'p',
            null,
            'Starting from version 3.x, Maple supports both Material Design 2 and Material Design 3 design systems.',
            -1,
          )),
        l(
          e,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                a[16] ||
                (a[16] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-comment' }, '// Maple defaults to Material Design 2 light mode'),
                        n(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        n(' { Themes, StyleProvider } '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        n(`

`),
                        s('span', { class: 'hljs-comment' }, '// Material Design 2 Dark Mode'),
                        n(`
StyleProvider(Themes.dark)
`),
                        s('span', { class: 'hljs-comment' }, '// Material Design 3 Light Mode'),
                        n(`
StyleProvider(Themes.md3Light)
`),
                        s('span', { class: 'hljs-comment' }, '// Material Design 3 Dark Mode'),
                        n(`
StyleProvider(Themes.md3Dark)
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
        l(
          e,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                a[17] ||
                (a[17] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-selector-tag' }, 'body'),
                        n(` {
  `),
                        s('span', { class: 'hljs-attribute' }, 'transition'),
                        n(': background-color .'),
                        s('span', { class: 'hljs-number' }, '25s'),
                        n(', color .'),
                        s('span', { class: 'hljs-number' }, '25s'),
                        n(`;
  `),
                        s('span', { class: 'hljs-attribute' }, 'color'),
                        n(': '),
                        s('span', { class: 'hljs-built_in' }, 'var'),
                        n(`(--color-text);
  `),
                        s('span', { class: 'hljs-attribute' }, 'background-color'),
                        n(': '),
                        s('span', { class: 'hljs-built_in' }, 'var'),
                        n(`(--color-body);
  `),
                        s('span', { class: 'hljs-attribute' }, 'color'),
                        n('-scheme: '),
                        s('span', { class: 'hljs-built_in' }, 'var'),
                        n(`(--color-scheme);
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
      s('div', w, [
        s('h3', v, [
          l(o, { to: '#ComponentsPlayground' }, { default: t(() => a[19] || (a[19] = [n('#')])), _: 1 }),
          a[20] || (a[20] = n('Components Playground')),
        ]),
        a[21] ||
          (a[21] = s(
            'p',
            null,
            [
              n(
                'We provide a web version of the component editor, which is convenient for you to quickly get started with each component of the component library, edit it online, share it with others, or download the code package to run locally. You can click the ',
              ),
              s('code', null, '{...}'),
              n(' icon in the upper right corner of the page or '),
              s('a', { href: 'https://maplejs.org/playground' }, 'go here'),
              n('.'),
            ],
            -1,
          )),
      ]),
    ])
  )
}
const P = r(m, [['render', M]])
export { P as default }
