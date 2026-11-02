# InputNumber

InputNumber 用于编辑和提交业务数字。两端主体、数值控制器、样式及公开 API 按独立源码复制维护，不共享运行时实例。

- `model-value !== undefined` 表示受控；`default-value` 仅初始化非受控值。编辑草稿允许暂时不同于业务值；提交后若父组件拒绝更新，恢复到父组件值。外部回填不触发用户事件或校验。
- 默认在 Enter / 失焦时更新；`model-event="input"` 输入完整数字时更新，但 `change` 仍在提交时触发。Enter 后再失焦不会重复提交。
- 清空顺序为 **input → update:model-value → change → clear**，值为 `undefined`。这次改造移除了旧的“清空不触发 input/change”行为，不提供兼容分支。
- `-`、`.`、`1.` 等输入中间态暂时保留；提交 `1.` 得到数字 1，单独符号恢复之前的业务值。非法文本、NaN、Infinity 不会写入业务值。IME 组合输入结束后只处理一次。
- 范围优先于精度：舍入后仍限制在 min/max 内，非对齐边界保留实际值。两端采用独立配置的 Decimal 运算，不受应用修改 Decimal 全局配置影响；模型仍是 JavaScript number，不承诺任意精度的大数存储。
- 禁用/只读/尺寸从 InputGroup、FormItem、Form 继承，显式 false 可以覆盖；Cedar 的缺省尺寸再读取 ConfigProvider，Maple 使用现有默认系统。字段外观与 hint 可继承 InputGroup；外层已有 FormItem 标题时不重复显示浮动标签。
- 鼠标、触控都支持长按；释放、取消、移出、窗口失焦、组件停用/卸载或状态变化时停止。移动端建议用 button 布局增加触控面积；↑/↓ 步进，Enter 提交。

所有原生输入统一使用 `autocomplete="off"`，传入原生属性也不会开启自动填充。

## 阅读方向

数字输入继承来源 `dir`，增减按钮随阅读顺序排列。数值、精度和上下键语义保持不变：ArrowUp 增加，ArrowDown 减少；不对数值或显示字符串做反转。

## 基础示例

### 基础与状态

```demo
../example/demos/field-basic.vue
```

## 外观与布局

### 外观组合

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                        | 相关示例                             |
| ------------- | --------------------------- | ------------------------------------ |
| `size`        | 五档均完整实现，可继承      | 表单控件尺寸对照、五档尺寸与字段外观 |
| `variant`     | 字段外观，可继承 InputGroup | 表单控件尺寸对照、五档尺寸与字段外观 |
| `placeholder` | 输入提示                    | 表单控件尺寸对照、五档尺寸与字段外观 |
| `min`         | 最小值                      | 外观组合                             |
| `max`         | 最大值                      | 外观组合                             |
| `disabled`    | 禁用；未设置时继承          | 表单控件尺寸对照                     |

<!-- demo-config-notes:end -->

适用于数量、配额等数值输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 表单控件尺寸对照

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### 三种布局

```demo
../example/demos/field-modes.vue
```

### 五档尺寸与字段外观

```demo
../example/demos/field-options.vue
```

## 数值输入与格式

### 数量控制与提交拦截

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置        | 作用                         | 相关示例                                           |
| ----------- | ---------------------------- | -------------------------------------------------- |
| `clearable` | 允许清空可编辑字段           | 数量控制与提交拦截、格式化与插槽、小步长与范围边界 |
| `mode`      | 步进按钮布局                 | 数量控制与提交拦截、格式化与插槽                   |
| `min`       | 最小值                       | 数量控制与提交拦截、小步长与范围边界               |
| `max`       | 最大值                       | 数量控制与提交拦截、小步长与范围边界               |
| `step`      | 正的有限步长，支持科学计数法 | 数量控制与提交拦截、小步长与范围边界               |
| `formatter` | 只格式化展示，不改变业务数字 | 格式化与插槽、小步长与范围边界                     |

<!-- demo-config-notes:end -->

`disable-input` 只禁止手输与清空，按钮和方向键仍可步进。`disable-increment` / `disable-decrement` 分别禁用方向；`increment-button` / `decrement-button` 控制显示，隐藏的方向同样不能通过键盘触发。`press=false` 关闭连续长按。

`before-commit(value, { previousValue, signal })` 复用字段提交协议，返回 `false` 拒绝，返回 `void` 允许；可返回 Promise。inline 的输入提交、步进与清空均经过拦截，`model-event="input"` 也需先审批后回填。等待期间公开 `aria-busy`、锁定操作，外部回填、禁用、只读、配置变化、停用或卸载会取消旧请求。不要把 signal 取消当作成功。抛错保留原值并触发 `commit-error(error)`。popup 在最终确认时拦截一次，内部草稿不重复审批；错误使用面板现有反馈。启用拦截时，长按不会连续发起审批。

`step(value, direction, event)` 只在已允许且实际改变的步进发生时触发，direction 为 `plus` 或 `minus`。外部回填、拒绝、边界、隐藏或禁用的方向均不触发。

| Prop                                      | Type      | Default |
| ----------------------------------------- | --------- | ------- |
| `disable-input`                           | `boolean` | `false` |
| `disable-increment` / `disable-decrement` | `boolean` | `false` |
| `increment-button` / `decrement-button`   | `boolean` | `true`  |
| `press`                                   | `boolean` | `true`  |

```demo
../example/demos/quantity-controls.vue
```

### 格式化与插槽

```demo
../example/demos/format-slots.vue
```

### 小步长与范围边界

```demo
../example/demos/number-boundaries.vue
```

### 空值标记与有效的 0

接口用 -1 表示未填写时，同时配置 empty-values 与 empty-value。初始输入框为空而模型仍为 -1；点击“设为 0”后应显示 0；清空再次返回 -1。另一字段清空恢复为 0，演示清空输出不一定代表缺失。

```demo
../example/demos/empty-value.vue
```

## 交互与表单

### 交互状态切换

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置        | 作用                          | 相关示例                   |
| ----------- | ----------------------------- | -------------------------- |
| `disabled`  | 禁用；未设置时继承            | 交互状态切换、表单继承     |
| `readonly`  | 只读；允许聚焦复制，禁止改值  | 交互状态切换、表单继承     |
| `clearable` | 允许清空可编辑字段            | 受控值与事件顺序、表单继承 |
| `min`       | 最小值                        | 交互状态切换               |
| `max`       | 最大值                        | 交互状态切换               |
| `error`     | 错误态；未设置时继承 FormItem | 交互状态切换               |

<!-- demo-config-notes:end -->

适用于数量、配额等数值输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

### 受控值与事件顺序

```demo
../example/demos/controlled-events.vue
```

### 表单继承

```demo
../example/demos/form-inheritance.vue
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

### 清空输出

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

### Props

| 属性          | 说明                                         | 类型                            | 默认值           |
| ------------- | -------------------------------------------- | ------------------------------- | ---------------- |
| model-value   | 受控值；undefined 表示空值/非受控            | `number`                        | —                |
| default-value | 非受控初始值                                 | `number`                        | —                |
| mode          | 步进按钮布局                                 | `embed \| button \| input`      | `embed`          |
| precision     | 小数位数 0–100，不小于 step 的小数位         | `number`                        | —                |
| step          | 正的有限步长，支持科学计数法                 | `number`                        | `1`              |
| disabled      | 禁用；未设置时继承                           | `boolean`                       | 继承，否则 false |
| error         | 错误态；未设置时继承 FormItem                | `boolean`                       | 继承，否则 false |
| max           | 最大值                                       | `number`                        | `Infinity`       |
| min           | 最小值                                       | `number`                        | `-Infinity`      |
| formatter     | 只格式化展示，不改变业务数字                 | `(text: string) => string`      | —                |
| parser        | 每次编辑解析一次原始输入                     | `(text: string) => string`      | —                |
| placeholder   | 输入提示                                     | `string`                        | —                |
| size          | 五档均完整实现，可继承                       | `xs \| sm \| md \| lg \| xl`    | 继承，否则 md    |
| variant       | 字段外观，可继承 InputGroup                  | `outline \| filled \| standard` | `outline`        |
| hint          | 浮动提示，可继承 InputGroup / FieldDecorator | `boolean`                       | 库默认           |
| clearable     | 允许清空可编辑字段                           | `boolean`                       | `false`          |
| model-event   | model 更新时机；change 仍只在提交时触发      | `change \| input`               | `change`         |
| readonly      | 只读；允许聚焦复制，禁止改值                 | `boolean`                       | 继承，否则 false |
| input-attrs   | 原生 input 补充属性                          | `Record<string, unknown>`       | —                |

### Events

| 事件               | 参数                                                       | 说明                                         |
| ------------------ | ---------------------------------------------------------- | -------------------------------------------- |
| input              | `(value: number \| undefined, text: string, event: Event)` | 编辑后解析值与展示文本                       |
| update:model-value | `(value: number \| undefined)`                             | 请求修改业务值                               |
| change             | `(value: number \| undefined, event: Event)`               | 提交、步进或清空                             |
| clear              | `(event: Event)`                                           | 主动清空                                     |
| focus              | `(event: FocusEvent)`                                      | 获取焦点                                     |
| blur               | `(event: FocusEvent)`                                      | 失去焦点                                     |
| keydown            | `(event: KeyboardEvent)`                                   | 原生键盘事件，可 preventDefault 拦截默认操作 |

### Slots

| 插槽             | 参数                                 | 说明           |
| ---------------- | ------------------------------------ | -------------- |
| prefix / suffix  | —                                    | 字段内部前后缀 |
| prepend / append | —                                    | 字段外部标签   |
| plus / minus     | —                                    | 步进按钮图标   |
| clear-icon       | `{ clear: (event?: Event) => void }` | 自定义清除按钮 |

### Methods

| 方法 / 属性 | 类型                               | 说明             |
| ----------- | ---------------------------------- | ---------------- |
| focus       | `(options?: FocusOptions) => void` | 聚焦，禁用时无效 |
| blur        | `() => void`                       | 失焦             |
| select      | `() => void`                       | 选中输入内容     |
| inputRef    | `HTMLInputElement \| undefined`    | 原生输入元素     |

## 类型定义 / Types

```ts
import type {
  InputNumberFormatter,
  InputNumberInstance,
  InputNumberMode,
  InputNumberModelEvent,
  InputNumberParser,
  InputNumberProps,
  InputNumberSize,
  InputNumberVariant,
} from '@maple-design/ui'
```

## 样式变量

| Token                                               | Default                                 |
| --------------------------------------------------- | --------------------------------------- |
| `--mp-input-number-step-button-width`               | `var(--mp-sys-control-height-md)`       |
| `--mp-input-number-step-button-color`               | `var(--mp-sys-color-content-secondary)` |
| `--mp-input-number-step-button-disabled-color`      | `var(--mp-sys-color-content-disabled)`  |
| `--mp-input-number-step-button-border-color`        | `var(--mp-sys-color-border-subtle)`     |
| `--mp-input-number-step-button-background`          | `var(--mp-sys-color-surface-muted)`     |
| `--mp-input-number-step-button-hover-background`    | `var(--mp-sys-color-state-hover)`       |
| `--mp-input-number-step-button-active-background`   | `var(--mp-sys-color-state-selected)`    |
| `--mp-input-number-step-button-icon-size`           | `14px`                                  |
| `--mp-input-number-step-button-transition-duration` | `0.2s`                                  |
| `--mp-input-number-addon-background`                | `var(--mp-sys-color-surface-muted)`     |
| `--mp-input-number-addon-color`                     | `var(--mp-sys-color-content-primary)`   |
| `--mp-input-number-addon-border-color`              | `var(--mp-sys-color-border-default)`    |
| `--mp-input-number-border-width`                    | `1px`                                   |
| `--mp-input-number-border-radius`                   | `var(--mp-field-border-radius)`         |
| `--mp-input-number-size-xs-step-button-width`       | `var(--mp-sys-control-height-xs)`       |
| `--mp-input-number-size-sm-step-button-width`       | `var(--mp-sys-control-height-sm)`       |
| `--mp-input-number-size-md-step-button-width`       | `var(--mp-sys-control-height-md)`       |
| `--mp-input-number-size-lg-step-button-width`       | `var(--mp-sys-control-height-lg)`       |
| `--mp-input-number-size-xl-step-button-width`       | `var(--mp-sys-control-height-xl)`       |

字段通用外观继续使用 FieldDecorator 的 `--mp-field-*` Token。旧 step-layer-border-radius 已移除，不保留别名。

### Form 字段展示与确认

本组件支持 `edit-mode`，字段 > FormItem > Form 逐层继承；未指定时为 `direct`，保留直接编辑。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

统一光标色通过 `--mp-field-caret-color` 设置（默认 `currentColor`）；本组件可用 `--mp-input-number-caret-color` 单独覆盖，默认 `var(--mp-field-caret-color)`。

显式 beforeCommit 等待会沿用现有 loadingMode 指示器并设置实际输入的 aria-busy。手动 loading 保持业务所有权，不会隐式只读；beforeCommit 守卫保留已有输入锁定规则。change/step 等通知返回 Promise 不控制等待。
