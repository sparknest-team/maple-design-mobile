# PageHeader

The back button only emits `back`; it does not navigate or call browser history. The demos show a Message notification. Handle the destination in your application. The native button supports click, Enter and Space.

Displays the current page title, context and related actions. Use application-level `class` / `style` for fixed positioning, safe areas and visual backgrounds.

## Basic examples

### Basic usage

Compose the heading and actions with Card and Space. Tap Back, Follow or Create task to show a message. Use `show-back` to display a back arrow to the left of the title and place the primary action at the bottom.

```demo
../example/demos/basic-usage.vue
```

## Content and presentation

### Breadcrumbs and transparent surfaces

Compare breadcrumb navigation and title hierarchy on transparent surfaces.

<details>
<summary>Configuration details and limits</summary>

#### Content above the heading

Use Card for the surface, the `header` slot for breadcrumbs, and Space to stack the title and subtitle.

#### Transparent background

The page header is transparent by default. A tonal Card supplies the outer surface without custom background styles.

</details>

```demo
../example/demos/surface-comparison.vue
```

### Complete structure

Compose the header with Card, Space, Cell, Grid, Statistic and Divider without custom styles. The project details, statistics and actions match the desktop example. The back arrow sits beside the title, while breadcrumbs occupy the separate `header` slot. Mobile stacks the title and project details and places Create task at the bottom.

```demo
../example/demos/complete.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. The back button sits at inline start; its default icon points right in RTL. Title, subtitle and extra content follow reading order. Custom back slots are not mirrored automatically.

## Usage notes

### Configuration

The back button shows circular feedback for hover-capable mouse pointers and keyboard focus. The feedback circle does not affect title layout.

## API

The back button uses the current locale’s back text by default. Use `back-button-aria-label` for a more specific name. The title slot can contain a heading at the level appropriate for the page. The back event is a notification and does not navigate automatically.

### PageHeader Props

| Prop | Description | Type | Default |
| ---------- | ---------------- | --------- | ------- |
| `show-back` | Whether to show back | _boolean_ | `false` |
| back-button-aria-label | Accessible name of the back button | `string` | Current locale back text |
| `title` | Main title | _string_ | `-` |
| `subtitle` | Subtitle | _string_ | `-` |
| `extra` | Extra content on the right | _string_ | `-` |

### PageHeader Events

| Name | Description | Prop |
| ------ | -------------------------------------------- | ------------ |
| `back` | Emitted when the back button is clicked | `MouseEvent` |

### PageHeader Slots

| Name | Description |
| ---------- | ---------------------------- |
| `header` | Content above the heading, usually breadcrumbs |
| `back` | Custom back icon |
| `avatar` | Avatar |
| `title` | Main title |
| `subtitle` | Subtitle |
| `extra` | Extra content on the right |
| `default` | Main page-header content |
| `footer` | Footer content |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-page-header-back-color` | `var(--mp-color-text-2)` | `color` |
| `--mp-page-header-back-hover-bg` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-page-header-back-hover-size` | `30px` | `height`, `width` |
| `--mp-page-header-back-size` | `22px` | `font-size` |
| `--mp-page-header-content-margin-top` | `16px` | `margin-top` |
| `--mp-page-header-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-page-header-footer-margin-top` | `16px` | `margin-top` |
| `--mp-page-header-item-gap` | `12px` | `margin-inline-start` |
| `--mp-page-header-row-gap` | `12px` | `margin-bottom` |
| `--mp-page-header-subtitle-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-page-header-title-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-page-header-title-font-size` | `var(--mp-font-size-lg)` | `font-size` |
| `--mp-page-header-title-font-weight` | `600` | `font-weight` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-page-header-back-color: var(--mp-color-text-2);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
