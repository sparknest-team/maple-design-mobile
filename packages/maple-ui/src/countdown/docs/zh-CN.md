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

### 属性

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

### 事件

| 事件名 | 说明 | 回调参数 |
| ----- | -------------- | -------- |
| `end` | 倒计时结束时触发| `-` |
| `change` | 倒计时变化时触发| `timeData: TimeData` |

### 插槽

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

### 方法

通过 ref 可以获取到 Countdown 实例并调用实例方法.

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `start` | 开始倒计时 | `-` | `-` |
| `pause` | 暂停倒计时 | `-` | `-` |
| `reset` | 重设倒计时，若 `auto-start` 为 `true`，重设后会自动开始倒计时 | `-` | `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                         | 默认值 |
|-----------------------------| --- |
| `--mp-countdown-text-color`     | `var(--mp-sys-color-content-primary)` |
| `--mp-countdown-text-font-size` | `var(--mp-font-size-lg)` |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

SSR 输出初始格式化时间。暂停时修改 format 会更新显示；结束事件每轮只触发一次，reset 后可开始新一轮；卸载清理动画帧。
