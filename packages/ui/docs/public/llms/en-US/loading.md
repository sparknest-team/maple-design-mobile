<!-- Source: src/loading/docs/en-US.md; locale: en-US; page: /en-US/loading -->

# Loading

## Basic examples

### Basic usage

Example source: src/loading/example/demos/basic.vue

```vue
<template>
  <mp-loading tip="加载中" />
</template>
```

### Intro

Loading component for performing animations when data is loaded.

## Appearance and states

### Loading shape, size and color

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | Can be set to `xs` `sm` `md` `lg` `xl`, or a number | Loading shape, size and color |
| `type` | Can be set to `circle` `wave` `cube` `rect` `disappear` | Loading shape, size and color |
| `color` | Loading color | Loading shape, size and color |
<!-- demo-config-notes:end -->


Compare the shape, size and color of loading indicators. Container masks and directives remain separate.

Example source: src/loading/example/demos/appearance-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const loading = ref(false)
    return { loading }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const loading = ref(false)
    return { loading }
  })(),
)

const scene3 = demoProxyRefs(
  (() => {
    const loading = ref(false)
    return { loading }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">大小</span><span lang="en-US">Size</span></h4>
      <mp-space align="center" justify="space-between">
        <mp-loading size="sm" />
        <mp-loading type="cube" size="sm" />
        <mp-loading type="wave" size="sm" />
        <mp-loading type="rect" size="sm" />
        <mp-loading type="disappear" size="sm" />
        <mp-loading :size="32" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="color">
      <h4><span lang="zh-CN">颜色</span><span lang="en-US">Color</span></h4>
      <mp-space align="center" justify="space-between">
        <mp-loading color="var(--mp-color-info)" />
        <mp-loading type="cube" color="var(--mp-color-success)" />
        <mp-loading type="wave" color="var(--mp-color-warning)" />
        <mp-loading type="rect" color="var(--mp-color-danger)" />
        <mp-loading type="disappear" color="var(--mp-color-text-disabled)" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="type">
      <h4><span lang="zh-CN">类型</span><span lang="en-US">Type</span></h4>
      <mp-space align="center" justify="space-between">
        <mp-loading />
        <mp-loading type="cube" />
        <mp-loading type="wave" />
        <mp-loading type="rect" />
        <mp-loading type="disappear" />
      </mp-space>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
  .loading-demo .mp-space {
    padding: 8px 0;
  }
}
.demo-comparison-case--2 {
  .loading-demo .mp-space {
    padding: 8px 0;
  }
}
.demo-comparison-case--3 {
  .loading-demo .mp-space {
    padding: 8px 0;
  }
}
</style>
```

## Layout and arrangement

### Wrap

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `tip` | Tip of the loading | Wrap |
| `loading` | Specify whether loading is active | Wrap |
<!-- demo-config-notes:end -->


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

## Content and presentation

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
    <mp-switch v-model="simpleDirectiveLoading" edit-mode="direct" />
    <mp-card
      v-mp-loading="simpleDirectiveLoading"
      title="介绍"
      description="v-mp-loading 会在当前容器内渲染 Loading 遮罩，不会改变内容结构。"
    />

    <h4 class="loading-demo__title">复杂配置</h4>
    <mp-switch v-model="configuredDirectiveLoading" edit-mode="direct" />
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

## Usage notes

### Icons and status messages

A numeric `size` sets the custom indicator container's font size in pixels. Named sizes control built-in animations. Custom icons inherit the `--mp-loading-indicator-size` font size (20px by default): `1em` children scale with it, while SVGs with fixed pixel dimensions keep their own size. Use the `icon` slot for graphics and `tip` or its slot for status text.

Standalone Loading has `role="status"`, `aria-live="polite"` and `aria-atomic="true"`. Without a tip it includes localized visually hidden status text, even when the icon is hidden. Wrapper mode retains `aria-busy`. The directive sets `aria-busy="true"` on the original host and restores its previous value on cleanup, preserving a later external change.

Assistive technology may defer announcements within a busy region. For business start, completion or failure messages, maintain a persistent status region outside the busy region and update its text. The overlay does not disable keyboard interaction. See [WAI-ARIA `aria-busy`](https://www.w3.org/TR/wai-aria-1.2/#aria-busy) and [ARIA22 status messages](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22).
### Configuration

The loading-directive mask prevents default click behavior and propagation. Clicking it does not activate Card or ordinary parent click handlers. Normal clicking resumes after loading. It does not disable keyboard access to underlying controls; set those controls’ `disabled` props to block all interaction.

### Overlay styles

Content-overlay class: `.mp-loading__content-overlay`.

Each directive update replaces the complete configuration; omitted options and boolean `true` use defaults. Changing `fullscreen` while loading moves the overlay between the host and its owner document body. Host children stay in place. Multiple `fullscreen` instances share a counted scroll lock: closing a local instance does not unlock `fullscreen` instances, and the final `fullscreen` instance preserves an existing external lock class.

## API

### Loading Props

| Prop | Description | Type | Default |
| --------- | ------------------------------------------------------------------ | ------------------ | -------- |
| `color` | Loading color | _string_ | `-` |
| `type` | Can be set to `circle` `wave` `cube` `rect` `disappear` | _string_ | `circle` |
| `size` | Can be set to `xs` `sm` `md` `lg` `xl`, or a number | _string \| number_ | `md` |
| `tip` | Tip of the loading | _string_ | `-` |
| `loading` | Specify whether loading is active | _boolean_ | `false` |
| `radius` | Set radius size when the `type` is `circle` | _string \| number_ | `-` |
| `hide-icon` | Whether to hide the loading indicator | _boolean_ | `false` |

### Loading Slots

| Slot | Description | Prop |
| --------- | ---------------------- | ---- |
| `default` | Content wrapped in `loading` | `-` |
| `tip` | Tip of the `loading` | `-` |
| `icon` | Custom loading indicator | `-` |

The `icon` slot replaces every built-in `type` animation instead of rendering alongside it. `hide-icon=true` hides all indicators while allowing tip content to remain visible.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-loading-color` | `var(--mp-color-primary)` | `background-color`, `color` |
| `--mp-loading-desc-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-loading-desc-margin` | `8px 0 0` | `margin` |
| `--mp-loading-directive-z-index` | `2000` | `z-index` |
| `--mp-loading-indicator-size` | `20px` | `font-size` |
| `--mp-loading-opacity` | `0.38` | `opacity` |
| `--mp-loading-overlay-background` | `color-mix(in srgb, var(--mp-color-bg-white) 62%, transparent)` | `background` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-loading-color: var(--mp-color-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Overlay styles

| Variable | Description |
| --- | --- |
| `--mp-loading-overlay-background` | Directive overlay background; the background option overrides this value. |
