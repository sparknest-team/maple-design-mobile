# 加载

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

### 介绍

加载组件，用于数据加载时执行动画。

## 外观与状态

### 加载图形、尺寸与颜色

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `size` | loading 的大小，可选值为 `xs` `sm` `md` `lg` `xl`，也支持数字 | 加载图形、尺寸与颜色 |
| `type` | loading 的类型，可选值为 `circle` `wave` `cube` `rect` `disappear` | 加载图形、尺寸与颜色 |
| `color` | loading 的颜色 | 加载图形、尺寸与颜色 |
<!-- demo-config-notes:end -->

对比相同加载状态的图形、尺寸和颜色；容器遮罩与指令用法保持独立。

```demo
../example/demos/appearance-comparison.vue
```

## 布局与排列

### 包裹内容

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `tip` | loading 的提示文字 | 包裹内容 |
| `loading` | 存在内容时 loading 是否显示 | 包裹内容 |
<!-- demo-config-notes:end -->

```demo
../example/demos/wrap.vue
```

## 内容与展示

### 加载指令

两种指令示例分别维护加载状态，控件与宿主卡片通过 `Space direction="column"` 纵向排列；关闭一个不会影响另一个遮罩。


`v-mp-loading` 支持布尔值简写，也支持 `{ loading, tip, type, size, radius, color, hideIcon, fullscreen, background }` 配置对象。对象形式中的 `loading` 控制加载状态，其余组件选项与 `Loading` Props 保持一致。

#### 注册方式

`v-mp-loading` 使用 Maple 内置的 `Loading` 组件渲染指示器。`mp-` 前缀可以避免与其他组件库的同名指令冲突，使用前可通过以下任一方式注册。


使用 `MapleResolver()` 时，`unplugin-vue-components` 会自动解析模板中的 `v-mp-loading`；`directives: false` 会关闭指令自动解析。

> 包裹模式通过将默认插槽内容设为 `opacity: 0.38` 展示加载状态。指令不改变宿主 DOM 结构，因此在宿主内插入内置 Loading VNode，并使用等效的半透明背景遮罩。

```demo
../example/demos/directive.vue
```

## API

### 属性

| 参数      | 说明                                                               | 类型               | 默认值   |
| --------- | ------------------------------------------------------------------ | ------------------ | -------- |
| `color`   | loading 的颜色                                                     | _string_           | `-`      |
| `type`    | loading 的类型，可选值为 `circle` `wave` `cube` `rect` `disappear` | _string_           | `circle` |
| `size`    | loading 的大小，可选值为 `xs` `sm` `md` `lg` `xl`，也支持数字      | _string \| number_ | `md`     |
| `tip`     | loading 的提示文字                                                 | _string_           | `-`      |
| `loading` | 存在内容时 loading 是否显示                                        | _boolean_          | `false`  |
| `radius`  | loading 的类型为 `circle` 时，可设置其半径大小                     | _string \| number_ | `-`      |
| `hide-icon` | 是否隐藏加载指示器 | _boolean_ | `false` |

### 插槽

| 插槽名    | 说明                   | 参数 |
| --------- | ---------------------- | ---- |
| `default` | `loading` 包裹着的内容 | `-`  |
| `tip`     | `loading` 的提示文字   | `-`  |
| `icon`    | 自定义加载指示器     | `-`  |

`icon` 插槽替换全部内置 `type` 动画，不会与内置动画同时显示。`hide-icon=true` 隐藏所有指示器，提示内容仍可显示。

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                  | 默认值                 |
| ----------------------- | ---------------------- |
| `--loading-color`       | `var(--color-primary)` |
| `--loading-opacity`     | `0.38`                 |
| `--loading-desc-margin` | `8px 0 0`              |
| `--loading-desc-color`  | `var(--color-primary)` |

加载指令的遮罩会阻止点击默认行为和冒泡，点击遮罩不会触发 Card 或父级的普通 `@click`；关闭加载后恢复正常点击。遮罩不会禁用底层控件的键盘操作，如需完全禁止操作，请同时设置控件的 `disabled`。

### 覆盖层样式

| 变量 | 说明 |
| --- | --- |
| `--mp-loading-overlay-background` | 指令覆盖层背景色；background 选项可覆盖该值。 |

内容覆盖层类名：`.mp-loading__content-overlay`。

指令每次更新都替换完整配置，省略的选项以及布尔值 `true` 使用默认值。加载中修改 `fullscreen` 会在宿主与所属文档的 body 之间迁移遮罩，宿主内容保持原位。多个全屏实例按数量持有滚动锁：关闭局部实例不会解除全屏锁，最后一个全屏实例结束时保留外部原有的锁类。
