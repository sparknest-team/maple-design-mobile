# Space

### Intro

The component library provides a layout component,
`<mp-space>`,
so that you can do flex layout more efficiently.

## Basic examples

### Basic Use

```demo
../example/demos/en-US/base-use.vue
```

## Appearance and states

### Space Size

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `wrap` | Whether to exceed the line break | Space Size, xs / sm / md / lg / xl |
| `size` | Gap: `xs`/`sm`/`md`/`lg`/`xl` or [rowGap, columnGap], supporting CSS lengths | Space Size, xs / sm / md / lg / xl |
<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/space.vue
```

### xs / sm / md / lg / xl

```demo
../example/demos/en-US/demo-8.vue
```

## Layout and arrangement

### Vertical

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | Gap: `xs`/`sm`/`md`/`lg`/`xl` or [rowGap, columnGap], supporting CSS lengths | Vertical, Main-axis alignment comparison, Explicit Wrapping |
| `justify` | Main axis arrangement, Can be set to `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly` | Main-axis alignment comparison, Space Around, Layout and alignment |
| `direction` | Row/column order of children, default row; column stacks them vertically. Does not use horizontal/vertical values | Vertical, Layout and alignment |
| `wrap` | Whether to exceed the line break | Explicit Wrapping, Layout and alignment |
| `align` | Cross-axis alignment: `stretch`/`center`/`flex-start`/`flex-end`/`baseline`. Omitted values follow `direction`: `row` → `center`, `column` → `stretch` | Layout and alignment |
<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/vertical.vue
```

### Main-axis alignment comparison

Compare end, center and space-between alignment while observing how remaining space is allocated.

```demo
../example/demos/en-US/alignment-comparison.vue
```

### Explicit Wrapping

```demo
../example/demos/en-US/wrap.vue
```

### Space Around

```demo
../example/demos/en-US/around.vue
```

### Layout and alignment

Use this example for space. Adjust direction, cross-axis alignment, main-axis distribution and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/layout-lab.vue
```

## Interaction and control

### Interactive layout

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `wrap` | Whether to exceed the line break | Interactive layout |
| `size` | Gap: `xs`/`sm`/`md`/`lg`/`xl` or [rowGap, columnGap], supporting CSS lengths | Interactive layout |
| `direction` | Row/column order of children, default row; column stacks them vertically. Does not use horizontal/vertical values | Interactive layout |
<!-- demo-config-notes:end -->


Toggle direction, column gap and wrapping, or add/remove items. Row gap stays 8px; column gap switches between 8px and 24px. Direction does not swap these geometric axes. The narrow preview scrolls horizontally without wrapping.

```demo
../example/demos/interactive-layout.vue
```

## Separators and wrapping

### Split wrapping and content state

Change wrapping, direction and order after typing a draft. A separator stays with its preceding item and may appear at a line end.

```demo
../example/demos/split-wrapping.vue
```

## Reading direction

Inherits the nearest native `dir`. `direction="row"` follows reading order; `column` remains top to bottom. justify/align flex-start and flex-end follow their respective flex axes. `size=[rowGap,columnGap]` always describes row and `column` gaps without swapping in RTL. Wrapping and split slots follow content order. Direction changes do not reverse data or recreate children with stable keys.

## API

### Children and size boundaries

Reordering keyed Fragment groups preserves local child identity. Whitespace, empty text, comments and empty Fragments do not generate spacing items. Meaningful text, numeric zero and empty elements are retained. Empty split content does not produce separators.

With wrap and split, a separator follows the previous item and may appear at a line end; hiding separators at every line boundary is not guaranteed. An item wider than its available line may still overflow. Without wrap, existing Flex gap and justify allocation remain. Layout switches do not recreate content nodes.

block switches the container between flex and inline-flex. align=stretch stretches the internal item wrapper without guaranteeing that its control fills it. Use the child control's block or width:100% when needed.

Invalid size shapes, negative/nonfinite numbers and arrays other than pairs fall back to md with development diagnostics. Array entries are lengths and do not accept preset names. CSS var/calc expressions remain supported; the browser handles syntax and resolved lengths.


### Space Props

| Prop | Description | Type | Default |
| ------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------ |
| `direction` | Row/column order of children, default row; column stacks them vertically. Does not use horizontal/vertical values | _string_ | `row` |
| `justify` | Main axis arrangement, Can be set to `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly` | _string_ | `flex-start` |
| `align` | Cross-axis alignment: `stretch`/`center`/`flex-start`/`flex-end`/`baseline`. Omitted values follow `direction`: `row` → `center`, `column` → `stretch` | _string_ | `-` |
| `size` | Gap: `xs`/`sm`/`md`/`lg`/`xl` or [rowGap, columnGap], supporting CSS lengths | _string \| number \| [string \| number, string \| number]_ | `md` |
| `wrap` | Whether to exceed the line break | _boolean_ | `false` |
| `block` | Use flex instead of inline-flex | _boolean_ | `true` |

### Space Slots

| Slot | Description | Prop |
| ----------- | ---------- | ----- |
| `default` | Content of space | `-` |
| `split` | Range separator | `-` |

## Types

```ts
import type { SpaceProps, SpaceSize, SpaceDirection, SpaceAlign, SpaceJustify, SpaceInternalSize, SpaceInstance } from '@maple-design/ui'
```

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-space-size-lg-column-gap` | `var(--mp-sys-space-5)` | Component styling |
| `--mp-space-size-lg-row-gap` | `var(--mp-sys-space-6)` | Component styling |
| `--mp-space-size-md-column-gap` | `var(--mp-sys-space-4)` | Component styling |
| `--mp-space-size-md-row-gap` | `var(--mp-sys-space-5)` | Component styling |
| `--mp-space-size-sm-column-gap` | `var(--mp-sys-space-3)` | Component styling |
| `--mp-space-size-sm-row-gap` | `var(--mp-sys-space-4)` | Component styling |
| `--mp-space-size-xl-column-gap` | `var(--mp-sys-space-6)` | Component styling |
| `--mp-space-size-xl-row-gap` | `var(--mp-sys-space-8)` | Component styling |
| `--mp-space-size-xs-column-gap` | `var(--mp-sys-space-2)` | Component styling |
| `--mp-space-size-xs-row-gap` | `var(--mp-sys-space-2)` | Component styling |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-space-size-lg-column-gap: var(--mp-sys-space-5);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
