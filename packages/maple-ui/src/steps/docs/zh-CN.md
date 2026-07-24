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
  <mp-button type="primary" block @click="next">下一步</mp-button>
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
        <mp-icon v-if="status === 'finish'" name="heart" />
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

通过 `direction` 属性改变步骤条的显示方向。

```html
<script setup>
import { ref } from 'vue'

const current = ref(1)
</script>

<template>
  <mp-steps direction="vertical" :current="current">
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
| `direction` | 显示方向，可选值为 `vertical` | _string_ | `horizontal` |
| `status` | 当前步骤状态 | _'wait' \| 'process' \| 'finish' \| 'error'_ | `process` |
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
| `change` | 步骤切换时触发（需开启 `changeable`） | `step: number, ev: Event` |
| `update:current` | `v-model:current` 同步 | `step: number` |

### 插槽

#### Steps Slots

| 名称 | 说明        | 参数 |
| ----- |-----------| -------- |
| `default` | steps 的内容 | `-` |

#### Step Slots

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `default` | 步骤标题（优先于 `title`） | `-` |
| `icon` | 自定义节点图标 | `{ step: number, status: string }` |
| `description` | 步骤描述 | `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--step-tag-size` | `20px` |
| `--step-tag-background` | `#9e9e9e` |
| `--step-tag-font-size` | `var(--font-size-md)` |
| `--step-tag-color` | `var(--color-on-primary)` |
| `--step-tag-active-color` | `var(--color-primary)` |
| `--step-tag-error-color` | `var(--color-danger)` |
| `--step-tag-margin` | `4px 0` |
| `--step-tag-icon-size` | `var(--font-size-lg)` |
| `--step-content-font-size` | `var(--font-size-md)` |
| `--step-content-color` | `rgba(0, 0, 0, 0.38)` |
| `--step-content-active-color` | `#000` |
| `--step-line-background` | `#000` |
| `--step-line-gap` | `8px` |
| `--step-vertical-tag-margin` | `0 4px` |
| `--step-vertical-min-height` | `50px` |
