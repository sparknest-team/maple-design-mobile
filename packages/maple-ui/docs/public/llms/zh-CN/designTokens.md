<!-- Source: docs/designTokens.zh-CN.md; locale: zh-CN; page: /zh-CN/designTokens -->

# Design Token 与 CSS 变量分层

### 全量收尾复核（2026-10-20 14:34 起；无新增漂移）

本轮只读重查通过：当前库存 198 文件／418 CSS／184 runtime，文件键差异 0；80 份分类 hash 全部匹配，184/184 提示已分类（100%），待审 0；33/33 既有组件族已分类（100%），剩余 0（0%），分母未变。三页生成目录全量匹配，未发现新的并行重叠。两端受查生产树汇总与上轮收口快照一致；已有未提交业务改造保留，不把 dirty 状态误报为新漂移。

共享 motion 106 项及完整后续编译链、目录 47 项／三页匹配、严格消费扫描 172 文件／4565 声明／70 已分类候选／0 待审／0 错误通过。pnpm 入口因尝试在工作区外准备自身版本而被 EPERM 拦截；改用现有 Node v23.2.0 执行 package.json 中相同的 Node 检查链通过，不声称 pnpm 入口通过，未安装软件或修改权限。

本轮只更新审计文档与证据，未改生产源码、Token 默认值、库存／hash 登记或三页生成表格；未重跑全组件业务测试／类型／根 lint，不把上轮结果改写为本轮新验证。分类／Less 编译检查不是全库业务或原生验收率。Map SDK、144 组原生环境及 Button 白字 on-dark 2.305:1 非 AA 例外保留，新增原生验收 0，自动化核实仍 PAUSED。详见 design-ui/audits/token-closure-recheck-2026-10-20-1434.md 与 audits/evidence/full-closure-recheck-2026-10-20-1434/results.json；环境恢复条件仍见 token-closure-recheck-2026-10-20.md。

### 日期库存／hash／目录授权收口（2026-10-20）

本批只同步获授权的 3 处库存、2 份分类 hash 和三页共 11 个逻辑行（2 默认值变化＋9 新行，5 个新增唯一声明）。生产源码、样式／Token 默认值、范围确认／提交和并行业务未改；未复现新的产品故障，不为登记漂移制造实现修复。新增审计基线 10 项中 8 个登记／目录匹配失败、2 个真实 Less 消费通过；库存比较夹具另纠正 file 字段包装，实际 3 处位置差异已独立确认。Cedar 新夹具首轮 attrs 透传覆盖 disabledDate 的误设也已纠正，不算产品故障。

真实入口核对：Cedar date/picker/style/index.ts → index.less → token.less，预览边界 outline、悬停范围／边界 fill-2 选择器与真实 Body 类名匹配；Maple date/style/index.ts → index.less → date-picker.less，日／月／年范围底色、禁用底色、预览底色和边界 outline 消费四个新声明。目录属性仅证明编译可达性，不代表所有 DOM／局部覆盖／对比度或原生验收。

Cedar 保留原 100ms 快捷预览任务、原句柄取消和生命周期／代次／一次消费／header continuation 守卫；真实禁用 Body 清除后旧回调重复交付不覆盖新草稿。Maple onSmartMounted 挂载／新激活同步滚动，nextTick 仅做记账；鼠标／触摸范围预览不追加滚动。新 Vue 回归两端各 2 项，按技能恢复方法描述符、卸载组件、恢复模拟计时器；没有新的资源需修复。

共享 motion 106 项及后续完整编译链、目录 47 项与三页全量匹配通过；严格消费报告 172 文件／4565 声明／70 已分类候选／0 待审／0 错误。库存仍 198 文件／418 CSS／184 runtime，80 登记 hash 匹配、184/184 提示已分类（100%），待审 0；33/33 既有组件族分类收口（100%），剩余 0（0%），分母未变。这是分类口径，不是全库业务或原生验收率。

受影响回归／类型／lint 的最终结果与首轮广测、串行隔离诊断分开保留，见 design-ui/audits/evidence/date-drift-closure-2026-10-20/results.json。Map SDK／144 原生组恢复条件沿用 token-closure-recheck-2026-10-20.md；新增原生验收 0，Button 白字 on-dark 2.305:1 非 AA 例外及其他文本阈值不变，自动化仍 PAUSED。下文“3 处／2 hash／三页待交接”是授权前历史快照。

### 全量收尾复核（2026-10-20；发现新的并行漂移）

本轮不能确认“无新增漂移”：库存总量仍为 198 文件／418 CSS／184 runtime，但有 3 处文件键差异（Cedar DateRangePicker、Maple YearPickerPanel 与 date-picker.less）；80 份分类源码中 78 份 hash 匹配，两个日期文件待重验。182/184 提示仍有匹配身份（98.9%），2 条待重验（1.1%），不是新增 2 个缺陷。既有 33 族历史分类不撤销；按当前源码身份，32/33 族匹配（97.0%），Date 1/33 族待重验（3.0%），不是全库业务／原生验收率。

三页均有日期目录漂移：Cedar 2 行默认值变化＋1 行新增，Maple 中英各 4 行新增，共 11 个逻辑行、5 个新增唯一声明；不是 11 个缺陷。当前完整编译报告为 172 文件／4565 声明／70 已分类候选／0 待人工／0 错误（首轮并行快照曾为 4564，不能混成冻结结果）。日期源码／Token 在检查期间继续变化，未覆盖并行业务，未自动刷新库存／hash 或应用生成表格。

motion 首段 92/96 通过、4 失败，未执行后续串行全量编译链；目录专项 37/37 通过，但全量三页匹配失败。已存浏览器证据 202 项与完整性链通过，只验证旧记录，新增原生验收 0。Map SDK 与 144 组原生环境分别需要的输入、明确交接范围和逐项差异见 design-ui/audits/token-closure-recheck-2026-10-20.md；证据见 audits/evidence/full-closure-recheck-2026-10-20/results.json。自动化已核实仍 PAUSED。下方 10-19 通过结论保留为历史快照。

### Maple 展示编辑器 lint 收尾复验（2026-10-19）

此前 3 文件的 8 项 lint 诊断已在本轮开始时消失：EditorPanel.vue 属性换行、presentation-state.vue 的 const 定时器容器及条件块、Form 示例入口导入顺序均已整理。本轮仅核对与验证，未再改这三个源码文件，保留 pending／inert、1200ms、AbortSignal、一次结算和并行业务语义；历史失败记录不改写为通过。

当前 Maple 只读根 lint、三文件专项 lint、配置声明类型均通过；相关 Form／Select／FieldPresentation 回归 300 项／34 文件及三个 SFC 脚本／模板编译通过。配置类型排除示例，示例另以 SFC 编译／lint 核对，不冒称示例完整类型验收。共享 motion 96 项及完整后续编译链、目录 37 项／三页匹配、严格消费扫描 172 文件／4560 声明／70 已分类候选／0 待审／0 错误通过。

库存仍为 198 文件／418 CSS／184 runtime；80 份分类 hash 匹配，184/184 提示已分类，待审 0，分母无新增变化。33/33 组件族已分类（100%），剩余 0（0%）；这是分类进度，不是原生浏览器验收率。无新库存／hash／目录漂移，未刷新登记或重生成相同目录。Map SDK 与 144 原生组阻塞保持，新增原生验收 0，自动化核实仍 PAUSED。详见 design-ui/audits/evidence/field-presentation-lint-closure-2026-10-19/results.json；恢复条件沿用 token-closure-recheck-2026-10-19.md。

### FieldPresentation／Form 授权收口（2026-10-19）

末次身份核对另捕获 Cedar 搜索助手的格式变化：当前完整字节与已登记、已验的 Maple 助手相同（6731260e…），调用行／片段未变，独立重验后只刷新该 hash。全部 80 份登记 hash 当前匹配，未将晚期变化说成源码全程未变。

末轮状态：Maple 根 lint 因新并行 EditorPanel.vue、form/example/demos/presentation-state.vue、form/example/index.vue 共 8 项格式／规则诊断退出 1；首轮通过只代表当时快照，不作为当前全库 lint 结论。本批未格式化这三个文件，需要并行负责人处理或交接这三个具体文件的格式整理边界；不影响已通过的专项、类型、当前库存／分类和目录证据。以下“根 lint 通过”仅为首轮历史。

严格门禁：motion 96 项及后续完整编译检查、目录 37 项／三页匹配、消费扫描 172 文件／4560 声明／70 已分类候选／0 错误通过。移除原始文本导入兜底后另验 AST 正反 8 项、全量三页和严格消费扫描通过。随后观察到 EditorPanel／Select 渲染与控制器等并行修改，均未覆盖；当前相关补验 Cedar 80 项／10 文件、Maple 89 项／13 文件及两端类型通过。完整 186／240 和补验不混成新增用例或全库业务认证。

新授权范围已完成：先复现两端搜索各 9 项（7 失败／2 对照）、焦点各 6 项（4 失败／2 对照），再限域修任务归属。搜索只接受当前激活实例／请求票据，替换、关闭／read／禁用、停用／卸载使旧任务失效；通知前一次消费，delay 读取和取消后旧回调不遗留任务、不覆盖新句柄。关闭后的 nextTick 焦点归还检查当前 reference、开合／形态、生命周期和代次，回调只消费一次；不在重开或跨停用后夺回焦点。失败断言相互交叠，不当成独立缺陷数。

两端真实 Form→Select 新增各 3 项回归，确认匹配字段 reset 退休搜索、无关 reset 保留当前搜索、活动编辑器阻止提交的原语义保持；两端 Form.vue／控制器／提交和并行业务源码未改，只重验并刷新登记 hash。Cedar 完整受影响 186 项／25 文件、Maple 240 项／33 文件通过（各新增 18 项），两端配置类型与受影响 lint、Maple 根只读 lint 通过。Maple Option 的外部变化保留，不以本批覆盖并行业务。

审计器从真实 style/index.ts 静态导入链发现私有 style.ts → style.less → token.less，保留真实声明路径与内部可见性；注释／type-only／孤立文件／越界路径不能伪造消费，旧入口与错误门禁保留。Maple Less 原将 min(var(--mp-field-presentation-min-width), 90vw) 折叠成 90vw，已通过保持原 CSS 表达式的转义修复真实丢失的变量消费；默认值、其他设计和公开 API 不变。

仅同步 6 处已审库存、两端 Form hash 与两个搜索登记；当前库存 198 文件／418 CSS／184 runtime，80 分类源码、184/184 提示（100%），待审 0。33/33 既有组件族已分类（100%），剩余 0（0%）；私有跨组件任务归入已有 Select／Form 消费链，不新建公开组件族。分母 182→184 来自两条新增实现提示，不是额外旧缺陷；两端搜索仍各 1 条提示。三页仅新增 _components/field-presentation 私有节共 12 Token 行（两端共 8 个声明），内部实现名不因列入目录变成公开 API。

最终严格门禁结果及快照见 design-ui/audits/evidence/field-presentation-form-closure-2026-10-19/results.json。Less／受控计时器／JSDOM 与真实浏览器／OS 分层，新增原生验收 0；Map SDK 及 144 组原生环境恢复条件见 token-closure-recheck-2026-10-19.md，Button 白字 on-dark 2.305:1 非 AA 例外保留，自动化仍 PAUSED。下文“6 处／2 hash／目录入口待交接”为授权前历史。


### 全量收尾复核（2026-10-19；当前状态）

本轮发现新变化，不能沿用 10-16 的全量通过结论：当前实际库存 198 文件／418 CSS／184 runtime，6 处文件键漂移；两端 Form 共 2 份登记 hash 过期。原 33 族中 32 族的登记源身份匹配（97.0%），Form 1 族需重验（3.0%）；新私有 FieldPresentation 搜索任务归属待登记，不先扩大族分母。当前 176/184 提示有匹配身份的既有登记（95.7%），8 条需审／重验（4.3%，Form 6＋新增搜索 2）；182→184 是新增实现提示，不是新增缺陷数。

两端新私有 token.less 使用 style.ts → style.less 路径，现审计器按旧 style/index.less 结构产生 2 项入口错误；真实 Less 各自编译通过，但目录完整检查中断，三页当前是否有新增行漂移尚未确认，未自动生成／发布部分目录。motion 首段 76/79、目录 8/11 后失败；后续全量编译链未执行，不声称全局 motion／目录通过。保存的浏览器证据 202 项及完整性链通过，仅校验旧记录，新增原生验收 0。

Map SDK 需正式适配器／版本、监听与销毁／异步取消契约、业务交接及受控可运行网络环境；144 原生组需可用 Chrome 原生 200%（48）、Safari 100%（48）、Firefox 100%（48）的受支持真实入口与逐组证据。历史连接观察未重新包装成本轮探测。具体差异、恢复输入和验收清单见 design-ui/audits/token-closure-recheck-2026-10-19.md；JSON 见 audits/evidence/full-closure-recheck-2026-10-19/results.json。

本轮仅更新审计文档／证据，保留并行业务、库存／hash 登记、三页生成目录和 Token 默认值。新增 FieldPresentation／Form 与审计器需交接边界后再收口；Map／原生阻塞、Button 白字 on-dark 2.305:1 非 AA 例外保留，自动化已核实仍 PAUSED。以下 10-16 全量通过是历史快照。

### Select／菜单表面目录授权收口（2026-10-16）

最终：Cedar 41 项／3 文件、Maple 49 项／6 文件通过（本批仅新增 1＋3 项 DOM 消费回归）；两端作用域／Maple 根只读 lint、三仓 diff 通过，91 个相关生产文件 hash 全部未变，验证进程均结束。保留首轮 Select 祖先选择器和 FloatingPanel 属性转发的夹具误设记录，不计产品缺陷；Vue 技能落实 finally 卸载／宿主移除。自动化仍 PAUSED，原生新增 0。

本批仅同步已核实的 Select 3 处库存／hash 和 Select、Maple Menu／FloatingPanel 三页共 21 行目录（11 个唯一 Token）。Cedar Select 当前钩子与已登记 Maple 源文件逐字同 hash；6 条调用职责不变，仅格式／行号更新。保留平铺分组标题的首项零上边距、纵向 popup padding、选项水平 padding 别名，以及菜单现有行级选中／悬停背景与 overlay 表面，未修改生产源码、样式、Token 默认值或并行业务。

实际 Less 入口、SelectMenu 平铺 DOM、Menu 分组／选中／焦点／禁用类及 FloatingPanel Teleport 宿主已核对。FloatingPanel 应在真实 popup 祖先覆写 --mp-floating-panel-background；不要假定传给 Teleport 组件的 style 自动转发到面板。目录属性列表表示编译符号可达性，不是每个 DOM 状态或局部派生别名重新求值的保证。

全量 motion 门禁当前通过（88 项共享测试、196 文件库存、182/182 分类及后续编译检查）；目录 29 项及三页全量匹配、消费检查 170 文件／4552 声明／70 已分类候选／0 错误通过。33/33 运行时组件族已分类（100%），剩余 0/33（0%）；78 源码、182/182 提示（100%），待审 0，分母未变。不是全库业务或原生验收率。

Map SDK 正式清理／异步身份契约、144 组原生环境阻塞和 Button 白字 on-dark 2.305:1 非 AA 设计例外继续保留；自动化保持 PAUSED。回归与最终快照见 design-ui/audits/evidence/select-catalog-closure-2026-10-16/results.json。以下 Select 3 处／目录 21 行未授权阻塞为历史。

### 原 6 处库存／DateRangePicker hash 授权收口（2026-10-16）

最终收尾：Maple 根只读 lint、Cedar 新夹具 lint、三仓 diff 与证据 JSON 均通过。保留首轮新夹具 curly 错误及第二轮并行 DatePanelContent 导入格式失败；本任务只修新夹具，观察到并行导入格式已变化后有界重跑通过。17 个相关生产快照中 16 个未变；RangeContent 并行改为移动端上下文导入，当前 8 项消费回归再次通过，未覆盖该业务文件或声称全族并行稳定。所有验证进程结束，自动化仍 PAUSED。

本批获授权的 6/6 处库存重叠已核实并刷新（100%，剩余 0）；连同上批，原 31 处已审记录全部同步。Cedar DateRangePicker 的时间选择业务分支保留；仅在内存还原该分支即可恢复上次登记的完整 hash 0e223655…，证明 100ms 预览任务只是 639→644 的行号移动。当前 hash 2a47d80d…、调用片段和 interaction-delay 职责已独立重验后登记，不改变 100ms 策略、提交／确认语义或头部任务所有权。

6 处库存基线均失败，新增 5 组真实 Less 消费检查已通过；DateRange／TimeRange 生成目录另有 4 项旧节基线失败。最终局部门禁 51 项通过；Cedar 25 项／3 文件通过（含新增 2 项时间选择与旧回调重复交付），Maple 32 项／5 文件通过（含新增 8 项 Carousel 三种 effect 与范围面板 DOM 消费）。Cedar 首次新增夹具仅错误要求所有计时器为零，已改为核对原预览句柄物理取消；不是已复现产品故障。生产 SFC、样式、Token 默认值和并行业务均未修改。

Carousel 的实际 track／fade／card 消费及 reduce 规则、Less 原样输出 grid-area 均核对；范围背景已有局部 picker／date／time body 别名，支持相应后代背景路径。目录 background-image 仅表示符号依赖可达；Picker 的根级派生 mask 别名不保证随局部背景覆写重新求值，需直接覆写 --mp-picker-mask-background-image 定制遮罩，本批不改其默认策略。Date／Time 还含历史转换选择器，不能以编译存在推断每种模式命中或完整 reduced-motion／原生验收。

授权的 Maple 中英 DateRange／TimeRange 共 4 行生成目录已同步。新增范围外变更独立保留：两端 Select 样式行号、Cedar select/hooks/use-select.ts 运行时行号及 hash；全量库存当前因此仍有 3 行漂移，分类 CLI 因 Select 失败，不再是 DateRangePicker。目录还保留 Select／Maple Menu／FloatingPanel 共 21 行、3 页的并行漂移，未整页应用。历史运行时登记仍 33/33 族、78 文件、182/182 提示、待分类 0，分母未变；当前 Select hash 待重验与未分类提示是不同统计，不声称全局门禁通过。

Map SDK 清理／异步身份契约、144 组原生环境阻塞、Button 白字 on-dark 2.305:1 非 AA 例外和自动化 PAUSED 保留。本次 Vue 技能用于原资源／回调交付复核及 finally 卸载／计时器恢复；Less、JSDOM 与真实浏览器分层，本批原生新增 0。证据：design-ui/audits/evidence/remaining-six-inventory-closure-2026-10-16/results.json。以下 6 处待授权／DateRangePicker hash 阻塞均为历史。

### 库存漂移分批收口（2026-10-16；自动化保持暂停）

最终收尾：Maple 根级只读 lint 退出 0；25 个已审生产文件 hash、三仓 diff 和证据 JSON 核验通过，验证进程均已结束。全量库存和分类 CLI 的已说明失败仍保留，不以局部通过掩盖。

重新扫描以文件键计为 31 处差异（Cedar 4／Maple 27），历史“26 处”不是当前固定分母；本轮最初“32”计数口误已更正。已核对并仅刷新 25/31 处库存记录（80.6%），保留 6/31 处（19.4%）重叠。25 处包含：5 处前批已审 FieldDecorator／Input／FilterForm 的行号更新、14 处无未提交样式变化的候选行号漂移、6 处已提交的 Checkbox／Radio／Progress／ProgressGroup／Rate／Slider 样式候选扩展。后六项虽部分文档／示例并行，未发现相应样式源码冲突，不能整族视为阻塞。没有把 25 处旧快照当作 25 个产品缺陷。

新增 31 项回归的有效基线为 25 个库存匹配失败／6 个真实编译消费通过；局部刷新后与既有 4 项扫描器回归合计 35 项通过。25 个实际 Less 入口均编译，6 组扩展核对正常 duration／animation 路径与 reduced-motion 对应规则；Maple 受影响真实控件回归 85 项／7 文件通过（不是 85 项新增）。保留 Rate 非法 count 测试的预期 Vue warning。仅建立候选位置／编译可达性证据，不外推 14 个旧样式完整 reduced-motion 覆盖、CSS 动画帧或原生验收；未修改生产源码、Token 默认值或业务。

6 处重叠保留：Cedar date/picker/DateRangePicker.vue；Maple carousel/style/index.less、date-range/style/date-range-picker.less、date/style/date-picker.less、time-range/style/time-range-picker.less、time/style/time-picker.less。日期／时间关联模板和 Token 仍有并行变化，日期范围／时间范围 Less 在审查期间也继续变化；Carousel 有并行 fade 样式及主体改造。本批未接管这些源码或刷新其库存。继续前需要相应源码／关联 Token 可交接的具体边界，或明确限域接管授权。

当前库存快照仅纳入已审变更：196 文件、414 条 CSS 提示；实际源码为 196 文件、416 条 CSS 提示，差额及行号差异仍由 6 处保留造成。实际 CSS 提示由旧 392→416，含已有实现／none 覆盖及两个新增库存文件，不是新增 24 个缺陷。运行时提示仍 182，历史登记 33/33 族、78 源码、182/182 提示、待分类 0，分母不变；但当前分类 CLI 退出 1，Cedar DateRangePicker 为 78 份中唯一 hash 过期，需重验，不能沿用历史 100% 当当前 hash 验收。全量库存 CLI 也退出 1；未称全局 motion-themes 通过。

Map SDK 正式清理／异步身份契约、144 组原生环境阻塞及 Button 白字 on-dark 2.305:1 非 AA 例外保留。本聊天自动化仍 PAUSED，不恢复调度。仅库存／门禁测试／审计文档变更，无新组件 API／发布语义，不为旧快照新建产品修复 Changeset 或 Demo。逐项边界和验证：design-ui/audits/evidence/inventory-drift-review-2026-10-16/results.json。以下“26 处保留”描述为历史。

### FieldDecorator 焦点／caret 目录收口与自动化暂停（2026-10-16）

最终收尾：Maple 根只读 lint 与 Cedar 新测试作用域 lint 通过；Maple 首轮仅新夹具的 28 项格式／导入排序诊断已限文件格式化修正，修正后 9 项专项再次通过。12 个生产文件 hash 不变、三仓 diff 与证据 JSON 核验通过，所有验证进程结束；自动化保持 PAUSED。

用户限域授权后，核对两端实际 FieldDecorator／Input／Textarea／InputNumber、静态样式导入链及 Less 编译：外壳外环移除与原生 caret 改为 currentColor 已由并行实现和当前规范确定，保留变体焦点反馈、按钮 focus-visible、错误／禁用优先级与现有 Token。未复现需修改生产源码的缺陷；本批不回退设计，不改业务、SFC、样式或 Token 默认值。目录中 outline-offset／caret-color 的旧消费行已过期，仅应用三页共 9 行生成差异。focus-color 不承诺控制 caret；错误态焦点可辨识性仍需原生验收。

有效 9 项共享基线 6 通过／3 页目录失败；首轮另有 2 项探针错误要求所有样式直接导入 FieldDecorator，按真实“Textarea／InputNumber → Input → FieldDecorator”链修正，不能计作产品缺陷。最终共享目录 17 项通过，三页全量目录匹配；既有 field-focus 编译检查与 384 项错误／禁用颜色和覆盖检查通过。Cedar 106 项／13 文件、Maple 129 项／15 文件通过，各新增 9 项真实控件 DOM 回归。Vue 技能落实 finally 卸载；Less／JSDOM 与真实浏览器分层，本批原生新增 0，未复跑无变化原生入口。

运行时候选仍 33/33 族（100%），剩余 0 族（0%）；78 登记源码、182/182 提示（100%），待审 0，分母不变。这不是全库业务或原生验收率；26 处其他库存漂移、Map 正式 SDK 清理／异步身份契约、144 组原生 Chrome 200%／Safari／Firefox 环境阻塞及 Button 白字 on-dark 2.305:1 非 AA 例外保留。用户要求停止的本聊天自动化 cedar-maple-14-00-2 已暂停（PAUSED），不再周期启动工作；本次明确授权的手动收尾已执行。

共享规范、两端指南／相关组件说明、Changesets、既定 OpenSpec 和证据同步：design-ui/audits/evidence/field-focus-caret-catalog-2026-10-16/results.json。以下 FieldDecorator 未授权／目录阻塞描述为历史。

### Cedar FilterForm／Form 目录消费收口（2026-10-16）

用户已授权限域审查相关样式／Token。历史“5 处目录差异”不是 5 个缺陷；按当前生成器合并为 2 个上下文差异块，现已只同步 Cedar 的 FilterForm／Form 两节。真实 Less 编译、Form 样式入口和实际 DOM 共同确认 13 个 FilterForm Token 的消费者；Form 的行高／标签下间距通过 action-offset 别名传递至 padding-top。单列 stacked 状态覆盖为 0；Grid colGap 是数字属性，不冒充 CSS Token。组件局部覆盖建议直接设置 --c-filter-form-action-offset，不假定根级派生别名会随局部依赖重新计算。未修改生产样式、Token 默认值、SFC 或并行业务代码。

新增目录回归基线 5 项中 3 通过／2 失败，失败仅为旧目录两节；同步后共享 8 项通过，Cedar FilterForm／Form 合计 75 项／17 文件通过（只新增 2 项 DOM 回归），作用域 lint 与全量消费检查通过。Vue 技能落实夹具卸载／媒体描述符恢复。Less／JSDOM 不等于原生布局或焦点验收，本批原生新增 0。

全量目录门禁仍受新出现的范围外 FieldDecorator 消费漂移阻塞：Cedar 与 Maple 中英共 3 页、9 行涉及 outline-offset／caret-color。未自动应用这部分生成补丁，也未据此认定业务／可访问性缺陷；需要另行审查授权或负责人交接。Map SDK 清理／异步身份契约、144 组原生环境阻塞与 26 处其他库存漂移保留。运行时候选分类仍为 33/33 族（100%），剩余 0 族（0%）；78 源码、182/182 提示（100%），待审 0，分母不变；不是全库验收率。Button 白字 on-dark 2.305:1 非 AA 例外不变。

证据：design-ui/audits/evidence/filter-form-token-catalog-2026-10-16/results.json。以下旧“5 处待交接”描述为历史，不再作为当前授权阻塞。

### Form／Picker运行时候选分类收口（2026-10-16）

最终受影响验证：Cedar Form64项／14文件、Maple合并532项／95文件全部通过（含Form115／19、Picker30／4）；两端相应lint／配置类型、共享29项及分类CLI182／0通过，最终hash／三仓diff／JSON核验通过。Maple中间531／532仅新增夹具错误禁止合法A通知，修正后205.86s最终全通过；NodeList类型适配改为局部Array.from，未改配置。原生新增0，所有验证进程已结束。

用户新授权仅接管 Cedar Form／Maple Picker 的运行时调度和资源清理，保留并行业务改造。Cedar 原11项基线7失败／4对照，Maple Picker有效7项5失败／2对照，Maple Form完成等待5项4失败／1对照；交叠断言不是独立缺陷数量，候选上的重复offset／重复注册／通知重入另行取证后修复。Cedar当前实例／验证／字段与一次消费守卫、原注销身份；Picker原媒体绑定／列／scroller完成票据与通知代次；Maple Form渲染后按当前CSS duration＋delay等待，零／无过渡不固定等300ms。正时长有可取消准备帧，300ms仅不可读样式保底，插值仍保留原300ms。控制器、FormItem、并行submitEpoch／提交、disabled／ARIA／级联及CSS Token不替换。

分类为33/33族100%，剩余0族0%；78登记源码、182/182调用提示100%，待审0条0%。本批只刷新四处已审候选（含新增私有完成助手）；分母181→182净增1条实现提示（新增助手2、移出Form旧timer1），不是额外旧缺陷，亦不把历史178→181重算。**这是本轮运行时候选职责分类，不是整库／所有业务协议／原生验收100%。** 受影响回归、类型、lint和共享门禁最终结果以逐组证据为准，不沿用旧18/33或旧NavMenu快照。

Vue技能落实原资源、停用／卸载、一次消费、重入和finally恢复。JSDOM受控Promise／timer／RAF／媒体／CSS与真实Less编译分层，原生浏览器／OS新增0。FormDetails当前Less编译仍为0.2s；未改CSS／公开Token／API。既有基础、异步、键盘和禁用示例保留并行修改，必要行为说明已同步组件文档；历史RPC、夹具失败、类型／lint诊断均保留，不降测试阈值。

原两族运行时接管授权阻塞已解除；不再要求重复授权。仍保留上次Cedar FilterForm／Form目录5差异块（需样式／Token稳定交接后人工整合，未覆盖生成）、Map正式SDK清理／异步身份契约、144组Chrome原生200%／Safari／Firefox环境条件及26其他库存漂移；不声称全局motion-themes通过。Button白字on-dark2.305:1非AA例外保持。Date／Time并行展示业务未接管，分类及受影响回归不等于整族稳定。新证据：design-ui/audits/evidence/form-picker-runtime-closure-2026-10-16/results.json。

### Maple Form自动滚动资格获授权修复（2026-10-16，阶段三）

用户明确允许仅补Form.vue内验证开始／清除／重置到自动滚动资格接线。基线10项6失败／4对照（exit1，11.80s）后，加入独立滚动资格版本、验证请求／策略快照及原字段成员／名称／目标复核；清除、重置、设置字段和新验证退休自动等待／插值，保留显式手动命令。校验回调重入后旧自动滚动不再覆盖新命令；停用前验证结果不能跨激活排滚动。校验Promise／回调、并行submitEpoch和提交语义保持，form-controller.ts／FormItem.vue、CedarForm／MaplePicker未改。

首修31项通过；补9项命令／物理取消／回调替换／字段身份对照后，最终Form106项18文件通过（exit0，60.18s），含本阶段19项＋前批87项，不记106个新增用例或六个独立缺陷。根只读lint、配置类型、共享29项和分类CLI165/16通过。首轮新增声明排版lint失败已手工修正，不以当时类型通过掩盖lint失败。Vue技能落实原资源、KeepAlive及finally恢复；均为JSDOM受控Promise／timer／RAF／几何层，真实浏览器／OS新增0，无Less／构建或无变化环境复跑。

分类仍31/33族93.9%，剩Form／Picker2族6.1%；74登记源码、165/181提示91.2%，16待审8.8%（Form7／Picker9），本批分母不变。只手动刷新Maple Form五行提示100／103／114／131／165，不刷新26其他漂移。固定300ms完成等待与FormDetails0.2s／reduce关系仍待审，Form不提前归档。CedarForm／MaplePicker仍需具体source＋test交接／冻结或限域授权；Date／Time候选已分类不等于并行面板全族稳定。目录5差异块、Map正式SDK契约、144原生环境组及Button白字2.305:1非AA例外保留。证据：design-ui/audits/evidence/form-scroll-validation-baseline-2026-10-16/results.json。

### 历史：Maple Form异步滚动资格授权前基线（2026-10-16，阶段三）

本批仅新增独立scroll-validation-eligibility探针，产品Form仍为324148a9…，阶段一／二滚动实现及并行submitEpoch均未改。有效10项基线6失败／4对照（exit1，11.80s）：验证旧结果跨停用／激活排自动滚动、原字段注销但节点仍连接仍排、清除错误／关闭自动滚动未取消等待、字段目标替换后旧等待仍排RAF、校验回调清除错误后仍排。组合／交叠不计六个独立缺陷。当前错误结果及Promise返回、成功无滚动、显式手动滚动不受自动策略变化影响、新激活后新验证四类对照通过。

按Vue技能核对了异步归属／KeepAlive和原timer／descriptor finally清理。真实Form/provider注册字段、受控Promise／300ms队列与RAF探针是JSDOM层，不是原生输入／布局／OS／adopt验收，真实新增0。新测试保持失败基线，不跳过／不称当前整套Form通过；前批87/17通过是前批测试集历史。作用域lint通过；最终只读根lint及hash/diff记录见证据。

需要明确扩展到Form.vue内“验证开始、清除、重置到自动滚动资格”的局部接线；只抑制失效自动滚动，不改校验返回、回调、submitEpoch、提交语义或form-controller.ts／FormItem.vue。已请求用户决定，未先行修改该接线。成员／目标检查可与该请求归属一起审查，固定300ms等待策略保持待审；FormDetails源样式0.2s只作源级依据，不当Less／原生测量。

分类不变：31/33族93.9%，剩Form／Picker2族6.1%；74登记源码、165/181提示91.2%，16待审8.8%（Form7／Picker9），分母无变化，无库存／分类刷新。保留26其他漂移、目录5差异块、Map正式SDK、144原生环境组、Button白字2.305:1非AA例外及CedarForm／MaplePicker并行边界。证据：design-ui/audits/evidence/form-scroll-validation-baseline-2026-10-16/results.json。

### Maple Form已启动插值的生命周期（2026-10-16，阶段二）

最终本批：Form87项17文件全部通过、exit0、275.40s，含本阶段11新插值专项＋前批10等待项＋既有／并行66项，不把21项都算本批新写。共享29项、分类CLI165/16、类型及根／最终作用域lint通过，三仓diff及最终hash／JSON检查通过；验证进程已结束。中间偏移夹具失败与前批默认RPC历史保留，无原生新增验收。

延续用户仅接管Maple Form.vue滚动段的授权。原5c3bf495…与真实共享scrollTo组合，6项有效基线4失败／2对照（3.05s）：新等待替换、停用、跨激活与卸载后旧帧仍写入。正常300ms线性／重复帧拒绝原本通过，不算新缺陷。仅Form内部私有插值接管原scroller窗口的RAF及取消器，逐帧一次消费、原请求／生命周期资格、读媒体／初始位置与写入后复核；取消物理释放原帧且逻辑拒绝晚交付，保留已发生偏移，不回滚或污染新请求。共享utils/elements.ts与HEAD同hash cdb1c340…，API未改，其他消费者不外推认证；并行submitEpoch保持。

原6插值项首修全通过；再补5项初始／动态reduce、原生写入卸载、激活新请求及位置读取卸载。前批10等待探针改为观察真实RAF／窗口写入，保留原职责；中间15/16及86/87仅偏移对照NaN，未明确初始窗口坐标的夹具补零并finally恢复后21专项通过（5.67s），不计产品缺陷。最终受影响Form／共享／类型及lint见逐组证据。Vue技能用于原窗口资源、KeepAlive、重入与descriptor恢复。保留原等待300ms＋插值300ms线性、初始reduce不排帧／动态reduce下一帧到位；固定等待与FormDetails0.2s／reduce关系、异步校验资格及字段成员仍未认证，本族不提前归档。

分类31/33族93.9%，剩Form／Picker2族6.1%；74登记源码、165/181提示91.2%，16待审8.8%（Form7／Picker9）。分母178→181只因本次私有实现新增3条提示，非新增3个旧缺陷、也非已分类倒退。只手动更新Maple Form为89／92／103／120／146及本端81→84、local query=true；26其他漂移不刷新，不称全局motion-themes通过。JSDOM真实组件／原helper基线及受控RAF／媒体／几何不是原生布局／OS／adopt验收，真实新增0。目录5差异块、Map SDK、144原生环境组、Button白字2.305:1非AA例外、CedarForm／MaplePicker并行边界与前批默认RPC失败历史保持。证据：design-ui/audits/evidence/form-scroll-animation-lifecycle-2026-10-16/results.json。

### Maple Form等待任务获授权修复（2026-10-16）

最终验证：单worker受影响Form76项16文件通过（含本批10专项），类型通过、只读根lint未报错。原默认模式60项通过但2文件RPC加载失败／1未处理错误、exit1保留；一次有界补验通过不证明原失败仅由负载造成。无原生新增验收。

用户明确允许仅接管Maple Form.vue滚动任务段；保留原submitEpoch及所有并行提交改造，CedarForm／MaplePicker未接管。有效原6项基线3失败／3对照；补几何读取卸载后原源码7项4失败／3对照（4.60s），不记四个独立缺陷。授权后等待任务加入代次、一次消费、mounted／active／disposed资格；停用／卸载取消，激活只接受新请求，几何读取后复核，不退休重入创建的新请求。

首修7项通过（14.99s），补inactive／fresh activation、几何重入替换与offset／linear正对照后10项专项通过；受影响Form整套、类型和lint最终结果见逐组证据。Vue技能用于原timer／KeepAlive／finally descriptor清理。仅控制委托前的等待，不宣称下游已启动RAF可取消；共享scrollTo仍只返回Promise，无取消器。本次保留原300ms等待／global timer、默认线性helper、API及Token。FormDetails样式当前0.2s，固定300ms等待的完成策略／reduce与共享插值接线仍待单独取证，不偷改为business-delay或宣称全motion通过。

分类仍31/33族93.9%，剩Form／Picker2族6.1%；74登记文件、165/178提示92.7%，13待审7.3%，分母不变。Maple Form两条未提前登记，仅手动刷新已改库存42／52→70／84，26其他漂移保持；JSDOM受控timer／几何、mock下游不是原生插值／OS／跨document验收，真实新增0。待审仍包括共享helper取消、验证完成后的滚动资格、字段成员和当前配置等，不能用本批10项冒充Form整族收口。证据：design-ui/audits/evidence/form-scroll-wait-task-2026-10-16/results.json。

### Form滚动任务只读基线／待授权修复（2026-10-16，16:39上海起）

未接管两端Form或MaplePicker并行源码。Maple Form仍为94c525ac…快照，仅新增独立scroll-task-ownership探针：6项基线3通过／3失败（exit1，6.98s）。正常300ms调度、普通卸载取消及未知字段通过；手工交付已取消旧回调／重复当前回调／跨KeepAlive激活旧回调仍调用scroll助手。属于受控队列归属缺口，不计三个独立缺陷，不宣称原生timer实际重复或已修复。原300ms是否为视觉完成等待及滚动helper取消接线仍需进一步审查，不提前分类。

Vue技能用于原timer清理／KeepAlive核对和finally恢复全局descriptor；实际Form＋注册字段，mock下游scrollTo仅观察派发，非真实插值／布局／原生／OS验收。源码未改、未归档新文件／提示；仍31/33族93.9%，剩Form／Picker2族6.1%，165/178提示92.7%，13待审7.3%（Form4／Picker9），分母不变。基线测试故意保留失败，不能称整套Form通过。新增夹具import顺序lint已修正，最终只读lint结果见证据。

需要用户／负责人明确允许仅接管Maple Form.vue滚动任务段，保留现有submitEpoch等并行提交改造；未把“继续”扩大为覆盖并行源码。CedarForm／MaplePicker仍各自保留；26漂移、目录5差异块、Map SDK、144环境组及Button白字2.305:1非AA例外不变。证据：design-ui/audits/evidence/form-scroll-ownership-baseline-2026-10-16/results.json。

### Maple 年面板原生对齐／Date候选分类收口（2026-10-16）

YearPickerPanel源码保持9a51ffd…不变：挂载及后续激活同步查询当前选中Button，优先primary、其次outline，无标记不滚动。实际onSmartMounted源码与解析构建一致，首次KeepAlive激活不重复；nextTick只更新挂载标记，没有延迟滚动、私有RAF／timer／监听需取消。7项实际YearPanel／Button＋KeepAlive受控对照通过（含空列表、立即卸载、停用后当前节点重激活），未复现产品缺陷，不制造修复；Vue技能用于核对资源归属及夹具descriptor恢复。

**31/33族分类收口93.9%，剩Form／Picker两族6.1%；74文件、165/178提示92.7%，13待审7.3%，分母不变。** Form4／Picker9；Date／Time候选归档不等于并行展示层稳定或整组件验收。仅登记原有年面板236行native-scroll，无库存行变化／API／Token／默认值修改，保留block:center及浏览器滚动策略。JSDOM方法探针不是原生布局／smooth／reduce／OS／adopt验收，真实新增0。受影响回归与门禁实际结果见design-ui/audits/evidence/date-year-native-scroll-2026-10-16/results.json。

Form两端及MaplePicker源码hash与上批相同，但仍有并行source／test修改且无明确交接，不能用mtime安静认定稳定；需具体文件可审／冻结边界或明确接管授权。保留26其他漂移、Cedar FilterForm／Form目录5差异块、Map正式SDK契约、144原生环境组及Button白字2.305:1非AA例外，不自动生成覆盖或重试无变化入口。Cedar上批175项断言通过但close-timeout告警仍保留，本批不机械复跑。

### Cedar Date 范围预览与表头续体（2026-10-16，阶段二）

原clean的DateRangePicker与私有range-header helper独立审查，stub并行范围面板。有效13项旧基线10失败／3对照，正常100ms不提交模型、普通卸载及宽限内表头结算原本通过；首修候选另复现新单元格选择未使旧清理失效，单列而不加入原基线。当前21范围专项通过，其余分层验证见逐组证据。

100ms仍是interaction-delay，不是CSS完成时长或应被reduce跳过的动画。timer代次和preview代次分开，离开不取消仍有效的预览表头；所有preview写入退休旧timer／表头归属，失效配置／模型、停用卸载取消，新激活只接受新hover。preview／input setter后复核；私有resetHeaderValue可接原归属检查，nextTick一次消费，取消不删除Vue队列。默认其他调用方／所有select-confirm-input协议不据此认证。保留100ms／global timer、公开API／CSS Token；Vue技能用于原资源／停用卸载和测试descriptor恢复。

分类仍30/33族90.9%，剩Date／Form／Picker三族9.1%；73文件、164/178提示92.1%，14待审7.9%，分母不变。仅范围Picker库存605→639；helper无扫描hint，独立记hash，不虚增登记。Date仅剩Maple年面板1提示，不等于并行日期整族稳定。JSDOM／KeepAlive、stub面板、受控timer／nextTick非原生hover／OS／adopt，真实新增0。保留26其他漂移、Cedar FilterForm/Form目录5差异块、Map正式SDK／144环境组和Button白字2.305:1非AA例外，不机械复跑无变化入口／生成覆盖。证据：design-ui/audits/evidence/date-range-shortcut-preview-2026-10-16/results.json。

### Cedar Date 单值快捷预览任务（2026-10-16，阶段一）

原clean的单值Picker只审100ms离开悬停预览宽限，归interaction-delay，不是CSS完成时长，reduce不应跳过业务宽限。有效11项旧基线9失败／2对照；正常100ms清理且不提交模型、普通卸载取消原本通过。代次＋一次消费拒绝取消／已消费旧回调；可见性、禁用、只读、previewShortcut和模型变更同步失效，停用／卸载取消并清预览，激活只接受新hover。保留hover命令检查当前资格，预览写入重入后不清新输入草稿；正值100ms、global timer归属、API／CSS Token保持。

16专项及Cedar配置类型／受影响lint通过，其他日期回归单列逐组证据。使用实际Picker／KeepAlive＋stub PickerPanel和受控100ms队列，Vue技能用于原资源／停用卸载／descriptor恢复；不接管并行展示面板，不认证原生hover／OS、范围预览或所有select／confirm／input保留命令。真实浏览器／OS新增0。

分类仍30/33族90.9%，剩Date／Form／Picker三族9.1%；72文件、163/178提示91.6%，15待审8.4%，分母不变。仅单值Picker库存427→453，Date仍余范围预览与Maple年面板2提示；26其他漂移、Cedar FilterForm/Form目录5差异块、Map正式SDK及144环境组保持，不自动刷新／覆盖。Button白字2.305:1保留非AA例外。证据：design-ui/audits/evidence/date-shortcut-preview-2026-10-16/results.json。

### Cedar TimeColumn 消费者与候选分类收口（2026-10-16）

TimeColumn起点clean；有效11项旧基线9失败／2对照，正常100ms线性选择和Vue卸载后拒绝通知原本通过。组件现拥有私有滚动取消器：隐藏、停用、卸载及当前value／visible／list变化同步失效；visibility的渲染等待一次消费，几何读取后复核原root／value／元素，旧续体不能覆盖新请求。保留点击核对当前可见／可用及原item仍在列表且未禁用；注销核对原item，不删同值替换。激活只对齐当前值，不重放旧插值；Vue技能用于停用／卸载和引用／测试descriptor清理。正值100ms线性、公开API／CSS Token保持，必要渲染结算不是CSS完成时长。

最终16组件＋14工具专项，受影响Cedar Time149项30文件通过（含并行2项step示例，不算本批新写）；配置类型和受影响lint通过。当前**30/33族90.9%，剩Date／Form／Picker三族9.1%；71文件、162/178提示91.0%，剩16条9.0%，分母不变**。Time运行时候选归档不是并行Time面板／Maple滚轮稳定或整族所有行为认证；JSDOM受控nextTick／RAF／KeepAlive／几何不是原生输入、OS或adopt证据，新增真实验收0。任意同item引用回调乱序仍未认证。

只更新TimeColumn已审库存76→89；26其他漂移、上批Cedar FilterForm/Form生成目录5差异块、正式Map SDK和144原生环境组保持，不机械复跑无变化入口、不自动覆盖并行源码或生成页。Button白字2.305:1仍为非AA设计例外。证据：design-ui/audits/evidence/time-column-lifecycle-2026-10-16/results.json。

### Cedar Time 私有滚动任务／并行边界（2026-10-16）

未接管并行 Date／Form／Time 面板／Maple Picker；只修复原工作树 clean 的 Cedar `time/picker/utils/index.ts`。零／负／非有限时长及初始 reduce 直接到位且不排帧；正时长保留调用方100ms线性策略，动态 owner reduce 下一帧到位。WeakMap请求、逐帧一次消费与私有取消器隔离替换／旧回调／重入，不引入CSS Token或公开API。取消保持当前偏移，不替用户完成选择。

有效旧实现基线10项9失败／1正常100ms对照；修复后14专项（补取消／getter与setter重入）和Cedar Time共131项28文件通过，配置类型及受影响lint通过。Vue技能用于私有资源与测试descriptor恢复；此批尚未把取消器接入TimeColumn的停用／卸载，watch／nextTick与保留命令继续待审，不能把工具通过说成整族生命周期通过。JSDOM iframe／受控RAF／媒体模拟不是原生浏览器或OS证据，新增真实验收0。

当前29/33族87.9%，剩Date／Form／Time／Picker四族12.1%；70文件、161/178提示90.4%，17未分类9.6%，分母不变。仅本工具2提示登记，Time尚余1。26处库存漂移、Map正式SDK及144环境组保持；Button白字2.305:1仍为非AA设计例外。最新生成目录检查定位Cedar FilterForm声明与Form消费路径漂移（5个差异块）；Maple两页匹配，不自动覆盖并行样式／目录，不称全局motion-themes通过。证据：design-ui/audits/evidence/time-scroll-task-2026-10-16/results.json。

### 分类快照重验与并行实现边界（2026-10-16）

两端Ripple／VirtualList四源码逐份重读，测试前后hash相同；Cedar83项11文件／Maple74项9文件通过后手动更新职责登记，不接管或修复并行实现。800ms触摸兼容去重是Date.now门槛，不新增timer／CSS duration；Ripple仍task-dispatch，VirtualList实测行高／自身scroll校正仍nextTick state-settlement。各15生命周期＋2测量、各3鼠标与Cedar7 Tree组合为受控证据，不认证任意破坏性几何重入、可信输入／adopt／OS。

分类仍29/33族87.9%，剩4族12.1%；69文件、159/178提示89.3%，剩19条10.7%，分母不变。只更新四份已审行／hash；26处其他漂移、Date／Form／Time／Picker、Map SDK及144环境组保持，不称全局motion-themes通过；真实浏览器／OS新增0。证据：design-ui/audits/evidence/classification-revalidation-2026-10-16/results.json。

### 测试时钟清理不等于产品计时修复（2026-10-16）

最终Cedar整套复验：串行与默认线程各401项／63文件通过且exit0，不累加为802用例；旧超时／串行异常保留为历史，不再列当前复验失败，不推断旧超时全由此夹具或纯负载造成。

Cedar已安装Vitest0.22.1的timer spy／假时钟卸载组合可删除全局setTimeout，隔离回归先失败。其四组Scheduler计时夹具现捕获fake clock前的原始timer描述符，在卸载／mock清理后以finally恢复；不改产品时钟、交互节奏、CSS Token或Maple运行时。新增3项恢复专项及受影响63项通过，包含拖动之后执行的workbench。旧整套失败以实际复验分别判断，四处并行hash／26漂移、SDK及144环境阻塞不据此解除。分类仍29/33族87.9%，剩4族12.1%；159/178提示89.3%，剩19条10.7%，分母不变。真实浏览器／OS新增0。证据：design-ui/audits/evidence/scheduler-timer-fixture-2026-10-16/results.json。

2026-10-16证据补充：两端Ripple／VirtualList四处并行hash包含鼠标去重／实测行高校正等行为变化，不能自动刷新为已验。Scheduler有界串行23项通过，但实际workbench先于event-drag，不排除清理顺序污染，旧整套失败保留。分类仍29/33族、159/178提示；无新API／Token或原生验收。证据：design-ui/audits/evidence/classification-drift-review-2026-10-16/results.json。

### Cedar Scheduler：TimeGrid范围会话与分类收口（2026-10-16）

350ms触摸武装归interaction-delay，0ms范围点击解锁归state-settlement，不是CSS duration。会话live／代次、原root／columns及步长／snap／小时／资格复核隔离旧move／up／cancel／hold／unlock；取消只释放原绑定，不清新请求。pointercancel匹配pointerId；hit-test和几何读取后检查，配置同步失效。停用／卸载取消，激活只接受新手势。保留350ms／8px／5px／snap／结束小时和global document/window，API／Token不变。

本次登记TimeGrid两条后，候选分类29/33族87.9%，剩4族12.1%（Date／Form／Time／Picker）；69文件、159/178提示89.3%，19未分类10.7%，分母不变。Scheduler运行时候选分类收口不等于整组件／完整测试／原生验收；all-day／overlap／focus与非range保留命令独立待验。Vue技能用于原监听／timer、停用卸载和探针恢复；JSDOM不认证可信Pointer／原生click／跨document／OS。旧全套超时／串行异常、4hash／26漂移、SDK／144环境组保留。证据：design-ui/audits/evidence/scheduler-time-grid-range-2026-10-16/results.json。

### Cedar Scheduler：Event入口归属与职责登记（2026-10-16，阶段三）

原生drag协议的开始／结束属于当前内部请求：停用不写dataTransfer、不发start；结束先消费归属，再通知；配置／停用／卸载取消并使旧end回调失效，传输回调返回后复核资格。resize入口与可见性共用当前resizable／非milestone条件；移除的保留句柄不能重新启动。实际Button已经拒绝inactive普通click，本批不重复添加父级修复。无新API／Token／默认策略变化。

Event四提示归interaction-delay2（350ms）与state-settlement2（0ms）。三阶段受控源码证据后登记该文件，Scheduler仍待TimeGrid两条；28/33族84.8%，剩5族15.2%；68文件、157/178提示88.2%，21未分类11.8%，分母不变。登记不是干净完整测试或原生验收：旧整套超时／串行timer、四旧hash与环境／SDK阻塞仍保留。合成drag/dataTransfer不是可信系统拖放、Pointer／OS／跨文档证明；Vue技能用于失效与清理。证据：design-ui/audits/evidence/scheduler-event-native-2026-10-16/results.json。

### Cedar Scheduler：独立拖动会话隔离（2026-10-16，Event阶段二）

独立卡片拖动按请求代次、原event／root、活动资格和本地live位隔离。旧move／up／cancel／hold／0ms解锁不能跨取消、事件替换或重新激活；pointercancel只消费对应pointerId。清理先解除原处理器并摘除自己的闭包，再结算dragging／ghost和通知，回调重入的新手势不被旧外层清理覆盖。几何／样式及通知、响应式写入后复核；350ms／8px触摸、5px启动、拖影宽度160–240px和位置策略不变，无新Token／API。

父级prop异步传递与当前对象同步改变应分开建探针；父级disabled ref尚未渲染到子组件不算同步取消失败。Vue技能用于停用／卸载、原监听／计时器和夹具清理；JSDOM合成事件／几何／模拟时钟不认证原生Pointer、native drag或跨document。原global窗口归属保持，native drag／保留click仍待下一阶段，不提前归档Event整文件。登记保持28/33族84.8%，剩5族15.2%；67文件、153/178提示86.0%，25未分类14.0%，分母不变；既有4hash／26漂移／SDK／144环境阻塞保留。证据：design-ui/audits/evidence/scheduler-event-drag-2026-10-16/results.json。

### Cedar Scheduler：受管指针长按与点击结算（2026-10-16，Event阶段一）

受管卡片350ms触摸等待是interaction-delay，0ms释放点击抑制是state-settlement，不是CSS动效时长。等待取消同时撤销旧回调资格，回调及父级finished各消费一次；新按下、配置／事件替换、停用／卸载使旧finished／解锁失效。Escape／blur释放待长按监听，激活只接受新手势。mounted／active和代次保护不等于原生手势验收；保留global document/window、350ms／8px策略及公开协议，不新增Token／Maple组件。

本批仅受管分支专项；独立拖动、原生drag与跨文档仍需独立审查，不提前登记整个Event文件或Scheduler族。进度保持28/33族84.8%，剩5族15.2%；67文件、153/178提示86.0%，25未分类14.0%，分母不变。4个旧hash、26处库存漂移、地图SDK与144环境组继续保留。Vue技能指导停用／卸载及夹具恢复；JSDOM／模拟时钟不替代原生浏览器或OS。证据：design-ui/audits/evidence/scheduler-event-managed-2026-10-16/results.json。

### Cedar Scheduler：时间线指针帧归属（2026-10-16）

边缘自动滚动是会话拥有的visual-scroll，不是CSS duration。保留40px边缘／12px每帧与5px启动策略；统一RAF先消费帧身份，拒绝旧／重复帧写入、分叉或取消替换手势。停用／卸载释放帧与监听，旧move／blur／nextTick失效，激活只接受新手势。几何与start／drop／finished及拖影写入后复核；先摘旧清理闭包再通知，保护回调重入的新会话。

Vue技能用于生命周期／探针清理；JSDOM受控RAF／几何不是原生手势／OS。本批保留原global document/window/RAF归属，跨document与原生减少动效策略独立待验。无API／Token／默认值变化，不造Maple组件。登记28/33族84.8%，剩5族15.2%；67文件、153/178提示86.0%，25未分类14.0%，Scheduler剩6条。两RAF入口合一令分母179→178，不是额外缺陷或验收；4个旧hash、26处漂移、SDK与144环境阻塞保留。证据：design-ui/audits/evidence/scheduler-pointer-lifecycle-2026-10-16/results.json。

### Cedar Scheduler：虚拟行双阶段恢复（2026-10-16）

两次nextTick用于尺寸缓存／锚点／偏移结算，归state-settlement，不是CSS duration或原生smooth。按请求、数据／布局／options和当前list／viewport身份隔离旧续体；停用／卸载逻辑取消，dirty激活按当前数据重建，scroll绑定代次／来源校验保护heading。原API／Token／key回退和几何保持；Maple无对应运行时，不造组件。

带前缀受控列表仅证明父级消费者，不认证并行VirtualList；首阶段同步渲染中强制卸载的Vue内部错误探针不当产品缺陷，第二阶段探针才计有效基线。inactive props由父级延迟到激活，直接缓存子组件收取inactive props仍独立待验。登记28/33族84.8%，剩5族15.2%；66文件，152/179提示84.9%，27未分类15.1%，分母不变，Scheduler剩8条。4个旧hash／原生环境／地图SDK及其他并行阻塞保留，不称全局门禁通过。证据：design-ui/audits/evidence/scheduler-timeline-restore-2026-10-16/results.json。

### Cedar Scheduler：依赖连线测量调度（2026-10-16）

连线RAF是measurement-scheduling而非CSS duration，不因reduce跳过必要几何。按原host窗口申请／取消，按原绑定清scroll／ResizeObserver；binding／frame／render代次隔离旧监听、已消费帧和nextTick，几何读取后复核。换host／数据、停用／卸载失效旧任务，缺host清空路径，激活重新测量；公开API／Token／默认坐标不变。Maple无对应运行时，不造组件，其他并行工作保留。

登记28/33族84.8%，剩5族15.2%；65文件，151/179提示84.4%，28未分类15.6%，分母不变，Scheduler剩9条。4个既有Ripple／VirtualList hash失效仍待重验，不宣称全局门禁通过。JSDOM iframe／几何／KeepAlive不是原生浏览器／OS或同节点跨document证明。证据：design-ui/audits/evidence/scheduler-dependency-lifecycle-2026-10-16/results.json。

### Cedar Scheduler：业务时钟与文件级并行边界（2026-10-16）

收尾门禁：两端Ripple及两份VirtualList共4个已登记文件因并行修改hash失效，需要重验、不自动刷新。下列28/33及150/179是登记进度，不是当前全局门禁通过率；4文件不与剩5族混加，Scheduler新行独立校验通过。

Cedar useSchedulerNow的30000ms刷新是business-clock，不是CSS duration，不因视觉reduce改变墙钟。停用／卸载取消原interval和原document的visibility监听；计时代次及监听身份拒绝旧交付，激活刷新当前时间、不补播遗漏tick。合法interval仍可周期交付，不能套用timeout的一次消费规则。Vue清理规范同时约束重入和夹具资源恢复，无新增公开API／Token／默认节奏变化。

并行保护按实际文件／依赖边界，资源core有修改不代表整个Scheduler不可审；本批只修独立use-now，核心并行修改及Date／Form／Time／Picker保持。Maple无Scheduler运行时，不造组件。族分类仍28/33（84.8%），剩5族15.2%；64文件，150/179提示83.8%，29待审16.2%，分母不变，Scheduler剩10提示。模拟时钟不是原生浏览器／OS验收，144环境组、SDK与库存漂移阻塞仍保留。证据：design-ui/audits/evidence/scheduler-now-lifecycle-2026-10-16/results.json。

### Cedar Map：SDK 抑制窗口与分类边界（2026-10-15）

Cedar Map的300ms中心更新／500ms地点选择窗口释放isUpdating、抑制程序化moveend反向解析，归interaction-delay，不是CSS完成信号或新的duration Token，不随视觉减少动效缩短。map-core运行时导入因迁移被注释，declare类型不提供SDK；缺任一依赖时initMap先返回，不注册model watcher／moveend或两个timer。

本批只验证缺SDK降级，未修改产品源码、恢复／替换SDK或调用地图服务。实际SDK下的计时取消、停用／卸载、旧回调／异步结果、SDK监听及MapSelect异步回填／定位仍待独立验收，不以虚构off／destroy契约替代。Maple无对应运行时，不为对齐造组件。

新增1文件／2提示：28/33族职责分类84.8%，剩5族15.2%；63文件，149/179提示83.2%，30待审16.8%，分母不变；这不是生命周期／真实浏览器完成率。保留Date／Form／Scheduler／Time／Picker并行区域、26处漂移、144环境阻塞与Button白字例外。证据：design-ui/audits/evidence/map-sdk-boundary-2026-10-15/results.json。

### Cedar Tree：滚动命令转发分类（2026-10-15）

Tree.scrollIntoView(options)只向当前VirtualList转发原options；701行为函数声明，702行为delegated-scroll，不是两次原生滚动、RAF或CSS完成等待。Tree没有因此新增本地时钟／duration Token。保持已有公开方法、key/index/align语义及非虚拟模式无操作；停用／卸载和旧校正队列由实际下游已有availability／request守卫处理，不为分类制造父级重复调度器。

本批没有产品修复：Tree及VirtualList源码hash保持。真实Tree＋真实VirtualList、stub TreeNode、fixedSize30／模拟90px viewport验证7项：index/top600、key/bottom390、替换命令90、inactive保持37、激活新命令120、卸载后旧校正与保留命令保持37、非虚拟无操作。Tree原契约1＋TreeSelect既有1一并过滤运行，总9项通过；不把TreeSelect一项当其生命周期认证。Vue技能用于核对既有停用／卸载清理和夹具卸载。

新增1候选文件／2提示（declaration-only16、delegated-scroll5）：27/33族81.8%，剩6族18.2%；62分类文件，147/179提示82.1%，32待审17.9%，分母／库存不变。JSDOM属性滚动与模拟视口不是原生布局／smooth／CSS减少动效／OS，浏览器新增0；Tree其他保留方法、loadMore异步及任意行高仍独立待验。Maple无对应Tree运行时，只同步指南，不造组件。其他并行／26处漂移、144环境阻塞和Button白字例外保持。证据：design-ui/audits/evidence/tree-scroll-consumer-2026-10-15/results.json。


### Maple PullRefresh：手势、监听与滚动锁（2026-10-15，阶段二）

touchcancel是取消，不走刷新释放路径；新手势、target／根节点切换、禁用、停用／卸载终止当前手势，释放原锁和旧监听。touching／手势代次及原root／control／scroller身份在几何／滚动读取后复核；geometry getter中卸载不继续读旧事件目标。每次绑定保存原节点和独立代次，旧move／end不能跨激活；根ref同步绑定，不让初始post任务取消用户第一段同步手势。保留既有下拉比例、阈值和第一阶段计时／受控ack规则。

滚动锁是私有资源租约，不是CSS Token或公开API。按原HTMLElement和类名计数，同实例重复加锁不重复持有；释放幂等，最后一个租约才移除库新增class，预先存在的外部class保持。Window目标使用其document.body，不再误用全局body。这里只协调同一Maple模块的PullRefresh持有者，外部代码在租约中途改同名class、重复运行时副本、默认iframe scroller发现／adopt仍独立待验，不把它变成全库锁协调器。

有效10项基线6失败／4对照；修复中post-watch曾使两个原有立即操作用例回归，改同步根绑定后未修改原断言即恢复。最终15手势专项＋17计时专项，完整37项通过。Vue技能用于停用／卸载、原监听全组释放与锁租约／夹具清理。实际组件／KeepAlive、stub图标、模拟touch／几何及timer为JSDOM，非可信输入／真实CSS或OS；浏览器新增0。初始modelValue=true显示、动态时长／真实reduce、共享useTouch RAF及跨文档默认查找仍独立待验。

新增1文件／1条task-dispatch（4），26/33族78.8%，剩7族21.2%；61分类文件，145/179提示81.0%，34待审19.0%，分母未变。无扫描命中的私有scroll-lock helper单列hash，不虚增分类文件。仅更新本源码库存81→96及hash，193文件／392CSS／179runtime保持；其他26处漂移与并行改造、144环境阻塞和Button白字例外保留，不称全局motion-themes通过。证据：design-ui/audits/evidence/pull-refresh-gesture-lifecycle-2026-10-15/results.json。


### Maple PullRefresh：计时与刷新续体（2026-10-15，阶段一）

成功展示success-duration默认2000ms是业务期限；animation-duration默认300ms同时驱动内联回弹与复位等待；ICON_TRANSITION=150ms同时传给图标过渡并用于名称等待。三者不是同一system duration，不新增CSS Token、不把成功展示缩为视觉减少动效。统一timer入口只归task-dispatch，具体时序仍由调用方拥有。

待执行集合和原generation约束一次消费；新modelValue／手势、disabled、停用／卸载取消当前timer和图标Promise等待，取消会resolve(false)，不留下永久挂起。图标等待返回与nextTick刷新通知都核对当前请求／活动状态；nextTick只逻辑失效。当前本地update:modelValue=true的受控回填不是新请求，仍恰好发一次refresh；外部新loading取消旧成功／复位，激活按当前modelValue结算，不重放成功时钟。无公开签名／默认值变化。

有效10项基线8失败／2对照，追加取消Promise结算、受控回填、回调卸载、inactive命令、disabled完成、0时长与闲置实例保留外部锁后，17专项／完整22项通过。收尾探针在本批中间实现复现清理误移外部锁，修正为只移除本实例新增的原节点锁；该失败不并入原始基线，多实例引用计数仍待阶段二。Vue技能用于停用／卸载、timer／Promise清理及夹具恢复。实际组件／KeepAlive、stub图标、模拟touch／几何与timer为JSDOM，不认证原生输入、CSS覆盖／真实减少动效、共享useTouch RAF或OS；浏览器新增0。完整手势／touchcancel、滚动锁和旧监听／测量留阶段二，不提前归档PullRefresh。

分类仍25/33族75.8%，剩8族24.2%；60分类文件／144提示不变。四处timer合为一处，库存runtime182→179（Maple84→81），当前144/179提示80.4%，35待审19.6%；分母减3不是额外三项验收或缺陷删除。仅刷新本文件四行→81，193文件／392CSS不变，其余26处漂移及并行／144环境阻塞／Button白字例外保留，不称全局motion-themes通过。证据：design-ui/audits/evidence/pull-refresh-timer-lifecycle-2026-10-15/results.json。


### Maple SwipeCell：拖动会话与点击解锁（2026-10-15，阶段二）

拖动结束的0ms解锁是state-settlement事件顺序，不是CSS动效时长，不能跟随reduced-motion删除点击抑制。unlock独立代次且消费一次，新手势／disabled／停用／卸载物理取消计时；旧回调不能解锁新拖动或清新句柄。手势代次在回调和几何读取后复核；touchcancel及停用恢复手势前偏移、不触发打开，激活只接受新触摸。拖动标记为响应式，夹到同一偏移后释放也恢复既有CSS过渡。

每次绑定保存原root／document和独立回调，停用／卸载／节点变化解绑全组touch监听，旧move／outside跨激活无效。click通知若重入open或卸载，旧后续关闭不再执行；open通知发起新拖动时不排旧解锁。保持30%阈值、公开API、CSS变量／视觉默认值及阶段一业务确认规则；Cedar无对应运行时，不造组件。

有效14项基线12失败／2对照，最终21拖动专项＋18关闭专项、完整48项通过。补充监听探针初轮误取VTU通用eventListener，已排除包装并验证实际move／outside注册与移除；timer类型初轮编译错误已改明确DOM number，未放宽配置。Vue技能用于停用／卸载取消与测试清理。实际组件／KeepAlive、模拟touch和受控timer不等于可信触摸／原生click顺序／OS；真实浏览器新增0。共享useTouch RAF、完整测量续体、同节点跨文档adopt和事件触发的hook拒绝策略仍独立待验。

分类新增1文件／1条state-settlement：25/33族75.8%，剩8族24.2%；60文件，144/182提示79.1%，38待审20.9%，分母不变。仅更新已审SwipeCell库存248→351及hash，不刷新其他26处漂移，不称全局motion-themes通过。保留Form／日期／关联Time、Picker／Scheduler／并行样式、144环境阻塞与Button白字例外。证据：design-ui/audits/evidence/swipe-cell-drag-lifecycle-2026-10-15/results.json。


### Maple SwipeCell：关闭确认请求（2026-10-15，阶段一）

beforeClose 是业务确认 Promise，不是 CSS 动效完成或可参数化时长。每个 close 保存原命令代次；新 open（含同侧重开）、新 close、新手势、name／beforeClose／disabled 变化、停用和卸载使旧确认失效。停用／卸载后保留的 open／close 不改状态、不调用业务钩子，激活只允许新请求。禁用触发的当前关闭仍尊重 beforeClose 的 false；显式 close 的 Promise 拒绝仍向调用方传递，不新增 API／Token或改变滑动阈值／默认视觉时长。

有效12项基线10失败／2正常对照；首次夹具取错 exposed 入口的12错误不算产品失败。最终18专项／完整27项通过；Vue清理规范用于停用／卸载失效，实际组件／KeepAlive与受控Promise为JSDOM证据，不是原生手势／OS，真实浏览器新增0。0ms点击解锁、旧监听交付和完整拖动资源留待阶段二，不提前归档整族。

分类保持24/33族72.7%，剩9族27.3%；59文件，143/182提示78.6%，39待审21.4%，分母不变。只更新SwipeCell库存205→248，其他26处并行漂移、Form／日期／关联Time／Picker／Scheduler、144环境阻塞和Button白字例外保留。证据：design-ui/audits/evidence/swipe-cell-close-lifecycle-2026-10-15/results.json。

### Maple LoadingBar：任务与渲染续体归属（2026-10-15）

LoadingBar统一timer归task-dispatch：200ms显示／进度节奏、公开finishDelay、error的300ms策略，以及按computed width／opacity完成等待的300／250ms清理下限，各自保留语义，不全转为CSS duration。公开动效Token、默认值及原timer窗口归属不变；Cedar无LoadingBar运行时，不新增对应变量或组件。

每个timer在原generation且仍为待执行成员时消费一次；旧任务不能删除新句柄，重复progress不再多推进／分叉。两段渲染等待均为state-settlement，按原generation及消费位逻辑失效，不声称删除Vue队列。计算样式读取可能重入start／error，后续schedule必须显式携带旧generation，不能用读取结束时的新代次给旧hide／cleanup授权。

有效7项基线5失败／2对照；原正常完成和重启拒绝旧show回调本已通过。补旧progress／两渲染续体重启对照后10专项、完整22项通过。Vue清理规范用于取消／复用及测试时钟／mock／服务节点清理。证据为实际服务DOM＋受控nextTick／fake timers，非原生时序／OS；新真实浏览器／OS0，旧IAB6组不重复计，清理hook中重入start及任意中途样式变化另待验。

分类新增1文件／1条task-dispatch，23/33族69.7%，剩10族30.3%；58文件，139/182提示76.4%，43待审23.6%，分母不变。只更新本源码库存77→79，其他26处漂移、Form／日期／关联Time／Picker及并行样式、144环境阻塞和Button白字例外保持。证据：design-ui/audits/evidence/loading-bar-scheduler-delivery-2026-10-15/results.json。

### Ripple：统一任务派发与取消后交付（2026-10-15）

新增内部审计分类task-dispatch：统一setTimeout入口只负责任务归属／一次性消费，调用方才决定业务含义；不能把同一helper里的所有delay当成CSS duration。Ripple的30ms创建等待、20ms激活结算、最小250ms展示及删除策略、computed transform／opacity完成等待分别保留，不新增CSS Token／公共API或改变默认节奏。

schedule先核对原指令状态，再从待执行集合原子删除任务；已取消／消费回调不执行，也不能清新请求的tasker。禁用清空集合，即使同一state重新启用，旧创建／淡出仍无资格。几何／样式读取后重检当前实例与wave身份；波纹在读取其样式前登记，使读取中卸载也能移除刚插入的节点，激活读取中卸载不补写opacity。普通卸载拒绝旧创建原本通过，不重复记缺陷。

两端各8项有效基线6失败／2对照，最终各11专项（追加淡出取消／重复和激活读取卸载）、完整Ripple Cedar28／Maple33通过；类型、受影响lint／Maple根lint、两端独立源码与基础Less配对检查同步验证。首次新增Maple测试的格式lint失败已格式化并复跑，不算产品失败。Vue技能指导取消／卸载、探针清理；这是受控timer交付、模拟performance与JSDOM，不是实际OS／触摸／KeepAlive停用或跨文档adopt；本批真实浏览器／OS新增0，旧IAB6组不重复计。

分类新增两文件／两条task-dispatch，22/33族66.7%，剩11族33.3%；57文件，138/182提示75.8%，44待审24.2%，分母与库存不变。LoadingBar待下一批，其他并行改造／26处库存漂移及144环境阻塞保持，不称全局motion-themes或全库原生验收通过。证据：design-ui/audits/evidence/ripple-scheduler-delivery-2026-10-15/results.json。

### 反馈展示计时的分类补录（2026-10-15）

Message两端与Cedar Notification的duration属于business-clock：有限正值决定展示期限，0常驻；它不消费CSS进出场时长，也不因减少视觉动效缩短业务展示。hover保留Message剩余时间，KeepAlive重新激活按完整当前期限重新开始；取消／停用／卸载与旧回调归属沿用已审代次／active／open或closed规则。服务清理和CSS完成另走真实Transition完成链，不重新引入固定离场timer。

当前三份计时源码hash与2026-10-13证据完全一致，本批无产品修复／API／Token变更。复跑Cedar Message＋Notification48项、Maple Message39项通过；补录3文件／3条business-clock职责，非新增三处缺陷或新的原生验收。历史Message IAB8组、Notification6组保持独立，不再累计；本批真实浏览器／OS新增0。跨文档adopt、Message服务nextTick更新身份等属于独立消费者边界，不被计时文件分类自动认证。Vue技能用于复核停用／卸载清理职责。

分类21/33族63.6%，剩12族36.4%；55文件，136/182提示74.7%，46待审25.3%，分母不变。Ripple／LoadingBar仍需补统一调度入口取消后旧回调及重复交付，不在本批提前归档；只是源级候选，尚未复现，不制造修复。Form／日期／关联Time、其他并行样式／Picker、26处库存漂移、144环境阻塞及Button白字例外保留。证据：design-ui/audits/evidence/feedback-clock-classification-2026-10-15/results.json。

### NavMenu：根级命令与注册收口（2026-10-15，阶段六）

停用／卸载后保留的showOption、setCollapsed、setActiveItem、select、expand、activateItem及根键盘入口不通知、不改状态或消费事件。内部停用关闭仍由原cleanup更新，不把公开入口守卫套到清理路径。激活允许新命令、不恢复旧工作；卸载清空元素／所属节点与独立Item注册表，拒绝新注册。

独立Item互斥关闭按快照与activation代次遍历，新注册不被旧轮次消费，重入新activation替代旧轮次；关闭回调卸载后停止剩余回调与selection／expand写入。selection在通知之间复核生命周期／焦点请求，新的selection替代旧select后续通知。元素注销核对原NavMenuNode身份，旧同key节点不能误删替换注册。无公开API／Token／视觉默认值变化，nextTick仍只是逻辑失效。

有效12项基线10失败／2对照；最初六项停用探针误在移出后findComponent，改为预存wrapper才取有效基线，不计产品失败。最终17专项、完整NavMenu103项7文件通过，既有前五阶段一并回归。Vue清理规范用于停用、卸载和注册释放。JSDOM真实根组件／KeepAlive、stub子节点／observer及受控续体不替代原生键盘／布局／跨文档／OS；本批真实浏览器／OS新增0。Maple无NavMenu运行时，仅同步说明。

新增menu的1条declaration-only分类（扫描命中scrollTo函数声明，底层optional native调用另有行为证据），只更新其库存147行／源码hash；NavMenu两候选文件现均归档。分类19/33族57.6%，剩14族42.4%；52文件、133/182提示73.1%，49待审26.9%，分母不变。其他26处并行漂移、Form／日期／关联Time、144环境阻塞和Button白字设计例外保持，不声称全局motion-themes或全库／浏览器完成。证据：design-ui/audits/evidence/nav-menu-root-commands-2026-10-15/results.json。

### NavMenu：根级外部焦点接管（2026-10-15，阶段五）

selection返回与响应式折叠归位在排队时保存原root、所属document和原焦点，执行前核对当前焦点归属；当前外部连接控件已接管时放弃，不抢回。原焦点仍持有或移除后落到body时保留正常归位，显式context.focus仍是主动命令。折叠查询目标后再次核对代次／可用性及焦点。nextTick为渲染结算，不新增CSS时长Token／API，不撤销已执行focus。

新增3项基线2失败／1正常折叠归位对照，最终根级16专项、完整NavMenu86项通过；实际NavMenu根组件与KeepAlive、stub NavNode／observer、受控nextTick和JSDOM焦点，不是原生布局／键盘或跨文档验收，真实浏览器／OS新增0。Vue清理规范沿用已有停用／卸载失效边界。Maple无NavMenu运行时，不制造对应组件。

分类仍18/33族54.5%，剩15族45.5%；51文件，132/182提示72.5%，50待审27.5%，分母不变。仅更新menu库存129→133，其他26处并行漂移不刷新。根级保留命令及注册身份仍待审，不提前归档NavMenu。Form／日期／关联Time、并行样式、144环境阻塞和Button白字例外保留。证据：design-ui/audits/evidence/nav-menu-root-focus-2026-10-15/results.json。

### NavMenu.Item：监听、测量与焦点任务（2026-10-15，阶段四）

Item 的窗口 resize／捕获 scroll 监听归原 reference.ownerDocument.defaultView 所有；每次绑定使用独立代次和回调，正常关闭／目标变化通过 post-watch 解绑，停用／卸载直接释放。受控 open 即使拒绝关闭，也不能保留后台监听；停用仍发既有关闭请求，但保留 close／select／setOpen 与键盘／点击入口无效。激活对仍打开的当前面板重新绑定，不恢复旧回调。共享 ResizeObserver 不改，消费者启用条件跟随可用状态。

同步几何测量按 operation／原reference／可用状态核对；rect及属性读取后复核，避免 getter 中卸载后写状态或新注册窗口监听。面板／返回焦点任务按 open/close 方向、代次及原reference消费一次；配置变化取消旧任务，当前文档外部连接控件已接管焦点时放弃归位。保持受控接受／拒绝语义、公开签名及布局公式，不引入 CSS duration Token，也不回滚已执行的focus。

有效9项基线7失败／2对照；正常测量与普通卸载解绑原本通过。中间关闭焦点对照因夹具每次渲染重建options触发真实配置取消，改稳定options后补正向／重复交付／外部焦点回归。最终13专项、完整NavMenu83项通过；这是受控nextTick、stub Trigger／ResizeObserver和JSDOM几何／实际owner EventTarget证据，非原生布局／键盘／跨文档adopt。真实浏览器／OS新增0。根级其他保留命令、注册身份与根级外部焦点仍待审。

仍18/33族收口54.5%、剩15族45.5%，51分类文件、132/182提示72.5%、50待审27.5%，分母不变。Item无扫描命中，仅记录hash，不提前归档NavMenu或刷新其他26处漂移。Form／日期／关联Time、并行样式、144环境阻塞及Button白字例外保留。Maple无对应NavMenu组件，不新造副本。证据：design-ui/audits/evidence/nav-menu-item-lifecycle-2026-10-15/results.json。

### NavMenu：节点 enter／Escape 焦点归属（2026-10-15，阶段三）

节点级 nextTick 是渲染后焦点结算，不是视觉完成时长。enter／Escape 请求各由当前节点的焦点代次拥有；新请求、关闭、禁用／节点／模式／折叠配置变化、KeepAlive停用和卸载使旧续体失效。enter在展开回调返回、等待渲染后及查询目标后复核，Escape核对原reference／Trigger并消费一次。激活只允许新命令；停用保留键盘／点击／浮层回调无效，不preventDefault来吞掉旧键盘事件。Trigger原有hover延迟不改，不新增duration Token／公共API。

执行前检查reference所属文档当前焦点；若已被其他连接中的外部控件接管，不再把焦点抢回。body或原焦点仍可按正常路径结算；不能撤销已执行focus，不认证跨文档adopt、原生键盘时序或所有瞬时焦点迁移。原8项基线5失败／3对照（正常enter、禁用和卸载原本通过）；另两项外部焦点候选在无归属检查的中间实现均失败，单列而不混成原始10项基线。最终12项专项。

仍须独立审查Item的测量／监听／焦点、根级其他保留命令／注册身份及根级外部焦点接管。Maple无NavMenu运行时，不制造副本。真实浏览器／OS新增0；本批是实际NavNode与KeepAlive、stub Trigger持久面板、受控nextTick与JSDOM焦点探针，不是完整浮层或浏览器验收。候选仍18/33族收口54.5%、剩15族45.5%，51分类文件、132/182提示72.5%、50待审27.5%；node无扫描命中，仅单列hash，不新增分类文件／提示或刷新库存。Form／日期／关联Time、26处并行漂移、144环境阻塞及Button白字例外保持。证据：design-ui/audits/evidence/nav-menu-node-focus-2026-10-15/results.json。

### NavMenu：根级焦点与测量续体（2026-10-15，阶段二）

根级响应式测量与焦点归位均是渲染结算，不是 CSS 动效完成，不新增 duration Token。afterRender 按配置／生命周期代次校验并消费一次；停用／卸载失效，激活重新排当前测量与 roving tabindex，不重放旧任务。测量保留 resize 公共签名，停用时不读取几何；每次同步测量拥有独立 operation 和原 root／measure 身份，在 clientWidth／子节点 rect 读取后复核，防止 getter 中卸载后继续访问或提交。共用 ResizeObserver 工具不改，不能据此认证所有消费者。

根级 context.focus 不操作停用／卸载节点；最新 selection 或显式 context.focus 替代旧 selection 返回焦点。布局变化后的焦点归位受同一代次保护，nextTick 只是逻辑失效，不能撤销已经执行的焦点。原8项有效基线6失败／2对照，新增探针最初用了错误 BEM 类名，修正后重新取基线，不算产品缺陷。最终13专项；节点级 enter／Escape、独立 Item 的测量／监听／焦点以及其他保留命令仍待审，未称 NavMenu 全部收口。真实浏览器／OS新增0；受控 nextTick、stub NavNode／ResizeObserver 和JSDOM几何只证明根级消费者，不能代替真实布局／焦点时序。

候选进度保持18/33族（54.5%），剩15（45.5%）；51分类文件、132/182提示（72.5%），50待审（27.5%），分母未变。仅刷新menu库存行104→129，未提前归档分类。Form／日期／关联Time、26处并行CSS／日期漂移、144环境阻塞和Button白字例外保持。证据：design-ui/audits/evidence/nav-menu-root-scheduling-2026-10-15/results.json。

### NavMenu：原生滚动续体（2026-10-15，阶段一）

`scrollTo(key)` 是渲染后原生定位，不是 CSS 动效完成计时，不新增 duration Token 或公共取消 API。新命令替代旧命令；禁用、options／fieldNames／mode／responsive／折叠配置变化、KeepAlive 停用和卸载使旧 nextTick 续体失效。激活不恢复旧请求，只接受新命令；`Promise<void>` 签名、showOption 的正常展开及 nearest 对齐保持。nextTick 只逻辑失效，不物理撤销已排续体，也不回滚已发生的原生滚动。

有效基线6项中4失败／2对照；修复后8专项及全部 NavMenu45项通过。JSDOM 使用真实组件／KeepAlive和原生方法探针，不证明浏览器布局、paint或原生滚动动画；真实浏览器／OS新增0。Vue清理规范用于停用／卸载及激活边界。Maple无NavMenu运行时，不制造对应移动组件。焦点恢复、节点 enter／Escape 续体、响应式测量和保留的其他命令尚待下一阶段，不能由本批scroll测试推断通过。

候选分类进度不变：18/33族已收口（54.5%），剩15族（45.5%）；51文件、132/182提示已分类（72.5%），50待审（27.5%），分母未变。NavMenu仍部分已分类；只更新其库存行号96→104，不提前归档整个消费者。Form／日期与关联Time、其他26处并行CSS／日期库存漂移和144环境阻塞保留，不称全局motion-themes通过。证据：design-ui/audits/evidence/nav-menu-scroll-2026-10-15/results.json。

### Anchor：滚动、测量帧和注册归属（2026-10-15）

Anchor滚动消费者同时拥有视觉滚动、容器scroll监听、测量RAF和render后change通知，职责不能混成CSS完成计时。私有slide从无取消句柄的b-tween包装改为目标owner window拥有的可取消RAF，保留300ms／quartOut；每帧读取当前减少动效偏好，已开启直接定位，运行中开启下一帧完成。取消停在当前位置、不跳到目标也不发finish。保留现有滚动节奏，不新增公共API／duration Token／CSS变量／颜色；共用throttleByRaf及b-tween依赖的其他消费者（含日期）不修改。

消费者按operation、binding／frame序列和change代次隔离；新点击、停用、卸载、scroll-container／boundary变化取消私有滚动与原owner测量帧、解除原容器监听。旧finish不能解锁新滚动；旧帧、几何读取重入和重复交付不能提交旧测量。change在nextTick后交付且消费一次，同hash重复点击不吞掉仍有效的待发通知。nextTick只能逻辑失效，不声称物理取消续体或回滚已执行滚动。停用保留点击无通知且不preventDefault；激活重新绑定／测量，不恢复旧动画。

AnchorLink按href与原节点注册／注销，自动watch清理覆盖href替换和卸载；父级用节点identity避免旧清理删除同hash新注册。移除当前链接会取消旧工作并重新测量。原来无cleanup的两项注册基线均失败，已修复。Maple无Anchor运行时，不新造移动端副本。

有效原基线24项：消费者15（13失败／2对照）、slide7（6失败／1对照）、Link注册2（均失败），合计21失败／3对照；对照保留正常点击、卸载几何重入边界和300ms／quartOut。新owner RAF路径需spy实际document.defaultView，不再只spy测试global window；更正探针后重跑。修复中同hash取消过度导致一次中间回归，补保留有效通知并验证。最终Anchor31（消费者18／slide9／注册2／实际组件接线1／契约1）、含Affix／BackTop64通过；配置类型、受影响lint、Maple根lint、demo编译1、分类／扫描／Message／目录28测试及3生成页通过。Vue技能落实KeepAlive停用／卸载、原owner取消与原型／descriptor恢复。实际组件测试仍在JSDOM控制几何和RAF，不证明native布局／paint、OS偏好、跨文档或同节点adopt；真实浏览器／OS新增0。

进度：33组件族中18已分类收口（54.5%），15剩余（45.5%）；51已分类源码文件。只收口原Anchor2条待审，同时新实现显式增加3条提示（测量RAF1、私有slide的RAF／偏好2），所以分母179→182，已分类127→132（72.5%），待审52→50（27.5%），不是把新增实现当成额外旧缺陷。保存候选193文件／392 CSS／182 runtime；live C103/202/98、M92/214/84，其他26处并行CSS／日期行漂移保留，不能称全局motion-themes通过。Form／Date／关联Time、其他并行样式及144环境阻塞不动。证据：design-ui/audits/evidence/anchor-scroll-2026-10-15/results.json。

### Mention：镜像重定位与观察器交付（2026-10-15）

Cedar textarea镜像滚动是render后的state-settlement，不是CSS动效完成，不添加duration Token。原来只在open变化时排nextTick，现于当前文本／候选项等变化后同步偏移，包含scrollTop回到0。sync失效代次与post-render捕获的input实例／textarea／mirror共同约束任务，交付前消费一次，几何读取后再核对；关闭、禁用、模式切换、停用和卸载令旧任务无权写入。nextTick无法物理取消，只取消旧续体提交权限；已执行native scroll不回滚，也不声称取消原生smooth动画。

镜像样式每次从当前textarea.ownerDocument.defaultView读取，不再缓存全局window样式；style读取和属性枚举后重检，拒绝重入卸载提交。观察器绑定携带lifecycleEpoch，旧resize不能跨激活读取，新绑定仍能刷新。停用／卸载保留input、clear、选择／浮层事件和focus／blur无效；禁用时不接受输入／focus，active blur仍允许。focus／blur搬入setup闭包但保持公开签名，无新API／CSS变量／颜色改变。Maple无Mention运行时，不为对齐新造移动端副本。

有效13项基线10失败／3对照；正常40px定位、卸载refs清空和scrollTop getter卸载原本通过。初轮exposed方法读取和全局window样式探针不准确，修正为真实exposed spy／实际owner view后取证，不算产品缺陷。最终21项专项＋1项实际Mention/Textarea/useSelect/Trigger组合（仅拦截native scroll记录），含既有2项Mention契约；完整消费者组合Cedar129通过。配置类型、受影响lint与Maple根lint通过，1份demo脚本／模板编译；分类／扫描／Message／目录28测试和3生成页通过。Vue技能落实KeepAlive停用／卸载、代次和测试原型／descriptor恢复。受控JSDOM／回调队列不证明真实字体、换行／IME、paint或跨文档浏览器行为，真实浏览器／OS新增0。

每批固定附候选进度：目前33组件族，17已分类收口（51.5%），16未收口（48.5%）；49已分类源码文件、127/179提示（70.9%），52待审（29.1%，不是缺陷数）。这是运行时候选分类，不是全库验收率；有已验但未归档分类的反馈组件，NavMenu仍部分分类。只刷新Mention一行库存／hash，其他26处并行CSS／日期行漂移不动。Form、Date及关联Time、其他并行样式与144环境阻塞保留。证据：design-ui/audits/evidence/mention-mirror-2026-10-15/results.json。

### Typography：复制反馈与省略测量（2026-10-15）

Cedar Typography 的 copy-delay（默认3000ms）是交互反馈等待，不是CSS动效时长；省略 RAF／CSS高度检查是测量调度，不新设duration Token。重复复制替换计时，关闭copyable、disabled或copy-delay变化清除反馈；停用／卸载取消timer和RAF，旧完成、重放、重入和旧观察器绑定不能覆盖新阶段。激活只做当前测量，不恢复旧任务；展开、关闭省略或进入编辑取消旧测量。禁用态仍测量文字布局，复制／编辑／展开交互无效。保持既有公共API、默认值和全局raf/caf归属，不宣称跨文档owner或字体／剪贴板权限认证。Maple只有Typography工具指南，无对应运行时组件，不新增移动端实现。

有效14项基线11失败／3对照；首轮stub命名和监听器读取错误不计产品缺陷。修复中发现局部ellipsis变量遮蔽导致TDZ，已纠正并重跑。最终22项专项＋3项既有测试通过，含激活新绑定、CSS测量、重入替换、copy-delay／copyable变化。Vue技能用于KeepAlive停用／卸载清理及模拟资源恢复。真实浏览器／OS新增0；Form、日期库存、其他并行样式及144环境阻塞保留。

候选覆盖率按源文件归并组件族（排除下划线内部目录及utils，同名跨端合并），不是全库验收率。当前33族：16已分类收口（48.5%）、17未收口（51.5%）；其中nav-menu部分已分类，未收口不等于从未验收或存在缺陷。运行时提示126/179已分类（70.4%），53待审（29.6%），48个已分类文件。aliased raf/caf没有被现有扫描命中，单列本批证明，不额外虚增提示。仅刷新Typography源码hash与该行库存，不覆盖其他并行漂移。证据：design-ui/audits/evidence/typography-scheduler-2026-10-15/results.json。

### Scrollbar Thumb：拖动会话与监听资源（2026-10-15）

承接前一批消费者边界，独立审查 Cedar 公共／旧目录及 Maple selection-scrollbar 三份 Thumb。本批直接使用真实 Thumb 与实际 EventTarget，并补实际 Parent＋Thumb 组合；只stub父级ResizeObserver并控制几何／鼠标事件，不是原生浏览器、可信鼠标／OS或跨iframe拖出认证。无RAF、计时器、CSS Token、颜色／布局或公开API新增；鼠标拖动依然是同步几何与scroll通知，不应套动效duration。

每次左键按下建立独立session：代次、track／thumb节点、不可变轴／起点及实际 thumb.ownerDocument.defaultView 共同拥有move/end。监听 mousemove、mouseup、contextmenu和blur只注册于原owner window；正常抬起、右键菜单取消、窗口失焦、几何／方向变化、停用和卸载都解除整组监听并清dragging／mouseOffset。修复原contextmenu未解绑、卸载／停用无清理及iframe误绑全局window。旧move不能推动新手势，旧end不能释放新手势；激活只允许新按下，不恢复旧drag。

方向、max、thumbSize、ratio的有效值变化取消当前手势；仅替换等值data对象不取消连续拖动。最终偏移仍由父级新测量／setOffset结算。几何读取与响应式写入后重新核对会话，防止同步卸载后绑定或通知。停用／卸载保留按下／轨道点击／setOffset入口无效且不preventDefault；非左键不启动／跳转。当前setOffset夹取、拖动期间忽略外部setOffset和轨道一thumb-size步进保持。没有Pointer／touch拖动协议迁移或原生滚动回滚承诺。

各18有效基线15失败／3对照，最终各21（补等值data／几何变化、轨道重入、实际Parent组合），Cedar42专项、Maple21；含下游Cedar168／Maple133通过。初轮iframe方法描述符／Window对象断言导致探针失败与Cedar旧报告器报错，改为自有方法包装＋布尔identity断言后重取有效基线，不算产品缺陷。Vue技能落实停用／卸载与原owner解绑、测试descriptor／iframe／监听恢复。

三Thumb在既有计时／scrollTo源码扫描无runtime提示，纳入本批hash证据但不虚增候选分类：仍47候选文件／125已分类提示、54待审（非缺陷数）。其他并行CSS／日期库存不刷新，Form与144环境阻塞保留；旧“Thumb未验”章节为历史边界，本批只新增受控证明，真实浏览器／OS新增0。证据：design-ui/audits/evidence/thumb-drag-2026-10-15/results.json。

### Scrollbar：同步测量、绑定事件与原生滚动（2026-10-15）

审查 Cedar 公共 Scrollbar、旧目录独立副本和 Maple Select 内部 selection-scrollbar 三份消费者。它们没有 RAF／计时器：读几何、更新 thumb 与 DOM scrollTo 都是同步操作，不应增加 CSS duration Token 或伪造“取消动画”API。每份扫描7提示中6处为 native-scroll，1处 function scrollTo 定义为 declaration-only；测量意义单独描述，不虚增扫描数量。

生命周期 availability 控制保留 scrollTo／scrollTop／scrollLeft、thumb命令、scroll通知与resize测量。停用／卸载使操作和绑定代次失效；激活重读当前几何，只接受当前绑定事件。旧resize／scroll／thumb入口即使在重新激活后交付仍无效。几何读取、响应式提交和子thumb回调之后核对操作／原容器／生命周期，防止同步卸载或新测量重入后由外层旧任务覆盖结果。同步滚动一旦交给浏览器已经发生，逻辑失效不能撤销它；原生 smooth 插值及其取消不在本批证明范围。

scrollTo(0,0)／单轴0是合法坐标，不用真值判断；恢复零位置也同步thumb，不保留上次偏移。水平测量使用水平比例（旧代码误用了垂直比例）。零／无效视口用有限、非负thumb数据，不显示该零尺寸轴；正常最小thumb20px与track15px布局策略不变。禁用／隐藏轴的旧thumb命令无效，但禁用条不等于禁止内容或公开原生滚动。对象选项直接透传、不模拟JS动画；公开方法签名／样式变量不变。

每副本13有效基线11失败／2对照；最终各16（补重新激活新命令、原生选项透传和水平比例），Cedar两副本32专项、Maple16；含下游 Select／AutoComplete／Cedar Mention 回归 Cedar126／Maple112。测试stub ResizeObserver／Thumb并控制几何，不等于实际观察器、Thumb拖动监听、原生smooth／paint或OS验收；真实新增0。Vue清理规范落实停用／卸载、绑定与重入归属，底层Thumb拖动可留下一批独立验收。

累计47文件／125分类提示、54未分类（非缺陷数），只刷新三Scrollbar源码行／hash；并行CSS／日期库存不刷新，Form与144环境阻塞保留。旧数字为历史。证据：design-ui/audits/evidence/scrollbar-consumer-2026-10-15/results.json。

### Carousel：播放节奏、循环结算与绑定归属（2026-10-15）

自动播放的间隔是业务播放节奏（business-clock），不是 CSS 动效时长；默认关闭，启用 true 时默认3000ms，数字／配置间隔、hover/focus/隐藏暂停规则保持。取消或重排使旧播放任务失效；当前回调消费一次后才调用导航。停用／卸载保留 next／prev／to、键盘和滚轮入口无效，不能翻页或拦截输入。激活建立新观察器／事件绑定，解绑前迟交付不得借新 active 状态重新排任务。

循环切换的 nextTick 负责等渲染，结算计时属于 visual-completion，随后双帧属于 state-settlement。请求／轨道节点／窗口核对及每阶段消费位，避免旧计时清新偏移、重复首帧分叉、旧次帧释放新的 noMotion。取消物理计时与原窗口所持 RAF；即使已出队的回调再交付，也必须先核对权限。内容重排与配置后的渲染测量任务同样绑定代次，停用后不重放。自动播放和动效阶段分别管理，不把播放间隔套进系统 duration Token。

move-speed、现有 CSS 变量和减少动效样式不变；当前 JS 结算仍按显式 move-speed 或既有 computed transitionDuration 读取（样式不可读保留180ms fallback），本批不新增 CSS Token，也不声称多属性 duration/delay、运行中时长变化或 OS 偏好已完整认证。计时仍使用原全局机制，帧使用原 owner window；同节点跨文档迁移、原生绘制另待验。

两端各14有效基线：12失败／2正常对照；最终各18专项，完整 Carousel Cedar44／Maple45。受控 nextTick／timer／observer／RAF spies 不是原生浏览器／OS 验收，真实新增0。Vue 生命周期规范用于停用／卸载、绑定清理和请求消费。累计44文件／104已分类提示、75待审（非缺陷数）；只刷新两Carousel运行时行／hash，其他并行 CSS 库存漂移不刷新。Form、日期及144环境阻塞保持，旧章节数字为历史。证据：design-ui/audits/evidence/carousel-scheduler-2026-10-15/results.json。

### Card：浮起测量与回落结算（2026-10-14）

Card 的 500ms 是 `ripple=true` 时的交互等待策略，不是 Ripple CSS 动效时长；`ripple=false` 保留零延迟。等待后读取 Card 几何并交给现有 doubleRaf 做布局稳定，再展开。doubleRaf 是 state-settlement，不是 CSS 时长，也不能通过这个既有 Promise helper 物理撤销底层 RAF；本批只撤销旧续体写布局的权限，不宣称帧被取消。文档／窗口归属仍使用既有全局计时与 helper，实际跨文档和原生绘制另待验。

渲染任务在源变化时同步递增请求代次；关闭、方向切为横向、新任务、停用或卸载后，旧 nextTick／计时器／双帧续体无权改变新阶段。渲染和计时交付消费一次，几何读取返回后再次核对节点／请求／生命周期，避免测量钩子同步卸载后继续排双帧。停用／卸载清理两计时并禁止保留 close／click 输入；激活依当前 floating／direction 发起新阶段，不重放旧任务，初始 KeepAlive 激活不重复等待。

公开 `floating-duration` 当前默认 250ms，仍同时供布局 transition 和回落恢复等待；浮起内容／按钮 opacity 仍用其两倍。它是组件公开参数，不被强行改为 system Token，本批不改公共 API／CSS 变量／默认时长／色彩语义。回落恢复归 visual-completion，500ms 等待归 interaction-delay，doubleRaf 布局意义单独解释（本扫描未命中该调用，不虚增候选数量）。

两端各 12 基线：9 失败／3 对照；最终各 15 专项（补初始激活、几何重入卸载和停用双帧），完整 Card Cedar21／Maple44 通过。受控 nextTick／doubleRaf Promise／fake timers／几何 spies，不是原生浏览器／OS 或底层 RAF 取消证明，真实新增0。累计42候选文件／96已分类提示、83未分类（非缺陷数），保存库存仍为192文件／392 CSS／179运行时提示；live扫描发现其他并行CSS变更，未刷新这些未审快照。Vue 生命周期规范用于停用／卸载、请求消费与测试资源清理。Form、日期库存漂移、144环境阻塞保持；旧章节数字为历史。证据：design-ui/audits/evidence/card-scheduler-2026-10-14/results.json。

### PreviewGroup：轨道重定位与双帧释放（2026-10-14）

循环轨道保留三份图片与中间段规范坐标；双帧 RAF 是跳转后恢复 transition 的 state-settlement，不是动效时长，零时长／减少动效仍需此稳定过程。轨道节点的 ownerDocument.defaultView 申请和取消帧／计时器；关闭、替换图片（含等长替换和原位编辑）、改变 loop、停用、卸载及新导航使旧任务失效。帧／渲染回调只消费一次，旧交付不能释放新 instant 阶段；停用／卸载保留命令无效，激活只规范化当前坐标，不恢复旧任务。图片内容监听在 post 阶段结算，避免子图片 watchEffect 注册被同步轨道读取污染。

CSS 两端轨道共同消费 `--c-sys-motion-duration-slow`／`--mp-sys-motion-duration-slow`（当前 240ms）与 `--c-sys-motion-easing-standard`／`--mp-sys-motion-easing-standard`；Maple 原固定 280ms／自定义曲线改用既有系统语义，不新增公开变量。instant、moving 和减少动效关闭 CSS transition。JS visual-completion fallback 在渲染后读取当前 transform／all 的实际 computed duration 与 delay，遵守列表对应、负 delay 和零时长；仅样式缺失／不可解析时使用私有 400ms 保底，不是上限或 CSS Token。当前自身 transform transitionend 可提前结算；忽略冒泡及时间戳早于新命令的事件，不承诺无时间戳旧事件或所有原生跨文档情形已验收。

专项最终两端各 27 项，完整 Image Cedar 62／Maple 114 项；32 组 Less／条件级联检查、16 组时长与曲线成对覆写、32 组 instant/moving 消费检查。受控 nextTick／RAF／假时钟／iframe owner 与编译检查均不算真实浏览器／OS，新真实验收 0。新增两候选文件／6 提示：40 文件／92 已分类提示、87 待审（不是缺陷数）；库存仍 192 文件／392 CSS／179 运行时提示。Form、日期库存漂移和 144 环境阻塞保留。旧章节中的“PreviewGroup 待审”与数字为历史批次。证据：design-ui/audits/evidence/preview-group-track-2026-10-14/results.json。

### ImagePreview：交互窗口与模式监听（2026-10-14）

500ms用于触摸长按通知，320ms用于双击识别窗口到期，不是CSS动画完成／关闭等待。私有tapTimer只清理双击状态，旧名tapCloseTimer已纠正；公开期限／缩放／拖动协议不变，不新增CSS Token。计时器分别核对代次并消费一次，取消／移动／抬手／关闭／换src／停用／卸载后的旧交付不能通知或清掉新句柄。

停用／卸载清理键盘、计时器、pointer capture与moving状态；保留交互入口无效，激活只允许新手势，不恢复旧手势。关闭和src变化同步清理输入。输入模式helper在停用解绑coarse-pointer MQL，绑定代次拒绝迟交付，激活重新读取当前模式；不是reduced-motion查询。文档／窗口归属仍使用既有全局document/window，本批不认证实际跨文档或原生触控。

各端17项基线15失败／2正常对照，最终17全部通过，完整Image Cedar35／Maple87通过。控制队列、fake timers／MQL／pointer events与capture spies不是原生浏览器／OS证据；真实新增0。Vue技能落实停用／卸载、消费归属、测试descriptor及假时钟恢复。证据：design-ui/audits/evidence/image-controller-scheduler-2026-10-14/results.json。

候选分类新增两Controller文件／四条interaction-delay，累计38文件／86提示、93待审（非缺陷数），库存192文件／392 CSS／179运行时提示不变。另两份useInteraction源码无本扫描runtime命中，纳入专项hash证据但不虚增分类数字。PreviewGroup轨道重定位仍待单独审查；Form、日期库存漂移和144环境阻塞保留。旧数字保持历史批次。

### Select：渲染后滚动与键盘派发（2026-10-14）

Select shared hook 的 nextTick 是等待渲染／选项登记，不是“弹层动画结束”或CSS动效完成。打开任务在关闭、重新打开、键盘新滚动、活动键命令、停用或卸载后失效；回调消费一次，即使当时没有可用选项也不能在选项稍后到达时重放。停用／卸载保留键盘、选项选择与滚动入口无效，激活允许新命令但不恢复旧任务。正常晚注册下拉节点仍可收到当前打开的滚动。

虚拟列表调用是delegated-scroll；随后可能发生的DOM scrollTo是native-scroll。虚拟回调返回后重新核对生命周期、open、请求及ref归属，防止同步关闭／卸载／替换后继续写DOM。键盘Arrow的本地同步派发新增interaction-dispatch分类，与interaction-delay区别：它没有延迟／计时器，不应生成CSS时长Token。nextTick调用点归state-settlement，实际IO独立标注。不新增CSS变量／公开API，不改变键盘与选项身份协议。

两端12项有效基线各10失败／2对照，修复后各14通过（补晚登记与空列表消费对照）；含共享hook的AutoComplete及Cedar Mention回归Cedar93／Maple96通过。Cedar旧Vitest TSX与.ts hook转换模式导致nextTick mock未接入，专项采用.test.ts取得有效基线；不是产品缺陷。受控队列／DOM几何及fake虚拟列表不等于真实浏览器／OS或完整下游组件验收。Vue技能用于停用／卸载和旧任务清理。证据：design-ui/audits/evidence/select-scheduler-2026-10-14/results.json。

当前192文件／392 CSS／179运行时提示不变，36文件／82提示已分类、97待审（不是缺陷数）。Maple本轮全库lint通过，未修改日期文件，之前23项日期示例错误属并行历史，不计本批修复；1019示例编译0失败。Form、日期库存漂移及144环境阻塞保留，真实浏览器／OS新增0。下文数字保留历史批次。

### BackTop：测量帧与滚动插值分离（2026-10-14）

显示阈值RAF属于measurement-scheduling；duration（默认200ms）／easing驱动JS插值，属于visual-scroll，不是CSS transition Token。减少动效入口直接回顶，运行中偏好变化在下一有效帧完成；必要显示测量仍保留。保持横向位置、事件与scrollToTop，不新增取消API／CSS变量。

绑定代次隔离旧监听；测量与动画帧分别核对归属并只消费一次。换目标、取消、停用及卸载使旧任务失效，不能清新句柄、更新新目标或激活后复活。自定义easing后再次核对请求归属，防止其同步取消／卸载后继续写入或排帧。RAF、cancelAnimationFrame及performance.now来自target.ownerDocument.defaultView。激活绑定新监听／更新显示，不恢复旧动画。

两端初测各14项10失败／4对照；测量回放需先等待挂载watch稳定，探针调整单列，不额外计产品缺陷。旧契约改为替换实际owner RAF／时钟。最终专项各14、完整各30通过；模拟iframe验证owner时钟与取消，不是实际跨文档浏览器／OS认证。Vue技能用于停用／卸载与descriptor恢复。证据：design-ui/audits/evidence/back-top-scheduler-2026-10-14/results.json。

合并动画排帧入口，每端候选4→3条（未删功能）；当前192文件／392 CSS／179运行时提示，34文件／70提示已分类，109待审（不是缺陷数）。Maple1017示例编译0失败；两端受影响lint通过，但Maple全库lint被并行日期示例23项格式／curly错误阻塞，按范围保留，不宣称全库通过。Form、日期库存漂移和144环境阻塞保持，真实浏览器／OS新增0。以下旧数字保留各批历史时点。

### InfiniteScroll：测量任务与观察器绑定（2026-10-14）

InfiniteScroll 的 RAF 与零延迟 setTimeout fallback 用于合并触底几何检查，归入 measurement-scheduling；不是视觉插值／完成等待，不应新增 CSS duration Token 或套用 reduced-motion。绑定被替换、停用或卸载时取消待任务并使代次失效；已出队旧回调不得清掉新句柄、检测新目标或在激活后复活，已消费回调不可重放。ResizeObserver／内容及可见性 MutationObserver 同时核对绑定代次，解绑后的迟交付不能安排新测量。

两端各10项受控队列基线7失败／3正常对照，修复后各10通过。保留 immediate 初始通知策略、状态循环与同步去重、target／阈值、check／retry 及事件顺序；本轮不接管业务请求。Vue清理规范用于停用／卸载和解绑旧观察器。受控 JSDOM 队列不等于原生浏览器、观察器时序或跨文档验收，真实浏览器／OS新增0。

累计32文件／64提示分类，117提示待审（不是缺陷数），库存192文件／392 CSS／181运行时提示不变。Form、日期库存漂移及144环境阻塞保持。证据：design-ui/audits/evidence/infinite-scroll-scheduler-2026-10-14/results.json。以下数字和待审范围保留历史批次时点。

### VirtualList：渲染后补偿与命令归属（2026-10-14）

两端 List 下游 VirtualList 当前使用 Vue nextTick 进行渲染后滚动补偿，不再直接安排 RAF；这是 state-settlement，不是 CSS 动效时长，不新增 Token 或取消 API。新命令／新滚动、数据键或虚拟模式改变、KeepAlive 停用及卸载会使旧补偿失效；回调同时核对请求代次与原容器，渲染后补偿只消费一次。停用／卸载后的保留 scrollTo 或 List.scrollIntoView 无效，重新激活不重放旧补偿，新的有效命令可正常执行。逻辑取消不会删除 Vue 已排队的回调，也不撤销先前同步完成的滚动。

各端14项受控基线10失败／4正常对照，修复后各15项通过（新增对象补偿重复交付对照）；连同既有 List 回归 Cedar41／Maple34通过。Vue 清理规则促使停用和卸载均失效；受控 nextTick／JSDOM 验证不等于浏览器或原生 RAF 验收，新增真实浏览器／OS为0。key／index／align、阈值、测量及公开 API 保持，不宣称任意几何／跨文档场景完成。

累计30文件／60提示已分类，121提示待审，库存192文件／392 CSS／181运行时提示不变。全局库存仍有并行日期 CSS 行漂移，Form 与144环境阻塞保持，不刷新未审日期快照。证据：design-ui/audits/evidence/virtual-list-lifecycle-2026-10-14/results.json。下文数字及“待审”范围保留各批历史时点，以本节为当前 VirtualList 状态。

### Icon 名称切换：视觉完成等待

Icon 的 transition 是公开JS名称切换时长，默认0；内联CSS transition-duration与JS等待使用同一个归一化值，负值／非有限值按0。不新增CSS变量、不把业务时间或交互延迟改成Token。运行时改变transition取消旧阶段并立即提交当前名称；名称被替换、减少动效变化、停用或卸载取消旧计时，已出队／已消费回调不能回滚名称或清除新动画。

KeepAlive停用期间不安排名称动画，移除减少动效监听；数据保持最新名称，激活直接显示最新值，不重放旧动画。监听从真实span.ownerDocument.defaultView读取，绑定代次拒绝解绑旧监听的延迟交付；重新激活重新绑定并读取当前偏好。具名注册、slot优先、spin与默认值保持。模拟iframe／MQL／计时器各端9项基线6失败／3正常对照，修复后完整Icon Cedar20／Maple21通过；不是实际OS／浏览器验收。同节点不停用直接跨文档adopt仍待验。

分类新增visual-completion（视觉替换等待，含偏好分支）和delegated-scroll（调用另一组件滚动，非原生DOM操作）。两端List.scrollIntoView只是方法声明及向VirtualList转发options，不能把这些源码提示当作本地动画或原生scrollIntoView通过；下游VirtualList的RAF和保留命令仍独立待审。累计28文件／58提示已分类，剩余123提示，库存192文件／392 CSS／181运行时提示不变。123不是缺陷数。Form并行改造、日期开发和144环境阻塞保持。

### IndexBar 消费者：取消与状态稳定帧

IndexBar 的 duration 是 JS 插值参数，默认0、正值保留 cubic easing，不是CSS Token。组件私有可取消任务接管入口、插值、列表／clickedName两帧等待，不再调用不能取消的通用滚动工具；两端共享工具及并行Form不改。替换／停用／卸载取消实际owner窗口待帧并让等待返回false，不跳旧目标；已交付帧及微任务仍核对归属，旧完成不能解锁新跳转。停用／卸载保留方法无效；激活等子锚点登记后恢复active/event:false。公开void scrollTo及事件／默认值不变，不新增取消API／CSS变量。

新增职责state-settlement：两帧等待是状态顺序，不是CSS动效时长。减少动效只跳插值，不跳必要稳定帧。初始10项纠正探针后基线7失败／3对照，真实IAB又复现激活定位早于子登记，补第11项。消费者11＋任务4＋既有9共24通过；最终真实IAB四组4/4、节点0、无warn/error。入口原生点击，内部命令／scroll事件脚本派发；不认证原生手势／OS／组件跨文档。固定0／480坐标及几何探针错误单列，不计产品缺陷。

证据见共享audits/evidence/index-bar-lifecycle-2026-10-14/results.json。当前库存192文件／392 CSS／181运行时提示，24文件／50提示已分类、131未分类；不是131个缺陷。Cedar无对应IndexBar，不虚构组件。144环境阻塞、其他主题／窗口、并行Form仍独立待验；下文旧数字及待验范围保留各批历史时点。

### 共享滚动真实 IAB 八组

两端各主文档默认300ms／0ms、真实同源iframe HTMLElement／Window，共8/8通过。默认实际完成302.5–313.9ms，各19次owner原生RAF、含中间坐标；0ms为0.1／0.6ms，owner RAF0。iframe四组宿主RAF0，终点left80／top220且50ms后稳定，目标节点清零，控制台无warn/error。

入口原生点击；夹具自己的计数包装原样转发native RAF，不替换时钟／帧实现。数据是原生回调首／中／末坐标摘要，不是全帧像素证明。当前reduce查询观察为false，未切换／认证OS偏好；Form／IndexBar取消、其他easing／时长／引擎仍待验。原始JPEG已查看及hash验证；18项新增证据门禁、全浏览器证据185项通过。本批无产品修复／Token/API变化，144环境阻塞保持。

### JS 滚动工具：时长、窗口与减少动效

两端 elements.scrollTo 的默认300ms与调用方 easing 保持；0／负值／NaN／Infinity直接到目标，不排插值 RAF。HTMLElement 使用实际 ownerDocument.defaultView，Window 使用目标自身；不从宿主全局 window 借帧。初始减少动效偏好直接到目标，运行中偏好变化在下一帧收敛；没有额外监听资源。每帧验证并消费代次，已消费／完成帧不能再写入或调度。

这是JS视觉滚动的执行策略，duration是函数参数，不是CSS变量；不用CSS Token冒充其消费。Maple IndexBar公开duration默认0，仍保持0；自身首帧与doubleRaf流程仍异步，工具零时长不意味着整组件没有RAF。Maple Form是实际另一个消费者，但正在并行改造，本批不接管。

两端各10项工具测试通过（基线9失败／1默认300ms对照通过），Maple既有IndexBar9项通过。Cedar探针在修复后需改绑实际document.defaultView，宿主包装对象差异不记新产品失败。减少动效与iframe均为模拟，不等于OS或真实浏览器。未新增取消API／跨调用自动替换：调用方卸载／停用、Form并行归属、IndexBar clickedName／doubleRAF／保留命令及真实滚动仍待专项，不能外推为全消费者生命周期已通过。

### InputNumber／Countdown 真实 IAB 四组

default/light、父文档，两端各长按取消／卸载与Countdown暂停／KeepAlive一组，4/4真实浏览器通过，最终组件节点均0、无warn/error。入口按钮原生点击；内部pointerdown／pointercancel由夹具脚本派发，Countdown使用公开方法。不声称原生长按、已出队竞态、跨窗口或OS通过。

长按实际首次重复间隔Cedar803.1ms／Maple802.3ms，后续152.8／153.1ms；取消后约220ms和重新按下后约100ms卸载、超过800ms期限观察都无额外更新。Countdown暂停回调计数保持13，停用保持Cedar25／Maple26，停用重置900ms后26／27保持；激活恢复计时至703／700ms，卸载后40／41保持。减少动效、业务时钟和交互节奏的边界不变。

初测直接缓存组件，父级不渲染inactive vnode导致time只在激活时传入，是夹具覆盖问题而非产品失败；改稳定缓存容器后冻结服务重启／重载，最终四组完整重跑，不重复计初测。原始JPEG已查看／校验哈希；19项新增证据门禁及浏览器证据全链167项通过。没有新增产品源码／API／Token修复；144环境阻塞仍独立。

### Countdown 业务时钟与停用边界

Countdown 的 RAF 刷新业务剩余时间，不是视觉插值；CSS duration／减少动效不能改变业务计时。暂停与 KeepAlive 停用冻结剩余时间，重新激活按冻结值续跑，不把停用期间计入消耗。停用时更新 time／reset 可更新剩余数据及 change 通知，但不申请 RAF；auto-start 的启动延后到激活，手动 pause 取消待恢复。停用期间直接 start 被忽略，卸载后的 start／reset 不再通知或调度。

每帧在清空句柄、计算和通知前验证代次，并在 change 回调后再次核对；回调内 reset／pause／start 的新任务不能被旧帧覆盖，已消费帧不能再次更新或抢占后继帧。结束只通知一次，reset 允许新一轮结束。两端受控时钟／RAF各8项通过，其中6项基线失败；完整Countdown Cedar18／Maple20项通过。没有新增CSS变量／公开API，模拟RAF不等于真实浏览器／OS验收。

### InputNumber 长按回调归属

长按每个计时回调在步进前校验并消费自身代次，取消、替换、释放、停用和卸载后的旧回调不修改值；步进内部重新开始长按，也不能被旧回调的返回值停止。停用期间不接受新的长按任务，重新激活后需要新的用户长按，不自动恢复旧手势。首次800ms、重复150ms是交互节奏，不是CSS动效时长，不新增动效Token。两端各8项受控计时／旧回调测试通过（其中7项先失败），完整InputNumber Cedar45／Maple48项通过；不等于真实浏览器或OS验收。

### 运行时计时的职责边界（分类第二批）

不能按“出现 RAF／setTimeout”就统一替换为动效 Token。本批核对两端8个文件／26条源码提示；累计22文件／44条已分类，133条未分类。提示数量包括方法声明，不是组件数量、缺陷数量或验收通过数；未分类也包含此前已有专项验收的组件。

| 职责 | 当前例子与使用场景 | Token／验收边界 |
| --- | --- | --- |
| business-clock | Countdown 用 deadline 与 performance.now 更新业务剩余时间 | 不消费 CSS 动效时长；减少视觉动效不能缩短业务时间 |
| interaction-repeat | InputNumber 长按首次800ms、重复150ms | 交互节奏不是 CSS 过渡；取消、旧回调与停用需生命周期专项 |
| test-support | delay／flushRaf、RAF与scroll mock | 保留原始扫描提示但不当产品动效；模拟方法声明也不证明浏览器调用 |
| visual-scroll | elements.scrollTo 的 JS 插值，默认300ms、调用方 easing | 与直接 native-scroll 转发区分；须按实际消费者核对窗口、取消、零时长及减少动效，不盲目接全局 CSS Token |

Maple Form 的滚动到校验项调用默认时长／linear；IndexBar 使用公开 duration／easeInOutCubic。Picker 的同名局部方法不是此工具；Cedar 未找到此工具的具名生产调用，不能据此宣称产物不可达。src 排除 __tests__ 后未发现上述 test.ts 路径导入，也不替代打包依赖图认证。

分类批次历史候选包含长按先 step 后验代次；该项已由后续 InputNumber 受控回归复现并修复，见长按回调归属小节。Countdown 暂停／重启及停用更新已由后续受控业务时钟回归复现并修复，见对应小节；滚动工具执行／当前偏好已在后续受控回归修复，但消费者取消和真实减少动效仍待专项，不外推生命周期通过。分类记录逐文件绑定完整源码哈希、当前候选行与原文，变化必须重新审阅，不自动刷新哈希。本批无产品源码／API／CSS变量变化，无新增真实浏览器或OS通过；144组环境阻塞保持。

### Trigger 真实 IAB 生命周期四组

default/light，两端各延迟取消／KeepAlive尺寸测量，共4组真实浏览器通过。原生点击夹具入口，内部mouseenter由脚本发出：不能称原生hover、人工已出队竞态、跨窗口视觉或OS证明。300ms待打开在约101ms卸载，约553ms后仍无打开／面板；重新挂载同路径实际打开（正向对照），最终节点0。KeepAlive活动实际resize计数1→2，停用期间保持2，恢复后3，重新打开并最终卸载。

真实浏览器计时／ResizeObserver／公开回调与DOM阶段保存相对performance.now摘要，截图原始JPEG已查看并校验哈希，控制台无warn/error。没有新增产品修复或Token/API；此前模拟旧回调验证仍独立，144组原生200%／Safari／Firefox阻塞保持，其他主题／位置和原生hover仍待验。


### ResizeObserver 测量批次的归属

ResizeObserver通知与RAF测量分别保存绑定代次／帧代次。换目标、关闭、停用或卸载使旧绑定和旧帧失效；已断开的observer不能把旧entries混入新批次，旧RAF不能清空／提前消费新任务。帧执行前验证代次并消费一次；保留当前窗口取消和必要测量，不新增动效Token、不把测量减少成视觉零时长。绑定代次不因正常一帧完成而失效，当前observer后续通知仍能调度。

两端模拟回归各新增3项先失败后通过，Trigger完整Cedar63／Maple76项通过，resize专项各8项。范围是工具及Trigger模拟生命周期，不等于所有消费者／真实浏览器或OS已通过；同节点跨document adopt与未刷新目标边界仍需专项验证。


### Trigger 已绑定监听窗口的清理

scroll监听记录实际绑定窗口，解绑不从当前popup ref反查。更换窗口、ref被清空或watcher尚未刷新就卸载，都在原窗口移除原处理器；RAF取消仍使用原申请窗口。两端新增模拟回归各3项先失败后通过，完整Trigger Cedar60／Maple73项通过；初轮Window spy不一致及初始化remove记录污染均属探针问题，不记产品失败。内部窗口引用不是CSS变量或API，不新增Token；同一DOM节点不换ref直接跨document adopt、真实浏览器视觉／OS仍需独立验收。


### Trigger 测量 RAF 的窗口归属

定位／滚动关闭使用 RAF 合并测量，不是视觉动效时长。元素滚动优先用事件节点 ownerDocument.defaultView；窗口滚动用当前浮层所在窗口。保存申请窗口并由同一窗口取消，代次守卫隔离已出队旧帧；在调用业务处理前清空本次事件，旧帧不能消费后续新滚动或清掉新任务。必要几何测量不因 reduced-motion 被取消，不新增 RAF 时长 Token。

两端 iframe 模拟回归各4项：正确绑定夹具后先3失败／1通过，修复后完整 Trigger Cedar57／Maple70项通过。初轮夹具未触发绑定 watcher、不作产品证据。此为模拟窗口／回调验证；真实跨文档视觉和OS偏好仍独立。旧scroll监听原窗口解绑已在后续专项完成模拟回归；同节点跨document adopt和真实浏览器／OS仍不在此证明范围。


### Trigger 交互延迟的归属

mouse-enter-delay／mouse-leave-delay 是交互请求延迟，不是 CSS 视觉时长。取消、替换请求、停用或卸载使已出队旧回调失效；当前回调只提交一次，不能清理新任务。停用仍发原有关闭请求，随后拒绝保留方法启动任务；重新激活只接受新请求，不重放旧 hover 延迟。卸载后保留方法永久不调度。内部代次／活动状态不公开、不成为 Token；受控 open 仍由调用方决定，不新增 API 或修改延迟默认值。

两端新增模拟回调归属各6项先失败后通过，完整 Trigger Cedar53／Maple66项通过；这不是浏览器帧／真实OS证明。RAF owner-window取消及跨文档定位仍需下一批独立验证；职责分类中的旧“尚待回归”说明属于首批分类时点，不把延迟回归扩大为整个 Trigger 验收。


### 运行时调度不等于动效 Token

源码扫描是逐行线索，不是缺陷或验收计数。先判定职责：声明／类型签名没有运行；测量 RAF 只合并几何读写；交互延迟决定何时请求状态变化；业务期限决定展示／轮询多久；视觉完成等待才应跟随实际 CSS 过渡完成。前四类不能仅因出现 setTimeout／RAF 就改用 CSS 动效时长，减少动效也不能取消必要测量或缩短业务期限。

首批人工分类 14 文件／18 条线索：6 声明、6 测量调度、4 交互延迟、2 原生滚动调用。Layout 原生 scrollTo 保留调用者 options，不等于已验证 smooth 或减少动效；Trigger RAF 的 owner-window 取消、已出队回调归属，交互延迟的失效回调，仍需独立生命周期回归。分类保存源码哈希／原行，变更时重新审阅，不能自动刷新哈希冒充复核。剩余159条尚未录入此分类表，包含已有专项审计，不等于159个未修问题。分类新增浏览器／OS通过均为0，不改变变量层级、默认值或公开API。


第 6 阶当前验证：80 项主题前景／实心背景角色检查及 64 组 primary 白字检查通过。200 组文字／中性表面对比度中 94 组低于 4.5:1，本次配色不声明普通文字对比度全部通过。

当前已统一改为第 6 阶；前文第 7 阶的对比度统计属于历史结果，不适用于当前配色。primary 实心按钮继续使用白色文案。

### Button 配色、7 阶与对比度边界

色板的 primary-7 是颜色档位，不是 7:1 对比度，也不保证白字可读。两端 on-dark 始终是白色前景、on-bright 始终是黑色前景。用户已明确选择主色 Button 保留 on-dark 白字，将 default/light 的 2.305:1 记录为设计例外，不声称该组合满足 AA。此前最低 6.277:1 的 on-bright 候选方案不采用。色板／背景不改，业务仍可手动选择 7 阶及配套前景；此窄范围设计决定不降低其他文字检查阈值。

普通可操作按钮文字按 4.5:1；符合大字号条件的文字可按 3:1，纯功能图标按非文字 3:1 条款评估，禁用态文字不套普通文字阈值。按钮背景与页面并非一律要求 4.5:1。icon 容器仍可能有文字插槽，不能只凭 icon 属性就放宽文字标准。目前全变体文字门禁仍保留失败，不把局部通过说成全库通过。依据：[文字对比度](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)、[非文字对比度](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)。

业务可以使用 color/textColor 或组件变量手动选 primary-7：例如在实际 Button 根节点设置 --c-button-primary-color: rgb(var(--c-primary-7)) 与 --c-button-primary-text-color: var(--c-sys-color-content-on-bright)，Maple 对应换成 mp 前缀。背景与文字成对选择，并复核 hover/active 叠色及实际主题／底色；必要时再覆盖状态层变量。不会自动改色或禁止低对比度覆写，但默认配色通过不替业务覆写背书。若坚持白字／指定色阶，可明确记录设计取舍，不声称该组合满足 AA。

### Message 展示计时的回调归属

Message 的 duration 是业务展示计时，不是 CSS 进出动效 Token。重启、hover 暂停、clear、停用或卸载使已出队的旧回调失效；执行时核对活动状态和 open，同一调度只处理一次。KeepAlive 停用取消，激活从当前配置的完整 duration 重启（与 Notification 一致），不是继续停用前剩余时间；停用更新或卸载后保留的 restart 不启动任务。hover 仍保存剩余时间，正时长已耗尽时 resume 请求关闭一次，不误变常驻；暂停期间显式重置为0则仍常驻。只有有限正 duration 安排自动关闭，0、负数及非有限值不安排；内部代次／状态不是公开 API／CSS 变量。两端独立源码的模拟回归不是实际浏览器／OS 动效证明。

Message 服务退出由组件真实 Transition 的 after-leave→closed→条目清理负责：不再强制150ms完成，也不以200ms兜底提前卸载。公开 transition-duration／timing-function 的覆写能决定实际离场；显式零或减少动效仍走完成链，不延长业务 duration。尚未挂载就 close/clear 的条目没有离场，直接清理并报告服务 onClosed；不伪造组件 open/opened/close 动画事件。clear 用当前条目快照，同步删除不跳项；同ID重开时忽略仍为open的旧完成。模拟完成协议与源码门禁不是实际浏览器长时长通过，原生IAB仍待补。

Message 真实 IAB default/light、top 服务八组已通过：两端默认、600ms/linear、显式零和离场途中同ID重开。默认离场 Cedar104.4ms／Maple153.8ms，长离场603.8ms／604.8ms，重开最终604.7ms／612.6ms；重开后的业务展示期限约1204.9ms／1203.6ms，最终closed各一次、节点归零。重开会取消旧根DOM并创建新根，不将旧节点移除算作完成600ms离场；不保证所有退出捕获原生end事件，以真实leave-to→清理链留证。原生JPEG和规范化时序摘要见 design-ui/audits/evidence/message-native-2026-10-13。未覆盖hover、KeepAlive、其他主题／位置、真实OS、原生缩放或Safari／Firefox。

Message 局部 reduce 规则在独立组件样式生效：Cedar 取消根/进出过渡及图标淡入动画；Maple 取消进出过渡和动画位移，但保留独立提示的 translateX(-50%)／居中 translate(-50%, -50%) 静态定位。不能用 transform:none 抹掉布局定位。现有 duration/easing 消费者与覆写编译28项、减少动效选择器/布局68项通过；不更改 Token 默认值、显示期限或颜色，不依赖全局极短时长。这里的 !important 仅用于内置动效偏好，不授权普通主题覆盖。子图标自身 spin 属于 Icon 的独立规范；不冒充真实 OS 动态切换验收。

### Maple LoadingBar 动效与生命周期

LoadingBar 为 Maple 独有服务，不新增 Cedar 对应 Token。公开 --mp-loading-bar-transition-duration 默认 250ms、--mp-loading-bar-transition-timing-function 默认 ease，控制 width、opacity、background-color；不再使用 transition: all。设置在服务真实祖先（通常 documentElement/body），业务卡片内部无法传到服务。transitionDuration 内部 0ms 用于起始复位，不是公开选项。

200ms 显示等待／进度 tick、300ms 完成停留与 250ms 清理下限是调度策略，不是 CSS Token。完成宽度更新并刷新 DOM 后，等待 max(300ms, 实际 width transition duration+delay) 再隐藏；隐藏刷新后等待 max(250ms, 实际 opacity duration+delay) 卸载服务，下一次 start/error 重新挂载。解析实际节点计算样式，支持 s/ms、all、列表重复和负 delay；不承诺开始等待后的任意 CSS 改动或自定义 animation。reduce 关闭视觉过渡，进度与清理仍工作；显式 0ms 仍保留下限。

重复 finish 在延迟及关闭阶段去重；start/error 取消过时任务并使已出队回调失效。setDefaultOptions 替换完整配置，resetDefaultOptions 清除全部已拥有配置；无 DOM 的 SSR 调用不挂载或安排计时器。Vue 清理规范用于计时器归属与完成后卸载；命令服务不冒充调用页面自动绑定的生命周期。模拟时钟／计算样式、SSR 与 Less 编译不能记为真实浏览器／OS 验收。

真实 IAB 补验：默认、长时长加 delay、显式零、重复完成、重启、失败六组通过，最终服务节点归零；长时长隐藏／卸载等待实测 700.9ms／802.9ms。MutationObserver、真实计算样式与原生 JPEG 证据见 design-ui/audits/evidence/loading-bar-native-2026-10-13。原生点击触发夹具的明确业务序列，不外推真实 OS 偏好、原生缩放、Safari／Firefox 或设备触摸。

Cedar 独有 Notification：duration（3000ms，0 持续）是业务展示时长；六项 CSS transition Token 独立控制 opacity 和左右进出。close 每个挂载实例只发一次并取消计时；关闭／停用／卸载后的过时回调失效。reset-on-update 仅重启活动且未关闭实例；KeepAlive 停用取消，激活从完整配置时长重新开始。列表由 TransitionGroup 的实际离场完成负责卸载。17 项服务／组件／SSR、20项正常编译消费者／成对覆写及44项减少动效选择器通过。局部 reduce 取消 opacity／方向过渡和起始位移，不依赖全局兜底；真实 IAB 的 default/light 服务六组已通过；真实 OS 和其他引擎／主题／位置矩阵仍待验收，不新增 Token 或伪造 Maple 对应组件。

Notification 真实证据见 design-ui/audits/evidence/notification-native-2026-10-13：默认／长离场／零、clear同ID重加、活动身份保持与原生手动关闭，保留原生JPEG。框架空测量克隆不算通知实例；以公开transition elapsedTime或真实leave-to／移除链核对完成，class时间戳不冒充帧级时钟，显式零不等于真实OS减少动效。

clear 同步释放逻辑 ID；clear 后重加相同 ID 使用新的内部条目／组件身份及完整展示计时，更新仍活动的 ID 则保持实例。WeakMap 实例键仅是实现细节，不作为业务 API 或 CSS 变量。clear 保持静默，指定位置清理不影响其他位置。


全组件品牌与 info/success/warning/danger 的前景色、实心操作／状态背景统一使用第 6 阶；原先直接引用色板的前景声明已接入共享 content 角色。浅色表面、禁用淡色与显式预设色板保留各自职责。此前第 6／8 阶的对比度结果不能作为本次第 6 阶调整的通过结论。

Button 禁用配色按 Arco 的变体逻辑区分：彩色实心使用淡化状态背景；text/outline 保持透明背景并淡化状态文字；tonal 保留浅色背景。中性按钮使用中性禁用色。禁用时暂停 color/text-color 覆盖，关闭 hover/active 反馈和阴影。

> 本页是共享规范的文档站镜像。事实来源为 `design-ui/standards/design-tokens.md`；规范更新时应同步更新本页与 Cedar 对应页面。

Cedar 与 Maple 使用同一套逻辑 Token 语义，只允许品牌前缀不同：Cedar 为 `--c-`，Maple 为 `--mp-`。共享不是要求所有像素值都相同，而是要求同名 Token 表达同一职责；确需不同的触控尺寸、密度和平台结构必须显式登记。

## 重构时保留 Token 职责（2026-10-09）

组件主体或 DOM 同源化后，公开变量必须重新核验到终端 CSS 属性的完整链路；保留声明和文档并不代表定制仍有效。内部适配层只连接平台默认值，不得把不同职责合并成一个时长或用硬编码绕过已有公开入口。

Rate 是一个具体例子：两端的 `--{p}-rate-transition-duration` 控制普通颜色／hover 过渡，`--{p}-rate-scale-duration` 控制选中缩放动画，`--{p}-rate-transition-timing-function` 控制两者缓动（p 为 c 或 mp）。Cedar 与 Maple 的默认时长和曲线允许平台差异，但三个入口必须真实消费。内部映射声明在组件根节点，而不是 :root，确保实例及祖先的公开变量覆盖在当前作用域解析。减少动态效果偏好优先关闭这些动效。

文档站布局不是组件 Token API。断点、目录与预览区的排列由站点样式负责，不加入 system 颜色或组件尺寸契约；长变量表应局部滚动。源码消费检查、断点布局、键盘导航和真实设备验收应分别记录，不能互相替代。

### 可选覆盖与按实例尺寸回退

VerificationCode 的公开变量 `--{p}-verification-code-cell-height`、`cell-max-width`、`input-font-size` 默认声明为 `initial`：它表示未指定覆盖，而不是最终高度／宽度／字号。在这些未注册的自定义属性上，`initial` 使消费处的 `var()` fallback 生效；消费处再读取当前实例 size 对应的私有映射。不要在 `:root` 中引用仅在组件根节点定义的私有尺寸，否则默认值无法在正确作用域解析。

`cell-height` 控制单格高度，`cell-max-width` 控制单格首选宽度（空间不足时允许收缩），`input-font-size` 控制字符字号，`gutter` 控制相邻格间距。前三项未覆盖时跟随 xs/sm/md/lg/xl 字段尺寸，gutter 默认引用 system space-2；组件 gutter 属性会写入同名内联变量。业务在组件实例或业务容器上覆盖这些公开变量，不依赖私有映射，也不应把一个平台的像素值当作跨端统一标准。

这是明确的“可选覆盖 → 实例 size”契约，不是为缺失的内部 system Token 兜底。取消某个覆盖以恢复 size 时可在目标实例设置该变量为 `initial`；`unset` 对普通可继承的自定义属性会继承祖先值，不能当作同义重置。验收应同时放置不同 size、自定义实例和未覆盖邻居，并检查明暗主题与窄屏收缩。

## 当前状态与阅读方式（2026-09-30）

本轮源码、契约和消费路径的自动检查已形成闭环。System 默认值分为共享语义与明确的平台值；组件颜色、几何、排版、阴影、动效和层级按同义同值或平台差异登记。契约会随新增组件更新，当前数量以机器校验输出和菜单中的完整变量参考为准，不在各阶段叙述中维护另一份总数。

原 91 项消费候选已经逐项处置：恢复真实定制入口，删除无效历史变量，并复核运行时引用。InputTag、Form、Tree 的五档相关缺口已补齐；Tag 预设色、FieldDecorator 错误／禁用优先级、非颜色角色与 reduced-motion 均有持久检查。Message 已统一为 neutral / tonal / solid 三个强调层级，Cedar 默认 neutral、Maple 默认 solid，保留原有默认外观，不再属于待决设计。

在 design-ui 运行 `node bin/token-inventory.mjs --check-consumers --summary` 验证未审消费候选为零；去掉 `--summary` 可查看声明条件、public/internal 层级、终端 CSS 属性和已审核运行时路径。普通字面引用只是线索，只有登记的实际绑定或有限动态名称可作为消费依据。扫描统计针对组件 token 文件，不是 foundation/system 所有变量的总数。

完成记录与后续验收见 `design-ui/audits/token-closure-progress.md`。实际 Chrome 已抽查两端 Message 三变体、主题切换、局部覆盖和关闭，以及 InputTag／输入控件和常用反馈组件；这不等于跨浏览器、真机触摸或全库视觉验收。本文后续带“阶段／本批”的范围、旧名称和数字是历史设计记录；如与当前状态冲突，以本节、完整变量参考和机器契约为准。

### FieldDecorator：状态专属入口

以下后缀属于 `--c-field-` / `--mp-field-`，两端职责相同：

| 变量后缀 | 默认值与消费场景 |
| --- | --- |
| variant-outline-border-color-error | system status-danger；outline 错误态的边框和焦点边框。 |
| variant-standard-line-color-error | field-error-color；standard 错误态的底线及焦点底线。 |
| variant-standard-line-color-disabled | system border-subtle；standard 禁用底线，优先于 error、focus、hover。 |

这些入口此前有声明但没有真实消费；现在局部覆盖会生效。普通错误提示文字仍使用 field-error-color，不因某个变体边框定制而跟着变化。禁用底线从错误的“文字禁用色”定义改为“弱边框”语义，默认渲染延续原有禁用边框颜色。公开 Token 的有效性必须同时验证声明、选择器消费和覆盖结果，不能只对齐名字。

逐变量名称、值与消费位置见[组件 CSS 变量参考](#/zh-CN/designTokenReference)。

## 完整收尾后的设计规则

### 同义、同值与平台差异分开管理

共享名称表示相同职责，不代表强迫桌面与触摸布局使用相同像素。系统变量的每个默认值都必须进入契约：跨端相同的值登记在 systemTokenValues，控件高度和浮层层级等明确差异登记在 platformSystemTokenValues。组件同值入口用 componentTokenValues；有依据的密度／结构差异用 platformComponentTokenValues。一个变量不能同时登记为共享默认和平台例外，避免两份事实来源。

字号、字重、间距、普通圆角和状态过渡优先消费对应 system 角色；不能因为数值碰巧相等就把图标尺寸、徽标点径或布局补偿绑定到 control-height。百分比、无单位比例、布局结构、循环时长与专属形状可以留在 component 层，必须说明原因。减少动态效果设置应停掉非必要过渡／循环，而不只是调暗颜色。

### 状态与定制的优先级

- filled 外壳由 FieldDecorator 单独负责，正常、hover、focus 递进；Form 只提供校验与说明，不再次绘制外壳。
- disabled / readonly 是交互约束，不能由子标签的 closable / checkable 或局部属性绕过。只读可以保持可读外观，但不得修改值。
- pressed（按下）、selected（持久选中）、focus（键盘／输入焦点）不是同一种 active。每个组件明确叠加规则，不能用统一的 hover 选择器覆盖所有状态。
- 颜色变量成对设计：背景与正文、图标、边框、关闭按钮分别有职责。透明背景必须先与真实宿主表面合成再计算对比度。
- 弹层／Teleport 的定制放到实际挂载祖先或弹层根节点；外层触发按钮上的变量不一定能继承过去。行内 color / textColor 是显式业务定制，不纳入默认主题的对比度承诺。

### Message 的三个强调层级

| variant | 场景与颜色职责 | 默认 |
| --- | --- | --- |
| neutral | 中性 overlay 面板，正文 primary，状态由图标表达，关闭按钮 secondary。适用于常规操作反馈。 | Cedar |
| tonal | 低强调状态底色，正文保持可读内容色，图标表达状态。适用于需要轻量区分状态的反馈。 | 两端显式选择 |
| solid | 高强调状态实色底，使用对应明亮／深色表面的前景；default/loading 保留专属深色面板。适用于强调提示。 | Maple |

两端统一 message-{variant}-{status}-{bg|content-color|icon-color|border-color|close-color}。status 为 default/info/success/warning/danger/loading。默认外观和平台密度保留，不把原移动端实色错误命名为 tonal；原隐式颜色变量直接迁移到明确变体，无别名。边框颜色的语义一致不代表必须给移动端新增边宽。

### 从声明到验收

变量必须有真实消费路径：本组件CSS、跨组件CSS、已登记的运行时绑定或有限动态名称展开。文档、注释、主题赋值和相互引用都不能单独证明变量有效。无实际功能的旧变量删除；已有DOM与职责却没接通的变量修复消费。自动目录提供每个变量的声明值、选择器条件、层级及传递消费属性，实际状态覆盖仍由针对性测试和浏览器验证。

新增或修改 Token 时同步五件事：源码及调用者、共享／平台契约、状态与覆盖测试、组件参考文档、迁移说明。自动生成的变量表不手工改；check:token-reference 防止它与源码漂移。

## 四层模型

| 层级 | 职责 | 外部使用 |
| --- | --- | --- |
| Foundation / reference | 原始色板、尺寸刻度等基础值 | 不建议业务直接依赖 |
| System | 跨组件的稳定语义角色 | 全局主题可以覆盖 |
| Component | 单个组件公开的定制入口 | 业务定制首选 |
| Internal | 组件实现细节 | 禁止外部依赖 |

## System 颜色语义

| 组 | Token | 场景 |
| --- | --- | --- |
| surface | `page / default / raised / overlay / muted / tooltip` | 页面、普通容器、浮层、覆盖层、弱化填充表面 |
| scrim | `sys-color-scrim` | 半透明遮罩；与承载内容的 surface 分开。 |
| content | `primary / secondary / tertiary / decorative / disabled / on-dark / on-bright` | 普通表面上的内容层级，及已确认深色／亮色底上的对比前景；后两者须成对选择 |
| content（语义色） | `brand / info / success / warning / danger` | 普通中性表面上的彩色文字、图标及同色描边；品牌色与 info/success/warning/danger 均使用对应色板第 6 阶 |
| border | `subtle / default / strong` | 弱分隔、常规边框、强调边框 |
| action | `primary` | 主操作及品牌交互强调 |
| status | `info / success / warning / danger` | 状态填充和强调色；普通表面上的可读彩色文字选对应 `content-*` |
| state | `hover / selected` | 与组件无关的通用交互状态表面 |

System Token 使用 `--mp-sys-{category}-{role}`。同一个颜色角色在 Cedar 与 Maple 必须映射到相同逻辑基础值，标准值由 `theme-contract.json#systemTokenValues` 管理。完成治理的公开组件 Token 默认值登记在 `componentTokenValues`，目前已覆盖 FieldDecorator、Collapse、Dialog、Card、Divider、Empty 与 Avatar 的关键颜色语义。Dialog 的边框、尺寸与布局允许平台差异。Card 悬浮按钮容器使用 `content-primary`，固定深色关闭按钮上的文字使用 `content-on-dark`；其 `#212121` 背景是组件专属值，不代表主操作色。Divider 线条使用 `border-default`、文字使用 `content-secondary`；文字留白 Cedar 为 `16px`、Maple 为 `8px`。Empty 描述使用 `content-tertiary`，非文字装饰图标使用 `content-decorative`。即使两端数值相同，也应检查组件默认值及主题覆盖是否使用正确的 system 语义，不能以相同的硬编码值代替语义。

Card 预发布变量迁移：`--mp-card-close-button-primary-color` → `--mp-card-close-button-background`，不保留旧名别名。

Avatar 也已纳入跨端颜色治理：文字、汇总数量和按钮图标使用 `content-primary`；描边使用 `surface-default`；仅深色遮罩图标使用 `content-on-dark`。默认 `fill-4` 背景、触发按钮 `fill-2 → fill-3` hover 阶梯、半透明遮罩是组件视觉值。按实例覆盖背景（`color` 属性）时须检查文字对比度，必要时覆盖 `--mp-avatar-text-color`；system 角色不能保证任意前景／背景组合的对比度。Maple 暗色 Avatar 背景 `#303030` 是主题专属组件值。

Badge 第三阶段治理：填充背景使用 `status-*`／`action-primary`，轮廓文字和描边使用 `content-info/success/warning/danger/brand`；default 轮廓使用 `content-primary`，secondary／tertiary 使用 `content-secondary`。轮廓背景变量对所有状态和 `color` 属性均生效。两端的 Maple 浅色品牌均为填充 primary 配置浅字。编译后的 CSS 验证覆盖 640 个内置配色组合及 64 个轮廓背景覆盖场景，填充文字最低 4.56:1，轮廓文字最低 4.97:1；自定义色与背景需重新验证，其余未登记变量仍待治理。

`content-brand` 引用 primary 第 6 阶；`content-info/success/warning/danger` 引用对应色板第 6 阶，适用于普通中性表面上的可读彩色文字、图标和同色描边。`content-brand` 与 `content-primary`（主要内容层级）、`action-primary`（主操作强调）职责不同；仅覆盖主操作色不会自动改变品牌文字色。

## Component 与 Internal

公开组件 Token 使用 `--mp-{component}-...`，必须在组件文档中说明；默认值优先引用 system Token。业务侧应优先覆盖这一层。

按实例属性写入的 CSS 变量（如 `--mp-divider-opacity`）是运行时传值通道，不代表 `:root` 中存在同名主题默认值；组件文档应标明来源。

Internal Token 使用 `--mp-internal-{component}-...`，只用于内部节点协作、运行时测量或不稳定实现。主题、业务代码和公开文档不得依赖它；需要开放定制时，应提升为公开 component Token。

## 选择顺序

1. 已有公开 component Token：直接使用。
2. 跨组件通用语义：使用或新增 system Token。
3. 单组件且需要外部定制：新增公开 component Token，以 system Token 作为默认值。
4. 纯实现细节：使用 internal Token。
5. 不添加无人消费的兼容别名来制造表面对齐。

## 命名与平台差异

Token 名顺序固定为：组件 → variant/status/size → interaction state → CSS property。状态统一使用 `hover`、`focus-visible`、`active`、`disabled`、`loading`、`selected`、`error`。

允许不同：控件高度、触控目标、移动端 safe-area、桌面 hover 能力、平台层级实现。禁止不同：system 颜色角色、同名组件 Token 的职责、状态名称和公开/私有边界。

## 完整 System Token 目录

以下用 `--{p}-` 表示平台前缀：Cedar 的 `p=c`，Maple 的 `p=mp`。颜色映射是跨端契约，不应因组件或主题作者的个人判断改变角色；主题可以改变基础色板的具体色值。完整机器可校验清单在 `theme-contract.json#tokens.system`，下表说明每个角色的职责。

| System 颜色后缀 | 默认基础值后缀 | 应用场景与边界 |
| --- | --- | --- |
| `surface-page` | `color-bg-1` | 应用页面底色；不用于弹窗。 |
| `surface-default` | `color-bg-2` | 卡片、普通容器及展开后的内容表面。 |
| `surface-raised` | `color-bg-3` | 高于普通内容的浮层，如 Dialog。 |
| `surface-overlay` | `color-bg-5` | 更高层的弹出内容表面；不是半透明遮罩。 |
| `surface-tooltip` | `#373739` | 明暗主题均保持深色的提示表面，搭配 on-dark。 |
| `scrim` | `rgba(0, 0, 0, 0.6)` | 半透明遮罩，不是正文表面。 |
| `surface-muted` | `color-fill-1` | filled 默认态或弱化填充；不是禁用态的统称。 |
| `content-primary` | `color-text-1` | 标题、主要正文及普通表面上的主要图标。 |
| `content-secondary` | `color-text-2` | 辅助文字、次要操作与 Divider 标签。 |
| `content-brand` | `primary-6`（RGB） | 普通中性表面上的品牌文字、图标及同色描边。 |
| `content-info` | `blue-6`（RGB） | 普通中性表面上的信息文字、图标及同色描边。 |
| `content-success` | `success-6`（RGB） | 普通中性表面上的成功文字、图标及同色描边。 |
| `content-warning` | `warning-6`（RGB） | 普通中性表面上的警告文字、图标及同色描边。 |
| `content-danger` | `danger-6`（RGB） | 普通中性表面上的危险文字、图标及同色描边。 |
| `content-tertiary` | `color-text-3` | 占位、低强调说明；必要时检查文字对比度。 |
| `content-decorative` | `color-text-4` | 空状态等非文字装饰图形；不可用于需要阅读的文字。 |
| `content-disabled` | `color-text-disabled` | 真正不可交互的内容；不能拿来表示装饰。 |
| `content-on-dark` | `color-white` | **已确认深色表面**上的文字与图标；背景可变时不能盲用。 |
| `content-on-bright` | `color-black` | **已确认亮色表面**上的文字与图标；暗色主题也保持深色，仍须按配色核验。 |
| `border-subtle` | `color-border-1` | 弱分隔、低强调边界。 |
| `border-default` | `color-border-2` | 普通控件描边与 Divider 线条。 |
| `border-strong` | `color-border-4` | hover 等需要更明确边界的状态。 |
| `action-primary` | `color-primary` | 品牌主操作及焦点强调；不是“颜色深”的同义词。 |
| `status-info` | `color-info` | 信息填充和强调色；普通表面上的可读信息文字使用 `content-info`。 |
| `status-success` | `color-success` | 成功填充和强调色；普通表面上的可读文字使用 `content-success`。 |
| `status-warning` | `color-warning` | 警告填充和强调色；普通表面上的可读文字使用 `content-warning`。 |
| `status-danger` | `color-danger` | 危险填充和强调色；普通表面上的可读文字使用 `content-danger`。 |
| `state-hover` | `color-fill-2` | 中性组件的 hover 表面；仅在可 hover 的设备上使用。 |
| `state-selected` | `color-primary-light-1` | 选中项的品牌浅色表面；不等于按下态。 |

非颜色 system Token 是跨组件可复用的基础节奏，名称相同但可允许平台密度不同。当前完整类别如下：

| 类别 | Token 后缀与标准值 | 设计用途 |
| --- | --- | --- |
| 间距 | `space-1…8` = `2 / 4 / 6 / 8 / 12 / 16 / 20 / 24px` | 内边距、元素间距与组合间距；新增刻度前优先复用现有八档。 |
| 圆角 | `radius-sm/md/lg/pill` = `2 / 4 / 8 / 999px` | 常规控件、容器和胶囊形状；圆形头像的 `50%` 属于组件几何，不必强套。 |
| 字号 | `font-size-xs/sm/md/lg/xl` = `12 / 13 / 14 / 16 / 18px` | 组件文字层级；超出刻度的大标题仍可作为组件专属值。 |
| 字重 | `font-weight-regular/medium/semibold` = `400 / 500 / 600` | 常规、强调和强强调；避免每个组件另造一套数字。 |
| 动效 | `motion-duration-fast/standard/slow` = `120 / 180 / 240ms`；`motion-easing-standard` = `cubic-bezier(0.4, 0, 0.2, 1)` | 普通交互时长；动效应尊重 `prefers-reduced-motion`。 |
| 层级 | `layer-behind/base/raised` = `-1 / 0 / 1`；`layer-popup/modal` 映射平台层级 | 组件堆叠关系；不要把某端的绝对 z-index 值当作跨端语义。 |
| 控件 | `control-height-xs/sm/md/lg/xl`；`control-touch-target` | 高度按平台密度确定：Cedar `28/32/36/40/44px`，Maple `44/48/52/56/60px`；触控目标两端均为 `44px`。 |

## 组件 Token 的设计维度

组件 Token 名应回答“哪个组件、哪个部位、什么视觉分支、什么状态、控制哪个 CSS 属性”。推荐顺序是 `--{p}-{component}-{part?}-{variant/status/size?}-{state?}-{property}`；可省略无关维度，不为对称而制造空变量。属性名要对应实际消费属性：控制背景用 `background`，控制文字用 `text-color`，不能用模糊的 `primary-color` 指代深色背景。现存历史名称可分批迁移，迁移必须同步契约与文档。

| 维度 | 何时需要 | 示例 |
| --- | --- | --- |
| part | 同一组件有多个独立可定制部位 | `dialog-title-text-color`、`card-close-button-background` |
| variant | 视觉结构互斥 | `field-decorator-variant-filled-background` |
| status | 信息或操作语义 | `dialog-status-danger-color` |
| size | 几何档位 | `card-size-sm-title-font-size` |
| state | 交互／可用性变化 | `field-decorator-variant-filled-background-hover` |
| property | 对应实际 CSS 职责 | `background`、`border-color`、`text-color`、`padding` |

状态 Token 只在需要不同值时创建；默认态、hover、focus-visible、active、disabled 的优先级由组件交互定义，不能仅依赖 Less/CSS 规则的书写先后。特别是 filled 输入框：默认 `fill-1`、hover `fill-2`、focus `fill-3`；同时 hover 与 focus 时 focus 必须胜出。`focus` 表示实际焦点样式，`focus-visible` 专指键盘可见焦点，不可混名。禁用态不应继续显示 hover/focus 强调。

组件默认值原则上从 system Token 引用；只有跨组件没有稳定语义的特定形状或对比表面，才允许组件专属常量，并在组件文档说明。例如 Card 的深色关闭按钮背景 `#212121`，不能因为它很醒目就映射到 `action-primary`。尺寸、触控目标与布局可以不同，但两端同名组件变量的职责必须相同。

## 覆盖与主题解析

推荐链路为 `foundation → system → component → CSS 消费点`。业务只改一个组件时覆盖公开 component Token；品牌／明暗主题改变跨组件角色时覆盖 system 或其基础色板。主题文件若直接写入组件 Token，同样要保持该 Token 的角色语义，不允许暗色主题把 `content-secondary` 偷换成无解释的 `#aaa`。组件样式消费 component Token，不越层直接使用基础色板。

```css
/* 只改变某个对话框，不影响其他浮层 */
.my-dialog { --c-dialog-background: #fff8ef; }

/* 改变整套主题的浮层表面 */
[data-theme='custom'] { --c-sys-color-surface-raised: #fff8ef; }
```

覆写组件背景时，应同时检查其文字、图标、边框和交互态的对比度；`content-on-dark` 只适合背景确实保持深色的场景。`var()` 的 fallback 仅用于明确的外部兼容边界或已记录的可选覆盖（如 VerificationCode 的实例 size 回退），不应掩盖缺失的内部 system Token。颜色混合和透明度属于需要解释的组件行为，不应靠孤立的硬编码颜色掩盖。

`--{p}-internal-{component}-...` 是私有实现变量，允许因内部重构改变。按实例由属性注入的变量则属于“运行时传值通道”，例如 Divider 的 `opacity`：它可能与公开组件 Token 同名空间，但没有可供主题作者覆盖的 `:root` 默认值。组件文档要明确是静态默认值、主题覆盖值、还是运行时写入值。

## 跨端治理与变更流程

1. 确定视觉职责：先判断是 surface、content、border、action、status、state，还是组件独有的几何值。不要因为现值相同就认定语义相同。
2. 查找现有角色；若无法准确表达，先讨论新增 system 角色或登记有理由的组件特例，不强行套用“最接近”的颜色。
3. 同步 Cedar 与 Maple 的 Token 名称、消费属性、默认值及主题覆盖；平台差异必须写明原因，必要时进入契约 allowlist。
4. 将共享默认值写入 `theme-contract.json#componentTokenValues`，新增 system 名称和值写入 `tokens.system` 与 `systemTokenValues`；更新组件文档和两端菜单镜像。
5. 检查亮／暗主题、hover/focus/disabled 组合、CSS 变量引用是否可解析；运行契约检查、相关组件测试、文档检查及差异检查。

早期颜色阶段从 FieldDecorator、Collapse、Dialog、Card、Divider、Empty、Avatar、Badge、Tag、Alert、Button 展开；当前已扩展为完整声明目录及颜色／非颜色契约。共享契约管理名称及已治理的默认值；尚未纳入 `componentTokenValues` 的组件变量并不自动合规。修改公开 Token 名称时先确认发布阶段，提供迁移映射，不能偷偷留下无人消费的别名。

## Tag：状态色、选中态与定制边界

Tag 的 default 是浅色填充，不是 Badge 的高强调实心背景。primary / info / success / warning / danger 的文字及 outline 同色描边分别使用 content-brand / info / success / warning / danger；secondary 与 tertiary 使用 content-secondary。彩色填充背景使用对应 primary / blue / success / warning / danger 色板第 1 阶，secondary 使用 gray-2，tertiary 使用 gray-1。这些背景是 Tag 专属配对表面，不新增含糊的通用 system 角色；不能仅因历史颜色相似就把 success / warning / danger 固定到 green / orange / red。

| 变量族（省略平台前缀） | 职责与使用场景 |
| --- | --- |
| tag-status-*-text-color / bg-color | 已选中 default 变体的成对前景与背景；修改背景须同时验证文字。 |
| tag-variant-outline-status-*-color | 已选中 outline 的文字与边框共用色；背景透明，不复用实心填充色。 |
| tag-variant-outline-default-color / default-border-color | 默认及未选中 outline 的中性文字、边框。 |
| tag-default-bg / default-bg-hover | 中性已选中 default 背景：fill-2 → fill-3；不是输入框的 fill-1 → fill-2 → fill-3 规则。 |
| tag-bg-not-checked-hover | 未选中可交互 Tag 的中性 hover 背景，使用 state-hover。 |
| tag-default-text-color / default-icon-color | 默认文字 content-primary、默认前缀图标 content-secondary。 |
| tag-custom-text-color | 自定义 default 背景且未传 text-color 时的前景；默认 content-on-dark，调用方必须保证背景够深。 |
| tag-{色名}-* | color 预设色板入口，不表达成功、警告等业务语义；彩色前景使用色板第 9 阶、灰色使用 content-secondary；默认配色的非 loading、已选中状态纳入预设对比度检查。 |
| tag-size-* / padding-* / icon-* / close-* | 密度与部位几何；保留桌面紧凑、移动较大的尺寸，不机械统一像素。 |

交互规则：非 checkable 的 Tag 按已选中呈现；checkable 未选中时状态配色不生效，hover 只显示中性提示；已选中状态配色不能被通用 hover 覆盖。中性已选中 default 支持独立 hover；已选中 outline 保持透明。loading 不参与本批中性／状态 hover 强调。此规则不改变 checked 的受控事件协议。

覆盖顺序：color（预设色或自定义色）优先于 status；text-color 只用于显式文字定制。自定义 default 背景没有自动对比度推导，自定义 outline 使用 color 作为描边及未指定 text-color 时的文字。业务改色需验证可读性。预设色的 outline、hover、暗色 Token 覆盖已补齐，详见后文；几何／动效与预设色对比度已在后续收尾阶段登记。

本批新增 28 项 Tag 默认值契约。运行 design-ui 的 pnpm check:tag-themes：编译两端实际 Less，并检查 2 平台 × 2 品牌 × 2 明暗 × 8 状态 × 2 变体 × 2 选中 × 2 hover × 2 loading，共 1024 个级联组合；已选中、非 loading、非 hover 的默认配色在五类 system 表面上检查 640 组文字对比度，最低 4.681:1。脚本使用 DOM 选择器匹配和针对现有选择器的 specificity 计算，不代替真实浏览器视觉验收；不涵盖任意业务背景、预设／自定义色或 loading 透明度。主题或选择器结构改变时应同步扩展检查器。

## Alert：信息语义与主题继承

Alert 使用 status=info/success/warning/danger/default 和 standard/tonal/outline 三种变体。彩色标题、正文、图标及 outline 描边使用对应 sys-color-content-info/success/warning/danger，而不是 status 填充色；默认标题使用 content-primary，正文和图标使用 content-secondary，默认描边使用 border-default。

| 公开变量族（省略平台前缀） | 默认来源与场景 |
| --- | --- |
| alert-standard-{status}-bg / border | 彩色背景取 blue/success/warning/danger 第 1 阶，弱描边取第 3 阶；用于信息容器，不是交互按钮边界。 |
| alert-tonal-{status}-bg | 与 standard 同浅底，仅去掉描边，不再描述为“加深一档”。 |
| alert-outline-{status}-border | 彩色描边与可读 content 同色；背景透明，依赖外层表面。 |
| alert-{variant}-{status}-title / content / icon | 分别控制标题、正文、状态图标；彩色三者使用同一语义角色，但保留独立定制入口。 |
| alert-{standard/tonal}-default-bg | 中性 fill-2 配对表面，属于组件静态背景，不借用名称含 hover 的交互角色。 |
| alert-{variant}-{status}-content | 同时作为根容器继承色，保证关闭图标及未显式设色的 action/正文插槽跟随信息语义；自带颜色的业务组件不被强制覆盖。 |
| alert-padding-* / icon-size / *-margin-* / font-* / line-height* | 布局、图标及文字几何，独立于颜色；Maple 暗色仍保留现有较大图标和内边距，未在本批强行统一。 |

颜色链路为 foundation → system content / component-specific paired surface → component → CSS。标准变体的第 3 阶边框是弱分隔，不承诺作为控件边界的 3:1 对比度；不能把这项检查误认为所有边框都已满足非文本对比度要求。未增加新的 system Token，也未更名公开变量。

Maple 暗色主题移除独立的 Alert 颜色覆盖，继承同一组件默认值并由暗色色板解析，避免 info 从 blue 变为另一套 info 色，以及正文层级、透明混色随平台漂移。保留的主题尺寸不属于共享颜色契约。color 属性只覆盖背景，不会自动选择文字色；修改背景时需要同时检查 title/content/icon，以及继承正文颜色的关闭图标和操作内容。业务自定义颜色、图片背景和自行设色插槽不在默认配色保证范围内。

本批登记全部 65 项 Alert 颜色默认值；几何和动效仍待治理。运行 design-ui 的 pnpm check:alert-themes（或 node bin/alert-theme-check.mjs）：编译两端 Less，覆盖 2 平台 × 2 品牌 × 2 明暗 × 3 变体 × 5 状态，共 120 组；对五类 system 表面的标题、正文、状态图标、关闭图标及继承色操作内容检查 3000 组前景配对，最低 4.802:1。另验证局部 title/content/icon 变量能到达消费点。此检查使用实际 CSS 的选择器匹配与级联计算，不替代真实浏览器视觉验收。Tag 与 Alert 共用解析工具，后续组件应扩展同一工具而不是复制临时脚本。

## Button 大阶段：四种变体与交互状态

本阶段完成 Button 的颜色与交互状态闭环，不代表所有组件或 Button 几何、动效已经完成治理。覆盖 8 种 status、default/text/outline/tonal、icon-container、两套品牌的明暗主题，以及 hover/active/focus-visible/disabled/loading。不改 Props 名称或事件协议。

### 颜色职责与历史变量名

| 公开变量族（省略平台前缀） | 职责、默认值与使用场景 |
| --- | --- |
| button-{status}-color | 普通 default 变体的实心背景。primary 使用 action-primary，info/success/warning/danger 使用 status-*；default 使用 surface-default，secondary/tertiary 为 gray-6/7。不能再直接当 text/outline 的文字。 |
| button-{status}-text-color | 普通 default 的对比前景。彩色与 secondary 默认用 content-on-bright；tertiary 浅色用 on-dark、暗色用 on-bright；default 用 content-primary。Maple 品牌浅色的深橙 primary 使用 on-dark。 |
| button-{status}-icon-color | 历史名称保留，实际是 text、outline、tonal 及 default icon-container 的可读前景。primary 使用 content-brand，业务状态使用对应 content-*，default 使用 content-primary，secondary/tertiary 使用 content-secondary。不是只作用于图标。 |
| button-{status}-icon-container-color | 历史名称保留，实际是 tonal、default icon-container 及透明变体交互反馈的浅色表面。彩色取 primary/blue/success/warning/danger 第 1 阶；secondary/tertiary 取 gray-2/1；default 使用 surface-muted。 |
| button-disabled-color / disabled-text-color / disabled-solid-text-color / {status}-disabled-color | 中性禁用底色／文字、彩色实心禁用文字和状态淡色；按 variant 与 status 使用。text/outline 保持透明，tonal 保留浅底，disabled 暂停内联颜色覆盖。 |
| button-focus-color / focus-width / focus-offset | 焦点环独立于按钮文字，默认 content-brand / 2px / 2px；避免实心按钮的白色文字变成白底上不可见的焦点环。 |

Maple 暗色不再用一套独立的白字与实心图标容器颜色覆盖上述关系；它继承组件默认值及暗色色板。只保留现有几何覆盖。两端同名 Token 职责相同，不要求把所有尺寸都套成输入框的控制高度。

### 交互反馈与优先级

| 变量 | 用途 |
| --- | --- |
| button-state-opacity-hover / active | 实心、tonal 与图标容器覆盖层强度，默认 0.08 / 0.12。 |
| button-plain-state-opacity-hover / active | text/outline 使用浅色容器的反馈强度，默认 0.5 / 1；不直接以高饱和状态色压在文字后面。 |
| button-{status}-state-layer-color | 普通实心按钮覆盖层颜色。彩色和 secondary 用浅色层搭配深字；tertiary 浅色模式用深色层搭配浅字，暗色反过来；Maple 品牌浅色 primary 同样使用深层搭配浅字。default 用 content-primary 产生中性反馈。 |
| button-state-layer-color | tonal 和图标容器的覆盖层，默认 surface-page；不承担所有变体的统一着色。text/outline 的层颜色来自对应 icon-container-color。 |
| internal-button-state-layer-color / internal-button-state-opacity-* | 私有解析变量，将变体和状态选择映射为覆盖层使用值；业务不可覆盖或依赖。 |

优先级是 disabled/loading 阻止交互反馈，active 高于 hover，focus-visible 独立叠加；禁用不保留焦点强调。实心 default 的 icon-container 颜色必须高于 variant × status，不能因为 class 同时存在而被实心配色覆盖。覆盖层在隔离的层叠上下文中位于内容之后，不覆盖文字、图标或 loading 内容。原有瞬时 ripple 动画保留，不作为稳定状态对比度承诺的一部分。

loading 保留按钮原来的视觉配色但阻止激活；加载指示器默认传 currentColor，跟随按钮前景，显式 loading-color 仍优先。色彩定制边界：color/text-color、loading-color、直接 style 和自行设色的插槽属于使用者定制，不保证任意配对可读；只改背景时必须同时检查实心文字、浅色变体、交互层和焦点环。禁用配色不要求满足普通可操作文字的 4.5:1 检查。

### 契约与验收

Button 阶段新增 13 个公开交互层变量、48 项颜色／状态默认值；截至该阶段共享契约累计 223 项组件默认值，最新总数见浮层阶段。组件文档列出完整 :root 默认值和明暗／品牌例外；不为旧名字另造重复别名。

运行 design-ui 的 pnpm check:button-themes（或 node bin/button-theme-check.mjs）。编译实际 Less，覆盖 2 平台 × 2 品牌 × 2 明暗 × 8 状态 × 4 变体 × 2 icon-container × 3 可用性 × 2 hover × 2 active × 2 focus，共 12288 个级联组合。启用及 loading 的默认前景在五类 system 表面上检查 40960 组配色，最低 4.563:1。disabled 对比度、业务定制和瞬时 ripple 不在此数字内。另有原生 button/a、禁用自定义色恢复、loading 继承和事件阻断测试；真实浏览器抽查基础明暗四变体、禁用、键盘焦点和 hover 层叠。解析检查不是跨浏览器截图测试，也不意味着全仓 lint／主题快照基线已清零。

## 浮层与提示：表面、遮罩、箭头

本阶段治理 Tooltip、Popover、Overlay、Trigger，新增两个 system 颜色：

| 角色 | 默认值 | 意义与场景 |
| --- | --- | --- |
| `sys-color-surface-tooltip` | `#373739` | 明暗主题都保持深色的紧凑提示表面，搭配 `content-on-dark`；不是随模式反转的 inverse surface。主题改变它时须成对验证文字。 |
| `sys-color-scrim` | `rgba(0, 0, 0, 0.6)` | 压暗被遮挡内容的半透明黑色遮罩；不承担正文背景，不通过父节点 opacity 实现。 |

`surface-overlay` 仍是 Popover 等弹出内容的实体表面，映射 `color-bg-5`，不能用于替代 scrim。Tooltip 中性提示采用固定深灰，使两端提示外观一致；彩色 status 背景继续使用 `action-primary/status-*`，不是浅色文字专用背景。默认彩色文字使用 `content-on-bright`；两端 Maple 浅色品牌的深橙 primary 使用 `content-on-dark`。

Maple 暗色主题删除 Tooltip 颜色／opacity、Popover 背景和 Overlay 背景的旧覆盖，避免绕过 system。Tooltip 默认 opacity 在两端所有内置主题均为 1；降低它会同时淡化内容和箭头，须重新检查对比度与连接处。

Tooltip 与 Popover 的箭头和内容读取同一个组件背景 Token；Popover 边框也成对读取。上层组件箭头选择器优先于 Trigger 默认箭头，避免 CSS 加载顺序改变外观。Trigger 单独使用时仍以 `surface-overlay` 作为箭头默认背景；它不定义业务内容表面。

### 外部定制和继承边界

- 全局主题使用 system；单个组件优先使用 Tooltip／Popover／Overlay 的公开变量。不要为定制 Tooltip 箭头而覆盖 Trigger 背景变量。
- 浮层可能 Teleport：变量必须落在实际 popup 的祖先作用域；只放在触发按钮上不会跨 DOM 自动继承。可通过 `popup-style` 设置公开变量，使内容与箭头共同继承。
- Tooltip `color` 同时设置内容／箭头背景，`text-color` 设置内容文字；`content-style` 和 `arrow-style` 是各节点的显式覆盖，优先于这些默认属性。只改 content-style 的背景不会自动改箭头。自定义颜色必须成对检查。
- Popover 可用 popup-style 上的 `--{p}-popover-background` 同时改变箭头与面板；content-style／arrow-style 的直接颜色属性会覆盖变量消费。
- Overlay 的 background-color 只影响 backdrop，不给内容设置 opacity。内部定位／测量变量不构成公开主题入口。

### 契约、差异与验证范围

共享契约新增 35 项组件默认值：Tooltip 全部 23 项、Popover 的 4 项颜色、Overlay 全部 3 项、Trigger 全部 5 项。累计 64 个 system 名称、29 个 system 标准值、258 个组件默认值。

Popover 阴影保留 Cedar shadow2-down 与 Maple 三段阴影的平台差异；Maple 暗色 Tooltip 保留圆角 4px、字号 14px、纵向／横向内边距 8px／16px，Popover 保留圆角 2px。这些几何主题例外不等于同名语义不同，后续密度／动效阶段继续评估。此浮层阶段尚未涉及 Dialog／Popup；其后续治理见下方模态表面阶段，仍不能宣称所有局部遮罩已统一。

`check:floating-themes` 已纳入共享主题检查：编译两端 Less，读取品牌与明暗主题覆盖，验证 72 个组合、320 对文字颜色（5 种宿主表面），最低 5.178:1；同时检查主体／箭头配色、公开变量实际消费及 Trigger 最后加载时的优先级。该检查不代替浏览器布局测试，不涵盖任意自定义色、透明度或入退场动画中间帧。

## 模态表面阶段：Dialog、Drawer、Popup

本阶段把两端 Dialog、Cedar Drawer、Maple Popup 接入上一阶段定义的 scrim。Drawer 与 Popup 是平台组件，不为凑齐名称而在另一端创建无人消费的变量。

| 消费者 | 公开组件变量（省略平台前缀） | System 默认语义 |
| --- | --- | --- |
| Dialog（两端） | `dialog-overlay-background` | `color-scrim` |
| Dialog（两端） | `dialog-background` | `color-surface-raised` |
| Drawer（Cedar） | `drawer-overlay-bg / drawer-bg` | `color-scrim / color-surface-raised` |
| Drawer（Cedar） | `drawer-header-text-color / drawer-content-text-color` | `color-content-primary`；关闭按钮也用标题颜色 |
| Drawer（Cedar） | `drawer-border-color` | `color-border-default` |
| Popup（Maple） | `popup-overlay-background-color` | `color-scrim` |
| Popup（Maple） | `popup-content-background-color / popup-content-text-color` | `color-surface-raised / color-content-primary` |

### 变量必须连接实际节点

Maple Dialog 之前只声明了遮罩变量，引用的基础变量不存在，实际遮罩却消费 Popup 变量。这种“名称对齐但没有消费者”的状态不算完成治理。现在通过限定到 Dialog 容器的选择器直接消费 Dialog 遮罩变量，优先于通用 Popup 规则；独立 Popup 不受影响。检查会故意后加载 Popup CSS，防止顺序回归。

Maple 暗色主题删除 Dialog 背景、标题和正文硬编码覆盖，以及 Popup 背景／遮罩旧覆盖。两端 Dialog 标题和正文继续使用 content-primary，关闭按钮使用 content-secondary。Dialog 的四种状态图标从 status 填充角色迁到对应 content 状态角色，使普通面板上的图标有足够对比度。字段名保留，改变的是正确的语义映射；自定义图标、面板或品牌色仍需重新验证。

Popup 新增公开 `--mp-popup-content-text-color`，与面板背景成对定制；`unstyled` 同时停用默认背景和文字色，交给业务内容自行配色。Popup 的声明移到 token.less，主样式只负责消费。Drawer 不再在组件 Less 中内嵌整套主题；基础样式仍由 style/index.ts 引入。移除未被任何样式消费的 Drawer close-icon-right 变量，不保留无效别名；关闭按钮仍由标题布局与 close-btn-margin-left 控制。

### 实例定制与 Teleport

- 全局遮罩统一覆盖 `--{p}-sys-color-scrim`；局部遮罩优先使用各组件的公开变量。
- Dialog／Drawer 的遮罩与面板是兄弟节点：overlay-style 作用于遮罩，dialog-style／drawer-style 作用于面板；变量不会从面板继承给遮罩。
- Maple Popup 的 style 透传到内容节点；遮罩使用 overlay-style。在面板上设置 scrim 并不会改变其兄弟遮罩。
- Teleport 后，变量按实际 DOM 祖先继承，而不是按 Vue 调用位置继承。共同作用域主题放在实际挂载祖先或全局主题中。
- 显式 backgroundColor 样式覆盖变量消费。遮罩透明度使用颜色 alpha，不给面板或公共父节点设置 opacity。
- 多个遮罩叠加会按 alpha 合成变深；统一 Token 不代表只能存在一个遮罩，本阶段不改变模态堆栈逻辑。

### 契约与验证边界

共享契约更新 Dialog 的 5 项既有默认值（遮罩及四种状态图标），不增加共享组件数量。仍为 64 个 system 名称、29 个 system 标准值、258 项共享组件默认值。平台专属 Drawer 的 5 项颜色与 Popup 的 3 项颜色由 `check:modal-themes` 验证，不计入共享默认值总数。

检查编译后的真实 Less，覆盖 16 个平台／品牌／明暗组合、72 组文字及图标配色，最低 5.102:1；同时验证组件覆写、全局 scrim 传播、Dialog 与独立 Popup 的隔离、unstyled 边界及加载顺序。组件测试使用实际 Teleport 目标，不依靠 transition stub 验证直接子节点结构。颜色检查不等于浏览器视觉或动效验收，不覆盖任意自定义色、嵌套遮罩组合或动画中间帧。

本阶段保留各平台几何、圆角、阴影、动效和层级默认值。头像、图片预览等组件的局部遮罩是否属于同一种 scrim，需按用途继续判断，不能批量替换所有半透明黑色。

## 反馈组件阶段：Message、Notification、LoadingBar（历史记录）

> 以下记录统一变体之前的端侧颜色治理。旧 Message 名称已迁移到三变体接口，原“待迁移”结论不再是当前待办；现行模型见前文 Message 强调层级。

本阶段处理两端 Message、Cedar Notification 和 Maple LoadingBar 的颜色角色、暗色覆盖和实际消费者。统一的是语义职责，不在没有变体设计的情况下把移动端彩色提示强行改成桌面端中性面板。

| 消费者 | 表面／色块 | 前景／指示色 | 说明 |
| --- | --- | --- | --- |
| Cedar Message | 所有状态使用 surface-overlay；边框 border-default | 正文 content-primary，关闭 content-secondary；图标按 content 状态色 | default 图标 primary；loading 图标 brand；info 使用 info 而非品牌填充色 |
| Cedar Notification | 所有状态使用 surface-overlay；边框 border-default | 标题／正文 content-primary，关闭 content-secondary；图标按 content 状态色 | normal 图标 primary；现有 error 名称映射 content-danger，不新增危险色别名 |
| Maple Message：default／loading | 组件专属深色 #333 | content-on-dark | 保留现有移动提示外观，不冒用 surface-overlay 或 scrim |
| Maple Message：彩色状态 | status-info/success/warning/danger | content-on-bright | 浅色文字不能默认适配所有状态填充；必须成对设置前景和背景 |
| Maple LoadingBar | 细线本身为可辨识的内容标记 | content-brand／content-danger | 普通／失败状态，不使用 action／status 填充阶；背景由宿主页面决定 |

### 实际消费与外部定制

- Maple 新增四个公开变量：message-info-color、message-success-color、message-warning-color、message-danger-color（完整前缀为 `--mp-`）。message-color 继续控制 default／loading，不再默认为所有背景提供同一个浅色前景。
- Maple Message 的图标、正文、纯文本 action、关闭按钮和 currentColor 焦点描边共享对应状态前景。插槽内的 Button、链接或自带颜色的节点不会自动变成合适配色，业务必须单独验证。
- Cedar Message／Notification 根节点消费当前状态的正文颜色，保证未自行着色的 action／footer 文本可读。Notification normal-icon-color 现在有真实消费者，定制默认图标颜色不再失效。
- Maple 暗色主题移除这些组件的旧颜色覆盖，保留既有尺寸；Message 的专属深色表面留在 component 层，不把固定 #333 冒充通用系统表面。
- Maple Message／LoadingBar 的公开声明集中到 token.less；Cedar Message／Notification 不再在组件 Less 内嵌整套基础主题，由 style/index.ts 负责依赖。
- 全局主题在实际挂载祖先提供 system 变量；局部定制优先用对应 component 变量。Teleport 不改变 CSS 的 DOM 继承规则。LoadingBar 的 color／errorColor 选项显式覆盖默认变量，改变颜色或页面背景后须重新检查。

### 治理范围与仍待处理的差异

新增 `check:feedback-themes`，纳入共享检查入口，按各平台现有名称治理 63 项颜色默认值：Cedar Message 25、Notification 26、Maple Message 10、LoadingBar 2。编译真实 Less 并读取暗色和品牌覆盖，检查 76 个组合、1500 组前景／表面配色，最低 4.681:1，同时验证映射与公开变量消费。

这些实现的颜色矩阵尚不属于同名共享组件默认值契约，因此不增加 258 项共享默认值总数；两端仍为 64 个 system 名称、29 个 system 标准值。Message 的颜色后缀、状态背景形态仍有平台差异，后续需要单独设计变体与命名迁移，不能把本阶段描述为完整 API／Token 名称对齐。Notification 和 LoadingBar 是平台专属组件，不在另一端创建空壳。

几何、阴影、动效、关闭按钮交互细节以及其余历史变量的消费审计不在本阶段；不以颜色检查替代浏览器视觉验收。检查覆盖内置静态配色，不包括自定义插槽颜色、业务背景和动画中间帧。LoadingBar 在五类内置表面上按更严格的 4.5:1 检查；这不意味着任意宿主背景都自动合规。

## 输入与菜单颜色阶段：Input、AutoComplete、Select

本阶段只收敛这三个组件的颜色职责及其默认值，不把输入外壳、菜单选项和反馈图标当成同一种交互表面。新增 26 项共享颜色默认值契约：Input 5 项、AutoComplete 10 项、Select 11 项；共享总数从 258 增至 284，system 名称／默认值仍为 64／29，组件名称契约仍为 35。没有新增或重命名公开变量。

### Input：反馈与输入外壳分开

以下逻辑变量名省略 `--c-`／`--mp-` 前缀；表中的 system 名也需补上对应前缀。

| 变量 | 默认引用 | 职责与定制场景 |
| --- | --- | --- |
| input-counter-color | field-suffix-text-color | 字数统计；跟随字段辅助内容色，可单独覆盖 |
| input-feedback-success-color | sys-color-content-success | 成功反馈 SVG 的 currentColor |
| input-feedback-warning-color | sys-color-content-warning | 警告反馈 SVG 的 currentColor |
| input-feedback-error-color | sys-color-content-danger | 错误反馈图标，不复用填充型 field-error-color |
| input-feedback-validating-color | sys-color-content-brand | 校验中图标；转动时仍需与字段背景可辨识 |

输入背景、边框、光标和焦点环仍属于 FieldDecorator／原生输入样式；Input 的反馈变量不负责这些部位。覆盖 field-error-color 或 field-focus-color 不再连带改变反馈图标，需覆盖对应 input-feedback 变量。filled 的 fill1 → fill2 → fill3 规则没有改变。禁用、只读、校验状态的业务行为也没有修改。

Maple 暗色 Field 的历史覆盖会把 filled 改回 fill2／fill3／普通背景，还会覆写正文、辅助文字、错误及边框色。本阶段移除这些旧颜色覆盖，仅保留几何配置，使暗色也遵循 FieldDecorator 的既有语义契约；不是新增另一套暗色状态阶梯。检查显式载入 dark/field.ts，防止只验证 token.less 而漏掉主题覆写。

### 菜单：同样的颜色角色，不同的变量命名

下表为完整的本阶段菜单颜色契约。AutoComplete 保留已有 option 名称，并在自己的 dropdown 根节点映射到 Select 变量；不新增另一套菜单规则。公开覆盖应使用所属组件的变量，不依赖这层内部适配。

| AutoComplete 后缀 | Select 后缀 | 默认 system 角色 |
| --- | --- | --- |
| popup-bg | popup-bg | surface-overlay |
| popup-border-color | popup-border-color | border-default |
| option-bg-default | popup-option-bg | surface-overlay |
| option-bg-hover | popup-option-bg-hover | state-hover |
| option-bg-selected | popup-option-bg-selected | surface-overlay |
| option-bg-disabled | popup-option-bg-disabled | surface-overlay |
| option-text-color-default | popup-option-text-color | content-primary |
| option-text-color-hover | popup-option-text-color-hover | content-primary |
| option-text-color-selected | popup-option-text-color-selected | content-primary |
| option-text-color-disabled | popup-option-text-color-disabled | content-disabled |
| 无独立分组标题变量 | popup-group-title-text-color | content-secondary |

完整名称例如 `--c-auto-complete-option-bg-hover` 与 `--mp-select-popup-option-bg-hover`。Select 的分组标题使用 secondary 而不是 tertiary：它是可读的小字号标题，不是禁用信息。Maple 暗色不再单独覆写 selected 为品牌文字和 selected 背景；两端都从相同默认角色解析暗色值。

菜单中的 active 是键盘导航项，使用 hover 配色，不是鼠标按压层级。颜色优先级为 disabled > active／hover > selected > default；selected 的字重仍保留，颜色相同不代表丢失选择状态。业务覆盖 selected 颜色后，与 hover 叠加时仍由 hover 颜色胜出，这是明确的导航反馈规则。

### 检查范围与边界

`check:selection-themes` 已纳入共享主题检查入口：编译真实 Less，覆盖两端、两个品牌、明暗主题，共 384 个状态组合、296 组对比度。正文／字数／分组标题至少 4.5:1；反馈图标是非文字指示，至少 3:1。本次矩阵最低 3.991:1 出现在图标检查，不能把它说成正文最低标准。禁用项检查优先级及变量消费，不宣称符合正文对比度门槛。

检查通过哨兵色逐项验证本阶段颜色变量的实际消费者，包含 AutoComplete 的局部映射。它不等于浏览器视觉验收，也不覆盖自定义插槽颜色、任意业务背景、伪元素、动画中间帧或 Teleport 祖先继承；弹层局部定制仍必须放在真实挂载祖先或 popup 根节点。此次未治理 Input 尺寸、菜单几何／阴影及 Select highlight 历史变量，也没有处理 Checkbox／Radio／Switch／Form／Textarea 的独立 Token。

## 选择控件颜色与状态优先级：Checkbox、Radio、Switch（历史记录）

> 此节记录最初的颜色／优先级范围；后续 Switch 配色、RadioButton 与非颜色收尾见对应组件规范和当前契约，不把阶段性未覆盖项重复视为未完成。

本批为 Checkbox、Radio 各登记 6 项颜色默认值，共新增 12 项；变量名称和尺寸 API 不变。Maple 的默认值移入各组件的 token.less，暗色主题仅保留移动端几何，不再重新写死颜色。

| 公开变量后缀（checkbox / radio） | 两端相同的 system 角色 | 意义与使用场景 |
| --- | --- | --- |
| control-color | content-secondary | 未选中轮廓／图标；这是识别控件的非文字内容，不是装饰性边框 |
| control-color-checked | content-brand | 选中与半选标记；需要与所在表面保持辨识度，不直接等同于 action-primary 按钮填充 |
| control-color-error | content-danger | 可交互控件的校验错误轮廓／标记，不改变标签正文色 |
| control-color-disabled | content-disabled | 禁用标记；禁用优先于错误、选中颜色和 hover |
| label-text-color | content-primary | 标签正文；错误说明由表单反馈承担 |
| label-text-color-disabled | content-disabled | 禁用标签；移动端标签自身的 disabled 类必须消费此变量 |

以上后缀分别加 --c-checkbox- / --mp-checkbox- 或 --c-radio- / --mp-radio-。局部覆盖放在组件真实 DOM 祖先上。Maple 已有 checked-color / unchecked-color 属性仍是内联颜色覆盖，优先于 CSS 变量；需要系统状态色时不要同时传这些自定义颜色。自定义插槽、任意业务背景与属性颜色需自行验证对比度。

状态规则：disabled > error > checked / indeterminate > unchecked；hover 仅提供可交互提示，不取消选中或错误。Cedar 修复错误边框被 hover 覆盖、Checkbox 半选禁用缺失及禁用 hover 恢复普通边框；RadioButton 的错误色也不再被普通选中规则覆盖。Maple 错误色仅作用于 action，不染标签，且不覆盖 disabled。

Cedar 的内部勾选／半选标记及 Radio 圆点用 surface-default 表达“镂空表面”，与 content-brand / content-danger 的实心标记成对使用；这不是通用“彩色背景上的文字”角色。internal 变量仍不是跨端公开承诺。桌面 14px 与移动 24px 的控制尺寸及命中区域继续保留，未作机械数值统一。

Switch 本批仅修复状态优先级：可交互 error 轨道高于 tonal 未选中背景；disabled / loading 保留正常 checked 状态并抑制错误覆盖。现有自定义轨道颜色在普通状态保留，校验错误仍使用 error Token。轨道、滑块、文字及 tonal 配对颜色尚未登记共享默认值，不能据此声称 Switch 配色已统一；RadioButton 的完整配色、伪元素和几何也仍需后续审计。

回归入口：design-ui 的 pnpm check:choice-themes（也可直接 node bin/choice-theme-check.mjs），已接入 check:theme-contract。覆盖两端 × 两品牌 × 明暗主题共 832 个状态组合；Checkbox / Radio 校验 640 组颜色对比（标签 ≥4.5:1、控件 ≥3:1），最低 4.681:1。哨兵色检查公开颜色变量的消费者；Switch 仅检查四种变体与 checked / disabled / loading / error 的级联结果。禁用态不设对比阈值。此检查不是浏览器视觉验收，不覆盖伪元素绘制、动画、焦点环及内联自定义色。

## 表单说明与多行输入：Form、Textarea

本批新增 5 项共享颜色默认值：Form 3 项、Textarea 2 项；不新增或重命名公开变量。默认值集中到 token.less，Maple FormDetails 暗色主题不再用 #888 或 action 填充色覆盖文字语义。

| 变量后缀 | 默认角色 | 消费者与场景 |
| --- | --- | --- |
| form-label-text-color | content-primary | 表单标签正文，不随校验错误染色 |
| form-extra-text-color | content-secondary | Cedar 的 extra / 普通 help，Maple 的 help；辅助说明仍需可读 |
| form-required-symbol-color | content-danger | 必填标记，不是错误背景填充 |
| textarea-placeholder-color | content-secondary | 原生 textarea 的 placeholder；两端均实际消费，默认焦点／错误不会把它改成品牌／错误色 |
| textarea-counter-color | content-secondary | 字数统计；Cedar 位于输入区内，Maple 位于输入区外，因此同时按 filled 各级背景校验 |

上表分别添加 --c- / --mp- 前缀。Cedar 的 form-tooltip-text-color 使用 content-secondary；status-success / warning / error / validating 的 tip-text-color 与 tip-icon-color 分别使用 content-success / warning / danger / brand。它们是桌面扩展，不伪造移动端同名变量。Maple FormDetails 使用自己的 error-message-color（content-danger）和 extra-message-color（content-secondary）；Form 的 extra 属性由 FormDetails 展示，因此定制该段应覆盖 --mp-form-details-extra-message-color，而不是 --mp-form-extra-text-color。组件组合不意味着所有子组件变量自动别名化。

Textarea 的 disabled 优先于 error，placeholder 及原生禁用文字使用 field-control-text-color-disabled。Maple 显式 blur-color / focus-color 仍可定制可交互、非错误状态的 placeholder；未传属性时不再写入内联默认值，从而允许祖先 CSS 变量覆盖。disabled 时也不再注入 text-color。hint 模式由 FieldDecorator 的标签承担提示，不能用 textarea-placeholder-color 定制浮动标签。

职责边界：Form 管理标签、说明、必填符号与校验反馈；FieldDecorator 管理 outline / filled / standard 外壳。Cedar Form 不再通过旧 selection-field 选择器重绘背景、边框与焦点阴影，避免校验状态破坏 fill1 → fill2 → fill3。Picker 等旧状态适配仍保留；InputTag 的旧重绘规则已在后续阶段移除，详见后文；本批不宣布所有 form-status-* 背景变量已统一。两端高度、间距、计数器位置、清除按钮布局与其它几何差异未改。

检查入口：pnpm check:form-textarea-themes（或 node bin/form-textarea-theme-check.mjs），已接入 check:theme-contract。两端 × 两品牌 × 明暗主题共 276 项消费者／状态检查、200 组对比检查，最低 4.681:1。Form 说明／反馈校验 surface-default 与 surface-muted；Textarea 额外校验 state-hover 与 fill3。文字阈值 4.5:1，反馈图标 3:1；禁用态无对比阈值。检查扩展到编译后的 ::placeholder 选择器，并用哨兵色验证覆盖能到达消费者，但不等于真实浏览器伪元素、焦点、主题切换或自定义背景的视觉验收。

## Switch：实心轨道与 tonal 变体的成对配色

当前主题入口为 Themes.default.light / dark 与 Themes.maple.light / dark。Switch 的 tonal 是造型，不是主题；公开变体与八项专用变量统一使用 tonal 命名，不保留旧名称别名。

本阶段登记 10 项共享颜色默认值，其中 8 项为既有变量，新增 tonal-text-color / tonal-handle-color 两项。两端只差 --c-switch- / --mp-switch- 前缀。规范变更记录位于 Cedar openspec/changes/govern-switch-colors；Maple 暗色主题不再单独写死轨道及文字颜色。

| Switch 变量后缀 | system 默认角色 | 职责 |
| --- | --- | --- |
| track-background | content-secondary | 普通未选中实心轨道 |
| track-active-background | content-brand | 选中轨道及键盘焦点环 |
| track-error-background | content-danger | 可交互错误轨道及 tonal 错误边框 |
| handle-background | surface-default | 普通／选中／错误滑块底色 |
| handle-color | content-brand | 普通／选中／错误滑块图标色 |
| text-color | surface-default | 实心轨道上的文字色 |
| tonal-track-background | surface-muted | tonal 未选中轨道底色 |
| tonal-border-color | content-secondary | tonal 未选中边框及滑块底色 |
| tonal-text-color | content-secondary | 新增：tonal 未选中轨道文字 |
| tonal-handle-color | surface-default | 新增：tonal 未选中滑块图标 |

轨道是用于识别开关状态的控件标记，采用 content-secondary / brand / danger，与 Checkbox / Radio 的标记语义一致，不直接沿用按钮 action 填充色。surface-default 在实心轨道中表示镂空式前景，与所在主题的轨道色成对设计，不是任意彩色背景的通用文字色。暗色 surface-muted 带透明度，只适合叠加表面，不能充当深色滑块上的反差图标色。

tonal 未选中采用独立前景组合；选中或可交互错误状态切回普通文字／滑块 Token。迁移注意：若过去仅覆盖 text-color / handle-color 来定制所有变体，现在还应同时设置 tonal-text-color / tonal-handle-color。tonal-border-color 仍同时影响未选中边框和滑块底色。错误状态会一起切换轨道、滑块与文字，避免只换轨道而遗留低对比度前景。

优先级保持 disabled / loading 抑制 error，并保留 checked 身份；hover、active 和 focus 不抹去该状态。只调整默认配色，不新增 hover 变色。checked-color / unchecked-color 仍写入内部 current-track，覆盖普通轨道；可交互 error 仍优先使用 track-error-background。loading-color 覆盖加载图标，否则继承滑块图标色。自定义轨道需一起选定前景；这不是自动纠正任意业务颜色的算法。scale、local-*、current-track、loading-color 等运行时变量不是公开主题默认值。

验证入口：pnpm check:switch-themes（或 node bin/switch-theme-check.mjs），已纳入 check:theme-contract。覆盖 circle / round / line / tonal × checked / disabled / loading / error / hover / active / focus-visible × 两端 × 两品牌 × 明暗主题，共 4096 个状态；8704 组默认色对比最低 4.681:1。按 host → track → handle → icon 实际顺序混合透明颜色；文字 ≥4.5:1，控件边界、滑块／轨道、图标和焦点环 ≥3:1。哨兵色验证公开颜色变量及自定义轨道消费者。line 实际不显示文字，因此不计虚构文字对比。

边界：检查使用 md 尺寸、surface-default / surface-muted 承载背景，不覆盖 disabled / loading 降低整体透明度后的对比、任意自定义颜色／插槽、动画中间帧、真实浏览器布局或焦点可见性验收。sm 隐藏文字、尺寸缩放、阴影与几何／动效默认值仍未进入本批契约。

## 导航颜色：Tabs 与 Steps

本批新增 64 项共享颜色默认值：Tabs 7 项、Steps 57 项，没有新增公开变量。Maple Tabs 暗色覆盖移除；两端保留尺寸与布局差异。

### Tabs 颜色职责

| 后缀（添加 --c-tabs- / --mp-tabs-） | system 角色 | 场景 |
| --- | --- | --- |
| background | surface-default | card / capsule / enclosed 选中表面 |
| title-text-color | content-secondary | 普通标题 |
| title-text-color-active | content-brand | 选中标题、焦点环与指示条，不使用 action 填充色 |
| title-text-color-disabled | content-disabled | 禁用标题 |
| muted-background | surface-muted | 分组或未选中表面 |
| border-color | border-default | 装饰性分隔线和边框 |
| hover-background | state-hover | fine pointer 下可交互且未选中项 |

hover 不覆盖选中项背景；line / outline 的 hover 只改变可交互文字。coarse pointer 不应用桌面 hover 规则。禁用优先于选中／hover 文字色，但保留选中位置。

### Steps 颜色职责

所有后缀加 --c-steps- / --mp-steps-。状态为 wait / process / finish / error，disabled 只禁止交互，保留进度身份；circle 同时供 navigation 使用。

| 变量组 | wait | process | finish | error |
| --- | --- | --- | --- | --- |
| circle-item-bg-* | surface-muted | content-brand | state-selected | content-danger |
| circle-item-border-color-* | transparent | transparent | transparent | transparent |
| circle-item-icon-text-color-* | content-secondary | surface-default | content-brand | surface-default |
| circle-item-title-color-*、dot-item-title-color-* | content-secondary | content-primary | content-primary | content-primary |
| circle-item-description-color-*、dot-item-description-color-* | content-secondary | content-secondary | content-secondary | content-secondary |
| dot-item-bg-*、dot-item-border-color-* | content-secondary | content-brand | content-brand | content-danger |
| arrow-item-bg-* | surface-muted | content-brand | state-selected | content-danger |
| arrow-item-title-color-* | content-secondary | surface-default | content-primary | surface-default |
| arrow-item-description-color-* | content-secondary | surface-default | content-secondary | surface-default |

circle / dot 的 item-tail-color-wait 为 border-default，item-tail-color-process 为 content-brand，item-tail-color-error 为 content-danger；没有虚构 finish 尾线变量，已完成连线使用 process 色。连接线为辅助提示，不作为唯一状态信息。navigation-arrow-color 使用 content-secondary；navigation-ink-bg 与 changeable-hover-text-color 使用 content-brand。

bg 是节点／箭头表面，icon-text-color 是编号或图标，title / description 是正文。实心 process / error 箭头使用反差前景，hover 不能将其改成同色文字；其他可交互非 active 项仍可 hover 提亮。navigation-ink-bg 现在实际消费于导航指示线，不再误用 hover 文字变量。surface-default 在这里表示配对的镂空式前景，不是任意业务背景上的通用文字色。

验证入口：pnpm check:navigation-themes（或 node bin/navigation-theme-check.mjs），已接入 check:theme-contract。覆盖 Tabs fine / coarse 媒体、六种变体及选中／禁用／hover，Steps 四种造型与四状态叠加 active／disabled／hover：共 1792 个状态、1792 组颜色对比，最低 4.681:1；文字和编号要求 4.5:1，dot 要求 3:1。哨兵色验证被测消费者，包括 Tabs 指示条及导航指示线伪元素。

边界：未逐项验收所有连接线／箭头伪元素、焦点环、尺寸、阴影、动画或自定义插槽／背景；禁用不设对比阈值，真实浏览器布局与触摸交互另行验收。主题、组件 variant 与交互状态必须分层描述。

## 数值与进度：内容层级与图形指示

本批登记 12 项共享颜色默认值；两端仅前缀不同。颜色角色描述职责，不依据组件所在平台或品牌改变意义。

| 组件与变量后缀 | system 角色 | 意义与场景 |
| --- | --- | --- |
| count-to / countdown：text-color | content-primary | 独立数值、计时文字；计时结束不自动表示错误或成功 |
| statistic：value-color | content-primary | 主要读数；内部 CountTo 动画继承此色，不抢占父组件颜色 |
| statistic：title-color / prefix-color / suffix-color / extra-color | content-secondary | 标题、单位、前后缀和补充说明；不能因为字号小就降低到装饰文字对比 |
| progress-group：text-color | content-primary | 主内容与环形中心文字 |
| progress-group：muted-color | content-secondary | 数值、百分比等辅助信息，仍须满足正文可读性 |
| progress-group：track-color | state-hover | 中性 fill2 轨道底色；这里只复用填充层级，不意味着发生 hover |
| progress-group：tooltip-bg / tooltip-color | surface-tooltip / content-on-dark | 固定深色提示表面及其反差文字，明暗主题都使用此配对 |

ProgressGroup 默认分段、图例图标引用 content-brand，作为需要辨识的图形标记而非按钮背景。运行时优先级为 item.color → 组件 color → system content-brand；用户自定义颜色不保证对比度，需要自行验收。当前未新增组件颜色别名。不要使用百分比或正负数猜测业务上的成功／危险；业务状态由调用方明确指定。

这批只治理颜色：两端字号、间距、圆角等密度差异暂保留，不能把颜色一致理解为全部默认值一致。Maple 暗色 CountDown / Statistic 删除颜色覆盖，保留现有几何值；Cedar 移除四个 token.less 内嵌的全局主题，基础样式仍由模块入口负责。

验证入口为 node bin/numeric-theme-check.mjs，亦纳入 check:theme-contract。检查编译后 CSS 消费者及变量覆盖、普通／弱表面的文本对比、线形／环形轨道、Tooltip 成对颜色、Statistic 动画继承。自定义色、实际浏览器布局、动画和交互视觉不在此次静态检查结论内。

## 基础表现：状态层、表面、占位与间距

本批登记 Hover 2、Icon 1、Paper 5、Ripple 2、Skeleton 20、Space 10，共 40 项完整 root 默认值。共享变量名只差 c / mp 前缀，没有新增别名。Space 依赖的 system space-1…8 同时登记为受管默认值：2 / 4 / 6 / 8 / 12 / 16 / 20 / 24px。

| 组件／变量后缀 | 默认职责与使用场景 |
| --- | --- |
| hover：overlay-opacity / overlay-focusing-opacity | 0.04 / 0.12；用宿主 currentColor 作覆盖层，以 opacity 表示强度，不是独立文字色或实心填充色。无状态为 0；focus 高于 hover，不累加。显式 focusing 不因设备类别被隐藏，焦点触发策略由宿主负责。 |
| icon：size | inherit；随宿主字号缩放，图形为 1em，颜色继承。显式 size 属性覆盖 CSS 变量；需要旧移动端 20px 外观时显式设置 size="20" 或 icon-size:20px，不恢复全局固定大小。独立 SVG 图标不自动消费 Icon 包装器变量。 |
| paper：background / border-color | surface-default / border-default；普通承载表面不是浮层，也不因暗色而跳到 bg4。内容颜色由宿主继承，调用方需提供适配表面的文字色。 |
| paper：border-radius / border-width / transition-duration | 4px / 1px / system slow（240ms）；bordered 才消费边框宽度和颜色，round 使用圆形形状，radius 属性覆盖默认圆角。背景变化时长通过组件变量引用 system slow。 |
| ripple：color / cubic-bezier | currentColor / cubic-bezier(0.68,0.01,0.62,0.6)；波纹继承宿主颜色，曲线控制扩散，不控制文字、宿主背景或整个指令生命周期。自定义波纹颜色由指令参数优先提供。 |
| skeleton：card / avatar / title-background-color | 均引用 state-hover，即中性 fill2；这里是占位填充层级，不表示发生 hover。title 色同时用于行、Shape 和 fullscreen 占位，不是 scrim 或真实内容背景。 |
| skeleton：animation-background | transparent → surface-default → transparent 的横向渐变；shimmer 层以 0.3 opacity 混合，避免硬编码白色导致暗色不同。仅 animation 开启时消费；覆盖渐变后仍受此层透明度影响。 |

Skeleton 几何变量保持两端一致：content-padding 16px；card 高 160px、圆角 4px、下间距 16px；avatar 大小 34px、圆角 50%、右间距 16px；title 宽 50%、圆角 10px；row 高 12px、圆角 10px、上间距 10px；Shape 的 sm/md/lg 为 36/48/60px，圆角 4px。这些是组件形态，不为追求数量而全部映射到 spacing；圆形覆盖形状圆角，不覆盖颜色。

Space 使用物理 CSS row-gap / column-gap，与 flex direction 不交换：xs 为 4/4px、sm 为 8/6px、md 为 12/8px、lg 为 16/12px、xl 为 24/16px。对应 system spacing 引用，不改变原有数值。自定义数值同时应用两轴，数组按 [rowGap,columnGap]，不经过预设变量；split 插槽仍保留间距。Space 不应拥有文字或背景颜色变量。

移除 Maple 这六个组件族的重复暗色覆盖（HoverOverlay、Icon、Paper、Ripple、Skeleton、Space），从同一语义与几何默认值继承；Cedar 清除相关 Less 的全局主题内嵌。验证入口 node bin/foundation-theme-check.mjs 纳入 check:theme-contract：两端 × 两品牌 × 明暗主题 448 项检查，包括实际 CSS 消费者、变量覆盖、focus 优先级和间距解析。占位及反馈状态层不是正文，不套用正文对比度阈值。实际浏览器动画、全库 reduced-motion 覆盖、强制颜色模式及任意业务自定义色仍需后续验收；本批不是全库样式完成声明。

## 基础动效：时长职责与减少动态效果

本阶段新增 6 项组件变量、登记 2 项既有 system 时长默认值。不把所有动效压成同一个时长，也不使用颜色主题切换来改变动效策略。

| 变量后缀（两端只差 c / mp 前缀） | 默认值与职责 |
| --- | --- |
| sys-motion-duration-fast | 120ms；轻量状态反馈过渡，不是所有动画的最快档替代品 |
| sys-motion-duration-slow | 240ms；此批用于承载表面、占位表面的颜色变化 |
| hover-transition-duration | 引用 system fast；hover / focus 覆盖层透明度过渡，两端一致，focus 仍优先 |
| paper-transition-duration | 既有变量改为引用 system slow；仅背景色过渡，不影响点击、尺寸或业务时序 |
| skeleton-transition-duration | 引用 system slow；card、avatar、title、row、fullscreen 占位色变化 |
| skeleton-animation-duration | 1s；横向扫光单周期，不等同于表面过渡时长 |
| icon-spin-duration | 1s；内置旋转单周期，不控制名称替换的等待时间 |
| ripple-expand-duration / ripple-fade-duration | 200ms / 140ms；分别控制 CSS transform 扩散与 opacity 变化，保留 ripple-cubic-bezier 的扩散曲线职责 |

所有 CSS 时长需要有效、非负的时间值。Icon 的 transition 属性依然表示毫秒数的名称切换等待，不能通过 spin-duration 改变。Ripple 的 expand-duration（200ms）控制 transform 扩散，fade-duration（140ms）控制 opacity 显现／消退，cubic-bezier 仅控制扩散曲线；两端默认值与消费者一致。运行时从实际波纹节点所属文档读取计算后的 transform／opacity transition 时长与 delay（支持 s/ms、列表重复与 all），不直接解析未解析的 var()。250ms 分别是从节点创建起的最小展示时间和开始淡出后的最小移除等待，不是视觉 duration、总生命周期或 CSS Token。创建 30ms／激活 20ms 是内部调度；快速释放仍走最小展示流程。

释放等待扩散的实际激活时间 + transform duration/delay 与创建时间 +250ms 的较晚者；开始淡出后等待 max(250ms, opacity duration+delay) 才删除。默认节奏不变，600ms／800ms 等较长覆写不再截断；显式 0ms、无样式或 reduce 隐藏仍保留清理下限。扩散时序在创建／激活阶段采样，消退时序在开始淡出时采样，不承诺之后任意 CSS 改动或 animation 的时序。计时器不是设计 Token，不能从调色或密度层推导。

每个波纹只安排一次释放，禁用／卸载取消所属定时器和直接子波纹，不误删嵌套指令；文档释放事件注册／清理使用挂载时 ownerDocument，跨文档搬迁的监听重新绑定不在本契约内。键盘只接管本宿主 Enter／Space，对应 keyup 或 blur 释放，无关键不抢占。指令不授予宿主按钮语义、可访问名称或点击业务能力；在已有交互元素上使用，不能只加 v-ripple 便声称普通 div 可访问。真实 IAB 默认／长时长／0ms 六组与两端永久回归分别留证；不外推真机触摸、真实 OS 偏好或全库动效通过。

prefers-reduced-motion: reduce 是用户偏好，不是主题或公开 CSS 开关。内置策略如下：Hover / Paper / Skeleton 表面立即响应、保留状态颜色；Icon 停止 spin，内置缩放取消，名称立即切到最新值；Skeleton 隐藏扫光但保留占位；Ripple 不显示装饰波纹，指令仍正常清理节点，不影响宿主事件。必要的 !important 仅用于压过 Icon 内联 transition、Ripple 内联 opacity 及已列明的模态／Notification／Message 内置过渡和起始位移，不用于普通主题覆盖。用户显式 rotate 朝向保持不变。

Icon 在挂载后订阅偏好，减少动态效果在切换途中开启时会取消旧计时器；关闭偏好不会对未变化的名称重新播放动画。卸载移除监听并清理等待。SSR 不读取 window，也不建立监听。自定义 animation-class、外部 SVG 的自有动画和业务加载指示器需调用方另行适配；本策略并不替代可访问名称或加载状态提示。

验证入口 check:motion-themes 已接入 check:theme-contract：96 组主题／偏好组合、88 项时长覆盖、176 项模态 active 选择器消费检查，并检查 reduce 下起始 transform 与 Popup 基础过渡。Icon 单测仍负责初始／动态偏好、切换取消与卸载。motion-source-inventory.mjs --check 维护源码候选清单：两端 192 个文件、389 处 CSS 动效声明候选、179 处运行时调用候选（新增 setTimeout 调度线索）；存在局部 media 或计时器不代表已通过，源清单也不证明选择器可达。此检查是实际 Less 编译及模拟状态，新增真实 OS／浏览器验收为 0。

漂移门禁使用 design-ui/audits/motion-source-inventory.json 当前基线，历史证据快照保持不变。逐行线索包含非动效计时器，数量不代表缺陷或完成的验收。

BackTop 的 duration（200ms）与 easing（quartOut）是 JS requestAnimationFrame 滚动参数，不是 CSS 动效 Token；现有组件变量只负责几何、配色、焦点及层级。减少动效偏好读取滚动目标 ownerDocument 的窗口；动画途中开启时在下一帧立即回顶，保留横向滚动，不承诺同步 OS 事件回调。重复点击、目标切换、停用或卸载使旧帧失效，包括已经出队的回调。滚动可见性合帧不是视觉动画。此处以模拟 RAF／iframe 文档与 SSR 回归验证，不增加真实浏览器／OS 通过数。

模态动效补验：Cedar Drawer 的 fade／四方向 slide 和 Maple Popup 的 fade／center 缩放／四方向 pop，在 reduce 下关闭内置过渡与起始位移／缩放。规则在组件样式入口生效，不依赖全局入口的极短时长兜底；必要的 !important 仅作用于这些内置动效和 Popup 基础过渡，不覆盖主题颜色。Maple Popup 通过 --mp-popup-transition-duration（250ms）与 --mp-popup-transition-timing-function（ease）控制内置 fade／pop 和内容／遮罩基础过渡；职责命名与 Cedar Drawer 对齐，但保留平台组件默认值，不借用 Dialog Token，也不伪造 Cedar Popup 变量。两项应设置在 Teleport 后实际共同祖先或挂载宿主；style 只传给内容、overlay-style 只传给遮罩，不能控制整层关闭时长。CSS 时间必须有效且非负；reduce 规则优先于常规覆写。

生命周期由实际 Transition 完成回调驱动，不设固定 250ms JS 等待：unmountOnClose 在关闭途中保留内容与锁，完成后卸载；快速重开取消关闭，保留内容状态；每个有效打开／关闭阶段的完成事件只发一次，销毁后的回调不再发事件。自定义动画及内容／外层不同步的覆写由调用方负责；初始打开保留既有 mounted 通知行为，不承诺完整 appear 动画计时。IAB 默认／600ms／0ms、五方向与重开／销毁实测另存证据，0ms 是显式 CSS 覆写，不是 OS reduced-motion 验收。

模态配色补验：16 个平台／主题组合，72 组默认配色加 80 组显式背景／文字覆写，最低显示值 5.102:1。透明表面先合成到已知不透明实际背景，再合成透明前景；文字门禁按未舍入比值与 4.5 比较。低对比度自定义覆盖、未知半透明底层及非法颜色必须拒绝，不把覆盖可消费误当成可读性通过。这里覆写的是直接组件变量，不保证根 system 别名会随任意局部覆盖重新计算；业务插槽、图片／渐变背景、自定义状态图标及 unstyled 的配色由调用方负责。依据：[WCAG 文字对比度](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)；动效偏好参考 [交互动效说明](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)，后者为 AAA 条款，不宣称本批完成 WCAG 认证。

## 自动闭环与后续视觉验收

原消费审查、Message 模型与非颜色默认值登记的源码清单已经收敛；不再把已完成事项重复列作“下一批”。共享组件和平台专属组件都进入目录与消费检查，不为同名而创建无效别名或另一端的空壳。具体变量处置见 token-consumer-resolution，非颜色职责见 non-color-token-resolution，Message 迁移见 message-token-resolution。

自动门禁分别检查声明／引用可解析、同义默认值与平台差异、状态和覆盖级联、动态消费者登记、文档生成漂移。它们不能证明任意业务插槽、背景、缩放倍率和浏览器组合的像素结果。构建、类型与发布产物检查以对应运行日志为证据，也不能代替视觉验收。

尚需持续完成的是有明确环境范围的 QA：

- Safari／Firefox／Chromium 的代表性交互回归，特别是 error × focus × hover、selected × pressed、禁用与键盘顺序。
- iOS／Android 真机、窄屏与粗指针，确认输入法、触摸目标、悬停限制和安全区域。
- 浏览器减少动态效果偏好及动态切换、动画生命周期、焦点可见性与屏幕阅读器。
- 长文本、多语言、大字号／缩放、嵌套 Teleport 浮层及业务局部覆盖；自定义颜色需自行验证对比度。

实际已抽查与未覆盖场景以 `design-ui/audits/token-browser-validation.md` 为准。后续发现真实问题仍应同步修改规范、实现、契约和测试；消费候选为零不是“永远没有 CSS 错误”的承诺。

## Badge 与 Tag：语义色、预设色及覆盖边界

Badge 的默认 status 是 danger；无状态匹配时的 bg-color 兜底也引用 system status-danger，不再固定为 #ef4444。status-default-bg-color 的 #e0e0e0 是有意保留的固定中性底，搭配 content-on-bright（黑色）；secondary / tertiary 保留 gray-6 / gray-7。tertiary 在暗色使用深字，Maple 浅色品牌的 primary 使用浅字。隔离环 border-color 跟随 surface-default；放到其他宿主背景上时可局部覆盖。Maple 暗色主题仅保留必要的 tertiary 文字差异，不重复声明全套默认值。

Tag 的 color 预设色表示色板选择，不是业务 status。13 种预设色在两端遵循同一规则：

| 状态／变量 | 职责 |
| --- | --- |
| 已选中 default：{色名}-bg / bg-hover | 正常／可交互 hover 背景；loading 不消费 hover 值。暗色默认分别为该色第 6 阶的 20% / 35% 透明混合，通过 Token 声明而非选择器写死。 |
| 已选中 outline：{色名}-text-color | 文字及描边共用，背景始终透明，hover 不套用填充背景。 |
| {色名}-icon-color | 已选中的前缀、关闭和加载图标颜色，与显式 text-color 的文字覆盖分开。 |
| {色名}-border-color / border-color-hover | default 变体边框，默认透明；不控制 outline 的同色描边。 |
| 未选中 checkable | 预设颜色不生效，维持中性；仅非 loading 的 hover 使用 bg-not-checked-hover。 |

背景变量可在实例根元素覆盖，在暗色同样生效；根级自定义声明需注意与主题 :root 属性选择器的优先级。color（预设／自定义）优先于 status。自定义 default 的背景与边框由 color 属性内联设置，text-color 可覆盖前景；自定义 outline 的 color 控制描边和默认文字，背景透明。自定义色当前不随 checked 自动回到中性，这与预设色不同，不应假定两条路径完全一致。业务负责自定义颜色、透明混合后的文字可读性。

本阶段新增 98 项既有颜色默认值约束，总计 566 项组件默认值；登记不等于每个声明都有消费点。预设 icon-bg-hover 等无消费声明已在下一阶段移除，详见后文；上一阶段的 566 为当时统计。Badge 新增持久化 check:badge-themes：288 个级联状态、720 对配色和 288 项背景覆盖检查，最低 4.563:1。Tag 新增 1664 个预设级联状态与 416 项背景覆盖检查；原有 1024 个语义状态及 640 对对比度检查继续保留。预设色现已追加 2080 对对比度检查，最低 4.529:1：覆盖两端、两品牌、明暗、default / outline、hover 及五类 system 表面；彩色前景使用第 9 阶，灰色使用 content-secondary，gold 的浅色 hover 背景从第 3 阶调整为第 2 阶。自定义色及 loading 透明度不在对比度保证范围；这些是静态编译与级联检查，不是浏览器视觉验收。

## Token 必须有消费路径

公开变量必须能沿 var() 引用链到达实际 CSS 属性，或有明确记录的运行时／跨组件消费者。仅有声明、文档、主题覆盖，甚至变量之间互相引用，都不代表可定制。审核先编译 Less（展开 mixin 和动态变量名），再追踪属性到变量的引用链；不能只在组件目录中按字符串出现次数判断。

本次两端 Tag 同步移除 15 个无消费入口：13 种预设色的 {色名}-icon-bg-hover，以及 icon-hover-size、icon-hover-bg-size。不保留兼容别名；应用中对这些旧变量的覆盖可以删除，没有对应的新变量。删除的是无效定制入口，不是已有 hover 效果。

custom-icon-bg-hover 在上一阶段暂保留（现已清理，见后文）：Cedar InputTag 仍通过 icon-hover-bg mixin 引用它，因此不能按 Tag 自身未引用直接删除。该引用依赖旧 c-icon-hover DOM；当前 Tag 使用 close-btn，编译中存在引用不等于实际可见。后续应结合 InputTag 渲染结构清理或重新设计；Maple 保留同名声明以保持两端契约，在 Tag 自身没有消费效果。

该阶段的 check:token-consumers 只检查两端 Badge / Tag，包含引用链、嵌套 fallback、循环和主题多值的测试，以及当时的显式跨组件保留项（现已清理）。它会拒绝新增无消费声明，但不证明选择器在运行时可达、级联获胜或任意覆盖可见；这些仍由组件测试、主题级联和浏览器验收负责。本次减少 13 项颜色默认值约束，该阶段总数为 553；另外 2 项移除的尺寸变量此前仅登记名称。

## InputTag 旧图标引用收尾

Cedar InputTag 实际嵌入 Tag 的 close-btn，不渲染旧 c-icon-hover 伪元素。本次移除旧 mixin 导入、默认／focus 的伪元素背景规则，以及重复的自定义 Tag 文字规则（文字由 Tag 自身负责）。关闭按钮的现有外观、点击删除和 readonly / disabled 行为不变；没有新增 hover 背景效果。

同步删除两端 tag-custom-icon-bg-hover，以及 Cedar input-tag-tag-remove-icon-color-bg / input-tag-tag-remove-icon-color-bg-focus。旧变量没有替代项，业务中对此的无效覆盖可删除；不保留别名。Maple 没有 InputTag 组件，仅同步清理共享 Tag 变量。

此前的跨组件保留项已关闭。check:token-consumers 现在检查 414 项 Badge / Tag 声明且无豁免，并编译 InputTag 防止旧图标选择器／变量回流；实际 DOM、关闭交互和自定义颜色由 InputTag 集成测试验证。553 项共享默认值数量不变：本次删除的共享变量此前仅登记名称。此阶段仍不代表 InputTag 全部 Token、浏览器视觉或键盘交互已完成治理。

## InputTag 外壳与内容职责

InputTag 的 outline / filled / standard 外壳由 FieldDecorator 管理。Form 不应重新设置其背景、边框或焦点阴影；本次删除了 Form 对旧 InputTag 状态类的重绘规则，保留校验提示职责。filled 的默认／hover／focus 继续走 FieldDecorator 的 fill-1 / fill-2 / fill-3 规则。

InputTag 的内容密度、默认标签底色和禁用文字由 input-tag-* 控制。内容选择器现在匹配实际的 c-field-decorator--size-* / --focus / --disabled 类名，而非不存在的旧 InputTag 状态类；disabled 优先于 focus。五档 xs / sm / md / lg / xl 内容规则均已覆盖；xl 的标签高度为 32px、输入文字为 16px、垂直内边距为 4px。

移除 33 项没有实际 CSS 消费的旧外壳变量：size-{xs,sm,md,lg}-height；color-text-error；color-placeholder、color-icon-clear、color-icon-clear-bg-hover；color-border-{default,error,disabled}（及其 -hover / -focus）；color-bg-{default,error}（及其 -hover / -focus）、color-bg-disabled（及 -hover）；color-shadow-{default,error}-focus、size-shadow-{default,error}-focus；border-radius、border-width、size-icon-clear、size-icon-clear-hover。以上后缀均属于 --c-input-tag-。没有兼容别名。

迁移时按职责选择实际入口：外壳背景用 field-variant-{variant}-background 系列，圆角用 field-border-radius，占位文字用 field-placeholder-text-color，清除图标用 field-clear-icon-color / field-clear-icon-size。几何优先使用 size 属性；不要覆盖 internal 变量。旧无消费变量不存在逐项等价替代；内容标签使用下列 InputTag 自身变量。

InputTag 保留 27 项内容变量，已加入无消费检查；两端 Badge / Tag 加 Cedar InputTag 共检查 441 项声明，内容 size / focus / disabled 级联覆盖 80 组。共享默认值契约仍为 553 项；Cedar-only InputTag 不冒充跨端共享组件。默认文字、禁用文字、标签底色与焦点底色分别引用 content-primary、content-disabled、surface-default、state-hover。禁用状态只重绘中性标签，不覆盖显式 color / status；业务自定义颜色的可读性由业务负责。父级 disabled / readonly 优先于 tagProps.closable / checkable，loading 或显式不可关闭的标签也不能用 Backspace 删除。已完成 Cedar 浏览器五档布局、xl 输入与键盘删除、明暗模式以及禁用自定义色的抽验，不代表全组件视觉验收。
## 字段键盘焦点与错误状态

当前 FieldDecorator 不额外绘制外圈 outline；outline 通过 border-state 边框、filled 通过背景、standard 通过底线响应 `--focus` 或 `:focus-within`。内部清除、密码切换和数字步进按钮保留自身键盘焦点指示。只读保留聚焦，禁用和错误的颜色优先级不变；不据此宣称错误态焦点可辨识性或原生可访问性已验收。

Input、Textarea、InputNumber 的实际原生控件使用 `caret-color: currentColor`，不再由 field-focus-color／field-error-color 染色。field-focus-color、field-error-color 和 field-border-width 仍有提示、边框或按钮 outline 消费，不能因移除 caret／外偏移路径而删除 Token。实例 focus-color 控制现有支持的变体／提示通道，不承诺改变 caret；没有新变量、默认值或业务 API 变更。

检查 `node bin/field-focus-check.mjs` 与 `node --test bin/field-focus-caret.test.mjs` 核对实际 Less 产物、静态导入链、保留消费和三页生成目录；DOM 回归连接真实 Input／Textarea／InputNumber。Less／JSDOM 不替代原生键盘、焦点对比、绘制或浏览器验收。

## 声明归档与真实消费路径（2026-10-12）

组件公共默认变量统一声明在所属 `style/token.less`，实现样式只消费变量；内部状态变量仍可贴近实现。此次将 34 个实现样式文件中的 375 处公共声明归档，归档前后有效默认值与非根规则均经两端 Less 编译比对一致。不要把 CSS 归档理解为重新设计默认配色。

全量目录同时检查 `style/index.less` 和 `style/index.ts` 直接导入的 Less。共享 selection 的 presentation 样式是合法入口；忽略它会误判变量无消费者。Watermark 在运行时读取变量并用于画布，FloatingPanel、Time 时钟和 TabBar 通过实际行内样式消费变量；这些可执行路径需单独登记，不接受注释或主题赋值充当证据。

属性与变量应有明确优先级：显式属性优先，未传属性时使用对应 CSS 变量。Maple TabBar 的 `z-index` 现遵循此规则，默认视觉值仍为 `1`，属性默认值为 `undefined`。ImagePreview 的箭头 hover 变量仅在可悬停设备且箭头可用时生效。

动效规则须同时约束 CSS 与 JavaScript：Maple Picker 在 reduced-motion 下立即提交选择，不等待 transitionend；偏好动态变为 reduce 时收束待提交滚动。键盘列为 listbox，当前项为 option，方向键与 Home/End 跳过禁用项；这不改变 selected-values 的附加勾选标记语义。Time 打开面板先提交输入草稿而不提前 blur，确保弹层关闭后回到原输入。

检查入口：`check:token-placement`、`check:field-focus` 和 `check:theme-contract`；完整变量名称、值、条件和消费路径以自动生成的组件变量参考为准。编译与单测不能替代跨浏览器、真机和屏幕阅读器验收。

弹层焦点根必须指向实际具有 tabindex 的面板，而不是外层遮罩容器。Maple Popup 已补齐内部焦点根标记；打开、嵌套层接管、Tab/Shift+Tab 循环及关闭后的触发器恢复均需以真实组件验收。这个内部 data 属性不是业务 CSS/API 扩展入口。

## 变量作用域、别名求值与 Teleport

同文档切换弹层宿主时，即使面板引用和 ownerDocument 不变，DOM 移动仍可能让原生焦点丢失。顶层活动模态须在迁移完成后恢复面板内焦点，并保留最初的关闭返回目标，不抢占更高弹层。验收必须读取实际 activeElement，而不是只检查挂载与颜色；同源单测和旧截图不能代替修复后的原生复验。截图格式按实际编码保存，导出像素尺寸与 CSS viewport 分开记录，不用于推断原生缩放。

2026-10-13 修复后 IAB 原生跟进：两端在 default/dark、长文本、320×640 CSS viewport 下各五次 host／inline／body 迁移，10/10 焦点包含检查通过，并验证 Tab／Shift+Tab 循环、Enter 关闭与原触发器恢复。证据独立保存在 design-ui/audits/evidence/portal-focus-2026-10-13/after.json；旧八次失败不改写。这不是 200% 原生缩放或 Safari／Firefox 通过证明。运行环境重置后应重新确认浏览器类型与当前 ID，避免将旧句柄误认成同一浏览器。

同日 14:12 有界环境复查没有新增通过：Chrome 支持接口调用仍超时，Safari／Firefox 无支持会话，Firefox 标准应用路径未找到。三套各 48 组必须等待相应支持入口恢复；历史 IAB 证据不外推。最新阻塞记录见 design-ui/audits/evidence/browser-environment-2026-10-13/recheck-1412.json。

修复前后证据采用独立截图清单，校验实际编码尺寸及 SHA-256；连接复查、夹具准备和静态规则检查不增加浏览器通过数量。后续可先推进 IAB 真实同源 iframe 与嵌套弹层键盘验收，必须记录目标文档的样式、activeElement 焦点链和滚动锁；这些仍是待执行计划，不替代外部浏览器、真机、真实 OS reduced-motion 或屏幕阅读器。详细场景见 design-ui/refactors/token-validation/browser/README.md。

更新：真实同源 iframe 批次已完成 8/8，嵌套弹层批次也已完成 8/8。每个目标 Document 必须独立加载组件 CSS 与主题；跨文档 Teleport 不复制父文档变量，也不会让父文档样式表自动进入 iframe。自定义绝对定位宿主必须建立定位、尺寸和滚动边界。父文档触发 iframe 模态时，应沿可访问同源焦点链保存最初触发器，关闭后恢复，不抢占用户已移至外部控件的焦点。跨源不可访问边界不绕过，不能外推为已验收。两端焦点修复无 API／Token 变更；最终证据见 design-ui/audits/evidence/iframe-2026-10-13/results.json。

嵌套模态按两端 × 四主题实测，分别执行子层先关、父层先关与父层单独重开：仅栈顶响应 Tab／Escape，子层关闭回到仍可见的父层触发器，最后一层关闭回到页面原始触发器。父层先关闭时不能抢占仍打开的子层焦点；子层须在打开时保存祖先 opener 链，关闭时跳过已隐藏、禁用、inert 或断开的候选，避免焦点落到 BODY。两端 modal-focus 已修复该问题，无新 API／CSS 变量。滚动锁保留至最后一个使用者退出，滚动条补偿不重复累加。本批使用默认保留挂载、同库嵌套和 body 目标；背景抑制仅证明真实键盘约束与遮罩命中，不声称屏幕阅读器隔离、跨库协调、父层 unmountOnClose 移除或跨源已通过。18 张原图及分步证据见 design-ui/audits/evidence/nested-2026-10-13/results.json；后续为 reduced-motion 规则／配色准备，真实 OS 偏好另验。

原生缩放与跨浏览器验收必须分别记录浏览器／版本、浏览器自身显示的缩放百分比、实际 DOM 挂载祖先和截图。DPR、缩窄 viewport、CSS zoom／transform 只能提供其他类型的证据，不能单独证明原生 200% 页面缩放。Safari／Firefox 需要对应产品的实际浏览器结果；连接超时、缺少安装或缺少控制入口标为环境阻塞，不作为组件失败，也不能沿用 Chromium 结果记为通过。


局部主题有两道边界：真实 DOM 祖先，以及变量的声明位置。自定义属性中的 `var()` 在继承前解析；子节点改 system 变量，不会自动重新计算从根节点继承的组件别名。[CSS 变量规范](https://www.w3.org/TR/css-variables-1/#cycles)

| 场景 | 正确入口 |
| --- | --- |
| 全局切换主题 | 在文档根作用域通过本库 StyleProvider 全局方法切换；根层依赖链一起重算 |
| 定制局部组件 | 覆盖实际消费的公开 component 变量；只改 palette/system 不等于完整的局部主题重建 |
| 局部 system 到 component 映射 | 在同一局部宿主显式重新声明需要的组件别名，不依赖根层旧映射 |
| Teleport 到 body | 继承 body/html；触发器、调用处 Provider 的局部变量不自动复制过去 |
| 指定 popup-container | 宿主必须已经存在；变量放在目标宿主或真正面板上 |
| popup-container=false | 保留调用位置的 DOM 继承；同时承担祖先 overflow、transform、定位和层叠的约束 |
| iframe 宿主元素 | 允许来自另一文档的 HTMLElement；对方文档必须自行加载样式并提供变量，字符串选择器只查调用方文档 |

从自定义宿主经 inline 切回 body 时，必须真正迁出旧宿主，恢复 body/html 的变量继承；“仍属于 body 的后代”不是有效断言，因为旧宿主也可能位于 body 内。打开中切换和关闭后重新打开都遵守此规则。inline 状态的滚动锁按实际面板文档的 body 归属，不沿用之前的宿主锁。

浮层尺寸以实际包含块为边界；`100vw` 可能包含页面滚动条宽度，不能用它替代容器可用宽度。Cedar Drawer 对显式宽度保留 `max-width: 100%` 上限，这是结构约束，不是新增设计 Token。长内容允许面板内部滚动；任意业务插槽的断词、字号与前景／背景配对仍由业务显式设计。

例如同一页面的 Cedar Drawer 与 Maple Popup 可以共享一个真实宿主，但各自覆盖本库变量，不能依赖另一端前缀：

```css
.portal-theme {
  --c-drawer-bg: #182230;
  --c-drawer-header-text-color: #f8f9fc;
  --c-drawer-content-text-color: #f8f9fc;
  --mp-popup-content-background-color: #182230;
  --mp-popup-content-text-color: #f8f9fc;
}
```

若需要联动局部 system 色，在该宿主同时声明对应组件变量，例如 `--mp-popup-content-background-color: var(--mp-sys-color-surface-raised)`；只在宿主设置 surface-raised 不足以重算根上已经声明的别名。面板与遮罩是兄弟节点，面板变量不会向上或横向传给遮罩；共同覆盖放在共同宿主，或分别使用各组件现有的面板／overlay 样式属性。

不自动复制触发器 computed style、不批量重写 root 默认值，也不为另一端不存在的组件制造变量。本条明确现有定制范围，不新增 Token、不承诺局部 StyleProvider 会自动重建全部主题依赖链。自定义前景和背景需配对检查，本文的示例不是任意插槽配色保证。

`check:portal-scope` 使用真实 Teleport，检查 body／选择器／元素／inline 挂载、宿主切换后的实例状态、旧宿主滚动锁释放、跨文档参数与事件归属及卸载清理。DOM 和生命周期测试不计算浏览器像素；CSS 检查器验证局部覆盖时不能把根层的原始别名表达式带到子节点后重新求值。窄屏、200% 浏览器缩放、长文本、跨文档焦点和浏览器实际继承仍需独立实测。

打开中的模态面板跨文档切换挂载目标时，事件监听、焦点约束、弹层栈和滚动锁必须随实际目标迁移；同一 DOM 被 adopt 后 ownerDocument 会变化，但 Vue 元素引用可能不变，内部逻辑不得仅依赖该引用触发重绑。迁回原文档和卸载都要清理旧监听。此契约不增加公开 CSS 变量，真实 iframe 焦点与样式仍需浏览器验收。
