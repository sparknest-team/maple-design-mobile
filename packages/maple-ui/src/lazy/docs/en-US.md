# Lazy

## Examples

### Intro

Load when the image is visible.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Background Image Lazy Load

```demo
../example/demos/background-image-lazy-load.vue
```

### Inline Attributes

You can modify the `loading`, `error` image, and `reload attempts` by using inline properties.

```html
<template>
  <img class="lazy-example-cat" 
    v-lazy="'https://maplejs.org/cat.jpg'"
    lazy-loading="https://xxx.cn/loading.png"
    lazy-error="https://xxx.cn/error.png"
    lazy-attempt="3"
  >
</template>

<style>
.lazy-example-cat {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-size: cover;
  pointer-events: none;
}
</style>
```

### Plugin

The option to set the default `Lazy` load option is provided, which is passed in at plugin registration.

```js
// playground-ignore
import { createApp } from 'vue'
import { Lazy } from '@maplejs/maple-ui'

createApp().use(Lazy, {
  loading: 'https://xxx.cn/loading.png',
  error: 'https://xxx.cn/error.png',
  attempt: 3,
  throttleWait: 300,
  events: [
    'scroll', 
    'wheel', 
    'mousewheel', 
    'resize',
    'animationend',
    'transitionend', 
    'touchmove'
  ],
  filter(lazy) {
    // All properties of the context can be accessed, and some property interceptions can be performed.
    // Such as simply modifying all image addresses http-> https
    lazy.src.replace('http://', 'https://')
  }
})
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Plugin Options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Loading images, if possible, select images that load quickly | _string_ | `Pixel transparent picture` |
| `error` | Load failed to display the picture | _string_ | `Pixel transparent picture` |
| `attempt` | The number of times a load failed to reload | _number_ | `3` |  
| `throttleWait` | throttle wait time, The higher the value, the lower the trigger frequency | _number_ | `300` |
| `events` | A list of events that trigger visibility detection registration | _string[]_ | `['scroll'...]` |
| `filter` | Attribute interceptor function | _(lazy: Lazy) => void_ | `() => void` |
