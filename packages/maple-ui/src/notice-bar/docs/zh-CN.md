# 通知栏

### 介绍

用于展示临时性的系统通知或运营消息。

## 基础示例

### 基本使用

```demo
../example/demos/basic.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。图标、文字和关闭区继承阅读顺序。滚动文字从阅读终点移向起点，RTL 下更换运动方向，不镜像文字或改变关闭/重播事件含义。

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
