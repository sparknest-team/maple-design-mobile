# PullRefresh

## Examples

### Basic Usage

```demo
../example/demos/basic.vue
```

## Timing and lifecycle

Provides pull-to-refresh at the top of a list.

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Model and default value

Use ordinary `v-model`. `modelValue` is the refresh loading state; the parent sets its bound value to false when asynchronous work completes. `defaultValue` initializes uncontrolled state only at creation; changing it later does not reset the current state. A supplied model takes precedence. Initialization emits no `update:modelValue`.

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Loading status | `boolean` | `-` |
| `disabled` | Disable pull-to-refresh | `boolean` | `false` |
| `target` | Scroll container. Defaults to the nearest scrollable ancestor | `string \| HTMLElement` | `-` |
| `animation-duration` | Rebound animation duration (ms) | `number \| string` | `300` |
| `success-duration` | Success state duration (ms) | `number \| string` | `2000` |
| `bg-color` | Indicator background | `string` | `-` |
| `color` | Indicator color | `string` | `-` |
| `success-bg-color` | Success indicator background | `string` | `-` |
| `success-color` | Success indicator color | `string` | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `refresh` | Fired when refresh starts | `-` |
| `update:model-value` | Fired when loading status changes | `(value: boolean)` |

### Slots

| Name | Description |
| --- | --- |
| `default` | List content |

## Style Variables

| Variable | Default |
| --- | --- |
| `--mp-pull-refresh-size` | `40px` |
| `--mp-pull-refresh-background` | `#fff` |
| `--mp-pull-refresh-color` | `var(--mp-color-primary)` |
| `--mp-pull-refresh-success-color` | `var(--mp-color-success)` |
| `--mp-pull-refresh-icon-size` | `25px` |
