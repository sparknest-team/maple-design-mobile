# Row

24-column Flex layout. Row manages gutters and alignment; Col manages spans, offsets, ordering and breakpoints. Use Grid for CSS Grid collapse and suffix items.

> **Choosing a layout**
>
> - Grid + GridItem: Use for form columns and card grids with consistent column widths, spans, responsive column counts, or collapsed rows and suffix items.
> - Row + Col: Use for 24-column Flex layouts that need horizontal/vertical alignment, wrapping control, fixed and flexible widths together, or responsive ordering. Row controls the row; Col controls width, offset and order.
> - Space: Use for simple groups of buttons, tags or text that only need spacing, direction and alignment. Use native Flex for more flexible width allocation.

## Examples

### 24-column layout

```html
<template><div>
  <mp-row :gutter="12"><mp-col :span="12"><div class="cell">12</div></mp-col><mp-col :span="12"><div class="cell soft">12</div></mp-col></mp-row>
  <mp-row :gutter="12"><mp-col v-for="i in 3" :key="i" :span="8"><div class="cell">8</div></mp-col></mp-row>
</div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

### Two-axis and responsive gutters

```html
<script setup lang="ts">
import { ref } from 'vue'
const gap = ref(16)
const vertical = ref(true)
</script>
<template><div>
  <div class="controls"><mp-radio-group v-model="gap"><mp-radio v-for="value in [0, 8, 16, 24]" :key="value" :value="value">{{ value }}px</mp-radio></mp-radio-group><mp-switch v-model="vertical" aria-label="Vertical gutter" />Vertical gap</div>
  <mp-row :gutter="[gap, vertical ? gap : 0]"><mp-col v-for="i in 6" :key="i" :span="8"><div class="cell">{{ i }}</div></mp-col></mp-row>
  <mp-row :gutter="[{ xs: 8, md: 24 }, { xs: 8, md: 16 }]"><mp-col v-for="i in 4" :key="i" :span="12"><div class="cell soft">Responsive gap</div></mp-col></mp-row>
</div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

### Horizontal and vertical alignment

```html
<script setup lang="ts">
import { ref } from 'vue'
const justifies = ['start', 'center', 'end', 'space-around', 'space-between'] as const
const aligns = ['start', 'center', 'end', 'stretch'] as const
const justify = ref<typeof justifies[number]>('space-between')
const align = ref<typeof aligns[number]>('center')
</script>
<template><div>
  <mp-radio-group v-model="justify"><mp-radio v-for="value in justifies" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group>
  <mp-radio-group v-model="align"><mp-radio v-for="value in aligns" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group>
  <mp-row :gutter="12" :justify="justify" :align="align"><mp-col v-for="i in 3" :key="i" :span="6"><div class="cell" :style="{ minHeight: `${36 + i * 24}px`, height: '100%' }">{{ i }}</div></mp-col></mp-row>
</div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

### Wrapping and plain container mode

```html
<script setup lang="ts">
import { ref } from 'vue'
const wrap = ref(true)
const div = ref(false)
</script>
<template><div>
  <div class="controls"><mp-switch v-model="wrap" aria-label="Wrap" />Wrap<mp-switch v-model="div" aria-label="Plain div" />Plain div</div>
  <div style="overflow: auto; padding: 8px"><mp-row :gutter="12" :wrap="wrap" :div="div"><mp-col v-for="i in 3" :key="i" :span="12"><div class="cell">{{ i }}</div></mp-col></mp-row></div>
</div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

### Nested rows and isolated gutters

```html
<template><div><mp-row :gutter="24"><mp-col :span="16"><mp-row :gutter="8"><mp-col :span="12"><div class="cell">Inner 12</div></mp-col><mp-col :span="12"><div class="cell soft">Inner 12</div></mp-col></mp-row></mp-col><mp-col :span="8"><div class="cell">Outer 8</div></mp-col></mp-row></div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| gutter | Gutter: number, responsive object or [horizontal, vertical] | `RowGutter` | `0` |
| justify | Horizontal alignment | `start / center / end / space-around / space-between` | `start` |
| align | Vertical alignment | `start / center / end / stretch` | `start` |
| wrap | Wrap columns | `boolean` | `true` |
| div | Use Row and Col as plain divs without layout styles | `boolean` | `false` |

### Events

| Event | Description |
| --- | --- |
| click | Native MouseEvent, emitted once per click |

### Slots

| Slot | Description |
| --- | --- |
| default | Layout content |

### Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

## Responsive behavior and accessibility

Breakpoints use the viewport: xs is the baseline, sm ≥576, md ≥768, lg ≥992, xl ≥1200, xxl ≥1600px. Values cascade from the largest matching configured breakpoint. SSR uses xs; the viewport and Grid collapse/reordering are resolved after mount. These layout containers add no keyboard shortcuts; consumers provide semantic content and focusable controls. No public methods or dedicated theme tokens.

## Imports

Grid only owns Grid.Item. Row and Col are standalone components with independent entries, styles, documentation, menus and demos. Grid.Row/Grid.Col, Grid re-exports of Row/Col and GridRowInstance/GridColInstance are removed. Import from the library root or standalone row/col entries. Installing Grid no longer registers Row/Col.
