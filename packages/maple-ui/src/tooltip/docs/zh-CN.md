# 提示

### 介绍

当元素点击或悬停时显示一个提示，通过控制弹出位置和偏移量改变提示的显示位置。

### 基本使用

```html
<template>
  <mp-tooltip content="Tooltip">
    <mp-button status="primary">基本使用</mp-button>
  </mp-tooltip>
</template>
```

### 内容插槽

```html
<template>
  <mp-tooltip>
    <mp-button status="primary">内容插槽</mp-button>
    
    <template #content>
      <m-icon-star-fill />
    </template>
  </mp-tooltip>
</template>
```

### 弹出位置

```html
<script setup>
import { ref } from 'vue'

const placement = ref('top')
const placementOptions = [
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
]
</script>

<template>
  <mp-select :hint="false" v-model="placement">
    <mp-option 
      v-for="(item, index) in placementOptions" 
      :key="index"
      :label="item" 
    />
  </mp-select>
  
  <div class="placement-container">
    <mp-tooltip content="Tooltip" :placement="placement">
      <mp-button status="primary">
        <m-icon-star-fill />
      </mp-button>
    </mp-tooltip>
  </div>
</template>

<style>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 主题色

```html
<template>
  <mp-space :size="[54, 10]">
    <mp-tooltip content="Tooltip">
      <mp-button>默认</mp-button>
    </mp-tooltip>
    <mp-tooltip type="primary" content="Tooltip">
      <mp-button status="primary">主要</mp-button>
    </mp-tooltip>
    <mp-tooltip type="info" content="Tooltip">
      <mp-button status="info">信息</mp-button>
    </mp-tooltip>
    <mp-tooltip type="success" content="Tooltip">
      <mp-button status="success">成功</mp-button>
    </mp-tooltip>
    <mp-tooltip type="warning" content="Tooltip">
      <mp-button status="warning">警告</mp-button>
    </mp-tooltip>
    <mp-tooltip type="danger" content="Tooltip">
      <mp-button status="danger">危险</mp-button>
    </mp-tooltip>
  </mp-space>
</template>
```

### 自定义颜色

```html
<template>
  <mp-tooltip content="Tooltip" color="#d81b60" text-color="#fff">
    <mp-button status="primary">自定义颜色</mp-button>
  </mp-tooltip>
</template>
```

### 偏移量

通过 `offset-x` 和 `offset-y` 设置 `Tooltip` 弹出的偏移量。

```html
<template>
  <mp-tooltip content="Tooltip" :offset-x="64" :offset-y="-10">
    <mp-button status="primary">偏移量</mp-button>
  </mp-tooltip>
</template>
```

### 触发方式

通过 `trigger` 改变 `Tooltip` 显示的触发方式，可选值为 `click` 和 `hover`。

```html
<template>
  <mp-tooltip content="Tooltip" trigger="hover">
    <mp-button status="primary">触发方式</mp-button>
  </mp-tooltip>
</template>
```

### 注册事件

```html
<script setup>
import { Message } from '@maplejs/maple-ui'
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
```

### 禁用提示

在 `disabled` 状态下，`Tooltip` 将不再被打开。 

```html
<template>
  <mp-tooltip content="Tooltip" disabled>
    <mp-button status="primary">禁用提示</mp-button>
  </mp-tooltip>
</template>
```

## API

### 属性

| 参数 | 说明 | 类型             | 默认值       |
| ------- | --- |----------------|-----------|
| `v-model:open` | 是否显示 | _boolean_       | `false`   |
| `content` | 显示的内容 | _string_    | `-`       |
| `color` | 背景颜色 | _string_       | `-`       |
| `text-color` ***3.5.0*** | 文字颜色 | _string_       | `-`       |
| `type`  | 类型，可选值为 `default` `primary` `info` `success` `warning` `danger` | _string_  | `default` |
| `placement` | 弹出位置 | _Placement_    | `bottom`     |
| `strategy`  | 定位方式，可选值为 `absolute` `fixed` | _string_    | `absolute`    |
| `offset-x` | x 轴偏移量， 相对于 `Tooltip` 对齐后的位置 | _number \| string_   | `0` |
| `offset-y` | y 轴偏移量， 相对于 `Tooltip` 对齐后的位置 | _number \| string_   | `0` |
| `popup-container` | 挂载的位置 | _TeleportProps['to'] \| false_ | `body`    |
| `same-width` | 是否与触发元素同宽 | _boolean_ | `false`  |
| `disabled` | 是否禁用 Tooltip | _boolean_      | `false`   |
| `trigger` | 触发方式，可选值为 `click` `hover` `manual` | _string_       | `hover`   |
| `reference`       | 菜单关联的触发元素，`string` 类型为菜单组件的子孙元素选择器，`HTMLElement` 类型为任意指定的元素节点 | _string \| HTMLElement_ | `-`           |
| `close-on-click-reference` | 是否在点击菜单触发元素后关闭菜单 | _boolean_ | `false` |
| `esc-to-close` | 是否支持键盘 ESC 关闭提示 | _boolean_ | `true`  |

### Placement

| 参数 | 说明 |
| ------- | ------ |
| `top` |顶部中心位置 |
| `top-start` | 顶部左侧位置 |
| `top-end` | 顶部右侧位置 |
| `bottom` | 底部中心位置 |
| `bottom-start` | 底部左侧位置 |
| `bottom-end` | 底部右侧位置 |
| `right` | 右侧中心位置 |
| `right-start` | 右侧上方位置 |
| `right-end` | 右侧下方位置 |
| `left` | 左侧中心位置 |
| `left-start` | 左侧上方位置 |
| `left-end` | 左侧下方位置 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `open` | 打开 `Tooltip` | `-` | `-` |
| `close` | 关闭 `Tooltip` | `-` | `-` |
| `resize` | `Tooltip` 默认插槽元素产生位置大小变化时可以调用此方法进行重绘 | `-` | `-` |
| `setReference` ***3.7.2*** | 设置 `Tooltip` 关联的触发元素 | `reference: 与组件属性的 reference 一致` | `-` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `open` | 打开 `Tooltip` 时触发 | `-` |
| `opened` | 打开 `Tooltip` 动画结束时触发 | `-` |
| `close` | 关闭 `Tooltip` 时触发 | `-` |
| `closed` | 关闭 `Tooltip` 动画结束时触发 | `-` |
| `click-outside` | 点击菜单外部时触发 | `event: Event` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | `Tooltip` 关联的触发元素 | `-` |
| `content` | `Tooltip` 内容 | `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--tooltip-opacity` | `0.9` |
| `--tooltip-border-radius` | `4px` |
| `--tooltip-font-size` | `14px` |
| `--tooltip-padding` | `8px 16px` |
| `--tooltip-offset` | `10px` |
| `--tooltip-default-color` | `#616161` |
| `--tooltip-primary-color` | `var(--color-primary)` |
| `--tooltip-info-color` | `var(--color-info)` |
| `--tooltip-success-color` | `var(--color-success)` |
| `--tooltip-warning-color` | `var(--color-warning)` |
| `--tooltip-danger-color` | `var(--color-danger)` |
| `--tooltip-default-text-color` | `#fff` |
| `--tooltip-primary-text-color` | `var(--color-white)` |
| `--tooltip-info-text-color` | `var(--color-white)` |
| `--tooltip-success-text-color` | `var(--color-white)` |
| `--tooltip-warning-text-color` | `var(--color-white)` |
| `--tooltip-danger-text-color` | `var(--color-white)` |
