# 搜索

### 介绍

搜索组件用于输入关键词并提交查询。它与 Cedar Search 使用同一套核心数据、事件和结果结构，同时保留全屏历史面板与取消操作等移动端能力。

### 基础用法

```html
<script setup>
  import { ref } from 'vue'

  const value = ref('')
  const latestResult = ref()
</script>

<template>
  <mp-search
    v-model="value"
    label="地址"
    placeholder="请输入搜索关键词"
    search-button
    button-text="搜索"
    clearable
    @search="latestResult = $event"
  />
</template>
```

输入时触发 `input`；失焦或按下 Enter 提交输入值时触发 `change`。点击清除只会更新值并触发 `clear`，不会额外触发 `input`、`change` 或 `search`。

### 移动端取消操作

```html
<mp-search v-model="value" placeholder="搜索" show-action action-text="取消" />
```

`show-action`、`action-type` 和 `action-text` 是 Maple 的移动端扩展。公共搜索按钮请优先使用 `search-button`、`button-text` 和 `button-props`。

### 带下拉字段选择

```html
<script setup>
  import { ref } from 'vue'

  const model = ref({})
  const modelField = ref('address')
  const value = ref('')
  const fields = [
    { label: '地址', value: 'address', placeholder: '请输入地址' },
    { label: '姓名', value: 'name', placeholder: '请输入姓名' },
  ]
</script>

<template>
  <mp-search
    v-model="value"
    v-model:model-field="modelField"
    v-model:model="model"
    :fields="fields"
    search-button
    button-text="搜索"
  />
</template>
```

切换字段时，组件依次更新字段、清空关键词、更新一次 `model`、触发一次 `change`，最后重新聚焦输入框。

### 搜索历史

```html
<script setup>
  import { ref } from 'vue'

  const value = ref('')
  const recentSearches = ref(['Maple', 'Cedar', 'InputNumber'])

  function handleSearch(result) {
    recentSearches.value = result.recentSearches
  }
</script>

<template>
  <mp-search v-model="value" :recent-searches="recentSearches" @search="handleSearch" />
</template>
```

组件不会持久化历史。`search` 结果中的 `modelValue` 保留原始输入；历史键会去除首尾空格、去重、移到最前，并受 `max-search-history-count` 限制。设置 `history-popup="false"` 可改用与输入框同宽的 Menu。

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
| `history-popup`            | 是否使用全屏 Popup 展示历史                     | _boolean_                 | `true`     |
| `search-button`            | 是否显示公共搜索按钮                            | _boolean_                 | `false`    |
| `button-text`              | 公共搜索按钮文字                                | _string_                  | `-`        |
| `button-props`             | 公共搜索按钮属性                                | _ButtonProps_             | `-`        |
| `loading`                  | 是否处于加载状态；加载时禁止提交                | _boolean_                 | `false`    |
| `clearable`                | 是否可清除                                      | _boolean_                 | `false`    |
| `variant`                  | 输入框风格，可选 `filled` `outlined` `standard` | _string_                  | `outlined` |
| `size`                     | 输入框尺寸                                      | _string_                  | `md`       |
| `placeholder`              | 占位符                                          | _string_                  | `-`        |
| `disabled`                 | 是否禁用                                        | _boolean_                 | `false`    |
| `readonly`                 | 是否只读                                        | _boolean_                 | `false`    |
| `label`                    | 搜索框左侧文本                                  | _string_                  | `-`        |
| `shape`                    | 内层搜索框形状，可选 `round` `square`           | _string_                  | `round`    |
| `background`               | 外层背景色                                      | _string_                  | `-`        |
| `input-background`         | 内层搜索框背景色                                | _string_                  | `-`        |
| `show-action`              | 是否显示移动端操作按钮                          | _boolean_                 | `false`    |
| `action-text`              | 移动端操作按钮文字                              | _string_                  | `取消`     |
| `action-type`              | 移动端操作类型，可选 `cancel` `search`          | _string_                  | `cancel`   |
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
| `action`         | 移动端操作按钮内容                   | `-`         |

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
