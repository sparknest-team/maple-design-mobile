# 复选框

### 介绍

在一组备选项中进行多选。

### 基本使用

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-checkbox v-model="value">当前的值: {{ value }}</mp-checkbox>
</template>
```

### 设置状态值

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-checkbox
    :value="1"
    v-model="value"
  >
    当前的值: {{ value }}
  </mp-checkbox>
</template>
```

### 修改图标和颜色

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-checkbox
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
  </mp-checkbox>
</template>
```

### 禁用

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-checkbox disabled v-model="value">当前的值: {{ value }}</mp-checkbox>
</template>
```

### 只读

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-checkbox readonly v-model="value">当前的值: {{ value }}</mp-checkbox>
</template>
```

### 不确定状态

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
const indeterminate = ref(true)
</script>

<template>
  <mp-space :size="[0, 10]">
    <mp-checkbox v-model="value" v-model:indeterminate="indeterminate">
      不确定状态的值: {{ value }}
    </mp-checkbox>
    <mp-button type="primary" @click="indeterminate = !indeterminate">切换</mp-button>
  </mp-space>
</template>
```

### 复选框组

在复选框组中，必须给 `checkbox` 设置 `value` 用来标识，
复选框组会收集所有选择的标识。

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
</script>

<template>
  <mp-checkbox-group ref="group" v-model="value">
    <mp-checkbox :value="0">吃饭</mp-checkbox>
    <mp-checkbox :value="1">睡觉</mp-checkbox>
  </mp-checkbox-group>
  <mp-space :size="[0, 10]">
    <mp-button
      type="primary"
      @click="$refs.group.checkAll()"
    >
      全选
    </mp-button>
    <mp-button
      type="primary"
      @click="$refs.group.inverseAll()"
    >
      反选
    </mp-button>
  </mp-space>
  <div>当前的值: {{ value }}</div>
</template>
```
### 选项式 API

通过 `options` 属性设置子元素。

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
const options = ref([
  { label: '吃饭', value: 0 },
  { label: '睡觉', value: 1 },
  { label: '游戏', value: 2, disabled: true },
])
</script>

<template>
  <mp-checkbox-group v-model="value" :options="options" />
  <div>当前的值: {{ value }}</div>
</template>
```

### 自定义字段

通过 `field-names` 属性自定义 `options` 中数据的格式。

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
const options = ref([
  { name: '吃饭', id: 0 },
  { name: '睡觉', id: 1 },
  { name: '游戏', id: 2 },
])
</script>

<template>
  <mp-checkbox-group v-model="value" :options="options"
      :field-names="{ label: 'name', value: 'id' }" />
  <div>当前的值: {{ value }}</div>
</template>
```

### 垂直布局

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
</script>

<template>
  <mp-checkbox-group v-model="value" direction="vertical">
    <mp-checkbox :value="0">吃饭</mp-checkbox>
    <mp-checkbox :value="1">睡觉</mp-checkbox>
  </mp-checkbox-group>
</template>
```

### 最大选中数量

在复选框组中，可以通过设置 `max` 属性来限制最大选中数量。

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
</script>

<template>
  <mp-checkbox-group v-model="value" :max="1">
    <mp-checkbox :value="0">吃饭</mp-checkbox>
    <mp-checkbox :value="1">睡觉</mp-checkbox>
  </mp-checkbox-group>
</template>
```

> 复选框及复选框组的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

## API

### 属性

#### CheckboxGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 绑定的值 | _any[]_ | `[]` |
| `max` | 最大选择的数量 | _string \| number_ | `-` |
| `direction` | 布局方向，可选值为 `horizontal` `vertical` | _string_ | `horizontal` |
| `options` ***3.2.11*** | 指定可选项 | _CheckboxGroupOption[]_ | `[]` |
| `field-names` | 自定义 `options` 字段映射 | _{ label?, value?, children?, disabled? }_ | `-` |

#### CheckboxGroupOption 

| 参数 | 说明 | 类型             | 默认值       |
| ------- | --- |----------------|-----------|
| `label`    |    选项的标签    | _string \| VNode \| (option: CheckboxGroupOption, checked: boolean) => VNodeChild_      | `-`   |
| `value`  |    选项的值    | _any_      | `-`   |
| `disabled`    |    是否禁用   | _boolean_      | `-`   |

#### Checkbox Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 绑定的值 | _any_ | `false` |
| `value` | 选项值 | _any_ | `true` |
| `checked-color` | 选中状态的颜色 | _string_ | `-` |
| `unchecked-color` | 未选中状态的颜色 | _string_ | `-` |
| `icon-size` | 图标尺寸 | _string \| number_ | `-` |
| `disabled` | 是否禁用 | _boolean_ | `false` |
| `readonly` | 是否只读 | _boolean_ | `false` |
| `indeterminate` | 是否为不确定状态（样式优先级最高） | _boolean_ | `false` |
| `ripple` | 是否开启水波纹 | _boolean_ | `true` |

### 方法

#### CheckboxGroup Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `checkAll` | 全选 | `-` | `value: any[]` |
| `inverseAll` | 反选 | `-` | `value: any[]` |

#### Checkbox Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `toggle` | 切换选中状态，传 `value` 为选中， `false` 为取消选中，不传或其他情况为取反 | `value?: any` | `-` |

### 事件

#### CheckboxGroup Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `change` | 变更时触发 | `value: any[]` |

#### Checkbox Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `e: Event` |
| `change` | 状态变更时触发 | `value: any` |

### 插槽

#### CheckboxGroup Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 复选框组的内容 | `-` |

#### Checkbox Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `checked-icon` | 选中图标 | `-` |
| `unchecked-icon` | 未选中图标 | `-` |
| `indeterminate-icon` | 不确定状态图标 | `-` |
| `default` | 显示的文本 | `checked: boolean` 是否选中 |

### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--checkbox-checked-color` | `var(--color-primary)` |
| `--checkbox-unchecked-color` | `#555` |
| `--checkbox-disabled-color` | `var(--color-text-disabled)` |
| `--checkbox-error-color` | `var(--color-danger)` |
| `--checkbox-action-padding` | `6px` |
| `--checkbox-text-color` | `#555` |
| `--checkbox-icon-size` | `24px` |
