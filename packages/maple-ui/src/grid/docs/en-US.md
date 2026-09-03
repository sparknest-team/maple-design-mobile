# Grid

### Intro

A CSS Grid based layout component. Supports collapse and suffix items that stick to the end of a row.

> `Grid.Row` / `Grid.Col` (template tags `mp-row` / `mp-col`) are the 24-column Flex grid. See below.

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

## Row / Col

### Basic Usage

```html
<template>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>
</template>
```

### Offset

```html
<template>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="16" :offset="8"><div class="item">offset: 8 span: 16</div></mp-col>
  </mp-row>
</template>
```

### Horizontal Alignment

`justify`: `start` `center` `end` `space-around` `space-between`.

### Vertical Alignment

`align`: `start` `center` `end` `stretch`.

### Order

```html
<template>
  <mp-row>
    <mp-col :span="6" :order="4"><div class="item">1</div></mp-col>
    <mp-col :span="6" :order="1"><div class="item">4</div></mp-col>
  </mp-row>
</template>
```

### Responsive

```html
<template>
  <mp-row :gutter="10">
    <mp-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" :xxl="1">
      <div class="item">1</div>
    </mp-col>
  </mp-row>
</template>
```

### Flex

```html
<template>
  <mp-row>
    <mp-col flex="100px"><div class="item">100px</div></mp-col>
    <mp-col flex="auto"><div class="item">auto</div></mp-col>
  </mp-row>
</template>
```

## API

### Row Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `gutter` | Gutter in px. Supports responsive object or `[horizontal, vertical]` | `number \| ResponsiveValue \| [number \| ResponsiveValue, number \| ResponsiveValue]` | `0` |
| `justify` | Horizontal alignment | `'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between'` | `'start'` |
| `align` | Vertical alignment | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` |
| `wrap` | Whether columns can wrap | `boolean` | `true` |
| `div` | Treat as plain div without grid styles | `boolean` | `false` |

### Col Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `span` | Number of grid spaces | `number` | `24` |
| `offset` | Number of spacing on the left | `number` | `-` |
| `order` | Sort order | `number` | `-` |
| `xs` | `< 576px` | `number \| { span?, offset?, order? }` | `-` |
| `sm` | `≥ 576px` | same | `-` |
| `md` | `≥ 768px` | same | `-` |
| `lg` | `≥ 992px` | same | `-` |
| `xl` | `≥ 1200px` | same | `-` |
| `xxl` | `≥ 1600px` | same | `-` |
| `flex` | Flex layout property | `number \| string \| 'initial' \| 'auto' \| 'none'` | `-` |

### Events / Slots

Row & Col emit `click` and provide a `default` slot.
