# 搜索

### 介绍

搜索组件用于在列表、结果页或顶部工具栏中输入关键词并触发查询，内置搜索图标、清除按钮和可选取消按钮。

### 基础用法

```html
<script setup>
  import { ref } from 'vue'

  const value = ref('')

  function handleSearch(keyword) {
    console.log(keyword)
  }
</script>

<template>
  <mp-search
    v-model="value"
    label="地址"
    placeholder="请输入搜索关键词"
    show-action
    action-type="search"
    action-text="搜索"
    @search="handleSearch"
  />
</template>
```

如果不希望使用全屏弹窗，可以设置 `history-popup="false"`，搜索历史会通过与输入框同宽的 Menu 展示。

```html
<mp-search v-model="value" :recent-searches="recentSearches" :history-popup="false" @search="handleSearch" />
```

### 显示取消按钮

```html
<script setup>
  import { ref } from 'vue'

  const value = ref('')
</script>

<template>
  <mp-search v-model="value" placeholder="搜索" show-action action-text="取消" />
</template>
```

### 带下拉字段选择

```html
<script setup>
  import { reactive, ref } from 'vue'

  const model = reactive({})
  const searchField = ref('address')
  const searchText = ref('')
  const fields = [
    { label: '地址', value: 'address', placeholder: '请输入地址' },
    { label: '姓名', value: 'name', placeholder: '请输入姓名' },
  ]

  function handleSearch(result) {
    console.log(result)
  }
</script>

<template>
  <mp-search
    v-model:model-field="searchField"
    v-model="searchText"
    v-model:model="model"
    :fields="fields"
    show-action
    action-type="search"
    action-text="搜索"
    @search="handleSearch"
  />
</template>
```

### 搜索历史

点击输入框时会通过 Popup 打开全屏搜索面板，面板下方展示完整历史列表。组件不会内置持久化，业务侧可以在 `search` 事件中接收 `result.recentSearches` 并自行保存。

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
  <mp-search
    v-model="value"
    :recent-searches="recentSearches"
    show-action
    action-type="search"
    action-text="搜索"
    @search="handleSearch"
  />
</template>
```

## API

### 属性

| 参数                       | 说明                                                      | 类型               | 默认值    |
| -------------------------- | --------------------------------------------------------- | ------------------ | --------- |
| `v-model`                  | 搜索关键词                                                | _string_           | `-`       |
| `v-model:model-field`      | 当前搜索字段                                              | _string_           | `-`       |
| `v-model:search-text`      | 搜索关键词，兼容字段搜索命名                              | _string_           | `-`       |
| `v-model:search-field`     | 当前搜索字段，兼容字段搜索命名                            | _string_           | `-`       |
| `v-model:model`            | 表单数据对象，字段搜索模式下会按字段写入关键词            | _object_           | `-`       |
| `default-value`            | 默认搜索关键词                                            | _string_           | `-`       |
| `default-field`            | 默认搜索字段                                              | _string_           | `-`       |
| `fields`                   | 搜索字段可选项                                            | _SearchField[]_    | `[]`      |
| `recent-searches`          | 搜索历史列表，点击输入框时会完整展示                      | _string[]_         | `[]`      |
| `max-search-history-count` | 生成下一份搜索历史时保留的最大数量                        | _number_           | `5`       |
| `history-popup`            | 是否通过全屏 Popup 展示历史，设为 `false` 时使用同宽 Menu | _boolean_          | `true`    |
| `placeholder`              | 占位符                                                    | _string_           | `-`       |
| `label`                    | 搜索框左侧文本                                            | _string_           | `-`       |
| `shape`                    | 内层搜索框形状，可选值为 `round` `square`                 | _string_           | `round`   |
| `background`               | 外层背景色                                                | _string_           | `-`       |
| `input-background`         | 内层搜索框背景色                                          | _string_           | `-`       |
| `show-action`              | 是否显示右侧操作按钮                                      | _boolean_          | `false`   |
| `action-text`              | 右侧操作按钮文本                                          | _string_           | `取消`    |
| `action-type`              | 右侧操作按钮类型，可选值为 `cancel` `search`              | _string_           | `cancel`  |
| `search-icon`              | 搜索图标名称                                              | _string_           | `magnify` |
| `clearable`                | 是否可清除                                                | _boolean_          | `true`    |
| `disabled`                 | 是否禁用                                                  | _boolean_          | `false`   |
| `readonly`                 | 是否只读                                                  | _boolean_          | `false`   |
| `maxLength`                | 最大长度                                                  | _string \| number_ | `-`       |
| `enterkeyhint`             | 定制回车键样式                                            | _string_           | `search`  |

### 事件

| 事件名   | 说明                                         | 回调参数                              |
| -------- | -------------------------------------------- | ------------------------------------- |
| `search` | 点击搜索图标、右侧搜索按钮或键盘搜索键时触发 | `result: SearchResult, event?: Event` |
| `cancel` | 点击取消按钮时触发                           | `-`                                   |
| `input`  | 输入时触发                                   | `value: string, event: Event`         |
| `change` | 搜索字段或关键词变化时触发                   | `value: string, event?: Event`        |
| `clear`  | 清除时触发                                   | `value: string`                       |

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

### SearchField

| 参数          | 说明                                               | 类型     | 默认值 |
| ------------- | -------------------------------------------------- | -------- | ------ |
| `label`       | 字段文案                                           | _string_ | `-`    |
| `value`       | 字段值                                             | _any_    | `-`    |
| `placeholder` | 字段对应占位符，优先级高于 Search 的 `placeholder` | _string_ | `-`    |

### SearchResult

| 参数             | 说明               | 类型                  |
| ---------------- | ------------------ | --------------------- |
| `modelField`     | 搜索字段           | _string_              |
| `modelValue`     | 搜索关键词         | _string_              |
| `searchField`    | 搜索字段           | _string_              |
| `searchText`     | 搜索关键词         | _string_              |
| `model`          | 表单数据对象       | _Record<string, any>_ |
| `recentSearches` | 下一份搜索历史列表 | _string[]_            |
