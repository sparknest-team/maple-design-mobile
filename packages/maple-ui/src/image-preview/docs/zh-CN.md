# 图片预览

### 介绍

图片放大预览，支持双击倍数放大，支持 `previewImage` 函数调用和 `ImagePreview` 组件调用两种方式。

## 函数调用

### 基本使用

```html
<script setup>
import { previewImage } from '@maplejs/maple-ui'

function preview() {
  previewImage('https://maplejs.org/cat.jpg')
}
</script>

<template>
  <mp-button type="primary" block @click="preview">基本使用</mp-button>
</template>
```

### 处理回调函数

```html
<script setup>
import { previewImage, Message } from '@maplejs/maple-ui'

function preview() {
  previewImage({
    images: [
      'https://maplejs.org/cat.jpg',
      'https://maplejs.org/cat2.jpg'
    ],
    onChange(index) {
      Message(String(index))
    }
  })
}
</script>

<template>
  <mp-button type="primary" block @click="preview">处理回调函数</mp-button>
</template>
```


## 组件调用

### 预览组

#### 包裹 Image 列表

```html
<template>
  <mp-image-preview-group>
    <mp-space :size="[12, 12]">
      <mp-image width="85px" height="85px" fit="cover" src="https://maplejs.org/cat.jpg" />
      <mp-image width="85px" height="85px" fit="cover" src="https://maplejs.org/cat2.jpg" />
    </mp-space>
  </mp-image-preview-group>
</template>
```

#### 数据驱动

```html
<script setup>
import { ref } from 'vue'

const open = ref(false)
const current = ref(0)
const images = ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg']
</script>

<template>
  <mp-button type="primary" block @click="open = true">打开预览</mp-button>
  <mp-image-preview-group
    v-model:open="open"
    v-model:current="current"
    :images="images"
  />
</template>
```

### 基本使用

```html
<script setup>
import { ref } from 'vue'

const open = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
</script>

<template>
  <mp-button
    type="warning"
    block
    @click="open = true"
  >
    基本使用
  </mp-button>
  <mp-image-preview :images="images" v-model:open="open" />
</template>
```

### 单图 src

```html
<mp-image-preview v-model:open="open" src="https://maplejs.org/cat.jpg" />
```

### 指定初始位置

```html
<script setup>
import { ref } from 'vue'

const open = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
</script>

<template>
  <mp-button
    type="warning"
    block
    @click="open = true"
  >
    指定初始位置
  </mp-button>
  <mp-image-preview
    :current="1"
    :images="images"
    v-model:open="open"
  />
</template>
```

### 展示关闭按钮

```html
<script setup>
import { ref } from 'vue'

const open = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
</script>

<template>
  <mp-button
    type="warning"
    block
    @click="open = true"
  >
    展示关闭按钮
  </mp-button>
  <mp-image-preview
    closable
    :images="images"
    v-model:open="open"
  />
</template>
```

### 监听关闭事件

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const open = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
</script>

<template>
  <mp-button
    block
    type="warning"
    @click="open = true"
  >
    监听关闭事件
  </mp-button>
  <mp-image-preview
    :images="images"
    v-model:open="open"
    @close="Message('触发了关闭事件。')"
  />
</template>
```

### 监听长按事件

通过 `image-prevent-default` 属性禁止图片默认行为，可自定义 `long-press` 事件来实现长按需求。

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const open = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
</script>

<template>
  <mp-button
    block
    type="warning"
    @click="open = true"
  >
    监听长按事件
  </mp-button>
  <mp-image-preview
    image-prevent-default
    :images="images"
    v-model:open="open"
    @long-press="Message('触发了长按事件')"
  />
</template>
```

### 展示额外插槽

```html
<script setup>
import { ref } from 'vue'

const open = ref(false)
const menuShow = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
const actions = [
  {
    name: '操作',
    icon: 'wrench'
  },
  {
    name: '操作',
    icon: 'wrench'
  }
]
</script>

<template>
  <mp-button
    block
    type="warning" 
    @click="open = true"
  >
    展示额外插槽
  </mp-button>
  <mp-image-preview :images="images" v-model:open="open">
    <template #extra>
      <m-icon-menu
       
        :size="22"
        color="#fff"
        @click="menuShow = true"
      />
      <mp-action-sheet :actions="actions" v-model:open="menuShow" />
    </template>
  </mp-image-preview>
</template>
```

### 关闭循环播放

```html
<mp-image-preview v-model:open="open" :images="images" :loop="false" />
```

### 隐藏指示器

```html
<mp-image-preview v-model:open="open" :images="images" :indicator="false" />
```

### 设置缩放倍数

```html
<mp-image-preview v-model:open="open" :images="images" :zoom="3" />
```

### 自定义指示器 / 关闭按钮

通过 `#indicator`、`#close-icon` 插槽自定义分页与关闭按钮。

## API

### 属性

| 参数         | 说明   | 类型  | 默认值  |
| ------------ | ------------ | ------------------ | ------------ |
| `v-model:open` | 是否显示 | _boolean_ | `false` |
| `images`     | 需要预览的图片 URL 数组 | _string[]_ | `[]` |
| `src` | 单图预览地址 | _string_ | `-` |
| `current` | 当前图片索引 | _number_ | `0` |
| `zoom`       | 双击放大倍数 | _string \| number_ | `2` |
| `closable`  | 是否显示关闭按钮 | _boolean_ | `false` |
| `loop`       | 是否开启循环播放 | _boolean_ | `true` |
| `indicator`  | 是否显示分页 | _boolean_ | `true` |
| `lock-scroll` | 锁定滚动 | _boolean_ | `true` |
| `esc-to-close` | 是否支持键盘 ESC 关闭 | _boolean_ | `true`  |
| `popupContainer`   | 弹出层挂载的位置 | _TeleportProps['to'] \| false_ | `body` |
| `image-prevent-default` | 是否禁止图片默认行为 |  _boolean_ | `false` |

### ImagePreviewGroup 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `images` | 图片 URL 列表（设置后不再收集子 Image） | _string[]_ | `[]` |
| `v-model:open` | 是否打开预览 | _boolean_ | `false` |
| `default-open` | 非受控默认打开状态 | _boolean_ | `false` |
| `v-model:current` | 当前图片索引 | _number_ | `0` |
| `loop` | 是否循环切换 | _boolean_ | `true` |
| `closable` | 是否显示关闭按钮 | _boolean_ | `false` |
| `mask-closable` | 点击遮罩是否关闭 | _boolean_ | `false` |
| `popupContainer` | 弹出层挂载位置 | _string \| Element \| false_ | `-` |

### 事件

| 事件名 | 说明  | 回调参数 |
| ----- | ---- | ----- |
| `change` | 切换图片时的回调函数，回调参数为当前索引 | `index: number` 图片索引 |
| `open`   | 打开 image-preview 时触发 | `-`  |
| `opened` | 打开 image-preview 动画结束时触发 | `-` |
| `open-change` | 打开状态变化时触发 | `open: boolean` |
| `close`  | 关闭 image-preview 时触发 | `-` |
| `closed` | 关闭 image-preview 动画结束时触发 | `-` |
| `long-press` | 长按图片时的回调函数，回调参数为当前索引 | `index: number` 图片索引 | 
| `key-escape` | 点击键盘 ESC 时触发 | `-` |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `previewImage` | 显示 image-preview | _options \| string \| string[]_ | `-` |
| `previewImage.close` | 关闭 image-preview | _-_ | `-` |
| `previewImage.setDefaultOptions` | 设置默认的选项配置 | _options_ | `-` |
| `previewImage.resetDefaultOptions` | 重置默认的选项配置 | _-_ | `-` |
| `prev` | 上一页 | `options?: CarouselToOptions` | `-` |
| `next` | 下一页 | `options?: CarouselToOptions` | `-` |
| `to` | 跳转到指定下标 | `index: number, options?: CarouselToOptions` | `-` |
| `zoom` | 放大或者缩小图片 | `ratio: number` | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `indicator` | 分页指示器 | `index: number` 图片索引 <br> `length: number` 图片总数 |
| `close-icon` | 关闭按钮 | `-` |
| `extra` | 额外插槽 | `-` |

### ImagePreview Options

| 参数   | 说明  |  类型  | 默认值 |
| ------ | ----------- | ------ | -------- |
| `images`     | 需要预览的图片 URL 数组或者单个图片的 URL  | _string[] \| string_ | `[]` |
| `current` | 图片预览起始的索引 | _number_ | `0` |
| `zoom`       | 双击放大倍数  | _string \| number_ | `2` |
| `closable`  | 是否显示关闭按钮 | _boolean_ | `false` |
| `escToClose` | 是否支持键盘 ESC 关闭图片预览 | _boolean_ | `true` |
| `loop`       | 是否开启循环播放 | _boolean_ | `true` |
| `indicator`  | 是否显示分页 | _boolean_ | `true` |
| `lockScroll` | 锁定滚动 | _boolean_ | `true` |
| `imagePreventDefault` | 是否禁止图片默认行为 |  _boolean_ | `false` |
| `onChange`   | 切换图片时的回调函数，回调参数为当前索引 | _(index: number) => void_  |  `-` |
| `onOpen`   | image-preview 开启时候的回调 |  _() => void_ | `-` |
| `onOpened` | image-preview 动画结束时候的回调 |   _() => void_ | `-` |
| `onClose`  | image-preview 时关闭时候的回调 |  _() => void_ |  `-` |
| `onClosed` | image-preview 关闭动画结束时候的回调 |  _() => void_ | `-` |
| `onLongPress` | 长按图片时的回调函数，回调参数为当前索引 | _(index: number) => void_  |  `-` |
| `onKeyEscape` | 点击键盘 ESC 时触发 | _() => void_ | `-` |

### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                           | 默认值   |
|-----------------------------------------------| -------- |
| `--image-preview-swipe-indicators-text-color` | `#ddd`  |
| `--image-preview-swipe-indicators-padding`    | `16px 0` |
| `--image-preview-zoom-container-background`   | `#000`  |
| `--image-preview-close-icon-top`              | `14px` |
| `--image-preview-close-icon-right`            | `14px` |
| `--image-preview-close-icon-size`             | `22px` |
| `--image-preview-close-icon-color`            | `#fff` |
| `--image-preview-extra-top`                   | `14px` |
| `--image-preview-extra-left`                  | `14px` |

