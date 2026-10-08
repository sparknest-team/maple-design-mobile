# Badge

与 Cedar 使用相同场景、参数和交互顺序；示例源码仅替换组件前缀，主题与站点外壳各自保留。

## 案例

### 基础用法

```demo
../example/demos/basic.vue
```

### 内联与独立展示

```demo
../example/demos/inline.vue
```

### 小圆点

```demo
../example/demos/dot.vue
```

### 自定义内容

```demo
../example/demos/content.vue
```

### 最大值与零值

```demo
../example/demos/max.vue
```

### 状态和颜色

```demo
../example/demos/color.vue
```

### 五种尺寸

```demo
../example/demos/size.vue
```

### 位置与偏移

```demo
../example/demos/position.vue
```

### 显示与隐藏

```demo
../example/demos/show.vue
```

### 实心与描边

```demo
../example/demos/variant.vue
```

## API

<!-- same-source-api:start -->
### Props

| 参数名          | 描述                                                                               | 类型                                                           |   默认值    |
| --------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------- | :---------: |
| description     | 徽标的描述文本                                                                     | `string`                                                       |     `-`     |
| content         | 徽标显示的内容                                                                     | `number \| string`                                             |     `-`     |
| max             | 徽标最大显示数值，如果content超过这个数值会显示为`${max}+`，content 为数字时有效。 | `number`                                                       |    `99`     |
| dot             | 显示为小红点                                                                       | `boolean`                                                      |   `false`   |
| offset-x        | 设置徽标位置的偏移X，mode为inline时无效。                                          | `number`                                                       |     `0`     |
| offset-y        | 设置徽标位置的偏移Y。                                                              | `number`                                                       |     `0`     |
| color           | 徽标的背景色，也可以设置自定义色值                                                 | `string`                                                       |     `-`     |
| text-color      | 徽标显示的内容颜色                                                                 | `string`                                                       |     `-`     |
| mode            | 徽标的类型                                                                         | `'floating' \| 'inline'`                                       | `floating`  |
| position        | 徽标物理位置（RTL 下不翻转），mode 为 floating 时有效                               | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'left' \| 'right'` | `top-right` |
| inline-position | 徽标的位置，mode 为 inline 时有效                                                  | `'start' \| 'end'`                                             |    `end`    |
| size            | 徽标的尺寸                                                                         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                         |    `md`     |
| status          | 徽标的状态                                                                         | `SemanticStatus`                                               |  `danger`   |
| show            | 是否显示徽标                                                                       | `boolean`                                                      |   `true`    |
| show-zero       | 徽标为0时是否显示                                                                  | `boolean`                                                      |   `false`   |
| variant         | 徽标的变体                                                                         | `'outline' \| 'default'`                                       |  `default`  |

### Events

无组件自定义事件。

### Slots

| 插槽名  | 说明             | 参数 |
| ------- | ---------------- | ---- |
| default | 徽标的描述文本   | -    |
| content | 徽标中显示的内容 | -    |

### Methods

无公开方法。

### 跨端说明

属性和插槽契约一致。没有 default 插槽且 description 为空时自动独立内联展示；未提供 content 时显示圆点。两端分别通过各自配置读取文字方向，主题颜色和 CSS 前缀由各端提供。
<!-- same-source-api:end -->

## 类型定义

```ts
type SemanticStatus = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'tertiary'
type BadgeVariant = 'default' | 'outline'
type BadgeMode = 'floating' | 'inline'
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right'
type BadgeInlinePosition = 'start' | 'end'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

## 样式变量

以下是全部公开 Badge 变量及默认值：

| 变量 | 默认值 |
| --- | --- |
| `--mp-badge-font-weight` | `var(--mp-sys-font-weight-medium)` |
| `--mp-badge-description-size-xs-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-description-size-sm-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-description-size-md-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-badge-description-size-lg-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-badge-description-size-xl-font-size` | `var(--mp-sys-font-size-xl)` |
| `--mp-badge-description-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-badge-size-xs-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-sm-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-md-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-lg-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-badge-size-xl-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-badge-size-xs-scale` | `0.6667` |
| `--mp-badge-size-sm-scale` | `0.8333` |
| `--mp-badge-size-md-scale` | `1` |
| `--mp-badge-size-lg-scale` | `1` |
| `--mp-badge-size-xl-scale` | `1` |
| `--mp-badge-size-xs-dot-width` | `4px` |
| `--mp-badge-size-sm-dot-width` | `5px` |
| `--mp-badge-size-md-dot-width` | `6px` |
| `--mp-badge-size-lg-dot-width` | `7px` |
| `--mp-badge-size-xl-dot-width` | `8px` |
| `--mp-badge-size-xs-dot-height` | `4px` |
| `--mp-badge-size-sm-dot-height` | `5px` |
| `--mp-badge-size-md-dot-height` | `6px` |
| `--mp-badge-size-lg-dot-height` | `7px` |
| `--mp-badge-size-xl-dot-height` | `8px` |
| `--mp-badge-size-xs-space` | `0px` |
| `--mp-badge-size-sm-space` | `var(--mp-sys-space-1)` |
| `--mp-badge-size-md-space` | `var(--mp-sys-space-3)` |
| `--mp-badge-size-lg-space` | `var(--mp-sys-space-3)` |
| `--mp-badge-size-xl-space` | `var(--mp-sys-space-4)` |
| `--mp-badge-size-xs-padding` | `0 var(--mp-sys-space-3)` |
| `--mp-badge-size-sm-padding` | `0 var(--mp-sys-space-3)` |
| `--mp-badge-size-md-padding` | `0 var(--mp-sys-space-4)` |
| `--mp-badge-size-lg-padding` | `0 var(--mp-sys-space-4)` |
| `--mp-badge-size-xl-padding` | `0 10px` |
| `--mp-badge-size-xs-height` | `20px` |
| `--mp-badge-size-sm-height` | `20px` |
| `--mp-badge-size-md-height` | `24px` |
| `--mp-badge-size-lg-height` | `28px` |
| `--mp-badge-size-xl-height` | `32px` |
| `--mp-badge-size-xs-border-radius` | `20px` |
| `--mp-badge-size-sm-border-radius` | `20px` |
| `--mp-badge-size-md-border-radius` | `24px` |
| `--mp-badge-size-lg-border-radius` | `28px` |
| `--mp-badge-size-xl-border-radius` | `32px` |
| `--mp-badge-bg-color` | `var(--mp-sys-color-status-danger)` |
| `--mp-badge-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-default-bg-color` | `#e0e0e0` |
| `--mp-badge-status-default-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-info-bg-color` | `var(--mp-sys-color-status-info)` |
| `--mp-badge-status-info-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-success-bg-color` | `var(--mp-sys-color-status-success)` |
| `--mp-badge-status-success-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-warning-bg-color` | `var(--mp-sys-color-status-warning)` |
| `--mp-badge-status-warning-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-danger-bg-color` | `var(--mp-sys-color-status-danger)` |
| `--mp-badge-status-danger-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-primary-bg-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-badge-status-primary-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-secondary-bg-color` | `rgb(var(--mp-gray-6))` |
| `--mp-badge-status-secondary-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-tertiary-bg-color` | `rgb(var(--mp-gray-7))` |
| `--mp-badge-status-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-variant-outline-bg-color` | `transparent` |
| `--mp-badge-variant-outline-text-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-badge-variant-outline-status-info-text-color` | `var(--mp-sys-color-content-info)` |
| `--mp-badge-variant-outline-status-success-text-color` | `var(--mp-sys-color-content-success)` |
| `--mp-badge-variant-outline-status-warning-text-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-badge-variant-outline-status-danger-text-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-badge-variant-outline-status-primary-text-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-badge-variant-outline-status-default-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-badge-variant-outline-status-secondary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-badge-variant-outline-status-tertiary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-badge-border-color` | `var(--mp-sys-color-surface-default)` |
| `--mp-badge-offset` | `2px` |
| `--mp-badge-ring-width` | `2px` |

填充徽标按背景选择前景：亮色状态底用 `content-on-bright`；浅色主题的深灰 tertiary 用 `content-on-dark`，暗色主题的亮灰 tertiary 用 `content-on-bright`。两端的 Maple 浅色品牌均为深橙 primary 配置 `content-on-dark`。默认危险红 `var(--mp-sys-color-status-danger)` 与中性背景 `#e0e0e0` 是组件视觉值。

轮廓文字和描边使用 `content-brand/info/success/warning/danger`，适配普通中性表面；secondary 与 tertiary 轮廓均使用 `content-secondary` 保持可读性。`variant-outline-bg-color` 对所有状态均生效，默认透明。`color` 属性覆盖轮廓文字和描边，`text-color` 进一步覆盖文字；二者均保留背景变量的控制权。自定义前景或背景后须重新验证对比度。

### 颜色覆盖边界

bg-color 兜底引用 system status-danger。中性固定浅灰与 secondary/tertiary 灰阶是有意的组件配色；border-color 隔离环可按宿主表面覆盖。自定义 color/text-color 由调用方保证对比度。
