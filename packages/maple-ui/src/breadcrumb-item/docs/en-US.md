# BreadcrumbItem Docs

See [Breadcrumb](#/en-US/breadcrumb).

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `separator` | Separator (overrides parent) | _string \| number_ | `-` |
| `href` | Link URL | _string_ | `-` |
| `droplist` | Dropdown items | _BreadcrumbRoute[]_ | `-` |
| `dropdown-props` | Props passed to Menu | _MenuProps_ | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Fired on click (not for collapsed item) | `event: MouseEvent` |
| `select` | Fired when a built-in dropdown item is selected | `route: BreadcrumbRoute` |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Item content |
| `separator` | Custom separator |
| `droplist` | Custom dropdown menu |
