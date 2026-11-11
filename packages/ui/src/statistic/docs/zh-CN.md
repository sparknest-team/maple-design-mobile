# 统计数值

### 介绍

突出展示某个或某组数字、带描述的统计类数据。

倒计时请使用独立的 [Countdown](#/zh-CN/countdown) 组件；滚动数字也可嵌入 [CountTo](#/zh-CN/count-to)。

## 基础示例

### 基本使用

通过 `title` 展示描述，通过 `value` 展示数值。`value` 支持数字或字符串。

```demo
../example/demos/basic-usage.vue
```

## 内容与展示

### 等宽数字

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `title` | 数值展示的标题 | 等宽数字、额外信息、数值动画 |
| `value` | 数值展示的值 | 等宽数字、额外信息、数值动画 |
| `suffix` | 数值后缀 | 等宽数字、数值动画 |
| `value-style` | 自定义显示值的样式 | 等宽数字 |
| `tabular-nums` | 是否使用等宽数字 | 等宽数字 |
| `prefix` | 数值前缀 | 额外信息 |
<!-- demo-config-notes:end -->

开启 `tabular-nums` 后，每个数字字符占用相同宽度，适合数值频繁变化或纵向对齐的场景。对比相同位数的 `1111` 和 `8888`：比例数字的总宽度可能变化，等宽数字的总宽度保持稳定。

```demo
../example/demos/tabular-nums.vue
```

### 额外信息

通过 `extra` 或 `extra` 插槽在数值下方展示补充说明。

```demo
../example/demos/extra.vue
```

### 数值动画

通过 `animation` 开启数值滚动动画，可用 `start` 控制播放时机。

本例“开始”将父级 `start` 从 `false` 改为 `true`，从 `value-from` 播放到目标值；重复点击不会重播。`start=false` 暂停，随后切回 `true` 会从 `value-from` 重新播放，不是从暂停位置继续。需要可重播按钮时，由父级先设为 `false`，等待一次 Vue 更新后再设为 `true`。

```demo
../example/demos/animation.vue
```

### 倒计时

未传入 `value` 时，可用默认插槽嵌入 [Countdown](#/zh-CN/countdown)。

```demo
../example/demos/countdown.vue
```

## 自定义与插槽

### 前缀 / 后缀

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `title` | 数值展示的标题 | 前缀 / 后缀、自定义数值 |
| `suffix` | 数值后缀 | 前缀 / 后缀、自定义数值 |
| `value` | 数值展示的值 | 前缀 / 后缀 |
| `prefix` | 数值前缀 | 前缀 / 后缀 |
| `show-group-separator` | 是否展示进位分隔符（数字模式使用） | 前缀 / 后缀 |
| `precision` | 小数保留位数（数字模式使用） | 前缀 / 后缀 |
<!-- demo-config-notes:end -->

通过 `prefix` / `suffix` 或同名插槽为数值添加单位、货币符号或趋势。

```demo
../example/demos/prefix-suffix.vue
```

### 自定义数值

未传入 `value` 时，可用默认插槽自定义数值内容。例如嵌入 `CountTo`。

```demo
../example/demos/custom-value.vue
```

## 动画时长边界

时长为有限非负毫秒数。0 在下一帧到达目标；负数、NaN 和无穷值会产生开发环境属性诊断，并安全地按 0 处理，不会持续请求动画帧。下一帧执行前暂停或卸载会取消本次完成。启用数值动画时，修改 animation-duration 按已有规则重新播放。

## API

`precision` 支持 0–100 的整数，无效值回退为 0。数值格式使用 JavaScript 二进制数和舍入，不能替代精确的财务计算；特别大的数可能以科学计数法显示，动画端点差值溢出时直接显示最终值。数值分组使用 en-US 规则，`separator` 可替换分组逗号，小数点固定为点；日期按本地时间格式化。非有限数值会提示且按原值显示，不参与动画；无效动画起点回退为 0，无效时长按 0 处理并在下一帧结束。

### Statistic Props

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

### Statistic Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 自定义数值内容，未传入 `value` 时生效 | `-` |
| `title` | 标题 | `-` |
| `prefix` | 前缀 | `-` |
| `suffix` | 后缀 | `-` |
| `extra` | 额外内容 | `-` |

## 使用说明



默认插槽动态出现/消失时同步切换占位文字；动画在卸载及 KeepAlive 停用时暂停。

### 动画配置与生命周期

`start=true` 时，动态开启 `animation`、更改数字目标、`valueFrom` 或 `animationDuration` 会从当前配置的起点重播；只改精度、分隔符等格式不会重播。关闭动画或切换为字符串/日期立即展示目标值并停止调度帧。`start=false` 暂停当前数值，后续显式切回 `true` 重播；暂停时改配置只准备新起点，不调度帧。KeepAlive 停用暂停，配置未变则激活后续跑；配置改变则激活时重新同步。卸载释放调度帧。

## CSS Variables

以下为组件使用的 CSS 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-statistic-decimal-font-size` | `inherit` | `font-size` |
| `--mp-statistic-extra-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-statistic-extra-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-statistic-extra-margin-top` | `8px` | `margin-top` |
| `--mp-statistic-prefix-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-statistic-prefix-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-statistic-prefix-spacing` | `4px` | `margin-inline-end` |
| `--mp-statistic-suffix-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-statistic-suffix-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-statistic-suffix-spacing` | `4px` | `margin-inline-start` |
| `--mp-statistic-title-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-statistic-title-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-statistic-title-margin-bottom` | `8px` | `margin-bottom` |
| `--mp-statistic-value-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-statistic-value-font-size` | `28px` | `font-size` |
| `--mp-statistic-value-font-weight` | `500` | `font-weight` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-statistic-decimal-font-size: inherit;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
