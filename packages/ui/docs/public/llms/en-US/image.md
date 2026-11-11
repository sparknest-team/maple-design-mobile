<!-- Source: src/image/docs/en-US.md; locale: en-US; page: /en-US/image -->

# Image

Single and grouped previews default to body-mounted viewport overlays. Only explicit `:popup-container="false"` renders inline and requires a positioned, sized parent. Only the active image's load/error settles its loading indicator; returning to a cached image does not leave the spinner visible.

Closing the preview, changing the image or changing looping cancels pending movement. Deactivation or unmounting stops movement; reactivation uses the current image.

## Basic examples

### Basic usage

Set `src` to render an image with preview enabled.

Example source: src/image/example/demos/basic.vue

```vue
<template>
  <mp-image width="200" src="/cat.jpg" />
</template>
```

## Image presentation and states

### Fit mode

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `width` | Image width | Fit mode, Captions and additional content, Error state |
| `src` | Image URL | Fit mode, Captions and additional content, Error state |
| `height` | Image height | Fit mode, Error state, Loading |
| `preview-disabled` | Whether click preview is disabled | Fit mode, Loading, Lazy load and fallback |
| `object-fit` | Fit: fill/contain/cover/none/scale-down | Fit mode, Lazy load and fallback |
| `title` | Image `title` text, the same as with the native attributes of the `img` tag | Captions and additional content |
<!-- demo-config-notes:end -->


Use `object-fit` to control how the image fills its box.

Example source: src/image/example/demos/fit-mode.vue

```vue
<script setup lang="ts">
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
</script>

<template>
  <mp-space :size="16" wrap>
    <mp-space v-for="fit in fits" :key="fit" direction="column" align="center" :size="8">
      <mp-image width="120" height="120" :object-fit="fit" preview-disabled src="/cat.jpg" />
      <span class="label">{{ fit }}</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: 12px;
}
</style>
```

### Captions and additional content

Compare caption and extra-slot placement independently of previews, loading and failures.

<details>
<summary>Configuration details and limits</summary>

#### Caption

Use `title`, `description` and `footer-position` to place the caption.

#### Extra footer

Use the `extra` slot to add custom footer content.

</details>

Example source: src/image/example/demos/content-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="caption">
      <h4><span lang="zh-CN">标题与描述</span><span lang="en-US">Caption</span></h4>
      <mp-space :size="24" wrap>
        <mp-image width="200" src="/cat.jpg" title="一只猫" description="页脚在图片内侧" />
        <mp-image width="200" src="/cat2.jpg" title="一只猫" description="页脚在图片外侧" footer-position="outer" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="extra">
      <h4><span lang="zh-CN">底部额外内容</span><span lang="en-US">Extra footer</span></h4>
      <mp-space :size="24" wrap>
        <mp-image width="200" src="/cat.jpg" title="一只猫" description="内侧额外内容">
          <template #extra>
            <span class="extra">Extra</span>
          </template>
        </mp-image>
        <mp-image width="200" src="/cat.jpg" title="一只猫" description="外侧额外内容" footer-position="outer">
          <template #extra>
            <span class="extra extra--outer">Extra</span>
          </template>
        </mp-image>
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
.demo-comparison-case--2 {
  .extra {
    padding: 2px 8px;
    color: #fff;
    font-size: 12px;
    background: rgb(0 0 0 / 45%);
    border-radius: 10px;
  }

  .extra--outer {
    color: currentColor;
    background: var(--mp-color-fill-2);
  }
}
</style>
```

### Error state

The example uses corrupt inline image data to exercise decode errors without requesting a missing HTTP resource.

Failed images show the default error state, or a custom `error` slot.

Example source: src/image/example/demos/error.vue

```vue
<template>
  <mp-space :size="16" wrap>
    <mp-image width="160" height="120" src="data:image/png;base64,AA==" />
    <mp-image width="160" height="120" src="data:image/png;base64,AA==" alt="自定义错误内容">
      <template #error>
        <div class="error-slot">加载失败</div>
      </template>
    </mp-image>
  </mp-space>
</template>

<style scoped>
.error-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--mp-color-text-3);
  font-size: 12px;
}
</style>
```

### Loading

Use `showLoader` for the default loading UI, or the `loader` slot for a custom / progressive placeholder.

Example source: src/image/example/demos/loader.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const timestamp = ref('')

function reload() {
  timestamp.value = String(Date.now())
}
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-button status="primary" size="sm" @click="reload">重新加载</mp-button>
    <mp-space :size="16" wrap>
      <mp-image width="160" height="160" show-loader :src="`/cat.jpg?reload=${timestamp}`" preview-disabled />
      <mp-image width="160" height="160" :src="`/cat.jpg?reload=${timestamp}`" preview-disabled>
        <template #loader>
          <div class="loader-animate" />
        </template>
      </mp-image>
      <mp-image width="160" height="160" :src="`/cat.jpg?reload=${timestamp}`" preview-disabled>
        <template #loader>
          <img class="progressive" src="/cat2.jpg" alt="" />
        </template>
      </mp-image>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.loader-animate {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    -60deg,
    var(--mp-color-fill-2) 25%,
    var(--mp-color-fill-3) 40%,
    var(--mp-color-fill-2) 55%
  );
  background-size: 400% 100%;
  animation: loop-circle 1.5s cubimp-bezier(0.34, 0.69, 0.1, 1) infinite;
}

.progressive {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(5px);
}

@keyframes loop-circle {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
```

### Lazy load and fallback

`lazy` uses native `loading="lazy"`; `fallback-src` is used when loading fails.

Example source: src/image/example/demos/lazy.vue

```vue
<template>
  <mp-space :size="16" wrap>
    <mp-image width="160" height="120" object-fit="cover" lazy src="/cat.jpg" preview-disabled />
    <mp-image
      width="160"
      height="120"
      object-fit="cover"
      src="data:image/png;base64,AA=="
      fallback-src="/cat2.jpg"
      preview-disabled
    />
  </mp-space>
</template>
```

## Preview entries and groups

### Disable preview

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `width` | Image width | Disable preview, Preview entry, Preview group |
| `src` | Image URL | Disable preview, Preview entry, Preview group |
| `height` | Image height | Preview entry, Preview group |
| `object-fit` | Fit: fill/contain/cover/none/scale-down | Preview entry, Preview group |
| `preview-disabled` | Whether click preview is disabled | Disable preview |
| `preview-src` | Preview image URL, defaults to `src` | Preview entry |
<!-- demo-config-notes:end -->


`preview-disabled` prevents opening preview on click.

Example source: src/image/example/demos/disable-preview.vue

```vue
<template>
  <mp-image preview-disabled width="200" src="/cat.jpg" />
</template>
```

### Preview entry

Configure embedded preview with `preview-src`, `v-model:open` and `preview-props`.

Example source: src/image/example/demos/preview-entry.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const previewOpen = ref(false)
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-image width="160" height="120" object-fit="cover" src="/cat.jpg" preview-src="/cat2.jpg" />
    <mp-button status="primary" size="sm" @click="previewOpen = true">打开预览</mp-button>
    <mp-image
      v-model:open="previewOpen"
      width="160"
      height="120"
      object-fit="cover"
      src="/cat.jpg"
      :preview-props="{ scaleStep: 1 }"
    />
  </mp-space>
</template>
```

### Single preview

`ImagePreview` takes a single `src` and handles zoom, rotate, drag and fullscreen.

Example source: src/image/example/demos/component-preview.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-button status="primary" size="sm" @click="open = true">打开单图预览</mp-button>
    <mp-image-preview v-model:open="open" src="/cat.jpg" />
  </mp-space>
</template>
```

### Imperative preview

The imperative API returns the same handle for single and multiple images.

Example source: src/image/example/demos/imperative-preview.vue

```vue
<script setup lang="ts">
import { imagePreview } from '@maple-design/ui-vue'

const images = ['/cat.jpg', '/cat2.jpg']
let handle: { next: () => void; close: () => void } | undefined

function previewSingle() {
  imagePreview(images[0])
}

function previewMultiple() {
  handle = imagePreview({ images, modelValue: 1 })
}

function next() {
  handle?.next()
}

function close() {
  handle?.close()
}
</script>

<template>
  <mp-space :size="12" wrap>
    <mp-button status="primary" size="sm" @click="previewSingle">预览单图</mp-button>
    <mp-button status="primary" size="sm" @click="previewMultiple">预览多图</mp-button>
    <mp-button size="sm" @click="next">下一张</mp-button>
    <mp-button size="sm" @click="close">关闭</mp-button>
  </mp-space>
</template>
```

### Use local paths

In `.vue` files, Vue components are not processed like native `img` tags, so image assets need to be imported manually.
Here is how different bundlers handle it.

#### Vite

Automatic preprocessing with [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#asset-url-handling).

```ts
// playground-ignore
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          'mp-image': ['src'],
        },
      },
    }),
  ],
})
```

```html
<!-- playground-ignore -->
<template>
  <mp-image src="../../assets/logo.png" />
</template>
```

Or import separately

```html
<!-- playground-ignore -->
<script setup>
  import logo from '../../assets/logo.png'
</script>

<template>
  <mp-image :src="logo" />
</template>
```

#### Webpack

```html
<!-- playground-ignore -->
<template>
  <mp-image :src="require('../../assets/logo.png')" />
</template>
```

### Preview group

`ImagePreviewGroup` collects child Image nodes and owns the shared preview state.

Example source: src/image/example/demos/preview-group.vue

```vue
<template>
  <mp-image-preview-group loop>
    <mp-space :size="16" wrap>
      <mp-image src="/cat.jpg" width="120" height="120" object-fit="cover" />
      <mp-image src="/cat2.jpg" width="120" height="120" object-fit="cover" />
    </mp-space>
  </mp-image-preview-group>
</template>
```

### Data-driven group

You can also pass `images` and open the preview with a button.

Example source: src/image/example/demos/component-preview-group.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const current = ref(2)
const images = ['/cat.jpg', '/cat2.jpg']
</script>

<template>
  <mp-space direction="column" :size="16">
    <p>默认在 body 全屏预览；切换缓存图片不重复等待加载。</p>
    <mp-button status="primary" size="sm" @click="open = true">打开预览组</mp-button>
    <mp-image-preview-group v-model:open="open" v-model="current" :images="images" :loop="false" />
  </mp-space>
</template>
```

## Preview customization and interaction

### Ripple and inline

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `width` | Image width | Ripple and inline, Close on overlay, Keep footer on error |
| `src` | Image URL | Ripple and inline, Close on overlay, Keep footer on error |
| `height` | Image height | Ripple and inline, Close on overlay, Size, radius and position |
| `object-fit` | Fit: fill/contain/cover/none/scale-down | Ripple and inline, Close on overlay, Size, radius and position |
| `preview-disabled` | Whether click preview is disabled | Ripple and inline, Keep footer on error, Size, radius and position |
| `preview-props` | Props passed to `ImagePreview` | Close on overlay, Popup container |
<!-- demo-config-notes:end -->


`ripple` adds a click wave; set `block` to `false` to render inline.

Example source: src/image/example/demos/ripple.vue

```vue
<template>
  <mp-space :size="16" wrap>
    <mp-image width="120" height="120" object-fit="cover" ripple preview-disabled src="/cat.jpg" />
    <mp-image :block="false" width="120" height="120" object-fit="cover" preview-disabled src="/cat.jpg" />
    <mp-image :block="false" width="120" height="120" object-fit="cover" preview-disabled src="/cat2.jpg" />
  </mp-space>
</template>
```

### Close on overlay

Use `preview-props.overlayClosable` to close preview when clicking outside the image. Enabled on the left, disabled on the right. Clicking the image itself never closes it.

Example source: src/image/example/demos/overlay-closable.vue

```vue
<template>
  <mp-space :size="16" wrap>
    <mp-image width="120" height="120" object-fit="cover" src="/cat.jpg" :preview-props="{ overlayClosable: true }" />
    <mp-image width="120" height="120" object-fit="cover" src="/cat2.jpg" :preview-props="{ overlayClosable: false }" />
  </mp-space>
</template>
```

### Keep footer on error

`hide-footer="never"` keeps the footer visible when loading fails.

Example source: src/image/example/demos/hide-footer-never.vue

```vue
<template>
  <mp-image
    width="200"
    src="data:image/png;base64,AA=="
    title="一只猫"
    description="错误时仍显示底部信息"
    hide-footer="never"
    preview-disabled
  />
</template>
```

### Custom preview

The close icon, indicator and action area can all be customized.

Example source: src/image/example/demos/preview-features.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const current = ref(1)
const images = ['/cat.jpg', '/cat2.jpg']

function onAction() {
  current.value = current.value === 0 ? 1 : 0
}
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-button status="primary" size="sm" @click="open = true">打开自定义预览</mp-button>
    <mp-image-preview-group v-model:open="open" v-model="current" :images="images" :loop="false">
      <template #close-icon>
        <span class="close-icon">×</span>
      </template>
      <template #indicator="{ imageNumber, length }">
        <span class="indicator">{{ imageNumber }} / {{ length }}</span>
      </template>
      <template #actions>
        <mp-image-preview-action name="切换" @click="onAction">+</mp-image-preview-action>
      </template>
    </mp-image-preview-group>
  </mp-space>
</template>

<style scoped>
.close-icon {
  font-size: 24px;
  color: #fff;
}

.indicator {
  position: absolute;
  top: 16px;
  left: 50%;
  padding: 4px 12px;
  color: #fff;
  font-size: 12px;
  background: rgb(0 0 0 / 45%);
  border-radius: 12px;
  transform: translateX(-50%);
}
</style>
```

### Size, radius and position

`width` / `height`, `radius` and `object-position` control size, corners and crop position.

Example source: src/image/example/demos/presentation.vue

```vue
<template>
  <mp-space :size="16" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-image
        width="160"
        height="100"
        object-fit="cover"
        object-position="left top"
        preview-disabled
        src="/cat.jpg"
      />
      <span class="label">160×100 · left top</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-image width="100" height="100" object-fit="cover" :radius="12" preview-disabled src="/cat.jpg" />
      <span class="label">radius 12</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-image width="100" height="100" object-fit="cover" radius="50%" preview-disabled src="/cat.jpg" />
      <span class="label">radius 50%</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: 12px;
}
</style>
```

### Popup container

Mount the preview into a specified node with `preview-props.popupContainer`.

Example source: src/image/example/demos/preview-popup-container.vue

```vue
<template>
  <div id="image-demo-preview-popup-container" class="popup-container">
    <mp-image
      width="160"
      src="/cat.jpg"
      :preview-props="{
        popupContainer: '#image-demo-preview-popup-container',
        closable: false,
      }"
    />
  </div>
</template>

<style scoped>
.popup-container {
  position: relative;
  height: 220px;
  padding: 16px;
  overflow: hidden;
  background: var(--mp-color-fill-2);
}
</style>
```

## Lifecycle

### PreviewGroup track lifecycle

Example source: src/image/example/demos/en-US/track-lifecycle.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const open = ref(false)
const current = ref(1)
const loop = ref(true)
const images = ref(['/cat.jpg', '/cat2.jpg'])
function replaceImages() {
  images.value = [...images.value].reverse()
}
</script>
<template>
  <div>
    <mp-button @click="open = true">Open / 打开</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="loop = !loop">Loop / 循环</mp-button>
    <mp-button @click="replaceImages">Replace images / 等长换图</mp-button>
    <p>
      Current / 当前: {{ current }}. Navigate across the loop edge; deactivate, close or replace images. Old work must
      not replay.
    </p>
    <KeepAlive>
      <mp-image-preview-group v-if="active" v-model:open="open" v-model="current" :images="images" :loop="loop">
        <template #actions>
          <mp-image-preview-action name="Replace images / 换图" @click="replaceImages">换图</mp-image-preview-action>
          <mp-image-preview-action name="Deactivate / 停用" @click="active = false">停用</mp-image-preview-action>
        </template>
      </mp-image-preview-group>
    </KeepAlive>
  </div>
</template>
```

Preview long press500ms and double-tap recognition320ms are interaction policy, not CSS duration/close delay. Release/move/close/source replacement/deactivation/disposal invalidate stale timers; consumed callbacks cannot replay. Inactive/disposed input entries are inert. Deactivation detaches keyboard/mode observation, releases capture and clears moving; activation reads current mode and accepts fresh gestures. Scoped17 each/full Cedar35/Maple87 pass using controlled timers/MQL/events, not native touch/browser/OS proof. PreviewGroup track scheduling remains separately pending; no API/token change.

Display images with captions, loading fallback and preview. Example groups match Cedar.

### Preview Interaction Lifecycle

Example source: src/image/example/demos/en-US/controller-lifecycle.vue

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
const active = ref(true)
const source = ref('/cat.jpg')
const presses = ref(0)
const switchSource = () => {
  source.value = source.value === '/cat.jpg' ? '/cat2.jpg' : '/cat.jpg'
}
</script>
<template>
  <div>
    <mp-button @click="open = true">Open / 打开预览</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <p>Long presses / 长按通知: {{ presses }}. Cancel or deactivate; old input must not replay.</p>
    <KeepAlive>
      <mp-image-preview
        v-if="active"
        v-model:open="open"
        :src="source"
        interaction="touch"
        :keyboard="true"
        @long-press="presses++"
      >
        <template #actions>
          <mp-image-preview-action name="Switch source / 换图" @click="switchSource">换图</mp-image-preview-action>
          <mp-image-preview-action name="Deactivate / 停用" @click="active = false">停用</mp-image-preview-action>
        </template>
      </mp-image-preview>
    </KeepAlive>
  </div>
</template>
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Previous/next preview navigation, horizontal keys and swipes follow reading direction without reversing the value array. Direction changes cancel unfinished gestures while preserving the current image, zoom and rotation. Images and zoomed drag coordinates are not mirrored automatically. Image indices retain LTR numeric display.

## Usage notes

### Image-preview group numbering

`modelValue/defaultValue` start at `1`. `open(imageNumber = 1)` and `to(imageNumber)` use the same numbering; invalid/noninteger values are ignored. `prev()/next()` retain this numbering at loop boundaries. Model events are `update:modelValue(imageNumber)`; navigation emits `change(imageNumber, previousImageNumber)`, while external assignments do not. Long press emits `long-press(imageNumber)`; the indicator slot receives `{ imageNumber, length }`. Internal array indices remain zero-based.

Root `class` and `style` merge with the Image wrapper. Use `img-props.class/style` to `style` the inner image. Preview `open-change` is a Vue notification event: each state transition emits once, `.once` uses Vue event semantics, and returned Promises do not control loading. The typed `onOpenChange` listener uses this same event path.

## API

ImagePreviewGroup binds a one-based image number through ordinary `v-model`; `defaultValue` initializes the uncontrolled index. Panel opening uses `v-model:open` and `defaultOpen` independently. Programmatic preview options also use modelValue/`defaultValue` and onUpdate:modelValue.

### Image Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | string | - | Thumbnail source |
| preview-src | string | - | Preview URL, falling back to src |
| fallback-src | string | - | One fallback after a source error |
| width | string \| number | - | Root width; numbers are px |
| height | string \| number | - | Root height; numbers are px |
| object-fit | ImageFit | fill | Image fitting mode |
| object-position | string | 50% 50% | Native object position |
| radius | string \| number | 0 | Root border radius |
| alt | string | - | Image alternative text; empty is preserved |
| title | string | - | Image title and footer title |
| description | string | - | Footer text and alt fallback |
| load-description | string | - | Last alt fallback |
| hide-footer | boolean \| 'never' | false | Hide footer, or show it in every load state |
| footer-position | 'inner' \| 'outer' | inner | Footer position |
| footer-class | string \| array \| object | - | Footer classes |
| lazy | boolean | false | Use native image lazy loading |
| img-props | ImgHTMLAttributes | - | Thumbnail element attributes |
| previewed-img-props | ImgHTMLAttributes | - | Single preview image attributes |
| show-loader | boolean | false | Show default loader while loading |
| ripple | boolean | false | Enable ripple |
| block | boolean | true | Render block layout |
| preview-disabled | boolean | false | Disable image preview |
| open / v-model:open | boolean | - | Controlled standalone preview state |
| default-open | boolean | false | Initial uncontrolled preview state |
| preview-props | `Partial<ImagePreviewProps>` | - | Standalone preview options |
| popup-container | string \| HTMLElement \| false | body | Preview mount target |

### Image Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:open | Preview state request | open: boolean |
| open-change | Preview state request | open: boolean |
| click | Image activation | event: Event |
| load | Image resource loaded | event: Event |
| error | Image resource failed | event: Event |

### Image Slots

| Slot | Description | Scope |
| --- | --- | --- |
| extra | Footer content | - |
| placeholder | Loading placeholder; takes precedence over loader | - |
| loader | Custom loading indicator | - |
| error | Error content | - |
| error-icon | Default error icon replacement | - |
| preview-actions | Standalone preview toolbar extra actions | - |

### Imperative preview

`imagePreview(url | url[] | options)` returns a unified handle exposing open/close/prev/next/to/reset/zoomTo/zoomIn/zoomOut/rotateLeft/rotateRight/toggleFullscreen.

### ImagePreview Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | string | - | Preview image URL |
| open / v-model:open | boolean | - | Controlled preview state |
| default-open | boolean | false | Initial uncontrolled state |
| interaction | 'auto' \| 'desktop' \| 'touch' | auto | Interaction mode |
| popup-container | string \| HTMLElement \| false | body | Preview mount target |
| lock-scroll | boolean | true | Lock background scrolling |
| closable | boolean | true | Show separate close button |
| overlay-closable | boolean | true | Allow backdrop to close |
| esc-to-close | boolean | true | Allow Escape to close |
| image-prevent-default | boolean | false | Prevent image context menu |
| default-scale | number | 1 | Initial and reset scale |
| min-scale | number | 0.5 | Lower scale bound |
| max-scale | number | 8 | Upper scale bound |
| scale-step | number | 0.5 | Zoom increment |
| wheel-zoom | boolean | desktop | Enable wheel zoom; automatic when omitted |
| keyboard | boolean | desktop | Enable preview keyboard shortcuts |
| draggable | boolean | true | Enable pointer gestures |
| keep-drag-offset | boolean | false | Keep offset when scale returns to 1 or less |
| show-toolbar | boolean | true | Show toolbar and its actions slot |
| actions-layout | ImagePreviewActionName[] | desktop defaults / touch [] | Ordered toolbar actions |
| previewed-img-props | ImgHTMLAttributes | - | Preview image element attributes |

When `images` is omitted or `undefined`, the group collects previewable child Images in DOM order; updating a child URL preserves its identity and position. An explicitly supplied array is the source, and `[]` means no images. Set it back to `undefined` to resume child collection. In array mode use the group `open` / `to` methods to select an image; child Images do not map themselves to array indices.

Public indices start at 1. The displayed index is clamped when data shrinks, and child reordering preserves the selected image identity. A controlled `modelValue` receives an update request when adjustment is needed; its owner can accept or reject it. No preview content is shown when the list is empty; the open state remains, so content may reappear when images return.

A previewable image exposes a named button action supporting Tab, Enter and Space. When preview closes, focus is restored to its opener when possible if focus is still in the preview or has fallen to the document body. The action is absent when preview is disabled or the image has failed. Explicit `alt=""` stays empty; a previewable decorative image still has a separately named preview action. When `alt` is omitted, `imgProps.alt`, `description`, then `loadDescription` supply the fallback.

When keyboard shortcuts are enabled, only the topmost preview handles arrow keys and Space. Inputs, editable regions and other interactive controls retain their own key behavior.

### ImagePreviewGroup Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open / v-model:open | boolean | - | Controlled preview state |
| default-open | boolean | false | Initial uncontrolled state |
| interaction | 'auto' \| 'desktop' \| 'touch' | auto | Interaction mode |
| popup-container | string \| HTMLElement \| false | body | Preview mount target |
| lock-scroll | boolean | true | Lock background scrolling |
| closable | boolean | true | Show separate close button |
| overlay-closable | boolean | true | Allow backdrop to close |
| esc-to-close | boolean | true | Allow Escape to close |
| image-prevent-default | boolean | false | Prevent image context menu |
| default-scale | number | 1 | Initial and reset scale |
| min-scale | number | 0.5 | Lower scale bound |
| max-scale | number | 8 | Upper scale bound |
| scale-step | number | 0.5 | Zoom increment |
| wheel-zoom | boolean | desktop | Enable wheel zoom; automatic when omitted |
| keyboard | boolean | desktop | Enable preview keyboard shortcuts |
| draggable | boolean | true | Enable pointer gestures |
| keep-drag-offset | boolean | false | Keep offset when scale returns to 1 or less |
| show-toolbar | boolean | true | Show toolbar and its actions slot |
| actions-layout | ImagePreviewActionName[] | desktop defaults / touch [] | Ordered toolbar actions |
| images | string[] | - | Explicit images; undefined collects children, [] is empty |
| model-value / v-model | number | - | Controlled image number, starting at 1 |
| default-value | number | 1 | Initial image number, starting at 1 |
| loop | boolean | false | Wrap when navigating |

### ImagePreviewGroup Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:open | Preview state request | open: boolean |
| open-change | Preview state request | open: boolean |
| update:modelValue | Image number request | imageNumber: number |
| change | Image number change request | imageNumber: number, previousImageNumber: number |
| open / opened | Open transition start / end | - |
| close / closed | Close transition start / end | - |
| key-escape | Escape notification | - |
| long-press | Long press notification | imageNumber: number |

### ImagePreviewGroup Methods

| Method | Description |
| --- | --- |
| open(imageNumber = 1) | Request open at a 1-based image number |
| close() | Request close |
| prev() / next() | Navigate one image |
| to(imageNumber) | Navigate to a 1-based image number |
| reset() | Reset current preview transforms |
| zoomTo(scale) | Set finite scale within bounds |
| zoomIn() / zoomOut() | Change scale by scale-step |
| rotateLeft() / rotateRight() | Rotate by 90 degrees |
| toggleFullscreen() | Toggle fullscreen; returns the browser Promise or undefined when unsupported |

### ImagePreviewGroup Slots

| Slot | Description | Scope |
| --- | --- | --- |
| default | Child images | - |
| close-icon | Separate close button icon | - |
| indicator | Image count display | { imageNumber, length } |
| extra | Extra preview content | { url } |
| actions | Additional toolbar actions | { url } |

### ImagePreview Options

| Prop | Description | Type | Default |
| --------------------- | ----------------------------------------- | ------------------------- | ------- |
| `images` | Preview image URL array or one image URL | _string[] \| string_ | `[]` |
| `model-value` | Index from which the image preview starts | _number_ | `1` |
| `scaleStep` | Scale increment per action | _number_ | `0.5` |
| `closable` | Show the close button | _boolean_ | `true` |
| `escToClose` | Whether to support keyboard ESC to close the image-preview | _boolean_ | `true` |
| `loop` | Whether to loop | _boolean_ | `false` |
| `lockScroll` | Lock scroll | _boolean_ | `true` |
| `imagePreventDefault` | Whether to disable the default behavior of images | _boolean_ | `false` |
| `onChange` | The callback function when switching images, the callback parameter is the current index | _(imageNumber: number, previousImageNumber: number) => void_ | `-` |
| `onOpen` | Callback when image-preview is turned on | _() => void_ | `-` |
| `onOpened` | Callback at the end of the animation that opened image-preview | _() => void_ | `-` |
| `onClose` | Callback when image-preview is closed | _() => void_ | `-` |
| `onClosed` | Callback at the end of the animation that closes the image-preview | _() => void_ | `-` |
| `onLongPress` | The callback function when long pressing an image, the callback parameter is the current index | _(imageNumber: number) => void_ | `-` |
| `onKeyEscape` | Triggered when click keyboard ESC | _() => void_ | `-` |

### ImagePreview Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:open | Preview state request | open: boolean |
| open-change | Preview state request | open: boolean |
| open / opened | Open transition start / end | - |
| close / closed | Close transition start / end | - |
| key-escape | Escape notification | - |
| long-press | Long press notification | - |
| prev / next | Navigation requests | - |

### ImagePreview Slots

| Slot | Description | Scope |
| --- | --- | --- |
| image | Replace the preview image | { src, scale, rotate, translateX, translateY, moving, previewedImgProps } |
| actions | Additional toolbar actions | - |
| close-icon | Separate close button icon | - |
| overlay | Preview overlay content | - |
| extra | Extra preview content | - |

### ImagePreview Methods

| Method | Description |
| --- | --- |
| open() | Request open |
| close() | Request close |
| reset() | Reset scale, rotation and offset |
| zoomTo(scale) | Set finite scale within bounds |
| zoomIn() / zoomOut() | Change scale by scale-step |
| rotateLeft() / rotateRight() | Rotate by 90 degrees |
| toggleFullscreen() | Toggle fullscreen; returns the browser Promise or undefined when unsupported |

`Image.showPreview()` requests the current image preview. The `imagePreview`, `previewImage`, and `ImagePreviewFn` service accepts a URL, URL array, or options and returns `ImagePreviewHandle | undefined` (for example during SSR). Its handle offers the 12 Group operations; paging operations have no effect for a single image. The service also exposes `close()`, `setDefaultOptions()`, and `resetDefaultOptions()`. Native `lazy` is browser-scheduled and does not promise automatic retries.

Scale parameters must be finite and positive; invalid min/max/default/step values fall back to 0.5/8/1/0.5. If max is below min it resolves to min. Initial and reset scales are clamped, changes to bounds clamp the current value, and `zoomTo` ignores nonfinite input. `close` in `actionsLayout` is a toolbar action, independent of the separate button controlled by `closable`.

### Image Methods

| Method | Description |
| --- | --- |
| showPreview() | Request the current image preview when available |

### ImagePreviewAction Slots

| Slot | Description | Scope |
| --- | --- | --- |
| default | Action button content | - |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-image-preview-arrow-background` | `rgb(38 38 0.41304348%)` | `background-color` |
| `--mp-image-preview-arrow-background-hover` | `rgb(56 56 0.58333333%)` | `background-color` |
| `--mp-image-preview-arrow-color` | `#fff` | `color` |
| `--mp-image-preview-close-icon-right` | `14px` | `inset-inline-end` |
| `--mp-image-preview-close-icon-top` | `14px` | `top` |
| `--mp-image-preview-swipe-indicators-padding` | `16px 0` | `padding` |
| `--mp-image-preview-swipe-indicators-text-color` | `#ddd` | `color` |
| `--mp-image-preview-zoom-container-background` | `#000` | `background-color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-image-preview-arrow-background: rgb(38 38 0.41304348%);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
