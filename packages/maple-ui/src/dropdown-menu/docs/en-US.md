# DropdownMenu

### Intro

Collects transient commands for the current object, such as overflow actions, context menus and the extra actions of a button. Use [Select](#/en-US/select) to pick form data and [Cascader](#/en-US/cascader) to pick hierarchical data.

The popup is built on the unstyled [Trigger](#/en-US/trigger). Placements follow Popper (including `cover-*`) and default to `bottom`. Use `auto-fit-popup-width` and `popup-max-height` for width matching and height limits.

### Overflow Actions

Pass the trigger element through the default slot and describe commands with `options`. `type: 'divider'` renders a separator.

```html
<script setup lang="ts">
  const options = [
    { label: 'Edit', value: 'edit' },
    { label: 'Copy', value: 'copy' },
    { type: 'divider' },
    { label: 'Delete', value: 'delete' },
  ]
</script>

<template>
  <mp-dropdown-menu :options="options">
    <mp-button icon-container aria-label="More actions">
      <m-icon-more />
    </mp-button>
  </mp-dropdown-menu>
</template>
```

### Context Menu

Right click inside the target area. Set both `trigger="contextMenu"` and `align-point`.

```html
<template>
  <mp-dropdown-menu trigger="contextMenu" align-point style="display: block">
    <div class="dropdown-menu-example-area">Right click</div>

    <template #content>
      <mp-menu-option label="Option 1" />
      <mp-menu-option label="Option 2" />
      <mp-menu-option label="Option 3" />
    </template>
  </mp-dropdown-menu>
</template>

<style>
  .dropdown-menu-example-area {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160px;
    background-color: var(--mp-color-fill-2);
  }
</style>
```

### With SplitButton

[SplitButton](#/en-US/split-button) already wraps a button together with a dropdown command menu and describes extra actions through `MenuOption`.

### Active Value and Select Event

Use `v-model` to keep the active value. Activating a command emits `update:model-value` first and then `select(value, option, event)`; `select` means a menu item was activated, not that a form value changed.

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const selected = ref('edit')
  const selectedLabel = ref('Edit')
  const options = [
    { label: 'Edit', value: 'edit' },
    { label: 'Copy', value: 'copy' },
    { label: 'Delete', value: 'delete' },
  ]

  const handleSelect = (_value: unknown, option: { label?: string | number }) => {
    selectedLabel.value = String(option.label ?? '')
  }
</script>

<template>
  <mp-space direction="column">
    <mp-dropdown-menu v-model="selected" :options="options" @select="handleSelect">
      <mp-button>{{ selectedLabel || 'Please select' }}</mp-button>
    </mp-dropdown-menu>
    <span>Current value: {{ selected || '-' }}, last selected: {{ selectedLabel || '-' }}</span>
  </mp-space>
</template>
```

### Option Group

Group commands with `{ type: 'group', children }` inside `options`; no extra group component is needed. A group is purely visual and does not add a level.

```html
<script setup lang="ts">
  const options = [
    {
      type: 'group',
      label: 'File',
      children: [
        { label: 'New', value: 'new' },
        { label: 'Open', value: 'open' },
      ],
    },
    {
      type: 'group',
      label: 'Edit',
      children: [
        { label: 'Copy', value: 'copy' },
        { label: 'Paste', value: 'paste' },
      ],
    },
  ]
</script>

<template>
  <mp-dropdown-menu :options="options">
    <mp-button>Option Group</mp-button>
  </mp-dropdown-menu>
</template>
```

### Submenu

A plain option with `children` becomes a submenu. Every level shares `submenu-trigger`, which expands on tap by default; switching it to `'hover'` applies to all levels too. It cannot be set per option, so a single tree never mixes two expansion styles.

```html
<script setup lang="ts">
  const options = [
    { label: 'Home', value: 'home' },
    {
      label: 'Product',
      children: [
        { label: 'Overview', value: 'overview' },
        {
          label: 'Solutions',
          children: [
            { label: 'Enterprise', value: 'enterprise' },
            { label: 'Team', value: 'team' },
          ],
        },
      ],
    },
    { label: 'About', value: 'about' },
  ]
</script>

<template>
  <mp-dropdown-menu :options="options">
    <mp-button>Submenu</mp-button>
  </mp-dropdown-menu>
</template>
```

### Custom Option Content

Prefer passing `icon`, `extra` or a VNode directly on the option; all three also accept a render function receiving `{ option, active, level }`. To render a whole data set uniformly, use the `option-label`, `option-icon` and `option-extra` scoped slots.

```html
<script setup lang="ts">
  import { h } from 'vue'

  const icon = (text: string) => h('span', { 'aria-hidden': 'true' }, text)
  const options = [
    { label: 'Edit', value: 'edit', icon: icon('✎'), extra: '⌘ E' },
    {
      label: ({ active }: { active: boolean }) => h('strong', active ? 'Copied' : 'Copy'),
      value: 'copy',
      icon: icon('⧉'),
      extra: '⌘ C',
    },
    { label: 'Delete', value: 'delete', icon: icon('⌫'), extra: '⌫', disabled: true },
  ]
</script>

<template>
  <mp-dropdown-menu :options="options">
    <mp-button>Custom Option Content</mp-button>
  </mp-dropdown-menu>
</template>
```

### Trigger

```html
<template>
  <mp-space>
    <mp-dropdown-menu trigger="click">
      <mp-button>Click</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-dropdown-menu>

    <mp-dropdown-menu trigger="hover">
      <mp-button>Hover</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-dropdown-menu>
  </mp-space>
</template>
```

### Disabled

`disabled` on the menu disables the whole popup; on an option it disables that option and its descendants.

```html
<template>
  <mp-space>
    <mp-dropdown-menu disabled>
      <mp-button disabled>Disabled Menu</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
      </template>
    </mp-dropdown-menu>

    <mp-dropdown-menu>
      <mp-button>Disabled Option</mp-button>

      <template #content>
        <mp-menu-option label="Available" />
        <mp-menu-option label="Disabled" disabled />
        <mp-menu-option label="Another available" />
      </template>
    </mp-dropdown-menu>
  </mp-space>
</template>
```

### Popup Max Height

```html
<script setup lang="ts">
  const options = Array.from({ length: 8 }, (_, index) => `Option ${index + 1}`)
</script>

<template>
  <mp-space>
    <mp-dropdown-menu :popup-max-height="120">
      <mp-button>Limit to 120px</mp-button>

      <template #content>
        <mp-menu-option v-for="item in options" :key="item" :label="item" />
      </template>
    </mp-dropdown-menu>

    <mp-dropdown-menu :popup-max-height="false">
      <mp-button>Unlimited</mp-button>

      <template #content>
        <mp-menu-option v-for="item in options" :key="item" :label="item" />
      </template>
    </mp-dropdown-menu>
  </mp-space>
</template>
```

### Controlled Open State

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const open = ref(false)
</script>

<template>
  <mp-space direction="column">
    <mp-button @mousedown.stop @click.stop="open = !open">
      {{ open ? 'Close Menu' : 'Open Menu' }}
    </mp-button>

    <mp-dropdown-menu v-model:open="open">
      <mp-button>Menu Trigger</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-dropdown-menu>
  </mp-space>
</template>
```

### Footer

```html
<template>
  <mp-dropdown-menu>
    <mp-button>Footer</mp-button>

    <template #content>
      <mp-menu-option label="Option 1" />
      <mp-menu-option label="Option 2" />
    </template>

    <template #footer>
      <div style="padding: 8px 12px">Custom Footer</div>
    </template>
  </mp-dropdown-menu>
</template>
```

### Placement

```html
<template>
  <mp-space>
    <mp-dropdown-menu v-for="placement in placements" :key="placement" :placement="placement">
      <mp-button>{{ placement }}</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
        <mp-menu-option label="Option 3" />
      </template>
    </mp-dropdown-menu>
  </mp-space>
</template>

<script setup lang="ts">
  const placements = ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end']
</script>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `options` | Command tree | _DropdownMenuOption[]_ | `[]` |
| `field-names` | `label/value/children/disabled` field mapping | _DropdownMenuFieldNames_ | `-` |
| `v-model` | Active value | _MenuValue_ | `-` |
| `v-model:open` | Whether the popup is visible | _boolean_ | `-` |
| `default-open` | Uncontrolled default visibility | _boolean_ | `false` |
| `size` | Option size | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `'md'` |
| `trigger` | Root menu trigger | _'click' \| 'hover' \| 'focus' \| 'contextMenu'_ | `'click'` |
| `submenu-trigger` | How every submenu level expands | _'click' \| 'hover'_ | `'click'` |
| `placement` | Popup placement | _DropdownMenuPosition_ | `'bottom'` |
| `strategy` | Popper positioning strategy | _'absolute' \| 'fixed'_ | `'absolute'` |
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
| `align-point` | Popup follows the pointer | _boolean_ | `false` |
| `disabled` | Disable the menu | _boolean_ | `false` |
| `elevation` | Popup shadow level | _boolean \| number_ | `true` |

### DropdownMenuOption

| Field | Description | Type |
| --- | --- | --- |
| `type` | Plain command, group or divider | _'item' \| 'group' \| 'divider'_ |
| `label` | Main content | _VNodeChild \| (context) => VNodeChild_ |
| `icon` | Leading icon | _VNodeChild \| (context) => VNodeChild_ |
| `extra` | Trailing content such as a shortcut | _VNodeChild \| (context) => VNodeChild_ |
| `value` | Value passed to events on activation | _any_ |
| `children` | Child commands; a plain option with children becomes a submenu | _DropdownMenuOption[]_ |
| `disabled` | Disable this option and its descendants | _boolean_ |
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

### MenuOption Props

Kept for SplitButton and hand-written `content`. Groups and submenus are described through `options` only; there are no `MenuGroup` or `MenuSubmenu` components.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `label` | Main content | _any_ | `-` |
| `value` | Value passed to events on activation | _any_ | `-` |
| `disabled` | Disabled | _boolean_ | `false` |
| `ripple` | Whether to show the click ripple | _boolean_ | `true` |

### MenuOption Events and Slots

`click` fires when the option is not disabled; slots are `default`, `icon` and `suffix`.

### Keyboard

The root menu supports arrow keys, Home/End and Enter. Submenus are entered with ArrowRight and left with ArrowLeft or Escape; Escape closes only the topmost level and restores focus.

## Types

```ts
import type {
  DropdownMenuFieldNames,
  DropdownMenuInstance,
  DropdownMenuOption,
  DropdownMenuPosition,
  DropdownMenuProps,
  DropdownMenuSubmenuTrigger,
  MenuOptionProps,
  MenuValue,
} from '@maplejs/maple-ui'
```

## Style Variables

| Name | Default |
| --- | --- |
| `--mp-dropdown-menu-max-height` | `278px` |
| `--mp-dropdown-menu-padding` | `4px 0` |
| `--mp-dropdown-menu-padding-vertical` | `4px` |
| `--mp-dropdown-menu-border-radius` | `2px` |
| `--mp-dropdown-menu-border-color` | `var(--mp-color-fill-3)` |
| `--mp-dropdown-menu-background-color` | `var(--mp-color-fill-2)` |
| `--mp-dropdown-menu-option-xs-height` | `24px` |
| `--mp-dropdown-menu-option-sm-height` | `30px` |
| `--mp-dropdown-menu-option-md-height` | `38px` |
| `--mp-dropdown-menu-option-lg-height` | `46px` |
| `--mp-dropdown-menu-option-xl-height` | `54px` |
| `--mp-dropdown-menu-option-padding` | `0 12px` |
| `--mp-dropdown-menu-option-xs-font-size` | `var(--mp-font-size-xs)` |
| `--mp-dropdown-menu-option-sm-font-size` | `var(--mp-font-size-sm)` |
| `--mp-dropdown-menu-option-md-font-size` | `var(--mp-font-size-md)` |
| `--mp-dropdown-menu-option-lg-font-size` | `var(--mp-font-size-lg)` |
| `--mp-dropdown-menu-option-xl-font-size` | `var(--mp-font-size-lg)` |
| `--mp-dropdown-menu-option-text-color` | `var(--mp-color-text-1)` |
| `--mp-dropdown-menu-option-selected-background` | `var(--mp-color-primary)` |
| `--mp-dropdown-menu-option-selected-text-color` | `var(--mp-color-primary)` |
| `--mp-dropdown-menu-option-bg-hover` | `var(--mp-color-fill-3)` |
| `--mp-dropdown-menu-option-disabled-color` | `var(--mp-color-text-disabled)` |
| `--mp-dropdown-menu-option-icon-margin-right` | `8px` |
| `--mp-dropdown-menu-option-suffix-margin-left` | `16px` |
| `--mp-dropdown-menu-option-arrow-padding` | `0 6px 0 8px` |
| `--mp-dropdown-menu-option-arrow-icon-size` | `18px` |
| `--mp-dropdown-menu-group-title-height` | `24px` |
| `--mp-dropdown-menu-group-title-padding` | `8px 12px 4px` |
| `--mp-dropdown-menu-group-title-font-size` | `var(--mp-font-size-sm)` |
| `--mp-dropdown-menu-group-title-text-color` | `var(--mp-color-text-3)` |
