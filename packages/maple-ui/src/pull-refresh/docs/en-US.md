# PullRefresh

Provides pull-to-refresh at the top of a list.

## Examples

### Basic Usage

```demo
../example/demos/basic.vue
```

## API

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
