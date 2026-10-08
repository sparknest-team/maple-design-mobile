# Ripple Directive

### Intro

When the element is clicked, a water wave spreading effect is generated.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Custom Color

```demo
../example/demos/custom-color.vue
```

### Disabled Status

```demo
../example/demos/disabled-status.vue
```

### Styles

MapleResolver directive resolution automatically imports `@maplejs/maple-ui/ripple/style`. When registering Ripple without the resolver, explicitly import that style in the application entry. Runtime code does not import CSS, so the package can be imported on the server. Unmounting or disabling cancels pending animations; keyboard state belongs to each instance.

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
| `--ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` |
| `--ripple-color` | `currentColor` |


### Governed defaults

| Token | Default |
| --- | --- |
| `--mp-ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` |

### Motion tokens

| Token | Default |
| --- | --- |
| `--mp-ripple-expand-duration` | `200ms` |
| `--mp-ripple-fade-duration` | `140ms` |

Built-in motion honors prefers-reduced-motion: reduce. State/content remain visible; decorative spin, shimmer and ripple are suppressed. Icon name changes skip delays and cancel pending transitions. Ripple duration tokens control CSS only: its 250ms lifecycle timers are unchanged, so keep each visual duration at or below 250ms. Custom animation classes remain the caller’s responsibility.
