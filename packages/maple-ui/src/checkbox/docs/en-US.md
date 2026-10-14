# Checkbox

### Intro

Basic demos follow the site language without changing business values or selection. Group demos cover accepted/rejected updates, readonly state and asynchronous option labels; removing options does not clear the model. Use `direction="column"` on the outer Space and `direction="vertical"` on the choice group itself.

A group of options for multiple choices.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Set State Value

```demo
../example/demos/set-state.vue
```

### Modify The Icon And Color

```demo
../example/demos/set-style.vue
```

### Disabled

```demo
../example/demos/disabled.vue
```

### Readonly

```demo
../example/demos/readonly.vue
```

### Indeterminate

```demo
../example/demos/indeterminate.vue
```

### CheckboxGroup

In the checkbox group, you must set the `value` to identify the `checkbox`,
The checkbox group collects all checked identifiers.

```demo
../example/demos/checkbox-group.vue
```

### Options API

Setting child elements via the `options` prop.

```demo
../example/demos/checkbox-group-options.vue
```

### Custom Fields

Customize the format of the data in `options` through the `field-names` attribute.

```demo
../example/demos/custom-fields.vue
```

### Vertical Direction

```demo
../example/demos/vertical.vue
```

### Maximum Number Of Checked

In a checkbox group, you can limit the maximum number of selections by setting `max`.

> For form validation of checkbox and checkbox group, please use the [FormItem component](#/en-US/form-item).

```demo
../example/demos/max.vue
```

### Group state and readonly

A defined `model-value` is controlled: rejected updates do not change the selection. `default-value` initializes uncontrolled state only. Only Group emits `update:model-value → change(value, event?)` and notifies FormItem once; children do not duplicate these notifications.
Group inherits `disabled`, `readonly` and `error` from the form when omitted. An explicit `false` overrides the form; children cannot bypass a locked group.

```demo
../example/demos/en-US/group-state.vue
```

### Asynchronous options

Loading/removing options or updating the external value never emits reverse updates. Selected values absent from the current options are retained. max blocks additions, not deselection; external over-limit values are not truncated.

```demo
../example/demos/en-US/async-options.vue
```

### Standalone values and methods

Checkbox boolean models emit booleans. Array models add/remove the option value without mutating the input array. indeterminate is presentation-only and must be derived by the application.
Use `default-value` only to initialize uncontrolled state. Rejected controlled proposals preserve the current selection. The event order is `update:model-value → change(value, event?)`; imperative calls have no native event.
Methods are `toggle(checked?: boolean)`, `focus(options?)` and `blur()`. Disabled controls cannot select or focus; readonly controls can focus but cannot change value. Enter on keydown and Space on keyup activate only the local control. Repeated Enter is ignored; blur/deactivation cancels pending Space activation.

```demo
../example/demos/en-US/control-value.vue
```

### Option data and labels

Both libraries accept primitive options or objects. `field-names` maps `label/value/disabled/readonly/indeterminate`; read-only options remain focusable but cannot change the value. Checkbox indeterminate is presentation only.
The `label` slot receives `{ data, checked }` and takes precedence over a label render function `(data, checked) => VNodeChild`. Data is normalized and retains business fields; source objects are not mutated. Missing labels fall back to the value's text.
Providing `options` replaces the default slot, including `[]`; omit it to use the default slot. Values must be strings, finite numbers or booleans; missing/invalid values and duplicate values of the same type are skipped (first occurrence wins). `false`, `0`, `''` and `'0'` remain distinct. Option changes never rewrite the model.
CheckboxGroup uses `ChoiceValue[]`; `max` is a number (use `:max="2"`).

```demo
../example/demos/en-US/option-data.vue
```

### Group bulk methods

Both libraries expose `checkAll()` and `inverseAll()`, returning a detached array. They operate on mounted, editable children only and preserve selected disabled, read-only or unloaded values. A duplicate value is locked if any child with that value is locked.
`checkAll` preserves the existing model order and appends missing values in current DOM order; `inverseAll` removes editable selected values before adding previously unselected values. Both enforce `max` without pruning external over-limit values.
Controlled groups return proposals and require parent updates; rejected proposals are not saved. Disabled/read-only groups return a copy of the current value. Actual changes notify `update:model-value → change(value, undefined) → FormItem` once; no-op calls stay silent.
Reordering, mounting, unmounting and KeepAlive activation are read correctly; call methods after `nextTick` when the rendered children change.

```demo
../example/demos/en-US/group-methods.vue
```

### Native controls and appearance

Both libraries use independently copied native checkbox and label bodies. Tab focuses, Space/Enter toggles. A readonly control stays focusable; a disabled control is not focusable. Mixed state is exposed as aria-checked="mixed". A label click triggers one activation. Use aria-label when no visible label is supplied; name is forwarded to native inputs and inherited from the group.

The icon-size prop is a pixel number or CSS length string, not a ComponentSize preset. The default control size is 14px in Cedar and 24px in Maple. Instance colors apply to ordinary states; error and disabled colors take precedence. The checkbox slot overrides the whole visual control (including the group's checkbox slot), while checked-icon, unchecked-icon and indeterminate-icon replace only each icon. These slots are decorative: do not put independent focusable controls inside them.

```demo
../example/demos/en-US/native-control.vue
```

```demo
../example/demos/en-US/custom-control.vue
```

## API

`ChoiceValue = string | number | boolean`;`CheckboxModel = boolean | ChoiceValue[]`;`RadioModel = ChoiceValue | null`.

### Props

#### CheckboxGroup Props

| Prop                   | Description                                                     | Type                                       | Default      |
| ---------------------- | --------------------------------------------------------------- | ------------------------------------------ | ------------ |
| model-value (v-model) | Controlled value | ChoiceValue[] | undefined |
| default-value | Initial uncontrolled value | ChoiceValue[] | [] |
| `disabled` | Disabled; inherits form when omitted | _boolean_ | `undefined` |
| `readonly` | Read only; inherits form when omitted | _boolean_ | `undefined` |
| `error` | Error; inherits form when omitted | _boolean_ | `undefined` |
| max | Maximum selection count | number | undefined |
| `direction`            | The layout direction, optional value is `horizontal` `vertical` | _string_                                   | `horizontal` |
| options | Options; replaces default slot when supplied | Array<ChoiceValue \| CheckboxOption \| Record<string, unknown>> | undefined |
| field-names | Option field mapping | ChoiceFieldNames | undefined |
| name | Native input name inherited by children | string | undefined |
| aria-label | Accessible group name | string | undefined |

#### CheckboxOption

| Property | Description | Type |
| --- | --- | --- |
| value | Option identity | ChoiceValue |
| label | Label content or render function | VNodeChild \| (data: CheckboxOption, checked: boolean) => VNodeChild |
| disabled | Disabled | boolean |
| readonly | Read-only | boolean |
| indeterminate | Presentation-only mixed state | boolean |


#### Checkbox Props

| Prop              | Description                                                  | Type               | Default |
| ----------------- | ------------------------------------------------------------ | ------------------ | ------- |
| model-value (v-model) | Controlled value | boolean \| ChoiceValue[] | undefined |
| default-value | Initial uncontrolled value | boolean \| ChoiceValue[] | false |
| value | Option identity | string \| number \| boolean | true |
| `checked-color`   | Checked color                                                | _string_           | `-`     |
| `unchecked-color` | Unchecked color                                              | _string_           | `-`     |
| `icon-size`       | Icon size                                                    | _string \| number_ | `-`     |
| `disabled` | Inherits group/form when omitted | _boolean_ | `undefined` |
| `readonly` | Inherits group/form when omitted | _boolean_ | `undefined` |
| `error` | Error; inherits group/form | _boolean_ | `undefined` |
| `indeterminate`   | Whether indeterminate status(style has the highest priority) | _boolean_          | `false` |
| uninject-group-context | Ignore surrounding CheckboxGroup; form state still applies | boolean | false |
| name | Native name, inherited from Group | string | undefined |
| aria-label | Accessible name without visible label | string | undefined |
| `ripple`          | Whether to open ripple                                       | _boolean_          | `true`  |

### Methods

#### CheckboxGroup Methods

| Method | Parameters | Return value |
| --- | --- | --- |
| checkAll | - | ChoiceValue[] |
| inverseAll | - | ChoiceValue[] |


#### Checkbox Methods

| Method   | Description                                                                                                | Arguments     | Return |
| -------- | ---------------------------------------------------------------------------------------------------------- | ------------- | ------ |
| toggle | Request a selection; obeys disabled/readonly | checked?: boolean | void |
| focus | Focus the control | options?: FocusOptions | void |
| blur | Blur the control | - | void |

### Events

#### CheckboxGroup Events

| Event    | Description         | Arguments      |
| -------- | ------------------- | -------------- |
| `update:model-value` | Proposes a value | `value: ChoiceValue[]` |
| `change` | Value changed; emitted by Group only | `value: ChoiceValue[], event?: Event` |

#### Checkbox Events

| Event    | Description         | Arguments    |
| -------- | ------------------- | ------------ |
| `click`  | Triggered on Click  | `e: Event`   |
| update:model-value | Proposes a new value | value: CheckboxModel |
| change | Value changed | value: CheckboxModel, event?: Event |
| focus | Focused | event: FocusEvent |
| blur | Blurred | event: FocusEvent |

### Slots

#### CheckboxGroup Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| default | Children when options is omitted | - |
| label | Option label | data: CheckboxOption, checked: boolean |

#### Checkbox Slots

The component and group both support the checkbox slot with { checked, disabled, indeterminate }.


| Name                 | Description        | SlotProps                     |
| -------------------- | ------------------ | ----------------------------- |
| `checked-icon`       | Checked icon       | `-`                           |
| `unchecked-icon`     | Unchecked icon     | `-`                           |
| `indeterminate-icon` | Indeterminate icon | `-`                           |
| `default`            | Displayed text     | `checked: boolean` is checked |

### Style Variables

| Token | Default |
| --- | --- |
| `--mp-checkbox-control-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-checkbox-control-color-checked` | `var(--mp-sys-color-content-brand)` |
| `--mp-checkbox-control-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-checkbox-control-color-error` | `var(--mp-sys-color-content-danger)` |
| `--mp-checkbox-control-size` | `24px` |
| `--mp-checkbox-label-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-checkbox-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-checkbox-label-font-size` | `var(--mp-font-size-md)` |
| `--mp-checkbox-label-gap` | `0` |
| `--mp-checkbox-action-padding` | `6px` |
| `--mp-checkbox-group-gap` | `0` |
| `--mp-checkbox-animation-duration` | `var(--mp-sys-motion-duration-standard)` |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

Exported types：`CheckboxOption`、`ChoiceFieldNames`。

Public method type：`CheckboxGroupMethods`；`CheckboxGroupInstance` includes these methods.

### Reduced motion

Built-in CSS transitions respect `prefers-reduced-motion: reduce`. Final visibility, checked/expanded state and event semantics remain unchanged; custom slot animations are controlled by the application.
