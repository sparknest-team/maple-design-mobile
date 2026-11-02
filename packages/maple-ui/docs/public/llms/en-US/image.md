<!-- Source: src/image/docs/en-US.md; locale: en-US; page: /en-US/image -->

# Image

Single and grouped previews default to body-mounted viewport overlays. Only explicit `:popup-container="false"` renders inline and requires a positioned, sized parent. Only the active image's load/error settles its loading indicator; returning to a cached image does not leave the spinner visible.

Track scheduling is now independently reviewed (earlier pending notes are historical): close/image/loop changes, deactivation and disposal invalidate work; callbacks consume once, activation only canonicalizes current coordinates, retained commands never replay. Double RAF is settlement even at zero duration; triplicated looping remains. Both tracks consume system slow/standard (currently240ms), replacing Maple's fixed280ms. Recenter reads actual transform duration+delay;400ms is only unresolved-style fallback. Scoped27 each/full Image Cedar62/Maple114 and32 Less cascade cases are controlled evidence, not native browser acceptance.

## Examples

### Basic usage

Set `src` to render an image with preview enabled.

Example source: src/image/example/demos/basic.vue

```vue
<template>
  <mp-image width="200" src="/cat.jpg" />
</template>
```

### Fit mode

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

### Caption

Use `title`, `description` and `footer-position` to place the caption.

Example source: src/image/example/demos/caption.vue

```vue
<template>
  <mp-space :size="24" wrap>
    <mp-image width="200" src="/cat.jpg" title="一只猫" description="页脚在图片内侧" />
    <mp-image width="200" src="/cat2.jpg" title="一只猫" description="页脚在图片外侧" footer-position="outer" />
  </mp-space>
</template>
```

### Extra footer

Use the `extra` slot to add custom footer content.

Example source: src/image/example/demos/extra.vue

```vue
<template>
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
</template>

<style scoped>
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

### Ripple and inline

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

### PreviewGroup track lifecycle / 轨道生命周期

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

### Disable preview

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

### Imperative preview

The imperative API returns the same handle for single and multiple images.

Example source: src/image/example/demos/imperative-preview.vue

```vue
<script setup lang="ts">
import { imagePreview } from '@maple-design/ui'

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

## API

ImagePreviewGroup binds a one-based image number through ordinary `v-model`; `defaultValue` initializes the uncontrolled index. Panel opening uses `v-model:open` and `defaultOpen` independently. Programmatic preview options also use modelValue/defaultValue and onUpdate:modelValue.


### Props

| Prop                          | Description                                                                                                                                                                                     | Type                             | Default   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | --------- |
| `src`                         | Image src                                                                                                                                                                                       | _string_                         | `-`       |
| `object-fit`                  | Image fit mode, optional value is `fill` `contain` `cover` `none` `scale-down`                                                                                                                  | _string_                         | `fill`    |
| `object-position` _**3.2.3**_ | The position of the replaceable element's content in its content box, equal to [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)                              | _string_                         | `50% 50%` |
| `alt`                         | Image alt text, the same as the native attribute of the `img` tag                                                                                                                               | _string_                         | `-`       |
| `title`                       | Image title text, the same as with the native attributes of the `img` tag                                                                                                                       | _string_                         | `-`       |
| `description`                 | Image description; used as fallback alt text and in the default error state                                                                                                                     | _string_                         | `-`       |
| `hide-footer`                 | Whether to hide the footer; `never` keeps it visible on errors                                                                                                                                  | _boolean \| 'never'_             | `false`   |
| `footer-position`             | Footer position: `inner` or `outer`                                                                                                                                                             | _string_                         | `inner`   |
| `footer-class`                | Footer class name                                                                                                                                                                               | _string \| array \| object_      | `-`       |
| `referrer-policy`             | Indicate which referrer to use when fetching the resource. This attribute requires attention to browser compatibility, see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) | _string_                         | `-`       |
| `width`                       | Image width                                                                                                                                                                                     | _string \| number_               | `-`       |
| `height`                      | Image height                                                                                                                                                                                    | _string \| number_               | `-`       |
| `radius`                      | Image radius                                                                                                                                                                                    | _string \| number_               | `0`       |
| `lazy`                        | Whether to enable lazy loading                                                                                                                                                                  | _boolean_                        | `false`   |
| `show-loader`                 | When lazy loading is enabled, the image displayed while loading                                                                                                                                 | _string_                         | `-`       |
| `fallback-src`                | When lazy loading is enabled, the image displayed after an error                                                                                                                                | _string_                         | `-`       |
| `show-loader`                 | Whether to show the default loading state                                                                                                                                                       | _boolean_                        | `false`   |
| `ripple`                      | Whether to enable ripple                                                                                                                                                                        | _boolean_                        | `false`   |
| `block`                       | Whether it is a block element                                                                                                                                                                   | _boolean_                        | `true`    |
| `preview-disabled`            | Whether click preview is disabled                                                                                                                                                               | _boolean_                        | `false`   |
| `preview-src`                 | Preview image URL, defaults to `src`                                                                                                                                                            | _string_                         | `-`       |
| `v-model:open`        | Controlled preview visibility                                                                                                                                                                   | _boolean_                        | `-`       |
| `default-open`        | Default preview visibility                                                                                                                                                                      | _boolean_                        | `false`   |
| `preview-props`               | Props passed to `ImagePreview`                                                                                                                                                                  | _object_                         | `-`       |
| `popup-container`             | Preview mount target; `false` disables Teleport                                                                                                                                                 | _string \| HTMLElement \| false_ | `body`    |

### Events

| Event                 | Description                                                                                                                                                  | Arguments       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `click`               | Triggered when you click on Image                                                                                                                            | `event: Event`  |
| `load`                | Triggered when the image is successfully loaded (when the image fails in lazy loading mode, it will only be triggered when the image is successfully loaded) | `event: Event`  |
| `error`               | Triggered when an image fails to load (when an image fails in lazy loading mode, it will only be triggered when the number of attempts ends)                 | `event: Event`  |
| `open-change` | Triggered when preview opens or closes                                                                                                                       | `open: boolean` |
| `update:open` | Updates the `open` model                                                                                                                             | `open: boolean` |

### Slots

| Name              | Description                             | SlotProps |
| ----------------- | --------------------------------------- | --------- |
| `error`           | Load failure slot                       | `-`       |
| `error-icon`      | Custom icon for the default error state | `-`       |
| `loader`          | Custom loading state                    | `-`       |
| `extra`           | Extra footer content                    | `-`       |
| `preview-actions` | Custom preview action content           | `-`       |

### Imperative preview

`imagePreview(url | url[] | options)` returns `ImagePreviewHandle | undefined`. The handle provides `open / close / prev / next / to / reset / zoomTo / zoomIn / zoomOut / rotateLeft / rotateRight / toggleFullscreen` methods.

Replacing an imperative preview disposes the previous instance and invokes its `onClosed` once, just like normal closure. Use this callback to release owned resources such as Object URLs. Old handles never close newer previews. If `onClosed` synchronously opens a new preview, that newer call wins and the interrupted outer call returns `undefined`.

## ImagePreview API

### Props

| Prop                    | Description                                                | Type                             | Default |
| ----------------------- | ---------------------------------------------------------- | -------------------------------- | ------- |
| `v-model:open`          | Whether to display                                         | _boolean_                        | `false` |
| `default-open`          | Default open state in uncontrolled mode                    | _boolean_                        | `false` |
| `src`                   | Single image URL                                           | _string_                         | `-`     |
| `scale-step`            | Scale increment per action                                 | _number_                         | `0.5`   |
| `closable`              | Whether to show the close button                           | _boolean_                        | `true`  |
| `overlay-closable`      | Close on backdrop click; clicking the image keeps it open  | _boolean_                        | `true`  |
| `esc-to-close`          | Whether to support keyboard ESC to close the image-preview | _boolean_                        | `true`  |
| `lock-scroll`           | Lock scroll                                                | _boolean_                        | `true`  |
| `popup-container`       | The location of the pop-up layer to mount                  | _string \| HTMLElement \| false_ | `body`  |
| `image-prevent-default` | Whether to disable the default behavior of images          | _boolean_                        | `false` |

### ImagePreviewGroup Props

| Prop               | Description                                               | Type                             | Default |
| ------------------ | --------------------------------------------------------- | -------------------------------- | ------- |
| `images`           | Image URL list (skips collecting child Image when set)    | _string[]_                       | `[]`    |
| `v-model:open`     | Whether preview is open                                   | _boolean_                        | `false` |
| `default-open`     | Default open in uncontrolled mode                         | _boolean_                        | `false` |
| `v-model`  | Current image number (starts at 1)                                       | _number_                         | `-`     |
| `default-value`  | Initial image number (starts at 1) in uncontrolled mode                  | _number_                         | `1`     |
| `loop`             | Whether to loop                                           | _boolean_                        | `false` |
| `closable`         | Whether to show close button                              | _boolean_                        | `true`  |
| `overlay-closable` | Close on backdrop click; clicking the image keeps it open | _boolean_                        | `true`  |
| `esc-to-close`     | Whether pressing ESC closes the preview                   | _boolean_                        | `true`  |
| `popup-container`  | Mount point for preview popup                             | _string \| HTMLElement \| false_ | `body`  |

### Events

| Event         | Description                                                                                    | Arguments                      |
| ------------- | ---------------------------------------------------------------------------------------------- | ------------------------------ |
| `change`      | The callback function when switching images, the callback parameter is the current index       | `imageNumber: number, previousImageNumber: number` (starts at 1) |
| `open`        | Triggered when Image-Preview is turned on                                                      | `-`                            |
| `opened`      | Triggered at the end of the open image-preview animation                                       | `-`                            |
| `open-change` | Triggered when open state changes                                                              | `open: boolean`                |
| `close`       | Triggered when Image-Preview is off                                                            | `-`                            |
| `closed`      | Triggered when the animation that closes the image-preview ends                                | `-`                            |
| `long-press`  | The callback function when long pressing an image, the callback parameter is the current index | `imageNumber: number` (starts at 1) |
| `key-escape`  | Triggered when click keyboard ESC                                                              | `-`                            |

### Methods

| Method                             | Description                        | Arguments                       | Return |
| ---------------------------------- | ---------------------------------- | ------------------------------- | ------ |
| `imagePreview`                     | Open image-preview                 | _options \| string \| string[]_ | `-`    |
| `imagePreview.close`               | Close image-preview                | _-_                             | `-`    |
| `imagePreview.setDefaultOptions`   | Set default option configuration   | _options_                       | `-`    |
| `imagePreview.resetDefaultOptions` | Reset default option configuration | _-_                             | `-`    |
| `prev` / `next`                    | Switch image                       | `-`                             | `-`    |
| `to`                               | Go to an image number (starts at 1)                     | `imageNumber: number`                 | `-`    |
| `zoomTo`                           | Set scale                          | `scale: number`                 | `-`    |
| `zoomIn` / `zoomOut`               | Zoom in or out                     | `-`                             | `-`    |
| `rotateLeft` / `rotateRight`       | Rotate image                       | `-`                             | `-`    |
| `reset` / `toggleFullscreen`       | Reset or toggle fullscreen         | `-`                             | `-`    |

### Slots

| Name         | Description                | SlotProps                                                                  |
| ------------ | -------------------------- | -------------------------------------------------------------------------- |
| `indicator`  | Paging indicator           | `imageNumber: number` (starts at 1) <br> `length: number` Total number of image |
| `close-icon` | Close button               | `-`                                                                        |
| `extra`      | Extra slots                | `-`                                                                        |
| `actions`    | Custom preview action area | `-`                                                                        |

### ImagePreview Options

| Prop                  | Description                                                                                    | Type                      | Default |
| --------------------- | ---------------------------------------------------------------------------------------------- | ------------------------- | ------- |
| `images`              | The image URL array or the URL of a single image to be previewed                               | _string[] \| string_      | `[]`    |
| `model-value`             | Index from which the image preview starts                                                      | _number_                  | `1`     |
| `scaleStep`           | Scale increment per action                                                                     | _number_                  | `0.5`   |
| `closable`            | Whether to show the close button                                                               | _boolean_                 | `true`  |
| `escToClose`          | Whether to support keyboard ESC to close the image-preview                                     | _boolean_                 | `true`  |
| `lockScroll`          | Lock scroll                                                                                    | _boolean_                 | `true`  |
| `imagePreventDefault` | Whether to disable the default behavior of images                                              | _boolean_                 | `false` |
| `onChange`            | The callback function when switching images, the callback parameter is the current index       | _(imageNumber: number, previousImageNumber: number) => void_ | `-`     |
| `onOpen`              | Callback when image-preview is turned on                                                       | _() => void_              | `-`     |
| `onOpened`            | Callback at the end of the animation that opened image-preview                                 | _() => void_              | `-`     |
| `onClose`             | Callback when image-preview is closed                                                          | _() => void_              | `-`     |
| `onClosed`            | Callback at the end of the animation that closes the image-preview                             | _() => void_              | `-`     |
| `onLongPress`         | The callback function when long pressing an image, the callback parameter is the current index | _(imageNumber: number) => void_ | `-`     |
| `onKeyEscape`         | Triggered when click keyboard ESC                                                              | _() => void_              | `-`     |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                                      | Default  |
| --------------------------------------------- | -------- |
| `--image-preview-swipe-indicators-text-color` | `#ddd`   |
| `--image-preview-swipe-indicators-padding`    | `16px 0` |
| `--image-preview-zoom-container-background`   | `#000`   |
| `--image-preview-close-icon-top`              | `14px`   |
| `--image-preview-close-icon-right`            | `14px`   |
| `--image-preview-close-icon-size`             | `22px`   |
| `--image-preview-close-icon-color`            | `#fff`   |
| `--image-preview-extra-top`                   | `14px`   |
| `--image-preview-extra-left`                  | `14px`   |

### Preview group image numbers

`modelValue/defaultValue` start at **1** (`1` means the first image). `open(imageNumber = 1)` and `to(imageNumber)` accept one-based image numbers; invalid/non-integer numbers are ignored. `prev()`/`next()` emit the same numbering, including loop boundaries. `update:modelValue(imageNumber)` and `change(imageNumber, previousImageNumber)` use one-based values; external controlled assignments do not emit a change notification. `long-press(imageNumber)` uses the same convention. The indicator slot exposes `{ imageNumber, length }`. Internal array positions remain zero-based.
