<!-- Source: src/watermark/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/watermark -->

# 水印

给页面或局部区域添加文字、图片水印。组件会自动响应属性和主题变化，无需手动刷新。

## 案例

### 文字水印

局部示例提供深色底、显示开关及合成文字输入；显式font.color在深色底用白色0.4透明度、浅色底用黑色0.25透明度。改变文字/颜色会重新生成PNG；水印层pointer-events:none，内容按钮支持点击和Enter。隐藏卸载该实例，恢复后只保留一层并保留示例计数。这是局部显式配色与清理验收，不代表默认主题Token、全站暗色或防篡改已验收，不提供正文文字对比度合规保证。

Example source: src/watermark/example/demos/text-watermark.vue

```vue
<script setup>
import { ref } from 'vue'

const dark = ref(false)
const shown = ref(true)
const content = ref('LOCAL DEMO 200')
const clicks = ref(0)
</script>

<template>
  <section class="watermark-contrast-demo">
    <mp-checkbox v-model="dark" presentation="inline">Dark surface / 深色底</mp-checkbox>
    <mp-checkbox v-model="shown" presentation="inline">Show watermark / 显示水印</mp-checkbox>
    <label>Watermark text / 水印文字<mp-input v-model="content" presentation="inline" /></label>
    <mp-watermark
      v-if="shown"
      :content="content"
      :font="{ color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)' }"
      :style="{ background: dark ? '#1f2937' : '#ffffff', color: dark ? '#ffffff' : '#111827' }"
    >
      <div class="watermark-contrast-surface">
        <p>Local synthetic content / 本地合成内容</p>
        <mp-button html-type="button" @click="clicks++">Click through / 点击内容</mp-button>
      </div>
    </mp-watermark>
    <p role="status">Visible: {{ shown }} · Dark: {{ dark }} · Clicks: {{ clicks }}</p>
  </section>
</template>
<style scoped>
.watermark-contrast-surface {
  min-height: 240px;
  display: grid;
  place-content: center;
  gap: 12px;
}
</style>
```

### 多行文本

Example source: src/watermark/example/demos/multiline.vue

```vue
<template>
  <mp-watermark :content="['Maple Design', 'Confidential']">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

### 自定义间距

Example source: src/watermark/example/demos/custom-gap.vue

```vue
<template>
  <mp-watermark content="Maple" :gap="[40, 40]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

### 自定义偏移量

Example source: src/watermark/example/demos/custom-offset.vue

```vue
<template>
  <mp-watermark content="Maple" :offset="[20, 20]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

### 自定义旋转角度

Example source: src/watermark/example/demos/custom-rotate.vue

```vue
<template>
  <mp-watermark content="Maple" :rotate="22" :offset="[0, 20]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

### 图片水印

图片示例只使用合成SVG data URL。“本地图片失败”切换为故意无效的data URL，原生Image错误通知source=image，并回退红色FALLBACK 201文字。聚焦“恢复图片”按Enter后恢复原图，错误历史保留但不追加、覆盖层仍一层；恢复按钮再次禁用。这不是外部网络、CORS、Canvas故障或图片加载竞争验收。

Example source: src/watermark/example/demos/image-watermark.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const failed = ref(false)
const errors = ref([])
const localImage =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="48"><rect width="160" height="48" rx="8" fill="#0284c7"/><circle cx="80" cy="24" r="14" fill="white"/></svg>',
  )
const image = computed(() => (failed.value ? 'data:image/png;base64,invalid-local-image' : localImage))
</script>
<template>
  <section class="watermark-image-failure-demo">
    <mp-checkbox v-model="failed" presentation="inline">Fail local image / 本地图片失败</mp-checkbox>
    <mp-button html-type="button" :disabled="!failed" @click="failed = false">Restore image / 恢复图片</mp-button>
    <mp-watermark
      content="FALLBACK 201"
      :image="image"
      :width="160"
      :height="48"
      :font="{ color: '#be123c' }"
      style="background: white"
      @error="errors.push($event.source)"
    >
      <div style="height: 240px" />
    </mp-watermark>
    <p role="status">Mode: {{ failed ? 'failure' : 'image' }} · Errors: {{ errors.join(',') || '-' }}</p>
  </section>
</template>
```

### 全屏

全屏水印层固定覆盖视口且不拦截指针操作；退出后回到原局部容器，默认插槽内容不搬走。反复开启/退出不应累积全屏层，卸载移除该实例的层。两端各自维护实例；基本开关记录不等于图片失败、主题与防篡改组合均已浏览器验收。

Example source: src/watermark/example/demos/fullscreen.vue

```vue
<script setup>
import { ref } from 'vue'

const fullscreen = ref(false)
const toggle = () => {
  fullscreen.value = !fullscreen.value
}
</script>

<template>
  <mp-watermark content="Maple UI" :fullscreen="fullscreen" :z-index="99" :offset="[10, 10]">
    <div class="watermark-wrapper">
      <mp-button status="primary" @click="toggle">切换</mp-button>
    </div>
  </mp-watermark>
</template>

<style scoped>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `content` | 单行或多行文字；图片加载失败时作为回退内容 | `string \| string[]` | `-` |
| `image` | 图片地址，优先于文字 | `string` | `-` |
| `width` | 单块水印宽度，默认按内容测量 | `number` | `-` |
| `height` | 单块水印高度，默认按内容测量 | `number` | `-` |
| `gap` | 水印间距 `[x, y]` | `[number, number]` | `[90, 90]` |
| `offset` | 第一块水印相对容器的偏移，默认是间距的一半 | `[number, number]` | `[gap[0] / 2, gap[1] / 2]` |
| `rotate` | 旋转角度 | `number` | `-22` |
| `font` | 文字样式 | `WatermarkFont` | `-` |
| `z-index` | 水印层级 | `number` | `6` |
| `alpha` | 整体透明度，范围为 `0..1` | `number` | `1` |
| `anti-tamper` | 水印节点被移除或修改后是否恢复 | `boolean` | `true` |
| `grayscale` | 是否灰阶渲染 | `boolean` | `false` |
| `repeat` | 是否重复水印 | `boolean` | `true` |
| `staggered` | 重复时是否错列 | `boolean` | `true` |
| `fullscreen` | 是否固定覆盖整个视口 | `boolean` | `false` |

### WatermarkFont

| 参数 | 类型 | 默认值 |
| --- | --- | --- |
| `color` | `string` | `var(--mp-watermark-content-color)` |
| `fontSize` | `number` | `16` |
| `fontFamily` | `string` | `sans-serif` |
| `fontStyle` | `'normal' \| 'italic' \| 'oblique'` | `normal` |
| `fontWeight` | `string \| number` | `normal` |
| `textAlign` | `CanvasTextAlign` | `center` |
| `lineHeight` | `number` | `fontSize × 1.4` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `error` | 图片加载或 Canvas 渲染失败 | `{ source: 'image' \| 'canvas'; error: unknown }` |

### 方法

| 方法名 | 说明 | 返回值 |
| --- | --- | --- |
| `redraw` | 按当前属性重新生成水印 | `Promise<void>` |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 被水印覆盖的页面内容 |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-watermark-content-color` | `rgba(0, 0, 0, 0.15)` |
