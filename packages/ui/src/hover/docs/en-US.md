# Hover

### Intro

Style binding is performed when the pointer hovers the binding element, and the current hovering state can also be obtained through a function, which supports selective enablement on desktop or mobile.

## Basic examples

### Style Binding

The style binding is performed when the pointer hovers over the bound element, and the style binding is canceled when the pointer leaves the element.

```demo
../example/demos/style-binding.vue
```

## Interaction and control

### Function Binding

The function is triggered when the pointer hovers and leaves, and carries the current hover state.

```demo
../example/demos/function-binding.vue
```

### Selectively Enable For Different Devices

Considering the differences in `hover` effects on different platforms, the hover command can only be enabled on specific platforms.

#### Only Enabled On Desktop

```html
// playground-ignore
<mp-paper v-hover:desktop="{ color: '#fff' }">HOVER</mp-paper>
```

#### Only Enabled On Mobile

```html
// playground-ignore
<mp-paper v-hover:mobile="{ color: '#fff' }"">HOVER</mp-paper>
```

## HoverOverlay and helper

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hovering` | boolean | false | Hover decoration state |
| `focusing` | boolean | false | Focus decoration state |

`useHoverOverlay()` returns `hovering` and `handleHovering(boolean)` for use with directive callbacks. The overlay has no declared events, slots or business instance methods and does not capture interaction; its host needs a positioning context.

## Usage notes

### Motion

Object styles override only the supplied properties. Leaving or disabling restores their original inline values and `!important` priorities; changing the desktop/mobile argument removes old listeners.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-hover-overlay-focusing-opacity` | `0.12` | `opacity` |
| `--mp-hover-overlay-opacity` | `0.04` | `opacity` |
| `--mp-hover-transition-duration` | `var(--mp-sys-motion-duration-fast)` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-hover-overlay-focusing-opacity: 0.12;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Motion

HoverOverlay opacity transitions respect `prefers-reduced-motion: reduce` and are disabled when reduced motion is requested.
