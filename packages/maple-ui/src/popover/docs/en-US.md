# Popover

Shows structured, interactive content after the reference is clicked. Use Tooltip for a short, non-interactive description.

## Basic examples

### Basic usage

```demo
../example/demos/basic-usage.vue
```

## Content and presentation

### Placement, offset and width

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Placement, offset and width |
| `popup-translate` | Additional screen-axis translation | Placement, offset and width |
| `trigger` | Interaction | Trigger and controlled state |
| `disabled` | Prevent opening | Trigger and controlled state |
<!-- demo-config-notes:end -->


Open popovers one at a time to compare placement, offsets and trigger-width fitting.

```demo
../example/demos/positioning-comparison.vue
```

### Trigger and controlled state

```demo
../example/demos/trigger.vue
```

```demo
../example/demos/two-way-binding.vue
```

```demo
../example/demos/events.vue
```

```demo
../example/demos/disabled.vue
```

## Interaction and control

### Interactive content and retained state

```demo
../example/demos/interactive.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"` and supports runtime and nested overrides. Content defaults to reading start and portals inherit their source direction. Logical start/end alignment follows direction, while explicit left/right placement remains physical.

## API

Popover inherits Trigger positioning, containers, controlled state, close policies and public methods.

### Props

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:open | Controlled open state | `boolean` | — |
| default-open | Initial uncontrolled state | `boolean` | `false` |
| title | Title | `string` | — |
| content | Body | `string` | — |
| trigger | Interaction | `TriggerEvent \| TriggerEvent[]` | `click` |
| placement | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | `TriggerPlacement` | `bottom` |
| show-arrow | Show the arrow | `boolean` | `true` |
| popup-offset | Main-axis distance | `number` | `10` |
| popup-translate | Additional screen-axis translation | `[number, number] \| Record` | — |
| popup-container | Render target; false renders locally | `string \| HTMLElement \| false` | `body` |
| reference | External trigger element | `string \| HTMLElement \| SVGElement` | — |
| disabled | Prevent opening | `boolean` | `false` |
| unmount-on-close | Unmount after close; false retains draft state | `boolean` | `false` |
| close-on-click-reference | Close when the trigger is clicked again | `boolean` | `true` |

### Events

| Event | Description |
| --- | --- |
| update:open | Requests a controlled open-state change |
| open-change | Requests any open-state change |
| open | Opening starts |
| opened | Enter transition completes |
| close | Closing starts |
| closed | Leave transition completes |
| click-outside | Clicked outside the popup |

### Slots

| Slot | Description |
| --- | --- |
| default | Trigger element |
| title | Title; falls back to the `title` prop |
| content | Body; falls back to the `content` prop |

### Methods

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

The reference is connected to the panel with `aria-controls` and `aria-expanded`. Use Trigger for unstyled positioning. Popover has no `defaultStyle`, `popoverClass`, or `elevation`; customize with tokens, `content-class`, or `content-style`.

## Public CSS variables

These are actual :root defaults. Prefer component variables for business customization; internal positioning variables are not public API.

| Variable | Default | Meaning and use case |
| --- | --- | --- |
| `--mp-popover-background` | `var(--mp-sys-color-surface-overlay)` | Content and arrow background |
| `--mp-popover-text-color` | `var(--mp-sys-color-content-secondary)` | Body foreground |
| `--mp-popover-border-color` | `var(--mp-sys-color-border-default)` | Content and arrow border color |
| `--mp-popover-border-width` | `1px` | Content and arrow border width |
| `--mp-popover-border-radius` | `var(--mp-sys-radius-md)` | Content border radius |
| `--mp-popover-box-shadow` | `0 3px 3px -2px var(--mp-shadow-key-umbra-opacity), 0 3px 4px 0 var(--mp-shadow-key-penumbra-opacity), 0 1px 8px 0 var(--mp-shadow-key-ambient-opacity)` | Content shadow; retains platform differences |
| `--mp-popover-arrow-z-index` | `1` | Arrow stacking within the current popup |
| `--mp-popover-padding-horizontal` | `var(--mp-sys-space-7)` | Horizontal content padding |
| `--mp-popover-padding-vertical` | `var(--mp-sys-space-6)` | Vertical content padding |
| `--mp-popover-font-size` | `var(--mp-sys-font-size-md)` | Content font size |
| `--mp-popover-line-height` | `var(--mp-line-height)` | Content line height |
| `--mp-popover-title-text-color` | `var(--mp-sys-color-content-primary)` | Title foreground |
| `--mp-popover-title-font-size` | `var(--mp-sys-font-size-lg)` | Title font size |
| `--mp-popover-title-font-weight` | `var(--mp-sys-font-weight-medium)` | Title font weight |
| `--mp-popover-title-content-gap` | `var(--mp-sys-space-2)` | Title-to-body gap |
| `--mp-popover-animation-duration` | `var(--mp-sys-motion-duration-standard)` | Enter/leave duration; reduced motion may override it |

Maple dark mode retains a 2px radius and platform-specific shadows. Content and arrows share background/border variables, independent of Trigger style-loading order.

With Teleport, variables must be in the actual popup scope, for example through `popup-style`. Trigger-button variables do not automatically inherit into popups.
