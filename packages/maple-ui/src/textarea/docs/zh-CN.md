# 文本域

所有原生输入统一使用 `autocomplete="off"`，传入原生属性也不会开启自动填充。

### 介绍

多行纯文本编辑控件，适用于评论、反馈等较长内容的输入。

默认长度按 UTF-16 码元计算（emoji 通常占 2）；默认截断不会拆开有效的代理对，边界不足时舍去整个字符。若需按用户感知字符（字素簇）计数和裁剪，请配套提供 `word-length` 与 `word-slice`；自定义裁剪结果由业务负责。

## 阅读方向

多行输入继承来源 `dir`，文字默认按阅读起点对齐，计数按阅读终点排列。切换方向保留原生编辑器、焦点与选区，不交换原生光标或换行键。

## 基础示例

### 基础用法与值模型

`v-model` 用于受控值；`default-value` 只提供非受控初始值。第三个输入框使用 `v-model.trim`，失焦后去除首尾空白。下方文字分别显示受控值和去除空白后的值。

```demo
../example/demos/demo-1.vue
```

## 外观与状态

### Hint

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                     | 相关示例         |
| ------------- | ---------------------------------------- | ---------------- |
| `rows`        | 原生可见行数，仍受 min-height Token 约束 | Hint、尺寸、状态 |
| `placeholder` | 占位提示文字                             | Hint、尺寸       |
| `hint`        | 浮动提示；未设置时继承分组/库默认        | Hint             |
| `size`        | `xs \\                                   | sm \\            | md \\     | lg \\ | xl` | 尺寸 |
| `variant`     | `filled \\                               | outline \\       | standard` | 尺寸  |
| `readonly`    | 是否只读                                 | 状态             |

<!-- demo-config-notes:end -->

```demo
../example/demos/demo-3.vue
```

### 尺寸

```demo
../example/demos/demo-4.vue
```

### 状态

```demo
../example/demos/demo-6.vue
```

### 外观配置对比

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 外观组合

适用于备注、说明等多行输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

```demo
../example/demos/appearance-lab.vue
```

## 内容与展示

### 外边框与字数限制

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置              | 作用                                     | 相关示例         |
| ----------------- | ---------------------------------------- | ---------------- |
| `clearable`       | 是否允许清空                             | 外边框与字数限制 |
| `max-length`      | 最大长度；对象形式可启用仅错误模式       | 外边框与字数限制 |
| `show-word-limit` | 是否显示字数统计                         | 外边框与字数限制 |
| `placeholder`     | 占位提示文字                             | 外边框与字数限制 |
| `resize`          | 是否允许纵向拖动调整尺寸                 | 外边框与字数限制 |
| `rows`            | 原生可见行数，仍受 min-height Token 约束 | 外边框与字数限制 |

<!-- demo-config-notes:end -->

```demo
../example/demos/demo-5.vue
```

## 交互与控制

### 交互状态切换

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                              | 相关示例       |
| ------------- | --------------------------------- | -------------- |
| `disabled`    | 是否禁用                          | 交互状态切换   |
| `readonly`    | 是否只读                          | 交互状态切换   |
| `error`       | 是否显示错误状态                  | 交互状态切换   |
| `hint`        | 浮动提示；未设置时继承分组/库默认 | 主体与事件契约 |
| `clearable`   | 是否允许清空                      | 主体与事件契约 |
| `placeholder` | 占位提示文字                      | 主体与事件契约 |

<!-- demo-config-notes:end -->

适用于备注、说明等多行输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

### 主体与事件契约

两端维护独立复制的主体。输入按 input → update:modelValue 通知；清空按 clear → input → update:modelValue → change 通知，各一次，Form 对应语义也各接收一次。只读、禁用和组合输入期间禁止清空。受控提议被拒绝后恢复原生内容，包括不支持光标 API 的输入类型。

```demo
../example/demos/body-contract.vue
```

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责，不隐式改变 disabled/readonly；需要禁止编辑时单独设置。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### 属性

| 参数              | 说明                                     | 类型                                                | 默认值      |
| ----------------- | ---------------------------------------- | --------------------------------------------------- | ----------- |
| `v-model`         | 受控绑定值                               | _string_                                            | `-`         |
| `default-value`   | 非受控模式初始值                         | _string_                                            | `''`        |
| `model-modifiers` | v-model 修饰符；支持 `trim`              | _object_                                            | `{}`        |
| `placeholder`     | 占位提示文字                             | _string_                                            | `-`         |
| `variant`         | `filled \| outline \| standard`          | _string_                                            | `outline`   |
| `size`            | `xs \| sm \| md \| lg \| xl`             | _string_                                            | `md`        |
| `clearable`       | 是否允许清空                             | _boolean_                                           | `false`     |
| `disabled`        | 是否禁用                                 | _boolean_                                           | `undefined` |
| `readonly`        | 是否只读                                 | _boolean_                                           | `undefined` |
| `error`           | 是否显示错误状态                         | _boolean_                                           | `undefined` |
| `rows`            | 原生可见行数，仍受 min-height Token 约束 | _string \| number_                                  | `-`         |
| `resize`          | 是否允许纵向拖动调整尺寸                 | _boolean_                                           | `false`     |
| `auto-size`       | 自动高度，可设置最小/最大行数            | _boolean \| { minRows?: number; maxRows?: number }_ | `false`     |
| `max-length`      | 最大长度；对象形式可启用仅错误模式       | _number \| { length: number; errorOnly?: boolean }_ | `0`         |
| `show-word-limit` | 是否显示字数统计                         | _boolean_                                           | `false`     |
| `word-length`     | 自定义长度计算方法                       | _(value: string) => number_                         | `-`         |
| `word-slice`      | 自定义截取方法                           | _(value: string, maxLength: number) => string_      | `-`         |
| `aria-label`      | 无可见标签时提供的可访问名称             | _string_                                            | `-`         |
| `autofocus`       | 是否自动聚焦                             | _boolean_                                           | `false`     |
| `enterkeyhint`    | 虚拟键盘回车键提示                       | _string_                                            | `-`         |
| `textarea-attrs`  | 内部 textarea 元素的补充原生属性         | _object_                                            | `-`         |
| `hint`            | 浮动提示；未设置时继承分组/库默认        | _boolean_                                           | `undefined` |
| `line`            | 是否显示装饰线                           | _boolean_                                           | `true`      |
| `text-color`      | 自定义文字颜色                           | _string_                                            | `-`         |
| `focus-color`     | 自定义聚焦颜色                           | _string_                                            | `-`         |
| `blur-color`      | 自定义失焦颜色                           | _string_                                            | `-`         |

在 Form/FormItem 内未显式设置时，`size`、`disabled`、`readonly` 和 `error` 会继承表单状态；组件本地传入的值（包括 `false`）优先。

### 事件

| 事件名    | 说明                                                                | 参数                          |
| --------- | ------------------------------------------------------------------- | ----------------------------- |
| `input`   | IME 完成后的用户输入                                                | `value: string, event: Event` |
| `change`  | 失焦提交且值变化时触发                                              | `value: string, event: Event` |
| `keydown` | 用户按键时触发；Enter 不提交 change                                 | `event: KeyboardEvent`        |
| `clear`   | 用户清空时触发，按 clear → input → update:model-value → change 通知 | `event: Event`                |
| `focus`   | 获得焦点时触发                                                      | `event: FocusEvent`           |
| `blur`    | 失去焦点时触发                                                      | `event: FocusEvent`           |

### 插槽

| 插槽名       | 说明           | 参数                             |
| ------------ | -------------- | -------------------------------- |
| `prefix`     | 前缀元素       | `-`                              |
| `suffix`     | 后缀元素       | `-`                              |
| `clear-icon` | 清除图标或按钮 | `clear: (event?: Event) => void` |

### 方法

| 方法名  | 说明                     |
| ------- | ------------------------ |
| `focus` | 使内部 textarea 获取焦点 |
| `blur`  | 使内部 textarea 失去焦点 |

### 类型定义

```ts
import type {
  TextareaAutoSize,
  TextareaMaxLength,
  TextareaProps,
  TextareaVariant,
  WordLength,
  WordSlice,
} from '@maple-design/ui'
```

### 样式变量

| 变量名                             | 默认值                             |
| ---------------------------------- | ---------------------------------- |
| `--mp-textarea-height`             | `auto`                             |
| `--mp-textarea-min-height`         | `96px`                             |
| `--mp-textarea-font-size`          | `16px`                             |
| `--mp-textarea-line-height`        | `1.5`                              |
| `--mp-textarea-padding-horizontal` | `0`                                |
| `--mp-textarea-padding-vertical`   | `0`                                |
| `--mp-textarea-placeholder-color`  | `--mp-sys-color-content-secondary` |
| `--mp-textarea-counter-color`      | `--mp-sys-color-content-secondary` |
| `--mp-textarea-counter-font-size`  | `--mp-sys-font-size-xs`            |
| `--mp-textarea-counter-margin-top` | `--mp-sys-space-2`                 |

### 原生布局与公开类型

size 支持 xs/sm/md/lg/xl 的 FieldDecorator 外壳密度；文本域高度/文字度量仍由 rows、auto-size 和 Textarea Token 控制。Cedar 默认允许手动 resize，Maple 默认关闭。继承 InputGroup 与 Form 状态，子项显式值优先；提供 focus(options?)、blur()、select() 和 textareaRef。

`TextareaProps`、`TextareaVariant`、`TextareaMaxLength`、`TextareaAutoSize`、`TextareaEmits`、`TextareaSlots`、`TextareaExpose`、`TextareaInstance`。

原生方法：`focus(options?: FocusOptions)`、`blur()`、`select()`；`textareaRef` 为原生元素。

### Form 字段展示与确认

本组件支持 `edit-mode`，字段 > FormItem > Form 逐层继承；未指定时为 `direct`，保留直接编辑。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

统一光标色通过 `--mp-field-caret-color` 设置（默认 `currentColor`）；本组件可用 `--mp-textarea-caret-color` 单独覆盖，默认 `var(--mp-field-caret-color)`。

## 配置清空后的值

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。
