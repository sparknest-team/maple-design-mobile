# Avatar

Both libraries use the same implementation and examples; package prefixes, themes and registration stay local.

## Examples

### Basic usage

Avatars default to a circle at the default size. Use the default slot for text or icons, or pass an image.

```demo
../example/demos/basic.vue
```

### Size

`size` sets width and height. Numbers are px; strings are CSS lengths such as `3rem`. Text and image avatars both use it.

```demo
../example/demos/size.vue
```

### Shape

`shape` supports circle and square.

```demo
../example/demos/shape.vue
```

### Auto-fit text

Long text scales to the avatar width by default. Updated slot text is measured after rendering; shortening it restores the original scale when it fits. Set `auto-fix-font-size` to `false` to keep the original size.

```demo
../example/demos/auto-fix.vue
```

### Image avatar

Set `imageUrl` and provide `alt`. You can also put `img` / `picture` in the default slot.

```demo
../example/demos/image.vue
```

### Image fit

`objectFit` controls how the image fills the avatar.

```demo
../example/demos/fit.vue
```

### Loading and fallback

`lazy` enables lazy loading. `loading` is the placeholder. Failed loads can use an `error` image or the `error` slot.

```demo
../example/demos/fallback.vue
```

### Color and border

`color` sets the background. `bordered` / `borderColor` control the outline.

```demo
../example/demos/style.vue
```

### Avatar group

`AvatarGroup` stacks children. Use `bordered` for layered outlines, `maxCount` to fold extras into a Popover, `maxStyle` for the summary avatar, and `zIndexAscend` for stacking order. `shape` / `size` / `offset` apply to every child.

```demo
../example/demos/group.vue
```

### Vertical group

`vertical` stacks avatars in a column. `offset` is the overlap, in px when numeric.

```demo
../example/demos/group-vertical.vue
```

### Hoverable

`hoverable` scales the avatar on hover, alone or inside a group.

```demo
../example/demos/hoverable.vue
```

### Trigger icon

The `trigger-icon` slot adds an action. `triggerType` is `button` or `overlay`; clicks emit `click`.

```demo
../example/demos/trigger.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| shape | Avatar shape | `circle / square` | `circle` |
| image-url | Image URL | `string` | `-` |
| alt | Image alternative text | `string` | `''` |
| size | Width and height; numbers are px, strings are CSS lengths | `number / string` | `-` |
| auto-fix-font-size | Scale overflow text automatically | `boolean` | `true` |
| trigger-type | How the action icon is shown | `button / overlay` | `button` |
| trigger-icon-style | Custom style for the action icon | `CSSProperties` | `-` |
| object-fit | Image fitting mode | `fill / contain / cover / none / scale-down` | `cover` |
| color | Background color | `string` | `-` |
| bordered | Whether to show a border | `boolean` | `false` |
| border-color | Border color | `string` | `-` |
| loading | Placeholder image while loading | `string` | `-` |
| error | Fallback image on load failure | `string` | `-` |
| lazy | Whether to lazy-load the image | `boolean` | `false` |
| hoverable | Whether to scale on hover | `boolean` | `false` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| click | Emitted when the avatar is clicked | `(event: MouseEvent) => void` |
| load | Emitted when the image loads | `() => void` |
| error | Emitted when the image fails to load | `() => void` |

### Slots

| 插槽 | 说明 |
| --- | --- |
| default | Text, icon, or loading content |
| error | Fallback when the image fails |
| trigger-icon | Action icon on the avatar |

### Methods

No public methods.
<!-- same-source-api:end -->

### AvatarGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| shape | Child avatar shape | `circle / square` | `circle` |
| size | Child width and height; numbers are px, strings are CSS lengths | `number / string` | `-` |
| auto-fix-font-size | Scale overflow text on children | `boolean` | `true` |
| max-count | Maximum visible avatars; `0` means unlimited | `number` | `0` |
| z-index-ascend | Use ascending stacking order | `boolean` | `false` |
| max-style | Custom summary avatar style | `CSSProperties` | `-` |
| max-popover-props | Summary Popover props | `PopoverProps` | `-` |
| offset | Overlap offset | `number / string` | `-` |
| vertical | Stack avatars vertically | `boolean` | `false` |

### AvatarGroup Slots

| Slot | Description |
| --- | --- |
| default | Avatar list |

### Type Definitions

```ts
import type {
  AvatarGroupInstance,
  AvatarGroupProps,
  AvatarInstance,
  AvatarProps,
  AvatarObjectFit,
  AvatarShape,
  AvatarTriggerType,
} from '@maple-design/ui'
```

### Style Variables

| Variable | Default |
| --- | --- |
| `--mp-avatar-size-default` | `40px` |
| `--mp-avatar-font-size-text` | `20px` |
| `--mp-avatar-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-avatar-text-padding-inline` | `4px` |
| `--mp-avatar-bg` | `var(--mp-color-fill-4)` |
| `--mp-avatar-border-width` | `2px` |
| `--mp-avatar-border-color` | `var(--mp-sys-color-surface-default)` |
| `--mp-avatar-group-item-border` | `var(--mp-sys-color-surface-default)` |
| `--mp-avatar-group-item-border-width` | `2px` |
| `--mp-avatar-group-offset` | `-10px` |
| `--mp-avatar-group-popover-item-spacing` | `8px` |
| `--mp-avatar-font-weight-text` | `500` |
| `--mp-avatar-circle-border-radius` | `50%` |
| `--mp-avatar-square-border-radius` | `4px` |
| `--mp-avatar-size-trigger-button` | `20px` |
| `--mp-avatar-trigger-button-bg` | `var(--mp-color-fill-2)` |
| `--mp-avatar-trigger-button-bg-hover` | `var(--mp-color-fill-3)` |
| `--mp-avatar-trigger-overlay-icon` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-avatar-trigger-overlay-bg` | `color-mix(in srgb, var(--mp-color-black) 60%, transparent)` |
| `--mp-avatar-trigger-icon-button` | `var(--mp-sys-color-content-primary)` |
| `--mp-avatar-spacing-trigger-button-right` | `4px` |
| `--mp-avatar-spacing-trigger-button-bottom` | `4px` |
| `--mp-avatar-size-trigger-icon` | `12px` |
| `--mp-avatar-trigger-button-border-radius` | `50%` |
| `--mp-avatar-font-size-max-count` | `20px` |
| `--mp-avatar-max-count-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-avatar-trigger-overlay-font-size` | `16px` |
| `--mp-avatar-hover-transform` | `scale(1.1)` |
| `--mp-avatar-motion-duration` | `0.2s` |
| `--mp-avatar-z-index-trigger` | `1` |
| `--mp-avatar-z-index-overlay` | `0` |
| `--mp-avatar-z-index-overlay-hover` | `2` |

Text, summary counts, and button-style trigger icons use the primary content role. Borders follow the ordinary container surface; only icons on the dark interaction overlay use `content-on-dark`. The `fill-4` avatar background, trigger background/hover step, and translucent black overlay remain component visual values. If the `color` prop changes the avatar background, check text contrast and override `text-color` when needed. Maple's dark avatar background remains a component-specific `#303030`.

### Reduced motion

Built-in CSS transitions respect `prefers-reduced-motion: reduce`. Final visibility, checked/expanded state and event semantics remain unchanged; custom slot animations are controlled by the application.
