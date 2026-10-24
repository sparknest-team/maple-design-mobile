# 链接

## 案例

### 介绍

链接组件，用于页面跳转。

### 基础用法

```demo
../example/demos/basic.vue
```

### 五种尺寸

通过 `size` 设置五档尺寸，文字、图标和加载图标同步缩放，默认 `md`。

```demo
../example/demos/size.vue
```

### 语义状态

```demo
../example/demos/semantic-status.vue
```

### 链接模式

```demo
../example/demos/mode.vue
```

### 下划线

```demo
../example/demos/underline.vue
```

### 禁用状态

```demo
../example/demos/disabled-status.vue
```

### 图标

```demo
../example/demos/icon.vue
```

### 加载中

```demo
../example/demos/loading.vue
```

### 悬浮态底色

两端均支持 hoverable（默认 false），开启后增加内边距与悬浮/按下底色；不影响 underline。键盘聚焦通过 :focus-visible 显示焦点轮廓，无需开启 hoverable。


主体、Props、主样式和测试为两份独立维护的同源复制，仅前缀、本地图标和主题 token 不同，不共享核心或实例。禁用/加载时移除 href/target/rel、阻止 click，并退出 Tab 顺序（包括显式 tabindex）。loading 优先于图标插槽，动态图标插槽实时更新。

```demo
../example/demos/hoverable.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### 属性

| 参数           | 说明                                                              | 类型       | 默认值      |
|--------------|-----------------------------------------------------------------|----------|----------|
| `status`       | 语义状态，可选值为 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `default` |
| `underline`  | 下划线状态，可选值为 `always` `hover` `none`                              | _string_ | `none` |
| `hoverable` | 是否显示带内边距的悬浮/按下底色 | _boolean_ | `false` |
| `disabled`   | 禁用状态                                                            | _boolean_ | `false`  |
| `loading`    | 加载状态，加载时禁止导航和点击                                        | _boolean_ | `false`  |
| `icon`       | 是否显示默认链接图标                                                  | _boolean_ | `false`  |
| `href`       | 原生 `href` 属性                                         | _string_ | `-`      |
| `rel`        | 原生 `rel` 属性                                            | _string_ | `-`      |
| `target`     | 原生 `target` 属性                                                  | _string_ | `-`      |

### 事件

| 事件名 | 说明                                              | 参数 |
| --- |-------------------------------------------------| --- |
| `click` | 点击链接时触发 | `event: MouseEvent` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 链接内容 | `-` |
| `icon` | 自定义链接图标 | `-` |

### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值                          |
| --- |------------------------------|
| `--mp-link-default-color` | `var(--mp-sys-color-content-primary)`                       |
| `--mp-link-primary-color` | `var(--mp-sys-color-content-brand)`       |
| `--mp-link-danger-color` | `var(--mp-sys-color-content-danger)`        |
| `--mp-link-success-color` | `var(--mp-sys-color-content-success)`       |
| `--mp-link-warning-color` | `var(--mp-sys-color-content-warning)`       |
| `--mp-link-info-color` | `var(--mp-sys-color-content-info)`          |
| `--mp-link-disabled-color` | `var(--mp-sys-color-content-disabled)` |
| `--mp-link-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-link-icon-size` | `1em` |
| `--mp-link-focus-opacity` | `0.8` |

### 同源样式约定

内部类名统一为 `mp-link--status-*`、`mp-link--underline-*` 和 `mp-link__icon`；请使用 CSS 变量定制，迁移旧的 `mp-link--primary` 等选择器。原有颜色/icon/focus CSS 变量继续保留，并映射至同源主样式。

| 变量名 | 默认值 |
| --- | --- |
| `--mp-link-bg-hover` | `var(--mp-color-fill-2)` |
| `--mp-link-bg-active` | `var(--mp-color-fill-3)` |
| `--mp-link-padding-horizontal` | `0.25em` |
| `--mp-link-padding-vertical` | `1px` |
| `--mp-link-focus-width` | `2px` |
| `--mp-link-focus-offset` | `2px` |
| `--mp-link-focus-color` | `currentColor` |
| `--mp-link-spin-duration` | `1s` |

```ts
import type { LinkProps, LinkUnderline, LinkInstance } from '@maple-design/ui'
```

文字配色与 Button 的 text 变体一致：default 使用 content-primary，secondary / tertiary 使用 content-secondary，彩色状态使用对应 content 语义色，禁用和加载使用 content-disabled。两品牌明暗模式均继承这些规则。

尺寸变量：`--mp-link-size-xs-font-size`, `--mp-link-size-sm-font-size`, `--mp-link-size-md-font-size`, `--mp-link-size-lg-font-size`, `--mp-link-size-xl-font-size`。默认分别为 12 / 13 / 14 / 16 / 18px；md 引用原有 `--mp-link-font-size`，图标和加载图标使用 1em。
