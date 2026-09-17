# IndexBar

### Intro

Hyperlinks to scroll on one page.

### Basic Usage

When you click the index bar, it will automatically jump to the corresponding `IndexAnchor` anchor position.

```demo
../example/demos/basic.vue
```

## API

### Props

#### IndexBar Props

| Prop                | Description                         | Type               | Default |
| ------------------- | ----------------------------------- | ------------------ | ------- |
| `sticky`            | Whether to enable anchor sticky top | _boolean_          | `true`  |
| `sticky-offset-top` | Anchor offset top when sticky       | _number \| string_ | `0`     |
| `hide-list`         | Whether to hide anchor list         | _boolean_          | `false` |
| `sticky-css-mode`   | Enable native `css sticky` mode     | _boolean_          | `false` |
| `z-index`           | z-index                             | _string \| number_ | `1`     |
| `highlight-color`   | Index character highlight color     | _string_           | `-`     |
| `duration`          | Animation duration                  | _string \| number_ | `0`     |

#### IndexAnchor Props

| Prop    | Description | Type               | Default |
| ------- | ----------- | ------------------ | ------- |
| `index` | Index       | _string \| number_ | `-`     |

### Events

#### IndexBar Events

| Event    | Description                       | arguments                 |
| -------- | --------------------------------- | ------------------------- |
| `click`  | Emitted when an index is clicked  | `index: number \| string` |
| `change` | Emitted when active index changed | `index: number \| string` |

### Slots

#### IndexBar Slots

| Name      | Description          | SlotProps |
| --------- | -------------------- | --------- |
| `default` | Content of index bar | `-`       |

#### IndexAnchor Slots

| Name          | Description            | SlotProps                           |
| ------------- | ---------------------- | ----------------------------------- |
| `default`     | Custom index character | `-`                                 |
| `anchor-name` | Custom anchor content  | `anchorName: string` anchor content |

### Methods

Use ref to get IndexBar instance and call instance methods.

| Method     | Description              | arguments                                                    | Return |
| ---------- | ------------------------ | ------------------------------------------------------------ | ------ |
| `scrollTo` | Scroll to target element | `index: number \| string, options?: IndexBarScrollToOptions` | `-`    |

#### IndexBarScrollToOptions

| Option  | Description                              | Type      | Default |
| ------- | ---------------------------------------- | --------- | ------- |
| `event` | Prevent `change` emit event when `false` | _boolean_ | `-`     |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                                | Default                   |
| --------------------------------------- | ------------------------- |
| `--mp-index-bar-list-right`             | `0`                       |
| `--mp-index-bar-list-top`               | `50%`                     |
| `--mp-index-bar-list-left`              | `auto`                    |
| `--mp-index-bar-list-bottom`            | `auto`                    |
| `--mp-index-bar-list-transform`         | `translate(0, -50%)`      |
| `--mp-index-bar-list-item-font-size`    | `var(--mp-font-size-xs)`  |
| `--mp-index-bar-list-item-color`        | `var(--mp-color-primary)` |
| `--mp-index-bar-list-item-active-color` | `var(--mp-color-danger)`  |
| `--mp-index-bar-list-item-height`       | `14px`                    |
| `--mp-index-bar-list-item-padding`      | `0 10px`                  |

### API

### Props

| Prop    | Description | Type               | Default |
| ------- | ----------- | ------------------ | ------- |
| `index` | Index       | _string \| number_ | `-`     |

### Slots

| Name      | Description            | SlotProps |
| --------- | ---------------------- | --------- |
| `default` | Custom index character | `-`       |
