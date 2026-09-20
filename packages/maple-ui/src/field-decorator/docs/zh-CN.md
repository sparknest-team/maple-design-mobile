# FieldDecorator 字段装饰器

`FieldDecorator` 是 Input、Textarea、Select 和日期时间选择器共用的字段外壳，统一负责尺寸、变体、浮动提示、清除按钮及前后缀布局。业务代码通常不直接使用它。

## 平台约定

- Maple 默认使用 `standard` 变体，Cedar 默认使用 `filled` 变体。
- Maple 的 `small`、`normal` 分别对应公共尺寸语义 `sm`、`md`。
- 共享样式语义使用 `field-*` Token；移动端特有的提示几何 Token 作为平台扩展维护。
