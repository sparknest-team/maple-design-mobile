<!-- Source: src/empty/docs/en-US.md; locale: en-US; page: /en-US/empty -->

# Empty

Shown when the current view has no data. Examples match Cedar Design Web, with a more compact mobile layout.

## Basic examples

### Basic Usage

Basic empty state. Without `description`, the i18n copy is used.

Example source: src/empty/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-empty description="暂无数据" />
</template>
```

## Appearance and states

### Image Size

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `image-size` | Image/icon size | Image Size |
| `description` | Description; falls back to i18n | Image Size |
<!-- demo-config-notes:end -->


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

## Content and presentation

### Empty-state image and actions

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `description` | Description; falls back to i18n | Empty-state image and actions, Show and Hide |
| `image-url` | Custom image URL | Empty-state image and actions |
| `alt` | Image alternative text | Empty-state image and actions |
| `show-icon` | Whether to show the icon | Show and Hide |
| `show-description` | Whether to show the description | Show and Hide |
<!-- demo-config-notes:end -->


Compare custom artwork and extra actions to distinguish content replacement from supplemental controls.

<details>
<summary>Configuration details and limits</summary>

#### Custom Image and Copy

Customize the illustration with the `image` slot or default slot copy. Use `image-url` for an image source.

#### Extra Action

Reload updates a local attempt counter and description only; it does not call a service. Provide your own request and result state for real reload behavior.

Add actions with the `extra` slot.

</details>

Example source: src/empty/example/demos/content-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const attempts = ref(0)
    return { attempts }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="extra-slot">
      <h4><span lang="zh-CN">操作按钮</span><span lang="en-US">Extra Action</span></h4>
      <mp-empty :description="scene1.attempts ? 'No data. Local refresh completed.' : 'No data, please reload'">
        <template #extra>
          <mp-button status="primary" @click="scene1.attempts++">Reload</mp-button>
          <p aria-live="polite">Local refresh attempts: {{ scene1.attempts }}</p>
        </template>
      </mp-empty>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="custom-image">
      <h4><span lang="zh-CN">自定义图片和文案</span><span lang="en-US">Custom Image and Copy</span></h4>
      <mp-space direction="column" :size="24">
        <mp-empty>
          <template #image>
            <m-icon-alert-circle />
          </template>
          No data, please reload!!
        </mp-empty>
        <mp-empty image-url="/cat.jpg" alt="空状态图片" description="自定义图片和文案" />
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
</style>
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

### Empty Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `description` | Description; falls back to i18n | `string` | `-` |
| `image-url` | Custom image URL | `string` | `-` |
| `alt` | Image alternative text | `string` | `''` |
| `image-size` | Image/icon size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `'md'` |
| `show-icon` | Whether to show the icon | `boolean` | `true` |
| `show-description` | Whether to show the description | `boolean` | `true` |

### Empty Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Click callback | `(event: MouseEvent)` |

### Empty Slots

| Slot | Description |
| --- | --- |
| `default` | Description content |
| `image` | Custom icon/image |
| `extra` | Extra actions |

## Types

```ts
type EmptyImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string
```

## CSS Variables

Descriptions use low-emphasis text semantics; decorative icons use `content-decorative`, which must not be used for readable text. Custom images or slots may supply their own colors and are not forcibly recolored by `icon-color`. Sizing and spacing may follow mobile density while same-name tokens keep Cedar's responsibilities.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-empty-description-color` | `var(--mp-sys-color-content-tertiary)` | `color` |
| `--mp-empty-description-font-size` | `14px` | `font-size` |
| `--mp-empty-description-line-height` | `1.5` | `line-height` |
| `--mp-empty-extra-margin-top` | `20px` | `margin-top` |
| `--mp-empty-icon-color` | `var(--mp-sys-color-content-decorative)` | `color` |
| `--mp-empty-image-margin-bottom` | `4px` | `margin-bottom` |
| `--mp-empty-padding` | `20px` | `padding` |
| `--mp-empty-size-lg` | `140px` | `font-size`, `height`, `width` |
| `--mp-empty-size-md` | `120px` | `font-size`, `height`, `width` |
| `--mp-empty-size-sm` | `100px` | `font-size`, `height`, `width` |
| `--mp-empty-size-xl` | `160px` | `font-size`, `height`, `width` |
| `--mp-empty-size-xs` | `80px` | `font-size`, `height`, `width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-empty-description-color: var(--mp-sys-color-content-tertiary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
