# BreadcrumbItem 文档

见 [Breadcrumb 面包屑](#/zh-CN/breadcrumb)。

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `separator` | 分隔符（覆盖父级） | _string \| number_ | `-` |
| `href` | 跳转链接 | _string_ | `-` |
| `droplist` | 下拉菜单内容 | _BreadcrumbRoute[]_ | `-` |
| `dropdown-props` | 下拉菜单属性 | _MenuProps_ | `-` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发（省略项不触发） | `event: MouseEvent` |
| `select` | 选择内置下拉项时触发 | `route: BreadcrumbRoute` |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 面包屑内容 |
| `separator` | 自定义分隔符 |
| `droplist` | 自定义下拉菜单 |
