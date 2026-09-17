# Slider

### Intro

Used to take values within a given range.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Step Size

Set step increment by `step`.

```demo
../example/demos/step-size.vue
```

### Dual Thumbs

Open the double slider mode through the `range` attribute. Make sure the `value` is an array.

```demo
../example/demos/dual-thumb.vue
```

### Range

```demo
../example/demos/range.vue
```

### Disable

```demo
../example/demos/disable.vue
```

### Readonly

```demo
../example/demos/readonly.vue
```

### Slider Size

Control the size of slider through `track-height` and `thumb-size`.

```demo
../example/demos/slider-size.vue
```

### Custom Style

```demo
../example/demos/custom-style.vue
```

### Custom Button

The props such as `label-visible`, `label-text-color`, `thumb-size` are invalid when using slot custom buttons.

```demo
../example/demos/custom-btn.vue
```

### Show Label
Control the display of labels through the `label-visible` attribute.



> For form validation of the slider, please use the [FormItem component](#/en-US/form-item).

```demo
../example/demos/show-label.vue
```

### Vertical

Set the `orientation` attribute value to `vertical` to make the slider display vertically.

```demo
../example/demos/vertical.vue
```

## API

### Props

| Prop | Description                                                              | Type | Default |
| ----- |--------------------------------------------------------------------------| -------- | ---------- |
| `v-model` | The value of slider                                                      | _number \| [number, number]_ | `0` |
| `step`| Step size. The value must greater than 0                                 | _string \| number_ | `1` |
| `range`| Whether open the dual thumb mode                                         | _boolean_ | `false` |
| `max` | The maximum value the slider can slide to                                | _string \| number_ | `100`           |
| `min` | The minimum value the slider can slide to                                | _string \| number_ | `0`           |
| `label-visible` | Whether to display labels, the optional value is `always, normal, never` | _string_ | `normal` |
| `label-text-color` | Color of label text                                                      | _string_ | `-` |
| `label-color`  | Background color of label                                                | _string_ | `-`               |
| `active-color` | Background color of actived track                                        | _string_ | `-`               |
| `track-color`  | Background color of track                                                | _string_ | `-`               |
| `track-height` | Height of track                                                          | _string \| number_ | `-` |
| `thumb-size` | Size of thumb                                                            | _string \| number_ | `-` |
| `thumb-color`   | Background color of thumb                                                | _string_ | `-`               |
| `disabled`| Whether to disable slider                                                | _boolean_  | `false` |
| `readonly`| Whether to readonly slider                                               | _boolean_  | `false` |
| `orientation` | Direction of slider, Can be set to `vertical horizontal`                           | _string_ | `horizontal` |
### Events

| Event | Description | arguments |
| ----- | -------- | -------- |
| `change` |  Emitted after slider changed | `value`: current value |
| `start` | Emitted when start dragged | `-` |
| `end` | Emitted when end dragged | `value`: current value |

### Slots

| Name | Description | SlotProps |
| ----- | -------------- | -------- |
| `button` | Custom button | `currentValue`: current value |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--slider-error-color` | `var(--color-danger)` |
| `--slider-track-background` | `#bdbdbd` |
| `--slider-track-height` | `2px` |
| `--slider-track-border-radius` | `0` |
| `--slider-track-fill-border-radius` | `0` |
| `--slider-track-fill-background` | `var(--color-primary)` |
| `--slider-thumb-block-background` | `var(--color-primary)` |
| `--slider-thumb-ripple-background` | `var(--color-primary)` |
| `--slider-thumb-label-background` | `var(--color-primary)` |
| `--slider-thumb-label-font-size` | `var(--font-size-sm)` |
| `--slider-thumb-label-text-color` | `var(--color-white)` |
| `--slider-thumb-size` | `12px` |
| `--slider-disabled-opacity` | `var(--opacity-disabled)` |
