# Avatar 头像

用于展示用户或事物的头像，支持图片、文字、图标和头像组。示例与 Cedar Design Web 保持一致。

## 案例

### 基础用法

头像默认使用圆形外观；没有图片时，可以通过默认插槽展示文字或图标。

```html
<mp-space align="center" :size="16">
  <mp-avatar :size="32">C</mp-avatar>
  <mp-avatar :size="40">CD</mp-avatar>
  <mp-avatar :size="48" shape="square">Cedar</mp-avatar>
  <mp-avatar :size="56" color="#00bebe">
    <m-icon-account-circle />
  </mp-avatar>
</mp-space>
```

### 尺寸

`size` 控制头像宽高，单位为 px。可同时用于文字头像和图片头像。

```html
<mp-space direction="column" :size="16">
  <mp-space align="center" :size="16">
    <mp-avatar :size="24">A</mp-avatar>
    <mp-avatar :size="32">B</mp-avatar>
    <mp-avatar :size="40">C</mp-avatar>
    <mp-avatar :size="48">D</mp-avatar>
    <mp-avatar :size="64">E</mp-avatar>
  </mp-space>
  <mp-space align="center" :size="16">
    <mp-avatar image-url="cat.jpg" alt="一只猫" :size="28" />
    <mp-avatar image-url="cat.jpg" alt="一只猫" :size="36" />
    <mp-avatar image-url="cat.jpg" alt="一只猫" :size="48" />
    <mp-avatar image-url="cat.jpg" alt="一只猫" :size="64" />
    <mp-avatar image-url="cat.jpg" alt="一只猫" :size="78" />
  </mp-space>
</mp-space>
```

### 形状

`shape` 支持圆形和方形。

```html
<mp-space align="center" :size="16">
  <mp-avatar>圆</mp-avatar>
  <mp-avatar shape="square">方</mp-avatar>
  <mp-avatar image-url="cat.jpg" alt="圆形图片" />
  <mp-avatar image-url="cat.jpg" alt="方形图片" shape="square" />
</mp-space>
```

### 文字自适应

默认会按头像宽度缩放过长文字。修改输入框内容可以实时看到缩放效果；将 `auto-fix-font-size` 设为 `false` 后保持原始字号。

```html
<script setup>
import { ref } from 'vue'

const text = ref('Maple')
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-space align="center" :size="16">
      <mp-avatar>{{ text }}</mp-avatar>
      <mp-avatar shape="square">{{ text }}</mp-avatar>
      <mp-avatar :auto-fix-font-size="false">{{ text }}</mp-avatar>
    </mp-space>
    <mp-input v-model="text" placeholder="输入文字" />
  </mp-space>
</template>
```

### 图片头像

使用 `image-url` 设置图片，并通过 `alt` 提供可访问的替代文本。

```html
<mp-space align="center" :size="16">
  <mp-avatar image-url="cat.jpg" alt="一只猫" />
  <mp-avatar image-url="cat2.jpg" alt="一只猫" :size="48" shape="square" />
</mp-space>
```

### 图片填充

`object-fit` 控制图片在头像区域内的填充方式。

```html
<mp-space align="center" :size="24">
  <mp-avatar image-url="cat.jpg" alt="fill" object-fit="fill" :size="56" />
  <mp-avatar image-url="cat.jpg" alt="contain" object-fit="contain" :size="56" />
  <mp-avatar image-url="cat.jpg" alt="cover" object-fit="cover" :size="56" />
  <mp-avatar image-url="cat.jpg" alt="none" object-fit="none" :size="56" />
  <mp-avatar image-url="cat.jpg" alt="scale-down" object-fit="scale-down" :size="56" />
</mp-space>
```

### 加载与回退

`lazy` 开启懒加载，`loading` 指定加载中占位图。失败时可用 `error` 占位图，或使用 `error` 插槽自定义内容。

```html
<mp-space align="center" :size="16">
  <mp-avatar lazy image-url="cat.jpg" loading="cat2.jpg" alt="懒加载与占位图" :size="48" />
  <mp-avatar image-url="missing-avatar.jpg" error="cat.jpg" alt="失败时回退到占位图" :size="48" />
  <mp-avatar image-url="missing-avatar.jpg" alt="失败插槽" :size="48">
    <template #error>NA</template>
  </mp-avatar>
</mp-space>
```

### 颜色与边框

使用 `color` 设置背景色，可传入主题色变量。`bordered` / `border-color` 控制描边。

```html
<mp-space align="center" :size="16">
  <mp-avatar color="var(--mp-color-warning)">
    <m-icon-fire />
  </mp-avatar>
  <mp-avatar color="var(--mp-color-danger)">Maple</mp-avatar>
  <mp-avatar color="#00bebe">CD</mp-avatar>
  <mp-avatar color="#7b61ff" shape="square">A</mp-avatar>
  <mp-avatar bordered>B</mp-avatar>
  <mp-avatar bordered border-color="#00bebe" color="#e6fffb">C</mp-avatar>
</mp-space>
```

### 头像组

`AvatarGroup` 会自动堆叠子头像。可以用 `bordered` 做出叠层描边，或设置 `max-count` 将超出的头像收纳到 Popover 中。`z-index-ascend` 按顺序递增层级。

```html
<mp-space direction="column" :size="20">
  <mp-avatar-group>
    <mp-avatar image-url="cat.jpg" alt="用户一" bordered />
    <mp-avatar image-url="cat2.jpg" alt="用户二" bordered />
    <mp-avatar image-url="cat.jpg" alt="用户三" bordered />
    <mp-avatar bordered>+2</mp-avatar>
  </mp-avatar-group>

  <mp-avatar-group :max-count="3" :size="48">
    <mp-avatar image-url="cat.jpg" alt="用户一" />
    <mp-avatar image-url="cat2.jpg" alt="用户二" />
    <mp-avatar color="#00bebe">A</mp-avatar>
    <mp-avatar color="#f59e0b">B</mp-avatar>
    <mp-avatar color="#ef4444">C</mp-avatar>
  </mp-avatar-group>

  <mp-avatar-group z-index-ascend>
    <mp-avatar image-url="cat.jpg" alt="用户一" />
    <mp-avatar image-url="cat2.jpg" alt="用户二" />
    <mp-avatar color="#7b61ff">CD</mp-avatar>
  </mp-avatar-group>
</mp-space>
```

### 纵向头像组

`vertical` 改为纵向堆叠，`offset` 控制重叠间距。

```html
<mp-avatar-group vertical :offset="-12">
  <mp-avatar image-url="cat.jpg" alt="用户一" bordered />
  <mp-avatar image-url="cat2.jpg" alt="用户二" bordered />
  <mp-avatar image-url="cat.jpg" alt="用户三" bordered />
  <mp-avatar bordered>+2</mp-avatar>
</mp-avatar-group>
```

### 头像可悬停

设置 `hoverable` 后，鼠标悬停时头像会放大。

```html
<mp-avatar-group>
  <mp-avatar hoverable image-url="cat.jpg" alt="用户一" bordered />
  <mp-avatar hoverable image-url="cat2.jpg" alt="用户二" bordered />
  <mp-avatar hoverable image-url="cat.jpg" alt="用户三" bordered />
  <mp-avatar hoverable bordered>+2</mp-avatar>
</mp-avatar-group>
```

### 交互图标

使用 `trigger-icon` 插槽添加交互入口，`trigger-type` 支持独立按钮和悬浮遮罩两种形式。

```html
<mp-space align="center" :size="24">
  <mp-avatar image-url="cat.jpg" alt="编辑头像" :size="56">
    <template #trigger-icon><m-icon-image /></template>
  </mp-avatar>
  <mp-avatar image-url="cat2.jpg" alt="更换头像" :size="56" trigger-type="mask">
    <template #trigger-icon><m-icon-camera /></template>
  </mp-avatar>
</mp-space>
```

## API

### 属性

#### Avatar Props

| 参数                 | 说明                       | 类型                                                       | 默认值     |
| -------------------- | -------------------------- | ---------------------------------------------------------- | ---------- |
| `shape`              | 头像形状                   | `'circle' \| 'square'`                                     | `'circle'` |
| `image-url`          | 图片地址                   | _string_                                                   | `-`        |
| `alt`                | 图片替代文本               | _string_                                                   | `''`       |
| `size`               | 头像宽高，单位为 px        | _number_                                                   | `40`       |
| `auto-fix-font-size` | 是否自动缩放过长的文字内容 | _boolean_                                                  | `true`     |
| `trigger-type`       | 交互图标展示方式           | `'button' \| 'mask'`                                       | `'button'` |
| `trigger-icon-style` | 交互图标的自定义样式       | _CSSProperties_                                            | `-`        |
| `object-fit`         | 图片填充方式               | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'`  |
| `color`              | 头像背景色                 | _string_                                                   | `-`        |
| `bordered`           | 是否显示描边               | _boolean_                                                  | `false`    |
| `border-color`       | 描边颜色                   | _string_                                                   | `-`        |
| `loading`            | 图片加载中的占位图地址     | _string_                                                   | `-`        |
| `error`              | 图片加载失败的占位图地址   | _string_                                                   | `-`        |
| `lazy`               | 是否懒加载图片             | _boolean_                                                  | `false`    |
| `hoverable`          | 是否开启悬停放大效果       | _boolean_                                                  | `false`    |

### 事件

#### Avatar Events

| 事件名  | 说明               | 参数                |
| ------- | ------------------ | ------------------- |
| `click` | 点击头像时触发     | `event: MouseEvent` |
| `load`  | 图片加载成功时触发 | `-`                 |
| `error` | 图片加载失败时触发 | `-`                 |

### 插槽

#### Avatar Slots

| 名称           | 说明                       |
| -------------- | -------------------------- |
| `default`      | 文字、图标或图片加载中内容 |
| `error`        | 图片加载失败时的回退内容   |
| `trigger-icon` | 头像上的交互图标           |

#### AvatarGroup Props

| 参数                 | 说明                               | 类型                   | 默认值     |
| -------------------- | ---------------------------------- | ---------------------- | ---------- |
| `shape`              | 子头像形状                         | `'circle' \| 'square'` | `'circle'` |
| `size`               | 子头像宽高，单位为 px              | _number_               | `40`       |
| `auto-fix-font-size` | 是否自动缩放子头像中的文字         | _boolean_              | `true`     |
| `max-count`          | 最多直接展示的头像数，`0` 表示不限 | _number_               | `0`        |
| `z-index-ascend`     | 头像层级是否按顺序递增             | _boolean_              | `false`    |
| `max-style`          | 数量汇总头像的自定义样式           | _CSSProperties_        | `-`        |
| `max-popover-props`  | 汇总 Popover 的属性                | _PopoverProps_         | `-`        |
| `offset`             | 组内头像的重叠偏移量               | _number \| string_     | `-`        |
| `vertical`           | 是否纵向堆叠                       | _boolean_              | `false`    |

#### AvatarGroup Slots

| 名称      | 说明     |
| --------- | -------- |
| `default` | 头像列表 |

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `shape` | 子头像形状 | `'circle' \| 'square'` | `'circle'` |
| `size` | 子头像宽高，单位为 px | _number_ | `40` |
| `auto-fix-font-size` | 是否自动缩放子头像中的文字 | _boolean_ | `true` |
| `max-count` | 最多直接展示的头像数，`0` 表示不限 | _number_ | `0` |
| `z-index-ascend` | 头像层级是否按顺序递增 | _boolean_ | `false` |
| `max-style` | 数量汇总头像的自定义样式 | _CSSProperties_ | `-` |
| `max-popover-props` | 汇总 Popover 的属性 | _PopoverProps_ | `-` |
| `offset` | 组内头像的重叠偏移量 | _number \| string_ | `-` |
| `vertical` | 是否纵向堆叠 | _boolean_ | `false` |

### 插槽

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 头像列表 | `-` |

