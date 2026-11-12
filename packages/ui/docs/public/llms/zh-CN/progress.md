<!-- Source: src/progress/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/progress -->

# Progress 进度条

展示确定或不确定任务的进度。

## 基础示例

### 基础用法

Example source: src/progress/example/demos/basic-usage.vue

```vue
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const value = ref(0)
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    if (value.value >= 100) {
      value.value = 0
      return
    }

    value.value += 20
  }, 1000)
})

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress :percent="20" />
    <mp-progress :percent="value" :track="false" show-text />
    <mp-progress :percent="100" show-text>success</mp-progress>
  </mp-space>
</template>
```

## 外观与状态

### 进度尺寸与状态

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `size` | 五档预设或自定义长度；线形厚度、环形直径 | 进度尺寸与状态 |
| `percent` | 0–100 百分比，保留小数；支持十进制数字字符串，非法值归零，越界裁剪 | 进度尺寸与状态 |
| `mode` | 线形或环形 | 进度尺寸与状态 |
| `stroke-width` | 覆盖轨道厚度，数字按 px，字符串支持 CSS 长度 | 进度尺寸与状态 |
| `status` | default/primary/secondary/tertiary/info/success/warning/danger；default 确定进度达到 100 时推导 success | 进度尺寸与状态 |
<!-- demo-config-notes:end -->

在相同进度范围内比较尺寸和状态色；环形、分段和不确定进度保留独立模型。

Example source: src/progress/example/demos/appearance-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    return { sizes }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
    return { statuses }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">五档与自定义尺寸</span><span lang="en-US">size</span></h4>
      <mp-space direction="column" size="16px">
        <mp-space v-for="size in scene1.sizes" :key="size" wrap size="16px" align="center">
          <span>{{ size }}</span
          ><mp-progress :size="size" :percent="42" /><mp-progress mode="circle" :size="size" :percent="42" />
        </mp-space>
        <mp-progress :size="10" :percent="12.5" />
        <mp-progress size="0.75rem" :stroke-width="6" :percent="60" />
        <mp-progress mode="circle" size="6rem" :percent="75" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="status">
      <h4><span lang="zh-CN">八种状态</span><span lang="en-US">status</span></h4>
      <mp-space direction="column" size="16px">
        <mp-progress v-for="status in scene2.statuses" :key="status" :status="status" :percent="60"
          ><template #text>{{ status }}</template></mp-progress
        >
        <mp-progress :percent="100" />
      </mp-space>
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

## 内容与展示

### 环形进度

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `percent` | 0–100 百分比，保留小数；支持十进制数字字符串，非法值归零，越界裁剪 | 环形进度、分段进度、不确定进度与动画 |
| `mode` | 线形或环形 | 环形进度、不确定进度与动画、渐变、起点、隐藏轨道与文本 |
| `size` | 五档预设或自定义长度；线形厚度、环形直径 | 环形进度、分段进度、更多样式与不确定进度 |
| `color` | 进度颜色或渐变 stop 映射，优先于 status | 环形进度、渐变、起点、隐藏轨道与文本、更多样式与不确定进度 |
| `status` | default/primary/secondary/tertiary/info/success/warning/danger；default 确定进度达到 100 时推导 success | 环形进度、分段进度、更多样式与不确定进度 |
| `track` | 显示背景轨道；false 同时隐藏缓冲装饰层 | 环形进度、渐变、起点、隐藏轨道与文本 |
<!-- demo-config-notes:end -->

Example source: src/progress/example/demos/circle.vue

```vue
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const value = ref(0)
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    if (value.value >= 100) {
      value.value = 0
      return
    }

    value.value += 20
  }, 1000)
})

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <mp-space wrap :size="['8vmin', '8vmin']">
    <mp-progress
      mode="circle"
      size="18vmin"
      :percent="100"
      :color="{
        '0%': '#3fecff',
        '100%': '#6149f6',
      }"
    />
    <mp-progress mode="circle" :percent="75" size="18vmin" :track="false" />
    <mp-progress mode="circle" show-text :percent="value" stroke-width="5" size="18vmin" />
    <mp-progress mode="circle" status="success" show-text :percent="100" stroke-width="5" size="18vmin">
      success
    </mp-progress>
  </mp-space>
</template>
```

### 分段进度

Example source: src/progress/example/demos/step.vue

```vue
<template>
  <mp-space direction="column" size="16px">
    <mp-progress :steps="5" :percent="40" />
    <mp-progress :steps="10" :percent="75" status="warning" size="lg" />
    <mp-progress :steps="5" :percent="100" />
  </mp-space>
</template>
```

### 不确定进度与动画

Example source: src/progress/example/demos/loop.vue

```vue
<template>
  <mp-space direction="column" size="16px">
    <mp-progress indeterminate aria-label="Loading" />
    <mp-progress mode="circle" indeterminate aria-label="Loading" />
    <mp-progress :percent="60" animation />
  </mp-space>
</template>
```

### 渐变、起点、隐藏轨道与文本

Example source: src/progress/example/demos/advanced.vue

```vue
<script setup>
import { ref } from 'vue'

const gradient = ref(false)
</script>
<template>
  <mp-space direction="column" size="16px">
    <mp-switch v-model="gradient" aria-label="Gradient" />
    <mp-progress
      :percent="65"
      :color="gradient ? { '0%': '#722ed1', '100%': '#0fc6c2' } : '#722ed1'"
      buffer-color="#eee5ff"
    />
    <mp-space wrap size="24px">
      <mp-progress
        mode="circle"
        :percent="65"
        :rotate="90"
        :color="gradient ? { '0%': '#722ed1', '100%': '#0fc6c2' } : '#722ed1'"
      />
      <mp-progress mode="circle" :percent="65" :track="false"
        ><template #text="{ percent }">{{ percent }} / 100</template></mp-progress
      >
    </mp-space>
  </mp-space>
</template>
```

### 更多样式与不确定进度

Example source: src/progress/example/demos/style.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress :percent="40" color="linear-gradient(131.53deg, #3fecff 0%, #6149f6 100%)" />
    <mp-progress status="info" :percent="40" />
    <mp-progress status="success" :percent="60" />
    <mp-progress percent="80" stroke-width="8" color="#ff9f00" track-color="#f5cb90" />
  </mp-space>
</template>
```

Example source: src/progress/example/demos/indeterminate-progress.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" :size="['3vh', '3vh']">
    <mp-progress indeterminate />
    <mp-progress indeterminate status="info" />

    <mp-space wrap justify="space-between">
      <mp-progress mode="circle" indeterminate size="18vmin" />
      <mp-progress mode="circle" status="info" indeterminate size="18vmin" />
    </mp-space>
  </mp-space>
</template>
```

## 阅读方向

线性进度从阅读起点增长，活动与不确定进度动画沿阅读方向运动。百分比、数值和圆环角度不反转，减少动态效果的设置仍生效。

## 使用说明

### 配置说明

环形确定进度的 success/danger 默认显示完成/失败图标（包括 xs）；text 插槽可覆盖，ARIA 数值始终保留。

## API

### Progress Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 线形或环形 | `line \| circle` | `line` |
| percent | 0–100 百分比，保留小数；支持十进制数字字符串，非法值归零，越界裁剪 | `number \| string` | `0` |
| size | 五档预设或自定义长度；线形厚度、环形直径 | `ProgressSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `md` |
| stroke-width | 覆盖轨道厚度，数字按 px，字符串支持 CSS 长度 | `number \| string` | 随 size |
| steps | 仅线形的分段数，向下取整并限制为 0–1000；不确定模式忽略 | `number` | `0` |
| status | default/primary/secondary/tertiary/info/success/warning/danger；default 确定进度达到 100 时推导 success | `ProgressStatus`<br>`'default' \| 'success' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'warning' \| 'danger'` | `default` |
| color | 进度颜色或渐变 stop 映射，优先于 status | `string \| Record<string, string>` | — |
| track-color | 背景轨道颜色 | `string` | — |
| buffer-color | 线形剩余轨道装饰色/渐变，不代表独立缓冲百分比 | `ProgressColor` | — |
| track | 显示背景轨道；false 同时隐藏缓冲装饰层 | `boolean` | `true` |
| show-text | 显示文本；xs 环形隐藏文本避免溢出 | `boolean` | `true` |
| text-class | 文本容器类名 | `string` | — |
| rotate | 环形起点从十二点顺时针旋转的角度 | `number` | `0` |
| animation | 确定线形进度扫光动画，不应用于 steps | `boolean` | `false` |
| indeterminate | 不确定进度；省略 aria-valuenow，不自动推导成功 | `boolean` | `false` |

### 尺寸语义

| size | xs | sm | md | lg | xl |
| --- | --- | --- | --- | --- | --- |
| 线形厚度 / 环形默认描边 (px) | 2 | 3 | 4 | 6 | 8 |
| 环形直径 (px) | 16 | 48 | 64 | 80 | 96 |

`size=12` / `size="12"` 表示 12px；`size="2rem"`、`"50%"`、`"calc(100% - 2px)"` 保留 CSS 长度。自定义线形 size 控制厚度，自定义环形 size 控制直径；stroke-width 始终优先控制厚度。非正数或非法长度回退 md。环形百分比直径需要父容器有明确宽度。五档均实际实现，xs 环形不显示文本。Cedar 未传 size 时继承 ConfigProvider，Maple 未传时默认 md。

### Progress Slots

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| text | `{ percent: number }` | 优先级高于 default |
| default | `{ percent: number }` | 自定义显示文本 |

不确定进度默认显示省略号，可用 text 插槽提供业务文案。组件本身不操作值、无更新事件；请提供 `aria-label` 标识业务任务。所有内置动画尊重系统减少动态效果设置。

## Types

导出 `ProgressProps`、`ProgressInstance`、`ProgressSize`、`ProgressMode`、`ProgressStatus`、`ProgressColor` 和运行时 `progressProps`。

## CSS Variables

环形 `stroke-width` 按组件实际 CSS 上下文解析，例如 `1em`、`calc()`、`var()` 和百分比；百分比相对于环形直径。字体、变量或尺寸变化时重新计算，描边最大为直径的 99%。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-progress-animation-duration` | `1.5s` | `animation`, `animation-delay` |
| `--mp-progress-danger-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-progress-default-color` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-progress-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-progress-info-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-progress-line-border-radius` | `9999px` | `border-radius` |
| `--mp-progress-primary-color` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-progress-secondary-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-progress-steps-gap` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-progress-success-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-progress-tertiary-color` | `var(--mp-sys-color-content-tertiary)` | `color` |
| `--mp-progress-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-progress-text-gap` | `var(--mp-sys-space-4)` | `gap` |
| `--mp-progress-track-color` | `var(--mp-sys-color-state-hover)` | `background`, `stroke` |
| `--mp-progress-transition-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-progress-warning-color` | `var(--mp-sys-color-content-warning)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-progress-danger-color: var(--mp-sys-color-content-danger);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
