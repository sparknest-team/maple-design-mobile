# 原位编辑与纯阅读收敛

按产品要求，移除旧字段 presentation 的 popover/dialog/read 和 editTrigger 配置。Cedar 只支持 inline/click/dblclick；Maple 只支持 inline/popup。默认 inline 不变。新增独立 readPretty，与 readonly/disabled 同级继承。
