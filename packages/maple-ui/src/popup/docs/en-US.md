# Popup

### Intro
Create a container that can pop up from top, bottom, left, right and center. `popupContainer` inserts into the end of the `body` by default.

### Popup Position

```html
<script setup>
import { ref } from 'vue'

const center = ref(false)
const top = ref(false)
const bottom = ref(false)
const left = ref(false)
const right = ref(false)
</script>

<template>
  <mp-space direction="column" :size="[10, 0]">
    <mp-button type="primary" block @click="center = true">
      Center Popup
    </mp-button>
    <mp-button type="primary" block @click="bottom = true">
      Below Popup
    </mp-button>
    <mp-button type="primary" block @click="top = true">
      Above Popup
    </mp-button>
    <mp-button type="primary" block @click="left = true">
      Left Popup
    </mp-button>
    <mp-button type="primary" block @click="right = true">
      Right Popup
    </mp-button>
  </mp-space>

  <mp-popup v-model:open="center">
    <div class="popup-example-block">
      As he came into the window.
      It was the sound of a crescendo.
      He came into her apartment.
      He left the bloodstains on the carpet.
    </div>
  </mp-popup>

  <mp-popup position="bottom" v-model:open="bottom">
    <div class="popup-example-block">
      As he came into the window.
      It was the sound of a crescendo.
      He came into her apartment.
      He left the bloodstains on the carpet.
    </div>
  </mp-popup>

  <mp-popup position="top" v-model:open="top">
    <div class="popup-example-block">
      As he came into the window.
      It was the sound of a crescendo.
      He came into her apartment.
      He left the bloodstains on the carpet.
    </div>
  </mp-popup>

  <mp-popup position="left" v-model:open="left">
    <div class="popup-example-block">
      As he came into the window.
      It was the sound of a crescendo.
      He came into her apartment.
      He left the bloodstains on the carpet.
    </div>
  </mp-popup>

  <mp-popup position="right" v-model:open="right">
    <div class="popup-example-block">
      As he came into the window.
      It was the sound of a crescendo.
      He came into her apartment.
      He left the bloodstains on the carpet.
    </div>
  </mp-popup>
</template>

<style>
.popup-example-block {
  padding: 24px;
  width: 280px;
}
</style>
```

### Overlay Style

```html
<script setup>
import { ref } from 'vue'

const maskClass = ref(false)
const maskStyle = ref(false)
</script>

<template>
  <mp-space direction="column" :size="[10, 0]">
    <mp-button type="primary" block @click="maskClass = true">
      Overlay Class
    </mp-button>
    <mp-button type="primary" block @click="maskStyle = true">
      Overlay Style
    </mp-button>
  </mp-space>

  <mp-popup
    mask-class="popup-example-custom-overlay"
    v-model:open="maskClass"
  >
    <div class="popup-example-block">
      As he came into the window.
      It was the sound of a crescendo.
      He came into her apartment.
      He left the bloodstains on the carpet.
    </div>
  </mp-popup>

  <mp-popup
    :mask-style="{backgroundColor: 'rgba(0, 0, 0, 0.3)'}"
    v-model:open="maskStyle"
  >
    <div class="popup-example-block">
      As he came into the window.
      It was the sound of a crescendo.
      He came into her apartment.
      He left the bloodstains on the carpet.
    </div>
  </mp-popup>
</template>

<style>
.popup-example-custom-overlay {
  background: rgba(0, 0, 0, 0.3) !important;
}

.popup-example-block {
  padding: 24px;
  width: 280px;
}
</style>
```

### Event

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const event = ref(false)
</script>

<template>
  <mp-button type="primary" block @click="event = true">
    Event
  </mp-button>

  <mp-popup
    v-model:open="event"
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <div class="popup-example-block">
      As he came into the window.
      It was the sound of a crescendo.
      He came into her apartment.
      He left the bloodstains on the carpet.
    </div>
  </mp-popup>
</template>

<style>
.popup-example-block {
  padding: 24px;
  width: 280px;
}
</style>
```

## API

### Props

| Prop | Description                                                                                                   | Type | Default |
| --- |---------------------------------------------------------------------------------------------------------------| --- | --- |
| `v-model:open` | Whether to display the Popup                                                                                  | _boolean_ | `false` |
| `position` | Popup position with optional value of `top` `bottom` `right` `left` `center`                                  | _string_ | `center` |
| `mask` | Whether to display the overlay                                                                                | _boolean_ | `true` |
| `mask-class` | Custom overlay class                                                                                          | _string_ | `-` |
| `mask-style` | Custom overlay style                                                                                          | _object_ | `-` |
| `default-style`  | Whether to enable the default style                                                                          | _boolean_ | `true` |
| `transition` | Transition animation name                                                                                     | _string_ | `-` |
| `lock-scroll` | Whether to disable scrolling penetration, scrolling the Popup when disabled will not cause the body to scroll | _boolean_ | `true` |
| `mask-closable` | Whether to click the overlay to close the Popup                                                               | _boolean_ | `true` |
| `esc-to-close` | Whether to support keyboard ESC to close the popup | _boolean_ | `true`  |
| `popupContainer` | The location of the Popup to mount                                                                            | _TeleportProps['to'] \| false_ | `body` |
| `safe-area`              | Whether to enable bottom safety zone adaptation	                                                              | _boolean_             | `false`  |
| `safe-area-top`          | Whether to enable top safety zone adaptation	                                                                 | _boolean_             | `false`  |
| `z-index`  ***3.3.10***   | 	 The zIndex of element       | _number_             | `-`  |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `open` | Triggered when the Popup is open | `-` |
| `opened` | Triggered when the Popup open-animation ends | `-` |
| `close` | Triggered when the Popup is close | `-` |
| `closed` | Triggered when the Popup close-animation ends | `-` |
| `click-overlay` | Triggered when you click on overlay | `-` |
| `key-escape` | Triggered when click keyboard ESC  | `-` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Popup content | `-` |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--popup-overlay-background-color` | `rgba(0, 0, 0, .6)` |
| `--popup-content-background-color` | `var(--color-bg-1)` |