---
"@maplejs/maple-ui": minor
"@maplejs/resolver": patch
---

将 Input、InputPassword、InputGroup、InputGroupLabel 和 FieldDecorator 整理为两端独立复制的同源实现。补齐浮动提示、外部标签处理、组合状态继承、校验反馈、原生属性与光标保持；移动端保留有值常驻清除按钮。迁移 FieldDecorator 调用方并补齐子组件按需解析、demo 和类型。
