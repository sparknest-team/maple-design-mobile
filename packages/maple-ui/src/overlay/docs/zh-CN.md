# 背景层

## 案例

### 介绍

创建一个背景层，用于强调特定的页面元素。

### 基本使用

通过 `open` 控制背景层显示，默认点击背景区域会将 `open` 设置为 `false`。

```demo
../example/demos/overlay-base.vue
```

### 嵌入内容

```demo
../example/demos/overlay-content.vue
```

### 点击事件

```demo
../example/demos/click-event.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### 属性

| 参数               | 说明                                                   | 类型                           | 默认值   |
| ------------------ | ------------------------------------------------------ | ------------------------------ | -------- |
| `v-model:open`     | 是否显示背景层                                         | _boolean_                      | `false`  |
| `default-open`     | 非受控模式下是否默认显示                               | _boolean_                      | `false`  |
| `overlay-closable` | 点击背景区域是否关闭                                   | _boolean_                      | `true`   |
| `lock-scroll`      | 是否禁止滚动穿透，禁止时滚动背景层不会引发 body 的滚动 | _boolean_                      | `true`   |
| `unmount-on-close` | 关闭后是否卸载插槽内容                                 | _boolean_                      | `true`   |
| `popup-container`  | Teleport 挂载位置；`false` 表示原地渲染                | _string \| HTMLElement \| false_ | `'body'` |
| `esc-to-close`     | 是否支持键盘 ESC 关闭背景层                            | _boolean_                      | `true`   |
| `z-index`          | 自定义层级                                             | _number_                       | `-`      |

### 事件

| 事件名       | 说明                | 参数            |
| ------------ | ------------------- | --------------- |
| `update:open` | 显示状态变化        | `boolean`       |
| `click`      | 点击背景层时触发    | `MouseEvent`    |
| `key-escape` | 点击键盘 ESC 时触发 | `KeyboardEvent` |
| `open`       | 开始打开时触发      | `-`             |
| `opened`     | 打开动画结束时触发  | `-`             |
| `close`      | 开始关闭时触发      | `-`             |
| `closed`     | 关闭动画结束时触发  | `-`             |

### 插槽

| 插槽名    | 说明       | 参数 |
| --------- | ---------- | ---- |
| `default` | 背景层内容 | `-`  |

## 公开 CSS 变量

以下为实际 :root 默认值。业务定制优先使用组件变量；内部定位变量不属于公开 API。

| 变量 | 默认值 | 意义与场景 |
| --- | --- | --- |
| `--mp-overlay-background-color` | `var(--mp-sys-color-scrim)` | 仅遮罩背景，不影响前景内容透明度 |
| `--mp-overlay-animation-duration` | `var(--mp-sys-motion-duration-slow)` | 组件入退场时长；reduced-motion 可覆盖 |
| `--mp-overlay-content-z-index` | `var(--mp-sys-layer-raised)` | 内容高于遮罩的局部层级 |

### 减少动态效果

内置 CSS 过渡遵循 `prefers-reduced-motion: reduce`。关闭过渡不改变最终显隐、选中／展开状态及事件语义；插槽内自定义动画由应用自行控制。
