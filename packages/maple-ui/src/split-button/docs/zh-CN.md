# SplitButton 分裂按钮

### 介绍

将主要操作按钮和关联操作菜单组合在一起。点击主按钮执行操作，点击右侧按钮展开菜单。

示例统一使用两端都支持的 `Message.info(...)`。默认选择后关闭；仅“浮层与连续选择”保留菜单，同时弹出 Message。outline / text 的箭头保持透明背景。

### 基础用法

主按钮执行发布，右侧按钮展开菜单；菜单项提供稳定的 value，并展示无权限的禁用项。

```html
<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: '发布成功',
  publish: '发布',
  saveNow: '保存草稿',
  saveAndPublish: '保存并发布',
  unavailable: '暂无权限',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-split-button status="primary" placement="bottom-end" @click="publish" @select="handleSelect">
    {{ t('publish') }}

    <template #content>
      <mp-menu-option :label="t('saveNow')" value="draft" />
      <mp-menu-option :label="t('saveAndPublish')" value="publish" />
      <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
    </template>
  </mp-split-button>
</template>
```

### 视觉变体

统一展示 default、outline、tonal、text 四种变体。

```html
<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: '发布成功',
  saveNow: '保存草稿',
  saveAndPublish: '保存并发布',
  unavailable: '暂无权限',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const variants = ['default', 'outline', 'tonal', 'text'] as const
</script>

<template>
  <mp-space wrap>
    <mp-split-button
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
      status="primary"
      @click="publish"
      @select="handleSelect"
    >
      {{ variant }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
```

### 五档尺寸

支持 xs、sm、md、lg、xl 五档尺寸，默认 md；窄屏自动换行。

```html
<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: '发布成功',
  saveNow: '保存草稿',
  saveAndPublish: '保存并发布',
  unavailable: '暂无权限',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space wrap align="center">
    <mp-split-button
      v-for="size in sizes"
      :key="size"
      :size="size"
      status="primary"
      @click="publish"
      @select="handleSelect"
    >
      {{ size }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
```

### 禁用状态

对比整体禁用、仅主按钮禁用、仅菜单按钮禁用。整体 disabled 优先，子按钮的 disabled: false 不能解除整体禁用。

```html
<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: '发布成功',
  allDisabled: '整体禁用',
  saveNow: '保存草稿',
  saveAndPublish: '保存并发布',
  unavailable: '暂无权限',
  mainDisabled: '仅禁用主按钮',
  triggerDisabled: '仅禁用菜单按钮',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space wrap>
    <mp-split-button
      disabled
      status="primary"
      :button-props="{ disabled: false }"
      :trigger-button-props="{ disabled: false }"
      @click="publish"
      @select="handleSelect"
    >
      {{ t('allDisabled') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button status="primary" :button-props="{ disabled: true }" @click="publish" @select="handleSelect">
      {{ t('mainDisabled') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button
      status="primary"
      :trigger-button-props="{ disabled: true }"
      @click="publish"
      @select="handleSelect"
    >
      {{ t('triggerDisabled') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
```

### 异步操作

@click 直接返回 Promise，auto-loading 等待完成并阻止重复点击；完成次数用于观察是否重复执行。

```html
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: '发布成功',
  publish: '发布',
  saveNow: '保存草稿',
  saveAndPublish: '保存并发布',
  unavailable: '暂无权限',
  completed: '完成次数',
} as const
const t = (key: keyof typeof messages) => messages[key]

const completed = ref(0)
const publish = async () => {
  await new Promise<void>((resolve) => setTimeout(resolve, 800))
  completed.value += 1
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button status="primary" auto-loading @click="publish" @select="handleSelect">
      {{ t('publish') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ t('completed') }}: {{ completed }}</span>
  </mp-space>
</template>
```

### 自定义图标

使用 icon 插槽中的 open 状态旋转箭头，两端使用相同图标。

```html
<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: '发布成功',
  publish: '发布',
  saveNow: '保存草稿',
  saveAndPublish: '保存并发布',
  unavailable: '暂无权限',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-split-button status="primary" @click="publish" @select="handleSelect">
    {{ t('publish') }}
    <template #icon="{ open }">
      <m-icon-menu-down :style="{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s' }" />
    </template>
    <template #content>
      <mp-menu-option :label="t('saveNow')" value="draft" />
      <mp-menu-option :label="t('saveAndPublish')" value="publish" />
      <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
    </template>
  </mp-split-button>
</template>
```

### 受控展开

外部控制按钮使用 `@click.stop`，避免同一次点击冒泡到 document 后又关闭菜单；正常点击外部仍会关闭。

使用 v-model:open 双向控制菜单；外部按钮、菜单触发器和选中关闭会同步更新状态。

```html
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: '发布成功',
  openMenu: '展开菜单',
  closeMenu: '关闭菜单',
  publish: '发布',
  saveNow: '保存草稿',
  saveAndPublish: '保存并发布',
  unavailable: '暂无权限',
  opened: '已展开',
  closed: '已关闭',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const open = ref(false)
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-space wrap>
      <mp-button @click.stop="open = true">{{ t('openMenu') }}</mp-button>
      <mp-button @click.stop="open = false">{{ t('closeMenu') }}</mp-button>
    </mp-space>
    <mp-split-button v-model:open="open" status="primary" @click="publish" @select="handleSelect">
      {{ t('publish') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ open ? t('opened') : t('closed') }}</span>
  </mp-space>
</template>
```

### 浮层与连续选择

演示 bottom-start、8px 纵向偏移和 160px 最大高度。hide-on-select=false 支持连续选择，页面显示最近选中的 value。

```html
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'
const messages = {
  choose: '选择操作',
  saveNow: '保存草稿',
  saveAndPublish: '保存并发布',
  unavailable: '暂无权限',
  lastAction: '最近操作',
  none: '暂无操作',
  popupHint: '选择后菜单保持展开，可连续选择；点击外部关闭。',
} as const
const t = (key: keyof typeof messages) => messages[key]

const lastAction = ref('')
const handleSelect = (value: unknown, option: { label?: unknown }) => {
  lastAction.value = String(value)
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button
      status="primary"
      placement="bottom-start"
      :offset-y="8"
      :popup-max-height="160"
      :hide-on-select="false"
      @click="lastAction = 'publish'"
      @select="handleSelect"
    >
      {{ t('choose') }}
      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ t('lastAction') }}: {{ lastAction || t('none') }}</span>
    <span>{{ t('popupHint') }}</span>
  </mp-space>
</template>
```

## API

### 属性

| 参数                   | 说明                                 | 类型                             | 默认值      |
| ---------------------- | ------------------------------------ | -------------------------------- | ----------- |
| `open`                 | 菜单是否打开，支持 `v-model:open`    | _boolean_                        | `undefined` |
| `default-open`         | 菜单默认是否打开                     | _boolean_                        | `false`     |
| `disabled`             | 是否禁用整个分裂按钮                 | _boolean_                        | `false`     |
| `status`               | 按钮组主题色                         | _SemanticStatus_                 | `default`   |
| `variant`              | 按钮组变体                           | _ButtonVariant_                  | `default`   |
| `size`                 | 按钮组尺寸                           | _ComponentSize_                  | `md`        |
| `color`                | 自定义背景色                         | _string_                         | `''`        |
| `text-color`           | 自定义文字色                         | _string_                         | `''`        |
| `elevation`            | 按钮组海拔阴影                       | _boolean \| number_              | `true`      |
| `button-props`         | 主按钮属性                           | `Partial<ButtonProps>`           | `undefined` |
| `trigger-button-props` | 菜单触发按钮属性                     | `Partial<ButtonProps>`           | `undefined` |
| `auto-loading`         | 主按钮异步点击时是否自动进入加载状态 | _boolean_                        | `false`     |
| `trigger`              | 菜单触发方式                         | _TriggerEvent \| TriggerEvent[]_ | `click`     |
| `placement`            | 菜单弹出位置                         | _PopoverPlacement_               | `bottom`    |
| `popup-container`      | 菜单挂载容器                         | _PopupContainer_                 | `body`      |
| `popup-max-height`     | 菜单最大高度                         | _boolean \| number_              | `true`      |
| `popup-class`          | 菜单浮层类名                         | _string \| array \| object_      | `undefined` |
| `offset-x`             | 菜单横向偏移                         | _string \| number_               | `0`         |
| `offset-y`             | 菜单纵向偏移                         | _string \| number_               | `0`         |
| `hide-on-select`       | 选择菜单项后是否关闭菜单             | _boolean_                        | `true`      |

### 事件

| 事件名        | 说明                       | 回调参数               |
| ------------- | -------------------------- | ---------------------- |
| `update:open` | 菜单打开状态请求更新时触发 | `open: boolean`        |
| `open-change` | 菜单打开状态变化时触发     | `open: boolean`        |
| `click`       | 点击主按钮时触发           | `event: Event`         |
| `select`      | 选择菜单项时触发           | `value, option, event` |

### 插槽

| 插槽名    | 说明             | 参数            |
| --------- | ---------------- | --------------- |
| `default` | 主按钮内容       | `-`             |
| `icon`    | 菜单触发按钮图标 | `open: boolean` |
| `content` | 菜单内容         | `-`             |

### 异步操作与点击语义

设置 `auto-loading`，让 `@click` 回调返回 Promise，即可自动加载。若同时设置 `button-props.onClick`，两组回调各执行一次，并等待所有返回的 Promise 完成；同步回调不产生加载态。

```html
<script setup>
const publish = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
}
</script>

<template>
  <mp-split-button auto-loading @click="publish">
    发布
    <template #content><mp-menu-option label="保存草稿" /></template>
  </mp-split-button>
</template>
```

`click` 沿用 Button 的 `onClick` 控制回调 Prop（支持 `@click`），不是同时 emit 的通知。主按钮正常冒泡，不打开菜单；整体 disabled 优先于两个按钮的 disabled 配置。

### 实例方法

| 方法     | 说明                       |
| -------- | -------------------------- |
| open()   | 请求展开菜单，禁用时不展开 |
| close()  | 请求关闭菜单               |
| resize() | 重新计算菜单位置           |

受控 open 只请求更新，需由调用方更新绑定值。offset-x / offset-y 表示屏幕 X/Y 轴，数字单位为 px，长度字符串按现有长度工具转换。

两端主体、Props、样式依赖入口和契约测试为独立同源副本；底层 Menu 保留平台适配，不共享实例。
