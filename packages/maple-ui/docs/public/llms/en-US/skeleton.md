<!-- Source: src/skeleton/docs/en-US.md; locale: en-US; page: /en-US/skeleton -->

# Skeleton

## Examples

### Intro

Display some space occupying elements with transition effect to optimize the loading process.

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

### Custom Rows Width

Example source: src/skeleton/example/demos/custom-rows-width.vue

```vue
<script setup>
import SkeletonRowsExample from '../TitleAndRows.vue'
</script>

<template>
  <SkeletonRowsExample />
</template>
```

### Display Card

Example source: src/skeleton/example/demos/display-card.vue

```vue
<script setup>
import SkeletonCardExample from '../AvatarAndCard.vue'
</script>

<template>
  <SkeletonCardExample />
</template>
```

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

## API

### Props

| Prop | Description | Type | Default | 
| --- | --- | --- | --- | 
| `loading` | Loading Status Set to `true` to turn on the skeleton | _boolean_ | `true` |
| `animation` | Whether to enable the shimmer animation | _boolean_ | `true` |
| `title` | Whether to display the title | _boolean_ | `false` |
| `card` | Whether to display the card | _boolean_ | `false` |
| `avatar` | Whether to display the avatar | _boolean_ | `false` |
| `fullscreen` | Whether to enable fullscreen mode | _boolean_ | `false` |
| `fullscreen-z-index` | Fullscreen mode z-index | _string \| number_ | `100` |
| `title-width` | `50%` | _string \| number_ | `-` |
| `card-height` | `160px` | _string \| number_ | `-` |
| `avatar-size` | `34px` | _string \| number_ | `-` |
| `rows` | The paragraph number of rows | _string \| number_ | `3` |
| `rows-width` | The width of each line of a paragraph | _number[] \| string[]_ | `[]` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Content not loaded | `-` |
| `template` | Custom loading placeholder | `-` |

The package also exports `SkeletonLine` and `SkeletonShape`, available as `Skeleton.Line` and `Skeleton.Shape` for custom templates.

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--mp-skeleton-content-padding` | `var(--mp-sys-space-6)` |
| `--skeleton-card-height` | `160px` |
| `--skeleton-card-border-radius` | `4px` |
| `--skeleton-card-margin-bottom` | `16px` |
| `--skeleton-card-background-color` | `rgba(0, 0, 0, 0.12)` |
| `--skeleton-animation-background` | `linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0))` |
| `--skeleton-avatar-size` | `34px` |
| `--skeleton-avatar-border-radius` | `50%` |
| `--skeleton-avatar-margin-right` | `16px` |
| `--skeleton-avatar-background-color` | `rgba(0, 0, 0, 0.12)` |
| `--skeleton-title-width` | `50%` |
| `--skeleton-title-border-radius` | `10px` |
| `--skeleton-title-background-color` | `rgba(0, 0, 0, 0.12)` |
| `--skeleton-row-height` | `12px` |
| `--skeleton-row-border-radius` | `10px` |
| `--skeleton-row-margin-top` | `10px` |

### Governed defaults

| Token | Default |
| --- | --- |
| `--mp-skeleton-card-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-skeleton-card-margin-bottom` | `var(--mp-sys-space-6)` |
| `--mp-skeleton-card-background-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-skeleton-animation-background` | `linear-gradient(90deg, transparent, var(--mp-sys-color-surface-default), transparent)` |
| `--mp-skeleton-avatar-border-radius` | `50%` |
| `--mp-skeleton-avatar-margin-right` | `var(--mp-sys-space-6)` |
| `--mp-skeleton-avatar-background-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-skeleton-title-border-radius` | `10px` |
| `--mp-skeleton-title-background-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-skeleton-row-height` | `12px` |
| `--mp-skeleton-row-border-radius` | `10px` |
| `--mp-skeleton-row-margin-top` | `10px` |
| `--mp-skeleton-shape-size-sm` | `36px` |
| `--mp-skeleton-shape-size-md` | `48px` |
| `--mp-skeleton-shape-size-lg` | `60px` |
| `--mp-skeleton-shape-border-radius` | `var(--mp-sys-radius-md)` |

### Motion tokens

| Token | Default |
| --- | --- |
| `--mp-skeleton-animation-duration` | `1s` |
| `--mp-skeleton-transition-duration` | `var(--mp-sys-motion-duration-slow)` |

Built-in motion honors prefers-reduced-motion: reduce. State/content remain visible; decorative spin, shimmer and ripple are suppressed. Icon name changes skip delays and cancel pending transitions. Ripple duration tokens control CSS only: its 250ms lifecycle timers are unchanged, so keep each visual duration at or below 250ms. Custom animation classes remain the caller’s responsibility.
