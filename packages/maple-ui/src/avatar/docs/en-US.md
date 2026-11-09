# Avatar

Both libraries use the same implementation and examples; package prefixes, themes and registration stay local.

## Basic examples

### Basic usage

Avatars default to a circle at the default size. Use the default slot for text or icons, or pass an image.

```demo
../example/demos/basic.vue
```

## Appearance and states

### Size and shape comparison

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `shape` | Avatar shape | Size and shape comparison, Color and border, Hoverable |
| `image-url` | Image URL | Size and shape comparison, Hoverable |
| `alt` | Image alternative text | Size and shape comparison, Hoverable |
| `bordered` | Whether to show a border | Color and border, Hoverable |
| `size` | Avatar width and height; numbers are px, strings are CSS lengths | Size and shape comparison |
| `color` | Background color | Color and border |
<!-- demo-config-notes:end -->


Compare space used at each size, then round and square boundaries. Image fitting and fallback remain separate.

<details>
<summary>Configuration details and limits</summary>

#### Size

`size` sets width and height. Numbers are px; strings are CSS lengths such as `3rem`. Text and image avatars both use it.

#### Shape

`shape` supports circle and square.

</details>

```demo
../example/demos/shape-size-comparison.vue
```

### Color and border

`color` sets the background. `bordered` / `borderColor` control the outline.

```demo
../example/demos/style.vue
```

### Hoverable

`hoverable` scales the avatar on hover, alone or inside a group.

```demo
../example/demos/hoverable.vue
```

## Layout and arrangement

### Group direction and overflow

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `image-url` | Image URL | Group direction and overflow |
| `alt` | Image alternative text | Group direction and overflow |
| `bordered` | Whether to show a border | Group direction and overflow |
| `color` | Background color | Group direction and overflow |
<!-- demo-config-notes:end -->


Compare horizontal and vertical groups, maximum counts, stacking and overflow indicators.

<details>
<summary>Configuration details and limits</summary>

#### Avatar group

`AvatarGroup` stacks children. Use `bordered` for layered outlines, `maxCount` to fold extras into a Popover, `maxStyle` for the summary avatar, and `zIndexAscend` for stacking order. `shape` / `size` / `offset` apply to every child.

#### Vertical group

`vertical` stacks avatars in a column. `offset` is the overlap, in px when numeric.

</details>

```demo
../example/demos/group-comparison.vue
```

## Content and presentation

### Auto-fit text

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `image-url` | Image URL | Image avatar, Image fit, Loading and fallback |
| `alt` | Image alternative text | Image avatar, Image fit, Loading and fallback |
| `size` | Avatar width and height; numbers are px, strings are CSS lengths | Image avatar, Image fit, Loading and fallback |
| `shape` | Avatar shape | Auto-fit text, Image avatar |
| `auto-fix-font-size` | Whether to shrink long text automatically | Auto-fit text |
| `object-fit` | Image fitting mode | Image fit |
<!-- demo-config-notes:end -->


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

## Interaction and control

### Trigger icon

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `image-url` | Image URL | Trigger icon |
| `alt` | Image alternative text | Trigger icon |
| `size` | Avatar width and height; numbers are px, strings are CSS lengths | Trigger icon |
| `trigger-type` | How the action icon is shown | Trigger icon |
<!-- demo-config-notes:end -->


The `trigger-icon` slot adds an action. `triggerType` is `button` or `overlay`; clicks emit `click`.

```demo
../example/demos/trigger.vue
```

## API

<!-- same-source-api:start -->
The default image `error` icon retains a nonempty `alt` as its accessible name; an empty `alt` denotes decoration. Provide appropriate semantics for a custom `error` slot. The default slot may switch dynamically between images and text; application code owns slotted image load events and styles.

When `trigger-icon` contains no interactive control, the avatar exposes button semantics and supports Enter and Space. Describe the action with `trigger-aria-label` or the root `aria-label`. If the slot supplies its own interactive control, that control handles keyboard input. The default click-triggered group summary can be opened by keyboard; Escape closes it and restores focus.

### Avatar Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| shape | Avatar shape | `circle / square` | `circle` |
| image-url | Image URL | `string` | `-` |
| alt | Image alternative text | `string` | `''` |
| size | Avatar width and height; numbers are px, strings are CSS lengths | `number / string` | `-` |
| auto-fix-font-size | Whether to shrink long text automatically | `boolean` | `true` |
| trigger-type | How the action icon is shown | `button / overlay` | `button` |
| trigger-aria-label | Accessible name of the interaction | `string` | `—` |
| trigger-icon-style | Custom style for the action icon | `CSSProperties` | `-` |
| object-fit | Image fitting mode | `fill / contain / cover / none / scale-down` | `cover` |
| color | Background color | `string` | `-` |
| bordered | Whether to show a border | `boolean` | `false` |
| border-color | Border color | `string` | `-` |
| loading | Placeholder image while loading | `string` | `-` |
| error | Fallback image URL when image loading fails | `string` | `-` |
| lazy | Whether to lazy-load the image | `boolean` | `false` |
| hoverable | Whether to scale on hover | `boolean` | `false` |

### Avatar Events

| Event | Description | Arguments |
| --- | --- | --- |
| click | Emitted when the avatar is clicked | `(event: MouseEvent) => void` |
| load | Emitted when the image loads | `() => void` |
| error | Emitted when image loading fails | `() => void` |

### Avatar Slots

| Slot | Description |
| --- | --- |
| default | Text, icon, or loading content for an image |
| error | Fallback content when image loading fails |
| trigger-icon | Action icon on the avatar |

### Avatar Methods

No custom public methods.
<!-- same-source-api:end -->

Group `shape` and `auto-fix-font-size` override item values, and a supplied group `size` takes priority. `max-count` is a nonnegative integer; zero or an invalid value means unlimited. Numeric `size` must be finite and nonnegative; invalid numbers use the default, while strings are CSS lengths. `offset` accepts finite negative numbers or CSS length strings; invalid numbers use the default spacing. The summary participates in group stacking order, which overrides z-index in `max-style`.

### AvatarGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| shape | Child avatar shape | `circle / square` | `circle` |
| size | Child avatar width and height; numbers are px, strings are CSS lengths | `number / string` | `-` |
| auto-fix-font-size | Whether to shrink child avatar text automatically | `boolean` | `true` |
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

## Types

```ts
import type {
  AvatarGroupInstance,
  AvatarGroupProps,
  AvatarInstance,
  AvatarProps,
  AvatarObjectFit,
  AvatarShape,
  AvatarTriggerType,
} from '@maple-design/ui';
```

## CSS Variables

Text, summary counts, and button-style trigger icons use the primary content role. Borders follow the ordinary container surface; only icons on the dark interaction overlay use `content-on-dark`. The `fill-4` avatar background, trigger background/hover step, and translucent black overlay remain component visual values. If the `color` prop changes the avatar background, check text contrast and override `text-color` when needed. Maple's dark avatar background remains a component-specific `#303030`.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-avatar-bg` | `var(--mp-color-fill-4)` | `background-color` |
| `--mp-avatar-border-color` | `var(--mp-sys-color-surface-default)` | `border` |
| `--mp-avatar-border-width` | `2px` | `border` |
| `--mp-avatar-circle-border-radius` | `50%` | `border-radius` |
| `--mp-avatar-font-size-max-count` | `20px` | `font-size` |
| `--mp-avatar-font-size-text` | `20px` | `font-size` |
| `--mp-avatar-font-weight-text` | `500` | `font-weight` |
| `--mp-avatar-group-item-border` | `var(--mp-sys-color-surface-default)` | `border` |
| `--mp-avatar-group-item-border-width` | `2px` | `border` |
| `--mp-avatar-group-offset` | `-10px` | `margin-block-start`, `margin-inline-start` |
| `--mp-avatar-group-popover-item-spacing` | `8px` | `gap` |
| `--mp-avatar-hover-transform` | `scale(1.1)` | `transform` |
| `--mp-avatar-max-count-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-avatar-motion-duration` | `0.2s` | `transition` |
| `--mp-avatar-size-default` | `40px` | `height`, `width` |
| `--mp-avatar-size-trigger-button` | `20px` | `height`, `width` |
| `--mp-avatar-size-trigger-icon` | `12px` | `font-size` |
| `--mp-avatar-spacing-trigger-button-bottom` | `4px` | `bottom` |
| `--mp-avatar-spacing-trigger-button-right` | `4px` | `inset-inline-end` |
| `--mp-avatar-square-border-radius` | `4px` | `border-radius` |
| `--mp-avatar-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-avatar-text-padding-inline` | `4px` | `padding-inline` |
| `--mp-avatar-trigger-button-bg` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-avatar-trigger-button-bg-hover` | `var(--mp-color-fill-3)` | `background-color` |
| `--mp-avatar-trigger-button-border-radius` | `50%` | `border-radius` |
| `--mp-avatar-trigger-icon-button` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-avatar-trigger-overlay-bg` | `color-mix(in srgb, var(--mp-color-black) 60%, transparent)` | `background-color` |
| `--mp-avatar-trigger-overlay-font-size` | `16px` | `font-size` |
| `--mp-avatar-trigger-overlay-icon` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-avatar-z-index-overlay` | `0` | `z-index` |
| `--mp-avatar-z-index-overlay-hover` | `2` | `z-index` |
| `--mp-avatar-z-index-trigger` | `1` | `z-index` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-avatar-border-color: var(--mp-sys-color-surface-default);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Reduced motion

Built-in CSS transitions follow `prefers-reduced-motion: reduce`. Removing transitions does not change final visibility, selected/expanded state or event semantics. Applications control custom animations inside slots.
