# Overlay

### Intro

Create a mask layer to emphasize specific page elements.


### Basic Usage

```html
<script setup>
import { ref } from 'vue'
  
const show = ref(false)
</script>

<template>
  <mp-button type="primary" block @click="show = true">Show Overlay</mp-button>
  <mp-overlay v-model:open="open" />
</template>
```

### Overlay Content

```html
<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <mp-button type="primary" block @click="show = true">Overlay Content</mp-button>
  <mp-overlay v-model:open="open">
    <div class="overlay-content">
      As he came into the window.
      It was the sound of a crescendo.
      He came into her apartment.
      He left the bloodstains on the carpet.
    </div>
  </mp-overlay>
</template>

<style>
.overlay-content {
  padding: 24px;
  width: 312px;
  border-radius: 28px;
}
</style>
```

### Click Event

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const show = ref(false)
</script>

<template>
  <mp-button type="primary" block @click="show = true">Click Overlay</mp-button>
  <mp-overlay
    v-model:open="open"
    @click="Message.success('click')"
  />
</template>
```

## API

### Props

| Prop           | Description                                                                                                     | 	Type                 | Default |
|----------------|-----------------------------------------------------------------------------------------------------------------|-----------------------|---------|
| `v-model:open` | Whether to display the Overlay                                                                                  | _boolean_             | `false` |
| `lock-scroll`  | Whether to disable scrolling penetration, scrolling the Overlay when disabled will not cause the body to scroll | _boolean_             | `true`  |
| `popupContainer`     | The location of the Overlay to mount                                                                            | _TeleportProps['to'] \| false_ | `-`     |
| `esc-to-close` | Whether to support keyboard ESC to close the overlay | _boolean_ | `true`  |

### Events

| Event   | Description                         | Arguments |
|---------|-------------------------------------|-----------|
| `click` | Triggered when clicking on overlay | `-`       |
| `key-escape` | Triggered when click keyboard ESC  | `-` |

### Slots

| Name      | Description  | SlotProps |
|-----------|--------------|-----------|
| `default` | Default slot | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                     | Default             |
|------------------------------|---------------------|
| `--overlay-background-color` | `rgba(0, 0, 0, .6)` |
