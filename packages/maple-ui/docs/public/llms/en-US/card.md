<!-- Source: src/card/docs/en-US.md; locale: en-US; page: /en-US/card -->

# Card

Source changes synchronously invalidate render generations. Close, row direction, newer work, deactivation or disposal prevent old nextTick/timer/double-frame continuations from changing newer phases. Render/timer deliveries consume once. Recheck lifecycle/request/node after geometry hooks to reject reentrant disposal. Suspension cancels both timers and retained close/click input is inert; activation starts a fresh phase from current props without replay, and initial KeepAlive activation does not duplicate the wait.

## Examples

### Basic usage and subtitle

Example source: src/card/example/demos/basic.vue

```vue
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card title="Project overview" description="Keep the team informed." />
    <mp-card
      title="Project overview"
      subtitle="Updated today"
      description="Keep the team informed."
      top-divider
      bottom-divider
    >
      Release checklist and project updates.
      <template #title-action><mp-button size="sm">More</mp-button></template>
      <template #footer><mp-button status="primary">View details</mp-button></template>
    </mp-card>
  </mp-space>
</template>
```

### Variants and elevation

Example source: src/card/example/demos/variant.vue

```vue
<script setup lang="ts">
const variants = ['default', 'outline', 'tonal'] as const
</script>

<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card v-for="variant in variants" :key="variant" :variant="variant" :title="variant">Card content</mp-card>
    <mp-card :elevation="false" title="No elevation">Card content</mp-card>
    <mp-card :elevation="4" title="Elevation 4">Card content</mp-card>
  </mp-space>
</template>
```

### Sizes

Example source: src/card/example/demos/size.vue

```vue
<script setup lang="ts">
const sizes = ['sm', 'md'] as const
</script>

<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card v-for="size in sizes" :key="size" :size="size" :title="size" subtitle="Content density"
      >Card content</mp-card
    >
  </mp-space>
</template>
```

### Appearance combinations

Use this example for content grouping and visual hierarchy. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/card/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'default', size: 'md' })
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
            { label: 'tonal', value: 'tonal' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-card title="Project overview" description="Keep the team informed." v-bind="__demoAppearance" />
  </mp-space>
</template>
```

### Custom header

Example source: src/card/example/demos/no-padding.vue

```vue
<template>
  <mp-card title="Fallback title">
    <template #header
      ><header style="padding: 16px">
        <strong>Custom header</strong>
        <p>Replaces the title and subtitle region.</p>
      </header></template
    >
    Card content
  </mp-card>
</template>
```

### Hover style

Example source: src/card/example/demos/hoverable.vue

```vue
<template>
  <mp-card hoverable title="Hover over this card" style="width: 100%; max-width: 360px"
    >Hover feedback on pointer devices.</mp-card
  >
</template>
```

### Images and directions

Example source: src/card/example/demos/image.vue

```vue
<script setup lang="ts">
const imageSrc = `${(import.meta as ImportMeta & { env: { BASE_URL: string } }).env.BASE_URL}cat.jpg`
const directions = ['column', 'row', 'row-reverse'] as const
</script>

<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card
      v-for="direction in directions"
      :key="direction"
      :direction="direction"
      :title="direction"
      :src="imageSrc"
      alt="Cat"
      :image-height="120"
      :image-width="direction === 'column' ? '100%' : 100"
      fit="cover"
      >Card content</mp-card
    >
    <mp-card title="Custom cover"
      ><template #cover
        ><img :src="imageSrc" alt="Cat" style="width: 100%; height: 120px; object-fit: cover" /></template
      >Cover slot overrides the image.</mp-card
    >
  </mp-space>
</template>
```

### Long title and tooltip

Example source: src/card/example/demos/tooltip.vue

```vue
<script setup lang="ts">
const title = 'Project overview with a long title that does not fit on one line'
</script>

<template>
  <mp-card style="width: 100%; max-width: 280px">
    <template #title
      ><span class="long-title" :title="title">{{ title }}</span></template
    >
    <template #description
      ><span class="long-title" :title="title">{{ title }}</span></template
    >
    Native title tooltip on pointer devices; the full text remains in the DOM.
  </mp-card>
</template>

<style scoped>
.long-title {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
```

### Ripple and click

Example source: src/card/example/demos/ripple.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const clicks = ref(0)
</script>

<template>
  <mp-card ripple title="Click this card" @click="clicks++"
    >Clicks: <output aria-live="polite">{{ clicks }}</output></mp-card
  >
</template>
```

### Floating and close

Example source: src/card/example/demos/floating.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const floating = ref(false)
</script>

<template>
  <mp-card v-model:floating="floating" title="Project overview" :floating-duration="250">
    Summary content
    <template #footer><mp-button status="primary" @click="floating = true">Expand</mp-button></template>
    <template #floating-content><p style="padding: 16px">Expanded project details.</p></template>
    <template #close-button
      ><mp-button aria-label="Close expanded card" @click.stop="floating = false">Close</mp-button></template
    >
  </mp-card>
</template>
```

### Content slots

Example source: src/card/example/demos/slots.vue

```vue
<template>
  <mp-card top-divider bottom-divider>
    <template #cover><div style="padding: 16px">Custom cover</div></template>
    <template #title="{ slotClass }"><strong :class="slotClass">Custom title</strong></template>
    <template #title-action><mp-button size="sm">More</mp-button></template>
    <template #subtitle="{ slotClass }"><span :class="slotClass">Custom subtitle</span></template>
    <template #description="{ slotClass }"><p :class="slotClass">Custom description</p></template>
    Default content
    <template #footer><mp-button status="primary">Confirm</mp-button></template>
  </mp-card>
</template>
```

### Floating scheduler lifecycle / 浮起调度生命周期

Example source: src/card/example/demos/en-US/scheduler-lifecycle.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const floating = ref(false)
const ripple = ref(true)
const duration = ref(250)
</script>
<template>
  <div>
    <mp-button @click="floating = !floating">Float / 浮起与回落</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="mounted = !mounted">Mount / 卸载与挂载</mp-button>
    <mp-button @click="ripple = !ripple">Ripple wait / 涟漪等待</mp-button>
    <mp-button @click="duration = duration ? 0 : 250">Duration / 零与默认时长</mp-button>
    <p>
      Toggle floating rapidly, suspend during500ms ripple wait or layout settlement, then activate. Old tasks must not
      reset a newer phase. Underlying doubleRaf frames are not physically canceled.
    </p>
    <KeepAlive v-if="mounted">
      <mp-card
        v-if="active"
        v-model:floating="floating"
        :ripple="ripple"
        :floating-duration="duration"
        title="Floating lifecycle / 浮起生命周期"
      >
        Card content / 卡片内容
        <template #floating-content>
          <mp-button @click.stop="floating = false">Collapse / 回落</mp-button>
          <mp-button @click.stop="active = false">Deactivate / 停用</mp-button>
          <mp-button @click.stop="mounted = false">Unmount / 卸载</mp-button>
        </template>
      </mp-card>
    </KeepAlive>
  </div>
</template>
```

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

### scheduler-lifecycle

Example source: src/card/example/demos/scheduler-lifecycle.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const floating = ref(false)
const ripple = ref(true)
const duration = ref(250)
</script>
<template>
  <div>
    <mp-button @click="floating = !floating">Float / 浮起与回落</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="mounted = !mounted">Mount / 卸载与挂载</mp-button>
    <mp-button @click="ripple = !ripple">Ripple wait / 涟漪等待</mp-button>
    <mp-button @click="duration = duration ? 0 : 250">Duration / 零与默认时长</mp-button>
    <p>
      Toggle floating rapidly, suspend during500ms ripple wait or layout settlement, then activate. Old tasks must not
      reset a newer phase. Underlying doubleRaf frames are not physically canceled.
    </p>
    <KeepAlive v-if="mounted">
      <mp-card
        v-if="active"
        v-model:floating="floating"
        :ripple="ripple"
        :floating-duration="duration"
        title="Floating lifecycle / 浮起生命周期"
      >
        Card content / 卡片内容
        <template #floating-content>
          <mp-button @click.stop="floating = false">Collapse / 回落</mp-button>
          <mp-button @click.stop="active = false">Deactivate / 停用</mp-button>
          <mp-button @click.stop="mounted = false">Unmount / 卸载</mp-button>
        </template>
      </mp-card>
    </KeepAlive>
  </div>
</template>
```

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| variant | Appearance | `default / outline / tonal` | `default` |
| size | Density; omitted value follows platform rules below | `sm / md` | `undefined` |
| direction | Cover and body layout | `row / column / row-reverse` | `column` |
| hoverable | Hover styling | `boolean` | `false` |
| title-style | Title row styles | `CSSProperties` | `undefined` |
| title | Title | `string` | `undefined` |
| subtitle | Subtitle | `string` | `undefined` |
| description | Description | `string` | `undefined` |
| top-divider | Top divider | `boolean` | `false` |
| bottom-divider | Bottom divider | `boolean` | `false` |
| src | Cover image URL; cover slot takes precedence | `string` | `undefined` |
| fit | Cover image fit | `fill / contain / cover / none / scale-down` | `cover` |
| image-height | Image height; numbers use px | `string / number` | `undefined` |
| image-width | Image width; numbers use px | `string / number` | `undefined` |
| alt | Image alternative text | `string` | `undefined` |
| elevation | Shadow for default variant; true means level 1, false disables it, numeric levels 0–24 | `boolean / number` | `true` |
| ripple | Click ripple | `boolean` | `false` |
| floating | Fullscreen state; supports v-model:floating | `boolean` | `false` |
| floating-duration | Fullscreen transition duration in ms | `number` | `250` |

### Events

| Event | Arguments and timing |
| --- | --- |
| click | `(event: Event)`, when the card is clicked |
| update:floating | `(value: boolean)`, built-in close requests false; the parent controls opening |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| default | Body | — |
| cover | Cover; overrides src | — |
| header | Entire header; overrides title, title-action and subtitle | — |
| title | Title | `{ slotClass: string }` |
| title-action | Title action | — |
| subtitle | Subtitle | `{ slotClass: string }` |
| description | Description | `{ slotClass: string }` |
| footer | Footer actions | — |
| floating-content | Expanded content; column layout only | — |
| close-button | Custom close button; update floating yourself | — |

### Methods

No public methods.

### Platform notes

Cedar inherits global size when omitted (xs/sm map to sm, others to md); Maple falls back to md. Pass size explicitly for matching density. Themes and CSS prefixes remain platform-specific. Card has no loading prop; compose it with the Loading directive.
<!-- same-source-api:end -->

### Style Variables

| Variable | Default |
| --- | --- |
| `--mp-card-hover-shadow` | `0 4px 12px rgb(0 0 0 / 12%)` |
| `--mp-card-size-sm-title-font-size` | `16px` |
| `--mp-card-size-sm-section-margin` | `8px 0 0` |
| `--mp-card-size-sm-section-padding` | `0 12px` |
| `--mp-card-padding` | `0 0 15px 0` |
| `--mp-card-background` | `var(--mp-sys-color-surface-default)` |
| `--mp-card-filled-background` | `var(--mp-sys-color-surface-muted)` |
| `--mp-card-outline-color` | `var(--mp-sys-color-border-default)` |
| `--mp-card-border-radius` | `4px` |
| `--mp-card-image-width` | `100%` |
| `--mp-card-row-image-width` | `140px` |
| `--mp-card-image-height` | `200px` |
| `--mp-card-row-height` | `140px` |
| `--mp-card-title-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-card-title-font-size` | `20px` |
| `--mp-card-title-padding` | `0 12px` |
| `--mp-card-title-margin` | `15px 0 0 0` |
| `--mp-card-title-row-margin` | `12px 0` |
| `--mp-card-content-padding` | `0 16px` |
| `--mp-card-content-margin` | `16px 0 0 0` |
| `--mp-card-content-color` | `var(--mp-sys-color-content-tertiary)` |
| `--mp-card-content-font-size` | `14px` |
| `--mp-card-content-row-margin` | `16px 0 0 0` |
| `--mp-card-subtitle-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-card-subtitle-font-size` | `14px` |
| `--mp-card-subtitle-padding` | `0 12px` |
| `--mp-card-subtitle-margin` | `10px 0 0 0` |
| `--mp-card-subtitle-row-margin` | `-8px 0 0 0` |
| `--mp-card-description-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-card-description-font-size` | `14px` |
| `--mp-card-description-margin` | `20px 0 0 0` |
| `--mp-card-description-padding` | `0 13px` |
| `--mp-card-footer-padding` | `0 12px` |
| `--mp-card-footer-right` | `13px` |
| `--mp-card-footer-bottom` | `9px` |
| `--mp-card-footer-margin` | `30px 0 0 0` |
| `--mp-card-line-height` | `22px` |
| `--mp-card-row-line-height` | `1.5` |
| `--mp-card-floating-buttons-bottom` | `16px` |
| `--mp-card-floating-buttons-right` | `16px` |
| `--mp-card-floating-buttons-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-card-close-button-icon-size` | `24px` |
| `--mp-card-close-button-size` | `56px` |
| `--mp-card-close-button-background` | `#212121` |
| `--mp-card-close-button-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-card-close-button-border-radius` | `50%` |

Card body colors share Cedar's system roles: default and filled surfaces use `surface-default` and `surface-muted`, the outline uses `border-default`, and title, body, and supporting text use `content-primary`, `content-tertiary`, and `content-secondary`. The dark theme keeps these roles. The expanded floating-button container sits on the card surface and uses `content-primary`; text and icons on the dark close button use `content-on-dark`. Its `#212121` background is Card-specific, not the global primary action color. See the Design Token guide for the former variable name's migration.

### Token consumer contract

Row content consumes `--mp-card-content-row-margin`, independently from the title margin. Card intentionally exposes only sm/md density, not all five control sizes. Motion uses `--mp-card-animation-duration` (`var(--mp-sys-motion-duration-slow)`) and `--mp-card-animation-easing` (`var(--mp-sys-motion-easing-standard)`). Reduced motion disables transitions on every animated Card section.
