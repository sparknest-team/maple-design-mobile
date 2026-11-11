# 底部标签栏

### 介绍

在页面底部显示导航和关键操作。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 外观与内容

### 胶囊指示器

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `variant` | 外观样式 | 胶囊指示器、徽标提示 |
| `active-color` | 选中标签的颜色 | 自定义颜色 |
| `fab-props` | 悬浮按钮属性 | 悬浮按钮 |
<!-- demo-config-notes:end -->

设置 `variant="pill"`，为选中图标显示胶囊背景；默认 `standard` 仅改变选中颜色。

```demo
../example/demos/variant.vue
```

### 徽标提示

TabBar 徽标默认使用 xs 尺寸并向图标右上方外侧展开；通过 badge 对象可覆盖 size、position、offsetX、offsetY。标准与胶囊样式均支持红点、数字和 max 上限。

```demo
../example/demos/show-badge.vue
```

### 自定义颜色

```demo
../example/demos/custom-color.vue
```

### 悬浮按钮

悬浮按钮用于发布、拍摄或新建等主要操作。点击加号打开发布框，不切换当前导航。

导航项为偶数时按钮居中，为奇数时靠右；下方单独切换导航项数量来观察布局。

```demo
../example/demos/fab.vue
```

### 自定义选中标签

通过 default 插槽的 `active` 参数加粗选中标签。

```demo
../example/demos/custom-label.vue
```

## 值模型与交互

### 通过名称匹配

```demo
../example/demos/match-by-name.vue
```

### 点击与值变更事件

分别点击当前项和其他项，对比点击通知与值变更通知；受控和非受控值模型另行展示。

```demo
../example/demos/event-comparison.vue
```

### 非受控初始选中

```demo
../example/demos/uncontrolled.vue
```

### 稳定 key 与选中保持

`key` 保留节点身份，`name` 匹配选中项。两者使用同一个稳定标识，不要使用数组索引作为 key。

```demo
../example/demos/stable-key.vue
```

## 异步切换

### 异步切换与拦截

```demo
../example/demos/async-change.vue
```

## 加载与等待

### 受控加载

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 业务显式控制的加载状态 | `boolean` | `false` |

外部 loading 暂停标签切换；内部 before 守卫等待与它合并展示。


通过 loading 显式展示等待；普通事件返回值不参与加载。before-* 守卫按其契约管理内部等待状态。

```demo
../example/demos/loading.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。导航项随阅读方向排列，选中值与项目顺序保持不变。自动留出的浮动按钮空间位于阅读终点；中心按钮仍居中。Badge 显式命名的位置保持物理角落。

## API

`default` 和 `icon` 插槽的 active 表示当前项 name 是否对应 modelValue；焦点、悬停不会改变 active。activeColor/inactiveColor 分别控制当前项和非当前项的颜色。

#### 异步操作反馈
before-* 等待期间显示加载反馈并标记 aria-busy；拒绝或失败后恢复，重复提交不再启动同一操作。普通事件返回的 Promise 不参与加载。切换到其他目标仍保留最后一次请求优先的规则。

#### guard-error
切换守卫失败后通知一次，参数为 `(error, value)`。

TabBar 使用按钮组表达状态选择，选中项通过 aria-pressed 标记；可为根组件传入 aria-label 命名。若用于页面导航，业务负责路由跳转；普通事件只通知，不等待返回值。

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示选中子项的 name；未提供 name 的位置模式使用从 0 开始的索引；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

### TabBar Props

| 参数               | 说明              | 类型 | 默认值 |
|------------------|-----------------| ---- | ---- |
| `v-model` | 当前选中名称或索引；传入时为受控模式 | _number \| string_ | `undefined` |
| `loading` | 业务显式控制的加载状态，期间禁止切换 | _boolean_ | `false` |
| `default-value` | 非受控初始选中值，仅初始化时读取 | _number \| string_ | `0` |
| `before-change` | 切换前校验；返回真值允许，假值、抛错或 Promise 拒绝取消；仅最后一次请求可生效 | `TabBarBeforeChange`：`(active: number \| string) => unknown`，可返回 Promise，支持函数数组 | `-` |
| `fixed`          | 是否固定在底部         | _boolean_ | `false` |
| `border`         | 是否显示外边框         | _boolean_ | `false` |
| `safe-area`       | 是否开启底部及左右安全区适配 | _boolean_ | `false` |
| `z-index`        | 元素 z-index；显式传入时优先于 CSS 变量 | _number \| string_ | `undefined`（CSS 默认 `1`） |
| `active-color`   | 选中标签的颜色         | _string_ | `-` |
| `inactive-color` | 未选中标签的颜色        | _string_ | `-` |
| `placeholder`  ***3.2.11***   | 是否在底部生成相同高度的占位元素(需设置 `fixed`)  | _boolean_ | `false` |
| `fab-props`      | 悬浮按钮属性          | _ButtonProps_ | `{ status: 'primary' }` |
| `variant` | 外观样式 | _TabBarVariant_：`standard` / `pill` | `standard` |

未传 model-value 时组件自行维护选中值；传入 model-value 时仅通知调用者更新。撤去 model-value 后从最后的受控值继续。数字 name 优先于无 name 子项的索引；有 name 的子项不再按索引匹配。

### TabBarItem Props

|参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| `name` | 标签名称，作为匹配的标识符 | _number \| string_ | `-` |
| `icon` | 图标名称，等同于 Icon 组件的 [name](#/zh-CN/icon) | _string_ | `-` |
| `label` | 标签文字内容 | _string_ | - |
| `badge` | 图标右上角徽标 | _boolean \| BadgeProps_ | `false` |

### TabBarItem Events

|事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| `click` | 点击时触发 | `active: number \| string` |

### TabBar Events

|事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| `update:modelValue` | 请求更新选中值 | `active: number \| string` |
| `change` | 切换标签时触发 | `active: number \| string` |
| `guard-error` | 守卫抛错或 Promise 拒绝时触发 | `error: unknown, value: number \| string` |
| `fab-click` | 悬浮按钮点击时触发 | `-` |

### TabBarItem Slots

| 名称 | 说明 | 参数 |
| ---- | ---- | ----|
| `default` | 自定义标签文字内容，会覆盖 `label` 的内容  | `active: boolean` |
| `icon` | 自定义图标 | `active: boolean` |

### TabBar Slots

| 名称 | 说明                    | 参数 |
| ---- |-----------------------| ----|
| `default` | 底部导航栏内容               |`-` |
| `fab` | 支持在组件中插入一个自定义的 fab 按钮 | `-` |

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

未传 `z-index` 时消费 `--mp-tab-bar-z-index`，因此局部主题覆盖可以生效；显式数值或 CSS 字符串属性优先。默认视觉层级为 `1`。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-tab-bar-background-color` | `var(--mp-color-bg-2)` | `background-color` |
| `--mp-tab-bar-border-color` | `var(--mp-color-border-2)` | `border-top` |
| `--mp-tab-bar-fab-border-radius` | `50%` | `border-radius` |
| `--mp-tab-bar-fab-offset` | `4px` | `inset-inline-end`, `margin-inline-end` |
| `--mp-tab-bar-height` | `50px` | `height`, `inset-inline-end`, `margin-inline-end`, `margin-inline-start`, `width` |
| `--mp-tab-bar-item-active-background-color` | `transparent` | `background-color` |
| `--mp-tab-bar-item-active-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-tab-bar-item-focus-color` | `currentColor` | `outline` |
| `--mp-tab-bar-item-focus-offset` | `-2px` | `outline-offset` |
| `--mp-tab-bar-item-focus-width` | `2px` | `outline` |
| `--mp-tab-bar-item-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-tab-bar-item-icon-margin-bottom` | `5px` | `margin-top` |
| `--mp-tab-bar-item-icon-size` | `22px` | `font-size` |
| `--mp-tab-bar-item-inactive-color` | `var(--mp-color-text-2)` | `color` |
| `--mp-tab-bar-item-line-height` | `1` | `line-height` |
| `--mp-tab-bar-item-variant-active-background-color` | `color-mix(in srgb, var(--mp-color-primary) 14%, var(--mp-tab-bar-background-color))` | `background-color` |
| `--mp-tab-bar-item-variant-active-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-tab-bar-item-variant-icon-container-border-radius` | `100px` | `border-radius` |
| `--mp-tab-bar-item-variant-icon-container-height` | `30px` | `height` |
| `--mp-tab-bar-item-variant-icon-container-max-width` | `58px` | `max-width` |
| `--mp-tab-bar-variant-height` | `66px` | `height` |
| `--mp-tab-bar-z-index` | `1` | 组件样式 |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-tab-bar-background-color: var(--mp-color-bg-2);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
