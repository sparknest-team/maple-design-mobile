# Message

duration controls display time; 0 keeps the message open, and only finite positive values schedule automatic closing. Hover preserves remaining time. KeepAlive reactivation starts a full configured duration, while deactivation or unmounting cancels the old timer.

### Description

Displays lightweight, nonmodal global feedback without locking scrolling or blocking page interaction.

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
- Local reduced motion cancels transitions/displacement while retaining independent-message static horizontal/center positioning, colors and display deadlines. No global tiny-duration fallback is required.
- Queues isolate by `popupContainer + position`; `Message.clear(position?)` clears per position.

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Content, icons and close-button spacing follow reading order. Direction changes do not alter message type, timers or closing. Programmatic calls use explicit configuration or document direction.

## Usage notes

### Component attribute forwarding

`Message.Component` forwards `id`, `class`, `style`, `aria-*` and native event listeners to its actual `role="alert"` region: the Cedar message root or the Maple inner visible panel. Each attribute is applied once. Required internal roles and classes remain; component lifecycle listeners such as `open` are not bound as DOM listeners. Native attributes update with the parent in both inline and Teleport modes. `dir` continues to determine reading direction. A function service `id` identifies the message for updates and is separate from a component native DOM `id`.
### Configuration

Visual variant is independent of status. neutral uses a neutral popup and status icon; tonal uses a low-emphasis status background with dark content; solid uses a high-emphasis fill and matching foreground. Cedar/Maple both default to neutral; explicit solid/tonal have matching visual semantics. default/loading solid retains a dark background, with the loading icon indicating progress. Both export MessageVariant; function calls, setDefaultOptions and same-id updates support variant.

Exceptions from close/closed notification callbacks do not retain closed entries or empty manager hosts. Resource cleanup is independent of callback execution.

## API

### Message Options

| Prop | Description | Type | Default |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------ | --------------- |
| `open` | Controlled visibility Supports `v-model:open`. | `boolean` | `false` |
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

### Message Events

`update:open`, `open`, `opened`, `close`, and `closed`, emitted once per visibility cycle. When an initially open message hydrates, it skips the initial enter animation and emits `opened` after `open` on mount.

### Message Methods

| Method | Description |
| ------------------------------------------------- | ------------------------ |
| `Message(options \| string)` | Open a default message |
| `Message.info/success/warning/error/loading(...)` | Open a message with the corresponding status |
| `Message.clear(position?)` | Clear all messages or a specified position |
| `Message.setDefaultOptions(options)` | Set defaults for subsequent calls |
| `Message.resetDefaultOptions()` | Restore defaults |

Returns `{ close() }`; repeated calls do not repeat closing. A handle owns a specific message item: it remains valid for same-id updates of that item, but cannot close a new item after the old item completed leaving and its id was reused.

The optional second appContext argument applies to each message: injections, registered components, global properties and error handling use that application context. It does not capture a local Provider at the call site. Applications still share one queue and chronological stack per target/position; Message.clear continues clearing across applications. Each call uses its explicit context, then the current install default. An update with no available context retains the existing item scope. Switching a same-id item to another available context remounts its presentation and restarts its duration while keeping its business handle valid; other items keep their presentation and timers.

`Message.Component` retains its real Props and instance types. Its `restartTimer()` instance method resets only while active, open and resetOnUpdate=true. It is not a service-handle method; while hover-paused, it resets only the saved remaining duration.

| Component instance method | Description |
| ---- | ---- |
| restartTimer() | Reset the current duration, subject to active, open, resetOnUpdate and hover-pause state |

`MessageContent` is `VNodeChild | (() => VNodeChild)`: text, numbers, empty boolean children, VNodes, nested child arrays and synchronous render functions. Arbitrary plain objects and asynchronous tasks are not renderable content. content, icon and action share this protocol; local slots take precedence.

duration must be finite and nonnegative. Negative values, NaN and Infinity do not schedule automatic closure and trigger development prop validation. Zero stays open; restartTimer follows the same rules.

### Message Slots

`default`、`icon`、`action`。


Messages automatically stay above active popups in the current document and track newly opened popups and explicit `zIndex` changes. They do not take over dialog focus or Esc handling. `--mp-message-z-index` sets the minimum message stacking level. Custom mount containers must still avoid ancestor stacking contexts and clipping constraints.

## CSS Variables

Colors use `--mp-message-{variant}-{status}-{bg|content-color|icon-color|border-color|close-color}`. bg sets the panel; content-color sets body/actions without separate styling; icon-color sets status icons; border-color sets borders; close-color sets close buttons. Custom backgrounds require checking all three foregrounds. Geometry retains platform density. Variables must affect actual Teleport-container ancestors.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-message-action-margin` | `0 8px` | `margin` |
| `--mp-message-border-radius` | `4px` | `border-radius` |
| `--mp-message-box-shadow` | `0 4px 12px rgba(0, 0, 0, 0.2)` | `box-shadow` |
| `--mp-message-close-border-radius` | `50%` | `border-radius` |
| `--mp-message-close-margin-right` | `4px` | `margin-inline-end` |
| `--mp-message-close-size` | `32px` | `height`, `width` |
| `--mp-message-content-padding` | `14px 16px` | `padding` |
| `--mp-message-focus-outline-offset` | `-4px` | `outline-offset` |
| `--mp-message-focus-outline-width` | `2px` | `outline` |
| `--mp-message-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-message-icon-font-size` | `20px` | `font-size` |
| `--mp-message-icon-margin` | `0 8px` | `margin` |
| `--mp-message-margin` | `6px 24px` | `margin` |
| `--mp-message-neutral-danger-bg` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-message-neutral-danger-border-color` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-message-neutral-danger-close-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-message-neutral-danger-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-neutral-danger-icon-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-message-neutral-default-bg` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-message-neutral-default-border-color` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-message-neutral-default-close-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-message-neutral-default-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-neutral-default-icon-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-neutral-info-bg` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-message-neutral-info-border-color` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-message-neutral-info-close-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-message-neutral-info-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-neutral-info-icon-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-message-neutral-loading-bg` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-message-neutral-loading-border-color` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-message-neutral-loading-close-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-message-neutral-loading-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-neutral-loading-icon-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-message-neutral-success-bg` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-message-neutral-success-border-color` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-message-neutral-success-close-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-message-neutral-success-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-neutral-success-icon-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-message-neutral-warning-bg` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-message-neutral-warning-border-color` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-message-neutral-warning-close-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-message-neutral-warning-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-neutral-warning-icon-color` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-message-solid-danger-bg` | `var(--mp-sys-color-status-danger)` | `background-color` |
| `--mp-message-solid-danger-border-color` | `transparent` | `border-color` |
| `--mp-message-solid-danger-close-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-solid-danger-content-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-solid-danger-icon-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-solid-default-bg` | `#333` | `background-color` |
| `--mp-message-solid-default-border-color` | `transparent` | `border-color` |
| `--mp-message-solid-default-close-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-message-solid-default-content-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-message-solid-default-icon-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-message-solid-info-bg` | `var(--mp-sys-color-status-info)` | `background-color` |
| `--mp-message-solid-info-border-color` | `transparent` | `border-color` |
| `--mp-message-solid-info-close-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-solid-info-content-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-solid-info-icon-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-solid-loading-bg` | `#333` | `background-color` |
| `--mp-message-solid-loading-border-color` | `transparent` | `border-color` |
| `--mp-message-solid-loading-close-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-message-solid-loading-content-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-message-solid-loading-icon-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-message-solid-success-bg` | `var(--mp-sys-color-status-success)` | `background-color` |
| `--mp-message-solid-success-border-color` | `transparent` | `border-color` |
| `--mp-message-solid-success-close-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-solid-success-content-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-solid-success-icon-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-solid-warning-bg` | `var(--mp-sys-color-status-warning)` | `background-color` |
| `--mp-message-solid-warning-border-color` | `transparent` | `border-color` |
| `--mp-message-solid-warning-close-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-solid-warning-content-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-solid-warning-icon-color` | `var(--mp-sys-color-content-on-bright)` | `color` |
| `--mp-message-tonal-danger-bg` | `var(--mp-color-danger-light-1)` | `background-color` |
| `--mp-message-tonal-danger-border-color` | `transparent` | `border-color` |
| `--mp-message-tonal-danger-close-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-danger-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-danger-icon-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-message-tonal-default-bg` | `var(--mp-sys-color-surface-muted)` | `background-color` |
| `--mp-message-tonal-default-border-color` | `transparent` | `border-color` |
| `--mp-message-tonal-default-close-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-default-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-default-icon-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-info-bg` | `rgba(var(--mp-blue-6), 0.12)` | `background-color` |
| `--mp-message-tonal-info-border-color` | `transparent` | `border-color` |
| `--mp-message-tonal-info-close-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-info-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-info-icon-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-message-tonal-loading-bg` | `var(--mp-color-primary-light-1)` | `background-color` |
| `--mp-message-tonal-loading-border-color` | `transparent` | `border-color` |
| `--mp-message-tonal-loading-close-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-loading-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-loading-icon-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-message-tonal-success-bg` | `var(--mp-color-success-light-1)` | `background-color` |
| `--mp-message-tonal-success-border-color` | `transparent` | `border-color` |
| `--mp-message-tonal-success-close-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-success-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-success-icon-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-message-tonal-warning-bg` | `var(--mp-color-warning-light-1)` | `background-color` |
| `--mp-message-tonal-warning-border-color` | `transparent` | `border-color` |
| `--mp-message-tonal-warning-close-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-warning-content-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-message-tonal-warning-icon-color` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-message-transition-distance` | `-12px` | `transform` |
| `--mp-message-transition-duration` | `150ms` | `transition` |
| `--mp-message-transition-timing-function` | `var(--mp-cubic-bezier)` | `transition` |
| `--mp-message-viewport-padding` | `24px` | `max-width` |
| `--mp-message-width` | `256px` | `width` |
| `--mp-message-wrapper-margin-bottom` | `5%` | `bottom` |
| `--mp-message-wrapper-margin-top` | `5%` | `top` |
| `--mp-message-z-index` | `2000` | `z-index` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-message-border-radius: 4px;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
