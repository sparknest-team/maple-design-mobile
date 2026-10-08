# 水波指令

### 介绍

元素点击时生成一个水波扩散的效果。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 自定义颜色

```demo
../example/demos/custom-color.vue
```

### 禁用状态

```demo
../example/demos/disabled-status.vue
```

### 样式引入

配置 MapleResolver 的指令解析时会自动引入 `@maplejs/maple-ui/ripple/style`。未使用 resolver、直接注册 Ripple 时，请在应用入口显式引入该样式。指令运行时代码不导入 CSS，以支持服务端包导入。卸载和禁用会取消待执行动画；每个实例独立维护键盘状态。

## API

### 选项

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `color` | `currentColor` | _string_ | `currentColor` |
| `disabled` | 禁用状态 | _boolean_ | `false` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` |
| `--ripple-color` | `currentColor` |

### 受管默认值

| Token | Default |
| --- | --- |
| `--mp-ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` |

### 动效变量

| Token | Default |
| --- | --- |
| `--mp-ripple-expand-duration` | `200ms` |
| `--mp-ripple-fade-duration` | `140ms` |

内置动效遵循 prefers-reduced-motion: reduce：保留内容与状态反馈，关闭装饰性旋转、扫光和波纹。Icon 名称切换跳过等待，并取消尚未结束的切换。Ripple 时长变量只控制 CSS，250ms 生命周期计时未改变，每段视觉时长应不超过 250ms；自定义动画类由调用方负责适配。
