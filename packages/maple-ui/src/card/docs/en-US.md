# Card

Source changes synchronously invalidate render generations. Close, row direction, newer work, deactivation or disposal prevent old nextTick/timer/double-frame continuations from changing newer phases. Render/timer deliveries consume once. Recheck lifecycle/request/node after geometry hooks to reject reentrant disposal. Suspension cancels both timers and retained close/click input is inert; activation starts a fresh phase from current props without replay, and initial KeepAlive activation does not duplicate the wait.

## Examples

### Basic usage and subtitle

```demo
../example/demos/basic.vue
```

### Variants and elevation

```demo
../example/demos/variant.vue
```

### Sizes

```demo
../example/demos/size.vue
```

### Custom header

```demo
../example/demos/no-padding.vue
```

### Hover style

```demo
../example/demos/hoverable.vue
```

### Images and directions

```demo
../example/demos/image.vue
```

### Long title and tooltip

```demo
../example/demos/tooltip.vue
```

### Ripple and click

```demo
../example/demos/ripple.vue
```

### Floating and close

```demo
../example/demos/floating.vue
```

### Appearance combinations

Use this example for content grouping and visual hierarchy. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### Content slots

```demo
../example/demos/slots.vue
```

### Floating scheduler lifecycle / 浮起调度生命周期

```demo
../example/demos/en-US/scheduler-lifecycle.vue
```

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

### scheduler-lifecycle

```demo
../example/demos/scheduler-lifecycle.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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
| `--mp-card-background` | `var(--mp-sys-color-surface-default)` |
| `--mp-card-filled-background` | `var(--mp-sys-color-surface-muted)` |
| `--mp-card-outline-color` | `var(--mp-sys-color-border-default)` |
| `--mp-card-border-radius` | `4px` |
| `--mp-card-image-width` | `100%` |
| `--mp-card-row-image-width` | `140px` |
| `--mp-card-image-height` | `200px` |
| `--mp-card-row-height` | `140px` |
| `--mp-card-title-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-card-title-font-size` | `20px` |
| `--mp-card-title-padding` | `0 12px` |
| `--mp-card-title-margin` | `15px 0 0 0` |
| `--mp-card-title-row-margin` | `12px 0` |
| `--mp-card-content-padding` | `0 16px` |
| `--mp-card-content-margin` | `16px 0 0 0` |
| `--mp-card-content-color` | `var(--mp-sys-color-content-tertiary)` |
| `--mp-card-content-font-size` | `14px` |
| `--mp-card-content-row-margin` | `16px 0 0 0` |
| `--mp-card-subtitle-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-card-subtitle-font-size` | `14px` |
| `--mp-card-subtitle-padding` | `0 12px` |
| `--mp-card-subtitle-margin` | `10px 0 0 0` |
| `--mp-card-subtitle-row-margin` | `-8px 0 0 0` |
| `--mp-card-description-color` | `var(--mp-sys-color-content-secondary)` |
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
| `--mp-card-floating-buttons-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-card-close-button-icon-size` | `24px` |
| `--mp-card-close-button-size` | `56px` |
| `--mp-card-close-button-background` | `#212121` |
| `--mp-card-close-button-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-card-close-button-border-radius` | `50%` |

Card body colors share Cedar's system roles: default and filled surfaces use `surface-default` and `surface-muted`, the outline uses `border-default`, and title, body, and supporting text use `content-primary`, `content-tertiary`, and `content-secondary`. The dark theme keeps these roles. The expanded floating-button container sits on the card surface and uses `content-primary`; text and icons on the dark close button use `content-on-dark`. Its `#212121` background is Card-specific, not the global primary action color. See the Design Token guide for the former variable name's migration.

### Token consumer contract

Row content consumes `--mp-card-content-row-margin`, independently from the title margin. Card intentionally exposes only sm/md density, not all five control sizes. Motion uses `--mp-card-animation-duration` (`var(--mp-sys-motion-duration-slow)`) and `--mp-card-animation-easing` (`var(--mp-sys-motion-easing-standard)`). Reduced motion disables transitions on every animated Card section.
