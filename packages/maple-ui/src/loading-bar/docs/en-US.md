# LoadingBar

### Intro

Display loading progress at the top of the page.

### Basic Usage

```demo
../example/demos/basic.vue
```

## API

### Methods

| Method | Description | Arguments | Return |
|---------------------|----------|--|---------|
| `LoadingBar.start`  | Start loading  | `-` | `-` |
| `LoadingBar.finish` | Finish loading  | `-` | `-` |
| `LoadingBar.error`  | Loading error  | `-` | `-` |
| `LoadingBar.setDefaultOptions` | Set default option configuration | _options: LoadingBarOptions_ | `-` |
| `LoadingBar.resetDefaultOptions` | Reset default option configuration | _-_ | `-` |

### LoadingBar Options

| Option       | Description            | Type | Default |
|--------------|------------------------|-----------|--------|
| `color`      | LoadingBar color       | _string_  | `-`    |
| `errorColor` | LoadingBar error color | _string_  | `-`    |
| `height`     | LoadingBar height      | _string \| number_ | `-` |
| `top`        | LoadingBar top         | _string \| number_ | `-` |
| `finishDelay` ***3.3.13*** | The delay time of the finish function, which can be used to increase the duration of loading animation | _number_ | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- |------------------------|
| `--loading-bar-color` | `var(--color-primary)` |
| `--loading-bar-error-color` | `var(--color-danger)`  |
| `--loading-bar-height` | `3px`                  |
