# 下拉刷新 PullRefresh

用于在列表顶部提供下拉刷新交互。

## 案例

### 基本使用

```demo
../example/demos/basic.vue
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 是否处于加载中 | `boolean` | `-` |
| `disabled` | 是否禁用下拉刷新 | `boolean` | `false` |
| `target` | 滚动容器，未传入时监听最近的可滚动祖先 | `string \| HTMLElement` | `-` |
| `animation-duration` | 回弹动画时长（ms） | `number \| string` | `300` |
| `success-duration` | 成功状态展示时长（ms） | `number \| string` | `2000` |
| `bg-color` | 指示器背景色 | `string` | `-` |
| `color` | 指示器颜色 | `string` | `-` |
| `success-bg-color` | 成功状态指示器背景色 | `string` | `-` |
| `success-color` | 成功状态指示器颜色 | `string` | `-` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `refresh` | 触发刷新时 | `-` |
| `update:model-value` | 加载状态变化时 | `(value: boolean)` |

### 插槽

| 名称 | 说明 |
| --- | --- |
| `default` | 列表内容 |

## 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-pull-refresh-size` | `40px` |
| `--mp-pull-refresh-background` | `#fff` |
| `--mp-pull-refresh-color` | `var(--mp-color-primary)` |
| `--mp-pull-refresh-success-color` | `var(--mp-color-success)` |
| `--mp-pull-refresh-icon-size` | `25px` |
