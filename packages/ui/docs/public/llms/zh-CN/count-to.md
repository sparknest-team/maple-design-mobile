<!-- Source: src/count-to/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/count-to -->

# 数字动画

### 介绍

展示起始数值到目标数值的数字动画。

## 基础示例

### 基本使用

通过 `from` 和 `to` 属性指定起始数值和目标数值。

Example source: src/count-to/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-count-to :to="123456" />
</template>
```

## 内容与展示

### 精度、时长与动画曲线

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `to` | 目标值 | 精度、时长与动画曲线 |
| `precision` | 精度 | 精度、时长与动画曲线 |
| `duration` | 动画持续时间（单位：毫秒） | 精度、时长与动画曲线 |
| `timing-function` | 动画曲线函数 | 精度、时长与动画曲线 |
<!-- demo-config-notes:end -->

比较小数精度对最终文本的影响，以及时长和缓动曲线对数字变化过程的影响；手动启动、暂停另行展示。

<details>
<summary>配置说明与使用限制</summary>

#### 精度

通过 `precision` 控制数值精度

#### 自定义时长

通过 `duration` 属性指定动画时长（单位为毫秒）。

#### 自定义动画曲线

通过 `timing-function` 属性指定动画曲线。

</details>

Example source: src/count-to/example/demos/number-format-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="precision">
      <h4><span lang="zh-CN">精度</span><span lang="en-US">Precision</span></h4>
      <mp-count-to :to="123456" :precision="2" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="custom-duration">
      <h4><span lang="zh-CN">自定义时长</span><span lang="en-US">Custom Duration</span></h4>
      <mp-count-to :to="123456" :duration="10000" />
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="custom-animation-curve">
      <h4><span lang="zh-CN">自定义动画曲线</span><span lang="en-US">Custom Animation Curve</span></h4>
      <mp-count-to :to="123456" :timing-function="(v: number) => 1 - Math.pow(1 - v, 3)" />
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
</style>
```

## 自定义与插槽

### 自定义样式

Example source: src/count-to/example/demos/custom-style.vue

```vue
<script setup></script>

<template>
  <mp-count-to :to="123456">
    <template #default="{ value }">
      {{ value.toLocaleString() }}
    </template>
  </mp-count-to>
</template>
```

## 交互与控制

### 手动控制

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `to` | 目标值 | 手动控制 |
| `auto-start` | 是否自动开始播放动画 | 手动控制 |
<!-- demo-config-notes:end -->

调用 `start`、`pause`、`reset` 方法，手动控制动画的开始、暂停、重置。

Example source: src/count-to/example/demos/manual-control.vue

```vue
<script setup>
import { ref } from 'vue'

const countToRef = ref()
</script>

<template>
  <mp-count-to ref="countToRef" :to="123456" :auto-start="false" />
  <mp-row justify="space-between" align="center" style="margin-top: 10px">
    <mp-button status="primary" @click="countToRef.start()">开始</mp-button>
    <mp-button @click="countToRef.pause()">暂停</mp-button>
    <mp-button @click="countToRef.reset()">重置</mp-button>
  </mp-row>
</template>
```

## 数值与动画边界

### 科学计数与十进制取整

precision 支持 -292 到 292 的整数。非整数及非有限精度回退为 0，越界整数钳制到边界，并给出开发环境属性诊断。字符串保留既有 parseFloat 转换。负精度按十位、百位等取整。结果仍是向负无穷取整的 number，不补末尾零，也可能使用科学计数法。修改 precision 只重新格式化当前值，不重播。返回值仍受 IEEE-754 表示范围约束，动画展示值不作为十进制账务计算结果。

Example source: src/count-to/example/demos/decimal-floor.vue

```vue
<template>
  <mp-space direction="column">
    <p>微小数值 / Small value: -1.234e-7</p>
    <mp-count-to
      class="scientific-small"
      :from="-1.234e-7"
      :to="-1.234e-7"
      :precision="precision"
      :auto-start="false"
    />
    <mp-button @click="precision = precision === 9 ? 8 : 9">切换精度 / Toggle precision</mp-button>
    <p role="status">Precision: {{ precision }}. 仅改变展示精度，不重播。Changes formatting without replay.</p>
    <p>大数按十进制位取整 / Large value, precision -23:</p>
    <mp-count-to class="scientific-large" :from="-1.234e24" :to="-1.234e24" :precision="-23" :auto-start="false" />
    <p>向负无穷取整 / Floor toward negative infinity:</p>
    <mp-count-to class="negative-floor" :from="-12.351" :to="-12.351" :precision="2" :auto-start="false" />
  </mp-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const precision = ref(9)
</script>
```

### 零时长与重新播放

Example source: src/count-to/example/demos/zero-duration.vue

```vue
<template>
  <mp-space direction="column">
    <mp-count-to ref="counter" :from="0" :to="100" :duration="duration" @end="ends++" />
    <mp-space>
      <mp-button @click="duration = duration === 0 ? 600 : 0">切换时长 / Toggle duration</mp-button>
      <mp-button @click="counter?.reset()">重新播放 / Replay</mp-button>
    </mp-space>
    <p role="status">Duration: {{ duration }}ms; end: {{ ends }}. 0 时长在下一帧完成，不占用持续动画帧。</p>
  </mp-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { CountToInstance } from '@maple-design/ui-vue'

const counter = ref<CountToInstance>()
const duration = ref(0)
const ends = ref(0)
</script>
```

### 更换曲线与重播

修改 timing-function 在下一次 reset 生效（包括 from、to 或 duration 变化触发的重置），不自动重启当前播放。pause/start 继续原曲线；reset 使用最新函数创建新播放。省略函数恢复线性缓动。曲线可以提前到达目标值，但 end 仍在本次时长完成时通知。

Example source: src/count-to/example/demos/easing-replay.vue

```vue
<template>
  <mp-space direction="column">
    <mp-count-to ref="counter" :to="100" :duration="1200" :timing-function="curve" />
    <mp-space>
      <mp-button @click="cubic = !cubic">切换曲线 / Change curve</mp-button>
      <mp-button @click="replay">重新播放 / Replay</mp-button>
    </mp-space>
    <p role="status">Next: {{ cubic ? 'ease-out cubic' : 'linear' }}; current: {{ applied }}.</p>
    <p>切换曲线在下次播放生效；点击重新播放查看效果。Changing the curve applies on replay.</p>
  </mp-space>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CountToInstance } from '@maple-design/ui-vue'

const counter = ref<CountToInstance>()
const cubic = ref(false)
const applied = ref('linear')
const linear = (value: number) => value
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)
const curve = computed(() => (cubic.value ? easeOutCubic : linear))
function replay() {
  applied.value = cubic.value ? 'ease-out cubic' : 'linear'
  counter.value?.reset()
}
</script>
```

## 动画时长边界

时长为有限非负毫秒数。0 在下一帧到达目标；负数、NaN 和无穷值会产生开发环境属性诊断，并安全地按 0 处理，不会持续请求动画帧。下一帧执行前暂停或卸载会取消本次完成。字符串时长保留原有 parseFloat 转换；reset 重新读取 auto-start。end 仍为普通通知，不等待监听器返回的 Promise。

## API

`from`、`to`、`duration` 和 `precision` 的字符串按 parseFloat 解析，例如 `10px` 解析为 10；非有限或无法解析的起点/终点会诊断并回退 0。两个有效端点的差值溢出时，动画在下一帧完成。`precision` 对数值向负无穷取整，不补尾零，支持 -292 至 292 的整数。`auto-start` 在挂载或重置时读取；完成后直接调用 start 不会重播，需先 reset。

### CountTo Props

| 参数         | 说明                       | 类型               | 默认值  |
| ------------ | -------------------------- | ------------------ | ------- |
| `from`       | 起始值                     | _number \| string_ | `0`     |
| `to`         | 目标值                     | _number \| string_ | `0`     |
| `duration`   | 动画持续时间（单位：毫秒） | _number \| string_ | `2000` |
| `precision`   | 精度 | _number \| string_ | `0` |
| `auto-start` | 是否自动开始播放动画       | _boolean_          | `true`  |
| `timing-function` | 动画曲线函数       | _(v: number) => number_          | `-`  |

### CountTo Events

| 事件名     | 说明           | 回调参数 |
| ---------- | -------------- | -------- |
| `end` | 动画结束时触发 | `-`      |

### CountTo Slots

| 插槽名    | 说明       | 参数                     |
| --------- | ---------- | ------------------------ |
| `default` | 自定义内容 | `value: number` |

### CountTo Methods

| 方法名  | 说明                                                      | 参数 | 返回值 |
| ------- | --------------------------------------------------------- | ---- | ------ |
| `start` | 开始动画                                                | `-`  | `-`    |
| `pause` | 暂停动画                                                | `-`  | `-`    |
| `reset` | 重置动画，若 `auto-start` 为 `true`，重置后会自动开始播放 | `-`  | `-`    |

## 使用说明



动画在卸载及 KeepAlive 停用时暂停，重新激活后恢复；各实例的数值和动画状态独立。

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-count-to-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-count-to-text-font-size` | `var(--mp-font-size-lg)` | `font-size` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-count-to-text-color: var(--mp-sys-color-content-primary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
