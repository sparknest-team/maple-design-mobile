# Maple Component CSS Variable Reference

Generated from compiled component token declarations. Do not edit tables by hand: run `node bin/token-catalog.mjs --patch` in design-ui and apply the patch; `--check` detects drift.

Use this alongside Design Tokens and CSS Variable Layers: this reference lists exact names, declaration values and consumption evidence, not a claim that all components passed visual acceptance. Values are declarations, not computed pixels; multiple values retain their selector conditions. Runtime theme objects and inline props can override them. Foundation/system roles are explained in the design guide, not duplicated as component APIs here.

Public variables may be overridden on the rendered component root or the real popup ancestor. Internal variables are implementation details and must not be used by applications. Size/variant/status/loading/disabled govern when a token is used; declaration does not imply every state consumes it. CSS property lists describe transitive compiled reachability, not selector visibility or precedence.

## _components/field-presentation

Source: `src/_components/field-presentation/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-field-presentation-border` | Internal | `var(--mp-color-border-2)` | Local CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-field-presentation-close-font-size` | Internal | `24px` | Local CSS<br>`font-size` |
| `--mp-field-presentation-close-size` | Internal | `32px` | Local CSS<br>`height`, `width` |
| `--mp-field-presentation-divider-width` | Internal | `1px` | Local CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-field-presentation-gap` | Internal | `var(--mp-sys-space-3)` | Local CSS<br>`gap`, `margin-bottom`, `margin-top`, `padding-bottom`, `padding-top` |
| `--mp-field-presentation-max-height` | Internal | `60vh` | Local CSS<br>`max-height` |
| `--mp-field-presentation-min-width` | Internal | `280px` | Local CSS<br>`min-width` |
| `--mp-field-presentation-padding` | Internal | `var(--mp-sys-space-4)` | Local CSS<br>`margin-inline`, `max-width`, `padding`, `padding-block`, `padding-bottom`, `padding-left`, `padding-right` |
| `--mp-field-presentation-radius` | Internal | `8px` | Local CSS<br>`border-radius` |
| `--mp-field-presentation-read-text-align` | Internal | `end` | Local CSS<br>`text-align` |
| `--mp-field-presentation-shadow` | Internal | `0 8px 28px rgba(0, 0, 0, 0.12)` | Local CSS<br>`box-shadow` |
| `--mp-field-presentation-title-font-size` | Internal | `16px` | Local CSS<br>`font-size` |
| `--mp-field-presentation-title-font-weight` | Internal | `500` | Local CSS<br>`font-weight` |
| `--mp-field-presentation-viewport-max-height` | Internal | `90dvh` | Local CSS<br>`max-height` |

</div>

## _components/picker-field

Source: `src/_components/picker-field/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-picker-field-gap` | Internal | `8px` | Local CSS<br>`gap` |
| `--mp-picker-field-input-min-width` | Internal | `3em` | Local CSS<br>`min-width` |

</div>

## _components/selected-options

Source: `src/_components/selected-options/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-selected-options-background` | Internal | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background` |
| `--mp-selected-options-border` | Internal | `var(--mp-color-border-2)` | Local CSS<br>`border-bottom` |
| `--mp-selected-options-clear-color` | Internal | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-selected-options-details-max-height` | Internal | `50dvh` | Local CSS<br>`max-height` |
| `--mp-selected-options-disabled-opacity` | Internal | `0.5` | Local CSS<br>`opacity` |
| `--mp-selected-options-gap` | Internal | `8px` | Local CSS<br>`gap` |
| `--mp-selected-options-padding` | Internal | `8px 12px` | Local CSS<br>`padding` |
| `--mp-selected-options-radius` | Internal | `4px` | Local CSS<br>`border-radius` |
| `--mp-selected-options-remove-size` | Internal | `24px` | Local CSS<br>`height`, `width` |
| `--mp-selected-options-tag-padding` | Internal | `2px 6px` | Local CSS<br>`padding` |
| `--mp-selected-options-tags-max-height` | Internal | `112px` | Local CSS<br>`max-height` |
| `--mp-selection-editor-accent` | Internal | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-selection-editor-background` | Internal | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background` |
| `--mp-selection-editor-border` | Internal | `var(--mp-color-border-2)` | Local CSS<br>`border-bottom`, `border-inline-end` |
| `--mp-selection-editor-check-size` | Internal | `20px` | Local CSS<br>`height`, `width` |
| `--mp-selection-editor-color` | Internal | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-selection-editor-dialog-height` | Internal | `min(30dvh, 260px)` | Local CSS<br>`height`, `min-height` |
| `--mp-selection-editor-font-size` | Internal | `14px` | Local CSS<br>`font-size` |
| `--mp-selection-editor-gap` | Internal | `8px` | Local CSS<br>`gap`, `margin-inline-end`, `padding` |
| `--mp-selection-editor-height` | Internal | `min(40dvh, 320px)` | Local CSS<br>`height`, `min-height` |
| `--mp-selection-editor-muted-background` | Internal | `var(--mp-color-fill-1)` | Local CSS<br>`background` |
| `--mp-selection-editor-muted-color` | Internal | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-selection-editor-option-radius` | Internal | `0` | Local CSS<br>`border-radius` |
| `--mp-selection-editor-padding` | Internal | `12px` | Local CSS<br>`margin-block`, `padding` |
| `--mp-selection-editor-path-height` | Internal | `44px` | Local CSS<br>`min-height` |
| `--mp-selection-editor-radius` | Internal | `8px` | Local CSS<br>`border-radius` |
| `--mp-selection-editor-row-height` | Internal | `42px` | Local CSS<br>`min-height` |
| `--mp-selection-editor-selected-background` | Internal | `var(--mp-sys-color-state-selected)` | Local CSS<br>`background` |
| `--mp-selection-editor-touch-font-size` | Internal | `16px` | Local CSS<br>`font-size` |
| `--mp-selection-editor-touch-height` | Internal | `52px` | Local CSS<br>`min-height` |
| `--mp-selection-editor-width` | Internal | `640px` | Local CSS<br>`width` |

</div>

## _components/selection-field/presentation

Source: `src/_components/selection-field/presentation/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-selection-presentation-bg` | Internal | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background` |
| `--mp-selection-presentation-max-height` | Internal | `65vh` | Local CSS<br>`max-height` |
| `--mp-selection-presentation-padding` | Internal | `var(--mp-sys-space-5)` | Local CSS<br>`padding` |

</div>

## _components/selection-field

Source: `src/_components/selection-field/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-selection-field-gap` | Internal | `4px` | Local CSS<br>`gap` |
| `--mp-selection-field-icon-transition-duration` | Internal | `0.2s` | Local CSS<br>`transition` |
| `--mp-selection-field-input-min-width` | Internal | `2px` | Local CSS<br>`flex-basis`, `min-width` |
| `--mp-selection-field-loading-duration` | Internal | `1s` | Local CSS<br>`animation` |
| `--mp-selection-field-search-min-width` | Internal | `3em` | Local CSS<br>`flex`, `min-width` |

</div>

## _components/selection-scrollbar

Source: `src/_components/selection-scrollbar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-scrollbar-thumb-bar-bg-color` | Internal | `var(--mp-sys-color-border-default)` | Local CSS<br>`background-color` |
| `--mp-scrollbar-thumb-bar-bg-color-hover` | Internal | `var(--mp-sys-color-border-strong)` | Local CSS<br>`background-color` |
| `--mp-scrollbar-thumb-bar-border-radius` | Internal | `6px` | Local CSS<br>`border-radius` |
| `--mp-scrollbar-thumb-bar-size` | Internal | `9px` | Local CSS<br>`height`, `margin`, `width` |
| `--mp-scrollbar-track-bg-color` | Internal | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color` |
| `--mp-scrollbar-track-border-color` | Internal | `var(--mp-sys-color-border-subtle)` | Local CSS<br>`border-bottom`, `border-left`, `border-right`, `border-top` |
| `--mp-scrollbar-track-border-size` | Internal | `1px` | Local CSS<br>`border-bottom`, `border-left`, `border-right`, `border-top`, `margin`, `right` |
| `--mp-scrollbar-track-size` | Internal | `15px` | Local CSS<br>`height`, `margin`, `width` |

</div>

## _components/temporal-panel

Source: `src/_components/temporal-panel/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-internal-temporal-panel-active-background` | Internal | `color-mix(in srgb, var(--mp-sys-color-action-primary) 8%, transparent)` | Local CSS<br>`background` |
| `--mp-internal-temporal-panel-column-label-font-size` | Internal | `13px` | Cross-component CSS<br>`font-size` |
| `--mp-internal-temporal-panel-column-label-height` | Internal | `36px` | Cross-component CSS<br>`height` |
| `--mp-internal-temporal-panel-group-gap` | Internal | `24px` | Cross-component CSS<br>`margin-inline-end`, `width` |
| `--mp-internal-temporal-panel-inset` | Internal | `12px` | Local CSS<br>`flex`, `margin`, `margin-inline`, `margin-inline-end`, `padding`, `padding-inline`, `width` |
| `--mp-internal-temporal-panel-quick-time-width` | Internal | `84px` | Cross-component CSS<br>`flex`, `width` |
| `--mp-internal-temporal-panel-radius` | Internal | `12px` | Local CSS<br>`border-radius` |
| `--mp-internal-temporal-panel-selection-background` | Internal | `var(--mp-color-fill-2)` | Cross-component CSS<br>`background` |
| `--mp-internal-temporal-panel-summary-active-background` | Internal | `var(--mp-sys-color-surface-overlay)` | Cross-component CSS<br>`background` |
| `--mp-internal-temporal-panel-summary-active-color` | Internal | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-internal-temporal-panel-summary-background` | Internal | `var(--mp-color-fill-1)` | Cross-component CSS<br>`background` |
| `--mp-internal-temporal-panel-summary-height` | Internal | `56px` | Cross-component CSS<br>`min-height` |
| `--mp-internal-temporal-panel-summary-separator-stroke` | Internal | `1px` | Local CSS<br>`border-block-start`, `outline` |
| `--mp-internal-temporal-panel-summary-separator-width` | Internal | `4px` | Cross-component CSS<br>`gap` |
| `--mp-internal-temporal-panel-touch-height` | Internal | `44px` | Local CSS<br>`height`, `min-height`, `width` |

</div>

## action-sheet

Source: `src/action-sheet/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-action-sheet-action-item-color` | Public | `#333` | Local CSS<br>`color` |
| `--mp-action-sheet-action-item-disabled-color` | Public | `var(--mp-color-text-disabled)` | Local CSS<br>`color` |
| `--mp-action-sheet-action-item-height` | Public | `48px` | Local CSS<br>`height`, `max-height` |
| `--mp-action-sheet-action-item-padding` | Public | `0 18px` | Local CSS<br>`padding` |
| `--mp-action-sheet-background` | Public | `#fff` | Local CSS<br>`background` |
| `--mp-action-sheet-border-radius` | Public | `2px` | Local CSS<br>`border-radius` |
| `--mp-action-sheet-border-top` | Public | `none` | Local CSS<br>`border-top` |
| `--mp-action-sheet-icon-margin` | Public | `0 20px 0 0` | Local CSS<br>`margin` |
| `--mp-action-sheet-icon-size` | Public | `24px` | Local CSS<br>`font-size`, `height`, `width` |
| `--mp-action-sheet-title-color` | Public | `#888` | Local CSS<br>`color` |
| `--mp-action-sheet-title-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-action-sheet-title-padding` | Public | `10px 16px` | Local CSS<br>`padding` |

</div>

## alert

Source: `src/alert/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-alert-action-margin-left` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`margin-inline-start` |
| `--mp-alert-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-alert-border-width` | Public | `1px` | Local CSS<br>`border` |
| `--mp-alert-close-duration` | Public | `var(--mp-sys-motion-duration-slow)` | Local CSS<br>`transition` |
| `--mp-alert-close-margin-left` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-inline-start` |
| `--mp-alert-font-size-content` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-alert-font-size-title` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-alert-font-weight-title` | Public | `var(--mp-sys-font-weight-medium)` | Local CSS<br>`font-weight` |
| `--mp-alert-icon-margin-right` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-inline-end` |
| `--mp-alert-icon-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-alert-line-height` | Public | `1.5715` | Local CSS<br>`line-height` |
| `--mp-alert-line-height-title` | Public | `1.5` | Local CSS<br>`line-height` |
| `--mp-alert-outline-danger-border` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`border-color` |
| `--mp-alert-outline-danger-content` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-alert-outline-danger-icon` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-alert-outline-danger-title` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-alert-outline-default-border` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-color` |
| `--mp-alert-outline-default-content` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-alert-outline-default-icon` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-alert-outline-default-title` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-alert-outline-info-border` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`border-color` |
| `--mp-alert-outline-info-content` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-alert-outline-info-icon` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-alert-outline-info-title` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-alert-outline-success-border` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`border-color` |
| `--mp-alert-outline-success-content` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-alert-outline-success-icon` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-alert-outline-success-title` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-alert-outline-warning-border` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`border-color` |
| `--mp-alert-outline-warning-content` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-alert-outline-warning-icon` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-alert-outline-warning-title` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-alert-padding-horizontal` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`padding` |
| `--mp-alert-padding-horizontal-with-title` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`padding` |
| `--mp-alert-padding-vertical` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-alert-padding-vertical-with-title` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`padding` |
| `--mp-alert-standard-danger-bg` | Public | `rgb(var(--mp-danger-1))` | Local CSS<br>`background-color` |
| `--mp-alert-standard-danger-border` | Public | `rgb(var(--mp-danger-3))` | Local CSS<br>`border-color` |
| `--mp-alert-standard-danger-content` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-alert-standard-danger-icon` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-alert-standard-danger-title` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-alert-standard-default-bg` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background-color` |
| `--mp-alert-standard-default-border` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-color` |
| `--mp-alert-standard-default-content` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-alert-standard-default-icon` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-alert-standard-default-title` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-alert-standard-info-bg` | Public | `rgb(var(--mp-blue-1))` | Local CSS<br>`background-color` |
| `--mp-alert-standard-info-border` | Public | `rgb(var(--mp-blue-3))` | Local CSS<br>`border-color` |
| `--mp-alert-standard-info-content` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-alert-standard-info-icon` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-alert-standard-info-title` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-alert-standard-success-bg` | Public | `rgb(var(--mp-success-1))` | Local CSS<br>`background-color` |
| `--mp-alert-standard-success-border` | Public | `rgb(var(--mp-success-3))` | Local CSS<br>`border-color` |
| `--mp-alert-standard-success-content` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-alert-standard-success-icon` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-alert-standard-success-title` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-alert-standard-warning-bg` | Public | `rgb(var(--mp-warning-1))` | Local CSS<br>`background-color` |
| `--mp-alert-standard-warning-border` | Public | `rgb(var(--mp-warning-3))` | Local CSS<br>`border-color` |
| `--mp-alert-standard-warning-content` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-alert-standard-warning-icon` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-alert-standard-warning-title` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-alert-title-margin-bottom` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`margin-bottom` |
| `--mp-alert-tonal-danger-bg` | Public | `rgb(var(--mp-danger-1))` | Local CSS<br>`background-color` |
| `--mp-alert-tonal-danger-content` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-alert-tonal-danger-icon` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-alert-tonal-danger-title` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-alert-tonal-default-bg` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background-color` |
| `--mp-alert-tonal-default-content` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-alert-tonal-default-icon` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-alert-tonal-default-title` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-alert-tonal-info-bg` | Public | `rgb(var(--mp-blue-1))` | Local CSS<br>`background-color` |
| `--mp-alert-tonal-info-content` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-alert-tonal-info-icon` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-alert-tonal-info-title` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-alert-tonal-success-bg` | Public | `rgb(var(--mp-success-1))` | Local CSS<br>`background-color` |
| `--mp-alert-tonal-success-content` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-alert-tonal-success-icon` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-alert-tonal-success-title` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-alert-tonal-warning-bg` | Public | `rgb(var(--mp-warning-1))` | Local CSS<br>`background-color` |
| `--mp-alert-tonal-warning-content` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-alert-tonal-warning-icon` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-alert-tonal-warning-title` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |

</div>

## auto-complete

Source: `src/auto-complete/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-auto-complete-option-bg-default` | Public | `var(--mp-select-popup-option-bg)` | Local CSS<br>`background-color` |
| `--mp-auto-complete-option-bg-disabled` | Public | `var(--mp-select-popup-option-bg-disabled)` | Local CSS<br>`background-color` |
| `--mp-auto-complete-option-bg-hover` | Public | `var(--mp-select-popup-option-bg-hover)` | Local CSS<br>`background-color` |
| `--mp-auto-complete-option-bg-selected` | Public | `var(--mp-select-popup-option-bg-selected)` | Local CSS<br>`background-color` |
| `--mp-auto-complete-option-font-weight-selected` | Public | `var(--mp-select-popup-option-font-weight-selected)` | Local CSS<br>`font-weight` |
| `--mp-auto-complete-option-height` | Public | `var(--mp-select-popup-option-height)` | Local CSS<br>`line-height` |
| `--mp-auto-complete-option-padding-horizontal` | Public | `var(--mp-select-popup-option-padding-horizontal)` | Local CSS<br>`padding-inline` |
| `--mp-auto-complete-option-text-color-default` | Public | `var(--mp-select-popup-option-text-color)` | Local CSS<br>`color` |
| `--mp-auto-complete-option-text-color-disabled` | Public | `var(--mp-select-popup-option-text-color-disabled)` | Local CSS<br>`color` |
| `--mp-auto-complete-option-text-color-hover` | Public | `var(--mp-select-popup-option-text-color-hover)` | Local CSS<br>`color` |
| `--mp-auto-complete-option-text-color-selected` | Public | `var(--mp-select-popup-option-text-color-selected)` | Local CSS<br>`color` |
| `--mp-auto-complete-popup-bg` | Public | `var(--mp-select-popup-bg)` | Local CSS<br>`background-color` |
| `--mp-auto-complete-popup-border-color` | Public | `var(--mp-select-popup-border-color)` | Local CSS<br>`border` |
| `--mp-auto-complete-popup-border-radius` | Public | `var(--mp-select-popup-border-radius)` | Local CSS<br>`border-radius` |
| `--mp-auto-complete-popup-box-shadow` | Public | `var(--mp-select-popup-box-shadow)` | Local CSS<br>`box-shadow` |
| `--mp-auto-complete-popup-font-size` | Public | `var(--mp-select-popup-font-size)` | Local CSS<br>`font-size` |
| `--mp-auto-complete-popup-max-height` | Public | `var(--mp-select-popup-max-height)` | Local CSS<br>`max-height` |
| `--mp-auto-complete-popup-padding-vertical` | Public | `var(--mp-select-popup-padding-vertical)` | Local CSS<br>`padding-block` |

</div>

## avatar

Source: `src/avatar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-avatar-bg` | Public | `var(--mp-color-fill-4)` | Local CSS<br>`background-color` |
| `--mp-avatar-border-color` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`border` |
| `--mp-avatar-border-width` | Public | `2px` | Local CSS<br>`border` |
| `--mp-avatar-circle-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-avatar-font-size-max-count` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-avatar-font-size-text` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-avatar-font-weight-text` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-avatar-group-item-border` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`border` |
| `--mp-avatar-group-item-border-width` | Public | `2px` | Local CSS<br>`border` |
| `--mp-avatar-group-offset` | Public | `-10px` | Local CSS<br>`margin-block-start`, `margin-inline-start` |
| `--mp-avatar-group-popover-item-spacing` | Public | `8px` | Local CSS<br>`gap` |
| `--mp-avatar-hover-transform` | Public | `scale(1.1)` | Local CSS<br>`transform` |
| `--mp-avatar-max-count-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-avatar-motion-duration` | Public | `0.2s` | Local CSS<br>`transition` |
| `--mp-avatar-size-default` | Public | `40px` | Local CSS<br>`height`, `width` |
| `--mp-avatar-size-trigger-button` | Public | `20px` | Local CSS<br>`height`, `width` |
| `--mp-avatar-size-trigger-icon` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-avatar-spacing-trigger-button-bottom` | Public | `4px` | Local CSS<br>`bottom` |
| `--mp-avatar-spacing-trigger-button-right` | Public | `4px` | Local CSS<br>`inset-inline-end` |
| `--mp-avatar-square-border-radius` | Public | `4px` | Local CSS<br>`border-radius` |
| `--mp-avatar-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-avatar-text-padding-inline` | Public | `4px` | Local CSS<br>`padding-inline` |
| `--mp-avatar-trigger-button-bg` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background-color` |
| `--mp-avatar-trigger-button-bg-hover` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background-color` |
| `--mp-avatar-trigger-button-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-avatar-trigger-icon-button` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-avatar-trigger-overlay-bg` | Public | `color-mix(in srgb, var(--mp-color-black) 60%, transparent)` | Local CSS<br>`background-color` |
| `--mp-avatar-trigger-overlay-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-avatar-trigger-overlay-icon` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-avatar-z-index-overlay` | Public | `0` | Local CSS<br>`z-index` |
| `--mp-avatar-z-index-overlay-hover` | Public | `2` | Local CSS<br>`z-index` |
| `--mp-avatar-z-index-trigger` | Public | `1` | Local CSS<br>`z-index` |

</div>

## back-top

Source: `src/back-top/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-back-top-background` | Public | `var(--mp-sys-color-surface-raised)` | Local CSS<br>`background` |
| `--mp-back-top-bottom` | Public | `40px` | Local CSS<br>`bottom` |
| `--mp-back-top-button-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-back-top-button-size` | Public | `var(--mp-sys-control-touch-target)` | Local CSS<br>`height`, `width` |
| `--mp-back-top-focus-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`outline` |
| `--mp-back-top-focus-offset` | Public | `2px` | Local CSS<br>`outline-offset` |
| `--mp-back-top-focus-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-back-top-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-back-top-hover-background` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-back-top-icon-size` | Public | `20px` | Local CSS<br>`height`, `width` |
| `--mp-back-top-right` | Public | `40px` | Local CSS<br>`right` |
| `--mp-back-top-text-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-back-top-z-index` | Public | `var(--mp-z-index-local-sticky)` | Local CSS<br>`z-index` |

</div>

## badge

Source: `src/badge/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-badge-bg-color` | Public | `rgb(var(--mp-danger-7))` | Local CSS<br>`background-color` |
| `--mp-badge-border-color` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background-color`, `box-shadow` |
| `--mp-badge-description-size-lg-font-size` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-badge-description-size-md-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-badge-description-size-sm-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-badge-description-size-xl-font-size` | Public | `var(--mp-sys-font-size-xl)` | Local CSS<br>`font-size` |
| `--mp-badge-description-size-xs-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-badge-description-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-badge-font-weight` | Public | `var(--mp-sys-font-weight-medium)` | Local CSS<br>`font-weight` |
| `--mp-badge-offset` | Public | `2px` | Local CSS<br>`bottom`, `left`, `right`, `top` |
| `--mp-badge-ring-width` | Public | `2px` | Local CSS<br>`box-shadow`, `line-height` |
| `--mp-badge-size-lg-border-radius` | Public | `28px` | Local CSS<br>`border-radius` |
| `--mp-badge-size-lg-dot-height` | Public | `7px` | Local CSS<br>`height` |
| `--mp-badge-size-lg-dot-width` | Public | `7px` | Local CSS<br>`width` |
| `--mp-badge-size-lg-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-badge-size-lg-height` | Public | `28px` | Local CSS<br>`line-height`, `min-width` |
| `--mp-badge-size-lg-padding` | Public | `0 var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-badge-size-lg-scale` | Public | `1` | Local CSS<br>`transform` |
| `--mp-badge-size-lg-space` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`margin-inline` |
| `--mp-badge-size-md-border-radius` | Public | `24px` | Local CSS<br>`border-radius` |
| `--mp-badge-size-md-dot-height` | Public | `6px` | Local CSS<br>`height` |
| `--mp-badge-size-md-dot-width` | Public | `6px` | Local CSS<br>`width` |
| `--mp-badge-size-md-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-badge-size-md-height` | Public | `24px` | Local CSS<br>`line-height`, `min-width` |
| `--mp-badge-size-md-padding` | Public | `0 var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-badge-size-md-scale` | Public | `1` | Local CSS<br>`transform` |
| `--mp-badge-size-md-space` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`margin-inline` |
| `--mp-badge-size-sm-border-radius` | Public | `20px` | Local CSS<br>`border-radius` |
| `--mp-badge-size-sm-dot-height` | Public | `5px` | Local CSS<br>`height` |
| `--mp-badge-size-sm-dot-width` | Public | `5px` | Local CSS<br>`width` |
| `--mp-badge-size-sm-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-badge-size-sm-height` | Public | `20px` | Local CSS<br>`line-height`, `min-width` |
| `--mp-badge-size-sm-padding` | Public | `0 var(--mp-sys-space-3)` | Local CSS<br>`padding` |
| `--mp-badge-size-sm-scale` | Public | `0.8333` | Local CSS<br>`transform` |
| `--mp-badge-size-sm-space` | Public | `var(--mp-sys-space-1)` | Local CSS<br>`margin-inline` |
| `--mp-badge-size-xl-border-radius` | Public | `32px` | Local CSS<br>`border-radius` |
| `--mp-badge-size-xl-dot-height` | Public | `8px` | Local CSS<br>`height` |
| `--mp-badge-size-xl-dot-width` | Public | `8px` | Local CSS<br>`width` |
| `--mp-badge-size-xl-font-size` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-badge-size-xl-height` | Public | `32px` | Local CSS<br>`line-height`, `min-width` |
| `--mp-badge-size-xl-padding` | Public | `0 10px` | Local CSS<br>`padding` |
| `--mp-badge-size-xl-scale` | Public | `1` | Local CSS<br>`transform` |
| `--mp-badge-size-xl-space` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-inline` |
| `--mp-badge-size-xs-border-radius` | Public | `20px` | Local CSS<br>`border-radius` |
| `--mp-badge-size-xs-dot-height` | Public | `4px` | Local CSS<br>`height` |
| `--mp-badge-size-xs-dot-width` | Public | `4px` | Local CSS<br>`width` |
| `--mp-badge-size-xs-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-badge-size-xs-height` | Public | `20px` | Local CSS<br>`line-height`, `min-width` |
| `--mp-badge-size-xs-padding` | Public | `0 var(--mp-sys-space-3)` | Local CSS<br>`padding` |
| `--mp-badge-size-xs-scale` | Public | `0.6667` | Local CSS<br>`transform` |
| `--mp-badge-size-xs-space` | Public | `0px` | Local CSS<br>`margin-inline` |
| `--mp-badge-status-danger-bg-color` | Public | `rgb(var(--mp-danger-7))` | Local CSS<br>`background-color` |
| `--mp-badge-status-danger-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-badge-status-default-bg-color` | Public | `#e0e0e0` | Local CSS<br>`background-color` |
| `--mp-badge-status-default-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-badge-status-info-bg-color` | Public | `var(--mp-sys-color-status-info)` | Local CSS<br>`background-color` |
| `--mp-badge-status-info-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-badge-status-primary-bg-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-badge-status-primary-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-badge-status-secondary-bg-color` | Public | `rgb(var(--mp-gray-6))` | Local CSS<br>`background-color` |
| `--mp-badge-status-secondary-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-badge-status-success-bg-color` | Public | `var(--mp-sys-color-status-success)` | Local CSS<br>`background-color` |
| `--mp-badge-status-success-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-badge-status-tertiary-bg-color` | Public | `rgb(var(--mp-gray-7))` | Local CSS<br>`background-color` |
| `--mp-badge-status-tertiary-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-badge-status-warning-bg-color` | Public | `var(--mp-sys-color-status-warning)` | Local CSS<br>`background-color` |
| `--mp-badge-status-warning-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-badge-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-badge-variant-outline-bg-color` | Public | `transparent` | Local CSS<br>`background-color` |
| `--mp-badge-variant-outline-status-danger-text-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-default-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-info-text-color` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-primary-text-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-secondary-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-success-text-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-tertiary-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-status-warning-text-color` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`border`, `color` |
| `--mp-badge-variant-outline-text-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`border`, `color` |

</div>

## breadcrumb

Source: `src/breadcrumb/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-breadcrumb-bg` | Public | `transparent` | Local CSS<br>`background-color` |
| `--mp-breadcrumb-bg-hover` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background-color` |
| `--mp-breadcrumb-dropdown-icon` | Public | `var(--mp-breadcrumb-item-inactive-color)` | Local CSS<br>`color` |
| `--mp-breadcrumb-font-weight-active` | Public | `400` | Local CSS<br>`font-weight` |
| `--mp-breadcrumb-icon-color` | Public | `var(--mp-breadcrumb-item-inactive-color)` | Local CSS<br>`color` |
| `--mp-breadcrumb-item-active-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-breadcrumb-item-inactive-color` | Public | `var(--mp-color-text-2)` | Local CSS<br>`color` |
| `--mp-breadcrumb-item-separator-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-breadcrumb-item-separator-margin` | Public | `0 var(--mp-breadcrumb-margin-separator-horizontal)` | Local CSS<br>`margin` |
| `--mp-breadcrumb-link-text-color` | Public | `var(--mp-breadcrumb-item-active-color)` | Local CSS<br>`color` |
| `--mp-breadcrumb-link-text-color-hover` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-breadcrumb-margin-dropdown-icon-left` | Public | `4px` | Local CSS<br>`margin-inline-start` |
| `--mp-breadcrumb-margin-separator-horizontal` | Public | `10px` | Local CSS<br>`margin` |
| `--mp-breadcrumb-padding-text-horizontal` | Public | `0px` | Local CSS<br>`margin`, `padding` |
| `--mp-breadcrumb-separator-color` | Public | `var(--mp-breadcrumb-item-inactive-color)` | Local CSS<br>`color` |
| `--mp-breadcrumb-separator-font-size` | Public | `var(--mp-breadcrumb-item-separator-font-size)` | Local CSS<br>`font-size` |
| `--mp-breadcrumb-separator-margin` | Public | `var(--mp-breadcrumb-item-separator-margin)` | Local CSS<br>`margin` |
| `--mp-breadcrumb-size-dropdown-icon` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-breadcrumb-size-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-breadcrumb-size-text-height` | Public | `24px` | Local CSS<br>`line-height` |
| `--mp-breadcrumb-text-border-radius-hover` | Public | `var(--mp-sys-radius-sm)` | Local CSS<br>`border-radius` |
| `--mp-breadcrumb-text-color` | Public | `var(--mp-breadcrumb-item-inactive-color)` | Local CSS<br>`color` |
| `--mp-breadcrumb-text-color-active` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-breadcrumb-touch-target-size` | Public | `44px` | Local CSS<br>`min-height`, `min-width` |

</div>

## button

Source: `src/button/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-button-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-bottom-left-radius`, `border-bottom-right-radius`, `border-radius`, `border-top-left-radius`, `border-top-right-radius` |
| `--mp-button-content-gap` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`gap` |
| `--mp-button-danger-color` | Public | `var(--mp-sys-color-status-danger)` | Local CSS<br>`background-color`, `color` |
| `--mp-button-danger-disabled-color` | Public | `rgb(var(--mp-danger-3))`<br>`rgba(var(--mp-danger-6), 0.5)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color`, `color` |
| `--mp-button-danger-foreground-color` | Public | `var(--mp-button-danger-color)` | Local CSS<br>`color` |
| `--mp-button-danger-tonal-color` | Public | `rgb(var(--mp-danger-1))` | Local CSS<br>`background-color` |
| `--mp-button-default-color` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background-color` |
| `--mp-button-default-foreground-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`background`, `background-color`, `color` |
| `--mp-button-default-tonal-color` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color` |
| `--mp-button-disabled-color` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background-color` |
| `--mp-button-disabled-solid-text-color` | Public | `var(--mp-sys-color-content-on-dark)`<br>`rgba(255, 255, 255, 0.3)` (`:root[maple-theme='dark']`) | Local CSS<br>`color` |
| `--mp-button-disabled-text-color` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-button-focus-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`outline` |
| `--mp-button-info-color` | Public | `var(--mp-sys-color-status-info)` | Local CSS<br>`background-color`, `color` |
| `--mp-button-info-disabled-color` | Public | `rgb(var(--mp-blue-3))`<br>`rgba(var(--mp-blue-6), 0.5)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color`, `color` |
| `--mp-button-info-foreground-color` | Public | `var(--mp-button-info-color)` | Local CSS<br>`color` |
| `--mp-button-info-tonal-color` | Public | `rgb(var(--mp-blue-1))` | Local CSS<br>`background-color` |
| `--mp-button-lg-height` | Public | `56px` | Local CSS<br>`height`, `min-width`, `width` |
| `--mp-button-lg-padding` | Public | `0 var(--mp-sys-space-7)` | Local CSS<br>`padding` |
| `--mp-button-loading-duration` | Public | `1s` | Local CSS<br>`animation` |
| `--mp-button-loading-line-height` | Public | `3px` | Local CSS<br>`height` |
| `--mp-button-md-height` | Public | `48px` | Local CSS<br>`height`, `min-width`, `width` |
| `--mp-button-md-padding` | Public | `0 var(--mp-sys-space-6)` | Local CSS<br>`padding` |
| `--mp-button-plain-state-opacity-active` | Public | `1` | Local CSS<br>`opacity` |
| `--mp-button-plain-state-opacity-hover` | Public | `0.5` | Local CSS<br>`opacity` |
| `--mp-button-primary-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color`, `color` |
| `--mp-button-primary-disabled-color` | Public | `rgb(var(--mp-primary-3))`<br>`rgba(var(--mp-primary-6), 0.5)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color`, `color` |
| `--mp-button-primary-foreground-color` | Public | `var(--mp-button-primary-color)` | Local CSS<br>`color` |
| `--mp-button-primary-state-layer-color` | Public | `var(--mp-button-solid-state-layer-color)` | Local CSS<br>`background-color` |
| `--mp-button-primary-tonal-color` | Public | `rgb(var(--mp-primary-1))` | Local CSS<br>`background-color` |
| `--mp-button-secondary-color` | Public | `rgb(var(--mp-gray-6))` | Local CSS<br>`background-color` |
| `--mp-button-secondary-foreground-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-button-secondary-tonal-color` | Public | `rgb(var(--mp-gray-2))` | Local CSS<br>`background-color` |
| `--mp-button-sm-height` | Public | `40px` | Local CSS<br>`height`, `min-width`, `width` |
| `--mp-button-sm-padding` | Public | `0 var(--mp-sys-space-5)` | Local CSS<br>`padding` |
| `--mp-button-solid-state-layer-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`background-color` |
| `--mp-button-solid-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-button-stacked-gap` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`gap`, `min-height`, `min-width` |
| `--mp-button-state-layer-color` | Public | `var(--mp-sys-color-surface-page)` | Local CSS<br>`background-color` |
| `--mp-button-state-opacity-active` | Public | `0.12` | Local CSS<br>`opacity` |
| `--mp-button-state-opacity-hover` | Public | `0.08` | Local CSS<br>`opacity` |
| `--mp-button-success-color` | Public | `var(--mp-sys-color-status-success)` | Local CSS<br>`background-color`, `color` |
| `--mp-button-success-disabled-color` | Public | `rgb(var(--mp-success-3))`<br>`rgba(var(--mp-success-6), 0.5)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color`, `color` |
| `--mp-button-success-foreground-color` | Public | `var(--mp-button-success-color)` | Local CSS<br>`color` |
| `--mp-button-success-tonal-color` | Public | `rgb(var(--mp-success-1))` | Local CSS<br>`background-color` |
| `--mp-button-tertiary-color` | Public | `rgb(var(--mp-gray-7))` | Local CSS<br>`background-color` |
| `--mp-button-tertiary-foreground-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-button-tertiary-state-layer-color` | Public | `var(--mp-sys-color-content-on-bright)`<br>`var(--mp-sys-color-content-on-dark)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-button-tertiary-text-color` | Public | `var(--mp-sys-color-content-on-dark)`<br>`var(--mp-sys-color-content-on-bright)` (`:root[maple-theme='dark']`) | Local CSS<br>`color` |
| `--mp-button-tertiary-tonal-color` | Public | `rgb(var(--mp-gray-1))` | Local CSS<br>`background-color` |
| `--mp-button-warning-color` | Public | `var(--mp-sys-color-status-warning)` | Local CSS<br>`background-color`, `color` |
| `--mp-button-warning-disabled-color` | Public | `rgb(var(--mp-warning-3))`<br>`rgba(var(--mp-warning-6), 0.5)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color`, `color` |
| `--mp-button-warning-foreground-color` | Public | `var(--mp-button-warning-color)` | Local CSS<br>`color` |
| `--mp-button-warning-tonal-color` | Public | `rgb(var(--mp-warning-1))` | Local CSS<br>`background-color` |
| `--mp-button-xl-height` | Public | `64px` | Local CSS<br>`height`, `min-width`, `width` |
| `--mp-button-xl-padding` | Public | `0 var(--mp-sys-space-8)` | Local CSS<br>`padding` |
| `--mp-button-xs-height` | Public | `32px` | Local CSS<br>`height`, `min-width`, `width` |
| `--mp-button-xs-padding` | Public | `0 var(--mp-sys-space-4)` | Local CSS<br>`padding` |

</div>

## card

Source: `src/card/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-card-animation-duration` | Public | `var(--mp-sys-motion-duration-slow)` | Local CSS<br>`transition` |
| `--mp-card-animation-easing` | Public | `var(--mp-sys-motion-easing-standard)` | Local CSS<br>`transition-timing-function` |
| `--mp-card-background` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background` |
| `--mp-card-border-radius` | Public | `4px` | Local CSS<br>`border-radius` |
| `--mp-card-close-button-background` | Public | `#212121` | Local CSS<br>`background-color` |
| `--mp-card-close-button-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-card-close-button-icon-size` | Public | `24px` | Local CSS<br>`font-size` |
| `--mp-card-close-button-size` | Public | `56px` | Local CSS<br>`height`, `width` |
| `--mp-card-close-button-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-card-content-color` | Public | `var(--mp-sys-color-content-tertiary)` | Local CSS<br>`color` |
| `--mp-card-content-font-size` | Public | `15px` | Local CSS<br>`font-size` |
| `--mp-card-content-margin` | Public | `16px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-content-padding` | Public | `0 16px` | Local CSS<br>`padding` |
| `--mp-card-content-row-margin` | Public | `16px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-description-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-card-description-font-size` | Public | `15px` | Local CSS<br>`font-size` |
| `--mp-card-description-margin` | Public | `6px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-description-padding` | Public | `0 16px` | Local CSS<br>`padding` |
| `--mp-card-filled-background` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color` |
| `--mp-card-floating-buttons-bottom` | Public | `16px` | Local CSS<br>`bottom` |
| `--mp-card-floating-buttons-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-card-floating-buttons-right` | Public | `16px` | Local CSS<br>`inset-inline-end` |
| `--mp-card-footer-bottom` | Public | `9px` | Local CSS<br>`bottom` |
| `--mp-card-footer-margin` | Public | `16px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-footer-padding` | Public | `0 16px` | Local CSS<br>`padding` |
| `--mp-card-footer-right` | Public | `13px` | Local CSS<br>`inset-inline-end`, `inset-inline-start` |
| `--mp-card-heading-size-step` | Public | `1px` | Local CSS<br>`font-size` |
| `--mp-card-hover-shadow` | Public | `0 2px 1px -1px var(--mp-shadow-key-umbra-opacity), 0 1px 1px 0 var(--mp-shadow-key-penumbra-opacity), 0 1px 3px 0 var(--mp-shadow-key-ambient-opacity)` | Local CSS<br>`box-shadow` |
| `--mp-card-image-height` | Public | `200px` | Local CSS<br>`height` |
| `--mp-card-image-width` | Public | `100%` | Local CSS<br>`width` |
| `--mp-card-line-height` | Public | `22px` | Local CSS<br>`line-height` |
| `--mp-card-outline-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-card-padding` | Public | `0 0 15px 0` | Local CSS<br>`padding` |
| `--mp-card-row-height` | Public | `140px` | Local CSS<br>`min-height` |
| `--mp-card-row-image-width` | Public | `140px` | Local CSS<br>`width` |
| `--mp-card-row-line-height` | Public | `1.5` | Local CSS<br>`line-height` |
| `--mp-card-size-lg-section-margin` | Public | `20px 0 0` | Local CSS<br>`margin` |
| `--mp-card-size-lg-section-padding` | Public | `0 20px` | Local CSS<br>`padding` |
| `--mp-card-size-lg-title-font-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-card-size-sm-section-margin` | Public | `12px 0 0` | Local CSS<br>`margin` |
| `--mp-card-size-sm-section-padding` | Public | `0 12px` | Local CSS<br>`padding` |
| `--mp-card-size-sm-title-font-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-card-size-xl-section-margin` | Public | `24px 0 0` | Local CSS<br>`margin` |
| `--mp-card-size-xl-section-padding` | Public | `0 24px` | Local CSS<br>`padding` |
| `--mp-card-size-xl-title-font-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-card-size-xs-section-margin` | Public | `8px 0 0` | Local CSS<br>`margin` |
| `--mp-card-size-xs-section-padding` | Public | `0 8px` | Local CSS<br>`padding` |
| `--mp-card-size-xs-title-font-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-card-subtitle-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-card-subtitle-font-size` | Public | `15px` | Local CSS<br>`font-size` |
| `--mp-card-subtitle-margin` | Public | `10px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-subtitle-padding` | Public | `0 16px` | Local CSS<br>`padding` |
| `--mp-card-subtitle-row-margin` | Public | `-8px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-title-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-card-title-font-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-card-title-margin` | Public | `16px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-title-padding` | Public | `0 16px` | Local CSS<br>`padding` |
| `--mp-card-title-row-margin` | Public | `16px 0 12px` | Local CSS<br>`margin` |

</div>

## carousel

Source: `src/carousel/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-carousel-arrow-background` | Public | `rgb(0 0 0 / 35%)` | Local CSS<br>`background` |
| `--mp-carousel-arrow-background-hover` | Public | `rgb(0 0 0 / 55%)` | Local CSS<br>`background` |
| `--mp-carousel-arrow-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-carousel-arrow-disabled-opacity` | Public | `0.4` | Local CSS<br>`opacity` |
| `--mp-carousel-arrow-font-size` | Public | `var(--mp-sys-font-size-xl)` | Local CSS<br>`font-size` |
| `--mp-carousel-arrow-margin` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`bottom`, `left`, `right`, `top` |
| `--mp-carousel-arrow-size` | Public | `var(--mp-sys-control-height-md)` | Local CSS<br>`height`, `width` |
| `--mp-carousel-card-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-carousel-card-opacity` | Public | `0.6` | Local CSS<br>`opacity` |
| `--mp-carousel-card-scale` | Public | `0.85` | Local CSS<br>`transform` |
| `--mp-carousel-fade-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-carousel-focus-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`outline` |
| `--mp-carousel-focus-offset` | Public | `2px` | Local CSS<br>`outline-offset` |
| `--mp-carousel-focus-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-carousel-indicator-color-active` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`background` |
| `--mp-carousel-indicator-color-default` | Public | `rgb(255 255 255 / 35%)` | Local CSS<br>`background` |
| `--mp-carousel-indicator-dot-size` | Public | `8px` | Local CSS<br>`height`, `width` |
| `--mp-carousel-indicator-gap` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`gap` |
| `--mp-carousel-indicator-line-border-radius` | Public | `var(--mp-sys-radius-sm)` | Local CSS<br>`border-radius` |
| `--mp-carousel-indicator-line-height` | Public | `3px` | Local CSS<br>`height` |
| `--mp-carousel-indicator-line-width` | Public | `20px` | Local CSS<br>`width` |
| `--mp-carousel-indicator-outer-margin-bottom` | Public | `var(--mp-sys-space-8)` | Local CSS<br>`padding-bottom` |
| `--mp-carousel-indicator-position` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`bottom`, `left`, `right`, `top` |
| `--mp-carousel-navigation-z-index` | Public | `10` | Local CSS<br>`z-index` |
| `--mp-carousel-transition-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-carousel-transition-timing-function` | Public | `ease` | Local CSS<br>`transition` |

</div>

## cascader

Source: `src/cascader/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-cascader-checkbox-bg-hover` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background-color` |
| `--mp-cascader-font-item-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-cascader-item-bg-active` | Public | `transparent` | Local CSS<br>`background`, `background-color` |
| `--mp-cascader-item-bg-disabled` | Public | `transparent` | Local CSS<br>`background-color` |
| `--mp-cascader-item-bg-disabled-active` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background-color` |
| `--mp-cascader-item-bg-hover` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background`, `background-color` |
| `--mp-cascader-item-check-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-cascader-item-check-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`height`, `width` |
| `--mp-cascader-item-icon-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-cascader-item-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-cascader-item-text-color-active` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-cascader-item-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-cascader-item-text-color-disabled-active` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-cascader-item-text-color-hover` | Public | `var(--mp-cascader-item-text-color)` | Local CSS<br>`color` |
| `--mp-cascader-margin-checkbox-right` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-inline-end` |
| `--mp-cascader-margin-item-icon-left` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`margin-inline-start` |
| `--mp-cascader-option-min-width` | Public | `100px` | Local CSS<br>`min-width` |
| `--mp-cascader-padding-item-left` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`padding-inline-end`, `padding-inline-start` |
| `--mp-cascader-padding-item-right` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`margin-inline-end`, `padding-inline-end` |
| `--mp-cascader-panel-column-max-height` | Public | `200px` | Local CSS<br>`max-height` |
| `--mp-cascader-panel-column-min-width` | Public | `120px` | Local CSS<br>`min-width` |
| `--mp-cascader-popup-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-cascader-popup-box-shadow` | Public | `0 4px 10px rgba(0, 0, 0, 0.1)` | Local CSS<br>`box-shadow` |
| `--mp-cascader-popup-color-border` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`border`, `border-inline-end`, `border-top` |
| `--mp-cascader-popup-max-height` | Public | `200px` | Local CSS<br>`height` |
| `--mp-cascader-popup-padding-vertical` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`padding`, `padding-block-end` |
| `--mp-cascader-size-item-height` | Public | `36px` | Local CSS<br>`height`, `line-height` |
| `--mp-cascader-size-item-icon` | Public | `12px` | Local CSS<br>`height`, `width` |
| `--mp-cascader-slide-margin` | Public | `120px` | Local CSS<br>`margin-inline-start` |

</div>

## cell

Source: `src/cell/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-cell-border-color` | Public | `var(--mp-color-border-2)` | Local CSS<br>`border-bottom` |
| `--mp-cell-border-left` | Public | `12px` | Local CSS<br>`left` |
| `--mp-cell-border-right` | Public | `12px` | Local CSS<br>`right` |
| `--mp-cell-color` | Public | `var(--mp-color-text)` | Local CSS<br>`color` |
| `--mp-cell-description-color` | Public | `rgba(0, 0, 0, 0.6)` | Local CSS<br>`color` |
| `--mp-cell-description-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-cell-description-margin-top` | Public | `4px` | Local CSS<br>`margin-top` |
| `--mp-cell-extra-left` | Public | `8px` | Local CSS<br>`margin-inline-start` |
| `--mp-cell-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-cell-icon-right` | Public | `8px` | Local CSS<br>`margin-inline-end` |
| `--mp-cell-min-height` | Public | `40px` | Local CSS<br>`min-height` |
| `--mp-cell-padding` | Public | `10px 12px` | Local CSS<br>`padding` |

</div>

## checkbox

Source: `src/checkbox/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-checkbox-action-padding` | Public | `6px` | Local CSS<br>`padding` |
| `--mp-checkbox-animation-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-checkbox-control-border-radius` | Public | `2px` | Local CSS<br>`border-radius` |
| `--mp-checkbox-control-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`color` |
| `--mp-checkbox-control-color-checked` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-checkbox-control-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-checkbox-control-color-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-checkbox-control-size` | Public | `24px` | Local CSS<br>`height`, `width` |
| `--mp-checkbox-group-gap` | Public | `0` | Local CSS<br>`gap` |
| `--mp-checkbox-label-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-checkbox-label-gap` | Public | `0` | Local CSS<br>`margin-inline-start` |
| `--mp-checkbox-label-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-checkbox-label-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-checkbox-mark-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`background-color`, `border-color`, `color` |
| `--mp-internal-checkbox-action-radius` | Internal | `50%` | Local CSS<br>`border-radius` |
| `--mp-internal-checkbox-background` | Internal | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background-color` |
| `--mp-internal-checkbox-background-disabled` | Internal | `color-mix(in srgb, var(--mp-sys-color-surface-muted) 82%, var(--mp-sys-color-content-disabled))` | Local CSS<br>`background-color` |
| `--mp-internal-checkbox-border-radius` | Internal | `var(--mp-checkbox-control-border-radius)` | Local CSS<br>`border-radius` |
| `--mp-internal-checkbox-border-width` | Internal | `1px` | Local CSS<br>`border` |
| `--mp-internal-checkbox-focus-width` | Internal | `2px` | Local CSS<br>`box-shadow`, `outline` |
| `--mp-internal-checkbox-mark-color` | Internal | `var(--mp-checkbox-mark-color)` | Local CSS<br>`background-color`, `border-color`, `color` |
| `--mp-internal-checkbox-mark-height` | Internal | `2px` | Local CSS<br>`height` |
| `--mp-internal-checkbox-mark-radius` | Internal | `1px` | Local CSS<br>`border-radius` |
| `--mp-internal-checkbox-mark-size` | Internal | `75%` | Local CSS<br>`height`, `width` |

</div>

## code

Source: `src/code/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-code-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-code-line-height` | Public | `1.7` | Local CSS<br>`line-height` |

</div>

## collapse

Source: `src/collapse/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-collapse-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-collapse-border-radius` | Public | `4px` | Local CSS<br>`border-radius` |
| `--mp-collapse-border-width` | Public | `1px` | Local CSS<br>`border` |
| `--mp-collapse-content-bg` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color` |
| `--mp-collapse-content-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-collapse-content-padding-vertical` | Public | `10px` | Local CSS<br>`padding` |
| `--mp-collapse-content-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-collapse-content-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-collapse-expand-icon` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-collapse-expand-icon-active-transform` | Public | `rotate(-180deg)` | Local CSS<br>`transform` |
| `--mp-collapse-expand-icon-right-active-transform` | Public | `rotate(-180deg)` | Local CSS<br>`transform` |
| `--mp-collapse-expand-icon-right-transform` | Public | `rotate(0deg)` | Local CSS<br>`transform` |
| `--mp-collapse-expand-icon-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-collapse-expand-icon-spacing-text` | Public | `8px` | Local CSS<br>`gap` |
| `--mp-collapse-expand-icon-transform` | Public | `rotate(0deg)` | Local CSS<br>`transform` |
| `--mp-collapse-focus-color` | Public | `currentColor` | Local CSS<br>`outline` |
| `--mp-collapse-focus-offset` | Public | `-2px` | Local CSS<br>`outline-offset` |
| `--mp-collapse-focus-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-collapse-item-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-bottom` |
| `--mp-collapse-item-border-width` | Public | `1px` | Local CSS<br>`border-bottom` |
| `--mp-collapse-item-margin-top` | Public | `16px` | Local CSS<br>`margin-top` |
| `--mp-collapse-line-height` | Public | `1.5` | Local CSS<br>`line-height` |
| `--mp-collapse-motion-duration` | Public | `0.25s` | Local CSS<br>`transition` |
| `--mp-collapse-motion-easing` | Public | `ease` | Local CSS<br>`transition` |
| `--mp-collapse-title-bg` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background`, `background-color` |
| `--mp-collapse-title-bg-active` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background-color` |
| `--mp-collapse-title-bg-disabled` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background-color` |
| `--mp-collapse-title-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-collapse-title-font-weight-active` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-collapse-title-line-height` | Public | `24px` | Local CSS<br>`line-height` |
| `--mp-collapse-title-padding-horizontal` | Public | `12px` | Local CSS<br>`padding` |
| `--mp-collapse-title-padding-vertical` | Public | `10px` | Local CSS<br>`padding` |
| `--mp-collapse-title-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-collapse-title-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |

</div>

## count-to

Source: `src/count-to/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-count-to-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-count-to-text-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |

</div>

## countdown

Source: `src/countdown/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-countdown-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-countdown-text-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |

</div>

## date

Source: `src/date/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-date-calendar-disabled-opacity` | Public | `0.4` | Local CSS<br>`opacity` |
| `--mp-date-calendar-line-height` | Public | `60px` | Local CSS<br>`grid-auto-rows` |
| `--mp-date-calendar-month-height` | Public | `320px` | Local CSS<br>`height` |
| `--mp-date-calendar-row-height` | Public | `38px` | Local CSS<br>`grid-auto-rows`, `line-height` |
| `--mp-date-calendar-scroll-height` | Public | `320px` | Local CSS<br>`height` |
| `--mp-date-calendar-selected-background` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background` |
| `--mp-date-calendar-selected-color` | Public | `var(--mp-button-solid-text-color)` | Local CSS<br>`color` |
| `--mp-date-calendar-today-color` | Public | `var(--mp-button-default-foreground-color)` | Local CSS<br>`background`, `color` |
| `--mp-date-input-trigger-outline-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`outline` |
| `--mp-date-input-trigger-outline-offset` | Public | `var(--mp-sys-space-1)` | Local CSS<br>`outline-offset` |
| `--mp-date-input-trigger-outline-width` | Public | `var(--mp-sys-space-1)` | Local CSS<br>`outline` |
| `--mp-date-input-trigger-padding` | Public | `0` | Local CSS<br>`padding` |
| `--mp-date-picker-actions-padding` | Public | `0 8px 12px 8px` | Local CSS<br>`padding` |
| `--mp-date-picker-body-background-color` | Public | `#fff` | Local CSS<br>`background`, `background-color` |
| `--mp-date-picker-body-height` | Public | `280px` | Local CSS<br>`height`, `min-height` |
| `--mp-date-picker-body-padding` | Public | `0` | Local CSS<br>`padding` |
| `--mp-date-picker-border-radius` | Public | `4px` | Local CSS<br>`border-radius` |
| `--mp-date-picker-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-date-picker-header-arrow-filter` | Public | `opacity(0.54)` | Local CSS<br>`filter` |
| `--mp-date-picker-header-color` | Public | `#555` | Local CSS<br>`color` |
| `--mp-date-picker-header-padding` | Public | `4px 16px` | Local CSS<br>`padding` |
| `--mp-date-picker-main-color` | Public | `rgba(0, 0, 0, 0.87)` | Local CSS<br>`color` |
| `--mp-date-picker-min-width` | Public | `290px` | Local CSS<br>`flex`, `min-width` |
| `--mp-date-picker-panel-background` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background` |
| `--mp-date-picker-panel-border` | Public | `var(--mp-color-border-2)` | Local CSS<br>`border` |
| `--mp-date-picker-panel-date-width` | Public | `265px` | Local CSS<br>`flex`, `min-width`, `width` |
| `--mp-date-picker-panel-preferred-width` | Public | `var(--mp-date-picker-popover-width)` | Local CSS<br>`flex`, `width` |
| `--mp-date-picker-panel-radius` | Public | `8px` | Local CSS<br>`border-radius` |
| `--mp-date-picker-popover-gap` | Public | `32px` | Local CSS<br>`max-height`, `max-width` |
| `--mp-date-picker-popover-max-height` | Public | `calc(100dvh - var(--mp-date-picker-popover-gap))` | Local CSS<br>`max-height` |
| `--mp-date-picker-popover-width` | Public | `calc(var(--mp-date-picker-panel-date-width) + 2px)` | Local CSS<br>`flex`, `width` |
| `--mp-date-picker-range-background` | Public | `var(--mp-color-primary-light-1)` | Local CSS<br>`background` |
| `--mp-date-picker-range-disabled-background` | Public | `var(--mp-color-fill-1)` | Local CSS<br>`background` |
| `--mp-date-picker-range-preview-background` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background` |
| `--mp-date-picker-range-preview-outline` | Public | `1px dashed var(--mp-sys-color-action-primary)` | Local CSS<br>`outline` |
| `--mp-date-picker-shortcuts-column-width` | Public | `128px` | Local CSS<br>`flex`, `width` |
| `--mp-date-picker-title-background` | Public | `var(--mp-date-picker-body-background-color)` | Local CSS<br>`background` |
| `--mp-date-picker-title-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-date-picker-title-date-font-size` | Public | `34px` | Local CSS<br>`font-size` |
| `--mp-date-picker-title-date-font-weight` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-date-picker-title-date-height` | Public | `48px` | Local CSS<br>`min-height` |
| `--mp-date-picker-title-date-justify-content` | Public | `normal` | Local CSS<br>`justify-content` |
| `--mp-date-picker-title-date-range-font-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-date-picker-title-height` | Public | `105px` | Local CSS<br>`min-height` |
| `--mp-date-picker-title-hint-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-date-picker-title-hint-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-date-picker-title-padding` | Public | `16px` | Local CSS<br>`padding` |
| `--mp-date-picker-title-year-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-date-picker-title-year-font-weight` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-date-picker-title-year-margin-bottom` | Public | `8px` | Local CSS<br>`margin-bottom` |
| `--mp-date-picker-title-year-min-height` | Public | `21px` | Local CSS<br>`min-height` |
| `--mp-date-picker-wheel-font-size` | Public | `5cqi` | Cross-component CSS<br>`font-size` |
| `--mp-date-title-font-size` | Public | `var(--mp-picker-title-font-size, 16px)` | Local CSS<br>`font-size` |
| `--mp-date-title-text-color` | Public | `var(--mp-picker-title-text-color, #555)` | Local CSS<br>`color` |
| `--mp-date-toolbar-height` | Public | `var(--mp-picker-toolbar-height, 44px)` | Local CSS<br>`height` |
| `--mp-date-toolbar-padding` | Public | `var(--mp-picker-toolbar-padding, 0 4px)` | Local CSS<br>`padding` |
| `--mp-day-picker-content-item-button-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-day-picker-content-item-button-height` | Public | `32px` | Local CSS<br>`height` |
| `--mp-day-picker-content-item-button-width` | Public | `32px` | Local CSS<br>`width` |
| `--mp-day-picker-content-item-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-day-picker-content-item-min-height` | Public | `21px` | Local CSS<br>`min-height` |
| `--mp-day-picker-content-item-padding` | Public | `2px 0` | Local CSS<br>`padding` |
| `--mp-day-picker-content-item-width` | Public | `14.28%` | Local CSS<br>`width` |
| `--mp-day-picker-head-item-color` | Public | `rgba(0, 0, 0, 0.38)` | Local CSS<br>`color` |
| `--mp-day-picker-head-item-font-weight` | Public | `600` | Local CSS<br>`font-weight` |
| `--mp-day-picker-head-item-padding` | Public | `8px 0` | Local CSS<br>`padding` |
| `--mp-month-picker-item-button-max-width` | Public | `140px` | Local CSS<br>`max-width` |
| `--mp-month-picker-item-height` | Public | `56px` | Local CSS<br>`height` |
| `--mp-month-picker-item-width` | Public | `33%` | Local CSS<br>`width` |
| `--mp-month-picker-padding` | Public | `0 12px` | Local CSS<br>`padding` |
| `--mp-year-picker-item-button-max-width` | Public | `140px` | Local CSS<br>`max-width` |
| `--mp-year-picker-item-height` | Public | `56px` | Local CSS<br>`height` |
| `--mp-year-picker-item-width` | Public | `33%` | Local CSS<br>`width` |
| `--mp-year-picker-padding` | Public | `0 12px` | Local CSS<br>`padding` |

</div>

## date-range

Source: `src/date-range/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-date-range-picker-background` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background`, `background-color`, `background-image` |
| `--mp-date-range-picker-border-radius` | Public | `var(--mp-date-picker-border-radius, 4px)` | Local CSS<br>`border-radius` |
| `--mp-date-range-picker-column-label-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-date-range-picker-column-label-font-size` | Public | `var(--mp-internal-temporal-panel-column-label-font-size)` | Local CSS<br>`font-size` |
| `--mp-date-range-picker-column-label-height` | Public | `var(--mp-internal-temporal-panel-column-label-height)` | Local CSS<br>`height` |
| `--mp-date-range-picker-quick-time-width` | Public | `var(--mp-internal-temporal-panel-quick-time-width)` | Local CSS<br>`flex`, `width` |
| `--mp-date-range-picker-summary-active-background` | Public | `var(--mp-internal-temporal-panel-summary-active-background)` | Local CSS<br>`background` |
| `--mp-date-range-picker-summary-background` | Public | `var(--mp-internal-temporal-panel-summary-background)` | Local CSS<br>`background` |
| `--mp-date-range-picker-summary-touch-height` | Public | `var(--mp-internal-temporal-panel-touch-height)` | Local CSS<br>`min-height` |
| `--mp-date-range-picker-value-active-color` | Public | `var(--mp-internal-temporal-panel-summary-active-color)` | Local CSS<br>`color` |
| `--mp-date-range-picker-value-date-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-date-range-picker-values-font-weight` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-date-range-title-font-size` | Public | `var(--mp-picker-title-font-size, 16px)` | Local CSS<br>`font-size` |
| `--mp-date-range-title-text-color` | Public | `var(--mp-picker-title-text-color, #555)` | Local CSS<br>`color` |
| `--mp-date-range-toolbar-height` | Public | `var(--mp-picker-toolbar-height, 44px)` | Local CSS<br>`height` |
| `--mp-date-range-toolbar-padding` | Public | `var(--mp-picker-toolbar-padding, 0 4px)` | Local CSS<br>`padding` |

</div>

## dialog

Source: `src/dialog/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-dialog-actions-button-gap` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`margin-inline-start` |
| `--mp-dialog-actions-padding` | Public | `0 12px 12px` | Local CSS<br>`padding` |
| `--mp-dialog-animation-duration` | Public | `var(--mp-sys-motion-duration-slow)` | Local CSS<br>`transition` |
| `--mp-dialog-animation-easing` | Public | `var(--mp-sys-motion-easing-standard)` | Local CSS<br>`transition` |
| `--mp-dialog-background` | Public | `var(--mp-sys-color-surface-raised)` | Local CSS<br>`background` |
| `--mp-dialog-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-dialog-border-radius` | Public | `3px` | Local CSS<br>`border-radius` |
| `--mp-dialog-border-width` | Public | `0` | Local CSS<br>`border` |
| `--mp-dialog-close-button-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-dialog-close-button-font-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-dialog-close-button-inset-inline-end` | Public | `0` | Local CSS<br>`margin-inline-end` |
| `--mp-dialog-close-button-size` | Public | `40px` | Local CSS<br>`height`, `width` |
| `--mp-dialog-content-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-dialog-content-line-height` | Public | `24px` | Local CSS<br>`line-height` |
| `--mp-dialog-content-padding` | Public | `12px 20px` | Local CSS<br>`padding` |
| `--mp-dialog-content-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-dialog-divider-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-bottom` |
| `--mp-dialog-divider-width` | Public | `1px` | Local CSS<br>`border-bottom` |
| `--mp-dialog-fullscreen-height` | Public | `100vh`<br>`100dvh` | Local CSS<br>`height` |
| `--mp-dialog-fullscreen-width` | Public | `100vw` | Local CSS<br>`width` |
| `--mp-dialog-margin-top` | Public | `0` | Local CSS<br>`margin-top` |
| `--mp-dialog-max-height` | Public | `90vh`<br>`90dvh` | Local CSS<br>`max-height` |
| `--mp-dialog-overlay-background` | Public | `var(--mp-sys-color-scrim)` | Local CSS<br>`background-color` |
| `--mp-dialog-simple-actions-gap` | Public | `0` | Local CSS<br>`margin-top` |
| `--mp-dialog-simple-border-radius` | Public | `var(--mp-sys-radius-lg)` | Local CSS<br>`border-radius` |
| `--mp-dialog-simple-content-gap` | Public | `0` | Local CSS<br>`margin-top` |
| `--mp-dialog-simple-padding` | Public | `20px` | Local CSS<br>`padding` |
| `--mp-dialog-simple-width` | Public | `280px` | Local CSS<br>`width` |
| `--mp-dialog-status-danger-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-dialog-status-icon-gap` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`margin-inline-end` |
| `--mp-dialog-status-icon-size` | Public | `18px` | Local CSS<br>`font-size` |
| `--mp-dialog-status-info-color` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-dialog-status-success-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-dialog-status-warning-color` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-dialog-title-font-size` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-dialog-title-font-weight` | Public | `var(--mp-sys-font-weight-regular)` | Local CSS<br>`font-weight` |
| `--mp-dialog-title-justify` | Public | `space-between` | Local CSS<br>`justify-content` |
| `--mp-dialog-title-min-height` | Public | `0` | Local CSS<br>`min-height` |
| `--mp-dialog-title-padding` | Public | `20px 20px 0` | Local CSS<br>`padding` |
| `--mp-dialog-title-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-dialog-width` | Public | `280px` | Local CSS<br>`width` |

</div>

## divider

Source: `src/divider/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-divider-border-width` | Public | `1px` | Local CSS<br>`border-inline-start-width`, `border-top-width` |
| `--mp-divider-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-inline-start-color`, `border-top-color` |
| `--mp-divider-orientation-horizontal-inset-lg` | Public | `32px` | Local CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-md` | Public | `24px` | Local CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-sm` | Public | `16px` | Local CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-xl` | Public | `40px` | Local CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-inset-xs` | Public | `12px` | Local CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-spacing-lg` | Public | `24px` | Local CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-md` | Public | `16px` | Local CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-sm` | Public | `12px` | Local CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-xl` | Public | `32px` | Local CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-spacing-xs` | Public | `8px` | Local CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-vertical-inset-lg` | Public | `8px` | Local CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-md` | Public | `6px` | Local CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-sm` | Public | `4px` | Local CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-xl` | Public | `12px` | Local CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-inset-xs` | Public | `2px` | Local CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-spacing-lg` | Public | `16px` | Local CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-md` | Public | `12px` | Local CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-sm` | Public | `8px` | Local CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-xl` | Public | `24px` | Local CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-spacing-xs` | Public | `4px` | Local CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-text-align-inset` | Public | `24px` | Local CSS<br>`height`, `width` |
| `--mp-divider-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-divider-text-padding` | Public | `8px` | Local CSS<br>`padding` |

</div>

## ellipsis

Source: `src/ellipsis/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-ellipsis-focus-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`outline` |
| `--mp-ellipsis-focus-offset` | Public | `2px` | Local CSS<br>`outline-offset` |
| `--mp-ellipsis-focus-width` | Public | `2px` | Local CSS<br>`outline` |

</div>

## empty

Source: `src/empty/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-empty-description-color` | Public | `var(--mp-sys-color-content-tertiary)` | Local CSS<br>`color` |
| `--mp-empty-description-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-empty-description-line-height` | Public | `1.5` | Local CSS<br>`line-height` |
| `--mp-empty-extra-margin-top` | Public | `20px` | Local CSS<br>`margin-top` |
| `--mp-empty-icon-color` | Public | `var(--mp-sys-color-content-decorative)` | Local CSS<br>`color` |
| `--mp-empty-image-margin-bottom` | Public | `4px` | Local CSS<br>`margin-bottom` |
| `--mp-empty-padding` | Public | `20px` | Local CSS<br>`padding` |
| `--mp-empty-size-lg` | Public | `140px` | Local CSS<br>`font-size`, `height`, `width` |
| `--mp-empty-size-md` | Public | `120px` | Local CSS<br>`font-size`, `height`, `width` |
| `--mp-empty-size-sm` | Public | `100px` | Local CSS<br>`font-size`, `height`, `width` |
| `--mp-empty-size-xl` | Public | `160px` | Local CSS<br>`font-size`, `height`, `width` |
| `--mp-empty-size-xs` | Public | `80px` | Local CSS<br>`font-size`, `height`, `width` |

</div>

## fab

Source: `src/fab/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-fab-action-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-fab-action-margin` | Public | `6px` | Local CSS<br>`margin` |
| `--mp-fab-action-size` | Public | `40px` | Local CSS<br>`height`, `min-width`, `width` |
| `--mp-fab-actions-padding` | Public | `10px 0` | Local CSS<br>`padding` |
| `--mp-fab-bottom` | Public | `16px` | Local CSS<br>`bottom` |
| `--mp-fab-left` | Public | `16px` | Local CSS<br>`left` |
| `--mp-fab-right` | Public | `16px` | Local CSS<br>`right` |
| `--mp-fab-top` | Public | `70px` | Local CSS<br>`top` |
| `--mp-fab-transition-standard-easing` | Public | `cubic-bezier(0.4, 0, 0.2, 1)` | Local CSS<br>`transition` |
| `--mp-fab-trigger-active-icon-size` | Public | `22px` | Local CSS<br>`font-size` |
| `--mp-fab-trigger-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-fab-trigger-inactive-icon-size` | Public | `26px` | Local CSS<br>`font-size` |
| `--mp-fab-trigger-size` | Public | `56px` | Local CSS<br>`height`, `min-width`, `width` |

</div>

## field-decorator

Source: `src/field-decorator/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-field-blur-color` | Public | `var(--mp-sys-color-content-tertiary)` | Local CSS<br>`border-bottom`, `color` |
| `--mp-field-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-end-end-radius`, `border-end-start-radius`, `border-radius`, `border-start-end-radius`, `border-start-start-radius` |
| `--mp-field-border-width` | Public | `1px` | Local CSS<br>`border`, `border-bottom`, `margin-inline-start`, `min-height`, `outline`, `outline-offset`, `padding-inline-start` |
| `--mp-field-caret-color` | Public | `currentColor` | Cross-component CSS<br>`caret-color` |
| `--mp-field-clear-icon-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-field-clear-icon-size` | Public | `var(--mp-field-icon-size)` | Local CSS<br>`font-size` |
| `--mp-field-clear-padding` | Public | `4px` | Local CSS<br>`padding` |
| `--mp-field-clear-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-field-clear-visibility` | Public | `visible` | Local CSS<br>`visibility` |
| `--mp-field-content-gap` | Public | `8px` | Local CSS<br>`gap`, `padding-inline-end`, `padding-inline-start` |
| `--mp-field-content-padding-vertical` | Public | `8px` | Local CSS<br>`padding`, `top` |
| `--mp-field-control-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-field-control-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`-webkit-text-fill-color`, `color` |
| `--mp-field-error-color` | Public | `var(--mp-sys-color-status-danger)` | Local CSS<br>`border-bottom-color`, `border-color`, `color` |
| `--mp-field-focus-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`border-bottom-color`, `color`, `outline` |
| `--mp-field-hint-duration` | Public | `0.2s` | Local CSS<br>`transition` |
| `--mp-field-hint-scale` | Public | `0.75` | Local CSS<br>`font-size`, `top`, `transform` |
| `--mp-field-hint-space` | Public | `4px` | Local CSS<br>`padding`, `padding-inline-start` |
| `--mp-field-icon-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-field-line-height` | Public | `1.5` | Local CSS<br>`line-height`, `top` |
| `--mp-field-loading-color` | Public | `var(--mp-field-focus-color)` | Local CSS<br>`color` |
| `--mp-field-loading-duration` | Public | `1s` | Local CSS<br>`animation` |
| `--mp-field-loading-line-size` | Public | `2px` | Local CSS<br>`height` |
| `--mp-field-padding-horizontal` | Public | `16px` | Local CSS<br>`inset-inline-start`, `margin-inline-end`, `margin-inline-start`, `max-width`, `padding`, `padding-inline-end`, `padding-inline-start`, `width` |
| `--mp-field-placeholder-text-color` | Public | `var(--mp-sys-color-content-tertiary)` | Local CSS<br>`color` |
| `--mp-field-prefix-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-field-size-lg-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-field-size-lg-height` | Public | `56px` | Local CSS<br>`flex`, `height`, `min-height` |
| `--mp-field-size-md-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-field-size-md-height` | Public | `48px` | Local CSS<br>`flex`, `height`, `min-height` |
| `--mp-field-size-sm-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-field-size-sm-height` | Public | `40px` | Local CSS<br>`flex`, `height`, `min-height` |
| `--mp-field-size-xl-font-size` | Public | `18px` | Local CSS<br>`font-size` |
| `--mp-field-size-xl-height` | Public | `64px` | Local CSS<br>`flex`, `height`, `min-height` |
| `--mp-field-size-xs-font-size` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-field-size-xs-height` | Public | `32px` | Local CSS<br>`flex`, `height`, `min-height` |
| `--mp-field-suffix-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-field-variant-filled-background` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background` |
| `--mp-field-variant-filled-background-disabled` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background` |
| `--mp-field-variant-filled-background-error` | Public | `var(--mp-color-danger-light-1)` | Local CSS<br>`background` |
| `--mp-field-variant-filled-background-focus` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background` |
| `--mp-field-variant-filled-background-hover` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-field-variant-outline-background` | Public | `transparent` | Local CSS<br>`background` |
| `--mp-field-variant-outline-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border`, `border-color` |
| `--mp-field-variant-outline-border-color-disabled` | Public | `var(--mp-sys-color-border-subtle)` | Local CSS<br>`border-color` |
| `--mp-field-variant-outline-border-color-error` | Public | `var(--mp-sys-color-status-danger)` | Local CSS<br>`border-color` |
| `--mp-field-variant-outline-border-color-focus` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`border-color` |
| `--mp-field-variant-outline-border-color-hover` | Public | `color-mix(in srgb, var(--mp-field-variant-outline-border-color) 80%, var(--mp-sys-color-border-strong))` | Local CSS<br>`border-color` |
| `--mp-field-variant-standard-line-color` | Public | `var(--mp-field-blur-color)` | Local CSS<br>`border-bottom` |
| `--mp-field-variant-standard-line-color-disabled` | Public | `var(--mp-sys-color-border-subtle)` | Local CSS<br>`border-bottom-color` |
| `--mp-field-variant-standard-line-color-error` | Public | `var(--mp-field-error-color)` | Local CSS<br>`border-bottom-color` |
| `--mp-field-variant-standard-line-color-focus` | Public | `var(--mp-field-focus-color)` | Local CSS<br>`border-bottom-color` |
| `--mp-field-variant-standard-line-size` | Public | `1px` | Local CSS<br>`border-bottom` |
| `--mp-field-variant-standard-line-size-focus` | Public | `2px` | Local CSS<br>`border-bottom-width` |

</div>

## floating-panel

Source: `src/floating-panel/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-floating-panel-background` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color`, `box-shadow` |
| `--mp-floating-panel-border-radius` | Public | `0` | Local CSS<br>`border-top-left-radius`, `border-top-right-radius` |
| `--mp-floating-panel-border-top` | Public | `none` | Local CSS<br>`border-top` |
| `--mp-floating-panel-header-height` | Public | `30px` | Local CSS<br>`height` |
| `--mp-floating-panel-toolbar-background` | Public | `#ddd` | Local CSS<br>`background` |
| `--mp-floating-panel-toolbar-border-radius` | Public | `10px` | Local CSS<br>`border-radius` |
| `--mp-floating-panel-toolbar-height` | Public | `3px` | Local CSS<br>`height` |
| `--mp-floating-panel-toolbar-width` | Public | `20px` | Local CSS<br>`width` |
| `--mp-floating-panel-transition-timing-function` | Public | `cubic-bezier(0.18, 0.89, 0.32, 1.28)` | Runtime reference (not visibility proof)<br>`floating-panel/FloatingPanel.vue` |
| `--mp-floating-panel-z-index` | Public | `999` | Local CSS<br>`z-index` |

</div>

## form

Source: `src/form/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-form-extra-margin-top` | Public | `6px` | Local CSS<br>`margin-top` |
| `--mp-form-extra-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-form-extra-text-font-size` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-form-help-line-height` | Public | `1.4` | Local CSS<br>`line-height` |
| `--mp-form-item-asterisk-margin` | Public | `4px` | Local CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-form-item-label-gap` | Public | `12px` | Local CSS<br>`margin-inline-end`, `padding-inline-end` |
| `--mp-form-item-label-width` | Public | `88px` | Local CSS<br>`flex`, `width` |
| `--mp-form-label-line-height` | Public | `1.4` | Local CSS<br>`line-height` |
| `--mp-form-label-min-height` | Public | `24px` | Local CSS<br>`min-height` |
| `--mp-form-label-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-form-required-symbol-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-form-size-md-item-margin-bottom` | Public | `16px` | Local CSS<br>`margin-bottom`, `padding-block-start` |
| `--mp-form-size-md-label-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-form-tooltip-margin-left` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`padding-inline-start` |
| `--mp-form-tooltip-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-form-vertical-label-margin-bottom` | Public | `8px` | Local CSS<br>`margin-bottom` |

</div>

## form-details

Source: `src/form-details/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-form-details-error-message-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-form-details-extra-message-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-form-details-font-size` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-form-details-margin-top` | Public | `6px` | Local CSS<br>`margin-top` |
| `--mp-form-details-message-margin-right` | Public | `4px` | Local CSS<br>`margin-inline-end` |

</div>

## hover

Source: `src/hover/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-hover-overlay-focusing-opacity` | Public | `0.12` | Local CSS<br>`opacity` |
| `--mp-hover-overlay-opacity` | Public | `0.04` | Local CSS<br>`opacity` |
| `--mp-hover-transition-duration` | Public | `var(--mp-sys-motion-duration-fast)` | Local CSS<br>`transition` |

</div>

## icon

Source: `src/icon/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-icon-size` | Public | `inherit` | Local CSS<br>`font-size` |
| `--mp-icon-spin-duration` | Public | `1s` | Local CSS<br>`animation` |

</div>

## image

Source: `src/image/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-image-preview-arrow-background` | Public | `rgba(38, 38, 38, 0.92)` | Local CSS<br>`background-color` |
| `--mp-image-preview-arrow-background-hover` | Public | `rgba(56, 56, 56, 0.96)` | Local CSS<br>`background-color` |
| `--mp-image-preview-arrow-color` | Public | `#fff` | Local CSS<br>`color` |
| `--mp-image-preview-close-icon-right` | Public | `14px` | Local CSS<br>`inset-inline-end` |
| `--mp-image-preview-close-icon-top` | Public | `14px` | Local CSS<br>`top` |
| `--mp-image-preview-swipe-indicators-padding` | Public | `16px 0` | Local CSS<br>`padding` |
| `--mp-image-preview-swipe-indicators-text-color` | Public | `#ddd` | Local CSS<br>`color` |
| `--mp-image-preview-zoom-container-background` | Public | `#000` | Cross-component CSS<br>`background-color` |

</div>

## index-bar

Source: `src/index-bar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-index-bar-list-bottom` | Public | `auto` | Local CSS<br>`bottom` |
| `--mp-index-bar-list-item-active-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-index-bar-list-item-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-index-bar-list-item-font-size` | Public | `var(--mp-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-index-bar-list-item-height` | Public | `14px` | Local CSS<br>`height` |
| `--mp-index-bar-list-item-padding` | Public | `0 10px` | Local CSS<br>`padding` |
| `--mp-index-bar-list-left` | Public | `auto` | Local CSS<br>`inset-inline-start` |
| `--mp-index-bar-list-right` | Public | `0` | Local CSS<br>`inset-inline-end` |
| `--mp-index-bar-list-top` | Public | `50%` | Local CSS<br>`top` |
| `--mp-index-bar-list-transform` | Public | `translate(0, -50%)` | Local CSS<br>`transform` |

</div>

## infinite-scroll

Source: `src/infinite-scroll/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-infinite-scroll-error-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-infinite-scroll-loading-gap` | Public | `8px` | Local CSS<br>`gap` |
| `--mp-infinite-scroll-status-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-infinite-scroll-status-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-infinite-scroll-status-min-height` | Public | `50px` | Local CSS<br>`min-height` |
| `--mp-infinite-scroll-status-padding` | Public | `12px 0` | Local CSS<br>`padding` |

</div>

## input

Source: `src/input/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-input-caret-color` | Public | `var(--mp-field-caret-color)` | Local CSS<br>`caret-color` |
| `--mp-input-control-font-size` | Public | `inherit` | Local CSS<br>`font-size` |
| `--mp-input-control-height` | Public | `auto` | Local CSS<br>`height` |
| `--mp-input-control-line-height` | Public | `inherit` | Local CSS<br>`line-height` |
| `--mp-input-control-padding-horizontal` | Public | `0` | Local CSS<br>`padding` |
| `--mp-input-counter-color` | Public | `var(--mp-field-suffix-text-color)` | Local CSS<br>`color` |
| `--mp-input-counter-font-size` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-input-feedback-duration` | Public | `1s` | Local CSS<br>`animation` |
| `--mp-input-feedback-error-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-input-feedback-success-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-input-feedback-validating-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-input-feedback-warning-color` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |

</div>

## input-number

Source: `src/input-number/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-input-number-addon-background` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background` |
| `--mp-input-number-addon-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-input-number-addon-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-input-number-border-radius` | Public | `var(--mp-field-border-radius)` | Local CSS<br>`border-end-end-radius`, `border-end-start-radius`, `border-start-end-radius`, `border-start-start-radius` |
| `--mp-input-number-border-width` | Public | `1px` | Local CSS<br>`border`, `border-inline-end`, `border-inline-start`, `border-top`, `outline`, `outline-offset` |
| `--mp-input-number-caret-color` | Public | `var(--mp-field-caret-color)` | Local CSS<br>`caret-color` |
| `--mp-input-number-size-lg-step-button-width` | Public | `var(--mp-sys-control-height-lg)` | Local CSS<br>`width` |
| `--mp-input-number-size-md-step-button-width` | Public | `var(--mp-sys-control-height-md)` | Local CSS<br>`width` |
| `--mp-input-number-size-sm-step-button-width` | Public | `var(--mp-sys-control-height-sm)` | Local CSS<br>`width` |
| `--mp-input-number-size-xl-step-button-width` | Public | `var(--mp-sys-control-height-xl)` | Local CSS<br>`width` |
| `--mp-input-number-size-xs-step-button-width` | Public | `var(--mp-sys-control-height-xs)` | Local CSS<br>`width` |
| `--mp-input-number-step-button-active-background` | Public | `var(--mp-sys-color-state-selected)` | Local CSS<br>`background` |
| `--mp-input-number-step-button-background` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background` |
| `--mp-input-number-step-button-border-color` | Public | `var(--mp-sys-color-border-subtle)` | Local CSS<br>`border-inline-end`, `border-inline-start`, `border-top` |
| `--mp-input-number-step-button-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-input-number-step-button-disabled-color` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-input-number-step-button-hover-background` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-input-number-step-button-icon-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-input-number-step-button-transition-duration` | Public | `0.2s` | Local CSS<br>`transition` |
| `--mp-input-number-step-button-width` | Public | `var(--mp-sys-control-height-md)` | Local CSS<br>`width` |

</div>

## input-tag

Source: `src/input-tag/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-input-tag-color-text-default` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-input-tag-color-text-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-input-tag-padding-x` | Public | `4px` | Local CSS<br>`padding-inline-end`, `padding-inline-start` |
| `--mp-input-tag-size-lg-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-input-tag-size-lg-padding-y` | Public | `2px` | Local CSS<br>`padding-bottom`, `padding-top` |
| `--mp-input-tag-size-lg-tag-height` | Public | `28px` | Local CSS<br>`line-height`, `max-height`, `min-height` |
| `--mp-input-tag-size-md-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-input-tag-size-md-padding-y` | Public | `2px` | Local CSS<br>`padding-bottom`, `padding-top` |
| `--mp-input-tag-size-md-tag-height` | Public | `24px` | Local CSS<br>`line-height`, `max-height`, `min-height` |
| `--mp-input-tag-size-sm-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-input-tag-size-sm-padding-y` | Public | `2px` | Local CSS<br>`padding-bottom`, `padding-top` |
| `--mp-input-tag-size-sm-tag-height` | Public | `20px` | Local CSS<br>`line-height`, `max-height`, `min-height` |
| `--mp-input-tag-size-xl-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-input-tag-size-xl-padding-y` | Public | `4px` | Local CSS<br>`padding-bottom`, `padding-top` |
| `--mp-input-tag-size-xl-tag-height` | Public | `32px` | Local CSS<br>`line-height`, `max-height`, `min-height` |
| `--mp-input-tag-size-xs-font-size` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-input-tag-size-xs-padding-y` | Public | `0px` | Local CSS<br>`padding-bottom`, `padding-top` |
| `--mp-input-tag-size-xs-tag-height` | Public | `20px` | Local CSS<br>`line-height`, `max-height`, `min-height` |
| `--mp-input-tag-tag-color-bg` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background-color` |
| `--mp-input-tag-tag-color-bg-disabled` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-input-tag-tag-color-bg-focus` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-input-tag-tag-color-border` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`border-color` |
| `--mp-input-tag-tag-color-border-disabled` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`border-color` |
| `--mp-input-tag-tag-color-border-focus` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`border-color` |
| `--mp-input-tag-tag-font-size` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-input-tag-tag-margin-right` | Public | `4px` | Local CSS<br>`margin-inline-end` |
| `--mp-input-tag-tag-margin-y` | Public | `2px` | Local CSS<br>`margin-bottom`, `margin-top`, `max-height` |

</div>

## link

Source: `src/link/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-link-bg-active` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background-color` |
| `--mp-link-bg-hover` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background-color` |
| `--mp-link-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-link-danger-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-link-default-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-link-disabled-color` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-link-focus-color` | Public | `currentColor` | Local CSS<br>`outline` |
| `--mp-link-focus-offset` | Public | `2px` | Local CSS<br>`outline-offset` |
| `--mp-link-focus-opacity` | Public | `0.8` | Local CSS<br>`opacity` |
| `--mp-link-focus-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-link-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-link-icon-size` | Public | `1em` | Local CSS<br>`font-size` |
| `--mp-link-info-color` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-link-line-height` | Public | `1.5` | Local CSS<br>`line-height` |
| `--mp-link-margin-icon-right` | Public | `0.25em` | Local CSS<br>`margin-inline-end` |
| `--mp-link-padding-horizontal` | Public | `0.25em` | Local CSS<br>`padding` |
| `--mp-link-padding-vertical` | Public | `1px` | Local CSS<br>`padding` |
| `--mp-link-primary-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-link-secondary-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-link-size-icon` | Public | `var(--mp-link-icon-size)` | Local CSS<br>`font-size` |
| `--mp-link-size-lg-font-size` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-link-size-md-font-size` | Public | `var(--mp-link-font-size)` | Local CSS<br>`font-size` |
| `--mp-link-size-sm-font-size` | Public | `var(--mp-sys-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-link-size-xl-font-size` | Public | `var(--mp-sys-font-size-xl)` | Local CSS<br>`font-size` |
| `--mp-link-size-xs-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-link-spin-duration` | Public | `1s` | Local CSS<br>`animation` |
| `--mp-link-success-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-link-tertiary-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-link-text-color` | Public | `var(--mp-link-primary-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-active` | Public | `var(--mp-link-text-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-default` | Public | `var(--mp-link-default-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-disabled` | Public | `var(--mp-link-disabled-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-error` | Public | `var(--mp-link-danger-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-error-active` | Public | `var(--mp-link-text-color-error)` | Local CSS<br>`color` |
| `--mp-link-text-color-error-disabled` | Public | `var(--mp-link-disabled-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-error-hover` | Public | `var(--mp-link-text-color-error)` | Local CSS<br>`color` |
| `--mp-link-text-color-error-loading` | Public | `var(--mp-link-disabled-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-hover` | Public | `var(--mp-link-text-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-info` | Public | `var(--mp-link-info-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-loading` | Public | `var(--mp-link-disabled-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-primary` | Public | `var(--mp-link-primary-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-secondary` | Public | `var(--mp-link-secondary-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-success` | Public | `var(--mp-link-success-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-success-active` | Public | `var(--mp-link-text-color-success)` | Local CSS<br>`color` |
| `--mp-link-text-color-success-disabled` | Public | `var(--mp-link-disabled-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-success-hover` | Public | `var(--mp-link-text-color-success)` | Local CSS<br>`color` |
| `--mp-link-text-color-success-loading` | Public | `var(--mp-link-disabled-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-tertiary` | Public | `var(--mp-link-tertiary-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-warning` | Public | `var(--mp-link-warning-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-warning-active` | Public | `var(--mp-link-text-color-warning)` | Local CSS<br>`color` |
| `--mp-link-text-color-warning-disabled` | Public | `var(--mp-link-disabled-color)` | Local CSS<br>`color` |
| `--mp-link-text-color-warning-hover` | Public | `var(--mp-link-text-color-warning)` | Local CSS<br>`color` |
| `--mp-link-text-color-warning-loading` | Public | `var(--mp-link-disabled-color)` | Local CSS<br>`color` |
| `--mp-link-transition-duration` | Public | `0.15s` | Local CSS<br>`transition` |
| `--mp-link-warning-color` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |

</div>

## list

Source: `src/list/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-list-background` | Public | `var(--mp-color-bg-1)` | Local CSS<br>`background` |
| `--mp-list-border-color` | Public | `var(--mp-color-border-2)` | Local CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-list-border-radius` | Public | `4px` | Local CSS<br>`border-radius` |
| `--mp-list-border-width` | Public | `1px` | Local CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-list-empty-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-list-empty-padding` | Public | `24px 16px` | Local CSS<br>`padding` |
| `--mp-list-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-list-font-size-header` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-list-font-weight-header` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-list-item-prefix-margin-right` | Public | `12px` | Local CSS<br>`margin-inline-end` |
| `--mp-list-item-suffix-margin-left` | Public | `12px` | Local CSS<br>`margin-inline-start` |
| `--mp-list-line-height` | Public | `1.5` | Local CSS<br>`line-height` |
| `--mp-list-line-height-header` | Public | `1.5` | Local CSS<br>`line-height` |
| `--mp-list-loading-padding` | Public | `16px` | Local CSS<br>`padding` |
| `--mp-list-size-lg-padding-horizontal-footer` | Public | `16px` | Local CSS<br>`padding` |
| `--mp-list-size-lg-padding-horizontal-header` | Public | `16px` | Local CSS<br>`padding` |
| `--mp-list-size-lg-padding-horizontal-item` | Public | `20px` | Local CSS<br>`padding` |
| `--mp-list-size-lg-padding-vertical-footer` | Public | `12px` | Local CSS<br>`padding` |
| `--mp-list-size-lg-padding-vertical-header` | Public | `12px` | Local CSS<br>`padding` |
| `--mp-list-size-lg-padding-vertical-item` | Public | `16px` | Local CSS<br>`padding` |
| `--mp-list-size-md-padding-horizontal-footer` | Public | `16px` | Local CSS<br>`padding` |
| `--mp-list-size-md-padding-horizontal-header` | Public | `16px` | Local CSS<br>`padding` |
| `--mp-list-size-md-padding-horizontal-item` | Public | `16px` | Local CSS<br>`padding` |
| `--mp-list-size-md-padding-vertical-footer` | Public | `12px` | Local CSS<br>`padding` |
| `--mp-list-size-md-padding-vertical-header` | Public | `12px` | Local CSS<br>`padding` |
| `--mp-list-size-md-padding-vertical-item` | Public | `12px` | Local CSS<br>`padding` |
| `--mp-list-size-sm-padding-horizontal-footer` | Public | `16px` | Local CSS<br>`padding` |
| `--mp-list-size-sm-padding-horizontal-header` | Public | `16px` | Local CSS<br>`padding` |
| `--mp-list-size-sm-padding-horizontal-item` | Public | `12px` | Local CSS<br>`padding` |
| `--mp-list-size-sm-padding-vertical-footer` | Public | `12px` | Local CSS<br>`padding` |
| `--mp-list-size-sm-padding-vertical-header` | Public | `12px` | Local CSS<br>`padding` |
| `--mp-list-size-sm-padding-vertical-item` | Public | `8px` | Local CSS<br>`padding` |
| `--mp-list-text-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-list-text-color-header` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |

</div>

## loading

Source: `src/loading/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-loading-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color`, `color` |
| `--mp-loading-desc-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-loading-desc-margin` | Public | `8px 0 0` | Local CSS<br>`margin` |
| `--mp-loading-directive-z-index` | Public | `2000` | Local CSS<br>`z-index` |
| `--mp-loading-indicator-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-loading-opacity` | Public | `0.38` | Local CSS<br>`opacity` |
| `--mp-loading-overlay-background` | Public | `color-mix(in srgb, var(--mp-color-bg-white) 62%, transparent)` | Local CSS<br>`background` |

</div>

## loading-bar

Source: `src/loading-bar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-loading-bar-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-loading-bar-error-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background-color` |
| `--mp-loading-bar-height` | Public | `3px` | Local CSS<br>`height` |
| `--mp-loading-bar-transition-duration` | Public | `250ms` | Local CSS<br>`transition` |
| `--mp-loading-bar-transition-timing-function` | Public | `ease` | Local CSS<br>`transition` |

</div>

## mention

Source: `src/mention/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-mention-token-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |

</div>

## menu

Source: `src/menu/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-menu-background-color` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-menu-border-color` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background-color`, `border`, `border-top` |
| `--mp-menu-border-radius` | Public | `2px` | Local CSS<br>`border-radius` |
| `--mp-menu-group-title-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-menu-group-title-height` | Public | `20px` | Local CSS<br>`line-height` |
| `--mp-menu-group-title-padding` | Public | `4px 12px` | Local CSS<br>`padding` |
| `--mp-menu-group-title-text-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-menu-max-height` | Public | `278px` | Local CSS<br>`max-height` |
| `--mp-menu-option-arrow-icon-size` | Public | `18px` | Local CSS<br>`font-size` |
| `--mp-menu-option-arrow-padding` | Public | `0 6px 0 8px` | Local CSS<br>`padding` |
| `--mp-menu-option-bg-disabled` | Public | `transparent` | Local CSS<br>`background` |
| `--mp-menu-option-bg-hover` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-menu-option-bg-selected-hover` | Public | `var(--mp-menu-option-selected-background)` | Local CSS<br>`background-color` |
| `--mp-menu-option-disabled-color` | Public | `var(--mp-color-text-disabled)` | Local CSS<br>`color` |
| `--mp-menu-option-icon-margin-right` | Public | `8px` | Local CSS<br>`margin-inline-end` |
| `--mp-menu-option-lg-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-menu-option-lg-height` | Public | `46px` | Local CSS<br>`height` |
| `--mp-menu-option-md-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-menu-option-md-height` | Public | `38px` | Local CSS<br>`height` |
| `--mp-menu-option-padding` | Public | `0 12px` | Local CSS<br>`padding` |
| `--mp-menu-option-selected-background` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-menu-option-selected-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-menu-option-sm-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-menu-option-sm-height` | Public | `30px` | Local CSS<br>`height` |
| `--mp-menu-option-suffix-margin-left` | Public | `16px` | Local CSS<br>`margin-inline-start` |
| `--mp-menu-option-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-menu-option-xl-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-menu-option-xl-height` | Public | `54px` | Local CSS<br>`height` |
| `--mp-menu-option-xs-font-size` | Public | `var(--mp-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-menu-option-xs-height` | Public | `24px` | Local CSS<br>`height` |
| `--mp-menu-padding` | Public | `4px 0` | Local CSS<br>`margin`, `padding` |
| `--mp-menu-padding-vertical` | Public | `4px` | Local CSS<br>`margin-top` |

</div>

## message

Source: `src/message/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-message-action-margin` | Public | `0 8px` | Local CSS<br>`margin` |
| `--mp-message-border-radius` | Public | `4px` | Local CSS<br>`border-radius` |
| `--mp-message-box-shadow` | Public | `0 4px 12px rgba(0, 0, 0, 0.2)` | Local CSS<br>`box-shadow` |
| `--mp-message-close-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-message-close-margin-right` | Public | `4px` | Local CSS<br>`margin-inline-end` |
| `--mp-message-close-size` | Public | `32px` | Local CSS<br>`height`, `width` |
| `--mp-message-content-padding` | Public | `14px 16px` | Local CSS<br>`padding` |
| `--mp-message-focus-outline-offset` | Public | `-4px` | Local CSS<br>`outline-offset` |
| `--mp-message-focus-outline-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-message-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-message-icon-font-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-message-icon-margin` | Public | `0 8px` | Local CSS<br>`margin` |
| `--mp-message-margin` | Public | `6px 24px` | Local CSS<br>`margin` |
| `--mp-message-neutral-danger-bg` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-message-neutral-danger-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-color` |
| `--mp-message-neutral-danger-close-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-message-neutral-danger-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-neutral-danger-icon-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-message-neutral-default-bg` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-message-neutral-default-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-color` |
| `--mp-message-neutral-default-close-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-message-neutral-default-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-neutral-default-icon-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-neutral-info-bg` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-message-neutral-info-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-color` |
| `--mp-message-neutral-info-close-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-message-neutral-info-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-neutral-info-icon-color` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-message-neutral-loading-bg` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-message-neutral-loading-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-color` |
| `--mp-message-neutral-loading-close-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-message-neutral-loading-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-neutral-loading-icon-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-message-neutral-success-bg` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-message-neutral-success-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-color` |
| `--mp-message-neutral-success-close-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-message-neutral-success-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-neutral-success-icon-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-message-neutral-warning-bg` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-message-neutral-warning-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-color` |
| `--mp-message-neutral-warning-close-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-message-neutral-warning-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-neutral-warning-icon-color` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-message-solid-danger-bg` | Public | `var(--mp-sys-color-status-danger)` | Local CSS<br>`background-color` |
| `--mp-message-solid-danger-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-solid-danger-close-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-solid-danger-content-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-solid-danger-icon-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-solid-default-bg` | Public | `#333` | Local CSS<br>`background-color` |
| `--mp-message-solid-default-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-solid-default-close-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-message-solid-default-content-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-message-solid-default-icon-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-message-solid-info-bg` | Public | `var(--mp-sys-color-status-info)` | Local CSS<br>`background-color` |
| `--mp-message-solid-info-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-solid-info-close-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-solid-info-content-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-solid-info-icon-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-solid-loading-bg` | Public | `#333` | Local CSS<br>`background-color` |
| `--mp-message-solid-loading-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-solid-loading-close-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-message-solid-loading-content-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-message-solid-loading-icon-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-message-solid-success-bg` | Public | `var(--mp-sys-color-status-success)` | Local CSS<br>`background-color` |
| `--mp-message-solid-success-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-solid-success-close-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-solid-success-content-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-solid-success-icon-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-solid-warning-bg` | Public | `var(--mp-sys-color-status-warning)` | Local CSS<br>`background-color` |
| `--mp-message-solid-warning-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-solid-warning-close-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-solid-warning-content-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-solid-warning-icon-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-message-tonal-danger-bg` | Public | `var(--mp-color-danger-light-1)` | Local CSS<br>`background-color` |
| `--mp-message-tonal-danger-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-tonal-danger-close-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-danger-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-danger-icon-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-message-tonal-default-bg` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color` |
| `--mp-message-tonal-default-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-tonal-default-close-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-default-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-default-icon-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-info-bg` | Public | `rgba(var(--mp-blue-6), 0.12)` | Local CSS<br>`background-color` |
| `--mp-message-tonal-info-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-tonal-info-close-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-info-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-info-icon-color` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-message-tonal-loading-bg` | Public | `var(--mp-color-primary-light-1)` | Local CSS<br>`background-color` |
| `--mp-message-tonal-loading-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-tonal-loading-close-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-loading-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-loading-icon-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-message-tonal-success-bg` | Public | `var(--mp-color-success-light-1)` | Local CSS<br>`background-color` |
| `--mp-message-tonal-success-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-tonal-success-close-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-success-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-success-icon-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-message-tonal-warning-bg` | Public | `var(--mp-color-warning-light-1)` | Local CSS<br>`background-color` |
| `--mp-message-tonal-warning-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-message-tonal-warning-close-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-warning-content-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-message-tonal-warning-icon-color` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-message-transition-distance` | Public | `-12px` | Local CSS<br>`transform` |
| `--mp-message-transition-duration` | Public | `150ms` | Local CSS<br>`transition` |
| `--mp-message-transition-timing-function` | Public | `var(--mp-cubic-bezier)` | Local CSS<br>`transition` |
| `--mp-message-viewport-padding` | Public | `24px` | Local CSS<br>`max-width` |
| `--mp-message-width` | Public | `256px` | Local CSS<br>`width` |
| `--mp-message-wrapper-margin-bottom` | Public | `5%` | Local CSS<br>`bottom` |
| `--mp-message-wrapper-margin-top` | Public | `5%` | Local CSS<br>`top` |
| `--mp-message-z-index` | Public | `2000` | Local CSS<br>`z-index` |

</div>

## nav-menu

Source: `src/nav-menu/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-nav-menu-active-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color`, `outline` |
| `--mp-nav-menu-arrow-size` | Public | `6px` | Local CSS<br>`height`, `width` |
| `--mp-nav-menu-background` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background` |
| `--mp-nav-menu-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-top` |
| `--mp-nav-menu-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-nav-menu-disabled-color` | Public | `var(--mp-color-text-disabled)` | Local CSS<br>`color` |
| `--mp-nav-menu-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-nav-menu-gap` | Public | `8px` | Local CSS<br>`gap` |
| `--mp-nav-menu-height` | Public | `48px` | Local CSS<br>`min-height` |
| `--mp-nav-menu-padding` | Public | `12px 16px` | Local CSS<br>`padding` |
| `--mp-nav-menu-panel-padding` | Public | `12px` | Local CSS<br>`padding`, `padding-bottom` |
| `--mp-nav-menu-size-lg-height` | Public | `56px` | Local CSS<br>`min-height` |
| `--mp-nav-menu-size-sm-height` | Public | `40px` | Local CSS<br>`min-height` |
| `--mp-nav-menu-size-xl-height` | Public | `64px` | Local CSS<br>`min-height` |
| `--mp-nav-menu-size-xs-height` | Public | `32px` | Local CSS<br>`min-height` |
| `--mp-nav-menu-transition-duration` | Public | `200ms` | Local CSS<br>`transition` |

</div>

## notice-bar

Source: `src/notice-bar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-notice-bar-close-margin` | Public | `0 0 0 8px` | Local CSS<br>`margin` |
| `--mp-notice-bar-close-margin-rtl` | Public | `0 8px 0 0` | Local CSS<br>`margin` |
| `--mp-notice-bar-danger-background` | Public | `var(--mp-color-danger)` | Local CSS<br>`background` |
| `--mp-notice-bar-danger-color` | Public | `var(--mp-color-white)` | Local CSS<br>`color` |
| `--mp-notice-bar-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-notice-bar-height` | Public | `40px` | Local CSS<br>`min-height` |
| `--mp-notice-bar-icon-margin` | Public | `0 8px 0 0` | Local CSS<br>`margin` |
| `--mp-notice-bar-icon-margin-rtl` | Public | `0 0 0 8px` | Local CSS<br>`margin` |
| `--mp-notice-bar-icon-size` | Public | `18px` | Local CSS<br>`font-size` |
| `--mp-notice-bar-info-background` | Public | `var(--mp-color-info)` | Local CSS<br>`background` |
| `--mp-notice-bar-info-color` | Public | `var(--mp-color-white)` | Local CSS<br>`color` |
| `--mp-notice-bar-padding` | Public | `0 12px` | Local CSS<br>`padding` |
| `--mp-notice-bar-success-background` | Public | `var(--mp-color-success)` | Local CSS<br>`background` |
| `--mp-notice-bar-success-color` | Public | `var(--mp-color-white)` | Local CSS<br>`color` |
| `--mp-notice-bar-warning-background` | Public | `var(--mp-color-warning)` | Local CSS<br>`background` |
| `--mp-notice-bar-warning-color` | Public | `var(--mp-color-white)` | Local CSS<br>`color` |

</div>

## number-keyboard

Source: `src/number-keyboard/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-number-keyboard-background` | Public | `var(--mp-color-bg-1)` | Local CSS<br>`background` |
| `--mp-number-keyboard-close-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-number-keyboard-close-font-size` | Public | `var(--mp-font-size-lg, 16px)` | Local CSS<br>`font-size` |
| `--mp-number-keyboard-delete-icon-size` | Public | `22px` | Local CSS<br>`font-size` |
| `--mp-number-keyboard-header-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-number-keyboard-header-font-size` | Public | `var(--mp-font-size-md, 14px)` | Local CSS<br>`font-size` |
| `--mp-number-keyboard-header-height` | Public | `34px` | Local CSS<br>`height` |
| `--mp-number-keyboard-key-active-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-number-keyboard-key-background` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background` |
| `--mp-number-keyboard-key-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-number-keyboard-key-font-size` | Public | `22px` | Local CSS<br>`font-size` |
| `--mp-number-keyboard-key-gap` | Public | `6px` | Local CSS<br>`gap` |
| `--mp-number-keyboard-key-height` | Public | `48px` | Local CSS<br>`height`, `min-height` |
| `--mp-number-keyboard-padding` | Public | `6px` | Local CSS<br>`padding` |
| `--mp-number-keyboard-sidebar-width` | Public | `25%` | Local CSS<br>`width` |

</div>

## overlay

Source: `src/overlay/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-overlay-animation-duration` | Public | `var(--mp-sys-motion-duration-slow)` | Local CSS<br>`transition` |
| `--mp-overlay-background-color` | Public | `var(--mp-sys-color-scrim)` | Local CSS<br>`background-color` |
| `--mp-overlay-content-z-index` | Public | `var(--mp-sys-layer-raised)` | Local CSS<br>`z-index` |

</div>

## page-header

Source: `src/page-header/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-page-header-back-color` | Public | `var(--mp-color-text-2)` | Local CSS<br>`color` |
| `--mp-page-header-back-hover-bg` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-page-header-back-hover-size` | Public | `30px` | Local CSS<br>`height`, `width` |
| `--mp-page-header-back-size` | Public | `22px` | Local CSS<br>`font-size` |
| `--mp-page-header-content-margin-top` | Public | `16px` | Local CSS<br>`margin-top` |
| `--mp-page-header-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-page-header-footer-margin-top` | Public | `16px` | Local CSS<br>`margin-top` |
| `--mp-page-header-item-gap` | Public | `12px` | Local CSS<br>`margin-inline-start` |
| `--mp-page-header-row-gap` | Public | `12px` | Local CSS<br>`margin-bottom` |
| `--mp-page-header-subtitle-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-page-header-title-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-page-header-title-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-page-header-title-font-weight` | Public | `600` | Local CSS<br>`font-weight` |

</div>

## pagination

Source: `src/pagination/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-pagination-active-background` | Public | `var(--mp-color-primary-light-1)` | Local CSS<br>`background` |
| `--mp-pagination-active-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-pagination-disabled-background` | Public | `var(--mp-color-fill-1)` | Local CSS<br>`background` |
| `--mp-pagination-disabled-color` | Public | `var(--mp-color-text-disabled)` | Local CSS<br>`color` |
| `--mp-pagination-focus-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`outline` |
| `--mp-pagination-focus-offset` | Public | `1px` | Local CSS<br>`outline-offset` |
| `--mp-pagination-focus-space` | Public | `3px` | Local CSS<br>`padding` |
| `--mp-pagination-focus-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-pagination-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-pagination-gap` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`gap` |
| `--mp-pagination-hover-background` | Public | `var(--mp-color-fill-1)` | Local CSS<br>`background` |
| `--mp-pagination-icon-size` | Public | `16px` | Local CSS<br>`height`, `width` |
| `--mp-pagination-input-width` | Public | `32px` | Local CSS<br>`width` |
| `--mp-pagination-item-background` | Public | `transparent` | Local CSS<br>`background` |
| `--mp-pagination-item-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-pagination-item-gap` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`gap`, `padding-inline-start` |
| `--mp-pagination-item-padding` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-pagination-select-width` | Public | `max-content` | Local CSS<br>`width` |
| `--mp-pagination-size-lg` | Public | `44px` | Local CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-md` | Public | `36px` | Local CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-sm` | Public | `28px` | Local CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-xl` | Public | `52px` | Local CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-xs` | Public | `24px` | Local CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-text-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-pagination-touch-size` | Public | `44px` | Local CSS<br>`min-height` |

</div>

## paper

Source: `src/paper/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-paper-background` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background` |
| `--mp-paper-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-paper-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-paper-border-width` | Public | `1px` | Local CSS<br>`border` |
| `--mp-paper-transition-duration` | Public | `var(--mp-sys-motion-duration-slow)` | Local CSS<br>`transition` |

</div>

## people-select

Source: `src/people-select/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-people-select-avatar-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-people-select-avatar-size` | Public | `24px` | Local CSS<br>`height`, `width` |
| `--mp-people-select-content-gap` | Public | `8px` | Local CSS<br>`gap` |

</div>

## picker

Source: `src/picker/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-picker-background` | Public | `var(--mp-color-body)` | Local CSS<br>`background`, `background-image` |
| `--mp-picker-mask-background-image` | Public | `linear-gradient(180deg, color-mix(in srgb, var(--mp-picker-background) 90%, transparent), color-mix(in srgb, var(--mp-picker-background) 40%, transparent)), linear-gradient(0deg, color-mix(in srgb, var(--mp-picker-background) 90%, transparent), color-mix(in srgb, var(--mp-picker-background) 40%, transparent))` | Local CSS<br>`background-image` |
| `--mp-picker-option-active-text-color` | Public | `var(--mp-picker-option-text-color)` | Local CSS<br>`color` |
| `--mp-picker-option-check-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-picker-option-check-right` | Public | `12px` | Local CSS<br>`inset-inline-end` |
| `--mp-picker-option-check-size` | Public | `18px` | Local CSS<br>`font-size` |
| `--mp-picker-option-disabled-opacity` | Public | `0.5` | Local CSS<br>`opacity` |
| `--mp-picker-option-disabled-text-color` | Public | `var(--mp-color-text-disabled)` | Local CSS<br>`color` |
| `--mp-picker-option-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-picker-option-padding-horizontal` | Public | `28px` | Local CSS<br>`padding` |
| `--mp-picker-option-text-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-picker-picked-border` | Public | `1px solid var(--mp-color-border-2)` | Local CSS<br>`border-bottom`, `border-top` |
| `--mp-picker-scroll-easing` | Public | `cubic-bezier(0.23, 1, 0.68, 1)` | Local CSS<br>`transition-timing-function` |
| `--mp-picker-title-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-picker-title-text-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-picker-toolbar-height` | Public | `44px` | Local CSS<br>`height` |
| `--mp-picker-toolbar-padding` | Public | `0 4px` | Local CSS<br>`padding` |
| `--mp-picker-transition-duration` | Public | `250ms` | Local CSS<br>`transition` |

</div>

## popover

Source: `src/popover/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-popover-animation-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-popover-arrow-z-index` | Public | `1` | Local CSS<br>`z-index` |
| `--mp-popover-background` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-popover-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-popover-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-popover-border-width` | Public | `1px` | Local CSS<br>`border` |
| `--mp-popover-box-shadow` | Public | `0 3px 3px -2px var(--mp-shadow-key-umbra-opacity), 0 3px 4px 0 var(--mp-shadow-key-penumbra-opacity), 0 1px 8px 0 var(--mp-shadow-key-ambient-opacity)` | Local CSS<br>`box-shadow` |
| `--mp-popover-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-popover-line-height` | Public | `var(--mp-line-height)` | Local CSS<br>`line-height` |
| `--mp-popover-padding-horizontal` | Public | `var(--mp-sys-space-7)` | Local CSS<br>`padding` |
| `--mp-popover-padding-vertical` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`padding` |
| `--mp-popover-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-popover-title-content-gap` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`margin-top` |
| `--mp-popover-title-font-size` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-popover-title-font-weight` | Public | `var(--mp-sys-font-weight-medium)` | Local CSS<br>`font-weight` |
| `--mp-popover-title-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |

</div>

## popup

Source: `src/popup/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-popup-content-background-color` | Public | `var(--mp-sys-color-surface-raised)` | Local CSS<br>`background-color` |
| `--mp-popup-content-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-popup-overlay-background-color` | Public | `var(--mp-sys-color-scrim)` | Local CSS<br>`background-color` |
| `--mp-popup-transition-duration` | Public | `250ms` | Local CSS<br>`transition` |
| `--mp-popup-transition-timing-function` | Public | `ease` | Local CSS<br>`transition` |

</div>

## progress

Source: `src/progress/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-internal-progress-highlight` | Internal | `rgba(255, 255, 255, 0.5)` | Local CSS<br>`background` |
| `--mp-progress-animation-duration` | Public | `1.5s` | Local CSS<br>`animation`, `animation-delay` |
| `--mp-progress-danger-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-progress-default-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-progress-font-size` | Public | `var(--mp-sys-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-progress-info-color` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-progress-line-border-radius` | Public | `9999px` | Local CSS<br>`border-radius` |
| `--mp-progress-primary-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-progress-secondary-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-progress-steps-gap` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`gap` |
| `--mp-progress-success-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-progress-tertiary-color` | Public | `var(--mp-sys-color-content-tertiary)` | Local CSS<br>`color` |
| `--mp-progress-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-progress-text-gap` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`gap` |
| `--mp-progress-track-color` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background`, `stroke` |
| `--mp-progress-transition-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-progress-warning-color` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |

</div>

## progress-group

Source: `src/progress-group/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-progress-group-dot-size` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-font-size` | Public | `var(--mp-sys-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-progress-group-gap` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`gap` |
| `--mp-progress-group-item-gap` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`gap` |
| `--mp-progress-group-muted-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-progress-group-radius` | Public | `9999px` | Local CSS<br>`border-radius`, `clip-path` |
| `--mp-progress-group-size-lg-thickness` | Public | `12px` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-size-md-thickness` | Public | `8px` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-size-sm-thickness` | Public | `4px` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-size-xl-thickness` | Public | `16px` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-size-xs-thickness` | Public | `2px` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-progress-group-text-font-weight` | Public | `var(--mp-sys-font-weight-medium)` | Local CSS<br>`font-weight` |
| `--mp-progress-group-tooltip-bg` | Public | `var(--mp-sys-color-surface-tooltip)` | Local CSS<br>`background` |
| `--mp-progress-group-tooltip-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-progress-group-tooltip-duration` | Public | `var(--mp-sys-motion-duration-fast)` | Local CSS<br>`animation` |
| `--mp-progress-group-tooltip-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-progress-group-tooltip-line-height` | Public | `1.4` | Local CSS<br>`line-height` |
| `--mp-progress-group-tooltip-max-width` | Public | `240px` | Local CSS<br>`max-width` |
| `--mp-progress-group-tooltip-offset` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`bottom`, `height`, `inset-inline-start`, `width` |
| `--mp-progress-group-tooltip-padding` | Public | `5px var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-progress-group-tooltip-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-progress-group-track-color` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background`, `stroke` |
| `--mp-progress-group-transition-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`animation`, `transition` |

</div>

## pull-refresh

Source: `src/pull-refresh/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-pull-refresh-background` | Public | `#fff` | Local CSS<br>`background-color` |
| `--mp-pull-refresh-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-pull-refresh-icon-size` | Public | `25px` | Local CSS<br>`font-size` |
| `--mp-pull-refresh-size` | Public | `40px` | Local CSS<br>`height`, `width` |
| `--mp-pull-refresh-success-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |

</div>

## radio

Source: `src/radio/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-internal-radio-focus-width` | Internal | `2px` | Local CSS<br>`box-shadow`, `text-decoration-thickness` |
| `--mp-internal-radio-segment-bg` | Internal | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background` |
| `--mp-internal-radio-segment-gap` | Internal | `3px` | Local CSS<br>`gap`, `padding` |
| `--mp-internal-radio-segment-group-bg` | Internal | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background` |
| `--mp-internal-radio-segment-height` | Internal | `var(--mp-sys-control-height-md)` | Local CSS<br>`line-height`, `min-height` |
| `--mp-internal-radio-segment-hover` | Internal | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-internal-radio-segment-padding` | Internal | `12px` | Local CSS<br>`padding-inline` |
| `--mp-internal-radio-segment-radius` | Internal | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-radio-action-padding` | Public | `6px` | Local CSS<br>`padding` |
| `--mp-radio-animation-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-radio-control-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`color` |
| `--mp-radio-control-color-checked` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-radio-control-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-radio-control-color-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`box-shadow`, `color` |
| `--mp-radio-control-size` | Public | `24px` | Local CSS<br>`font-size`, `height`, `width` |
| `--mp-radio-group-gap` | Public | `0` | Local CSS<br>`gap` |
| `--mp-radio-label-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-radio-label-gap` | Public | `0` | Local CSS<br>`margin-inline-start` |
| `--mp-radio-label-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-radio-label-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |

</div>

## rate

Source: `src/rate/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-rate-action-padding` | Public | `4px` | Local CSS<br>`padding` |
| `--mp-rate-active-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-rate-active-scale` | Public | `1.2` | Local CSS<br>`transform` |
| `--mp-rate-disabled-color` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-rate-empty-color` | Public | `var(--mp-color-text)` | Local CSS<br>`color` |
| `--mp-rate-error-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-rate-focus-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`outline` |
| `--mp-rate-focus-offset` | Public | `2px` | Local CSS<br>`outline-offset` |
| `--mp-rate-focus-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-rate-gap` | Public | `0px` | Local CSS<br>`margin-inline-end` |
| `--mp-rate-min-height` | Public | `0px` | Local CSS<br>`min-height` |
| `--mp-rate-scale-duration` | Public | `250ms` | Local CSS<br>`animation` |
| `--mp-rate-size` | Public | `24px` | Local CSS<br>`font-size` |
| `--mp-rate-transition-duration` | Public | `250ms` | Local CSS<br>`transition` |
| `--mp-rate-transition-timing-function` | Public | `ease` | Local CSS<br>`animation`, `transition` |

</div>

## result

Source: `src/result/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-result-background` | Public | `var(--mp-color-bg-white)` | Local CSS<br>`background-color` |
| `--mp-result-border-radius` | Public | `3px` | Local CSS<br>`border-radius` |
| `--mp-result-content-margin` | Public | `20px 0 0` | Local CSS<br>`margin` |
| `--mp-result-danger-border-color` | Public | `rgba(244, 67, 54, 0.3)` | Local CSS<br>`border-color` |
| `--mp-result-danger-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`fill` |
| `--mp-result-empty-border-color` | Public | `rgba(158, 158, 158, 0.3)` | Local CSS<br>`border-color` |
| `--mp-result-empty-color` | Public | `#9e9e9e` | Local CSS<br>`fill` |
| `--mp-result-extra-margin` | Public | `20px 0 0` | Local CSS<br>`margin` |
| `--mp-result-image-size` | Public | `80px` | Local CSS<br>`border`, `height`, `width` |
| `--mp-result-info-border-color` | Public | `rgba(0, 175, 239, 0.3)` | Local CSS<br>`border-color` |
| `--mp-result-info-color` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`fill` |
| `--mp-result-padding` | Public | `24px` | Local CSS<br>`padding` |
| `--mp-result-question-border-color` | Public | `rgba(96, 125, 139, 0.3)` | Local CSS<br>`border-color` |
| `--mp-result-question-color` | Public | `#607d8b` | Local CSS<br>`fill` |
| `--mp-result-subtitle-color` | Public | `rgba(0, 0, 0, 0.6)` | Local CSS<br>`color` |
| `--mp-result-subtitle-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-result-subtitle-line-height` | Public | `1.6` | Local CSS<br>`line-height` |
| `--mp-result-subtitle-margin` | Public | `10px 0 0` | Local CSS<br>`margin` |
| `--mp-result-success-border-color` | Public | `rgba(0, 196, 143, 0.3)` | Local CSS<br>`border-color` |
| `--mp-result-success-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`fill` |
| `--mp-result-title-color` | Public | `#444` | Local CSS<br>`color` |
| `--mp-result-title-font-size` | Public | `32px` | Local CSS<br>`font-size` |
| `--mp-result-title-font-weight` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-result-title-margin` | Public | `15px 0 0` | Local CSS<br>`margin` |
| `--mp-result-warning-border-color` | Public | `rgba(255, 159, 0, 0.3)` | Local CSS<br>`border-color` |
| `--mp-result-warning-color` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`fill` |

</div>

## ripple

Source: `src/ripple/style/token.less`

expand-duration / fade-duration reach transform / opacity transitions; runtime also reads their resolved duration/delay from the actual wave to avoid premature fading/removal. The two 250ms minimum lifecycle policies are not CSS tokens. See the design guide for sampling boundaries and cleanup ownership. This indirect timing consumption is not a literal var() runtime reference.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-ripple-color` | Public | `currentColor` | Local CSS<br>`background-color` |
| `--mp-ripple-cubic-bezier` | Public | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` | Local CSS<br>`transition` |
| `--mp-ripple-expand-duration` | Public | `200ms` | Local CSS<br>`transition` |
| `--mp-ripple-fade-duration` | Public | `140ms` | Local CSS<br>`transition` |

</div>

## safe-area

Source: `src/safe-area/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-safe-area-bottom` | Public | `env(safe-area-inset-bottom, 0px)` (`html`) | Local CSS<br>`margin-bottom`, `padding-bottom` |
| `--mp-safe-area-left` | Public | `env(safe-area-inset-left, 0px)` (`html`) | Local CSS<br>`inset-inline-end`, `margin-left`, `padding-left`, `width` |
| `--mp-safe-area-right` | Public | `env(safe-area-inset-right, 0px)` (`html`) | Local CSS<br>`inset-inline-end`, `margin-right`, `padding-right`, `width` |
| `--mp-safe-area-top` | Public | `env(safe-area-inset-top, 0px)` (`html`) | Local CSS<br>`margin-top`, `padding-top` |

</div>

## search

Source: `src/search/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-search-action-color-text` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-search-action-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-search-action-spacing-inline-start` | Public | `16px` | Local CSS<br>`margin-inline-start` |
| `--mp-search-color-bg` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background` |
| `--mp-search-color-icon` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-search-field-color-bg` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background` |
| `--mp-search-field-radius` | Public | `4px` | Local CSS<br>`border-radius` |
| `--mp-search-field-size-min-height` | Public | `36px` | Local CSS<br>`border-radius`, `line-height`, `min-height` |
| `--mp-search-field-spacing-padding` | Public | `0 12px` | Local CSS<br>`padding` |
| `--mp-search-history-item-color-border` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-bottom` |
| `--mp-search-history-item-color-text` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-search-history-item-size-min-height` | Public | `44px` | Local CSS<br>`min-height` |
| `--mp-search-history-spacing-padding` | Public | `8px 16px 24px` | Local CSS<br>`padding` |
| `--mp-search-icon-spacing` | Public | `8px` | Local CSS<br>`margin-inline-end` |
| `--mp-search-label-color-text` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-search-label-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-search-label-spacing-inline-end` | Public | `10px` | Local CSS<br>`margin-inline-end` |
| `--mp-search-opacity-disabled` | Public | `0.6` | Local CSS<br>`opacity` |
| `--mp-search-select-icon-size` | Public | `18px` | Local CSS<br>`font-size` |
| `--mp-search-select-icon-spacing` | Public | `2px` | Local CSS<br>`margin-inline-start` |
| `--mp-search-select-size-max-width` | Public | `120px` | Local CSS<br>`max-width` |
| `--mp-search-select-size-min-width` | Public | `96px` | Local CSS<br>`min-width` |
| `--mp-search-size-icon` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-search-size-min-height` | Public | `48px` | Local CSS<br>`min-height` |
| `--mp-search-spacing-padding` | Public | `8px 16px` | Local CSS<br>`padding` |

</div>

## section

Source: `src/section/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-section-accent-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background`, `border`, `border-inline-start` |
| `--mp-section-after-gap` | Public | `24px` | Local CSS<br>`margin-block`, `padding-block-start` |
| `--mp-section-before-gap` | Public | `32px` | Local CSS<br>`padding-block-start` |
| `--mp-section-card-background` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background-color` |
| `--mp-section-card-padding` | Public | `16px` | Local CSS<br>`padding` |
| `--mp-section-card-radius` | Public | `6px` | Local CSS<br>`border-radius` |
| `--mp-section-content-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-section-description-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-section-description-gap` | Public | `4px` | Local CSS<br>`margin-block-start` |
| `--mp-section-description-line-height` | Public | `20px` | Local CSS<br>`line-height` |
| `--mp-section-description-size` | Public | `13px` | Local CSS<br>`font-size` |
| `--mp-section-divider-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-block-start` |
| `--mp-section-divider-width` | Public | `1px` | Local CSS<br>`border`, `border-block-start`, `border-radius` |
| `--mp-section-header-gap` | Public | `16px` | Local CSS<br>`margin-block-start` |
| `--mp-section-heading-gap` | Public | `16px` | Local CSS<br>`margin-inline-start` |
| `--mp-section-heading-size-step` | Public | `1px` | Local CSS<br>`font-size`, `line-height` |
| `--mp-section-marker-gap` | Public | `12px` | Local CSS<br>`padding-inline-end`, `padding-inline-start`, `row-gap` |
| `--mp-section-marker-height` | Public | `calc(100% - 1lh + 1em)` | Local CSS<br>`height` |
| `--mp-section-marker-radius` | Public | `2px` | Local CSS<br>`border-radius` |
| `--mp-section-marker-width` | Public | `3px` | Local CSS<br>`border-inline-start`, `padding-inline-start`, `width` |
| `--mp-section-outline-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-section-size-lg-card-padding` | Public | `20px` | Local CSS<br>`padding` |
| `--mp-section-size-lg-header-gap` | Public | `20px` | Local CSS<br>`margin-block-start` |
| `--mp-section-size-lg-marker-height` | Public | `calc(100% - 1lh + 1em)` | Local CSS<br>`height` |
| `--mp-section-size-lg-title-line-height` | Public | `28px` | Local CSS<br>`line-height` |
| `--mp-section-size-lg-title-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-section-size-sm-card-padding` | Public | `12px` | Local CSS<br>`padding` |
| `--mp-section-size-sm-header-gap` | Public | `12px` | Local CSS<br>`margin-block-start` |
| `--mp-section-size-sm-marker-height` | Public | `calc(100% - 1lh + 1em)` | Local CSS<br>`height` |
| `--mp-section-size-sm-title-line-height` | Public | `20px` | Local CSS<br>`line-height` |
| `--mp-section-size-sm-title-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-section-size-xl-card-padding` | Public | `24px` | Local CSS<br>`padding` |
| `--mp-section-size-xl-header-gap` | Public | `24px` | Local CSS<br>`margin-block-start` |
| `--mp-section-size-xl-marker-height` | Public | `calc(100% - 1lh + 1em)` | Local CSS<br>`height` |
| `--mp-section-size-xl-title-line-height` | Public | `32px` | Local CSS<br>`line-height` |
| `--mp-section-size-xl-title-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-section-size-xs-card-padding` | Public | `8px` | Local CSS<br>`padding` |
| `--mp-section-size-xs-header-gap` | Public | `8px` | Local CSS<br>`margin-block-start` |
| `--mp-section-size-xs-marker-height` | Public | `calc(100% - 1lh + 1em)` | Local CSS<br>`height` |
| `--mp-section-size-xs-title-line-height` | Public | `18px` | Local CSS<br>`line-height` |
| `--mp-section-size-xs-title-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-section-title-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-section-title-line-height` | Public | `24px` | Local CSS<br>`line-height` |
| `--mp-section-title-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-section-title-weight` | Public | `600` | Local CSS<br>`font-weight` |
| `--mp-section-tonal-background` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color` |

</div>

## select

Source: `src/select/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-select-popup-bg` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-select-popup-border-color` | Public | `var(--mp-sys-color-border-subtle)` | Local CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-select-popup-border-radius` | Public | `var(--mp-sys-radius-lg)` | Local CSS<br>`border-radius` |
| `--mp-select-popup-box-shadow` | Public | `0 8px 24px rgba(0, 0, 0, 0.08)` | Local CSS<br>`box-shadow` |
| `--mp-select-popup-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-select-popup-group-title-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-select-popup-group-title-height` | Public | `20px` | Local CSS<br>`line-height` |
| `--mp-select-popup-group-title-padding-horizontal` | Public | `var(--mp-select-popup-option-padding-horizontal)` | Local CSS<br>`padding` |
| `--mp-select-popup-group-title-padding-top` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-top` |
| `--mp-select-popup-group-title-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-select-popup-loading-min-height` | Public | `50px` | Local CSS<br>`min-height` |
| `--mp-select-popup-max-height` | Public | `200px` | Local CSS<br>`max-height` |
| `--mp-select-popup-option-bg` | Public | `transparent` | Local CSS<br>`background-color` |
| `--mp-select-popup-option-bg-disabled` | Public | `transparent` | Local CSS<br>`background-color` |
| `--mp-select-popup-option-bg-hover` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background`, `background-color` |
| `--mp-select-popup-option-bg-selected` | Public | `transparent` | Local CSS<br>`background`, `background-color` |
| `--mp-select-popup-option-bg-selected-hover` | Public | `var(--mp-select-popup-option-bg-hover)` | Local CSS<br>`background`, `background-color` |
| `--mp-select-popup-option-border-radius` | Public | `0` | Local CSS<br>`border-radius` |
| `--mp-select-popup-option-check-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-select-popup-option-check-gap` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-inline-start` |
| `--mp-select-popup-option-check-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`height`, `width` |
| `--mp-select-popup-option-font-weight-selected` | Public | `var(--mp-sys-font-weight-medium)` | Local CSS<br>`font-weight` |
| `--mp-select-popup-option-height` | Public | `36px` | Local CSS<br>`line-height` |
| `--mp-select-popup-option-icon-margin-right` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-inline-end` |
| `--mp-select-popup-option-padding-horizontal` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`padding`, `padding-inline` |
| `--mp-select-popup-option-suffix-icon-margin-left` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`margin-inline-start` |
| `--mp-select-popup-option-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-select-popup-option-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-select-popup-option-text-color-hover` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-select-popup-option-text-color-selected` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-select-popup-padding-horizontal` | Public | `0` | Local CSS<br>`padding-inline` |
| `--mp-select-popup-padding-vertical` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`padding`, `padding-block`, `padding-block-end`, `padding-block-start` |

</div>

## signature

Source: `src/signature/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-signature-background-color` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background` |
| `--mp-signature-border-radius` | Public | `4px` | Local CSS<br>`border-radius` |
| `--mp-signature-height` | Public | `200px` | Local CSS<br>`height` |
| `--mp-signature-stroke-color` | Public | `#333` | Local CSS<br>`color` |

</div>

## skeleton

Source: `src/skeleton/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-skeleton-animation-background` | Public | `linear-gradient(90deg, transparent, var(--mp-sys-color-surface-default), transparent)` | Local CSS<br>`background` |
| `--mp-skeleton-animation-duration` | Public | `1s` | Local CSS<br>`animation` |
| `--mp-skeleton-avatar-background-color` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-skeleton-avatar-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-skeleton-avatar-margin-right` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`margin-inline-end` |
| `--mp-skeleton-avatar-size` | Public | `34px` | Local CSS<br>`height`, `width` |
| `--mp-skeleton-card-background-color` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-skeleton-card-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-skeleton-card-height` | Public | `160px` | Local CSS<br>`height` |
| `--mp-skeleton-card-margin-bottom` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`margin-bottom` |
| `--mp-skeleton-content-padding` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`padding` |
| `--mp-skeleton-row-border-radius` | Public | `10px` | Local CSS<br>`border-radius` |
| `--mp-skeleton-row-height` | Public | `12px` | Local CSS<br>`height` |
| `--mp-skeleton-row-margin-top` | Public | `10px` | Local CSS<br>`margin-top` |
| `--mp-skeleton-shape-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-skeleton-shape-size-lg` | Public | `60px` | Local CSS<br>`height`, `width` |
| `--mp-skeleton-shape-size-md` | Public | `48px` | Local CSS<br>`height`, `width` |
| `--mp-skeleton-shape-size-sm` | Public | `36px` | Local CSS<br>`height`, `width` |
| `--mp-skeleton-title-background-color` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-skeleton-title-border-radius` | Public | `10px` | Local CSS<br>`border-radius` |
| `--mp-skeleton-title-width` | Public | `50%` | Local CSS<br>`width` |
| `--mp-skeleton-transition-duration` | Public | `var(--mp-sys-motion-duration-slow)` | Local CSS<br>`transition` |

</div>

## slider

Source: `src/slider/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-internal-slider-border-width` | Internal | `2px` | Local CSS<br>`border`, `outline` |
| `--mp-internal-slider-focus-offset` | Internal | `3px` | Local CSS<br>`outline-offset` |
| `--mp-internal-slider-mark-offset` | Internal | `8px` | Local CSS<br>`left`, `top` |
| `--mp-slider-active-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background`, `outline` |
| `--mp-slider-control-height` | Public | `var(--mp-sys-control-height-md)` | Local CSS<br>`height`, `min-height`, `padding-bottom`, `padding-inline-end`, `width` |
| `--mp-slider-disabled-color` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`background`, `border-color` |
| `--mp-slider-error-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background`, `border-color` |
| `--mp-slider-font-size` | Public | `var(--mp-sys-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-slider-gap` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`bottom`, `gap`, `left`, `padding` |
| `--mp-slider-input-width` | Public | `80px` | Local CSS<br>`width` |
| `--mp-slider-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-slider-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-slider-thumb-border-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`border` |
| `--mp-slider-thumb-color` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background` |
| `--mp-slider-thumb-size` | Public | `16px` | Local CSS<br>`height`, `width` |
| `--mp-slider-tooltip-background` | Public | `var(--mp-sys-color-surface-tooltip)` | Local CSS<br>`background` |
| `--mp-slider-tooltip-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-slider-track-color` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-slider-track-height` | Public | `4px` | Local CSS<br>`height`, `width` |
| `--mp-slider-transition-duration` | Public | `var(--mp-sys-motion-duration-fast)` | Local CSS<br>`transition` |

</div>

## space

Source: `src/space/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-space-size-lg-column-gap` | Public | `var(--mp-sys-space-5)` | Reviewed dynamic runtime<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-lg-row-gap` | Public | `var(--mp-sys-space-6)` | Reviewed dynamic runtime<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-md-column-gap` | Public | `var(--mp-sys-space-4)` | Reviewed dynamic runtime<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-md-row-gap` | Public | `var(--mp-sys-space-5)` | Reviewed dynamic runtime<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-sm-column-gap` | Public | `var(--mp-sys-space-3)` | Reviewed dynamic runtime<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-sm-row-gap` | Public | `var(--mp-sys-space-4)` | Reviewed dynamic runtime<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-xl-column-gap` | Public | `var(--mp-sys-space-6)` | Reviewed dynamic runtime<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-xl-row-gap` | Public | `var(--mp-sys-space-8)` | Reviewed dynamic runtime<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-xs-column-gap` | Public | `var(--mp-sys-space-2)` | Reviewed dynamic runtime<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |
| `--mp-space-size-xs-row-gap` | Public | `var(--mp-sys-space-2)` | Reviewed dynamic runtime<br>`space/Space.tsx: getSize -> gapStyle -> style.gap` |

</div>

## statistic

Source: `src/statistic/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-statistic-decimal-font-size` | Public | `inherit` | Local CSS<br>`font-size` |
| `--mp-statistic-extra-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-statistic-extra-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-statistic-extra-margin-top` | Public | `8px` | Local CSS<br>`margin-top` |
| `--mp-statistic-prefix-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-statistic-prefix-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-statistic-prefix-spacing` | Public | `4px` | Local CSS<br>`margin-inline-end` |
| `--mp-statistic-suffix-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-statistic-suffix-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-statistic-suffix-spacing` | Public | `4px` | Local CSS<br>`margin-inline-start` |
| `--mp-statistic-title-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-statistic-title-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-statistic-title-margin-bottom` | Public | `8px` | Local CSS<br>`margin-bottom` |
| `--mp-statistic-value-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-statistic-value-font-size` | Public | `28px` | Local CSS<br>`font-size` |
| `--mp-statistic-value-font-weight` | Public | `500` | Local CSS<br>`font-weight` |

</div>

## steps

Source: `src/steps/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-steps-arrow-item-bg-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-finish` | Public | `var(--mp-sys-color-state-selected)` | Local CSS<br>`background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-process` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-bg-wait` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color`, `border-inline-start` |
| `--mp-steps-arrow-item-description-color-error` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-description-color-finish` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-description-color-process` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-description-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-description-margin-top` | Public | `0` | Local CSS<br>`margin-top` |
| `--mp-steps-arrow-item-gap` | Public | `4px` | Local CSS<br>`margin-inline-end` |
| `--mp-steps-arrow-item-title-color-error` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-title-color-finish` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-title-color-process` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-title-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-title-font-weight-active` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-steps-arrow-size-md-title-padding-left` | Public | `16px` | Local CSS<br>`padding-inline-start` |
| `--mp-steps-arrow-size-sm-title-padding-left` | Public | `20px` | Local CSS<br>`padding-inline-start` |
| `--mp-steps-changeable-hover-text-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-steps-circle-horizontal-item-description-margin-top` | Public | `2px` | Local CSS<br>`margin-top` |
| `--mp-steps-circle-item-bg-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-bg-finish` | Public | `var(--mp-sys-color-state-selected)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-bg-process` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-bg-wait` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-border-color-error` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-steps-circle-item-border-color-finish` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-steps-circle-item-border-color-process` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-steps-circle-item-border-color-wait` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-steps-circle-item-description-color-error` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-description-color-finish` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-description-color-process` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-description-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-icon-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-steps-circle-item-icon-gap` | Public | `12px` | Local CSS<br>`inset-inline-start`, `margin-inline-end`, `padding-inline-end` |
| `--mp-steps-circle-item-icon-text-color-error` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-icon-text-color-finish` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-icon-text-color-process` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-icon-text-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-tail-color-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-tail-color-process` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-tail-color-wait` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-tail-size` | Public | `1px` | Local CSS<br>`height`, `inset-inline-start`, `top`, `width` |
| `--mp-steps-circle-item-title-color-error` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-title-color-finish` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-title-color-process` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-title-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-title-font-weight-active` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-steps-circle-tail-hack-width` | Public | `5000px` | Local CSS<br>`width` |
| `--mp-steps-circle-vertical-item-description-margin-top` | Public | `2px` | Local CSS<br>`margin-top` |
| `--mp-steps-circle-vertical-tail-padding-extra` | Public | `6px` | Local CSS<br>`padding` |
| `--mp-steps-direction-horizontal-description-width` | Public | `140px` | Local CSS<br>`max-width` |
| `--mp-steps-dot-horizontal-item-description-margin-top` | Public | `4px` | Local CSS<br>`margin-top` |
| `--mp-steps-dot-horizontal-item-title-margin-top` | Public | `4px` | Local CSS<br>`margin-top` |
| `--mp-steps-dot-item-bg-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background-color` |
| `--mp-steps-dot-item-bg-finish` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-steps-dot-item-bg-process` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-steps-dot-item-bg-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`background-color` |
| `--mp-steps-dot-item-border-color-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`border-color` |
| `--mp-steps-dot-item-border-color-finish` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`border-color` |
| `--mp-steps-dot-item-border-color-process` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`border-color` |
| `--mp-steps-dot-item-border-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`border-color` |
| `--mp-steps-dot-item-description-color-error` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-description-color-finish` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-description-color-process` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-description-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-icon-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-steps-dot-item-icon-gap` | Public | `4px` | Local CSS<br>`inset-inline-start`, `margin-inline-end`, `padding-top` |
| `--mp-steps-dot-item-icon-margin-left` | Public | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-dot-item-icon-size)) / 2)` | Local CSS<br>`inset-inline-start`, `margin-inline-start` |
| `--mp-steps-dot-item-icon-size` | Public | `8px` | Local CSS<br>`height`, `inset-inline-start`, `margin-inline-end`, `margin-inline-start`, `margin-top`, `padding-top`, `top`, `width` |
| `--mp-steps-dot-item-icon-size-active` | Public | `10px` | Local CSS<br>`height`, `margin-inline-start`, `margin-top`, `width` |
| `--mp-steps-dot-item-tail-color-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background-color` |
| `--mp-steps-dot-item-tail-color-process` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-steps-dot-item-tail-color-wait` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`background-color` |
| `--mp-steps-dot-item-tail-size` | Public | `1px` | Local CSS<br>`height`, `top` |
| `--mp-steps-dot-item-title-color-error` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-title-color-finish` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-title-color-process` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-title-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-title-font-weight-active` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-steps-dot-vertical-item-description-margin-top` | Public | `4px` | Local CSS<br>`margin-top` |
| `--mp-steps-dot-vertical-item-dot-margin-top` | Public | `8px` | Local CSS<br>`margin-top` |
| `--mp-steps-dot-vertical-item-dot-margin-top-active` | Public | `calc(var(--mp-steps-dot-vertical-item-dot-margin-top) - (var(--mp-steps-dot-item-icon-size-active) - var(--mp-steps-dot-item-icon-size)))` | Local CSS<br>`margin-top` |
| `--mp-steps-dot-vertical-item-icon-margin-right` | Public | `16px` | Local CSS<br>`margin-inline-end` |
| `--mp-steps-dot-vertical-tail-padding-bottom` | Public | `2px` | Local CSS<br>`padding-bottom` |
| `--mp-steps-dot-vertical-tail-padding-top-extra` | Public | `4px` | Local CSS<br>`padding-top` |
| `--mp-steps-label-vertical-content-width` | Public | `100%` | Local CSS<br>`inset-inline-start`, `margin-inline-start` |
| `--mp-steps-navigation-arrow-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`border` |
| `--mp-steps-navigation-arrow-line-width` | Public | `2px` | Local CSS<br>`border` |
| `--mp-steps-navigation-arrow-right` | Public | `30px` | Local CSS<br>`inset-inline-end` |
| `--mp-steps-navigation-arrow-size` | Public | `6px` | Local CSS<br>`height`, `width` |
| `--mp-steps-navigation-arrow-spacing-right` | Public | `10px` | Local CSS<br>`padding-inline-end` |
| `--mp-steps-navigation-arrow-top` | Public | `10px` | Local CSS<br>`top` |
| `--mp-steps-navigation-content-margin-bottom` | Public | `20px` | Local CSS<br>`margin-bottom` |
| `--mp-steps-navigation-description-padding-right` | Public | `20px` | Local CSS<br>`padding-inline-end` |
| `--mp-steps-navigation-ink-bg` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-steps-navigation-ink-height` | Public | `2px` | Local CSS<br>`height` |
| `--mp-steps-navigation-ink-spacing-left` | Public | `0` | Local CSS<br>`inset-inline-start` |
| `--mp-steps-navigation-ink-spacing-right` | Public | `30px` | Local CSS<br>`inset-inline-end` |
| `--mp-steps-navigation-margin-right` | Public | `32px` | Local CSS<br>`margin-inline-end` |
| `--mp-steps-navigation-padding-left` | Public | `20px` | Local CSS<br>`padding-inline-start` |
| `--mp-steps-node-font-weight` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-steps-size-md` | Public | `28px` | Local CSS<br>`height`, `inset-inline-start`, `line-height`, `margin-inline-start`, `margin-top`, `padding`, `padding-inline-end`, `top`, `width` |
| `--mp-steps-size-md-arrow` | Public | `72px` | Local CSS<br>`border-bottom`, `border-inline-start`, `border-top`, `height`, `inset-inline-end`, `padding-inline-start` |
| `--mp-steps-size-md-description-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-steps-size-md-icon-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-steps-size-md-item-icon-margin-left` | Public | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-size-md)) / 2)` | Local CSS<br>`inset-inline-start`, `margin-inline-start` |
| `--mp-steps-size-md-title-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-steps-size-sm` | Public | `24px` | Local CSS<br>`height`, `inset-inline-start`, `line-height`, `margin-inline-start`, `padding`, `padding-inline-end`, `top`, `width` |
| `--mp-steps-size-sm-arrow` | Public | `40px` | Local CSS<br>`border-bottom`, `border-inline-start`, `border-top`, `height`, `inset-inline-end`, `padding-inline-start` |
| `--mp-steps-size-sm-description-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-steps-size-sm-icon-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-steps-size-sm-item-icon-margin-left` | Public | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-size-sm)) / 2)` | Local CSS<br>`inset-inline-start`, `margin-inline-start` |
| `--mp-steps-size-sm-title-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-steps-transition-duration-1` | Public | `0.1s` | Local CSS<br>`transition` |
| `--mp-steps-transition-timing-function-linear` | Public | `cubic-bezier(0, 0, 1, 1)` | Local CSS<br>`transition` |
| `--mp-steps-vertical-item-min-height` | Public | `90px` | Local CSS<br>`min-height` |

</div>

## swipe-cell

Source: `src/swipe-cell/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-swipe-cell-background` | Public | `transparent` | Local CSS<br>`background` |
| `--mp-swipe-cell-transition` | Public | `transform 0.2s ease` | Local CSS<br>`transition` |

</div>

## switch

Source: `src/switch/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-internal-switch-error-text-color` | Internal | `var(--mp-switch-text-color)` | Local CSS<br>`color` |
| `--mp-switch-checked-text-color` | Public | `var(--mp-switch-text-color)` | Local CSS<br>`color` |
| `--mp-switch-disabled-opacity` | Public | `0.5` | Local CSS<br>`opacity` |
| `--mp-switch-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-switch-focus-width` | Public | `2px` | Local CSS<br>`box-shadow` |
| `--mp-switch-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-switch-gap` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`inset-inline-start`, `padding-inline` |
| `--mp-switch-handle-background` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background` |
| `--mp-switch-handle-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-switch-handle-size` | Public | `16px` | Local CSS<br>`height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-height` | Public | `24px` | Local CSS<br>`height` |
| `--mp-switch-hit-area` | Public | `0px` | Local CSS<br>`inset` |
| `--mp-switch-line-handle-size` | Public | `20px` | Local CSS<br>`height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-line-height` | Public | `12px` | Local CSS<br>`height` |
| `--mp-switch-loading-duration` | Public | `1s` | Local CSS<br>`animation` |
| `--mp-switch-radius` | Public | `var(--mp-sys-radius-pill)` | Local CSS<br>`border-radius` |
| `--mp-switch-ripple-duration` | Public | `400ms` | Local CSS<br>`animation` |
| `--mp-switch-ripple-scale` | Public | `2.4` | Local CSS<br>`transform` |
| `--mp-switch-round-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-switch-shadow-color` | Public | `#0003` | Runtime reference (not visibility proof)<br>`switch/Switch.vue` |
| `--mp-switch-size-lg-scale` | Public | `1.2` | Local CSS<br>`font-size`, `height`, `inset-inline-start`, `min-width`, `padding-inline`, `width` |
| `--mp-switch-size-sm-scale` | Public | `0.8` | Local CSS<br>`font-size`, `height`, `inset-inline-start`, `min-width`, `padding-inline`, `width` |
| `--mp-switch-text-color` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-switch-tonal-border-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`background`, `border` |
| `--mp-switch-tonal-border-width` | Public | `2px` | Local CSS<br>`border` |
| `--mp-switch-tonal-handle-color` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-switch-tonal-handle-size` | Public | `24px` | Local CSS<br>`height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-tonal-height` | Public | `32px` | Local CSS<br>`height` |
| `--mp-switch-tonal-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-switch-tonal-track-background` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background` |
| `--mp-switch-tonal-width` | Public | `52px` | Local CSS<br>`min-width` |
| `--mp-switch-track-active-background` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background` |
| `--mp-switch-track-background` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`background` |
| `--mp-switch-track-error-background` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background`, `border-color` |
| `--mp-switch-width` | Public | `40px` | Local CSS<br>`min-width` |

</div>

## tab-bar

Source: `src/tab-bar/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-tab-bar-background-color` | Public | `var(--mp-color-bg-2)` | Local CSS<br>`background-color` |
| `--mp-tab-bar-border-color` | Public | `var(--mp-color-border-2)` | Local CSS<br>`border-top` |
| `--mp-tab-bar-fab-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-tab-bar-fab-offset` | Public | `4px` | Local CSS<br>`inset-inline-end`, `margin-inline-end` |
| `--mp-tab-bar-height` | Public | `50px` | Local CSS<br>`height`, `inset-inline-end`, `margin-inline-end`, `margin-inline-start`, `width` |
| `--mp-tab-bar-item-active-background-color` | Public | `transparent` | Local CSS<br>`background-color` |
| `--mp-tab-bar-item-active-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-tab-bar-item-focus-color` | Public | `currentColor` | Local CSS<br>`outline` |
| `--mp-tab-bar-item-focus-offset` | Public | `-2px` | Local CSS<br>`outline-offset` |
| `--mp-tab-bar-item-focus-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-tab-bar-item-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-tab-bar-item-icon-margin-bottom` | Public | `5px` | Local CSS<br>`margin-top` |
| `--mp-tab-bar-item-icon-size` | Public | `22px` | Local CSS<br>`font-size` |
| `--mp-tab-bar-item-inactive-color` | Public | `var(--mp-color-text-2)` | Local CSS<br>`color` |
| `--mp-tab-bar-item-line-height` | Public | `1` | Local CSS<br>`line-height` |
| `--mp-tab-bar-item-variant-active-background-color` | Public | `color-mix(in srgb, var(--mp-sys-color-action-primary) 14%, var(--mp-tab-bar-background-color))` | Local CSS<br>`background-color` |
| `--mp-tab-bar-item-variant-active-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-tab-bar-item-variant-icon-container-border-radius` | Public | `100px` | Local CSS<br>`border-radius` |
| `--mp-tab-bar-item-variant-icon-container-height` | Public | `30px` | Local CSS<br>`height` |
| `--mp-tab-bar-item-variant-icon-container-max-width` | Public | `58px` | Local CSS<br>`max-width` |
| `--mp-tab-bar-variant-height` | Public | `66px` | Local CSS<br>`height` |
| `--mp-tab-bar-z-index` | Public | `1` | Runtime reference (not visibility proof)<br>`tab-bar/TabBar.vue` |

</div>

## table

Source: `src/table/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-table-body-bg` | Public | `var(--mp-color-bg-2)` | Local CSS<br>`background-color` |
| `--mp-table-body-cell-bg` | Public | `var(--mp-color-bg-2)` | Local CSS<br>`background-color` |
| `--mp-table-body-cell-text-color` | Public | `rgb(var(--mp-gray-10))` | Local CSS<br>`color` |
| `--mp-table-body-min-height` | Public | `40px` | Local CSS<br>`min-height` |
| `--mp-table-body-row-active-bg` | Public | `var(--mp-color-fill-1)` | Local CSS<br>`background-color` |
| `--mp-table-body-row-active-dark-bg` | Public | `rgb(var(--mp-gray-2))` | Local CSS<br>`background-color` |
| `--mp-table-body-row-hover-bg` | Public | `var(--mp-color-fill-1)` | Local CSS<br>`background-color` |
| `--mp-table-body-sorted-cell-bg` | Public | `var(--mp-color-fill-1)` | Local CSS<br>`background-color` |
| `--mp-table-body-stripe-row-bg` | Public | `var(--mp-color-fill-1)` | Local CSS<br>`background-color` |
| `--mp-table-border-color` | Public | `rgb(var(--mp-gray-3))` | Local CSS<br>`border`, `border-bottom`, `border-left`, `border-right`, `border-top`, `box-shadow` |
| `--mp-table-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius`, `border-top-left-radius`, `border-top-right-radius` |
| `--mp-table-border-style` | Public | `solid` | Local CSS<br>`border`, `border-bottom`, `border-left`, `border-right`, `border-top` |
| `--mp-table-border-width` | Public | `1px` | Local CSS<br>`border`, `border-bottom`, `border-left`, `border-right`, `border-top`, `bottom`, `box-shadow`, `margin` |
| `--mp-table-column-handle-right` | Public | `-4px` | Local CSS<br>`inset-inline-end` |
| `--mp-table-column-handle-width` | Public | `8px` | Local CSS<br>`width` |
| `--mp-table-column-insert-empty-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-table-column-insert-empty-line-height` | Public | `22px` | Local CSS<br>`line-height` |
| `--mp-table-column-insert-empty-text-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-table-column-insert-group-margin-top` | Public | `16px` | Local CSS<br>`margin-top` |
| `--mp-table-column-insert-group-title-font-size` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-table-column-insert-group-title-line-height` | Public | `20px` | Local CSS<br>`line-height` |
| `--mp-table-column-insert-group-title-margin-bottom` | Public | `8px` | Local CSS<br>`margin-bottom` |
| `--mp-table-column-insert-group-title-text-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-table-column-insert-item-min-height` | Public | `32px` | Local CSS<br>`min-height` |
| `--mp-table-column-insert-max-height` | Public | `calc(100vh - 160px)` | Local CSS<br>`max-height` |
| `--mp-table-column-insert-padding` | Public | `16px 20px` | Local CSS<br>`padding` |
| `--mp-table-drag-handle-col-width` | Public | `40px` | Local CSS<br>`max-width`, `min-width`, `width` |
| `--mp-table-editable-body-cell-border-color` | Public | `var(--mp-color-white)` | Local CSS<br>`border` |
| `--mp-table-empty-height` | Public | `240px` | Local CSS<br>`height` |
| `--mp-table-empty-image-size` | Public | `48px` | Runtime reference (not visibility proof)<br>`font-size`, `height`, `width`<br>`table/table-impl.tsx` |
| `--mp-table-expand-button-border-radius` | Public | `2px` | Local CSS<br>`border-radius` |
| `--mp-table-expand-button-font-size` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-table-expand-button-margin-right` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`margin-inline-end` |
| `--mp-table-expand-button-size` | Public | `14px` | Local CSS<br>`height`, `line-height`, `width` |
| `--mp-table-expand-content-bg` | Public | `var(--mp-color-fill-1)` | Local CSS<br>`background-color` |
| `--mp-table-expand-content-hover-bg` | Public | `var(--mp-color-fill-1)` | Local CSS<br>`background-color` |
| `--mp-table-expand-icon-bg` | Public | `rgb(var(--mp-gray-3))` | Local CSS<br>`background-color` |
| `--mp-table-expand-icon-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-table-expand-icon-border-width` | Public | `1px` | Local CSS<br>`border` |
| `--mp-table-expand-icon-col-width` | Public | `40px` | Local CSS<br>`max-width`, `min-width`, `width` |
| `--mp-table-expand-icon-color` | Public | `var(--mp-color-text-2)` | Local CSS<br>`color` |
| `--mp-table-expand-icon-hover-bg` | Public | `rgb(var(--mp-gray-4))` | Local CSS<br>`background-color` |
| `--mp-table-expand-icon-hover-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-table-expand-icon-hover-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-table-expand-loading-icon-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-table-extra-column-icon-color` | Public | `var(--mp-color-text-2)` | Local CSS<br>`color` |
| `--mp-table-extra-column-icon-hover-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-table-filters-icon-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-table-filters-icon-hover-bg` | Public | `var(--mp-color-fill-4)` | Local CSS<br>`background` |
| `--mp-table-filters-width` | Public | `24px` | Local CSS<br>`width` |
| `--mp-table-header-cell-action-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-table-header-cell-action-hover-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-table-header-cell-action-margin-left` | Public | `2px` | Local CSS<br>`margin-inline-start` |
| `--mp-table-header-cell-bg` | Public | `rgb(var(--mp-gray-2))` | Local CSS<br>`background-color` |
| `--mp-table-header-cell-text-color` | Public | `rgb(var(--mp-gray-10))` | Local CSS<br>`color` |
| `--mp-table-header-filters-icon-active-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-table-header-filters-icon-color` | Public | `var(--mp-color-text-2)` | Local CSS<br>`color` |
| `--mp-table-header-filters-icon-hover-bg` | Public | `rgb(var(--mp-gray-4))` | Local CSS<br>`background-color` |
| `--mp-table-header-sorted-cell-bg` | Public | `rgb(var(--mp-gray-3))` | Local CSS<br>`background-color` |
| `--mp-table-header-sorted-cell-hover-bg` | Public | `rgba(var(--mp-gray-4), 0.5)` | Local CSS<br>`background-color` |
| `--mp-table-header-sorter-icon-active-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`color` |
| `--mp-table-header-sorter-icon-color` | Public | `rgb(var(--mp-gray-5))` | Local CSS<br>`color` |
| `--mp-table-header-sorter-icon-down-top` | Public | `-3px` | Local CSS<br>`top` |
| `--mp-table-header-sorter-icon-font-size` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-table-header-sorter-icon-height` | Public | `8px` | Local CSS<br>`height`, `line-height` |
| `--mp-table-header-sorter-icon-left` | Public | `1px` | Local CSS<br>`left` |
| `--mp-table-header-sorter-icon-margin-left` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-inline-start` |
| `--mp-table-header-sorter-icon-next-color` | Public | `rgb(var(--mp-gray-6))` | Local CSS<br>`color` |
| `--mp-table-header-sorter-icon-up-top` | Public | `-2px` | Local CSS<br>`top` |
| `--mp-table-header-sorter-icon-width` | Public | `14px` | Local CSS<br>`width` |
| `--mp-table-header-text-font-weight` | Public | `var(--mp-sys-font-weight-medium)` | Local CSS<br>`font-weight` |
| `--mp-table-line-height` | Public | `var(--mp-line-height)` | Local CSS<br>`line-height` |
| `--mp-table-pagination-margin` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`margin-bottom`, `margin-top` |
| `--mp-table-pagination-sticky-bg` | Public | `var(--mp-color-bg-1)` | Local CSS<br>`background`, `background-color` |
| `--mp-table-pagination-sticky-padding` | Public | `12px 0` | Local CSS<br>`padding` |
| `--mp-table-resizing-border-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`border-right-color` |
| `--mp-table-selection-col-width` | Public | `40px` | Local CSS<br>`max-width`, `min-width`, `width` |
| `--mp-table-shadow-left` | Public | `inset 6px 0 8px -3px rgba(0, 0, 0, 0.15)` | Local CSS<br>`box-shadow` |
| `--mp-table-shadow-right` | Public | `inset -6px 0 8px -3px rgba(0, 0, 0, 0.15)` | Local CSS<br>`box-shadow` |
| `--mp-table-shadow-wrapper-width` | Public | `10px` | Local CSS<br>`width` |
| `--mp-table-size-lg-extra-icon-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-table-size-lg-extra-padding-horizontal` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`padding` |
| `--mp-table-size-lg-font-size` | Public | `var(--mp-table-size-md-font-size)` | Local CSS<br>`font-size` |
| `--mp-table-size-lg-header-font-size` | Public | `var(--mp-table-size-md-header-font-size)` | Local CSS<br>`font-size` |
| `--mp-table-size-lg-padding-horizontal` | Public | `var(--mp-table-size-md-padding-horizontal)` | Local CSS<br>`margin`, `padding` |
| `--mp-table-size-lg-padding-vertical` | Public | `var(--mp-table-size-md-padding-vertical)` | Local CSS<br>`margin`, `padding` |
| `--mp-table-size-md-extra-icon-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-table-size-md-extra-padding-horizontal` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`padding` |
| `--mp-table-size-md-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-table-size-md-header-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-table-size-md-padding-horizontal` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`margin`, `padding` |
| `--mp-table-size-md-padding-vertical` | Public | `9px` | Local CSS<br>`margin`, `padding` |
| `--mp-table-size-sm-extra-icon-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-table-size-sm-extra-padding-horizontal` | Public | `var(--mp-sys-space-1)` | Local CSS<br>`padding` |
| `--mp-table-size-sm-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-table-size-sm-header-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-table-size-sm-padding-horizontal` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`margin`, `padding` |
| `--mp-table-size-sm-padding-vertical` | Public | `5px` | Local CSS<br>`margin`, `padding` |
| `--mp-table-size-xs-extra-icon-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-table-size-xs-extra-padding-horizontal` | Public | `var(--mp-sys-space-1)` | Local CSS<br>`padding` |
| `--mp-table-size-xs-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-table-size-xs-header-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-table-size-xs-padding-horizontal` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`margin`, `padding` |
| `--mp-table-size-xs-padding-vertical` | Public | `2px` | Local CSS<br>`margin`, `padding` |
| `--mp-table-sticky-scrollbar-height` | Public | `16px` | Local CSS<br>`height` |
| `--mp-table-sticky-scrollbar-opacity` | Public | `0.8` | Local CSS<br>`opacity` |
| `--mp-table-tfoot-bg` | Public | `rgb(var(--mp-gray-2))` | Local CSS<br>`background-color` |
| `--mp-table-th-actions-margin-left` | Public | `8px` | Local CSS<br>`margin-inline-start` |
| `--mp-table-transition-duration` | Public | `var(--mp-sys-motion-duration-fast)` | Local CSS<br>`transition` |
| `--mp-table-transition-timing-function` | Public | `linear` | Local CSS<br>`transition` |

</div>

## tabs

Source: `src/tabs/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-tabs-active-font-weight` | Public | `var(--mp-sys-font-weight-semibold)` | Local CSS<br>`font-weight` |
| `--mp-tabs-active-shadow` | Public | `none` | Local CSS<br>`box-shadow` |
| `--mp-tabs-animation-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`animation` |
| `--mp-tabs-background` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background` |
| `--mp-tabs-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`background`, `border-color` |
| `--mp-tabs-border-width` | Public | `1px` | Local CSS<br>`border`, `bottom`, `height` |
| `--mp-tabs-capsule-radius` | Public | `12px` | Local CSS<br>`border-radius` |
| `--mp-tabs-content-padding` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`padding-block`, `padding-inline-start` |
| `--mp-tabs-control-height` | Public | `var(--mp-sys-control-height-xs)` | Local CSS<br>`min-height`, `min-width` |
| `--mp-tabs-focus-offset` | Public | `-3px` | Local CSS<br>`outline-offset` |
| `--mp-tabs-focus-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-tabs-group-padding` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`padding` |
| `--mp-tabs-header-padding` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`padding-inline` |
| `--mp-tabs-hover-background` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-tabs-icon-gap` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`gap` |
| `--mp-tabs-indicator-radius` | Public | `1px` | Local CSS<br>`border-radius` |
| `--mp-tabs-indicator-size` | Public | `2px` | Local CSS<br>`height`, `width` |
| `--mp-tabs-muted-background` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background` |
| `--mp-tabs-nav-gap` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`gap` |
| `--mp-tabs-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-tabs-size-lg-tab-font-size` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-tabs-size-lg-tab-height` | Public | `var(--mp-sys-control-height-lg)` | Local CSS<br>`min-height` |
| `--mp-tabs-size-lg-tab-padding` | Public | `10px var(--mp-sys-space-7)` | Local CSS<br>`padding` |
| `--mp-tabs-size-md-tab-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-tabs-size-md-tab-height` | Public | `var(--mp-sys-control-height-md)` | Local CSS<br>`min-height` |
| `--mp-tabs-size-md-tab-padding` | Public | `var(--mp-sys-space-4) var(--mp-sys-space-6)` | Local CSS<br>`padding` |
| `--mp-tabs-size-sm-tab-font-size` | Public | `var(--mp-sys-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-tabs-size-sm-tab-height` | Public | `var(--mp-sys-control-height-sm)` | Local CSS<br>`min-height` |
| `--mp-tabs-size-sm-tab-padding` | Public | `var(--mp-sys-space-3) var(--mp-sys-space-5)` | Local CSS<br>`padding` |
| `--mp-tabs-size-xl-tab-font-size` | Public | `var(--mp-sys-font-size-xl)` | Local CSS<br>`font-size` |
| `--mp-tabs-size-xl-tab-height` | Public | `var(--mp-sys-control-height-xl)` | Local CSS<br>`min-height` |
| `--mp-tabs-size-xl-tab-padding` | Public | `var(--mp-sys-space-5) var(--mp-sys-space-8)` | Local CSS<br>`padding` |
| `--mp-tabs-size-xs-tab-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-tabs-size-xs-tab-height` | Public | `var(--mp-sys-control-height-xs)` | Local CSS<br>`min-height` |
| `--mp-tabs-size-xs-tab-padding` | Public | `var(--mp-sys-space-2) var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-tabs-tab-gap` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`gap` |
| `--mp-tabs-title-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-tabs-title-text-color-active` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background`, `color`, `outline` |
| `--mp-tabs-title-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-tabs-touch-target` | Public | `var(--mp-sys-control-touch-target)` | Local CSS<br>`min-height`, `min-width` |

</div>

## tag

Source: `src/tag/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-tag-bg-not-checked-hover` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-tag-blue-bg` | Public | `rgb(var(--mp-blue-1))`<br>`rgba(var(--mp-blue-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-blue-bg-hover` | Public | `rgb(var(--mp-blue-2))`<br>`rgba(var(--mp-blue-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-blue-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-blue-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-blue-icon-color` | Public | `rgb(var(--mp-blue-6))` | Local CSS<br>`color` |
| `--mp-tag-blue-text-color` | Public | `rgb(var(--mp-blue-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-tag-border-type` | Public | `solid` | Local CSS<br>`border` |
| `--mp-tag-border-width` | Public | `1px` | Local CSS<br>`border`, `line-height` |
| `--mp-tag-brand-bg` | Public | `rgb(var(--mp-brand-1))`<br>`rgba(var(--mp-brand-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-brand-bg-hover` | Public | `rgb(var(--mp-brand-2))`<br>`rgba(var(--mp-brand-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-brand-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-brand-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-brand-icon-color` | Public | `rgb(var(--mp-brand-6))` | Local CSS<br>`color` |
| `--mp-tag-brand-text-color` | Public | `rgb(var(--mp-brand-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-close-font-size` | Public | `var(--mp-tag-size-md-font-size)` | Local CSS<br>`font-size` |
| `--mp-tag-close-margin-left` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`margin-left`, `margin-right` |
| `--mp-tag-custom-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-tag-cyan-bg` | Public | `rgb(var(--mp-cyan-1))`<br>`rgba(var(--mp-cyan-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-cyan-bg-hover` | Public | `rgb(var(--mp-cyan-2))`<br>`rgba(var(--mp-cyan-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-cyan-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-cyan-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-cyan-icon-color` | Public | `rgb(var(--mp-cyan-6))` | Local CSS<br>`color` |
| `--mp-tag-cyan-text-color` | Public | `rgb(var(--mp-cyan-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-default-bg` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-tag-default-bg-hover` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background-color` |
| `--mp-tag-default-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-default-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-default-icon-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-tag-default-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-tag-fade-duration` | Public | `var(--mp-sys-motion-duration-fast)` | Local CSS<br>`transition` |
| `--mp-tag-gold-bg` | Public | `rgb(var(--mp-gold-1))`<br>`rgba(var(--mp-gold-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-gold-bg-hover` | Public | `rgb(var(--mp-gold-2))`<br>`rgba(var(--mp-gold-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-gold-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-gold-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-gold-icon-color` | Public | `rgb(var(--mp-gold-6))` | Local CSS<br>`color` |
| `--mp-tag-gold-text-color` | Public | `rgb(var(--mp-gold-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-gray-bg` | Public | `rgb(var(--mp-gray-2))`<br>`rgba(var(--mp-gray-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-gray-bg-hover` | Public | `rgb(var(--mp-gray-3))`<br>`rgba(var(--mp-gray-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-gray-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-gray-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-gray-icon-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-tag-gray-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-green-bg` | Public | `rgb(var(--mp-green-1))`<br>`rgba(var(--mp-green-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-green-bg-hover` | Public | `rgb(var(--mp-green-2))`<br>`rgba(var(--mp-green-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-green-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-green-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-green-icon-color` | Public | `rgb(var(--mp-green-6))` | Local CSS<br>`color` |
| `--mp-tag-green-text-color` | Public | `rgb(var(--mp-green-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-icon-margin-right` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`margin-left`, `margin-right` |
| `--mp-tag-lime-bg` | Public | `rgb(var(--mp-lime-1))`<br>`rgba(var(--mp-lime-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-lime-bg-hover` | Public | `rgb(var(--mp-lime-2))`<br>`rgba(var(--mp-lime-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-lime-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-lime-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-lime-icon-color` | Public | `rgb(var(--mp-lime-6))` | Local CSS<br>`color` |
| `--mp-tag-lime-text-color` | Public | `rgb(var(--mp-lime-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-magenta-bg` | Public | `rgb(var(--mp-magenta-1))`<br>`rgba(var(--mp-magenta-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-magenta-bg-hover` | Public | `rgb(var(--mp-magenta-2))`<br>`rgba(var(--mp-magenta-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-magenta-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-magenta-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-magenta-icon-color` | Public | `rgb(var(--mp-magenta-6))` | Local CSS<br>`color` |
| `--mp-tag-magenta-text-color` | Public | `rgb(var(--mp-magenta-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-orange-bg` | Public | `rgb(var(--mp-orange-1))`<br>`rgba(var(--mp-orange-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-orange-bg-hover` | Public | `rgb(var(--mp-orange-2))`<br>`rgba(var(--mp-orange-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-orange-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-orange-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-orange-icon-color` | Public | `rgb(var(--mp-orange-6))` | Local CSS<br>`color` |
| `--mp-tag-orange-text-color` | Public | `rgb(var(--mp-orange-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-orangered-bg` | Public | `rgb(var(--mp-orangered-1))`<br>`rgba(var(--mp-orangered-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-orangered-bg-hover` | Public | `rgb(var(--mp-orangered-2))`<br>`rgba(var(--mp-orangered-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-orangered-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-orangered-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-orangered-icon-color` | Public | `rgb(var(--mp-orangered-6))` | Local CSS<br>`color` |
| `--mp-tag-orangered-text-color` | Public | `rgb(var(--mp-orangered-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-padding-horizontal` | Public | `8px` | Local CSS<br>`padding` |
| `--mp-tag-padding-vertical` | Public | `0` | Local CSS<br>`line-height`, `padding` |
| `--mp-tag-pinkpurple-bg` | Public | `rgb(var(--mp-pinkpurple-1))`<br>`rgba(var(--mp-pinkpurple-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-pinkpurple-bg-hover` | Public | `rgb(var(--mp-pinkpurple-2))`<br>`rgba(var(--mp-pinkpurple-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-pinkpurple-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-pinkpurple-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-pinkpurple-icon-color` | Public | `rgb(var(--mp-pinkpurple-6))` | Local CSS<br>`color` |
| `--mp-tag-pinkpurple-text-color` | Public | `rgb(var(--mp-pinkpurple-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-purple-bg` | Public | `rgb(var(--mp-purple-1))`<br>`rgba(var(--mp-purple-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-purple-bg-hover` | Public | `rgb(var(--mp-purple-2))`<br>`rgba(var(--mp-purple-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-purple-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-purple-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-purple-icon-color` | Public | `rgb(var(--mp-purple-6))` | Local CSS<br>`color` |
| `--mp-tag-purple-text-color` | Public | `rgb(var(--mp-purple-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-red-bg` | Public | `rgb(var(--mp-red-1))`<br>`rgba(var(--mp-red-6), 0.2)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-red-bg-hover` | Public | `rgb(var(--mp-red-2))`<br>`rgba(var(--mp-red-6), 0.35)` (`:root[maple-theme='dark']`) | Local CSS<br>`background-color` |
| `--mp-tag-red-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-red-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-red-icon-color` | Public | `rgb(var(--mp-red-6))` | Local CSS<br>`color` |
| `--mp-tag-red-text-color` | Public | `rgb(var(--mp-red-6))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-round-radius` | Public | `100px` | Local CSS<br>`border-radius` |
| `--mp-tag-size-lg` | Public | `30px` | Local CSS<br>`height`, `line-height` |
| `--mp-tag-size-lg-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-tag-size-md` | Public | `26px` | Local CSS<br>`height`, `line-height` |
| `--mp-tag-size-md-font-size` | Public | `var(--mp-sys-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-tag-size-sm` | Public | `22px` | Local CSS<br>`height`, `line-height` |
| `--mp-tag-size-sm-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-tag-size-xl` | Public | `34px` | Local CSS<br>`height`, `line-height` |
| `--mp-tag-size-xl-font-size` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-tag-size-xs` | Public | `18px` | Local CSS<br>`height`, `line-height` |
| `--mp-tag-size-xs-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-tag-status-danger-bg-color` | Public | `rgb(var(--mp-danger-1))` | Local CSS<br>`background-color` |
| `--mp-tag-status-danger-text-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-tag-status-info-bg-color` | Public | `rgb(var(--mp-blue-1))` | Local CSS<br>`background-color` |
| `--mp-tag-status-info-text-color` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-tag-status-primary-bg-color` | Public | `rgb(var(--mp-primary-1))` | Local CSS<br>`background-color` |
| `--mp-tag-status-primary-text-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-tag-status-secondary-bg-color` | Public | `rgb(var(--mp-gray-2))` | Local CSS<br>`background-color` |
| `--mp-tag-status-secondary-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-tag-status-success-bg-color` | Public | `rgb(var(--mp-success-1))` | Local CSS<br>`background-color` |
| `--mp-tag-status-success-text-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-tag-status-tertiary-bg-color` | Public | `rgb(var(--mp-gray-1))` | Local CSS<br>`background-color` |
| `--mp-tag-status-tertiary-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-tag-status-warning-bg-color` | Public | `rgb(var(--mp-warning-1))` | Local CSS<br>`background-color` |
| `--mp-tag-status-warning-text-color` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-tag-text-font-weight` | Public | `var(--mp-sys-font-weight-medium)` | Local CSS<br>`font-weight` |
| `--mp-tag-variant-outline-default-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-tag-variant-outline-default-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-tag-variant-outline-status-danger-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-info-color` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-primary-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-secondary-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-success-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-tertiary-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`border`, `color` |
| `--mp-tag-variant-outline-status-warning-color` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`border`, `color` |

</div>

## textarea

Source: `src/textarea/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-textarea-caret-color` | Public | `var(--mp-field-caret-color)` | Local CSS<br>`caret-color` |
| `--mp-textarea-counter-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-textarea-counter-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-textarea-counter-margin-top` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`margin-block-start` |
| `--mp-textarea-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-textarea-height` | Public | `auto` | Local CSS<br>`height` |
| `--mp-textarea-line-height` | Public | `1.5` | Local CSS<br>`line-height` |
| `--mp-textarea-min-height` | Public | `96px` | Local CSS<br>`min-height` |
| `--mp-textarea-padding-horizontal` | Public | `0px` | Local CSS<br>`padding`, `padding-inline-end` |
| `--mp-textarea-padding-vertical` | Public | `var(--mp-field-content-padding-vertical)` | Local CSS<br>`padding` |
| `--mp-textarea-placeholder-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |

</div>

## time

Source: `src/time/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-time-panel-actions-padding` | Public | `8px` | Local CSS<br>`padding` |
| `--mp-time-panel-background` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background` |
| `--mp-time-panel-border` | Public | `var(--mp-color-border-2)` | Local CSS<br>`border`, `border-top` |
| `--mp-time-panel-radius` | Public | `8px` | Local CSS<br>`border-radius` |
| `--mp-time-picker-actions-padding` | Public | `0 8px 12px 8px` | Local CSS<br>`padding` |
| `--mp-time-picker-body-background` | Public | `#fff` | Local CSS<br>`background` |
| `--mp-time-picker-border-radius` | Public | `4px` | Local CSS<br>`border-radius` |
| `--mp-time-picker-column-label-height` | Public | `var(--mp-internal-temporal-panel-column-label-height)` | Local CSS<br>`height` |
| `--mp-time-picker-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-time-picker-min-width` | Public | `290px` | Local CSS<br>`min-width` |
| `--mp-time-popover-gap` | Public | `32px` | Local CSS<br>`max-height`, `max-width` |
| `--mp-time-popover-max-height` | Public | `calc(50dvh - var(--mp-time-popover-gap))` | Local CSS<br>`max-height` |
| `--mp-time-popover-width` | Public | `320px` | Local CSS<br>`width` |
| `--mp-time-title-font-size` | Public | `var(--mp-picker-title-font-size, 16px)` | Local CSS<br>`font-size` |
| `--mp-time-title-text-color` | Public | `var(--mp-picker-title-text-color, #555)` | Local CSS<br>`color` |
| `--mp-time-toolbar-height` | Public | `var(--mp-picker-toolbar-height, 44px)` | Local CSS<br>`height` |
| `--mp-time-toolbar-padding` | Public | `var(--mp-picker-toolbar-padding, 0 4px)` | Local CSS<br>`padding` |

</div>

## time-range

Source: `src/time-range/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-time-range-picker-background` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background`, `background-image` |
| `--mp-time-range-picker-border-radius` | Public | `var(--mp-time-picker-border-radius, 4px)` | Local CSS<br>`border-radius` |
| `--mp-time-range-picker-column-label-height` | Public | `var(--mp-internal-temporal-panel-column-label-height)` | Local CSS<br>`height` |
| `--mp-time-range-picker-next-day-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-time-range-title-font-size` | Public | `var(--mp-picker-title-font-size, 16px)` | Local CSS<br>`font-size` |
| `--mp-time-range-title-text-color` | Public | `var(--mp-picker-title-text-color, #555)` | Local CSS<br>`color` |
| `--mp-time-range-toolbar-height` | Public | `var(--mp-picker-toolbar-height, 44px)` | Local CSS<br>`height` |
| `--mp-time-range-toolbar-padding` | Public | `var(--mp-picker-toolbar-padding, 0 4px)` | Local CSS<br>`padding` |

</div>

## timeline

Source: `src/timeline/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-timeline-alternate-horizontal-min-height` | Public | `200px` | Local CSS<br>`min-height` |
| `--mp-timeline-content-text-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-timeline-dot-bg` | Public | `rgb(var(--mp-primary-6))` | Local CSS<br>`background-color`, `border`, `color` |
| `--mp-timeline-dot-bg-hollow` | Public | `var(--mp-color-bg-2)` | Local CSS<br>`background-color` |
| `--mp-timeline-dot-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-timeline-dot-border-width-hollow` | Public | `2px` | Local CSS<br>`border` |
| `--mp-timeline-dot-size-width` | Public | `6px` | Local CSS<br>`bottom`, `height`, `inset-inline-start`, `left`, `margin-left`, `margin-top`, `padding-bottom`, `padding-left`, `padding-right`, `padding-top`, `top`, `width` |
| `--mp-timeline-font-content-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`bottom`, `font-size`, `height`, `line-height`, `top` |
| `--mp-timeline-font-label-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-timeline-horizontal-dot-content-height` | Public | `6px` | Local CSS<br>`height`, `line-height` |
| `--mp-timeline-horizontal-margin-content-spacing` | Public | `16px` | Local CSS<br>`margin-bottom`, `margin-top`, `padding-bottom`, `padding-top` |
| `--mp-timeline-horizontal-margin-line-left` | Public | `6px` | Local CSS<br>`inset-inline-start` |
| `--mp-timeline-horizontal-margin-line-right` | Public | `4px` | Local CSS<br>`inset-inline-end` |
| `--mp-timeline-item-min-height` | Public | `78px` | Local CSS<br>`min-height` |
| `--mp-timeline-label-relative-horizontal-margin` | Public | `52px` | Local CSS<br>`margin-bottom`, `margin-top` |
| `--mp-timeline-label-relative-margin` | Public | `100px` | Local CSS<br>`margin-left`, `margin-right` |
| `--mp-timeline-label-relative-max-width` | Public | `100px` | Local CSS<br>`max-width` |
| `--mp-timeline-label-text-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-timeline-line-bg` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-color` |
| `--mp-timeline-size-line-width` | Public | `1px` | Local CSS<br>`border-left-width`, `border-top-width`, `height`, `width` |
| `--mp-timeline-vertical-margin-content-bottom` | Public | `4px` | Local CSS<br>`margin-bottom` |
| `--mp-timeline-vertical-margin-content-left` | Public | `16px` | Local CSS<br>`margin-left`, `margin-right`, `padding-left`, `padding-right` |
| `--mp-timeline-vertical-margin-line-bottom` | Public | `4px` | Local CSS<br>`bottom` |
| `--mp-timeline-vertical-margin-line-top` | Public | `4px` | Local CSS<br>`top` |

</div>

## tooltip

Source: `src/tooltip/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-tooltip-animation-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-tooltip-background` | Public | `var(--mp-sys-color-surface-tooltip)` | Local CSS<br>`background-color` |
| `--mp-tooltip-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-tooltip-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-tooltip-line-height` | Public | `var(--mp-line-height)` | Local CSS<br>`line-height` |
| `--mp-tooltip-max-width` | Public | `350px` | Local CSS<br>`max-width` |
| `--mp-tooltip-opacity` | Public | `1` | Local CSS<br>`opacity` |
| `--mp-tooltip-padding-horizontal` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`padding` |
| `--mp-tooltip-padding-vertical` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-tooltip-size-xs-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-tooltip-size-xs-padding-horizontal` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-tooltip-size-xs-padding-vertical` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`padding` |
| `--mp-tooltip-status-danger-background` | Public | `var(--mp-sys-color-status-danger)` | Local CSS<br>`background-color` |
| `--mp-tooltip-status-danger-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-tooltip-status-info-background` | Public | `var(--mp-sys-color-status-info)` | Local CSS<br>`background-color` |
| `--mp-tooltip-status-info-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-tooltip-status-primary-background` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-tooltip-status-primary-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-tooltip-status-success-background` | Public | `var(--mp-sys-color-status-success)` | Local CSS<br>`background-color` |
| `--mp-tooltip-status-success-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-tooltip-status-warning-background` | Public | `var(--mp-sys-color-status-warning)` | Local CSS<br>`background-color` |
| `--mp-tooltip-status-warning-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-tooltip-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |

</div>

## trigger

Source: `src/trigger/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-trigger-arrow-background` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-trigger-arrow-radius` | Public | `var(--mp-sys-radius-sm)` | Local CSS<br>`border-radius` |
| `--mp-trigger-arrow-size` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`height`, `width` |
| `--mp-trigger-transition-duration` | Public | `var(--mp-sys-motion-duration-fast)` | Local CSS<br>`transition` |
| `--mp-trigger-transition-easing` | Public | `var(--mp-sys-motion-easing-standard)` | Local CSS<br>`transition` |

</div>

## upload

Source: `src/upload/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-internal-upload-caption-background` | Internal | `rgba(0, 0, 0, 0.72)` | Local CSS<br>`background` |
| `--mp-upload-action-size` | Public | `var(--mp-sys-control-touch-target)` | Local CSS<br>`height`, `width` |
| `--mp-upload-active-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`accent-color`, `border-color`, `outline` |
| `--mp-upload-background` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background` |
| `--mp-upload-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-upload-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-upload-card-size` | Public | `calc(var(--mp-sys-control-height-md) * 2)` | Local CSS<br>`height`, `min-height`, `width` |
| `--mp-upload-disabled-opacity` | Public | `0.56` | Local CSS<br>`opacity` |
| `--mp-upload-duration-background` | Public | `var(--mp-sys-color-surface-tooltip)` | Local CSS<br>`background` |
| `--mp-upload-duration-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-upload-duration-font-size` | Public | `var(--mp-sys-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-upload-duration-padding` | Public | `var(--mp-sys-space-1) var(--mp-sys-space-2)` | Local CSS<br>`padding` |
| `--mp-upload-duration-radius` | Public | `var(--mp-sys-radius-sm)` | Local CSS<br>`border-radius` |
| `--mp-upload-error-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-upload-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-upload-gap` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`gap` |
| `--mp-upload-hover-background` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-upload-item-min-height` | Public | `var(--mp-sys-control-height-md)` | Local CSS<br>`min-height` |
| `--mp-upload-item-padding` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-upload-progress-height` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`height` |
| `--mp-upload-secondary-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-upload-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-upload-thumb-size` | Public | `var(--mp-sys-control-height-lg)` | Local CSS<br>`height`, `width` |
| `--mp-upload-trigger-draggable-min-height` | Public | `calc(var(--mp-sys-control-height-md) * 2)` | Local CSS<br>`min-height` |
| `--mp-upload-trigger-min-height` | Public | `var(--mp-sys-control-height-md)` | Local CSS<br>`min-height` |
| `--mp-upload-trigger-padding-horizontal` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`padding-inline` |

</div>

## verification-code

Source: `src/verification-code/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-verification-code-cell-height` | Public | `initial` | Local CSS<br>`height` |
| `--mp-verification-code-cell-max-width` | Public | `initial` | Local CSS<br>`flex` |
| `--mp-verification-code-gutter` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`gap` |
| `--mp-verification-code-input-font-size` | Public | `initial` | Local CSS<br>`font-size` |

</div>

## watermark

Source: `src/watermark/style/token.less`

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-watermark-content-color` | Public | `rgba(0, 0, 0, 0.15)` | Runtime reference (not visibility proof)<br>`watermark/watermark.tsx` |

</div>
