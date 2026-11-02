# 悬浮动作按钮

### 介绍

悬浮动作按钮组件，按下可显示一组动作按钮。

右侧示例提供实时预览区，初始展开动作，点击动作后弹出 Message 并收起。调整方向时会将按钮移到可容纳菜单的一侧，避免菜单跑出屏幕。hover 适合鼠标操作，触摸设备建议使用 click。

普通预览使用 `fixed=false`、`popup-container=false`，定位在预览容器内。拖拽示例保留默认的 `fixed=true` 以启用拖拽能力，使用 `popup-container=false` 将按钮留在预览容器内，拖动边界按容器尺寸计算。拖拽使用触摸手势。

开启或关闭拖拽时，预览区和按钮持续显示；关闭后停止拖动。预览区随页面正常滚动。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## 外观与状态

### 主题色按钮

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `fixed` | 是否使用固定定位，设置为 `false` 可开启绝对定位（绝对定位无法使用拖拽） | 主题色按钮、禁用 |
| `popup-container` | 组件挂载的元素 | 主题色按钮、禁用 |
| `status` | 状态，可选值为 `default` `primary` `info` `success` `warning` `danger` | 主题色按钮、禁用 |
| `disabled` | 是否禁用 | 禁用 |
<!-- demo-config-notes:end -->

```demo
../example/demos/status.vue
```

### 禁用

```demo
../example/demos/disabled.vue
```

## 外观与定位

### 触发器位置

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `fixed` | 是否使用固定定位，设置为 `false` 可开启绝对定位（绝对定位无法使用拖拽） | 触发器位置 |
| `popup-container` | 组件挂载的元素 | 触发器位置 |
| `position` | 按钮自身在屏幕或定位容器中的角落，默认 bottom-right；四角统一使用上下在前的拼写 | 触发器位置 |
<!-- demo-config-notes:end -->

```demo
../example/demos/position.vue
```

## 动作与交互

### 触发方式

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `popup-container` | 组件挂载的元素 | 触发方式、动作菜单弹出方向、开启拖拽 |
| `fixed` | 是否使用固定定位，设置为 `false` 可开启绝对定位（绝对定位无法使用拖拽） | 触发方式、动作菜单弹出方向、整体显示/隐藏 |
| `status` | 状态，可选值为 `default` `primary` `info` `success` `warning` `danger` | 触发方式、动作菜单弹出方向、整体显示/隐藏 |
| `trigger` | 触发方式 `click` `hover` | 触发方式 |
| `position` | 按钮自身在屏幕或定位容器中的角落，默认 bottom-right；四角统一使用上下在前的拼写 | 动作菜单弹出方向 |
| `placement` | 动作菜单相对按钮的放置侧，默认 top；不会自动翻转，不改变按钮自身 position | 动作菜单弹出方向 |
<!-- demo-config-notes:end -->

```demo
../example/demos/trigger.vue
```

### 动作菜单弹出方向

```demo
../example/demos/direction.vue
```

### 开启拖拽

```demo
../example/demos/drag.vue
```

### 整体显示/隐藏

```demo
../example/demos/visibility.vue
```

### 动作菜单展开/收起

```demo
../example/demos/controlled.vue
```

### 自定义触发器

```demo
../example/demos/custom-trigger.vue
```

### visible 与 v-if

不需要保留实例时，直接使用 `<mp-fab v-if="showFab" />`，无需再传 visible。v-if=false 会销毁 FAB、拖拽状态与动作子组件；重新显示会重新读取 defaultOpen。`:visible="showFab"` 保留实例和内部状态，只隐藏触发器与动作内容。FAB 默认通过 Drag/Teleport 挂到弹层容器，visible 在实际内容内部控制显示；不要依赖对 Teleport 组件直接使用 v-show。动作菜单自身仍使用 open。

## API

`open` / `update:open` 通过 `v-model:open` 控制动作菜单展开；未绑定时使用 `defaultOpen` 初始化，之后由组件维护。`visible` 控制整个组件显示，不改变动作菜单保存的展开状态。`trigger` 插槽参数为 `{ open }`。

### 属性

| 参数              | 说明                                                             | 类型     | 默认值        |
|------------------|----------------------------------------------------------------- |----------|----------------|
| `v-model:open` | 动作菜单是否展开                                                    | _boolean_ | `false`       |
| `default-open` | 非受控初始展开状态，仅创建时读取 | _boolean_ | `false` |
| `visible`           | 是否显示整个组件 | _boolean_ | `true`    |
| `drag`      | Drag 组件配置，用于深度定制（支持 `axis` `attraction` `boundary`） | _boolean \| DragProps_  | `false`    |
| `status`         | 状态，可选值为 `default` `primary` `info` `success` `warning` `danger` | _string_ | `primary`    |
| `position` | 按钮自身在屏幕或定位容器中的角落，默认 bottom-right；四角统一使用上下在前的拼写 | _string_ | `bottom-right`    |
| `placement` | 动作菜单相对按钮的放置侧，默认 top；不会自动翻转，不改变按钮自身 position | _string_ | `top`    |
| `trigger` | 触发方式 `click` `hover` | _string_ | `click`    |
| `disabled` | 是否禁用 | _boolean_ | `false`    |
| `color` | 触发器颜色 | _string_ | `-`    |
| `closed-icon` | 未展开时触发器图标 | _string_ | `plus`    |
| `open-icon` | 展开时触发器图标 | _string_ | `close`    |
| `closed-icon-size` | 未展开时触发器图标尺寸 | _string \| number_ | `-` |
| `open-icon-size` | 展开时触发器图标尺寸 | _string \| number_ | `-` |
| `fixed` | 是否使用固定定位，设置为 `false` 可开启绝对定位（绝对定位无法使用拖拽） | _boolean_ | `true` |
| `z-index` | 同 css z-index，用于自定义触发器层级 | _string \| number_ | `90` |
| `top` | 同 css top，用于自定义触发器位置 | _string \| number_ | `-` |
| `bottom` | 同 css bottom，用于自定义触发器位置 | _string \| number_ | `-` |
| `left` | 同 css left，用于自定义触发器位置 | _string \| number_ | `-` |
| `right` | 同 css right，用于自定义触发器位置 | _string \| number_ | `-` |
| `safe-area` | 是否开启底部安全区适配	 | _boolean_ | `false` |
| `popup-container` | 组件挂载的元素 | _TeleportProps['to'] \| false_ | `body` |
| `elevation`      | 海拔高度，可选值为 `true`、`false` 和 `0-24` 的等级 | _number \| boolean_ | `true`            |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击触发器时触发，在 `disabled` 状态为 `true` 时不触发 | `open: boolean, event: Event` |
| `open` | 在激活并打开动作菜单时触发 | `-` |
| `opened` | 在激活并打开动作菜单的动画结束时触发 | `-` |
| `close` | 在失活并关闭动作菜单时触发 | `-` |
| `closed` | 在失活并关闭动作菜单的动画结束时触发 | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 动作菜单 |  `-` |
| `trigger` | 触发器 | `{ open: boolean }` |


### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--fab-top` | `70px` |
| `--fab-bottom` | `16px` |
| `--fab-left` | `16px` |
| `--fab-right` | `16px` |
| `--fab-trigger-size` | `56px` |
| `--fab-trigger-border-radius` | `50%` |
| `--mp-fab-trigger-inactive-icon-size` | `26px` |
| `--mp-fab-trigger-active-icon-size` | `22px` |
| `--fab-actions-padding` | `10px 0` |
| `--fab-action-margin` | `6px` |
| `--fab-action-size` | `40px` |
| `--fab-action-border-radius` | `50%` |
| `--fab-transition-standard-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` |
