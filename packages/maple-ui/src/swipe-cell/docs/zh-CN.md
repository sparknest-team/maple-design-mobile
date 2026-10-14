# 滑动单元格

## 介绍

单元格左右滑动以显示操作按钮，常用于列表删除、收藏等场景。

## 案例

### 基本使用

向左滑动单元格，显示右侧操作。

```demo
../example/demos/basic.vue
```

### 左右两侧

```demo
../example/demos/both-sides.vue
```

### 关闭前确认

`Dialog.confirm(...)` 返回动作值，只有 `confirm` 允许收起；取消或关闭返回 `false`，保留已展开的操作区。普通示例中的“删除”只演示关闭动作，业务删除需自行处理。

```demo
../example/demos/before-close.vue
```

### 可访问性

- 操作区按钮应自带可读文本或 `aria-label`。
- 禁用时设置 `disabled`，组件不再响应滑动。
## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 标识符 | `string \| number` | `''` |
| `left-width` | 左侧操作区宽度，`auto` 时按内容测量 | `number \| string` | `auto` |
| `right-width` | 右侧操作区宽度 | `number \| string` | `auto` |
| `before-close` | 关闭前钩子，返回 `false` 阻止关闭 | `(args) => boolean \| Promise<boolean>` | `-` |
| `disabled` | 禁用滑动 | `boolean` | `false` |
| `stop-propagation` | 阻止 `touchmove` 冒泡 | `boolean` | `false` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `position: left \| right \| cell \| outside` |
| `open` | 打开时触发 | `{ name, position }` |
| `close` | 关闭时触发 | `{ name, position }` |

### 插槽

| 名称 | 说明 |
| --- | --- |
| `default` | 主内容 |
| `left` | 左侧操作区 |
| `right` | 右侧操作区 |

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `open` | 打开侧栏 | `left \| right` |
| `close` | 收起 | `-` |
