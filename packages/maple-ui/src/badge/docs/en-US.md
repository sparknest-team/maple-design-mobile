# Badge

### Intro

A red dot, number, or text that appears in the upper corner of an icon or text indicates that there is new content or pending information.

### Theme Color Badge

Set different color badge through the `type` attribute.

```html
<template>
  <mp-space>
    <mp-badge />
    <mp-badge type="primary" />
    <mp-badge type="info" />
    <mp-badge type="success" />
    <mp-badge type="warning" />
    <mp-badge type="danger" />
  </mp-space>
</template>
```

### Dot Badge

Set the badge as a dot through the `dot` attribute.

```html
<template>
  <mp-badge type="danger" dot />
</template>
```
### Custom Badge Content

Set the content of the badge through the `value` attribute.

```html
<template>
  <mp-space>
    <mp-badge type="danger" :value="66" />
    <mp-badge type="danger" value="badge" />
    <mp-badge type="danger" value="hot" />
  </mp-space>
</template>
```
### Maximum

Control the range of badge display values through `value` and `max-value` (effective when both `value` and `max-value` exist).

```html
<template>
  <mp-space>
    <mp-badge type="danger" :value="88" :max-value="99" />
    <mp-badge type="danger" :value="188" :max-value="99" />
  </mp-space>
</template>
```

### Different Positioning Badges

Set the position of the badge through the `position` property.

```html
<template>
  <mp-space :size="[8, 20]">
    <mp-badge type="danger">
      <mp-tag>The Upper Right</mp-tag>
    </mp-badge>
    <mp-badge type="danger" position="right-bottom">
      <mp-tag>The Lower Right</mp-tag>
    </mp-badge>
    <mp-badge type="danger" position="left-top">
      <mp-tag>The Upper Left</mp-tag>
    </mp-badge>
    <mp-badge type="danger" position="left-bottom">
      <mp-tag>The Lower Left</mp-tag>
    </mp-badge>
  </mp-space>
</template>
```

### Custom Offset

Set the horizontal and vertical offset of the logo via the `offset-x` and `offset-y` properties.

```html
<template>
  <mp-space :size="[8, 20]">
    <mp-badge type="danger" :offset-x="6" :offset-y="6">
      <mp-tag>Badge</mp-tag>
    </mp-badge>
    <mp-badge type="danger" position="right-bottom" :offset-x="6" :offset-y="6">
      <mp-tag>Badge</mp-tag>
    </mp-badge>
    <mp-badge type="danger" position="left-top" :offset-x="6" :offset-y="6">
      <mp-tag>Badge</mp-tag>
    </mp-badge>
    <mp-badge type="danger" position="left-bottom" :offset-x="6" :offset-y="6">
      <mp-tag>Badge</mp-tag>
    </mp-badge>
  </mp-space>
</template>
```

### Hidden Badge

Control whether the badge is hidden or not via the `hidden` prop.

```html
<script setup>
import { ref } from 'vue'

const hidden = ref(false)

function handleChange() {
  hidden.value = !hidden.value
}
</script>

<template>
  <mp-space>
    <mp-badge type="danger" :hidden="hidden">
      <mp-tag>Badge</mp-tag>
    </mp-badge>

    <mp-button type="success" @click="handleChange">Click To Change The State</mp-button>
  </mp-space>
</template>
```

### Custom Badge Color

Set the color of the badge through the `color` property.

```html
<template>
  <mp-badge type="primary" color="#6200ea">
    <mp-tag>Badge</mp-tag>
  </mp-badge>
</template>
```

### Custom Badge Icon

Set Badge Icon through `icon` property.

```html
<template>
  <mp-badge icon="notebook">
    <mp-tag>Badge</mp-tag>
  </mp-badge>
</template>
```

### Custom Badge Value

```html
<template>
  <mp-badge>
    <mp-tag>Badge</mp-tag>

    <template #value>
      <mp-ellipsis style="max-width: 40px" :tooltip="{ sameWidth: false }">100000000</mp-ellipsis>
    </template>
  </mp-badge>
</template>
```

## API

### Props

| Prop | Description                                                                                                                                                          | Type | Default |
| --- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- | --- |
| `type` | Badge type, can be set to `default` `primary` `info` `success` `warning` `danger`                                                                                    | _string_ | `default` |
| `hidden` | Whether to hidden badge                                                                                                                                              | _boolean_ | `false` |
| `dot` | Whether the badge is a dot                                                                                                                                           | _boolean_ | `false`|
| `value` | The value shown in the badge (takes effect when `dot` is `false`)                                                                                                    | _string \| number_ | `0`|
| `max-value`| The maximum value shown in the logo, when `value` is greater than `max-value`, displays `max-value+` (effective when both `value` and `max-value` exist)             | _number_| `-` |
| `position` | Define the position of the logo on other labels when there are other labels in the logo tag. Optional values are `right-top` `right-bottom` `left-top` `left-bottom` | _string_ | `right-top` |
| `offset-x`  | The horizontal offset of badge | _number \| string_ | `0` |
| `offset-y`  | The vertical offset of badge | _number \| string_ | `0` |
| `color` | Custom badge colors                                                                                                                                                  | _string_ | `-` |
| `icon` | Customize the content of the icon in the badge (priority is higher than `value`)                                                                                      | _string_ | `-` |
| `namespace`      | Customize the namespace of the icon in the badge | _string_ | `mp-icon` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` |  Badge content | `-` |
| `value` | The value shown in the badge | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--badge-content-padding` | `2px 6px` |
| `--badge-content-border`| `none` |
| `--badge-content-border-radius`| `100px` |
| `--badge-content-font-size` | `12px` |
| `--badge-icon-size` | `12px` |
| `--badge-default-color` | `#e0e0e0` |
| `--badge-primary-color` | `var(--color-primary)`|
| `--badge-danger-color` |  `var(--color-danger)`|
| `--badge-success-color` | `var(--color-success)`|
| `--badge-warning-color` |  `var(--color-warning)`|
| `--badge-info-color` | `var(--color-info)`|
| `--badge-default-text-color` | `#1D1B20` |
| `--badge-primary-text-color` | `var(--color-on-primary)` |
| `--badge-danger-text-color` | `var(--color-on-danger)` |
| `--badge-success-text-color` | `var(--color-on-success)` |
| `--badge-warning-text-color` | `var(--color-on-warning)` |
| `--badge-info-text-color` | `var(--color-on-info)` |
| `--badge-dot-width` |  `8px`|
| `--badge-dot-height` | `8px`|
