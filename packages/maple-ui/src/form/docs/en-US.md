# Form

### Intro

Provides the ability to control all form components. Use with `FormItem`.

- With `FormItem.label`: outer label (vertical / horizontal); floating placeholder on Input / Select is turned off automatically.
- Without `FormItem.label`: controls keep floating placeholder (`placeholder` + `hint`).


### Basic Form

```demo
../example/demos/en-US/example.vue
```

### Form Controller

Use the Form instance to reset fields, clear validation, validate, and toggle disabled or readonly state.

```demo
../example/demos/en-US/controller.vue
```

### Form Events

Handle native form submission and reset behavior with the `submit` and `reset` events.

```demo
../example/demos/en-US/events.vue
```

### Validate on clear

`validate-trigger="clear"` validates only when the user clicks a control's clear button, not while typing.

```demo
../example/demos/en-US/clear-trigger.vue
```

## API

### Props

#### Form Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model` | The form data object, `FormItem` reads and writes to it using `field` | _Record<string, any>_ | `-` |
| `layout` | Form item layout: `vertical`, `horizontal`, or `inline`; can be overridden by `FormItem.layout` | _'vertical' \| 'horizontal' \| 'inline'_ | `'vertical'` |
| `size` | Form control size inherited by FormItem and controls | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `rules` | Validation rules keyed by field name | _Record<string, rule \| rule[]>_ | `-` |
| `readonly` | Whether controls are readonly | _boolean_ | `-` |
| `disabled` | Whether controls are disabled | _boolean_ | `-` |
| `scroll-to-error` | Whether to scroll to the failed form item when the validation fails, the optional value is `start` `end` | _string_ | `-` |
| `scroll-to-error-offset-y` | Scroll to the position offset of the form item that fails validation | _number \| string_ | `0` |

### Methods

#### Form Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `validate` | Validate all form items | `callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `validateField` | Validate the given form item(s) | `field: string \| string[]`, `callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `resetFields` | Reset the value and validation message of the form item(s) to their initial value, resets all items when `field` is omitted | `field?: string \| string[]` | `-` |
| `clearValidate` | Clear the validation message of the form item(s), clears all items when `field` is omitted | `field?: string \| string[]` | `-` |
| `setFields` | Set field values or error states in batches | `Record<string, { value?; status?; message? }>` | `-` |
| `scrollToField` | Scroll to the given form item | `field: string` | `-` |

### Events

#### Form Events

| Event | Description  | Arguments  |
| --- | --- | --- |
| `submit` | Triggered when the form is submitted | `data: { values; errors }`, `event: Event` |
| `submit-success` | Triggered after successful validation | `values`, `event: Event` |
| `submit-failed` | Triggered after failed validation | `data: { values; errors }`, `event: Event` |
| `reset` | Fired when the form is reset | `event: Event` |

### Slots

#### Form Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Form content | `-` |

## FormItem

### Intro

Form item for labels, validation rules, and error messages. Use with `Form` and form controls.

- With `label`: outer label layout; Input / Select automatically disable floating `hint`.
- Without `label`: no outer label; controls keep floating placeholder mode.

### Outer Label (aligned with Cedar)

Pass `label` to use an outer label and `layout="vertical"` to stack the label and control.

```demo
../example/demos/en-US/vertical-label.vue
```

### Horizontal Layout

Use `layout="horizontal"` to place labels beside controls. A FormItem can override the form layout.

```demo
../example/demos/en-US/horizontal-layout.vue
```

### Floating Placeholder (no label)

Without `label`, no outer label is rendered and Input keeps its floating placeholder.

```demo
../example/demos/en-US/floating-placeholder.vue
```

### Help and Extra Content

Use `help` for guidance and `extra` for supplementary information.

```demo
../example/demos/en-US/help-extra.vue
```

### Custom Form Control

Custom controls use `FormItem.useFormItem` (or `Form.useFormItem`) to participate in validation.

```demo
../example/demos/en-US/custom-control.vue
```

### API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `field` | Field path in `Form.model`, supports `a.b` | _string_ | `''` |
| `label` | Label text; when set, renders outer label and disables floating hint | _string_ | `-` |
| `layout` | Layout: `vertical`, `horizontal`, or `inline`; inherits `Form.layout` when omitted | _'vertical' \| 'horizontal' \| 'inline'_ | `-` |
| `required` | Required (asterisk + auto required rule) | _boolean_ | `false` |
| `hide-label` | Hide label | _boolean_ | `false` |
| `feedback` | Show input validation feedback, including pending async validation | _boolean_ | `false` |
| `validate-status` | Explicit feedback state; otherwise derived from validation | _'success' \| 'warning' \| 'error' \| 'validating'_ | `-` |
| `hide-asterisk` | Hide required asterisk | _boolean_ | `false` |
| `asterisk-position` | Asterisk position | _'start' \| 'end'_ | `'start'` |
| `help` | Help text (shown when no error) | _string_ | `-` |
| `extra` | Extra text | _string_ | `-` |
| `disabled` | Disabled; inherits Form when omitted | _boolean_ | `-` |
| `readonly` | Readonly; inherits Form when omitted | _boolean_ | `-` |
| `size` | Control size; inherits Form when omitted | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `no-style` | Remove label/error UI, keep validation | _boolean_ | `false` |
| `rules` | Validation rules (function / Zod / array) | _any_ | `-` |
| `validate-trigger` | Validation triggers; `clear` fires only for a control's clear action, not for `change` | _FormItemValidateTrigger \| FormItemValidateTrigger[]_ | `'change'` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `validate` | Emitted after validation | `valid: boolean` |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Form control |
| `label` | Custom label |
| `help` | Custom help |
| `extra` | Custom extra |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `validate` | Validate the field | `-` | `Promise<undefined \| ValidatedError>` |
| `clearValidate` | Clear validation status | `-` | `-` |
| `resetField` | Reset value to initial and clear validation | `-` | `-` |

### Type Definitions

```ts
type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'
type FormItemLayout = 'vertical' | 'horizontal'
```
