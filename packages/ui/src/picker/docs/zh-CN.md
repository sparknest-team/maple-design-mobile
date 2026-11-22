# 多列选择器

### 介绍

提供了函数和组件两种调用方式。同时支持级联模式，可以处理多级联动。

## 基础示例

### single picker

```demo
../example/demos/single-picker.vue
```

## 选择模式与选项

### multiple picker

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `columns` | 列内容 | multiple picker、cascade picker、area picker |
| `cascade` | 是否开启级联模式 | cascade picker、area picker、columns count |
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

## 交互与调用方式

### 禁用选择器

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `columns` | 列内容 | 禁用选择器、two way binding |
| `disabled` | 禁用选项点击、触摸、键盘选择及确认 | 禁用选择器 |
| `toolbar` | 是否显示上方工具栏 | 禁用选择器 |
<!-- demo-config-notes:end -->

勾选时无法通过点击、触摸或键盘改变选择；解除禁用后继续使用原模型值。

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

## 函数调用

### 单列选择

函数会返回用户选择的信息和用户最后的动作 `state`。 `state` 可能是 `confirm`, `cancel`, `close`。

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
  <mp-button status="primary" block @click="picker">单列选择</mp-button>
</template>
```

### 多列选择

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
  <mp-button status="primary" block @click="picker">多列选择</mp-button>
</template>
```

### 级联选择

设置 `cascade` 属性开启级联滚动。

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui-vue'

  async function picker() {
    const { state, values, indexes } = await Picker({
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
  <mp-button status="primary" block @click="picker">地区选择</mp-button>
</template>
```

### 列数量

通过 `columnsCount` 设置最大显示列的数量，在级联模式下十分有用。

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
  <mp-button status="primary" block @click="picker">配置显示列</mp-button>
</template>
```

### 值映射

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
  <mp-button status="primary" block @click="picker">值映射</mp-button>
</template>
```

## 组件调用

### 单列选择

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

### 多列选择

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

### 级联选择

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui-vue'

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

### 列数量

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

### 值的映射

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

### 双向绑定

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
    <mp-button status="primary" @click="resetValues">values: {{ values }} 点击重置</mp-button>
    <mp-picker :columns="columns" v-model="values" @change="handleChange" />
  </mp-space>
</template>
```

## 阅读方向

列按阅读顺序排列，选中标记位于逻辑终点；上下键、滚轮、禁用项和数据顺序保持原有语义。

## 使用说明

### 键盘与减少动效
每个可操作列为一个 listbox，可用 Tab 聚焦；方向键上下移动，Home/End 到首尾可用项，跳过禁用项。aria-selected 表达当前滚轮项；selected-values 只表达额外勾选标记，两者职责不同。空列和全禁用列不进入 Tab 顺序。

在 FormItem 内，每个滚轮列会合并调用方的 `aria-describedby` 和当前表单错误；表单错误时各列的 `aria-invalid` 为 `true`，清除错误后恢复调用方的值和描述。

减少动效偏好下，选择立即提交且不等待 transitionend；偏好动态切换时收束待提交滚动，卸载时移除监听。

### 函数调用回调

函数调用的通知回调不控制任务完成。服务的选择或关闭结果独立于回调异常结算，关闭完成时仍会清理所属宿主。异常继续通过调用方或 Vue 错误通道传递；回调返回 Promise 不控制 loading 或关闭。

## API

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示选中列值数组；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

### Picker Props

| 参数                         | 说明                                              | 类型                                             | 默认值   |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------ | -------- |
| `model-value` (v-model) | 外部列值数组；初始化及外部变化同步候选 | `(string \| number)[]` | `undefined` |
| `default-value` | 非受控初始列值，仅创建时读取 | `(string \| number)[]` | `[]` |
| `columns`                    | 列内容                                            | _PickerColumnOption[] \| PickerColumnOption[][]_ | `[]`     |
| `title`                      | 标题                                              | _string_                                         | `请选择` |
| `field-names`                | 自定义列字段映射（`label` 对应文本，默认 `text`） | _{ label?, value?, children? }_                  | `-`      |
| `toolbar`                    | 是否显示上方工具栏                                | _boolean_                                        | `true`   |
| `disabled`                   | 禁用选项点击、触摸、键盘选择及确认                | _boolean_                                        | `false`  |
| `selected-values`            | 已选中的选项值，选项右侧显示对号                  | _(string \| number)[]_                           | `[]`     |
| `cascade`                    | 是否开启级联模式                                  | _boolean_                                        | `false`   |
| `option-height`              | 选项的高度(px rem)                                | _string \| number_                               | `44`     |
| `option-count`               | 可见的选项个数                                    | _string \| number_                               | `6`      |
| `columns-count` _**3.3.11**_ | 最大显示列数                                      | _string \| number_                               | `-`      |
| `confirm-button-text`        | 确认按钮文字                                      | _string_                                         | `确认`   |
| `cancel-button-text`         | 取消按钮文字                                      | _string_                                         | `取消`   |
| `confirm-button-text-color`  | 确认按钮文字颜色                                  | _string_                                         | `-`      |
| `cancel-button-text-color`   | 取消按钮文字颜色                                  | _string_                                         | `-`      |
| `esc-to-close`               | 是否支持键盘 ESC 关闭选择器                       | _boolean_                                        | `true`   |
| `dynamic` | 内部弹层适配开关；false 为嵌入式组件 | boolean | `false` |
| `open` (v-model) | dynamic=true 时的受控开关 | boolean | `undefined` |
| `default-open` | 非受控初始开关，仅创建时读取 | boolean | `false` |
| `popup-container` | dynamic=true 时的挂载容器；false 保持原位 | `string \| HTMLElement \| false` | `undefined` |
| `overlay-closable` | 动态弹层点击遮罩时请求关闭 | boolean | `true` |
| `safe-area` | 动态弹层底部及左右安全区 | boolean | `false` |

### Picker Options

| 参数                        | 说明                                              | 类型                                                                                       | 默认值       |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------ |
| `columns`                   | 列内容                                            | _PickerColumnOption[] \| PickerColumnOption[][]_                                           | `[]`         |
| `title`                     | 标题                                              | _string_                                                                                   | `请选择`     |
| `fieldNames`                | 自定义列字段映射（`label` 对应文本，默认 `text`） | _{ label?, value?, children? }_                                                            | `-`          |
| `toolbar`                   | 是否显示上方工具栏                                | _boolean_                                                                                  | `true`       |
| `disabled`                  | 禁用选项点击、触摸、键盘选择及确认                | _boolean_                                                                                  | `false`      |
| `selectedValues`            | 已选中的选项值，选项右侧显示对号                  | _(string \| number)[]_                                                                     | `[]`         |
| `cascade`                   | 是否开启级联模式                                  | _boolean_                                                                                  | `false`       |
| `optionHeight`              | 选项的高度                                        | _string \| number_                                                                         | `44`         |
| `optionCount`               | 可见的选项个数                                    | _string \| number_                                                                         | `6`          |
| `columnsCount` _**3.3.11**_ | 最大显示列数                                      | _string \| number_                                                                         | `-`          |
| `confirmButtonText`         | 确认按钮文字                                      | _string_                                                                                   | `确认`       |
| `cancelButtonText`          | 取消按钮文字                                      | _string_                                                                                   | `取消`       |
| `confirmButtonTextColor`    | 确认按钮文字颜色                                  | _string_                                                                                   | `-`          |
| `cancelButtonTextColor`     | 取消按钮文字颜色                                  | _string_                                                                                   | `-`          |
| `overlayClosable`           | 是否点击背景层关闭弹出层                          | _boolean_                                                                                  | `true`       |
| `escToClose`                | 是否支持键盘 ESC 关闭选择器                       | _boolean_                                                                                  | `true`       |
| `safeArea`                  | 是否开启底部及左右安全区适配                            | _boolean_                                                                                  | `false`      |
| `onClickOverlay`            | 背景层点击回调                                    | _(event: MouseEvent) => void_                                                              | `-`          |
| `onOpen`                    | 弹出层开启回调                                    | _() => void_                                                                               | `-`          |
| `onOpened`                  | 弹出层开启动画结束回调                            | _() => void_                                                                               | `-`          |
| `onClose`                   | 弹出层关闭回调                                    | _() => void_                                                                               | `-`          |
| `onClosed`                  | 关闭弹出层动画结束时回调                          | _() => void_                                                                               | `-` |
| `onChange`                  | 选择内容变化时回调                                | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `-` |
| `onConfirm`                 | 点击确认按钮时触发                                | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `-` |
| `onCancel`                  | 点击取消按钮时触发                                | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `-` |
| `onKeyEscape`               | 点击键盘 ESC 时触发                               | `(event: KeyboardEvent) => void`                                                                               | `-`          |
| `modelValue` | 服务初始列值，优先于 defaultValue | `(string \| number)[]` | `undefined` |
| `defaultValue` | 服务非受控初始值 | `(string \| number)[]` | `[]` |
| `popupContainer` | 服务挂载容器，遵守共享容器协议；false 保持原位 | `string \| HTMLElement \| false` | `body` |

### PickerColumnOption Methods

| 方法名    | 说明                            | 参数 | 返回值 |
| --------- | ------------------------------- | ---- | ------ |
| `confirm` | 立刻停止滚动并触发 confirm 事件 | `-`  | `-`    |
| `cancel`  | 立刻停止滚动并触发 cancel 事件  | `-`  | `-`    |

### PickerColumnOption Events

| 事件名       | 说明               | 参数                                                                                                                                        |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `change`     | 选择内容变化时触发 | `values: (string \| number)[]` 选择的值列表 <br> `indexes: number[]` 选择的下标列表 <br> `options: PickerColumnOption[]` 选择的选项对象列表 |
| `cancel`     | 点击取消按钮时触发 | `values: (string \| number)[]` 选择的值列表 <br> `indexes: number[]` 选择的下标列表 <br> `options: PickerColumnOption[]` 选择的选项对象列表 |
| `confirm`    | 点击确认按钮时触发 | `values: (string \| number)[]` 选择的值列表 <br> `indexes: number[]` 选择的下标列表 <br> `options: PickerColumnOption[]` 选择的选项对象列表 |
| `key-escape` | 按下 ESC 时触发    | `KeyboardEvent`                                                                                                                             |
| `update:model-value` | change 后通知候选列值；不等于业务确认 | `(values: (string \| number)[])` |
| `update:open` | 动态弹层开关请求 | `(open: boolean)` |
| `open` | 动态弹层开始打开 | `()` |
| `opened` | 动态弹层打开动画完成 | `()` |
| `close` | 动态弹层开始关闭 | `()` |
| `closed` | 动态弹层关闭动画完成 | `()` |
| `click-overlay` | 动态弹层遮罩点击 | `(event: MouseEvent)` |

### PickerColumnOption Slots

| 插槽名    | 说明         | 参数 |
| --------- | ------------ | ---- |
| `title`   | 标题内容     | `-`  |
| `cancel`  | 取消按钮内容 | `-`  |
| `confirm` | 确认按钮内容 | `-`  |

### 候选、布局与服务所有权

滚轮保留本地候选：modelValue 作为外部同步入口，用户滚动或键盘选择会更新候选并通知 change、update:modelValue；父级未接受时不立即回滚。后续外部值变化会重新同步候选。confirm 和 cancel 都携带当前候选，cancel 不自动恢复初值；组件版只通知，是否关闭由外层负责。

动态调整 optionHeight、optionCount 会重新居中并停止旧滚动动画；columnsCount 调整立即更新可见列，保留仍显示的列节点、焦点和候选。布局变化不会额外通知模型或 change，也不会把未接受候选回滚到旧外部值。被移除的列节点不在焦点保留范围内。

Picker(options) 是明确的异步选择服务。服务复制配置对象并管理自己的 open、dynamic 和单例生命周期，不改写调用方对象；支持冻结配置。popupContainer 尊重显式值，省略时使用 body。open、defaultOpen、dynamic 不属于服务 Options，组件嵌入与弹层模式仍可通过组件 Props 配置。

服务返回 PickerResolvedData，state 为 confirm、cancel 或 close；confirm/cancel 时包含 values、indexes、options，close 时只有 state。通知回调不会被等待；confirm/cancel 在通知前结算并请求关闭，closed 回调异常也不跳过宿主清理。Picker.close() 只关闭当前服务单例。

工具栏 title、cancel、confirm 插槽均无作用域参数。自定义按钮可通过实例 confirm()/cancel() 发出通知；公开实例合同只承诺这两个方法，其他 setup 渲染绑定不是业务扩展接口。Picker.Component 和 _PickerComponent 是实际 SFC，默认 Picker 是可调用服务与安装入口。

```ts
import { Picker, type PickerOptions, type PickerColumnOption,
  type PickerResolvedState, type PickerResolvedData,
  type PickerProps, type PickerInstance, type PickerEmits,
  type PickerSlots, type PickerSelection } from '@maple-design/ui-vue'
```

## Types

### PickerColumnOption

| 参数            | 说明           | 类型                   | 默认值  |
| --------------- | -------------- | ---------------------- | ------- |
| `text`          | 文本           | _string \| number_     | `-`     |
| `value`         | 值             | _string \| number_     | `-`     |
| `disabled`      | 是否禁用       | _boolean_              | `false` |
| `children`      | 子列表         | _PickerColumnOption[]_ | `-`     |
| `className`     | 附加的类名     | _string_               | `-`     |
| `textClassName` | 文本附加的类名 | _string_               | `-`     |

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-picker-background` | `var(--mp-color-body)` | `background`, `background-image` |
| `--mp-picker-mask-background-image` | `linear-gradient(180deg, color-mix(in srgb, var(--mp-picker-background) 90%, transparent), color-mix(in srgb, var(--mp-picker-background) 40%, transparent)), linear-gradient(0deg, color-mix(in srgb, var(--mp-picker-background) 90%, transparent), color-mix(in srgb, var(--mp-picker-background) 40%, transparent))` | `background-image` |
| `--mp-picker-option-active-text-color` | `var(--mp-picker-option-text-color)` | `color` |
| `--mp-picker-option-check-color` | `var(--mp-sys-color-action-primary)` | `color` |
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

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-picker-background: var(--mp-color-body);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
