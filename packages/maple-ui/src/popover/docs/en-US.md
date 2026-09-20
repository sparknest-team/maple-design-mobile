# Popover

Shows structured, interactive content after the reference is clicked. Use Tooltip for a short, non-interactive description.

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
