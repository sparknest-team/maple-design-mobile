# 图标

## 介绍

基于 SVG Vue 组件的图标库。
## 推荐用法

配置 `MapleResolver()` 后，推荐使用模板标签自动按需导入。`m-icon-*` 是 Resolver 的图标命名空间，实际仍只会从 `@maplejs/icons-vue` 加载对应的单个图标：

```html
<mp-icon size="40" color="red">
  <m-icon-checkbox-marked-circle-fill />
</mp-icon>
```

也可以手动导入独立图标组件：

```ts
import { IconCheckboxMarkedCircleFill } from '@maplejs/icons-vue'
```

手动导入时，同样推荐通过 `<mp-icon>` 容器统一控制尺寸、颜色、动画和交互区域：

```html
<mp-icon size="40" color="red">
  <IconCheckboxMarkedCircleFill />
</mp-icon>
```

以上两种写法效果一致，均支持 Tree Shaking。前者由 Resolver 生成导入，后者由业务代码显式导入。网络图片请使用 `<img>` 或图片组件。

### 动态名称与显式注册

仅当图标名称必须在运行时决定时使用 `<mp-icon :name>`。`name` 只查询已经显式注册到当前 Vue 应用的图标，`mp-icon` 本身不会导入图标全集。建议只注册动态场景实际需要的图标：

```ts
// main.ts
import { createApp } from 'vue'
import { IconCheckboxMarkedCircleFill, IconInfoCircleFill } from '@maplejs/icons-vue'
import App from './App.vue'

const app = createApp(App)
app.component('IconCheckboxMarkedCircleFill', IconCheckboxMarkedCircleFill)
app.component('IconInfoCircleFill', IconInfoCircleFill)
app.mount('#app')
```

如果业务确实需要通过任意名称访问全部图标，可以主动批量注册。此时会加载完整图标集合：

```ts
import * as MapleIconsVue from '@maplejs/icons-vue'

for (const [name, component] of Object.entries(MapleIconsVue)) {
  if (name !== 'iconNames') app.component(name, component)
}
```

## 示例

### 基础用法

```html
<template>
  <mp-icon size="40" color="red">
    <m-icon-checkbox-marked-circle-fill />
  </mp-icon>
  <mp-icon size="40" color="red">
    <m-icon-info-circle-fill />
  </mp-icon>
</template>
```

### 图标尺寸

```html
<template>
  <mp-icon size="20"><m-icon-checkbox-marked-circle-fill /></mp-icon>
  <mp-icon size="28"><m-icon-checkbox-marked-circle-fill /></mp-icon>
  <mp-icon size="36"><m-icon-checkbox-marked-circle-fill /></mp-icon>
</template>
```

### 图标颜色

```html
<template>
  <mp-icon size="28" color="var(--mp-color-primary)"><m-icon-checkbox-marked-circle-fill /></mp-icon>
  <mp-icon size="28" color="var(--mp-color-success)"><m-icon-checkbox-marked-circle-fill /></mp-icon>
</template>
```

### 点击事件

```html
<template>
  <mp-icon size="28" color="var(--mp-color-primary)" @click="Message.success('点击成功')">
    <m-icon-checkbox-marked-circle-fill />
  </mp-icon>
</template>
```

### 动态名称（特殊场景）

设置 `transition`（单位为 ms）后可触发图标切换动画。

```html
<script setup>
  import { ref } from 'vue'

  const name = ref('info-circle-fill')

  function toggle() {
    name.value = name.value === 'info-circle-fill' ? 'checkbox-marked-circle-fill' : 'info-circle-fill'
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

## API

### 属性

| 参数              | 说明               | 类型               | 默认值 |
| ----------------- | ------------------ | ------------------ | ------ |
| `name`            | 图标名称           | _string_           | `-`    |
| `size`            | 尺寸               | _string \| number_ | `-`    |
| `color`           | 图标颜色           | _string_           | `-`    |
| `rotate`          | 旋转角度           | _number_           | `-`    |
| `spin`            | 是否持续旋转       | _boolean_          | `false` |
| `animation-class` | 过渡动画类名       | _string_           | `-`    |
| `transition`      | 过渡动画时间（ms） | _string \| number_ | `0`    |

### 独立 SVG 图标属性

| 参数              | 说明       | 类型                                       | 默认值    |
| ----------------- | ---------- | ------------------------------------------ | --------- |
| `size`            | 尺寸       | _string \| number_                          | `-`       |
| `color`           | 图标颜色   | _string_                                   | `-`       |
| `rotate`          | 旋转角度   | _number_                                   | `-`       |
| `spin`            | 是否旋转   | _boolean_                                  | `false`   |
| `title`           | 无障碍标题 | _string_                                   | `-`       |
| `stroke-width`    | 线宽       | _number_                                   | `4`       |
| `stroke-linecap`  | 端点类型   | _'butt' \| 'round' \| 'square'_            | `'butt'`  |
| `stroke-linejoin` | 拐角类型   | _'bevel' \| 'inherit' \| 'miter' \| 'round'_ | `'miter'` |

### 事件

| 事件名  | 说明           | 参数           |
| ------- | -------------- | -------------- |
| `click` | 点击图标时触发 | `event: Event` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名        | 默认值 |
| ------------- | ------ |
| `--icon-size` | `20px` |
