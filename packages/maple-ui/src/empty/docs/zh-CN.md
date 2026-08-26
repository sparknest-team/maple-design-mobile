# 空状态

### 介绍

空状态时的占位提示。

### 基本使用

```html
<script setup>
import { ref } from 'vue'
</script>

<template>
  <mp-empty description="暂无数据" />
</template>
```

### 图片尺寸

通过 `image-size` 属性控制图标尺寸，可选值为 `xs` `sm` `md` `lg` `xl`。

```html
<template>
  <mp-space direction="column" :size="['0', '20px']">
    <mp-empty v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size" :image-size="size" :description="`image-size: ${size}`" />
  </mp-space>
</template>
```

### 自定义图片

```html
<template>
  <mp-empty description="自定义图片" image-url="https://cdn.example.com/empty.svg" />
</template>
```

### 自定义图标插槽

```html
<template>
  <mp-empty description="自定义图标">
    <template #image>
      <m-icon-search />
    </template>
  </mp-empty>
</template>
```

### 操作按钮

```html
<template>
  <mp-empty description="暂无数据">
    <template #extra>
      <mp-button type="primary" size="sm" @click="() => {}">重新加载</mp-button>
    </template>
  </mp-empty>
</template>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `description` | 描述文字 | _string_ | `-` |
| `image-size` | 图标尺寸，可选值为 `xs` `sm` `md` `lg` `xl`，或具体数值 | _string \| number_ | `md` |
| `image-url` | 自定义图片地址（会覆盖默认图标） | _string_ | `-` |
| `show-icon` | 是否显示图标 | _boolean_ | `true` |
| `show-description` | 是否显示描述 | _boolean_ | `true` |
| `on-click` | 点击回调 | _(event: Event) => void_ | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 描述内容 | `-` |
| `image` | 自定义图标/图片 | `-` |
| `extra` | 额外操作区域 | `-` |
