# BackTop

A native button that scrolls the page or an explicit container to the top.

## Examples

### Basic usage

```demo
../example/demos/en-US/basic-usage.vue
```

### Switch scroll container

```demo
../example/demos/en-US/target-container.vue
```

### Custom position

```demo
../example/demos/en-US/custom-position.vue
```

### Content and events

```demo
../example/demos/en-US/custom-content.vue
```

The examples use isolated local containers. Omit `target-container` to listen to the page, not the nearest scrollable ancestor. A selector that is invalid or missing hides the button; use a reactive getter for a container mounted asynchronously. `popup-container` controls where the button renders, not what scrolls.

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `target-container` | Scroll target; omitted means page | `string \| HTMLElement \| (() => HTMLElement \| null \| undefined)` | `—` |
| `popup-container` | Render target; false renders locally | `string \| HTMLElement \| false` | `body` |
| `visible-height` | Inclusive scroll threshold in px, numeric strings accepted | `number \| string` | `200` |
| `duration` | Animation duration in ms; 0 is immediate | `number` | `200` |
| `easing` | Built-in curve or normalized progress function | `'linear' \| 'quartOut' \| 'easeInOutCubic' \| ((progress: number) => number)` | `'quartOut'` |
| `right` | Right offset; number in px, string accepts CSS units | `number \| string` | `—` |
| `bottom` | Bottom offset; number in px, string accepts CSS units | `number \| string` | `—` |
| `elevation` | Shadow level; true uses level 2 | `boolean \| number` | `true` |
| `aria-label` | Accessible name | `string` | `'Back to top'` |

When `popup-container=false`, the button is positioned absolutely; give its containing block `position: relative`. Repeated clicks replace the previous animation; changing target, deactivation and unmount cancel queued work. Reduced-motion preference skips animation. Horizontal scroll position is preserved.

### Events / Slots / Expose

- `click(event: MouseEvent)`: emitted once per activation.
- Default slot: non-interactive content such as text or an icon. Do not nest buttons or links inside the native button.
- `scrollToTop()`: scroll the current target; does not emit `click`.
- Keyboard: Tab focuses the visible native button; Enter or Space activates it. Hidden buttons cannot receive focus.

### Types

```ts
import type { BackTopProps, BackTopInstance, BackTopTarget, BackTopEasing } from '@maplejs/maple-ui'
```

### CSS tokens

| Token | Default |
| --- | --- |
| `--mp-back-top-right` | `40px` |
| `--mp-back-top-bottom` | `40px` |
| `--mp-back-top-button-size` | `var(--mp-sys-control-touch-target)` |
| `--mp-back-top-button-border-radius` | `50%` |
| `--mp-back-top-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-back-top-icon-size` | `20px` |
| `--mp-back-top-background` | `var(--mp-sys-color-surface-raised)` |
| `--mp-back-top-text-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-back-top-hover-background` | `var(--mp-sys-color-state-hover)` |
| `--mp-back-top-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-back-top-focus-width` | `2px` |
| `--mp-back-top-focus-offset` | `2px` |
| `--mp-back-top-z-index` | `var(--mp-z-index-local-sticky)` |

Pre-release migration: Cedar `margin-right/bottom` → `right/bottom`, `button-size-width` → `button-size`, `button-size-font/icon` → `font-size/icon-size`, `button-bg/bg-hover/text-color` → `background/hover-background/text-color` (all with the component prefix). Maple duration is now 200ms; default target is the page. Legacy arbitrary BTween curve names are replaced with the documented presets or a function. No aliases remain.
