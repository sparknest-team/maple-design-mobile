# Picker

Final Picker30tests/4files pass,including10new targeted cases;combined Maple affected532tests/95files,root read-only lint,types and shared29tests pass. Runtime-candidate classification is not native touch/OS/whole-component acceptance.

### Intro

Two calling methods, function and component, are provided. It also supports cascade mode and can handle multi-level linkage.

## Basic examples

### single picker

```demo
../example/demos/single-picker.vue
```

## Selection modes and options

### multiple picker

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `columns` | Column content | multiple picker、cascade picker、area picker |
| `cascade` | Whether to enable cascade mode | cascade picker、area picker、columns count |
<!-- demo-config-notes:end -->


```demo
../example/demos/multiple-picker.vue
```

### cascade picker

```demo
../example/demos/cascade-picker.vue
```

### area picker

```demo
../example/demos/area-picker.vue
```

### columns count

```demo
../example/demos/columns-count.vue
```

### value mapping

```demo
../example/demos/value-mapping.vue
```

## Interaction and invocation

### Disabled picker

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `columns` | Column content | Disabled picker, two way binding |
| `disabled` | Disable option clicks, touch, keyboard selection and confirmation | Disabled picker |
| `toolbar` | Whether to display the upper toolbar | Disabled picker |
<!-- demo-config-notes:end -->


While disabled, clicks, touch and keyboard input cannot change the selection. Enabling it resumes from the current model value.

```demo
../example/demos/disabled.vue
```

### two way binding

```demo
../example/demos/two-way-binding.vue
```

### function call

```demo
../example/demos/function-call.vue
```

## Function calls

### Single-column selection

The function returns selection information and the final action `state`: `confirm`/`cancel`/`close`.

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'

  async function picker() {
    const { state, values, indexes, options } = await Picker({
      columns: [[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]],
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Single column</mp-button>
</template>
```

### Multiple-column selection

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'

  async function picker() {
    const { state, values, indexes, options } = await Picker({
      columns: [
        [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
        [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
        [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
      ],
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Multiple columns</mp-button>
</template>
```

### Cascading selection

Enable `cascade` for cascading wheels.

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'

  async function picker() {
    const { state, texts, indexes } = await Picker({
      cascade: true,
      columns: [
        {
          text: 'Sichuan',
          children: [
            {
              text: 'Chengdu',
              children: [
                {
                  text: 'Wenjiang',
                },
                {
                  text: 'Qingyang',
                },
              ],
            },
          ],
        },
        {
          text: 'Jiangsu',
          children: [
            {
              text: 'Wuxi',
              children: [
                {
                  text: 'Xinwu',
                },
                {
                  text: 'Binhu',
                },
              ],
            },
          ],
        },
      ],
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Cascading selection</mp-button>
</template>
```

### Region selection

The library provides cascading Chinese province/city/district data ready to use.

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'
  import columns from '@maple-design/ui/json/area.json'

  async function picker() {
    const { state, texts, indexes } = await Picker({
      cascade: true,
      columns,
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Region selection</mp-button>
</template>
```

### Column count

`columnsCount` sets the maximum displayed column count, particularly useful in cascading mode.

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'
  import columns from '@maple-design/ui/json/area.json'

  async function picker() {
    const { state, texts, indexes } = await Picker({
      cascade: true,
      columns,
      columnsCount: 2,
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Configure columns</mp-button>
</template>
```

### Value mapping

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'

  async function picker() {
    const { state, values, indexes, options } = await Picker({
      columns: [
        [
          { text: 'A', value: 1 },
          { text: 'B', value: 2 },
          { text: 'C', value: 3 },
          { text: 'D', value: 4 },
        ],
        [
          { text: 'A', value: 1 },
          { text: 'B', value: 2 },
          { text: 'C', value: 3 },
          { text: 'D', value: 4 },
        ],
        [
          { text: 'A', value: 1 },
          { text: 'B', value: 2 },
          { text: 'C', value: 3 },
          { text: 'D', value: 4 },
        ],
      ],
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Value mapping</mp-button>
</template>
```

## Component calls

### Single-column selection

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker :columns="columns" @change="handleChange" />
</template>
```

### Multiple-column selection

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const columns = ref([
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  ])

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker :columns="columns" @change="handleChange" />
</template>
```

### Cascading selection

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const columns = ref([
    {
      text: 'Sichuan',
      children: [
        {
          text: 'Chengdu',
          children: [
            {
              text: 'Wenjiang',
            },
            {
              text: 'Qingyang',
            },
          ],
        },
      ],
    },
    {
      text: 'Jiangsu',
      children: [
        {
          text: 'Wuxi',
          children: [
            {
              text: 'Xinwu',
            },
            {
              text: 'Binhu',
            },
          ],
        },
      ],
    },
  ])

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker cascade :columns="columns" @change="handleChange" />
</template>
```

### Region selection

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'
  import area from '@maple-design/ui/json/area.json'

  const columns = ref(area)

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker cascade :columns="columns" @change="handleChange" />
</template>
```

### Column count

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'
  import area from '@maple-design/ui/json/area.json'

  const columns = ref(area)

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker cascade :columns="columns" :columns-count="2" @change="handleChange" />
</template>
```

### Mapping values

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const columns = ref([
    [
      { text: 'A', value: 1 },
      { text: 'B', value: 2 },
      { text: 'C', value: 3 },
      { text: 'D', value: 4 },
    ],
    [
      { text: 'A', value: 1 },
      { text: 'B', value: 2 },
      { text: 'C', value: 3 },
      { text: 'D', value: 4 },
    ],
    [
      { text: 'A', value: 1 },
      { text: 'B', value: 2 },
      { text: 'C', value: 3 },
      { text: 'D', value: 4 },
    ],
  ])

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker :columns="columns" @change="handleChange" />
</template>
```

### Two-way binding

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const values = ref(['A', 'B', 'C'])
  const columns = ref([
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  ])

  function resetValues() {
    values.value = ['A', 'B', 'C']
  }

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" @click="resetValues">values: {{ values }} Reset</mp-button>
    <mp-picker :columns="columns" v-model="values" @change="handleChange" />
  </mp-space>
</template>
```

## Reading direction

Columns follow reading order and selection marks sit at logical end. Vertical keys, wheels, disabled items and data order retain their semantics.

## API

### Value and default value

Use ordinary `v-model`. `modelValue` is the selected column-values array; `defaultValue` initializes uncontrolled state once without later resets. Explicit binding wins; initialization emits no `update:modelValue`.

### Props

| Arguments | Description | Type | Default |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------ | -------- |
| `v-model` | Selected values | _(string \| number)[]_ | `[]` |
| `columns` | Column content | _PickerColumnOption[] \| PickerColumnOption[][]_ | `[]` |
| `title` | Title | _string_ | `请选择` |
| `field-names` | Custom column field mapping (`label` maps to `text`, default `text`) | _{ label?, value?, children? }_ | `-` |
| `toolbar` | Whether to display the upper toolbar | _boolean_ | `true` |
| `disabled` | Disable option clicks, touch, keyboard selection and confirmation | _boolean_ | `false` |
| `selected-values` | Selected option values; shows a check mark on the right | _(string \| number)[]_ | `[]` |
| `cascade` | Whether to enable cascade mode | _boolean_ | `true` |
| `option-height` | The height of the option | _string \| number_ | `44` |
| `option-count` | Number of visible columns | _string \| number_ | `6` |
| `columns-count` _**3.3.11**_ | Number of visible columns | _string \| number_ | `-` |
| `confirm-button-text` | Confirm button text | _string_ | `确认` |
| `cancel-button-text` | Cancel button text | _string_ | `取消` |
| `confirm-button-text-color` | Confirm button text color | _string_ | `-` |
| `cancel-button-text-color` | Cancel button text color | _string_ | `-` |
| `esc-to-close` | Whether to support keyboard ESC to close the picker | _boolean_ | `true` |

### Picker Options

| Arguments | Description | Type | Default |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------ |
| `columns` | Column content | _PickerColumnOption[] \| PickerColumnOption[][]_ | `[]` |
| `title` | Title | _string_ | `请选择` |
| `fieldNames` | Custom column field mapping (`label` maps to `text`, default `text`) | _{ label?, value?, children? }_ | `-` |
| `toolbar` | Whether to display the upper toolbar | _boolean_ | `true` |
| `disabled` | Disable option clicks, touch, keyboard selection and confirmation | _boolean_ | `false` |
| `selectedValues` | Selected option values; shows a check mark on the right | _(string \| number)[]_ | `[]` |
| `cascade` | Whether to enable cascade mode | _boolean_ | `true` |
| `optionHeight` | The height of the option | _string \| number_ | `44` |
| `optionCount` | Number of visible columns | _string \| number_ | `6` |
| `columnsCount` _**3.3.11**_ | Number of visible columns | _string \| number_ | `-` |
| `confirmButtonText` | Confirm button text | _string_ | `确认` |
| `cancelButtonText` | Cancel button text | _string_ | `取消` |
| `confirmButtonTextColor` | Confirm button text color | _string_ | `-` |
| `cancelButtonTextColor` | Cancel button text color | _string_ | `-` |
| `overlayClosable` | Whether to click the overlay to close the action sheet | _boolean_ | `true` |
| `escToClose` | Whether to support keyboard ESC to close the picker | _boolean_ | `true` |
| `safeArea` | Whether to enable bottom safety zone adaptation | _boolean_ | `false` |
| `onClickOverlay` | Click overlay callback | _(event: MouseEvent) => void_ | `-` |
| `onOpen` | Popup open callback | _() => void_ | `-` |
| `onOpened` | Popup open-animation ends callback | _() => void_ | `-` |
| `onClose` | Popup close callback | _() => void_ | `-` |
| `onClosed` | Close pop-up layer callback when animation ends | _() => void_ | `() => void` |
| `onChange` | Pick callbacks when content changes | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onConfirm` | Accepted confirm action | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onCancel` | Accepted cancel action | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onKeyEscape` | Triggered when click keyboard ESC | _() => void_ | `-` |

### PickerColumnOption

| Arguments | Description | Type | Default |
| --------------- | -------------- | ---------------------- | ------- |
| `text` | Text | _string \| number_ | `-` |
| `value` | Value | _string \| number_ | `-` |
| `disabled` | Whether disabled | _boolean_ | `false` |
| `children` | Children list | _PickerColumnOption[]_ | `-` |
| `className` | Class name | _string_ | `-` |
| `textClassName` | Text Class Name | _string_ | `-` |

### Methods

| Method | Description | Arguments | Returns |
| --------- | ------------------------------- | ---- | ------ |
| `confirm` | Stop scrolling immediately and emit confirm | `-` | `-` |
| `cancel` | Stop scrolling immediately and emit cancel | `-` | `-` |

### Events

| Event | Description | Arguments |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `change` | Triggered when the pick content changes | values: (string \| number)[] selected values <br> `indexes: number[]` selected indices <br> `options: PickerColumnOption[]` selected option objects |
| `cancel` | Accepted cancel action | values: (string \| number)[] selected values <br> `indexes: number[]` selected indices <br> `options: PickerColumnOption[]` selected option objects |
| `confirm` | Accepted confirm action | values: (string \| number)[] selected values <br> `indexes: number[]` selected indices <br> `options: PickerColumnOption[]` selected option objects |
| `key-escape` | Triggered when pressing ESC | `KeyboardEvent` |

### Slots

| Slot | Description | Arguments |
| --------- | ------------ | ---- |
| `title` | Title content | `-` |
| `cancel` | Cancel-button content | `-` |
| `confirm` | Confirm-button content | `-` |

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `--mp-picker-background` | `var(--mp-color-body)` |
| `--mp-picker-toolbar-height` | `44px` |
| `--mp-picker-picked-border` | `1px solid var(--mp-color-border-2)` |
| `--mp-picker-title-font-size` | `var(--mp-font-size-lg)` |
| `--mp-picker-title-text-color` | `var(--mp-color-text-1)` |
| `--mp-picker-option-font-size` | `var(--mp-font-size-lg)` |
| `--mp-picker-option-disabled-text-color` | `var(--mp-color-text-disabled)` |
| `--mp-picker-option-check-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-picker-option-text-color` | `var(--mp-color-text-1)` |
| `--mp-picker-toolbar-padding` | `0 4px` |
| `--mp-picker-mask-background-image` | `linear-gradient(180deg, color-mix(in srgb, var(--mp-picker-background) 90%, transparent), color-mix(in srgb, var(--mp-picker-background) 40%, transparent)), linear-gradient(0deg, color-mix(in srgb, var(--mp-picker-background) 90%, transparent), color-mix(in srgb, var(--mp-picker-background) 40%, transparent))` |

### Keyboard and reduced motion

Each interactive column is a Tab-focusable listbox. Arrows move, Home/End reach first/last enabled items, skipping disabled options. aria-selected indicates the current wheel item; selected-values indicates separate checkmarks. Empty/all-disabled columns leave the Tab sequence.

Reduced motion commits selection immediately without waiting for transitionend. Preference changes settle pending scrolling; unmount removes listeners.

### Brand appearance tokens

| CSS variable | Default |
| --- | --- |
| `--mp-picker-option-padding-horizontal` | `28px` |
| `--mp-picker-option-check-right` | `12px` |
| `--mp-picker-option-check-size` | `18px` |
| `--mp-picker-option-disabled-opacity` | `0.5` |
| `--mp-picker-transition-duration` | `250ms` |
| `--mp-picker-scroll-easing` | `cubic-bezier(0.23, 1, 0.68, 1)` |

Service notification callbacks do not control task completion. The selected/closed result is settled independently of callback errors, and closing completion always releases the owned host. Callback errors still propagate through the calling/Vue error path; returned Promises do not control loading or closing.
