# Popover 气泡卡片

点击触发元素后展示结构化内容。Popover 可以包含按钮、表单和其他交互元素；纯文字说明使用 Tooltip。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 交互内容与状态保留

```demo
../example/demos/interactive.vue
```

### 位置、偏移与同宽

```demo
../example/demos/placement.vue
```

```demo
../example/demos/offset.vue
```

```demo
../example/demos/auto-fit-popup-width.vue
```

### 触发方式、受控状态与事件

```demo
../example/demos/trigger.vue
```

```demo
../example/demos/two-way-binding.vue
```

```demo
../example/demos/events.vue
```

```demo
../example/demos/disabled.vue
```

## API

Popover 继承 Trigger 的定位、容器、受控状态、关闭策略和公开方法。

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:open | 受控打开状态 | `boolean` | — |
| default-open | 非受控初始状态 | `boolean` | `false` |
| title | 标题 | `string` | — |
| content | 正文 | `string` | — |
| trigger | 触发方式 | `TriggerEvent \| TriggerEvent[]` | `click` |
| placement | 首选方位 | `TriggerPlacement` | `bottom` |
| show-arrow | 是否显示箭头 | `boolean` | `true` |
| popup-offset | 沿方位主轴的距离 | `number` | `10` |
| popup-translate | 屏幕轴附加平移 | `[number, number] \| Record` | — |
| popup-container | 挂载容器；false 原地渲染 | `string \| HTMLElement \| false` | `body` |
| reference | 外部触发元素 | `string \| HTMLElement \| SVGElement` | — |
| disabled | 禁止打开 | `boolean` | `false` |
| unmount-on-close | 关闭后卸载；默认保留交互草稿 | `boolean` | `false` |
| close-on-click-reference | 再次点击触发元素时关闭 | `boolean` | `true` |

### 事件

| 事件名 | 说明 |
| --- | --- |
| update:open | 请求修改受控打开状态 |
| open-change | 请求修改打开状态 |
| open | 开始打开 |
| opened | 入场动画完成 |
| close | 开始关闭 |
| closed | 离场动画完成 |
| click-outside | 点击浮层外部 |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 触发元素 |
| title | 标题；未提供时使用 `title` 属性 |
| content | 正文；未提供时使用 `content` 属性 |

### 方法

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

触发元素通过 `aria-controls`、`aria-expanded` 与面板关联。无样式定位使用 Trigger；不提供 `defaultStyle`、`popoverClass` 或 `elevation`，自定义外观使用 Token、`content-class` 或 `content-style`。
