<!-- Source: src/slider/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/slider -->

# Slider 滑块

在有限数值范围内选择单值或区间。

## 案例

### 基础用法

Example source: src/slider/example/demos/basic-usage.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value" />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### 只读

Example source: src/slider/example/demos/readonly.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value3" readonly />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### 步长

Example source: src/slider/example/demos/step-size.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value2" :step="10" />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### 范围

Example source: src/slider/example/demos/dual-thumb.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
function handleChange(v) {
  console.log(v)
}
</script>

<template>
  <mp-slider v-model="values.value1" range @change="handleChange" />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### 自定义边界

Example source: src/slider/example/demos/range.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value11" :max="210" :min="-50" show-tooltip="always" />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### 禁用

Example source: src/slider/example/demos/disable.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value3" disabled />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### 几何尺寸

Example source: src/slider/example/demos/slider-size.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value10" track-height="1.5vmin" range />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### 颜色

Example source: src/slider/example/demos/custom-style.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider
    v-model="values.value4"
    label-color="purple"
    active-color="#e0732c"
    track-color="#3a68b4"
    thumb-color="#e25241"
    label-text-color="#ededed"
  />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### 自定义拇指

Example source: src/slider/example/demos/custom-btn.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value9" range active-color="#52af77">
    <template #button="{ currentValue }">
      <div class="slider-example__block">{{ currentValue }}</div>
    </template>
  </mp-slider>
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### 提示

Example source: src/slider/example/demos/show-label.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value5" :show-tooltip="false" />
  <mp-slider v-model="values.value6" />
  <mp-slider v-model="values.value7" show-tooltip="always" />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### 垂直

父容器提供 300px 高度。上移增大、下移减小；范围两端仍不能交叉。没有独立 reverse 属性。

Example source: src/slider/example/demos/vertical.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(50)
const pair = ref([7, 64])
</script>

<template>
  <section class="slider-vertical-demo">
    <mp-space justify="space-around">
      <div class="slider-vertical-demo__track">
        <mp-slider v-model="value" presentation="inline" orientation="vertical" aria-label="Vertical value" />
      </div>
      <div class="slider-vertical-demo__track">
        <mp-slider
          v-model="pair"
          presentation="inline"
          range
          show-tooltip="always"
          orientation="vertical"
          :aria-label="['Vertical minimum', 'Vertical maximum']"
        />
      </div>
    </mp-space>
    <output aria-label="Vertical values">{{ value }} / {{ pair[0] }}–{{ pair[1] }}</output>
  </section>
</template>

<style scoped>
.slider-vertical-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.slider-vertical-demo__track {
  height: 300px;
}
</style>
```

### 刻度、标记和数字输入

数字输入遵守滑块步长和上下界；范围的两个端点不能互相越过。

Example source: src/slider/example/demos/keyboard-input.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(30)
const pair = ref([20, 80])
const marks = { 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }
</script>
<template>
  <div style="display: grid; gap: 32px; padding: 24px 12px">
    <mp-slider v-model="value" :step="5" :marks="marks" show-ticks show-input aria-label="Volume" />
    <mp-slider
      v-model="pair"
      range
      show-input
      :aria-label="['Minimum', 'Maximum']"
      :format-tooltip="(value) => value + '%'"
    />
  </div>
</template>
```

### 触控提示与定制

Example source: src/slider/example/demos/touch-and-labels.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(45)
</script>
<template>
  <div style="display: grid; gap: 36px; padding: 32px 12px">
    <mp-slider v-model="value" show-tooltip="always" aria-label="Always visible" />
    <mp-slider
      v-model="value"
      :show-tooltip="false"
      active-color="#722ed1"
      thumb-color="#f4edff"
      :track-height="8"
      :thumb-size="24"
      aria-label="Custom size"
    />
    <mp-slider v-model="value" aria-label="Custom handle"
      ><template #button="{ currentValue }"
        ><span class="slider-custom-handle">{{ currentValue }}</span></template
      ></mp-slider
    >
  </div>
</template>
<style scoped>
.slider-custom-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: white;
  transform: translate(-6px, -6px);
}
</style>
```

### 受控与非交叉范围

范围示例接受模型更新；固定值滑块仅记录提议、不接受更新。只读和禁用滑块保持原值。

Example source: src/slider/example/demos/controlled-range.vue

```vue
<script setup>
import { ref } from 'vue'

const accepted = ref([30, 70])
const proposed = ref(50)
</script>
<template>
  <div style="display: grid; gap: 28px; padding: 24px 12px">
    <mp-slider v-model="accepted" range show-tooltip="always" :aria-label="['Minimum', 'Maximum']" />
    <mp-slider :model-value="50" aria-label="Controlled rejection" @update:model-value="proposed = $event" />
    <output>{{ proposed }}</output>
    <mp-slider :default-value="40" readonly aria-label="Read only" />
    <mp-slider :default-value="40" disabled aria-label="Disabled" />
  </div>
</template>
```

### 交互状态切换

适用于连续区间内的数值调整。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

Example source: src/slider/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(30)
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-slider v-model="value" v-bind="__demoState"></mp-slider>
  </mp-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 受控值；range 使用二元组 | `SliderValue` | — |
| default-value | 非受控初始值 | `SliderValue` | `0` |
| min / max | 有限边界，数字字符串可用；非法值回退 0/100；max<=min 不可交互 | `number \| string` | `0 / 100` |
| step | 正有限步长，非法值回退1，按min对齐；max端点可达 | `number \| string` | `1` |
| range | 两个固定低/高端，不可交叉；初始倒序自动排序 | `boolean` | `false` |
| orientation | 整体朝向，垂直需要父容器提供高度 | `horizontal \| vertical` | `horizontal` |
| disabled / readonly / error | 未传时继承FormItem/Form适用状态；只读可聚焦但不可改值 | `boolean` | 继承 |
| show-ticks | 按step显示刻度，过密时省略，最多1000个 | `boolean` | `false` |
| marks | 有限范围内位置到文本的映射 | `Record<number,string>` | — |
| show-input | 显示InputNumber；Enter或失焦提交，使用同一归一化规则 | `boolean` | `false` |
| show-tooltip | true悬浮/聚焦/拖动显示；false隐藏；always常驻 | `boolean \| 'always'` | `true` |
| format-tooltip | 提示与aria-valuetext格式化 | `(value:number)=>string\|number` | 原值 |
| aria-label | 可访问名称；范围可分别传入两个名称 | `string \| [string,string]` | — |
| active-color / track-color / thumb-color | 轨道激活色/背景色/拇指底色 | `string` | CSS变量 |
| label-color / label-text-color | 提示背景/文字色 | `string` | CSS变量 |
| track-height / thumb-size | 轨道厚度/拇指直径，数字px或CSS长度；非法值保留主题默认 | `number \| string` | CSS变量 |

### 行为与键盘

方向键按step增加/减少，PageUp/PageDown为10步，Home/End到可用端点。范围的ARIA min/max随另一个拇指变化；重合时向左/下点击可分开低端，向右/上可分开高端。拇指内业务交互元素的键盘事件不被接管。只读保留焦点与提示，禁用不进入Tab顺序。

Pointer Events统一鼠标、触控、笔；pointerup提交最后坐标，pointercancel/丢失capture结束最近提议。禁用、卸载、KeepAlive失活会清理监听与capture且不继续发值事件。横向允许页面纵向滚动，纵向允许横向滚动。

受控模式只有父级回写才能改变显示；模型归一化不自动emit。change/update:model-value只报告不同提议，end携带最终提议，不保证父级接受。键盘及数字输入每次操作各有start/end；拖动是一组start/end。InputNumber内部不重复触发Form验证。已移除旧label-visible，直接使用show-tooltip，无兼容别名。

### Events

| 事件 | 参数 | 含义 |
| --- | --- | --- |
| update:model-value | `SliderValue` | 请求更新 |
| change | `SliderValue` | 不同数值提议，与模型事件配对 |
| start | — | 交互开始 |
| end | `SliderValue` | 交互结束的最终提议 |

### Slots / Methods

button插槽收到`{ currentValue:number,index:number }`；自定义内容不移除键盘、ARIA与提示。focus(index=0)按显示顺序聚焦拇指，blur()移出焦点。

导出SliderProps、SliderValue、SliderOrientation、SliderTooltipFormatter、SliderTooltipVisibility、SliderEmits、SliderSlots、SliderExpose、SliderInstance和运行时sliderProps。两端主体/样式独立复制；仅安装和Form接线使用各库独立实现。

### 样式变量

| 变量 | 默认值 |
| --- | --- |
| `--mp-slider-active-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-slider-track-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-slider-thumb-color` | `var(--mp-sys-color-surface-default)` |
| `--mp-slider-thumb-border-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-slider-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-slider-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` |
| `--mp-slider-tooltip-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-slider-error-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-slider-disabled-color` | `var(--mp-sys-color-content-disabled)` |
| `--mp-slider-track-height` | `4px` |
| `--mp-slider-thumb-size` | `16px` |
| `--mp-slider-control-height` | `var(--mp-sys-control-height-md)` |
| `--mp-slider-font-size` | `var(--mp-sys-font-size-sm)` |
| `--mp-slider-gap` | `var(--mp-sys-space-4)` |
| `--mp-slider-radius` | `var(--mp-sys-radius-md)` |
| `--mp-slider-transition-duration` | `var(--mp-sys-motion-duration-fast)` |
| `--mp-slider-input-width` | `80px` |

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `inline`，保留直接编辑。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。


`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。
