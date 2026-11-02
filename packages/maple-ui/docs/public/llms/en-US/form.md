<!-- Source: src/form/docs/en-US.md; locale: en-US; page: /en-US/form -->

# Form

Final batch verification:Form115tests/19files within the combined Maple532tests/95files pass;root read-only lint,types and shared29tests pass. Runtime-candidate classification33/33families is not whole-component/native acceptance;latest evidence below retains diagnostics/boundaries.

## Examples

### Inline / popup selection summaries

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


### Basic Form

Example source: src/form/example/demos/en-US/example.vue

```vue
<script setup>
import { reactive } from 'vue'

const formData = reactive({ username: '', email: '', department: '', confirmed: false })
</script>

<template>
  <mp-form :model="formData" scroll-to-error="start">
    <mp-space direction="column" :size="[14, 0]">
      <mp-form-item field="username" :rules="[(value) => !!value || 'Username is required']">
        <mp-input v-model="formData.username" placeholder="Username" />
      </mp-form-item>
      <mp-form-item field="email" :rules="[(value) => !!value || 'Email is required']">
        <mp-input v-model="formData.email" placeholder="Email" />
      </mp-form-item>
      <mp-form-item field="department" :rules="[(value) => !!value || 'Department is required']">
        <mp-select v-model="formData.department" placeholder="Department">
          <mp-option label="Product" />
          <mp-option label="Engineering" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="confirmed" :rules="[(value) => !!value || 'Please confirm']">
        <mp-checkbox v-model="formData.confirmed">I confirm the information</mp-checkbox>
      </mp-form-item>
    </mp-space>
  </mp-form>
</template>
```

### Form Controller

Use the Form instance to reset fields, clear validation, validate, and toggle disabled or readonly state.

Example source: src/form/example/demos/en-US/controller.vue

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
    <mp-form-item field="username" :rules="[(value) => !!value || 'Username is required']">
      <mp-input v-model="formData.username" placeholder="Username" />
    </mp-form-item>
  </mp-form>
  <mp-space direction="column" :size="[14, 0]">
    <mp-button block status="danger" @click="form?.resetFields()">Reset fields</mp-button>
    <mp-button block status="warning" @click="form?.clearValidate()">Clear validation</mp-button>
    <mp-button block status="success" @click="form?.validate()">Validate</mp-button>
    <mp-button block status="info" @click="disabled = !disabled">Toggle disabled</mp-button>
    <mp-button block status="primary" @click="readonly = !readonly">Toggle readonly</mp-button>
  </mp-space>
</template>
```

### Form Events

Use Button's `html-type="submit"` / `html-type="reset"` to trigger native form events. The demo displays validation results and current model values; reset restores the initial values and clears errors.

Example source: src/form/example/demos/en-US/events.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { Message } from '@maple-design/ui'
import ModelOutput from '../../components/ModelOutput.vue'

const formData = reactive({ username: '', password: '' })
const result = ref('Not submitted')
const handleSubmit = ({ errors }) => {
  result.value = errors ? 'Invalid' : 'Valid'
  Message(`Submit: ${errors ? 'invalid' : 'valid'}`)
}
const handleReset = () => {
  result.value = 'Reset'
  Message('Form reset')
}
</script>

<template>
  <mp-form presentation="inline" :model="formData" @submit="handleSubmit" @reset="handleReset">
    <mp-space direction="column" :size="[14, 0]">
      <mp-form-item field="username" :rules="[(value) => !!value || 'Username is required']">
        <mp-input v-model="formData.username" presentation="inline" placeholder="Username" />
      </mp-form-item>
      <mp-form-item field="password" :rules="[(value) => !!value || 'Password is required']">
        <mp-input v-model="formData.password" presentation="inline" type="password" placeholder="Password" />
      </mp-form-item>
      <mp-space>
        <mp-button status="primary" html-type="submit">Submit</mp-button>
        <mp-button html-type="reset">Reset</mp-button>
      </mp-space>
    </mp-space>
  </mp-form>
  <p role="status">Submit result: {{ result }}</p>
  <ModelOutput>{{ formData }}</ModelOutput>
</template>
```

### Validate on clear

`validate-trigger="clear"` validates only when the user clicks a control's clear button, not while typing. Typing again does not automatically clear the error; validate explicitly or reset the form.

Example source: src/form/example/demos/en-US/clear-trigger.vue

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
      label="Keyword"
      :rules="[(value) => !!value || 'Enter a keyword']"
      validate-trigger="clear"
    >
      <mp-input v-model="model.keyword" clearable placeholder="Validate immediately after clearing" />
    </mp-form-item>
    <mp-button @click="formRef?.resetFields()">Reset</mp-button>
  </mp-form>
</template>
```

### Responsive label columns

Horizontal layouts default to 5/24 label and 19/24 control columns. Cedar defaults to horizontal; Maple defaults to vertical. Only horizontal uses column proportions and auto width. Responsive options use viewport breakpoints. FormItem overrides Form; Col/style objects replace inherited objects. label-col-flex overrides auto-label-width: unit strings set width, numbers are Col grow ratios, not pixels. The control fills the remainder. Hidden labels leave full-width controls. Automatic width updates on label changes/removal and stays isolated per form. Use vertical or a fixed width for long labels on narrow screens.

Example source: src/form/example/demos/en-US/label-columns.vue

```vue
<script setup>
import { reactive } from 'vue'

const model = reactive({ name: '', department: '' })
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Labels use responsive 6/24 columns; below 576px each occupies a full row.</p>
    <mp-form
      :model="model"
      layout="horizontal"
      label-align="left"
      :label-col-props="{ span: 6, xs: 24, sm: 6 }"
      :wrapper-col-props="{ span: 18, xs: 24, sm: 18 }"
    >
      <mp-form-item field="name" label="Name"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="department" label="Department"><mp-input v-model="model.department" /></mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

### Fixed label width

Example source: src/form/example/demos/en-US/fixed-label-width.vue

```vue
<script setup>
import { reactive } from 'vue'

const model = reactive({ name: '', contact: '' })
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Fixed labels use 6rem; one field overrides this to 8rem. Numeric flex means a grow ratio.</p>
    <mp-form :model="model" layout="horizontal" label-col-flex="6rem" label-align="left">
      <mp-form-item field="name" label="Name"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="contact" label="Contact details" label-col-flex="8rem">
        <mp-input v-model="model.contact" />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

### Automatic label width

Example source: src/form/example/demos/en-US/auto-label-width.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const model = reactive({ name: '', department: '', contact: '' })
const showExtra = ref(true)
const label = ref('Contact details')
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Labels automatically align to the longest visible text. Try renaming or removing the extra field.</p>
    <mp-checkbox v-model="showExtra">Allow extra field</mp-checkbox>
    <label>Rename the longest label <mp-input v-model="label" /></label>
    <mp-form :model="model" layout="horizontal" auto-label-width label-align="left">
      <mp-form-item field="name" label="Name"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="department" label="Department"><mp-input v-model="model.department" /></mp-form-item>
      <mp-form-item v-if="showExtra" field="contact" :label="label">
        <mp-input v-model="model.contact" />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

### Cross-field validation and native submit

When not paused, confirmation immediately compares the current source code. Change the source after a successful match, then validate only confirmation or submit again to observe the dependency error; correct confirmation and submit with Enter or the submit button. Native reset clears model values, feedback and the displayed last-submission value, while the submission count remains cumulative. Dependencies are revalidated explicitly: editing alone does not guarantee that an existing success is current. This local example is not exhaustive asynchronous submit-race coverage or external persistence.

Example source: src/form/example/demos/en-US/cross-field.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'
import ModelOutput from '../../components/ModelOutput.vue'

const formRef = ref()
const id = useId()
const model = reactive({ source: '', confirmation: '' })
const result = ref('Not submitted')
const submissions = ref(0)
const snapshot = ref('')
const message = 'Codes must match and must not be empty'
const sourceRules = [(value) => !!value || 'Enter a source code']
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
  result.value = errors ? 'Failed' : 'Passed'
  snapshot.value = JSON.stringify(values)
}
async function validateConfirmation() {
  const current = ++epoch
  const errors = await formRef.value?.validateField('confirmation')
  if (current === epoch) {
    result.value = errors ? 'Confirmation failed' : 'Confirmation passed'
  }
}
function reset() {
  cleanup()
  result.value = 'Reset'
  snapshot.value = ''
}
</script>

<template>
  <section class="cross-field-form-demo">
    <p>
      Local synthetic codes only. Confirmation compares the current source on validation; changing the source does not
      automatically revalidate its dependent field.
    </p>
    <mp-form ref="formRef" :model="model" @submit="submitted" @reset="reset">
      <mp-form-item
        field="source"
        label="Source code"
        :label-attrs="{ for: id + '-source' }"
        :rules="sourceRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-source'" v-model="model.source" />
      </mp-form-item>
      <mp-form-item
        field="confirmation"
        label="Confirmation code"
        :label-attrs="{ for: id + '-confirmation' }"
        :rules="confirmationRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-confirmation'" v-model="model.confirmation" />
      </mp-form-item>
      <mp-space wrap>
        <mp-button html-type="submit">Submit codes</mp-button>
        <mp-button @click="validateConfirmation">Validate confirmation</mp-button>
        <mp-button html-type="reset">Reset codes</mp-button>
      </mp-space>
    </mp-form>
    <p role="status">Result：{{ result }}；Submissions：{{ submissions }}</p>
    <mp-button html-type="button" :aria-pressed="paused" @click="paused = !paused"
      >Pause cross-field validation</mp-button
    >
    <mp-button html-type="button" :disabled="!pending.length" @click="complete">Resolve cross-field result</mp-button>
    <p class="cross-field-pending">Pending：{{ pending.length }}</p>
    <ModelOutput>Model：{{ model }}</ModelOutput>
    <ModelOutput>Last submitted values：{{ snapshot || '-' }}</ModelOutput>
  </section>
</template>
```

Pause cross-field validation holds the confirmation rule until Resolve cross-field result. Completion compares that confirmation value with the current source, not a remote service or a source snapshot from submission start. Changing the source while waiting yields a dependency error; correcting confirmation and retrying with Enter succeeds. Native reset settles local tasks, clears values and the submitted snapshot, retains the history count and prevents late submission. Suspension/disposal also clean pending tasks. Cyclic dependencies and arbitrary request ordering remain unverified.

### Text and numeric fields

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

### Boolean and choice fields

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

### Selection fields

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

### Hierarchical fields

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

### Date fields

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

### Time fields

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

### Progress and rating fields

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

### Attachment fields

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

### Standalone panel actions

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

### Label and content decoration

Example source: src/form/example/demos/en-US/decoration.vue

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ name: '', notes: '' })
</script>

<template>
  <mp-form :model="model" layout="vertical">
    <mp-form-item
      field="name"
      label="Public name"
      required
      show-colon
      tooltip="Shown on your profile."
      :label-attrs="{ for: 'decorated-name' }"
    >
      <mp-input id="decorated-name" v-model="model.name" placeholder="Enter a public name" />
    </mp-form-item>
    <mp-form-item
      field="notes"
      label="Notes"
      label-component="div"
      :content-flex="false"
      content-class="decoration-grid"
    >
      <mp-input v-model="model.notes" placeholder="Custom content layout" />
      <small>Use content-flex=false to own the layout.</small>
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

### Disabled, readonly and asynchronous confirmation

Lint follow-up (2026-10-19): current scoped/root lint, configured types, 300 related regressions and SFC compilation pass after pre-existing formatting corrections. This run did not change business source; the 1200ms delay, cancellation signal and once-only settlement remain intact. Example compilation is not native-browser acceptance; automation remains paused.

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

### Cross-page range boundaries

Compare date, month and year ranges with 2027-01-01, 2026-12 and 2100 disabled. Disabled values cannot be endpoints, but a range may span them; navigate across pages to observe their disabled appearance.

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

### Presentation status

Explicit validate-status overrides automatic presentation without changing validation results. Only error shows errors; other statuses show help. Automatic validation goes validating → success/error; clearValidate restores the unvalidated state. A message-only setFields sets error; empty status/message clears it.

Example source: src/form/example/demos/en-US/presentation-status.vue

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
      <mp-form-item
        label="Presentation status"
        feedback
        :validate-status="status"
        help="Explicit status controls presentation, not validation results."
      >
        <mp-input placeholder="Choose a status above" />
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

### Independent async fields

State-command addendum: public `clearValidate()` and `setFields()` also invalidate a pending native submission, including field-scoped calls. Old completion cannot append submit events after a clear or explicit error; a fresh native submission still validates normally. The earlier exclusion below now applies only to editing without revalidation. The Demo keeps old tasks available for manual settlement; this does not cancel real requests.

Explicit validate() or validateField() invalidates a pending older native submit. The imperative result is independent: an older submit must not later combine stale errors or success with the current model. A fresh native submit still waits for its own fields and notifies once. This is logical invalidation, not request cancellation, and retains submission history. Method signatures are unchanged; stale mixed notifications are not retained for compatibility. This does not define editing-only snapshot behavior.

Resolve newest username/code settle the latest task for that field, letting a newer submit finish before older results return. An old failure cannot append a submission or restore errors after new success; old success cannot append a submission or clear new errors after new failure. Both newest field results are still required. The original resolve buttons continue to settle the oldest task.

Native submit uses latest-submission-wins: starting another submit invalidates the older submit/submit-success/submit-failed continuation. Submit guest/bad, change to admin/1234, and submit again. Resolving the two old results must leave Native submissions at 0 while the new submission waits for both of its own fields. The inverse old-valid/new-invalid combination must not report early success. This does not cancel a real request or define snapshots for edits without resubmission.

Calling resetFields, including a native reset, while native submit is pending invalidates that submission. Settling its old promises must not emit submit, submit-success, or submit-failed. Suspension and disposal also invalidate pending submissions; a fresh submission still validates normally. This is logical invalidation, not remote request cancellation, and does not define concurrent-submit or async cross-field dependency behavior.

Submit async form is a native submit button inside the form; Enter on the focused button also submits. Its separate Native submissions count increases only after both local async fields settle. An early invalid username result does not submit; resolving code then records failure. Correct the name to admin, retry, and resolve code before username to record success and clear errors. The lower Result describes imperative validation only. Reset after completion clears fields but retains submission history. Sequential retry does not demonstrate concurrent submits or async cross-field dependencies.

Reset after the name result has returned while the code result is still pending, then immediately enter new values and validate again. Resolving the oldest code task only settles the old run: it must neither restore old errors nor finish the new whole-form run. Resolve both new tasks to finish. Check old-failure/new-success and old-success/new-failure combinations; the Demo separately guards its result text and does not cancel a real request.

Both field rules return independent local promises. Resolve either field first: its feedback can update, but whole-form validation stays pending until both finish. Reset invalidates old feedback and the Demo result; pending tasks remain available to settle manually. This is an imperative validate() example, not native submit-event concurrency or a cross-field dependency.

Start validation with old values, change both values, then select “Validate both fields” again. Each resolve button settles that field's oldest task. Completing the old whole-form run must leave the latest run pending until both of its own fields finish; old success or failure must not overwrite current field feedback. The Demo separately guards its result text with a run number. Form does not cancel old requests automatically, and this is not a native submit-concurrency protocol.

Example source: src/form/example/demos/en-US/async-fields.vue

```vue
<script setup>
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'
import ModelOutput from '../../components/ModelOutput.vue'

const formRef = ref()
const id = useId()
const model = reactive({ name: '', code: '' })
const pending = shallowRef([])
const submissions = ref(0)
const submittedResult = ref('-')
function submitted({ errors }) {
  submissions.value++
  submittedResult.value = errors ? 'Invalid' : 'Valid'
}
const result = ref('Not validated')
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
  result.value = 'Validating'
  const errors = await formRef.value?.validate()
  if (current === run) {
    result.value = errors ? 'Invalid' : 'Valid'
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
        ? 'Username must be admin'
        : 'Code must be 1234',
  )
}
function reset() {
  run++
  formRef.value?.resetFields()
  result.value = 'Reset'
}
function clear() {
  run++
  formRef.value?.clearValidate()
  result.value = 'Cleared'
}
function serverError() {
  run++
  formRef.value?.setFields({ name: { status: 'error', message: 'Synthetic server rejection' } })
  result.value = 'Server error'
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
    <p>Two independent local Promise rules: admin and 1234. Resolve each field separately; no network is used.</p>
    <mp-form ref="formRef" :model="model" @submit="submitted">
      <mp-form-item
        field="name"
        label="Username"
        :label-attrs="{ for: id + '-name' }"
        :rules="nameRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-name'" v-model="model.name" />
      </mp-form-item>
      <mp-form-item
        field="code"
        label="Code"
        :label-attrs="{ for: id + '-code' }"
        :rules="codeRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-code'" v-model="model.code" />
      </mp-form-item>
      <mp-button html-type="submit">Submit async form</mp-button>
    </mp-form>
    <mp-button html-type="button" @click="clear">Clear validation</mp-button>
    <mp-button html-type="button" @click="serverError">Set server error</mp-button>
    <p class="async-submit-status">Native submissions：{{ submissions }}；Result：{{ submittedResult }}</p>
    <mp-space wrap>
      <mp-button @click="validate">Validate both fields</mp-button>
      <mp-button :disabled="!pending.some((item) => item.field === 'name')" @click="complete('name')"
        >Resolve username</mp-button
      >
      <mp-button :disabled="!pending.some((item) => item.field === 'code')" @click="complete('code')"
        >Resolve code</mp-button
      >
      <mp-button :disabled="!pending.some((item) => item.field === 'name')" @click="complete('name', true)"
        >Resolve newest username</mp-button
      >
      <mp-button :disabled="!pending.some((item) => item.field === 'code')" @click="complete('code', true)"
        >Resolve newest code</mp-button
      >
      <mp-button @click="reset">Reset both fields</mp-button>
    </mp-space>
    <p role="status">
      Result:{{ result }}; Username pending:{{ pending.filter((item) => item.field === 'name').length }}; Code
      pending:{{ pending.filter((item) => item.field === 'code').length }}
    </p>
    <ModelOutput>{{ model }}</ModelOutput>
  </section>
</template>
```

### Intro

Provides the ability to control all form components. Use with `FormItem`.

- With `FormItem.label`: outer label (vertical / horizontal); floating placeholder on Input / Select is turned off automatically.
- Without `FormItem.label`: controls keep floating placeholder (`placeholder` + `hint`).

### Async validation response order

This local Promise rule only accepts admin and never accesses the network. Automatic validation triggers are disabled. Validate guest, then admin; resolve the newest result before the oldest to check that an old error does not overwrite the latest field state. The Demo protects its result text with a request sequence; the validated value is a snapshot, not a server submission.

Clear validation or reset while requests are pending, then resolve old results. Unmounting or deactivating settles local requests. Real applications should cancel requests and protect submission snapshots and versions.

Toggle disabled or readonly while waiting: these restrict control interaction, but do not automatically cancel pending validation or clear errors. The external validation controls are outside the disabled Form. Clear validation or reset explicitly to invalidate old results; remove restrictions to edit and validate again.

Turn off Mount async field to remove the field while retaining its model and pending tasks. Remount it, validate again, and resolve results in either order to check that an old instance cannot overwrite the new field's errors. This does not delete business data or define a concurrent whole-form submission protocol.

While validation is pending, Set server error writes an explicit error with `setFields`. Earlier async success or failure must not overwrite it. The Demo retains old tasks for manual completion and separately versions its status text. Clear validation removes the error; a newly started validation can then replace it with its own result. This does not cancel a real network request.

Validate whole form calls `validate()`, while Validate field calls `validateField('name')`. Interleave these operations and resolve old/new promises in either order to observe field feedback and the latest Demo result. Reset invalidates pending results without canceling a real service. This single-field example does not demonstrate multi-field aggregation, cross-field dependencies, or native submit-event concurrency.

Example source: src/form/example/demos/en-US/async-race.vue

```vue
<template>
  <section class="async-race-form-demo">
    <p>The local async rule only accepts admin. Resolve the oldest or newest request manually; no network is used.</p>
    <mp-form ref="formRef" presentation="inline" :model="model" :disabled="disabled" :readonly="readonly">
      <mp-form-item
        v-if="mounted"
        field="name"
        label="Username"
        :label-attrs="{ for: demoId }"
        :rules="rules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="demoId" v-model="model.name" presentation="inline" placeholder="Enter admin" />
      </mp-form-item>
    </mp-form>
    <div class="async-race-controls">
      <mp-checkbox v-model="disabled" presentation="inline">Disable async form</mp-checkbox>
      <mp-checkbox v-model="readonly" presentation="inline">Readonly async form</mp-checkbox>
      <mp-checkbox v-model="mounted" presentation="inline">Mount async field</mp-checkbox>
    </div>
    <mp-space wrap>
      <mp-button :disabled="!mounted" @click="validate">Validate field</mp-button>
      <mp-button :disabled="!mounted" @click="validateAll">Validate whole form</mp-button>
      <mp-button :disabled="!pending.length" @click="complete(false)">Resolve oldest</mp-button>
      <mp-button :disabled="!pending.length" @click="complete(true)">Resolve newest</mp-button>
      <mp-button :disabled="!mounted" @click="serverError">Set server error</mp-button>
      <mp-button @click="clear">Clear validation</mp-button>
      <mp-button @click="reset">Reset</mp-button>
    </mp-space>
    <p role="status">Validation result: {{ result }}; Pending: {{ pending.length }}</p>
    <p>Validated value: {{ checkedValue || 'empty' }}</p>
    <ModelOutput>{{ model }}</ModelOutput>
  </section>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'
import type { FormInstance } from '@maple-design/ui'
import ModelOutput from '../../components/ModelOutput.vue'

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
const result = ref('Not validated')
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
  result.value = 'Validating'
  const errors = await (all ? formRef.value?.validate() : formRef.value?.validateField('name'))
  if (current === run) {
    result.value = errors ? 'Invalid' : 'Valid'
  }
}
function complete(latest: boolean) {
  const task = latest ? pending.value.at(-1) : pending.value[0]
  if (!task) {
    return
  }
  pending.value = pending.value.filter((item) => item !== task)
  task.resolve(task.value === 'admin' ? true : 'Username must be admin')
}
function clear() {
  run++
  formRef.value?.clearValidate()
  result.value = 'Cleared'
}
function serverError() {
  run++
  formRef.value?.setFields({ name: { status: 'error', message: 'Simulated server rejection' } })
  result.value = 'Server error'
}
function reset() {
  run++
  formRef.value?.resetFields()
  checkedValue.value = ''
  result.value = 'Reset'
}
function cleanup() {
  run++
  result.value = 'Canceled'
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

## FormItem

### Intro

Form item for labels, validation rules, and error messages. Use with `Form` and form controls.

- With `label`: outer label layout; Input / Select automatically disable floating `hint`.
- Without `label`: no outer label; controls keep floating placeholder mode.

### Outer Label (aligned with Cedar)

Pass `label` to use an outer label and `layout="vertical"` to stack the label and control.

Example source: src/form/example/demos/en-US/vertical-label.vue

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
      label="Username"
      required
      :rules="[(value) => !!value || 'Username is required']"
      :validate-trigger="['input', 'change']"
    >
      <mp-input v-model="formData.username" placeholder="Please input" />
    </mp-form-item>
    <mp-form-item
      field="password"
      label="Password"
      help="At least 8 characters"
      :rules="[
        (value) => !!value || 'Password is required',
        (value) => value.length >= 8 || 'Use at least 8 characters',
      ]"
    >
      <mp-input v-model="formData.password" type="password" placeholder="Please input" />
    </mp-form-item>
    <mp-button block status="primary" @click="form?.validate()">Validate</mp-button>
  </mp-form>
</template>
```

### Horizontal Layout

Use `layout="horizontal"` to place labels beside controls. A FormItem can override the form layout.

Example source: src/form/example/demos/en-US/horizontal-layout.vue

```vue
<script setup>
import { reactive } from 'vue'

const formData = reactive({ username: '', department: '' })
</script>

<template>
  <mp-form :model="formData" layout="horizontal">
    <mp-form-item field="username" label="Username" required>
      <mp-input v-model="formData.username" placeholder="Please input" />
    </mp-form-item>
    <mp-form-item field="department" label="Department">
      <mp-select v-model="formData.department" placeholder="Please select">
        <mp-option label="Product" />
        <mp-option label="Engineering" />
      </mp-select>
    </mp-form-item>
  </mp-form>
</template>
```

### Floating Placeholder (no label)

Without `label`, no outer label is rendered and Input keeps its floating placeholder.

Example source: src/form/example/demos/en-US/floating-placeholder.vue

```vue
<script setup>
import { reactive } from 'vue'

const formData = reactive({ username: '', password: '' })
</script>

<template>
  <mp-form :model="formData">
    <mp-form-item field="username" required :rules="[(value) => !!value || 'Username is required']">
      <mp-input v-model="formData.username" placeholder="Username" />
    </mp-form-item>
    <mp-form-item field="password" :rules="[(value) => !!value || 'Password is required']">
      <mp-input v-model="formData.password" type="password" placeholder="Password" />
    </mp-form-item>
  </mp-form>
</template>
```

### Help and Extra Content

Use `help` for guidance and `extra` for supplementary information.

Example source: src/form/example/demos/en-US/help-extra.vue

```vue
<script setup>
import { reactive } from 'vue'

const formData = reactive({ email: '' })
</script>

<template>
  <mp-form :model="formData">
    <mp-form-item field="email" label="Email" help="Used for notifications" extra="Optional">
      <mp-input v-model="formData.email" placeholder="Please input" />
    </mp-form-item>
  </mp-form>
</template>
```

### Custom Form Control

Custom controls use `FormItem.useFormItem` (or `Form.useFormItem`) to participate in validation.

The demo uses a native button with checkbox semantics and Enter/Space activation. Read `mergedDisabled` / `mergedReadonly` to inherit Form and FormItem state. Omitted boolean settings stay `undefined`, avoiding accidental overrides. Notify `eventHandlers.onChange` after updating the model and forward focus/blur events.

Example source: src/form/example/demos/en-US/custom-control.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import MpCustomFormComponent from '../../CustomFormComponent.vue'

const formData = reactive({ confirmed: false })
const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)
</script>

<template>
  <mp-space>
    <mp-checkbox v-model="disabled" presentation="inline">Disable form</mp-checkbox>
    <mp-checkbox v-model="readonly" presentation="inline">Readonly field</mp-checkbox>
  </mp-space>
  <mp-form ref="form" presentation="inline" :model="formData" :disabled="disabled">
    <mp-form-item
      field="confirmed"
      :readonly="readonly"
      label="Confirmation"
      help="The custom control participates in validation through useFormItem"
      :rules="[(value) => !!value || 'Please confirm']"
    >
      <mp-custom-form-component v-model="formData.confirmed">Click to toggle</mp-custom-form-component>
    </mp-form-item>
  </mp-form>
  <mp-space>
    <mp-button @click="form?.validate()">Validate</mp-button>
    <mp-button @click="form?.resetFields()">Reset</mp-button>
  </mp-space>
  <p role="status">Confirmed: {{ formData.confirmed }}</p>
</template>
```

### Interaction states

Use this example for state inherited by form controls. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

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

### The same workflow on desktop and mobile

Department, date and time explicitly use popup presentation. Change a draft, cancel, then confirm and inspect the committed model.

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

### Props

#### Form Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `id` | Native form id; an explicit value prefixes normalized field container ids | _string_ | `-` |
| `model` | The form data object, `FormItem` reads and writes to it using `field` | _Record<string, any>_ | `-` |
| `layout` | Form item layout: `vertical`, `horizontal`, or `inline`; can be overridden by `FormItem.layout` | _'vertical' \| 'horizontal' \| 'inline'_ | `'vertical'` |
| `label-align` | Label alignment | _'left' \| 'right'_ | `'right'` |
| `label-col-props` | Horizontal label Col options, including breakpoints | _FormColProps_ | `{ span: 5, offset: 0 }` |
| `wrapper-col-props` | Horizontal control Col options | _FormColProps_ | `{ span: 19, offset: 0 }` |
| `label-col-style` | Per-instance label column style | _CSSProperties_ | `-` |
| `wrapper-col-style` | Per-instance control column style | _CSSProperties_ | `-` |
| `label-col-flex` | Label flex; unit strings set width, numbers are grow ratios | _number \| string_ | `-` |
| `auto-label-width` | Align eligible horizontal labels to their maximum natural width | _boolean_ | `false` |
| `size` | Form control size inherited by FormItem and controls | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `rules` | Validation rules keyed by field name | _Record<string, rule \| rule[]>_ | `-` |
| `readonly` | Whether controls are readonly | _boolean_ | `-` |
| `disabled` | Whether controls are disabled | _boolean_ | `-` |
| `scroll-to-error` | After failed validation, scroll to the first (`start`) or last (`end`) invalid field in document order; these values do not specify viewport alignment | _'start' \| 'end'_ | `-` |
| `scroll-to-error-offset-y` | Scroll to the position offset of the form item that fails validation | _number \| string_ | `0` |

### Methods

#### Form Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `validate` | Validate all form items | `callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `validateField` | Validate the given form item(s) | `field: string \| string[]`, `callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `resetFields` | Reset the value and validation message of the form item(s) to their initial value, resets all items when `field` is omitted | `field?: string \| string[]` | `-` |
| `clearValidate` | Clear the validation message of the form item(s), clears all items when `field` is omitted | `field?: string \| string[]` | `-` |
| `setFields` | Set field values or error states in batches | `Record<string, { value?; status?; message? }>` | `-` |
| `scrollToField` | Scroll to the given form item | `field: string` | `-` |

### Events

#### Form Events

| Event | Description  | Arguments  |
| --- | --- | --- |
| `submit` | Triggered when the form is submitted | `data: { values; errors }`, `event: Event` |
| `submit-success` | Triggered after successful validation | `values`, `event: Event` |
| `submit-failed` | Triggered after failed validation | `data: { values; errors }`, `event: Event` |
| `reset` | Fired when the form is reset | `event: Event` |

### Slots

#### Form Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Form content | `-` |

## FormItem API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `field` | Field path in `Form.model`, supports `a.b` | _string_ | `''` |
| `label` | Label text; when set, renders outer label and disables floating hint | _string_ | `-` |
| `tooltip` | Label hint (hover, keyboard focus or touch click) | _string_ | `-` |
| `show-colon` | Append a colon to the label | _boolean_ | `false` |
| `label-component` | Native label element name | _string_ | `'label'` |
| `label-attrs` | Native label attributes; for targets the control's actual id | _HTMLAttributes & Record<string, unknown>_ | `-` |
| `content-class` | Content container class | _string \| array \| object_ | `-` |
| `content-flex` | Enable flex layout; disable for custom Grid | _boolean_ | `true` |
| `layout` | Layout: `vertical`, `horizontal`, or `inline`; inherits `Form.layout` when omitted | _'vertical' \| 'horizontal' \| 'inline'_ | `-` |
| `label-align` | Label alignment | _'left' \| 'right'_ | `-` |
| `label-col-props` | Horizontal label Col options, including breakpoints | _FormColProps_ | `-` |
| `wrapper-col-props` | Horizontal control Col options | _FormColProps_ | `-` |
| `label-col-style` | Per-instance label column style | _CSSProperties_ | `-` |
| `wrapper-col-style` | Per-instance control column style | _CSSProperties_ | `-` |
| `label-col-flex` | Label flex; unit strings set width, numbers are grow ratios | _number \| string_ | `-` |
| `row-props` | Form item Row options, including gutter, align, justify and wrap | _RowProps_ | `-` |
| `row-class` | Layout container class | _string \| array \| object_ | `-` |
| `required` | Required (asterisk + auto required rule) | _boolean_ | `false` |
| `hide-label` | Hide label | _boolean_ | `false` |
| `feedback` | Show input validation feedback, including pending async validation | _boolean_ | `false` |
| `validate-status` | Explicit feedback state; otherwise derived from validation | _'success' \| 'warning' \| 'error' \| 'validating'_ | `-` |
| `hide-asterisk` | Hide required asterisk | _boolean_ | `false` |
| `asterisk-position` | Asterisk position | _'start' \| 'end'_ | `'start'` |
| `help` | Help text (shown when no error) | _string_ | `-` |
| `extra` | Extra text | _string_ | `-` |
| `disabled` | Disabled; inherits Form when omitted | _boolean_ | `-` |
| `readonly` | Readonly; inherits Form when omitted | _boolean_ | `-` |
| `size` | Control size; inherits Form when omitted | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `-` |
| `no-style` | Remove label/error UI, keep validation | _boolean_ | `false` |
| `rules` | Validation rules (function / Zod / array) | _any_ | `-` |
| `validate-trigger` | Validation triggers; `clear` fires only for a control's clear action, not for `change` | _FormItemValidateTrigger \| FormItemValidateTrigger[]_ | `'change'` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `validate` | Emitted after validation | `valid: boolean` |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Form control |
| `label` | Custom label |
| `help` | Custom help |
| `extra` | Custom extra |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `validate` | Validate the field | `-` | `Promise<undefined \| ValidatedError>` |
| `clearValidate` | Clear validation status | `-` | `-` |
| `resetField` | Reset value to initial and clear validation | `-` | `-` |

### Type Definitions

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
