# Tooltip

SSR limitation: a trigger slot node using both `v-for` and `v-memo` can make server rendering fail. Remove `v-memo` from that slot node when rendering on the server; ordinary `v-for` remains supported. In Vue 3.5.13, a standalone dynamic `v-memo` can also fail in this slot. The same limitation can affect the `content` slot; remove `v-memo` there for server rendering.

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

## Usage notes

### Configuration

These are actual :root defaults. Prefer component variables for business customization; internal positioning variables are not public API.

With Teleport, variables must be in the actual popup scope, for example through `popup-style`. Trigger-button variables do not automatically inherit into popups.

## API

Tooltip inherits Trigger positioning, container, controlled state, and `close` policies. Its defaults are `hide-empty=true` and `auto-fit-transform-origin=true`; an omitted `animation-name` uses the Tooltip animation. Empty content hides only the tooltip and does not change `open`; component nodes count as content even when they render no content, producing an empty tooltip and description relationship. Conditionally render the component node in the slot when its content may be empty. The instance exposes seven methods: `open`, `close`, `resize`, `allowClose`, `getReference`, `focusReference`, and `setReference`.

### Tooltip Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| v-model:open | Controlled open state | `boolean` | — |
| default-open | Initial uncontrolled state | `boolean` | `false` |
| content | Hint content | `string` | — |
| status | Panel intent | `default \| primary \| info \| success \| warning \| danger` | `default` |
| size | Implemented sizes | `xs \| md` | `md` |
| color | Background color | `string` | — |
| text-color | Custom text color | `string` | — |
| trigger | Interaction | `TriggerEvent \| TriggerEvent[]`<br>`TriggerEvent: 'manual' \| 'focus' \| 'hover' \| 'click' \| 'contextMenu'` | `['hover', 'focus']` |
| placement | Preferred popup side relative to the trigger, default top. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | `TriggerPlacement`<br>`'left' \| 'right' \| 'bottom' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `top` |
| show-arrow | Show the arrow | `boolean` | `true` |
| popup-offset | Main-axis distance | `number` | `10` |
| popup-translate | Additional screen-axis translation | `[number, number] \| Record` | — |
| popup-container | Render target; false renders locally | `string \| HTMLElement \| false` | `body` |
| reference | External trigger element | `string \| HTMLElement \| SVGElement` | — |
| disabled | Prevent opening | `boolean` | `false` |
| unmount-on-close | Unmount after close | `boolean` | `true` |

### Tooltip Events

| Event | Description |
| --- | --- |
| update:open | Requests a controlled open-state change |
| open-change | Requests any open-state change |
| open | Opening starts |
| opened | Enter transition completes |
| close | Closing starts |
| closed | Leave transition completes |
| click-outside | Clicked outside the popup |

### Tooltip Slots

| Slot | Description |
| --- | --- |
| default | Trigger element |
| content | Tooltip `content`; falls back to `content` |

### Tooltip Methods

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

Tooltip content has role="tooltip". While open, its ID is added to the actual reference aria-describedby without duplicating existing descriptions. Closing, changing references or unmounting removes only that tooltip ID and preserves other descriptions. Use color for backgrounds and text-color for text; backgroundColor and boolean xs props are not supported.

## CSS Variables

All built-in themes use opacity 1. Colored solid text follows Button on-dark in both light/dark modes. Maple dark mode retains 4px radius, 14px font and 8px/16px vertical/horizontal padding. Neutral surfaces remain dark in both modes. `color` sets content/arrow backgrounds; `text-color` sets text. Explicit content-style/arrow-style override their respective nodes. Recheck custom colors/opacity.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-tooltip-animation-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` | `background-color` |
| `--mp-tooltip-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-tooltip-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-tooltip-line-height` | `var(--mp-line-height)` | `line-height` |
| `--mp-tooltip-max-width` | `350px` | `max-width` |
| `--mp-tooltip-opacity` | `1` | `opacity` |
| `--mp-tooltip-padding-horizontal` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-tooltip-padding-vertical` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-tooltip-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-tooltip-size-xs-padding-horizontal` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-tooltip-size-xs-padding-vertical` | `var(--mp-sys-space-2)` | `padding` |
| `--mp-tooltip-status-danger-background` | `var(--mp-sys-color-status-danger)` | `background-color` |
| `--mp-tooltip-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-info-background` | `var(--mp-sys-color-status-info)` | `background-color` |
| `--mp-tooltip-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-primary-background` | `var(--mp-sys-color-action-primary)` | `background-color` |
| `--mp-tooltip-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-success-background` | `var(--mp-sys-color-status-success)` | `background-color` |
| `--mp-tooltip-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-warning-background` | `var(--mp-sys-color-status-warning)` | `background-color` |
| `--mp-tooltip-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-tooltip-background: var(--mp-sys-color-surface-tooltip);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
