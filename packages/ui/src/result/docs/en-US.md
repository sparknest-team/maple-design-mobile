# Result

### Intro

It is used to show the results to users.

## Basic examples

### Basic Usage

Next status cycles six local result states and updates the title and graphic; Reset status returns to info. These buttons neither send requests nor navigate. Result displays the supplied status without inferring it from title text.

```demo
../example/demos/basic-usage.vue
```

## Content and presentation

### Status

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `status` | info / success / warning / danger / question / empty / 403 / 404 / 500 | Status |
| `title` | Title | Status |
| `subtitle` | Description | Status |
<!-- demo-config-notes:end -->


Result supports `info`, `success`, `warning`, `danger`, `question`, `empty`, `403`, `404`, and `500`. Built-in graphic entry animation follows `animation` and the system reduced-motion preference. The `icon` slot replaces the built-in graphic and receives the normalized `size`; its content controls its own size and animation.

```demo
../example/demos/type.vue
```

## API

### Result Props

| Prop | Description | Type | Default |
| --------------- | ----------------------------------------------------------------- | ---------- | ----------- |
| `status` | info / success / warning / danger / question / empty / 403 / 404 / 500 | _ResultStatus_<br>`'success' \| 'empty' \| 'info' \| 'warning' \| 'danger' \| 'question' \| '403' \| '404' \| '500'` | `info` |
| `title` | Title | _string_ | `-` |
| `subtitle` | Description | _string_ | `-` |
| `image-size` | Image Size | _string \| number_ | `-` |
| `animation` | Whether to animate the status graphic | _boolean_ | `true` |

### Result Slots

| Slot | Description | Prop |
| -------------------- | --------- | ---- |
| `icon` | Custom status graphic | `{ size?: string }` |
| `title` | Custom title | `-` |
| `subtitle` | Custom description | `-` |
| `extra` | Custom action area | `-` |
| `default` | Additional result details | `-` |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-result-background` | `var(--mp-color-bg-white)` | `background-color` |
| `--mp-result-border-radius` | `3px` | `border-radius` |
| `--mp-result-content-margin` | `20px 0 0` | `margin` |
| `--mp-result-danger-border-color` | `rgba(244, 67, 54, 0.3)` | `border-color` |
| `--mp-result-danger-color` | `var(--mp-sys-color-content-danger)` | `fill` |
| `--mp-result-empty-border-color` | `rgba(158, 158, 158, 0.3)` | `border-color` |
| `--mp-result-empty-color` | `#9e9e9e` | `fill` |
| `--mp-result-extra-margin` | `20px 0 0` | `margin` |
| `--mp-result-image-size` | `80px` | `border`, `height`, `width` |
| `--mp-result-info-border-color` | `rgba(0, 175, 239, 0.3)` | `border-color` |
| `--mp-result-info-color` | `var(--mp-sys-color-content-info)` | `fill` |
| `--mp-result-padding` | `24px` | `padding` |
| `--mp-result-question-border-color` | `rgba(96, 125, 139, 0.3)` | `border-color` |
| `--mp-result-question-color` | `#607d8b` | `fill` |
| `--mp-result-subtitle-color` | `rgba(0, 0, 0, 0.6)` | `color` |
| `--mp-result-subtitle-font-size` | `14px` | `font-size` |
| `--mp-result-subtitle-line-height` | `1.6` | `line-height` |
| `--mp-result-subtitle-margin` | `10px 0 0` | `margin` |
| `--mp-result-success-border-color` | `rgba(0, 196, 143, 0.3)` | `border-color` |
| `--mp-result-success-color` | `var(--mp-sys-color-content-success)` | `fill` |
| `--mp-result-title-color` | `#444` | `color` |
| `--mp-result-title-font-size` | `32px` | `font-size` |
| `--mp-result-title-font-weight` | `500` | `font-weight` |
| `--mp-result-title-margin` | `15px 0 0` | `margin` |
| `--mp-result-warning-border-color` | `rgba(255, 159, 0, 0.3)` | `border-color` |
| `--mp-result-warning-color` | `var(--mp-sys-color-content-warning)` | `fill` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-result-background: var(--mp-color-bg-white);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
