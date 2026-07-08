import { e as c, p as e, l as i, $ as n, w as o, f as p, b as r, Q as s, m as t } from './index-CLBN0B2q.js'

const h = { components: {} },
  m = { class: 'maple-site-doc' },
  g = { class: 'card' },
  j = { id: 'Intro' },
  u = { class: 'card' },
  f = { id: 'BasicUsage' },
  b = { class: 'card' },
  y = { id: 'ModifyTitle' },
  k = { class: 'card' },
  v = { id: 'HideButton' },
  w = { class: 'card' },
  D = { id: 'HandlerUserBehavior' },
  C = { class: 'card' },
  B = { id: 'AsynchronousClosing' },
  S = { class: 'card' },
  x = { id: 'BasicUsage' },
  A = { class: 'card' },
  M = { id: 'AsynchronousClosing' },
  T = { class: 'card' },
  W = { id: 'CustomSlots' },
  N = { class: 'card' },
  O = { id: 'Props' },
  U = { class: 'card' },
  E = { id: 'Events' },
  H = { class: 'card' },
  P = { id: 'Methods' },
  I = { class: 'card' },
  V = { id: 'DialogOptions' },
  z = { class: 'card' },
  $ = { id: 'Slots' },
  F = { class: 'card' },
  K = { id: 'StyleVariables' }
function R(Y, a, Q, _, q, G) {
  const d = c('router-link'),
    l = c('mp-site-code-example')
  return (
    p(),
    i('div', m, [
      a[47] || (a[47] = t('h1', null, 'Dialog', -1)),
      t('div', g, [
        t('h3', j, [
          e(d, { to: '#Intro' }, { default: o(() => a[0] || (a[0] = [s('#')])), _: 1 }),
          a[1] || (a[1] = s('Intro')),
        ]),
        a[2] ||
          (a[2] = t(
            'p',
            null,
            [
              s('A dialog pops up to display the content and handle the user interaction. '),
              t('code', null, 'Dialog'),
              s(
                ' have provided functional and component usage, and there is no essential difference between the two usage effects and parameters.',
              ),
            ],
            -1,
          )),
      ]),
      a[48] || (a[48] = t('h2', null, 'Function Call', -1)),
      t('div', u, [
        t('h3', f, [
          e(d, { to: '#BasicUsage' }, { default: o(() => a[3] || (a[3] = [s('#')])), _: 1 }),
          a[4] || (a[4] = s('Basic Usage')),
        ]),
        e(l, null, {
          default: o(
            () =>
              a[5] ||
              (a[5] = [
                t(
                  'pre',
                  { class: 'hljs' },
                  [
                    t('code', null, [
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      t('span', { class: 'javascript' }, [
                        s(`
`),
                        t('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Dialog } '),
                        t('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        t('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`
`),
                      ]),
                      t('span', { class: 'hljs-tag' }, [s('</'), t('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      t('span', { class: 'hljs-tag' }, [s('<'), t('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'type'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"primary"'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'block'),
                        s(' @'),
                        t('span', { class: 'hljs-attr' }, 'click'),
                        s('='),
                        t(
                          'span',
                          { class: 'hljs-string' },
                          `"Dialog('Don\\'t Wanna See No Blood, Don\\'t Be A Macho Man')"`,
                        ),
                        s('>'),
                      ]),
                      s('Basic Use'),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s('>'),
                      ]),
                      s(`
`),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'template'),
                        s('>'),
                      ]),
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
      t('div', b, [
        t('h3', y, [
          e(d, { to: '#ModifyTitle' }, { default: o(() => a[6] || (a[6] = [s('#')])), _: 1 }),
          a[7] || (a[7] = s('Modify Title')),
        ]),
        e(l, null, {
          default: o(
            () =>
              a[8] ||
              (a[8] = [
                t(
                  'pre',
                  { class: 'hljs' },
                  [
                    t('code', null, [
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      t('span', { class: 'javascript' }, [
                        s(`
`),
                        t('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Dialog } '),
                        t('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        t('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`

`),
                        t('span', { class: 'hljs-function' }, [
                          t('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          t('span', { class: 'hljs-title' }, 'modifyTitle'),
                          s('('),
                          t('span', { class: 'hljs-params' }),
                          s(') '),
                        ]),
                        s(`{
  Dialog({
    `),
                        t('span', { class: 'hljs-attr' }, 'title'),
                        s(': '),
                        t('span', { class: 'hljs-string' }, "'Beat It'"),
                        s(`,
    `),
                        t('span', { class: 'hljs-attr' }, 'message'),
                        s(': '),
                        t('span', { class: 'hljs-string' }, "'Don\\'t Wanna See No Blood, Don\\'t Be A Macho Man'"),
                        s(`,
  })
}
`),
                      ]),
                      t('span', { class: 'hljs-tag' }, [s('</'), t('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      t('span', { class: 'hljs-tag' }, [s('<'), t('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'type'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"primary"'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'block'),
                        s(' @'),
                        t('span', { class: 'hljs-attr' }, 'click'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"modifyTitle"'),
                        s('>'),
                      ]),
                      s('Modify Title'),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s('>'),
                      ]),
                      s(`
`),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'template'),
                        s('>'),
                      ]),
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
      t('div', k, [
        t('h3', v, [
          e(d, { to: '#HideButton' }, { default: o(() => a[9] || (a[9] = [s('#')])), _: 1 }),
          a[10] || (a[10] = s('Hide Button')),
        ]),
        e(l, null, {
          default: o(
            () =>
              a[11] ||
              (a[11] = [
                t(
                  'pre',
                  { class: 'hljs' },
                  [
                    t('code', null, [
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      t('span', { class: 'javascript' }, [
                        s(`
`),
                        t('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Dialog } '),
                        t('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        t('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`

`),
                        t('span', { class: 'hljs-function' }, [
                          t('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          t('span', { class: 'hljs-title' }, 'hideButton'),
                          s('('),
                          t('span', { class: 'hljs-params' }),
                          s(') '),
                        ]),
                        s(`{
  Dialog({
    `),
                        t('span', { class: 'hljs-attr' }, 'message'),
                        s(': '),
                        t('span', { class: 'hljs-string' }, "'Don\\'t Wanna See No Blood, Don\\'t Be A Macho Man'"),
                        s(`,
    `),
                        t('span', { class: 'hljs-attr' }, 'confirmButton'),
                        s(': '),
                        t('span', { class: 'hljs-literal' }, 'false'),
                        s(`,
    `),
                        t('span', { class: 'hljs-attr' }, 'cancelButton'),
                        s(': '),
                        t('span', { class: 'hljs-literal' }, 'false'),
                        s(`,
  })
}
`),
                      ]),
                      t('span', { class: 'hljs-tag' }, [s('</'), t('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      t('span', { class: 'hljs-tag' }, [s('<'), t('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'type'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"primary"'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'block'),
                        s(' @'),
                        t('span', { class: 'hljs-attr' }, 'click'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"hideButton"'),
                        s('>'),
                      ]),
                      s('Hide Button'),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s('>'),
                      ]),
                      s(`
`),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'template'),
                        s('>'),
                      ]),
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
      t('div', w, [
        t('h3', D, [
          e(d, { to: '#HandlerUserBehavior' }, { default: o(() => a[12] || (a[12] = [s('#')])), _: 1 }),
          a[13] || (a[13] = s('Handler User Behavior')),
        ]),
        a[15] ||
          (a[15] = t(
            'p',
            null,
            [
              s("You can get user behavior from the method's return value, which is a "),
              t('code', null, 'Promise'),
              s('. Includes '),
              t('code', null, 'confirm'),
              s(', '),
              t('code', null, 'cancel'),
              s(', and '),
              t('code', null, 'close(click the overlay to trigger closure)'),
              s('.'),
            ],
            -1,
          )),
        e(l, null, {
          default: o(
            () =>
              a[14] ||
              (a[14] = [
                t(
                  'pre',
                  { class: 'hljs' },
                  [
                    t('code', null, [
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      t('span', { class: 'javascript' }, [
                        s(`
`),
                        t('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Dialog, Snackbar } '),
                        t('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        t('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`

`),
                        t('span', { class: 'hljs-keyword' }, 'const'),
                        s(` actions = {
  `),
                        t('span', { class: 'hljs-attr' }, 'confirm'),
                        s(': '),
                        t('span', { class: 'hljs-function' }, '() =>'),
                        s(' Snackbar.success('),
                        t('span', { class: 'hljs-string' }, "'confirm'"),
                        s(`),
  `),
                        t('span', { class: 'hljs-attr' }, 'cancel'),
                        s(': '),
                        t('span', { class: 'hljs-function' }, '() =>'),
                        s(' Snackbar.error('),
                        t('span', { class: 'hljs-string' }, "'cancel'"),
                        s(`),
  `),
                        t('span', { class: 'hljs-attr' }, 'close'),
                        s(': '),
                        t('span', { class: 'hljs-function' }, '() =>'),
                        s(' Snackbar.info('),
                        t('span', { class: 'hljs-string' }, "'close'"),
                        s(`),
}

`),
                        t('span', { class: 'hljs-keyword' }, 'async'),
                        s(),
                        t('span', { class: 'hljs-function' }, [
                          t('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          t('span', { class: 'hljs-title' }, 'createAction'),
                          s('('),
                          t('span', { class: 'hljs-params' }),
                          s(') '),
                        ]),
                        s(`{
  actions[`),
                        t('span', { class: 'hljs-keyword' }, 'await'),
                        s(' Dialog('),
                        t('span', { class: 'hljs-string' }, "'Don\\'t Wanna See No Blood, Don\\'t Be A Macho Man'"),
                        s(`)]()
}
`),
                      ]),
                      t('span', { class: 'hljs-tag' }, [s('</'), t('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      t('span', { class: 'hljs-tag' }, [s('<'), t('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'type'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"primary"'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'block'),
                        s(' @'),
                        t('span', { class: 'hljs-attr' }, 'click'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"createAction"'),
                        s('>'),
                      ]),
                      s('Handling user behavior'),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s('>'),
                      ]),
                      s(`
`),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'template'),
                        s('>'),
                      ]),
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
      t('div', C, [
        t('h3', B, [
          e(d, { to: '#AsynchronousClosing' }, { default: o(() => a[16] || (a[16] = [s('#')])), _: 1 }),
          a[17] || (a[17] = s('Asynchronous Closing')),
        ]),
        a[19] ||
          (a[19] = t(
            'p',
            null,
            [
              s('You can use '),
              t('code', null, 'onBeforeClose'),
              s(
                ' to intercept before closing, and you can get the user behavior from the parameters, and the callback function that triggers the shutdown.',
              ),
            ],
            -1,
          )),
        e(l, null, {
          default: o(
            () =>
              a[18] ||
              (a[18] = [
                t(
                  'pre',
                  { class: 'hljs' },
                  [
                    t('code', null, [
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      t('span', { class: 'javascript' }, [
                        s(`
`),
                        t('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Dialog, Snackbar } '),
                        t('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        t('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`

`),
                        t('span', { class: 'hljs-keyword' }, 'const'),
                        s(` actions = {
  `),
                        t('span', { class: 'hljs-attr' }, 'confirm'),
                        s(': '),
                        t('span', { class: 'hljs-function' }, '() =>'),
                        s(' Snackbar.success('),
                        t('span', { class: 'hljs-string' }, "'confirm'"),
                        s(`),
  `),
                        t('span', { class: 'hljs-attr' }, 'cancel'),
                        s(': '),
                        t('span', { class: 'hljs-function' }, '() =>'),
                        s(' Snackbar.error('),
                        t('span', { class: 'hljs-string' }, "'cancel'"),
                        s(`),
  `),
                        t('span', { class: 'hljs-attr' }, 'close'),
                        s(': '),
                        t('span', { class: 'hljs-function' }, '() =>'),
                        s(' Snackbar.info('),
                        t('span', { class: 'hljs-string' }, "'close'"),
                        s(`),
}

`),
                        t('span', { class: 'hljs-function' }, [
                          t('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          t('span', { class: 'hljs-title' }, 'onBeforeClose'),
                          s('('),
                          t('span', { class: 'hljs-params' }, 'action, done'),
                          s(') '),
                        ]),
                        s(`{
  Snackbar.loading(`),
                        t('span', { class: 'hljs-string' }, "'Asynchronous shutdown in progress'"),
                        s(`)

  `),
                        t('span', { class: 'hljs-built_in' }, 'setTimeout'),
                        s('('),
                        t('span', { class: 'hljs-function' }, '() =>'),
                        s(` {
    actions[action]()
    done()
  }, `),
                        t('span', { class: 'hljs-number' }, '1000'),
                        s(`)
}

`),
                        t('span', { class: 'hljs-function' }, [
                          t('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          t('span', { class: 'hljs-title' }, 'createAction'),
                          s('('),
                          t('span', { class: 'hljs-params' }),
                          s(') '),
                        ]),
                        s(`{
  Dialog({
    `),
                        t('span', { class: 'hljs-attr' }, 'message'),
                        s(': '),
                        t('span', { class: 'hljs-string' }, "'Don\\'t Wanna See No Blood, Don\\'t Be A Macho Man'"),
                        s(`,
    onBeforeClose
  })
}
`),
                      ]),
                      t('span', { class: 'hljs-tag' }, [s('</'), t('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      t('span', { class: 'hljs-tag' }, [s('<'), t('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'type'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"primary"'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'block'),
                        s(' @'),
                        t('span', { class: 'hljs-attr' }, 'click'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"createAction"'),
                        s('>'),
                      ]),
                      s('Asynchronous closing'),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s('>'),
                      ]),
                      s(`
`),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'template'),
                        s('>'),
                      ]),
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
      a[49] || (a[49] = t('h2', null, 'Component Call', -1)),
      t('div', S, [
        t('h3', x, [
          e(d, { to: '#BasicUsage' }, { default: o(() => a[20] || (a[20] = [s('#')])), _: 1 }),
          a[21] || (a[21] = s('Basic Usage')),
        ]),
        e(l, null, {
          default: o(
            () =>
              a[22] ||
              (a[22] = [
                t(
                  'pre',
                  { class: 'hljs' },
                  [
                    t('code', null, [
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      t('span', { class: 'javascript' }, [
                        s(`
`),
                        t('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        t('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        t('span', { class: 'hljs-string' }, "'vue'"),
                        s(`
`),
                        t('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Snackbar } '),
                        t('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        t('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`
   
`),
                        t('span', { class: 'hljs-keyword' }, 'const'),
                        s(' show = ref('),
                        t('span', { class: 'hljs-literal' }, 'false'),
                        s(`)
`),
                      ]),
                      t('span', { class: 'hljs-tag' }, [s('</'), t('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      t('span', { class: 'hljs-tag' }, [s('<'), t('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'type'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"warning"'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'block'),
                        s(' @'),
                        t('span', { class: 'hljs-attr' }, 'click'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"show = true"'),
                        s('>'),
                      ]),
                      s('Basic Use'),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s('>'),
                      ]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-dialog'),
                        s(`
    `),
                        t('span', { class: 'hljs-attr' }, 'title'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"Beat It"'),
                        s(`
    `),
                        t('span', { class: 'hljs-attr' }, 'message'),
                        s('='),
                        t('span', { class: 'hljs-string' }, `"Don't Wanna See No Blood, Don't Be A Macho Man"`),
                        s(`
    `),
                        t('span', { class: 'hljs-attr' }, 'v-model:show'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"show"'),
                        s(`
    @`),
                        t('span', { class: 'hljs-attr' }, 'confirm'),
                        s('='),
                        t('span', { class: 'hljs-string' }, `"Snackbar.success('confirm')"`),
                        s(`
    @`),
                        t('span', { class: 'hljs-attr' }, 'cancel'),
                        s('='),
                        t('span', { class: 'hljs-string' }, `"Snackbar.error('cancel')"`),
                        s(`
    @`),
                        t('span', { class: 'hljs-attr' }, 'closed'),
                        s('='),
                        t('span', { class: 'hljs-string' }, `"Snackbar.info('closed')"`),
                        s(`
  />`),
                      ]),
                      s(`
`),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'template'),
                        s('>'),
                      ]),
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
      t('div', A, [
        t('h3', M, [
          e(d, { to: '#AsynchronousClosing' }, { default: o(() => a[23] || (a[23] = [s('#')])), _: 1 }),
          a[24] || (a[24] = s('Asynchronous Closing')),
        ]),
        e(l, null, {
          default: o(
            () =>
              a[25] ||
              (a[25] = [
                t(
                  'pre',
                  { class: 'hljs' },
                  [
                    t('code', null, [
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      t('span', { class: 'javascript' }, [
                        s(`
`),
                        t('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        t('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        t('span', { class: 'hljs-string' }, "'vue'"),
                        s(`
`),
                        t('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Snackbar } '),
                        t('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        t('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`

`),
                        t('span', { class: 'hljs-keyword' }, 'const'),
                        s(' show = ref('),
                        t('span', { class: 'hljs-literal' }, 'false'),
                        s(`)

`),
                        t('span', { class: 'hljs-keyword' }, 'const'),
                        s(` actions = {
  `),
                        t('span', { class: 'hljs-attr' }, 'confirm'),
                        s(': '),
                        t('span', { class: 'hljs-function' }, '() =>'),
                        s(' Snackbar.success('),
                        t('span', { class: 'hljs-string' }, "'confirm'"),
                        s(`),
  `),
                        t('span', { class: 'hljs-attr' }, 'cancel'),
                        s(': '),
                        t('span', { class: 'hljs-function' }, '() =>'),
                        s(' Snackbar.error('),
                        t('span', { class: 'hljs-string' }, "'cancel'"),
                        s(`),
  `),
                        t('span', { class: 'hljs-attr' }, 'close'),
                        s(': '),
                        t('span', { class: 'hljs-function' }, '() =>'),
                        s(' Snackbar.info('),
                        t('span', { class: 'hljs-string' }, "'close'"),
                        s(`),
}

`),
                        t('span', { class: 'hljs-function' }, [
                          t('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          t('span', { class: 'hljs-title' }, 'onBeforeClose'),
                          s('('),
                          t('span', { class: 'hljs-params' }, 'action, done'),
                          s(') '),
                        ]),
                        s(`{
  Snackbar.loading(`),
                        t('span', { class: 'hljs-string' }, "'Asynchronous shutdown in progress'"),
                        s(`)

  `),
                        t('span', { class: 'hljs-built_in' }, 'setTimeout'),
                        s('('),
                        t('span', { class: 'hljs-function' }, '() =>'),
                        s(` {
    actions[action]()
    done()
   }, `),
                        t('span', { class: 'hljs-number' }, '1000'),
                        s(`)
}
`),
                      ]),
                      t('span', { class: 'hljs-tag' }, [s('</'), t('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      t('span', { class: 'hljs-tag' }, [s('<'), t('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'type'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"warning"'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'block'),
                        s(' @'),
                        t('span', { class: 'hljs-attr' }, 'click'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"show = true"'),
                        s('>'),
                      ]),
                      s('Asynchronous closing'),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s('>'),
                      ]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-dialog'),
                        s(`
    `),
                        t('span', { class: 'hljs-attr' }, 'title'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"Beat It"'),
                        s(`
    `),
                        t('span', { class: 'hljs-attr' }, 'message'),
                        s('='),
                        t('span', { class: 'hljs-string' }, `"Don't Wanna See No Blood, Don't Be A Macho Man"`),
                        s(`
    `),
                        t('span', { class: 'hljs-attr' }, 'v-model:show'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"show"'),
                        s(`
    @`),
                        t('span', { class: 'hljs-attr' }, 'before-close'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"onBeforeClose"'),
                        s(`
  />`),
                      ]),
                      s(`
`),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'template'),
                        s('>'),
                      ]),
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
      t('div', T, [
        t('h3', W, [
          e(d, { to: '#CustomSlots' }, { default: o(() => a[26] || (a[26] = [s('#')])), _: 1 }),
          a[27] || (a[27] = s('Custom Slots')),
        ]),
        e(l, null, {
          default: o(
            () =>
              a[28] ||
              (a[28] = [
                t(
                  'pre',
                  { class: 'hljs' },
                  [
                    t('code', null, [
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      t('span', { class: 'javascript' }, [
                        s(`
`),
                        t('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        t('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        t('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        t('span', { class: 'hljs-keyword' }, 'const'),
                        s(' show = ref('),
                        t('span', { class: 'hljs-literal' }, 'false'),
                        s(`)
`),
                      ]),
                      t('span', { class: 'hljs-tag' }, [s('</'), t('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      t('span', { class: 'hljs-tag' }, [s('<'), t('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'type'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"warning"'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'block'),
                        s(' @'),
                        t('span', { class: 'hljs-attr' }, 'click'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"show = true"'),
                        s('>'),
                      ]),
                      s('Custom Slots'),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'mp-button'),
                        s('>'),
                      ]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-dialog'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'v-model:show'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"show"'),
                        s('>'),
                      ]),
                      s(`
    `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'template'),
                        s(' #'),
                        t('span', { class: 'hljs-attr' }, 'title'),
                        s('>'),
                      ]),
                      s(`
      `),
                      t('span', { class: 'hljs-tag' }, [
                        s('<'),
                        t('span', { class: 'hljs-name' }, 'mp-icon'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'name'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"information"'),
                        s(),
                        t('span', { class: 'hljs-attr' }, 'color'),
                        s('='),
                        t('span', { class: 'hljs-string' }, '"#2979ff"'),
                        s(' />'),
                      ]),
                      s(`
    `),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'template'),
                        s('>'),
                      ]),
                      s(`

    `),
                      t('span', { class: 'hljs-tag' }, [s('<'), t('span', { class: 'hljs-name' }, 'mp-cell'), s('>')]),
                      s("Don't Wanna See No Blood, Don't Be A Macho Man"),
                      t('span', { class: 'hljs-tag' }, [s('</'), t('span', { class: 'hljs-name' }, 'mp-cell'), s('>')]),
                      s(`
    `),
                      t('span', { class: 'hljs-tag' }, [s('<'), t('span', { class: 'hljs-name' }, 'mp-cell'), s('>')]),
                      s("Don't Wanna See No Blood, Don't Be A Macho Man"),
                      t('span', { class: 'hljs-tag' }, [s('</'), t('span', { class: 'hljs-name' }, 'mp-cell'), s('>')]),
                      s(`
    `),
                      t('span', { class: 'hljs-tag' }, [s('<'), t('span', { class: 'hljs-name' }, 'mp-cell'), s('>')]),
                      s("Don't Wanna See No Blood, Don't Be A Macho Man"),
                      t('span', { class: 'hljs-tag' }, [s('</'), t('span', { class: 'hljs-name' }, 'mp-cell'), s('>')]),
                      s(`
  `),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'mp-dialog'),
                        s('>'),
                      ]),
                      s(`
`),
                      t('span', { class: 'hljs-tag' }, [
                        s('</'),
                        t('span', { class: 'hljs-name' }, 'template'),
                        s('>'),
                      ]),
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
      a[50] || (a[50] = t('h2', null, 'API', -1)),
      t('div', N, [
        t('h3', O, [
          e(d, { to: '#Props' }, { default: o(() => a[29] || (a[29] = [s('#')])), _: 1 }),
          a[30] || (a[30] = s('Props')),
        ]),
        a[31] ||
          (a[31] = n(
            '<table><thead><tr><th>Prop</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>v-model:show</code></td><td>Whether to display a Dialog</td><td><em>boolean</em></td><td><code>false</code></td></tr><tr><td><code>title</code></td><td>Dialog title</td><td><em>string</em></td><td><code>Hint</code></td></tr><tr><td><code>width</code></td><td>Dialog width</td><td><em>string | number</em></td><td><code>-</code></td></tr><tr><td><code>message</code></td><td>Dialog message content</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>message-align</code></td><td>Dialog message content text alignment, optional values <code>center</code>, <code>left</code>, <code>right</code></td><td><em>string</em></td><td><code>left</code></td></tr><tr><td><code>confirm-button</code></td><td>Whether to display the confirm button</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>cancel-button</code></td><td>Whether to display the cancel button</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>confirm-button-text</code></td><td>Confirm button text</td><td><em>string</em></td><td><code>Confirm</code></td></tr><tr><td><code>cancel-button-text</code></td><td>Cancel button text</td><td><em>string</em></td><td><code>Cancel</code></td></tr><tr><td><code>confirm-button-text-color</code></td><td>Confirm button text color</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>cancel-button-text-color</code></td><td>Cancel button text color</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>confirm-button-color</code></td><td>Confirm button background color</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>cancel-button-color</code></td><td>Cancel button background color</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>dialog-class</code></td><td>Dialog body class</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>dialog-style</code></td><td>Dialog body style</td><td><em>object</em></td><td><code>-</code></td></tr><tr><td><code>overlay</code></td><td>Whether to display the overlay</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>overlay-class</code></td><td>Custom overlay class</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>overlay-style</code></td><td>Custom overlay style</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>lock-scroll</code></td><td>Whether to disable scrolling penetration, scrolling the Dialog when disabled will not cause the body to scroll</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>close-on-click-overlay</code></td><td>Whether to click the overlay to close the Dialog</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>close-on-key-escape</code></td><td>Whether to support keyboard ESC to close the dialog</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>teleport</code></td><td>The location of the Dialog to mount</td><td><em>TeleportProps[&#39;to&#39;] | false</em></td><td><code>body</code></td></tr></tbody></table>',
            1,
          )),
      ]),
      t('div', U, [
        t('h3', E, [
          e(d, { to: '#Events' }, { default: o(() => a[32] || (a[32] = [s('#')])), _: 1 }),
          a[33] || (a[33] = s('Events')),
        ]),
        a[34] ||
          (a[34] = n(
            '<table><thead><tr><th>Event</th><th>Description</th><th>Arguments</th></tr></thead><tbody><tr><td><code>open</code></td><td>Triggered when the Dialog is open</td><td><code>-</code></td></tr><tr><td><code>opened</code></td><td>Triggered when the Dialog open-animation ends</td><td><code>-</code></td></tr><tr><td><code>before-close</code></td><td>Triggering before the Dialog closes prevents closure</td><td><code>action: confirm | cancel | close</code> <br> <code>done: Function</code></td></tr><tr><td><code>close</code></td><td>Triggered when the Dialog is close</td><td><code>-</code></td></tr><tr><td><code>closed</code></td><td>Triggered when the Dialog close-animation ends</td><td><code>-</code></td></tr><tr><td><code>confirm</code></td><td>Triggered on confirm</td><td><code>-</code></td></tr><tr><td><code>cancel</code></td><td>Triggered on cancel</td><td><code>-</code></td></tr><tr><td><code>click-overlay</code></td><td>Triggered when clicking on overlay</td><td><code>-</code></td></tr><tr><td><code>key-escape</code></td><td>Triggered when click keyboard ESC</td><td><code>-</code></td></tr></tbody></table>',
            1,
          )),
      ]),
      t('div', H, [
        t('h3', P, [
          e(d, { to: '#Methods' }, { default: o(() => a[35] || (a[35] = [s('#')])), _: 1 }),
          a[36] || (a[36] = s('Methods')),
        ]),
        a[37] ||
          (a[37] = n(
            '<table><thead><tr><th>Method</th><th>Description</th><th>Arguments</th><th>Return</th></tr></thead><tbody><tr><td><code>Dialog</code></td><td>Show dialog</td><td><em>options | string</em></td><td><code>-</code></td></tr><tr><td><code>Dialog.close</code></td><td>Close dialog</td><td><em>-</em></td><td><code>-</code></td></tr><tr><td><code>Dialog.setDefaultOptions</code></td><td>Set default option configuration</td><td><em>options</em></td><td><code>-</code></td></tr><tr><td><code>Dialog.resetDefaultOptions</code></td><td>Reset default option configuration</td><td><em>-</em></td><td><code>-</code></td></tr></tbody></table>',
            1,
          )),
      ]),
      t('div', I, [
        t('h3', V, [
          e(d, { to: '#DialogOptions' }, { default: o(() => a[38] || (a[38] = [s('#')])), _: 1 }),
          a[39] || (a[39] = s('Dialog Options')),
        ]),
        a[40] ||
          (a[40] = n(
            '<h4>Options passed in for a functional call</h4><table><thead><tr><th>Option</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>title</code></td><td>Dialog title</td><td><em>string</em></td><td><code>Hint</code></td></tr><tr><td><code>width</code></td><td>Dialog width</td><td><em>string | number</em></td><td><code>-</code></td></tr><tr><td><code>message</code></td><td>Dialog message content</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>messageAlign</code></td><td>Dialog message content text alignment, optional values <code>center</code> <code>left</code> <code>right</code></td><td><em>string</em></td><td><code>left</code></td></tr><tr><td><code>confirmButton</code></td><td>Whether to display the confirm button</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>cancelButton</code></td><td>Whether to display the cancel button</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>confirmButtonText</code></td><td>Confirm button text</td><td><em>string</em></td><td><code>确认</code></td></tr><tr><td><code>cancelButtonText</code></td><td>Cancel button text</td><td><em>string</em></td><td><code>取消</code></td></tr><tr><td><code>confirmButtonTextColor</code></td><td>Confirm button text color</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>cancelButtonTextColor</code></td><td>Cancel button text color</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>confirmButtonColor</code></td><td>Confirm button background color</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>cancelButtonColor</code></td><td>Cancel button background color</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>dialogClass</code></td><td>Dialog body class</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>dialogStyle</code></td><td>Dialog body style</td><td><em>object</em></td><td><code>-</code></td></tr><tr><td><code>overlay</code></td><td>Whether to display the overlay</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>overlayClass</code></td><td>Custom overlay class</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>overlayStyle</code></td><td>Custom overlay style</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>lockScroll</code></td><td>Whether to disable scrolling penetration, scrolling the Dialog when disabled will not cause the body to scroll</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>closeOnClickOverlay</code></td><td>Whether to click the overlay to close the Dialog</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>closeOnKeyEscape</code></td><td>Whether to support keyboard ESC to close the dialog</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>onOpen</code></td><td>Dialog open callback</td><td><em>() =&gt; void</em></td><td><code>-</code></td></tr><tr><td><code>onOpened</code></td><td>Dialog open-animation ends callback</td><td><em>() =&gt; void</em></td><td><code>-</code></td></tr><tr><td><code>onBeforeClose</code></td><td>Callbacks prevent closure before the Dialog closes</td><td><em>(action: confirm | cancel | close, done: Function) =&gt; void</em></td><td><code>-</code></td></tr><tr><td><code>onClose</code></td><td>Dialog close callback</td><td><em>() =&gt; void</em></td><td><code>-</code></td></tr><tr><td><code>onClosed</code></td><td>Dialog close-animation ends callback</td><td><em>() =&gt; void</em></td><td><code>-</code></td></tr><tr><td><code>onConfirm</code></td><td>Confirm callback</td><td><em>() =&gt; void</em></td><td><code>-</code></td></tr><tr><td><code>onCancel</code></td><td>Cancel callback</td><td><em>() =&gt; void</em></td><td><code>-</code></td></tr><tr><td><code>onClickOverlay</code></td><td>Click overlay callback</td><td><em>() =&gt; void</em></td><td><code>-</code></td></tr><tr><td><code>onKeyEscape</code></td><td>Triggered when click keyboard ESC</td><td><em>() =&gt; void</em></td><td><code>-</code></td></tr></tbody></table>',
            2,
          )),
      ]),
      t('div', z, [
        t('h3', $, [
          e(d, { to: '#Slots' }, { default: o(() => a[41] || (a[41] = [s('#')])), _: 1 }),
          a[42] || (a[42] = s('Slots')),
        ]),
        a[43] ||
          (a[43] = n(
            '<table><thead><tr><th>Name</th><th>Description</th><th>SlotProps</th></tr></thead><tbody><tr><td><code>default</code></td><td>Dialog content message</td><td><code>-</code></td></tr><tr><td><code>title</code></td><td>Dialog title</td><td><code>-</code></td></tr><tr><td><code>actions</code> <em><strong>3.3.3</strong></em></td><td>Dialog actions</td><td><code>slotClass: string</code> the class of actions container <br> <code>cancel: () =&gt; void</code> cancel callback function <br> <code>confirm: () =&gt; void</code> confirm callback function</td></tr></tbody></table>',
            1,
          )),
      ]),
      t('div', F, [
        t('h3', K, [
          e(d, { to: '#StyleVariables' }, { default: o(() => a[44] || (a[44] = [s('#')])), _: 1 }),
          a[45] || (a[45] = s('Style Variables')),
        ]),
        a[46] ||
          (a[46] = n(
            '<p>Here are the CSS variables used by the component. Styles can be customized using <a href="#/en-US/style-provider">StyleProvider</a>.</p><table><thead><tr><th>Variable</th><th>Default</th></tr></thead><tbody><tr><td><code>--dialog-width</code></td><td><code>280px</code></td></tr><tr><td><code>--dialog-background</code></td><td><code>var(--color-surface-container-low)</code></td></tr><tr><td><code>--dialog-border-radius</code></td><td><code>3px</code></td></tr><tr><td><code>--dialog-title-padding</code></td><td><code>20px 20px 0</code></td></tr><tr><td><code>--dialog-title-font-size</code></td><td><code>var(--font-size-lg)</code></td></tr><tr><td><code>--dialog-message-color</code></td><td><code>#888</code></td></tr><tr><td><code>--dialog-message-padding</code></td><td><code>12px 20px</code></td></tr><tr><td><code>--dialog-message-line-height</code></td><td><code>24px</code></td></tr><tr><td><code>--dialog-message-font-size</code></td><td><code>var(--font-size-md)</code></td></tr><tr><td><code>--dialog-actions-padding</code></td><td><code>0 12px 12px</code></td></tr><tr><td><code>--dialog-button-margin-left</code></td><td><code>6px</code></td></tr><tr><td><code>--dialog-title-color</code></td><td><code>#555</code></td></tr><tr><td><code>--dialog-confirm-button-color</code></td><td><code>var(--color-primary)</code></td></tr><tr><td><code>--dialog-cancel-button-color</code></td><td><code>var(--color-primary)</code></td></tr></tbody></table>',
            2,
          )),
      ]),
    ])
  )
}
const L = r(h, [['render', R]])
export { L as default }
