# 统计数值

### 介绍

突出展示某个或某组数字、带描述的统计类数据。

倒计时请使用独立的 [Countdown](#/zh-CN/countdown) 组件；滚动数字也可嵌入 [CountTo](#/zh-CN/count-to)。

### 基本使用

通过 `title` 展示描述，通过 `value` 展示数值。`value` 支持数字或字符串。

```html
<template>
  <mp-statistic title="Downloads" :value="125670" show-group-separator />
  <mp-statistic title="Comments" extra="Compared to yesterday" :value="40509" :precision="2" />
  <mp-statistic title="Active Users" value="1.28k" />
</template>
```

### 前缀 / 后缀

通过 `prefix` / `suffix` 或同名插槽为数值添加单位、货币符号或趋势。

```html
<template>
  <mp-statistic title="Account Balance" :value="125670" prefix="$" show-group-separator />
  <mp-statistic
    title="Growth Rate"
    :value="12.8"
    :precision="1"
    suffix="%"
    :value-style="{ color: 'var(--mp-color-success)' }"
  >
    <template #prefix>▲</template>
  </mp-statistic>
  <mp-statistic
    title="Bounce Rate"
    :value="3.2"
    :precision="1"
    suffix="%"
    :value-style="{ color: 'var(--mp-color-danger)' }"
  >
    <template #prefix>▼</template>
  </mp-statistic>
</template>
```

### 等宽数字

开启 `tabular-nums` 后，每个数字字符占用相同宽度，适合数值频繁变化或纵向对齐的场景。对比相同位数的 `1111` 和 `8888`：比例数字的总宽度可能变化，等宽数字的总宽度保持稳定。

```html
<template>
  <mp-statistic title="比例数字" :value="1111" :value-style="{ fontVariantNumeric: 'proportional-nums' }" />
  <mp-statistic title="等宽数字" :value="1111" tabular-nums />
</template>
```

### 额外信息

通过 `extra` 或 `extra` 插槽在数值下方展示补充说明。

```html
<template>
  <mp-statistic title="Revenue" :value="9280" prefix="$" show-group-separator extra="Compared to yesterday +12.8%" />
  <mp-statistic title="New Users" :value="1280" show-group-separator>
    <template #extra>
      <span style="color: var(--mp-color-success)">较上周 +8.4%</span>
    </template>
  </mp-statistic>
</template>
```

### 数值动画

通过 `animation` 开启数值滚动动画，可用 `start` 控制播放时机。

```html
<script setup>
import { ref } from 'vue'

const started = ref(false)
</script>

<template>
  <mp-statistic
    title="Growth Rate"
    :value="50.52"
    :precision="2"
    :value-from="0"
    :start="started"
    suffix="%"
    animation
  >
    <template #prefix>▲</template>
  </mp-statistic>
  <mp-button status="primary" @click="started = true">开始</mp-button>
</template>
```

### 自定义数值

未传入 `value` 时，可用默认插槽自定义数值内容。例如嵌入 `CountTo`。

```html
<template>
  <mp-statistic title="Active Users">
    <mp-count-to :from="0" :to="125670" :duration="2000" />
  </mp-statistic>
  <mp-statistic title="Conversion Rate" suffix="%">
    <mp-count-to :from="0" :to="36.8" :duration="2000" :precision="1" />
  </mp-statistic>
</template>
```

### 倒计时

未传入 `value` 时，可用默认插槽嵌入 [Countdown](#/zh-CN/countdown)。

```html
<template>
  <mp-statistic title="Countdown">
    <mp-countdown :time="2 * 60 * 60 * 1000" />
  </mp-statistic>
  <mp-statistic title="Campaign">
    <mp-countdown :time="4 * 24 * 60 * 60 * 1000" format="DD 天 HH 时 mm 分 ss 秒" />
  </mp-statistic>
</template>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 数值展示的标题 | _string_ | `-` |
| `value` | 数值展示的值 | _number \| string \| Date_ | `-` |
| `prefix` | 数值前缀 | _string_ | `-` |
| `suffix` | 数值后缀 | _string_ | `-` |
| `format` | 数值展示的格式（日期模式使用） | _string_ | `HH:mm:ss` |
| `extra` | 额外的显示内容 | _string_ | `-` |
| `start` | 是否开始动画 | _boolean_ | `true` |
| `precision` | 小数保留位数（数字模式使用） | _number_ | `0` |
| `separator` | 进位分隔符（数字模式使用） | _string_ | `-` |
| `show-group-separator` | 是否展示进位分隔符（数字模式使用） | _boolean_ | `false` |
| `tabular-nums` | 是否使用等宽数字 | _boolean_ | `false` |
| `animation` | 是否开启动画 | _boolean_ | `false` |
| `animation-duration` | 动画的过渡时间 | _number_ | `2000` |
| `value-from` | 动画的起始值 | _number_ | `-` |
| `placeholder` | 提示文字（当 `value` 为 `undefined` 且未使用默认插槽时显示） | _string_ | `-` |
| `value-style` | 自定义显示值的样式 | _CSSProperties_ | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 自定义数值内容，未传入 `value` 时生效 | `-` |
| `title` | 标题 | `-` |
| `prefix` | 前缀 | `-` |
| `suffix` | 后缀 | `-` |
| `extra` | 额外内容 | `-` |

### 样式变量

以下为组件使用的 CSS 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--mp-statistic-title-color` | `var(--mp-color-text-3)` |
| `--mp-statistic-title-font-size` | `var(--mp-font-size-sm)` |
| `--mp-statistic-title-margin-bottom` | `8px` |
| `--mp-statistic-value-color` | `var(--mp-color-text-1)` |
| `--mp-statistic-value-font-size` | `28px` |
| `--mp-statistic-value-font-weight` | `500` |
| `--mp-statistic-decimal-font-size` | `inherit` |
| `--mp-statistic-prefix-color` | `var(--mp-color-text-2)` |
| `--mp-statistic-prefix-font-size` | `var(--mp-font-size-md)` |
| `--mp-statistic-prefix-spacing` | `4px` |
| `--mp-statistic-suffix-color` | `var(--mp-color-text-2)` |
| `--mp-statistic-suffix-font-size` | `var(--mp-font-size-md)` |
| `--mp-statistic-suffix-spacing` | `4px` |
| `--mp-statistic-extra-color` | `var(--mp-color-text-3)` |
| `--mp-statistic-extra-font-size` | `var(--mp-font-size-sm)` |
| `--mp-statistic-extra-margin-top` | `8px` |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

默认插槽动态出现/消失时同步切换占位文字；动画在卸载及 KeepAlive 停用时暂停。
