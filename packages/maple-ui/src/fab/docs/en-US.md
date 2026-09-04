# Fab

### Intro

The floating action button component, press to display a group of action buttons.

### Theme Color Button

```html
<script setup>
import { ref } from 'vue'

const status = ref('primary')
</script>

<template>
  <mp-select v-model="status">
    <mp-option label="default" value="default"/>
    <mp-option label="primary" value="primary"/>
    <mp-option label="info" value="info"/>
    <mp-option label="success" value="success"/>
    <mp-option label="warning" value="warning"/>
    <mp-option label="dangerous" value="danger"/>
  </mp-select>

  <mp-fab :status="status" />
</template>
```

### Trigger Position

```html
<script setup>
import { ref } from 'vue'

const position = ref('right-bottom')
</script>

<template>
  <mp-radio-group v-model="position">
    <mp-radio value="left-top">left-top</mp-radio>
    <mp-radio value="right-top">right-top</mp-radio>
    <mp-radio value="left-bottom">left-bottom</mp-radio>
    <mp-radio value="right-bottom">right-bottom</mp-radio>
  </mp-radio-group>

  <mp-fab status="primary" :position="position" />
</template>
```

### Trigger Method

```html
<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-radio-group v-model="trigger">
    <mp-radio value="click">click</mp-radio>
    <mp-radio value="hover">hover</mp-radio>
  </mp-radio-group>
   
  <mp-fab status="primary" :trigger="trigger">
    <mp-button status="info" icon-container>
      <m-icon-user-circle-fill />
    </mp-button>
    <mp-button status="success" icon-container>
      <m-icon-checkbox-marked-circle-fill />
    </mp-button>
    <mp-button status="warning" icon-container>
      <m-icon-bell-fill />
    </mp-button>
    <mp-button status="danger" icon-container>
      <m-icon-delete />
    </mp-button>
  </mp-fab>
</template>
```

### Action Menu Popup Direction

```html
<script setup>
import { ref } from 'vue'

const direction = ref('top')
</script>

<template>
   <mp-radio-group v-model="direction">
      <mp-radio value="top">top</mp-radio>
      <mp-radio value="right">right</mp-radio>
      <mp-radio value="bottom">bottom</mp-radio>
      <mp-radio value="left">left</mp-radio>
   </mp-radio-group>

   <mp-fab status="primary" :direction="direction" />
</template>
```

### Drag

```html
<script setup>
import { ref } from 'vue'

const drag = ref(false)
</script>

<template>
  <mp-switch v-model="drag" />

  <mp-fab :drag="drag" />
</template>
```

### Disabled

```html
<script setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>

<template>
   <mp-switch v-model="disabled" />

   <mp-fab :disabled="disabled" />
</template>
```

### Trigger Show/Hide

```html
<script setup>
import { ref } from 'vue'

const open = ref(true)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <mp-button status="primary" @click.stop="toggle">Toggle</mp-button>

  <mp-fab :open="open" status="primary" />
</template>
```

### Action Menu Expand/Collapse

```html
<script setup>
import { ref } from 'vue'

const active = ref(false)

function toggle() {
  active.value = !active.value
}
</script>

<template>
  <mp-button status="primary" @click.stop="toggle">Toggle</mp-button>
   
  <mp-fab v-model:active="active" status="primary">
    <mp-button status="info" icon-container>
      <m-icon-user-circle-fill />
    </mp-button>
    <mp-button status="success" icon-container>
      <m-icon-checkbox-marked-circle-fill />
    </mp-button>
    <mp-button status="warning" icon-container>
      <m-icon-bell-fill />
    </mp-button>
    <mp-button status="danger" icon-container>
      <m-icon-delete />
    </mp-button>
  </mp-fab>
</template>

### Custom Trigger

```html
<template>
  <mp-fab>
    <mp-button status="info" icon-container>
      <m-icon-user-circle-fill />
    </mp-button>
    <mp-button status="success" icon-container>
      <m-icon-checkbox-marked-circle-fill />
    </mp-button>
    <mp-button status="warning" icon-container>
      <m-icon-bell-fill />
    </mp-button>
    <mp-button status="danger" icon-container>
      <m-icon-delete />
    </mp-button>
    
    <template #trigger="{ active }">
      <mp-button class="trigger" status="primary" round>
        <m-icon-heart-fill v-if="active" :size="24" />
        <m-icon-heart-half-full v-else :size="24" />
      </mp-button>
    </template>
   </mp-fab>
</template>

<style>
.trigger {
   width: 64px !important;
   height: 64px !important;
   border-radius: 8px !important;
}

.fade {
   transition-property: opacity, transform;
   opacity: 0;
   transform: rotate(90deg)
}
</style>
```

## API

### Props

| Prop  | Description  | Type      | Default        |
| ------- | ---- | ----- | ---- |
| `v-model:active` | Whether to activate the action menu | _boolean_ | `false` |
| `open` | Whether to show trigger | _boolean_ | `true` |
| `drag` | Drag component props, for deep customization (support `direction` `attraction` `boundary`） | _boolean \| DragProps_ | `false` |
| `status` | Semantic status, optional values are `default` `primary` `info` `success` `warning` `danger` | _string_ | `primary` |
| `position` | trigger position, optional values are `left-top` `right-top` `left-bottom` `right-bottom` | _string_ | `right-bottom` |
| `direction` | Action menu popup direction, optional values are `top` `bottom` `left` `right` | _string_ | `top` |
| `trigger` | trigger method `click` `hover` | _string_ | `click` |
| `disabled` | Whether to disable | _boolean_ | `false` |
| `color` | trigger color | _string_ | `-` |
| `inactive-icon` | Inactive trigger icon | _string_ | `plus` |
| `active-icon` | trigger icon when active | _string_ | `window-close` |
| `inactive-icon-size` | Inactive trigger icon size | _string \| number_ | `-` |
| `active-icon-size` | Trigger icon size when active | _string \| number_ | `-` |
| `inactive-icon-namespace` | Trigger icon namespace when inactive | _string_ | `mp-icon`    |
| `active-icon-namespace` | Trigger icon namespace when active | _string_ | `mp-icon`  |
| `fixed` | Whether to use fixed positioning, set to `false` to enable absolute positioning (absolute positioning prohibited from dragging) | _boolean_ | `true` |
| `z-index` | Same as css z-index, used for custom trigger level | _string \| number_ | `90` |
| `top` | Same as css top, for custom trigger position | _string \| number_ | `-` |
| `bottom` | Same as css bottom, for custom trigger position | _string \| number_ | `-` |
| `left` | Same as css left, for custom trigger position | _string \| number_ | `-` |
| `right` | Same as css right, for custom trigger position | _string \| number_ | `-` |
| `safe-area` | Whether to enable bottom safe area adaptation	 | _boolean_ | `false` |
| `popup-container` | element to which the component mounts | _TeleportProps['to'] \| false_ | `body` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _string \| number \| boolean_|   `true`    |

### Events

| Event | Description  | Arguments  |
| ---- | ---- | ---- |
| `click` | Triggered when the trigger is clicked, not triggered when `disabled` state is `true` | `active: boolean, event: Event` |
| `open` | Fires when the action menu is activated and opened | `-` |
| `opened` | Fires at the end of the animation that activates and opens the action menu | `-` |
| `close` | Triggered when the action menu is deactivated and closed | `-` |
| `closed` | Fires when the animation of inactivating and closing the action menu ends | `-` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Action menu | `-` |
| `trigger` | Trigger | `{ active: boolean }` |


### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable  | Default  |
| ---------- | -------- |
| `--fab-top` | `70px` |
| `--fab-bottom` | `16px` |
| `--fab-left` | `16px` |
| `--fab-right` | `16px` |
| `--fab-trigger-size` | `56px` |
| `--fab-trigger-border-radius` | `50%` |
| `--fab-trigger-inactive-icon-size` | `26px` |
| `--fab-trigger-active-icon-size` | `22px` |
| `--fab-actions-padding` | `10px 0` |
| `--fab-action-margin` | `6px` |
| `--fab-action-size` | `40px` |
| `--fab-action-border-radius` | `50%` |
| `--fab-transition-standard-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` |
