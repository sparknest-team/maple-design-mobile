<!-- Source: src/divider/docs/en-US.md; locale: en-US; page: /en-US/divider -->

# Divider

Separate content sections in lists and layouts.

Inherits the nearest `dir="ltr|rtl"`. Horizontal text start/end follows reading order; vertical start/end remains top/bottom. Inset controls along-line indentation and spacing controls perpendicular margins. Paired horizontal inset and vertical spacing uses logical start/end. Vertical borders use inline start; hairline, border type and aria-orientation retain their meaning. Direction changes preserve content nodes.

## Basic examples

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

## Layout and arrangement

### Vertical Divider

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `orientation` | Horizontal/vertical orientation of the divider itself, default horizontal; does not control text alignment | Vertical Divider |
| `type` | Line style | Vertical Divider |
| `text-align` | Text position along the line; start/end follow logical direction | Vertical Divider |
| `description` | Description text; the default slot takes priority | Vertical Divider |
<!-- demo-config-notes:end -->


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

## Content and presentation

### With Text

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `text-align` | Text position along the line; start/end follow logical direction | With Text |
| `description` | Description text; the default slot takes priority | With Text |
| `inset` | Inset along the line: left/right horizontally, top/bottom vertically | Line size, style and color |
| `spacing` | Outer spacing across the line: top/bottom horizontally, left/right vertically | Line size, style and color |
| `orientation` | Horizontal/vertical orientation of the divider itself, default horizontal; does not control text alignment | Line size, style and color |
| `type` | Line style | Line size, style and color |
<!-- demo-config-notes:end -->


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

### Line size, style and color

Compare thickness or insets, line style and color. Text and custom content remain separate.

<details>
<summary>Configuration details and limits</summary>

#### Spacing & Inset

Compare five presets, numbers, CSS lengths and asymmetric pairs. The vertical example shows how spacing follows orientation.

#### Color, Thickness & Opacity

Customize the line using `color`, `thickness` and `opacity`. Zero opacity preserves layout; `hairline` takes priority over `thickness`.

#### Line Style

Compare solid, dashed, dotted and double lines using `type`. Use a `thickness` of at least 3px for a visible double line.

</details>

Example source: src/divider/example/demos/line-appearance-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const presets = ['xs', 'sm', 'md', 'lg', 'xl']
    return { presets }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">间距与缩进</span><span lang="en-US">Spacing &amp; Inset</span></h4>
      <div>
        <div v-for="size in scene1.presets" :key="size">
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
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="type">
      <h4><span lang="zh-CN">线型</span><span lang="en-US">Line Style</span></h4>
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
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="color">
      <h4><span lang="zh-CN">颜色、线宽与透明度</span><span lang="en-US">Color, Thickness &amp; Opacity</span></h4>
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
  .vertical-preview {
    display: flex;
    align-items: center;
    height: 96px;
  }
}
</style>
```

## Customization and slots

### Custom Content

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `type` | Line style | Custom Content |
| `description` | Description text; the default slot takes priority | Custom Content |
<!-- demo-config-notes:end -->


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

## Interaction and control

### Live Properties

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `orientation` | Horizontal/vertical orientation of the divider itself, default horizontal; does not control text alignment | Live Properties |
| `opacity` | Opacity of the entire divider, including text, from 0 to 1; zero preserves layout | Live Properties |
| `hairline` | Scale the theme line width by half; 0.5px with the default theme | Live Properties |
| `thickness` | Finite line width of at least 1px; omission uses the 1px theme default; hairline takes precedence | Live Properties |
| `inset` | Inset along the line: left/right horizontally, top/bottom vertically | Live Properties |
| `spacing` | Outer spacing across the line: top/bottom horizontally, left/right vertically | Live Properties |
<!-- demo-config-notes:end -->


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
      <mp-checkbox v-model="vertical" edit-mode="direct">Vertical divider</mp-checkbox>
      <mp-checkbox v-model="text" edit-mode="direct">Divider text</mp-checkbox>
      <mp-checkbox v-model="invisible" edit-mode="direct">Zero opacity</mp-checkbox>
      <mp-checkbox v-model="hairline" edit-mode="direct">Hairline divider</mp-checkbox>
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

## Content and layout

### Content height and minimum thickness

Explicit thickness accepts finite numbers greater than or equal to 1. hairline still takes priority, using half the theme width. Values below 1 (including zero and negative values), and non-finite values, are ignored and use the theme width; development builds warn.

Multiline descriptions and custom content occupy their full height, including spacing=0. Subsequent content stays below the divider.

Example source: src/divider/example/demos/content-flow.vue

```vue
<template>
  <section class="divider-flow-demo">
    <h4>1px：最小显式线宽 / Minimum explicit width</h4>
    <div class="flow-sample">
      <mp-divider
        data-min-line
        :thickness="1"
        :spacing="0"
        description="内容仍正常占位 / Content stays in normal flow"
      />
      <p>后续正文 / Following content</p>
    </div>
    <h4>4px：多行文字 / Multiline content</h4>
    <div class="flow-sample">
      <mp-divider
        data-multiline
        :thickness="4"
        :spacing="0"
        description="分区标题支持换行，并为后续内容保留完整空间 / A wrapping section title reserves its full height"
      />
      <p>后续正文 / Following content</p>
    </div>
    <h4>默认插槽 / Custom content</h4>
    <div class="flow-sample">
      <mp-divider data-custom-content :spacing="0"
        ><span class="flow-content">第一行 / First line<br />第二行 / Second line</span></mp-divider
      >
      <p>后续正文 / Following content</p>
    </div>
    <p>thickness ≥ 1；hairline 优先，使用主题线宽的一半。hairline takes priority and halves the theme width.</p>
  </section>
</template>
<style scoped>
.flow-sample {
  max-width: 280px;
}
.flow-sample p {
  margin: 0;
}
.flow-content {
  padding: 12px 0;
}
</style>
```

## Usage notes

### Configuration

Presets read the active platform theme. Text spacing is 16px on desktop and 8px on mobile.

## API

### Divider Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `orientation` | Horizontal/vertical orientation of the divider itself, default horizontal; does not control text alignment | `horizontal` \| `vertical` | `horizontal` |
| `type` | Line style | `solid` \| `dashed` \| `dotted` \| `double` | `solid` |
| `text-align` | Text position along the line; start/end follow logical direction | `start` \| `center` \| `end` | `center` |
| `description` | Description text; the default slot takes priority | `string` | — |
| `inset` | Inset along the line: left/right horizontally, top/bottom vertically | `DividerSize` | — |
| `spacing` | Outer spacing across the line: top/bottom horizontally, left/right vertically | `DividerSize` | `md` |
| `thickness` | Finite line width of at least 1px; omission uses the 1px theme default; hairline takes precedence | `number` | — |
| `hairline` | Scale the theme line width by half; 0.5px with the default theme | `boolean` | `false` |
| `color` | Line color; defaults to the theme border color | `string` | — |
| `opacity` | Opacity of the entire divider, including text, from 0 to 1; zero preserves layout | `number` | — |

### Spacing values

`DividerSize = number | string | [number | string] | [number | string, number | string]`

`inset` controls the ends of the line; `spacing` controls the outer gap between the line and adjacent content. Both accept presets `xs`, `sm`, `md`, `lg`, `xl`, a number in px, a CSS length, or an array. A scalar or single-item array applies to both ends; `[start, end]` sets each end separately. Array entries are lengths, not preset names.

| Direction | inset array order | spacing array order |
| --- | --- | --- |
| horizontal | Inline start/end inset; right/left in RTL | Top/bottom margin |
| vertical | Top/bottom inset | Inline start/end margin; right/left in RTL |

`inset` has no inset by default; `spacing` defaults to the platform’s `md` spacing. Presets use platform theme tokens, so pixel values may differ.


Development checks cover orientation, text-align, type, spacing shape, thickness and opacity. Invalid enums use defaults; invalid inset produces no indentation, invalid spacing falls back to md, and invalid opacity does not override styles. opacity must be finite and within 0–1. Arrays accept one or two lengths and no preset names. Finite negative margins and CSS var/calc expressions remain supported; browsers parse their CSS syntax.

### Divider Slots

| Slot | Description |
| --- | --- |
| `default` | Custom divider content; overrides description |

## Types

```ts
import type { DividerProps, DividerInstance, DividerSize, DividerSizePreset, DividerOrientation, DividerTextAlign, DividerType } from '@maple-design/ui-vue'
```

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-divider-border-width` | `1px` | `border-inline-start-width`, `border-top-width` |
| `--mp-divider-color` | `var(--mp-sys-color-border-default)` | `border-inline-start-color`, `border-top-color` |
| `--mp-divider-orientation-horizontal-inset-lg` | `32px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-md` | `24px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-sm` | `16px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-xl` | `40px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-xs` | `12px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-spacing-lg` | `24px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-md` | `16px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-sm` | `12px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-xl` | `32px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-xs` | `8px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-vertical-inset-lg` | `8px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-md` | `6px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-sm` | `4px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-xl` | `12px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-xs` | `2px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-spacing-lg` | `16px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-md` | `12px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-sm` | `8px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-xl` | `24px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-xs` | `4px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-text-align-inset` | `24px` | `height`, `width` |
| `--mp-divider-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-divider-text-padding` | `8px` | `padding` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-divider-color: var(--mp-sys-color-border-default);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
