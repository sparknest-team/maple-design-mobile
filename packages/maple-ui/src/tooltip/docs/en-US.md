# Tooltip

### Intro

Displays a tooltip when the element is clicked or hovered, 
and changes the display position of the tooltip by controlling the placement and offset.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Content Slot

```demo
../example/demos/content-slot.vue
```

### Placement

```demo
../example/demos/placement.vue
```

### Theme Color

```demo
../example/demos/theme-color-tooltip.vue
```

### Custom Color

```demo
../example/demos/custom-color.vue
```

### Offset

The offset of the Tooltip can be set with `offset-x` and `offset-y`.

```demo
../example/demos/offset.vue
```

### Trigger

Use `trigger` to change the trigger method of tooltip display,
the optional values are `click` and `hover`.

```demo
../example/demos/trigger.vue
```

### Events

```demo
../example/demos/events.vue
```

### Disabled

In the `disabled` state, the tooltip will not be opened.

```demo
../example/demos/disabled.vue
```

## API

### Props

| Prop              | Description                                                 | Type              | Default   |
| ------- |-------------------------------------------------------------|----------------------|-----------|
| `v-model:open` | Whether to show the tooltip                                    | _boolean_             | `false`   |
| `content` | Display content | _string_              | `-`       |
| `color`          | Tooltip background color                                                            | _string_  | `-`       |
| `text-color`  ***3.5.0***   | Tooltip text color                                                                  | _string_  | `-`       |
| `status`           | Tooltip type, can be set to `default` `primary` `info` `success` `warning` `danger` | _string_  | `default` |
| `placement` | Tooltip popup placement                                        | _Placement_          | `bottom`     |
| `strategy`       | Tooltip position strategy, optional value is `absolute` `fixed` | _string_              | `absolute`           |
| `offset-x` | The x-axis offset, relative to the tooltip-aligned position    | _number \| string_   | `0` |
| `offset-y` | The y-axis offset, relative to the tooltip-aligned position    | _number \| string_   | `0` |
| `popup-container` | The location of the tooltip mount                                                     | _TeleportProps['to'] \| false_ | `body`    |
| `auto-fit-popup-width`    | Whether to same width as trigger element                   | _boolean_ | `false`           |
| `disabled` | Whether to disable the tooltip                                                      | _boolean_            | `false`   |
| `trigger` | Tooltip trigger method, optional value is `click` `hover` `manual` | _string_  | `hover`   |
| `reference` | The trigger element associated with the tooltip, the `string` type is the descendant element selector of the menu component, the `HTMLElement` type is any specified element node | _string \| HTMLElement_ | `-` |
| `close-on-click-reference` | Whether to close the menu when clicking the reference element | _boolean_ | `false` |
| `esc-to-close` | Whether to support keyboard ESC to close the tooltip | _boolean_ | `true`  |

### Placement

| Prop | Description                             |
| ------- |-----------------------------------------|
| `top` | Top center position                     |
| `top-start` | Top left position                       |
| `top-end` | Top right position                      |
| `bottom` | Bottom center position                  |
| `bottom-start` | Bottom left position                    |
| `bottom-end` | Bottom right position                   |
| `right` | Right center position                   |
| `right-start` | Top right position                      |
| `right-end` | Bottom right position                   |
| `left` | Left center position                    |
| `left-start` | Top left position                       |
| `left-end` | Bottom left position                    |

### Methods

| Method   | Description     | Arguments | Return |
| --- |---------------------------------| --- | --- |
| `open` | Open `Tooltip`                       | `-` | `-` |
| `close` | Close `Tooltip`                      | `-` | `-` |
| `resize` | This method can be called to redraw when the default slot element of `Tooltip` changes its position and size | `-` | `-` |
| `setReference` ***3.7.2*** | Set the trigger element associated with the `Tooltip` | `reference: consistent with the reference of the component attribute` | `-` |

### Events

| Event    | Description                                         | Arguments |
| --- |-----------------------------------------------------| --- |
| `open` | Triggered when the `Tooltip` is opened              | `-` |
| `opened` | Triggered when the open `Tooltip` animation ends    | `-` |
| `close` | Triggered when the `Tooltip` is closed              | `-` |
| `closed` | Triggered when the closing `Tooltip` animation ends | `-` |
| `click-outside` | Triggered when clicking outside the tooltip | `event: Event` |

### Slots

| Name | Description | SlotProps |
| --- |----------------------| --- |
| `default` | Tooltip trigger element | `-` |
| `content` | Tooltip content         | `-` |
| `click-outside` | Triggered when clicking outside the menu | `event: Event` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--tooltip-opacity` | `0.9` |
| `--tooltip-border-radius` | `4px` |
| `--tooltip-font-size` | `14px` |
| `--tooltip-padding` | `8px 16px` |
| `--tooltip-offset` | `10px` |
| `--tooltip-default-color` | `#616161` |
| `--tooltip-primary-color` | `var(--color-primary)` |
| `--tooltip-info-color` | `var(--color-info)` |
| `--tooltip-success-color` | `var(--color-success)` |
| `--tooltip-warning-color` | `var(--color-warning)` |
| `--tooltip-danger-color` | `var(--color-danger)` |
| `--tooltip-default-text-color` | `#fff` |
| `--tooltip-primary-text-color` | `var(--color-white)` |
| `--tooltip-info-text-color` | `var(--color-white)` |
| `--tooltip-success-text-color` | `var(--color-white)` |
| `--tooltip-warning-text-color` | `var(--color-white)` |
| `--tooltip-danger-text-color` | `var(--color-white)` |

## Foundation contract alignment

`open` is controlled; use `default-open` for an initially open uncontrolled popup, or accept updates through `v-model:open`. SVG icons and fragment component roots work directly as trigger elements. Only the state and reference foundations are aligned in this batch; positioning and full API alignment remain pending.

`unmountOnClose` defaults to false to retain hidden content. Set it to true to unmount after leave completes.

## Shared component body

Tooltip/Popover use independent copies of the same component body. Trigger owns controlled/uncontrolled state and lifecycle; update:open precedes open-change, actual changes emit open/close, and transition completion emits opened/closed. Initial open also emits open once. Interaction/render props and open/close/resize/allowClose/getReference/setReference/focusReference are forwarded explicitly. setReference() restores the slot reference.

Platform defaults remain unchanged. Maple uses bottom placement, zero delay, no arrow and retained content; Tooltip defaults to hover and Popover to click. Cedar uses top, hover, 100 ms delay, arrows and unmounting. Pass explicit props when matching behavior is required.
Tooltip supports backgroundColor (color remains compatible), textColor and xs. Content owns role="tooltip".
