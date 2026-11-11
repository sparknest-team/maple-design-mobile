<!-- Source: src/progress-group/docs/en-US.md; locale: en-US; page: /en-US/progress-group -->

# ProgressGroup

### Introduction

Display multiple values as segments of a single progress track with a matching legend.

## Basic examples

### Basic Usage

Example source: src/progress-group/example/demos/basic.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <mp-progress-group :items="items" :max="128" show-text />
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

## Appearance and states

### Progress group sizes and colors

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `items` | Segment data | Progress group sizes and colors |
| `size` | Track size | Progress group sizes and colors |
| `color` | Default segment color | Progress group sizes and colors |
| `show-text` | Show the summed percentage | Progress group sizes and colors |
<!-- demo-config-notes:end -->


Compare segment sizes and color overrides separately from orientation, circular layouts, overflow and keyboard interaction.

Example source: src/progress-group/example/demos/appearance-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const items = [
      { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
      { label: 'Apps', value: 8, color: '#f53f3f' },
      { label: 'Media', value: 42, color: '#00b42a' },
    ]

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

    const trackOnlyItems = [{ value: 16 }, { value: 22, color: '#722ed1' }, { value: 28, color: '#0fc6c2' }]
    return { items, sizes, trackOnlyItems }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const items = [
      { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
      { label: 'Apps', value: 8, color: '#f53f3f' },
      { label: 'Media', value: 42, color: '#00b42a' },
    ]

    const trackOnlyItems = [{ value: 16 }, { value: 22, color: '#722ed1' }, { value: 28, color: '#0fc6c2' }]
    return { items, trackOnlyItems }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">进度轨尺寸</span><span lang="en-US">Track Sizes</span></h4>
      <mp-space direction="column" size="md">
        <div v-for="size in scene1.sizes" :key="size" class="progress-group-example__size-row">
          <span>{{ size }}</span>
          <mp-progress-group :items="scene1.trackOnlyItems" :size="size" />
        </div>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="color">
      <h4><span lang="zh-CN">默认颜色与纯进度轨</span><span lang="en-US">Default Color and Track Only</span></h4>
      <mp-space direction="column" size="lg">
        <mp-progress-group
          :items="[
            {
              label: 'Docs',
              value: 20,
            },
            {
              label: 'Tests',
              value: 35,
            },
          ]"
          color="#ff7d00"
          show-text
        />
        <mp-progress-group :items="scene2.trackOnlyItems" size="lg" />
      </mp-space>
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
  .progress-group-example__size-row {
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr);
    align-items: center;
    gap: 12px;
  }

  .progress-group-example__orientations {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: 24px;
  }

  .progress-group-example__vertical {
    height: 220px;
  }

  .progress-group-example__circles {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    gap: 16px;
  }

  .progress-group-example__circle-status {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.demo-comparison-case--2 {
  .progress-group-example__size-row {
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr);
    align-items: center;
    gap: 12px;
  }

  .progress-group-example__orientations {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: 24px;
  }

  .progress-group-example__vertical {
    height: 220px;
  }

  .progress-group-example__circles {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    gap: 16px;
  }

  .progress-group-example__circle-status {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
```

## Layout and arrangement

### Orientation

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `items` | Segment data | Orientation |
| `show-text` | Show the summed percentage | Orientation |
| `orientation` | Horizontal/vertical orientation of the linear progress track, default horizontal; only used for mode=line | Orientation |
| `size` | Track size | Orientation |
<!-- demo-config-notes:end -->


Example source: src/progress-group/example/demos/orientation.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <div class="progress-group-example__orientations">
    <mp-progress-group :items="items" show-text />
    <mp-progress-group
      :items="items"
      orientation="vertical"
      size="lg"
      show-text
      class="progress-group-example__vertical"
    />
  </div>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

## Content and presentation

### Circular Segments

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `mode` | Display mode | Circular Segments |
| `items` | Segment data | Circular Segments |
| `show-text` | Show the summed percentage | Circular Segments |
| `circle-size` | Diameter in circle mode | Circular Segments |
| `stroke-width` | Track width in circle mode | Circular Segments |
<!-- demo-config-notes:end -->


Example source: src/progress-group/example/demos/circle.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <div class="progress-group-example__circles">
    <mp-progress-group mode="circle" :items="items" show-text />
    <mp-progress-group mode="circle" :items="items" circle-size="min(42vw, 240px)" :stroke-width="12" show-text>
      <template #text="{ value, max }">
        <div class="progress-group-example__circle-status">
          <strong>{{ value }}</strong
          ><small>/ {{ max }} GB</small>
        </div>
      </template>
    </mp-progress-group>
  </div>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

## Interaction and control

### Overflow and keyboard

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `items` | Segment data | Overflow and keyboard, Custom Content |
| `max` | Total used to calculate each share | Overflow and keyboard, Custom Content |
| `show-text` | Show the summed percentage | Overflow and keyboard, Custom Content |
| `tooltip` | Enable segment hover/focus tips | Overflow and keyboard |
| `aria-label` | Accessible group name | Overflow and keyboard |
| `mode` | Display mode | Overflow and keyboard |
<!-- demo-config-notes:end -->


The demo's parent updates `max`, `items` and `tooltip` for both shapes; these controls are not built-in editing events. Toggle capacity between 100/200, clear/restore data or disable/enable tooltips. Disabling tooltips removes segments from the Tab order, and clearing data removes their tips. Pointer hover takes precedence over keyboard focus; leaving the hovered segment restores the focused segment's tip.

Example source: src/progress-group/example/demos/overflow-keyboard.vue

```vue
<script setup>
import { ref } from 'vue'

const initialItems = [
  { label: 'A', value: 70 },
  { label: 'B', value: 50, color: '#722ed1' },
  { label: 'C', value: 10, color: '#0fc6c2' },
]
const items = ref(initialItems)
const max = ref(100)
const tooltip = ref(true)
</script>
<template>
  <mp-space direction="column" size="24px" data-demo-capacity>
    <mp-space wrap>
      <mp-button @click="max = max === 100 ? 200 : 100">Capacity: {{ max }}</mp-button>
      <mp-button @click="items = items.length ? [] : initialItems">{{
        items.length ? 'Clear data' : 'Restore data'
      }}</mp-button>
      <mp-button @click="tooltip = !tooltip">Tooltips: {{ tooltip ? 'on' : 'off' }}</mp-button>
    </mp-space>
    <mp-progress-group :items="items" :max="max" :tooltip="tooltip" show-text aria-label="Capacity line" />
    <mp-progress-group
      mode="circle"
      :items="items"
      :max="max"
      :tooltip="tooltip"
      show-text
      aria-label="Capacity circle"
    />
    <p aria-live="polite">Items: {{ items.length }}; capacity: {{ max }}; tooltips: {{ tooltip ? 'on' : 'off' }}</p>
  </mp-space>
</template>
```

Segments are clipped cumulatively at max in both line and circle modes. Legend and tooltip values retain the logical per-item percentages. Non-finite/negative values become zero; invalid max falls back to 100. Focus a visible segment with Tab to show its tooltip; Escape dismisses it. Moving the pointer away does not dismiss a focused segment's tooltip. Use aria-label to name the group.

All five size presets affect line thickness (2/4/8/12/16px), not circle diameter; circle-size and stroke-width control circles. CSS-length circle-size values are supported.

### Custom Content

Example source: src/progress-group/example/demos/custom.vue

```vue
<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
</script>

<template>
  <mp-progress-group :items="items" :max="128" show-text>
    <template #text="{ value, max }">已使用 {{ value }} / {{ max }} GB</template>
    <template #item-trailing="{ item }">{{ item.value }} GB</template>
    <template #tooltip="{ item, percent }"
      >{{ item.label }} · {{ item.value }} GB · {{ Math.round(percent) }}%</template
    >
  </mp-progress-group>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

## Reading direction

Horizontal segments, highlights and hints share the same logical origin. Vertical progress remains top to bottom; rings retain their existing angles and data order.

## Usage notes

### Geometry and motion
Built-in effects respect `prefers-reduced-motion: reduce`. Track thickness applies to both horizontal and vertical layouts; circle geometry remains prop-driven.


`orientation` controls linear layout only; circle legend arrangement is unchanged. Circle `stroke-width` is a number in the 100×100 SVG coordinate system, not a CSS length. A `text` slot is displayed even when `show-text=false`. When `item.slot` is set, its prefix and `-leading`, `-label`, `-trailing` slots are used; missing dynamic slots use built-in content rather than generic `item-*` slots.

The pointer can enter and remain over the tooltip; after leaving, the focused segment’s tooltip returns. Escape closes it. Tooltip content is descriptive and should not contain interactive form controls.

## API

### ProgressGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| aria-label | Accessible group name | `string` | — |
| items | Segment data | `ProgressGroupItem[]` | `[]` |
| mode | Display mode | `line \| circle` | `line` |
| max | Total used to calculate each share | `number` | `100` |
| show-text | Show the summed percentage | `boolean` | `false` |
| size | Track size | `xs \| sm \| md \| lg \| xl` | `md` |
| color | Default segment color | `string` | `content-brand` |
| circle-size | Diameter in circle mode | `number \| string` | `120` |
| stroke-width | Track width in circle mode | `number` | `8` |
| tooltip | Enable segment hover/focus tips | `boolean` | `true` |
| orientation | Horizontal/vertical orientation of the linear progress track, default horizontal; only used for mode=line | `horizontal \| vertical` | `horizontal` |

### ProgressGroup Slots

| Name | Slot arguments |
| --- | --- |
| text | `{ percent, value, max }` |
| tooltip | `{ item, index, percent }` |
| item / item-leading / item-label / item-trailing | `{ item, index, percent }` |

### ProgressGroupItem Props

| Prop | Description | Type |
| --- | --- | --- |
| label | Legend label | `string` |
| value | Segment value | `number` |
| color | Segment color | `string` |
| icon | Legend icon component | `Component` |
| slot | Custom slot-name prefix | `string` |
| class | Additional legend item class | `string` |
| tip | Custom hint text | `string` |

## CSS Variables

Graphic markers default to system content-brand. Color precedence: item.color → component color → default. Check custom-color contrast; geometry tokens retain platform differences.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-progress-group-dot-size` | `var(--mp-sys-space-4)` | `height`, `width` |
| `--mp-progress-group-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-progress-group-gap` | `var(--mp-sys-space-3)` | `gap` |
| `--mp-progress-group-item-gap` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-progress-group-muted-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-progress-group-radius` | `9999px` | `border-radius`, `clip-path` |
| `--mp-progress-group-size-lg-thickness` | `12px` | `height`, `width` |
| `--mp-progress-group-size-md-thickness` | `8px` | `height`, `width` |
| `--mp-progress-group-size-sm-thickness` | `4px` | `height`, `width` |
| `--mp-progress-group-size-xl-thickness` | `16px` | `height`, `width` |
| `--mp-progress-group-size-xs-thickness` | `2px` | `height`, `width` |
| `--mp-progress-group-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-progress-group-text-font-weight` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-progress-group-tooltip-bg` | `var(--mp-sys-color-surface-tooltip)` | `background` |
| `--mp-progress-group-tooltip-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-progress-group-tooltip-duration` | `var(--mp-sys-motion-duration-fast)` | `animation` |
| `--mp-progress-group-tooltip-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-progress-group-tooltip-line-height` | `1.4` | `line-height` |
| `--mp-progress-group-tooltip-max-width` | `240px` | `max-width` |
| `--mp-progress-group-tooltip-offset` | `var(--mp-sys-space-4)` | `bottom`, `height`, `inset-inline-start`, `width` |
| `--mp-progress-group-tooltip-padding` | `5px var(--mp-sys-space-4)` | `padding` |
| `--mp-progress-group-tooltip-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-progress-group-track-color` | `var(--mp-sys-color-state-hover)` | `background`, `stroke` |
| `--mp-progress-group-transition-duration` | `var(--mp-sys-motion-duration-standard)` | `animation`, `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-progress-group-dot-size: var(--mp-sys-space-4);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
