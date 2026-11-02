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

### Standalone styles and usage boundaries

The resolver includes lightweight icon motion styles unless `importStyle: false`. The UI Icon style entry includes them too. For manually imported standalone SVG components using `spin`, import this once:

```ts
import '@maple-design/icons-vue/style.css'
```

`rotate` composes with `spin`; built-in motion respects reduced motion. `transition` accepts milliseconds as a number or numeric string (`200` / `"200"`), not CSS duration strings. Default slot content suppresses name transitions; removing the slot reveals the latest name immediately. Custom animation classes must avoid overriding the spinning transform and handle reduced motion themselves.

`name` resolves icons explicitly registered in the current app before rendering. It does not fetch resources or react to later registrations. A container title is not forwarded into SVG: set `title` on the standalone icon. Use a Button with an accessible name for actions. `click` is a notification with Vue `.once` semantics; returned promises do not drive loading. Stroke properties only affect stroked graphics.


### Props

| Arguments | Description | Type | Default |
| ----------------- | ---------------------------- | ------------------ | ------- |
| `name` | icon name | _string_ | `-` |
| `size` | `inherit` | _string \| number_ | `-` |
| `color` | Icon color | _string_ | `-` |
| `rotate` | Rotation angle | _number_ | `-` |
| `spin` | Whether to rotate continuously | _boolean_ | `false` |
| `animation-class` | Name of the transition animation class | _string_ | `-` |
| `transition` | Transition animation time(ms) | _string \| number_ | `0` |

### Standalone SVG icon props

| Arguments | Description | Type | Default |
| ----------------- | ---------- | -------------------------------------------- | --------- |
| `size` | `inherit` | _string \| number_ | `-` |
| `color` | Icon color | _string_ | `-` |
| `rotate` | Rotation angle | _number_ | `-` |
| `spin` | Whether to rotate | _boolean_ | `false` |
| `title` | Accessible title | _string_ | `-` |
| `stroke-width` | Stroke width | _number_ | `4` |
| `stroke-linecap` | Stroke line cap | _'butt' \| 'round' \| 'square'_ | `'butt'` |
| `stroke-linejoin` | Stroke line join | _'bevel' \| 'inherit' \| 'miter' \| 'round'_ | `'miter'` |

### Events

| Event | Description | Arguments |
| ------- | -------------- | -------------- |
| `click` | Triggered when you click on the icon | `event: MouseEvent` |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Custom content; takes precedence over name |

### Types

```ts
import type { IconProps, IconInstance } from '@maple-design/ui'
```

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| ------------- | ------ |
| `--mp-icon-size` | `inherit` |

## Shared implementation and platform boundaries

Each platform maintains a complete local implementation. They do not import a common core or share component instances or reactive state. Changes must update both implementations. Component bodies, props, key styles and paired tests have read-only source consistency checks; theme tokens and installation entries remain local to each library.

Only icons registered in the current application are resolved. Repeated name changes cancel stale timers; no changes run after unmount. Each library locally adapts its registration prefix and legacy spin class; icon resources are not imported across libraries.

Icons inherit the host font size on both platforms. For a fixed 20px icon, set size="20" or icon-size explicitly. The size prop overrides the variable; color inherits from the host by default.

### Motion variables

| Token | Default |
| ------------------------- | ------- |
| `--mp-icon-spin-duration` | `1s` |

Built-in motion follows prefers-reduced-motion: reduce: content and state feedback remain, while decorative spinning, shimmer and ripples stop. Icon name changes display the latest value immediately and cancel unfinished phases, keeping CSS and JS durations aligned. Callers must adapt custom animation classes. Ripple duration/cleanup follows Ripple documentation; its historical 250ms rule is not an Icon duration limit.
