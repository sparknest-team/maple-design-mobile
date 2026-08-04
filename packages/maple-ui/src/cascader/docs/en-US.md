# Cascader

### Intro

Cascading selection via dropdown menu or bottom popup picker.

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
const value2 = ref('')
const value3 = ref([])
const value4 = ref()
const value5 = ref([])

const options = ref([
  {
    label: 'Zhejiang',
    value: 'zhejiang',
    children: [
      {
        label: 'Hangzhou',
        value: 'hangzhou',
        children: [
          { label: 'Xihu', value: 'xihu' },
          { label: 'Gongshu', value: 'gongshu' },
        ],
      },
      {
        label: 'Ningbo',
        value: 'ningbo',
      },
    ],
  },
  {
    label: 'Jiangsu',
    value: 'jiangsu',
    children: [
      { label: 'Nanjing', value: 'nanjing' },
      { label: 'Suzhou', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-cascader placeholder="Please select a region" v-model="value" :options="options" />
    <mp-cascader placeholder="Non-path mode" v-model="value2" :options="options" :path-mode="false" />
    <mp-cascader placeholder="Strict mode" v-model="value3" :options="options" check-strictly />
    <mp-cascader placeholder="Multiple cascade" v-model="value5" :options="options" multiple tag />
    <mp-cascader placeholder="Picker mode" presentation="picker" v-model="value4" :options="options" />
  </mp-space>
</template>
```

### Multiple Cascade

Enable `multiple` to select multiple paths. Use `tag` to display selections as tags.

```html
<script setup>
import { ref } from 'vue'

const value = ref([])

const options = ref([
  {
    label: 'Zhejiang',
    value: 'zhejiang',
    children: [
      {
        label: 'Hangzhou',
        value: 'hangzhou',
        children: [
          { label: 'Xihu', value: 'xihu' },
          { label: 'Gongshu', value: 'gongshu' },
        ],
      },
      { label: 'Ningbo', value: 'ningbo' },
    ],
  },
  {
    label: 'Jiangsu',
    value: 'jiangsu',
    children: [
      { label: 'Nanjing', value: 'nanjing' },
      { label: 'Suzhou', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-cascader
    placeholder="Please select a region"
    v-model="value"
    :options="options"
    multiple
    tag
  />
</template>
```

### Picker Mode

Single-select matches `mp-picker`: Cancel / Confirm, confirm writes and closes.

Multiple uses a temporary cart: **Cancel** discards edits, **Add** appends the current wheel path to the draft list (keeps the sheet open), **Done** commits and closes.

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
const multipleValue = ref([])

const options = ref([
  {
    label: 'Zhejiang',
    value: 'zhejiang',
    children: [
      {
        label: 'Hangzhou',
        value: 'hangzhou',
        children: [
          { label: 'Xihu', value: 'xihu' },
          { label: 'Gongshu', value: 'gongshu' },
        ],
      },
      { label: 'Ningbo', value: 'ningbo' },
    ],
  },
  {
    label: 'Jiangsu',
    value: 'jiangsu',
    children: [
      { label: 'Nanjing', value: 'nanjing' },
      { label: 'Suzhou', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-cascader
      presentation="picker"
      placeholder="Please select a region"
      v-model="value"
      :options="options"
    />
    <mp-cascader
      presentation="picker"
      placeholder="Picker multiple"
      v-model="multipleValue"
      :options="options"
      multiple
      tag
    />
  </mp-space>
</template>
```

### List Mode

Set `presentation` to `list` for a bottom-sheet with breadcrumb navigation and a selectable list. The active level is underlined; selected items show a checkmark on the right.

Single: selecting a confirmable node commits and closes. Multiple: tap a confirmable node to toggle draft selection, **Done** commits, **Cancel** discards.

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
const multipleValue = ref([])

const options = ref([
  {
    label: 'Zhejiang',
    value: 'zhejiang',
    children: [
      {
        label: 'Hangzhou',
        value: 'hangzhou',
        children: [
          { label: 'Xihu', value: 'xihu' },
          { label: 'Gongshu', value: 'gongshu' },
        ],
      },
      { label: 'Ningbo', value: 'ningbo' },
    ],
  },
  {
    label: 'Jiangsu',
    value: 'jiangsu',
    children: [
      { label: 'Nanjing', value: 'nanjing' },
      { label: 'Suzhou', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="large">
    <mp-cascader
      presentation="list"
      placeholder="Please select a region"
      v-model="value"
      :options="options"
    />
    <mp-cascader
      presentation="list"
      placeholder="List multiple"
      v-model="multipleValue"
      :options="options"
      multiple
      tag
    />
  </mp-space>
</template>
```

## API

### Props

#### Cascader Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Binding value | _any \| any[]_ | `-` |
| `options` | Cascading option data | _CascaderOption[]_ | `[]` |
| `presentation` | Display style, optional `menu` `picker` `list` | _string_ | `menu` |
| `show` | Visibility control | _boolean_ | `undefined` |
| `label-key` | Key name for label | _string_ | `label` |
| `value-key` | Key name for value | _string_ | `value` |
| `children-key` | Key name for children | _string_ | `children` |
| `field-names` | Custom field mapping, takes precedence over `labelKey`/`valueKey`/`childrenKey` | _FieldNames_ | `-` |
| `multiple` | Enable multi-select (menu: checkbox panel; picker: temporary cart with Add / Done / Cancel; list: tap to toggle + Done / Cancel) | _boolean_ | `false` |
| `check-strictly` | Allow selecting non-leaf nodes | _boolean_ | `false` |
| `path-mode` | Return full path array vs leaf value | _boolean_ | `true` |
| `filterable` | Enable search | _boolean_ | `false` |
| `clearable` | Allow clear | _boolean_ | `false` |
| `placeholder` | Placeholder text | _string_ | `-` |
| `disabled` | Disabled state | _boolean_ | `false` |
| `readonly` | Readonly state | _boolean_ | `false` |
| `loading` | Loading state | _boolean_ | `false` |
| `size` | Size, optional `normal` `small` | _string_ | `normal` |
| `variant` | Variant, optional `standard` `outlined` | _string_ | `standard` |
| `tag` | Tag style (multi-select only) | _boolean_ | `false` |
| `separator` | Multi-select separator | _string_ | `,` |
| `close-on-select` | Auto close on select (menu single-select only; multiple never auto-closes) | _boolean_ | `true` |
| `picker-props` | Props passed to `mp-picker` in picker mode | _Partial\<PickerProps\>_ | `{}` |
| `popup-props` | Props passed to popup | _Partial\<PopupProps\>_ | `{}` |

#### CascaderOption

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `label` | Option label | _string_ | `-` |
| `value` | Option value | _any_ | `-` |
| `disabled` | Disabled | _boolean_ | `-` |
| `children` | Child options | _CascaderOption[]_ | `-` |

### Events

#### Cascader Events

| Event | Description | Arguments |
| --- | --- | --- |
| `focus` | Triggered on focus | `-` |
| `blur` | Triggered on blur | `-` |
| `click` | Triggered on click | `event: Event` |
| `clear` | Triggered on clear | `value: any \| any[]` |
| `close` | Triggered on close | `value: any \| any[]` |
| `change` | Triggered on change | `value: any \| any[]` |

### Methods

#### Cascader Methods

| Method | Description | Arguments | Returns |
| --- | --- | --- | --- |
| `focus` | Focus | `-` | `-` |
| `blur` | Blur | `-` | `-` |

### Slots

#### Cascader Slots

| Slot | Description | Props |
| --- | --- | --- |
| `selected` | Selected content | `-` |
| `option` | Custom option content | `option: CascaderOption, active: boolean` |
| `prefix` | Prefix | `-` |
| `clear-icon` | Clear icon | `clear: (e: Event) => void` |
| `suffix` | Suffix | `-` |
| `arrow-icon` | Arrow icon | `focus: boolean, menu-open: boolean` |

### CSS Variables

Use [StyleProvider](#/en-US/style-provider) to customize.

| Variable | Default |
| --- | --- |
| `--mp-cascader-panel-background` | `var(--color-surface-container-high)` |
| `--mp-cascader-panel-padding` | `6px 0` |
| `--mp-cascader-panel-max-height` | `278px` |
| `--mp-cascader-panel-border-radius` | `2px` |
| `--mp-cascader-column-width` | `140px` |
| `--mp-cascader-option-height` | `38px` |
| `--mp-cascader-option-padding` | `0 12px` |
| `--mp-cascader-option-font-size` | `16px` |
| `--mp-cascader-option-selected-color` | `var(--mp-color-primary)` |
| `--mp-cascader-option-selected-background` | `var(--mp-color-primary)` |
| `--mp-cascader-option-text-color` | `#555` |
| `--mp-cascader-option-disabled-color` | `var(--mp-color-text-disabled)` |
| `--mp-cascader-option-arrow-size` | `18px` |
| `--mp-cascader-label-font-size` | `16px` |
| `--mp-cascader-arrow-size` | `20px` |
