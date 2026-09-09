# Grid

CSS Grid columns, spans, gaps, collapse and suffix items. Use Row / Col for 24-column Flex layouts.

> **Choosing a layout**
>
> - Grid + GridItem: Use for form columns and card grids with consistent column widths, spans, responsive column counts, or collapsed rows and suffix items.
> - Row + Col: Use for 24-column Flex layouts that need horizontal/vertical alignment, wrapping control, fixed and flexible widths together, or responsive ordering. Row controls the row; Col controls width, offset and order.
> - Space: Use for simple groups of buttons, tags or text that only need spacing, direction and alignment. Use native Flex for more flexible width allocation.

## Examples

### Columns, spans and offsets

```html
<template><div>
  <mp-grid :cols="4" :col-gap="12" :row-gap="12"><mp-grid-item v-for="i in 8" :key="i" class="cell">{{ i }}</mp-grid-item></mp-grid>
  <mp-grid :cols="4" :col-gap="12" :row-gap="12"><mp-grid-item :span="2" class="cell">span 2</mp-grid-item><mp-grid-item :offset="1" class="cell soft">offset 1</mp-grid-item><mp-grid-item :span="4" class="cell">span 4</mp-grid-item></mp-grid>
</div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

### Collapsed rows and suffix slot

```html
<script setup lang="ts">
import { ref } from 'vue'
const collapsed = ref(true)
const rows = ref(1)
</script>
<template><div>
  <div class="controls"><mp-switch v-model="collapsed" aria-label="Collapsed" />Collapsed<mp-radio-group v-model="rows"><mp-radio :value="1">1 row</mp-radio><mp-radio :value="2">2 rows</mp-radio></mp-radio-group></div>
  <mp-grid :cols="4" :col-gap="12" :row-gap="12" :collapsed="collapsed" :collapsed-rows="rows">
    <mp-grid-item v-for="i in 9" :key="i" class="cell">{{ i }}</mp-grid-item>
    <mp-grid-item suffix v-slot="{ overflow }"><mp-button block variant="outline" @click="collapsed = !collapsed">{{ overflow ? 'More' : 'Less' }}</mp-button></mp-grid-item>
  </mp-grid>
</div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

### Responsive columns, gaps and spans

```html
<template><div>
  <p>xs: 1 column · sm: 2 columns · md: 4 columns</p>
  <mp-grid :cols="{ xs: 1, sm: 2, md: 4 }" :col-gap="{ xs: 8, md: 16 }" :row-gap="{ xs: 8, md: 16 }">
    <mp-grid-item :span="{ xs: 1, md: 2 }" class="cell">Responsive span</mp-grid-item><mp-grid-item v-for="i in 6" :key="i" class="cell soft">{{ i }}</mp-grid-item>
  </mp-grid>
</div></template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.cell { box-sizing: border-box; padding: 12px; min-width: 0; border-radius: 4px; background: var(--mp-color-primary); color: var(--mp-color-white); text-align: center; overflow-wrap: anywhere; }
.soft { opacity: .7; }
</style>
```

### Insert, remove and reorder

```html
<script setup lang="ts">
import { ref } from 'vue'
const items = ref([1, 2, 3, 4, 5])
let next = 6
</script>
<template><div>
  <div class="controls"><mp-button @click="items.unshift(next++)">Insert first</mp-button><mp-button :disabled="!items.length" @click="items.shift()">Remove first</mp-button><mp-button @click="items.reverse()">Reverse</mp-button></div>
  <mp-grid :cols="3" :col-gap="12" :row-gap="12" collapsed><mp-grid-item v-for="i in items" :key="i" class="cell">{{ i }}</mp-grid-item><mp-grid-item suffix v-slot="{ overflow }" class="cell soft">{{ overflow ? '…' : 'End' }}</mp-grid-item></mp-grid>
</div></template>

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
| cols | Columns per row, minimum 1 | `number / ResponsiveValue` | `24` |
| row-gap | Row gap in px | `number / ResponsiveValue` | `0` |
| col-gap | Column gap in px | `number / ResponsiveValue` | `0` |
| collapsed | Collapse overflowing rows | `boolean` | `false` |
| collapsed-rows | Visible rows while collapsed, minimum 1 | `number` | `1` |

### Events

| Event | Description |
| --- | --- |

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

## GridItem

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | Grid span | number / ResponsiveValue | 1 |
| offset | Empty tracks before the item | number / ResponsiveValue | 0 |
| suffix | Suffix at the end of the row | boolean | false |

The default slot receives `{ overflow: boolean }`, indicating hidden items. No custom events or public methods.

## Imports

Grid only owns Grid.Item. Row and Col are standalone components with independent entries, styles, documentation, menus and demos. Grid.Row/Grid.Col, Grid re-exports of Row/Col and GridRowInstance/GridColInstance are removed. Import from the library root or standalone row/col entries. Installing Grid no longer registers Row/Col.
