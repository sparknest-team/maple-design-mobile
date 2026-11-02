# Popup

Mobile modal surface entering from the top, bottom, left, right, or center. Popup shares its modal controller with Cedar Drawer while retaining mobile safe-area and transition presentation.

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

## Positioning and overlay

### Placement

```demo
../example/demos/popup-position.vue
```

### Overlay style

```demo
../example/demos/overlay-style.vue
```

## Events and motion

### Events


```demo
../example/demos/event.vue
```

### Motion duration

```demo
../example/demos/motion-token.vue
```

## Loading and waiting

### Controlled loading

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Explicit business loading state | `boolean` | `false` |

External loading blocks close/switch requests; internal before-hook waiting is merged for display.


Set loading explicitly to display feedback. Ordinary event return values do not drive loading. Before hooks retain their documented pending behavior.

```demo
../example/demos/loading.vue
```

## API

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model:open` | Visible state | `boolean` | - |
| `default-open` | Whether to display by default in uncontrolled mode | `boolean` | `false` |
| `placement` | Panel region at a container edge or center, default center. It is not trigger-relative and does not automatically flip | `'top' \| 'bottom' \| 'right' \| 'left' \| 'center'` | `'center'` |
| `overlay` | Show the overlay | `boolean` | `true` |
| `overlay-class` / `overlay-style` | Overlay class and style | `string / object` | - |
| `overlay-closable` | Close after an overlay click | `boolean` | `true` |
| `transition` | Content transition name | `string` | Derived from placement |
| `overlay-animation-name` | Overlay transition name | `string` | `mp-fade` |
| `unstyled` | Remove the default background, text color and elevation | `boolean` | `false` |
| `lock-scroll` | Lock scrolling on the host | `boolean` | `true` |
| `esc-to-close` | Close on Escape | `boolean` | `true` |
| `close-on-route-change` | Close after a route change | `boolean` | `false` |
| `unmount-on-close` | False mounts and preserves content even when initially closed; true unmounts after leaving | `boolean` | `false` |
| `popup-container` | Portal container | `string \| HTMLElement \| false` | `body` |
| `safe-area-inset-bottom` | Apply the bottom safe-area inset | `boolean` | `false` |
| `safe-area-inset-top` | Apply the top safe-area inset | `boolean` | `false` |
| `z-index` | Custom z-index | `number` | Automatically distributed |

Events: `update:open`, `open`, `opened`, `close`, `closed`, `click-overlay(MouseEvent)`, and `key-escape(KeyboardEvent)`.

`placement` describes popup position relative to its container; `direction` still controls internal content layout. `route-change` is no longer a lifecycle event; enable `close-on-route-change` explicitly to close on navigation.

### Style variables

| Variable | Default |
| --- | --- |
| `--mp-popup-overlay-background-color` | `var(--mp-sys-color-scrim)` |
| `--mp-popup-content-background-color` | `var(--mp-sys-color-surface-raised)` |
| `--mp-popup-content-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-popup-transition-duration` | `250ms` |
| `--mp-popup-transition-timing-function` | `ease` |

Scrim variables dim only the background. Content background/text form a raised-surface color pair, with dark themes inheriting the same semantics. `unstyled` disables default background/text colors together. style sets content variables, overlay-style scrim variables, or place system variables on an actual common ancestor. Teleport does not inherit from the original call site. Dialog uses independent scrim variables unaffected by Popup variables.

### Focus management

Built-in fade, center scaling, four-direction pop and base content/scrim transitions consume duration/timing-function tokens, retaining 250ms/ease defaults. Whole-layer overrides belong on the actual post-Teleport common ancestor or popup-container host. style affects content only; overlay-style affects scrim only. Use valid nonnegative CSS times. prefers-reduced-motion: reduce overrides built-in transitions/initial displacement/scaling. Business code adapts custom animations. Compilation checks or explicit 0ms are not real OS-preference validation.

With unmount-on-close=true, content remains during closing and unmounts after completion; close locks are not released early. Rapid reopening cancels closing and retains slot state. opened/closed fire once per valid phase, never after destruction. No fixed 250ms JS timer is used. Initial opening retains mounted notification without promising complete appear timing. Business code must coordinate custom transitions or differing inner/outer durations.

Opening focuses the actual dialog panel. Tab/Shift+Tab cycle through available controls, skipping hidden/disabled elements. The topmost nested popup owns focus handling; closing restores its opener. Applications must retain trigger nodes and must not override internal focus-root markers.

### Landscape safe areas

`safe-area-inset-left` / `safe-area-inset-right` (boolean, default false) complement the existing top/bottom flags. Native overrides and nested consumption follow [SafeArea](#/en-US/safe-area).

### Closing by pulling the header

Enable `swipe-to-close` for bottom popups and mark draggable header areas with `data-popup-swipe-handle`. It is off by default and inactive at other placements. `swipe-threshold` defaults to 40 layout CSS px, including under parent scaling. Closing requests `update:open(false)` and emits `swipe-close(PointerEvent)` only if final movement is downward and reaches the threshold. Small/horizontal/canceled gestures, buttons/inputs and body scrolling do not close. Rejected controlled requests retain the popup and restore its position. Existing Esc/scrim/close controls remain.

```html
<mp-popup v-model:open="open" placement="bottom" swipe-to-close>
  <header data-popup-swipe-handle>Edit information</header>
  <main>Popup content</main>
</mp-popup>
```

Maple field editors allow dragging blank header areas to cancel drafts by default; pending asynchronous confirmation disables gestures. ActionSheet can explicitly set swipe-to-close/swipe-threshold; default titles are marked, while custom title slots must mark their own drag area.
# Asynchronous close interception


Reasons: `overlay`, `escape`, `route`, `swipe`, `close`, `api`, `model`. The default slot provides `{ close, pending }`; `close` buttons should call `close('close', event)`. Instance `close()` uses `api`; `requestClose(reason, event)` specifies a reason and returns `Promise<boolean>`. External `open`=`false` uses `model`; rejection emits `update:open(true)`, which controlled parents should accept. Only enabled `close` entries request closing.

Direct destruction, removing `v-if` or destroying a route page is not a close request and cannot await internal guards. Await `requestClose()` before those parent actions. Keep business confirmation in `beforeCommit`; a close guard does not replace validation. The theme page's complete form demonstrates delayed allowance/rejection/errors and all close entries.

## before hooks and done compatibility



Synchronous logging-only hooks must explicitly return true; synchronous undefined means awaiting a callback. Earlier `Promise<void>` hooks without done now allow closing when their Promise resolves.

Popup reasons: overlay, escape, route, swipe, close, api, model. Rejecting external open=false requests update:open(true). Direct destruction cannot await hooks; await requestClose() first.


Cancellable hooks use `(payload, done, context)`: closure payloads contain `{ action }`, change/commit payloads contain `{ value, previousValue }`, and Popup uses `{ reason }`. Context provides `signal` and an optional original `event`. Return a boolean/Promise, or call done()/done(false). Synchronous void waits for done; Promise&lt;void&gt; allows the operation. First completion wins. Pending state controls loading/disabled automatically. Cancellation invalidates stale results. Button refs are not exposed.

### Before-hook waiting feedback

Before-hook waits show visible feedback and aria-busy. Rejected or failed operations recover; duplicate submissions do not start another copy. Notification event Promises never drive loading.
