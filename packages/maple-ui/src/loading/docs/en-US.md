# Loading

### Intro

Loading component for performing animations when data is loaded.

### Type

```html
<template>
  <mp-space align="center" justify="space-between">
    <mp-loading />
    <mp-loading type="cube" />
    <mp-loading type="wave" />
    <mp-loading type="rect" />
    <mp-loading type="disappear" />
  </mp-space>
</template>
```

### Color

```html
<template>
  <mp-space align="center" justify="space-between">
    <mp-loading color="var(--color-info)" />
    <mp-loading type="cube" color="var(--color-success)" />
    <mp-loading type="wave" color="var(--color-warning)" />
    <mp-loading type="rect" color="var(--color-danger)" />
    <mp-loading type="disappear" color="var(--color-text-disabled)" />
  </mp-space>
</template>
```

### Size

```html
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
```

### Wrap

```html
<script setup>
  import { ref } from 'vue'

  const loading = ref(false)
</script>

<template>
  <mp-button @click="loading = !loading" style="margin-bottom: 8px"> {{ loading ? 'Open' : 'Close' }} </mp-button>
  <mp-loading tip="LOADING" :loading="loading">
    <mp-card
      title="Intro"
      description="Maple is a Material design mobile component library developed based on Vue3, developed and maintained by partners in the community."
    />
  </mp-loading>
</template>
```

### Loading Directive

```html
<script setup>
  import { ref } from 'vue'

  const loading = ref(false)
</script>

<template>
  <!-- Basic usage -->
  <mp-switch v-model="loading" />
  <mp-card v-mp-loading="loading" title="Loading Card">
    v-mp-loading renders a Loading overlay inside the current container without changing its content structure.
  </mp-card>

  <!-- Advanced options -->
  <mp-card v-mp-loading="{ loading, tip: 'Loading...', color: 'var(--mp-color-primary)' }" title="Loading Card">
    v-mp-loading renders a Loading overlay inside the current container without changing its content structure.
  </mp-card>
</template>
```

`v-mp-loading` accepts a boolean shorthand or a `{ loading, tip, type, size, radius, color, fullscreen, background }` options object. In object form, `loading` controls the loading state and `tip` matches the `Loading` component prop.

#### Registration

`v-mp-loading` renders its indicator with Maple's built-in `Loading` component. The `mp-` prefix avoids collisions with directives from other component libraries. Register it using any one of these approaches.

```ts
// 1. Full installation registers both Loading and v-mp-loading.
import MapleVue from '@maplejs/maple-ui'

app.use(MapleVue)
```

```ts
// 2. On-demand Loading installation also registers both.
import { Loading } from '@maplejs/maple-ui'

app.use(Loading)
```

```ts
// 3. Register only the directive.
import { vLoading } from '@maplejs/maple-ui'

app.directive('mp-loading', vLoading)
```

With `MapleResolver()`, `unplugin-vue-components` resolves `v-mp-loading` automatically. Set `directives: false` to disable directive resolution.

> Wrapper mode applies `opacity: 0.38` to its default-slot content. Because the directive preserves the host DOM, it inserts the built-in Loading VNode and uses an equivalent translucent background overlay instead.

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

### Slots

| Name      | Description                | SlotProps |
| --------- | -------------------------- | --------- |
| `default` | Content wrapped in loading | `-`       |
| `tip`     | Tip of the loading         | `-`       |

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
