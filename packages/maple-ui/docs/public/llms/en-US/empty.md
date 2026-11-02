<!-- Source: src/empty/docs/en-US.md; locale: en-US; page: /en-US/empty -->

# Empty

Shown when the current view has no data. Examples match Cedar Design Web, with a more compact mobile layout.

## Examples

### Basic Usage

Basic empty state. Without `description`, the i18n copy is used.

Example source: src/empty/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-empty description="暂无数据" />
</template>
```

### Custom Image and Copy

Customize the illustration with the `image` slot or default slot copy. Use `image-url` for an image source.

Example source: src/empty/example/demos/custom-image.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" :size="24">
    <mp-empty>
      <template #image>
        <m-icon-alert-circle />
      </template>
      No data, please reload!!
    </mp-empty>
    <mp-empty image-url="/cat.jpg" alt="空状态图片" description="自定义图片和文案" />
  </mp-space>
</template>
```

### Image Size

`image-size` accepts `xs` `sm` `md` `lg` `xl`, or a number.

Example source: src/empty/example/demos/image-size.vue

```vue
<script setup>
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-empty v-for="size in sizes" :key="size" :image-size="size" :description="`image-size: ${size}`" />
  </mp-space>
</template>
```

### Extra Action

Reload updates a local attempt counter and description only; it does not call a service. Provide your own request and result state for real reload behavior.

Add actions with the `extra` slot.

Example source: src/empty/example/demos/extra-slot.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const attempts = ref(0)
</script>

<template>
  <mp-empty :description="attempts ? 'No data. Local refresh completed.' : 'No data, please reload'">
    <template #extra>
      <mp-button status="primary" @click="attempts++">Reload</mp-button>
      <p aria-live="polite">Local refresh attempts: {{ attempts }}</p>
    </template>
  </mp-empty>
</template>
```

### Show and Hide

Use the two buttons to toggle the image and description independently, then restore them. Hiding both regions does not hide the entire component or its extra slot.

`show-icon` and `show-description` toggle the illustration and copy.

Example source: src/empty/example/demos/show.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const showIcon = ref(true)
const showDescription = ref(true)
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-button @click="showIcon = !showIcon">Toggle icon</mp-button>
      <mp-button @click="showDescription = !showDescription">Toggle description</mp-button>
    </mp-space>
    <mp-empty
      data-demo-empty
      description="Dynamic empty state"
      :show-icon="showIcon"
      :show-description="showDescription"
    />
  </mp-space>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `description` | Description; falls back to i18n | `string` | `-` |
| `image-url` | Custom image URL | `string` | `-` |
| `alt` | Image alt text | `string` | `''` |
| `image-size` | Image/icon size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `'md'` |
| `show-icon` | Whether to show the icon | `boolean` | `true` |
| `show-description` | Whether to show the description | `boolean` | `true` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Click callback | `(event: MouseEvent)` |

### Slots

| Name | Description |
| --- | --- |
| `default` | Description content |
| `image` | Custom icon/image |
| `extra` | Extra actions |

### Types

```ts
type EmptyImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string
```

### Style Variables

| Name | Default |
| --- | --- |
| `--mp-empty-padding` | `20px` |
| `--mp-empty-image-margin-bottom` | `4px` |
| `--mp-empty-description-font-size` | `14px` |
| `--mp-empty-description-color` | `var(--mp-sys-color-content-tertiary)` |
| `--mp-empty-description-line-height` | `1.5` |
| `--mp-empty-icon-color` | `var(--mp-sys-color-content-decorative)` |
| `--mp-empty-extra-margin-top` | `20px` |
| `--mp-empty-size-xs` | `80px` |
| `--mp-empty-size-sm` | `100px` |
| `--mp-empty-size-md` | `120px` |
| `--mp-empty-size-lg` | `140px` |
| `--mp-empty-size-xl` | `160px` |

Descriptions use low-emphasis text semantics; decorative icons use `content-decorative`, which must not be used for readable text. Custom images or slots may supply their own colors and are not forcibly recolored by `icon-color`. Sizing and spacing may follow mobile density while same-name tokens keep Cedar's responsibilities.
