# Fab

### Intro

The floating action button component, press to display a group of action buttons.

The live preview starts expanded. Actions show a Message and collapse the menu. Changing direction moves the button to a compatible edge. Use click on touch devices; hover is intended for a mouse.

The local preview uses `fixed=false` and `popup-container=false`. Drag mode restores the default body target and viewport positioning; retaining `popup-container=false` would interpret viewport coordinates in a local container. Dragging uses touch gestures. Switching it off returns to the preview container.

The preview scrolls with the page instead of covering the controls or floating button. Drag mode moves the button to the selected viewport corner; switching it off returns the button to the preview.

### Basic Usage

```demo
../example/demos/basic.vue
```

### Theme Color Button

```demo
../example/demos/status.vue
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


### Disabled

```demo
../example/demos/disabled.vue
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
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_|   `true`    |

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
