<!-- Source: src/empty/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/empty -->

# 空状态 Empty

指当前场景没有对应的数据内容，呈现出的一种状态。示例与 Cedar Design Web 保持一致，布局按移动端换行。

## 案例

### 基础用法

空状态组件的基本用法。不传 `description` 时使用国际化文案。

Example source: src/empty/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-empty description="暂无数据" />
</template>
```

### 自定义图片和文案

通过 `image` 插槽自定义图标、图片，或通过默认插槽修改文案。也可用 `image-url` 指定图片地址。

Example source: src/empty/example/demos/custom-image.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" :size="24">
    <mp-empty>
      <template #image>
        <m-icon-alert-circle />
      </template>
      No data, please reload!!
    </mp-empty>
    <mp-empty image-url="/cat.jpg" alt="空状态图片" description="自定义图片和文案" />
  </mp-space>
</template>
```

### 图片尺寸

通过 `image-size` 控制图标尺寸，可选值为 `xs` `sm` `md` `lg` `xl`，也可传入数值。

Example source: src/empty/example/demos/image-size.vue

```vue
<script setup>
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-empty v-for="size in sizes" :key="size" :image-size="size" :description="`image-size: ${size}`" />
  </mp-space>
</template>
```

### 操作按钮

Reload 只更新本地刷新次数和描述，不请求服务；真实业务请自行接入请求与结果状态。

通过 `extra` 插槽添加操作按钮。

Example source: src/empty/example/demos/extra-slot.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const attempts = ref(0)
</script>

<template>
  <mp-empty :description="attempts ? 'No data. Local refresh completed.' : 'No data, please reload'">
    <template #extra>
      <mp-button status="primary" @click="attempts++">Reload</mp-button>
      <p aria-live="polite">Local refresh attempts: {{ attempts }}</p>
    </template>
  </mp-empty>
</template>
```

### 显示与隐藏

通过两个按钮分别隐藏和恢复图标、描述。两者同时隐藏不代表隐藏整个组件，也不影响 extra 插槽。

通过 `show-icon`、`show-description` 控制图标和描述是否显示。

Example source: src/empty/example/demos/show.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const showIcon = ref(true)
const showDescription = ref(true)
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-button @click="showIcon = !showIcon">Toggle icon</mp-button>
      <mp-button @click="showDescription = !showDescription">Toggle description</mp-button>
    </mp-space>
    <mp-empty
      data-demo-empty
      description="Dynamic empty state"
      :show-icon="showIcon"
      :show-description="showDescription"
    />
  </mp-space>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `description` | 描述内容，缺省时使用国际化文案 | `string` | `-` |
| `image-url` | 自定义图片地址 | `string` | `-` |
| `alt` | 图片替代文本 | `string` | `''` |
| `image-size` | 图片/图标尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `'md'` |
| `show-icon` | 是否显示图标 | `boolean` | `true` |
| `show-description` | 是否显示描述 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击回调 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 描述内容 |
| `image` | 自定义图标/图片 |
| `extra` | 额外操作 |

### 类型定义

```ts
type EmptyImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string
```

### 样式变量

| 名称 | 默认值 |
| --- | --- |
| `--mp-empty-padding` | `20px` |
| `--mp-empty-image-margin-bottom` | `4px` |
| `--mp-empty-description-font-size` | `14px` |
| `--mp-empty-description-color` | `var(--mp-sys-color-content-tertiary)` |
| `--mp-empty-description-line-height` | `1.5` |
| `--mp-empty-icon-color` | `var(--mp-sys-color-content-decorative)` |
| `--mp-empty-extra-margin-top` | `20px` |
| `--mp-empty-size-xs` | `80px` |
| `--mp-empty-size-sm` | `100px` |
| `--mp-empty-size-md` | `120px` |
| `--mp-empty-size-lg` | `140px` |
| `--mp-empty-size-xl` | `160px` |

描述使用低强调文字语义，装饰图标使用 `content-decorative`；后者不用于需要阅读的文字。自定义图片或插槽可能有自己的颜色，不会被 `icon-color` 强制重染。尺寸与间距允许遵循移动端密度，但同名变量职责与 Cedar 一致。
