<!-- Source: src/loading/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/loading -->

# 加载

## 基础示例

### 基础用法

Example source: src/loading/example/demos/basic.vue

```vue
<template>
  <mp-loading tip="加载中" />
</template>
```

### 介绍

加载组件，用于数据加载时执行动画。

## 外观与状态

### 加载图形、尺寸与颜色

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `size` | loading 的大小，可选值为 `xs` `sm` `md` `lg` `xl`，也支持数字 | 加载图形、尺寸与颜色 |
| `type` | loading 的类型，可选值为 `circle` `wave` `cube` `rect` `disappear` | 加载图形、尺寸与颜色 |
| `color` | loading 的颜色 | 加载图形、尺寸与颜色 |
<!-- demo-config-notes:end -->

对比相同加载状态的图形、尺寸和颜色；容器遮罩与指令用法保持独立。

Example source: src/loading/example/demos/appearance-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const loading = ref(false)
    return { loading }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const loading = ref(false)
    return { loading }
  })(),
)

const scene3 = demoProxyRefs(
  (() => {
    const loading = ref(false)
    return { loading }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">大小</span><span lang="en-US">Size</span></h4>
      <mp-space align="center" justify="space-between">
        <mp-loading size="sm" />
        <mp-loading type="cube" size="sm" />
        <mp-loading type="wave" size="sm" />
        <mp-loading type="rect" size="sm" />
        <mp-loading type="disappear" size="sm" />
        <mp-loading :size="32" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="color">
      <h4><span lang="zh-CN">颜色</span><span lang="en-US">Color</span></h4>
      <mp-space align="center" justify="space-between">
        <mp-loading color="var(--mp-color-info)" />
        <mp-loading type="cube" color="var(--mp-color-success)" />
        <mp-loading type="wave" color="var(--mp-color-warning)" />
        <mp-loading type="rect" color="var(--mp-color-danger)" />
        <mp-loading type="disappear" color="var(--mp-color-text-disabled)" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="type">
      <h4><span lang="zh-CN">类型</span><span lang="en-US">Type</span></h4>
      <mp-space align="center" justify="space-between">
        <mp-loading />
        <mp-loading type="cube" />
        <mp-loading type="wave" />
        <mp-loading type="rect" />
        <mp-loading type="disappear" />
      </mp-space>
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
.demo-comparison-case--1 {
  .loading-demo .mp-space {
    padding: 8px 0;
  }
}
.demo-comparison-case--2 {
  .loading-demo .mp-space {
    padding: 8px 0;
  }
}
.demo-comparison-case--3 {
  .loading-demo .mp-space {
    padding: 8px 0;
  }
}
</style>
```

## 布局与排列

### 包裹内容

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `tip` | loading 的提示文字 | 包裹内容 |
| `loading` | 存在内容时 loading 是否显示 | 包裹内容 |
<!-- demo-config-notes:end -->

Example source: src/loading/example/demos/wrap.vue

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-button style="margin-bottom: 8px" @click="loading = !loading">
    {{ loading ? '关闭' : '打开' }}
  </mp-button>
  <mp-loading tip="LOADING" :loading="loading">
    <mp-card
      title="介绍"
      description="Maple 是一个基于Vue3开发的 Material 风格移动端组件库，全面拥抱Vue3生态，由社区的小伙伴开发和维护。"
    />
  </mp-loading>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
```

## 内容与展示

### 加载指令

两种指令示例分别维护加载状态，控件与宿主卡片通过 `Space direction="column"` 纵向排列；关闭一个不会影响另一个遮罩。


`v-mp-loading` 支持布尔值简写，也支持 `{ loading, tip, type, size, radius, color, hideIcon, fullscreen, background }` 配置对象。对象形式中的 `loading` 控制加载状态，其余组件选项与 `Loading` Props 保持一致。

#### 注册方式

`v-mp-loading` 使用 Maple 内置的 `Loading` 组件渲染指示器。`mp-` 前缀可以避免与其他组件库的同名指令冲突，使用前可通过以下任一方式注册。


使用 `MapleResolver()` 时，`unplugin-vue-components` 会自动解析模板中的 `v-mp-loading`；`directives: false` 会关闭指令自动解析。

> 包裹模式通过将默认插槽内容设为 `opacity: 0.38` 展示加载状态。指令不改变宿主 DOM 结构，因此在宿主内插入内置 Loading VNode，并使用等效的半透明背景遮罩。

Example source: src/loading/example/demos/directive.vue

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
const simpleDirectiveLoading = ref(false)
const configuredDirectiveLoading = ref(false)
</script>

<template>
  <mp-space direction="column">
    <h4 class="loading-demo__title">简单用法</h4>
    <mp-switch v-model="simpleDirectiveLoading" edit-mode="direct" />
    <mp-card
      v-mp-loading="simpleDirectiveLoading"
      title="介绍"
      description="v-mp-loading 会在当前容器内渲染 Loading 遮罩，不会改变内容结构。"
    />

    <h4 class="loading-demo__title">复杂配置</h4>
    <mp-switch v-model="configuredDirectiveLoading" edit-mode="direct" />
    <mp-card
      v-mp-loading="{
        loading: configuredDirectiveLoading,
        tip: '加载中...',
        color: 'var(--mp-color-primary)',
        background: 'color-mix(in srgb, var(--mp-color-bg-white) 72%, transparent)',
      }"
      title="介绍"
      description="v-mp-loading 会在当前容器内渲染 Loading 遮罩，不会改变内容结构。"
    />
  </mp-space>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}

.loading-demo__title {
  margin: 12px 0 4px;
  font-size: 14px;
}
</style>
```

## 使用说明

### 图标与状态提示

数字 `size` 为自定义指示器容器设置像素字号。枚举尺寸控制内置动画；自定义图标默认继承 `--mp-loading-indicator-size`（20px）字号，使用 `1em` 的子图标随字号缩放，固定像素尺寸的 SVG 仍由自身样式决定。`icon` 插槽负责图形，状态文案使用 `tip` 或 `tip` 插槽。

独立 Loading 使用 `role="status"`、`aria-live="polite"` 和 `aria-atomic="true"`；未提供提示时，包含本地化的隐藏状态文字，隐藏图标不会移除文字。包裹模式保留 `aria-busy`，指令会给原宿主设置 `aria-busy="true"`，结束时恢复原值；若业务已修改该值，则保留业务的新值。

`aria-busy` 可能推迟区域内的状态播报。需要报告业务开始、完成或失败时，应在等待区域外维护持续存在的状态区域并更新文案；加载遮罩本身不会禁用键盘操作。参见 [WAI-ARIA aria-busy](https://www.w3.org/TR/wai-aria-1.2/#aria-busy) 和 [ARIA22 状态消息](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22)。
### 配置说明

加载指令的遮罩会阻止点击默认行为和冒泡，点击遮罩不会触发 Card 或父级的普通 `@click`；关闭加载后恢复正常点击。遮罩不会禁用底层控件的键盘操作，如需完全禁止操作，请同时设置控件的 `disabled`。

### 覆盖层样式

内容覆盖层类名：`.mp-loading__content-overlay`。

指令每次更新都替换完整配置，省略的选项以及布尔值 `true` 使用默认值。加载中修改 `fullscreen` 会在宿主与所属文档的 body 之间迁移遮罩，宿主内容保持原位。多个全屏实例按数量持有滚动锁：关闭局部实例不会解除全屏锁，最后一个全屏实例结束时保留外部原有的锁类。

## API

### Loading Props

| 参数      | 说明                                                               | 类型               | 默认值   |
| --------- | ------------------------------------------------------------------ | ------------------ | -------- |
| `color`   | loading 的颜色                                                     | _string_           | `-`      |
| `type`    | loading 的类型，可选值为 `circle` `wave` `cube` `rect` `disappear` | _string_           | `circle` |
| `size`    | loading 的大小，可选值为 `xs` `sm` `md` `lg` `xl`，也支持数字      | _string \| number_ | `md`     |
| `tip`     | loading 的提示文字                                                 | _string_           | `-`      |
| `loading` | 存在内容时 loading 是否显示                                        | _boolean_          | `false`  |
| `radius`  | loading 的类型为 `circle` 时，可设置其半径大小                     | _string \| number_ | `-`      |
| `hide-icon` | 是否隐藏加载指示器 | _boolean_ | `false` |

### Loading Slots

| 插槽名    | 说明                   | 参数 |
| --------- | ---------------------- | ---- |
| `default` | `loading` 包裹着的内容 | `-`  |
| `tip`     | `loading` 的提示文字   | `-`  |
| `icon`    | 自定义加载指示器     | `-`  |

`icon` 插槽替换全部内置 `type` 动画，不会与内置动画同时显示。`hide-icon=true` 隐藏所有指示器，提示内容仍可显示。

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-loading-color` | `var(--mp-color-primary)` | `background-color`, `color` |
| `--mp-loading-desc-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-loading-desc-margin` | `8px 0 0` | `margin` |
| `--mp-loading-directive-z-index` | `2000` | `z-index` |
| `--mp-loading-indicator-size` | `20px` | `font-size` |
| `--mp-loading-opacity` | `0.38` | `opacity` |
| `--mp-loading-overlay-background` | `color-mix(in srgb, var(--mp-color-bg-white) 62%, transparent)` | `background` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-loading-color: var(--mp-color-primary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 覆盖层样式

| 变量 | 说明 |
| --- | --- |
| `--mp-loading-overlay-background` | 指令覆盖层背景色；background 选项可覆盖该值。 |
