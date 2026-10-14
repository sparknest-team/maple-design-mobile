# Icon

## Transition lifecycle

transition is a public visual replacement duration, default0, not a new CSS token. CSS/JS share one normalized value (negative/nonfinite becomes0). Duration changes cancel old phases and commit the current name. Replacement/preference/deactivation/disposal invalidate stale and consumed callbacks. KeepAlive suspends animations and detaches observation; activation shows the latest name without replay. Preference uses the actual span owner window and stale listener bindings are rejected. Registry/slot precedence/spin remain. Nine simulated tests per copy had6 failures/3 controls; full Icon Cedar20/Maple21 pass, not native browser/OS proof.

```demo
../example/demos/lifecycle.vue
```

## Introduction

SVG Vue component icon library.
## Recommended Usage

After configuring `MapleResolver()`, use template tags for automatic on-demand imports. `m-icon-*` is the Resolver's icon namespace; only the corresponding individual icon is loaded from `@maplejs/icons-vue`:

```html
<mp-icon size="40" color="red">
  <m-icon-checkbox-marked-circle-fill />
</mp-icon>
```

You can also import a standalone icon component manually:

```ts
import { IconCheckboxMarkedCircleFill } from '@maplejs/icons-vue'
```

For manual imports, the `<mp-icon>` wrapper is still recommended when size, color, animation, or the interaction area should be controlled consistently:

```html
<mp-icon size="40" color="red">
  <IconCheckboxMarkedCircleFill />
</mp-icon>
```

Both approaches render the same result and support Tree Shaking. The Resolver generates the first import, while application code explicitly owns the second. Use `<img>` or an image component for web images.

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

```demo
../example/demos/rotate-and-spin.vue
```

### Click Event

```demo
../example/demos/click-event.vue
```

### Dynamic Name (Special Case)

```demo
../example/demos/icon-animation.vue
```

### Icon List (click copy)

```demo
../example/demos/icon-list.vue
```

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
