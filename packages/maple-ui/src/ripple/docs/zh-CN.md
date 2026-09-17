# 水波指令

### 介绍

元素点击时生成一个水波扩散的效果。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 自定义颜色

```demo
../example/demos/custom-color.vue
```

### 禁用状态

```demo
../example/demos/disabled-status.vue
```

## API

### 选项

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `color` | 水波纹的颜色 | _string_ | `currentColor` |
| `disabled` | 禁用状态 | _boolean_ | `false` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` |
| `--ripple-color` | `currentColor` |
