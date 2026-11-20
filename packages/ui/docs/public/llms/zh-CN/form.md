<!-- Source: src/form/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/form -->

# 表单

## 字段名称

在 Shadow DOM 中使用延迟编辑 Slider 时，若弹层传送到 `body`，浏览器可能无法通过 ID 将弹层内控件与 Shadow DOM 中的提示或错误关联。可设置 `:popup-container="false"`，使弹层留在同一根节点；仍需为控件提供清晰名称。

直接编辑模式下，为单个字段设置可见标签时，可将 FormItem 的 `label-attrs` 中的 `for` 与控件的 `id` 对应；选择、日期和时间字段的原生输入不会用 placeholder 覆盖已关联的标签。显式 `aria-label` 或 `aria-labelledby` 仍按原生无障碍名称规则优先。placeholder 只是未提供标签时的回退，不能替代清晰的字段标签。日期和时间范围字段在 FormItem 中会将表单标签关联到范围分组；仍需通过 `input-attrs` 分别提供能够区分起止端点的名称。若 `label-attrs.for` 指向其他控件，不会将该标签误关联到范围分组。 当前未设置 `for` 时，范围控件会引用最近的 FormItem 标签，即使同一表单项还有其他控件。混合字段请将范围控件放在独立的有样式 FormItem 中并分别命名，或通过明确的 `for` 指向实际目标并为其他控件提供独立名称。单值 Slider 在 `for` 匹配组件 `id` 时为滑块及可选数字输入关联该标签；点击默认原生标签可聚焦未禁用的滑块；阻止标签点击默认行为可取消该聚焦。范围 Slider 的 `id` 与 `for` 匹配时，表单标签命名整个分组；仍应使用 `aria-label` 数组分别命名两个端点。 `tooltip` 提示按钮可单独聚焦，其名称不会合并到字段标签中。

## 阅读方向

Form 与 FormItem 的 content-align 支持 start、end、left、center、right，label-align 支持 start、end、left、right；默认内容 start、标签 end。默认 LTR 位置保持不变，RTL 按阅读方向排列；显式 left/right 均为物理对齐。字段覆盖优先于 Form，逐实例标签列样式保持最高优先级。切换方向不重置业务值、校验结果或只读/禁用状态。

## 基础示例

### 基础表单

Example source: src/form/example/demos/example.vue

```vue
<script setup>
import { computed, reactive, ref } from 'vue'
import { onThemeChange } from '@maple-design/cli-vue/client'

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
    <mp-space direction="column" align="stretch">
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
        <mp-input-number v-model="formData.count" mode="button" edit-mode="direct" aria-label="数量" />
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

## 表单外观与布局

### 布局切换与单项覆盖

`edit-mode` 表示编辑模式：`direct` 始终显示控件；`popup` 打开移动编辑弹层。`readPretty` 是独立布尔属性。FormItem 和字段未设置时继承上层。

组合切换 `vertical`、`horizontal`、`inline` 布局与 `direct / popup` 编辑方式及独立的 `readPretty` 阅读开关，对比标签、控件、字段值及长文字换行的对齐效果，已有数据保持不变。备注项可单独覆盖布局或恢复继承。`popup` 点击字段值进入弹层并确认保存；`readPretty` 通过 `read-pretty` 展示纯文字。

`content-align` 可切换 left、center、right，在各字段模式下保持一致。FormItem 默认继承 Form，也可单独覆盖；紧凑控件在内容区内移动，输入与展示值按指定方向对齐。标签、帮助和错误信息独立排列。字段显式设置的 `text-align` 优先于继承值。

Example source: src/form/example/demos/layout-comparison.vue

```vue
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import type { FieldEditMode, FormContentAlign, FormLayout } from '@maple-design/ui-vue'

const layout = ref<FormLayout>('vertical')
const itemLayout = ref<FormLayout | 'inherit'>('inherit')
const mode = ref<FieldEditMode>('direct')
const readPretty = ref(false)
const contentAlign = ref<FormContentAlign>('start')
const contentAlignOptions = ['start', 'end', 'left', 'center', 'right'].map((value) => ({ label: value, value }))
const modeOptions = computed(() =>
  (['direct', 'popup'] as const).map((value) => ({
    label: (english.value ? { direct: 'Direct', popup: 'Popup' } : { direct: '直接编辑', popup: '弹窗编辑' })[value],
    value,
  })),
)
const model = reactive(
  english.value
    ? {
        name: 'Alex',
        department: 'Product design',
        notes: 'Review progress every Wednesday and confirm the weekly plan.',
      }
    : { name: '林晓', department: '产品设计', notes: '每周三同步进度，确认后更新本周安排。' },
)
const layouts = ['vertical', 'horizontal', 'inline'] as const
const layoutOptions = layouts.map((value) => ({ label: value, value }))
const copy = computed(() =>
  english.value
    ? {
        layout: 'Form layout',
        itemLayout: 'Notes layout',
        mode: 'Edit mode',
        readPretty: 'Read only display (readPretty)',
        contentAlign: 'Content alignment',
        inherit: 'Inherit',
        hint: 'Switch between direct and popup editing and toggle readPretty independently. Switch content-align to compare value alignment; Notes can also override the form layout.',
        modeDescription: {
          direct: 'Edit values directly in the form.',
          popup: 'Click a value to edit it in a popup; confirm to save.',
          readPretty: 'Show saved values as text. Compare alignment and wrapping with the labels.',
        },
        description: {
          vertical: 'Labels appear above controls, with each field on its own row.',
          horizontal: 'Labels appear beside controls, with each field on its own row.',
          inline: 'Fields flow alongside one another and wrap when space runs out.',
        },
        name: 'Name',
        department: 'Team',
        notes: 'Notes',
        placeholder: 'Enter a value',
        help: 'Help stays below the control as the layout changes.',
        model: 'Current values',
      }
    : {
        layout: '表单布局',
        itemLayout: '备注单项布局',
        mode: '编辑模式 edit-mode',
        readPretty: '纯阅读 readPretty',
        contentAlign: '内容对齐 content-align',
        inherit: '继承表单',
        hint: '组合切换表单布局与 direct / popup 编辑方式，并独立开关 readPretty；通过 content-align 切换内容左、中、右对齐；备注还可单独设置布局。',
        modeDescription: {
          direct: '直接在表单中编辑字段值。',
          popup: '点击字段值进入弹层，确认后保存。',
          readPretty: '以纯文字展示已保存的值，观察与标签的对齐及长文字换行。',
        },
        description: {
          vertical: '标签在上、控件在下，每个字段单独一行。',
          horizontal: '标签在左、控件在右，每个字段单独一行。',
          inline: '字段依次横向排列，空间不足时换行。',
        },
        name: '姓名',
        department: '部门',
        notes: '备注',
        placeholder: '请输入',
        help: '切换布局后，帮助文字仍显示在控件下方。',
        model: '当前数据',
      },
)
const itemLayoutOptions = computed(() => [{ label: copy.value.inherit, value: 'inherit' }, ...layoutOptions])
</script>

<template>
  <mp-space direction="column" align="stretch" :size="16" data-config-comparison="form-layout">
    <mp-form layout="vertical" edit-mode="direct">
      <mp-form-item :label="copy.layout">
        <mp-radio-group
          v-model="layout"
          :aria-label="copy.layout"
          :options="layoutOptions"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item :label="copy.itemLayout">
        <mp-radio-group v-model="itemLayout" :aria-label="copy.itemLayout" :options="itemLayoutOptions" size="sm" />
      </mp-form-item>
      <mp-form-item :label="copy.mode">
        <mp-radio-group v-model="mode" :aria-label="copy.mode" :options="modeOptions" variant="button" size="sm" />
      </mp-form-item>
      <mp-form-item :label="copy.contentAlign">
        <mp-radio-group
          v-model="contentAlign"
          :aria-label="copy.contentAlign"
          :options="contentAlignOptions"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item :label="copy.readPretty">
        <mp-checkbox v-model="readPretty" data-read-pretty-toggle>readPretty</mp-checkbox>
      </mp-form-item>
    </mp-form>
    <p>
      {{ copy.hint }}<br />{{ copy.description[layout] }}<br />{{
        copy.modeDescription[readPretty ? 'readPretty' : mode]
      }}
    </p>
    <mp-form
      class="layout-comparison-form"
      :model="model"
      :layout="layout"
      :content-align="contentAlign"
      :edit-mode="mode"
      :read-pretty="readPretty"
      label-align="left"
      label-col-flex="6rem"
    >
      <mp-form-item field="name" :label="copy.name" required>
        <mp-input v-model="model.name" :placeholder="copy.placeholder" />
      </mp-form-item>
      <mp-form-item field="department" :label="copy.department">
        <mp-input v-model="model.department" :placeholder="copy.placeholder" />
      </mp-form-item>
      <mp-form-item
        field="notes"
        :label="copy.notes"
        :layout="itemLayout === 'inherit' ? undefined : itemLayout"
        :help="copy.help"
      >
        <mp-input v-model="model.notes" :placeholder="copy.placeholder" />
      </mp-form-item>
    </mp-form>
    <p role="status">{{ copy.model }}：{{ JSON.stringify(model) }}</p>
  </mp-space>
</template>

<style scoped>
.layout-comparison-form :deep(.mp-form-item--inline) {
  width: min(100%, 22rem);
  margin-inline-end: 0;
}
p {
  margin: 0;
  overflow-wrap: anywhere;
}
</style>
```

### 标签与内容装饰

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置               | 作用                                                                                   | 相关示例                                             |
| ------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `model`            | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据                               | 布局切换与单项覆盖、标签与内容装饰、标签宽度方案对比 |
| `layout`           | 表单项布局方式，可选值为 `vertical` `horizontal` `inline`；可被 `FormItem.layout` 覆盖 | 布局切换与单项覆盖、标签与内容装饰、标签宽度方案对比 |
| `label-align`      | 标签对齐                                                                               | 标签宽度方案对比                                     |
| `auto-label-width` | 对齐参与自动计算的横向标签最大自然宽度                                                 | 标签宽度方案对比                                     |
| `label-col-flex`   | 标签 flex；单位字符串为宽度，数字为伸缩比例                                            | 标签宽度方案对比                                     |
| `label-col-props`  | 横向标签 Col 参数，支持响应式断点                                                      | 标签宽度方案对比                                     |

<!-- demo-config-notes:end -->

Example source: src/form/example/demos/decoration.vue

```vue
<script setup lang="ts">
import { reactive, useId } from 'vue'

const demoId = useId()
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
      :label-attrs="{ for: `${demoId}-name` }"
    >
      <mp-input :id="`${demoId}-name`" v-model="model.name" placeholder="输入公开名称" />
    </mp-form-item>
    <mp-form-item
      field="notes"
      label="备注"
      label-component="div"
      :label-attrs="{ id: `${demoId}-notes-label` }"
      :content-flex="false"
      content-class="decoration-grid"
    >
      <mp-input v-model="model.notes" :aria-labelledby="`${demoId}-notes-label`" placeholder="支持自定义内容布局" />
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

### 标签宽度方案对比

先输入数据，再切换自动测量、响应式栅格和固定宽度，三种方案使用同一份表单数据。修改最长标签或隐藏联系方式，观察自动测量更新。响应式方案在 576px 以下上下排列；固定宽度默认 6rem，联系方式单项覆盖为 8rem。

<details>
<summary>配置说明与使用限制</summary>

#### 响应式标签栅格

horizontal 默认标签占 5/24、内容占 19/24；Cedar 默认 horizontal，Maple 默认 vertical。只有横向布局使用栅格比例和自动宽度，响应式参数按视口断点生效。FormItem 显式覆盖 Form，Col/style 对象整项替换。label-col-flex 优先于 auto-label-width：带单位字符串表示宽度，数字表示 Col 伸缩比例，并非 px；内容填满剩余空间。隐藏标签后内容占满。自动宽度随标签变化、字段移除更新，各表单独立计算。窄屏长标签可用 vertical 或固定宽度。

</details>

Example source: src/form/example/demos/label-width-comparison.vue

```vue
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const mode = ref<'auto' | 'columns' | 'fixed'>('auto')
const showExtra = ref(true)
const customLabel = ref('')
const model = reactive({ name: '', department: '', contact: '' })
const labels = computed(() =>
  english.value
    ? {
        auto: 'Measured labels',
        columns: 'Responsive columns',
        fixed: 'Fixed width',
        name: 'Name',
        department: 'Department',
        contact: 'Contact details',
        extra: 'Show extra field',
        edit: 'Change the longest label',
        hint: 'Switch label sizing with the same model. Responsive columns stack below 576px; fixed labels use 6rem, with an 8rem override on the contact field.',
        model: 'Current model',
      }
    : {
        auto: '自动测量',
        columns: '响应式栅格',
        fixed: '固定宽度',
        name: '姓名',
        department: '部门',
        contact: '联系方式',
        extra: '显示额外字段',
        edit: '修改最长标签',
        hint: '切换标签宽度方案，输入数据保持不变。栅格在 576px 以下上下排列；固定标签为 6rem，联系方式一项覆盖为 8rem。',
        model: '当前数据',
      },
)
const choices = computed(() =>
  (['auto', 'columns', 'fixed'] as const).map((value) => ({ label: labels.value[value], value })),
)
</script>
<template>
  <div class="label-width-comparison" data-config-comparison="form-label-width">
    <mp-radio-group v-model="mode" :options="choices" aria-label="Label width strategy" />
    <p>{{ labels.hint }}</p>
    <mp-checkbox v-model="showExtra">{{ labels.extra }}</mp-checkbox>
    <label>{{ labels.edit }}<mp-input v-model="customLabel" :placeholder="labels.contact" /></label>
    <mp-form
      :model="model"
      layout="horizontal"
      label-align="left"
      :auto-label-width="mode === 'auto'"
      :label-col-flex="mode === 'fixed' ? '6rem' : undefined"
      :label-col-props="mode === 'columns' ? { span: 6, xs: 24, sm: 6 } : undefined"
      :wrapper-col-props="mode === 'columns' ? { span: 18, xs: 24, sm: 18 } : undefined"
    >
      <mp-form-item field="name" :label="labels.name"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="department" :label="labels.department"><mp-input v-model="model.department" /></mp-form-item>
      <mp-form-item
        v-if="showExtra"
        field="contact"
        :label="customLabel || labels.contact"
        :label-col-flex="mode === 'fixed' ? '8rem' : undefined"
        ><mp-input v-model="model.contact"
      /></mp-form-item>
    </mp-form>
    <p role="status">{{ labels.model }}: {{ JSON.stringify(model) }}</p>
  </div>
</template>
<style scoped>
.label-width-comparison {
  display: grid;
  gap: 12px;
  min-width: 0;
  max-width: 100%;
}
p {
  margin: 0;
  overflow-wrap: anywhere;
}
</style>
```

## 字段与数据模型

### 同一标签下的多个控件

混合使用多个控件时，为可见标签设置唯一 ID，并用它显式命名分组；每个控件也需要自己的名称。每个 FormItem 实例应使用不同的 ID。

Example source: src/form/example/demos/mixed-field-label.vue

```vue
<template>
  <mp-form-item label="Contact" label-component="span" :label-attrs="{ id: 'contact-label' }">
    <div role="group" aria-labelledby="contact-label">
      <mp-input aria-label="Email" />
      <input aria-label="Phone" />
    </div>
  </mp-form-item>
</template>
```

### 文本与数值字段

Example source: src/form/example/demos/field-components.vue

```vue
<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const editMode = ref('popup')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  name: '表单输入示例',
  notes: '每个字段都继承上方的展示与触发方式',
  count: 3,
  code: '123456',
})
</script>

<template>
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="字段展示方式">
      <mp-radio-group
        v-model="editMode"
        aria-label="字段展示方式"
        :options="presentations"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form :model="model" :edit-mode="editMode">
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

const editMode = ref('popup')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
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
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="字段展示方式">
      <mp-radio-group
        v-model="editMode"
        aria-label="字段展示方式"
        :options="presentations"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form :model="model" :edit-mode="editMode">
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

const editMode = ref('popup')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
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
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="字段展示方式">
      <mp-radio-group
        v-model="editMode"
        aria-label="字段展示方式"
        :options="presentations"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form :model="model" :edit-mode="editMode">
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

### 直接／弹窗编辑的已选区域对照

Example source: src/form/example/demos/selection-summary.vue

```vue
<script setup>
import { reactive } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

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
          edit-mode="direct"
          multiple
          clearable
          :options="options"
          aria-label="Select inline summary demo"
        />
      </mp-form-item>
      <mp-form-item label="Select · popup" field="popupSelect">
        <mp-select
          v-model="values.popupSelect"
          edit-mode="popup"
          multiple
          clearable
          :options="options"
          aria-label="Select popup summary demo"
        />
      </mp-form-item>
      <mp-form-item label="Cascader · inline" field="inlineCascader">
        <mp-cascader
          v-model="values.inlineCascader"
          edit-mode="direct"
          multiple
          clearable
          :options="options"
          aria-label="Cascader inline summary demo"
        />
      </mp-form-item>
      <mp-form-item label="Cascader · popup" field="popupCascader">
        <mp-cascader
          v-model="values.popupCascader"
          edit-mode="popup"
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

### 层级选择字段

Example source: src/form/example/demos/field-tree.vue

```vue
<script setup>
import { ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const editMode = ref('popup')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
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
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="字段展示方式">
      <mp-radio-group
        v-model="editMode"
        aria-label="字段展示方式"
        :options="presentations"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form :model="model" :edit-mode="editMode">
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

const editMode = ref('popup')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  datetime: '2026-10-20 09:30:00',
  dateTimes: ['2026-10-20 09:30:00', '2026-10-22 18:00:00'],
  day: '2026-10-19',
  days: ['2026-10-19', '2026-10-22'],
})
</script>

<template>
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="字段展示方式">
      <mp-radio-group
        v-model="editMode"
        aria-label="字段展示方式"
        :options="presentations"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form :model="model" :edit-mode="editMode">
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

const editMode = ref('popup')
const timePanelType = ref('picker')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  time: '09:30',
  times: ['09:30', '18:00'],
})
</script>

<template>
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="字段展示方式">
      <mp-radio-group
        v-model="editMode"
        aria-label="字段展示方式"
        :options="presentations"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form :model="model" :edit-mode="editMode">
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

const editMode = ref('popup')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  progress: 40,
  score: 4,
})
</script>

<template>
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="字段展示方式">
      <mp-radio-group
        v-model="editMode"
        aria-label="字段展示方式"
        :options="presentations"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form :model="model" :edit-mode="editMode">
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

const editMode = ref('popup')
const presentations = ['direct', 'popup'].map((value) => ({ value, label: value }))
const model = ref({
  attachments: [],
})
</script>

<template>
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="字段展示方式">
      <mp-radio-group
        v-model="editMode"
        aria-label="字段展示方式"
        :options="presentations"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form :model="model" :edit-mode="editMode">
      <mp-form-item field="attachments" label="附件"
        ><mp-upload v-model="model.attachments" :auto-upload="false"
      /></mp-form-item>
    </mp-form>
    <ModelOutput aria-label="当前模型">{{ JSON.stringify(model, null, 2) }}</ModelOutput>
  </mp-space>
</template>
```

## 校验与提交

### 跨字段校验与原生提交

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置       | 作用                                                     | 相关示例                                   |
| ---------- | -------------------------------------------------------- | ------------------------------------------ |
| `model`    | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据 | 跨字段校验与原生提交、清空时校验、表单控制 |
| `disabled` | 是否禁用                                                 | 表单控制                                   |
| `readonly` | 是否只读                                                 | 表单控制                                   |

<!-- demo-config-notes:end -->

“暂停跨字段校验”示例通过手动返回结果模拟异步校验。提交等待期间修改依赖字段、重置表单或卸载组件，会使该次提交失效；确认当前输入后可重新提交。

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
    <mp-form ref="formRef" edit-mode="direct" :model="model" @submit="submitted" @reset="reset">
      <mp-form-item
        field="source"
        label="源代码"
        :label-attrs="{ for: id + '-source' }"
        :rules="sourceRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-source'" v-model="model.source" edit-mode="direct" />
      </mp-form-item>
      <mp-form-item
        field="confirmation"
        label="确认代码"
        :label-attrs="{ for: id + '-confirmation' }"
        :rules="confirmationRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-confirmation'" v-model="model.confirmation" edit-mode="direct" />
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
import { Message } from '@maple-design/ui-vue'
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
  <mp-form edit-mode="direct" :model="formData" @submit="handleSubmit" @reset="handleReset">
    <mp-space direction="column" align="stretch" :size="[14, 0]">
      <mp-form-item field="username" :rules="[(value) => !!value || '用户名不能为空']">
        <mp-input v-model="formData.username" edit-mode="direct" placeholder="请输入用户名" />
      </mp-form-item>
      <mp-form-item field="password" :rules="[(value) => !!value || '密码不能为空']">
        <mp-input v-model="formData.password" edit-mode="direct" type="password" placeholder="请输入密码" />
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

## 字段呈现与交互

### 字段展示与确认提交

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置     | 作用                                                                                   | 相关示例                         |
| -------- | -------------------------------------------------------------------------------------- | -------------------------------- |
| `layout` | 表单项布局方式，可选值为 `vertical` `horizontal` `inline`；可被 `FormItem.layout` 覆盖 | 字段展示与确认提交、校验展示状态 |
| `model`  | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据                               | 字段展示与确认提交               |

<!-- demo-config-notes:end -->

Form、FormItem、Input、Select 支持 edit-mode 继承：字段 > FormItem > Form。未设置时保留字段各自的默认值；Maple 支持 direct / popup。选择字段单选默认即选即提交、多选默认确认；其他字段保留各自确认方式，readPretty 只阅读。普通 v-model 和默认插槽保持不变。Select、Cascader、AutoComplete、Date／DateRange、Time／TimeRange 默认 popup，其余字段默认 direct。

`edit-mode` 只控制字段编辑方式，不改变 `layout`、标签宽度或栅格比例。非 `vertical` 布局中，标签与右侧字段内容垂直居中，错误提示和帮助文字不参与居中。

Example source: src/form/example/demos/field-presentation.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const editMode = ref('popup')
const readPretty = ref(false)
const layout = ref('horizontal')
const layoutOptions = ['vertical', 'horizontal', 'inline'].map((value) => ({ label: value, value }))

const options = ref([
  { value: 1, label: '研发设备' },
  { value: 2, label: '设计设备' },
  { value: 3, label: '运营设备' },
])
const form = ref({ name: '默认确认后保存', deviceIds: [2], note: '此项始终直接编辑', summary: '只读展示' })
const status = ref('')

const modeOptions = ['direct', 'popup'].map((value) => ({ label: value, value }))
const committed = computed(() => JSON.stringify(form.value))
const presentationHint = computed(() =>
  readPretty.value
    ? '只展示已保存的值；下方“单项覆盖 direct”通过 readPretty=false 保持可编辑。'
    : editMode.value === 'direct'
      ? '直接编辑，即时更新下方模型；选择设备无需额外确认。'
      : '按展示方式进入编辑；确认才更新下方模型，取消不保存本次修改。',
)
</script>
<template>
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="Form 展示方式">
      <mp-radio-group v-model="editMode" aria-label="Form 展示方式" :options="modeOptions" variant="button" size="sm" />
    </mp-form-item>
    <mp-form-item layout="vertical" size="sm" label="layout">
      <mp-radio-group v-model="layout" :options="layoutOptions" variant="button" size="sm" />
    </mp-form-item>
    <mp-space wrap>
      <mp-checkbox v-model="readPretty">纯阅读 readPretty</mp-checkbox>
    </mp-space>
    <p>{{ presentationHint }}<br />前两项继承 Form 展示方式，后两项演示字段局部覆盖。</p>
    <mp-form
      :layout="layout"
      :model="form"
      :edit-mode="editMode"
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
      <mp-form-item field="note" label="单项覆盖 direct" edit-mode="direct" :read-pretty="false">
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

### edit-mode 继承规则

Form 支持 `direct / popup`，未设置时保留字段各自的默认值；FormItem 和字段继承显式设置的值，显式值覆盖。readPretty 是阅读展示，与 readonly/disabled 分开。确认编辑未结束时整表提交会失败并保留草稿；reset 取消编辑。原有默认插槽与 v-model 保持不变，不需要 editor 插槽。

### 校验展示状态

显式 validate-status 优先于自动状态；仅 error 显示错误，其他状态显示 help。它不改变 validate 的真实结果。自动校验经过 validating → success/error；clearValidate 恢复未校验状态。setFields 仅传 message 设为 error，status=''、message='' 可清空。

Example source: src/form/example/demos/presentation-status.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { FormItemValidateStatus } from '@maple-design/ui-vue'

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

### 确认事件来源

Example source: src/form/example/demos/change-source.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const model = reactive({ input: 'Draft', textarea: 'Notes', number: 1, toggle: false })
const changes = ref([])
function record(field, value, event) {
  changes.value.unshift({ field, value, source: event?.type || 'programmatic' })
}
</script>
<template>
  <section>
    <p>打开字段、修改并保存，下方显示真实确认事件。Open a field, edit and save to inspect its confirmation source.</p>
    <mp-input v-model="model.input" edit-mode="popup" @change="(value, event) => record('input', value, event)" />
    <mp-textarea
      v-model="model.textarea"
      edit-mode="popup"
      @change="(value, event) => record('textarea', value, event)"
    />
    <mp-input-number
      v-model="model.number"
      edit-mode="popup"
      @change="(value, event) => record('number', value, event)"
    />
    <mp-switch v-model="model.toggle" edit-mode="popup" @change="(value, event) => record('switch', value, event)" />
    <pre role="status">{{ JSON.stringify(changes, null, 2) }}</pre>
  </section>
</template>
```

## 动态与异步字段

### 多字段异步聚合

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置       | 作用                                                     | 相关示例                                                 |
| ---------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `model`    | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据 | 多字段异步聚合、禁用、只读与异步确认、异步校验的返回顺序 |
| `disabled` | 是否禁用                                                 | 禁用、只读与异步确认、异步校验的返回顺序                 |
| `readonly` | 是否只读                                                 | 禁用、只读与异步确认、异步校验的返回顺序                 |
| `rules`    | 按字段名配置的表单校验规则                               | 禁用、只读与异步确认                                     |

<!-- demo-config-notes:end -->

显式调用validate()或validateField()会使等待中的旧原生submit失效：命令校验有自己的结果，不应让旧submit在完成后把旧错误或成功与当前模型混发。此后新的原生submit仍正常等待自己的字段校验并通知一次。该规则仅逻辑失效、不取消真实请求，不清空历史提交计数。等待中修改模型或规则也会使本次提交失效，需重新提交校验。

“返回最新用户名结果 / 返回最新代码结果”优先结清对应字段最新任务，可让新submit先完成、旧结果最后返回。新成功后旧失败不追加提交或恢复错误；新失败后旧成功不追加提交或清除新错误。仍须等最新提交的两个字段都返回，单个字段返回不提交；默认“返回用户名/代码结果”继续返回最早任务。

原生submit采用最新提交生效：旧提交仍等待时再次提交，使旧提交的submit/submit-success/submit-failed续体失效。用guest/bad提交后改为admin/1234再提交；先返回旧两个结果，原生提交计数应仍0，新提交仍等自己的两个结果。反向旧成功/新失败同理，旧成功不能提前报通过。这个规则不取消真实请求；等待中修改模型或规则同样使旧提交失效。

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
    <mp-form ref="formRef" edit-mode="direct" :model="model" @submit="submitted">
      <mp-form-item
        field="name"
        label="用户名"
        :label-attrs="{ for: id + '-name' }"
        :rules="nameRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-name'" v-model="model.name" edit-mode="direct" />
      </mp-form-item>
      <mp-form-item
        field="code"
        label="代码"
        :label-attrs="{ for: id + '-code' }"
        :rules="codeRules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="id + '-code'" v-model="model.code" edit-mode="direct" />
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

### 禁用、只读与异步确认

Example source: src/form/example/demos/presentation-state.vue

```vue
<script setup>
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const form = ref()
const editMode = ref('popup')
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
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="异步保存场景">
      <mp-radio-group v-model="scenario" aria-label="异步保存场景" :options="scenarios" variant="button" size="sm" />
    </mp-form-item>
    <mp-checkbox v-model="disabled">禁用状态示例</mp-checkbox>
    <mp-checkbox v-model="readonly">只读状态示例</mp-checkbox>
    <p>编辑名称、备注或部门并保存，模拟等待 1.2 秒。选择保存结果，或在等待时禁用、只读、重置，观察草稿是否提交。</p>
    <mp-form ref="form" :model="model" :edit-mode="editMode" :disabled="disabled" :readonly="readonly" :rules="rules">
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
    <mp-form ref="formRef" edit-mode="direct" :model="model" :disabled="disabled" :readonly="readonly">
      <mp-form-item
        v-if="mounted"
        field="name"
        label="用户名"
        :label-attrs="{ for: demoId }"
        :rules="rules"
        :validate-trigger="[]"
        feedback
      >
        <mp-input :id="demoId" v-model="model.name" edit-mode="direct" placeholder="请输入 admin" />
      </mp-form-item>
    </mp-form>
    <div class="async-race-controls">
      <mp-checkbox v-model="disabled" edit-mode="direct">Disable async form</mp-checkbox>
      <mp-checkbox v-model="readonly" edit-mode="direct">Readonly async form</mp-checkbox>
      <mp-checkbox v-model="mounted" edit-mode="direct">Mount async field</mp-checkbox>
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
import type { FormInstance } from '@maple-design/ui-vue'
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

### 异步提交的输入归属

原生提交只接受本次校验期间保持有效的响应式模型和规则。等待中修改任意模型字段（包括其他字段或改后恢复）、替换模型/规则、修改 FormItem 的规则/required/field，或增删已注册字段，会使本次提交失效。旧校验成功或失败都不再触发 submit、submit-success、submit-failed，也不触发自动错误滚动；需重新提交校验最新输入。这是逻辑失效，不取消请求、不自动重试，也不改变命令式 validate 的返回约定；已有提交历史保留。业务模型应使用响应式状态，让 Vue 能观察到输入变化。普通事件监听器返回的 Promise 不被收集。

Example source: src/form/example/demos/submit-inputs.vue

```vue
<script setup lang="ts">
import { onBeforeUnmount, onDeactivated, reactive, ref, shallowRef, useId } from 'vue'

const id = useId()
const model = reactive({ name: 'allowed' })
const pending = shallowRef<{ value: unknown; resolve: (result: boolean | string) => void }[]>([])
const submissions = ref(0)
const snapshot = ref('-')
function request(value: unknown) {
  return new Promise<boolean | string>((resolve) => {
    pending.value = [...pending.value, { value, resolve }]
  })
}
const rules = [(value: unknown) => request(value)]
function complete() {
  const [task, ...rest] = pending.value
  if (!task) {
    return
  }
  pending.value = rest
  task.resolve(task.value === 'allowed' ? true : '请输入 allowed / Enter allowed')
}
function submitted(data: { values: Record<string, unknown>; errors?: unknown }) {
  submissions.value++
  snapshot.value = JSON.stringify({ values: data.values, valid: !data.errors })
}
function cleanup() {
  const tasks = pending.value
  pending.value = []
  tasks.forEach((task) => task.resolve(false))
}
onBeforeUnmount(cleanup)
onDeactivated(cleanup)
</script>
<template>
  <section>
    <p>
      提交后修改输入，再返回旧结果：提交次数仍为 0。重新提交并返回本次结果，才会通知。Edit while waiting, then resolve:
      submit again to validate the new input.
    </p>
    <mp-form :model="model" edit-mode="direct" @submit="submitted">
      <mp-form-item field="name" label="Name" :label-attrs="{ for: id }" :rules="rules" :validate-trigger="[]" feedback>
        <mp-input :id="id" v-model="model.name" edit-mode="direct" />
      </mp-form-item>
      <mp-space>
        <mp-button html-type="submit">提交 / Submit</mp-button>
        <mp-button html-type="button" :disabled="!pending.length" @click="complete"
          >返回最早结果 / Resolve oldest</mp-button
        >
      </mp-space>
    </mp-form>
    <p role="status">Submissions: {{ submissions }}; pending: {{ pending.length }}</p>
    <pre class="submitted-values">{{ snapshot }}</pre>
  </section>
</template>
```

### 动态字段与重置初值

复用同一个 FormItem 时，field 变化会自动释放旧字段注册，并注册新的非空字段；清空 field 会取消注册。每个字段路径在该实例内保留首次可用初值，重访字段不会用当前编辑值覆盖初值。reset 按字段克隆初值，0、false、null 和缺失的 undefined 都保留。切换身份会取消旧编辑器、清理旧反馈，并使旧字段集合的校验回调失效；已经启动的命令式校验 Promise 仍独立结算，调用方管理自己的结果文案。

已有模型对象中的缺失属性会记录为 undefined；替换模型或规则不重新建立已缓存初值。异步数据若应作为初值，可在数据就绪后绑定 field 或渲染 FormItem；重新创建实例会建立新的初值基线。

Example source: src/form/example/demos/field-identity.vue

```vue
<script setup>
import { reactive, ref, useId } from 'vue'

const id = useId()
const form = ref()
const model = reactive({ a: 'A initial', b: 'B initial' })
const field = ref('a')
const submissions = ref(0)
const result = ref('-')
function reset() {
  if (field.value) {
    form.value?.resetFields(field.value)
  }
}
function submitted(data) {
  submissions.value++
  result.value = data.errors ? 'invalid' : 'valid'
}
</script>
<template>
  <section>
    <p>
      同一个 FormItem 切换 A/B：编辑后重置，各自回到第一次绑定时的初值。The same item retains a separate initial value
      for each field.
    </p>
    <mp-space wrap>
      <mp-button :disabled="field === 'a'" @click="field = 'a'">绑定 A / Bind A</mp-button>
      <mp-button :disabled="field === 'b'" @click="field = 'b'">绑定 B / Bind B</mp-button>
      <mp-button :disabled="!field" @click="field = ''">取消绑定 / Unbind</mp-button>
    </mp-space>
    <mp-form ref="form" :model="model" edit-mode="direct" @submit="submitted">
      <mp-form-item
        :field="field"
        :label="field ? 'Field ' + field.toUpperCase() : 'Unbound'"
        :label-attrs="{ for: id }"
        required
        feedback
        :validate-trigger="[]"
      >
        <mp-input v-if="field" :id="id" v-model="model[field]" edit-mode="direct" />
        <span v-else>尚未绑定字段 / No bound field</span>
      </mp-form-item>
      <mp-space>
        <mp-button html-type="button" :disabled="!field" @click="reset">重置当前字段 / Reset current</mp-button>
        <mp-button html-type="submit" :disabled="!field">校验并提交 / Validate and submit</mp-button>
      </mp-space>
    </mp-form>
    <p role="status">Field: {{ field || '-' }}; submissions: {{ submissions }}; result: {{ result }}</p>
    <pre class="field-model">{{ JSON.stringify(model) }}</pre>
  </section>
</template>
```

## FormItem 表单项

### 介绍

表单项组件，负责渲染标签、校验规则和错误信息。需与 `Form`、表单控件配合使用。

- 传入 `label`：外置标签布局，Input / Select 会自动关闭浮动 `hint`。
- 不传 `label`：不渲染外置标签，控件继续使用浮动 placeholder。

### 外置标签

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

在 `setup` 中调用 `useFormErrorDescription()`，将返回的 `describe(existingIds)` 绑定到实际交互元素的 `aria-describedby`，可保留已有描述并随 FormItem 错误显示或清除同步错误 ID。控件不在 FormItem 内时仅保留已有描述。

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
    <mp-checkbox v-model="disabled" edit-mode="direct">禁用表单</mp-checkbox>
    <mp-checkbox v-model="readonly" edit-mode="direct">只读字段</mp-checkbox>
  </mp-space>
  <mp-form ref="form" edit-mode="direct" :model="formData" :disabled="disabled">
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
        ><mp-input v-model="model.title" edit-mode="direct" placeholder="输入任务名称"
      /></mp-form-item>
      <mp-form-item label="负责部门" field="department"
        ><mp-select v-model="model.department" :options="departments" edit-mode="popup" placeholder="选择部门"
      /></mp-form-item>
      <mp-form-item label="执行日期" field="date"
        ><mp-date v-model="model.date" edit-mode="popup" placeholder="选择日期"
      /></mp-form-item>
      <mp-form-item label="执行时间" field="time"
        ><mp-time v-model="model.time" edit-mode="popup" placeholder="选择时间"
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
        ><mp-input v-model="draft.title" edit-mode="direct" placeholder="例如：展厅设备巡检"
      /></mp-form-item>
      <mp-form-item label="执行部门" field="department"
        ><mp-select v-model="draft.department" :options="departments" edit-mode="popup"
      /></mp-form-item>
      <mp-form-item label="任务优先级" field="priority"
        ><mp-select v-model="draft.priority" :options="priorities" edit-mode="popup"
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
    <mp-collapse>
      <mp-collapse-item title="查看已提交记录" name="saved">
        <pre>{{
          saved ? JSON.stringify(saved, null, 2) : '尚无记录；校验失败、返回修改或保存失败都不会创建记录。'
        }}</pre>
      </mp-collapse-item>
    </mp-collapse>
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

### 空值标记与必填校验

接口用 -1 表示未选择。点击“校验”会显示必填错误；选择部门后再次校验通过。点击清空返回 -1，再次校验失败。Form 统一提供识别列表，字段单独指定清空输出；自定义校验仍收到原值。

Example source: src/form/example/demos/empty-values-validation.vue

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ department: -1 as number | null | undefined })
const form = ref()
const result = ref('尚未校验')
const options = [
  { value: 1, label: '研发' },
  { value: 2, label: '产品' },
]
async function validate() {
  const errors = await form.value.validate()
  result.value = errors ? '存在必填错误' : '校验通过'
}
</script>
<template>
  <mp-space direction="column">
    <p>先校验初始 -1，再选择部门并校验；点击清空后会回到 -1。</p>
    <mp-form ref="form" :model="model" layout="vertical" :empty-values="[null, undefined, -1]">
      <mp-form-item field="department" label="部门" required>
        <mp-select v-model="model.department" :options="options" edit-mode="direct" clearable :empty-value="-1" />
      </mp-form-item>
    </mp-form>
    <mp-button @click="validate">校验</mp-button>
    <p role="status">{{ result }}</p>
    <p>
      当前模型: <output>{{ String(model.department) }}</output>
    </p>
  </mp-space>
</template>
```

### 阅读空文案与配置继承

初始为阅读模式，姓名继承 Form 的默认“-”，编号使用 FormItem 的“未分配”，昵称使用字段的“匿名”，数量 0 保持可见。切换空文案只影响继承的字段；切换阅读/编辑不改模型。优先级为字段 > FormItem > Form；自定义 read 插槽优先。

Example source: src/form/example/demos/empty-text.vue

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const reading = ref(true)
const emptyText = ref('-')
const model = reactive({
  name: null as string | null,
  code: null as string | null,
  nickname: null as string | null,
  quantity: 0 as number | null | undefined,
})
</script>
<template>
  <mp-space direction="column">
    <p>初始阅读模式：姓名显示“-”，编号和昵称使用各自覆盖；数量 0 仍显示 0。</p>
    <mp-space wrap>
      <mp-button @click="reading = !reading">切换阅读/编辑</mp-button>
      <mp-button @click="emptyText = '暂无'">使用“暂无”</mp-button>
      <mp-button @click="emptyText = '-'">使用默认“-”</mp-button>
    </mp-space>
    <mp-form :model="model" layout="vertical" :read-pretty="reading" :empty-text="emptyText">
      <mp-form-item field="name" label="姓名：继承 Form"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="code" label="编号：覆盖 FormItem" empty-text="未分配"
        ><mp-input v-model="model.code"
      /></mp-form-item>
      <mp-form-item field="nickname" label="昵称：覆盖字段" empty-text="未分配"
        ><mp-input v-model="model.nickname" empty-text="匿名"
      /></mp-form-item>
      <mp-form-item field="quantity" label="数量"><mp-input-number v-model="model.quantity" /></mp-form-item>
    </mp-form>
    <p>
      当前模型: <output>{{ JSON.stringify(model) }}</output>
    </p>
  </mp-space>
</template>
```

## 使用说明

### 校验结果与异常

函数规则返回 true 表示通过，返回错误文字或 false 表示业务校验不通过。意外 throw 或 Promise 拒绝仍会使公开 `validate()` 拒绝，调用方需要处理该异常；当前任务会释放 validating，不合成新的业务错误，之前已有的业务错误消息继续保留。旧任务异常不会清理更新任务的等待状态。

## API

通过 edit-mode 设置编辑方式，通过 read-pretty 设置阅读状态。内部描述符名称 fieldEditModeProp 不是 Form 或 FormItem 的公开属性。

### 空值识别与阅读空文案

Form / FormItem 通过 `empty-values` 提供空值识别策略；字段自己的 `empty-value` 决定清空输出。`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Form Props

| 参数                       | 说明                                                                                                    | 类型                                     | 默认值                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------- |
| `id`                       | 表单原生 id；显式设置时作为字段容器 id 前缀（嵌套路径归一化）                                           | _string_                                 | `-`                       |
| `model`                    | 表单数据对象，`FormItem` 通过 `field` 从中读取和写入数据                                                | _Record<string, any>_                    | `-`                       |
| `layout`                   | 表单项布局方式，可选值为 `vertical` `horizontal` `inline`；可被 `FormItem.layout` 覆盖                  | _'vertical' \| 'horizontal' \| 'inline'_ | `'vertical'`              |
| `label-align`              | 标签对齐                                                                                                | _'start' \| 'end' \| 'left' \| 'right'_                      | `'end'`                 |
| `content-align`            | 内容对齐，统一控制 direct 字段、弹出入口及 readPretty；与 label-align 独立                              | `'start' \| 'end' \| 'left' \| 'center' \| 'right'`          | `'start'`                  |
| `read-pretty`              | 独立的阅读开关；为 true 时展示已保存的值，关闭后恢复当前 edit-mode 的编辑方式；FormItem 未传时继承 Form | `boolean`                                | `-`                       |
| `edit-mode`                | 表单内字段的统一编辑模式；未设置时保留各字段默认值                                                      | `'direct' \| 'popup'`                    | `-`                       |
| `label-col-props`          | 横向标签 Col 参数，支持响应式断点                                                                       | _FormColProps_                           | `{ span: 5, offset: 0 }`  |
| `wrapper-col-props`        | 横向内容 Col 参数                                                                                       | _FormColProps_                           | `{ span: 19, offset: 0 }` |
| `label-col-style`          | 标签列逐实例样式                                                                                        | _CSSProperties_                          | `-`                       |
| `wrapper-col-style`        | 内容列逐实例样式                                                                                        | _CSSProperties_                          | `-`                       |
| `label-col-flex`           | 标签 flex；单位字符串为宽度，数字为伸缩比例                                                             | _number \| string_                       | `-`                       |
| `auto-label-width`         | 对齐参与自动计算的横向标签最大自然宽度                                                                  | _boolean_                                | `false`                   |
| `size`                     | 表单控件尺寸，由 FormItem 和控件继承                                                                    | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_   | `-`                       |
| `rules`                    | 按字段名配置的表单校验规则                                                                              | `FormRules`         | `-`                       |
| `readonly`                 | 是否只读                                                                                                | _boolean_                                | `-`                       |
| `disabled`                 | 是否禁用                                                                                                | _boolean_                                | `-`                       |
| `scroll-to-error`          | 校验失败后滚动到页面顺序的第一个（`start`）或最后一个（`end`）错误字段；不是视口对齐方式                | _'start' \| 'end'_                       | `-`                       |
| `scroll-to-error-offset-y` | 滚动到校验不通过的表单项的位置偏移量                                                                    | _number \| string_                       | `0`                       |

### Form Methods

| 方法名          | 说明                                                            | 参数                                                       | 返回值                                                 |
| --------------- | --------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| `validate`      | 触发表单组件的校验                                              | `callback?: (errors) => void`                              | `Promise<undefined \| Record<string, ValidatedError>>` |
| `validateField` | 触发指定表单项的校验                                            | `field: string \| string[]`、`callback?: (errors) => void` | `Promise<undefined \| Record<string, ValidatedError>>` |
| `resetFields`   | 重置表单项的值和校验信息为初始值，不传 `field` 则重置所有表单项 | `field?: string \| string[]`                               | `-`                                                    |
| `clearValidate` | 清空表单项的校验信息，不传 `field` 则清空所有表单项             | `field?: string \| string[]`                               | `-`                                                    |
| `setFields`     | 批量设置表单项的值或错误状态                                    | `Record<string, { value?; status?; message? }>`            | `-`                                                    |
| `scrollToField` | 滚动到指定的表单项                                              | `field: string`                                            | `-`                                                    |

### Form Events

| 事件名           | 说明           | 参数                                       |
| ---------------- | -------------- | ------------------------------------------ |
| `submit`         | 表单提交时触发 | `data: { values; errors }`、`event: Event` |
| `submit-success` | 校验成功时触发 | `values`、`event: Event`                   |
| `submit-failed`  | 校验失败时触发 | `data: { values; errors }`、`event: Event` |
| `reset`          | 表单重置时触发 | `event: Event`                             |

### Form Slots

| 插槽名    | 说明     | 参数 |
| --------- | -------- | ---- |
| `default` | 表单内容 | `-`  |

### FormItem Props

| 参数                | 说明                                                                                                    | 类型                                                   | 默认值           |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------- |
| `field`             | 对应 `Form.model` 中的字段路径，支持 `a.b`                                                              | _string_                                               | `''`             |
| `label`             | 标签文本；有值时渲染外置标签，并自动关闭控件浮动 hint                                                   | _string_                                               | `-`              |
| `tooltip`           | 标签提示；支持悬停、键盘聚焦和触摸点击                                                                  | _string_                                               | `-`              |
| `show-colon`        | 标签后显示冒号                                                                                          | _boolean_                                              | `false`          |
| `label-component`   | 标签原生元素名                                                                                          | _string_                                               | `'label'`        |
| `label-attrs`       | 标签原生属性；for 应指向控件的真实 id                                                                   | _HTMLAttributes & Record<string, unknown>_             | `-`              |
| `content-class`     | 内容容器 class                                                                                          | _string \| array \| object_                            | `-`              |
| `content-flex`      | 内容层启用 flex；业务 Grid 布局可关闭                                                                   | _boolean_                                              | `true`           |
| `layout`            | 布局方式，可选值为 `vertical` `horizontal` `inline`；未传时继承 `Form.layout`                           | _'vertical' \| 'horizontal' \| 'inline'_               | `-`              |
| `label-align`       | 标签对齐                                                                                                | _'start' \| 'end' \| 'left' \| 'right'_                                    | `-`              |
| `content-align`     | 内容对齐，统一控制 direct 字段、弹出入口及 readPretty；与 label-align 独立                              | `'start' \| 'end' \| 'left' \| 'center' \| 'right'`                        | `-`（继承 Form） |
| `read-pretty`       | 独立的阅读开关；为 true 时展示已保存的值，关闭后恢复当前 edit-mode 的编辑方式；FormItem 未传时继承 Form | `boolean`                                              | `-`              |
| `edit-mode`         | 编辑模式；未设置时继承 Form，字段可单独覆盖                                                             | `'direct' \| 'popup'`                                  | `-`              |
| `label-col-props`   | 横向标签 Col 参数，支持响应式断点                                                                       | _FormColProps_                                         | `-`              |
| `wrapper-col-props` | 横向内容 Col 参数                                                                                       | _FormColProps_                                         | `-`              |
| `label-col-style`   | 标签列逐实例样式                                                                                        | _CSSProperties_                                        | `-`              |
| `wrapper-col-style` | 内容列逐实例样式                                                                                        | _CSSProperties_                                        | `-`              |
| `label-col-flex`    | 标签 flex；单位字符串为宽度，数字为伸缩比例                                                             | _number \| string_                                     | `-`              |
| `row-props`         | 表单项 Row 参数；支持 gutter、align、justify、wrap                                                      | _RowProps_                                             | `-`              |
| `row-class`         | 布局容器 class                                                                                          | _string \| array \| object_                            | `-`              |
| `required`          | 是否必填（显示星号，并自动追加必填规则）                                                                | _boolean_                                              | `false`          |
| `hide-label`        | 是否隐藏标签                                                                                            | _boolean_                                              | `false`          |
| `feedback`          | 在输入框显示校验反馈图标，异步校验期间显示加载状态                                                      | _boolean_                                              | `false`          |
| `validate-status`   | 手动指定反馈状态；省略时由校验结果决定                                                                  | _'success' \| 'warning' \| 'error' \| 'validating'_    | `-`              |
| `hide-asterisk`     | 是否隐藏必填星号                                                                                        | _boolean_                                              | `false`          |
| `asterisk-position` | 必填星号在字段标签中的逻辑 start/end 位置，默认 start；不是表单或浮层位置                               | _'start' \| 'end'_                                     | `'start'`        |
| `help`              | 帮助文案（无错误时展示）                                                                                | _string_                                               | `-`              |
| `extra`             | 额外文案                                                                                                | _string_                                               | `-`              |
| `disabled`          | 是否禁用；未传时继承 Form                                                                               | _boolean_                                              | `-`              |
| `readonly`          | 是否只读；未传时继承 Form                                                                               | _boolean_                                              | `-`              |
| `size`              | 控件尺寸；未传时继承 Form                                                                               | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_                 | `-`              |
| `no-style`          | 去除标签与错误信息样式，仅保留校验能力                                                                  | _boolean_                                              | `false`          |
| `rules`             | 校验规则（函数 / Zod / 数组）                                                                           | `FormRule \| FormRule[]`                                                  | `-`              |
| `validate-trigger`  | 触发校验的时机；`clear` 仅由控件清空动作触发，不等同于 `change`                                         | _FormItemValidateTrigger \| FormItemValidateTrigger[]_<br>`FormItemValidateTrigger: 'input' \| 'change' \| 'focus' \| 'blur' \| 'clear'` | `'change'`       |

### FormItem Events

| 事件名     | 说明           | 参数             |
| ---------- | -------------- | ---------------- |
| `validate` | 校验完成时触发 | `valid: boolean` |

### FormItem Slots

| 插槽名    | 说明           |
| --------- | -------------- |
| `default` | 表单控件       |
| `label`   | 自定义标签     |
| `help`    | 自定义帮助信息 |
| `extra`   | 自定义额外信息 |

### FormItem Methods

| 方法名          | 说明                         | 参数 | 返回值                                 |
| --------------- | ---------------------------- | ---- | -------------------------------------- |
| `validate`      | 触发校验                     | `-`  | `Promise<undefined \| ValidatedError>` |
| `clearValidate` | 清空校验状态                 | `-`  | `-`                                    |
| `resetField`    | 重置字段值到初始值并清空校验 | `-`  | `-`                                    |

## Types

```ts
type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'
type FormItemLayout = 'vertical' | 'horizontal' | 'inline'
```

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Maple 规则协议

FormRules 是按字段名组织的 FormRule 或其数组。FormRule 支持函数或 Zod schema，不接受 Cedar FieldRule 规则对象；开发环境对不支持的规则结构给出属性诊断。必填校验和星号使用 FormItem.required，不使用只有装饰、没有实际校验的 rules.required 对象。函数接收 `(value, context)`，context 含当前 model 和 field；候选保存校验使用候选模型。正常返回 true 才表示通过，其他返回值按 String 转为错误文字；可返回 Promise。Zod 通过 safeParseAsync 运行，取首条 issue 的 message。

意外 throw 或 Promise 拒绝会让公开 validate 拒绝，调用方用 try/catch 处理；最新任务会释放 validating，保留之前的业务错误，不转成业务失败通知。旧任务异常不会清除新任务的等待状态。FormItem 的 validate 事件仅通知最新正常结算的布尔结果，不承担任务执行。Form.useValidation、Form.useForm、Form.useFormItem 和 FormItem.useFormItem 保持现有组合扩展职责。

```ts
import type { FormRule, FormRules, FormRuleContext } from '@maple-design/ui-vue'
const nameRule: FormRule<string> = async (value, context) => {
  await Promise.resolve()
  return value.length > 0 || `${context.field} is required`
}
const rules: FormRules = { name: nameRule }
```

### 公开校验与通知合同

Form 与 FormItem 的默认插槽没有作用域参数；FormItem 还提供 label、help、extra 插槽，均不通过参数操作模型。Form 使用 model 对象及字段路径管理状态，不以插槽参数替代业务模型。

`validate(callback?)` 和 `validateField(fields, callback?)` 等待对应规则，成功返回 undefined，业务失败返回按字段聚合的错误对象；回调只通知当前有效任务。错误记录包含 field、message、label、value、type、isRequiredError。value 保留原字段值，不先转换成显示文字。

submit-success 先于 submit 通知，业务校验失败时 submit-failed 先于 submit。编辑会话未完成的阻止分支只通知 submit-failed，其 errors.editing 只有 field="editing" 与 message，不伪造字段校验信息；公开类型 FormSubmitError 区分该提示与完整 ValidatedError。

这些事件是通知，不等待监听器 Promise，也不自动执行请求或切换 loading。业务异步保存自行控制 loading。原生 reset 会阻止默认行为、执行 resetFields 后通知 reset；Form 的 resetFields 会写回 model，与 FilterForm 内部 Form 的职责不同。

`beforeCommit` 属于支持编辑事务的字段组件，签名为 `(payload, done, context) => void | boolean | Promise<void | boolean>`；payload 含 value、previousValue，context 含 signal 和可选 event。返回 undefined 表示等待 done；返回布尔或 Promise 按结果结算。它不是 Form 的 submit 事件或通用加载入口。

```ts
import type {
  FormProps, FormItemProps, FormInstance, FormItemInstance,
  ValidatedError, FormValidateErrors, FieldData,
  FormEmits, FormSlots, FormItemSlots, FormSubmitError,
  BeforeFieldCommit,
} from '@maple-design/ui-vue'
```

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-form-extra-margin-top` | `6px` | `margin-top` |
| `--mp-form-extra-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-form-extra-text-font-size` | `12px` | `font-size` |
| `--mp-form-help-line-height` | `1.4` | `line-height` |
| `--mp-form-item-asterisk-margin` | `4px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-form-item-label-gap` | `12px` | `margin-inline-end`, `padding-inline-end` |
| `--mp-form-item-label-width` | `88px` | `flex`, `width` |
| `--mp-form-label-line-height` | `1.4` | `line-height` |
| `--mp-form-label-min-height` | `24px` | `min-height` |
| `--mp-form-label-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-form-required-symbol-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-form-size-md-item-margin-bottom` | `16px` | `margin-bottom` |
| `--mp-form-size-md-label-font-size` | `14px` | `font-size` |
| `--mp-form-tooltip-margin-left` | `var(--mp-sys-space-2)` | `padding-inline-start` |
| `--mp-form-tooltip-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-form-vertical-label-margin-bottom` | `8px` | `margin-bottom` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-form-extra-text-color: var(--mp-sys-color-content-secondary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
