# 导航栏

### 介绍

为页面提供顶部导航能力，常用于移动端页面顶栏（App Chrome）。

> 与 Cedar 桌面端 **PageHeader** 不同：AppBar 是应用顶栏（可固定、带阴影/背景图），PageHeader 是内容区内的页头标题结构（面包屑、主/副标题、返回、右侧操作）。两者职责分离，命名刻意保持不同。

### 基本使用

通过 `title` 属性设置导航栏标题。

```html
<template>
  <mp-app-bar title="标题" />
</template>
```

### 开启圆角

通过 `round` 属性开启圆角。

```html
<template>
  <mp-app-bar title="开启圆角" title-position="center" round />
</template>
```

### 自定义背景色

```html
<template>
  <mp-app-bar
    title="标题"
    title-position="center"
    color="linear-gradient(90deg, rgba(72,176,221,1) 0%, rgba(0,208,161,1) 100%)"
  />
</template>
```

### 添加标题插槽

```html
<template>
  <mp-app-bar>添加标题插槽</mp-app-bar>
</template>
```

### 添加左右插槽

返回、菜单等操作放在 `left` / `right` 插槽。

```html
<template>
  <mp-app-bar title="标题">
    <template #left>
      <mp-button
        color="transparent"
        text-color="#fff"
        round
        text
      >
        <m-icon-chevron-left :size="24" />
      </mp-button>
    </template>

    <template #right>
      <mp-popover>
        <mp-button
          color="transparent"
          text-color="#fff"
          round
          text
        >
          <m-icon-menu :size="24" />
        </mp-button>

        <template #content>
          <mp-cell ripple>选项卡</mp-cell>
          <mp-cell ripple>选项卡</mp-cell>
          <mp-cell ripple>选项卡</mp-cell>
        </template>
      </mp-popover>
    </template>
  </mp-app-bar>
</template>
```

### 底部边框

关闭海拔阴影并开启底部分割线，适合浅色顶栏。

```html
<template>
  <mp-app-bar title="底部边框" :elevation="false" border />
</template>
```

### 固定顶部

`fixed` 固定到视口顶部，配合 `placeholder` 生成等高占位，避免内容被遮挡。

```html
<template>
  <mp-app-bar title="固定顶部" fixed placeholder safe-area-top />
</template>
```

### 扩展内容

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-app-bar
    round
    image="https://maplejs.org/tree.jpeg"
    image-linear-gradient="to right top, rgba(29, 68, 147, 0.5) 0%, rgba(74, 198, 170, 0.9) 100%"
  >
    标题
    <template #left>
      <mp-button round text color="transparent" text-color="#fff">
        <m-icon-menu :size="24" />
      </mp-button>
    </template>

    <template #right>
      <mp-button round text color="transparent" text-color="#fff">
        <m-icon-map-marker-radius :size="24" />
      </mp-button>
      <mp-button round text color="transparent" text-color="#fff">
        <m-icon-star :size="24" />
      </mp-button>
      <mp-button round text color="transparent" text-color="#fff">
        <m-icon-heart :size="24" />
      </mp-button>
    </template>

    <template #content>
      <mp-tabs
        style="margin-top: 100px"
        color="transparent"
        active-color="#fff"
        inactive-color="#ddd"
        v-model:active="active"
      >
        <mp-tab>选项卡</mp-tab>
        <mp-tab>选项卡</mp-tab>
        <mp-tab>选项卡</mp-tab>
      </mp-tabs>
    </template>
  </mp-app-bar>
</template>
```

## API

### 属性

| 参数               | 说明                                | 类型 | 默认值     |
|------------------|-----------------------------------| ---- |---------|
| `color`          | 背景颜色                              | _string_ | `-`     |
| `text-color`     | 文字颜色                              | _string_ | `-`     |
| `title`          | 标题                                | _string_ | -       |
| `title-position` | 标题位置，可选值为 `left` `center` `right` | _string_ | `left`  |
| `elevation` | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级 | _string \| number \| boolean_|   `true`    |
| `fixed`          | 是否固定到顶部                            | _boolean_ | `false` |
| `placeholder`  ***3.2.14***   | 是否在顶部生成相同高度的占位元素(需设置 `fixed`)  | _boolean_ | `false` |
| `z-index`          | 元素 z-index                            | _number \| string_ | `1` |
| `round`          | 是否使用圆角                            | _boolean_ | `false` |
| `border` ***3.3.2***          | 是否使用底部边框                            | _boolean_ | `false` |
| `image`          | 背景图片                            | _string_ | `-` |
| `image-linear-gradient` | 背景图片渐变色 | _string_ | `-` |
| `safe-area-top` | 是否开启顶部安全区适配 | _boolean_ | `false` |

### 插槽

| 名称 | 说明 | 参数 |
| ---- | ---- | ----|
| `default` | 自定义标题内容，会覆盖 `title` 的内容 | `-` |
| `left` | 插入至导航栏左侧的内容 | `-` |
| `right` | 插入至导航栏右侧的内容 | `-` |
| `content` | 扩展内容 | `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                       | 默认值 |
|---------------------------| --- |
| `--app-bar-color`         | `var(--color-primary)` |
| `--app-bar-text-color`    | `#fff` |
| `--app-bar-height`        | `54px` |
| `--app-bar-title-padding` | `0 12px` |
| `--app-bar-title-font-size` | `var(--font-size-lg)` |
| `--app-bar-left-gap`      | `6px` |
| `--app-bar-right-gap`     | `6px` |
| `--app-bar-border-radius` | `4px` |
| `--app-bar-font-size` | `var(--font-size-lg)` |
| `--app-bar-border-bottom` | `thin solid var(--color-border-2)` |
