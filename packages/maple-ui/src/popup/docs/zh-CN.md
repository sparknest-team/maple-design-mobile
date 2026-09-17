# 弹出层

### 介绍

创建一个可以从上、下、左、右、中心弹出的容器，用于展示信息。默认使用 `popupContainer` 插入到 `body` 尾部。

### 弹出位置

```demo
../example/demos/popup-position.vue
```

### 背景层样式

```demo
../example/demos/overlay-style.vue
```

### 注册事件

```demo
../example/demos/event.vue
```

## API

### 属性

| 参数                   | 说明                                                      | 类型                           | 默认值   |
| ---------------------- | --------------------------------------------------------- | ------------------------------ | -------- |
| `v-model:open`         | 是否显示弹出层                                            | _boolean_                      | `false`  |
| `position`             | 弹出位置，可选值为 `top` `bottom` `right` `left` `center` | _string_                       | `center` |
| `overlay`              | 是否显示背景层                                            | _boolean_                      | `true`   |
| `overlay-class`        | 自定义背景层的 class                                      | _string_                       | `-`      |
| `overlay-style`        | 自定义背景层的 style                                      | _object_                       | `-`      |
| `default-style`        | 是否启用默认样式                                          | _boolean_                      | `true`   |
| `transition`           | 过渡动画的名称                                            | _string_                       | `-`      |
| `lock-scroll`          | 是否禁止滚动穿透，禁止时滚动弹出层不会引发 body 的滚动    | _boolean_                      | `true`   |
| `overlay-closable`     | 是否点击背景层关闭弹出层                                  | _boolean_                      | `true`   |
| `esc-to-close`         | 是否支持键盘 ESC 关闭弹出层                               | _boolean_                      | `true`   |
| `popup-container`       | 弹出层挂载的位置                                          | _TeleportProps['to'] \| false_ | `body`   |
| `safe-area`            | 是否开启底部安全区适配                                    | _boolean_                      | `false`  |
| `safe-area-top`        | 是否开启顶部安全区适配                                    | _boolean_                      | `false`  |
| `z-index` _**3.3.10**_ | 元素 z-index                                              | _number_                       | `-`      |

### 事件

| 事件名          | 说明                     | 参数            |
| --------------- | ------------------------ | --------------- |
| `open`          | 打开弹出层时触发         | `-`             |
| `opened`        | 打开弹出层动画结束时触发 | `-`             |
| `close`         | 关闭弹出层时触发         | `-`             |
| `closed`        | 关闭弹出层动画结束时触发 | `-`             |
| `click-overlay` | 点击背景层时触发         | `MouseEvent`    |
| `key-escape`    | 按下 ESC 时触发          | `KeyboardEvent` |

### 插槽

| 插槽名    | 说明       | 参数 |
| --------- | ---------- | ---- |
| `default` | 弹出层内容 | `-`  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                             | 默认值              |
| ---------------------------------- | ------------------- |
| `--popup-overlay-background-color` | `rgba(0, 0, 0, .6)` |
| `--popup-content-background-color` | `var(--color-bg-1)` |
