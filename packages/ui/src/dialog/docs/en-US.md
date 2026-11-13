# Dialog

With `draggable` enabled, title inputs, textareas, buttons, links with href and editable content retain native pointer behavior and do not start a drag. The ordinary title area remains draggable. In non-centered mode, numeric `top=0` is supported just like the string `0px`.

### Description

Use `<mp-dialog>` for component usage and explicit `Dialog.*` methods for functional usage. Both forms share one configuration model. Callable `Dialog(...)` is not supported.


The sections below follow the same order as the controls in the mobile preview.

## Basic examples

### Basic Usage

Component dialogs show the top-right close button by default.

```demo
../example/demos/basic-usage.vue
```

## Invocation and content

### Function Calls

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Title | confirm box、type icon、form dialog |
| `type` | Semantic icon | confirm box、type icon |
| `message` | Message content; the default slot is also supported | confirm box、type icon |
| `before-close` | Return a boolean/Promise or call done; the first completion wins | form dialog |
<!-- demo-config-notes:end -->


```demo
../example/demos/function-call.vue
```

### Alert Dialog

```demo
../example/demos/alert-dialog.vue
```

### Confirm Box


The component version uses the same `type="warning"`.

```demo
../example/demos/confirm-box.vue
```

### Semantic Messages

```demo
../example/demos/type-icon.vue
```

### Dialog Form

Use a component dialog for complex forms and validate from `before-close`.

```demo
../example/demos/form-dialog.vue
```

### Programmatic dialog target

```demo
../example/demos/service-container.vue
```

## Sizing and layout

### Dialog sizing and long content

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `width` | Width | Dialog sizing and long content |
| `title` | Title | Dialog sizing and long content |
| `message` | Message content; the default slot is also supported | Dialog sizing and long content |
| `simple` | Compact layout | Dialog sizing and long content |
| `draggable` | Allow dragging; ineffective in `fullscreen` mode | Dialog sizing and long content |
| `fullscreen` | Fullscreen display | Dialog sizing and long content |
<!-- demo-config-notes:end -->


Open one dialog at a time to compare widths, fullscreen layouts and long-content boundaries.

<details>
<summary>Configuration details and limits</summary>

#### Layout

The preview demonstrates custom width, simple, draggable, and fullscreen dialogs in this order.

</details>

```demo
../example/demos/size-comparison.vue
```

## Interaction and customization

### Dragging sessions

```demo
../example/demos/draggable.vue
```

### Custom Footer

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Title | Custom Button Text, Advanced Props |
| `message` | Message content; the default slot is also supported | Custom Button Text, Advanced Props |
| `type` | Semantic icon | Advanced Props |
| `footer` | Show footer | Advanced Props |
| `hide-title` | Hide the title area | Advanced Props |
| `aria-label` | Accessible name without a visible title | Advanced Props |
<!-- demo-config-notes:end -->


```demo
../example/demos/custom-footer.vue
```

### Header and footer dividers

Open the panel and toggle the two switches independently. Both dividers start off.

```demo
../example/demos/dividers.vue
```

### Custom Button Text

The confirm button defaults to Button's `primary` status and solid `default` variant. The cancel button uses the `default` status and `outline` variant. Override either through `confirmButtonProps` or `cancelButtonProps`.

```demo
../example/demos/custom-button-text.vue
```

### Advanced Props

The preview demonstrates hidden footer, hidden title, custom body, and unmount-on-close behavior.

```demo
../example/demos/advanced-props.vue
```

## Async actions and closing

### Async Close

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `before-close` | Return a boolean/Promise or call done; the first completion wins | Async close, before hooks and callback compatibility |
| `title` | Title | async close |
| `message` | Message content; the default slot is also supported | async close |
<!-- demo-config-notes:end -->


`beforeClose` supports boolean/Promise results and the existing done callback. Functional calls default to `simple: true` and `closable: false`.



```demo
../example/demos/async-close.vue
```

### Before hooks and callback compatibility

`beforeClose({ action }, done, context)` is the only hook entry. No new closeGuard/confirmGuard/cancelGuard prop is introduced.


A before hook that only logs synchronously must explicitly return true; synchronous undefined means callback completion is still pending. Old async callbacks that returned `Promise<void>` without calling done now complete on Promise resolution.


```demo
../example/demos/en-US/guard-protocol.vue
```


Promise and done share a single completion state: false/done(false) rejects; true/done() allows; a resolved Promise&lt;void&gt; allows. The first completion wins. Errors emit guard-error; cancellation/unmount invalidates late completion. Synchronous void retains the callback protocol and waits for done on these close/confirm guards.


Cancellable hooks use `(payload, done, context)`: closure payloads contain `{ action }`, change/commit payloads contain `{ value, previousValue }`, and Popup uses `{ reason }`. Context provides `signal` and an optional original `event`. Return a boolean/Promise, or call done()/done(false). Synchronous void waits for done; Promise&lt;void&gt; allows the operation. First completion wins. Pending state controls loading/disabled automatically. Cancellation invalidates stale results. Button refs are not exposed.

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Content, titles and action spacing use logical start/end. External popovers inherit their source direction. Closing, confirmation, cancellation and uncommitted state are unchanged by direction switches.

## Usage notes

### Async operation feedback
Awaited before-* hooks show loading feedback and aria-busy. Rejection or failure restores interaction; repeated input does not start the same operation again. Ordinary event return Promises do not participate in loading.

Programmatic notification callbacks do not control task completion. Service selection/closing results settle independently of callback errors, and closing completion always releases the owned host. Exceptions still propagate through the caller or Vue error channel; returned Promises do not control loading or closing.

### Dragging and cancellation
Title dragging is controlled only by the initiating primary pointer. Disabling `draggable`, closing, entering fullscreen, losing pointer capture or owner-window focus, deactivation and unmount all end the gesture and release listeners and capture. Reenabling requires a new gesture; the previous pointer cannot resume it. Disabling preserves the current offset; fullscreen and the existing post-close reset restore defaults. Listeners belong to the title element's document.

### Programmatic dialog mount targets
Function calls honor `popupContainer` from explicit configuration or `setDefaultOptions`, using the component's selector/HTMLElement resolution and missing/invalid-selector fallback to body. The default targets body; `false` renders inline in the service's own body host. `handle.update({ popupContainer })` moves the same dialog and preserves content state and app context. Closing removes teleported content and its service host, independently of notification callback results. A custom container controls DOM attachment; layout still follows Dialog positioning and its containing block.

## API

### Dialog Props

Dividers follow Card and are disabled by default. Enable them separately with `top-divider` and `bottom-divider`; each appears only when its corresponding header or footer exists. Dialog also supports these options in simple mode and service calls, using `topDivider` and `bottomDivider` in service configuration.

| Prop | Description | Type | Default |
| ---------------------------------------------------- | ------------------------------- | --------------------------------------------- | ----------------- |
| top-divider | Divider between the title and content | `boolean` | `false` |
| bottom-divider | Divider between the content and footer | `boolean` | `false` |
| dir | Reading direction; inherits the source scope when omitted. Physical left/right placements keep their meaning. | `ReadingDirection` (`ltr` / `rtl`) | — |
| `open` **(v-model)** | Visible state | `boolean` | `-` |
| `default-open` | Initial uncontrolled state | `boolean` | `false` |
| `title` | Title | `string` | `-` |
| `message` | Message content; the default slot is also supported | `string` | `-` |
| `type` | Semantic icon | `'info' \| 'success' \| 'warning' \| 'error'` | `-` |
| `simple` | Compact layout | `boolean` | `false` |
| `width` | Width | `number \| string` | `-` |
| `top` | Top offset; ineffective with `align-center` | `number \| string` | `-` |
| `title-align` | Title alignment | `'start' \| 'center'` | `'center'` |
| `message-align` | Message alignment | `'left' \| 'center' \| 'right'` | `'left'` |
| `align-center` | Center vertically and horizontally | `boolean` | `true` |
| `footer` | Show footer | `boolean` | `true` |
| `confirm-button` | Show the confirm button | `boolean` | `true` |
| `cancel-button` | Show the cancel button | `boolean` | `true` |
| `closable` | Show close button | `boolean` | `true` |
| `confirm-button-text` | Confirm button text | `string` | Localized text |
| `cancel-button-text` | Cancel button text | `string` | Localized text |
| `confirm-button-props` | Confirm button props | `ButtonProps` | `-` |
| `cancel-button-props` | Cancel button props | `ButtonProps` | `-` |
| `confirm-button-loading` | Confirm button loading state | `boolean` | `false` |
| `cancel-button-loading` | Cancel button loading state | `boolean` | `false` |
| `confirm-button-disabled` | Confirm button disabled state | `boolean` | `false` |
| `cancel-button-disabled` | Cancel button disabled state | `boolean` | `false` |
| `overlay` | Show overlay | `boolean` | `true` |
| `overlay-class` | Custom overlay classes | `string \| any[]` | `-` |
| `dialog-class` | Custom dialog panel classes | `string \| any[]` | `-` |
| `body-class` | Custom body classes | `string \| any[]` | `-` |
| `overlay-style` | Custom overlay styles | `StyleValue` | `-` |
| `dialog-style` | Custom dialog panel styles | `StyleValue` | `-` |
| `body-style` | Custom body styles | `StyleValue` | `-` |
| `overlay-closable` | Request closure on an overlay click | `boolean` | `true` |
| `esc-to-close` | Request closure on Escape | `boolean` | `true` |
| `lock-scroll` | Lock background scrolling while open | `boolean` | `true` |
| `close-on-route-change` | Close on browser history or hash changes | `boolean` | `false` |
| `popup-container` | Teleport target; `false` disables teleport | `string \| HTMLElement \| false` | `'body'` |
| `hide-title` | Hide the title area | `boolean` | `false` |
| `unmount-on-close` | Unmount after the close animation | `boolean` | `false` |
| `draggable` | Allow dragging; ineffective in `fullscreen` mode | `boolean` | `false` |
| `fullscreen` | Fullscreen display | `boolean` | `false` |
| `overlay-animation-name` | Overlay animation name | `string` | `'mp-fade'` |
| `dialog-animation-name` | Dialog animation name | `string` | `'mp-pop-center'` |
| `aria-label` | Accessible name without a visible title | `string` | `-` |
| `close-button-aria-label` | Close button label | `string` | `'Close dialog'` |
| `z-index` | Outer stacking level | `number` | Automatically distributed |
| `before-close` | Return a boolean/Promise or call done; the first completion wins | `DialogBeforeClose` | — |

### Dialog Events

| Event | Description | Arguments |
| ------------------ | ----------------------- | --------------- |
| `update:open` | Open state changed | `boolean` |
| `open` / `opened` | Opening starts / opening animation completes | `-` |
| `close` / `closed` | Closing starts / closing animation completes | `-` |
| `confirm` | Confirmation closing succeeds | `Event` |
| `cancel` | Cancellation closing succeeds | `Event` |
| `click-overlay` | `MouseEvent` | `MouseEvent` |
| `key-escape` | ESC pressed | `KeyboardEvent` |

The `close` button, overlay, ESC and `close()` all use action `close` without an additional `cancel` event.

Built-in buttons, overlay, Escape, footer methods and instance confirm()/cancel() request beforeClose. Instance close(), returned handle close(), Dialog.close() and parent open=false are direct commands that bypass guards; a controlled parent still decides whether to accept update:open(false). Direct closing retires pending guards so late results cannot close a reopened instance. close does not mean leave completion; observe closed/onClosed. Maple Popup close()/requestClose() instead return `Promise<boolean>` for guarded requests.

### Dialog Slots / Methods

| Slot | Description | Prop |
| --------- | ---------- | ---------------------------- |
| `default` | Content | `-` |
| `title` | Title | `-` |
| `footer` | Show footer | `confirm`, `cancel`, `close` |

Instances expose `confirm()`, `cancel()` and `close()`.

### Dialog Methods

All open methods accept `DialogConfig | string` and return `Promise<DialogAction | void> & DialogReturn`.
Function-based Dialog calls default to simple layout (`simple: true`) with the top-right close button hidden (`closable: false`). Explicit options or global defaults can override both.

| Method | Default behavior |
| ------------------------------------------- | ----------------------------------- |
| `Dialog.open(config)` | Ordinary dialog |
| `Dialog.confirm(config)` | `type: 'warning'`, simple layout |
| `Dialog.alert(config)` | No cancel button; overlay/ESC closing disabled |
| `Dialog.info/success/warning/error(config)` | Corresponding status, no cancel button, simple layout |
| `Dialog.close()` | Close the latest functional dialog |
| `Dialog.setDefaultOptions(config)` | Set default programmatic options |
| `Dialog.resetDefaultOptions()` | Reset default programmatic options |

`DialogConfig` matches camelCase component props and additionally supports renderable `content`/`title`/`message`/`footer` plus `onOpen`/`onOpened`/`onClose`/`onClosed`/`onConfirm`/`onCancel`/`onClickOverlay`/`onKeyEscape`.

`DialogReturn.close()` closes this dialog; `DialogReturn.update(config)` updates mutable configuration. After installation, `this.$dialog` exposes the same API.

```ts
type DialogAction = 'confirm' | 'cancel' | 'close'
type DialogType = 'info' | 'success' | 'warning' | 'error'
```

## CSS Variables

Normal and simple modes grow with their content up to `90dvh`, falling back to `90vh` when unsupported. Beyond this height, only the body scrolls; the title and actions remain visible. Override the limit with `--mp-dialog-max-height` or `dialogStyle.maxHeight`; fullscreen mode uses the full viewport height. A custom footer also stays inside the non-scrolling actions container.

Variables use `--mp-`, e.g. `--mp-dialog-width`, `--mp-dialog-background`, `--mp-dialog-border-radius`, `--mp-dialog-simple-width`, `--mp-dialog-fullscreen-width` and `--mp-dialog-close-button-color`.

Color semantics match Cedar: `--mp-dialog-background` uses `surface-raised`; `--mp-dialog-overlay-background` controls scrim; titles/body use primary content and close controls secondary content. `--mp-dialog-status-{info|success|warning|danger}-color` uses readable content-info/success/warning/danger, not status fill. Business themes should override component variables; shared themes override system variables. Mobile borderless geometry/layout remain independent.

The backdrop consumes `sys-color-scrim` through the Dialog component variable. Dialog uses its own backdrop variables. Set a per-instance backdrop variable via `overlay-style`; a variable on the panel (`dialog-style`) does not inherit to its sibling backdrop. Explicit `overlay-style.backgroundColor` wins. Teleported content needs variables on its actual DOM ancestors. Dark themes inherit the same semantic colors; geometry remains platform-specific. Status icons use readable content colors.

Variables are grouped by purpose: background/overlay-background for panel/scrim; border-* for panel/divider borders; title-* for title typography; content-* for body typography; actions-* for actions; close-button-* for the close button; status-* for semantic icons; simple-*/fullscreen-* for mode dimensions; animation-* for enter/leave motion. width/margin-top control ordinary panel layout. Internal drag/position variables are not public customization points.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-dialog-actions-button-gap` | `var(--mp-sys-space-3)` | `margin-inline-start` |
| `--mp-dialog-actions-padding` | `0 12px 12px` | `padding` |
| `--mp-dialog-animation-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |
| `--mp-dialog-animation-easing` | `var(--mp-sys-motion-easing-standard)` | `transition` |
| `--mp-dialog-background` | `var(--mp-sys-color-surface-raised)` | `background` |
| `--mp-dialog-border-color` | `transparent` | `border` |
| `--mp-dialog-border-radius` | `3px` | `border-radius` |
| `--mp-dialog-border-width` | `0` | `border` |
| `--mp-dialog-close-button-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-dialog-close-button-font-size` | `20px` | `font-size` |
| `--mp-dialog-close-button-inset-inline-end` | `0` | `margin-inline-end` |
| `--mp-dialog-close-button-size` | `40px` | `height`, `width` |
| `--mp-dialog-content-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-dialog-content-line-height` | `24px` | `line-height` |
| `--mp-dialog-content-padding` | `12px 20px` | `padding` |
| `--mp-dialog-content-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-dialog-divider-color` | `var(--mp-sys-color-border-default)` | `border-bottom` |
| `--mp-dialog-divider-width` | `1px` | `border-bottom` |
| `--mp-dialog-fullscreen-height` | `100vh`<br>`100dvh` | `height` |
| `--mp-dialog-fullscreen-width` | `100vw` | `width` |
| `--mp-dialog-margin-top` | `0` | `margin-top` |
| `--mp-dialog-max-height` | `90vh`<br>`90dvh` | `max-height` |
| `--mp-dialog-overlay-background` | `var(--mp-sys-color-scrim)` | `background-color` |
| `--mp-dialog-simple-actions-gap` | `0` | `margin-top` |
| `--mp-dialog-simple-border-radius` | `var(--mp-sys-radius-lg)` | `border-radius` |
| `--mp-dialog-simple-content-gap` | `0` | `margin-top` |
| `--mp-dialog-simple-padding` | `20px` | `padding` |
| `--mp-dialog-simple-width` | `280px` | `width` |
| `--mp-dialog-status-danger-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-dialog-status-icon-gap` | `var(--mp-sys-space-3)` | `margin-inline-end` |
| `--mp-dialog-status-icon-size` | `18px` | `font-size` |
| `--mp-dialog-status-info-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-dialog-status-success-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-dialog-status-warning-color` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-dialog-title-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-dialog-title-font-weight` | `var(--mp-sys-font-weight-regular)` | `font-weight` |
| `--mp-dialog-title-justify` | `space-between` | `justify-content` |
| `--mp-dialog-title-min-height` | `0` | `min-height` |
| `--mp-dialog-title-padding` | `20px 20px 0` | `padding` |
| `--mp-dialog-title-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-dialog-width` | `280px` | `width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-dialog-actions-button-gap: var(--mp-sys-space-3);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
