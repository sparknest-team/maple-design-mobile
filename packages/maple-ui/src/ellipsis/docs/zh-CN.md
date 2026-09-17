# 文本省略

### 介绍

主要用于省略单行文字和多行文字。

### 单行省略

```demo
../example/demos/line.vue
```

### 多行省略

```demo
../example/demos/multiple-line.vue
```

### 双向绑定

```demo
../example/demos/two-way-binding.vue
```

### 点击文字展开

```demo
../example/demos/expand.vue
```

### 自定义 Tooltip

```demo
../example/demos/tooltip.vue
```

## API

### 属性

| 参数  | 说明   | 类型  | 默认值 |
|-------|------|----|----|
| `v-model:expand` | 是否展开 | _boolean_  | `false` |
| `expand-trigger` | 展开触发方式，可选值 `click` | _string_  | `-` |
| `line-clamp` | 最大显示行数，兼容性见 [line-clamp](https://caniuse.com/?search=line-clamp) | _string_  | `-` |
| `tooltip` | Tooltip 组件配置，用于深度定制。为了更方便使用，`autoFitPopupWidth` 在这里默认为 `true` | _boolean \| TooltipProps_  | `true` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 文字内容 | `-` |
| `tooltip-content` | Tooltip 的内容 | `-` |