# LoadingBar

Timer callbacks and both width/opacity render continuations consume once under their original generation. Restart invalidates old work; duplicate progress cannot advance twice. If computed-style lookup restarts loading, old hide/unmount scheduling cannot adopt the new generation. The200ms cadence, finishDelay, default250ms transition and300/250ms cleanup floors stay unchanged. nextTick is logically invalidated, not physically removed. The2026-10-15 targeted10/full22 tests are controlled service-DOM/clock evidence, not new native browser/OS acceptance.

The service uses --mp-loading-bar-transition-duration (250ms) and --mp-loading-bar-transition-timing-function (ease) for width/opacity/background-color. Apply tokens to its real html/body ancestor, not a business card. Reduce disables transitions, not progress/cleanup. After DOM flush, hiding waits max(300ms, resolved width duration+delay); unmounting waits max(250ms, resolved opacity duration+delay). The 200ms show/tick and cleanup floors are scheduling policies, not CSS tokens; later arbitrary CSS changes/custom animation are not promised.

Repeated finish is deduplicated; start/error cancel obsolete tasks. Completion unmounts the service and the next load remounts. setDefaultOptions replaces the full configuration and resetDefaultOptions clears owned settings. SSR calls create no DOM/timers.

### Intro

Display loading progress at the top of the page.

## Basic examples

### Basic Usage

```demo
../example/demos/basic.vue
```

## Reading direction

The loading bar grows from document reading start. Timing, progress and completion are preserved across direction changes; imperative calls use document direction.

## API

### Methods

| Method | Description | Arguments | Returns |
| --------------------- | ---------- | -- | --------- |
| `LoadingBar.start` | Start loading | `-` | `-` |
| `LoadingBar.finish` | Finish loading | `-` | `-` |
| `LoadingBar.error` | Loading error | `-` | `-` |
| `LoadingBar.setDefaultOptions` | Set default option configuration | _options: LoadingBarOptions_ | `-` |
| `LoadingBar.resetDefaultOptions` | Reset default option configuration | _-_ | `-` |

### LoadingBar Options

| Arguments | Description | Type | Default |
| -------------- | -------------- | ----------- | -------- |
| `color` | LoadingBar color | _string_ | `-` |
| `errorColor` | LoadingBar error color | _string_ | `-` |
| `height` | LoadingBar height | _string \| number_ | `-` |
| `top` | LoadingBar top | _string \| number_ | `-` |
| `finishDelay` ***3.3.13*** | The delay time of the finish function, which can be used to increase the duration of loading animation | _number_ | `-` |

## Public CSS variables

Ordinary/error progress bars use readable content-brand/content-danger rather than action/status fills, keeping thin lines visible on ordinary surfaces. color/errorColor override defaults. Recheck custom background/color contrast. Height remains 3px.

| Variable | Default |
| --- | --- |
| `--mp-loading-bar-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-loading-bar-error-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-loading-bar-height` | `3px` |
| `--mp-loading-bar-transition-duration` | `250ms` |
| `--mp-loading-bar-transition-timing-function` | `ease` |

Motion variables control width/opacity/background-color; reduce disables transitions. Finishing waits max(300ms, computed width duration+delay) before hiding, then max(250ms, opacity duration+delay) before unmounting. Long overrides are not truncated at 250ms; explicit zero retains cleanup floors. 200ms display/progress ticks are scheduling policy, not CSS tokens. Timing is sampled after DOM updates at each phase, without guaranteeing arbitrary mid-wait CSS changes/custom animations.

Repeated finish deduplicates; start/error cancel old tasks. Completion unmounts the service; the next call remounts it. setDefaultOptions replaces the entire config; resetDefaultOptions clears all options. SSR creates no DOM/timers.

After Teleport, theme variables follow actual DOM ancestors. Variables inside content do not propagate upward to service-created containers.
