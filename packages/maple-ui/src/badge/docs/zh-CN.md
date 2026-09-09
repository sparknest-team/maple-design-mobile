# Badge

与 Cedar 使用相同场景、参数和交互顺序；示例源码仅替换组件前缀，主题与站点外壳各自保留。

## 案例

### 基础用法

```html
<template>
  <mp-space wrap :size="24"
    ><mp-badge :content="9"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="9" dot
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge
      ><template #content><span aria-label="New activity">!</span></template
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ></mp-space
  >
</template>
```

### 内联与独立展示

```html
<script setup lang="ts">
const positions = ['start', 'end'] as const
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap><mp-badge :content="1000" /><mp-badge :content="1000" dot /></mp-space>
    <mp-space v-for="position in positions" :key="position" wrap>
      <mp-badge mode="inline" :inline-position="position" :content="9" description="Messages" />
      <mp-badge mode="inline" :inline-position="position" dot :content="9" description="Messages" />
    </mp-space>
  </mp-space>
</template>
```

### 小圆点

```html
<template>
  <mp-space wrap :size="24"
    ><mp-badge dot :content="1"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge dot :content="1" :offset-x="6" :offset-y="-2"
      ><a href="#" @click.prevent>Messages</a></mp-badge
    ></mp-space
  >
</template>
```

### 自定义内容

```html
<template>
  <mp-space wrap :size="24"
    ><mp-badge content="NEW"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge content="HOT" mode="inline" inline-position="start"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge content="HOT" mode="inline" inline-position="end"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ></mp-space
  >
</template>
```

### 最大值与零值

```html
<template>
  <mp-space wrap :size="24"
    ><mp-badge :content="0"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="0" show-zero
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="100" :max="10"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="100"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="1000" :max="999"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ></mp-space
  >
</template>
```

### 状态和颜色

```html
<script setup lang="ts">
const statuses = [
  'default',
  'primary',
  'secondary',
  'tertiary',
  'info',
  'success',
  'warning',
  'danger',
] as const
</script>

<template>
  <mp-space direction="column">
    <mp-space wrap
      ><mp-badge
        v-for="status in statuses"
        :key="status"
        :status="status"
        mode="inline"
        :description="status"
        :content="1"
    /></mp-space>
    <mp-space wrap
      ><mp-badge v-for="status in statuses" :key="status" :status="status" :content="status"
    /></mp-space>
    <mp-space wrap
      ><mp-badge color="#7816ff" text-color="#ffffff" content="Purple" /><mp-badge
        color="#005f73"
        text-color="#ffffff"
        content="Teal"
    /></mp-space>
  </mp-space>
</template>
```

### 五种尺寸

```html
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space wrap
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" mode="inline" :description="size"
    /></mp-space>
    <mp-space wrap
      ><mp-badge
        v-for="size in sizes"
        :key="size"
        :size="size"
        :content="1"
        dot
        mode="inline"
        :description="size"
    /></mp-space>
    <mp-space wrap :size="24"
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1"
        ><span
          style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      ></mp-space
    >
    <mp-space wrap :size="24"
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" dot
        ><span
          style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      ></mp-space
    >
  </mp-space>
</template>
```

### 位置与偏移

```html
<script setup lang="ts">
import { ref } from 'vue'
const offset = ref(0)
const dot = ref(false)
const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'left', 'right'] as const
const inlinePositions = ['start', 'end'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space wrap
      ><mp-button @click="offset++">Offset +1</mp-button><mp-button @click="offset--">Offset -1</mp-button
      ><mp-button @click="offset = 0">Reset</mp-button><mp-switch v-model="dot" aria-label="Toggle dot"
    /></mp-space>
    <output aria-live="polite">Offset: {{ offset }}px</output>
    <mp-space wrap :size="32"
      ><mp-badge
        v-for="position in positions"
        :key="position"
        :position="position"
        :content="100"
        :dot="dot"
        :offset-x="offset"
        :offset-y="offset"
        ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor">{{
          position
        }}</span></mp-badge
      ></mp-space
    >
    <mp-space wrap :size="24"
      ><mp-badge
        v-for="position in inlinePositions"
        :key="position"
        mode="inline"
        :inline-position="position"
        :content="9"
        :dot="dot"
        :offset-y="offset"
        :description="position"
    /></mp-space>
  </mp-space>
</template>
```

### 显示与隐藏

```html
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(true)
const content = ref(1)
</script>

<template>
  <mp-space direction="column">
    <mp-space wrap
      ><mp-switch v-model="show" aria-label="Show badge" /><mp-button @click="content++">Add</mp-button
      ><mp-button @click="content = Math.max(0, content - 1)">Subtract</mp-button></mp-space
    >
    <mp-badge :content="0" :show="show" show-zero description="show-zero true" />
    <mp-badge :content="0" :show="show" :show-zero="false" description="show-zero false" />
    <mp-badge :content="content" :show="show" description="Messages" />
    <mp-badge :content="content" :show="show" dot description="Activity" />
  </mp-space>
</template>
```

### 实心与描边

```html
<script setup lang="ts">
const variants = ['default', 'outline'] as const
const statuses = ['default', 'success', 'warning', 'danger', 'primary', 'info'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space v-for="variant in variants" :key="variant" wrap :size="24">
      <mp-badge v-for="status in statuses" :key="status" :variant="variant" :status="status" :content="1"
        ><span
          style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      >
    </mp-space>
    <mp-space wrap
      ><mp-badge
        v-for="status in statuses"
        :key="status"
        :status="status"
        variant="outline"
        mode="inline"
        :content="1"
        :description="status"
    /></mp-space>
    <mp-space wrap
      ><mp-badge
        v-for="status in statuses"
        :key="status"
        :status="status"
        variant="outline"
        mode="inline"
        dot
        :content="1"
        :description="status"
    /></mp-space>
  </mp-space>
</template>
```

## API

<!-- same-source-api:start -->
### Props

| 参数名          | 描述                                                                               | 类型                                                           |   默认值    |
| --------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------- | :---------: |
| description     | 徽标的描述文本                                                                     | `string`                                                       |     `-`     |
| content         | 徽标显示的内容                                                                     | `number \| string`                                             |     `-`     |
| max             | 徽标最大显示数值，如果content超过这个数值会显示为`${max}+`，content 为数字时有效。 | `number`                                                       |    `99`     |
| dot             | 显示为小红点                                                                       | `boolean`                                                      |   `false`   |
| offset-x        | 设置徽标位置的偏移X，mode为inline时无效。                                          | `number`                                                       |     `0`     |
| offset-y        | 设置徽标位置的偏移Y。                                                              | `number`                                                       |     `0`     |
| color           | 徽标的背景色，也可以设置自定义色值                                                 | `string`                                                       |     `-`     |
| text-color      | 徽标显示的内容颜色                                                                 | `string`                                                       |     `-`     |
| mode            | 徽标的类型                                                                         | `'floating' \| 'inline'`                                       | `floating`  |
| position        | 徽标物理位置（RTL 下不翻转），mode 为 floating 时有效                               | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'left' \| 'right'` | `top-right` |
| inline-position | 徽标的位置，mode 为 inline 时有效                                                  | `'start' \| 'end'`                                             |    `end`    |
| size            | 徽标的尺寸                                                                         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                         |    `md`     |
| status          | 徽标的状态                                                                         | `SemanticStatus`                                               |  `danger`   |
| show            | 是否显示徽标                                                                       | `boolean`                                                      |   `true`    |
| show-zero       | 徽标为0时是否显示                                                                  | `boolean`                                                      |   `false`   |
| variant         | 徽标的变体                                                                         | `'outline' \| 'default'`                                       |  `default`  |

### Events

无组件自定义事件。

### Slots

| 插槽名  | 说明             | 参数 |
| ------- | ---------------- | ---- |
| default | 徽标的描述文本   | -    |
| content | 徽标中显示的内容 | -    |

### Methods

无公开方法。

### 跨端说明

属性和插槽契约一致。没有 default 插槽且 description 为空时自动独立内联展示；未提供 content 时显示圆点。两端分别通过各自配置读取文字方向，主题颜色和 CSS 前缀由各端提供。
<!-- same-source-api:end -->

## 类型定义

```ts
type SemanticStatus = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'tertiary'
type BadgeVariant = 'default' | 'outline'
type BadgeMode = 'floating' | 'inline'
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right'
type BadgeInlinePosition = 'start' | 'end'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

### 通用

| 名称 | 默认值 |
| --- | --- |
| `--mp-badge-font-weight` | `500` |
| `--mp-badge-bg-color` | `#ef4444` |
| `--mp-badge-text-color` | `#ffffff` |
| `--mp-badge-description-text-color` | `var(--mp-color-text-1)` |

### 尺寸（`xs / sm / md / lg / xl`）

| 名称 |
| --- |
| `--mp-badge-size-{size}-font-size` |
| `--mp-badge-size-{size}-scale` |
| `--mp-badge-size-{size}-dot-width` / `-dot-height` |
| `--mp-badge-size-{size}-padding` |
| `--mp-badge-size-{size}-height` |
| `--mp-badge-size-{size}-border-radius` |
| `--mp-badge-size-{size}-space` |
| `--mp-badge-description-size-{size}-font-size` |

### 状态（`default / info / success / warning / danger / primary`）

| 名称 |
| --- |
| `--mp-badge-status-{status}-bg-color` |
| `--mp-badge-status-{status}-text-color` |
| `--mp-badge-variant-outline-status-{status}-text-color` |

默认 `status="danger"` 为红底白字；显式 `status="default"` 为中性色。支持完整的 `xs | sm | md | lg | xl` 五档尺寸。
