# Cedar / Maple Tabs 全面对比与同源决策

## 结论

API、组件结构、事件参数、受控状态、生命周期与键盘模型统一；PC / 移动差异放在样式 token 和细指针/触摸媒体查询中。两库独立发包，不引入运行时跨仓库依赖。

## 改造前差异（基于本地源码）

| 维度 | Cedar 原实现 | Maple 原实现 | 本次统一 |
| --- | --- | --- | --- |
| 结构 | Tabs / TabsNavs / TabNav / TabsItems / TabItem | Tabs / Tab + 独立 TabsItems / TabItem | 简单场景使用 Tabs / TabPane；高级场景保留五组件组合 |
| 标识 | Vue key，字符串或数字 | name 优先，索引兜底 | 显式 key，数字 1 与字符串 '1' 不混用 |
| 初值 | active / defaultActive；首项 | active 默认 0；无 defaultActive | active / defaultActive；省略选择首个未禁用项 |
| 点击 | update:active、change、tab-click(key, event) | update:active、change、click(key) | 统一 Cedar 事件，重复点击不重复 change |
| 受控 | 父级 active 优先 | active 依赖外部更新 | 有 active 时只发请求，不抢改父级值 |
| 外观 | line/card/outline/plain/capsule/enclosed | line/card/capsule | 两端六种均实现 |
| 方向 | horizontal/vertical | 相同枚举 | 统一；RTL 使用 dir 或平台配置 |
| 图标方向 | TabNav.itemVertical | Tabs.itemVertical | 统一到 TabNav.itemVertical |
| 编辑 | editable/showAddButton/autoSwitch、add/delete | 无 | 两端都有，删除由使用者修改数据 |
| 内容挂载 | 父级 lazyLoad，子项覆盖不完整 | 声明 lazyLoad/destroyOnHide 但轮播未应用 | 完整继承，子级 false 可覆盖 true |
| 悬停 | trigger | 声明但 Tab 不使用 | mouse pointerenter 激活；触摸不会误触悬停 |
| 导航溢出 | 自定义位移与按钮 | 5 项数量阈值滚动并居中 | 按实际尺寸溢出，原生滚动；统一 scrollPosition |
| 内容滑动 | 无 | Carousel 承担切换，可循环 | swipeable 默认 false；非循环，跳过禁用项 |
| 定位 | 无内置 sticky | sticky/fixedBottom/safeArea | Affix / TabBar 或外部容器组合 |
| 可访问性 | 旧导航层与内容无完整统一关系 | div 点击、无完整键盘模型 | tablist/tab/tabpanel、ID、hidden、方向键、Home/End |
| 动画 | 横向内容偏移 | Carousel 动画 | 可选内容淡入，尊重 reduced-motion |
| 资源开销 | 多个导航/指示器子组件 | Tabs 依赖 Affix，内容依赖 Carousel | 五个轻量组件，无 Carousel 依赖 |
| InfiniteScroll | 无移动耦合 | TabItem 注入 current | Maple platform 保留可见性注入 |

## PC / 移动保留差异

| 项目 | Cedar | Maple | 规则 |
| --- | --- | --- | --- |
| size=md 最小导航高度 | 36px | 52px | 相同 size API，不同 token 默认值 |
| xs/sm/md/lg/xl 最小高度 | 28/32/36/40/44px | 44/48/52/56/60px | 触控目标至少 44px |
| 操作按钮最小高度 | 28px | 44px | 触摸媒体查询统一提升到 44px |
| 导航两端 padding | 12px | 8px | 同一 token 后缀 |
| 内容块 padding | 16px | 12px | 同一 token 后缀 |
| 圆角 | 4px | 6px | 同一 token 后缀 |
| 溢出箭头 auto | 精细指针显示 | 触摸隐藏，鼠标仍显示 | 依据实际 pointer，不依据 UA 或屏幕宽度 |
| hover | 有鼠标时支持 | 连接鼠标时同样支持 | 不删减移动端 API |
| swipeable | 显式启用可用 | 显式启用可用 | 默认一致，避免平台隐式差异 |
| 全局设置 | ConfigProvider size/rtl | Maple 默认设置与外部 dir | platform.ts 适配库内上下文 |

视觉变体用途：line 用于常规分区；card 用于工作区页签；outline 用于独立描边标签；plain 用于轻量文字导航；capsule 为圆角分段；enclosed 为矩形分组。移动端支持所有变体，不用 API 限制业务选择。

## 其他组件库设计（2026-09-15 官方文档核对）

| 库 | 结构与能力 | 可借鉴点 |
| --- | --- | --- |
| [MUI](https://mui.com/material-ui/react-tabs/) | Tabs/Tab，Lab 提供 TabContext/TabList/TabPanel；scrollable、scrollButtons、allowScrollButtonsMobile | 同一 API 适配窄屏，溢出策略不等于另造移动 API |
| [Reka UI](https://www.reka-ui.com/docs/components/tabs) | Root/List/Trigger/Content；orientation；automatic/manual activationMode | 状态、焦点与外观分离，统一可访问性模型 |
| [Quasar](https://quasar.dev/vue-components/tabs/) | QTabs/QTab 与 QTabPanels 分离；滚动和移动箭头策略 | 导航与内容可组合，移动差异通过展示配置表达 |
| [Element Plus](https://element-plus.org/en-US/component/tabs.html) | Tabs/TabPane；卡片样式、位置、编辑、lazy、before-leave | PC 的编辑能力值得保留，内容生命周期需明确 |

这里没有直接照搬任一库的属性拼写。Cedar 已有 active、variant、orientation，继续沿用；采用组合式结构和跨端输入能力，是对这些设计的综合判断。

## 同源边界

两端 props.ts、context.ts、五个 SFC、共享行为测试逐字一致；Less 除命名空间外一致。允许差异仅：platform.ts、index.ts 导入与注册、token.less 默认值、平台文档及主题映射。质量脚本 checks/tabs-same-source.mjs 校验这些边界，并比较运行时导出名称与 token 后缀。新增公共能力必须同步两端。

## 使用边界

导航和内容需要放入同一个 Tabs，并使用类型一致的显式 key 建立对应关系。内容隐藏使用原生 hidden，动画采用淡入效果，默认选中首个可用项。

Tabs 适合页内内容分区。应用底部主导航使用 TabBar；粘性导航使用 Affix 包裹 TabsNavs。启用 swipeable 时，横向手势阈值为 50px，不拦截纵向页面滚动；复杂横向内容可标记 data-tabs-no-swipe。

## 内部样式 API 补充

Tabs 提供 item-class / item-style（内容内层）、item-wrapper-class / item-wrapper-style（每页面板外层）、tab-class / tab-style（导航标签外层）。两端定义、挂载位置与合并规则一致，间距通过样式属性或 token 定制。Tabs 现在为 25 项 Props。
