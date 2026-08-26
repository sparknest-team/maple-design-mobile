# 图标

### 介绍

基于 SVG Vue 组件的图标库。
图标源自 [Material Design Icon](https://materialdesignicons.com/)。

配置 `MapleResolver` 后，推荐使用 `m-icon-*` 标签，Resolver 会从 `@maplejs/icons-vue` 的图标子路径自动按需导入。
推荐通过 `<mp-icon>` 容器统一控制尺寸、颜色和交互。网络图片请使用 `<img>` 或图片组件。

### 基础用法

```html
<template>
  <mp-icon size="40" color="red">
    <m-icon-checkbox-marked-circle />
  </mp-icon>
  <mp-icon size="40" color="red">
    <m-icon-information />
  </mp-icon>
</template>
```

### 图标尺寸

```html
<template>
  <mp-icon size="20"><m-icon-checkbox-marked-circle /></mp-icon>
  <mp-icon size="28"><m-icon-checkbox-marked-circle /></mp-icon>
  <mp-icon size="36"><m-icon-checkbox-marked-circle /></mp-icon>
</template>
```

### 图标颜色

```html
<template>
  <mp-icon size="28" color="var(--mp-color-primary)"><m-icon-checkbox-marked-circle /></mp-icon>
  <mp-icon size="28" color="var(--mp-color-success)"><m-icon-checkbox-marked-circle /></mp-icon>
</template>
```

### 点击事件

```html
<template>
  <mp-icon size="28" color="var(--mp-color-primary)" @click="Message.success('点击成功')">
    <m-icon-checkbox-marked-circle />
  </mp-icon>
</template>
```

### 动态名称（特殊场景）

仅当图标名称必须在运行时决定时使用 `<mp-icon :name>`。`name` 只查询已经显式注册到当前 Vue 应用的图标，Icon 组件本身不会导入图标全集。可以只注册动态场景需要的图标；如果选择批量注册，则由业务主动承担完整图标集合的体积。设置 `transition(ms)` 后可触发切换动画。

```ts
// main.ts
import { createApp } from 'vue'
import { IconCheckboxMarkedCircle, IconInformation } from '@maplejs/icons-vue'
import App from './App.vue'

const app = createApp(App)
app.component('IconCheckboxMarkedCircle', IconCheckboxMarkedCircle)
app.component('IconInformation', IconInformation)
app.mount('#app')
```

```html
<script setup>
  import { ref } from 'vue'

  const name = ref('information')

  function toggle() {
    name.value = name.value === 'information' ? 'checkbox-marked-circle' : 'information'
  }
</script>

<template>
  <mp-icon color="var(--mp-color-primary)" :name="name" :transition="300" :size="30" @click="toggle" />
</template>
```

### 图标列表（点击复制）

图标列表通过 `iconNames` 获取全部名称，并从独立图标包解析对应的 SVG 组件。业务代码推荐使用 `m-icon-*` 标签，由 Resolver 按需加载。

```html
<script setup>
  import { computed, ref } from 'vue'
  import * as MapleIcons from '@maplejs/icons-vue'
  import { iconNames } from '@maplejs/icons-vue'
  import { pascalCase } from '@maplejs/maple-shared'

  const keyword = ref('')
  const filteredIcons = computed(() => iconNames.filter((name) => name.includes(keyword.value)))

  function resolveIcon(name) {
    return MapleIcons[`Icon${pascalCase(name)}`]
  }

  function copyImport(name) {
    navigator.clipboard.writeText(`<m-icon-${name} />`)
  }
</script>

<template>
  <mp-input v-model.trim="keyword" placeholder="搜索图标" clearable />

  <button v-for="name in filteredIcons" :key="name" type="button" @click="copyImport(name)">
    <component :is="resolveIcon(name)" />
    <span>{{ name }}</span>
  </button>
</template>
```

### 独立图标包

推荐直接从 `@maplejs/icons-vue` 导入具体图标组件。此方式不依赖字体，并支持 Tree Shaking。

```ts
import { IconInformation } from '@maplejs/icons-vue'
```

```html
<mp-icon :size="24" color="currentColor">
  <IconInformation title="信息" />
</mp-icon>
```

## API

### 属性

| 参数              | 说明               | 类型               | 默认值 |
| ----------------- | ------------------ | ------------------ | ------ |
| `name`            | 图标名称           | _string_           | `-`    |
| `size`            | 尺寸               | _string \| number_ | `-`    |
| `color`           | 图标颜色           | _string_           | `-`    |
| `animation-class` | 过渡动画类名       | _string_           | `-`    |
| `transition`      | 过渡动画时间（ms） | _string \| number_ | `0`    |

### 事件

| 事件名  | 说明           | 参数           |
| ------- | -------------- | -------------- |
| `click` | 点击图标时触发 | `event: Event` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名        | 默认值 |
| ------------- | ------ |
| `--icon-size` | `20px` |
