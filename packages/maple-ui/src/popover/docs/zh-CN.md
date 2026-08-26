# 气泡卡片

### 介绍
点击元素时在附近弹出一个气泡卡片，通过控制弹出位置和偏移量改变气泡卡片的显示位置。

### 基本使用

```html
<template>
  <mp-popover>
    <mp-button type="primary">基本使用</mp-button>
    
    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>
```

### 弹出位置

```html
<script setup>
import { ref } from 'vue'

const placement = ref('cover-top-start')
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
  'cover-top',
  'cover-top-start',
  'cover-top-end',
  'cover-bottom',
  'cover-bottom-start',
  'cover-bottom-end',
  'cover-left',
  'cover-right',
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
    <mp-popover :placement="placement">
      <mp-button type="primary">
        <m-icon-star />
      </mp-button>
      <template #content>
        <mp-cell>选项</mp-cell>
        <mp-cell>选项</mp-cell>
        <mp-cell>选项</mp-cell>
      </template>
    </mp-popover>
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

### 偏移量

通过 `offset-x` 和 `offset-y` 设置 Popover 弹出的偏移量。

```html
<template>
  <mp-popover offset-x="36px" offset-y="18px">
    <mp-button type="primary">偏移量</mp-button>
    
    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>
```

### 与触发元素同宽

通过 `same-width` 使弹出的气泡卡片和触发元素的宽度相同。

```html
<template>
  <mp-popover same-width>
    <mp-button type="primary">与触发元素同宽</mp-button>
    
    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>
```

### 触发方式

通过 `trigger` 改变气泡卡片显示的触发方式，可选值为 `click`、`hover`、`manual`、`contextMenu`。

```html
<template>
  <mp-popover trigger="hover">
    <mp-button type="primary">触发方式</mp-button>
    
    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>
```

### 注册事件

```html
<script setup>
import { Message } from '@maplejs/maple-ui'
</script>

<template>
  <mp-popover
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <mp-button type="primary">注册事件</mp-button>
    
    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>
```

### 禁用

在 `disabled` 状态下，气泡卡片将不再被打开。 

```html
<template>
  <mp-popover disabled>
    <mp-button type="primary" disabled>禁用</mp-button>
    
    <template #content>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
      <mp-cell>选项</mp-cell>
    </template>
  </mp-popover>
</template>
```

### 双向绑定

通过 `v-model:open` 进行双向绑定控制气泡卡片的显示和隐藏。

```html
<script setup>
import { ref } from 'vue'

const show = ref(false)

function closeMenu() {
  show.value = false
}
</script>

<template>
  <mp-popover v-model:open="open">
    <mp-button type="primary">双向绑定</mp-button>
    
    <template #content>
      <mp-cell @click="closeMenu">选项</mp-cell>
      <mp-cell @click="closeMenu">选项</mp-cell>
      <mp-cell @click="closeMenu">选项</mp-cell>
    </template>
  </mp-popover>
</template>
```

### 注意

Popover 是一个 `inline-block` 元素，通过默认插槽点击时显示气泡卡片，如果希望 Popover 独占一行推荐包裹一个 `block` 元素。

## API

### 属性

| 参数              | 说明                                                          | 类型                    | 默认值               |
|-----------------|-------------------------------------------------------------|-----------------------|-------------------|
| `v-model:open`  | 是否显示气泡卡片                                                      | _boolean_              | `false`         |
| `placement`     | 气泡卡片弹出位置                                                      | _Placement_           | `cover-top-start` |
| `strategy`       | 气泡卡片定位方式，可选值为 `absolute` `fixed` | _string_              | `absolute`           |
| `offset-x`      | x 轴偏移量， 相对于气泡卡片对齐后的位置                                         | _number \| string_           | `0` |
| `offset-y`      | y 轴偏移量， 相对于气泡卡片对齐后的位置                                         | _number \| string_           | `0` |
| `popupContainer`      | 气泡卡片挂载的位置                                                     | _TeleportProps['to'] \| false_ | `body`            |
| `disabled`      | 是否禁用气泡卡片                                                      | _boolean_             | `false`           |
| `trigger`       | 气泡卡片触发方式，可选值为 `click` `hover` `manual` `contextMenu` | _string_              | `click`           |
| `reference`       | 气泡卡片关联的触发元素，`string` 类型为组件的子孙元素选择器， `HTMLElement` 类型为任意指定的元素节点 | _string \| HTMLElement_              | `-`           |
| `elevation` | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级 | _string \| number \| boolean_|   `true`    |
| `same-width`    | 是否与触发元素同宽                                                   | _boolean_             | `false`           |
| `default-style` | 是否启用默认样式                                                    | _boolean_             | `true`            |
| `popover-class` | 弹出层的 class                                                    | _string_             | `-`            |
| `close-on-click-reference` | 是否在点击触发元素后关闭气泡卡片 | _boolean_ | `false` |
| `esc-to-close` | 是否支持键盘 ESC 关闭气泡卡片 | _boolean_ | `true`  |
| `align-point` | 弹出层是否跟随鼠标（配合 `contextMenu`） | _boolean_ | `false` |

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
| `cover-top` | 顶部中心位置, 覆盖触发器 |
| `cover-top-start` | 顶部左侧位置, 覆盖触发器 |
| `cover-top-end` | 顶部右侧位置, 覆盖触发器 |
| `cover-bottom` | 底部中心位置, 覆盖触发器 |
| `cover-bottom-start` | 底部左侧位置, 覆盖触发器 |
| `cover-bottom-end` | 底部右侧位置, 覆盖触发器 |
| `cover-left` | 左侧位置, 覆盖触发器 |
| `cover-right` | 右侧位置, 覆盖触发器 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `open` | 打开气泡卡片 | `-` | `-` |
| `close` | 关闭气泡卡片 | `-` | `-` |
| `resize` | Popover 默认插槽元素产生位置大小变化时可以调用此方法进行重绘 | `-` | `-` |
| `setReference` ***3.7.2*** | 设置气泡卡片关联的触发元素 | `reference: 与组件属性的 reference 一致` | `-` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `open` | 打开气泡卡片时触发 | `-` |
| `opened` | 打开气泡卡片动画结束时触发 | `-` |
| `close` | 关闭气泡卡片时触发 | `-` |
| `closed` | 关闭气泡卡片动画结束时触发 | `-` |
| `click-outside` | 点击气泡卡片外部时触发 | `event: Event` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 气泡卡片关联的触发元素 | `-` |
| `content` | 气泡卡片内容 | `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--popover-background-color` | `var(--color-fill-2)` |
| `--popover-border-radius` | `2px` |
