# Avatar 头像

两端使用同一份实现和示例，组件前缀、主题基础变量与注册入口各自保留。

## 案例

### 基础用法

头像默认使用圆形、默认尺寸。没有图片时，可以通过默认插槽展示文字或图标；也可以直接传入图片。

```demo
../example/demos/basic.vue
```

### 尺寸

`size` 控制头像宽高：数字为 px，字符串为 CSS 长度（如 `3rem`）。未设置时使用默认尺寸 token。可同时用于文字头像和图片头像。

```demo
../example/demos/size.vue
```

### 形状

`shape` 支持圆形和方形。

```demo
../example/demos/shape.vue
```

### 文字自适应

默认会按头像宽度缩放过长文字。修改输入框内容可以实时看到缩放效果；将 `autoFixFontSize` 设为 `false` 后保持原始字号。

```demo
../example/demos/auto-fix.vue
```

### 图片头像

使用 `imageUrl` 设置图片，并通过 `alt` 提供可访问的替代文本。也可以在默认插槽里放 `img` / `picture`，组件会按图片头像处理。

```demo
../example/demos/image.vue
```

### 图片填充

`objectFit` 控制图片在头像区域内的填充方式。

```demo
../example/demos/fit.vue
```

### 加载与回退

`lazy` 开启懒加载，`loading` 指定加载中占位图。失败时可用 `error` 占位图，或使用 `error` 插槽自定义内容。

```demo
../example/demos/fallback.vue
```

### 颜色与边框

使用 `color` 设置背景色，可传入主题色变量。`bordered` / `borderColor` 控制描边。

```demo
../example/demos/style.vue
```

### 头像组

`AvatarGroup` 会自动堆叠子头像。可以用 `bordered` 做出叠层描边，`maxCount` 将超出的头像收纳到 Popover，`maxStyle` 定制汇总头像，`zIndexAscend` 按顺序递增层级。`shape` / `size` / `offset` 会作用到组内全部子头像。

```demo
../example/demos/group.vue
```

### 纵向头像组

`vertical` 改为纵向堆叠，`offset` 控制重叠间距，数字为 px。

```demo
../example/demos/group-vertical.vue
```

### 头像可悬停

设置 `hoverable` 后，鼠标悬停时头像会放大，可单独使用，也可以用在头像组里。

```demo
../example/demos/hoverable.vue
```

### 交互图标

使用 `trigger-icon` 插槽添加交互入口。`triggerType` 支持独立按钮（`button`）和悬浮背景层（`overlay`）两种形式；点击会触发 `click`。

```demo
../example/demos/trigger.vue
```

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| shape | 头像形状 | `circle / square` | `circle` |
| image-url | 图片地址 | `string` | `-` |
| alt | 图片替代文本 | `string` | `''` |
| size | 头像宽高；数字为 px，字符串为 CSS 长度 | `number / string` | `-` |
| auto-fix-font-size | 是否自动缩放过长的文字内容 | `boolean` | `true` |
| trigger-type | 交互图标展示方式 | `button / overlay` | `button` |
| trigger-icon-style | 交互图标的自定义样式 | `CSSProperties` | `-` |
| object-fit | 图片填充方式 | `fill / contain / cover / none / scale-down` | `cover` |
| color | 头像背景色 | `string` | `-` |
| bordered | 是否显示描边 | `boolean` | `false` |
| border-color | 描边颜色 | `string` | `-` |
| loading | 图片加载中的占位图地址 | `string` | `-` |
| error | 图片加载失败的占位图地址 | `string` | `-` |
| lazy | 是否懒加载图片 | `boolean` | `false` |
| hoverable | 是否开启悬停放大效果 | `boolean` | `false` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击头像时触发 | `(event: MouseEvent) => void` |
| load | 图片加载成功触发 | `() => void` |
| error | 图片加载失败触发 | `() => void` |

### Slots

| 插槽 | 说明 |
| --- | --- |
| default | 文字、图标或图片加载中内容 |
| error | 图片加载失败时的回退内容 |
| trigger-icon | 头像上的交互图标 |

### Methods

无自定义公开方法。
<!-- same-source-api:end -->

### AvatarGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| shape | 子头像形状 | `circle / square` | `circle` |
| size | 子头像宽高；数字为 px，字符串为 CSS 长度 | `number / string` | `-` |
| auto-fix-font-size | 是否自动缩放子头像中的文字 | `boolean` | `true` |
| max-count | 最多直接展示的头像数，`0` 表示不限 | `number` | `0` |
| z-index-ascend | 头像层级是否按顺序递增 | `boolean` | `false` |
| max-style | 数量汇总头像的自定义样式 | `CSSProperties` | `-` |
| max-popover-props | 汇总 Popover 的属性 | `PopoverProps` | `-` |
| offset | 组内头像的重叠偏移量 | `number / string` | `-` |
| vertical | 是否纵向堆叠 | `boolean` | `false` |

### AvatarGroup Slots

| 插槽 | 说明 |
| --- | --- |
| default | 头像列表 |

### 类型定义

```ts
import type {
  AvatarGroupInstance,
  AvatarGroupProps,
  AvatarInstance,
  AvatarProps,
  AvatarObjectFit,
  AvatarShape,
  AvatarTriggerType,
} from '@maplejs/maple-ui';
```
