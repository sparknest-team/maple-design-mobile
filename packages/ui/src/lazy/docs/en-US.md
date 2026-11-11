# Lazy

### Intro

Load when the image is visible.

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Content and presentation

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
import { Lazy } from '@maple-design/ui-vue'

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
    lazy.src = lazy.src.replace('http://', 'https://')
  }
})
```

## API

### Lazy Options

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Loading images, if possible, select images that load quickly | _string_ | 1-pixel transparent image |
| `error` | Load failed to display the picture | _string_ | 1-pixel transparent image |
| `attempt` | Total attempts including the initial request | _number_ | `3` |
| `throttleWait` | throttle wait time, The higher the value, the lower the trigger frequency | _number_ | `300` |
| `events` | A list of events that trigger visibility detection registration | _string[]_ | `['scroll'...]` |
| `filter` | Attribute interceptor function | _(lazy: LazyContext) => void_ | `() => void` |

`attempt` is the total request count including the first request. Non-finite values fall back to 3; finite values are floored and clamped to at least 1. Cache hits do not consume requests. Assign transformed URLs back to `lazy.src` in `filter`. Public types include `LazyOptions`, `LazyContext`, `LazyState` and `LazyHTMLElement`.

Changing the source, background argument or inline `lazy-loading`, `lazy-error`, `lazy-attempt` options invalidates the previous job. Unmount cancels queued frames and preload listeners; already-delivered stale callbacks cannot update a replacement job or detached node. Background URLs use quoted CSS escaping.

Default configuration, the 100-entry FIFO cache and visibility scheduling are module-wide. Reinstall updates defaults for future jobs and rebinds pending elements to the new event list; existing jobs retain their resource options. Final teardown releases registrations and scheduled checks. `events` and `throttleWait` are plugin options, not inline `lazy-throttle-wait` attributes. Visibility uses the viewport; ancestor scrolling triggers checks without promising clipping-aware preloading.
## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
