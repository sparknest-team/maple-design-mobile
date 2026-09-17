# 链接

### 介绍

链接组件，用于页面跳转。

### 基础用法

```demo
../example/demos/basic.vue
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
| `--link-default-color` | `#555`                       |
| `--link-primary-color` | `var(--color-primary)`       |
| `--link-danger-color` | `var(--color-danger)`        |
| `--link-success-color` | `var(--color-success)`       |
| `--link-warning-color` | `var(--color-warning)`       |
| `--link-info-color` | `var(--color-info)`          |
| `--link-disabled-color` | `var(--color-text-disabled)` |
| `--link-font-size` | `var(--font-size-md)` |
| `--link-icon-size` | `1em` |
| `--link-focus-opacity` | `0.8` |

### 同源样式约定

内部类名统一为 `mp-link--status-*`、`mp-link--underline-*` 和 `mp-link__icon`；请使用 CSS 变量定制，迁移旧的 `mp-link--primary` 等选择器。原有颜色/icon/focus CSS 变量继续保留，并映射至同源主样式。

| 变量名 | 默认值 |
| --- | --- |
| `--link-bg-hover` | `var(--color-fill-2)` |
| `--link-bg-active` | `var(--color-fill-3)` |
| `--link-padding-horizontal` | `0.25em` |
| `--link-padding-vertical` | `1px` |
| `--link-focus-width` | `2px` |
| `--link-focus-offset` | `2px` |
| `--link-focus-color` | `currentColor` |
| `--link-spin-duration` | `1s` |

```ts
import type { LinkProps, LinkUnderline, LinkInstance } from '@maplejs/maple-ui'
```
