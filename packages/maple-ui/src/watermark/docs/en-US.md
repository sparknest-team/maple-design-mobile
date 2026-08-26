# Watermark

### Intro

Adding text or image watermarks to a certain area of the page can be used to identify copyright and prevent information theft.

### Text Watermark

```html
<template>
  <mp-watermark content="Maple">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

### Custom Gap

```html
<template>
  <mp-watermark content="Maple" :gap="[40, 40]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

### Custom Offset

```html
<template>
  <mp-watermark content="Maple" :offset="[20, 20]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

### Custom Rotate

```html
<template>
  <mp-watermark content="Maple" :rotate="22" :offset="[0, 20]">
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

### Image Watermark

```html
<template>
  <mp-watermark 
    image="./logo.svg"
    :width="40" 
    :height="40" 
    :gap="[40, 40]" 
    :offset="[10, 10]" 
  >
    <div class="watermark-wrapper"></div>
  </mp-watermark>
</template>

<style>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

### Fullscreen

```html
<script setup>
import { ref } from 'vue'

const fullscreen = ref(false)

const toggle = () => {
  fullscreen.value = !fullscreen.value
}
</script>

<template>
  <mp-watermark 
    content="Maple UI"
    :alpha="0.2"
    :fullscreen="fullscreen"  
    :offset="[10, 10]"
  >
    <div class="watermark-wrapper">
      <mp-button type="primary" @click="toggle">Toggle</mp-button>
    </div>
  </mp-watermark>
</template>

<style>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

### Watermark Content Slot

```html
<template>
  <mp-watermark :offset="[10, 10]">
    <div class="watermark-wrapper"></div>
    <template #content>
      <span style="font-size: 20px; color: #7986cb">Maple UI</span>
    </template>
  </mp-watermark>
</template>

<style>
.watermark-wrapper {
  width: 100%;
  height: 200px;
}
</style>
```

## API

### Props

| Prop       | Description   | Type   | Default   |
| ------- | --- |----------------|-----------|
| `width`    | Watermark width       | _number_       | `100`   |
| `height`   | Watermark height       | _number_       | `100`   |
| `content`  | Watermark text content    | _string_       | `-`   |
| `image`    | The path of the image watermark has a higher priority than `content`    | _string_       | `-`   |
| `rotate`   | Watermark rotation angle           | _number_       | `-22`   |
| `offset` | Offset from container top-left `[x, y]` | _[number, number]_ | `[0, 0]` |
| `gap` | Watermark spacing `[x, y]` | _[number, number]_ | `[0, 0]` |
| `z-index`  | Watermark z-index      | _number \| string_       | `10`   |
| `alpha`  | Watermark opacity         | _number \| string_      | `0.5`   |
| `fullscreen`    | Whether to display watermark in fullscreen mode        | _boolean_       | `false`   |
| `font`    | Watermark text style    | _WatermarkFont_ | `-` |

### WatermarkFont 

| Prop              | Description       | Type     | Default   |
| --- |----------------------| --- | --- |
| `font-size`    |    Font size    | _number_      | `14`   |
| `font-variant`  |    Font variant    | _string_      | `normal`   |
| `font-weight`    |    Font weight   | _string_      | `normal`   |
| `font-style`   |    Font style   | _string_      | `normal`   |
| `font-family`  |    Font family    | _string_      | `-`   |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `resize` | This method can be called for redrawing when the watermark attribute changes | `-` | `-` |

### Slots

| Name | Description | SlotProps |
| --- |----------------------| --- |
| `content` | The content of HTML `Watermark`, only supports inline styles, does not support passing in self closing tags, priority higher than `content` or `image` attributes | `-` |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| ------ | -------- |
| `--watermark-content-color` | `#808080`  |