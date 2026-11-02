<!-- Source: src/tabs/docs/en-US.md; locale: en-US; page: /en-US/tabs -->

# Tabs

Cedar and Maple expose the same simple Tabs / TabPane API and the same advanced TabsNavs / TabNav / TabsItems / TabItem composition. Bind `v-model` on Tabs and use explicit unique string or number `name` values on TabPane, TabNav and TabItem. Vue `key` is separate and is still used for list rendering. Both packages support six variants, controlled/uncontrolled state, lazy mounting, destroy-on-hide, keyboard navigation, RTL and opt-in swipes.

Put navigation and panels inside the same `Tabs`. Use `tab-click(name, event)` for tab click handling, external positioning for custom layouts, and `TabBar` for application-level navigation. All props, events, slots, methods and theme variables are listed in the [shared API reference](../zh-CN/tabs.md).

## Examples


### Appearance combinations

Use this example for switching between peer content panels. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/tabs/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'line', size: 'md' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
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
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-tabs default-value="overview" v-bind="__demoAppearance">
      <mp-tab-pane name="overview" title="概览">概览内容</mp-tab-pane>
      <mp-tab-pane name="details" title="详情">详情内容</mp-tab-pane>
      <mp-tab-pane name="settings" title="设置">设置内容</mp-tab-pane>
    </mp-tabs>
  </mp-space>
</template>
```

### Simplest usage

For the simplest usage, place `TabPane` components with `title` directly inside `Tabs`; navigation and content are generated automatically.

Example source: src/tabs/example/demos/basic.vue

```vue
<template>
  <mp-tabs default-value="overview">
    <mp-tab-pane name="overview" title="概览">概览内容</mp-tab-pane>
    <mp-tab-pane name="details" title="详情">详情内容</mp-tab-pane>
    <mp-tab-pane name="settings" title="设置">设置内容</mp-tab-pane>
  </mp-tabs>
</template>
```

### Navigation only

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

### Visual variants

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

### Scrollable navigation and swiping

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

### Lazy mounting

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

## Styling hooks

Tabs exposes `item-class` / `item-style` for each content inner element, `item-wrapper-class` / `item-wrapper-style` for each tabpanel wrapper, and `tab-class` / `tab-style` for each navigation item wrapper. Classes merge with internal classes; styles accept Vue StyleValue. All six props update reactively. `body-padding` and `header-padding` are removed; customize content spacing through `item-style` and header spacing through TabsNavs style or CSS tokens.

## Independent source and public types

Both libraries contain their own copies of Tabs, TabPane, TabsNavs, TabNav, TabsItems and TabItem. There is no cross-library runtime or platform module. All five size presets are implemented. Cedar inherits ConfigProvider size/RTL; Maple defaults to md, supports setPropsDefaults, and uses explicit size/DOM dir. Panel visibility uses native hidden; InfiniteScroll observes that visibility directly.

Public types include TabsEmits, TabsSlots, TabPaneSlots, TabsNavsSlots, TabNavSlots, TabsItemsSlots, TabItemSlots and TabsNavsExpose. The only component-specific exposed method is TabsNavs.resize(). Other members have no own imperative methods or events; selection/edit events belong to Tabs.
