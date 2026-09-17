# Ellipsis

### Intro

Mainly used to omit single-line text and multi-line text.

### Single Line Ellipsis

```demo
../example/demos/line.vue
```

### Multiple Line Ellipsis

```demo
../example/demos/multiple-line.vue
```

### Two-way Binding

```demo
../example/demos/two-way-binding.vue
```

### Click On Text To Expand

```demo
../example/demos/expand.vue
```

### Custom Tooltip

```demo
../example/demos/tooltip.vue
```

## API

### Props

| Prop   | Description  | Type  | Default  |
| ----- | ------ | ---- | ---- |
| `v-model:expand` | Whether to expand | _boolean_  | `false` |
| `expand-trigger` | Expand trigger method, optional value `click` | _string_ | `-` |
| `line-clamp` | Maximum number of display lines, see [line-clamp](https://caniuse.com/?search=line-clamp) for compatibility | _string_ | `-` |
| `tooltip` | Tooltip component props, for deep customization. For more convenience, `autoFitPopupWidth` defaults to `true` here | _boolean \| TooltipProps_ | `true` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Text content | `-` |
| `tooltip-content` | Tooltip content | `-` |