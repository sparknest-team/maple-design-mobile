# Grid

### Intro

A CSS Grid based layout component. Supports collapse and suffix items that stick to the end of a row.

> For the 24-column Flex grid, see [Row / Col](#/en-US/row).

Breakpoints are aligned with Cedar (PC):

| Breakpoint | Media query |
| --- | --- |
| `xs` | `max-width: 575px` |
| `sm` | `min-width: 576px` |
| `md` | `min-width: 768px` |
| `lg` | `min-width: 992px` |
| `xl` | `min-width: 1200px` |
| `xxl` | `min-width: 1600px` |

### Basic Use

Supports collapse and suffix items. The default slot of a suffix item receives `{ overflow }` to indicate whether content overflows when collapsed.

```html
<script setup>
import { ref } from 'vue'

const collapsed = ref(false)
</script>

<template>
  <mp-switch v-model="collapsed" />
  <mp-grid :cols="3" :col-gap="12" :row-gap="16" :collapsed="collapsed">
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item :offset="1">item | offset - 1</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item :span="3">item | span - 3</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item suffix>
      <template #default="{ overflow }">suffix | overflow: {{ overflow }}</template>
    </mp-grid-item>
  </mp-grid>
</template>
```

### Responsive Layout

`cols`, `row-gap`, `col-gap`, `span`, and `offset` support responsive objects such as `{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }`.

```html
<template>
  <mp-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :col-gap="12" :row-gap="16">
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item>item</mp-grid-item>
    <mp-grid-item :span="{ xl: 4, xxl: 6 }" suffix>suffix</mp-grid-item>
  </mp-grid>
</template>
```

## API

### Grid Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `cols` | Number of columns per row | `number \| ResponsiveValue` | `24` |
| `row-gap` | Gap between rows (px) | `number \| ResponsiveValue` | `0` |
| `col-gap` | Gap between columns (px) | `number \| ResponsiveValue` | `0` |
| `collapsed` | Whether to collapse | `boolean` | `false` |
| `collapsed-rows` | Number of rows shown when collapsed | `number` | `1` |

### GridItem Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `span` | Number of grids spanned | `number \| ResponsiveValue` | `1` |
| `offset` | Number of grids offset on the left | `number \| ResponsiveValue` | `0` |
| `suffix` | Whether it is a suffix item | `boolean` | `false` |

### GridItem Slots

| Name | Description | Slot Props |
| --- | --- | --- |
| `default` | Grid item content | `{ overflow: boolean }` |

## Type Definitions

### ResponsiveValue

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `xxl` | >= 1600px | `number` | `-` |
| `xl` | >= 1200px | `number` | `-` |
| `lg` | >= 992px | `number` | `-` |
| `md` | >= 768px | `number` | `-` |
| `sm` | >= 576px | `number` | `-` |
| `xs` | < 576px | `number` | `-` |

```ts
import type { GridProps, GridItemProps, ResponsiveValue } from '@maplejs/maple-ui'
```
