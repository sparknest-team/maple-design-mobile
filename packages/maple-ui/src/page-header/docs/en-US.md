# PageHeader

The back button only emits `back`; it does not navigate or call browser history. The demos show a Message notification. Handle the destination in your application. The native button supports click, Enter and Space.

Displays the current page title, context, and related actions. The API follows Naive UI. Fixed positioning, safe areas, and visual backgrounds belong in application-level `class` / `style` rules.

## Examples

### Basic usage

Compose the heading and actions with Card and Space. Tap Back, Follow or Create task to show a message. Use `show-back` to display a back arrow to the left of the title and place the primary action at the bottom.

```demo
../example/demos/basic-usage.vue
```

### Content above the heading

Use Card for the surface, the `header` slot for breadcrumbs, and Space to stack the title and subtitle.

```demo
../example/demos/breadcrumb.vue
```

### Complete structure

Compose the header with Card, Space, Cell, Grid, Statistic and Divider without custom styles. The project details, statistics and actions match the desktop example. The back arrow sits beside the title, while breadcrumbs occupy the separate `header` slot. Mobile stacks the title and project details and places Create task at the bottom.

```demo
../example/demos/complete.vue
```

### Transparent background

The page header is transparent by default. A tonal Card supplies the outer surface without custom background styles.

```demo
../example/demos/transparent.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop       | Description                | Type      | Default |
| ---------- | -------------------------- | --------- | ------- |
| `show-back` | Whether to show back       | _boolean_ | `false` |
| `title`    | Main title                 | _string_  | `-`     |
| `subtitle` | Subtitle                   | _string_  | `-`     |
| `extra`    | Extra content on the right | _string_  | `-`     |

### Events

| Event  | Description                                                          | Arguments    |
| ------ | -------------------------------------------------------------------- | ------------ |
| `back` | Emitted when back is clicked | `MouseEvent` |

### Slots

| Slot       | Description                                    |
| ---------- | ---------------------------------------------- |
| `header`   | Content above the heading, usually breadcrumbs |
| `back`     | Custom back icon                               |
| `avatar`   | Avatar                                         |
| `title`    | Main title                                     |
| `subtitle` | Subtitle                                       |
| `extra`    | Extra content on the right                     |
| `default`  | Main page-header content                       |
| `footer`   | Footer content                                 |

### Back interaction tokens

`--mp-page-header-back-hover-size` (30px) controls the feedback circle without moving the title; `--mp-page-header-back-hover-bg` (`var(--mp-sys-color-state-hover)`) supplies its background. Hover feedback only applies to fine pointers supporting hover; keyboard focus-visible remains available for all input modes.
