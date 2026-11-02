# Countdown

One real IAB default/light clock lifecycle case passes per platform: decrement, public pause/start, stable inactive callbacks, inactive time reset-to900ms without background ticking, reactivation and stable callbacks after unmount, final nodes0. Stable cached containers deliver inactive props; deferred parent delivery is not mislabeled a product defect. Not dequeued-race/cross-window/OS certification.

### Countdown business clock and deactivation

Countdown RAF refreshes business time, not visual interpolation; CSS duration/reduced motion must not alter the clock. Pause and KeepAlive deactivation freeze remaining duration; activation resumes that value without charging inactive time. Inactive time updates/reset may update data and emit change but schedule no RAF; auto-start is deferred to activation, and explicit pause cancels pending resume. Direct inactive start is ignored; disposed start/reset emit and schedule nothing.

Each frame validates and consumes its generation before clearing its handle/calculating/notifying, then rechecks after change listeners. Reentrant reset/pause/start cannot be overwritten by an old frame; consumed frames cannot update twice or replace successors. End emits once, reset permits a new completion. Eight controlled clock/RAF tests pass per platform, six failing at baseline; full Countdown Cedar18/Maple20 pass. No CSS variable/public API additions; simulated RAF is not real browser/OS acceptance.

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

### Props

| Arguments | Description | Type | Default |
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

### Events

| Event | Description | Callback arguments |
| ----- | -------------- | -------- |
| `end` | Emitted after countdown ended | `-` |
| `change` | Emitted after countdown changed | `timeData: TimeData` |

### Slots

| Name | Description | Arguments |
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

### Methods

Access Countdown through ref to call instance methods.

| Method | Description | Arguments | Returns |
| --- | --- | --- | --- |
| `start` | Start countdown | `-` | `-` |
| `pause` | Pause countdown | `-` | `-` |
| `reset` | Reset the countdown; `auto-start`=`true` restarts it automatically | `-` | `-` |

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| ----------------------------- | --- |
| `--mp-countdown-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-countdown-text-font-size` | `var(--mp-font-size-lg)` |

## Shared implementation and platform boundaries

Each platform maintains a complete local implementation. They do not import a common core or share component instances or reactive state. Changes must update both implementations. Component bodies, props, key styles and paired tests have read-only source consistency checks; theme tokens and installation entries remain local to each library.

SSR renders the initial formatted time. Changing format while paused updates the display. The finish event fires once per round; reset starts another round. Unmounting cleans up animation frames.
