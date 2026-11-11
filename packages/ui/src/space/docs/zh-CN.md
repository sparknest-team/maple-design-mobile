# Space 间隔

### 介绍

组件库提供了 `<mp-space>` 布局的组件，使您更有效率的进行 flex 布局。



两端默认均为 `size="md"`、`wrap=false`、`block=true`、`direction="row"`。未传 align 时，row 为 center、column 为 stretch。Maple 原来依赖默认换行的用法请显式添加 `wrap`。

`size` 支持全部五档预设、number（px）、数字字符串（px）、CSS 长度或表达式（例如 1rem、var(--gap)）以及二元组 `[rowGap, columnGap]`。数组始终先行后列，direction 切换不会交换它们；数组项为长度，不支持预设名。预设 [行, 列]：xs=[4,4]、sm=[8,6]、md=[12,8]、lg=[16,12]、xl=[24,16] px，两端一致，仍可通过 CSS 变量覆盖。

## 基础示例

### 基本使用

```demo
../example/demos/base-use.vue
```

## 外观与状态

### 间隙

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `wrap` | 是否超出换行 | 间隙、xs / sm / md / lg / xl |
| `size` | 间距，可选值为 `xs` `sm` `md` `lg` `xl` 或 `[行间距, 列间距]` (支持长度单位) | 间隙、xs / sm / md / lg / xl |
<!-- demo-config-notes:end -->

```demo
../example/demos/space.vue
```

### xs / sm / md / lg / xl

```demo
../example/demos/demo-8.vue
```

## 布局与排列

### 垂直

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `size` | 间距，可选值为 `xs` `sm` `md` `lg` `xl` 或 `[行间距, 列间距]` (支持长度单位) | 垂直、主轴对齐方案对比、显式换行 |
| `justify` | 主轴排列方式 可选值为 `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly` | 主轴对齐方案对比、环绕、布局与对齐 |
| `direction` | 子元素的行列排列顺序，默认 row；column 表示按列排列，不使用 horizontal/vertical | 垂直、布局与对齐 |
| `wrap` | 是否超出换行 | 显式换行、布局与对齐 |
| `align` | 交叉轴排列方式 可选值为 `stretch` `center` `flex-start` `flex-end` `baseline`，未传时根据 `direction` 推断（`row` → `center`，`column` → `stretch`） | 布局与对齐 |
<!-- demo-config-notes:end -->

```demo
../example/demos/vertical.vue
```

### 主轴对齐方案对比

比较靠右、居中和两端分布；保持相同内容数量时观察剩余空间如何分配。

```demo
../example/demos/alignment-comparison.vue
```

### 显式换行

```demo
../example/demos/wrap.vue
```

### 环绕

```demo
../example/demos/around.vue
```

### 布局与对齐

适用于space。调整排列方向、交叉轴对齐、主轴分配，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/layout-lab.vue
```

## 交互与控制

### 动态布局

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `wrap` | 是否超出换行 | 动态布局 |
| `size` | 间距，可选值为 `xs` `sm` `md` `lg` `xl` 或 `[行间距, 列间距]` (支持长度单位) | 动态布局 |
| `direction` | 子元素的行列排列顺序，默认 row；column 表示按列排列，不使用 horizontal/vertical | 动态布局 |
<!-- demo-config-notes:end -->

切换方向、列间距和换行，添加/删除子项；行间距固定8px，列间距在8px/24px间切换。方向不会交换两个gap的几何轴含义。窄容器内未换行时可横向滚动。

```demo
../example/demos/interactive-layout.vue
```

## 分隔与换行

### 分隔换行与内容状态

输入草稿后切换换行、方向或顺序。分隔符跟随前一项，可出现在行尾，不会独占一行。

```demo
../example/demos/split-wrapping.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`。`direction="row"` 沿阅读顺序排列，`column` 保持从上到下；justify/align 的 flex-start、flex-end 跟随对应 flex 轴。`size=[rowGap,columnGap]` 始终分别表示行间距、列间距，不因 RTL 交换。换行与 split 插槽沿内容顺序排列，方向切换不反转数据或重建有稳定 key 的子节点。

## API

### 子节点与尺寸边界

带 key 的 Fragment 分组重排时保留局部子项身份。纯空白、空文本、注释和空 Fragment 不生成间距项；有意义的文字、数字 0 和空元素保留。空的 split 内容也不生成分隔项。

wrap 与 split 组合时，分隔符跟随前一项，可以出现在行尾；不承诺隐藏每行边缘的分隔符。单项宽度超出可用行宽时仍可能溢出。未开启 wrap 时，保持原有 Flex gap 与 justify 分配规则。切换布局不会重建内容节点。

block 将容器切换为 flex / inline-flex；align=stretch 拉伸内部 item 包装层，不保证其中的控件填满。需要撑满时使用子控件的 block 或 width:100%。

非法 size 结构、负数/非有限数字、非二元组数组会回退 md，并在开发环境提示。数组项为长度，不接受预设名。仍支持 CSS var/calc 表达式，具体 CSS 语法与解析值由浏览器处理。


### Space Props

| 参数          | 说明                                                                                                  | 类型                                                       | 默认值        |
|-------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------|------------|
| `direction` | 子元素的行列排列顺序，默认 row；column 表示按列排列，不使用 horizontal/vertical | _string_                                                 | `row`      |
| `justify`   | 主轴排列方式 可选值为 `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly`           | _string_                                                 | `flex-start` |
| `align`     | 交叉轴排列方式 可选值为 `stretch` `center` `flex-start` `flex-end` `baseline`，未传时根据 `direction` 推断（`row` → `center`，`column` → `stretch`） | _string_                                                 | `-`        |
| `size`      | 间距，可选值为 `xs` `sm` `md` `lg` `xl` 或 `[行间距, 列间距]` (支持长度单位)                                            | _string \| number \| [string \| number, string \| number]_ | `md`       |
| `wrap`      | 是否超出换行                                                                                              | _boolean_                                                | `false`     |
| `block`     | 是否撑满父容器宽度                                                                                           | _boolean_                                                | `true`     |

### Space Slots

| 插槽名       | 说明       | 参数  |
|-----------|----------|-----|
| `default` | Space 内容 | `-` |
| `split`   | 分隔符     | `-` |

## Types

```ts
import type { SpaceProps, SpaceSize, SpaceDirection, SpaceAlign, SpaceJustify, SpaceInternalSize, SpaceInstance } from '@maple-design/ui-vue'
```

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-space-size-lg-column-gap` | `var(--mp-sys-space-5)` | 组件样式 |
| `--mp-space-size-lg-row-gap` | `var(--mp-sys-space-6)` | 组件样式 |
| `--mp-space-size-md-column-gap` | `var(--mp-sys-space-4)` | 组件样式 |
| `--mp-space-size-md-row-gap` | `var(--mp-sys-space-5)` | 组件样式 |
| `--mp-space-size-sm-column-gap` | `var(--mp-sys-space-3)` | 组件样式 |
| `--mp-space-size-sm-row-gap` | `var(--mp-sys-space-4)` | 组件样式 |
| `--mp-space-size-xl-column-gap` | `var(--mp-sys-space-6)` | 组件样式 |
| `--mp-space-size-xl-row-gap` | `var(--mp-sys-space-8)` | 组件样式 |
| `--mp-space-size-xs-column-gap` | `var(--mp-sys-space-2)` | 组件样式 |
| `--mp-space-size-xs-row-gap` | `var(--mp-sys-space-2)` | 组件样式 |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-space-size-lg-column-gap: var(--mp-sys-space-5);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
