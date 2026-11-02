# 设计与跨端范围

- DatePickerField: year/month/day/hour/minute/second；TimePickerField: hour/minute/second。picker-fields 为非空、无重复的只读数组；按顺序投影滚轮列。范围两端共用。
- Date 的 type/show-time 约束实际区域；未指定某区域的适用字段时保留该区域默认列。默认秒列由 use-seconds 决定，显式时间字段优先。不解析输入 format 决定列。
- 完整 civil 值/clock 值仍由原所有者管理。所有编辑合并回完整值，保留未编辑的年、日、秒等单位；禁止为满足约束静默移动隐藏单位。
- 时间 hour 在十二小时制下自动附带 AM/PM；隐藏 hour 时保留既有时段。步长与禁用规则继续应用。
- 日期时间内部转换保存完整秒精度，再由 value-format 序列化，避免因输入 format 或列隐藏造成数据损失。
- 显式时间列配置作用于日历旁及详细时间滚轮；不改变日期网格或导航。根配置不可由嵌套展示 props 覆盖。
- Maple 特有滚轮能力登记于 design-ui/platforms/maple.md。Cedar 的公共日期/时间校验不变；嵌套配置过滤规则保持同源。
