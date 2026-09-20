# Alert

### Intro

Alerts display brief messages for the user without interrupting their use.

### Title

```demo
../example/demos/title.vue
```

### Message

```demo
../example/demos/message.vue
```

### Type

`type`: `info` / `success` / `warning` / `danger` / `default`. `default` has no built-in icon; use `#icon` to customize.

```demo
../example/demos/type.vue
```

### Variant

```demo
../example/demos/variant.vue
```

### Custom Icon

```demo
../example/demos/custom-icon.vue
```

### Allow To Close

```demo
../example/demos/allow-to-close.vue
```

### Custom Close Icon

```demo
../example/demos/custom-close-icon.vue
```

### Action

```demo
../example/demos/action.vue
```

### center

```demo
../example/demos/center.vue
```

### banner

```demo
../example/demos/banner.vue
```

### Hide Icon

```demo
../example/demos/show-icon.vue
```

## API

### Props

| Prop        | Description                                                                 | Type                | Default    |
| ----------- | --------------------------------------------------------------------------- | ------------------- | ---------- |
| status      | Type, optional values are `info`, `success`, `warning`, `danger`, `default` | _string_            | `info`     |
| `variant`   | Variant, optional values are `standard` `outline` `tonal`                   | _string_            | `standard` |
| `color`     | Background color                                                            | string              | `-`        |
| `title`     | Title                                                                       | string              | `-`        |
| `message`   | Message                                                                     | string              | `-`        |
| `elevation` | Elevation, optional values are true, false, and levels from 0-24            | _number \| boolean_ | `false`    |
| `closeable` | Whether the alert is closeable                                              | boolean             | `false`    |

### Slots

| Name         | Description               | SlotProps |
| ------------ | ------------------------- | --------- |
| `default`    | The message of alert      | `-`       |
| `content`    | The content of alert      | `-`       |
| `title`      | The title of alert        | `-`       |
| `icon`       | The prepend icon of alert | `-`       |
| `close-icon` | The close icon of alert   | `-`       |

### Events

| Event   | Description                                                                                        | Arguments      |
| ------- | -------------------------------------------------------------------------------------------------- | -------------- |
| `close` | Triggered when the Close button is clicked and can only be used when the Close button is displayed | `event: Event` |

### Style Variables

See `style/token.less` for the complete `--mp-alert-*` contract. Override these variables with [StyleProvider](#/en-US/style-provider). The public names are shared with Cedar; only the `--mp-` / `--c-` brand prefix differs.
