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
| orientation | Horizontal/vertical axis of tab navigation, default horizontal; affects navigation layout and arrow-key behavior | `horizontal` | Navigation orientation |
| indicator-position | Indicator on the navigation side facing the content (normal) or the opposite side (reverse), default normal; does not use four-side values | `normal` | Indicator on the content side or opposite side |
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
| scroll-position | Target position or numeric offset of the selected tab within the navigation scroll viewport, default auto; not popup placement | `auto` | Selected-tab scroll position; numbers are start offsets |
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

### Slots

| Component | Slot | Description |
| --- | --- | --- |
| Tabs | default | TabPane list, or TabsNavs/TabsItems for advanced composition |
| TabPane | default / title | Panel content / custom navigation title |
| TabsNavs | default | TabNav list |
| TabsNavs | prefix / suffix / add-icon | Navigation prefix/suffix areas and add icon |
| TabNav | title / default / icon | title/default slots customize the title; icon supplies an icon |
| TabsItems | default | TabItem list |
| TabItem | default | Panel content |

### Expose

`TabsNavs.resize(): void` remeasures overflow and scrolls the selected tab into view. ResizeObserver watches size changes automatically.

### Keyboard and direction

Arrow keys skip disabled items and wrap; Home/End reach first/last. Delete requests closing editable tabs. Horizontal uses Left/Right, vertical uses Up/Down. Manual mode moves focus only; Enter/Space activates the native button. `dir="rtl"` supports right-to-left layout. Give TabsNavs an `aria-label` to name navigation.

### Types

Exports TabsName, TabsVariant, TabsTrigger, TabsIndicatorPosition, TabsScrollPosition, TabsActivationMode and Props/Instance/runtime props/`_XxxComponent` for all six components. Both platforms use the same prop definitions.

## Style variables

Matching token suffixes have matching meanings on both platforms, with platform-specific defaults. The variables and their defaults are listed below.

| Variable | Default |
| --- | --- |
| `--mp-tabs-background` | `var(--mp-sys-color-surface-default)` |
| `--mp-tabs-title-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tabs-title-text-color-active` | `var(--mp-sys-color-content-brand)` |
| `--mp-tabs-title-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-tabs-muted-background` | `var(--mp-sys-color-surface-muted)` |
| `--mp-tabs-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-tabs-hover-background` | `var(--mp-sys-color-state-hover)` |
| `--mp-tabs-nav-gap` | `var(--mp-sys-space-2)` |
| `--mp-tabs-tab-gap` | `var(--mp-sys-space-2)` |
| `--mp-tabs-header-padding` | `var(--mp-sys-space-4)` |
| `--mp-tabs-control-height` | `var(--mp-sys-control-height-xs)` |
| `--mp-tabs-touch-target` | `var(--mp-sys-control-touch-target)` |
| `--mp-tabs-border-width` | `1px` |
| `--mp-tabs-focus-width` | `2px` |
| `--mp-tabs-focus-offset` | `-3px` |
| `--mp-tabs-radius` | `var(--mp-sys-radius-md)` |
| `--mp-tabs-icon-gap` | `var(--mp-sys-space-3)` |
| `--mp-tabs-content-padding` | `var(--mp-sys-space-5)` |
| `--mp-tabs-indicator-size` | `2px` |
| `--mp-tabs-indicator-radius` | `1px` |
| `--mp-tabs-animation-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-tabs-active-font-weight` | `var(--mp-sys-font-weight-semibold)` |
| `--mp-tabs-group-padding` | `var(--mp-sys-space-2)` |
| `--mp-tabs-capsule-radius` | `12px` |
| `--mp-tabs-active-shadow` | `none` |
| `--mp-tabs-size-xs-tab-height` | `var(--mp-sys-control-height-xs)` |
| `--mp-tabs-size-xs-tab-padding` | `var(--mp-sys-space-2) var(--mp-sys-space-4)` |
| `--mp-tabs-size-xs-tab-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-tabs-size-sm-tab-height` | `var(--mp-sys-control-height-sm)` |
| `--mp-tabs-size-sm-tab-padding` | `var(--mp-sys-space-3) var(--mp-sys-space-5)` |
| `--mp-tabs-size-sm-tab-font-size` | `var(--mp-sys-font-size-sm)` |
| `--mp-tabs-size-md-tab-height` | `var(--mp-sys-control-height-md)` |
| `--mp-tabs-size-md-tab-padding` | `var(--mp-sys-space-4) var(--mp-sys-space-6)` |
| `--mp-tabs-size-md-tab-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-tabs-size-lg-tab-height` | `var(--mp-sys-control-height-lg)` |
| `--mp-tabs-size-lg-tab-padding` | `10px var(--mp-sys-space-7)` |
| `--mp-tabs-size-lg-tab-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-tabs-size-xl-tab-height` | `var(--mp-sys-control-height-xl)` |
| `--mp-tabs-size-xl-tab-padding` | `var(--mp-sys-space-5) var(--mp-sys-space-8)` |
| `--mp-tabs-size-xl-tab-font-size` | `var(--mp-sys-font-size-xl)` |

## Independent source copies and public types

Both platforms independently maintain Tabs, TabPane, TabsNavs, TabNav, TabsItems and TabItem without cross-library runtimes or generic platform configuration. All xs/sm/md/lg/xl sizes are implemented. Cedar inherits ConfigProvider size/rtl. Maple defaults to md and supports setPropsDefaults, explicit size and DOM dir. Panels use native hidden; InfiniteScroll observes visibility directly rather than old panel registration.

Public types include TabsEmits, TabsSlots, TabPaneSlots, TabsNavsSlots, TabNavSlots, TabsItemsSlots, TabItemSlots and TabsNavsExpose. Only TabsNavs has its own method, resize(). Other members have no own imperative methods/notification events; selection/editing events belong to Tabs.
