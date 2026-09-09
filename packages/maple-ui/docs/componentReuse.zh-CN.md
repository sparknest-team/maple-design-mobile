# Cedar / Maple 跨端代码复用调研

审计日期：2026-09-08。基于当前工作区源码（包含正在进行的 API 对齐改动），不是发布版本保证。标记规则更新：2026-09-08；已完成原待同源 11 组组件及 Link / Paper 的独立复制与双端验证；待适配和逻辑待同源仍为候选。

已同源 24 组；待同源 0 组；待适配 25 组；逻辑待同源 21 组；独立 1 组。按组件族计数，包含子组件及异名 Drawer / Popup；不等于菜单条目数量。

## 菜单标记

| 标记 | 含义 | 建议顺序 |
| --- | --- | --- |
| [已同源] | 已完成对应范围的源码对齐并纳入一致性检查；两端各自维护源码 | P0：保持检查，作为后续样板 |
| [待同源] | 主体适合同源复制；尚待实现对齐与双端验证，不是已完成 | P1 |
| [待适配] | 先对齐 API 或适配依赖，再同源复制主体；尚未完成 | P2 |
| [逻辑待同源] | 计划将内部逻辑同源复制为两份，保留端侧展示/交互；尚未完成 | P3 |
| [独立] | 同名但语义层级不同，不要求主体同源 | 暂缓 |

未标记表示本次没有确认跨端对应关系，或是主题/指南/指令等页面；不表示无法复用。原“共用”统一改为“待同源”。所有候选均采用独立复制、双端同步维护；不引用同一份核心，不建立跨库运行时依赖，不通过外部模板生成组件源码。各库内部工具复用不受影响。

## 调研依据和限制

重新运行 api-contract-inventory.mjs，从 TypeScript 根入口追踪得到 Cedar 113 / Maple 114 个运行时 Props 导出，82 个同名导出可比较（包含子组件）。Props 名称相同不能证明默认值、类型、事件、插槽、方法和行为完全一致。额外检查了主体模板/TSX、事件触发、插槽、计时与弹层依赖；详细 Props 键差异见下方附录。Search 等根导出不对称也单独列为候选。

copied-components-check.mjs 已扩展至原待同源 11 组及 Link 的主体、Props、关键样式和配对测试。安装入口、主题 token、图标/配置适配仍由两库独立维护；最新覆盖以脚本及运行结果为准。新增检查不会自动升级分类，须完成双端验证后更新。其余属于源码静态评估，没有声称所有端侧行为已经通过验证。

初轮完成调研、菜单和文档标记；后续已完成的复制重构按同源标记维护。后续严格遵循包内复制 + platform 适配 + 一致性检查方式：先修改并验证一端，再复制至另一端，仅调整前缀、本地导入与必要的平台适配，后续两边同步修改。不抽取两端共同引用的核心实现，不共享实例或状态。

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
| avatar | avatar | 待适配 | 主组件/Group Props 同名，但图片加载分支、缩放和分组索引实现不同；统一缓存图片 load/error 及分组折叠行为。 |
| button | button | 已同源 | 共同契约补齐后选择 Maple：Button/ButtonGroup、Props、交互逻辑、样式和 12 组 demo 已复制对齐并纳入检查；注册入口和命名空间各自保留。竞赛证据见 button-race.json。 |
| breadcrumb | breadcrumb | 已同源 | 2026-09-08 完成 Breadcrumb / BreadcrumbItem 独立源码复制；主体、Props、上下文、类型、关键样式及配对测试纳入一致性检查。双端组件测试与 SSR 通过；图标、安装入口、Menu 和主题 token 本地适配。统一非空 routes 优先、分隔符优先级与 select(route, event)，修复空 routes 和省略项菜单行为。 |
| collapse | collapse | 待适配 | Maple 多 elevation；可作为主题扩展，需统一展开/分页状态、子项事件及受控默认值行为。 |
| pagination | pagination | 已同源 | 统一主体 SFC、23 项 Props、4 个事件、6 个插槽、分页状态与按钮和布局；12 组 demo 对齐。Locale、Input、Select 使用显式平台适配，480px 容器自动简洁模式；同源检查覆盖 13 个实现文件。 |
| empty | empty | 待适配 | Empty 的 icon/inConfigProvider 为 Cedar 特有，Result 的 animation/imageSize 为 Maple 特有；统一资源插槽、尺寸及配置读取。 |
| result | result | 待适配 | Empty 的 icon/inConfigProvider 为 Cedar 特有，Result 的 animation/imageSize 为 Maple 特有；统一资源插槽、尺寸及配置读取。 |
| link | link | 已同源 | 以 Cedar 原生链接与 hoverable 为基础，补齐键盘焦点、加载动画、动态图标插槽及禁用属性透传；主体、Props、主样式和配对测试独立复制并验证，保留本地图标和主题 token。 |
| loading | loading | 待适配 | Loading 的 dot/hideIcon 等表现能力仍需复核与适配；统一默认值及插槽后再同源对齐渲染。 |
| grid | grid | 已同源 | Grid/GridItem/Row/Col 主体、Props、响应式逻辑、样式和契约测试已按包内复制统一；Row/Col 有独立源码、安装和样式入口，两端 demo 配对。 入口职责已分离：Grid 仅包含 Grid.Item；Row/Col 独立入口、注册、文档与 Demo，不再通过 Grid 转导出。 |
| input-number | input-number | 待适配 | 17 个 Props 同名，主要 input/change 载荷接近；文本解析、精度、长按步进、表单注入与内部 Input 依赖仍需适配。 |
| ellipsis | ellipsis | 待适配 | 4 个 Props 和 update:expand 接近；受控展开策略及 Tooltip 触发依赖不同，先统一展开状态和触控提示行为。 |
| progress | progress | 待适配 | Progress 百分比和尺寸已有一致性检查；steps/animation/bufferColor 与 rotate/textClass/track 不同，对齐公共 line/circle，保留扩展渲染；Group 的 tooltip 触发也需适配。 |
| progress-group | progress-group | 待适配 | Progress 百分比和尺寸已有一致性检查；steps/animation/bufferColor 与 rotate/textClass/track 不同，对齐公共 line/circle，保留扩展渲染；Group 的 tooltip 触发也需适配。 |
| back-top | back-top | 待适配 | BackTop 的 ariaLabel/easing 与 bottom/right/elevation 不同；Watermark 的 antiTamper/grayscale/repeat/staggered 与 fullscreen 不同；分别同源对齐滚动算法/水印生成，扩展选项需明确兼容。 |
| watermark | watermark | 待适配 | BackTop 的 ariaLabel/easing 与 bottom/right/elevation 不同；Watermark 的 antiTamper/grayscale/repeat/staggered 与 fullscreen 不同；分别同源对齐滚动算法/水印生成，扩展选项需明确兼容。 |
| checkbox | checkbox | 待适配 | defaultChecked/defaultValue、uninjectGroupContext 与 readonly/ripple/颜色不同，Group 的 disabled/fieldNames/variant 也有差异；先统一值模型、键盘组导航及表单注入。 |
| radio | radio | 待适配 | defaultChecked/defaultValue、uninjectGroupContext 与 readonly/ripple/颜色不同，Group 的 disabled/fieldNames/variant 也有差异；先统一值模型、键盘组导航及表单注入。 |
| rate | rate | 待适配 | 可同源对齐命中计算、范围/步长与值模型；Rate 的 grading 与图标扩展、Slider 的 marks/showInput/showTicks 与触控标签/颜色不同，统一 pointer 交互后再同源对齐主体。 |
| slider | slider | 待适配 | 可同源对齐命中计算、范围/步长与值模型；Rate 的 grading 与图标扩展、Slider 的 marks/showInput/showTicks 与触控标签/颜色不同，统一 pointer 交互后再同源对齐主体。 |
| input | input | 待适配 | 输入内核可对齐，但 defaultValue、字数统计、hint/line/颜色、modelModifiers 及粘贴/输入法行为不同；Search 还需核对历史、结果、搜索字段与取消动作，不能仅按根 Props 导出名判断。 |
| textarea | textarea | 待适配 | 输入内核可对齐，但 defaultValue、字数统计、hint/line/颜色、modelModifiers 及粘贴/输入法行为不同；Search 还需核对历史、结果、搜索字段与取消动作，不能仅按根 Props 导出名判断。 |
| verification-code | verification-code | 待适配 | 输入内核可对齐，但 defaultValue、字数统计、hint/line/颜色、modelModifiers 及粘贴/输入法行为不同；Search 还需核对历史、结果、搜索字段与取消动作，不能仅按根 Props 导出名判断。 |
| search | search | 待适配 | 输入内核可对齐，但 defaultValue、字数统计、hint/line/颜色、modelModifiers 及粘贴/输入法行为不同；Search 还需核对历史、结果、搜索字段与取消动作，不能仅按根 Props 导出名判断。 |
| infinite-scroll | infinite-scroll | 待适配 | InfiniteScroll Props 同名，可同源对齐观察与加载状态；List 的 maxHeight/scrollbar/virtualListProps 仅 Cedar 有，虚拟化应是扩展能力。 |
| list | list | 待适配 | InfiniteScroll Props 同名，可同源对齐观察与加载状态；List 的 maxHeight/scrollbar/virtualListProps 仅 Cedar 有，虚拟化应是扩展能力。 |
| image | image | 待适配 | Image/Preview/PreviewGroup Props 同名且已有配对契约基础；同源对齐加载和预览控制器，工具栏、键鼠缩放、触控缩放及弹层生命周期要逐项验证。 |
| overlay | overlay | 待适配 | Props 同名，但 Cedar popup manager/overflow 与 Maple stack/lock/Popup 依赖不同；先适配堆叠、滚动锁、焦点恢复及异步确认，再对齐主体。 |
| dialog | dialog | 待适配 | Props 同名，但 Cedar popup manager/overflow 与 Maple stack/lock/Popup 依赖不同；先适配堆叠、滚动锁、焦点恢复及异步确认，再对齐主体。 |
| style-provider | style-provider | 待适配 | 主 Props 同名；主题 token 名称、默认配置及包内全局状态必须通过适配注入，避免跨库共享响应式单例。 |
| select | select | 逻辑待同源 | PC 搜索/虚拟列表/非受控默认值与移动 picker/popup/presentation 分层差异大；先同源对齐选项归一化、筛选、值状态和禁用规则，保留端侧展示。 |
| cascader | cascader | 逻辑待同源 | PC 搜索/虚拟列表/非受控默认值与移动 picker/popup/presentation 分层差异大；先同源对齐选项归一化、筛选、值状态和禁用规则，保留端侧展示。 |
| auto-complete | auto-complete | 逻辑待同源 | PC 搜索/虚拟列表/非受控默认值与移动 picker/popup/presentation 分层差异大；先同源对齐选项归一化、筛选、值状态和禁用规则，保留端侧展示。 |
| date | date | 逻辑待同源 | PC 日历/时间列表与移动滚轮/弹出面板、min/max、disabledTime、格式化及范围 API 差异较大；同源对齐解析、禁用规则、范围计算，面板保留适配。 |
| date-range | date-range | 逻辑待同源 | PC 日历/时间列表与移动滚轮/弹出面板、min/max、disabledTime、格式化及范围 API 差异较大；同源对齐解析、禁用规则、范围计算，面板保留适配。 |
| time | time | 逻辑待同源 | PC 日历/时间列表与移动滚轮/弹出面板、min/max、disabledTime、格式化及范围 API 差异较大；同源对齐解析、禁用规则、范围计算，面板保留适配。 |
| time-range | time-range | 逻辑待同源 | PC 日历/时间列表与移动滚轮/弹出面板、min/max、disabledTime、格式化及范围 API 差异较大；同源对齐解析、禁用规则、范围计算，面板保留适配。 |
| date-picker | date-picker | 逻辑待同源 | PC 日历/时间列表与移动滚轮/弹出面板、min/max、disabledTime、格式化及范围 API 差异较大；同源对齐解析、禁用规则、范围计算，面板保留适配。 |
| date-range-picker | date-range-picker | 逻辑待同源 | PC 日历/时间列表与移动滚轮/弹出面板、min/max、disabledTime、格式化及范围 API 差异较大；同源对齐解析、禁用规则、范围计算，面板保留适配。 |
| time-picker | time-picker | 逻辑待同源 | PC 日历/时间列表与移动滚轮/弹出面板、min/max、disabledTime、格式化及范围 API 差异较大；同源对齐解析、禁用规则、范围计算，面板保留适配。 |
| time-range-picker | time-range-picker | 逻辑待同源 | PC 日历/时间列表与移动滚轮/弹出面板、min/max、disabledTime、格式化及范围 API 差异较大；同源对齐解析、禁用规则、范围计算，面板保留适配。 |
| menu | menu | 逻辑待同源 | 定位/触发 API 和依赖不同，hover 延迟/焦点与 reference/strategy/offsetX/Y 不能机械对齐；先同源对齐可见状态、定位参数和关闭原因契约。 |
| popover | popover | 逻辑待同源 | 定位/触发 API 和依赖不同，hover 延迟/焦点与 reference/strategy/offsetX/Y 不能机械对齐；先同源对齐可见状态、定位参数和关闭原因契约。 |
| tooltip | tooltip | 逻辑待同源 | 定位/触发 API 和依赖不同，hover 延迟/焦点与 reference/strategy/offsetX/Y 不能机械对齐；先同源对齐可见状态、定位参数和关闭原因契约。 |
| trigger | trigger | 逻辑待同源 | 定位/触发 API 和依赖不同，hover 延迟/焦点与 reference/strategy/offsetX/Y 不能机械对齐；先同源对齐可见状态、定位参数和关闭原因契约。 |
| split-button | split-button | 已同源 | 2026-09-08 完成独立同源复制：主体、21 项 Props、样式依赖入口和契约测试纳入一致性检查；统一异步点击、受控状态、禁用优先级、向下箭头及 open/close/resize。Cedar Menu 补齐浮层类名和屏幕轴偏移适配；两端 Menu 保留独立平台实现，无跨库运行时或实例共享。 |
| form | form | 逻辑待同源 | Cedar 有 rules、栅格标签和 size，Maple 有 readonly，FormItem 导出与注入不同；先同源对齐校验任务、字段注册和重置，布局与错误呈现分开。 |
| tabs | tabs | 逻辑待同源 | Tabs 有编辑/新增与 sticky/safeArea 差异；Carousel 有键盘 aria 与 centeredSlides/effect 差异；同源对齐索引、切换/自动播放状态机，导航和手势保留适配。 |
| carousel | carousel | 逻辑待同源 | Tabs 有编辑/新增与 sticky/safeArea 差异；Carousel 有键盘 aria 与 centeredSlides/effect 差异；同源对齐索引、切换/自动播放状态机，导航和手势保留适配。 |
| message | message | 逻辑待同源 | PC 队列和悬停计时与移动 open/position/forbidClick/lockScroll 等不同；同源对齐队列/计时逻辑前先核对函数式返回句柄与关闭时序。 |
| upload | upload | 逻辑待同源 | PC 有 action/customRequest/headers/自动上传等完整请求能力，移动主要负责文件选择和展示；先同源对齐文件模型、校验和预览，不能直接替换上传管线。 |
| table | table | 独立 | Cedar 42 个 Props（列、选择、树、分页、虚拟滚动等），Maple 仅 3 个容器 Props；语义层级不同，不建议对齐整个 Table。 |
| drawer | popup | 逻辑待同源 | 异名候选：同源对齐可见状态、placement、遮罩、滚动锁和关闭原因；Drawer 的桌面尺寸/焦点管理与 Popup 的触控、安全区及转场需保留适配。 |
| row | row | 已同源 | Grid/GridItem/Row/Col 主体、Props、响应式逻辑、样式和契约测试已按包内复制统一；Row/Col 有独立源码、安装和样式入口，两端 demo 配对。 入口职责已分离：Grid 仅包含 Grid.Item；Row/Col 独立入口、注册、文档与 Demo，不再通过 Grid 转导出。 |
| col | col | 已同源 | Grid/GridItem/Row/Col 主体、Props、响应式逻辑、样式和契约测试已按包内复制统一；Row/Col 有独立源码、安装和样式入口，两端 demo 配对。 入口职责已分离：Grid 仅包含 Grid.Item；Row/Col 独立入口、注册、文档与 Demo，不再通过 Grid 转导出。 |
| paper | paper | 已同源 | Cedar 新增 Paper；两端底层表面主体、Props、样式、token 和契约测试独立复制并验证。bordered 与 elevation 独立，无 variant、无默认 padding；保留尺寸、圆角与可选水波，不共享核心或实例。 |

## 后续维护与实施

1. 以 Card / Badge / Affix / Switch 的 platform 适配和源码一致性检查为模板。
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

Cedar：113 个 Props 导出；Maple：114 个；同名可比较：82 个。

| Props | Cedar / Maple 键数量 | 仅 Cedar | 仅 Maple |
| --- | --- | --- | --- |
| affixProps | 7 / 7 | — | — |
| alertProps | 10 / 10 | — | — |
| autoCompleteProps | 13 / 20 | `defaultValue`, `triggerProps`, `virtualListProps` | `blurColor`, `enterkeyhint`, `fieldNames`, `focusColor`, `hint`, `line`, `maxLength`, `placeholder`, `readonly`, `textColor` |
| avatarGroupProps | 9 / 9 | — | — |
| avatarProps | 15 / 15 | — | — |
| backTopProps | 6 / 7 | `ariaLabel`, `easing` | `bottom`, `elevation`, `right` |
| badgeProps | 16 / 16 | — | — |
| breadcrumbItemProps | 5 / 5 | — | — |
| breadcrumbProps | 3 / 3 | — | — |
| buttonGroupProps | 9 / 9 | — | — |
| buttonProps | 25 / 25 | — | — |
| cardProps | 19 / 19 | — | — |
| carouselProps | 25 / 24 | `ariaLabel`, `nextButtonAriaLabel`, `previousButtonAriaLabel` | `centeredSlides`, `effect` |
| cascaderProps | 31 / 28 | `defaultInputValue`, `defaultOpen`, `defaultValue`, `error`, `expandChild`, `fallback`, `filterOption`, `formatLabel`, `inputValue`, `loadMore`, `maxTagCount`, `searchDelay`, `searchOptionOnlyLabel`, `tagNowrap`, `triggerProps`, `virtualListProps` | `blurColor`, `closeOnSelect`, `focusColor`, `hint`, `line`, `pickerProps`, `popupProps`, `presentation`, `readonly`, `separator`, `tag`, `textColor`, `variant` |
| checkboxGroupProps | 6 / 5 | `defaultValue`, `disabled` | `fieldNames` |
| checkboxProps | 6 / 9 | `defaultChecked`, `uninjectGroupContext` | `checkedColor`, `iconSize`, `readonly`, `ripple`, `uncheckedColor` |
| colProps | 10 / 10 | — | — |
| collapseItemProps | 5 / 5 | — | — |
| collapseProps | 9 / 10 | — | `elevation` |
| countToProps | 6 / 6 | — | — |
| countdownProps | 3 / 3 | — | — |
| datePickerProps | 12 / 21 | `dayStartOfWeek`, `defaultValue`, `disabled`, `format`, `hideTrigger`, `mode`, `showNowBtn` | `buttonElevation`, `color`, `elevation`, `firstDayOfWeek`, `hint`, `max`, `min`, `multiple`, `presentation`, `range`, `readonly`, `showCurrent`, `titleColor`, `touchable`, `type`, `useSeconds` |
| dateProps | 17 / 26 | `defaultOpen`, `defaultValue`, `error`, `format` | `blurColor`, `disabledTime`, `focusColor`, `hint`, `line`, `max`, `min`, `multiple`, `popupProps`, `presentation`, `separator`, `textColor`, `useSeconds` |
| dateRangePickerProps | 35 / 14 | `abbreviation`, `clearable`, `dayStartOfWeek`, `defaultOpen`, `defaultPickerValue`, `defaultValue`, `disabled`, `disabledInput`, `error`, `exchangeTime`, `format`, `hideTrigger`, `locale`, `mode`, `open`, `pickerValue`, `placeholder`, `placement`, `popupContainer`, `previewShortcut`, `separator`, `shortcuts`, `shortcutsPosition`, `showConfirmBtn`, `size`, `triggerProps`, `unmountOnClose`, `valueFormat`, `variant` | `datePickerProps`, `elevation`, `max`, `min`, `pickerProps`, `presentation`, `type`, `useSeconds` |
| dateRangeProps | 18 / 28 | `defaultOpen`, `defaultValue`, `error`, `format` | `blurColor`, `datePickerProps`, `disabledTime`, `focusColor`, `hint`, `line`, `max`, `min`, `pickerProps`, `popupProps`, `presentation`, `textColor`, `timePickerProps`, `useSeconds` |
| dialogProps | 44 / 44 | — | — |
| dividerProps | 10 / 10 | — | — |
| ellipsisProps | 4 / 4 | — | — |
| emptyProps | 8 / 6 | `icon`, `inConfigProvider` | — |
| formProps | 14 / 6 | `autoLabelWidth`, `id`, `labelAlign`, `labelColProps`, `labelColStyle`, `rules`, `size`, `wrapperColProps`, `wrapperColStyle` | `readonly` |
| gridItemProps | 3 / 3 | — | — |
| gridProps | 5 / 5 | — | — |
| hoverOverlayProps | 2 / 2 | — | — |
| iconProps | 7 / 7 | — | — |
| imagePreviewGroupProps | 24 / 24 | — | — |
| imagePreviewProps | 22 / 22 | — | — |
| imageProps | 26 / 26 | — | — |
| infiniteScrollProps | 5 / 5 | — | — |
| inputNumberProps | 17 / 17 | — | — |
| inputProps | 15 / 22 | `defaultValue`, `error`, `showWordLimit`, `wordLength`, `wordSlice` | `ariaLabel`, `autocomplete`, `autofocus`, `blurColor`, `enterkeyhint`, `focusColor`, `hint`, `isForceErrorEffect`, `isForceFocusingEffect`, `line`, `modelModifiers`, `textColor` |
| linkProps | 9 / 9 | — | — |
| listProps | 8 / 5 | `maxHeight`, `scrollbar`, `virtualListProps` | — |
| loadingProps | 8 / 6 | `dot`, `hideIcon` | — |
| menuProps | 18 / 25 | — | `closeOnClickReference`, `elevation`, `mouseEnterDelay`, `mouseLeaveDelay`, `reference`, `size`, `strategy` |
| messageProps | 7 / 18 | `closeButtonAriaLabel`, `resetOnHover`, `resetOnUpdate` | `_update`, `content`, `contentClass`, `elevation`, `forbidClick`, `loadingColor`, `loadingRadius`, `loadingSize`, `loadingType`, `lockScroll`, `open`, `popupContainer`, `position`, `vertical` |
| overlayProps | 8 / 8 | — | — |
| pageHeaderProps | 4 / 4 | — | — |
| paginationProps | 23 / 23 | — | — |
| paperProps | 8 / 8 | — | — |
| popoverProps | 43 / 38 | `autoFitPopupMinWidth`, `autoFitPosition`, `autoFitTransformOrigin`, `autoFixPosition`, `hideEmpty`, `openedClass`, `popupOffset`, `popupTranslate`, `preventFocus`, `scrollToClose`, `scrollToCloseDistance`, `updateAtScroll` | `cascadeOptimization`, `defaultStyle`, `elevation`, `offsetX`, `offsetY`, `popoverClass`, `strategy` |
| progressGroupProps | 10 / 10 | — | — |
| progressProps | 12 / 12 | `animation`, `bufferColor`, `steps` | `rotate`, `textClass`, `track` |
| radioGroupProps | 7 / 5 | `defaultValue`, `disabled`, `size`, `variant` | `ariaLabel`, `fieldNames` |
| radioProps | 6 / 8 | `defaultChecked`, `uninjectGroupContext`, `variant` | `checkedColor`, `iconSize`, `readonly`, `ripple`, `uncheckedColor` |
| rateProps | 10 / 15 | `defaultValue`, `grading` | `disabledColor`, `emptyColor`, `emptyIcon`, `gap`, `halfIcon`, `icon`, `ripple` |
| resultProps | 3 / 5 | — | `animation`, `imageSize` |
| rowProps | 5 / 5 | — | — |
| selectProps | 35 / 26 | `creatable`, `defaultActiveFirstOption`, `defaultInputValue`, `defaultOpen`, `defaultValue`, `error`, `fallbackOption`, `filterOption`, `filterable`, `formatLabel`, `inputValue`, `limit`, `loading`, `maxTagCount`, `scrollbar`, `searchDelay`, `showExtraOptions`, `showFooterOnEmpty`, `showHeaderOnEmpty`, `tagNowrap`, `triggerProps`, `unmountOnClose`, `virtualListProps` | `blurColor`, `focusColor`, `hint`, `line`, `offsetY`, `pickerProps`, `placement`, `popupProps`, `presentation`, `readonly`, `separator`, `tag`, `textAlign`, `textColor` |
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
| tableProps | 42 / 3 | `bordered`, `columnResizable`, `columns`, `components`, `data`, `defaultExpandAllRows`, `defaultExpandedKeys`, `defaultSelectedKeys`, `draggable`, `expandable`, `expandedKeys`, `extraColumn`, `filterIconAlignLeft`, `fit`, `height`, `hideExpandButtonOnEmpty`, `hoverable`, `indentSize`, `loadMore`, `loading`, `maxHeight`, `pagePosition`, `pagination`, `rowClass`, `rowKey`, `rowNumber`, `rowSelection`, `scrollbar`, `selectedKeys`, `showEmptyTree`, `showHeader`, `size`, `spanAll`, `spanMethod`, `stickyHeader`, `stickyPagination`, `stripe`, `summary`, `summarySpanMethod`, `summaryText`, `tableLayout`, `virtualListProps` | `elevation`, `fullWidth`, `scrollerHeight` |
| tabsProps | 17 / 23 | `animation`, `autoSwitch`, `defaultActive`, `editable`, `headerPadding`, `hideContent`, `justify`, `scrollPosition`, `showAddButton` | `activeColor`, `color`, `disabledColor`, `elevation`, `fixedBottom`, `inactiveColor`, `indicatorColor`, `indicatorSize`, `itemVertical`, `offsetTop`, `safeArea`, `scrollable`, `sticky`, `stickyCssMode`, `stickyZIndex` |
| tagProps | 14 / 14 | — | — |
| textareaProps | 15 / 20 | `autoSize`, `defaultValue`, `error`, `showWordLimit`, `wordLength`, `wordSlice` | `ariaLabel`, `autofocus`, `blurColor`, `enterkeyhint`, `focusColor`, `hint`, `line`, `modelModifiers`, `resize`, `rows`, `textColor` |
| timePickerProps | 26 / 13 | `clearable`, `defaultOpen`, `defaultValue`, `disableConfirm`, `disabled`, `disabledHours`, `disabledMinutes`, `disabledSeconds`, `error`, `hideDisabledOptions`, `hideTrigger`, `open`, `placeholder`, `placement`, `popupContainer`, `showNextDay`, `size`, `step`, `triggerProps`, `type`, `unmountOnClose`, `use12Hours`, `variant` | `color`, `disabledTime`, `elevation`, `hint`, `max`, `min`, `pickerProps`, `presentation`, `titleColor`, `useSeconds` |
| timeProps | 20 / 23 | `defaultOpen`, `defaultValue`, `disableConfirm`, `disabledHours`, `disabledMinutes`, `disabledSeconds`, `error`, `step`, `use12Hours` | `blurColor`, `disabledTime`, `focusColor`, `hint`, `line`, `max`, `min`, `pickerProps`, `popupProps`, `presentation`, `textColor`, `useSeconds` |
| timeRangePickerProps | 25 / 12 | `clearable`, `defaultOpen`, `defaultValue`, `disableConfirm`, `disabled`, `disabledHours`, `disabledMinutes`, `disabledSeconds`, `error`, `hideDisabledOptions`, `hideTrigger`, `open`, `placeholder`, `placement`, `popupContainer`, `size`, `step`, `triggerProps`, `unmountOnClose`, `use12Hours`, `variant` | `disabledTime`, `elevation`, `max`, `min`, `pickerProps`, `presentation`, `timePickerProps`, `useSeconds` |
| timeRangeProps | 21 / 26 | `defaultOpen`, `defaultValue`, `disableConfirm`, `disabledHours`, `disabledMinutes`, `disabledSeconds`, `error`, `step`, `use12Hours` | `blurColor`, `disabledTime`, `focusColor`, `hint`, `line`, `max`, `min`, `pickerProps`, `popupProps`, `presentation`, `separator`, `textColor`, `timePickerProps`, `useSeconds` |
| tooltipProps | 47 / 39 | `autoFitPopupMinWidth`, `autoFitPosition`, `autoFitTransformOrigin`, `autoFixPosition`, `hideEmpty`, `openedClass`, `popupOffset`, `popupTranslate`, `preventFocus`, `scrollToClose`, `scrollToCloseDistance`, `updateAtScroll` | `cascadeOptimization`, `offsetX`, `offsetY`, `strategy` |
| triggerProps | 41 / 33 | `autoFitPopupMinWidth`, `autoFitPosition`, `autoFitTransformOrigin`, `autoFixPosition`, `hideEmpty`, `openedClass`, `popupOffset`, `popupTranslate`, `preventFocus`, `scrollToClose`, `scrollToCloseDistance`, `updateAtScroll` | `cascadeOptimization`, `offsetX`, `offsetY`, `strategy` |
| uploadProps | 37 / 19 | `action`, `autoUpload`, `beforeUpload`, `createThumbnailUrl`, `customRequest`, `data`, `defaultValue`, `directory`, `draggable`, `headers`, `imageFit`, `isSuccessResponse`, `listType`, `maxTotalSize`, `method`, `name`, `showCancelButton`, `showDownloadButton`, `showPreviewButton`, `showRetryButton`, `showUploadButton`, `withCredentials` | `elevation`, `onClickAction`, `preventDefaultPreview`, `ripple` |
| verificationCodeProps | 11 / 22 | — | `align`, `allowPaste`, `autofocus`, `blurColor`, `focusColor`, `gutter`, `maskSymbol`, `pasteTransform`, `textColor`, `type`, `variant` |
| watermarkProps | 14 / 11 | `antiTamper`, `grayscale`, `repeat`, `staggered` | `fullscreen` |

## 仅 Cedar 根入口存在的 Props 导出

`anchorProps`, `calendarProps`, `colorPickerProps`, `colorProps`, `configProviderProps`, `descriptionsItemProps`, `descriptionsProps`, `drawerProps`, `filterFormProps`, `inputPasswordProps`, `inputTagProps`, `layoutProps`, `mapProps`, `mentionProps`, `navMenuProps`, `notificationProps`, `overflowListProps`, `peopleSelectProps`, `popconfirmProps`, `resizeBoxProps`, `scrollbarProps`, `segmentedProps`, `splitProps`, `timelineProps`, `transferProps`, `treeProps`, `treeSelectProps`, `typographyParagraphProps`, `typographyProps`, `typographyTextProps`, `typographyTitleProps`

## 仅 Maple 根入口存在的 Props 导出

`actionSheetProps`, `carouselItemProps`, `cellProps`, `codeProps`, `counterProps`, `dragProps`, `fabProps`, `fieldDecoratorProps`, `floatingPanelProps`, `formDetailsProps`, `formItemProps`, `highlighterProviderProps`, `indexAnchorProps`, `indexBarProps`, `loadingBarProps`, `localeProviderProps`, `menuGroupProps`, `menuOptionProps`, `noticeBarProps`, `numberKeyboardProps`, `optionProps`, `pickerProps`, `popupProps`, `pullRefreshProps`, `searchProps`, `signatureProps`, `swipeCellProps`, `tabBarItemProps`, `tabBarProps`, `tabItemProps`, `tabProps`, `tabsItemsProps`
