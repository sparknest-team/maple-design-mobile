# Badge

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Examples

### Basic usage

```html
<template>
  <mp-space wrap :size="24"
    ><mp-badge :content="9"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="9" dot
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge
      ><template #content><span aria-label="New activity">!</span></template
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ></mp-space
  >
</template>
```

### Inline and standalone

```html
<script setup lang="ts">
const positions = ['start', 'end'] as const
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap><mp-badge :content="1000" /><mp-badge :content="1000" dot /></mp-space>
    <mp-space v-for="position in positions" :key="position" wrap>
      <mp-badge mode="inline" :inline-position="position" :content="9" description="Messages" />
      <mp-badge mode="inline" :inline-position="position" dot :content="9" description="Messages" />
    </mp-space>
  </mp-space>
</template>
```

### Dot badges

```html
<template>
  <mp-space wrap :size="24"
    ><mp-badge dot :content="1"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge dot :content="1" :offset-x="6" :offset-y="-2"
      ><a href="#" @click.prevent>Messages</a></mp-badge
    ></mp-space
  >
</template>
```

### Custom content

```html
<template>
  <mp-space wrap :size="24"
    ><mp-badge content="NEW"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge content="HOT" mode="inline" inline-position="start"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge content="HOT" mode="inline" inline-position="end"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ></mp-space
  >
</template>
```

### Maximum and zero

```html
<template>
  <mp-space wrap :size="24"
    ><mp-badge :content="0"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="0" show-zero
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="100" :max="10"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="100"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge :content="1000" :max="999"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ></mp-space
  >
</template>
```

### Statuses and colors

```html
<script setup lang="ts">
const statuses = [
  'default',
  'primary',
  'secondary',
  'tertiary',
  'info',
  'success',
  'warning',
  'danger',
] as const
</script>

<template>
  <mp-space direction="column">
    <mp-space wrap
      ><mp-badge
        v-for="status in statuses"
        :key="status"
        :status="status"
        mode="inline"
        :description="status"
        :content="1"
    /></mp-space>
    <mp-space wrap
      ><mp-badge v-for="status in statuses" :key="status" :status="status" :content="status"
    /></mp-space>
    <mp-space wrap
      ><mp-badge color="#7816ff" text-color="#ffffff" content="Purple" /><mp-badge
        color="#005f73"
        text-color="#ffffff"
        content="Teal"
    /></mp-space>
  </mp-space>
</template>
```

### Five sizes

```html
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space wrap
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" mode="inline" :description="size"
    /></mp-space>
    <mp-space wrap
      ><mp-badge
        v-for="size in sizes"
        :key="size"
        :size="size"
        :content="1"
        dot
        mode="inline"
        :description="size"
    /></mp-space>
    <mp-space wrap :size="24"
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1"
        ><span
          style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      ></mp-space
    >
    <mp-space wrap :size="24"
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" dot
        ><span
          style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      ></mp-space
    >
  </mp-space>
</template>
```

### Positions and offsets

```html
<script setup lang="ts">
import { ref } from 'vue'
const offset = ref(0)
const dot = ref(false)
const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'left', 'right'] as const
const inlinePositions = ['start', 'end'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space wrap
      ><mp-button @click="offset++">Offset +1</mp-button><mp-button @click="offset--">Offset -1</mp-button
      ><mp-button @click="offset = 0">Reset</mp-button><mp-switch v-model="dot" aria-label="Toggle dot"
    /></mp-space>
    <output aria-live="polite">Offset: {{ offset }}px</output>
    <mp-space wrap :size="32"
      ><mp-badge
        v-for="position in positions"
        :key="position"
        :position="position"
        :content="100"
        :dot="dot"
        :offset-x="offset"
        :offset-y="offset"
        ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor">{{
          position
        }}</span></mp-badge
      ></mp-space
    >
    <mp-space wrap :size="24"
      ><mp-badge
        v-for="position in inlinePositions"
        :key="position"
        mode="inline"
        :inline-position="position"
        :content="9"
        :dot="dot"
        :offset-y="offset"
        :description="position"
    /></mp-space>
  </mp-space>
</template>
```

### Show and hide

```html
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(true)
const content = ref(1)
</script>

<template>
  <mp-space direction="column">
    <mp-space wrap
      ><mp-switch v-model="show" aria-label="Show badge" /><mp-button @click="content++">Add</mp-button
      ><mp-button @click="content = Math.max(0, content - 1)">Subtract</mp-button></mp-space
    >
    <mp-badge :content="0" :show="show" show-zero description="show-zero true" />
    <mp-badge :content="0" :show="show" :show-zero="false" description="show-zero false" />
    <mp-badge :content="content" :show="show" description="Messages" />
    <mp-badge :content="content" :show="show" dot description="Activity" />
  </mp-space>
</template>
```

### Solid and outline

```html
<script setup lang="ts">
const variants = ['default', 'outline'] as const
const statuses = ['default', 'success', 'warning', 'danger', 'primary', 'info'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space v-for="variant in variants" :key="variant" wrap :size="24">
      <mp-badge v-for="status in statuses" :key="status" :variant="variant" :status="status" :content="1"
        ><span
          style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      >
    </mp-space>
    <mp-space wrap
      ><mp-badge
        v-for="status in statuses"
        :key="status"
        :status="status"
        variant="outline"
        mode="inline"
        :content="1"
        :description="status"
    /></mp-space>
    <mp-space wrap
      ><mp-badge
        v-for="status in statuses"
        :key="status"
        :status="status"
        variant="outline"
        mode="inline"
        dot
        :content="1"
        :description="status"
    /></mp-space>
  </mp-space>
</template>
```

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| description | Fallback description text | `string` | `-` |
| content | Badge content | `number \| string` | `-` |
| max | Numeric overflow shows max+; strings are not capped | `number` | `99` |
| dot | Display a dot | `boolean` | `false` |
| offset-x | Horizontal offset; ignored in inline mode | `number` | `0` |
| offset-y | Vertical offset | `number` | `0` |
| color | Custom color; outline uses it for border and text | `string` | `-` |
| text-color | Content text color | `string` | `-` |
| mode | Layout mode | `'floating' \| 'inline'` | `floating` |
| position | Physical floating position, unchanged in RTL | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'left' \| 'right'` | `top-right` |
| inline-position | Logical inline position | `'start' \| 'end'` | `end` |
| size | Size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| status | Semantic status | `SemanticStatus` | `danger` |
| show | Show the badge | `boolean` | `true` |
| show-zero | Show numeric zero | `boolean` | `false` |
| variant | Appearance | `'outline' \| 'default'` | `default` |

### Events

No component-defined events.

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| default | Wrapped content; overrides description | — |
| content | Custom badge content | — |

### Methods

No public methods.

### Platform notes

Props and slots match. Without a default slot or description, the badge becomes standalone inline content. Omitted content displays a dot. Direction, theme and CSS prefix come from each platform.
<!-- same-source-api:end -->

## Types

```ts
type SemanticStatus = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'tertiary'
type BadgeVariant = 'default' | 'outline'
type BadgeMode = 'floating' | 'inline'
type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right'
type BadgeInlinePosition = 'start' | 'end'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

## Style Variables

### Common

| Name | Default |
| --- | --- |
| `--mp-badge-font-weight` | `500` |
| `--mp-badge-bg-color` | `#ef4444` |
| `--mp-badge-text-color` | `#ffffff` |
| `--mp-badge-description-text-color` | `var(--mp-color-text-1)` |

### Size (`xs / sm / md / lg / xl`)

| Name |
| --- |
| `--mp-badge-size-{size}-font-size` |
| `--mp-badge-size-{size}-scale` |
| `--mp-badge-size-{size}-dot-width` / `-dot-height` |
| `--mp-badge-size-{size}-padding` |
| `--mp-badge-size-{size}-height` |
| `--mp-badge-size-{size}-border-radius` |
| `--mp-badge-size-{size}-space` |
| `--mp-badge-description-size-{size}-font-size` |

### Status (`default / info / success / warning / danger / primary`)

| Name |
| --- |
| `--mp-badge-status-{status}-bg-color` |
| `--mp-badge-status-{status}-text-color` |
| `--mp-badge-variant-outline-status-{status}-text-color` |

The default `status="danger"` uses a red background with white text. Explicit `status="default"` uses neutral colors. All five sizes (`xs | sm | md | lg | xl`) are implemented.
