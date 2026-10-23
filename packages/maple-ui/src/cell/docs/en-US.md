# Cell

## Examples

### Intro

The cell is a single display item in the list. `title` renders the main text; the default slot overrides it when provided.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Show Icon

The examples render `<m-icon-fire />` in the `#icon` slot. The Resolver imports it on demand without manual imports or registration. The string API `icon="fire"` only resolves icons already registered in the app; string values do not trigger the Resolver.

```demo
../example/demos/show-icon.vue
```

### Show Description

The leading icon, title/description text block, and trailing content are vertically centered. Cell manages spacing and alignment for the icon slot; place the icon directly in the slot without internal CSS classes.

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

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop | Description | Type | Default |
| ----- | -------------- | -------- | ---------- |
| `title` | Main title; overridden by the default slot | _string_ | `-` |
| `icon` | Registered icon name | _string_ | `-` |
| `description` | Description | _string_ | `-` |
| `border` | Whether to show border | _boolean_ | `false` |
| `border-offset` | Border offset | _string \| number_ | `-` |
| `icon-class` | Extra class for the leading icon container, for both the icon prop and slot | _string_ | `-` |
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
| `default` | Main content; overrides title | `-` |
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
