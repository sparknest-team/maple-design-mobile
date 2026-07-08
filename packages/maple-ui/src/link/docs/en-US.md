# Link

### Intro

Link component for hyperlink to web pages.

### Theme Color Link

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-link>Default Link</mp-link>
    <mp-link type="primary">Primary Link</mp-link>
    <mp-link type="info">Info Link</mp-link>
    <mp-link type="success">Success Link</mp-link>
    <mp-link type="warning">Warning Link</mp-link>
    <mp-link type="danger">Danger Link</mp-link>
  </mp-space>
</template>
```

### Link Mode

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-link 
      type="primary"
      href="https://maplejs.org/#/en-US/home"
      target="_blank"
    >
      Href
    </mp-link>
    <mp-link type="primary" to="/button">Router Link</mp-link>
  </mp-space>
</template>
```

### Underline

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-link type="primary">Underline</mp-link>
    <mp-link type="primary" underline="hover">Hover</mp-link>
    <mp-link type="primary" underline="none">Never</mp-link>
  </mp-space>
</template>
```

### Disabled Status

```html
<template>
  <mp-link disabled>Disabled Status</mp-link>
</template>
```

### Custom Color

```html
<template>
  <mp-space :size="[10, 10]">
    <mp-link text-color="#009688">Link</mp-link>
    <mp-link text-color="#ab47bc">Link</mp-link>
  </mp-space>
</template>
```

### Default Slot

```html
<template>
  <mp-link 
    href="https://maplejs.org/#/en-US/home" 
    target="_blank" 
    underline="none"
  >
    <mp-button type="primary">To Home</mp-button>
  </mp-link>
</template>
```

## API

### Props

| Prop         | Description                                                                       | Type     | Default  |
|--------------|-----------------------------------------------------------------------------------|----------|----------|
| `type`       | Link type, can be set to  `default` `primary` `info` `success` `warning` `danger` | _string_ | `default` |
| `underline`  | Underline, Can be set to `always` `hover` `none`                                  | _string_ | `always` |
| `disabled`   | Whether to disable link                                                           | _boolean_ | `false`  |
| `text-color` | Link text color                                                                   | _string_ | `-`      |
| `text-size`  | Link font size                                                                    | _string \| number_  | `-`            |
| `href`       | Same as native hyperlink's `href`, Have higher priority than `to`                 | _string_ | `-`      |
| `rel`        | Same as the native `rel` attribute                                            | _string_ | `-`      |
| `target`     | Same as the native `target` attribute                                             | _string_ | `-`      |
| `to`         | `router-link` `to`, will render as `<router-link />`                              | _string \| object_  | `-`        |
| `replace`    | `router-link` `replace`                                                           | _boolean_ | `false`  |

### Events

| Event        | Description                                                                                   | Arguments      |
| ------------ |-----------------------------------------------------------------------------------------------| -------------- |
| `click`      | Triggered when the link is clicked | `event: Event` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Link content | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                       | Default                      |
| --- |------------------------------|
| `--link-default-color` | `#555`                       |
| `--link-primary-color` | `var(--color-primary)`       |
| `--link-danger-color` | `var(--color-danger)`        |
| `--link-success-color` | `var(--color-success)`       |
| `--link-warning-color` | `var(--color-warning)`       |
| `--link-info-color` | `var(--color-info)`          |
| `--link-disabled-color` | `var(--color-text-disabled)` |
| `--link-font-size` | `var(--font-size-md)` |
| `--link-focus-opacity` | `0.8` |
