# Trigger

Real IAB default/light completes delayed-unmount and KeepAlive resize on both platforms (four cases), including a positive timer/remount control and final panel nodes0. Entry buttons use native clicks; mouseenter is fixture-scripted, not native-hover, cross-window or OS acceptance.

Observer bindings and measurement RAF batches use separate generations. Old entries and dequeued frames after replacement/deactivation cannot consume new measurement tasks; necessary geometry work remains independent of CSS motion duration.

Replacing/clearing the popup ref or unmounting before watcher flush removes scroll listeners on their original binding window, independent of the current ref. Simulated regression does not cover same-node document adoption or real browser/OS visuals.

Positioning / scroll-close RAF uses the event element or popup owner window and is canceled on its original scheduling window. Dequeued frames after close/unbind cannot consume replacement scrolling work. RAF is measurement scheduling, not CSS duration; original listener-window cleanup is verified by the subsequent simulated audit; same-node document adoption and real browser visuals remain separate.

mouse-enter-delay / mouse-leave-delay are interaction delays, separate from CSS enter/leave duration. Cancel, replacement, KeepAlive deactivation and unmount invalidate dequeued commits; retained requests cannot schedule while inactive or disposed. Reactivation accepts new requests without replaying old delays. Controlled open remains caller-owned.

Clicking another independent reference closes the previous top layer before opening the new one. Nested popups remain inside their parent. Controlled open state only receives a close request; the owner may reject it.

## Examples

### Introduction

A style-agnostic floating-layer primitive for interaction, positioning, teleporting, stacking and open state. Prefer Tooltip, Popover or Menu for end-user features; use Trigger directly when building another floating component.

### Basic usage

```demo
../example/demos/basic.vue
```

### Placement and arrow

```demo
../example/demos/placement.vue
```

### Controlled state and offset

`popup-offset` moves outward on the placement main axis. `popup-translate` adds a screen-axis x/y translation.

The demo accepts requests through `v-model:open` and displays the parent's value. External controls update that value; Enter/Space activates the native trigger button, while Escape and outside clicks request closing. It does not demonstrate rejected controlled requests. Trigger is listed in the component menu so its right-side preview shows these demos instead of the home page.

```demo
../example/demos/controlled.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model:open` | Controlled open state | _boolean_ | `-` |
| `default-open` | Initial uncontrolled state | _boolean_ | `false` |
| `trigger` | `hover/click/focus/contextMenu/manual`, or an array | _TriggerEvent \| TriggerEvent[]_ | `hover` |
| `disabled` | Prevent opening | _boolean_ | `false` |
| `reference` | External reference element | _string \| HTMLElement \| SVGElement_ | `-` |
| `placement` | Twelve standard placements | _TriggerPlacement_ | `bottom` |
| `strategy` | Positioning strategy | _absolute \| fixed_ | `absolute` |
| `cover` | Cover the reference on the main axis | _boolean_ | `false` |
| `popup-offset` | Outward main-axis distance | _number_ | `0` |
| `popup-translate` | Screen-axis translation or placement map | _[number, number] \| Record_ | `-` |
| `align-point` | Position at the pointer | _boolean_ | `false` |
| `popup-container` | Teleport target; false renders inline | _string \| HTMLElement \| false_ | `body` |
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

### Events, slots and exposed methods

Events: `update:open`, `open-change`, `open`, `opened`, `close`, `closed`, `click-outside`, `resize`. The default slot is the reference and `content` is the floating content. Exposed methods: `open()`, `close()`, `resize()`, `allowClose()`, `getReference()`, `setReference()`, `focusReference()`, `isTopLayer()`.

### Tokens

`--mp-trigger-arrow-background`, `--mp-trigger-arrow-size`, `--mp-trigger-arrow-radius`, `--mp-trigger-transition-duration`, `--mp-trigger-transition-easing`.

### Accessibility

`trigger="focus"` supports keyboard focus and Escape only closes the top layer. Trigger does not choose an application role or aria relationship; semantic wrappers must provide them.

## Public CSS variables

Defaults below are the actual :root values. Prefer component variables for customization; internal positioning variables are not public APIs.

| Variable | Default | Purpose |
| --- | --- | --- |
| `--mp-trigger-arrow-background` | `var(--mp-sys-color-surface-overlay)` | Standalone Trigger arrow; wrappers use their own token |
| `--mp-trigger-arrow-size` | `var(--mp-sys-space-4)` | Arrow square size |
| `--mp-trigger-arrow-radius` | `var(--mp-sys-radius-sm)` | Arrow corner radius |
| `--mp-trigger-transition-duration` | `var(--mp-sys-motion-duration-fast)` | Default Trigger fade duration |
| `--mp-trigger-transition-easing` | `var(--mp-sys-motion-easing-standard)` | Default Trigger easing |

Tooltip and Popover own their arrow appearance: customize their tokens instead of Trigger arrow-background.

With Teleport, apply variables to the actual popup scope (for example via `popup-style`); variables on the reference button do not automatically inherit into the popup.

### Reduced motion

Built-in CSS transitions respect `prefers-reduced-motion: reduce`. Final visibility, checked/expanded state and event semantics remain unchanged; custom slot animations are controlled by the application.
