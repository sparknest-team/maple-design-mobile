# ImagePreview

### Intro

Image-Preview, Support double-click magnification, Support `previewImage` function call and `ImagePreview` component call.

### Function Call

#### Basic Usage

```html
<script setup>
import { previewImage } from '@maplejs/maple-ui'

function preview() {
  previewImage('https://maplejs.org/cat.jpg')
}
</script>

<template>
  <mp-button type="primary" block @click="preview">Basic Use</mp-button>
</template>
```

#### Call Back
```html
<script setup>
import { previewImage, Snackbar } from '@maplejs/maple-ui'

function preview() {
  previewImage({
    images: [
      'https://maplejs.org/cat.jpg',
      'https://maplejs.org/cat2.jpg'
    ],
    onChange(index) {
      Snackbar(String(index))
    }
  })
}
</script>

<template>
  <mp-button type="primary" block @click="preview">Handle callback function</mp-button>
</template>
```


## Component Call

### Preview Group

#### Wrap Image List

```html
<template>
  <mp-image-preview-group>
    <mp-space :size="[12, 12]">
      <mp-image width="85px" height="85px" fit="cover" src="https://maplejs.org/cat.jpg" />
      <mp-image width="85px" height="85px" fit="cover" src="https://maplejs.org/cat2.jpg" />
    </mp-space>
  </mp-image-preview-group>
</template>
```

#### Data Driven

```html
<script setup>
import { ref } from 'vue'

const visible = ref(false)
const current = ref(0)
const images = ['https://maplejs.org/cat.jpg', 'https://maplejs.org/cat2.jpg']
</script>

<template>
  <mp-button type="primary" block @click="visible = true">Open Preview</mp-button>
  <mp-image-preview-group
    v-model:visible="visible"
    v-model:current="current"
    :images="images"
  />
</template>
```

### Basic Use

```html
<script setup>
import { ref } from 'vue'

const visible = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
</script>

<template>
  <mp-button
    type="warning"
    block
    @click="visible = true"
  >
    Basic Use
  </mp-button>
  <mp-image-preview :images="images" v-model:visible="visible" />
</template>
```

### Specify Initial Position

```html
<script setup>
import { ref } from 'vue'

const visible = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
</script>

<template>
 <mp-button 
    type="warning" 
    block
    @click="visible = true"
  >
    Specify initial position
  </mp-button>
  <mp-image-preview
    :current="1"
    :images="images"
    v-model:visible="visible"
  />
</template>
```

### Display The Close Button

```html
<script setup>
import { ref } from 'vue'

const visible = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
</script>

<template>
   <mp-button 
    type="warning" 
    block 
    @click="visible = true"
  >
    Display the close button
  </mp-button>
  <mp-image-preview
    closable
    :images="images"
    v-model:visible="visible" 
  />
</template>
```

### Listen For Close Event

```html
<script setup>
import { ref } from 'vue'
import { Snackbar } from '@maplejs/maple-ui'

const visible = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
</script>

<template>
  <mp-button
    block
    type="warning"
    @click="visible = true"
  >
    Listen for close event
  </mp-button>
  <mp-image-preview 
    :images="images"
    v-model:visible="visible"
    @close="Snackbar('The shutdown event was triggered.')" 
  />
</template>
```

### Listen For Long Press Event

The `image-prevent-default` attribute prohibits the default behavior of images, and the `long-press` event can be customized to achieve long press requirements.

```html
<script setup>
import { ref } from 'vue'
import { Snackbar } from '@maplejs/maple-ui'

const visible = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
</script>

<template>
  <mp-button
    block
    type="warning"
    @click="visible = true"
  >
    Listen for long press event
  </mp-button>
  <mp-image-preview
    image-prevent-default
    :images="images"
    v-model:visible="visible"
    @long-press="Snackbar('Long press event is triggered')"
  />
</template>
```

### Show Extra Slots

```html
<script setup>
import { ref } from 'vue'

const visible = ref(false)
const menuShow = ref(false)
const images = ref([
  'https://maplejs.org/cat.jpg',
  'https://maplejs.org/cat2.jpg',
])
const actions = [
  {
    name: 'operate',
    icon: 'wrench'
  },
  {
    name: 'operate',
    icon: 'wrench'
  }
]
</script>

<template>
   <mp-button
     block
     type="warning"
     @click="visible = true"
  >
    Show extra slots
  </mp-button>
  <mp-image-preview :images="images" v-model:visible="visible">
    <template #extra>
      <mp-icon
        name="menu"
        :size="22"
        color="#fff"
        @click="menuShow = true"
      />
      <mp-action-sheet :actions="actions" v-model:show="menuShow" />
    </template>
  </mp-image-preview>
</template>
```

## API

### Props

| Prop         | Description   | Type  | Default  |
| ------------ | ------------ | ------------------ | ------------ |
| `v-model:visible` | Whether or display | _boolean_ | `false` |
| `images`     | Need to preview the image URL | _string[]_ | `[]` |
| `src` | Single image URL | _string_ | `-` |
| `current`   | Index from which the image preview starts | _number_ | `0`     |
| `zoom`       | Double-click to zoom in | _string \| number_ | `2` |
| `closable`  | Whether to show the close button | _boolean_ | `false` |
| `close-on-key-escape` | Whether to support keyboard ESC to close the image-preview | _boolean_ | `true`  |
| `loop`       | Whether to open loop playback | _boolean_ | `true` |
| `indicator`  | Whether to show paging | _boolean_ | `true` |
| `lock-scroll` | Lock scroll | _boolean_ | `true` |
| `teleport`   | The location of the pop-up layer to mount | _TeleportProps['to'] \| false_ | `body` |
| `image-prevent-default` | Whether to disable the default behavior of images |  _boolean_ | `false` |

### ImagePreviewGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `images` | Image URL list (skips collecting child Image when set) | _string[]_ | `[]` |
| `v-model:visible` | Whether preview is visible | _boolean_ | `false` |
| `v-model:current` | Current image index | _number_ | `0` |
| `loop` | Whether to loop | _boolean_ | `true` |
| `closable` | Whether to show close button | _boolean_ | `false` |
| `mask-closable` | Close when mask is clicked | _boolean_ | `false` |
| `teleport` | Mount point for preview popup | _string \| Element \| false_ | `-` |

### Events

| Event | Description | Arguments |
| ----- | ---- | ----- |
| `change` | The callback function when switching images, the callback parameter is the current index | `index: number` Image indexing |
| `open`   | Triggered when Image-Preview is turned on | `-`  |
| `opened` | Triggered at the end of the open image-preview animation | `-` |
| `close`  | Triggered when Image-Preview is off | `-` |
| `closed` | Triggered when the animation that closes the image-preview ends | `-` |
| `long-press` | The callback function when long pressing an image, the callback parameter is the current index | `index: number` Image indexing | 
| `key-escape` | Triggered when click keyboard ESC  | `-` |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `previewImage` | Open image-preview | _options \| string \| string[]_ | `-` |
| `previewImage.close` | Close image-preview | _-_ | `-` |
| `previewImage.setDefaultOptions` | Set default option configuration | _options_ | `-` |
| `previewImage.resetDefaultOptions` | Reset default option configuration | _-_ | `-` |
| `prev`   | Previous page                                                        | `options?: CarouselToOptions`             | `-`    |
| `next`   | Next page                                                            | `options?: CarouselToOptions`             | `-`    |
| `to`     | To index page                                                        | `index: number, options?: CarouselToOptions` | `-`    |
| `zoom` | Enlarge or reduce the picture | `ratio: number` | `-` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `indicator` | Paging indicator | `index: number` Image indexing <br> `length: number` Total number of image |
| `close-icon` | Close button | `-` |
| `extra` | Extra slots | `-` |

### ImagePreview Options

| Prop   | Description  |  Type  | Default |
| ------ | ----------- | ------ | -------- |
| `images`     | The image URL array or the URL of a single image to be previewed | _string[] \| string_ | `[]` |
| `current`   | Index from which the image preview starts | _number_ | `0`     |
| `zoom`       | Double-click to zoom in | _string \| number_ | `2` |
| `closable`  | Whether to show the close button | _boolean_ | `false` |
| `closeOnKeyEscape` | Whether to support keyboard ESC to close the image-preview | _boolean_ | `true` |
| `loop`       | Whether to open loop playback | _boolean_ | `true` |
| `indicator`  | Whether to show paging | _boolean_ | `true` |
| `lockScroll` | Lock scroll | _boolean_ | `true` |
| `imagePreventDefault` | Whether to disable the default behavior of images |  _boolean_ | `false` |
| `onChange`   | The callback function when switching images, the callback parameter is the current index | _(index: number) => void_  |  `-` |
| `onOpen`   | Callback when image-preview is turned on |  _() => void_ | `-` |
| `onOpened` | Callback at the end of the animation that opened image-preview |   _() => void_ | `-` |
| `onClose`  | Callback when image-preview is closed |  _() => void_ |  `-` |
| `onClosed` | Callback at the end of the animation that closes the image-preview |  _() => void_ | `-` |
| `onLongPress` | The callback function when long pressing an image, the callback parameter is the current index | _(index: number) => void_  |  `-` |
| `onKeyEscape` | Triggered when click keyboard ESC | _() => void_ | `-` |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| ------ | -------- |
| `--image-preview-swipe-indicators-text-color` | `#ddd`  |
| `--image-preview-swipe-indicators-padding`    | `16px 0` |
| `--image-preview-zoom-container-background`   | `#000`  |
| `--image-preview-close-icon-top`              | `14px` |
| `--image-preview-close-icon-right`            | `14px` |
| `--image-preview-close-icon-size`             | `22px` |
| `--image-preview-close-icon-color`            | `#fff` |
| `--image-preview-extra-top`                   | `14px` |
| `--image-preview-extra-left`                  | `14px` |
