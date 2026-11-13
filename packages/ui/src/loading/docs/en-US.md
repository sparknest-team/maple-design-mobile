# Loading

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

### Intro

Loading component for performing animations when data is loaded.

## Appearance and states

### Loading shape, size and color

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | Can be set to `xs` `sm` `md` `lg` `xl`, or a number | Loading shape, size and color |
| `type` | Can be set to `circle` `wave` `cube` `rect` `disappear` | Loading shape, size and color |
| `color` | Loading color | Loading shape, size and color |
<!-- demo-config-notes:end -->


Compare the shape, size and color of loading indicators. Container masks and directives remain separate.

```demo
../example/demos/appearance-comparison.vue
```

## Layout and arrangement

### Wrap

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `tip` | Tip of the loading | Wrap |
| `loading` | Specify whether loading is active | Wrap |
<!-- demo-config-notes:end -->


```demo
../example/demos/wrap.vue
```

## Content and presentation

### Loading Directive

The two directive examples keep independent loading states. Their controls and host cards are stacked using Space's `direction="column"`; turning one off leaves the other overlay unchanged.


`v-mp-loading` accepts a boolean shorthand or a `{ loading, tip, type, size, radius, color, hideIcon, fullscreen, background }` options object. In object form, `loading` controls the loading state and the remaining component options match `Loading` props.

#### Registration

`v-mp-loading` renders its indicator with Maple's built-in `Loading` component. The `mp-` prefix avoids collisions with directives from other component libraries. Register it using any one of these approaches.


With `MapleResolver()`, `unplugin-vue-components` resolves `v-mp-loading` automatically. Set `directives: false` to disable directive resolution.

> Wrapper mode applies `opacity: 0.38` to its default-slot content. Because the directive preserves the host DOM, it inserts the built-in Loading VNode and uses an equivalent translucent background overlay instead.

```demo
../example/demos/directive.vue
```

## Usage notes

### Icons and status messages

A numeric `size` sets the custom indicator container's font size in pixels. Named sizes control built-in animations. Custom icons inherit the `--mp-loading-indicator-size` font size (20px by default): `1em` children scale with it, while SVGs with fixed pixel dimensions keep their own size. Use the `icon` slot for graphics and `tip` or its slot for status text.

Standalone Loading has `role="status"`, `aria-live="polite"` and `aria-atomic="true"`. Without a tip it includes localized visually hidden status text, even when the icon is hidden. Wrapper mode retains `aria-busy`. The directive sets `aria-busy="true"` on the original host and restores its previous value on cleanup, preserving a later external change.

Assistive technology may defer announcements within a busy region. For business start, completion or failure messages, maintain a persistent status region outside the busy region and update its text. The overlay does not disable keyboard interaction. See [WAI-ARIA `aria-busy`](https://www.w3.org/TR/wai-aria-1.2/#aria-busy) and [ARIA22 status messages](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22).
### Configuration

The loading-directive mask prevents default click behavior and propagation. Clicking it does not activate Card or ordinary parent click handlers. Normal clicking resumes after loading. It does not disable keyboard access to underlying controls; set those controls’ `disabled` props to block all interaction.

### Overlay styles

Content-overlay class: `.mp-loading__content-overlay`.

Each directive update replaces the complete configuration; omitted options and boolean `true` use defaults. Changing `fullscreen` while loading moves the overlay between the host and its owner document body. Host children stay in place. Multiple `fullscreen` instances share a counted scroll lock: closing a local instance does not unlock `fullscreen` instances, and the final `fullscreen` instance preserves an existing external lock class.

## API

### Loading Props

| Prop | Description | Type | Default |
| --------- | ------------------------------------------------------------------ | ------------------ | -------- |
| `color` | Loading color | _string_ | `-` |
| `type` | Can be set to `circle` `wave` `cube` `rect` `disappear` | _string_ | `circle` |
| `size` | Can be set to `xs` `sm` `md` `lg` `xl`, or a number | _string \| number_ | `md` |
| `tip` | Tip of the loading | _string_ | `-` |
| `loading` | Specify whether loading is active | _boolean_ | `false` |
| `radius` | Set radius size when the `type` is `circle` | _string \| number_ | `-` |
| `hide-icon` | Whether to hide the loading indicator | _boolean_ | `false` |

### Loading Slots

| Slot | Description | Prop |
| --------- | ---------------------- | ---- |
| `default` | Content wrapped in `loading` | `-` |
| `tip` | Tip of the `loading` | `-` |
| `icon` | Custom loading indicator | `-` |

The `icon` slot replaces every built-in `type` animation instead of rendering alongside it. `hide-icon=true` hides all indicators while allowing tip content to remain visible.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-loading-color` | `var(--mp-sys-color-action-primary)` | `background-color`, `color` |
| `--mp-loading-desc-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-loading-desc-margin` | `8px 0 0` | `margin` |
| `--mp-loading-directive-z-index` | `2000` | `z-index` |
| `--mp-loading-indicator-size` | `20px` | `font-size` |
| `--mp-loading-opacity` | `0.38` | `opacity` |
| `--mp-loading-overlay-background` | `color-mix(in srgb, var(--mp-color-bg-white) 62%, transparent)` | `background` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-loading-color: var(--mp-sys-color-action-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Overlay styles

| Variable | Description |
| --- | --- |
| `--mp-loading-overlay-background` | Directive overlay background; the background option overrides this value. |
