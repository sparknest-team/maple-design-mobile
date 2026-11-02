# Maple presentation 验收记录（2026-10-24）
> 状态更新：公共默认值同源修复后的最新 308 项专项和 24 项视觉复核已通过，见 [新专项报告](presentation-parity-final/report.md)。下列 380/308/6 数字对应前次固定快照；新一轮完整矩阵与主题门禁由总验收继续核验，不以旧产物结果代替。

本报告按用户最新规则验收，替代此前“所有字段默认 popup”的旧规则。生产源码与文档产物已固定；以下浏览器结果均基于同一版输入。运行环境 Node v20.18.3、pnpm 9.6.0、Chromium。

## 最终行为

| 组件 | 未设置 presentation 时 |
| --- | --- |
| Select、Cascader、AutoComplete、Date、DateRange、Time、TimeRange | popup |
| Input、InputPassword、Textarea、InputNumber、VerificationCode、Switch、Checkbox、CheckboxGroup、Radio、RadioGroup、Slider、Rate、Upload | inline |
| Search | inline，显式 popup 使用全屏搜索 |
| Form / FormItem | 未配置时保留各字段默认值；显式配置时继承，优先级为字段 > FormItem > Form |

所有字段仍可显式选择 inline 或 popup。字段 popup 隔离草稿，取消不提交，确认后更新模型。Search 使用自身搜索事务：历史菜单与全屏搜索统一为 `presentation="inline | popup"`，删除旧 historyPopup / history-popup API。两端 API、控制器、调用方、文档、Demo 和同源检查均已迁移。

AutoComplete 使用 Select 标准列表容器与空状态，输入框与列表纵向排列，候选行尺寸、字体、padding 与 Select 相同；保留外层统一确认和取消。公共弹层样式入口已调整为 style/index.ts，避免生产 tree-shaking 丢失样式。

## 最终浏览器结果

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| pnpm build:doc | 成功，1474 个 demo SFC 检查通过 | [构建日志](build-grouped.log) |
| pnpm check:docs-components，未过滤完整矩阵 | 380 / 380，无跳过或取消 | [日志](all-components-grouped.log)、[coverage](all-components-grouped/maple/coverage.json) |
| presentation 专项 | 308 / 308 | [日志](presentation-grouped.log)、[coverage](presentation-coverage.json) |
| pnpm check:docs-theme，原有 6 项 | 6 / 6，无跳过或取消 | [日志](docs-theme-grouped.log)、[指纹记录](theme-evidence.json) |
| Select / AutoComplete 补充视觉复核 | 24 / 24 | [日志](selection-visual-final.log)、[记录](presentation-diagnostic.json) |

完整文档矩阵覆盖 91 个组件 × 桌面/移动端 × 亮暗主题（364 项），另含 8 个指南 × 亮暗主题（16 项），包含真实交互、源码对照、页面错误和溢出检查。操作与用例超时保持原值，没有跳过失败组件。

308 项专项包括：20 个字段 × 默认/显式 inline/显式 popup × 4 个场景（240）；8 种 Form/FormItem 继承和覆盖 × 4（32）；8 组真实 Form 文档 demo × 4（32）；真实 Search demo 的两种模式 × 4（4）。场景为桌面 1280px、手机 375px，分别亮暗主题。

其中 272 项字段及继承检查使用当前 Maple 源码独立 Vite 生产构建的辅助页面，未冒充文档站；36 项 Form/Search demo 直接运行于最新文档生产快照。辅助页面同时断言公共字段覆盖清单、模型提交边界、视口范围、工具栏/关闭按钮/确认区计算样式，以及 AutoComplete 与 Select 候选行几何和字体一致。原 6 项主题检查覆盖 320/375/390px、四主题切换和刷新持久化。

人工核查的最终截图：

- [AutoComplete 桌面亮色](screenshots/AutoComplete-desktop-light-popup.png)
- [AutoComplete 手机亮色](screenshots/AutoComplete-mobile-light-popup.png)
- [AutoComplete 手机暗色](screenshots/AutoComplete-mobile-dark-popup.png)
- [真实 Form 手机暗色 inline demo](screenshots/mobile-dark-field-components-inline.png)

## 其他相关检查

- Maple Form / Search / AutoComplete / 公共字段相关 39 文件、428 项通过：[日志](grouped-tests-final.log)。新增 AutoComplete 标准列表回归所在文件 3 项另行通过：[日志](auto-popup-regression-final.log)，与前述存在重叠，不相加。
- Cedar Search / AutoComplete 6 文件、75 项通过：[日志](cedar-search-auto-tests-isolated.log)。
- 两端类型检查通过：[Maple](grouped-typecheck.log)、[Cedar](cedar-sync-typecheck.log)。
- Maple 默认 `pnpm lint:check` 通过（无额外参数，0 errors / 0 warnings）：[日志](lint-default-final.log)。Cedar 同步文件 lint 通过：[日志](cedar-sync-lint.log)。
- Search 9 对同源、AutoComplete 7 对同源及 Less 编译通过：[Search](search-modes-parity-final.log)、[AutoComplete](auto-parity.log)。
- 样式变量契约通过；仅补登记两端已存在的 3 个 Select 勾选 token，未改变其值：[日志](style-vars-final.log)。
- 文档管线 23 项通过：[日志](doc-pipeline-final.log)。组件规范检查 0 errors / 0 warnings：[日志](spec-final.log)。
- 公共弹层生产样式保留回归 12 项通过：[日志](style-regression-final.log)。
- Search 中英文编辑器 metadata 已同步新 API，移除 history-popup。

## 固定输入

- sourceFingerprint: `7800248a161dd33a0b97b46cf4329be7548ef45893f37e28e08d5f0612c8d7e1`
- productionFingerprint: `0274f972b389f02c294e353c953276654046d606f2c334799b9e1ec8038e953b`
- production index SHA-256: `e12a1fa1d3ccae5e12fcfeac9965c69071ab9fe4074d2ef376d8d2c1e7d3df2a`

完整矩阵 sourcesStable=true、productionInputsStable=true；专项 stable=true；原主题门禁前后源码、生产输入和 index 均一致。详细运行器指纹见 [inputs-grouped.json](inputs-grouped.json)。

早期诊断、被中断运行和旧“全 popup”规则的日志保留用于排查，不计入上述最终结论。本报告未将未执行的整库 quality / 发布包流程表述为通过。

## 验收工具归档

验收脚本及辅助页面构建共 8 个文件已按原相对路径打包为 [acceptance-tools.tar.gz](acceptance-tools.tar.gz)，解包到本证据目录即可恢复。归档逐文件 SHA-256 已验证，临时副本位置与校验清单见 [acceptance-tools.json](acceptance-tools.json)。报告、JSON、PNG 和日志保留在原位置，生产源码和产物均未修改，ESLint 配置未修改。

归档后已重新执行默认 `pnpm lint:check`，退出码 0；无额外 ignore 参数，未修改 ESLint 忽略规则。再次核对生产双指纹与最终浏览器验收记录一致。
