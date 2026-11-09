# Signature

### Intro

Signature component based on `Canvas`.

## Basic examples

### Basic Usage

Get the data url of the canvas through the component method `confirm`. When the canvas is empty, you will get the `empty string`.

```demo
../example/demos/basic-usage.vue
```

## Customization and slots

### Custom Style

You can customize the signature style through `stroke-style` and `line-width`. The default `stroke-style` is `currentColor`, which will inherit the text color, so you can also set the color through `css color`.

```demo
../example/demos/custom-style.vue
```

## Drawing sessions

### Writing-session cancellation

A stroke belongs to its initiating single touch identifier. Extra contacts do not restart it; moves/end events from unrelated contacts and events older than the current start cannot take it over. Native `touchcancel`, reset, KeepAlive deactivation, unmount, owner-window blur, a hidden owner document, and the existing resize reset end an active session exactly once. Ordinary release also emits one `end`; cleanup without a stroke does not manufacture an event. After cancellation/reactivation, moving an old contact cannot resume writing: a fresh `touchstart` is required.

`end` means interaction ended, including cancellation; it is not a save/validation task. Cancellation retains already drawn ink, while explicit reset clears it before notifying `end`. Ordinary event handler return Promises are not awaited. The demo schedules business-owned reset/pause from a start notification and clears its timer when the session ends; it does not dispatch fake browser cancellation events. See the size and export contract below.

```demo
../example/demos/session-lifecycle.vue
```

## Drawing and export boundaries

Input is touch-only; mouse, pen and keyboard drawing are not supported. Provide clear instructions and an accessible alternative, such as uploading an existing signature or a non-canvas signing flow. This component does not determine legal validity. A tap and release draws a round dot; movement starts at the initial point with round caps and joins. Cancellation does not add a dot.

The bitmap follows the container size and device pixel ratio. Existing pixels scale to the new size; a zero-size hidden container keeps its bitmap until it becomes visible again. Repeated scaling can interpolate pixels. ResizeObserver tracks container changes where available; otherwise window resize updates the bitmap. Device-pixel-ratio changes are also applied on window resize.

PNG keeps transparency. JPEG uses a white background, so white ink may be invisible in JPEG. The root CSS background is display-only: it is not included in PNG and does not replace the white JPEG background. `line-width` accepts a finite positive number or parseable numeric string, including values below 1; invalid widths fall back to 2px. `stroke-style` is a Canvas color; `currentColor` is resolved when a stroke starts.

## API

### Signature Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `stroke-style` | Canvas stroke style | _string_ | `currentColor` |
| `line-width` | Canvas line width | _string \| number_ | `2` |
| `data-url-type` | Data url type for generating image | _'png' \| 'jpg'_ | `'png'` |

### Signature Events

| Event | Description | Callback arguments |
| --- | --- | --- |
| `start` | Triggered when signing begins | `-` |
| `signing` | Triggered during signature | `-` |
| `end` | Triggered when ending signature | `-` |

### Signature Methods

| Method | Description | Arguments | Returns |
| --- | --- | --- | --- |
| `reset` | Reset canvas | `-` | `-` |
| `confirm` | Return an image data URL; empty canvas returns an empty string, and an unmounted canvas returns undefined | `-` | `string \| undefined` |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-signature-background-color` | `var(--mp-color-fill-3)` | `background` |
| `--mp-signature-border-radius` | `4px` | `border-radius` |
| `--mp-signature-height` | `200px` | `height` |
| `--mp-signature-stroke-color` | `#333` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-signature-background-color: var(--mp-color-fill-3);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
