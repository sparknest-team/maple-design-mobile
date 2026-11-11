# CountTo

### Introduction

Display a number animation transitioning from a start value to a target value.

## Basic examples

### Basic Usage

The `from` and `to` attributes specify the start and target values.

```demo
../example/demos/basic-usage.vue
```

## Content and presentation

### Precision, duration and easing

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `to` | Target value | Precision, duration and easing |
| `precision` | Precision | Precision, duration and easing |
| `duration` | Animation duration (ms) | Precision, duration and easing |
| `timing-function` | Animation curve | Precision, duration and easing |
<!-- demo-config-notes:end -->


Compare final precision and the effect of duration and easing on number transitions. Manual playback remains separate.

<details>
<summary>Configuration details and limits</summary>

#### Precision

Controlling numerical precision with `precision`

#### Custom Duration

The `duration` attribute specifies the animation duration in milliseconds.

#### Custom Animation Curve

The `timing-function` attribute specifies the animation curve.

</details>

```demo
../example/demos/number-format-comparison.vue
```

## Customization and slots

### Custom Styles

```demo
../example/demos/custom-style.vue
```

## Interaction and control

### Manual Control

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `to` | Target value | Manual Control |
| `auto-start` | Whether to start animation automatically | Manual Control |
<!-- demo-config-notes:end -->


You can call the `start`, `pause`, and `reset` methods to manually control the start, pause, and reset of the animation.

```demo
../example/demos/manual-control.vue
```

## Numeric and animation boundaries

### Scientific notation and decimal floor

Precision is an integer from -292 to 292. Fractional and nonfinite precision falls back to 0; out-of-range integers are clamped. Unsupported inputs produce a development prop warning. String precision keeps the existing parseFloat conversion. Negative precision rounds at tens/hundreds and larger decimal places. The result is a number rounded toward negative infinity, without trailing-zero padding, and may use scientific notation. Changing precision only reformats the current value. IEEE-754 representability still applies; animation values are not decimal accounting values.

```demo
../example/demos/decimal-floor.vue
```

### Zero duration and replay

```demo
../example/demos/zero-duration.vue
```

### Change easing and replay

Changing timing-function affects the next reset, including resets caused by from, to or duration changes. It does not restart the current animation. Pause/start resumes the existing curve; reset creates a fresh playback using the latest function. Clearing the function restores linear easing. A curve may reach the target early, but end still reports completion of the configured duration.

```demo
../example/demos/easing-replay.vue
```

## Animation duration boundaries

Duration is a finite nonnegative number of milliseconds. Zero reaches the target on the next frame. Negative, NaN and infinite values produce development prop diagnostics and safely behave as zero without continuing to request animation frames. Pausing or unmounting before that frame cancels completion. String durations retain parseFloat conversion. reset reads auto-start again. end remains a notification; its listener Promise is not awaited.

## API

String `from`, `to`, `duration`, and `precision` values use parseFloat, so `10px` parses as 10. Invalid or non-finite endpoints produce a warning and use 0. If the difference between finite endpoints overflows, the animation completes on the next frame. `precision` floors the numeric result toward negative infinity without padding zeros and accepts integers in the range [-292, 292]. `auto-start` is read on mount or reset; calling start after completion does not replay until reset.

### CountTo Props

| Prop | Description | Type | Default |
| ------------ | -------------------------- | ------------------ | ------- |
| `from` | Start value | _number \| string_ | `0` |
| `to` | Target value | _number \| string_ | `0` |
| `duration` | Animation duration (ms) | _number \| string_ | `2000` |
| `precision` | Precision | _number \| string_ | `0` |
| `auto-start` | Whether to start animation automatically | _boolean_ | `true` |
| `timing-function` | Animation curve | _(v: number) => number_ | `-` |

### CountTo Events

| Event | Description | Callback arguments |
| ---------- | -------------- | -------- |
| `end` | Triggered when animation ends | `-` |

### CountTo Slots

| Slot | Description | Prop |
| --------- | ---------- | ------------------------ |
| `default` | Custom content | `value: number` |

### CountTo Methods

| Method | Description | Arguments | Returns |
| ------- | --------------------------------------------------------- | ---- | ------ |
| `start` | Start the animation | `-` | `-` |
| `pause` | Pause the animation | `-` | `-` |
| `reset` | Reset the animation. If `auto-start` is `true`, the animation will restart automatically | `-` | `-` |

## Usage notes



Animation pauses on unmount and KeepAlive deactivation and resumes on reactivation. Each instance keeps independent values and animation state.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-count-to-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-count-to-text-font-size` | `var(--mp-font-size-lg)` | `font-size` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-count-to-text-color: var(--mp-sys-color-content-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
