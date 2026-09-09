# Tag

### Intro

Tag is used for marking, categorizing, and filtering. The API aligns with Cedar Design Web (PC) Tag, with mobile-friendly extras such as round shape and custom text color.

### Theme Color

Set the theme color with `status`. Options match Button: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger`.

```html
<template>
  <mp-space>
    <mp-tag>Default</mp-tag>
    <mp-tag status="primary">Primary</mp-tag>
    <mp-tag status="info">Info</mp-tag>
    <mp-tag status="success">Success</mp-tag>
    <mp-tag status="warning">Warning</mp-tag>
    <mp-tag status="danger">Danger</mp-tag>
    <mp-tag status="secondary">Secondary</mp-tag>
    <mp-tag status="tertiary">Contrast</mp-tag>
  </mp-space>
</template>
```

### Outline

Use `variant="outline"` for the outline style.

```html
<template>
  <mp-space>
    <mp-tag variant="outline">Default</mp-tag>
    <mp-tag variant="outline" status="primary">Primary</mp-tag>
    <mp-tag variant="outline" status="success">Success</mp-tag>
    <mp-tag variant="outline" status="danger">Danger</mp-tag>
  </mp-space>
</template>
```

### Round

Enable the pill shape with `round`.

```html
<template>
  <mp-space>
    <mp-tag round status="primary">Round</mp-tag>
    <mp-tag round variant="outline" status="success">Outline Round</mp-tag>
  </mp-space>
</template>
```

### Size

Set size with `size`: `xs` `sm` `md` `lg` `xl`.

```html
<template>
  <mp-space align="center">
    <mp-tag size="xs" status="primary">xs</mp-tag>
    <mp-tag size="sm" status="primary">sm</mp-tag>
    <mp-tag size="md" status="primary">md</mp-tag>
    <mp-tag size="lg" status="primary">lg</mp-tag>
    <mp-tag size="xl" status="primary">xl</mp-tag>
  </mp-space>
</template>
```

### Closable

Show a close button with `closable`. Use `v-model:show` or manage a list yourself.

```html
<script setup>
import { ref } from 'vue'

const show = ref(true)
const tags = ref(['Tag 1', 'Tag 2', 'Tag 3'])

function removeTag(tag) {
  tags.value = tags.value.filter((item) => item !== tag)
}
</script>

<template>
  <mp-space>
    <mp-tag v-model:show="show" closable status="primary">Tag</mp-tag>
    <mp-tag v-for="tag in tags" :key="tag" closable round @close="removeTag(tag)">
      {{ tag }}
    </mp-tag>
  </mp-space>
</template>
```

### Loading

Show a loading state with `loading`.

```html
<template>
  <mp-tag loading status="primary">Loading</mp-tag>
</template>
```

### Checkable

Make the tag toggleable with `checkable` and `v-model:checked`.

```html
<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <mp-tag v-model:checked="checked" checkable status="primary">Checkable</mp-tag>
</template>
```

### Icon

Customize the leading icon with the `icon` slot, and the close icon with `close-icon`.

```html
<template>
  <mp-tag status="success">
    <template #icon><m-icon-check /></template>
    Done
  </mp-tag>
</template>
```

### Custom Color

Override status colors with `color` and `text-color`. With `variant="outline"`, `color` is used as the border color.

```html
<template>
  <mp-space>
    <mp-tag color="#66bb6a" text-color="#fff">Custom</mp-tag>
    <mp-tag variant="outline" color="#6750A4">Outline Custom</mp-tag>
    <mp-tag color="linear-gradient(to right bottom, #6750A4, #D0BCFF)" text-color="#fff">Gradient</mp-tag>
  </mp-space>
</template>
```

## API

### Props

#### Tag Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `status` | Theme color: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `default` |
| `variant` | Variant: `default` (filled) / `outline` | _string_ | `default` |
| `size` | Size: `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `round` | Whether to use a pill shape | _boolean_ | `false` |
| `show` | Visibility (v-model) | _boolean_ | `true` |
| `default-show` | Default visibility | _boolean_ | `true` |
| `loading` | Loading state | _boolean_ | `false` |
| `closable` | Whether closable | _boolean_ | `false` |
| `checkable` | Whether checkable | _boolean_ | `false` |
| `checked` | Checked state when checkable (v-model) | _boolean_ | `true` |
| `default-checked` | Default checked state when checkable | _boolean_ | `true` |
| `nowrap` | Whether content is nowrap with ellipsis | _boolean_ | `false` |
| `color` | Custom background (border color when outline) | _string_ | `-` |
| `text-color` | Custom text color | _string_ | `-` |

### Events

#### Tag Events

| Event | Description | Arguments |
| --- | --- | --- |
| `update:show` | Visibility changed | `(show: boolean)` |
| `update:checked` | Checked state changed (checkable) | `(checked: boolean)` |
| `close` | Close button clicked | `(event: MouseEvent)` |
| `check` | Checked state toggled (checkable) | `(checked: boolean, event: MouseEvent)` |

### Slots

#### Tag Slots

| Slot | Description |
| --- | --- |
| `default` | Tag content |
| `icon` | Leading icon |
| `close-icon` | Custom close icon |

### Type Definitions

```ts
type TagStatus = 'default' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'danger'
type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TagVariant = 'default' | 'outline'
```

### Style Variables

Customize via [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--mp-tag-border-width` | `1px` |
| `--mp-tag-border-radius` | `4px` |
| `--mp-tag-round-radius` | `100px` |
| `--mp-tag-padding` | `0 10px` |
| `--mp-tag-icon-margin` | `6px` |
| `--mp-tag-font-weight` | `500` |
| `--mp-tag-size-xs-height` | `24px` |
| `--mp-tag-size-sm-height` | `28px` |
| `--mp-tag-size-md-height` | `32px` |
| `--mp-tag-size-lg-height` | `36px` |
| `--mp-tag-size-xl-height` | `40px` |
| `--mp-tag-size-{size}-font-size` | `12px` ~ `16px` |
| `--mp-tag-status-{status}-color` | Status background |
| `--mp-tag-status-{status}-text-color` | Status text color |
| `--mp-tag-status-{status}-border-color` | Status border (outline) |
