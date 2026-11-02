# Trigger

Real IAB default/light completes delayed-unmount and KeepAlive resize on both platforms (four cases), including a positive timer/remount control and final panel nodes0. Entry buttons use native clicks; mouseenter is fixture-scripted, not native-hover, cross-window or OS acceptance.

Observer bindings and measurement RAF batches use separate generations. Old entries and dequeued frames after replacement/deactivation cannot consume new measurement tasks; necessary geometry work remains independent of CSS motion duration.

Replacing/clearing the popup ref or unmounting before watcher flush removes scroll listeners on their original binding window, independent of the current ref. Simulated regression does not cover same-node document adoption or real browser/OS visuals.

Positioning / scroll-close RAF uses the event element or popup owner window and is canceled on its original scheduling window. Dequeued frames after close/unbind cannot consume replacement scrolling work. RAF is measurement scheduling, not CSS duration; original listener-window cleanup is verified by the subsequent simulated audit; same-node document adoption and real browser visuals remain separate.

mouse-enter-delay / mouse-leave-delay are interaction delays, separate from CSS enter/leave duration. Cancel, replacement, KeepAlive deactivation and unmount invalidate dequeued commits; retained requests cannot schedule while inactive or disposed. Reactivation accepts new requests without replaying old delays. Controlled open remains caller-owned.

Clicking another independent reference closes the previous top layer before opening the new one. Nested popups remain inside their parent. Controlled open state only receives a close request; the owner may reject it.

### Introduction

A style-agnostic floating-layer primitive for interaction, positioning, teleporting, stacking and open state. Prefer Tooltip, Popover or Menu for end-user features; use Trigger directly when building another floating component.

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

## Layout and arrangement

### Placement and arrow

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `trigger` | `hover/click/focus/contextMenu/manual`, or an array | Placement and arrow |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Placement and arrow |
| `popup-offset` | Outward main-axis distance | Placement and arrow |
| `show-arrow` | Render the decorative arrow | Placement and arrow |
<!-- demo-config-notes:end -->


```demo
../example/demos/placement.vue
```

## Interaction and control

### Controlled state and offset

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `trigger` | `hover/click/focus/contextMenu/manual`, or an array | Controlled state and offset |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Controlled state and offset |
| `popup-offset` | Outward main-axis distance | Controlled state and offset |
| `popup-translate` | Screen-axis translation or placement map | Controlled state and offset |
<!-- demo-config-notes:end -->


`popup-offset` moves outward on the placement main axis. `popup-translate` adds a screen-axis x/y translation.

The demo accepts requests through `v-model:open` and displays the parent's value. External controls update that value; Enter/Space activates the native trigger button, while Escape and outside clicks request closing. It does not demonstrate rejected controlled requests. Trigger is listed in the component menu so its right-side preview shows these demos instead of the home page.

```demo
../example/demos/controlled.vue
```

## API

### Props

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model:open` | Controlled open state | _boolean_ | `-` |
| `default-open` | Initial uncontrolled state | _boolean_ | `false` |
| `trigger` | `hover/click/focus/contextMenu/manual`, or an array | _TriggerEvent \| TriggerEvent[]_ | `hover` |
| `disabled` | Prevent opening | _boolean_ | `false` |
| `reference` | External reference element | _string \| HTMLElement \| SVGElement_ | `-` |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | _TriggerPlacement_ | `bottom` |
| `strategy` | Positioning strategy | _absolute \| fixed_ | `absolute` |
| `cover` | Cover the reference on the main axis | _boolean_ | `false` |
| `popup-offset` | Outward main-axis distance | _number_ | `0` |
| `popup-translate` | Screen-axis translation or placement map | _[number, number] \| Record_ | `-` |
| `align-point` | Position at the pointer | _boolean_ | `false` |
| `popup-container` | Render target; false renders locally | _string \| HTMLElement \| false_ | `body` |
| `auto-fit-position` | Flip and shift into the viewport | _boolean_ | `true` |
| `auto-fit-popup-width` | Match reference width | _boolean_ | `false` |
| `auto-fit-popup-min-width` | Match reference minimum width | _boolean_ | `false` |
| `auto-fix-position` | Reposition after size changes | _boolean_ | `true` |
| `update-at-scroll` | Reposition while scrolling | _boolean_ | `false` |
| `scroll-to-close` | Close after the scroll threshold | _boolean_ | `false` |
| `scroll-to-close-distance` | Close threshold | _number_ | `0` |
| `show-arrow` | Render the decorative arrow | _boolean_ | `false` |
| `hide-empty` | Skip an empty content slot | _boolean_ | `false` |
| `prevent-focus` | Prevent positioning-layer mousedown from stealing focus | _boolean_ | `false` |
| `unmount-on-close` | Unmount after leave | _boolean_ | `true` |
| `animation-name` | Vue Transition name | _string_ | `trigger-fade` |
| `duration` | Transition duration | _number \| object_ | `-` |
| `auto-fit-transform-origin` | Derive transform origin from final placement | _boolean_ | `false` |
| `opened-class` | Class applied to the first reference node while open | _string \| array \| object_ | `-` |
| `popup-class` / `popup-style` | Positioning-layer class/style | _ClassName / CSSProperties_ | `-` |
| `content-class` / `content-style` | Content-layer class/style | _ClassName / CSSProperties_ | `-` |
| `arrow-class` / `arrow-style` | Arrow class/style | _ClassName / CSSProperties_ | `-` |

Interaction timing and dismissal props also include `mouse-enter-delay`, `mouse-leave-delay`, `focus-delay`, `popup-hover-stay`, `blur-to-close`, `close-on-click-reference`, `click-outside-to-close`, `esc-to-close`, and `restore-focus`.

### Events

`update:open`、`open-change`、`open`、`opened`、`close`、`closed`、`click-outside`、`resize`。

### Slots and methods

default provides the reference; `content` supplies popup `content`. Exposes `open()`, `close()`, `resize()`, `allowClose()`, `getReference()`, `setReference()`, `focusReference()`, `isTopLayer()`.

### Accessibility

`trigger="focus"` supports keyboard focus; Escape closes only the topmost popup. Trigger does not define business `role`/ARIA relationships; semantic wrappers supply them.

## Public CSS variables

These are actual :root defaults. Prefer component variables for business customization; internal positioning variables are not public API.

| Variable | Default | Meaning and use case |
| --- | --- | --- |
| `--mp-trigger-arrow-background` | `var(--mp-sys-color-surface-overlay)` | Standalone Trigger arrow background; wrappers use their own variables |
| `--mp-trigger-arrow-size` | `var(--mp-sys-space-4)` | Arrow square size |
| `--mp-trigger-arrow-radius` | `var(--mp-sys-radius-sm)` | Arrow border radius |
| `--mp-trigger-transition-duration` | `var(--mp-sys-motion-duration-fast)` | Default Trigger fade duration |
| `--mp-trigger-transition-easing` | `var(--mp-sys-motion-easing-standard)` | Default Trigger easing |

Tooltip/Popover define arrow appearance themselves. Override their component variables rather than Trigger arrow-background.

With Teleport, variables must be in the actual popup scope, for example through `popup-style`. Trigger-button variables do not automatically inherit into popups.

### Reduced motion

Built-in CSS transitions follow `prefers-reduced-motion: reduce`. Removing transitions does not change final visibility, selected/expanded state or event semantics. Applications control custom animations inside slots.


### Placement semantics and configuration

placement is a preferred side; final placement may change while auto-fit-position is true (the default). It is not a position coordinate. top-start is anchor-side alignment, whereas top-left denotes a container corner. Current Trigger start/end follows physical cross-axis geometry; automatic RTL mirroring is not promised.

## Native event modifiers on the reference

Native click, mouseenter, mouseleave, focusin, focusout and contextmenu listeners, including .once, .capture and .passive, belong to the actual reference element rather than the popup. Updating a consumed once callback does not rearm it; replacing the reference or removing and readding the listener starts a new native lifetime. Suspension and unmount detach listeners. Listener promises do not control opening or loading; errors follow Vue event error handling.
