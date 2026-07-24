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
        <mp-icon class="clear-icon" name="github" @click="clear" />
      </template>
    </mp-select>

    <mp-select placeholder="Custom Icon" v-model="value7">
      <template #default>
        <mp-option label="Eat">
          <mp-icon class="selected-icon" name="cake-variant" />
          <span>Eat</span>
        </mp-option>
        <mp-option label="Sleep">
          <mp-icon class="selected-icon" name="weather-night" />
          <span>Sleep</span>
        </mp-option>
      </template>
      <template #selected>
        <mp-icon class="selected-icon" :name="value7 === 'Eat' ? 'cake-variant' : 'weather-night'" />
        <span>{{ value7 }}</span>
      </template>
      <template #prepend-icon>
        <mp-icon class="prepend-icon" name="github" />
      </template>
      <template #append-icon>
        <mp-icon class="append-icon" name="github" />
      </template>
      <template #arrow-icon="{ focus }">
        <mp-icon name="chevron-down" :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
    <mp-select placeholder="Custom Icon Size" v-model="value8">
      <template #default>
        <mp-option label="Eat">
          <mp-icon class="selected-icon" name="cake-variant" />
          <span>Eat</span>
        </mp-option>
        <mp-option label="Sleep">
          <mp-icon class="selected-icon" name="weather-night" />
          <span>Sleep</span>
        </mp-option>
      </template>
      <template #selected>
        <mp-icon class="selected-icon" :size="28" :name="value8 === 'Eat' ? 'cake-variant' : 'weather-night'" />
        <span>{{ value8 }}</span>
      </template>
      <template #prepend-icon>
        <mp-icon class="prepend-icon" name="github" :size="28" />
      </template>
      <template #append-icon>
        <mp-icon class="append-icon" name="github" :size="42" />
      </template>
      <template #arrow-icon="{ focus }">
        <mp-icon name="chevron-down" :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
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
    <mp-select size="small" placeholder="Small Size" v-model="value13">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select placeholder="Options API" v-model="value14" :options="options" />
    <mp-select placeholder="Options API" v-model="value15" :options="options" multiple />
    <mp-select placeholder="Custom Fields" v-model="value16" :options="keyOptions" label-key="name" value-key="id" />
  </mp-space>
</template>

<style>
.selected-icon {
  margin-right: 6px;
}

.prepend-icon {
  margin-right: 6px;
}

.append-icon {
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
        <mp-icon class="clear-icon" name="github" @click="clear" />
      </template>
    </mp-select>

    <mp-select variant="outlined" placeholder="Custom Icon" v-model="value7">
      <template #default>
        <mp-option label="Eat">
          <mp-icon class="selected-icon" name="cake-variant" />
          <span>Eat</span>
        </mp-option>
        <mp-option label="Sleep">
          <mp-icon class="selected-icon" name="weather-night" />
          <span>Sleep</span>
        </mp-option>
      </template>
      <template #selected>
        <mp-icon class="selected-icon" :name="value7 === 'Eat' ? 'cake-variant' : 'weather-night'" />
        <span>{{ value7 }}</span>
      </template>
      <template #prepend-icon>
        <mp-icon class="prepend-icon" name="github" />
      </template>
      <template #append-icon>
        <mp-icon class="append-icon" name="github" />
      </template>
      <template #arrow-icon="{ focus }">
        <mp-icon name="chevron-down" :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
    <mp-select variant="outlined" placeholder="Custom Icon Size" v-model="value8">
      <template #default>
        <mp-option label="Eat">
          <mp-icon class="selected-icon" name="cake-variant" />
          <span>Eat</span>
        </mp-option>
        <mp-option label="Sleep">
          <mp-icon class="selected-icon" name="weather-night" />
          <span>Sleep</span>
        </mp-option>
      </template>
      <template #selected>
        <mp-icon class="selected-icon" :size="28" :name="value8 === 'Eat' ? 'cake-variant' : 'weather-night'" />
        <span>{{ value8 }}</span>
      </template>
      <template #prepend-icon>
        <mp-icon class="prepend-icon" name="github" :size="28" />
      </template>
      <template #append-icon>
        <mp-icon class="append-icon" name="github" :size="42" />
      </template>
      <template #arrow-icon="{ focus }">
        <mp-icon name="chevron-down" :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
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
    <mp-select variant="outlined" size="small" placeholder="Small Size" v-model="value13">
      <mp-option label="Eat" />
      <mp-option label="Sleep" />
    </mp-select>
    <mp-select variant="outlined" placeholder="Options API" v-model="value14" :options="options" />
    <mp-select variant="outlined" placeholder="Options API" v-model="value15" :options="options" multiple />
    <mp-select variant="outlined" placeholder="Custom Fields" v-model="value16" :options="keyOptions" label-key="name" value-key="id" />
  </mp-space>
</template>

<style>
.selected-icon {
  margin-right: 6px;
}

.prepend-icon {
  margin-right: 6px;
}

.append-icon {
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
    <mp-select
      presentation="list"
      placeholder="Please select an option"
      v-model="listValue"
      :options="listOptions"
    />
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

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | The value of the binding | _any \| any[]_ | `-` |
| `size` | Select size, The optional value is `normal` `small`                | _string_ | `normal` |
| `variant` | Select variant, The optional value is `standard` `outlined` | _string_ | `standard` |
| `presentation` ***3.18.0*** | Display mode, optional values `menu` `picker` `list` | _string_ | `menu` |
| `show` ***3.18.0*** | Visibility control | _boolean_ | `undefined` |
| `placeholder` | placeholder | _string_ | `-` |
| `multiple` | Whether to enable multiple selection | _boolean_ | `false` |
| `offset-y` | The vertical offset of the drop-down menu | _string \| number_ | `0` |
| `tag` | Whether to use tag style (multiple choices only) | _boolean_ | `false` |
| `line` | Whether to display a dividing line | _boolean_ | `true` |
| `hint` | Whether to use placeholders as prompts | _boolean_ | `true` |
| `text-color` | Text color | _string_ | `-` |
| `focus-color` | The primary color in focus | _string_ | `-` |
| `blur-color` | The primary color in blur | _string_ | `-` |
| `readonly` | Whether the readonly | _boolean_ | `false` |
| `disabled` | Whether the disabled | _boolean_ | `false` |
| `clearable` | Whether the clearable | _boolean_ | `false` |
| `options` ***3.3.4*** | Specifies options | _SelectOption[]_ | `[]` |
| `label-key` ***3.3.4*** | As the key that uniquely identifies label | _string_ | `label` |
| `value-key` ***3.3.4*** | As the key that uniquely identifies value | _string_ | `value` |
| `field-names` ***3.18.0*** | Custom field mapping, takes precedence over `labelKey` / `valueKey` | _{ label?, value?, children?, disabled? }_ | `-` |
| `picker-props` ***3.18.0*** | Props passed to `mp-picker` in picker mode | _Partial\<PickerProps\>_ | `{}` |
| `popup-props` ***3.18.0*** | Props passed to popup | _Partial\<PopupProps\>_ | `{}` |
| `value-key` ***3.3.4*** | As the key that uniquely identifies value | _string_ | `value` |

Validation rules are now configured on `mp-form-item`, see [Form](#/en-US/form).

#### SelectOption

| Prop | Description | Type | Default |
| ------- | --- |----------------|-----------|
| `label`    |   The text of option    | _string \| VNode \| (option: SelectOption, selected: boolean) => VNodeChild_      | `-`   |
| `value`  |    The value of option    | _any_      | `-`   |
| `disabled`    |    Whether to disable option   | _boolean_      | `-`   |
| `ripple` ***3.3.0***  | Whether to enable ripple | _boolean_ | `true` |

#### Option Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `label` | The text that the option displays | _any_ | `-` |
| `value` | The value of the option binding | _any_ | `-` |
| `disabled` | Whether to disable | _boolean_ | `false` |

### Methods

#### Select Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `focus` | Focus | `-` | `-` |
| `blur` | Blur | `-` | `-` |

### Events

#### Select Events

| Event | Description | Arguments |
| --- | --- | --- |
| `focus` | Triggered when focusing | `event: Event` |
| `blur` | Triggered when out of focus | `event: Event` |
| `click` | Triggered on click | `event: Event` |
| `clear` | Triggered on clearance | `value: any \| any[]` |
| `close` | Triggered on close | `value: any[]` |
| `change` | Triggered when change | `value: any \| any[]` |

### Slots

#### Select Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `selected` | Select the contents of the area | `-` |
| `prepend-icon` | Prepend icon | `-` |
| `clear-icon` | Clear Icon | `clear: (e: Event) => void` clear function (can be used to clear select box contents when using slots) |
| `append-icon` | Append icon | `-` |
| `arrow-icon` | Arrow icon | `focus: boolean` Whether to focus, `menu-open: boolean` Whether menu opened |

#### Option Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Options to display the content | `selected: boolean` selected or not |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### Select Variables

| Variable | Default |
| --- | --- |
| `--field-decorator-text-color` | `#555` |
| `--field-decorator-error-color` | `var(--color-danger)` |
| `--field-decorator-blur-color` | `#888` |
| `--field-decorator-focus-color` | `var(--color-primary)` |
| `--field-decorator-placeholder-size` | `16px` |
| `--field-decorator-icon-size` | `20px` |
| `--field-decorator-line-size` | `1px` |
| `--field-decorator-line-focus-size` | `2px` |
| `--field-decorator-line-border-radius` | `4px` |
| `--field-decorator-disabled-color` | `var(--color-text-disabled)` |
| `--field-decorator-standard-normal-margin-top` | `22px` |
| `--field-decorator-standard-normal-margin-bottom` | `4px` |
| `--field-decorator-standard-normal-icon-margin-top` | `22px` |
| `--field-decorator-standard-normal-icon-margin-bottom` | `4px` |
| `--field-decorator-standard-normal-non-hint-margin-top` | `4px` |
| `--field-decorator-standard-small-margin-top` | `18px` |
| `--field-decorator-standard-small-margin-bottom` | `4px` |
| `--field-decorator-standard-small-icon-margin-top` | `18px` |
| `--field-decorator-standard-small-icon-margin-bottom` | `4px` |
| `--field-decorator-standard-small-non-hint-margin-top` | `2px` |
| `--field-decorator-outlined-normal-margin-top` | `16px` |
| `--field-decorator-outlined-normal-margin-bottom` | `16px` |
| `--field-decorator-outlined-normal-padding-left` | `16px` |
| `--field-decorator-outlined-normal-padding-right` | `16px` |
| `--field-decorator-outlined-normal-placeholder-space` | `4px` |
| `--field-decorator-outlined-normal-icon-margin-top` | `16px` |
| `--field-decorator-outlined-normal-icon-margin-bottom` | `16px` |
| `--field-decorator-outlined-small-margin-top` | `8px` |
| `--field-decorator-outlined-small-margin-bottom` | `8px` |
| `--field-decorator-outlined-small-padding-left` | `12px` |
| `--field-decorator-outlined-small-padding-right` | `12px` |
| `--field-decorator-outlined-small-placeholder-space` | `2px` |
| `--field-decorator-outlined-small-icon-margin-top` | `8px` |
| `--field-decorator-outlined-small-icon-margin-bottom` | `8px` |
| `--select-scroller-background` | `var(--color-surface-container-high)` |
| `--select-scroller-padding` | `6px 0` |
| `--select-scroller-max-height` | `278px` |
| `--select-scroller-border-radius` | `2px` |
| `--select-label-font-size` | `16px` |
| `--select-tags-margin` | `-5px 0 0 0` |
| `--select-tags-padding` | `2px 0` |
| `--select-tag-margin` | `5px 5px 0 0` |
| `--select-arrow-size` | `20px` |
| `--select-standard-menu-margin` | `calc(var(--field-decorator-placeholder-size) * 0.75 + 14px) 0 0 0` |

#### Option Variables

| Variable | Default |
| --- | --- |
| `--option-height` | `38px` |
| `--option-padding` | `0 12px` |
| `--option-font-size` | `16px` |
| `--option-selected-background` | `var(--input-decorator-focus-color)` |
| `--option-text-color` | `#555` |
