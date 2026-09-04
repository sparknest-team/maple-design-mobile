# ProgressGroup

### Introduction

Display multiple values as segments of a single progress track with a matching legend.

### Basic Usage

```html
<mp-progress-group
  :items="[
    { label: 'System', value: 24, color: '#64748b' },
    { label: 'Apps', value: 8, color: '#f53f3f' },
    { label: 'Media', value: 42, color: '#00b42a' }
  ]"
  :max="128"
  status
/>
```

### Sizes and Orientation

Use `size` to change track thickness. Set `orientation="vertical"` for a vertical layout; its container must provide an explicit height.

```html
<mp-progress-group :items="items" size="xs" />
<mp-progress-group :items="items" size="xl" />
<mp-progress-group :items="items" orientation="vertical" style="height: 220px" />
```

### Colors and Custom Content

`color` supplies the default for every segment and item colors can override it. Omit every item label and icon to render only the track. Slots can replace the status and legend content.

Hovering or focusing a segment shows a tooltip and thickens that segment. Override the default text with an item's `tip`, or customize it with the `tooltip` slot.

```html
<mp-progress-group :items="items" color="#ff7d00" status>
  <template #status="{ value, max }">Used {{ value }} / {{ max }} GB</template>
  <template #item-trailing="{ item }">{{ item.value }} GB</template>
</mp-progress-group>
```

### Circular Segments

Set `mode="circle"` to render a segmented ring. `circle-size` controls its diameter, `stroke-width` controls the ring width, and status content is centered.

```html
<mp-progress-group mode="circle" :items="items" :circle-size="160" :stroke-width="12" status />
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
