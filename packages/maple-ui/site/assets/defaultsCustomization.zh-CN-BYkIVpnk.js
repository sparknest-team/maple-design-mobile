import { p as a, f as i, Q as l, l as m, e as p, b as r, m as s, w as t } from './index-CLBN0B2q.js'

const d = { components: {} },
  j = { class: 'maple-site-doc' },
  u = { class: 'card' },
  c = { id: 'jie4shao4' },
  h = { class: 'card' },
  g = { id: 'ji1ben3yong4fa3' }
function f(y, n, _, b, v, x) {
  const o = p('router-link'),
    e = p('mp-site-code-example')
  return (
    i(),
    m('div', j, [
      n[10] || (n[10] = s('h1', null, '默认值定制', -1)),
      s('div', u, [
        s('h3', c, [
          a(o, { to: '#jie4shao4' }, { default: t(() => n[0] || (n[0] = [l('#')])), _: 1 }),
          n[1] || (n[1] = l('介绍')),
        ]),
        n[2] || (n[2] = s('p', null, '组件库提供对组件属性的默认值进行定制的能力。', -1)),
      ]),
      s('div', h, [
        s('h3', g, [
          a(o, { to: '#ji1ben3yong4fa3' }, { default: t(() => n[3] || (n[3] = [l('#')])), _: 1 }),
          n[4] || (n[4] = l('基本用法')),
        ]),
        n[8] ||
          (n[8] = s(
            'p',
            null,
            [
              l('通过组件提供的静态方法 '),
              s('code', null, 'setPropsDefaults'),
              l(
                ' 对组件的属性定义进行定制。需要注意的是，属性定制只对声明式组件生效，并且定制行为应在组件初始化之前。',
              ),
            ],
            -1,
          )),
        a(
          e,
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
                        s('span', { class: 'hljs-comment' }, '// main.ts'),
                        l(`
`),
                        s('span', { class: 'hljs-keyword' }, 'import'),
                        l(' { Button } '),
                        s('span', { class: 'hljs-keyword' }, 'from'),
                        l(),
                        s('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        l(`

Button.setPropsDefaults({
  `),
                        s('span', { class: 'hljs-attr' }, 'type'),
                        l(': '),
                        s('span', { class: 'hljs-string' }, "'primary'"),
                        l(`,
  `),
                        s('span', { class: 'hljs-attr' }, 'elevation'),
                        l(': '),
                        s('span', { class: 'hljs-number' }, '10'),
                        l(`
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
        n[9] || (n[9] = s('p', null, '定制之后，下面两种写法将会是等价的。', -1)),
        a(
          e,
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
                        s('span', { class: 'hljs-comment' }, '<!-- App.vue -->'),
                        l(`
`),
                        s('span', { class: 'hljs-tag' }, [
                          l('<'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          l('>'),
                        ]),
                        l(`
  `),
                        s('span', { class: 'hljs-tag' }, [
                          l('<'),
                          s('span', { class: 'hljs-name' }, 'mp-button'),
                          l('>'),
                        ]),
                        l('Hello'),
                        s('span', { class: 'hljs-tag' }, [
                          l('</'),
                          s('span', { class: 'hljs-name' }, 'mp-button'),
                          l('>'),
                        ]),
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
        a(
          e,
          { 'playground-ignore': '' },
          {
            default: t(
              () =>
                n[7] ||
                (n[7] = [
                  s(
                    'pre',
                    { class: 'hljs' },
                    [
                      s('code', null, [
                        s('span', { class: 'hljs-comment' }, '<!-- App.vue -->'),
                        l(`
`),
                        s('span', { class: 'hljs-tag' }, [
                          l('<'),
                          s('span', { class: 'hljs-name' }, 'template'),
                          l('>'),
                        ]),
                        l(`
  `),
                        s('span', { class: 'hljs-tag' }, [
                          l('<'),
                          s('span', { class: 'hljs-name' }, 'mp-button'),
                          l(),
                          s('span', { class: 'hljs-attr' }, 'type'),
                          l('='),
                          s('span', { class: 'hljs-string' }, '"primary"'),
                          l(),
                          s('span', { class: 'hljs-attr' }, ':elevation'),
                          l('='),
                          s('span', { class: 'hljs-string' }, '"10"'),
                          l('>'),
                        ]),
                        l('Hello'),
                        s('span', { class: 'hljs-tag' }, [
                          l('</'),
                          s('span', { class: 'hljs-name' }, 'mp-button'),
                          l('>'),
                        ]),
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
const w = r(d, [['render', f]])
export { w as default }
