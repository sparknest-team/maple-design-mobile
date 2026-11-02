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

### Split wrapping and content state

Change wrapping, direction and order after typing a draft. A separator stays with its preceding item and may appear at a line end.

```demo
../example/demos/split-wrapping.vue
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

## Reading direction

Inherits the nearest `dir="ltr|rtl"`. Row layout follows reading order; column layout stays top to bottom. Flex-start/flex-end follows the corresponding flex axis. The size pair always means [rowGap,columnGap], including in RTL. Wrapping and split slots preserve content order. Direction changes do not reverse data or recreate children with stable keys.

## API

### Children and size boundaries

Keyed Fragment groups preserve their local child identity when reordered. Pure whitespace, empty text, comments and empty Fragments do not create spacing items; visible text, zero and empty elements remain. Empty split content also produces no separator item.

With wrap and split, separators stay with their preceding item. This permits trailing separators at line ends; it does not suppress separators at every line boundary. Items wider than the available line may still overflow. Without wrap, the existing Flex gap and justify allocation are unchanged. Layout switches preserve content nodes.

block switches the container between flex and inline-flex. align=stretch stretches item wrappers, not every control inside them: use the child control's block option or width:100% when required.

Invalid size shapes, negative/nonfinite numbers or tuples without exactly two lengths fall back to md and receive development diagnostics. Tuple entries are lengths, not presets. CSS var/calc expressions remain supported; CSS grammar and resolved values belong to the browser.


### Props

| Arguments | Description | Type | Default |
| ------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------ |
| `direction` | Row/column order of children, default row; column stacks them vertically. Does not use horizontal/vertical values | _string_ | `row` |
| `justify` | Main axis arrangement, Can be set to `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly` | _string_ | `flex-start` |
| `align` | Cross-axis alignment: `stretch`/`center`/`flex-start`/`flex-end`/`baseline`. Omitted values follow `direction`: `row` → `center`, `column` → `stretch` | _string_ | `-` |
| `size` | Gap: `xs`/`sm`/`md`/`lg`/`xl` or [rowGap, columnGap], supporting CSS lengths | _string \| number \| [string \| number, string \| number]_ | `md` |
| `wrap` | Whether to exceed the line break | _boolean_ | `false` |
| `block` | Use flex instead of inline-flex | _boolean_ | `true` |

### Slots

| Slot | Description | Arguments |
| ----------- | ---------- | ----- |
| `default` | Content of space | `-` |
| `split` | Range separator | `-` |

### Type definitions

```ts
import type { SpaceProps, SpaceSize, SpaceDirection, SpaceAlign, SpaceJustify, SpaceInternalSize, SpaceInstance } from '@maple-design/ui'
```

### Style variables

| Variable | Default |
| --- | --- |
| `--mp-space-size-xs-row-gap` | `var(--mp-sys-space-2)` |
| `--mp-space-size-xs-column-gap` | `var(--mp-sys-space-2)` |
| `--mp-space-size-sm-row-gap` | `var(--mp-sys-space-4)` |
| `--mp-space-size-sm-column-gap` | `var(--mp-sys-space-3)` |
| `--mp-space-size-md-row-gap` | `var(--mp-sys-space-5)` |
| `--mp-space-size-md-column-gap` | `var(--mp-sys-space-4)` |
| `--mp-space-size-lg-row-gap` | `var(--mp-sys-space-6)` |
| `--mp-space-size-lg-column-gap` | `var(--mp-sys-space-5)` |
| `--mp-space-size-xl-row-gap` | `var(--mp-sys-space-8)` |
| `--mp-space-size-xl-column-gap` | `var(--mp-sys-space-6)` |
