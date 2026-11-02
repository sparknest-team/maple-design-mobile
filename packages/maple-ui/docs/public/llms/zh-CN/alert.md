<!-- Source: src/alert/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/alert -->

# 警告信息

## 案例

### 介绍

警告信息组件会向用户显示简短的消息，但不会中断他们的使用。

### 变体

`variant` 可选值：`standard` / `tonal` / `outline`。

Example source: src/alert/example/demos/variant.vue

```vue
<script setup>
import { ref } from 'vue'

const options = ['info', 'success', 'warning', 'danger', 'default'].map((value) => ({ label: value, value }))
const type = ref('info')
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-select v-model="type" variant="outline" size="sm" :options="options" />
    <mp-alert
      closable
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      :status="type"
    />
    <mp-alert
      closable
      variant="tonal"
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      :status="type"
    />
    <mp-alert
      closable
      variant="outline"
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      :status="type"
    />
  </mp-space>
</template>
```

### 标题

Example source: src/alert/example/demos/title.vue

```vue
<script setup></script>

<template>
  <mp-alert title="傲慢与偏见" />
</template>
```

### 信息

Example source: src/alert/example/demos/message.vue

```vue
<script setup></script>

<template>
  <mp-alert message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。" />
</template>
```

### 类型

`status` 可选值：`info` / `success` / `warning` / `danger` / `default`。`default` 不显示内置图标。

Example source: src/alert/example/demos/type.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" size="lg">
    <mp-alert
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
    />
    <mp-alert
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      status="success"
    />
    <mp-alert
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      status="warning"
    />
    <mp-alert
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      status="danger"
    />
    <mp-alert
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      status="default"
    />
  </mp-space>
</template>
```

### 居中

Example source: src/alert/example/demos/center.vue

```vue
<script setup></script>

<template>
  <mp-alert message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。" center />
</template>
```

### 通栏（Banner）

Example source: src/alert/example/demos/banner.vue

```vue
<script setup></script>

<template>
  <mp-alert message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。" banner />
</template>
```

### 隐藏图标

Example source: src/alert/example/demos/show-icon.vue

```vue
<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <mp-alert
    title="傲慢与偏见"
    message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
    :show-icon="false"
  />
</template>
```

### 自定义图标

Example source: src/alert/example/demos/custom-icon.vue

```vue
<script setup></script>

<template>
  <mp-alert
    title="傲慢与偏见"
    message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
  >
    <template #icon>
      <m-icon-heart-fill />
    </template>
  </mp-alert>
</template>
```

### 操作区

Example source: src/alert/example/demos/action.vue

```vue
<script setup></script>

<template>
  <mp-alert
    title="傲慢与偏见"
    message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
  >
    <template #action>
      <mp-button size="xs" status="primary">详情</mp-button>
    </template>
  </mp-alert>
</template>
```

### 允许关闭

关闭按钮可点击、Space 或 Enter 激活。close 是关闭请求，closed 在退出动画结束后触发；若在 close 中直接卸载组件，就不能观察该组件的动画结束。示例保留实例到关闭结束，显示两种事件次数；重新打开使用新 key，只重建该示例的 Alert，不影响其他实例。

Example source: src/alert/example/demos/allow-to-close.vue

```vue
<script setup>
import { ref } from 'vue'

const generation = ref(0)
const closeCount = ref(0)
const closedCount = ref(0)
</script>

<template>
  <section class="alert-close-demo">
    <mp-alert
      :key="generation"
      title="傲慢与偏见"
      message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
      closable
      @close="closeCount++"
      @closed="closedCount++"
    />
    <p role="status">Close: {{ closeCount }} · Closed: {{ closedCount }}</p>
    <mp-button :disabled="closedCount === generation" @click="generation++">Reopen / 重新打开</mp-button>
  </section>
</template>
```

### 自定义关闭图标

Example source: src/alert/example/demos/custom-close-icon.vue

```vue
<script setup>
import { ref } from 'vue'

const showCloseIcon = ref(true)
</script>

<template>
  <mp-alert
    v-if="showCloseIcon"
    title="傲慢与偏见"
    message="我也说不准是在什么时间，什么地点，看见你的什么神情，听见你的什么言语，便开始爱上了你。"
    closable
    @close="showCloseIcon = false"
  >
    <template #close-icon>
      <m-icon-close />
    </template>
  </mp-alert>
</template>
```

### 外观组合

适用于提示信息的强调程度。调整变体、状态，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/alert/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'tonal', status: 'default' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'tonal', value: 'tonal' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>status</span
        ><mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
            { label: 'default', value: 'default' },
          ]"
          aria-label="status"
        />
      </div>
    </mp-space>
    <mp-alert title="傲慢与偏见" v-bind="__demoAppearance" />
  </mp-space>
</template>
```

## API

### 属性

| 参数        | 说明                                                                 | 类型                | 默认值     |
| ----------- | -------------------------------------------------------------------- | ------------------- | ---------- |
| status      | 类型，可选值为 `info` / `success` / `warning` / `danger` / `default` | _AlertStatus_       | `info`     |
| `variant`   | 变体，可选值为 `standard` / `outline` / `tonal`                      | _AlertVariant_      | `standard` |
| `color`     | 自定义背景色                                                         | _string_            | `-`        |
| `title`     | 标题                                                                 | _string_            | `-`        |
| `message`   | 内容                                                                 | _string_            | `-`        |
| `show-icon` | 是否显示左侧图标                                                     | _boolean_           | `true`     |
| `closable`  | 是否显示关闭按钮（注意：不再使用 `closeable`）                       | _boolean_           | `false`    |
| `banner`    | 通栏模式（去除圆角）                                                 | _boolean_           | `false`    |
| `center`    | 内容是否居中                                                         | _boolean_           | `false`    |
| `elevation` | 海拔高度，可选值为 `true` / `false` 和 `0-24`                        | _number \| boolean_ | `false`    |

### 插槽

| 名称         | 说明       |
| ------------ | ---------- |
| `default`    | 内容       |
| `title`      | 标题       |
| `icon`       | 前缀       |
| `action`     | 右侧操作区 |
| `close-icon` | 关闭图标   |

### 事件

| 事件名   | 说明               | 回调参数       |
| -------- | ------------------ | -------------- |
| `close`  | 点击关闭按钮时触发 | `event: Event` |
| `closed` | 关闭过渡结束后触发 | `-`            |

### 类型定义

```ts
import type { AlertInstance, AlertProps, AlertStatus, AlertVariant } from 'maple-ui'
```

### 样式变量

参见 `style/token.less` 中 `:root` 下的 `--mp-alert-*` 变量。所有变量统一以 `--mp-alert-` 前缀，可通过 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

## 升级提示（Breaking）

- `closeable` → `closable`
- 新增 `default` 类型与 `show-icon` / `banner` / `center` / `closed` API
- 移除 `content` 插槽（结构调整为 `body`）

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

关闭按钮支持键盘操作，close 只触发一次，closed 在离场动画完成后触发。Maple 内部关闭类由 __close-icon 调整为 __close-btn；默认图标资源由各库本地适配。

### 完整变量默认值

彩色标题、正文、图标及 outline 描边使用可读 system content。standard 与 tonal 使用同一第 1 阶浅底，前者额外带弱装饰描边；默认标题为 content-primary，正文、图标为 content-secondary。content 变量同时控制根容器继承色，关闭图标及未显式设色的操作内容跟随它。Maple 暗色继承同一套颜色，但保留原有几何覆盖（内边距 16px、图标 22px、图标/关闭间距 12px、正文行高 1.5）。color 仅改背景，调用方须同时验证前景对比度。下表为 :root 默认值，不是主题覆盖值。

| 变量 | 默认值 |
| --- | --- |
| `--mp-alert-padding-vertical` | `var(--mp-sys-space-4)` |
| `--mp-alert-padding-horizontal` | `var(--mp-sys-space-6)` |
| `--mp-alert-padding-vertical-with-title` | `var(--mp-sys-space-6)` |
| `--mp-alert-padding-horizontal-with-title` | `var(--mp-sys-space-6)` |
| `--mp-alert-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-alert-border-width` | `1px` |
| `--mp-alert-font-size-content` | `var(--mp-sys-font-size-md)` |
| `--mp-alert-font-size-title` | `var(--mp-sys-font-size-lg)` |
| `--mp-alert-font-weight-title` | `var(--mp-sys-font-weight-medium)` |
| `--mp-alert-line-height` | `1.5715` |
| `--mp-alert-line-height-title` | `1.5` |
| `--mp-alert-title-margin-bottom` | `var(--mp-sys-space-2)` |
| `--mp-alert-icon-size` | `16px` |
| `--mp-alert-icon-margin-right` | `var(--mp-sys-space-4)` |
| `--mp-alert-action-margin-left` | `var(--mp-sys-space-5)` |
| `--mp-alert-close-margin-left` | `var(--mp-sys-space-4)` |
| `--mp-alert-standard-info-bg` | `rgb(var(--mp-blue-1))` |
| `--mp-alert-standard-info-border` | `rgb(var(--mp-blue-3))` |
| `--mp-alert-standard-info-title` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-standard-info-content` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-standard-info-icon` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-standard-success-bg` | `rgb(var(--mp-success-1))` |
| `--mp-alert-standard-success-border` | `rgb(var(--mp-success-3))` |
| `--mp-alert-standard-success-title` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-standard-success-content` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-standard-success-icon` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-standard-warning-bg` | `rgb(var(--mp-warning-1))` |
| `--mp-alert-standard-warning-border` | `rgb(var(--mp-warning-3))` |
| `--mp-alert-standard-warning-title` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-standard-warning-content` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-standard-warning-icon` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-standard-danger-bg` | `rgb(var(--mp-danger-1))` |
| `--mp-alert-standard-danger-border` | `rgb(var(--mp-danger-3))` |
| `--mp-alert-standard-danger-title` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-standard-danger-content` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-standard-danger-icon` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-standard-default-bg` | `var(--mp-color-fill-2)` |
| `--mp-alert-standard-default-border` | `var(--mp-sys-color-border-default)` |
| `--mp-alert-standard-default-title` | `var(--mp-sys-color-content-primary)` |
| `--mp-alert-standard-default-content` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-standard-default-icon` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-tonal-info-bg` | `rgb(var(--mp-blue-1))` |
| `--mp-alert-tonal-info-title` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-tonal-info-content` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-tonal-info-icon` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-tonal-success-bg` | `rgb(var(--mp-success-1))` |
| `--mp-alert-tonal-success-title` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-tonal-success-content` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-tonal-success-icon` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-tonal-warning-bg` | `rgb(var(--mp-warning-1))` |
| `--mp-alert-tonal-warning-title` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-tonal-warning-content` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-tonal-warning-icon` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-tonal-danger-bg` | `rgb(var(--mp-danger-1))` |
| `--mp-alert-tonal-danger-title` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-tonal-danger-content` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-tonal-danger-icon` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-tonal-default-bg` | `var(--mp-color-fill-2)` |
| `--mp-alert-tonal-default-title` | `var(--mp-sys-color-content-primary)` |
| `--mp-alert-tonal-default-content` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-tonal-default-icon` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-outline-info-border` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-info-title` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-info-content` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-info-icon` | `var(--mp-sys-color-content-info)` |
| `--mp-alert-outline-success-border` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-success-title` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-success-content` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-success-icon` | `var(--mp-sys-color-content-success)` |
| `--mp-alert-outline-warning-border` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-warning-title` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-warning-content` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-warning-icon` | `var(--mp-sys-color-content-warning)` |
| `--mp-alert-outline-danger-border` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-danger-title` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-danger-content` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-danger-icon` | `var(--mp-sys-color-content-danger)` |
| `--mp-alert-outline-default-border` | `var(--mp-sys-color-border-default)` |
| `--mp-alert-outline-default-title` | `var(--mp-sys-color-content-primary)` |
| `--mp-alert-outline-default-content` | `var(--mp-sys-color-content-secondary)` |
| `--mp-alert-outline-default-icon` | `var(--mp-sys-color-content-secondary)` |

### 动效变量

内置动效遵循 `prefers-reduced-motion: reduce`；减少动效不会阻止加载状态或关闭事件更新。

| Token | Default |
| --- | --- |
| `--mp-alert-close-duration` | `var(--mp-sys-motion-duration-slow)` |
