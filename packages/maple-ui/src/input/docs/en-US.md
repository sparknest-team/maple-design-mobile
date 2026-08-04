# Input

### Intro

The behavior of the input box is consistent with the basic content, and the user can always get a string that conforms to the `type` rule when inputting.

### Standard Variant

```html
<script setup>
  import { ref } from 'vue'

  const value = ref('')
  const value2 = ref('')
  const value3 = ref('')
  const value4 = ref('')
  const value5 = ref('')
  const value7 = ref('')
  const value8 = ref('')
  const value9 = ref('')
  const value11 = ref('')
  const value12 = ref('')
  const value13 = ref('')
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-input placeholder="Please enter text" v-model="value" />
    <mp-input placeholder="Please enter number" type="number" v-model="value13" />
    <mp-input placeholder="Readonly" readonly v-model="value2" />
    <mp-input placeholder="Disabled" disabled v-model="value3" />
    <mp-input placeholder="Clearable" clearable v-model="value4" />
    <mp-input clearable placeholder="Use the clear icon slot" v-model="value5">
      <template #clear-icon="{ clear }">
        <mp-icon name="error" @click="clear" />
      </template>
    </mp-input>
    <mp-input placeholder="Display Icon" v-model="value7">
      <template #prefix>
        <mp-icon class="prefix" name="github" />
      </template>
      <template #suffix>
        <mp-icon class="suffix" name="github" />
      </template>
    </mp-input>
    <mp-input placeholder="Custom Icon Size" v-model="value8">
      <template #prefix>
        <mp-icon class="prefix" name="github" :size="28" />
      </template>
      <template #suffix>
        <mp-icon class="suffix" name="github" :size="42" />
      </template>
    </mp-input>
    <mp-input placeholder="Maxlength" :maxlength="10" v-model="value9" />
    <mp-input placeholder="Small Size" size="small" v-model="value11" />
    <mp-input placeholder="Removes whitespace from both ends of this string" v-model.trim="value12" />
  </mp-space>
</template>

<style>
  .prefix {
    margin-right: 6px;
  }

  .suffix {
    margin-left: 6px;
  }
</style>
```

### Outlined Variant

```html
<script setup>
  import { ref } from 'vue'

  const value = ref('')
  const value2 = ref('')
  const value3 = ref('')
  const value4 = ref('')
  const value5 = ref('')
  const value7 = ref('')
  const value8 = ref('')
  const value9 = ref('')
  const value11 = ref('')
  const value12 = ref('')
  const value13 = ref('')
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-input variant="outlined" placeholder="Please enter text" v-model="value" />
    <mp-input variant="outlined" placeholder="Please enter number" type="number" v-model="value13" />
    <mp-input variant="outlined" placeholder="Readonly" readonly v-model="value2" />
    <mp-input variant="outlined" placeholder="Disabled" disabled v-model="value3" />
    <mp-input variant="outlined" placeholder="Clearable" clearable v-model="value4" />
    <mp-input variant="outlined" clearable placeholder="Use the clear icon slot" v-model="value5">
      <template #clear-icon="{ clear }">
        <mp-icon name="error" @click="clear" />
      </template>
    </mp-input>
    <mp-input variant="outlined" placeholder="Display Icon" v-model="value7">
      <template #prefix>
        <mp-icon class="prefix" name="github" />
      </template>
      <template #suffix>
        <mp-icon class="suffix" name="github" />
      </template>
    </mp-input>
    <mp-input variant="outlined" placeholder="Custom Icon Size" v-model="value8">
      <template #prefix>
        <mp-icon class="prefix" name="github" :size="28" />
      </template>
      <template #suffix>
        <mp-icon class="suffix" name="github" :size="42" />
      </template>
    </mp-input>
    <mp-input variant="outlined" placeholder="Maxlength" :maxlength="10" v-model="value9" />
    <mp-input variant="outlined" placeholder="Small Size" size="small" v-model="value11" />
    <mp-input
      variant="outlined"
      placeholder="Removes whitespace from both ends of this string"
      v-model.trim="value12"
    />
  </mp-space>
</template>

<style>
  .prefix {
    margin-right: 6px;
  }

  .suffix {
    margin-left: 6px;
  }
</style>
```

## API

### Props

| Prop                     | Description                                                                                                                | Type               | Default    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------- |
| `v-model`                | The value of the binding                                                                                                   | _string_           | `-`        |
| `placeholder`            | placeholder                                                                                                                | _string_           | `-`        |
| `type`                   | Input type, The optional value is `text` `password` `number` `tel`                                                         | _string_           | `text`     |
| `size`                   | Input size, The optional value is `normal` `small`                                                                         | _string_           | `normal`   |
| `variant`                | Input variants, The optional value is `standard` `outlined`                                                                | _string_           | `standard` |
| `maxlength`              | Maxlength                                                                                                                  | _string \| number_ | `-`        |
| `line`                   | Whether to display a dividing line                                                                                         | _boolean_          | `true`     |
| `hint`                   | Whether to use placeholder as hint                                                                                         | _boolean_          | `true`     |
| `text-color`             | Text color                                                                                                                 | _string_           | `-`        |
| `focus-color`            | The primary color in focus                                                                                                 | _string_           | `-`        |
| `blur-color`             | The primary color in blur                                                                                                  | _string_           | `-`        |
| `readonly`               | Whether the readonly                                                                                                       | _boolean_          | `false`    |
| `disabled`               | Whether the disabled                                                                                                       | _boolean_          | `false`    |
| `clearable`              | Whether the clearable                                                                                                      | _boolean_          | `false`    |
| `autofocus`              | Whether the autofocus                                                                                                      | _boolean_          | `false`    |
| `enterkeyhint`           | Customize the enter key style, See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint) | _string_           | `-`        |
| `aria-label` _**3.8.4**_ | See [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Attributes/aria-label)                           | _string_           | `-`        |

Validation rules are now configured on `mp-form-item`, see [Form](#/en-US/form).

### Methods

| Method  | Description | Arguments | Return |
| ------- | ----------- | --------- | ------ |
| `focus` | Focus       | `-`       | `-`    |
| `blur`  | Blur        | `-`       | `-`    |

### Events

| Event    | Description                 | Arguments                       |
| -------- | --------------------------- | ------------------------------- |
| `focus`  | Triggered while focusing    | `event: Event`                  |
| `blur`   | Triggered when out of focus | `event: Event`                  |
| `click`  | Triggered on Click          | `event: Event`                  |
| `clear`  | Triggered on Clearance      | `value: string`                 |
| `input`  | Triggered on input          | `value: string`, `event: Event` |
| `change` | Triggered on change         | `value: string`, `event: Event` |

### Slots

| Name         | Description | SlotProps                                                                                             |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------- |
| `prefix`     | Prefix      | `-`                                                                                                   |
| `suffix`     | Suffix      | `-`                                                                                                   |
| `clear-icon` | Clear Icon  | `clear: (e: Event) => void` clear function (can be used to clear input box contents when using slots) |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                                                | Default                      |
| ------------------------------------------------------- | ---------------------------- |
| `--field-decorator-text-color`                          | `#555`                       |
| `--field-decorator-error-color`                         | `var(--color-danger)`        |
| `--field-decorator-blur-color`                          | `#888`                       |
| `--field-decorator-focus-color`                         | `var(--color-primary)`       |
| `--field-decorator-placeholder-size`                    | `16px`                       |
| `--field-decorator-icon-size`                           | `20px`                       |
| `--field-decorator-line-size`                           | `1px`                        |
| `--field-decorator-line-focus-size`                     | `2px`                        |
| `--field-decorator-line-border-radius`                  | `4px`                        |
| `--field-decorator-disabled-color`                      | `var(--color-text-disabled)` |
| `--field-decorator-standard-normal-margin-top`          | `22px`                       |
| `--field-decorator-standard-normal-margin-bottom`       | `4px`                        |
| `--field-decorator-standard-normal-icon-margin-top`     | `22px`                       |
| `--field-decorator-standard-normal-icon-margin-bottom`  | `4px`                        |
| `--field-decorator-standard-normal-non-hint-margin-top` | `4px`                        |
| `--field-decorator-standard-small-margin-top`           | `18px`                       |
| `--field-decorator-standard-small-margin-bottom`        | `4px`                        |
| `--field-decorator-standard-small-icon-margin-top`      | `18px`                       |
| `--field-decorator-standard-small-icon-margin-bottom`   | `4px`                        |
| `--field-decorator-standard-small-non-hint-margin-top`  | `2px`                        |
| `--field-decorator-outlined-normal-margin-top`          | `16px`                       |
| `--field-decorator-outlined-normal-margin-bottom`       | `16px`                       |
| `--field-decorator-outlined-normal-padding-left`        | `16px`                       |
| `--field-decorator-outlined-normal-padding-right`       | `16px`                       |
| `--field-decorator-outlined-normal-placeholder-space`   | `4px`                        |
| `--field-decorator-outlined-normal-icon-margin-top`     | `16px`                       |
| `--field-decorator-outlined-normal-icon-margin-bottom`  | `16px`                       |
| `--field-decorator-outlined-small-margin-top`           | `8px`                        |
| `--field-decorator-outlined-small-margin-bottom`        | `8px`                        |
| `--field-decorator-outlined-small-padding-left`         | `12px`                       |
| `--field-decorator-outlined-small-padding-right`        | `12px`                       |
| `--field-decorator-outlined-small-placeholder-space`    | `2px`                        |
| `--field-decorator-outlined-small-icon-margin-top`      | `8px`                        |
| `--field-decorator-outlined-small-icon-margin-bottom`   | `8px`                        |
| `--input-input-height`                                  | `24px`                       |
| `--input-input-font-size`                               | `16px`                       |
