<!-- Source: src/search/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/search -->

# 搜索

先看关键词与提交，再看字段模型，最后接入历史记录和自定义展示；业务请求由外部处理。

### 介绍

搜索组件用于在列表、结果页或顶部工具栏中输入关键词并触发查询，内置搜索图标、清除按钮和可选取消按钮。

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

## 基础示例

### 基础用法

Example source: src/search/example/demos/basic.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')
const submitted = ref('')
function handleSearch(result) {
  submitted.value = result.modelValue
}
</script>

<template>
  <mp-search v-model="value" label="地址" placeholder="搜索" @search="handleSearch" />
  <p role="status">搜索结果：{{ submitted || '尚未搜索' }}</p>
</template>
```

## 外观与状态

### 搜索框形状

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| ------------- | ------------------------------------- | ---------- |
| `placeholder` | 占位符 | 搜索框形状 |
| `shape` | 内层搜索框形状，可选 `round` `square` | 搜索框形状 |

<!-- demo-config-notes:end -->

Example source: src/search/example/demos/shape.vue

```vue
<script setup>
import { ref } from 'vue'

const squareValue = ref('')
</script>

<template>
  <mp-search v-model="squareValue" placeholder="搜索" shape="square" />
</template>
```

## 数据与选项

### 搜索按钮

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| ----------------- | ------------------------------------------------- | ---------------------------------- |
| `recent-searches` | 受控搜索历史 | 搜索按钮、带下拉字段选择、搜索历史 |
| `placeholder` | 占位符 | 搜索按钮、搜索历史 |
| `show-action` | 是否显示操作按钮 | 搜索按钮、搜索历史 |
| `action-type` | 操作类型，可选 `cancel` `search` | 搜索按钮、搜索历史 |
| `action-text` | 操作按钮文字 | 搜索按钮、搜索历史 |
| `edit-mode` | 搜索编辑方式：direct 为直接搜索，popup 为弹层搜索 | 搜索按钮、带下拉字段选择 |

<!-- demo-config-notes:end -->

Example source: src/search/example/demos/search-button.vue

```vue
<script setup>
import { ref } from 'vue'

const searchButtonValue = ref('')
const menuHistoryValue = ref('')
const menuRecentSearches = ref(['设备名称', '订单编号', '操作人'])
function handleSearch(result) {
  console.log('search', result)
}
function handleMenuHistorySearch(result) {
  menuRecentSearches.value = result.recentSearches
  handleSearch(result)
}
</script>

<template>
  <mp-search
    v-model="searchButtonValue"
    placeholder="搜索"
    show-action
    action-type="search"
    action-text="搜索"
    @search="handleSearch"
  />

  <mp-search
    v-model="menuHistoryValue"
    placeholder="搜索"
    :recent-searches="menuRecentSearches"
    edit-mode="direct"
    show-action
    action-type="search"
    action-text="搜索"
    @search="handleMenuHistorySearch"
  />
</template>
```

### 带下拉字段选择

Example source: src/search/example/demos/fields.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SearchResult } from '@maple-design/ui-vue'

const field = ref('name')
const model = ref<Record<string, unknown>>({ name: '设备 A', tenant: 'demo' })
const accepted = ref(true)
const history = ref(['设备 A', '42'])
const result = ref<SearchResult>()
const fields = [
  { value: 'name', label: '设备名称', placeholder: '输入名称' },
  { value: 'id', label: '设备 ID', placeholder: '输入 ID' },
]
function updateModel(proposal: Record<string, unknown>) {
  if (accepted.value) {
    model.value = proposal
  }
}
function updateField(proposal: string) {
  if (accepted.value) {
    field.value = proposal
  }
}
function search(next: SearchResult) {
  result.value = next
  history.value = next.recentSearches
}
</script>
<template>
  <div class="search-demo">
    <mp-checkbox v-model="accepted">接受输入与清空（关闭后父级拒绝更新）</mp-checkbox>
    <mp-search
      :model="model"
      :model-field="field"
      :fields="fields"
      :recent-searches="history"
      edit-mode="direct"
      search-button
      button-text="搜索"
      clearable
      @update:model="updateModel"
      @update:model-field="updateField"
      @search="search"
    />
    <mp-button variant="text" @click="model = { name: '外部替换', tenant: 'demo' }">外部替换模型</mp-button>
    <div>已接受模型：{{ model }}</div>
    <p v-if="!accepted" role="status">父级正在拒绝输入和清空；打开上方开关后恢复。</p>
    <pre v-if="result">{{ JSON.stringify(result, null, 2) }}</pre>
  </div>
</template>
<style scoped>
.search-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 100%;
}
.search-demo pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
```

### 搜索历史

组件不会内置持久化；业务侧可在 `search` 事件中接收并保存 `result.recentSearches`。

Example source: src/search/example/demos/history.vue

```vue
<script setup>
import { ref } from 'vue'

const historyValue = ref('')
const recentSearches = ref(['Maple', 'Cedar', 'InputNumber'])
function handleSearch(result) {
  console.log('search', result)
}
function handleHistorySearch(result) {
  recentSearches.value = result.recentSearches
  handleSearch(result)
}
</script>

<template>
  <mp-search
    v-model="historyValue"
    placeholder="搜索"
    :recent-searches="recentSearches"
    show-action
    action-type="search"
    action-text="搜索"
    @search="handleHistorySearch"
  />
</template>
```

## 自定义与插槽

### 历史展示与插槽

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| ----------------- | ------------------------------------------------- | -------------- |
| `edit-mode` | 搜索编辑方式：direct 为直接搜索，popup 为弹层搜索 | 历史展示与插槽 |
| `recent-searches` | 受控搜索历史 | 历史展示与插槽 |
| `label` | 标签内容；外层 label 关联关键词输入 | 历史展示与插槽 |
| `placeholder` | 占位符 | 历史展示与插槽 |
| `clearable` | 是否可清除 | 历史展示与插槽 |
| `show-action` | 是否显示操作按钮 | 历史展示与插槽 |

<!-- demo-config-notes:end -->

Example source: src/search/example/demos/presentation.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SearchResult } from '@maple-design/ui-vue'

const keyword = ref('')
const popup = ref(false)
const history = ref(['项目 A', '设备 B'])
const lastAction = ref('尚未搜索')
function recordSearch(result: SearchResult) {
  history.value = result.recentSearches
  lastAction.value = result.modelValue ?? ''
}
function recordAction(result: SearchResult) {
  lastAction.value = result.modelValue ?? ''
}
</script>
<template>
  <div class="search-demo">
    <mp-checkbox v-model="popup">popup 全屏搜索（关闭后为 direct）</mp-checkbox>
    <mp-search
      v-model="keyword"
      :edit-mode="popup ? 'popup' : 'direct'"
      :recent-searches="history"
      label="资源"
      placeholder="输入资源名称"
      clearable
      show-action
      action-text="取消"
      @cancel="lastAction = '已取消'"
      @search="recordSearch"
    />
    <mp-search
      v-model="keyword"
      search-button
      :button-props="{ variant: 'outline' }"
      placeholder="自定义按钮插槽"
      @search="recordAction"
    >
      <template #button-icon><span aria-hidden="true">⌕</span></template>
      <template #button-default>查找</template>
    </mp-search>
    <div>最近操作：{{ lastAction }}</div>
  </div>
</template>
<style scoped>
.search-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 100%;
}
</style>
```

## 内容与展示

### 取消按钮

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| ------------- | ---------------- | -------- |
| `placeholder` | 占位符 | 取消按钮 |
| `show-action` | 是否显示操作按钮 | 取消按钮 |
| `action-text` | 操作按钮文字 | 取消按钮 |

<!-- demo-config-notes:end -->

Example source: src/search/example/demos/action.vue

```vue
<script setup>
import { ref } from 'vue'

const actionValue = ref('')
</script>

<template>
  <mp-search v-model="actionValue" placeholder="搜索" show-action action-text="取消" />
</template>
```

## 交互与控制

### 交互状态切换

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| ------------- | ------------------------------------- | ------------------ |
| `placeholder` | 占位符 | 交互状态切换、状态 |
| `disabled` | 是否禁用 | 交互状态切换、状态 |
| `shape` | 内层搜索框形状，可选 `round` `square` | 交互状态切换 |
| `readonly` | 是否只读 | 交互状态切换 |

<!-- demo-config-notes:end -->

适用于关键词输入与搜索提交。调整禁用、只读，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

Example source: src/search/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const squareValue = ref('')
const __demoState = __demoReactive({ disabled: false, readonly: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
    </mp-space>
    <mp-search v-model="squareValue" placeholder="搜索" shape="square" v-bind="__demoState" />
  </mp-space>
</template>
```

### 状态

Example source: src/search/example/demos/state.vue

```vue
<script setup>
import { ref } from 'vue'

const disabledValue = ref('Disabled')
</script>

<template>
  <mp-search v-model="disabledValue" placeholder="搜索" disabled />
</template>
```

### 共享字段加载

`loading-mode="line"` 使用 FieldDecorator 的共享加载线；默认模式保留本组件已有的加载展示。加载状态本身不隐式设置 disabled 或 readonly。

### 原生表单与弹层身份

活动关键词输入独占配置的 id；外侧参照和关闭后缓存的输入使用不同内部 id，并退出辅助技术和 Tab 顺序。可见 label 关联对应输入，ariaLabel 优先于标签文案；字段选择器提供字段选择语义，关键词输入使用独立名称。

原生 FormData 始终由外侧参照输入提供一份 name/value；弹层编辑器即时更新同一模型，不重复提交 name。需要弹层参与 HTML 必填等约束校验时，请给 form 设置 id，并用 inputAttrs.form 显式关联。关闭时编辑器释放表单校验归属，缓存输入不会拦截后续提交。

popup 中输入即时更新 v-model；cancel 结束历史界面，业务负责取消自己的请求。非空 recent-searches 才会打开历史界面，切换为阅读模式会释放历史状态。loading 由业务控制，编辑仍可用，重复搜索被阻止；普通 search/change 通知返回的 Promise 不控制等待。

Example source: src/search/example/demos/native-form.vue

```vue
<script setup>
import { ref, useId } from 'vue'

const uid = useId()
const formId = 'native-search-form-' + uid
const inputId = 'native-search-query-' + uid
const helpId = 'native-search-help-' + uid
const form = ref()
const query = ref('report')
const waiting = ref(false)
const loadingMode = ref('default')
const searchEvents = ref(0)
const submitted = ref([])
function submit() {
  if (waiting.value || !form.value) {
    return
  }
  submitted.value = [...new form.value.ownerDocument.defaultView.FormData(form.value).entries()]
}
</script>
<template>
  <section>
    <p>编辑历史弹层后提交，关键词只提交一份。Edit in history, then submit one native keyword value.</p>
    <mp-space wrap>
      <mp-button html-type="button" @click="waiting = !waiting">切换等待 / Toggle waiting</mp-button>
      <mp-button html-type="button" @click="loadingMode = loadingMode === 'default' ? 'line' : 'default'"
        >切换加载布局 / Toggle loading layout</mp-button
      >
    </mp-space>
    <form :id="formId" ref="form" @submit.prevent="submit">
      <mp-search
        v-model="query"
        label="关键词 / Keywords"
        edit-mode="popup"
        :recent-searches="['report', 'invoice']"
        :loading="waiting"
        :loading-mode="loadingMode"
        :input-attrs="{ id: inputId, name: 'keyword', form: formId, required: true, 'aria-describedby': helpId }"
        @search="searchEvents++"
      />
      <p :id="helpId">
        输入即时更新；HTML 必填校验关联此表单。Edits update immediately; native required validation belongs to this
        form.
      </p>
      <mp-button html-type="submit" :disabled="waiting">记录原生表单 / Capture native form</mp-button>
    </form>
    <p>阅读预览 / Reading preview</p>
    <mp-search :model-value="query" read-pretty :loading="waiting" :loading-mode="loadingMode" />
    <pre class="native-search-results" role="status">{{
      JSON.stringify({ submitted, searchEvents, query, waiting, loadingMode })
    }}</pre>
  </section>
</template>
```

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数 | 类型 | 缺省与范围 |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text | string | 字段 > FormItem > Form > '-'；显式 '' 有效 |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Search Props

| 参数 | 说明 | 类型 | 默认值 |
| -------------------------- | ------------------------------------------------- | ------------------------- | -------------------------- |
| `v-model` | 搜索关键词 | `string \| null` | `-` |
| `default-value` | 非受控默认关键词 | _string_ | `''` |
| `v-model:model-field` | 当前搜索字段 | _string_ | `-` |
| `default-field` | 非受控默认字段 | _string_ | `-` |
| `v-model:model` | 字段搜索模式下按字段写入的对象 | _Record<string, unknown>_ | `-` |
| `fields` | 搜索字段可选项 | _SearchField[]_ | `[]` |
| `select-style` | 字段选择器样式 | _StyleValue_ | `-` |
| `recent-searches` | 受控搜索历史 | _string[]_ | `[]` |
| `max-search-history-count` | 生成下一份历史时保留的最大数量 | _number_ | `5` |
| `edit-mode` | 搜索编辑方式：direct 为直接搜索，popup 为弹层搜索 | `'direct' \| 'popup'` | `'direct'` |
| `search-button` | 是否显示公共搜索按钮 | _boolean_ | `false` |
| `button-text` | 公共搜索按钮文字 | _string_ | `-` |
| `button-props` | 公共搜索按钮属性 | _ButtonProps_ | `-` |
| `loading` | 手动等待展示；保持编辑，阻止重复搜索 | _boolean_ | `false` |
| `clearable` | 是否可清除 | _boolean_ | `false` |
| `variant` | 输入框风格，可选 `filled` `outline` `standard` | _string_ | `outline` |
| `size` | 输入尺寸，继承 Form / ConfigProvider | `xs / sm / md / lg / xl` | `md` |
| `placeholder` | 占位符 | _string_ | `-` |
| `disabled` | 未设置时继承 FormItem/Form；显式 false 可覆盖 | _boolean_ | `undefined` |
| `readonly` | 未设置时继承 FormItem/Form；显式 false 可覆盖 | _boolean_ | `undefined` |
| `label` | 关键词标签；字段选择器模式下提供名称回退 | _string_ | `-` |
| `shape` | 内层搜索框形状，可选 `round` `square` | _string_ | `round` |
| `background` | 外层背景色 | _string_ | `-` |
| `input-background` | 内层搜索框背景色 | _string_ | `-` |
| `show-action` | 是否显示操作按钮 | _boolean_ | `false` |
| `action-text` | 操作按钮文字 | `string` | 跟随全局语言与 action-type |
| `action-type` | 操作类型，可选 `cancel` `search` | _string_ | `cancel` |
| `search-icon` | 搜索图标名称 | _string_ | `search` |
| `max-length` | 有限非负长度或 `{ length, errorOnly? }`；0 不限；非法值提示并回退不限 | `InputMaxLength` | `0` |
| `enterkeyhint` | 虚拟键盘回车键提示 | _string_ | `search` |
| `read-pretty` | 纯阅读展示；继承 FormItem/Form | `boolean` | `undefined` |
| `loading-mode` | 编辑态加载布局：默认指示器或底部加载线；阅读态使用统一等待指示 | `default / line` | `default` |
| `model-modifiers` | 模型修饰符；沿用 Input 的 trim 行为 | `{ trim?: boolean }` | `{}` |
| `type` | 关键词输入类型；继承 Input 类型约束 | `InputType`<br>`'number' \| 'text' \| 'email' \| 'tel' \| 'password'` | `text` |
| `aria-label` | 关键词输入的可访问名称，优先于 label | `string` | `undefined` |
| `autofocus` | 初始自动聚焦 | `boolean` | `false` |
| `text-color` | 关键词文字颜色 | `string` | `undefined` |
| `focus-color` | 聚焦提示和支持的边框颜色 | `string` | `undefined` |
| `blur-color` | 未聚焦提示颜色 | `string` | `undefined` |
| `input-attrs` | 原生输入属性；活动编辑器身份和单份表单提交由组件管理 | `Record<string, unknown>` | `undefined` |
| `error` | 错误状态；继承 FormItem | `boolean` | `undefined` |
| `empty-value` | 清空输出；省略为空字符串，支持 null 或工厂 | `string \| null \| (() => string \| null)` | `undefined` |

### Search Events

| 事件名 | 说明 | 回调参数 |
| ------------------- | ---------------------------------------- | ------------------------------------ |
| `update:modelValue` | 关键词更新时触发 | `value: string \| null` |
| `update:modelField` | 字段更新时触发 | `field: string` |
| `update:model` | 字段表单更新时触发 | `model: Record<string, unknown>` |
| `input` | 输入期间触发 | `value: string, event: Event` |
| `change` | 失焦、Enter 提交或切换字段时触发 | `value: string \| null, event: Event` |
| `clear` | 清除时触发 | `event: Event` |
| `search` | 点击图标/按钮、按 Enter 或选择历史时触发 | `result: SearchResult, event: Event` |
| `focus` | 聚焦时触发 | `event: FocusEvent` |
| `blur` | 失焦时触发 | `event: FocusEvent` |
| `cancel` | 点击移动端取消按钮时触发 | `event: Event` |

### Search Slots

| 名称 | 说明 | 参数 |
| ---------------- | ------------------------------------ | ----------- |
| `prefix` | 输入框前缀；提供后将替换默认搜索图标 | `-` |
| `suffix` | 输入框后缀 | `-` |
| `clear-icon` | 清除图标 | `{ clear: (event?: Event) => void }` |
| `button-default` | 公共搜索按钮内容 | `-` |
| `button-icon` | 公共搜索按钮图标 | `-` |
| `label` | 标签内容；外层 label 关联关键词输入 | `-` |
| `action` | 操作按钮内容 | `-` |
| `read` | 自定义阅读内容 | `{ value: string \| null, text: string }` |

### Search Methods

| 方法名 | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-` | `-` |
| `blur` | 失焦 | `-` | `-` |

## Types

### SearchField

| 参数 | 说明 | 类型 |
| ------------- | ------------------------------------------ | -------- |
| `label` | 标签内容；外层 label 关联关键词输入 | _string_ |
| `value` | 字段值 | _string_ |
| `placeholder` | 字段占位符，优先于 Search 的 `placeholder` | _string_ |

### SearchResult

| 参数 | 说明 | 类型 |
| ---------------- | -------------- | -------------------------------------- |
| `modelField` | 搜索字段 | _string \| undefined_ |
| `modelValue` | 原始搜索关键词 | `string \| null` |
| `model` | 字段表单对象 | _Record<string, unknown> \| undefined_ |
| `recentSearches` | 下一份搜索历史 | _string[]_ |

输入事件约定：编辑时先 `input`、再 `update:modelValue`；失焦提交仅在值变化时触发 `change`。清空依次触发 `clear → input → update:modelValue → change`，各一次，同时只更新一次搜索字段模型，不自动执行搜索。

输入事件先于模型更新。Enter 会等待 Input 提交及受控模型回填后生成搜索结果；父级拒绝 trim 提议时，搜索仍使用实际受控值。清空按 clear → input → update:modelValue → change 通知，不自动执行搜索。

## 受控模型协议

值优先级为 `modelValue` > `model[当前字段]` > 非受控 `defaultValue`。传入 `model` 且存在当前字段时，缺失/null 字段显示空字符串；同时绑定多个模型时，应在父级保持它们一致。`modelField` 优先于 `defaultField` 和第一项字段；受控值不会被内部强制覆盖。

`model` **不会被原地修改**。每次逻辑更新发出一份 `update:model` 新对象，清空已声明的其他字段、保留未声明属性；请使用 `v-model:model` 或显式接受提议。字段切换只产生一次 `update:modelField → update:modelValue → update:model → change`。父级可拒绝提议，Enter、按钮、历史项搜索均等待一轮更新后读取实际接受的字段、关键词和模型。

历史不按输入过滤，也不内部持久化；`search` 返回的新历史统一 trim、去空、去重并截取最大数量。空关键词不添加记录，非有限/负数最大数量按 0 处理。清空不执行搜索；取消提议空字符串并发出 cancel/change，不提交搜索。

输入编辑发出 `input → update:modelValue`；提交值变化时才发出 `change`。清空为 `clear → input → update:modelValue → change`，仅一次。只读、禁用、loading 会阻止搜索/取消/历史/字段操作；禁用和只读可继承 Form / FormItem / InputGroup。失活或卸载会取消未完成的异步搜索。

### 平台差异

两端默认 edit-mode=direct；Cedar 默认 shape=square，Maple 默认 shape=round。Cedar 保留外侧 InputGroup，Maple 使用移动搜索条布局和触控间距。Input 支持五种尺寸，外层条密度通过 Search 的 CSS 变量控制。

### 公开类型

`SearchEditMode`、`SearchProps`, `SearchEmits`, `SearchSlots`, `SearchExpose`, `SearchField`, `SearchResult`.

### Input 属性透传

inputAttrs 的原生 name、form、ARIA 和数据属性按编辑器归属传递；autocomplete 沿用 Input 的 off 策略。组件管理 id、name、tabindex、aria-hidden 和等待状态，保证活动输入和缓存输入不争用原生身份。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-search-action-color-text` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-search-action-font-size` | `16px` | `font-size` |
| `--mp-search-action-spacing-inline-start` | `16px` | `margin-inline-start` |
| `--mp-search-color-bg` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-search-color-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-search-field-color-bg` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-search-field-radius` | `4px` | `border-radius` |
| `--mp-search-field-size-min-height` | `36px` | `border-radius`, `line-height`, `min-height` |
| `--mp-search-field-spacing-padding` | `0 12px` | `padding` |
| `--mp-search-history-item-color-border` | `var(--mp-sys-color-border-default)` | `border-bottom` |
| `--mp-search-history-item-color-text` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-search-history-item-size-min-height` | `44px` | `min-height` |
| `--mp-search-history-spacing-padding` | `8px 16px 24px` | `padding` |
| `--mp-search-icon-spacing` | `8px` | `margin-inline-end` |
| `--mp-search-label-color-text` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-search-label-font-size` | `16px` | `font-size` |
| `--mp-search-label-spacing-inline-end` | `10px` | `margin-inline-end` |
| `--mp-search-opacity-disabled` | `0.6` | `opacity` |
| `--mp-search-select-icon-size` | `18px` | `font-size` |
| `--mp-search-select-icon-spacing` | `2px` | `margin-inline-start` |
| `--mp-search-select-size-max-width` | `120px` | `max-width` |
| `--mp-search-select-size-min-width` | `96px` | `min-width` |
| `--mp-search-size-icon` | `20px` | `font-size` |
| `--mp-search-size-min-height` | `48px` | `min-height` |
| `--mp-search-spacing-padding` | `8px 16px` | `padding` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-search-action-color-text: var(--mp-sys-color-content-primary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
