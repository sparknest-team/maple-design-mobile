<!-- Source: src/tooltip/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/tooltip -->

# Tooltip 文字气泡

用于补充说明按钮、图标或被截断的文字。默认同时响应鼠标悬停和键盘聚焦；需要承载可操作内容时使用 Popover。

## 案例

### 基本使用

Example source: src/tooltip/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip">
    <mp-button status="primary">基本使用</mp-button>
  </mp-tooltip>
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

### 尺寸

只实现 `md` 和 `xs` 两档，默认 `md`。

Example source: src/tooltip/example/demos/size.vue

```vue
<template>
  <mp-space wrap>
    <mp-tooltip content="Compact tooltip" size="xs">
      <mp-button size="sm">xs</mp-button>
    </mp-tooltip>
    <mp-tooltip content="Default tooltip" size="md">
      <mp-button size="sm">md</mp-button>
    </mp-tooltip>
  </mp-space>
</template>
```

### 内容、主题与颜色

Example source: src/tooltip/example/demos/content-slot.vue

```vue
<script setup></script>

<template>
  <mp-tooltip>
    <mp-button status="primary">内容插槽</mp-button>

    <template #content>
      <m-icon-star-fill />
    </template>
  </mp-tooltip>
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

Example source: src/tooltip/example/demos/theme-color-tooltip.vue

```vue
<script setup></script>

<template>
  <mp-space wrap :size="['14vmin', '2.666vmin']">
    <mp-tooltip content="Tooltip">
      <mp-button>默认</mp-button>
    </mp-tooltip>
    <mp-tooltip status="primary" content="Tooltip">
      <mp-button status="primary">主要</mp-button>
    </mp-tooltip>
    <mp-tooltip status="info" content="Tooltip">
      <mp-button status="info">信息</mp-button>
    </mp-tooltip>
    <mp-tooltip status="success" content="Tooltip">
      <mp-button status="success">成功</mp-button>
    </mp-tooltip>
    <mp-tooltip status="warning" content="Tooltip">
      <mp-button status="warning">警告</mp-button>
    </mp-tooltip>
    <mp-tooltip status="danger" content="Tooltip">
      <mp-button status="danger">危险</mp-button>
    </mp-tooltip>
  </mp-space>
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

Example source: src/tooltip/example/demos/custom-color.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip" color="#d81b60" text-color="#fff">
    <mp-button status="primary">自定义颜色</mp-button>
  </mp-tooltip>
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

### 位置、偏移与触发

Example source: src/tooltip/example/demos/placement.vue

```vue
<script setup>
import { ref } from 'vue'

const placementValue = ref('top')
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
    <mp-tooltip content="Tooltip" :placement="placementValue">
      <mp-button status="primary">
        <m-icon-star-fill />
      </mp-button>
    </mp-tooltip>
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

Example source: src/tooltip/example/demos/offset.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip" :popup-translate="[64, -10]">
    <mp-button status="primary">偏移量</mp-button>
  </mp-tooltip>
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

Example source: src/tooltip/example/demos/trigger.vue

```vue
<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-select v-model="trigger" :hint="false">
    <mp-option label="click" />
    <mp-option label="hover" />
  </mp-select>
  <mp-tooltip content="Tooltip" style="margin-top: 15px" :trigger="trigger">
    <mp-button status="primary">触发方式</mp-button>
  </mp-tooltip>
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

### 事件与禁用

Example source: src/tooltip/example/demos/events.vue

```vue
<script setup>
import { Message } from '@maple-design/ui'
</script>

<template>
  <mp-tooltip
    content="Tooltip"
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <mp-button status="primary">注册事件</mp-button>
  </mp-tooltip>
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

Example source: src/tooltip/example/demos/disabled.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip" disabled>
    <mp-button status="primary">禁用提示</mp-button>
  </mp-tooltip>

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

### 外观组合

适用于悬浮时的补充说明。调整状态、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/tooltip/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ status: 'default', size: 'md' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>status</span
        ><mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'primary', value: 'primary' },
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
            { label: 'md', value: 'md' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-tooltip content="Tooltip" v-bind="__demoAppearance">
      <mp-button>默认</mp-button>
    </mp-tooltip>
  </mp-space>
</template>
<style scoped lang="less">
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

## API

Tooltip 继承 Trigger 的定位、容器、受控状态、关闭策略和公开方法。

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:open | 受控打开状态 | `boolean` | — |
| default-open | 非受控初始状态 | `boolean` | `false` |
| content | 提示内容 | `string` | — |
| status | 面板主题 | `default \| primary \| info \| success \| warning \| danger` | `default` |
| size | 尺寸；只实现两档 | `xs \| md` | `md` |
| color | 自定义背景色 | `string` | — |
| text-color | 自定义文字色 | `string` | — |
| trigger | 触发方式 | `TriggerEvent \| TriggerEvent[]` | `['hover', 'focus']` |
| placement | 首选方位 | `TriggerPlacement` | `top` |
| show-arrow | 是否显示箭头 | `boolean` | `true` |
| popup-offset | 沿方位主轴的距离 | `number` | `10` |
| popup-translate | 屏幕轴附加平移 | `[number, number] \| Record` | — |
| popup-container | 挂载容器；false 原地渲染 | `string \| HTMLElement \| false` | `body` |
| reference | 外部触发元素 | `string \| HTMLElement \| SVGElement` | — |
| disabled | 禁止打开 | `boolean` | `false` |
| unmount-on-close | 关闭后卸载内容 | `boolean` | `true` |

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
| content | 提示内容；未提供时使用 `content` 属性 |

### 方法

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

内容具有 `role="tooltip"`，打开时通过 `aria-describedby` 与实际触发元素关联。两端独立保存同一份实现，不提供 `backgroundColor` 或布尔 `xs` 兼容入口。

## 公开 CSS 变量

以下为实际 :root 默认值。业务定制优先使用组件变量；内部定位变量不属于公开 API。

| 变量 | 默认值 | 意义与场景 |
| --- | --- | --- |
| `--mp-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` | 内容与箭头背景 |
| `--mp-tooltip-text-color` | `var(--mp-sys-color-content-on-dark)` | 正文前景 |
| `--mp-tooltip-status-primary-background` | `var(--mp-sys-color-action-primary)` | primary 状态内容与箭头背景 |
| `--mp-tooltip-status-info-background` | `var(--mp-sys-color-status-info)` | info 状态内容与箭头背景 |
| `--mp-tooltip-status-success-background` | `var(--mp-sys-color-status-success)` | success 状态内容与箭头背景 |
| `--mp-tooltip-status-warning-background` | `var(--mp-sys-color-status-warning)` | warning 状态内容与箭头背景 |
| `--mp-tooltip-status-danger-background` | `var(--mp-sys-color-status-danger)` | danger 状态内容与箭头背景 |
| `--mp-tooltip-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` | primary 状态文字；与对应底色成对设置 |
| `--mp-tooltip-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` | info 状态文字；与对应底色成对设置 |
| `--mp-tooltip-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` | success 状态文字；与对应底色成对设置 |
| `--mp-tooltip-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` | warning 状态文字；与对应底色成对设置 |
| `--mp-tooltip-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` | danger 状态文字；与对应底色成对设置 |
| `--mp-tooltip-padding-horizontal` | `var(--mp-sys-space-6)` | 内容横向内边距 |
| `--mp-tooltip-padding-vertical` | `var(--mp-sys-space-4)` | 内容纵向内边距 |
| `--mp-tooltip-font-size` | `var(--mp-sys-font-size-md)` | 内容字号 |
| `--mp-tooltip-line-height` | `var(--mp-line-height)` | 内容行高 |
| `--mp-tooltip-border-radius` | `var(--mp-sys-radius-md)` | 内容圆角 |
| `--mp-tooltip-max-width` | `350px` | 提示内容最大宽度 |
| `--mp-tooltip-opacity` | `1` | 内容与箭头透明度；改动需重新检查对比度 |
| `--mp-tooltip-size-xs-padding-horizontal` | `var(--mp-sys-space-4)` | xs 尺寸：内容横向内边距 |
| `--mp-tooltip-size-xs-padding-vertical` | `var(--mp-sys-space-2)` | xs 尺寸：内容纵向内边距 |
| `--mp-tooltip-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | xs 尺寸：内容字号 |
| `--mp-tooltip-animation-duration` | `var(--mp-sys-motion-duration-standard)` | 组件入退场时长；reduced-motion 可覆盖 |

所有内置主题 opacity 为 1。彩色实心状态文字遵循 Button，统一使用 on-dark，明暗模式一致。Maple 暗色保留圆角 4px、字号 14px、纵向／横向内边距 8px／16px。中性表面在明暗模式均保持深色。`color` 同时设置内容与箭头背景，`text-color` 设置文字；显式 content-style／arrow-style 覆盖各自节点。自定义颜色／透明度需重新验证。

使用 Teleport 时，变量需放在实际 popup 的作用域中（例如通过 `popup-style`）；触发按钮上的变量不会自动继承到浮层。
