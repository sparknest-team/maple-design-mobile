<!-- Source: src/popover/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/popover -->

# Popover 气泡卡片

点击触发元素后展示结构化内容。Popover 可以包含按钮、表单和其他交互元素；纯文字说明使用 Tooltip。

## 案例

### 基本使用

Example source: src/popover/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-popover title="设备状态">
    <mp-button status="primary">基本使用</mp-button>
    <template #content>
      <p>设备：生产线 A-03</p>
      <p>状态：运行中</p>
    </template>
  </mp-popover>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 交互内容与状态保留

Example source: src/popover/example/demos/interactive.vue

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
const draft = ref('')
</script>

<template>
  <mp-popover v-model:open="open" title="快速备注">
    <mp-button status="primary">编辑备注</mp-button>
    <template #content>
      <mp-space direction="column">
        <mp-input v-model="draft" placeholder="关闭后再次打开，草稿仍会保留" />
        <mp-button status="primary" block @click="open = false">完成</mp-button>
      </mp-space>
    </template>
  </mp-popover>
</template>
```

### 位置、偏移与同宽

Example source: src/popover/example/demos/placement.vue

```vue
<script setup>
import { ref } from 'vue'

const placementValue = ref('bottom-start')
const placementOptions = ref([
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
])
</script>

<template>
  <mp-select v-model="placementValue" :hint="false">
    <mp-option v-for="(item, index) in placementOptions" :key="index" :label="item" />
  </mp-select>
  <div class="placement-container">
    <mp-popover :placement="placementValue">
      <mp-button status="primary">
        <m-icon-star-fill />
      </mp-button>
      <template #content>
        <mp-cell>选项</mp-cell>
        <mp-cell>选项</mp-cell>
        <mp-cell>选项</mp-cell>
      </template>
    </mp-popover>
  </div>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

Example source: src/popover/example/demos/offset.vue

```vue
<script setup></script>

<template>
  <mp-popover :popup-translate="[36, 18]">
    <mp-button status="primary">偏移量</mp-button>
    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

Example source: src/popover/example/demos/auto-fit-popup-width.vue

```vue
<script setup></script>

<template>
  <mp-popover auto-fit-popup-width>
    <mp-button status="primary">与触发元素同宽</mp-button>

    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 触发方式、受控状态与事件

Example source: src/popover/example/demos/trigger.vue

```vue
<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-select v-model="trigger" :hint="false">
    <mp-option label="click" />
    <mp-option label="hover" />
    <mp-option label="contextMenu" />
  </mp-select>
  <mp-popover style="margin-top: 15px" :trigger="trigger">
    <mp-button status="primary">触发方式</mp-button>

    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

Example source: src/popover/example/demos/two-way-binding.vue

```vue
<script setup>
import { ref } from 'vue'

const show = ref(false)
function closeMenu() {
  show.value = false
}
</script>

<template>
  <mp-popover v-model:open="show">
    <mp-button status="primary">双向绑定</mp-button>

    <template #content>
      <mp-cell @click="closeMenu">选项</mp-cell>
      <mp-cell @click="closeMenu">选项</mp-cell>
      <mp-cell @click="closeMenu">选项</mp-cell>
    </template>
  </mp-popover>

  <div style="margin-bottom: 100px"></div>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

Example source: src/popover/example/demos/events.vue

```vue
<script setup>
import { Message } from '@maple-design/ui'
</script>

<template>
  <mp-popover
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <mp-button status="primary">注册事件</mp-button>

    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

Example source: src/popover/example/demos/disabled.vue

```vue
<script setup></script>

<template>
  <mp-popover disabled>
    <mp-button status="primary" disabled>禁用气泡卡片</mp-button>

    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

## API

Popover 继承 Trigger 的定位、容器、受控状态、关闭策略和公开方法。

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:open | 受控打开状态 | `boolean` | — |
| default-open | 非受控初始状态 | `boolean` | `false` |
| title | 标题 | `string` | — |
| content | 正文 | `string` | — |
| trigger | 触发方式 | `TriggerEvent \| TriggerEvent[]` | `click` |
| placement | 首选方位 | `TriggerPlacement` | `bottom` |
| show-arrow | 是否显示箭头 | `boolean` | `true` |
| popup-offset | 沿方位主轴的距离 | `number` | `10` |
| popup-translate | 屏幕轴附加平移 | `[number, number] \| Record` | — |
| popup-container | 挂载容器；false 原地渲染 | `string \| HTMLElement \| false` | `body` |
| reference | 外部触发元素 | `string \| HTMLElement \| SVGElement` | — |
| disabled | 禁止打开 | `boolean` | `false` |
| unmount-on-close | 关闭后卸载；默认保留交互草稿 | `boolean` | `false` |
| close-on-click-reference | 再次点击触发元素时关闭 | `boolean` | `true` |

### 事件

| 事件名 | 说明 |
| --- | --- |
| update:open | 请求修改受控打开状态 |
| open-change | 请求修改打开状态 |
| open | 开始打开 |
| opened | 入场动画完成 |
| close | 开始关闭 |
| closed | 离场动画完成 |
| click-outside | 点击浮层外部 |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 触发元素 |
| title | 标题；未提供时使用 `title` 属性 |
| content | 正文；未提供时使用 `content` 属性 |

### 方法

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

触发元素通过 `aria-controls`、`aria-expanded` 与面板关联。无样式定位使用 Trigger；不提供 `defaultStyle`、`popoverClass` 或 `elevation`，自定义外观使用 Token、`content-class` 或 `content-style`。

## 公开 CSS 变量

以下为实际 :root 默认值。业务定制优先使用组件变量；内部定位变量不属于公开 API。

| 变量 | 默认值 | 意义与场景 |
| --- | --- | --- |
| `--mp-popover-background` | `var(--mp-sys-color-surface-overlay)` | 内容与箭头背景 |
| `--mp-popover-text-color` | `var(--mp-sys-color-content-secondary)` | 正文前景 |
| `--mp-popover-border-color` | `var(--mp-sys-color-border-default)` | 内容与箭头边框颜色 |
| `--mp-popover-border-width` | `1px` | 内容与箭头边框宽度 |
| `--mp-popover-border-radius` | `var(--mp-sys-radius-md)` | 内容圆角 |
| `--mp-popover-box-shadow` | `0 3px 3px -2px var(--mp-shadow-key-umbra-opacity), 0 3px 4px 0 var(--mp-shadow-key-penumbra-opacity), 0 1px 8px 0 var(--mp-shadow-key-ambient-opacity)` | 内容阴影，保留平台差异 |
| `--mp-popover-arrow-z-index` | `1` | 箭头在当前浮层内的堆叠层级 |
| `--mp-popover-padding-horizontal` | `var(--mp-sys-space-7)` | 内容横向内边距 |
| `--mp-popover-padding-vertical` | `var(--mp-sys-space-6)` | 内容纵向内边距 |
| `--mp-popover-font-size` | `var(--mp-sys-font-size-md)` | 内容字号 |
| `--mp-popover-line-height` | `var(--mp-line-height)` | 内容行高 |
| `--mp-popover-title-text-color` | `var(--mp-sys-color-content-primary)` | 标题前景 |
| `--mp-popover-title-font-size` | `var(--mp-sys-font-size-lg)` | 标题字号 |
| `--mp-popover-title-font-weight` | `var(--mp-sys-font-weight-medium)` | 标题字重 |
| `--mp-popover-title-content-gap` | `var(--mp-sys-space-2)` | 标题与正文间距 |
| `--mp-popover-animation-duration` | `var(--mp-sys-motion-duration-standard)` | 组件入退场时长；reduced-motion 可覆盖 |

Maple 暗色保留圆角 2px，阴影保留平台差异。内容与箭头共享背景／边框变量，不再受 Trigger 样式加载顺序影响。

使用 Teleport 时，变量需放在实际 popup 的作用域中（例如通过 `popup-style`）；触发按钮上的变量不会自动继承到浮层。
