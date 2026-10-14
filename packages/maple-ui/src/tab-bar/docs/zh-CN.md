# 底部标签栏

### 介绍

在页面底部显示导航和关键操作。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 通过名称匹配

```demo
../example/demos/match-by-name.vue
```

### 徽标提示

TabBar 徽标默认使用 xs 尺寸并向图标右上方外侧展开；通过 badge 对象可覆盖 size、position、offsetX、offsetY。普通与 variant 模式均支持红点、数字和 max 上限。

```demo
../example/demos/show-badge.vue
```

### 自定义颜色

```demo
../example/demos/custom-color.vue
```

### 监听切换事件

```demo
../example/demos/change-event.vue
```

### 监听点击事件

```demo
../example/demos/click-event.vue
```

### 悬浮按钮

悬浮按钮用于发布、拍摄或新建等主要操作。点击加号打开发布框，不切换当前导航。

导航项为偶数时按钮居中，为奇数时靠右；下方单独切换导航项数量来观察布局。

```demo
../example/demos/fab.vue
```

### 变体

```demo
../example/demos/variant.vue
```

### 非受控初始选中

```demo
../example/demos/uncontrolled.vue
```

### 数字名称与重排

```demo
../example/demos/numeric-name.vue
```

### 自定义选中标签

```demo
../example/demos/custom-label.vue
```

### 异步切换与拦截

```demo
../example/demos/async-change.vue
```

## API

### 属性

#### TabBar Props

| 参数               | 说明              | 类型 | 默认值 |
|------------------|-----------------| ---- | ---- |
| `v-model:active` | 当前选中名称或索引；传入时为受控模式 | _number \| string_ | `undefined` |
| `default-active` | 非受控初始选中值，仅初始化时读取 | _number \| string_ | `0` |
| `before-change` | 切换前校验；返回真值允许，假值、抛错或 Promise 拒绝取消；仅最后一次请求可生效 | _(active: number \| string) => boolean \| Promise&lt;boolean&gt;_ | `-` |
| `fixed`          | 是否固定在底部         | _boolean_ | `false` |
| `border`         | 是否显示外边框         | _boolean_ | `false` |
| `safe-area`       | 是否开启底部安全区适配 | _boolean_ | `false` |
| `z-index`        | 元素 z-index；显式传入时优先于 CSS 变量 | _number \| string_ | `undefined`（CSS 默认 `1`） |
| `active-color`   | 选中标签的颜色         | _string_ | `-` |
| `inactive-color` | 未选中标签的颜色        | _string_ | `-` |
| `placeholder`  ***3.2.11***   | 是否在底部生成相同高度的占位元素(需设置 `fixed`)  | _boolean_ | `false` |
| `fab-props`      | 悬浮按钮属性          | _ButtonProps_ | `{ status: 'primary' }` |
| `variant` ***3.2.0***      | 变体模式          | _boolean_ | `false` |

未传 active 时组件自行维护选中值；传入 active 时仅通知调用者更新。撤去 active 后从最后的受控值继续。数字 name 优先于无 name 子项的索引；有 name 的子项不再按索引匹配。

#### TabBarItem Props

|参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| `name` | 标签名称，作为匹配的标识符 | _number \| string_ | `-` |
| `icon` | 图标名称，等同于 Icon 组件的 [name](#/zh-CN/icon) | _string_ | `-` |
| `label` | 标签文字内容 | _string_ | - |
| `badge` | 图标右上角徽标 | _boolean \| BadgeProps_ | `false` |

### 事件

#### TabBar Events

|事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| `change` | 切换标签时触发 | `active: number \| string` |
| `fab-click` | 悬浮按钮点击时触发 | `-` |

#### TabBarItem Events

|事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| `click` | 点击时触发 | `active: number \| string` |

### 插槽

#### TabBar Slots

| 名称 | 说明                    | 参数 |
| ---- |-----------------------| ----|
| `default` | 底部导航栏内容               |`-` |
| `fab` | 支持在组件中插入一个自定义的 fab 按钮 | `-` |

#### TabBarItem Slots

| 名称 | 说明 | 参数 |
| ---- | ---- | ----|
| `default` | 自定义标签文字内容，会覆盖 `label` 的内容  | `active: boolean` |
| `icon` | 自定义图标 | `active: boolean` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### TabBar Variables

未传 `z-index` 时消费 `--mp-tab-bar-z-index`，因此局部主题覆盖可以生效；显式数值或 CSS 字符串属性优先。默认视觉层级仍为 `1`，但属性默认值不再固定为 `1`。

| 变量名 | 默认值 |
| --- | --- |
| `--mp-tab-bar-height` | `50px` |
| `--mp-tab-bar-variant-height` | `66px` |
| `--mp-tab-bar-z-index` | `1` |
| `--mp-tab-bar-background-color` | `var(--mp-color-bg-2)` |
| `--mp-tab-bar-border-color` | `var(--color-border-2)` |
| `--mp-tab-bar-fab-offset` | `4px` |

#### TabBarItem Variables

| 变量名 | 默认值 |
| --- | --- |
| `--mp-tab-bar-item-font-size` | `var(--font-size-sm)` |
| `--mp-tab-bar-item-inactive-color` | `var(--mp-color-text-2)` |
| `--mp-tab-bar-item-active-color` | `var(--color-primary)` |
| `--mp-tab-bar-item-active-background-color` | `transparent` |
| `--mp-tab-bar-item-line-height` | `1` |
| `--mp-tab-bar-item-icon-size` | `22px` |
| `--mp-tab-bar-item-icon-margin-bottom` | `5px` |
| `--mp-tab-bar-fab-border-radius` | `50%` ` |
| `--mp-tab-bar-item-variant-icon-container-height` | `30px` |
| `--mp-tab-bar-item-variant-icon-container-border-radius` | `100px` |
| `--mp-tab-bar-item-variant-icon-container-max-width` | `58px` |
| `--mp-tab-bar-item-variant-active-background-color` | `color-mix(in srgb, var(--mp-color-primary) 14%, var(--mp-tab-bar-background-color))` |
| `--mp-tab-bar-item-variant-active-color` | `var(--mp-color-primary)` |
