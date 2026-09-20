# Loading

### Intro

Loading component for performing animations when data is loaded.

### Type

```demo
../example/demos/type.vue
```

### Color

```demo
../example/demos/color.vue
```

### Size

```demo
../example/demos/size.vue
```

### Wrap

```demo
../example/demos/wrap.vue
```

### Loading Directive



`v-mp-loading` accepts a boolean shorthand or a `{ loading, tip, type, size, radius, color, hideIcon, fullscreen, background }` options object. In object form, `loading` controls the loading state and the remaining component options match `Loading` props.

#### Registration

`v-mp-loading` renders its indicator with Maple's built-in `Loading` component. The `mp-` prefix avoids collisions with directives from other component libraries. Register it using any one of these approaches.







With `MapleResolver()`, `unplugin-vue-components` resolves `v-mp-loading` automatically. Set `directives: false` to disable directive resolution.

> Wrapper mode applies `opacity: 0.38` to its default-slot content. Because the directive preserves the host DOM, it inserts the built-in Loading VNode and uses an equivalent translucent background overlay instead.

```demo
../example/demos/directive.vue
```

## API

### Props

| prop      | Description                                             | Type               | Default  |
| --------- | ------------------------------------------------------- | ------------------ | -------- |
| `color`   | Loading color                                           | _string_           | `-`      |
| `type`    | Can be set to `circle` `wave` `cube` `rect` `disappear` | _string_           | `circle` |
| `size`    | Can be set to `xs` `sm` `md` `lg` `xl`, or a number     | _string \| number_ | `md`     |
| `tip`     | Tip of the loading                                      | _string_           | `-`      |
| `loading` | Specify whether loading is active                       | _boolean_          | `false`  |
| `radius`  | Set radius size when the `type` is `circle`             | _string \| number_ | `-`      |
| `hide-icon` | Whether to hide the loading indicator                  | _boolean_          | `false`  |

### Slots

| Name      | Description                | SlotProps |
| --------- | -------------------------- | --------- |
| `default` | Content wrapped in loading | `-`       |
| `tip`     | Tip of the loading         | `-`       |
| `icon`    | Custom loading indicator   | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider)

| Variable                | Default                |
| ----------------------- | ---------------------- |
| `--loading-color`       | `var(--color-primary)` |
| `--loading-opacity`     | `0.38`                 |
| `--loading-desc-margin` | `8px 0 0`              |
| `--loading-desc-color`  | `var(--color-primary)` |

The directive overlay prevents the default click action and stops click propagation, so clicking the overlay does not invoke a Card or ancestor click handler. Normal clicks resume when loading ends. Keyboard interaction with underlying controls is not disabled; use disabled on those controls when necessary.

### Overlay styling

| Token | Description |
| --- | --- |
| `--mp-loading-overlay-background` | Directive overlay background; the background option overrides this value. |

Content overlay class：`.mp-loading__content-overlay`。
