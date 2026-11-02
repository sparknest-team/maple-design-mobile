<!-- Source: src/menu/docs/en-US.md; locale: en-US; page: /en-US/menu -->

# Menu

Collects transient commands for the current object, such as overflow actions, context menus and the extra actions of a button. Use [Select](#/en-US/select) to pick form data and [Cascader](#/en-US/cascader) to pick hierarchical data.

## Examples

The popup is built on the unstyled [Trigger](#/en-US/trigger). It uses the shared twelve placements and the separate `cover` mode, defaulting to `bottom`. Use `auto-fit-popup-width` and `popup-max-height` for width matching and height limits.

### Overflow Actions

Pass the trigger element through the default slot and describe commands with `options`. `type: 'divider'` renders a separator.

Example source: src/menu/example/demos/overflow-actions.vue

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { IconMore } from '@maple-design/icons-vue'

const actionOptions = computed(() => [
  { label: '编辑', value: 'edit' },
  { label: '复制', value: 'copy' },
  { type: 'divider' },
  { label: '删除', value: 'delete' },
])
</script>

<template>
  <mp-menu :options="actionOptions">
    <mp-button variant="tonal" :elevation="false" aria-label="更多操作"
      ><template #icon>
        <mp-icon><IconMore /></mp-icon></template
    ></mp-button>
  </mp-menu>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
```

### Context Menu

Right click inside the target area. Set both `trigger="contextMenu"` and `align-point`. The menu stays at the activation point as the pointer moves; another right click updates its position.

Example source: src/menu/example/demos/context-menu.vue

```vue
<script setup lang="ts">
const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
]
</script>

<template>
  <mp-menu trigger="contextMenu" align-point :options="options" style="display: block">
    <div class="mp-menu-context-target">右键点击</div>
  </mp-menu>
</template>

<style scoped>
.mp-menu-context-target {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-sys-color-surface-muted);
}
</style>
```

### With SplitButton

[SplitButton](#/en-US/split-button) already wraps a button together with a dropdown command menu and describes extra actions through `MenuOption`.

### Selected Value and Select Event

Use `v-model` to keep the active value. Activating a command emits `update:model-value` first and then `select(value, option, event)`; `select` means a menu item was activated, not that a form value changed.

Example source: src/menu/example/demos/selection.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const active = ref('edit')
const selectedLabel = ref('编辑')
const selectionOptions = computed(() => [
  { label: '编辑', value: 'edit' },
  { label: '复制', value: 'copy' },
  { label: '删除', value: 'delete' },
])
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  selectedLabel.value = String(option.label ?? '')
}
</script>

<template>
  <mp-space direction="column">
    <mp-menu v-model="active" :options="selectionOptions" @select="handleSelect">
      <mp-button>{{ selectedLabel || '请选择操作' }}</mp-button>
    </mp-menu>
    <span>当前值：{{ active || '-' }}，最近选择：{{ selectedLabel || '-' }}</span>
  </mp-space>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
```

### Option Group

Group commands with `{ type: 'group', children }` inside `options`; no extra group component is needed. A group is purely visual and does not add a level.

Example source: src/menu/example/demos/group.vue

```vue
<script setup lang="ts">
import { computed } from 'vue'

const groupOptions = computed(() => [
  {
    type: 'group',
    label: '文件操作',
    children: [
      { label: '新建', value: 'new' },
      { label: '打开', value: 'open' },
    ],
  },
  {
    type: 'group',
    label: '编辑操作',
    children: [
      { label: '复制', value: 'copy' },
      { label: '粘贴', value: 'paste' },
    ],
  },
])
</script>

<template>
  <mp-menu :options="groupOptions">
    <mp-button>选项分组</mp-button>
  </mp-menu>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
```

### Submenu

A plain option with `children` becomes a submenu. Every level shares `submenu-trigger`, which expands on tap by default; switching it to `'hover'` applies to all levels too. It cannot be set per option, so a single tree never mixes two expansion styles.

Example source: src/menu/example/demos/submenu.vue

```vue
<script setup lang="ts">
import { computed } from 'vue'

const submenuOptions = computed(() => [
  { label: '首页', value: 'home' },
  {
    label: '产品',
    children: [
      { label: '产品概览', value: 'overview' },
      {
        label: '解决方案',
        children: [
          { label: '企业版', value: 'enterprise' },
          { label: '团队版', value: 'team' },
        ],
      },
    ],
  },
  { label: '关于我们', value: 'about' },
])
</script>

<template>
  <mp-menu :options="submenuOptions">
    <mp-button>多级菜单</mp-button>
  </mp-menu>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
```

### Custom Option Content

Prefer passing `icon`, `extra` or a VNode directly on the option; all three also accept a render function receiving `{ option, active, level }`. To render a whole data set uniformly, use the `option-label`, `option-icon` and `option-extra` scoped slots.

`active` means this exact option matches the active value. A active descendant does not select its parent. Descendant selection and submenu opening remain private styling state. MenuOption uses `highlight` for visual emphasis without changing selection.

Example source: src/menu/example/demos/option-content.vue

```vue
<script setup lang="ts">
import { computed, h } from 'vue'

const inlineIcon = (text: string) => h('span', { 'aria-hidden': 'true' }, text)
const contentOptions = computed(() => [
  { label: '编辑', value: 'edit', icon: inlineIcon('✎'), extra: '⌘ E' },
  {
    label: ({ active }: { active: boolean }) => h('strong', active ? '已选中复制' : '复制'),
    value: 'copy',
    icon: inlineIcon('⧉'),
    extra: '⌘ C',
  },
  { label: '删除', value: 'delete', icon: inlineIcon('⌫'), extra: '⌫', disabled: true },
])
</script>

<template>
  <mp-menu :options="contentOptions">
    <mp-button>自定义选项内容</mp-button>
  </mp-menu>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
```

### Selection and visual emphasis

`active` is false on a parent whose child is active. The three examples compare render functions, scoped slots and manual MenuOption content; `highlight` only emphasizes a row.

Example source: src/menu/example/demos/active-rendering.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { MenuRenderContext } from '@maple-design/ui'

const selectedValue = ref('account')
const status = ({ active }: MenuRenderContext) => (active ? '当前项已选中' : '当前项未选中')
const options = [
  {
    label: '设置',
    value: 'settings',
    extra: status,
    children: [
      { label: '账户', value: 'account', extra: status },
      { label: '通知', value: 'notifications', extra: status },
    ],
  },
  { label: '帮助', value: 'help', extra: status },
]
const helpLabel = ({ active }: MenuRenderContext) => (active ? '帮助（已选中）' : '帮助（未选中，仅视觉强调）')
</script>

<template>
  <p>当前值：{{ selectedValue }}。默认选中“账户”；父分支“设置”处于选中路径，但 active=false。</p>
  <mp-space wrap>
    <mp-menu v-model="selectedValue" :options="options" :hide-on-select="false" submenu-trigger="click">
      <mp-button>渲染函数中的 active</mp-button>
    </mp-menu>
    <mp-menu v-model="selectedValue" :options="options" :hide-on-select="false" submenu-trigger="click">
      <mp-button>作用域插槽中的 active</mp-button>
      <template #option-extra="{ active }">
        <mp-tag :status="active ? 'primary' : 'default'">{{ active ? '当前项已选中' : '当前项未选中' }}</mp-tag>
      </template>
    </mp-menu>
    <mp-menu v-model="selectedValue" :hide-on-select="false">
      <mp-button>自定义子项与 highlight</mp-button>
      <template #content>
        <mp-menu-option value="account">
          <template #default="{ active }">账户：{{ active ? '已选中' : '未选中' }}</template>
        </mp-menu-option>
        <mp-menu-option value="help" :label="helpLabel" highlight />
      </template>
    </mp-menu>
  </mp-space>
</template>
```

### Trigger

Example source: src/menu/example/demos/trigger.vue

```vue
<script setup lang="ts"></script>

<template>
  <mp-space wrap>
    <mp-menu trigger="click">
      <mp-button>点击触发</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-menu>

    <mp-menu trigger="hover">
      <mp-button>悬浮触发</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-menu>
  </mp-space>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
```

### Disabled State

`disabled` on the menu disables the whole popup; on an option it disables that option and its descendants.

Example source: src/menu/example/demos/disabled-state.vue

```vue
<script setup lang="ts"></script>

<template>
  <mp-space wrap>
    <mp-menu disabled>
      <mp-button disabled>菜单禁用</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
      </template>
    </mp-menu>

    <mp-menu>
      <mp-button>选项禁用</mp-button>

      <template #content>
        <mp-menu-option label="可用选项" />
        <mp-menu-option label="禁用选项" disabled />
        <mp-menu-option label="另一个可用选项" />
      </template>
    </mp-menu>
  </mp-space>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
```

### Popup Max Height

Example source: src/menu/example/demos/popup-max-height.vue

```vue
<script setup lang="ts">
const longOptions = Array.from({ length: 8 }, (_, index) => `Option ${index + 1}`)
</script>

<template>
  <mp-space wrap>
    <mp-menu :popup-max-height="120">
      <mp-button>限制为 120px</mp-button>

      <template #content>
        <mp-menu-option v-for="item in longOptions" :key="item" :label="item" />
      </template>
    </mp-menu>

    <mp-menu :popup-max-height="false">
      <mp-button>不限制高度</mp-button>

      <template #content>
        <mp-menu-option v-for="item in longOptions" :key="item" :label="item" />
      </template>
    </mp-menu>
  </mp-space>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
```

### Controlled Open State

Example source: src/menu/example/demos/controlled.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const controlledOpen = ref(false)
</script>

<template>
  <mp-space direction="column">
    <mp-button @mousedown.stop @click.stop="controlledOpen = !controlledOpen">
      {{ controlledOpen ? '关闭菜单' : '打开菜单' }}
    </mp-button>

    <mp-menu v-model:open="controlledOpen">
      <mp-button>菜单触发器</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
      </template>
    </mp-menu>
  </mp-space>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
```

### Footer

Example source: src/menu/example/demos/footer.vue

```vue
<script setup lang="ts"></script>

<template>
  <mp-menu>
    <mp-button>页脚</mp-button>

    <template #content>
      <mp-menu-option label="Option 1" />
      <mp-menu-option label="Option 2" />
    </template>

    <template #footer>
      <div class="menu-example-footer">自定义页脚</div>
    </template>
  </mp-menu>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
```

### Placement

Example source: src/menu/example/demos/placement.vue

```vue
<script setup lang="ts">
const placements = ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end'] as const
</script>

<template>
  <mp-space wrap>
    <mp-menu v-for="placement in placements" :key="placement" :placement="placement">
      <mp-button>{{ placement }}</mp-button>

      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
        <mp-menu-option label="Option 3" />
      </template>
    </mp-menu>
  </mp-space>
</template>

<style>
.menu-example-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background-color: var(--mp-color-fill-2);
}

.menu-example-footer {
  padding: 8px 12px;
}
</style>
```

### Positioning strategy

Both root and nested menus use the same reactive `strategy` (`absolute` by default or `fixed`). Changing it does not change selection or close the menu. `popup-container` independently controls mounting; `fixed` does not automatically escape transformed ancestors.

Example source: src/menu/example/demos/en-US/positioning.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { MenuStrategy } from '@maple-design/ui'

const strategy = ref<MenuStrategy>('fixed')
const options = [
  {
    label: 'Actions',
    children: [
      {
        label: 'Export',
        children: [
          { label: 'CSV', value: 'csv' },
          { label: 'JSON', value: 'json' },
        ],
      },
      { label: 'Copy', value: 'copy' },
    ],
  },
]
</script>

<template>
  <mp-space direction="column">
    <mp-button @click="strategy = strategy === 'fixed' ? 'absolute' : 'fixed'">
      Toggle positioning：{{ strategy }}
    </mp-button>
    <mp-menu :strategy="strategy" :options="options" submenu-trigger="click">
      <mp-button>Open three-level menu</mp-button>
      <template #footer>
        <mp-button variant="text" @click.stop="strategy = strategy === 'fixed' ? 'absolute' : 'fixed'">
          Switch while open：{{ strategy }}
        </mp-button>
      </template>
    </mp-menu>
    <small
      >The strategy applies to every submenu. The mounting container is controlled separately by popup-container.</small
    >
  </mp-space>
</template>
```

## API

### Model and default value

Use ordinary `v-model`. `modelValue` is the active option value. `defaultValue` initializes uncontrolled state only at creation; changing it later does not reset the current state. A supplied model takes precedence. Initialization emits no `update:modelValue`.

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `options` | Command tree | _MenuOption[]_ | `[]` |
| `field-names` | `label/value/children/disabled` field mapping | _MenuFieldNames_ | `-` |
| `v-model` | Active value | _MenuValue_ | `-` |
| `v-model:open` | Whether the popup is visible | _boolean_ | `-` |
| `default-open` | Uncontrolled default visibility | _boolean_ | `false` |
| `size` | Option size | _'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'_ | `'md'` |
| `trigger` | Root menu trigger | _'click' \| 'hover' \| 'focus' \| 'contextMenu'_ | `'click'` |
| `submenu-trigger` | How every submenu level expands | _'click' \| 'hover'_ | `'click'` |
| `placement` | Popup placement | _MenuPosition_ | `'bottom'` |
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
| `label` | Content or render function | _MenuContent_ | `-` |
| `value` | Value passed to events on activation | _any_ | `-` |
| `disabled` | Disabled | _boolean_ | `false` |
| `ripple` | Whether to show the click ripple | _boolean_ | `true` |
| `highlight` | Visual emphasis without changing selection | _boolean_ | `false` |

### MenuOption Events and Slots

`click` fires when the option is not disabled. The `default`, `icon` and `suffix` slots and the `label` render function receive the same `{ option, active, level }` context.

### Keyboard

The root menu supports arrow keys, Home/End and Enter. Submenus are entered with ArrowRight and left with ArrowLeft or Escape; Escape closes only the topmost level and restores focus.

## Types

```ts
import type {
  MenuFieldNames,
  MenuInstance,
  MenuOptionData,
  MenuRenderContext,
  MenuSlots,
  MenuOptionSlots,
  MenuPosition,
  MenuProps,
  MenuSubmenuTrigger,
  MenuOptionProps,
  MenuValue,
} from '@maple-design/ui'
```

## Style Variables

Group labels align with options. A 20px line height plus 4px padding on each side gives a 28px single-line title. Adjacent groups have an extra 8px gap; the first group has no group gap. Title height grows with its content instead of clipping the line box.


| Name | Default |
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

### State and timing variables

Disabled wins over active, pointer hover and keyboard focus states. Selected hover uses its own role, defaulting to the active background; override it for an additional hover treatment. The active background is painted directly on the option, matching Cedar.

| Token | Default |
| --- | --- |
| `--mp-menu-option-bg-selected-hover` | `var(--mp-menu-option-selected-background)` |
| `--mp-menu-option-bg-disabled` | `transparent` |

### Render context and stable identity
