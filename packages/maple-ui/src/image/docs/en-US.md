# Image

Single and grouped previews default to body-mounted viewport overlays. Only explicit `:popup-container="false"` renders inline and requires a positioned, sized parent. Only the active image's load/error settles its loading indicator; returning to a cached image does not leave the spinner visible.

Track scheduling is now independently reviewed (earlier pending notes are historical): close/image/loop changes, deactivation and disposal invalidate work; callbacks consume once, activation only canonicalizes current coordinates, retained commands never replay. Double RAF is settlement even at zero duration; triplicated looping remains. Both tracks consume system slow/standard (currently240ms), replacing Maple's fixed280ms. Recenter reads actual transform duration+delay;400ms is only unresolved-style fallback. Scoped27 each/full Image Cedar62/Maple114 and32 Less cascade cases are controlled evidence, not native browser acceptance.

## Basic examples

### Basic usage

Set `src` to render an image with preview enabled.

```demo
../example/demos/basic.vue
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

```demo
../example/demos/fit-mode.vue
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

```demo
../example/demos/content-comparison.vue
```

### Error state

The example uses corrupt inline image data to exercise decode errors without requesting a missing HTTP resource.

Failed images show the default error state, or a custom `error` slot.

```demo
../example/demos/error.vue
```

### Loading

Use `showLoader` for the default loading UI, or the `loader` slot for a custom / progressive placeholder.

```demo
../example/demos/loader.vue
```

### Lazy load and fallback

`lazy` uses native `loading="lazy"`; `fallback-src` is used when loading fails.

```demo
../example/demos/lazy.vue
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

```demo
../example/demos/disable-preview.vue
```

### Preview entry

Configure embedded preview with `preview-src`, `v-model:open` and `preview-props`.

```demo
../example/demos/preview-entry.vue
```

### Single preview

`ImagePreview` takes a single `src` and handles zoom, rotate, drag and fullscreen.

```demo
../example/demos/component-preview.vue
```

### Imperative preview

The imperative API returns the same handle for single and multiple images.

```demo
../example/demos/imperative-preview.vue
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

```demo
../example/demos/preview-group.vue
```

### Data-driven group

You can also pass `images` and open the preview with a button.

```demo
../example/demos/component-preview-group.vue
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

```demo
../example/demos/ripple.vue
```

### Close on overlay

Use `preview-props.overlayClosable` to close preview when clicking outside the image. Enabled on the left, disabled on the right. Clicking the image itself never closes it.

```demo
../example/demos/overlay-closable.vue
```

### Keep footer on error

`hide-footer="never"` keeps the footer visible when loading fails.

```demo
../example/demos/hide-footer-never.vue
```

### Custom preview

The close icon, indicator and action area can all be customized.

```demo
../example/demos/preview-features.vue
```

### Size, radius and position

`width` / `height`, `radius` and `object-position` control size, corners and crop position.

```demo
../example/demos/presentation.vue
```

### Popup container

Mount the preview into a specified node with `preview-props.popupContainer`.

```demo
../example/demos/preview-popup-container.vue
```

## Lifecycle

### PreviewGroup track lifecycle

```demo
../example/demos/en-US/track-lifecycle.vue
```

Preview long press500ms and double-tap recognition320ms are interaction policy, not CSS duration/close delay. Release/move/close/source replacement/deactivation/disposal invalidate stale timers; consumed callbacks cannot replay. Inactive/disposed input entries are inert. Deactivation detaches keyboard/mode observation, releases capture and clears moving; activation reads current mode and accepts fresh gestures. Scoped17 each/full Cedar35/Maple87 pass using controlled timers/MQL/events, not native touch/browser/OS proof. PreviewGroup track scheduling remains separately pending; no API/token change.

Display images with captions, loading fallback and preview. Example groups match Cedar.

### Preview Interaction Lifecycle

```demo
../example/demos/en-US/controller-lifecycle.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"` and supports runtime and nested overrides. Preview collection navigation, horizontal keys and swipes follow reading direction without reversing the image array. Direction changes cancel pending gestures while preserving the current image, scale and rotation. Images and zoomed pan coordinates are not mirrored. Numerical indicators remain LTR.

## API

ImagePreviewGroup binds a one-based image number through ordinary `v-model`; `defaultValue` initializes the uncontrolled index. Panel opening uses `v-model:open` and `defaultOpen` independently. Programmatic preview options also use modelValue/`defaultValue` and onUpdate:modelValue.

### Props

| Arguments | Description | Type | Default |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | --------- |
| `src` | Image URL | _string_ | `-` |
| `object-fit` | Fit: fill/contain/cover/none/scale-down | _string_ | `fill` |
| `object-position` | CSS object-position for alignment of image content within its box, default 50% 50%; not component coordinates | _string_ | `50% 50%` |
| `alt` | Image alt text, the same as the native attribute of the `img` tag | _string_ | `-` |
| `title` | Image `title` text, the same as with the native attributes of the `img` tag | _string_ | `-` |
| `description` | Image description; used as fallback `alt` text and in the default error state | _string_ | `-` |
| `hide-footer` | Whether to hide the footer; `never` keeps it visible on errors | _boolean \| 'never'_ | `false` |
| `footer-position` | Footer region inside (inner) or outside (outer) the image, default inner; not four-side popup placement | _string_ | `inner` |
| `footer-class` | Footer class name | _string \| array \| object_ | `-` |
| `referrer-policy` | Indicate which referrer to use when fetching the resource. This attribute requires attention to browser compatibility, see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) | _string_ | `-` |
| `width` | Image width | _string \| number_ | `-` |
| `height` | Image height | _string \| number_ | `-` |
| `radius` | Image radius | _string \| number_ | `0` |
| `lazy` | Whether to enable lazy loading | _boolean_ | `false` |
| `show-loader` | Image displayed while lazy loading | _string_ | `-` |
| `fallback-src` | When lazy loading is enabled, the image displayed after an error | _string_ | `-` |
| `show-loader` | Whether to show the default loading state | _boolean_ | `false` |
| `ripple` | Whether to enable ripple | _boolean_ | `false` |
| `block` | Whether it is a block element | _boolean_ | `true` |
| `preview-disabled` | Whether click preview is disabled | _boolean_ | `false` |
| `preview-src` | Preview image URL, defaults to `src` | _string_ | `-` |
| `v-model:open` | Controlled preview state | _boolean_ | `-` |
| `default-open` | Default preview open state | _boolean_ | `false` |
| `preview-props` | Props passed to `ImagePreview` | _object_ | `-` |
| `popup-container` | Preview mount target; `false` disables Teleport | _string \| HTMLElement \| false_ | `body` |

### Events

| Event | Description | Arguments |
| --------------------- | ---------------------------------------------------------------------------------- | --------------- |
| `click` | Triggered when you click on Image | `event: Event` |
| `load` | Triggered when the image is successfully loaded (when the image fails in lazy loading mode, it will only be triggered when the image is successfully loaded) | `event: Event` |
| `error` | Emitted on image loading failure. Lazy loading retries and emits only after all attempts fail | `event: Event` |
| `open-change` | Emitted when preview opens/closes | `open: boolean` |
| `update:open` | Updates the `open` model | `open: boolean` |

### Slots

| Slot | Description | Arguments |
| ----------------- | ---------------------- | ---- |
| `error` | Loading-failure slot | `-` |
| `error-icon` | Custom icon for the default error state | `-` |
| `loader` | Custom loading state | `-` |
| `extra` | Additional footer content | `-` |
| `preview-actions` | Custom preview action content | `-` |

### Imperative preview

`imagePreview(url | url[] | options)` returns a unified handle exposing open/close/prev/next/to/reset/zoomTo/zoomIn/zoomOut/rotateLeft/rotateRight/toggleFullscreen.

## ImagePreview API

### Props

| Arguments | Description | Type | Default |
| ----------------------- | ------------------------------------------------ | -------------------------------- | ------- |
| `v-model:open` | Visible state | _boolean_ | `false` |
| `default-open` | Default uncontrolled open state | _boolean_ | `false` |
| `src` | Single-image preview URL | _string_ | `-` |
| `scale-step` | Scale increment per action | _number_ | `0.5` |
| `closable` | Show the close button | _boolean_ | `true` |
| `overlay-closable` | Close on backdrop click; clicking the image keeps it open | _boolean_ | `true` |
| `lock-scroll` | Lock scroll | _boolean_ | `true` |
| `esc-to-close` | Whether keyboard ESC closes | _boolean_ | `true` |
| `popup-container` | The location of the ejector layer mount | _string \| HTMLElement \| false_ | `body` |
| `image-prevent-default` | Whether to disable the default behavior of images | _boolean_ | `false` |

### ImagePreviewGroup props

| Arguments | Description | Type | Default |
| ------------------ | -------------------------------------------- | -------------------------------- | ------- |
| `images` | Image URL list; overrides child Image collection | _string[]_ | `[]` |
| `v-model:open` | Whether preview is open | _boolean_ | `false` |
| `default-open` | Default uncontrolled open state | _boolean_ | `false` |
| `v-model` | Current image number (starts at 1) | _number_ | `-` |
| `default-value` | Initial image number (starts at 1) in uncontrolled mode | _number_ | `1` |
| `loop` | Whether to loop | _boolean_ | `false` |
| `closable` | Show the close button | _boolean_ | `true` |
| `overlay-closable` | Close on backdrop click; clicking the image keeps it open | _boolean_ | `true` |
| `esc-to-close` | Whether keyboard ESC closes | _boolean_ | `true` |
| `popup-container` | Popup mount target | _string \| HTMLElement \| false_ | `body` |

### Events

| Event | Description | Callback arguments |
| ------------- | ---------------------------------------- | ------------------------ |
| `change` | The callback function when switching images, the callback parameter is the current index | `imageNumber: number, previousImageNumber: number`; image numbers |
| `open` | Triggered when Image-Preview is turned on | `-` |
| `opened` | Triggered at the end of the open image-preview animation | `-` |
| `open-change` | Emitted when open state changes | `open: boolean` |
| `close` | Triggered when Image-Preview is off | `-` |
| `closed` | Triggered when the animation that closes the image-preview ends | `-` |
| `long-press` | The callback function when long pressing an image, the callback parameter is the current index | `imageNumber: number`; image number |
| `key-escape` | Triggered when click keyboard ESC | `-` |

### Methods

| Method | Description | Arguments | Returns |
| ---------------------------------- | ------------------ | ------------------------------- | ------ |
| `imagePreview` | Open image-preview | _options \| string \| string[]_ | `-` |
| `imagePreview.close` | Close image-preview | _-_ | `-` |
| `imagePreview.setDefaultOptions` | Set default option configuration | _options_ | `-` |
| `imagePreview.resetDefaultOptions` | Reset default option configuration | _-_ | `-` |
| `prev` / `next` | Switch image | `-` | `-` |
| `to` | Go to an image number (starts at 1) | `imageNumber: number` | `-` |
| `zoomTo` | Set scale | `scale: number` | `-` |
| `zoomIn` / `zoomOut` | Zoom in or out | `-` | `-` |
| `rotateLeft` / `rotateRight` | Rotate image | `-` | `-` |
| `reset` / `toggleFullscreen` | Reset or toggle fullscreen | `-` | `-` |

### Slots

| Slot | Description | Arguments |
| ------------ | ---------------- | ------------------------------------------------------- |
| `indicator` | Paging indicator | `imageNumber: number`; image index <br> `length: number`; total images |
| `close-icon` | Close button | `-` |
| `extra` | Additional slot | `-` |
| `actions` | Custom preview action area | `-` |

### ImagePreview Options

| Arguments | Description | Type | Default |
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

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --------------------------------------------- | -------- |
| `--image-preview-swipe-indicators-text-color` | `#ddd` |
| `--image-preview-swipe-indicators-padding` | `16px 0` |
| `--image-preview-zoom-container-background` | `#000` |
| `--image-preview-close-icon-top` | `14px` |
| `--image-preview-close-icon-right` | `14px` |
| `--image-preview-close-icon-size` | `22px` |
| `--image-preview-close-icon-color` | `#fff` |
| `--image-preview-extra-top` | `14px` |
| `--image-preview-extra-left` | `14px` |

### Image-preview group numbering

`modelValue/defaultValue` start at `1`. `open(imageNumber = 1)` and `to(imageNumber)` use the same numbering; invalid/noninteger values are ignored. `prev()/next()` retain this numbering at loop boundaries. Model events are `update:modelValue(imageNumber)`; navigation emits `change(imageNumber, previousImageNumber)`, while external assignments do not. Long press emits `long-press(imageNumber)`; the indicator slot receives `{ imageNumber, length }`. Internal array indices remain zero-based.

Root `class` and `style` merge with the Image wrapper. Use `img-props.class/style` to style the inner image. Preview `open-change` is a Vue notification event: each state transition emits once, `.once` uses Vue event semantics, and returned Promises do not control loading. The typed `onOpenChange` listener uses this same event path.
