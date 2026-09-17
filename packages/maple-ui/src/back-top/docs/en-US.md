# BackTop

### Intro

A button to back to top.

### Basic Usage

When `target-container` is unset, the page scroll is listened. Once the scroll height reaches `visible-height`, a back to top button appears in the lower right corner.

```demo
../example/demos/basic-usage.vue
```

### Target Container

Use `target-container` to specify a local scroll container. Set `:popup-container="false"` to keep the button inside the container; the parent needs `position: relative`.

```demo
../example/demos/target-container.vue
```

### Custom Position

Adjust position with `right` and `bottom`.

```demo
../example/demos/custom-position.vue
```

### Custom Content

Customize the button content with the default slot and listen to clicks with `@click`.

```demo
../example/demos/custom-content.vue
```

## API

### Props

| Prop | Description                                                                                             | Type   | Default |
| ----- |---------------------------------------------------------------------------------------------------------|--------|-------|
| `target-container` | The target to trigger scroll. When unset, the nearest scrollable ancestor is detected automatically. | _string \| HTMLElement_     | `-` |
| `popup-container` | Mount target; omitted values use body. When `false`, the button is positioned relative to its parent, which should have `position: relative`. | _string \| HTMLElement \| false_ | `body` |
| `visible-height` | The button will not show until the scroll height reaches this value                                     | _string \| number_ | `200` |
| `bottom`            | Distance from the bottom of the viewport                                                              | _string \| number_ | `-` |
| `right`            | Distance from the right of the viewport                                                               | _string \| number_ | `-` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_|   `true`    |
| `duration` | Time to return to top(ms)                                                                               | _number_ | `300` |

### Events

| Event | Description | arguments |
| ----- | -------------- | -------- |
| `click` | Triggered when click | `event: Event` |

### Slots

| Name | Description | SlotProps |
| ----- | -------------- | -------- |
| `default` | Custom the content | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--back-top-right` | `40px` |
| `--back-top-bottom` | `40px` |
| `--back-top-button-size` | `40px` |
| `--back-top-button-border-radius` | `50%` |
