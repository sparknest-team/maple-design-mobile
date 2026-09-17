# Pagination

两端统一 API、交互与演示，支持按容器宽度自适应布局。

## 案例

### 基础与双向绑定

```demo
../example/demos/basic.vue
```

### 更多页码与省略跳转

```demo
../example/demos/more-page-size.vue
```

### 每页条数与公共选择器配置

```demo
../example/demos/show-page-size.vue
```

### 跳转与前后缀插槽

```demo
../example/demos/show-jumper.vue
```

### 五档尺寸与阴影

```demo
../example/demos/size.vue
```

### 简洁模式

```demo
../example/demos/simple.vue
```

### 自定义总数插槽

```demo
../example/demos/show-total.vue
```

### 完整功能交互

```demo
../example/demos/all.vue
```

### 自定义分页按钮与样式

```demo
../example/demos/custom-page-button.vue
```

### 禁用与单页隐藏

```demo
../example/demos/disabled.vue
```

### 数据变化与自动调整

```demo
../example/demos/auto-adjust.vue
```

### 容器宽度与窄屏布局

```demo
../example/demos/responsive.vue
```

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| total | 数据总数（必填） | `number` | `—` |
| current | 当前页码，支持 v-model:current | `number` | `—` |
| default-current | 非受控初始页码 | `number` | `1` |
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
| page-size-props | 公共选择器配置，不能覆盖分页值、选项和尺寸 | `PaginationPageSizeProps` | `—` |
| size | 所有内部控件尺寸 | `'xs' / 'sm' / 'md' / 'lg' / 'xl'` | `'md'` |
| page-item-style | 数字页码基础样式 | `CSSProperties` | `—` |
| active-page-item-style | 叠加到当前数字页码的样式 | `CSSProperties` | `—` |
| base-size | 完整模式省略阈值的基础数 | `number` | `6` |
| buffer-size | 当前页两侧的页码数 | `number` | `2` |
| elevation | 页码按钮阴影；true 使用 2 级 | `boolean / number` | `false` |
| responsive | 按容器宽度自动切换简洁模式 | `boolean` | `true` |
| compact-breakpoint | 简洁模式的最大容器宽度，单位 px | `number` | `480` |
| auto-adjust | 条数变化时保留首条位置；总数减少时修正越界页码 | `boolean` | `true` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:current | 请求更新页码 | `number` |
| change | 页码提交变化（与 update:current 成对） | `number` |
| update:page-size | 请求更新条数 | `number` |
| page-size-change | 条数提交变化（与 update:page-size 成对） | `number` |

### Slots

| Slot | Description | Scope |
| --- | --- | --- |
| total | 总数 | `{ total: number }` |
| page-item | 数字页码 | `{ page: number }` |
| page-item-step | 上一页、下一页 | `{ type: 'previous' / 'next' }` |
| page-item-ellipsis | 省略跳转按钮 | `—` |
| jumper-prepend | 独立跳转框前缀 | `—` |
| jumper-append | 独立跳转框后缀 | `—` |

### Methods

| Method | Description |
| --- | --- |

<!-- same-source-api:end -->

## 行为说明

容器宽度不超过 `compact-breakpoint` 时自动使用简洁模式；桌面侧栏与移动端规则相同。保留总数和条数选择器，辅助控件换行，上一页、下一页按钮跟随 size，不再在窄屏强制放大（默认 36px）。设置 `responsive=false` 保留完整页码，极窄时仅页码列表横向滚动，不撑宽页面。

简洁模式的当前页输入框承担跳转功能，不重复展示独立 jumper。`page-item`、`page-item-ellipsis`、`jumper-prepend`、`jumper-append` 仅在完整模式的对应控件中渲染。

页码按钮支持 Tab、Enter、Space，当前页使用 `aria-current=page`。跳转框使用数字键盘提示，Enter 或失焦提交；空值、非数字、小数不跳转，整数越界限制到有效页码。禁用状态阻止所有提交。

`auto-adjust` 在条数改变时尽量保留原页面首条数据的位置，总数减少时限制到最后一页，零条数据时页码回到 1。受控模式只发出更新请求，显示由父组件决定；父组件同一批更新明确设置 current 时优先遵循该值。

### PaginationPageSizeProps

每页条数的弹出菜单按选项内容自适应宽度，与紧凑的 Select 触发框宽度独立。

两端支持相同配置：`disabled?: boolean`、`placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'`、`popupContainer?: string | HTMLElement | false`、`class?: string`、`style?: CSSProperties`。外层 disabled 优先。默认 placement 为 bottom-start。

此配置不再透传任意 SelectProps/MenuProps。分页值、选项和尺寸分别使用 page-size、page-size-options、size。

## 类型定义

```ts
import type { PaginationProps, PaginationInstance, PaginationPageSizeProps } from '@maplejs/maple-ui'
```

## 样式变量

| Token | Default |
| --- | --- |
| `--mp-pagination-text-color` | `var(--mp-color-text-1)` |
| `--mp-pagination-font-size` | `14px` |
| `--mp-pagination-gap` | `12px` |
| `--mp-pagination-item-gap` | `4px` |
| `--mp-pagination-focus-space` | `3px` |
| `--mp-pagination-size-xs` | `24px` |
| `--mp-pagination-size-sm` | `28px` |
| `--mp-pagination-size-md` | `36px` |
| `--mp-pagination-size-lg` | `44px` |
| `--mp-pagination-size-xl` | `52px` |
| `--mp-pagination-item-padding` | `8px` |
| `--mp-pagination-item-border-radius` | `4px` |
| `--mp-pagination-icon-size` | `16px` |
| `--mp-pagination-input-width` | `32px` |
| `--mp-pagination-select-width` | `max-content` |
| `--mp-pagination-touch-size` | `44px` |
| `--mp-pagination-focus-width` | `2px` |
| `--mp-pagination-focus-offset` | `1px` |
| `--mp-pagination-focus-color` | `var(--mp-color-primary)` |
| `--mp-pagination-item-background` | `transparent` |
| `--mp-pagination-hover-background` | `var(--mp-color-fill-1)` |
| `--mp-pagination-active-background` | `var(--mp-color-primary-light-1)` |
| `--mp-pagination-active-color` | `var(--mp-color-primary)` |
| `--mp-pagination-disabled-color` | `var(--mp-color-text-disabled)` |
| `--mp-pagination-disabled-background` | `var(--mp-color-fill-1)` |
