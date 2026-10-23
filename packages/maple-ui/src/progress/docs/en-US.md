# Progress

Displays determinate or indeterminate progress. Cedar and Maple maintain independent copies of the same implementation.

### basic-usage

```demo
../example/demos/basic-usage.vue
```

### status

```demo
../example/demos/status.vue
```

### size

```demo
../example/demos/size.vue
```

### circle

```demo
../example/demos/circle.vue
```

### step

```demo
../example/demos/step.vue
```

### loop

```demo
../example/demos/loop.vue
```

### advanced

```demo
../example/demos/advanced.vue
```

### More styles and indeterminate progress

```demo
../example/demos/style.vue
```

```demo
../example/demos/indeterminate-progress.vue
```

### API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| mode | Line or circle | `line \| circle` | `line` |
| percent | Decimal 0–100; numeric strings supported; invalid values become zero, out-of-range values clamp | `number \| string` | `0` |
| size | xs/sm/md/lg/xl or CSS length; line thickness / circle diameter | `ProgressSize` | `md` |
| stroke-width | Overrides thickness, numbers in px | `number \| string` | size preset |
| steps | Line segments, floored and clamped to 0–1000; ignored when indeterminate | `number` | `0` |
| status | default/primary/secondary/tertiary/info/success/warning/danger; default becomes success at 100 unless indeterminate | `ProgressStatus` | `default` |
| color | Solid or gradient stops; overrides status | `ProgressColor` | — |
| track-color | Background track color | `string` | — |
| buffer-color | Remaining line track decoration, not a second progress value | `ProgressColor` | — |
| track | Show track and buffer decoration | `boolean` | `true` |
| show-text | Show text; xs circle hides text | `boolean` | `true` |
| text-class | Text container class | `string` | — |
| rotate | Clockwise angle from twelve o'clock | `number` | `0` |
| animation | Determinate continuous line shimmer | `boolean` | `false` |
| indeterminate | Unknown progress; omits aria-valuenow | `boolean` | `false` |

### Sizes and slots

All five presets are implemented. Thickness: 2/3/4/6/8px; circle diameter: 16/48/64/80/96px. Custom numbers and numeric strings use px; CSS lengths such as rem, percentages and calc are retained. Invalid or nonpositive lengths fall back to md. stroke-width overrides thickness. Percentage circle sizes require a defined parent width. Cedar inherits ConfigProvider size; Maple defaults to md.

Both text and default slots receive `{ percent: number }`; text wins. Unknown progress displays an ellipsis by default. Supply aria-label for the task name. The component is display-only and emits no value updates. Built-in animations respect reduced motion.

### Types

Exports ProgressProps, ProgressInstance, ProgressSize, ProgressMode, ProgressStatus, ProgressColor and progressProps.

### Style variables

| Variable | Default |
| --- | --- |
| `--mp-progress-font-size` | `var(--mp-sys-font-size-sm)` |
| `--mp-progress-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-progress-track-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-progress-default-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-progress-primary-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-progress-secondary-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-progress-tertiary-color` | `var(--mp-sys-color-content-tertiary)` |
| `--mp-progress-info-color` | `var(--mp-sys-color-content-info)` |
| `--mp-progress-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-progress-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-progress-danger-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-progress-line-border-radius` | `9999px` |
| `--mp-progress-text-gap` | `var(--mp-sys-space-4)` |
| `--mp-progress-steps-gap` | `var(--mp-sys-space-2)` |
| `--mp-progress-transition-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-progress-animation-duration` | `1.5s` |

Determinate circle success/danger states show completion/failure icons, including xs. The text slot overrides them; numeric ARIA is retained.


<!-- api-review:start -->
### 组合审查 / API review

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->
