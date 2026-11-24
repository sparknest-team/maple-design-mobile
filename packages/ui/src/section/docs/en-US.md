# Section

Group a heading, description, actions and content in a page, drawer or card. Outside forms, the parent layout controls section spacing. Inside Form, Section spans all grid columns, adjusts field spacing, and wraps fields horizontally in inline layout.

## Basic examples

### Plain section

```demo
../example/demos/en-US/plain.vue
```

### Section with a line

`heading-line` is the default variant.

```demo
../example/demos/en-US/line.vue
```

### Outlined section with a custom heading

Use the title and description slots for the section header. `show-marker` adds an accent before the heading, and `heading-level` sets its HTML level.

```demo
../example/demos/en-US/outline.vue
```

### Section sizes

Choose a size and heading level to preview the title. Each heading column shows its default font size. The dashed border marks the content area.

| Size | h1 | h2 | h3 | h4 | h5 | h6 | Card padding | Gap below header |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `xs` | 24px | 20px | 18px | 16px | 14px | 12px | 8px | 8px |
| `sm` | 24px | 20px | 18px | 16px | 14px | 12px | 12px | 12px |
| `md` | 26px | 22px | 20px | 18px | 16px | 14px | 16px | 20px |
| `lg` | 30px | 26px | 24px | 22px | 20px | 18px | 20px | 24px |
| `xl` | 34px | 30px | 28px | 26px | 24px | 22px | 24px | 28px |

```demo
../example/demos/en-US/sizes.vue
```

### With or without a heading

Switch between plain, heading-line, tonal and outline, then toggle the heading and description independently. The example starts with just the body. Enable the marker to mark the entire section. When the heading is visible, you can choose either placement. With both the heading and description off, Section omits the header, including the line in the heading-line variant.

```demo
../example/demos/en-US/heading-options.vue
```

### Grouping inline form fields

Inside Form, Section defaults to heading-line with a heading marker. The fields follow the inline layout and wrap when space is limited. Use Divider between sections when needed.

```demo
../example/demos/en-US/inline-form.vue
```

## API

### Section Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| id | Section anchor | string | Automatically generated |
| title | Heading text | string | Empty |
| description | Supporting text below the heading | string | Empty |
| size | Visual size (xs / sm / md / lg / xl) | SectionSize | md |
| variant | Appearance, plain, heading-line, tonal or outline | 'plain' \| 'heading-line' \| 'tonal' \| 'outline' | heading-line |
| status | Status colors the marker, tonal fill and outline (default / info / success / warning / danger) | SectionStatus | — |
| heading-level | HTML heading level from 1 to 6 | 1–6 | `4` |
| show-marker | Show the marker | boolean | Enabled inside Form |
| marker-placement | Marker placement (`title` or `section`) | string | `title` |

### Section Slots

Use the default slot for content and extra for actions. The title and description slots override their respective text props.

| Slot | Description |
| --- | --- |
| default | Body |
| title | Custom title |
| description | Supporting description |
| extra | Header actions |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-section-accent-color` | `var(--mp-sys-color-action-primary)` | `background`, `background-color`, `border` |
| `--mp-section-after-gap` | `24px` | `margin-block`, `padding-block-start` |
| `--mp-section-before-gap` | `32px` | `padding-block-start` |
| `--mp-section-card-background` | `var(--mp-sys-color-surface-default)` | `background-color` |
| `--mp-section-card-padding` | `16px` | `padding` |
| `--mp-section-card-radius` | `6px` | `border-radius` |
| `--mp-section-content-size` | `14px` | `font-size` |
| `--mp-section-description-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-section-description-gap` | `4px` | `margin-block-start` |
| `--mp-section-description-line-height` | `20px` | `line-height` |
| `--mp-section-description-size` | `13px` | `font-size` |
| `--mp-section-divider-color` | `var(--mp-sys-color-border-default)` | `border-block-start` |
| `--mp-section-divider-width` | `1px` | `border`, `border-block-start` |
| `--mp-section-header-gap` | `20px` | `margin-block-end` |
| `--mp-section-heading-gap` | `16px` | `margin-inline-start` |
| `--mp-section-heading-size-step` | `1px` | `font-size`, `line-height` |
| `--mp-section-marker-gap` | `12px` | `padding-inline-end`, `padding-inline-start`, `row-gap` |
| `--mp-section-marker-height` | `16px` | `height` |
| `--mp-section-marker-radius` | `2px` | `border-radius` |
| `--mp-section-marker-width` | `3px` | `padding-inline-start`, `width` |
| `--mp-section-outline-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-section-size-lg-card-padding` | `20px` | `padding` |
| `--mp-section-size-lg-header-gap` | `24px` | `margin-block-end` |
| `--mp-section-size-lg-marker-height` | `20px` | `height` |
| `--mp-section-size-lg-title-line-height` | `28px` | `line-height` |
| `--mp-section-size-lg-title-size` | `20px` | `font-size` |
| `--mp-section-size-sm-card-padding` | `12px` | `padding` |
| `--mp-section-size-sm-header-gap` | `12px` | `margin-block-end` |
| `--mp-section-size-sm-marker-height` | `14px` | `height` |
| `--mp-section-size-sm-title-line-height` | `20px` | `line-height` |
| `--mp-section-size-sm-title-size` | `14px` | `font-size` |
| `--mp-section-size-xl-card-padding` | `24px` | `padding` |
| `--mp-section-size-xl-header-gap` | `28px` | `margin-block-end` |
| `--mp-section-size-xl-marker-height` | `24px` | `height` |
| `--mp-section-size-xl-title-line-height` | `32px` | `line-height` |
| `--mp-section-size-xl-title-size` | `24px` | `font-size` |
| `--mp-section-size-xs-card-padding` | `8px` | `padding` |
| `--mp-section-size-xs-header-gap` | `8px` | `margin-block-end` |
| `--mp-section-size-xs-marker-height` | `12px` | `height` |
| `--mp-section-size-xs-title-line-height` | `18px` | `line-height` |
| `--mp-section-size-xs-title-size` | `14px` | `font-size` |
| `--mp-section-title-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-section-title-line-height` | `24px` | `line-height` |
| `--mp-section-title-size` | `16px` | `font-size` |
| `--mp-section-title-weight` | `600` | `font-weight` |
| `--mp-section-tonal-background` | `var(--mp-sys-color-surface-muted)` | `background-color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-section-accent-color: var(--mp-sys-color-action-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
