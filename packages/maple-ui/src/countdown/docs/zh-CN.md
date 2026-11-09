# 倒计时

### Countdown 业务时钟与停用边界

Countdown 的 RAF 刷新业务剩余时间，不是视觉插值；CSS duration／减少动效不能改变业务计时。暂停与 KeepAlive 停用冻结剩余时间，重新激活按冻结值续跑，不把停用期间计入消耗。停用时更新 time／reset 可更新剩余数据及 change 通知，但不申请 RAF；auto-start 的启动延后到激活，手动 pause 取消待恢复。停用期间直接 start 被忽略，卸载后的 start／reset 不再通知或调度。

### 介绍

用于实时展示倒计时数值，支持毫秒精度。

`time` 为剩余时长（毫秒）。若要对准某个时刻，传入 `deadline - Date.now()`。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 内容与展示

### 嵌入 Statistic

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `time` | 倒计时时长（ms） | 嵌入 Statistic、时间格式与自定义内容 |
| `format` | 时间格式 | 嵌入 Statistic、时间格式与自定义内容 |
<!-- demo-config-notes:end -->

未传入 `value` 时，Statistic 可用默认插槽嵌入 Countdown。

```demo
../example/demos/embed-statistic.vue
```

### 时间格式与自定义内容

比较单位格式、毫秒显示和自定义时间片段。使用各示例中的时间字段检查最终文本，而非把精度与启动控制混在一起。

<details>
<summary>配置说明与使用限制</summary>

#### 自定义格式

通过 `format` 属性设置倒计时文本的内容。未出现的高位会累加到下一级。

#### 自定义样式

通过插槽自定义倒计时的样式，`timeData` 对象格式见下方表格。

#### 显示毫秒

通过 `S` / `SS` / `SSS` 展示毫秒。

</details>

```demo
../example/demos/format-comparison.vue
```

## 交互与控制

### 手动控制

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `time` | 倒计时时长（ms） | 手动控制 |
| `auto-start` | 是否自动开始倒计时 | 手动控制 |
| `format` | 时间格式 | 手动控制 |
<!-- demo-config-notes:end -->

设置 `auto-start` 为 `false`，通过 `start`、`pause`、`reset` 控制。倒计时结束时触发 `end`。

```demo
../example/demos/manual-control.vue
```

## API

`time` 是持续时长而非绝对到期时间；暂停和 KeepAlive 停用时剩余时长冻结。默认插槽直接接收 days、hours、minutes、seconds、milliseconds 五个字段；`change` 在重置及动画帧更新时触发，可能高频调用。`auto-start` 在挂载或 reset 时读取，单独切换不会启动或暂停。格式中的重复 token 均会替换；省略较大单位时会累计到较小单位，因此单独使用 `SSS` 可超过三位。

### Countdown Props

| 参数 | 说明 | 类型 | 默认值 |
| ----- | -------------- | -------- | ---------- |
| `time` | 倒计时时长（ms）| _string \| number_ | `0` |
| `format` | 时间格式 | _string_ | `HH:mm:ss` |
| `auto-start` | 是否自动开始倒计时 | _boolean_ | `true` |

### format 格式

| 格式 | 说明 |
| -- | --- |
| `DD` | 天数 |
| `HH` | 小时 |
| `mm` | 分钟 |
| `ss` | 秒数 |
| `S` | 毫秒（1位） |
| `SS` | 毫秒（2位） |
| `SSS` | 毫秒（3位） |

### Countdown Events

| 事件名 | 说明 | 回调参数 |
| ----- | -------------- | -------- |
| `end` | 倒计时结束时触发| `-` |
| `change` | 倒计时变化时触发| `timeData: TimeData` |

### Countdown Slots

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `default` | 自定义内容 | `timeData: TimeData` |

### TimeData 格式

| 名称 | 说明 | 类型 |
| ---- | ------- | -------- |
| `days` | 剩余天数 | `number` |
| `hours` | 剩余小时 | `number` |
| `minutes` | 剩余分钟 | `number` |
| `seconds` | 剩余秒数 | `number` |
| `milliseconds` | 剩余毫秒 | `number` |

### Countdown Methods

通过 ref 可以获取到 Countdown 实例并调用实例方法.

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `start` | 开始倒计时 | `-` | `-` |
| `pause` | 暂停倒计时 | `-` | `-` |
| `reset` | 重设倒计时，若 `auto-start` 为 `true`，重设后会自动开始倒计时 | `-` | `-` |

## 使用说明



SSR 输出初始格式化时间。暂停时修改 format 会更新显示；结束事件每轮只触发一次，reset 后可开始新一轮；卸载清理动画帧。

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-countdown-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-countdown-text-font-size` | `var(--mp-font-size-lg)` | `font-size` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-countdown-text-color: var(--mp-sys-color-content-primary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
