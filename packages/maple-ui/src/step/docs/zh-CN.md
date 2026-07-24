## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| ----- | -------------- | -------- | ---------- |
| `title` | 步骤标题 | _string_ | `-` |
| `description` | 步骤描述 | _string_ | `-` |
| `status` | 步骤状态（覆盖自动推导） | _'wait' \| 'process' \| 'finish' \| 'error'_ | `-` |
| `disabled` | 是否禁用 | _boolean_ | `false` |

### 插槽

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `default` | 步骤标题（优先于 `title`） | `-` |
| `icon` | 自定义节点图标 | `{ step: number, status: string }` |
| `description` | 步骤描述 | `-` |
