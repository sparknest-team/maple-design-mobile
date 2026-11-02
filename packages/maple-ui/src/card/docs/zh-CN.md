# Card

## 基础示例

### 基础用法与副标题

```demo
../example/demos/basic.vue
```

## 外观与状态

### 外观配置对比

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `title` | 标题 | 外观配置对比、悬浮样式 |
| `description` | 描述 | 外观配置对比 |
| `hoverable` | 悬浮样式 | 悬浮样式 |
<!-- demo-config-notes:end -->

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 外观组合

适用于信息分组和内容层次。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

```demo
../example/demos/appearance-lab.vue
```

### 悬浮样式

```demo
../example/demos/hoverable.vue
```

## 布局与排列

### 图片与三种布局

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `direction` | 封面与正文的排列顺序，默认 column；支持 row、column、row-reverse，不表示卡片自身位置 | 图片与三种布局 |
| `title` | 标题 | 图片与三种布局 |
| `src` | 封面图片地址；cover 插槽优先 | 图片与三种布局 |
| `alt` | 封面图片替代文本 | 图片与三种布局 |
| `image-height` | 封面图片高度，数字单位为 px | 图片与三种布局 |
| `image-width` | 封面图片宽度，数字单位为 px | 图片与三种布局 |
<!-- demo-config-notes:end -->

```demo
../example/demos/image.vue
```

## 内容与展示

### 长标题与提示

```demo
../example/demos/tooltip.vue
```

## 自定义与插槽

### 自定义标题区域

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `title` | 标题 | 自定义标题区域 |
| `top-divider` | 上分割线 | 内容插槽 |
| `bottom-divider` | 下分割线 | 内容插槽 |
<!-- demo-config-notes:end -->

```demo
../example/demos/no-padding.vue
```

### 内容插槽

```demo
../example/demos/slots.vue
```

## 交互与控制

### 水波与点击事件

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `title` | 标题 | 水波与点击事件、全屏展开与关闭 |
| `ripple` | 点击水波 | 水波与点击事件 |
| `floating` | 全屏展开状态，支持 v-model:floating | 全屏展开与关闭 |
| `floating-duration` | 全屏展开与关闭动画时长，单位 ms | 全屏展开与关闭 |
<!-- demo-config-notes:end -->

```demo
../example/demos/ripple.vue
```

### 全屏展开与关闭

```demo
../example/demos/floating.vue
```

## 生命周期与边界

### Floating scheduler lifecycle / 浮起调度生命周期

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `floating` | 全屏展开状态，支持 v-model:floating | Floating scheduler lifecycle / 浮起调度生命周期 |
| `ripple` | 点击水波 | Floating scheduler lifecycle / 浮起调度生命周期 |
| `floating-duration` | 全屏展开与关闭动画时长，单位 ms | Floating scheduler lifecycle / 浮起调度生命周期 |
| `title` | 标题 | Floating scheduler lifecycle / 浮起调度生命周期 |
<!-- demo-config-notes:end -->

```demo
../example/demos/scheduler-lifecycle.vue
```

与 Cedar 使用相同场景、参数和交互顺序；示例源码仅替换组件前缀，主题与站点外壳各自保留。

## 阅读方向

标题、内容和操作沿阅读顺序排列，默认浮动操作位于阅读终点，不镜像图片或自定义插槽。

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 卡片外观 | `default / outline / tonal` | `default` |
| size | 内容密度；省略时按平台规则回退，见下方说明 | `sm / md` | `undefined` |
| direction | 封面与正文的排列顺序，默认 column；支持 row、column、row-reverse，不表示卡片自身位置 | `row / column / row-reverse` | `column` |
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
| `--mp-card-background` | `var(--mp-sys-color-surface-default)` |
| `--mp-card-filled-background` | `var(--mp-sys-color-surface-muted)` |
| `--mp-card-outline-color` | `var(--mp-sys-color-border-default)` |
| `--mp-card-border-radius` | `4px` |
| `--mp-card-image-width` | `100%` |
| `--mp-card-row-image-width` | `140px` |
| `--mp-card-image-height` | `200px` |
| `--mp-card-row-height` | `140px` |
| `--mp-card-title-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-card-title-font-size` | `20px` |
| `--mp-card-title-padding` | `0 12px` |
| `--mp-card-title-margin` | `15px 0 0 0` |
| `--mp-card-title-row-margin` | `12px 0` |
| `--mp-card-content-padding` | `0 16px` |
| `--mp-card-content-margin` | `16px 0 0 0` |
| `--mp-card-content-color` | `var(--mp-sys-color-content-tertiary)` |
| `--mp-card-content-font-size` | `14px` |
| `--mp-card-content-row-margin` | `16px 0 0 0` |
| `--mp-card-subtitle-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-card-subtitle-font-size` | `14px` |
| `--mp-card-subtitle-padding` | `0 12px` |
| `--mp-card-subtitle-margin` | `10px 0 0 0` |
| `--mp-card-subtitle-row-margin` | `-8px 0 0 0` |
| `--mp-card-description-color` | `var(--mp-sys-color-content-secondary)` |
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
| `--mp-card-floating-buttons-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-card-close-button-icon-size` | `24px` |
| `--mp-card-close-button-size` | `56px` |
| `--mp-card-close-button-background` | `#212121` |
| `--mp-card-close-button-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-card-close-button-border-radius` | `50%` |

Card 主体颜色与 Cedar 共用 system 语义：普通背景、filled 背景和描边分别使用 `surface-default`、`surface-muted`、`border-default`；标题、正文、辅助文字分别使用 `content-primary`、`content-tertiary`、`content-secondary`。暗色主题沿用相同角色。展开后的悬浮按钮容器位于卡片表面，使用 `content-primary`；深色关闭按钮上的文字与图标使用 `content-on-dark`。关闭按钮背景 `#212121` 是 Card 专属值，并非全局主操作色。旧变量名的迁移关系见 Design Token 规范。

### 变量消费约定

横向内容区独立消费 `--mp-card-content-row-margin`，不再误用标题间距。Card 的密度 API 明确只支持 sm/md，不套用表单控件五档。动效时长 `--mp-card-animation-duration` 默认为 `var(--mp-sys-motion-duration-slow)`，曲线 `--mp-card-animation-easing` 默认为 `var(--mp-sys-motion-easing-standard)`。reduced-motion 关闭所有 Card 动画分区的过渡。
