# Steps

### Intro

Steps is a navigation bar that guides users through the steps of a task. Progress is controlled by `modelValue`, counted from **1** (aligned with Pagination / PC).

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Appearance and states

### Appearance combinations

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `model-value` | Current step (controlled, 1-based) | Appearance combinations |
| `content-placement` | Content side relative to the step node: right or bottom, default right. Dot steps derive it from orientation; navigation steps always use right | Appearance combinations |
| `type` | Display type | Step types and states |
| `status` | Current step status | Step types and states |
| `changeable` | Whether steps can be switched by click | Step types and states |
<!-- demo-config-notes:end -->


Use this example for the current state of a multi-step flow. Adjust status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### Step types and states

All four types share one current-step and status model. Click a step or select 1–3, then choose wait, process, finish or error: default, arrow, dot and navigation update together. Status changes the current node’s semantic state without changing its index. Titles and descriptions follow the page language to fit the phone preview.

<details>
<summary>Configuration details and limits</summary>

#### Appearance types

`type` selects `default`, `arrow`, `dot` or `navigation`. It controls appearance; `status` controls workflow progress. Arrow and navigation types are horizontal only. Change the current step to compare all four types. Existing `type` remains supported.

#### Error Status


</details>

```demo
../example/demos/types.vue
```

## Layout and arrangement

### Vertical Mode

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `orientation` | Horizontal/vertical axis of the step flow, default horizontal; arrow and navigation variants remain horizontal | Vertical Mode |
| `model-value` | Current step (controlled, 1-based) | Vertical Mode |
| `status` | Current step status | Vertical Mode |
<!-- demo-config-notes:end -->


```demo
../example/demos/vertical.vue
```

## Interaction and control

### Changeable

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `status` | Current step status | Changeable |
| `content-placement` | Content side relative to the step node: right or bottom, default right. Dot steps derive it from orientation; navigation steps always use right | Changeable |
| `changeable` | Whether steps can be switched by click | Changeable |
<!-- demo-config-notes:end -->


```demo
../example/demos/changeable.vue
```

## Triggers and positioning

### Popup placement

content-placement shares side vocabulary and spelling, not an identical set across all components. Steps implements only right/bottom; dot and navigation variants have derived rules. Unsupported sides are not added for naming uniformity.

## API

Use ordinary `v-model`. `modelValue` is the current step, starting at 1. `defaultValue` initializes uncontrolled state once; later changes do not reset it. Initialization emits no `update:modelValue`. When supplied, `modelValue` is controlled by the parent.

### Steps Props

| Prop | Description | Type | Default |
| ------------------- | --------------------------- | ----------------------------------------------- | ------------ |
| `model-value` | Current step (controlled, 1-based) | _number_ | `-` |
| `default-value` | Default current step (uncontrolled) | _number_ | `1` |
| `type` | Display type | _'default' \| 'arrow' \| 'dot' \| 'navigation'_ | `default` |
| `orientation` | Horizontal/vertical axis of the step flow, default horizontal; arrow and navigation variants remain horizontal | _'horizontal' \| 'vertical'_ | `horizontal` |
| `content-placement` | Content side relative to the step node: right or bottom, default right. Dot steps derive it from orientation; navigation steps always use right | _'right' \| 'bottom'_ | `right` |
| `status` | Current step status | _'wait' \| 'process' \| 'finish' \| 'error'_ | `process` |
| `size` | Steps size | _'sm' \| 'md'_ | `md` |
| `show-line` | Whether to show connectors | _boolean_ | `true` |
| `changeable` | Whether steps can be switched by click | _boolean_ | `false` |

### Step Props

| Prop | Description | Type | Default |
| ------------- | ------------------------ | -------------------------------------------- | ------- |
| `title` | Step title | _string_ | `-` |
| `description` | Step description | _string_ | `-` |
| `status` | Step status; overrides automatic inference | _'wait' \| 'process' \| 'finish' \| 'error'_ | `-` |
| `disabled` | Whether disabled | _boolean_ | `false` |

### Step Events

Step values are nonnegative safe integers: 0 gives every step an automatic waiting status, and values beyond the step count give every step an automatic finished status; an individual status can override it. Invalid values warn in development and render as 1. The node slot is not rendered for arrow type, and the icon slot is not rendered for dot type. Text and native decorations in the default slot do not consume step indices.

### Steps Events

| Event | Description | Callback arguments |
| ---------------- | ------------------------------------- | ---------------------------------------------- |
| `change` | Triggered when step changes (`changeable` required) | `current: number, previous: number, ev: Event` |
| `update:modelValue` | `v-model` sync | `step: number` |

### Steps Slots

| Name | Description | Prop |
| ------------- | ------------ | ---- |
| `default` | Steps content | `-` |
| `finish-icon` | Finished status icon | `-` |
| `error-icon` | Error status icon | `-` |

### Step Slots

| Name | Description | Prop |
| ------------- | -------------------------- | --------------------------------------- |
| `default` | Step `title`; overrides `title` | `index`、`status`、`active`、`disabled` |
| `title` | Step title | `index`、`status`、`active`、`disabled` |
| `node` | Full indicator node | `index`、`status`、`active`、`disabled` |
| `icon` | Custom node icon | `index`、`status`、`active`、`disabled` |
| `description` | Step description | `index`、`status`、`active`、`disabled` |

## Usage notes





`active` indicates only whether the current one-based step index matches modelValue, independently of wait/process/finish/error status. A current error step remains `active`. Focus/hover do not change `active`.

## Reading direction and keyboard interaction

Steps inherits the nearest `dir="ltr"` or `dir="rtl"`, including runtime changes. Horizontal steps, connectors and arrows follow reading direction; vertical steps remain top to bottom. Step numbers, progress values and custom icon content keep their meaning.

With `changeable`, Left/Right moves focus according to reading direction, or Up/Down vertically. Home/End focuses the first/last available step, skipping disabled items. Enter/Space confirms. Moving focus or changing reading direction does not update progress.

## CSS Variables

Override these variables through ThemeProvider or CSS.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-steps-arrow-item-bg-error` | `var(--mp-sys-color-content-danger)` | `background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-finish` | `var(--mp-sys-color-state-selected)` | `background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-process` | `var(--mp-sys-color-content-brand)` | `background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-wait` | `var(--mp-sys-color-surface-muted)` | `background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-description-color-error` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-arrow-item-description-color-finish` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-arrow-item-description-color-process` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-arrow-item-description-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-arrow-item-description-margin-top` | `0` | `margin-top` |
| `--mp-steps-arrow-item-gap` | `4px` | `margin-inline-end` |
| `--mp-steps-arrow-item-title-color-error` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-arrow-item-title-color-finish` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-arrow-item-title-color-process` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-arrow-item-title-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-arrow-item-title-font-weight-active` | `500` | `font-weight` |
| `--mp-steps-arrow-size-md-title-padding-left` | `16px` | `padding-inline-start` |
| `--mp-steps-arrow-size-sm-title-padding-left` | `20px` | `padding-inline-start` |
| `--mp-steps-changeable-hover-text-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-steps-circle-horizontal-item-description-margin-top` | `2px` | `margin-top` |
| `--mp-steps-circle-item-bg-error` | `var(--mp-sys-color-content-danger)` | `background-color` |
| `--mp-steps-circle-item-bg-finish` | `var(--mp-sys-color-state-selected)` | `background-color` |
| `--mp-steps-circle-item-bg-process` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-circle-item-bg-wait` | `var(--mp-sys-color-surface-muted)` | `background-color` |
| `--mp-steps-circle-item-border-color-error` | `transparent` | `border` |
| `--mp-steps-circle-item-border-color-finish` | `transparent` | `border` |
| `--mp-steps-circle-item-border-color-process` | `transparent` | `border` |
| `--mp-steps-circle-item-border-color-wait` | `transparent` | `border` |
| `--mp-steps-circle-item-description-color-error` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-description-color-finish` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-description-color-process` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-description-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-icon-border-radius` | `50%` | `border-radius` |
| `--mp-steps-circle-item-icon-gap` | `12px` | `inset-inline-start`, `margin-inline-end`, `padding-inline-end` |
| `--mp-steps-circle-item-icon-text-color-error` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-circle-item-icon-text-color-finish` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-steps-circle-item-icon-text-color-process` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-circle-item-icon-text-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-tail-color-error` | `var(--mp-sys-color-content-danger)` | `background-color` |
| `--mp-steps-circle-item-tail-color-process` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-circle-item-tail-color-wait` | `var(--mp-sys-color-border-default)` | `background-color` |
| `--mp-steps-circle-item-tail-size` | `1px` | `height`, `inset-inline-start`, `top`, `width` |
| `--mp-steps-circle-item-title-color-error` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-circle-item-title-color-finish` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-circle-item-title-color-process` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-circle-item-title-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-title-font-weight-active` | `500` | `font-weight` |
| `--mp-steps-circle-tail-hack-width` | `5000px` | `width` |
| `--mp-steps-circle-vertical-item-description-margin-top` | `2px` | `margin-top` |
| `--mp-steps-circle-vertical-tail-padding-extra` | `6px` | `padding` |
| `--mp-steps-direction-horizontal-description-width` | `140px` | `max-width` |
| `--mp-steps-dot-horizontal-item-description-margin-top` | `4px` | `margin-top` |
| `--mp-steps-dot-horizontal-item-title-margin-top` | `4px` | `margin-top` |
| `--mp-steps-dot-item-bg-error` | `var(--mp-sys-color-content-danger)` | `background-color` |
| `--mp-steps-dot-item-bg-finish` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-dot-item-bg-process` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-dot-item-bg-wait` | `var(--mp-sys-color-content-secondary)` | `background-color` |
| `--mp-steps-dot-item-border-color-error` | `var(--mp-sys-color-content-danger)` | `border-color` |
| `--mp-steps-dot-item-border-color-finish` | `var(--mp-sys-color-content-brand)` | `border-color` |
| `--mp-steps-dot-item-border-color-process` | `var(--mp-sys-color-content-brand)` | `border-color` |
| `--mp-steps-dot-item-border-color-wait` | `var(--mp-sys-color-content-secondary)` | `border-color` |
| `--mp-steps-dot-item-description-color-error` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-dot-item-description-color-finish` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-dot-item-description-color-process` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-dot-item-description-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-dot-item-icon-border-radius` | `50%` | `border-radius` |
| `--mp-steps-dot-item-icon-gap` | `4px` | `inset-inline-start`, `margin-inline-end`, `padding-top` |
| `--mp-steps-dot-item-icon-margin-left` | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-dot-item-icon-size)) / 2)` | `inset-inline-start`, `margin-inline-start` |
| `--mp-steps-dot-item-icon-size` | `8px` | `height`, `inset-inline-start`, `margin-inline-end`, `margin-inline-start`, `margin-top`, `padding-top`, `top`, `width` |
| `--mp-steps-dot-item-icon-size-active` | `10px` | `height`, `margin-inline-start`, `margin-top`, `width` |
| `--mp-steps-dot-item-tail-color-error` | `var(--mp-sys-color-content-danger)` | `background-color` |
| `--mp-steps-dot-item-tail-color-process` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-dot-item-tail-color-wait` | `var(--mp-sys-color-border-default)` | `background-color` |
| `--mp-steps-dot-item-tail-size` | `1px` | `height`, `top` |
| `--mp-steps-dot-item-title-color-error` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-dot-item-title-color-finish` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-dot-item-title-color-process` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-dot-item-title-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-dot-item-title-font-weight-active` | `500` | `font-weight` |
| `--mp-steps-dot-vertical-item-description-margin-top` | `4px` | `margin-top` |
| `--mp-steps-dot-vertical-item-dot-margin-top` | `8px` | `margin-top` |
| `--mp-steps-dot-vertical-item-dot-margin-top-active` | `calc(var(--mp-steps-dot-vertical-item-dot-margin-top) - (var(--mp-steps-dot-item-icon-size-active) - var(--mp-steps-dot-item-icon-size)))` | `margin-top` |
| `--mp-steps-dot-vertical-item-icon-margin-right` | `16px` | `margin-inline-end` |
| `--mp-steps-dot-vertical-tail-padding-bottom` | `2px` | `padding-bottom` |
| `--mp-steps-dot-vertical-tail-padding-top-extra` | `4px` | `padding-top` |
| `--mp-steps-label-vertical-content-width` | `100%` | `inset-inline-start`, `margin-inline-start` |
| `--mp-steps-navigation-arrow-color` | `var(--mp-sys-color-content-secondary)` | `border` |
| `--mp-steps-navigation-arrow-line-width` | `2px` | `border` |
| `--mp-steps-navigation-arrow-right` | `30px` | `inset-inline-end` |
| `--mp-steps-navigation-arrow-size` | `6px` | `height`, `width` |
| `--mp-steps-navigation-arrow-spacing-right` | `10px` | `padding-inline-end` |
| `--mp-steps-navigation-arrow-top` | `10px` | `top` |
| `--mp-steps-navigation-content-margin-bottom` | `20px` | `margin-bottom` |
| `--mp-steps-navigation-description-padding-right` | `20px` | `padding-inline-end` |
| `--mp-steps-navigation-ink-bg` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-navigation-ink-height` | `2px` | `height` |
| `--mp-steps-navigation-ink-spacing-left` | `0` | `inset-inline-start` |
| `--mp-steps-navigation-ink-spacing-right` | `30px` | `inset-inline-end` |
| `--mp-steps-navigation-margin-right` | `32px` | `margin-inline-end` |
| `--mp-steps-navigation-padding-left` | `20px` | `padding-inline-start` |
| `--mp-steps-node-font-weight` | `500` | `font-weight` |
| `--mp-steps-size-md` | `28px` | `height`, `inset-inline-start`, `line-height`, `margin-inline-start`, `margin-top`, `padding`, `padding-inline-end`, `top`, `width` |
| `--mp-steps-size-md-arrow` | `72px` | `border-bottom`, `border-inline-start`, `border-top`, `height`, `inset-inline-end`, `padding-inline-start` |
| `--mp-steps-size-md-description-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-steps-size-md-icon-font-size` | `16px` | `font-size` |
| `--mp-steps-size-md-item-icon-margin-left` | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-size-md)) / 2)` | `inset-inline-start`, `margin-inline-start` |
| `--mp-steps-size-md-title-font-size` | `var(--mp-font-size-lg)` | `font-size` |
| `--mp-steps-size-sm` | `24px` | `height`, `inset-inline-start`, `line-height`, `margin-inline-start`, `padding`, `padding-inline-end`, `top`, `width` |
| `--mp-steps-size-sm-arrow` | `40px` | `border-bottom`, `border-inline-start`, `border-top`, `height`, `inset-inline-end`, `padding-inline-start` |
| `--mp-steps-size-sm-description-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-steps-size-sm-icon-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-steps-size-sm-item-icon-margin-left` | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-size-sm)) / 2)` | `inset-inline-start`, `margin-inline-start` |
| `--mp-steps-size-sm-title-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-steps-transition-duration-1` | `0.1s` | `transition` |
| `--mp-steps-transition-timing-function-linear` | `cubic-bezier(0, 0, 1, 1)` | `transition` |
| `--mp-steps-vertical-item-min-height` | `90px` | `min-height` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-steps-arrow-item-description-color-error: var(--mp-sys-color-surface-default);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
