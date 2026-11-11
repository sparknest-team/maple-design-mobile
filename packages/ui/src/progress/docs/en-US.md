# Progress

Displays determinate or indeterminate task progress.

## Basic examples

### basic-usage

```demo
../example/demos/basic-usage.vue
```

## Appearance and states

### Progress sizes and states

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | xs/sm/md/lg/xl or CSS length; line thickness / circle diameter | Progress sizes and states |
| `percent` | Decimal 0–100; numeric strings supported; invalid values become zero, out-of-range values clamp | Progress sizes and states |
| `mode` | Line or circle | Progress sizes and states |
| `stroke-width` | Overrides thickness, numbers in px | Progress sizes and states |
| `status` | default/primary/secondary/tertiary/info/success/warning/danger; default becomes success at 100 unless indeterminate | Progress sizes and states |
<!-- demo-config-notes:end -->


Compare sizes and semantic states independently of circular, stepped and indeterminate models.

```demo
../example/demos/appearance-comparison.vue
```

## Content and presentation

### circle

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `percent` | Decimal 0–100; numeric strings supported; invalid values become zero, out-of-range values clamp | circle, step, loop |
| `mode` | Line or circle | circle, loop, advanced |
| `size` | xs/sm/md/lg/xl or CSS length; line thickness / circle diameter | circle, step, More styles and indeterminate progress |
| `color` | Solid or gradient stops; overrides status | circle, advanced, More styles and indeterminate progress |
| `status` | default/primary/secondary/tertiary/info/success/warning/danger; default becomes success at 100 unless indeterminate | circle, step, More styles and indeterminate progress |
| `track` | Show track and buffer decoration | circle, advanced |
<!-- demo-config-notes:end -->


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

## Reading direction

Linear progress grows from inline start, and active/indeterminate animation follows reading direction. Percentages, numeric values and ring angles do not reverse. Reduced-motion preferences still apply.

## Usage notes

### Configuration

Determinate circular success/danger states show completion/failure icons, including xs. The text slot overrides these; ARIA numeric values remain.

### Layout updates

Circular `stroke-width` is resolved in the component CSS context, including `1em`, `calc()`, `var()` and percentages; a percentage is relative to the circle diameter. Font, variable and size changes update the geometry, and stroke width is capped at 99% of the diameter.

## API

### Progress Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| mode | Line or circle | `line \| circle` | `line` |
| percent | Decimal 0–100; numeric strings supported; invalid values become zero, out-of-range values clamp | `number \| string` | `0` |
| size | xs/sm/md/lg/xl or CSS length; line thickness / circle diameter | `ProgressSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `md` |
| stroke-width | Overrides thickness, numbers in px | `number \| string` | Follows size |
| steps | Line segments, floored and clamped to 0–1000; ignored when indeterminate | `number` | `0` |
| status | default/primary/secondary/tertiary/info/success/warning/danger; default becomes success at 100 unless indeterminate | `ProgressStatus`<br>`'default' \| 'success' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'warning' \| 'danger'` | `default` |
| color | Solid or gradient stops; overrides status | `string \| Record<string, string>` | — |
| track-color | Background track color | `string` | — |
| buffer-color | Remaining line track decoration, not a second progress value | `ProgressColor` | — |
| track | Show track and buffer decoration | `boolean` | `true` |
| show-text | Show text; xs circle hides text | `boolean` | `true` |
| text-class | Text container class | `string` | — |
| rotate | Clockwise angle from twelve o'clock | `number` | `0` |
| animation | Determinate continuous line shimmer | `boolean` | `false` |
| indeterminate | Unknown progress; omits aria-valuenow | `boolean` | `false` |

### Size semantics

| size | xs | sm | md | lg | xl |
| --- | --- | --- | --- | --- | --- |
| Linear thickness / default circular stroke in px | 2 | 3 | 4 | 6 | 8 |
| Circular diameter in px | 16 | 48 | 64 | 80 | 96 |

`size=12` / `size="12"` means 12px; `size="2rem"`, `"50%"` and `"calc(100% - 2px)"` retain CSS lengths. Custom linear size controls thickness; custom circular size controls diameter. stroke-width always takes precedence for thickness. Invalid/nonpositive lengths fall back to md. Percentage circular diameters require a definite parent width. All five presets are implemented; xs circular progress hides text. Cedar inherits omitted size from ConfigProvider; Maple defaults to md.

### Progress Slots

| Slot | Prop | Description |
| --- | --- | --- |
| text | `{ percent: number }` | Takes precedence over default |
| default | `{ percent: number }` | Custom display text |

Indeterminate progress shows an ellipsis by default; use the text slot for business text. The component does not mutate values or emit updates. Provide `aria-label` for the business task. All built-in animations respect reduced-motion settings.

## Types

Exports `ProgressProps`, `ProgressInstance`, `ProgressSize`, `ProgressMode`, `ProgressStatus`, `ProgressColor` and runtime `progressProps`.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-progress-animation-duration` | `1.5s` | `animation`, `animation-delay` |
| `--mp-progress-danger-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-progress-default-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-progress-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-progress-info-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-progress-line-border-radius` | `9999px` | `border-radius` |
| `--mp-progress-primary-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-progress-secondary-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-progress-steps-gap` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-progress-success-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-progress-tertiary-color` | `var(--mp-sys-color-content-tertiary)` | `color` |
| `--mp-progress-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-progress-text-gap` | `var(--mp-sys-space-4)` | `gap` |
| `--mp-progress-track-color` | `var(--mp-sys-color-state-hover)` | `background`, `stroke` |
| `--mp-progress-transition-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-progress-warning-color` | `var(--mp-sys-color-content-warning)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-progress-danger-color: var(--mp-sys-color-content-danger);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
