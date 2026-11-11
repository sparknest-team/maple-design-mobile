<!-- Source: src/steps/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/steps -->

# 步骤条

### 介绍

引导用户按照流程完成任务的导航条。进度由 `modelValue` 控制，**从 1 起计**（与 Pagination / PC 端一致）。

## 基础示例

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
  <mp-radio-group v-model="basicStatus" edit-mode="direct" class="status-switch">
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

## 外观与状态

### 外观组合

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `model-value` | 当前步骤（受控，从 1 起计） | 外观组合 |
| `content-placement` | 正文相对步骤节点的方位，可选 right 或 bottom，默认 right；dot 类型按横纵轴推导，navigation 固定 right | 外观组合 |
| `type` | 步骤条类型 | 类型与状态对比 |
| `status` | 当前步骤状态 | 类型与状态对比 |
| `changeable` | 是否可点击切换步骤 | 类型与状态对比 |
<!-- demo-config-notes:end -->

适用于多步骤流程的当前状态。调整状态、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/steps/example/demos/appearance-lab.vue

```vue
<script setup lang="ts">
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef, ref } from 'vue'

const current = ref(1)
const __demoAppearance = __demoReactive({ status: 'wait', size: 'md' })
const demoCompareFields = [
  { name: 'status', values: ['wait', 'process', 'finish', 'error'] },
  { name: 'size', values: ['sm', 'md'] },
]
const demoCompareAxis = demoRef('status')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="status">
        <mp-radio-group
          v-model="__demoAppearance['status']"
          aria-label="status"
          :options="[
            { label: 'wait', value: 'wait' },
            { label: 'process', value: 'process' },
            { label: 'finish', value: 'finish' },
            { label: 'error', value: 'error' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-steps
          :model-value="2"
          content-placement="bottom"
          v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"
        >
          <mp-step>步骤1</mp-step>
          <mp-step>步骤2</mp-step>
          <mp-step>步骤3</mp-step>
        </mp-steps>
      </section>
    </div>
  </mp-space>
</template>
<style scoped lang="less">
.status-switch {
  margin-bottom: 16px;
}
</style>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
```

### 类型与状态对比

四种类型共享当前步骤和状态。先点击步骤或选择 1–3，再切换 wait、process、finish、error，观察 default、arrow、dot、navigation 同步更新；status 改变当前节点的语义状态，不改变步骤序号。标题与描述按页面语言显示，方便在手机宽度内对比。

<details>
<summary>配置说明与使用限制</summary>

#### 四种外观类型

`type` 当前有 `default`（编号）、`arrow`（箭头）、`dot`（圆点）、`navigation`（导航）四种外观；`status` 独立表示流程状态。箭头和导航类型仅支持水平方向。切换当前步骤或点击步骤，对比相同进度下的外观。现有 `type` 保持兼容。

#### 错误状态

</details>

Example source: src/steps/example/demos/types.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { StepsType } from '@maple-design/ui-vue'

const current = ref(2)
const statuses = ['wait', 'process', 'finish', 'error'] as const
const status = ref<(typeof statuses)[number]>('process')
const types: StepsType[] = ['default', 'arrow', 'dot', 'navigation']
</script>

<template>
  <section class="step-type-comparison">
    <mp-form-item layout="vertical" size="sm" label="Current step">
      <mp-radio-group
        v-model="current"
        aria-label="Current step"
        :options="[
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form-item layout="vertical" size="sm" label="Status"
      ><mp-radio-group
        v-model="status"
        aria-label="Step status"
        :options="statuses.map((value) => ({ label: value, value }))"
    /></mp-form-item>
    <p>点击步骤或选择序号，对比同一进度的四种外观。Click a step to compare the same progress.</p>
    <section v-for="type in types" :key="type" :data-step-type="type">
      <p>
        <code>{{ type }}</code>
      </p>
      <mp-steps v-model="current" :type="type" :status="status" changeable>
        <mp-step
          ><span lang="zh-CN">提交</span><span lang="en-US">Submit</span
          ><template #description
            ><span lang="zh-CN">提交信息</span><span lang="en-US">Details</span></template
          ></mp-step
        >
        <mp-step
          ><span lang="zh-CN">审核</span><span lang="en-US">Review</span
          ><template #description><span lang="zh-CN">审核信息</span><span lang="en-US">Review</span></template></mp-step
        >
        <mp-step
          ><span lang="zh-CN">完成</span><span lang="en-US">Done</span
          ><template #description
            ><span lang="zh-CN">完成信息</span><span lang="en-US">Complete</span></template
          ></mp-step
        >
      </mp-steps>
    </section>
  </section>
</template>

<style scoped>
html:not([lang='en-US']) .step-type-comparison [lang='en-US'],
html[lang='en-US'] .step-type-comparison [lang='zh-CN'] {
  display: none;
}
</style>
```

## 布局与排列

### 垂直模式

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `orientation` | 步骤流程的横纵轴向，默认 horizontal；arrow 和 navigation 类型固定横向 | 垂直模式 |
| `model-value` | 当前步骤（受控，从 1 起计） | 垂直模式 |
| `status` | 当前步骤状态 | 垂直模式 |
<!-- demo-config-notes:end -->

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

## 交互与控制

### 可切换

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `status` | 当前步骤状态 | 可切换 |
| `content-placement` | 正文相对步骤节点的方位，可选 right 或 bottom，默认 right；dot 类型按横纵轴推导，navigation 固定 right | 可切换 |
| `changeable` | 是否可点击切换步骤 | 可切换 |
<!-- demo-config-notes:end -->

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

## 触发与定位

### 弹层定位

content-placement 统一的是方位词汇和拼写，不要求所有组件开放相同集合。Steps 仅实现 right/bottom；dot 和 navigation 类型有各自推导规则，不为统一添加尚未实现的方位。

## API

主值使用普通 `v-model`：`modelValue` 表示当前步骤序号，从 1 开始。`defaultValue` 仅在创建时初始化非受控状态，之后修改不会重置当前值；初始化不触发 `update:modelValue`。提供 `modelValue` 时由父级控制，以受控值为准。

### Steps Props

| 参数                | 说明                        | 类型                                            | 默认值       |
| ------------------- | --------------------------- | ----------------------------------------------- | ------------ |
| `model-value`           | 当前步骤（受控，从 1 起计） | _number_                                        | `-`          |
| `default-value`   | 默认当前步骤（非受控）      | _number_                                        | `1`          |
| `type`              | 步骤条类型                  | _'default' \| 'arrow' \| 'dot' \| 'navigation'_ | `default`    |
| `orientation`       | 步骤流程的横纵轴向，默认 horizontal；arrow 和 navigation 类型固定横向 | _'horizontal' \| 'vertical'_                    | `horizontal` |
| `content-placement` | 正文相对步骤节点的方位，可选 right 或 bottom，默认 right；dot 类型按横纵轴推导，navigation 固定 right | _'right' \| 'bottom'_                           | `right`      |
| `status`            | 当前步骤状态                | _'wait' \| 'process' \| 'finish' \| 'error'_    | `process`    |
| `size`              | 步骤条尺寸                  | _'sm' \| 'md'_                                  | `md`         |
| `show-line`         | 是否显示连接线              | _boolean_                                       | `true`       |
| `changeable`        | 是否可点击切换步骤          | _boolean_                                       | `false`      |

### Step Props

| 参数          | 说明                     | 类型                                         | 默认值  |
| ------------- | ------------------------ | -------------------------------------------- | ------- |
| `title`       | 步骤标题                 | _string_                                     | `-`     |
| `description` | 步骤描述                 | _string_                                     | `-`     |
| `status`      | 步骤状态（覆盖自动推导） | _'wait' \| 'process' \| 'finish' \| 'error'_ | `-`     |
| `disabled`    | 是否禁用                 | _boolean_                                    | `false` |

### Step Events

步骤值采用非负安全整数：0 时自动状态均为等待，大于步骤数时自动状态均为完成，单项 status 仍可覆盖；无效数值在开发环境提示并按 1 展示。arrow 类型不渲染 node 插槽，dot 类型不渲染 icon 插槽；默认槽中的文本和原生装饰节点不占步骤编号。

### Steps Events

| 事件名           | 说明                                  | 回调参数                                       |
| ---------------- | ------------------------------------- | ---------------------------------------------- |
| `change`         | 步骤切换时触发（需开启 `changeable`） | `current: number, previous: number, ev: Event` |
| `update:modelValue` | `v-model` 同步                | `step: number`                                 |

### Steps Slots

| 名称          | 说明         | 参数 |
| ------------- | ------------ | ---- |
| `default`     | steps 的内容 | `-`  |
| `finish-icon` | 完成状态图标 | `-`  |
| `error-icon`  | 错误状态图标 | `-`  |

### Step Slots

| 名称          | 说明                       | 参数                                    |
| ------------- | -------------------------- | --------------------------------------- |
| `default`     | 步骤标题（优先于 `title`） | `index`、`status`、`active`、`disabled` |
| `title`       | 步骤标题                   | `index`、`status`、`active`、`disabled` |
| `node`        | 完整节点                   | `index`、`status`、`active`、`disabled` |
| `icon`        | 自定义节点图标             | `index`、`status`、`active`、`disabled` |
| `description` | 步骤描述                   | `index`、`status`、`active`、`disabled` |

## 使用说明





`active` 只表示当前步骤序号（从 1 开始）是否对应 modelValue；与 status（wait/process/finish/error）分开。当前步骤即使为 error，active 仍为 true；焦点、悬停不会改变 active。

## 阅读方向与键盘交互

Steps 继承最近的 `dir="ltr"` 或 `dir="rtl"`，支持运行时切换。横向步骤、连接线和方向箭头随阅读方向排列，纵向步骤仍从上到下；序号、进度值和自定义图标内容保持原意。

`changeable` 开启时，左右键按当前阅读方向移动焦点，纵向使用上下键；Home/End 聚焦首尾可用步骤，禁用项会被跳过。Enter/Space 确认步骤；移动焦点和切换方向不会触发进度更新。

## CSS Variables

以下变量均可通过 ThemeProvider 或 CSS 覆盖。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-steps-arrow-item-bg-error` | `var(--mp-sys-color-content-danger)` | `background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-finish` | `var(--mp-sys-color-state-selected)` | `background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-process` | `var(--mp-sys-color-content-brand)` | `background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-wait` | `var(--mp-sys-color-surface-muted)` | `background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-description-color-error` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-arrow-item-description-color-finish` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-arrow-item-description-color-process` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-arrow-item-description-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-arrow-item-description-margin-top` | `0` | `margin-top` |
| `--mp-steps-arrow-item-gap` | `4px` | `margin-inline-end` |
| `--mp-steps-arrow-item-title-color-error` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-arrow-item-title-color-finish` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-arrow-item-title-color-process` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-arrow-item-title-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-arrow-item-title-font-weight-active` | `500` | `font-weight` |
| `--mp-steps-arrow-size-md-title-padding-left` | `16px` | `padding-inline-start` |
| `--mp-steps-arrow-size-sm-title-padding-left` | `20px` | `padding-inline-start` |
| `--mp-steps-changeable-hover-text-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-steps-circle-horizontal-item-description-margin-top` | `2px` | `margin-top` |
| `--mp-steps-circle-item-bg-error` | `var(--mp-sys-color-content-danger)` | `background-color` |
| `--mp-steps-circle-item-bg-finish` | `var(--mp-sys-color-state-selected)` | `background-color` |
| `--mp-steps-circle-item-bg-process` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-circle-item-bg-wait` | `var(--mp-sys-color-surface-muted)` | `background-color` |
| `--mp-steps-circle-item-border-color-error` | `transparent` | `border` |
| `--mp-steps-circle-item-border-color-finish` | `transparent` | `border` |
| `--mp-steps-circle-item-border-color-process` | `transparent` | `border` |
| `--mp-steps-circle-item-border-color-wait` | `transparent` | `border` |
| `--mp-steps-circle-item-description-color-error` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-description-color-finish` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-description-color-process` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-description-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-icon-border-radius` | `50%` | `border-radius` |
| `--mp-steps-circle-item-icon-gap` | `12px` | `inset-inline-start`, `margin-inline-end`, `padding-inline-end` |
| `--mp-steps-circle-item-icon-text-color-error` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-circle-item-icon-text-color-finish` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-steps-circle-item-icon-text-color-process` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-steps-circle-item-icon-text-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-tail-color-error` | `var(--mp-sys-color-content-danger)` | `background-color` |
| `--mp-steps-circle-item-tail-color-process` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-circle-item-tail-color-wait` | `var(--mp-sys-color-border-default)` | `background-color` |
| `--mp-steps-circle-item-tail-size` | `1px` | `height`, `inset-inline-start`, `top`, `width` |
| `--mp-steps-circle-item-title-color-error` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-circle-item-title-color-finish` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-circle-item-title-color-process` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-circle-item-title-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-circle-item-title-font-weight-active` | `500` | `font-weight` |
| `--mp-steps-circle-tail-hack-width` | `5000px` | `width` |
| `--mp-steps-circle-vertical-item-description-margin-top` | `2px` | `margin-top` |
| `--mp-steps-circle-vertical-tail-padding-extra` | `6px` | `padding` |
| `--mp-steps-direction-horizontal-description-width` | `140px` | `max-width` |
| `--mp-steps-dot-horizontal-item-description-margin-top` | `4px` | `margin-top` |
| `--mp-steps-dot-horizontal-item-title-margin-top` | `4px` | `margin-top` |
| `--mp-steps-dot-item-bg-error` | `var(--mp-sys-color-content-danger)` | `background-color` |
| `--mp-steps-dot-item-bg-finish` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-dot-item-bg-process` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-dot-item-bg-wait` | `var(--mp-sys-color-content-secondary)` | `background-color` |
| `--mp-steps-dot-item-border-color-error` | `var(--mp-sys-color-content-danger)` | `border-color` |
| `--mp-steps-dot-item-border-color-finish` | `var(--mp-sys-color-content-brand)` | `border-color` |
| `--mp-steps-dot-item-border-color-process` | `var(--mp-sys-color-content-brand)` | `border-color` |
| `--mp-steps-dot-item-border-color-wait` | `var(--mp-sys-color-content-secondary)` | `border-color` |
| `--mp-steps-dot-item-description-color-error` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-dot-item-description-color-finish` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-dot-item-description-color-process` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-dot-item-description-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-dot-item-icon-border-radius` | `50%` | `border-radius` |
| `--mp-steps-dot-item-icon-gap` | `4px` | `inset-inline-start`, `margin-inline-end`, `padding-top` |
| `--mp-steps-dot-item-icon-margin-left` | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-dot-item-icon-size)) / 2)` | `inset-inline-start`, `margin-inline-start` |
| `--mp-steps-dot-item-icon-size` | `8px` | `height`, `inset-inline-start`, `margin-inline-end`, `margin-inline-start`, `margin-top`, `padding-top`, `top`, `width` |
| `--mp-steps-dot-item-icon-size-active` | `10px` | `height`, `margin-inline-start`, `margin-top`, `width` |
| `--mp-steps-dot-item-tail-color-error` | `var(--mp-sys-color-content-danger)` | `background-color` |
| `--mp-steps-dot-item-tail-color-process` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-dot-item-tail-color-wait` | `var(--mp-sys-color-border-default)` | `background-color` |
| `--mp-steps-dot-item-tail-size` | `1px` | `height`, `top` |
| `--mp-steps-dot-item-title-color-error` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-dot-item-title-color-finish` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-dot-item-title-color-process` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-steps-dot-item-title-color-wait` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-steps-dot-item-title-font-weight-active` | `500` | `font-weight` |
| `--mp-steps-dot-vertical-item-description-margin-top` | `4px` | `margin-top` |
| `--mp-steps-dot-vertical-item-dot-margin-top` | `8px` | `margin-top` |
| `--mp-steps-dot-vertical-item-dot-margin-top-active` | `calc(var(--mp-steps-dot-vertical-item-dot-margin-top) - (var(--mp-steps-dot-item-icon-size-active) - var(--mp-steps-dot-item-icon-size)))` | `margin-top` |
| `--mp-steps-dot-vertical-item-icon-margin-right` | `16px` | `margin-inline-end` |
| `--mp-steps-dot-vertical-tail-padding-bottom` | `2px` | `padding-bottom` |
| `--mp-steps-dot-vertical-tail-padding-top-extra` | `4px` | `padding-top` |
| `--mp-steps-label-vertical-content-width` | `100%` | `inset-inline-start`, `margin-inline-start` |
| `--mp-steps-navigation-arrow-color` | `var(--mp-sys-color-content-secondary)` | `border` |
| `--mp-steps-navigation-arrow-line-width` | `2px` | `border` |
| `--mp-steps-navigation-arrow-right` | `30px` | `inset-inline-end` |
| `--mp-steps-navigation-arrow-size` | `6px` | `height`, `width` |
| `--mp-steps-navigation-arrow-spacing-right` | `10px` | `padding-inline-end` |
| `--mp-steps-navigation-arrow-top` | `10px` | `top` |
| `--mp-steps-navigation-content-margin-bottom` | `20px` | `margin-bottom` |
| `--mp-steps-navigation-description-padding-right` | `20px` | `padding-inline-end` |
| `--mp-steps-navigation-ink-bg` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-steps-navigation-ink-height` | `2px` | `height` |
| `--mp-steps-navigation-ink-spacing-left` | `0` | `inset-inline-start` |
| `--mp-steps-navigation-ink-spacing-right` | `30px` | `inset-inline-end` |
| `--mp-steps-navigation-margin-right` | `32px` | `margin-inline-end` |
| `--mp-steps-navigation-padding-left` | `20px` | `padding-inline-start` |
| `--mp-steps-node-font-weight` | `500` | `font-weight` |
| `--mp-steps-size-md` | `28px` | `height`, `inset-inline-start`, `line-height`, `margin-inline-start`, `margin-top`, `padding`, `padding-inline-end`, `top`, `width` |
| `--mp-steps-size-md-arrow` | `72px` | `border-bottom`, `border-inline-start`, `border-top`, `height`, `inset-inline-end`, `padding-inline-start` |
| `--mp-steps-size-md-description-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-steps-size-md-icon-font-size` | `16px` | `font-size` |
| `--mp-steps-size-md-item-icon-margin-left` | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-size-md)) / 2)` | `inset-inline-start`, `margin-inline-start` |
| `--mp-steps-size-md-title-font-size` | `var(--mp-font-size-lg)` | `font-size` |
| `--mp-steps-size-sm` | `24px` | `height`, `inset-inline-start`, `line-height`, `margin-inline-start`, `padding`, `padding-inline-end`, `top`, `width` |
| `--mp-steps-size-sm-arrow` | `40px` | `border-bottom`, `border-inline-start`, `border-top`, `height`, `inset-inline-end`, `padding-inline-start` |
| `--mp-steps-size-sm-description-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-steps-size-sm-icon-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-steps-size-sm-item-icon-margin-left` | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-size-sm)) / 2)` | `inset-inline-start`, `margin-inline-start` |
| `--mp-steps-size-sm-title-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-steps-transition-duration-1` | `0.1s` | `transition` |
| `--mp-steps-transition-timing-function-linear` | `cubic-bezier(0, 0, 1, 1)` | `transition` |
| `--mp-steps-vertical-item-min-height` | `90px` | `min-height` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-steps-arrow-item-description-color-error: var(--mp-sys-color-surface-default);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
