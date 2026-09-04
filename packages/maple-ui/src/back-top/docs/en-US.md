# BackTop

### Intro

A button to back to top.

### Basic Usage

When `target-container` is unset, the page scroll is listened. Once the scroll height reaches `visible-height`, a back to top button appears in the lower right corner.

```html
<script setup>
const lists = [...Array(40).keys()]
</script>

<template>
  <div>
    <mp-cell v-for="list in lists" :key="list">Scroll to bottom {{ list }}</mp-cell>
    <mp-back-top :duration="300" />
  </div>
</template>
```

### Target Container

Use `target-container` to specify a local scroll container. Set `:popup-container="false"` to keep the button inside the container; the parent needs `position: relative`.

```html
<template>
  <div class="wrapper">
    <div id="scroll-container" class="scroll-container">
      <mp-cell v-for="list in lists" :key="list">Scroll in container {{ list }}</mp-cell>
    </div>
    <mp-back-top
      target-container="#scroll-container"
      :visible-height="120"
      :duration="300"
      :popup-container="false"
      right="16"
      bottom="16"
    />
  </div>
</template>

<style>
.wrapper {
  position: relative;
}

.scroll-container {
  height: 320px;
  overflow: auto;
}
</style>
```

### Custom Position

Adjust position with `right` and `bottom`.

```html
<div id="scroll-container" class="scroll-container">
  <mp-cell v-for="list in lists" :key="list">Scroll to bottom {{ list }}</mp-cell>
  <mp-back-top target-container="#scroll-container" :duration="300" right="80" bottom="80" />
</div>
```

### Custom Content

Customize the button content with the default slot and listen to clicks with `@click`.

```html
<div id="scroll-container" class="scroll-container">
  <mp-cell v-for="list in lists" :key="list">Scroll to bottom {{ list }}</mp-cell>
  <mp-back-top target-container="#scroll-container" :duration="300" @click="handleClick">
    <mp-button status="primary" round>TOP</mp-button>
  </mp-back-top>
</div>
```

## API

### Props

| Prop | Description                                                                                             | Type   | Default |
| ----- |---------------------------------------------------------------------------------------------------------|--------|-------|
| `target-container` | The target to trigger scroll. When unset, the nearest scrollable ancestor is detected automatically. | _string \| HTMLElement_     | `-` |
| `popupContainer` | Whether to mount to body. When `false`, the button is positioned relative to its parent, which should have `position: relative`. | _boolean_ | `true` |
| `visible-height` | The button will not show until the scroll height reaches this value                                     | _string \| number_ | `200` |
| `bottom`            | Distance from the bottom of the viewport                                                              | _string \| number_ | `-` |
| `right`            | Distance from the right of the viewport                                                               | _string \| number_ | `-` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _string \| number \| boolean_|   `true`    |
| `duration` | Time to return to top(ms)                                                                               | _number_ | `300` |

### Events

| Event | Description | arguments |
| ----- | -------------- | -------- |
| `click` | Triggered when click | `event: Event` |

### Slots

| Name | Description | SlotProps |
| ----- | -------------- | -------- |
| `default` | Custom the content | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--back-top-right` | `40px` |
| `--back-top-bottom` | `40px` |
| `--back-top-button-size` | `40px` |
| `--back-top-button-border-radius` | `50%` |
