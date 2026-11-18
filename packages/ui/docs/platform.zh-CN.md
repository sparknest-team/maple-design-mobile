# 平台选择与兼容性

Cedar 面向桌面应用，Maple 面向移动应用。根据操作方式和信息密度选择平台，不以视口缩小替代移动适配。接入前核对所安装包的 peerDependencies，并在目标浏览器验证。

## Vue 版本兼容性

Cedar / Maple 以 Vue 3.3 及以上版本作为持续兼容验证目标，开发环境使用 Vue 3.5。UI 包的 `peerDependencies` 保持为 `3`，安装成功不代表所有 Vue 3 版本和场景均已验证。在 Vue 3.2 下，异步组件在服务端和客户端的完成顺序不同时，生成的 ID 可能关联到不同元素。Vue 3.0、3.1 未验证。

Cedar Table 在 SSR 首屏需要应用默认筛选时，请通过 `:columns` 数组传入列，并设置 `filterable.defaultFilteredValue`。使用 `<c-table-column>` 子组件声明列时，不保证服务端输出已筛选的行。

## 构建工具兼容范围

Cedar / Maple 暂不承诺兼容 Webpack 4，也不提供该工具链的持续兼容验证。ESM 产物保留 `import` / `export`，其中也可能包含可选链（`?.`）和空值合并（`??`）等现代 JavaScript 语法；ESM 模块格式不等于 ES5 语法兼容。

Webpack 4 无法直接解析 `?.` / `??`。如需接入，由使用方将组件库及相关依赖纳入 Babel 转译范围，并在自己的工程中验证。浏览器兼容范围与构建工具的解析能力是两个独立条件。

### Webpack 4 完整最小配置

以下示例将 Babel 转译、入口/子路径 alias、CSS loader 和 Vue 构建选项合并为一份配置。请在独立空目录中按文件名创建文件。示例使用已经编译的组件，不包含 `.vue` 单文件组件，因此不需要 `vue-loader`；业务项目使用 SFC 时应保留原有 Vue loader 配置。

1. 安装依赖（验证版本为 UI / icons 1.1.11、Vue 3.5.45）：

```sh
npm init -y
npm install vue@3.5.45 @maple-design/ui-vue@1.1.11 @maple-design/icons-vue@1.1.11
npm install --save-dev webpack@4.47.0 webpack-cli@3.3.12 babel-loader@8.4.1 @babel/core@^7 @babel/preset-env@^7 style-loader@2.0.0 css-loader@5.2.7
```

2. 创建 `webpack.config.cjs`（CommonJS，即使业务项目声明 `"type": "module"` 也可使用）：

```js
const path = require('path')
const webpack = require('webpack')
const uiRoot = path.dirname(require.resolve('@maple-design/ui-vue/package.json'))
const iconsRoot = path.dirname(require.resolve('@maple-design/icons-vue/style.css'))

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js' },
  resolve: {
    extensions: ['.mjs', '.js', '.json'],
    alias: {
      'vue$': require.resolve('vue/dist/vue.runtime.esm-bundler.js'),
      '@maple-design/ui-vue/style$': require.resolve('@maple-design/ui-vue/style'),
      '@maple-design/ui-vue/reset.css$': require.resolve('@maple-design/ui-vue/reset.css'),
      '@maple-design/ui-vue': path.join(uiRoot, 'es'),
      '@maple-design/icons-vue/style.css$': require.resolve('@maple-design/icons-vue/style.css'),
      '@maple-design/icons-vue': path.join(iconsRoot, 'es'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[cm]?js$/,
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            presets: [['@babel/preset-env', { targets: { chrome: '70' }, modules: false }]],
          },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
    }),
  ],
}
```

3. 创建 `src/index.js`。同时使用根入口和组件/图标子路径，确保这些路径均可解析；样式分别验证按需、全量、reset 和图标入口：

```js
import { createApp, h } from 'vue'
import { Button as RootButton } from '@maple-design/ui-vue'
import Button from '@maple-design/ui-vue/button'
import { IconAlertCircle as RootIcon } from '@maple-design/icons-vue'
import { IconAlertCircle } from '@maple-design/icons-vue/icon-alert-circle'
import '@maple-design/ui-vue/button/style'
import '@maple-design/ui-vue/style'
import '@maple-design/ui-vue/reset.css'
import '@maple-design/icons-vue/style.css'

if (RootButton !== Button || RootIcon !== IconAlertCircle) throw new Error('Entry mismatch')
createApp({
  setup() {
    return () => h(Button, { onClick: () => { document.body.dataset.clicked = 'yes' } }, {
      default: () => [h(IconAlertCircle), 'Webpack 4 works'],
    })
  },
}).mount('#app')
```

4. 创建项目根目录的 `index.html`：

```html
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Webpack 4 example</title></head>
  <body>
    <div id="app"></div>
    <script src="./dist/bundle.js"></script>
  </body>
</html>
```

5. 构建，然后通过本地 HTTP 服务打开根目录的 `index.html`：

```sh
npx webpack --config webpack.config.cjs
```

页面应显示带图标的 `Webpack 4 works` 按钮；点击后 `document.body.dataset.clicked` 为 `yes`。生产构建可能给出体积提示；此入口刻意同时引入全量和按需样式以验证解析，业务项目通常只选择一种样式方案。

#### 配置要点与适用范围

- Babel `preset-env` 以 Chrome 70 作为语法转换目标并设置 `modules: false`，转换 `?.`、`??`、逻辑赋值和类字段等 Webpack 4 无法解析的语法，同时保留 ESM。该 target 是本示例的编译配置，不代表组件库支持 Chrome 70，也不提供运行时 API 或 CSS 降级。仅启用 `syntax-*` 插件不会完成转换。
- 本最小示例对所有 `.js` / `.mjs` / `.cjs`（包含 Vue、组件库和其他依赖）执行 Babel，避免默认排除 `node_modules` 导致漏转译。业务项目可在验证后缩小范围；`oneOf` 也必须让这些文件进入规则。`javascript/auto` 允许 Webpack 4 处理 `.mjs` 与 CommonJS 依赖之间的互操作。
- Webpack 4 不识别 `exports` 映射。无 `$` 的包名 alias 覆盖根入口及对应 ES 目录的组件/图标/组件样式子路径，无需单独的 `ui-vue$`。精确样式 alias 必须先于前缀 alias；全量样式、reset 和图标 CSS 分别指向实际文件。`.mjs` 必须在扩展名列表中。
- 合并到已有工程时保留其入口、输出、扩展名和其他 loader/plugin。前缀 alias 不能替代所有 `exports`；若使用 `package.json` 或 Maple 的 `json/*`、`highlight/*` 等导出，需要按安装版本另配映射。
- 这份配置只验证了上述最小应用；不构成 Webpack 4 的持续兼容承诺，也不提供旧浏览器运行时 API polyfill、CSS 降级或所有组件行为的保证。

[LLM documentation](#/zh-CN/llms) · [Cedar](https://cedar.show) · [Maple](https://maple.show)
