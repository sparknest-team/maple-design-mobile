<!-- Source: src/steps/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/steps -->

# 步骤条

## 案例

### 介绍

引导用户按照流程完成任务的导航条。进度由 `modelValue` 控制，**从 1 起计**（与 Pagination / PC 端一致）。

### 基本使用

Example source: src/steps/example/demos/basic-usage.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const statuses = ['wait', 'process', 'finish', 'error'] as const
type StepStatus = (typeof statuses)[number]
const basicStatus = ref<StepStatus>('process')
</script>

<template>
  <mp-radio-group v-model="basicStatus" presentation="inline" class="status-switch">
    <mp-radio v-for="status in statuses" :key="status" :value="status">{{ status }}</mp-radio>
  </mp-radio-group>
  <mp-steps :model-value="current" :status="basicStatus" content-placement="bottom">
    <mp-step>步骤1</mp-step>
    <mp-step>步骤2</mp-step>
    <mp-step>步骤3</mp-step>
    <mp-step>步骤4</mp-step>
  </mp-steps>
</template>

<style lang="less" scoped>
.status-switch {
  margin-bottom: 16px;
}
</style>
```

### 四种外观类型

`type` 当前有 `default`（编号）、`arrow`（箭头）、`dot`（圆点）、`navigation`（导航）四种外观；`status` 独立表示流程状态。箭头和导航类型仅支持水平方向。切换当前步骤或点击步骤，对比相同进度下的外观。现有 `type` 保持兼容。

Example source: src/steps/example/demos/types.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { StepsType } from '@maple-design/ui'

const current = ref(2)
const types: StepsType[] = ['default', 'arrow', 'dot', 'navigation']
</script>

<template>
  <section>
    <div>
      当前步骤 / Current step
      <mp-select
        v-model="current"
        presentation="inline"
        :clearable="false"
        :options="[
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
        ]"
        aria-label="Current step"
      />
    </div>
    <p>点击步骤或选择序号，对比同一进度的四种外观。Click a step to compare the same progress.</p>
    <section v-for="type in types" :key="type" :data-step-type="type">
      <p>
        <code>{{ type }}</code>
      </p>
      <mp-steps v-model="current" :type="type" changeable>
        <mp-step>提交</mp-step>
        <mp-step>审核</mp-step>
        <mp-step>完成</mp-step>
      </mp-steps>
    </section>
  </section>
</template>
```

### 错误状态

Example source: src/steps/example/demos/error-status.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const statuses = ['wait', 'process', 'finish', 'error'] as const
type StepStatus = (typeof statuses)[number]
const errorStatus = ref<StepStatus>('error')
</script>

<template>
  <mp-radio-group v-model="errorStatus" class="status-switch">
    <mp-radio v-for="status in statuses" :key="status" :value="status">{{ status }}</mp-radio>
  </mp-radio-group>
  <mp-steps :model-value="2" :status="errorStatus" content-placement="bottom">
    <mp-step>步骤1</mp-step>
    <mp-step>步骤2</mp-step>
    <mp-step>步骤3</mp-step>
  </mp-steps>
</template>

<style lang="less" scoped>
.status-switch {
  margin-bottom: 16px;
}
</style>
```

### 可切换

Example source: src/steps/example/demos/changeable.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const statuses = ['wait', 'process', 'finish', 'error'] as const
type StepStatus = (typeof statuses)[number]
const changeableStatus = ref<StepStatus>('process')
</script>

<template>
  <mp-radio-group v-model="changeableStatus" class="status-switch">
    <mp-radio v-for="status in statuses" :key="status" :value="status">{{ status }}</mp-radio>
  </mp-radio-group>
  <mp-steps v-model="current" :status="changeableStatus" content-placement="bottom" changeable>
    <mp-step description="这是描述信息">步骤1</mp-step>
    <mp-step description="这是描述信息">步骤2</mp-step>
    <mp-step description="这是描述信息">步骤3</mp-step>
    <mp-step description="这是描述信息">步骤4</mp-step>
  </mp-steps>
</template>

<style lang="less" scoped>
.status-switch {
  margin-bottom: 16px;
}
</style>
```

### 垂直模式

Example source: src/steps/example/demos/vertical.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const statuses = ['wait', 'process', 'finish', 'error'] as const
type StepStatus = (typeof statuses)[number]
const verticalStatus = ref<StepStatus>('process')
function next() {
  current.value = current.value >= 4 ? 1 : current.value + 1
}
</script>

<template>
  <mp-radio-group v-model="verticalStatus" class="status-switch">
    <mp-radio v-for="status in statuses" :key="status" :value="status">{{ status }}</mp-radio>
  </mp-radio-group>
  <mp-steps orientation="vertical" :model-value="current" :status="verticalStatus">
    <mp-step>步骤1</mp-step>
    <mp-step>步骤2</mp-step>
    <mp-step>步骤3</mp-step>
    <mp-step>步骤4</mp-step>
  </mp-steps>

  <mp-button status="primary" block @click="next">下一步</mp-button>
</template>

<style lang="less" scoped>
.status-switch {
  margin-bottom: 16px;
}
</style>
```

### 外观组合

适用于多步骤流程的当前状态。调整状态、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/steps/example/demos/appearance-lab.vue

```vue
<script setup lang="ts">
import { reactive as __demoReactive, ref } from 'vue'

const current = ref(1)
const __demoAppearance = __demoReactive({ status: 'wait', size: 'md' })
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
            { label: 'wait', value: 'wait' },
            { label: 'process', value: 'process' },
            { label: 'finish', value: 'finish' },
            { label: 'error', value: 'error' },
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
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-steps :model-value="2" content-placement="bottom" v-bind="__demoAppearance">
      <mp-step>步骤1</mp-step>
      <mp-step>步骤2</mp-step>
      <mp-step>步骤3</mp-step>
    </mp-steps>
  </mp-space>
</template>
<style scoped lang="less">
.status-switch {
  margin-bottom: 16px;
}
</style>
```

## API

主值使用普通 `v-model`：`modelValue` 表示当前步骤序号，从 1 开始。`defaultValue` 仅在创建时初始化非受控状态，之后修改不会重置当前值；初始化不触发 `update:modelValue`。提供 `modelValue` 时由父级控制，以受控值为准。

### 属性

#### Steps Props

| 参数                | 说明                        | 类型                                            | 默认值       |
| ------------------- | --------------------------- | ----------------------------------------------- | ------------ |
| `model-value`           | 当前步骤（受控，从 1 起计） | _number_                                        | `-`          |
| `default-value`   | 默认当前步骤（非受控）      | _number_                                        | `1`          |
| `type`              | 步骤条类型                  | _'default' \| 'arrow' \| 'dot' \| 'navigation'_ | `default`    |
| `orientation`       | 显示方向                    | _'horizontal' \| 'vertical'_                    | `horizontal` |
| `content-placement` | 内容相对节点的位置          | _'right' \| 'bottom'_                           | `right`      |
| `status`            | 当前步骤状态                | _'wait' \| 'process' \| 'finish' \| 'error'_    | `process`    |
| `size`              | 步骤条尺寸                  | _'sm' \| 'md'_                                  | `md`         |
| `show-line`         | 是否显示连接线              | _boolean_                                       | `true`       |
| `changeable`        | 是否可点击切换步骤          | _boolean_                                       | `false`      |

#### Step Props

| 参数          | 说明                     | 类型                                         | 默认值  |
| ------------- | ------------------------ | -------------------------------------------- | ------- |
| `title`       | 步骤标题                 | _string_                                     | `-`     |
| `description` | 步骤描述                 | _string_                                     | `-`     |
| `status`      | 步骤状态（覆盖自动推导） | _'wait' \| 'process' \| 'finish' \| 'error'_ | `-`     |
| `disabled`    | 是否禁用                 | _boolean_                                    | `false` |

### 事件

#### Steps Events

| 事件名           | 说明                                  | 回调参数                                       |
| ---------------- | ------------------------------------- | ---------------------------------------------- |
| `change`         | 步骤切换时触发（需开启 `changeable`） | `current: number, previous: number, ev: Event` |
| `update:modelValue` | `v-model` 同步                | `step: number`                                 |

### 插槽

#### Steps Slots

| 名称          | 说明         | 参数 |
| ------------- | ------------ | ---- |
| `default`     | steps 的内容 | `-`  |
| `finish-icon` | 完成状态图标 | `-`  |
| `error-icon`  | 错误状态图标 | `-`  |

#### Step Slots

| 名称          | 说明                       | 参数                                    |
| ------------- | -------------------------- | --------------------------------------- |
| `default`     | 步骤标题（优先于 `title`） | `index`、`status`、`active`、`disabled` |
| `title`       | 步骤标题                   | `index`、`status`、`active`、`disabled` |
| `node`        | 完整节点                   | `index`、`status`、`active`、`disabled` |
| `icon`        | 自定义节点图标             | `index`、`status`、`active`、`disabled` |
| `description` | 步骤描述                   | `index`、`status`、`active`、`disabled` |

### 样式变量

以下变量均可通过 StyleProvider 或 CSS 覆盖。

| Variable                                                   | Default                                                                                                                                              |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--mp-steps-size-md`                                       | `28px`                                                                                                                                               |
| `--mp-steps-size-sm`                                       | `24px`                                                                                                                                               |
| `--mp-steps-size-md-arrow`                                 | `72px`                                                                                                                                               |
| `--mp-steps-size-sm-arrow`                                 | `40px`                                                                                                                                               |
| `--mp-steps-size-md-icon-font-size`                        | `16px`                                                                                                                                               |
| `--mp-steps-size-md-title-font-size`                       | `var(~'--mp-font-size-lg')`                                                                                                                          |
| `--mp-steps-size-md-description-font-size`                 | `var(~'--mp-font-size-sm')`                                                                                                                          |
| `--mp-steps-size-sm-icon-font-size`                        | `var(--mp-sys-font-size-md)`                                                                                                                         |
| `--mp-steps-size-sm-title-font-size`                       | `var(--mp-sys-font-size-md)`                                                                                                                         |
| `--mp-steps-size-sm-description-font-size`                 | `var(~'--mp-font-size-sm')`                                                                                                                          |
| `--mp-steps-label-vertical-content-width`                  | `100%`                                                                                                                                               |
| `--mp-steps-direction-horizontal-description-width`        | `140px`                                                                                                                                              |
| `--mp-steps-circle-item-tail-size`                         | `1px`                                                                                                                                                |
| `--mp-steps-circle-item-icon-gap`                          | `12px`                                                                                                                                               |
| `--mp-steps-circle-item-title-font-weight-active`          | `500`                                                                                                                                                |
| `--mp-steps-circle-item-icon-border-radius`                | `50%`                                                                                                                                                |
| `--mp-steps-circle-horizontal-item-description-margin-top` | `2px`                                                                                                                                                |
| `--mp-steps-circle-vertical-item-description-margin-top`   | `2px`                                                                                                                                                |
| `--mp-steps-circle-item-bg-wait`                           | `var(--mp-sys-color-surface-muted)` |
| `--mp-steps-circle-item-border-color-wait`                 | `transparent` |
| `--mp-steps-circle-item-icon-text-color-wait`              | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-circle-item-tail-color-wait`                   | `var(--mp-sys-color-border-default)` |
| `--mp-steps-circle-item-title-color-wait`                  | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-circle-item-description-color-wait`            | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-circle-item-bg-process`                        | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-circle-item-border-color-process`              | `transparent` |
| `--mp-steps-circle-item-icon-text-color-process`           | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-circle-item-tail-color-process`                | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-circle-item-title-color-process`               | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-circle-item-description-color-process`         | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-circle-item-bg-finish`                         | `var(--mp-sys-color-state-selected)` |
| `--mp-steps-circle-item-border-color-finish`               | `transparent` |
| `--mp-steps-circle-item-icon-text-color-finish`            | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-circle-item-title-color-finish`                | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-circle-item-description-color-finish`          | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-circle-item-bg-error`                          | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-circle-item-border-color-error`                | `transparent` |
| `--mp-steps-circle-item-icon-text-color-error`             | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-circle-item-tail-color-error`                  | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-circle-item-title-color-error`                 | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-circle-item-description-color-error`           | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-size-md-item-icon-margin-left`                 | `calc((var(~'--mp-steps-label-vertical-content-width') - var(~'--mp-steps-size-md')) / 2)`                                                           |
| `--mp-steps-size-sm-item-icon-margin-left`                 | `calc((var(~'--mp-steps-label-vertical-content-width') - var(~'--mp-steps-size-sm')) / 2)`                                                           |
| `--mp-steps-dot-horizontal-item-title-margin-top`          | `4px`                                                                                                                                                |
| `--mp-steps-dot-horizontal-item-description-margin-top`    | `4px`                                                                                                                                                |
| `--mp-steps-dot-vertical-item-description-margin-top`      | `4px`                                                                                                                                                |
| `--mp-steps-dot-item-icon-size`                            | `8px`                                                                                                                                                |
| `--mp-steps-dot-item-icon-size-active`                     | `10px`                                                                                                                                               |
| `--mp-steps-dot-item-icon-gap`                             | `4px`                                                                                                                                                |
| `--mp-steps-dot-item-tail-size`                            | `1px`                                                                                                                                                |
| `--mp-steps-dot-vertical-item-icon-margin-right`           | `16px`                                                                                                                                               |
| `--mp-steps-dot-item-title-font-weight-active`             | `500`                                                                                                                                                |
| `--mp-steps-dot-item-icon-border-radius`                   | `50%`                                                                                                                                                |
| `--mp-steps-dot-item-bg-wait`                              | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-border-color-wait`                    | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-tail-color-wait`                      | `var(--mp-sys-color-border-default)` |
| `--mp-steps-dot-item-title-color-wait`                     | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-description-color-wait`               | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-bg-process`                           | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-dot-item-border-color-process`                 | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-dot-item-tail-color-process`                   | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-dot-item-title-color-process`                  | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-dot-item-description-color-process`            | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-bg-finish`                            | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-dot-item-border-color-finish`                  | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-dot-item-title-color-finish`                   | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-dot-item-description-color-finish`             | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-bg-error`                             | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-dot-item-border-color-error`                   | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-dot-item-tail-color-error`                     | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-dot-item-title-color-error`                    | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-dot-item-description-color-error`              | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-icon-margin-left`                     | `calc((var(~'--mp-steps-label-vertical-content-width') - var(~'--mp-steps-dot-item-icon-size')) / 2)`                                                |
| `--mp-steps-dot-vertical-item-dot-margin-top`              | `8px`                                                                                                                                                |
| `--mp-steps-dot-vertical-item-dot-margin-top-active`       | `calc(var(~'--mp-steps-dot-vertical-item-dot-margin-top') - (var(~'--mp-steps-dot-item-icon-size-active') - var(~'--mp-steps-dot-item-icon-size')))` |
| `--mp-steps-arrow-item-gap`                                | `4px`                                                                                                                                                |
| `--mp-steps-arrow-size-md-title-padding-left`              | `16px`                                                                                                                                               |
| `--mp-steps-arrow-size-sm-title-padding-left`              | `20px`                                                                                                                                               |
| `--mp-steps-arrow-item-description-margin-top`             | `0`                                                                                                                                                  |
| `--mp-steps-arrow-item-title-font-weight-active`           | `500`                                                                                                                                                |
| `--mp-steps-arrow-item-bg-wait`                            | `var(--mp-sys-color-surface-muted)` |
| `--mp-steps-arrow-item-title-color-wait`                   | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-arrow-item-description-color-wait`             | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-arrow-item-bg-process`                         | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-arrow-item-title-color-process`                | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-arrow-item-description-color-process`          | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-arrow-item-bg-finish`                          | `var(--mp-sys-color-state-selected)` |
| `--mp-steps-arrow-item-title-color-finish`                 | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-arrow-item-description-color-finish`           | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-arrow-item-bg-error`                           | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-arrow-item-title-color-error`                  | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-arrow-item-description-color-error`            | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-navigation-arrow-color`                        | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-navigation-arrow-size`                         | `6px`                                                                                                                                                |
| `--mp-steps-navigation-arrow-line-width`                   | `2px`                                                                                                                                                |
| `--mp-steps-navigation-arrow-top`                          | `10px`                                                                                                                                               |
| `--mp-steps-navigation-padding-left`                       | `20px`                                                                                                                                               |
| `--mp-steps-navigation-margin-right`                       | `32px`                                                                                                                                               |
| `--mp-steps-navigation-arrow-spacing-right`                | `10px`                                                                                                                                               |
| `--mp-steps-navigation-ink-spacing-left`                   | `0`                                                                                                                                                  |
| `--mp-steps-navigation-ink-spacing-right`                  | `30px`                                                                                                                                               |
| `--mp-steps-navigation-ink-bg`                             | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-changeable-hover-text-color`                   | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-node-font-weight`                              | `500`                                                                                                                                                |
| `--mp-steps-transition-duration-1`                         | `0.1s`                                                                                                                                               |
| `--mp-steps-transition-timing-function-linear`             | `cubic-bezier(0, 0, 1, 1)`                                                                                                                           |
| `--mp-steps-vertical-item-min-height`                      | `90px`                                                                                                                                               |
| `--mp-steps-circle-tail-hack-width`                        | `5000px`                                                                                                                                             |
| `--mp-steps-circle-vertical-tail-padding-extra`            | `6px`                                                                                                                                                |
| `--mp-steps-dot-vertical-tail-padding-top-extra`           | `4px`                                                                                                                                                |
| `--mp-steps-dot-vertical-tail-padding-bottom`              | `2px`                                                                                                                                                |
| `--mp-steps-navigation-content-margin-bottom`              | `20px`                                                                                                                                               |
| `--mp-steps-navigation-description-padding-right`          | `20px`                                                                                                                                               |
| `--mp-steps-navigation-ink-height`                         | `2px`                                                                                                                                                |
| `--mp-steps-navigation-arrow-right`                        | `30px`                                                                                                                                               |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

Steps 和 Step 的主体、Props、上下文协议与样式同源复制；注入 Symbol 分别定义在各库，不跨库共享。保留四种 type 和原有状态/事件契约。

`active` 只表示当前步骤序号（从 1 开始）是否对应 modelValue；与 status（wait/process/finish/error）分开。当前步骤即使为 error，active 仍为 true；焦点、悬停不会改变 active。
