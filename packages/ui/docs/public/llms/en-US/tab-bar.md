<!-- Source: src/tab-bar/docs/en-US.md; locale: en-US; page: /en-US/tab-bar -->

# TabBar

### Intro

Display navigation and key actions at the bottom of the page.

## Basic examples

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

## Appearance and content

### Pill indicator

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `variant` | Appearance | Pill indicator, Show Badge |
| `active-color` | Color of active tab item | Custom Color |
| `fab-props` | Fab button props | Fab |
<!-- demo-config-notes:end -->


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

### Fab

Use the floating button for a primary action such as creating a post, taking a photo or adding an item. The plus button opens the composer without changing the selected tab.

The button is centered for an even number of tabs and right aligned for an odd number. Use the separate control to compare these layouts.

Example source: src/tab-bar/example/demos/fab.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message } from '@maple-design/ui-vue'

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

## Value model and interaction

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

### Click and value-change events

Click the current and a different item to distinguish click notifications from value changes.

Example source: src/tab-bar/example/demos/event-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'
import { Message } from '@maple-design/ui-vue'

const scene1 = demoProxyRefs(
  (() => {
    const changeEvent = ref(0)

    function handleChange(active: number | string) {
      Message.info(`changed to ${active}`)
    }
    return { changeEvent, handleChange }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const clickEvent = ref(0)

    function handleClick(active: number | string) {
      Message.success(`clicked ${active}`)
    }
    return { clickEvent, handleClick }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="change-event">
      <h4><span lang="zh-CN">监听切换事件</span><span lang="en-US">Change Event</span></h4>
      <mp-tab-bar v-model="scene1.changeEvent" @change="scene1.handleChange">
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
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="click-event">
      <h4><span lang="zh-CN">监听点击事件</span><span lang="en-US">Click Event</span></h4>
      <mp-tab-bar v-model="scene2.clickEvent">
        <mp-tab-bar-item label="首页" @click="scene2.handleClick">
          <template #icon
            ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
          ></template>
        </mp-tab-bar-item>
        <mp-tab-bar-item label="发现" @click="scene2.handleClick">
          <template #icon
            ><mp-icon :size="22"><m-icon-search /></mp-icon
          ></template>
        </mp-tab-bar-item>
        <mp-tab-bar-item label="收藏" @click="scene2.handleClick">
          <template #icon
            ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
          ></template>
        </mp-tab-bar-item>
        <mp-tab-bar-item label="我的" @click="scene2.handleClick">
          <template #icon
            ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
          ></template>
        </mp-tab-bar-item>
      </mp-tab-bar>
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
</style>
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

## Async navigation

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

## Loading and waiting

### Controlled loading

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Explicit business loading state | `boolean` | `false` |

External loading blocks tab switching; internal before-hook waiting is merged for display.


Set loading explicitly to display feedback. Ordinary event return values do not drive loading. Before hooks retain their documented pending behavior.

Example source: src/tab-bar/example/demos/loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const beforeWait = () => new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 800))
</script>
<template>
  <mp-space direction="column" style="width: 100%" :size="16">
    <mp-form layout="vertical"
      ><mp-form-item label="加载状态 / Loading"><mp-switch v-model="loading" /></mp-form-item
    ></mp-form>
    <mp-tab-bar :before-change="beforeWait" :loading="loading"
      ><mp-tab-bar-item label="首页 / Home" name="home" /><mp-tab-bar-item label="消息 / Messages" name="messages"
    /></mp-tab-bar>
    <p>
      通过 loading 显式控制等待展示，普通事件返回 Promise 不会自动加载。Loading is controlled by business state.
      关闭手动加载后切换或关闭，观察 before 守卫的自动等待反馈。
    </p>
  </mp-space>
</template>
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Navigation items follow reading order without changing selection values or item order. Automatic space for a floating button is at inline end; a center button remains centered. Explicit Badge placements remain physical corners.

## API

`default`/`icon` slot active indicates whether this item's name matches modelValue; focus/hover do not change it. activeColor/inactiveColor control current/noncurrent colors.

#### Async operation feedback
Awaited before-* hooks show loading feedback and aria-busy. Rejection/failure restores interaction; repeated input does not restart the same operation. Ordinary event return Promises do not participate. Switching to a different target retains the latest-request-wins rule.

#### guard-error
Emitted once after a switching guard fails, with `(error, value)`.

TabBar uses a group of buttons for state selection, with aria-pressed on the selected item. Give the root an aria-label when needed. Applications handle routing; ordinary events do not await return values.

### Value and default value

Use ordinary `v-model`. `modelValue` is the selected child name; unnamed positional mode uses zero-based indices. `defaultValue` initializes uncontrolled state once without later resets. Explicit binding wins, without initialization `update:modelValue`.

### TabBar Props

| Prop | Description | Type | Default |
| ------------------ | ----------------- | ---- | ---- |
| `v-model` | Selected name or index; controlled when provided | _number \| string_ | `undefined` |
| `loading` | Externally controlled loading state; switching is blocked while active | _boolean_ | `false` |
| `default-value` | Initial uncontrolled selection; read once | _number \| string_ | `0` |
| `before-change` | Guard selection; truthy permits, falsy/throw/rejection cancels. Only the latest request may commit | `TabBarBeforeChange`: `(active: number \| string) => unknown`; may return a Promise; arrays of functions are supported | `-` |
| `fixed` | Whether to fixed bottom | _boolean_ | `false` |
| `border` | Whether to show border | _boolean_ | `false` |
| `safe-area` | Whether to adapt to the bottom, left and right safe areas | _boolean_ | `false` |
| `z-index` | Z-index; an explicit prop overrides the CSS variable | _number \| string_ | `undefined`; CSS defaults to `1` |
| `active-color` | Color of active tab item | _string_ | `-` |
| `inactive-color` | Color of inactive tab item | _string_ | `-` |
| `placeholder`  ***3.2.11*** | Whether to generate placeholder elements of the same height at the bottom (`fixed` required) | _boolean_ | `false` |
| `fab-props` | Fab button props | _ButtonProps_ | `{ status: 'primary' }` |
| `variant` | Appearance | _TabBarVariant_：`standard` / `pill` | `standard` |

When model-value is omitted the component manages selection; when provided it only requests updates. Releasing control retains the last controlled value. Numeric names take precedence over unnamed item indices; named items do not match by index.

### TabBarItem Props

| Prop | Description | Type | Default |
| ---- | ---- | ---- | ---- |
| `name` | Identifier | _number \| string_ | `-` |
| `icon` | Icon name, matching Icon [name](#/en-US/icon) | _string_ | `-` |
| `label` | Label text content | _string_ | - |
| `badge` | Logo in the upper right corner of the icon | _boolean \| BadgeProps_ | `false` |

### TabBarItem Events

| Event | Description | Callback arguments |
| ---- | ---- | ---- |
| `click` | Triggered when the cell is clicked | `active: number \| string` |

### TabBar Events

| Event | Description | Callback arguments |
| ---- | ---- | ---- |
| `update:modelValue` | Request a selected-value update | `active: number \| string` |
| `change` | Triggered when switching labels | `active: number \| string` |
| `guard-error` | Emitted when the guard throws or its Promise rejects | `error: unknown, value: number \| string` |
| `fab-click` | Triggered when clicking fab button | `-` |

### TabBarItem Slots

| Name | Description | Prop |
| ---- | ---- | ---- |
| `default` | Custom `label` content; overrides `label` | `active: boolean` |
| `icon` | Custom icon | `active: boolean` |

### TabBar Slots

| Name | Description | Prop |
| ---- | ----------------------- | ---- |
| `default` | Bottom-navigation content | `-` |
| `fab` | Support for inserting a custom Fab button into a component | `-` |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

When `z-index` is omitted, the component consumes `--mp-tab-bar-z-index`. An explicit number or CSS string takes precedence. The default visual stacking level is `1`.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-tab-bar-background-color` | `var(--mp-color-bg-2)` | `background-color` |
| `--mp-tab-bar-border-color` | `var(--mp-color-border-2)` | `border-top` |
| `--mp-tab-bar-fab-border-radius` | `50%` | `border-radius` |
| `--mp-tab-bar-fab-offset` | `4px` | `inset-inline-end`, `margin-inline-end` |
| `--mp-tab-bar-height` | `50px` | `height`, `inset-inline-end`, `margin-inline-end`, `margin-inline-start`, `width` |
| `--mp-tab-bar-item-active-background-color` | `transparent` | `background-color` |
| `--mp-tab-bar-item-active-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-tab-bar-item-focus-color` | `currentColor` | `outline` |
| `--mp-tab-bar-item-focus-offset` | `-2px` | `outline-offset` |
| `--mp-tab-bar-item-focus-width` | `2px` | `outline` |
| `--mp-tab-bar-item-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-tab-bar-item-icon-margin-bottom` | `5px` | `margin-top` |
| `--mp-tab-bar-item-icon-size` | `22px` | `font-size` |
| `--mp-tab-bar-item-inactive-color` | `var(--mp-color-text-2)` | `color` |
| `--mp-tab-bar-item-line-height` | `1` | `line-height` |
| `--mp-tab-bar-item-variant-active-background-color` | `color-mix(in srgb, var(--mp-color-primary) 14%, var(--mp-tab-bar-background-color))` | `background-color` |
| `--mp-tab-bar-item-variant-active-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-tab-bar-item-variant-icon-container-border-radius` | `100px` | `border-radius` |
| `--mp-tab-bar-item-variant-icon-container-height` | `30px` | `height` |
| `--mp-tab-bar-item-variant-icon-container-max-width` | `58px` | `max-width` |
| `--mp-tab-bar-variant-height` | `66px` | `height` |
| `--mp-tab-bar-z-index` | `1` | Component styling |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-tab-bar-background-color: var(--mp-color-bg-2);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
