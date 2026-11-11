<!-- Source: src/row/docs/en-US.md; locale: en-US; page: /en-US/row -->

# Row

24-column Flex layout. Row manages gutters and alignment; Col manages spans, offsets, ordering and breakpoints. Use Grid for CSS Grid collapse and suffix items.

> **Choosing a layout**
>
> - Grid + GridItem: Use for form columns and card grids with consistent column widths, spans, responsive column counts, or collapsed rows and suffix items.
> - Row + Col: Use for 24-column Flex layouts that need horizontal/vertical alignment, wrapping control, fixed and flexible widths together, or responsive ordering. Row controls the row; Col controls width, offset and order.
> - Space: Use for simple groups of buttons, tags or text that only need spacing, direction and alignment. Use native Flex for more flexible width allocation.


Horizontal and vertical gutters both default to 16px (`gutter=[16, 16]`). An explicit number or responsive object sets only the horizontal gutter. Use a tuple for both axes, or `gutter=0` to remove spacing.

## Basic examples

### 24-column layout

Example source: src/row/example/demos/basic.vue

```vue
<template>
  <div class="row-demo">
    <mp-row
      ><mp-col :span="12"><div class="cell">12</div></mp-col
      ><mp-col :span="12"><div class="cell soft">12</div></mp-col></mp-row
    >
    <mp-row
      ><mp-col v-for="i in 3" :key="i" :span="8"><div class="cell">8</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.row-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
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

### Two-axis and responsive gutters

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `gutter` | Gutter: number, responsive object or [horizontal, vertical] | Two-axis and responsive gutters, Horizontal and vertical alignment, Wrapping and plain container mode |
| `justify` | Horizontal alignment | Horizontal and vertical alignment, Layout and alignment |
| `align` | Vertical alignment | Horizontal and vertical alignment, Layout and alignment |
| `wrap` | Wrap columns | Wrapping and plain container mode |
| `div` | Use Row and Col as plain divs without layout styles | Wrapping and plain container mode |
<!-- demo-config-notes:end -->


Example source: src/row/example/demos/gutter.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const gap = ref(16)
const vertical = ref(true)
</script>
<template>
  <div class="row-demo">
    <div class="controls">
      <mp-radio-group v-model="gap"
        ><mp-radio v-for="value in [0, 8, 16, 24]" :key="value" :value="value">{{ value }}px</mp-radio></mp-radio-group
      ><mp-switch v-model="vertical" aria-label="Vertical gutter" />Vertical gap
    </div>
    <mp-row :gutter="[gap, vertical ? gap : 0]"
      ><mp-col v-for="i in 6" :key="i" :span="8"
        ><div class="cell">{{ i }}</div></mp-col
      ></mp-row
    >
    <mp-row
      :gutter="[
        { xs: 8, md: 24 },
        { xs: 8, md: 16 },
      ]"
      ><mp-col v-for="i in 4" :key="i" :span="12"><div class="cell soft">Responsive gap</div></mp-col></mp-row
    >
  </div>
</template>

<style scoped>
.row-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
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

### Horizontal and vertical alignment

Example source: src/row/example/demos/alignment.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const justifies = ['start', 'center', 'end', 'space-around', 'space-between'] as const
const aligns = ['start', 'center', 'end', 'stretch'] as const
const justify = ref<(typeof justifies)[number]>('space-between')
const align = ref<(typeof aligns)[number]>('center')
</script>
<template>
  <div class="row-demo">
    <mp-radio-group v-model="justify"
      ><mp-radio v-for="value in justifies" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
    >
    <mp-radio-group v-model="align"
      ><mp-radio v-for="value in aligns" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group
    >
    <mp-row :justify="justify" :align="align"
      ><mp-col v-for="i in 3" :key="i" :span="6"
        ><div class="cell" :style="{ minHeight: `${36 + i * 24}px`, height: '100%' }">{{ i }}</div></mp-col
      ></mp-row
    >
  </div>
</template>

<style scoped>
.row-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
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

### Wrapping and plain container mode

Example source: src/row/example/demos/wrap.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const wrap = ref(true)
const div = ref(false)
</script>
<template>
  <div class="row-demo">
    <div class="controls">
      <mp-switch v-model="wrap" aria-label="Wrap" />Wrap<mp-switch v-model="div" aria-label="Plain div" />Plain div
    </div>
    <div style="overflow: auto; padding: 8px">
      <mp-row :wrap="wrap" :div="div"
        ><mp-col v-for="i in 3" :key="i" :span="12"
          ><div class="cell">{{ i }}</div></mp-col
        ></mp-row
      >
    </div>
  </div>
</template>

<style scoped>
.row-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
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

### Nested rows and isolated gutters


Example source: src/row/example/demos/nested.vue

```vue
<template>
  <div>
    <mp-row :gutter="24"
      ><mp-col :span="16"
        ><mp-row :gutter="8"
          ><mp-col :span="12"><div class="cell">Inner 12</div></mp-col
          ><mp-col :span="12"><div class="cell soft">Inner 12</div></mp-col></mp-row
        ></mp-col
      ><mp-col :span="8"><div class="cell">Outer 8</div></mp-col></mp-row
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

### Layout and alignment

Use this example for row. Adjust cross-axis alignment, main-axis distribution and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/row/example/demos/layout-lab.vue

```vue
<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoLayout = __demoReactive({ align: 'start', justify: 'start' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="align">
        <mp-radio-group
          v-model="__demoLayout['align']"
          aria-label="align"
          :options="[
            { label: 'start', value: 'start' },
            { label: 'center', value: 'center' },
            { label: 'end', value: 'end' },
            { label: 'stretch', value: 'stretch' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="justify">
        <mp-radio-group
          v-model="__demoLayout['justify']"
          aria-label="justify"
          :options="[
            { label: 'start', value: 'start' },
            { label: 'center', value: 'center' },
            { label: 'end', value: 'end' },
            { label: 'space-around', value: 'space-around' },
            { label: 'space-between', value: 'space-between' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <mp-row :gutter="12" v-bind="__demoLayout"
      ><mp-col v-for="i in 3" :key="i" :span="8"><div class="cell">8</div></mp-col></mp-row
    >
  </mp-space>
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
### Row Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| gutter | Gutter: number, responsive object or [horizontal, vertical] | `RowGutter` | `[16, 16]` |
| justify | Horizontal alignment | `start / center / end / space-around / space-between` | `start` |
| align | Vertical alignment | `start / center / end / stretch` | `start` |
| wrap | Wrap columns | `boolean` | `true` |
| div | Use Row and Col as plain divs without layout styles | `boolean` | `false` |

### Row Events

| Event | Description |
| --- | --- |
| click | Native MouseEvent, emitted once per click |

### Row Slots

| Slot | Description |
| --- | --- |
| default | Layout content |

### Row Methods

| Method | Description |
| --- | --- |
<!-- same-source-api:end -->

Wrapping examples compare wrapped and ordinary `div` modes. Ordinary mode removes Row layout and child Col spacing. Gap examples distinguish horizontal/vertical spacing. Row uses Flex, not CSS Grid.

## Responsiveness and accessibility

Row resolves responsive gutter with JavaScript matchMedia, using xs for SSR and synchronizing the viewport after mounting. Col uses CSS media queries: SSR already emits all configured classes without waiting for measurement. Breakpoints use viewport width: xs is the base; sm ≥576, md ≥768, lg ≥992, xl ≥1200 and xxl ≥1600px. Only configured fields override earlier values. Offset starts at the logical inline edge and mirrors in RTL. Order affects visual positioning while preserving DOM, keyboard and assistive technology reading order.

Span, offset and their breakpoint fields accept integers from 0 through 24. A zero span hides the column; offset 24 shifts it by a full row width. Order accepts finite integers, including negative values and values above 24, subject to browser CSS order computation. Gutter accepts finite nonnegative numbers, six-breakpoint objects or exactly two entries [horizontal, vertical]. Development diagnostics report unknown breakpoints, invalid numbers and enum values. Invalid span falls back to 24; invalid offset/order is ignored; breakpoint objects retain valid fields; invalid gutter components fall back to zero.

## Imports

Grid contains only Grid.Item. Import the independent Row and Col components from the library root or their row/col subpaths; installing Grid does not register them.

## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
