# NavMenu

Migrated from Cedar NavMenu.Item, retaining component names, key/label options, independent v-model selection, title fallback, named activation, slot contexts and controlled open state. Maple provides horizontal filter entries only.

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

### Panel state and closing

```demo
../example/demos/panel-state.vue
```

### Cross-platform contract

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

### NavMenu

| Prop | Description | Default |
| --------------------------------- | ---------------------------------------------------------------------------------------- | ---------------- |
| mode | Horizontal only on mobile | horizontal |
| active-item / default-active-item | Controlled / initial active named entry | undefined / null |
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

### NavMenuItem

| Prop | Description | Default |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| name | Unique root-level business activation key; omitted entries highlight their selections independently | — |
| label | Entry title when no option matches | — |
| options / field-names | Cedar-compatible options and field mapping | [] / — |
| model-value / default-value | Controlled / initial selected key; supports strings, numbers and null | undefined / null |
| open / default-open | Controlled / initial open state | undefined / false |
| highlight | Visual highlight override; follows business active state when omitted | undefined |
| disabled | Disable the entry, also respecting the parent menu | undefined |
| hide-on-select | Close the panel after select | true |
| unmount-on-close | Destroy panel content after the closing transition; retain it by default | false |
| popup-layout | full-width spans the viewport width with content-driven height; full fills the visible area below the filter bar in both dimensions. Both open below the entire filter bar without automatic flipping; width does not depend on the entry | full-width |
| popup-style | Custom panel styles | — |
| popup-container / popup-class | Override the parent menu mount container / panel class | Follow parent menu |
| options-mode | Vertical / horizontal arrangement of options within the panel | vertical |

A standalone NavMenuItem uses its own bottom edge as the panel origin. Triggering is fixed to click; overflowing entries scroll horizontally. Mobile does not expose placement/trigger, dropdown, or side full-height layouts.

Events: update:model-value, update:open, select(key, option, event), click(event). Methods: select(key, event?), close(), setOpen(open).

Slots: default (entry contents), label, icon, content (replaces the default options panel), option-label, option-icon and option-extra. Entry/content slots receive `{ modelValue, selectedOption, active, open, select, close }`; option slots receive `{ option, active, expanded, level }`.

## Type definitions

NavMenuKey is string | number. NavMenuOption uses key, label, icon, extra, children, disabled, show and props, with type item/group/divider. label/icon/extra accept VNodes or context render functions. Numeric 0 and empty strings are valid keys; missing or duplicate item keys throw. Disabled state is inherited by descendants; hidden items and their subtrees are omitted. All types are exported from @maple-design/ui.

## Style variables

| Variable | Default |
| --------------------------------- | ----------------------------------- |
| --mp-nav-menu-background | var(--mp-sys-color-surface-overlay) |
| --mp-nav-menu-color | var(--mp-sys-color-content-primary) |
| --mp-nav-menu-active-color | var(--mp-sys-color-content-brand) |
| --mp-nav-menu-disabled-color | var(--mp-color-text-disabled) |
| --mp-nav-menu-border-color | var(--mp-sys-color-border-default) |
| --mp-nav-menu-height | 48px |
| --mp-nav-menu-size-xs-height | 32px |
| --mp-nav-menu-size-sm-height | 40px |
| --mp-nav-menu-size-lg-height | 56px |
| --mp-nav-menu-size-xl-height | 64px |
| --mp-nav-menu-font-size | var(--mp-font-size-md) |
| --mp-nav-menu-padding | 12px 16px |
| --mp-nav-menu-gap | 8px |
| --mp-nav-menu-arrow-size | 6px |
| --mp-nav-menu-panel-padding | 12px |
| --mp-nav-menu-transition-duration | 200ms |


## Reading direction and keyboard interaction

NavMenu mirrors horizontal keyboard navigation and supports native nested direction scopes. Down opens the option panel; Escape returns focus. Teleported panels retain their Item direction and update live without clearing filters or selection.
