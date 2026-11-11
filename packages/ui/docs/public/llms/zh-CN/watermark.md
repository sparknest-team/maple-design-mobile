<!-- Source: src/watermark/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/watermark -->

# 水印

给页面或局部区域添加文字、图片水印。组件会自动响应属性和主题变化，无需手动刷新。

## 基础示例

### 文字水印

示例支持切换深浅背景、显示状态和水印文字；font.color 在深色底使用半透明白色，在浅色底使用半透明黑色。修改文字或颜色会重新生成水印。水印不拦截指针操作，内容按钮支持点击和 Enter；隐藏后重新显示只保留一层水印。

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
    <mp-checkbox v-model="dark" edit-mode="direct">Dark surface / 深色底</mp-checkbox>
    <mp-checkbox v-model="shown" edit-mode="direct">Show watermark / 显示水印</mp-checkbox>
    <label>Watermark text / 水印文字<mp-input v-model="content" edit-mode="direct" /></label>
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

## 内容与展示

### 多行文本

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `content` | 单行或多行文字；图片加载失败时作为回退内容 | 多行文本、图片水印、全屏 |
| `image` | 图片地址，优先于文字 | 图片水印 |
| `width` | 单块水印宽度，默认按内容测量 | 图片水印 |
| `height` | 单块水印高度，默认按内容测量 | 图片水印 |
| `font` | 文字样式 | 图片水印 |
| `fullscreen` | 是否固定覆盖整个视口 | 全屏 |
<!-- demo-config-notes:end -->

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

### 图片水印

“本地图片失败”使用无效的 data URL，触发 source=image 错误通知并回退为 FALLBACK 201 文字。按 Enter 激活“恢复图片”后恢复原图，错误记录保留，水印层仍只有一层。

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
    <mp-checkbox v-model="failed" edit-mode="direct">Fail local image / 本地图片失败</mp-checkbox>
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

全屏水印固定覆盖视口，不拦截指针操作；退出后回到局部容器，默认插槽内容保持原位。重复切换不会累积水印层，卸载会移除该实例的水印。

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

## 自定义与插槽

### 水印间距、偏移与旋转

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `content` | 单行或多行文字；图片加载失败时作为回退内容 | 水印间距、偏移与旋转 |
| `gap` | 水印间距 `[x, y]` | 水印间距、偏移与旋转 |
| `offset` | 第一块水印相对容器的偏移，默认是间距的一半 | 水印间距、偏移与旋转 |
| `rotate` | 旋转角度 | 水印间距、偏移与旋转 |
<!-- demo-config-notes:end -->

比较水印重复间距、起始偏移和旋转角度；图片加载与全屏定位保持独立。

Example source: src/watermark/example/demos/geometry-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="custom-gap">
      <h4><span lang="zh-CN">自定义间距</span><span lang="en-US">Custom Gap</span></h4>
      <mp-watermark content="Maple" :gap="[40, 40]">
        <div class="watermark-wrapper"></div>
      </mp-watermark>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="custom-offset">
      <h4><span lang="zh-CN">自定义偏移量</span><span lang="en-US">Custom Offset</span></h4>
      <mp-watermark content="Maple" :offset="[20, 20]">
        <div class="watermark-wrapper"></div>
      </mp-watermark>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="custom-rotate">
      <h4><span lang="zh-CN">自定义旋转角度</span><span lang="en-US">Custom Rotate</span></h4>
      <mp-watermark content="Maple" :rotate="22" :offset="[0, 20]">
        <div class="watermark-wrapper"></div>
      </mp-watermark>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
  .watermark-wrapper {
    width: 100%;
    height: 200px;
  }
}
.demo-comparison-case--2 {
  .watermark-wrapper {
    width: 100%;
    height: 200px;
  }
}
.demo-comparison-case--3 {
  .watermark-wrapper {
    width: 100%;
    height: 200px;
  }
}
</style>
```

## 使用说明

### 尺寸与重绘

- `gap` 和 `offset` 应为包含两个有限数的数组；建议 `gap` 非负。当前负间距仅在计算平铺尺寸时按 0 处理，绘制和背景偏移仍使用原值，因此不要依赖负间距实现重叠。`width`、`height` 和 `font.fontSize`、`font.lineHeight` 应为有限正数；宽高实际至少为 1。`rotate` 应为有限角度，`zIndex` 应为有限数。非法输入不保证自动纠正；`alpha` 的合法范围为有限的 0 到 1。
- `lineHeight` 未指定时为 `Math.round(fontSize * 1.4)`。文字颜色由 Canvas 解析：优先使用 `font.color`，否则使用计算后的颜色变量；应传 Canvas 支持的颜色值，不保证直接解析 CSS 变量表达式。异步字体就绪后不会自动重绘，可调用 `redraw()`。
- 图片加载失败通过 `error` 通知；有文字时尝试回退文字，Canvas 失败也通过 `error` 通知。`redraw()` 返回 Promise，正常情况下内部渲染失败会被处理；较早的异步结果在属性更新或卸载后不会覆盖最新图层或再报告错误，但底层图片请求不会因此取消。`default` 内容不会被绘入水印图片。

## API

### Watermark Props

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

### WatermarkFont Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `error` | 图片加载或 Canvas 渲染失败 | `{ source: 'image' \| 'canvas'; error: unknown }` |

### WatermarkFont Methods

| 方法名 | 说明 | 返回值 |
| --- | --- | --- |
| `redraw` | 按当前属性重新生成水印 | `Promise<void>` |

### WatermarkFont Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 被水印覆盖的页面内容 |

## Types

### WatermarkFont

| 参数 | 类型 | 默认值 |
| --- | --- | --- |
| `color` | `string` | `var(--mp-watermark-content-color)` |
| `fontSize` | `number` | `16` |
| `fontFamily` | `string` | `sans-serif` |
| `fontStyle` | `'normal' \| 'italic' \| 'oblique'` | `normal` |
| `fontWeight` | `string \| number` | `normal` |
| `textAlign` | `CanvasTextAlign`<br>`'center' \| 'end' \| 'left' \| 'right' \| 'start'` | `center` |
| `lineHeight` | `number` | `Math.round(fontSize × 1.4)` |

## CSS Variables

水印颜色取自组件计算后的 CSS 变量；组件及其当前祖先的 `class` 或 `style` 改变导致颜色变化时会自动重绘。通过 CSSOM、媒体查询等无法观察到的变化，以及移动到新祖先后，可调用 `redraw()` 更新。`anti-tamper` 仅恢复受管水印层的移除及 class/style 修改，不能作为安全防护。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-watermark-content-color` | `rgba(0, 0, 0, 0.15)` | 组件样式 |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-watermark-content-color: rgba(0, 0, 0, 0.15);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
