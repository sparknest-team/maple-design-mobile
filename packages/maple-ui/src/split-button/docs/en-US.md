# SplitButton

### Introduction

Combines a primary action button with a menu of related actions. The main button performs the action and the trailing button opens the menu.

### Basic Usage

```html
<script setup>
  import { Message } from '@maplejs/maple-ui'

  const publish = () => Message('Publish')
  const handleSelect = (_value, option) => Message(String(option.label))
</script>

<template>
  <mp-split-button status="primary" placement="bottom-end" @click="publish" @select="handleSelect">
    Publish
    <template #content>
      <mp-menu-option label="Save now" />
      <mp-menu-option label="Save and publish" />
    </template>
  </mp-split-button>
</template>
```

### Disabled

```html
<template>
  <mp-split-button disabled status="primary">
    Disabled
    <template #content>
      <mp-menu-option label="Save now" />
      <mp-menu-option label="Save and publish" />
    </template>
  </mp-split-button>
</template>
```

### Custom Icon

The `icon` slot exposes `{ open }` for custom menu indicators.

```html
<template>
  <mp-split-button status="primary">
    Publish
    <template #icon="{ open }">
      <m-icon-menu-down :style="{ transform: open ? 'rotate(180deg)' : undefined }" />
    </template>
    <template #content>
      <mp-menu-option label="Save now" />
      <mp-menu-option label="Save and publish" />
    </template>
  </mp-split-button>
</template>
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
| `popup-class`          | Menu popup class                                                       | _string_                         | `undefined` |
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
