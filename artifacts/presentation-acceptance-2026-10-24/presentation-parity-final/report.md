# Maple 公共默认值同源修复后的专项复验

2026-10-24，Node v20.18.3、pnpm 9.6.0、Chromium。基于 r29 最新 Maple 文档生产构建，308 项专项与 24 项视觉复核全部通过，均无失败、无跳过。业务源码、文档构建输入及 ESLint/浏览器检查规则未在本次复验中修改。

## 验证范围与结果

| 范围 | 结果 | 证据 |
| --- | --- | --- |
| 20 字段 × 默认/显式 inline/显式 popup × 桌面/手机亮暗主题 | 240 / 240 | [专项日志](presentation.log)、[coverage](presentation-coverage.json) |
| Input 的 8 种 Form/FormItem 继承和覆盖 × 4 场景 | 32 / 32 | 同上 |
| 8 个真实 Form 文档 demo × 4 场景 | 32 / 32 | 同上 |
| 真实 Search demo 的 inline/popup 流程 × 4 场景 | 4 / 4 | 同上 |
| Select 与 AutoComplete × 3 模式 × 4 场景 | 24 / 24 | [视觉日志](selection-visual.log)、[coverage](presentation-diagnostic.json) |

20 字段及继承检查使用最新 Maple 源码独立 Vite 生产构建的辅助页面（272 项），Form/Search 的 36 项直接使用最新文档生产快照。桌面 1280px、手机 375px，分别亮暗主题。实际交互覆盖隔离草稿、取消、确认、inline 直接模型更新、继承优先级、Search 菜单及全屏搜索。检查公共字段覆盖清单、浏览器异常、溢出、弹层边界与计算样式；AutoComplete 候选行高度、字体、padding 与 Select 逐项比较一致。

默认规则保持：Select、Cascader、AutoComplete、Date/DateRange、Time/TimeRange 为 popup，其余字段及 Search 为 inline；Form/FormItem 未配置时保留字段默认值，显式配置继承，字段优先级最高。AutoComplete 默认 popup 与用户最终确认一致。

人工核查截图：

- [AutoComplete 手机暗色](screenshots/AutoComplete-mobile-dark-popup.png)
- [AutoComplete 手机亮色](screenshots/AutoComplete-mobile-light-popup.png)
- [Select 桌面亮色](screenshots/Select-desktop-light-popup.png)
- [真实 Form 手机暗色 inline](screenshots/mobile-dark-field-components-inline.png)

## 固定输入与可恢复工具

- sourceFingerprint: `5217800b9dc1bb34dbb2934577d6265373526e389b7fd1f3a253036fd8be5a01`
- productionFingerprint: `e72172ce78cd8387f28179d1163968b7abfd331d13e8259a62f4247fd7372b00`
- 文档 index SHA-256: `cffd8de1331e27b8c4748d5e00a9b29c598d62804453e71d3a6261a49bf07f13`

专项与视觉复核开始、结束的双指纹一致；辅助页面打包时的输入也一致；文档快照 index 与复验结束时的实际产物一致。完成记录见 [completion.json](completion.json)、[inputs.json](inputs.json)、[fixture-inputs.json](fixture-inputs.json)。

工具从原归档恢复至系统临时目录，仅调整工作路径、证据目录并增加文档 index 指纹记录；不改检查条件、超时或错误处理。脚本和辅助构建未放回工作区，8 个工具/构建文件已再次归档并逐文件校验：[工具归档](acceptance-tools.tar.gz)、[SHA-256 清单](tools-manifest.json)、[临时路径](tools-location.json)、[辅助构建日志](fixture-build.log)。

最新完整文档矩阵和原主题门禁仍在总验收中，状态由 [总验收报告](../../../../design-ui/audits/full-build-ci-2026-10-24.md) 维护。本报告对应本次 308+24 专项，不沿用旧产物的全量通过结果。
