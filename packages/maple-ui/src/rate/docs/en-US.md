# Rate

### Intro

Used to rate things.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Customize Total Rating

Set the total rating through the `count` attribute.

```demo
../example/demos/custom-total-rating.vue
```

### Customize Rating Icon Style

Set the selected and unselected icons through the `icon` and `empty-icon` properties.
Set the selected and unselected colors through the `color` and `empty-color` properties.

```demo
../example/demos/custom-rating-icon-style.vue
```

### Customize Rating Icon Size And Gap

Use the `size` property to set the size of the score icon.
Set the interval between scores via the `gap` property.

```demo
../example/demos/custom-rating-icon-size-and-gap.vue
```

### Allow Half Rating

The `allow-half` attribute is used to set the rating to semi selective, and the `half-icon` attribute is used to set the style of semi selective.

```demo
../example/demos/half-star.vue
```

### Disabled And Readonly

The `disabled` property sets the score to the no-click state, and `disabled-color` sets the icon color when disabled.
The score is set to read-only via the `readonly` property.

```demo
../example/demos/disabled-and-readonly.vue
```

### Can Be Cleared

The `clearable` property allows users to clear score.

```demo
../example/demos/clearable.vue
```

### Listen Event

Other interaction logic is completed by calling the `change` event.



> For form validation of the rate, please use the [FormItem component](#/en-US/form-item).

```demo
../example/demos/listen-event.vue
```

## API

### props

| Prop             | Description | Type | Default | 
|------------------| ---- | ---- | ---- |
| `v-model`        | The current rating  | _number_ | `0` |
| `count`          | Total rating  | _number \| string_ | `5` |
| `color`          | The color of the icon when selected  | _string_ | `-` |
| `icon`           | The icon used for a selected rating  | _string \| Component_ | `star-fill` |
| `empty-color`    | The color of the icon when unchecked | _string_ | `#bdbdbd` |
| `empty-icon`     | Icon used when unchecked | _string \| Component_ | `star` |
| `size`           | Icon size, default unit is `px` | _number \| string_ | `-` |
| `gap`            | Icon spacing, default unit is `px` | _number \| string_ | `-` |
| `allow-half`           | Whether half selection is allowed | _boolean_ | `false` |
| `half-icon`      | The half-selected icon; only applies when `allow-half` is `true` | _string \| Component_ | `star-half-full` |
| `disabled`       | Whether to disable rating | _boolean_ | `false` |
| `disabled-color` | The color of the icon when disabling grading is only effective when `disabled` is `true` and has higher priority than `color` and `empty-color` | _string_ | `-` |
| `readonly`       | Whether it is in readonly status. The rating cannot be modified in readonly status. | _boolean_ | `false` |
| `clearable`      | whether to allow to clear | _boolean_ | `false` |
| `ripple`         | Whether to use water ripple | _boolean_ | `true` |

Icon rendering precedence is: `grading` > `character` slot > `icon` / `half-icon` / `empty-icon` > platform defaults. String names continue to use global registration; component values work without global registration.

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `change` | Triggered when the rating changes | `value: number` |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default                      |
| --- |------------------------------|
| `--rate-color` | `var(--color-text)`          |
| `--rate-size` | `24px` |
| `--rate-primary-color` | `var(--color-primary)`       |
| `--rate-disabled-color` | `var(--color-text-disabled)` |
| `--rate-error-color` | `var(--color-danger)`        |
| `--rate-action-padding` | `4px`                        |

尺寸与跨端迁移约定见仓库根目录 `API-MIGRATION.md`。只支持文档列出的档位，不代表支持全部 ComponentSize。
