# Message

Display duration is a business deadline, not CSS enter/leave time. Zero is persistent; only finite positive values schedule auto-close. Hover preserves remaining time; KeepAlive activation restarts the full configured deadline, while suspension/disposal invalidate old timers. The2026-10-15 reconciliation confirms the existing audited source hash and adds business-clock classification only. Current39 tests do not add native-browser acceptance or certify service nextTick update identity/cross-document adoption.

### Description

Message provides lightweight, non-modal global feedback. Maple and Cedar share the same public contract, queue, timer, and imperative service while keeping separate source copies and platform-specific styling. Message never locks scrolling or blocks background interaction.

## Basic examples

### Function Calls

```demo
../example/demos/function-call.vue
```

## Appearance and states

### Statuses

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `variant` | Visual emphasis | Appearance combinations |
| `status` | Semantic status | Appearance combinations |
<!-- demo-config-notes:end -->


The standard statuses are `default / info / success / warning / danger / loading`. The convenience method is named `error`, while the component receives `status="danger"`. Call `Message(...)` for a default message; there is no `normal` alias.

```demo
../example/demos/type.vue
```

### Visual variants

Visual emphasis is independent of status: neutral uses an overlay surface and status icon; tonal uses a subtle status background; solid uses a strong status fill and paired foreground. Cedar and Maple both default to neutral. Explicit solid / tonal variants share the same color contract. Solid default/loading retain a dark surface. MessageVariant is exported; imperative calls, default options and same-id updates accept variant.

```demo
../example/demos/variant.vue
```

### Appearance combinations

Use this example for immediate feedback after an action. Adjust variant, status and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

## Content and presentation

### Component Usage

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `position` | Region of the message itself in the viewport: top/center/bottom, default top. Not positioned relative to a trigger | Component Usage |
| `duration` | Auto-close duration in ms; `0` disables automatic closing | Component Usage |
| `closable` | Show the close button | Component Usage |
| `status` | Semantic status | Component Usage |
<!-- demo-config-notes:end -->


```demo
../example/demos/component-call.vue
```

## Behavior

- `duration` is milliseconds; `0` stays open. `Message.loading(...)` stays open by default.
- Within one mount container/position, the same `id` updates the instance without duplicate DOM.
- Only `resetOnUpdate`=`true` restarts the full duration on same-id updates.
- `pauseOnHover` saves remaining time and resumes it on pointer leave.
- Display deadlines are independent of CSS motion. Restarting, hover pause, cleanup/unmount invalidate old timer callbacks, which recheck open before running.
- KeepAlive deactivation cancels timers; reactivation restarts the current full duration. Updates while deactivated/retained restart after unmount do not schedule work.
- Resuming exhausted positive hover timing requests closing; resetting duration to 0 keeps it open. Only finite positive durations auto-close; negative/nonfinite values do not schedule.
- Services await actual leave completion rather than forcing 150ms/200ms exits. Closing/clearing before mount cleans up directly and reports service onClosed without inventing component open/opened/close animation events. Business duration stays independent of CSS transitions.
- Actual IAB default/light/top service checks passed for defaults, 600ms, zero and reopening during leave. Reopening may replace root DOM. Other themes/positions, hover, KeepAlive and real OS preferences need separate validation.
- Local reduced motion cancels transitions/displacement while retaining independent-message static horizontal/center positioning, colors and display deadlines. No global tiny-duration fallback is required. Isolated Less checks are not real OS validation.
- Queues isolate by `popupContainer + position`; `Message.clear(position?)` clears per position.

## Reading direction

Inherits the nearest `dir="ltr|rtl"` and supports runtime and nested overrides. Content, icon and close gaps follow reading direction. Direction changes preserve message type, timing and close semantics. Imperative calls use explicit or document direction.

## API

### Props / MessageOptions

| Arguments | Description | Type | Default |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------ | --------------- |
| `open` / `v-model:open` | Controlled visibility | `boolean` | `false` |
| `id` | Unique id in one queue | `string \| number` | Automatically generated |
| `status` | Semantic status | `default \| info \| success \| warning \| danger \| loading` | `default` |
| variant | Visual emphasis | `neutral \| tonal \| solid` | `neutral` |
| `position` | Region of the message itself in the viewport: top/center/bottom, default top. Not positioned relative to a trigger | `top \| center \| bottom` | `top` |
| `content` | Content | `MessageContent` | - |
| `icon` | Custom icon | `MessageContent` | - |
| `action` | Actions | `MessageContent` | - |
| `duration` | Auto-close duration in ms; `0` disables automatic closing | `number` | `3000` |
| `showIcon` | Whether to show the status icon | `boolean` | `true` |
| `closable` | Show the close button | `boolean` | `false` |
| `pauseOnHover` | Pause while hovered | `boolean` | `false` |
| `resetOnUpdate` | Restart duration after an id update | `boolean` | `false` |
| `closeButtonAriaLabel` | Close button label | `string` | `Close message` |
| `popupContainer` | Portal container | `string \| HTMLElement \| false` | `body` |

Function options additionally accept `onOpen / onOpened / onClose / onClosed`. Close callbacks receive the current `id`.

### Events

`update:open`, `open`, `opened`, `close`, and `closed`, emitted once per visibility cycle.

### Methods

| Method | Description |
| ------------------------------------------------- | ------------------------ |
| `Message(options \| string)` | Open a default message |
| `Message.info/success/warning/error/loading(...)` | Open a message with the corresponding status |
| `Message.clear(position?)` | Clear all messages or a specified position |
| `Message.setDefaultOptions(options)` | Set defaults for subsequent calls |
| `Message.resetDefaultOptions()` | Restore defaults |

Returns `{ close() }`. Repeated `close()` calls do not duplicate closing lifecycle events.

### Slots

`default`、`icon`、`action`。

## Public CSS variables

Visual variant is independent of status. neutral uses a neutral popup and status icon; tonal uses a low-emphasis status background with dark content; solid uses a high-emphasis fill and matching foreground. Cedar/Maple both default to neutral; explicit solid/tonal have matching visual semantics. default/loading solid retains a dark background, with the loading icon indicating progress. Both export MessageVariant; function calls, setDefaultOptions and same-id updates support variant.

Colors use `--mp-message-{variant}-{status}-{bg|content-color|icon-color|border-color|close-color}`. bg sets the panel; content-color sets body/actions without separate styling; icon-color sets status icons; border-color sets borders; close-color sets close buttons. Custom backgrounds require checking all three foregrounds. Geometry retains platform density. Variables must affect actual Teleport-container ancestors.

| Variable | Default |
| --- | --- |
| `--mp-message-viewport-padding` | `24px` |
| `--mp-message-wrapper-margin-top` | `5%` |
| `--mp-message-wrapper-margin-bottom` | `5%` |
| `--mp-message-z-index` | `2000` |
| `--mp-message-box-shadow` | `0 4px 12px rgba(0, 0, 0, 0.2)` |
| `--mp-message-icon-font-size` | `20px` |
| `--mp-message-close-size` | `32px` |
| `--mp-message-close-margin-right` | `4px` |
| `--mp-message-close-border-radius` | `50%` |
| `--mp-message-focus-outline-width` | `2px` |
| `--mp-message-focus-outline-offset` | `-4px` |
| `--mp-message-transition-distance` | `-12px` |
| `--mp-message-transition-duration` | `150ms` |
| `--mp-message-transition-timing-function` | `var(--mp-cubic-bezier)` |
| `--mp-message-neutral-default-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-default-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-default-icon-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-default-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-default-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-neutral-info-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-info-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-info-icon-color` | `var(--mp-sys-color-content-info)` |
| `--mp-message-neutral-info-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-info-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-neutral-success-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-success-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-success-icon-color` | `var(--mp-sys-color-content-success)` |
| `--mp-message-neutral-success-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-success-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-neutral-warning-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-warning-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-warning-icon-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-message-neutral-warning-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-warning-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-neutral-danger-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-danger-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-danger-icon-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-message-neutral-danger-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-danger-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-neutral-loading-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-loading-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-loading-icon-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-message-neutral-loading-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-loading-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-tonal-default-bg` | `var(--mp-sys-color-surface-muted)` |
| `--mp-message-tonal-default-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-default-icon-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-default-border-color` | `transparent` |
| `--mp-message-tonal-default-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-info-bg` | `rgba(var(--mp-blue-6), 0.12)` |
| `--mp-message-tonal-info-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-info-icon-color` | `var(--mp-sys-color-content-info)` |
| `--mp-message-tonal-info-border-color` | `transparent` |
| `--mp-message-tonal-info-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-success-bg` | `var(--mp-color-success-light-1)` |
| `--mp-message-tonal-success-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-success-icon-color` | `var(--mp-sys-color-content-success)` |
| `--mp-message-tonal-success-border-color` | `transparent` |
| `--mp-message-tonal-success-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-warning-bg` | `var(--mp-color-warning-light-1)` |
| `--mp-message-tonal-warning-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-warning-icon-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-message-tonal-warning-border-color` | `transparent` |
| `--mp-message-tonal-warning-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-danger-bg` | `var(--mp-color-danger-light-1)` |
| `--mp-message-tonal-danger-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-danger-icon-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-message-tonal-danger-border-color` | `transparent` |
| `--mp-message-tonal-danger-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-loading-bg` | `var(--mp-color-primary-light-1)` |
| `--mp-message-tonal-loading-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-loading-icon-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-message-tonal-loading-border-color` | `transparent` |
| `--mp-message-tonal-loading-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-solid-default-bg` | `#333` |
| `--mp-message-solid-default-content-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-solid-default-icon-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-solid-default-border-color` | `transparent` |
| `--mp-message-solid-default-close-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-solid-info-bg` | `var(--mp-sys-color-status-info)` |
| `--mp-message-solid-info-content-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-info-icon-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-info-border-color` | `transparent` |
| `--mp-message-solid-info-close-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-success-bg` | `var(--mp-sys-color-status-success)` |
| `--mp-message-solid-success-content-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-success-icon-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-success-border-color` | `transparent` |
| `--mp-message-solid-success-close-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-warning-bg` | `var(--mp-sys-color-status-warning)` |
| `--mp-message-solid-warning-content-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-warning-icon-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-warning-border-color` | `transparent` |
| `--mp-message-solid-warning-close-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-danger-bg` | `var(--mp-sys-color-status-danger)` |
| `--mp-message-solid-danger-content-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-danger-icon-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-danger-border-color` | `transparent` |
| `--mp-message-solid-danger-close-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-loading-bg` | `#333` |
| `--mp-message-solid-loading-content-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-solid-loading-icon-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-solid-loading-border-color` | `transparent` |
| `--mp-message-solid-loading-close-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-width` | `256px` |
| `--mp-message-border-radius` | `4px` |
| `--mp-message-font-size` | `var(--mp-font-size-md)` |
| `--mp-message-margin` | `6px 24px` |
| `--mp-message-content-padding` | `14px 16px` |
| `--mp-message-action-margin` | `0 8px` |
| `--mp-message-icon-margin` | `0 8px` |

A throwing close/closed notification cannot retain the closed item or its empty manager host. Resources are released independently of notification callbacks.
