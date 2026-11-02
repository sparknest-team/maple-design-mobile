<!-- Source: src/tab-bar/docs/en-US.md; locale: en-US; page: /en-US/tab-bar -->

# TabBar

## Examples

### Intro

Display navigation and key actions at the bottom of the page.

### Basic Usage

Example source: src/tab-bar/example/demos/basic-usage.vue

```vue
<script setup>
import { ref } from 'vue'

const basicUsage = ref(0)
</script>

<template>
  <mp-tab-bar v-model="basicUsage">
    <mp-tab-bar-item label="首页">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="发现">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="收藏">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="我的">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Pill indicator

Set `variant="pill"` to show a pill behind the selected icon. The default `standard` style changes the selected color.

Example source: src/tab-bar/example/demos/variant.vue

```vue
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tab-bar v-model="active" variant="pill">
    <mp-tab-bar-item label="首页">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="发现">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="收藏">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="我的">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Match By Name

Example source: src/tab-bar/example/demos/match-by-name.vue

```vue
<script setup>
import { ref } from 'vue'

const matchByName = ref('home-fill')
</script>

<template>
  <mp-tab-bar v-model="matchByName">
    <mp-tab-bar-item name="home-fill" label="首页">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="search" label="发现">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="heart-fill" label="收藏">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="user" label="我的">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Show Badge

TabBar badges default to size xs and extend outside the top-right edge of the icon. The badge object can override size, position, offsetX and offsetY. Dots, counts and max are supported in both standard and pill styles.

Example source: src/tab-bar/example/demos/show-badge.vue

```vue
<script setup>
import { ref } from 'vue'

const showBadge = ref(0)
const pill = ref(false)
const badgeProps = {
  content: 66,
}
</script>

<template>
  <p>红点、66 和 99+ 放在图标外侧。切换胶囊指示器，观察徽标位置。</p>
  <mp-switch v-model="pill" aria-label="胶囊指示器" /> 胶囊指示器
  <mp-tab-bar v-model="showBadge" :variant="pill ? 'pill' : 'standard'">
    <mp-tab-bar-item label="首页">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="发现" badge>
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="收藏" :badge="badgeProps">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="我的" :badge="{ content: 125, max: 99 }">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Custom Color

Example source: src/tab-bar/example/demos/custom-color.vue

```vue
<script setup>
import { ref } from 'vue'

const customColor = ref(0)
</script>

<template>
  <mp-tab-bar v-model="customColor" active-color="var(--mp-color-warning)">
    <mp-tab-bar-item label="首页">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="发现">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="收藏">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="我的">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Change Event

Example source: src/tab-bar/example/demos/change-event.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message } from '@maple-design/ui'

const changeEvent = ref(0)
function handleChange(active) {
  Message.info(`changed to ${active}`)
}
</script>

<template>
  <mp-tab-bar v-model="changeEvent" @change="handleChange">
    <mp-tab-bar-item label="首页">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="发现">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="收藏">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="我的">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Click Event

Example source: src/tab-bar/example/demos/click-event.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message } from '@maple-design/ui'

const clickEvent = ref(0)
function handleClick(active) {
  Message.success(`clicked ${active}`)
}
</script>

<template>
  <mp-tab-bar v-model="clickEvent">
    <mp-tab-bar-item label="首页" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="发现" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="收藏" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="我的" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Fab

Use the floating button for a primary action such as creating a post, taking a photo or adding an item. The plus button opens the composer without changing the selected tab.

The button is centered for an even number of tabs and right aligned for an odd number. Use the separate control to compare these layouts.

Example source: src/tab-bar/example/demos/fab.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message } from '@maple-design/ui'

const fab = ref(0)
const isEven = ref(true)
const composerOpen = ref(false)
const draft = ref('')
const variant = ref(0)
function handlePublish() {
  Message.success('发布操作演示完成')
  draft.value = ''
}
</script>

<template>
  <p>悬浮按钮用于发布、拍摄或新建等主要操作。点击加号打开发布框，不切换当前导航。</p>
  <mp-space wrap role="group" aria-label="悬浮按钮位置演示">
    <mp-button :variant="isEven ? 'default' : 'outline'" :aria-pressed="isEven" @click="isEven = true"
      >4 个导航项：按钮居中</mp-button
    >
    <mp-button :variant="isEven ? 'outline' : 'default'" :aria-pressed="!isEven" @click="isEven = false"
      >5 个导航项：按钮靠右</mp-button
    >
  </mp-space>
  <mp-tab-bar
    v-model="fab"
    style="margin-top: 40px"
    :fab-props="{ 'aria-label': '发布动态' }"
    @fab-click="composerOpen = true"
  >
    <template #fab
      ><mp-icon :size="24"><m-icon-plus /></mp-icon
    ></template>
    <mp-tab-bar-item label="首页">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="发现">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="收藏">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="消息">
      <template #icon
        ><mp-icon :size="22"><m-icon-bell-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item v-if="!isEven" label="我的">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
  <mp-dialog v-model:open="composerOpen" title="发布动态" confirm-button-text="发布动态" @confirm="handlePublish">
    <p>这是发布入口的交互演示，内容不会发送到服务器。</p>
    <mp-textarea v-model="draft" placeholder="分享此刻的想法" aria-label="分享此刻的想法" />
  </mp-dialog>
</template>
```

### Uncontrolled selection

Example source: src/tab-bar/example/demos/uncontrolled.vue

```vue
<script setup></script>
<template>
  <p>无需 v-model，初始选中收藏，点击即可切换。default-value 仅在初始化时读取。</p>
  <mp-tab-bar default-value="favorites">
    <mp-tab-bar-item name="home" label="首页" />
    <mp-tab-bar-item name="favorites" label="收藏" />
    <mp-tab-bar-item name="profile" label="我的" />
  </mp-tab-bar>
</template>
```

### Stable keys and selection

Use the same stable identifier for `key` (node identity) and `name` (selection). Avoid array indices as keys.

Example source: src/tab-bar/example/demos/stable-key.vue

```vue
<script setup>
import { ref } from 'vue'

const active = ref('home')
const tabs = ref([
  { name: 'home', label: '首页' },
  { name: 'favorites', label: '收藏' },
  { name: 'profile', label: '我的' },
])
</script>

<template>
  <p>使用稳定的 key 和 name。选择标签后反转顺序，仍保持选中同一项。</p>
  <mp-button @click="tabs.reverse()">反转顺序</mp-button>
  <mp-tab-bar v-model="active">
    <mp-tab-bar-item v-for="tab in tabs" :key="tab.name" :name="tab.name" :label="tab.label" />
  </mp-tab-bar>
  <p aria-live="polite">当前选中：{{ tabs.find((tab) => tab.name === active)?.label }}</p>
</template>
```

### Custom selected label

Use the default slot’s `active` parameter to make the selected label bold.

Example source: src/tab-bar/example/demos/custom-label.vue

```vue
<script setup>
import { ref } from 'vue'

const tabs = [
  { name: 'home', label: '首页' },
  { name: 'favorites', label: '收藏' },
  { name: 'profile', label: '我的' },
]

const active = ref('home')
</script>
<template>
  <p>选中标签加粗，点击标签查看变化。</p>
  <mp-tab-bar v-model="active">
    <mp-tab-bar-item v-for="tab in tabs" :key="tab.name" :name="tab.name">
      <template #default="{ active: selected }">
        <span :style="{ fontWeight: selected ? 700 : 400 }">{{ tab.label }}</span>
      </template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### Async selection guards

Example source: src/tab-bar/example/demos/async-change.vue

```vue
<script setup>
import { ref } from 'vue'

const active = ref(0)
async function beforeChange(value) {
  if (value === 3) {
    return false
  }
  if (value === 4) {
    throw new Error('Demo: rejected selection')
  }
  await new Promise((resolve) => setTimeout(resolve, value === 1 ? 1200 : 250))
  return true
}
</script>
<template>
  <p>
    先点慢速（1.2 秒），再点快速（0.25 秒），最终只切到快速；拒绝和异常都会保持当前选中。等待时点击当前标签可取消切换。
  </p>
  <mp-tab-bar v-model="active" :before-change="beforeChange">
    <mp-tab-bar-item label="首页" />
    <mp-tab-bar-item label="慢速" />
    <mp-tab-bar-item label="快速" />
    <mp-tab-bar-item label="拒绝" />
    <mp-tab-bar-item label="异常" />
  </mp-tab-bar>
  <p aria-live="polite">当前选中: {{ active }}</p>
</template>
```

## API

### Model and default value

Use ordinary `v-model`. `modelValue` is the selected item name, or a zero-based index for positional items without a name. `defaultValue` initializes uncontrolled state only at creation; changing it later does not reset the current state. A supplied model takes precedence. Initialization emits no `update:modelValue`.

### Props

#### TabBar Props

| Prop            | Description                                         | Type | Default |
|-----------------|-----------------------------------------------------| ---- | ---- |
| `v-model` | Selected name or index; controlled when provided | _number \| string_ | `undefined` |
| `default-value` | Initial uncontrolled selection; read once | _number \| string_ | `0` |
| `before-change` | Guard selection; truthy permits, falsy/throw/rejection cancels. Only the latest request may commit | _(active: number \| string) => boolean \| Promise&lt;boolean&gt;_ | `-` |
| `fixed`         |  Whether to fixed bottom                            | _boolean_ | `false` |
| `border`        | Whether to show border                              | _boolean_ | `false` |
| `safe-area`       | Whether to enable bottom safe area adaptation | _boolean_ | `false` |
| `z-index`       | Z-index; an explicit prop overrides the CSS variable | _number \| string_ | `undefined` (CSS default `1`) |
| `active-color`  | Color of active tab item                            | _string_ | `-` |
| `inactive-color` | Color of inactive tab item                          | _string_ | `-` |
| `placeholder` ***3.2.11***  | Whether to generate placeholder elements of the same height at the bottom (`fixed` required)  | _boolean_ | `false` |
| `fab-props`     | Fab button props                                    | _ButtonProps_ | `{ status: 'primary' }` |
| `variant` | Appearance | _TabBarVariant_：`standard` / `pill` | `standard` |

Without active, selection is maintained internally. When active is provided, updates are emitted to the caller. Releasing control retains the last controlled value. Explicit numeric names take precedence over unnamed item indices; named items are never matched by index.

#### TabBarItem Props

|Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| `name` | Identifier | _number \| string_ | `-` |
| `icon` | Icon name, equivalent to the [name](#/en-US/icon) of Icon component | _string_ | `-` |
| `label` | Label text content | _string_ | - |
| `badge` | Logo in the upper right corner of the icon | _boolean \| BadgeProps_ | `false` |

### Events

#### TabBar Events

|Event | Description | Arguments |
| ---- | ---- | ---- |
| `change` | Triggered when switching labels | `active: number \| string` |
| `fab-click` | Triggered when clicking fab button | `-` |

#### TabBarItem Events

|Event | Description | Arguments |
| ---- | ---- | ---- |
| `click` | Triggered when clicking | `active: number \| string` |

### Slots

#### TabBar Slots

| Name | Description                                                | SlotProps |
| ---- |------------------------------------------------------------| ----|
| `default` | Content of bottom navigation                               | `-` |
| `fab` | Support for inserting a custom Fab button into a component | `-` |

#### TabBarItem Slots

| Name | Description | SlotProps |
| ---- | ---- | ----|
| `default` | Custom label text content that overwrites the content of `label`  | `active: boolean` |
| `icon` | Custom Icon | `active: boolean` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### TabBar Variables

When `z-index` is omitted, the component consumes `--mp-tab-bar-z-index`. An explicit number or CSS string takes precedence. The visual default remains `1`; the prop itself no longer defaults to `1`.

| Variable | Default |
| --- | --- |
| `--mp-tab-bar-height` | `50px` |
| `--mp-tab-bar-variant-height` | `66px` |
| `--mp-tab-bar-z-index` | `1` |
| `--mp-tab-bar-background-color` | `var(--mp-color-bg-2)` |
| `--mp-tab-bar-border-color` | `var(--color-border-2)` |
| `--mp-tab-bar-fab-offset` | `4px` |

#### TabBarItem Variables

| Variable | Default |
| --- | --- |
| `--mp-tab-bar-item-font-size` | `var(--font-size-sm)` |
| `--mp-tab-bar-item-inactive-color` | `var(--mp-color-text-2)` |
| `--mp-tab-bar-item-active-color` | `var(--color-primary)` |
| `--mp-tab-bar-item-active-background-color` | `transparent` |
| `--mp-tab-bar-item-line-height` | `1` |
| `--mp-tab-bar-item-icon-size` | `22px` |
| `--mp-tab-bar-item-icon-margin-bottom` | `5px` |
| `--mp-tab-bar-fab-border-radius` | `50%` |
| `--mp-tab-bar-item-variant-icon-container-height` | `30px` |
| `--mp-tab-bar-item-variant-icon-container-border-radius` | `100px` |
| `--mp-tab-bar-item-variant-icon-container-max-width` | `58px` |
| `--mp-tab-bar-item-variant-active-background-color` | `color-mix(in srgb, var(--mp-color-primary) 14%, var(--mp-tab-bar-background-color))` |
| `--mp-tab-bar-item-variant-active-color` | `var(--mp-color-primary)` |

### Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| `name` | Identifier | _number \| string_ | `-` |
| `icon` | Icon name, equivalent to the [name](../..#/en-US/icon) of Icon component | _string_ | `-` |
| `label` | Label text content | _string_ | - |
| `badge` | Logo in the upper right corner of the icon | _boolean \| BadgeProps_ | `false` |

### Events

| Event | Description | Arguments |
| ---- | ---- | ---- |
| `click` | Triggered when clicking | `active: number \| string` |

### Slots

| Name | Description | SlotProps |
| ---- | ---- | ----|
| `default` | Custom label text content that overwrites the content of `label`  | `active: boolean` |
| `icon` | Custom Icon | `active: boolean` |

The default and icon slots expose active: whether this item's name matches modelValue. Opening a panel, focus and hover do not change it. activeColor/inactiveColor style the active/inactive items.
