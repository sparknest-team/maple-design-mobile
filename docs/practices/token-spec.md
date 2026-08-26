# Maple Design Token 规范

## Token 层级

- 全局基础 token：`--mp-ref-<category>-<name>`。
- 全局语义 token：`--mp-sys-<category>-<role>`。
- 组件 token：`--mp-<component>-<dimension>-<state>-<property>`。

现有主题 token 在专项迁移完成前可以继续使用；新增 token 必须带 `--mp-` 前缀。

## 组件 Token

组件 token 在 `<component>.less` 的 `:root` 或对应主题文件集中声明。命名片段顺序为：

```text
component → variant/status/size → interaction state → property
```

示例：

```css
--mp-button-size-md-height
--mp-button-status-primary-background-color
--mp-button-variant-outline-status-primary-hover-border-color
```

主样式不得新增颜色、字号、间距、圆角、阴影和动画时长常量。BEM modifier 不是 token。
Space 使用 `--mp-space-size-<size>-row-gap` 与
`--mp-space-size-<size>-column-gap` 作为正式组件 token。该命名依次表达组件、
尺寸变体和最终 CSS 属性，同时允许水平与垂直间距不同，符合本规范，
不再进行重命名。不要将它们合并为单一 `gap` token，否则会丢失方向语义。

token 重命名必须同步源码、主题、文档和测试。同一语义只保留一个正式 token，不提供旧 token fallback。
