<!-- Source: src/notice-bar/docs/en-US.md; locale: en-US; page: /en-US/notice-bar -->

# NoticeBar

### Intro

Display temporary system notices or campaign messages.

## Basic examples

### Basic Usage

Example source: src/notice-bar/example/demos/basic.vue

```vue
<template>
  <div class="notice-bar-example">
    <mp-notice-bar text="这是一条通知信息" />
    <mp-notice-bar style="margin-top: 12px" type="info" text="信息提示" />
    <mp-notice-bar style="margin-top: 12px" mode="closeable" text="可关闭通知" />
    <mp-notice-bar style="margin-top: 12px" scrollable text="这是一条很长很长的通知，将会横向滚动播放。" />
  </div>
</template>
```

### Pause scrolling

Use `paused` with an action button to let readers pause and resume. When the system requests reduced motion, content wraps without animation.

`speed` is measured in CSS pixels per second. The cycle is recalculated when the container, text, or slot content changes size; animation progress is retained, so the visible position may shift. Provide a pause button in `action` as shown below, or use `closeable` to let readers dismiss continuous motion.

Example source: src/notice-bar/example/demos/en-US/pausable.vue

```vue
<template>
  <mp-notice-bar scrollable :paused="paused" text="This notice can be paused so you can continue reading.">
    <template #action>
      <mp-button html-type="button" variant="text" :aria-pressed="paused" @click="paused = !paused">
        {{ paused ? 'Resume scrolling' : 'Pause scrolling' }}
      </mp-button>
    </template>
  </mp-notice-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const paused = ref(false)
</script>
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Icons, text and close actions follow reading order. Scrolling text moves from inline end toward start, reversing motion in RTL without mirroring text or changing close/replay event meanings.

Icon and close spacing use `--mp-notice-bar-icon-margin` and `--mp-notice-bar-close-margin`; RTL uses `--mp-notice-bar-icon-margin-rtl` and `--mp-notice-bar-close-margin-rtl`. The close control uses the nearest LocaleProvider, falling back to the global language.

String `speed` and `delay` values are parsed by their numeric prefix. Nonfinite speeds and speeds below 1 use 1 px/s; invalid or nonfinite delays use 0 seconds, while negative delays retain CSS animation semantics. Closing hides the component without unmounting it; remount it from the parent to show it again. Internal instance state and handlers are not public reopen or pause methods; use `paused` to pause.

## API

### NoticeBar Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `text` | Notice text | `string` | `-` |
| `type` | Type | `info \| success \| warning \| danger` | `warning` |
| `mode` | `closeable` shows close icon | `closeable` | `-` |
| `icon` | Left-icon name; empty string hides it | `string` | `info-circle` |
| `color` | Text color | `string` | `-` |
| `background` | Background color | `string` | `-` |
| `scrollable` | Enable marquee | `boolean` | `false` |
| `paused` | Pause the scrolling animation; resume from the current position when disabled | `boolean` | `false` |
| `speed` | Scroll speed (px/s) | `number \| string` | `50` |
| `delay` | Delay before scroll (s) | `number \| string` | `1` |

### NoticeBar Events

| Event | Description | Arguments |
| --- | --- | --- |
| `close` | Emitted on close | `event` |
| `replay` | Emitted after one scroll loop | `-` |

### NoticeBar Slots

| Name | Description |
| --- | --- |
| `default` | Content |
| `icon` | Left icon |
| `action` | Right action |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-notice-bar-close-margin` | `0 0 0 8px` | `margin` |
| `--mp-notice-bar-close-margin-rtl` | `0 8px 0 0` | `margin` |
| `--mp-notice-bar-danger-background` | `var(--mp-color-danger)` | `background` |
| `--mp-notice-bar-danger-color` | `var(--mp-color-white)` | `color` |
| `--mp-notice-bar-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-notice-bar-height` | `40px` | `min-height` |
| `--mp-notice-bar-icon-margin` | `0 8px 0 0` | `margin` |
| `--mp-notice-bar-icon-margin-rtl` | `0 0 0 8px` | `margin` |
| `--mp-notice-bar-icon-size` | `18px` | `font-size` |
| `--mp-notice-bar-info-background` | `var(--mp-color-info)` | `background` |
| `--mp-notice-bar-info-color` | `var(--mp-color-white)` | `color` |
| `--mp-notice-bar-padding` | `0 12px` | `padding` |
| `--mp-notice-bar-success-background` | `var(--mp-color-success)` | `background` |
| `--mp-notice-bar-success-color` | `var(--mp-color-white)` | `color` |
| `--mp-notice-bar-warning-background` | `var(--mp-color-warning)` | `background` |
| `--mp-notice-bar-warning-color` | `var(--mp-color-white)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-notice-bar-danger-background: var(--mp-color-danger);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
