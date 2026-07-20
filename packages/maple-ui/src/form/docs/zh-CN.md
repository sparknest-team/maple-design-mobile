# 表单

### 介绍

提供了对所有表单组件进行控制的能力。


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
    :disabled="disabled"
    :readonly="readonly" 
    scroll-to-error="start"
  >
    <mp-space direction="column" :size="[14, 0]">
      <mp-input
        placeholder="请输入用户名"
        :rules="v => !!v || '用户名不能为空'"
        v-model="formData.username"
      />
      <mp-input
        type="password"
        placeholder="请输入密码"
        :rules="[v => !!v || '密码不能为空', (v) => v.length >= 8 || '密码长度不能低于8位']"
        v-model="formData.password"
      />
      <mp-auto-complete
        placeholder="请输入邮箱"
        :rules="v => !!v || '邮箱不能为空'"
        :options="emailSuggestions"
        v-model="formData.email"
      />
      <mp-select
        placeholder="请选择部门"
        :rules="v => !!v || '必须选一个部门'"
        v-model="formData.department"
      >
        <mp-option label="吃饭部"  />
        <mp-option label="睡觉部"  />
        <mp-option label="打游戏部" />
      </mp-select>
      <mp-select
        multiple
        placeholder="请选择组织"
        :rules="v => v.length >= 1 || '至少选择一个组织'"
        v-model="formData.group"
      >
        <mp-option label="吃饭组"  />
        <mp-option label="睡觉组"  />
        <mp-option label="打游戏组" />
      </mp-select>
      <mp-radio-group
        :rules="v => !!v || '必须选择一个性别'"
        v-model="formData.gender"
      >
        <mp-radio :checked-value="1">男</mp-radio>
        <mp-radio :checked-value="2">女</mp-radio>
      </mp-radio-group>
      <mp-checkbox-group
        :rules="v => v.length > 0 || '至少选择一个爱好'"
        v-model="formData.like"
      >
        <mp-checkbox :checked-value="1">吃饭</mp-checkbox>
        <mp-checkbox :checked-value="2">睡觉</mp-checkbox>
        <mp-checkbox :checked-value="3">打游戏</mp-checkbox>
      </mp-checkbox-group>
      <mp-rate
        :rules="v => v >= 3 || '必须大于2'"
        v-model="formData.score"
      />
      <mp-switch
        variant
        :rules="v => !!v || '您必须开启'"
        v-model="formData.license"
      />
      <mp-counter
        :rules="v => v > 10 || '必须大于10'"
        v-model="formData.count"
      />
      <mp-slider
        :rules="v => v > 10 || '必须大于10'"
        v-model="formData.range"
      />
      <mp-uploader
        :rules="v => v.length >= 1 || '至少上传一张图片'"
        v-model="formData.files"
      />

      <mp-space direction="column" :size="[14, 0]">
        <mp-button block type="danger" @click="form.reset()">
          清空表单
        </mp-button>
        <mp-button block type="warning" @click="form.resetValidation()">
          清空验证
        </mp-button>
        <mp-button block type="success" @click="form.validate()">
          触发验证
        </mp-button>
        <mp-button block type="info" @click="disabled = !disabled">
          表单禁用
        </mp-button>
        <mp-button block type="primary" @click="readonly = !readonly">
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
  <mp-form @submit="handleSubmit" @reset="handleReset">
    <mp-space direction="column" :size="[14, 0]">
      <mp-input
        placeholder="请输入用户名"
        :rules="v => !!v || '用户名不能为空'"
        v-model="formData.username"
      />
      <mp-input
        type="password"
        placeholder="请输入密码"
        :rules="[v => !!v || '密码不能为空', (v) => v.length <= 8 || '密码长度不能低于8位']"
        v-model="formData.password"
      />

      <mp-space>
        <mp-button type="primary" native-type="submit">
          提交
        </mp-button>
        <mp-button type="primary" native-type="reset">
          清空
        </mp-button>
      </mp-space>
    </mp-space>
  </mp-form>
</template>
```

### 自定义表单组件

如果希望自定义组件并接入表单组件的能力，案例如下。

```html
// playground-ignore
<script setup>
import { Form } from '@maplejs/maple-ui'
import { nextTick } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  rules: {
    type: Array
  },
  validateTrigger: {
    type: Array,
    default: () => ['onToggle']
  },
  extraMessage: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])

const { useForm, useValidation } = Form
const { errorMessage, validateWithTrigger: _validateWithTrigger, validate: _validate, resetValidation } = useValidation()
const { bindForm, form } = useForm()

const validate = () => _validate(props.rules, props.modelValue)

function reset() {
  emit('update:modelValue', false)
  resetValidation()
}

function validateWithTrigger(trigger) {
  nextTick(() => {
    const { validateTrigger, rules, modelValue } = props
    _validateWithTrigger(validateTrigger, trigger, rules, modelValue)
  })
}

function handleClick() {
  if (
    props.readonly ||
    props.disabled || 
    form?.readonly.value || 
    form?.disabled.value
  ) {
    return
  }

  emit('update:modelValue', !props.modelValue)
  validateWithTrigger('onToggle')
}

const apis = {
  reset,
  validate,
  resetValidation
}

defineExpose(apis)
bindForm?.(apis)
</script>

<template>
  <div
    class="mp-custom-form-component"
    :class="{
      'mp-custom-form-component--disabled': disabled || form?.disabled.value,
      'mp-custom-form-component--error': errorMessage,
    }"
  >
    <div class="mp-custom-form-component__container"  @click="handleClick">
      <mp-icon
        class="mp-custom-form-component__icon"
        :name="modelValue ? 'checkbox-marked-circle' : 'close-circle'"
        :transition="250"
      />
      <slot />
    </div>
    <mp-form-details :error-message="errorMessage" :extra-message="extraMessage" />
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

## API

### 属性

#### Form Props

| 参数 | 说明                                        | 类型 | 默认值 |
| --- |-------------------------------------------| --- | -- |
| `readonly` | 是否只读                                      | _boolean_ | `false` |
| `disabled` | 是否禁用                                      | _boolean_ | `false` |
| `scroll-to-error` | 是否在校验不通过时滚动到不通过的表单项，可选值为 `start` `end` | _string_ | `-` |
| `scroll-to-error-offset-y` | 滚动到校验不通过的表单项的位置偏移量 | _number \| string_ | `0` |

#### FormDetails Props

| 参数              | 说明      | 类型 | 默认值 |
|-----------------|---------| --- | -- |
| `error-message` | 错误信息 | _string_ | `-` |
| `extra-message` | 附加信息 | _string_ | `-` |

### 方法

#### Form Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `validate` | 触发所有表单组件的校验 | `-` | `valid: Promise<boolean>` |
| `resetValidation` | 清空所有表单组件的校验信息 | `-` | `-` |
| `reset` | 清空所有表单组件绑定的值和校验信息 | `-` | `-` |

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

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### FormDetails Variables

| 变量名                                   | 默认值 |
|---------------------------------------| --- |
| `--form-details-error-message-color`  | `var(--color-danger)` |
| `--form-details-extra-message-color`  | `#888` |
| `--form-details-margin-top`           | `6px` |
| `--form-details-font-size`            | `12px` |
| `--form-details-message-margin-right` | `4px` |
