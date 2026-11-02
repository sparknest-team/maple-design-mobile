<!-- Source: src/divider/docs/en-US.md; locale: en-US; page: /en-US/divider -->

# Divider

Separate content sections in lists and layouts.

## Examples

### Basic Usage

Separate adjacent content sections.

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

### Spacing & Inset

Compare five presets, numbers, CSS lengths and asymmetric pairs. The vertical example shows how spacing follows orientation.

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

### Line Style

Compare solid, dashed, dotted and double lines using `type`. Use a `thickness` of at least 3px for a visible double line.

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

### With Text

Use `description` and `text-align` to position text at the start, center or end. Toggle RTL to inspect logical start/end alignment.

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

### Custom Content

The default slot takes priority over `description`. Provide padding for custom content in the caller.

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

### Color, Thickness & Opacity

Customize the line using `color`, `thickness` and `opacity`. Zero opacity preserves layout; `hairline` takes priority over `thickness`.

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

### Vertical Divider

Set `orientation="vertical"` in a flex container with available height. Text follows the vertical direction.

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

### Live Properties

Toggle orientation, default slot text, opacity and hairline to inspect updates and restoration.

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

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `orientation` | Divider orientation | `horizontal` \| `vertical` | `horizontal` |
| `type` | Line style | `solid` \| `dashed` \| `dotted` \| `double` | `solid` |
| `text-align` | Text position along the line; start/end follow logical direction | `start` \| `center` \| `end` | `center` |
| `description` | Description text; the default slot takes priority | `string` | — |
| `inset` | Inset along the line: left/right horizontally, top/bottom vertically | `DividerSize` | — |
| `spacing` | Outer spacing across the line: top/bottom horizontally, left/right vertically | `DividerSize` | `md` |
| `thickness` | Line width in px; theme defaults to 1px; hairline takes priority | `number` | — |
| `hairline` | Scale the theme line width by half; 0.5px with the default theme | `boolean` | `false` |
| `color` | Line color; defaults to the theme border color | `string` | — |
| `opacity` | Opacity of the entire divider, including text, from 0 to 1; zero preserves layout | `number` | — |

### Spacing values

`DividerSize = number | string | Array<number | string>`

`inset` controls the ends of the line; `spacing` controls the outer gap between the line and adjacent content. Both accept presets `xs`, `sm`, `md`, `lg`, `xl`, a number in px, a CSS length, or an array. A scalar or single-item array applies to both ends; `[start, end]` sets each end separately. Array entries are lengths, not preset names.

| Orientation | inset pair | spacing pair |
| --- | --- | --- |
| horizontal | inline start/end inset (right/left in RTL) | top/bottom spacing |
| vertical | top/bottom inset | inline start/end spacing (right/left in RTL) |

`inset` has no inset by default; `spacing` defaults to the platform’s `md` spacing. Presets use platform theme tokens, so pixel values may differ.

### Slots

| Slot | Description |
| --- | --- |
| `default` | Custom divider content; overrides description |

## Types

```ts
import type { DividerProps, DividerInstance, DividerSize } from '@maple-design/ui'
```

### Style Variables

| Variable | Default |
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

Preset values follow the platform theme. Text padding is 16px on desktop and 8px on mobile.
