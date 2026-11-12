# NavMenu

NavMenu provides horizontal filter entries with key/label options, independent selection, title fallback, scoped slots and controlled open state.

## Basic examples

### Horizontal filters

```demo
../example/demos/basic.vue
```

All panels fill the viewport width below the entire filter bar. The default popup-layout="full-width" uses content height, capped by the remaining visible height. popup-layout="full" fills all remaining visible height. Custom content owns draft, apply/reset actions and sticky footer layout. Input keyboard and viewport changes update the available region.

## Layout and arrangement

### Long content and fixed actions

Long lists scroll inside the available panel height. A full panel keeps its actions visible while its body scrolls independently, with background scrolling locked.

```demo
../example/demos/long-content.vue
```

## Data and state control

### Controlled state and disabled entries

```demo
../example/demos/controlled.vue
```

## Interaction and control

### Panel state and closing

```demo
../example/demos/panel-state.vue
```

### Cross-platform contract

When using the content slot, the custom panel takes its accessible name from the entry. Set aria-label or aria-labelledby on the entry when needed. Ensure custom entries have a meaningful name.

Both libraries create panel content on first open and retain it when closed or switched, including local drafts and expanded branches. With `unmount-on-close`, content is destroyed after the closing transition and recreated on the next open; the Item's own selected value remains intact. Applications own draft submission, resets and filter application.

Root `close()` requests closing Item panels and restores entry focus without changing selected values, active-item or desktop tree expanded-keys. Controlled open values remain authoritative when closure is rejected. Entries with neither options nor a content slot never open; asynchronous options follow the current open state when they arrive. KeepAlive suspension hides panels and requests closure; controlled state remains authoritative on activation.

Item values, open state, events, slot contexts and `select/close/setOpen` methods share the same contract. Both roots expose `close/resize/setActiveItem`. Names must be unique within the menu; changing a name releases the previous one. Batched swaps and insertions validate the final rendered names. Vertical options expand enabled ancestors of the selected value on initialization and value/options updates. Users can still collapse branches manually.

| Capability | Cedar | Maple |
| --- | --- | --- |
| Root menu | options tree or Item entries; vertical by default | Item filter bar only; horizontal by default |
| popup-layout | dropdown (default) / full-width / full-height / full | full-width (default) / full |
| Panel origin | Individual entry bottom | Entire filter bar bottom; standalone Item uses its own bottom |
| Trigger and placement | trigger / placement | Click to open downward |
| Backdrop and scrolling | Non-modal; background scroll remains available | Root overlay / overlay-closable / lock-scroll / esc-to-close / z-index |
| Theme | theme override | Global theme; no theme prop |
| Tree-only methods | showOption / scrollTo / setCollapsed | — |

Each library exports `NavMenuPopupLayout` with its supported values. Maple's `NavMenuMode` is horizontal only; `options-mode` supports both orientations. The default entry slot replaces the entry's inner content. Maple renders it inside a native button: use non-interactive text/icons and place forms and action buttons in the content slot.

## API

### NavMenu Props

| Prop | Description | Default |
| --------------------------------- | ---------------------------------------------------------------------------------------- | ---------------- |
| mode | Horizontal only on mobile | horizontal |
| active-item | Controlled active named entry; supports v-model:active-item | `undefined` |
| default-active-item | Initial uncontrolled active named entry | `null` |
| size | xs / sm / md / lg / xl | md |
| disabled | Disable all entries | false |
| popup-container | Popup mount container; false renders in place. Does not change viewport layout references; transformed ancestors may change the fixed-position containing block | body |
| popup-class | Additional panel class | — |
| overlay | Show the overlay; false retains a transparent outside-click area | true |
| overlay-closable | Close on overlay click | true |
| lock-scroll | Lock background scrolling during opening and closing transitions | true |
| esc-to-close | Escape closes the current panel | true |
| z-index | Overlay and panel stacking level | Automatically distributed |

Event: update:active-item. Methods: close(), resize(), setActiveItem(key). The default slot contains mp-nav-menu-item; NavMenu.Item is also available.

### NavMenuItem Props

| Prop | Description | Default |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| name | Unique root-level business activation key; omitted entries highlight their selections independently | — |
| label | Entry title when no option matches | — |
| options | Menu options, using the same structure as NavMenu | `[]` |
| field-names | Option field mapping, consistent with NavMenu | `undefined` |
| model-value | Controlled selected key (string, number or null); supports v-model | `undefined` |
| default-value | Initial uncontrolled selected key (string, number or null); read only at initialization | `null` |
| open | Controlled open state; supports v-model:open | `undefined` |
| default-open | Initial uncontrolled open state; read only at initialization | `false` |
| highlight | Visual highlight override; follows business active state when omitted | undefined |
| disabled | Disable the entry, also respecting the parent menu | undefined |
| hide-on-select | Close the panel after select | true |
| unmount-on-close | Destroy panel content after the closing transition; retain it by default | false |
| popup-layout | full-width spans the viewport width with content-driven height; full fills the visible area below the filter bar in both dimensions. Both open below the entire filter bar without automatic flipping; width does not depend on the entry | full-width |
| popup-style | Custom panel styles | — |
| popup-container | Popup mount container; inherits the parent menu when omitted | Follow parent menu |
| popup-class | Additional popup classes; inherits the parent menu when omitted | Follow parent menu |
| options-mode | Vertical / horizontal arrangement of options within the panel | vertical |

A standalone NavMenuItem uses its own bottom edge as the panel origin. Triggering is fixed to click; overflowing entries scroll horizontally. Mobile does not expose placement/trigger, dropdown, or side full-height layouts.

Events: update:model-value, update:open, select(key, option, event), click(event). Methods: select(key, event?), close(), setOpen(open).

Slots: default (entry contents), label, icon, content (replaces the default options panel), option-label, option-icon and option-extra. Entry/content slots receive `{ modelValue, selectedOption, active, open, select, close }`; option slots receive `{ option, active, expanded, level }`.

## Types

NavMenuKey is string | number. NavMenuOption uses key, label, icon, extra, children, disabled, show and props, with type item/group/divider. label/icon/extra accept VNodes or context render functions. Numeric 0 and empty strings are valid keys; missing or duplicate item keys throw. Disabled state is inherited by descendants; hidden items and their subtrees are omitted. All types are exported from @maple-design/ui-vue.

## Reading direction and keyboard interaction

NavMenu inherits the nearest native `dir`, including runtime changes and local overrides. Left/Right moves navigation focus in reading direction; Home/End focuses available boundary entries. Down opens the option panel; Escape closes and returns trigger focus. Horizontal panel keys follow direction while Up/Down keeps existing order. Teleported panels inherit trigger direction. Direction changes do not clear filters or selections.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-nav-menu-active-color` | `var(--mp-sys-color-action-primary)` | `color`, `outline` |
| `--mp-nav-menu-arrow-size` | `6px` | `height`, `width` |
| `--mp-nav-menu-background` | `var(--mp-sys-color-surface-overlay)` | `background` |
| `--mp-nav-menu-border-color` | `var(--mp-sys-color-border-default)` | `border-top` |
| `--mp-nav-menu-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-nav-menu-disabled-color` | `var(--mp-color-text-disabled)` | `color` |
| `--mp-nav-menu-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-nav-menu-gap` | `8px` | `gap` |
| `--mp-nav-menu-height` | `48px` | `min-height` |
| `--mp-nav-menu-padding` | `12px 16px` | `padding` |
| `--mp-nav-menu-panel-padding` | `12px` | `padding`, `padding-bottom` |
| `--mp-nav-menu-size-lg-height` | `56px` | `min-height` |
| `--mp-nav-menu-size-sm-height` | `40px` | `min-height` |
| `--mp-nav-menu-size-xl-height` | `64px` | `min-height` |
| `--mp-nav-menu-size-xs-height` | `32px` | `min-height` |
| `--mp-nav-menu-transition-duration` | `200ms` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-nav-menu-active-color: var(--mp-sys-color-action-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
