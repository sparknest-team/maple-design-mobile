# ProgressGroup 分段进度条

### 介绍

将多个数值展示为同一条进度轨中的分段，并提供对应图例。

### 基础用法

```demo
../example/demos/basic.vue
```

### 进度轨尺寸

```demo
../example/demos/size.vue
```

### 排列方向

```demo
../example/demos/orientation.vue
```

### 环形分段进度

```demo
../example/demos/circle.vue
```

### 默认颜色与纯进度轨

```demo
../example/demos/color.vue
```

### 自定义内容

```demo
../example/demos/custom.vue
```

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 分段数据 | `ProgressGroupItem[]` | `[]` |
| mode | 展示模式 | `line \| circle` | `line` |
| max | 计算占比时的总值 | `number` | `100` |
| status | 是否展示累计百分比 | `boolean` | `false` |
| size | 进度轨尺寸 | `xs \| sm \| md \| lg \| xl` | `md` |
| color | 默认分段颜色 | `string` | 主题主色 |
| circle-size | 环形模式的直径 | `number \| string` | `120` |
| stroke-width | 环形模式的轨道宽度 | `number` | `8` |
| tooltip | 是否显示分段悬浮/聚焦提示 | `boolean` | `true` |
| orientation | 排列方向 | `horizontal \| vertical` | `horizontal` |

### Slots

| 名称 | 插槽参数 |
| --- | --- |
| status | `{ percent, value, max }` |
| tooltip | `{ item, index, percent }` |
| item / item-leading / item-label / item-trailing | `{ item, index, percent }` |
