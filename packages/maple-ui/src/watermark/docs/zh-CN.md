# 水印

给页面或局部区域添加文字、图片水印。组件会自动响应属性和主题变化，无需手动刷新。

### 文字水印

```demo
../example/demos/text-watermark.vue
```

### 多行文本

```demo
../example/demos/multiline.vue
```

### 自定义间距

```demo
../example/demos/custom-gap.vue
```

### 自定义偏移量

```demo
../example/demos/custom-offset.vue
```

### 自定义旋转角度

```demo
../example/demos/custom-rotate.vue
```

### 图片水印

```demo
../example/demos/image-watermark.vue
```

### 全屏

```demo
../example/demos/fullscreen.vue
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `content` | 单行或多行文字；图片加载失败时作为回退内容 | `string \| string[]` | `-` |
| `image` | 图片地址，优先于文字 | `string` | `-` |
| `width` | 单块水印宽度，默认按内容测量 | `number` | `-` |
| `height` | 单块水印高度，默认按内容测量 | `number` | `-` |
| `gap` | 水印间距 `[x, y]` | `[number, number]` | `[90, 90]` |
| `offset` | 第一块水印相对容器的偏移，默认是间距的一半 | `[number, number]` | `[gap[0] / 2, gap[1] / 2]` |
| `rotate` | 旋转角度 | `number` | `-22` |
| `font` | 文字样式 | `WatermarkFont` | `-` |
| `z-index` | 水印层级 | `number` | `6` |
| `alpha` | 整体透明度，范围为 `0..1` | `number` | `1` |
| `anti-tamper` | 水印节点被移除或修改后是否恢复 | `boolean` | `true` |
| `grayscale` | 是否灰阶渲染 | `boolean` | `false` |
| `repeat` | 是否重复水印 | `boolean` | `true` |
| `staggered` | 重复时是否错列 | `boolean` | `true` |
| `fullscreen` | 是否固定覆盖整个视口 | `boolean` | `false` |

### WatermarkFont

| 参数 | 类型 | 默认值 |
| --- | --- | --- |
| `color` | `string` | `var(--mp-watermark-content-color)` |
| `fontSize` | `number` | `16` |
| `fontFamily` | `string` | `sans-serif` |
| `fontStyle` | `'normal' \| 'italic' \| 'oblique'` | `normal` |
| `fontWeight` | `string \| number` | `normal` |
| `textAlign` | `CanvasTextAlign` | `center` |
| `lineHeight` | `number` | `fontSize × 1.4` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `error` | 图片加载或 Canvas 渲染失败 | `{ source: 'image' \| 'canvas'; error: unknown }` |

### 方法

| 方法名 | 说明 | 返回值 |
| --- | --- | --- |
| `redraw` | 按当前属性重新生成水印 | `Promise<void>` |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 被水印覆盖的页面内容 |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-watermark-content-color` | `rgba(0, 0, 0, 0.15)` |
