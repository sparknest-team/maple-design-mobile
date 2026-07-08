
<div align="center">
  <a href="https://maplejs.org">
    <img src="https://maplejs.org/logo.svg" width="150">
  </a>
  <h1>MAPLE</h1>
  <p>一个 Vue3 组件库，基于 Maple Design，支持移动端、桌面端。</p>
  <p>
    <a href="https://maplejs.org">文档</a> | 
    <a href="https://github.com/varletjs/varlet/blob/dev/README.md">ENGLISH README</a>
  </p>
  <p>
    <img src="https://img.shields.io/npm/v/@nio-pow/maple-ui?style=flat-square" alt="version">
    <img src="https://img.shields.io/github/stars/varletjs/varlet" alt="stars">
    <img src="https://img.shields.io/badge/vue-v3.2.0%2B-%23407fbc" alt="vue">
    <img src="https://img.shields.io/npm/l/@nio-pow/maple-ui.svg" alt="license">
    <img src="https://img.shields.io/codecov/c/github/varletjs/varlet" alt="coverage">
    <img src="https://github.com/varletjs/varlet/workflows/CI/badge.svg" alt="ci">
  </p>
</div>

---

### 介绍

Maple 是一个 `Vue3` 组件库，基于 Material Design 2 和 3，支持移动端、桌面端，由 `maplejs` 组织维护。

### 特性

- 🚀 &nbsp; 提供 60+ 个高质量通用组件
- 🚀 &nbsp; 组件十分轻量
- 💪 &nbsp; 由国人开发，完善的中英文文档和后勤保障
- 🛠️ &nbsp; 支持按需引入
- 🛠️ &nbsp; 支持主题定制
- 🌍 &nbsp; 支持国际化
- 💡 &nbsp; 支持 webstorm 组件属性高亮
- 💪 &nbsp; 支持 SSR
- 📦 &nbsp; 支持 [Nuxt Module](https://github.com/varletjs/maple-nuxt)
- 💡 &nbsp; 支持 Typescript
- 💪 &nbsp; 确保 90% 以上单元测试覆盖率，提供稳定性保证
- 🎨 &nbsp; 同时支持 Material Design 2 和 Material Design 3 两套设计系统
- 🛠️ &nbsp; 支持暗黑模式
- 🔧 &nbsp; 提供官方的 VSCode 插件
- ⌨️ &nbsp; 支持无障碍访问（持续改进中）

### 安装

### CDN
`maple.js` 包含组件库的所有样式和逻辑，引入即可。

```html
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
 <!-- 桌面端兼容 -->
<script src="https://cdn.jsdelivr.net/npm/@nio-pow/maple-touch-emulator/iife.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@nio-pow/maple-ui/umd/maple.js"></script>
<script>
  const app = Vue.createApp({
    template: '<mp-button>按钮</mp-button>'
  })
  app.use(Maple).mount('#app')
</script>
```

### Webpack / Vite
```shell
# 通过 npm 或 yarn 或 pnpm 安装

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

### 官方生态

以下项目由官方团队长期维护。

| 名称                                                                                                   | 描述                       |
|------------------------------------------------------------------------------------------------------|--------------------------|
| [@nio-pow/maple-cli](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-cli)                       | `Vue3 组件库快速成型工具`         |
| [@nio-pow/maple-touch-emulator](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-touch-emulator) | `桌面端适配器，让移动端组件库可以在桌面端运行` |
| [@nio-pow/maple-ui-playground](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-ui-playground)  | `Maple 组件库在线编辑工具`       |
| [@nio-pow/maple-import-resolver](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-import-resolver)  | [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) `的一个解析器，用于实现 Varlet 按需引入`   |
| [@nio-pow/maple-preset-unocss](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-unocss)  | `maple 的` [UnoCss](https://unocss.dev/) `预设` |
| [@nio-pow/maple-preset-tailwindcss](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-preset-tailwindcss)  | `maple 的` [tailwindcss](https://tailwindcss.com/) `预设` |
| [maple-theme-builder](https://github.com/varletjs/maple-theme-builder) | `主题生成器，用于为 maple design 生成主题变量` | 
| [maple-vscode-extension](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/tree/master/packages/maple-vscode-extension)  | `Maple 组件库 VSCode 插件`   |
| [vscode-theme-varlet](https://github.com/varletjs/vscode-theme-varlet)  | `Maple VSCode 主题`   |
| [maple-app-example](https://github.com/varletjs/maple-app-template)  | `Maple 组件库移动端模板`   |
| [maple-install-example](https://github.com/varletjs/maple-install-example)  | `Maple 组件库与各种生态集成的案例集合`   |

### 社区生态

以下项目由社区人员维护，欢迎补充。

| 名称                                                             | 描述                                        |
|----------------------------------------------------------------|-------------------------------------------|
| [vue-h5-template](https://github.com/sunniejs/vue-h5-template) | `基于 Vue 的移动端模板脚手架，提供了 Maple 组件库的移动端预设`   |
| [create-vite-app](https://github.com/ErKeLost/create-vite-app) | `基于 Vue3 的桌面端模板脚手架，提供了 Maple 组件库的桌面端预设`  |
| [vscode-common-intellisense](https://github.com/Simon-He95/vscode-common-intellisense) | `为 Maple 开发人员提供更好的智能感知的 VSCode 扩展` |
| [vue3-maple-mobile](https://github.com/vue-zone/vue3-maple-mobile) | `基于 Vue 3 和 Maple 组件库的移动模板` |

### 演练场

在 [Maple UI Playground](https://maplejs.org/playground) 对组件进行在线编辑。

### 贡献

请参考 [Contributing Guide](https://github.com/varletjs/varlet/blob/dev/.github/CONTRIBUTING.md)。

### GitCode 仓库
 
详情见 [GitCode 仓库](https://gitcode.com/varletjs/varlet)。

### 反馈和交流

我们推荐使用 [issue](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/issues) 列表进行最直接有效的反馈，也可以下面的方式

* 微信

<img style="width: 25%" src="https://cdn.jsdelivr.net/gh/varletjs/maple-static/community.png" />

* 加入 [Discord](https://discord.gg/Dmb8ydBHkw) 社区交流

### 感谢贡献者们做出的努力

<a href="https://github.com/varletjs/varlet/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=varletjs/varlet" />
</a>

### 感谢以下赞助者

<a href="https://cdn.jsdelivr.net/gh/varletjs/maple-static/sponsorkit/sponsors.svg">
  <img src="https://cdn.jsdelivr.net/gh/varletjs/maple-static/sponsorkit/sponsors.svg">
</a>

### 赞助本项目

赞助本项目，支持我们更好的创作。

#### 微信 / 支付宝

<img style="width: 25%" src="https://cdn.jsdelivr.net/gh/varletjs/maple-static/wechat.jpg" />
<img style="width: 25%" src="https://cdn.jsdelivr.net/gh/varletjs/maple-static/alipay.jpg" />
