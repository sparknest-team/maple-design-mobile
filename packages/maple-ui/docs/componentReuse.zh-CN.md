# Cedar / Maple 跨端代码复用调研

审计日期：2026-09-30。基于当前工作区源码（包含正在进行的 API 对齐改动），不是发布版本保证。标记规则更新：2026-09-21；已完成的完整同源与逻辑同源均有独立源码门禁。

已同源 44 组；待同源 0 组；待适配 11 组；逻辑待同源 3 组；逻辑已同源 12 组；独立 1 组。按组件族计数，包含子组件及异名 Drawer / Popup；不等于菜单条目数量。

## 菜单标记

| 标记 | 含义 | 建议顺序 |
| --- | --- | --- |
| [已同源] | 已完成对应范围的源码对齐并纳入一致性检查；两端各自维护源码 | P0：保持检查，作为后续样板 |
| [逻辑已同源] | 稳定逻辑已独立复制并纳入一致性检查；端侧展示/交互按职责保留 | P0：保持检查 |
| [待同源] | 主体适合同源复制；尚待实现对齐与双端验证，不是已完成 | P1 |
| [待适配] | 先对齐 API 或适配依赖，再同源复制主体；尚未完成 | P2 |
| [逻辑待同源] | 计划将内部逻辑同源复制为两份，保留端侧展示/交互；尚未完成 | P3 |
| [独立] | 同名但语义层级不同，不要求主体同源 | 暂缓 |

未标记表示本次没有确认跨端对应关系，或是主题/指南/指令等页面；不表示无法复用。所有候选均采用独立复制、双端同步维护；不引用同一份核心，不建立跨库运行时依赖，不通过外部模板生成组件源码。各库内部工具复用不受影响。

## 调研依据和限制

重新运行 api-contract-inventory.mjs，从 TypeScript 根入口追踪得到 Cedar 127 / Maple 119 个运行时 Props 导出，95 个同名导出可比较（包含子组件）。Props 名称相同不能证明默认值、类型、事件、插槽、方法和行为完全一致。额外检查了主体模板/TSX、事件触发、插槽、计时与弹层依赖；详细 Props 键差异见下方附录。Search 等根导出不对称也单独列为候选。

copied-components-check.mjs 覆盖完整同源主体；copied-foundations-check.mjs 覆盖逻辑同源控制器。安装入口、主题 token、图标及端侧视图仍由两库独立维护。新增检查不会自动升级分类，须完成双端验证后更新。

初轮完成调研、菜单和文档标记；后续已完成的复制重构按同源标记维护。后续严格遵循包内复制 + 一致性检查方式：先修改并验证一端，再复制自然一致的部分至另一端，仅调整前缀、本地导入与必要端侧实现，后续两边同步修改。不抽取两端共同引用的核心实现，不共享实例或状态。

## 逐组件建议

| Cedar | Maple | 标记 | 依据 / 同源对齐前置条件 |
| --- | --- | --- | --- |
| affix | affix | 已同源 | 现有 copied-components-check 已验证主体、Props、样式及契约测试的规范化一致性；保留各库 platform、命名空间及安装入口。 |
| badge | badge | 已同源 | 现有 copied-components-check 已验证主体、Props、样式及契约测试的规范化一致性；保留各库 platform、命名空间及安装入口。 |
| card | card | 已同源 | 现有 copied-components-check 已验证主体、Props、样式及契约测试的规范化一致性；保留各库 platform、命名空间及安装入口。 |
| switch | switch | 已同源 | 现有 copied-components-check 已验证主体、Props、样式及契约测试的规范化一致性；保留各库 platform、命名空间及安装入口。 |
| space | space | 已同源 | 独立同源复制已复核：主体、Props、子节点展开、主样式、五档尺寸 token 与配对测试一致。两端默认 wrap=false、size=md、block=true；Maple 内置主题同步 Cedar 间距。不共享核心或实例，仅保留本地安装和命名空间适配。 |
| divider | divider | 已同源 | 2026-09-08 完成独立源码复制；主体、Props、关键样式和配对测试纳入一致性检查，双端组件测试及 SSR 通过。动态增删默认插槽会同步更新带文字样式；opacity=0 生效；hairline 优先于 thickness，并输出 aria-orientation。 |
| alert | alert | 已同源 | 2026-09-08 完成独立源码复制；主体、Props、关键样式和配对测试纳入一致性检查，双端组件测试及 SSR 通过。关闭按钮支持键盘操作，close 只触发一次，closed 在离场动画完成后触发。Maple 内部关闭类由 __close-icon 调整为 __close-btn；默认图标资源由各库本地适配。 |
| tag | tag | 已同源 | 2026-09-08 完成独立源码复制；主体、Props、关键样式和配对测试纳入一致性检查，双端组件测试及 SSR 通过。两端保留独立的 show/checked 状态，受控值由调用方更新；保留淡出效果，class/style 显式透传给实际标签。尺寸配置、RTL 上下文及图标资源由各库本地适配，移动端触控尺寸保留在 token 中。 |
| count-to | count-to | 已同源 | 2026-09-08 完成独立源码复制；主体、Props、关键样式和配对测试纳入一致性检查，双端组件测试及 SSR 通过。动画在卸载及 KeepAlive 停用时暂停，重新激活后恢复；各实例的数值和动画状态独立。 |
| countdown | countdown | 已同源 | 2026-09-08 完成独立源码复制；主体、Props、关键样式和配对测试纳入一致性检查，双端组件测试及 SSR 通过。SSR 输出初始格式化时间。暂停时修改 format 会更新显示；结束事件每轮只触发一次，reset 后可开始新一轮；卸载清理动画帧。 |
| statistic | statistic | 已同源 | 2026-09-08 完成独立源码复制；主体、Props、关键样式和配对测试纳入一致性检查，双端组件测试及 SSR 通过。默认插槽动态出现/消失时同步切换占位文字；动画在卸载及 KeepAlive 停用时暂停。 |
| skeleton | skeleton | 已同源 | 2026-09-08 完成独立源码复制；主体、Props、关键样式和配对测试纳入一致性检查，双端组件测试及 SSR 通过。Skeleton、SkeletonLine、SkeletonShape 均采用独立复制的源码；各库骨架主题和尺寸 token 独立维护。 |
| steps | steps | 已同源 | 2026-09-08 完成独立源码复制；主体、Props、关键样式和配对测试纳入一致性检查，双端组件测试及 SSR 通过。Steps 和 Step 的主体、Props、上下文协议与样式同源复制；注入 Symbol 分别定义在各库，不跨库共享。保留四种 type 和原有状态/事件契约。 |
| page-header | page-header | 已同源 | 2026-09-08 完成独立源码复制；主体、Props、关键样式和配对测试纳入一致性检查，双端组件测试及 SSR 通过。返回按钮统一使用原生 button，支持键盘触发并派发 back(MouseEvent)。Cedar 内部类名由 c-page-header-xxx 调整为 c-page-header__xxx；图标资源仍由本库提供。 |
| icon | icon | 已同源 | 2026-09-08 完成独立源码复制；主体、Props、关键样式和配对测试纳入一致性检查，双端组件测试及 SSR 通过。只解析本应用已注册的图标；连续切换 name 会取消过期定时器，卸载后不再执行切换。各库注册前缀和历史 spin 类由本地适配保留，图标资源不跨库引用。 |
| avatar | avatar | 已同源 | 2026-09-11 完成独立源码复制；Avatar/AvatarGroup 主体、Props、图片 load/error、文字缩放与分组折叠纳入一致性检查。size 支持 CSS 长度；ObjectFit 更名为 AvatarObjectFit。图标、Popover、安装入口与 token 前缀由各库适配。 |
| button | button | 已同源 | 共同契约补齐后选择 Maple：Button/ButtonGroup、Props、交互逻辑、样式和 12 组 demo 已复制对齐并纳入检查；注册入口和命名空间各自保留。竞赛证据见 button-race.json。 |
| breadcrumb | breadcrumb | 已同源 | 2026-09-08 完成 Breadcrumb / BreadcrumbItem 独立源码复制；主体、Props、上下文、类型、关键样式及配对测试纳入一致性检查。双端组件测试与 SSR 通过；图标、安装入口、Menu 和主题 token 本地适配。统一非空 routes 优先、分隔符优先级与 select(route, event)，修复空 routes 和省略项菜单行为。 |
| collapse | collapse | 已同源 | 2026-09-15 完成独立源码复制；Collapse/CollapseItem 主体 SFC、9 项公共 Props、change/toggleAll、键盘与 destroyOnHide 纳入一致性检查。去掉 Maple elevation；默认图标与尺寸 token 由各库 platform 适配。 |
| pagination | pagination | 已同源 | 统一主体 SFC、23 项 Props、4 个事件、6 个插槽、分页状态与按钮和布局；12 组 demo 对齐。Locale、Input、Select 使用显式平台适配，480px 容器自动简洁模式；同源检查覆盖 13 个实现文件。 |
| empty | empty | 已同源 | 2026-09-15 完成独立源码复制；主体 SFC、6 项 Props、click、image/default/extra 插槽与尺寸档位纳入一致性检查。去掉 icon/inConfigProvider；ConfigProvider 空状态、默认图标、locale 与尺寸 token 由各库 platform 适配。 |
| result | result | 已同源 | 2026-09-20 完成独立源码复制：Result 主体渲染、公共 Props、状态图形、animation/imageSize、插槽与关键 token 已统一，并由 lightweight-feedback-same-source 门禁验证。两端仅保留图标资源和本地入口适配。 |
| link | link | 已同源 | 以 Cedar 原生链接与 hoverable 为基础，补齐键盘焦点、加载动画、动态图标插槽及禁用属性透传；主体、Props、主样式和配对测试独立复制并验证，保留本地图标和主题 token。 |
| loading | loading | 已同源 | 2026-09-20 完成独立源码复制：Loading 主体渲染、公共 Props、五类动画、数值尺寸、hideIcon、内容遮罩、插槽与关键 token 已统一，并由 lightweight-feedback-same-source 门禁验证。 |
| grid | grid | 已同源 | Grid/GridItem/Row/Col 主体、Props、响应式逻辑、样式和契约测试已按包内复制统一；Row/Col 有独立源码、安装和样式入口，两端 demo 配对。 入口职责已分离：Grid 仅包含 Grid.Item；Row/Col 独立入口、注册、文档与 Demo，不再通过 Grid 转导出。 |
| input-number | input-number | 已同源 | 主体、19 项 Props、数值编辑/提交控制器、独立 Decimal 运算、触控长按、样式及 Token 已独立复制；14 对核心/视图/样式/测试文件和 7 对 Demo 纳入一致性门禁。两端分别接入本库表单与全局多语言，77 项测试及双端类型检查和包构建通过；Checkbox / Radio 另批处理。 |
| ellipsis | ellipsis | 已同源 | 主体、Props、样式/Token 与配对测试独立复制；统一受控 expand/defaultExpand、键盘展开、Tooltip 配置与内容回退，移除多余外壳。与 BackTop 共 12 对文件门禁，仅前缀/本地导入不同。 |
| progress | progress | 待适配 | Progress 百分比和尺寸已有一致性检查；steps/animation/bufferColor 与 rotate/textClass/track 不同，对齐公共 line/circle，保留扩展渲染；Group 的 tooltip 触发也需适配。 |
| progress-group | progress-group | 待适配 | Progress 百分比和尺寸已有一致性检查；steps/animation/bufferColor 与 rotate/textClass/track 不同，对齐公共 line/circle，保留扩展渲染；Group 的 tooltip 触发也需适配。 |
| back-top | back-top | 已同源 | 主体、Props、滚动控制器、样式/Token 和配对测试独立复制；默认监听页面，200ms/quartOut，支持动态目标、原生键盘、KeepAlive/卸载取消及 SSR。与 Ellipsis 共 12 对文件门禁，不共享运行时。 |
| watermark | watermark | 已同源 | 2026-09-20 已完成独立同源：统一 Canvas renderer、Props/types、文字与图片、多行/自动测量、repeat/staggered、grayscale、antiTamper、fullscreen、error/redraw、SSR 和生命周期；Maple 已删除 foreignObject content 插槽及 resize 旧方法。两端主体仅保留前缀、本地 import 和主题标识差异，并纳入源码门禁。 |
| checkbox | checkbox | 待适配 | Group/独立值模型、选项映射/类型、label 插槽、readonly/半选与局部激活已独立复制；CheckboxGroup 批量方法完成。RadioGroup 局部箭头/Home/End、单一 Tab 入口、动态 DOM 顺序和 KeepAlive 清理已复制；Radio button 与五档高度的样式/变体已复制。19 对核心/样式/测试与 11 对 Demo 纳入门禁。主体结构、圆形控件样式和端侧视觉差异仍待收口，保留待适配。 |
| radio | radio | 待适配 | Group/独立值模型、选项映射/类型、label 插槽、readonly/半选与局部激活已独立复制；CheckboxGroup 批量方法完成。RadioGroup 局部箭头/Home/End、单一 Tab 入口、动态 DOM 顺序和 KeepAlive 清理已复制；Radio button 与五档高度的样式/变体已复制。19 对核心/样式/测试与 11 对 Demo 纳入门禁。主体结构、圆形控件样式和端侧视觉差异仍待收口，保留待适配。 |
| rate | rate | 待适配 | 可同源对齐命中计算、范围/步长与值模型；Rate 的 grading 与图标扩展、Slider 的 marks/showInput/showTicks 与触控标签/颜色不同，统一 pointer 交互后再同源对齐主体。 |
| slider | slider | 待适配 | 可同源对齐命中计算、范围/步长与值模型；Rate 的 grading 与图标扩展、Slider 的 marks/showInput/showTicks 与触控标签/颜色不同，统一 pointer 交互后再同源对齐主体。 |
| input | input | 待适配 | 2026-09-22 已将受控/非受控值、trim 提交、change 去重、清空基线、数字文本/长度归一化与输入法重复提交抽为两端独立复制的同源逻辑；超长输入均截断并上报归一化值，FormItem 的 change/input/focus/blur/clear 触发条件也已对齐。Input 主体仍分别为 Cedar TSX 与 Maple SFC，hint/line/颜色及 FieldDecorator 展示不同，尚未完成主体同源。 |
| textarea | textarea | 待适配 | 2026-09-22 已将长度归一化、输入法去重、自动高度尺寸计算抽为两端独立复制的同源逻辑；FormItem 触发条件及 size/disabled/readonly/error 状态继承也已对齐。PC 与移动端的默认 resize、尺寸观察器、FieldDecorator 展示和移动端 hint/line/颜色仍不同，主体尚未同源。 |
| verification-code | verification-code | 待适配 | 输入内核可对齐，但 defaultValue、字数统计、hint/line/颜色、modelModifiers 及粘贴/输入法行为不同；Search 还需核对历史、结果、搜索字段与取消动作，不能仅按根 Props 导出名判断。 |
| search | search | 待适配 | 输入内核可对齐，但 defaultValue、字数统计、hint/line/颜色、modelModifiers 及粘贴/输入法行为不同；Search 还需核对历史、结果、搜索字段与取消动作，不能仅按根 Props 导出名判断。 |
| infinite-scroll | infinite-scroll | 已同源 | 2026-09-21 完成独立源码复制：主体 SFC、Props 与关键样式纳入同源门禁，统一分页状态机、CSS length 阈值、滚动容器、可见性恢复、KeepAlive 与清理行为。两端 locale.ts 仅桥接各自的全局语言系统，不持有独立语言状态，也不共享运行时。 |
| list | list | 待适配 | InfiniteScroll Props 同名，可同源对齐观察与加载状态；List 的 maxHeight/scrollbar/virtualListProps 仅 Cedar 有，虚拟化应是扩展能力。 |
| image | image | 已同源 | 2026-09-15 完成独立源码复制；Image/Preview/PreviewGroup 主体 SFC、加载回退、预览控制器与命令式 API 纳入一致性检查。去掉 platform.config；懒加载用原生 loading、图标/默认加载器/默认值由各库 platform 与 setPropsDefaults 适配。 |
| overlay | overlay | 已同源 | 2026-09-21 完成独立同源：主体 SFC、Props 和结构样式已复制并纳入门禁；统一 popup-layer/z-index、容器滚动锁、真实 Teleport Document、背景 pointer 序列、最上层 ESC、受控状态、KeepAlive 和过渡生命周期。 |
| dialog | dialog | 逻辑已同源 | 2026-09-21 完成逻辑同源。两端 Dialog 直接消费同源 modal-surface，不再嵌套 Popup 或维护端侧弹层状态机；use-dialog、use-dialog-drag、service 三份核心均为独立复制并纳入门禁，统一 beforeClose 竞态、拖拽、Promise/update/close、默认配置、宿主销毁及 app context。PC 与移动端保留各自 DOM、图标和样式。 |
| style-provider | style-provider | 已同源 | 主体、Props、函数注入、安装、默认值设置及配对测试已独立同源；仅前缀与本地导入不同，不共享运行时代码或状态。 |
| select | select | 已同源 | 主体、控制器、选项与搜索/虚拟列表算法、Menu 及语义样式已独立复制并纳入 check:selection-presentations；Cedar 仅 menu，Maple 通过静态扩展文件提供 list/picker 和移动触摸样式。公共 API 以 Cedar 为准；本地 Form/空状态接入独立，无跨库运行时、共享实例或 platform 配置。 |
| cascader | cascader | 已同源 | 主体、控制器、树/路径/搜索/懒加载算法、CascaderPanel、Menu 与语义样式已独立复制；草稿会话由控制器统一持有。Cedar 仅 menu，Maple 的 list/picker 位于独立静态扩展文件；公共源码纳入 check:selection-presentations，保留本地系统接入与移动触摸样式差异，不共享运行时代码。 |
| auto-complete | auto-complete | 已同源 | 2026-09-23 主体、Props、类型出口、Menu 样式和配对交互/SSR 测试完成独立同源复制；两端直接消费本地 Input、Trigger、Select 选项算法。统一 shouldOpen/过滤、分组、异步候选、虚拟列表、长度规则、Form 继承及焦点事件，补齐 hint/颜色/键盘提示；无跨库运行时或 platform 配置，AutoComplete 不提供滚轮 presentation。 |
| date | date | 逻辑已同源 | 2026-09-30：日期族模型/严格解析、Date 禁用回调、包含边界、时分秒分级约束、范围提交、字段与纯面板主体和事件已独立复制；21 对源码/测试门禁覆盖。两端默认秒精度，format/valueFormat、defaultValue/defaultOpen、type、select/change/confirm/open-change/clear 对齐。桌面日历/Trigger 与移动滚轮/时钟/Popup 保留本地 presentation，Form 与全局多语言各自接入；Maple 多选和 Cedar 周/季度为明确展示能力差异，无共享运行时或 platform 配置。 |
| date-range | date-range | 逻辑已同源 | 2026-09-30：日期族模型/严格解析、Date 禁用回调、包含边界、时分秒分级约束、范围提交、字段与纯面板主体和事件已独立复制；21 对源码/测试门禁覆盖。两端默认秒精度，format/valueFormat、defaultValue/defaultOpen、type、select/change/confirm/open-change/clear 对齐。桌面日历/Trigger 与移动滚轮/时钟/Popup 保留本地 presentation，Form 与全局多语言各自接入；Maple 多选和 Cedar 周/季度为明确展示能力差异，无共享运行时或 platform 配置。 |
| time | time | 逻辑已同源 | 2026-09-23：Time/TimeRange 入口、TimeField 主体及字段状态协议已从 Cedar 独立复制到 Maple，值、草稿、确认/取消、清除、焦点和通知控制器同源。两库各自维护源码及实例，无共享运行时或 platform 配置；桌面 Trigger/列表与移动 Popup/滚轮/时钟，以及本地 Form、全局多语言接入和候选初始化保留在独立 presentation 文件。31 对时间源码/测试门禁覆盖；外观和纯时间面板仍单独验收。 |
| time-range | time-range | 逻辑已同源 | 2026-09-23：Time/TimeRange 入口、TimeField 主体及字段状态协议已从 Cedar 独立复制到 Maple，值、草稿、确认/取消、清除、焦点和通知控制器同源。两库各自维护源码及实例，无共享运行时或 platform 配置；桌面 Trigger/列表与移动 Popup/滚轮/时钟，以及本地 Form、全局多语言接入和候选初始化保留在独立 presentation 文件。31 对时间源码/测试门禁覆盖；外观和纯时间面板仍单独验收。 |
| date-picker | date-picker | 逻辑已同源 | 2026-09-30：日期族模型/严格解析、Date 禁用回调、包含边界、时分秒分级约束、范围提交、字段与纯面板主体和事件已独立复制；21 对源码/测试门禁覆盖。两端默认秒精度，format/valueFormat、defaultValue/defaultOpen、type、select/change/confirm/open-change/clear 对齐。桌面日历/Trigger 与移动滚轮/时钟/Popup 保留本地 presentation，Form 与全局多语言各自接入；Maple 多选和 Cedar 周/季度为明确展示能力差异，无共享运行时或 platform 配置。 |
| date-range-picker | date-range-picker | 逻辑已同源 | 2026-09-30：日期族模型/严格解析、Date 禁用回调、包含边界、时分秒分级约束、范围提交、字段与纯面板主体和事件已独立复制；21 对源码/测试门禁覆盖。两端默认秒精度，format/valueFormat、defaultValue/defaultOpen、type、select/change/confirm/open-change/clear 对齐。桌面日历/Trigger 与移动滚轮/时钟/Popup 保留本地 presentation，Form 与全局多语言各自接入；Maple 多选和 Cedar 周/季度为明确展示能力差异，无共享运行时或 platform 配置。 |
| time-picker | time-picker | 逻辑已同源 | 2026-09-30：纯时间面板的值、草稿、校验和选择/确认事务已独立复制；两端范围入口均直接持有范围状态，Cedar 不再经单值面板转调。类型化事件声明和范围事件编排同源，脚本入口收口为 script setup。列表与滚轮/时钟内容及手势留在独立 presentation 文件，两库各有源码及实例，无共享运行时。33 对源码/测试与 4 个面板展示边界门禁覆盖；端侧外观保持差异，浏览器视觉验收另行进行。 |
| time-range-picker | time-range-picker | 逻辑已同源 | 2026-09-30：纯时间面板的值、草稿、校验和选择/确认事务已独立复制；两端范围入口均直接持有范围状态，Cedar 不再经单值面板转调。类型化事件声明和范围事件编排同源，脚本入口收口为 script setup。列表与滚轮/时钟内容及手势留在独立 presentation 文件，两库各有源码及实例，无共享运行时。33 对源码/测试与 4 个面板展示边界门禁覆盖；端侧外观保持差异，浏览器视觉验收另行进行。 |
| dropdown-menu | dropdown-menu | 已同源 | 2026-09-11 由 Cedar DropdownMenu 独立同源复制：逻辑层（selection/level/keyboard/options）与共享渲染器一致，平台差异集中在 platform.ts。命令菜单只做单选，多选与级联改由 Select / Cascader 承担；子菜单展开方式由根组件 submenu-trigger 统一控制，移动端默认 click。旧 Menu / MenuGroup / MenuSubmenu 已废弃，不再保留别名。 |
| popover | popover | 已同源 | 2026-09-20 完成独立同源复制：主体、Props、platform 外观映射、title/body DOM、结构样式及语义契约纳入门禁。双端统一 click、bottom、箭头、10px 间距和关闭缓存默认值，删除 defaultStyle、popoverClass、elevation；通过 Trigger referenceAttrs 关联 aria-controls/expanded。仅前缀、本地导入和主题 token 值不同。 |
| tooltip | tooltip | 已同源 | 2026-09-20 完成独立同源复制：主体、Props、platform 外观映射、结构样式与语义契约纳入门禁。双端统一 hover+focus、top、箭头、10px 间距、关闭卸载、xs/md、status、color/textColor，删除 backgroundColor 和布尔 xs；通过 Trigger referenceAttrs 关联 role=tooltip 与 aria-describedby。仅前缀、本地导入和主题 token 值不同。 |
| trigger | trigger | 已同源 | 2026-09-20 完成独立同源复制：Trigger 主体、最终 Props/types、无依赖定位器、结构样式、token 职责和定位契约测试已纳入 copied-components-check。两端统一十二方位、absolute/fixed、popupOffset、popupTranslate、cover、翻转避让、滚动与尺寸更新；Maple 删除 @popperjs/core、offsetX/offsetY 与 cascadeOptimization。仅 platform.ts 保留各库容器、层级、全局配置及 ResizeObserver 接线，不共享运行时核心或实例。 |
| split-button | split-button | 已同源 | 2026-09-08 完成独立同源复制：主体、21 项 Props、样式依赖入口和契约测试纳入一致性检查；统一异步点击、受控状态、禁用优先级、向下箭头及 open/close/resize。Cedar Menu 补齐浮层类名和屏幕轴偏移适配；两端 Menu 保留独立平台实现，无跨库运行时或实例共享。 |
| form | form | 逻辑已同源 | 2026-09-21 完成 Form 内核独立同源复制：字段注册与卸载、定向/全量校验、错误聚合、异步批次竞态、reset/clear/setFields 已统一，并由 check:form-kernel 防漂移；两端 validate 都返回 undefined 或字段错误映射，submit/success/failed 载荷同义，scrollToError 均按实际 DOM 顺序选择 start/end。Cedar 的 b-validate 规则适配、栅格标签与 Maple 的函数/Zod 规则适配、移动端 details 仍各自维护。 |
| tabs | tabs | 逻辑待同源 | Tabs 有编辑/新增与 sticky/safeArea 差异；Carousel 有键盘 aria 与 centeredSlides/effect 差异；同源对齐索引、切换/自动播放状态机，导航和手势保留适配。 |
| carousel | carousel | 逻辑待同源 | Tabs 有编辑/新增与 sticky/safeArea 差异；Carousel 有键盘 aria 与 centeredSlides/effect 差异；同源对齐索引、切换/自动播放状态机，导航和手势保留适配。 |
| message | message | 逻辑已同源 | 2026-09-21 完成逻辑同源：两端独立复制相同的可调用服务、按容器与位置隔离的队列、剩余时间计时、id 更新、幂等关闭和宿主销毁逻辑，并纳入轻量反馈一致性门禁。API 已统一为 default/info/success/warning/danger/loading、top/center/bottom、action、pauseOnHover、resetOnUpdate 与完整生命周期；删除 normal、模态阻断及端侧外观 Props。PC 紧凑提示与移动卡片样式各自维护。 |
| upload | upload | 逻辑待同源 | PC 有 action/customRequest/headers/自动上传等完整请求能力，移动主要负责文件选择和展示；先同源对齐文件模型、校验和预览，不能直接替换上传管线。 |
| table | table | 独立 | Cedar 42 个 Props（列、选择、树、分页、虚拟滚动等），Maple 仅 3 个容器 Props；语义层级不同，不建议对齐整个 Table。 |
| drawer | popup | 逻辑已同源 | 2026-09-21 完成逻辑同源改造。两端各自保存字节级一致的 modal-surface 控制器，并由同源门禁约束；已统一 open/defaultOpen、unmountOnClose、遮罩 pointer 序列、层级、焦点、容器锁滚动、ESC、显式路由关闭和生命周期。Cedar Drawer 保留标题/页脚/宽高及 beforeClose，Maple Popup 保留 center、安全区和移动转场。 |
| row | row | 已同源 | Grid/GridItem/Row/Col 主体、Props、响应式逻辑、样式和契约测试已按包内复制统一；Row/Col 有独立源码、安装和样式入口，两端 demo 配对。 入口职责已分离：Grid 仅包含 Grid.Item；Row/Col 独立入口、注册、文档与 Demo，不再通过 Grid 转导出。 |
| col | col | 已同源 | Grid/GridItem/Row/Col 主体、Props、响应式逻辑、样式和契约测试已按包内复制统一；Row/Col 有独立源码、安装和样式入口，两端 demo 配对。 入口职责已分离：Grid 仅包含 Grid.Item；Row/Col 独立入口、注册、文档与 Demo，不再通过 Grid 转导出。 |
| paper | paper | 已同源 | Cedar 新增 Paper；两端底层表面主体、Props、样式、token 和契约测试独立复制并验证。bordered 与 elevation 独立，无 variant、无默认 padding；保留尺寸、圆角与可选水波，不共享核心或实例。 |

## 后续维护与实施

1. 以已完成组件的包内独立复制和源码一致性检查为模板；差异按职责拆分到本库文件，不引入共享运行时或 platform 配置层。
2. 原待同源 11 组和 Link / Paper 已完成；后续按待适配、逻辑待同源分类逐项推进，不因本批完成而自动升级其他候选。
3. 每个组件先固定 Props 类型/默认值、事件载荷和顺序、Slots 参数、Expose，以及受控/非受控语义；子组件必须一并验收。
4. 配对测试各自保存在两库并分别运行，覆盖键盘与触控、禁用/只读、SSR、挂载清理和主题。弹层额外覆盖嵌套、焦点恢复及滚动锁。通过后再升级为已同源标记。

## 未配对范围

Cedar 的 Tree / Transfer / Descriptions / Timeline / FilterForm 等，以及 Maple 的 PullRefresh / SwipeCell / IndexBar / NumberKeyboard / Signature 等，本次没有确认可直接同源对齐的对应组件，保留原菜单。Drawer / Popup 是异名候选；Message 不直接等同 NoticeBar 或 Notification。Cedar 日期/时间 picker 在内部子目录，Maple 菜单通过字段文档组织，标记数量因此不同。

## 维护

唯一分类数据：design-ui/audits/component-reuse.json。修改后从工作区运行 node design-ui/bin/component-reuse-sync.mjs，同步两库的文档元数据；--check 检查漂移。复制的是文档元数据，不是组件源码。后续源码变化后应重新运行 Props 审计并复核分级，不能只更新日期。

## Props 差异快照


由 api-contract-inventory.mjs 从两库根入口追踪 TypeScript 符号生成（含子组件）。
仅比较实际公开运行时 Props 的键，不把工具目录当组件，也不据此声称事件、插槽、方法或行为完全相同。
已批准且实施的语义迁移见 api-alignment-plan.md；剩余集合差异是后续能力规划清单，不自动求并集。

Cedar：127 个 Props 导出；Maple：119 个；同名可比较：95 个。

| Props | Cedar / Maple 键数量 | 仅 Cedar | 仅 Maple |
| --- | --- | --- | --- |
| affixProps | 7 / 7 | — | — |
| alertProps | 10 / 10 | — | — |
| autoCompleteProps | 29 / 29 | — | — |
| avatarGroupProps | 9 / 9 | — | — |
| avatarProps | 15 / 15 | — | — |
| backTopProps | 9 / 9 | — | — |
| badgeProps | 16 / 16 | — | — |
| breadcrumbItemProps | 5 / 5 | — | — |
| breadcrumbProps | 3 / 3 | — | — |
| buttonGroupProps | 9 / 9 | — | — |
| buttonProps | 25 / 25 | — | — |
| cardProps | 19 / 19 | — | — |
| carouselProps | 25 / 24 | `ariaLabel`, `nextButtonAriaLabel`, `previousButtonAriaLabel` | `centeredSlides`, `effect` |
| cascaderPanelProps | 0 / 0 | — | — |
| cascaderProps | 43 / 45 | — | `pickerProps`, `popupProps` |
| checkboxGroupProps | 9 / 9 | — | — |
| checkboxProps | 8 / 11 | `uninjectGroupContext` | `checkedColor`, `iconSize`, `ripple`, `uncheckedColor` |
| colProps | 10 / 10 | — | — |
| collapseItemProps | 5 / 5 | — | — |
| collapseProps | 9 / 9 | — | — |
| countToProps | 6 / 6 | — | — |
| countdownProps | 3 / 3 | — | — |
| datePickerProps | 37 / 26 | `abbreviation`, `clearable`, `dayStartOfWeek`, `defaultOpen`, `defaultPickerValue`, `disabledInput`, `error`, `locale`, `open`, `pickerValue`, `placeholder`, `placement`, `popupContainer`, `previewShortcut`, `shortcuts`, `shortcutsPosition`, `showConfirmBtn`, `showNowBtn`, `size`, `triggerProps`, `unmountOnClose`, `variant` | `buttonElevation`, `color`, `elevation`, `firstDayOfWeek`, `hint`, `multiple`, `presentation`, `range`, `showCurrent`, `titleColor`, `touchable` |
| dateProps | 33 / 35 | — | `multiple`, `presentation` |
| dateRangePickerProps | 38 / 19 | `abbreviation`, `clearable`, `dayStartOfWeek`, `defaultOpen`, `defaultPickerValue`, `disabledInput`, `error`, `exchangeTime`, `locale`, `open`, `pickerValue`, `placeholder`, `placement`, `popupContainer`, `previewShortcut`, `separator`, `shortcuts`, `shortcutsPosition`, `showConfirmBtn`, `size`, `triggerProps`, `unmountOnClose`, `variant` | `datePickerProps`, `elevation`, `pickerProps`, `presentation` |
| dateRangeProps | 34 / 35 | — | `presentation` |
| dialogProps | 45 / 45 | — | — |
| dividerProps | 10 / 10 | — | — |
| dropdownMenuProps | 25 / 26 | — | `strategy` |
| ellipsisProps | 5 / 5 | — | — |
| emptyProps | 6 / 6 | — | — |
| fieldDecoratorProps | 20 / 20 | — | — |
| formProps | 15 / 8 | `autoLabelWidth`, `id`, `labelAlign`, `labelColProps`, `labelColStyle`, `wrapperColProps`, `wrapperColStyle` | — |
| gridItemProps | 3 / 3 | — | — |
| gridProps | 5 / 5 | — | — |
| hoverOverlayProps | 2 / 2 | — | — |
| iconProps | 7 / 7 | — | — |
| imagePreviewGroupProps | 24 / 24 | — | — |
| imagePreviewProps | 22 / 22 | — | — |
| imageProps | 26 / 26 | — | — |
| infiniteScrollProps | 5 / 5 | — | — |
| inputGroupProps | 5 / 5 | — | — |
| inputNumberProps | 19 / 19 | — | — |
| inputPasswordProps | 27 / 27 | — | — |
| inputProps | 24 / 24 | — | — |
| linkProps | 9 / 9 | — | — |
| listProps | 8 / 5 | `maxHeight`, `scrollbar`, `virtualListProps` | — |
| loadingProps | 7 / 7 | — | — |
| menuOptionProps | 9 / 9 | — | — |
| messageProps | 14 / 14 | — | — |
| optgroupProps | 0 / 0 | — | — |
| optionProps | 0 / 0 | — | — |
| overlayProps | 8 / 8 | — | — |
| pageHeaderProps | 4 / 4 | — | — |
| paginationProps | 23 / 23 | — | — |
| paperProps | 8 / 8 | — | — |
| popoverProps | 45 / 45 | — | — |
| progressGroupProps | 10 / 10 | — | — |
| progressProps | 12 / 12 | `animation`, `bufferColor`, `steps` | `rotate`, `textClass`, `track` |
| radioGroupProps | 11 / 11 | — | — |
| radioProps | 8 / 11 | `uninjectGroupContext` | `checkedColor`, `iconSize`, `ripple`, `uncheckedColor` |
| rateProps | 17 / 17 | — | — |
| resultProps | 5 / 5 | — | — |
| rowProps | 5 / 5 | — | — |
| searchProps | 19 / 37 | — | `actionText`, `actionType`, `ariaLabel`, `autofocus`, `background`, `blurColor`, `enterkeyhint`, `focusColor`, `historyPopup`, `inputBackground`, `label`, `maxLength`, `modelModifiers`, `searchIcon`, `shape`, `showAction`, `textColor`, `type` |
| selectProps | 45 / 47 | — | `pickerProps`, `popupProps` |
| skeletonLineProps | 4 / 4 | — | — |
| skeletonProps | 12 / 12 | — | — |
| skeletonShapeProps | 2 / 2 | — | — |
| sliderProps | 13 / 16 | `defaultValue`, `formatTooltip`, `marks`, `showInput`, `showTicks`, `showTooltip` | `activeColor`, `labelColor`, `labelTextColor`, `labelVisible`, `readonly`, `thumbColor`, `thumbSize`, `trackColor`, `trackHeight` |
| spaceProps | 6 / 6 | — | — |
| splitButtonProps | 21 / 21 | — | — |
| statisticProps | 16 / 16 | — | — |
| stepProps | 6 / 6 | — | — |
| stepsProps | 9 / 9 | — | — |
| styleProviderProps | 2 / 2 | — | — |
| switchProps | 17 / 17 | — | — |
| tabItemProps | 2 / 2 | — | — |
| tabNavProps | 4 / 4 | — | — |
| tabPaneProps | 6 / 6 | — | — |
| tableProps | 42 / 3 | `bordered`, `columnResizable`, `columns`, `components`, `data`, `defaultExpandAllRows`, `defaultExpandedKeys`, `defaultSelectedKeys`, `draggable`, `expandable`, `expandedKeys`, `extraColumn`, `filterIconAlignLeft`, `fit`, `height`, `hideExpandButtonOnEmpty`, `hoverable`, `indentSize`, `loadMore`, `loading`, `maxHeight`, `pagePosition`, `pagination`, `rowClass`, `rowKey`, `rowNumber`, `rowSelection`, `scrollbar`, `selectedKeys`, `showEmptyTree`, `showHeader`, `size`, `spanAll`, `spanMethod`, `stickyHeader`, `stickyPagination`, `stripe`, `summary`, `summarySpanMethod`, `summaryText`, `tableLayout`, `virtualListProps` | `elevation`, `fullWidth`, `scrollerHeight` |
| tabsItemsProps | 0 / 0 | — | — |
| tabsNavsProps | 0 / 0 | — | — |
| tabsProps | 25 / 25 | — | — |
| tagProps | 14 / 14 | — | — |
| textareaProps | 21 / 26 | — | `blurColor`, `focusColor`, `hint`, `line`, `textColor` |
| timePickerProps | 16 / 20 | `showNextDay`, `type` | `color`, `elevation`, `hint`, `pickerProps`, `presentation`, `titleColor` |
| timeProps | 30 / 31 | `inputEditable` | `pickerProps`, `presentation` |
| timeRangePickerProps | 15 / 19 | — | `elevation`, `pickerProps`, `presentation`, `timePickerProps` |
| timeRangeProps | 32 / 34 | `inputEditable` | `pickerProps`, `presentation`, `timePickerProps` |
| tooltipProps | 48 / 48 | — | — |
| triggerProps | 43 / 43 | — | — |
| uploadProps | 37 / 19 | `action`, `autoUpload`, `beforeUpload`, `createThumbnailUrl`, `customRequest`, `data`, `defaultValue`, `directory`, `draggable`, `headers`, `imageFit`, `isSuccessResponse`, `listType`, `maxTotalSize`, `method`, `name`, `showCancelButton`, `showDownloadButton`, `showPreviewButton`, `showRetryButton`, `showUploadButton`, `withCredentials` | `elevation`, `onClickAction`, `preventDefaultPreview`, `ripple` |
| verificationCodeProps | 11 / 22 | — | `align`, `allowPaste`, `autofocus`, `blurColor`, `focusColor`, `gutter`, `maskSymbol`, `pasteTransform`, `textColor`, `type`, `variant` |
| watermarkProps | 15 / 15 | — | — |

## 仅 Cedar 根入口存在的 Props 导出

`anchorProps`, `calendarProps`, `colorPickerProps`, `colorProps`, `configProviderProps`, `descriptionsItemProps`, `descriptionsProps`, `drawerProps`, `filterFormProps`, `inputTagProps`, `layoutProps`, `mapProps`, `mentionProps`, `navMenuItemProps`, `navMenuProps`, `notificationProps`, `overflowListProps`, `peopleSelectProps`, `popconfirmProps`, `resizeBoxProps`, `schedulerProps`, `scrollbarProps`, `segmentedProps`, `splitProps`, `timelineProps`, `transferProps`, `treeProps`, `treeSelectProps`, `typographyParagraphProps`, `typographyProps`, `typographyTextProps`, `typographyTitleProps`

## 仅 Maple 根入口存在的 Props 导出

`actionSheetProps`, `carouselItemProps`, `cellProps`, `codeProps`, `counterProps`, `dragProps`, `fabProps`, `floatingPanelProps`, `formDetailsProps`, `formItemProps`, `highlighterProviderProps`, `indexAnchorProps`, `indexBarProps`, `loadingBarProps`, `localeProviderProps`, `noticeBarProps`, `numberKeyboardProps`, `pickerProps`, `popupProps`, `pullRefreshProps`, `signatureProps`, `swipeCellProps`, `tabBarItemProps`, `tabBarProps`
