# Signature

## Examples

### Intro

Signature component based on `Canvas`.

### Basic Usage

Get the data url of the canvas through the component method `confirm`. When the canvas is empty, you will get the `empty string`.

```demo
../example/demos/basic-usage.vue
```

### Custom Style

You can customize the signature style through `stroke-style` and `line-width`. The default `stroke-style` is `currentColor`, which will inherit the text color, so you can also set the color through `css color`.

```demo
../example/demos/custom-style.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop | Description  | Type | Default |
| --- | --- | --- | --- |
| `stroke-style` | Canvas stroke style | _string_ | `currentColor` |
| `line-width` | Canvas line width | _string \| number_ | `2` |
| `data-url-type` | Data url type for generating image | _'png' \| 'jpg'_ | `'png'` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `start` | Triggered when signing begins | `-` |
| `signing` | Triggered during signature | `-` |
| `end` | Triggered when ending signature | `-` |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `reset` | Reset canvas | `-` | `-` |
| `confirm` | Confirm the signature and return image data in data url format. Returns an empty string when the canvas is empty | `-` | `string` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--signature-height` | `200px` |
| `--signature-background-color` | `var(--color-fill-3)` |
| `--signature-stroke-color` | `#333` |
| `--signature-border-radius` | `4px` |
