# Tabs

Cedar and Maple expose the same simple Tabs / TabPane API and the same advanced TabsNavs / TabNav / TabsItems / TabItem composition. Bind `v-model` on Tabs and use explicit unique string or number `name` values on TabPane, TabNav and TabItem. Vue `key` is separate and is still used for list rendering. Both packages support six variants, controlled/uncontrolled state, lazy mounting, destroy-on-hide, keyboard navigation, RTL and opt-in swipes.

Put navigation and panels inside the same `Tabs`. Use `tab-click(name, event)` for tab click handling, external positioning for custom layouts, and `TabBar` for application-level navigation. The complete props, events, slots, methods and theme variables are documented below.

## Basic examples

### Simplest usage

For the simplest usage, place `TabPane` components with `title` directly inside `Tabs`; navigation and content are generated automatically.

```demo
../example/demos/basic.vue
```

## Appearance and states

### Appearance combinations

Use this example for switching between peer content panels. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

## Appearance and direction

### Visual variants

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `default-value` | `string / number` | Visual variants, Orientation and indicator position, Icons and navigation slots |
| `variant` | `line / card / outline / plain / capsule / enclosed` | Visual variants |
| `size` | `xs / sm / md / lg / xl` | Visual variants |
| `orientation` | Horizontal/vertical axis of tab navigation, default horizontal; affects navigation layout and arrow-key behavior | Orientation and indicator position |
| `indicator-position` | Indicator on the navigation side facing the content (normal) or the opposite side (reverse), default normal; does not use four-side values | Orientation and indicator position |
| `item-class` | `string / object / array` | Custom internal styles |
<!-- demo-config-notes:end -->


```demo
../example/demos/variants.vue
```

### Orientation and indicator position

Switch the orientation and indicator position, or reverse the declaration order of `TabsNavs` and `TabsItems` to place the navigation on the other side of the content.

```demo
../example/demos/position.vue
```

### Icons and navigation slots

```demo
../example/demos/icons-and-slots.vue
```

### Custom internal styles

```demo
../example/demos/custom-style.vue
```

## Navigation and content composition

### Navigation only

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `default-value` | `string / number` | Navigation only |
| `editable` | `boolean` | Navigation only |
| `show-add-button` | `boolean` | Navigation only |
| `auto-switch` | `boolean` | Navigation only |
<!-- demo-config-notes:end -->


When only tab navigation is needed, declare `TabNav` entries inside `TabsNavs` without content components.

```demo
../example/demos/nav-content.vue
```

Navigation props and state combinations:

```demo
../example/demos/navs-review.vue
```

## Content and presentation

### Scrollable navigation and swiping

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `default-value` | `string / number` | Scrollable navigation and swiping |
| `swipeable` | `boolean` | Scrollable navigation and swiping |
| `scroll-position` | Target position or numeric offset of the selected tab within the navigation scroll viewport, default auto; not popup placement | Scrollable navigation and swiping |
<!-- demo-config-notes:end -->


```demo
../example/demos/scrollable.vue
```

## Interaction and dynamic tabs

### Lazy mounting

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `default-value` | `string / number` | Lazy mounting |
| `lazy-load` | `boolean` | Lazy mounting |
| `variant` | `line / card / outline / plain / capsule / enclosed` | Editable tabs |
| `editable` | `boolean` | Editable tabs |
| `show-add-button` | `boolean` | Editable tabs |
| `auto-switch` | `boolean` | Editable tabs |
<!-- demo-config-notes:end -->


```demo
../example/demos/lazy-load.vue
```

### Editable tabs

```demo
../example/demos/editable.vue
```

### Controlled switching

```demo
../example/demos/controlled.vue
```

## API

TabPane, TabNav and TabItem all require unique names. Selection and navigation/panel association use `name`; Vue key controls only node reuse. Provide `:key` separately in loops.

Use ordinary `v-model`. `modelValue` is the selected tab name. `defaultValue` initializes uncontrolled state once without later resets or initialization `update:modelValue`. When provided, the parent value controls selection.

### Tabs Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| model-value | `string / number` | `undefined` | Current selected name; controlled when provided |
| default-value | `string / number` | `undefined` | Initial uncontrolled value; defaults to the first available item |
| variant | `line / card / outline / plain / capsule / enclosed` | `line` | Visual variant |
| size | `xs / sm / md / lg / xl` | Global value or md | Size |
| tab-list-aria-label | `string` | `undefined` | Accessible name for the tab list; explicit aria-label or aria-labelledby on TabsNavs takes precedence |
| orientation | `Orientation`<br>`'horizontal' \| 'vertical'` | `horizontal` | Navigation orientation |
| indicator-position | `TabsIndicatorPosition`<br>`'normal' \| 'reverse'` | `normal` | Indicator on the content side or opposite side |
| editable | `boolean` | `false` | Allow closing tabs |
| show-add-button | `boolean` | `false` | Show the add button in editable mode |
| auto-switch | `boolean` | `false` | Switch to the last available tab after adding |
| lazy-load | `boolean` | `false` | Mount on first activation |
| destroy-on-hide | `boolean` | `false` | Unmount content when hidden |
| justify | `boolean` | `false` | Fill container height in horizontal orientation |
| animation | `boolean` | `false` | Content fade-in animation |
| item-class | `string / object / array` | `undefined` | Inner class for each panel; merged with built-in classes |
| item-style | `StyleValue` | `undefined` | Inner style for each panel; supports string, object or array |
| item-wrapper-class | `string / object / array` | `undefined` | Outer class for each panel; merged with built-in classes |
| item-wrapper-style | `StyleValue` | `undefined` | Outer style for each panel; supports string, object or array |
| tab-class | `string / object / array` | `undefined` | Outer navigation-label class, including title/close button; merged with built-in classes |
| tab-style | `StyleValue` | `undefined` | Outer navigation-label style; supports string, object or array |
| hide-content | `boolean` | `false` | Hide the content area |
| trigger | `click / hover` | `click` | Mouse trigger mode; touch always uses click |
| scroll-position | `TabsScrollPosition`<br>`'start' \| 'end' \| 'center' \| 'auto' \| number` | `auto` | Selected-tab scroll position; numbers are start offsets |
| scroll-buttons | `boolean / auto` | `auto` | Show arrows on overflow; auto hides them on touch devices |
| activation-mode | `automatic / manual` | `automatic` | Whether arrow keys immediately select |
| swipeable | `boolean` | `false` | Horizontal swipe between content panels; no looping |

### Tabs Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:model-value | name: string / number | Request a selected-value update |
| change | name: string / number | Notify on selecting a different available item; controlled mode still requires parent modelValue updates |
| tab-click | name, event: Event | Click an available item, including repeat clicks; hover/arrows/swipes do not emit click |
| add | event: Event | Request adding a tab; the caller updates data |
| delete | name, event: Event | Request removing a tab; the caller updates data |

### TabPane Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name **(required)** | string / number | — | Unique business identifier matching modelValue |
| title | string | undefined | Navigation title |
| disabled | boolean | false | Prevent selecting and closing |
| closable | boolean | true | Show the close button in editable mode |
| item-vertical | boolean | false | Vertical icon/text layout |
| lazy-load | boolean | undefined | Inherit Tabs; explicit false overrides it |
| destroy-on-hide | boolean | undefined | Inherit Tabs; explicit false overrides it |

### TabNav Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name **(required)** | string / number | — | Unique business identifier matching modelValue |
| title | string | undefined | Title |
| disabled | boolean | false | Prevent selecting and closing |
| closable | boolean | true | Show the close button in editable mode |
| item-vertical | boolean | false | Vertical icon/text layout |

TabNav/TabItem associate through the same `name`. Names are unique within a group; number `1` and string `'1'` differ. Vue `key` controls node reuse only; provide `:key` in loops independently. It does not determine selection.

### TabItem Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| name **(required)** | string / number | — | Unique business identifier matching modelValue |
| lazy-load | boolean | undefined | Inherit Tabs; explicit false overrides it |
| destroy-on-hide | boolean | undefined | Inherit Tabs; explicit false overrides it |

Inactive panels always have hidden. The above props determine whether internal state survives. destroy-on-hide overrides lazy-load; active content remains mounted. TabsNavs/TabsItems have no business props.

### TabItem Slots

| Component | Slot | Description |
| --- | --- | --- |
| Tabs | default | TabPane list, or TabsNavs/TabsItems for advanced composition |
| TabPane | default / title | Panel content / custom navigation title |
| TabsNavs | default | TabNav list |
| TabsNavs | prefix / suffix / add-icon | Navigation prefix/suffix areas and add icon |
| TabNav | title / default / icon | title/default slots customize the title; icon supplies an icon |
| TabsItems | default | TabItem list |
| TabItem | default | Panel content |

### TabItem Methods

`TabsNavs.resize(): void` remeasures overflow and scrolls the selected tab into view. ResizeObserver watches size changes automatically.

### Keyboard and direction

Arrow keys skip disabled items and wrap; Home/End reach first/last. Delete requests closing editable tabs. Horizontal uses Left/Right, vertical uses Up/Down. Manual mode moves focus only; Enter/Space activates the native button. `dir="rtl"` supports right-to-left layout. Give TabsNavs an `aria-label` to name navigation.

After a close request, if the focused tab is removed, focus moves to an adjacent enabled tab unless the user has already moved focus elsewhere. When changing panels, focus moves to the new tab only if it was inside the panel being hidden. Horizontal start, end and numeric scroll offsets follow reading direction; the start is on the right in RTL.

In TabPane mode, use tab-list-aria-label to name the tab list. In advanced mode, TabsNavs accepts aria-label or aria-labelledby directly. When using navigation without TabItem, the application is responsible for associating and making external panels accessible.

## Types

Exports TabsName, TabsVariant, TabsTrigger, TabsIndicatorPosition, TabsScrollPosition, TabsActivationMode and Props/Instance/runtime props/`_XxxComponent` for all six components. Both platforms use the same prop definitions.

## Usage notes

Supports xs / sm / md / lg / xl sizes. Cedar inherits ConfigProvider size / rtl. Maple defaults to md and supports setPropsDefaults, explicit size and DOM dir. Inactive panels are hidden, and InfiniteScroll follows panel visibility.

Public types include TabsEmits, TabsSlots, TabPaneSlots, TabsNavsSlots, TabNavSlots, TabsItemsSlots, TabItemSlots and TabsNavsExpose. Only TabsNavs has its own method, resize(). Other members have no own imperative methods/notification events; selection/editing events belong to Tabs.
### Configuration

Matching token suffixes have matching meanings on both platforms, with platform-specific defaults. The variables and their defaults are listed below.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-tabs-active-font-weight` | `var(--mp-sys-font-weight-semibold)` | `font-weight` |
| `--mp-tabs-active-shadow` | `none` | `box-shadow` |
| `--mp-tabs-animation-duration` | `var(--mp-sys-motion-duration-standard)` | `animation` |
| `--mp-tabs-background` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-tabs-border-color` | `var(--mp-sys-color-border-default)` | `background`, `border-color` |
| `--mp-tabs-border-width` | `1px` | `border`, `bottom`, `height` |
| `--mp-tabs-capsule-radius` | `12px` | `border-radius` |
| `--mp-tabs-content-padding` | `var(--mp-sys-space-5)` | `padding-block`, `padding-inline-start` |
| `--mp-tabs-control-height` | `var(--mp-sys-control-height-xs)` | `min-height`, `min-width` |
| `--mp-tabs-focus-offset` | `-3px` | `outline-offset` |
| `--mp-tabs-focus-width` | `2px` | `outline` |
| `--mp-tabs-group-padding` | `var(--mp-sys-space-2)` | `padding` |
| `--mp-tabs-header-padding` | `var(--mp-sys-space-4)` | `padding-inline` |
| `--mp-tabs-hover-background` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-tabs-icon-gap` | `var(--mp-sys-space-3)` | `gap` |
| `--mp-tabs-indicator-radius` | `1px` | `border-radius` |
| `--mp-tabs-indicator-size` | `2px` | `height`, `width` |
| `--mp-tabs-muted-background` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-tabs-nav-gap` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-tabs-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-tabs-size-lg-tab-font-size` | `var(--mp-sys-font-size-lg)` | `font-size` |
| `--mp-tabs-size-lg-tab-height` | `var(--mp-sys-control-height-lg)` | `min-height` |
| `--mp-tabs-size-lg-tab-padding` | `10px var(--mp-sys-space-7)` | `padding` |
| `--mp-tabs-size-md-tab-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-tabs-size-md-tab-height` | `var(--mp-sys-control-height-md)` | `min-height` |
| `--mp-tabs-size-md-tab-padding` | `var(--mp-sys-space-4) var(--mp-sys-space-6)` | `padding` |
| `--mp-tabs-size-sm-tab-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-tabs-size-sm-tab-height` | `var(--mp-sys-control-height-sm)` | `min-height` |
| `--mp-tabs-size-sm-tab-padding` | `var(--mp-sys-space-3) var(--mp-sys-space-5)` | `padding` |
| `--mp-tabs-size-xl-tab-font-size` | `var(--mp-sys-font-size-xl)` | `font-size` |
| `--mp-tabs-size-xl-tab-height` | `var(--mp-sys-control-height-xl)` | `min-height` |
| `--mp-tabs-size-xl-tab-padding` | `var(--mp-sys-space-5) var(--mp-sys-space-8)` | `padding` |
| `--mp-tabs-size-xs-tab-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-tabs-size-xs-tab-height` | `var(--mp-sys-control-height-xs)` | `min-height` |
| `--mp-tabs-size-xs-tab-padding` | `var(--mp-sys-space-2) var(--mp-sys-space-4)` | `padding` |
| `--mp-tabs-tab-gap` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-tabs-title-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-tabs-title-text-color-active` | `var(--mp-sys-color-action-primary)` | `background`, `color`, `outline` |
| `--mp-tabs-title-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-tabs-touch-target` | `var(--mp-sys-control-touch-target)` | `min-height`, `min-width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-tabs-background: var(--mp-sys-color-surface-default);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
