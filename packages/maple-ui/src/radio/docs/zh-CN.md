# 单选框

### 介绍

在一组备选项中进行单选。

### 基本使用

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-radio v-model="value">当前的值: {{ value }}</mp-radio>
</template>
```

### 设置状态值

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-radio
    :value="1"
    v-model="value"
  >
    当前的值: {{ value }}
  </mp-radio>
</template>
```

### 修改图标和颜色

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-radio
    unchecked-color="var(--color-warning)" 
    checked-color="var(--color-danger)"
    v-model="value"
  >
    <template #unchecked-icon>
      <m-icon-heart-half-full size="24px"/>
    </template>
    <template #checked-icon>
      <m-icon-heart size="24px"/>
    </template>
    <template #default>
      当前的值: {{ value }}
    </template>
  </mp-radio>
</template>
```

### 禁用

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-radio disabled v-model="value">当前的值: {{ value }}</mp-radio>
</template>
```

### 只读

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-radio readonly v-model="value">当前的值: {{ value }}</mp-radio>
</template>
```

### 单选框组

在单选框组中，需要给 `radio` 设置 `value` 用来标识，
单选框组会绑定选择的标识。

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-radio-group v-model="value">
    <mp-radio :value="0">吃饭</mp-radio>
    <mp-radio :value="1">睡觉</mp-radio>
  </mp-radio-group>
</template>
```

### 选项式 API

通过 `options` 属性设置子元素。

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
const options = ref([
  { label: '吃饭', value: 0 },
  { label: '睡觉', value: 1 },
  { label: '游戏', value: 2, disabled: true },
])
</script>

<template>
  <mp-radio-group v-model="value" :options="options" />
  <div>当前的值: {{ value }}</div>
</template>
```

### 自定义字段

通过 `field-names` 属性自定义 `options` 中数据的格式。

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
const options = ref([
  { name: '吃饭', id: 0 },
  { name: '睡觉', id: 1 },
  { name: '游戏', id: 2 },
])
</script>

<template>
  <mp-radio-group v-model="value" :options="options"
      :field-names="{ label: 'name', value: 'id' }" />
  <div>当前的值: {{ value }}</div>
</template>
```

### 垂直布局

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-radio-group v-model="value" direction="vertical">
    <mp-radio :value="0">吃饭</mp-radio>
    <mp-radio :value="1">睡觉</mp-radio>
  </mp-radio-group>
</template>
```

> 单选框及单选框组的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

## API

### 属性

#### RadioGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 绑定的值 | _any_ | `-` |
| `direction` | 布局方向，可选值为 `horizontal` `vertical` | _string_ | `horizontal` |
| `options` ***3.2.14*** | 指定可选项 | _RadioGroupOption[]_ | `[]` |
| `field-names` | 自定义 `options` 字段映射 | _{ label?, value?, children?, disabled? }_ | `-` |
| `aria-label` ***3.8.5*** | 单选框组的标签 | _string_ | `-` |

#### RadioGroupOption

| 参数 | 说明 | 类型             | 默认值       |
| ------- | --- |----------------|-----------|
| `label`    |    选项的标签    | _string \| VNode \| (option: RadioGroupOption, checked: boolean) => VNodeChild_      | `-`   |
| `value`  |    选项的值    | _any_      | `-`   |
| `disabled`    |    是否禁用   | _boolean_      | `-`   |

#### Radio Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 绑定的值 | _any_ | `false` |
| `value` | 选项值 | _any_ | `true` |
| `checked-color` | 选中状态的颜色 | _string_ | `-` |
| `unchecked-color` | 未选中状态的颜色 | _string_ | `-` |
| `icon-size` | 图标尺寸 | _string \| number_ | `-` |
| `disabled` | 是否禁用 | _boolean_ | `false` |
| `readonly` | 是否只读 | _boolean_ | `false` |
| `ripple` | 是否开启水波纹 | _boolean_ | `true` |

### 方法

#### Radio Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `toggle` | 切换选中状态，传 `value` 为选中，`false` 为取消选中，不传或其他情况为取反 | `value: any` | `-` |

### 事件

#### RadioGroup Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `change` | 变更时触发 | `value: any` |

#### Radio Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `e: Event` |
| `change` | 状态变更时触发 | `value: any` |

### 插槽

#### RadioGroup Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 单选框组的内容 | `-` |

#### Radio Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `checked-icon` | 选中图标 | `-` |
| `unchecked-icon` | 未选中图标 | `-` |
| `default` | 显示的文本 | `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### Radio Variables

| 变量名 | 默认值 |
| --- | --- |
| `--radio-checked-color` | `var(--color-primary)` |
| `--radio-unchecked-color` | `#555` |
| `--radio-disabled-color` | `var(--color-text-disabled)` |
| `--radio-error-color` | `var(color-danger)` |
| `--radio-action-padding` | `6px` |
| `--radio-icon-size` | `24px` |
| `--radio-text-color` | `#555` |

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 绑定的值 | _any_ | `false` |
| `value` | 选项值 | _any_ | `true` |
| `checked-color` | 选中状态的颜色 | _string_ | `-` |
| `unchecked-color` | 未选中状态的颜色 | _string_ | `-` |
| `icon-size` | 图标尺寸 | _string \| number_ | `-` |
| `disabled` | 是否禁用 | _boolean_ | `false` |
| `readonly` | 是否只读 | _boolean_ | `false` |
| `ripple` | 是否开启水波纹 | _boolean_ | `true` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `e: Event` |
| `change` | 状态变更时触发 | `value: any` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `checked-icon` | 选中图标 | `-` |
| `unchecked-icon` | 未选中图标 | `-` |
| `default` | 显示的文本 | `checked: boolean` 是否选中 |
