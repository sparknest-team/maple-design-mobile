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

## API

### Props

| Arguments | Description | Type | Default |
| ------------ | -------------------------- | ------------------ | ------- |
| `from` | Start value | _number \| string_ | `0` |
| `to` | Target value | _number \| string_ | `0` |
| `duration` | Animation duration (ms) | _number \| string_ | `2000` |
| `precision` | Precision | _number \| string_ | `0` |
| `auto-start` | Whether to start animation automatically | _boolean_ | `true` |
| `timing-function` | Animation curve | _(v: number) => number_ | `-` |

### Events

| Event | Description | Callback arguments |
| ---------- | -------------- | -------- |
| `end` | Triggered when animation ends | `-` |

### Slots

| Slot | Description | Arguments |
| --------- | ---------- | ------------------------ |
| `default` | Custom content | `value: number` |

### Methods

| Method | Description | Arguments | Returns |
| ------- | --------------------------------------------------------- | ---- | ------ |
| `start` | Start the animation | `-` | `-` |
| `pause` | Pause the animation | `-` | `-` |
| `reset` | Reset the animation. If `auto-start` is `true`, the animation will restart automatically | `-` | `-` |

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| ----------------------------- | --- |
| `--mp-count-to-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-count-to-text-font-size` | `var(--mp-font-size-lg)` |

## Shared implementation and platform boundaries

Each platform maintains a complete local implementation. They do not import a common core or share component instances or reactive state. Changes must update both implementations. Component bodies, props, key styles and paired tests have read-only source consistency checks; theme tokens and installation entries remain local to each library.

Animation pauses on unmount and KeepAlive deactivation and resumes on reactivation. Each instance keeps independent values and animation state.
