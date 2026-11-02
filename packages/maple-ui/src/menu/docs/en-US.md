# Menu

Collects transient commands for the current object, such as overflow actions, context menus and the extra actions of a button. Use [Select](#/en-US/select) to pick form data and [Cascader](#/en-US/cascader) to pick hierarchical data.

The popup is built on the unstyled [Trigger](#/en-US/trigger). It uses the shared twelve placements and the separate `cover` mode, defaulting to `bottom`. Use `auto-fit-popup-width` and `popup-max-height` for width matching and height limits.

## Basic examples

### Overflow Actions

Pass the trigger element through the default slot and describe commands with `options`. `type: 'divider'` renders a separator.

```demo
../example/demos/overflow-actions.vue
```

## Appearance and states

### Disabled State

`disabled` on the menu disables the whole popup; on an option it disables that option and its descendants.

```demo
../example/demos/disabled-state.vue
```

## Options and hierarchy

### Groups, submenus and option content

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `options` | Command tree | Groups, submenus and option content, Selection and visual emphasis |
| `hide-on-select` | Close the popup after activating a command | Selection and visual emphasis |
| `submenu-trigger` | How every submenu level expands | Selection and visual emphasis |
<!-- demo-config-notes:end -->


Compare flat groups, nested menus and option content. Expand or select options to inspect their hierarchy.

<details>
<summary>Configuration details and limits</summary>

#### Option Group

Group commands with `{ type: 'group', children }` inside `options`; no extra group component is needed. A group is purely visual and does not add a level.

#### Submenu

A plain option with `children` becomes a submenu. Every level shares `submenu-trigger`, which expands on tap by default; switching it to `'hover'` applies to all levels too. It cannot be set per option, so a single tree never mixes two expansion styles.

#### Custom Option Content

Prefer passing `icon`, `extra` or a VNode directly on the option; all three also accept a render function receiving `{ option, active, level }`. To render a whole data set uniformly, use the `option-label`, `option-icon` and `option-extra` scoped slots.

`active` means this exact option matches the active value. A active descendant does not select its parent. Descendant selection and submenu opening remain private styling state. MenuOption uses `highlight` for visual emphasis without changing selection.

</details>

```demo
../example/demos/structure-comparison.vue
```

### Selection and visual emphasis

`active` is false on a parent whose child is active. The three examples compare render functions, scoped slots and manual MenuOption content; `highlight` only emphasizes a row.

```demo
../example/demos/active-rendering.vue
```

## Triggers and positioning

### Context Menu

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `trigger` | Root menu trigger | Context Menu, Trigger |
| `options` | Command tree | Context Menu, Positioning strategy |
| `align-point` | Align to the pointer position at activation; stays in place until the next context menu activation | Context Menu |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Placement |
| `strategy` | Positioning strategy inherited by every submenu | Positioning strategy |
| `submenu-trigger` | How every submenu level expands | Positioning strategy |
<!-- demo-config-notes:end -->


Right click inside the target area. Set both `trigger="contextMenu"` and `align-point`. The menu stays at the activation point as the pointer moves; another right click updates its position.

```demo
../example/demos/context-menu.vue
```

### With SplitButton

[SplitButton](#/en-US/split-button) already wraps a button together with a dropdown command menu and describes extra actions through `MenuOption`.

### Trigger

```demo
../example/demos/trigger.vue
```

### Placement

```demo
../example/demos/placement.vue
```

### Positioning strategy

Both root and nested menus use the same reactive `strategy` (`absolute` by default or `fixed`). Changing it does not change selection or close the menu. `popup-container` independently controls mounting; `fixed` does not automatically escape transformed ancestors.

```demo
../example/demos/en-US/positioning.vue
```

### Popup Max Height

```demo
../example/demos/popup-max-height.vue
```

## State and content customization

### Selected Value and Select Event

Use `v-model` to keep the active value. Activating a command emits `update:model-value` first and then `select(value, option, event)`; `select` means a menu item was activated, not that a form value changed.

```demo
../example/demos/selection.vue
```

### Controlled Open State

```demo
../example/demos/controlled.vue
```

### Footer

```demo
../example/demos/footer.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"` and supports runtime and nested overrides. Submenus and horizontal parent/child navigation follow the current reading direction. Vertical and boundary navigation keeps item order and skips disabled items. Portals inherit their source direction; switching direction preserves selection.

## API

### Value and default value

Use ordinary `v-model`. `modelValue` is the selected option value; `defaultValue` initializes uncontrolled state once, and later changes do not reset it. Explicit binding takes precedence. Initialization emits no `update:modelValue`.

### Props

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `options` | Command tree | _MenuOption[]_ | `[]` |
| `field-names` | `label/value/children/disabled` field mapping | _MenuFieldNames_ | `-` |
| `v-model` | Active value | _MenuValue_ | `-` |
| `v-model:open` | Whether the popup is visible | _boolean_ | `-` |
| `default-open` | Uncontrolled default visibility | _boolean_ | `false` |
| `size` | Option size | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `'md'` |
| `trigger` | Root menu trigger | _'click' \| 'hover' \| 'focus' \| 'contextMenu'_ | `'click'` |
| `submenu-trigger` | How every submenu level expands | _'click' \| 'hover'_ | `'click'` |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | _MenuPosition_ | `'bottom'` |
| `strategy` | Positioning strategy inherited by every submenu | _'absolute' \| 'fixed'_ | `'absolute'` |
| `reference` | External trigger element | _string \| HTMLElement_ | `-` |
| `popup-container` | Popup mount container | _string \| HTMLElement \| false_ | `-` |
| `popup-class` | Popup class name | _string \| array \| object_ | `-` |
| `popup-max-height` | Default limit, pixel height, or unlimited | _boolean \| number_ | `true` |
| `offset-x` | Horizontal offset | _string \| number_ | `0` |
| `offset-y` | Vertical offset | _string \| number_ | `0` |
| `mouse-enter-delay` | Hover open delay in ms | _number_ | `100` |
| `mouse-leave-delay` | Hover close delay in ms | _number_ | `100` |
| `close-on-click-reference` | Close when the trigger is clicked again | _boolean_ | `false` |
| `unmount-on-close` | Unmount popup content on close | _boolean_ | `false` |
| `hide-on-select` | Close the popup after activating a command | _boolean_ | `true` |
| `auto-fit-popup-width` | Match the trigger width | _boolean_ | `false` |
| `cover` | Popup covers the trigger | _boolean_ | `false` |
| `align-point` | Align to the pointer position at activation; stays in place until the next context menu activation | _boolean_ | `false` |
| `disabled` | Disable the menu | _boolean_ | `false` |
| `elevation` | Popup shadow level | _boolean \| number_ | `true` |

### MenuOptionData

| Field | Description | Type |
| --- | --- | --- |
| `type` | Plain command, group or divider | _'item' \| 'group' \| 'divider'_ |
| `label` | Main content | _VNodeChild \| (context) => VNodeChild_ |
| `icon` | Leading icon | _VNodeChild \| (context) => VNodeChild_ |
| `extra` | Trailing content such as a shortcut | _VNodeChild \| (context) => VNodeChild_ |
| `value` | Value passed to events on activation | _any_ |
| `children` | Child commands; a plain option with children becomes a submenu | _MenuOption[]_ |
| `disabled` | Disable this item and its descendants | _boolean_ |
| `show` | Whether to render | _boolean_ |
| `ripple` | Whether to show the click ripple | _boolean_ |
| `props` | HTML attributes forwarded to the row element | _HTMLAttributes_ |

The render context is `{ option, active, level }`. `type: 'group'` is visual only and does not add a level; `type: 'divider'` is neither focusable nor activatable.

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `update:model-value` | Active value update request | `value: MenuValue` |
| `select` | A menu item was activated | `value, option, event` |
| `open-change` | Visibility update request | `open: boolean` |
| `open` / `opened` | Popup starts opening / finished opening | `-` |
| `close` / `closed` | Popup starts closing / finished closing | `-` |
| `click-outside` | Clicked outside the popup | `event: Event` |
| `key-escape` | Escape was pressed | `-` |

### Methods

| Method | Description | Arguments |
| --- | --- | --- |
| `open` | Open the popup | `-` |
| `close` | Close the popup | `-` |
| `resize` | Recalculate the popup position | `-` |
| `setReference` | Set the external trigger element | `reference?: HTMLElement` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Trigger element | `-` |
| `content` | Hand-written content, pairs with `MenuOption` | `-` |
| `footer` | Footer | `-` |
| `option-label` | Render every option's main content | `{ option, active, level }` |
| `option-icon` | Render every option's icon | `{ option, active, level }` |
| `option-extra` | Render every option's trailing content | `{ option, active, level }` |

### MenuOption props

Kept for SplitButton and hand-written `content`. Groups and submenus are described through `options` only; there are no `MenuGroup` or `MenuSubmenu` components.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `label` | Main content or render function | _MenuContent_ | `-` |
| `value` | Value passed to events on activation | _any_ | `-` |
| `disabled` | Disable interaction | _boolean_ | `false` |
| `ripple` | Whether to show the click ripple | _boolean_ | `true` |
| `highlight` | Visual emphasis without changing selection | _boolean_ | `false` |

### MenuOption events and slots

`click` fires when the option is not disabled. The `default`, `icon` and `suffix` slots and the `label` render function receive the same `{ option, active, level }` context.

### Keyboard interaction

Root menus support Up/Down, Home/End and Enter. Right enters submenus; Left/Escape returns. Each Escape closes only the topmost popup and restores focus.

## Type definitions

```ts
import type {
  MenuFieldNames,
  MenuInstance,
  MenuOptionData,
  MenuRenderContext,
  MenuSlots,
  MenuOptionSlots,
  MenuPlacement,
  MenuProps,
  MenuSubmenuTrigger,
  MenuOptionProps,
  MenuValue,
} from '@maple-design/ui'
```

## Style variables

Group titles align left with options, using 20px line height plus 4px top/bottom padding, total 28px. Adjacent groups add 8px; the first does not. Titles grow with content without line-height/padding overlap.


| Variable | Default |
| --- | --- |
| `--mp-menu-max-height` | `278px` |
| `--mp-menu-padding` | `4px 0` |
| `--mp-menu-padding-vertical` | `4px` |
| `--mp-menu-border-radius` | `2px` |
| `--mp-menu-border-color` | `var(--mp-color-fill-3)` |
| `--mp-menu-background-color` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-menu-option-xs-height` | `24px` |
| `--mp-menu-option-sm-height` | `30px` |
| `--mp-menu-option-md-height` | `38px` |
| `--mp-menu-option-lg-height` | `46px` |
| `--mp-menu-option-xl-height` | `54px` |
| `--mp-menu-option-padding` | `0 12px` |
| `--mp-menu-option-xs-font-size` | `var(--mp-font-size-xs)` |
| `--mp-menu-option-sm-font-size` | `var(--mp-font-size-sm)` |
| `--mp-menu-option-md-font-size` | `var(--mp-font-size-md)` |
| `--mp-menu-option-lg-font-size` | `var(--mp-font-size-lg)` |
| `--mp-menu-option-xl-font-size` | `var(--mp-font-size-lg)` |
| `--mp-menu-option-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-menu-option-selected-background` | `var(--mp-sys-color-state-hover)` |
| `--mp-menu-option-selected-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-menu-option-bg-hover` | `var(--mp-sys-color-state-hover)` |
| `--mp-menu-option-disabled-color` | `var(--mp-color-text-disabled)` |
| `--mp-menu-option-icon-margin-right` | `8px` |
| `--mp-menu-option-suffix-margin-left` | `16px` |
| `--mp-menu-option-arrow-padding` | `0 6px 0 8px` |
| `--mp-menu-option-arrow-icon-size` | `18px` |
| `--mp-menu-group-title-height` | `20px` |
| `--mp-menu-group-title-padding` | `4px 12px` |
| `--mp-menu-group-title-font-size` | `var(--mp-font-size-sm)` |
| `--mp-menu-group-title-text-color` | `var(--mp-color-text-3)` |

### State and duration variables

Disabled overrides selection, pointer hover and keyboard focus. Selected hover has a separate role inheriting selection background by default and may be overridden. Selected backgrounds paint directly on options, matching Cedar.

| Token | Default |
| --- | --- |
| `--mp-menu-option-bg-selected-hover` | `var(--mp-menu-option-selected-background)` |
| `--mp-menu-option-bg-disabled` | `transparent` |

### Data identity and trigger switching

Reorderable items should provide stable unique values; internal Vue keys derive from business values. Numeric `0`, string `'0'` and boolean `false` remain distinct. Groups, separators and display items without values retain identity through their original option objects; no public key alias is added. Clicking another sibling trigger that is already hover-open closes the previous menu. Clicking inside a submenu does not incorrectly close its parent.


### Placement semantics and configuration

MenuPlacement uses the twelve-value TriggerPlacement domain. Both prop and type describe the preferred popup side relative to its trigger. The old MenuPosition export has been removed.
