# 链接

### 介绍

链接组件，用于页面跳转。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## 外观与状态

### 链接尺寸与语义颜色

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `status` | 语义状态，可选值为 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | 链接尺寸与语义颜色、链接模式、下划线 |
| `href` | 原生 `href` 属性 | 链接模式、悬浮态底色 |
| `icon` | 是否显示默认链接图标 | 链接尺寸与语义颜色 |
| `loading` | 加载状态，加载时禁止导航和点击 | 链接尺寸与语义颜色 |
| `target` | 原生 `target` 属性 | 链接模式 |
| `rel` | 原生 `rel` 属性 | 链接模式 |
<!-- demo-config-notes:end -->

比较尺寸和语义颜色；导航目标、禁用拦截和加载反馈保留独立行为示例。

<details>
<summary>配置说明与使用限制</summary>

#### 五种尺寸

通过 `size` 设置五档尺寸，文字、图标和加载图标同步缩放，默认 `md`。

</details>

```demo
../example/demos/appearance-comparison.vue
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

### 悬浮态底色

两端均支持 hoverable（默认 false），开启后增加内边距与悬浮/按下底色；不影响 underline。键盘聚焦通过 :focus-visible 显示焦点轮廓，无需开启 hoverable。


禁用或加载时移除 href / target / rel，阻止 click 并退出 Tab 顺序（包括显式 tabindex）。loading 优先于图标插槽，动态图标插槽实时更新。

```demo
../example/demos/hoverable.vue
```

## 内容与展示

### 图标

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `icon` | 是否显示默认链接图标 | 图标 |
| `status` | 语义状态，可选值为 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | 萤火虫配色 |
<!-- demo-config-notes:end -->

```demo
../example/demos/icon.vue
```

### 萤火虫配色

primary、secondary、tertiary 链接使用与同状态 Button 的 text/outline 形态一致的文字角色。示例为明亮主色、紫色文字使用深蓝背景，为浅色模式的 secondary 使用浅色背景，与 Button 示例保持一致。

```demo
../example/demos/theme-colors.vue
```

## 交互与控制

### 加载中

```demo
../example/demos/loading.vue
```

## API

### 原生链接与手动加载

导航请提供 href。禁用或加载时，原本有 href 的链接保留 link 角色，移除导航属性并退出 Tab 顺序。download、hreflang、referrerpolicy 和 ARIA 等原生属性直接透传。loading 优先于 icon 插槽。click 是 MouseEvent 通知事件，遵守 Vue 的 once 语义，不根据监听器返回的 Promise 管理 loading；没有导航目标的业务操作使用 Button。

加载示例首次激活时由业务准备报告，完成后再次激活交给浏览器原生下载；卸载时取消准备任务。


### Link Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 文字、图标与加载图标的五档尺寸 | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' |
| `href` | 原生链接地址 | string | - |
| `target` | 原生打开目标 | string | - |
| `rel` | 原生链接关系 | string | - |
| `status` | 链接语义状态 | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | 'default' |
| `underline` | 下划线策略 | 'always' \| 'hover' \| 'none' | 'none' |
| `hoverable` | 显示带内边距的悬浮/按下底色 | boolean | false |
| `icon` | 显示默认前置图标；icon 插槽优先 | boolean | false |
| `loading` | 显示加载图标并阻止导航与点击 | boolean | false |
| `disabled` | 禁用链接 | boolean | false |


### Link Events

| 事件名 | 说明                                              | 参数 |
| --- |-------------------------------------------------| --- |
| `click` | 点击链接时触发 | `event: MouseEvent` |

### Link Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 链接内容 | `-` |
| `icon` | 自定义链接图标 | `-` |

## Types

```ts
import type { LinkProps, LinkSize, LinkUnderline, LinkInstance } from '@maple-design/ui'
```

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-link-bg-active` | `var(--mp-color-fill-3)` | `background-color` |
| `--mp-link-bg-hover` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-link-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-link-danger-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-link-default-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-link-disabled-color` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-link-focus-color` | `currentColor` | `outline` |
| `--mp-link-focus-offset` | `2px` | `outline-offset` |
| `--mp-link-focus-opacity` | `0.8` | `opacity` |
| `--mp-link-focus-width` | `2px` | `outline` |
| `--mp-link-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-link-icon-size` | `1em` | `font-size` |
| `--mp-link-info-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-link-line-height` | `1.5` | `line-height` |
| `--mp-link-margin-icon-right` | `0.25em` | `margin-inline-end` |
| `--mp-link-padding-horizontal` | `0.25em` | `padding` |
| `--mp-link-padding-vertical` | `1px` | `padding` |
| `--mp-link-primary-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-link-secondary-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-link-size-icon` | `var(--mp-link-icon-size)` | `font-size` |
| `--mp-link-size-lg-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-link-size-md-font-size` | `var(--mp-link-font-size)` | `font-size` |
| `--mp-link-size-sm-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-link-size-xl-font-size` | `var(--mp-sys-font-size-xl)` | `font-size` |
| `--mp-link-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-link-spin-duration` | `1s` | `animation` |
| `--mp-link-success-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-link-tertiary-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-link-text-color` | `var(--mp-link-primary-color)` | `color` |
| `--mp-link-text-color-active` | `var(--mp-link-text-color)` | `color` |
| `--mp-link-text-color-default` | `var(--mp-link-default-color)` | `color` |
| `--mp-link-text-color-disabled` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-error` | `var(--mp-link-danger-color)` | `color` |
| `--mp-link-text-color-error-active` | `var(--mp-link-text-color-error)` | `color` |
| `--mp-link-text-color-error-disabled` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-error-hover` | `var(--mp-link-text-color-error)` | `color` |
| `--mp-link-text-color-error-loading` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-hover` | `var(--mp-link-text-color)` | `color` |
| `--mp-link-text-color-info` | `var(--mp-link-info-color)` | `color` |
| `--mp-link-text-color-loading` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-primary` | `var(--mp-link-primary-color)` | `color` |
| `--mp-link-text-color-secondary` | `var(--mp-link-secondary-color)` | `color` |
| `--mp-link-text-color-success` | `var(--mp-link-success-color)` | `color` |
| `--mp-link-text-color-success-active` | `var(--mp-link-text-color-success)` | `color` |
| `--mp-link-text-color-success-disabled` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-success-hover` | `var(--mp-link-text-color-success)` | `color` |
| `--mp-link-text-color-success-loading` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-tertiary` | `var(--mp-link-tertiary-color)` | `color` |
| `--mp-link-text-color-warning` | `var(--mp-link-warning-color)` | `color` |
| `--mp-link-text-color-warning-active` | `var(--mp-link-text-color-warning)` | `color` |
| `--mp-link-text-color-warning-disabled` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-text-color-warning-hover` | `var(--mp-link-text-color-warning)` | `color` |
| `--mp-link-text-color-warning-loading` | `var(--mp-link-disabled-color)` | `color` |
| `--mp-link-transition-duration` | `0.15s` | `transition` |
| `--mp-link-warning-color` | `var(--mp-sys-color-content-warning)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-link-border-radius: var(--mp-sys-radius-md);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 样式定制

请使用 `--mp-link-*` CSS 变量定制颜色、图标和焦点样式。

文字配色与 Button 的 text 变体一致：default 使用 content-primary，secondary / tertiary 使用 content-secondary，彩色状态使用对应 content 语义色，禁用和加载使用 content-disabled。两品牌明暗模式均继承这些规则。

尺寸变量：`--mp-link-size-xs-font-size`, `--mp-link-size-sm-font-size`, `--mp-link-size-md-font-size`, `--mp-link-size-lg-font-size`, `--mp-link-size-xl-font-size`。默认分别为 12 / 13 / 14 / 16 / 18px；md 引用原有 `--mp-link-font-size`，图标和加载图标使用 1em。
