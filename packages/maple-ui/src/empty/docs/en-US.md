# Empty

### Intro

Placeholder hint for empty state.

### Basic Usage

```html
<script setup>
import { ref } from 'vue'
</script>

<template>
  <mp-empty description="No data" />
</template>
```

### Image Size

Control the icon size via `image-size` prop, optional values are `xs` `sm` `md` `lg` `xl`.

```html
<template>
  <mp-space direction="column" :size="['0', '20px']">
    <mp-empty v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size" :image-size="size" :description="`image-size: ${size}`" />
  </mp-space>
</template>
```

### Custom Image

```html
<template>
  <mp-empty description="Custom image" image-src="https://cdn.example.com/empty.svg" />
</template>
```

### Custom Image Slot

```html
<template>
  <mp-empty description="Custom icon">
    <template #image>
      <mp-icon name="search" />
    </template>
  </mp-empty>
</template>
```

### Extra Action

```html
<template>
  <mp-empty description="No data">
    <template #extra>
      <mp-button type="primary" size="small" @click="() => {}">Reload</mp-button>
    </template>
  </mp-empty>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `description` | Description text | _string_ | `-` |
| `image-size` | Image size, optional values are `xs` `sm` `md` `lg` `xl`, or a specific number | _string \| number_ | `md` |
| `image-src` | Custom image URL (overrides default icon) | _string_ | `-` |
| `show-icon` | Whether to show icon | _boolean_ | `true` |
| `show-description` | Whether to show description | _boolean_ | `true` |
| `on-click` | Click callback | _(event: Event) => void_ | `-` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Description content | `-` |
| `image` | Custom icon/image | `-` |
| `extra` | Extra action area | `-` |
