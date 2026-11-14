# Mention

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

## 基础示例

### 基础用法

用于在输入中提及某人或某事，常用于发布、聊天或评论功能。

```demo
../example/demos/basic.vue
```

### 原子提及与值反显

启用 `atomic` 后，选中的提及作为整体编辑和删除。模型使用 `@[编码后的 ID]` 保存身份，业务通过同步 `fallback-option` 提供未出现在当前候选项中的名称；组件不发起反显请求。原子项的 value 支持字符串、有限数字和布尔值，保留类型；对象值不支持。普通文本中的 `@[` 和反斜线会转义；`atomic` 默认关闭，现有普通文本不会自动解析为实体。

例如字符串 ID `shuai.meng` 保存为 `@[shuai.meng]`；数字 `0` 保存为 `@[!n:0]`，与字符串 `@[0]` 区分。非 `@` 前缀也会编码，例如 `##` 提及 `topic` 保存为 `@[%23%23|topic]`。展示依次使用当前 `options`、`fallback-option`、组件内已选项缓存，最后显示原值。缓存由当前组件实例维护，编辑态与阅读态共用，移除提及后清除；初始化时尚未取得名称的数据仍需业务通过候选或 fallback 提供。业务负责请求和持久化数据。

本地候选同时匹配 `value` 和 `label`，大小写不敏感。例如输入 `@xiaoming` 或 `@小明` 都能找到同一候选；选择后显示 `@小明`，模型保存 `@[xiaoming]`。原子模式下没有候选时，如果 `fallback-option` 对输入的 ID 返回对象，按回车也可以创建提及；未确认的普通文字不会自动转换。远程候选由业务根据输入查询，组件不会对返回结果重复执行本地过滤；请求期间输入框和候选下拉均显示加载状态，过期结果不会覆盖最新结果。

```demo
../example/demos/atomic-mention.vue
```

确认提及后会自动添加空格；后面已有空白字符时不会重复添加。空格会保存在 value 中。提及文字使用主色文字色，不显示背景。

## 数据与选项

### 候选筛选与异步搜索

本地传入数组时，输入 `@小` 或 `@xiaoming` 会按姓名或账号筛选。异步示例把关键词交给业务函数查询，请求期间下拉显示 loading；快速将 `@xi` 改为 `@lisi`，只显示最新关键词的结果。示例使用模拟数据，实际接口可将 `signal` 传给 `fetch`。

```demo
../example/demos/search-options.vue
```

### 异步搜索与阅读态反显

输入 `@xiaoming` 并选择小明，再搜索 `@lisi`。切换阅读态后，已选人员的姓名仍然可见；再次切回编辑态，模型中的 ID 保持不变。示例用模拟请求提供候选，并用 `fallback-option` 反显初始化的 ID。

```demo
../example/demos/async-read-pretty.vue
```

### 保存后异步反显

示例在内存中模拟保存模型，重新挂载组件后异步获取姓名。加载期间显示 ID，数据返回后通过同步 `fallback-option` 反显姓名，保存值不变。实际业务需要自行保存模型并根据 ID 请求展示数据。

```demo
../example/demos/async-fallback-restore.vue
```

## 自定义与插槽

### 自定义触发字符

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置     | 作用                 | 相关示例       |
| -------- | -------------------- | -------------- |
| `options`   | 用于自动补全的数据   | 自定义触发字符 |
| `prefix` | 触发自动补全的关键字 | 自定义触发字符 |

<!-- demo-config-notes:end -->

指定 `prefix` 来自定义触发字符。默认为 `@`，可以自定义为任意字符。

```demo
../example/demos/prefix.vue
```

## 生命周期与边界

### 镜像重定位生命周期

```demo
../example/demos/mirror-lifecycle.vue
```

停用或卸载 Mention 后，保留的输入、弹层事件及 focus / blur 调用不再生效；重新激活后会重新测量输入位置。禁用时不接受输入或 focus，活动实例仍允许调用 blur。

## 加载与等待

### 受控加载

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 业务显式控制的加载状态 | `boolean` | `false` |


通过 loading 显式展示等待；普通事件返回值不参与加载。before-* 守卫按其契约管理内部等待状态。

```demo
../example/demos/loading.vue
```

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](/guide/empty-values/)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Mention Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value (v-model) | 受控文本；null 显示为空 | string \| null | undefined |
| atomic | 启用编码存储和整体编辑的提及项 | boolean | false |
| fallback-option | 同步返回未匹配 ID 的展示选项 | `(value: string \| number \| boolean) => SelectOptionData \| null \| undefined` | undefined |
| default-value | 非受控初始文本 | string | '' |
| options | 候选数组或显式加载函数，支持嵌套分组 | readonly (string \| number \| SelectOptionData \| SelectOptionGroup)[] \| ((query: string, context: { signal: AbortSignal }) => Array \| `Promise<Array>`) | undefined |
| min-search-length | 开始搜索所需的最少字符数 | number | 0 |
| search-delay | 远程搜索防抖时间（毫秒） | number | 0 |
| auto-commit-single | 自动提交唯一可选结果 | boolean | false |
| prefix | 触发前缀；支持多字符和多个前缀 | string \| string[] | '@' |
| split | 提及前后的分隔符 | string | ' ' |
| type | 输入形态 | input \| textarea | input |
| disabled | 未设置时继承 Form，显式 false 覆盖 | boolean | undefined |
| readonly | 未设置时继承 Form，显式 false 覆盖 | boolean | undefined |
| clearable | 允许清空文本或编辑草稿 | boolean | false |
| loading | 手动等待反馈，不隐式禁用文本编辑 | boolean | false |
| edit-mode | 编辑模式，继承 FormItem 和 Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | 独立阅读状态，显式 false 覆盖父级 | `boolean` | `false` |
| empty-value | 清空输出；显式 null 原样提交 | `string \| null \| (() => string \| null)` | `''` |
| empty-values | 空值识别策略，字段优先于 FormItem 和 Form | `readonly unknown[]` | `-` |
| empty-text | 阅读空文案，显式空字符串有效 | `string` | `'-'` |
| before-commit | 延迟编辑保存前守卫；返回布尔值、Promise 或通过 done 完成 | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | 受控编辑层开关，不是内部原生输入焦点 | `boolean` | `-` |
| default-open | 非受控编辑层初始开关 | `boolean` | `false` |
| popup-container | 编辑层挂载容器 | `string \| HTMLElement \| false` | `-` |

### Mention Events

| 事件 | 说明与参数 |
| --- | --- |
| update:modelValue | value: string \| null |
| change | value: string \| null；不附带原生 Event |
| search | query: string, prefix: string |
| select | value: SelectOptionValue \| undefined；来自实际叶子候选 |
| clear | event: Event |
| focus / blur | event: FocusEvent |
| load-error | error: unknown；保留加载源原始错误 |
| update:open / open-change | open: boolean；仅字段编辑层 |

options 是显式数据加载入口；search、change、select 和 load-error 都是通知，不采集监听器返回的 Promise。直接输入按 update:modelValue / change 通知，选择按 select / update:modelValue / change 通知；延迟编辑中先修改草稿，确认后才提交最终模型。

### Mention Methods

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| focus | 聚焦当前目标；延迟模式按字段编辑协议打开 | void |
| blur | 失焦当前目标，不打开编辑器 | void |
| refresh | 重试当前 options 查询，沿用取消与失败协议，不打开编辑器；静态数组不发请求 | `Promise<void>` |

### Mention Slots

| 插槽 | 说明与参数 |
| --- | --- |
| option | 两种输入形态的候选内容；data: SelectOptionInfo，含 key、raw、value、label |
| read | 两种输入形态的阅读内容；value: string \| null, text: string |
| prefix / suffix | 仅 type=input 的输入框前后缀 |
| clear-icon | 两种输入形态的清空节点；clear(event?: Event): void |

clear-icon 替换整个清空节点，自定义节点需要调用 clear，并自行提供可访问的按钮。没有 default 输入替换、empty 或加载错误专用插槽；option 不替换字段输入本体。

## Types

组件导出以下类型定义

```ts
import type { MentionProps, MentionInstance, MentionEmits, MentionSlots, MentionExpose } from "@maple-design/ui-vue";
```

Mention 复用 Input／Textarea 的排版和间距，测量镜像复制原生输入框计算样式。自定义请覆盖对应输入组件变量；不再提供无效的 mention-font-size、mention-line-height 或 mention-padding-*。

### 编辑与确认

Maple 使用 edit-mode="popup" 在字段附近打开编辑浮层，Enter/F2 也可进入；取消/Escape 丢弃草稿，确认后提交。readPretty 为独立阅读属性，与 readonly、disabled 分开。

## 配置清空后的值

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

候选属性 `options` 支持数组或 `(query, { signal }) => 数组/Promise`。加载、取消、过期结果隔离由组件内部处理，失败触发 load-error。单选/多选分组初始化以空字符串查询，搜索型字段在查询变化时调用；树形字段根数据与原有 load-more 子节点懒加载独立。

input 与 textarea 都显示手动 loading 和当前显式 options 加载函数的等待。等待显示不会隐式禁用编辑；search 通知返回 Promise 不启动任务。旧数据请求不会清理新请求的指示器，load-error 保留原始错误。

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

### 提及范围与分组选项

prefix 支持单字符、多字符及字符串数组。选择时只替换光标前已匹配的前缀和查询文本，保留光标后内容；textarea 镜像使用实际命中的前缀。options 中的嵌套分组只展示标题，只有叶子选项可选；禁用叶子不提交。option 插槽接收规范化候选，数值 0 和空字符串也是有效身份，不跳过定制。

### 候选反馈与实例边界

显式 options 加载的等待统一显示在当前 Input/Textarea 字段，原生输入声明 aria-busy；手动 loading 与数据请求的等待合并，文本仍可编辑。没有可用候选时不打开提及菜单。失败结束当前等待并通知原始 load-error，业务决定错误展示；不会把异常字符串自动插进候选或文本。refresh 等待一次读取结束，失败通过 load-error 通知，不等待错误监听器的 Promise。

disabled/readonly 会暂停数据请求，停用、卸载和过期响应不能继续更新；refresh 在关闭的编辑层也可读取数据而不自动打开。候选菜单仍属于内部输入，公开 open/default-open 只控制延迟字段编辑层。MentionProps、MentionEmits、MentionSlots、MentionExpose 在根入口和 mention 子入口一致导出；MeasureInfo 为内部测量状态。

Mention 同时在 Cedar 和 Maple 提供。

### 输入与候选关联

input 使用 combobox，textarea 保留支持多行的 textbox；两者都以 aria-autocomplete、aria-controls 和 aria-activedescendant 关联实际 listbox 与活动候选。候选关闭或字段只读后撤下活动关联；方向键移动候选时原生输入保留 DOM 焦点。这里验证的是 DOM 关系和键盘行为，不代表已完成所有读屏软件和真机组合的认证。

后续验收（尚未完成）：使用真实读屏器（如 VoiceOver、NVDA）及受支持的浏览器，检查原子提及初始化姓名、候选导航与选择、编辑和整体删除时的实际播报。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-mention-token-color` | `var(--mp-sys-color-content-brand)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-mention-token-color: var(--mp-sys-color-content-brand);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
