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
    <mp-loading size="sm" />
    <mp-loading type="cube" size="sm" />
    <mp-loading type="wave" size="sm" />
    <mp-loading type="rect" size="sm" />
    <mp-loading type="disappear" size="sm" />
    <mp-loading :size="32" />
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
  <mp-button @click="loading = !loading" style="margin-bottom: 8px"> {{ loading ? '关闭' : '打开' }} </mp-button>
  <mp-loading tip="LOADING" :loading="loading">
    <mp-card
      title="介绍"
      description="Maple 是一个基于Vue3开发的 Material 风格移动端组件库，全面拥抱Vue3生态，由社区的小伙伴开发和维护。"
    />
  </mp-loading>
</template>
```

### 加载指令

```html
<script setup>
  import { ref } from 'vue'

  const loading = ref(false)
</script>

<template>
  <!-- 简单用法 -->
  <mp-switch v-model="loading" />
  <mp-card v-mp-loading="loading" title="Loading Card">
    v-mp-loading 会在当前容器内渲染 Loading 遮罩，不会改变内容结构。
  </mp-card>

  <!-- 复杂配置 -->
  <mp-card v-mp-loading="{ loading, tip: '加载中...', color: 'var(--mp-color-primary)' }" title="Loading Card">
    v-mp-loading 会在当前容器内渲染 Loading 遮罩，不会改变内容结构。
  </mp-card>
</template>
```

`v-mp-loading` 支持布尔值简写，也支持 `{ loading, tip, type, size, radius, color, fullscreen, background }` 配置对象。对象形式中的 `loading` 控制加载状态，`tip` 与 `Loading` 组件属性保持一致。

#### 注册方式

`v-mp-loading` 使用 Maple 内置的 `Loading` 组件渲染指示器。`mp-` 前缀可以避免与其他组件库的同名指令冲突，使用前可通过以下任一方式注册。

```ts
// 1. 全量安装：自动注册 Loading 组件和 v-mp-loading 指令
import MapleVue from '@maplejs/maple-ui'

app.use(MapleVue)
```

```ts
// 2. 按需安装 Loading：同时注册组件和指令
import { Loading } from '@maplejs/maple-ui'

app.use(Loading)
```

```ts
// 3. 只手动注册指令
import { vLoading } from '@maplejs/maple-ui'

app.directive('mp-loading', vLoading)
```

使用 `MapleResolver()` 时，`unplugin-vue-components` 会自动解析模板中的 `v-mp-loading`；`directives: false` 会关闭指令自动解析。

> 包裹模式通过将默认插槽内容设为 `opacity: 0.38` 展示加载状态。指令不改变宿主 DOM 结构，因此在宿主内插入内置 Loading VNode，并使用等效的半透明背景遮罩。

## API

### 属性

| 参数      | 说明                                                               | 类型               | 默认值   |
| --------- | ------------------------------------------------------------------ | ------------------ | -------- |
| `color`   | loading 的颜色                                                     | _string_           | `-`      |
| `type`    | loading 的类型，可选值为 `circle` `wave` `cube` `rect` `disappear` | _string_           | `circle` |
| `size`    | loading 的大小，可选值为 `xs` `sm` `md` `lg` `xl`，也支持数字      | _string \| number_ | `md`     |
| `tip`     | loading 的提示文字                                                 | _string_           | `-`      |
| `loading` | 存在内容时 loading 是否显示                                        | _boolean_          | `false`  |
| `radius`  | loading 的类型为 `circle` 时，可设置其半径大小                     | _string \| number_ | `-`      |

### 插槽

| 插槽名    | 说明                   | 参数 |
| --------- | ---------------------- | ---- |
| `default` | `loading` 包裹着的内容 | `-`  |
| `tip`     | `loading` 的提示文字   | `-`  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                  | 默认值                 |
| ----------------------- | ---------------------- |
| `--loading-color`       | `var(--color-primary)` |
| `--loading-opacity`     | `0.38`                 |
| `--loading-desc-margin` | `8px 0 0`              |
| `--loading-desc-color`  | `var(--color-primary)` |
