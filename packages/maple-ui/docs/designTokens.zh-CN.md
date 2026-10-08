# Design Token 与 CSS 变量分层

> 本页是共享规范的文档站镜像。事实来源为 `design-ui/standards/design-tokens.md`；规范更新时应同步更新本页与 Cedar 对应页面。

Cedar 与 Maple 使用同一套逻辑 Token 语义，只允许品牌前缀不同：Cedar 为 `--c-`，Maple 为 `--mp-`。共享不是要求所有像素值都相同，而是要求同名 Token 表达同一职责；确需不同的触控尺寸、密度和平台结构必须显式登记。

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
| content（语义色） | `brand / info / success / warning / danger` | 普通中性表面上的可读彩色文字、图标及同色描边，对应色板第 8 阶 |
| border | `subtle / default / strong` | 弱分隔、常规边框、强调边框 |
| action | `primary` | 主操作及品牌交互强调 |
| status | `info / success / warning / danger` | 状态填充和强调色；普通表面上的可读彩色文字选对应 `content-*` |
| state | `hover / selected` | 与组件无关的通用交互状态表面 |

System Token 使用 `--mp-sys-{category}-{role}`。同一个颜色角色在 Cedar 与 Maple 必须映射到相同逻辑基础值，标准值由 `theme-contract.json#systemTokenValues` 管理。完成治理的公开组件 Token 默认值登记在 `componentTokenValues`，目前已覆盖 FieldDecorator、Collapse、Dialog、Card、Divider、Empty 与 Avatar 的关键颜色语义。Dialog 的边框、尺寸与布局允许平台差异。Card 悬浮按钮容器使用 `content-primary`，固定深色关闭按钮上的文字使用 `content-on-dark`；其 `#212121` 背景是组件专属值，不代表主操作色。Divider 线条使用 `border-default`、文字使用 `content-secondary`；文字留白 Cedar 为 `16px`、Maple 为 `8px`。Empty 描述使用 `content-tertiary`，非文字装饰图标使用 `content-decorative`。即使两端数值相同，也应检查组件默认值及主题覆盖是否使用正确的 system 语义，不能以相同的硬编码值代替语义。

Card 预发布变量迁移：`--mp-card-close-button-primary-color` → `--mp-card-close-button-background`，不保留旧名别名。

Avatar 也已纳入跨端颜色治理：文字、汇总数量和按钮图标使用 `content-primary`；描边使用 `surface-default`；仅深色遮罩图标使用 `content-on-dark`。默认 `fill-4` 背景、触发按钮 `fill-2 → fill-3` hover 阶梯、半透明遮罩是组件视觉值。按实例覆盖背景（`color` 属性）时须检查文字对比度，必要时覆盖 `--mp-avatar-text-color`；system 角色不能保证任意前景／背景组合的对比度。Maple 暗色 Avatar 背景 `#303030` 是主题专属组件值。

Badge 第三阶段治理：填充背景使用 `status-*`／`action-primary`，轮廓文字和描边使用 `content-info/success/warning/danger/brand`；default 轮廓使用 `content-primary`，secondary／tertiary 使用 `content-secondary`。轮廓背景变量对所有状态和 `color` 属性均生效。两端的 Maple 浅色品牌均为填充 primary 配置浅字。编译后的 CSS 验证覆盖 640 个内置配色组合及 64 个轮廓背景覆盖场景，填充文字最低 4.56:1，轮廓文字最低 4.97:1；自定义色与背景需重新验证，其余未登记变量仍待治理。

新增的 `content-brand/info/success/warning/danger` 引用对应色板第 8 阶，适用于普通中性表面上的可读彩色文字、图标和同色描边。`content-brand` 与 `content-primary`（主要内容层级）、`action-primary`（主操作强调）职责不同；仅覆盖主操作色不会自动改变品牌文字色。

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
| `content-brand` | `primary-8`（RGB） | 普通中性表面上的品牌文字、图标及同色描边。 |
| `content-info` | `blue-8`（RGB） | 普通中性表面上的信息文字、图标及同色描边。 |
| `content-success` | `success-8`（RGB） | 普通中性表面上的成功文字、图标及同色描边。 |
| `content-warning` | `warning-8`（RGB） | 普通中性表面上的警告文字、图标及同色描边。 |
| `content-danger` | `danger-8`（RGB） | 普通中性表面上的危险文字、图标及同色描边。 |
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

覆写组件背景时，应同时检查其文字、图标、边框和交互态的对比度；`content-on-dark` 只适合背景确实保持深色的场景。`var()` 的 fallback 只能用于明确的外部兼容边界，不应掩盖缺失的内部 system Token。颜色混合和透明度属于需要解释的组件行为，不应靠孤立的硬编码颜色掩盖。

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
| button-disabled-color / disabled-text-color | 禁用背景沿用 color-disabled，文字使用 content-disabled。高于所有变体与 icon-container；disabled 时暂停 color/text-color 属性的内联覆盖，恢复启用后恢复自定义色。 |
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

所有 CSS 时长需要有效、非负的时间值。Icon 的 transition 属性依然表示毫秒数的名称切换等待，不能通过 spin-duration 改变。Ripple 现有 250ms 生命周期计时（最小展示／移除等待）不读取 CSS 变量；每段视觉时长应不超过 250ms。要支持更长自定义波纹，必须在后续阶段同时改造运行时计时，不得只延长 CSS 后声称动画完整。计时器不是设计 Token，不能从调色或密度层推导。

prefers-reduced-motion: reduce 是用户偏好，不是主题或公开 CSS 开关。内置策略如下：Hover / Paper / Skeleton 表面立即响应、保留状态颜色；Icon 停止 spin，内置缩放取消，名称立即切到最新值；Skeleton 隐藏扫光但保留占位；Ripple 不显示装饰波纹，指令仍正常清理节点，不影响宿主事件。必要的 !important 仅用于压过 Icon 内联 transition 和 Ripple 内联 opacity，不用于普通主题覆盖。用户显式 rotate 朝向保持不变。

Icon 在挂载后订阅偏好，减少动态效果在切换途中开启时会取消旧计时器；关闭偏好不会对未变化的名称重新播放动画。卸载移除监听并清理等待。SSR 不读取 window，也不建立监听。自定义 animation-class、外部 SVG 的自有动画和业务加载指示器需调用方另行适配；本策略并不替代可访问名称或加载状态提示。

验证入口 node bin/motion-theme-check.mjs 已接入 check:theme-contract：80 组主题／偏好组合、88 项时长覆盖检查；Icon 单测验证初始偏好、动态变化、切换取消与卸载清理。此检查使用编译后 CSS 和模拟状态，不等同于真实浏览器动画帧、视觉或系统设置切换验收。

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
