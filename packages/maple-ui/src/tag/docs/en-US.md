# Tag

### Intro

Tag is used for marking, categorizing, and filtering. The API aligns with Cedar Design Web (PC) Tag, with mobile-friendly extras such as round shape and custom text color.

### Theme Color

Set the theme color with `status`. Options match Button: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger`.

```demo
../example/demos/theme-color-tag.vue
```

### Outline

Use `variant="outline"` for the outline style.

```demo
../example/demos/outline-tag.vue
```

### Round

Enable the pill shape with `round`.

```demo
../example/demos/round-tag.vue
```

### Size

Set size with `size`: `xs` `sm` `md` `lg` `xl`.

```demo
../example/demos/tag-size.vue
```

### Closable

Show a close button with `closable`. Use `v-model:show` or manage a list yourself.

```demo
../example/demos/closable-tag.vue
```

### Loading

Show a loading state with `loading`.

```demo
../example/demos/loading-tag.vue
```

### Checkable

Make the tag toggleable with `checkable` and `v-model:checked`.

```demo
../example/demos/checkable-tag.vue
```

### Icon

Customize the leading icon with the `icon` slot, and the close icon with `close-icon`.

```demo
../example/demos/icon-tag.vue
```

### Custom Color

Override status colors with `color` and `text-color`. With `variant="outline"`, `color` is used as the border color.

```demo
../example/demos/custom-color-tag.vue
```

## API

### Props

#### Tag Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `status` | Theme color: `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `default` |
| `variant` | Variant: `default` (filled) / `outline` | _string_ | `default` |
| `size` | Size: `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `round` | Whether to use a pill shape | _boolean_ | `false` |
| `show` | Visibility (v-model) | _boolean_ | `true` |
| `default-show` | Default visibility | _boolean_ | `true` |
| `loading` | Loading state | _boolean_ | `false` |
| `closable` | Whether closable | _boolean_ | `false` |
| `checkable` | Whether checkable | _boolean_ | `false` |
| `checked` | Checked state when checkable (v-model) | _boolean_ | `true` |
| `default-checked` | Default checked state when checkable | _boolean_ | `true` |
| `nowrap` | Whether content is nowrap with ellipsis | _boolean_ | `false` |
| `color` | Custom background (border color when outline) | _string_ | `-` |
| `text-color` | Custom text color | _string_ | `-` |

### Events

#### Tag Events

| Event | Description | Arguments |
| --- | --- | --- |
| `update:show` | Visibility changed | `(show: boolean)` |
| `update:checked` | Checked state changed (checkable) | `(checked: boolean)` |
| `close` | Close button clicked | `(event: MouseEvent)` |
| `check` | Checked state toggled (checkable) | `(checked: boolean, event: MouseEvent)` |

### Slots

#### Tag Slots

| Slot | Description |
| --- | --- |
| `default` | Tag content |
| `icon` | Leading icon |
| `close-icon` | Custom close icon |

### Type Definitions

```ts
type TagStatus = 'default' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'danger'
type TagSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TagVariant = 'default' | 'outline'
```

### Style Variables

The complete public contract is the `--mp-tag-*` set in `style/token.less`. Customize it with [StyleProvider](#/en-US/style-provider). Cedar uses the same logical names with a different brand prefix.
