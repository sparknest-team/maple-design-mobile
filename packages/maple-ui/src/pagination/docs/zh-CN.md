# Pagination

两端统一 API、交互与演示，支持按容器宽度自适应布局。

## 基础示例

### 基础与双向绑定

```demo
../example/demos/basic.vue
```

## 外观与状态

### 五档尺寸与阴影

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `total` | 数据总数（必填） | 五档尺寸与阴影、禁用与单页隐藏 |
| `show-page-size` | 显示条数选择器 | 五档尺寸与阴影、禁用与单页隐藏 |
| `show-jumper` | 完整模式显示独立跳转框；简洁模式已有页码输入 | 五档尺寸与阴影、禁用与单页隐藏 |
| `size` | 所有内部控件尺寸 | 五档尺寸与阴影 |
| `elevation` | 页码按钮阴影；true 使用 2 级 | 五档尺寸与阴影 |
| `disabled` | 禁用所有交互 | 禁用与单页隐藏 |
<!-- demo-config-notes:end -->

```demo
../example/demos/size.vue
```

### 禁用与单页隐藏

```demo
../example/demos/disabled.vue
```

## 分页模式与信息

### 简洁模式

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `total` | 数据总数（必填） | 简洁模式、更多页码与省略跳转、总数、每页条数与跳页 |
| `show-total` | 显示总数 | 简洁模式、总数、每页条数与跳页 |
| `show-page-size` | 显示条数选择器 | 简洁模式、总数、每页条数与跳页 |
| `responsive` | 按容器宽度自动切换简洁模式 | 更多页码与省略跳转、总数、每页条数与跳页 |
| `simple` | 显式启用简洁模式 | 简洁模式 |
| `default-value` | 非受控初始页码 | 更多页码与省略跳转 |
<!-- demo-config-notes:end -->

```demo
../example/demos/simple.vue
```

### 更多页码与省略跳转

```demo
../example/demos/more-page-size.vue
```

### 总数、每页条数与跳页

比较三种分页附加能力。更改页码或每页条数时观察对应输出，数据总数与自动修正另行说明。

```demo
../example/demos/auxiliary-controls-comparison.vue
```

## 条数、跳转与按钮

### 自定义分页按钮与样式

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `total` | 数据总数（必填） | 自定义分页按钮与样式 |
| `default-value` | 非受控初始页码 | 自定义分页按钮与样式 |
| `buffer-size` | 当前页两侧的页码数 | 自定义分页按钮与样式 |
| `responsive` | 按容器宽度自动切换简洁模式 | 自定义分页按钮与样式 |
| `page-item-style` | 数字页码基础样式 | 自定义分页按钮与样式 |
| `active-page-item-style` | 叠加到当前数字页码的样式 | 自定义分页按钮与样式 |
<!-- demo-config-notes:end -->

```demo
../example/demos/custom-page-button.vue
```

## 响应式与数据变化

### 容器宽度与窄屏布局

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `total` | 数据总数（必填） | 容器宽度与窄屏布局、数据变化与自动调整、完整功能交互 |
| `show-total` | 显示总数 | 容器宽度与窄屏布局、数据变化与自动调整、完整功能交互 |
| `show-page-size` | 显示条数选择器 | 容器宽度与窄屏布局、数据变化与自动调整、完整功能交互 |
| `show-jumper` | 完整模式显示独立跳转框；简洁模式已有页码输入 | 容器宽度与窄屏布局、完整功能交互 |
| `responsive` | 按容器宽度自动切换简洁模式 | 容器宽度与窄屏布局 |
| `auto-adjust` | 条数变化时保留首条位置；总数减少时修正越界页码 | 数据变化与自动调整 |
<!-- demo-config-notes:end -->

```demo
../example/demos/responsive.vue
```

### 数据变化与自动调整

```demo
../example/demos/auto-adjust.vue
```

### 完整功能交互

```demo
../example/demos/all.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。页码与上一页/下一页含义保持不变，默认前后图形跟随阅读方向。输入页码、禁用边界和选择不因方向切换而改变；自定义图形插槽由业务决定方向。

## 触发与定位

### 弹层定位

通过 `page-size-props.placement` 设置条数选择器的弹出方向，默认 `bottom-start`；空间不足时自动调整。这项配置不改变分页器自身的布局。

## API

主值使用普通 `v-model`：`modelValue` 表示当前页码，从 1 开始；pageSize 仍独立控制每页条数。`defaultValue` 仅在创建时初始化非受控状态，之后修改不会重置当前值；初始化不触发 `update:modelValue`。提供 `modelValue` 时由父级控制，以受控值为准。

<!-- same-source-api:start -->

### Pagination Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| total | 数据总数（必填） | `number` | `—` |
| model-value | 当前页码，支持 v-model | `number` | `—` |
| default-value | 非受控初始页码 | `number` | `1` |
| page-size | 每页条数，支持 v-model:page-size | `number` | `—` |
| default-page-size | 非受控初始条数 | `number` | `10` |
| disabled | 禁用所有交互 | `boolean` | `false` |
| hide-on-single-page | 不足两页时隐藏 | `boolean` | `false` |
| simple | 显式启用简洁模式 | `boolean` | `false` |
| show-total | 显示总数 | `boolean` | `false` |
| show-more | 完整模式追加向后跳页按钮 | `boolean` | `false` |
| show-jumper | 完整模式显示独立跳转框；简洁模式已有页码输入 | `boolean` | `false` |
| show-page-size | 显示条数选择器 | `boolean` | `false` |
| page-size-options | 正整数条数选项 | `number[]` | `[10, 20, 30, 40, 50]` |
| page-size-props | 可选的条数 Select 受限配置；placement 默认 bottom-start，经 Select.triggerProps 交给 Trigger 自动定位；不能覆盖分页值、选项和尺寸 | `PaginationPageSizeProps` | `—` |
| size | 所有内部控件尺寸 | `'xs' / 'sm' / 'md' / 'lg' / 'xl'` | `'md'` |
| page-item-style | 数字页码基础样式 | `CSSProperties` | `—` |
| active-page-item-style | 叠加到当前数字页码的样式 | `CSSProperties` | `—` |
| base-size | 完整模式省略阈值的基础数 | `number` | `6` |
| buffer-size | 当前页两侧的页码数 | `number` | `2` |
| elevation | 页码按钮阴影；true 使用 2 级 | `boolean / number` | `false` |
| responsive | 按容器宽度自动切换简洁模式 | `boolean` | `true` |
| compact-breakpoint | 简洁模式的最大容器宽度，单位 px | `number` | `480` |
| auto-adjust | 条数变化时保留首条位置；总数减少时修正越界页码 | `boolean` | `true` |

分页总数、页码和每页条数使用 JavaScript 安全整数；超出安全范围的有限正数按最大安全整数处理，并在开发环境提示。为限制页码控件数量，base-size 最多按 201、buffer-size 最多按 100 处理，超出范围会在开发环境提示。

响应式布局在完整和简洁模式之间切换时保留跳页草稿，不会自动提交；两种模式均显示跳页输入框时保留焦点。用户按 Enter 或主动离开输入框时才提交。

键盘快跳后，如果原省略号按钮消失且目标页已生效，焦点移到当前页按钮；受控更新被拒绝或焦点已转移时不会抢焦点。

auto-adjust 只在创建后的 total 或 page-size 变化时请求调整，初始化时不会按总页数夹取 default-value 或受控 model-value；受控父组件可以拒绝调整请求。

### Pagination Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:model-value | 请求更新页码 | `number` |
| change | 页码提交变化（与 update:modelValue 成对） | `number` |
| update:page-size | 请求更新条数 | `number` |
| page-size-change | 条数提交变化（与 update:page-size 成对） | `number` |

### Pagination Slots

| Slot | Description | Scope |
| --- | --- | --- |
| total | 总数 | `{ total: number }` |
| page-item | 数字页码 | `{ page: number }` |
| page-item-step | 上一页、下一页 | `{ type: 'previous' / 'next' }` |
| page-item-ellipsis | 省略跳转按钮 | `—` |
| jumper-prepend | 独立跳转框前缀 | `—` |
| jumper-append | 独立跳转框后缀 | `—` |

### Pagination Methods

| Method | Description |
| --- | --- |

<!-- same-source-api:end -->

## Types

```ts
import type { PaginationProps, PaginationInstance, PaginationPageSizeProps } from '@maple-design/ui'
```

## 行为说明

容器宽度不超过 `compact-breakpoint` 时自动使用简洁模式；桌面侧栏与移动端规则相同。保留总数和条数选择器，辅助控件换行，上一页、下一页按钮跟随 size。设置 `responsive=false` 保留完整页码，极窄时仅页码列表横向滚动，不撑宽页面。

简洁模式的当前页输入框承担跳转功能，不重复展示独立 jumper。`page-item`、`page-item-ellipsis`、`jumper-prepend`、`jumper-append` 仅在完整模式的对应控件中渲染。

页码按钮支持 Tab、Enter、Space，当前页使用 `aria-current=page`。跳转框使用数字键盘提示，Enter 或失焦提交；空值、非数字、小数不跳转，整数越界限制到有效页码。禁用状态阻止所有提交。

`auto-adjust` 在条数改变时尽量保留原页面首条数据的位置，总数减少时限制到最后一页，零条数据时页码回到 1。受控模式只发出更新请求，显示由父组件决定；父组件同一批更新明确设置 modelValue 时优先遵循该值。

完整模式和简洁模式的“前往”输入框均显示当前页码。点击翻页、外部更新 modelValue 或切换每页条数触发页码调整时同步回显；非法输入恢复为当前页码。

### PaginationPageSizeProps

每页条数选择器按已选文字与下拉箭头自适应宽度，两者之间仅保留条目间距，切换选项或语言时自动更新。可通过 `--mp-pagination-select-width` 自定义宽度。弹出菜单仍按选项内容独立计算宽度。

两端支持相同配置：`disabled?: boolean`、`placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'`、`popupContainer?: string | HTMLElement | false`、`class?: string`、`style?: CSSProperties`。外层 disabled 优先。默认 placement 为 bottom-start。

请使用下方列出的配置属性。分页值、选项和尺寸分别使用 page-size、page-size-options、size。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-pagination-active-background` | `var(--mp-color-primary-light-1)` | `background` |
| `--mp-pagination-active-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-pagination-disabled-background` | `var(--mp-color-fill-1)` | `background` |
| `--mp-pagination-disabled-color` | `var(--mp-color-text-disabled)` | `color` |
| `--mp-pagination-focus-color` | `var(--mp-sys-color-content-brand)` | `outline` |
| `--mp-pagination-focus-offset` | `1px` | `outline-offset` |
| `--mp-pagination-focus-space` | `3px` | `padding` |
| `--mp-pagination-focus-width` | `2px` | `outline` |
| `--mp-pagination-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-pagination-gap` | `var(--mp-sys-space-5)` | `gap` |
| `--mp-pagination-hover-background` | `var(--mp-color-fill-1)` | `background` |
| `--mp-pagination-icon-size` | `16px` | `height`, `width` |
| `--mp-pagination-input-width` | `32px` | `width` |
| `--mp-pagination-item-background` | `transparent` | `background` |
| `--mp-pagination-item-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-pagination-item-gap` | `var(--mp-sys-space-2)` | `gap`, `padding-inline-start` |
| `--mp-pagination-item-padding` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-pagination-select-width` | `max-content` | `width` |
| `--mp-pagination-size-lg` | `44px` | `height`, `min-height`, `min-width` |
| `--mp-pagination-size-md` | `36px` | `height`, `min-height`, `min-width` |
| `--mp-pagination-size-sm` | `28px` | `height`, `min-height`, `min-width` |
| `--mp-pagination-size-xl` | `52px` | `height`, `min-height`, `min-width` |
| `--mp-pagination-size-xs` | `24px` | `height`, `min-height`, `min-width` |
| `--mp-pagination-text-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-pagination-touch-size` | `44px` | `min-height` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-pagination-active-background: var(--mp-color-primary-light-1);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
