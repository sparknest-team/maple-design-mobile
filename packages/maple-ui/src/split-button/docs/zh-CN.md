# SplitButton 分裂按钮

### 介绍

将主要操作按钮和关联操作菜单组合在一起。点击主按钮执行操作，点击右侧按钮展开菜单。

### 基础用法

```html
<script setup>
  import { Message } from '@maplejs/maple-ui'

  const publish = () => Message('发布')
  const handleSelect = (_value, option) => Message(String(option.label))
</script>

<template>
  <mp-split-button status="primary" placement="bottom-end" @click="publish" @select="handleSelect">
    发布
    <template #content>
      <mp-menu-option label="立即保存" />
      <mp-menu-option label="保存并发布" />
    </template>
  </mp-split-button>
</template>
```

### 禁用状态

```html
<template>
  <mp-split-button disabled status="primary">
    禁用状态
    <template #content>
      <mp-menu-option label="立即保存" />
      <mp-menu-option label="保存并发布" />
    </template>
  </mp-split-button>
</template>
```

### 自定义图标

`icon` 插槽提供 `{ open }`，可用于自定义菜单图标及打开状态。

```html
<template>
  <mp-split-button status="primary">
    发布
    <template #icon="{ open }">
      <m-icon-menu-down :style="{ transform: open ? 'rotate(180deg)' : undefined }" />
    </template>
    <template #content>
      <mp-menu-option label="立即保存" />
      <mp-menu-option label="保存并发布" />
    </template>
  </mp-split-button>
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
| `popup-class`          | 菜单浮层类名                         | _string_                         | `undefined` |
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
