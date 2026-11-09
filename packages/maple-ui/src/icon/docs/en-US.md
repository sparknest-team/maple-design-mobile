# Icon

Icons are independent SVG Vue components. Use the Resolver for on-demand imports and the Icon wrapper to control size, color, and rotation.

The wrapper reuses static namespace and predicate helpers from maple-shared. CSS size conversion and prop defaults remain in the UI utilities. On-demand imports retain only the helpers and individual SVG components you use.

## Basic examples

### Basic Usage

```demo
../example/demos/basic.vue
```

## Appearance and states

### Icon size and color

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | `inherit` | Icon size and color |
| `color` | Icon color | Icon size and color |
<!-- demo-config-notes:end -->


Compare size and color independently of rotation, animation and click handling.

```demo
../example/demos/appearance-comparison.vue
```

## Content and presentation

### Rotate and Spin

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | `inherit` | Rotate and Spin |
| `rotate` | Rotation angle | Rotate and Spin |
| `spin` | Whether to rotate continuously | Rotate and Spin |
<!-- demo-config-notes:end -->


Use `rotate` for a static angle and `spin` for continuous rotation; they can be combined.

```demo
../example/demos/rotate-and-spin.vue
```

### All Icons

Both libraries use the same canonical names. Search ignores surrounding whitespace and case; clearing restores all icons. Larger cards wrap the complete name. Click or press Enter / Space to copy a tag. Copying uses the Clipboard API and requires a secure context and clipboard permission; failures display an error.

```demo
../example/demos/icon-list.vue
```

## Customization and slots

### Custom Icon

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | `inherit` | Custom Icon |
| `color` | Icon color | Custom Icon |
<!-- demo-config-notes:end -->


Place a custom SVG in the default slot. The Icon wrapper controls its size and color.

```demo
../example/demos/custom.vue
```

## Interaction and control

### Click Event

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | `inherit` | Click Event, Dynamic Name |
| `color` | Icon color | Click Event |
| `name` | icon name | Dynamic Name |
| `transition` | Transition animation time(ms) | Dynamic Name |
<!-- demo-config-notes:end -->


```demo
../example/demos/click-event.vue
```

### Dynamic Name

`name` is a kebab-case name such as `arrow-left`. It only resolves icons registered in the current Vue app and does not load the entire library. Click the button to switch the name and icon together. When a default slot is provided, its content takes priority over `name`.

```demo
../example/demos/icon-animation.vue
```

## Lifecycle and edge cases

### Name Changes and Lifecycle

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `name` | icon name | Name Changes and Lifecycle |
| `transition` | Transition animation time(ms) | Name Changes and Lifecycle |
| `size` | `inherit` | Name Changes and Lifecycle |
<!-- demo-config-notes:end -->


```demo
../example/demos/lifecycle.vue
```

## API

### Standalone icon styles and usage boundaries

Resolver auto-imports include the lightweight rotation styles for standalone icons. With `importStyle: false`, applications must import those styles. The UI Icon style entry also includes them; loading every icon is unnecessary.

When manually importing standalone SVG components, import this stylesheet once in your application entry when using `spin`:

```ts
import '@maple-design/icons-vue/style.css'
```

`rotate` and `spin` can be combined; built-in rotation respects reduced motion. `transition` controls registered-name changes only, using milliseconds as a number or numeric string, such as `200` / `"200"`; it does not parse `"200ms"` / `"1s"`. The default slot owns content and skips name-`transition` animation. Removing it immediately shows the latest name. Custom `animation-class` should avoid overriding the `transform` used for continuous rotation and should implement reduced-motion behavior.

`name` only resolves icons explicitly registered in the current application before rendering; it does not download resources. Registration after mount does not refresh an existing icon automatically. The container's native `title` is not forwarded to its SVG. Set `title` on standalone icons for image naming, and use an accessibly named Button for actions. `click` is a notification supporting Vue `.once`; listener Promises do not manage waiting. `stroke-*` affects strokes only; filled or fixed multicolor artwork may not respond.


### Icon Props

| Prop | Description | Type | Default |
| ----------------- | ---------------------------- | ------------------ | ------- |
| `name` | icon name | _string_ | `-` |
| `size` | `inherit` | _string \| number_ | `-` |
| `color` | Icon color | _string_ | `-` |
| `rotate` | Rotation angle | _number_ | `-` |
| `spin` | Whether to rotate continuously | _boolean_ | `false` |
| `animation-class` | Name of the transition animation class | _string_ | `-` |
| `transition` | Transition animation time(ms) | _string \| number_ | `0` |

### Standalone SVG icon props

| Prop | Description | Type | Default |
| ----------------- | ---------- | -------------------------------------------- | --------- |
| `size` | `inherit` | _string \| number_ | `-` |
| `color` | Icon color | _string_ | `-` |
| `rotate` | Rotation angle | _number_ | `-` |
| `spin` | Whether to rotate | _boolean_ | `false` |
| `title` | Accessible title | _string_ | `-` |
| `stroke-width` | Stroke width | _number_ | `4` |
| `stroke-linecap` | Stroke line cap | _'butt' \| 'round' \| 'square'_ | `'butt'` |
| `stroke-linejoin` | Stroke line join | _'bevel' \| 'inherit' \| 'miter' \| 'round'_ | `'miter'` |

### Icon Events

| Event | Description | Arguments |
| ------- | -------------- | -------------- |
| `click` | Triggered when you click on the icon | `event: MouseEvent` |

### Icon Slots

| Slot | Description |
| --- | --- |
| `default` | Custom content; takes precedence over name |

## Types

```ts
import type { IconProps, IconInstance } from '@maple-design/ui'
```

## Usage notes



Only resolves icons registered in the current application. Repeated name changes display the latest requested icon, and unmounting stops pending switches.

Icons inherit the host font size on both platforms. For a fixed 20px icon, set size="20" or icon-size explicitly. The size prop overrides the variable; color inherits from the host by default.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-icon-size` | `inherit` | `font-size` |
| `--mp-icon-spin-duration` | `1s` | `animation` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-icon-size: inherit;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Motion

Built-in motion follows prefers-reduced-motion: reduce: content and state feedback remain, while decorative spinning, shimmer and ripples stop. Icon name changes display the latest value immediately and cancel unfinished phases, keeping CSS and JS durations aligned. Callers must adapt custom animation classes. Ripple duration/cleanup follows Ripple documentation; its historical 250ms rule is not an Icon duration limit.
