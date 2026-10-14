# Image

Track scheduling is now independently reviewed (earlier pending notes are historical): close/image/loop changes, deactivation and disposal invalidate work; callbacks consume once, activation only canonicalizes current coordinates, retained commands never replay. Double RAF is settlement even at zero duration; triplicated looping remains. Both tracks consume system slow/standard (currently240ms), replacing Maple's fixed280ms. Recenter reads actual transform duration+delay;400ms is only unresolved-style fallback. Scoped27 each/full Image Cedar62/Maple114 and32 Less cascade cases are controlled evidence, not native browser acceptance.

### PreviewGroup track lifecycle / 轨道生命周期

```demo
../example/demos/en-US/track-lifecycle.vue
```

Preview long press500ms and double-tap recognition320ms are interaction policy, not CSS duration/close delay. Release/move/close/source replacement/deactivation/disposal invalidate stale timers; consumed callbacks cannot replay. Inactive/disposed input entries are inert. Deactivation detaches keyboard/mode observation, releases capture and clears moving; activation reads current mode and accepts fresh gestures. Scoped17 each/full Cedar35/Maple87 pass using controlled timers/MQL/events, not native touch/browser/OS proof. PreviewGroup track scheduling remains separately pending; no API/token change.

Display images with captions, loading fallback and preview. Example groups match Cedar.

## Examples

### Preview Interaction Lifecycle

```demo
../example/demos/en-US/controller-lifecycle.vue
```

### Basic usage

Set `src` to render an image with preview enabled.

```demo
../example/demos/basic.vue
```

### Fit mode

Use `object-fit` to control how the image fills its box.

```demo
../example/demos/fit-mode.vue
```

### Size, radius and position

`width` / `height`, `radius` and `object-position` control size, corners and crop position.

```demo
../example/demos/presentation.vue
```

### Caption

Use `title`, `description` and `footer-position` to place the caption.

```demo
../example/demos/caption.vue
```

### Extra footer

Use the `extra` slot to add custom footer content.

```demo
../example/demos/extra.vue
```

### Error state

Failed images show the default error state, or a custom `error` slot.

```demo
../example/demos/error.vue
```

### Keep footer on error

`hide-footer="never"` keeps the footer visible when loading fails.

```demo
../example/demos/hide-footer-never.vue
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

### Ripple and inline

`ripple` adds a click wave; set `block` to `false` to render inline.

```demo
../example/demos/ripple.vue
```

### Disable preview

`preview-disabled` prevents opening preview on click.

```demo
../example/demos/disable-preview.vue
```

### Preview entry

Configure embedded preview with `preview-src`, `v-model:preview-open` and `preview-props`.

```demo
../example/demos/preview-entry.vue
```

### Close on overlay

Use `preview-props.overlayClosable` to close preview when clicking outside the image. Enabled on the left, disabled on the right. Clicking the image itself never closes it.

```demo
../example/demos/overlay-closable.vue
```

### Popup container

Mount the preview into a specified node with `preview-props.popupContainer`.

```demo
../example/demos/preview-popup-container.vue
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

### Single preview

`ImagePreview` takes a single `src` and handles zoom, rotate, drag and fullscreen.

```demo
../example/demos/component-preview.vue
```

### Custom preview

The close icon, indicator and action area can all be customized.

```demo
../example/demos/preview-features.vue
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

## API


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
| `v-model:preview-open`        | Controlled preview visibility                                                                                                                                                                   | _boolean_                        | `-`       |
| `default-preview-open`        | Default preview visibility                                                                                                                                                                      | _boolean_                        | `false`   |
| `preview-props`               | Props passed to `ImagePreview`                                                                                                                                                                  | _object_                         | `-`       |
| `popup-container`             | Preview mount target; `false` disables Teleport                                                                                                                                                 | _string \| HTMLElement \| false_ | `body`    |

### Events

| Event                 | Description                                                                                                                                                  | Arguments       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `click`               | Triggered when you click on Image                                                                                                                            | `event: Event`  |
| `load`                | Triggered when the image is successfully loaded (when the image fails in lazy loading mode, it will only be triggered when the image is successfully loaded) | `event: Event`  |
| `error`               | Triggered when an image fails to load (when an image fails in lazy loading mode, it will only be triggered when the number of attempts ends)                 | `event: Event`  |
| `preview-open-change` | Triggered when preview opens or closes                                                                                                                       | `open: boolean` |
| `update:preview-open` | Updates the `preview-open` model                                                                                                                             | `open: boolean` |

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
| `v-model:current`  | Current image index                                       | _number_                         | `-`     |
| `default-current`  | Default image index in uncontrolled mode                  | _number_                         | `0`     |
| `loop`             | Whether to loop                                           | _boolean_                        | `false` |
| `closable`         | Whether to show close button                              | _boolean_                        | `true`  |
| `overlay-closable` | Close on backdrop click; clicking the image keeps it open | _boolean_                        | `true`  |
| `esc-to-close`     | Whether pressing ESC closes the preview                   | _boolean_                        | `true`  |
| `popup-container`  | Mount point for preview popup                             | _string \| HTMLElement \| false_ | `body`  |

### Events

| Event         | Description                                                                                    | Arguments                      |
| ------------- | ---------------------------------------------------------------------------------------------- | ------------------------------ |
| `change`      | The callback function when switching images, the callback parameter is the current index       | `index: number` Image indexing |
| `open`        | Triggered when Image-Preview is turned on                                                      | `-`                            |
| `opened`      | Triggered at the end of the open image-preview animation                                       | `-`                            |
| `open-change` | Triggered when open state changes                                                              | `open: boolean`                |
| `close`       | Triggered when Image-Preview is off                                                            | `-`                            |
| `closed`      | Triggered when the animation that closes the image-preview ends                                | `-`                            |
| `long-press`  | The callback function when long pressing an image, the callback parameter is the current index | `index: number` Image indexing |
| `key-escape`  | Triggered when click keyboard ESC                                                              | `-`                            |

### Methods

| Method                             | Description                        | Arguments                       | Return |
| ---------------------------------- | ---------------------------------- | ------------------------------- | ------ |
| `imagePreview`                     | Open image-preview                 | _options \| string \| string[]_ | `-`    |
| `imagePreview.close`               | Close image-preview                | _-_                             | `-`    |
| `imagePreview.setDefaultOptions`   | Set default option configuration   | _options_                       | `-`    |
| `imagePreview.resetDefaultOptions` | Reset default option configuration | _-_                             | `-`    |
| `prev` / `next`                    | Switch image                       | `-`                             | `-`    |
| `to`                               | Go to an index                     | `index: number`                 | `-`    |
| `zoomTo`                           | Set scale                          | `scale: number`                 | `-`    |
| `zoomIn` / `zoomOut`               | Zoom in or out                     | `-`                             | `-`    |
| `rotateLeft` / `rotateRight`       | Rotate image                       | `-`                             | `-`    |
| `reset` / `toggleFullscreen`       | Reset or toggle fullscreen         | `-`                             | `-`    |

### Slots

| Name         | Description                | SlotProps                                                                  |
| ------------ | -------------------------- | -------------------------------------------------------------------------- |
| `indicator`  | Paging indicator           | `index: number` Image indexing <br> `length: number` Total number of image |
| `close-icon` | Close button               | `-`                                                                        |
| `extra`      | Extra slots                | `-`                                                                        |
| `actions`    | Custom preview action area | `-`                                                                        |

### ImagePreview Options

| Prop                  | Description                                                                                    | Type                      | Default |
| --------------------- | ---------------------------------------------------------------------------------------------- | ------------------------- | ------- |
| `images`              | The image URL array or the URL of a single image to be previewed                               | _string[] \| string_      | `[]`    |
| `current`             | Index from which the image preview starts                                                      | _number_                  | `0`     |
| `scaleStep`           | Scale increment per action                                                                     | _number_                  | `0.5`   |
| `closable`            | Whether to show the close button                                                               | _boolean_                 | `true`  |
| `escToClose`          | Whether to support keyboard ESC to close the image-preview                                     | _boolean_                 | `true`  |
| `lockScroll`          | Lock scroll                                                                                    | _boolean_                 | `true`  |
| `imagePreventDefault` | Whether to disable the default behavior of images                                              | _boolean_                 | `false` |
| `onChange`            | The callback function when switching images, the callback parameter is the current index       | _(index: number) => void_ | `-`     |
| `onOpen`              | Callback when image-preview is turned on                                                       | _() => void_              | `-`     |
| `onOpened`            | Callback at the end of the animation that opened image-preview                                 | _() => void_              | `-`     |
| `onClose`             | Callback when image-preview is closed                                                          | _() => void_              | `-`     |
| `onClosed`            | Callback at the end of the animation that closes the image-preview                             | _() => void_              | `-`     |
| `onLongPress`         | The callback function when long pressing an image, the callback parameter is the current index | _(index: number) => void_ | `-`     |
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
