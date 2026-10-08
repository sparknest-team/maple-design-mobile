# Cedar / Maple API 迁移说明

本次为破坏性 API 迁移；两库独立打包，Card、Affix、Badge 不共享组件、实例或状态。

## 尺寸

| 组件 | 支持的 size | 含义与默认值 |
| --- | --- | --- |
| Progress | xs / sm / md / lg / xl / number / string | 默认 md；circle 为外径，line 为轨道厚度；显式 strokeWidth 优先 |
| Switch | sm / md / lg | 默认 md；ComponentSize 的已实现子集，不接受像素值；两端支持相同四种造型 |
| Card | sm / md | 默认 md；内容密度，不是图片尺寸 |
| Rate | number / string | 评分图标尺寸；数字和数字字符串为 px，CSS 长度按 CSS 解析；省略使用样式默认值 |

Progress 档位对应外径/轨道厚度（px）：xs=16/2、sm=48/3、md=64/4、lg=80/6、xl=96/8。
number 和数字字符串表示 px；带单位字符串可用 px/rem/em/vw/vh/% 及 CSS calc/min/max/clamp/var。
Progress 非法值、非正数和非有限数回退 md 对应尺寸；复杂 CSS 表达式必须由应用提供有效的正长度。
圆环根据实际渲染宽度计算 SVG 几何，ResizeObserver 响应容器变化；SSR 使用安全回退值，挂载后重新测量。
Cedar Progress.width 改为 size；Maple Switch 的数字 size 改为档位，精细视觉调整使用组件 CSS tokens。
Cedar 可从 ConfigProvider 继承尺寸；Maple 直接使用默认档位。公开 Props 中有默认值的属性仍可省略。

## 浮层

popupContainer: string | HTMLElement | false。undefined 默认 body；string 是 CSS selector，
HTMLElement 是实际容器，false 原地渲染。null、true 及函数不是此版本契约。
无效或缺失 selector 在客户端回退 body 并提供开发提示；SSR 不直接读取 document。
高层优先级：顶层显式值（含 false）→ 嵌套 triggerProps / popupProps / pickerProps → body。
renderToBody=false 改为 popupContainer=false；sameWidth 改为 autoFitPopupWidth；
clickToClose 改为 closeOnClickReference。模板使用对应 kebab-case 写法。

## 组件及命名

- Maple Sticky 改名 Affix；手动重新定位使用 updatePosition()。target 表示滚动目标；
  targetContainer 仅监听额外容器，不代表限制吸顶边界。offsetBottom 优先于 offsetTop。
- Card variant 为 default / outline / tonal；size 为 sm / md；内部排列 direction 为 row / column / row-reverse。
  原 image 插槽改为 cover，extra/action 改为 footer；cover 优先于 src 图片便捷接口。
- Badge 默认 status=danger（红底白字），显式 default 才是中性色。两端六个物理位置相同。
- AutoComplete.shouldOpen 控制是否允许展开；filterOption 控制选项逐项过滤，两个独立设定。
  默认仅非空输入展开；filterOption=false 用于服务端过滤。
- Alert 的主题意图 type 改为 status；所有已迁移描边枚举使用 outline。
  过程状态 wait/process/finish/error 保持过程含义，不替换为主题色。
- Steps、Slider、Timeline、Split 使用 orientation；Tabs.vertical 改为 orientation=horizontal/vertical。
  Card 内部排列、Carousel 运动方向仍使用 direction。
- Form.scrollToError=start/end 选择 DOM 顺序中的首个/末个错误，不是视口对齐方式。
- 普通多词通知统一 kebab-case（如 open-change、page-size-change）；模型事件保留 update:modelValue 等 Vue 命名。
  TSX 监听名称需对应事件声明，如 onOpen-change；不要改变 beforeXxx 拦截钩子的控制语义。

## 明确的端能力差异

Cedar Date 的 week/quarter 为桌面扩展；Progress.percent 与 Switch 的原有差异已在后续确认中统一。
Table 桌面数据表与移动轻量容器的能力不能直接求 Props 并集。
实施记录、验收及明确保留差异以 design-ui/audits/api-alignment-plan.md 与 Cedar OpenSpec 任务表为准。


## 定位、事件与枚举补充

- Trigger placement 使用 top/bottom/left/right 及各自 -start/-end，共 12 项；Cedar tl/tr/bl/br 等缩写迁移为完整名称。Maple cover-* 迁移为对应普通 placement 加 cover=true，覆盖不再编码进方位名称。
- open/close 表示实际开始打开/关闭，opened/closed 表示动画结束。update:open 与 open-change 是更新请求，不代替外部 Prop 变化的生命周期通知。Cedar Trigger show/hide → opened/closed。
- Cedar Drawer beforeOpen/beforeClose 通知 → open/close，原动画结束 open/close → opened/closed；命令式配置对应 onOpen/onOpened/onClose/onClosed。beforeConfirm/beforeCancel 保留拦截语义。
- Alert 的 after-close 改为 closed；VerificationCode 普通 onXxx 通知改为 emits；Slider start/end 表示拖动开始/结束，change 表示值变化。
- Alert、Tooltip、Message 的主题意图统一 status；Message 支持 default/info/success/warning/danger/loading，error()/normal() 便捷方法映射 danger/default。
- Result 两端均支持 info/success/warning/danger/question/empty/403/404/500，默认 info。Progress 支持同一状态集合，Maple 补齐 secondary/tertiary 渲染。
- elevation 公开类型统一 boolean | number；数字等级限制为整数 0～24。旧字符串数字改为 Vue 数值绑定，例如 :elevation="4"。
- Form.scrollToErrorOffsetY 接受 number/string，数值按 px，定位后扣除纵向偏移；卸载后不执行延迟滚动。
- Space 和各 Group 的 direction 管内部排列，保留该名称，不机械改为 orientation。

## Upload

Maple Uploader → Upload；hideList → showFileList（布尔值取反）、removable → showRemoveButton、previewed → preview。
文件模型统一 uid/status/percent/thumbnailUrl，分别替代 Maple id/state/progress/cover。
uid 必须稳定且唯一；percent 为 0～100；status 为 ready/reading/uploading/success/error/canceled/removed。
resolveType 两端支持 object-url/file/data-url，默认 object-url。组件仅回收自己创建的 Blob URL，不回收调用方传入的 URL。
beforeAdd 接收 File[] 并返回筛选后的 File[]；beforeRead 接收 File 并返回 boolean 或替换 File，二者支持 Promise。
beforeRemove 接收文件及列表，可返回 boolean/Promise<boolean>；这些不是普通通知事件。
Maple onClickAction 是选择文件的控制回调，保留 chooseFile 回调语义；不是可直接替换的通知。
Cedar 网络上传是桌面端扩展，Maple 由应用管理网络请求及状态，未伪造上传实现。

## 发布类型

所有公开运行时 xxxProps 都在组件入口及根入口配套导出 XxxProps。
公共类型采用调用方视角：默认值可省略，required 属性仍必选；内部刷新字段不公开。
Maple 声明由源码生成到 types-generated，根入口及子路径均指向生成声明，构建不再回写过时的手写组件声明。
本次按 major 迁移记录；不自动提交、升级版本或发布。

## Progress 与 Switch 统一（后续确认）

Progress.percent 两端统一 0～100，支持 number/十进制数字字符串和小数；0.5 现在表示 0.5%，不是 50%。
Cedar 旧调用、计算结果和初始值需要乘以 100；例如 :percent="0.5" → :percent="50"。文案插槽中的 percent 不再乘以 100。
非法/非有限值回退 0，有限超范围值截断；不接受百分号或 CSS 单位，不猜测旧比例格式。Maple 圆环几何不再先取整。
Cedar 自动完成判断相应改为 100；显式 status 仍优先。Maple 新增共同 text 插槽，保留默认插槽并提供百分比参数。

Switch 两端使用独立复制的相同组件、Props、样式：variant=circle/round/line/tonal，默认 circle；size=sm/md/lg，默认 md。
Maple standard → line，省略 variant 的默认造型改为 circle；不保留 standard 别名。旧几何 CSS tokens 迁移到新的 style/token.less。
checked-color/unchecked-color 统一控制轨道，滑块颜色由 token 定制；handle-elevation 仅 boolean/number。
移除 Maple lazy-change；before-change(nextValue) 返回 boolean/void 或 Promise。false、抛错、拒绝 Promise 取消切换，不再接收 change 回调。
等待 Promise 自动 loading，并阻止重复输入；卸载/停用/外部更新/禁用只读变化后旧结果不提交。
统一事件顺序 click → 拦截 → update:modelValue → change(nextValue,event)，外部更新不通知 change。
disabled/loading 不通知 click；readonly 可通知 click 但不调用拦截器。文案、图标插槽、原生按钮键盘和焦点支持两端一致。
两端只在配置尺寸与表单上下文读取上适配；不共享运行时、实例或状态。

## Card.loading 移除（2026-09-08）

Card 不再提供 loading 属性，也不替换正文或因加载状态拦截 click。加载展示使用 Loading 的指令：自动注册时使用 `v-mp-loading`；局部导入 `vLoading` 时使用 `v-loading`，并引入 Loading 样式。

```vue
<mp-card v-mp-loading="busy" :aria-busy="busy || undefined" title="Project overview">
  <mp-button :disabled="busy">Confirm</mp-button>
</mp-card>
```

指令保留原有内容，并在遮罩层阻止点击默认行为和冒泡，避免触发 Card/父级 click；不负责键盘禁用；需要禁止操作时显式设置交互子项 disabled。只想替换正文时可在默认插槽中自行使用 v-if / Loading。Card.loading 示例已删除，完整用法见 Loading 文档的指令示例。

## Loading overlay 命名（2026-09-08）

加载覆盖层的类名由 `.mp-loading__content-mask` 改为 `.mp-loading__content-overlay`，背景 token 由 `--mp-loading-mask-background` 改为 `--mp-loading-overlay-background`。自定义样式需要同步更新；不保留旧别名。指令 `background` 配置不变，遮罩点击拦截行为不变。

## Button 同源实现（2026-09-08）

- Cedar 的 loading-type=default/fill/line 改用 loading-mode=default/fill/line；loading-type 两端统一为 circle/wave/cube/rect/disappear，默认 circle。
- Maple 默认加载布局从覆盖变为行内；需要旧布局时显式设置 loading-mode=fill。
- 两端 ripple、focusable 默认 true；focusable=false 会设置 tabindex=-1，不是禁止程序聚焦。
- Cedar 样式 Token 改为 Maple 基线命名；例如 button-status-primary-bg-color → button-primary-color、button-size-md-height → button-normal-height（其余尺寸 xs/mini、sm/small、lg/large、xl/xl）。无旧名 alias。default 背景与文字引用基础主题变量，tonal 使用浅色容器。


竞赛结果和完整说明：`design-ui/audits/button-race.md`。

## Grid / Row / Col 同源

Row、Col 现在拥有独立 `row`、`col` 组件与样式入口；根包具名导入和 `Grid.Row / Grid.Col / Grid.Item` 保持可用。Grid/Row/Col/GridItem 的 Props 保持现有名称，Row/Col 两端统一一次 click 事件。

Cedar 内部样式改为 BEM：`c-col-12` → `c-col--span-12`，`c-col-md-12` → `c-col--span-md-12`，`c-col-md-offset-0` → `c-col--offset-md-0`，`c-row-align-center` → `c-row--align-center`。依赖旧内部 class 的自定义 CSS 需要迁移。响应式零值会正确隐藏或恢复，`div` 模式会清除全部栅格布局样式。

## Pagination 同源迁移

- `pageSizeProps` 由任意 SelectProps/MenuProps 改为 `PaginationPageSizeProps`。只支持 disabled、placement、popupContainer、class、style；分页值、选项和尺寸使用外层 page-size、page-size-options、size。Cedar 原 triggerProps.placement 移到 pageSizeProps.placement。Maple 由 Menu 改为 Select。
- 两端 size 默认 md（不再隐式继承 Cedar 全局尺寸），elevation 默认 false；需要原 Maple 阴影时显式传 true。
- responsive 默认 true，容器不超过 compact-breakpoint（默认 480px）自动使用简洁页码输入；保留总数及条数控件。需要完整页码和自定义页码/独立跳转插槽时设置 responsive=false。
- 点击节点改为原生 button，外层为 nav；样式统一 BEM `__item` / `__item--active` / `--size-md`。Cedar 原单横线内部选择器需迁移。
- CSS token 统一为文档的新变量表。旧 bg-item / active-bg-color 对应 active-background；hover-bg-color 对应 hover-background；item-width / item-height 对应 size-md（或具体尺寸），输入宽度统一 input-width；布局间距使用 gap / item-gap。
- 跳转框清空或输入非整数不导航；Enter 后 blur 不重复通知。page-item-style 与 active-page-item-style 合并。

## BottomNavigation → TabBar

按本次命名决策直接重命名，作为下一次 major 迁移，不保留旧名兼容入口。组件行为、Props 默认值、事件和插槽保持不变。

| 旧名称 | 新名称 |
| --- | --- |
| BottomNavigation / BottomNavigationItem | TabBar / TabBarItem |
| mp-bottom-navigation / mp-bottom-navigation-item | mp-tab-bar / mp-tab-bar-item |
| bottom-navigation 模块及样式入口 | tab-bar 模块及样式入口 |
| BottomNavigationProps / BottomNavigationInstance | TabBarProps / TabBarInstance |
| BottomNavigationItemProps / BottomNavigationItemInstance | TabBarItemProps / TabBarItemInstance |
| bottomNavigationProps / bottomNavigationItemProps | tabBarProps / tabBarItemProps |
| --mp-bottom-navigation-* | --mp-tab-bar-* |

根入口使用 `import { TabBar } from '@maplejs/maple-ui'`；子项可使用 `TabBar.Item`，或从 `@maplejs/maple-ui/tab-bar` 导入 `TabBarItem`。按需样式使用 `@maplejs/maple-ui/tab-bar/style`。自动解析器、IDE 元数据和主题导出已同步更新。

### TabBar 选中状态补充

未传入 active 时使用内部状态（default-active 默认 0）；default-active 只在初始化时读取。显式传入 active 仍为受控模式；移除 active 后保留最后的受控选中值。

Item.name 支持数字。显式 name 优先于索引，有 name 的项目不再同时按其位置索引匹配，避免多个项目同时选中。使用命名项目的调用方应传入对应 name。此匹配修正随 TabBar 的 major 命名迁移发布。

before-change 的抛错与 Promise 拒绝视为取消，不改变当前选中项。快速连续点击只允许最后一次请求提交；点击当前项可取消正在等待的切换。没有新增 route、to 或 replace。

## Switch 造型命名收敛

第四种造型统一使用 variant="tonal"；对应变量采用 --c-switch-tonal-* / --mp-switch-tonal-*，包含 width、height、handle-size、border-width、border-color、track-background、text-color、handle-color。旧第四变体及变量需一起迁移，不保留别名。主题独立使用 default / maple × light / dark，不使用造型名作为主题名称。
