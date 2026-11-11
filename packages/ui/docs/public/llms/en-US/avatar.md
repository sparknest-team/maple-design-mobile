<!-- Source: src/avatar/docs/en-US.md; locale: en-US; page: /en-US/avatar -->

# Avatar

Both libraries use the same implementation and examples; package prefixes, themes and registration stay local.

## Basic examples

### Basic usage

Avatars default to a circle at the default size. Use the default slot for text or icons, or pass an image.

Example source: src/avatar/example/demos/basic.vue

```vue
<template>
  <mp-space align="center" :size="16" wrap>
    <mp-avatar>C</mp-avatar>
    <mp-avatar>CD</mp-avatar>
    <mp-avatar shape="square">Cedar</mp-avatar>
    <mp-avatar color="#00bebe">U</mp-avatar>
    <mp-avatar image-url="/cat.jpg" alt="一只猫" />
  </mp-space>
</template>
```

## Appearance and states

### Size and shape comparison

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `shape` | Avatar shape | Size and shape comparison, Color and border, Hoverable |
| `image-url` | Image URL | Size and shape comparison, Hoverable |
| `alt` | Image alternative text | Size and shape comparison, Hoverable |
| `bordered` | Whether to show a border | Color and border, Hoverable |
| `size` | Avatar width and height; numbers are px, strings are CSS lengths | Size and shape comparison |
| `color` | Background color | Color and border |
<!-- demo-config-notes:end -->


Compare space used at each size, then round and square boundaries. Image fitting and fallback remain separate.

<details>
<summary>Configuration details and limits</summary>

#### Size

`size` sets width and height. Numbers are px; strings are CSS lengths such as `3rem`. Text and image avatars both use it.

#### Shape

`shape` supports circle and square.

</details>

Example source: src/avatar/example/demos/shape-size-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const numericSizes = [24, 32, 40, 48, 64] as const

    const labels = { 24: 'A', 32: 'B', 40: 'C', 48: 'D', 64: 'E' } as const

    const imageSizes = [28, 36, 48, 64, 78] as const

    const cssSizes = ['3rem', '2.5em', '48px'] as const
    return { numericSizes, labels, imageSizes, cssSizes }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">尺寸</span><span lang="en-US">Size</span></h4>
      <mp-space direction="column" :size="20">
        <mp-space align="flex-end" :size="16" wrap>
          <mp-space v-for="size in scene1.numericSizes" :key="size" direction="column" align="center" :size="8">
            <mp-avatar :size="size">{{ scene1.labels[size] }}</mp-avatar>
            <span class="label">{{ size }}px</span>
          </mp-space>
        </mp-space>

        <mp-space align="flex-end" :size="16" wrap>
          <mp-space v-for="size in scene1.imageSizes" :key="size" direction="column" align="center" :size="8">
            <mp-avatar image-url="/cat.jpg" :alt="`${size}px`" :size="size" />
            <span class="label">{{ size }}px</span>
          </mp-space>
        </mp-space>

        <mp-space align="flex-end" :size="16" wrap>
          <mp-space v-for="size in scene1.cssSizes" :key="size" direction="column" align="center" :size="8">
            <mp-avatar :size="size">Aa</mp-avatar>
            <span class="label">{{ size }}</span>
          </mp-space>
        </mp-space>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="shape">
      <h4><span lang="zh-CN">形状</span><span lang="en-US">Shape</span></h4>
      <mp-space align="flex-end" :size="16" wrap>
        <mp-space direction="column" align="center" :size="8">
          <mp-avatar>圆</mp-avatar>
          <span class="label">circle</span>
        </mp-space>
        <mp-space direction="column" align="center" :size="8">
          <mp-avatar shape="square">方</mp-avatar>
          <span class="label">square</span>
        </mp-space>
        <mp-space direction="column" align="center" :size="8">
          <mp-avatar image-url="/cat.jpg" alt="圆形图片" />
          <span class="label">circle · 图片</span>
        </mp-space>
        <mp-space direction="column" align="center" :size="8">
          <mp-avatar image-url="/cat.jpg" alt="方形图片" shape="square" />
          <span class="label">square · 图片</span>
        </mp-space>
      </mp-space>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
  .label {
    color: var(--mp-color-text-3);
    font-size: var(--mp-font-size-sm);
  }
}
.demo-comparison-case--2 {
  .label {
    color: var(--mp-color-text-3);
    font-size: var(--mp-font-size-sm);
  }
}
</style>
```

### Color and border

`color` sets the background. `bordered` / `borderColor` control the outline.

Example source: src/avatar/example/demos/style.vue

```vue
<template>
  <mp-space align="center" :size="16" wrap>
    <mp-avatar color="var(--mp-color-warning)">火</mp-avatar>
    <mp-avatar color="var(--mp-color-danger)">Cedar</mp-avatar>
    <mp-avatar color="#00bebe">CD</mp-avatar>
    <mp-avatar color="#7b61ff" shape="square">A</mp-avatar>
    <mp-avatar bordered>B</mp-avatar>
    <mp-avatar bordered border-color="#00bebe" color="#e6fffb">C</mp-avatar>
  </mp-space>
</template>
```

### Hoverable

`hoverable` scales the avatar on hover, alone or inside a group.

Example source: src/avatar/example/demos/hoverable.vue

```vue
<template>
  <mp-space direction="column" :size="24">
    <mp-space align="center" :size="16" wrap>
      <mp-avatar hoverable>H</mp-avatar>
      <mp-avatar hoverable image-url="/cat.jpg" alt="悬停放大" />
      <mp-avatar hoverable shape="square">方</mp-avatar>
    </mp-space>
    <mp-avatar-group>
      <mp-avatar hoverable image-url="/cat.jpg" alt="用户一" bordered />
      <mp-avatar hoverable image-url="/cat2.jpg" alt="用户二" bordered />
      <mp-avatar hoverable image-url="/cat.jpg" alt="用户三" bordered />
      <mp-avatar hoverable bordered>+2</mp-avatar>
    </mp-avatar-group>
  </mp-space>
</template>
```

## Layout and arrangement

### Group direction and overflow

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `image-url` | Image URL | Group direction and overflow |
| `alt` | Image alternative text | Group direction and overflow |
| `bordered` | Whether to show a border | Group direction and overflow |
| `color` | Background color | Group direction and overflow |
<!-- demo-config-notes:end -->


Compare horizontal and vertical groups, maximum counts, stacking and overflow indicators.

<details>
<summary>Configuration details and limits</summary>

#### Avatar group

`AvatarGroup` stacks children. Use `bordered` for layered outlines, `maxCount` to fold extras into a Popover, `maxStyle` for the summary avatar, and `zIndexAscend` for stacking order. `shape` / `size` / `offset` apply to every child.

#### Vertical group

`vertical` stacks avatars in a column. `offset` is the overlap, in px when numeric.

</details>

Example source: src/avatar/example/demos/group-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="group">
      <h4><span lang="zh-CN">头像组</span><span lang="en-US">Avatar group</span></h4>
      <mp-space direction="column" :size="24">
        <mp-space direction="column" :size="8">
          <span class="label">默认叠层</span>
          <mp-avatar-group>
            <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
            <mp-avatar image-url="/cat.jpg" alt="用户三" bordered />
            <mp-avatar bordered>+2</mp-avatar>
          </mp-avatar-group>
        </mp-space>

        <mp-space direction="column" :size="8">
          <span class="label">max-count + max-style</span>
          <mp-avatar-group
            :max-count="3"
            :size="48"
            :max-style="{
              backgroundColor: '#1d2129',
              color: '#fff',
            }"
          >
            <mp-avatar image-url="/cat.jpg" alt="用户一" />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" />
            <mp-avatar color="#00bebe">A</mp-avatar>
            <mp-avatar color="#f59e0b">B</mp-avatar>
            <mp-avatar color="#ef4444">C</mp-avatar>
          </mp-avatar-group>
        </mp-space>

        <mp-space direction="column" :size="8">
          <span class="label">z-index-ascend</span>
          <mp-avatar-group z-index-ascend>
            <mp-avatar image-url="/cat.jpg" alt="用户一" />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" />
            <mp-avatar color="#7b61ff">CD</mp-avatar>
          </mp-avatar-group>
        </mp-space>

        <mp-space direction="column" :size="8">
          <span class="label">shape="square" · offset="-16"</span>
          <mp-avatar-group shape="square" :offset="-16" :size="40">
            <mp-avatar image-url="/cat.jpg" alt="用户一" />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" />
            <mp-avatar color="#00bebe">A</mp-avatar>
            <mp-avatar color="#7b61ff">B</mp-avatar>
          </mp-avatar-group>
        </mp-space>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="group-vertical">
      <h4><span lang="zh-CN">纵向头像组</span><span lang="en-US">Vertical group</span></h4>
      <mp-space align="flex-end" :size="32" wrap>
        <mp-space direction="column" :size="8">
          <span class="label">offset = -12</span>
          <mp-avatar-group vertical :offset="-12">
            <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
            <mp-avatar image-url="/cat.jpg" alt="用户三" bordered />
            <mp-avatar bordered>+2</mp-avatar>
          </mp-avatar-group>
        </mp-space>
        <mp-space direction="column" :size="8">
          <span class="label">offset = -20</span>
          <mp-avatar-group vertical :offset="-20" :size="48">
            <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
            <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
            <mp-avatar color="#00bebe">A</mp-avatar>
          </mp-avatar-group>
        </mp-space>
      </mp-space>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
  .label {
    color: var(--mp-color-text-3);
    font-size: var(--mp-font-size-sm);
  }
}
.demo-comparison-case--2 {
  .label {
    color: var(--mp-color-text-3);
    font-size: var(--mp-font-size-sm);
  }
}
</style>
```

## Content and presentation

### Auto-fit text

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `image-url` | Image URL | Image avatar, Image fit, Loading and fallback |
| `alt` | Image alternative text | Image avatar, Image fit, Loading and fallback |
| `size` | Avatar width and height; numbers are px, strings are CSS lengths | Image avatar, Image fit, Loading and fallback |
| `shape` | Avatar shape | Auto-fit text, Image avatar |
| `auto-fix-font-size` | Whether to shrink long text automatically | Auto-fit text |
| `object-fit` | Image fitting mode | Image fit |
<!-- demo-config-notes:end -->


Long text scales to the avatar width by default. Updated slot text is measured after rendering; shortening it restores the original scale when it fits. Set `auto-fix-font-size` to `false` to keep the original size.

Example source: src/avatar/example/demos/auto-fix.vue

```vue
<template>
  <mp-space direction="column" :size="16">
    <mp-space align="center" :size="16" wrap>
      <mp-space direction="column" align="center" :size="8">
        <mp-avatar>{{ text }}</mp-avatar>
        <span class="label">圆形 · 自适应</span>
      </mp-space>
      <mp-space direction="column" align="center" :size="8">
        <mp-avatar shape="square">{{ text }}</mp-avatar>
        <span class="label">方形 · 自适应</span>
      </mp-space>
      <mp-space direction="column" align="center" :size="8">
        <mp-avatar :auto-fix-font-size="false">{{ text }}</mp-avatar>
        <span class="label">关闭自适应</span>
      </mp-space>
    </mp-space>
    <mp-input v-model="text" :style="{ width: '240px' }" placeholder="输入更长的文字看缩放" clearable />
  </mp-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('Cedar')
</script>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

### Image avatar

Set `imageUrl` and provide `alt`. You can also put `img` / `picture` in the default slot.

Example source: src/avatar/example/demos/image.vue

```vue
<template>
  <mp-space align="center" :size="16" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" alt="一只猫" />
      <span class="label">image-url</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat2.jpg" alt="一只猫" :size="48" shape="square" />
      <span class="label">方形图片</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar :size="48">
        <img src="/cat.jpg" alt="默认插槽中的图片" />
      </mp-avatar>
      <span class="label">默认插槽 img</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

### Image fit

`objectFit` controls how the image fills the avatar.

Example source: src/avatar/example/demos/fit.vue

```vue
<template>
  <mp-space align="flex-end" :size="24" wrap>
    <mp-space v-for="fit in fits" :key="fit" direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" :alt="fit" :object-fit="fit" :size="56" />
      <span class="label">{{ fit }}</span>
    </mp-space>
  </mp-space>
</template>

<script lang="ts" setup>
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
</script>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

### Loading and fallback

`lazy` enables lazy loading. `loading` is the placeholder. Failed loads can use an `error` image or the `error` slot.

Example source: src/avatar/example/demos/fallback.vue

```vue
<template>
  <mp-space align="flex-end" :size="24" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar lazy image-url="/cat.jpg" loading="/cat2.jpg" alt="懒加载与占位图" :size="48" />
      <span class="label">lazy + loading</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="data:image/png;base64,AA==" error="/cat.jpg" alt="失败时回退到占位图" :size="48" />
      <span class="label">error 图片</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="data:image/png;base64,AA==" alt="失败插槽" :size="48">
        <template #error>NA</template>
      </mp-avatar>
      <span class="label">error 插槽</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

## Interaction and control

### Trigger icon

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `image-url` | Image URL | Trigger icon |
| `alt` | Image alternative text | Trigger icon |
| `size` | Avatar width and height; numbers are px, strings are CSS lengths | Trigger icon |
| `trigger-type` | How the action icon is shown | Trigger icon |
<!-- demo-config-notes:end -->


The `trigger-icon` slot adds an action. `triggerType` is `button` or `overlay`; clicks emit `click`.

Example source: src/avatar/example/demos/trigger.vue

```vue
<template>
  <mp-space align="flex-end" :size="32" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" alt="头像" trigger-aria-label="编辑头像" :size="56" @click="onClick('button')">
        <template #trigger-icon>+</template>
      </mp-avatar>
      <span class="label">{{ last === 'button' ? 'click · button' : 'trigger-type="button"' }}</span>
    </mp-space>

    <mp-space direction="column" align="center" :size="8">
      <mp-avatar
        image-url="/cat2.jpg"
        alt="头像"
        trigger-aria-label="更换头像"
        :size="56"
        trigger-type="overlay"
        @click="onClick('overlay')"
      >
        <template #trigger-icon>+</template>
      </mp-avatar>
      <span class="label">{{ last === 'overlay' ? 'click · overlay' : 'trigger-type="overlay"' }}</span>
    </mp-space>
  </mp-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const last = ref('')

function onClick(type: string) {
  last.value = type
}
</script>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

## API

<!-- same-source-api:start -->
The default image `error` icon retains a nonempty `alt` as its accessible name; an empty `alt` denotes decoration. Provide appropriate semantics for a custom `error` slot. The default slot may switch dynamically between images and text; application code owns slotted image load events and styles.

When `trigger-icon` contains no interactive control, the avatar exposes button semantics and supports Enter and Space. Describe the action with `trigger-aria-label` or the root `aria-label`. If the slot supplies its own interactive control, that control handles keyboard input. The default click-triggered group summary can be opened by keyboard; Escape closes it and restores focus.

### Avatar Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| shape | Avatar shape | `circle / square` | `circle` |
| image-url | Image URL | `string` | `-` |
| alt | Image alternative text | `string` | `''` |
| size | Avatar width and height; numbers are px, strings are CSS lengths | `number / string` | `-` |
| auto-fix-font-size | Whether to shrink long text automatically | `boolean` | `true` |
| trigger-type | How the action icon is shown | `button / overlay` | `button` |
| trigger-aria-label | Accessible name of the interaction | `string` | `—` |
| trigger-icon-style | Custom style for the action icon | `CSSProperties` | `-` |
| object-fit | Image fitting mode | `fill / contain / cover / none / scale-down` | `cover` |
| color | Background color | `string` | `-` |
| bordered | Whether to show a border | `boolean` | `false` |
| border-color | Border color | `string` | `-` |
| loading | Placeholder image while loading | `string` | `-` |
| error | Fallback image URL when image loading fails | `string` | `-` |
| lazy | Whether to lazy-load the image | `boolean` | `false` |
| hoverable | Whether to scale on hover | `boolean` | `false` |

### Avatar Events

| Event | Description | Arguments |
| --- | --- | --- |
| click | Emitted when the avatar is clicked | `(event: MouseEvent) => void` |
| load | Emitted when the image loads | `() => void` |
| error | Emitted when image loading fails | `() => void` |

### Avatar Slots

| Slot | Description |
| --- | --- |
| default | Text, icon, or loading content for an image |
| error | Fallback content when image loading fails |
| trigger-icon | Action icon on the avatar |

### Avatar Methods

No custom public methods.
<!-- same-source-api:end -->

Group `shape` and `auto-fix-font-size` override item values, and a supplied group `size` takes priority. `max-count` is a nonnegative integer; zero or an invalid value means unlimited. Numeric `size` must be finite and nonnegative; invalid numbers use the default, while strings are CSS lengths. `offset` accepts finite negative numbers or CSS length strings; invalid numbers use the default spacing. The summary participates in group stacking order, which overrides z-index in `max-style`.

### AvatarGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| shape | Child avatar shape | `circle / square` | `circle` |
| size | Child avatar width and height; numbers are px, strings are CSS lengths | `number / string` | `-` |
| auto-fix-font-size | Whether to shrink child avatar text automatically | `boolean` | `true` |
| max-count | Maximum visible avatars; `0` means unlimited | `number` | `0` |
| z-index-ascend | Use ascending stacking order | `boolean` | `false` |
| max-style | Custom summary avatar style | `CSSProperties` | `-` |
| max-popover-props | Summary Popover props | `PopoverProps` | `-` |
| offset | Overlap offset | `number / string` | `-` |
| vertical | Stack avatars vertically | `boolean` | `false` |

### AvatarGroup Slots

| Slot | Description |
| --- | --- |
| default | Avatar list |

## Types

```ts
import type {
  AvatarGroupInstance,
  AvatarGroupProps,
  AvatarInstance,
  AvatarProps,
  AvatarObjectFit,
  AvatarShape,
  AvatarTriggerType,
} from '@maple-design/ui-vue';
```

## CSS Variables

Text, summary counts, and button-style trigger icons use the primary content role. Borders follow the ordinary container surface; only icons on the dark interaction overlay use `content-on-dark`. The `fill-4` avatar background, trigger background/hover step, and translucent black overlay remain component visual values. If the `color` prop changes the avatar background, check text contrast and override `text-color` when needed. Maple's dark avatar background remains a component-specific `#303030`.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-avatar-bg` | `var(--mp-color-fill-4)` | `background-color` |
| `--mp-avatar-border-color` | `var(--mp-sys-color-surface-default)` | `border` |
| `--mp-avatar-border-width` | `2px` | `border` |
| `--mp-avatar-circle-border-radius` | `50%` | `border-radius` |
| `--mp-avatar-font-size-max-count` | `20px` | `font-size` |
| `--mp-avatar-font-size-text` | `20px` | `font-size` |
| `--mp-avatar-font-weight-text` | `500` | `font-weight` |
| `--mp-avatar-group-item-border` | `var(--mp-sys-color-surface-default)` | `border` |
| `--mp-avatar-group-item-border-width` | `2px` | `border` |
| `--mp-avatar-group-offset` | `-10px` | `margin-block-start`, `margin-inline-start` |
| `--mp-avatar-group-popover-item-spacing` | `8px` | `gap` |
| `--mp-avatar-hover-transform` | `scale(1.1)` | `transform` |
| `--mp-avatar-max-count-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-avatar-motion-duration` | `0.2s` | `transition` |
| `--mp-avatar-size-default` | `40px` | `height`, `width` |
| `--mp-avatar-size-trigger-button` | `20px` | `height`, `width` |
| `--mp-avatar-size-trigger-icon` | `12px` | `font-size` |
| `--mp-avatar-spacing-trigger-button-bottom` | `4px` | `bottom` |
| `--mp-avatar-spacing-trigger-button-right` | `4px` | `inset-inline-end` |
| `--mp-avatar-square-border-radius` | `4px` | `border-radius` |
| `--mp-avatar-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-avatar-text-padding-inline` | `4px` | `padding-inline` |
| `--mp-avatar-trigger-button-bg` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-avatar-trigger-button-bg-hover` | `var(--mp-color-fill-3)` | `background-color` |
| `--mp-avatar-trigger-button-border-radius` | `50%` | `border-radius` |
| `--mp-avatar-trigger-icon-button` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-avatar-trigger-overlay-bg` | `color-mix(in srgb, var(--mp-color-black) 60%, transparent)` | `background-color` |
| `--mp-avatar-trigger-overlay-font-size` | `16px` | `font-size` |
| `--mp-avatar-trigger-overlay-icon` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-avatar-z-index-overlay` | `0` | `z-index` |
| `--mp-avatar-z-index-overlay-hover` | `2` | `z-index` |
| `--mp-avatar-z-index-trigger` | `1` | `z-index` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-avatar-border-color: var(--mp-sys-color-surface-default);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Reduced motion

Built-in CSS transitions follow `prefers-reduced-motion: reduce`. Removing transitions does not change final visibility, selected/expanded state or event semantics. Applications control custom animations inside slots.
