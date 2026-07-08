# CollapseTransition

### Intro

Transition animation of collapse and expansion.

### Basic Usage

Use `expand` prop to collapse or expand the content.

```html
<script setup>
import { ref } from 'vue'

const expand = ref(true)
</script>

<template>
  <mp-switch v-model="expand" />
  <mp-divider />
  <mp-collapse-transition :expand="expand">
    Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light. Though wise men at their end know dark is right, Because their words had forked no lightning they Do not go gentle into that good night. Good men, the last wave by, crying how bright Their frail deeds might have danced in a green bay, Rage, rage against the dying of the light.
  </mp-collapse-transition>
</template>
```

## API

### Props

| Prop       | Description                                         | Type        | Default   |
| ---------- | --------------------------------------------------- | ----------- | --------- |
| `expand` | Collapse or expand content | _boolean_ | `false` |

### Slots

| Name        | Description                                 | SlotProps |
| ----------- | ------------------------------------------- | --------- |
| `default` | Collapsed or expanded content | `-`     |
