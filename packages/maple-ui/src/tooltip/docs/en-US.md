# Tooltip

Provides a short description for a control, icon, or truncated text. It responds to hover and keyboard focus by default. Use Popover for interactive content.

## Basic examples

### Basic usage

```demo
../example/demos/basic-usage.vue
```

## Appearance and states

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Size

Tooltip implements only `md` and `xs`; the default is `md`.

#### Appearance combinations

Use this example for supplementary descriptions on hover. Adjust status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

```demo
../example/demos/appearance-lab.vue
```

## Layout and arrangement

### Placement, offset and trigger

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | Hint content | Placement, offset and trigger |
| `placement` | Preferred popup side relative to the trigger, default top. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Placement, offset and trigger |
| `popup-translate` | Additional screen-axis translation | Placement, offset and trigger |
| `trigger` | Interaction | Placement, offset and trigger |
<!-- demo-config-notes:end -->


```demo
../example/demos/placement.vue
```

```demo
../example/demos/offset.vue
```

```demo
../example/demos/trigger.vue
```

## Content and presentation

### Content, status and color

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `content` | Hint content | Content, status and color, Events and disabled state |
| `color` | Background color | Content, status and color |
| `text-color` | Custom text color | Content, status and color |
| `disabled` | Prevent opening | Events and disabled state |
<!-- demo-config-notes:end -->


```demo
../example/demos/content-slot.vue
```



```demo
../example/demos/custom-color.vue
```

### Events and disabled state

```demo
../example/demos/events.vue
```

```demo
../example/demos/disabled.vue
```

## API

Tooltip inherits Trigger positioning, containers, controlled state, closing policies and public methods.

### Props

| Arguments | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:open | Controlled open state | `boolean` | — |
| default-open | Initial uncontrolled state | `boolean` | `false` |
| content | Hint content | `string` | — |
| status | Panel intent | `default \| primary \| info \| success \| warning \| danger` | `default` |
| size | Implemented sizes | `xs \| md` | `md` |
| color | Background color | `string` | — |
| text-color | Custom text color | `string` | — |
| trigger | Interaction | `TriggerEvent \| TriggerEvent[]` | `['hover', 'focus']` |
| placement | Preferred popup side relative to the trigger, default top. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | `TriggerPlacement` | `top` |
| show-arrow | Show the arrow | `boolean` | `true` |
| popup-offset | Main-axis distance | `number` | `10` |
| popup-translate | Additional screen-axis translation | `[number, number] \| Record` | — |
| popup-container | Render target; false renders locally | `string \| HTMLElement \| false` | `body` |
| reference | External trigger element | `string \| HTMLElement \| SVGElement` | — |
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
| click-outside | Clicked outside the popup |

### Slots

| Slot | Description |
| --- | --- |
| default | Trigger element |
| content | Tooltip `content`; falls back to `content` |

### Methods

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

The content has `role="tooltip"` and is connected to the actual reference with `aria-describedby`. Cedar and Maple keep independent copies of the same implementation; there are no `backgroundColor` or boolean `xs` compatibility aliases.

## Public CSS variables

These are actual :root defaults. Prefer component variables for business customization; internal positioning variables are not public API.

| Variable | Default | Meaning and use case |
| --- | --- | --- |
| `--mp-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` | Content and arrow background |
| `--mp-tooltip-text-color` | `var(--mp-sys-color-content-on-dark)` | Body foreground |
| `--mp-tooltip-status-primary-background` | `var(--mp-sys-color-action-primary)` | Primary content/arrow background |
| `--mp-tooltip-status-info-background` | `var(--mp-sys-color-status-info)` | Info content/arrow background |
| `--mp-tooltip-status-success-background` | `var(--mp-sys-color-status-success)` | Success content/arrow background |
| `--mp-tooltip-status-warning-background` | `var(--mp-sys-color-status-warning)` | Warning content/arrow background |
| `--mp-tooltip-status-danger-background` | `var(--mp-sys-color-status-danger)` | Danger content/arrow background |
| `--mp-tooltip-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` | Primary text; set together with its background |
| `--mp-tooltip-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` | Info text; set together with its background |
| `--mp-tooltip-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` | Success text; set together with its background |
| `--mp-tooltip-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` | Warning text; set together with its background |
| `--mp-tooltip-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` | Danger text; set together with its background |
| `--mp-tooltip-padding-horizontal` | `var(--mp-sys-space-6)` | Horizontal content padding |
| `--mp-tooltip-padding-vertical` | `var(--mp-sys-space-4)` | Vertical content padding |
| `--mp-tooltip-font-size` | `var(--mp-sys-font-size-md)` | Content font size |
| `--mp-tooltip-line-height` | `var(--mp-line-height)` | Content line height |
| `--mp-tooltip-border-radius` | `var(--mp-sys-radius-md)` | Content border radius |
| `--mp-tooltip-max-width` | `350px` | Maximum tooltip-content width |
| `--mp-tooltip-opacity` | `1` | Content/arrow opacity; changes require contrast checks |
| `--mp-tooltip-size-xs-padding-horizontal` | `var(--mp-sys-space-4)` | xs horizontal content padding |
| `--mp-tooltip-size-xs-padding-vertical` | `var(--mp-sys-space-2)` | xs vertical content padding |
| `--mp-tooltip-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | xs content font size |
| `--mp-tooltip-animation-duration` | `var(--mp-sys-motion-duration-standard)` | Enter/leave duration; reduced motion may override it |

All built-in themes use opacity 1. Colored solid text follows Button on-dark in both light/dark modes. Maple dark mode retains 4px radius, 14px font and 8px/16px vertical/horizontal padding. Neutral surfaces remain dark in both modes. `color` sets content/arrow backgrounds; `text-color` sets text. Explicit content-style/arrow-style override their respective nodes. Recheck custom colors/opacity.

With Teleport, variables must be in the actual popup scope, for example through `popup-style`. Trigger-button variables do not automatically inherit into popups.
