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

## API

### Props

| Arguments | Description | Type | Default |
| --------- | ------------------------------------------------------------------ | ------------------ | -------- |
| `color` | Loading color | _string_ | `-` |
| `type` | Can be set to `circle` `wave` `cube` `rect` `disappear` | _string_ | `circle` |
| `size` | Can be set to `xs` `sm` `md` `lg` `xl`, or a number | _string \| number_ | `md` |
| `tip` | Tip of the loading | _string_ | `-` |
| `loading` | Specify whether loading is active | _boolean_ | `false` |
| `radius` | Set radius size when the `type` is `circle` | _string \| number_ | `-` |
| `hide-icon` | Whether to hide the loading indicator | _boolean_ | `false` |

### Slots

| Slot | Description | Arguments |
| --------- | ---------------------- | ---- |
| `default` | Content wrapped in `loading` | `-` |
| `tip` | Tip of the `loading` | `-` |
| `icon` | Custom loading indicator | `-` |

The `icon` slot replaces every built-in `type` animation instead of rendering alongside it. `hide-icon=true` hides all indicators while allowing tip content to remain visible.

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| ----------------------- | ---------------------- |
| `--loading-color` | `var(--color-primary)` |
| `--loading-opacity` | `0.38` |
| `--loading-desc-margin` | `8px 0 0` |
| `--loading-desc-color` | `var(--color-primary)` |

The loading-directive mask prevents default click behavior and propagation. Clicking it does not activate Card or ordinary parent click handlers. Normal clicking resumes after loading. It does not disable keyboard access to underlying controls; set those controls’ `disabled` props to block all interaction.

### Overlay styles

| Variable | Description |
| --- | --- |
| `--mp-loading-overlay-background` | Directive overlay background; the background option overrides this value. |

Content-overlay class: `.mp-loading__content-overlay`.

Each directive update replaces the complete configuration; omitted options and boolean `true` use defaults. Changing `fullscreen` while loading moves the overlay between the host and its owner document body. Host children stay in place. Multiple fullscreen instances share a counted scroll lock: closing a local instance does not unlock fullscreen instances, and the final fullscreen instance preserves an existing external lock class.
