# 输入框

## 案例

### 基础用法

```demo
../example/demos/basic.vue
```

### 外观变体

```demo
../example/demos/variant.vue
```

### 尺寸

```demo
../example/demos/size.vue
```

### 状态

```demo
../example/demos/state.vue
```

### 表单控件尺寸对照

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### 介绍

用于输入单行文本。组件支持多种外观、浮动提示、输入类型、状态以及前后缀内容。

默认长度按 UTF-16 码元计算（emoji 通常占 2）；默认截断不会拆开有效的代理对，边界不足时舍去整个字符。若需按用户感知字符（字素簇）计数和裁剪，请配套提供 `word-length` 与 `word-slice`；自定义裁剪结果由业务负责。

### 提示文字

`hint` 开启时，placeholder 会在聚焦或有值时上浮；关闭后保持原生占位符行为。

```demo
../example/demos/hint.vue
```

### 输入类型

```demo
../example/demos/type.vue
```

### 前缀和后缀

```demo
../example/demos/prefix-suffix.vue
```

### 输入框组合

`mp-input-group` 统一传递 `size`、`variant`、`disabled`、`readonly`、`hint`，子输入框显式设置的值（包括 `false`）优先。`mp-input-group-label` 可作为前后附加内容。

```demo
../example/demos/group.vue
```

### 组合状态继承

密码切换和清除按钮也遵循合并后的禁用状态；只读输入不会显示清除按钮。

```demo
../example/demos/group-state.vue
```

### 表单反馈

FormItem 的 `feedback` 配合 `validate-status` 显示校验反馈。有外置 FormItem 标签时自动关闭内部浮动提示。

```demo
../example/demos/form-feedback.vue
```

### 密码输入框

`mp-input-password` 增加可见性切换，支持 `visibility` / `default-visibility`、`visibility-toggle` 和 `visibility-change`；其余 Input 属性与事件直接透传。

```demo
../example/demos/password.vue
```

### 字数限制

```demo
../example/demos/max-length.vue
```

### 自定义清除图标

```demo
../example/demos/custom-clear-icon.vue
```

### 输入修饰符

```demo
../example/demos/model-modifier.vue
```

### 原生属性

```demo
../example/demos/native-attrs.vue
```

### 主体与事件契约

两端维护独立复制的主体。输入按 input → update:modelValue 通知；清空按 clear → input → update:modelValue → change 通知，各一次，Form 对应语义也各接收一次。只读、禁用和组合输入期间禁止清空。受控提议被拒绝后恢复原生内容，包括不支持光标 API 的输入类型。

```demo
../example/demos/event-pipeline.vue
```

### 外观组合

适用于表单中的单行文本输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 交互状态切换

适用于表单中的单行文本输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### 属性

| 参数              | 说明                                                     | 类型               |  默认值   |
| ----------------- | -------------------------------------------------------- | ------------------ | :-------: |
| `v-model`         | 受控绑定值                                               | `string`           |    `-`    |
| `model-modifiers` | `v-model` 修饰符，支持 `trim`                            | `object`           |   `{}`    |
| `default-value`   | 非受控模式下的初始值                                     | `string`           |   `''`    |
| `type`            | `text`、`password`、`number`、`tel` 或 `email`           | `InputType`        |  `text`   |
| `placeholder`     | 占位符，也可作为浮动提示文字                             | `string`           |    `-`    |
| `size`            | `xs`、`sm`、`md`、`lg` 或 `xl`                           | `ComponentSize`    |   `md`    |
| `variant`         | `filled`、`outline` 或 `standard`                        | `string`           | `outline` |
| `hint`            | 是否将 placeholder 用作浮动提示文字                      | `boolean`          |  `true`   |
| `line`            | 是否显示边框或底线                                       | `boolean`          |  `true`   |
| `max-length`      | 最大输入长度；默认截断，`errorOnly` 时允许超出并显示错误 | `number \| object` |    `0`    |
| `show-word-limit` | 是否显示字数统计                                         | `boolean`          |  `false`  |
| `word-length`     | 自定义字数计算方法                                       | `function`         |    `-`    |
| `word-slice`      | 自定义超长截取方法                                       | `function`         |    `-`    |
| `readonly`        | 是否只读                                                 | `boolean`          |  `false`  |
| `disabled`        | 是否禁用                                                 | `boolean`          |  `false`  |
| `error`           | 是否显示错误状态                                         | `boolean`          |  `false`  |
| `clearable`       | 是否可清除；有值且可编辑时清除图标常驻显示                 | `boolean`          |  `false`  |
| `autofocus`       | 是否自动聚焦                                             | `boolean`          |  `false`  |
| `enterkeyhint`    | 移动端回车键提示                                         | `string`           |    `-`    |
| `aria-label`      | 输入框无障碍标签                                         | `string`           |    `-`    |
| `input-attrs`     | 透传原生属性，例如 `autocomplete`                        | `object`           |    `-`    |
| `text-color`      | 文字颜色                                                 | `string`           |    `-`    |
| `focus-color`     | 聚焦颜色                                                 | `string`           |    `-`    |
| `blur-color`      | 失焦颜色                                                 | `string`           |    `-`    |

校验规则配置在 `mp-form-item` 上，详见 [Form 组件](#/zh-CN/form)。

`size / disabled / readonly` 按子项 → InputGroup → FormItem/Form → 库默认值继承，五种尺寸均完整支持。`hint` 默认开启，有外置标签时关闭。`name / id / aria-* / data-*` 直接透传原生 input；`class / style` 留在外壳。`input-attrs` 不能覆盖受控值、类型、禁用、只读和长度策略。

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |
| `select` | 选中输入内容 | `-` | `-` |

### 事件

| 事件名        | 说明                            | 参数                          |
| ------------- | ------------------------------- | ----------------------------- |
| `focus`       | 聚焦时触发                      | `event: FocusEvent`           |
| `blur`        | 失焦时触发                      | `event: FocusEvent`           |
| `clear`       | 清除时触发                      | `event: Event`                |
| `input`       | 输入时触发                      | `value: string, event: Event` |
| `change`      | 仅在失焦或按下 Enter 时提交变更 | `value: string, event: Event` |
| `press-enter` | 按下 Enter 时触发               | `event: KeyboardEvent`        |
| `keydown`     | 按键时触发                     | `event: KeyboardEvent`        |

超过 `max-length` 时，`update:model-value` 和 `input` 传出截断后的值。清空按 `clear → input → update:model-value → change` 通知，随后失焦不会补发 `change`。

### 插槽

| 插槽名       | 说明           | 参数                |
| ------------ | -------------- | ------------------- |
| `prefix`     | 前缀内容       | `-`                 |
| `suffix`     | 后缀内容       | `-`                 |
| `clear-icon` | 清除图标或按钮 | `clear: () => void` |

### InputPassword 与 InputGroup

| 组件 | 属性 / 事件 | 说明 |
| ---- | ----------- | ---- |
| `mp-input-password` | `visibility`, `default-visibility`, `visibility-toggle` | 密码可见性；默认非受控且显示切换按钮 |
| `mp-input-password` | `visibility-change`, `update:visibility` | 可见性变化时触发，参数为 `boolean` |
| `mp-input-group` | `size`, `variant`, `disabled`, `readonly`, `hint` | 子 Input/Password 默认继承；`variant` 默认为 `filled` |
| `mp-input-group-label` | 默认插槽 | 组合输入框的文字附加项 |

### 样式变量

Input 自身提供以下变量；容器外观相关变量请参考 [FieldDecorator](#/zh-CN/field-decorator)。

| 变量名                                  | 默认值                            |
| --------------------------------------- | --------------------------------- |
| `--mp-input-control-height` | `auto` |
| `--mp-input-control-font-size` | `inherit` |
| `--mp-input-control-line-height` | `inherit` |
| `--mp-input-control-padding-horizontal` | `0`                               |
| `--mp-input-counter-color` | `--mp-field-suffix-text-color` |
| `--mp-input-counter-font-size` | `12px` |
| `--mp-input-feedback-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-input-feedback-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-input-feedback-error-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-input-feedback-validating-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-input-feedback-duration` | `1s` |

公开类型 / Public types: `InputEmits`, `InputSlots`, `InputExpose`, `InputGroupSlots`, `InputPasswordEmits`, `InputPasswordSlots`, `InputPasswordExpose`.

### 表单展示继承

支持 presentation：`inline / popup`，默认 inline。可继承 FormItem/Form；readPretty 以纯文本阅读，其他弹层默认确认后更新 v-model。可选 before-commit 在候选校验通过后拦截保存。使用方式与对比 Demo 统一见 Form 文档。
