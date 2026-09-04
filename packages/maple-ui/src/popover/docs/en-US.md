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

const placement = ref('cover-top-start')
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
  'cover-top',
  'cover-top-start',
  'cover-top-end',
  'cover-bottom',
  'cover-bottom-start',
  'cover-bottom-end',
  'cover-left',
  'cover-right',
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

Use `same-width` to make the popover and trigger the same width.

```html
<template>
  <mp-popover same-width>
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
| `placement`     | Popover popup placement                                                                                                         | _Placement_          | `cover-top-start` |
| `strategy`       | Popover position strategy, optional value is `absolute` `fixed` | _string_              | `absolute`           |
| `offset-x`      | The x-axis offset, relative to the popover-aligned position                                                                     | _number \| string_           | `0` |
| `offset-y`      | The y-axis offset, relative to the popover-aligned position                                                                     | _number \| string_           | `0` |
| `popup-container`      | The location of the popover mount                                                                                               | _TeleportProps['to'] \| false_ | `body`            |
| `disabled`      | Whether to disable the popover                                                                                                  | _boolean_            | `false`           |
| `trigger`       | Popover trigger method, optional value is `click` `hover` `manual` `contextMenu`  | _string_  | `click`           |
| `reference` | The trigger element associated with the popover, the `string` type is the descendant element selector of the popover component, the `HTMLElement` type is any specified element node | _string \| HTMLElement_ | `-` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _string \| number \| boolean_|   `true`    |
| `same-width`    | Whether to same width as trigger element                                                                                     | _boolean_ | `false`           |
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
| `cover-top` | Top center position, overlay trigger    |
| `cover-top-start` | Top left position, overlay trigger      |
| `cover-top-end` | Top right position, overlay trigger     |
| `cover-bottom` | Bottom center position, overlay trigger |
| `cover-bottom-start` | Bottom left position, overlay trigger   |
| `cover-bottom-end` | Bottom right position, overlay trigger  |
| `cover-left` | Left center position, overlay trigger   |
| `cover-right` | Right center position, overlay trigger |

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
