<!-- Source: src/search/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/search -->

# 搜索

## 案例

先看关键词与提交，再看字段模型，最后接入历史记录和自定义展示；业务请求由外部处理。

### 介绍

搜索组件用于在列表、结果页或顶部工具栏中输入关键词并触发查询，内置搜索图标、清除按钮和可选取消按钮。

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

### 搜索按钮

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
    presentation="inline"
    show-action
    action-type="search"
    action-text="搜索"
    @search="handleMenuHistorySearch"
  />
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

### 搜索框形状

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

### 取消按钮

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

### 交互状态切换

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

### 带下拉字段选择

Example source: src/search/example/demos/fields.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SearchResult } from '@maple-design/ui'

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
      presentation="inline"
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

### 历史展示与插槽

Example source: src/search/example/demos/presentation.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SearchResult } from '@maple-design/ui'

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
    <mp-checkbox v-model="popup">popup 全屏搜索（关闭后为 inline）</mp-checkbox>
    <mp-search
      v-model="keyword"
      :presentation="popup ? 'popup' : 'inline'"
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

## API

### 属性

| 参数                       | 说明                                            | 类型                      | 默认值     |
| -------------------------- | ----------------------------------------------- | ------------------------- | ---------- |
| `v-model`                  | 搜索关键词                                      | _string_                  | `-`        |
| `default-value`            | 非受控默认关键词                                | _string_                  | `''`       |
| `v-model:model-field`      | 当前搜索字段                                    | _string_                  | `-`        |
| `default-field`            | 非受控默认字段                                  | _string_                  | `-`        |
| `v-model:model`            | 字段搜索模式下按字段写入的对象                  | _Record<string, unknown>_ | `-`        |
| `fields`                   | 搜索字段可选项                                  | _SearchField[]_           | `[]`       |
| `select-style`             | 字段选择器样式                                  | _StyleValue_              | `-`        |
| `recent-searches`          | 受控搜索历史                                    | _string[]_                | `[]`       |
| `max-search-history-count` | 生成下一份历史时保留的最大数量                  | _number_                  | `5`        |
| `presentation` | 搜索展示方式：inline 历史菜单，popup 全屏搜索 | `'inline' \| 'popup'` | `'inline'` |
| `search-button`            | 是否显示公共搜索按钮                            | _boolean_                 | `false`    |
| `button-text`              | 公共搜索按钮文字                                | _string_                  | `-`        |
| `button-props`             | 公共搜索按钮属性                                | _ButtonProps_             | `-`        |
| `loading`                  | 是否处于加载状态；加载时禁止提交                | _boolean_                 | `false`    |
| `clearable`                | 是否可清除                                      | _boolean_                 | `false`    |
| `variant`                  | 输入框风格，可选 `filled` `outline` `standard`  | _string_                  | `outline`  |
| `size` | 输入尺寸，继承 Form / ConfigProvider | `xs / sm / md / lg / xl` | `md` |
| `placeholder`              | 占位符                                          | _string_                  | `-`        |
| `disabled`                 | 是否禁用                                        | _boolean_                 | `false`    |
| `readonly`                 | 是否只读                                        | _boolean_                 | `false`    |
| `label`                    | 搜索框左侧文本                                  | _string_                  | `-`        |
| `shape`                    | 内层搜索框形状，可选 `round` `square`           | _string_                  | `round`    |
| `background`               | 外层背景色                                      | _string_                  | `-`        |
| `input-background`         | 内层搜索框背景色                                | _string_                  | `-`        |
| `show-action`              | 是否显示操作按钮                          | _boolean_                 | `false`    |
| `action-text` | 操作按钮文字 | `string` | 跟随全局语言与 action-type |
| `action-type`              | 操作类型，可选 `cancel` `search`          | _string_                  | `cancel`   |
| `search-icon`              | 搜索图标名称                                    | _string_                  | `magnify`  |
| `max-length`               | 最大长度                                        | _string \| number_        | `-`        |
| `enterkeyhint`             | 虚拟键盘回车键提示                              | _string_                  | `search`   |

### 事件

| 事件名              | 说明                                     | 回调参数                             |
| ------------------- | ---------------------------------------- | ------------------------------------ |
| `update:modelValue` | 关键词更新时触发                         | `value: string`                      |
| `update:modelField` | 字段更新时触发                           | `field: string`                      |
| `update:model`      | 字段表单更新时触发                       | `model: Record<string, unknown>`     |
| `input`             | 输入期间触发                             | `value: string, event: Event`        |
| `change`            | 失焦、Enter 提交或切换字段时触发         | `value: string, event: Event`        |
| `clear`             | 清除时触发                               | `event: Event`                       |
| `search`            | 点击图标/按钮、按 Enter 或选择历史时触发 | `result: SearchResult, event: Event` |
| `focus`             | 聚焦时触发                               | `event: FocusEvent`                  |
| `blur`              | 失焦时触发                               | `event: FocusEvent`                  |
| `cancel`            | 点击移动端取消按钮时触发                 | `event: Event`                       |

### 插槽

| 名称             | 说明                                 | 参数        |
| ---------------- | ------------------------------------ | ----------- |
| `prefix`         | 输入框前缀；提供后将替换默认搜索图标 | `-`         |
| `suffix`         | 输入框后缀                           | `-`         |
| `clear-icon`     | 清除图标                             | `{ clear }` |
| `button-default` | 公共搜索按钮内容                     | `-`         |
| `button-icon`    | 公共搜索按钮图标                     | `-`         |
| `label`          | 左侧标签                             | `-`         |
| `action`         | 操作按钮内容                   | `-`         |

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

### SearchField

| 参数          | 说明                                       | 类型     |
| ------------- | ------------------------------------------ | -------- |
| `label`       | 字段文案                                   | _string_ |
| `value`       | 字段值                                     | _string_ |
| `placeholder` | 字段占位符，优先于 Search 的 `placeholder` | _string_ |

### SearchResult

| 参数             | 说明           | 类型                                   |
| ---------------- | -------------- | -------------------------------------- |
| `modelField`     | 搜索字段       | _string \| undefined_                  |
| `modelValue`     | 原始搜索关键词 | _string_                               |
| `model`          | 字段表单对象   | _Record<string, unknown> \| undefined_ |
| `recentSearches` | 下一份搜索历史 | _string[]_                             |

输入事件约定：编辑时先 `input`、再 `update:modelValue`；失焦提交仅在值变化时触发 `change`。清空依次触发 `clear → input → update:modelValue → change`，各一次，同时只更新一次搜索字段模型，不自动执行搜索。

输入事件先于模型更新。Enter 会等待 Input 提交及受控模型回填后生成搜索结果；父级拒绝 trim 提议时，搜索仍使用实际受控值。清空按 clear → input → update:modelValue → change 通知，不自动执行搜索。

## 受控模型协议

值优先级为 `modelValue` > `model[当前字段]` > 非受控 `defaultValue`。传入 `model` 且存在当前字段时，缺失/null 字段显示空字符串；同时绑定多个模型时，应在父级保持它们一致。`modelField` 优先于 `defaultField` 和第一项字段；受控值不会被内部强制覆盖。

`model` **不会被原地修改**。每次逻辑更新发出一份 `update:model` 新对象，清空已声明的其他字段、保留未声明属性；请使用 `v-model:model` 或显式接受提议。字段切换只产生一次 `update:modelField → update:modelValue → update:model → change`。父级可拒绝提议，Enter、按钮、历史项搜索均等待一轮更新后读取实际接受的字段、关键词和模型。

历史不按输入过滤，也不内部持久化；`search` 返回的新历史统一 trim、去空、去重并截取最大数量。空关键词不添加记录，非有限/负数最大数量按 0 处理。清空不执行搜索；取消提议空字符串并发出 cancel/change，不提交搜索。

输入编辑发出 `input → update:modelValue`；提交值变化时才发出 `change`。清空为 `clear → input → update:modelValue → change`，仅一次。只读、禁用、loading 会阻止搜索/取消/历史/字段操作；禁用和只读可继承 Form / FormItem / InputGroup。失活或卸载会取消未完成的异步搜索。

### 跨端边界

双方控制器、公开 API 和历史内容独立同源。两端默认 `presentation=inline`；Cedar 默认 `shape=square`，Maple 默认 `shape=round`；显式开启后分别使用本地 Drawer / Popup，不共享实例。Cedar 保留 InputGroup，Maple 保留移动搜索条布局和触控间距。Input 支持 `xs/sm/md/lg/xl`，外层条高度/间距仍由 Search token 控制，并非整个条随 size 等比例缩放。

### 公开类型

`SearchPresentation`、`SearchProps`, `SearchEmits`, `SearchSlots`, `SearchExpose`, `SearchField`, `SearchResult`.

### Input 属性透传

显式支持 `modelModifiers`、`type`、`ariaLabel`、`placeholder`、`maxLength`、`readonly`、`disabled`、`autofocus`、`enterkeyhint`、`textColor`、`focusColor`、`blurColor`、`size`、`variant`、`clearable`、`inputAttrs`、`error`。`inputAttrs` 将原生 name/autocomplete/ARIA 等属性传给外侧和全屏内输入框；`error` 可覆盖继承的错误状态。搜索、弹层取消和弹层标签沿用全局多语言系统。取消、字段、历史程序更新各通知一次 Form change，原生编辑沿用 Input 事件链。


## 配置清空后的值

`empty-value` / `emptyValue` 指定清空动作产生的模型值，接受当前组件模型类型内的值或无参数工厂函数。省略保留原有默认结果；需要区分“省略”与“返回 undefined”时使用 `() => undefined`。数组会按每次清空浅复制；不可清除的禁用选中项仍保留。该属性不改变哪些值算空、不改变 Form reset 默认值，也不会将 0/false 普遍视为空。
文本与人员 ID 模型仍为字符串，使用空字符串或业务约定的字符串哨兵值。
