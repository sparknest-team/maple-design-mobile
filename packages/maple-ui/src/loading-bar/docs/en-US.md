# LoadingBar

CSS motion variables control progress-bar and fade transitions. Completion and cleanup wait for the visual transition; CSS styling does not control progress-update timing.

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

The loading bar grows from the document's inline start. Direction changes do not alter timers, progress or completion. Programmatic calls use document direction.

## Usage notes

### Configuration

Repeated finish deduplicates; start/error cancel old tasks. Completion unmounts the service; the next call remounts it. setDefaultOptions replaces the entire config; resetDefaultOptions clears all options. SSR creates no DOM/timers.

After Teleport, theme variables follow actual DOM ancestors. Variables inside content do not propagate upward to service-created containers.

When importing on demand, also import `@maple-design/ui/loading-bar/style`, or use the full stylesheet `@maple-design/ui/style`.

## API

### LoadingBar Methods

| Method | Description | Arguments | Returns |
| --------------------- | ---------- | -- | --------- |
| `LoadingBar.start` | Start loading | `-` | `-` |
| `LoadingBar.finish` | Finish loading | `-` | `-` |
| `LoadingBar.error` | Loading error | `-` | `-` |
| `LoadingBar.setDefaultOptions` | Set default option configuration | _options: LoadingBarOptions_ | `-` |
| `LoadingBar.resetDefaultOptions` | Reset default option configuration | _-_ | `-` |

### LoadingBar Options

Use `LoadingBarOptions` for service configuration; `LoadingBarProps` describes internal view props and does not include `finishDelay`.

| Prop | Description | Type | Default |
| -------------- | -------------- | ----------- | -------- |
| `color` | LoadingBar color | _string_ | `-` |
| `errorColor` | LoadingBar error color | _string_ | `-` |
| `height` | LoadingBar height | _string \| number_ | `-` |
| `top` | LoadingBar top | _string \| number_ | `-` |
| `finishDelay` ***3.3.13*** | The delay time of the finish function, which can be used to increase the duration of loading animation | _number_ | `-` |

## CSS Variables

Ordinary/error progress bars use readable content-brand/content-danger rather than action/status fills, keeping thin lines visible on ordinary surfaces. color/errorColor override defaults. Recheck custom background/color contrast. Height remains 3px.

Motion variables control width/opacity/background-color; reduce disables transitions. Finishing waits max(300ms, computed width duration+delay) before hiding, then max(250ms, opacity duration+delay) before unmounting. Long overrides are not truncated at 250ms; explicit zero retains cleanup floors. 200ms display/progress ticks are scheduling policy, not CSS tokens. Timing is sampled after DOM updates at each phase, without guaranteeing arbitrary mid-wait CSS changes/custom animations.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-loading-bar-color` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-loading-bar-error-color` | `var(--mp-sys-color-content-danger)` | `background-color` |
| `--mp-loading-bar-height` | `3px` | `height` |
| `--mp-loading-bar-transition-duration` | `250ms` | `transition` |
| `--mp-loading-bar-transition-timing-function` | `ease` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-loading-bar-color: var(--mp-sys-color-content-brand);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
