# 加载

### 介绍

加载组件，用于数据加载时执行动画。

### 类型

```html
<template>
  <mp-space align="center" justify="space-between">
    <mp-loading />
    <mp-loading type="cube" />
    <mp-loading type="wave" />
    <mp-loading type="rect" />
    <mp-loading type="disappear" />
  </mp-space>
</template>
```

### 颜色
```html
<template>
  <mp-space align="center" justify="space-between">
    <mp-loading color="var(--color-info)" />
    <mp-loading type="cube" color="var(--color-success)" />
    <mp-loading type="wave" color="var(--color-warning)" />
    <mp-loading type="rect" color="var(--color-danger)" />
    <mp-loading type="disappear" color="var(--color-text-disabled)" />
  </mp-space>
</template>
```

### 大小

```html
<template>
  <mp-space align="center" justify="space-between">
    <mp-loading size="small" />
    <mp-loading type="cube" size="small" />
    <mp-loading type="wave" size="small" />
    <mp-loading type="rect" size="small" />
    <mp-loading type="disappear" size="small" />
  </mp-space>
</template>
```

### 包裹内容

```html
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-button @click="loading = !loading" style="margin-bottom: 8px">
    {{ loading ? '关闭' : '打开' }}
  </mp-button>
  <mp-loading tip="LOADING" :loading="loading">
    <mp-card 
      title="介绍" 
      description="Maple 是一个基于Vue3开发的 Material 风格移动端组件库，全面拥抱Vue3生态，由社区的小伙伴开发和维护。" 
    />
  </mp-loading>
</template>
```

## API

### 属性

| 参数     | 说明                                                         | 类型     | 默认值      |
| -------- |------------------------------------------------------------| -------- |----------|
| `color`  | loading 的颜色                                                | _string_ | `-`      |
| `type`   | loading 的类型，可选值为 `circle` `wave` `cube` `rect` `disappear` | _string_ | `circle` |
| `size`   | loading 的大小，可选值为 `large` `normal` `small` `mini`           | _string_ | `normal` |
| `tip`   | loading 的提示文字                                              | _string_ | `-`      |
| `loading`| 存在内容时 loading 是否显示                                         | _boolean_ | `false`  |
| `radius` | loading 的类型为 `circle` 时，可设置其半径大小                           | _string \| number_  | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | `loading` 包裹着的内容 | `-` |
| `tip`    | `loading` 的提示文字 | `-` |

### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                     | 默认值 |
|-------------------------| -- |
| `--loading-color`       | `var(--color-primary)` |
| `--loading-opacity`     | `0.38`                 |
| `--loading-desc-margin` | `8px 0 0`              |
| `--loading-desc-color`  | `var(--color-primary)` |
