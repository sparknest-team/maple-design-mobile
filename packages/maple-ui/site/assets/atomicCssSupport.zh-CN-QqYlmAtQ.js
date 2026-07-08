import { p as a, f as d, l as i, Q as l, e as o, b as r, m as s, w as t } from './index-CLBN0B2q.js'

const m = { components: {} },
  j = { class: 'maple-site-doc' },
  h = { class: 'card' },
  c = { id: 'jie4shao4' },
  g = { class: 'card' },
  u = { id: 'UnoCSS' },
  w = { class: 'card' },
  f = { id: 'Tailwindcss' },
  y = { class: 'card' },
  x = { id: 'shi3yong4fang1shi4' }
function k(b, n, v, C, S, D) {
  const e = o('router-link'),
    p = o('mp-site-code-example')
  return (
    d(),
    i('div', j, [
      n[27] || (n[27] = s('h1', null, '原子化 CSS 支持', -1)),
      s('div', h, [
        s('h3', c, [
          a(e, { to: '#jie4shao4' }, { default: t(() => n[0] || (n[0] = [l('#')])), _: 1 }),
          n[1] || (n[1] = l('介绍')),
        ]),
        n[2] ||
          (n[2] = s(
            'p',
            null,
            '我们提供了常见的 CSS 原子化框架预设，使访问组件库的基础样式变量更加容易，并且一致化了页面响应式断点。',
            -1,
          )),
      ]),
      s('div', g, [
        s('h3', u, [
          a(e, { to: '#UnoCSS' }, { default: t(() => n[3] || (n[3] = [l('#')])), _: 1 }),
          n[4] || (n[4] = l('UnoCSS')),
        ]),
        n[7] || (n[7] = s('h4', null, '安装', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                n[5] ||
                (n[5] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' npm'),
                        l(`
npm i @maplejs/maple-preset-unocss -D
`),
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' yarn'),
                        l(`
yarn add @maplejs/maple-preset-unocss -D
`),
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' pnpm'),
                        l(`
pnpm add @maplejs/maple-preset-unocss -D
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
        n[8] || (n[8] = s('h4', null, '配置', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                n[6] ||
                (n[6] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-comment' }, '// uno.config.ts'),
                        l(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        l(' { defineConfig, presetUno } '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        l(),
                        s('span', { class: 'hljs-string' }, "'unocss'"),
                        l(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        l(' { presetMaple } '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        l(),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-preset-unocss'"),
                        l(`

`),
                        s('span', { class: 'hljs-keyword' }, 'export'),
                        l(),
                        s('span', { class: 'hljs-keyword' }, 'default'),
                        l(` defineConfig({
  `),
                        s('span', { class: 'hljs-attr' }, 'presets'),
                        l(`: [presetUno(), presetMaple()]
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
        n[9] || (n[9] = s('h4', null, '更多配置', -1)),
        n[10] ||
          (n[10] = s(
            'p',
            null,
            [
              l('预设的详细定义'),
              s(
                'a',
                {
                  href: 'https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-unocss/src/index.ts',
                },
                '请看这里',
              ),
              l('。'),
            ],
            -1,
          )),
      ]),
      s('div', w, [
        s('h3', f, [
          a(e, { to: '#Tailwindcss' }, { default: t(() => n[11] || (n[11] = [l('#')])), _: 1 }),
          n[12] || (n[12] = l('Tailwindcss')),
        ]),
        n[17] || (n[17] = s('h4', null, '安装', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                n[13] ||
                (n[13] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' npm'),
                        l(`
npm i @maplejs/maple-preset-tailwindcss -D
`),
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' yarn'),
                        l(`
yarn add @maplejs/maple-preset-tailwindcss -D
`),
                        s('span', { class: 'hljs-meta' }, '#'),
                        s('span', { class: 'bash' }, ' pnpm'),
                        l(`
pnpm add @maplejs/maple-preset-tailwindcss -D
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
        n[18] || (n[18] = s('h4', null, 'Tailwindcss V3 配置', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                n[14] ||
                (n[14] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-comment' }, '// tailwind.config.js'),
                        l(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        l(' { presetMaple } '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        l(),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-preset-tailwindcss'"),
                        l(`

`),
                        s('span', { class: 'hljs-keyword' }, 'export'),
                        l(),
                        s('span', { class: 'hljs-keyword' }, 'default'),
                        l(` {
  `),
                        s('span', { class: 'hljs-attr' }, 'content'),
                        l(`: [
    `),
                        s('span', { class: 'hljs-string' }, "'./index.html'"),
                        l(`,
    `),
                        s('span', { class: 'hljs-string' }, "'./src/**/*.{vue,js,ts,jsx,tsx}'"),
                        l(`,
  ],
  `),
                        s('span', { class: 'hljs-attr' }, 'presets'),
                        l(`: [presetMaple()]
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
        n[19] || (n[19] = s('h4', null, 'Tailwindcss V4 配置', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                n[15] ||
                (n[15] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-comment' }, '// tailwind.config.js'),
                        l(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        l(' { presetMaple } '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        l(),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-preset-tailwindcss'"),
                        l(`

`),
                        s('span', { class: 'hljs-keyword' }, 'export'),
                        l(),
                        s('span', { class: 'hljs-keyword' }, 'default'),
                        l(` {
  `),
                        s('span', { class: 'hljs-attr' }, 'presets'),
                        l(`: [presetMaple()]
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
        a(p, null, {
          default: t(
            () =>
              n[16] ||
              (n[16] = [
                s(
                  'pre',
                  { class: 'hljs' },
                  [
                    s('code', null, [
                      s('span', { class: 'hljs-comment' }, '/** src/style.css */'),
                      l(`
`),
                      s('span', { class: 'hljs-keyword' }, '@import'),
                      l(),
                      s('span', { class: 'hljs-string' }, '"tailwindcss"'),
                      l(`;
`),
                      s('span', { class: 'hljs-keyword' }, '@config'),
                      l(),
                      s('span', { class: 'hljs-string' }, '"../tailwind.config.js"'),
                      l(`;
`),
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
        n[20] || (n[20] = s('h4', null, '更多配置', -1)),
        n[21] ||
          (n[21] = s(
            'p',
            null,
            [
              l('预设的详细定义'),
              s(
                'a',
                {
                  href: 'https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-tailwindcss/src/index.ts',
                },
                '请看这里',
              ),
              l('。'),
            ],
            -1,
          )),
      ]),
      s('div', y, [
        s('h3', x, [
          a(e, { to: '#shi3yong4fang1shi4' }, { default: t(() => n[22] || (n[22] = [l('#')])), _: 1 }),
          n[23] || (n[23] = l('使用方式')),
        ]),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                n[24] ||
                (n[24] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-tag' }, [
                          l('<'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          l('>'),
                        ]),
                        l(`
  `),
                        s('span', { class: 'hljs-tag' }, [
                          l('<'),
                          s('span', { class: 'hljs-name' }, 'div'),
                          l(),
                          s('span', { class: 'hljs-attr' }, 'class'),
                          l('='),
                          s('span', { class: 'hljs-string' }, '"text-on-primary bg-primary text-md"'),
                          l('>'),
                        ]),
                        l('hello'),
                        s('span', { class: 'hljs-tag' }, [l('</'), s('span', { class: 'hljs-name' }, 'div'), l('>')]),
                        l(`
  `),
                        s('span', { class: 'hljs-tag' }, [
                          l('<'),
                          s('span', { class: 'hljs-name' }, 'div'),
                          l(),
                          s('span', { class: 'hljs-attr' }, 'class'),
                          l('='),
                          s(
                            'span',
                            { class: 'hljs-string' },
                            '"text-on-primary-container bg-primary-container text-lg"',
                          ),
                          l('>'),
                        ]),
                        l('world'),
                        s('span', { class: 'hljs-tag' }, [l('</'), s('span', { class: 'hljs-name' }, 'div'), l('>')]),
                        l(`
  `),
                        s('span', { class: 'hljs-tag' }, [
                          l('<'),
                          s('span', { class: 'hljs-name' }, 'div'),
                          l(),
                          s('span', { class: 'hljs-attr' }, 'class'),
                          l('='),
                          s(
                            'span',
                            { class: 'hljs-string' },
                            '"bg-primary sm:bg-info md:bg-warning lg:bg-danger xl:bg-success"',
                          ),
                          l('>'),
                        ]),
                        l('varlet'),
                        s('span', { class: 'hljs-tag' }, [l('</'), s('span', { class: 'hljs-name' }, 'div'), l('>')]),
                        l(`
`),
                        s('span', { class: 'hljs-tag' }, [
                          l('</'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          l('>'),
                        ]),
                        l(`
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
        n[26] || (n[26] = s('p', null, '我们同时也支持了 hsl 变量，这使得调整颜色的透明度变得更加容易。', -1)),
        a(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                n[25] ||
                (n[25] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-tag' }, [
                          l('<'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          l('>'),
                        ]),
                        l(`
  `),
                        s('span', { class: 'hljs-tag' }, [
                          l('<'),
                          s('span', { class: 'hljs-name' }, 'div'),
                          l(),
                          s('span', { class: 'hljs-attr' }, 'class'),
                          l('='),
                          s('span', { class: 'hljs-string' }, '"bg-hsl-primary/50 text-hsl-text/70"'),
                          l('>'),
                        ]),
                        l('hello'),
                        s('span', { class: 'hljs-tag' }, [l('</'), s('span', { class: 'hljs-name' }, 'div'), l('>')]),
                        l(`
`),
                        s('span', { class: 'hljs-tag' }, [
                          l('</'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          l('>'),
                        ]),
                        l(`
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
const T = r(m, [['render', k]])
export { T as default }
