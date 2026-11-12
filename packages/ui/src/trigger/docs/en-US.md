# Trigger

SSR limitation: a trigger or `content` slot node using both `v-for` and `v-memo` can make server rendering fail. The trigger slot can fail even while the popup is closed; the `content` slot can fail when the popup is open or `unmount-on-close=false`. Remove `v-memo` from that slot node when rendering on the server; ordinary `v-for` remains supported. In Vue 3.5.13, a standalone dynamic `v-memo` can also fail in the trigger slot.





Replacing or clearing the popup reference, or unmounting the component, removes the old window scroll listeners.

After closing or unbinding, pending positioning and scroll-close tasks do not affect a popup opened later.

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

## Triggers and positioning

### Popup placement

placement is the preferred side; auto-fit-position defaults to true and can change the final side. It is not a position coordinate. top-start describes anchor placement and alignment, whereas top-left is a container corner. Top/bottom start and end mirror with reading direction; left/right remain physical, and vertical start/end remain top/bottom.

## Usage notes

### Configuration

These are actual :root defaults. Prefer component variables for business customization; internal positioning variables are not public API.

With Teleport, variables must be in the actual popup scope, for example through `popup-style`. Trigger-button variables do not automatically inherit into popups.

### Reduced motion

`allowClose()` restores the internal closing gate; there is no public counterpart to disable closing, and this method cannot prevent closure.

## API

### Trigger Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model:open` | Controlled open state | _boolean_ | `-` |
| `default-open` | Initial uncontrolled state | _boolean_ | `false` |
| `trigger` | `hover/click/focus/contextMenu/manual`, or an array | _TriggerEvent \| TriggerEvent[]_<br>`TriggerEvent: 'manual' \| 'focus' \| 'hover' \| 'click' \| 'contextMenu'` | `hover` |
| `disabled` | Prevent opening | _boolean_ | `false` |
| `reference` | External reference element | _string \| HTMLElement \| SVGElement_ | `-` |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | _TriggerPlacement_<br>`'left' \| 'right' \| 'bottom' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `bottom` |
| `strategy` | Positioning strategy | _absolute \| fixed_ | `absolute` |
| `cover` | Cover the reference on the main axis | _boolean_ | `false` |
| `popup-offset` | Outward main-axis distance | _number_ | `0` |
| `popup-translate` | Screen-axis translation or placement map | _[number, number] \| Record_ | `-` |
| `align-point` | Position at the pointer | _boolean_ | `false` |
| `popup-container` | Mount container; false renders in place. When switching within a document or between accessible same-origin iframes, focus restoration is attempted for native inputs and buttons that have not been transferred, including equivalent elements in open Shadow DOM. Opaque hosts that may contain closed Shadow DOM are not restored automatically. | _string \| HTMLElement \| false_ | `body` |
| `auto-fit-position` | Flip and shift into the viewport | _boolean_ | `true` |
| `auto-fit-popup-width` | Match reference width | _boolean_ | `false` |
| `auto-fit-popup-min-width` | Match reference minimum width | _boolean_ | `false` |
| `auto-fix-position` | Observe reference element size changes; disabling this still observes the popup and positioning parent and responds to window changes | _boolean_ | `true` |
| `update-at-scroll` | Reposition while scrolling | _boolean_ | `false` |
| `scroll-to-close` | Close after the scroll threshold | _boolean_ | `false` |
| `scroll-to-close-distance` | Close threshold | _number_ | `0` |
| `show-arrow` | Render the decorative arrow | _boolean_ | `false` |
| `hide-empty` | Skip a directly empty content slot; a component node counts as nonempty even if it renders nothing | _boolean_ | `false` |
| `prevent-focus` | Prevent positioning-layer mousedown from stealing focus | _boolean_ | `false` |
| `unmount-on-close` | Unmount after leave | _boolean_ | `true` |
| `animation-name` | Vue Transition name | _string_ | `trigger-fade` |
| `duration` | Transition duration | _number \| object_ | `-` |
| `auto-fit-transform-origin` | Derive transform origin from final placement | _boolean_ | `false` |
| `opened-class` | Merge into the first default-slot node when open; external references do not receive this class | _string \| array \| object_ | `-` |
| `reference-attrs` | Attributes applied to the actual reference or a function of open; original attributes are restored when removed, replaced or unmounted | _TriggerReferenceAttrs \| ((open: boolean) => TriggerReferenceAttrs)_ | `-` |
| `popup-class` | Custom positioning-layer classes | `ClassName` | `-` |
| `popup-style` | Custom positioning layer styles | `CSSProperties` | `-` |
| `content-class` | Custom content layer classes | `ClassName` | `-` |
| `content-style` | Custom content layer styles | `CSSProperties` | `-` |
| `arrow-class` | Custom arrow classes | `ClassName` | `-` |
| `arrow-style` | Custom arrow styles | `CSSProperties` | `-` |

Interaction timing and dismissal props also include `mouse-enter-delay`, `mouse-leave-delay`, `focus-delay`, `popup-hover-stay`, `blur-to-close`, `close-on-click-reference`, `click-outside-to-close`, `esc-to-close`, and `restore-focus`.

### Trigger Events

`update:open`、`open-change`、`open`、`opened`、`close`、`closed`、`click-outside`、`resize`。

### Trigger Slots / Methods

default provides the reference; `content` supplies popup `content`. Exposes `open()`, `close()`, `resize()`, `allowClose()`, `getReference()`, `setReference()`, `focusReference()`, `isTopLayer()`.

### Accessibility

`trigger="focus"` supports keyboard focus; Escape closes only the topmost popup. Trigger does not define business `role`/ARIA relationships; semantic wrappers supply them.

## Native event modifiers on reference elements

Native `click`, `mouseenter`, `mouseleave`, `focusin`, `focusout`, `contextmenu` listeners and `.once`, `.capture`, `.passive` modifiers bind to the actual reference element, not the popup. `.once` follows the native element's listener lifetime. Replacing a callback does not reactivate a consumed listener; replacing the reference or removing and readding a listener starts a new lifetime. Deactivation/unmount unbind listeners. Listeners only notify; returned Promises do not drive opening/loading, and errors enter Vue's event error chain.

`aria-describedby` from `reference-attrs` is merged and deduplicated with existing reference descriptions; cleanup or reference replacement restores the original attribute.

Fixed positioning uses the actual `fixed` containing block when an ancestor has a transform, filter, perspective, or containing CSS property. Axis-aligned scaling is accounted for; rotated or skewed coordinate systems are not guaranteed. For accessible same-origin iframe references, the reference and popup documents share coordinate conversion and event handling; cross-origin or unrelated browsing contexts are not supported. With `update-at-scroll`, scrolling either document or a scrollable ancestor updates the popup.

When a reference is slotted into a scroll container inside a closed ShadowRoot, the outer Trigger cannot access the slot or container and cannot listen to its scrolling automatically. The closed component can call the Trigger instance's `resize()` on internal scroll or slot changes. For scroll-to-close behavior, call `close()` internally using an application-specific threshold, and remove listeners on unmount.

A popup mounted inside an iframe remains clipped by that iframe's viewport. Content outside the iframe is invisible even when cross-document coordinate conversion is correct.

## CSS Variables

Tooltip/Popover define arrow appearance themselves. Override their component variables rather than Trigger arrow-background.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-trigger-arrow-background` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-trigger-arrow-radius` | `var(--mp-sys-radius-sm)` | `border-radius` |
| `--mp-trigger-arrow-size` | `var(--mp-sys-space-4)` | `height`, `width` |
| `--mp-trigger-transition-duration` | `var(--mp-sys-motion-duration-fast)` | `transition` |
| `--mp-trigger-transition-easing` | `var(--mp-sys-motion-easing-standard)` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-trigger-arrow-background: var(--mp-sys-color-surface-overlay);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Reduced motion

Built-in CSS transitions follow `prefers-reduced-motion: reduce`. Removing transitions does not change final visibility, selected/expanded state or event semantics. Applications control custom animations inside slots.
