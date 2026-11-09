# 搜索

先看关键词与提交，再看字段模型，最后接入历史记录和自定义展示；业务请求由外部处理。

### 介绍

搜索组件用于在列表、结果页或顶部工具栏中输入关键词并触发查询，内置搜索图标、清除按钮和可选取消按钮。

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## 外观与状态

### 搜索框形状

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| ------------- | ------------------------------------- | ---------- |
| `placeholder` | 占位符 | 搜索框形状 |
| `shape` | 内层搜索框形状，可选 `round` `square` | 搜索框形状 |

<!-- demo-config-notes:end -->

```demo
../example/demos/shape.vue
```

## 数据与选项

### 搜索按钮

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| ----------------- | ------------------------------------------------- | ---------------------------------- |
| `recent-searches` | 受控搜索历史 | 搜索按钮、带下拉字段选择、搜索历史 |
| `placeholder` | 占位符 | 搜索按钮、搜索历史 |
| `show-action` | 是否显示操作按钮 | 搜索按钮、搜索历史 |
| `action-type` | 操作类型，可选 `cancel` `search` | 搜索按钮、搜索历史 |
| `action-text` | 操作按钮文字 | 搜索按钮、搜索历史 |
| `edit-mode` | 搜索编辑方式：direct 为直接搜索，popup 为弹层搜索 | 搜索按钮、带下拉字段选择 |

<!-- demo-config-notes:end -->

```demo
../example/demos/search-button.vue
```

### 带下拉字段选择

```demo
../example/demos/fields.vue
```

### 搜索历史

组件不会内置持久化；业务侧可在 `search` 事件中接收并保存 `result.recentSearches`。

```demo
../example/demos/history.vue
```

## 自定义与插槽

### 历史展示与插槽

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| ----------------- | ------------------------------------------------- | -------------- |
| `edit-mode` | 搜索编辑方式：direct 为直接搜索，popup 为弹层搜索 | 历史展示与插槽 |
| `recent-searches` | 受控搜索历史 | 历史展示与插槽 |
| `label` | 标签内容；外层 label 关联关键词输入 | 历史展示与插槽 |
| `placeholder` | 占位符 | 历史展示与插槽 |
| `clearable` | 是否可清除 | 历史展示与插槽 |
| `show-action` | 是否显示操作按钮 | 历史展示与插槽 |

<!-- demo-config-notes:end -->

```demo
../example/demos/presentation.vue
```

## 内容与展示

### 取消按钮

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| ------------- | ---------------- | -------- |
| `placeholder` | 占位符 | 取消按钮 |
| `show-action` | 是否显示操作按钮 | 取消按钮 |
| `action-text` | 操作按钮文字 | 取消按钮 |

<!-- demo-config-notes:end -->

```demo
../example/demos/action.vue
```

## 交互与控制

### 交互状态切换

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| ------------- | ------------------------------------- | ------------------ |
| `placeholder` | 占位符 | 交互状态切换、状态 |
| `disabled` | 是否禁用 | 交互状态切换、状态 |
| `shape` | 内层搜索框形状，可选 `round` `square` | 交互状态切换 |
| `readonly` | 是否只读 | 交互状态切换 |

<!-- demo-config-notes:end -->

适用于关键词输入与搜索提交。调整禁用、只读，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

### 状态

```demo
../example/demos/state.vue
```

### 共享字段加载

`loading-mode="line"` 使用 FieldDecorator 的共享加载线；默认模式保留本组件已有的加载展示。加载状态本身不隐式设置 disabled 或 readonly。

### 原生表单与弹层身份

活动关键词输入独占配置的 id；外侧参照和关闭后缓存的输入使用不同内部 id，并退出辅助技术和 Tab 顺序。可见 label 关联对应输入，ariaLabel 优先于标签文案；字段选择器提供字段选择语义，关键词输入使用独立名称。

原生 FormData 始终由外侧参照输入提供一份 name/value；弹层编辑器即时更新同一模型，不重复提交 name。需要弹层参与 HTML 必填等约束校验时，请给 form 设置 id，并用 inputAttrs.form 显式关联。关闭时编辑器释放表单校验归属，缓存输入不会拦截后续提交。

popup 中输入即时更新 v-model；cancel 结束历史界面，业务负责取消自己的请求。非空 recent-searches 才会打开历史界面，切换为阅读模式会释放历史状态。loading 由业务控制，编辑仍可用，重复搜索被阻止；普通 search/change 通知返回的 Promise 不控制等待。

```demo
../example/demos/native-form.vue
```

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数 | 类型 | 缺省与范围 |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text | string | 字段 > FormItem > Form > '-'；显式 '' 有效 |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Search Props

| 参数 | 说明 | 类型 | 默认值 |
| -------------------------- | ------------------------------------------------- | ------------------------- | -------------------------- |
| `v-model` | 搜索关键词 | `string \| null` | `-` |
| `default-value` | 非受控默认关键词 | _string_ | `''` |
| `v-model:model-field` | 当前搜索字段 | _string_ | `-` |
| `default-field` | 非受控默认字段 | _string_ | `-` |
| `v-model:model` | 字段搜索模式下按字段写入的对象 | _Record<string, unknown>_ | `-` |
| `fields` | 搜索字段可选项 | _SearchField[]_ | `[]` |
| `select-style` | 字段选择器样式 | _StyleValue_ | `-` |
| `recent-searches` | 受控搜索历史 | _string[]_ | `[]` |
| `max-search-history-count` | 生成下一份历史时保留的最大数量 | _number_ | `5` |
| `edit-mode` | 搜索编辑方式：direct 为直接搜索，popup 为弹层搜索 | `'direct' \| 'popup'` | `'direct'` |
| `search-button` | 是否显示公共搜索按钮 | _boolean_ | `false` |
| `button-text` | 公共搜索按钮文字 | _string_ | `-` |
| `button-props` | 公共搜索按钮属性 | _ButtonProps_ | `-` |
| `loading` | 手动等待展示；保持编辑，阻止重复搜索 | _boolean_ | `false` |
| `clearable` | 是否可清除 | _boolean_ | `false` |
| `variant` | 输入框风格，可选 `filled` `outline` `standard` | _string_ | `outline` |
| `size` | 输入尺寸，继承 Form / ConfigProvider | `xs / sm / md / lg / xl` | `md` |
| `placeholder` | 占位符 | _string_ | `-` |
| `disabled` | 未设置时继承 FormItem/Form；显式 false 可覆盖 | _boolean_ | `undefined` |
| `readonly` | 未设置时继承 FormItem/Form；显式 false 可覆盖 | _boolean_ | `undefined` |
| `label` | 关键词标签；字段选择器模式下提供名称回退 | _string_ | `-` |
| `shape` | 内层搜索框形状，可选 `round` `square` | _string_ | `round` |
| `background` | 外层背景色 | _string_ | `-` |
| `input-background` | 内层搜索框背景色 | _string_ | `-` |
| `show-action` | 是否显示操作按钮 | _boolean_ | `false` |
| `action-text` | 操作按钮文字 | `string` | 跟随全局语言与 action-type |
| `action-type` | 操作类型，可选 `cancel` `search` | _string_ | `cancel` |
| `search-icon` | 搜索图标名称 | _string_ | `search` |
| `max-length` | 有限非负长度或 `{ length, errorOnly? }`；0 不限；非法值提示并回退不限 | `InputMaxLength` | `0` |
| `enterkeyhint` | 虚拟键盘回车键提示 | _string_ | `search` |
| `read-pretty` | 纯阅读展示；继承 FormItem/Form | `boolean` | `undefined` |
| `loading-mode` | 编辑态加载布局：默认指示器或底部加载线；阅读态使用统一等待指示 | `default / line` | `default` |
| `model-modifiers` | 模型修饰符；沿用 Input 的 trim 行为 | `{ trim?: boolean }` | `{}` |
| `type` | 关键词输入类型；继承 Input 类型约束 | `InputType`<br>`'number' \| 'text' \| 'email' \| 'tel' \| 'password'` | `text` |
| `aria-label` | 关键词输入的可访问名称，优先于 label | `string` | `undefined` |
| `autofocus` | 初始自动聚焦 | `boolean` | `false` |
| `text-color` | 关键词文字颜色 | `string` | `undefined` |
| `focus-color` | 聚焦提示和支持的边框颜色 | `string` | `undefined` |
| `blur-color` | 未聚焦提示颜色 | `string` | `undefined` |
| `input-attrs` | 原生输入属性；活动编辑器身份和单份表单提交由组件管理 | `Record<string, unknown>` | `undefined` |
| `error` | 错误状态；继承 FormItem | `boolean` | `undefined` |
| `empty-value` | 清空输出；省略为空字符串，支持 null 或工厂 | `string \| null \| (() => string \| null)` | `undefined` |

### Search Events

| 事件名 | 说明 | 回调参数 |
| ------------------- | ---------------------------------------- | ------------------------------------ |
| `update:modelValue` | 关键词更新时触发 | `value: string \| null` |
| `update:modelField` | 字段更新时触发 | `field: string` |
| `update:model` | 字段表单更新时触发 | `model: Record<string, unknown>` |
| `input` | 输入期间触发 | `value: string, event: Event` |
| `change` | 失焦、Enter 提交或切换字段时触发 | `value: string \| null, event: Event` |
| `clear` | 清除时触发 | `event: Event` |
| `search` | 点击图标/按钮、按 Enter 或选择历史时触发 | `result: SearchResult, event: Event` |
| `focus` | 聚焦时触发 | `event: FocusEvent` |
| `blur` | 失焦时触发 | `event: FocusEvent` |
| `cancel` | 点击移动端取消按钮时触发 | `event: Event` |

### Search Slots

| 名称 | 说明 | 参数 |
| ---------------- | ------------------------------------ | ----------- |
| `prefix` | 输入框前缀；提供后将替换默认搜索图标 | `-` |
| `suffix` | 输入框后缀 | `-` |
| `clear-icon` | 清除图标 | `{ clear: (event?: Event) => void }` |
| `button-default` | 公共搜索按钮内容 | `-` |
| `button-icon` | 公共搜索按钮图标 | `-` |
| `label` | 标签内容；外层 label 关联关键词输入 | `-` |
| `action` | 操作按钮内容 | `-` |
| `read` | 自定义阅读内容 | `{ value: string \| null, text: string }` |

### Search Methods

| 方法名 | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-` | `-` |
| `blur` | 失焦 | `-` | `-` |

## Types

### SearchField

| 参数 | 说明 | 类型 |
| ------------- | ------------------------------------------ | -------- |
| `label` | 标签内容；外层 label 关联关键词输入 | _string_ |
| `value` | 字段值 | _string_ |
| `placeholder` | 字段占位符，优先于 Search 的 `placeholder` | _string_ |

### SearchResult

| 参数 | 说明 | 类型 |
| ---------------- | -------------- | -------------------------------------- |
| `modelField` | 搜索字段 | _string \| undefined_ |
| `modelValue` | 原始搜索关键词 | `string \| null` |
| `model` | 字段表单对象 | _Record<string, unknown> \| undefined_ |
| `recentSearches` | 下一份搜索历史 | _string[]_ |

输入事件约定：编辑时先 `input`、再 `update:modelValue`；失焦提交仅在值变化时触发 `change`。清空依次触发 `clear → input → update:modelValue → change`，各一次，同时只更新一次搜索字段模型，不自动执行搜索。

输入事件先于模型更新。Enter 会等待 Input 提交及受控模型回填后生成搜索结果；父级拒绝 trim 提议时，搜索仍使用实际受控值。清空按 clear → input → update:modelValue → change 通知，不自动执行搜索。

## 受控模型协议

值优先级为 `modelValue` > `model[当前字段]` > 非受控 `defaultValue`。传入 `model` 且存在当前字段时，缺失/null 字段显示空字符串；同时绑定多个模型时，应在父级保持它们一致。`modelField` 优先于 `defaultField` 和第一项字段；受控值不会被内部强制覆盖。

`model` **不会被原地修改**。每次逻辑更新发出一份 `update:model` 新对象，清空已声明的其他字段、保留未声明属性；请使用 `v-model:model` 或显式接受提议。字段切换只产生一次 `update:modelField → update:modelValue → update:model → change`。父级可拒绝提议，Enter、按钮、历史项搜索均等待一轮更新后读取实际接受的字段、关键词和模型。

历史不按输入过滤，也不内部持久化；`search` 返回的新历史统一 trim、去空、去重并截取最大数量。空关键词不添加记录，非有限/负数最大数量按 0 处理。清空不执行搜索；取消提议空字符串并发出 cancel/change，不提交搜索。

输入编辑发出 `input → update:modelValue`；提交值变化时才发出 `change`。清空为 `clear → input → update:modelValue → change`，仅一次。只读、禁用、loading 会阻止搜索/取消/历史/字段操作；禁用和只读可继承 Form / FormItem / InputGroup。失活或卸载会取消未完成的异步搜索。

### 平台差异

两端默认 edit-mode=direct；Cedar 默认 shape=square，Maple 默认 shape=round。Cedar 保留外侧 InputGroup，Maple 使用移动搜索条布局和触控间距。Input 支持五种尺寸，外层条密度通过 Search 的 CSS 变量控制。

### 公开类型

`SearchEditMode`、`SearchProps`, `SearchEmits`, `SearchSlots`, `SearchExpose`, `SearchField`, `SearchResult`.

### Input 属性透传

inputAttrs 的原生 name、form、ARIA 和数据属性按编辑器归属传递；autocomplete 沿用 Input 的 off 策略。组件管理 id、name、tabindex、aria-hidden 和等待状态，保证活动输入和缓存输入不争用原生身份。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-search-action-color-text` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-search-action-font-size` | `16px` | `font-size` |
| `--mp-search-action-spacing-inline-start` | `16px` | `margin-inline-start` |
| `--mp-search-color-bg` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-search-color-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-search-field-color-bg` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-search-field-radius` | `4px` | `border-radius` |
| `--mp-search-field-size-min-height` | `36px` | `border-radius`, `line-height`, `min-height` |
| `--mp-search-field-spacing-padding` | `0 12px` | `padding` |
| `--mp-search-history-item-color-border` | `var(--mp-sys-color-border-default)` | `border-bottom` |
| `--mp-search-history-item-color-text` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-search-history-item-size-min-height` | `44px` | `min-height` |
| `--mp-search-history-spacing-padding` | `8px 16px 24px` | `padding` |
| `--mp-search-icon-spacing` | `8px` | `margin-inline-end` |
| `--mp-search-label-color-text` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-search-label-font-size` | `16px` | `font-size` |
| `--mp-search-label-spacing-inline-end` | `10px` | `margin-inline-end` |
| `--mp-search-opacity-disabled` | `0.6` | `opacity` |
| `--mp-search-select-icon-size` | `18px` | `font-size` |
| `--mp-search-select-icon-spacing` | `2px` | `margin-inline-start` |
| `--mp-search-select-size-max-width` | `120px` | `max-width` |
| `--mp-search-select-size-min-width` | `96px` | `min-width` |
| `--mp-search-size-icon` | `20px` | `font-size` |
| `--mp-search-size-min-height` | `48px` | `min-height` |
| `--mp-search-spacing-padding` | `8px 16px` | `padding` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-search-action-color-text: var(--mp-sys-color-content-primary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
