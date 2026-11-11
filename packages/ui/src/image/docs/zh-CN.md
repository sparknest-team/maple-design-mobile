# 图片

## 基础示例

### 基础用法

设置 `src` 即可获得带预览能力的图片组件。

```demo
../example/demos/basic.vue
```

## 图片展示与状态

### 填充模式

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `width` | 图片宽度 | 填充模式、图片说明与附加内容、错误状态 |
| `src` | 图片地址 | 填充模式、图片说明与附加内容、错误状态 |
| `height` | 图片高度 | 填充模式、错误状态、加载状态 |
| `preview-disabled` | 是否禁用点击预览 | 填充模式、加载状态、懒加载与回退 |
| `object-fit` | 填充模式, 可选值为 `fill contain cover none scale-down` | 填充模式、懒加载与回退 |
| `title` | 图片描述，透传给 `img` 的 `title` 属性 | 图片说明与附加内容 |
<!-- demo-config-notes:end -->

通过 `object-fit` 控制图片如何适应容器。

```demo
../example/demos/fit-mode.vue
```

### 图片说明与附加内容

比较图片说明和附加插槽的位置；预览入口、加载和错误回退保持独立。

<details>
<summary>配置说明与使用限制</summary>

#### 标题与描述

通过 `title`、`description` 和 `footer-position` 控制说明文案的展示位置。

#### 底部额外内容

通过 `extra` 插槽在页脚定制额外内容。

</details>

```demo
../example/demos/content-comparison.vue
```

### 错误状态

图片加载失败时展示默认错误态，也可用 `error` 插槽自定义。示例使用损坏的内联图片数据触发解码失败，不发送无效网络请求。

```demo
../example/demos/error.vue
```

### 加载状态

通过 `showLoader` 显示默认加载效果，或通过 `loader` 插槽自定义、模拟渐进加载。

```demo
../example/demos/loader.vue
```

### 懒加载与回退

`lazy` 使用原生 `loading="lazy"`；失败时可用 `fallback-src` 回退。

```demo
../example/demos/lazy.vue
```

## 预览入口与分组

### 禁用预览

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `width` | 图片宽度 | 禁用预览、预览入口与受控、图片预览组 |
| `src` | 图片地址 | 禁用预览、预览入口与受控、图片预览组 |
| `height` | 图片高度 | 预览入口与受控、图片预览组 |
| `object-fit` | 填充模式, 可选值为 `fill contain cover none scale-down` | 预览入口与受控、图片预览组 |
| `preview-disabled` | 是否禁用点击预览 | 禁用预览 |
| `preview-src` | 预览大图地址，默认与 `src` 相同 | 预览入口与受控 |
<!-- demo-config-notes:end -->

设置 `preview-disabled` 后点击图片不会打开预览。

```demo
../example/demos/disable-preview.vue
```

### 预览入口与受控

通过 `preview-src`、`v-model:open` 和 `preview-props` 配置 Image 内嵌预览。

```demo
../example/demos/preview-entry.vue
```

### 单图 Preview

`ImagePreview` 只接收单个 `src`，负责缩放、旋转、拖拽和全屏等变换。

```demo
../example/demos/component-preview.vue
```

### 命令式预览

新的调用替换旧预览时，会清理旧实例并触发其 `onClosed`；与正常关闭一样，每个实例只通知一次，可用于释放 Object URL 等资源。旧句柄不会关闭新预览。若 `onClosed` 内同步打开新预览，保留该新调用，外层调用返回 `undefined`。

命令式 API 对单图和多图返回同一套控制方法。

```demo
../example/demos/imperative-preview.vue
```

### 使用本地路径

在 `.vue` 文件中，`Vue组件` 不会如同原生 img 一样被构建工具自动处理模块请求，所以需要手动导入图片资源。
下面是不同构建工具的使用方式。

#### Vite

推荐使用 [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#asset-url-handling) 进行路径预处理。

```ts
// playground-ignore
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          'mp-image': ['src'],
        },
      },
    }),
  ],
})
```

```html
<!-- playground-ignore -->
<template>
  <mp-image src="../../assets/logo.png" />
</template>
```

或者单独导入

```html
<!-- playground-ignore -->
<script setup>
  import logo from '../../assets/logo.png'
</script>

<template>
  <mp-image :src="logo" />
</template>
```

#### Webpack

```html
<!-- playground-ignore -->
<template>
  <mp-image :src="require('../../assets/logo.png')" />
</template>
```

### 图片预览组

`ImagePreviewGroup` 可以收集子 Image，集合状态只由 Group 管理。

```demo
../example/demos/preview-group.vue
```

### 数据驱动预览组

也可以直接传入 `images`，用按钮打开预览。

```demo
../example/demos/component-preview-group.vue
```

## 预览定制与交互

### 水波与行内

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `width` | 图片宽度 | 水波与行内、点击背景层关闭、错误时仍显示 Footer |
| `src` | 图片地址 | 水波与行内、点击背景层关闭、错误时仍显示 Footer |
| `height` | 图片高度 | 水波与行内、点击背景层关闭、尺寸、圆角与位置 |
| `object-fit` | 填充模式, 可选值为 `fill contain cover none scale-down` | 水波与行内、点击背景层关闭、尺寸、圆角与位置 |
| `preview-disabled` | 是否禁用点击预览 | 水波与行内、错误时仍显示 Footer、尺寸、圆角与位置 |
| `preview-props` | 透传给 `ImagePreview` 的配置 | 点击背景层关闭、指定挂载容器 |
<!-- demo-config-notes:end -->

`ripple` 开启点击水波；`block` 设为 `false` 时作为行内元素排列。

```demo
../example/demos/ripple.vue
```

### 点击背景层关闭

通过 `preview-props.overlayClosable` 控制点击图片外的背景层是否关闭预览。左图开启，右图关闭；点击图片本身均不会关闭预览。

```demo
../example/demos/overlay-closable.vue
```

### 错误时仍显示 Footer

`hide-footer="never"` 可在加载失败时仍展示底部信息。

```demo
../example/demos/hide-footer-never.vue
```

### 自定义预览内容

关闭图标、指示器与操作区均可自定义。

```demo
../example/demos/preview-features.vue
```

### 尺寸、圆角与位置

`width` / `height`、`radius` 和 `object-position` 控制几何与裁切位置。

```demo
../example/demos/presentation.vue
```

### 指定挂载容器

通过 `preview-props.popupContainer` 把预览挂载到指定节点。

```demo
../example/demos/preview-popup-container.vue
```

## 生命周期

### PreviewGroup track lifecycle / 轨道生命周期

```demo
../example/demos/track-lifecycle.vue
```

展示图片，支持说明、加载回退与预览。两端示例分组一致。

单图与预览组未设置 `popup-container` 时均挂载到 body 并覆盖视口；只有显式 `false` 才原地渲染，需要父容器提供定位和尺寸。预览组仅由当前图片的 load/error 结束加载提示，切回已加载的缓存图片不会残留加载图标。

### 预览交互生命周期

```demo
../example/demos/controller-lifecycle.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。预览集合的上一张/下一张、水平键与滑动沿阅读方向工作，值数组不反转。方向切换取消尚未完成的手势并保持当前图片、缩放与旋转；图片本身和放大后的拖拽坐标不自动镜像。图片序号保持 LTR 数值显示。

## 使用说明

### 图片预览组序号

`modelValue/defaultValue` 从 **1** 开始，`1` 表示第 1 张。`open(imageNumber = 1)`、`to(imageNumber)` 接收相同序号，无效或非整数序号会被忽略。`prev()/next()` 在循环边界也回传同一规则的序号。模型事件为 `update:modelValue(imageNumber)`，切换通知为 `change(imageNumber, previousImageNumber)`；外部赋值不补发切换通知。长按通知为 `long-press(imageNumber)`，指示器插槽参数为 `{ imageNumber, length }`。内部数组下标仍从 0 开始。

根节点 `class`、`style` 与 Image 容器样式合并；内部图片样式通过 `img-props.class/style` 设置。预览的 `open-change` 是 Vue 通知事件：每次状态切换只发送一次，`.once` 遵循 Vue 事件语义，返回 Promise 不控制 loading。类型中的 `onOpenChange` 监听器也走同一事件入口。

## API

图片预览组使用 `v-model` 绑定从 1 开始的图片序号，`defaultValue` 提供非受控初始图片序号；面板开关独立使用 `v-model:open` 与 `defaultOpen`。函数式预览配置同步使用 modelValue/defaultValue 和 onUpdate:modelValue。

### Image Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| src | string | - | 缩略图地址 |
| preview-src | string | - | 预览地址，回退到 src |
| fallback-src | string | - | 失败后尝试一次备用地址 |
| width | string \| number | - | 根元素宽度，数字为 px |
| height | string \| number | - | 根元素高度，数字为 px |
| object-fit | ImageFit | fill | 图片填充方式 |
| object-position | string | 50% 50% | 图片内容位置 |
| radius | string \| number | 0 | 根元素圆角 |
| alt | string | - | 图片替代文本，保留空字符串 |
| title | string | - | 图片及页脚标题 |
| description | string | - | 页脚说明及 alt 后备 |
| load-description | string | - | 最后的 alt 后备 |
| hide-footer | boolean \| 'never' | false | 隐藏页脚，或在所有加载状态显示 |
| footer-position | 'inner' \| 'outer' | inner | 页脚位置 |
| footer-class | string \| array \| object | - | 页脚类名 |
| lazy | boolean | false | 浏览器原生懒加载 |
| img-props | ImgHTMLAttributes | - | 缩略图原生属性 |
| previewed-img-props | ImgHTMLAttributes | - | 单图预览的原生图片属性 |
| show-loader | boolean | false | 加载时显示默认指示器 |
| ripple | boolean | false | 启用水波 |
| block | boolean | true | 块级布局 |
| preview-disabled | boolean | false | 禁用预览 |
| open / v-model:open | boolean | - | 单图受控预览状态 |
| default-open | boolean | false | 单图非受控初始状态 |
| preview-props | `Partial<ImagePreviewProps>` | - | 单图预览配置 |
| popup-container | string \| HTMLElement \| false | body | 预览挂载目标 |

### Image Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:open | 预览状态请求 | open: boolean |
| open-change | 预览状态请求 | open: boolean |
| click | 图片激活 | event: Event |
| load | 图片加载成功 | event: Event |
| error | 图片加载失败 | event: Event |

### Image Slots

| 插槽 | 说明 | 作用域 |
| --- | --- | --- |
| extra | 页脚额外内容 | - |
| placeholder | 加载占位，优先于 loader | - |
| loader | 自定义加载指示器 | - |
| error | 错误内容 | - |
| error-icon | 默认错误图标替换内容 | - |
| preview-actions | 单图预览工具栏额外动作 | - |

### 命令式预览

`imagePreview(url | url[] | options)` 返回统一控制句柄，提供 `open / close / prev / next / to / reset / zoomTo / zoomIn / zoomOut / rotateLeft / rotateRight / toggleFullscreen`。

### ImagePreview Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| src | string | - | 预览图片地址 |
| open / v-model:open | boolean | - | 受控预览状态 |
| default-open | boolean | false | 非受控初始状态 |
| interaction | 'auto' \| 'desktop' \| 'touch' | auto | 交互模式 |
| popup-container | string \| HTMLElement \| false | body | 预览挂载目标 |
| lock-scroll | boolean | true | 锁定背景滚动 |
| closable | boolean | true | 显示独立关闭按钮 |
| overlay-closable | boolean | true | 允许点击背景关闭 |
| esc-to-close | boolean | true | 允许 Escape 关闭 |
| image-prevent-default | boolean | false | 阻止图片右键菜单 |
| default-scale | number | 1 | 初始及重置缩放比例 |
| min-scale | number | 0.5 | 缩放下限 |
| max-scale | number | 8 | 缩放上限 |
| scale-step | number | 0.5 | 每次缩放步长 |
| wheel-zoom | boolean | desktop | 滚轮缩放，省略时按交互模式决定 |
| keyboard | boolean | desktop | 启用预览快捷键 |
| draggable | boolean | true | 启用指针手势 |
| keep-drag-offset | boolean | false | 缩放回 1 或更小时保留位移 |
| show-toolbar | boolean | true | 显示工具栏及 actions 插槽 |
| actions-layout | ImagePreviewActionName[] | desktop defaults / touch [] | 工具栏动作顺序 |
| previewed-img-props | ImgHTMLAttributes | - | 预览图片原生属性 |

`images` 未提供或为 `undefined` 时收集可预览的子 Image，并随实际 DOM 顺序变化；子图片地址更新不会改变其身份或顺序。显式提供数组时只使用数组，`[]` 表示空集合；切回 `undefined` 后恢复子图片模式。数组模式下请使用组的 `open` / `to` 方法选择图片，子图片不负责映射数组索引。

索引对外从 1 开始。数据减少时显示索引会限制在有效范围内；子图片重排时保留当前图片身份。受控 `modelValue` 需要调整时会发出更新请求，父级可自行接受或拒绝；无图片时不显示预览内容，既有 open 状态保留，数据再次出现时可能恢复显示。

可预览的图片提供具名按钮语义，支持 Tab、Enter 和 Space；预览关闭时，如果焦点仍在预览内或已回到页面主体，会尝试返回打开预览前的焦点。关闭预览功能或图片加载失败时不提供该入口。显式 `alt=""` 保持为空；可预览的装饰图仍通过独立的预览操作名称提供可访问入口。`alt` 未提供时依次使用 `imgProps.alt`、`description` 和 `loadDescription`。

开启键盘快捷键时，仅顶层预览处理方向键与空格；输入框、可编辑区域和其他交互控件保留自身按键行为。

### ImagePreviewGroup Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| open / v-model:open | boolean | - | 受控预览状态 |
| default-open | boolean | false | 非受控初始状态 |
| interaction | 'auto' \| 'desktop' \| 'touch' | auto | 交互模式 |
| popup-container | string \| HTMLElement \| false | body | 预览挂载目标 |
| lock-scroll | boolean | true | 锁定背景滚动 |
| closable | boolean | true | 显示独立关闭按钮 |
| overlay-closable | boolean | true | 允许点击背景关闭 |
| esc-to-close | boolean | true | 允许 Escape 关闭 |
| image-prevent-default | boolean | false | 阻止图片右键菜单 |
| default-scale | number | 1 | 初始及重置缩放比例 |
| min-scale | number | 0.5 | 缩放下限 |
| max-scale | number | 8 | 缩放上限 |
| scale-step | number | 0.5 | 每次缩放步长 |
| wheel-zoom | boolean | desktop | 滚轮缩放，省略时按交互模式决定 |
| keyboard | boolean | desktop | 启用预览快捷键 |
| draggable | boolean | true | 启用指针手势 |
| keep-drag-offset | boolean | false | 缩放回 1 或更小时保留位移 |
| show-toolbar | boolean | true | 显示工具栏及 actions 插槽 |
| actions-layout | ImagePreviewActionName[] | desktop defaults / touch [] | 工具栏动作顺序 |
| images | string[] | - | 显式图片数组；undefined 收集子项，[] 为空 |
| model-value / v-model | number | - | 受控图片序号，从 1 开始 |
| default-value | number | 1 | 初始图片序号，从 1 开始 |
| loop | boolean | false | 切换时循环 |

### ImagePreviewGroup Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:open | 预览状态请求 | open: boolean |
| open-change | 预览状态请求 | open: boolean |
| update:modelValue | 图片序号更新请求 | imageNumber: number |
| change | 图片序号变更请求 | imageNumber: number, previousImageNumber: number |
| open / opened | 打开动画开始或结束 | - |
| close / closed | 关闭动画开始或结束 | - |
| key-escape | Escape 通知 | - |
| long-press | 长按通知 | imageNumber: number |

### ImagePreviewGroup Methods

| 方法 | 说明 |
| --- | --- |
| open(imageNumber = 1) | 按从 1 开始的序号请求打开 |
| close() | 请求关闭 |
| prev() / next() | 切换上一张或下一张 |
| to(imageNumber) | 切换到从 1 开始的序号 |
| reset() | 重置当前预览变换 |
| zoomTo(scale) | 设置有限缩放值并限制在范围内 |
| zoomIn() / zoomOut() | 按 scale-step 调整缩放 |
| rotateLeft() / rotateRight() | 旋转 90 度 |
| toggleFullscreen() | 切换浏览器全屏，返回浏览器 Promise；不支持时返回 undefined |

### ImagePreviewGroup Slots

| 插槽 | 说明 | 作用域 |
| --- | --- | --- |
| default | 子图片 | - |
| close-icon | 独立关闭按钮图标 | - |
| indicator | 图片数量指示 | { imageNumber, length } |
| extra | 额外预览内容 | { url } |
| actions | 工具栏额外动作 | { url } |

### ImagePreview Options

| 参数                  | 说明                                      | 类型                      | 默认值  |
| --------------------- | ----------------------------------------- | ------------------------- | ------- |
| `images`              | 需要预览的图片 URL 数组或者单个图片的 URL | _string[] \| string_      | `[]`    |
| `model-value`             | 图片预览起始序号（从 1 开始）                        | _number_                  | `1`     |
| `scaleStep`           | 每次缩放增量                              | _number_                  | `0.5`   |
| `closable`            | 是否显示关闭按钮                          | _boolean_                 | `true`  |
| `escToClose`          | 是否支持键盘 ESC 关闭图片预览             | _boolean_                 | `true`  |
| `loop`                | 是否开启循环播放                          | _boolean_                 | `false` |
| `lockScroll`          | 锁定滚动                                  | _boolean_                 | `true`  |
| `imagePreventDefault` | 是否禁止图片默认行为                      | _boolean_                 | `false` |
| `onChange`            | 切换图片时的回调函数，回调参数为当前图片序号（从 1 开始）  | _(imageNumber: number, previousImageNumber: number) => void_ | `-`     |
| `onOpen`              | image-preview 开启时候的回调              | _() => void_              | `-`     |
| `onOpened`            | image-preview 动画结束时候的回调          | _() => void_              | `-`     |
| `onClose`             | image-preview 时关闭时候的回调            | _() => void_              | `-`     |
| `onClosed`            | image-preview 关闭动画结束时候的回调      | _() => void_              | `-`     |
| `onLongPress`         | 长按图片时的回调函数，回调参数为当前图片序号（从 1 开始）  | _(imageNumber: number) => void_ | `-`     |
| `onKeyEscape`         | 点击键盘 ESC 时触发                       | _() => void_              | `-`     |

### ImagePreview Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:open | 预览状态请求 | open: boolean |
| open-change | 预览状态请求 | open: boolean |
| open / opened | 打开动画开始或结束 | - |
| close / closed | 关闭动画开始或结束 | - |
| key-escape | Escape 通知 | - |
| long-press | 长按通知 | - |
| prev / next | 切换请求 | - |

### ImagePreview Slots

| 插槽 | 说明 | 作用域 |
| --- | --- | --- |
| image | 自定义预览图内容 | { src, scale, rotate, translateX, translateY, moving, previewedImgProps } |
| actions | 工具栏额外动作 | - |
| close-icon | 独立关闭按钮图标 | - |
| overlay | 预览覆盖内容 | - |
| extra | 额外预览内容 | - |

### ImagePreview Methods

| 方法 | 说明 |
| --- | --- |
| open() | 请求打开 |
| close() | 请求关闭 |
| reset() | 重置缩放、旋转和位移 |
| zoomTo(scale) | 设置有限缩放值并限制在范围内 |
| zoomIn() / zoomOut() | 按 scale-step 调整缩放 |
| rotateLeft() / rotateRight() | 旋转 90 度 |
| toggleFullscreen() | 切换浏览器全屏，返回浏览器 Promise；不支持时返回 undefined |

`Image.showPreview()` 请求打开当前可预览图片；服务 `imagePreview`、`previewImage` 和 `ImagePreviewFn` 接受 URL、URL 数组或配置对象，返回 `ImagePreviewHandle | undefined`（例如 SSR）。返回的 handle 提供 Group 的 12 项能力，单图中不适用的翻页调用无效果。服务还提供 `close()`、`setDefaultOptions()` 和 `resetDefaultOptions()`。原生 `lazy` 由浏览器调度，不承诺自动重试。

缩放参数必须为有限正数；无效的 min/max/default/step 分别回退 0.5/8/1/0.5，若 max 小于 min 则按 min 处理。初始与重置缩放限制在区间内；边界变化会夹紧当前值，`zoomTo` 忽略非有限值。`actionsLayout` 中的 `close` 是工具栏关闭动作，与 `closable` 控制的独立关闭按钮分别配置。

### Image Methods

| 方法 | 说明 |
| --- | --- |
| showPreview() | 请求预览当前图片；不可预览时无操作 |

### ImagePreviewAction Slots

| 插槽 | 说明 | 作用域 |
| --- | --- | --- |
| default | 动作按钮内容 | - |

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-image-preview-arrow-background` | `rgb(38 38 0.41304348%)` | `background-color` |
| `--mp-image-preview-arrow-background-hover` | `rgb(56 56 0.58333333%)` | `background-color` |
| `--mp-image-preview-arrow-color` | `#fff` | `color` |
| `--mp-image-preview-close-icon-right` | `14px` | `inset-inline-end` |
| `--mp-image-preview-close-icon-top` | `14px` | `top` |
| `--mp-image-preview-swipe-indicators-padding` | `16px 0` | `padding` |
| `--mp-image-preview-swipe-indicators-text-color` | `#ddd` | `color` |
| `--mp-image-preview-zoom-container-background` | `#000` | `background-color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-image-preview-arrow-background: rgb(38 38 0.41304348%);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
