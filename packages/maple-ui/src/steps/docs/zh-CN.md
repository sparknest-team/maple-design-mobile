# 步骤条

### 介绍

引导用户按照流程完成任务的导航条。进度由 `current` 控制，**从 1 起计**（与 Pagination / PC 端一致）。

### 基本使用

```html
<script setup>
import { ref } from 'vue'

const current = ref(1)

function next() {
  current.value = current.value >= 4 ? 1 : current.value + 1
}
</script>

<template>
  <mp-steps :current="current">
    <mp-step>步骤1</mp-step>
    <mp-step>步骤2</mp-step>
    <mp-step>步骤3</mp-step>
    <mp-step>步骤4</mp-step>
  </mp-steps>
  <mp-button status="primary" block @click="next">下一步</mp-button>
</template>
```

### 错误状态

通过 `status="error"` 展示当前步骤的错误态。

```html
<script setup>
import { ref } from 'vue'

const current = ref(2)
</script>

<template>
  <mp-steps :current="current" status="error">
    <mp-step>步骤1</mp-step>
    <mp-step>步骤2</mp-step>
    <mp-step>步骤3</mp-step>
  </mp-steps>
</template>
```

### 自定义图标

通过 `#icon` 插槽自定义节点图标。颜色通过 `--mp-step-*` CSS 变量 / StyleProvider 定制。

```html
<script setup>
import { ref } from 'vue'

const current = ref(2)
</script>

<template>
  <mp-steps :current="current">
    <mp-step>
      步骤1
      <template #icon="{ status }">
        <m-icon-heart-fill v-if="status === 'finish'" />
        <span v-else>1</span>
      </template>
    </mp-step>
    <mp-step>
      步骤2
      <template #icon="{ step }">{{ step }}</template>
    </mp-step>
    <mp-step>步骤3</mp-step>
  </mp-steps>
</template>
```

### 可切换

设置 `changeable` 开启点击切换步骤。

```html
<script setup>
import { ref } from 'vue'

const current = ref(1)
</script>

<template>
  <mp-steps v-model:current="current" changeable>
    <mp-step description="说明文案">步骤1</mp-step>
    <mp-step description="说明文案">步骤2</mp-step>
    <mp-step description="说明文案">步骤3</mp-step>
  </mp-steps>
</template>
```

### 垂直模式

通过 `orientation` 属性改变步骤条的显示方向。

```html
<script setup>
import { ref } from 'vue'

const current = ref(1)
</script>

<template>
  <mp-steps orientation="vertical" :current="current">
    <mp-step>步骤1</mp-step>
    <mp-step>步骤2</mp-step>
    <mp-step>步骤3</mp-step>
    <mp-step>步骤4</mp-step>
  </mp-steps>
</template>
```

## API

### 属性

#### Steps Props

| 参数 | 说明 | 类型 | 默认值 |
| ----- | -------------- | -------- | ---------- |
| `current` | 当前步骤（受控，从 1 起计） | _number_ | `-` |
| `default-current` | 默认当前步骤（非受控） | _number_ | `1` |
| `type` | 步骤条类型 | _'default' \| 'arrow' \| 'dot' \| 'navigation'_ | `default` |
| `orientation` | 显示方向 | _'horizontal' \| 'vertical'_ | `horizontal` |
| `content-placement` | 内容相对节点的位置 | _'right' \| 'bottom'_ | `right` |
| `status` | 当前步骤状态 | _'wait' \| 'process' \| 'finish' \| 'error'_ | `process` |
| `size` | 步骤条尺寸 | _'sm' \| 'md'_ | `md` |
| `show-line` | 是否显示连接线 | _boolean_ | `true` |
| `changeable` | 是否可点击切换步骤 | _boolean_ | `false` |

#### Step Props

| 参数 | 说明 | 类型 | 默认值 |
| ----- | -------------- | -------- | ---------- |
| `title` | 步骤标题 | _string_ | `-` |
| `description` | 步骤描述 | _string_ | `-` |
| `status` | 步骤状态（覆盖自动推导） | _'wait' \| 'process' \| 'finish' \| 'error'_ | `-` |
| `disabled` | 是否禁用 | _boolean_ | `false` |

### 事件

#### Steps Events

| 事件名 | 说明 | 回调参数 |
| ----- | -------------- | -------- |
| `change` | 步骤切换时触发（需开启 `changeable`） | `current: number, previous: number, ev: Event` |
| `update:current` | `v-model:current` 同步 | `step: number` |

### 插槽

#### Steps Slots

| 名称 | 说明        | 参数 |
| ----- |-----------| -------- |
| `default` | steps 的内容 | `-` |
| `finish-icon` | 完成状态图标 | `-` |
| `error-icon` | 错误状态图标 | `-` |

#### Step Slots

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `default` | 步骤标题（优先于 `title`） | `index`、`status`、`active`、`disabled` |
| `title` | 步骤标题 | `index`、`status`、`active`、`disabled` |
| `node` | 完整节点 | `index`、`status`、`active`、`disabled` |
| `icon` | 自定义节点图标 | `index`、`status`、`active`、`disabled` |
| `description` | 步骤描述 | `index`、`status`、`active`、`disabled` |

### 样式变量

以下变量均可通过 StyleProvider 或 CSS 覆盖。

| Variable | Default |
| --- | --- |
| `--mp-steps-size-md` | `28px` |
| `--mp-steps-size-sm` | `24px` |
| `--mp-steps-size-md-arrow` | `72px` |
| `--mp-steps-size-sm-arrow` | `40px` |
| `--mp-steps-size-md-icon-font-size` | `16px` |
| `--mp-steps-size-md-title-font-size` | `var(~'--mp-font-size-lg')` |
| `--mp-steps-size-md-description-font-size` | `var(~'--mp-font-size-sm')` |
| `--mp-steps-size-sm-icon-font-size` | `var(~'--mp-font-size-body-3')` |
| `--mp-steps-size-sm-title-font-size` | `var(~'--mp-font-size-body-3')` |
| `--mp-steps-size-sm-description-font-size` | `var(~'--mp-font-size-sm')` |
| `--mp-steps-label-vertical-content-width` | `100%` |
| `--mp-steps-direction-horizontal-description-width` | `140px` |
| `--mp-steps-circle-item-tail-size` | `1px` |
| `--mp-steps-circle-item-icon-gap` | `12px` |
| `--mp-steps-circle-item-title-font-weight-active` | `500` |
| `--mp-steps-circle-item-icon-border-radius` | `50%` |
| `--mp-steps-circle-horizontal-item-description-margin-top` | `2px` |
| `--mp-steps-circle-vertical-item-description-margin-top` | `2px` |
| `--mp-steps-circle-item-bg-wait` | `var(~'--mp-color-fill-2')` |
| `--mp-steps-circle-item-border-color-wait` | `transparent` |
| `--mp-steps-circle-item-icon-text-color-wait` | `var(~'--mp-color-text-2')` |
| `--mp-steps-circle-item-tail-color-wait` | `var(~'--mp-color-border-2')` |
| `--mp-steps-circle-item-title-color-wait` | `var(~'--mp-color-text-2')` |
| `--mp-steps-circle-item-description-color-wait` | `var(~'--mp-color-text-3')` |
| `--mp-steps-circle-item-bg-process` | `rgb(var(~'--mp-primary-6'))` |
| `--mp-steps-circle-item-border-color-process` | `transparent` |
| `--mp-steps-circle-item-icon-text-color-process` | `var(~'--mp-color-white')` |
| `--mp-steps-circle-item-tail-color-process` | `rgb(var(~'--mp-primary-6'))` |
| `--mp-steps-circle-item-title-color-process` | `var(~'--mp-color-text-1')` |
| `--mp-steps-circle-item-description-color-process` | `var(~'--mp-color-text-3')` |
| `--mp-steps-circle-item-bg-finish` | `var(~'--mp-color-primary-light-1')` |
| `--mp-steps-circle-item-border-color-finish` | `transparent` |
| `--mp-steps-circle-item-icon-text-color-finish` | `rgb(var(~'--mp-primary-6'))` |
| `--mp-steps-circle-item-title-color-finish` | `var(~'--mp-color-text-1')` |
| `--mp-steps-circle-item-description-color-finish` | `var(~'--mp-color-text-3')` |
| `--mp-steps-circle-item-bg-error` | `rgb(var(~'--mp-danger-6'))` |
| `--mp-steps-circle-item-border-color-error` | `transparent` |
| `--mp-steps-circle-item-icon-text-color-error` | `var(~'--mp-color-white')` |
| `--mp-steps-circle-item-tail-color-error` | `rgb(var(~'--mp-danger-6'))` |
| `--mp-steps-circle-item-title-color-error` | `var(~'--mp-color-text-1')` |
| `--mp-steps-circle-item-description-color-error` | `var(~'--mp-color-text-3')` |
| `--mp-steps-size-md-item-icon-margin-left` | `calc((var(~'--mp-steps-label-vertical-content-width') - var(~'--mp-steps-size-md')) / 2)` |
| `--mp-steps-size-sm-item-icon-margin-left` | `calc((var(~'--mp-steps-label-vertical-content-width') - var(~'--mp-steps-size-sm')) / 2)` |
| `--mp-steps-dot-horizontal-item-title-margin-top` | `4px` |
| `--mp-steps-dot-horizontal-item-description-margin-top` | `4px` |
| `--mp-steps-dot-vertical-item-title-margin-top` | `calc(-1 * 2px)` |
| `--mp-steps-dot-vertical-item-description-margin-top` | `4px` |
| `--mp-steps-dot-item-icon-size` | `8px` |
| `--mp-steps-dot-item-icon-size-active` | `10px` |
| `--mp-steps-dot-item-icon-gap` | `4px` |
| `--mp-steps-dot-item-tail-size` | `1px` |
| `--mp-steps-dot-vertical-item-icon-margin-right` | `16px` |
| `--mp-steps-dot-item-title-font-weight-active` | `500` |
| `--mp-steps-dot-item-icon-border-radius` | `50%` |
| `--mp-steps-dot-item-bg-wait` | `var(~'--mp-color-fill-4')` |
| `--mp-steps-dot-item-border-color-wait` | `var(~'--mp-color-fill-4')` |
| `--mp-steps-dot-item-tail-color-wait` | `var(~'--mp-color-border-2')` |
| `--mp-steps-dot-item-title-color-wait` | `var(~'--mp-color-text-2')` |
| `--mp-steps-dot-item-description-color-wait` | `var(~'--mp-color-text-3')` |
| `--mp-steps-dot-item-bg-process` | `rgb(var(~'--mp-primary-6'))` |
| `--mp-steps-dot-item-border-color-process` | `rgb(var(~'--mp-primary-6'))` |
| `--mp-steps-dot-item-tail-color-process` | `rgb(var(~'--mp-primary-6'))` |
| `--mp-steps-dot-item-title-color-process` | `var(~'--mp-color-text-1')` |
| `--mp-steps-dot-item-description-color-process` | `var(~'--mp-color-text-3')` |
| `--mp-steps-dot-item-bg-finish` | `rgb(var(~'--mp-primary-6'))` |
| `--mp-steps-dot-item-border-color-finish` | `rgb(var(~'--mp-primary-6'))` |
| `--mp-steps-dot-item-title-color-finish` | `var(~'--mp-color-text-1')` |
| `--mp-steps-dot-item-description-color-finish` | `var(~'--mp-color-text-3')` |
| `--mp-steps-dot-item-bg-error` | `rgb(var(~'--mp-danger-6'))` |
| `--mp-steps-dot-item-border-color-error` | `rgb(var(~'--mp-danger-6'))` |
| `--mp-steps-dot-item-tail-color-error` | `rgb(var(~'--mp-danger-6'))` |
| `--mp-steps-dot-item-title-color-error` | `var(~'--mp-color-text-1')` |
| `--mp-steps-dot-item-description-color-error` | `var(~'--mp-color-text-3')` |
| `--mp-steps-dot-item-icon-margin-left` | `calc((var(~'--mp-steps-label-vertical-content-width') - var(~'--mp-steps-dot-item-icon-size')) / 2)` |
| `--mp-steps-dot-vertical-item-dot-margin-top` | `8px` |
| `--mp-steps-dot-vertical-item-dot-margin-top-active` | `calc(var(~'--mp-steps-dot-vertical-item-dot-margin-top') - (var(~'--mp-steps-dot-item-icon-size-active') - var(~'--mp-steps-dot-item-icon-size')))` |
| `--mp-steps-dot-vertical-spacing-tail-top` | `4px` |
| `--mp-steps-dot-vertical-spacing-tail-bottom` | `4px` |
| `--mp-steps-arrow-item-gap` | `4px` |
| `--mp-steps-arrow-size-md-title-padding-left` | `16px` |
| `--mp-steps-arrow-size-sm-title-padding-left` | `20px` |
| `--mp-steps-arrow-item-description-margin-top` | `0` |
| `--mp-steps-arrow-item-title-font-weight-active` | `500` |
| `--mp-steps-arrow-item-bg-wait` | `var(~'--mp-color-fill-1')` |
| `--mp-steps-arrow-item-title-color-wait` | `var(~'--mp-color-text-2')` |
| `--mp-steps-arrow-item-description-color-wait` | `var(~'--mp-color-text-3')` |
| `--mp-steps-arrow-item-bg-process` | `rgb(var(~'--mp-primary-6'))` |
| `--mp-steps-arrow-item-title-color-process` | `var(~'--mp-color-white')` |
| `--mp-steps-arrow-item-description-color-process` | `var(~'--mp-color-white')` |
| `--mp-steps-arrow-item-bg-finish` | `var(~'--mp-color-primary-light-1')` |
| `--mp-steps-arrow-item-title-color-finish` | `var(~'--mp-color-text-1')` |
| `--mp-steps-arrow-item-description-color-finish` | `var(~'--mp-color-text-3')` |
| `--mp-steps-arrow-item-bg-error` | `rgb(var(~'--mp-danger-6'))` |
| `--mp-steps-arrow-item-title-color-error` | `var(~'--mp-color-white')` |
| `--mp-steps-arrow-item-description-color-error` | `var(~'--mp-color-white')` |
| `--mp-steps-navigation-arrow-color` | `var(~'--mp-color-text-4')` |
| `--mp-steps-navigation-arrow-size` | `6px` |
| `--mp-steps-navigation-arrow-line-width` | `2px` |
| `--mp-steps-navigation-arrow-top` | `10px` |
| `--mp-steps-circle-vertical-spacing-tail-top` | `6px` |
| `--mp-steps-circle-vertical-spacing-tail-bottom` | `6px` |
| `--mp-steps-navigation-padding-left` | `20px` |
| `--mp-steps-navigation-margin-right` | `32px` |
| `--mp-steps-navigation-arrow-spacing-right` | `10px` |
| `--mp-steps-navigation-ink-spacing-left` | `0` |
| `--mp-steps-navigation-ink-spacing-right` | `30px` |
| `--mp-steps-navigation-ink-bg` | `rgb(var(~'--mp-primary-6'))` |
| `--mp-steps-changeable-hover-text-color` | `rgb(var(~'--mp-primary-6'))` |
| `--mp-steps-node-font-weight` | `500` |
| `--mp-steps-transition-duration-1` | `0.1s` |
| `--mp-steps-transition-timing-function-linear` | `cubic-bezier(0, 0, 1, 1)` |
| `--mp-steps-vertical-item-min-height` | `90px` |
| `--mp-steps-circle-tail-hack-width` | `5000px` |
| `--mp-steps-circle-vertical-tail-padding-extra` | `6px` |
| `--mp-steps-dot-vertical-tail-padding-top-extra` | `4px` |
| `--mp-steps-dot-vertical-tail-padding-bottom` | `2px` |
| `--mp-steps-navigation-content-margin-bottom` | `20px` |
| `--mp-steps-navigation-description-padding-right` | `20px` |
| `--mp-steps-navigation-ink-height` | `2px` |
| `--mp-steps-navigation-arrow-right` | `30px` |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

Steps 和 Step 的主体、Props、上下文协议与样式同源复制；注入 Symbol 分别定义在各库，不跨库共享。保留四种 type 和原有状态/事件契约。
