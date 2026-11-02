<!-- Source: src/badge/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/badge -->

# Badge

与 Cedar 使用相同场景、参数和交互顺序；示例源码仅替换组件前缀，主题与站点外壳各自保留。

## 案例

### 基础用法

徽标默认使用红色背景和白色文字。

Example source: src/badge/example/demos/basic.vue

```vue
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

### 五种尺寸

Example source: src/badge/example/demos/size.vue

```vue
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space wrap
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" mode="inline" :description="size"
    /></mp-space>
    <mp-space wrap
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" dot mode="inline" :description="size"
    /></mp-space>
    <mp-space wrap :size="24"
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1"
        ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      ></mp-space
    >
    <mp-space wrap :size="24"
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" dot
        ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      ></mp-space
    >
  </mp-space>
</template>
```

### 实心与描边

Example source: src/badge/example/demos/variant.vue

```vue
<script setup lang="ts">
const variants = ['default', 'outline'] as const
const statuses = ['default', 'success', 'warning', 'danger', 'primary', 'info'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space v-for="variant in variants" :key="variant" wrap :size="24">
      <mp-badge v-for="status in statuses" :key="status" :variant="variant" :status="status" :content="1"
        ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
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

### 状态和颜色

Example source: src/badge/example/demos/color.vue

```vue
<script setup lang="ts">
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
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
    <mp-space wrap><mp-badge v-for="status in statuses" :key="status" :status="status" :content="status" /></mp-space>
    <mp-space wrap
      ><mp-badge color="#7816ff" text-color="#ffffff" content="Purple" /><mp-badge
        color="#005f73"
        text-color="#ffffff"
        content="Teal"
    /></mp-space>
  </mp-space>
</template>
```

### 外观组合

适用于通知数量和标记。调整变体、状态、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/badge/example/demos/appearance-lab.vue

```vue
<script setup lang="ts">
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'default', status: 'default', size: 'md' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'outline', value: 'outline' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>status</span
        ><mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'primary', value: 'primary' },
            { label: 'secondary', value: 'secondary' },
            { label: 'tertiary', value: 'tertiary' },
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
          ]"
          aria-label="status"
        />
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-badge :content="1000" v-bind="__demoAppearance" />
  </mp-space>
</template>
```

### 内联与独立展示

Example source: src/badge/example/demos/inline.vue

```vue
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

Example source: src/badge/example/demos/dot.vue

```vue
<template>
  <mp-space wrap :size="24"
    ><mp-badge dot :content="1"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge dot :content="1" :offset-x="6" :offset-y="-2"
      ><mp-link href="#" @click.prevent>Messages</mp-link></mp-badge
    ></mp-space
  >
</template>
```

### 自定义内容

Example source: src/badge/example/demos/content.vue

```vue
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

Example source: src/badge/example/demos/max.vue

```vue
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

### 位置与偏移

Example source: src/badge/example/demos/position.vue

```vue
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

Example source: src/badge/example/demos/show.vue

```vue
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

以下是全部公开 Badge 变量及默认值：

| 变量 | 默认值 |
| --- | --- |
| `--mp-badge-font-weight` | `var(--mp-sys-font-weight-medium)` |
| `--mp-badge-description-size-xs-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-description-size-sm-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-description-size-md-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-badge-description-size-lg-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-badge-description-size-xl-font-size` | `var(--mp-sys-font-size-xl)` |
| `--mp-badge-description-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-badge-size-xs-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-sm-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-md-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-lg-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-badge-size-xl-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-badge-size-xs-scale` | `0.6667` |
| `--mp-badge-size-sm-scale` | `0.8333` |
| `--mp-badge-size-md-scale` | `1` |
| `--mp-badge-size-lg-scale` | `1` |
| `--mp-badge-size-xl-scale` | `1` |
| `--mp-badge-size-xs-dot-width` | `4px` |
| `--mp-badge-size-sm-dot-width` | `5px` |
| `--mp-badge-size-md-dot-width` | `6px` |
| `--mp-badge-size-lg-dot-width` | `7px` |
| `--mp-badge-size-xl-dot-width` | `8px` |
| `--mp-badge-size-xs-dot-height` | `4px` |
| `--mp-badge-size-sm-dot-height` | `5px` |
| `--mp-badge-size-md-dot-height` | `6px` |
| `--mp-badge-size-lg-dot-height` | `7px` |
| `--mp-badge-size-xl-dot-height` | `8px` |
| `--mp-badge-size-xs-space` | `0px` |
| `--mp-badge-size-sm-space` | `var(--mp-sys-space-1)` |
| `--mp-badge-size-md-space` | `var(--mp-sys-space-3)` |
| `--mp-badge-size-lg-space` | `var(--mp-sys-space-3)` |
| `--mp-badge-size-xl-space` | `var(--mp-sys-space-4)` |
| `--mp-badge-size-xs-padding` | `0 var(--mp-sys-space-3)` |
| `--mp-badge-size-sm-padding` | `0 var(--mp-sys-space-3)` |
| `--mp-badge-size-md-padding` | `0 var(--mp-sys-space-4)` |
| `--mp-badge-size-lg-padding` | `0 var(--mp-sys-space-4)` |
| `--mp-badge-size-xl-padding` | `0 10px` |
| `--mp-badge-size-xs-height` | `20px` |
| `--mp-badge-size-sm-height` | `20px` |
| `--mp-badge-size-md-height` | `24px` |
| `--mp-badge-size-lg-height` | `28px` |
| `--mp-badge-size-xl-height` | `32px` |
| `--mp-badge-size-xs-border-radius` | `20px` |
| `--mp-badge-size-sm-border-radius` | `20px` |
| `--mp-badge-size-md-border-radius` | `24px` |
| `--mp-badge-size-lg-border-radius` | `28px` |
| `--mp-badge-size-xl-border-radius` | `32px` |
| `--mp-badge-bg-color` | `rgb(var(--mp-danger-7))` |
| `--mp-badge-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-default-bg-color` | `#e0e0e0` |
| `--mp-badge-status-default-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-info-bg-color` | `var(--mp-sys-color-status-info)` |
| `--mp-badge-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-success-bg-color` | `var(--mp-sys-color-status-success)` |
| `--mp-badge-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-warning-bg-color` | `var(--mp-sys-color-status-warning)` |
| `--mp-badge-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-danger-bg-color` | `rgb(var(--mp-danger-7))` |
| `--mp-badge-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-primary-bg-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-badge-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-secondary-bg-color` | `rgb(var(--mp-gray-6))` |
| `--mp-badge-status-secondary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-tertiary-bg-color` | `rgb(var(--mp-gray-7))` |
| `--mp-badge-status-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-variant-outline-bg-color` | `transparent` |
| `--mp-badge-variant-outline-text-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-badge-variant-outline-status-info-text-color` | `var(--mp-sys-color-content-info)` |
| `--mp-badge-variant-outline-status-success-text-color` | `var(--mp-sys-color-content-success)` |
| `--mp-badge-variant-outline-status-warning-text-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-badge-variant-outline-status-danger-text-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-badge-variant-outline-status-primary-text-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-badge-variant-outline-status-default-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-badge-variant-outline-status-secondary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-badge-variant-outline-status-tertiary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-badge-border-color` | `var(--mp-sys-color-surface-default)` |
| `--mp-badge-offset` | `2px` |
| `--mp-badge-ring-width` | `2px` |

填充徽标的文字配色以 Button 为准：primary、info、success、warning、danger、secondary 使用 `content-on-dark`；tertiary 在亮色使用 `content-on-dark`，暗色使用 `content-on-bright`。默认通知徽标使用红底白字，中性背景 `#e0e0e0` 为固定浅灰色。

彩色轮廓文字和描边与 Button 一致，使用对应的 `content-brand` / `content-info` / `content-success` / `content-warning` / `content-danger` 语义色；secondary 与 tertiary 轮廓均使用 `content-secondary` 保持可读性。`variant-outline-bg-color` 对所有状态均生效，默认透明。`color` 属性覆盖轮廓文字和描边，`text-color` 进一步覆盖文字；二者均保留背景变量的控制权。自定义前景或背景后须重新验证对比度。

### 颜色覆盖边界

bg-color 兜底和 danger 填充均使用红色背景与白色文字：浅色主题为 danger 第 7 阶，暗色主题为第 4 阶。中性固定浅灰与 secondary/tertiary 灰阶是有意的组件配色；border-color 隔离环可按宿主表面覆盖。自定义 color/text-color 由调用方保证对比度。
