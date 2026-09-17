# CountTo

### Introduction

Display a number animation transitioning from a start value to a target value.

### Basic Usage

The `from` and `to` attributes specify the start and target values.

```demo
../example/demos/basic-usage.vue
```

### Precision

Controlling numerical precision with `precision`

```demo
../example/demos/precision.vue
```

### Custom Duration

The `duration` attribute specifies the animation duration in milliseconds.

```demo
../example/demos/custom-duration.vue
```

### Custom Styles

```demo
../example/demos/custom-style.vue
```

### Custom Animation Curve

The `timing-function` attribute specifies the animation curve.

```demo
../example/demos/custom-animation-curve.vue
```

### Manual Control

You can call the `start`, `pause`, and `reset` methods to manually control the start, pause, and reset of the animation.

```demo
../example/demos/manual-control.vue
```

## API

### Props

| Prop         | Description                      | Type               | Default        |
| ------------ | ---------------------------------------- | ------------------ | ------- |
| `from`       | Start value                              | _number \| string_ | `0`     |
| `to`         | Target value                             | _number \| string_ | `0`     |
| `duration`   | Animation duration (ms)                  | _number \| string_ | `2000` |
| `precision`   | Precision                  | _number \| string_ | `0` |
| `auto-start` | Whether to start animation automatically | _boolean_          | `true`  |
| `timing-function` | Animation curve      | _(v: number) => number_          | `-`  |

### Events

| Event    | Description                     | Arguments            |
| ---------- | ----------------------------- | ------------------- |
| `end` | Triggered when animation ends | `-`                 |

### Slots

| Name      | Description    | SlotProps            |
| --------- | -------------- | ------------------------ |
| `default` | Custom content | `value: number` |

### Methods

| Method | Description	 | Arguments | Return |
| ------- | ------------------------------------------------------------------------------------ | --------- | ------ |
| `start` | Start the animation                                                                  | `-`       | `-`    |
| `pause` | Pause the animation                                                                  | `-`       | `-`    |
| `reset` | Reset the animation. If `auto-start` is `true`, the animation will restart automatically | `-`       | `-`    |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--mp-count-to-text-color`     | `var(--mp-color-text)`   |
| `--mp-count-to-text-font-size` | `var(--mp-font-size-lg)` |
