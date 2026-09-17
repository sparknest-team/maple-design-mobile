# 通知栏

### 介绍

用于展示临时性的系统通知或运营消息。

### 基本使用

```demo
../example/demos/basic.vue
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `text` | 通知文本 | `string` | `-` |
| `type` | 类型 | `info \| success \| warning \| danger` | `warning` |
| `mode` | `closeable` 时显示关闭按钮 | `closeable` | `-` |
| `icon` | 左侧图标名，空字符串隐藏 | `string` | `info-circle` |
| `color` | 文字颜色 | `string` | `-` |
| `background` | 背景色 | `string` | `-` |
| `scrollable` | 是否滚动 | `boolean` | `false` |
| `speed` | 滚动速度（px/s） | `number \| string` | `50` |
| `delay` | 滚动开始前延迟（秒） | `number \| string` | `1` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `close` | 关闭时触发 | `event` |
| `replay` | 滚动一轮结束时触发 | `-` |

### 插槽

| 名称 | 说明 |
| --- | --- |
| `default` | 通知内容 |
| `icon` | 左侧图标 |
| `action` | 右侧操作区 |
