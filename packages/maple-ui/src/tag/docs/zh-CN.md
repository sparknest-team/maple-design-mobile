# 标签

### 介绍

标签用于标记、分类与筛选。API 与 Cedar Design Web (PC) 的 Tag 对齐，并吸收移动端常见能力（圆角、自定义文字色）。

### 主题色标签

通过 `status` 设置主题色，可选值与 Button 一致：`default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger`。

```demo
../example/demos/theme-color-tag.vue
```

### 描边标签

通过 `variant="outline"` 切换为描边风格。

```demo
../example/demos/outline-tag.vue
```

### 圆角标签

通过 `round` 开启胶囊圆角。

```demo
../example/demos/round-tag.vue
```

### 标签尺寸

通过 `size` 设置尺寸，可选值 `xs` `sm` `md` `lg` `xl`。

```demo
../example/demos/tag-size.vue
```

### 可关闭标签

通过 `closable` 显示关闭按钮，配合 `v-model:show` 或自行维护列表。

```demo
../example/demos/closable-tag.vue
```

### 加载中标签

通过 `loading` 显示加载状态。

```demo
../example/demos/loading-tag.vue
```

### 可选中标签

通过 `checkable` 使标签可点击切换选中，配合 `v-model:checked`。

```demo
../example/demos/checkable-tag.vue
```

### 带图标

通过 `icon` 插槽自定义前缀，`close-icon` 自定义关闭图标。

```demo
../example/demos/icon-tag.vue
```

### 自定义颜色

通过 `color` 与 `text-color` 设置自定义颜色（覆盖 status）。`variant="outline"` 时 `color` 作为边框色。

```demo
../example/demos/custom-color-tag.vue
```

## API

### 属性

#### Tag Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `status` | 主题色，可选值 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `default` |
| `variant` | 变体，可选 `default`（实心） / `outline`（描边） | _string_ | `default` |
| `size` | 尺寸，可选值 `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `round` | 是否为圆角胶囊形 | _boolean_ | `false` |
| `show` | 是否可见（v-model） | _boolean_ | `true` |
| `default-show` | 默认是否可见 | _boolean_ | `true` |
| `loading` | 是否为加载中状态 | _boolean_ | `false` |
| `closable` | 是否可关闭 | _boolean_ | `false` |
| `checkable` | 是否可点击选中 | _boolean_ | `false` |
| `checked` | 选中状态（checkable 时有效，v-model） | _boolean_ | `true` |
| `default-checked` | 默认选中状态（checkable 时有效） | _boolean_ | `true` |
| `nowrap` | 内容是否不换行（超出省略） | _boolean_ | `false` |
| `color` | 自定义背景色（outline 时为边框色） | _string_ | `-` |
| `text-color` | 自定义文字色 | _string_ | `-` |

### 事件

#### Tag Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `update:show` | 可见状态变化 | `(show: boolean)` |
| `update:checked` | 选中状态变化（checkable 时） | `(checked: boolean)` |
| `close` | 点击关闭按钮 | `(event: MouseEvent)` |
| `check` | 点击切换选中状态（checkable 时） | `(checked: boolean, event: MouseEvent)` |

### 插槽

#### Tag Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 标签内容 |
| `icon` | 前缀 |
| `close-icon` | 自定义关闭按钮图标 |

### 类型定义

```ts
type TagStatus = 'default' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'danger'
type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TagVariant = 'default' | 'outline'
```

### 样式变量

可通过 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--mp-tag-border-width` | `1px` |
| `--mp-tag-border-radius` | `4px` |
| `--mp-tag-round-radius` | `100px` |
| `--mp-tag-padding` | `0 10px` |
| `--mp-tag-icon-margin` | `6px` |
| `--mp-tag-font-weight` | `500` |
| `--mp-tag-size-xs-height` | `24px` |
| `--mp-tag-size-sm-height` | `28px` |
| `--mp-tag-size-md-height` | `32px` |
| `--mp-tag-size-lg-height` | `36px` |
| `--mp-tag-size-xl-height` | `40px` |
| `--mp-tag-size-{size}-font-size` | `12px` ~ `16px` |
| `--mp-tag-status-{status}-color` | 各状态背景色 |
| `--mp-tag-status-{status}-text-color` | 各状态文字色 |
| `--mp-tag-status-{status}-border-color` | 各状态边框色（outline 时生效） |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

两端保留独立的 show/checked 状态，受控值由调用方更新；保留淡出效果，class/style 显式透传给实际标签。尺寸配置、RTL 上下文及图标资源由各库本地适配，移动端触控尺寸保留在 token 中。
