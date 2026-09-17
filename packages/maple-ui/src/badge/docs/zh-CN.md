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

组件提供了下列 CSS 变量，可用于自定义样式。

### 通用

| 名称 | 默认值 |
| --- | --- |
| `--mp-badge-font-weight` | `500` |
| `--mp-badge-bg-color` | `#ef4444` |
| `--mp-badge-text-color` | `#ffffff` |
| `--mp-badge-description-text-color` | `var(--mp-color-text-1)` |

### 尺寸（`xs / sm / md / lg / xl`）

| 名称 |
| --- |
| `--mp-badge-size-{size}-font-size` |
| `--mp-badge-size-{size}-scale` |
| `--mp-badge-size-{size}-dot-width` / `-dot-height` |
| `--mp-badge-size-{size}-padding` |
| `--mp-badge-size-{size}-height` |
| `--mp-badge-size-{size}-border-radius` |
| `--mp-badge-size-{size}-space` |
| `--mp-badge-description-size-{size}-font-size` |

### 状态（`default / info / success / warning / danger / primary`）

| 名称 |
| --- |
| `--mp-badge-status-{status}-bg-color` |
| `--mp-badge-status-{status}-text-color` |
| `--mp-badge-variant-outline-status-{status}-text-color` |

默认 `status="danger"` 为红底白字；显式 `status="default"` 为中性色。支持完整的 `xs | sm | md | lg | xl` 五档尺寸。
