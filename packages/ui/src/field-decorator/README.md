# FieldDecorator

表单触发器外壳（与 Cedar `FieldDecorator` **同名同职责骨架**）。

## 职责

- variant / size / floating hint / line / clear / prefix / suffix
- outline/filled 的 fieldset 边框，standard 下划线

## 消费者

Input、Textarea、Select、Cascader、Date、Time、DateRange、TimeRange 等。  
内容放入 default slot；不要在消费者里再实现边框 / 浮动标签。

## 平台差异

| 项                       | Maple                  | Cedar                         | 说明                                     |
| ------------------------ | ---------------------- | ----------------------------- | ---------------------------------------- |
| 组件名                   | `FieldDecorator`       | `FieldDecorator`              | 对齐                                     |
| variant                  | 默认 **standard**      | 默认 **filled**               | 默认值平台差                             |
| size                     | 壳 `small` \| `normal` | `xs`–`xl`                     | 映射：`small↔sm`，`normal↔md`            |
| 浮动 hint / line / clear | 壳内置                 | Cedar 无 hint；clear 在消费者 | 平台差                                   |
| Token                    | `--mp-field-*`         | `--c-field-*`                 | 共享语义键对齐；hint 几何 token 仅 Maple |

## Size 映射（文档约定）

| Maple FD | Cedar FD |
| -------- | -------- |
| `small`  | `sm`     |
| `normal` | `md`     |

上层若用 `xs|sm|md|lg`（如 InputNumber），再映射到 FD：`xs/sm → small`，其余 → `normal`。

## 聚焦样式

输入控件聚焦时不额外绘制外圈 outline，沿用各变体已有的边框、底线或背景聚焦反馈；适用于 Input、Textarea、Date 和 Time 等消费者。

输入框、文本域和数字输入框的光标使用 `currentColor`，与当前输入文字颜色一致；错误态不单独覆盖光标颜色。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-field-blur-color` | `var(--mp-sys-color-content-tertiary)` | `border-bottom`, `color` |
| `--mp-field-border-radius` | `var(--mp-sys-radius-md)` | `border-end-end-radius`, `border-end-start-radius`, `border-radius`, `border-start-end-radius`, `border-start-start-radius` |
| `--mp-field-border-width` | `1px` | `border`, `border-bottom`, `margin-inline-start`, `min-height`, `outline`, `outline-offset`, `padding-inline-start` |
| `--mp-field-caret-color` | `currentColor` | `caret-color` |
| `--mp-field-clear-icon-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-field-clear-icon-size` | `var(--mp-field-icon-size)` | `font-size` |
| `--mp-field-clear-padding` | `4px` | `padding` |
| `--mp-field-clear-radius` | `50%` | `border-radius` |
| `--mp-field-clear-visibility` | `visible` | `visibility` |
| `--mp-field-content-gap` | `8px` | `gap`, `padding-inline-end`, `padding-inline-start` |
| `--mp-field-content-padding-vertical` | `8px` | `padding`, `top` |
| `--mp-field-control-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-field-control-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `-webkit-text-fill-color`, `color` |
| `--mp-field-error-color` | `var(--mp-sys-color-status-danger)` | `border-bottom-color`, `border-color`, `color` |
| `--mp-field-focus-color` | `var(--mp-sys-color-action-primary)` | `border-bottom-color`, `color`, `outline` |
| `--mp-field-hint-duration` | `0.2s` | `transition` |
| `--mp-field-hint-scale` | `0.75` | `font-size`, `top`, `transform` |
| `--mp-field-hint-space` | `4px` | `padding`, `padding-inline-start` |
| `--mp-field-icon-size` | `20px` | `font-size` |
| `--mp-field-line-height` | `1.5` | `line-height`, `top` |
| `--mp-field-loading-color` | `var(--mp-field-focus-color)` | `color` |
| `--mp-field-loading-duration` | `1s` | `animation` |
| `--mp-field-loading-line-size` | `2px` | `height` |
| `--mp-field-padding-horizontal` | `16px` | `inset-inline-start`, `margin-inline-end`, `margin-inline-start`, `max-width`, `padding`, `padding-inline-end`, `padding-inline-start`, `width` |
| `--mp-field-placeholder-text-color` | `var(--mp-sys-color-content-tertiary)` | `color` |
| `--mp-field-prefix-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-field-size-lg-font-size` | `16px` | `font-size` |
| `--mp-field-size-lg-height` | `56px` | `flex`, `height`, `min-height` |
| `--mp-field-size-md-font-size` | `16px` | `font-size` |
| `--mp-field-size-md-height` | `48px` | `flex`, `height`, `min-height` |
| `--mp-field-size-sm-font-size` | `14px` | `font-size` |
| `--mp-field-size-sm-height` | `40px` | `flex`, `height`, `min-height` |
| `--mp-field-size-xl-font-size` | `18px` | `font-size` |
| `--mp-field-size-xl-height` | `64px` | `flex`, `height`, `min-height` |
| `--mp-field-size-xs-font-size` | `12px` | `font-size` |
| `--mp-field-size-xs-height` | `32px` | `flex`, `height`, `min-height` |
| `--mp-field-suffix-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-field-variant-filled-background` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-field-variant-filled-background-disabled` | `var(--mp-color-fill-2)` | `background` |
| `--mp-field-variant-filled-background-error` | `var(--mp-color-danger-light-1)` | `background` |
| `--mp-field-variant-filled-background-focus` | `var(--mp-color-fill-3)` | `background` |
| `--mp-field-variant-filled-background-hover` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-field-variant-outline-background` | `transparent` | `background` |
| `--mp-field-variant-outline-border-color` | `var(--mp-sys-color-border-default)` | `border`, `border-color` |
| `--mp-field-variant-outline-border-color-disabled` | `var(--mp-sys-color-border-subtle)` | `border-color` |
| `--mp-field-variant-outline-border-color-error` | `var(--mp-sys-color-status-danger)` | `border-color` |
| `--mp-field-variant-outline-border-color-focus` | `var(--mp-sys-color-action-primary)` | `border-color` |
| `--mp-field-variant-outline-border-color-hover` | `color-mix(in srgb, var(--mp-field-variant-outline-border-color) 80%, var(--mp-sys-color-border-strong))` | `border-color` |
| `--mp-field-variant-standard-line-color` | `var(--mp-field-blur-color)` | `border-bottom` |
| `--mp-field-variant-standard-line-color-disabled` | `var(--mp-sys-color-border-subtle)` | `border-bottom-color` |
| `--mp-field-variant-standard-line-color-error` | `var(--mp-field-error-color)` | `border-bottom-color` |
| `--mp-field-variant-standard-line-color-focus` | `var(--mp-field-focus-color)` | `border-bottom-color` |
| `--mp-field-variant-standard-line-size` | `1px` | `border-bottom` |
| `--mp-field-variant-standard-line-size-focus` | `2px` | `border-bottom-width` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-field-blur-color: var(--mp-sys-color-content-tertiary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 错误与禁用边框

以下后缀分别加上 `--c-field-` / `--mp-field-`：`variant-outline-border-color-error` 控制 outline 错误边框；`variant-standard-line-color-error` 控制 standard 错误底线；`variant-standard-line-color-disabled` 控制 standard 禁用底线，默认引用 system border-subtle。禁用优先于错误、hover 和 focus。三个入口均支持局部覆盖；错误提示文字仍由 `field-error-color` 管理。
