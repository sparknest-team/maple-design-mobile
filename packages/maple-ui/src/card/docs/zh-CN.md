# Card

与 Cedar 使用相同场景、参数和交互顺序；示例源码仅替换组件前缀，主题与站点外壳各自保留。

## 案例

### 基础用法与副标题

```demo
../example/demos/basic.vue
```

### 自定义标题区域

```demo
../example/demos/no-padding.vue
```

### 悬浮样式

```demo
../example/demos/hoverable.vue
```

### 变体与阴影

```demo
../example/demos/variant.vue
```

### 图片与三种布局

```demo
../example/demos/image.vue
```

### 尺寸

```demo
../example/demos/size.vue
```

### 长标题与提示

```demo
../example/demos/tooltip.vue
```

### 内容插槽

```demo
../example/demos/slots.vue
```

### 水波与点击事件

```demo
../example/demos/ripple.vue
```

### 全屏展开与关闭

```demo
../example/demos/floating.vue
```

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 卡片外观 | `default / outline / tonal` | `default` |
| size | 内容密度；省略时按平台规则回退，见下方说明 | `sm / md` | `undefined` |
| direction | 封面与正文排列 | `row / column / row-reverse` | `column` |
| hoverable | 悬浮样式 | `boolean` | `false` |
| title-style | 标题行样式 | `CSSProperties` | `undefined` |
| title | 标题 | `string` | `undefined` |
| subtitle | 副标题 | `string` | `undefined` |
| description | 描述 | `string` | `undefined` |
| top-divider | 上分割线 | `boolean` | `false` |
| bottom-divider | 下分割线 | `boolean` | `false` |
| src | 封面图片地址；cover 插槽优先 | `string` | `undefined` |
| fit | 封面图片填充方式 | `fill / contain / cover / none / scale-down` | `cover` |
| image-height | 封面图片高度，数字单位为 px | `string / number` | `undefined` |
| image-width | 封面图片宽度，数字单位为 px | `string / number` | `undefined` |
| alt | 封面图片替代文本 | `string` | `undefined` |
| elevation | default 变体阴影；true 为等级 1，false 为无阴影，数字范围 0～24 | `boolean / number` | `true` |
| ripple | 点击水波 | `boolean` | `false` |
| floating | 全屏展开状态，支持 v-model:floating | `boolean` | `false` |
| floating-duration | 全屏展开与关闭动画时长，单位 ms | `number` | `250` |

### Events

| 事件 | 参数与时机 |
| --- | --- |
| click | `(event: Event)`，点击卡片时触发 |
| update:floating | `(value: boolean)`，内置关闭按钮请求关闭时发送 false；展开由父级设置 |

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 正文 | — |
| cover | 封面，覆盖 src 图片 | — |
| header | 整个标题区域，覆盖 title、title-action 和 subtitle | — |
| title | 标题 | `{ slotClass: string }` |
| title-action | 标题右侧操作 | — |
| subtitle | 副标题 | `{ slotClass: string }` |
| description | 描述 | `{ slotClass: string }` |
| footer | 底部操作 | — |
| floating-content | 全屏扩展内容，仅 column 布局渲染 | — |
| close-button | 自定义关闭按钮；需自行更新 floating | — |

### Methods

无公开方法。

### 跨端说明

属性、事件参数及插槽契约一致。Cedar 省略 size 时继承全局尺寸（xs/sm 映射 sm，其余映射 md）；Maple 回退 md。需要一致密度时显式传入 size。主题和 CSS 前缀分别使用各端配置。
Card 不再提供 loading 属性；加载遮罩使用 Loading 指令组合。
<!-- same-source-api:end -->

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-card-hover-shadow` | `0 4px 12px rgb(0 0 0 / 12%)` |
| `--mp-card-size-sm-title-font-size` | `16px` |
| `--mp-card-size-sm-section-margin` | `8px 0 0` |
| `--mp-card-size-sm-section-padding` | `0 12px` |
| `--mp-card-padding` | `0 0 15px 0` |
| `--mp-card-background` | `var(--mp-color-bg-2)` |
| `--mp-card-filled-background` | `hsla(0, 0%, 93%, 1)` |
| `--mp-card-outline-color` | `var(--mp-color-border-2)` |
| `--mp-card-border-radius` | `4px` |
| `--mp-card-image-width` | `100%` |
| `--mp-card-row-image-width` | `140px` |
| `--mp-card-image-height` | `200px` |
| `--mp-card-row-height` | `140px` |
| `--mp-card-title-color` | `#333` |
| `--mp-card-title-font-size` | `20px` |
| `--mp-card-title-padding` | `0 12px` |
| `--mp-card-title-margin` | `15px 0 0 0` |
| `--mp-card-title-row-margin` | `12px 0` |
| `--mp-card-content-padding` | `0 16px` |
| `--mp-card-content-margin` | `16px 0 0 0` |
| `--mp-card-content-color` | `var(--mp-color-text-3)` |
| `--mp-card-content-font-size` | `14px` |
| `--mp-card-content-row-margin` | `16px 0 0 0` |
| `--mp-card-subtitle-color` | `rgba(0, 0, 0, 0.6)` |
| `--mp-card-subtitle-font-size` | `14px` |
| `--mp-card-subtitle-padding` | `0 12px` |
| `--mp-card-subtitle-margin` | `10px 0 0 0` |
| `--mp-card-subtitle-row-margin` | `-8px 0 0 0` |
| `--mp-card-description-color` | `rgba(0, 0, 0, 0.6)` |
| `--mp-card-description-font-size` | `14px` |
| `--mp-card-description-margin` | `20px 0 0 0` |
| `--mp-card-description-padding` | `0 13px` |
| `--mp-card-footer-padding` | `0 12px` |
| `--mp-card-footer-right` | `13px` |
| `--mp-card-footer-bottom` | `9px` |
| `--mp-card-footer-margin` | `30px 0 0 0` |
| `--mp-card-line-height` | `22px` |
| `--mp-card-row-line-height` | `1.5` |
| `--mp-card-floating-buttons-bottom` | `16px` |
| `--mp-card-floating-buttons-right` | `16px` |
| `--mp-card-floating-buttons-color` | `#fff` |
| `--mp-card-close-button-icon-size` | `24px` |
| `--mp-card-close-button-size` | `56px` |
| `--mp-card-close-button-primary-color` | `#212121` |
| `--mp-card-close-button-text-color` | `#fff` |
| `--mp-card-close-button-border-radius` | `50%` |
