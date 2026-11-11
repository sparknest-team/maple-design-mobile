<!-- Source: src/col/docs/en-US.md; locale: en-US; page: /en-US/col -->

# Col

24-column Flex layout. Row manages gutters and alignment; Col manages spans, offsets, ordering and breakpoints. Use Grid for CSS Grid collapse and suffix items.

> **Choosing a layout**
>
> - Grid + GridItem: Use for form columns and card grids with consistent column widths, spans, responsive column counts, or collapsed rows and suffix items.
> - Row + Col: Use for 24-column Flex layouts that need horizontal/vertical alignment, wrapping control, fixed and flexible widths together, or responsive ordering. Row controls the row; Col controls width, offset and order.
> - Space: Use for simple groups of buttons, tags or text that only need spacing, direction and alignment. Use native Flex for more flexible width allocation.

## Basic examples

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

## Layout and arrangement

### Flexible ratios and fixed widths

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `flex` | Ratio, fixed length or CSS flex value | Flexible ratios and fixed widths |
| `xs` | Responsive span or object containing span, offset and order | Responsive objects and visibility |
| `sm` | Responsive span or object containing span, offset and order | Responsive objects and visibility |
| `md` | Responsive span or object containing span, offset and order | Responsive objects and visibility |
| `span` | Column span; 0 hides | Responsive objects and visibility |
<!-- demo-config-notes:end -->


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

## Content and presentation

### Ordering and resetting to zero

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `span` | Column span; 0 hides | Ordering and resetting to zero |
| `order` | Order; 0 resets | Ordering and resetting to zero |
<!-- demo-config-notes:end -->


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

## API

<!-- same-source-api:start -->
### Col Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| span | Column span; integer 0–24, with zero hiding the column | `number` | `24` |
| offset | Offset from the logical inline start; integer 0–24, with zero restoring it | `number` | `undefined` |
| order | Visual order; finite integer, including negative values; zero restores it | `number` | `undefined` |
| xs | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| sm | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| md | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| lg | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| xl | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| xxl | Responsive span or object containing span, offset and order | `number / ColSizeDescriptor` | `undefined` |
| flex | Ratio, fixed length or CSS flex value | `number / string` | `undefined` |

### Col Events

| Event | Description |
| --- | --- |
| click | Native MouseEvent, emitted once per click |

### Col Slots

| Slot | Description |
| --- | --- |
| default | Layout content |

### Col Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

The order example restores every column to `order: 0` when reverse is turned off. Responsive breakpoints use the browser viewport rather than the demo card width; widening the card alone does not activate a breakpoint. `span: 0` hides a column, and a matching larger breakpoint can restore it.

## Responsiveness and accessibility

Row resolves responsive gutter with JavaScript matchMedia, using xs for SSR and synchronizing the viewport after mounting. Col uses CSS media queries: SSR already emits all configured classes without waiting for measurement. Breakpoints use viewport width: xs is the base; sm ≥576, md ≥768, lg ≥992, xl ≥1200 and xxl ≥1600px. Only configured fields override earlier values. Offset starts at the logical inline edge and mirrors in RTL. Order affects visual positioning while preserving DOM, keyboard and assistive technology reading order.

Span, offset and their breakpoint fields accept integers from 0 through 24. A zero span hides the column; offset 24 shifts it by a full row width. Order accepts finite integers, including negative values and values above 24, subject to browser CSS order computation. Gutter accepts finite nonnegative numbers, six-breakpoint objects or exactly two entries [horizontal, vertical]. Development diagnostics report unknown breakpoints, invalid numbers and enum values. Invalid span falls back to 24; invalid offset/order is ignored; breakpoint objects retain valid fields; invalid gutter components fall back to zero.

## Imports

Grid contains only Grid.Item. Import the independent Row and Col components from the library root or their row/col subpaths; installing Grid does not register them. 

`flex` overrides column width while preserving `offset`, `order` and responsive configuration. `span: 0`, including breakpoint values, still hides the column; a matching nonzero span restores visibility while `flex` controls width. Removing `flex` restores the span width. Visual ordering does not change DOM or keyboard navigation `order`.

## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
