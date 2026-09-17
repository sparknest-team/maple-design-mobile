# Radio

### Intro

Single selection among multiple options.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Set State Value

```demo
../example/demos/set-state.vue
```

### Modify Icon And Color

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

### RadioGroup

In the radio group, you must set the `value` to identify the `radio`,
The radio group bind group checked identifiers.

```demo
../example/demos/radio-group.vue
```

### Options API

Setting child elements via the `options` prop.

```demo
../example/demos/radio-group-options.vue
```

### Custom Fields

Customize the format of the data in `options` through the `field-names` attribute.

```demo
../example/demos/custom-fields.vue
```

### Vertical Direction



> For form validation of radio and radio group, please use the [FormItem component](#/en-US/form-item).

```demo
../example/demos/vertical.vue
```

## API

### Props

#### RadioGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | The value of the binding | _any_ | `-` |
| `direction` | The layout direction, optional value is `horizontal` `vertical` | _string_ | `horizontal` |
| `options` ***3.2.14*** | Specifies options | _RadioGroupOption[]_ | `[]` |
| `field-names` | Custom field mapping for `options` | _{ label?, value?, children?, disabled? }_ | `-` |
| `aria-label` ***3.8.5*** | The label of the radio group | _string_ | `-` |

#### RadioGroupOption

| Prop | Description | Type | Default |
| ------- | --- |----------------|-----------|
| `label`    |   The text of radio    | _string \| VNode \| (option: RadioGroupOption, checked: boolean) => VNodeChild_      | `-`   |
| `value`  |    The value of radio    | _any_      | `-`   |
| `disabled`    |    Whether to disable radio   | _boolean_      | `-`   |

#### Radio Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | The value of the binding | _any_ | `false` |
| `value` | Option value | _any_ | `true` |
| `checked-color` | Checked color | _string_ | `-` |
| `unchecked-color` | Unchecked color | _string_ | `-` |
| `icon-size` | Icon size | _string \| number_ | `-` |
| `readonly` | Whether the readonly | _boolean_ | `false` |
| `disabled` | Whether the disabled | _boolean_ | `false` |
| `ripple` | Whether to open ripple | _boolean_ | `true` |

### Methods

#### Radio Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `toggle` | Toggle the checked state, pass `value` to check, `false` to uncheck, do not pass or other cases to reverse | `value: any` | `-` |

### Events

#### RadioGroup Events

| Event | Description | Arguments |
| --- | --- | --- |
| `change` | Triggered on change | `value: any` |

#### Radio Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered on click | `e: Event` |
| `change` | Triggered on change | `value: any` |

### Slots

#### RadioGroup Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Radio Group content | `-` |

#### Radio Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `checked-icon` | Checked icon | `-` |
| `unchecked-icon` | Unchecked icon | `-` |
| `default` | Displayed text | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### Radio Variables

| Variable | Default |
| --- | --- |
| `--radio-checked-color` | `var(--color-primary)` |
| `--radio-unchecked-color` | `#555` |
| `--radio-disabled-color` | `var(--color-text-disabled)` |
| `--radio-error-color` | `var(--color-danger)` |
| `--radio-action-padding` | `6px` |
| `--radio-icon-size` | `24px` |
| `--radio-text-color` | `#555` |

### API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | The value of the binding | _any_ | `false` |
| `value` | Option value | _any_ | `true` |
| `checked-color` | Checked color | _string_ | `-` |
| `unchecked-color` | Unchecked color | _string_ | `-` |
| `icon-size` | Icon size | _string \| number_ | `-` |
| `readonly` | Whether the readonly | _boolean_ | `false` |
| `disabled` | Whether the disabled | _boolean_ | `false` |
| `ripple` | Whether to open ripple | _boolean_ | `true` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered on click | `e: Event` |
| `change` | Triggered on change | `value: any` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `checked-icon` | Checked icon | `-` |
| `unchecked-icon` | Unchecked icon | `-` |
| `default` | Displayed text | `checked: boolean` is checked |
