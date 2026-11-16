# FormSection 局部表单分区

为 Form 模块增加 FormSection 子组件，支持 line / plain / card 风格、标题操作插槽、可选底部结束线及父表单布局继承。Cedar 与 Maple 独立实现并保持 API 一致。没有现存分组 API 需要兼容。

公开属性：id 自动生成、title/description 默认为空、showMarker 默认 true、showEndDivider 默认 false。插槽：default、title、description、extra。通过 Form.Section、命名导出及 resolver 使用；样式归属 form。

不创建或覆盖 Form 上下文，字段继续参与同一标签测量、禁用、校验和重置。无额外缩进、外框或背景。局部分组示例仅包含现场处置 SOP、安全须知、处置要点，底部结束线之外展示技能等级与作业证。折叠与独立布局覆盖不在本次范围。

variant 默认为 line；plain 仅标题，card 带边框、圆角和内容内边距并忽略单独结束线。风格切换保留字段实例与输入值。文档提供风格切换和引用模板／清空的标题操作示例。
