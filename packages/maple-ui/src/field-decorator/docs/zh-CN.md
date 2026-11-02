# FieldDecorator 字段装饰器

FieldDecorator 是 Input、Textarea、Select 与日期时间控件的展示外壳，负责边框、尺寸、浮动提示、前后缀和清除按钮；不管理输入值、表单校验或弹层开合。

Cedar 完成实现后独立复制到 Maple，替换命名空间与导入路径；两端不引用另一端的运行时代码。主体、几何测量、插槽、事件及样式规则一致。

- 三种变体：`outline`（默认）、`filled`、`standard`。消费者可以显式选择自己的默认变体。
- 五种尺寸：`xs / sm / md / lg / xl`，默认 `md`；具体高度使用各端 token。
- `hint` 默认 Cedar 为 `false`，Maple 为 `true`。其他行为一致；Input 在 FormItem 已有外部标签时关闭浮动提示。
- 有内容且可编辑时才渲染清除按钮；`0` 算非空，`[]` 算空。Cedar 在 hover/focus 时显示，Maple 常驻；触屏媒体条件下 Cedar 也常驻。
- 默认按钮通过各端全局语言系统读取无障碍文案，不维护组件私有词典。
- 内容列尺寸使用 ResizeObserver 观察，支持前缀变化及隐藏容器重新显示；卸载时清理监听。

## 基础示例

### 表单控件尺寸对照

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

```demo
../example/demos/control-sizes.vue
```

## 加载与等待

### 共享字段加载

```demo
../example/demos/loading.vue
```

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

当前 FieldDecorator 不额外绘制外圈 outline；outline 通过 border-state 边框、filled 通过背景、standard 通过底线响应 `--focus` 或 `:focus-within`。内部清除、密码切换和数字步进按钮保留自身键盘焦点指示。只读保留聚焦，禁用和错误的颜色优先级不变；不据此宣称错误态焦点可辨识性或原生可访问性已验收。

Input、Textarea、InputNumber 的实际原生控件使用 `caret-color: currentColor`，不再由 field-focus-color／field-error-color 染色。field-focus-color、field-error-color 和 field-border-width 仍有提示、边框或按钮 outline 消费，不能因移除 caret／外偏移路径而删除 Token。实例 focus-color 控制现有支持的变体／提示通道，不承诺改变 caret；没有新变量、默认值或业务 API 变更。

`--mp-field-caret-color` 默认 `currentColor`，统一控制 Input、InputNumber 与 Textarea 的光标颜色；不改变文字色。

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责，不隐式改变 disabled/readonly；需要禁止编辑时单独设置。


### Loading tokens

| Token | Default |
| --- | --- |
| `--mp-field-loading-line-size` | `2px` |
| `--mp-field-loading-duration` | `1s` |
| `--mp-field-loading-color` | `var(--mp-field-focus-color)` |

动态更换 `tag` 后，尺寸观察会绑定当前根节点和内容节点。KeepAlive 停用释放观察和排队测量；旧激活代次的帧不会修改当前布局。
