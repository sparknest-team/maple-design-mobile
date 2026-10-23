# Tooltip

Provides a short description for a control, icon, or truncated text. It responds to hover and keyboard focus by default. Use Popover for interactive content.

## Examples

### Basic usage

```demo
../example/demos/basic-usage.vue
```

### Size

Tooltip implements only `md` and `xs`; the default is `md`.

```demo
../example/demos/size.vue
```

### Content, status and color

```demo
../example/demos/content-slot.vue
```

```demo
../example/demos/theme-color-tooltip.vue
```

```demo
../example/demos/custom-color.vue
```

### Placement, offset and trigger

```demo
../example/demos/placement.vue
```

```demo
../example/demos/offset.vue
```

```demo
../example/demos/trigger.vue
```

### Events and disabled state

```demo
../example/demos/events.vue
```

```demo
../example/demos/disabled.vue
```

### Appearance combinations

Use this example for supplementary descriptions on hover. Adjust status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

Tooltip inherits Trigger positioning, container, controlled state, dismissal and exposed methods.

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:open | Controlled open state | `boolean` | — |
| default-open | Initial uncontrolled state | `boolean` | `false` |
| content | Tooltip content | `string` | — |
| status | Panel intent | `default \| primary \| info \| success \| warning \| danger` | `default` |
| size | Implemented sizes | `xs \| md` | `md` |
| color | Custom background | `string` | — |
| text-color | Custom text color | `string` | — |
| trigger | Interaction | `TriggerEvent \| TriggerEvent[]` | `['hover', 'focus']` |
| placement | Preferred placement | `TriggerPlacement` | `top` |
| show-arrow | Show the arrow | `boolean` | `true` |
| popup-offset | Main-axis distance | `number` | `10` |
| popup-translate | Additional screen-axis translation | `[number, number] \| Record` | — |
| popup-container | Teleport target; false renders inline | `string \| HTMLElement \| false` | `body` |
| reference | External reference element | `string \| HTMLElement \| SVGElement` | — |
| disabled | Prevent opening | `boolean` | `false` |
| unmount-on-close | Unmount after close | `boolean` | `true` |

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
| content | Tooltip content; falls back to the `content` prop |

### Methods

`open()`, `close()`, `resize()`, `allowClose()`, `getReference()`, `setReference()` and `focusReference()`.

The content has `role="tooltip"` and is connected to the actual reference with `aria-describedby`. Cedar and Maple keep independent copies of the same implementation; there are no `backgroundColor` or boolean `xs` compatibility aliases.

## Public CSS variables

Defaults below are the actual :root values. Prefer component variables for customization; internal positioning variables are not public APIs.

| Variable | Default | Purpose |
| --- | --- | --- |
| `--mp-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` | Panel and arrow background |
| `--mp-tooltip-text-color` | `var(--mp-sys-color-content-on-dark)` | Content foreground |
| `--mp-tooltip-status-primary-background` | `var(--mp-sys-color-action-primary)` | primary status panel/arrow background |
| `--mp-tooltip-status-info-background` | `var(--mp-sys-color-status-info)` | info status panel/arrow background |
| `--mp-tooltip-status-success-background` | `var(--mp-sys-color-status-success)` | success status panel/arrow background |
| `--mp-tooltip-status-warning-background` | `var(--mp-sys-color-status-warning)` | warning status panel/arrow background |
| `--mp-tooltip-status-danger-background` | `var(--mp-sys-color-status-danger)` | danger status panel/arrow background |
| `--mp-tooltip-status-primary-text-color` | `var(--mp-sys-color-content-on-bright)` | primary status foreground; pair with its fill |
| `--mp-tooltip-status-info-text-color` | `var(--mp-sys-color-content-on-bright)` | info status foreground; pair with its fill |
| `--mp-tooltip-status-success-text-color` | `var(--mp-sys-color-content-on-bright)` | success status foreground; pair with its fill |
| `--mp-tooltip-status-warning-text-color` | `var(--mp-sys-color-content-on-bright)` | warning status foreground; pair with its fill |
| `--mp-tooltip-status-danger-text-color` | `var(--mp-sys-color-content-on-bright)` | danger status foreground; pair with its fill |
| `--mp-tooltip-padding-horizontal` | `var(--mp-sys-space-6)` | Horizontal content padding |
| `--mp-tooltip-padding-vertical` | `var(--mp-sys-space-4)` | Vertical content padding |
| `--mp-tooltip-font-size` | `var(--mp-sys-font-size-md)` | Content font size |
| `--mp-tooltip-line-height` | `var(--mp-line-height)` | Content line height |
| `--mp-tooltip-border-radius` | `var(--mp-sys-radius-md)` | Panel corner radius |
| `--mp-tooltip-max-width` | `350px` | Maximum hint width |
| `--mp-tooltip-opacity` | `1` | Content and arrow opacity; recheck contrast |
| `--mp-tooltip-size-xs-padding-horizontal` | `var(--mp-sys-space-4)` | xs size: Horizontal content padding |
| `--mp-tooltip-size-xs-padding-vertical` | `var(--mp-sys-space-2)` | xs size: Vertical content padding |
| `--mp-tooltip-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | xs size: Content font size |
| `--mp-tooltip-animation-duration` | `var(--mp-sys-motion-duration-standard)` | Enter/leave duration; reduced-motion may override |

All built-in themes use opacity 1. Colored fills use on-bright except the deep-orange primary in the Maple light brand, which uses on-dark. Maple dark retains 4px radius, 14px font and 8px/16px vertical/horizontal padding. The neutral surface is dark in both modes. `color` sets panel and arrow backgrounds; `text-color` sets text. Explicit `content-style` / `arrow-style` override their respective nodes. Recheck custom colors/opacity.

With Teleport, apply variables to the actual popup scope (for example via `popup-style`); variables on the reference button do not automatically inherit into the popup.
