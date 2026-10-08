# Design Tokens and CSS Variable Layers

> This page mirrors the shared standard. `design-ui/standards/design-tokens.md` is the source of truth; update this page and the Cedar page whenever the standard changes.

Cedar and Maple share logical token semantics. Only the platform prefix differs: `--c-` for Cedar and `--mp-` for Maple. Shared semantics do not require every platform dimension to be identical, but tokens with the same logical name must have the same responsibility.

## Current status (2026-09-30)

Source, contract and consumer verification now form a repeatable automated workflow. System defaults and component color, geometry, typography, shadow, motion and layering values distinguish shared roles from explicit platform differences. Use the checker output and generated reference for current totals rather than historical milestone counts.

The original 91 consumer candidates have been resolved: effective customization is connected and obsolete interfaces are removed. InputTag, Form and Tree size gaps, Tag preset contrast, field-state precedence and non-color/reduced-motion rules have regression coverage. Message now has neutral / tonal / solid variants; Cedar defaults to neutral and Maple to solid, preserving their existing appearance. This design is no longer pending.

Run `node bin/token-inventory.mjs --check-consumers --summary` in design-ui; omit --summary for declaration conditions, visibility, terminal CSS properties and reviewed runtime paths. An arbitrary literal mention is only a hint, not a gate exemption. Component token-file counts are not a total of every foundation/system variable.

The closure ledger is `design-ui/audits/token-closure-progress.md`. Real Chrome spot checks cover both Message implementations, themes, overrides and closing, plus InputTag, inputs and common feedback components. They are not whole-library, cross-browser or physical-device acceptance. Later sections describe historical milestones; their old counts and temporary gaps do not supersede this status, the generated reference or machine contracts.

Field outline-border-color-error controls the outline error borders; standard-line-color-error controls error underlines. Standard-line-color-disabled uses system border-subtle and wins over error/focus/hover. These previously declared-but-unused overrides now work on both platforms. Field error text remains controlled separately by field-error-color.

See the [Component CSS Variable Reference](#/en-US/designTokenReference) for generated names, declarations, selector conditions and consumer properties.

## Rules for the consolidated token model

Shared names mean shared responsibilities, not identical desktop and touch density. Every system default is now registered: common values in `systemTokenValues`, explicit control-height/layer differences in `platformSystemTokenValues`. Component defaults follow the same division between `componentTokenValues` and `platformComponentTokenValues`. A token cannot have both a shared default and a platform exception.

Use system spacing, typography, ordinary radius and state-transition roles where their meaning matches. Do not bind an icon, badge dot or layout compensation to control-height merely because the pixels happen to match. Component-specific shape, ratios, structural values and looping animation durations can remain component parameters with an explicit reason. Reduced-motion must suppress unnecessary transitions and loops.

Disabled/readonly are behavior constraints that child closable/checkable props cannot bypass. Pressed, persistently selected and focused are distinct states; each component specifies their overlap with hover. FieldDecorator owns the filled shell; Form must not repaint it. Custom colors and Teleport roots require checking the actual rendered ancestor and composited background, not just the trigger element.

### Message emphasis levels

| Variant | Responsibility | Default |
| --- | --- | --- |
| neutral | Overlay surface, primary content, semantic status icon, secondary close control. | Cedar |
| tonal | Low-emphasis status surface with readable content and semantic icon. | Explicit on both |
| solid | High-emphasis status fill with paired foreground; default/loading use a dedicated dark surface. | Maple |

Both platforms expose `message-{variant}-{status}-{bg|content-color|icon-color|border-color|close-color}`. Status is default/info/success/warning/danger/loading. Existing defaults and geometry remain intact; Maple's previous solid appearance is not called tonal. Migrate old implicit colors directly to the explicit variant without aliases. A shared border-color role does not require adding a mobile border width.

### Definition, consumption and verification

A variable needs an actual CSS, cross-component, reviewed runtime or finite dynamic consumer. Documentation, comments, theme assignment and circular aliases alone are not evidence. Remove ineffective legacy entries; connect declared customization when a real DOM role exists. Generated tables describe transitive CSS reachability, not visual acceptance. Update source, contracts, state/override tests, reference docs and migration notes together. `check:token-reference` prevents generated documentation drift.

## Four layers

| Layer | Responsibility | External use |
| --- | --- | --- |
| Foundation / reference | Raw palettes and scales | Applications should not depend on it directly |
| System | Stable semantics shared by components | Global themes may override it |
| Component | Public customization for one component | Preferred application-level entry point |
| Internal | Component implementation details | External use is forbidden |

## System color semantics

System colors cover surfaces (`page / default / raised / overlay / muted / tooltip`), content (`primary / secondary / tertiary / decorative / disabled / on-dark / on-bright / brand / info / success / warning / danger`), borders (`subtle / default / strong`), primary actions, semantic statuses, and shared interaction states. `on-dark` and `on-bright` are paired foregrounds for known dark and bright surfaces; `decorative` applies only to non-text decoration. Cedar and Maple must map each system color role to the same logical foundation value. `theme-contract.json#systemTokenValues` governs these mappings. Governed public component defaults are registered in `componentTokenValues`; FieldDecorator, Collapse, Dialog, Card, Divider, Empty, and Avatar color semantics are currently covered. Dialog borders, sizing, and layout may differ by platform. Card's floating-button container uses `content-primary` on the expanded card surface; its fixed dark close button uses `content-on-dark`. The `#212121` button background is Card-specific, not the global primary action. Divider lines use `border-default` and labels use `content-secondary`; text spacing is `16px` on Cedar and `8px` on Maple. Empty descriptions use `content-tertiary`, while decorative icons use `content-decorative`. Matching hard-coded values across platforms are not sufficient: component defaults and theme overrides should use the correct system semantics.

Pre-release Card token migration: `--mp-card-close-button-primary-color` → `--mp-card-close-button-background`, without a compatibility alias.

Avatar's governed roles are `content-primary` for text, count, and button icon; `surface-default` for borders; and `content-on-dark` only for the icon over the dark scrim. The default `fill-4` background, `fill-2 → fill-3` trigger-button hover step, and translucent scrim remain component visual values. When changing an instance background with `color`, check text contrast and override `--mp-avatar-text-color` if needed: a system role does not guarantee contrast against an arbitrary background. Maple's dark Avatar background `#303030` is theme-specific.

Badge phase three: fills use `status-*` / `action-primary`, while outline text and borders use `content-info/success/warning/danger/brand`. Neutral default outlines use `content-primary`; secondary and tertiary outlines use `content-secondary`. The public outline background works for all statuses, including instances using `color`. Both libraries use light text for the filled primary Badge in the Maple light brand. Compiled CSS checks cover 640 built-in color combinations and 64 outline-background overrides: minimum text contrast is 4.56:1 for fills and 4.97:1 for outlines. Recheck custom colors and backgrounds; unregistered variables remain pending.

The new semantic content roles use palette step 8 for readable colored text, icons, and matching borders on ordinary neutral surfaces. `content-brand` differs from the main content hierarchy (`content-primary`) and primary action emphasis (`action-primary`); changing the action color alone does not change brand text.

## Public and internal component tokens

Public component tokens use `--mp-{component}-...`, must be documented, and should reference system tokens by default. Applications should customize this layer first.

CSS variables written per instance by props (such as `--mp-divider-opacity`) are runtime value channels, not necessarily theme tokens with `:root` defaults. Component docs must identify their source.

Internal tokens use `--mp-internal-{component}-...`. They support private layout, measurement, or unstable implementation details and must not be used by themes, applications, or public documentation. Promote an internal token to a documented component token when external customization is required.

## Selection order

1. Reuse an existing public component token.
2. Use or introduce a system token for cross-component semantics.
3. Add a public component token for externally customizable component-specific behavior.
4. Use an internal token only for implementation details.
5. Never add unused compatibility aliases to create superficial parity.

Platform control density, touch targets, safe areas, hover capability, and layer implementation may differ. System color roles, same-name component token responsibilities, state names, and public/private boundaries may not differ.

## Complete system-token catalog

Use `--{p}-` below for the platform prefix: `p=c` in Cedar and `p=mp` in Maple. `theme-contract.json#tokens.system` is the machine-checkable list; `systemTokenValues` governs the shared color mappings. Themes may alter palette values, but must not redefine a role's responsibility.

| Color role | Foundation mapping | Intended use |
| --- | --- | --- |
| `surface-page` | `color-bg-1` | Application page background, not dialogs. |
| `surface-default` | `color-bg-2` | Ordinary containers and cards. |
| `surface-raised` | `color-bg-3` | Raised content such as Dialog. |
| `surface-overlay` | `color-bg-5` | Higher popup content surfaces, not translucent scrims. |
| `surface-tooltip` | `#373739` | Dark hint surface in both modes; pair with on-dark. |
| `scrim` | `rgba(0, 0, 0, 0.6)` | Translucent backdrop, not a content surface. |
| `surface-muted` | `color-fill-1` | Weak filled surfaces and default filled controls. |
| `content-primary` | `color-text-1` | Main text, headings, and icons on ordinary surfaces. |
| `content-secondary` | `color-text-2` | Supporting text, secondary actions, and Divider labels. |
| `content-brand` | `primary-8` (RGB) | Brand text, icons, and matching borders on ordinary neutral surfaces. |
| `content-info` | `blue-8` (RGB) | Info text, icons, and matching borders on ordinary neutral surfaces. |
| `content-success` | `success-8` (RGB) | Success text, icons, and matching borders on ordinary neutral surfaces. |
| `content-warning` | `warning-8` (RGB) | Warning text, icons, and matching borders on ordinary neutral surfaces. |
| `content-danger` | `danger-8` (RGB) | Danger text, icons, and matching borders on ordinary neutral surfaces. |
| `content-tertiary` | `color-text-3` | Placeholders and low-emphasis descriptions; verify contrast. |
| `content-decorative` | `color-text-4` | Non-text decoration, such as Empty icons; not readable text. |
| `content-disabled` | `color-text-disabled` | Truly disabled content, not decoration. |
| `content-on-dark` | `color-white` | Text and icons on a known dark surface only. |
| `content-on-bright` | `color-black` | Text and icons on a known bright surface; remains dark in dark mode and requires per-pair contrast checks. |
| `border-subtle/default/strong` | `color-border-1/2/4` | Weak separators, ordinary outlines, stronger interaction outlines. |
| `action-primary` | `color-primary` | Brand actions and focus emphasis, not any dark surface. |
| `status-info/success/warning/danger` | Matching `color-*` palette roles | Status fills and emphasis; readable text on ordinary surfaces uses the matching `content-*` role. |
| `state-hover` | `color-fill-2` | Neutral hover surface on hover-capable devices. |
| `state-selected` | `color-primary-light-1` | Brand-tinted selection surface, not a pressed state. |

| Other system category | Tokens and values | Design purpose |
| --- | --- | --- |
| Spacing | `space-1…8`: `2 / 4 / 6 / 8 / 12 / 16 / 20 / 24px` | Shared padding and gap rhythm. |
| Radius | `radius-sm/md/lg/pill`: `2 / 4 / 8 / 999px` | Control, container, and pill shapes; a circular avatar's `50%` is component geometry. |
| Type size | `font-size-xs/sm/md/lg/xl`: `12 / 13 / 14 / 16 / 18px` | Reusable component text scale. |
| Type weight | `font-weight-regular/medium/semibold`: `400 / 500 / 600` | Normal and emphasized text. |
| Motion | `motion-duration-fast/standard/slow`: `120 / 180 / 240ms`; `motion-easing-standard`: `cubic-bezier(0.4, 0, 0.2, 1)` | Common transitions; respect reduced-motion preferences. |
| Layer | `layer-behind/base/raised`: `-1 / 0 / 1`; `layer-popup/modal`: platform mappings | Relative stack roles, not identical absolute z-indexes. |
| Controls | `control-height-xs/sm/md/lg/xl`, `control-touch-target` | Cedar heights: `28/32/36/40/44px`; Maple: `44/48/52/56/60px`. Both use a `44px` touch target. |

## Designing component tokens

A public name should identify the component, optional part, visual branch, interaction state, and the CSS property it controls: `--{p}-{component}-{part?}-{variant/status/size?}-{state?}-{property}`. Omit dimensions that do not change. Use `background` for a background and `text-color` for text; do not call a dark neutral background `primary-color`. Component defaults normally reference system roles. Component-specific geometry or contrast surfaces may use a documented local value when no cross-component semantic role exists.

Create a state token only when its value differs. State precedence must be explicit in selectors, not accidental source order: a filled input uses `fill-1` by default, `fill-2` on hover, and `fill-3` on focus; focus wins if hover and focus coexist. `focus-visible` means keyboard-visible focus, not every focus event. Disabled controls must not retain hover or focus emphasis.

The preferred resolution path is `foundation → system → component → CSS consumer`. Override a public component token for one component, or a system token/palette value for a global theme. Theme files that override component tokens must preserve their semantics. If a custom background changes, review text, icon, border, and state contrast together. Do not use a `var()` fallback to hide a missing internal system token.

Per-instance variables written from props, such as Divider's `--mp-divider-opacity`, are runtime value channels and may have no `:root` default. Private `--mp-internal-{component}-...` variables are implementation details and must not be promised to consumers. Document whether each CSS variable is a static default, a theme override, or a runtime value.

## Cross-platform change checklist

1. Identify the visual role before choosing a value. Matching hard-coded values do not prove semantic consistency.
2. Reuse an exact existing role; if none fits, define a new system role or document a component exception. Never force an approximate role merely to pass checks.
3. Align Cedar and Maple names, consuming CSS properties, defaults, and theme overrides. Record justified density, touch, or layout differences.
4. Register shared values in `componentTokenValues`; register new system names in `tokens.system` and mappings in `systemTokenValues`. Update component docs and both menu mirrors.
5. Verify light/dark themes, combined hover/focus/disabled states, resolvable references, relevant tests, contract checks, docs, and diff formatting.

FieldDecorator, Collapse, Dialog, Card, Divider, Empty, and Avatar have governed key color defaults; Badge is partially governed. Other existing variables are not automatically compliant. Public renames require a migration mapping and release-stage review; do not keep unused aliases silently.

## Tag: semantic colors and selection

Tag default uses a soft surface, unlike Badge's strong filled background. Semantic text and outline borders use content-brand/info/success/warning/danger; secondary and tertiary use content-secondary. Colored status backgrounds use palette step 1 (primary/blue/success/warning/danger), secondary uses gray-2 and tertiary gray-1. These are component-specific paired surfaces, not new system roles. Neutral default text/icon use content-primary/content-secondary; custom filled text defaults to content-on-dark and requires a sufficiently dark background.

Unchecked checkable tags stay neutral, including hover. Checked semantic colors win over generic hover. Checked neutral default uses fill-2 → fill-3, while checked outline stays transparent. Loading suppresses the governed neutral/status hover feedback. Non-checkable tags render as checked. The controlled checked event contract is unchanged.

color takes precedence over status. text-color explicitly customizes text. Preset palette colors are not semantic status roles. Preset outline/hover/dark token behavior is now governed below; custom contrast, geometry and motion remain outside this batch; Tag is only partially governed. Desktop/mobile dimensions remain intentionally different. Component documentation lists every token and its current default.

The shared contract adds 28 Tag defaults. Run pnpm check:tag-themes in design-ui: compiled Less is checked across both libraries, both brands and both modes, 8 statuses, 2 variants, checked/hover/loading combinations (1024 cascade cases). 640 selected, non-hover, non-loading foreground/background pairs across five system surfaces meet 4.5:1 (minimum 4.681:1). The script uses DOM selector matching and a specificity evaluator for the current selectors; it is not browser visual QA. Preset/custom colors, arbitrary backgrounds and loading opacity are excluded. Extend the checker when selector structures change.

## Alert: information semantics and theme inheritance

Alert has info/success/warning/danger/default statuses and standard/tonal/outline variants. Colored titles, content, icons and outline borders use the corresponding system content roles, not status fill colors. Neutral titles use content-primary, content/icons use content-secondary and borders use border-default.

Standard uses palette step 1 surfaces and step 3 decorative borders; tonal uses the same surface without a border. Outline stays transparent with readable content-colored borders. Neutral filled backgrounds remain component-specific fill-2 surfaces, not a hover role. Title/content/icon tokens remain independent public customization points. The content token also supplies root inheritance for the close icon and unstyled action/slot content; explicitly styled children retain their own colors.

Maple dark inherits the shared color defaults through its dark palette instead of replacing them with separate translucent fills or another info palette. Existing mobile dark geometry is preserved and remains outside color governance. The color prop changes only the background; callers must verify all foregrounds when customizing it. Weak standard borders are decorative and are not guaranteed to meet interactive-control boundary contrast requirements.

All 65 Alert color defaults are registered; geometry/motion remain pending. Run pnpm check:alert-themes (or node bin/alert-theme-check.mjs) in design-ui. Compiled Less covers 120 platform/brand/mode/variant/status combinations, 3000 foreground pairs across five system surfaces, minimum 4.802:1, plus local title/content/icon overrides. Custom backgrounds and independently styled slots are excluded. Selector/cascade checks do not replace browser visual QA. Tag and Alert share the audit utilities.

## Button milestone: variants and interaction colors

This milestone covers Button color/state semantics, not every component or all geometry/motion. All eight statuses, four variants, icon-container, both brands/modes and hover/active/focus-visible/disabled/loading are included without changing Props or events.

The historical status-color tokens now mean solid default backgrounds only. status-text-color controls their contrasting foreground: on-bright for colored/secondary fills, on-dark for light tertiary (on-bright in dark mode), content-primary for neutral default. Maple light's deep orange primary uses on-dark. Historical status-icon-color means readable content for text/outline/tonal and default icon-container, using content-brand/status roles and neutral content roles. status-icon-container-color supplies their soft surfaces: palette step 1, gray-2/1 for secondary/tertiary, surface-muted for default. These historical names remain documented rather than duplicated with aliases. Maple dark inherits the same semantics and only retains geometry overrides.

Solid/tonal/icon-container state opacity is 0.08 hover and 0.12 active. Text/outline use their soft container at 0.5 hover and 1 active, controlled by plain-state-opacity-hover/active. Solid status-state-layer-color is paired with its foreground; neutral default uses content-primary. The shared state-layer-color (surface-page) applies to tonal/icon-container, not every variant. internal-button-state-* variables are private branch-resolution channels. Layers paint behind content inside an isolated stacking context. Active wins hover; blocked states suppress both. Focus-visible is an independent content-brand ring (2px width/offset), not the solid foreground color.

Disabled tokens outrank variant/status/icon-container and suspend color/text-color inline overrides until re-enabled. Loading preserves the palette but blocks interaction; indicators default to currentColor unless loading-color is supplied. Custom colors/styles/slots require the caller to verify contrast. Transient ripple and disabled contrast are excluded from the enabled-text contrast guarantee.

The Button phase added 13 public state-layer tokens and 48 defaults, bringing the total at that milestone to 223; see the floating phase for the current total. Run pnpm check:button-themes or node bin/button-theme-check.mjs in design-ui. Compiled CSS checks 12288 cascade cases and 40960 foreground/background pairs across five surfaces (minimum 4.563:1), plus component interaction tests. Browser spot checks cover basic light/dark variants, disabled styles, keyboard focus and hover stacking. This is not exhaustive cross-browser visual testing; global lint/snapshot debt remains separate. Complete root defaults and theme exceptions are listed in component documentation.

## Floating surfaces, scrims, and arrows

This phase covers Tooltip, Popover, Overlay and Trigger. Two shared roles are added: `sys-color-surface-tooltip: #373739` is a consistently dark compact hint surface in both modes, paired with `content-on-dark` (not a mode-inverting surface); `sys-color-scrim: rgba(0, 0, 0, 0.6)` dims obscured content without fading foreground children. `surface-overlay` remains the solid popup content surface mapped to `color-bg-5`, never a scrim.

Colored Tooltip statuses use action/status fills with `content-on-bright`. Both libraries use `content-on-dark` for the deep-orange Maple light primary. Maple dark no longer overrides Tooltip colors/opacity, Popover background or Overlay background. Default Tooltip opacity is 1 in every built-in theme. Custom opacity/colors require fresh contrast checks.

Tooltip and Popover arrows share their component background with the panel; Popover also shares its border. Wrapper arrow selectors outrank Trigger defaults even if Trigger CSS loads last. Standalone Trigger only defines an arrow, not a business content surface.

Customize public component variables on the actual popup scope (for example via `popup-style`); variables on a reference button do not automatically inherit across Teleport. Tooltip `color` sets panel and arrow backgrounds, while `text-color` sets content text. Explicit `content-style` and `arrow-style` win on their respective nodes; changing one does not synchronize the other. Use `--mp-popover-background` on the popup scope to customize both Popover parts. Internal geometry variables are not public styling APIs. Overlay colors only the backdrop.

The contract adds 35 defaults (Tooltip 23, Popover 4 colors, Overlay 3, Trigger 5), totaling 64 system names, 29 governed system values, and 258 component values. Platform exceptions remain: Popover shadows differ; Maple dark Tooltip keeps 4px radius, 14px font, 8px/16px vertical/horizontal padding; Maple dark Popover keeps a 2px radius. These density exceptions are not semantic differences. Dialog/Popup were outside this floating phase; see the subsequent modal surface phase below.

`check:floating-themes` joins the shared checks: 72 compiled-CSS theme combinations, 320 text pairs across five host surfaces, minimum contrast 5.178:1, plus arrow/panel agreement, public override consumption, and Trigger-last order regression. This is not browser layout testing and excludes arbitrary custom colors, opacity and animation intermediate frames.

## Modal surface phase: Dialog, Drawer and Popup

Both Dialog implementations, Cedar Drawer and Maple Popup now use `sys-color-scrim` through their public backdrop tokens. All three content surfaces use `surface-raised`. Drawer and Popup remain platform-specific components; no unused aliases are created on the other platform.

Maple Dialog previously declared an unconsumed backdrop token referencing a missing foundation variable while rendering a Popup-styled backdrop. Its scoped selector now consumes `dialog-overlay-background`, survives Popup-last loading and leaves standalone Popup unchanged. Maple dark no longer overrides Dialog background/title/content colors or Popup surface/scrim. Dialog status icons use readable `content-info/success/warning/danger` roles rather than status fills.

Drawer uses `content-primary` for header/body (including the close button), `border-default` for separators, and retains geometry. Its unused close-icon-right variable was removed without an alias; header layout and close-btn-margin-left control the close button. Its Less no longer embeds the entire theme; the style entry still imports the foundation.

Popup adds `--mp-popup-content-text-color` mapped to `content-primary`, paired with its raised background. Both defaults are disabled by `unstyled`. Declarations now live in token.less.

### Customization and inheritance

Use system scrim for a global theme and component backdrop tokens for local changes. Apply backdrop variables with overlay-style; Dialog/Drawer panel styles and Popup content style do not inherit to sibling backdrops. Teleport follows actual DOM ancestry, not the Vue call site. Explicit backgroundColor overrides token consumption. Use color alpha, not parent opacity, to dim a backdrop. Multiple scrims still compose and darken; this phase does not change modal stacking behavior.

### Contract and verification

Five existing Dialog mappings changed (scrim plus four status icons). Shared totals stay at 64 system names, 29 governed system values and 258 component values. Five Cedar Drawer colors and three Maple Popup colors are checked by `check:modal-themes` separately from shared defaults.

Compiled Less checks cover 16 platform/brand/mode combinations and 72 foreground pairs, minimum 5.102:1, plus public/global overrides, Dialog/Popup isolation, unstyled behavior and load order. Component regression tests inspect real Teleport targets without transition stubs. This is not browser visual/animation validation; arbitrary custom colors, stacked scrims and intermediate animation frames are excluded. Platform geometry, radius, shadow, timing and layer defaults remain unchanged. Other dark translucent surfaces still need purpose-specific review.

## Feedback phase: Message, Notification and LoadingBar (historical)

> This records the pre-variant milestone. Its old Message names and pending migration have been superseded by the three-variant model above.

This phase governs both Message implementations, Cedar Notification and Maple LoadingBar. Semantics are aligned without silently replacing mobile colored toasts with desktop neutral panels.

Cedar Message/Notification use surface-overlay, border-default, primary content and secondary close controls. Status icons use readable content roles; info is no longer a primary brand fill, loading uses content-brand, and Notification's existing error maps to content-danger. The neutral Notification icon token now has an actual consumer. Panel roots provide readable inherited text for plain action/footer content.

Maple Message keeps its component-specific #333 neutral/loading surface paired with content-on-dark. Colored backgrounds use status fills with content-on-bright. Four public tokens are added: `--mp-message-{info|success|warning|danger}-color`. The general message-color only controls neutral/loading. Icons, plain action content, close controls and currentColor focus outlines inherit the status foreground. Styled slots and child controls must ensure their own contrast.

LoadingBar uses content-brand/content-danger for normal/error strokes: a thin indicator must be distinguishable from its host surface. color/errorColor options override defaults. Custom colors and backdrops require fresh checks.

Maple dark no longer overrides governed colors; geometry is retained. Message/LoadingBar declarations now live in token.less. Cedar Message/Notification rely on the style entry for foundation imports instead of embedding the theme in component Less. After Teleport, variables inherit from actual DOM ancestors, not the Vue call site.

`check:feedback-themes` governs 63 implementation-specific color defaults (25 Cedar Message, 26 Notification, 10 Maple Message, 2 LoadingBar), checks 76 compiled-CSS combinations and 1500 foreground/surface pairs, minimum 4.681:1, plus mappings and public consumers. LoadingBar is checked against five built-in surfaces with the stricter 4.5:1 threshold.

These are not same-name shared component defaults: shared totals stay at 64 system names, 29 governed system values and 258 component defaults. Message token suffixes and background forms still differ and need a separate variant/naming migration. Notification/LoadingBar remain platform-specific without fake counterparts. Geometry, shadow, motion, remaining legacy consumers and close-control interaction details are outside this phase. This is not browser visual testing and excludes arbitrary slot colors, host backgrounds and animation frames.

## Input and menu color phase: Input, AutoComplete and Select

This phase adds 26 shared color defaults: 5 Input, 10 AutoComplete and 11 Select. The total becomes 284; system names/values remain 64/29 and shared component-name contracts remain 35. No public variables were added or renamed.

Input counter-color keeps its field-suffix-text-color dependency. The four input-feedback-{success|warning|error|validating}-color variables now use content-{success|warning|danger|brand}. They color feedback SVGs, not the input background, caret or focus ring. Overriding field-error-color/field-focus-color no longer recolors feedback icons; use the corresponding input-feedback token. FieldDecorator still owns the filled fill1 → fill2 → fill3 progression.

Maple's historical dark Field overrides changed filled states back to fill2/fill3/plain background and replaced content, auxiliary, error and border colors. These color overrides are removed while geometry remains. The audit explicitly loads dark/field.ts so theme overrides cannot silently bypass the existing FieldDecorator semantic contract.

For AutoComplete and Select, popup-bg uses surface-overlay and popup-border-color uses border-default. Default/selected/disabled option backgrounds use surface-overlay; hover uses state-hover. Default/hover/selected text uses content-primary; disabled text uses content-disabled. AutoComplete retains option-bg-default and option-text-color-default naming, while Select uses popup-option-bg and popup-option-text-color. Remaining option suffixes map directly with Select's popup- prefix. Select's popup-group-title-text-color uses content-secondary: a small section heading is readable content, not a disabled label.

AutoComplete maps its public variables onto Select variables locally on its dropdown. Customize the owning component's tokens rather than relying on that adapter. Maple dark no longer supplies separate selected colors. Both platforms derive the same roles from their system theme.

Menu active means keyboard navigation, not pressed state. Color priority is disabled > active/hover > selected > default. Selected font weight remains in effect; custom selected colors still yield to hover while navigating.

The shared check:selection-themes command compiles real Less for both platforms, two brands and light/dark modes: 384 states and 296 contrast pairs. Text/counters/group headings require 4.5:1; non-text feedback icons require 3:1. The overall minimum 3.991:1 belongs to an icon check, not a lower text threshold. Disabled states are checked for precedence and consumption without claiming text contrast compliance. Sentinel colors verify actual public-variable consumers, including the local AutoComplete adapter.

This is not browser visual testing and excludes arbitrary slot colors/backgrounds, pseudo-elements, animation frames and Teleport inheritance. Place popup overrides on actual DOM ancestors or the popup root. Geometry, shadows, Input sizing and Select's historical highlight variables remain outside this phase, as do Checkbox/Radio/Switch/Form/Textarea tokens.

## Choice controls: color roles and state priority (historical)

> This records initial coverage only. Subsequent Switch colors, RadioButton and non-color closure are governed by the current component contract; temporary gaps below are not the current backlog.

Checkbox and Radio each add six shared color defaults (12 total), without renaming public variables. Their control-color, control-color-checked, control-color-error and control-color-disabled suffixes map to content-secondary, content-brand, content-danger and content-disabled. Label text uses content-primary; disabled label text uses content-disabled. Prefix with --c-checkbox-, --mp-checkbox-, --c-radio- or --mp-radio-. Maple defaults now live in token.less; dark overrides retain geometry only.

Disabled wins over error, which wins over checked/indeterminate and unchecked. Hover must not erase selection or validation. Maple error affects the action only, not label text; the disabled label consumes its own token. Cedar fixes hovered error borders, disabled indeterminate checkboxes and disabled hover borders; RadioButton error also wins over ordinary checked styling. Internal Cedar checkmarks/dots use surface-default as a cutout against content-brand/danger, not as a generic foreground for bright fills. Desktop 14px and mobile 24px density remains intentional.

Place variable overrides on actual DOM ancestors. Existing Maple checked-color/unchecked-color props remain inline overrides with precedence over CSS state colors; omit them to inherit system state semantics. Custom slots, backgrounds and inline colors need independent contrast checks.

Switch only receives priority fixes: enabled error overrides unchecked tonal track styling; disabled/loading suppress error and preserve checked identity. Ordinary custom track colors remain supported; error retains its dedicated token. Switch track/handle/text color pairs, complete RadioButton colors, geometry and pseudo-element rendering remain pending.

Run pnpm check:choice-themes or node bin/choice-theme-check.mjs in design-ui (included in check:theme-contract). Compiled CSS checks cover 832 states across platforms, brands and modes; Checkbox/Radio cover 640 contrast pairs, minimum 4.681:1 (text ≥4.5, controls ≥3), plus public override consumers. Switch checks priority only. Disabled contrast, browser visuals, focus rings, pseudo-elements, animation and inline custom colors are excluded.

## Form descriptions and Textarea content

Five shared color defaults are added without new public names: form-label-text-color → content-primary; form-extra-text-color → content-secondary; form-required-symbol-color → content-danger; textarea-placeholder-color and textarea-counter-color → content-secondary. Prefix with --c- or --mp-. Textarea and Maple Form defaults now live in token.less.

Cedar Form feedback text/icons use content-success/warning/danger/brand; tooltip indicators use content-secondary. These remain desktop extensions. Maple FormDetails owns error-message-color (content-danger) and extra-message-color (content-secondary), without dark hard-coded overrides. Maple Form's extra prop renders through FormDetails: customize --mp-form-details-extra-message-color, whereas --mp-form-extra-text-color governs help. Composed components do not automatically alias all child tokens.

Textarea placeholders now consume the public token on both platforms. Default focus/error no longer inject inline placeholder colors on Maple; explicit blur-color/focus-color remain supported in enabled, non-error states. Disabled wins over error and custom text color; disabled placeholders use field-control-text-color-disabled. Hint mode belongs to FieldDecorator's floating label, not the native placeholder token.

Form owns labels and validation feedback; FieldDecorator owns variant surfaces. Cedar's legacy Form rules no longer repaint selection-field backgrounds/borders/shadows, preserving filled progression. Legacy InputTag/Picker adapters and status background tokens still need migration. Geometry, counters and clear-button layout remain platform-specific.

Run pnpm check:form-textarea-themes or node bin/form-textarea-theme-check.mjs (included in check:theme-contract): 276 consumer/state checks and 200 contrast pairs, minimum 4.681:1. Form uses default/muted surfaces; Textarea also checks hover/fill3. Text requires 4.5:1, feedback icons 3:1; disabled contrast is exempt. Compiled ::placeholder selectors and sentinel overrides are checked, not browser pseudo-element rendering or arbitrary backgrounds.

## Switch paired colors

Themes use default / maple brands and light / dark modes. Switch tonal is an appearance, not a theme. The variant and all eight dedicated variables now use tonal; no legacy aliases are retained.

Ten color defaults are governed (eight existing and two new). Prefix suffixes below with --c-switch- / --mp-switch-. The OpenSpec change is Cedar openspec/changes/govern-switch-colors; Maple dark now inherits the same semantic roles.

| Suffix | System role |
| --- | --- |
| track-background | content-secondary |
| track-active-background | content-brand |
| track-error-background | content-danger |
| handle-background | surface-default |
| handle-color | content-brand |
| text-color | surface-default |
| tonal-track-background | surface-muted |
| tonal-border-color | content-secondary |
| tonal-text-color | content-secondary |
| tonal-handle-color | surface-default |

Solid tracks are identifiable control marks (secondary/brand/danger), paired with surface-default cutout text/thumbs. tonal unchecked uses a muted track and secondary outline/thumb/text. Its icon uses opaque surface-default: dark surface-muted is translucent and cannot serve as contrasting foreground. Enabled errors reset track, thumb and text together. Disabled/loading suppress error while preserving checked identity; hover/active/focus do not erase state.

Migration: text-color/handle-color govern solid states; also override the new tonal-text-color/tonal-handle-color for tonal unchecked. tonal-border-color still controls its outline and thumb. Explicit checked-color/unchecked-color override ordinary tracks, not enabled error. loading-color overrides the spinner, otherwise it inherits thumb color. Custom tracks need paired foregrounds. Runtime current-track/loading-color/local-*/scale variables are not public theme defaults.

Run pnpm check:switch-themes or node bin/switch-theme-check.mjs (included in check:theme-contract): 4096 states, 8704 contrast pairs, minimum 4.681:1. Alpha is composited host → track → thumb → icon. Text ≥4.5, nontext/focus ≥3. Line text is not rendered and is excluded. Checks use md size and default/muted hosts; disabled/loading opacity, custom colors/slots, animation frames and browser layout/focus visibility are excluded. Geometry, motion and shadows remain outside this color contract.

## Navigation colors: Tabs and Steps

This phase registers 64 shared color defaults (7 Tabs, 57 Steps), without new public names. Tabs active text/indicators use content-brand, not action-primary. Fine-pointer hover cannot replace selected surfaces; coarse pointers exclude desktop hover. Maple dark inherits semantic defaults.

Steps retains progress identity while disabled. Circle/navigation pairs numbers/icons with node surfaces; dot is a nontext mark. Process/error arrows pair content-brand/danger backgrounds with surface-default cutout text, protected from hover recoloring. Wait/finish backgrounds use surface-muted/state-selected. Ordinary descriptions use content-secondary; wait titles secondary, other ordinary titles primary. Dot marks use secondary/brand/brand/danger. Circle borders remain transparent. Wait connectors use decorative border-default; process/error connectors use brand/danger. Navigation arrows use secondary; navigation-ink-bg now actually controls the indicator independently of hover text.

Run pnpm check:navigation-themes or node bin/navigation-theme-check.mjs: 1792 states, 1792 contrast pairs, minimum 4.681:1. Text/numbers ≥4.5, dots ≥3. Sentinel overrides cover tested consumers, including tab/navigation indicators. Connector geometry, other pseudo-elements, focus rings, animation, custom slots/backgrounds and real browser/touch behavior remain outside this phase. Disabled contrast is exempt.

## Automated closure and remaining visual QA

The original consumer, Message-model and non-color source backlog is resolved. Shared and platform-only components enter the inventory and consumer gate without fake parity aliases or empty counterparts. See token-consumer-resolution, non-color-token-resolution and message-token-resolution in design-ui/audits for decisions and migrations.

Automated checks separately verify resolvable declarations, shared/platform defaults, state/override cascade, reviewed runtime consumers and generated-document drift. Build/type/package checks have their own evidence. None guarantees pixel-level results for arbitrary slot content, business backgrounds or browser combinations.

Remaining QA is environment-based: Safari/Firefox/Chromium state and keyboard regression; physical iOS/Android touch, IME, narrow screens and safe areas; reduced-motion preference changes and animation lifecycles; screen readers, long/multilingual text, zoom, nested Teleport and local overrides. Custom colors require their own contrast checks.

See `design-ui/audits/token-browser-validation.md` for observed and untested browser cases. Zero unreviewed consumers does not promise that no future CSS issue can exist.

## Numeric and progress colors

Twelve shared defaults are registered. CountTo / Countdown text and Statistic value use content-primary. Statistic title, prefix, suffix and extra use content-secondary; its animated CountTo inherits the value color. ProgressGroup text uses content-primary, muted text uses content-secondary, track uses state-hover (neutral fill2, not an interaction), and tooltip uses surface-tooltip / content-on-dark.

ProgressGroup marks use content-brand, with item.color > component color > system default precedence. Percentage, count sign and timer completion do not imply business success or danger. Custom colors require their own contrast validation. Platform geometry and typography remain unchanged; these are color contracts, not full default-value alignment.

Run node bin/numeric-theme-check.mjs (included in check:theme-contract) for compiled CSS consumers, override sentinels, default/muted host contrast, tooltip pairing and animated value inheritance. Browser layout, animation and custom colors are not covered.

## Foundation presentation defaults

Forty defaults are governed: Hover 2, Icon 1, Paper 5, Ripple 2, Skeleton 20, Space 10. Eight system spacing values (2/4/6/8/12/16/20/24px) are now value-governed too.

Hover uses currentColor at 0.04 opacity and explicit focus at 0.12; focus wins instead of stacking. Device category must not suppress explicit focus. Icon inherits host size/color; use size="20" explicitly for the former fixed mobile appearance. Paper uses surface-default / border-default, with 4px radius, 1px border and system slow (240ms) background transition; content color is inherited. Ripple inherits currentColor and retains its expansion curve, not a text-color role.

Skeleton placeholders use neutral fill2 (state-hover), not an actual hover state. Shimmer uses transparent / surface-default / transparent at layer opacity 0.3. Existing geometry is preserved: content padding 16px; card 160px high, radius 4px, bottom gap 16px; avatar 34px, round, gap 16px; title width 50%, radius 10px; rows 12px high, radius 10px, top gap 10px; shape sizes 36/48/60px and radius 4px. Fullscreen remains a placeholder, not a scrim.

Space physical row/column gaps remain xs 4/4, sm 8/6, md 12/8, lg 16/12, xl 24/16px and reference system spacing. Flex direction does not swap axes. Numeric/custom pair sizes bypass preset tokens. Space has no color responsibilities.

Run node bin/foundation-theme-check.mjs: 448 compiled CSS, override, state-priority and spacing checks across both platforms/brands/modes. Browser motion, full reduced-motion/forced-color coverage and arbitrary custom colors remain outside validation.

## Foundation motion policy

Six new component tokens: hover-transition-duration uses system fast (120ms); icon-spin-duration is 1s; ripple-expand-duration / fade-duration are 200ms / 140ms; skeleton-animation-duration is 1s and transition-duration uses system slow (240ms). Existing paper-transition-duration now uses system slow. Both system duration defaults are value-governed.

Use valid nonnegative CSS time values. Spin/shimmer cycle time is distinct from surface transitions. Icon transition remains a millisecond name-change delay. Ripple CSS durations do not change its 250ms lifecycle timers: each visual duration must remain at or below 250ms until runtime timing is redesigned.

Reduced motion removes surface transitions, stops built-in Icon spin/shrink, suppresses Skeleton shimmer and decorative Ripple while preserving host content/events and state feedback. Icon subscribes after mount, renders the latest name immediately on preference changes, cancels pending name timers and removes its listener on unmount. SSR never reads window. Explicit rotate orientation is preserved. Limited important declarations override only inline Icon transition and Ripple opacity. Custom animation classes/external SVG animations remain caller responsibilities.

Run node bin/motion-theme-check.mjs: 80 theme/preference cases and 88 duration overrides, plus Icon runtime tests. This is compiled-CSS and simulated-state validation, not browser-frame or visual acceptance.

## Badge and Tag color boundaries

Badge fallback background now references system status-danger. Its fixed neutral #e0e0e0 background with black content-on-bright and gray-6/gray-7 fills remain intentional component choices. The dark tertiary foreground and Maple light primary foreground remain paired exceptions; redundant Maple dark defaults are removed. The separator ring follows surface-default and may need a local override for other hosts.

All 13 Tag presets now keep selected outline backgrounds transparent and use the preset text token for text and border. Selected default backgrounds consume preset bg/bg-hover tokens; loading suppresses hover. Dark background defaults remain palette-6 at 20%/35% alpha but are declared as tokens, so instance overrides work. Unchecked presets stay neutral. Preset icon-color separately controls icons; text-color does not recolor those preset icons. Unused preset icon-bg-hover declarations have now been removed, as described below.

Color overrides status. Custom default colors set inline background/border; custom outline colors set border and fallback text on transparent background. Text-color overrides text. Unlike presets, custom colors currently remain applied when unchecked. Callers own custom contrast. Root-level overrides must respect theme-selector specificity; prefer instance overrides.

98 existing color defaults are newly governed (566 total). Badge regression checks 288 states, 720 contrast pairs (minimum 4.563:1), and 288 background overrides. Tag adds 1664 preset states and 416 background overrides alongside existing semantic checks. Preset contrast now adds 2080 pairs (minimum 4.529:1) across both platforms, brands, modes, default/outline, hover and five system surfaces. Chromatic foregrounds use palette step 9, gray uses content-secondary, and light gold hover uses step 2. Custom contrast and loading opacity remain excluded; static cascade checks do not replace browser visual QA.

## Token consumer paths

A public declaration must reach a real CSS property through var() references, or have a documented runtime/cross-component consumer. Declarations, theme overrides and cycles alone are not consumers. Compile Less before tracing references.

Both Tags remove 15 ineffective public tokens: the 13 preset {color}-icon-bg-hover names plus icon-hover-size and icon-hover-bg-size. No aliases or replacements; remove application overrides of these ineffective variables. This removes 13 governed color defaults (553 now); the two size variables were name-only contracts.

Previous-stage temporary hold (now removed below): Cedar InputTag still references it through a mixin targeting legacy c-icon-hover DOM, while current Tag uses close-btn. A compiled reference is not visual proof. Review that integration before removal; Maple retains name parity but standalone Tag does not consume it.

check:token-consumers covers only Badge/Tag and rejects unused declarations (the former paired hold is now removed). Graph tests cover alias chains, nested fallbacks, cycles and theme alternatives. DOM reachability, cascade wins, runtime overrides and browser visuals remain separate checks.

## InputTag legacy icon cleanup

Cedar InputTag renders Tag close-btn, not the legacy c-icon-hover element. Remove its obsolete mixin, default/focus pseudo-element rules and redundant custom text rule. Preserve current Tag rendering and deletion behavior; no new hover surface is introduced.

Remove tag-custom-icon-bg-hover on both platforms and Cedar input-tag-tag-remove-icon-color-bg / input-tag-tag-remove-icon-color-bg-focus without replacements or aliases. Maple has no InputTag. Consumer checks now cover 414 Badge/Tag declarations without exemptions and compile InputTag to reject legacy selectors/tokens. Integration tests cover rendered controls, removal, readonly/disabled defaults and custom colors. The 553 governed default count is unchanged; the removed shared token was name-only. Browser visuals and full InputTag governance remain separate.

## InputTag shell versus content

FieldDecorator owns the InputTag shell; Form no longer repaints its background/border/focus shadow. InputTag content rules now match actual FieldDecorator size/focus/disabled classes, with disabled winning over focus. Remove 33 unused legacy shell tokens without aliases; keep 27 content variables. Consumer checks cover 441 declarations including Cedar-only InputTag, and 80 content state combinations are checked. Shared default count remains 553.

Use field variant background tokens, field-border-radius, field-placeholder-text-color and field-clear-icon-color/size for shell customization; prefer the size prop for geometry and do not override internal variables. Removed tokens have no one-to-one replacement. All five sizes are covered, including xl (32px chip height, 16px input text, 4px vertical padding). Content colors use system roles. Parent disabled/readonly overrides child closable/checkable; loading and explicitly non-closable chips cannot be deleted with Backspace. Explicit custom/status colors remain intact while disabled. Cedar browser spot checks covered size layout, keyboard removal and light/dark focus; this is not whole-library visual acceptance.
