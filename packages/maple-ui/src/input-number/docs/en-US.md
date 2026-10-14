# InputNumber

One real IAB default/light repeat lifecycle case passes per platform: actual first/subsequent repeat, stable after cancellation, fresh hold unmounted before800ms and stable beyond deadline, final nodes0. Entry click is native but internal pointerdown/pointercancel is scripted; not native long press/touch, dequeued-race, cross-window or OS evidence.

Each long-press timer validates and consumes its generation before stepping. Old callbacks after stop, replacement, release, deactivation or disposal cannot change the value; a reentrant step that starts another hold cannot cancel that replacement through its return value. Inactive owners reject new holds; reactivation requires a new gesture rather than resuming the old one. Initial800ms/repeat150ms are interaction cadence, not CSS motion tokens. Eight controlled-timer/stale-callback tests pass per platform (seven fail before repair); full InputNumber Cedar45/Maple48 pass. This is not real browser or OS acceptance.

InputNumber edits and commits JavaScript numbers. The libraries own independent copies of the view, controller, styles and API; no runtime instance is shared.

- A defined model-value is controlled; default-value only initializes uncontrolled state. Drafts may differ while editing. A rejected proposal restores the parent value after commit. External updates never emit user events or trigger validation.
- By default, Enter or blur commits. With model-event="input", complete numeric edits update immediately; change still represents a commit. Enter followed by blur does not commit twice.
- Clearing emits **input → update:model-value → change → clear**, with an undefined value. The former clear-only behavior is removed without an alias or compatibility branch.
- Intermediate signs and decimal points are preserved while editing. A trailing decimal point commits as a number; a lone sign/dot restores the previous value. Invalid text and non-finite numbers are never published. IME input is processed once after composition.
- Range limits win over precision. Both copies use isolated Decimal configuration; the public model remains a JavaScript number, not arbitrary-precision storage.
- disabled/readonly/size inherit from InputGroup and Form. Explicit false overrides inheritance. variant/hint inherit InputGroup. An outer FormItem label suppresses a duplicate floating label. Cedar also reads ConfigProvider for fallback size; Maple uses its existing defaults.
- Mouse/touch long press stops on release, cancel, leave, window blur, deactivation, disposal or state changes. Button mode offers larger touch targets. Arrow keys step; Enter commits.

## Examples

### Basic states

```demo
../example/demos/en-US/field-basic.vue
```

### Control layouts

```demo
../example/demos/en-US/field-modes.vue
```

### Sizes and variants

```demo
../example/demos/en-US/field-options.vue
```

### Controlled values and events

```demo
../example/demos/en-US/controlled-events.vue
```

### Form inheritance

```demo
../example/demos/en-US/form-inheritance.vue
```

### Formatting and slots

```demo
../example/demos/en-US/format-slots.vue
```

### Small steps and boundaries

```demo
../example/demos/en-US/number-boundaries.vue
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value | Controlled number; undefined denotes an empty/uncontrolled value | `number` | — |
| default-value | Initial uncontrolled value | `number` | — |
| mode | Step-button layout | `embed \| button \| input` | `embed` |
| precision | Decimal places (0–100), at least the step precision | `number` | — |
| step | Positive finite step; scientific notation supported | `number` | `1` |
| disabled | Disabled; inherits when omitted | `boolean` | Inherited, otherwise false |
| error | Error state; inherits FormItem when omitted | `boolean` | Inherited, otherwise false |
| max | Maximum | `number` | `Infinity` |
| min | Minimum | `number` | `-Infinity` |
| formatter | Display formatting only; does not change the number | `(text: string) => string` | — |
| parser | Parse the original text once per edit | `(text: string) => string` | — |
| placeholder | Placeholder | `string` | — |
| size | All five sizes implemented; inheritable | `xs \| sm \| md \| lg \| xl` | Inherited, otherwise md |
| variant | Field variant; inherits InputGroup | `outline \| filled \| standard` | `outline` |
| hint | Floating hint; inherits InputGroup / FieldDecorator | `boolean` | Library default |
| clearable | Allow clearing an editable field | `boolean` | `false` |
| model-event | Model update timing; change only reports commits | `change \| input` | `change` |
| readonly | Read-only; allows focus/copy but no mutations | `boolean` | Inherited, otherwise false |
| input-attrs | Additional native input attributes | `Record<string, unknown>` | — |

### Events

| Event | Arguments | Description |
| --- | --- | --- |
| input | `(value: number \| undefined, text: string, event: Event)` | Parsed value and display text while editing |
| update:model-value | `(value: number \| undefined)` | Proposed model update |
| change | `(value: number \| undefined, event: Event)` | Commit, step or clear |
| clear | `(event: Event)` | Explicit clear |
| focus | `(event: FocusEvent)` | Focus |
| blur | `(event: FocusEvent)` | Blur |
| keydown | `(event: KeyboardEvent)` | Native keyboard event; preventDefault intercepts default actions |

### Slots

| Slot | Arguments | Description |
| --- | --- | --- |
| prefix / suffix | — | Inside the field |
| prepend / append | — | Outside the field |
| plus / minus | — | Step-button icons |
| clear-icon | `{ clear: (event?: Event) => void }` | Custom clear button |

### Methods

| Method / Property | Type | Description |
| --- | --- | --- |
| focus | `(options?: FocusOptions) => void` | Focus; ignored when disabled |
| blur | `() => void` | Blur |
| select | `() => void` | Select input text |
| inputRef | `HTMLInputElement \| undefined` | Native input element |

## Types

```ts
import type { InputNumberProps, InputNumberInstance, InputNumberMode, InputNumberModelEvent, InputNumberSize, InputNumberVariant, InputNumberFormatter, InputNumberParser } from '@maplejs/maple-ui'
```

## Style tokens

| Token | Default |
| --- | --- |
| `--mp-input-number-step-button-width` | `var(--mp-sys-control-height-md)` |
| `--mp-input-number-step-button-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-input-number-step-button-disabled-color` | `var(--mp-sys-color-content-disabled)` |
| `--mp-input-number-step-button-border-color` | `var(--mp-sys-color-border-subtle)` |
| `--mp-input-number-step-button-background` | `var(--mp-sys-color-surface-muted)` |
| `--mp-input-number-step-button-hover-background` | `var(--mp-sys-color-state-hover)` |
| `--mp-input-number-step-button-active-background` | `var(--mp-sys-color-state-selected)` |
| `--mp-input-number-step-button-icon-size` | `14px` |
| `--mp-input-number-step-button-transition-duration` | `0.2s` |
| `--mp-input-number-addon-background` | `var(--mp-sys-color-surface-muted)` |
| `--mp-input-number-addon-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-input-number-addon-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-input-number-border-width` | `1px` |
| `--mp-input-number-border-radius` | `var(--mp-field-border-radius)` |
| `--mp-input-number-size-xs-step-button-width` | `var(--mp-sys-control-height-xs)` |
| `--mp-input-number-size-sm-step-button-width` | `var(--mp-sys-control-height-sm)` |
| `--mp-input-number-size-md-step-button-width` | `var(--mp-sys-control-height-md)` |
| `--mp-input-number-size-lg-step-button-width` | `var(--mp-sys-control-height-lg)` |
| `--mp-input-number-size-xl-step-button-width` | `var(--mp-sys-control-height-xl)` |

Shared field visuals use FieldDecorator tokens. The former step-layer-border-radius token is removed without an alias.
