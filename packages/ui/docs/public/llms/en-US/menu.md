<!-- Source: src/menu/docs/en-US.md; locale: en-US; page: /en-US/menu -->

# Menu

Collects transient commands for the current object, such as overflow actions, context menus and the extra actions of a button. Use [Select](#/en-US/select) to pick form data and [Cascader](#/en-US/cascader) to pick hierarchical data.

Use `placement` to choose the popup direction, defaulting to `bottom`; `cover` controls overlap with the trigger. Use `auto-fit-popup-width` to match trigger width and `popup-max-height` to limit menu height.

## Basic examples

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

## Appearance and states

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

Example source: src/menu/example/demos/structure-comparison.vue

```vue
<script setup lang="ts">
import { computed, proxyRefs as demoProxyRefs, h } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
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
    return { groupOptions }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
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
    return { submenuOptions }
  })(),
)

const scene3 = demoProxyRefs(
  (() => {
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
    return { inlineIcon, contentOptions }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="group">
      <h4><span lang="zh-CN">选项分组</span><span lang="en-US">Option Group</span></h4>
      <mp-menu :options="scene1.groupOptions">
        <mp-button>选项分组</mp-button>
      </mp-menu>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="submenu">
      <h4><span lang="zh-CN">多级菜单</span><span lang="en-US">Submenu</span></h4>
      <mp-menu :options="scene2.submenuOptions">
        <mp-button>多级菜单</mp-button>
      </mp-menu>
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="option-content">
      <h4><span lang="zh-CN">自定义选项内容</span><span lang="en-US">Custom Option Content</span></h4>
      <mp-menu :options="scene3.contentOptions">
        <mp-button>自定义选项内容</mp-button>
      </mp-menu>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
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
}
.demo-comparison-case--2 {
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
}
.demo-comparison-case--3 {
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
}
</style>
```

### Selection and visual emphasis

`active` is false on a parent whose child is active. The three examples compare render functions, scoped slots and manual MenuOption content; `highlight` only emphasizes a row.

Example source: src/menu/example/demos/active-rendering.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { MenuRenderContext } from '@maple-design/ui-vue'

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

### Option values

Give each command a stable, unique `value` when adding, removing or reordering options. Numeric `0`, string `'0'` and boolean `false` are different values.

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

### Placement
Use `placement` to choose the preferred popup position relative to the trigger. See Menu Props for the available values. Automatic fitting can change the final position when space is limited.

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
import type { MenuStrategy } from '@maple-design/ui-vue'

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

### Switching triggers

Clicking another hover-open sibling trigger closes the previous menu. Clicking inside a submenu keeps its parent open.

## State and content customization

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

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Submenus expand in reading order; enter/return horizontal keys follow the current direction, while Up/Down and boundary navigation preserve order and skip disabled options. Menus mounted externally inherit the source direction. Direction changes do not change selection.

## Keyboard interaction

Enter, Space or an arrow key opens the menu from its trigger. Up/Down and Home/End move between enabled options; Enter or Space activates an option. The forward key enters a submenu and the backward key returns, following the reading direction. Escape requests closing the topmost menu; focus returns to its trigger after closing. Tab requests close and continues browser focus navigation. Editable inputs retain their text-editing keys.

## API

### Value and default value

Use ordinary `v-model`. `modelValue` is the selected option value; `defaultValue` initializes uncontrolled state once, and later changes do not reset it. Explicit binding takes precedence. Initialization emits no `update:modelValue`.

### Menu Props

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
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | `MenuPlacement`<br>`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'bottom'` |
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

### Menu Events

| Event | Description | Arguments |
| --- | --- | --- |
| `update:model-value` | Active value update request | `value: MenuValue` |
| `select` | A menu item was activated | `value, option, event` |
| `open-change` | Visibility update request | `open: boolean` |
| `open` / `opened` | Popup starts opening / finished opening | `-` |
| `close` / `closed` | Popup starts closing / finished closing | `-` |
| `click-outside` | Clicked outside the popup | `event: Event` |
| `key-escape` | Escape was pressed | `-` |

### Menu Methods

| Method | Description | Arguments |
| --- | --- | --- |
| `open` | Open the popup | `-` |
| `close` | Close the popup | `-` |
| `resize` | Recalculate the popup position | `-` |
| `setReference` | Set the external trigger element | `reference?: HTMLElement` |

### Menu Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `default` | Trigger element | `-` |
| `content` | Hand-written content, pairs with `MenuOption` | `-` |
| `footer` | Footer | `-` |
| `option-label` | Render every option's main content | `{ option, active, level }` |
| `option-icon` | Render every option's icon | `{ option, active, level }` |
| `option-extra` | Render every option's trailing content | `{ option, active, level }` |

### MenuOption Props

Kept for SplitButton and hand-written `content`. Groups and submenus are described through `options` only; there are no `MenuGroup` or `MenuSubmenu` components.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `label` | Main content or render function | _MenuContent_ | `-` |
| `value` | Value passed to events on activation | _any_ | `-` |
| `disabled` | Disable interaction | _boolean_ | `false` |
| `ripple` | Whether to show the click ripple | _boolean_ | `true` |
| `highlight` | Visual emphasis without changing selection | _boolean_ | `false` |

### MenuOption Events / Slots

`click` fires when the option is not disabled. The `default`, `icon` and `suffix` slots and the `label` render function receive the same `{ option, active, level }` context.

## Types

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
} from '@maple-design/ui-vue'
```

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-menu-background-color` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-menu-border-color` | `var(--mp-color-fill-3)` | `background-color`, `border`, `border-top` |
| `--mp-menu-border-radius` | `2px` | `border-radius` |
| `--mp-menu-group-title-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-menu-group-title-height` | `20px` | `line-height` |
| `--mp-menu-group-title-padding` | `4px 12px` | `padding` |
| `--mp-menu-group-title-text-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-menu-max-height` | `278px` | `max-height` |
| `--mp-menu-option-arrow-icon-size` | `18px` | `font-size` |
| `--mp-menu-option-arrow-padding` | `0 6px 0 8px` | `padding` |
| `--mp-menu-option-bg-disabled` | `transparent` | `background` |
| `--mp-menu-option-bg-hover` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-menu-option-bg-selected-hover` | `var(--mp-menu-option-selected-background)` | `background-color` |
| `--mp-menu-option-disabled-color` | `var(--mp-color-text-disabled)` | `color` |
| `--mp-menu-option-icon-margin-right` | `8px` | `margin-inline-end` |
| `--mp-menu-option-lg-font-size` | `var(--mp-font-size-lg)` | `font-size` |
| `--mp-menu-option-lg-height` | `46px` | `height` |
| `--mp-menu-option-md-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-menu-option-md-height` | `38px` | `height` |
| `--mp-menu-option-padding` | `0 12px` | `padding` |
| `--mp-menu-option-selected-background` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-menu-option-selected-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-menu-option-sm-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-menu-option-sm-height` | `30px` | `height` |
| `--mp-menu-option-suffix-margin-left` | `16px` | `margin-inline-start` |
| `--mp-menu-option-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-menu-option-xl-font-size` | `var(--mp-font-size-lg)` | `font-size` |
| `--mp-menu-option-xl-height` | `54px` | `height` |
| `--mp-menu-option-xs-font-size` | `var(--mp-font-size-xs)` | `font-size` |
| `--mp-menu-option-xs-height` | `24px` | `height` |
| `--mp-menu-padding` | `4px 0` | `margin`, `padding` |
| `--mp-menu-padding-vertical` | `4px` | `margin-top` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-menu-background-color: var(--mp-sys-color-surface-overlay);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Option state colors

Use `--mp-menu-option-selected-background` for selected rows and `--mp-menu-option-bg-selected-hover` for their hover background. Disabled colors take precedence over selected, hover and focus styles.

### Group styles

Use `--mp-menu-group-title-height` for group-title line height and the component’s group-title padding variables for spacing. The first group has no extra group gap.
