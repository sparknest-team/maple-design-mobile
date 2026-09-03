# Avatar

Displays an avatar for a person or object using an image, text, icon, or avatar group. The examples match Cedar Design Web.

## Examples

### Basic Usage

Avatars are circular by default. Use the default slot to show text or an icon when there is no image.

```html
<mp-space align="center" :size="16">
  <mp-avatar :size="32">C</mp-avatar>
  <mp-avatar :size="40">CD</mp-avatar>
  <mp-avatar :size="48" shape="square">Cedar</mp-avatar>
  <mp-avatar :size="56" color="#00bebe">
    <m-icon-account-circle />
  </mp-avatar>
</mp-space>
```

### Size

`size` controls the avatar width and height in px. It works for both text and image avatars.

```html
<mp-space direction="column" :size="16">
  <mp-space align="center" :size="16">
    <mp-avatar :size="24">A</mp-avatar>
    <mp-avatar :size="32">B</mp-avatar>
    <mp-avatar :size="40">C</mp-avatar>
    <mp-avatar :size="48">D</mp-avatar>
    <mp-avatar :size="64">E</mp-avatar>
  </mp-space>
  <mp-space align="center" :size="16">
    <mp-avatar image-url="cat.jpg" alt="A cat" :size="28" />
    <mp-avatar image-url="cat.jpg" alt="A cat" :size="36" />
    <mp-avatar image-url="cat.jpg" alt="A cat" :size="48" />
    <mp-avatar image-url="cat.jpg" alt="A cat" :size="64" />
    <mp-avatar image-url="cat.jpg" alt="A cat" :size="78" />
  </mp-space>
</mp-space>
```

### Shape

`shape` supports circle and square.

```html
<mp-space align="center" :size="16">
  <mp-avatar>C</mp-avatar>
  <mp-avatar shape="square">S</mp-avatar>
  <mp-avatar image-url="cat.jpg" alt="Circle image" />
  <mp-avatar image-url="cat.jpg" alt="Square image" shape="square" />
</mp-space>
```

### Auto-fit Text

Long text is scaled to the avatar width by default. Change the input to see it update live. Set `auto-fix-font-size` to `false` to keep the original font size.

```html
<script setup>
import { ref } from 'vue'

const text = ref('Maple')
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-space align="center" :size="16">
      <mp-avatar>{{ text }}</mp-avatar>
      <mp-avatar shape="square">{{ text }}</mp-avatar>
      <mp-avatar :auto-fix-font-size="false">{{ text }}</mp-avatar>
    </mp-space>
    <mp-input v-model="text" placeholder="Enter text" />
  </mp-space>
</template>
```

### Image Avatar

Set the image with `image-url` and provide accessible alternative text with `alt`.

```html
<mp-space align="center" :size="16">
  <mp-avatar image-url="cat.jpg" alt="A cat" />
  <mp-avatar image-url="cat2.jpg" alt="A cat" :size="48" shape="square" />
</mp-space>
```

### Image Fit

`object-fit` controls how the image fills the avatar.

```html
<mp-space align="center" :size="24">
  <mp-avatar image-url="cat.jpg" alt="fill" object-fit="fill" :size="56" />
  <mp-avatar image-url="cat.jpg" alt="contain" object-fit="contain" :size="56" />
  <mp-avatar image-url="cat.jpg" alt="cover" object-fit="cover" :size="56" />
  <mp-avatar image-url="cat.jpg" alt="none" object-fit="none" :size="56" />
  <mp-avatar image-url="cat.jpg" alt="scale-down" object-fit="scale-down" :size="56" />
</mp-space>
```

### Loading and Fallback

`lazy` enables lazy loading, and `loading` sets a placeholder while the image loads. On failure, use the `error` image or the `error` slot.

```html
<mp-space align="center" :size="16">
  <mp-avatar lazy image-url="cat.jpg" loading="cat2.jpg" alt="Lazy load with placeholder" :size="48" />
  <mp-avatar image-url="missing-avatar.jpg" error="cat.jpg" alt="Fallback image on error" :size="48" />
  <mp-avatar image-url="missing-avatar.jpg" alt="Error slot" :size="48">
    <template #error>NA</template>
  </mp-avatar>
</mp-space>
```

### Color and Border

Use `color` for the background, including theme color variables. `bordered` / `border-color` control the outline.

```html
<mp-space align="center" :size="16">
  <mp-avatar color="var(--mp-color-warning)">
    <m-icon-fire />
  </mp-avatar>
  <mp-avatar color="var(--mp-color-danger)">Maple</mp-avatar>
  <mp-avatar color="#00bebe">CD</mp-avatar>
  <mp-avatar color="#7b61ff" shape="square">A</mp-avatar>
  <mp-avatar bordered>B</mp-avatar>
  <mp-avatar bordered border-color="#00bebe" color="#e6fffb">C</mp-avatar>
</mp-space>
```

### Avatar Group

`AvatarGroup` stacks child avatars. Use `bordered` for layered outlines, or `max-count` to collect extra avatars into a Popover. `z-index-ascend` uses ascending stacking order.

```html
<mp-space direction="column" :size="20">
  <mp-avatar-group>
    <mp-avatar image-url="cat.jpg" alt="User one" bordered />
    <mp-avatar image-url="cat2.jpg" alt="User two" bordered />
    <mp-avatar image-url="cat.jpg" alt="User three" bordered />
    <mp-avatar bordered>+2</mp-avatar>
  </mp-avatar-group>

  <mp-avatar-group :max-count="3" :size="48">
    <mp-avatar image-url="cat.jpg" alt="User one" />
    <mp-avatar image-url="cat2.jpg" alt="User two" />
    <mp-avatar color="#00bebe">A</mp-avatar>
    <mp-avatar color="#f59e0b">B</mp-avatar>
    <mp-avatar color="#ef4444">C</mp-avatar>
  </mp-avatar-group>

  <mp-avatar-group z-index-ascend>
    <mp-avatar image-url="cat.jpg" alt="User one" />
    <mp-avatar image-url="cat2.jpg" alt="User two" />
    <mp-avatar color="#7b61ff">CD</mp-avatar>
  </mp-avatar-group>
</mp-space>
```

### Vertical Group

`vertical` stacks avatars in a column, and `offset` controls the overlap.

```html
<mp-avatar-group vertical :offset="-12">
  <mp-avatar image-url="cat.jpg" alt="User one" bordered />
  <mp-avatar image-url="cat2.jpg" alt="User two" bordered />
  <mp-avatar image-url="cat.jpg" alt="User three" bordered />
  <mp-avatar bordered>+2</mp-avatar>
</mp-avatar-group>
```

### Hoverable

Set `hoverable` to scale the avatar on hover.

```html
<mp-avatar-group>
  <mp-avatar hoverable image-url="cat.jpg" alt="User one" bordered />
  <mp-avatar hoverable image-url="cat2.jpg" alt="User two" bordered />
  <mp-avatar hoverable image-url="cat.jpg" alt="User three" bordered />
  <mp-avatar hoverable bordered>+2</mp-avatar>
</mp-avatar-group>
```

### Trigger Icon

Use the `trigger-icon` slot for an action entry. `trigger-type` supports a corner button or a hover mask.

```html
<mp-space align="center" :size="24">
  <mp-avatar image-url="cat.jpg" alt="Edit avatar" :size="56">
    <template #trigger-icon><m-icon-image /></template>
  </mp-avatar>
  <mp-avatar image-url="cat2.jpg" alt="Change avatar" :size="56" trigger-type="mask">
    <template #trigger-icon><m-icon-camera /></template>
  </mp-avatar>
</mp-space>
```

## API

### Props

#### Avatar Props

| Prop                 | Description                     | Type                                                       | Default    |
| -------------------- | ------------------------------- | ---------------------------------------------------------- | ---------- |
| `shape`              | Avatar shape                    | `'circle' \| 'square'`                                     | `'circle'` |
| `image-url`          | Image URL                       | _string_                                                   | `-`        |
| `alt`                | Image alternative text          | _string_                                                   | `''`       |
| `size`               | Avatar width and height in px   | _number_                                                   | `40`       |
| `auto-fix-font-size` | Automatically scales long text  | _boolean_                                                  | `true`     |
| `trigger-type`       | Trigger icon presentation       | `'button' \| 'mask'`                                       | `'button'` |
| `trigger-icon-style` | Custom trigger icon style       | _CSSProperties_                                            | `-`        |
| `object-fit`         | Image fitting mode              | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'`  |
| `color`              | Avatar background color         | _string_                                                   | `-`        |
| `bordered`           | Whether to show a border        | _boolean_                                                  | `false`    |
| `border-color`       | Border color                    | _string_                                                   | `-`        |
| `loading`            | Placeholder image while loading | _string_                                                   | `-`        |
| `error`              | Fallback image on load failure  | _string_                                                   | `-`        |
| `lazy`               | Whether to lazy-load the image  | _boolean_                                                  | `false`    |
| `hoverable`          | Whether to enable hover scale   | _boolean_                                                  | `false`    |

### Events

#### Avatar Events

| Event   | Description                          | Arguments           |
| ------- | ------------------------------------ | ------------------- |
| `click` | Emitted when the avatar is clicked   | `event: MouseEvent` |
| `load`  | Emitted when the image loads         | `-`                 |
| `error` | Emitted when the image fails to load | `-`                 |

### Slots

#### Avatar Slots

| Name           | Description                    |
| -------------- | ------------------------------ |
| `default`      | Text, icon, or loading content |
| `error`        | Image error fallback           |
| `trigger-icon` | Interactive icon on the avatar |

#### AvatarGroup Props

| Prop                 | Description                                  | Type                   | Default    |
| -------------------- | -------------------------------------------- | ---------------------- | ---------- |
| `shape`              | Child avatar shape                           | `'circle' \| 'square'` | `'circle'` |
| `size`               | Child avatar width and height in px          | _number_               | `40`       |
| `auto-fix-font-size` | Automatically scales child text              | _boolean_              | `true`     |
| `max-count`          | Maximum visible avatars; `0` means unlimited | _number_               | `0`        |
| `z-index-ascend`     | Uses ascending avatar stacking order         | _boolean_              | `false`    |
| `max-style`          | Custom summary avatar style                  | _CSSProperties_        | `-`        |
| `max-popover-props`  | Summary Popover props                        | _PopoverProps_         | `-`        |
| `offset`             | Overlap offset between avatars               | _number \| string_     | `-`        |
| `vertical`           | Stacks avatars vertically                    | _boolean_              | `false`    |

#### AvatarGroup Slots

| Name      | Description |
| --------- | ----------- |
| `default` | Avatar list |

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `shape` | Child avatar shape | `'circle' \| 'square'` | `'circle'` |
| `size` | Child avatar width and height in px | _number_ | `40` |
| `auto-fix-font-size` | Automatically scales child text | _boolean_ | `true` |
| `max-count` | Maximum visible avatars; `0` means unlimited | _number_ | `0` |
| `z-index-ascend` | Uses ascending avatar stacking order | _boolean_ | `false` |
| `max-style` | Custom summary avatar style | _CSSProperties_ | `-` |
| `max-popover-props` | Summary Popover props | _PopoverProps_ | `-` |
| `offset` | Overlap offset between avatars | _number \| string_ | `-` |
| `vertical` | Stacks avatars vertically | _boolean_ | `false` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Avatar list | `-` |

