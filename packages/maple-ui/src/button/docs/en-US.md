# Button

### Intro

Button component for triggering actions.

### Theme Color Button

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button>Default Button</mp-button>
    <mp-button type="primary">Primary Button</mp-button>
    <mp-button type="info">Info Button</mp-button>
    <mp-button type="success">Success Button</mp-button>
    <mp-button type="warning">Warning Button</mp-button>
    <mp-button type="danger">Danger Button</mp-button>
  </mp-space>
</template>
```

### Text Button

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button text outline type="primary">Outline Button</mp-button>
    <mp-button text type="primary">Plain Text Button</mp-button>
  </mp-space>
</template>
```

### Disabled Status

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button disabled>Disabled Status</mp-button>
    <mp-button disabled text outline>Disabled Status</mp-button>
    <mp-button disabled text>Disabled Status</mp-button>
  </mp-space>
</template>
```

### Loading Status

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button loading type="primary"> Loading Status </mp-button>
    <mp-button loading type="info" loading-type="rect"> Loading Status </mp-button>
    <mp-button loading type="success" loading-type="disappear"> Loading Status </mp-button>
    <mp-button loading type="danger" loading-type="cube"> Loading Status </mp-button>
    <mp-button loading type="warning" loading-type="wave"> Loading Status </mp-button>
  </mp-space>
</template>
```

### Button Size

```html
<template>
  <mp-space align="center" :size="[10, 10]">
    <mp-button type="primary">Normal Button</mp-button>
    <mp-button type="success" size="small">Small Button</mp-button>
    <mp-button type="warning" size="mini">Mini Button</mp-button>
    <mp-button type="danger" size="large">Large Button</mp-button>
  </mp-space>
</template>
```

### Block Button

```html
<template>
  <mp-button block type="primary">Block Button</mp-button>
</template>
```

### Custom Color

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button color="#66bb6a" text-color="#fff">Background/Text Color</mp-button>
    <mp-button color="linear-gradient(to right bottom, #6750A4, #D0BCFF)" text-color="#fff"> Linear Gradient Color </mp-button>
  </mp-space>
</template>
```

### Round Button

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button type="primary" round icon-container>
      <mp-icon name="plus" />
    </mp-button>
    <mp-button type="info" round icon-container>
      <mp-icon name="information" />
    </mp-button>
    <mp-button type="success" round icon-container>
      <mp-icon name="check" />
    </mp-button>
    <mp-button type="warning" round icon-container>
      <mp-icon name="warning" />
    </mp-button>
    <mp-button type="danger" round icon-container>
      <mp-icon name="window-close" />
    </mp-button>
  </mp-space>
</template>
```

### Events

```html
<script setup>
import { Message } from '@maplejs/maple-ui'

function handleClick() {
  Message.success('Click Success')
}

function handleTouchstart() {
  Message.success('Touchstart Success')
}

function handleAutoLoadingClick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}
</script>

<template>
  <mp-space :size="[10, 10]">
    <mp-button type="success" @click="handleClick">Click</mp-button>
    <mp-button type="success" @touchstart="handleTouchstart">TouchStart</mp-button>
    <mp-button type="success" @click="handleAutoLoadingClick" auto-loading>AutoLoading</mp-button>
  </mp-space>
</template>
```


### Theme Color Button Group

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button-group type="default">
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
    </mp-button-group>
  
    <mp-button-group type="primary">
      <mp-button type="primary">Button</mp-button>
      <mp-button type="primary">Button</mp-button>
      <mp-button type="primary">Button</mp-button>
    </mp-button-group>
  </mp-space>
</template>
```

### Button Group Size

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button-group type="primary" size="normal">
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
    </mp-button-group>
  
    <mp-button-group type="primary" size="large">
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
    </mp-button-group>
  </mp-space>
</template>
```

### Split Button

```html
<template>
  <mp-popover placement="bottom" same-width :offset-y="6">
    <mp-button-group type="primary">
      <mp-button @click.stop>Split Button</mp-button>
      <mp-button style="padding: 0 6px;">
        <mp-icon name="menu-down" :size="24" />
      </mp-button>
    </mp-button-group>

    <template #content>
      <mp-cell ripple>Split Button</mp-cell>
      <mp-cell ripple>Split Button</mp-cell>
      <mp-cell ripple>Split Button</mp-cell>
    </template>
  </mp-popover>
</template>
```

### Button Group Mode

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button-group type="primary" mode="text">
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
    </mp-button-group>
  
    <mp-button-group type="primary" mode="outline">
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
    </mp-button-group>

    <mp-button-group mode="icon-container">
      <mp-button type="warning">
        <mp-icon name="warning" />
      </mp-button>
      <mp-button type="info">
        <mp-icon name="information" />
      </mp-button>
      <mp-button type="success">
        <mp-icon name="check" />
      </mp-button>
    </mp-button-group>
  
    <mp-button-group type="primary">
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
    </mp-button-group>
  </mp-space>
</template>
```

### Custom Button Group Color

```html
<template>
  <mp-button-group type="primary" color="linear-gradient(to bottom right, #6750A4, #D0BCFF)">
    <mp-button>Button</mp-button>
    <mp-button>Button</mp-button>
    <mp-button>Button</mp-button>
  </mp-button-group>
</template>
```

### Vertical Button Group

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-button-group type="primary" mode="text" vertical>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
    </mp-button-group>
  
    <mp-button-group type="primary" mode="outline" vertical>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
    </mp-button-group>

    <mp-button-group mode="icon-container" vertical>
      <mp-button type="warning">
        <mp-icon name="warning" />
      </mp-button>
      <mp-button type="info">
        <mp-icon name="information" />
      </mp-button>
      <mp-button type="success">
        <mp-icon name="check" />
      </mp-button>
    </mp-button-group>
    
    <mp-button-group type="primary" vertical>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
      <mp-button>Button</mp-button>
    </mp-button-group>
  </mp-space>
</template>
```

## API

### Props

#### Button Props

| Prop             | Description                                                                             | Type      | Default        |
|------------------|-----------------------------------------------------------------------------------------|-----------|----------------|
| `type`           | Button type, Can be set to `default` `primary` `info` `success` `warning` `danger`      | _string_  | `default`      |
| `native-type`    | Native button type, Can be set to `button` `submit` `reset` | _string_  | `button`       |
| `size`           | Button size, Can be set to `normal` `mini` `small` `large`                              | _string_  | `normal`       |
| `loading`        | Loading status                                                                          | _boolean_ | `false`        |
| `loading-radius` | Loading radius, Can only be used when `loading-type="circle"`                           | _string  \| number_        | `-`      |
| `loading-type`   | Loading type, Can be set to `circle` `wave` `cube` `rect` `disappear`                   | _string_  | `circle`       |
| `loading-size`   | Loading size, Can be set to `large` `normal` `small` `mini`                             | _string_  | `-`       |
| `loading-color`  | Loading color                                                                           | _string_  | `currentColor` |
| `auto-loading`   | Autoload mode for easy handling of asynchronous tasks                                   | _boolean_ | `false`        |
| `round`          | Whether to be round button                                                              | _boolean_ | `false`        |
| `block`          | Whether to be block button                                                              | _boolean_ | `false`        |
| `text`           | Whether to be text button                                                               | _boolean_ | `false`        |
| `icon-container` | Whether to serve as an icon container                                                        | _boolean_ | `false`        |
| `outline`        | Whether to be outline button                                                            | _boolean_ | `false`        |
| `disabled`       | Whether to disable button                                                               | _boolean_ | `false`        |
| `ripple`         | Whether to be ripple button                                                             | _boolean_ | `true`         |
| `focusable` ***3.3.13*** | Whether to be focus button                                                        | _boolean_ | `true`         |
| `text-color`     | Button Text color                                                                       | _string_  | `-`            |
| `color`          | Button background color                                                                 | _string_  | `-`            |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _string \| number \| boolean_|   `true`    |


#### ButtonGroup Props

| Prop             | Description                                                                             | Type      | Default        |
|--------------|------------------------------------------------------------------------------------------|----------|-----------|
| `type`       | Button Group type, can be set to `default` `primary` `info` `success` `warning` `danger` | _string_ | `default` |
| `size`       | Button Group size, can be set to `normal` `mini` `small` `large`                         | _string_ | `normal`  |
| `mode`       | Button Group mode, can be set to `normal` `text` `outline` `icon-container`              | _string_ | `normal`  |
| `vertical`   | Whether to be vertical button  group                                                     | _boolean_ | `false`   |
| `elevation` | Elevation of Button Group, options `true` `false` and level of `0-24` | _string \| number \| boolean_|   `true`    |
| `color`      | Button Group background color                                                            | _string_ | `-`       |
| `text-color`     | Button Group Text color                                                                  | _string_  | `-`            |

### Events

#### Button Events

| Event        | Description                                                                                          | Arguments      |
| ------------ | ---------------------------------------------------------------------------------------------------- | -------------- |
| `click`      | Triggered when the button is clicked. Not triggered when `loading` or `disabled` status is `true`    | `event: Event` |
| `touchstart` | Triggered when the button is touchstart, Not triggered when `loading` or `disabled` status is `true` | `event: Event` |

### Slots

#### Button Slots

| Name | Description | SlotProps |
| --------- | -------------- | --------- |
| `default` | Button content | `-`       |

#### ButtonGroup Slots

| Name | Description | SlotProps |
| --------- | -------------- | --------- |
| `default` | Button Group content | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### Button Variables

| Variable                       | Default                      |
| ------------------------------ | ---------------------------- |
| `--button-default-text-color` | `#555` |
| `--button-primary-text-color` | `var(--color-on-primary)` |
| `--button-danger-text-color` | `var(--color-on-danger)` |
| `--button-success-text-color` | `var(--color-on-success)` |
| `--button-warning-text-color` | `var(--color-on-warning)` |
| `--button-info-text-color` | `var(--color-on-info)` |
| `--button-default-color` | `#f5f5f5` |
| `--button-primary-color` | `var(--color-primary)`|
| `--button-danger-color` |  `var(--color-danger)`|
| `--button-success-color` | `var(--color-success)`|
| `--button-warning-color` |  `var(--color-warning)`|
| `--button-info-color` | `var(--color-info)`|
| `--button-default-icon-color` | `#555` |
| `--button-primary-icon-color` | `var(--color-on-primary-container)` |
| `--button-danger-icon-color` | `var(--color-on-danger-container)` |
| `--button-success-icon-color` | `var(--color-on-success-container)` |
| `--button-warning-icon-color` | `var(--color-on-warning-container)` |
| `--button-info-icon-color` | `var(--color-on-info-container)` |
| `--button-default-icon-container-color` | `#f5f5f5` |
| `--button-primary-icon-container-color` | `var(--color-primary-container)` |
| `--button-danger-icon-container-color` | `var(--color-danger-container)` |
| `--button-success-icon-container-color` | `var(--color-success-container)` |
| `--button-warning-icon-container-color` | `var(--color-warning-container)` |
| `--button-info-icon-container-color` | `var(--color-info-container)` |
| `--button-disabled-color` | `var(--color-disabled)`|
| `--button-disabled-text-color` | `var(--color-text-disabled)` |
| `--button-border-radius` | `4px` |
| `--button-mini-padding` | `0 9px` |
| `--button-small-padding` | `0 11px` |
| `--button-normal-padding` | `0 15px` |
| `--button-large-padding` | `0 22px` |
| `--button-round-padding` | `6px` |
| `--button-mini-height` | `20px` |
| `--button-small-height` | `28px` |
| `--button-normal-height` | `36px` |
| `--button-large-height` | `44px` |
| `--button-mini-font-size` | `var(--font-size-xs)` |
| `--button-small-font-size` | `var(--font-size-sm)` |
| `--button-normal-font-size` | `var(--font-size-md)` |
| `--button-large-font-size` | `var(--font-size-lg)` |
