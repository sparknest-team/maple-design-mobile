# 文本域

所有原生输入统一使用 `autocomplete="off"`，传入原生属性也不会开启自动填充。

### 介绍

多行纯文本编辑控件，适用于评论、反馈等较长内容的输入。

默认长度按 UTF-16 码元计算（emoji 通常占 2）；默认截断不会拆开有效的代理对，边界不足时舍去整个字符。若需按用户感知字符（字素簇）计数和裁剪，请配套提供 `word-length` 与 `word-slice`；自定义裁剪结果由业务负责。

## 阅读方向

多行输入继承来源 `dir`，文字默认按阅读起点对齐，计数按阅读终点排列。切换方向保留原生编辑器、焦点与选区，不交换原生光标或换行键。

## 基础示例

### 基础用法与值模型

`v-model` 用于受控值；`default-value` 只提供非受控初始值。

`v-model.trim` 遵循 Vue 模型事件规则：输入时的 `update:modelValue` 已去除首尾空白；`input` 仍通知经过长度归一化的原始文本。非受控输入可在编辑时保留空白，提交时归一化本地显示；提交不重复发布已通知的同一个模型值。受控显示始终由父级最终值决定，`change` 仍表示提交。

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
| `max-length`      | 有限非负长度或 `{ length, errorOnly? }`；0 不限；非法值提示并回退不限 | 外边框与字数限制 |
| `show-word-limit` | 是否显示字数统计                         | 外边框与字数限制 |
| `placeholder`     | 占位提示文字                             | 外边框与字数限制 |
| `resize`          | 是否允许纵向拖动调整尺寸                 | 外边框与字数限制 |
| `rows`            | 原生可见行数，仍受 min-height Token 约束 | 外边框与字数限制 |

<!-- demo-config-notes:end -->

```demo
../example/demos/demo-5.vue
```

`max-length` 为有限非负数或 `{ length, errorOnly? }`，`0` 表示不限。对象的 `length` 同样须为有限非负数，`errorOnly` 为可选布尔值；非法值沿 Vue Prop 校验提示并按不限长度回退，传入 null 按未设置处理。默认截断按 UTF-16 码元计算；自定义计数与裁剪请配套提供 `word-length / word-slice`。

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

### 自动高度

自动高度按实际盒模型换算，padding 和上下边框只计入一次。显式 `minRows / maxRows` 优先于主题默认最小高度，达到行数上限后内部滚动；关闭自动高度后恢复原生高度和平台默认 resize。示例并列比较两种盒模型，可填入六行并切换上限。

```demo
../example/demos/auto-size.vue
```

### 主体与事件契约

输入按 input → update:modelValue 通知；清空按 clear → input → update:modelValue → change 通知，各一次，Form 对应语义也各接收一次。只读、禁用和组合输入期间禁止清空。受控提议被拒绝后恢复原生内容，包括不支持光标 API 的输入类型。

```demo
../example/demos/body-contract.vue
```

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责，不隐式改变 disabled/readonly；需要禁止编辑时单独设置。

## 值模型与交互

### 动态清空策略

empty-value 或其工厂函数变化会用于下一次清空；empty-values 变化只重新解释当前显示值，不主动改写模型。直接模式清空即回写，延迟模式清空草稿后仍需确认。

```demo
../example/demos/empty-policy.vue
```

## 组合输入

使用输入法组合文字时保留正在输入的文本，组合完成前外部模型更新不替换这段文本。组合结束后再按原有格式化和受控接受规则处理；旧输入的排队回填不会改写后续编辑或组合的文本与光标。长度限制和修饰符按组合结束后的既有输入/提交时机处理。

## 使用说明

### 尺寸与原生方法

size 支持 xs/sm/md/lg/xl 的 FieldDecorator 外壳密度；文本域高度/文字度量仍由 rows、auto-size 和 Textarea Token 控制。Cedar 默认允许手动 resize，Maple 默认关闭。继承 InputGroup 与 Form 状态，子项显式值优先；提供 focus(options?)、blur()、select() 和 textareaRef。

`TextareaProps`、`TextareaVariant`、`TextareaMaxLength`、`TextareaAutoSize`、`TextareaEmits`、`TextareaSlots`、`TextareaExpose`、`TextareaInstance`。

原生方法：`focus(options?: FocusOptions)`、`blur()`、`select()`；`textareaRef` 为原生元素。

### 编辑与确认

通过 `edit-mode` 配置编辑方式；未指定时依次继承 FormItem、Form，默认 `direct`。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

FormItem 先校验候选值，失败时保持编辑；通过后再执行 before-commit 审批。审批参数与完成规则见上方属性说明。

`open / default-open / update:open / open-change` 控制和通知编辑层开关；`#read="{ value, text }"` 定制阅读内容。集中示例见 Form。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

统一光标色通过 `--mp-field-caret-color` 设置（默认 `currentColor`）；本组件可用 `--mp-textarea-caret-color` 单独覆盖，默认 `var(--mp-field-caret-color)`。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Textarea Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| empty-value | 清空输出；省略时清空返回空字符串，不影响手动删除 | `string \| null \| (() => string \| null)` | `undefined` |
| model-value | 受控绑定值 | `string \| null` | `-` |
| model-modifiers | `v-model` 修饰符，支持 `trim` | `object` | `{}` |
| default-value | 非受控初始值，仅创建时读取；后续修改不重置输入，不回写父级 | `string` | `''` |
| placeholder | 占位符，也可作为浮动提示文字 | `string` | `-` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| variant | `filled`、`outline` 或 `standard` | `string` | `outline` |
| size | `xs`、`sm`、`md`、`lg` 或 `xl` | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| error | 是否显示错误状态 | `boolean` | `false` |
| max-length | 有限非负长度或 `{ length, errorOnly? }`；0 不限；非法值提示并回退不限 | `number \| object` | `0` |
| show-word-limit | 是否显示字数统计 | `boolean` | `false` |
| clearable | 是否可清除；有值且可编辑时清除图标常驻显示 | `boolean` | `false` |
| word-length | 自定义字数计算方法 | `function` | `-` |
| word-slice | 自定义超长截取方法 | `function` | `-` |
| aria-label | 输入框无障碍标签 | `string` | `-` |
| autofocus | 是否自动聚焦 | `boolean` | `false` |
| enterkeyhint | 移动端回车键提示 | `string` | `-` |
| hint | 是否将 placeholder 用作浮动提示文字 | `boolean` | `true` |
| line | 是否显示边框或底线 | `boolean` | `true` |
| text-color | 文字颜色 | `string` | `-` |
| focus-color | 聚焦颜色 | `string` | `-` |
| blur-color | 失焦颜色 | `string` | `-` |
| rows | 原生正整数行数，支持数字字符串；非法值提示并恢复原生默认行数，实际高度仍受主题约束 | `string \| number` | 原生默认 `2` |
| resize | 允许纵向调整高度；有效自动高度期间忽略 | `boolean` | `false` |
| auto-size | 自动高度；行高预算须为正有限数，且 minRows 不大于 maxRows；非法配置提示并关闭测量 | `boolean \| { minRows?: number; maxRows?: number }` | `false` |
| textarea-attrs | 原生 textarea 补充属性；不能覆盖受控值、状态、行数、长度策略或组件事件 | `Record<string, unknown>` | `undefined` |
| edit-mode | 编辑模式；继承 FormItem/Form | `direct / popup` | `undefined` |
| read-pretty | 纯阅读展示；继承 FormItem/Form | `boolean` | `undefined` |
| empty-values | 空值识别集合；显式配置完整覆盖继承值 | `readonly unknown[]` | 继承组件族策略 |
| empty-text | 纯阅读空值文案；继承 FormItem/Form | `string` | `'-'` |
| before-commit | 延迟保存审批：(payload, done, context) | `BeforeFieldCommit` | `undefined` |
| open | 延迟编辑层的受控打开状态 | `boolean` | `undefined` |
| default-open | 非受控编辑层初始打开状态；仅创建时读取 | `boolean` | `false` |
| popup-container | 延迟编辑层挂载目标；false 原地渲染 | `PopupContainer` | `undefined` |
| loading | 手动加载展示；保持可编辑 | `boolean` | `false` |
| loading-mode | 加载呈现布局 | `default / line` | `default` |

`rows` 接受正整数或可转换为正整数的数字字符串；非法值由 Vue Prop 校验提示，并按未设置恢复原生默认行数。`auto-size` 的 minRows/maxRows 接受正有限行高倍数，包含小数；同时设置时 minRows 不大于 maxRows。非法对象关闭自动测量并清理旧计算样式，null 按未设置处理。

`before-commit(payload, done, context)` 审批保存，payload 为 `{ value, previousValue }`，context 提供 `signal`。同步返回 void 等待 done；true、done() 或兑现的 `Promise<void>` 允许，false、done(false)、`Promise<false>`、抛错或拒绝取消。普通事件只通知，不等待 Promise；`change` 的 DOM 来源可缺省。

### Textarea Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 模型更新提议；输入、清空或确认保存时发布 | `value: string \| null` |
| update:open | 编辑层开关请求 | `open: boolean` |
| open-change | 编辑层开关变化通知 | `open: boolean` |
| input | 长度归一化后的用户输入；组合输入完成后发布 | `value: string, event: Event` |
| change | 失焦、清空或延迟保存提交；来源事件可缺省 | `value: string \| null, event?: Event` |
| keydown | 原生按键通知；direct 模式 Enter 保留换行 | `event: KeyboardEvent` |
| clear | 清空请求，随后依次通知 input、模型更新与 change | `event: Event` |
| focus | 原生输入获得焦点 | `event: FocusEvent` |
| blur | 原生输入失去焦点 | `event: FocusEvent` |

### Textarea Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| read | 纯阅读内容，包含原始值和格式化文本 | `{ value: string \| null; text: string }` |
| prefix | 前缀元素 | `-` |
| suffix | 后缀元素 | `-` |
| clear-icon | 清除图标或按钮 | `{ clear(event?: Event): void }` |

### Textarea Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 聚焦已挂载编辑器 | `focus(options?: FocusOptions): void` |
| blur | 使已挂载编辑器失焦 | `blur(): void` |
| select | 全选已挂载编辑器的文本 | `select(): void` |
| textareaRef | 已挂载的原生文本域引用 | `HTMLTextAreaElement \| undefined` |

## Types

```ts
import type {
  TextareaEmits,
  TextareaSlots,
  TextareaExpose,
  TextareaInstance,
  TextareaAutoSize,
  TextareaMaxLength,
  TextareaProps,
  TextareaVariant,
  WordLength,
  WordSlice,
} from '@maple-design/ui'
```

## 配置清空后的值

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

延迟编辑的 `change` 在有来源时保留真实确认事件，例如保存按钮事件；程序触发的编辑器接力没有 DOM 事件，第二个参数可缺省。事件 target 可能是确认控件，不保证是输入元素。`change` 只通知，不等待监听器返回的 Promise；异步审批请使用 `before-commit`。

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-textarea-caret-color` | `var(--mp-field-caret-color)` | `caret-color` |
| `--mp-textarea-counter-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-textarea-counter-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-textarea-counter-margin-top` | `var(--mp-sys-space-2)` | `margin-block-start` |
| `--mp-textarea-font-size` | `16px` | `font-size` |
| `--mp-textarea-height` | `auto` | `height` |
| `--mp-textarea-line-height` | `1.5` | `line-height` |
| `--mp-textarea-min-height` | `96px` | `min-height` |
| `--mp-textarea-padding-horizontal` | `0` | `padding` |
| `--mp-textarea-padding-vertical` | `0` | `padding` |
| `--mp-textarea-placeholder-color` | `var(--mp-sys-color-content-secondary)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-textarea-caret-color: var(--mp-field-caret-color);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
