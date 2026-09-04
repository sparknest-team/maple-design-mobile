# 图片

### 介绍

组件提供了更方便的尺寸，填充模式，圆角的设置方式，水波效果增强图片点击交互体验。
支持 `懒加载`、 `loading 图片`、 `error 图片`、应用 `Lazy` 指令的默认设置。

### 基本使用

```html
<template>
  <mp-image src="https://maplejs.org/cat.jpg" />
</template>
```

### 填充模式

```html
<template>
  <mp-space :size="[20, 20]">
    <mp-image width="85px" height="85px" src="https://maplejs.org/cat.jpg" />

    <mp-image width="85px" height="85px" object-fit="cover" src="https://maplejs.org/cat.jpg" />

    <mp-image width="85px" height="85px" object-fit="none" src="https://maplejs.org/cat.jpg" />

    <mp-image width="85px" height="85px" object-fit="contain" src="https://maplejs.org/cat.jpg" />

    <mp-image width="85px" height="85px" object-fit="scale-down" src="https://maplejs.org/cat.jpg" />
  </mp-space>
</template>
```

### 设置圆角

```html
<template>
  <mp-space :size="[20, 20]">
    <mp-image width="85px" height="85px" object-fit="cover" :radius="10" src="https://maplejs.org/cat.jpg" />

    <mp-image width="85px" height="85px" object-fit="cover" radius="50%" src="https://maplejs.org/cat.jpg" />
  </mp-space>
</template>
```

### 开启水波

```html
<template>
  <mp-image width="85px" height="85px" ripple src="https://maplejs.org/cat.jpg" />
</template>
```

### 开启懒加载

```html
<template>
  <mp-image width="85px" height="85px" lazy src="https://maplejs.org/cat.jpg" />
</template>
```

### 设置懒加载状态图片

```html
<!-- playground-ignore -->
<template>
  <mp-image
    lazy
    width="85px"
    height="85px"
    show-loader="https://xxx.xxx/loading.png"
    fallback-src="https://xxx.xxx/error.png"
    src="https://maplejs.org/cat.jpg"
  />
</template>
```

### 加载失败插槽

```html
<template>
  <mp-image width="22.666vw" height="22.666vw" src="https://maplejs.org/ca.jpg">
    <template #error>
      <svg viewBox="0 0 24 24" style="width: 100%; height: 100%;">
        <path
          fill="currentColor"
          d="M21,5V11.59L18,8.58L14,12.59L10,8.59L6,12.59L3,9.58V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5M18,11.42L21,14.43V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V12.42L6,15.41L10,11.41L14,15.41"
        ></path>
      </svg>
    </template>
  </mp-image>
</template>
```

### 预览相关

`preview`、`preview-src`、`v-model:preview-open`、`preview-props` 等预览能力见下方 ImagePreview API。也可使用 `Image.Preview` / `Image.PreviewGroup` / `Image.preview()`。

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

## API

### 属性

| 参数                   | 说明                                                                                                                                | 类型                             | 默认值    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | --------- |
| `src`                  | 图片地址                                                                                                                            | _string_                         | `-`       |
| `object-fit`           | 填充模式, 可选值为 `fill contain cover none scale-down`                                                                             | _string_                         | `fill`    |
| `object-position`      | 图片内容位置，等同 CSS `object-position`                                                                                            | _string_                         | `50% 50%` |
| `alt`                  | 替代文本                                                                                                                            | _string_                         | `-`       |
| `title`                | 图片描述，透传给 `img` 的 `title` 属性                                                                                              | _string_                         | `-`       |
| `description`          | 图片描述，`alt` 未设置时作为替代文本，也用于默认错误状态                                                                            | _string_                         | `-`       |
| `hide-footer`          | 是否隐藏底部内容；设为 `never` 时错误状态仍显示                                                                                     | _boolean \| 'never'_             | `false`   |
| `footer-position`      | 底部内容位置，可选 `inner` `outer`                                                                                                  | _string_                         | `inner`   |
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
| `v-model:preview-open` | 受控预览状态                                                                                                                        | _boolean_                        | `-`       |
| `default-preview-open` | 默认预览打开状态                                                                                                                    | _boolean_                        | `false`   |
| `preview-props`        | 透传给 `ImagePreview` 的配置                                                                                                        | _object_                         | `-`       |
| `popup-container`      | 预览挂载位置，设为 `false` 时禁用 Teleport                                                                                          | _string \| HTMLElement \| false_ | `body`    |

### 事件

| 事件名                | 说明                                                                               | 参数            |
| --------------------- | ---------------------------------------------------------------------------------- | --------------- |
| `click`               | 点击图片时触发                                                                     | `event: Event`  |
| `load`                | 图片成功加载时触发(懒加载模式下失败时会多次尝试加载图片，只会在成功加载时触发)     | `event: Event`  |
| `error`               | 图片失败加载时触发(懒加载模式下失败时会多次尝试加载图片，只会在尝试次数结束时触发) | `event: Event`  |
| `preview-open-change` | 预览打开/关闭时触发                                                                | `open: boolean` |
| `update:preview-open` | `preview-open` 模型更新                                                            | `open: boolean` |

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

| 参数                    | 说明                     | 类型                             | 默认值  |
| ----------------------- | ------------------------ | -------------------------------- | ------- |
| `v-model:open`          | 是否显示                 | _boolean_                        | `false` |
| `default-open`          | 非受控模式的默认打开状态 | _boolean_                        | `false` |
| `src`                   | 单图预览地址             | _string_                         | `-`     |
| `scale-step`            | 每次缩放增量             | _number_                         | `0.5`   |
| `closable`              | 是否显示关闭按钮         | _boolean_                        | `true`  |
| `mask-closable`         | 点击遮罩是否关闭预览     | _boolean_                        | `true`  |
| `lock-scroll`           | 锁定滚动                 | _boolean_                        | `true`  |
| `esc-to-close`          | 是否支持键盘 ESC 关闭    | _boolean_                        | `true`  |
| `popup-container`       | 弹出层挂载的位置         | _string \| HTMLElement \| false_ | `body`  |
| `image-prevent-default` | 是否禁止图片默认行为     | _boolean_                        | `false` |

### ImagePreviewGroup 属性

| 参数              | 说明                                    | 类型                             | 默认值  |
| ----------------- | --------------------------------------- | -------------------------------- | ------- |
| `images`          | 图片 URL 列表（设置后不再收集子 Image） | _string[]_                       | `[]`    |
| `v-model:open`    | 是否打开预览                            | _boolean_                        | `false` |
| `default-open`    | 非受控默认打开状态                      | _boolean_                        | `false` |
| `v-model:current` | 当前图片索引                            | _number_                         | `-`     |
| `default-current` | 非受控模式的默认图片索引                | _number_                         | `0`     |
| `loop`            | 是否循环切换                            | _boolean_                        | `false` |
| `closable`        | 是否显示关闭按钮                        | _boolean_                        | `true`  |
| `mask-closable`   | 点击遮罩是否关闭                        | _boolean_                        | `true`  |
| `esc-to-close`    | 是否支持键盘 ESC 关闭                   | _boolean_                        | `true`  |
| `popup-container` | 弹出层挂载位置                          | _string \| HTMLElement \| false_ | `body`  |

### 事件

| 事件名         | 说明                                     | 回调参数                 |
| -------------- | ---------------------------------------- | ------------------------ |
| `change`       | 切换图片时的回调函数，回调参数为当前索引 | `index: number` 图片索引 |
| `open`         | 打开 image-preview 时触发                | `-`                      |
| `opened`       | 打开 image-preview 动画结束时触发        | `-`                      |
| `open-change`  | 打开状态变化时触发                       | `open: boolean`          |
| `close`        | 关闭 image-preview 时触发                | `-`                      |
| `closed`       | 关闭 image-preview 动画结束时触发        | `-`                      |
| `long-press`   | 长按图片时的回调函数，回调参数为当前索引 | `index: number` 图片索引 |
| `key-escape`   | 点击键盘 ESC 时触发                      | `-`                      |

### 方法

| 方法名                             | 说明               | 参数                                         | 返回值 |
| ---------------------------------- | ------------------ | -------------------------------------------- | ------ |
| `imagePreview`                     | 显示 image-preview | _options \| string \| string[]_              | `-`    |
| `imagePreview.close`               | 关闭 image-preview | _-_                                          | `-`    |
| `imagePreview.setDefaultOptions`   | 设置默认的选项配置 | _options_                                    | `-`    |
| `imagePreview.resetDefaultOptions` | 重置默认的选项配置 | _-_                                          | `-`    |
| `prev` / `next`                    | 切换图片           | `-`                                          | `-`    |
| `to`                               | 跳转到指定下标     | `index: number`                              | `-`    |
| `zoomTo`                           | 设置缩放比例       | `scale: number`                              | `-`    |
| `zoomIn` / `zoomOut`               | 放大或缩小         | `-`                                          | `-`    |
| `rotateLeft` / `rotateRight`       | 旋转图片           | `-`                                          | `-`    |
| `reset` / `toggleFullscreen`       | 重置或切换全屏     | `-`                                          | `-`    |

### 插槽

| 插槽名       | 说明             | 参数                                                    |
| ------------ | ---------------- | ------------------------------------------------------- |
| `indicator`  | 分页指示器       | `index: number` 图片索引 <br> `length: number` 图片总数 |
| `close-icon` | 关闭按钮         | `-`                                                     |
| `extra`      | 额外插槽         | `-`                                                     |
| `actions`    | 自定义预览操作区 | `-`                                                     |

### ImagePreview Options

| 参数                  | 说明                                      | 类型                      | 默认值  |
| --------------------- | ----------------------------------------- | ------------------------- | ------- |
| `images`              | 需要预览的图片 URL 数组或者单个图片的 URL | _string[] \| string_      | `[]`    |
| `current`             | 图片预览起始的索引                        | _number_                  | `0`     |
| `scaleStep`           | 每次缩放增量                              | _number_                  | `0.5`   |
| `closable`            | 是否显示关闭按钮                          | _boolean_                 | `true`  |
| `escToClose`          | 是否支持键盘 ESC 关闭图片预览             | _boolean_                 | `true`  |
| `loop`                | 是否开启循环播放                          | _boolean_                 | `false` |
| `lockScroll`          | 锁定滚动                                  | _boolean_                 | `true`  |
| `imagePreventDefault` | 是否禁止图片默认行为                      | _boolean_                 | `false` |
| `onChange`            | 切换图片时的回调函数，回调参数为当前索引  | _(index: number) => void_ | `-`     |
| `onOpen`              | image-preview 开启时候的回调              | _() => void_              | `-`     |
| `onOpened`            | image-preview 动画结束时候的回调          | _() => void_              | `-`     |
| `onClose`             | image-preview 时关闭时候的回调            | _() => void_              | `-`     |
| `onClosed`            | image-preview 关闭动画结束时候的回调      | _() => void_              | `-`     |
| `onLongPress`         | 长按图片时的回调函数，回调参数为当前索引  | _(index: number) => void_ | `-`     |
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
