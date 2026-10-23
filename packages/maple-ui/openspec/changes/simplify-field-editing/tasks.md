# 验收

- [x] 同步两端 Form/FormItem/字段 API、文档和示例，删除旧入口。
- [x] 覆盖默认 inline、继承与显式 false、readPretty、单击/双击、草稿取消与确认。
- [x] 验证异步搜索/确认、校验失败保留草稿、disabled/readonly、重置关闭。
- [x] 运行类型、同源、lint 与相关测试；浏览器验证两端 Form 示例。

验证记录：Cedar 348 项、Maple 291 项相关测试通过；Cedar 后续弹层层级与日期操作区变更再通过 110 项回归。两端类型、Maple 全仓 lint、六项相关同源检查通过。全量 1407 个 demo SFC 检查通过；浏览器验证结果保存在 design-ui/audits/evidence/field-editing-2026-10-21。
