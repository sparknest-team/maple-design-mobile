# 浮动面板

## 案例

### 介绍
浮动在页面底部的面板，常用于提供额外的功能或信息，用户可灵活上下滑动浏览内容。

### 基本使用

演示面板限制在 400px 高的独立容器中，不覆盖文档页面；使用 `popup-container=false` 与局部固定定位包含块。业务页面不传该属性时仍默认浮动在窗口底部。自定义锚点为 80、180、320px；“仅头部拖拽”中内容只滚动，不改变面板高度。

```demo
../example/demos/basic.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### 属性

| 参数              | 说明                                                             | 类型     | 默认值        |
|------------------|----------------------------------------------------------------- |----------|----------------|
| `v-model:anchor`    | 面板初始显示锚点，如果不传则为 `anchors` 属性的第一个值 | _number_ | `-`  |
| `anchors`           | 自定义锚点，单位为 `px` | _number[]_ | `[100, window.innerHeight * 0.6]`  |
| `content-draggable` | 是否允许拖拽面板内容       | _boolean_ | `true`  |
| `duration`          | 动画时长，单位为 `ms`          | _number \| string_ | `300`  |
| `elevation`         | 海拔高度，可选值为 `true`、`false` 和 `0-24` 的等级                                                            | _number \| boolean_ | `true`            |
| `popup-container`          | 弹出层挂载的位置              | _TeleportProps['to'] \| false_ | `body`  |
| `safe-area`         | 是否开启底部安全区适配        | _boolean_ | `false`  |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `anchor-change` | 移动到某个锚点后触发 | `height: number` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 自定义面板内容 |  `-` |
| `header` ***3.2.12*** | 自定义面板标头 |  `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--floating-panel-z-index` | `999` |
| `--floating-panel-border-top` | `none` |
| `--floating-panel-border-radius` | `0` |
| `--mp-floating-panel-background` | `var(--mp-sys-color-surface-overlay)` |
| `--floating-panel-header-height` | `40px` |
| `--floating-panel-toolbar-width` | `20px` |
| `--floating-panel-toolbar-height` | `3px` |
| `--floating-panel-toolbar-border-radius` | `10px` |
| `--floating-panel-toolbar-background` | `#ddd` |
| `--floating-panel-transition-timing-function` | `cubic-bezier(0.18, 0.89, 0.32, 1.28)` |
