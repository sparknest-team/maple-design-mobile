<!-- Source: src/nav-menu/docs/en-US.md; locale: en-US; page: /en-US/nav-menu -->

# NavMenu

NavMenu provides horizontal filter entries with key/label options, independent selection, title fallback, scoped slots and controlled open state.

## Basic examples

### Horizontal filters

Example source: src/nav-menu/example/demos/basic.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { NavMenuKey, NavMenuOption } from '../../..'

const category = ref<NavMenuKey | null>(null)
const region = ref<NavMenuKey | null>(null)
const keyword = ref('')
const appliedKeyword = ref('')
const categories: NavMenuOption[] = [
  { key: 'all', label: '全部分类' },
  { key: 'design', label: '设计资源' },
  { key: 'development', label: '开发工具' },
]
const regions: NavMenuOption[] = [
  { key: 'all', label: '全部地区' },
  { key: 'east', label: '华东' },
  { key: 'south', label: '华南' },
  { key: 'north', label: '华北' },
]
const categoryLabel = computed(() => categories.find((item) => item.key === category.value)?.label ?? '未选择')
const regionLabel = computed(() => regions.find((item) => item.key === region.value)?.label ?? '未选择')
function resetFilters(close: () => void) {
  keyword.value = ''
  appliedKeyword.value = ''
  close()
}
function applyFilters(close: () => void) {
  appliedKeyword.value = keyword.value.trim()
  close()
}
</script>
<template>
  <div>
    <mp-nav-menu mode="horizontal">
      <mp-nav-menu-item v-model="category" label="分类" :options="categories" />
      <mp-nav-menu-item
        v-model="region"
        label="地区"
        :options="regions"
        options-mode="horizontal"
        popup-layout="full-width"
      />
      <mp-nav-menu-item label="更多筛选" :highlight="!!appliedKeyword" popup-layout="full" :hide-on-select="false">
        <template #content="{ close }">
          <div style="height: 100%; display: flex; flex-direction: column; gap: 16px">
            <div style="flex: 1; min-height: 0; overflow-y: auto">
              <mp-space direction="column" style="width: 100%">
                <strong>按关键词筛选</strong>
                <mp-input v-model="keyword" placeholder="输入资源名称" aria-label="资源名称" />
              </mp-space>
            </div>
            <mp-space>
              <mp-button @click="resetFilters(close)">重置</mp-button>
              <mp-button @click="applyFilters(close)">应用</mp-button>
            </mp-space>
          </div>
        </template>
      </mp-nav-menu-item>
    </mp-nav-menu>
    <p aria-live="polite">分类：{{ categoryLabel }}；地区：{{ regionLabel }}；关键词：{{ appliedKeyword || '不限' }}</p>
  </div>
</template>
```

All panels fill the viewport width below the entire filter bar. The default popup-layout="full-width" uses content height, capped by the remaining visible height. popup-layout="full" fills all remaining visible height. Custom content owns draft, apply/reset actions and sticky footer layout. Input keyboard and viewport changes update the available region.

## Layout and arrangement

### Long content and fixed actions

Long lists scroll inside the available panel height. A full panel keeps its actions visible while its body scrolls independently, with background scrolling locked.

Example source: src/nav-menu/example/demos/long-content.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { NavMenuKey, NavMenuOption } from '../../..'

const value = ref<NavMenuKey | null>(null)
const options: NavMenuOption[] = Array.from({ length: 40 }, (_, index) => ({ key: index, label: `选项 ${index + 1}` }))
const conditions = Array.from({ length: 40 }, (_, index) => ({ value: index, label: `条件 ${index + 1}` }))
const draft = ref<Array<string | number | boolean>>([])
const applied = ref<Array<string | number | boolean>>([])
function apply(close: () => void) {
  applied.value = [...draft.value]
  close()
}
function reset(close: () => void) {
  draft.value = []
  applied.value = []
  close()
}
</script>

<template>
  <div data-nav-long-demo>
    <mp-nav-menu>
      <mp-nav-menu-item v-model="value" label="长列表" :options="options" />
      <mp-nav-menu-item label="更多条件" popup-layout="full" :highlight="applied.length > 0" :hide-on-select="false">
        <template #content="{ close }">
          <div style="height: 100%; display: flex; flex-direction: column; gap: 16px">
            <strong>筛选条件</strong>
            <div data-nav-filter-body style="flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain">
              <mp-checkbox-group v-model="draft" :options="conditions" orientation="vertical" />
            </div>
            <mp-space>
              <mp-button @click="reset(close)">重置</mp-button>
              <mp-button @click="apply(close)">应用条件</mp-button>
            </mp-space>
          </div>
        </template>
      </mp-nav-menu-item>
    </mp-nav-menu>
    <p aria-live="polite">长列表选中：{{ value ?? '未选择' }}；已应用 {{ applied.length }} 项</p>
  </div>
</template>
```

## Data and state control

### Controlled state and disabled entries

Example source: src/nav-menu/example/demos/controlled.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const accepted = ref(true)
const open = ref(false)
const value = ref<string | number | null>(null)
const options = [
  { key: 0, label: '不限' },
  { key: 'design', label: '设计' },
  { key: 'disabled', label: '禁用选项', disabled: true },
]
function updateOpen(next: boolean) {
  if (accepted.value) {
    open.value = next
  }
}
function updateValue(next: string | number | null) {
  if (accepted.value) {
    value.value = next
  }
}
</script>
<template>
  <mp-button @click="accepted = !accepted">{{
    accepted ? '当前接受更新，点击拒绝' : '当前拒绝更新，点击接受'
  }}</mp-button>
  <mp-nav-menu>
    <mp-nav-menu-item
      :open="open"
      :model-value="value"
      :options="options"
      label="受控筛选"
      @update:open="updateOpen"
      @update:model-value="updateValue"
    />
    <mp-nav-menu-item label="禁用入口" disabled :options="options" />
  </mp-nav-menu>
  <p>选中：{{ value ?? '未选择' }}；展开：{{ open }}</p>
</template>
```

## Interaction and control

### Panel state and closing

Example source: src/nav-menu/example/demos/panel-state.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { NavMenuInstance } from '../../..'

const menu = ref<NavMenuInstance>()
const unmountOnClose = ref(false)
const options = [
  { key: 0, label: '不限' },
  { key: 'design', label: '设计资源' },
]
</script>
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-space>
      <span>关闭后卸载</span>
      <mp-switch v-model="unmountOnClose" />
      <mp-button @click="menu?.close()">关闭当前面板</mp-button>
    </mp-space>
    <mp-nav-menu ref="menu" mode="horizontal">
      <mp-nav-menu-item label="草稿表单" :unmount-on-close="unmountOnClose">
        <template #content="{ close }">
          <mp-space direction="column" style="width: 100%">
            <mp-input default-value="" placeholder="输入后关闭，再打开查看草稿" aria-label="面板内部草稿" />
            <mp-button @click="close">关闭并返回入口</mp-button>
          </mp-space>
        </template>
      </mp-nav-menu-item>
      <mp-nav-menu-item label="分类" :options="options" />
    </mp-nav-menu>
    <p>默认保留面板内部草稿；开启卸载后再次展开会重新创建。关闭面板不会提交或重置业务筛选值。</p>
  </mp-space>
</template>
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

### NavMenuItem Props

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
| `--mp-nav-menu-active-color` | `var(--mp-sys-color-content-brand)` | `color`, `outline` |
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
  --mp-nav-menu-active-color: var(--mp-sys-color-content-brand);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
