# Affix

与 Cedar 使用相同场景、参数和交互顺序；示例源码仅替换组件前缀，主题与站点外壳各自保留。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## 布局与排列

### 吸附方向、偏移与容器

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `target` | 滚动容器或选择器；省略时寻找最近滚动父元素，找不到则使用 window | 吸附方向、偏移与容器 |
| `offset-top` | 相对滚动容器顶部的吸附距离，支持 CSS 长度 | 吸附方向、偏移与容器 |
| `offset-bottom` | 相对滚动容器底部的吸附距离；设置后优先于 offset-top，0 也有效 | 吸附方向、偏移与容器 |
<!-- demo-config-notes:end -->

分别滚动三个有边框的区域，比较顶部/底部吸附和不同偏移；每个预览独立指定滚动容器。

```demo
../example/demos/offset-container-comparison.vue
```

## 交互与控制

### 吸附状态变化

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `target` | 滚动容器或选择器；省略时寻找最近滚动父元素，找不到则使用 window | 吸附状态变化、禁用、CSS 模式与手动更新 |
| `offset-top` | 相对滚动容器顶部的吸附距离，支持 CSS 长度 | 吸附状态变化、禁用、CSS 模式与手动更新 |
| `disabled` | 禁用吸附 | 禁用、CSS 模式与手动更新 |
| `css-mode` | 使用原生 position: sticky，受祖先 overflow 和容器边界影响 | 禁用、CSS 模式与手动更新 |
| `z-index` | 固钉层级 | 禁用、CSS 模式与手动更新 |
<!-- demo-config-notes:end -->

```demo
../example/demos/fix-change.vue
```

### 禁用、CSS 模式与手动更新

```demo
../example/demos/controls.vue
```

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset-top | 相对滚动容器顶部的吸附距离，支持 CSS 长度 | `number / string` | `0` |
| offset-bottom | 相对滚动容器底部的吸附距离；设置后优先于 offset-top，0 也有效 | `number / string` | `undefined` |
| target | 滚动容器或选择器；省略时寻找最近滚动父元素，找不到则使用 window | `string / HTMLElement / Window` | `undefined` |
| target-container | 额外监听的外层滚动容器或选择器；不传则不额外监听，也不作为裁剪边界 | `string / HTMLElement / Window` | `undefined` |
| z-index | 固钉层级 | `number / string` | `10` |
| disabled | 禁用吸附 | `boolean` | `false` |
| css-mode | 使用原生 position: sticky，受祖先 overflow 和容器边界影响 | `boolean` | `false` |

### Events

| 事件 | 参数与时机 |
| --- | --- |
| change | `(fixed: boolean, offset: number)`，固定状态变化时触发；固定时 offset 为吸附阈值，未固定时为距离对应容器边缘的距离，禁用解除固定时为 0 |

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 需要吸附的内容 | — |

### Methods

| 方法 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| updatePosition | 下一动画帧重新绑定滚动容器并计算位置 | — | `Promise<void>` |

### 跨端说明

属性、事件参数、插槽与公开方法一致。CSS 模式遵循浏览器 sticky 规则；示例统一使用独立滚动容器。
<!-- same-source-api:end -->

`change` 只通知固定状态变化：已固定时重复测量不重复发送 true，禁用解除固定发送 false、0。视口单位随测量重新求值。CSS 模式将有效长度交给原生 sticky；JS 模式解析数字、数值字符串、px、rem、vw、vh、vmin、vmax。target 控制监听及 JS 测量，原生 sticky 仍受实际 CSS 祖先约束。停用后，待完成的 `updatePosition()` 不会恢复旧激活代次的监听。
