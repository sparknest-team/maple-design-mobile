<!-- Source: src/col/docs/en-US.md; locale: en-US; page: /en-US/col -->

# Col

24-column Flex layout. Row manages gutters and alignment; Col manages spans, offsets, ordering and breakpoints. Use Grid for CSS Grid collapse and suffix items.

> **Choosing a layout**
>
> - Grid + GridItem: Use for form columns and card grids with consistent column widths, spans, responsive column counts, or collapsed rows and suffix items.
> - Row + Col: Use for 24-column Flex layouts that need horizontal/vertical alignment, wrapping control, fixed and flexible widths together, or responsive ordering. Row controls the row; Col controls width, offset and order.
> - Space: Use for simple groups of buttons, tags or text that only need spacing, direction and alignment. Use native Flex for more flexible width allocation.

## Examples

### Span and offset

Example source: src/col/example/demos/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const span = ref(8)
const offset = ref(4)
</script>
<template>
  <div>
    <div class="controls">
      Span<mp-radio-group v-model="span"
        ><mp-radio v-for="value in [4, 8, 12]" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
      >
    </div>
    <div class="controls">
      Offset<mp-radio-group v-model="offset"
        ><mp-radio v-for="value in [0, 4, 8]" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
      >
    </div>
    <mp-row :gutter="12"
      ><mp-col :span="span" :offset="offset"
        ><div class="cell">{{ span }} / +{{ offset }}</div></mp-col
      ><mp-col :span="4"><div class="cell soft">4</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

### Ordering and resetting to zero

Example source: src/col/example/demos/order.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const reverse = ref(false)
</script>
<template>
  <div>
    <div class="controls"><mp-switch v-model="reverse" aria-label="Reverse order" />Reverse order</div>
    <mp-row :gutter="12"
      ><mp-col v-for="i in 3" :key="i" :span="8" :order="reverse ? 3 - i : 0"
        ><div class="cell">{{ i }}</div></mp-col
      ></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

### Flexible ratios and fixed widths

Example source: src/col/example/demos/flex.vue

```vue
<template>
  <div>
    <mp-row :gutter="12"
      ><mp-col :flex="1"><div class="cell">1</div></mp-col
      ><mp-col :flex="2"><div class="cell soft">2</div></mp-col></mp-row
    >
    <mp-row :gutter="12" :wrap="false"
      ><mp-col flex="100px"><div class="cell">100px</div></mp-col
      ><mp-col flex="auto"><div class="cell soft">auto</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

### Responsive objects and visibility


Example source: src/col/example/demos/responsive.vue

```vue
<template>
  <div>
    <p>xs → sm (576px) → md (768px). Hidden columns return at larger breakpoints.</p>
    <mp-row :gutter="[12, 12]"
      ><mp-col :xs="24" :sm="12" :md="8"><div class="cell">24 / 12 / 8</div></mp-col
      ><mp-col :xs="0" :sm="12" :md="8"><div class="cell soft">Hidden / 12 / 8</div></mp-col
      ><mp-col :span="8" :xs="{ span: 20, offset: 4, order: 2 }" :md="{ span: 8, offset: 0, order: 0 }"
        ><div class="cell">Reset offset / order</div></mp-col
      ></mp-row
    >
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.cell {
  box-sizing: border-box;
  padding: 12px;
  min-width: 0;
  border-radius: 4px;
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  text-align: center;
  overflow-wrap: anywhere;
}
.soft {
  opacity: 0.7;
}
</style>
```

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | Column span; 0 hides | `number` | `24` |
| offset | Offset; 0 resets | `number` | `undefined` |
| order | Order; 0 resets | `number` | `undefined` |
| xs | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| sm | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| md | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| lg | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| xl | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| xxl | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| flex | Ratio, fixed length or CSS flex value | `number / string` | `undefined` |

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

The order example restores every column to `order: 0` when reverse is turned off. Responsive breakpoints use the browser viewport rather than the demo card width; widening the card alone does not activate a breakpoint. `span: 0` hides a column, and a matching larger breakpoint can restore it.

## Responsive behavior and accessibility

Breakpoints use the viewport: xs is the baseline, sm ≥576, md ≥768, lg ≥992, xl ≥1200, xxl ≥1600px. Values cascade from the largest matching configured breakpoint. SSR uses xs; the viewport and Grid collapse/reordering are resolved after mount. These layout containers add no keyboard shortcuts; consumers provide semantic content and focusable controls. No public methods or dedicated theme tokens.

## Imports

Grid only owns Grid.Item. Row and Col are standalone components with independent entries, styles, documentation, menus and demos. Grid.Row/Grid.Col, Grid re-exports of Row/Col and GridRowInstance/GridColInstance are removed. Import from the library root or standalone row/col entries. Installing Grid no longer registers Row/Col.
