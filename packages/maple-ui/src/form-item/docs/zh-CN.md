# 表单项

### 介绍

表单项组件，负责渲染标签、校验规则和错误信息。需与 `Form`、表单控件配合使用。

- 传入 `label`：外置标签布局，Input / Select 会自动关闭浮动 `hint`。
- 不传 `label`：不渲染外置标签，控件继续使用浮动 placeholder。

### 外置标签（推荐与 Cedar 对齐）

```html
<script setup>
import { reactive, ref } from 'vue'

const form = ref(null)
const formData = reactive({
  username: '',
  password: '',
})
</script>

<template>
  <mp-form ref="form" :model="formData" layout="vertical">
    <mp-form-item
      field="username"
      label="用户名"
      required
      :rules="[(v) => !!v || '用户名不能为空']"
      :validate-trigger="['input', 'change']"
    >
      <mp-input v-model="formData.username" placeholder="请输入" />
    </mp-form-item>

    <mp-form-item
      field="password"
      label="密码"
      :rules="[
        (v) => !!v || '密码不能为空',
        (v) => (v && v.length >= 8) || '密码长度不能低于8位',
      ]"
    >
      <mp-input v-model="formData.password" type="password" placeholder="请输入" />
    </mp-form-item>

    <mp-button block type="primary" @click="form.validate()">提交</mp-button>
  </mp-form>
</template>
```

### 左右布局

```html
<mp-form :model="formData" layout="horizontal">
  <mp-form-item field="username" label="用户名" required>
    <mp-input v-model="formData.username" placeholder="请输入" />
  </mp-form-item>
</mp-form>
```

也可在单个 `FormItem` 上覆盖：`layout="horizontal"`。

### 浮动 Placeholder（不写 label）

不传 `label` 时不渲染外置标签，Input 继续使用浮动 placeholder（`hint` 默认开启）。

```html
<script setup>
import { reactive, ref } from 'vue'

const form = ref(null)
const formData = reactive({
  username: '',
  password: '',
})
</script>

<template>
  <mp-form ref="form" :model="formData" layout="vertical">
    <mp-form-item
      field="username"
      required
      :rules="[(v) => !!v || '用户名不能为空']"
      :validate-trigger="['input', 'change']"
    >
      <mp-input v-model="formData.username" placeholder="用户名" />
    </mp-form-item>

    <mp-form-item
      field="password"
      :rules="[
        (v) => !!v || '密码不能为空',
        (v) => (v && v.length >= 8) || '密码长度不能低于8位',
      ]"
    >
      <mp-input v-model="formData.password" type="password" placeholder="密码" />
    </mp-form-item>
  </mp-form>
</template>
```

### 帮助与额外信息

```html
<mp-form-item field="email" label="邮箱" help="用于接收通知" extra="选填">
  <mp-input v-model="formData.email" placeholder="请输入" />
</mp-form-item>
```

### 自定义表单控件

自定义控件可通过 `FormItem.useFormItem`（或 `Form.useFormItem`）获取错误态与校验触发器：

```html
<script setup>
import { FormItem } from '@maplejs/maple-ui'

const { mergedError, eventHandlers } = FormItem.useFormItem()

function handleChange(value) {
  // 更新 v-model 后触发校验
  eventHandlers.value.onChange?.()
}
</script>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `field` | 对应 `Form.model` 中的字段路径，支持 `a.b` | _string_ | `''` |
| `label` | 标签文本；有值时渲染外置标签，并自动关闭控件浮动 hint | _string_ | `-` |
| `layout` | 布局方式，可选值为 `vertical` `horizontal`；未传时继承 `Form.layout` | _'vertical' \| 'horizontal'_ | `-` |
| `required` | 是否必填（显示星号，并自动追加必填规则） | _boolean_ | `false` |
| `hide-label` | 是否隐藏标签 | _boolean_ | `false` |
| `hide-asterisk` | 是否隐藏必填星号 | _boolean_ | `false` |
| `asterisk-position` | 星号位置 | _'start' \| 'end'_ | `'start'` |
| `help` | 帮助文案（无错误时展示） | _string_ | `-` |
| `extra` | 额外文案 | _string_ | `-` |
| `disabled` | 是否禁用 | _boolean_ | `false` |
| `no-style` | 去除标签与错误信息样式，仅保留校验能力 | _boolean_ | `false` |
| `rules` | 校验规则（函数 / Zod / 数组） | _any_ | `-` |
| `validate-trigger` | 触发校验的时机 | _FormItemValidateTrigger \| FormItemValidateTrigger[]_ | `'change'` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `validate` | 校验完成时触发 | `valid: boolean` |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 表单控件 |
| `label` | 自定义标签 |
| `help` | 自定义帮助信息 |
| `extra` | 自定义额外信息 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `validate` | 触发校验 | `-` | `Promise<boolean>` |
| `clearValidate` | 清空校验状态 | `-` | `-` |
| `resetField` | 重置字段值到初始值并清空校验 | `-` | `-` |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-form-item-label-width` | `88px`（`horizontal` 布局下标签宽度） |
| `--mp-form-item-label-gap` | `12px` |

### 类型定义

```ts
type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'
type FormItemLayout = 'vertical' | 'horizontal'
```
