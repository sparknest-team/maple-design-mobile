# Ripple Directive

### Intro

When the element is clicked, a water wave spreading effect is generated.

## Basic examples

### Basic Usage

Supports touch, primary mouse clicks and host Enter / Space. Mouse ripples expand from the press location and end on release or window blur. Nonprimary buttons and compatibility mouse events after touch are ignored. Keyboard ripples expand from the center; use native buttons for interactive hosts.

```demo
../example/demos/basic-usage.vue
```

## Appearance and states

### Custom Color

```demo
../example/demos/custom-color.vue
```

### Disabled Status

```demo
../example/demos/disabled-status.vue
```

## Content and presentation

### Longer motion tokens

```demo
../example/demos/motion-token.vue
```

### Styles

MapleResolver directive resolution automatically imports `@maple-design/ui/ripple/style`. When registering Ripple without the resolver, explicitly import that style in the application entry. Runtime code does not import CSS, so the package can be imported on the server. Unmounting or disabling cancels pending animations; keyboard state belongs to each instance.

## Usage notes

### Motion

Repeated release does not duplicate work. Disabling/unmounting cleans owned timers/direct child ripples without removing nested instances. Document listeners bind to the mount-time ownerDocument; rebinding after cross-document movement is out of scope. Enter/Space activate on this host and end only on matching keyup/blur. Plain divs must provide their own interactive semantics, keyboard behavior and accessible names; v-ripple supplies none.

## API

### Ripple Options

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `color` | `currentColor` | _string_ | `currentColor` |
| `disabled` | Whether to disable ripple decoration | _boolean_ | `false` |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-ripple-color` | `currentColor` | `background-color` |
| `--mp-ripple-cubic-bezier` | `cubic-bezier(0.68, 0.01, 0.62, 0.6)` | `transition` |
| `--mp-ripple-expand-duration` | `200ms` | `transition` |
| `--mp-ripple-fade-duration` | `140ms` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-ripple-color: currentColor;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Motion

expand-duration controls transform expansion; cubic-bezier controls its easing. fade-duration controls linear opacity appearance/disappearance. Put variables on the actual directive host so generated ripples inherit them. color overrides ripple-color. Both platforms default to 200ms/140ms.

250ms is the minimum display/post-fade cleanup wait, not visual duration or the complete lifecycle. Runtime reads computed ripple duration/delay. Fade starts no earlier than the later of creation+250ms or activation+expansion duration; deletion waits max(250ms, fade duration). 600ms/800ms overrides are not truncated. 0ms/unstyled cases retain cleanup floors. prefers-reduced-motion: reduce hides decorative ripples without changing host events. Expansion is sampled at creation/activation; fade at fade start. Arbitrary midphase CSS changes/custom animations are not guaranteed.

The binding type `RippleDirectiveValue` is exported from the package root and Ripple entry, with optional `color` and `disabled` fields. Color changes affect subsequently created waves. `disabled` controls decoration only; it does not disable the host. Global `Context.enableRipple` prevents new waves while existing waves finish normally. During animation the directive temporarily sets clipping and, when needed, positioning and stacking styles. When the final wave ends, or on disable or unmount, it restores styles it still owns and preserves values changed by application code. Coordinates account for axis-aligned scaling; rotation and skew are not guaranteed.
