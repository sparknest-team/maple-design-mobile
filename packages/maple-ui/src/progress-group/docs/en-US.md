# ProgressGroup

### Introduction

Display multiple values as segments of a single progress track with a matching legend.

### Basic Usage

```demo
../example/demos/basic.vue
```

### Track Sizes

```demo
../example/demos/size.vue
```

### Orientation

```demo
../example/demos/orientation.vue
```

### Circular Segments

```demo
../example/demos/circle.vue
```

### Default Color and Track Only

```demo
../example/demos/color.vue
```

### Custom Content

```demo
../example/demos/custom.vue
```

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| items | Segment data | `ProgressGroupItem[]` | `[]` |
| mode | Display mode | `line \| circle` | `line` |
| max | Total used to calculate each share | `number` | `100` |
| status | Show the summed percentage | `boolean` | `false` |
| size | Track size | `xs \| sm \| md \| lg \| xl` | `md` |
| color | Default segment color | `string` | theme primary |
| circle-size | Diameter in circle mode | `number \| string` | `120` |
| stroke-width | Track width in circle mode | `number` | `8` |
| tooltip | Enable segment hover/focus tips | `boolean` | `true` |
| orientation | Track orientation | `horizontal \| vertical` | `horizontal` |

### Slots

| Name | Slot props |
| --- | --- |
| status | `{ percent, value, max }` |
| tooltip | `{ item, index, percent }` |
| item / item-leading / item-label / item-trailing | `{ item, index, percent }` |
