# Checkbox

### Intro

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

## API

### Props

#### CheckboxGroup Props

| Prop                   | Description                                                     | Type                                       | Default      |
| ---------------------- | --------------------------------------------------------------- | ------------------------------------------ | ------------ |
| `v-model`              | The value of the binding                                        | _any[]_                                    | `[]`         |
| `max`                  | Maximum number of checked                                       | _string \| number_                         | `-`          |
| `direction`            | The layout direction, optional value is `horizontal` `vertical` | _string_                                   | `horizontal` |
| `options` _**3.2.11**_ | Specifies options                                               | _CheckboxGroupOption[]_                    | `[]`         |
| `field-names`          | Custom field mapping for `options`                              | _{ label?, value?, children?, disabled? }_ | `-`          |

#### CheckboxGroupOption

| Prop       | Description                 | Type                                                                               | Default |
| ---------- | --------------------------- | ---------------------------------------------------------------------------------- | ------- |
| `label`    | The text of checkbox        | _string \| VNode \| (option: CheckboxGroupOption, checked: boolean) => VNodeChild_ | `-`     |
| `value`    | The value of checkbox       | _any_                                                                              | `-`     |
| `disabled` | Whether to disable checkbox | _boolean_                                                                          | `-`     |

#### Checkbox Props

| Prop              | Description                                                  | Type               | Default |
| ----------------- | ------------------------------------------------------------ | ------------------ | ------- |
| `v-model`         | The value of the binding                                     | _any_              | `false` |
| `value`           | Option value                                                 | _any_              | `true`  |
| `checked-color`   | Checked color                                                | _string_           | `-`     |
| `unchecked-color` | Unchecked color                                              | _string_           | `-`     |
| `icon-size`       | Icon size                                                    | _string \| number_ | `-`     |
| `disabled`        | Whether the disabled                                         | _boolean_          | `false` |
| `readonly`        | Whether the readonly                                         | _boolean_          | `false` |
| `indeterminate`   | Whether indeterminate status(style has the highest priority) | _boolean_          | `false` |
| `ripple`          | Whether to open ripple                                       | _boolean_          | `true`  |

### Methods

#### CheckboxGroup Methods

| Method       | Description | Arguments | Return         |
| ------------ | ----------- | --------- | -------------- |
| `checkAll`   | Check all   | `-`       | `value: any[]` |
| `inverseAll` | Inverse all | `-`       | `value: any[]` |

#### Checkbox Methods

| Method   | Description                                                                                                | Arguments     | Return |
| -------- | ---------------------------------------------------------------------------------------------------------- | ------------- | ------ |
| `toggle` | Toggle the checked state, pass `value` to check, `false` to uncheck, do not pass or other cases to reverse | `value?: any` | `-`    |

### Events

#### CheckboxGroup Events

| Event    | Description         | Arguments      |
| -------- | ------------------- | -------------- |
| `change` | Triggered on change | `value: any[]` |

#### Checkbox Events

| Event    | Description         | Arguments    |
| -------- | ------------------- | ------------ |
| `click`  | Triggered on Click  | `e: Event`   |
| `change` | Triggered on change | `value: any` |

### Slots

#### CheckboxGroup Slots

| Name      | Description            | SlotProps |
| --------- | ---------------------- | --------- |
| `default` | Checkbox Group content | `-`       |

#### Checkbox Slots

| Name                 | Description        | SlotProps                     |
| -------------------- | ------------------ | ----------------------------- |
| `checked-icon`       | Checked icon       | `-`                           |
| `unchecked-icon`     | Unchecked icon     | `-`                           |
| `indeterminate-icon` | Indeterminate icon | `-`                           |
| `default`            | Displayed text     | `checked: boolean` is checked |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                               | Default                               |
| -------------------------------------- | ------------------------------------- |
| `--checkbox-control-color`             | `#555`                                |
| `--checkbox-control-color-checked`     | `var(--color-primary)`                |
| `--checkbox-control-color-disabled`    | `var(--color-text-disabled)`          |
| `--checkbox-control-color-error`       | `var(--sys-color-status-danger)`      |
| `--checkbox-control-size`              | `24px`                                |
| `--checkbox-action-padding`            | `6px`                                 |
| `--checkbox-label-text-color`          | `#555`                                |
| `--checkbox-label-text-color-disabled` | `var(--color-text-disabled)`          |
| `--checkbox-label-font-size`           | `var(--font-size-md)`                 |
| `--checkbox-label-gap`                 | `0`                                   |
| `--checkbox-group-gap`                 | `0`                                   |
| `--checkbox-animation-duration`        | `var(--sys-motion-duration-standard)` |

### API

### Props

| Prop              | Description                                                  | Type               | Default |
| ----------------- | ------------------------------------------------------------ | ------------------ | ------- |
| `v-model`         | The value of the binding                                     | _any_              | `false` |
| `value`           | Option value                                                 | _any_              | `true`  |
| `checked-color`   | Checked color                                                | _string_           | `-`     |
| `unchecked-color` | Unchecked color                                              | _string_           | `-`     |
| `icon-size`       | Icon size                                                    | _string \| number_ | `-`     |
| `disabled`        | Whether the disabled                                         | _boolean_          | `false` |
| `readonly`        | Whether the readonly                                         | _boolean_          | `false` |
| `indeterminate`   | Whether indeterminate status(style has the highest priority) | _boolean_          | `false` |
| `ripple`          | Whether to open ripple                                       | _boolean_          | `true`  |

### Events

| Event    | Description         | Arguments                            |
| -------- | ------------------- | ------------------------------------ |
| `click`  | Triggered on Click  | `e: Event`                           |
| `change` | Triggered on change | `value: any, indeterminate: boolean` |

### Slots

| Name                 | Description        | SlotProps                     |
| -------------------- | ------------------ | ----------------------------- |
| `checked-icon`       | Checked icon       | `-`                           |
| `unchecked-icon`     | Unchecked icon     | `-`                           |
| `indeterminate-icon` | Indeterminate icon | `-`                           |
| `default`            | Displayed text     | `checked: boolean` is checked |
