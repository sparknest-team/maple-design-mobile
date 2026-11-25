# 背景层

### 介绍

创建一个背景层，用于强调特定的页面元素。

## 基础示例

### 基本使用

通过 `open` 控制背景层显示，默认点击背景区域会将 `open` 设置为 `false`。

```demo
../example/demos/overlay-base.vue
```

## 内容与展示

### 嵌入内容

```demo
../example/demos/overlay-content.vue
```

## 交互与控制

### 点击事件

```demo
../example/demos/click-event.vue
```

## 使用说明

### 配置说明

以下为实际 :root 默认值。业务定制优先使用组件变量；内部定位变量不属于公开 API。

## API

### Overlay Props

| 参数               | 说明                                                   | 类型                           | 默认值   |
| ------------------ | ------------------------------------------------------ | ------------------------------ | -------- |
| `v-model:open`     | 是否显示背景层                                         | _boolean_                      | `false`  |
| `default-open`     | 非受控模式下是否默认显示                               | _boolean_                      | `false`  |
| `overlay-closable` | 点击背景区域是否关闭                                   | _boolean_                      | `true`   |
| `lock-scroll`      | 打开时锁定挂载容器的滚动。原地渲染时锁定所在文档的 body。 | _boolean_                      | `true`   |
| `unmount-on-close` | 关闭后是否卸载插槽内容                                 | _boolean_                      | `true`   |
| `popup-container`  | Teleport 挂载位置；`false` 表示原地渲染                | _string \| HTMLElement \| false_ | `'body'` |
| `esc-to-close`     | 是否支持键盘 ESC 关闭背景层                            | _boolean_                      | `true`   |
| `z-index`          | 自定义层级                                             | _number_                       | `-`      |

### Overlay Events

| 事件名       | 说明                | 参数            |
| ------------ | ------------------- | --------------- |
| `update:open` | 显示状态变化        | `boolean`       |
| `click`      | 点击背景层时触发    | `MouseEvent`    |
| `key-escape` | 点击键盘 ESC 时触发 | `KeyboardEvent` |
| `open`       | 开始打开时触发      | `-`             |
| `opened`     | 打开动画结束时触发  | `-`             |
| `close`      | 开始关闭时触发      | `-`             |
| `closed`     | 关闭动画结束时触发  | `-`             |

### Overlay Slots

| 插槽名    | 说明       | 参数 |
| --------- | ---------- | ---- |
| `default` | 背景层内容 | `-`  |

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-overlay-animation-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |
| `--mp-overlay-background-color` | `var(--mp-sys-color-scrim)` | `background-color` |
| `--mp-overlay-content-z-index` | `var(--mp-sys-layer-raised)` | `z-index` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-overlay-background-color: var(--mp-sys-color-scrim);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 减少动态效果

内置 CSS 过渡遵循 `prefers-reduced-motion: reduce`。关闭过渡不改变最终显隐、选中／展开状态及事件语义；插槽内自定义动画由应用自行控制。
