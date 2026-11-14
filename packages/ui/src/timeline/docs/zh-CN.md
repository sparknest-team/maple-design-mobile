
# Timeline

按照时间顺序或倒序规则的展示信息内容。

## 基础示例

### 基础用法

基本使用

<demo src="../example/demos/basic.vue"></demo>

## 外观与状态

### 自定义轴线样式

自定义轴线的示例。

<demo src="../example/demos/type.vue"></demo>

## 布局与排列

### 时间线方向与标签

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `mode` | 时间轴的展示类型：时间轴在左侧，时间轴在右侧, 交替出现。 | 时间线方向与标签 |
| `label-position` | 设置标签文本的位置 | 时间线方向与标签 |
| `orientation` | 时间轴主线的横纵朝向，默认 vertical；约束节点侧别的可用方向 | 时间线方向与标签 |
| `pending` | 追加待完成节点；true 无文案，字符串显示为节点内容。 | 时间线方向与标签 |
<!-- demo-config-notes:end -->

比较排列方向、顺序与标签位置；待完成状态和自定义节点不与布局混合。

<details>
<summary>配置说明与使用限制</summary>

#### 纵向时间轴

竖直方向的时间轴。

#### 横向时间轴

可以通过 `orientation` 设置展示横向时间轴

#### 标签文本位置

通过 `labelPosition` 可以设置标签文本的位置。

</details>

<demo src="../example/demos/layout-comparison.vue"></demo>

## 内容与展示

### 幽灵节点

当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，通过 `dot` 插槽定制其轴点。
<demo src="../example/demos/pending.vue"></demo>

### 时间轴展示类型

设置 `mode=alternate`时将会交替展示内容。可通过 `TimelineItem` 的 `content-placement` 设置正文所在侧。

<demo src="../example/demos/mode.vue"></demo>

## 自定义与插槽

### 自定义节点内容

自定义节点内容

<demo src="../example/demos/icon.vue"></demo>

### 自定义节点

可以通过属性 `dotColor`, `dotType` 设置节点的颜色以及节点类型。同时可通过 `dot` 直接传入 DOM

<demo src="../example/demos/dot.vue"></demo>

### 自定义标签

可以通过 `label` 插槽自定义标签

<demo src="../example/demos/custom.vue"></demo>

## API

### Timeline Props

| 参数名         | 描述                                                                                    | 类型                                                    |    默认值    |
| -------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------- | :----------: |
| reverse        | 是否倒序                                                                                | `boolean`                                               |   `false`    |
| orientation      | 时间轴主线的横纵朝向，默认 vertical；约束节点侧别的可用方向 | `'horizontal' \| 'vertical'`                            | `'vertical'` |
| mode           | 时间轴的展示类型：时间轴在左侧，时间轴在右侧, 交替出现。                                | `'left' \| 'right' \| 'top' \| 'bottom' \| 'alternate'` |   `'left'`   |
| pending        | 追加待完成节点；true 无文案，字符串显示为节点内容。 | `boolean\|string`                                       |     `-`      |
| label-position | 设置标签文本的位置                                                                      | `'relative' \| 'same'`                                  |   `'same'`   |

### Timeline Slots

| 插槽名 |   描述   | 参数 |
| ------ | :------: | ---- |
| default | 时间线节点列表 | - |
| dot | 待完成节点的图标 | - |
| pending | 待完成节点内容；提供时追加节点并优先于 pending 属性文本 | - |

### TimelineItem Props

| 参数名     | 描述                         | 类型                              |  默认值   |
| ---------- | ---------------------------- | --------------------------------- | :-------: |
| dot-color  | 节点颜色                     | `string`                          |    `-`    |
| dot-type   | 节点类型：空心圆/实心圆      | `'hollow' \| 'solid'`             | `'solid'` |
| line-type  | 时间轴类型：实线/虚线/点状线 | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |
| line-color | 时间轴颜色                   | `string`                          |    `-`    |
| label      | 标签文本                     | `string`                          |    `-`    |
| content-placement   | 当前单项在交替模式下相对时间轴的侧别，竖向为 left/right、横向为 top/bottom；受 mode 与 orientation 约束 | `TimelineItemContentPlacement`<br>`'left' \| 'right' \| 'bottom' \| 'top'` |    `-`    |

通过 `content-placement` 设置正文所在的物理侧：水平布局使用 top/bottom，垂直布局使用 left/right。排列方式由 `mode` 控制。

### TimelineItem Slots

| 插槽名 |    描述    | 参数 | 版本   |
| ------ | :--------: | ---- | :----- |
| default | 节点正文 | - | |
| dot    | 自定义节点 | -    |        |
| label  | 自定义标签 | -    | 2.50.0 |

## Types

组件导出以下类型定义

```ts
import type { TimelineProps, TimelineItemProps, TimelineSlots, TimelineItemSlots, TimelineMode, TimelineLabelPosition, TimelineDotType, TimelineLineType, TimelineItemContentPlacement, TimelineInstance, TimelineItemInstance } from '@cedar-design/ui-vue'
```

## 阅读方向与键盘交互

Timeline 继承容器阅读方向，横向时间轴的节点和连接线随 LTR/RTL 排列。`reverse` 单独控制视觉倒序，切换阅读方向不会修改节点数据或自动切换 `reverse`。

纵向显式 `mode="left"` / `mode="right"` 及子项的物理侧别保持原意；`alternate` 继续在两侧交替。标签和自定义内容正常继承文字方向。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-timeline-alternate-horizontal-min-height` | `var(--mp-size-50)` | `min-height` |
| `--mp-timeline-content-text-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-timeline-dot-bg` | `rgb(var(--mp-primary-6))` | `background-color`, `border`, `color` |
| `--mp-timeline-dot-bg-hollow` | `var(--mp-color-bg-2)` | `background-color` |
| `--mp-timeline-dot-border-radius` | `var(--mp-border-radius-circle)` | `border-radius` |
| `--mp-timeline-dot-border-width-hollow` | `var(--mp-border-width-2)` | `border` |
| `--mp-timeline-dot-size-width` | `var(--mp-spacing-3)` | `bottom`, `height`, `inset-inline-start`, `left`, `margin-left`, `margin-top`, `padding-bottom`, `padding-left`, `padding-right`, `padding-top`, `top`, `width` |
| `--mp-timeline-font-content-size` | `var(--mp-font-size-body-3)` | `bottom`, `font-size`, `height`, `line-height`, `top` |
| `--mp-timeline-font-label-size` | `var(--mp-font-size-body-1)` | `font-size` |
| `--mp-timeline-horizontal-dot-content-height` | `var(--mp-spacing-3)` | `height`, `line-height` |
| `--mp-timeline-horizontal-margin-content-spacing` | `var(--mp-spacing-7)` | `margin-bottom`, `margin-top`, `padding-bottom`, `padding-top` |
| `--mp-timeline-horizontal-margin-line-left` | `var(--mp-spacing-3)` | `inset-inline-start` |
| `--mp-timeline-horizontal-margin-line-right` | `var(--mp-spacing-2)` | `inset-inline-end` |
| `--mp-timeline-item-min-height` | `78px` | `min-height` |
| `--mp-timeline-label-relative-horizontal-margin` | `var(--mp-size-13)` | `margin-bottom`, `margin-top` |
| `--mp-timeline-label-relative-margin` | `var(--mp-size-25)` | `margin-left`, `margin-right` |
| `--mp-timeline-label-relative-max-width` | `var(--mp-size-25)` | `max-width` |
| `--mp-timeline-label-text-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-timeline-line-bg` | `var(--mp-color-neutral-3)` | `border-color` |
| `--mp-timeline-size-line-width` | `var(--mp-border-width-1)` | `border-left-width`, `border-top-width`, `height`, `width` |
| `--mp-timeline-vertical-margin-content-bottom` | `var(--mp-spacing-2)` | `margin-bottom` |
| `--mp-timeline-vertical-margin-content-left` | `var(--mp-spacing-7)` | `margin-left`, `margin-right`, `padding-left`, `padding-right` |
| `--mp-timeline-vertical-margin-line-bottom` | `var(--mp-spacing-2)` | `bottom` |
| `--mp-timeline-vertical-margin-line-top` | `var(--mp-spacing-2)` | `top` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-timeline-content-text-color: var(--mp-color-text-1);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
