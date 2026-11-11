# SafeArea

Keep edge-aligned content clear of display cutouts, rounded corners and the home indicator. Browsers normally provide the insets; an App WebView can supply its own values.

## When to use

| Layout | Approach |
| ------------------------------------------ | ------------------------------------------------------- |
| Content away from viewport edges | Usually no extra configuration |
| Bottom actions or fullscreen edge content | Wrap the affected region and choose `edges` |
| Popup or TabBar already handles safe areas | Use its own switch; avoid adding the same outer padding |
| Native host already avoids an edge | Explicitly override that edge with `0` |

## Basic examples

### Bottom padding and nesting

Stripes show safe-area padding. Change the inset, set it to zero, or disable nested protection to compare duplicate spacing, even on desktop.

```demo
../example/demos/en-US/basic.vue
```

## Page and component composition

### App page simulation

Choose portrait, landscape, asymmetric Duo simulations or zero insets. Inspect a scrolling page, fixed actions and field popups. Each edge accepts 0–120 CSS px. Landscape fits the available width; native-size viewing is optional.

The page consumes top/left/right; the footer consumes bottom once. Measurements show real padding, including normal popup content spacing. Additional form, upload and date controls appear under More form options. This complete fixture currently uses Chinese labels.

```demo
../example/demos/app-form.vue
```

### Component integration

Choose an edge-aligned component, adjust bottom, left and right insets independently and open it. Expand the measurements when you need exact values. Simulation stays local to this example.

```demo
../example/demos/en-US/affected-components.vue
```

### Asymmetric safe areas on Duo

Duo outer and inner displays in both orientations, plus left and right Split View windows, update the viewport and simulated insets together. Expanded / collapsed toolbar controls select small / large viewport heights. Left / right avoidance swaps asymmetric insets on the current viewport; zero only clears the insets.

WebKit Safari 27.1 CSS viewport sizes (width × small/large height): outer portrait 382 × 580/618, outer landscape 594 × 368/406, inner portrait 669 × 867/902, inner landscape 951 × 585/620, each split window 385 × 571/609. These are not physical display dimensions. Insets are independent stress-test values, not measured insets for those viewports; do not compensate again for a side rail Safari already excludes. Read each edge independently. The host must update the remaining insets relative to the WebView content viewport after folding, unfolding, rotation, Split View or safe-area changes; pass `0` for edges already handled by the host.

Safari and native apps may expose different usable viewports. Keep browser `env()` defaults unless the host supplies accurate remaining insets. Do not copy native side-rail widths into a webpage. A fold inside the screen requires separate segmented layout and cannot be represented by four edge insets.

References: [WebKit web adaptation](https://webkit.org/blog/18486/webkit-features-for-safari-27-1/) and [Apple safe-area guidance](https://developer.apple.com/videos/play/tech-talks/111461/).

## Application usage

### 1. Enable browser support

Configure the viewport in application HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

Wrap regions needing safe-area spacing. Browser `env(safe-area-inset-*, 0px)` is read by default; do not hardcode a phone's dimensions:

```vue
<mp-safe-area :edges="['bottom']">
  <mp-button status="primary" block>Submit</mp-button>
</mp-safe-area>
```

For on-demand imports, load `@maple-design/ui-vue/safe-area/style`. Auto-import resolvers handle styles automatically.

### 2. Override when the app supplies insets

Pass CSS pixels still needing avoidance within the WebView content viewport, not physical device pixels or keyboard height.

```ts
import { SafeArea } from '@maple-design/ui-vue'

SafeArea.setInsets({ top: 0, right: 0, bottom: 34, left: 0 })
SafeArea.setInsets(null) // Remove overrides; restore browser/inherited values
```

`0` is valid. Each call replaces all four target-edge overrides; omitted edges inherit/browser-default. App adapters own initial snapshots, rotation/resume updates and unsubscription. Clear global overrides when removing adapters. Without native data, keep browser defaults.

### 3. Local containers and popups

```vue
<mp-safe-area :edges="[]" :insets="{ top: 0, bottom: 20 }">
  <!-- Supply local insets without adding padding at this layer -->
  <YourContent />
</mp-safe-area>
```

Insets inherit along actual DOM. Body-teleported popups leave local containers: use root overrides or a `popup-container` with correct insets. `SafeArea.setInsets(insets, hostElement)` updates only that host. Iframes must load styles in their own document.

## Avoid duplicate spacing

- `edges`: padding `edges` at this layer; `[]` adds none.
- `insets`: effective subtree `insets`; omitted edges inherit, `0` means no avoidance needed.
- `consume`: `true` by default; used edges reset to 0 on direct element children, inherited by descendants.

Choose one avoidance layer per content path. If a bottom bar uses `safe-area`, do not duplicate its padding outside. Use `consume=false` only when descendants need independent compensation. Viewport-fixed elements need explicit hosts/insets; ordinary-flow ancestor compensation is insufficient.

| Component | Enable through | Behavior |
| ------------------------------------- | --------------------------------------- | ------------------------------------ |
| Popup | `safe-area-inset-top/right/bottom/left` | Add padding to specified edges |
| Picker / ActionSheet / NumberKeyboard | `safe-area` | Delegate bottom, left and right spacing to Popup |
| TabBar / FloatingPanel | `safe-area` | Add bottom, left and right padding |
| Fab | `safe-area` | Respect the vertical and horizontal safe areas at the corner selected by position |
| Form popup editor | Automatically handle bottom/left/right insets | Inherit the actual popup host without changing draft confirmation |

## Common questions

**Why no spacing in desktop browsers?** Without device safe areas, `env()` is usually 0. Examples use local simulated values for visibility.

**Should bottom change when the keyboard opens?** Do not treat keyboard height as safe-area inset. WebView resizing, overlays, input scrolling and fixed action bars depend on host policy.

**Does changing themes reset safe areas?** No. Themes manage appearance; SafeArea manages environment insets. Simulators check layout, but status bars, keyboards and rotation require actual iOS/Android WebView tests.

## API

### SafeArea Props

| Prop | Type | Default | Description |
| ------- | -------------- | --------- | ------------------------------------ |
| edges | `SafeAreaEdge[]`<br>`SafeAreaEdge: 'left' \| 'right' \| 'bottom' \| 'top'` | `['top', 'right', 'bottom', 'left']` | Physical edges receiving spacing; [] compensates none and does not represent position or expansion direction |
| insets | SafeAreaInsets | undefined | Local CSS-px overrides; 0 is valid, omitted edges inherit |
| consume | boolean | true | Clear already-consumed edges for descendants |
| tag | string | div | Container element |

Default slot is content; no new events.

`SafeArea.setInsets(insets, target?)`: insets is SafeAreaInsets or null; target defaults to document.documentElement. Replaces four-edge overrides while retaining other target CSS, without registering native listeners. Safely returns during SSR without document. Component insets can render in SSR without writing request data into global modules. Values must be finite/nonnegative or throw TypeError; DOM stays unchanged until every value validates.

## Types

```ts
import SafeArea from '@maple-design/ui-vue/safe-area'
import type { SafeAreaProps, SafeAreaInstance, SafeAreaEdge, SafeAreaInsets } from '@maple-design/ui-vue'
import type { SafeAreaProps as SubSafeAreaProps } from '@maple-design/ui-vue/safe-area'
const options: SafeAreaProps = { edges: ['bottom'], insets: { bottom: 0 } }
SafeArea.setInsets({ bottom: 0 })
```

SafeAreaEdge is the top/right/bottom/left union, and SafeAreaInsets maps those edges optionally to numbers. SafeAreaInstance represents a component instance without a setInsets method. setInsets is static on the component object; do not call it on a template ref.

## CSS Variables

These are runtime-environment values, not Alps/Firefly brand-theme values. Use ThemeProvider for brands and SafeArea for app adaptation; neither clears the other.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-safe-area-bottom` | `env(safe-area-inset-bottom, 0px)` | `margin-bottom`, `padding-bottom` |
| `--mp-safe-area-left` | `env(safe-area-inset-left, 0px)` | `inset-inline-end`, `margin-left`, `padding-left`, `width` |
| `--mp-safe-area-right` | `env(safe-area-inset-right, 0px)` | `inset-inline-end`, `margin-right`, `padding-right`, `width` |
| `--mp-safe-area-top` | `env(safe-area-inset-top, 0px)` | `margin-top`, `padding-top` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-safe-area-bottom: env(safe-area-inset-bottom, 0px);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
