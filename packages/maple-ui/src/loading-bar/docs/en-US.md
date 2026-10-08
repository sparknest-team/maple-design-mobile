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

## Public CSS variables

Normal/error strokes use readable content-brand/content-danger, not action/status fills: the thin bar must remain visible against ordinary surfaces. color/errorColor options override these defaults. Custom backdrops and colors require fresh contrast checks; height remains 3px.

| Variable | Default |
| --- | --- |
| `--mp-loading-bar-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-loading-bar-error-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-loading-bar-height` | `3px` |

Theme variables must be placed on the actual DOM ancestor after Teleport. Content-local variables do not propagate to outer service containers.
