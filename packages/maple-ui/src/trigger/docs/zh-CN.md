# Trigger

无视觉样式的锚点浮层基础组件，负责触发、定位、挂载和打开状态。默认插槽是触发元素，content 插槽是浮层内容。

## 共同契约

| Prop | 含义 | 类型 / 值 |
| --- | --- | --- |
| open | 打开状态；update:open 请求更新 | boolean |
| popupContainer | undefined 默认 body；false 原地渲染；selector 找不到时提示并回退 body | string / HTMLElement / false |
| placement | top / bottom / left / right，各自支持 -start / -end | 十二方位 |
| cover | 覆盖触发元素，不增加另一套 placement 枚举 | boolean，默认 false |
| autoFitPopupWidth | 浮层宽度跟随触发元素宽度 | boolean |
| closeOnClickReference | 再次点击触发元素时关闭 | boolean |
| popupStyle | 定位容器样式，不等同于内容面板样式 | CSSProperties |

普通通知为 open、opened、close、closed、click-outside。open/close 表示开始，opened/closed 表示动画结束。
外部 open 变化也触发实际生命周期；update:open 仅用于请求更新。open-change 保留为内部交互请求的 boolean 通知，不代替生命周期。

## 定位迁移

Cedar：tl/tr/bl/br/lt/lb/rt/rb 分别改为 top-start/top-end/bottom-start/bottom-end/left-start/left-end/right-start/right-end。

Maple：cover-top → bottom + cover，cover-bottom → top + cover，cover-left → right + cover，cover-right → left + cover；-start/-end 后缀保留。覆盖模式是向触发元素内部退回一个触发元素的主轴尺寸，不是普通外侧定位。

偏移保留真实语义：Cedar popupOffset 是向外的主轴距离，popupTranslate 是平面平移；
Maple offsetX/offsetY 是屏幕水平/垂直偏移。二者不能仅换名字。

高层组件挂载优先级：显式顶层 popupContainer（包括 false）→ 嵌套 triggerProps/popupProps/pickerProps → body。
容器应在客户端挂载时存在；异步创建容器后请更新绑定值。SSR 不依赖 document/HTMLElement，客户端挂载后解析 selector。

## 双端边界

两端均支持 trigger 数组、focus、延迟与独立 reference；Cedar 保留自动最小宽度等扩展，Maple 保留 Popper strategy。
这些扩展不通过空实现扩大另一端的类型。Popover、Menu 支持 cover 透传。

## 基础契约对齐（2026-09-08）

`open` 是受控状态；没有传入时使用组件内部状态。`default-open` 仅设置非受控初始状态。用户操作派发 `update:open`，由调用者更新受控值；外部更新不重复派发更新请求。SVG 图标和 Fragment 组件根节点可直接作为触发元素。

计划及迁移范围见 `design-ui/refactors/foundation-alignment/plan.md` 和 `migration.md`。当前状态、触发目标、交互与弹层层级独立同源复制；定位引擎仍分端适配，渲染结构及主要渲染 API 已对齐。

## Trigger 交互基础对齐（2026-09-08）

两端共同支持 trigger 的 hover/click/focus/contextMenu/manual 与数组组合，默认 hover；mouseenter/mouseleave 延迟均为 100 ms，focusDelay 为 0。popupHoverStay、blurToClose、closeOnClickReference、clickOutsideToClose、escToClose、restoreFocus 均默认 true。

reference 接受选择器或 HTML/SVG 元素，不传时使用默认插槽的首个实际元素。公开方法包含 open、close、resize、getReference、setReference、allowClose、isTopLayer；setReference(undefined) 恢复 prop/插槽目标。

外部点击统一使用 click；同一次 Escape/外部点击只由最上层弹层响应。嵌套 Teleport 内容按内部点击处理。受控 open 未被父级接受时，不实际关闭或恢复焦点。

Maple Menu/Popover 保留 click 和零悬停延迟，Tooltip 保留零悬停延迟；Select/Cascader 显式 click。直接使用 Maple Trigger 的调用者如需旧默认，应显式设置 trigger="click"、closeOnClickReference=false。

共同源码覆盖状态、触发目标、交互事件、弹层层级；定位引擎仍分端适配；渲染结构已独立复制。

## 渲染与过渡契约

Trigger 使用共同的定位层 → 动画层 → 内容层结构。`popupClass/popupStyle` 控制定位层，`contentClass/contentStyle` 控制内容层；动画作用于独立包装层，不会覆盖定位引擎的位移。`showArrow` 默认 false，`arrowClass/arrowStyle` 设置装饰箭头，箭头不参与辅助技术朗读。

`unmountOnClose` 默认 **true**：初始关闭不创建内容，关闭时保留到离场动画完成，再卸载。设置 false 可保留输入状态。`duration` 接受毫秒数或 `{ enter, leave }`；`opened/closed` 只在对应过渡完成时各触发一次，过渡取消不派发完成事件。默认打开也会执行入场并触发 opened。

直接使用 Maple Trigger 且依赖隐藏内容常驻的代码应设置 `:unmount-on-close="false"`。Maple Menu/MenuChildren/Select/Cascader 已显式保留该行为；Tooltip/Popover 默认 false，支持通过同名 prop 调整。Maple Popover 的默认外观和 popoverClass 位于内容层，popupClass 仍用于定位层。

Maple 独立使用 Trigger 箭头时需引入 `@maplejs/maple-ui/trigger/style`；Menu/Tooltip/Popover/Select/Cascader 的样式入口已包含依赖。箭头 token 为 `--mp-trigger-arrow-bg`、`--mp-trigger-size-arrow-width`、`--mp-trigger-arrow-border-radius`；Cedar 使用对应 c 前缀 token。

`focusReference()` 将焦点恢复到触发元素，并抑制此次焦点事件再次打开 focus 触发器。Menu 在关闭被接受后通过该方法恢复焦点；受控关闭被拒绝时保留当前焦点。
