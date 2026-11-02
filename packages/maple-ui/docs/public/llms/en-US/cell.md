<!-- Source: src/cell/docs/en-US.md; locale: en-US; page: /en-US/cell -->

# Cell

## Examples

### Intro

The cell is a single display item in the list. `title` renders the main text; the default slot overrides it when provided.

### Basic Usage

Example source: src/cell/example/demos/basic-usage.vue

```vue
<template>
  <mp-cell title="这是单元格" />
  <mp-cell title="标题会被默认插槽覆盖">自定义单元格内容</mp-cell>
</template>
```

### Show Icon

The examples render `<m-icon-fire />` in the `#icon` slot. The Resolver imports it on demand without manual imports or registration. The string API `icon="fire"` only resolves icons already registered in the app; string values do not trigger the Resolver.

Example source: src/cell/example/demos/show-icon.vue

```vue
<template>
  <mp-cell title="这是单元格">
    <template #icon>
      <m-icon-fire />
    </template>
    <template #extra>
      <m-icon-info-circle-fill />
    </template>
  </mp-cell>
  <mp-cell title="这是单元格">
    <template #icon>
      <m-icon-fire />
    </template>
    <template #extra>
      <m-icon-info-circle-fill />
    </template>
  </mp-cell>
</template>
```

### Show Description

The leading icon, title/description text block, and trailing content are vertically centered. Cell manages spacing and alignment for the icon slot; place the icon directly in the slot without internal CSS classes.

Example source: src/cell/example/demos/show-desc.vue

```vue
<template>
  <mp-cell title="这是单元格" description="描述">
    <template #icon>
      <m-icon-fire />
    </template>
    <template #extra>
      <m-icon-info-circle-fill />
    </template>
  </mp-cell>
  <mp-cell title="这是单元格" description="描述" />
</template>
```

### Show Border

Example source: src/cell/example/demos/show-border.vue

```vue
<script setup></script>

<template>
  <mp-cell border> 这是单元格 </mp-cell>
  <mp-cell border> 这是单元格 </mp-cell>
</template>
```

### Use As List Item

Example source: src/cell/example/demos/list.vue

```vue
<script setup>
import { ref } from 'vue'

const items = ref([
  {
    name: 'Vue2',
    icon: 'star-fill',
    enabled: false,
  },
  {
    name: 'Vue3',
    icon: 'heart-fill',
    enabled: false,
  },
  {
    name: 'React',
    icon: 'close-circle-fill',
    enabled: false,
  },
])
const handleClick = (item) => {
  item.enabled = !item.enabled
}
</script>

<template>
  <mp-paper :elevation="2">
    <mp-cell
      v-for="(item, index) in items"
      :key="item.name"
      ripple
      :border="index !== items.length - 1"
      :border-offset="0"
      @click="handleClick(item)"
    >
      {{ item.name }}

      <template #icon>
        <m-icon-star-fill v-if="item.icon === 'star-fill'" />
        <m-icon-heart-fill v-else-if="item.icon === 'heart-fill'" />
        <m-icon-close-circle-fill v-else />
      </template>

      <template #extra>
        <mp-switch v-model="item.enabled" @click.stop />
      </template>
    </mp-cell>
  </mp-paper>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| ----- | -------------- | -------- | ---------- |
| `title` | Main title; overridden by the default slot | _string_ | `-` |
| `icon` | Registered icon name | _string_ | `-` |
| `description` | Description | _string_ | `-` |
| `border` | Whether to show border | _boolean_ | `false` |
| `border-offset` | Border offset | _string \| number_ | `-` |
| `icon-class` | Extra class for the leading icon container, for both the icon prop and slot | _string_ | `-` |
| `title-class` | Title className | _string_ | `-` |
| `description-class` | Description className | _string_ | `-` |
| `extra-class` | Extra className | _string_ | `-` |
| `ripple` | Whether to enable the water wave effect | _boolean_ | `false` |

### Events

| Event        | Description                                                                                          | Arguments      |
| ------------ | ---------------------------------------------------------------------------------------------------- | -------------- |
| `click`      | Triggered when the cell is clicked  | `event: Event` |

### Slots

| Name | Description | SlotProps |
| ----- | -------------- | -------- |
| `default` | Main content; overrides title | `-` |
| `icon` | Icon of cell | `-` |
| `description` | Description of cell | `-` |
| `extra` | Extra of cell | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable        | Default |
|-----------------| --- |
| `--cell-color`  | `var(--color-text)` |
| `--cell-font-size` | `var(--font-size-md)` |
| `--cell-description-font-size` | `var(--font-size-sm)` |
| `--cell-description-color` | `rgba(0, 0, 0, 0.6)` |
| `--cell-padding` | `10px 12px` |
| `--cell-min-height` | `40px` |
| `--cell-border-color` | `var(--color-border-2)` |
| `--cell-border-left` | `12px` |
| `--cell-border-right` | `12px` |
| `--cell-icon-right` | `8px` |
| `--cell-extra-left` | `8px` |
