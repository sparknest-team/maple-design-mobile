# InputTag

用来输入标签。FormItem 有错误消息时，输入框会关联错误描述，并保留已有的 `aria-describedby`。

## 阅读方向

标签按阅读顺序排列，标签值的数组顺序保持不变。空输入时 Backspace 删除业务数组中最后一个可关闭标签；Enter 添加标签，输入法组合期间不触发标签提交或删除。

## 基础示例

### 基础用法

标签输入框的基本用法。

```demo
../example/demos/basic.vue
```

## 外观与状态

### 标签输入尺寸与状态

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                 | 相关示例           |
| --------------- | -------------------- | ------------------ |
| `default-value` | 默认值（非受控状态） | 标签输入尺寸与状态 |
| `placeholder`   | 占位符               | 标签输入尺寸与状态 |
| `size`          | 输入框的大小         | 标签输入尺寸与状态 |
| `clearable`     | 是否允许清空         | 标签输入尺寸与状态 |
| `disabled`      | 是否禁用             | 标签输入尺寸与状态 |
| `readonly`      | 是否为只读模式       | 标签输入尺寸与状态 |

<!-- demo-config-notes:end -->

比较尺寸和禁用/只读/错误外观，操作可编辑实例观察标签布局；空值协议保持独立。

<details>
<summary>配置说明与使用限制</summary>

#### 输入框状态

输入框有禁用、只读和错误三种状态。

#### 输入框尺寸

输入框分为 `xs`、`sm`、`md`、`lg`、`xl` 五种尺寸。

</details>

```demo
../example/demos/appearance-state-comparison.vue
```

## 内容与展示

### 最多展示标签数量

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                               | 相关示例         |
| --------------- | ---------------------------------- | ---------------- |
| `default-value` | 默认值（非受控状态）               | 最多展示标签数量 |
| `placeholder`   | 占位符                             | 最多展示标签数量 |
| `max-tag-count` | 最多展示的标签个数，`0` 表示不限制 | 最多展示标签数量 |
| `clearable`     | 是否允许清空                       | 最多展示标签数量 |

<!-- demo-config-notes:end -->

设置最多展示标签数量。

```demo
../example/demos/max.vue
```

## 加载与等待

### 受控加载

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 业务显式控制的加载状态 | `boolean` | `false` |


通过 loading 显式展示等待；普通事件返回值不参与加载。before-* 守卫按其契约管理内部等待状态。

```demo
../example/demos/loading.vue
```

### 粘贴链接并获取标题

粘贴链接或输入链接后按回车，模拟异步获取标题，等待期间展示加载状态。模型只保存原始链接；`fallback-option` 从业务维护的响应式数据中读取标题。点击提交可查看链接数据，示例不发送请求。

```demo
../example/demos/link-title.vue
```

### 字段状态与原生输入

`disabled`、`readonly`、`error` 未设置时继承 FormItem / Form；InputGroup 可提供禁用、只读、尺寸和变体，字段显式值优先，`false` 可覆盖父级。独立使用时默认变体为 `outline`。延迟编辑器遵守相同状态，编辑中禁用或只读会取消草稿。

`id`、`name`、`aria-*`、`data-*`、原生约束和键盘监听器传给实际 input，`class` / `style` 保留在外壳。`name` 提交的是独立的输入草稿，不会序列化标签数组。`input-value` 控制输入草稿；与标签的 `model-value` 分开。组合输入只通知一次；被禁用、只读或关闭取消的组合输入不会在稍后提交。

`loading` 由业务控制；`loading-mode="default"`（默认）或 `"line"` 只调整反馈形态，不禁止输入。默认清空入口为 `type="button"` 的命名按钮，支持 Tab / Enter / Space；`#clear-icon="{ clear }"` 可定制入口并调用原有清空动作。清空保留独立输入草稿，并按原有顺序通知 `update:modelValue`、`change`、`clear`。

### 原始值反显

使用 `fallback-option` 同步读取业务维护的展示数据。初始值只包含链接，点击按钮模拟业务数据到达；标题更新不会修改模型。

```demo
../example/demos/fallback-option.vue
```

### 保存后异步反显

示例在内存中模拟保存 ID 数组，重新挂载组件后异步获取姓名。加载期间显示 ID，数据返回后通过同步 `fallback-option` 反显姓名，保存值不变。实际业务需要自行保存数组并根据 ID 请求展示数据。

```demo
../example/demos/async-fallback-restore.vue
```

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](/guide/empty-values/)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

`unique-value` 按合并后的 `field-names.value` 判断对象与字符串标签的唯一性；数字 `1` 和字符串 `"1"` 不同。默认允许重复，每个出现项拥有独立稳定节点，折叠占位不占用任何业务值。数量限制只控制展示，不截断模型。

公开 Props 不包含 `baseCls`、`focused`、`disabledInput`、`uninjectFormItemContext`；这些是内部组合入口。before-commit 同步返回 undefined 时等待 done；普通 change / press-enter 等事件不等待 Promise。延迟模式的 change 事件可没有原始 DOM 事件。清空默认输出 []，显式 empty-value=null 时保留 null。

### InputTag Props

| 参数名                    | 描述                               | 类型                                              |   默认值   |
| ------------------------- | ---------------------------------- | ------------------------------------------------- | :--------: |
| model-value **(v-model)** | 绑定值                             | `(string \| number \| TagData)[] \| null`         |    `-`     |
| default-value             | 默认值（非受控状态）               | `(string \| number \| TagData)[]`                 |    `[]`    |
| input-value **(v-model)** | 输入框的值                         | `string`                                          |    `-`     |
| default-input-value       | 输入框的默认值（非受控状态）       | `string`                                          |    `''`    |
| placeholder               | 占位符                             | `string`                                          |    `-`     |
| disabled                  | 是否禁用                           | `boolean`                                         |  `-`   |
| error                     | 是否为错误状态                     | `boolean`                                         |  `-`   |
| readonly                  | 是否为只读模式                     | `boolean`                                         |  `-`   |
| clearable                 | 是否允许清空                       | `boolean`                                         |  `false`   |
| size                      | 输入框的大小                       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`            |   `'md'`   |
| variant                   | 输入框的变体                       | `'filled' \| 'outline' \| 'standard'`             | `'outline'` |
| max-tag-count             | 有限非负整数；0 不限，非法值诊断后按不限展示 | `number`                                          |    `0`     |
| retain-input-value        | 是否保留输入框的内容               | `boolean \| { create?: boolean; blur?: boolean }` |  `false`   |
| format-tag                | 格式化标签内容                     | `(data: TagData) => string`                       |    `-`     |
| fallback-option | 同步解析原始值的展示数据；不返回结果时显示原始值 | `(value: string \| number) => TagData \| null \| undefined` | `-` |
| unique-value              | 是否仅创建唯一的值                 | `boolean`                                         |  `false`   |
| field-names               | 自定义 `TagData` 中的字段          | `InputTagFieldNames`                              |    `-`     |
| tag-nowrap                | 标签内容不换行                     | `boolean`                                         |  `false`   |

| loading | 业务控制的加载状态，不禁止输入 | `boolean` | `false` |
| loading-mode | 共享字段反馈形态，不是 Loading 动画类型 | `'default' \| 'line'` | `'default'` |
| empty-value | 清空输出；默认空数组，可显式配置 null | `InputTagValue \| (() => InputTagValue)` | `[]` |
| empty-values | 空值识别策略，字段优先于 FormItem 和 Form | `readonly unknown[]` | `-` |
| empty-text | 阅读空文案，显式空字符串有效 | `string` | `'-'` |
| edit-mode | 编辑模式；字段优先于 FormItem 和 Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | 独立阅读状态，显式 false 覆盖父级 | `boolean` | `false` |
| before-commit | 延迟编辑保存前守卫；返回布尔值、Promise 或通过 done 完成 | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | 受控编辑层开关，不是内部原生输入焦点 | `boolean` | `-` |
| default-open | 非受控编辑层初始开关 | `boolean` | `false` |
| popup-container | 编辑层挂载容器 | `string \| HTMLElement \| false` | `-` |

### InputTag Events

| 事件名             | 描述                     | 参数                                                    |
| ------------------ | ------------------------ | ------------------------------------------------------- |
| update:modelValue | 标签模型更新提案，确认模式在保存后通知 | value: `InputTagValue` |
| update:inputValue | 独立输入草稿更新提案 | inputValue: `string` |
| update:open | 编辑层受控开关更新 | open: `boolean` |
| open-change | 编辑层实际开关变化 | open: `boolean` |
| change             | 值发生改变时触发         | value: `InputTagValue`<br>ev?: `Event` |
| input-value-change | 输入值发生改变时触发     | inputValue: `string`<br>ev: `Event`                     |
| press-enter        | 按下回车键时触发         | inputValue: `string`<br>ev: `KeyboardEvent`             |
| remove             | 点击标签的删除按钮时触发 | removed: `string \| number`<br>ev: `Event`              |
| clear              | 调用清除动作时触发       | ev: `Event`                                        |
| focus              | 输入框获取焦点时触发     | ev: `FocusEvent`                                        |
| blur               | 输入框失去焦点时触发     | ev: `FocusEvent`                                        |

### InputTag Methods

| 方法名 | 描述             | 参数 | 返回值 |
| ------ | ---------------- | ---- | ------ |
| focus  | 使当前编辑器获取焦点；延迟模式先打开允许编辑的面板 | -    | -      |
| blur   | 使当前输入框失去焦点 | -    | -      |

公开方法从组件首次挂载起保持可调用；保存下来的方法每次查找当前编辑器，关闭、重开、切换模式后不会操作旧输入。尚未挂载或已经关闭的原生输入引用为 undefined。

### InputTag Slots

| 插槽名 |         描述         | 参数            |
| ------ | :------------------: | --------------- |
| tag    | 输入框标签的显示内容 | data: `TagData` |
| prefix |       前缀元素       | -               |
| suffix |       后缀元素       | -               |
| clear-icon | 自定义清空入口 | clear: `(event?: Event) => void` |
| read | 自定义阅读内容，优先于 empty-text | value: `InputTagValue`<br>text: `string` |

## Types

### TagData

| 参数名   | 描述       | 类型               | 默认值  |
| -------- | ---------- | ------------------ | :-----: |
| value    | 标签值     | `string \| number` |   `-`   |
| label    | 标签内容   | `string`           |   `-`   |
| closable | 是否可关闭 | `boolean`          | `false` |
| tagProps | 标签属性   | `TagProps`         |   `-`   |

组件导出以下类型定义

```ts
import type { InputTagProps, InputTagValue, InputTagEmits, InputTagSlots, InputTagExpose, InputTagInstance, InputTagFieldNames, TagData } from "@maple-design/ui-vue";
```

## 标签与关闭按钮

标签和关闭按钮的外观由 Tag 控制；禁用、只读及不可关闭的标签不能通过关闭按钮移除。

标签关闭按钮的无障碍名称由本地化的关闭文字和标签显示名称组成，例如“关闭 小明”。自定义标签插槽的显示内容无法提取为纯文本时使用标签的 label；可通过对应项的 `tagProps.closeButtonAriaLabel` 指定完整名称。

## InputTag 外壳与内容职责

InputTag 的 outline / filled / standard 外观使用 FieldDecorator 的变量。filled 的默认、悬停和聚焦背景分别使用 fill-1、fill-2、fill-3。Form 负责校验提示。

InputTag 的内容密度、默认标签底色和禁用文字由 input-tag-* 控制。禁用样式优先于聚焦样式。支持 xs / sm / md / lg / xl 五档尺寸；xl 的标签高度为 32px、输入文字为 16px、垂直内边距为 4px。

移除 33 项没有实际 CSS 消费的旧外壳变量：size-{xs,sm,md,lg}-height；color-text-error；color-placeholder、color-icon-clear、color-icon-clear-bg-hover；color-border-{default,error,disabled}（及其 -hover / -focus）；color-bg-{default,error}（及其 -hover / -focus）、color-bg-disabled（及 -hover）；color-shadow-{default,error}-focus、size-shadow-{default,error}-focus；border-radius、border-width、size-icon-clear、size-icon-clear-hover。以上后缀均属于 --mp-input-tag-。没有兼容别名。

外壳背景通过 field-variant-{variant}-background 定制，圆角使用 field-border-radius，占位文字使用 field-placeholder-text-color，清除图标使用 field-clear-icon-color 和 field-clear-icon-size。尺寸优先通过 `size` 设置，标签内容使用 InputTag 自身变量。

默认文字、禁用文字、标签底色与焦点底色分别使用对应的系统语义色。禁用状态不会覆盖显式设置的 color / status；自定义颜色时需保证文字可读性。父级 disabled / readonly 优先于 tagProps.closable / checkable，loading 或显式不可关闭的标签不能用 Backspace 删除。

### 编辑与确认

通过 `edit-mode` 配置编辑方式；未指定时依次继承 FormItem、Form，默认 `direct`。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 在字段附近打开编辑浮层，Enter/F2 也可进入；取消/Escape 丢弃草稿，确认后提交。readPretty 为独立阅读属性，与 readonly、disabled 分开。

`before-commit(payload, done, context)` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

## 配置清空后的值

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-input-tag-color-text-default` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-input-tag-color-text-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-input-tag-padding-x` | `4px` | `padding-inline-end`, `padding-inline-start` |
| `--mp-input-tag-size-lg-font-size` | `14px` | `font-size` |
| `--mp-input-tag-size-lg-padding-y` | `2px` | `padding-bottom`, `padding-top` |
| `--mp-input-tag-size-lg-tag-height` | `28px` | `line-height`, `min-height` |
| `--mp-input-tag-size-md-font-size` | `14px` | `font-size` |
| `--mp-input-tag-size-md-padding-y` | `2px` | `padding-bottom`, `padding-top` |
| `--mp-input-tag-size-md-tag-height` | `24px` | `line-height`, `min-height` |
| `--mp-input-tag-size-sm-font-size` | `14px` | `font-size` |
| `--mp-input-tag-size-sm-padding-y` | `2px` | `padding-bottom`, `padding-top` |
| `--mp-input-tag-size-sm-tag-height` | `20px` | `line-height`, `min-height` |
| `--mp-input-tag-size-xl-font-size` | `16px` | `font-size` |
| `--mp-input-tag-size-xl-padding-y` | `4px` | `padding-bottom`, `padding-top` |
| `--mp-input-tag-size-xl-tag-height` | `32px` | `line-height`, `min-height` |
| `--mp-input-tag-size-xs-font-size` | `12px` | `font-size` |
| `--mp-input-tag-size-xs-padding-y` | `0px` | `padding-bottom`, `padding-top` |
| `--mp-input-tag-size-xs-tag-height` | `20px` | `line-height`, `min-height` |
| `--mp-input-tag-tag-color-bg` | `var(--mp-sys-color-surface-default)` | `background-color` |
| `--mp-input-tag-tag-color-bg-disabled` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-input-tag-tag-color-bg-focus` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-input-tag-tag-color-border` | `var(--mp-color-fill-3)` | `border-color` |
| `--mp-input-tag-tag-color-border-disabled` | `var(--mp-color-fill-3)` | `border-color` |
| `--mp-input-tag-tag-color-border-focus` | `var(--mp-sys-color-state-hover)` | `border-color` |
| `--mp-input-tag-tag-font-size` | `12px` | `font-size` |
| `--mp-input-tag-tag-margin-right` | `4px` | `margin-inline-end` |
| `--mp-input-tag-tag-margin-y` | `2px` | `margin-bottom`, `margin-top` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-input-tag-color-text-default: var(--mp-sys-color-content-primary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

后续验收（尚未完成）：使用真实读屏器（如 VoiceOver、NVDA）及受支持的浏览器，检查输入框名称、标签名称、创建与删除、键盘操作以及表单错误提示的实际播报。
