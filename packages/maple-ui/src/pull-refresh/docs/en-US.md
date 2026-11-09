# PullRefresh

## Basic examples

### Basic Usage

```demo
../example/demos/basic.vue
```

`animation-duration` and `success-duration` accept finite nonnegative milliseconds or numeric strings; zero is valid, and invalid values use the respective default. Without `success-bg-color`, the indicator uses the theme background; without `success-color`, it uses the success color token rather than the normal inline color.

A selector target must exist when bound; invalid or missing targets throw. Changing `target` rebinds and settles the indicator to the current model. No imperative refresh method is part of the public contract.

Provide a keyboard-accessible button that invokes the same refresh operation, with `disabled` and `aria-busy` derived from business state. A separate `role="status"` region can announce completion or failure. `refresh` is a notification: accept `update:modelValue` true and set it to false when the operation completes; returned promises do not control state.

## API

### Value and default value

Use ordinary `v-model`. `modelValue` is refresh-loading state; the parent still sets false after async completion. `defaultValue` initializes uncontrolled state once without later resets. Explicit binding wins, without initialization `update:modelValue`.

### PullRefresh Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Loading status | `boolean` | `-` |
| `default-value` | Initial uncontrolled refresh state, read once | `boolean` | `false` |
| `disabled` | Disable pull-to-refresh | `boolean` | `false` |
| `target` | Scroll container. Defaults to the nearest scrollable ancestor | `string \| HTMLElement` | `-` |
| `animation-duration` | Rebound animation duration (ms) | `number \| string` | `300` |
| `success-duration` | Success state duration (ms) | `number \| string` | `2000` |
| `bg-color` | Indicator background | `string` | `-` |
| `color` | Indicator color | `string` | `-` |
| `success-bg-color` | Success indicator background | `string` | `-` |
| `success-color` | Success indicator color | `string` | `-` |

### PullRefresh Events

| Event | Description | Arguments |
| --- | --- | --- |
| `refresh` | Fired when refresh starts | `-` |
| `update:model-value` | Fired when loading status changes | `(value: boolean)` |

### PullRefresh Slots

| Name | Description |
| --- | --- |
| `default` | List content |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-pull-refresh-background` | `#fff` | `background-color` |
| `--mp-pull-refresh-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-pull-refresh-icon-size` | `25px` | `font-size` |
| `--mp-pull-refresh-size` | `40px` | `height`, `width` |
| `--mp-pull-refresh-success-color` | `var(--mp-sys-color-content-success)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-pull-refresh-background: #fff;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
