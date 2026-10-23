# Hover

### Intro

Style binding is performed when the pointer hovers the binding element, and the current hovering state can also be obtained through a function, which supports selective enablement on desktop or mobile.

### Style Binding

The style binding is performed when the pointer hovers over the bound element, and the style binding is canceled when the pointer leaves the element.

```demo
../example/demos/style-binding.vue
```

### Function Binding

The function is triggered when the pointer hovers and leaves, and carries the current hover state.

```demo
../example/demos/function-binding.vue
```

### Selectively Enable For Different Devices

Considering the differences in `hover` effects on different platforms, the hover command can only be enabled on specific platforms.

#### Only Enabled On Desktop

```html
// playground-ignore
<mp-paper v-hover:desktop="{ color: '#fff' }"">HOVER</mp-paper>
```

#### Only Enabled On Mobile

```html
// playground-ignore
<mp-paper v-hover:mobile="{ color: '#fff' }"">HOVER</mp-paper>
```
### Governed defaults

| Token | Default |
| --- | --- |
| `--mp-hover-overlay-opacity` | `0.04` |
| `--mp-hover-overlay-focusing-opacity` | `0.12` |

### Motion tokens

| Token | Default |
| --- | --- |
| `--mp-hover-transition-duration` | `var(--mp-sys-motion-duration-fast)` |

Built-in motion honors prefers-reduced-motion: reduce. State/content remain visible; decorative spin, shimmer and ripple are suppressed. Icon name changes skip delays and cancel pending transitions. Ripple duration tokens control CSS only: its 250ms lifecycle timers are unchanged, so keep each visual duration at or below 250ms. Custom animation classes remain the caller’s responsibility.


<!-- api-review:start -->
### 组合审查 / API review

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->
