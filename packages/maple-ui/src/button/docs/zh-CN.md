# Button

两端使用同一份实现和示例，组件前缀、主题基础变量与注册入口各自保留。

## 案例

### 八种主题色

```demo
../example/demos/basic.vue
```

### 四种变体

```demo
../example/demos/variants.vue
```

### 五档尺寸

```demo
../example/demos/size.vue
```

### 禁用与链接拦截

```demo
../example/demos/disabled.vue
```

### 加载布局与动画

```demo
../example/demos/loading.vue
```

### 同步、异步与失败恢复

```demo
../example/demos/auto-loading.vue
```

### 块级按钮

```demo
../example/demos/block.vue
```

### 颜色、水波与阴影

```demo
../example/demos/custom-color.vue
```

### 图标插槽与圆形按钮

```demo
../example/demos/round.vue
```

### 图标文字堆叠

```demo
../example/demos/stacked.vue
```

### 按钮组继承与覆盖

```demo
../example/demos/button-group.vue
```

### 原生表单、焦点与触摸事件

```demo
../example/demos/native-events.vue
```

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 主题色；省略时继承按钮组，否则 default | `SemanticStatus` | `undefined` |
| variant | 外观；省略时继承按钮组，否则 default | `default / text / outline / tonal` | `undefined` |
| size | 尺寸；省略时继承按钮组，否则 md | `xs / sm / md / lg / xl` | `undefined` |
| html-type | 原生按钮类型 | `button / submit / reset` | `button` |
| component | 根标签，链接属性通过 attrs 传入 | `button / a` | `button` |
| round | 圆形按钮 | `boolean` | `false` |
| block | 占满可用宽度 | `boolean` | `false` |
| loading | 加载状态，禁止点击和链接跳转 | `boolean` | `false` |
| loading-type | 加载动画；与 Loading 的 type 相同 | `circle / wave / cube / rect / disappear` | `circle` |
| loading-mode | 行内、覆盖或底部进度线 | `default / fill / line` | `default` |
| loading-size | 加载动画尺寸；省略时使用按钮尺寸，行内图标替换使用 xs | `ComponentSize / number` | `undefined` |
| loading-color | 加载指示器颜色 | `string` | `currentColor` |
| loading-radius | circle 动画半径 | `string / number` | `undefined` |
| auto-loading | 等待 click/touchstart 返回的 Promise；同步回调不闪 loading | `boolean` | `false` |
| icon-container | 图标容器外观 | `boolean` | `false` |
| disabled | 禁用；省略时继承按钮组，显式 false 可覆盖 | `boolean` | `undefined` |
| ripple | 点击水波 | `boolean` | `true` |
| focusable | 允许 Tab 顺序聚焦；不影响通过代码聚焦 | `boolean` | `true` |
| autofocus | 原生自动聚焦 | `boolean` | `false` |
| text-color | 自定义文字色 | `string` | `undefined` |
| color | 自定义背景／变体基色 | `string` | `undefined` |
| elevation | default 变体阴影；true 为 2，false 关闭，数字四舍五入并限制 0～24；组内由组控制 | `boolean / number` | `true` |
| stacked | 图标文字纵向排列；省略时继承按钮组 | `boolean` | `undefined` |

### Events

| 事件 | 参数与行为 |
| --- | --- |
| click | `(event: Event) => void / Promise<unknown>` |
| touchstart | `(event: Event) => void / Promise<unknown>` |

事件处理函数可返回 Promise，也支持多个监听器。auto-loading 会等待全部监听器完成，即使某个提前拒绝也不会提前解除禁用。卸载或 KeepAlive 停用会使旧异步结果失效。内部直接读取监听器返回值，不再二次 emit。原生 focus/blur 等事件透传。禁用／加载中的 click 会阻止跳转与冒泡。

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 按钮内容；加载时保留 | — |
| icon | 前置图标；stacked 时位于文字上方 | — |

### Methods

无自定义公开方法。
<!-- same-source-api:end -->

## ButtonGroup

属性：size=md、status=default、variant=default、color/text-color=undefined、disabled/stacked/vertical=false、elevation=true。使用 default 插槽，公开 buttonGroupProvider（响应式组配置），没有自定义事件。子按钮按字段覆盖组配置；阴影由组整体控制。

## 迁移

Cedar 原 loading-type=default/fill/line 改为 loading-mode=default/fill/line；loading-type 现在选择加载动画。Maple 如需原覆盖式布局，设置 loading-mode=fill。两端 ripple、focusable 默认均为 true。样式变量采用统一 Button token 名称（--c-/--mp- 前缀），完整变量见 style/token.less。

## 类型

ButtonProps、ButtonVariant、ButtonLoadingMode、ButtonHandler、ButtonInstance、ButtonGroupProps、ButtonGroupInstance。
