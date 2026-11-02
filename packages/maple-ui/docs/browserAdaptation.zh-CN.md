# 浏览器适配

### 浏览器兼容范围与验收

Maple 以移动端为主要兼容目标：iOS Safari、Android Chrome 最新两个稳定版本，以及业务实际使用的 Android System WebView、微信和 App 内嵌 WebView。具体最低 OS/内核版本须以真机验收记录为准，不能仅凭 Android 系统版本或桌面模拟结果判断。

本页的视口单位转换与桌面触摸模拟解决布局/输入方式适配，不代表浏览器兼容性已通过。发布前需要验证真机触摸与滑动、输入法/自动填充、软键盘遮挡、弹层与锁滚、横竖屏和地址栏变化、安全区、文件上传与相机。自动化使用 Chromium/Firefox/WebKit，并单独记录模拟结果；iOS Safari、微信和 App WebView 需要原生验收。

源码仓库根目录使用 `pnpm check:compatibility` 运行自动回归，`pnpm compatibility:native:init` 创建真机验收模板，`pnpm check:compatibility:release` 检查原生证据。最低版本和完整验收规则由同级 design-ui 仓库的 `standards/browser-compatibility.md` 统一维护。证据未完成的环境保持待验收，不声明全部兼容。


### 介绍

组件库提供移动端和桌面端适配方案，
移动端使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 方案进行适配，
桌面端使用 `@maple-design/touch-emulator` 方案进行适配。

### 移动端适配

#### CSS 单位适配

组件库设计基于 `375px` 宽度设计稿，推荐使用 postcss 插件将 `px` 单位转换成 `vmin` 单位从而实现移动端适配。
在 `webpack/vite` 项目根路径下创建 `postcss.config.js` 并做如下配置之后 `375px -> 100vmin`。

```shell
# playground-ignore
# npm
npm i postcss-px-to-viewport -D

# yarn
yarn add postcss-px-to-viewport -D

# pnpm
pnpm add postcss-px-to-viewport -D
```

```js
// playground-ignore
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      unitPrecision: 6,
      unitToConvert: 'px',
      viewportUnit: 'vmin',
      fontViewportUnit: 'vmin',
      propList: ['*'],
    }
  }
}
```

#### 主题包单位适配 (Viewport)

因为主题包是运行时挂载的，不受 postcss 影响，组件库提供了实用工具 `Themes.toViewport` 进行适配，函数返回的主题将默认使用 `375px -> 100vmin` 的规则。

```js
import { Themes } from '@maple-design/ui'

const viewportTheme = Themes.toViewport(Themes.maple.dark)
```

也可以对转换规则进行更改

```js
import { Themes } from '@maple-design/ui'

const viewportTheme = Themes.toViewport(Themes.maple.dark, {
  // 默认值为 375
  viewportWidth: 750,
  // 默认值为 'vmin'
  viewportUnit: 'vw',
  // 默认值为 6
  unitPrecision: 4,
})
```

####  主题包单位适配 (Rem)

与 `Viewport` 方案类似

```js
import { Themes } from '@maple-design/ui'

const remTheme = Themes.toRem(Themes.maple.dark)
```

也支持自定义

```js
import { Themes } from '@maple-design/ui'

const viewportTheme = Themes.toRem(Themes.maple.dark, {
  // 默认值为 16
  rootFontSize: 32,
  // 默认值为 6
  unitPrecision: 4,
})
```

### 桌面端适配

由于组件库交互事件使用 `touch` 事件进行开发，不支持桌面端的 `mouse` 事件，
推荐使用 `@maple-design/touch-emulator` 将 `touch -> mouse` 从而实现桌面端适配。

```shell
# playground-ignore
# npm
npm i @maple-design/touch-emulator
# yarn
yarn add @maple-design/touch-emulator
# pnpm
pnpm add @maple-design/touch-emulator
```

```js
// playground-ignore
import '@maple-design/touch-emulator'
```

## App / WebView 安全区

参见 [SafeArea 安全区与 App 适配](#/zh-CN/safe-area)：四边覆盖、显式 0、嵌套消费、Teleport 宿主、键盘边界与真机验收。
