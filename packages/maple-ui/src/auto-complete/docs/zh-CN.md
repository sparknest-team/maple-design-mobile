# 自动完成

### 介绍

输入框自动完成功能。

### 标准外观

```demo
../example/demos/standard.vue
```

### 外边框外观

```demo
../example/demos/outline.vue
```

## API

### 属性

#### AutoComplete Props

| 参数           | 说明                                                                                                         | 类型                                       | 默认值     |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ---------- |
| `v-model`      | 绑定的值                                                                                                     | _string_                                   | `-`        |
| `variant`      | 输入框风格, 可选值为 `filled` `standard` `outline`                                                          | _string_                                   | `standard` |
| `size`         | 输入框尺寸，可选值 `xs` `sm` `md` `lg` `xl`                                                                  | _ComponentSize_                            | `md`       |
| `placeholder`  | 占位符                                                                                                       | _string_                                   | `-`        |
| `options`      | 指定可选项                                                                                                   | _AutoCompleteOption[]_                     | `[]`       |
| `field-names`  | 自定义 `options` 字段映射                                                                                    | _{ label?, value?, children?, disabled? }_ | `-`        |
| `max-length`    | 最大长度                                                                                                     | _string \| number_                         | `-`        |
| `readonly`     | 是否只读                                                                                                     | _boolean_                                  | `false`    |
| `disabled`     | 是否禁用                                                                                                     | _boolean_                                  | `false`    |
| `enterkeyhint` | 定制回车键样式，参见 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint) | _string_                                   | `-`        |
| `clearable`    | 是否可清除                                                                                                   | _boolean_                                  | `false`    |
| `line`         | 是否显示分割线                                                                                               | _boolean_                                  | `true`     |
| `hint`         | 是否使用占位符作为提示                                                                                       | _boolean_                                  | `true`     |
| `text-color`   | 文字颜色                                                                                                     | _string_                                   | `-`        |
| `focus-color`  | 聚焦时的主要颜色                                                                                             | _string_                                   | `-`        |
| `blur-color`   | 失焦时的主要颜色                                                                                             | _string_                                   | `-`        |
| `should-open`     | 根据输入值决定是否显示菜单                                                                                   | _(v: string) => boolean_                   | 输入非空        |

校验规则现在配置在 `mp-form-item` 上，详见 [Form 组件](#/zh-CN/form)。

#### AutoCompleteOption

| 参数       | 说明       | 类型                                                                              | 默认值 |
| ---------- | ---------- | --------------------------------------------------------------------------------- | ------ |
| `label`    | 选项的标签 | _string \| VNode \| (option: AutoCompleteOption, checked: boolean) => VNodeChild_ | `-`    |
| `value`    | 选项的值   | _any_                                                                             | `-`    |
| `disabled` | 是否禁用   | _boolean_                                                                         | `-`    |

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

### 事件

| 事件名   | 说明       | 参数                            |
| -------- | ---------- | ------------------------------- |
| `focus`  | 聚焦时触发 | `-`                             |
| `blur`   | 失焦时触发 | `-`                             |
| `click`  | 点击时触发 | `event: Event`                  |
| `clear`  | 清除时触发 | `value: string`                 |
| `input`  | 输入时触发 | `value: string`, `event: Event` |
| `change` | 更新时触发 | `value: string`                 |

### 插槽

| 插槽名       | 说明     | 参数                                                                     |
| ------------ | -------- | ------------------------------------------------------------------------ |
| `prefix`     | 前缀     | `-`                                                                      |
| `suffix`     | 后缀     | `-`                                                                      |
| `clear-icon` | 清除图标 | `clear: (e: Event) => void` 清除函数(在使用插槽时, 可用于清除输入框内容) |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                            | 默认值  |
| --------------------------------- | ------- |
| `--auto-complete-options-padding` | `6px 0` |

### 展开与过滤

`should-open(inputValue)` 只控制是否允许展开，默认要求输入非空。`filter-option` 默认 `true`，按标签（缺省时按 value）忽略大小写匹配；`strict` 默认 `false`，设为 `true` 时区分大小写。`filter-option=false` 保留全部候选，适合服务端筛选；传入 `(inputValue, option) => boolean` 可自定义过滤（输入为空时保留全部候选）。禁用、只读、未聚焦或过滤后没有候选时不会展开。

迁移：将 `get-show` 更名为 `should-open`；如需保留旧版不执行本地过滤的行为，同时设置 `:filter-option="false"`。
