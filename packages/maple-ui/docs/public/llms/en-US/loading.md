<!-- Source: src/loading/docs/en-US.md; locale: en-US; page: /en-US/loading -->

# Loading

## 案例

### Intro

Loading component for performing animations when data is loaded.

### Size

Example source: src/loading/example/demos/size.vue

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-space align="center" justify="space-between">
    <mp-loading size="sm" />
    <mp-loading type="cube" size="sm" />
    <mp-loading type="wave" size="sm" />
    <mp-loading type="rect" size="sm" />
    <mp-loading type="disappear" size="sm" />
    <mp-loading :size="32" />
  </mp-space>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
```

### Type

Example source: src/loading/example/demos/type.vue

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-space align="center" justify="space-between">
    <mp-loading />
    <mp-loading type="cube" />
    <mp-loading type="wave" />
    <mp-loading type="rect" />
    <mp-loading type="disappear" />
  </mp-space>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
```

### Color

Example source: src/loading/example/demos/color.vue

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-space align="center" justify="space-between">
    <mp-loading color="var(--mp-color-info)" />
    <mp-loading type="cube" color="var(--mp-color-success)" />
    <mp-loading type="wave" color="var(--mp-color-warning)" />
    <mp-loading type="rect" color="var(--mp-color-danger)" />
    <mp-loading type="disappear" color="var(--mp-color-text-disabled)" />
  </mp-space>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
```

### Wrap

Example source: src/loading/example/demos/wrap.vue

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-button style="margin-bottom: 8px" @click="loading = !loading">
    {{ loading ? '关闭' : '打开' }}
  </mp-button>
  <mp-loading tip="LOADING" :loading="loading">
    <mp-card
      title="介绍"
      description="Maple 是一个基于Vue3开发的 Material 风格移动端组件库，全面拥抱Vue3生态，由社区的小伙伴开发和维护。"
    />
  </mp-loading>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
```

### Loading Directive

The two directive examples keep independent loading states. Their controls and host cards are stacked using Space's `direction="column"`; turning one off leaves the other overlay unchanged.


`v-mp-loading` accepts a boolean shorthand or a `{ loading, tip, type, size, radius, color, hideIcon, fullscreen, background }` options object. In object form, `loading` controls the loading state and the remaining component options match `Loading` props.

#### Registration

`v-mp-loading` renders its indicator with Maple's built-in `Loading` component. The `mp-` prefix avoids collisions with directives from other component libraries. Register it using any one of these approaches.


With `MapleResolver()`, `unplugin-vue-components` resolves `v-mp-loading` automatically. Set `directives: false` to disable directive resolution.

> Wrapper mode applies `opacity: 0.38` to its default-slot content. Because the directive preserves the host DOM, it inserts the built-in Loading VNode and uses an equivalent translucent background overlay instead.

Example source: src/loading/example/demos/directive.vue

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
const simpleDirectiveLoading = ref(false)
const configuredDirectiveLoading = ref(false)
</script>

<template>
  <mp-space direction="column">
    <h4 class="loading-demo__title">简单用法</h4>
    <mp-switch v-model="simpleDirectiveLoading" presentation="inline" />
    <mp-card
      v-mp-loading="simpleDirectiveLoading"
      title="介绍"
      description="v-mp-loading 会在当前容器内渲染 Loading 遮罩，不会改变内容结构。"
    />

    <h4 class="loading-demo__title">复杂配置</h4>
    <mp-switch v-model="configuredDirectiveLoading" presentation="inline" />
    <mp-card
      v-mp-loading="{
        loading: configuredDirectiveLoading,
        tip: '加载中...',
        color: 'var(--mp-color-primary)',
        background: 'color-mix(in srgb, var(--mp-color-bg-white) 72%, transparent)',
      }"
      title="介绍"
      description="v-mp-loading 会在当前容器内渲染 Loading 遮罩，不会改变内容结构。"
    />
  </mp-space>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}

.loading-demo__title {
  margin: 12px 0 4px;
  font-size: 14px;
}
</style>
```

## API

### Props

| prop      | Description                                             | Type               | Default  |
| --------- | ------------------------------------------------------- | ------------------ | -------- |
| `color`   | Loading color                                           | _string_           | `-`      |
| `type`    | Can be set to `circle` `wave` `cube` `rect` `disappear` | _string_           | `circle` |
| `size`    | Can be set to `xs` `sm` `md` `lg` `xl`, or a number     | _string \| number_ | `md`     |
| `tip`     | Tip of the loading                                      | _string_           | `-`      |
| `loading` | Specify whether loading is active                       | _boolean_          | `false`  |
| `radius`  | Set radius size when the `type` is `circle`             | _string \| number_ | `-`      |
| `hide-icon` | Whether to hide the loading indicator                  | _boolean_          | `false`  |

### Slots

| Name      | Description                | SlotProps |
| --------- | -------------------------- | --------- |
| `default` | Content wrapped in loading | `-`       |
| `tip`     | Tip of the loading         | `-`       |
| `icon`    | Custom loading indicator   | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider)

| Variable                | Default                |
| ----------------------- | ---------------------- |
| `--loading-color`       | `var(--color-primary)` |
| `--loading-opacity`     | `0.38`                 |
| `--loading-desc-margin` | `8px 0 0`              |
| `--loading-desc-color`  | `var(--color-primary)` |

The directive overlay prevents the default click action and stops click propagation, so clicking the overlay does not invoke a Card or ancestor click handler. Normal clicks resume when loading ends. Keyboard interaction with underlying controls is not disabled; use disabled on those controls when necessary.

### Overlay styling

| Token | Description |
| --- | --- |
| `--mp-loading-overlay-background` | Directive overlay background; the background option overrides this value. |

Content overlay class：`.mp-loading__content-overlay`。
