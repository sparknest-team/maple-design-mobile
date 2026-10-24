# Fab

## Examples

### Intro

The floating action button component, press to display a group of action buttons.

The live preview starts expanded. Actions show a Message and collapse the menu. Changing direction moves the button to a compatible edge. Use click on touch devices; hover is intended for a mouse.

The local preview uses `fixed=false` and `popup-container=false`. The drag example keeps the default `fixed=true` to enable dragging and uses `popup-container=false` to keep the button inside the preview container. Drag boundaries use the container dimensions. Dragging uses touch gestures.

The preview and button remain visible when toggling dragging. Switching it off stops dragging. The preview scrolls with the page.

### Basic Usage

```demo
../example/demos/basic.vue
```

### Theme Color Button

```demo
../example/demos/status.vue
```

### Disabled

```demo
../example/demos/disabled.vue
```

### Trigger Position

```demo
../example/demos/position.vue
```

### Trigger Method

```demo
../example/demos/trigger.vue
```

### Action Menu Popup Direction

```demo
../example/demos/direction.vue
```

### Drag

```demo
../example/demos/drag.vue
```

### Trigger Show/Hide

```demo
../example/demos/visibility.vue
```

### Action Menu Expand/Collapse

```demo
../example/demos/controlled.vue
```

### Custom Trigger

```demo
../example/demos/custom-trigger.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->


### visible versus v-if

Use `<mp-fab v-if="showFab" />` when destroying the instance is acceptable; visible is optional. v-if=false destroys FAB, its drag state and action children; remounting reads defaultOpen again. `:visible="showFab"` retains the instance and internal state while hiding its trigger and actions. FAB uses Drag/Teleport, so visible controls the actual content internally; avoid relying on v-show on the Teleport component. The action menu itself still uses open.

## API

Bind `v-model:open` to control the action menu. Otherwise, `defaultOpen` initializes internal state once. `visible` controls the entire widget without resetting its open state. The trigger slot receives `{ open }`.

### Props

| Prop  | Description  | Type      | Default        |
| ------- | ---- | ----- | ---- |
| `v-model:open` | Whether to activate the action menu | _boolean_ | `false` |
| `default-open` | Initial uncontrolled action-menu state, read only at creation | _boolean_ | `false` |
| `visible` | Whether to show the whole widget | _boolean_ | `true` |
| `drag` | Drag component props, for deep customization (support `direction` `attraction` `boundary`） | _boolean \| DragProps_ | `false` |
| `status` | Semantic status, optional values are `default` `primary` `info` `success` `warning` `danger` | _string_ | `primary` |
| `position` | trigger position, optional values are `left-top` `right-top` `left-bottom` `right-bottom` | _string_ | `right-bottom` |
| `direction` | Action menu popup direction, optional values are `top` `bottom` `left` `right` | _string_ | `top` |
| `trigger` | trigger method `click` `hover` | _string_ | `click` |
| `disabled` | Whether to disable | _boolean_ | `false` |
| `color` | trigger color | _string_ | `-` |
| `closed-icon` | Inactive trigger icon | _string_ | `plus` |
| `open-icon` | trigger icon when open | _string_ | `close` |
| `closed-icon-size` | Inactive trigger icon size | _string \| number_ | `-` |
| `open-icon-size` | Trigger icon size when open | _string \| number_ | `-` |
| `fixed` | Whether to use fixed positioning, set to `false` to enable absolute positioning (absolute positioning prohibited from dragging) | _boolean_ | `true` |
| `z-index` | Same as css z-index, used for custom trigger level | _string \| number_ | `90` |
| `top` | Same as css top, for custom trigger position | _string \| number_ | `-` |
| `bottom` | Same as css bottom, for custom trigger position | _string \| number_ | `-` |
| `left` | Same as css left, for custom trigger position | _string \| number_ | `-` |
| `right` | Same as css right, for custom trigger position | _string \| number_ | `-` |
| `safe-area` | Whether to enable bottom safe area adaptation	 | _boolean_ | `false` |
| `popup-container` | element to which the component mounts | _TeleportProps['to'] \| false_ | `body` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_|   `true`    |

### Events

| Event | Description  | Arguments  |
| ---- | ---- | ---- |
| `click` | Triggered when the trigger is clicked, not triggered when `disabled` state is `true` | `open: boolean, event: Event` |
| `open` | Fires when the action menu is activated and opened | `-` |
| `opened` | Fires at the end of the animation that activates and opens the action menu | `-` |
| `close` | Triggered when the action menu is deactivated and closed | `-` |
| `closed` | Fires when the animation of inactivating and closing the action menu ends | `-` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Action menu | `-` |
| `trigger` | Trigger | `{ open: boolean }` |


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
| `--mp-fab-trigger-inactive-icon-size` | `26px` |
| `--mp-fab-trigger-active-icon-size` | `22px` |
| `--fab-actions-padding` | `10px 0` |
| `--fab-action-margin` | `6px` |
| `--fab-action-size` | `40px` |
| `--fab-action-border-radius` | `50%` |
| `--fab-transition-standard-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` |
