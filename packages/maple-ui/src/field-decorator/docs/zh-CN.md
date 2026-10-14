# FieldDecorator 字段装饰器

FieldDecorator 是 Input、Textarea、Select 与日期时间控件的展示外壳，负责边框、尺寸、浮动提示、前后缀和清除按钮；不管理输入值、表单校验或弹层开合。

## 两端同源约定

Cedar 完成实现后独立复制到 Maple，替换命名空间与导入路径；两端不引用另一端的运行时代码。主体、几何测量、插槽、事件及样式规则一致。

- 三种变体：`outline`（默认）、`filled`、`standard`。消费者可以显式选择自己的默认变体。
- 五种尺寸：`xs / sm / md / lg / xl`，默认 `md`；具体高度使用各端 token。
- `hint` 默认 Cedar 为 `false`，Maple 为 `true`。其他行为一致；Input 在 FormItem 已有外部标签时关闭浮动提示。
- 有内容且可编辑时才渲染清除按钮；`0` 算非空，`[]` 算空。Cedar 在 hover/focus 时显示，Maple 常驻；触屏媒体条件下 Cedar 也常驻。
- 默认按钮通过各端全局语言系统读取无障碍文案，不维护组件私有词典。
- 内容列尺寸使用 ResizeObserver 观察，支持前缀变化及隐藏容器重新显示；卸载时清理监听。

## Props

描边缺口通过 `fieldset / legend` 实现，不使用背景色遮罩。缺口起点与内容列对齐，左右各预留 `hint-space`；`padding-inline-start` 中的 CSS `max()/calc()` 必须使用 Less 原样输出，避免不同 Less 版本将其提前计算为 `0px`。`check:input` 同时检查源码一致性和两端 Less 编译产物。

| 属性 | 类型 | 默认值 / 含义 |
| --- | --- | --- |
| `tag` | `'div' \| 'span'` | `div`，外壳标签 |
| `value` | `unknown` | 仅判断内容是否为空 |
| `id` | `string` | 浮动标签关联的原生控件 id |
| `title` | `string` | 原生标题提示 |
| `size` | `ComponentSize` | `md`，实现全部五档尺寸 |
| `variant` | `'outline' \| 'filled' \| 'standard'` | `outline` |
| `placeholder` | `string` | 浮动标签文本 |
| `hint` | `boolean` | Cedar false / Maple true |
| `hint-center` | `boolean` | `true`；多行控件设为 false |
| `line` | `boolean` | `true`，是否显示边框或底线 |
| `focused` | `boolean` | 消费者传入焦点状态 |
| `composing` | `boolean` | 输入法组合期间保持标签浮起 |
| `disabled` / `readonly` / `error` | `boolean` | 消费者合并 Form / Group 后传入 |
| `clearable` | `boolean` | `false`，是否允许清除 |
| `text-color` / `focus-color` / `blur-color` | `string` | 自定义文字、焦点和非焦点颜色 |
| `cursor` | `string` | 自定义光标 |

## 插槽与事件

`default` 放原生输入框、标签或展示内容；`prefix` / `suffix` 放附加内容；`clear-icon` 接收 `clear(event?)`，自定义按钮应调用它，清除不会冒泡打开选择面板。

`clear(event)` 通知消费者更新值；`mousedown(event)` 供消费者管理焦点。外壳不自行修改模型。

样式语义统一使用 `--c-field-*` / `--mp-field-*`；声明集中在各自 `style/token.less`，实现不跨库共享。不要在消费者中重复绘制边框。

## 错误与禁用边框变量

以下后缀分别加上 `--c-field-` / `--mp-field-`：`variant-outline-border-color-error` 控制 outline 错误边框；`variant-standard-line-color-error` 控制 standard 错误底线；`variant-standard-line-color-disabled` 控制 standard 禁用底线，默认引用 system border-subtle。禁用优先于错误、hover 和 focus。三个入口均支持局部覆盖；错误提示文字仍由 `field-error-color` 管理。内部变量不是业务 API，已确认无消费的遗留内部声明直接删除，不提供别名。
## 键盘焦点

内部原生控件命中 `:focus-visible` 时，外壳独立绘制焦点环，错误背景和边框不会覆盖它。只读允许聚焦，禁用不绘制焦点环。颜色使用实例 focus-color 或 field-focus-color，宽度和外偏移复用 field-border-width；适用于 Input、Textarea、Date 和 Time 等消费者。
