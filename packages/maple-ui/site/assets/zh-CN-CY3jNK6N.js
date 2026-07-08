import { m as a, f as c, e as i, p as n, b as o, l as r, Q as s, w as t } from './index-CLBN0B2q.js'

const j = { components: {} },
  h = { class: 'maple-site-doc' },
  d = { class: 'card' },
  m = { id: 'jie4shao4' },
  u = { class: 'card' },
  g = { id: 'yin3ru4yang4shi4' },
  b = { class: 'card' },
  f = { id: 'ji1ben3shi3yong4' }
function x(y, l, v, _, k, w) {
  const e = i('router-link'),
    p = i('mp-site-code-example')
  return (
    c(),
    r('div', h, [
      l[10] || (l[10] = a('h1', null, '海拔效果', -1)),
      a('div', d, [
        a('h3', m, [
          n(e, { to: '#jie4shao4' }, { default: t(() => l[0] || (l[0] = [s('#')])), _: 1 }),
          l[1] || (l[1] = s('介绍')),
        ]),
        l[2] ||
          (l[2] = a(
            'p',
            null,
            [s('组件库提供了基于 '), a('code', null, 'Material'), s(' 规范的阴影海拔效果，用来表现元素的立体感。')],
            -1,
          )),
      ]),
      a('div', u, [
        a('h3', g, [
          n(e, { to: '#yin3ru4yang4shi4' }, { default: t(() => l[3] || (l[3] = [s('#')])), _: 1 }),
          l[4] || (l[4] = s('引入样式')),
        ]),
        n(
          p,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                l[5] ||
                (l[5] = [
                  a(
                    'pre',
                    { class: 'hljs' },
                    [
                      a('code', null, [
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'@maplejs/maple-ui/es/styles/elevation.css'"),
                        s(`
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
      a('div', b, [
        a('h3', f, [
          n(e, { to: '#ji1ben3shi3yong4' }, { default: t(() => l[6] || (l[6] = [s('#')])), _: 1 }),
          l[7] || (l[7] = s('基本使用')),
        ]),
        l[9] ||
          (l[9] = a('p', null, [s('阴影程度划分为 '), a('code', null, '0-24'), s(' 个等级，等级越高海拔越高。')], -1)),
        n(p, null, {
          default: t(
            () =>
              l[8] ||
              (l[8] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-space'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'class'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"elevation-example-list"'),
                        s(),
                        a('span', { class: 'hljs-attr' }, ':size'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"[40, 0]"'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'justify'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"space-between"'),
                        s('>'),
                      ]),
                      s(`
    `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'div'),
                        s(`
      `),
                        a('span', { class: 'hljs-attr' }, 'class'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"elevation-example-item"'),
                        s(`
      `),
                        a('span', { class: 'hljs-attr' }, ':class'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"`mp-elevation--${e - 1}`"'),
                        s(`
      `),
                        a('span', { class: 'hljs-attr' }, 'v-for'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"e in 25"'),
                        s(`
      `),
                        a('span', { class: 'hljs-attr' }, ':key'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"e"'),
                        s(`
    >`),
                      ]),
                      s(`
      {{ e - 1 }}
    `),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'div'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('</'),
                        a('span', { class: 'hljs-name' }, 'mp-space'),
                        s('>'),
                      ]),
                      s(`
`),
                      a('span', { class: 'hljs-tag' }, [
                        s('</'),
                        a('span', { class: 'hljs-name' }, 'template'),
                        s('>'),
                      ]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'style'), s('>')]),
                      a('span', { class: 'css' }, [
                        s(`
`),
                        a('span', { class: 'hljs-selector-class' }, '.elevation-example-list'),
                        s(` {
  `),
                        a('span', { class: 'hljs-attribute' }, 'margin-top'),
                        s(': '),
                        a('span', { class: 'hljs-number' }, '8px'),
                        s(),
                        a('span', { class: 'hljs-meta' }, '!important'),
                        s(`;
}

`),
                        a('span', { class: 'hljs-selector-class' }, '.elevation-example-item'),
                        s(` {
  `),
                        a('span', { class: 'hljs-attribute' }, 'display'),
                        s(`: flex;
  `),
                        a('span', { class: 'hljs-attribute' }, 'justify-content'),
                        s(`: center;
  `),
                        a('span', { class: 'hljs-attribute' }, 'align-items'),
                        s(`: center;
  `),
                        a('span', { class: 'hljs-attribute' }, 'width'),
                        s(': '),
                        a('span', { class: 'hljs-number' }, '100px'),
                        s(`;
  `),
                        a('span', { class: 'hljs-attribute' }, 'height'),
                        s(': '),
                        a('span', { class: 'hljs-number' }, '100px'),
                        s(`;
  `),
                        a('span', { class: 'hljs-attribute' }, 'border-radius'),
                        s(': '),
                        a('span', { class: 'hljs-number' }, '4px'),
                        s(`;
}
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'style'), s('>')]),
                      s(`
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
    ])
  )
}
const N = o(j, [['render', x]])
export { N as default }
