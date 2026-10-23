# 悬停指令

### 介绍

指针悬停在绑定元素上时进行样式绑定，也可以通过函数获得当前悬停的状态，支持在桌面端或移动端中选择性启用。

### 样式绑定

指针悬停在绑定元素上时进行样式绑定, 离开元素时取消样式绑定。

```demo
../example/demos/style-binding.vue
```

### 函数绑定

指针悬停和离开时会触发函数，并携带当前的悬停状态。

```demo
../example/demos/function-binding.vue
```

### 针对不同设备选择性启用

考虑到在不同平台的 `hover` 效果的差异性，悬停指令可以只启用于特定的平台。

#### 只在桌面端启用

```html
// playground-ignore
<mp-paper v-hover:desktop="{ color: '#fff' }"">HOVER</mp-paper>
```

#### 只在移动端启用

```html
// playground-ignore
<mp-paper v-hover:mobile="{ color: '#fff' }">HOVER</mp-paper>
```

### 受管默认值

| Token | Default |
| --- | --- |
| `--mp-hover-overlay-opacity` | `0.04` |
| `--mp-hover-overlay-focusing-opacity` | `0.12` |

### 动效变量

| Token | Default |
| --- | --- |
| `--mp-hover-transition-duration` | `var(--mp-sys-motion-duration-fast)` |

内置动效遵循 prefers-reduced-motion: reduce：保留内容与状态反馈，关闭装饰性旋转、扫光和波纹。Icon 名称切换跳过等待，并取消尚未结束的切换。Ripple 时长变量只控制 CSS，250ms 生命周期计时未改变，每段视觉时长应不超过 250ms；自定义动画类由调用方负责适配。


<!-- api-review:start -->
### 组合审查 / API review

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->
