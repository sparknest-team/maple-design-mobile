<!-- Source: src/skeleton/docs/en-US.md; locale: en-US; page: /en-US/skeleton -->

# Skeleton

### Intro

Display some space occupying elements with transition effect to optimize the loading process.

## Basic examples

### Basic Usage

Example source: src/skeleton/example/demos/basic-usage.vue

```vue
<script setup>
import SkeletonBasicExample from '../Basic.vue'
</script>

<template>
  <SkeletonBasicExample />
</template>
```

## Content and presentation

### Skeleton content shapes

Compare text-row placeholders with avatar and card shapes according to the final content layout.

Example source: src/skeleton/example/demos/content-comparison.vue

```vue
<script setup lang="ts">
import SkeletonCardExample from '../AvatarAndCard.vue'
import SkeletonRowsExample from '../TitleAndRows.vue'
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="custom-rows-width">
      <h4><span lang="zh-CN">自定义段落宽度</span><span lang="en-US">Custom Rows Width</span></h4>
      <SkeletonRowsExample />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="display-card">
      <h4><span lang="zh-CN">显示卡片</span><span lang="en-US">Display Card</span></h4>
      <SkeletonCardExample />
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
</style>
```

### Animation

Example source: src/skeleton/example/demos/animation.vue

```vue
<script setup>
import SkeletonAnimationExample from '../Animation.vue'
</script>

<template>
  <SkeletonAnimationExample />
</template>
```

### Fullscreen Mode

The demo restores content after two seconds using its own timer. Skeleton neither fetches data nor finishes loading automatically; control `loading` from the result of your application request.

Example source: src/skeleton/example/demos/fullscreen-mode.vue

```vue
<script setup>
import SkeletonFullscreenExample from '../Fullscreen.vue'
</script>

<template>
  <SkeletonFullscreenExample />
</template>
```

## Customization and slots

### Custom Template

Example source: src/skeleton/example/demos/custom-template.vue

```vue
<script setup>
import SkeletonCustomTemplateExample from '../CustomTemplate.vue'
</script>

<template>
  <SkeletonCustomTemplateExample />
</template>
```

## API

### Skeleton Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Loading Status Set to `true` to turn on the skeleton | _boolean_ | `true` |
| `animation` | Whether to enable the shimmer animation | _boolean_ | `true` |
| `title` | Whether to display the title | _boolean_ | `false` |
| `card` | Whether to display the card | _boolean_ | `false` |
| `avatar` | Whether to display the avatar | _boolean_ | `false` |
| `fullscreen` | Whether to enable fullscreen mode | _boolean_ | `false` |
| `fullscreen-z-index` | Fullscreen mode z-index | _string \| number_ | `100` |
| `title-width` | Title placeholder width; falls back to the theme variable, `50%` by default | _string \| number_ | `-` |
| `card-height` | Card placeholder height; falls back to the theme variable, `160px` by default | _string \| number_ | `-` |
| `avatar-size` | Avatar placeholder size; falls back to the theme variable, `34px` by default | _string \| number_ | `-` |
| `rows` | The paragraph number of rows | _string \| number_ | `3` |
| `rows-width` | The width of each line of a paragraph | _Array<number \| string>_ | `[]` |

### Skeleton Slots

| Slot | Description | Prop |
| --- | -- | --- |
| `default` | Content not loaded | `-` |
| `template` | Custom loading placeholder | `-` |

The package also exports `SkeletonLine` and `SkeletonShape`, available as `Skeleton.Line` and `Skeleton.Shape` for custom templates.


### SkeletonLine Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `rows` | Row count; non-finite and negative values become zero, fractions are rounded down | _number_ | `1` |
| `widths` | Individual row widths; numbers are pixels | _Array<number \| string>_ | `[]` |
| `line-height` | Line height in pixels | _number_ | `20` |
| `line-spacing` | Line spacing in pixels | _number_ | `15` |

### SkeletonShape Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `shape` | Placeholder shape | _'square' \| 'circle'_ | `square` |
| `size` | Placeholder size, controlled by theme variables | _'sm' \| 'md' \| 'lg'_ | `md` |

Line and Shape have no dedicated events, slots or instance methods; native attributes fall through. The main component has no dedicated instance methods.

## Usage notes





Built-in motion respects `prefers-reduced-motion: reduce`, keeping content and state feedback while disabling decorative animations. Adapt custom animations to that preference in your application.

Built-in Skeleton placeholders and standalone Line/Shape primitives default to `aria-hidden="true"`. The root exposes waiting through `aria-busy`. Custom `template` content and the loaded default content remain accessible and can supply business status messages.

### Fullscreen coverage

`fullscreen` renders an inline `position: fixed` placeholder without automatically teleporting to body. It covers the viewport when no ancestor establishes a fixed positioning containing block. An ancestor with `transform`, a relevant `will-change`, or `contain` may limit coverage to that ancestor. To cover the viewport, place Skeleton outside those ancestors or arrange its position with Vue Teleport in the application. This loading placeholder does not manage modal focus. See [CSS Positioned Layout fixed containing blocks](https://www.w3.org/TR/css-position-3/#fixed-cb).

Omitted size props use their theme tokens. A `-` in the table means there is no Prop default, rather than no placeholder size. Both Line and the main component normalize non-finite and negative row counts to zero and round fractions down.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-skeleton-animation-background` | `linear-gradient(90deg, transparent, var(--mp-sys-color-surface-default), transparent)` | `background` |
| `--mp-skeleton-animation-duration` | `1s` | `animation` |
| `--mp-skeleton-avatar-background-color` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-skeleton-avatar-border-radius` | `50%` | `border-radius` |
| `--mp-skeleton-avatar-margin-right` | `var(--mp-sys-space-6)` | `margin-inline-end` |
| `--mp-skeleton-avatar-size` | `34px` | `height`, `width` |
| `--mp-skeleton-card-background-color` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-skeleton-card-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-skeleton-card-height` | `160px` | `height` |
| `--mp-skeleton-card-margin-bottom` | `var(--mp-sys-space-6)` | `margin-bottom` |
| `--mp-skeleton-content-padding` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-skeleton-row-border-radius` | `10px` | `border-radius` |
| `--mp-skeleton-row-height` | `12px` | `height` |
| `--mp-skeleton-row-margin-top` | `10px` | `margin-top` |
| `--mp-skeleton-shape-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-skeleton-shape-size-lg` | `60px` | `height`, `width` |
| `--mp-skeleton-shape-size-md` | `48px` | `height`, `width` |
| `--mp-skeleton-shape-size-sm` | `36px` | `height`, `width` |
| `--mp-skeleton-title-background-color` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-skeleton-title-border-radius` | `10px` | `border-radius` |
| `--mp-skeleton-title-width` | `50%` | `width` |
| `--mp-skeleton-transition-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-skeleton-animation-background: linear-gradient(90deg, transparent, var(--mp-sys-color-surface-default), transparent);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
