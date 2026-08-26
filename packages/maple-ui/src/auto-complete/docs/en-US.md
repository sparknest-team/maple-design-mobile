# AutoComplete

### Intro

Autocomplete function of input field.

### Standard Variant

```html
<script setup>
  import { computed, ref } from 'vue'

  const { value, options } = useAutoComplete()
  const { value: value2, options: options2 } = useAutoComplete()
  const { value: value3, options: options3 } = useAutoComplete()
  const { value: value4, options: options4 } = useAutoComplete()
  const { value: value5, options: options5 } = useAutoComplete()
  const { value: value7, options: options7 } = useAutoComplete()
  const { value: value8, options: options8 } = useAutoComplete()
  const { value: value9, options: options9 } = useAutoComplete()
  const { value: value10, options: options10 } = useAutoComplete()
  const { value: value11, options: options11 } = useAutoComplete()

  function useAutoComplete() {
    const value = ref('')
    const options = computed(() =>
      ['@qq.com', '@163.com', '@gmail.com'].map((suffix) => {
        const [prefix] = value.value.split('@')
        return {
          label: `${prefix}${suffix}`,
          value: `${prefix}${suffix}`,
        }
      }),
    )

    return {
      value,
      options,
    }
  }
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-auto-complete placeholder="Please enter text" :options="options" v-model="value" />
    <mp-auto-complete readonly placeholder="Readonly" :options="options2" v-model="value2" />
    <mp-auto-complete disabled placeholder="Disabled" :options="options3" v-model="value3" />
    <mp-auto-complete clearable placeholder="Clearable" :options="options4" v-model="value4" />
    <mp-auto-complete clearable placeholder="Use the clear icon slot" :options="options5" v-model="value5">
      <template #clear-icon="{ clear }">
        <m-icon-error @click="clear" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete placeholder="Display Icon" :options="options7" v-model="value7">
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete placeholder="Custom Icon Size" :options="options8" v-model="value8">
      <template #prefix>
        <m-icon-github class="prefix" :size="28" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" :size="42" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete placeholder="Maxlength" :max-length="10" :options="options9" v-model="value9" />
    <mp-auto-complete
      placeholder="Custom Menu Show Timing"
      :get-show="(value) => value.length > 3"
      :options="options10"
      v-model="value10"
    />
    <mp-auto-complete size="sm" placeholder="Small Size" :options="options11" v-model="value11" />
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
  import { computed, ref } from 'vue'

  const { value, options } = useAutoComplete()
  const { value: value2, options: options2 } = useAutoComplete()
  const { value: value3, options: options3 } = useAutoComplete()
  const { value: value4, options: options4 } = useAutoComplete()
  const { value: value5, options: options5 } = useAutoComplete()
  const { value: value7, options: options7 } = useAutoComplete()
  const { value: value8, options: options8 } = useAutoComplete()
  const { value: value9, options: options9 } = useAutoComplete()
  const { value: value10, options: options10 } = useAutoComplete()
  const { value: value11, options: options11 } = useAutoComplete()

  function useAutoComplete() {
    const value = ref('')
    const options = computed(() =>
      ['@qq.com', '@163.com', '@gmail.com'].map((suffix) => {
        const [prefix] = value.value.split('@')
        return {
          label: `${prefix}${suffix}`,
          value: `${prefix}${suffix}`,
        }
      }),
    )

    return {
      value,
      options,
    }
  }
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-auto-complete variant="outlined" placeholder="Please enter text" :options="options" v-model="value" />
    <mp-auto-complete variant="outlined" readonly placeholder="Readonly" :options="options2" v-model="value2" />
    <mp-auto-complete variant="outlined" disabled placeholder="Disabled" :options="options3" v-model="value3" />
    <mp-auto-complete variant="outlined" clearable placeholder="Clearable" :options="options4" v-model="value4" />
    <mp-auto-complete
      variant="outlined"
      clearable
      placeholder="Use the clear icon slot"
      :options="options5"
      v-model="value5"
    >
      <template #clear-icon="{ clear }">
        <m-icon-error @click="clear" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete variant="outlined" placeholder="Display Icon" :options="options7" v-model="value7">
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete variant="outlined" placeholder="Custom Icon Size" :options="options8" v-model="value8">
      <template #prefix>
        <m-icon-github class="prefix" :size="28" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" :size="42" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete
      variant="outlined"
      placeholder="Maxlength"
      :max-length="10"
      :options="options9"
      v-model="value9"
    />
    <mp-auto-complete
      variant="outlined"
      placeholder="Custom Menu Show Timing"
      :get-show="(value) => value.length > 3"
      :options="options10"
      v-model="value10"
    />
    <mp-auto-complete variant="outlined" size="sm" placeholder="Small Size" :options="options11" v-model="value11" />
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

#### AutoComplete Props

| Prop           | Description                                                                                                                | Type                                       | Default    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| `v-model`      | The value of the binding                                                                                                   | _string_                                   | `-`        |
| `variant`      | Input variants, The optional value is `filled` `standard` `outlined`                                                       | _string_                                   | `standard` |
| `size`         | Input size: `xs` `sm` `md` `lg` `xl`                                                                                       | _ComponentSize_                            | `md`       |
| `placeholder`  | placeholder                                                                                                                | _string_                                   | `-`        |
| `options`      | Specifies options                                                                                                          | _AutoCompleteOption[]_                     | `[]`       |
| `field-names`  | Custom field mapping for `options`                                                                                         | _{ label?, value?, children?, disabled? }_ | `-`        |
| `maxLength`    | Maxlength                                                                                                                  | _string \| number_                         | `-`        |
| `readonly`     | Whether the readonly                                                                                                       | _boolean_                                  | `false`    |
| `disabled`     | Whether the disabled                                                                                                       | _boolean_                                  | `false`    |
| `enterkeyhint` | Customize the enter key style, See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint) | _string_                                   | `-`        |
| `clearable`    | Whether the clearable                                                                                                      | _boolean_                                  | `false`    |
| `line`         | Whether to display a dividing line                                                                                         | _boolean_                                  | `true`     |
| `hint`         | Whether to use placeholder as hint                                                                                         | _boolean_                                  | `true`     |
| `text-color`   | Text color                                                                                                                 | _string_                                   | `-`        |
| `focus-color`  | The primary color in focus                                                                                                 | _string_                                   | `-`        |
| `blur-color`   | The primary color in blur                                                                                                  | _string_                                   | `-`        |
| `get-show`     | Determine whether the menu is displayed according to the input value                                                       | _(v: string) => boolean_                   | `-`        |

Validation rules are now configured on `mp-form-item`, see [Form](#/en-US/form).

#### AutoCompleteOption

| Prop       | Description               | Type                                                                              | Default |
| ---------- | ------------------------- | --------------------------------------------------------------------------------- | ------- |
| `label`    | The text of option        | _string \| VNode \| (option: AutoCompleteOption, checked: boolean) => VNodeChild_ | `-`     |
| `value`    | The value of option       | _any_                                                                             | `-`     |
| `disabled` | Whether to disable option | _boolean_                                                                         | `-`     |

### Methods

| Method  | Description | Arguments | Return |
| ------- | ----------- | --------- | ------ |
| `focus` | Focus       | `-`       | `-`    |
| `blur`  | Blur        | `-`       | `-`    |

### Events

| Event    | Description                 | Arguments                       |
| -------- | --------------------------- | ------------------------------- |
| `focus`  | Triggered while focusing    | `-`                             |
| `blur`   | Triggered when out of focus | `-`                             |
| `click`  | Triggered on Click          | `event: Event`                  |
| `clear`  | Triggered on Clearance      | `value: string`                 |
| `input`  | Triggered on input          | `value: string`, `event: Event` |
| `change` | Triggered on change         | `value: string`                 |

### Slots

| Name         | Description | SlotProps                                                                                             |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------- |
| `prefix`     | Prefix      | `-`                                                                                                   |
| `suffix`     | Suffix      | `-`                                                                                                   |
| `clear-icon` | Clear Icon  | `clear: (e: Event) => void` clear function (can be used to clear input box contents when using slots) |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                          | Default |
| --------------------------------- | ------- |
| `--auto-complete-options-padding` | `6px 0` |
