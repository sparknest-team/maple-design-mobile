# Tabs

Cedar and Maple expose the same simple Tabs / TabPane API and the same advanced TabsNavs / TabNav / TabsItems / TabItem composition. Bind `v-model` on Tabs and use explicit unique string or number `name` values on TabPane, TabNav and TabItem. Vue `key` is separate and is still used for list rendering. Both packages support six variants, controlled/uncontrolled state, lazy mounting, destroy-on-hide, keyboard navigation, RTL and opt-in swipes.

Put navigation and panels inside the same `Tabs`. Use `tab-click(name, event)` for tab click handling, external positioning for custom layouts, and `TabBar` for application-level navigation. All props, events, slots, methods and theme variables are listed in the [shared API reference](./zh-CN.md).

## Examples


### Appearance combinations

Use this example for switching between peer content panels. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

<!-- api-review:start -->
### 组合审查 / API review

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

### Simplest usage

For the simplest usage, place `TabPane` components with `title` directly inside `Tabs`; navigation and content are generated automatically.

```demo
../example/demos/basic.vue
```

### Navigation only

When only tab navigation is needed, declare `TabNav` entries inside `TabsNavs` without content components.

```demo
../example/demos/nav-content.vue
```

Navigation props and state combinations:

```demo
../example/demos/navs-review.vue
```

### Visual variants

```demo
../example/demos/variants.vue
```

### Scrollable navigation and swiping

```demo
../example/demos/scrollable.vue
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

### Editable tabs

```demo
../example/demos/editable.vue
```

### Controlled switching

```demo
../example/demos/controlled.vue
```

### Lazy mounting

```demo
../example/demos/lazy-load.vue
```

### Custom internal styles

```demo
../example/demos/custom-style.vue
```

## Styling hooks

Tabs exposes `item-class` / `item-style` for each content inner element, `item-wrapper-class` / `item-wrapper-style` for each tabpanel wrapper, and `tab-class` / `tab-style` for each navigation item wrapper. Classes merge with internal classes; styles accept Vue StyleValue. All six props update reactively. `body-padding` and `header-padding` are removed; customize content spacing through `item-style` and header spacing through TabsNavs style or CSS tokens.

## Independent source and public types

Both libraries contain their own copies of Tabs, TabPane, TabsNavs, TabNav, TabsItems and TabItem. There is no cross-library runtime or platform module. All five size presets are implemented. Cedar inherits ConfigProvider size/RTL; Maple defaults to md, supports setPropsDefaults, and uses explicit size/DOM dir. Panel visibility uses native hidden; InfiniteScroll observes that visibility directly.

Public types include TabsEmits, TabsSlots, TabPaneSlots, TabsNavsSlots, TabNavSlots, TabsItemsSlots, TabItemSlots and TabsNavsExpose. The only component-specific exposed method is TabsNavs.resize(). Other members have no own imperative methods or events; selection/edit events belong to Tabs.
