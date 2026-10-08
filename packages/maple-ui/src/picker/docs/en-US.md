# Picker

### Intro

Two calling methods, function and component, are provided. It also supports cascade mode and can handle multi-level linkage.



### function call

```demo
../example/demos/function-call.vue
```

### single picker

```demo
../example/demos/single-picker.vue
```

### multiple picker

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

### two way binding

```demo
../example/demos/two-way-binding.vue
```
## Function call

### Single Column Picker

The function will return the information selected by the user and the user's last action `state`. `state` may be `confirm`, `cancel`, `close`.

```html
<script setup>
  import { Message, Picker } from '@maplejs/maple-ui'

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
  <mp-button status="primary" block @click="picker">Single Column Picker</mp-button>
</template>
```

### Multiple Column Picker

```html
<script setup>
  import { Message, Picker } from '@maplejs/maple-ui'

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
  <mp-button status="primary" block @click="picker">Multiple Column Picker</mp-button>
</template>
```

### Cascade Column Picker

Set the `cascade` property to enable cascading scrolling.

```html
<script setup>
  import { Message, Picker } from '@maplejs/maple-ui'

  async function picker() {
    const { state, texts, indexes } = await Picker({
      cascade: true,
      columns: [
        {
          text: '四川省',
          children: [
            {
              text: '成都市',
              children: [
                {
                  text: '温江区',
                },
                {
                  text: '青羊区',
                },
              ],
            },
          ],
        },
        {
          text: '江苏省',
          children: [
            {
              text: '无锡市',
              children: [
                {
                  text: '新吴区',
                },
                {
                  text: '滨湖区',
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
  <mp-button status="primary" block @click="picker">Cascade Column Picker</mp-button>
</template>
```

### Area Picker

The component library provides cascade data of Chinese provinces and cities, which can be used directly.

```html
<script setup>
  import { Message, Picker } from '@maplejs/maple-ui'
  import columns from '@maplejs/maple-ui/json/area.json'

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
  <mp-button status="primary" block @click="picker">Area Picker</mp-button>
</template>
```

### Columns Count

The maximum number of displayed columns can be set via `columnsCount`, which is very useful in cascading mode.

```html
<script setup>
  import { Message, Picker } from '@maplejs/maple-ui'
  import columns from '@maplejs/maple-ui/json/area.json'

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
  <mp-button status="primary" block @click="picker">Columns Count</mp-button>
</template>
```

### Value Mapping

```html
<script setup>
  import { Message, Picker } from '@maplejs/maple-ui'

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
  <mp-button status="primary" block @click="picker">Value Mapping</mp-button>
</template>
```

## Component Call

### Single Column Picker

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maplejs/maple-ui'

  const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker :columns="columns" @change="handleChange" />
</template>
```

### Multiple Column Picker

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maplejs/maple-ui'

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

### Cascade Column Picker

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maplejs/maple-ui'

  const columns = ref([
    {
      text: '四川省',
      children: [
        {
          text: '成都市',
          children: [
            {
              text: '温江区',
            },
            {
              text: '青羊区',
            },
          ],
        },
      ],
    },
    {
      text: '江苏省',
      children: [
        {
          text: '无锡市',
          children: [
            {
              text: '新吴区',
            },
            {
              text: '滨湖区',
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

### Area Picker

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maplejs/maple-ui'
  import area from '@maplejs/maple-ui/json/area.json'

  const columns = ref(area)

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker cascade :columns="columns" @change="handleChange" />
</template>
```

### Columns Count

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maplejs/maple-ui'
  import area from '@maplejs/maple-ui/json/area.json'

  const columns = ref(area)

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker cascade :columns="columns" :columns-count="2" @change="handleChange" />
</template>
```

### Value Mapping

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maplejs/maple-ui'

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
  import { Message } from '@maplejs/maple-ui'

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
    <mp-button status="primary" @click="resetValues">values: {{ values }} Click Reset</mp-button>
    <mp-picker :columns="columns" v-model="values" @change="handleChange" />
  </mp-space>
</template>
```

## API

### Props

| Prop                         | Description                                                        | Type                                             | Default   |
| ---------------------------- | ------------------------------------------------------------------ | ------------------------------------------------ | --------- |
| `v-model`                    | Selected values                                                    | _(string \| number)[]_                           | `[]`      |
| `columns`                    | Column content                                                     | _PickerColumnOption[] \| PickerColumnOption[][]_ | `[]`      |
| `title`                      | Title                                                              | _string_                                         | `Pick it` |
| `field-names`                | Custom column field mapping (`label` maps to text, default `text`) | _{ label?, value?, children? }_                  | `-`       |
| `toolbar`                    | Whether to display the upper toolbar                               | _boolean_                                        | `true`    |
| `selected-values`            | Selected option values; shows a check mark on the right            | _(string \| number)[]_                           | `[]`      |
| `cascade`                    | Whether to enable cascade mode                                     | _boolean_                                        | `true`    |
| `option-height`              | The height of the option                                           | _string \| number_                               | `44`      |
| `option-count`               | Number of visible columns                                          | _string \| number_                               | `6`       |
| `columns-count` _**3.3.11**_ | Number of visible columns                                          | _string \| number_                               | `-`       |
| `confirm-button-text`        | Confirm button text                                                | _string_                                         | `Confirm` |
| `cancel-button-text`         | Cancel button text                                                 | _string_                                         | `Cancel`  |
| `confirm-button-text-color`  | Confirm button text color                                          | _string_                                         | `-`       |
| `cancel-button-text-color`   | Cancel button text color                                           | _string_                                         | `-`       |
| `esc-to-close`               | Whether to support keyboard ESC to close the picker                | _boolean_                                        | `true`    |

### Picker Options

| Prop                        | Description                                                        | Type                                                                                       | Default      |
| --------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------ |
| `columns`                   | Column content                                                     | _PickerColumnOption[] \| PickerColumnOption[][]_                                           | `[]`         |
| `title`                     | Column content                                                     | _string_                                                                                   | `Pick it`    |
| `fieldNames`                | Custom column field mapping (`label` maps to text, default `text`) | _{ label?, value?, children? }_                                                            | `-`          |
| `toolbar`                   | Whether to display the upper toolbar                               | _boolean_                                                                                  | `true`       |
| `selectedValues`            | Selected option values; shows a check mark on the right            | _(string \| number)[]_                                                                     | `[]`         |
| `cascade`                   | Whether to enable cascade mode                                     | _boolean_                                                                                  | `true`       |
| `optionHeight`              | The height of the option                                           | _string \| number_                                                                         | `44`         |
| `optionCount`               | Number of visible options                                          | _string \| number_                                                                         | `6`          |
| `columnsCount` _**3.3.11**_ | Number of visible columns(defaults to display total columns)       | _string \| number_                                                                         | `-`          |
| `confirmButtonText`         | Confirm button text                                                | _string_                                                                                   | `Confirm`    |
| `cancelButtonText`          | Cancel button text                                                 | _string_                                                                                   | `Cancel`     |
| `confirmButtonTextColor`    | Confirm button text color                                          | _string_                                                                                   | `-`          |
| `cancelButtonTextColor`     | Cancel button text color                                           | _string_                                                                                   | `-`          |
| `overlayClosable`           | Whether to click the overlay to close the picker                   | _boolean_                                                                                  | `true`       |
| `escToClose`                | Whether to support keyboard ESC to close the picker                | _boolean_                                                                                  | `true`       |
| `safeArea`                  | Whether to enable bottom safety zone adaptation                    | _boolean_                                                                                  | `false`      |
| `onClickOverlay`            | Click overlay callback                                             | _(event: MouseEvent) => void_                                                              | `-`          |
| `onOpen`                    | Popup open callback                                                | _() => void_                                                                               | `-`          |
| `onOpened`                  | Popup open-animation ends callback                                 | _() => void_                                                                               | `-`          |
| `onClose`                   | Popup close callback                                               | _() => void_                                                                               | `-`          |
| `onClosed`                  | Close pop-up layer callback when animation ends                    | _() => void_                                                                               | `() => void` |
| `onChange`                  | Pick callbacks when content changes                                | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onConfirm`                 | Pick callbacks when confirm                                        | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onCancel`                  | Pick callbacks when cancel                                         | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onKeyEscape`               | Triggered when click keyboard ESC                                  | _() => void_                                                                               | `-`          |

### PickerColumnOption

| Prop            | Description      | Type                   | Default |
| --------------- | ---------------- | ---------------------- | ------- |
| `text`          | Text             | _string \| number_     | `-`     |
| `value`         | Value            | _string \| number_     | `-`     |
| `disabled`      | Whether disabled | _boolean_              | `false` |
| `children`      | Children list    | _PickerColumnOption[]_ | `-`     |
| `className`     | Class name       | _string_               | `-`     |
| `textClassName` | Text Class Name  | _string_               | `-`     |

### Methods

| Method    | Description                                                | Arguments | Return |
| --------- | ---------------------------------------------------------- | --------- | ------ |
| `confirm` | Immediately stop scrolling and trigger the `confirm` event | `-`       | `-`    |
| `cancel`  | Immediately stop scrolling and trigger the `cancel` event  | `-`       | `-`    |

### Events

| Event        | Description                                 | Arguments                                                                                                                                      |
| ------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `change`     | Triggered when the pick content changes     | `values: (string \| number)[]` Selected Values <br> `indexes: number[]` Selected indexes <br> `options: PickerColumnOption[]` Selected options |
| `cancel`     | Triggered when you click the cancel button  | `values: (string \| number)[]` Selected Values <br> `indexes: number[]` Selected indexes <br> `options: PickerColumnOption[]` Selected options |
| `confirm`    | Triggered when you click the confirm button | `values: (string \| number)[]` Selected Values <br> `indexes: number[]` Selected indexes <br> `options: PickerColumnOption[]` Selected options |
| `key-escape` | Triggered when pressing ESC                 | `KeyboardEvent`                                                                                                                                |

### Slots

| Name      | Description            | SlotProps |
| --------- | ---------------------- | --------- |
| `title`   | Title content          | `-`       |
| `cancel`  | Cancel button content  | `-`       |
| `confirm` | Confirm button content | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                              | Default                                                                                                                                         |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `--mp-picker-background`                 | `#fff`                                                                                                                                          |
| `--mp-picker-toolbar-height`             | `44px`                                                                                                                                          |
| `--mp-picker-picked-border`              | `1px solid var(--mp-color-border-2)`                                                                                                               |
| `--mp-picker-title-font-size`            | `var(--mp-font-size-lg)`                                                                                                                           |
| `--mp-picker-title-text-color`           | `#555`                                                                                                                                          |
| `--mp-picker-option-font-size`           | `var(--mp-font-size-lg)`                                                                                                                           |
| `--mp-picker-option-disabled-text-color` | `var(--mp-color-text-disabled, #c8c9cc)`                                                                                                           |
| `--mp-picker-option-check-color`         | `var(--mp-sys-color-content-brand)`                                                                                                                          |
| `--mp-picker-option-text-color`          | `#555`                                                                                                                                          |
| `--mp-picker-toolbar-padding`            | `0 4px`                                                                                                                                         |
| `--mp-picker-mask-background-image`      | `linear-gradient(180deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4)),linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4))` |
