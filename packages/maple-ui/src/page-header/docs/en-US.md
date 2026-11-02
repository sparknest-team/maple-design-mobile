# PageHeader

The back button only emits `back`; it does not navigate or call browser history. The demos show a Message notification. Handle the destination in your application. The native button supports click, Enter and Space.

Displays the current page title, context, and related actions. The API follows Naive UI. Fixed positioning, safe areas, and visual backgrounds belong in application-level `class` / `style` rules.

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

Inherits the nearest `dir="ltr|rtl"` and supports runtime and nested overrides. The back action sits at reading start and its default icon points right in RTL. Titles and extras follow reading order. Custom back slots are not automatically mirrored.

## API

### Props

| Arguments | Description | Type | Default |
| ---------- | ---------------- | --------- | ------- |
| `show-back` | Whether to show back | _boolean_ | `false` |
| `title` | Main title | _string_ | `-` |
| `subtitle` | Subtitle | _string_ | `-` |
| `extra` | Extra content on the right | _string_ | `-` |

### Events

| Name | Description | Arguments |
| ------ | -------------------------------------------- | ------------ |
| `back` | Emitted when the back button is clicked | `MouseEvent` |

### Slots

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

## Shared implementation and platform boundaries

Each platform maintains a complete local implementation. They do not import a common core or share component instances or reactive state. Changes must update both implementations. Component bodies, props, key styles and paired tests have read-only source consistency checks; theme tokens and installation entries remain local to each library.

The back control is a native button with keyboard activation and back(MouseEvent). Cedar classes change from c-page-header-xxx to c-page-header__xxx. Icons remain locally supplied.

### Back-interaction variables

`--mp-page-header-back-hover-size` (30px) controls the feedback circle without moving the title; `--mp-page-header-back-hover-bg` (`var(--mp-sys-color-state-hover)`) supplies its background. Hover feedback only applies to fine pointers supporting hover; keyboard focus-visible remains available for all input modes.
