# 多列选择器

### 介绍

提供了函数和组件两种调用方式。同时支持级联模式，可以处理多级联动。



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
## 函数调用

### 单列选择

函数会返回用户选择的信息和用户最后的动作 `state`。 `state` 可能是 `confirm`, `cancel`, `close`。

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
  <mp-button status="primary" block @click="picker">单列选择</mp-button>
</template>
```

### 多列选择

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
  <mp-button status="primary" block @click="picker">多列选择</mp-button>
</template>
```

### 级联选择

设置 `cascade` 属性开启级联滚动。

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
  <mp-button status="primary" block @click="picker">级联选择</mp-button>
</template>
```

### 地区选择

组件库提供了中国省市区的级联数据，可以直接使用。

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
  <mp-button status="primary" block @click="picker">地区选择</mp-button>
</template>
```

### 列数量

通过 `columnsCount` 设置最大显示列的数量，在级联模式下十分有用。

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
  <mp-button status="primary" block @click="picker">配置显示列</mp-button>
</template>
```

### 值映射

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
  <mp-button status="primary" block @click="picker">值映射</mp-button>
</template>
```

## 组件调用

### 单列选择

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

### 多列选择

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

### 级联选择

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

### 地区选择

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

### 列数量

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

### 值的映射

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

### 双向绑定

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
    <mp-button status="primary" @click="resetValues">values: {{ values }} 点击重置</mp-button>
    <mp-picker :columns="columns" v-model="values" @change="handleChange" />
  </mp-space>
</template>
```

## API

### 属性

| 参数                         | 说明                                              | 类型                                             | 默认值   |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------ | -------- |
| `v-model`                    | 绑定的值                                          | _(string \| number)[]_                           | `[]`     |
| `columns`                    | 列内容                                            | _PickerColumnOption[] \| PickerColumnOption[][]_ | `[]`     |
| `title`                      | 标题                                              | _string_                                         | `请选择` |
| `field-names`                | 自定义列字段映射（`label` 对应文本，默认 `text`） | _{ label?, value?, children? }_                  | `-`      |
| `toolbar`                    | 是否显示上方工具栏                                | _boolean_                                        | `true`   |
| `selected-values`            | 已选中的选项值，选项右侧显示对号                  | _(string \| number)[]_                           | `[]`     |
| `cascade`                    | 是否开启级联模式                                  | _boolean_                                        | `true`   |
| `option-height`              | 选项的高度(px rem)                                | _string \| number_                               | `44`     |
| `option-count`               | 可见的选项个数                                    | _string \| number_                               | `6`      |
| `columns-count` _**3.3.11**_ | 最大显示列数                                      | _string \| number_                               | `-`      |
| `confirm-button-text`        | 确认按钮文字                                      | _string_                                         | `确认`   |
| `cancel-button-text`         | 取消按钮文字                                      | _string_                                         | `取消`   |
| `confirm-button-text-color`  | 确认按钮文字颜色                                  | _string_                                         | `-`      |
| `cancel-button-text-color`   | 取消按钮文字颜色                                  | _string_                                         | `-`      |
| `esc-to-close`               | 是否支持键盘 ESC 关闭选择器                       | _boolean_                                        | `true`   |

### Picker Options

| 参数                        | 说明                                              | 类型                                                                                       | 默认值       |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------ |
| `columns`                   | 列内容                                            | _PickerColumnOption[] \| PickerColumnOption[][]_                                           | `[]`         |
| `title`                     | 标题                                              | _string_                                                                                   | `请选择`     |
| `fieldNames`                | 自定义列字段映射（`label` 对应文本，默认 `text`） | _{ label?, value?, children? }_                                                            | `-`          |
| `toolbar`                   | 是否显示上方工具栏                                | _boolean_                                                                                  | `true`       |
| `selectedValues`            | 已选中的选项值，选项右侧显示对号                  | _(string \| number)[]_                                                                     | `[]`         |
| `cascade`                   | 是否开启级联模式                                  | _boolean_                                                                                  | `true`       |
| `optionHeight`              | 选项的高度                                        | _string \| number_                                                                         | `44`         |
| `optionCount`               | 可见的选项个数                                    | _string \| number_                                                                         | `6`          |
| `columnsCount` _**3.3.11**_ | 最大显示列数                                      | _string \| number_                                                                         | `-`          |
| `confirmButtonText`         | 确认按钮文字                                      | _string_                                                                                   | `确认`       |
| `cancelButtonText`          | 取消按钮文字                                      | _string_                                                                                   | `取消`       |
| `confirmButtonTextColor`    | 确认按钮文字颜色                                  | _string_                                                                                   | `-`          |
| `cancelButtonTextColor`     | 取消按钮文字颜色                                  | _string_                                                                                   | `-`          |
| `overlayClosable`           | 是否点击背景层关闭弹出层                          | _boolean_                                                                                  | `true`       |
| `escToClose`                | 是否支持键盘 ESC 关闭选择器                       | _boolean_                                                                                  | `true`       |
| `safeArea`                  | 是否开启底部安全区适配                            | _boolean_                                                                                  | `false`      |
| `onClickOverlay`            | 背景层点击回调                                    | _(event: MouseEvent) => void_                                                              | `-`          |
| `onOpen`                    | 弹出层开启回调                                    | _() => void_                                                                               | `-`          |
| `onOpened`                  | 弹出层开启动画结束回调                            | _() => void_                                                                               | `-`          |
| `onClose`                   | 弹出层关闭回调                                    | _() => void_                                                                               | `-`          |
| `onClosed`                  | 关闭弹出层动画结束时回调                          | _() => void_                                                                               | `() => void` |
| `onChange`                  | 选择内容变化时回调                                | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onConfirm`                 | 点击确认按钮时触发                                | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onCancel`                  | 点击取消按钮时触发                                | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onKeyEscape`               | 点击键盘 ESC 时触发                               | _() => void_                                                                               | `-`          |

### PickerColumnOption

| 参数            | 说明           | 类型                   | 默认值  |
| --------------- | -------------- | ---------------------- | ------- |
| `text`          | 文本           | _string \| number_     | `-`     |
| `value`         | 值             | _string \| number_     | `-`     |
| `disabled`      | 是否禁用       | _boolean_              | `false` |
| `children`      | 子列表         | _PickerColumnOption[]_ | `-`     |
| `className`     | 附加的类名     | _string_               | `-`     |
| `textClassName` | 文本附加的类名 | _string_               | `-`     |

### 方法

| 方法名    | 说明                            | 参数 | 返回值 |
| --------- | ------------------------------- | ---- | ------ |
| `confirm` | 立刻停止滚动并触发 confirm 事件 | `-`  | `-`    |
| `cancel`  | 立刻停止滚动并触发 cancel 事件  | `-`  | `-`    |

### 事件

| 事件名       | 说明               | 参数                                                                                                                                        |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `change`     | 选择内容变化时触发 | `values: (string \| number)[]` 选择的值列表 <br> `indexes: number[]` 选择的下标列表 <br> `options: PickerColumnOption[]` 选择的选项对象列表 |
| `cancel`     | 点击取消按钮时触发 | `values: (string \| number)[]` 选择的值列表 <br> `indexes: number[]` 选择的下标列表 <br> `options: PickerColumnOption[]` 选择的选项对象列表 |
| `confirm`    | 点击确认按钮时触发 | `values: (string \| number)[]` 选择的值列表 <br> `indexes: number[]` 选择的下标列表 <br> `options: PickerColumnOption[]` 选择的选项对象列表 |
| `key-escape` | 按下 ESC 时触发    | `KeyboardEvent`                                                                                                                             |

### 插槽

| 插槽名    | 说明         | 参数 |
| --------- | ------------ | ---- |
| `title`   | 标题内容     | `-`  |
| `cancel`  | 取消按钮内容 | `-`  |
| `confirm` | 确认按钮内容 | `-`  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                | 默认值                                                                                                                                          |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `--picker-background`                 | `#fff`                                                                                                                                          |
| `--picker-toolbar-height`             | `44px`                                                                                                                                          |
| `--picker-picked-border`              | `1px solid var(--color-border-2)`                                                                                                               |
| `--picker-title-font-size`            | `var(--font-size-lg)`                                                                                                                           |
| `--picker-title-text-color`           | `#555`                                                                                                                                          |
| `--picker-option-font-size`           | `var(--font-size-lg)`                                                                                                                           |
| `--picker-option-disabled-text-color` | `var(--color-text-disabled, #c8c9cc)`                                                                                                           |
| `--picker-option-check-color`         | `var(--color-primary)`                                                                                                                          |
| `--picker-option-text-color`          | `#555`                                                                                                                                          |
| `--picker-toolbar-padding`            | `0 4px`                                                                                                                                         |
| `--picker-mask-background-image`      | `linear-gradient(180deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4)),linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4))` |
