<!-- Source: src/rate/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/rate -->

# 评分

## 案例

### 介绍

用于对事物进行评级操作。

### 基本使用

Example source: src/rate/example/demos/basic-usage.vue

```vue
<script setup>
import { reactive } from 'vue'
import { IconThumbUp, IconThumbUpFill } from '@maple-design/icons-vue'

const scores = reactive({
  score: 3,
  score1: 3,
  score3: 3,
  score4: 3,
  score6: 3.5,
  score7: 3,
  score8: 3,
  score10: 3,
  score12: 3.5,
})
</script>

<template>
  <mp-rate v-model="scores.score" />
  <mp-rate v-model="scores.score" :icon="IconThumbUpFill" :empty-icon="IconThumbUp" />
</template>
```

### 自定义评分总数

通过 `count` 属性设置评分总数。

Example source: src/rate/example/demos/custom-total-rating.vue

```vue
<script setup>
import { reactive } from 'vue'

const scores = reactive({
  score: 3,
  score1: 3,
  score3: 3,
  score4: 3,
  score6: 3.5,
  score7: 3,
  score8: 3,
  score10: 3,
  score12: 3.5,
})
</script>

<template>
  <mp-rate v-model="scores.score1" :count="8" />
</template>
```

### 自定义评分图标样式

通过 `icon` 和 `empty-icon` 属性设置选中和未选中时的图标。
通过 `color` 和 `empty-color` 属性设置选中和未选中时的颜色。

Example source: src/rate/example/demos/custom-rating-icon-style.vue

```vue
<script setup>
import { reactive } from 'vue'
import { IconHeart, IconHeartFill } from '@maple-design/icons-vue'

const scores = reactive({
  score: 3,
  score1: 3,
  score3: 3,
  score4: 3,
  score6: 3.5,
  score7: 3,
  score8: 3,
  score10: 3,
  score12: 3.5,
})
</script>

<template>
  <mp-rate
    v-model="scores.score3"
    :icon="IconHeartFill"
    :empty-icon="IconHeart"
    color="var(--mp-color-danger)"
    empty-color="var(--mp-color-danger)"
  />
</template>
```

### 自定义评分图标尺寸与间隔

通过 `size` 属性设置评分图标的尺寸。
通过 `gap` 属性设置评分之间的间隔。

Example source: src/rate/example/demos/custom-rating-icon-size-and-gap.vue

```vue
<script setup>
import { reactive } from 'vue'

const scores = reactive({
  score: 3,
  score1: 3,
  score3: 3,
  score4: 3,
  score6: 3.5,
  score7: 3,
  score8: 3,
  score10: 3,
  score12: 3.5,
})
</script>

<template>
  <mp-rate v-model="scores.score4" size="8vmin" gap="1vmin" />
</template>
```

### 使用半星

通过 `allow-half` 属性将评分设置为可半选，`half-icon` 属性设置半选时的样式。

Example source: src/rate/example/demos/half-star.vue

```vue
<script setup>
import { reactive } from 'vue'

const scores = reactive({
  score: 3,
  score1: 3,
  score3: 3,
  score4: 3,
  score6: 3.5,
  score7: 3,
  score8: 3,
  score10: 3,
  score12: 3.5,
})
</script>

<template>
  <mp-rate v-model="scores.score6" :count="8" allow-half />
  <mp-rate
    v-model="scores.score6"
    :count="8"
    icon="heart-fill"
    half-icon="heart-half-full"
    empty-icon="heart"
    color="var(--mp-color-danger)"
    allow-half
    style="margin-top: 4px"
  />
</template>
```

### 禁用与只读

通过 `disabled` 属性将评分设置为禁止点击状态，`disabled-color` 设置禁用时图标的颜色。
通过 `readonly` 属性将评分设置为只读状态。

Example source: src/rate/example/demos/disabled-and-readonly.vue

```vue
<script setup>
import { reactive } from 'vue'

const scores = reactive({
  score: 3,
  score1: 3,
  score3: 3,
  score4: 3,
  score6: 3.5,
  score7: 3,
  score8: 3,
  score10: 3,
  score12: 3.5,
})
</script>

<template>
  <mp-rate v-model="scores.score7" disabled />
  <mp-rate v-model="scores.score8" readonly />
</template>
```

### 可清空

通过 `clearable` 属性允许用户清空评分。

Example source: src/rate/example/demos/clearable.vue

```vue
<script setup>
import { reactive } from 'vue'

const scores = reactive({
  score: 3,
  score1: 3,
  score3: 3,
  score4: 3,
  score6: 3.5,
  score7: 3,
  score8: 3,
  score10: 3,
  score12: 3.5,
})
</script>

<template>
  <mp-rate v-model="scores.score12" clearable allow-half />
</template>
```

### 监听事件

通过调用 `change` 事件完成其他交互逻辑。


> 评分组件的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

Example source: src/rate/example/demos/listen-event.vue

```vue
<script setup>
import { reactive } from 'vue'
import { Message } from '@maple-design/ui'

const scores = reactive({
  score: 3,
  score1: 3,
  score3: 3,
  score4: 3,
  score6: 3.5,
  score7: 3,
  score8: 3,
  score10: 3,
  score12: 3.5,
})
function handleChange(score) {
  Message({
    content: `click ${score}`,
    position: 'top',
  })
}
</script>

<template>
  <mp-rate v-model="scores.score10" @change="handleChange" />
</template>
```

### 键盘与状态

Example source: src/rate/example/demos/keyboard.vue

```vue
<script setup>
import { ref } from 'vue'

const score = ref(2.5)
</script>

<template>
  <mp-space direction="column">
    <p>Tab 聚焦；方向键按半分调整；Home 清零，End 满分。重复点击当前分数可清空。</p>
    <mp-rate v-model="score" allow-half clearable aria-label="服务评分" />
    <span>当前评分：{{ score }}</span>
    <mp-rate :default-value="3" readonly aria-label="只读评分" />
    <mp-rate :default-value="3" disabled aria-label="禁用评分" />
  </mp-space>
</template>
```

### 尺寸与符号

Example source: src/rate/example/demos/sizes-and-symbols.vue

```vue
<template>
  <mp-space direction="column">
    <mp-rate :default-value="3" :size="20" aria-label="20 像素评分" />
    <mp-rate :default-value="3.5" size="2rem" gap="0.5rem" allow-half aria-label="自定义尺寸评分" />
    <mp-rate :default-value="4" grading aria-label="表情评分" />
    <mp-rate :default-value="3" aria-label="自定义字符评分">
      <template #character="{ value, active }"
        ><span>{{ active ? '♥' : '♡' }}{{ value }}</span></template
      >
    </mp-rate>
  </mp-space>
</template>
```

### 交互状态切换

适用于评分反馈。调整禁用、只读，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

Example source: src/rate/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(3)
const __demoState = __demoReactive({ disabled: false, readonly: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
    </mp-space>
    <mp-rate v-model="value" v-bind="__demoState"></mp-rate>
  </mp-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 受控评分，配合 v-model；外部更新不发事件 | number | undefined |
| default-value | 非受控初值，只初始化一次 | number | 0 |
| count | 正有限数向下取整；非法值回退 5 | number \| string | 5 |
| allow-half | 半分步长 | boolean | false |
| clearable | 重复点击当前分数清空；键盘边界不会清空 | boolean | false |
| grading | 固定五级表情评分，优先于插槽和图标 | boolean | false |
| disabled | 禁用；缺省继承表单，显式 false 覆盖 | boolean | undefined |
| readonly | 只读且可聚焦；缺省继承表单 | boolean | undefined |
| aria-label | 评分的业务无障碍名称 | string | undefined |
| size | 图标尺寸；数字/数字字符串为 px，带单位为 CSS 长度 | number \| string | 样式默认值 |
| gap | 图标间距；数字/数字字符串为 px，带单位为 CSS 长度 | number \| string | 样式默认值 |
| color | 选中颜色，或按每个图标分值的递增阈值映射 | string \| Record<string, string> | undefined |
| empty-color | 未选中颜色 | string | undefined |
| disabled-color | 禁用时覆盖选中/未选中颜色 | string | undefined |
| icon | 选中图标 | string \| Component | 星形 |
| half-icon | 半选图标 | string \| Component | 半星 |
| empty-icon | 未选中图标 | string \| Component | 空星 |
| ripple | 点击水波纹 | boolean | true |

size/gap 不接受 xs/sm/md/lg/xl 档位；省略、非法或非正数保留样式默认值。CSS var/calc/min/max/clamp 长度可用。评分按 1 或 0.5 步长归一至 0～count；非有限评分显示 0，不反向改写外部值。

### Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:model-value | value: number | 用户产生新值 |
| change | value: number | 新值确认；相同值不重复通知 |
| hover-change | value: number | 鼠标预览改变；离开/失焦/禁用/只读重置为 0 |

### Slots

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| character | { index, value, active } | index 从 0 开始，value 从 1 开始；替换评分符号 |

优先级：grading > character > icon/half-icon/empty-icon > 默认图标。字符串图标需要全局注册；组件值无需注册。

### Methods

focus() 聚焦评分，blur() 移除焦点。只读仍可聚焦，禁用移出 Tab 序列。方向键增减、Home 清零、End 满分；子控件键盘事件和 Alt/Ctrl/Meta 组合键不被接管。触屏点击与鼠标点击遵循相同半选、清空规则。

### 类型定义

导出 RateProps、RateColor、RateIcon、RateInstance、RateExpose、RateEmits、RateCharacterSlotProps。

### 样式变量

| Token | Default |
| --- | --- |
| `--mp-rate-disabled-color` | `var(--mp-sys-color-content-disabled)` |
| `--mp-rate-error-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-rate-active-scale` | `1.2` |
| `--mp-rate-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-rate-focus-width` | `2px` |
| `--mp-rate-focus-offset` | `2px` |
| `--mp-rate-size` | `24px` |
| `--mp-rate-gap` | `0px` |
| `--mp-rate-min-height` | `0px` |
| `--mp-rate-action-padding` | `4px` |
| `--mp-rate-empty-color` | `var(--mp-color-text)` |
| `--mp-rate-active-color` | `var(--mp-color-primary)` |
| `--mp-rate-transition-duration` | `250ms` |
| `--mp-rate-scale-duration` | `250ms` |
| `--mp-rate-transition-timing-function` | `ease` |

两端公开 Token 后缀及含义一致；Cedar 保留金色星形和紧凑间距，Maple 保留主色星形与触控内边距，默认值差异已登记主题契约。源码各自维护，不共享运行时。

`transition-duration` 控制 hover/颜色过渡，`scale-duration` 控制选中动画，`transition-timing-function` 控制缓动。低动态偏好下关闭非必要动画；`size` / `gap` Prop 会覆盖当前实例的对应 Token。

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `inline`，保留直接编辑。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。


## 配置清空后的值

`empty-value` / `emptyValue` 指定清空动作产生的模型值，接受当前组件模型类型内的值或无参数工厂函数。省略保留原有默认结果；需要区分“省略”与“返回 undefined”时使用 `() => undefined`。数组会按每次清空浅复制；不可清除的禁用选中项仍保留。该属性不改变哪些值算空、不改变 Form reset 默认值，也不会将 0/false 普遍视为空。


`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。
