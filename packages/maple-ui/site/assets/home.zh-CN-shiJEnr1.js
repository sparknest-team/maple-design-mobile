import { p as a, $ as d, m as e, b as i, w as l, e as n, f as p, l as r, Q as s } from './index-CLBN0B2q.js'

const m = { components: {} },
  u = { class: 'maple-site-doc' },
  h = { class: 'card' },
  g = { id: 'jie4shao4' },
  v = { class: 'card' },
  x = { id: 'te4xing4' },
  f = { class: 'card' },
  b = { id: 'guan1fang1sheng1tai4' },
  c = { class: 'card' },
  j = { id: 'she4qu1sheng1tai4' },
  V = { class: 'card' },
  y = { id: 'PR&Issue' },
  k = { class: 'card' },
  w = { id: 'kai1yuan2xie2yi4' },
  z = { class: 'card' },
  C = { id: 'gong4xian4zhi3nan2' },
  N = { class: 'card' },
  S = { id: 'gan3xie4gong4xian4zhe3men0zuo4chu1de0nu3li4' },
  I = { class: 'card' },
  R = { id: 'gan3xie4yi3xia4zan4zhu4zhe3' }
function M(T, t, $, B, P, D) {
  const o = n('router-link')
  return (
    p(),
    r('div', u, [
      t[27] || (t[27] = e('h1', null, '基本介绍', -1)),
      e('div', h, [
        e('h3', g, [
          a(o, { to: '#jie4shao4' }, { default: l(() => t[0] || (t[0] = [s('#')])), _: 1 }),
          t[1] || (t[1] = s('介绍')),
        ]),
        t[2] ||
          (t[2] = e(
            'p',
            null,
            [
              s('Varlet 是一个 '),
              e('code', null, 'Vue3'),
              s(' 组件库，基于 Material Design 2 和 3，支持移动端、桌面端，由 '),
              e('code', null, 'varletjs'),
              s(' 组织维护。'),
            ],
            -1,
          )),
      ]),
      e('div', v, [
        e('h3', x, [
          a(o, { to: '#te4xing4' }, { default: l(() => t[3] || (t[3] = [s('#')])), _: 1 }),
          t[4] || (t[4] = s('特性')),
        ]),
        t[5] ||
          (t[5] = d(
            '<ul><li>🚀   提供 60+ 个高质量通用组件</li><li>🚀   组件十分轻量</li><li>💪   由国人开发，完善的中英文文档和后勤保障</li><li>🛠️   支持按需引入</li><li>🛠️   支持主题定制</li><li>🌍   支持国际化</li><li>💡   支持 webstorm 组件属性高亮</li><li>💪   支持 SSR</li><li>📦   支持 <a href="https://github.com/varletjs/maple-nuxt">Nuxt Module</a></li><li>💡   支持 Typescript</li><li>💪   确保 90% 以上单元测试覆盖率，提供稳定性保证</li><li>🎨   同时支持 Material Design 2 和 Material Design 3 两套设计系统</li><li>🛠️   支持暗黑模式</li><li>🔧   提供官方的 VSCode 插件</li><li>⌨️   支持无障碍访问（持续改进中）</li></ul>',
            1,
          )),
      ]),
      e('div', f, [
        e('h3', b, [
          a(o, { to: '#guan1fang1sheng1tai4' }, { default: l(() => t[6] || (t[6] = [s('#')])), _: 1 }),
          t[7] || (t[7] = s('官方生态')),
        ]),
        t[8] ||
          (t[8] = d(
            '<p>以下项目由官方团队长期维护。</p><table><thead><tr><th>名称</th><th>描述</th></tr></thead><tbody><tr><td><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-cli">@maplejs/maple-cli</a></td><td><code>Vue3 组件库快速成型工具</code></td></tr><tr><td><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-touch-emulator">@maplejs/maple-touch-emulator</a></td><td><code>桌面端适配器，让移动端组件库可以在桌面端运行</code></td></tr><tr><td><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-ui-playground">@maplejs/maple-ui-playground</a></td><td><code>Varlet 组件库在线编辑工具</code></td></tr><tr><td><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-import-resolver">@maplejs/maple-import-resolver</a></td><td><a href="https://github.com/unplugin/unplugin-vue-components">unplugin-vue-components</a> <code>的一个解析器，用于实现 Varlet 按需引入</code></td></tr><tr><td><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-unocss">@maplejs/maple-preset-unocss</a></td><td><code>varlet 的</code> <a href="https://unocss.dev/">UnoCss</a> <code>预设</code></td></tr><tr><td><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-tailwindcss">@maplejs/maple-preset-tailwindcss</a></td><td><code>varlet 的</code> <a href="https://tailwindcss.com/">tailwindcss</a> <code>预设</code></td></tr><tr><td><a href="https://github.com/varletjs/maple-theme-builder">maple-theme-builder</a></td><td><code>主题生成器，用于为 varlet material design 3 生成主题变量</code></td></tr><tr><td><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-vscode-extension">maple-vscode-extension</a></td><td><code>Varlet 组件库 VSCode 插件</code></td></tr><tr><td><a href="https://github.com/varletjs/vscode-theme-varlet">vscode-theme-varlet</a></td><td><code>Varlet VSCode 主题</code></td></tr><tr><td><a href="https://github.com/varletjs/maple-app-template">maple-app-example</a></td><td><code>Varlet 组件库移动端模板</code></td></tr><tr><td><a href="https://github.com/varletjs/maple-install-example">maple-install-example</a></td><td><code>Varlet 组件库与各种生态集成的案例集合</code></td></tr></tbody></table>',
            2,
          )),
      ]),
      e('div', c, [
        e('h3', j, [
          a(o, { to: '#she4qu1sheng1tai4' }, { default: l(() => t[9] || (t[9] = [s('#')])), _: 1 }),
          t[10] || (t[10] = s('社区生态')),
        ]),
        t[11] ||
          (t[11] = d(
            '<p>以下项目由社区人员维护，欢迎补充。</p><table><thead><tr><th>名称</th><th>描述</th></tr></thead><tbody><tr><td><a href="https://github.com/sunniejs/vue-h5-template">vue-h5-template</a></td><td><code>基于 Vue 的移动端模板脚手架，提供了 Varlet 组件库的移动端预设</code></td></tr><tr><td><a href="https://github.com/ErKeLost/create-vite-app">create-vite-app</a></td><td><code>基于 Vue3 的桌面端模板脚手架，提供了 Varlet 组件库的桌面端预设</code></td></tr><tr><td><a href="https://github.com/Simon-He95/vscode-common-intellisense">vscode-common-intellisense</a></td><td><code>为 Varlet 开发人员提供更好的智能感知的 VSCode 扩展</code></td></tr><tr><td><a href="https://github.com/vue-zone/vue3-maple-mobile">vue3-maple-mobile</a></td><td><code>基于 Vue 3 和 Varlet 组件库的移动模板</code></td></tr></tbody></table>',
            2,
          )),
      ]),
      e('div', V, [
        e('h3', y, [
          a(o, { to: '#PR&Issue' }, { default: l(() => t[12] || (t[12] = [s('#')])), _: 1 }),
          t[13] || (t[13] = s('PR & Issue')),
        ]),
        t[14] ||
          (t[14] = e(
            'p',
            null,
            [
              s('使用过程中出现的问题可以到 '),
              e('a', { href: 'https://github.com/varletjs/varlet' }, 'github'),
              s(' 来给我们提 '),
              e('a', { href: 'https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/issues' }, 'issue'),
              s('， 我们会在第一时间处理问题。也可以给我们提 '),
              e('a', { href: 'https://github.com/varletjs/varlet/pulls' }, 'PR'),
              s('，我们也十分欢迎小伙伴们来参与贡献。'),
            ],
            -1,
          )),
      ]),
      e('div', k, [
        e('h3', w, [
          a(o, { to: '#kai1yuan2xie2yi4' }, { default: l(() => t[15] || (t[15] = [s('#')])), _: 1 }),
          t[16] || (t[16] = s('开源协议')),
        ]),
        t[17] || (t[17] = e('p', null, [s('组件库基于 '), e('code', null, 'MIT'), s(' 协议。')], -1)),
      ]),
      e('div', z, [
        e('h3', C, [
          a(o, { to: '#gong4xian4zhi3nan2' }, { default: l(() => t[18] || (t[18] = [s('#')])), _: 1 }),
          t[19] || (t[19] = s('贡献指南')),
        ]),
        t[20] ||
          (t[20] = e(
            'p',
            null,
            [
              s('详情见 '),
              e(
                'a',
                { href: 'https://github.com/varletjs/varlet/blob/dev/.github/CONTRIBUTING.md' },
                'Varlet 贡献指南',
              ),
              s('。'),
            ],
            -1,
          )),
      ]),
      e('div', N, [
        e('h3', S, [
          a(
            o,
            { to: '#gan3xie4gong4xian4zhe3men0zuo4chu1de0nu3li4' },
            { default: l(() => t[21] || (t[21] = [s('#')])), _: 1 },
          ),
          t[22] || (t[22] = s('感谢贡献者们做出的努力')),
        ]),
        t[23] ||
          (t[23] = e(
            'a',
            {
              href: 'https://github.com/varletjs/varlet/graphs/contributors',
              style: { width: '100%', display: 'block', 'margin-top': '16px' },
            },
            [
              e('img', {
                src: 'https://contrib.rocks/image?repo=varletjs/varlet',
                style: { width: '100%', display: 'block', 'border-radius': '4px' },
              }),
            ],
            -1,
          )),
      ]),
      e('div', I, [
        e('h3', R, [
          a(o, { to: '#gan3xie4yi3xia4zan4zhu4zhe3' }, { default: l(() => t[24] || (t[24] = [s('#')])), _: 1 }),
          t[25] || (t[25] = s('感谢以下赞助者')),
        ]),
        t[26] ||
          (t[26] = e(
            'a',
            {
              href: 'https://cdn.jsdelivr.net/gh/varletjs/maple-static/sponsorkit/sponsors.svg',
              style: { width: '100%', display: 'block', 'margin-top': '16px' },
            },
            [
              e('img', {
                src: 'https://cdn.jsdelivr.net/gh/varletjs/maple-static/sponsorkit/sponsors.svg',
                style: { width: '100%', display: 'block', 'border-radius': '4px' },
              }),
            ],
            -1,
          )),
      ]),
    ])
  )
}
const q = i(m, [['render', M]])
export { q as default }
