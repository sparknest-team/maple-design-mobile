# TabBar

## Examples

### Intro

Display navigation and key actions at the bottom of the page.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Variant

```demo
../example/demos/variant.vue
```

### Match By Name

```demo
../example/demos/match-by-name.vue
```

### Show Badge

TabBar badges default to size xs and extend outside the top-right edge of the icon. The badge object can override size, position, offsetX and offsetY. Dots, counts and max are supported in both standard and variant modes.

```demo
../example/demos/show-badge.vue
```

### Custom Color

```demo
../example/demos/custom-color.vue
```

### Change Event

```demo
../example/demos/change-event.vue
```

### Click Event

```demo
../example/demos/click-event.vue
```

### Fab

Use the floating button for a primary action such as creating a post, taking a photo or adding an item. The plus button opens the composer without changing the selected tab.

The button is centered for an even number of tabs and right aligned for an odd number. Use the separate control to compare these layouts.

```demo
../example/demos/fab.vue
```

### Uncontrolled selection

```demo
../example/demos/uncontrolled.vue
```

### Numeric names and reordering

```demo
../example/demos/numeric-name.vue
```

### Custom selected label

```demo
../example/demos/custom-label.vue
```

### Async selection guards

```demo
../example/demos/async-change.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

#### TabBar Props

| Prop            | Description                                         | Type | Default |
|-----------------|-----------------------------------------------------| ---- | ---- |
| `v-model:active` | Selected name or index; controlled when provided | _number \| string_ | `undefined` |
| `default-active` | Initial uncontrolled selection; read once | _number \| string_ | `0` |
| `before-change` | Guard selection; truthy permits, falsy/throw/rejection cancels. Only the latest request may commit | _(active: number \| string) => boolean \| Promise&lt;boolean&gt;_ | `-` |
| `fixed`         |  Whether to fixed bottom                            | _boolean_ | `false` |
| `border`        | Whether to show border                              | _boolean_ | `false` |
| `safe-area`       | Whether to enable bottom safe area adaptation | _boolean_ | `false` |
| `z-index`       | Z-index; an explicit prop overrides the CSS variable | _number \| string_ | `undefined` (CSS default `1`) |
| `active-color`  | Color of active tab item                            | _string_ | `-` |
| `inactive-color` | Color of inactive tab item                          | _string_ | `-` |
| `placeholder` ***3.2.11***  | Whether to generate placeholder elements of the same height at the bottom (`fixed` required)  | _boolean_ | `false` |
| `fab-props`     | Fab button props                                    | _ButtonProps_ | `{ status: 'primary' }` |
| `variant` ***3.2.0***      | Variant mode | _boolean_ | `false` |

Without active, selection is maintained internally. When active is provided, updates are emitted to the caller. Releasing control retains the last controlled value. Explicit numeric names take precedence over unnamed item indices; named items are never matched by index.

#### TabBarItem Props

|Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| `name` | Identifier | _number \| string_ | `-` |
| `icon` | Icon name, equivalent to the [name](#/en-US/icon) of Icon component | _string_ | `-` |
| `label` | Label text content | _string_ | - |
| `badge` | Logo in the upper right corner of the icon | _boolean \| BadgeProps_ | `false` |

### Events

#### TabBar Events

|Event | Description | Arguments |
| ---- | ---- | ---- |
| `change` | Triggered when switching labels | `active: number \| string` |
| `fab-click` | Triggered when clicking fab button | `-` |

#### TabBarItem Events

|Event | Description | Arguments |
| ---- | ---- | ---- |
| `click` | Triggered when clicking | `active: number \| string` |

### Slots

#### TabBar Slots

| Name | Description                                                | SlotProps |
| ---- |------------------------------------------------------------| ----|
| `default` | Content of bottom navigation                               | `-` |
| `fab` | Support for inserting a custom Fab button into a component | `-` |

#### TabBarItem Slots

| Name | Description | SlotProps |
| ---- | ---- | ----|
| `default` | Custom label text content that overwrites the content of `label`  | `active: boolean` |
| `icon` | Custom Icon | `active: boolean` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### TabBar Variables

When `z-index` is omitted, the component consumes `--mp-tab-bar-z-index`. An explicit number or CSS string takes precedence. The visual default remains `1`; the prop itself no longer defaults to `1`.

| Variable | Default |
| --- | --- |
| `--mp-tab-bar-height` | `50px` |
| `--mp-tab-bar-variant-height` | `66px` |
| `--mp-tab-bar-z-index` | `1` |
| `--mp-tab-bar-background-color` | `var(--mp-color-bg-2)` |
| `--mp-tab-bar-border-color` | `var(--color-border-2)` |
| `--mp-tab-bar-fab-offset` | `4px` |

#### TabBarItem Variables

| Variable | Default |
| --- | --- |
| `--mp-tab-bar-item-font-size` | `var(--font-size-sm)` |
| `--mp-tab-bar-item-inactive-color` | `var(--mp-color-text-2)` |
| `--mp-tab-bar-item-active-color` | `var(--color-primary)` |
| `--mp-tab-bar-item-active-background-color` | `transparent` |
| `--mp-tab-bar-item-line-height` | `1` |
| `--mp-tab-bar-item-icon-size` | `22px` |
| `--mp-tab-bar-item-icon-margin-bottom` | `5px` |
| `--mp-tab-bar-fab-border-radius` | `50%` |
| `--mp-tab-bar-item-variant-icon-container-height` | `30px` |
| `--mp-tab-bar-item-variant-icon-container-border-radius` | `100px` |
| `--mp-tab-bar-item-variant-icon-container-max-width` | `58px` |
| `--mp-tab-bar-item-variant-active-background-color` | `color-mix(in srgb, var(--mp-color-primary) 14%, var(--mp-tab-bar-background-color))` |
| `--mp-tab-bar-item-variant-active-color` | `var(--mp-color-primary)` |

### Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| `name` | Identifier | _number \| string_ | `-` |
| `icon` | Icon name, equivalent to the [name](/#/en-US/icon) of Icon component | _string_ | `-` |
| `label` | Label text content | _string_ | - |
| `badge` | Logo in the upper right corner of the icon | _boolean \| BadgeProps_ | `false` |

### Events

| Event | Description | Arguments |
| ---- | ---- | ---- |
| `click` | Triggered when clicking | `active: number \| string` |

### Slots

| Name | Description | SlotProps |
| ---- | ---- | ----|
| `default` | Custom label text content that overwrites the content of `label`  | `active: boolean` |
| `icon` | Custom Icon | `active: boolean` |
