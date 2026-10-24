# 图标

图标以独立 SVG Vue 组件提供。推荐通过 Resolver 自动按需导入；需要统一尺寸、颜色或旋转时，使用 Icon 容器包裹图标。

图标容器的命名和类型判断复用 maple-shared 的静态工具；尺寸转换和默认 props 处理保留在 UI 工具中。按需引入只保留实际使用的工具，图形仍由独立 SVG 组件提供。

## 案例

### 基础用法

```demo
../example/demos/basic.vue
```

### 图标尺寸

```demo
../example/demos/icon-size.vue
```

### 图标颜色

```demo
../example/demos/icon-color.vue
```

### 旋转与持续旋转

`rotate` 设置静态角度，`spin` 开启持续旋转动画，两者可以组合使用。

```demo
../example/demos/rotate-and-spin.vue
```

### 点击事件

```demo
../example/demos/click-event.vue
```

### 自定义图标

在默认插槽内放入自定义 SVG，尺寸和颜色由 Icon 容器统一控制。

```demo
../example/demos/custom.vue
```

### 动态名称

`name` 使用短横线名称（例如 `arrow-left`），只查找当前 Vue 应用已注册的图标，不会自动加载图标全集。点击“切换图标”查看名称与图形同步变化。设置默认插槽时，优先显示插槽内容，`name` 不再决定图形。

```demo
../example/demos/icon-animation.vue
```

### 全部图标

两端使用同一套规范名称。搜索忽略首尾空格和大小写，清空后恢复全部图标。卡片放大展示图标，完整名称可换行；点击或按 Enter / Space 复制对应标签。复制使用浏览器 Clipboard API，需要安全上下文及剪贴板权限；失败时显示错误反馈。

```demo
../example/demos/icon-list.vue
```

### 名称切换与生命周期

```demo
../example/demos/lifecycle.vue
```

<!-- api-review:start -->

### 功能调试

启用 `name` 控件后，从已注册名称中选择图标，预览会随之切换。

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### 属性

| 参数              | 说明                         | 类型               | 默认值  |
| ----------------- | ---------------------------- | ------------------ | ------- |
| `name`            | 已注册图标名称；默认插槽优先 | _string_           | `-`     |
| `size`            | `inherit`                    | _string \| number_ | `-`     |
| `color`           | 图标颜色                     | _string_           | `-`     |
| `rotate`          | 旋转角度                     | _number_           | `-`     |
| `spin`            | 是否持续旋转                 | _boolean_          | `false` |
| `animation-class` | 过渡动画类名                 | _string_           | `-`     |
| `transition`      | 过渡动画时间（ms）           | _string \| number_ | `0`     |

### 独立 SVG 图标属性

| 参数              | 说明       | 类型                                         | 默认值    |
| ----------------- | ---------- | -------------------------------------------- | --------- |
| `size`            | `inherit`  | _string \| number_                           | `-`       |
| `color`           | 图标颜色   | _string_                                     | `-`       |
| `rotate`          | 旋转角度   | _number_                                     | `-`       |
| `spin`            | 是否旋转   | _boolean_                                    | `false`   |
| `title`           | 无障碍标题 | _string_                                     | `-`       |
| `stroke-width`    | 线宽       | _number_                                     | `4`       |
| `stroke-linecap`  | 端点类型   | _'butt' \| 'round' \| 'square'_              | `'butt'`  |
| `stroke-linejoin` | 拐角类型   | _'bevel' \| 'inherit' \| 'miter' \| 'round'_ | `'miter'` |

### 事件

| 事件名  | 说明           | 参数           |
| ------- | -------------- | -------------- |
| `click` | 点击图标时触发 | `event: Event` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名        | 默认值 |
| ------------- | ------ |
| `--icon-size` | `20px` |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

只解析本应用已注册的图标；连续切换 name 会取消过期定时器，卸载后不再执行切换。各库注册前缀和历史 spin 类由本地适配保留，图标资源不跨库引用。

两端 Icon 默认继承宿主字号。需要固定 20px 的场景请显式设置 size="20" 或 icon-size 变量；size 属性优先于变量，颜色默认继承宿主。

### 动效变量

| Token                     | Default |
| ------------------------- | ------- |
| `--mp-icon-spin-duration` | `1s`    |

内置动效遵循 prefers-reduced-motion: reduce：保留内容与状态反馈，关闭装饰性旋转、扫光和波纹。Icon 名称切换直接显示最新值并取消未结束阶段，CSS与JS时长保持一致；自定义动画类由调用方负责适配。Ripple的时长与清理策略以Ripple组件文档为准，不将其历史250ms规则当作Icon的时长上限。
