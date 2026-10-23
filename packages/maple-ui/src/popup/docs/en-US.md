# Popup

Mobile modal surface entering from the top, bottom, left, right, or center. Popup shares its modal controller with Cedar Drawer while retaining mobile safe-area and transition presentation.

## 案例

### Placement

```demo
../example/demos/popup-position.vue
```

### Overlay style

```demo
../example/demos/overlay-style.vue
```

### Events

```demo
../example/demos/event.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

Motion override example (tokens on the actual Teleport host):

```demo
../example/demos/motion-token.vue
```

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model:open` | Visibility | `boolean` | - |
| `default-open` | Initial visibility when uncontrolled | `boolean` | `false` |
| `placement` | Surface placement | `'top' \| 'bottom' \| 'right' \| 'left' \| 'center'` | `'center'` |
| `overlay` | Show the overlay | `boolean` | `true` |
| `overlay-class` / `overlay-style` | Overlay class / style | `string / object` | - |
| `overlay-closable` | Close after an overlay click | `boolean` | `true` |
| `transition` | Content transition name | `string` | derived from placement |
| `overlay-animation-name` | Overlay transition name | `string` | `mp-fade` |
| `unstyled` | Remove the default background, text color and elevation | `boolean` | `false` |
| `lock-scroll` | Lock scrolling on the mount container | `boolean` | `true` |
| `esc-to-close` | Close on Escape | `boolean` | `true` |
| `close-on-route-change` | Close after a route change | `boolean` | `false` |
| `unmount-on-close` | False mounts and preserves content even when initially closed; true unmounts after leaving | `boolean` | `false` |
| `popup-container` | Mount container | `string \| HTMLElement \| false` | `body` |
| `safe-area-inset-bottom` | Apply the bottom safe-area inset | `boolean` | `false` |
| `safe-area-inset-top` | Apply the top safe-area inset | `boolean` | `false` |
| `z-index` | Explicit layer index | `number` | allocated |

Events: `update:open`, `open`, `opened`, `close`, `closed`, `click-overlay(MouseEvent)`, and `key-escape(KeyboardEvent)`.

`route-change` is not a lifecycle event. Enable `close-on-route-change` when route navigation should close the surface.

### Style variables

| Variable | Default |
| --- | --- |
| `--mp-popup-overlay-background-color` | `var(--mp-sys-color-scrim)` |
| `--mp-popup-content-background-color` | `var(--mp-sys-color-surface-raised)` |
| `--mp-popup-content-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-popup-transition-duration` | `250ms` |
| `--mp-popup-transition-timing-function` | `ease` |

The overlay token dims only the backdrop; content background/text form a raised surface pair. Dark themes inherit these roles. `unstyled` disables both default background and text colors. Apply content variables on the content element using `style`, and backdrop variables through `overlay-style`, or set system variables on their actual shared ancestor. Teleport does not inherit variables from the reference subtree. Dialog owns a separate backdrop token.

### Focus management

Built-in fade, center scale, four-side pops and base content/backdrop transitions consume the duration/timing-function tokens, retaining 250ms/ease defaults. Set both on the actual shared ancestor/Teleport host for whole-surface overrides; style affects content only and overlay-style the backdrop only. Use valid nonnegative CSS time values. prefers-reduced-motion: reduce takes priority and stops built-in transitions and starting movement. Custom animations remain caller-owned; compiled CSS and explicit 0ms overrides do not certify real OS preference switching.

With unmount-on-close=true, content and locks remain through leaving and are released after completion. Rapid reopening cancels closing and preserves slot state. opened/closed fire once per valid phase; callbacks after disposal are ignored. There is no fixed 250ms JS timer. Initial-open mounted notification behavior remains unchanged, not a promise of full appear timing. Custom or mismatched inner/outer transitions require caller coordination.

Opening focuses the actual dialog panel. Tab/Shift+Tab wrap among enabled, visible controls. The topmost nested modal owns focus; closing restores its opening control. Keep the opener mounted and do not override the internal focus-root marker.
