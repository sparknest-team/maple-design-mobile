# Platforms and compatibility

Cedar targets desktop applications; Maple targets mobile applications. Choose by interaction and information density. Check the installed package peer dependencies and verify your target browsers.

## Vue version compatibility

Cedar / Maple target Vue 3.3 and later for ongoing compatibility checks; development uses Vue 3.5. The UI package keeps a `3` Vue peer range, so successful installation does not mean every Vue 3 version and scenario has been verified. On Vue 3.2, generated ID associations may differ if asynchronous components resolve in a different order on the server and client. Vue 3.0 and 3.1 have not been verified.

When the initial server render of Cedar Table must apply a default filter, pass the columns through `:columns` and set `filterable.defaultFilteredValue`. Columns declared with `<c-table-column>` do not guarantee filtered rows in the server HTML.

## Server-rendered overlays

When rendering an initially open Dialog, Message or Cedar Drawer into its default `body` target, pass a context to `renderToString(app, context)`. If you assemble the document yourself, insert `context.teleports?.body ?? ''` immediately after the opening `<body>` tag, before the application root. Preserve the HTML and its comment anchors. Appending it after the application root can cause hydration to create a second overlay and leave the original backdrop intercepting clicks.

## Build tool compatibility

Cedar / Maple do not currently guarantee Webpack 4 compatibility or continuously validate that toolchain. ESM output preserves `import` / `export` and may also contain modern JavaScript syntax such as optional chaining (`?.`) and nullish coalescing (`??`). ESM describes the module format, not ES5 syntax compatibility.

Webpack 4 cannot parse `?.` / `??` directly. Applications that need this toolchain must transpile the library and relevant dependencies with Babel and validate their own integration. Browser compatibility and build tool parsing capabilities are separate requirements.

### Complete minimal Webpack 4 configuration

This example combines Babel transpilation, entry/subpath aliases, CSS loaders and Vue build flags in one configuration. Create the files below in an empty directory. It consumes precompiled components and does not use `.vue` single-file components, so no `vue-loader` is needed. Retain your existing Vue loader configuration if your application uses SFCs.

1. Install dependencies (validated with UI / icons 1.1.11 and Vue 3.5.45):

```sh
npm init -y
npm install vue@3.5.45 @maple-design/ui-vue@1.1.11 @maple-design/icons-vue@1.1.11
npm install --save-dev webpack@4.47.0 webpack-cli@3.3.12 babel-loader@8.4.1 @babel/core@^7 @babel/preset-env@^7 style-loader@2.0.0 css-loader@5.2.7
```

2. Create `webpack.config.cjs` (CommonJS, including when the application declares `"type": "module"`):

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

3. Create `src/index.js`. It consumes both root and component/icon subpath imports, plus component, full, reset and icon styles to exercise resolution:

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

4. Create `index.html` in the project root:

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

5. Build, then serve the project root over local HTTP and open `index.html`:

```sh
npx webpack --config webpack.config.cjs
```

The page should display a `Webpack 4 works` button with an icon. Clicking it sets `document.body.dataset.clicked` to `yes`. Production builds may report asset size warnings. This entry intentionally imports both full and component styles to validate their paths; applications usually choose one styling approach.

#### Configuration details and scope

- Babel `preset-env` uses Chrome 70 as its syntax target with `modules: false`, transforming optional chaining, nullish coalescing, logical assignment and class fields while preserving ESM. This is a compilation target for this example, not a promise that the library supports Chrome 70; it supplies neither runtime API polyfills nor CSS fallbacks. `syntax-*` plugins alone do not transform syntax.
- This minimal example transpiles all `.js` / `.mjs` / `.cjs` files, including Vue, the component library and other dependencies. It avoids excluding `node_modules`; narrow the scope only after validating your application, and ensure `oneOf` allows files to reach the rule. `javascript/auto` allows Webpack 4 to handle interop between `.mjs` and CommonJS dependencies.
- Webpack 4 does not support `exports` mappings. Package aliases without `$` cover the root and component/icon/component-style subpaths matching the ES directory layout; no separate `ui-vue$` alias is needed. Exact style aliases must precede prefix aliases. Full, reset and icon styles map to their actual files. Include `.mjs` in the extensions list.
- When integrating, retain your application's entry, output, extensions and other loaders/plugins. Prefix aliases do not replace all `exports` mappings. Other exports, such as `package.json` or Maple's `json/*` and `highlight/*`, need mappings based on the installed version.
- This configuration validates only the minimal application shown here. It does not guarantee ongoing Webpack 4 compatibility, provide runtime API polyfills or CSS fallbacks for older browsers, or verify every component's behavior.

[LLM documentation](#/en-US/llms) · [Cedar](https://cedar.show) · [Maple](https://maple.show)
