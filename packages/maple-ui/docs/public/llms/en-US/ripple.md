<!-- Source: src/ripple/docs/en-US.md; locale: en-US; page: /en-US/ripple -->

# Ripple Directive

Current-source revalidation,2026-10-16:36 Ripple tests pass,including11 dispatch/12 motion/three mouse cases;pre/post hashes match. Mouse press,document release,blur and touch-compatibility suppression are controlled evidence,not a new product repair or trusted-input acceptance. The800ms Date.now gate adds no timer/CSS duration. Classification hash is manually reviewed;adoption/OS boundaries remain separate.

## Examples

### Intro

When the element is clicked, a water wave spreading effect is generated.

### Basic Usage

Supports touch, the primary mouse button, and Enter/Space on the host. Mouse waves start at the press position and release on mouseup in the owning document or window blur. Non-primary and touch-generated compatibility mouse events are ignored; an 800ms window after touch is the fallback when sourceCapabilities is unavailable. Keyboard waves start at the center; use native buttons. Simulator clicks do not certify real touch behavior.

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

### Longer motion tokens

Example source: src/ripple/example/demos/motion-token.vue

```vue
<script setup>
defineProps({ english: Boolean })
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

MapleResolver directive resolution automatically imports `@maple-design/ui/ripple/style`. When registering Ripple without the resolver, explicitly import that style in the application entry. Runtime code does not import CSS, so the package can be imported on the server. Unmounting or disabling cancels pending animations; keyboard state belongs to each instance.

## API

### Options

| Option | Description | Type | Default | 
| --- | --- | --- | --- | 
| `color` | `currentColor` | _string_ | `currentColor` |
| `disabled` | Whether to disable ripple | _boolean_ | `false` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--mp-ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` |
| `--mp-ripple-color` | `currentColor` |


### Governed defaults

| Token | Default |
| --- | --- |
| `--mp-ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` |

### Motion tokens

| Token | Default |
| --- | --- |
| `--mp-ripple-expand-duration` | `200ms` |
| `--mp-ripple-fade-duration` | `140ms` |

expand-duration controls transform expansion with cubic-bezier easing; fade-duration controls opacity appearing/fading with linear easing. Set tokens on the actual directive host for generated waves to inherit; the color option overrides ripple-color. Both platforms retain 200ms/140ms defaults.

The two 250ms policies are minimum display and removal grace, not visual durations or total lifetime. Runtime reads resolved duration/delay: fade waits until the later of creation+250ms or activation+transform timing; deletion waits max(250ms, opacity timing). Longer 600ms/800ms overrides are not truncated. Explicit 0ms or missing CSS retains cleanup floors. prefers-reduced-motion: reduce hides decorative waves without changing host business events. Timing is sampled at creation/activation and fade start; arbitrary mid-flight CSS changes and custom animation are caller-owned.

Repeated release is deduplicated. Disable/unmount cancels owned timers/direct wave children, preserving nested instances. Document listeners use the mounted ownerDocument; cross-document adoption rebinding is not covered. Only host Enter/Space and matching keyup or blur participate. The directive does not grant button semantics, keyboard interactivity or accessible names to a div. Real touch-device and OS preference switching remain unverified.

### Independent same-source directive

Cedar and Maple independently maintain the same directive body and animation/keyboard lifecycle. Package imports, namespaces and token defaults remain local. The copy gate also compiles both real style entries and checks token declarations and consumption; style imports are not runtime behavior differences.
