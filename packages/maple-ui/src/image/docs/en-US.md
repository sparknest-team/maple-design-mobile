# Image

### Intro

Components provide more convenient size, fill mode, rounded corner Settings,
ripple effect enhanced picture click interactive experience.
Supports `Lazy load`, `loading images`, `error images`, and default Settings for applying Lazy instructions.

### Basic Usage

```html
<template>
  <mp-image src="https://maplejs.org/cat.jpg" />
</template>
```

### Fit Mode

```html
<template>
  <mp-space :size="[20, 20]">
    <mp-image width="85px" height="85px" src="https://maplejs.org/cat.jpg" />

    <mp-image width="85px" height="85px" object-fit="cover" src="https://maplejs.org/cat.jpg" />

    <mp-image width="85px" height="85px" object-fit="none" src="https://maplejs.org/cat.jpg" />

    <mp-image width="85px" height="85px" object-fit="contain" src="https://maplejs.org/cat.jpg" />

    <mp-image width="85px" height="85px" object-fit="scale-down" src="https://maplejs.org/cat.jpg" />
  </mp-space>
</template>
```

### Set Radius

```html
<template>
  <mp-space :size="[20, 20]">
    <mp-image width="85px" height="85px" object-fit="cover" :radius="10" src="https://maplejs.org/cat.jpg" />

    <mp-image width="85px" height="85px" object-fit="cover" radius="50%" src="https://maplejs.org/cat.jpg" />
  </mp-space>
</template>
```

### Use Ripple

```html
<template>
  <mp-image width="85px" height="85px" ripple src="https://maplejs.org/cat.jpg" />
</template>
```

### Use LazyLoad

```html
<template>
  <mp-image width="85px" height="85px" lazy src="https://maplejs.org/cat.jpg" />
</template>
```

### Set Lazy Loading State

```html
<!-- playground-ignore -->
<template>
  <mp-image
    lazy
    width="85px"
    height="85px"
    show-loader="https://xxx.xxx/loading.png"
    fallback-src="https://xxx.xxx/error.png"
    src="https://maplejs.org/cat.jpg"
  />
</template>
```

### Load Failure Slot

```html
<template>
  <mp-image width="22.666vw" height="22.666vw" src="https://maplejs.org/ca.jpg">
    <template #error>
      <svg viewBox="0 0 24 24" style="width: 100%; height: 100%;">
        <path
          fill="currentColor"
          d="M21,5V11.59L18,8.58L14,12.59L10,8.59L6,12.59L3,9.58V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5M18,11.42L21,14.43V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V12.42L6,15.41L10,11.41L14,15.41"
        ></path>
      </svg>
    </template>
  </mp-image>
</template>
```

### Preview

For `preview`, `preview-src`, `v-model:preview-open`, and `preview-props`, see the ImagePreview API below. You can also use `Image.Preview` / `Image.PreviewGroup` / `Image.preview()`.

### Close on Overlay Click

Use `preview-props.overlayClosable` to control whether clicking outside the image closes the preview. It is enabled for the left image and disabled for the right image. Clicking the image itself never closes the preview.

```html
<template>
  <mp-space :size="[16, 16]">
    <mp-image
      width="120"
      height="120"
      object-fit="cover"
      src="https://maplejs.org/cat.jpg"
      :preview-props="{ overlayClosable: true }"
    />
    <mp-image
      width="120"
      height="120"
      object-fit="cover"
      src="https://maplejs.org/cat2.jpg"
      :preview-props="{ overlayClosable: false }"
    />
  </mp-space>
</template>
```

### Use local paths

In the file `.vue`,
the `Vue component` will not be automatically processed by the build tool like the native img module,
so you need to import the image resources manually.
Here's how the different build tools are used.

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
