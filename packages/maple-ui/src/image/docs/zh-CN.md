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

## API

图片预览组使用 `v-model` 绑定从 1 开始的图片序号，`defaultValue` 提供非受控初始图片序号；面板开关独立使用 `v-model:open` 与 `defaultOpen`。函数式预览配置同步使用 modelValue/defaultValue 和 onUpdate:modelValue。

### 属性

| 参数                   | 说明                                                                                                                                | 类型                             | 默认值    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | --------- |
| `src`                  | 图片地址                                                                                                                            | _string_                         | `-`       |
| `object-fit`           | 填充模式, 可选值为 `fill contain cover none scale-down`                                                                             | _string_                         | `fill`    |
| `object-position`      | 沿用 CSS object-position，控制图像内容在图片盒内的对齐，默认 50% 50%；不是组件坐标 | _string_                         | `50% 50%` |
| `alt`                  | 替代文本                                                                                                                            | _string_                         | `-`       |
| `title`                | 图片描述，透传给 `img` 的 `title` 属性                                                                                              | _string_                         | `-`       |
| `description`          | 图片描述，`alt` 未设置时作为替代文本，也用于默认错误状态                                                                            | _string_                         | `-`       |
| `hide-footer`          | 是否隐藏底部内容；设为 `never` 时错误状态仍显示                                                                                     | _boolean \| 'never'_             | `false`   |
| `footer-position`      | 说明区位于图片内部 inner 或外部 outer，默认 inner；不是四边浮层方位 | _string_                         | `inner`   |
| `footer-class`         | 底部内容类名                                                                                                                        | _string \| array \| object_      | `-`       |
| `referrer-policy`      | 指示在获取资源时使用的来源地址。该属性需注意浏览器兼容性，参见 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) | _string_                         | `-`       |
| `width`                | 图片宽度                                                                                                                            | _string \| number_               | `-`       |
| `height`               | 图片高度                                                                                                                            | _string \| number_               | `-`       |
| `radius`               | 图片圆角                                                                                                                            | _string \| number_               | `0`       |
| `lazy`                 | 是否开启懒加载                                                                                                                      | _boolean_                        | `false`   |
| `show-loader`          | 当开启懒加载时，加载中显示的图片                                                                                                    | _string_                         | `-`       |
| `fallback-src`         | 当开启懒加载时，加载失败显示的图片                                                                                                  | _string_                         | `-`       |
| `show-loader`          | 是否显示默认加载状态                                                                                                                | _boolean_                        | `false`   |
| `ripple`               | 是否开启水波                                                                                                                        | _boolean_                        | `false`   |
| `block`                | 是否是块级元素                                                                                                                      | _boolean_                        | `true`    |
| `preview-disabled`     | 是否禁用点击预览                                                                                                                    | _boolean_                        | `false`   |
| `preview-src`          | 预览大图地址，默认与 `src` 相同                                                                                                     | _string_                         | `-`       |
| `v-model:open` | 受控预览状态                                                                                                                        | _boolean_                        | `-`       |
| `default-open` | 默认预览打开状态                                                                                                                    | _boolean_                        | `false`   |
| `preview-props`        | 透传给 `ImagePreview` 的配置                                                                                                        | _object_                         | `-`       |
| `popup-container`      | 预览挂载位置，设为 `false` 时禁用 Teleport                                                                                          | _string \| HTMLElement \| false_ | `body`    |

### 事件

| 事件名                | 说明                                                                               | 参数            |
| --------------------- | ---------------------------------------------------------------------------------- | --------------- |
| `click`               | 点击图片时触发                                                                     | `event: Event`  |
| `load`                | 图片成功加载时触发(懒加载模式下失败时会多次尝试加载图片，只会在成功加载时触发)     | `event: Event`  |
| `error`               | 图片失败加载时触发(懒加载模式下失败时会多次尝试加载图片，只会在尝试次数结束时触发) | `event: Event`  |
| `open-change` | 预览打开/关闭时触发                                                                | `open: boolean` |
| `update:open` | `open` 模型更新                                                            | `open: boolean` |

### 插槽

| 插槽名            | 说明                   | 参数 |
| ----------------- | ---------------------- | ---- |
| `error`           | 加载失败插槽           | `-`  |
| `error-icon`      | 自定义默认错误状态图标 | `-`  |
| `loader`          | 自定义加载状态         | `-`  |
| `extra`           | 底部额外内容           | `-`  |
| `preview-actions` | 自定义预览操作内容     | `-`  |

### 命令式预览

`imagePreview(url | url[] | options)` 返回统一控制句柄，提供 `open / close / prev / next / to / reset / zoomTo / zoomIn / zoomOut / rotateLeft / rotateRight / toggleFullscreen`。

## ImagePreview API

### 属性

| 参数                    | 说明                                             | 类型                             | 默认值  |
| ----------------------- | ------------------------------------------------ | -------------------------------- | ------- |
| `v-model:open`          | 是否显示                                         | _boolean_                        | `false` |
| `default-open`          | 非受控模式的默认打开状态                         | _boolean_                        | `false` |
| `src`                   | 单图预览地址                                     | _string_                         | `-`     |
| `scale-step`            | 每次缩放增量                                     | _number_                         | `0.5`   |
| `closable`              | 是否显示关闭按钮                                 | _boolean_                        | `true`  |
| `overlay-closable`      | 点击图片外的背景层是否关闭预览，点击图片不会关闭 | _boolean_                        | `true`  |
| `lock-scroll`           | 锁定滚动                                         | _boolean_                        | `true`  |
| `esc-to-close`          | 是否支持键盘 ESC 关闭                            | _boolean_                        | `true`  |
| `popup-container`       | 弹出层挂载的位置                                 | _string \| HTMLElement \| false_ | `body`  |
| `image-prevent-default` | 是否禁止图片默认行为                             | _boolean_                        | `false` |

### ImagePreviewGroup 属性

| 参数               | 说明                                         | 类型                             | 默认值  |
| ------------------ | -------------------------------------------- | -------------------------------- | ------- |
| `images`           | 图片 URL 列表（设置后不再收集子 Image）      | _string[]_                       | `[]`    |
| `v-model:open`     | 是否打开预览                                 | _boolean_                        | `false` |
| `default-open`     | 非受控默认打开状态                           | _boolean_                        | `false` |
| `v-model`  | 当前图片序号                                 | _number_                         | `-`     |
| `default-value`  | 非受控模式的默认图片序号                     | _number_                         | `1`     |
| `loop`             | 是否循环切换                                 | _boolean_                        | `false` |
| `closable`         | 是否显示关闭按钮                             | _boolean_                        | `true`  |
| `overlay-closable` | 点击图片外的背景层是否关闭，点击图片不会关闭 | _boolean_                        | `true`  |
| `esc-to-close`     | 是否支持键盘 ESC 关闭                        | _boolean_                        | `true`  |
| `popup-container`  | 弹出层挂载位置                               | _string \| HTMLElement \| false_ | `body`  |

### 事件

| 事件名        | 说明                                     | 回调参数                 |
| ------------- | ---------------------------------------- | ------------------------ |
| `change`      | 切换图片时的回调函数，回调参数为当前图片序号（从 1 开始） | `imageNumber: number, previousImageNumber: number` 图片序号 |
| `open`        | 打开 image-preview 时触发                | `-`                      |
| `opened`      | 打开 image-preview 动画结束时触发        | `-`                      |
| `open-change` | 打开状态变化时触发                       | `open: boolean`          |
| `close`       | 关闭 image-preview 时触发                | `-`                      |
| `closed`      | 关闭 image-preview 动画结束时触发        | `-`                      |
| `long-press`  | 长按图片时的回调函数，回调参数为当前图片序号（从 1 开始） | `imageNumber: number` 图片序号 |
| `key-escape`  | 点击键盘 ESC 时触发                      | `-`                      |

### 方法

| 方法名                             | 说明               | 参数                            | 返回值 |
| ---------------------------------- | ------------------ | ------------------------------- | ------ |
| `imagePreview`                     | 显示 image-preview | _options \| string \| string[]_ | `-`    |
| `imagePreview.close`               | 关闭 image-preview | _-_                             | `-`    |
| `imagePreview.setDefaultOptions`   | 设置默认的选项配置 | _options_                       | `-`    |
| `imagePreview.resetDefaultOptions` | 重置默认的选项配置 | _-_                             | `-`    |
| `prev` / `next`                    | 切换图片           | `-`                             | `-`    |
| `to`                               | 跳转到指定图片序号（从 1 开始）     | `imageNumber: number`                 | `-`    |
| `zoomTo`                           | 设置缩放比例       | `scale: number`                 | `-`    |
| `zoomIn` / `zoomOut`               | 放大或缩小         | `-`                             | `-`    |
| `rotateLeft` / `rotateRight`       | 旋转图片           | `-`                             | `-`    |
| `reset` / `toggleFullscreen`       | 重置或切换全屏     | `-`                             | `-`    |

### 插槽

| 插槽名       | 说明             | 参数                                                    |
| ------------ | ---------------- | ------------------------------------------------------- |
| `indicator`  | 分页指示器       | `imageNumber: number` 图片序号 <br> `length: number` 图片总数 |
| `close-icon` | 关闭按钮         | `-`                                                     |
| `extra`      | 额外插槽         | `-`                                                     |
| `actions`    | 自定义预览操作区 | `-`                                                     |

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

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                        | 默认值   |
| --------------------------------------------- | -------- |
| `--image-preview-swipe-indicators-text-color` | `#ddd`   |
| `--image-preview-swipe-indicators-padding`    | `16px 0` |
| `--image-preview-zoom-container-background`   | `#000`   |
| `--image-preview-close-icon-top`              | `14px`   |
| `--image-preview-close-icon-right`            | `14px`   |
| `--image-preview-close-icon-size`             | `22px`   |
| `--image-preview-close-icon-color`            | `#fff`   |
| `--image-preview-extra-top`                   | `14px`   |
| `--image-preview-extra-left`                  | `14px`   |

### 图片预览组序号

`modelValue/defaultValue` 从 **1** 开始，`1` 表示第 1 张。`open(imageNumber = 1)`、`to(imageNumber)` 接收相同序号，无效或非整数序号会被忽略。`prev()/next()` 在循环边界也回传同一规则的序号。模型事件为 `update:modelValue(imageNumber)`，切换通知为 `change(imageNumber, previousImageNumber)`；外部赋值不补发切换通知。长按通知为 `long-press(imageNumber)`，指示器插槽参数为 `{ imageNumber, length }`。内部数组下标仍从 0 开始。

根节点 `class`、`style` 与 Image 容器样式合并；内部图片样式通过 `img-props.class/style` 设置。预览的 `open-change` 是 Vue 通知事件：每次状态切换只发送一次，`.once` 遵循 Vue 事件语义，返回 Promise 不控制 loading。类型中的 `onOpenChange` 监听器也走同一事件入口。
