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

### 长时长动效 Token

```demo
../example/demos/motion-token.vue
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
| `--mp-ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` |
| `--mp-ripple-color` | `currentColor` |

### 受管默认值

| Token | Default |
| --- | --- |
| `--mp-ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` |

### 动效变量

| Token | Default |
| --- | --- |
| `--mp-ripple-expand-duration` | `200ms` |
| `--mp-ripple-fade-duration` | `140ms` |

expand-duration 控制 transform 扩散，cubic-bezier 是扩散曲线；fade-duration 控制 opacity 显现／消退（线性）。变量放在指令实际宿主上，由生成的波纹继承；color 选项优先于 ripple-color。两端默认值同为 200ms／140ms。

250ms 是最小展示与淡出后移除等待，不是视觉时长或整个生命周期。运行时读取实际波纹计算后的 duration/delay：淡出不早于创建+250ms 或激活+扩散时长的较晚者；删除等待 max(250ms, 消退时长)。600ms／800ms 覆写不再被截断。0ms／无样式仍保留清理下限，prefers-reduced-motion: reduce 隐藏装饰波纹而不改变宿主业务事件。扩散在创建／激活、消退在淡出开始时采样，不保证任意中途 CSS 改动或自定义 animation。

重复释放不重复排队；禁用／卸载清理所属定时器与直接子波纹，不误删嵌套实例。文档监听绑定挂载时 ownerDocument，跨文档搬迁后重绑不在范围内。Enter／Space 在本宿主触发，仅对应 keyup 或 blur 结束；普通 div 必须自行提供交互语义、键盘能力和可访问名称，v-ripple 本身不提供这些。真实触摸设备、OS 偏好切换仍未验收。

### 独立同源指令

Cedar 与 Maple 独立维护相同指令主体、动画及键盘生命周期，只调整本地依赖、命名空间与 Token 默认值。复制门禁同时编译两端实际样式入口并检查声明和消费，不将样式 import 误判为运行时逻辑差异。
