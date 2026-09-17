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

Long text scales to the avatar width by default. Edit the input to see it; set `autoFixFontSize` to `false` to keep the original size.

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
} from '@maplejs/maple-ui'
```
