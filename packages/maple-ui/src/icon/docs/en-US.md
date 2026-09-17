# Icon

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
| `size`            | icon size                              | _string \| number_ | `-`     |
| `color`           | Icon color                             | _string_           | `-`     |
| `rotate`          | Rotation angle                         | _number_           | `-`     |
| `spin`            | Whether to spin continuously           | _boolean_          | `false` |
| `animation-class` | Name of the transition animation class | _string_           | `-`     |
| `transition`      | Transition animation time(ms)          | _string \| number_ | `0`     |

### Standalone SVG Icon Props

| Prop              | Description      | Type                                       | Default   |
| ----------------- | ---------------- | ------------------------------------------ | --------- |
| `size`            | Icon size        | _string \| number_                          | `-`       |
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
