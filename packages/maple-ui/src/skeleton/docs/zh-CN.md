# 骨架屏

### 介绍

显示一些带过渡效果的占位元素，优化加载过程。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 自定义段落宽度

```demo
../example/demos/custom-rows-width.vue
```

### 显示卡片

```demo
../example/demos/display-card.vue
```

### 自定义模板

```demo
../example/demos/custom-template.vue
```

### 动画

```demo
../example/demos/animation.vue
```

### 全屏模式

```demo
../example/demos/fullscreen-mode.vue
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 加载状态，设置为 `true` 开启骨架屏 | _boolean_ | `true` |
| `animation` | 是否开启流光动画 | _boolean_ | `true` |
| `title` | 是否显示标题 | _boolean_ | `false` |
| `card` | 是否显示卡片 | _boolean_ | `false` |
| `avatar` | 是否显示头像 | _boolean_ | `false` |
| `fullscreen` | 是否开启全屏模式 | _boolean_ | `false` |
| `fullscreen-z-index` | 全屏模式的层级 | _string \| number_ | `100` |
| `title-width` | `50%` | _string \| number_ | `-` |
| `card-height` | `160px` | _string \| number_ | `-` |
| `avatar-size` | `34px` | _string \| number_ | `-` |
| `rows` | 段落行数 | _string \| number_ | `3` |
| `rows-width` | 段落每一行的宽度 | _number[] \| string[]_ | `[]` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- |--| --- |
| `default` | 非加载状态下的内容 | `-` |
| `template` | 自定义加载占位模板 | `-` |

组件同时导出 `SkeletonLine` 和 `SkeletonShape`，也可通过 `Skeleton.Line`、`Skeleton.Shape` 组合自定义占位模板。

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--mp-skeleton-content-padding` | `var(--mp-sys-space-6)` |
| `--skeleton-card-height` | `160px` |
| `--skeleton-card-border-radius` | `4px` |
| `--skeleton-card-margin-bottom` | `16px` |
| `--skeleton-card-background-color` | `rgba(0, 0, 0, 0.12)` |
| `--skeleton-animation-background` | `linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.3), hsla(0, 0%, 100%, 0))` |
| `--skeleton-avatar-size` | `34px` |
| `--skeleton-avatar-border-radius` | `50%` |
| `--skeleton-avatar-margin-right` | `16px` |
| `--skeleton-avatar-background-color` | `rgba(0, 0, 0, 0.12)` |
| `--skeleton-title-width` | `50%` |
| `--skeleton-title-border-radius` | `10px` |
| `--skeleton-title-background-color` | `rgba(0, 0, 0, 0.12)` |
| `--skeleton-row-height` | `12px` |
| `--skeleton-row-border-radius` | `10px` |
| `--skeleton-row-margin-top` | `10px` |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

Skeleton、SkeletonLine、SkeletonShape 均采用独立复制的源码；各库骨架主题和尺寸 token 独立维护。

### 受管默认值

| Token | Default |
| --- | --- |
| `--mp-skeleton-card-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-skeleton-card-margin-bottom` | `var(--mp-sys-space-6)` |
| `--mp-skeleton-card-background-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-skeleton-animation-background` | `linear-gradient(90deg, transparent, var(--mp-sys-color-surface-default), transparent)` |
| `--mp-skeleton-avatar-border-radius` | `50%` |
| `--mp-skeleton-avatar-margin-right` | `var(--mp-sys-space-6)` |
| `--mp-skeleton-avatar-background-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-skeleton-title-border-radius` | `10px` |
| `--mp-skeleton-title-background-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-skeleton-row-height` | `12px` |
| `--mp-skeleton-row-border-radius` | `10px` |
| `--mp-skeleton-row-margin-top` | `10px` |
| `--mp-skeleton-shape-size-sm` | `36px` |
| `--mp-skeleton-shape-size-md` | `48px` |
| `--mp-skeleton-shape-size-lg` | `60px` |
| `--mp-skeleton-shape-border-radius` | `var(--mp-sys-radius-md)` |

### 动效变量

| Token | Default |
| --- | --- |
| `--mp-skeleton-animation-duration` | `1s` |
| `--mp-skeleton-transition-duration` | `var(--mp-sys-motion-duration-slow)` |

内置动效遵循 prefers-reduced-motion: reduce：保留内容与状态反馈，关闭装饰性旋转、扫光和波纹。Icon 名称切换跳过等待，并取消尚未结束的切换。Ripple 时长变量只控制 CSS，250ms 生命周期计时未改变，每段视觉时长应不超过 250ms；自定义动画类由调用方负责适配。
