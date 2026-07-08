import { $ as d, w as e, l as i, f as m, Q as n, p as o, e as p, b as r, m as s } from './index-CLBN0B2q.js'

const u = { components: {} },
  c = { class: 'maple-site-doc' },
  h = { class: 'card' },
  j = { id: 'Intro' },
  w = { class: 'card' },
  f = { id: 'MobileAdaptation' },
  v = { class: 'card' },
  b = { id: 'DesktopAdaptation' }
function g(k, t, y, T, x, A) {
  const a = p('router-link'),
    l = p('mp-site-code-example')
  return (
    m(),
    i('div', c, [
      t[23] || (t[23] = s('h1', null, 'Browser Adaptation', -1)),
      s('div', h, [
        s('h3', j, [
          o(a, { to: '#Intro' }, { default: e(() => t[0] || (t[0] = [n('#')])), _: 1 }),
          t[1] || (t[1] = n('Intro')),
        ]),
        t[2] ||
          (t[2] = s(
            'p',
            null,
            [
              n('The component library provides mobile and desktop adaptations, scheme '),
              s('code', null, 'maple-touch-emulator'),
              n(' is used for mobile terminal adaptation, scheme '),
              s('code', null, 'maple-touch-emulator'),
              n(' is used for mobile terminal adaptation.'),
            ],
            -1,
          )),
      ]),
      s('div', w, [
        s('h3', f, [
          o(a, { to: '#MobileAdaptation' }, { default: e(() => t[3] || (t[3] = [n('#')])), _: 1 }),
          t[4] || (t[4] = n('Mobile Adaptation')),
        ]),
        t[11] ||
          (t[11] = d(
            '<h4>CSS Unit Adaptation</h4><p>The component library design is based on the <code>375px</code> width design draft. It is recommended to use <a href="https://github.com/evrone/postcss-px-to-viewport">postcss-px-to-viewport</a> to convert <code>px</code> units into <code>vw</code> units to achieve mobile terminal adaptation. Create <code>postcss.config.js</code> under the <code>Webpack/Vite</code> project root path And do the following configuration <code>375px -&gt; 100vw</code>.</p>',
            2,
          )),
        o(
          l,
          { 'playground-ignore': '' },
          {
            default: e(
              () =>
                t[5] ||
                (t[5] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' npm'),
                        n(`
npm i postcss-px-to-viewport -D
`),
                        s(
                          'span',
                          { class: 'hljs-meta' },
                          `
#`,
                        ),
                        s('span', { class: 'bash' }, ' yarn'),
                        n(`
yarn add postcss-px-to-viewport -D
`),
                        s(
                          'span',
                          { class: 'hljs-meta' },
                          `
#`,
                        ),
                        s('span', { class: 'bash' }, ' pnpm'),
                        n(`
pnpm add postcss-px-to-viewport -D
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
        o(
          l,
          { 'playground-ignore': '' },
          {
            default: e(
              () =>
                t[6] ||
                (t[6] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-comment' }, '// postcss.config.js'),
                        n(`
`),
                        s('span', { class: 'hljs-built_in' }, 'module'),
                        n(`.exports = {
  `),
                        s('span', { class: 'hljs-attr' }, 'plugins'),
                        n(`: {
    `),
                        s('span', { class: 'hljs-string' }, "'postcss-px-to-viewport'"),
                        n(`: {
      `),
                        s('span', { class: 'hljs-attr' }, 'viewportWidth'),
                        n(': '),
                        s('span', { class: 'hljs-number' }, '375'),
                        n(`,
      `),
                        s('span', { class: 'hljs-attr' }, 'unitPrecision'),
                        n(': '),
                        s('span', { class: 'hljs-number' }, '6'),
                        n(`,
      `),
                        s('span', { class: 'hljs-attr' }, 'unitToConvert'),
                        n(': '),
                        s('span', { class: 'hljs-string' }, "'px'"),
                        n(`,
      `),
                        s('span', { class: 'hljs-attr' }, 'viewportUnit'),
                        n(': '),
                        s('span', { class: 'hljs-string' }, "'vmin'"),
                        n(`,
      `),
                        s('span', { class: 'hljs-attr' }, 'fontViewportUnit'),
                        n(': '),
                        s('span', { class: 'hljs-string' }, "'vmin'"),
                        n(`,
      `),
                        s('span', { class: 'hljs-attr' }, 'propList'),
                        n(': ['),
                        s('span', { class: 'hljs-string' }, "'*'"),
                        n(`],
    }
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
        t[12] || (t[12] = s('h4', null, 'Theme Unit Adaptation (Viewport)', -1)),
        t[13] ||
          (t[13] = s(
            'p',
            null,
            [
              n(
                'Because the theme is mounted at runtime and is not affected by postcss, the component library provides a utility tool ',
              ),
              s('code', null, 'Themes.toViewport'),
              n(' for adaptation. The theme returned by the function will use the '),
              s('code', null, '375px -> 100vmin'),
              n(' rule by default.'),
            ],
            -1,
          )),
        o(l, null, {
          default: e(
            () =>
              t[7] ||
              (t[7] = [
                s(
                  'pre',
                  { class: 'hljs' },
                  [
                    s('code', null, [
                      s('span', { class: 'hljs-keyword' }, 'import'),
                      n(' { Themes } '),
                      s('span', { class: 'hljs-keyword' }, 'from'),
                      n(),
                      s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                      n(`

`),
                      s('span', { class: 'hljs-keyword' }, 'const'),
                      n(` viewportTheme = Themes.toViewport(Themes.md3Dark)
`),
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
        t[14] || (t[14] = s('p', null, 'You can also make changes to the conversion rules', -1)),
        o(l, null, {
          default: e(
            () =>
              t[8] ||
              (t[8] = [
                s(
                  'pre',
                  { class: 'hljs' },
                  [
                    s('code', null, [
                      s('span', { class: 'hljs-keyword' }, 'import'),
                      n(' { Themes } '),
                      s('span', { class: 'hljs-keyword' }, 'from'),
                      n(),
                      s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                      n(`

`),
                      s('span', { class: 'hljs-keyword' }, 'const'),
                      n(` viewportTheme = Themes.toViewport(Themes.md3Dark, {
  `),
                      s('span', { class: 'hljs-comment' }, '// defaults 375'),
                      n(`
  `),
                      s('span', { class: 'hljs-attr' }, 'viewportWidth'),
                      n(': '),
                      s('span', { class: 'hljs-number' }, '750'),
                      n(`,
  `),
                      s('span', { class: 'hljs-comment' }, "// defaults 'vmin'"),
                      n(`
  `),
                      s('span', { class: 'hljs-attr' }, 'viewportUnit'),
                      n(': '),
                      s('span', { class: 'hljs-string' }, "'vw'"),
                      n(`,
  `),
                      s('span', { class: 'hljs-comment' }, '// defaults 6'),
                      n(`
  `),
                      s('span', { class: 'hljs-attr' }, 'unitPrecision'),
                      n(': '),
                      s('span', { class: 'hljs-number' }, '4'),
                      n(`,
})
`),
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
        t[15] || (t[15] = s('h4', null, 'Theme Unit Adaptation (Rem)', -1)),
        t[16] || (t[16] = s('p', null, 'Similar to the Viewport solution', -1)),
        o(l, null, {
          default: e(
            () =>
              t[9] ||
              (t[9] = [
                s(
                  'pre',
                  { class: 'hljs' },
                  [
                    s('code', null, [
                      s('span', { class: 'hljs-keyword' }, 'import'),
                      n(' { Themes } '),
                      s('span', { class: 'hljs-keyword' }, 'from'),
                      n(),
                      s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                      n(`

`),
                      s('span', { class: 'hljs-keyword' }, 'const'),
                      n(` remTheme = Themes.toRem(Themes.md3Dark)
`),
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
        t[17] || (t[17] = s('p', null, 'Or customize', -1)),
        o(l, null, {
          default: e(
            () =>
              t[10] ||
              (t[10] = [
                s(
                  'pre',
                  { class: 'hljs' },
                  [
                    s('code', null, [
                      s('span', { class: 'hljs-keyword' }, 'import'),
                      n(' { Themes } '),
                      s('span', { class: 'hljs-keyword' }, 'from'),
                      n(),
                      s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                      n(`

`),
                      s('span', { class: 'hljs-keyword' }, 'const'),
                      n(` viewportTheme = Themes.toRem(Themes.md3Dark, {
  `),
                      s('span', { class: 'hljs-comment' }, '// defaults 16'),
                      n(`
  `),
                      s('span', { class: 'hljs-attr' }, 'rootFontSize'),
                      n(': '),
                      s('span', { class: 'hljs-number' }, '32'),
                      n(`,
  `),
                      s('span', { class: 'hljs-comment' }, '// defaults 6'),
                      n(`
  `),
                      s('span', { class: 'hljs-attr' }, 'unitPrecision'),
                      n(': '),
                      s('span', { class: 'hljs-number' }, '4'),
                      n(`,
})
`),
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      s('div', v, [
        s('h3', b, [
          o(a, { to: '#DesktopAdaptation' }, { default: e(() => t[18] || (t[18] = [n('#')])), _: 1 }),
          t[19] || (t[19] = n('Desktop Adaptation')),
        ]),
        t[22] ||
          (t[22] = s(
            'p',
            null,
            [
              n('Because component library interaction events are developed using '),
              s('code', null, 'touch'),
              n(' events, '),
              s('code', null, 'mouse'),
              n(' events on the desktop side are not supported. It is recommended to use '),
              s('code', null, '@maplejs/maple-touch-emulator'),
              n(' to set '),
              s('code', null, 'touch -> mouse'),
              n(' for desktop adaptation.'),
            ],
            -1,
          )),
        o(
          l,
          { 'playground-ignore': '' },
          {
            default: e(
              () =>
                t[20] ||
                (t[20] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' npm'),
                        n(`
npm i @maplejs/maple-touch-emulator
`),
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' yarn'),
                        n(`
yarn add @maplejs/maple-touch-emulator
`),
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' pnpm'),
                        n(`
pnpm add @maplejs/maple-touch-emulator
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
        o(
          l,
          { 'playground-ignore': '' },
          {
            default: e(
              () =>
                t[21] ||
                (t[21] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        n(),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-touch-emulator'"),
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
const D = r(u, [['render', g]])
export { D as default }
