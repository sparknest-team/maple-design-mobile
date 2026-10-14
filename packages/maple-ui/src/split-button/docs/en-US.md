# SplitButton

Demo text follows the site language selector. Middle cards and the right-hand mobile collection load the same Vue source without activating a local locale dictionary.

Disabled segments reuse Button disabled colors and suppress interaction feedback. Disabling the entire group also removes its elevation; disabling only the menu button blocks menu opening and closes an uncontrolled open menu.

Both segments inherit the same variant, status and custom colors. The arrow uses the icon slot without enabling the separate icon-container palette.

### Introduction

Combines a primary action button with a menu of related actions. The main button performs the action and the trailing button opens the menu.

Examples use `Message.info(...)`, supported on both platforms. Selection closes the menu by default; only the repeated-selection example keeps it open while showing a Message. The outline / text arrow retains a transparent background.

### Basic usage

The main button publishes; the arrow opens related actions. Options have stable values and include a disabled action.

```demo
../example/demos/basic-usage.vue
```

### Variants

Compare default, outline, tonal and text variants.

```demo
../example/demos/variants.vue
```

### Five sizes

All five sizes are supported: xs, sm, md (default), lg and xl. Examples wrap on narrow screens.

```demo
../example/demos/sizes.vue
```

### Disabled states

Compare disabling the whole group, only the main button and only the menu button. Overall disabled cannot be overridden by disabled: false on either child.

```demo
../example/demos/disabled.vue
```

### Async action

Return a Promise directly from @click. Auto-loading waits and prevents repeated clicks; the counter shows completed operations.

```demo
../example/demos/async-action.vue
```

### Custom icon

Rotate the same arrow icon on both platforms using the open slot parameter.

```demo
../example/demos/custom-icon.vue
```

### Controlled menu

Use `@click.stop` on external controls so the opening click is not also treated as an outside click. Other outside clicks still close the menu.

Use v-model:open to synchronize external controls, the trigger and selection-driven closing.

```demo
../example/demos/controlled.vue
```

### Popup and repeated selection

Use bottom-start, an 8px vertical offset and a 160px maximum height. With hide-on-select=false, repeated selections keep the menu open and display the latest value.

```demo
../example/demos/popup.vue
```

## API

### Props

| Name                   | Description                                                            | Type                             | Default     |
| ---------------------- | ---------------------------------------------------------------------- | -------------------------------- | ----------- |
| `open`                 | Whether the menu is open. Supports `v-model:open`                      | _boolean_                        | `undefined` |
| `default-open`         | Whether the menu is open initially                                     | _boolean_                        | `false`     |
| `disabled`             | Whether the entire split button is disabled                            | _boolean_                        | `false`     |
| `status`               | Button group semantic status                                           | _SemanticStatus_                 | `default`   |
| `variant`              | Button group variant                                                   | _ButtonVariant_                  | `default`   |
| `size`                 | Button group size                                                      | _ComponentSize_                  | `md`        |
| `color`                | Custom background color                                                | _string_                         | `''`        |
| `text-color`           | Custom text color                                                      | _string_                         | `''`        |
| `elevation`            | Button group elevation                                                 | _boolean \| number_              | `true`      |
| `button-props`         | Props for the primary button                                           | `Partial<ButtonProps>`           | `undefined` |
| `trigger-button-props` | Props for the menu trigger button                                      | `Partial<ButtonProps>`           | `undefined` |
| `auto-loading`         | Automatically show loading while the primary action promise is pending | _boolean_                        | `false`     |
| `trigger`              | Menu trigger method                                                    | _TriggerEvent \| TriggerEvent[]_ | `click`     |
| `placement`            | Menu placement                                                         | _PopoverPlacement_               | `bottom`    |
| `popup-container`      | Menu mount container                                                   | _PopupContainer_                 | `body`      |
| `popup-max-height`     | Maximum menu height                                                    | _boolean \| number_              | `true`      |
| `popup-class`          | Menu popup class                                                       | _string \| array \| object_      | `undefined` |
| `offset-x`             | Horizontal menu offset                                                 | _string \| number_               | `0`         |
| `offset-y`             | Vertical menu offset                                                   | _string \| number_               | `0`         |
| `hide-on-select`       | Close the menu after selection                                         | _boolean_                        | `true`      |

### Events

| Event         | Description                                    | Parameters             |
| ------------- | ---------------------------------------------- | ---------------------- |
| `update:open` | Emitted when an open-state update is requested | `open: boolean`        |
| `open-change` | Emitted when the menu open state changes       | `open: boolean`        |
| `click`       | Emitted when the primary button is clicked     | `event: Event`         |
| `select`      | Emitted when a menu option is selected         | `value, option, event` |

### Slots

| Name      | Description              | Parameters      |
| --------- | ------------------------ | --------------- |
| `default` | Primary button content   | `-`             |
| `icon`    | Menu trigger button icon | `open: boolean` |
| `content` | Menu content             | `-`             |

### Async action and methods

With `auto-loading`, return a Promise from `@click`. Both `@click` and `button-props.onClick` run once; the primary button waits for all returned Promises to settle. Synchronous callbacks do not flash a loading state. Like Button, click is an onClick callback prop that consumes return values, not a second emitted notification. Primary clicks bubble normally and never open the menu. Overall disabled takes priority over either button configuration.

Expose: `open()` requests opening (unless disabled), `close()` requests closing, and `resize()` recalculates popup positioning. A controlled open value must be updated by its owner. `offset-x` / `offset-y` are screen-axis offsets; numbers use pixels and length strings use the existing length conversion utility.

The two libraries maintain independent copies of the implementation, Props, style imports and contract tests, with local Menu adapters and no shared runtime or instances.
