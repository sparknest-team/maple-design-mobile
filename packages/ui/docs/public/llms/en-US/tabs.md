<!-- Source: src/tabs/docs/en-US.md; locale: en-US; page: /en-US/tabs -->

# Tabs

Cedar and Maple expose the same simple Tabs / TabPane API and the same advanced TabsNavs / TabNav / TabsItems / TabItem composition. Bind `v-model` on Tabs and use explicit unique string or number `name` values on TabPane, TabNav and TabItem. Vue `key` is separate and is still used for list rendering. Both packages support six variants, controlled/uncontrolled state, lazy mounting, destroy-on-hide, keyboard navigation, RTL and opt-in swipes.

Put navigation and panels inside the same `Tabs`. Use `tab-click(name, event)` for tab click handling, external positioning for custom layouts, and `TabBar` for application-level navigation. The complete props, events, slots, methods and theme variables are documented below.

## Basic examples

### Simplest usage

For the simplest usage, place `TabPane` components with `title` directly inside `Tabs`; navigation and content are generated automatically.

Example source: src/tabs/example/demos/basic.vue

```vue
<template>
  <mp-tabs default-value="overview" tab-list-aria-label="页面内容">
    <mp-tab-pane name="overview" title="概览">概览内容</mp-tab-pane>
    <mp-tab-pane name="details" title="详情">详情内容</mp-tab-pane>
    <mp-tab-pane name="settings" title="设置">设置内容</mp-tab-pane>
  </mp-tabs>
</template>
```

## Appearance and states

### Appearance combinations

Use this example for switching between peer content panels. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/tabs/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'line', size: 'md' })
const demoCompareFields = [
  { name: 'variant', values: ['line', 'card', 'outline', 'plain', 'capsule', 'enclosed'] },
  { name: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'] },
]
const demoCompareAxis = demoRef('variant')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="variant">
        <mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'line', value: 'line' },
            { label: 'card', value: 'card' },
            { label: 'outline', value: 'outline' },
            { label: 'plain', value: 'plain' },
            { label: 'capsule', value: 'capsule' },
            { label: 'enclosed', value: 'enclosed' },
          ]"
          aria-label="variant"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-tabs default-value="overview" v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }">
          <mp-tab-pane name="overview" title="概览">概览内容</mp-tab-pane>
          <mp-tab-pane name="details" title="详情">详情内容</mp-tab-pane>
          <mp-tab-pane name="settings" title="设置">设置内容</mp-tab-pane>
        </mp-tabs>
      </section>
    </div>
  </mp-space>
</template>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
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


Example source: src/tabs/example/demos/variants.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const variants = ['line', 'card', 'outline', 'plain', 'capsule', 'enclosed'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const variant = ref<(typeof variants)[number]>('line')
const size = ref<(typeof sizes)[number]>('md')
</script>

<template>
  <div class="demo-panel">
    <div class="demo-control">
      <span class="demo-label">Variant</span>
      <mp-radio-group v-model="variant">
        <mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio>
      </mp-radio-group>
    </div>
    <div class="demo-control">
      <span class="demo-label">Size</span>
      <mp-radio-group v-model="size">
        <mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio>
      </mp-radio-group>
    </div>
  </div>
  <mp-tabs :variant="variant" :size="size" default-value="news">
    <mp-tabs-navs aria-label="内容分类">
      <mp-tab-nav name="news" title="资讯" />
      <mp-tab-nav name="favorites" title="收藏" />
      <mp-tab-nav name="history" title="历史" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item name="news">最新资讯</mp-tab-item>
      <mp-tab-item name="favorites">我的收藏</mp-tab-item>
      <mp-tab-item name="history">浏览历史</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>

<style scoped>
.demo-panel {
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
}

.demo-control {
  display: grid;
  gap: 8px;
}

.demo-label {
  font-size: 13px;
  opacity: 0.7;
}
</style>
```

### Orientation and indicator position

Switch the orientation and indicator position, or reverse the declaration order of `TabsNavs` and `TabsItems` to place the navigation on the other side of the content.

Example source: src/tabs/example/demos/position.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const orientations = ['horizontal', 'vertical'] as const
const positions = ['normal', 'reverse'] as const
const componentOrders = ['nav-first', 'items-first'] as const
const orientation = ref<(typeof orientations)[number]>('horizontal')
const indicatorPosition = ref<(typeof positions)[number]>('normal')
const componentOrder = ref<(typeof componentOrders)[number]>('nav-first')
</script>

<template>
  <div class="demo-controls">
    <div class="demo-control">
      <span class="demo-label">Orientation</span>
      <mp-radio-group v-model="orientation">
        <mp-radio v-for="value in orientations" :key="value" :value="value">{{ value }}</mp-radio>
      </mp-radio-group>
    </div>
    <div class="demo-control">
      <span class="demo-label">Indicator</span>
      <mp-radio-group v-model="indicatorPosition">
        <mp-radio v-for="value in positions" :key="value" :value="value">{{ value }}</mp-radio>
      </mp-radio-group>
    </div>
    <div class="demo-control">
      <span class="demo-label">Component order</span>
      <mp-radio-group v-model="componentOrder">
        <mp-radio value="nav-first">TabsNavs → TabsItems</mp-radio>
        <mp-radio value="items-first">TabsItems → TabsNavs</mp-radio>
      </mp-radio-group>
    </div>
  </div>
  <mp-tabs :orientation="orientation" :indicator-position="indicatorPosition" default-value="first">
    <template v-if="componentOrder === 'items-first'">
      <mp-tabs-items>
        <mp-tab-item name="first">第一个面板</mp-tab-item>
        <mp-tab-item name="second">第二个面板</mp-tab-item>
        <mp-tab-item name="third">第三个面板</mp-tab-item>
      </mp-tabs-items>
      <mp-tabs-navs aria-label="方向示例">
        <mp-tab-nav name="first" title="第一个" />
        <mp-tab-nav name="second" title="第二个" />
        <mp-tab-nav name="third" title="第三个" />
      </mp-tabs-navs>
    </template>
    <template v-else>
      <mp-tabs-navs aria-label="方向示例">
        <mp-tab-nav name="first" title="第一个" />
        <mp-tab-nav name="second" title="第二个" />
        <mp-tab-nav name="third" title="第三个" />
      </mp-tabs-navs>
      <mp-tabs-items>
        <mp-tab-item name="first">第一个面板</mp-tab-item>
        <mp-tab-item name="second">第二个面板</mp-tab-item>
        <mp-tab-item name="third">第三个面板</mp-tab-item>
      </mp-tabs-items>
    </template>
  </mp-tabs>
</template>

<style scoped>
.demo-controls,
.demo-control {
  display: grid;
  gap: 12px;
}

.demo-controls {
  margin-bottom: 16px;
}

.demo-label {
  font-size: 13px;
  opacity: 0.7;
}
</style>
```

### Icons and navigation slots

Example source: src/tabs/example/demos/icons-and-slots.vue

```vue
<template>
  <mp-tabs default-value="home">
    <mp-tabs-navs aria-label="带图标的导航">
      <template #prefix><m-icon-star-fill /></template>
      <mp-tab-nav name="home" title="首页">
        <template #icon><m-icon-home-fill /></template>
      </mp-tab-nav>
      <mp-tab-nav name="profile" title="我的" item-vertical>
        <template #icon><m-icon-user-circle-fill /></template>
      </mp-tab-nav>
      <template #suffix><mp-button size="xs">管理</mp-button></template>
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item name="home">首页内容</mp-tab-item>
      <mp-tab-item name="profile">个人中心内容</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>
```

### Custom internal styles

Example source: src/tabs/example/demos/custom-style.vue

```vue
<template>
  <mp-tabs
    default-value="overview"
    item-class="custom-tab-content"
    :item-style="{ padding: '16px' }"
    item-wrapper-class="custom-tab-panel"
    :item-wrapper-style="{ border: '1px solid currentColor', borderRadius: '8px' }"
    tab-class="custom-tab-label"
    :tab-style="{ borderRadius: '8px' }"
  >
    <mp-tabs-navs :style="{ paddingInline: 0 }">
      <mp-tab-nav name="overview" title="概览" />
      <mp-tab-nav name="details" title="详情" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item name="overview">统一设置导航、内容和内容外层样式。</mp-tab-item>
      <mp-tab-item name="details">自定义类名保留内置选中状态，样式支持响应式更新。</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>
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

Example source: src/tabs/example/demos/nav-content.vue

```vue
<template>
  <mp-tabs default-value="overview">
    <mp-tabs-navs aria-label="内容分类">
      <mp-tab-nav name="overview" title="概览" />
      <mp-tab-nav name="details" title="详情" />
      <mp-tab-nav name="settings" title="设置" />
    </mp-tabs-navs>
  </mp-tabs>
</template>
```

Navigation props and state combinations:

Example source: src/tabs/example/demos/navs-review.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const editable = ref(true)
const addable = ref(true)
const autoSwitch = ref(true)
const active = ref('one')
const items = ref([
  { key: 'one', title: '标签 1' },
  { key: 'two', title: '标签 2' },
])
let next = 3
function add() {
  const key = String(next++)
  items.value.push({ key, title: '标签 ' + key })
}
function remove(key: string | number) {
  const index = items.value.findIndex((item) => item.key === key)
  items.value = items.value.filter((item) => item.key !== key)
  if (active.value === key) {
    active.value = items.value[Math.min(index, items.value.length - 1)]?.key ?? ''
  }
}
</script>
<template>
  <mp-space wrap>
    <mp-checkbox v-model="editable">允许关闭</mp-checkbox>
    <mp-checkbox v-model="addable">显示新增</mp-checkbox>
    <mp-checkbox v-model="autoSwitch">新增自动切换</mp-checkbox>
  </mp-space>
  <mp-tabs
    v-model="active"
    :editable="editable"
    :show-add-button="addable"
    :auto-switch="autoSwitch"
    @add="add"
    @delete="remove"
  >
    <mp-tabs-navs aria-label="交付审查标签">
      <template #prefix><mp-tag>动态标签</mp-tag></template>
      <mp-tab-nav v-for="item in items" :key="item.key" :name="item.key" :title="item.title" />
      <template #suffix
        ><mp-tag>共 {{ items.length }} 项</mp-tag></template
      >
      <template #add-icon><mp-tag>＋</mp-tag></template>
    </mp-tabs-navs>
    <mp-tabs-items
      ><mp-tab-item v-for="item in items" :key="item.key" :name="item.key"
        >{{ item.title }} 内容</mp-tab-item
      ></mp-tabs-items
    >
  </mp-tabs>
  <p role="status">当前标签：{{ active }}；数量：{{ items.length }}</p>
</template>
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


Example source: src/tabs/example/demos/scrollable.vue

```vue
<script setup lang="ts">
const categories = [
  { key: 'all', title: '全部' },
  { key: 'music', title: '音乐' },
  { key: 'video', title: '视频' },
  { key: 'books', title: '图书', disabled: true },
  { key: 'games', title: '游戏' },
  { key: 'sports', title: '运动' },
]
</script>

<template>
  <mp-tabs default-value="all" swipeable scroll-position="center">
    <mp-tabs-navs aria-label="内容分类">
      <mp-tab-nav
        v-for="category in categories"
        :key="category.key"
        :name="category.key"
        :title="category.title"
        :disabled="category.disabled"
      />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item v-for="category in categories" :key="category.key" :name="category.key"
        >{{ category.title }}内容</mp-tab-item
      >
    </mp-tabs-items>
  </mp-tabs>
</template>
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


Example source: src/tabs/example/demos/lazy-load.vue

```vue
<template>
  <mp-tabs default-value="overview" lazy-load>
    <mp-tabs-navs aria-label="详情分类">
      <mp-tab-nav name="overview" title="概览" />
      <mp-tab-nav name="details" title="详情" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item name="overview">概览首次打开时挂载。</mp-tab-item>
      <mp-tab-item name="details" destroy-on-hide>详情离开时卸载，再次打开会重新挂载。</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>
```

### Editable tabs

Example source: src/tabs/example/demos/editable.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const tabs = ref([
  { key: '1', title: '标签 1', content: '标签 1 内容' },
  { key: '2', title: '标签 2', content: '标签 2 内容' },
  { key: '3', title: '固定标签', content: '该标签不可关闭' },
])
let count = 4

function add() {
  const key = String(count++)
  tabs.value.push({ key, title: `标签 ${key}`, content: `标签 ${key} 内容` })
}

function remove(key: string | number) {
  tabs.value = tabs.value.filter((tab) => tab.key !== key)
}
</script>

<template>
  <mp-tabs variant="card" editable show-add-button auto-switch @add="add" @delete="remove">
    <mp-tabs-navs aria-label="可编辑标签">
      <mp-tab-nav v-for="tab in tabs" :key="tab.key" :name="tab.key" :title="tab.title" :closable="tab.key !== '3'" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item v-for="tab in tabs" :key="tab.key" :name="tab.key">{{ tab.content }}</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
</template>
```

### Controlled switching

Example source: src/tabs/example/demos/controlled.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref('first')
</script>

<template>
  <mp-tabs v-model="active">
    <mp-tabs-navs aria-label="步骤">
      <mp-tab-nav name="first" title="第一步" />
      <mp-tab-nav name="second" title="第二步" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item name="first">填写信息</mp-tab-item>
      <mp-tab-item name="second">确认信息</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
  <mp-button @click="active = active === 'first' ? 'second' : 'first'">切换到下一步</mp-button>
</template>
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
| `--mp-tabs-title-text-color-active` | `var(--mp-sys-color-content-brand)` | `background`, `color`, `outline` |
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
