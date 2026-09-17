# 数字动画

### 介绍

展示起始数值到目标数值的数字动画。

### 基本使用

通过 `from` 和 `to` 属性指定起始数值和目标数值。

```demo
../example/demos/basic-usage.vue
```

### 精度

通过 `precision` 控制数值精度

```demo
../example/demos/precision.vue
```

### 自定义时长

通过 `duration` 属性指定动画时长（单位为毫秒）。

```demo
../example/demos/custom-duration.vue
```

### 自定义样式

```demo
../example/demos/custom-style.vue
```

### 自定义动画曲线

通过 `timing-function` 属性指定动画曲线。

```demo
../example/demos/custom-animation-curve.vue
```

### 手动控制

调用 `start`、`pause`、`reset` 方法，手动控制动画的开始、暂停、重置。

```demo
../example/demos/manual-control.vue
```

## API

### 属性

| 参数         | 说明                       | 类型               | 默认值  |
| ------------ | -------------------------- | ------------------ | ------- |
| `from`       | 起始值                     | _number \| string_ | `0`     |
| `to`         | 目标值                     | _number \| string_ | `0`     |
| `duration`   | 动画持续时间（单位：毫秒） | _number \| string_ | `2000` |
| `precision`   | 精度 | _number \| string_ | `0` |
| `auto-start` | 是否自动开始播放动画       | _boolean_          | `true`  |
| `timing-function` | 动画曲线函数       | _(v: number) => number_          | `-`  |

### 事件

| 事件名     | 说明           | 回调参数 |
| ---------- | -------------- | -------- |
| `end` | 动画结束时触发 | `-`      |

### 插槽

| 插槽名    | 说明       | 参数                     |
| --------- | ---------- | ------------------------ |
| `default` | 自定义内容 | `value: number` |

### 方法

| 方法名  | 说明                                                      | 参数 | 返回值 |
| ------- | --------------------------------------------------------- | ---- | ------ |
| `start` | 开始动画                                                | `-`  | `-`    |
| `pause` | 暂停动画                                                | `-`  | `-`    |
| `reset` | 重置动画，若 `auto-start` 为 `true`，重置后会自动开始播放 | `-`  | `-`    |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                         | 默认值 |
|-----------------------------| --- |
| `--mp-count-to-text-color`     | `var(--mp-color-text)`  |
| `--mp-count-to-text-font-size` | `var(--mp-font-size-lg)` |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

动画在卸载及 KeepAlive 停用时暂停，重新激活后恢复；各实例的数值和动画状态独立。
