# Picker

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
  import { Message, Picker } from '@maple-design/ui-vue'

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
  import { Message, Picker } from '@maple-design/ui-vue'

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
  import { Message, Picker } from '@maple-design/ui-vue'

  async function picker() {
    const { state, values, indexes } = await Picker({
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
  import { Message, Picker } from '@maple-design/ui-vue'
  import columns from '@maple-design/ui-vue/json/area.json'

  async function picker() {
    const { state, values, indexes } = await Picker({
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
  import { Message, Picker } from '@maple-design/ui-vue'
  import columns from '@maple-design/ui-vue/json/area.json'

  async function picker() {
    const { state, values, indexes } = await Picker({
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
  import { Message, Picker } from '@maple-design/ui-vue'

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
  import { Message } from '@maple-design/ui-vue'

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
  import { Message } from '@maple-design/ui-vue'

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
  import { Message } from '@maple-design/ui-vue'

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
  import { Message } from '@maple-design/ui-vue'
  import area from '@maple-design/ui-vue/json/area.json'

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
  import { Message } from '@maple-design/ui-vue'
  import area from '@maple-design/ui-vue/json/area.json'

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
  import { Message } from '@maple-design/ui-vue'

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
  import { Message } from '@maple-design/ui-vue'

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

Columns follow reading order, and selection indicators sit at logical end. Up/Down, wheels, disabled options and data order retain their existing meaning.

## Usage notes

### Keyboard and reduced motion
Each interactive column is a Tab-focusable listbox. Arrows move, Home/End reach first/last enabled items, skipping disabled options. aria-selected indicates the current wheel item; selected-values indicates separate checkmarks. Empty/all-disabled columns leave the Tab sequence.

Within FormItem, each wheel column merges the caller’s `aria-describedby` with the current form error. A form error sets each column’s `aria-invalid` to `true`; clearing it restores the caller’s value and description.

Reduced motion commits selection immediately without waiting for transitionend. Preference changes settle pending scrolling; unmount removes listeners.

### Service callbacks

Programmatic notification callbacks do not control task completion. Service selection/closing results settle independently of callback errors, and closing completion always releases the owned host. Exceptions still propagate through the caller or Vue error channel; returned Promises do not control loading or closing.

## API

### Value and default value

Use ordinary `v-model`. `modelValue` is the selected column-values array; `defaultValue` initializes uncontrolled state once without later resets. Explicit binding wins; initialization emits no `update:modelValue`.

### Picker Props

| Prop | Description | Type | Default |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------ | -------- |
| `model-value` (v-model) | External column values; synchronize candidates initially and on external changes | `(string \| number)[]` | `undefined` |
| `default-value` | Uncontrolled initial column values, read only at creation | `(string \| number)[]` | `[]` |
| `columns` | Column content | _PickerColumnOption[] \| PickerColumnOption[][]_ | `[]` |
| `title` | Title | _string_ | `请选择` |
| `field-names` | Custom column field mapping (`label` maps to `text`, default `text`) | _{ label?, value?, children? }_ | `-` |
| `toolbar` | Whether to display the upper toolbar | _boolean_ | `true` |
| `disabled` | Disable option clicks, touch, keyboard selection and confirmation | _boolean_ | `false` |
| `selected-values` | Selected option values; shows a check mark on the right | _(string \| number)[]_ | `[]` |
| `cascade` | Whether to enable cascade mode | _boolean_ | `false` |
| `option-height` | The height of the option | _string \| number_ | `44` |
| `option-count` | Number of visible columns | _string \| number_ | `6` |
| `columns-count` _**3.3.11**_ | Number of visible columns | _string \| number_ | `-` |
| `confirm-button-text` | Confirm button text | _string_ | `确认` |
| `cancel-button-text` | Cancel button text | _string_ | `取消` |
| `confirm-button-text-color` | Confirm button text color | _string_ | `-` |
| `cancel-button-text-color` | Cancel button text color | _string_ | `-` |
| `esc-to-close` | Whether to support keyboard ESC to close the picker | _boolean_ | `true` |
| `dynamic` | Internal popup adapter switch; false renders the embedded component | boolean | `false` |
| `open` (v-model) | Controlled opening when dynamic=true | boolean | `undefined` |
| `default-open` | Initial uncontrolled opening, read only at creation | boolean | `false` |
| `popup-container` | Popup container when dynamic=true; false renders in place | `string \| HTMLElement \| false` | `undefined` |
| `overlay-closable` | Request closing the dynamic popup on overlay click | boolean | `true` |
| `safe-area` | Bottom, left and right safe areas for dynamic popups | boolean | `false` |

### Picker Options

| Prop | Description | Type | Default |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------ |
| `columns` | Column content | _PickerColumnOption[] \| PickerColumnOption[][]_ | `[]` |
| `title` | Title | _string_ | `请选择` |
| `fieldNames` | Custom column field mapping (`label` maps to `text`, default `text`) | _{ label?, value?, children? }_ | `-` |
| `toolbar` | Whether to display the upper toolbar | _boolean_ | `true` |
| `disabled` | Disable option clicks, touch, keyboard selection and confirmation | _boolean_ | `false` |
| `selectedValues` | Selected option values; shows a check mark on the right | _(string \| number)[]_ | `[]` |
| `cascade` | Whether to enable cascade mode | _boolean_ | `false` |
| `optionHeight` | The height of the option | _string \| number_ | `44` |
| `optionCount` | Number of visible columns | _string \| number_ | `6` |
| `columnsCount` _**3.3.11**_ | Number of visible columns | _string \| number_ | `-` |
| `confirmButtonText` | Confirm button text | _string_ | `确认` |
| `cancelButtonText` | Cancel button text | _string_ | `取消` |
| `confirmButtonTextColor` | Confirm button text color | _string_ | `-` |
| `cancelButtonTextColor` | Cancel button text color | _string_ | `-` |
| `overlayClosable` | Whether to click the overlay to close the action sheet | _boolean_ | `true` |
| `escToClose` | Whether to support keyboard ESC to close the picker | _boolean_ | `true` |
| `safeArea` | Whether to adapt to the bottom, left and right safe areas | _boolean_ | `false` |
| `onClickOverlay` | Click overlay callback | _(event: MouseEvent) => void_ | `-` |
| `onOpen` | Popup open callback | _() => void_ | `-` |
| `onOpened` | Popup open-animation ends callback | _() => void_ | `-` |
| `onClose` | Popup close callback | _() => void_ | `-` |
| `onClosed` | Close pop-up layer callback when animation ends | _() => void_ | `-` |
| `onChange` | Pick callbacks when content changes | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `-` |
| `onConfirm` | Accepted confirm action | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `-` |
| `onCancel` | Accepted cancel action | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `-` |
| `onKeyEscape` | Triggered when click keyboard ESC | `(event: KeyboardEvent) => void` | `-` |
| `modelValue` | Initial service values, taking precedence over defaultValue | `(string \| number)[]` | `undefined` |
| `defaultValue` | Initial uncontrolled service values | `(string \| number)[]` | `[]` |
| `popupContainer` | Service container following the shared popup-container protocol; false renders in place | `string \| HTMLElement \| false` | `body` |

### PickerColumnOption Methods

| Method | Description | Arguments | Returns |
| --------- | ------------------------------- | ---- | ------ |
| `confirm` | Stop scrolling immediately and emit confirm | `-` | `-` |
| `cancel` | Stop scrolling immediately and emit cancel | `-` | `-` |

### PickerColumnOption Events

| Event | Description | Arguments |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `change` | Triggered when the pick content changes | values: (string \| number)[] selected values <br> `indexes: number[]` selected indices <br> `options: PickerColumnOption[]` selected option objects |
| `cancel` | Accepted cancel action | values: (string \| number)[] selected values <br> `indexes: number[]` selected indices <br> `options: PickerColumnOption[]` selected option objects |
| `confirm` | Accepted confirm action | values: (string \| number)[] selected values <br> `indexes: number[]` selected indices <br> `options: PickerColumnOption[]` selected option objects |
| `key-escape` | Triggered when pressing ESC | `KeyboardEvent` |
| `update:model-value` | Candidate values after change; does not imply business confirmation | `(values: (string \| number)[])` |
| `update:open` | Dynamic popup opening request | `(open: boolean)` |
| `open` | Dynamic popup starts opening | `()` |
| `opened` | Dynamic popup opening transition completes | `()` |
| `close` | Dynamic popup starts closing | `()` |
| `closed` | Dynamic popup closing transition completes | `()` |
| `click-overlay` | Dynamic popup overlay click | `(event: MouseEvent)` |

### PickerColumnOption Slots

| Slot | Description | Prop |
| --------- | ------------ | ---- |
| `title` | Title content | `-` |
| `cancel` | Cancel-button content | `-` |
| `confirm` | Confirm-button content | `-` |

### Candidates, layout and service ownership

The wheel retains local candidates. modelValue synchronizes from outside; scrolling or keyboard selection updates candidates and notifies change followed by update:modelValue. Unaccepted updates do not immediately roll back. Later external value changes synchronize again. Both confirm and cancel carry current candidates; cancel does not restore initial values. The component only notifies, while its owner controls closing.

Changing optionHeight or optionCount recenters candidates and stops old scrolling transitions. columnsCount immediately updates visible columns, preserving retained nodes, focus and candidates. Layout changes send no additional model/change notifications and do not roll unaccepted candidates back to old external values. Removed column nodes are outside the focus-retention guarantee.

Picker(options) is an explicit asynchronous selection service. It copies configuration and owns mutable open/dynamic state and singleton lifecycle without writing to caller options, including frozen objects. Explicit popupContainer values are respected; the default is body. open, defaultOpen and dynamic are not service Options; component Props still support embedded and popup modes.

The service returns PickerResolvedData with state confirm, cancel or close. confirm/cancel include values, indexes and options; close contains only state. Notification callbacks are not awaited. confirm/cancel settle and request closing before notification; a throwing closed callback cannot skip host cleanup. Picker.close() closes only the current service singleton.

The title, cancel and confirm toolbar slots have no scoped arguments. Custom buttons may call instance confirm()/cancel(). Only these two methods form the public instance contract; other setup render bindings are not business extension points. Picker.Component and _PickerComponent are actual SFCs; default Picker is the callable service and installation entry point.

```ts
import { Picker, type PickerOptions, type PickerColumnOption,
  type PickerResolvedState, type PickerResolvedData,
  type PickerProps, type PickerInstance, type PickerEmits,
  type PickerSlots, type PickerSelection } from '@maple-design/ui-vue'
```

## Types

### PickerColumnOption

| Prop | Description | Type | Default |
| --------------- | -------------- | ---------------------- | ------- |
| `text` | Text | _string \| number_ | `-` |
| `value` | Value | _string \| number_ | `-` |
| `disabled` | Whether disabled | _boolean_ | `false` |
| `children` | Children list | _PickerColumnOption[]_ | `-` |
| `className` | Class name | _string_ | `-` |
| `textClassName` | Text Class Name | _string_ | `-` |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-picker-background` | `var(--mp-color-body)` | `background`, `background-image` |
| `--mp-picker-mask-background-image` | `linear-gradient(180deg, color-mix(in srgb, var(--mp-picker-background) 90%, transparent), color-mix(in srgb, var(--mp-picker-background) 40%, transparent)),     linear-gradient(       0deg,       color-mix(in srgb, var(--mp-picker-background) 90%, transparent),       color-mix(in srgb, var(--mp-picker-background) 40%, transparent)     )` | `background-image` |
| `--mp-picker-option-active-text-color` | `var(--mp-picker-option-text-color)` | `color` |
| `--mp-picker-option-check-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-picker-option-check-right` | `12px` | `inset-inline-end` |
| `--mp-picker-option-check-size` | `18px` | `font-size` |
| `--mp-picker-option-disabled-opacity` | `0.5` | `opacity` |
| `--mp-picker-option-disabled-text-color` | `var(--mp-color-text-disabled)` | `color` |
| `--mp-picker-option-font-size` | `var(--mp-font-size-lg)` | `font-size` |
| `--mp-picker-option-padding-horizontal` | `28px` | `padding` |
| `--mp-picker-option-text-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-picker-picked-border` | `1px solid var(--mp-color-border-2)` | `border-bottom`, `border-top` |
| `--mp-picker-scroll-easing` | `cubic-bezier(0.23, 1, 0.68, 1)` | `transition-timing-function` |
| `--mp-picker-title-font-size` | `var(--mp-font-size-lg)` | `font-size` |
| `--mp-picker-title-text-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-picker-toolbar-height` | `44px` | `height` |
| `--mp-picker-toolbar-padding` | `0 4px` | `padding` |
| `--mp-picker-transition-duration` | `250ms` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-picker-background: var(--mp-color-body);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
