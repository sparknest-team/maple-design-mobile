<!-- Source: src/loading/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/loading -->

# 加载

## 案例

### 介绍

加载组件，用于数据加载时执行动画。

### 大小

Example source: src/loading/example/demos/size.vue

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

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

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
```

### 类型

Example source: src/loading/example/demos/type.vue

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-space align="center" justify="space-between">
    <mp-loading />
    <mp-loading type="cube" />
    <mp-loading type="wave" />
    <mp-loading type="rect" />
    <mp-loading type="disappear" />
  </mp-space>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
```

### 颜色

Example source: src/loading/example/demos/color.vue

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <mp-space align="center" justify="space-between">
    <mp-loading color="var(--mp-color-info)" />
    <mp-loading type="cube" color="var(--mp-color-success)" />
    <mp-loading type="wave" color="var(--mp-color-warning)" />
    <mp-loading type="rect" color="var(--mp-color-danger)" />
    <mp-loading type="disappear" color="var(--mp-color-text-disabled)" />
  </mp-space>
</template>

<style>
.loading-demo .mp-space {
  padding: 8px 0;
}
</style>
```

### 包裹内容

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
    <mp-switch v-model="simpleDirectiveLoading" presentation="inline" />
    <mp-card
      v-mp-loading="simpleDirectiveLoading"
      title="介绍"
      description="v-mp-loading 会在当前容器内渲染 Loading 遮罩，不会改变内容结构。"
    />

    <h4 class="loading-demo__title">复杂配置</h4>
    <mp-switch v-model="configuredDirectiveLoading" presentation="inline" />
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
| `hide-icon` | 是否隐藏加载指示器 | _boolean_ | `false` |

### 插槽

| 插槽名    | 说明                   | 参数 |
| --------- | ---------------------- | ---- |
| `default` | `loading` 包裹着的内容 | `-`  |
| `tip`     | `loading` 的提示文字   | `-`  |
| `icon`    | 自定义加载指示器     | `-`  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                  | 默认值                 |
| ----------------------- | ---------------------- |
| `--loading-color`       | `var(--color-primary)` |
| `--loading-opacity`     | `0.38`                 |
| `--loading-desc-margin` | `8px 0 0`              |
| `--loading-desc-color`  | `var(--color-primary)` |

加载指令的遮罩会阻止点击默认行为和冒泡，点击遮罩不会触发 Card 或父级的普通 `@click`；关闭加载后恢复正常点击。遮罩不会禁用底层控件的键盘操作，如需完全禁止操作，请同时设置控件的 `disabled`。

### 覆盖层样式

| 变量 | 说明 |
| --- | --- |
| `--mp-loading-overlay-background` | 指令覆盖层背景色；background 选项可覆盖该值。 |

内容覆盖层类名：`.mp-loading__content-overlay`。
