# 警告信息

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

### 介绍

警告信息组件会向用户显示简短的消息，但不会中断他们的使用。

## 外观与状态

### 外观配置对比

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 变体

`variant` 可选值：`standard` / `tonal` / `outline`。

#### 外观组合

适用于提示信息的强调程度。调整变体、状态，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

#### 类型

`status` 可选值：`info` / `success` / `warning` / `danger` / `default`。`default` 不显示内置图标。

</details>

```demo
../example/demos/appearance-lab.vue
```

## 内容与展示

### 标题、对齐与通栏

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `message` | 内容 | 标题、对齐与通栏、隐藏图标、操作区 |
| `title` | 标题 | 标题、对齐与通栏、隐藏图标、操作区 |
| `center` | 内容是否居中 | 标题、对齐与通栏 |
| `banner` | 通栏模式（去除圆角） | 标题、对齐与通栏 |
| `show-icon` | 是否显示左侧图标 | 隐藏图标 |
<!-- demo-config-notes:end -->

比较标题层级、内容居中与通栏布局。通栏用于页面级提示；操作和关闭能力另见后续示例。

```demo
../example/demos/content-comparison.vue
```

### 隐藏图标

```demo
../example/demos/show-icon.vue
```

### 操作区

```demo
../example/demos/action.vue
```

### 信息

```demo
../example/demos/message.vue
```

## 自定义与插槽

### 自定义图标

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `title` | 标题 | 自定义图标 |
| `message` | 内容 | 自定义图标 |
<!-- demo-config-notes:end -->

```demo
../example/demos/custom-icon.vue
```

## 交互与控制

### 关闭入口与自定义图标

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `title` | 标题 | 关闭入口与自定义图标 |
| `message` | 内容 | 关闭入口与自定义图标 |
| `closable` | 是否显示关闭按钮（注意：不再使用 `closeable`） | 关闭入口与自定义图标 |
<!-- demo-config-notes:end -->

分别操作默认与自定义关闭入口，比较相同关闭能力的呈现方式。

<details>
<summary>配置说明与使用限制</summary>

#### 允许关闭

关闭按钮可点击、Space 或 Enter 激活。close 是关闭请求，closed 在退出动画结束后触发；若在 close 中直接卸载组件，就不能观察该组件的动画结束。示例保留实例到关闭结束，显示两种事件次数；重新打开使用新 key，只重建该示例的 Alert，不影响其他实例。

</details>

```demo
../example/demos/dismiss-comparison.vue
```

## API

### Alert Props

| 参数        | 说明                                                                 | 类型                | 默认值     |
| ----------- | -------------------------------------------------------------------- | ------------------- | ---------- |
| status      | 类型，可选值为 `info` / `success` / `warning` / `danger` / `default` | _AlertStatus_<br>`'default' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `info`     |
| `variant`   | 变体，可选值为 `standard` / `outline` / `tonal`                      | _AlertVariant_<br>`'standard' \| 'outline' \| 'tonal'` | `standard` |
| `color`     | 自定义背景色                                                         | _string_            | `-`        |
| `title`     | 标题                                                                 | _string_            | `-`        |
| `message`   | 内容                                                                 | _string_            | `-`        |
| `show-icon` | 是否显示左侧图标                                                     | _boolean_           | `true`     |
| `closable`  | 是否显示关闭按钮（注意：不再使用 `closeable`）                       | _boolean_           | `false`    |
| `banner`    | 通栏模式（去除圆角）                                                 | _boolean_           | `false`    |
| `center`    | 内容是否居中                                                         | _boolean_           | `false`    |
| `elevation` | 海拔高度，可选值为 `true` / `false` 和 `0-24`                        | _number \| boolean_ | `false`    |

### Alert Slots

| 名称         | 说明       |
| ------------ | ---------- |
| `default`    | 内容       |
| `title`      | 标题       |
| `icon`       | 前缀       |
| `action`     | 右侧操作区 |
| `close-icon` | 关闭图标   |

### Alert Events

| 事件名   | 说明               | 回调参数       |
| -------- | ------------------ | -------------- |
| `close`  | 点击关闭按钮时触发 | `event: MouseEvent` |
| `closed` | 关闭过渡结束后触发 | `-`            |

## Types

```ts
import type { AlertInstance, AlertProps, AlertStatus, AlertVariant } from 'ui'
```

## 升级提示（Breaking）

- `closeable` → `closable`
- 新增 `default` 类型与 `show-icon` / `banner` / `center` / `closed` API
- 移除 `content` 插槽（结构调整为 `body`）

## 使用说明



关闭按钮支持键盘操作；close 只触发一次，closed 在离场动画完成后触发。

### 关闭名称与投影类型

关闭入口的可访问名称使用通用语言词条 `common.close`，随当前语言作用域响应式更新；`close-icon` 仅替换图形。Cedar 通过 ConfigProvider 的 `locale.common.close` 定制，Maple 通过 LocaleProvider 语言包的 `'common.close'` 词条定制。

`elevation` 只接受布尔值或数字；数字层级请使用 `:elevation="4"`，字符串 `elevation="4"` 不属于公开类型。键盘关闭与点击统一发出 MouseEvent，`closed` 仍在退出动画结束后通知。

## CSS Variables

参见 `style/token.less` 中 `:root` 下的 `--mp-alert-*` 变量。所有变量统一以 `--mp-alert-` 前缀，可通过 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

彩色标题、正文、图标及 outline 描边使用可读 system content。standard 与 tonal 使用同一第 1 阶浅底，前者额外带弱装饰描边；默认标题为 content-primary，正文、图标为 content-secondary。content 变量同时控制根容器继承色，关闭图标及未显式设色的操作内容跟随它。Maple 暗色继承同一套颜色，但保留原有几何覆盖（内边距 16px、图标 22px、图标/关闭间距 12px、正文行高 1.5）。color 仅改背景，调用方须同时验证前景对比度。下表为 :root 默认值，不是主题覆盖值。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-alert-action-margin-left` | `var(--mp-sys-space-5)` | `margin-inline-start` |
| `--mp-alert-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-alert-border-width` | `1px` | `border` |
| `--mp-alert-close-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |
| `--mp-alert-close-margin-left` | `var(--mp-sys-space-4)` | `margin-inline-start` |
| `--mp-alert-font-size-content` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-alert-font-size-title` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-alert-font-weight-title` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-alert-icon-margin-right` | `var(--mp-sys-space-4)` | `margin-inline-end` |
| `--mp-alert-icon-size` | `16px` | `font-size` |
| `--mp-alert-line-height` | `1.5715` | `line-height` |
| `--mp-alert-line-height-title` | `1.5` | `line-height` |
| `--mp-alert-outline-danger-border` | `var(--mp-sys-color-content-danger)` | `border-color` |
| `--mp-alert-outline-danger-content` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-outline-danger-icon` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-outline-danger-title` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-outline-default-border` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-alert-outline-default-content` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-outline-default-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-outline-default-title` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-alert-outline-info-border` | `var(--mp-sys-color-content-info)` | `border-color` |
| `--mp-alert-outline-info-content` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-outline-info-icon` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-outline-info-title` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-outline-success-border` | `var(--mp-sys-color-content-success)` | `border-color` |
| `--mp-alert-outline-success-content` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-outline-success-icon` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-outline-success-title` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-outline-warning-border` | `var(--mp-sys-color-content-warning)` | `border-color` |
| `--mp-alert-outline-warning-content` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-outline-warning-icon` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-outline-warning-title` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-padding-horizontal` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-alert-padding-horizontal-with-title` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-alert-padding-vertical` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-alert-padding-vertical-with-title` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-alert-standard-danger-bg` | `rgb(var(--mp-danger-1))` | `background-color` |
| `--mp-alert-standard-danger-border` | `rgb(var(--mp-danger-3))` | `border-color` |
| `--mp-alert-standard-danger-content` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-standard-danger-icon` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-standard-danger-title` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-standard-default-bg` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-alert-standard-default-border` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-alert-standard-default-content` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-standard-default-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-standard-default-title` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-alert-standard-info-bg` | `rgb(var(--mp-blue-1))` | `background-color` |
| `--mp-alert-standard-info-border` | `rgb(var(--mp-blue-3))` | `border-color` |
| `--mp-alert-standard-info-content` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-standard-info-icon` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-standard-info-title` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-standard-success-bg` | `rgb(var(--mp-success-1))` | `background-color` |
| `--mp-alert-standard-success-border` | `rgb(var(--mp-success-3))` | `border-color` |
| `--mp-alert-standard-success-content` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-standard-success-icon` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-standard-success-title` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-standard-warning-bg` | `rgb(var(--mp-warning-1))` | `background-color` |
| `--mp-alert-standard-warning-border` | `rgb(var(--mp-warning-3))` | `border-color` |
| `--mp-alert-standard-warning-content` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-standard-warning-icon` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-standard-warning-title` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-title-margin-bottom` | `var(--mp-sys-space-2)` | `margin-bottom` |
| `--mp-alert-tonal-danger-bg` | `rgb(var(--mp-danger-1))` | `background-color` |
| `--mp-alert-tonal-danger-content` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-tonal-danger-icon` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-tonal-danger-title` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-alert-tonal-default-bg` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-alert-tonal-default-content` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-tonal-default-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-alert-tonal-default-title` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-alert-tonal-info-bg` | `rgb(var(--mp-blue-1))` | `background-color` |
| `--mp-alert-tonal-info-content` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-tonal-info-icon` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-tonal-info-title` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-alert-tonal-success-bg` | `rgb(var(--mp-success-1))` | `background-color` |
| `--mp-alert-tonal-success-content` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-tonal-success-icon` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-tonal-success-title` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-alert-tonal-warning-bg` | `rgb(var(--mp-warning-1))` | `background-color` |
| `--mp-alert-tonal-warning-content` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-tonal-warning-icon` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-alert-tonal-warning-title` | `var(--mp-sys-color-content-warning)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-alert-border-radius: var(--mp-sys-radius-md);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 动效

内置动效遵循 `prefers-reduced-motion: reduce`；减少动效不会阻止加载状态或关闭事件更新。
