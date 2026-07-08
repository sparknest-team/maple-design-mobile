import { b as a, p as d, $ as i, w as l, f as m, Q as o, l as p, e as r, m as t } from './index-CLBN0B2q.js'

const u = { components: {} },
  c = { class: 'maple-site-doc' },
  g = { class: 'card' },
  f = { id: 'Intro' },
  h = { class: 'card' },
  b = { id: 'Features' },
  y = { class: 'card' },
  v = { id: 'Quickstart' },
  x = { class: 'card' },
  j = { id: 'Configurationfile' },
  C = { class: 'card' },
  w = { id: 'Custompages' },
  T = { class: 'card' },
  k = { id: 'Commandrelated' },
  S = { class: 'card' },
  D = { id: 'Notebeforepublish' },
  M = { class: 'card' },
  N = { id: 'Q&A' }
function E(P, e, R, V, z, B) {
  const s = r('router-link'),
    n = r('mp-site-code-example')
  return (
    m(),
    p('div', c, [
      e[65] || (e[65] = t('h1', null, 'Components Library Tools', -1)),
      t('div', g, [
        t('h3', f, [
          d(s, { to: '#Intro' }, { default: l(() => e[0] || (e[0] = [o('#')])), _: 1 }),
          e[1] || (e[1] = o('Intro')),
        ]),
        e[2] ||
          (e[2] = t(
            'p',
            null,
            [
              o('The out-of-the-box '),
              t('code', null, 'Vue3 component library'),
              o(
                ' rapid prototyping tool provides a series of commands and tools to solve the problem of component library development.',
              ),
            ],
            -1,
          )),
      ]),
      t('div', h, [
        t('h3', b, [
          d(s, { to: '#Features' }, { default: l(() => e[3] || (e[3] = [o('#')])), _: 1 }),
          e[4] || (e[4] = o('Features')),
        ]),
        e[5] ||
          (e[5] = i(
            '<ul><li>📦  Out-of-the-box component library development environment</li><li>📦  An out-of-the-box component library compilation tool that supports exporting <code>esm</code>, <code>cjs</code>, <code>umd</code> module codes</li><li>🛠️  Configuration file-based component library documentation site, support Baidu statistics and theme customization</li><li>🛠️  Supports both <code>sfc</code> and <code>tsx</code> styles for writing component libraries</li><li>📦  Out-of-the-box code inspection tool</li><li>📦  Out-of-the-box unit testing tools</li><li>📦  Out-of-the-box code publishing tool, publishes to both <code>npm</code> and <code>github</code>, and automatically generates changelogs</li><li>💪  Support for <code>VSCode</code> extension development</li><li>💪  Support <code>build svg to web fonts</code></li><li>💪  Support for <code>Typescript</code></li><li>💪  Support <code>Various themes, including Material Design 2, Material Design 3</code></li><li>🌍  Support <code>Internationalization</code></li><li>🚀  Based on <code>pnpm</code></li></ul>',
            1,
          )),
      ]),
      t('div', y, [
        t('h3', v, [
          d(s, { to: '#Quickstart' }, { default: l(() => e[6] || (e[6] = [o('#')])), _: 1 }),
          e[7] || (e[7] = o('Quickstart')),
        ]),
        e[9] ||
          (e[9] = t(
            'p',
            null,
            [
              t('code', null, '@maplejs/maple-cli'),
              o(' has built-in '),
              t('code', null, 'sfc'),
              o(' and '),
              t('code', null, 'tsx'),
              o(' style component library project templates, which can be generated directly by the '),
              t('code', null, 'gen'),
              o(' command. It is convenient for you to directly enter the component library development.'),
            ],
            -1,
          )),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[8] ||
                (e[8] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `pnpm add @maplejs/maple-cli -g
maple-cli gen
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
      ]),
      e[66] || (e[66] = t('h2', null, 'Advanced customization', -1)),
      t('div', x, [
        t('h3', j, [
          d(s, { to: '#Configurationfile' }, { default: l(() => e[10] || (e[10] = [o('#')])), _: 1 }),
          e[11] || (e[11] = o('Configuration file')),
        ]),
        e[12] ||
          (e[12] = i(
            '<p>The <code>maple.config.mjs</code> in the project root directory is used to manage the specific details of the entire component library project. The default configuration can be viewed <a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.default.config.ts?ref_type=heads">maple.default.config.ts</a>. Also refer to <code>@maplejs/maple-ui</code> <a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-ui/maple.config.mjs?ref_type=heads">maple.config.mjs</a>.</p><table><thead><tr><th>Parameter</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>name</code></td><td>The full name of the component library, which will be used as the package name</td><td><em>string</em></td><td><code>Varlet</code></td></tr><tr><td><code>namespace</code></td><td>Component library namespace, will be used as component prefix</td><td><em>string</em></td><td><code>var</code></td></tr><tr><td><code>host</code></td><td>Development server host</td><td><em>number</em></td><td><code>localhost</code></td></tr><tr><td><code>port</code></td><td>Development server port</td><td><em>number</em></td><td><code>8080</code></td></tr><tr><td><code>proxy</code></td><td>Development server proxy</td><td><em>Record&lt;string, string | ProxyOptions&gt;</em></td><td><code>-</code></td></tr><tr><td><code>title</code></td><td>The title of the component library in the document</td><td><em>string</em></td><td><code>VARLET</code></td></tr><tr><td><code>logo</code></td><td>The logo of the component library in the document</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>alias</code></td><td>Path alias (root is src folder when use relative path)</td><td><em>Record&lt;string, string&gt;</em></td><td><code>-</code></td></tr><tr><td><code>defaultLanguage</code></td><td>Document default language</td><td><em>string</em></td><td><code>zh-CN</code></td></tr><tr><td><code>defaultLightTheme</code></td><td>The default light theme</td><td><em>string</em></td><td><code>md3LightTheme</code></td></tr><tr><td><code>defaultDarkTheme</code></td><td>The default dark theme</td><td><em>string</em></td><td><code>md3DarkTheme</code></td></tr><tr><td><code>useMobile</code></td><td>Whether to display the mobile phone preview on the right</td><td><em>boolean</em></td><td><code>false</code></td></tr><tr><td><code>themeKey</code></td><td>The key of the theme in local storage</td><td><em>string</em></td><td><code>VARLET_THEME</code></td></tr><tr><td><code>lightTheme</code></td><td>md2 light mode document theme</td><td><em>Record&lt;string, any&gt;</em></td><td><code>-</code></td></tr><tr><td><code>darkTheme</code></td><td>md2 dark mode document theme</td><td><em>Record&lt;string, any&gt;</em></td><td><code>-</code></td></tr><tr><td><code>md3LightTheme</code></td><td>md3 light mode document theme</td><td><em>Record&lt;string, any&gt;</em></td><td><code>-</code></td></tr><tr><td><code>md3DarkTheme</code></td><td>md3 dark mode document theme</td><td><em>Record&lt;string, any&gt;</em></td><td><code>-</code></td></tr><tr><td><code>highlight</code></td><td>Document code snippet style related</td><td><em>{ style: string }</em></td><td><code>-</code></td></tr><tr><td><code>analysis</code></td><td>Document statistics related</td><td><em>{ baidu: string }</em></td><td><code>-</code></td></tr><tr><td><code>pc</code></td><td>PC side document structure configuration</td><td><em><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads">MapleConfigPc</a></em></td><td><code>-</code></td></tr><tr><td><code>mobile</code></td><td>Mobile document structure configuration</td><td><em><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads">MapleConfigMobile</a></em></td><td><code>-</code></td></tr><tr><td><code>bundle</code></td><td>Bundle output options</td><td><em>{ external: string[], globals: Record&lt;string, string&gt; }</em></td><td><code>-</code></td></tr><tr><td><code>vitePlugins</code></td><td>vite plugins</td><td><em><a href="https://vite.dev/guide/using-plugins.html">Plugin</a>[]</em> | <code>(plugins: Plugin[]) =&gt; Plugin[])</code></td><td><code>-</code></td></tr><tr><td><code>directives</code></td><td>Component library directive folder name</td><td><em>string[]</em></td><td><code>[]</code></td></tr><tr><td><code>copy</code></td><td>Copy file configuration</td><td><em><a href="https://github.com/varletjs/varlet/blob/dev/packages/maple-vite-plugins/src/copy.ts">CopyPath[]</a></em></td><td><code>- </code></td></tr><tr><td><code>icons</code></td><td>Font icon packaging related configurations</td><td>_<a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads">MapleConfigIcons</a> _</td><td><code>-</code></td></tr><tr><td><code>esbuild</code></td><td>esbuild configuration</td><td><em><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads">MapleConfigEsbuild</a></em></td><td><code> -</code></td></tr><tr><td><code>seo</code></td><td>seo options</td><td><em><a href="https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads">MapleConfigSeo</a></em></td><td><code> -</code></td></tr></tbody></table><h4>Menu</h4><table><thead><tr><th>Parameter</th><th>Description</th><th>Type</th><th>Default</th></tr></thead><tbody><tr><td><code>doc</code></td><td>The document page corresponds to the matching file name, required</td><td><em>string</em></td><td><code>-</code></td></tr><tr><td><code>type</code></td><td>The type of menu, when the type is <code>1</code>, it means the category menu, when the type is <code>2</code>, the doc field matches the component file under src, when the type is <code>3</code>, the doc field matches the md file under docs, required</td><td><em>MenuTypes</em></td><td><code>-</code></td></tr><tr><td><code>text</code></td><td>The text displayed in the menu, English display text can be configured when internationalization is set, required</td><td><em>Record&lt;string, string&gt;</em></td><td><code>-</code></td></tr><tr><td><code>useMobile</code></td><td>Whether to display the mobile phone preview on the right side on the current document page, if not filled, the default value is useMobile in config</td><td><em>boolean</em></td><td><code>-</code></td></tr></tbody></table>',
            4,
          )),
      ]),
      t('div', C, [
        t('h3', w, [
          d(s, { to: '#Custompages' }, { default: l(() => e[13] || (e[13] = [o('#')])), _: 1 }),
          e[14] || (e[14] = o('Custom pages')),
        ]),
        e[17] ||
          (e[17] = t(
            'p',
            null,
            [
              o('If you want to insert other pages into the component library, you can create a '),
              t('code', null, 'pages'),
              o(
                ' folder in the project root directory to write a vue component to generate other pages. The directory structure is as follows:',
              ),
            ],
            -1,
          )),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[15] ||
                (e[15] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `|-- maple-ui
  |-- src
  |-- docs
  |-- pages
    |-- sponsor
      |-- index.vue
    |-- contributor
      |-- locale
        |-- en-US.ts
      |-- index.vue
    |-- changelog
      |-- locale
        |-- zh-CN.ts
        |-- en-US.ts
      |-- index.vue
      
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[18] || (e[18] = t('p', null, 'The resulting route is as follows:', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[16] ||
                (e[16] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `/zh-CN/sponsor
/en-US/contributor
/zh-CN/changelog
/en-US/changelog
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
      ]),
      t('div', T, [
        t('h3', k, [
          d(s, { to: '#Commandrelated' }, { default: l(() => e[19] || (e[19] = [o('#')])), _: 1 }),
          e[20] || (e[20] = o('Command related')),
        ]),
        e[39] || (e[39] = t('h4', null, 'Start the development server', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[21] ||
                (e[21] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t('code', null, [
                        o(`maple-cli dev
`),
                        t('span', { class: 'hljs-meta' }, '#'),
                        t('span', { class: 'bash' }, ' force mode'),
                        o(`
maple-cli dev -f
`),
                        t('span', { class: 'hljs-meta' }, '#'),
                        t('span', { class: 'bash' }, ' draft mode'),
                        o(`
maple-cli dev -d
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
        e[40] || (e[40] = t('h4', null, 'Build a documentation site', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[22] ||
                (e[22] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli build
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[41] || (e[41] = t('h4', null, 'Preview documentation site', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[23] ||
                (e[23] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli preview
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[42] || (e[42] = t('h4', null, 'Compile component library', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[24] ||
                (e[24] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli compile
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[43] || (e[43] = t('h4', null, 'Compile style vars types declaration file', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[25] ||
                (e[25] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli compile:style-vars
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[44] || (e[44] = t('h4', null, 'Run VSCode extension development environment', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[26] ||
                (e[26] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli dev:extension
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[45] || (e[45] = t('h4', null, 'Build VSCode extension for production', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[27] ||
                (e[27] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli build:extension
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[46] || (e[46] = t('h4', null, 'Build svg to web fonts', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[28] ||
                (e[28] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli build:icons -w
maple-cli build:icons
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[47] || (e[47] = t('h4', null, 'Execute all unit tests', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[29] ||
                (e[29] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli test
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[48] || (e[48] = t('h4', null, 'Execute a unit test', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[30] ||
                (e[30] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli test -c <componentName>
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[49] || (e[49] = t('h4', null, 'Execute unit tests in watch mode', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[31] ||
                (e[31] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli test -w
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[50] || (e[50] = t('h4', null, 'Execute unit tests and report coverage', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[32] ||
                (e[32] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli test -cov
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[51] || (e[51] = t('h4', null, 'Lint git commit message', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[33] ||
                (e[33] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli commit-lint
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[52] || (e[52] = t('h4', null, 'Show checklist', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[34] ||
                (e[34] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli checklist
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[53] || (e[53] = t('h4', null, 'Generate changelog', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[35] ||
                (e[35] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli changelog
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[54] || (e[54] = t('h4', null, 'Release component library', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[36] ||
                (e[36] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t(
                        'code',
                        null,
                        `maple-cli release
`,
                      ),
                    ],
                    -1,
                  ),
                ]),
            ),
            _: 1,
          },
        ),
        e[55] || (e[55] = t('h4', null, 'Generate a project template', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[37] ||
                (e[37] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t('code', null, [
                        o(`maple-cli gen
`),
                        t(
                          'span',
                          { class: 'hljs-meta' },
                          `
#`,
                        ),
                        t('span', { class: 'bash' }, ' Options'),
                        o(`
-n
--name
  project name
-s
--sfc
  Generate sfc-style project templates
-t
--tsx
  Generate tsx-style project templates
-l
--locale
  Need to support internationalization
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
        e[56] || (e[56] = t('h4', null, 'Create a component template file', -1)),
        d(
          n,
          { 'playground-ignore': '' },
          {
            default: l(
              () =>
                e[38] ||
                (e[38] = [
                  t(
                    'pre',
                    { class: 'hljs' },
                    [
                      t('code', null, [
                        o(`maple-cli create
`),
                        t(
                          'span',
                          { class: 'hljs-meta' },
                          `
#`,
                        ),
                        t('span', { class: 'bash' }, ' Options'),
                        o(`
-n
--name
  project name
-s
--sfc
  Generate sfc-style component
-t
--tsx
  Generate tsx-style component
-l
--locale
  Need to support internationalization
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
      t('div', S, [
        t('h3', D, [
          d(s, { to: '#Notebeforepublish' }, { default: l(() => e[57] || (e[57] = [o('#')])), _: 1 }),
          e[58] || (e[58] = o('Note before publish')),
        ]),
        e[59] ||
          (e[59] = t(
            'ol',
            null,
            [
              t('li', null, [
                t('code', null, 'npm'),
                o(' repository registry must set to '),
                t('code', null, 'npm'),
                o(' official mirror'),
              ]),
              t('li', null, [o('Execute '), t('code', null, 'npm login'), o(' to log in')]),
            ],
            -1,
          )),
      ]),
      t('div', M, [
        t('h3', N, [
          d(s, { to: '#Q&A' }, { default: l(() => e[60] || (e[60] = [o('#')])), _: 1 }),
          e[61] || (e[61] = o('Q & A')),
        ]),
        e[63] || (e[63] = t('h4', null, 'How to solve failure of installing sharp ?', -1)),
        e[64] ||
          (e[64] = t(
            'ul',
            null,
            [t('li', null, 'You can choose to change mirror site which contains binaries for both sharp and libvips.')],
            -1,
          )),
        d(n, null, {
          default: l(
            () =>
              e[62] ||
              (e[62] = [
                t(
                  'pre',
                  { class: 'hljs' },
                  [
                    t(
                      'code',
                      null,
                      `pnpm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
pnpm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
`,
                    ),
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
const L = a(u, [['render', E]])
export { L as default }
