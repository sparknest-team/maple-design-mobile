# Popover

Shows structured, interactive content after the reference is clicked. Use Tooltip for a short, non-interactive description.

## Examples

### Basic usage

```demo
../example/demos/basic-usage.vue
```

### Interactive content and retained state

```demo
../example/demos/interactive.vue
```

### Placement and offset

```demo
../example/demos/placement.vue
```

```demo
../example/demos/offset.vue
```

```demo
../example/demos/auto-fit-popup-width.vue
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

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

Popover inherits Trigger positioning, container, controlled state, dismissal and exposed methods.

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:open | Controlled open state | `boolean` | — |
| default-open | Initial uncontrolled state | `boolean` | `false` |
| title | Heading | `string` | — |
| content | Body | `string` | — |
| trigger | Interaction | `TriggerEvent \| TriggerEvent[]` | `click` |
| placement | Preferred placement | `TriggerPlacement` | `bottom` |
| show-arrow | Show the arrow | `boolean` | `true` |
| popup-offset | Main-axis distance | `number` | `10` |
| popup-translate | Additional screen-axis translation | `[number, number] \| Record` | — |
| popup-container | Teleport target; false renders inline | `string \| HTMLElement \| false` | `body` |
| reference | External reference element | `string \| HTMLElement \| SVGElement` | — |
| disabled | Prevent opening | `boolean` | `false` |
| unmount-on-close | Unmount after close; false retains draft state | `boolean` | `false` |
| close-on-click-reference | Close when the reference is clicked again | `boolean` | `true` |

### Events

| Event | Description |
| --- | --- |
| update:open | Requests a controlled open-state change |
| open-change | Requests any open-state change |
| open | Opening starts |
| opened | Enter transition completes |
| close | Closing starts |
| closed | Leave transition completes |
| click-outside | The pointer activated outside the floating layer |

### Slots

| Slot | Description |
| --- | --- |
| default | Reference element |
| title | Heading; falls back to the `title` prop |
| content | Body; falls back to the `content` prop |

### Methods

`open()`, `close()`, `resize()`, `allowClose()`, `getReference()`, `setReference()` and `focusReference()`.

The reference is connected to the panel with `aria-controls` and `aria-expanded`. Use Trigger for unstyled positioning. Popover has no `defaultStyle`, `popoverClass`, or `elevation`; customize with tokens, `content-class`, or `content-style`.

## Public CSS variables

Defaults below are the actual :root values. Prefer component variables for customization; internal positioning variables are not public APIs.

| Variable | Default | Purpose |
| --- | --- | --- |
| `--mp-popover-background` | `var(--mp-sys-color-surface-overlay)` | Panel and arrow background |
| `--mp-popover-text-color` | `var(--mp-sys-color-content-secondary)` | Content foreground |
| `--mp-popover-border-color` | `var(--mp-sys-color-border-default)` | Panel and arrow border color |
| `--mp-popover-border-width` | `1px` | Panel and arrow border width |
| `--mp-popover-border-radius` | `var(--mp-sys-radius-md)` | Panel corner radius |
| `--mp-popover-box-shadow` | `0 3px 3px -2px var(--mp-shadow-key-umbra-opacity), 0 3px 4px 0 var(--mp-shadow-key-penumbra-opacity), 0 1px 8px 0 var(--mp-shadow-key-ambient-opacity)` | Panel shadow; platform-specific |
| `--mp-popover-arrow-z-index` | `1` | Arrow layer inside this popup |
| `--mp-popover-padding-horizontal` | `var(--mp-sys-space-7)` | Horizontal content padding |
| `--mp-popover-padding-vertical` | `var(--mp-sys-space-6)` | Vertical content padding |
| `--mp-popover-font-size` | `var(--mp-sys-font-size-md)` | Content font size |
| `--mp-popover-line-height` | `var(--mp-line-height)` | Content line height |
| `--mp-popover-title-text-color` | `var(--mp-sys-color-content-primary)` | Title foreground |
| `--mp-popover-title-font-size` | `var(--mp-sys-font-size-lg)` | Title font size |
| `--mp-popover-title-font-weight` | `var(--mp-sys-font-weight-medium)` | Title font weight |
| `--mp-popover-title-content-gap` | `var(--mp-sys-space-2)` | Title/body gap |
| `--mp-popover-animation-duration` | `var(--mp-sys-motion-duration-standard)` | Enter/leave duration; reduced-motion may override |

Maple dark retains a 2px corner radius. Shadows remain platform-specific. Panel and arrow share background and border tokens, even if Trigger CSS loads last.

With Teleport, apply variables to the actual popup scope (for example via `popup-style`); variables on the reference button do not automatically inherit into the popup.
