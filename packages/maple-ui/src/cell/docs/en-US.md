# Cell

### Intro

The cell is a single display item in the list.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Show Icon

```demo
../example/demos/show-icon.vue
```

### Show Description

```demo
../example/demos/show-desc.vue
```

### Show Border

```demo
../example/demos/show-border.vue
```

### Use As List Item

```demo
../example/demos/list.vue
```

## API

### Props

| Prop | Description | Type | Default |
| ----- | -------------- | -------- | ---------- |
| `title` | Title | _string_ | `-` |
| `icon` | Icon name | _string_ | `-` |
| `description` | Description | _string_ | `-` |
| `border` | Whether to show border | _boolean_ | `false` |
| `border-offset` | Border offset | _string \| number_ | `-` |
| `icon-class` | Icon className | _string_ | `-` |
| `title-class` | Title className | _string_ | `-` |
| `description-class` | Description className | _string_ | `-` |
| `extra-class` | Extra className | _string_ | `-` |
| `ripple` | Whether to enable the water wave effect | _boolean_ | `false` |

### Events

| Event        | Description                                                                                          | Arguments      |
| ------------ | ---------------------------------------------------------------------------------------------------- | -------------- |
| `click`      | Triggered when the cell is clicked  | `event: Event` |

### Slots

| Name | Description | SlotProps |
| ----- | -------------- | -------- |
| `default` | Content of cell | `-` |
| `icon` | Icon of cell | `-` |
| `description` | Description of cell | `-` |
| `extra` | Extra of cell | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable        | Default |
|-----------------| --- |
| `--cell-color`  | `var(--color-text)` |
| `--cell-font-size` | `var(--font-size-md)` |
| `--cell-description-font-size` | `var(--font-size-sm)` |
| `--cell-description-color` | `rgba(0, 0, 0, 0.6)` |
| `--cell-padding` | `10px 12px` |
| `--cell-min-height` | `40px` |
| `--cell-border-color` | `var(--color-border-2)` |
| `--cell-border-left` | `12px` |
| `--cell-border-right` | `12px` |
| `--cell-icon-right` | `8px` |
| `--cell-extra-left` | `8px` |
