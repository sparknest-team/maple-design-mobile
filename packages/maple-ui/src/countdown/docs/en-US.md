# Countdown

One real IAB default/light clock lifecycle case passes per platform: decrement, public pause/start, stable inactive callbacks, inactive time reset-to900ms without background ticking, reactivation and stable callbacks after unmount, final nodes0. Stable cached containers deliver inactive props; deferred parent delivery is not mislabeled a product defect. Not dequeued-race/cross-window/OS certification.

### Countdown business clock and deactivation

Countdown RAF refreshes business time, not visual interpolation; CSS duration/reduced motion must not alter the clock. Pause and KeepAlive deactivation freeze remaining duration; activation resumes that value without charging inactive time. Inactive time updates/reset may update data and emit change but schedule no RAF; auto-start is deferred to activation, and explicit pause cancels pending resume. Direct inactive start is ignored; disposed start/reset emit and schedule nothing.

Each frame validates and consumes its generation before clearing its handle/calculating/notifying, then rechecks after change listeners. Reentrant reset/pause/start cannot be overwritten by an old frame; consumed frames cannot update twice or replace successors. End emits once, reset permits a new completion. Eight controlled clock/RAF tests pass per platform, six failing at baseline; full Countdown Cedar18/Maple20 pass. No CSS variable/public API additions; simulated RAF is not real browser/OS acceptance.

### Intro

For real-time display of countdown values, with millisecond precision.

`time` is remaining duration in milliseconds. To align with a deadline, pass `deadline - Date.now()`.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Custom Format

Use `format` to set time text. Higher units not present in the format roll down to the next unit.

```demo
../example/demos/custom-format.vue
```

### Show Millisecond

Use `S` / `SS` / `SSS` to show milliseconds.

```demo
../example/demos/show-millisecond.vue
```

### Custom Style

Use `slot` to set custom countdown style.

```demo
../example/demos/custom-style.vue
```

### Manual Control

Set `auto-start` to `false`, then control with `start`, `pause`, and `reset`. The `end` event fires when the countdown finishes.

```demo
../example/demos/manual-control.vue
```

### Embed in Statistic

When `value` is omitted, Statistic can embed Countdown in the default slot.

```demo
../example/demos/embed-statistic.vue
```

## API

### Props

| Prop         | Description                      | Type               | Default        |
| ------------ | -------------------------------- | ------------------ | -------------- |
| `time`       | Total time(ms)                   | _string \| number_ | `0`            |
| `format`     | Time format                      | _string_           | `HH:mm:ss`     |
| `auto-start` | Whether to auto start count down | _boolean_          | `true`         |

### Available formats

| Format | Description          |
| ------ | -------------------- |
| `DD`   | Day                  |
| `HH`   | Hour                 |
| `mm`   | Minute               |
| `ss`   | Second               |
| `S`    | Millisecond, 1-digit |
| `SS`   | Millisecond, 2-digit |
| `SSS`  | Millisecond, 3-digit |

### Events

| Event    | Description                     | Arguments            |
| -------- | ------------------------------- | -------------------- |
| `end`    | Emitted after countdown ended   | `-`                  |
| `change` | Emitted after countdown changed | `timeData: TimeData` |

### Slots

| Name      | Description    | SlotProps            |
| --------- | -------------- | -------------------- |
| `default` | Custom content | `timeData: TimeData` |

### TimeData Structure

| Name           | Description         | Type     |
| -------------- | ------------------- | -------- |
| `days`         | Remain days         | `number` |
| `hours`        | Remain hours        | `number` |
| `minutes`      | Remain minutes      | `number` |
| `seconds`      | Remain seconds      | `number` |
| `milliseconds` | Remain milliseconds | `number` |

### Methods

Use ref to get Countdown instance and call instance methods.

| Method | Description	 | Arguments | Return |
| ---- | ------- | -------- |--------|
| `start` | Start countdown | `-`       | `-` |
| `pause` | Pause countdown | `-`       | `-` |
| `reset` | Reset countdown | `-`       | `-` |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--mp-countdown-text-color`     | `var(--mp-sys-color-content-primary)` |
| `--mp-countdown-text-font-size` | `var(--mp-font-size-lg)` |
