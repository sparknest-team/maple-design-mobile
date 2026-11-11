

# FormDetails

Form helper messages for errors and additional guidance.

Error text uses `role="alert"`; additional guidance remains ordinary text. Within FormItem, text, numeric, selection, date/time, choice, switch, slider, rate, verification-code, and upload fields associate errors with their controls or groups while preserving caller-provided `aria-describedby`. Custom controls can use `useFormErrorDescription()` to associate errors with their interactive element.

## Reading direction

Inherits source dir. Errors align to inline start, extra information to inline end, and their spacing follows reading direction.

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

## Customization and slots

### Custom helper content

```demo
../example/demos/extra-slot.vue
```

## API

### FormDetails Props

| Prop | Description | Type | Default |
| ----------------- | --------- | --- | --- |
| `error-message` | Error message | _string_ | `-` |
| `extra-message` | Extra message | _string_ | `-` |

### FormDetails Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `extra-message` | Extra message | `-` |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-form-details-error-message-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-form-details-extra-message-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-form-details-font-size` | `12px` | `font-size` |
| `--mp-form-details-margin-top` | `6px` | `margin-top` |
| `--mp-form-details-message-margin-right` | `4px` | `margin-inline-end` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-form-details-error-message-color: var(--mp-sys-color-content-danger);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
