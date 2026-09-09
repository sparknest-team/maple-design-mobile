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
  <mp-space direction="column" size="lg">
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
      :should-open="(value) => value.length > 3"
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
  <mp-space direction="column" size="lg">
    <mp-auto-complete variant="outline" placeholder="Please enter text" :options="options" v-model="value" />
    <mp-auto-complete variant="outline" readonly placeholder="Readonly" :options="options2" v-model="value2" />
    <mp-auto-complete variant="outline" disabled placeholder="Disabled" :options="options3" v-model="value3" />
    <mp-auto-complete variant="outline" clearable placeholder="Clearable" :options="options4" v-model="value4" />
    <mp-auto-complete
      variant="outline"
      clearable
      placeholder="Use the clear icon slot"
      :options="options5"
      v-model="value5"
    >
      <template #clear-icon="{ clear }">
        <m-icon-error @click="clear" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete variant="outline" placeholder="Display Icon" :options="options7" v-model="value7">
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete variant="outline" placeholder="Custom Icon Size" :options="options8" v-model="value8">
      <template #prefix>
        <m-icon-github class="prefix" :size="28" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" :size="42" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete
      variant="outline"
      placeholder="Maxlength"
      :max-length="10"
      :options="options9"
      v-model="value9"
    />
    <mp-auto-complete
      variant="outline"
      placeholder="Custom Menu Show Timing"
      :should-open="(value) => value.length > 3"
      :options="options10"
      v-model="value10"
    />
    <mp-auto-complete variant="outline" size="sm" placeholder="Small Size" :options="options11" v-model="value11" />
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
| `variant`      | Input variants, The optional value is `filled` `standard` `outline`                                                       | _string_                                   | `standard` |
| `size`         | Input size: `xs` `sm` `md` `lg` `xl`                                                                                       | _ComponentSize_                            | `md`       |
| `placeholder`  | placeholder                                                                                                                | _string_                                   | `-`        |
| `options`      | Specifies options                                                                                                          | _AutoCompleteOption[]_                     | `[]`       |
| `field-names`  | Custom field mapping for `options`                                                                                         | _{ label?, value?, children?, disabled? }_ | `-`        |
| `max-length`    | Maxlength                                                                                                                  | _string \| number_                         | `-`        |
| `readonly`     | Whether the readonly                                                                                                       | _boolean_                                  | `false`    |
| `disabled`     | Whether the disabled                                                                                                       | _boolean_                                  | `false`    |
| `enterkeyhint` | Customize the enter key style, See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint) | _string_                                   | `-`        |
| `clearable`    | Whether the clearable                                                                                                      | _boolean_                                  | `false`    |
| `line`         | Whether to display a dividing line                                                                                         | _boolean_                                  | `true`     |
| `hint`         | Whether to use placeholder as hint                                                                                         | _boolean_                                  | `true`     |
| `text-color`   | Text color                                                                                                                 | _string_                                   | `-`        |
| `focus-color`  | The primary color in focus                                                                                                 | _string_                                   | `-`        |
| `blur-color`   | The primary color in blur                                                                                                  | _string_                                   | `-`        |
| `should-open`     | Determine whether the menu is displayed according to the input value                                                       | _(v: string) => boolean_                   | Non-empty input        |

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

### Opening and filtering

`should-open(inputValue)` only permits opening and defaults to non-empty input. `filter-option` defaults to `true`: match the label (falling back to value), ignoring case. `strict` defaults to `false`; set it to `true` for case-sensitive matching. Set `filter-option=false` for server-filtered results, or supply `(inputValue, option) => boolean` (empty input preserves all options). Disabled, readonly, unfocused, or empty-result menus cannot open.

Migration: rename `get-show` to `should-open`; set `:filter-option="false"` to preserve the previous no-local-filtering behavior.
