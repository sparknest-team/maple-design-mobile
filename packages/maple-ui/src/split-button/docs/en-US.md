# SplitButton

Demo text follows the site language selector. Middle cards and the right-hand mobile collection load the same Vue source without activating a local locale dictionary.

Disabled segments reuse Button disabled colors and suppress interaction feedback. Disabling the entire group also removes its elevation; disabling only the menu button blocks menu opening and closes an uncontrolled open menu.

Both segments inherit the same variant, status and custom colors. The arrow uses the icon slot; its layout does not change the shared palette.

### Introduction

Combines a primary action button with a menu of related actions. The main button performs the action and the trailing button opens the menu.

Examples use `Message.info(...)`, supported on both platforms. Selection closes the menu by default; only the repeated-selection example keeps it open while showing a Message. The outline / text arrow retains a transparent background.

## Basic examples

### Basic usage

The main button publishes; the arrow opens related actions. Options have stable values and include a disabled action.

```demo
../example/basic.vue
```

## Appearance and states

### Variants

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `variant` | Button group variant | Variants |
| `disabled` | Whether the entire split button is disabled | Disabled states |
| `button-props` | Props for the primary button | Disabled states |
| `trigger-button-props` | Props for the menu trigger button | Disabled states |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Appearance configuration comparison |
<!-- demo-config-notes:end -->


Compare default, outline, tonal and text variants.

```demo
../example/variants.vue
```

### Disabled states

Compare disabling the whole group, only the main button and only the menu button. Overall disabled cannot be overridden by disabled: false on either child.

```demo
../example/disabled.vue
```

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Five sizes

All five sizes are supported: xs, sm, md (default), lg and xl. Examples wrap on narrow screens.

#### Appearance combinations

Use this example for a primary action and secondary menu. Adjust status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

```demo
../example/demos/appearance-lab.vue
```

## Content and presentation

### Popup and repeated selection

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Popup and repeated selection |
| `offset-y` | Vertical menu offset | Popup and repeated selection |
| `popup-max-height` | Maximum menu height | Popup and repeated selection |
| `hide-on-select` | Close the menu after selection | Popup and repeated selection |
<!-- demo-config-notes:end -->


Use bottom-start, an 8px vertical offset and a 160px maximum height. With hide-on-select=false, repeated selections keep the menu open and display the latest value.

```demo
../example/popup.vue
```

## Customization and slots

### Custom icon

Rotate the same arrow icon on both platforms using the open slot parameter.

```demo
../example/custom-icon.vue
```

## Interaction and control

### Controlled menu

Use `@click.stop` on external controls so the opening click is not also treated as an outside click. Other outside clicks still close the menu.

Use v-model:open to synchronize external controls, the trigger and selection-driven closing.

```demo
../example/controlled.vue
```

## Async and dynamic data

### Async action

Use an async @click handler and control button-props.loading with business state. Reset loading in finally on both success and failure; the counter shows completed operations.

```demo
../example/async-action.vue
```

## Reading direction

The primary action sits at reading start and the menu button at reading end. Direction changes neither swap actions nor select a value. Enter/Space retains native button behavior. Up/Down opens the menu and skips disabled items; Home/End focuses boundaries, Enter selects and Escape closes and restores focus. Popovers inherit the reference direction; start/end alignment follows reading direction while explicit left/right remains physical. Downward slot graphics are not mirrored.

## API

### Props

| Arguments | Description | Type | Default |
| ---------------------- | ------------------------------------ | -------------------------------- | ----------- |
| `open` | Whether the menu is open. Supports `v-model:open` | _boolean_ | `undefined` |
| `default-open` | Whether the menu is open initially | _boolean_ | `false` |
| `disabled` | Whether the entire split button is disabled | _boolean_ | `false` |
| `status` | Button group semantic status | _SemanticStatus_ | `default` |
| `variant` | Button group variant | _ButtonVariant_ | `default` |
| `size` | Button group size | _ComponentSize_ | `md` |
| `color` | Background color | _string_ | `''` |
| `text-color` | Custom text color | _string_ | `''` |
| `elevation` | Button group elevation | _boolean \| number_ | `true` |
| `button-props` | Props for the primary button | `Partial<ButtonProps>` | `undefined` |
| `trigger-button-props` | Props for the menu trigger button | `Partial<ButtonProps>` | `undefined` |
| `trigger` | Menu trigger method | _TriggerEvent \| TriggerEvent[]_ | `click` |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | _MenuPosition_ | `bottom` |
| `popup-container` | Menu mount container | _PopupContainer_ | `body` |
| `popup-max-height` | Maximum menu height | _boolean \| number_ | `true` |
| `popup-class` | Menu popup class | _string \| array \| object_ | `undefined` |
| `offset-x` | Horizontal menu offset | _string \| number_ | `0` |
| `offset-y` | Vertical menu offset | _string \| number_ | `0` |
| `hide-on-select` | Close the menu after selection | _boolean_ | `true` |

### Events

| Event | Description | Callback arguments |
| ------------- | -------------------------- | ---------------------- |
| `update:open` | Emitted when an open-state update is requested | `open: boolean` |
| `open-change` | Emitted when the menu open state changes | `open: boolean` |
| `click` | Emitted when the primary button is clicked | `event: Event` |
| `select` | Emitted when a menu option is selected | `value, option, event` |

### Slots

| Slot | Description | Arguments |
| --------- | ---------------- | --------------- |
| `default` | Primary button content | `-` |
| `icon` | Menu trigger button icon | `open: boolean` |
| `content` | Menu content | `-` |

### Asynchronous actions and click semantics

click is a normal emitted event and supports async handlers. Business state controls loading; restore it in finally. Listener Promises do not automatically drive loading. Disabled/loading links have no effective href.

```html
<script setup>
import { ref } from 'vue'
const publishing = ref(false)
const publish = async () => {
  if (publishing.value) return
  publishing.value = true
  try { await new Promise((resolve) => setTimeout(resolve, 800)) }
  finally { publishing.value = false }
}
</script>

<template>
  <mp-split-button :button-props="{ loading: publishing }" @click="publish">
    Publish
    <template #content><mp-menu-option label="Save draft" /></template>
  </mp-split-button>
</template>
```

`click` retains Button's `onClick` callback-prop semantics, supporting `@click` without an additional emit. Main-button clicks bubble without opening the menu. Outer disabled overrides both buttons’ disabled configuration.

### Instance methods

| Method | Description |
| -------- | -------------------------- |
| open() | Request menu opening; disabled prevents opening |
| close() | Request menu closing |
| resize() | Recalculate menu position |

Controlled open requests updates only; callers update the binding. offset-x/offset-y use screen X/Y axes; numbers are px and length strings use existing conversion tools.

Both platforms keep independent copies of bodies, props, style dependencies and contract tests. Menu retains local platform adaptation; instances are not shared.


### Placement semantics and configuration

The menu side passes through the internal Menu placement to Trigger and uses MenuPlacement, without a second positioning entry.
