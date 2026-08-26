# Loading

### Intro

Loading component for performing animations when data is loaded.

### Type

```html
<template>
  <mp-space align="center" justify="space-between">
    <mp-loading />
    <mp-loading type="cube" />
    <mp-loading type="wave" />
    <mp-loading type="rect" />
    <mp-loading type="disappear" />
  </mp-space>
</template>
```

### Color
```html
<template>
  <mp-space align="center" justify="space-between">
    <mp-loading color="var(--color-info)" />
    <mp-loading type="cube" color="var(--color-success)" />
    <mp-loading type="wave" color="var(--color-warning)" />
    <mp-loading type="rect" color="var(--color-danger)" />
    <mp-loading type="disappear" color="var(--color-text-disabled)" />
  </mp-space>
</template>
```

### Size

```html
<template>
  <mp-space align="center" justify="space-between">
    <mp-loading size="small" />
    <mp-loading type="cube" size="small" />
    <mp-loading type="wave" size="small" />
    <mp-loading type="rect" size="small" />
    <mp-loading type="disappear" size="small" />
  </mp-space>
</template>
```

### Wrap

```html
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-button @click="loading = !loading" style="margin-bottom: 8px">
    {{ loading ? 'Open' : 'Close' }}
  </mp-button>
  <mp-loading tip="LOADING" :loading="loading">
    <mp-card 
      title="Intro"
      description="Maple is a Material design mobile component library developed based on Vue3, developed and maintained by partners in the community." 
    />
  </mp-loading>
</template>
```

## API

### Props

| prop     | Description                                             | Type     | Default  |
| -------- |---------------------------------------------------------| -------- |----------|
| `color`  | Loading color                                           | _string_ | `-`      |
| `type`   | Can be set to `circle` `wave` `cube` `rect` `disappear` | _string_ | `circle` |
| `size`   | Can be set to `large` `normal` `small` `mini`           | _string_ | `normal` |
| `tip`   | Tip of the loading                       | _string_ | `-`      |
| `loading`| Specify whether loading is active                       | _boolean_ | `false`  |
| `radius` | Set radius size when the `type` is `circle`             | _string \| number_  | `-` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Content wrapped in loading | `-` |
| `tip`    | Tip of the loading | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider)

| Variable | Default |
| --- | --- |
| `--loading-color`       | `var(--color-primary)` |
| `--loading-opacity`     | `0.38`                 |
| `--loading-desc-margin` | `8px 0 0`              |
| `--loading-desc-color`  | `var(--color-primary)` |
