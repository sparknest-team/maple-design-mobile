# IndexBar

### Lifecycle-owned scrolling

New commands replace older scrolling. Deactivation/disposal cancels entry/interpolation/two-frame settlement; retained methods cannot write or notify. Activation waits for child registration before restoring active/event:false. Cancellation stops without jumping to an old target. Public scrollTo still returns void; default0/cubic easing and events remain. Private tasks replace the generic-helper call, with no new public cancellation API/CSS variable. Reduced motion skips interpolation, not necessary list/clickedName settlement frames.

Consumer11/private task4/existing9 pass (24). Final real IAB4/4 covers replacement, settlement, disposal and KeepAlive, nodes0/no warn-error. Scope is default/light parent document with native entry clicks and fixture-scripted commands/scroll events; native gestures, OS and other themes/windows remain separate. The helper records below are historical independent evidence.

Shared helper8 real IAB cases pass: main default/zero and same-origin iframe element/Window on both platforms. Default302.5–313.9ms, zero has no RAF, iframe host RAF0, stable targets and cleanup. This certifies scoped helper execution, not IndexBar entry-frame/doubleRaf/clickedName/disposal cancellation or OS reduced motion.

Earlier helper10 tests per platform and real IAB8 cases are independent tool evidence. IndexBar now privately owns cancellation, owner preference and settlement for zero/nonpositive/nonfinite duration; the generic helper receives no cancellation parameter. Zero duration retains entry/two-frame waits, and CSS tokens do not replace duration. Parallel Form remains untouched.

### Intro

Hyperlinks to scroll on one page.

### Basic Usage

When you click the index bar, it will automatically jump to the corresponding `IndexAnchor` anchor position.

```demo
../example/demos/basic.vue
```

### Deactivation, disposal and retained commands

```demo
../example/demos/lifecycle.vue
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
