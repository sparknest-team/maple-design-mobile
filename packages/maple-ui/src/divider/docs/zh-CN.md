# Divider 分割线

用于分隔列表或布局中的内容区域。

继承最近的 `dir="ltr|rtl"`。水平文字 start/end 随阅读方向对齐，垂直文字 start/end 仍表示上/下。inset 表示沿线两端缩进，spacing 表示线外间距：水平线 inset 和垂直线 spacing 的成对数值按逻辑起止解释。竖线边框绘制在逻辑起点，hairline、线型与 aria-orientation 保持原义，方向切换不重建内容。

## 基础示例

### 基础用法

用于分隔相邻的内容区域。

```demo
../example/demos/basic-usage.vue
```

## 布局与排列

### 垂直分割线

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `orientation` | 分割线自身的横纵朝向，默认 horizontal；不控制文字对齐 | 垂直分割线 |
| `type` | 线型 | 垂直分割线 |
| `text-align` | 文字沿分割线的位置；start/end 为逻辑起止位置 | 垂直分割线 |
| `description` | 文字描述；默认插槽优先 | 垂直分割线 |
<!-- demo-config-notes:end -->

设置 `orientation="vertical"`；父容器使用 flex 并提供可用高度。文字沿竖直方向排列。

```demo
../example/demos/vertical.vue
```

## 内容与展示

### 带文字

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `text-align` | 文字沿分割线的位置；start/end 为逻辑起止位置 | 带文字 |
| `description` | 文字描述；默认插槽优先 | 带文字 |
| `inset` | 沿线两端缩进：水平时左右，竖直时上下 | 线条尺寸、样式与颜色 |
| `spacing` | 线条两侧外间距：水平时上下，竖直时左右 | 线条尺寸、样式与颜色 |
| `orientation` | 分割线自身的横纵朝向，默认 horizontal；不控制文字对齐 | 线条尺寸、样式与颜色 |
| `type` | 线型 | 线条尺寸、样式与颜色 |
<!-- demo-config-notes:end -->

通过 `description` 添加文字，`text-align` 控制起点、居中和终点位置。切换 RTL 可观察逻辑起止方向。

```demo
../example/demos/with-desc.vue
```

### 线条尺寸、样式与颜色

比较线宽/缩进、线型和颜色；带文字与自定义内容保持独立，避免把插槽行为混入线条装饰。

<details>
<summary>配置说明与使用限制</summary>

#### 间距与缩进

对比五档预设、数值、CSS 长度和非对称数组；竖直示例展示切换方向后的作用。

#### 颜色、线宽与透明度

通过 `color`、`thickness`、`opacity` 定制线条。`opacity=0` 保留布局；`hairline` 优先于 `thickness`。

#### 线型

通过 `type` 对比实线、虚线、点线和双线；双线建议设置至少 3px 的 `thickness`。

</details>

```demo
../example/demos/line-appearance-comparison.vue
```

## 自定义与插槽

### 自定义内容

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `type` | 线型 | 自定义内容 |
| `description` | 文字描述；默认插槽优先 | 自定义内容 |
<!-- demo-config-notes:end -->

默认插槽优先于 `description`，自定义内容的留白由调用方设置。

```demo
../example/demos/custom.vue
```

## 交互与控制

### 动态属性

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `orientation` | 分割线自身的横纵朝向，默认 horizontal；不控制文字对齐 | 动态属性 |
| `opacity` | 整个分割线（含文字）的不透明度，范围 0–1；0 保留布局 | 动态属性 |
| `hairline` | 将主题线宽缩放为一半；默认主题下为 0.5px | 动态属性 |
| `thickness` | 有限线宽且至少 1，单位 px；未设置时使用主题默认 1px；hairline 优先 | 动态属性 |
| `inset` | 沿线两端缩进：水平时左右，竖直时上下 | 动态属性 |
| `spacing` | 线条两侧外间距：水平时上下，竖直时左右 | 动态属性 |
<!-- demo-config-notes:end -->

切换方向、默认插槽文字、透明度和细线，观察属性更新及恢复。

```demo
../example/demos/live-properties.vue
```

## 内容与布局

### 内容占位与最小线宽

主动设置 thickness 时，只接受至少为 1 的有限数。hairline 仍优先，使用主题线宽的一半。小于 1（包括 0 和负数）及非有限值不会写入样式，而是使用主题线宽，并在开发环境提示。

带文字、换行描述和默认插槽内容均正常占位，包括 spacing=0 时；后续正文不会被文字覆盖。

```demo
../example/demos/content-flow.vue
```

## 使用说明

### 配置说明

预设值读取当前平台主题；文字留白在桌面端为 16px，移动端为 8px。

## API

### Divider Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `orientation` | 分割线自身的横纵朝向，默认 horizontal；不控制文字对齐 | `horizontal` \| `vertical` | `horizontal` |
| `type` | 线型 | `solid` \| `dashed` \| `dotted` \| `double` | `solid` |
| `text-align` | 文字沿分割线的位置；start/end 为逻辑起止位置 | `start` \| `center` \| `end` | `center` |
| `description` | 文字描述；默认插槽优先 | `string` | — |
| `inset` | 沿线两端缩进：水平时左右，竖直时上下 | `DividerSize` | — |
| `spacing` | 线条两侧外间距：水平时上下，竖直时左右 | `DividerSize` | `md` |
| `thickness` | 有限线宽且至少 1，单位 px；未设置时使用主题默认 1px；hairline 优先 | `number` | — |
| `hairline` | 将主题线宽缩放为一半；默认主题下为 0.5px | `boolean` | `false` |
| `color` | 线条颜色；未设置时使用主题边框色 | `string` | — |
| `opacity` | 整个分割线（含文字）的不透明度，范围 0–1；0 保留布局 | `number` | — |

### 间距取值

`DividerSize = number | string | [number | string] | [number | string, number | string]`

`inset` 设置沿分割线方向的两端缩进，`spacing` 设置分割线与相邻内容的外间距。两者均支持预设 `xs`、`sm`、`md`、`lg`、`xl`、数值（单位 px）、CSS 长度或数组。单值或单元素数组对称应用；`[start, end]` 分别设置两端。数组元素为长度值，不使用预设名称。

| 方向 | inset 数组顺序 | spacing 数组顺序 |
| --- | --- | --- |
| horizontal | 行内起点/终点缩进（RTL 时为右/左） | 上/下外间距 |
| vertical | 上/下缩进 | 行内起点/终点外间距（RTL 时为右/左） |

`inset` 默认不缩进；`spacing` 默认使用当前平台的 `md` 间距。预设读取平台主题 token，具体像素值可不同。


开发环境会检查 orientation、text-align、type、间距结构、thickness 和 opacity。非法枚举使用默认值；非法 inset 不缩进，非法 spacing 回退 md，非法 opacity 不覆盖样式。opacity 必须为 0–1 的有限数。数组只允许一元或二元长度，数组项不使用预设名。仍支持有限负 margin 和 CSS var/calc 表达式，具体 CSS 语法由浏览器解析。

### Divider Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义分割线内容，优先于 description |

## Types

```ts
import type { DividerProps, DividerInstance, DividerSize, DividerSizePreset, DividerOrientation, DividerTextAlign, DividerType } from '@maple-design/ui'
```

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-divider-border-width` | `1px` | `border-inline-start-width`, `border-top-width` |
| `--mp-divider-color` | `var(--mp-sys-color-border-default)` | `border-inline-start-color`, `border-top-color` |
| `--mp-divider-orientation-horizontal-inset-lg` | `32px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-md` | `24px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-sm` | `16px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-xl` | `40px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-xs` | `12px` | `margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-spacing-lg` | `24px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-md` | `16px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-sm` | `12px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-xl` | `32px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-xs` | `8px` | `margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-vertical-inset-lg` | `8px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-md` | `6px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-sm` | `4px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-xl` | `12px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-xs` | `2px` | `margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-spacing-lg` | `16px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-md` | `12px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-sm` | `8px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-xl` | `24px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-xs` | `4px` | `margin-inline-end`, `margin-inline-start` |
| `--mp-divider-text-align-inset` | `24px` | `height`, `width` |
| `--mp-divider-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-divider-text-padding` | `8px` | `padding` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-divider-color: var(--mp-sys-color-border-default);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
