# Sticky

### Intro

The sticky layout uses the `scroll` layout mode that listens to container scroll events by default. 
If necessary, you can switch to the `css sticky` layout mode to improve performance.

### Basic Use

```html
<template>
  <div class="sticky-example">
    <mp-sticky :offset-top="54">
      <mp-button type="primary">Basic Use</mp-button>
    </mp-sticky>
  </div>
</template>

<style>
.sticky-example {
  min-height: 200vh;
}
</style>
```

### Local Sticky

```html
<template>
  <div class="sticky-example">
    <div ref="scrollerRef" class="sticky-example-scroller">
      <mp-sticky :target="scrollerRef">
        <mp-button type="success">Local Sticky</mp-button>
      </mp-sticky>
      <div class="sticky-example-block"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scrollerRef = ref(null)
</script>

<style>
.sticky-example {
  min-height: 200vh;
}

.sticky-example-scroller {
  height: 200px;
  overflow: auto;
  background: #2979ff;
}

.sticky-example-block {
  width: 100%;
  height: 600px;
  background: #2979ff;
  opacity: .5;
}
</style>
```

### Fixed State Change

```html
<template>
  <div class="sticky-example">
    <mp-sticky :offset-top="54" @change="handleChange">
      <mp-button type="warning">Fixed State Change</mp-button>
    </mp-sticky>
    <div>Fixed: {{ fixed }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fixed = ref(false)

const handleChange = (value) => {
  fixed.value = value
}
</script>
```

## API

### Props

| Prop | Description | Type | Default | 
| --- | --- | --- | --- | 
| `offset-top` | Sticky offset top | _string \| number_ | `0` |
| `z-index` | Sticky z-index | _string \| number_ | `10` |
| `css-mode` | Enable native `css sticky` mode | _boolean_ | `false` |
| `disabled` | Disable sticky, when set to `true`, the element will return to the document flow | _boolean_ | `false` |
| `target` | Scroll container, defaults to the nearest scrollable parent | _string \| HTMLElement \| Window_ | `-` |

### Methods

| Method | Description | Arguments | Return          |
|----------|----------|------|-----------------|
| `resize` | Trigger sticky layout redraw | `-`  | `Promise<void>` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `change` | Emitted when the fixed state changes | `fixed: boolean`<br>`offsetTop: number` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Sticky content | `-` |