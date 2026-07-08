import { m as a, e as c, f as i, w as n, $ as o, l as p, b as r, Q as s, p as t } from './index-CLBN0B2q.js'

const h = { components: {} },
  j = { class: 'maple-site-doc' },
  m = { class: 'card' },
  g = { id: 'jie4shao4' },
  u = { class: 'card' },
  f = { id: 'ji1ben3shi3yong4' },
  v = { class: 'card' },
  y = { id: 'wen2jian4yu4lan3' },
  w = { class: 'card' },
  b = { id: 'zi4ding4yi4yu4lan3' },
  k = { class: 'card' },
  x = { id: 'shang4chuan2zhuang4tai4' },
  z = { class: 'card' },
  F = { id: 'shi3yong4jin4du4tiao2' },
  M = { class: 'card' },
  R = { id: 'wen2jian4shu4liang4xian4zhi4' },
  S = { class: 'card' },
  A = { id: 'wen2jian4da4xiao3xian4zhi4' },
  B = { class: 'card' },
  C = { id: 'wen2jian4lie4biao3guo4lü4' },
  U = { class: 'card' },
  N = { id: 'shang4chuan2yu4chu3li3' },
  V = { class: 'card' },
  P = { id: 'shang4chuan2an4niu3dian3ji1shi4jian4' },
  T = { class: 'card' },
  Z = { id: 'jin4yong4' },
  E = { class: 'card' },
  $ = { id: 'zhi1du2' },
  D = { class: 'card' },
  I = { id: 'shan1chu2qian2chu3li3' },
  L = { class: 'card' },
  q = { id: 'zi4ding4yi4shang4chuan2yang4shi4' },
  Q = { class: 'card' },
  W = { id: 'zi4duan4jiao4yan4' },
  G = { class: 'card' },
  H = { id: 'shi3yong4Zo0djin4xing2jiao4yan4' },
  J = { class: 'card' },
  K = { id: 'zi4ding4yi4xuan4ran3' },
  O = { class: 'card' },
  X = { id: 'zi4ding4yi4shan1chu2an4niu3' },
  Y = { class: 'card' },
  _ = { id: 'shu3xing4' },
  ss = { class: 'card' },
  as = { id: 'MpFile' },
  ls = { class: 'card' },
  ts = { id: 'MpFileUtils' },
  ns = { class: 'card' },
  es = { id: 'fang1fa3' },
  ds = { class: 'card' },
  os = { id: 'shi4jian4' },
  cs = { class: 'card' },
  rs = { id: 'cha1cao2' },
  ps = { class: 'card' },
  is = { id: 'yang4shi4bian4liang4' }
function hs(js, l, ms, gs, us, fs) {
  const e = c('router-link'),
    d = c('mp-site-code-example')
  return (
    i(),
    p('div', j, [
      l[87] || (l[87] = a('h1', null, '文件上传', -1)),
      a('div', m, [
        a('h3', g, [
          t(e, { to: '#jie4shao4' }, { default: n(() => l[0] || (l[0] = [s('#')])), _: 1 }),
          l[1] || (l[1] = s('介绍')),
        ]),
        l[2] ||
          (l[2] = a(
            'p',
            null,
            [
              s('提供了文件读取、图片/视频预览能力。通过监听 '),
              a('code', null, 'after-read'),
              s(' 事件获取文件上传服务器。'),
            ],
            -1,
          )),
      ]),
      a('div', u, [
        a('h3', f, [
          t(e, { to: '#ji1ben3shi3yong4' }, { default: n(() => l[3] || (l[3] = [s('#')])), _: 1 }),
          l[4] || (l[4] = s('基本使用')),
        ]),
        t(d, null, {
          default: n(
            () =>
              l[5] ||
              (l[5] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([])

`),
                        a('span', { class: 'hljs-function' }, [
                          a('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          a('span', { class: 'hljs-title' }, 'handleAfterRead'),
                          s('('),
                          a('span', { class: 'hljs-params' }, 'file'),
                          s(') '),
                        ]),
                        s(`{ 
  `),
                        a('span', { class: 'hljs-built_in' }, 'console'),
                        s(`.log(file)
}
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(' @'),
                        a('span', { class: 'hljs-attr' }, 'after-read'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"handleAfterRead"'),
                        s('/>'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', v, [
        a('h3', y, [
          t(e, { to: '#wen2jian4yu4lan3' }, { default: n(() => l[6] || (l[6] = [s('#')])), _: 1 }),
          l[7] || (l[7] = s('文件预览')),
        ]),
        l[9] || (l[9] = a('p', null, '通过分析文件的 url 后缀名判断文件类型，支持图片和视频预览。', -1)),
        t(d, null, {
          default: n(
            () =>
              l[8] ||
              (l[8] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`
  },
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://www.runoob.com/try/demo_source/mov_bbb.mp4'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cover.jpg'"),
                        s(`
  }
])
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s('/>'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', w, [
        a('h3', b, [
          t(e, { to: '#zi4ding4yi4yu4lan3' }, { default: n(() => l[10] || (l[10] = [s('#')])), _: 1 }),
          l[11] || (l[11] = s('自定义预览')),
        ]),
        t(d, null, {
          default: n(
            () =>
              l[12] ||
              (l[12] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Dialog } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`
  }
])

`),
                        a('span', { class: 'hljs-function' }, [
                          a('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          a('span', { class: 'hljs-title' }, 'handlePreview'),
                          s('('),
                          a('span', { class: 'hljs-params' }, 'file'),
                          s(') '),
                        ]),
                        s(`{
  Dialog({
    `),
                        a('span', { class: 'hljs-attr' }, 'title'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'自定义预览'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'message'),
                        s(': file.url.slice('),
                        a('span', { class: 'hljs-number' }, '0'),
                        s(', '),
                        a('span', { class: 'hljs-number' }, '100'),
                        s(`)
  })
}
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'prevent-default-preview'),
                        s(' @'),
                        a('span', { class: 'hljs-attr' }, 'preview'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"handlePreview"'),
                        s('/>'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', k, [
        a('h3', x, [
          t(e, { to: '#shang4chuan2zhuang4tai4' }, { default: n(() => l[13] || (l[13] = [s('#')])), _: 1 }),
          l[14] || (l[14] = s('上传状态')),
        ]),
        l[16] ||
          (l[16] = a(
            'p',
            null,
            [
              s('提供了 '),
              a('code', null, 'loading'),
              s('、 '),
              a('code', null, 'success'),
              s('、 '),
              a('code', null, 'error'),
              s(' 三种上传状态，并提供了工具函数快速获取对应状态的文件。'),
            ],
            -1,
          )),
        t(d, null, {
          default: n(
            () =>
              l[15] ||
              (l[15] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'state'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'loading'"),
                        s(`
  },
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'state'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'success'"),
                        s(`
  },
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'state'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'error'"),
                        s(`
  }
])

`),
                        a('span', { class: 'hljs-function' }, [
                          a('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          a('span', { class: 'hljs-title' }, 'handleAfterRead'),
                          s('('),
                          a('span', { class: 'hljs-params' }, 'file'),
                          s(') '),
                        ]),
                        s(`{
  file.state = `),
                        a('span', { class: 'hljs-string' }, "'loading'"),
                        s(`

  `),
                        a('span', { class: 'hljs-built_in' }, 'setTimeout'),
                        s('('),
                        a('span', { class: 'hljs-function' }, '() =>'),
                        s(` {
    file.state = `),
                        a('span', { class: 'hljs-string' }, "'success'"),
                        s(`
  }, `),
                        a('span', { class: 'hljs-number' }, '1000'),
                        s(`)
}
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(' @'),
                        a('span', { class: 'hljs-attr' }, 'after-read'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"handleAfterRead"'),
                        s('/>'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', z, [
        a('h3', F, [
          t(e, { to: '#shi3yong4jin4du4tiao2' }, { default: n(() => l[17] || (l[17] = [s('#')])), _: 1 }),
          l[18] || (l[18] = s('使用进度条')),
        ]),
        t(d, null, {
          default: n(
            () =>
              l[19] ||
              (l[19] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref, onUnmounted } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([])
`),
                        a('span', { class: 'hljs-keyword' }, 'let'),
                        s(` timer

`),
                        a('span', { class: 'hljs-function' }, [
                          a('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          a('span', { class: 'hljs-title' }, 'handleAfterRead'),
                          s('('),
                          a('span', { class: 'hljs-params' }, 'file'),
                          s(') '),
                        ]),
                        s(`{
  file.state = `),
                        a('span', { class: 'hljs-string' }, "'loading'"),
                        s(`

  timer = `),
                        a('span', { class: 'hljs-built_in' }, 'window'),
                        s('.setInterval('),
                        a('span', { class: 'hljs-function' }, '() =>'),
                        s(` {
    `),
                        a('span', { class: 'hljs-keyword' }, 'if'),
                        s(' (file.progress === '),
                        a('span', { class: 'hljs-number' }, '100'),
                        s(`) {
      `),
                        a('span', { class: 'hljs-built_in' }, 'window'),
                        s(`.clearInterval(timer)
      file.state = `),
                        a('span', { class: 'hljs-string' }, "'success'"),
                        s(`
      `),
                        a('span', { class: 'hljs-keyword' }, 'return'),
                        s(`
    }

    file.progress += `),
                        a('span', { class: 'hljs-number' }, '10'),
                        s(`
  }, `),
                        a('span', { class: 'hljs-number' }, '250'),
                        s(`)
}

onUnmounted(`),
                        a('span', { class: 'hljs-function' }, '() =>'),
                        s(` {
  `),
                        a('span', { class: 'hljs-built_in' }, 'window'),
                        s(`.clearInterval(timer)
})
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(' @'),
                        a('span', { class: 'hljs-attr' }, 'after-read'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"handleAfterRead"'),
                        s('/>'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', M, [
        a('h3', R, [
          t(e, { to: '#wen2jian4shu4liang4xian4zhi4' }, { default: n(() => l[20] || (l[20] = [s('#')])), _: 1 }),
          l[21] || (l[21] = s('文件数量限制')),
        ]),
        t(d, null, {
          default: n(
            () =>
              l[22] ||
              (l[22] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([])
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(),
                        a('span', { class: 'hljs-attr' }, ':maxlength'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"1"'),
                        s('/>'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', S, [
        a('h3', A, [
          t(e, { to: '#wen2jian4da4xiao3xian4zhi4' }, { default: n(() => l[23] || (l[23] = [s('#')])), _: 1 }),
          l[24] || (l[24] = s('文件大小限制')),
        ]),
        l[26] ||
          (l[26] = a(
            'p',
            null,
            [s('超过限制会被阻止读取，可以通过监听 '), a('code', null, 'oversize'), s(' 事件获取文件。')],
            -1,
          )),
        t(d, null, {
          default: n(
            () =>
              l[25] ||
              (l[25] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Snackbar } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([])
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(),
                        a('span', { class: 'hljs-attr' }, ':maxsize'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"1024"'),
                        s(' @'),
                        a('span', { class: 'hljs-attr' }, 'oversize'),
                        s('='),
                        a('span', { class: 'hljs-string' }, `"Snackbar.warning('文件大小超出限制')"`),
                        s(' />'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', B, [
        a('h3', C, [
          t(e, { to: '#wen2jian4lie4biao3guo4lü4' }, { default: n(() => l[27] || (l[27] = [s('#')])), _: 1 }),
          l[28] || (l[28] = s('文件列表过滤')),
        ]),
        l[30] ||
          (l[30] = a(
            'p',
            null,
            [
              s('通过 '),
              a('code', null, 'before-filter'),
              s(' 事件对文件进行过滤，返回一个被过滤之后的 '),
              a('code', null, 'MpFile'),
              s(' 数组。'),
            ],
            -1,
          )),
        t(d, null, {
          default: n(
            () =>
              l[29] ||
              (l[29] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([])

`),
                        a('span', { class: 'hljs-function' }, [
                          a('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          a('span', { class: 'hljs-title' }, 'handleBeforeFilter'),
                          s('('),
                          a('span', { class: 'hljs-params' }, 'files'),
                          s(') '),
                        ]),
                        s(`{
  `),
                        a('span', { class: 'hljs-keyword' }, 'return'),
                        s(' files.filter('),
                        a('span', { class: 'hljs-function' }, [a('span', { class: 'hljs-params' }, 'file'), s(' =>')]),
                        s(' file.name.endsWith('),
                        a('span', { class: 'hljs-string' }, "'png'"),
                        s(`))
}
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'multiple'),
                        s(' @'),
                        a('span', { class: 'hljs-attr' }, 'before-filter'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"handleBeforeFilter"'),
                        s(' />'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', U, [
        a('h3', N, [
          t(e, { to: '#shang4chuan2yu4chu3li3' }, { default: n(() => l[31] || (l[31] = [s('#')])), _: 1 }),
          l[32] || (l[32] = s('上传预处理')),
        ]),
        l[34] ||
          (l[34] = a(
            'p',
            null,
            [s('通过注册 '), a('code', null, 'before-read'), s(' 事件对文件进行操作，返回假值阻止文件读取。')],
            -1,
          )),
        t(d, null, {
          default: n(
            () =>
              l[33] ||
              (l[33] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Snackbar } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([])

`),
                        a('span', { class: 'hljs-function' }, [
                          a('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          a('span', { class: 'hljs-title' }, 'handleBeforeRead'),
                          s('('),
                          a('span', { class: 'hljs-params' }, 'file'),
                          s(') '),
                        ]),
                        s(`{
  `),
                        a('span', { class: 'hljs-keyword' }, 'if'),
                        s(' (file.file.size <= '),
                        a('span', { class: 'hljs-number' }, '1'),
                        s(' * '),
                        a('span', { class: 'hljs-number' }, '1024'),
                        s(' * '),
                        a('span', { class: 'hljs-number' }, '1024'),
                        s(`) {
    Snackbar.success(`),
                        a('span', { class: 'hljs-string' }, "'文件小于1M，上传成功'"),
                        s(`)
    `),
                        a('span', { class: 'hljs-keyword' }, 'return'),
                        s(),
                        a('span', { class: 'hljs-literal' }, 'true'),
                        s(`
  } `),
                        a('span', { class: 'hljs-keyword' }, 'else'),
                        s(` {
    Snackbar.warning(`),
                        a('span', { class: 'hljs-string' }, "'文件大于1M，不能上传'"),
                        s(`)
    `),
                        a('span', { class: 'hljs-keyword' }, 'return'),
                        s(),
                        a('span', { class: 'hljs-literal' }, 'false'),
                        s(`
  }
}
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(' @'),
                        a('span', { class: 'hljs-attr' }, 'before-read'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"handleBeforeRead"'),
                        s('/>'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', V, [
        a('h3', P, [
          t(
            e,
            { to: '#shang4chuan2an4niu3dian3ji1shi4jian4' },
            { default: n(() => l[35] || (l[35] = [s('#')])), _: 1 },
          ),
          l[36] || (l[36] = s('上传按钮点击事件')),
        ]),
        l[38] ||
          (l[38] = a(
            'p',
            null,
            [
              s('通过注册 '),
              a('code', null, 'click-action'),
              s(' 事件可以拦截上传按钮的点击行为，通过回调中的 '),
              a('code', null, 'chooseFile'),
              s(' 方法进行手动触发浏览器选择文件操作。'),
            ],
            -1,
          )),
        t(d, null, {
          default: n(
            () =>
              l[37] ||
              (l[37] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Snackbar } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([])

`),
                        a('span', { class: 'hljs-function' }, [
                          a('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          a('span', { class: 'hljs-title' }, 'handleClickAction'),
                          s('('),
                          a('span', { class: 'hljs-params' }, 'chooseFile'),
                          s(') '),
                        ]),
                        s(`{
  Snackbar.loading(`),
                        a('span', { class: 'hljs-string' }, "'delay 1s'"),
                        s(`)

  `),
                        a('span', { class: 'hljs-built_in' }, 'window'),
                        s('.setTimeout('),
                        a('span', { class: 'hljs-function' }, '() =>'),
                        s(` {
    Snackbar.clear()
    chooseFile()
  }, `),
                        a('span', { class: 'hljs-number' }, '1000'),
                        s(`)
}
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(' @'),
                        a('span', { class: 'hljs-attr' }, 'click-action'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"handleClickAction"'),
                        s(' />'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', T, [
        a('h3', Z, [
          t(e, { to: '#jin4yong4' }, { default: n(() => l[39] || (l[39] = [s('#')])), _: 1 }),
          l[40] || (l[40] = s('禁用')),
        ]),
        t(d, null, {
          default: n(
            () =>
              l[41] ||
              (l[41] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([])
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'disabled'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s('/>'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', E, [
        a('h3', $, [
          t(e, { to: '#zhi1du2' }, { default: n(() => l[42] || (l[42] = [s('#')])), _: 1 }),
          l[43] || (l[43] = s('只读')),
        ]),
        t(d, null, {
          default: n(
            () =>
              l[44] ||
              (l[44] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([])
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'readonly'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s('/>'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', D, [
        a('h3', I, [
          t(e, { to: '#shan1chu2qian2chu3li3' }, { default: n(() => l[45] || (l[45] = [s('#')])), _: 1 }),
          l[46] || (l[46] = s('删除前处理')),
        ]),
        l[48] ||
          (l[48] = a(
            'p',
            null,
            [s('删除文件之前会触发 '), a('code', null, 'before-remove'), s(' 事件，返回假值阻止删除操作。')],
            -1,
          )),
        t(d, null, {
          default: n(
            () =>
              l[47] ||
              (l[47] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { Dialog } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'@maplejs/maple-ui'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`
  }
])

`),
                        a('span', { class: 'hljs-keyword' }, 'async'),
                        s(),
                        a('span', { class: 'hljs-function' }, [
                          a('span', { class: 'hljs-keyword' }, 'function'),
                          s(),
                          a('span', { class: 'hljs-title' }, 'handleBeforeRemove'),
                          s('('),
                          a('span', { class: 'hljs-params' }),
                          s(') '),
                        ]),
                        s(`{
  `),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(' action = '),
                        a('span', { class: 'hljs-keyword' }, 'await'),
                        s(` Dialog({
    `),
                        a('span', { class: 'hljs-attr' }, 'title'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'是否删除?'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'message'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'删除后无法撤回'"),
                        s(`
  })

  `),
                        a('span', { class: 'hljs-keyword' }, 'return'),
                        s(' action === '),
                        a('span', { class: 'hljs-string' }, "'confirm'"),
                        s(`
}
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(' @'),
                        a('span', { class: 'hljs-attr' }, 'before-remove'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"handleBeforeRemove"'),
                        s(' />'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', L, [
        a('h3', q, [
          t(e, { to: '#zi4ding4yi4shang4chuan2yang4shi4' }, { default: n(() => l[49] || (l[49] = [s('#')])), _: 1 }),
          l[50] || (l[50] = s('自定义上传样式')),
        ]),
        t(d, null, {
          default: n(
            () =>
              l[51] ||
              (l[51] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref()
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s('>'),
                      ]),
                      s(`
    `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-button'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'type'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"primary"'),
                        s('>'),
                      ]),
                      s('上传'),
                      a('span', { class: 'hljs-tag' }, [
                        s('</'),
                        a('span', { class: 'hljs-name' }, 'mp-button'),
                        s('>'),
                      ]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('</'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', Q, [
        a('h3', W, [
          t(e, { to: '#zi4duan4jiao4yan4' }, { default: n(() => l[52] || (l[52] = [s('#')])), _: 1 }),
          l[53] || (l[53] = s('字段校验')),
        ]),
        l[55] ||
          (l[55] = a(
            'p',
            null,
            [
              s('通过传入一个校验器数组可以对值进行校验，校验器返回 '),
              a('code', null, 'true'),
              s(
                ' 则为校验通过。 以外的值将转换为文本作为用户提示。 第二个参数是一个工具函数集合，可以快速获取符合状态的文件集合。',
              ),
            ],
            -1,
          )),
        t(d, null, {
          default: n(
            () =>
              l[54] ||
              (l[54] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'state'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'error'"),
                        s(`,
  },
])
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(`
    `),
                        a('span', { class: 'hljs-attr' }, ':rules'),
                        s('='),
                        a(
                          'span',
                          { class: 'hljs-string' },
                          `"(v, u) => u.getError().length === 0 || '存在上传失败的文件'"`,
                        ),
                        s(`
    `),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(`
  />`),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', G, [
        a('h3', H, [
          t(e, { to: '#shi3yong4Zo0djin4xing2jiao4yan4' }, { default: n(() => l[56] || (l[56] = [s('#')])), _: 1 }),
          l[57] || (l[57] = s('使用 Zod 进行校验')),
        ]),
        t(d, null, {
          default: n(
            () =>
              l[58] ||
              (l[58] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { z } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'zod'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'state'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'error'"),
                        s(`,
  },
])
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(`
    `),
                        a('span', { class: 'hljs-attr' }, ':rules'),
                        s('='),
                        a(
                          'span',
                          { class: 'hljs-string' },
                          `"
      z.array(z.any()).refine(v => v.filter(file => file.state === 'error').length === 0, '存在上传失败的文件')
    "`,
                        ),
                        s(`
    `),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s(`
  />`),
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
                    ]),
                  ],
                  -1,
                ),
              ]),
          ),
          _: 1,
        }),
      ]),
      a('div', J, [
        a('h3', K, [
          t(e, { to: '#zi4ding4yi4xuan4ran3' }, { default: n(() => l[59] || (l[59] = [s('#')])), _: 1 }),
          l[60] || (l[60] = s('自定义渲染')),
        ]),
        l[62] ||
          (l[62] = a(
            'p',
            null,
            [s('通过 '), a('code', null, 'hide-list'), s(' 隐藏组件的文件列表，自定义文件列表的渲染逻辑。')],
            -1,
          )),
        t(d, null, {
          default: n(
            () =>
              l[61] ||
              (l[61] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'state'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'loading'"),
                        s(`,
  },
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'state'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'success'"),
                        s(`,
  },
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'state'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'error'"),
                        s(`,
  },
])
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'mp-space'), s('>')]),
                      s(`
    `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'img'),
                        s(`
      `),
                        a('span', { class: 'hljs-attr' }, 'class'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"uploader-example-file"'),
                        s(`
      `),
                        a('span', { class: 'hljs-attr' }, 'v-for'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"f in files"'),
                        s(`
      `),
                        a('span', { class: 'hljs-attr' }, ':key'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"f.id"'),
                        s(`
      `),
                        a('span', { class: 'hljs-attr' }, ':src'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"f.cover"'),
                        s(`
    />`),
                      ]),
                      s(`
    `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'hide-list'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s('>'),
                      ]),
                      s(`
      `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-button'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'round'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'type'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"primary"'),
                        s('>'),
                      ]),
                      s(`
        `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-icon'),
                        s(),
                        a('span', { class: 'hljs-attr' }, ':size'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"28"'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'name'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"upload"'),
                        s(' />'),
                      ]),
                      s(`
      `),
                      a('span', { class: 'hljs-tag' }, [
                        s('</'),
                        a('span', { class: 'hljs-name' }, 'mp-button'),
                        s('>'),
                      ]),
                      s(`
    `),
                      a('span', { class: 'hljs-tag' }, [
                        s('</'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s('>'),
                      ]),
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
                        a('span', { class: 'hljs-selector-class' }, '.uploader-example-file'),
                        s(` {
  `),
                        a('span', { class: 'hljs-attribute' }, 'width'),
                        s(': '),
                        a('span', { class: 'hljs-number' }, '40px'),
                        s(`;
  `),
                        a('span', { class: 'hljs-attribute' }, 'height'),
                        s(': '),
                        a('span', { class: 'hljs-number' }, '40px'),
                        s(`;
  `),
                        a('span', { class: 'hljs-attribute' }, 'border-radius'),
                        s(': '),
                        a('span', { class: 'hljs-number' }, '50%'),
                        s(`;
  `),
                        a('span', { class: 'hljs-attribute' }, 'font-size'),
                        s(': '),
                        a('span', { class: 'hljs-number' }, '12px'),
                        s(`;
  `),
                        a('span', { class: 'hljs-attribute' }, 'object-fit'),
                        s(`: cover;
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
      a('div', O, [
        a('h3', X, [
          t(e, { to: '#zi4ding4yi4shan1chu2an4niu3' }, { default: n(() => l[63] || (l[63] = [s('#')])), _: 1 }),
          l[64] || (l[64] = s('自定义删除按钮')),
        ]),
        t(d, null, {
          default: n(
            () =>
              l[65] ||
              (l[65] = [
                a(
                  'pre',
                  { class: 'hljs' },
                  [
                    a('code', null, [
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'script'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'setup'),
                        s('>'),
                      ]),
                      a('span', { class: 'javascript' }, [
                        s(`
`),
                        a('span', { class: 'hljs-keyword' }, 'import'),
                        s(' { ref } '),
                        a('span', { class: 'hljs-keyword' }, 'from'),
                        s(),
                        a('span', { class: 'hljs-string' }, "'vue'"),
                        s(`

`),
                        a('span', { class: 'hljs-keyword' }, 'const'),
                        s(` files = ref([
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cat.jpg'"),
                        s(`
  },
  {
    `),
                        a('span', { class: 'hljs-attr' }, 'url'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://www.runoob.com/try/demo_source/mov_bbb.mp4'"),
                        s(`,
    `),
                        a('span', { class: 'hljs-attr' }, 'cover'),
                        s(': '),
                        a('span', { class: 'hljs-string' }, "'https://maplejs.org/cover.jpg'"),
                        s(`
  }
])
`),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'script'), s('>')]),
                      s(`

`),
                      a('span', { class: 'hljs-tag' }, [s('<'), a('span', { class: 'hljs-name' }, 'template'), s('>')]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'v-model'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"files"'),
                        s('>'),
                      ]),
                      s(`
    `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'template'),
                        s(' #'),
                        a('span', { class: 'hljs-attr' }, 'remove-button'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"{ remove }"'),
                        s('>'),
                      ]),
                      s(`
      `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'div'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'class'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"custom-remove-button"'),
                        s('>'),
                      ]),
                      s(`
        `),
                      a('span', { class: 'hljs-tag' }, [
                        s('<'),
                        a('span', { class: 'hljs-name' }, 'mp-icon'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'color'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"#fff"'),
                        s(),
                        a('span', { class: 'hljs-attr' }, 'name'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"window-close"'),
                        s(' @'),
                        a('span', { class: 'hljs-attr' }, 'click.stop'),
                        s('='),
                        a('span', { class: 'hljs-string' }, '"remove"'),
                        s('>'),
                      ]),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'mp-icon'), s('>')]),
                      s(`
      `),
                      a('span', { class: 'hljs-tag' }, [s('</'), a('span', { class: 'hljs-name' }, 'div'), s('>')]),
                      s(`
    `),
                      a('span', { class: 'hljs-tag' }, [
                        s('</'),
                        a('span', { class: 'hljs-name' }, 'template'),
                        s('>'),
                      ]),
                      s(`
  `),
                      a('span', { class: 'hljs-tag' }, [
                        s('</'),
                        a('span', { class: 'hljs-name' }, 'mp-uploader'),
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
                        a('span', { class: 'hljs-selector-class' }, '.custom-remove-button'),
                        s(` {
  `),
                        a('span', { class: 'hljs-attribute' }, 'position'),
                        s(`: absolute;
  `),
                        a('span', { class: 'hljs-attribute' }, 'top'),
                        s(': '),
                        a('span', { class: 'hljs-number' }, '0'),
                        s(`;
  `),
                        a('span', { class: 'hljs-attribute' }, 'right'),
                        s(': '),
                        a('span', { class: 'hljs-number' }, '0'),
                        s(`;
  `),
                        a('span', { class: 'hljs-attribute' }, 'z-index'),
                        s(': '),
                        a('span', { class: 'hljs-number' }, '3'),
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
      l[88] || (l[88] = a('h2', null, 'API', -1)),
      a('div', Y, [
        a('h3', _, [
          t(e, { to: '#shu3xing4' }, { default: n(() => l[66] || (l[66] = [s('#')])), _: 1 }),
          l[67] || (l[67] = s('属性')),
        ]),
        l[68] ||
          (l[68] = o(
            '<table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>v-model</code></td><td>文件列表</td><td><em>MpFile[]</em></td><td><code>[]</code></td></tr><tr><td><code>accept</code></td><td>接受的文件类型，与原生属性一致</td><td><em>string</em></td><td><code>image/*</code></td></tr><tr><td><code>capture</code></td><td>获取文件方式，与原生属性一致</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>multiple</code></td><td>是否多选文件</td><td><em>boolean</em></td><td><code>false</code></td></tr><tr><td><code>readonly</code></td><td>是否只读</td><td><em>boolean</em></td><td><code>false</code></td></tr><tr><td><code>disabled</code></td><td>是否禁用</td><td><em>boolean</em></td><td><code>false</code></td></tr><tr><td><code>elevation</code></td><td>海拔高度，可选值为 <code>true</code> <code>false</code> 和 <code>0-24</code> 的等级, 不为简单模式时生效</td><td><em>string | number | boolean</em></td><td><code>true</code></td></tr><tr><td><code>removable</code></td><td>是否可以删除</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>maxlength</code></td><td>最大文件个数</td><td><em>string | number</em></td><td><code>-</code></td></tr><tr><td><code>maxsize</code></td><td>最大文件大小，单位为 <code>byte</code></td><td><em>string | number</em></td><td><code>-</code></td></tr><tr><td><code>previewed</code></td><td>是否允许预览</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>prevent-default-preview</code></td><td>阻止默认预览行为</td><td><em>boolean</em></td><td><code>false</code></td></tr><tr><td><code>ripple</code></td><td>是否开启水波纹</td><td><em>boolean</em></td><td><code>true</code></td></tr><tr><td><code>hide-list</code></td><td>是否隐藏文件列表</td><td><em>boolean</em></td><td><code>false</code></td></tr><tr><td><code>resolve-type</code></td><td>文件预处理类型，可选值为 <code>default</code> <code>file</code> <code>data-url</code>（<code>default</code>，图片文件包含 dataURL 编码和 File 对象，其他类型仅包含 File 对象。<code>file</code>，仅包含 File 对象。<code>data-url</code>，所有文件类型都包含 dataURL 编码和 File 对象）</td><td><em>string</em></td><td><code>default</code></td></tr><tr><td><code>validate-trigger</code></td><td>触发验证的时机， 可选值为 <code>onChange</code> <code>onRemove</code></td><td><em>UploaderValidateTrigger[]</em></td><td><code>[&#39;onChange&#39;, &#39;onRemove&#39;]</code></td></tr><tr><td><code>rules</code></td><td>验证规则，返回 <code>true</code> 表示验证通过，其它类型的值将转换为文本作为用户提示。自 <code>3.5.0</code> 开始支持 <a href="#/zh-CN/zodValidation">Zod 验证</a></td><td><em>((v: MpFile[]) =&gt; any) | ZodType | Array&lt;((v: MpFile[]) =&gt; any) | ZodType&gt;</em></td><td><code>-</code></td></tr></tbody></table>',
            1,
          )),
      ]),
      a('div', ss, [
        a('h3', as, [
          t(e, { to: '#MpFile' }, { default: n(() => l[69] || (l[69] = [s('#')])), _: 1 }),
          l[70] || (l[70] = s('MpFile')),
        ]),
        l[71] ||
          (l[71] = o(
            '<table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>file</code></td><td>原生文件</td><td><em>File</em></td><td><code>-</code></td></tr><tr><td><code>name</code></td><td>文件名</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>url</code></td><td>文件地址</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>cover</code></td><td>封面图</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>fit</code></td><td>封面图填充模式，可选值为 <code>fill</code> <code>contain</code> <code>cover</code> <code>none</code> <code>scale-down</code></td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>state</code></td><td>文件上传状态，可选值为 <code>loading</code> <code>success</code> <code>error</code></td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>progress</code></td><td>文件上传进度，范围 [0, 100]</td><td><em>number</em></td><td><code>-</code></td></tr></tbody></table>',
            1,
          )),
      ]),
      a('div', ls, [
        a('h3', ts, [
          t(e, { to: '#MpFileUtils' }, { default: n(() => l[72] || (l[72] = [s('#')])), _: 1 }),
          l[73] || (l[73] = s('MpFileUtils')),
        ]),
        l[74] ||
          (l[74] = o(
            '<table><thead><tr><th>方法名</th><th>说明</th><th>参数</th><th>返回值</th></tr></thead><tbody><tr><td><code>getLoading</code></td><td>获取 <code>state</code> 等于 <code>loading</code> 的文件集合</td><td><code>-</code></td><td><code>MpFile[]</code></td></tr><tr><td><code>getSuccess</code></td><td>获取 <code>state</code> 等于 <code>success</code> 的文件集合</td><td><code>-</code></td><td><code>MpFile[]</code></td></tr><tr><td><code>getError</code></td><td>获取 <code>state</code> 等于 <code>error</code> 的文件集合</td><td><code>-</code></td><td><code>MpFile[]</code></td></tr></tbody></table>',
            1,
          )),
      ]),
      a('div', ns, [
        a('h3', es, [
          t(e, { to: '#fang1fa3' }, { default: n(() => l[75] || (l[75] = [s('#')])), _: 1 }),
          l[76] || (l[76] = s('方法')),
        ]),
        l[77] ||
          (l[77] = o(
            '<table><thead><tr><th>方法名</th><th>说明</th><th>参数</th><th>返回值</th></tr></thead><tbody><tr><td><code>chooseFile</code></td><td>触发选择文件动作，显示文件列表</td><td><code>-</code></td><td><code>-</code></td></tr><tr><td><code>closePreview</code></td><td>关闭预览文件弹出层</td><td><code>-</code></td><td><code>-</code></td></tr><tr><td><code>getLoading</code></td><td>获取 <code>state</code> 等于 <code>loading</code> 的文件集合</td><td><code>-</code></td><td><code>MpFile[]</code></td></tr><tr><td><code>getSuccess</code></td><td>获取 <code>state</code> 等于 <code>success</code> 的文件集合</td><td><code>-</code></td><td><code>MpFile[]</code></td></tr><tr><td><code>getError</code></td><td>获取 <code>state</code> 等于 <code>error</code> 的文件集合</td><td><code>-</code></td><td><code>MpFile[]</code></td></tr><tr><td><code>validate</code></td><td>触发校验</td><td><code>-</code></td><td><code>valid: Promise&lt;boolean&gt;</code></td></tr><tr><td><code>resetValidation</code></td><td>清空校验信息</td><td><code>-</code></td><td><code>-</code></td></tr><tr><td><code>reset</code></td><td>清空绑定的值(设置为 <code>[]</code>)和校验信息</td><td><code>-</code></td><td><code>-</code></td></tr></tbody></table>',
            1,
          )),
      ]),
      a('div', ds, [
        a('h3', os, [
          t(e, { to: '#shi4jian4' }, { default: n(() => l[78] || (l[78] = [s('#')])), _: 1 }),
          l[79] || (l[79] = s('事件')),
        ]),
        l[80] ||
          (l[80] = o(
            '<table><thead><tr><th>事件名</th><th>说明</th><th>参数</th></tr></thead><tbody><tr><td><code>before-filter</code></td><td><code>before-read</code> 前触发，对文件列表进行过滤</td><td><code>files: MpFile[]</code></td></tr><tr><td><code>before-read</code></td><td>文件读取前触发，返回假值阻止文件读取(支持 promise)</td><td><code>file: MpFile</code></td></tr><tr><td><code>after-read</code></td><td>文件读取后触发</td><td><code>file: MpFile</code></td></tr><tr><td><code>oversize</code></td><td>文件超过限制大小时触发</td><td><code>file: MpFile</code></td></tr><tr><td><code>before-remove</code></td><td>文件删除前触发，返回假值阻止文件删除(支持 promise)</td><td><code>file: MpFile</code></td></tr><tr><td><code>remove</code></td><td>文件删除时触发</td><td><code>file: MpFile</code></td></tr><tr><td><code>preview</code></td><td>文件预览时触发</td><td><code>file: MpFile</code></td></tr><tr><td><code>click-action</code></td><td>拦截上传按钮的点击行为</td><td><code>chooseFile: () =&gt; void, event: Event</code></td></tr></tbody></table>',
            1,
          )),
      ]),
      a('div', cs, [
        a('h3', rs, [
          t(e, { to: '#cha1cao2' }, { default: n(() => l[81] || (l[81] = [s('#')])), _: 1 }),
          l[82] || (l[82] = s('插槽')),
        ]),
        l[83] ||
          (l[83] = o(
            '<table><thead><tr><th>插槽名</th><th>说明</th><th>参数</th></tr></thead><tbody><tr><td><code>default</code></td><td>上传按钮内容</td><td><code>-</code></td></tr><tr><td><code>extra-message</code></td><td>附加信息</td><td><code>-</code></td></tr><tr><td><code>remove-button</code> <em><strong>3.8.0</strong></em></td><td>删除按钮</td><td><code>remove: () =&gt; void</code></td></tr></tbody></table>',
            1,
          )),
      ]),
      a('div', ps, [
        a('h3', is, [
          t(e, { to: '#yang4shi4bian4liang4' }, { default: n(() => l[84] || (l[84] = [s('#')])), _: 1 }),
          l[85] || (l[85] = s('样式变量')),
        ]),
        l[86] ||
          (l[86] = o(
            '<p>以下为组件使用的 css 变量，可以使用 <a href="#/zh-CN/style-provider">StyleProvider 组件</a> 进行样式定制。</p><table><thead><tr><th>变量名</th><th>默认值</th></tr></thead><tbody><tr><td><code>--uploader-action-background</code></td><td><code>#f7f8fa</code></td></tr><tr><td><code>--uploader-action-icon-color</code></td><td><code>#888</code></td></tr><tr><td><code>--uploader-action-icon-size</code></td><td><code>24px</code></td></tr><tr><td><code>--uploader-action-margin</code></td><td><code>0 10px 10px 0</code></td></tr><tr><td><code>--uploader-file-size</code></td><td><code>80px</code></td></tr><tr><td><code>--uploader-file-margin</code></td><td><code>0 10px 10px 0</code></td></tr><tr><td><code>--uploader-file-name-background</code></td><td><code>#f7f8fa</code></td></tr><tr><td><code>--uploader-file-name-color</code></td><td><code>#888</code></td></tr><tr><td><code>--uploader-file-name-font-size</code></td><td><code>12px</code></td></tr><tr><td><code>--uploader-file-name-padding</code></td><td><code>10px</code></td></tr><tr><td><code>--uploader-file-border-radius</code></td><td><code>0</code></td></tr><tr><td><code>--uploader-file-text-align</code></td><td><code>center</code></td></tr><tr><td><code>--uploader-file-close-background</code></td><td><code>rgba(0, 0, 0, 0.3)</code></td></tr><tr><td><code>--uploader-file-close-size</code></td><td><code>24px</code></td></tr><tr><td><code>--uploader-file-close-icon-font-size</code></td><td><code>14px</code></td></tr><tr><td><code>--uploader-file-close-icon-color</code></td><td><code>#fff</code></td></tr><tr><td><code>--uploader-file-cover-fit</code></td><td><code>cover</code></td></tr><tr><td><code>--uploader-file-cover-background</code></td><td><code>#f7f8fa</code></td></tr><tr><td><code>--uploader-preview-video-width</code></td><td><code>100vw</code></td></tr><tr><td><code>--uploader-preview-video-height</code></td><td><code>100vw</code></td></tr><tr><td><code>--uploader-file-indicator-height</code></td><td><code>4px</code></td></tr><tr><td><code>--uploader-file-indicator-normal-color</code></td><td><code>var(--color-disabled)</code></td></tr><tr><td><code>--uploader-file-indicator-success-color</code></td><td><code>var(--color-success)</code></td></tr><tr><td><code>--uploader-file-indicator-error-color</code></td><td><code>var(--color-danger)</code></td></tr><tr><td><code>--uploader-file-progress-color</code></td><td><code>var(--color-primary)</code></td></tr><tr><td><code>--uploader-disabled-color</code></td><td><code>#ddd</code></td></tr><tr><td><code>--uploader-disabled-text-color</code></td><td><code>var(--color-text-disabled)</code></td></tr><tr><td><code>--uploader-loading-background</code></td><td><code>linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0))</code></td></tr></tbody></table>',
            2,
          )),
      ]),
    ])
  )
}
const ys = r(h, [['render', hs]])
export { ys as default }
