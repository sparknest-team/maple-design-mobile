# Collapse

### Intro

A content area which can be collapsed and expanded. Examples match Cedar Design Web, with a more compact mobile layout. `Collapse.Item` is the same component as `mp-collapse-item`; `app.use(Collapse)` registers both.

### Basic Usage

Use `v-model:active-names` to control the active panels. The value is always an array.

```html
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])

function handleChange(val) {
  console.log(val)
}
</script>

<template>
  <mp-collapse v-model:active-names="activeNames" @change="handleChange">
    <mp-collapse-item title="Title" name="1">Text</mp-collapse-item>
    <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
  </mp-collapse>
</template>
```

### Accordion Mode

Use `accordion` to allow only one panel open. `activeNames` remains an array with at most one item.

```html
<mp-collapse v-model:active-names="activeNames" accordion>
  <mp-collapse-item title="Title" name="1">Text</mp-collapse-item>
  <mp-collapse-item title="Title" name="2">Text</mp-collapse-item>
</mp-collapse>
```

### Disabled

Disable a panel with `disabled` on `collapse-item`.

### Nested

Panels can be nested. Nested groups can turn off `elevation`.

### Borderless

Hide the border with `bordered="false"`.

### Divider

Control item dividers with `divider`.

### Offset

Control the gap between expanded panels with `offset`. It is off by default.

### Extra

Set extra content with the `extra` slot. Clicking `extra` does not toggle the panel.

### Expand Icon

Customize the expand icon with the `expand-icon` slot.

### Expand Icon Position

Set `expand-icon-position` to `left` or `right`. Default is `left`.

### Destroy On Hide

Destroy panel content after collapse with `destroy-on-hide`.

### Toggle All

Use `toggleAll` to expand or collapse all panels. It is a no-op in accordion mode.

## API

### Props

#### Collapse Props

| Prop                         | Description                                              | Type                          | Default  |
| ---------------------------- | -------------------------------------------------------- | ----------------------------- | -------- |
| `active-names` **(v-model)** | Names of expanded panels                                 | _(string \| number)[]_        | `-`      |
| `default-active-names`       | Default expanded names (uncontrolled)                    | _(string \| number)[]_        | `[]`     |
| `accordion`                  | Accordion mode                                           | _boolean_                     | `false`  |
| `show-expand-icon`           | Whether to show expand icons                             | _boolean_                     | `-`      |
| `expand-icon-position`       | Expand icon position                                     | _'left' \| 'right'_           | `'left'` |
| `bordered`                   | Whether to show the border                               | _boolean_                     | `true`   |
| `divider`                    | Whether to show dividers                                 | _boolean_                     | `true`   |
| `offset`                     | Whether expanded panels have a gap                       | _boolean_                     | `false`  |
| `destroy-on-hide`            | Destroy content when hidden                              | _boolean_                     | `false`  |
| `elevation`                  | Elevation; `true` `false` or a level from `0-24`         | _string \| number \| boolean_ | `true`   |

#### CollapseItem Props

| Prop               | Description                                      | Type               | Default        |
| ------------------ | ------------------------------------------------ | ------------------ | -------------- |
| `name` **(required)** | Unique name, corresponding to `activeNames`   | _string \| number_ | `-`            |
| `title`            | Panel title                                      | _string_           | `-`            |
| `disabled`         | Disable the panel                                | _boolean_          | `false`        |
| `show-expand-icon` | Whether to show the expand icon                  | _boolean_          | `true`         |
| `destroy-on-hide`  | Destroy content when hidden                      | _boolean_          | `false`        |

### Methods

| Method      | Description                                      | Arguments                           | Return |
| ----------- | ------------------------------------------------ | ----------------------------------- | ------ |
| `toggleAll` | Expand or collapse all panels (no-op in accordion) | `options: CollapseToggleAllOptions` | `-`    |

### CollapseToggleAllOptions

| Prop           | Description                                                      | Type                   | Default |
| -------------- | ---------------------------------------------------------------- | ---------------------- | ------- |
| `expand`       | `'inverse'` toggles all; `boolean` expands or collapses all      | `'inverse' \| boolean` | `-`     |
| `skipDisabled` | Skip disabled panels                                             | _boolean_              | `false` |

### Events

#### Collapse Events

| Event    | Description                         | Arguments                                           |
| -------- | ----------------------------------- | --------------------------------------------------- |
| `change` | Emitted when expanded panels change | `activeNames: (string \| number)[]`<br>`ev: Event` |

### Slots

#### Collapse Slots

| Name          | Description  | Slot Props                                                                |
| ------------- | ------------ | ------------------------------------------------------------------------- |
| `default`     | Panel list   | `-`                                                                       |
| `expand-icon` | Expand icon  | `active: boolean`<br>`disabled: boolean`<br>`position: 'left' \| 'right'` |

#### CollapseItem Slots

| Name          | Description  | Slot Props                                                                |
| ------------- | ------------ | ------------------------------------------------------------------------- |
| `default`     | Panel content | `-`                                                                      |
| `title`       | Panel title  | `-`                                                                       |
| `extra`       | Extra content | `-`                                                                      |
| `expand-icon` | Expand icon  | `active: boolean`<br>`disabled: boolean`<br>`position: 'left' \| 'right'` |

### Style Variables

Use [StyleProvider](#/en-US/style-provider) to customize these CSS variables.

| Variable                       | Default                            |
| ------------------------------ | ---------------------------------- |
| `--collapse-background`        | `var(--color-fill-3)`              |
| `--collapse-text-color`        | `#232222`                          |
| `--collapse-header-font-size`  | `var(--font-size-lg)`              |
| `--collapse-header-padding`    | `10px 12px`                        |
| `--collapse-content-font-size` | `var(--font-size-md)`              |
| `--collapse-content-padding`   | `0 12px 10px`                      |
| `--collapse-item-margin-top`   | `16px`                             |
| `--collapse-disable-color`     | `#bdbdbd`                          |
| `--collapse-border-top`        | `thin solid var(--color-border-2)` |
| `--collapse-border-width`      | `1px`                              |
| `--collapse-border-color`      | `var(--color-border-2)`            |
| `--collapse-border-radius`     | `4px`                              |
