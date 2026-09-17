# Card

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Examples

### Basic usage and subtitle

```demo
../example/demos/basic.vue
```

### Custom header

```demo
../example/demos/no-padding.vue
```

### Hover style

```demo
../example/demos/hoverable.vue
```

### Variants and elevation

```demo
../example/demos/variant.vue
```

### Images and directions

```demo
../example/demos/image.vue
```

### Sizes

```demo
../example/demos/size.vue
```

### Long title and tooltip

```demo
../example/demos/tooltip.vue
```

### Content slots

```demo
../example/demos/slots.vue
```

### Ripple and click

```demo
../example/demos/ripple.vue
```

### Floating and close

```demo
../example/demos/floating.vue
```

## API

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| variant | Appearance | `default / outline / tonal` | `default` |
| size | Density; omitted value follows platform rules below | `sm / md` | `undefined` |
| direction | Cover and body layout | `row / column / row-reverse` | `column` |
| hoverable | Hover styling | `boolean` | `false` |
| title-style | Title row styles | `CSSProperties` | `undefined` |
| title | Title | `string` | `undefined` |
| subtitle | Subtitle | `string` | `undefined` |
| description | Description | `string` | `undefined` |
| top-divider | Top divider | `boolean` | `false` |
| bottom-divider | Bottom divider | `boolean` | `false` |
| src | Cover image URL; cover slot takes precedence | `string` | `undefined` |
| fit | Cover image fit | `fill / contain / cover / none / scale-down` | `cover` |
| image-height | Image height; numbers use px | `string / number` | `undefined` |
| image-width | Image width; numbers use px | `string / number` | `undefined` |
| alt | Image alternative text | `string` | `undefined` |
| elevation | Shadow for default variant; true means level 1, false disables it, numeric levels 0–24 | `boolean / number` | `true` |
| ripple | Click ripple | `boolean` | `false` |
| floating | Fullscreen state; supports v-model:floating | `boolean` | `false` |
| floating-duration | Fullscreen transition duration in ms | `number` | `250` |

### Events

| Event | Arguments and timing |
| --- | --- |
| click | `(event: Event)`, when the card is clicked |
| update:floating | `(value: boolean)`, built-in close requests false; the parent controls opening |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| default | Body | — |
| cover | Cover; overrides src | — |
| header | Entire header; overrides title, title-action and subtitle | — |
| title | Title | `{ slotClass: string }` |
| title-action | Title action | — |
| subtitle | Subtitle | `{ slotClass: string }` |
| description | Description | `{ slotClass: string }` |
| footer | Footer actions | — |
| floating-content | Expanded content; column layout only | — |
| close-button | Custom close button; update floating yourself | — |

### Methods

No public methods.

### Platform notes

Cedar inherits global size when omitted (xs/sm map to sm, others to md); Maple falls back to md. Pass size explicitly for matching density. Themes and CSS prefixes remain platform-specific. Card has no loading prop; compose it with the Loading directive.
<!-- same-source-api:end -->

### Style Variables

| Variable | Default |
| --- | --- |
| `--mp-card-hover-shadow` | `0 4px 12px rgb(0 0 0 / 12%)` |
| `--mp-card-size-sm-title-font-size` | `16px` |
| `--mp-card-size-sm-section-margin` | `8px 0 0` |
| `--mp-card-size-sm-section-padding` | `0 12px` |
| `--mp-card-padding` | `0 0 15px 0` |
| `--mp-card-background` | `var(--mp-color-bg-2)` |
| `--mp-card-filled-background` | `hsla(0, 0%, 93%, 1)` |
| `--mp-card-outline-color` | `var(--mp-color-border-2)` |
| `--mp-card-border-radius` | `4px` |
| `--mp-card-image-width` | `100%` |
| `--mp-card-row-image-width` | `140px` |
| `--mp-card-image-height` | `200px` |
| `--mp-card-row-height` | `140px` |
| `--mp-card-title-color` | `#333` |
| `--mp-card-title-font-size` | `20px` |
| `--mp-card-title-padding` | `0 12px` |
| `--mp-card-title-margin` | `15px 0 0 0` |
| `--mp-card-title-row-margin` | `12px 0` |
| `--mp-card-content-padding` | `0 16px` |
| `--mp-card-content-margin` | `16px 0 0 0` |
| `--mp-card-content-color` | `var(--mp-color-text-3)` |
| `--mp-card-content-font-size` | `14px` |
| `--mp-card-content-row-margin` | `16px 0 0 0` |
| `--mp-card-subtitle-color` | `rgba(0, 0, 0, 0.6)` |
| `--mp-card-subtitle-font-size` | `14px` |
| `--mp-card-subtitle-padding` | `0 12px` |
| `--mp-card-subtitle-margin` | `10px 0 0 0` |
| `--mp-card-subtitle-row-margin` | `-8px 0 0 0` |
| `--mp-card-description-color` | `rgba(0, 0, 0, 0.6)` |
| `--mp-card-description-font-size` | `14px` |
| `--mp-card-description-margin` | `20px 0 0 0` |
| `--mp-card-description-padding` | `0 13px` |
| `--mp-card-footer-padding` | `0 12px` |
| `--mp-card-footer-right` | `13px` |
| `--mp-card-footer-bottom` | `9px` |
| `--mp-card-footer-margin` | `30px 0 0 0` |
| `--mp-card-line-height` | `22px` |
| `--mp-card-row-line-height` | `1.5` |
| `--mp-card-floating-buttons-bottom` | `16px` |
| `--mp-card-floating-buttons-right` | `16px` |
| `--mp-card-floating-buttons-color` | `#fff` |
| `--mp-card-close-button-icon-size` | `24px` |
| `--mp-card-close-button-size` | `56px` |
| `--mp-card-close-button-primary-color` | `#212121` |
| `--mp-card-close-button-text-color` | `#fff` |
| `--mp-card-close-button-border-radius` | `50%` |
