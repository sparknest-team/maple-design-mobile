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

Choose portrait, landscape or zero insets. Inspect a scrolling page, fixed actions and field popups. Each edge accepts 0–120 CSS px. Landscape fits the available width; native-size viewing is optional.

The page consumes top/left/right; the footer consumes bottom once. Measurements show real padding, including normal popup content spacing. Additional form, upload and date controls appear under More form options. This complete fixture currently uses Chinese labels.

```demo
../example/demos/app-form.vue
```

### Component integration

Choose an edge-aligned component, adjust bottom/horizontal insets and open it. Expand the measurements when you need exact values. Simulation stays local to this example.

```demo
../example/demos/en-US/affected-components.vue
```

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

For on-demand imports, load `@maple-design/ui/safe-area/style`. Auto-import resolvers handle styles automatically.

### 2. Override when the app supplies insets

Pass CSS pixels still needing avoidance within the WebView content viewport, not physical device pixels or keyboard height.

```ts
import { SafeArea } from '@maple-design/ui'

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
| Picker / ActionSheet / NumberKeyboard | `safe-area` | Delegate bottom spacing to Popup |
| TabBar / FloatingPanel | `safe-area` | Add bottom padding |
| Fab | `safe-area` | Adjust own bottom position |
| Form popup editor | Automatically handle bottom/left/right insets | Inherit the actual popup host without changing draft confirmation |

## Common questions

**Why no spacing in desktop browsers?** Without device safe areas, `env()` is usually 0. Examples use local simulated values for visibility.

**Should bottom change when the keyboard opens?** Do not treat keyboard height as safe-area inset. WebView resizing, overlays, input scrolling and fixed action bars depend on host policy.

**Does changing themes reset safe areas?** No. Themes manage appearance; SafeArea manages environment insets. Simulators check layout, but status bars, keyboards and rotation require actual iOS/Android WebView tests.

## API

| Prop | Type | Default | Description |
| ------- | -------------- | --------- | ------------------------------------ |
| edges | Physical edges receiving safe-area spacing, all four by default; not position or expansion direction | All four edges | Edges compensated by this container; [] compensates none |
| insets | SafeAreaInsets | undefined | Local CSS-px overrides; 0 is valid, omitted edges inherit |
| consume | boolean | true | Clear already-consumed edges for descendants |
| tag | string | div | Container element |

Default slot is content; no new events.

`SafeArea.setInsets(insets, target?)`: insets is SafeAreaInsets or null; target defaults to document.documentElement. Replaces four-edge overrides while retaining other target CSS, without registering native listeners. Safely returns during SSR without document. Component insets can render in SSR without writing request data into global modules. Values must be finite/nonnegative or throw TypeError; DOM stays unchanged until every value validates.

## Type definitions

```ts
type SafeAreaEdge = 'top' | 'right' | 'bottom' | 'left'
type SafeAreaInsets = Partial<Record<SafeAreaEdge, number>>
```

## Style variables

| Variable | Default |
| --------------------- | -------------------------------- |
| --mp-safe-area-top | env(safe-area-inset-top, 0px) |
| --mp-safe-area-right | env(safe-area-inset-right, 0px) |
| --mp-safe-area-bottom | env(safe-area-inset-bottom, 0px) |
| --mp-safe-area-left | env(safe-area-inset-left, 0px) |

These are runtime-environment values, not Alps/Firefly brand-theme values. Use StyleProvider for brands and SafeArea for app adaptation; neither clears the other.
