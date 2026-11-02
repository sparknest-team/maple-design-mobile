<!-- Source: src/tag/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/tag -->

# 标签

## 案例

### 介绍

标签用于标记、分类与筛选。API 与 Cedar Design Web (PC) 的 Tag 对齐，并吸收移动端常见能力（圆角、自定义文字色）。

### 主题色标签

通过 `status` 设置主题色，可选值与 Button 一致：`default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger`。

Example source: src/tag/example/demos/theme-color-tag.vue

```vue
<script setup></script>

<template>
  <mp-space wrap :size="['2.666vmin', '2.666vmin']">
    <mp-tag>默认</mp-tag>
    <mp-tag status="primary">主要</mp-tag>
    <mp-tag status="info">信息</mp-tag>
    <mp-tag status="success">成功</mp-tag>
    <mp-tag status="warning">警告</mp-tag>
    <mp-tag status="danger">危险</mp-tag>
    <mp-tag status="secondary">次要</mp-tag>
    <mp-tag status="tertiary">第三语义色</mp-tag>
  </mp-space>
</template>
```

### 描边标签

通过 `variant="outline"` 切换为描边风格。

Example source: src/tag/example/demos/outline-tag.vue

```vue
<script setup></script>

<template>
  <mp-space wrap :size="['2.666vmin', '2.666vmin']">
    <mp-tag variant="outline">默认</mp-tag>
    <mp-tag variant="outline" status="primary">主要</mp-tag>
    <mp-tag variant="outline" status="info">信息</mp-tag>
    <mp-tag variant="outline" status="success">成功</mp-tag>
    <mp-tag variant="outline" status="warning">警告</mp-tag>
    <mp-tag variant="outline" status="danger">危险</mp-tag>
  </mp-space>
</template>
```

### 圆角标签

通过 `round` 开启胶囊圆角。

Example source: src/tag/example/demos/round-tag.vue

```vue
<script setup></script>

<template>
  <mp-space wrap :size="['2.666vmin', '2.666vmin']">
    <mp-tag round status="primary">圆角标签</mp-tag>
    <mp-tag round variant="outline" status="success">描边圆角</mp-tag>
    <mp-tag round status="danger" closable>可关闭标签</mp-tag>
  </mp-space>
</template>
```

### 标签尺寸

通过 `size` 设置尺寸，可选值 `xs` `sm` `md` `lg` `xl`。

Example source: src/tag/example/demos/tag-size.vue

```vue
<script setup></script>

<template>
  <mp-space wrap align="center" :size="['2.666vmin', '2.666vmin']">
    <mp-tag size="xs" status="primary">xs</mp-tag>
    <mp-tag size="sm" status="primary">sm</mp-tag>
    <mp-tag size="md" status="primary">md</mp-tag>
    <mp-tag size="lg" status="primary">lg</mp-tag>
    <mp-tag size="xl" status="primary">xl</mp-tag>
  </mp-space>
</template>
```

### 可关闭标签

关闭按钮支持 Space / Enter，关闭不应冒泡为选中。可选中标签支持 Space / Enter；受控 checked 仍由父级决定是否接受，未传时由组件自持状态。loading 阻止选中动作，不是 disabled API。两端各自维护状态，不共享实例；这些基本操作不等于长按/异步或触屏组合均已验收。

通过 `closable` 显示关闭按钮，配合 `v-model:show` 或自行维护列表。

Example source: src/tag/example/demos/closable-tag.vue

```vue
<script setup>
import { ref } from 'vue'

const show = ref(true)
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
function removeTag(tag) {
  dynamicTags.value = dynamicTags.value.filter((item) => item !== tag)
}
</script>

<template>
  <mp-space wrap :size="['2.666vmin', '2.666vmin']">
    <mp-tag v-model:show="show" closable status="primary">标签</mp-tag>
    <mp-tag v-for="tag in dynamicTags" :key="tag" closable round status="info" @close="removeTag(tag)">
      {{ tag }}
    </mp-tag>
  </mp-space>
</template>
```

### 加载中标签

通过 `loading` 显示加载状态。

Example source: src/tag/example/demos/loading-tag.vue

```vue
<script setup></script>

<template>
  <mp-space wrap :size="['2.666vmin', '2.666vmin']">
    <mp-tag loading status="primary">加载中标签</mp-tag>
    <mp-tag loading status="success">加载中标签</mp-tag>
  </mp-space>
</template>
```

### 可选中标签

通过 `checkable` 使标签可点击切换选中，配合 `v-model`。

Example source: src/tag/example/demos/checkable-tag.vue

```vue
<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <mp-space wrap :size="['2.666vmin', '2.666vmin']">
    <mp-tag v-model="checked" checkable status="primary">可选中标签</mp-tag>
    <mp-tag checkable :default-value="false" status="success">可选中标签</mp-tag>
    <mp-tag checkable status="warning" variant="outline">描边状态</mp-tag>
    <mp-tag checkable status="success" loading>加载中</mp-tag>
  </mp-space>
</template>
```

### 带图标

通过 `icon` 插槽自定义前缀，`close-icon` 自定义关闭图标。

Example source: src/tag/example/demos/icon-tag.vue

```vue
<script setup></script>

<template>
  <mp-space wrap :size="['2.666vmin', '2.666vmin']">
    <mp-tag status="success">
      <template #icon><m-icon-check /></template>
      完成
    </mp-tag>
    <mp-tag status="info">
      <template #icon><m-icon-info-circle-fill /></template>
      信息
    </mp-tag>
  </mp-space>
</template>
```

### 自定义颜色

通过 `color` 与 `text-color` 设置自定义颜色（覆盖 status）。`variant="outline"` 时 `color` 作为边框色。

Example source: src/tag/example/demos/custom-color-tag.vue

```vue
<script setup></script>

<template>
  <mp-space wrap :size="['2.666vmin', '2.666vmin']">
    <mp-tag color="#66bb6a" text-color="#fff">自定义颜色</mp-tag>
    <mp-tag variant="outline" color="#6750A4">描边自定义</mp-tag>
    <mp-tag color="linear-gradient(to right bottom, #6750A4, #D0BCFF)" text-color="#fff"> 自定义颜色 </mp-tag>
  </mp-space>
</template>
```

### 外观组合

适用于短标签与分类标记。调整变体、状态、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/tag/example/demos/appearance-lab.vue

```vue
<script setup>
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
    <mp-tag v-bind="__demoAppearance">默认</mp-tag>
  </mp-space>
</template>
```

## API

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示可选标签是否选中，布尔值；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

### 属性

#### Tag Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `status` | 主题色，可选值 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `default` |
| `variant` | 变体，可选 `default`（实心） / `outline`（描边） | _string_ | `default` |
| `size` | 尺寸，可选值 `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `round` | 是否为圆角胶囊形 | _boolean_ | `false` |
| `show` | 是否可见（v-model） | _boolean_ | `true` |
| `default-show` | 默认是否可见 | _boolean_ | `true` |
| `loading` | 是否为加载中状态 | _boolean_ | `false` |
| `closable` | 是否可关闭 | _boolean_ | `false` |
| `checkable` | 是否可点击选中 | _boolean_ | `false` |
| `model-value` | 选中状态（checkable 时有效，v-model） | _boolean_ | `true` |
| `default-value` | 默认选中状态（checkable 时有效） | _boolean_ | `true` |
| `nowrap` | 内容是否不换行（超出省略） | _boolean_ | `false` |
| `color` | 自定义背景色（outline 时为边框色） | _string_ | `-` |
| `text-color` | 自定义文字色 | _string_ | `-` |

### 事件

#### Tag Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `update:show` | 可见状态变化 | `(show: boolean)` |
| `update:model-value` | 选中状态变化（checkable 时） | `(checked: boolean)` |
| `close` | 点击关闭按钮 | `(event: MouseEvent)` |
| `check` | 点击切换选中状态（checkable 时） | `(checked: boolean, event: MouseEvent)` |

### 插槽

#### Tag Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 标签内容 |
| `icon` | 前缀 |
| `close-icon` | 自定义关闭按钮图标 |

### 类型定义

```ts
type TagStatus = 'default' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'danger'
type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TagVariant = 'default' | 'outline'
```

### 样式变量

完整公开变量以 `style/token.less` 中的 `--mp-tag-*` 为准，可通过 [StyleProvider 组件](#/zh-CN/style-provider) 定制。Cedar 使用完全相同的逻辑变量名，仅品牌前缀不同。

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

两端保留独立的 show/checked 状态，受控值由调用方更新；保留淡出效果，class/style 显式透传给实际标签。尺寸配置、RTL 上下文及图标资源由各库本地适配，移动端触控尺寸保留在 token 中。

### 完整变量默认值与使用边界

状态文字与 outline 描边使用可读 system content，彩色填充使用对应色板第 1 阶。未选中保持中性，已选中状态色优先于通用 hover；默认中性填充为 fill-2 → fill-3。color 优先于 status；预设色不属于本批对比度保证范围。自定义背景需要调用方验证文字对比度，必要时传 text-color。尺寸保留平台差异。以下列出全部公开声明；15 项无消费的预设图标 hover 背景／尺寸变量已移除。custom-icon-bg-hover 及 InputTag 的旧引用也已移除，不保留兼容别名。

| 变量 | 默认值 |
| --- | --- |
| `--mp-tag-status-primary-bg-color` | `rgb(var(--mp-primary-1))` |
| `--mp-tag-status-primary-text-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-tag-status-secondary-bg-color` | `rgb(var(--mp-gray-2))` |
| `--mp-tag-status-secondary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-status-tertiary-bg-color` | `rgb(var(--mp-gray-1))` |
| `--mp-tag-status-tertiary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-status-info-bg-color` | `rgb(var(--mp-blue-1))` |
| `--mp-tag-status-info-text-color` | `var(--mp-sys-color-content-info)` |
| `--mp-tag-status-success-bg-color` | `rgb(var(--mp-success-1))` |
| `--mp-tag-status-success-text-color` | `var(--mp-sys-color-content-success)` |
| `--mp-tag-status-warning-bg-color` | `rgb(var(--mp-warning-1))` |
| `--mp-tag-status-warning-text-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-tag-status-danger-bg-color` | `rgb(var(--mp-danger-1))` |
| `--mp-tag-status-danger-text-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-tag-variant-outline-status-primary-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-tag-variant-outline-status-secondary-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-variant-outline-status-tertiary-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-variant-outline-status-info-color` | `var(--mp-sys-color-content-info)` |
| `--mp-tag-variant-outline-status-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-tag-variant-outline-status-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-tag-variant-outline-status-danger-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-tag-variant-outline-default-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-tag-variant-outline-default-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-tag-border-width` | `1px` |
| `--mp-tag-border-type` | `solid` |
| `--mp-tag-padding-horizontal` | `10px` |
| `--mp-tag-padding-vertical` | `0` |
| `--mp-tag-icon-margin-right` | `var(--mp-sys-space-3)` |
| `--mp-tag-text-font-weight` | `var(--mp-sys-font-weight-medium)` |
| `--mp-tag-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-tag-round-radius` | `100px` |
| `--mp-tag-size-xs` | `24px` |
| `--mp-tag-size-sm` | `28px` |
| `--mp-tag-size-md` | `32px` |
| `--mp-tag-size-lg` | `36px` |
| `--mp-tag-size-xl` | `40px` |
| `--mp-tag-size-xs-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-tag-size-sm-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-tag-size-md-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-tag-size-lg-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-tag-size-xl-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-tag-bg-not-checked-hover` | `var(--mp-sys-color-state-hover)` |
| `--mp-tag-custom-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-tag-default-bg` | `var(--mp-sys-color-state-hover)` |
| `--mp-tag-default-bg-hover` | `var(--mp-color-fill-3)` |
| `--mp-tag-default-icon-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-default-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-tag-default-border-color` | `transparent` |
| `--mp-tag-default-border-color-hover` | `transparent` |
| `--mp-tag-red-bg` | `rgb(var(--mp-red-1))` |
| `--mp-tag-red-bg-hover` | `rgb(var(--mp-red-2))` |
| `--mp-tag-red-border-color` | `transparent` |
| `--mp-tag-red-border-color-hover` | `transparent` |
| `--mp-tag-red-icon-color` | `rgb(var(--mp-red-9))` |
| `--mp-tag-red-text-color` | `rgb(var(--mp-red-9))` |
| `--mp-tag-orangered-bg` | `rgb(var(--mp-orangered-1))` |
| `--mp-tag-orangered-bg-hover` | `rgb(var(--mp-orangered-2))` |
| `--mp-tag-orangered-border-color` | `transparent` |
| `--mp-tag-orangered-border-color-hover` | `transparent` |
| `--mp-tag-orangered-icon-color` | `rgb(var(--mp-orangered-9))` |
| `--mp-tag-orangered-text-color` | `rgb(var(--mp-orangered-9))` |
| `--mp-tag-orange-bg` | `rgb(var(--mp-orange-1))` |
| `--mp-tag-orange-bg-hover` | `rgb(var(--mp-orange-2))` |
| `--mp-tag-orange-border-color` | `transparent` |
| `--mp-tag-orange-border-color-hover` | `transparent` |
| `--mp-tag-orange-icon-color` | `rgb(var(--mp-orange-9))` |
| `--mp-tag-orange-text-color` | `rgb(var(--mp-orange-9))` |
| `--mp-tag-gold-bg` | `rgb(var(--mp-gold-1))` |
| `--mp-tag-gold-bg-hover` | `rgb(var(--mp-gold-2))` |
| `--mp-tag-gold-border-color` | `transparent` |
| `--mp-tag-gold-border-color-hover` | `transparent` |
| `--mp-tag-gold-icon-color` | `rgb(var(--mp-gold-9))` |
| `--mp-tag-gold-text-color` | `rgb(var(--mp-gold-9))` |
| `--mp-tag-lime-bg` | `rgb(var(--mp-lime-1))` |
| `--mp-tag-lime-bg-hover` | `rgb(var(--mp-lime-2))` |
| `--mp-tag-lime-border-color` | `transparent` |
| `--mp-tag-lime-border-color-hover` | `transparent` |
| `--mp-tag-lime-icon-color` | `rgb(var(--mp-lime-9))` |
| `--mp-tag-lime-text-color` | `rgb(var(--mp-lime-9))` |
| `--mp-tag-green-bg` | `rgb(var(--mp-green-1))` |
| `--mp-tag-green-bg-hover` | `rgb(var(--mp-green-2))` |
| `--mp-tag-green-border-color` | `transparent` |
| `--mp-tag-green-border-color-hover` | `transparent` |
| `--mp-tag-green-icon-color` | `rgb(var(--mp-green-9))` |
| `--mp-tag-green-text-color` | `rgb(var(--mp-green-9))` |
| `--mp-tag-cyan-bg` | `rgb(var(--mp-cyan-1))` |
| `--mp-tag-cyan-bg-hover` | `rgb(var(--mp-cyan-2))` |
| `--mp-tag-cyan-border-color` | `transparent` |
| `--mp-tag-cyan-border-color-hover` | `transparent` |
| `--mp-tag-cyan-icon-color` | `rgb(var(--mp-cyan-9))` |
| `--mp-tag-cyan-text-color` | `rgb(var(--mp-cyan-9))` |
| `--mp-tag-blue-bg` | `rgb(var(--mp-blue-1))` |
| `--mp-tag-blue-bg-hover` | `rgb(var(--mp-blue-2))` |
| `--mp-tag-blue-border-color` | `transparent` |
| `--mp-tag-blue-border-color-hover` | `transparent` |
| `--mp-tag-blue-icon-color` | `rgb(var(--mp-blue-9))` |
| `--mp-tag-blue-text-color` | `rgb(var(--mp-blue-9))` |
| `--mp-tag-brand-bg` | `rgb(var(--mp-brand-1))` |
| `--mp-tag-brand-bg-hover` | `rgb(var(--mp-brand-2))` |
| `--mp-tag-brand-border-color` | `transparent` |
| `--mp-tag-brand-border-color-hover` | `transparent` |
| `--mp-tag-brand-icon-color` | `rgb(var(--mp-brand-9))` |
| `--mp-tag-brand-text-color` | `rgb(var(--mp-brand-9))` |
| `--mp-tag-purple-bg` | `rgb(var(--mp-purple-1))` |
| `--mp-tag-purple-bg-hover` | `rgb(var(--mp-purple-2))` |
| `--mp-tag-purple-border-color` | `transparent` |
| `--mp-tag-purple-border-color-hover` | `transparent` |
| `--mp-tag-purple-icon-color` | `rgb(var(--mp-purple-9))` |
| `--mp-tag-purple-text-color` | `rgb(var(--mp-purple-9))` |
| `--mp-tag-pinkpurple-bg` | `rgb(var(--mp-pinkpurple-1))` |
| `--mp-tag-pinkpurple-bg-hover` | `rgb(var(--mp-pinkpurple-2))` |
| `--mp-tag-pinkpurple-border-color` | `transparent` |
| `--mp-tag-pinkpurple-border-color-hover` | `transparent` |
| `--mp-tag-pinkpurple-icon-color` | `rgb(var(--mp-pinkpurple-9))` |
| `--mp-tag-pinkpurple-text-color` | `rgb(var(--mp-pinkpurple-9))` |
| `--mp-tag-magenta-bg` | `rgb(var(--mp-magenta-1))` |
| `--mp-tag-magenta-bg-hover` | `rgb(var(--mp-magenta-2))` |
| `--mp-tag-magenta-border-color` | `transparent` |
| `--mp-tag-magenta-border-color-hover` | `transparent` |
| `--mp-tag-magenta-icon-color` | `rgb(var(--mp-magenta-9))` |
| `--mp-tag-magenta-text-color` | `rgb(var(--mp-magenta-9))` |
| `--mp-tag-gray-bg` | `rgb(var(--mp-gray-2))` |
| `--mp-tag-gray-bg-hover` | `rgb(var(--mp-gray-3))` |
| `--mp-tag-gray-border-color` | `transparent` |
| `--mp-tag-gray-border-color-hover` | `transparent` |
| `--mp-tag-gray-icon-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-gray-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tag-close-margin-left` | `var(--mp-sys-space-3)` |
| `--mp-tag-close-font-size` | `var(--mp-tag-size-md-font-size)` |

### 颜色覆盖边界

预设色 outline 保持透明；loading 不触发预设填充 hover。暗色背景消费 bg/bg-hover 变量，实例覆盖同样生效。预设 icon-color 与 text-color 分开。未选中预设保持中性，但自定义 color 属性仍生效。预设／自定义色不保证任意背景上的对比度。

### 动效变量

内置动效遵循 `prefers-reduced-motion: reduce`；减少动效不会阻止加载状态或关闭事件更新。

| Token | Default |
| --- | --- |
| `--mp-tag-fade-duration` | `var(--mp-sys-motion-duration-fast)` |
