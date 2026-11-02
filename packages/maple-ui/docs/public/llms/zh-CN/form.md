<!-- Source: src/form/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/form -->

# 表单

## 案例

### Inline／Popup 已选区域对照

Example source: src/form/example/demos/selection-summary.vue

```vue
<script setup>
import { computed, reactive, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const language = ref('zh-CN')
watchLang((value) => {
  language.value = value
})
const english = computed(() => language.value === 'en-US')
const values = reactive({ inlineSelect: ['a'], popupSelect: ['a'], inlineCascader: ['a'], popupCascader: ['a'] })
const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]
</script>

<template>
  <div class="selection-summary-demo">
    <p>
      {{
        english
          ? 'Inline menus contain options only. The field owns tags and clearing. Popup editors retain the selected-items summary and clear action.'
          : 'inline 下拉只显示选项，已选标签与清空留在输入框；popup 编辑面板保留已选与清空，确认后提交。'
      }}
    </p>
    <mp-form :model="values">
      <mp-form-item label="Select · inline" field="inlineSelect">
        <mp-select
          v-model="values.inlineSelect"
          presentation="inline"
          multiple
          clearable
          :options="options"
          aria-label="Select inline summary demo"
        />
      </mp-form-item>
      <mp-form-item label="Select · popup" field="popupSelect">
        <mp-select
          v-model="values.popupSelect"
          presentation="popup"
          multiple
          clearable
          :options="options"
          aria-label="Select popup summary demo"
        />
      </mp-form-item>
      <mp-form-item label="Cascader · inline" field="inlineCascader">
        <mp-cascader
          v-model="values.inlineCascader"
          presentation="inline"
          multiple
          clearable
          :options="options"
          aria-label="Cascader inline summary demo"
        />
      </mp-form-item>
      <mp-form-item label="Cascader · popup" field="popupCascader">
        <mp-cascader
          v-model="values.popupCascader"
          presentation="popup"
          multiple
          clearable
          :options="options"
          aria-label="Cascader popup summary demo"
        />
      </mp-form-item>
    </mp-form>
  </div>
</template>
```


### 介绍

提供了对所有表单组件进行控制的能力，需要搭配 `FormItem` 组件使用。

- `FormItem` 写了 `label`：外置标签（上下 / 左右），并自动关闭 Input / Select 的浮动 placeholder。
- `FormItem` 未写 `label`：控件继续使用浮动 placeholder（`placeholder` + `hint`）。

### 基础表单

Example source: src/form/example/demos/example.vue

```vue
<script setup>
import { computed, reactive, ref } from 'vue'
import { onThemeChange } from '@maple-design/cli/client'

const formData = reactive({
  username: '',
  password: '',
  email: '',
  department: '',
  gender: undefined,
  license: false,
  range: 0,
  count: 0,
  group: [],
  score: 0,
  like: [],
  files: [],
})
const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)
const suggestions = computed(() =>
  ['@qq.com', '@163.com', '@gmail.com'].map((suffix) => {
    const [prefix] = formData.email.split('@')
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  }),
)
onThemeChange()
</script>

<template>
  <mp-form
    ref="form"
    :model="formData"
    :disabled="disabled"
    :readonly="readonly"
    scroll-to-error="start"
    scroll-to-error-offset-y="14.4vmin"
  >
    <mp-space direction="column" :size="['4vmin', 0]">
      <mp-form-item field="username" :rules="[(v) => !!v || '用户名不能为空']">
        <mp-input v-model="formData.username" placeholder="请输入用户名" />
      </mp-form-item>
      <mp-form-item
        field="password"
        :rules="[(v) => !!v || '密码不能为空', (v) => v.length >= 8 || '密码长度不能低于8位']"
      >
        <mp-input v-model="formData.password" type="password" placeholder="请输入密码" />
      </mp-form-item>
      <mp-form-item field="email" :rules="[(v) => !!v || '邮箱不能为空']">
        <mp-auto-complete v-model="formData.email" placeholder="请输入邮箱" :options="suggestions" />
      </mp-form-item>
      <mp-form-item field="department" :rules="[(v) => !!v || '必须选一个部门']">
        <mp-select v-model="formData.department" placeholder="请选择部门">
          <mp-option :label="`${'吃饭'}${'部'}`" />
          <mp-option :label="`${'睡觉'}${'部'}`" />
          <mp-option :label="`${'打游戏'}${'部'}`" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="group" :rules="[(v) => v.length >= 1 || '至少选择一个组织']">
        <mp-select v-model="formData.group" multiple placeholder="请选择组织">
          <mp-option :label="`${'吃饭'}${'组'}`" />
          <mp-option :label="`${'睡觉'}${'组'}`" />
          <mp-option :label="`${'打游戏'}${'组'}`" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="gender" :rules="[(v) => !!v || '必须选择一个性别']">
        <mp-radio-group v-model="formData.gender">
          <mp-radio :checked-value="1">男</mp-radio>
          <mp-radio :checked-value="2">女</mp-radio>
        </mp-radio-group>
      </mp-form-item>
      <mp-form-item field="like" :rules="[(v) => v.length > 0 || '至少选择一个爱好']">
        <mp-checkbox-group v-model="formData.like">
          <mp-checkbox :checked-value="1">吃饭</mp-checkbox>
          <mp-checkbox :checked-value="2">睡觉</mp-checkbox>
          <mp-checkbox :checked-value="3">打游戏</mp-checkbox>
        </mp-checkbox-group>
      </mp-form-item>
      <mp-form-item field="score" :rules="[(v) => v >= 3 || '必须大于2']">
        <mp-rate v-model="formData.score" />
      </mp-form-item>
      <mp-form-item field="license" :rules="[(v) => !!v || '您必须开启']">
        <mp-switch v-model="formData.license" variant="tonal" />
      </mp-form-item>
      <mp-form-item field="count" :rules="[(v) => v > 10 || '必须大于10']">
        <mp-input-number v-model="formData.count" mode="button" presentation="inline" aria-label="数量" />
      </mp-form-item>
      <mp-form-item field="range" :rules="[(v) => v > 10 || '必须大于10']">
        <mp-slider v-model="formData.range" />
      </mp-form-item>
      <mp-form-item field="files" :rules="[(v) => v.length >= 1 || '至少上传一张图片']">
        <mp-upload v-model="formData.files" />
      </mp-form-item>
    </mp-space>
  </mp-form>
</template>
```

### 表单控制

通过 Form 实例重置字段、清空校验、主动校验，并统一切换禁用或只读状态。

Example source: src/form/example/demos/controller.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const formData = reactive({ username: '' })
const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)
</script>

<template>
  <mp-form ref="form" :model="formData" :disabled="disabled" :readonly="readonly">
    <mp-form-item field="username" :rules="[(value) => !!value || '用户名不能为空']">
      <mp-input v-model="formData.username" placeholder="请输入用户名" />
    </mp-form-item>
  </mp-form>

  <mp-space direction="column" :size="['4vmin', 0]">
    <mp-button block status="danger" @click="form?.resetFields()">清空表单</mp-button>
    <mp-button block status="warning" @click="form?.clearValidate()">清空验证</mp-button>
    <mp-button block status="success" @click="form?.validate()">触发验证</mp-button>
    <mp-button block status="info" @click="disabled = !disabled">表单禁用</mp-button>
    <mp-button block status="primary" @click="readonly = !readonly">表单只读</mp-button>
  </mp-space>
</template>
```

### 表单事件

Button 使用 `html-type="submit"` / `html-type="reset"` 触发原生表单事件。示例同时展示校验结果和当前模型；重置恢复初始值并清除错误。

通过 `submit` 与 `reset` 事件处理原生表单提交和重置行为。

Example source: src/form/example/demos/events.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { Message } from '@maple-design/ui'
import ModelOutput from '../components/ModelOutput.vue'

const formData = reactive({ username: '', password: '' })
const result = ref('尚未提交')

function handleSubmit({ errors }) {
  result.value = errors ? '未通过' : '通过'
  Message(`提交结果：${errors ? '未通过' : '通过'}`)
}

function handleReset() {
  result.value = '已重置'
  Message('表单已重置')
}
</script>

<template>
  <mp-form presentation="inline" :model="formData" @submit="handleSubmit" @reset="handleReset">
    <mp-space direction="column" :size="[14, 0]">
      <mp-form-item field="username" :rules="[(value) => !!value || '用户名不能为空']">
        <mp-input v-model="formData.username" presentation="inline" placeholder="请输入用户名" />
      </mp-form-item>
      <mp-form-item field="password" :rules="[(value) => !!value || '密码不能为空']">
        <mp-input v-model="formData.password" presentation="inline" type="password" placeholder="请输入密码" />
      </mp-form-item>
      <mp-space>
        <mp-button status="primary" html-type="submit">提交</mp-button>
        <mp-button html-type="reset">重置</mp-button>
      </mp-space>
    </mp-space>
  </mp-form>
  <p role="status">提交结果：{{ result }}</p>
  <ModelOutput>{{ formData }}</ModelOutput>
</template>
```

### 清空时校验

`validate-trigger="clear"` 只在用户点击控件的清空按钮时校验；普通输入不会触发。清空后重新输入不会自动清除错误，可主动校验或重置表单。

Example source: src/form/example/demos/clear-trigger.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const model = reactive({ keyword: 'Maple' })
const formRef = ref(null)
</script>

<template>
  <mp-form ref="formRef" :model="model">
    <mp-form-item
      field="keyword"
      label="关键词"
      :rules="[(value) => !!value || '请输入关键词']"
      validate-trigger="clear"
    >
      <mp-input v-model="model.keyword" clearable placeholder="清空后立即校验" />
    </mp-form-item>
    <mp-button @click="formRef?.resetFields()">重置</mp-button>
  </mp-form>
</template>
```

### 响应式标签栅格

horizontal 默认标签占 5/24、内容占 19/24；Cedar 默认 horizontal，Maple 默认 vertical。只有横向布局使用栅格比例和自动宽度，响应式参数按视口断点生效。FormItem 显式覆盖 Form，Col/style 对象整项替换。label-col-flex 优先于 auto-label-width：带单位字符串表示宽度，数字表示 Col 伸缩比例，并非 px；内容填满剩余空间。隐藏标签后内容占满。自动宽度随标签变化、字段移除更新，各表单独立计算。窄屏长标签可用 vertical 或固定宽度。

Example source: src/form/example/demos/label-columns.vue

```vue
<script setup>
import { reactive } from 'vue'

const model = reactive({ name: '', department: '' })
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>响应式 6/24 标签列；视口小于 576px 时每列独占一行。</p>
    <mp-form
      :model="model"
      layout="horizontal"
      label-align="left"
      :label-col-props="{ span: 6, xs: 24, sm: 6 }"
      :wrapper-col-props="{ span: 18, xs: 24, sm: 18 }"
    >
      <mp-form-item field="name" label="姓名"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="department" label="部门"><mp-input v-model="model.department" /></mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

### 固定标签宽度

Example source: src/form/example/demos/fixed-label-width.vue

```vue
<script setup>
import { reactive } from 'vue'

const model = reactive({ name: '', contact: '' })
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>固定标签宽度 6rem；其中一项覆盖为 8rem。数字 flex 表示伸缩比例。</p>
    <mp-form :model="model" layout="horizontal" label-col-flex="6rem" label-align="left">
      <mp-form-item field="name" label="姓名"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="contact" label="联系方式" label-col-flex="8rem">
        <mp-input v-model="model.contact" />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

### 自动标签宽度

Example source: src/form/example/demos/auto-label-width.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const model = reactive({ name: '', department: '', contact: '' })
const showExtra = ref(true)
const label = ref('联系方式')
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>自动对齐最长的可见标签。试着修改标签或移除额外字段。</p>
    <mp-checkbox v-model="showExtra">显示额外字段</mp-checkbox>
    <label>修改最长标签 <mp-input v-model="label" /></label>
    <mp-form :model="model" layout="horizontal" auto-label-width label-align="left">
      <mp-form-item field="name" label="姓名"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="department" label="部门"><mp-input v-model="model.department" /></mp-form-item>
      <mp-form-item v-if="showExtra" field="contact" :label="label">
        <mp-input v-model="model.contact" />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

### 跨字段校验与原生提交

“暂停跨字段校验”将确认规则挂起到“返回跨字段结果”，返回时比较本次确认值与当前源代码（不是远端接口或提交开始时的源快照）。匹配值提交后等待中修改源代码，会返回依赖错误；修正确认值并Enter重试后通过。等待中原生重置会结清本地任务、清空模型与提交快照、保留历史计数，不产生迟到提交；停用/卸载也清理等待。不代表异步循环依赖或多请求顺序均已覆盖。

未暂停时确认规则立即比较当前源代码。先匹配通过，再修改源代码，主动只校验确认值或重新提交会显示依赖错误；改正确认值后可按 Enter 或提交按钮提交。原生重置清空模型、反馈和上次提交值，提交次数累计不清零。依赖由业务主动复验，单纯编辑不保证已有成功态仍有效；本地示例不等于任意异步提交竞争或外部持久化。

Example source: src/form/example/demos/cross-field.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const formRef = ref()
const id = useId()
const model = reactive({ source: '', confirmation: '' })
const result = ref('尚未提交')
const submissions = ref(0)
const snapshot = ref('')
const message = '两次代码须相同且不能为空'
const sourceRules = [(value) => !!value || '请输入源代码']
const paused = ref(false)
const pending = shallowRef([])
let epoch = 0
function complete() {
  const [resolve, ...rest] = pending.value
  pending.value = rest
  resolve?.()
}
function cleanup() {
  epoch++
  const tasks = pending.value
  pending.value = []
  tasks.forEach((resolve) => resolve())
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
const confirmationRules = [
  async (value) => {
    if (paused.value) {
      await new Promise((resolve) => {
        pending.value = [...pending.value, resolve]
      })
    }
    return (!!value && value === model.source) || message
  },
]
function submitted({ errors, values }) {
  submissions.value++
  result.value = errors ? '未通过' : '通过'
  snapshot.value = JSON.stringify(values)
}
async function validateConfirmation() {
  const current = ++epoch
  const errors = await formRef.value?.validateField('confirmation')
  if (current === epoch) {
    result.value = errors ? '确认值未通过' : '确认值通过'
  }
}
function reset() {
  cleanup()
  result.value = '已重置'
  snapshot.value = ''
}
</script>

<template>
  <section class="cross-field-form-demo">
    <p>仅使用本地合成代码。校验时确认值比较当前源代码；修改源代码不自动复验依赖字段。</p>
    <mp-form ref="formRef" presentation="inline" :model="model" @submit="submitted" @reset="reset">
      <mp-form-item
        field="source"
        label="源代码"
        :label-attrs="{ for: id + '-source' }"
        :rules="sourceRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-source'" v-model="model.source" presentation="inline" />
      </mp-form-item>
      <mp-form-item
        field="confirmation"
        label="确认代码"
        :label-attrs="{ for: id + '-confirmation' }"
        :rules="confirmationRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-confirmation'" v-model="model.confirmation" presentation="inline" />
      </mp-form-item>
      <mp-space wrap>
        <mp-button html-type="submit">提交代码</mp-button>
        <mp-button @click="validateConfirmation">只校验确认值</mp-button>
        <mp-button html-type="reset">重置代码</mp-button>
      </mp-space>
    </mp-form>
    <p role="status">结果：{{ result }}；提交次数：{{ submissions }}</p>
    <mp-button html-type="button" :aria-pressed="paused" @click="paused = !paused">暂停跨字段校验</mp-button>
    <mp-button html-type="button" :disabled="!pending.length" @click="complete">返回跨字段结果</mp-button>
    <p class="cross-field-pending">等待：{{ pending.length }}</p>
    <ModelOutput>模型：{{ model }}</ModelOutput>
    <ModelOutput>上次提交值：{{ snapshot || '-' }}</ModelOutput>
  </section>
</template>
```

### 文本与数值字段

Example source: src/form/example/demos/field-components.vue

```vue
<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('popup')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  name: '表单输入示例',
  notes: '每个字段都继承上方的展示与触发方式',
  count: 3,
  code: '123456',
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="name" label="单行文本"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="notes" label="多行文本"><mp-textarea v-model="model.notes" /></mp-form-item>
      <mp-form-item field="count" label="数量"
        ><mp-input-number v-model="model.count" :min="0" :max="100"
      /></mp-form-item>
      <mp-form-item field="code" label="验证码"><mp-verification-code v-model="model.code" :length="6" /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
```

### 开关与勾选字段

Example source: src/form/example/demos/field-choice.vue

```vue
<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('popup')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const choices = [
  { label: '研发', value: 'dev' },
  { label: '设计', value: 'design' },
  { label: '运营', value: 'ops' },
]
const model = ref({
  enabled: true,
  agreed: true,
  teams: ['dev', 'design'],
  role: 'dev',
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="enabled" label="启用"><mp-switch v-model="model.enabled" /></mp-form-item>
      <mp-form-item field="agreed" label="确认状态"
        ><mp-checkbox v-model="model.agreed">已阅读说明</mp-checkbox></mp-form-item
      >
      <mp-form-item field="teams" label="协作部门"
        ><mp-checkbox-group v-model="model.teams" :options="choices"
      /></mp-form-item>
      <mp-form-item field="role" label="所属部门"
        ><mp-radio-group v-model="model.role" :options="choices"
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
```

### 下拉选择字段

Example source: src/form/example/demos/field-selection.vue

```vue
<script setup>
import { ref, watch } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('popup')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const devices = [
  {
    isGroup: true,
    label: '常用设备',
    options: [
      { value: 'laptop', label: '笔记本' },
      { value: 'phone', label: '手机' },
      { value: 'tablet', label: '平板' },
    ],
  },
  {
    isGroup: true,
    label: '其他设备',
    options: [
      { value: 'desktop', label: '台式工作站' },
      { value: 'watch', label: '智能手表（暂不可选）', disabled: true },
    ],
  },
]
const people = [
  { value: 'lin', label: '林晓 · 研发' },
  { value: 'chen', label: '陈晨 · 设计' },
  { value: 'zhou', label: '周宁 · 运营' },
]
const suggestions = [
  { isGroup: true, label: '技术团队', options: [{ value: '研发' }, { value: '研发平台' }, { value: '研发基础设施' }] },
  {
    isGroup: true,
    label: '协作团队',
    options: [{ value: '设计' }, { value: '运营' }, { value: '归档团队', disabled: true }],
  },
]
const model = ref({
  device: 'laptop',
  devices: ['laptop', 'phone'],
  keyword: '研发',
  person: 'lin',
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="device" label="单选设备"
        ><mp-select v-model="model.device" :options="devices" filterable
      /></mp-form-item>
      <mp-form-item field="devices" label="多选设备"
        ><mp-select v-model="model.devices" :options="devices" multiple filterable :limit="3"
      /></mp-form-item>
      <mp-form-item field="keyword" label="自动补全"
        ><mp-auto-complete v-model="model.keyword" :options="suggestions" clearable placeholder="输入或选择团队"
      /></mp-form-item>
      <mp-form-item field="person" label="人员（Select）"
        ><mp-select
          v-model="model.person"
          :options="people"
          :show-extra-options="false"
          filterable
          clearable
          placeholder="搜索人员"
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
```

### 层级选择字段

Example source: src/form/example/demos/field-tree.vue

```vue
<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('popup')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const regions = [
  {
    label: '华东',
    value: 'east',
    children: [
      { label: '上海', value: 'shanghai' },
      {
        label: '浙江',
        value: 'zhejiang',
        children: [
          { label: '杭州', value: 'hangzhou' },
          { label: '宁波', value: 'ningbo' },
        ],
      },
    ],
  },
  {
    label: '华北',
    value: 'north',
    children: [
      { label: '北京', value: 'beijing' },
      { label: '天津', value: 'tianjin' },
    ],
  },
  { label: '华南（暂不可选）', value: 'south', disabled: true },
]
const model = ref({
  regions: ['shanghai', 'hangzhou'],
  region: 'shanghai',
  tree: 'shanghai',
  trees: ['shanghai', 'hangzhou'],
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="region" label="地区"
        ><mp-cascader v-model="model.region" :options="regions" filterable
      /></mp-form-item>
      <mp-form-item field="regions" label="多选地区"
        ><mp-cascader v-model="model.regions" :options="regions" multiple filterable show-path-label
      /></mp-form-item>
      <mp-form-item field="tree" label="树形选项（Cascader）"
        ><mp-cascader v-model="model.tree" :options="regions" filterable show-path-label
      /></mp-form-item>
      <mp-form-item field="trees" label="多选树形选项（Cascader）"
        ><mp-cascader v-model="model.trees" :options="regions" multiple filterable show-path-label
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
```

### 日期字段

Example source: src/form/example/demos/field-date.vue

```vue
<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('popup')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  datetime: '2026-10-20 09:30:00',
  dateTimes: ['2026-10-20 09:30:00', '2026-10-22 18:00:00'],
  day: '2026-10-19',
  days: ['2026-10-19', '2026-10-22'],
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="day" label="日期"
        ><mp-date v-model="model.day" value-format="YYYY-MM-DD" panel-type="calendar"
      /></mp-form-item>
      <mp-form-item field="days" label="日期范围"
        ><mp-date-range v-model="model.days" value-format="YYYY-MM-DD" panel-type="calendar"
      /></mp-form-item>
      <mp-form-item field="datetime" label="日期时间"
        ><mp-date v-model="model.datetime" show-time panel-type="calendarPicker"
      /></mp-form-item>
      <mp-form-item field="dateTimes" label="日期时间范围"
        ><mp-date-range v-model="model.dateTimes" show-time panel-type="calendarPicker"
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
```

### 时间字段

Example source: src/form/example/demos/field-time.vue

```vue
<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('popup')
const timePanelType = ref('picker')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  time: '09:30',
  times: ['09:30', '18:00'],
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="time" label="时间"
        ><mp-time v-model="model.time" :panel-type="timePanelType" format="HH:mm"
      /></mp-form-item>
      <mp-form-item field="times" label="时间范围"
        ><mp-time-range v-model="model.times" :panel-type="timePanelType" format="HH:mm"
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
```

### 进度与评分字段

Example source: src/form/example/demos/field-rating.vue

```vue
<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('popup')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  progress: 40,
  score: 4,
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="progress" label="进度"><mp-slider v-model="model.progress" /></mp-form-item>
      <mp-form-item field="score" label="评分"><mp-rate v-model="model.score" /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
```

### 附件字段

Example source: src/form/example/demos/field-upload.vue

```vue
<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('popup')
const presentations = ['inline', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  attachments: [],
})
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="presentations" :clearable="false" aria-label="字段展示方式" />
    <mp-form :model="model" :presentation="presentation">
      <mp-form-item field="attachments" label="附件"
        ><mp-upload v-model="model.attachments" :auto-upload="false"
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
```

### 独立面板操作区

Example source: src/form/example/demos/field-panel-actions.vue

```vue
<template>
  <mp-space direction="column" :size="16">
    <mp-date-picker
      default-value="2026-10-20 09:30:00"
      show-time
      :disable-confirm="false"
      presentation="calendarPicker"
    />
    <mp-date-picker
      default-value="2026-10-20 09:30:00"
      show-time
      :disable-confirm="false"
      presentation="calendarPicker"
    >
      <template #actions="{ selectNow, nowDisabled, confirm, disabled }">
        <mp-button variant="text" :disabled="nowDisabled" @click="selectNow">此刻</mp-button>
        <mp-button :disabled="disabled" @click="confirm">完成</mp-button>
      </template>
    </mp-date-picker>
  </mp-space>
</template>
```

### 标签与内容装饰

Example source: src/form/example/demos/decoration.vue

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ name: '', notes: '' })
</script>

<template>
  <mp-form :model="model" layout="vertical">
    <mp-form-item
      field="name"
      label="公开名称"
      required
      show-colon
      tooltip="名称将展示在个人主页。"
      :label-attrs="{ for: 'decorated-name' }"
    >
      <mp-input id="decorated-name" v-model="model.name" placeholder="输入公开名称" />
    </mp-form-item>
    <mp-form-item
      field="notes"
      label="备注"
      label-component="div"
      :content-flex="false"
      content-class="decoration-grid"
    >
      <mp-input v-model="model.notes" placeholder="支持自定义内容布局" />
      <small>content-flex=false 后由业务自行布局。</small>
    </mp-form-item>
  </mp-form>
</template>

<style scoped>
.decoration-grid {
  display: grid;
  gap: 8px;
}
</style>
```

### 禁用、只读与异步确认

Example source: src/form/example/demos/presentation-state.vue

```vue
<script setup>
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const form = ref()
const presentation = ref('popup')
const disabled = ref(false)
const readonly = ref(false)
const model = ref({ title: '原名称', note: '原备注', department: 'dev' })

const choices = [
  { value: 'dev', label: '研发' },
  { value: 'design', label: '设计' },
]

const rules = { title: [(value) => Boolean(value) || '名称必填'] }

const scenario = ref('success')
const scenarios = [
  { value: 'success', label: '保存成功' },
  { value: 'failure', label: '保存失败，保留草稿' },
  { value: 'reset', label: '等待期间重置表单' },
  { value: 'disabled', label: '等待期间设为禁用' },
  { value: 'readonly', label: '等待期间设为只读' },
]
const pending = shallowRef()
const result = ref('尚未保存')
const current = computed(() => JSON.stringify(model.value))
function save(value, { signal }) {
  return new Promise((resolve, reject) => {
    const timer = { id: undefined }
    let settled = false
    const task = {
      value,
      finish(error, aborted = false) {
        if (settled) {
          return
        }
        settled = true
        clearTimeout(timer.id)
        signal.removeEventListener('abort', abort)
        if (pending.value === task) {
          pending.value = undefined
        }
        result.value = aborted ? '保存已取消，旧结果不会提交' : error ? '保存失败，保留草稿' : '保存成功'
        if (error) {
          reject(new Error('模拟保存失败，请重试'))
        } else {
          resolve(aborted ? false : undefined)
        }
      },
    }
    const abort = () => task.finish(false, true)
    if (signal.aborted) {
      abort()
      return
    }
    signal.addEventListener('abort', abort, { once: true })
    pending.value = task
    result.value = '模拟保存中（1.2 秒）'
    timer.id = setTimeout(() => {
      if (scenario.value === 'reset') {
        form.value.resetFields()
      } else if (scenario.value === 'disabled') {
        disabled.value = true
      } else if (scenario.value === 'readonly') {
        readonly.value = true
      } else {
        task.finish(scenario.value === 'failure')
      }
    }, 1200)
  })
}
onBeforeUnmount(() => pending.value?.finish(false, true))
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="scenario" :options="scenarios" aria-label="异步保存场景" :clearable="false" />
    <mp-checkbox v-model="disabled">禁用状态示例</mp-checkbox>
    <mp-checkbox v-model="readonly">只读状态示例</mp-checkbox>
    <p>编辑名称、备注或部门并保存，模拟等待 1.2 秒。选择保存结果，或在等待时禁用、只读、重置，观察草稿是否提交。</p>
    <mp-form
      ref="form"
      :model="model"
      :presentation="presentation"
      :disabled="disabled"
      :readonly="readonly"
      :rules="rules"
    >
      <mp-form-item field="title" label="事务名称"
        ><mp-input v-model="model.title" :before-commit="save"
      /></mp-form-item>
      <mp-form-item field="note" label="事务备注"
        ><mp-textarea v-model="model.note" :before-commit="save"
      /></mp-form-item>
      <mp-form-item field="department" label="事务部门"
        ><mp-select v-model="model.department" :options="choices" filterable :before-commit="save"
      /></mp-form-item>
    </mp-form>
    <mp-space>
      <mp-button @click="form.resetFields()">重置状态示例</mp-button>
    </mp-space>
    <p role="status" aria-label="事务保存状态">{{ result }}</p>
    <ModelOutput aria-label="事务当前模型">{{ current }}</ModelOutput>
  </mp-space>
</template>
```

### 日期范围的跨页边界

比较日期、月份、年份范围：禁用 2027-01-01、2026-12、2100 年。禁用项不能作为端点，范围可以跨过它们；翻页后检查禁用项仍保持灰态。

Example source: src/form/example/demos/field-range-boundaries.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const model = ref<{ days: [string, string]; months: [string, string]; years: [string, string] }>({
  days: ['2026-12-29', '2027-01-03'],
  months: ['2026-11', '2027-02'],
  years: ['2098', '2102'],
})
const disabledDay = (date: Date) => date.getFullYear() === 2027 && date.getMonth() === 0 && date.getDate() === 1
const disabledMonth = (date: Date) => date.getFullYear() === 2026 && date.getMonth() === 11
const disabledYear = (date: Date) => date.getFullYear() === 2100
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form :model="model">
      <mp-form-item field="days" label="跨月日期"
        ><mp-date-range
          v-model="model.days"
          panel-type="calendar"
          value-format="YYYY-MM-DD"
          :disabled-date="disabledDay"
      /></mp-form-item>
      <mp-form-item field="months" label="跨年月份"
        ><mp-date-range
          v-model="model.months"
          panel-type="calendar"
          type="month"
          value-format="YYYY-MM"
          :disabled-date="disabledMonth"
      /></mp-form-item>
      <mp-form-item field="years" label="跨页年份"
        ><mp-date-range
          v-model="model.years"
          panel-type="calendar"
          type="year"
          value-format="YYYY"
          :disabled-date="disabledYear"
      /></mp-form-item>
    </mp-form>
    <ModelOutput>{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
```

### 字段展示与确认提交

Form、FormItem、Input、Select 支持 presentation 继承：字段 > FormItem > Form。未设置时保留字段各自的默认值；Maple 支持 inline / popup。弹层默认确认后提交，readPretty 只阅读。普通 v-model 和默认插槽保持不变。Select、Cascader、AutoComplete、Date／DateRange、Time／TimeRange 默认 popup，其余字段默认 inline。

Example source: src/form/example/demos/field-presentation.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const presentation = ref('popup')
const readPretty = ref(false)

const options = ref([
  { value: 1, label: '研发设备' },
  { value: 2, label: '设计设备' },
  { value: 3, label: '运营设备' },
])
const form = ref({ name: '默认确认后保存', deviceIds: [2], note: '此项始终直接编辑', summary: '只读展示' })
const status = ref('')

const modeOptions = ['inline', 'popup'].map((value) => ({ label: value, value }))
const committed = computed(() => JSON.stringify(form.value))
const presentationHint = computed(() =>
  readPretty.value
    ? '只展示已保存的值；下方“单项覆盖 inline”通过 readPretty=false 保持可编辑。'
    : presentation.value === 'inline'
      ? '直接编辑，即时更新下方模型；选择设备无需额外确认。'
      : '按展示方式进入编辑；确认才更新下方模型，取消不保存本次修改。',
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="presentation" :options="modeOptions" placeholder="Form 展示方式" :clearable="false" />
    <mp-space wrap>
      <mp-checkbox v-model="readPretty">纯阅读 readPretty</mp-checkbox>
    </mp-space>
    <p>{{ presentationHint }}<br />前两项继承 Form 展示方式，后两项演示字段局部覆盖。</p>
    <mp-form
      :model="form"
      :presentation="presentation"
      :read-pretty="readPretty"
      @submit-success="status = '表单已提交'"
      @submit-failed="status = '请完成当前编辑或修正校验错误'"
    >
      <mp-form-item field="name" label="名称" :rules="[(value) => Boolean(value) || '名称不能为空']">
        <mp-input v-model="form.name" placeholder="请输入名称" clearable />
      </mp-form-item>
      <mp-form-item field="deviceIds" label="设备" :rules="[(value) => value.length > 0 || '请选择设备']">
        <mp-select v-model="form.deviceIds" :options="options" multiple filterable :limit="3" placeholder="搜索设备" />
      </mp-form-item>
      <mp-form-item field="note" label="单项覆盖 inline" presentation="inline" :read-pretty="false">
        <mp-input v-model="form.note" />
      </mp-form-item>
      <mp-form-item field="summary" label="固定 readPretty" read-pretty>
        <mp-input v-model="form.summary" />
      </mp-form-item>
      <mp-button html-type="submit">提交表单</mp-button>
    </mp-form>
    <ModelOutput role="status">当前模型：{{ committed }}</ModelOutput>
    <p v-if="status" role="status">{{ status }}</p>
  </mp-space>
</template>
```

### presentation 继承规则

Form 支持 `inline / popup`，未设置时保留字段各自的默认值；FormItem 和字段继承显式设置的值，显式值覆盖。read 是阅读展示，与 readonly/disabled 分开。确认编辑未结束时整表提交会失败并保留草稿；reset 取消编辑。原有默认插槽与 v-model 保持不变，不需要 editor 插槽。

### 校验展示状态

显式 validate-status 优先于自动状态；仅 error 显示错误，其他状态显示 help。它不改变 validate 的真实结果。自动校验经过 validating → success/error；clearValidate 恢复未校验状态。setFields 仅传 message 设为 error，status=''、message='' 可清空。

Example source: src/form/example/demos/presentation-status.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FormItemValidateStatus } from '@maple-design/ui'

const status = ref<FormItemValidateStatus>('warning')
const statuses: FormItemValidateStatus[] = ['success', 'warning', 'error', 'validating']
</script>

<template>
  <div class="status-demo">
    <mp-space wrap>
      <mp-button v-for="item in statuses" :key="item" @click="status = item">{{ item }}</mp-button>
    </mp-space>
    <mp-form layout="vertical">
      <mp-form-item label="展示状态" feedback :validate-status="status" help="显式状态只控制外观，不改变实际校验结果。">
        <mp-input placeholder="切换上方状态" />
      </mp-form-item>
    </mp-form>
  </div>
</template>

<style scoped>
.status-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

### 多字段异步聚合

显式调用validate()或validateField()会使等待中的旧原生submit失效：命令校验有自己的结果，不应让旧submit在完成后把旧错误或成功与当前模型混发。此后新的原生submit仍正常等待自己的字段校验并通知一次。该规则仅逻辑失效、不取消真实请求，不清空历史提交计数；既有方法签名不变，不保留旧的混发行为。仅编辑但未重新校验的快照协议仍未覆盖。

“返回最新用户名结果 / 返回最新代码结果”优先结清对应字段最新任务，可让新submit先完成、旧结果最后返回。新成功后旧失败不追加提交或恢复错误；新失败后旧成功不追加提交或清除新错误。仍须等最新提交的两个字段都返回，单个字段返回不提交；默认“返回用户名/代码结果”继续返回最早任务。

原生submit采用最新提交生效：旧提交仍等待时再次提交，使旧提交的submit/submit-success/submit-failed续体失效。用guest/bad提交后改为admin/1234再提交；先返回旧两个结果，原生提交计数应仍0，新提交仍等自己的两个结果。反向旧成功/新失败同理，旧成功不能提前报通过。这个规则不取消真实请求，也不处理仅编辑但没有再次提交的业务快照。

原生submit等待中调用resetFields（含原生reset）会使该提交失效；旧Promise结清后不得再发submit、submit-success或submit-failed。停用/卸载同样使旧提交失效，后续新提交仍正常校验。此为逻辑失效，不是取消远端请求；并发submit和跨字段异步依赖不在这个重置协议内。

“原生异步提交”是表单内的原生submit按钮，也可聚焦后按Enter。独立“原生提交”计数须等两个本地异步字段都返回才增加：用户名失败先返回时暂不提交，代码返回后记录失败；修正为admin再提交，反序返回代码/用户名后记录成功并清错。下方“结果”仍只表示命令式校验，两个计数/结果互不冒充。完成后重置清空字段、保留历史提交计数。此顺序重试不代表并发submit或跨字段异步依赖已覆盖。

同一示例可连续点击两次“校验两个字段”：先输入旧值并发起，再改值发起新一轮。“返回用户名结果 / 返回代码结果”各返回该字段最早任务。旧整表先完成时，新一轮仍须等它自己的两个字段；旧成功或失败都不应覆盖最新字段反馈。结果文案由示例序号单独保护，不是 Form 自动取消旧请求，也不是原生提交并发协议。

两个字段分别返回独立本地 Promise。先返回任一字段可更新该字段反馈，但整表须等两个字段都完成。重置使旧反馈和示例结果失效，旧任务仍可手动返回以观察迟到结果。这里演示命令式 validate()，不是原生提交事件并发或跨字段依赖。

也可在用户名结果已返回、代码仍等待时重置，立即输入新值并再次校验。此时返回最早代码只会结清旧任务，不能恢复旧错误或提前完成新整表；必须返回新一轮自己的两个结果。分别用旧失败/新成功、旧成功/新失败核对字段反馈；结果文案仍由示例版本号单独保护，不等于取消真实请求。

Example source: src/form/example/demos/async-fields.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const formRef = ref()
const id = useId()
const model = reactive({ name: '', code: '' })
const pending = shallowRef([])
const submissions = ref(0)
const submittedResult = ref('-')
function submitted({ errors }) {
  submissions.value++
  submittedResult.value = errors ? '未通过' : '通过'
}
const result = ref('尚未校验')
let run = 0
function request(field, value) {
  return new Promise((resolve) => {
    pending.value = [...pending.value, { field, value, resolve }]
  })
}
function rules(field) {
  return [(value) => request(field, value)]
}
const nameRules = rules('name')
const codeRules = rules('code')
async function validate() {
  const current = ++run
  result.value = '校验中'
  const errors = await formRef.value?.validate()
  if (current === run) {
    result.value = errors ? '未通过' : '通过'
  }
}
function complete(field, latest = false) {
  const tasks = pending.value.filter((item) => item.field === field)
  const task = latest ? tasks.at(-1) : tasks[0]
  if (!task) {
    return
  }
  pending.value = pending.value.filter((item) => item !== task)
  task.resolve(
    task.value === (field === 'name' ? 'admin' : '1234')
      ? true
      : field === 'name'
        ? '用户名必须是 admin'
        : '代码必须是 1234',
  )
}
function reset() {
  run++
  formRef.value?.resetFields()
  result.value = '已重置'
}
function clear() {
  run++
  formRef.value?.clearValidate()
  result.value = '已清空'
}
function serverError() {
  run++
  formRef.value?.setFields({ name: { status: 'error', message: '模拟服务端拒绝' } })
  result.value = '服务端错误'
}
function cleanup() {
  run++
  const tasks = pending.value
  pending.value = []
  tasks.forEach((task) => task.resolve(true))
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
</script>
<template>
  <section class="async-fields-form-demo">
    <p>两个独立本地 Promise 规则分别接受 admin 和 1234；手动返回各字段，不访问网络。</p>
    <mp-form ref="formRef" presentation="inline" :model="model" @submit="submitted">
      <mp-form-item
        field="name"
        label="用户名"
        :label-attrs="{ for: id + '-name' }"
        :rules="nameRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-name'" v-model="model.name" presentation="inline" />
      </mp-form-item>
      <mp-form-item
        field="code"
        label="代码"
        :label-attrs="{ for: id + '-code' }"
        :rules="codeRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-code'" v-model="model.code" presentation="inline" />
      </mp-form-item>
      <mp-button html-type="submit">原生异步提交</mp-button>
    </mp-form>
    <mp-button html-type="button" @click="clear">清空校验</mp-button>
    <mp-button html-type="button" @click="serverError">写入服务端错误</mp-button>
    <p class="async-submit-status">原生提交：{{ submissions }}；结果：{{ submittedResult }}</p>
    <mp-space wrap>
      <mp-button @click="validate">校验两个字段</mp-button>
      <mp-button :disabled="!pending.some((item) => item.field === 'name')" @click="complete('name')"
        >返回用户名结果</mp-button
      >
      <mp-button :disabled="!pending.some((item) => item.field === 'code')" @click="complete('code')"
        >返回代码结果</mp-button
      >
      <mp-button :disabled="!pending.some((item) => item.field === 'name')" @click="complete('name', true)"
        >返回最新用户名结果</mp-button
      >
      <mp-button :disabled="!pending.some((item) => item.field === 'code')" @click="complete('code', true)"
        >返回最新代码结果</mp-button
      >
      <mp-button @click="reset">重置两个字段</mp-button>
    </mp-space>
    <p role="status">
      结果：{{ result }}；用户名等待：{{ pending.filter((item) => item.field === 'name').length }}；代码等待：{{
        pending.filter((item) => item.field === 'code').length
      }}
    </p>
    <ModelOutput>{{ model }}</ModelOutput>
  </section>
</template>
```

### 异步校验的返回顺序

主动调用 `validateField` 后可继续修改字段并发起新校验。本例用真实 Promise 规则且不访问网络，关闭自动触发，只通过按钮发起。先校验 guest，再校验 admin，先返回最新结果再返回最早结果，观察旧错误不会覆盖最新字段状态。结果文案由示例请求序号保护，“本次校验值”是校验快照，不是服务端提交。

清空校验或重置后，仍可返回等待中的旧结果；卸载和停用会结清本地等待。真实接口应取消请求，并由业务保护提交快照和版本。

等待中可切换表单 disabled / readonly：它们限制控件交互，不自动取消已发起校验，也不清除已有错误。外部校验控制按钮不在被禁用的 Form 内。需要使旧结果失效时主动清空校验或重置；解除限制后可再次输入并校验。

关闭 Mount async field 会移除字段但保留业务模型和待返回任务。重新挂载后可发起新校验，再按新旧顺序返回结果，核对旧实例的错误不会污染新字段；这不是删除业务数据，也不是整表并发提交协议。

等待中可通过“写入服务端错误”调用 `setFields` 设置显式错误；之前的异步成功或失败不应覆盖它。示例仍保留旧任务供手动返回，结果文案单独做版本保护。清空校验可移除错误，重新发起校验后以新结果为准；不代表真实接口已取消。

“校验整表”调用 `validate()`，“校验字段”调用 `validateField('name')`。可交错发起并按不同顺序返回，分别观察字段反馈和示例最新结果；重置使旧结果失效，不等于取消真实服务。当前示例只有一个异步字段，不代表多字段聚合、跨字段依赖或原生 submit 事件并发均已覆盖。

Example source: src/form/example/demos/async-race.vue

```vue
<template>
  <section class="async-race-form-demo">
    <p>本地异步规则只接受 admin；手动返回最早或最新结果，不访问网络。</p>
    <mp-form ref="formRef" presentation="inline" :model="model" :disabled="disabled" :readonly="readonly">
      <mp-form-item
        v-if="mounted"
        field="name"
        label="用户名"
        :label-attrs="{ for: demoId }"
        :rules="rules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="demoId" v-model="model.name" presentation="inline" placeholder="请输入 admin" />
      </mp-form-item>
    </mp-form>
    <div class="async-race-controls">
      <mp-checkbox v-model="disabled" presentation="inline">Disable async form</mp-checkbox>
      <mp-checkbox v-model="readonly" presentation="inline">Readonly async form</mp-checkbox>
      <mp-checkbox v-model="mounted" presentation="inline">Mount async field</mp-checkbox>
    </div>
    <mp-space wrap>
      <mp-button :disabled="!mounted" @click="validate">校验字段</mp-button>
      <mp-button :disabled="!mounted" @click="validateAll">校验整表</mp-button>
      <mp-button :disabled="!pending.length" @click="complete(false)">返回最早结果</mp-button>
      <mp-button :disabled="!pending.length" @click="complete(true)">返回最新结果</mp-button>
      <mp-button :disabled="!mounted" @click="serverError">写入服务端错误</mp-button>
      <mp-button @click="clear">清空校验</mp-button>
      <mp-button @click="reset">重置</mp-button>
    </mp-space>
    <p role="status">校验结果：{{ result }}；等待结果：{{ pending.length }}</p>
    <p>本次校验值：{{ checkedValue || '空' }}</p>
    <ModelOutput>{{ model }}</ModelOutput>
  </section>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'
import type { FormInstance } from '@maple-design/ui'
import ModelOutput from '../components/ModelOutput.vue'

interface Pending {
  value: unknown
  resolve: (result: true | string) => void
}
const demoId = useId()
const disabled = ref(false)
const readonly = ref(false)
const mounted = ref(true)
const formRef = ref<FormInstance>()
const model = reactive({ name: '' })
const pending = shallowRef<Pending[]>([])
const result = ref('尚未校验')
const checkedValue = ref('')
let run = 0

function request(value: unknown) {
  return new Promise<true | string>((resolve) => {
    pending.value = [...pending.value, { value, resolve }]
  })
}
const rules = [request]

function validate() {
  return validateScope(false)
}
function validateAll() {
  return validateScope(true)
}
async function validateScope(all: boolean) {
  const current = ++run
  checkedValue.value = model.name
  result.value = '校验中'
  const errors = await (all ? formRef.value?.validate() : formRef.value?.validateField('name'))
  if (current === run) {
    result.value = errors ? '未通过' : '通过'
  }
}
function complete(latest: boolean) {
  const task = latest ? pending.value.at(-1) : pending.value[0]
  if (!task) {
    return
  }
  pending.value = pending.value.filter((item) => item !== task)
  task.resolve(task.value === 'admin' ? true : '用户名必须是 admin')
}
function clear() {
  run++
  formRef.value?.clearValidate()
  result.value = '已清空'
}
function serverError() {
  run++
  formRef.value?.setFields({ name: { status: 'error', message: '模拟服务端拒绝' } })
  result.value = '服务端错误'
}
function reset() {
  run++
  formRef.value?.resetFields()
  checkedValue.value = ''
  result.value = '已重置'
}
function cleanup() {
  run++
  result.value = '已取消'
  const tasks = pending.value
  pending.value = []
  tasks.forEach((task) => task.resolve(true))
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
</script>

<style scoped>
.async-race-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.async-race-controls label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
```

## FormItem 表单项

### 介绍

表单项组件，负责渲染标签、校验规则和错误信息。需与 `Form`、表单控件配合使用。

- 传入 `label`：外置标签布局，Input / Select 会自动关闭浮动 `hint`。
- 不传 `label`：不渲染外置标签，控件继续使用浮动 placeholder。

### 外置标签（推荐与 Cedar 对齐）

传入 `label` 后使用外置标签，并可通过 `layout="vertical"` 纵向排列。

Example source: src/form/example/demos/vertical-label.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const form = ref(null)
const formData = reactive({ username: '', password: '' })
</script>

<template>
  <mp-form ref="form" :model="formData" layout="vertical">
    <mp-form-item
      field="username"
      label="用户名"
      required
      :rules="[(value) => !!value || '用户名不能为空']"
      :validate-trigger="['input', 'change']"
    >
      <mp-input v-model="formData.username" placeholder="请输入" />
    </mp-form-item>
    <mp-form-item
      field="password"
      label="密码"
      help="至少 8 位"
      :rules="[(value) => !!value || '密码不能为空', (value) => value.length >= 8 || '密码长度不能低于 8 位']"
    >
      <mp-input v-model="formData.password" type="password" placeholder="请输入" />
    </mp-form-item>
    <mp-button block status="primary" @click="form?.validate()">校验</mp-button>
  </mp-form>
</template>
```

### 左右布局

使用 `layout="horizontal"` 横向排列标签与控件，也可在单个 `FormItem` 上覆盖布局。

Example source: src/form/example/demos/horizontal-layout.vue

```vue
<script setup>
import { reactive } from 'vue'

const formData = reactive({ username: '', department: '' })
</script>

<template>
  <mp-form :model="formData" layout="horizontal">
    <mp-form-item field="username" label="用户名" required>
      <mp-input v-model="formData.username" placeholder="请输入" />
    </mp-form-item>
    <mp-form-item field="department" label="部门">
      <mp-select v-model="formData.department" placeholder="请选择">
        <mp-option label="产品部" />
        <mp-option label="研发部" />
      </mp-select>
    </mp-form-item>
  </mp-form>
</template>
```

### 浮动 Placeholder（不写 label）

不传 `label` 时不渲染外置标签，Input 继续使用浮动 placeholder。

Example source: src/form/example/demos/floating-placeholder.vue

```vue
<script setup>
import { reactive } from 'vue'

const formData = reactive({ username: '', password: '' })
</script>

<template>
  <mp-form :model="formData">
    <mp-form-item field="username" required :rules="[(value) => !!value || '用户名不能为空']">
      <mp-input v-model="formData.username" placeholder="用户名" />
    </mp-form-item>
    <mp-form-item field="password" :rules="[(value) => !!value || '密码不能为空']">
      <mp-input v-model="formData.password" type="password" placeholder="密码" />
    </mp-form-item>
  </mp-form>
</template>
```

### 帮助与额外信息

`help` 展示帮助说明，`extra` 展示额外信息。

Example source: src/form/example/demos/help-extra.vue

```vue
<script setup>
import { reactive } from 'vue'

const formData = reactive({ email: '' })
</script>

<template>
  <mp-form :model="formData">
    <mp-form-item field="email" label="邮箱" help="用于接收通知" extra="选填">
      <mp-input v-model="formData.email" placeholder="请输入" />
    </mp-form-item>
  </mp-form>
</template>
```

### 自定义表单控件

自定义控件通过 `FormItem.useFormItem`（或 `Form.useFormItem`）接入错误态和校验触发器。

示例使用原生按钮提供 Enter/Space 操作与 checkbox 语义，读取 `mergedDisabled` / `mergedReadonly` 继承 Form 和 FormItem 状态。未传的布尔配置使用 `undefined`，避免覆盖父级；点击切换值后通知 `eventHandlers.onChange`，焦点事件也交给表单。

Example source: src/form/example/demos/custom-control.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import MpCustomFormComponent from '../CustomFormComponent.vue'

const formData = reactive({ confirmed: false })
const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)
</script>

<template>
  <mp-space>
    <mp-checkbox v-model="disabled" presentation="inline">禁用表单</mp-checkbox>
    <mp-checkbox v-model="readonly" presentation="inline">只读字段</mp-checkbox>
  </mp-space>
  <mp-form ref="form" presentation="inline" :model="formData" :disabled="disabled">
    <mp-form-item
      field="confirmed"
      :readonly="readonly"
      label="确认状态"
      help="自定义控件通过 useFormItem 接入校验"
      :rules="[(value) => !!value || '请先确认']"
    >
      <mp-custom-form-component v-model="formData.confirmed">点我切换</mp-custom-form-component>
    </mp-form-item>
  </mp-form>
  <mp-space>
    <mp-button @click="form?.validate()">校验</mp-button>
    <mp-button @click="form?.resetFields()">重置</mp-button>
  </mp-space>
  <p role="status">确认值：{{ formData.confirmed }}</p>
</template>
```

### 交互状态切换

适用于整张表单的状态继承。调整禁用、只读，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

Example source: src/form/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, reactive } from 'vue'

const formData = reactive({ email: '' })
const __demoState = __demoReactive({ disabled: false, readonly: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
    </mp-space>
    <mp-form :model="formData" v-bind="__demoState">
      <mp-form-item field="email" label="邮箱" help="用于接收通知" extra="选填">
        <mp-input v-model="formData.email" placeholder="请输入" />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

### 桌面与移动的同场景展示

点击部门、日期或时间，打开 Popup。先修改后取消，再修改并确认，比较下方已提交模型。

Example source: src/form/example/demos/platform-presentation.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const initialModel = () => ({ title: '设备巡检', department: 'design', date: undefined, time: undefined })
const model = ref(initialModel())
const departments = [
  { value: 'dev', label: '研发部' },
  { value: 'design', label: '设计部' },
  { value: 'ops', label: '运营部' },
]
const committed = computed(() =>
  JSON.stringify({
    title: model.value.title,
    department: model.value.department,
    date: model.value.date ?? null,
    time: model.value.time ?? null,
  }),
)
function reset() {
  model.value = initialModel()
}
</script>
<template>
  <mp-space direction="column" class="platform-presentation-demo">
    <p>选择“研发部”：先关闭（取消），再重选并确认，观察已提交模型。</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item label="任务名称" field="title"
        ><mp-input v-model="model.title" presentation="inline" placeholder="输入任务名称"
      /></mp-form-item>
      <mp-form-item label="负责部门" field="department"
        ><mp-select v-model="model.department" :options="departments" presentation="popup" placeholder="选择部门"
      /></mp-form-item>
      <mp-form-item label="执行日期" field="date"
        ><mp-date v-model="model.date" presentation="popup" placeholder="选择日期"
      /></mp-form-item>
      <mp-form-item label="执行时间" field="time"
        ><mp-time v-model="model.time" presentation="popup" placeholder="选择时间"
      /></mp-form-item>
    </mp-form>
    <div class="platform-presentation-demo__model">
      <strong>已提交模型</strong><output aria-label="已提交模型" role="status">{{ committed }}</output>
    </div>
    <mp-button @click="reset">重置本例</mp-button>
  </mp-space>
</template>
<style scoped>
.platform-presentation-demo {
  width: 100%;
  min-width: 0;
}
.platform-presentation-demo__model {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background: var(--mp-color-fill-1);
  color: var(--mp-color-text-1);
}
.platform-presentation-demo__model output {
  display: block;
  margin-top: 8px;
  overflow-wrap: anywhere;
  font-size: 12px;
}
</style>
```

### 巡检任务完整流程

填写、校验、确认、模拟失败与重试；返回修改不会覆盖已提交记录。

Example source: src/form/example/demos/task-workflow.vue

```vue
<script setup>
import { computed, onBeforeUnmount, onDeactivated, ref } from 'vue'

const fresh = () => ({ title: '', department: 'ops', priority: 'normal' })
const draft = ref(fresh())
const saved = ref(null)
const stage = ref('edit')
const message = ref('填写任务后进入确认；也可以直接提交空表单查看校验。')
const busy = ref(false)
const failNext = ref(false)
const formRef = ref()
const rules = [(value) => !!value?.trim() || '请输入任务名称']
const departments = [
  { value: 'ops', label: '运营部' },
  { value: 'dev', label: '研发部' },
  { value: 'design', label: '设计部' },
]
const priorities = [
  { value: 'normal', label: '普通' },
  { value: 'urgent', label: '紧急' },
]
const departmentLabel = computed(() => departments.find((item) => item.value === draft.value.department)?.label)
let timer
let epoch = 0
function cancelPending() {
  epoch++
  clearTimeout(timer)
  busy.value = false
}
onBeforeUnmount(cancelPending)
onDeactivated(cancelPending)
function review({ errors }) {
  if (errors) {
    message.value = '请补全必填项，任务尚未提交。'
    return
  }
  stage.value = 'review'
  message.value = '核对信息后确认提交；返回修改不会改变上次提交记录。'
}
function submit() {
  if (busy.value) {
    return
  }
  const current = ++epoch
  const snapshot = { ...draft.value }
  const shouldFail = failNext.value
  failNext.value = false
  busy.value = true
  message.value = '正在本地模拟保存…'
  timer = setTimeout(() => {
    if (current !== epoch) {
      return
    }
    busy.value = false
    if (shouldFail) {
      message.value = '保存失败：草稿已保留，请点击“重试提交”。'
      return
    }
    saved.value = snapshot
    stage.value = 'done'
    message.value = '提交成功，已生成任务记录。'
  }, 500)
}
function reset() {
  cancelPending()
  draft.value = fresh()
  saved.value = null
  stage.value = 'edit'
  failNext.value = false
  message.value = '已重置，可以重新演示。'
  formRef.value?.clearValidate()
}
function fill() {
  draft.value = { title: '展厅设备巡检', department: 'ops', priority: 'urgent' }
  formRef.value?.clearValidate()
}
</script>
<template>
  <section class="workflow-demo" aria-label="巡检任务完整流程">
    <ol class="workflow-demo__steps" aria-label="任务流程">
      <li :aria-current="stage === 'edit' ? 'step' : undefined">01 填写与校验</li>
      <li :aria-current="stage === 'review' ? 'step' : undefined">02 核对与提交</li>
      <li :aria-current="stage === 'done' ? 'step' : undefined">03 结果与记录</li>
    </ol>
    <mp-form v-if="stage === 'edit'" ref="formRef" :model="draft" layout="vertical" @submit="review">
      <mp-form-item label="任务名称" field="title" :rules="rules" feedback
        ><mp-input v-model="draft.title" presentation="inline" placeholder="例如：展厅设备巡检"
      /></mp-form-item>
      <mp-form-item label="执行部门" field="department"
        ><mp-select v-model="draft.department" :options="departments" presentation="popup"
      /></mp-form-item>
      <mp-form-item label="任务优先级" field="priority"
        ><mp-select v-model="draft.priority" :options="priorities" presentation="popup"
      /></mp-form-item>
      <mp-space wrap
        ><mp-button html-type="submit" status="primary">校验并预览</mp-button
        ><mp-button @click="fill">填入演示数据</mp-button></mp-space
      >
    </mp-form>
    <div v-else-if="stage === 'review'">
      <h4>确认巡检任务</h4>
      <dl>
        <dt>任务</dt>
        <dd>{{ draft.title }}</dd>
        <dt>部门</dt>
        <dd>{{ departmentLabel }}</dd>
        <dt>优先级</dt>
        <dd>{{ draft.priority === 'urgent' ? '紧急' : '普通' }}</dd>
      </dl>
      <mp-checkbox v-model="failNext" :disabled="busy">模拟下一次保存失败（本地）</mp-checkbox>
      <mp-space wrap
        ><mp-button status="primary" :loading="busy" :disabled="busy" @click="submit">{{
          message.includes('保存失败') ? '重试提交' : '确认提交'
        }}</mp-button
        ><mp-button :disabled="busy" @click="stage = 'edit'">返回修改</mp-button></mp-space
      >
    </div>
    <div v-else>
      <h4>任务已创建</h4>
      <p>{{ saved.title }} · {{ saved.priority === 'urgent' ? '紧急处理' : '普通处理' }}</p>
      <mp-button @click="stage = 'edit'">继续编辑</mp-button>
    </div>
    <p role="status" aria-live="polite">{{ message }}</p>
    <details>
      <summary>查看已提交记录</summary>
      <pre>{{ saved ? JSON.stringify(saved, null, 2) : '尚无记录；校验失败、返回修改或保存失败都不会创建记录。' }}</pre>
    </details>
    <mp-button @click="reset">重新演示</mp-button>
    <small>本例使用本地模拟保存，不访问业务服务。校验、确认、保存与失败恢复由业务流程组合。</small>
  </section>
</template>
<style scoped>
.workflow-demo {
  width: 100%;
  min-width: 0;
}
.workflow-demo__steps {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  padding: 0;
}
.workflow-demo__steps li {
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--mp-color-fill-1);
}
.workflow-demo__steps [aria-current] {
  color: var(--mp-sys-color-content-brand);
  font-weight: 700;
}
.workflow-demo dl {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
}
.workflow-demo dd {
  margin: 0;
  overflow-wrap: anywhere;
}
.workflow-demo pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.workflow-demo small {
  display: block;
  margin-top: 12px;
  color: var(--mp-color-text-2);
}
</style>
```

## API

### 属性

#### Form Props

| 参数 | 说明                                        | 类型 | 默认值 |
| --- |-------------------------------------------| --- | -- |
| `id` | 表单原生 id；显式设置时作为字段容器 id 前缀（嵌套路径归一化） | _string_ | `-` |
| `model` | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据 | _Record<string, any>_ | `-` |
| `layout` | 表单项布局方式，可选值为 `vertical` `horizontal` `inline`；可被 `FormItem.layout` 覆盖 | _'vertical' \| 'horizontal' \| 'inline'_ | `'vertical'` |
| `label-align` | 标签对齐 | _'left' \| 'right'_ | `'right'` |
| `label-col-props` | 横向标签 Col 参数，支持响应式断点 | _FormColProps_ | `{ span: 5, offset: 0 }` |
| `wrapper-col-props` | 横向内容 Col 参数 | _FormColProps_ | `{ span: 19, offset: 0 }` |
| `label-col-style` | 标签列逐实例样式 | _CSSProperties_ | `-` |
| `wrapper-col-style` | 内容列逐实例样式 | _CSSProperties_ | `-` |
| `label-col-flex` | 标签 flex；单位字符串为宽度，数字为伸缩比例 | _number \| string_ | `-` |
| `auto-label-width` | 对齐参与自动计算的横向标签最大自然宽度 | _boolean_ | `false` |
| `size` | 表单控件尺寸，由 FormItem 和控件继承 | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `rules` | 按字段名配置的表单校验规则 | _Record<string, rule \| rule[]>_ | `-` |
| `readonly` | 是否只读                                      | _boolean_ | `-` |
| `disabled` | 是否禁用                                      | _boolean_ | `-` |
| `scroll-to-error` | 校验失败后滚动到页面顺序的第一个（`start`）或最后一个（`end`）错误字段；不是视口对齐方式 | _'start' \| 'end'_ | `-` |
| `scroll-to-error-offset-y` | 滚动到校验不通过的表单项的位置偏移量 | _number \| string_ | `0` |

### 方法

#### Form Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `validate` | 触发表单组件的校验 | `callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `validateField` | 触发指定表单项的校验 | `field: string \| string[]`、`callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `resetFields` | 重置表单项的值和校验信息为初始值，不传 `field` 则重置所有表单项 | `field?: string \| string[]` | `-` |
| `clearValidate` | 清空表单项的校验信息，不传 `field` 则清空所有表单项 | `field?: string \| string[]` | `-` |
| `setFields` | 批量设置表单项的值或错误状态 | `Record<string, { value?; status?; message? }>` | `-` |
| `scrollToField` | 滚动到指定的表单项 | `field: string` | `-` |

### 事件

#### Form Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `submit` | 表单提交时触发 | `data: { values; errors }`、`event: Event` |
| `submit-success` | 校验成功时触发 | `values`、`event: Event` |
| `submit-failed` | 校验失败时触发 | `data: { values; errors }`、`event: Event` |
| `reset` | 表单重置时触发 | `event: Event` |

### 插槽

#### Form Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 表单内容 | `-` |

## FormItem API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `field` | 对应 `Form.model` 中的字段路径，支持 `a.b` | _string_ | `''` |
| `label` | 标签文本；有值时渲染外置标签，并自动关闭控件浮动 hint | _string_ | `-` |
| `tooltip` | 标签提示；支持悬停、键盘聚焦和触摸点击 | _string_ | `-` |
| `show-colon` | 标签后显示冒号 | _boolean_ | `false` |
| `label-component` | 标签原生元素名 | _string_ | `'label'` |
| `label-attrs` | 标签原生属性；for 应指向控件的真实 id | _HTMLAttributes & Record<string, unknown>_ | `-` |
| `content-class` | 内容容器 class | _string \| array \| object_ | `-` |
| `content-flex` | 内容层启用 flex；业务 Grid 布局可关闭 | _boolean_ | `true` |
| `layout` | 布局方式，可选值为 `vertical` `horizontal` `inline`；未传时继承 `Form.layout` | _'vertical' \| 'horizontal' \| 'inline'_ | `-` |
| `label-align` | 标签对齐 | _'left' \| 'right'_ | `-` |
| `label-col-props` | 横向标签 Col 参数，支持响应式断点 | _FormColProps_ | `-` |
| `wrapper-col-props` | 横向内容 Col 参数 | _FormColProps_ | `-` |
| `label-col-style` | 标签列逐实例样式 | _CSSProperties_ | `-` |
| `wrapper-col-style` | 内容列逐实例样式 | _CSSProperties_ | `-` |
| `label-col-flex` | 标签 flex；单位字符串为宽度，数字为伸缩比例 | _number \| string_ | `-` |
| `row-props` | 表单项 Row 参数；支持 gutter、align、justify、wrap | _RowProps_ | `-` |
| `row-class` | 布局容器 class | _string \| array \| object_ | `-` |
| `required` | 是否必填（显示星号，并自动追加必填规则） | _boolean_ | `false` |
| `hide-label` | 是否隐藏标签 | _boolean_ | `false` |
| `feedback` | 在输入框显示校验反馈图标，异步校验期间显示加载状态 | _boolean_ | `false` |
| `validate-status` | 手动指定反馈状态；省略时由校验结果决定 | _'success' \| 'warning' \| 'error' \| 'validating'_ | `-` |
| `hide-asterisk` | 是否隐藏必填星号 | _boolean_ | `false` |
| `asterisk-position` | 星号位置 | _'start' \| 'end'_ | `'start'` |
| `help` | 帮助文案（无错误时展示） | _string_ | `-` |
| `extra` | 额外文案 | _string_ | `-` |
| `disabled` | 是否禁用；未传时继承 Form | _boolean_ | `-` |
| `readonly` | 是否只读；未传时继承 Form | _boolean_ | `-` |
| `size` | 控件尺寸；未传时继承 Form | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `no-style` | 去除标签与错误信息样式，仅保留校验能力 | _boolean_ | `false` |
| `rules` | 校验规则（函数 / Zod / 数组） | _any_ | `-` |
| `validate-trigger` | 触发校验的时机；`clear` 仅由控件清空动作触发，不等同于 `change` | _FormItemValidateTrigger \| FormItemValidateTrigger[]_ | `'change'` |

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
| `validate` | 触发校验 | `-` | `Promise<undefined \| ValidatedError>` |
| `clearValidate` | 清空校验状态 | `-` | `-` |
| `resetField` | 重置字段值到初始值并清空校验 | `-` | `-` |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-form-item-label-width` | `88px`（`inline` 布局下标签宽度） |
| `--mp-form-item-label-gap` | `12px` |

### 类型定义

```ts
type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'
type FormItemLayout = 'vertical' | 'horizontal'
```

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Brand appearance tokens

| CSS variable | Default |
| --- | --- |
| `--mp-form-label-min-height` | `24px` |
| `--mp-form-label-padding-top` | `4px` |
| `--mp-form-label-line-height` | `1.4` |
| `--mp-form-help-line-height` | `1.4` |
