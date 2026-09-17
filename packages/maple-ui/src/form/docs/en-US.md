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

## API

### Props

#### Form Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model` | The form data object, `FormItem` reads and writes to it using `field` | _Record<string, any>_ | `-` |
| `layout` | Form item layout, `vertical` or `horizontal`; can be overridden by `FormItem.layout` | _'vertical' \| 'horizontal'_ | `'vertical'` |
| `readonly` | Whether the readonly | _boolean_ | `false` |
| `disabled` | Whether the disabled | _boolean_ | `false` |
| `scroll-to-error` | Whether to scroll to the failed form item when the validation fails, the optional value is `start` `end` | _string_ | `-` |
| `scroll-to-error-offset-y` | Scroll to the position offset of the form item that fails validation | _number \| string_ | `0` |

### Methods

#### Form Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `validate` | Trigger validation for the form items, validates all items when `field` is omitted | `field?: string \| string[]` | `valid: Promise<boolean>` |
| `validateField` | Trigger validation for the given form item(s) | `field: string \| string[]` | `valid: Promise<boolean>` |
| `resetFields` | Reset the value and validation message of the form item(s) to their initial value, resets all items when `field` is omitted | `field?: string \| string[]` | `-` |
| `clearValidate` | Clear the validation message of the form item(s), clears all items when `field` is omitted | `field?: string \| string[]` | `-` |
| `scrollToField` | Scroll to the given form item | `field: string` | `-` |

### Events

#### Form Events

| Event | Description  | Arguments  |
| --- | --- | --- |
| `submit` | Triggered when the form is submitted | `valid: boolean` Whether to pass the form verification |
| `reset` | Fired when the form is reset | `-` |

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
| `layout` | Layout, `vertical` or `horizontal`; inherits `Form.layout` when omitted | _'vertical' \| 'horizontal'_ | `-` |
| `required` | Required (asterisk + auto required rule) | _boolean_ | `false` |
| `hide-label` | Hide label | _boolean_ | `false` |
| `hide-asterisk` | Hide required asterisk | _boolean_ | `false` |
| `asterisk-position` | Asterisk position | _'start' \| 'end'_ | `'start'` |
| `help` | Help text (shown when no error) | _string_ | `-` |
| `extra` | Extra text | _string_ | `-` |
| `disabled` | Disabled | _boolean_ | `false` |
| `no-style` | Remove label/error UI, keep validation | _boolean_ | `false` |
| `rules` | Validation rules (function / Zod / array) | _any_ | `-` |
| `validate-trigger` | Triggers for validation | _FormItemValidateTrigger \| FormItemValidateTrigger[]_ | `'change'` |

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
| `validate` | Validate the field | `-` | `Promise<boolean>` |
| `clearValidate` | Clear validation status | `-` | `-` |
| `resetField` | Reset value to initial and clear validation | `-` | `-` |

### Type Definitions

```ts
type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'
type FormItemLayout = 'vertical' | 'horizontal'
```
