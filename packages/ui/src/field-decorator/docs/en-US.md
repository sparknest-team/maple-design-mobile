# FieldDecorator

See the [Chinese documentation](#/en-US/field-decorator) for the full API.

## Basic examples

### Basic usage

```demo
../example/demos/control-sizes.vue
```

## Loading and waiting

### Shared field loading

```demo
../example/demos/loading.vue
```

## Usage notes

### Loading

Changing `tag` rebinds size observation to the current root and content nodes. KeepAlive deactivation releases observation and queued measurements; a frame from an earlier activation cannot change current layout.

## API

### FieldDecorator Props

The floating hint leaves a gap in the outline, aligned with the content column. Adjust the space on either side through `hint-space`.

| Prop | Type | Default / meaning |
| --- | --- | --- |
| `loading` | `boolean` | `false`; show loading without changing disabled or readonly |
| `loading-mode` | `'default' \| 'line'` | `default`; indicator or bottom progress line |
| `tag` | `'div' \| 'span'` | `div`; wrapper element |
| `value` | `unknown` | Checks only whether content is empty |
| `id` | `string` | Native control id associated with the floating label |
| `title` | `string` | Native title tooltip |
| `size` | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md`; implements all five sizes |
| `variant` | `'outline' \| 'filled' \| 'standard'` | `outline` |
| `placeholder` | `string` | Floating label text |
| `hint` | `boolean` | `false` |
| `hint-center` | `boolean` | `true`; use false for multiline controls |
| `line` | `boolean` | `true`; whether to show a border or underline |
| `focused` | `boolean` | Consumer-supplied focus state |
| `composing` | `boolean` | Keep the label floated during IME composition |
| `disabled` | `boolean` | Consumer-supplied disabled state after merging Form / Group state |
| `readonly` | `boolean` | Consumer-supplied read-only state after merging Form / Group state |
| `error` | `boolean` | Consumer-supplied error state after merging Form / Group state |
| `clearable` | `boolean` | `false`; whether clearing is allowed |
| `text-color` | `string` | Custom per-instance text color; prefer tokens for static themes |
| `focus-color` | `string` | Custom per-instance focused color; prefer tokens for static themes |
| `blur-color` | `string` | Custom per-instance unfocused color; prefer tokens for static themes |
| `cursor` | `string` | Custom caret |

### FieldDecorator Slots / Events

`default` contains a native input, tags or display content. `prefix` / `suffix` contain adornments. `clear-icon` receives `clear(event?)`; a custom button should call it. Clearing does not bubble to open the selection panel.

`loading-icon` replaces the indicator icon only when `loading=true` and `loading-mode=default`; `line` mode renders no icon. `fieldLoadingProps` contains `loading` and `loadingMode`; `fieldLoadingModes`, `FieldLoadingMode`, and `FieldLoadingProps` are exported from the component and root entry points.

`clear(event)` asks the consumer to update the value; `mousedown(event)` lets the consumer manage focus. The wrapper does not mutate the model itself.

Style semantics use `--c-field-*` / `--mp-field-*`, declared in each library's `style/token.less`. Implementations are not shared across libraries. Consumers must not draw a second border.

## Keyboard focus

The outline variant indicates focus through its border, filled through its background, and standard through its underline. Clear, password-toggle and stepper buttons retain keyboard focus indicators. Readonly remains focusable; disabled and error colors have higher priority.

Use `--mp-field-caret-color` for input caret color, defaulting to `currentColor`. Input, Textarea and InputNumber also support their own caret-color overrides. Focus and error colors apply to hints or borders.

`--mp-field-caret-color` defaults to `currentColor` and controls Input/InputNumber/Textarea carets without changing text.

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom `line`); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-field-blur-color` | `var(--mp-sys-color-content-tertiary)` | `border-bottom`, `color` |
| `--mp-field-border-radius` | `var(--mp-sys-radius-md)` | `border-end-end-radius`, `border-end-start-radius`, `border-radius`, `border-start-end-radius`, `border-start-start-radius` |
| `--mp-field-border-width` | `1px` | `border`, `border-bottom`, `margin-inline-start`, `min-height`, `outline`, `outline-offset`, `padding-inline-start` |
| `--mp-field-caret-color` | `currentColor` | `caret-color` |
| `--mp-field-clear-icon-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-field-clear-icon-size` | `var(--mp-field-icon-size)` | `font-size` |
| `--mp-field-clear-padding` | `4px` | `padding` |
| `--mp-field-clear-radius` | `50%` | `border-radius` |
| `--mp-field-clear-visibility` | `visible` | `visibility` |
| `--mp-field-content-gap` | `8px` | `gap`, `padding-inline-end`, `padding-inline-start` |
| `--mp-field-content-padding-vertical` | `8px` | `padding`, `top` |
| `--mp-field-control-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-field-control-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `-webkit-text-fill-color`, `color` |
| `--mp-field-error-color` | `var(--mp-sys-color-status-danger)` | `border-bottom-color`, `border-color`, `color` |
| `--mp-field-focus-color` | `var(--mp-sys-color-action-primary)` | `border-bottom-color`, `color`, `outline` |
| `--mp-field-hint-duration` | `0.2s` | `transition` |
| `--mp-field-hint-scale` | `0.75` | `font-size`, `top`, `transform` |
| `--mp-field-hint-space` | `4px` | `padding`, `padding-inline-start` |
| `--mp-field-icon-size` | `20px` | `font-size` |
| `--mp-field-line-height` | `1.5` | `line-height`, `top` |
| `--mp-field-loading-color` | `var(--mp-field-focus-color)` | `color` |
| `--mp-field-loading-duration` | `1s` | `animation` |
| `--mp-field-loading-line-size` | `2px` | `height` |
| `--mp-field-padding-horizontal` | `16px` | `inset-inline-start`, `margin-inline-end`, `margin-inline-start`, `max-width`, `padding`, `padding-inline-end`, `padding-inline-start`, `width` |
| `--mp-field-placeholder-text-color` | `var(--mp-sys-color-content-tertiary)` | `color` |
| `--mp-field-prefix-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-field-size-lg-font-size` | `16px` | `font-size` |
| `--mp-field-size-lg-height` | `56px` | `flex`, `height`, `min-height` |
| `--mp-field-size-md-font-size` | `16px` | `font-size` |
| `--mp-field-size-md-height` | `48px` | `flex`, `height`, `min-height` |
| `--mp-field-size-sm-font-size` | `14px` | `font-size` |
| `--mp-field-size-sm-height` | `40px` | `flex`, `height`, `min-height` |
| `--mp-field-size-xl-font-size` | `18px` | `font-size` |
| `--mp-field-size-xl-height` | `64px` | `flex`, `height`, `min-height` |
| `--mp-field-size-xs-font-size` | `12px` | `font-size` |
| `--mp-field-size-xs-height` | `32px` | `flex`, `height`, `min-height` |
| `--mp-field-suffix-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-field-variant-filled-background` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-field-variant-filled-background-disabled` | `var(--mp-color-fill-2)` | `background` |
| `--mp-field-variant-filled-background-error` | `var(--mp-color-danger-light-1)` | `background` |
| `--mp-field-variant-filled-background-focus` | `var(--mp-color-fill-3)` | `background` |
| `--mp-field-variant-filled-background-hover` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-field-variant-outline-background` | `transparent` | `background` |
| `--mp-field-variant-outline-border-color` | `var(--mp-sys-color-border-default)` | `border`, `border-color` |
| `--mp-field-variant-outline-border-color-disabled` | `var(--mp-sys-color-border-subtle)` | `border-color` |
| `--mp-field-variant-outline-border-color-error` | `var(--mp-sys-color-status-danger)` | `border-color` |
| `--mp-field-variant-outline-border-color-focus` | `var(--mp-sys-color-action-primary)` | `border-color` |
| `--mp-field-variant-outline-border-color-hover` | `color-mix(in srgb, var(--mp-field-variant-outline-border-color) 80%, var(--mp-sys-color-border-strong))` | `border-color` |
| `--mp-field-variant-standard-line-color` | `var(--mp-field-blur-color)` | `border-bottom` |
| `--mp-field-variant-standard-line-color-disabled` | `var(--mp-sys-color-border-subtle)` | `border-bottom-color` |
| `--mp-field-variant-standard-line-color-error` | `var(--mp-field-error-color)` | `border-bottom-color` |
| `--mp-field-variant-standard-line-color-focus` | `var(--mp-field-focus-color)` | `border-bottom-color` |
| `--mp-field-variant-standard-line-size` | `1px` | `border-bottom` |
| `--mp-field-variant-standard-line-size-focus` | `2px` | `border-bottom-width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-field-blur-color: var(--mp-sys-color-content-tertiary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Error and disabled borders

Prefix these suffixes with `--c-field-` / `--mp-field-`: `variant-outline-border-color-error` controls outline error borders; `variant-standard-line-color-error` controls standard error underlines; `variant-standard-line-color-disabled` controls standard disabled underlines and defaults to system border-subtle. Disabled overrides error, hover and focus. All three support local overrides. `field-error-color` still controls error text.
