<!-- Source: src/card/docs/en-US.md; locale: en-US; page: /en-US/card -->

# Card

Source changes synchronously invalidate render generations. Close, row direction, newer work, deactivation or disposal prevent old nextTick/timer/double-frame continuations from changing newer phases. Render/timer deliveries consume once. Recheck lifecycle/request/node after geometry hooks to reject reentrant disposal. Suspension cancels both timers and retained close/click input is inert; activation starts a fresh phase from current props without replay, and initial KeepAlive activation does not duplicate the wait.

## Basic examples

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

## Appearance and states

### Appearance configuration comparison

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Title | Appearance configuration comparison, Hover style |
| `description` | Description | Appearance configuration comparison |
| `hoverable` | Hover style | Hover style |
<!-- demo-config-notes:end -->


Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for content grouping and visual hierarchy. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

Example source: src/card/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'default', size: 'md' })
const demoCompareFields = [
  { name: 'variant', values: ['default', 'outline', 'tonal'] },
  { name: 'size', values: ['sm', 'md'] },
]
const demoCompareAxis = demoRef('variant')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)

__demoAppearance['elevation'] = 2
demoCompareFields.push({ name: 'elevation', values: [0, 2, 6] })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="variant">
        <mp-radio-group
          v-model="__demoAppearance['variant']"
          aria-label="variant"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'outline', value: 'outline' },
            { label: 'tonal', value: 'tonal' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item label="elevation"
        ><mp-radio-group
          v-model="__demoAppearance['elevation']"
          aria-label="elevation"
          :options="[
            { label: '0', value: 0 },
            { label: '2', value: 2 },
            { label: '6', value: 6 },
          ]"
      /></mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-card
          title="Project overview"
          description="Keep the team informed."
          v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"
        />
      </section>
    </div>
  </mp-space>
</template>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
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

## Layout and arrangement

### Images and directions

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `direction` | Order of cover and body, default column; supports row, column and row-reverse. Does not position the card itself | Images and directions |
| `title` | Title | Images and directions |
| `src` | Cover image URL; cover slot takes precedence | Images and directions |
| `alt` | Image alternative text | Images and directions |
| `image-height` | Image height; numbers use px | Images and directions |
| `image-width` | Image width; numbers use px | Images and directions |
<!-- demo-config-notes:end -->


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

## Content and presentation

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

## Customization and slots

### Custom header

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Title | Custom header |
| `top-divider` | Top divider | Content slots |
| `bottom-divider` | Bottom divider | Content slots |
<!-- demo-config-notes:end -->


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

## Interaction and control

### Ripple and click

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `title` | Title | Ripple and click, Floating and close |
| `ripple` | Click ripple | Ripple and click |
| `floating` | Fullscreen state; supports v-model:floating | Floating and close |
| `floating-duration` | Fullscreen transition duration in ms | Floating and close |
<!-- demo-config-notes:end -->


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

## Lifecycle and edge cases

### Floating scheduler lifecycle

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `floating` | Fullscreen state; supports v-model:floating | Floating scheduler lifecycle |
| `ripple` | Click ripple | Floating scheduler lifecycle |
| `floating-duration` | Fullscreen transition duration in ms | Floating scheduler lifecycle |
| `title` | Title | Floating scheduler lifecycle |
<!-- demo-config-notes:end -->


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

## Reading direction

Title, content and actions follow reading order. Default floating actions sit at inline end; images and custom slots are not mirrored.

## API

<!-- same-source-api:start -->
`row-reverse` reverses the horizontal cover and body order, with reading direction still following the container. Collapsed `floating-content` keeps its nodes and state but is inert to keyboard and assistive technology; it becomes interactive when expanded. Floating is available only in column direction.

The floating layer remains at the Card’s original DOM location. An ancestor’s transform or similar property may change the fixed-position containing block, and ancestor clipping may obscure the layer, so viewport coverage is not guaranteed. When focus is inside an expanded Card, Escape requests closing unless an inner control has already handled the key; a nested topmost popup handles Escape first. The layer does not provide modal focus management; use Dialog when modal interaction is required.

When focus is still inside the floating content or close controls, closing attempts to return focus to the element focused before expansion. If focus has moved elsewhere, it is left unchanged.

If the opener is inside an external closed Shadow Root, Card cannot access the internal control directly. The host must delegate focus or the application must restore focus. `delegatesFocus` can forward host focus into the root, but does not guarantee the original control when several controls are present.

The default close button uses the current locale's close label; override it with `close-button-aria-label`. `floating-duration` is a finite nonnegative number of milliseconds; 0 disables the delay and invalid values fall back to 250. With reduced motion enabled, opening and closing do not wait for ripple or transition animations; changing the preference during an animation also takes effect.

### Card Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| variant | Appearance | `default / outline / tonal` | `outline` |
| size | Density; omitted value follows platform rules below | `sm / md` | `undefined` |
| direction | Order of cover and body, default column; supports row, column and row-reverse. Does not position the card itself | `row / column / row-reverse` | `column` |
| hoverable | Hover styling | `boolean` | `false` |
| title-style | Title row styles | `CSSProperties` | `undefined` |
| title | Title | `string` | `undefined` |
| subtitle | Subtitle | `string` | `undefined` |
| description | Description | `string` | `undefined` |
| top-divider | Top divider | `boolean` | `false` |
| bottom-divider | Bottom divider | `boolean` | `false` |
| image-src | Cover image URL; cover slot takes precedence | `string` | `undefined` |
| image-fit | Cover image fit | `fill / contain / cover / none / scale-down` | `cover` |
| image-height | Image height; numbers use px | `string / number` | `undefined` |
| image-width | Image width; numbers use px | `string / number` | `undefined` |
| image-alt | Image alternative text | `string` | `undefined` |
| elevation | Shadow for default variant; true means level 1, false disables it, numeric levels 0–24 | `boolean / number` | `0` |
| ripple | Click ripple | `boolean` | `false` |
| floating | Fullscreen state; supports v-model:floating | `boolean` | `false` |
| floating-duration | Fullscreen transition duration in ms | `number` | `250` |
| close-button-aria-label | Accessible name of the default close button | `string` | `—` |

### Card Events

| Event | Arguments and timing |
| --- | --- |
| click | `(event: Event)`, emitted when the card is clicked |
| update:floating | `(value: boolean)`, emits false when the built-in close button or Escape requests closing; expansion is controlled by the parent |

### Card Slots

| Slot | Description | Prop |
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

### Card Methods

No public methods.

### Usage notes

Props, event arguments and slots match. Cedar inherits the global size when size is omitted: xs/sm map to sm, all others to md. Maple falls back to md. Pass size explicitly for identical density. Themes and CSS prefixes remain platform-specific.
Use the Loading directive to compose a loading overlay on Card.
<!-- same-source-api:end -->

## CSS Variables

Regular/filled backgrounds and borders use `surface-default`, `surface-muted` and `border-default`. Titles, body and secondary text use `content-primary`, `content-tertiary` and `content-secondary`. Expanded floating buttons use `content-primary`; text and icons on dark close buttons use `content-on-dark`.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-card-animation-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |
| `--mp-card-animation-easing` | `var(--mp-sys-motion-easing-standard)` | `transition-timing-function` |
| `--mp-card-background` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-card-border-radius` | `4px` | `border-radius` |
| `--mp-card-close-button-background` | `#212121` | `background-color` |
| `--mp-card-close-button-border-radius` | `50%` | `border-radius` |
| `--mp-card-close-button-icon-size` | `24px` | `font-size` |
| `--mp-card-close-button-size` | `56px` | `height`, `width` |
| `--mp-card-close-button-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-card-content-color` | `var(--mp-sys-color-content-tertiary)` | `color` |
| `--mp-card-content-font-size` | `14px` | `font-size` |
| `--mp-card-content-margin` | `16px 0 0 0` | `margin` |
| `--mp-card-content-padding` | `0 16px` | `padding` |
| `--mp-card-content-row-margin` | `16px 0 0 0` | `margin` |
| `--mp-card-description-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-card-description-font-size` | `14px` | `font-size` |
| `--mp-card-description-margin` | `20px 0 0 0` | `margin` |
| `--mp-card-description-padding` | `0 13px` | `padding` |
| `--mp-card-filled-background` | `var(--mp-sys-color-surface-muted)` | `background-color` |
| `--mp-card-floating-buttons-bottom` | `16px` | `bottom` |
| `--mp-card-floating-buttons-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-card-floating-buttons-right` | `16px` | `inset-inline-end` |
| `--mp-card-footer-bottom` | `9px` | `bottom` |
| `--mp-card-footer-margin` | `30px 0 0 0` | `margin` |
| `--mp-card-footer-padding` | `0 12px` | `padding` |
| `--mp-card-footer-right` | `13px` | `inset-inline-end` |
| `--mp-card-hover-shadow` | `0 4px 12px rgb(0 0 0%)` | `box-shadow` |
| `--mp-card-image-height` | `200px` | `height` |
| `--mp-card-image-width` | `100%` | `width` |
| `--mp-card-line-height` | `22px` | `line-height` |
| `--mp-card-outline-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-card-padding` | `0 0 15px 0` | `padding` |
| `--mp-card-row-height` | `140px` | `min-height` |
| `--mp-card-row-image-width` | `140px` | `width` |
| `--mp-card-row-line-height` | `1.5` | `line-height` |
| `--mp-card-size-sm-section-margin` | `8px 0 0` | `margin` |
| `--mp-card-size-sm-section-padding` | `0 12px` | `padding` |
| `--mp-card-size-sm-title-font-size` | `16px` | `font-size` |
| `--mp-card-subtitle-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-card-subtitle-font-size` | `14px` | `font-size` |
| `--mp-card-subtitle-margin` | `10px 0 0 0` | `margin` |
| `--mp-card-subtitle-padding` | `0 12px` | `padding` |
| `--mp-card-subtitle-row-margin` | `-8px 0 0 0` | `margin` |
| `--mp-card-title-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-card-title-font-size` | `20px` | `font-size` |
| `--mp-card-title-margin` | `15px 0 0 0` | `margin` |
| `--mp-card-title-padding` | `0 12px` | `padding` |
| `--mp-card-title-row-margin` | `12px 0` | `margin` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-card-background: var(--mp-sys-color-surface-default);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Sizing and motion

Use `--mp-card-content-row-margin` for horizontal content spacing. Card supports only sm / md sizes. `--mp-card-animation-duration` defaults to `var(--mp-sys-motion-duration-slow)` and `--mp-card-animation-easing` to `var(--mp-sys-motion-easing-standard)`. Reduced motion disables Card transitions.
