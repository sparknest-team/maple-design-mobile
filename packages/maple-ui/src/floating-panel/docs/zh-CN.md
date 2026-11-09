# 浮动面板

### 介绍
浮动在页面底部的面板，常用于提供额外的功能或信息，用户可灵活上下滑动浏览内容。

## 基础示例

### 基本使用

演示面板限制在 400px 高的独立容器中，不覆盖文档页面；使用 `popup-container=false` 与局部固定定位包含块。业务页面不传该属性时仍默认浮动在窗口底部。自定义锚点为 80、180、320px；“仅头部拖拽”中内容只滚动，不改变面板高度。

```demo
../example/demos/basic.vue
```

## 使用说明

### 配置说明

原生 `id`、`aria-*`、class、style 和事件监听器作用于实际面板根节点；内置变换与业务样式合并。

## API

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示严格受控的当前停靠高度，单位 px；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。拖动中显示临时高度；结束时通知候选锚点，父级未接受时恢复绑定值对应的有效锚点。`touchcancel`、停用及拖动中修改主值或锚点均取消本次手势，不提交。

### FloatingPanel Props

| 参数              | 说明                                                             | 类型     | 默认值        |
|------------------|----------------------------------------------------------------- |----------|----------------|
| `v-model`    | 当前停靠高度，单位 px；拖动结束并吸附后更新 | _number_ | `-`  |
| `default-value` | 非受控初始高度，仅创建时读取 | _number_ | `100` |
| `anchors`           | 有限非负锚点，单位 px；过滤非法项并去重，空或全非法时使用默认值；不要求排序，等距时优先原数组中靠前的锚点 | _number[]_ | `[100, window.innerHeight * 0.6]`  |
| `content-draggable` | 是否允许拖拽面板内容       | _boolean_ | `true`  |
| `duration`          | 有限非负动画时长，单位 ms；支持数值字符串，非法值回退 300，0 关闭位移动画          | _number \| string_ | `300`  |
| `elevation`         | 海拔高度，可选值为 `true`、`false` 和 `0-24` 的等级                                                            | _number \| boolean_ | `true`            |
| `popup-container` | 挂载目标：省略时为 body，false 为当前位置；支持选择器或 HTMLElement | _PopupContainer_ | `body` |
| `safe-area`         | 是否开启底部及左右安全区适配        | _boolean_ | `false`  |

省略 `popup-container` 时挂载到 `body`；传 `false` 在当前位置渲染。选择器目标缺失或无效时回退 `body`，开发环境会提示；可在运行时切换目标，SSR 不查询浏览器 DOM。

### FloatingPanel Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `update:model-value` | 用户拖动结束并吸附后回传高度；初始化不触发 | `height: number` |
| `height-change` | 用户结束拖动且候选锚点改变时通知；不保证父级接受 | `height: number` |

### FloatingPanel Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 自定义面板内容 |  `-` |
| `header` | 自定义面板标头 |  `-` |

### 键盘与类型

自定义锚点示例通过 header 插槽提供原生“收起”和“展开”按钮，键盘 Enter/Space 可调整同一个 v-model。默认拖拽条只提供触摸操作，面板根不自动声明 dialog 或按钮角色；业务按内容提供区域名称与交互语义。

高度与初始值必须是有限非负数；非法值按最小有效锚点展示。动态锚点会重新匹配最近值但不自动回写。外部改值不发出用户提交事件；事件是通知，不等待 Promise，也不驱动 loading。`content-draggable=false` 保留内容原生滚动。

```ts
import { FloatingPanel } from '@maple-design/ui/floating-panel'
import type { FloatingPanelProps, FloatingPanelInstance, PopupContainer } from '@maple-design/ui'
```

没有自有公开实例方法。8 个属性、2 个事件、2 个无参数插槽；PopupContainer 包含 HTMLElement、选择器和 false，以公共类型为准。

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-floating-panel-background` | `var(--mp-sys-color-surface-overlay)` | `background-color`, `box-shadow` |
| `--mp-floating-panel-border-radius` | `0` | `border-top-left-radius`, `border-top-right-radius` |
| `--mp-floating-panel-border-top` | `none` | `border-top` |
| `--mp-floating-panel-header-height` | `30px` | `height` |
| `--mp-floating-panel-toolbar-background` | `#ddd` | `background` |
| `--mp-floating-panel-toolbar-border-radius` | `10px` | `border-radius` |
| `--mp-floating-panel-toolbar-height` | `3px` | `height` |
| `--mp-floating-panel-toolbar-width` | `20px` | `width` |
| `--mp-floating-panel-transition-timing-function` | `cubic-bezier(0.18, 0.89, 0.32, 1.28)` | 组件样式 |
| `--mp-floating-panel-z-index` | `999` | `z-index` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-floating-panel-background: var(--mp-sys-color-surface-overlay);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
