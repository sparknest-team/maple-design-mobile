<div align="center">
  <a href="https://maplejs.org/#/en-US/index">
    <img src="https://maplejs.org/logo.svg" width="150">
  </a>
  <h1>VARLET</h1>
  <p>A Vue3 component library based on Material Design 2 and 3, supporting mobile and desktop.</p>
  <p>
    <a href="https://maplejs.org/#/en-US/index">Documentation</a> |
    <a href="https://github.com/varletjs/varlet/blob/dev/README.zh-CN.md">中文介绍</a>
  </p>
  <p>
    <img src="https://img.shields.io/npm/v/@nio-pow/maple-ui?style=flat-square" alt="version">
    <img src="https://img.shields.io/github/stars/varletjs/varlet" alt="stars">
    <img src="https://img.shields.io/badge/vue-v3.2.0%2B-%23407fbc" alt="vue">
    <img src="https://img.shields.io/npm/l/@nio-pow/maple-ui.svg" alt="licence">
    <img src="https://img.shields.io/codecov/c/github/varletjs/varlet" alt="coverage">
    <img src="https://github.com/varletjs/varlet/workflows/CI/badge.svg" alt="ci">
  </p>
</div>

---

### Intro

Maple is a `Vue3` component library based on Material Design 2 and 3, supporting mobile and desktop, developed and maintained by `varletjs` organization.


### Features

- 🚀 &nbsp; Provide 60+ high quality general purpose components
- 🚀 &nbsp; Components are very lightweight
- 💪 &nbsp; Developed by Chinese, complete Chinese and English documentation and logistics support
- 🛠️ &nbsp; Support on-demand introduction
- 🛠️ &nbsp; Support theme customization
- 🌍 &nbsp; Support internationalization
- 💡 &nbsp; Support WebStorm syntax highlighting
- 💪 &nbsp; Support the SSR
- 📦 &nbsp; Support [Nuxt Module](https://github.com/varletjs/maple-nuxt)
- 💡 &nbsp; Support the Typescript
- 💪 &nbsp; Make sure more than 90 percent unit test coverage, providing stability assurance
- 🎨 &nbsp; Supports both Material Design 2 and Material Design 3 design systems
- 🛠️ &nbsp; Support dark mode
- 🔧 &nbsp; Provide official VSCode extension
- ⌨️ &nbsp; Support Accessibility (still improving)

### Install

### CDN
`varlet.js` contain all the styles and logic of the component library, and you can import them.

```html
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
 <!-- Desktop Adaptation -->
<script src="https://cdn.jsdelivr.net/npm/@nio-pow/maple-touch-emulator/iife.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@nio-pow/maple-ui/umd/varlet.js"></script>
<script>
  const app = Vue.createApp({
    template: '<mp-button>Button</mp-button>'
  })
  app.use(Maple).mount('#app')
</script>
```

### Webpack / Vite
```shell
# Install with npm or yarn or pnpm

# npm
npm i @nio-pow/maple-ui -S

# yarn
yarn add @nio-pow/maple-ui

# pnpm
pnpm add @nio-pow/maple-ui
```

```js
import App from './App.vue'
import Maple from '@nio-pow/maple-ui'
import { createApp } from 'vue'
import '@nio-pow/maple-ui/es/style'

createApp(App).use(Maple).mount('#app')
```

### Official Ecosystem

The following projects are maintained by the official team for a long time.

| Name | Description |
|------------------------------------------------------------------------------------------------------|--------------------------------------|
| [@nio-pow/maple-cli](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-cli) | `Vue3 component library rapid prototyping tool` |
| [@nio-pow/maple-touch-emulator](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-touch-emulator) | `Desktop adapter, so that the mobile component library can run on the desktop` |
| [@nio-pow/maple-ui-playground](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-ui-playground) | `Maple component library online editing tool` |
| [@nio-pow/maple-import-resolver](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-import-resolver)  | `A resolver for` [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) ` used to implement Maple and import it on demand`   |
| [@nio-pow/maple-preset-unocss](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-unocss)  | [UnoCss](https://unocss.dev/) `presets for maple` |
| [@nio-pow/maple-preset-tailwindcss](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-tailwindcss)  | [tailwindcss](https://tailwindcss.com/) `presets for maple` |
| [maple-theme-builder](https://github.com/maplejs/maple-theme-builder) | `Theme generator for generating theme variables for maple Material Design 3` | 
| [maple-vscode-extension](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-vscode-extension) | `Maple Component Library VSCode Plugin` |
| [vscode-theme-maple](https://github.com/maplejs/vscode-theme-maple)  | `Maple VSCode Theme`   |
| [maple-app-example](https://github.com/maplejs/maple-app-template)  | `Maple component library app template`   |
| [maple-install-example](https://github.com/maplejs/maple-install-example)  | `Case collection of Maple component library and various ecosystem integration` |

### Community Ecosystem

The following projects are maintained by community personnel, welcome to add.

| Name | Description |
|----------------------------------------------------------------|-----------------------------------------|
| [vue-h5-template](https://github.com/sunniejs/vue-h5-template) | `Vue-based mobile template scaffolding, providing mobile presets for Maple component library` |
| [create-vite-app](https://github.com/ErKeLost/create-vite-app) | `A desktop template scaffolding based on Vue3, providing desktop presets for Maple component library` |
| [vscode-common-intellisense](https://github.com/Simon-He95/vscode-common-intellisense) | `A VS Code extension that provides better intellisense to Maple developers` |
| [vue3-maple-mobile](https://github.com/vue-zone/vue3-maple-mobile) | `A mobile template based on Vue 3 and Maple Component Library` |

### Playground

See [Maple UI Playground](https://maplejs.org/playground).

### Contribution

See [Contributing Guide](https://github.com/maplejs/varmaplelet/blob/dev/.github/CONTRIBUTING.md).

### Community

We recommend that [issue](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/issues) be used for problem feedback, or others:

* Wechat group 

<img style="width: 25%" src="https://cdn.jsdelivr.net/gh/varletjs/maple-static/community.png" />

* Join the [Discord](https://discord.gg/Dmb8ydBHkw)

### Thanks to contributors

<a href="https://github.com/varletjs/varlet/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=varletjs/varlet" />
</a>

### Thanks to the following sponsors

<a href="https://cdn.jsdelivr.net/gh/varletjs/maple-static/sponsorkit/sponsors.svg">
  <img src="https://cdn.jsdelivr.net/gh/varletjs/maple-static/sponsorkit/sponsors.svg">
</a>

#### Wechat / Alipay

<img style="width: 25%" src="https://cdn.jsdelivr.net/gh/varletjs/maple-static/wechat.jpg" />
<img style="width: 25%" src="https://cdn.jsdelivr.net/gh/varletjs/maple-static/alipay.jpg" />
