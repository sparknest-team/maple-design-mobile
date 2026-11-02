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

## Props

The outline notch uses `fieldset / legend`, not a background mask. It starts aligned with the content column and reserves `hint-space` on both sides. CSS `max()/calc()` in `padding-inline-start` must be emitted verbatim by Less, preventing different Less versions from prematurely evaluating it as `0px`. `check:input` checks source parity and both libraries’ Less output.

| Prop | Type | Default / meaning |
| --- | --- | --- |
| `tag` | `'div' \| 'span'` | `div`; wrapper element |
| `value` | `unknown` | Checks only whether content is empty |
| `id` | `string` | Native control id associated with the floating label |
| `title` | `string` | Native title tooltip |
| `size` | `ComponentSize` | `md`; implements all five sizes |
| `variant` | `'outline' \| 'filled' \| 'standard'` | `outline` |
| `placeholder` | `string` | Floating label text |
| `hint` | `boolean` | Cedar false / Maple true |
| `hint-center` | `boolean` | `true`; use false for multiline controls |
| `line` | `boolean` | `true`; whether to show a border or underline |
| `focused` | `boolean` | Consumer-supplied focus state |
| `composing` | `boolean` | Keep the label floated during IME composition |
| `disabled` / `readonly` / `error` | `boolean` | Provided by the consumer after merging Form / Group state |
| `clearable` | `boolean` | `false`; whether clearing is allowed |
| `text-color` / `focus-color` / `blur-color` | `string` | Custom text, focused and unfocused colors |
| `cursor` | `string` | Custom caret |

## Slots and events

`default` contains a native input, tags or display content. `prefix` / `suffix` contain adornments. `clear-icon` receives `clear(event?)`; a custom button should call it. Clearing does not bubble to open the selection panel.

`clear(event)` asks the consumer to update the value; `mousedown(event)` lets the consumer manage focus. The wrapper does not mutate the model itself.

Style semantics use `--c-field-*` / `--mp-field-*`, declared in each library's `style/token.less`. Implementations are not shared across libraries. Consumers must not draw a second border.

## Error and disabled border variables

Prefix these suffixes with `--c-field-` / `--mp-field-`: `variant-outline-border-color-error` controls outline error borders; `variant-standard-line-color-error` controls standard error underlines; `variant-standard-line-color-disabled` controls standard disabled underlines and defaults to system border-subtle. Disabled overrides error, hover and focus. All three support local overrides. `field-error-color` still controls error text. Internal variables are not business API; unused legacy declarations are removed without aliases.
## Keyboard focus

FieldDecorator adds no outer outline: outline variants use border-state, filled uses backgrounds and standard uses underlines for `--focus`/`:focus-within`. Clear/password/stepper buttons retain their own keyboard focus indicators. Readonly retains focus; disabled/error color precedence stays unchanged. This is not a claim that error-focus distinguishability/native accessibility has been validated.

Native Input/Textarea/InputNumber controls use `caret-color: currentColor`, not field-focus-color/field-error-color. Those variables and field-border-width still serve hints/borders/button outlines and must not be removed just because caret/outer-offset paths are gone. Instance focus-color controls supported variant/hint channels without promising caret changes. No variables/defaults/business APIs are added.

`--mp-field-caret-color` defaults to `currentColor` and controls Input/InputNumber/Textarea carets without changing text.

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.


### Loading tokens

| Token | Default |
| --- | --- |
| `--mp-field-loading-line-size` | `2px` |
| `--mp-field-loading-duration` | `1s` |
| `--mp-field-loading-color` | `var(--mp-field-focus-color)` |

Changing `tag` rebinds size observation to the current root and content elements. KeepAlive deactivation releases observation and queued measurement; frames from an earlier activation cannot update the current layout.
