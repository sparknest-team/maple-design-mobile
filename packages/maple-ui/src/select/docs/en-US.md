# Select

### Intro

Display and select the content through the drop-down menu.

### Standard Variant

```demo
../example/demos/standard.vue
```

### Outlined Variant

```demo
../example/demos/outline.vue
```

### Picker Mode

Set `presentation` to `picker` to use a bottom-sheet wheel picker.



> Picker mode only supports the `options` prop. Slot-based `<mp-option>` is not supported in picker mode.

```demo
../example/demos/picker.vue
```

### Picker Multiple

Same cart flow as Cascader: tap **Add** to push the current wheel value into a draft, **Done** commits to `v-model`, **Cancel** discards the draft.

```html
<script setup>
  import { ref } from 'vue'

  const pickerMultiple = ref([])
  const pickerOptions = ref([
    { label: 'Eat', value: 1 },
    { label: 'Sleep', value: 2 },
    { label: 'Play game', value: 3 },
    { label: 'Write documentation', value: 4 },
  ])
</script>

<template>
  <mp-select
    presentation="picker"
    multiple
    tag
    clearable
    placeholder="Please select multiple options"
    v-model="pickerMultiple"
    :options="pickerOptions"
  />
</template>
```

### List Mode

Set `presentation` to `list` to show options in a bottom-sheet list. Selected items show a checkmark on the right.

Single: tap to select and close. Multiple: tap to toggle draft selection, **Done** commits, **Cancel** discards.



> List mode only supports the `options` prop. Slot-based `<mp-option>` is not supported in list mode.

```demo
../example/demos/list.vue
```

## API

### Props

#### Select Props

| Prop                        | Description                                                          | Type                                       | Default     |
| --------------------------- | -------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `v-model`                   | The value of the binding                                             | _any \| any[]_                             | `-`         |
| `size`                      | Select size: `xs` `sm` `md` `lg` `xl`                                | _ComponentSize_                            | `md`        |
| `variant`                   | Select variant, The optional value is `filled` `outline` `standard` | _string_                                   | `standard`  |
| `presentation` _**3.18.0**_ | Display mode, optional values `menu` `picker` `list`                 | _string_                                   | `menu`      |
| `show` _**3.18.0**_         | Visibility control                                                   | _boolean_                                  | `undefined` |
| `placeholder`               | placeholder                                                          | _string_                                   | `-`         |
| `multiple`                  | Whether to enable multiple selection                                 | _boolean_                                  | `false`     |
| `offset-y`                  | The vertical offset of the drop-down menu                            | _string \| number_                         | `0`         |
| `tag`                       | Whether to use tag style (multiple choices only)                     | _boolean_                                  | `false`     |
| `line`                      | Whether to display a dividing line                                   | _boolean_                                  | `true`      |
| `hint`                      | Whether to use placeholders as prompts                               | _boolean_                                  | `true`      |
| `text-color`                | Text color                                                           | _string_                                   | `-`         |
| `focus-color`               | The primary color in focus                                           | _string_                                   | `-`         |
| `blur-color`                | The primary color in blur                                            | _string_                                   | `-`         |
| `readonly`                  | Whether the readonly                                                 | _boolean_                                  | `false`     |
| `disabled`                  | Whether the disabled                                                 | _boolean_                                  | `false`     |
| `clearable`                 | Whether the clearable                                                | _boolean_                                  | `false`     |
| `options` _**3.3.4**_       | Specifies options                                                    | _SelectOption[]_                           | `[]`        |
| `field-names`               | Custom field mapping for `options`                                   | _{ label?, value?, children?, disabled? }_ | `-`         |
| `picker-props` _**3.18.0**_ | Props passed to `mp-picker` in picker mode                           | _Partial\<PickerProps\>_                   | `{}`        |
| auto-fit-popup-width | Whether the menu matches the trigger width; false fits content (menu presentation). | `boolean` | `true` |
| `popup-props` _**3.18.0**_  | Props passed to popup                                                | _Partial\<PopupProps\>_                    | `{}`        |

Validation rules are now configured on `mp-form-item`, see [Form](#/en-US/form).

#### SelectOption

| Prop                 | Description               | Type                                                                         | Default |
| -------------------- | ------------------------- | ---------------------------------------------------------------------------- | ------- |
| `label`              | The text of option        | _string \| VNode \| (option: SelectOption, selected: boolean) => VNodeChild_ | `-`     |
| `value`              | The value of option       | _any_                                                                        | `-`     |
| `disabled`           | Whether to disable option | _boolean_                                                                    | `-`     |
| `ripple` _**3.3.0**_ | Whether to enable ripple  | _boolean_                                                                    | `true`  |

#### Option Props

| Prop       | Description                       | Type      | Default |
| ---------- | --------------------------------- | --------- | ------- |
| `label`    | The text that the option displays | _any_     | `-`     |
| `value`    | The value of the option binding   | _any_     | `-`     |
| `disabled` | Whether to disable                | _boolean_ | `false` |

### Methods

#### Select Methods

| Method  | Description | Arguments | Return |
| ------- | ----------- | --------- | ------ |
| `focus` | Focus       | `-`       | `-`    |
| `blur`  | Blur        | `-`       | `-`    |

### Events

#### Select Events

| Event    | Description                 | Arguments             |
| -------- | --------------------------- | --------------------- |
| `focus`  | Triggered when focusing     | `event: Event`        |
| `blur`   | Triggered when out of focus | `event: Event`        |
| `click`  | Triggered on click          | `event: Event`        |
| `clear`  | Triggered on clearance      | `value: any \| any[]` |
| `close`  | Triggered on close          | `value: any[]`        |
| `change` | Triggered when change       | `value: any \| any[]` |

### Slots

#### Select Slots

| Name         | Description                     | SlotProps                                                                                              |
| ------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `selected`   | Select the contents of the area | `-`                                                                                                    |
| `prefix`     | Prefix                          | `-`                                                                                                    |
| `clear-icon` | Clear Icon                      | `clear: (e: Event) => void` clear function (can be used to clear select box contents when using slots) |
| `suffix`     | Suffix                          | `-`                                                                                                    |
| `arrow-icon` | Arrow icon                      | `focus: boolean` Whether to focus, `menu-open: boolean` Whether menu opened                            |

#### Option Slots

| Name      | Description                    | SlotProps                           |
| --------- | ------------------------------ | ----------------------------------- |
| `default` | Options to display the content | `selected: boolean` selected or not |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### Select Variables

| Variable                                      | Default                                                      |
| --------------------------------------------- | ------------------------------------------------------------ |
| `--mp-field-control-text-color`                       | `#555`                                                       |
| `--mp-field-error-color`                      | `var(--mp-color-danger)`                                     |
| `--mp-field-blur-color`                       | `#888`                                                       |
| `--mp-field-focus-color`                      | `var(--mp-color-primary)`                                    |
| `--mp-field-placeholder-text-color`           | `var(--mp-field-blur-color)`                                 |
| `--mp-field-control-text-color-disabled`              | `var(--mp-color-text-disabled)`                              |
| `--mp-internal-field-size-placeholder`                 | `16px`                                                       |
| `--mp-field-icon-size`                        | `20px`                                                       |
| `--mp-field-border-radius`                    | `4px`                                                        |
| `--mp-field-variant-standard-line-size`       | `1px`                                                        |
| `--mp-field-variant-standard-line-size-focus` | `2px`                                                        |
| `--mp-field-variant-filled-background`                | `var(--mp-color-fill-2)`                                     |
| `--mp-field-size-xs-height`                   | `32px`                                                       |
| `--mp-field-size-sm-height`                   | `40px`                                                       |
| `--mp-field-size-md-height`                   | `48px`                                                       |
| `--mp-field-size-lg-height`                   | `56px`                                                       |
| `--mp-internal-field-size-xl-height`                   | `64px`                                                       |
| `--select-popup-bg`                           | `var(--color-fill-2)`                                        |
| `--select-popup-padding-vertical`             | `6px`                                                        |
| `--select-popup-max-height`                   | `278px`                                                      |
| `--select-popup-border-radius`                | `2px`                                                        |
| `--select-label-font-size`                    | `16px`                                                       |
| `--select-tags-margin`                        | `-5px 0 0 0`                                                 |
| `--select-tags-padding`                       | `2px 0`                                                      |
| `--select-tag-margin`                         | `5px 5px 0 0`                                                |
| `--select-arrow-size`                         | `20px`                                                       |
| `--select-standard-menu-margin`               | `calc(var(--mp-internal-field-size-placeholder) * 0.75 + 14px) 0 0 0` |

#### Option Variables

| Variable                       | Default                              |
| ------------------------------ | ------------------------------------ |
| `--option-height`              | `38px`                               |
| `--option-padding`             | `0 12px`                             |
| `--option-font-size`           | `16px`                               |
| `--option-selected-background` | `var(--input-decorator-focus-color)` |
| `--option-text-color`          | `#555`                               |

## Option

### API

#### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `label` | The text that the option displays | _any_ | `-` |
| `value` | The value of the option binding | _any_ | `-` |
| `disabled` | Whether to disable | _boolean_ | `false` |
| `ripple` ***3.8.0***  | Whether to enable ripple | _boolean_ | `true` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Options to display the content | `selected: boolean` selected or not |
