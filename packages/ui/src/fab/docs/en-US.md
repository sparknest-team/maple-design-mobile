# Fab

### Intro

The floating action button component, press to display a group of action buttons.

The live preview starts expanded. Actions show a Message and collapse the menu. Changing direction moves the button to a compatible edge. Use click on touch devices; hover is intended for a mouse.

The local preview uses `fixed=false` and `popup-container=false`. The drag example keeps the default `fixed=true` to enable dragging and uses `popup-container=false` to keep the button inside the preview container. Drag boundaries use the container dimensions. Dragging uses touch gestures.

The preview and button remain visible when toggling dragging. Switching it off stops dragging. The preview scrolls with the page.

## Basic examples

### Basic Usage

```demo
../example/demos/basic.vue
```

## Appearance and states

### Theme Color Button

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `fixed` | Whether to use fixed positioning, set to `false` to enable absolute positioning (absolute positioning prohibited from dragging) | Theme Color Button, Disabled |
| `popup-container` | element to which the component mounts | Theme Color Button, Disabled |
| `status` | Semantic status, optional values are `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | Theme Color Button, Disabled |
| `disabled` | Whether disabled | Disabled |
<!-- demo-config-notes:end -->


```demo
../example/demos/status.vue
```

### Disabled

```demo
../example/demos/disabled.vue
```

## Appearance and positioning

### Trigger Position

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `fixed` | Whether to use fixed positioning, set to `false` to enable absolute positioning (absolute positioning prohibited from dragging) | Trigger Position |
| `popup-container` | element to which the component mounts | Trigger Position |
| `position` | Corner of the button itself within the screen or positioning container, default bottom-right. Corner values use vertical-first spelling | Trigger Position |
<!-- demo-config-notes:end -->


```demo
../example/demos/position.vue
```

## Actions and interaction

### Trigger Method

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `popup-container` | element to which the component mounts | Trigger Method, Action Menu Popup Direction, Drag |
| `fixed` | Whether to use fixed positioning, set to `false` to enable absolute positioning (absolute positioning prohibited from dragging) | Trigger Method, Action Menu Popup Direction, Trigger Show/Hide |
| `status` | Semantic status, optional values are `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | Trigger Method, Action Menu Popup Direction, Trigger Show/Hide |
| `trigger` | Trigger: `click`/`hover` | Trigger Method |
| `position` | Corner of the button itself within the screen or positioning container, default bottom-right. Corner values use vertical-first spelling | Action Menu Popup Direction |
| `placement` | Action-menu placement relative to the button, default top; no automatic flipping. Does not change the button position | Action Menu Popup Direction |
<!-- demo-config-notes:end -->


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

### visible versus v-if

Use `<mp-fab v-if="showFab" />` when destroying the instance is acceptable; visible is optional. v-if=false destroys FAB, its drag state and action children; remounting reads defaultOpen again. `:visible="showFab"` retains the instance and internal state while hiding its trigger and actions. FAB uses Drag/Teleport, so visible controls the actual content internally; avoid relying on v-show on the Teleport component. The action menu itself still uses open.

The default icon button has a localized name; pass `aria-label` or `aria-labelledby` to customize it. When actions exist, the trigger also exposes `aria-expanded` and `aria-controls`. Bind the `triggerProps` slot value to a custom focusable button; the application owns its disabled state.

Hover mode supports Enter/Space on the trigger. It stays open while focus remains on the trigger or actions after the pointer leaves, and closes when both pointer and focus leave. Escape requests close and returns focus to the trigger when focus was in the actions. Action clicks do not close automatically; control `v-model:open` in the application when desired.

`open` and `close` are interaction requests which a controlled parent may reject. External model changes and disabling do not necessarily emit matching request events. `opened`/`closed` receive the action element after the animation. Position and placement use physical sides without automatic flipping; `FabDrag` is a boolean or an object with `axis`, `attraction`, and `boundary`.

## Usage notes

### Configuration

When importing on demand, also import `@maple-design/ui-vue/fab/style`, or use the full stylesheet `@maple-design/ui-vue/style`.

## API

`open`/`update:open` control the action menu through `v-model:open`. Without binding, `defaultOpen` initializes internally maintained state. `visible` controls the whole component without changing saved menu-`open` state. The `trigger` slot receives `{ open, triggerProps }`; bind `triggerProps` to its actual focusable button.

### Fab Props

| Prop | Description | Type | Default |
| ------------------ | ----------------------------------------------------------------- | ---------- | ---------------- |
| `v-model:open` | Whether to activate the action menu | _boolean_ | `false` |
| `default-open` | Initial uncontrolled action-menu state, read only at creation | _boolean_ | `false` |
| `visible` | Whether to show the whole widget | _boolean_ | `true` |
| `drag` | Drag component props, for deep customization (support `axis` `attraction` `boundary`） | _FabDrag_ | `false` |
| `status` | Semantic status, optional values are `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `primary` |
| `position` | Corner of the button itself within the screen or positioning container, default bottom-right. Corner values use vertical-first spelling | _string_ | `bottom-right` |
| `placement` | Action-menu placement relative to the button, default top; no automatic flipping. Does not change the button position | _string_ | `top` |
| `trigger` | Trigger: `click`/`hover` | _string_ | `click` |
| `disabled` | Whether disabled | _boolean_ | `false` |
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
| `safe-area` | Whether to respect the vertical and horizontal safe areas at the corner selected by position | _boolean_ | `false` |
| `popup-container` | element to which the component mounts | _TeleportProps['to'] \| false_ | `body` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_ | `true` |

### Fab Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered when the trigger is clicked, not triggered when `disabled` state is `true` | `open: boolean, event: Event` |
| `open` | Fires when the action menu is activated and opened | `-` |
| `opened` | The action region finished opening | `element: Element` |
| `close` | Triggered when the action menu is deactivated and closed | `-` |
| `closed` | The action region finished closing | `element: Element` |

### Fab Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `default` | Action menu | `-` |
| `trigger` | Trigger | `{ open: boolean, triggerProps: FabTriggerProps }` |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-fab-action-border-radius` | `50%` | `border-radius` |
| `--mp-fab-action-margin` | `6px` | `margin` |
| `--mp-fab-action-size` | `40px` | `height`, `min-width`, `width` |
| `--mp-fab-actions-padding` | `10px 0` | `padding` |
| `--mp-fab-bottom` | `16px` | `bottom` |
| `--mp-fab-left` | `16px` | `left` |
| `--mp-fab-right` | `16px` | `right` |
| `--mp-fab-top` | `70px` | `top` |
| `--mp-fab-transition-standard-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | `transition` |
| `--mp-fab-trigger-active-icon-size` | `22px` | `font-size` |
| `--mp-fab-trigger-border-radius` | `50%` | `border-radius` |
| `--mp-fab-trigger-inactive-icon-size` | `26px` | `font-size` |
| `--mp-fab-trigger-size` | `56px` | `height`, `min-width`, `width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-fab-action-border-radius: 50%;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
