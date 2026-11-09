# Affix

The same scenarios, parameters and interactions as Cedar. Only component prefixes differ; themes and site shells remain independent.

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

## Layout and arrangement

### Affix direction, offset and container

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `target` | Scroller or selector; finds nearest scrolling ancestor when omitted, falling back to window | Affix direction, offset and container |
| `offset-top` | Distance from the scroll container top; accepts CSS lengths | Affix direction, offset and container |
| `offset-bottom` | Distance from the bottom; takes precedence over offset-top, including 0 | Affix direction, offset and container |
<!-- demo-config-notes:end -->


Scroll each bordered area separately to compare top/bottom affixing and offsets within an explicit scroll container.

```demo
../example/demos/offset-container-comparison.vue
```

## Interaction and control

### Change event

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `target` | Scroller or selector; finds nearest scrolling ancestor when omitted, falling back to window | Change event, Disabled, CSS mode and manual update |
| `offset-top` | Distance from the scroll container top; accepts CSS lengths | Change event, Disabled, CSS mode and manual update |
| `disabled` | Disable affixing | Disabled, CSS mode and manual update |
| `css-mode` | Use native position: sticky, subject to ancestor overflow and container boundaries | Disabled, CSS mode and manual update |
| `z-index` | Stacking level | Disabled, CSS mode and manual update |
<!-- demo-config-notes:end -->


```demo
../example/demos/fix-change.vue
```

### Disabled, CSS mode and manual update

```demo
../example/demos/controls.vue
```

## API

<!-- same-source-api:start -->
### Affix Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| offset-top | Distance from the scroll container top; accepts CSS lengths | `number / string` | `0` |
| offset-bottom | Distance from the bottom; takes precedence over offset-top, including 0 | `number / string` | `undefined` |
| target | Scroller or selector; finds nearest scrolling ancestor when omitted, falling back to window | `string / HTMLElement / Window` | `undefined` |
| target-container | Extra outer scroller to listen to; omitted means no extra listener, and it is not a clipping boundary | `string / HTMLElement / Window` | `undefined` |
| z-index | Stacking level | `number / string` | `10` |
| disabled | Disable affixing | `boolean` | `false` |
| css-mode | Use native position: sticky, subject to ancestor overflow and container boundaries | `boolean` | `false` |

### Affix Events

| Event | Arguments and timing |
| --- | --- |
| change | `(fixed: boolean, offset: number)`, emitted when the fixed state changes. While fixed, offset is the affix threshold; otherwise it is the distance to the corresponding container edge. Disabling affixing reports 0. |

### Affix Slots

| Slot | Description | Prop |
| --- | --- | --- |
| default | Content to affix | — |

### Affix Methods

| Method | Description | Arguments | Returns |
| --- | --- | --- | --- |
| updatePosition | Rebind scrollers and recalculate on the next animation frame | — | `Promise<void>` |

### Usage notes

Props, event arguments, slots and public methods match across platforms. CSS mode follows browser sticky rules; examples use independent scroll containers.
<!-- same-source-api:end -->

`change` only reports transitions in fixed state: repeated measurements while fixed do not repeat true, and disabling releases fixation with false and 0. Viewport units are reevaluated on measurement. CSS mode delegates valid lengths to native sticky; JS mode resolves numbers, numeric strings, px, rem, vw, vh, vmin and vmax. target controls listeners and JS measurement, while native sticky remains constrained by actual CSS ancestors. After deactivation, a pending `updatePosition()` cannot restore listeners from an older activation.


### Imports and event types

The subentry default component and the named components from the subentry and root are the same component. Props includes actual listener parameters. Events remain notifications and do not await returned Promises. Use only the documented instance methods.

```ts
import Affix, { Affix as NamedAffix } from '@maple-design/ui/affix'
import { Affix as RootAffix } from '@maple-design/ui'
import type { AffixProps, AffixInstance } from '@maple-design/ui'
import type { AffixProps as SubAffixProps } from '@maple-design/ui/affix'
const options: AffixProps = { onChange: (fixed: boolean, offset: number) => fixed && offset.toFixed() }
```


### Units and diagnostics

JS mode parses only finite numbers, decimal/scientific numeric strings, and px, rem, vw, vh, vmin or vmax, including negative offsets. Unsupported JS lengths such as em, %, calc() and var() warn in development and measure as zero instead of treating a numeric prefix as pixels. CSS mode delegates to native sticky, converting numeric strings to px and leaving other valid CSS expressions to the browser. NaN/Infinity/blank values receive Vue prop validation warnings. Invalid CSS offsets are removed and JS measurement falls back to zero. target changes listeners and JS measurement, not the actual native sticky scroll ancestor or clipping boundary.

## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
