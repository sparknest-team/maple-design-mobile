
# Timeline

Start with the basic example, then compare related settings before moving to controlled, asynchronous or combined use cases.

## Basic examples

### Basic usage

- `reverse`: Whether reverse order

<demo src="../example/demos/basic.vue"></demo>

## Appearance and states

### Type

Preview configuration: `label="2017-03-10"`, `lineType="dashed"`, `type="secondary"`, `label="2018-05-12"`.

<demo src="../example/demos/type.vue"></demo>

## Layout and arrangement

### Timeline direction and labels

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `mode` | The display mode of Timeline | Timeline direction and labels |
| `label-position` | Position of label text | Timeline direction and labels |
| `orientation` | Horizontal/vertical axis of the timeline line, default vertical; constrains valid item sides | Timeline direction and labels |
| `pending` | Append a pending item; true has no text, and a string is displayed as its content. | Timeline direction and labels |
<!-- demo-config-notes:end -->


Compare orientation, sequence and label placement independently of pending states and custom nodes.

<demo src="../example/demos/layout-comparison.vue"></demo>

## Content and presentation

### Pending

Preview configuration: `align="center"`, `orientation="horizontal"`, `:checked="!!pendingProps.reverse"`, `:checked="!!pendingProps.pending"`.


<demo src="../example/demos/pending.vue"></demo>

### Mode

- `mode`: The display mode of Timeline

<demo src="../example/demos/mode.vue"></demo>

## Customization and slots

### Icon

Preview configuration: `label="2017-03-10"`, `dotColor="#00B42A"`, `label="2018-05-22"`, `label="2020-06-22"`.

<demo src="../example/demos/icon.vue"></demo>

### Dot

Preview configuration: `label="2020-04-12"`, `dotColor="#00B42A"`, `label="2020-05-17"`, `label="2020-06-22"`.

<demo src="../example/demos/dot.vue"></demo>

### Custom

<demo src="../example/demos/custom.vue"></demo>

## API

### Timeline Props

| Parameter | Description | Type | Default |
| -------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------- | :----------: |
| reverse | Whether reverse order | `boolean` | `false` |
| orientation | Horizontal/vertical axis of the timeline line, default vertical; constrains valid item sides | `'horizontal' \| 'vertical'` | `'vertical'` |
| mode | The display mode of Timeline | `'left' \| 'right' \| 'top' \| 'bottom' \| 'alternate'` | `'left'` |
| pending | Append a pending item; true has no text, and a string is displayed as its content. | `boolean\|string` | `-` |
| label-position | Position of label text | `'relative' \| 'same'` | `'same'` |

### Timeline Slots

| Slot | Description | Prop |
| ------ | :------: | ---- |
| default | Timeline items | - |
| dot | Pending item icon | - |
| pending | Pending item content; adding this slot appends an item and takes precedence over the pending prop text | - |

### TimelineItem Props

| Parameter | Description | Type | Default |
| ---------- | ---------------------------- | --------------------------------- | :-------: |
| dot-color | Node color | `string` | `-` |
| dot-type | Node type: outlined/filled circle | `'hollow' \| 'solid'` | `'solid'` |
| line-type | Timeline line style: solid/dashed/dotted | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |
| line-color | Timeline color | `string` | `-` |
| label | Label text | `string` | `-` |
| content-placement | Current per-item side relative to the timeline in alternate mode: left/right for vertical and top/bottom for horizontal. Constrained by mode and orientation | `TimelineItemContentPlacement`<br>`'left' \| 'right' \| 'bottom' \| 'top'` | `-` |

Use `content-placement` for the physical side of the content: top/bottom in horizontal layouts and left/right in vertical layouts. `mode` controls the arrangement.

### TimelineItem Slots

| Slot | Description | Prop | Version |
| ------ | :--------: | ---- | :----- |
| default | Item content | - |  |
| dot | Custom node | - |  |
| label | Custom label | - | 2.50.0 |

## Types

The component exports the following types

```ts
import type { TimelineProps, TimelineItemProps, TimelineSlots, TimelineItemSlots, TimelineMode, TimelineLabelPosition, TimelineDotType, TimelineLineType, TimelineItemContentPlacement, TimelineInstance, TimelineItemInstance } from '@maple-design/ui-vue'
```

## Reading direction and keyboard interaction

Timeline inherits its container's reading direction. Horizontal nodes and connectors follow LTR/RTL. `reverse` independently controls visual reversal; direction changes do not mutate node data or automatically change `reverse`.

Explicit vertical `mode="left"` / `mode="right"` and item physical sides retain their meaning; `alternate` continues alternating. Labels and custom content inherit text direction normally.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-timeline-alternate-horizontal-min-height` | `200px` | `min-height` |
| `--mp-timeline-content-text-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-timeline-dot-bg` | `rgb(var(--mp-primary-6))` | `background-color`, `border`, `color` |
| `--mp-timeline-dot-bg-hollow` | `var(--mp-color-bg-2)` | `background-color` |
| `--mp-timeline-dot-border-radius` | `50%` | `border-radius` |
| `--mp-timeline-dot-border-width-hollow` | `2px` | `border` |
| `--mp-timeline-dot-size-width` | `6px` | `bottom`, `height`, `inset-inline-start`, `left`, `margin-left`, `margin-top`, `padding-bottom`, `padding-left`, `padding-right`, `padding-top`, `top`, `width` |
| `--mp-timeline-font-content-size` | `var(--mp-font-size-md)` | `bottom`, `font-size`, `height`, `line-height`, `top` |
| `--mp-timeline-font-label-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-timeline-horizontal-dot-content-height` | `6px` | `height`, `line-height` |
| `--mp-timeline-horizontal-margin-content-spacing` | `16px` | `margin-bottom`, `margin-top`, `padding-bottom`, `padding-top` |
| `--mp-timeline-horizontal-margin-line-left` | `6px` | `inset-inline-start` |
| `--mp-timeline-horizontal-margin-line-right` | `4px` | `inset-inline-end` |
| `--mp-timeline-item-min-height` | `78px` | `min-height` |
| `--mp-timeline-label-relative-horizontal-margin` | `52px` | `margin-bottom`, `margin-top` |
| `--mp-timeline-label-relative-margin` | `100px` | `margin-left`, `margin-right` |
| `--mp-timeline-label-relative-max-width` | `100px` | `max-width` |
| `--mp-timeline-label-text-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-timeline-line-bg` | `var(--mp-sys-color-border-default)` | `border-color` |
| `--mp-timeline-size-line-width` | `1px` | `border-left-width`, `border-top-width`, `height`, `width` |
| `--mp-timeline-vertical-margin-content-bottom` | `4px` | `margin-bottom` |
| `--mp-timeline-vertical-margin-content-left` | `16px` | `margin-left`, `margin-right`, `padding-left`, `padding-right` |
| `--mp-timeline-vertical-margin-line-bottom` | `4px` | `bottom` |
| `--mp-timeline-vertical-margin-line-top` | `4px` | `top` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-timeline-content-text-color: var(--mp-color-text-1);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
