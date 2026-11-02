<!-- Source: src/badge/docs/en-US.md; locale: en-US; page: /en-US/badge -->

# Badge

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Examples

### Basic usage

Badges use a red background and white text by default.

Example source: src/badge/example/demos/basic.vue

```vue
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

### Five sizes

Example source: src/badge/example/demos/size.vue

```vue
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space wrap
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" mode="inline" :description="size"
    /></mp-space>
    <mp-space wrap
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" dot mode="inline" :description="size"
    /></mp-space>
    <mp-space wrap :size="24"
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1"
        ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      ></mp-space
    >
    <mp-space wrap :size="24"
      ><mp-badge v-for="size in sizes" :key="size" :size="size" :content="1" dot
        ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
          >Inbox</span
        ></mp-badge
      ></mp-space
    >
  </mp-space>
</template>
```

### Solid and outline

Example source: src/badge/example/demos/variant.vue

```vue
<script setup lang="ts">
const variants = ['default', 'outline'] as const
const statuses = ['default', 'success', 'warning', 'danger', 'primary', 'info'] as const
</script>

<template>
  <mp-space direction="column" :size="24">
    <mp-space v-for="variant in variants" :key="variant" wrap :size="24">
      <mp-badge v-for="status in statuses" :key="status" :variant="variant" :status="status" :content="1"
        ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
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

### Statuses and colors

Example source: src/badge/example/demos/color.vue

```vue
<script setup lang="ts">
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
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
    <mp-space wrap><mp-badge v-for="status in statuses" :key="status" :status="status" :content="status" /></mp-space>
    <mp-space wrap
      ><mp-badge color="#7816ff" text-color="#ffffff" content="Purple" /><mp-badge
        color="#005f73"
        text-color="#ffffff"
        content="Teal"
    /></mp-space>
  </mp-space>
</template>
```

### Appearance combinations

Use this example for notification counts and markers. Adjust variant, status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/badge/example/demos/appearance-lab.vue

```vue
<script setup lang="ts">
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'default', status: 'default', size: 'md' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'outline', value: 'outline' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>status</span
        ><mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'primary', value: 'primary' },
            { label: 'secondary', value: 'secondary' },
            { label: 'tertiary', value: 'tertiary' },
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
          ]"
          aria-label="status"
        />
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-badge :content="1000" v-bind="__demoAppearance" />
  </mp-space>
</template>
```

### Inline and standalone

Example source: src/badge/example/demos/inline.vue

```vue
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

Example source: src/badge/example/demos/dot.vue

```vue
<template>
  <mp-space wrap :size="24"
    ><mp-badge dot :content="1"
      ><span style="display: inline-block; padding: 12px; border: 1px solid currentColor; border-radius: 4px"
        >Inbox</span
      ></mp-badge
    ><mp-badge dot :content="1" :offset-x="6" :offset-y="-2"
      ><mp-link href="#" @click.prevent>Messages</mp-link></mp-badge
    ></mp-space
  >
</template>
```

### Custom content

Example source: src/badge/example/demos/content.vue

```vue
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

Example source: src/badge/example/demos/max.vue

```vue
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

### Positions and offsets

Example source: src/badge/example/demos/position.vue

```vue
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

Example source: src/badge/example/demos/show.vue

```vue
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

All public Badge variables and their default values:

| Variable | Default |
| --- | --- |
| `--mp-badge-font-weight` | `var(--mp-sys-font-weight-medium)` |
| `--mp-badge-description-size-xs-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-description-size-sm-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-description-size-md-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-badge-description-size-lg-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-badge-description-size-xl-font-size` | `var(--mp-sys-font-size-xl)` |
| `--mp-badge-description-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-badge-size-xs-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-sm-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-md-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-badge-size-lg-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-badge-size-xl-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-badge-size-xs-scale` | `0.6667` |
| `--mp-badge-size-sm-scale` | `0.8333` |
| `--mp-badge-size-md-scale` | `1` |
| `--mp-badge-size-lg-scale` | `1` |
| `--mp-badge-size-xl-scale` | `1` |
| `--mp-badge-size-xs-dot-width` | `4px` |
| `--mp-badge-size-sm-dot-width` | `5px` |
| `--mp-badge-size-md-dot-width` | `6px` |
| `--mp-badge-size-lg-dot-width` | `7px` |
| `--mp-badge-size-xl-dot-width` | `8px` |
| `--mp-badge-size-xs-dot-height` | `4px` |
| `--mp-badge-size-sm-dot-height` | `5px` |
| `--mp-badge-size-md-dot-height` | `6px` |
| `--mp-badge-size-lg-dot-height` | `7px` |
| `--mp-badge-size-xl-dot-height` | `8px` |
| `--mp-badge-size-xs-space` | `0px` |
| `--mp-badge-size-sm-space` | `var(--mp-sys-space-1)` |
| `--mp-badge-size-md-space` | `var(--mp-sys-space-3)` |
| `--mp-badge-size-lg-space` | `var(--mp-sys-space-3)` |
| `--mp-badge-size-xl-space` | `var(--mp-sys-space-4)` |
| `--mp-badge-size-xs-padding` | `0 var(--mp-sys-space-3)` |
| `--mp-badge-size-sm-padding` | `0 var(--mp-sys-space-3)` |
| `--mp-badge-size-md-padding` | `0 var(--mp-sys-space-4)` |
| `--mp-badge-size-lg-padding` | `0 var(--mp-sys-space-4)` |
| `--mp-badge-size-xl-padding` | `0 10px` |
| `--mp-badge-size-xs-height` | `20px` |
| `--mp-badge-size-sm-height` | `20px` |
| `--mp-badge-size-md-height` | `24px` |
| `--mp-badge-size-lg-height` | `28px` |
| `--mp-badge-size-xl-height` | `32px` |
| `--mp-badge-size-xs-border-radius` | `20px` |
| `--mp-badge-size-sm-border-radius` | `20px` |
| `--mp-badge-size-md-border-radius` | `24px` |
| `--mp-badge-size-lg-border-radius` | `28px` |
| `--mp-badge-size-xl-border-radius` | `32px` |
| `--mp-badge-bg-color` | `rgb(var(--mp-danger-7))` |
| `--mp-badge-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-default-bg-color` | `#e0e0e0` |
| `--mp-badge-status-default-text-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-badge-status-info-bg-color` | `var(--mp-sys-color-status-info)` |
| `--mp-badge-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-success-bg-color` | `var(--mp-sys-color-status-success)` |
| `--mp-badge-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-warning-bg-color` | `var(--mp-sys-color-status-warning)` |
| `--mp-badge-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-danger-bg-color` | `rgb(var(--mp-danger-7))` |
| `--mp-badge-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-primary-bg-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-badge-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-secondary-bg-color` | `rgb(var(--mp-gray-6))` |
| `--mp-badge-status-secondary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-status-tertiary-bg-color` | `rgb(var(--mp-gray-7))` |
| `--mp-badge-status-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-badge-variant-outline-bg-color` | `transparent` |
| `--mp-badge-variant-outline-text-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-badge-variant-outline-status-info-text-color` | `var(--mp-sys-color-content-info)` |
| `--mp-badge-variant-outline-status-success-text-color` | `var(--mp-sys-color-content-success)` |
| `--mp-badge-variant-outline-status-warning-text-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-badge-variant-outline-status-danger-text-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-badge-variant-outline-status-primary-text-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-badge-variant-outline-status-default-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-badge-variant-outline-status-secondary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-badge-variant-outline-status-tertiary-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-badge-border-color` | `var(--mp-sys-color-surface-default)` |
| `--mp-badge-offset` | `2px` |
| `--mp-badge-ring-width` | `2px` |

Filled badge text follows Button: primary, info, success, warning, danger and secondary use `content-on-dark`; tertiary uses `content-on-dark` in light mode and `content-on-bright` in dark mode. Default notification badges use red backgrounds and white text; the neutral background remains `#e0e0e0`.

Colored outline text and borders follow Button, using the matching `content-brand`, `content-info`, `content-success`, `content-warning` and `content-danger` semantic roles; secondary and tertiary outlines use `content-secondary` for readability. `variant-outline-bg-color` works for every status and defaults to transparent. The `color` prop overrides outline text and border; `text-color` overrides text further. Both preserve control through the background variable. Recheck contrast after customizing foreground or background.

### Color override boundaries

Fallback and danger fills use red backgrounds with white text: danger step 7 in light themes and step 4 in dark themes. The fixed neutral default fill and gray secondary/tertiary fills are intentional; override border-color to match a different host surface. Custom color/text-color contrast is caller-owned.
