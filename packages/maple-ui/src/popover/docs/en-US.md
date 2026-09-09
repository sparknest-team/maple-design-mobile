# Popover

### Intro
Displays a popover when the element is clicked, 
and changes the display position of the popover by controlling the placement and offset.

### Basic Usage

```html
<template>
  <mp-popover>
    <mp-button status="primary">Basic Usage</mp-button>
    
    <template #content>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
    </template>
  </mp-popover>
</template>
```

### Placement

```html
<script setup>
import { ref } from 'vue'

const placement = ref('bottom-start')
const placementOptions = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
]
</script>

<template>
  <mp-select :hint="false" v-model="placement">
    <mp-option 
      v-for="(item, index) in placementOptions" 
      :key="index"
      :label="item" 
    />
  </mp-select>
  
  <div class="placement-container">
    <mp-popover :placement="placement">
      <mp-button status="primary">
        <m-icon-star-fill />
      </mp-button>
      <template #content>
        <mp-cell>Option</mp-cell>
        <mp-cell>Option</mp-cell>
        <mp-cell>Option</mp-cell>
      </template>
    </mp-popover>
  </div>
</template>

<style>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### Offset

The offset of the Popover popup can be set with `offset-x` and `offset-y`.

```html
<template>
  <mp-popover offset-x="36px" offset-y="18px">
    <mp-button status="primary">Offset</mp-button>
    
    <template #content>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
    </template>
  </mp-popover>
</template>
```

### Same Width As Trigger Element

Use `auto-fit-popup-width` to make the popover and trigger the same width.

```html
<template>
  <mp-popover auto-fit-popup-width>
    <mp-button status="primary">Same width as trigger element</mp-button>
    
    <template #content>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
    </template>
  </mp-popover>
</template>
```

### Trigger

Use `trigger` to change the trigger method of popover display, 
the optional values are `click` `hover` `manual` `contextMenu`

```html
<template>
  <mp-popover trigger="hover">
    <mp-button status="primary">Trigger</mp-button>
    
    <template #content>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
    </template>
  </mp-popover>
</template>
```

### Events

```html
<script setup>
import { Message } from '@maplejs/maple-ui'
</script>

<template>
  <mp-popover
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <mp-button status="primary">Events</mp-button>
    
    <template #content>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
    </template>
  </mp-popover>
</template>
```

### Disabled

In the `disabled` state, the popover will no longer be opened.

```html
<template>
  <mp-popover disabled>
    <mp-button status="primary" disabled>Disabled</mp-button>
    
    <template #content>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
      <mp-cell>Option</mp-cell>
    </template>
  </mp-popover>
</template>
```

### Two-way Binding

Two-way binding control popover show and hide via `v-model:open`.

```html
<script setup>
import { ref } from 'vue'

const show = ref(false)

function closeMenu() { 
  show.value = false 
}
</script>

<template>
  <mp-popover v-model:open="open">
    <mp-button status="primary">Two-way binding</mp-button>

    <template #content>
      <mp-cell @click="closeMenu">Option</mp-cell>
      <mp-cell @click="closeMenu">Option</mp-cell>
      <mp-cell @click="closeMenu">Option</mp-cell>
    </template>
  </mp-popover>
</template>
```

### Notice

Popover is an `inline-block` element that displays the popover when clicked through the default slot.
If you want the Popover to be on its own line, 
it is recommended to wrap a `block` element.

## API

### Props

| Prop            | Description                                                                                                                  | Type              | Default           |
|-----------------|------------------------------------------------------------------------------------------------------------------------------|----------------------|-------------------|
| `v-model:open`  | Whether to show the popover                                                                                                     | _boolean_             | `false`         |
| `placement`     | Popover popup placement                                                                                                         | _Placement_          | `bottom` |
| `strategy`       | Popover position strategy, optional value is `absolute` `fixed` | _string_              | `absolute`           |
| `offset-x`      | The x-axis offset, relative to the popover-aligned position                                                                     | _number \| string_           | `0` |
| `offset-y`      | The y-axis offset, relative to the popover-aligned position                                                                     | _number \| string_           | `0` |
| `popup-container`      | The location of the popover mount                                                                                               | _TeleportProps['to'] \| false_ | `body`            |
| `disabled`      | Whether to disable the popover                                                                                                  | _boolean_            | `false`           |
| `trigger`       | Popover trigger method, optional value is `click` `hover` `manual` `contextMenu`  | _string_  | `click`           |
| `reference` | The trigger element associated with the popover, the `string` type is the descendant element selector of the popover component, the `HTMLElement` type is any specified element node | _string \| HTMLElement_ | `-` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_|   `true`    |
| `auto-fit-popup-width`    | Whether to same width as trigger element                                                                                     | _boolean_ | `false`           |
| `default-style` | Whether to enable default styles                                                                                             | _boolean_ | `true`            |
| `popover-class` | Class of the popover                                                    | _string_             | `-`            |
| `close-on-click-reference` | Whether to close the popover when clicking the reference element | _boolean_ | `false` |
| `esc-to-close` | Whether to support keyboard ESC to close the popover | _boolean_ | `true`  |
| `align-point` | Whether the popup follows the mouse (used with `contextMenu`) | _boolean_ | `false` |

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
| `bottom` | Top left position, overlay trigger      |

### Methods

| Method   | Description                     | Arguments | Return |
| --- |---------------------------------| --- | --- |
| `open` | Open Popover                       | `-` | `-` |
| `close` | Close Popover                      | `-` | `-` |
| `resize` | This method can be called to redraw when the default slot element of Popover changes its position and size | `-` | `-` |
| `setReference` ***3.7.2*** | Set the trigger element associated with the popover | `reference: consistent with the reference of the component attribute` | `-` |

### Events

| Event    | Description | Arguments |
| --- | --- | --- |
| `open` | Triggered when the popover is opened | `-` |
| `opened` | Triggered when the open popover animation ends | `-` |
| `close` | Triggered when the popover is closed | `-` |
| `closed` | Triggered when the closing popover animation ends | `-` |
| `click-outside` | Triggered when clicking outside the popover | `event: Event` |

### Slots

| Name | Description | SlotProps |
| --- |----------------------| --- |
| `default` | Popover trigger element | `-` |
| `content` | Popover content      | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--popover-background-color` | `var(--color-fill-2)` |
| `--popover-border-radius` | `2px` |

覆盖触发元素使用 `cover`，placement 仅使用标准十二方位。迁移：旧 cover-top → bottom + cover；cover-bottom → top + cover；cover-left → right + cover；cover-right → left + cover；start/end 后缀保留。默认 cover=false。

## Foundation contract alignment

`open` is controlled; use `default-open` for an initially open uncontrolled popup, or accept updates through `v-model:open`. SVG icons and fragment component roots work directly as trigger elements. Only the state and reference foundations are aligned in this batch; positioning and full API alignment remain pending.

`unmountOnClose` defaults to false to retain hidden content. Set it to true to unmount after leave completes.

## Shared component body

Tooltip/Popover use independent copies of the same component body. Trigger owns controlled/uncontrolled state and lifecycle; update:open precedes open-change, actual changes emit open/close, and transition completion emits opened/closed. Initial open also emits open once. Interaction/render props and open/close/resize/allowClose/getReference/setReference/focusReference are forwarded explicitly. setReference() restores the slot reference.

Platform defaults remain unchanged. Maple uses bottom placement, zero delay, no arrow and retained content; Tooltip defaults to hover and Popover to click. Cedar uses top, hover, 100 ms delay, arrows and unmounting. Pass explicit props when matching behavior is required.
Popover supports title/content props and slots. Its content now has title/body children; update CSS that assumes slot nodes are direct children of the outer panel.
