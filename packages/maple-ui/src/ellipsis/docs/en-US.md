# Ellipsis

### Intro

Mainly used to omit single-line text and multi-line text.

### Single Line Ellipsis

```html
<template>
  <mp-ellipsis style="max-width: 170px">
    I want to say english to everyone like, even you still are normal people, you still can work a world champion and no one trust you!
  </mp-ellipsis>
</template>
```

### Multiple Line Ellipsis

```html
<template>
  <mp-ellipsis style="max-width: 170px" :line-clamp="3">
    I want to say english to everyone like, even you still are normal people, you still can work a world champion and no one trust you!
  </mp-ellipsis>
</template>
```

### Two-way Binding

```html
<script setup>
import { ref } from 'vue'

const expand = ref(false)
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" @click="expand = !expand">Toggle</mp-button>
    <mp-ellipsis style="max-width: 170px" v-model:expand="expand">
      I want to say english to everyone like, even you still are normal people, you still can work a world champion and no one trust you!
    </mp-ellipsis>
  </mp-space>
</template>
```

### Click On Text To Expand

```html
<template>
  <mp-ellipsis 
    style="max-width: 170px" 
    expand-trigger="click" 
    :line-clamp="3" 
    :tooltip="false"
  >
    I want to say english to everyone like, even you still are normal people, you still can work a world champion and no one trust you!
  </mp-ellipsis>
</template>
```

### Custom Tooltip

```html
<template>
  <mp-ellipsis style="max-width: 50vw" :tooltip="{ type: 'primary', sameWidth: false }">
    I want to say english to everyone like, even you still are normal people, you still can work a world champion and no one trust you!

    <template #tooltip-content>
      <m-icon-github />
    </template>
  </mp-ellipsis>
</template>
```

## API

### Props

| Prop   | Description  | Type  | Default  |
| ----- | ------ | ---- | ---- |
| `v-model:expand` | Whether to expand | _boolean_  | `false` |
| `expand-trigger` | Expand trigger method, optional value `click` | _string_ | `-` |
| `line-clamp` | Maximum number of display lines, see [line-clamp](https://caniuse.com/?search=line-clamp) for compatibility | _string_ | `-` |
| `tooltip` | Tooltip component props, for deep customization. For more convenience, `sameWidth` defaults to `true` here | _boolean \| TooltipProps_ | `true` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Text content | `-` |
| `tooltip-content` | Tooltip content | `-` |