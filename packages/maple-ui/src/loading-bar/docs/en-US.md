# LoadingBar

Timer callbacks and both width/opacity render continuations consume once under their original generation. Restart invalidates old work; duplicate progress cannot advance twice. If computed-style lookup restarts loading, old hide/unmount scheduling cannot adopt the new generation. The200ms cadence, finishDelay, default250ms transition and300/250ms cleanup floors stay unchanged. nextTick is logically invalidated, not physically removed. The2026-10-15 targeted10/full22 tests are controlled service-DOM/clock evidence, not new native browser/OS acceptance.

The service uses --mp-loading-bar-transition-duration (250ms) and --mp-loading-bar-transition-timing-function (ease) for width/opacity/background-color. Apply tokens to its real html/body ancestor, not a business card. Reduce disables transitions, not progress/cleanup. After DOM flush, hiding waits max(300ms, resolved width duration+delay); unmounting waits max(250ms, resolved opacity duration+delay). The 200ms show/tick and cleanup floors are scheduling policies, not CSS tokens; later arbitrary CSS changes/custom animation are not promised.

Repeated finish is deduplicated; start/error cancel obsolete tasks. Completion unmounts the service and the next load remounts. setDefaultOptions replaces the full configuration and resetDefaultOptions clears owned settings. SSR calls create no DOM/timers.

## Examples

### Intro

Display loading progress at the top of the page.

### Basic Usage

```demo
../example/demos/basic.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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
| `--mp-loading-bar-transition-duration` | `250ms` |
| `--mp-loading-bar-transition-timing-function` | `ease` |

Theme variables must be placed on the actual DOM ancestor after Teleport. Content-local variables do not propagate to outer service containers.
