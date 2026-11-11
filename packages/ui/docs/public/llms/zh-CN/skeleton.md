<!-- Source: src/skeleton/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/skeleton -->

# 骨架屏

### 介绍

显示一些带过渡效果的占位元素，优化加载过程。

## 基础示例

### 基本使用

Example source: src/skeleton/example/demos/basic-usage.vue

```vue
<script setup>
import SkeletonBasicExample from '../Basic.vue'
</script>

<template>
  <SkeletonBasicExample />
</template>
```

## 内容与展示

### 骨架内容形态对比

比较标题/文本行与头像/卡片形态，按最终内容轮廓选择占位布局；动画和全屏加载另行展示。

Example source: src/skeleton/example/demos/content-comparison.vue

```vue
<script setup lang="ts">
import SkeletonCardExample from '../AvatarAndCard.vue'
import SkeletonRowsExample from '../TitleAndRows.vue'
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="custom-rows-width">
      <h4><span lang="zh-CN">自定义段落宽度</span><span lang="en-US">Custom Rows Width</span></h4>
      <SkeletonRowsExample />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="display-card">
      <h4><span lang="zh-CN">显示卡片</span><span lang="en-US">Display Card</span></h4>
      <SkeletonCardExample />
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
</style>
```

### 动画

Example source: src/skeleton/example/demos/animation.vue

```vue
<script setup>
import SkeletonAnimationExample from '../Animation.vue'
</script>

<template>
  <SkeletonAnimationExample />
</template>
```

### 全屏模式

点击后展示两秒再恢复，这是示例中的定时逻辑；组件本身不请求数据，也不会自动结束加载。实际业务应由请求结果控制 `loading`。

Example source: src/skeleton/example/demos/fullscreen-mode.vue

```vue
<script setup>
import SkeletonFullscreenExample from '../Fullscreen.vue'
</script>

<template>
  <SkeletonFullscreenExample />
</template>
```

## 自定义与插槽

### 自定义模板

Example source: src/skeleton/example/demos/custom-template.vue

```vue
<script setup>
import SkeletonCustomTemplateExample from '../CustomTemplate.vue'
</script>

<template>
  <SkeletonCustomTemplateExample />
</template>
```

## API

### Skeleton Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 加载状态，设置为 `true` 开启骨架屏 | _boolean_ | `true` |
| `animation` | 是否开启流光动画 | _boolean_ | `true` |
| `title` | 是否显示标题 | _boolean_ | `false` |
| `card` | 是否显示卡片 | _boolean_ | `false` |
| `avatar` | 是否显示头像 | _boolean_ | `false` |
| `fullscreen` | 是否开启全屏模式 | _boolean_ | `false` |
| `fullscreen-z-index` | 全屏模式的层级 | _string \| number_ | `100` |
| `title-width` | 标题占位宽度；省略时使用主题变量，默认 `50%` | _string \| number_ | `-` |
| `card-height` | 卡片占位高度；省略时使用主题变量，默认 `160px` | _string \| number_ | `-` |
| `avatar-size` | 头像占位尺寸；省略时使用主题变量，默认 `34px` | _string \| number_ | `-` |
| `rows` | 段落行数 | _string \| number_ | `3` |
| `rows-width` | 段落每一行的宽度 | _Array<number \| string>_ | `[]` |

### Skeleton Slots

| 插槽名 | 说明 | 参数 |
| --- |--| --- |
| `default` | 非加载状态下的内容 | `-` |
| `template` | 自定义加载占位模板 | `-` |

组件同时导出 `SkeletonLine` 和 `SkeletonShape`，也可通过 `Skeleton.Line`、`Skeleton.Shape` 组合自定义占位模板。


### SkeletonLine Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `rows` | 展示的行数；非有限值归零，负数归零，小数向下取整 | _number_ | `1` |
| `widths` | 各行宽度，数字为 px | _Array<number \| string>_ | `[]` |
| `line-height` | 行高，单位 px | _number_ | `20` |
| `line-spacing` | 行间距，单位 px | _number_ | `15` |

### SkeletonShape Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `shape` | 图形形状 | _'square' \| 'circle'_ | `square` |
| `size` | 图形尺寸，由主题变量控制 | _'sm' \| 'md' \| 'lg'_ | `md` |

Line 和 Shape 没有专属事件、插槽或实例方法；支持透传原生属性。主体实例没有专属方法。

## 使用说明





内置动效遵循 `prefers-reduced-motion: reduce`：保留内容与状态反馈，关闭装饰性动画。自定义动画需由调用方适配该偏好。

内置 Skeleton 占位及独立 Line、Shape 为装饰内容，默认 `aria-hidden="true"`；根节点通过 `aria-busy` 表示等待。自定义 `template` 和加载结束后的业务内容保持可访问，可按需提供业务状态文案。

### 全屏覆盖范围

`fullscreen` 使用当前位置的内联 `position: fixed` 占位，不会自动传送到 body。没有建立固定定位包含块的祖先时覆盖视口；祖先的 `transform`、相应 `will-change` 或 `contain` 可让覆盖范围变为该祖先。需要覆盖视口时，将 Skeleton 放在这些祖先之外，或由业务使用 Vue Teleport 安排位置。它是加载占位，不提供模态焦点管理。参见 [CSS Positioned Layout 固定定位包含块](https://www.w3.org/TR/css-position-3/#fixed-cb)。

尺寸属性未传值时使用对应主题 token；表中的 `-` 表示没有 Prop 默认值，并不表示占位没有尺寸。Line 与主体都将非有限行数归零，对负数取零，对小数向下取整。

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-skeleton-animation-background` | `linear-gradient(90deg, transparent, var(--mp-sys-color-surface-default), transparent)` | `background` |
| `--mp-skeleton-animation-duration` | `1s` | `animation` |
| `--mp-skeleton-avatar-background-color` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-skeleton-avatar-border-radius` | `50%` | `border-radius` |
| `--mp-skeleton-avatar-margin-right` | `var(--mp-sys-space-6)` | `margin-inline-end` |
| `--mp-skeleton-avatar-size` | `34px` | `height`, `width` |
| `--mp-skeleton-card-background-color` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-skeleton-card-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-skeleton-card-height` | `160px` | `height` |
| `--mp-skeleton-card-margin-bottom` | `var(--mp-sys-space-6)` | `margin-bottom` |
| `--mp-skeleton-content-padding` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-skeleton-row-border-radius` | `10px` | `border-radius` |
| `--mp-skeleton-row-height` | `12px` | `height` |
| `--mp-skeleton-row-margin-top` | `10px` | `margin-top` |
| `--mp-skeleton-shape-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-skeleton-shape-size-lg` | `60px` | `height`, `width` |
| `--mp-skeleton-shape-size-md` | `48px` | `height`, `width` |
| `--mp-skeleton-shape-size-sm` | `36px` | `height`, `width` |
| `--mp-skeleton-title-background-color` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-skeleton-title-border-radius` | `10px` | `border-radius` |
| `--mp-skeleton-title-width` | `50%` | `width` |
| `--mp-skeleton-transition-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-skeleton-animation-background: linear-gradient(90deg, transparent, var(--mp-sys-color-surface-default), transparent);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
