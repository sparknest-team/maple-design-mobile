# 表单

### 介绍

提供了对所有表单组件进行控制的能力，需要搭配 `FormItem` 组件使用。

- `FormItem` 写了 `label`：外置标签（上下 / 左右），并自动关闭 Input / Select 的浮动 placeholder。
- `FormItem` 未写 `label`：控件继续使用浮动 placeholder（`placeholder` + `hint`）。


### 表单示例

```html
<script setup>
import { reactive, ref } from 'vue'

const formData = reactive({
  username: '',
  password: '',
  email: '',
  department: '',
  gender: undefined,
  license: false,
  range: 10,
  count: 0,
  group: [],
  score: 0,
  like: [],
  files: []
})
const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)

const emailSuggestions = computed(() =>
  ['@qq.com', '@163.com', '@gmail.com'].map((suffix) => {
    const [prefix] = formData.email.split('@')
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  })
)
</script>

<template>
  <mp-form
    ref="form"
    :model="formData"
    :disabled="disabled"
    :readonly="readonly"
    scroll-to-error="start"
  >
    <mp-space direction="column" :size="[14, 0]">
      <mp-form-item field="username" :rules="v => !!v || '用户名不能为空'">
        <mp-input placeholder="请输入用户名" v-model="formData.username" />
      </mp-form-item>
      <mp-form-item
        field="password"
        :rules="[v => !!v || '密码不能为空', (v) => v.length >= 8 || '密码长度不能低于8位']"
      >
        <mp-input type="password" placeholder="请输入密码" v-model="formData.password" />
      </mp-form-item>
      <mp-form-item field="email" :rules="v => !!v || '邮箱不能为空'">
        <mp-auto-complete
          placeholder="请输入邮箱"
          :options="emailSuggestions"
          v-model="formData.email"
        />
      </mp-form-item>
      <mp-form-item field="department" :rules="v => !!v || '必须选一个部门'">
        <mp-select placeholder="请选择部门" v-model="formData.department">
          <mp-option label="吃饭部" />
          <mp-option label="睡觉部" />
          <mp-option label="打游戏部" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="group" :rules="v => v.length >= 1 || '至少选择一个组织'">
        <mp-select multiple placeholder="请选择组织" v-model="formData.group">
          <mp-option label="吃饭组" />
          <mp-option label="睡觉组" />
          <mp-option label="打游戏组" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="gender" :rules="v => !!v || '必须选择一个性别'">
        <mp-radio-group v-model="formData.gender">
          <mp-radio :checked-value="1">男</mp-radio>
          <mp-radio :checked-value="2">女</mp-radio>
        </mp-radio-group>
      </mp-form-item>
      <mp-form-item field="like" :rules="v => v.length > 0 || '至少选择一个爱好'">
        <mp-checkbox-group v-model="formData.like">
          <mp-checkbox :checked-value="1">吃饭</mp-checkbox>
          <mp-checkbox :checked-value="2">睡觉</mp-checkbox>
          <mp-checkbox :checked-value="3">打游戏</mp-checkbox>
        </mp-checkbox-group>
      </mp-form-item>
      <mp-form-item field="score" :rules="v => v >= 3 || '必须大于2'">
        <mp-rate v-model="formData.score" />
      </mp-form-item>
      <mp-form-item field="license" :rules="v => !!v || '您必须开启'">
        <mp-switch variant="md3" v-model="formData.license" />
      </mp-form-item>
      <mp-form-item field="count" :rules="v => v > 10 || '必须大于10'">
        <mp-counter v-model="formData.count" />
      </mp-form-item>
      <mp-form-item field="range" :rules="v => v > 10 || '必须大于10'">
        <mp-slider v-model="formData.range" />
      </mp-form-item>
      <mp-form-item field="files" :rules="v => v.length >= 1 || '至少上传一张图片'">
        <mp-upload v-model="formData.files" />
      </mp-form-item>

      <mp-space direction="column" :size="[14, 0]">
        <mp-button block status="danger" @click="form.resetFields()">
          清空表单
        </mp-button>
        <mp-button block status="warning" @click="form.clearValidate()">
          清空验证
        </mp-button>
        <mp-button block status="success" @click="form.validate()">
          触发验证
        </mp-button>
        <mp-button block status="info" @click="disabled = !disabled">
          表单禁用
        </mp-button>
        <mp-button block status="primary" @click="readonly = !readonly">
          表单只读
        </mp-button>
      </mp-space>
    </mp-space>
  </mp-form>
</template>
```

### 表单事件

您也可以使用表单事件去处理表单行为

```html
<script setup>
import { reactive } from 'vue'
import { Message } from '@maplejs/maple-ui'

const formData = reactive({
  username: '',
  password: '',
})

function handleSubmit(valid) {
  Message(`onSubmit: ${valid}`)
}

function handleReset() {
  Message('onReset')
}
</script>

<template>
  <mp-form :model="formData" @submit="handleSubmit" @reset="handleReset">
    <mp-space direction="column" :size="[14, 0]">
      <mp-form-item field="username" :rules="v => !!v || '用户名不能为空'">
        <mp-input placeholder="请输入用户名" v-model="formData.username" />
      </mp-form-item>
      <mp-form-item
        field="password"
        :rules="[v => !!v || '密码不能为空', (v) => v.length <= 8 || '密码长度不能低于8位']"
      >
        <mp-input type="password" placeholder="请输入密码" v-model="formData.password" />
      </mp-form-item>

      <mp-space>
        <mp-button status="primary" native-type="submit">
          提交
        </mp-button>
        <mp-button status="primary" native-type="reset">
          清空
        </mp-button>
      </mp-space>
    </mp-space>
  </mp-form>
</template>
```

### 自定义表单组件

如果希望自定义组件并接入表单组件的能力，只需要在组件内部调用 `useFormItem` 获取 `mergedError` 和 `eventHandlers`，
在组件外部使用 `FormItem` 包裹并声明 `rules`，无需关心具体的校验逻辑，案例如下。

```html
// playground-ignore
<script setup>
import { Form } from '@maplejs/maple-ui'

const props = defineProps({
  modelValue: Boolean,
  disabled: Boolean,
  readonly: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const { useForm, useFormItem } = Form
const { form } = useForm()
const { mergedError, eventHandlers } = useFormItem()

function handleClick() {
  if (props.readonly || props.disabled || form?.readonly.value || form?.disabled.value) {
    return
  }

  emit('update:modelValue', !props.modelValue)
  eventHandlers.value.onChange?.()
}
</script>

<template>
  <div
    class="mp-custom-form-component"
    :class="{
      'mp-custom-form-component--disabled': disabled || form?.disabled.value,
      'mp-custom-form-component--error': mergedError,
    }"
  >
    <div class="mp-custom-form-component__container" @click="handleClick">
      <m-icon-checkbox-marked-circle-fill v-if="modelValue" class="mp-custom-form-component__icon" />
      <m-icon-close-circle-fill v-else class="mp-custom-form-component__icon" />
      <slot />
    </div>
  </div>
</template>

<style>
.mp-custom-form-component {
  cursor: pointer;
}

.mp-custom-form-component__container {
  display: flex;
  align-items: center;
}

.mp-custom-form-component__icon {
  margin-right: 6px;
  font-size: 24px;
}

.mp-custom-form-component--disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.mp-custom-form-component--error {
  color: var(--color-danger);
}
</style>
```

使用时用 `FormItem` 包裹即可接入校验：

```html
// playground-ignore
<mp-form-item field="custom" :rules="v => !!v || '不能为空'">
  <mp-custom-form-component v-model="formData.custom">
    自定义组件
  </mp-custom-form-component>
</mp-form-item>
```

## API

### 属性

#### Form Props

| 参数 | 说明                                        | 类型 | 默认值 |
| --- |-------------------------------------------| --- | -- |
| `model` | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据 | _Record<string, any>_ | `-` |
| `layout` | 表单项布局方式，可选值为 `vertical` `horizontal`；可被 `FormItem.layout` 覆盖 | _'vertical' \| 'horizontal'_ | `'vertical'` |
| `readonly` | 是否只读                                      | _boolean_ | `false` |
| `disabled` | 是否禁用                                      | _boolean_ | `false` |
| `scroll-to-error` | 是否在校验不通过时滚动到不通过的表单项，可选值为 `start` `end` | _string_ | `-` |
| `scroll-to-error-offset-y` | 滚动到校验不通过的表单项的位置偏移量 | _number \| string_ | `0` |

### 方法

#### Form Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `validate` | 触发表单组件的校验，不传 `field` 则校验所有表单项 | `field?: string \| string[]` | `valid: Promise<boolean>` |
| `validateField` | 触发指定表单项的校验 | `field: string \| string[]` | `valid: Promise<boolean>` |
| `resetFields` | 重置表单项的值和校验信息为初始值，不传 `field` 则重置所有表单项 | `field?: string \| string[]` | `-` |
| `clearValidate` | 清空表单项的校验信息，不传 `field` 则清空所有表单项 | `field?: string \| string[]` | `-` |
| `scrollToField` | 滚动到指定的表单项 | `field: string` | `-` |

### 事件

#### Form Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `submit` | 表单提交时触发 | `valid: boolean` 是否通过表单验证 |
| `reset` | 表单清空时触发 | `-` |

### 插槽

#### Form Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 表单内容 | `-` |

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

    <mp-button block status="primary" @click="form.validate()">提交</mp-button>
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
