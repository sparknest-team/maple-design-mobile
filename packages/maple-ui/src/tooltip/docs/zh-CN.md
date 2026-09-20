# Tooltip 文字气泡

用于补充说明按钮、图标或被截断的文字。默认同时响应鼠标悬停和键盘聚焦；需要承载可操作内容时使用 Popover。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 尺寸

只实现 `md` 和 `xs` 两档，默认 `md`。

```demo
../example/demos/size.vue
```

### 内容、主题与颜色

```demo
../example/demos/content-slot.vue
```

```demo
../example/demos/theme-color-tooltip.vue
```

```demo
../example/demos/custom-color.vue
```

### 位置、偏移与触发

```demo
../example/demos/placement.vue
```

```demo
../example/demos/offset.vue
```

```demo
../example/demos/trigger.vue
```

### 事件与禁用

```demo
../example/demos/events.vue
```

```demo
../example/demos/disabled.vue
```

## API

Tooltip 继承 Trigger 的定位、容器、受控状态、关闭策略和公开方法。

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:open | 受控打开状态 | `boolean` | — |
| default-open | 非受控初始状态 | `boolean` | `false` |
| content | 提示内容 | `string` | — |
| status | 面板主题 | `default \| primary \| info \| success \| warning \| danger` | `default` |
| size | 尺寸；只实现两档 | `xs \| md` | `md` |
| color | 自定义背景色 | `string` | — |
| text-color | 自定义文字色 | `string` | — |
| trigger | 触发方式 | `TriggerEvent \| TriggerEvent[]` | `['hover', 'focus']` |
| placement | 首选方位 | `TriggerPlacement` | `top` |
| show-arrow | 是否显示箭头 | `boolean` | `true` |
| popup-offset | 沿方位主轴的距离 | `number` | `10` |
| popup-translate | 屏幕轴附加平移 | `[number, number] \| Record` | — |
| popup-container | 挂载容器；false 原地渲染 | `string \| HTMLElement \| false` | `body` |
| reference | 外部触发元素 | `string \| HTMLElement \| SVGElement` | — |
| disabled | 禁止打开 | `boolean` | `false` |
| unmount-on-close | 关闭后卸载内容 | `boolean` | `true` |

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
| content | 提示内容；未提供时使用 `content` 属性 |

### 方法

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

内容具有 `role="tooltip"`，打开时通过 `aria-describedby` 与实际触发元素关联。两端独立保存同一份实现，不提供 `backgroundColor` 或布尔 `xs` 兼容入口。
