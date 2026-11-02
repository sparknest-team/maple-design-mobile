# 输入框

## 阅读方向

输入框继承页面或局部容器的 `dir`；前后缀、清除操作和输入框组按阅读顺序排列。运行时切换方向保留原生输入节点、焦点和选区；光标、选区、混合文字与输入法组合由浏览器处理，不交换左右编辑键。父级重绘时保留正在组合的原生文本；旧选区恢复任务不会覆盖新的组合缓冲。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

### 表单控件尺寸对照

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### 介绍

用于输入单行文本。组件支持多种外观、浮动提示、输入类型、状态以及前后缀内容。

默认长度按 UTF-16 码元计算（emoji 通常占 2）；默认截断不会拆开有效的代理对，边界不足时舍去整个字符。若需按用户感知字符（字素簇）计数和裁剪，请配套提供 `word-length` 与 `word-slice`；自定义裁剪结果由业务负责。

## 外观与状态

### 外观配置对比

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                       | 相关示例           |
| ------------- | ------------------------------------------ | ------------------ |
| `placeholder` | 占位符，也可作为浮动提示文字               | 表单反馈、提示文字 |
| `hint`        | 是否将 placeholder 用作浮动提示文字        | 表单反馈、提示文字 |
| `clearable`   | 是否可清除；有值且可编辑时清除图标常驻显示 | 表单反馈           |
| `variant`     | `filled`、`outline` 或 `standard`          | 提示文字           |

<!-- demo-config-notes:end -->

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 外观组合

适用于表单中的单行文本输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

```demo
../example/demos/appearance-lab.vue
```

### 表单反馈

FormItem 的 `feedback` 配合 `validate-status` 显示校验反馈。有外置 FormItem 标签时自动关闭内部浮动提示。

```demo
../example/demos/form-feedback.vue
```

### 提示文字

`hint` 开启时，placeholder 会在聚焦或有值时上浮；关闭后保持原生占位符行为。

```demo
../example/demos/hint.vue
```

## 输入内容与布局

### 字数限制

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                                                       | 相关示例                               |
| --------------- | ---------------------------------------------------------- | -------------------------------------- |
| `placeholder`   | 占位符，也可作为浮动提示文字                               | 字数限制、前缀和后缀、自定义清除图标   |
| `clearable`     | 是否可清除；有值且可编辑时清除图标常驻显示                 | 字数限制、自定义清除图标、组合状态继承 |
| `max-length`    | 最大输入长度；默认截断，`errorOnly` 时允许超出并显示错误   | 字数限制                               |
| `hint`          | 是否将 placeholder 用作浮动提示文字                        | 输入框组合                             |
| `default-value` | 非受控初始值，仅创建时读取；后续修改不重置输入，不回写父级 | 组合状态继承                           |
| `disabled`      | 是否禁用                                                   | 组合状态继承                           |

<!-- demo-config-notes:end -->

```demo
../example/demos/max-length.vue
```

### 密码输入框

`mp-input-password` 增加可见性切换，支持 `visibility` / `default-visibility`、`visibility-toggle` 和 `visibility-change`；其余 Input 属性与事件直接透传。

```demo
../example/demos/password.vue
```

### 前缀和后缀

```demo
../example/demos/prefix-suffix.vue
```

### 自定义清除图标

```demo
../example/demos/custom-clear-icon.vue
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

## 内容与展示

### 输入类型

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                           | 相关示例 |
| ------------- | ---------------------------------------------- | -------- |
| `type`        | `text`、`password`、`number`、`tel` 或 `email` | 输入类型 |
| `placeholder` | 占位符，也可作为浮动提示文字                   | 输入类型 |

<!-- demo-config-notes:end -->

```demo
../example/demos/type.vue
```

## 值模型与交互

### 默认值与双向绑定

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                                                       | 相关示例                             |
| --------------- | ---------------------------------------------------------- | ------------------------------------ |
| `placeholder`   | 占位符，也可作为浮动提示文字                               | 输入修饰符、主体与事件契约、原生属性 |
| `aria-label`    | 输入框无障碍标签                                           | 默认值与双向绑定、原生属性           |
| `clearable`     | 是否可清除；有值且可编辑时清除图标常驻显示                 | 主体与事件契约、清空按钮与手动删空   |
| `default-value` | 非受控初始值，仅创建时读取；后续修改不重置输入，不回写父级 | 默认值与双向绑定                     |
| `disabled`      | 是否禁用                                                   | 交互状态对比                         |
| `readonly`      | 是否只读                                                   | 交互状态对比                         |

<!-- demo-config-notes:end -->

`modelValue` 是受控值，通过普通 `v-model` 绑定；父级提供的值优先，包括空字符串。`defaultValue` 是非受控初始值，仅在组件创建时读取；之后由组件内部保存用户输入。修改 `defaultValue` 不会重置现有文字，重新挂载才会重新读取，也不会在初始化时触发 `update:modelValue` 或写入父级表单。

需要表单默认值时，直接初始化绑定字段，例如 `const text = ref('北京')`，然后使用 `<mp-input v-model="text" />`。

```demo
../example/demos/default-value.vue
```

### 清空按钮与手动删空

将清空输出设为 null。先点击清空图标，观察模型为 null；恢复初值后用 Backspace 删光，观察模型为空字符串。普通输入不会自动套用 empty-value。

```demo
../example/demos/empty-value.vue
```

### 输入修饰符

```demo
../example/demos/model-modifier.vue
```

### 交互状态对比

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于表单中的单行文本输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

```demo
../example/demos/state-lab.vue
```

### 主体与事件契约

两端维护独立复制的主体。输入按 input → update:modelValue 通知；清空按 clear → input → update:modelValue → change 通知，各一次，Form 对应语义也各接收一次。只读、禁用和组合输入期间禁止清空。受控提议被拒绝后恢复原生内容，包括不支持光标 API 的输入类型。

```demo
../example/demos/event-pipeline.vue
```

### 原生属性

```demo
../example/demos/native-attrs.vue
```

### 提交前确认

字段提交也支持 `beforeCommit({ value, previousValue }, done, context)`：保留第二个 context 参数，第三个 done 可决定允许或拒绝；Promise 和 boolean 写法继续支持。声明 done 的回调必须调用完成函数，或返回 boolean/Promise。

守卫统一使用 `(payload, done, context)`：关闭 payload 为 `{ action }`，切换和提交为 `{ value, previousValue }`，Popup 为 `{ reason }`。context 提供 `signal` 和可选原始 `event`。返回 boolean/Promise，或调用 done()/done(false)；同步 void 等待 done，Promise&lt;void&gt; 放行。首次完成生效。等待期间自动管理 loading/disabled，取消后旧结果失效，不暴露内部按钮 refs。

<demo src="../example/demos/commit-protocol.vue"></demo>

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责，不隐式改变 disabled/readonly；需要禁止编辑时单独设置。

## 加载与等待

### 加载状态

切换加载状态，对比默认指示器与底部加载线。加载期间仍可编辑输入；是否禁止编辑由 disabled / readonly 单独控制。

```demo
../example/demos/loading.vue
```

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### 属性

| 参数              | 说明                                                       | 类型                                       |   默认值    |
| ----------------- | ---------------------------------------------------------- | ------------------------------------------ | :---------: |
| `v-model`         | 受控绑定值                                                 | `string \| null`                           |     `-`     |
| `model-modifiers` | `v-model` 修饰符，支持 `trim`                              | `object`                                   |    `{}`     |
| `default-value`   | 非受控初始值，仅创建时读取；后续修改不重置输入，不回写父级 | `string`                                   |    `''`     |
| `type`            | `text`、`password`、`number`、`tel` 或 `email`             | `InputType`                                |   `text`    |
| `placeholder`     | 占位符，也可作为浮动提示文字                               | `string`                                   |     `-`     |
| `size`            | `xs`、`sm`、`md`、`lg` 或 `xl`                             | `ComponentSize`                            |    `md`     |
| `variant`         | `filled`、`outline` 或 `standard`                          | `string`                                   |  `outline`  |
| `hint`            | 是否将 placeholder 用作浮动提示文字                        | `boolean`                                  |   `true`    |
| `line`            | 是否显示边框或底线                                         | `boolean`                                  |   `true`    |
| `max-length`      | 最大输入长度；默认截断，`errorOnly` 时允许超出并显示错误   | `number \| object`                         |     `0`     |
| `show-word-limit` | 是否显示字数统计                                           | `boolean`                                  |   `false`   |
| `word-length`     | 自定义字数计算方法                                         | `function`                                 |     `-`     |
| `word-slice`      | 自定义超长截取方法                                         | `function`                                 |     `-`     |
| `readonly`        | 是否只读                                                   | `boolean`                                  |   `false`   |
| `disabled`        | 是否禁用                                                   | `boolean`                                  |   `false`   |
| `error`           | 是否显示错误状态                                           | `boolean`                                  |   `false`   |
| `clearable`       | 是否可清除；有值且可编辑时清除图标常驻显示                 | `boolean`                                  |   `false`   |
| empty-value       | 清空输出；省略时清空返回空字符串，不影响手动删除           | `string \| null \| (() => string \| null)` | `undefined` |
| `autofocus`       | 是否自动聚焦                                               | `boolean`                                  |   `false`   |
| `enterkeyhint`    | 移动端回车键提示                                           | `string`                                   |     `-`     |
| `aria-label`      | 输入框无障碍标签                                           | `string`                                   |     `-`     |
| `input-attrs`     | 透传 name 等原生属性；`autocomplete` 固定为 `off`          | `object`                                   |     `-`     |
| `text-color`      | 文字颜色                                                   | `string`                                   |     `-`     |
| `focus-color`     | 聚焦颜色                                                   | `string`                                   |     `-`     |
| `blur-color`      | 失焦颜色                                                   | `string`                                   |     `-`     |

校验规则配置在 `mp-form-item` 上，详见 [Form 组件](#/zh-CN/form)。

`size / disabled / readonly` 按子项 → InputGroup → FormItem/Form → 库默认值继承，五种尺寸均完整支持。`hint` 默认开启，有外置标签时关闭。`name / id / aria-* / data-*` 直接透传原生 input；`class / style` 留在外壳。`input-attrs` 不能覆盖受控值、类型、禁用、只读和长度策略。

### 方法

| 方法名   | 说明         | 参数 | 返回值 |
| -------- | ------------ | ---- | ------ |
| `focus`  | 聚焦         | `-`  | `-`    |
| `blur`   | 失焦         | `-`  | `-`    |
| `select` | 选中输入内容 | `-`  | `-`    |

### 事件

| 事件名        | 说明                            | 参数                          |
| ------------- | ------------------------------- | ----------------------------- |
| `focus`       | 聚焦时触发                      | `event: FocusEvent`           |
| `blur`        | 失焦时触发                      | `event: FocusEvent`           |
| `clear`       | 清除时触发                      | `event: Event`                |
| `input`       | 输入时触发                      | `value: string, event: Event` |
| `change`      | 仅在失焦或按下 Enter 时提交变更 | `value: string, event: Event` |
| `press-enter` | 按下 Enter 时触发               | `event: KeyboardEvent`        |
| `keydown`     | 按键时触发                      | `event: KeyboardEvent`        |

超过 `max-length` 时，`update:model-value` 和 `input` 传出截断后的值。清空按 `clear → input → update:model-value → change` 通知，随后失焦不会补发 `change`。

### 插槽

| 插槽名       | 说明           | 参数                |
| ------------ | -------------- | ------------------- |
| `prefix`     | 前缀内容       | `-`                 |
| `suffix`     | 后缀内容       | `-`                 |
| `clear-icon` | 清除图标或按钮 | `clear: () => void` |

### InputPassword 与 InputGroup

| 组件                   | 属性 / 事件                                             | 说明                                                  |
| ---------------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| `mp-input-password`    | `visibility`, `default-visibility`, `visibility-toggle` | 密码可见性；默认非受控且显示切换按钮                  |
| `mp-input-password`    | `visibility-change`, `update:visibility`                | 可见性变化时触发，参数为 `boolean`                    |
| `mp-input-group`       | `size`, `variant`, `disabled`, `readonly`, `hint`       | 子 Input/Password 默认继承；`variant` 默认为 `filled` |
| `mp-input-group-label` | 默认插槽                                                | 组合输入框的文字附加项                                |

### 样式变量

Input 自身提供以下变量；容器外观相关变量请参考 [FieldDecorator](#/zh-CN/field-decorator)。

| 变量名                                  | 默认值                                |
| --------------------------------------- | ------------------------------------- |
| `--mp-input-control-height`             | `auto`                                |
| `--mp-input-control-font-size`          | `inherit`                             |
| `--mp-input-control-line-height`        | `inherit`                             |
| `--mp-input-control-padding-horizontal` | `0`                                   |
| `--mp-input-counter-color`              | `--mp-field-suffix-text-color`        |
| `--mp-input-counter-font-size`          | `12px`                                |
| `--mp-input-feedback-success-color`     | `var(--mp-sys-color-content-success)` |
| `--mp-input-feedback-warning-color`     | `var(--mp-sys-color-content-warning)` |
| `--mp-input-feedback-error-color`       | `var(--mp-sys-color-content-danger)`  |
| `--mp-input-feedback-validating-color`  | `var(--mp-sys-color-content-brand)`   |
| `--mp-input-feedback-duration`          | `1s`                                  |

公开类型 / Public types: `InputEmits`, `InputSlots`, `InputExpose`, `InputGroupSlots`, `InputPasswordEmits`, `InputPasswordSlots`, `InputPasswordExpose`.

### 表单展示继承

支持 `edit-mode`：`direct / popup`。未设置时继承 FormItem/Form，独立使用时默认 direct；readPretty 以纯文本阅读，编辑弹层默认确认后更新 v-model。可选 before-commit 在候选校验通过后拦截保存。使用方式与对比 Demo 统一见 Form 文档。

### 输入光标主题

| CSS 变量                 | 默认值                        | 说明                             |
| ------------------------ | ----------------------------- | -------------------------------- |
| `--mp-input-caret-color` | `var(--mp-field-caret-color)` | 输入光标颜色，可独立于文字色覆盖 |

统一光标色通过 `--mp-field-caret-color` 设置（默认 `currentColor`）；本组件可用 `--mp-input-caret-color` 单独覆盖，默认 `var(--mp-field-caret-color)`。
