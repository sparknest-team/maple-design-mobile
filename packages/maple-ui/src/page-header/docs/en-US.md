# PageHeader

Displays the current page title, context, and related actions. The API follows Naive UI. Fixed positioning, safe areas, and visual backgrounds belong in application-level `class` / `style` rules.

### Basic usage

Use the `show-back` prop to display the back control.

```demo
../example/demos/basic-usage.vue
```

### Complete structure

```demo
../example/demos/complete.vue
```

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
