# Tooltip

Provides a short description for a control, icon, or truncated text. It responds to hover and keyboard focus by default. Use Popover for interactive content.

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
