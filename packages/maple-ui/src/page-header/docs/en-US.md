# PageHeader

Displays the current page title, context, and related actions. The API follows Naive UI. Fixed positioning, safe areas, and visual backgrounds belong in application-level `class` / `style` rules.

### Basic usage

The back control is shown when a `back` listener is attached.

```html
<mp-page-header title="Title" subtitle="Description" @back="router.back()" />
```

### Complete structure

```html
<mp-page-header title="Title" @back="router.back()">
  <template #header><mp-breadcrumb>...</mp-breadcrumb></template>
  <template #avatar><mp-avatar>M</mp-avatar></template>
  <template #extra><mp-button>Action</mp-button></template>
  Page summary or statistics
  <template #footer>Updated today</template>
</mp-page-header>
```

## API

### Props

| Prop       | Description                | Type     | Default |
| ---------- | -------------------------- | -------- | ------- |
| `title`    | Main title                 | _string_ | `-`     |
| `subtitle` | Subtitle                   | _string_ | `-`     |
| `extra`    | Extra content on the right | _string_ | `-`     |

### Events

| Event  | Description                                                          | Arguments    |
| ------ | -------------------------------------------------------------------- | ------------ |
| `back` | Emitted when back is clicked; attaching it displays the back control | `MouseEvent` |

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
