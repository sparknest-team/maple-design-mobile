# Countdown

### Countdown business clock and deactivation

Countdown RAF refreshes business time, not visual interpolation; CSS duration/reduced motion must not alter the clock. Pause and KeepAlive deactivation freeze remaining duration; activation resumes that value without charging inactive time. Inactive time updates/reset may update data and emit change but schedule no RAF; auto-start is deferred to activation, and explicit pause cancels pending resume. Direct inactive start is ignored; disposed start/reset emit and schedule nothing.

Pausing or resetting cancels pending countdown updates. A newer start or reset takes precedence over an earlier update. end fires once per round; reset permits a new completion.

### Intro

For real-time display of countdown values, with millisecond precision.

`time` is remaining duration in milliseconds. To align with a deadline, pass `deadline - Date.now()`.

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Content and presentation

### Embed in Statistic

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `time` | Total time(ms) | Embed in Statistic, Time format and custom content |
| `format` | Time format | Embed in Statistic, Time format and custom content |
<!-- demo-config-notes:end -->


When `value` is omitted, Statistic can embed Countdown in the default slot.

```demo
../example/demos/embed-statistic.vue
```

### Time format and custom content

Compare unit formats, milliseconds and custom time fragments, independently of playback controls.

<details>
<summary>Configuration details and limits</summary>

#### Custom Format

Use `format` to set time text. Higher units not present in the format roll down to the next unit.

#### Custom Style

Use `slot` to set custom countdown style.

#### Show Millisecond

Use `S` / `SS` / `SSS` to show milliseconds.

</details>

```demo
../example/demos/format-comparison.vue
```

## Interaction and control

### Manual Control

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `time` | Total time(ms) | Manual Control |
| `auto-start` | Whether to auto start count down | Manual Control |
| `format` | Time format | Manual Control |
<!-- demo-config-notes:end -->


Set `auto-start` to `false`, then control with `start`, `pause`, and `reset`. The `end` event fires when the countdown finishes.

```demo
../example/demos/manual-control.vue
```

## API

`time` is a duration rather than an absolute deadline; the remaining duration freezes while paused or deactivated by KeepAlive. The default slot receives the five fields days, hours, minutes, seconds, and milliseconds directly. `change` fires on reset and animation frames and may be frequent. `auto-start` is read on mount or reset; changing it alone does not start or pause. Repeated format tokens are all replaced. Omitted larger units accumulate into smaller units, so `SSS` alone can exceed three digits.

### Countdown Props

| Prop | Description | Type | Default |
| ----- | -------------- | -------- | ---------- |
| `time` | Total time(ms) | _string \| number_ | `0` |
| `format` | Time format | _string_ | `HH:mm:ss` |
| `auto-start` | Whether to auto start count down | _boolean_ | `true` |

### format specification

| Format | Description |
| -- | --- |
| `DD` | Day |
| `HH` | Hour |
| `mm` | Minute |
| `ss` | Seconds |
| `S` | Millisecond, 1-digit |
| `SS` | Milliseconds: 2 digits |
| `SSS` | Millisecond, 3-digit |

### Countdown Events

| Event | Description | Callback arguments |
| ----- | -------------- | -------- |
| `end` | Emitted after countdown ended | `-` |
| `change` | Emitted after countdown changed | `timeData: TimeData` |

### Countdown Slots

| Name | Description | Prop |
| ----- | -------------- | -------- |
| `default` | Custom content | `timeData: TimeData` |

### TimeData format

| Name | Description | Type |
| ---- | ------- | -------- |
| `days` | Remain days | `number` |
| `hours` | Remain hours | `number` |
| `minutes` | Remain minutes | `number` |
| `seconds` | Remain seconds | `number` |
| `milliseconds` | Remain milliseconds | `number` |

### Countdown Methods

Access Countdown through ref to call instance methods.

| Method | Description | Arguments | Returns |
| --- | --- | --- | --- |
| `start` | Start countdown | `-` | `-` |
| `pause` | Pause countdown | `-` | `-` |
| `reset` | Reset the countdown; `auto-start`=`true` restarts it automatically | `-` | `-` |

## Usage notes



SSR renders the initial formatted time. Changing format while paused updates the display. The finish event fires once per round; reset starts another round. Unmounting cleans up animation frames.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-countdown-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-countdown-text-font-size` | `var(--mp-font-size-lg)` | `font-size` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-countdown-text-color: var(--mp-sys-color-content-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
