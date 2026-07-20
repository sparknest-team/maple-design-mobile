# Breadcrumb

### Intro

Used to display information hierarchically.

### Basic Usage

```html
<template>
   <mp-breadcrumb>
     <mp-breadcrumb-item>Home</mp-breadcrumb-item>
     <mp-breadcrumb-item>Link 1</mp-breadcrumb-item>
     <mp-breadcrumb-item>Link 2</mp-breadcrumb-item>
   </mp-breadcrumb>
</template>
```

### Separator

```html
<template>
   <mp-breadcrumb separator="\">
     <mp-breadcrumb-item>Home</mp-breadcrumb-item>
     <mp-breadcrumb-item>Link 1</mp-breadcrumb-item>
     <mp-breadcrumb-item>Link 2</mp-breadcrumb-item>
   </mp-breadcrumb>
</template>
```

### Child Separator

```html
<template>
   <mp-breadcrumb>
     <mp-breadcrumb-item>Home</mp-breadcrumb-item>
     <mp-breadcrumb-item separator="~">Link 1</mp-breadcrumb-item>
     <mp-breadcrumb-item>Link 2</mp-breadcrumb-item>
   </mp-breadcrumb>
</template>
```

### Separator Slot

Custom content can be used as separator by setting slot.

```html
<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item>
      Home
      <template #separator>
        <mp-icon name="menu-right" style="margin: 1px 4px 0" />
      </template>
    </mp-breadcrumb-item>
    <mp-breadcrumb-item>
      Link 1
      <template #separator>
        <mp-icon name="menu-right" style="margin: 1px 4px 0" />
      </template>
    </mp-breadcrumb-item>
    <mp-breadcrumb-item>Link 2</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

### Click Event

Register the click event of the breadcrumb through `@click`, the last breadcrumb will not trigger the click event.

```html
<script setup>
import { Message } from '@maplejs/maple-ui'
</script>

<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item @click="Message('Home')">Home</mp-breadcrumb-item>
    <mp-breadcrumb-item @click="Message('Link 1')">Link 1</mp-breadcrumb-item>
    <mp-breadcrumb-item @click="Message('Link 2')">Link 2</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

## API

### Props

#### Breadcrumb Props

| Prop               | Description          | Type               | Default      |
| ----------- | ------ | -------- | ------ |
| `separator` | Separator | _string_ | `/` |

#### BreadcrumbItem Props

| Prop       | Description            | Type               | Default |
| ----------- | -------------- | ----------------------------- |-----|
| `separator` | Separator | _string_ | `-` |

### Events

#### BreadcrumbItem Events

| Event    | Description   | Arguments                 |
| ------- |-----------------------------------------| ---------------------- |
| `click` | Triggered when a breadcrumb is clicked | `event: Event` |

### Slots

#### Breadcrumb Slots

| Name | Description | SlotProps |
| --------- | -------------- | ---- |
| `default` | Customize the default content | `-` |

#### BreadcrumbItem Slots

| Name | Description | SlotProps |
| ----------- |------------------------------| ---- |
| `default` | Customize the default content | `-` |
| `separator` | Customize separator content  | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).
#### BreadcrumbItem Variables

| Variable                        | Default                |
| -------------------------------------- | ---------------------- |
| `--breadcrumb-item-active-color` | `var(--color-primary)` |
| `--breadcrumb-item-inactive-color` | `#888` |
| `--breadcrumb-item-separator-margin` | `0 10px` |
| `--breadcrumb-item-separator-font-size` | `14px` |