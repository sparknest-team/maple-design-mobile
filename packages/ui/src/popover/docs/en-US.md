# Popover

SSR limitation: a trigger slot node using both `v-for` and `v-memo` can make server rendering fail. Remove `v-memo` from that slot node when rendering on the server; ordinary `v-for` remains supported. In Vue 3.5.13, a standalone dynamic `v-memo` can also fail in this slot. The same limitation can affect the `content` slot; remove `v-memo` there for server rendering.

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

## Empty content

With `hide-empty`, the panel is hidden when the title is empty and the body contains only comments or whitespace. The open state is unchanged and the panel appears when content becomes available. Component nodes count as content.

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Content defaults to inline-start alignment and popovers inherit source direction. Logical start/end follow reading direction; explicit left/right placements remain physical.

## Usage notes

### Configuration

These are actual :root defaults. Prefer component variables for business customization; internal positioning variables are not public API.

With Teleport, variables must be in the actual popup scope, for example through `popup-style`. Trigger-button variables do not automatically inherit into popups.

## API

Popover inherits Trigger positioning, container, controlled state and `close` policies. `auto-fit-transform-origin` defaults to true; an omitted `animation-name` uses the Popover animation. `content-class` and `content-style` apply to the content panel; `popup-class` and `popup-style` apply to the outer positioning node. The instance exposes seven methods: `open`, `close`, `resize`, `allowClose`, `getReference`, `focusReference`, and `setReference`. Focus remains on the trigger when opening. The panel is non-modal and Tab order depends on its actual DOM mount location; provide an accessible keyboard path for interactive content.

### Popover Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:open | Controlled open state | `boolean` | — |
| default-open | Initial uncontrolled state | `boolean` | `false` |
| title | Title | `string` | — |
| content | Body | `string` | — |
| trigger | Interaction | `TriggerEvent \| TriggerEvent[]`<br>`TriggerEvent: 'manual' \| 'focus' \| 'hover' \| 'click' \| 'contextMenu'` | `click` |
| placement | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | `TriggerPlacement`<br>`'left' \| 'right' \| 'bottom' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `bottom` |
| show-arrow | Show the arrow | `boolean` | `true` |
| popup-offset | Main-axis distance | `number` | `10` |
| popup-translate | Additional screen-axis translation | `[number, number] \| Record` | — |
| popup-container | Render target; false renders locally | `string \| HTMLElement \| false` | `body` |
| reference | External trigger element | `string \| HTMLElement \| SVGElement` | — |
| disabled | Prevent opening | `boolean` | `false` |
| unmount-on-close | Unmount after close; false retains draft state | `boolean` | `false` |
| close-on-click-reference | Close when the trigger is clicked again | `boolean` | `true` |

### Popover Events

| Event | Description |
| --- | --- |
| update:open | Requests a controlled open-state change |
| open-change | Requests any open-state change |
| open | Opening starts |
| opened | Enter transition completes |
| close | Closing starts |
| closed | Leave transition completes |
| click-outside | Clicked outside the popup |

### Popover Slots

| Slot | Description |
| --- | --- |
| default | Trigger element |
| title | Title; falls back to the `title` prop |
| content | Body; falls back to the `content` prop |

### Popover Methods

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

The reference is connected to the panel with `aria-controls` and `aria-expanded`. The panel is a group and does not declare aria-haspopup by default. When setting an explicit popup type through reference-attrs, ensure it matches the actual content semantics. Use Trigger for unstyled positioning. Popover has no `defaultStyle`, `popoverClass`, or `elevation`; customize with tokens, `content-class`, or `content-style`.

## CSS Variables

Maple dark mode retains a 2px radius and platform-specific shadows. Content and arrows share background/border variables, independent of Trigger style-loading order.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-popover-animation-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-popover-arrow-z-index` | `1` | `z-index` |
| `--mp-popover-background` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-popover-border-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-popover-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-popover-border-width` | `1px` | `border` |
| `--mp-popover-box-shadow` | `0 3px 3px -2px var(--mp-shadow-key-umbra-opacity), 0 3px 4px 0 var(--mp-shadow-key-penumbra-opacity),     0 1px 8px 0 var(--mp-shadow-key-ambient-opacity)` | `box-shadow` |
| `--mp-popover-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-popover-line-height` | `var(--mp-line-height)` | `line-height` |
| `--mp-popover-padding-horizontal` | `var(--mp-sys-space-7)` | `padding` |
| `--mp-popover-padding-vertical` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-popover-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-popover-title-content-gap` | `var(--mp-sys-space-2)` | `margin-top` |
| `--mp-popover-title-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-popover-title-font-weight` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-popover-title-text-color` | `var(--mp-sys-color-content-primary)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-popover-background: var(--mp-sys-color-surface-overlay);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
