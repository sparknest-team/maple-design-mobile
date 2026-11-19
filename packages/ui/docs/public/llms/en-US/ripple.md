<!-- Source: src/ripple/docs/en-US.md; locale: en-US; page: /en-US/ripple -->

# Ripple Directive

### Intro

When the element is clicked, a water wave spreading effect is generated.

## Basic examples

### Basic Usage

Supports touch, primary mouse clicks and host Enter / Space. Mouse ripples expand from the press location and end on release or window blur. Nonprimary buttons and compatibility mouse events after touch are ignored. Keyboard ripples expand from the center; use native buttons for interactive hosts.

Example source: src/ripple/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <div v-ripple class="ripple-example__block mp-elevation--2">点击</div>
</template>

<style lang="less" scoped>
@import '../../../style/elevation.less';

.ripple-example__block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  background-color: var(--mp-color-fill-3);
  transition: background-color 0.25s;
}
</style>
```

## Appearance and states

### Custom Color

Example source: src/ripple/example/demos/custom-color.vue

```vue
<script setup></script>

<template>
  <div v-ripple="{ color: 'var(--mp-color-warning)' }" class="ripple-example__block mp-elevation--2">点击</div>
</template>

<style lang="less" scoped>
@import '../../../style/elevation.less';

.ripple-example__block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  background-color: var(--mp-color-fill-3);
  transition: background-color 0.25s;
}
</style>
```

### Disabled Status

Example source: src/ripple/example/demos/disabled-status.vue

```vue
<script setup></script>

<template>
  <div v-ripple="{ disabled: true }" class="ripple-example__block mp-elevation--2">点击</div>
</template>

<style lang="less" scoped>
@import '../../../style/elevation.less';

.ripple-example__block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  background-color: var(--mp-color-fill-3);
  transition: background-color 0.25s;
}
</style>
```

## Content and presentation

### Longer motion tokens

Example source: src/ripple/example/demos/motion-token.vue

```vue
<script setup>
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
</script>

<template>
  <div v-ripple role="button" tabindex="0" class="ripple-motion-demo">
    {{ english ? '600ms expansion / 800ms fading — Enter or Space' : '600ms 扩散／800ms 消退 — Enter 或 Space' }}
  </div>
</template>

<style scoped>
.ripple-motion-demo {
  --mp-ripple-expand-duration: 600ms;
  --mp-ripple-fade-duration: 800ms;
  position: relative;
  max-width: 100%;
  height: auto;
  white-space: normal;
  overflow: hidden;
  padding: 16px;
  color: var(--mp-sys-color-content-primary);
  background: var(--mp-sys-color-surface-default);
  border: 1px solid var(--mp-sys-color-border-default);
}
</style>
```

### Styles

MapleResolver directive resolution automatically imports `@maple-design/ui-vue/ripple/style`. When registering Ripple without the resolver, explicitly import that style in the application entry. Runtime code does not import CSS, so the package can be imported on the server. Unmounting or disabling cancels pending animations; keyboard state belongs to each instance.

## Usage notes

### Motion

Repeated release does not duplicate work. Disabling/unmounting cleans owned timers/direct child ripples without removing nested instances. Document listeners bind to the mount-time ownerDocument; rebinding after cross-document movement is out of scope. Enter/Space activate on this host and end only on matching keyup/blur. Plain divs must provide their own interactive semantics, keyboard behavior and accessible names; v-ripple supplies none.

## API

### Ripple Options

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `color` | `currentColor` | _string_ | `currentColor` |
| `disabled` | Whether to disable ripple decoration | _boolean_ | `false` |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-ripple-color` | `currentColor` | `background-color` |
| `--mp-ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` | `transition` |
| `--mp-ripple-expand-duration` | `200ms` | `transition` |
| `--mp-ripple-fade-duration` | `140ms` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-ripple-color: currentColor;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Motion

expand-duration controls transform expansion; cubic-bezier controls its easing. fade-duration controls linear opacity appearance/disappearance. Put variables on the actual directive host so generated ripples inherit them. color overrides ripple-color. Both platforms default to 200ms/140ms.

250ms is the minimum display/post-fade cleanup wait, not visual duration or the complete lifecycle. Runtime reads computed ripple duration/delay. Fade starts no earlier than the later of creation+250ms or activation+expansion duration; deletion waits max(250ms, fade duration). 600ms/800ms overrides are not truncated. 0ms/unstyled cases retain cleanup floors. prefers-reduced-motion: reduce hides decorative ripples without changing host events. Expansion is sampled at creation/activation; fade at fade start. Arbitrary midphase CSS changes/custom animations are not guaranteed.

The binding type `RippleDirectiveValue` is exported from the package root and Ripple entry, with optional `color` and `disabled` fields. Color changes affect subsequently created waves. `disabled` controls decoration only; it does not disable the host. Global `Context.enableRipple` prevents new waves while existing waves finish normally. During animation the directive temporarily sets clipping and, when needed, positioning and stacking styles. When the final wave ends, or on disable or unmount, it restores styles it still owns and preserves values changed by application code. Coordinates account for axis-aligned scaling; rotation and skew are not guaranteed.
