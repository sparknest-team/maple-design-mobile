## Design

共享候选请求控制器负责最短查询长度、防抖与取消；选择字段各自管理输入、弹层及提交。InputTag 的候选 value 为模型值，选中标签的 label 在组件实例内缓存，初始值仍可由 fallbackOption 解析。autoCommitSingle 仅在当前查询完成、字段仍在编辑且恰有一个可选项时生效。默认关闭以避免意外替换输入。
