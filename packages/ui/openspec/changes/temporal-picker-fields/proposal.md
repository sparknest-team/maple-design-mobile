# 统一滚轮可见字段

保留 DatePicker/DateRangePicker/TimePicker/TimeRangePicker 名称和既有 calendar/picker 模式。新增 picker-fields，统一控制移动端日期、日期范围、时间、时间范围及其独立面板中的列式滚轮。Date 的 format 恢复只控制输入框显示，value-format 控制模型；Time 保留已有 format 字符串协议，本次只解耦显式滚轮列配置。

日历网格、今天标记、候选草稿和提交边界保持不变。不增加 use-year/use-month 等布尔开关，不新增无消费者的 PC 日期滚轮属性。
