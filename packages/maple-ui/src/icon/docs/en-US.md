# Icon

Icons are independent SVG Vue components. Use the Resolver for on-demand imports and the Icon wrapper to control size, color, and rotation.

The wrapper uses lightweight namespace, size, and installation helpers. Importing it on demand does not include the general utility library; graphics come from the individual SVG components you use.

## Examples

### Basic Usage

```demo
../example/demos/basic.vue
```

### Icon Size

```demo
../example/demos/icon-size.vue
```

### Icon Color

```demo
../example/demos/icon-color.vue
```

### Rotate and Spin

Use `rotate` for a static angle and `spin` for continuous rotation; they can be combined.

```demo
../example/demos/rotate-and-spin.vue
```

### Click Event

```demo
../example/demos/click-event.vue
```

### Custom Icon

Place a custom SVG in the default slot. The Icon wrapper controls its size and color.

```demo
../example/demos/custom.vue
```

### Dynamic Name

`name` is a kebab-case name such as `arrow-left`. It only resolves icons registered in the current Vue app and does not load the entire library. Click the button to switch the name and icon together. When a default slot is provided, its content takes priority over `name`.

```demo
../example/demos/icon-animation.vue
```

### All Icons

Both libraries use the same canonical names. Search ignores surrounding whitespace and case; clearing restores all icons. Larger cards wrap the complete name. Click or press Enter / Space to copy a tag. Copying uses the Clipboard API and requires a secure context and clipboard permission; failures display an error.

```demo
../example/demos/icon-list.vue
```

### Name Changes and Lifecycle

```demo
../example/demos/lifecycle.vue
```

<!-- api-review:start -->
### Feature playground

Enable `name` and choose a registered icon to update the preview.

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop              | Description                            | Type               | Default |
| ----------------- | -------------------------------------- | ------------------ | ------- |
| `name`            | icon name                              | _string_           | `-`     |
| `size`            | `inherit` | _string \| number_ | `-`     |
| `color`           | Icon color                             | _string_           | `-`     |
| `rotate`          | Rotation angle                         | _number_           | `-`     |
| `spin`            | Whether to spin continuously           | _boolean_          | `false` |
| `animation-class` | Name of the transition animation class | _string_           | `-`     |
| `transition`      | Transition animation time(ms)          | _string \| number_ | `0`     |

### Standalone SVG Icon Props

| Prop              | Description      | Type                                       | Default   |
| ----------------- | ---------------- | ------------------------------------------ | --------- |
| `size`            | `inherit` | _string \| number_                          | `-`       |
| `color`           | Icon color       | _string_                                   | `-`       |
| `rotate`          | Rotation angle   | _number_                                   | `-`       |
| `spin`            | Whether to spin  | _boolean_                                  | `false`   |
| `title`           | Accessible title | _string_                                   | `-`       |
| `stroke-width`    | Stroke width     | _number_                                   | `4`       |
| `stroke-linecap`  | Stroke line cap  | _'butt' \| 'round' \| 'square'_            | `'butt'`  |
| `stroke-linejoin` | Stroke line join | _'bevel' \| 'inherit' \| 'miter' \| 'round'_ | `'miter'` |

### Events

| Event   | Description                          | Arguments      |
| ------- | ------------------------------------ | -------------- |
| `click` | Triggered when you click on the icon | `event: Event` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable      | Default |
| ------------- | ------- |
| `--icon-size` | `20px`  |

Default Icon size now inherits the host font size on both platforms. Set size="20" or --mp-icon-size: 20px explicitly if a standalone 20px icon is required. The size prop takes precedence over the token; color inherits unless supplied.

### Motion tokens

| Token | Default |
| --- | --- |
| `--mp-icon-spin-duration` | `1s` |

Built-in motion honors prefers-reduced-motion: reduce. State/content remain visible; decorative spin, shimmer and ripple are suppressed. Icon name changes show the latest value and cancel pending phases, using the same normalized CSS/JS duration. Custom animation classes remain the caller's responsibility. See Ripple's own documentation for its duration/cleanup policy; its historical250ms policy is not an Icon duration limit.
