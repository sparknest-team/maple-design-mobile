# 空状态 Empty

指当前场景没有对应的数据内容，呈现出的一种状态。示例与 Cedar Design Web 保持一致，布局按移动端换行。

## 案例

### 基础用法

空状态组件的基本用法。不传 `description` 时使用国际化文案。

```demo
../example/demos/basic-usage.vue
```

### 自定义图片和文案

通过 `image` 插槽自定义图标、图片，或通过默认插槽修改文案。也可用 `image-url` 指定图片地址。

```demo
../example/demos/custom-image.vue
```

### 图片尺寸

通过 `image-size` 控制图标尺寸，可选值为 `xs` `sm` `md` `lg` `xl`，也可传入数值。

```demo
../example/demos/image-size.vue
```

### 操作按钮

通过 `extra` 插槽添加操作按钮。

```demo
../example/demos/extra-slot.vue
```

### 显示与隐藏

通过 `show-icon`、`show-description` 控制图标和描述是否显示。

```demo
../example/demos/show.vue
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `description` | 描述内容，缺省时使用国际化文案 | `string` | `-` |
| `image-url` | 自定义图片地址 | `string` | `-` |
| `alt` | 图片替代文本 | `string` | `''` |
| `image-size` | 图片/图标尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `'md'` |
| `show-icon` | 是否显示图标 | `boolean` | `true` |
| `show-description` | 是否显示描述 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击回调 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 描述内容 |
| `image` | 自定义图标/图片 |
| `extra` | 额外操作 |

### 类型定义

```ts
type EmptyImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string
```

### 样式变量

| 名称 | 默认值 |
| --- | --- |
| `--mp-empty-padding` | `20px` |
| `--mp-empty-image-margin-bottom` | `4px` |
| `--mp-empty-description-font-size` | `14px` |
| `--mp-empty-description-color` | `var(--mp-color-text-3, #888)` |
| `--mp-empty-description-line-height` | `1.5` |
| `--mp-empty-icon-color` | `var(--mp-color-text-4, #ccc)` |
| `--mp-empty-extra-margin-top` | `20px` |
| `--mp-empty-size-xs` | `80px` |
| `--mp-empty-size-sm` | `100px` |
| `--mp-empty-size-md` | `120px` |
| `--mp-empty-size-lg` | `140px` |
| `--mp-empty-size-xl` | `160px` |
