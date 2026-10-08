# Maple Component CSS Variable Reference

Generated from compiled component token declarations. Do not edit tables by hand: run `node bin/token-catalog.mjs --patch` in design-ui and apply the patch; `--check` detects drift.

Use this alongside Design Tokens and CSS Variable Layers: this reference lists exact names, declaration values and consumption evidence, not a claim that all components passed visual acceptance. Values are declarations, not computed pixels; multiple values retain their selector conditions. Runtime theme objects and inline props can override them. Foundation/system roles are explained in the design guide, not duplicated as component APIs here.

Public variables may be overridden on the rendered component root or the real popup ancestor. Internal variables are implementation details and must not be used by applications. Size/variant/status/loading/disabled govern when a token is used; declaration does not imply every state consumes it. CSS property lists describe transitive compiled reachability, not selector visibility or precedence.

## _components/picker-field

Source: `src/_components/picker-field/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-picker-field-gap` | Public | `8px` | Local CSS<br>`gap` |
| `--mp-picker-field-input-min-width` | Public | `3em` | Local CSS<br>`min-width` |

## _components/selection-field

Source: `src/_components/selection-field/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-selection-field-gap` | Public | `4px` | Local CSS<br>`gap` |
| `--mp-selection-field-icon-transition-duration` | Public | `0.2s` | Local CSS<br>`transition` |
| `--mp-selection-field-input-min-width` | Public | `2px` | Local CSS<br>`min-width` |
| `--mp-selection-field-loading-duration` | Public | `1s` | Local CSS<br>`animation` |
| `--mp-selection-field-search-min-width` | Public | `3em` | Local CSS<br>`min-width` |

## _components/selection-scrollbar

Source: `src/_components/selection-scrollbar/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-scrollbar-thumb-bar-bg-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`background-color` |
| `--mp-scrollbar-thumb-bar-bg-color-hover` | Public | `var(--mp-sys-color-border-strong)` | Local CSS<br>`background-color` |
| `--mp-scrollbar-thumb-bar-border-radius` | Public | `6px` | Local CSS<br>`border-radius` |
| `--mp-scrollbar-thumb-bar-size` | Public | `9px` | Local CSS<br>`height`, `margin`, `width` |
| `--mp-scrollbar-track-bg-color` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color` |
| `--mp-scrollbar-track-border-color` | Public | `var(--mp-sys-color-border-subtle)` | Local CSS<br>`border-bottom`, `border-left`, `border-right`, `border-top` |
| `--mp-scrollbar-track-border-size` | Public | `1px` | Local CSS<br>`border-bottom`, `border-left`, `border-right`, `border-top`, `margin`, `right` |
| `--mp-scrollbar-track-size` | Public | `15px` | Local CSS<br>`height`, `margin`, `width` |

## alert

Source: `src/alert/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-alert-action-margin-left` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`margin-left` |
| `--mp-alert-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-alert-border-width` | Public | `1px` | Local CSS<br>`border` |
| `--mp-alert-close-duration` | Public | `var(--mp-sys-motion-duration-slow)` | Local CSS<br>`transition` |
| `--mp-alert-close-margin-left` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-left` |
| `--mp-alert-font-size-content` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-alert-font-size-title` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-alert-font-weight-title` | Public | `var(--mp-sys-font-weight-medium)` | Local CSS<br>`font-weight` |
| `--mp-alert-icon-margin-right` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-right` |
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

## auto-complete

Source: `src/auto-complete/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-auto-complete-option-bg-default` | Public | `var(--mp-sys-color-surface-overlay)` | Cross-component CSS<br>`background-color` |
| `--mp-auto-complete-option-bg-disabled` | Public | `var(--mp-sys-color-surface-overlay)` | Cross-component CSS<br>`background-color` |
| `--mp-auto-complete-option-bg-hover` | Public | `var(--mp-sys-color-state-hover)` | Cross-component CSS<br>`background-color` |
| `--mp-auto-complete-option-bg-selected` | Public | `var(--mp-sys-color-surface-overlay)` | Cross-component CSS<br>`background-color` |
| `--mp-auto-complete-option-font-weight-selected` | Public | `var(--mp-sys-font-weight-medium)` | Cross-component CSS<br>`font-weight` |
| `--mp-auto-complete-option-height` | Public | `36px` | Cross-component CSS<br>`line-height` |
| `--mp-auto-complete-option-padding-horizontal` | Public | `var(--mp-sys-space-5)` | Cross-component CSS<br>`padding` |
| `--mp-auto-complete-option-text-color-default` | Public | `var(--mp-sys-color-content-primary)` | Cross-component CSS<br>`color` |
| `--mp-auto-complete-option-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Cross-component CSS<br>`color` |
| `--mp-auto-complete-option-text-color-hover` | Public | `var(--mp-sys-color-content-primary)` | Cross-component CSS<br>`color` |
| `--mp-auto-complete-option-text-color-selected` | Public | `var(--mp-sys-color-content-primary)` | Cross-component CSS<br>`color` |
| `--mp-auto-complete-popup-bg` | Public | `var(--mp-sys-color-surface-overlay)` | Cross-component CSS<br>`background-color` |
| `--mp-auto-complete-popup-border-color` | Public | `var(--mp-sys-color-border-default)` | Cross-component CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-auto-complete-popup-border-radius` | Public | `var(--mp-sys-radius-md)` | Cross-component CSS<br>`border-radius` |
| `--mp-auto-complete-popup-box-shadow` | Public | `0 4px 10px rgb(0 0 0%)` | Cross-component CSS<br>`box-shadow` |
| `--mp-auto-complete-popup-font-size` | Public | `var(--mp-sys-font-size-md)` | Cross-component CSS<br>`font-size` |
| `--mp-auto-complete-popup-max-height` | Public | `200px` | Cross-component CSS<br>`max-height` |
| `--mp-auto-complete-popup-padding-vertical` | Public | `var(--mp-sys-space-2)` | Cross-component CSS<br>`padding` |

## avatar

Source: `src/avatar/style/token.less`

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

## back-top

Source: `src/back-top/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-back-top-background` | Public | `var(--mp-sys-color-surface-raised)` | Local CSS<br>`background` |
| `--mp-back-top-bottom` | Public | `40px` | Local CSS<br>`bottom` |
| `--mp-back-top-button-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-back-top-button-size` | Public | `var(--mp-sys-control-touch-target)` | Local CSS<br>`height`, `width` |
| `--mp-back-top-focus-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`outline` |
| `--mp-back-top-focus-offset` | Public | `2px` | Local CSS<br>`outline-offset` |
| `--mp-back-top-focus-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-back-top-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-back-top-hover-background` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-back-top-icon-size` | Public | `20px` | Local CSS<br>`height`, `width` |
| `--mp-back-top-right` | Public | `40px` | Local CSS<br>`right` |
| `--mp-back-top-text-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-back-top-z-index` | Public | `var(--mp-z-index-local-sticky)` | Local CSS<br>`z-index` |

## badge

Source: `src/badge/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-badge-bg-color` | Public | `var(--mp-sys-color-status-danger)` | Local CSS<br>`background-color` |
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
| `--mp-badge-status-danger-bg-color` | Public | `var(--mp-sys-color-status-danger)` | Local CSS<br>`background-color` |
| `--mp-badge-status-danger-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-badge-status-default-bg-color` | Public | `#e0e0e0` | Local CSS<br>`background-color` |
| `--mp-badge-status-default-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-badge-status-info-bg-color` | Public | `var(--mp-sys-color-status-info)` | Local CSS<br>`background-color` |
| `--mp-badge-status-info-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-badge-status-primary-bg-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-badge-status-primary-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-badge-status-secondary-bg-color` | Public | `rgb(var(--mp-gray-6))` | Local CSS<br>`background-color` |
| `--mp-badge-status-secondary-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-badge-status-success-bg-color` | Public | `var(--mp-sys-color-status-success)` | Local CSS<br>`background-color` |
| `--mp-badge-status-success-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-badge-status-tertiary-bg-color` | Public | `rgb(var(--mp-gray-7))` | Local CSS<br>`background-color` |
| `--mp-badge-status-tertiary-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-badge-status-warning-bg-color` | Public | `var(--mp-sys-color-status-warning)` | Local CSS<br>`background-color` |
| `--mp-badge-status-warning-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-badge-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
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

## breadcrumb

Source: `src/breadcrumb/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-breadcrumb-bg` | Public | `transparent` | Local CSS<br>`background-color` |
| `--mp-breadcrumb-bg-hover` | Public | `transparent` | Local CSS<br>`background-color` |
| `--mp-breadcrumb-dropdown-icon` | Public | `var(--mp-breadcrumb-item-inactive-color)` | Local CSS<br>`color` |
| `--mp-breadcrumb-font-weight-active` | Public | `400` | Local CSS<br>`font-weight` |
| `--mp-breadcrumb-icon-color` | Public | `var(--mp-breadcrumb-item-inactive-color)` | Local CSS<br>`color` |
| `--mp-breadcrumb-item-active-color` | Public | `var(--mp-color-primary)` | Local CSS<br>`color` |
| `--mp-breadcrumb-item-inactive-color` | Public | `#888` | Local CSS<br>`color` |
| `--mp-breadcrumb-item-separator-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-breadcrumb-item-separator-margin` | Public | `0 var(--mp-breadcrumb-margin-separator-horizontal)` | Local CSS<br>`margin` |
| `--mp-breadcrumb-link-text-color` | Public | `var(--mp-breadcrumb-item-active-color)` | Local CSS<br>`color` |
| `--mp-breadcrumb-link-text-color-hover` | Public | `var(--mp-breadcrumb-item-active-color)` | Local CSS<br>`color` |
| `--mp-breadcrumb-margin-dropdown-icon-left` | Public | `4px` | Local CSS<br>`margin-left` |
| `--mp-breadcrumb-margin-separator-horizontal` | Public | `10px` | Local CSS<br>`margin` |
| `--mp-breadcrumb-padding-text-horizontal` | Public | `0px` | Local CSS<br>`margin`, `padding` |
| `--mp-breadcrumb-separator-color` | Public | `var(--mp-breadcrumb-item-inactive-color)` | Local CSS<br>`color` |
| `--mp-breadcrumb-separator-font-size` | Public | `var(--mp-breadcrumb-item-separator-font-size)` | Local CSS<br>`font-size` |
| `--mp-breadcrumb-separator-margin` | Public | `var(--mp-breadcrumb-item-separator-margin)` | Local CSS<br>`margin` |
| `--mp-breadcrumb-size-dropdown-icon` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-breadcrumb-size-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-breadcrumb-size-text-height` | Public | `24px` | Local CSS<br>`line-height` |
| `--mp-breadcrumb-text-border-radius-hover` | Public | `0px` | Local CSS<br>`border-radius` |
| `--mp-breadcrumb-text-color` | Public | `var(--mp-breadcrumb-item-inactive-color)` | Local CSS<br>`color` |
| `--mp-breadcrumb-text-color-active` | Public | `var(--mp-breadcrumb-item-inactive-color)` | Local CSS<br>`color` |

## button

Source: `src/button/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-button-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-button-content-gap` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`gap` |
| `--mp-button-danger-color` | Public | `var(--mp-sys-color-status-danger)` | Local CSS<br>`background-color` |
| `--mp-button-danger-icon-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-button-danger-icon-container-color` | Public | `rgb(var(--mp-danger-1))` | Local CSS<br>`background-color` |
| `--mp-button-danger-state-layer-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`background-color` |
| `--mp-button-danger-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-button-default-color` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background-color` |
| `--mp-button-default-icon-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-button-default-icon-container-color` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color` |
| `--mp-button-default-state-layer-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`background-color` |
| `--mp-button-default-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-button-disabled-color` | Public | `var(--mp-color-disabled)` | Local CSS<br>`background-color` |
| `--mp-button-disabled-text-color` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-button-focus-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`outline` |
| `--mp-button-focus-offset` | Public | `2px` | Local CSS<br>`outline-offset` |
| `--mp-button-focus-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-button-group-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-button-icon-container-padding` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`padding` |
| `--mp-button-info-color` | Public | `var(--mp-sys-color-status-info)` | Local CSS<br>`background-color` |
| `--mp-button-info-icon-color` | Public | `var(--mp-sys-color-content-info)` | Local CSS<br>`color` |
| `--mp-button-info-icon-container-color` | Public | `rgb(var(--mp-blue-1))` | Local CSS<br>`background-color` |
| `--mp-button-info-state-layer-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`background-color` |
| `--mp-button-info-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-button-large-font-size` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-button-large-height` | Public | `44px` | Local CSS<br>`height`, `min-width`, `width` |
| `--mp-button-large-padding` | Public | `0 22px` | Local CSS<br>`padding` |
| `--mp-button-large-stacked-height` | Public | `56px` | Local CSS<br>`height`, `min-width` |
| `--mp-button-line-height` | Public | `1.2` | Local CSS<br>`line-height` |
| `--mp-button-loading-duration` | Public | `1s` | Local CSS<br>`animation` |
| `--mp-button-loading-line-height` | Public | `3px` | Local CSS<br>`height` |
| `--mp-button-loading-line-width` | Public | `40%` | Local CSS<br>`width` |
| `--mp-button-loading-static-opacity` | Public | `0.5` | Local CSS<br>`opacity` |
| `--mp-button-mini-font-size` | Public | `var(--mp-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-button-mini-height` | Public | `20px` | Local CSS<br>`height`, `min-width`, `width` |
| `--mp-button-mini-padding` | Public | `0 var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-button-mini-stacked-height` | Public | `36px` | Local CSS<br>`height`, `min-width` |
| `--mp-button-normal-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-button-normal-height` | Public | `36px` | Local CSS<br>`height`, `min-width`, `width` |
| `--mp-button-normal-padding` | Public | `0 var(--mp-sys-space-6)` | Local CSS<br>`padding` |
| `--mp-button-normal-stacked-height` | Public | `var(--mp-button-stacked-height)` | Local CSS<br>`height`, `min-width` |
| `--mp-button-plain-state-opacity-active` | Public | `1` | Local CSS<br>`opacity` |
| `--mp-button-plain-state-opacity-hover` | Public | `0.5` | Local CSS<br>`opacity` |
| `--mp-button-primary-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-button-primary-icon-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-button-primary-icon-container-color` | Public | `rgb(var(--mp-primary-1))` | Local CSS<br>`background-color` |
| `--mp-button-primary-state-layer-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`background-color` |
| `--mp-button-primary-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-button-round-padding` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`padding` |
| `--mp-button-secondary-color` | Public | `rgb(var(--mp-gray-6))` | Local CSS<br>`background-color` |
| `--mp-button-secondary-icon-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-button-secondary-icon-container-color` | Public | `rgb(var(--mp-gray-2))` | Local CSS<br>`background-color` |
| `--mp-button-secondary-state-layer-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`background-color` |
| `--mp-button-secondary-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-button-small-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-button-small-height` | Public | `28px` | Local CSS<br>`height`, `min-width`, `width` |
| `--mp-button-small-padding` | Public | `0 var(--mp-sys-space-5)` | Local CSS<br>`padding` |
| `--mp-button-small-stacked-height` | Public | `44px` | Local CSS<br>`height`, `min-width` |
| `--mp-button-stacked-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-button-stacked-gap` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`gap` |
| `--mp-button-stacked-height` | Public | `48px` | Local CSS<br>`height`, `min-width` |
| `--mp-button-stacked-padding` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`padding-block` |
| `--mp-button-state-layer-color` | Public | `var(--mp-sys-color-surface-page)` | Local CSS<br>`background-color` |
| `--mp-button-state-opacity-active` | Public | `0.12` | Local CSS<br>`opacity` |
| `--mp-button-state-opacity-hover` | Public | `0.08` | Local CSS<br>`opacity` |
| `--mp-button-success-color` | Public | `var(--mp-sys-color-status-success)` | Local CSS<br>`background-color` |
| `--mp-button-success-icon-color` | Public | `var(--mp-sys-color-content-success)` | Local CSS<br>`color` |
| `--mp-button-success-icon-container-color` | Public | `rgb(var(--mp-success-1))` | Local CSS<br>`background-color` |
| `--mp-button-success-state-layer-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`background-color` |
| `--mp-button-success-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-button-tertiary-color` | Public | `rgb(var(--mp-gray-7))` | Local CSS<br>`background-color` |
| `--mp-button-tertiary-icon-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-button-tertiary-icon-container-color` | Public | `rgb(var(--mp-gray-1))` | Local CSS<br>`background-color` |
| `--mp-button-tertiary-state-layer-color` | Public | `var(--mp-sys-color-content-on-bright)`<br>`var(--mp-sys-color-content-on-dark)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-button-tertiary-text-color` | Public | `var(--mp-sys-color-content-on-dark)`<br>`var(--mp-sys-color-content-on-bright)` (`:root[maple-theme="dark"]`) | Local CSS<br>`color` |
| `--mp-button-transition-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-button-warning-color` | Public | `var(--mp-sys-color-status-warning)` | Local CSS<br>`background-color` |
| `--mp-button-warning-icon-color` | Public | `var(--mp-sys-color-content-warning)` | Local CSS<br>`color` |
| `--mp-button-warning-icon-container-color` | Public | `rgb(var(--mp-warning-1))` | Local CSS<br>`background-color` |
| `--mp-button-warning-state-layer-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`background-color` |
| `--mp-button-warning-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-button-xl-font-size` | Public | `var(--mp-sys-font-size-xl)` | Local CSS<br>`font-size` |
| `--mp-button-xl-height` | Public | `52px` | Local CSS<br>`height`, `min-width`, `width` |
| `--mp-button-xl-padding` | Public | `0 28px` | Local CSS<br>`padding` |
| `--mp-button-xl-stacked-height` | Public | `64px` | Local CSS<br>`height`, `min-width` |

## card

Source: `src/card/style/token.less`

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
| `--mp-card-content-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-card-content-margin` | Public | `16px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-content-padding` | Public | `0 16px` | Local CSS<br>`padding` |
| `--mp-card-content-row-margin` | Public | `16px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-description-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-card-description-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-card-description-margin` | Public | `20px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-description-padding` | Public | `0 13px` | Local CSS<br>`padding` |
| `--mp-card-filled-background` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color` |
| `--mp-card-floating-buttons-bottom` | Public | `16px` | Local CSS<br>`bottom` |
| `--mp-card-floating-buttons-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-card-floating-buttons-right` | Public | `16px` | Local CSS<br>`right` |
| `--mp-card-footer-bottom` | Public | `9px` | Local CSS<br>`bottom` |
| `--mp-card-footer-margin` | Public | `30px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-footer-padding` | Public | `0 12px` | Local CSS<br>`padding` |
| `--mp-card-footer-right` | Public | `13px` | Local CSS<br>`right` |
| `--mp-card-hover-shadow` | Public | `0 4px 12px rgb(0 0 0%)` | Local CSS<br>`box-shadow` |
| `--mp-card-image-height` | Public | `200px` | Local CSS<br>`height` |
| `--mp-card-image-width` | Public | `100%` | Local CSS<br>`width` |
| `--mp-card-line-height` | Public | `22px` | Local CSS<br>`line-height` |
| `--mp-card-outline-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-card-padding` | Public | `0 0 15px 0` | Local CSS<br>`padding` |
| `--mp-card-row-height` | Public | `140px` | Local CSS<br>`min-height` |
| `--mp-card-row-image-width` | Public | `140px` | Local CSS<br>`width` |
| `--mp-card-row-line-height` | Public | `1.5` | Local CSS<br>`line-height` |
| `--mp-card-size-sm-section-margin` | Public | `8px 0 0` | Local CSS<br>`margin` |
| `--mp-card-size-sm-section-padding` | Public | `0 12px` | Local CSS<br>`padding` |
| `--mp-card-size-sm-title-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-card-subtitle-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-card-subtitle-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-card-subtitle-margin` | Public | `10px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-subtitle-padding` | Public | `0 12px` | Local CSS<br>`padding` |
| `--mp-card-subtitle-row-margin` | Public | `-8px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-title-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-card-title-font-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-card-title-margin` | Public | `15px 0 0 0` | Local CSS<br>`margin` |
| `--mp-card-title-padding` | Public | `0 12px` | Local CSS<br>`padding` |
| `--mp-card-title-row-margin` | Public | `12px 0` | Local CSS<br>`margin` |

## carousel

Source: `src/carousel/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-carousel-card-duration` | Public | `300ms` | Local CSS<br>`transition` |
| `--mp-carousel-fade-duration` | Public | `300ms` | Local CSS<br>`transition` |

## cascader

Source: `src/cascader/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-cascader-checkbox-bg-hover` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background-color` |
| `--mp-cascader-font-item-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-cascader-item-bg-active` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background-color` |
| `--mp-cascader-item-bg-disabled` | Public | `transparent` | Local CSS<br>`background-color` |
| `--mp-cascader-item-bg-disabled-active` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background-color` |
| `--mp-cascader-item-bg-hover` | Public | `var(--mp-cascader-item-bg-active)` | Local CSS<br>`background-color` |
| `--mp-cascader-item-icon-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-cascader-item-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-cascader-item-text-color-active` | Public | `var(--mp-cascader-item-text-color)` | Local CSS<br>`color` |
| `--mp-cascader-item-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-cascader-item-text-color-disabled-active` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-cascader-item-text-color-hover` | Public | `var(--mp-cascader-item-text-color)` | Local CSS<br>`color` |
| `--mp-cascader-margin-checkbox-right` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-right` |
| `--mp-cascader-margin-item-icon-left` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`padding-right` |
| `--mp-cascader-option-min-width` | Public | `100px` | Local CSS<br>`min-width` |
| `--mp-cascader-padding-item-left` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`padding-left`, `padding-right` |
| `--mp-cascader-padding-item-right` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`padding-right`, `right` |
| `--mp-cascader-panel-column-max-height` | Public | `200px` | Local CSS<br>`max-height` |
| `--mp-cascader-panel-column-min-width` | Public | `120px` | Local CSS<br>`min-width` |
| `--mp-cascader-popup-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-cascader-popup-box-shadow` | Public | `0 4px 10px rgb(0 0 0%)` | Local CSS<br>`box-shadow` |
| `--mp-cascader-popup-color-border` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`border`, `border-right`, `border-top` |
| `--mp-cascader-popup-max-height` | Public | `200px` | Local CSS<br>`height` |
| `--mp-cascader-popup-padding-vertical` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`padding` |
| `--mp-cascader-size-item-height` | Public | `36px` | Local CSS<br>`height`, `line-height` |
| `--mp-cascader-size-item-icon` | Public | `12px` | Local CSS<br>`font-size`, `margin-top`, `padding-right` |
| `--mp-cascader-slide-margin` | Public | `120px` | Local CSS<br>`margin-left` |

## checkbox

Source: `src/checkbox/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-checkbox-action-padding` | Public | `6px` | Local CSS<br>`padding`, `transform` |
| `--mp-checkbox-animation-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-checkbox-control-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-checkbox-control-color-checked` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-checkbox-control-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-checkbox-control-color-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-checkbox-control-size` | Public | `24px` | Local CSS<br>`font-size` |
| `--mp-checkbox-group-gap` | Public | `0` | Local CSS<br>`gap` |
| `--mp-checkbox-label-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-checkbox-label-gap` | Public | `0` | Local CSS<br>`margin-inline-start` |
| `--mp-checkbox-label-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-checkbox-label-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |

## collapse

Source: `src/collapse/style/token.less`

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

## count-to

Source: `src/count-to/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-count-to-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-count-to-text-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |

## countdown

Source: `src/countdown/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-countdown-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-countdown-text-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |

## dialog

Source: `src/dialog/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-dialog-actions-button-gap` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`margin-left` |
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
| `--mp-dialog-fullscreen-height` | Public | `100vh` | Local CSS<br>`height` |
| `--mp-dialog-fullscreen-width` | Public | `100vw` | Local CSS<br>`width` |
| `--mp-dialog-margin-top` | Public | `0` | Local CSS<br>`margin-top` |
| `--mp-dialog-overlay-background` | Public | `var(--mp-sys-color-scrim)` | Local CSS<br>`background-color` |
| `--mp-dialog-simple-actions-gap` | Public | `0` | Local CSS<br>`margin-top` |
| `--mp-dialog-simple-border-radius` | Public | `var(--mp-sys-radius-lg)` | Local CSS<br>`border-radius` |
| `--mp-dialog-simple-content-gap` | Public | `0` | Local CSS<br>`margin-top` |
| `--mp-dialog-simple-padding` | Public | `20px` | Local CSS<br>`padding` |
| `--mp-dialog-simple-width` | Public | `280px` | Local CSS<br>`width` |
| `--mp-dialog-status-danger-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-dialog-status-icon-gap` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`margin-right` |
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

## divider

Source: `src/divider/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-divider-border-width` | Public | `1px` | Local CSS<br>`border-left-width`, `border-top-width` |
| `--mp-divider-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border-left-color`, `border-top-color` |
| `--mp-divider-orientation-horizontal-size-x-lg` | Public | `32px` | Local CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-size-x-md` | Public | `24px` | Local CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-size-x-sm` | Public | `16px` | Local CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-size-x-xl` | Public | `40px` | Local CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-size-x-xs` | Public | `12px` | Local CSS<br>`margin-inline-end`, `margin-inline-start`, `max-width` |
| `--mp-divider-orientation-horizontal-size-y-lg` | Public | `24px` | Local CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-size-y-md` | Public | `16px` | Local CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-size-y-sm` | Public | `12px` | Local CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-size-y-xl` | Public | `32px` | Local CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-horizontal-size-y-xs` | Public | `8px` | Local CSS<br>`margin-block-end`, `margin-block-start` |
| `--mp-divider-orientation-vertical-size-x-lg` | Public | `8px` | Local CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-size-x-md` | Public | `6px` | Local CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-size-x-sm` | Public | `4px` | Local CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-size-x-xl` | Public | `12px` | Local CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-size-x-xs` | Public | `2px` | Local CSS<br>`margin-block-end`, `margin-block-start`, `max-height` |
| `--mp-divider-orientation-vertical-size-y-lg` | Public | `16px` | Local CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-size-y-md` | Public | `12px` | Local CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-size-y-sm` | Public | `8px` | Local CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-size-y-xl` | Public | `24px` | Local CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-orientation-vertical-size-y-xs` | Public | `4px` | Local CSS<br>`margin-inline-end`, `margin-inline-start` |
| `--mp-divider-text-align-inset` | Public | `24px` | Local CSS<br>`height`, `width` |
| `--mp-divider-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-divider-text-padding` | Public | `8px` | Local CSS<br>`padding` |

## dropdown-menu

Source: `src/dropdown-menu/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-dropdown-menu-option-bg-disabled` | Public | `transparent` | Local CSS<br>`background` |
| `--mp-dropdown-menu-option-bg-selected-hover` | Public | `var(--mp-dropdown-menu-option-selected-background)` | Local CSS<br>`background` |

## ellipsis

Source: `src/ellipsis/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-ellipsis-focus-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`outline` |
| `--mp-ellipsis-focus-offset` | Public | `2px` | Local CSS<br>`outline-offset` |
| `--mp-ellipsis-focus-width` | Public | `2px` | Local CSS<br>`outline` |

## empty

Source: `src/empty/style/token.less`

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

## field-decorator

Source: `src/field-decorator/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-field-blur-color` | Public | `var(--mp-sys-color-content-tertiary)` | Local CSS<br>`border-bottom`, `color` |
| `--mp-field-border-radius` | Public | `4px` | Local CSS<br>`border-end-end-radius`, `border-end-start-radius`, `border-radius`, `border-start-end-radius`, `border-start-start-radius` |
| `--mp-field-border-width` | Public | `1px` | Local CSS<br>`border`, `border-bottom`, `margin-inline-start`, `min-height`, `outline`, `padding-inline-start` |
| `--mp-field-clear-icon-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-field-clear-icon-size` | Public | `var(--mp-field-icon-size)` | Local CSS<br>`font-size` |
| `--mp-field-clear-padding` | Public | `4px` | Local CSS<br>`padding` |
| `--mp-field-clear-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-field-clear-visibility` | Public | `visible` | Local CSS<br>`visibility` |
| `--mp-field-content-gap` | Public | `8px` | Local CSS<br>`gap`, `padding-inline-end`, `padding-inline-start` |
| `--mp-field-content-padding-vertical` | Public | `8px` | Local CSS<br>`top` |
| `--mp-field-control-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-field-control-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`-webkit-text-fill-color`, `color` |
| `--mp-field-error-color` | Public | `var(--mp-sys-color-status-danger)` | Local CSS<br>`border-bottom-color`, `border-color`, `caret-color`, `color` |
| `--mp-field-focus-color` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`border-bottom-color`, `caret-color`, `color`, `outline` |
| `--mp-field-hint-duration` | Public | `0.2s` | Local CSS<br>`transition` |
| `--mp-field-hint-scale` | Public | `0.75` | Local CSS<br>`font-size`, `top`, `transform` |
| `--mp-field-hint-space` | Public | `4px` | Local CSS<br>`padding`, `padding-inline-start` |
| `--mp-field-icon-size` | Public | `20px` | Local CSS<br>`font-size` |
| `--mp-field-line-height` | Public | `1.5` | Local CSS<br>`line-height`, `top` |
| `--mp-field-padding-horizontal` | Public | `16px` | Local CSS<br>`left`, `margin-inline-end`, `margin-inline-start`, `max-width`, `padding`, `padding-inline-start` |
| `--mp-field-placeholder-text-color` | Public | `var(--mp-sys-color-content-tertiary)` | Local CSS<br>`color` |
| `--mp-field-prefix-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-field-size-lg-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-field-size-lg-height` | Public | `56px` | Local CSS<br>`min-height` |
| `--mp-field-size-md-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-field-size-md-height` | Public | `48px` | Local CSS<br>`min-height` |
| `--mp-field-size-sm-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-field-size-sm-height` | Public | `40px` | Local CSS<br>`min-height` |
| `--mp-field-size-xl-font-size` | Public | `18px` | Local CSS<br>`font-size` |
| `--mp-field-size-xl-height` | Public | `64px` | Local CSS<br>`min-height` |
| `--mp-field-size-xs-font-size` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-field-size-xs-height` | Public | `32px` | Local CSS<br>`min-height` |
| `--mp-field-suffix-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-field-variant-filled-background` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background` |
| `--mp-field-variant-filled-background-disabled` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background` |
| `--mp-field-variant-filled-background-error` | Public | `var(--mp-color-danger-light-1)` | Local CSS<br>`background` |
| `--mp-field-variant-filled-background-focus` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background` |
| `--mp-field-variant-filled-background-hover` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-field-variant-outline-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border`, `border-color` |
| `--mp-field-variant-outline-border-color-disabled` | Public | `var(--mp-sys-color-border-subtle)` | Local CSS<br>`border-color` |
| `--mp-field-variant-outline-border-color-error` | Public | `var(--mp-sys-color-status-danger)` | Local CSS<br>`border-color` |
| `--mp-field-variant-outline-border-color-focus` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`border-color` |
| `--mp-field-variant-outline-border-color-hover` | Public | `var(--mp-sys-color-border-strong)` | Local CSS<br>`border-color` |
| `--mp-field-variant-standard-line-color` | Public | `var(--mp-field-blur-color)` | Local CSS<br>`border-bottom` |
| `--mp-field-variant-standard-line-color-disabled` | Public | `var(--mp-sys-color-border-subtle)` | Local CSS<br>`border-bottom-color` |
| `--mp-field-variant-standard-line-color-error` | Public | `var(--mp-field-error-color)` | Local CSS<br>`border-bottom-color` |
| `--mp-field-variant-standard-line-color-focus` | Public | `var(--mp-field-focus-color)` | Local CSS<br>`border-bottom-color` |
| `--mp-field-variant-standard-line-size` | Public | `1px` | Local CSS<br>`border-bottom` |
| `--mp-field-variant-standard-line-size-focus` | Public | `2px` | Local CSS<br>`border-bottom-width` |

## form

Source: `src/form/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-form-extra-margin-top` | Public | `6px` | Local CSS<br>`margin-top` |
| `--mp-form-extra-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-form-extra-text-font-size` | Public | `12px` | Local CSS<br>`font-size` |
| `--mp-form-item-asterisk-margin` | Public | `4px` | Local CSS<br>`margin-left`, `margin-right` |
| `--mp-form-item-label-gap` | Public | `12px` | Local CSS<br>`margin-right` |
| `--mp-form-item-label-width` | Public | `88px` | Local CSS<br>`flex`, `width` |
| `--mp-form-label-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-form-required-symbol-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-form-size-md-item-margin-bottom` | Public | `16px` | Local CSS<br>`margin-bottom` |
| `--mp-form-size-md-label-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-form-vertical-label-margin-bottom` | Public | `8px` | Local CSS<br>`margin-bottom` |

## hover

Source: `src/hover/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-hover-overlay-focusing-opacity` | Public | `0.12` | Local CSS<br>`opacity` |
| `--mp-hover-overlay-opacity` | Public | `0.04` | Local CSS<br>`opacity` |
| `--mp-hover-transition-duration` | Public | `var(--mp-sys-motion-duration-fast)` | Local CSS<br>`transition` |

## icon

Source: `src/icon/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-icon-size` | Public | `inherit` | Local CSS<br>`font-size` |
| `--mp-icon-spin-duration` | Public | `1s` | Local CSS<br>`animation` |

## infinite-scroll

Source: `src/infinite-scroll/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-infinite-scroll-error-color` | Public | `var(--mp-color-danger)` | Local CSS<br>`color` |
| `--mp-infinite-scroll-loading-gap` | Public | `8px` | Local CSS<br>`gap` |
| `--mp-infinite-scroll-status-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-infinite-scroll-status-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-infinite-scroll-status-min-height` | Public | `50px` | Local CSS<br>`min-height` |
| `--mp-infinite-scroll-status-padding` | Public | `12px 0` | Local CSS<br>`padding` |

## input

Source: `src/input/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
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

## input-number

Source: `src/input-number/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-input-number-addon-background` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background` |
| `--mp-input-number-addon-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-input-number-addon-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-input-number-border-radius` | Public | `var(--mp-field-border-radius)` | Local CSS<br>`border-end-end-radius`, `border-end-start-radius`, `border-start-end-radius`, `border-start-start-radius` |
| `--mp-input-number-border-width` | Public | `1px` | Local CSS<br>`border`, `border-inline-end`, `border-inline-start`, `border-top`, `outline`, `outline-offset` |
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

## link

Source: `src/link/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-link-bg-active` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background-color` |
| `--mp-link-bg-hover` | Public | `var(--mp-color-fill-2)` | Local CSS<br>`background-color` |
| `--mp-link-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-link-danger-color` | Public | `var(--mp-color-danger)` | Local CSS<br>`color` |
| `--mp-link-default-color` | Public | `#555` | Local CSS<br>`color` |
| `--mp-link-disabled-color` | Public | `var(--mp-color-text-disabled)` | Local CSS<br>`color` |
| `--mp-link-focus-color` | Public | `currentColor` | Local CSS<br>`outline` |
| `--mp-link-focus-offset` | Public | `2px` | Local CSS<br>`outline-offset` |
| `--mp-link-focus-opacity` | Public | `0.8` | Local CSS<br>`opacity` |
| `--mp-link-focus-width` | Public | `2px` | Local CSS<br>`outline` |
| `--mp-link-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-link-icon-size` | Public | `1em` | Local CSS<br>`font-size` |
| `--mp-link-info-color` | Public | `var(--mp-color-info)` | Local CSS<br>`color` |
| `--mp-link-line-height` | Public | `1.5` | Local CSS<br>`line-height` |
| `--mp-link-margin-icon-right` | Public | `0.25em` | Local CSS<br>`margin-right` |
| `--mp-link-padding-horizontal` | Public | `0.25em` | Local CSS<br>`padding` |
| `--mp-link-padding-vertical` | Public | `1px` | Local CSS<br>`padding` |
| `--mp-link-primary-color` | Public | `var(--mp-color-primary)` | Local CSS<br>`color` |
| `--mp-link-secondary-color` | Public | `rgb(var(--mp-gray-6))` | Local CSS<br>`color` |
| `--mp-link-size-icon` | Public | `var(--mp-link-icon-size)` | Local CSS<br>`font-size` |
| `--mp-link-spin-duration` | Public | `1s` | Local CSS<br>`animation` |
| `--mp-link-success-color` | Public | `var(--mp-color-success)` | Local CSS<br>`color` |
| `--mp-link-tertiary-color` | Public | `rgb(var(--mp-gray-7))` | Local CSS<br>`color` |
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
| `--mp-link-warning-color` | Public | `var(--mp-color-warning)` | Local CSS<br>`color` |

## loading-bar

Source: `src/loading-bar/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-loading-bar-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`background-color` |
| `--mp-loading-bar-error-color` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background-color` |
| `--mp-loading-bar-height` | Public | `3px` | Local CSS<br>`height` |

## message

Source: `src/message/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-message-action-margin` | Public | `0 8px` | Local CSS<br>`margin` |
| `--mp-message-border-radius` | Public | `4px` | Local CSS<br>`border-radius` |
| `--mp-message-box-shadow` | Public | `0 4px 12px rgba(0, 0, 0, 0.2)` | Local CSS<br>`box-shadow` |
| `--mp-message-close-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-message-close-margin-right` | Public | `4px` | Local CSS<br>`margin-right` |
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

## overlay

Source: `src/overlay/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-overlay-animation-duration` | Public | `var(--mp-sys-motion-duration-slow)` | Local CSS<br>`transition` |
| `--mp-overlay-background-color` | Public | `var(--mp-sys-color-scrim)` | Local CSS<br>`background-color` |
| `--mp-overlay-content-z-index` | Public | `var(--mp-sys-layer-raised)` | Local CSS<br>`z-index` |

## page-header

Source: `src/page-header/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-page-header-back-color` | Public | `var(--mp-color-text-2)` | Local CSS<br>`color` |
| `--mp-page-header-back-hover-bg` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-page-header-back-hover-size` | Public | `30px` | Local CSS<br>`height`, `width` |
| `--mp-page-header-back-size` | Public | `22px` | Local CSS<br>`font-size` |
| `--mp-page-header-content-margin-top` | Public | `16px` | Local CSS<br>`margin-top` |
| `--mp-page-header-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-page-header-footer-margin-top` | Public | `16px` | Local CSS<br>`margin-top` |
| `--mp-page-header-item-gap` | Public | `12px` | Local CSS<br>`margin-left` |
| `--mp-page-header-row-gap` | Public | `12px` | Local CSS<br>`margin-bottom` |
| `--mp-page-header-subtitle-color` | Public | `var(--mp-color-text-3)` | Local CSS<br>`color` |
| `--mp-page-header-title-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-page-header-title-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-page-header-title-font-weight` | Public | `600` | Local CSS<br>`font-weight` |

## pagination

Source: `src/pagination/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-pagination-active-background` | Public | `var(--mp-color-primary-light-1)` | Local CSS<br>`background` |
| `--mp-pagination-active-color` | Public | `var(--mp-color-primary)` | Local CSS<br>`color` |
| `--mp-pagination-disabled-background` | Public | `var(--mp-color-fill-1)` | Local CSS<br>`background` |
| `--mp-pagination-disabled-color` | Public | `var(--mp-color-text-disabled)` | Local CSS<br>`color` |
| `--mp-pagination-focus-color` | Public | `var(--mp-color-primary)` | Local CSS<br>`outline` |
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
| `--mp-pagination-item-gap` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`gap` |
| `--mp-pagination-item-padding` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-pagination-select-width` | Public | `max-content` | Local CSS<br>`width` |
| `--mp-pagination-size-lg` | Public | `44px` | Local CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-md` | Public | `36px` | Local CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-sm` | Public | `28px` | Local CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-xl` | Public | `52px` | Local CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-size-xs` | Public | `24px` | Local CSS<br>`height`, `min-height`, `min-width` |
| `--mp-pagination-text-color` | Public | `var(--mp-color-text-1)` | Local CSS<br>`color` |
| `--mp-pagination-touch-size` | Public | `44px` | Local CSS<br>`min-height` |

## paper

Source: `src/paper/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-paper-background` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background` |
| `--mp-paper-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-paper-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-paper-border-width` | Public | `1px` | Local CSS<br>`border` |
| `--mp-paper-transition-duration` | Public | `var(--mp-sys-motion-duration-slow)` | Local CSS<br>`transition` |

## picker

Source: `src/picker/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-picker-option-check-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |

## popover

Source: `src/popover/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-popover-animation-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-popover-arrow-z-index` | Public | `1` | Local CSS<br>`z-index` |
| `--mp-popover-background` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-popover-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border` |
| `--mp-popover-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-popover-border-width` | Public | `1px` | Local CSS<br>`border` |
| `--mp-popover-box-shadow` | Public | `0 3px 3px -2px var(--mp-shadow-key-umbra-opacity), 0 3px 4px 0 var(--mp-shadow-key-penumbra-opacity),     0 1px 8px 0 var(--mp-shadow-key-ambient-opacity)` | Local CSS<br>`box-shadow` |
| `--mp-popover-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-popover-line-height` | Public | `var(--mp-line-height)` | Local CSS<br>`line-height` |
| `--mp-popover-padding-horizontal` | Public | `var(--mp-sys-space-7)` | Local CSS<br>`padding` |
| `--mp-popover-padding-vertical` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`padding` |
| `--mp-popover-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-popover-title-content-gap` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`margin-top` |
| `--mp-popover-title-font-size` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-popover-title-font-weight` | Public | `var(--mp-sys-font-weight-medium)` | Local CSS<br>`font-weight` |
| `--mp-popover-title-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |

## popup

Source: `src/popup/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-popup-content-background-color` | Public | `var(--mp-sys-color-surface-raised)` | Local CSS<br>`background-color` |
| `--mp-popup-content-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-popup-overlay-background-color` | Public | `var(--mp-sys-color-scrim)` | Local CSS<br>`background-color` |

## progress-group

Source: `src/progress-group/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-progress-group-dot-size` | Public | `8px` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-font-size` | Public | `14px` | Local CSS<br>`font-size` |
| `--mp-progress-group-gap` | Public | `8px` | Local CSS<br>`gap` |
| `--mp-progress-group-item-gap` | Public | `6px` | Local CSS<br>`gap` |
| `--mp-progress-group-muted-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-progress-group-radius` | Public | `999px` | Local CSS<br>`border-radius`, `clip-path` |
| `--mp-progress-group-size-lg-thickness` | Public | `12px` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-size-md-thickness` | Public | `8px` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-size-sm-thickness` | Public | `4px` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-size-xl-thickness` | Public | `16px` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-size-xs-thickness` | Public | `2px` | Local CSS<br>`height`, `width` |
| `--mp-progress-group-status-font-weight` | Public | `var(--mp-sys-font-weight-medium)` | Local CSS<br>`font-weight` |
| `--mp-progress-group-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-progress-group-tooltip-bg` | Public | `var(--mp-sys-color-surface-tooltip)` | Local CSS<br>`background` |
| `--mp-progress-group-tooltip-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-progress-group-tooltip-duration` | Public | `var(--mp-sys-motion-duration-fast)` | Local CSS<br>`animation` |
| `--mp-progress-group-tooltip-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-progress-group-tooltip-line-height` | Public | `1.4` | Local CSS<br>`line-height` |
| `--mp-progress-group-tooltip-max-width` | Public | `240px` | Local CSS<br>`max-width` |
| `--mp-progress-group-tooltip-offset` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`bottom`, `left` |
| `--mp-progress-group-tooltip-padding` | Public | `5px var(--mp-sys-space-4)` | Local CSS<br>`padding` |
| `--mp-progress-group-tooltip-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-progress-group-track-color` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background`, `stroke` |
| `--mp-progress-group-transition-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`animation`, `transition` |

## radio

Source: `src/radio/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-internal-radio-focus-offset` | Internal | `2px` | Local CSS<br>`outline-offset` |
| `--mp-internal-radio-focus-width` | Internal | `2px` | Local CSS<br>`outline` |
| `--mp-internal-radio-segment-bg` | Internal | `var(--mp-sys-color-surface-default)` | Local CSS<br>`background` |
| `--mp-internal-radio-segment-gap` | Internal | `3px` | Local CSS<br>`gap`, `padding` |
| `--mp-internal-radio-segment-group-bg` | Internal | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background` |
| `--mp-internal-radio-segment-height` | Internal | `var(--mp-sys-control-height-md)` | Local CSS<br>`line-height`, `min-height` |
| `--mp-internal-radio-segment-hover` | Internal | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background` |
| `--mp-internal-radio-segment-padding` | Internal | `12px` | Local CSS<br>`padding-inline` |
| `--mp-internal-radio-segment-radius` | Internal | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-radio-action-padding` | Public | `6px` | Local CSS<br>`padding`, `transform` |
| `--mp-radio-animation-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-radio-control-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-radio-control-color-checked` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color`, `outline` |
| `--mp-radio-control-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-radio-control-color-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`color` |
| `--mp-radio-control-size` | Public | `24px` | Local CSS<br>`font-size` |
| `--mp-radio-group-gap` | Public | `0` | Local CSS<br>`gap` |
| `--mp-radio-label-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-radio-label-gap` | Public | `0` | Local CSS<br>`margin-inline-start` |
| `--mp-radio-label-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-radio-label-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |

## ripple

Source: `src/ripple/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-ripple-color` | Public | `currentColor` | Local CSS<br>`background-color` |
| `--mp-ripple-cubic-bezier` | Public | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` | Local CSS<br>`transition` |
| `--mp-ripple-expand-duration` | Public | `200ms` | Local CSS<br>`transition` |
| `--mp-ripple-fade-duration` | Public | `140ms` | Local CSS<br>`transition` |

## select

Source: `src/select/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-select-popup-bg` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-select-popup-border-color` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`border`, `border-bottom`, `border-top` |
| `--mp-select-popup-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-select-popup-box-shadow` | Public | `0 4px 10px rgb(0 0 0%)` | Local CSS<br>`box-shadow` |
| `--mp-select-popup-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-select-popup-group-title-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-select-popup-group-title-height` | Public | `20px` | Local CSS<br>`line-height` |
| `--mp-select-popup-group-title-padding-horizontal` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`padding` |
| `--mp-select-popup-group-title-padding-top` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-top` |
| `--mp-select-popup-group-title-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-select-popup-loading-min-height` | Public | `50px` | Local CSS<br>`min-height` |
| `--mp-select-popup-max-height` | Public | `200px` | Local CSS<br>`max-height` |
| `--mp-select-popup-option-bg` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-select-popup-option-bg-disabled` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-select-popup-option-bg-hover` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-select-popup-option-bg-selected` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-select-popup-option-font-weight-selected` | Public | `var(--mp-sys-font-weight-medium)` | Local CSS<br>`font-weight` |
| `--mp-select-popup-option-height` | Public | `36px` | Local CSS<br>`line-height` |
| `--mp-select-popup-option-icon-margin-right` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`margin-right` |
| `--mp-select-popup-option-padding-horizontal` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`padding` |
| `--mp-select-popup-option-suffix-icon-margin-left` | Public | `var(--mp-sys-space-5)` | Local CSS<br>`margin-left` |
| `--mp-select-popup-option-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-select-popup-option-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-select-popup-option-text-color-hover` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-select-popup-option-text-color-selected` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-select-popup-padding-vertical` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`padding` |

## skeleton

Source: `src/skeleton/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-skeleton-animation-background` | Public | `linear-gradient(90deg, transparent, var(--mp-sys-color-surface-default), transparent)` | Local CSS<br>`background` |
| `--mp-skeleton-animation-duration` | Public | `1s` | Local CSS<br>`animation` |
| `--mp-skeleton-avatar-background-color` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-skeleton-avatar-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-skeleton-avatar-margin-right` | Public | `var(--mp-sys-space-6)` | Local CSS<br>`margin-right` |
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

## space

Source: `src/space/style/token.less`

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

## statistic

Source: `src/statistic/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-statistic-decimal-font-size` | Public | `inherit` | Local CSS<br>`font-size` |
| `--mp-statistic-extra-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-statistic-extra-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-statistic-extra-margin-top` | Public | `8px` | Local CSS<br>`margin-top` |
| `--mp-statistic-prefix-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-statistic-prefix-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-statistic-prefix-spacing` | Public | `4px` | Local CSS<br>`margin-right` |
| `--mp-statistic-suffix-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-statistic-suffix-font-size` | Public | `var(--mp-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-statistic-suffix-spacing` | Public | `4px` | Local CSS<br>`margin-left` |
| `--mp-statistic-title-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-statistic-title-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-statistic-title-margin-bottom` | Public | `8px` | Local CSS<br>`margin-bottom` |
| `--mp-statistic-value-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-statistic-value-font-size` | Public | `28px` | Local CSS<br>`font-size` |
| `--mp-statistic-value-font-weight` | Public | `500` | Local CSS<br>`font-weight` |

## steps

Source: `src/steps/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-steps-arrow-item-bg-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background-color`, `border-left` |
| `--mp-steps-arrow-item-bg-finish` | Public | `var(--mp-sys-color-state-selected)` | Local CSS<br>`background-color`, `border-left` |
| `--mp-steps-arrow-item-bg-process` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`background-color`, `border-left` |
| `--mp-steps-arrow-item-bg-wait` | Public | `var(--mp-sys-color-surface-muted)` | Local CSS<br>`background-color`, `border-left` |
| `--mp-steps-arrow-item-description-color-error` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-description-color-finish` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-description-color-process` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-description-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-description-margin-top` | Public | `0` | Local CSS<br>`margin-top` |
| `--mp-steps-arrow-item-gap` | Public | `4px` | Local CSS<br>`margin-right` |
| `--mp-steps-arrow-item-title-color-error` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-title-color-finish` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-title-color-process` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-title-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-arrow-item-title-font-weight-active` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-steps-arrow-size-md-title-padding-left` | Public | `16px` | Local CSS<br>`padding-left` |
| `--mp-steps-arrow-size-sm-title-padding-left` | Public | `20px` | Local CSS<br>`padding-left` |
| `--mp-steps-changeable-hover-text-color` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-steps-circle-horizontal-item-description-margin-top` | Public | `2px` | Local CSS<br>`margin-top` |
| `--mp-steps-circle-item-bg-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-bg-finish` | Public | `var(--mp-sys-color-state-selected)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-bg-process` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`background-color` |
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
| `--mp-steps-circle-item-icon-gap` | Public | `12px` | Local CSS<br>`left`, `margin-right`, `padding-right` |
| `--mp-steps-circle-item-icon-text-color-error` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-icon-text-color-finish` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-icon-text-color-process` | Public | `var(--mp-sys-color-surface-default)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-icon-text-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-circle-item-tail-color-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-tail-color-process` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-tail-color-wait` | Public | `var(--mp-sys-color-border-default)` | Local CSS<br>`background-color` |
| `--mp-steps-circle-item-tail-size` | Public | `1px` | Local CSS<br>`height`, `left`, `top`, `width` |
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
| `--mp-steps-dot-item-bg-finish` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`background-color` |
| `--mp-steps-dot-item-bg-process` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`background-color` |
| `--mp-steps-dot-item-bg-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`background-color` |
| `--mp-steps-dot-item-border-color-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`border-color` |
| `--mp-steps-dot-item-border-color-finish` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`border-color` |
| `--mp-steps-dot-item-border-color-process` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`border-color` |
| `--mp-steps-dot-item-border-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`border-color` |
| `--mp-steps-dot-item-description-color-error` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-description-color-finish` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-description-color-process` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-description-color-wait` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-steps-dot-item-icon-border-radius` | Public | `50%` | Local CSS<br>`border-radius` |
| `--mp-steps-dot-item-icon-gap` | Public | `4px` | Local CSS<br>`left`, `margin-right`, `padding-top` |
| `--mp-steps-dot-item-icon-margin-left` | Public | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-dot-item-icon-size)) / 2)` | Local CSS<br>`left`, `margin-left` |
| `--mp-steps-dot-item-icon-size` | Public | `8px` | Local CSS<br>`height`, `left`, `margin-left`, `margin-right`, `margin-top`, `padding-top`, `top`, `width` |
| `--mp-steps-dot-item-icon-size-active` | Public | `10px` | Local CSS<br>`height`, `margin-left`, `margin-top`, `width` |
| `--mp-steps-dot-item-tail-color-error` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background-color` |
| `--mp-steps-dot-item-tail-color-process` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`background-color` |
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
| `--mp-steps-dot-vertical-item-icon-margin-right` | Public | `16px` | Local CSS<br>`margin-right` |
| `--mp-steps-dot-vertical-tail-padding-bottom` | Public | `2px` | Local CSS<br>`padding-bottom` |
| `--mp-steps-dot-vertical-tail-padding-top-extra` | Public | `4px` | Local CSS<br>`padding-top` |
| `--mp-steps-label-vertical-content-width` | Public | `100%` | Local CSS<br>`left`, `margin-left` |
| `--mp-steps-navigation-arrow-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`border` |
| `--mp-steps-navigation-arrow-line-width` | Public | `2px` | Local CSS<br>`border` |
| `--mp-steps-navigation-arrow-right` | Public | `30px` | Local CSS<br>`right` |
| `--mp-steps-navigation-arrow-size` | Public | `6px` | Local CSS<br>`height`, `width` |
| `--mp-steps-navigation-arrow-spacing-right` | Public | `10px` | Local CSS<br>`padding-right` |
| `--mp-steps-navigation-arrow-top` | Public | `10px` | Local CSS<br>`top` |
| `--mp-steps-navigation-content-margin-bottom` | Public | `20px` | Local CSS<br>`margin-bottom` |
| `--mp-steps-navigation-description-padding-right` | Public | `20px` | Local CSS<br>`padding-right` |
| `--mp-steps-navigation-ink-bg` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`background-color` |
| `--mp-steps-navigation-ink-height` | Public | `2px` | Local CSS<br>`height` |
| `--mp-steps-navigation-ink-spacing-left` | Public | `0` | Local CSS<br>`left` |
| `--mp-steps-navigation-ink-spacing-right` | Public | `30px` | Local CSS<br>`right` |
| `--mp-steps-navigation-margin-right` | Public | `32px` | Local CSS<br>`margin-right` |
| `--mp-steps-navigation-padding-left` | Public | `20px` | Local CSS<br>`padding-left` |
| `--mp-steps-node-font-weight` | Public | `500` | Local CSS<br>`font-weight` |
| `--mp-steps-size-md` | Public | `28px` | Local CSS<br>`height`, `left`, `line-height`, `margin-left`, `margin-top`, `padding`, `padding-right`, `top`, `width` |
| `--mp-steps-size-md-arrow` | Public | `72px` | Local CSS<br>`border-bottom`, `border-left`, `border-top`, `height`, `padding-left`, `right` |
| `--mp-steps-size-md-description-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-steps-size-md-icon-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-steps-size-md-item-icon-margin-left` | Public | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-size-md)) / 2)` | Local CSS<br>`left`, `margin-left` |
| `--mp-steps-size-md-title-font-size` | Public | `var(--mp-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-steps-size-sm` | Public | `24px` | Local CSS<br>`height`, `left`, `line-height`, `margin-left`, `padding`, `padding-right`, `top`, `width` |
| `--mp-steps-size-sm-arrow` | Public | `40px` | Local CSS<br>`border-bottom`, `border-left`, `border-top`, `height`, `padding-left`, `right` |
| `--mp-steps-size-sm-description-font-size` | Public | `var(--mp-font-size-sm)` | Local CSS<br>`font-size` |
| `--mp-steps-size-sm-icon-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-steps-size-sm-item-icon-margin-left` | Public | `calc((var(--mp-steps-label-vertical-content-width) - var(--mp-steps-size-sm)) / 2)` | Local CSS<br>`left`, `margin-left` |
| `--mp-steps-size-sm-title-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-steps-transition-duration-1` | Public | `0.1s` | Local CSS<br>`transition` |
| `--mp-steps-transition-timing-function-linear` | Public | `cubic-bezier(0, 0, 1, 1)` | Local CSS<br>`transition` |
| `--mp-steps-vertical-item-min-height` | Public | `90px` | Local CSS<br>`min-height` |

## switch

Source: `src/switch/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-switch-disabled-opacity` | Public | `0.5` | Local CSS<br>`opacity` |
| `--mp-switch-duration` | Public | `var(--mp-sys-motion-duration-standard)` | Local CSS<br>`transition` |
| `--mp-switch-focus-width` | Public | `2px` | Local CSS<br>`outline`, `outline-offset` |
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
| `--mp-switch-track-active-background` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`background`, `outline` |
| `--mp-switch-track-background` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`background` |
| `--mp-switch-track-error-background` | Public | `var(--mp-sys-color-content-danger)` | Local CSS<br>`background`, `border-color` |
| `--mp-switch-width` | Public | `40px` | Local CSS<br>`min-width` |

## tabs

Source: `src/tabs/style/token.less`

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
| `--mp-tabs-title-text-color-active` | Public | `var(--mp-sys-color-content-brand)` | Local CSS<br>`background`, `color`, `outline` |
| `--mp-tabs-title-text-color-disabled` | Public | `var(--mp-sys-color-content-disabled)` | Local CSS<br>`color` |
| `--mp-tabs-touch-target` | Public | `var(--mp-sys-control-touch-target)` | Local CSS<br>`min-height`, `min-width` |

## tag

Source: `src/tag/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-tag-bg-not-checked-hover` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-tag-blue-bg` | Public | `rgb(var(--mp-blue-1))`<br>`rgba(var(--mp-blue-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-blue-bg-hover` | Public | `rgb(var(--mp-blue-2))`<br>`rgba(var(--mp-blue-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-blue-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-blue-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-blue-icon-color` | Public | `rgb(var(--mp-blue-9))` | Local CSS<br>`color` |
| `--mp-tag-blue-text-color` | Public | `rgb(var(--mp-blue-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-border-radius` | Public | `var(--mp-sys-radius-md)` | Local CSS<br>`border-radius` |
| `--mp-tag-border-type` | Public | `solid` | Local CSS<br>`border` |
| `--mp-tag-border-width` | Public | `1px` | Local CSS<br>`border`, `line-height` |
| `--mp-tag-brand-bg` | Public | `rgb(var(--mp-brand-1))`<br>`rgba(var(--mp-brand-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-brand-bg-hover` | Public | `rgb(var(--mp-brand-2))`<br>`rgba(var(--mp-brand-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-brand-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-brand-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-brand-icon-color` | Public | `rgb(var(--mp-brand-9))` | Local CSS<br>`color` |
| `--mp-tag-brand-text-color` | Public | `rgb(var(--mp-brand-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-close-font-size` | Public | `var(--mp-tag-size-md-font-size)` | Local CSS<br>`font-size` |
| `--mp-tag-close-margin-left` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`margin-left`, `margin-right` |
| `--mp-tag-custom-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |
| `--mp-tag-cyan-bg` | Public | `rgb(var(--mp-cyan-1))`<br>`rgba(var(--mp-cyan-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-cyan-bg-hover` | Public | `rgb(var(--mp-cyan-2))`<br>`rgba(var(--mp-cyan-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-cyan-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-cyan-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-cyan-icon-color` | Public | `rgb(var(--mp-cyan-9))` | Local CSS<br>`color` |
| `--mp-tag-cyan-text-color` | Public | `rgb(var(--mp-cyan-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-default-bg` | Public | `var(--mp-sys-color-state-hover)` | Local CSS<br>`background-color` |
| `--mp-tag-default-bg-hover` | Public | `var(--mp-color-fill-3)` | Local CSS<br>`background-color` |
| `--mp-tag-default-border-color` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-default-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-default-icon-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-tag-default-text-color` | Public | `var(--mp-sys-color-content-primary)` | Local CSS<br>`color` |
| `--mp-tag-fade-duration` | Public | `var(--mp-sys-motion-duration-fast)` | Local CSS<br>`transition` |
| `--mp-tag-gold-bg` | Public | `rgb(var(--mp-gold-1))`<br>`rgba(var(--mp-gold-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-gold-bg-hover` | Public | `rgb(var(--mp-gold-2))`<br>`rgba(var(--mp-gold-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-gold-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-gold-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-gold-icon-color` | Public | `rgb(var(--mp-gold-9))` | Local CSS<br>`color` |
| `--mp-tag-gold-text-color` | Public | `rgb(var(--mp-gold-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-gray-bg` | Public | `rgb(var(--mp-gray-2))`<br>`rgba(var(--mp-gray-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-gray-bg-hover` | Public | `rgb(var(--mp-gray-3))`<br>`rgba(var(--mp-gray-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-gray-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-gray-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-gray-icon-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-tag-gray-text-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-green-bg` | Public | `rgb(var(--mp-green-1))`<br>`rgba(var(--mp-green-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-green-bg-hover` | Public | `rgb(var(--mp-green-2))`<br>`rgba(var(--mp-green-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-green-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-green-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-green-icon-color` | Public | `rgb(var(--mp-green-9))` | Local CSS<br>`color` |
| `--mp-tag-green-text-color` | Public | `rgb(var(--mp-green-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-icon-margin-right` | Public | `var(--mp-sys-space-3)` | Local CSS<br>`margin-left`, `margin-right` |
| `--mp-tag-lime-bg` | Public | `rgb(var(--mp-lime-1))`<br>`rgba(var(--mp-lime-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-lime-bg-hover` | Public | `rgb(var(--mp-lime-2))`<br>`rgba(var(--mp-lime-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-lime-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-lime-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-lime-icon-color` | Public | `rgb(var(--mp-lime-9))` | Local CSS<br>`color` |
| `--mp-tag-lime-text-color` | Public | `rgb(var(--mp-lime-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-magenta-bg` | Public | `rgb(var(--mp-magenta-1))`<br>`rgba(var(--mp-magenta-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-magenta-bg-hover` | Public | `rgb(var(--mp-magenta-2))`<br>`rgba(var(--mp-magenta-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-magenta-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-magenta-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-magenta-icon-color` | Public | `rgb(var(--mp-magenta-9))` | Local CSS<br>`color` |
| `--mp-tag-magenta-text-color` | Public | `rgb(var(--mp-magenta-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-orange-bg` | Public | `rgb(var(--mp-orange-1))`<br>`rgba(var(--mp-orange-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-orange-bg-hover` | Public | `rgb(var(--mp-orange-2))`<br>`rgba(var(--mp-orange-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-orange-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-orange-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-orange-icon-color` | Public | `rgb(var(--mp-orange-9))` | Local CSS<br>`color` |
| `--mp-tag-orange-text-color` | Public | `rgb(var(--mp-orange-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-orangered-bg` | Public | `rgb(var(--mp-orangered-1))`<br>`rgba(var(--mp-orangered-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-orangered-bg-hover` | Public | `rgb(var(--mp-orangered-2))`<br>`rgba(var(--mp-orangered-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-orangered-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-orangered-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-orangered-icon-color` | Public | `rgb(var(--mp-orangered-9))` | Local CSS<br>`color` |
| `--mp-tag-orangered-text-color` | Public | `rgb(var(--mp-orangered-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-padding-horizontal` | Public | `10px` | Local CSS<br>`padding` |
| `--mp-tag-padding-vertical` | Public | `0` | Local CSS<br>`line-height`, `padding` |
| `--mp-tag-pinkpurple-bg` | Public | `rgb(var(--mp-pinkpurple-1))`<br>`rgba(var(--mp-pinkpurple-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-pinkpurple-bg-hover` | Public | `rgb(var(--mp-pinkpurple-2))`<br>`rgba(var(--mp-pinkpurple-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-pinkpurple-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-pinkpurple-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-pinkpurple-icon-color` | Public | `rgb(var(--mp-pinkpurple-9))` | Local CSS<br>`color` |
| `--mp-tag-pinkpurple-text-color` | Public | `rgb(var(--mp-pinkpurple-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-purple-bg` | Public | `rgb(var(--mp-purple-1))`<br>`rgba(var(--mp-purple-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-purple-bg-hover` | Public | `rgb(var(--mp-purple-2))`<br>`rgba(var(--mp-purple-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-purple-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-purple-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-purple-icon-color` | Public | `rgb(var(--mp-purple-9))` | Local CSS<br>`color` |
| `--mp-tag-purple-text-color` | Public | `rgb(var(--mp-purple-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-red-bg` | Public | `rgb(var(--mp-red-1))`<br>`rgba(var(--mp-red-6), 0.2)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-red-bg-hover` | Public | `rgb(var(--mp-red-2))`<br>`rgba(var(--mp-red-6), 0.35)` (`:root[maple-theme="dark"]`) | Local CSS<br>`background-color` |
| `--mp-tag-red-border-color` | Public | `transparent` | Local CSS<br>`border` |
| `--mp-tag-red-border-color-hover` | Public | `transparent` | Local CSS<br>`border-color` |
| `--mp-tag-red-icon-color` | Public | `rgb(var(--mp-red-9))` | Local CSS<br>`color` |
| `--mp-tag-red-text-color` | Public | `rgb(var(--mp-red-9))` | Local CSS<br>`border-color`, `color` |
| `--mp-tag-round-radius` | Public | `100px` | Local CSS<br>`border-radius` |
| `--mp-tag-size-lg` | Public | `36px` | Local CSS<br>`height`, `line-height` |
| `--mp-tag-size-lg-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-tag-size-md` | Public | `32px` | Local CSS<br>`height`, `line-height` |
| `--mp-tag-size-md-font-size` | Public | `var(--mp-sys-font-size-md)` | Local CSS<br>`font-size` |
| `--mp-tag-size-sm` | Public | `28px` | Local CSS<br>`height`, `line-height` |
| `--mp-tag-size-sm-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-tag-size-xl` | Public | `40px` | Local CSS<br>`height`, `line-height` |
| `--mp-tag-size-xl-font-size` | Public | `var(--mp-sys-font-size-lg)` | Local CSS<br>`font-size` |
| `--mp-tag-size-xs` | Public | `24px` | Local CSS<br>`height`, `line-height` |
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

## textarea

Source: `src/textarea/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-textarea-counter-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |
| `--mp-textarea-counter-font-size` | Public | `var(--mp-sys-font-size-xs)` | Local CSS<br>`font-size` |
| `--mp-textarea-counter-margin-top` | Public | `var(--mp-sys-space-2)` | Local CSS<br>`margin-top` |
| `--mp-textarea-font-size` | Public | `16px` | Local CSS<br>`font-size` |
| `--mp-textarea-height` | Public | `auto` | Local CSS<br>`height` |
| `--mp-textarea-line-height` | Public | `1.5` | Local CSS<br>`line-height` |
| `--mp-textarea-min-height` | Public | `96px` | Local CSS<br>`min-height` |
| `--mp-textarea-padding-horizontal` | Public | `0` | Local CSS<br>`padding` |
| `--mp-textarea-padding-vertical` | Public | `0` | Local CSS<br>`padding` |
| `--mp-textarea-placeholder-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |

## time-range

Source: `src/time-range/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-time-range-picker-next-day-color` | Public | `var(--mp-sys-color-content-secondary)` | Local CSS<br>`color` |

## tooltip

Source: `src/tooltip/style/token.less`

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
| `--mp-tooltip-status-danger-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-tooltip-status-info-background` | Public | `var(--mp-sys-color-status-info)` | Local CSS<br>`background-color` |
| `--mp-tooltip-status-info-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-tooltip-status-primary-background` | Public | `var(--mp-sys-color-action-primary)` | Local CSS<br>`background-color` |
| `--mp-tooltip-status-primary-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-tooltip-status-success-background` | Public | `var(--mp-sys-color-status-success)` | Local CSS<br>`background-color` |
| `--mp-tooltip-status-success-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-tooltip-status-warning-background` | Public | `var(--mp-sys-color-status-warning)` | Local CSS<br>`background-color` |
| `--mp-tooltip-status-warning-text-color` | Public | `var(--mp-sys-color-content-on-bright)` | Local CSS<br>`color` |
| `--mp-tooltip-text-color` | Public | `var(--mp-sys-color-content-on-dark)` | Local CSS<br>`color` |

## trigger

Source: `src/trigger/style/token.less`

| Variable | Layer | Declaration / condition | Consumer / CSS properties |
| --- | --- | --- | --- |
| `--mp-trigger-arrow-background` | Public | `var(--mp-sys-color-surface-overlay)` | Local CSS<br>`background-color` |
| `--mp-trigger-arrow-radius` | Public | `var(--mp-sys-radius-sm)` | Local CSS<br>`border-radius` |
| `--mp-trigger-arrow-size` | Public | `var(--mp-sys-space-4)` | Local CSS<br>`height`, `width` |
| `--mp-trigger-transition-duration` | Public | `var(--mp-sys-motion-duration-fast)` | Local CSS<br>`transition` |
| `--mp-trigger-transition-easing` | Public | `var(--mp-sys-motion-easing-standard)` | Local CSS<br>`transition` |
