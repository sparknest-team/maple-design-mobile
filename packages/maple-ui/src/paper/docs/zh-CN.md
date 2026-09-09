# Paper 基础表面

Paper 是承载内容的底层表面：背景、圆角、可选边框与阴影。不提供 variant、status、标题或内容结构，不添加默认内边距。需要完整卡片结构时使用 Card；只需要布局时使用 div 或 Space。

适用于自定义面板、表单分区、侧栏底板以及弹层内部表面。Paper 不负责弹层定位、焦点管理，也不会自动赋予按钮语义。交互内容请使用 Button 等语义组件。

## 示例

```html
<mp-paper bordered>基础边框</mp-paper>
<mp-paper bordered :elevation="2" style="padding: 16px">边框与阴影独立</mp-paper>
<mp-paper :width="120" height="4rem" :radius="8" />
```

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
| --mp-paper-background | var(--mp-color-bg-2) |
| --mp-paper-border-radius | 4px |
| --mp-paper-border-width | 1px |
| --mp-paper-border-color | var(--mp-color-border) |
| --mp-paper-transition-duration | 0.25s |

内置主题可覆盖背景和圆角。bordered=false 不占边框空间，开启后使用 border-box；固定宽高包含边框。背景、边框和阴影彼此独立。

### 类型

```ts
import type { PaperProps, PaperInstance } from '@maplejs/maple-ui'
```

## 独立同源维护

两端分别保存主体、Props、样式、token 和契约测试，只调整前缀及本地导入；不引用跨库核心，不共享组件实例或状态。

Maple 迁移说明：默认背景改为主题表面色，默认不再显示手形光标；inline 内部类改为 mp-paper--inline。原有尺寸、圆角、阴影与水波 API 保留。
