# Select

### Intro

Display and select the content through the drop-down menu.

### Standard Variant

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
  const value2 = ref()
  const value3 = ref()
  const value4 = ref()
  const value5 = ref()
  const value6 = ref()
  const value7 = ref()
  const value8 = ref()
  const value9 = ref([])
  const value10 = ref([])
  const value13 = ref()
  const value14 = ref()
  const value15 = ref([])
  const value16 = ref()

  const options = ref([
    {
      label: 'Eat',
      value: 1,
    },
    {
      label: 'Sleep',
      value: 2,
    },
    {
      label: 'Play game',
      value: 3,
      disabled: true,
    },
  ])

  const keyOptions = ref([
    {
      name: 'Eat',
      id: 1,
    },
    {
      name: 'Sleep',
      id: 2,
    },
    {
      name: 'Play game',
      id: 3,
      disabled: true,
    },
  ])
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-select placeholder="Please select one the options" v-model="value">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select placeholder="Label relation value" v-model="value2">
      <mp-option label="Eat" :value="1" />
      <mp-option label="Sleep" :value="2" />
    </mp-select>
    <div class="relation">The current selection is: {{ value2 }}</div>
    <mp-select placeholder="Readonly" readonly v-model="value3">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select placeholder="Disabled" disabled v-model="value4">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select placeholder="Clearable" clearable v-model="value5">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select placeholder="Use the clear icon slot" clearable v-model="value6">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
      <template #clear-icon="{ clear }">
        <m-icon-github class="clear-icon" @click="clear" />
      </template>
    </mp-select>

    <mp-select placeholder="Custom Icon" v-model="value7">
      <template #default>
        <mp-option label="Eat">
          <m-icon-cake-variant class="selected-icon" />
          <span>Eat</span>
        </mp-option>
        <mp-option label="Sleep">
          <m-icon-weather-night class="selected-icon" />
          <span>Sleep</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="value7 === 'Eat'" class="selected-icon" />
        <m-icon-weather-night v-else class="selected-icon" />
        <span>{{ value7 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
    <mp-select placeholder="Custom Icon Size" v-model="value8">
      <template #default>
        <mp-option label="Eat">
          <m-icon-cake-variant class="selected-icon" />
          <span>Eat</span>
        </mp-option>
        <mp-option label="Sleep">
          <m-icon-weather-night class="selected-icon" />
          <span>Sleep</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="value8 === 'Eat'" class="selected-icon" :size="28" />
        <m-icon-weather-night v-else class="selected-icon" :size="28" />
        <span>{{ value8 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" :size="28" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" :size="42" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>

    <mp-select placeholder="Multiple Selection" multiple v-model="value9">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
      <mp-option label="Play game" />
      <mp-option label="Coding" />
    </mp-select>
    <mp-select placeholder="Multiple choice with tag style" tag multiple v-model="value10">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
      <mp-option label="Play game" />
      <mp-option label="Coding" />
    </mp-select>
    <mp-select size="sm" placeholder="Small Size" v-model="value13">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select placeholder="Options API" v-model="value14" :options="options" />
    <mp-select placeholder="Options API" v-model="value15" :options="options" multiple />
    <mp-select
      placeholder="Custom Fields"
      v-model="value16"
      :options="keyOptions"
      :field-names="{ label: 'name', value: 'id' }"
    />
  </mp-space>
</template>

<style>
  .selected-icon {
    margin-right: 6px;
  }

  .prefix {
    margin-right: 6px;
  }

  .suffix {
    margin-left: 6px;
  }

  .arrow-icon-rotate {
    transform: rotate(180deg);
  }
</style>
```

### Outlined Variant

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
  const value2 = ref()
  const value3 = ref()
  const value4 = ref()
  const value5 = ref()
  const value6 = ref()
  const value7 = ref()
  const value8 = ref()
  const value9 = ref([])
  const value10 = ref([])
  const value13 = ref()
  const value14 = ref()
  const value15 = ref([])
  const value16 = ref()

  const options = ref([
    {
      label: 'Eat',
      value: 1,
    },
    {
      label: 'Sleep',
      value: 2,
    },
    {
      label: 'Play game',
      value: 3,
      disabled: true,
    },
  ])

  const keyOptions = ref([
    {
      name: 'Eat',
      id: 1,
    },
    {
      name: 'Sleep',
      id: 2,
    },
    {
      name: 'Play game',
      id: 3,
      disabled: true,
    },
  ])
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-select variant="outlined" placeholder="Please select one the options" v-model="value">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select variant="outlined" placeholder="Label relation value" v-model="value2">
      <mp-option label="Eat" :value="1" />
      <mp-option label="Sleep" :value="2" />
    </mp-select>
    <div class="relation">The current selection is: {{ value2 }}</div>
    <mp-select variant="outlined" placeholder="Readonly" readonly v-model="value3">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select variant="outlined" placeholder="Disabled" disabled v-model="value4">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select variant="outlined" placeholder="Clearable" clearable v-model="value5">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select variant="outlined" placeholder="Use the clear icon slot" clearable v-model="value6">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
      <template #clear-icon="{ clear }">
        <m-icon-github class="clear-icon" @click="clear" />
      </template>
    </mp-select>

    <mp-select variant="outlined" placeholder="Custom Icon" v-model="value7">
      <template #default>
        <mp-option label="Eat">
          <m-icon-cake-variant class="selected-icon" />
          <span>Eat</span>
        </mp-option>
        <mp-option label="Sleep">
          <m-icon-weather-night class="selected-icon" />
          <span>Sleep</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="value7 === 'Eat'" class="selected-icon" />
        <m-icon-weather-night v-else class="selected-icon" />
        <span>{{ value7 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
    <mp-select variant="outlined" placeholder="Custom Icon Size" v-model="value8">
      <template #default>
        <mp-option label="Eat">
          <m-icon-cake-variant class="selected-icon" />
          <span>Eat</span>
        </mp-option>
        <mp-option label="Sleep">
          <m-icon-weather-night class="selected-icon" />
          <span>Sleep</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="value8 === 'Eat'" class="selected-icon" :size="28" />
        <m-icon-weather-night v-else class="selected-icon" :size="28" />
        <span>{{ value8 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" :size="28" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" :size="42" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>

    <mp-select variant="outlined" placeholder="Multiple Selection" multiple v-model="value9">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
      <mp-option label="Play game" />
      <mp-option label="Coding" />
    </mp-select>
    <mp-select variant="outlined" placeholder="Multiple choice with tag style" tag multiple v-model="value10">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
      <mp-option label="Play game" />
      <mp-option label="Coding" />
    </mp-select>
    <mp-select variant="outlined" size="sm" placeholder="Small Size" v-model="value13">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select variant="outlined" placeholder="Options API" v-model="value14" :options="options" />
    <mp-select variant="outlined" placeholder="Options API" v-model="value15" :options="options" multiple />
    <mp-select
      variant="outlined"
      placeholder="Custom Fields"
      v-model="value16"
      :options="keyOptions"
      :field-names="{ label: 'name', value: 'id' }"
    />
  </mp-space>
</template>

<style>
  .selected-icon {
    margin-right: 6px;
  }

  .prefix {
    margin-right: 6px;
  }

  .suffix {
    margin-left: 6px;
  }

  .arrow-icon-rotate {
    transform: rotate(180deg);
  }
</style>
```

### Picker Mode

Set `presentation` to `picker` to use a bottom-sheet wheel picker.

```html
<script setup>
  import { ref } from 'vue'

  const pickerValue = ref()
  const pickerOptions = ref([
    { label: 'Eat', value: 1 },
    { label: 'Sleep', value: 2 },
    { label: 'Play game', value: 3, disabled: true },
  ])
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-select
      presentation="picker"
      placeholder="Please select an option"
      v-model="pickerValue"
      :options="pickerOptions"
    />
  </mp-space>
</template>
```

> Picker mode only supports the `options` prop. Slot-based `<mp-option>` is not supported in picker mode.

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

```html
<script setup>
  import { ref } from 'vue'

  const listValue = ref()
  const listMultiple = ref([])
  const listOptions = ref([
    { label: 'Eat', value: 1 },
    { label: 'Sleep', value: 2 },
    { label: 'Play game', value: 3, disabled: true },
    { label: 'Coding', value: 4 },
  ])
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-select presentation="list" placeholder="Please select an option" v-model="listValue" :options="listOptions" />
    <mp-select
      presentation="list"
      multiple
      tag
      clearable
      placeholder="Please select multiple options"
      v-model="listMultiple"
      :options="listOptions"
    />
  </mp-space>
</template>
```

> List mode only supports the `options` prop. Slot-based `<mp-option>` is not supported in list mode.

## API

### Props

#### Select Props

| Prop                        | Description                                                          | Type                                       | Default     |
| --------------------------- | -------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `v-model`                   | The value of the binding                                             | _any \| any[]_                             | `-`         |
| `size`                      | Select size: `xs` `sm` `md` `lg` `xl`                                | _ComponentSize_                            | `md`        |
| `variant`                   | Select variant, The optional value is `filled` `outlined` `standard` | _string_                                   | `standard`  |
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
| `--mp-field-color-text`                       | `#555`                                                       |
| `--mp-field-color-error`                      | `var(--mp-color-danger)`                                     |
| `--mp-field-color-blur`                       | `#888`                                                       |
| `--mp-field-color-focus`                      | `var(--mp-color-primary)`                                    |
| `--mp-field-color-placeholder-text`           | `var(--mp-field-color-blur)`                                 |
| `--mp-field-color-text-disabled`              | `var(--mp-color-text-disabled)`                              |
| `--mp-field-size-placeholder`                 | `16px`                                                       |
| `--mp-field-size-icon`                        | `20px`                                                       |
| `--mp-field-border-radius`                    | `4px`                                                        |
| `--mp-field-variant-standard-line-size`       | `1px`                                                        |
| `--mp-field-variant-standard-line-size-focus` | `2px`                                                        |
| `--mp-field-variant-filled-bg`                | `var(--mp-color-fill-2)`                                     |
| `--mp-field-size-xs-height`                   | `32px`                                                       |
| `--mp-field-size-sm-height`                   | `40px`                                                       |
| `--mp-field-size-md-height`                   | `48px`                                                       |
| `--mp-field-size-lg-height`                   | `56px`                                                       |
| `--mp-field-size-xl-height`                   | `64px`                                                       |
| `--select-scroller-background`                | `var(--color-fill-2)`                                        |
| `--select-scroller-padding`                   | `6px 0`                                                      |
| `--select-scroller-max-height`                | `278px`                                                      |
| `--select-scroller-border-radius`             | `2px`                                                        |
| `--select-label-font-size`                    | `16px`                                                       |
| `--select-tags-margin`                        | `-5px 0 0 0`                                                 |
| `--select-tags-padding`                       | `2px 0`                                                      |
| `--select-tag-margin`                         | `5px 5px 0 0`                                                |
| `--select-arrow-size`                         | `20px`                                                       |
| `--select-standard-menu-margin`               | `calc(var(--mp-field-size-placeholder) * 0.75 + 14px) 0 0 0` |

#### Option Variables

| Variable                       | Default                              |
| ------------------------------ | ------------------------------------ |
| `--option-height`              | `38px`                               |
| `--option-padding`             | `0 12px`                             |
| `--option-font-size`           | `16px`                               |
| `--option-selected-background` | `var(--input-decorator-focus-color)` |
| `--option-text-color`          | `#555`                               |

## API

### Props

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

