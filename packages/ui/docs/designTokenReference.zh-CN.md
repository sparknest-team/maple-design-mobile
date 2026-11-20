# Maple 组件 CSS 变量参考

本页由组件 Token 声明编译生成，不手工维护表格。在 design-ui 运行 `node bin/token-catalog.mjs --patch` 后应用补丁；`--check` 检查源码与文档是否一致。

与《Design Token 与 CSS 变量分层》配合阅读：这里列出准确名称、声明值与消费证据，不代表所有组件均通过视觉验收。值是声明表达式，不是最终像素；多值保留各自选择器条件，主题对象和行内属性仍可覆盖。foundation/system 的角色见设计规范，不在这里冒充组件 API。

公开变量可在组件实际根节点或弹层真实挂载祖先覆盖；内部变量只用于实现，业务禁止依赖。size / variant / status / loading / disabled 决定何时消费，不能认为一个变量在所有状态都生效。消费属性列表来自编译后的传递引用，只证明可达性，不替代选择器可见性和优先级检查。

## _components/field-presentation

声明来源: `src/_components/field-presentation/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-field-presentation-border` | 内部 | `var(--mp-color-border-2)` | 本组件 CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-field-presentation-close-font-size` | 内部 | `24px` | 本组件 CSS<br>`font-size` |
| `--mp-field-presentation-close-size` | 内部 | `32px` | 本组件 CSS<br>`height`, `width` |
| `--mp-field-presentation-divider-width` | 内部 | `1px` | 本组件 CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-field-presentation-gap` | 内部 | `var(--mp-sys-space-3)` | 本组件 CSS<br>`gap`, `margin-bottom`, `margin-top`, `padding-bottom`, `padding-top` |
| `--mp-field-presentation-max-height` | 内部 | `60vh` | 本组件 CSS<br>`max-height` |
| `--mp-field-presentation-min-width` | 内部 | `280px` | 本组件 CSS<br>`min-width` |
| `--mp-field-presentation-padding` | 内部 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`margin-inline`, `max-width`, `padding`, `padding-block`, `padding-bottom`, `padding-left`, `padding-right` |
| `--mp-field-presentation-radius` | 内部 | `8px` | 本组件 CSS<br>`border-radius` |
| `--mp-field-presentation-read-text-align` | 内部 | `end` | 本组件 CSS<br>`text-align` |
| `--mp-field-presentation-shadow` | 内部 | `0 8px 28px rgb(0 0 0%)` | 本组件 CSS<br>`box-shadow` |
| `--mp-field-presentation-title-font-size` | 内部 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-field-presentation-title-font-weight` | 内部 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-field-presentation-viewport-max-height` | 内部 | `90dvh` | 本组件 CSS<br>`max-height` |

</div>

## _components/picker-field

声明来源: `src/_components/picker-field/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-picker-field-gap` | 内部 | `8px` | 本组件 CSS<br>`gap` |
| `--mp-picker-field-input-min-width` | 内部 | `3em` | 本组件 CSS<br>`min-width` |

</div>

## _components/selected-options

声明来源: `src/_components/selected-options/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-selected-options-background` | 内部 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background` |
| `--mp-selected-options-border` | 内部 | `var(--mp-color-border-2)` | 本组件 CSS<br>`border-bottom` |
| `--mp-selected-options-clear-color` | 内部 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-selected-options-details-max-height` | 内部 | `50dvh` | 本组件 CSS<br>`max-height` |
| `--mp-selected-options-disabled-opacity` | 内部 | `0.5` | 本组件 CSS<br>`opacity` |
| `--mp-selected-options-gap` | 内部 | `8px` | 本组件 CSS<br>`gap` |
| `--mp-selected-options-padding` | 内部 | `8px 12px` | 本组件 CSS<br>`padding` |
| `--mp-selected-options-radius` | 内部 | `4px` | 本组件 CSS<br>`border-radius` |
| `--mp-selected-options-remove-size` | 内部 | `24px` | 本组件 CSS<br>`height`, `width` |
| `--mp-selected-options-tag-padding` | 内部 | `2px 6px` | 本组件 CSS<br>`padding` |
| `--mp-selected-options-tags-max-height` | 内部 | `112px` | 本组件 CSS<br>`max-height` |
| `--mp-selection-editor-accent` | 内部 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-selection-editor-background` | 内部 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background` |
| `--mp-selection-editor-border` | 内部 | `var(--mp-color-border-2)` | 本组件 CSS<br>`border-bottom`, `border-inline-end` |
| `--mp-selection-editor-check-size` | 内部 | `20px` | 本组件 CSS<br>`height`, `width` |
| `--mp-selection-editor-color` | 内部 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |
| `--mp-selection-editor-dialog-height` | 内部 | `min(30dvh, 260px)` | 本组件 CSS<br>`height`, `min-height` |
| `--mp-selection-editor-font-size` | 内部 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-selection-editor-gap` | 内部 | `8px` | 本组件 CSS<br>`gap`, `margin-inline-end`, `padding` |
| `--mp-selection-editor-height` | 内部 | `min(40dvh, 320px)` | 本组件 CSS<br>`height`, `min-height` |
| `--mp-selection-editor-muted-background` | 内部 | `var(--mp-color-fill-1)` | 本组件 CSS<br>`background` |
| `--mp-selection-editor-muted-color` | 内部 | `var(--mp-color-text-3)` | 本组件 CSS<br>`color` |
| `--mp-selection-editor-option-radius` | 内部 | `0` | 本组件 CSS<br>`border-radius` |
| `--mp-selection-editor-padding` | 内部 | `12px` | 本组件 CSS<br>`margin-block`, `padding` |
| `--mp-selection-editor-path-height` | 内部 | `44px` | 本组件 CSS<br>`min-height` |
| `--mp-selection-editor-radius` | 内部 | `8px` | 本组件 CSS<br>`border-radius` |
| `--mp-selection-editor-row-height` | 内部 | `42px` | 本组件 CSS<br>`min-height` |
| `--mp-selection-editor-selected-background` | 内部 | `var(--mp-sys-color-state-selected)` | 本组件 CSS<br>`background` |
| `--mp-selection-editor-touch-font-size` | 内部 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-selection-editor-touch-height` | 内部 | `52px` | 本组件 CSS<br>`min-height` |
| `--mp-selection-editor-width` | 内部 | `640px` | 本组件 CSS<br>`width` |

</div>

## _components/selection-field/presentation

声明来源: `src/_components/selection-field/presentation/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-selection-presentation-bg` | 内部 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background` |
| `--mp-selection-presentation-max-height` | 内部 | `65vh` | 本组件 CSS<br>`max-height` |
| `--mp-selection-presentation-padding` | 内部 | `var(--mp-sys-space-5)` | 本组件 CSS<br>`padding` |

</div>

## _components/selection-field

声明来源: `src/_components/selection-field/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-selection-field-gap` | 内部 | `4px` | 本组件 CSS<br>`gap` |
| `--mp-selection-field-icon-transition-duration` | 内部 | `0.2s` | 本组件 CSS<br>`transition` |
| `--mp-selection-field-input-min-width` | 内部 | `2px` | 本组件 CSS<br>`flex-basis`, `min-width` |
| `--mp-selection-field-loading-duration` | 内部 | `1s` | 本组件 CSS<br>`animation` |
| `--mp-selection-field-search-min-width` | 内部 | `3em` | 本组件 CSS<br>`flex`, `min-width` |

</div>

## _components/selection-scrollbar

声明来源: `src/_components/selection-scrollbar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-scrollbar-thumb-bar-bg-color` | 内部 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`background-color` |
| `--mp-scrollbar-thumb-bar-bg-color-hover` | 内部 | `var(--mp-sys-color-border-strong)` | 本组件 CSS<br>`background-color` |
| `--mp-scrollbar-thumb-bar-border-radius` | 内部 | `6px` | 本组件 CSS<br>`border-radius` |
| `--mp-scrollbar-thumb-bar-size` | 内部 | `9px` | 本组件 CSS<br>`height`, `margin`, `width` |
| `--mp-scrollbar-track-bg-color` | 内部 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background-color` |
| `--mp-scrollbar-track-border-color` | 内部 | `var(--mp-sys-color-border-subtle)` | 本组件 CSS<br>`border-bottom`, `border-left`, `border-right`, `border-top` |
| `--mp-scrollbar-track-border-size` | 内部 | `1px` | 本组件 CSS<br>`border-bottom`, `border-left`, `border-right`, `border-top`, `margin`, `right` |
| `--mp-scrollbar-track-size` | 内部 | `15px` | 本组件 CSS<br>`height`, `margin`, `width` |

</div>

## _components/temporal-panel

声明来源: `src/_components/temporal-panel/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-internal-temporal-panel-active-background` | 内部 | `color-mix(in srgb, var(--mp-sys-color-action-primary) 8%, transparent)` | 本组件 CSS<br>`background` |
| `--mp-internal-temporal-panel-column-label-font-size` | 内部 | `13px` | 跨组件 CSS<br>`font-size` |
| `--mp-internal-temporal-panel-column-label-height` | 内部 | `36px` | 跨组件 CSS<br>`height` |
| `--mp-internal-temporal-panel-group-gap` | 内部 | `24px` | 跨组件 CSS<br>`margin-inline-end`, `width` |
| `--mp-internal-temporal-panel-inset` | 内部 | `12px` | 本组件 CSS<br>`flex`, `margin`, `margin-inline`, `margin-inline-end`, `padding`, `padding-inline`, `width` |
| `--mp-internal-temporal-panel-quick-time-width` | 内部 | `84px` | 跨组件 CSS<br>`flex`, `width` |
| `--mp-internal-temporal-panel-radius` | 内部 | `12px` | 本组件 CSS<br>`border-radius` |
| `--mp-internal-temporal-panel-selection-background` | 内部 | `var(--mp-color-fill-2)` | 跨组件 CSS<br>`background` |
| `--mp-internal-temporal-panel-summary-active-background` | 内部 | `var(--mp-sys-color-surface-overlay)` | 跨组件 CSS<br>`background` |
| `--mp-internal-temporal-panel-summary-active-color` | 内部 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-internal-temporal-panel-summary-background` | 内部 | `var(--mp-color-fill-1)` | 跨组件 CSS<br>`background` |
| `--mp-internal-temporal-panel-summary-height` | 内部 | `56px` | 跨组件 CSS<br>`min-height` |
| `--mp-internal-temporal-panel-summary-separator-stroke` | 内部 | `1px` | 本组件 CSS<br>`border-block-start`, `outline` |
| `--mp-internal-temporal-panel-summary-separator-width` | 内部 | `4px` | 跨组件 CSS<br>`gap` |
| `--mp-internal-temporal-panel-touch-height` | 内部 | `44px` | 本组件 CSS<br>`height`, `min-height`, `width` |

</div>

## action-sheet

声明来源: `src/action-sheet/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-action-sheet-action-item-color` | 公开 | `#333` | 本组件 CSS<br>`color` |
| `--mp-action-sheet-action-item-disabled-color` | 公开 | `var(--mp-color-text-disabled)` | 本组件 CSS<br>`color` |
| `--mp-action-sheet-action-item-height` | 公开 | `48px` | 本组件 CSS<br>`height`, `max-height` |
| `--mp-action-sheet-action-item-padding` | 公开 | `0 18px` | 本组件 CSS<br>`padding` |
| `--mp-action-sheet-background` | 公开 | `#fff` | 本组件 CSS<br>`background` |
| `--mp-action-sheet-border-radius` | 公开 | `2px` | 本组件 CSS<br>`border-radius` |
| `--mp-action-sheet-border-top` | 公开 | `none` | 本组件 CSS<br>`border-top` |
| `--mp-action-sheet-icon-margin` | 公开 | `0 20px 0 0` | 本组件 CSS<br>`margin` |
| `--mp-action-sheet-icon-size` | 公开 | `24px` | 本组件 CSS<br>`font-size`, `height`, `width` |
| `--mp-action-sheet-title-color` | 公开 | `#888` | 本组件 CSS<br>`color` |
| `--mp-action-sheet-title-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-action-sheet-title-padding` | 公开 | `10px 16px` | 本组件 CSS<br>`padding` |

</div>

## alert

声明来源: `src/alert/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-alert-action-margin-left` | 公开 | `var(--mp-sys-space-5)` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-alert-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-alert-border-width` | 公开 | `1px` | 本组件 CSS<br>`border` |
| `--mp-alert-close-duration` | 公开 | `var(--mp-sys-motion-duration-slow)` | 本组件 CSS<br>`transition` |
| `--mp-alert-close-margin-left` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-alert-font-size-content` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-alert-font-size-title` | 公开 | `var(--mp-sys-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-alert-font-weight-title` | 公开 | `var(--mp-sys-font-weight-medium)` | 本组件 CSS<br>`font-weight` |
| `--mp-alert-icon-margin-right` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-alert-icon-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-alert-line-height` | 公开 | `1.5715` | 本组件 CSS<br>`line-height` |
| `--mp-alert-line-height-title` | 公开 | `1.5` | 本组件 CSS<br>`line-height` |
| `--mp-alert-outline-danger-border` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`border-color` |
| `--mp-alert-outline-danger-content` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-danger-icon` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-danger-title` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-default-border` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-color` |
| `--mp-alert-outline-default-content` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-default-icon` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-default-title` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-info-border` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`border-color` |
| `--mp-alert-outline-info-content` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-info-icon` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-info-title` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-success-border` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`border-color` |
| `--mp-alert-outline-success-content` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-success-icon` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-success-title` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-warning-border` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`border-color` |
| `--mp-alert-outline-warning-content` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-warning-icon` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-alert-outline-warning-title` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-alert-padding-horizontal` | 公开 | `var(--mp-sys-space-6)` | 本组件 CSS<br>`padding` |
| `--mp-alert-padding-horizontal-with-title` | 公开 | `var(--mp-sys-space-6)` | 本组件 CSS<br>`padding` |
| `--mp-alert-padding-vertical` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`padding` |
| `--mp-alert-padding-vertical-with-title` | 公开 | `var(--mp-sys-space-6)` | 本组件 CSS<br>`padding` |
| `--mp-alert-standard-danger-bg` | 公开 | `rgb(var(--mp-danger-1))` | 本组件 CSS<br>`background-color` |
| `--mp-alert-standard-danger-border` | 公开 | `rgb(var(--mp-danger-3))` | 本组件 CSS<br>`border-color` |
| `--mp-alert-standard-danger-content` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-danger-icon` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-danger-title` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-default-bg` | 公开 | `var(--mp-color-fill-2)` | 本组件 CSS<br>`background-color` |
| `--mp-alert-standard-default-border` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-color` |
| `--mp-alert-standard-default-content` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-default-icon` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-default-title` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-info-bg` | 公开 | `rgb(var(--mp-blue-1))` | 本组件 CSS<br>`background-color` |
| `--mp-alert-standard-info-border` | 公开 | `rgb(var(--mp-blue-3))` | 本组件 CSS<br>`border-color` |
| `--mp-alert-standard-info-content` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-info-icon` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-info-title` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-success-bg` | 公开 | `rgb(var(--mp-success-1))` | 本组件 CSS<br>`background-color` |
| `--mp-alert-standard-success-border` | 公开 | `rgb(var(--mp-success-3))` | 本组件 CSS<br>`border-color` |
| `--mp-alert-standard-success-content` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-success-icon` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-success-title` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-warning-bg` | 公开 | `rgb(var(--mp-warning-1))` | 本组件 CSS<br>`background-color` |
| `--mp-alert-standard-warning-border` | 公开 | `rgb(var(--mp-warning-3))` | 本组件 CSS<br>`border-color` |
| `--mp-alert-standard-warning-content` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-warning-icon` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-alert-standard-warning-title` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-alert-title-margin-bottom` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`margin-bottom` |
| `--mp-alert-tonal-danger-bg` | 公开 | `rgb(var(--mp-danger-1))` | 本组件 CSS<br>`background-color` |
| `--mp-alert-tonal-danger-content` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-danger-icon` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-danger-title` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-default-bg` | 公开 | `var(--mp-color-fill-2)` | 本组件 CSS<br>`background-color` |
| `--mp-alert-tonal-default-content` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-default-icon` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-default-title` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-info-bg` | 公开 | `rgb(var(--mp-blue-1))` | 本组件 CSS<br>`background-color` |
| `--mp-alert-tonal-info-content` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-info-icon` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-info-title` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-success-bg` | 公开 | `rgb(var(--mp-success-1))` | 本组件 CSS<br>`background-color` |
| `--mp-alert-tonal-success-content` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-success-icon` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-success-title` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-warning-bg` | 公开 | `rgb(var(--mp-warning-1))` | 本组件 CSS<br>`background-color` |
| `--mp-alert-tonal-warning-content` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-warning-icon` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-alert-tonal-warning-title` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |

</div>

## auto-complete

声明来源: `src/auto-complete/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-auto-complete-option-bg-default` | 公开 | `var(--mp-select-popup-option-bg)` | 本组件 CSS<br>`background-color` |
| `--mp-auto-complete-option-bg-disabled` | 公开 | `var(--mp-select-popup-option-bg-disabled)` | 本组件 CSS<br>`background-color` |
| `--mp-auto-complete-option-bg-hover` | 公开 | `var(--mp-select-popup-option-bg-hover)` | 本组件 CSS<br>`background-color` |
| `--mp-auto-complete-option-bg-selected` | 公开 | `var(--mp-select-popup-option-bg-selected)` | 本组件 CSS<br>`background-color` |
| `--mp-auto-complete-option-font-weight-selected` | 公开 | `var(--mp-select-popup-option-font-weight-selected)` | 本组件 CSS<br>`font-weight` |
| `--mp-auto-complete-option-height` | 公开 | `var(--mp-select-popup-option-height)` | 本组件 CSS<br>`line-height` |
| `--mp-auto-complete-option-padding-horizontal` | 公开 | `var(--mp-select-popup-option-padding-horizontal)` | 本组件 CSS<br>`padding-inline` |
| `--mp-auto-complete-option-text-color-default` | 公开 | `var(--mp-select-popup-option-text-color)` | 本组件 CSS<br>`color` |
| `--mp-auto-complete-option-text-color-disabled` | 公开 | `var(--mp-select-popup-option-text-color-disabled)` | 本组件 CSS<br>`color` |
| `--mp-auto-complete-option-text-color-hover` | 公开 | `var(--mp-select-popup-option-text-color-hover)` | 本组件 CSS<br>`color` |
| `--mp-auto-complete-option-text-color-selected` | 公开 | `var(--mp-select-popup-option-text-color-selected)` | 本组件 CSS<br>`color` |
| `--mp-auto-complete-popup-bg` | 公开 | `var(--mp-select-popup-bg)` | 本组件 CSS<br>`background-color` |
| `--mp-auto-complete-popup-border-color` | 公开 | `var(--mp-select-popup-border-color)` | 本组件 CSS<br>`border` |
| `--mp-auto-complete-popup-border-radius` | 公开 | `var(--mp-select-popup-border-radius)` | 本组件 CSS<br>`border-radius` |
| `--mp-auto-complete-popup-box-shadow` | 公开 | `var(--mp-select-popup-box-shadow)` | 本组件 CSS<br>`box-shadow` |
| `--mp-auto-complete-popup-font-size` | 公开 | `var(--mp-select-popup-font-size)` | 本组件 CSS<br>`font-size` |
| `--mp-auto-complete-popup-max-height` | 公开 | `var(--mp-select-popup-max-height)` | 本组件 CSS<br>`max-height` |
| `--mp-auto-complete-popup-padding-vertical` | 公开 | `var(--mp-select-popup-padding-vertical)` | 本组件 CSS<br>`padding-block` |

</div>

## avatar

声明来源: `src/avatar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-avatar-bg` | 公开 | `var(--mp-color-fill-4)` | 本组件 CSS<br>`background-color` |
| `--mp-avatar-border-color` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`border` |
| `--mp-avatar-border-width` | 公开 | `2px` | 本组件 CSS<br>`border` |
| `--mp-avatar-circle-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-avatar-font-size-max-count` | 公开 | `20px` | 本组件 CSS<br>`font-size` |
| `--mp-avatar-font-size-text` | 公开 | `20px` | 本组件 CSS<br>`font-size` |
| `--mp-avatar-font-weight-text` | 公开 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-avatar-group-item-border` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`border` |
| `--mp-avatar-group-item-border-width` | 公开 | `2px` | 本组件 CSS<br>`border` |
| `--mp-avatar-group-offset` | 公开 | `-10px` | 本组件 CSS<br>`margin-block-start`, `margin-inline-start` |
| `--mp-avatar-group-popover-item-spacing` | 公开 | `8px` | 本组件 CSS<br>`gap` |
| `--mp-avatar-hover-transform` | 公开 | `scale(1.1)` | 本组件 CSS<br>`transform` |
| `--mp-avatar-max-count-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-avatar-motion-duration` | 公开 | `0.2s` | 本组件 CSS<br>`transition` |
| `--mp-avatar-size-default` | 公开 | `40px` | 本组件 CSS<br>`height`, `width` |
| `--mp-avatar-size-trigger-button` | 公开 | `20px` | 本组件 CSS<br>`height`, `width` |
| `--mp-avatar-size-trigger-icon` | 公开 | `12px` | 本组件 CSS<br>`font-size` |
| `--mp-avatar-spacing-trigger-button-bottom` | 公开 | `4px` | 本组件 CSS<br>`bottom` |
| `--mp-avatar-spacing-trigger-button-right` | 公开 | `4px` | 本组件 CSS<br>`inset-inline-end` |
| `--mp-avatar-square-border-radius` | 公开 | `4px` | 本组件 CSS<br>`border-radius` |
| `--mp-avatar-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-avatar-text-padding-inline` | 公开 | `4px` | 本组件 CSS<br>`padding-inline` |
| `--mp-avatar-trigger-button-bg` | 公开 | `var(--mp-color-fill-2)` | 本组件 CSS<br>`background-color` |
| `--mp-avatar-trigger-button-bg-hover` | 公开 | `var(--mp-color-fill-3)` | 本组件 CSS<br>`background-color` |
| `--mp-avatar-trigger-button-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-avatar-trigger-icon-button` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-avatar-trigger-overlay-bg` | 公开 | `color-mix(in srgb, var(--mp-color-black) 60%, transparent)` | 本组件 CSS<br>`background-color` |
| `--mp-avatar-trigger-overlay-font-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-avatar-trigger-overlay-icon` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-avatar-z-index-overlay` | 公开 | `0` | 本组件 CSS<br>`z-index` |
| `--mp-avatar-z-index-overlay-hover` | 公开 | `2` | 本组件 CSS<br>`z-index` |
| `--mp-avatar-z-index-trigger` | 公开 | `1` | 本组件 CSS<br>`z-index` |

</div>

## back-top

声明来源: `src/back-top/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-back-top-background` | 公开 | `var(--mp-sys-color-surface-raised)` | 本组件 CSS<br>`background` |
| `--mp-back-top-bottom` | 公开 | `40px` | 本组件 CSS<br>`bottom` |
| `--mp-back-top-button-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-back-top-button-size` | 公开 | `var(--mp-sys-control-touch-target)` | 本组件 CSS<br>`height`, `width` |
| `--mp-back-top-focus-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`outline` |
| `--mp-back-top-focus-offset` | 公开 | `2px` | 本组件 CSS<br>`outline-offset` |
| `--mp-back-top-focus-width` | 公开 | `2px` | 本组件 CSS<br>`outline` |
| `--mp-back-top-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-back-top-hover-background` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background` |
| `--mp-back-top-icon-size` | 公开 | `20px` | 本组件 CSS<br>`height`, `width` |
| `--mp-back-top-right` | 公开 | `40px` | 本组件 CSS<br>`right` |
| `--mp-back-top-text-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-back-top-z-index` | 公开 | `var(--mp-z-index-local-sticky)` | 本组件 CSS<br>`z-index` |

</div>

## badge

声明来源: `src/badge/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-badge-bg-color` | 公开 | `rgb(var(--mp-danger-7))` | 本组件 CSS<br>`background-color` |
| `--mp-badge-border-color` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background-color`, `box-shadow` |
| `--mp-badge-description-size-lg-font-size` | 公开 | `var(--mp-sys-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-badge-description-size-md-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-badge-description-size-sm-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-badge-description-size-xl-font-size` | 公开 | `var(--mp-sys-font-size-xl)` | 本组件 CSS<br>`font-size` |
| `--mp-badge-description-size-xs-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-badge-description-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-badge-font-weight` | 公开 | `var(--mp-sys-font-weight-medium)` | 本组件 CSS<br>`font-weight` |
| `--mp-badge-offset` | 公开 | `2px` | 本组件 CSS<br>`bottom`, `left`, `right`, `top` |
| `--mp-badge-ring-width` | 公开 | `2px` | 本组件 CSS<br>`box-shadow`, `line-height` |
| `--mp-badge-size-lg-border-radius` | 公开 | `28px` | 本组件 CSS<br>`border-radius` |
| `--mp-badge-size-lg-dot-height` | 公开 | `7px` | 本组件 CSS<br>`height` |
| `--mp-badge-size-lg-dot-width` | 公开 | `7px` | 本组件 CSS<br>`width` |
| `--mp-badge-size-lg-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-badge-size-lg-height` | 公开 | `28px` | 本组件 CSS<br>`line-height`, `min-width` |
| `--mp-badge-size-lg-padding` | 公开 | `0 var(--mp-sys-space-4)` | 本组件 CSS<br>`padding` |
| `--mp-badge-size-lg-scale` | 公开 | `1` | 本组件 CSS<br>`transform` |
| `--mp-badge-size-lg-space` | 公开 | `var(--mp-sys-space-3)` | 本组件 CSS<br>`margin-inline` |
| `--mp-badge-size-md-border-radius` | 公开 | `24px` | 本组件 CSS<br>`border-radius` |
| `--mp-badge-size-md-dot-height` | 公开 | `6px` | 本组件 CSS<br>`height` |
| `--mp-badge-size-md-dot-width` | 公开 | `6px` | 本组件 CSS<br>`width` |
| `--mp-badge-size-md-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-badge-size-md-height` | 公开 | `24px` | 本组件 CSS<br>`line-height`, `min-width` |
| `--mp-badge-size-md-padding` | 公开 | `0 var(--mp-sys-space-4)` | 本组件 CSS<br>`padding` |
| `--mp-badge-size-md-scale` | 公开 | `1` | 本组件 CSS<br>`transform` |
| `--mp-badge-size-md-space` | 公开 | `var(--mp-sys-space-3)` | 本组件 CSS<br>`margin-inline` |
| `--mp-badge-size-sm-border-radius` | 公开 | `20px` | 本组件 CSS<br>`border-radius` |
| `--mp-badge-size-sm-dot-height` | 公开 | `5px` | 本组件 CSS<br>`height` |
| `--mp-badge-size-sm-dot-width` | 公开 | `5px` | 本组件 CSS<br>`width` |
| `--mp-badge-size-sm-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-badge-size-sm-height` | 公开 | `20px` | 本组件 CSS<br>`line-height`, `min-width` |
| `--mp-badge-size-sm-padding` | 公开 | `0 var(--mp-sys-space-3)` | 本组件 CSS<br>`padding` |
| `--mp-badge-size-sm-scale` | 公开 | `0.8333` | 本组件 CSS<br>`transform` |
| `--mp-badge-size-sm-space` | 公开 | `var(--mp-sys-space-1)` | 本组件 CSS<br>`margin-inline` |
| `--mp-badge-size-xl-border-radius` | 公开 | `32px` | 本组件 CSS<br>`border-radius` |
| `--mp-badge-size-xl-dot-height` | 公开 | `8px` | 本组件 CSS<br>`height` |
| `--mp-badge-size-xl-dot-width` | 公开 | `8px` | 本组件 CSS<br>`width` |
| `--mp-badge-size-xl-font-size` | 公开 | `var(--mp-sys-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-badge-size-xl-height` | 公开 | `32px` | 本组件 CSS<br>`line-height`, `min-width` |
| `--mp-badge-size-xl-padding` | 公开 | `0 10px` | 本组件 CSS<br>`padding` |
| `--mp-badge-size-xl-scale` | 公开 | `1` | 本组件 CSS<br>`transform` |
| `--mp-badge-size-xl-space` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`margin-inline` |
| `--mp-badge-size-xs-border-radius` | 公开 | `20px` | 本组件 CSS<br>`border-radius` |
| `--mp-badge-size-xs-dot-height` | 公开 | `4px` | 本组件 CSS<br>`height` |
| `--mp-badge-size-xs-dot-width` | 公开 | `4px` | 本组件 CSS<br>`width` |
| `--mp-badge-size-xs-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-badge-size-xs-height` | 公开 | `20px` | 本组件 CSS<br>`line-height`, `min-width` |
| `--mp-badge-size-xs-padding` | 公开 | `0 var(--mp-sys-space-3)` | 本组件 CSS<br>`padding` |
| `--mp-badge-size-xs-scale` | 公开 | `0.6667` | 本组件 CSS<br>`transform` |
| `--mp-badge-size-xs-space` | 公开 | `0px` | 本组件 CSS<br>`margin-inline` |
| `--mp-badge-status-danger-bg-color` | 公开 | `rgb(var(--mp-danger-7))` | 本组件 CSS<br>`background-color` |
| `--mp-badge-status-danger-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-badge-status-default-bg-color` | 公开 | `#e0e0e0` | 本组件 CSS<br>`background-color` |
| `--mp-badge-status-default-text-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-badge-status-info-bg-color` | 公开 | `var(--mp-sys-color-status-info)` | 本组件 CSS<br>`background-color` |
| `--mp-badge-status-info-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-badge-status-primary-bg-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color` |
| `--mp-badge-status-primary-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-badge-status-secondary-bg-color` | 公开 | `rgb(var(--mp-gray-6))` | 本组件 CSS<br>`background-color` |
| `--mp-badge-status-secondary-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-badge-status-success-bg-color` | 公开 | `var(--mp-sys-color-status-success)` | 本组件 CSS<br>`background-color` |
| `--mp-badge-status-success-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-badge-status-tertiary-bg-color` | 公开 | `rgb(var(--mp-gray-7))` | 本组件 CSS<br>`background-color` |
| `--mp-badge-status-tertiary-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-badge-status-warning-bg-color` | 公开 | `var(--mp-sys-color-status-warning)` | 本组件 CSS<br>`background-color` |
| `--mp-badge-status-warning-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-badge-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-badge-variant-outline-bg-color` | 公开 | `transparent` | 本组件 CSS<br>`background-color` |
| `--mp-badge-variant-outline-status-danger-text-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-default-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-info-text-color` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-primary-text-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-secondary-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-success-text-color` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-tertiary-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-warning-text-color` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-text-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`border`, `color` |

</div>

## breadcrumb

声明来源: `src/breadcrumb/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-breadcrumb-bg` | 公开 | `transparent` | 本组件 CSS<br>`background-color` |
| `--mp-breadcrumb-bg-hover` | 公开 | `var(--mp-color-fill-2)` | 本组件 CSS<br>`background-color` |
| `--mp-breadcrumb-dropdown-icon` | 公开 | `var(--mp-breadcrumb-item-inactive-color)` | 本组件 CSS<br>`color` |
| `--mp-breadcrumb-font-weight-active` | 公开 | `400` | 本组件 CSS<br>`font-weight` |
| `--mp-breadcrumb-icon-color` | 公开 | `var(--mp-breadcrumb-item-inactive-color)` | 本组件 CSS<br>`color` |
| `--mp-breadcrumb-item-active-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-breadcrumb-item-inactive-color` | 公开 | `var(--mp-color-text-2)` | 本组件 CSS<br>`color` |
| `--mp-breadcrumb-item-separator-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-breadcrumb-item-separator-margin` | 公开 | `0 var(--mp-breadcrumb-margin-separator-horizontal)` | 本组件 CSS<br>`margin` |
| `--mp-breadcrumb-link-text-color` | 公开 | `var(--mp-breadcrumb-item-active-color)` | 本组件 CSS<br>`color` |
| `--mp-breadcrumb-link-text-color-hover` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-breadcrumb-margin-dropdown-icon-left` | 公开 | `4px` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-breadcrumb-margin-separator-horizontal` | 公开 | `10px` | 本组件 CSS<br>`margin` |
| `--mp-breadcrumb-padding-text-horizontal` | 公开 | `0px` | 本组件 CSS<br>`margin`, `padding` |
| `--mp-breadcrumb-separator-color` | 公开 | `var(--mp-breadcrumb-item-inactive-color)` | 本组件 CSS<br>`color` |
| `--mp-breadcrumb-separator-font-size` | 公开 | `var(--mp-breadcrumb-item-separator-font-size)` | 本组件 CSS<br>`font-size` |
| `--mp-breadcrumb-separator-margin` | 公开 | `var(--mp-breadcrumb-item-separator-margin)` | 本组件 CSS<br>`margin` |
| `--mp-breadcrumb-size-dropdown-icon` | 公开 | `12px` | 本组件 CSS<br>`font-size` |
| `--mp-breadcrumb-size-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-breadcrumb-size-text-height` | 公开 | `24px` | 本组件 CSS<br>`line-height` |
| `--mp-breadcrumb-text-border-radius-hover` | 公开 | `var(--mp-sys-radius-sm)` | 本组件 CSS<br>`border-radius` |
| `--mp-breadcrumb-text-color` | 公开 | `var(--mp-breadcrumb-item-inactive-color)` | 本组件 CSS<br>`color` |
| `--mp-breadcrumb-text-color-active` | 公开 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |
| `--mp-breadcrumb-touch-target-size` | 公开 | `44px` | 本组件 CSS<br>`min-height`, `min-width` |

</div>

## button

声明来源: `src/button/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-button-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-bottom-left-radius`, `border-bottom-right-radius`, `border-radius`, `border-top-left-radius`, `border-top-right-radius` |
| `--mp-button-content-gap` | 公开 | `var(--mp-sys-space-3)` | 本组件 CSS<br>`gap` |
| `--mp-button-danger-color` | 公开 | `var(--mp-sys-color-status-danger)` | 本组件 CSS<br>`background-color`, `color` |
| `--mp-button-danger-disabled-color` | 公开 | `rgb(var(--mp-danger-3))`<br>`rgba(var(--mp-danger-6), 0.5)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color`, `color` |
| `--mp-button-danger-foreground-color` | 公开 | `var(--mp-button-danger-color)` | 本组件 CSS<br>`color` |
| `--mp-button-danger-tonal-color` | 公开 | `rgb(var(--mp-danger-1))` | 本组件 CSS<br>`background-color` |
| `--mp-button-default-color` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background-color` |
| `--mp-button-default-foreground-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`background`, `background-color`, `color` |
| `--mp-button-default-tonal-color` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background-color` |
| `--mp-button-disabled-color` | 公开 | `var(--mp-color-fill-2)` | 本组件 CSS<br>`background-color` |
| `--mp-button-disabled-solid-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)`<br>`rgba(255, 255, 255, 0.3)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`color` |
| `--mp-button-disabled-text-color` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-button-focus-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`outline` |
| `--mp-button-info-color` | 公开 | `var(--mp-sys-color-status-info)` | 本组件 CSS<br>`background-color`, `color` |
| `--mp-button-info-disabled-color` | 公开 | `rgb(var(--mp-blue-3))`<br>`rgba(var(--mp-blue-6), 0.5)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color`, `color` |
| `--mp-button-info-foreground-color` | 公开 | `var(--mp-button-info-color)` | 本组件 CSS<br>`color` |
| `--mp-button-info-tonal-color` | 公开 | `rgb(var(--mp-blue-1))` | 本组件 CSS<br>`background-color` |
| `--mp-button-lg-height` | 公开 | `56px` | 本组件 CSS<br>`height`, `min-width`, `width` |
| `--mp-button-lg-padding` | 公开 | `0 var(--mp-sys-space-7)` | 本组件 CSS<br>`padding` |
| `--mp-button-loading-duration` | 公开 | `1s` | 本组件 CSS<br>`animation` |
| `--mp-button-loading-line-height` | 公开 | `3px` | 本组件 CSS<br>`height` |
| `--mp-button-md-height` | 公开 | `48px` | 本组件 CSS<br>`height`, `min-width`, `width` |
| `--mp-button-md-padding` | 公开 | `0 var(--mp-sys-space-6)` | 本组件 CSS<br>`padding` |
| `--mp-button-plain-state-opacity-active` | 公开 | `1` | 本组件 CSS<br>`opacity` |
| `--mp-button-plain-state-opacity-hover` | 公开 | `0.5` | 本组件 CSS<br>`opacity` |
| `--mp-button-primary-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color`, `color` |
| `--mp-button-primary-disabled-color` | 公开 | `rgb(var(--mp-primary-3))`<br>`rgba(var(--mp-primary-6), 0.5)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color`, `color` |
| `--mp-button-primary-foreground-color` | 公开 | `var(--mp-button-primary-color)` | 本组件 CSS<br>`color` |
| `--mp-button-primary-state-layer-color` | 公开 | `var(--mp-button-solid-state-layer-color)` | 本组件 CSS<br>`background-color` |
| `--mp-button-primary-tonal-color` | 公开 | `rgb(var(--mp-primary-1))` | 本组件 CSS<br>`background-color` |
| `--mp-button-secondary-color` | 公开 | `rgb(var(--mp-gray-6))` | 本组件 CSS<br>`background-color` |
| `--mp-button-secondary-foreground-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-button-secondary-tonal-color` | 公开 | `rgb(var(--mp-gray-2))` | 本组件 CSS<br>`background-color` |
| `--mp-button-sm-height` | 公开 | `40px` | 本组件 CSS<br>`height`, `min-width`, `width` |
| `--mp-button-sm-padding` | 公开 | `0 var(--mp-sys-space-5)` | 本组件 CSS<br>`padding` |
| `--mp-button-solid-state-layer-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`background-color` |
| `--mp-button-solid-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-button-stacked-gap` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`gap`, `min-height`, `min-width` |
| `--mp-button-state-layer-color` | 公开 | `var(--mp-sys-color-surface-page)` | 本组件 CSS<br>`background-color` |
| `--mp-button-state-opacity-active` | 公开 | `0.12` | 本组件 CSS<br>`opacity` |
| `--mp-button-state-opacity-hover` | 公开 | `0.08` | 本组件 CSS<br>`opacity` |
| `--mp-button-success-color` | 公开 | `var(--mp-sys-color-status-success)` | 本组件 CSS<br>`background-color`, `color` |
| `--mp-button-success-disabled-color` | 公开 | `rgb(var(--mp-success-3))`<br>`rgba(var(--mp-success-6), 0.5)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color`, `color` |
| `--mp-button-success-foreground-color` | 公开 | `var(--mp-button-success-color)` | 本组件 CSS<br>`color` |
| `--mp-button-success-tonal-color` | 公开 | `rgb(var(--mp-success-1))` | 本组件 CSS<br>`background-color` |
| `--mp-button-tertiary-color` | 公开 | `rgb(var(--mp-gray-7))` | 本组件 CSS<br>`background-color` |
| `--mp-button-tertiary-foreground-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-button-tertiary-state-layer-color` | 公开 | `var(--mp-sys-color-content-on-bright)`<br>`var(--mp-sys-color-content-on-dark)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-button-tertiary-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)`<br>`var(--mp-sys-color-content-on-bright)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`color` |
| `--mp-button-tertiary-tonal-color` | 公开 | `rgb(var(--mp-gray-1))` | 本组件 CSS<br>`background-color` |
| `--mp-button-warning-color` | 公开 | `var(--mp-sys-color-status-warning)` | 本组件 CSS<br>`background-color`, `color` |
| `--mp-button-warning-disabled-color` | 公开 | `rgb(var(--mp-warning-3))`<br>`rgba(var(--mp-warning-6), 0.5)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color`, `color` |
| `--mp-button-warning-foreground-color` | 公开 | `var(--mp-button-warning-color)` | 本组件 CSS<br>`color` |
| `--mp-button-warning-tonal-color` | 公开 | `rgb(var(--mp-warning-1))` | 本组件 CSS<br>`background-color` |
| `--mp-button-xl-height` | 公开 | `64px` | 本组件 CSS<br>`height`, `min-width`, `width` |
| `--mp-button-xl-padding` | 公开 | `0 var(--mp-sys-space-8)` | 本组件 CSS<br>`padding` |
| `--mp-button-xs-height` | 公开 | `32px` | 本组件 CSS<br>`height`, `min-width`, `width` |
| `--mp-button-xs-padding` | 公开 | `0 var(--mp-sys-space-4)` | 本组件 CSS<br>`padding` |

</div>

## card

声明来源: `src/card/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-card-animation-duration` | 公开 | `var(--mp-sys-motion-duration-slow)` | 本组件 CSS<br>`transition` |
| `--mp-card-animation-easing` | 公开 | `var(--mp-sys-motion-easing-standard)` | 本组件 CSS<br>`transition-timing-function` |
| `--mp-card-background` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background` |
| `--mp-card-border-radius` | 公开 | `4px` | 本组件 CSS<br>`border-radius` |
| `--mp-card-close-button-background` | 公开 | `#212121` | 本组件 CSS<br>`background-color` |
| `--mp-card-close-button-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-card-close-button-icon-size` | 公开 | `24px` | 本组件 CSS<br>`font-size` |
| `--mp-card-close-button-size` | 公开 | `56px` | 本组件 CSS<br>`height`, `width` |
| `--mp-card-close-button-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-card-content-color` | 公开 | `var(--mp-sys-color-content-tertiary)` | 本组件 CSS<br>`color` |
| `--mp-card-content-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-card-content-margin` | 公开 | `16px 0 0 0` | 本组件 CSS<br>`margin` |
| `--mp-card-content-padding` | 公开 | `0 16px` | 本组件 CSS<br>`padding` |
| `--mp-card-content-row-margin` | 公开 | `16px 0 0 0` | 本组件 CSS<br>`margin` |
| `--mp-card-description-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-card-description-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-card-description-margin` | 公开 | `20px 0 0 0` | 本组件 CSS<br>`margin` |
| `--mp-card-description-padding` | 公开 | `0 13px` | 本组件 CSS<br>`padding` |
| `--mp-card-filled-background` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background-color` |
| `--mp-card-floating-buttons-bottom` | 公开 | `16px` | 本组件 CSS<br>`bottom` |
| `--mp-card-floating-buttons-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-card-floating-buttons-right` | 公开 | `16px` | 本组件 CSS<br>`inset-inline-end` |
| `--mp-card-footer-bottom` | 公开 | `9px` | 本组件 CSS<br>`bottom` |
| `--mp-card-footer-margin` | 公开 | `30px 0 0 0` | 本组件 CSS<br>`margin` |
| `--mp-card-footer-padding` | 公开 | `0 12px` | 本组件 CSS<br>`padding` |
| `--mp-card-footer-right` | 公开 | `13px` | 本组件 CSS<br>`inset-inline-end` |
| `--mp-card-hover-shadow` | 公开 | `0 4px 12px rgb(0 0 0%)` | 本组件 CSS<br>`box-shadow` |
| `--mp-card-image-height` | 公开 | `200px` | 本组件 CSS<br>`height` |
| `--mp-card-image-width` | 公开 | `100%` | 本组件 CSS<br>`width` |
| `--mp-card-line-height` | 公开 | `22px` | 本组件 CSS<br>`line-height` |
| `--mp-card-outline-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border` |
| `--mp-card-padding` | 公开 | `0 0 15px 0` | 本组件 CSS<br>`padding` |
| `--mp-card-row-height` | 公开 | `140px` | 本组件 CSS<br>`min-height` |
| `--mp-card-row-image-width` | 公开 | `140px` | 本组件 CSS<br>`width` |
| `--mp-card-row-line-height` | 公开 | `1.5` | 本组件 CSS<br>`line-height` |
| `--mp-card-size-sm-section-margin` | 公开 | `8px 0 0` | 本组件 CSS<br>`margin` |
| `--mp-card-size-sm-section-padding` | 公开 | `0 12px` | 本组件 CSS<br>`padding` |
| `--mp-card-size-sm-title-font-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-card-subtitle-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-card-subtitle-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-card-subtitle-margin` | 公开 | `10px 0 0 0` | 本组件 CSS<br>`margin` |
| `--mp-card-subtitle-padding` | 公开 | `0 12px` | 本组件 CSS<br>`padding` |
| `--mp-card-subtitle-row-margin` | 公开 | `-8px 0 0 0` | 本组件 CSS<br>`margin` |
| `--mp-card-title-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-card-title-font-size` | 公开 | `20px` | 本组件 CSS<br>`font-size` |
| `--mp-card-title-margin` | 公开 | `15px 0 0 0` | 本组件 CSS<br>`margin` |
| `--mp-card-title-padding` | 公开 | `0 12px` | 本组件 CSS<br>`padding` |
| `--mp-card-title-row-margin` | 公开 | `12px 0` | 本组件 CSS<br>`margin` |

</div>

## carousel

声明来源: `src/carousel/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-carousel-arrow-background` | 公开 | `rgb(0 0 0 / 35%)` | 本组件 CSS<br>`background` |
| `--mp-carousel-arrow-background-hover` | 公开 | `rgb(0 0 0 / 55%)` | 本组件 CSS<br>`background` |
| `--mp-carousel-arrow-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-carousel-arrow-disabled-opacity` | 公开 | `0.4` | 本组件 CSS<br>`opacity` |
| `--mp-carousel-arrow-font-size` | 公开 | `var(--mp-sys-font-size-xl)` | 本组件 CSS<br>`font-size` |
| `--mp-carousel-arrow-margin` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`bottom`, `left`, `right`, `top` |
| `--mp-carousel-arrow-size` | 公开 | `var(--mp-sys-control-height-md)` | 本组件 CSS<br>`height`, `width` |
| `--mp-carousel-card-duration` | 公开 | `var(--mp-sys-motion-duration-standard)` | 本组件 CSS<br>`transition` |
| `--mp-carousel-card-opacity` | 公开 | `0.6` | 本组件 CSS<br>`opacity` |
| `--mp-carousel-card-scale` | 公开 | `0.85` | 本组件 CSS<br>`transform` |
| `--mp-carousel-fade-duration` | 公开 | `var(--mp-sys-motion-duration-standard)` | 本组件 CSS<br>`transition` |
| `--mp-carousel-focus-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`outline` |
| `--mp-carousel-focus-offset` | 公开 | `2px` | 本组件 CSS<br>`outline-offset` |
| `--mp-carousel-focus-width` | 公开 | `2px` | 本组件 CSS<br>`outline` |
| `--mp-carousel-indicator-color-active` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`background` |
| `--mp-carousel-indicator-color-default` | 公开 | `rgb(255 255 255 / 35%)` | 本组件 CSS<br>`background` |
| `--mp-carousel-indicator-dot-size` | 公开 | `8px` | 本组件 CSS<br>`height`, `width` |
| `--mp-carousel-indicator-gap` | 公开 | `var(--mp-sys-space-3)` | 本组件 CSS<br>`gap` |
| `--mp-carousel-indicator-line-border-radius` | 公开 | `var(--mp-sys-radius-sm)` | 本组件 CSS<br>`border-radius` |
| `--mp-carousel-indicator-line-height` | 公开 | `3px` | 本组件 CSS<br>`height` |
| `--mp-carousel-indicator-line-width` | 公开 | `20px` | 本组件 CSS<br>`width` |
| `--mp-carousel-indicator-outer-margin-bottom` | 公开 | `var(--mp-sys-space-8)` | 本组件 CSS<br>`padding-bottom` |
| `--mp-carousel-indicator-position` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`bottom`, `left`, `right`, `top` |
| `--mp-carousel-navigation-z-index` | 公开 | `10` | 本组件 CSS<br>`z-index` |
| `--mp-carousel-transition-duration` | 公开 | `var(--mp-sys-motion-duration-standard)` | 本组件 CSS<br>`transition` |
| `--mp-carousel-transition-timing-function` | 公开 | `ease` | 本组件 CSS<br>`transition` |

</div>

## cascader

声明来源: `src/cascader/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-cascader-checkbox-bg-hover` | 公开 | `var(--mp-color-fill-3)` | 本组件 CSS<br>`background-color` |
| `--mp-cascader-font-item-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-cascader-item-bg-active` | 公开 | `transparent` | 本组件 CSS<br>`background`, `background-color` |
| `--mp-cascader-item-bg-disabled` | 公开 | `transparent` | 本组件 CSS<br>`background-color` |
| `--mp-cascader-item-bg-disabled-active` | 公开 | `var(--mp-color-fill-2)` | 本组件 CSS<br>`background-color` |
| `--mp-cascader-item-bg-hover` | 公开 | `var(--mp-color-fill-2)` | 本组件 CSS<br>`background`, `background-color` |
| `--mp-cascader-item-check-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-cascader-item-check-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`height`, `width` |
| `--mp-cascader-item-icon-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-cascader-item-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-cascader-item-text-color-active` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-cascader-item-text-color-disabled` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-cascader-item-text-color-disabled-active` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-cascader-item-text-color-hover` | 公开 | `var(--mp-cascader-item-text-color)` | 本组件 CSS<br>`color` |
| `--mp-cascader-margin-checkbox-right` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-cascader-margin-item-icon-left` | 公开 | `var(--mp-sys-space-5)` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-cascader-option-min-width` | 公开 | `100px` | 本组件 CSS<br>`min-width` |
| `--mp-cascader-padding-item-left` | 公开 | `var(--mp-sys-space-5)` | 本组件 CSS<br>`padding-inline-end`, `padding-inline-start` |
| `--mp-cascader-padding-item-right` | 公开 | `var(--mp-sys-space-5)` | 本组件 CSS<br>`margin-inline-end`, `padding-inline-end` |
| `--mp-cascader-panel-column-max-height` | 公开 | `200px` | 本组件 CSS<br>`max-height` |
| `--mp-cascader-panel-column-min-width` | 公开 | `120px` | 本组件 CSS<br>`min-width` |
| `--mp-cascader-popup-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-cascader-popup-box-shadow` | 公开 | `0 4px 10px rgb(0 0 0%)` | 本组件 CSS<br>`box-shadow` |
| `--mp-cascader-popup-color-border` | 公开 | `var(--mp-color-fill-3)` | 本组件 CSS<br>`border`, `border-inline-end`, `border-top` |
| `--mp-cascader-popup-max-height` | 公开 | `200px` | 本组件 CSS<br>`height` |
| `--mp-cascader-popup-padding-vertical` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`padding`, `padding-block-end` |
| `--mp-cascader-size-item-height` | 公开 | `36px` | 本组件 CSS<br>`height`, `line-height` |
| `--mp-cascader-size-item-icon` | 公开 | `12px` | 本组件 CSS<br>`height`, `width` |
| `--mp-cascader-slide-margin` | 公开 | `120px` | 本组件 CSS<br>`margin-inline-start` |

</div>

## cell

声明来源: `src/cell/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-cell-border-color` | 公开 | `var(--mp-color-border-2)` | 本组件 CSS<br>`border-bottom` |
| `--mp-cell-border-left` | 公开 | `12px` | 本组件 CSS<br>`left` |
| `--mp-cell-border-right` | 公开 | `12px` | 本组件 CSS<br>`right` |
| `--mp-cell-color` | 公开 | `var(--mp-color-text)` | 本组件 CSS<br>`color` |
| `--mp-cell-description-color` | 公开 | `rgba(0, 0, 0, 0.6)` | 本组件 CSS<br>`color` |
| `--mp-cell-description-font-size` | 公开 | `var(--mp-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-cell-description-margin-top` | 公开 | `4px` | 本组件 CSS<br>`margin-top` |
| `--mp-cell-extra-left` | 公开 | `8px` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-cell-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-cell-icon-right` | 公开 | `8px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-cell-min-height` | 公开 | `40px` | 本组件 CSS<br>`min-height` |
| `--mp-cell-padding` | 公开 | `10px 12px` | 本组件 CSS<br>`padding` |

</div>

## checkbox

声明来源: `src/checkbox/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-checkbox-action-padding` | 公开 | `6px` | 本组件 CSS<br>`padding` |
| `--mp-checkbox-animation-duration` | 公开 | `var(--mp-sys-motion-duration-standard)` | 本组件 CSS<br>`transition` |
| `--mp-checkbox-control-border-radius` | 公开 | `2px` | 本组件 CSS<br>`border-radius` |
| `--mp-checkbox-control-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`color` |
| `--mp-checkbox-control-color-checked` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color`, `outline` |
| `--mp-checkbox-control-color-disabled` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-checkbox-control-color-error` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-checkbox-control-size` | 公开 | `24px` | 本组件 CSS<br>`height`, `width` |
| `--mp-checkbox-group-gap` | 公开 | `0` | 本组件 CSS<br>`gap` |
| `--mp-checkbox-label-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-checkbox-label-gap` | 公开 | `0` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-checkbox-label-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-checkbox-label-text-color-disabled` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-checkbox-mark-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`background-color`, `color` |
| `--mp-internal-checkbox-action-radius` | 内部 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-internal-checkbox-background` | 内部 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background-color` |
| `--mp-internal-checkbox-background-disabled` | 内部 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background-color` |
| `--mp-internal-checkbox-border-radius` | 内部 | `var(--mp-checkbox-control-border-radius)` | 本组件 CSS<br>`border-radius` |
| `--mp-internal-checkbox-border-width` | 内部 | `1px` | 本组件 CSS<br>`border` |
| `--mp-internal-checkbox-focus-width` | 内部 | `2px` | 本组件 CSS<br>`box-shadow` |
| `--mp-internal-checkbox-hover-background` | 内部 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background-color` |
| `--mp-internal-checkbox-mark-color` | 内部 | `var(--mp-checkbox-mark-color)` | 本组件 CSS<br>`background-color`, `color` |
| `--mp-internal-checkbox-mark-height` | 内部 | `2px` | 本组件 CSS<br>`height` |
| `--mp-internal-checkbox-mark-radius` | 内部 | `1px` | 本组件 CSS<br>`border-radius` |
| `--mp-internal-checkbox-mark-size` | 内部 | `75%` | 本组件 CSS<br>`height`, `width` |

</div>

## code

声明来源: `src/code/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-code-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-code-line-height` | 公开 | `1.7` | 本组件 CSS<br>`line-height` |

</div>

## collapse

声明来源: `src/collapse/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-collapse-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border` |
| `--mp-collapse-border-radius` | 公开 | `4px` | 本组件 CSS<br>`border-radius` |
| `--mp-collapse-border-width` | 公开 | `1px` | 本组件 CSS<br>`border` |
| `--mp-collapse-content-bg` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background-color` |
| `--mp-collapse-content-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-collapse-content-padding-vertical` | 公开 | `10px` | 本组件 CSS<br>`padding` |
| `--mp-collapse-content-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-collapse-content-text-color-disabled` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-collapse-expand-icon` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-collapse-expand-icon-active-transform` | 公开 | `rotate(-180deg)` | 本组件 CSS<br>`transform` |
| `--mp-collapse-expand-icon-right-active-transform` | 公开 | `rotate(-180deg)` | 本组件 CSS<br>`transform` |
| `--mp-collapse-expand-icon-right-transform` | 公开 | `rotate(0deg)` | 本组件 CSS<br>`transform` |
| `--mp-collapse-expand-icon-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-collapse-expand-icon-spacing-text` | 公开 | `8px` | 本组件 CSS<br>`gap` |
| `--mp-collapse-expand-icon-transform` | 公开 | `rotate(0deg)` | 本组件 CSS<br>`transform` |
| `--mp-collapse-focus-color` | 公开 | `currentColor` | 本组件 CSS<br>`outline` |
| `--mp-collapse-focus-offset` | 公开 | `-2px` | 本组件 CSS<br>`outline-offset` |
| `--mp-collapse-focus-width` | 公开 | `2px` | 本组件 CSS<br>`outline` |
| `--mp-collapse-item-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-bottom` |
| `--mp-collapse-item-border-width` | 公开 | `1px` | 本组件 CSS<br>`border-bottom` |
| `--mp-collapse-item-margin-top` | 公开 | `16px` | 本组件 CSS<br>`margin-top` |
| `--mp-collapse-line-height` | 公开 | `1.5` | 本组件 CSS<br>`line-height` |
| `--mp-collapse-motion-duration` | 公开 | `0.25s` | 本组件 CSS<br>`transition` |
| `--mp-collapse-motion-easing` | 公开 | `ease` | 本组件 CSS<br>`transition` |
| `--mp-collapse-title-bg` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background`, `background-color` |
| `--mp-collapse-title-bg-active` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background-color` |
| `--mp-collapse-title-bg-disabled` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background-color` |
| `--mp-collapse-title-font-size` | 公开 | `var(--mp-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-collapse-title-font-weight-active` | 公开 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-collapse-title-line-height` | 公开 | `24px` | 本组件 CSS<br>`line-height` |
| `--mp-collapse-title-padding-horizontal` | 公开 | `12px` | 本组件 CSS<br>`padding` |
| `--mp-collapse-title-padding-vertical` | 公开 | `10px` | 本组件 CSS<br>`padding` |
| `--mp-collapse-title-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-collapse-title-text-color-disabled` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |

</div>

## count-to

声明来源: `src/count-to/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-count-to-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-count-to-text-font-size` | 公开 | `var(--mp-font-size-lg)` | 本组件 CSS<br>`font-size` |

</div>

## countdown

声明来源: `src/countdown/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-countdown-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-countdown-text-font-size` | 公开 | `var(--mp-font-size-lg)` | 本组件 CSS<br>`font-size` |

</div>

## date

声明来源: `src/date/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-date-calendar-disabled-opacity` | 公开 | `0.4` | 本组件 CSS<br>`opacity` |
| `--mp-date-calendar-line-height` | 公开 | `60px` | 本组件 CSS<br>`grid-auto-rows` |
| `--mp-date-calendar-month-height` | 公开 | `320px` | 本组件 CSS<br>`height` |
| `--mp-date-calendar-row-height` | 公开 | `38px` | 本组件 CSS<br>`grid-auto-rows`, `line-height` |
| `--mp-date-calendar-scroll-height` | 公开 | `320px` | 本组件 CSS<br>`height` |
| `--mp-date-calendar-selected-background` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background` |
| `--mp-date-calendar-selected-color` | 公开 | `var(--mp-button-solid-text-color)` | 本组件 CSS<br>`color` |
| `--mp-date-calendar-today-color` | 公开 | `var(--mp-button-default-foreground-color)` | 本组件 CSS<br>`background`, `color` |
| `--mp-date-input-trigger-outline-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`outline` |
| `--mp-date-input-trigger-outline-offset` | 公开 | `var(--mp-sys-space-1)` | 本组件 CSS<br>`outline-offset` |
| `--mp-date-input-trigger-outline-width` | 公开 | `var(--mp-sys-space-1)` | 本组件 CSS<br>`outline` |
| `--mp-date-input-trigger-padding` | 公开 | `0` | 本组件 CSS<br>`padding` |
| `--mp-date-picker-actions-padding` | 公开 | `0 8px 12px 8px` | 本组件 CSS<br>`padding` |
| `--mp-date-picker-body-background-color` | 公开 | `#fff` | 本组件 CSS<br>`background`, `background-color` |
| `--mp-date-picker-body-height` | 公开 | `280px` | 本组件 CSS<br>`height`, `min-height` |
| `--mp-date-picker-body-padding` | 公开 | `0` | 本组件 CSS<br>`padding` |
| `--mp-date-picker-border-radius` | 公开 | `4px` | 本组件 CSS<br>`border-radius` |
| `--mp-date-picker-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-date-picker-header-arrow-filter` | 公开 | `opacity(0.54)` | 本组件 CSS<br>`filter` |
| `--mp-date-picker-header-color` | 公开 | `#555` | 本组件 CSS<br>`color` |
| `--mp-date-picker-header-padding` | 公开 | `4px 16px` | 本组件 CSS<br>`padding` |
| `--mp-date-picker-main-color` | 公开 | `rgba(0, 0, 0, 0.87)` | 本组件 CSS<br>`color` |
| `--mp-date-picker-min-width` | 公开 | `290px` | 本组件 CSS<br>`flex`, `min-width` |
| `--mp-date-picker-panel-background` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background` |
| `--mp-date-picker-panel-border` | 公开 | `var(--mp-color-border-2)` | 本组件 CSS<br>`border` |
| `--mp-date-picker-panel-date-width` | 公开 | `265px` | 本组件 CSS<br>`flex`, `min-width`, `width` |
| `--mp-date-picker-panel-preferred-width` | 公开 | `var(--mp-date-picker-popover-width)` | 本组件 CSS<br>`flex`, `width` |
| `--mp-date-picker-panel-radius` | 公开 | `8px` | 本组件 CSS<br>`border-radius` |
| `--mp-date-picker-popover-gap` | 公开 | `32px` | 本组件 CSS<br>`max-height`, `max-width` |
| `--mp-date-picker-popover-max-height` | 公开 | `calc(100dvh - var(--mp-date-picker-popover-gap))` | 本组件 CSS<br>`max-height` |
| `--mp-date-picker-popover-width` | 公开 | `calc(var(--mp-date-picker-panel-date-width) + 2px)` | 本组件 CSS<br>`flex`, `width` |
| `--mp-date-picker-range-background` | 公开 | `var(--mp-color-primary-light-1)` | 本组件 CSS<br>`background` |
| `--mp-date-picker-range-disabled-background` | 公开 | `var(--mp-color-fill-1)` | 本组件 CSS<br>`background` |
| `--mp-date-picker-range-preview-background` | 公开 | `var(--mp-color-fill-2)` | 本组件 CSS<br>`background` |
| `--mp-date-picker-range-preview-outline` | 公开 | `1px dashed var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`outline` |
| `--mp-date-picker-shortcuts-column-width` | 公开 | `128px` | 本组件 CSS<br>`flex`, `width` |
| `--mp-date-picker-title-background` | 公开 | `var(--mp-date-picker-body-background-color)` | 本组件 CSS<br>`background` |
| `--mp-date-picker-title-color` | 公开 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |
| `--mp-date-picker-title-date-font-size` | 公开 | `34px` | 本组件 CSS<br>`font-size` |
| `--mp-date-picker-title-date-font-weight` | 公开 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-date-picker-title-date-height` | 公开 | `48px` | 本组件 CSS<br>`min-height` |
| `--mp-date-picker-title-date-justify-content` | 公开 | `normal` | 本组件 CSS<br>`justify-content` |
| `--mp-date-picker-title-date-range-font-size` | 公开 | `20px` | 本组件 CSS<br>`font-size` |
| `--mp-date-picker-title-height` | 公开 | `105px` | 本组件 CSS<br>`min-height` |
| `--mp-date-picker-title-hint-color` | 公开 | `var(--mp-color-text-3)` | 本组件 CSS<br>`color` |
| `--mp-date-picker-title-hint-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-date-picker-title-padding` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-date-picker-title-year-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-date-picker-title-year-font-weight` | 公开 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-date-picker-title-year-margin-bottom` | 公开 | `8px` | 本组件 CSS<br>`margin-bottom` |
| `--mp-date-picker-title-year-min-height` | 公开 | `21px` | 本组件 CSS<br>`min-height` |
| `--mp-date-picker-wheel-font-size` | 公开 | `5cqi` | 跨组件 CSS<br>`font-size` |
| `--mp-date-title-font-size` | 公开 | `var(--mp-picker-title-font-size, 16px)` | 本组件 CSS<br>`font-size` |
| `--mp-date-title-text-color` | 公开 | `var(--mp-picker-title-text-color, #555)` | 本组件 CSS<br>`color` |
| `--mp-date-toolbar-height` | 公开 | `var(--mp-picker-toolbar-height, 44px)` | 本组件 CSS<br>`height` |
| `--mp-date-toolbar-padding` | 公开 | `var(--mp-picker-toolbar-padding, 0 4px)` | 本组件 CSS<br>`padding` |
| `--mp-day-picker-content-item-button-font-size` | 公开 | `var(--mp-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-day-picker-content-item-button-height` | 公开 | `32px` | 本组件 CSS<br>`height` |
| `--mp-day-picker-content-item-button-width` | 公开 | `32px` | 本组件 CSS<br>`width` |
| `--mp-day-picker-content-item-font-size` | 公开 | `var(--mp-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-day-picker-content-item-min-height` | 公开 | `21px` | 本组件 CSS<br>`min-height` |
| `--mp-day-picker-content-item-padding` | 公开 | `2px 0` | 本组件 CSS<br>`padding` |
| `--mp-day-picker-content-item-width` | 公开 | `14.28%` | 本组件 CSS<br>`width` |
| `--mp-day-picker-head-item-color` | 公开 | `rgba(0, 0, 0, 0.38)` | 本组件 CSS<br>`color` |
| `--mp-day-picker-head-item-font-weight` | 公开 | `600` | 本组件 CSS<br>`font-weight` |
| `--mp-day-picker-head-item-padding` | 公开 | `8px 0` | 本组件 CSS<br>`padding` |
| `--mp-month-picker-item-button-max-width` | 公开 | `140px` | 本组件 CSS<br>`max-width` |
| `--mp-month-picker-item-height` | 公开 | `56px` | 本组件 CSS<br>`height` |
| `--mp-month-picker-item-width` | 公开 | `33%` | 本组件 CSS<br>`width` |
| `--mp-month-picker-padding` | 公开 | `0 12px` | 本组件 CSS<br>`padding` |
| `--mp-year-picker-item-button-max-width` | 公开 | `140px` | 本组件 CSS<br>`max-width` |
| `--mp-year-picker-item-height` | 公开 | `56px` | 本组件 CSS<br>`height` |
| `--mp-year-picker-item-width` | 公开 | `33%` | 本组件 CSS<br>`width` |
| `--mp-year-picker-padding` | 公开 | `0 12px` | 本组件 CSS<br>`padding` |

</div>

## date-range

声明来源: `src/date-range/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-date-range-picker-background` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background`, `background-color`, `background-image` |
| `--mp-date-range-picker-border-radius` | 公开 | `var(--mp-date-picker-border-radius, 4px)` | 本组件 CSS<br>`border-radius` |
| `--mp-date-range-picker-column-label-color` | 公开 | `var(--mp-color-text-3)` | 本组件 CSS<br>`color` |
| `--mp-date-range-picker-column-label-font-size` | 公开 | `var(--mp-internal-temporal-panel-column-label-font-size)` | 本组件 CSS<br>`font-size` |
| `--mp-date-range-picker-column-label-height` | 公开 | `var(--mp-internal-temporal-panel-column-label-height)` | 本组件 CSS<br>`height` |
| `--mp-date-range-picker-quick-time-width` | 公开 | `var(--mp-internal-temporal-panel-quick-time-width)` | 本组件 CSS<br>`flex`, `width` |
| `--mp-date-range-picker-summary-active-background` | 公开 | `var(--mp-internal-temporal-panel-summary-active-background)` | 本组件 CSS<br>`background` |
| `--mp-date-range-picker-summary-background` | 公开 | `var(--mp-internal-temporal-panel-summary-background)` | 本组件 CSS<br>`background` |
| `--mp-date-range-picker-summary-touch-height` | 公开 | `var(--mp-internal-temporal-panel-touch-height)` | 本组件 CSS<br>`min-height` |
| `--mp-date-range-picker-value-active-color` | 公开 | `var(--mp-internal-temporal-panel-summary-active-color)` | 本组件 CSS<br>`color` |
| `--mp-date-range-picker-value-date-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-date-range-picker-values-font-weight` | 公开 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-date-range-title-font-size` | 公开 | `var(--mp-picker-title-font-size, 16px)` | 本组件 CSS<br>`font-size` |
| `--mp-date-range-title-text-color` | 公开 | `var(--mp-picker-title-text-color, #555)` | 本组件 CSS<br>`color` |
| `--mp-date-range-toolbar-height` | 公开 | `var(--mp-picker-toolbar-height, 44px)` | 本组件 CSS<br>`height` |
| `--mp-date-range-toolbar-padding` | 公开 | `var(--mp-picker-toolbar-padding, 0 4px)` | 本组件 CSS<br>`padding` |

</div>

## dialog

声明来源: `src/dialog/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-dialog-actions-button-gap` | 公开 | `var(--mp-sys-space-3)` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-dialog-actions-padding` | 公开 | `0 12px 12px` | 本组件 CSS<br>`padding` |
| `--mp-dialog-animation-duration` | 公开 | `var(--mp-sys-motion-duration-slow)` | 本组件 CSS<br>`transition` |
| `--mp-dialog-animation-easing` | 公开 | `var(--mp-sys-motion-easing-standard)` | 本组件 CSS<br>`transition` |
| `--mp-dialog-background` | 公开 | `var(--mp-sys-color-surface-raised)` | 本组件 CSS<br>`background` |
| `--mp-dialog-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-dialog-border-radius` | 公开 | `3px` | 本组件 CSS<br>`border-radius` |
| `--mp-dialog-border-width` | 公开 | `0` | 本组件 CSS<br>`border` |
| `--mp-dialog-close-button-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-dialog-close-button-font-size` | 公开 | `20px` | 本组件 CSS<br>`font-size` |
| `--mp-dialog-close-button-inset-inline-end` | 公开 | `0` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-dialog-close-button-size` | 公开 | `40px` | 本组件 CSS<br>`height`, `width` |
| `--mp-dialog-content-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-dialog-content-line-height` | 公开 | `24px` | 本组件 CSS<br>`line-height` |
| `--mp-dialog-content-padding` | 公开 | `12px 20px` | 本组件 CSS<br>`padding` |
| `--mp-dialog-content-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-dialog-divider-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-bottom` |
| `--mp-dialog-divider-width` | 公开 | `1px` | 本组件 CSS<br>`border-bottom` |
| `--mp-dialog-fullscreen-height` | 公开 | `100vh`<br>`100dvh` | 本组件 CSS<br>`height` |
| `--mp-dialog-fullscreen-width` | 公开 | `100vw` | 本组件 CSS<br>`width` |
| `--mp-dialog-margin-top` | 公开 | `0` | 本组件 CSS<br>`margin-top` |
| `--mp-dialog-max-height` | 公开 | `90vh`<br>`90dvh` | 本组件 CSS<br>`max-height` |
| `--mp-dialog-overlay-background` | 公开 | `var(--mp-sys-color-scrim)` | 本组件 CSS<br>`background-color` |
| `--mp-dialog-simple-actions-gap` | 公开 | `0` | 本组件 CSS<br>`margin-top` |
| `--mp-dialog-simple-border-radius` | 公开 | `var(--mp-sys-radius-lg)` | 本组件 CSS<br>`border-radius` |
| `--mp-dialog-simple-content-gap` | 公开 | `0` | 本组件 CSS<br>`margin-top` |
| `--mp-dialog-simple-padding` | 公开 | `20px` | 本组件 CSS<br>`padding` |
| `--mp-dialog-simple-width` | 公开 | `280px` | 本组件 CSS<br>`width` |
| `--mp-dialog-status-danger-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-dialog-status-icon-gap` | 公开 | `var(--mp-sys-space-3)` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-dialog-status-icon-size` | 公开 | `18px` | 本组件 CSS<br>`font-size` |
| `--mp-dialog-status-info-color` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-dialog-status-success-color` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-dialog-status-warning-color` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-dialog-title-font-size` | 公开 | `var(--mp-sys-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-dialog-title-font-weight` | 公开 | `var(--mp-sys-font-weight-regular)` | 本组件 CSS<br>`font-weight` |
| `--mp-dialog-title-justify` | 公开 | `space-between` | 本组件 CSS<br>`justify-content` |
| `--mp-dialog-title-min-height` | 公开 | `0` | 本组件 CSS<br>`min-height` |
| `--mp-dialog-title-padding` | 公开 | `20px 20px 0` | 本组件 CSS<br>`padding` |
| `--mp-dialog-title-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-dialog-width` | 公开 | `280px` | 本组件 CSS<br>`width` |

</div>

## divider

声明来源: `src/divider/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-divider-border-width` | 公开 | `1px` | 本组件 CSS<br>`border-inline-start-width`, `border-top-width` |
| `--mp-divider-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-inline-start-color`, `border-top-color` |
| `--mp-divider-orientation-horizontal-inset-lg` | 公开 | `32px` | 本组件 CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-md` | 公开 | `24px` | 本组件 CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-sm` | 公开 | `16px` | 本组件 CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-xl` | 公开 | `40px` | 本组件 CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-xs` | 公开 | `12px` | 本组件 CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-spacing-lg` | 公开 | `24px` | 本组件 CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-md` | 公开 | `16px` | 本组件 CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-sm` | 公开 | `12px` | 本组件 CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-xl` | 公开 | `32px` | 本组件 CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-xs` | 公开 | `8px` | 本组件 CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-vertical-inset-lg` | 公开 | `8px` | 本组件 CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-md` | 公开 | `6px` | 本组件 CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-sm` | 公开 | `4px` | 本组件 CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-xl` | 公开 | `12px` | 本组件 CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-xs` | 公开 | `2px` | 本组件 CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-spacing-lg` | 公开 | `16px` | 本组件 CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-md` | 公开 | `12px` | 本组件 CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-sm` | 公开 | `8px` | 本组件 CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-xl` | 公开 | `24px` | 本组件 CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-xs` | 公开 | `4px` | 本组件 CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-text-align-inset` | 公开 | `24px` | 本组件 CSS<br>`height`, `width` |
| `--mp-divider-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-divider-text-padding` | 公开 | `8px` | 本组件 CSS<br>`padding` |

</div>

## ellipsis

声明来源: `src/ellipsis/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-ellipsis-focus-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`outline` |
| `--mp-ellipsis-focus-offset` | 公开 | `2px` | 本组件 CSS<br>`outline-offset` |
| `--mp-ellipsis-focus-width` | 公开 | `2px` | 本组件 CSS<br>`outline` |

</div>

## empty

声明来源: `src/empty/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-empty-description-color` | 公开 | `var(--mp-sys-color-content-tertiary)` | 本组件 CSS<br>`color` |
| `--mp-empty-description-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-empty-description-line-height` | 公开 | `1.5` | 本组件 CSS<br>`line-height` |
| `--mp-empty-extra-margin-top` | 公开 | `20px` | 本组件 CSS<br>`margin-top` |
| `--mp-empty-icon-color` | 公开 | `var(--mp-sys-color-content-decorative)` | 本组件 CSS<br>`color` |
| `--mp-empty-image-margin-bottom` | 公开 | `4px` | 本组件 CSS<br>`margin-bottom` |
| `--mp-empty-padding` | 公开 | `20px` | 本组件 CSS<br>`padding` |
| `--mp-empty-size-lg` | 公开 | `140px` | 本组件 CSS<br>`font-size`, `height`, `width` |
| `--mp-empty-size-md` | 公开 | `120px` | 本组件 CSS<br>`font-size`, `height`, `width` |
| `--mp-empty-size-sm` | 公开 | `100px` | 本组件 CSS<br>`font-size`, `height`, `width` |
| `--mp-empty-size-xl` | 公开 | `160px` | 本组件 CSS<br>`font-size`, `height`, `width` |
| `--mp-empty-size-xs` | 公开 | `80px` | 本组件 CSS<br>`font-size`, `height`, `width` |

</div>

## fab

声明来源: `src/fab/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-fab-action-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-fab-action-margin` | 公开 | `6px` | 本组件 CSS<br>`margin` |
| `--mp-fab-action-size` | 公开 | `40px` | 本组件 CSS<br>`height`, `min-width`, `width` |
| `--mp-fab-actions-padding` | 公开 | `10px 0` | 本组件 CSS<br>`padding` |
| `--mp-fab-bottom` | 公开 | `16px` | 本组件 CSS<br>`bottom` |
| `--mp-fab-left` | 公开 | `16px` | 本组件 CSS<br>`left` |
| `--mp-fab-right` | 公开 | `16px` | 本组件 CSS<br>`right` |
| `--mp-fab-top` | 公开 | `70px` | 本组件 CSS<br>`top` |
| `--mp-fab-transition-standard-easing` | 公开 | `cubic-bezier(0.4, 0, 0.2, 1)` | 本组件 CSS<br>`transition` |
| `--mp-fab-trigger-active-icon-size` | 公开 | `22px` | 本组件 CSS<br>`font-size` |
| `--mp-fab-trigger-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-fab-trigger-inactive-icon-size` | 公开 | `26px` | 本组件 CSS<br>`font-size` |
| `--mp-fab-trigger-size` | 公开 | `56px` | 本组件 CSS<br>`height`, `min-width`, `width` |

</div>

## field-decorator

声明来源: `src/field-decorator/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-field-blur-color` | 公开 | `var(--mp-sys-color-content-tertiary)` | 本组件 CSS<br>`border-bottom`, `color` |
| `--mp-field-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-end-end-radius`, `border-end-start-radius`, `border-radius`, `border-start-end-radius`, `border-start-start-radius` |
| `--mp-field-border-width` | 公开 | `1px` | 本组件 CSS<br>`border`, `border-bottom`, `margin-inline-start`, `min-height`, `outline`, `outline-offset`, `padding-inline-start` |
| `--mp-field-caret-color` | 公开 | `currentColor` | 跨组件 CSS<br>`caret-color` |
| `--mp-field-clear-icon-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-field-clear-icon-size` | 公开 | `var(--mp-field-icon-size)` | 本组件 CSS<br>`font-size` |
| `--mp-field-clear-padding` | 公开 | `4px` | 本组件 CSS<br>`padding` |
| `--mp-field-clear-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-field-clear-visibility` | 公开 | `visible` | 本组件 CSS<br>`visibility` |
| `--mp-field-content-gap` | 公开 | `8px` | 本组件 CSS<br>`gap`, `padding-inline-end`, `padding-inline-start` |
| `--mp-field-content-padding-vertical` | 公开 | `8px` | 本组件 CSS<br>`padding`, `top` |
| `--mp-field-control-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-field-control-text-color-disabled` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`-webkit-text-fill-color`, `color` |
| `--mp-field-error-color` | 公开 | `var(--mp-sys-color-status-danger)` | 本组件 CSS<br>`border-bottom-color`, `border-color`, `color` |
| `--mp-field-focus-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`border-bottom-color`, `color`, `outline` |
| `--mp-field-hint-duration` | 公开 | `0.2s` | 本组件 CSS<br>`transition` |
| `--mp-field-hint-scale` | 公开 | `0.75` | 本组件 CSS<br>`font-size`, `top`, `transform` |
| `--mp-field-hint-space` | 公开 | `4px` | 本组件 CSS<br>`padding`, `padding-inline-start` |
| `--mp-field-icon-size` | 公开 | `20px` | 本组件 CSS<br>`font-size` |
| `--mp-field-line-height` | 公开 | `1.5` | 本组件 CSS<br>`line-height`, `top` |
| `--mp-field-loading-color` | 公开 | `var(--mp-field-focus-color)` | 本组件 CSS<br>`color` |
| `--mp-field-loading-duration` | 公开 | `1s` | 本组件 CSS<br>`animation` |
| `--mp-field-loading-line-size` | 公开 | `2px` | 本组件 CSS<br>`height` |
| `--mp-field-padding-horizontal` | 公开 | `16px` | 本组件 CSS<br>`inset-inline-start`, `margin-inline-end`, `margin-inline-start`, `max-width`, `padding`, `padding-inline-end`, `padding-inline-start`, `width` |
| `--mp-field-placeholder-text-color` | 公开 | `var(--mp-sys-color-content-tertiary)` | 本组件 CSS<br>`color` |
| `--mp-field-prefix-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-field-size-lg-font-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-field-size-lg-height` | 公开 | `56px` | 本组件 CSS<br>`flex`, `height`, `min-height` |
| `--mp-field-size-md-font-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-field-size-md-height` | 公开 | `48px` | 本组件 CSS<br>`flex`, `height`, `min-height` |
| `--mp-field-size-sm-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-field-size-sm-height` | 公开 | `40px` | 本组件 CSS<br>`flex`, `height`, `min-height` |
| `--mp-field-size-xl-font-size` | 公开 | `18px` | 本组件 CSS<br>`font-size` |
| `--mp-field-size-xl-height` | 公开 | `64px` | 本组件 CSS<br>`flex`, `height`, `min-height` |
| `--mp-field-size-xs-font-size` | 公开 | `12px` | 本组件 CSS<br>`font-size` |
| `--mp-field-size-xs-height` | 公开 | `32px` | 本组件 CSS<br>`flex`, `height`, `min-height` |
| `--mp-field-suffix-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-field-variant-filled-background` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background` |
| `--mp-field-variant-filled-background-disabled` | 公开 | `var(--mp-color-fill-2)` | 本组件 CSS<br>`background` |
| `--mp-field-variant-filled-background-error` | 公开 | `var(--mp-color-danger-light-1)` | 本组件 CSS<br>`background` |
| `--mp-field-variant-filled-background-focus` | 公开 | `var(--mp-color-fill-3)` | 本组件 CSS<br>`background` |
| `--mp-field-variant-filled-background-hover` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background` |
| `--mp-field-variant-outline-background` | 公开 | `transparent` | 本组件 CSS<br>`background` |
| `--mp-field-variant-outline-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border`, `border-color` |
| `--mp-field-variant-outline-border-color-disabled` | 公开 | `var(--mp-sys-color-border-subtle)` | 本组件 CSS<br>`border-color` |
| `--mp-field-variant-outline-border-color-error` | 公开 | `var(--mp-sys-color-status-danger)` | 本组件 CSS<br>`border-color` |
| `--mp-field-variant-outline-border-color-focus` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`border-color` |
| `--mp-field-variant-outline-border-color-hover` | 公开 | `color-mix(in srgb, var(--mp-field-variant-outline-border-color) 80%, var(--mp-sys-color-border-strong))` | 本组件 CSS<br>`border-color` |
| `--mp-field-variant-standard-line-color` | 公开 | `var(--mp-field-blur-color)` | 本组件 CSS<br>`border-bottom` |
| `--mp-field-variant-standard-line-color-disabled` | 公开 | `var(--mp-sys-color-border-subtle)` | 本组件 CSS<br>`border-bottom-color` |
| `--mp-field-variant-standard-line-color-error` | 公开 | `var(--mp-field-error-color)` | 本组件 CSS<br>`border-bottom-color` |
| `--mp-field-variant-standard-line-color-focus` | 公开 | `var(--mp-field-focus-color)` | 本组件 CSS<br>`border-bottom-color` |
| `--mp-field-variant-standard-line-size` | 公开 | `1px` | 本组件 CSS<br>`border-bottom` |
| `--mp-field-variant-standard-line-size-focus` | 公开 | `2px` | 本组件 CSS<br>`border-bottom-width` |

</div>

## floating-panel

声明来源: `src/floating-panel/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-floating-panel-background` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background-color`, `box-shadow` |
| `--mp-floating-panel-border-radius` | 公开 | `0` | 本组件 CSS<br>`border-top-left-radius`, `border-top-right-radius` |
| `--mp-floating-panel-border-top` | 公开 | `none` | 本组件 CSS<br>`border-top` |
| `--mp-floating-panel-header-height` | 公开 | `30px` | 本组件 CSS<br>`height` |
| `--mp-floating-panel-toolbar-background` | 公开 | `#ddd` | 本组件 CSS<br>`background` |
| `--mp-floating-panel-toolbar-border-radius` | 公开 | `10px` | 本组件 CSS<br>`border-radius` |
| `--mp-floating-panel-toolbar-height` | 公开 | `3px` | 本组件 CSS<br>`height` |
| `--mp-floating-panel-toolbar-width` | 公开 | `20px` | 本组件 CSS<br>`width` |
| `--mp-floating-panel-transition-timing-function` | 公开 | `cubic-bezier(0.18, 0.89, 0.32, 1.28)` | 运行时引用（不代表可见性证明）<br>`floating-panel/FloatingPanel.vue` |
| `--mp-floating-panel-z-index` | 公开 | `999` | 本组件 CSS<br>`z-index` |

</div>

## form

声明来源: `src/form/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-form-extra-margin-top` | 公开 | `6px` | 本组件 CSS<br>`margin-top` |
| `--mp-form-extra-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-form-extra-text-font-size` | 公开 | `12px` | 本组件 CSS<br>`font-size` |
| `--mp-form-help-line-height` | 公开 | `1.4` | 本组件 CSS<br>`line-height` |
| `--mp-form-item-asterisk-margin` | 公开 | `4px` | 本组件 CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-form-item-label-gap` | 公开 | `12px` | 本组件 CSS<br>`margin-inline-end`, `padding-inline-end` |
| `--mp-form-item-label-width` | 公开 | `88px` | 本组件 CSS<br>`flex`, `width` |
| `--mp-form-label-line-height` | 公开 | `1.4` | 本组件 CSS<br>`line-height` |
| `--mp-form-label-min-height` | 公开 | `24px` | 本组件 CSS<br>`min-height` |
| `--mp-form-label-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-form-required-symbol-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-form-section-accent-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background` |
| `--mp-form-section-after-gap` | 公开 | `24px` | 本组件 CSS<br>`margin-block` |
| `--mp-form-section-before-gap` | 公开 | `32px` | 本组件 CSS<br>`padding-block-start` |
| `--mp-form-section-card-background` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background` |
| `--mp-form-section-card-padding` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-form-section-card-radius` | 公开 | `6px` | 本组件 CSS<br>`border-radius` |
| `--mp-form-section-description-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-form-section-description-gap` | 公开 | `4px` | 本组件 CSS<br>`margin-block-start` |
| `--mp-form-section-description-line-height` | 公开 | `20px` | 本组件 CSS<br>`line-height` |
| `--mp-form-section-description-size` | 公开 | `13px` | 本组件 CSS<br>`font-size` |
| `--mp-form-section-divider-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border`, `border-block-start` |
| `--mp-form-section-divider-width` | 公开 | `1px` | 本组件 CSS<br>`border`, `border-block-start` |
| `--mp-form-section-end-divider-gap` | 公开 | `24px` | 本组件 CSS<br>`margin-block-start` |
| `--mp-form-section-header-gap` | 公开 | `20px` | 本组件 CSS<br>`margin-block-end` |
| `--mp-form-section-heading-gap` | 公开 | `16px` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-form-section-marker-gap` | 公开 | `8px` | 本组件 CSS<br>`margin-inline-end`, `row-gap` |
| `--mp-form-section-marker-height` | 公开 | `16px` | 本组件 CSS<br>`height` |
| `--mp-form-section-marker-radius` | 公开 | `2px` | 本组件 CSS<br>`border-radius` |
| `--mp-form-section-marker-width` | 公开 | `3px` | 本组件 CSS<br>`width` |
| `--mp-form-section-title-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-form-section-title-line-height` | 公开 | `24px` | 本组件 CSS<br>`line-height` |
| `--mp-form-section-title-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-form-section-title-weight` | 公开 | `600` | 本组件 CSS<br>`font-weight` |
| `--mp-form-size-md-item-margin-bottom` | 公开 | `16px` | 本组件 CSS<br>`margin-bottom` |
| `--mp-form-size-md-label-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-form-tooltip-margin-left` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`padding-inline-start` |
| `--mp-form-tooltip-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-form-vertical-label-margin-bottom` | 公开 | `8px` | 本组件 CSS<br>`margin-bottom` |

</div>

## form-details

声明来源: `src/form-details/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-form-details-error-message-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-form-details-extra-message-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-form-details-font-size` | 公开 | `12px` | 本组件 CSS<br>`font-size` |
| `--mp-form-details-margin-top` | 公开 | `6px` | 本组件 CSS<br>`margin-top` |
| `--mp-form-details-message-margin-right` | 公开 | `4px` | 本组件 CSS<br>`margin-inline-end` |

</div>

## hover

声明来源: `src/hover/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-hover-overlay-focusing-opacity` | 公开 | `0.12` | 本组件 CSS<br>`opacity` |
| `--mp-hover-overlay-opacity` | 公开 | `0.04` | 本组件 CSS<br>`opacity` |
| `--mp-hover-transition-duration` | 公开 | `var(--mp-sys-motion-duration-fast)` | 本组件 CSS<br>`transition` |

</div>

## icon

声明来源: `src/icon/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-icon-size` | 公开 | `inherit` | 本组件 CSS<br>`font-size` |
| `--mp-icon-spin-duration` | 公开 | `1s` | 本组件 CSS<br>`animation` |

</div>

## image

声明来源: `src/image/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-image-preview-arrow-background` | 公开 | `rgb(38 38 0.41304348%)` | 本组件 CSS<br>`background-color` |
| `--mp-image-preview-arrow-background-hover` | 公开 | `rgb(56 56 0.58333333%)` | 本组件 CSS<br>`background-color` |
| `--mp-image-preview-arrow-color` | 公开 | `#fff` | 本组件 CSS<br>`color` |
| `--mp-image-preview-close-icon-right` | 公开 | `14px` | 本组件 CSS<br>`inset-inline-end` |
| `--mp-image-preview-close-icon-top` | 公开 | `14px` | 本组件 CSS<br>`top` |
| `--mp-image-preview-swipe-indicators-padding` | 公开 | `16px 0` | 本组件 CSS<br>`padding` |
| `--mp-image-preview-swipe-indicators-text-color` | 公开 | `#ddd` | 本组件 CSS<br>`color` |
| `--mp-image-preview-zoom-container-background` | 公开 | `#000` | 跨组件 CSS<br>`background-color` |

</div>

## index-bar

声明来源: `src/index-bar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-index-bar-list-bottom` | 公开 | `auto` | 本组件 CSS<br>`bottom` |
| `--mp-index-bar-list-item-active-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-index-bar-list-item-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-index-bar-list-item-font-size` | 公开 | `var(--mp-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-index-bar-list-item-height` | 公开 | `14px` | 本组件 CSS<br>`height` |
| `--mp-index-bar-list-item-padding` | 公开 | `0 10px` | 本组件 CSS<br>`padding` |
| `--mp-index-bar-list-left` | 公开 | `auto` | 本组件 CSS<br>`inset-inline-start` |
| `--mp-index-bar-list-right` | 公开 | `0` | 本组件 CSS<br>`inset-inline-end` |
| `--mp-index-bar-list-top` | 公开 | `50%` | 本组件 CSS<br>`top` |
| `--mp-index-bar-list-transform` | 公开 | `translate(0, -50%)` | 本组件 CSS<br>`transform` |

</div>

## infinite-scroll

声明来源: `src/infinite-scroll/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-infinite-scroll-error-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-infinite-scroll-loading-gap` | 公开 | `8px` | 本组件 CSS<br>`gap` |
| `--mp-infinite-scroll-status-color` | 公开 | `var(--mp-color-text-3)` | 本组件 CSS<br>`color` |
| `--mp-infinite-scroll-status-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-infinite-scroll-status-min-height` | 公开 | `50px` | 本组件 CSS<br>`min-height` |
| `--mp-infinite-scroll-status-padding` | 公开 | `12px 0` | 本组件 CSS<br>`padding` |

</div>

## input

声明来源: `src/input/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-input-caret-color` | 公开 | `var(--mp-field-caret-color)` | 本组件 CSS<br>`caret-color` |
| `--mp-input-control-font-size` | 公开 | `inherit` | 本组件 CSS<br>`font-size` |
| `--mp-input-control-height` | 公开 | `auto` | 本组件 CSS<br>`height` |
| `--mp-input-control-line-height` | 公开 | `inherit` | 本组件 CSS<br>`line-height` |
| `--mp-input-control-padding-horizontal` | 公开 | `0` | 本组件 CSS<br>`padding` |
| `--mp-input-counter-color` | 公开 | `var(--mp-field-suffix-text-color)` | 本组件 CSS<br>`color` |
| `--mp-input-counter-font-size` | 公开 | `12px` | 本组件 CSS<br>`font-size` |
| `--mp-input-feedback-duration` | 公开 | `1s` | 本组件 CSS<br>`animation` |
| `--mp-input-feedback-error-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-input-feedback-success-color` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-input-feedback-validating-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-input-feedback-warning-color` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |

</div>

## input-number

声明来源: `src/input-number/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-input-number-addon-background` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background` |
| `--mp-input-number-addon-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border` |
| `--mp-input-number-addon-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-input-number-border-radius` | 公开 | `var(--mp-field-border-radius)` | 本组件 CSS<br>`border-end-end-radius`, `border-end-start-radius`, `border-start-end-radius`, `border-start-start-radius` |
| `--mp-input-number-border-width` | 公开 | `1px` | 本组件 CSS<br>`border`, `border-inline-end`, `border-inline-start`, `border-top`, `outline`, `outline-offset` |
| `--mp-input-number-caret-color` | 公开 | `var(--mp-field-caret-color)` | 本组件 CSS<br>`caret-color` |
| `--mp-input-number-size-lg-step-button-width` | 公开 | `var(--mp-sys-control-height-lg)` | 本组件 CSS<br>`width` |
| `--mp-input-number-size-md-step-button-width` | 公开 | `var(--mp-sys-control-height-md)` | 本组件 CSS<br>`width` |
| `--mp-input-number-size-sm-step-button-width` | 公开 | `var(--mp-sys-control-height-sm)` | 本组件 CSS<br>`width` |
| `--mp-input-number-size-xl-step-button-width` | 公开 | `var(--mp-sys-control-height-xl)` | 本组件 CSS<br>`width` |
| `--mp-input-number-size-xs-step-button-width` | 公开 | `var(--mp-sys-control-height-xs)` | 本组件 CSS<br>`width` |
| `--mp-input-number-step-button-active-background` | 公开 | `var(--mp-sys-color-state-selected)` | 本组件 CSS<br>`background` |
| `--mp-input-number-step-button-background` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background` |
| `--mp-input-number-step-button-border-color` | 公开 | `var(--mp-sys-color-border-subtle)` | 本组件 CSS<br>`border-inline-end`, `border-inline-start`, `border-top` |
| `--mp-input-number-step-button-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-input-number-step-button-disabled-color` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-input-number-step-button-hover-background` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background` |
| `--mp-input-number-step-button-icon-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-input-number-step-button-transition-duration` | 公开 | `0.2s` | 本组件 CSS<br>`transition` |
| `--mp-input-number-step-button-width` | 公开 | `var(--mp-sys-control-height-md)` | 本组件 CSS<br>`width` |

</div>

## input-tag

声明来源: `src/input-tag/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-input-tag-color-text-default` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-input-tag-color-text-disabled` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-input-tag-padding-x` | 公开 | `4px` | 本组件 CSS<br>`padding-inline-end`, `padding-inline-start` |
| `--mp-input-tag-size-lg-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-input-tag-size-lg-padding-y` | 公开 | `2px` | 本组件 CSS<br>`padding-bottom`, `padding-top` |
| `--mp-input-tag-size-lg-tag-height` | 公开 | `28px` | 本组件 CSS<br>`line-height`, `max-height`, `min-height` |
| `--mp-input-tag-size-md-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-input-tag-size-md-padding-y` | 公开 | `2px` | 本组件 CSS<br>`padding-bottom`, `padding-top` |
| `--mp-input-tag-size-md-tag-height` | 公开 | `24px` | 本组件 CSS<br>`line-height`, `max-height`, `min-height` |
| `--mp-input-tag-size-sm-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-input-tag-size-sm-padding-y` | 公开 | `2px` | 本组件 CSS<br>`padding-bottom`, `padding-top` |
| `--mp-input-tag-size-sm-tag-height` | 公开 | `20px` | 本组件 CSS<br>`line-height`, `max-height`, `min-height` |
| `--mp-input-tag-size-xl-font-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-input-tag-size-xl-padding-y` | 公开 | `4px` | 本组件 CSS<br>`padding-bottom`, `padding-top` |
| `--mp-input-tag-size-xl-tag-height` | 公开 | `32px` | 本组件 CSS<br>`line-height`, `max-height`, `min-height` |
| `--mp-input-tag-size-xs-font-size` | 公开 | `12px` | 本组件 CSS<br>`font-size` |
| `--mp-input-tag-size-xs-padding-y` | 公开 | `0px` | 本组件 CSS<br>`padding-bottom`, `padding-top` |
| `--mp-input-tag-size-xs-tag-height` | 公开 | `20px` | 本组件 CSS<br>`line-height`, `max-height`, `min-height` |
| `--mp-input-tag-tag-color-bg` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background-color` |
| `--mp-input-tag-tag-color-bg-disabled` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background-color` |
| `--mp-input-tag-tag-color-bg-focus` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background-color` |
| `--mp-input-tag-tag-color-border` | 公开 | `var(--mp-color-fill-3)` | 本组件 CSS<br>`border-color` |
| `--mp-input-tag-tag-color-border-disabled` | 公开 | `var(--mp-color-fill-3)` | 本组件 CSS<br>`border-color` |
| `--mp-input-tag-tag-color-border-focus` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`border-color` |
| `--mp-input-tag-tag-font-size` | 公开 | `12px` | 本组件 CSS<br>`font-size` |
| `--mp-input-tag-tag-margin-right` | 公开 | `4px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-input-tag-tag-margin-y` | 公开 | `2px` | 本组件 CSS<br>`margin-bottom`, `margin-top`, `max-height` |

</div>

## link

声明来源: `src/link/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-link-bg-active` | 公开 | `var(--mp-color-fill-3)` | 本组件 CSS<br>`background-color` |
| `--mp-link-bg-hover` | 公开 | `var(--mp-color-fill-2)` | 本组件 CSS<br>`background-color` |
| `--mp-link-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-link-danger-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-link-default-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-link-disabled-color` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-link-focus-color` | 公开 | `currentColor` | 本组件 CSS<br>`outline` |
| `--mp-link-focus-offset` | 公开 | `2px` | 本组件 CSS<br>`outline-offset` |
| `--mp-link-focus-opacity` | 公开 | `0.8` | 本组件 CSS<br>`opacity` |
| `--mp-link-focus-width` | 公开 | `2px` | 本组件 CSS<br>`outline` |
| `--mp-link-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-link-icon-size` | 公开 | `1em` | 本组件 CSS<br>`font-size` |
| `--mp-link-info-color` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-link-line-height` | 公开 | `1.5` | 本组件 CSS<br>`line-height` |
| `--mp-link-margin-icon-right` | 公开 | `0.25em` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-link-padding-horizontal` | 公开 | `0.25em` | 本组件 CSS<br>`padding` |
| `--mp-link-padding-vertical` | 公开 | `1px` | 本组件 CSS<br>`padding` |
| `--mp-link-primary-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-link-secondary-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-link-size-icon` | 公开 | `var(--mp-link-icon-size)` | 本组件 CSS<br>`font-size` |
| `--mp-link-size-lg-font-size` | 公开 | `var(--mp-sys-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-link-size-md-font-size` | 公开 | `var(--mp-link-font-size)` | 本组件 CSS<br>`font-size` |
| `--mp-link-size-sm-font-size` | 公开 | `var(--mp-sys-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-link-size-xl-font-size` | 公开 | `var(--mp-sys-font-size-xl)` | 本组件 CSS<br>`font-size` |
| `--mp-link-size-xs-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-link-spin-duration` | 公开 | `1s` | 本组件 CSS<br>`animation` |
| `--mp-link-success-color` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-link-tertiary-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color` | 公开 | `var(--mp-link-primary-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-active` | 公开 | `var(--mp-link-text-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-default` | 公开 | `var(--mp-link-default-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-disabled` | 公开 | `var(--mp-link-disabled-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-error` | 公开 | `var(--mp-link-danger-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-error-active` | 公开 | `var(--mp-link-text-color-error)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-error-disabled` | 公开 | `var(--mp-link-disabled-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-error-hover` | 公开 | `var(--mp-link-text-color-error)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-error-loading` | 公开 | `var(--mp-link-disabled-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-hover` | 公开 | `var(--mp-link-text-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-info` | 公开 | `var(--mp-link-info-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-loading` | 公开 | `var(--mp-link-disabled-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-primary` | 公开 | `var(--mp-link-primary-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-secondary` | 公开 | `var(--mp-link-secondary-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-success` | 公开 | `var(--mp-link-success-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-success-active` | 公开 | `var(--mp-link-text-color-success)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-success-disabled` | 公开 | `var(--mp-link-disabled-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-success-hover` | 公开 | `var(--mp-link-text-color-success)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-success-loading` | 公开 | `var(--mp-link-disabled-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-tertiary` | 公开 | `var(--mp-link-tertiary-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-warning` | 公开 | `var(--mp-link-warning-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-warning-active` | 公开 | `var(--mp-link-text-color-warning)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-warning-disabled` | 公开 | `var(--mp-link-disabled-color)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-warning-hover` | 公开 | `var(--mp-link-text-color-warning)` | 本组件 CSS<br>`color` |
| `--mp-link-text-color-warning-loading` | 公开 | `var(--mp-link-disabled-color)` | 本组件 CSS<br>`color` |
| `--mp-link-transition-duration` | 公开 | `0.15s` | 本组件 CSS<br>`transition` |
| `--mp-link-warning-color` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |

</div>

## list

声明来源: `src/list/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-list-background` | 公开 | `var(--mp-color-bg-1)` | 本组件 CSS<br>`background` |
| `--mp-list-border-color` | 公开 | `var(--mp-color-border-2)` | 本组件 CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-list-border-radius` | 公开 | `4px` | 本组件 CSS<br>`border-radius` |
| `--mp-list-border-width` | 公开 | `1px` | 本组件 CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-list-empty-color` | 公开 | `var(--mp-color-text-3)` | 本组件 CSS<br>`color` |
| `--mp-list-empty-padding` | 公开 | `24px 16px` | 本组件 CSS<br>`padding` |
| `--mp-list-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-list-font-size-header` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-list-font-weight-header` | 公开 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-list-item-prefix-margin-right` | 公开 | `12px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-list-item-suffix-margin-left` | 公开 | `12px` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-list-line-height` | 公开 | `1.5` | 本组件 CSS<br>`line-height` |
| `--mp-list-line-height-header` | 公开 | `1.5` | 本组件 CSS<br>`line-height` |
| `--mp-list-loading-padding` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-lg-padding-horizontal-footer` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-lg-padding-horizontal-header` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-lg-padding-horizontal-item` | 公开 | `20px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-lg-padding-vertical-footer` | 公开 | `12px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-lg-padding-vertical-header` | 公开 | `12px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-lg-padding-vertical-item` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-md-padding-horizontal-footer` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-md-padding-horizontal-header` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-md-padding-horizontal-item` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-md-padding-vertical-footer` | 公开 | `12px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-md-padding-vertical-header` | 公开 | `12px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-md-padding-vertical-item` | 公开 | `12px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-sm-padding-horizontal-footer` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-sm-padding-horizontal-header` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-sm-padding-horizontal-item` | 公开 | `12px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-sm-padding-vertical-footer` | 公开 | `12px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-sm-padding-vertical-header` | 公开 | `12px` | 本组件 CSS<br>`padding` |
| `--mp-list-size-sm-padding-vertical-item` | 公开 | `8px` | 本组件 CSS<br>`padding` |
| `--mp-list-text-color` | 公开 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |
| `--mp-list-text-color-header` | 公开 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |

</div>

## loading

声明来源: `src/loading/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-loading-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color`, `color` |
| `--mp-loading-desc-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-loading-desc-margin` | 公开 | `8px 0 0` | 本组件 CSS<br>`margin` |
| `--mp-loading-directive-z-index` | 公开 | `2000` | 本组件 CSS<br>`z-index` |
| `--mp-loading-indicator-size` | 公开 | `20px` | 本组件 CSS<br>`font-size` |
| `--mp-loading-opacity` | 公开 | `0.38` | 本组件 CSS<br>`opacity` |
| `--mp-loading-overlay-background` | 公开 | `color-mix(in srgb, var(--mp-color-bg-white) 62%, transparent)` | 本组件 CSS<br>`background` |

</div>

## loading-bar

声明来源: `src/loading-bar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-loading-bar-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color` |
| `--mp-loading-bar-error-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`background-color` |
| `--mp-loading-bar-height` | 公开 | `3px` | 本组件 CSS<br>`height` |
| `--mp-loading-bar-transition-duration` | 公开 | `250ms` | 本组件 CSS<br>`transition` |
| `--mp-loading-bar-transition-timing-function` | 公开 | `ease` | 本组件 CSS<br>`transition` |

</div>

## mention

声明来源: `src/mention/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-mention-token-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |

</div>

## menu

声明来源: `src/menu/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-menu-background-color` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background-color` |
| `--mp-menu-border-color` | 公开 | `var(--mp-color-fill-3)` | 本组件 CSS<br>`background-color`, `border`, `border-top` |
| `--mp-menu-border-radius` | 公开 | `2px` | 本组件 CSS<br>`border-radius` |
| `--mp-menu-group-title-font-size` | 公开 | `var(--mp-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-menu-group-title-height` | 公开 | `20px` | 本组件 CSS<br>`line-height` |
| `--mp-menu-group-title-padding` | 公开 | `4px 12px` | 本组件 CSS<br>`padding` |
| `--mp-menu-group-title-text-color` | 公开 | `var(--mp-color-text-3)` | 本组件 CSS<br>`color` |
| `--mp-menu-max-height` | 公开 | `278px` | 本组件 CSS<br>`max-height` |
| `--mp-menu-option-arrow-icon-size` | 公开 | `18px` | 本组件 CSS<br>`font-size` |
| `--mp-menu-option-arrow-padding` | 公开 | `0 6px 0 8px` | 本组件 CSS<br>`padding` |
| `--mp-menu-option-bg-disabled` | 公开 | `transparent` | 本组件 CSS<br>`background` |
| `--mp-menu-option-bg-hover` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background-color` |
| `--mp-menu-option-bg-selected-hover` | 公开 | `var(--mp-menu-option-selected-background)` | 本组件 CSS<br>`background-color` |
| `--mp-menu-option-disabled-color` | 公开 | `var(--mp-color-text-disabled)` | 本组件 CSS<br>`color` |
| `--mp-menu-option-icon-margin-right` | 公开 | `8px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-menu-option-lg-font-size` | 公开 | `var(--mp-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-menu-option-lg-height` | 公开 | `46px` | 本组件 CSS<br>`height` |
| `--mp-menu-option-md-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-menu-option-md-height` | 公开 | `38px` | 本组件 CSS<br>`height` |
| `--mp-menu-option-padding` | 公开 | `0 12px` | 本组件 CSS<br>`padding` |
| `--mp-menu-option-selected-background` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background-color` |
| `--mp-menu-option-selected-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-menu-option-sm-font-size` | 公开 | `var(--mp-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-menu-option-sm-height` | 公开 | `30px` | 本组件 CSS<br>`height` |
| `--mp-menu-option-suffix-margin-left` | 公开 | `16px` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-menu-option-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-menu-option-xl-font-size` | 公开 | `var(--mp-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-menu-option-xl-height` | 公开 | `54px` | 本组件 CSS<br>`height` |
| `--mp-menu-option-xs-font-size` | 公开 | `var(--mp-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-menu-option-xs-height` | 公开 | `24px` | 本组件 CSS<br>`height` |
| `--mp-menu-padding` | 公开 | `4px 0` | 本组件 CSS<br>`margin`, `padding` |
| `--mp-menu-padding-vertical` | 公开 | `4px` | 本组件 CSS<br>`margin-top` |

</div>

## message

声明来源: `src/message/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-message-action-margin` | 公开 | `0 8px` | 本组件 CSS<br>`margin` |
| `--mp-message-border-radius` | 公开 | `4px` | 本组件 CSS<br>`border-radius` |
| `--mp-message-box-shadow` | 公开 | `0 4px 12px rgba(0, 0, 0, 0.2)` | 本组件 CSS<br>`box-shadow` |
| `--mp-message-close-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-message-close-margin-right` | 公开 | `4px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-message-close-size` | 公开 | `32px` | 本组件 CSS<br>`height`, `width` |
| `--mp-message-content-padding` | 公开 | `14px 16px` | 本组件 CSS<br>`padding` |
| `--mp-message-focus-outline-offset` | 公开 | `-4px` | 本组件 CSS<br>`outline-offset` |
| `--mp-message-focus-outline-width` | 公开 | `2px` | 本组件 CSS<br>`outline` |
| `--mp-message-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-message-icon-font-size` | 公开 | `20px` | 本组件 CSS<br>`font-size` |
| `--mp-message-icon-margin` | 公开 | `0 8px` | 本组件 CSS<br>`margin` |
| `--mp-message-margin` | 公开 | `6px 24px` | 本组件 CSS<br>`margin` |
| `--mp-message-neutral-danger-bg` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background-color` |
| `--mp-message-neutral-danger-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-color` |
| `--mp-message-neutral-danger-close-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-danger-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-danger-icon-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-default-bg` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background-color` |
| `--mp-message-neutral-default-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-color` |
| `--mp-message-neutral-default-close-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-default-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-default-icon-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-info-bg` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background-color` |
| `--mp-message-neutral-info-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-color` |
| `--mp-message-neutral-info-close-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-info-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-info-icon-color` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-loading-bg` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background-color` |
| `--mp-message-neutral-loading-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-color` |
| `--mp-message-neutral-loading-close-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-loading-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-loading-icon-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-success-bg` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background-color` |
| `--mp-message-neutral-success-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-color` |
| `--mp-message-neutral-success-close-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-success-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-success-icon-color` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-warning-bg` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background-color` |
| `--mp-message-neutral-warning-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-color` |
| `--mp-message-neutral-warning-close-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-warning-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-neutral-warning-icon-color` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-danger-bg` | 公开 | `var(--mp-sys-color-status-danger)` | 本组件 CSS<br>`background-color` |
| `--mp-message-solid-danger-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-solid-danger-close-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-danger-content-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-danger-icon-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-default-bg` | 公开 | `#333` | 本组件 CSS<br>`background-color` |
| `--mp-message-solid-default-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-solid-default-close-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-default-content-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-default-icon-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-info-bg` | 公开 | `var(--mp-sys-color-status-info)` | 本组件 CSS<br>`background-color` |
| `--mp-message-solid-info-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-solid-info-close-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-info-content-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-info-icon-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-loading-bg` | 公开 | `#333` | 本组件 CSS<br>`background-color` |
| `--mp-message-solid-loading-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-solid-loading-close-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-loading-content-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-loading-icon-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-success-bg` | 公开 | `var(--mp-sys-color-status-success)` | 本组件 CSS<br>`background-color` |
| `--mp-message-solid-success-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-solid-success-close-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-success-content-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-success-icon-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-warning-bg` | 公开 | `var(--mp-sys-color-status-warning)` | 本组件 CSS<br>`background-color` |
| `--mp-message-solid-warning-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-solid-warning-close-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-warning-content-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-solid-warning-icon-color` | 公开 | `var(--mp-sys-color-content-on-bright)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-danger-bg` | 公开 | `var(--mp-color-danger-light-1)` | 本组件 CSS<br>`background-color` |
| `--mp-message-tonal-danger-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-tonal-danger-close-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-danger-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-danger-icon-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-default-bg` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background-color` |
| `--mp-message-tonal-default-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-tonal-default-close-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-default-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-default-icon-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-info-bg` | 公开 | `rgba(var(--mp-blue-6), 0.12)` | 本组件 CSS<br>`background-color` |
| `--mp-message-tonal-info-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-tonal-info-close-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-info-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-info-icon-color` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-loading-bg` | 公开 | `var(--mp-color-primary-light-1)` | 本组件 CSS<br>`background-color` |
| `--mp-message-tonal-loading-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-tonal-loading-close-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-loading-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-loading-icon-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-success-bg` | 公开 | `var(--mp-color-success-light-1)` | 本组件 CSS<br>`background-color` |
| `--mp-message-tonal-success-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-tonal-success-close-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-success-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-success-icon-color` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-warning-bg` | 公开 | `var(--mp-color-warning-light-1)` | 本组件 CSS<br>`background-color` |
| `--mp-message-tonal-warning-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-message-tonal-warning-close-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-warning-content-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-message-tonal-warning-icon-color` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-message-transition-distance` | 公开 | `-12px` | 本组件 CSS<br>`transform` |
| `--mp-message-transition-duration` | 公开 | `150ms` | 本组件 CSS<br>`transition` |
| `--mp-message-transition-timing-function` | 公开 | `var(--mp-cubic-bezier)` | 本组件 CSS<br>`transition` |
| `--mp-message-viewport-padding` | 公开 | `24px` | 本组件 CSS<br>`max-width` |
| `--mp-message-width` | 公开 | `256px` | 本组件 CSS<br>`width` |
| `--mp-message-wrapper-margin-bottom` | 公开 | `5%` | 本组件 CSS<br>`bottom` |
| `--mp-message-wrapper-margin-top` | 公开 | `5%` | 本组件 CSS<br>`top` |
| `--mp-message-z-index` | 公开 | `2000` | 本组件 CSS<br>`z-index` |

</div>

## nav-menu

声明来源: `src/nav-menu/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-nav-menu-active-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color`, `outline` |
| `--mp-nav-menu-arrow-size` | 公开 | `6px` | 本组件 CSS<br>`height`, `width` |
| `--mp-nav-menu-background` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background` |
| `--mp-nav-menu-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-top` |
| `--mp-nav-menu-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-nav-menu-disabled-color` | 公开 | `var(--mp-color-text-disabled)` | 本组件 CSS<br>`color` |
| `--mp-nav-menu-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-nav-menu-gap` | 公开 | `8px` | 本组件 CSS<br>`gap` |
| `--mp-nav-menu-height` | 公开 | `48px` | 本组件 CSS<br>`min-height` |
| `--mp-nav-menu-padding` | 公开 | `12px 16px` | 本组件 CSS<br>`padding` |
| `--mp-nav-menu-panel-padding` | 公开 | `12px` | 本组件 CSS<br>`padding`, `padding-bottom` |
| `--mp-nav-menu-size-lg-height` | 公开 | `56px` | 本组件 CSS<br>`min-height` |
| `--mp-nav-menu-size-sm-height` | 公开 | `40px` | 本组件 CSS<br>`min-height` |
| `--mp-nav-menu-size-xl-height` | 公开 | `64px` | 本组件 CSS<br>`min-height` |
| `--mp-nav-menu-size-xs-height` | 公开 | `32px` | 本组件 CSS<br>`min-height` |
| `--mp-nav-menu-transition-duration` | 公开 | `200ms` | 本组件 CSS<br>`transition` |

</div>

## notice-bar

声明来源: `src/notice-bar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-notice-bar-close-margin` | 公开 | `0 0 0 8px` | 本组件 CSS<br>`margin` |
| `--mp-notice-bar-close-margin-rtl` | 公开 | `0 8px 0 0` | 本组件 CSS<br>`margin` |
| `--mp-notice-bar-danger-background` | 公开 | `var(--mp-color-danger)` | 本组件 CSS<br>`background` |
| `--mp-notice-bar-danger-color` | 公开 | `var(--mp-color-white)` | 本组件 CSS<br>`color` |
| `--mp-notice-bar-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-notice-bar-height` | 公开 | `40px` | 本组件 CSS<br>`min-height` |
| `--mp-notice-bar-icon-margin` | 公开 | `0 8px 0 0` | 本组件 CSS<br>`margin` |
| `--mp-notice-bar-icon-margin-rtl` | 公开 | `0 0 0 8px` | 本组件 CSS<br>`margin` |
| `--mp-notice-bar-icon-size` | 公开 | `18px` | 本组件 CSS<br>`font-size` |
| `--mp-notice-bar-info-background` | 公开 | `var(--mp-color-info)` | 本组件 CSS<br>`background` |
| `--mp-notice-bar-info-color` | 公开 | `var(--mp-color-white)` | 本组件 CSS<br>`color` |
| `--mp-notice-bar-padding` | 公开 | `0 12px` | 本组件 CSS<br>`padding` |
| `--mp-notice-bar-success-background` | 公开 | `var(--mp-color-success)` | 本组件 CSS<br>`background` |
| `--mp-notice-bar-success-color` | 公开 | `var(--mp-color-white)` | 本组件 CSS<br>`color` |
| `--mp-notice-bar-warning-background` | 公开 | `var(--mp-color-warning)` | 本组件 CSS<br>`background` |
| `--mp-notice-bar-warning-color` | 公开 | `var(--mp-color-white)` | 本组件 CSS<br>`color` |

</div>

## number-keyboard

声明来源: `src/number-keyboard/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-number-keyboard-background` | 公开 | `var(--mp-color-bg-1)` | 本组件 CSS<br>`background` |
| `--mp-number-keyboard-close-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-number-keyboard-close-font-size` | 公开 | `var(--mp-font-size-lg, 16px)` | 本组件 CSS<br>`font-size` |
| `--mp-number-keyboard-delete-icon-size` | 公开 | `22px` | 本组件 CSS<br>`font-size` |
| `--mp-number-keyboard-header-color` | 公开 | `var(--mp-color-text-3)` | 本组件 CSS<br>`color` |
| `--mp-number-keyboard-header-font-size` | 公开 | `var(--mp-font-size-md, 14px)` | 本组件 CSS<br>`font-size` |
| `--mp-number-keyboard-header-height` | 公开 | `34px` | 本组件 CSS<br>`height` |
| `--mp-number-keyboard-key-active-color` | 公开 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |
| `--mp-number-keyboard-key-background` | 公开 | `var(--mp-color-fill-3)` | 本组件 CSS<br>`background` |
| `--mp-number-keyboard-key-color` | 公开 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |
| `--mp-number-keyboard-key-font-size` | 公开 | `22px` | 本组件 CSS<br>`font-size` |
| `--mp-number-keyboard-key-gap` | 公开 | `6px` | 本组件 CSS<br>`gap` |
| `--mp-number-keyboard-key-height` | 公开 | `48px` | 本组件 CSS<br>`height`, `min-height` |
| `--mp-number-keyboard-padding` | 公开 | `6px` | 本组件 CSS<br>`padding` |
| `--mp-number-keyboard-sidebar-width` | 公开 | `25%` | 本组件 CSS<br>`width` |

</div>

## overlay

声明来源: `src/overlay/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-overlay-animation-duration` | 公开 | `var(--mp-sys-motion-duration-slow)` | 本组件 CSS<br>`transition` |
| `--mp-overlay-background-color` | 公开 | `var(--mp-sys-color-scrim)` | 本组件 CSS<br>`background-color` |
| `--mp-overlay-content-z-index` | 公开 | `var(--mp-sys-layer-raised)` | 本组件 CSS<br>`z-index` |

</div>

## page-header

声明来源: `src/page-header/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-page-header-back-color` | 公开 | `var(--mp-color-text-2)` | 本组件 CSS<br>`color` |
| `--mp-page-header-back-hover-bg` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background` |
| `--mp-page-header-back-hover-size` | 公开 | `30px` | 本组件 CSS<br>`height`, `width` |
| `--mp-page-header-back-size` | 公开 | `22px` | 本组件 CSS<br>`font-size` |
| `--mp-page-header-content-margin-top` | 公开 | `16px` | 本组件 CSS<br>`margin-top` |
| `--mp-page-header-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-page-header-footer-margin-top` | 公开 | `16px` | 本组件 CSS<br>`margin-top` |
| `--mp-page-header-item-gap` | 公开 | `12px` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-page-header-row-gap` | 公开 | `12px` | 本组件 CSS<br>`margin-bottom` |
| `--mp-page-header-subtitle-color` | 公开 | `var(--mp-color-text-3)` | 本组件 CSS<br>`color` |
| `--mp-page-header-title-color` | 公开 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |
| `--mp-page-header-title-font-size` | 公开 | `var(--mp-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-page-header-title-font-weight` | 公开 | `600` | 本组件 CSS<br>`font-weight` |

</div>

## pagination

声明来源: `src/pagination/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-pagination-active-background` | 公开 | `var(--mp-color-primary-light-1)` | 本组件 CSS<br>`background` |
| `--mp-pagination-active-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-pagination-disabled-background` | 公开 | `var(--mp-color-fill-1)` | 本组件 CSS<br>`background` |
| `--mp-pagination-disabled-color` | 公开 | `var(--mp-color-text-disabled)` | 本组件 CSS<br>`color` |
| `--mp-pagination-focus-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`outline` |
| `--mp-pagination-focus-offset` | 公开 | `1px` | 本组件 CSS<br>`outline-offset` |
| `--mp-pagination-focus-space` | 公开 | `3px` | 本组件 CSS<br>`padding` |
| `--mp-pagination-focus-width` | 公开 | `2px` | 本组件 CSS<br>`outline` |
| `--mp-pagination-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-pagination-gap` | 公开 | `var(--mp-sys-space-5)` | 本组件 CSS<br>`gap` |
| `--mp-pagination-hover-background` | 公开 | `var(--mp-color-fill-1)` | 本组件 CSS<br>`background` |
| `--mp-pagination-icon-size` | 公开 | `16px` | 本组件 CSS<br>`height`, `width` |
| `--mp-pagination-input-width` | 公开 | `32px` | 本组件 CSS<br>`width` |
| `--mp-pagination-item-background` | 公开 | `transparent` | 本组件 CSS<br>`background` |
| `--mp-pagination-item-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-pagination-item-gap` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`gap`, `padding-inline-start` |
| `--mp-pagination-item-padding` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`padding` |
| `--mp-pagination-select-width` | 公开 | `max-content` | 本组件 CSS<br>`width` |
| `--mp-pagination-size-lg` | 公开 | `44px` | 本组件 CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-md` | 公开 | `36px` | 本组件 CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-sm` | 公开 | `28px` | 本组件 CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-xl` | 公开 | `52px` | 本组件 CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-xs` | 公开 | `24px` | 本组件 CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-text-color` | 公开 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |
| `--mp-pagination-touch-size` | 公开 | `44px` | 本组件 CSS<br>`min-height` |

</div>

## paper

声明来源: `src/paper/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-paper-background` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background` |
| `--mp-paper-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border` |
| `--mp-paper-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-paper-border-width` | 公开 | `1px` | 本组件 CSS<br>`border` |
| `--mp-paper-transition-duration` | 公开 | `var(--mp-sys-motion-duration-slow)` | 本组件 CSS<br>`transition` |

</div>

## people-select

声明来源: `src/people-select/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-people-select-avatar-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-people-select-avatar-size` | 公开 | `24px` | 本组件 CSS<br>`height`, `width` |
| `--mp-people-select-content-gap` | 公开 | `8px` | 本组件 CSS<br>`gap` |

</div>

## picker

声明来源: `src/picker/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-picker-background` | 公开 | `var(--mp-color-body)` | 本组件 CSS<br>`background`, `background-image` |
| `--mp-picker-mask-background-image` | 公开 | `linear-gradient(180deg, color-mix(in srgb, var(--mp-picker-background) 90%, transparent), color-mix(in srgb, var(--mp-picker-background) 40%, transparent)),     linear-gradient(       0deg,       color-mix(in srgb, var(--mp-picker-background) 90%, transparent),       color-mix(in srgb, var(--mp-picker-background) 40%, transparent)     )` | 本组件 CSS<br>`background-image` |
| `--mp-picker-option-active-text-color` | 公开 | `var(--mp-picker-option-text-color)` | 本组件 CSS<br>`color` |
| `--mp-picker-option-check-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-picker-option-check-right` | 公开 | `12px` | 本组件 CSS<br>`inset-inline-end` |
| `--mp-picker-option-check-size` | 公开 | `18px` | 本组件 CSS<br>`font-size` |
| `--mp-picker-option-disabled-opacity` | 公开 | `0.5` | 本组件 CSS<br>`opacity` |
| `--mp-picker-option-disabled-text-color` | 公开 | `var(--mp-color-text-disabled)` | 本组件 CSS<br>`color` |
| `--mp-picker-option-font-size` | 公开 | `var(--mp-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-picker-option-padding-horizontal` | 公开 | `28px` | 本组件 CSS<br>`padding` |
| `--mp-picker-option-text-color` | 公开 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |
| `--mp-picker-picked-border` | 公开 | `1px solid var(--mp-color-border-2)` | 本组件 CSS<br>`border-bottom`, `border-top` |
| `--mp-picker-scroll-easing` | 公开 | `cubic-bezier(0.23, 1, 0.68, 1)` | 本组件 CSS<br>`transition-timing-function` |
| `--mp-picker-title-font-size` | 公开 | `var(--mp-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-picker-title-text-color` | 公开 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |
| `--mp-picker-toolbar-height` | 公开 | `44px` | 本组件 CSS<br>`height` |
| `--mp-picker-toolbar-padding` | 公开 | `0 4px` | 本组件 CSS<br>`padding` |
| `--mp-picker-transition-duration` | 公开 | `250ms` | 本组件 CSS<br>`transition` |

</div>

## popover

声明来源: `src/popover/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-popover-animation-duration` | 公开 | `var(--mp-sys-motion-duration-standard)` | 本组件 CSS<br>`transition` |
| `--mp-popover-arrow-z-index` | 公开 | `1` | 本组件 CSS<br>`z-index` |
| `--mp-popover-background` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background-color` |
| `--mp-popover-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border` |
| `--mp-popover-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-popover-border-width` | 公开 | `1px` | 本组件 CSS<br>`border` |
| `--mp-popover-box-shadow` | 公开 | `0 3px 3px -2px var(--mp-shadow-key-umbra-opacity), 0 3px 4px 0 var(--mp-shadow-key-penumbra-opacity),     0 1px 8px 0 var(--mp-shadow-key-ambient-opacity)` | 本组件 CSS<br>`box-shadow` |
| `--mp-popover-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-popover-line-height` | 公开 | `var(--mp-line-height)` | 本组件 CSS<br>`line-height` |
| `--mp-popover-padding-horizontal` | 公开 | `var(--mp-sys-space-7)` | 本组件 CSS<br>`padding` |
| `--mp-popover-padding-vertical` | 公开 | `var(--mp-sys-space-6)` | 本组件 CSS<br>`padding` |
| `--mp-popover-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-popover-title-content-gap` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`margin-top` |
| `--mp-popover-title-font-size` | 公开 | `var(--mp-sys-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-popover-title-font-weight` | 公开 | `var(--mp-sys-font-weight-medium)` | 本组件 CSS<br>`font-weight` |
| `--mp-popover-title-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |

</div>

## popup

声明来源: `src/popup/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-popup-content-background-color` | 公开 | `var(--mp-sys-color-surface-raised)` | 本组件 CSS<br>`background-color` |
| `--mp-popup-content-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-popup-overlay-background-color` | 公开 | `var(--mp-sys-color-scrim)` | 本组件 CSS<br>`background-color` |
| `--mp-popup-transition-duration` | 公开 | `250ms` | 本组件 CSS<br>`transition` |
| `--mp-popup-transition-timing-function` | 公开 | `ease` | 本组件 CSS<br>`transition` |

</div>

## progress

声明来源: `src/progress/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-internal-progress-highlight` | 内部 | `rgb(255 255 5.1%)` | 本组件 CSS<br>`background` |
| `--mp-progress-animation-duration` | 公开 | `1.5s` | 本组件 CSS<br>`animation`, `animation-delay` |
| `--mp-progress-danger-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-progress-default-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-progress-font-size` | 公开 | `var(--mp-sys-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-progress-info-color` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-progress-line-border-radius` | 公开 | `9999px` | 本组件 CSS<br>`border-radius` |
| `--mp-progress-primary-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-progress-secondary-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-progress-steps-gap` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`gap` |
| `--mp-progress-success-color` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-progress-tertiary-color` | 公开 | `var(--mp-sys-color-content-tertiary)` | 本组件 CSS<br>`color` |
| `--mp-progress-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-progress-text-gap` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`gap` |
| `--mp-progress-track-color` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background`, `stroke` |
| `--mp-progress-transition-duration` | 公开 | `var(--mp-sys-motion-duration-standard)` | 本组件 CSS<br>`transition` |
| `--mp-progress-warning-color` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |

</div>

## progress-group

声明来源: `src/progress-group/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-progress-group-dot-size` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`height`, `width` |
| `--mp-progress-group-font-size` | 公开 | `var(--mp-sys-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-progress-group-gap` | 公开 | `var(--mp-sys-space-3)` | 本组件 CSS<br>`gap` |
| `--mp-progress-group-item-gap` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`gap` |
| `--mp-progress-group-muted-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-progress-group-radius` | 公开 | `9999px` | 本组件 CSS<br>`border-radius`, `clip-path` |
| `--mp-progress-group-size-lg-thickness` | 公开 | `12px` | 本组件 CSS<br>`height`, `width` |
| `--mp-progress-group-size-md-thickness` | 公开 | `8px` | 本组件 CSS<br>`height`, `width` |
| `--mp-progress-group-size-sm-thickness` | 公开 | `4px` | 本组件 CSS<br>`height`, `width` |
| `--mp-progress-group-size-xl-thickness` | 公开 | `16px` | 本组件 CSS<br>`height`, `width` |
| `--mp-progress-group-size-xs-thickness` | 公开 | `2px` | 本组件 CSS<br>`height`, `width` |
| `--mp-progress-group-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-progress-group-text-font-weight` | 公开 | `var(--mp-sys-font-weight-medium)` | 本组件 CSS<br>`font-weight` |
| `--mp-progress-group-tooltip-bg` | 公开 | `var(--mp-sys-color-surface-tooltip)` | 本组件 CSS<br>`background` |
| `--mp-progress-group-tooltip-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-progress-group-tooltip-duration` | 公开 | `var(--mp-sys-motion-duration-fast)` | 本组件 CSS<br>`animation` |
| `--mp-progress-group-tooltip-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-progress-group-tooltip-line-height` | 公开 | `1.4` | 本组件 CSS<br>`line-height` |
| `--mp-progress-group-tooltip-max-width` | 公开 | `240px` | 本组件 CSS<br>`max-width` |
| `--mp-progress-group-tooltip-offset` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`bottom`, `height`, `inset-inline-start`, `width` |
| `--mp-progress-group-tooltip-padding` | 公开 | `5px var(--mp-sys-space-4)` | 本组件 CSS<br>`padding` |
| `--mp-progress-group-tooltip-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-progress-group-track-color` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background`, `stroke` |
| `--mp-progress-group-transition-duration` | 公开 | `var(--mp-sys-motion-duration-standard)` | 本组件 CSS<br>`animation`, `transition` |

</div>

## pull-refresh

声明来源: `src/pull-refresh/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-pull-refresh-background` | 公开 | `#fff` | 本组件 CSS<br>`background-color` |
| `--mp-pull-refresh-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-pull-refresh-icon-size` | 公开 | `25px` | 本组件 CSS<br>`font-size` |
| `--mp-pull-refresh-size` | 公开 | `40px` | 本组件 CSS<br>`height`, `width` |
| `--mp-pull-refresh-success-color` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |

</div>

## radio

声明来源: `src/radio/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-internal-radio-focus-width` | 内部 | `2px` | 本组件 CSS<br>`box-shadow`, `text-decoration-thickness` |
| `--mp-internal-radio-segment-bg` | 内部 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background` |
| `--mp-internal-radio-segment-gap` | 内部 | `3px` | 本组件 CSS<br>`gap`, `padding` |
| `--mp-internal-radio-segment-group-bg` | 内部 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background` |
| `--mp-internal-radio-segment-height` | 内部 | `var(--mp-sys-control-height-md)` | 本组件 CSS<br>`line-height`, `min-height` |
| `--mp-internal-radio-segment-hover` | 内部 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background` |
| `--mp-internal-radio-segment-padding` | 内部 | `12px` | 本组件 CSS<br>`padding-inline` |
| `--mp-internal-radio-segment-radius` | 内部 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-radio-action-padding` | 公开 | `6px` | 本组件 CSS<br>`padding` |
| `--mp-radio-animation-duration` | 公开 | `var(--mp-sys-motion-duration-standard)` | 本组件 CSS<br>`transition` |
| `--mp-radio-control-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`color` |
| `--mp-radio-control-color-checked` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color`, `outline` |
| `--mp-radio-control-color-disabled` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-radio-control-color-error` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`box-shadow`, `color` |
| `--mp-radio-control-size` | 公开 | `24px` | 本组件 CSS<br>`font-size`, `height`, `width` |
| `--mp-radio-group-gap` | 公开 | `0` | 本组件 CSS<br>`gap` |
| `--mp-radio-label-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-radio-label-gap` | 公开 | `0` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-radio-label-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-radio-label-text-color-disabled` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |

</div>

## rate

声明来源: `src/rate/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-rate-action-padding` | 公开 | `4px` | 本组件 CSS<br>`padding` |
| `--mp-rate-active-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-rate-active-scale` | 公开 | `1.2` | 本组件 CSS<br>`transform` |
| `--mp-rate-disabled-color` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-rate-empty-color` | 公开 | `var(--mp-color-text)` | 本组件 CSS<br>`color` |
| `--mp-rate-error-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-rate-focus-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`outline` |
| `--mp-rate-focus-offset` | 公开 | `2px` | 本组件 CSS<br>`outline-offset` |
| `--mp-rate-focus-width` | 公开 | `2px` | 本组件 CSS<br>`outline` |
| `--mp-rate-gap` | 公开 | `0px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-rate-min-height` | 公开 | `0px` | 本组件 CSS<br>`min-height` |
| `--mp-rate-scale-duration` | 公开 | `250ms` | 本组件 CSS<br>`animation` |
| `--mp-rate-size` | 公开 | `24px` | 本组件 CSS<br>`font-size` |
| `--mp-rate-transition-duration` | 公开 | `250ms` | 本组件 CSS<br>`transition` |
| `--mp-rate-transition-timing-function` | 公开 | `ease` | 本组件 CSS<br>`animation`, `transition` |

</div>

## result

声明来源: `src/result/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-result-background` | 公开 | `var(--mp-color-bg-white)` | 本组件 CSS<br>`background-color` |
| `--mp-result-border-radius` | 公开 | `3px` | 本组件 CSS<br>`border-radius` |
| `--mp-result-content-margin` | 公开 | `20px 0 0` | 本组件 CSS<br>`margin` |
| `--mp-result-danger-border-color` | 公开 | `rgba(244, 67, 54, 0.3)` | 本组件 CSS<br>`border-color` |
| `--mp-result-danger-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`fill` |
| `--mp-result-empty-border-color` | 公开 | `rgba(158, 158, 158, 0.3)` | 本组件 CSS<br>`border-color` |
| `--mp-result-empty-color` | 公开 | `#9e9e9e` | 本组件 CSS<br>`fill` |
| `--mp-result-extra-margin` | 公开 | `20px 0 0` | 本组件 CSS<br>`margin` |
| `--mp-result-image-size` | 公开 | `80px` | 本组件 CSS<br>`height`, `width` |
| `--mp-result-info-border-color` | 公开 | `rgba(0, 175, 239, 0.3)` | 本组件 CSS<br>`border-color` |
| `--mp-result-info-color` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`fill` |
| `--mp-result-padding` | 公开 | `24px` | 本组件 CSS<br>`padding` |
| `--mp-result-question-border-color` | 公开 | `rgba(96, 125, 139, 0.3)` | 本组件 CSS<br>`border-color` |
| `--mp-result-question-color` | 公开 | `#607d8b` | 本组件 CSS<br>`fill` |
| `--mp-result-subtitle-color` | 公开 | `rgba(0, 0, 0, 0.6)` | 本组件 CSS<br>`color` |
| `--mp-result-subtitle-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-result-subtitle-line-height` | 公开 | `1.6` | 本组件 CSS<br>`line-height` |
| `--mp-result-subtitle-margin` | 公开 | `10px 0 0` | 本组件 CSS<br>`margin` |
| `--mp-result-success-border-color` | 公开 | `rgba(0, 196, 143, 0.3)` | 本组件 CSS<br>`border-color` |
| `--mp-result-success-color` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`fill` |
| `--mp-result-title-color` | 公开 | `#444` | 本组件 CSS<br>`color` |
| `--mp-result-title-font-size` | 公开 | `32px` | 本组件 CSS<br>`font-size` |
| `--mp-result-title-font-weight` | 公开 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-result-title-margin` | 公开 | `15px 0 0` | 本组件 CSS<br>`margin` |
| `--mp-result-warning-border-color` | 公开 | `rgba(255, 159, 0, 0.3)` | 本组件 CSS<br>`border-color` |
| `--mp-result-warning-color` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`fill` |

</div>

## ripple

声明来源: `src/ripple/style/token.less`

expand-duration／fade-duration 消费到 transform／opacity 过渡；运行时再读取实际波纹计算后的 duration/delay，避免提前淡出或删除。两个 250ms 生命周期下限不是 CSS Token。采样边界与清理归属见设计指南；此间接时序消费不冒充运行时字面 var() 引用。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-ripple-color` | 公开 | `currentColor` | 本组件 CSS<br>`background-color` |
| `--mp-ripple-cubic-bezier` | 公开 | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` | 本组件 CSS<br>`transition` |
| `--mp-ripple-expand-duration` | 公开 | `200ms` | 本组件 CSS<br>`transition` |
| `--mp-ripple-fade-duration` | 公开 | `140ms` | 本组件 CSS<br>`transition` |

</div>

## safe-area

声明来源: `src/safe-area/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-safe-area-bottom` | 公开 | `env(safe-area-inset-bottom, 0px)` (`html`) | 本组件 CSS<br>`margin-bottom`, `padding-bottom` |
| `--mp-safe-area-left` | 公开 | `env(safe-area-inset-left, 0px)` (`html`) | 本组件 CSS<br>`inset-inline-end`, `margin-left`, `padding-left`, `width` |
| `--mp-safe-area-right` | 公开 | `env(safe-area-inset-right, 0px)` (`html`) | 本组件 CSS<br>`inset-inline-end`, `margin-right`, `padding-right`, `width` |
| `--mp-safe-area-top` | 公开 | `env(safe-area-inset-top, 0px)` (`html`) | 本组件 CSS<br>`margin-top`, `padding-top` |

</div>

## search

声明来源: `src/search/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-search-action-color-text` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-search-action-font-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-search-action-spacing-inline-start` | 公开 | `16px` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-search-color-bg` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background` |
| `--mp-search-color-icon` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-search-field-color-bg` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background` |
| `--mp-search-field-radius` | 公开 | `4px` | 本组件 CSS<br>`border-radius` |
| `--mp-search-field-size-min-height` | 公开 | `36px` | 本组件 CSS<br>`border-radius`, `line-height`, `min-height` |
| `--mp-search-field-spacing-padding` | 公开 | `0 12px` | 本组件 CSS<br>`padding` |
| `--mp-search-history-item-color-border` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-bottom` |
| `--mp-search-history-item-color-text` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-search-history-item-size-min-height` | 公开 | `44px` | 本组件 CSS<br>`min-height` |
| `--mp-search-history-spacing-padding` | 公开 | `8px 16px 24px` | 本组件 CSS<br>`padding` |
| `--mp-search-icon-spacing` | 公开 | `8px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-search-label-color-text` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-search-label-font-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-search-label-spacing-inline-end` | 公开 | `10px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-search-opacity-disabled` | 公开 | `0.6` | 本组件 CSS<br>`opacity` |
| `--mp-search-select-icon-size` | 公开 | `18px` | 本组件 CSS<br>`font-size` |
| `--mp-search-select-icon-spacing` | 公开 | `2px` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-search-select-size-max-width` | 公开 | `120px` | 本组件 CSS<br>`max-width` |
| `--mp-search-select-size-min-width` | 公开 | `96px` | 本组件 CSS<br>`min-width` |
| `--mp-search-size-icon` | 公开 | `20px` | 本组件 CSS<br>`font-size` |
| `--mp-search-size-min-height` | 公开 | `48px` | 本组件 CSS<br>`min-height` |
| `--mp-search-spacing-padding` | 公开 | `8px 16px` | 本组件 CSS<br>`padding` |

</div>

## section

声明来源: `src/section/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-section-accent-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background` |
| `--mp-section-after-gap` | 公开 | `24px` | 本组件 CSS<br>`margin-block` |
| `--mp-section-before-gap` | 公开 | `32px` | 本组件 CSS<br>`padding-block-start` |
| `--mp-section-card-background` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background` |
| `--mp-section-card-padding` | 公开 | `16px` | 本组件 CSS<br>`padding` |
| `--mp-section-card-radius` | 公开 | `6px` | 本组件 CSS<br>`border-radius` |
| `--mp-section-description-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-section-description-gap` | 公开 | `4px` | 本组件 CSS<br>`margin-block-start` |
| `--mp-section-description-line-height` | 公开 | `20px` | 本组件 CSS<br>`line-height` |
| `--mp-section-description-size` | 公开 | `13px` | 本组件 CSS<br>`font-size` |
| `--mp-section-divider-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border`, `border-block-start` |
| `--mp-section-divider-width` | 公开 | `1px` | 本组件 CSS<br>`border`, `border-block-start` |
| `--mp-section-header-gap` | 公开 | `20px` | 本组件 CSS<br>`margin-block-end` |
| `--mp-section-heading-gap` | 公开 | `16px` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-section-marker-gap` | 公开 | `12px` | 本组件 CSS<br>`padding-inline-end`, `row-gap` |
| `--mp-section-marker-height` | 公开 | `16px` | 本组件 CSS<br>`height` |
| `--mp-section-marker-radius` | 公开 | `2px` | 本组件 CSS<br>`border-radius` |
| `--mp-section-marker-width` | 公开 | `3px` | 本组件 CSS<br>`width` |
| `--mp-section-size-sm-card-padding` | 公开 | `12px` | 本组件 CSS<br>`padding` |
| `--mp-section-size-sm-header-gap` | 公开 | `12px` | 本组件 CSS<br>`margin-block-end` |
| `--mp-section-size-sm-marker-height` | 公开 | `14px` | 本组件 CSS<br>`height` |
| `--mp-section-size-sm-title-line-height` | 公开 | `20px` | 本组件 CSS<br>`line-height` |
| `--mp-section-size-sm-title-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-section-title-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-section-title-line-height` | 公开 | `24px` | 本组件 CSS<br>`line-height` |
| `--mp-section-title-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-section-title-weight` | 公开 | `600` | 本组件 CSS<br>`font-weight` |

</div>

## select

声明来源: `src/select/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-select-popup-bg` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background-color` |
| `--mp-select-popup-border-color` | 公开 | `var(--mp-sys-color-border-subtle)` | 本组件 CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-select-popup-border-radius` | 公开 | `var(--mp-sys-radius-lg)` | 本组件 CSS<br>`border-radius` |
| `--mp-select-popup-box-shadow` | 公开 | `0 8px 24px rgba(0, 0, 0, 0.08)` | 本组件 CSS<br>`box-shadow` |
| `--mp-select-popup-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-select-popup-group-title-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-select-popup-group-title-height` | 公开 | `20px` | 本组件 CSS<br>`line-height` |
| `--mp-select-popup-group-title-padding-horizontal` | 公开 | `var(--mp-select-popup-option-padding-horizontal)` | 本组件 CSS<br>`padding` |
| `--mp-select-popup-group-title-padding-top` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`margin-top` |
| `--mp-select-popup-group-title-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-select-popup-loading-min-height` | 公开 | `50px` | 本组件 CSS<br>`min-height` |
| `--mp-select-popup-max-height` | 公开 | `200px` | 本组件 CSS<br>`max-height` |
| `--mp-select-popup-option-bg` | 公开 | `transparent` | 本组件 CSS<br>`background-color` |
| `--mp-select-popup-option-bg-disabled` | 公开 | `transparent` | 本组件 CSS<br>`background-color` |
| `--mp-select-popup-option-bg-hover` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background`, `background-color` |
| `--mp-select-popup-option-bg-selected` | 公开 | `transparent` | 本组件 CSS<br>`background`, `background-color` |
| `--mp-select-popup-option-bg-selected-hover` | 公开 | `var(--mp-select-popup-option-bg-hover)` | 本组件 CSS<br>`background`, `background-color` |
| `--mp-select-popup-option-border-radius` | 公开 | `0` | 本组件 CSS<br>`border-radius` |
| `--mp-select-popup-option-check-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-select-popup-option-check-gap` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-select-popup-option-check-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`height`, `width` |
| `--mp-select-popup-option-font-weight-selected` | 公开 | `var(--mp-sys-font-weight-medium)` | 本组件 CSS<br>`font-weight` |
| `--mp-select-popup-option-height` | 公开 | `36px` | 本组件 CSS<br>`line-height` |
| `--mp-select-popup-option-icon-margin-right` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-select-popup-option-padding-horizontal` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`padding`, `padding-inline` |
| `--mp-select-popup-option-suffix-icon-margin-left` | 公开 | `var(--mp-sys-space-5)` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-select-popup-option-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-select-popup-option-text-color-disabled` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-select-popup-option-text-color-hover` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-select-popup-option-text-color-selected` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-select-popup-padding-horizontal` | 公开 | `0` | 本组件 CSS<br>`padding-inline` |
| `--mp-select-popup-padding-vertical` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`padding`, `padding-block`, `padding-block-end`, `padding-block-start` |

</div>

## signature

声明来源: `src/signature/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-signature-background-color` | 公开 | `var(--mp-color-fill-3)` | 本组件 CSS<br>`background` |
| `--mp-signature-border-radius` | 公开 | `4px` | 本组件 CSS<br>`border-radius` |
| `--mp-signature-height` | 公开 | `200px` | 本组件 CSS<br>`height` |
| `--mp-signature-stroke-color` | 公开 | `#333` | 本组件 CSS<br>`color` |

</div>

## skeleton

声明来源: `src/skeleton/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-skeleton-animation-background` | 公开 | `linear-gradient(90deg, transparent, var(--mp-sys-color-surface-default), transparent)` | 本组件 CSS<br>`background` |
| `--mp-skeleton-animation-duration` | 公开 | `1s` | 本组件 CSS<br>`animation` |
| `--mp-skeleton-avatar-background-color` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background-color` |
| `--mp-skeleton-avatar-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-skeleton-avatar-margin-right` | 公开 | `var(--mp-sys-space-6)` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-skeleton-avatar-size` | 公开 | `34px` | 本组件 CSS<br>`height`, `width` |
| `--mp-skeleton-card-background-color` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background-color` |
| `--mp-skeleton-card-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-skeleton-card-height` | 公开 | `160px` | 本组件 CSS<br>`height` |
| `--mp-skeleton-card-margin-bottom` | 公开 | `var(--mp-sys-space-6)` | 本组件 CSS<br>`margin-bottom` |
| `--mp-skeleton-content-padding` | 公开 | `var(--mp-sys-space-6)` | 本组件 CSS<br>`padding` |
| `--mp-skeleton-row-border-radius` | 公开 | `10px` | 本组件 CSS<br>`border-radius` |
| `--mp-skeleton-row-height` | 公开 | `12px` | 本组件 CSS<br>`height` |
| `--mp-skeleton-row-margin-top` | 公开 | `10px` | 本组件 CSS<br>`margin-top` |
| `--mp-skeleton-shape-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-skeleton-shape-size-lg` | 公开 | `60px` | 本组件 CSS<br>`height`, `width` |
| `--mp-skeleton-shape-size-md` | 公开 | `48px` | 本组件 CSS<br>`height`, `width` |
| `--mp-skeleton-shape-size-sm` | 公开 | `36px` | 本组件 CSS<br>`height`, `width` |
| `--mp-skeleton-title-background-color` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background-color` |
| `--mp-skeleton-title-border-radius` | 公开 | `10px` | 本组件 CSS<br>`border-radius` |
| `--mp-skeleton-title-width` | 公开 | `50%` | 本组件 CSS<br>`width` |
| `--mp-skeleton-transition-duration` | 公开 | `var(--mp-sys-motion-duration-slow)` | 本组件 CSS<br>`transition` |

</div>

## slider

声明来源: `src/slider/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-internal-slider-border-width` | 内部 | `2px` | 本组件 CSS<br>`border`, `outline` |
| `--mp-internal-slider-focus-offset` | 内部 | `3px` | 本组件 CSS<br>`outline-offset` |
| `--mp-internal-slider-mark-offset` | 内部 | `8px` | 本组件 CSS<br>`left`, `top` |
| `--mp-slider-active-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background`, `outline` |
| `--mp-slider-control-height` | 公开 | `var(--mp-sys-control-height-md)` | 本组件 CSS<br>`height`, `min-height`, `padding-bottom`, `padding-inline-end`, `width` |
| `--mp-slider-disabled-color` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`background`, `border-color` |
| `--mp-slider-error-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`background`, `border-color` |
| `--mp-slider-font-size` | 公开 | `var(--mp-sys-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-slider-gap` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`bottom`, `gap`, `left`, `padding` |
| `--mp-slider-input-width` | 公开 | `80px` | 本组件 CSS<br>`width` |
| `--mp-slider-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-slider-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-slider-thumb-border-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`border` |
| `--mp-slider-thumb-color` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background` |
| `--mp-slider-thumb-size` | 公开 | `16px` | 本组件 CSS<br>`height`, `width` |
| `--mp-slider-tooltip-background` | 公开 | `var(--mp-sys-color-surface-tooltip)` | 本组件 CSS<br>`background` |
| `--mp-slider-tooltip-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-slider-track-color` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background` |
| `--mp-slider-track-height` | 公开 | `4px` | 本组件 CSS<br>`height`, `width` |
| `--mp-slider-transition-duration` | 公开 | `var(--mp-sys-motion-duration-fast)` | 本组件 CSS<br>`transition` |

</div>

## space

声明来源: `src/space/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-space-size-lg-column-gap` | 公开 | `var(--mp-sys-space-5)` | 已审动态运行时<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-lg-row-gap` | 公开 | `var(--mp-sys-space-6)` | 已审动态运行时<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-md-column-gap` | 公开 | `var(--mp-sys-space-4)` | 已审动态运行时<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-md-row-gap` | 公开 | `var(--mp-sys-space-5)` | 已审动态运行时<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-sm-column-gap` | 公开 | `var(--mp-sys-space-3)` | 已审动态运行时<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-sm-row-gap` | 公开 | `var(--mp-sys-space-4)` | 已审动态运行时<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-xl-column-gap` | 公开 | `var(--mp-sys-space-6)` | 已审动态运行时<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-xl-row-gap` | 公开 | `var(--mp-sys-space-8)` | 已审动态运行时<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-xs-column-gap` | 公开 | `var(--mp-sys-space-2)` | 已审动态运行时<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-xs-row-gap` | 公开 | `var(--mp-sys-space-2)` | 已审动态运行时<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |

</div>

## statistic

声明来源: `src/statistic/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-statistic-decimal-font-size` | 公开 | `inherit` | 本组件 CSS<br>`font-size` |
| `--mp-statistic-extra-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-statistic-extra-font-size` | 公开 | `var(--mp-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-statistic-extra-margin-top` | 公开 | `8px` | 本组件 CSS<br>`margin-top` |
| `--mp-statistic-prefix-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-statistic-prefix-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-statistic-prefix-spacing` | 公开 | `4px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-statistic-suffix-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-statistic-suffix-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-statistic-suffix-spacing` | 公开 | `4px` | 本组件 CSS<br>`margin-inline-start` |
| `--mp-statistic-title-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-statistic-title-font-size` | 公开 | `var(--mp-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-statistic-title-margin-bottom` | 公开 | `8px` | 本组件 CSS<br>`margin-bottom` |
| `--mp-statistic-value-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-statistic-value-font-size` | 公开 | `28px` | 本组件 CSS<br>`font-size` |
| `--mp-statistic-value-font-weight` | 公开 | `500` | 本组件 CSS<br>`font-weight` |

</div>

## steps

声明来源: `src/steps/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-steps-arrow-item-bg-error` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-finish` | 公开 | `var(--mp-sys-color-state-selected)` | 本组件 CSS<br>`background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-process` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-wait` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-description-color-error` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`color` |
| `--mp-steps-arrow-item-description-color-finish` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-arrow-item-description-color-process` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`color` |
| `--mp-steps-arrow-item-description-color-wait` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-arrow-item-description-margin-top` | 公开 | `0` | 本组件 CSS<br>`margin-top` |
| `--mp-steps-arrow-item-gap` | 公开 | `4px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-steps-arrow-item-title-color-error` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`color` |
| `--mp-steps-arrow-item-title-color-finish` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-steps-arrow-item-title-color-process` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`color` |
| `--mp-steps-arrow-item-title-color-wait` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-arrow-item-title-font-weight-active` | 公开 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-steps-arrow-size-md-title-padding-left` | 公开 | `16px` | 本组件 CSS<br>`padding-inline-start` |
| `--mp-steps-arrow-size-sm-title-padding-left` | 公开 | `20px` | 本组件 CSS<br>`padding-inline-start` |
| `--mp-steps-changeable-hover-text-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-horizontal-item-description-margin-top` | 公开 | `2px` | 本组件 CSS<br>`margin-top` |
| `--mp-steps-circle-item-bg-error` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-circle-item-bg-finish` | 公开 | `var(--mp-sys-color-state-selected)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-circle-item-bg-process` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-circle-item-bg-wait` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-circle-item-border-color-error` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-steps-circle-item-border-color-finish` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-steps-circle-item-border-color-process` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-steps-circle-item-border-color-wait` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-steps-circle-item-description-color-error` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-description-color-finish` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-description-color-process` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-description-color-wait` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-icon-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-steps-circle-item-icon-gap` | 公开 | `12px` | 本组件 CSS<br>`inset-inline-start`, `margin-inline-end`, `padding-inline-end` |
| `--mp-steps-circle-item-icon-text-color-error` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-icon-text-color-finish` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-icon-text-color-process` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-icon-text-color-wait` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-tail-color-error` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-circle-item-tail-color-process` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-circle-item-tail-color-wait` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-circle-item-tail-size` | 公开 | `1px` | 本组件 CSS<br>`height`, `inset-inline-start`, `top`, `width` |
| `--mp-steps-circle-item-title-color-error` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-title-color-finish` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-title-color-process` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-title-color-wait` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-circle-item-title-font-weight-active` | 公开 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-steps-circle-tail-hack-width` | 公开 | `5000px` | 本组件 CSS<br>`width` |
| `--mp-steps-circle-vertical-item-description-margin-top` | 公开 | `2px` | 本组件 CSS<br>`margin-top` |
| `--mp-steps-circle-vertical-tail-padding-extra` | 公开 | `6px` | 本组件 CSS<br>`padding` |
| `--mp-steps-direction-horizontal-description-width` | 公开 | `140px` | 本组件 CSS<br>`max-width` |
| `--mp-steps-dot-horizontal-item-description-margin-top` | 公开 | `4px` | 本组件 CSS<br>`margin-top` |
| `--mp-steps-dot-horizontal-item-title-margin-top` | 公开 | `4px` | 本组件 CSS<br>`margin-top` |
| `--mp-steps-dot-item-bg-error` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-dot-item-bg-finish` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-dot-item-bg-process` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-dot-item-bg-wait` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-dot-item-border-color-error` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`border-color` |
| `--mp-steps-dot-item-border-color-finish` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`border-color` |
| `--mp-steps-dot-item-border-color-process` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`border-color` |
| `--mp-steps-dot-item-border-color-wait` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`border-color` |
| `--mp-steps-dot-item-description-color-error` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-dot-item-description-color-finish` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-dot-item-description-color-process` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-dot-item-description-color-wait` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-dot-item-icon-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-steps-dot-item-icon-gap` | 公开 | `4px` | 本组件 CSS<br>`inset-inline-start`, `margin-inline-end`, `padding-top` |
| `--mp-steps-dot-item-icon-margin-left` | 公开 | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-dot-item-icon-size)) / 2)` | 本组件 CSS<br>`inset-inline-start`, `margin-inline-start` |
| `--mp-steps-dot-item-icon-size` | 公开 | `8px` | 本组件 CSS<br>`height`, `inset-inline-start`, `margin-inline-end`, `margin-inline-start`, `margin-top`, `padding-top`, `top`, `width` |
| `--mp-steps-dot-item-icon-size-active` | 公开 | `10px` | 本组件 CSS<br>`height`, `margin-inline-start`, `margin-top`, `width` |
| `--mp-steps-dot-item-tail-color-error` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-dot-item-tail-color-process` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-dot-item-tail-color-wait` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-dot-item-tail-size` | 公开 | `1px` | 本组件 CSS<br>`height`, `top` |
| `--mp-steps-dot-item-title-color-error` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-steps-dot-item-title-color-finish` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-steps-dot-item-title-color-process` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-steps-dot-item-title-color-wait` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-steps-dot-item-title-font-weight-active` | 公开 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-steps-dot-vertical-item-description-margin-top` | 公开 | `4px` | 本组件 CSS<br>`margin-top` |
| `--mp-steps-dot-vertical-item-dot-margin-top` | 公开 | `8px` | 本组件 CSS<br>`margin-top` |
| `--mp-steps-dot-vertical-item-dot-margin-top-active` | 公开 | `calc(var(--mp-steps-dot-vertical-item-dot-margin-top) - (var(--mp-steps-dot-item-icon-size-active) - var(--mp-steps-dot-item-icon-size)))` | 本组件 CSS<br>`margin-top` |
| `--mp-steps-dot-vertical-item-icon-margin-right` | 公开 | `16px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-steps-dot-vertical-tail-padding-bottom` | 公开 | `2px` | 本组件 CSS<br>`padding-bottom` |
| `--mp-steps-dot-vertical-tail-padding-top-extra` | 公开 | `4px` | 本组件 CSS<br>`padding-top` |
| `--mp-steps-label-vertical-content-width` | 公开 | `100%` | 本组件 CSS<br>`inset-inline-start`, `margin-inline-start` |
| `--mp-steps-navigation-arrow-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`border` |
| `--mp-steps-navigation-arrow-line-width` | 公开 | `2px` | 本组件 CSS<br>`border` |
| `--mp-steps-navigation-arrow-right` | 公开 | `30px` | 本组件 CSS<br>`inset-inline-end` |
| `--mp-steps-navigation-arrow-size` | 公开 | `6px` | 本组件 CSS<br>`height`, `width` |
| `--mp-steps-navigation-arrow-spacing-right` | 公开 | `10px` | 本组件 CSS<br>`padding-inline-end` |
| `--mp-steps-navigation-arrow-top` | 公开 | `10px` | 本组件 CSS<br>`top` |
| `--mp-steps-navigation-content-margin-bottom` | 公开 | `20px` | 本组件 CSS<br>`margin-bottom` |
| `--mp-steps-navigation-description-padding-right` | 公开 | `20px` | 本组件 CSS<br>`padding-inline-end` |
| `--mp-steps-navigation-ink-bg` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color` |
| `--mp-steps-navigation-ink-height` | 公开 | `2px` | 本组件 CSS<br>`height` |
| `--mp-steps-navigation-ink-spacing-left` | 公开 | `0` | 本组件 CSS<br>`inset-inline-start` |
| `--mp-steps-navigation-ink-spacing-right` | 公开 | `30px` | 本组件 CSS<br>`inset-inline-end` |
| `--mp-steps-navigation-margin-right` | 公开 | `32px` | 本组件 CSS<br>`margin-inline-end` |
| `--mp-steps-navigation-padding-left` | 公开 | `20px` | 本组件 CSS<br>`padding-inline-start` |
| `--mp-steps-node-font-weight` | 公开 | `500` | 本组件 CSS<br>`font-weight` |
| `--mp-steps-size-md` | 公开 | `28px` | 本组件 CSS<br>`height`, `inset-inline-start`, `line-height`, `margin-inline-start`, `margin-top`, `padding`, `padding-inline-end`, `top`, `width` |
| `--mp-steps-size-md-arrow` | 公开 | `72px` | 本组件 CSS<br>`border-bottom`, `border-inline-start`, `border-top`, `height`, `inset-inline-end`, `padding-inline-start` |
| `--mp-steps-size-md-description-font-size` | 公开 | `var(--mp-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-steps-size-md-icon-font-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-steps-size-md-item-icon-margin-left` | 公开 | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-size-md)) / 2)` | 本组件 CSS<br>`inset-inline-start`, `margin-inline-start` |
| `--mp-steps-size-md-title-font-size` | 公开 | `var(--mp-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-steps-size-sm` | 公开 | `24px` | 本组件 CSS<br>`height`, `inset-inline-start`, `line-height`, `margin-inline-start`, `padding`, `padding-inline-end`, `top`, `width` |
| `--mp-steps-size-sm-arrow` | 公开 | `40px` | 本组件 CSS<br>`border-bottom`, `border-inline-start`, `border-top`, `height`, `inset-inline-end`, `padding-inline-start` |
| `--mp-steps-size-sm-description-font-size` | 公开 | `var(--mp-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-steps-size-sm-icon-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-steps-size-sm-item-icon-margin-left` | 公开 | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-size-sm)) / 2)` | 本组件 CSS<br>`inset-inline-start`, `margin-inline-start` |
| `--mp-steps-size-sm-title-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-steps-transition-duration-1` | 公开 | `0.1s` | 本组件 CSS<br>`transition` |
| `--mp-steps-transition-timing-function-linear` | 公开 | `cubic-bezier(0, 0, 1, 1)` | 本组件 CSS<br>`transition` |
| `--mp-steps-vertical-item-min-height` | 公开 | `90px` | 本组件 CSS<br>`min-height` |

</div>

## swipe-cell

声明来源: `src/swipe-cell/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-swipe-cell-background` | 公开 | `transparent` | 本组件 CSS<br>`background` |
| `--mp-swipe-cell-transition` | 公开 | `transform 0.2s ease` | 本组件 CSS<br>`transition` |

</div>

## switch

声明来源: `src/switch/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-internal-switch-error-text-color` | 内部 | `var(--mp-switch-text-color)` | 本组件 CSS<br>`color` |
| `--mp-switch-checked-text-color` | 公开 | `var(--mp-switch-text-color)` | 本组件 CSS<br>`color` |
| `--mp-switch-disabled-opacity` | 公开 | `0.5` | 本组件 CSS<br>`opacity` |
| `--mp-switch-duration` | 公开 | `var(--mp-sys-motion-duration-standard)` | 本组件 CSS<br>`transition` |
| `--mp-switch-focus-width` | 公开 | `2px` | 本组件 CSS<br>`box-shadow` |
| `--mp-switch-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-switch-gap` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`inset-inline-start`, `padding-inline` |
| `--mp-switch-handle-background` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background` |
| `--mp-switch-handle-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-switch-handle-size` | 公开 | `16px` | 本组件 CSS<br>`height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-height` | 公开 | `24px` | 本组件 CSS<br>`height` |
| `--mp-switch-hit-area` | 公开 | `0px` | 本组件 CSS<br>`inset` |
| `--mp-switch-line-handle-size` | 公开 | `20px` | 本组件 CSS<br>`height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-line-height` | 公开 | `12px` | 本组件 CSS<br>`height` |
| `--mp-switch-loading-duration` | 公开 | `1s` | 本组件 CSS<br>`animation` |
| `--mp-switch-radius` | 公开 | `var(--mp-sys-radius-pill)` | 本组件 CSS<br>`border-radius` |
| `--mp-switch-ripple-duration` | 公开 | `400ms` | 本组件 CSS<br>`animation` |
| `--mp-switch-ripple-scale` | 公开 | `2.4` | 本组件 CSS<br>`transform` |
| `--mp-switch-round-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-switch-shadow-color` | 公开 | `#0003` | 运行时引用（不代表可见性证明）<br>`switch/Switch.vue` |
| `--mp-switch-size-lg-scale` | 公开 | `1.2` | 本组件 CSS<br>`font-size`, `height`, `inset-inline-start`, `min-width`, `padding-inline`, `width` |
| `--mp-switch-size-sm-scale` | 公开 | `0.8` | 本组件 CSS<br>`font-size`, `height`, `inset-inline-start`, `min-width`, `padding-inline`, `width` |
| `--mp-switch-text-color` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`color` |
| `--mp-switch-tonal-border-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`background`, `border` |
| `--mp-switch-tonal-border-width` | 公开 | `2px` | 本组件 CSS<br>`border` |
| `--mp-switch-tonal-handle-color` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`color` |
| `--mp-switch-tonal-handle-size` | 公开 | `24px` | 本组件 CSS<br>`height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-tonal-height` | 公开 | `32px` | 本组件 CSS<br>`height` |
| `--mp-switch-tonal-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-switch-tonal-track-background` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background` |
| `--mp-switch-tonal-width` | 公开 | `52px` | 本组件 CSS<br>`min-width` |
| `--mp-switch-track-active-background` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background` |
| `--mp-switch-track-background` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`background` |
| `--mp-switch-track-error-background` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`background`, `border-color` |
| `--mp-switch-width` | 公开 | `40px` | 本组件 CSS<br>`min-width` |

</div>

## tab-bar

声明来源: `src/tab-bar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-tab-bar-background-color` | 公开 | `var(--mp-color-bg-2)` | 本组件 CSS<br>`background-color` |
| `--mp-tab-bar-border-color` | 公开 | `var(--mp-color-border-2)` | 本组件 CSS<br>`border-top` |
| `--mp-tab-bar-fab-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-tab-bar-fab-offset` | 公开 | `4px` | 本组件 CSS<br>`inset-inline-end`, `margin-inline-end` |
| `--mp-tab-bar-height` | 公开 | `50px` | 本组件 CSS<br>`height`, `inset-inline-end`, `margin-inline-end`, `margin-inline-start`, `width` |
| `--mp-tab-bar-item-active-background-color` | 公开 | `transparent` | 本组件 CSS<br>`background-color` |
| `--mp-tab-bar-item-active-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-tab-bar-item-focus-color` | 公开 | `currentColor` | 本组件 CSS<br>`outline` |
| `--mp-tab-bar-item-focus-offset` | 公开 | `-2px` | 本组件 CSS<br>`outline-offset` |
| `--mp-tab-bar-item-focus-width` | 公开 | `2px` | 本组件 CSS<br>`outline` |
| `--mp-tab-bar-item-font-size` | 公开 | `var(--mp-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-tab-bar-item-icon-margin-bottom` | 公开 | `5px` | 本组件 CSS<br>`margin-top` |
| `--mp-tab-bar-item-icon-size` | 公开 | `22px` | 本组件 CSS<br>`font-size` |
| `--mp-tab-bar-item-inactive-color` | 公开 | `var(--mp-color-text-2)` | 本组件 CSS<br>`color` |
| `--mp-tab-bar-item-line-height` | 公开 | `1` | 本组件 CSS<br>`line-height` |
| `--mp-tab-bar-item-variant-active-background-color` | 公开 | `color-mix(in srgb, var(--mp-sys-color-action-primary) 14%, var(--mp-tab-bar-background-color))` | 本组件 CSS<br>`background-color` |
| `--mp-tab-bar-item-variant-active-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`color` |
| `--mp-tab-bar-item-variant-icon-container-border-radius` | 公开 | `100px` | 本组件 CSS<br>`border-radius` |
| `--mp-tab-bar-item-variant-icon-container-height` | 公开 | `30px` | 本组件 CSS<br>`height` |
| `--mp-tab-bar-item-variant-icon-container-max-width` | 公开 | `58px` | 本组件 CSS<br>`max-width` |
| `--mp-tab-bar-variant-height` | 公开 | `66px` | 本组件 CSS<br>`height` |
| `--mp-tab-bar-z-index` | 公开 | `1` | 运行时引用（不代表可见性证明）<br>`tab-bar/TabBar.vue` |

</div>

## table

声明来源: `src/table/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-table-background` | 公开 | `#fff` | 本组件 CSS<br>`background` |
| `--mp-table-border-radius` | 公开 | `2px` | 本组件 CSS<br>`border-radius` |
| `--mp-table-footer-border-top` | 公开 | `thin solid var(--mp-color-border-2)` | 本组件 CSS<br>`border-top` |
| `--mp-table-row-height` | 公开 | `46px` | 本组件 CSS<br>`height`, `min-height` |
| `--mp-table-row-padding` | 公开 | `0 16px` | 本组件 CSS<br>`padding` |
| `--mp-table-tbody-td-font-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-table-tbody-td-text-align` | 公开 | `start` | 本组件 CSS<br>`text-align` |
| `--mp-table-tbody-td-text-color` | 公开 | `#555` | 本组件 CSS<br>`color` |
| `--mp-table-tbody-tr-border-bottom` | 公开 | `thin solid var(--mp-color-border-2)` | 本组件 CSS<br>`border-bottom` |
| `--mp-table-tbody-tr-hover-background` | 公开 | `#eee` | 本组件 CSS<br>`background` |
| `--mp-table-thead-border-bottom` | 公开 | `thin solid var(--mp-color-border-2)` | 本组件 CSS<br>`border-bottom` |
| `--mp-table-thead-th-font-size` | 公开 | `14px` | 本组件 CSS<br>`font-size` |
| `--mp-table-thead-th-text-align` | 公开 | `start` | 本组件 CSS<br>`text-align` |
| `--mp-table-thead-th-text-color` | 公开 | `rgba(0, 0, 0, 0.6)` | 本组件 CSS<br>`color` |
| `--mp-table-thead-tr-border-bottom` | 公开 | `thin solid var(--mp-color-border-2)` | 本组件 CSS<br>`border-bottom` |

</div>

## tabs

声明来源: `src/tabs/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-tabs-active-font-weight` | 公开 | `var(--mp-sys-font-weight-semibold)` | 本组件 CSS<br>`font-weight` |
| `--mp-tabs-active-shadow` | 公开 | `none` | 本组件 CSS<br>`box-shadow` |
| `--mp-tabs-animation-duration` | 公开 | `var(--mp-sys-motion-duration-standard)` | 本组件 CSS<br>`animation` |
| `--mp-tabs-background` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background` |
| `--mp-tabs-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`background`, `border-color` |
| `--mp-tabs-border-width` | 公开 | `1px` | 本组件 CSS<br>`border`, `bottom`, `height` |
| `--mp-tabs-capsule-radius` | 公开 | `12px` | 本组件 CSS<br>`border-radius` |
| `--mp-tabs-content-padding` | 公开 | `var(--mp-sys-space-5)` | 本组件 CSS<br>`padding-block`, `padding-inline-start` |
| `--mp-tabs-control-height` | 公开 | `var(--mp-sys-control-height-xs)` | 本组件 CSS<br>`min-height`, `min-width` |
| `--mp-tabs-focus-offset` | 公开 | `-3px` | 本组件 CSS<br>`outline-offset` |
| `--mp-tabs-focus-width` | 公开 | `2px` | 本组件 CSS<br>`outline` |
| `--mp-tabs-group-padding` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`padding` |
| `--mp-tabs-header-padding` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`padding-inline` |
| `--mp-tabs-hover-background` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background` |
| `--mp-tabs-icon-gap` | 公开 | `var(--mp-sys-space-3)` | 本组件 CSS<br>`gap` |
| `--mp-tabs-indicator-radius` | 公开 | `1px` | 本组件 CSS<br>`border-radius` |
| `--mp-tabs-indicator-size` | 公开 | `2px` | 本组件 CSS<br>`height`, `width` |
| `--mp-tabs-muted-background` | 公开 | `var(--mp-sys-color-surface-muted)` | 本组件 CSS<br>`background` |
| `--mp-tabs-nav-gap` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`gap` |
| `--mp-tabs-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-tabs-size-lg-tab-font-size` | 公开 | `var(--mp-sys-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-tabs-size-lg-tab-height` | 公开 | `var(--mp-sys-control-height-lg)` | 本组件 CSS<br>`min-height` |
| `--mp-tabs-size-lg-tab-padding` | 公开 | `10px var(--mp-sys-space-7)` | 本组件 CSS<br>`padding` |
| `--mp-tabs-size-md-tab-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-tabs-size-md-tab-height` | 公开 | `var(--mp-sys-control-height-md)` | 本组件 CSS<br>`min-height` |
| `--mp-tabs-size-md-tab-padding` | 公开 | `var(--mp-sys-space-4) var(--mp-sys-space-6)` | 本组件 CSS<br>`padding` |
| `--mp-tabs-size-sm-tab-font-size` | 公开 | `var(--mp-sys-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-tabs-size-sm-tab-height` | 公开 | `var(--mp-sys-control-height-sm)` | 本组件 CSS<br>`min-height` |
| `--mp-tabs-size-sm-tab-padding` | 公开 | `var(--mp-sys-space-3) var(--mp-sys-space-5)` | 本组件 CSS<br>`padding` |
| `--mp-tabs-size-xl-tab-font-size` | 公开 | `var(--mp-sys-font-size-xl)` | 本组件 CSS<br>`font-size` |
| `--mp-tabs-size-xl-tab-height` | 公开 | `var(--mp-sys-control-height-xl)` | 本组件 CSS<br>`min-height` |
| `--mp-tabs-size-xl-tab-padding` | 公开 | `var(--mp-sys-space-5) var(--mp-sys-space-8)` | 本组件 CSS<br>`padding` |
| `--mp-tabs-size-xs-tab-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-tabs-size-xs-tab-height` | 公开 | `var(--mp-sys-control-height-xs)` | 本组件 CSS<br>`min-height` |
| `--mp-tabs-size-xs-tab-padding` | 公开 | `var(--mp-sys-space-2) var(--mp-sys-space-4)` | 本组件 CSS<br>`padding` |
| `--mp-tabs-tab-gap` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`gap` |
| `--mp-tabs-title-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-tabs-title-text-color-active` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background`, `color`, `outline` |
| `--mp-tabs-title-text-color-disabled` | 公开 | `var(--mp-sys-color-content-disabled)` | 本组件 CSS<br>`color` |
| `--mp-tabs-touch-target` | 公开 | `var(--mp-sys-control-touch-target)` | 本组件 CSS<br>`min-height`, `min-width` |

</div>

## tag

声明来源: `src/tag/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-tag-bg-not-checked-hover` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background-color` |
| `--mp-tag-blue-bg` | 公开 | `rgb(var(--mp-blue-1))`<br>`rgba(var(--mp-blue-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-blue-bg-hover` | 公开 | `rgb(var(--mp-blue-2))`<br>`rgba(var(--mp-blue-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-blue-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-blue-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-blue-icon-color` | 公开 | `rgb(var(--mp-blue-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-blue-text-color` | 公开 | `rgb(var(--mp-blue-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-tag-border-type` | 公开 | `solid` | 本组件 CSS<br>`border` |
| `--mp-tag-border-width` | 公开 | `1px` | 本组件 CSS<br>`border`, `line-height` |
| `--mp-tag-brand-bg` | 公开 | `rgb(var(--mp-brand-1))`<br>`rgba(var(--mp-brand-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-brand-bg-hover` | 公开 | `rgb(var(--mp-brand-2))`<br>`rgba(var(--mp-brand-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-brand-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-brand-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-brand-icon-color` | 公开 | `rgb(var(--mp-brand-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-brand-text-color` | 公开 | `rgb(var(--mp-brand-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-close-font-size` | 公开 | `var(--mp-tag-size-md-font-size)` | 本组件 CSS<br>`font-size` |
| `--mp-tag-close-margin-left` | 公开 | `var(--mp-sys-space-3)` | 本组件 CSS<br>`margin-left`, `margin-right` |
| `--mp-tag-custom-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-tag-cyan-bg` | 公开 | `rgb(var(--mp-cyan-1))`<br>`rgba(var(--mp-cyan-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-cyan-bg-hover` | 公开 | `rgb(var(--mp-cyan-2))`<br>`rgba(var(--mp-cyan-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-cyan-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-cyan-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-cyan-icon-color` | 公开 | `rgb(var(--mp-cyan-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-cyan-text-color` | 公开 | `rgb(var(--mp-cyan-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-default-bg` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background-color` |
| `--mp-tag-default-bg-hover` | 公开 | `var(--mp-color-fill-3)` | 本组件 CSS<br>`background-color` |
| `--mp-tag-default-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-default-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-default-icon-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-tag-default-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-tag-fade-duration` | 公开 | `var(--mp-sys-motion-duration-fast)` | 本组件 CSS<br>`transition` |
| `--mp-tag-gold-bg` | 公开 | `rgb(var(--mp-gold-1))`<br>`rgba(var(--mp-gold-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-gold-bg-hover` | 公开 | `rgb(var(--mp-gold-2))`<br>`rgba(var(--mp-gold-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-gold-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-gold-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-gold-icon-color` | 公开 | `rgb(var(--mp-gold-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-gold-text-color` | 公开 | `rgb(var(--mp-gold-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-gray-bg` | 公开 | `rgb(var(--mp-gray-2))`<br>`rgba(var(--mp-gray-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-gray-bg-hover` | 公开 | `rgb(var(--mp-gray-3))`<br>`rgba(var(--mp-gray-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-gray-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-gray-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-gray-icon-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-tag-gray-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-green-bg` | 公开 | `rgb(var(--mp-green-1))`<br>`rgba(var(--mp-green-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-green-bg-hover` | 公开 | `rgb(var(--mp-green-2))`<br>`rgba(var(--mp-green-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-green-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-green-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-green-icon-color` | 公开 | `rgb(var(--mp-green-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-green-text-color` | 公开 | `rgb(var(--mp-green-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-icon-margin-right` | 公开 | `var(--mp-sys-space-3)` | 本组件 CSS<br>`margin-left`, `margin-right` |
| `--mp-tag-lime-bg` | 公开 | `rgb(var(--mp-lime-1))`<br>`rgba(var(--mp-lime-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-lime-bg-hover` | 公开 | `rgb(var(--mp-lime-2))`<br>`rgba(var(--mp-lime-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-lime-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-lime-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-lime-icon-color` | 公开 | `rgb(var(--mp-lime-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-lime-text-color` | 公开 | `rgb(var(--mp-lime-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-magenta-bg` | 公开 | `rgb(var(--mp-magenta-1))`<br>`rgba(var(--mp-magenta-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-magenta-bg-hover` | 公开 | `rgb(var(--mp-magenta-2))`<br>`rgba(var(--mp-magenta-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-magenta-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-magenta-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-magenta-icon-color` | 公开 | `rgb(var(--mp-magenta-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-magenta-text-color` | 公开 | `rgb(var(--mp-magenta-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-orange-bg` | 公开 | `rgb(var(--mp-orange-1))`<br>`rgba(var(--mp-orange-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-orange-bg-hover` | 公开 | `rgb(var(--mp-orange-2))`<br>`rgba(var(--mp-orange-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-orange-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-orange-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-orange-icon-color` | 公开 | `rgb(var(--mp-orange-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-orange-text-color` | 公开 | `rgb(var(--mp-orange-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-orangered-bg` | 公开 | `rgb(var(--mp-orangered-1))`<br>`rgba(var(--mp-orangered-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-orangered-bg-hover` | 公开 | `rgb(var(--mp-orangered-2))`<br>`rgba(var(--mp-orangered-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-orangered-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-orangered-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-orangered-icon-color` | 公开 | `rgb(var(--mp-orangered-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-orangered-text-color` | 公开 | `rgb(var(--mp-orangered-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-padding-horizontal` | 公开 | `10px` | 本组件 CSS<br>`padding` |
| `--mp-tag-padding-vertical` | 公开 | `0` | 本组件 CSS<br>`line-height`, `padding` |
| `--mp-tag-pinkpurple-bg` | 公开 | `rgb(var(--mp-pinkpurple-1))`<br>`rgba(var(--mp-pinkpurple-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-pinkpurple-bg-hover` | 公开 | `rgb(var(--mp-pinkpurple-2))`<br>`rgba(var(--mp-pinkpurple-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-pinkpurple-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-pinkpurple-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-pinkpurple-icon-color` | 公开 | `rgb(var(--mp-pinkpurple-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-pinkpurple-text-color` | 公开 | `rgb(var(--mp-pinkpurple-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-purple-bg` | 公开 | `rgb(var(--mp-purple-1))`<br>`rgba(var(--mp-purple-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-purple-bg-hover` | 公开 | `rgb(var(--mp-purple-2))`<br>`rgba(var(--mp-purple-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-purple-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-purple-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-purple-icon-color` | 公开 | `rgb(var(--mp-purple-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-purple-text-color` | 公开 | `rgb(var(--mp-purple-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-red-bg` | 公开 | `rgb(var(--mp-red-1))`<br>`rgba(var(--mp-red-6), 0.2)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-red-bg-hover` | 公开 | `rgb(var(--mp-red-2))`<br>`rgba(var(--mp-red-6), 0.35)` (`:root[maple-theme='dark']`) | 本组件 CSS<br>`background-color` |
| `--mp-tag-red-border-color` | 公开 | `transparent` | 本组件 CSS<br>`border` |
| `--mp-tag-red-border-color-hover` | 公开 | `transparent` | 本组件 CSS<br>`border-color` |
| `--mp-tag-red-icon-color` | 公开 | `rgb(var(--mp-red-6))` | 本组件 CSS<br>`color` |
| `--mp-tag-red-text-color` | 公开 | `rgb(var(--mp-red-6))` | 本组件 CSS<br>`border-color`, `color` |
| `--mp-tag-round-radius` | 公开 | `100px` | 本组件 CSS<br>`border-radius` |
| `--mp-tag-size-lg` | 公开 | `36px` | 本组件 CSS<br>`height`, `line-height` |
| `--mp-tag-size-lg-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-tag-size-md` | 公开 | `32px` | 本组件 CSS<br>`height`, `line-height` |
| `--mp-tag-size-md-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-tag-size-sm` | 公开 | `28px` | 本组件 CSS<br>`height`, `line-height` |
| `--mp-tag-size-sm-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-tag-size-xl` | 公开 | `40px` | 本组件 CSS<br>`height`, `line-height` |
| `--mp-tag-size-xl-font-size` | 公开 | `var(--mp-sys-font-size-lg)` | 本组件 CSS<br>`font-size` |
| `--mp-tag-size-xs` | 公开 | `24px` | 本组件 CSS<br>`height`, `line-height` |
| `--mp-tag-size-xs-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-tag-status-danger-bg-color` | 公开 | `rgb(var(--mp-danger-1))` | 本组件 CSS<br>`background-color` |
| `--mp-tag-status-danger-text-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-tag-status-info-bg-color` | 公开 | `rgb(var(--mp-blue-1))` | 本组件 CSS<br>`background-color` |
| `--mp-tag-status-info-text-color` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`color` |
| `--mp-tag-status-primary-bg-color` | 公开 | `rgb(var(--mp-primary-1))` | 本组件 CSS<br>`background-color` |
| `--mp-tag-status-primary-text-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`color` |
| `--mp-tag-status-secondary-bg-color` | 公开 | `rgb(var(--mp-gray-2))` | 本组件 CSS<br>`background-color` |
| `--mp-tag-status-secondary-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-tag-status-success-bg-color` | 公开 | `rgb(var(--mp-success-1))` | 本组件 CSS<br>`background-color` |
| `--mp-tag-status-success-text-color` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`color` |
| `--mp-tag-status-tertiary-bg-color` | 公开 | `rgb(var(--mp-gray-1))` | 本组件 CSS<br>`background-color` |
| `--mp-tag-status-tertiary-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-tag-status-warning-bg-color` | 公开 | `rgb(var(--mp-warning-1))` | 本组件 CSS<br>`background-color` |
| `--mp-tag-status-warning-text-color` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`color` |
| `--mp-tag-text-font-weight` | 公开 | `var(--mp-sys-font-weight-medium)` | 本组件 CSS<br>`font-weight` |
| `--mp-tag-variant-outline-default-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border` |
| `--mp-tag-variant-outline-default-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-tag-variant-outline-status-danger-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-info-color` | 公开 | `var(--mp-sys-color-content-info)` | 本组件 CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-primary-color` | 公开 | `var(--mp-sys-color-content-brand)` | 本组件 CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-secondary-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-success-color` | 公开 | `var(--mp-sys-color-content-success)` | 本组件 CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-tertiary-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-warning-color` | 公开 | `var(--mp-sys-color-content-warning)` | 本组件 CSS<br>`border`, `color` |

</div>

## textarea

声明来源: `src/textarea/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-textarea-caret-color` | 公开 | `var(--mp-field-caret-color)` | 本组件 CSS<br>`caret-color` |
| `--mp-textarea-counter-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-textarea-counter-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-textarea-counter-margin-top` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`margin-block-start` |
| `--mp-textarea-font-size` | 公开 | `16px` | 本组件 CSS<br>`font-size` |
| `--mp-textarea-height` | 公开 | `auto` | 本组件 CSS<br>`height` |
| `--mp-textarea-line-height` | 公开 | `1.5` | 本组件 CSS<br>`line-height` |
| `--mp-textarea-min-height` | 公开 | `96px` | 本组件 CSS<br>`min-height` |
| `--mp-textarea-padding-horizontal` | 公开 | `0px` | 本组件 CSS<br>`padding`, `padding-inline-end` |
| `--mp-textarea-padding-vertical` | 公开 | `var(--mp-field-content-padding-vertical)` | 本组件 CSS<br>`padding` |
| `--mp-textarea-placeholder-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |

</div>

## time

声明来源: `src/time/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-time-panel-actions-padding` | 公开 | `8px` | 本组件 CSS<br>`padding` |
| `--mp-time-panel-background` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background` |
| `--mp-time-panel-border` | 公开 | `var(--mp-color-border-2)` | 本组件 CSS<br>`border`, `border-top` |
| `--mp-time-panel-radius` | 公开 | `8px` | 本组件 CSS<br>`border-radius` |
| `--mp-time-picker-actions-padding` | 公开 | `0 8px 12px 8px` | 本组件 CSS<br>`padding` |
| `--mp-time-picker-body-background` | 公开 | `#fff` | 本组件 CSS<br>`background` |
| `--mp-time-picker-border-radius` | 公开 | `4px` | 本组件 CSS<br>`border-radius` |
| `--mp-time-picker-column-label-height` | 公开 | `var(--mp-internal-temporal-panel-column-label-height)` | 本组件 CSS<br>`height` |
| `--mp-time-picker-font-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-time-picker-min-width` | 公开 | `290px` | 本组件 CSS<br>`min-width` |
| `--mp-time-popover-gap` | 公开 | `32px` | 本组件 CSS<br>`max-height`, `max-width` |
| `--mp-time-popover-max-height` | 公开 | `calc(50dvh - var(--mp-time-popover-gap))` | 本组件 CSS<br>`max-height` |
| `--mp-time-popover-width` | 公开 | `320px` | 本组件 CSS<br>`width` |
| `--mp-time-title-font-size` | 公开 | `var(--mp-picker-title-font-size, 16px)` | 本组件 CSS<br>`font-size` |
| `--mp-time-title-text-color` | 公开 | `var(--mp-picker-title-text-color, #555)` | 本组件 CSS<br>`color` |
| `--mp-time-toolbar-height` | 公开 | `var(--mp-picker-toolbar-height, 44px)` | 本组件 CSS<br>`height` |
| `--mp-time-toolbar-padding` | 公开 | `var(--mp-picker-toolbar-padding, 0 4px)` | 本组件 CSS<br>`padding` |

</div>

## time-range

声明来源: `src/time-range/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-time-range-picker-background` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background`, `background-image` |
| `--mp-time-range-picker-border-radius` | 公开 | `var(--mp-time-picker-border-radius, 4px)` | 本组件 CSS<br>`border-radius` |
| `--mp-time-range-picker-column-label-height` | 公开 | `var(--mp-internal-temporal-panel-column-label-height)` | 本组件 CSS<br>`height` |
| `--mp-time-range-picker-next-day-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-time-range-title-font-size` | 公开 | `var(--mp-picker-title-font-size, 16px)` | 本组件 CSS<br>`font-size` |
| `--mp-time-range-title-text-color` | 公开 | `var(--mp-picker-title-text-color, #555)` | 本组件 CSS<br>`color` |
| `--mp-time-range-toolbar-height` | 公开 | `var(--mp-picker-toolbar-height, 44px)` | 本组件 CSS<br>`height` |
| `--mp-time-range-toolbar-padding` | 公开 | `var(--mp-picker-toolbar-padding, 0 4px)` | 本组件 CSS<br>`padding` |

</div>

## timeline

声明来源: `src/timeline/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-timeline-alternate-horizontal-min-height` | 公开 | `200px` | 本组件 CSS<br>`min-height` |
| `--mp-timeline-content-text-color` | 公开 | `var(--mp-color-text-1)` | 本组件 CSS<br>`color` |
| `--mp-timeline-dot-bg` | 公开 | `rgb(var(--mp-primary-6))` | 本组件 CSS<br>`background-color`, `border`, `color` |
| `--mp-timeline-dot-bg-hollow` | 公开 | `var(--mp-color-bg-2)` | 本组件 CSS<br>`background-color` |
| `--mp-timeline-dot-border-radius` | 公开 | `50%` | 本组件 CSS<br>`border-radius` |
| `--mp-timeline-dot-border-width-hollow` | 公开 | `2px` | 本组件 CSS<br>`border` |
| `--mp-timeline-dot-size-width` | 公开 | `6px` | 本组件 CSS<br>`bottom`, `height`, `inset-inline-start`, `left`, `margin-left`, `margin-top`, `padding-bottom`, `padding-left`, `padding-right`, `padding-top`, `top`, `width` |
| `--mp-timeline-font-content-size` | 公开 | `var(--mp-font-size-md)` | 本组件 CSS<br>`bottom`, `font-size`, `height`, `line-height`, `top` |
| `--mp-timeline-font-label-size` | 公开 | `var(--mp-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-timeline-horizontal-dot-content-height` | 公开 | `6px` | 本组件 CSS<br>`height`, `line-height` |
| `--mp-timeline-horizontal-margin-content-spacing` | 公开 | `16px` | 本组件 CSS<br>`margin-bottom`, `margin-top`, `padding-bottom`, `padding-top` |
| `--mp-timeline-horizontal-margin-line-left` | 公开 | `6px` | 本组件 CSS<br>`inset-inline-start` |
| `--mp-timeline-horizontal-margin-line-right` | 公开 | `4px` | 本组件 CSS<br>`inset-inline-end` |
| `--mp-timeline-item-min-height` | 公开 | `78px` | 本组件 CSS<br>`min-height` |
| `--mp-timeline-label-relative-horizontal-margin` | 公开 | `52px` | 本组件 CSS<br>`margin-bottom`, `margin-top` |
| `--mp-timeline-label-relative-margin` | 公开 | `100px` | 本组件 CSS<br>`margin-left`, `margin-right` |
| `--mp-timeline-label-relative-max-width` | 公开 | `100px` | 本组件 CSS<br>`max-width` |
| `--mp-timeline-label-text-color` | 公开 | `var(--mp-color-text-3)` | 本组件 CSS<br>`color` |
| `--mp-timeline-line-bg` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border-color` |
| `--mp-timeline-size-line-width` | 公开 | `1px` | 本组件 CSS<br>`border-left-width`, `border-top-width`, `height`, `width` |
| `--mp-timeline-vertical-margin-content-bottom` | 公开 | `4px` | 本组件 CSS<br>`margin-bottom` |
| `--mp-timeline-vertical-margin-content-left` | 公开 | `16px` | 本组件 CSS<br>`margin-left`, `margin-right`, `padding-left`, `padding-right` |
| `--mp-timeline-vertical-margin-line-bottom` | 公开 | `4px` | 本组件 CSS<br>`bottom` |
| `--mp-timeline-vertical-margin-line-top` | 公开 | `4px` | 本组件 CSS<br>`top` |

</div>

## tooltip

声明来源: `src/tooltip/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-tooltip-animation-duration` | 公开 | `var(--mp-sys-motion-duration-standard)` | 本组件 CSS<br>`transition` |
| `--mp-tooltip-background` | 公开 | `var(--mp-sys-color-surface-tooltip)` | 本组件 CSS<br>`background-color` |
| `--mp-tooltip-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-tooltip-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-tooltip-line-height` | 公开 | `var(--mp-line-height)` | 本组件 CSS<br>`line-height` |
| `--mp-tooltip-max-width` | 公开 | `350px` | 本组件 CSS<br>`max-width` |
| `--mp-tooltip-opacity` | 公开 | `1` | 本组件 CSS<br>`opacity` |
| `--mp-tooltip-padding-horizontal` | 公开 | `var(--mp-sys-space-6)` | 本组件 CSS<br>`padding` |
| `--mp-tooltip-padding-vertical` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`padding` |
| `--mp-tooltip-size-xs-font-size` | 公开 | `var(--mp-sys-font-size-xs)` | 本组件 CSS<br>`font-size` |
| `--mp-tooltip-size-xs-padding-horizontal` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`padding` |
| `--mp-tooltip-size-xs-padding-vertical` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`padding` |
| `--mp-tooltip-status-danger-background` | 公开 | `var(--mp-sys-color-status-danger)` | 本组件 CSS<br>`background-color` |
| `--mp-tooltip-status-danger-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-tooltip-status-info-background` | 公开 | `var(--mp-sys-color-status-info)` | 本组件 CSS<br>`background-color` |
| `--mp-tooltip-status-info-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-tooltip-status-primary-background` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`background-color` |
| `--mp-tooltip-status-primary-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-tooltip-status-success-background` | 公开 | `var(--mp-sys-color-status-success)` | 本组件 CSS<br>`background-color` |
| `--mp-tooltip-status-success-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-tooltip-status-warning-background` | 公开 | `var(--mp-sys-color-status-warning)` | 本组件 CSS<br>`background-color` |
| `--mp-tooltip-status-warning-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-tooltip-text-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |

</div>

## trigger

声明来源: `src/trigger/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-trigger-arrow-background` | 公开 | `var(--mp-sys-color-surface-overlay)` | 本组件 CSS<br>`background-color` |
| `--mp-trigger-arrow-radius` | 公开 | `var(--mp-sys-radius-sm)` | 本组件 CSS<br>`border-radius` |
| `--mp-trigger-arrow-size` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`height`, `width` |
| `--mp-trigger-transition-duration` | 公开 | `var(--mp-sys-motion-duration-fast)` | 本组件 CSS<br>`transition` |
| `--mp-trigger-transition-easing` | 公开 | `var(--mp-sys-motion-easing-standard)` | 本组件 CSS<br>`transition` |

</div>

## upload

声明来源: `src/upload/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-internal-upload-caption-background` | 内部 | `rgba(0, 0, 0, 0.72)` | 本组件 CSS<br>`background` |
| `--mp-upload-action-size` | 公开 | `var(--mp-sys-control-touch-target)` | 本组件 CSS<br>`height`, `width` |
| `--mp-upload-active-color` | 公开 | `var(--mp-sys-color-action-primary)` | 本组件 CSS<br>`accent-color`, `border-color`, `outline` |
| `--mp-upload-background` | 公开 | `var(--mp-sys-color-surface-default)` | 本组件 CSS<br>`background` |
| `--mp-upload-border-color` | 公开 | `var(--mp-sys-color-border-default)` | 本组件 CSS<br>`border` |
| `--mp-upload-border-radius` | 公开 | `var(--mp-sys-radius-md)` | 本组件 CSS<br>`border-radius` |
| `--mp-upload-card-size` | 公开 | `calc(var(--mp-sys-control-height-md) * 2)` | 本组件 CSS<br>`height`, `min-height`, `width` |
| `--mp-upload-disabled-opacity` | 公开 | `0.56` | 本组件 CSS<br>`opacity` |
| `--mp-upload-duration-background` | 公开 | `var(--mp-sys-color-surface-tooltip)` | 本组件 CSS<br>`background` |
| `--mp-upload-duration-color` | 公开 | `var(--mp-sys-color-content-on-dark)` | 本组件 CSS<br>`color` |
| `--mp-upload-duration-font-size` | 公开 | `var(--mp-sys-font-size-sm)` | 本组件 CSS<br>`font-size` |
| `--mp-upload-duration-padding` | 公开 | `var(--mp-sys-space-1) var(--mp-sys-space-2)` | 本组件 CSS<br>`padding` |
| `--mp-upload-duration-radius` | 公开 | `var(--mp-sys-radius-sm)` | 本组件 CSS<br>`border-radius` |
| `--mp-upload-error-color` | 公开 | `var(--mp-sys-color-content-danger)` | 本组件 CSS<br>`color` |
| `--mp-upload-font-size` | 公开 | `var(--mp-sys-font-size-md)` | 本组件 CSS<br>`font-size` |
| `--mp-upload-gap` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`gap` |
| `--mp-upload-hover-background` | 公开 | `var(--mp-sys-color-state-hover)` | 本组件 CSS<br>`background` |
| `--mp-upload-item-min-height` | 公开 | `var(--mp-sys-control-height-md)` | 本组件 CSS<br>`min-height` |
| `--mp-upload-item-padding` | 公开 | `var(--mp-sys-space-4)` | 本组件 CSS<br>`padding` |
| `--mp-upload-progress-height` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`height` |
| `--mp-upload-secondary-text-color` | 公开 | `var(--mp-sys-color-content-secondary)` | 本组件 CSS<br>`color` |
| `--mp-upload-text-color` | 公开 | `var(--mp-sys-color-content-primary)` | 本组件 CSS<br>`color` |
| `--mp-upload-thumb-size` | 公开 | `var(--mp-sys-control-height-lg)` | 本组件 CSS<br>`height`, `width` |
| `--mp-upload-trigger-draggable-min-height` | 公开 | `calc(var(--mp-sys-control-height-md) * 2)` | 本组件 CSS<br>`min-height` |
| `--mp-upload-trigger-min-height` | 公开 | `var(--mp-sys-control-height-md)` | 本组件 CSS<br>`min-height` |
| `--mp-upload-trigger-padding-horizontal` | 公开 | `var(--mp-sys-space-6)` | 本组件 CSS<br>`padding-inline` |

</div>

## verification-code

声明来源: `src/verification-code/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-verification-code-cell-height` | 公开 | `initial` | 本组件 CSS<br>`height` |
| `--mp-verification-code-cell-max-width` | 公开 | `initial` | 本组件 CSS<br>`flex` |
| `--mp-verification-code-gutter` | 公开 | `var(--mp-sys-space-2)` | 本组件 CSS<br>`gap` |
| `--mp-verification-code-input-font-size` | 公开 | `initial` | 本组件 CSS<br>`font-size` |

</div>

## watermark

声明来源: `src/watermark/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 层级 | 声明值／条件 | 消费路径／CSS 属性 |
| --- | --- | --- | --- |
| `--mp-watermark-content-color` | 公开 | `rgba(0, 0, 0, 0.15)` | 运行时引用（不代表可见性证明）<br>`watermark/watermark.tsx` |

</div>
