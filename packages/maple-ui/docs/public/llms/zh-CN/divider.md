<!-- Source: src/divider/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/divider -->

# Divider 分割线

用于分隔列表或布局中的内容区域。

## 案例

### 基础用法

用于分隔相邻的内容区域。

Example source: src/divider/example/demos/basic-usage.vue

```vue
<template>
  <div>
    <p>内容上方 / Before</p>
    <mp-divider />
    <p>内容下方 / After</p>
  </div>
</template>
```

### 间距与缩进

对比五档预设、数值、CSS 长度和非对称数组；竖直示例展示切换方向后的作用。

Example source: src/divider/example/demos/size.vue

```vue
<script setup>
const presets = ['xs', 'sm', 'md', 'lg', 'xl']
</script>

<template>
  <div>
    <div v-for="size in presets" :key="size">
      <code>inset="{{ size }}" spacing="{{ size }}"</code>
      <mp-divider :inset="size" :spacing="size" />
    </div>
    <p>数值 / Number · inset=24, spacing=16</p>
    <mp-divider :inset="24" :spacing="16" />
    <p>CSS 长度 / CSS length · inset=2rem</p>
    <mp-divider inset="2rem" />
    <p>非对称 / Asymmetric · inset=[8, 32], spacing=[12, 24]</p>
    <mp-divider :inset="[8, 32]" :spacing="[12, 24]" />
    <p>竖直 / Vertical · inset=[8, 24], spacing=[12, 20]</p>
    <div class="vertical-preview">
      <span>Before</span>
      <mp-divider orientation="vertical" :inset="[8, 24]" :spacing="[12, 20]" />
      <span>After</span>
    </div>
  </div>
</template>

<style scoped>
.vertical-preview {
  display: flex;
  align-items: center;
  height: 96px;
}
</style>
```

### 线型

通过 `type` 对比实线、虚线、点线和双线；双线建议设置至少 3px 的 `thickness`。

Example source: src/divider/example/demos/type.vue

```vue
<template>
  <div>
    <p>实线 / solid</p>
    <mp-divider />
    <p>虚线 / dashed</p>
    <mp-divider type="dashed" />
    <p>点线 / dotted</p>
    <mp-divider type="dotted" />
    <p>双线 / double · 3px</p>
    <mp-divider type="double" :thickness="3" />
  </div>
</template>
```

### 带文字

通过 `description` 添加文字，`text-align` 控制起点、居中和终点位置。切换 RTL 可观察逻辑起止方向。

Example source: src/divider/example/demos/with-desc.vue

```vue
<script setup>
import { ref } from 'vue'

const rtl = ref(false)
</script>

<template>
  <div>
    <mp-checkbox v-model="rtl">RTL</mp-checkbox>
    <div :dir="rtl ? 'rtl' : 'ltr'">
      <mp-divider text-align="start" description="起点 / Start" />
      <mp-divider description="居中 / Center" />
      <mp-divider text-align="end" description="终点 / End" />
    </div>
  </div>
</template>
```

### 自定义内容

默认插槽优先于 `description`，自定义内容的留白由调用方设置。

Example source: src/divider/example/demos/custom.vue

```vue
<template>
  <mp-divider type="dashed" description="默认插槽优先 / Slot takes priority">
    <span class="divider-label">★ 自定义内容 / Custom content</span>
  </mp-divider>
</template>

<style scoped>
.divider-label {
  padding-inline: 8px;
}
</style>
```

### 颜色、线宽与透明度

通过 `color`、`thickness`、`opacity` 定制线条。`opacity=0` 保留布局；`hairline` 优先于 `thickness`。

Example source: src/divider/example/demos/color.vue

```vue
<template>
  <div>
    <p>主题色 / Theme color</p>
    <mp-divider color="var(--mp-sys-color-action-primary)" />
    <p>线宽 / Thickness · 3px</p>
    <mp-divider :thickness="3" />
    <p>半透明 / Half opacity · 0.5</p>
    <mp-divider :thickness="3" :opacity="0.5" />
    <p>隐藏线条，保留间距 / Zero opacity preserves spacing</p>
    <mp-divider :opacity="0" />
    <p>细线优先 / Hairline overrides thickness</p>
    <mp-divider hairline :thickness="4" />
  </div>
</template>
```

### 垂直分割线

设置 `orientation="vertical"`；父容器使用 flex 并提供可用高度。文字沿竖直方向排列。

Example source: src/divider/example/demos/vertical.vue

```vue
<template>
  <div>
    <div class="vertical-row">
      <span>Before</span>
      <mp-divider orientation="vertical" />
      <span>Middle</span>
      <mp-divider orientation="vertical" type="dashed" />
      <span>After</span>
    </div>
    <div class="vertical-labels">
      <mp-divider orientation="vertical" text-align="start" description="Start" />
      <mp-divider orientation="vertical" description="Center" />
      <mp-divider orientation="vertical" text-align="end" description="End" />
    </div>
  </div>
</template>

<style scoped>
.vertical-row {
  display: flex;
  align-items: center;
  min-height: 40px;
}
.vertical-labels {
  display: flex;
  height: 160px;
}
</style>
```

### 动态属性

切换方向、默认插槽文字、透明度和细线，观察属性更新及恢复。

Example source: src/divider/example/demos/live-properties.vue

```vue
<script setup>
import { ref } from 'vue'

const vertical = ref(false)
const text = ref(false)
const invisible = ref(false)
const hairline = ref(false)
</script>

<template>
  <section class="divider-live-demo">
    <div class="controls">
      <mp-checkbox v-model="vertical" presentation="inline">Vertical divider</mp-checkbox>
      <mp-checkbox v-model="text" presentation="inline">Divider text</mp-checkbox>
      <mp-checkbox v-model="invisible" presentation="inline">Zero opacity</mp-checkbox>
      <mp-checkbox v-model="hairline" presentation="inline">Hairline divider</mp-checkbox>
    </div>
    <p role="status">Orientation: {{ vertical ? 'vertical' : 'horizontal' }}; opacity: {{ invisible ? 0 : 1 }}</p>
    <div class="preview" :class="{ vertical }">
      <span>Before</span>
      <mp-divider
        data-testid="live-divider"
        :orientation="vertical ? 'vertical' : 'horizontal'"
        :opacity="invisible ? 0 : 1"
        :hairline="hairline"
        :thickness="4"
        :inset="[8, 16]"
        :spacing="[12, 20]"
        ><template v-if="text" #default>Section</template></mp-divider
      >
      <span>After</span>
    </div>
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.controls label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.preview {
  display: flex;
  flex-direction: column;
  min-height: 160px;
}
.preview.vertical {
  flex-direction: row;
  align-items: center;
}
</style>
```

## API

### 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `orientation` | 分割线方向 | `horizontal` \| `vertical` | `horizontal` |
| `type` | 线型 | `solid` \| `dashed` \| `dotted` \| `double` | `solid` |
| `text-align` | 文字沿分割线的位置；start/end 为逻辑起止位置 | `start` \| `center` \| `end` | `center` |
| `description` | 文字描述；默认插槽优先 | `string` | — |
| `inset` | 沿线两端缩进：水平时左右，竖直时上下 | `DividerSize` | — |
| `spacing` | 线条两侧外间距：水平时上下，竖直时左右 | `DividerSize` | `md` |
| `thickness` | 线宽，单位 px；未设置时使用主题默认 1px；hairline 优先 | `number` | — |
| `hairline` | 将主题线宽缩放为一半；默认主题下为 0.5px | `boolean` | `false` |
| `color` | 线条颜色；未设置时使用主题边框色 | `string` | — |
| `opacity` | 整个分割线（含文字）的不透明度，范围 0–1；0 保留布局 | `number` | — |

### 间距取值

`DividerSize = number | string | Array<number | string>`

`inset` 设置沿分割线方向的两端缩进，`spacing` 设置分割线与相邻内容的外间距。两者均支持预设 `xs`、`sm`、`md`、`lg`、`xl`、数值（单位 px）、CSS 长度或数组。单值或单元素数组对称应用；`[start, end]` 分别设置两端。数组元素为长度值，不使用预设名称。

| 方向 | inset 数组顺序 | spacing 数组顺序 |
| --- | --- | --- |
| horizontal | 行内起点/终点缩进（RTL 时为右/左） | 上/下外间距 |
| vertical | 上/下缩进 | 行内起点/终点外间距（RTL 时为右/左） |

`inset` 默认不缩进；`spacing` 默认使用当前平台的 `md` 间距。预设读取平台主题 token，具体像素值可不同。

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义分割线内容，优先于 description |

## 类型定义

```ts
import type { DividerProps, DividerInstance, DividerSize } from '@maple-design/ui'
```

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-divider-color` | `var(--mp-sys-color-border-default)` |
| `--mp-divider-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-divider-border-width` | `1px` |
| `--mp-divider-text-padding` | `8px` |
| `--mp-divider-text-align-inset` | `24px` |
| `--mp-divider-orientation-vertical-inset-xs` | `2px` |
| `--mp-divider-orientation-horizontal-inset-xs` | `12px` |
| `--mp-divider-orientation-vertical-spacing-xs` | `4px` |
| `--mp-divider-orientation-horizontal-spacing-xs` | `8px` |
| `--mp-divider-orientation-vertical-inset-sm` | `4px` |
| `--mp-divider-orientation-horizontal-inset-sm` | `16px` |
| `--mp-divider-orientation-vertical-spacing-sm` | `8px` |
| `--mp-divider-orientation-horizontal-spacing-sm` | `12px` |
| `--mp-divider-orientation-vertical-inset-md` | `6px` |
| `--mp-divider-orientation-horizontal-inset-md` | `24px` |
| `--mp-divider-orientation-vertical-spacing-md` | `12px` |
| `--mp-divider-orientation-horizontal-spacing-md` | `16px` |
| `--mp-divider-orientation-vertical-inset-lg` | `8px` |
| `--mp-divider-orientation-horizontal-inset-lg` | `32px` |
| `--mp-divider-orientation-vertical-spacing-lg` | `16px` |
| `--mp-divider-orientation-horizontal-spacing-lg` | `24px` |
| `--mp-divider-orientation-vertical-inset-xl` | `12px` |
| `--mp-divider-orientation-horizontal-inset-xl` | `40px` |
| `--mp-divider-orientation-vertical-spacing-xl` | `24px` |
| `--mp-divider-orientation-horizontal-spacing-xl` | `32px` |

预设值读取当前平台主题；文字留白在桌面端为 16px，移动端为 8px。
