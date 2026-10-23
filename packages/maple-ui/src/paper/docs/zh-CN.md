# Paper 基础表面

Paper 是承载内容的底层表面：背景、圆角、可选边框与阴影。不提供 variant、status、标题或内容结构，不添加默认内边距。需要完整卡片结构时使用 Card；只需要布局时使用 div 或 Space。

适用于自定义面板、表单分区、侧栏底板以及弹层内部表面。Paper 不负责弹层定位、焦点管理，也不会自动赋予按钮语义。交互内容请使用 Button 等语义组件。


## 案例

### basic usage

```demo
../example/demos/basic-usage.vue
```

### bordered

```demo
../example/demos/bordered.vue
```

### ripple

```demo
../example/demos/ripple.vue
```

### round

```demo
../example/demos/round.vue
```

### radius

```demo
../example/demos/radius.vue
```

### slot

```demo
../example/demos/slot.vue
```


```html
<mp-paper bordered>基础边框</mp-paper>
<mp-paper bordered :elevation="2" style="padding: 16px">边框与阴影独立</mp-paper>
<mp-paper :width="120" height="4rem" :radius="8" />
```

## 动态属性

边框与阴影独立；显式 radius 优先于 round。内部按钮提供键盘语义，父级统计 Paper click，不将表面容器伪装成按钮。

```demo
../example/demos/live-properties.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 显示边框，与 elevation 独立 | boolean | false |
| elevation | false 关闭；true 使用 2 级；数字为 0–24 | boolean / number | false |
| ripple | 启用水波效果，不自动赋予按钮语义 | boolean | false |
| radius | 圆角，显式值优先于 round | number / string | — |
| width | 宽度 | number / string | — |
| height | 高度 | number / string | — |
| round | 50% 圆角；宽高相等时为圆形 | boolean | false |
| inline | 使用 inline-flex | boolean | false |

radius、width、height 的数字和数字字符串使用 px，其他字符串按 CSS 长度传递，例如 1rem、50%、calc(100% - 8px)。类名、原生属性和自定义样式透传到根容器。

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击时触发一次 | MouseEvent |

### Slots

| 插槽 | 说明 |
| --- | --- |
| default | 表面内部内容 |

### 样式变量

| 变量 | 默认值 |
| --- | --- |
| --mp-paper-background | `var(--mp-sys-color-surface-default)` |
| --mp-paper-border-radius | `4px` |
| --mp-paper-border-width | `1px` |
| --mp-paper-border-color | `var(--mp-sys-color-border-default)` |
| --mp-paper-transition-duration | `var(--mp-sys-motion-duration-slow)` |

内置主题可覆盖背景和圆角。bordered=false 不占边框空间，开启后使用 border-box；固定宽高包含边框。背景、边框和阴影彼此独立。

### 类型

```ts
import type { PaperProps, PaperInstance } from '@maplejs/maple-ui'
```

## 独立同源维护

两端分别保存主体、Props、样式、token 和契约测试，只调整前缀及本地导入；不引用跨库核心，不共享组件实例或状态。

Maple 迁移说明：默认背景改为主题表面色，默认不再显示手形光标；inline 内部类改为 mp-paper--inline。原有尺寸、圆角、阴影与水波 API 保留。

内置动效遵循 prefers-reduced-motion: reduce：保留内容与状态反馈，关闭装饰性旋转、扫光和波纹。Icon 名称切换跳过等待，并取消尚未结束的切换。Ripple 时长变量只控制 CSS，250ms 生命周期计时未改变，每段视觉时长应不超过 250ms；自定义动画类由调用方负责适配。
