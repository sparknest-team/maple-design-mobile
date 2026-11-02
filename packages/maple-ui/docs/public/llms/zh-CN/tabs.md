<!-- Source: src/tabs/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/tabs -->

# Tabs 标签页

导航与内容使用同一套 API，PC 和移动端通过主题变量保留视觉密度差异。

## 案例

### 最简单用法

最简单的写法只需要在 `Tabs` 中声明带 `title` 的 `TabPane`，导航与内容会自动生成。

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

### 样式变体

`variant` 控制导航外观；卡片和胶囊样式也使用相同的标签与内容结构。

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

### 仅导航

只需要标签导航时，无需编写内容组件；直接在 `TabsNavs` 中声明 `TabNav` 即可。

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

导航属性与状态组合：

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

### 横向滚动与手势切换

标签较多时导航可横向滚动：移动端直接拖动导航，PC 使用鼠标滚轮或触控板。开启 `swipeable` 后，还能在内容区域左右滑动切换；滑动会跳过禁用项。

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

### 方向与指示器位置

通过选项切换横向、纵向布局和指示器所在方向；还可以交换 `TabsNavs` 与 `TabsItems` 的声明顺序，将导航放在内容的另一侧。

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

### 动态增删标签

编辑模式支持增加和关闭标签，数据仍由使用者维护。

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

### 受控切换

使用 `v-model` 时，父组件可以通过按钮切换当前页，也能读取用户点选后的值。

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

### 按需挂载内容

`lazy-load` 在首次打开面板时才挂载内容；`destroy-on-hide` 在离开面板时卸载内容，适合无需保留内部状态的页面。

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

### 外观组合

适用于同级内容之间的切换。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

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

### 图标与导航插槽

TabNav 支持图标与纵向排列；TabsNavs 支持前后附加内容。

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

## API

TabPane、TabNav、TabItem 都需要唯一的 `name`；选中值及导航与面板对应关系均使用 name。Vue 的 key 只负责节点复用，循环渲染时单独提供 `:key`。

主值使用普通 `v-model`：`modelValue` 表示选中标签的 name。`defaultValue` 仅在创建时初始化非受控状态，之后修改不会重置当前值；初始化不触发 `update:modelValue`。提供 `modelValue` 时由父级控制，以受控值为准。

### Tabs Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| model-value | `string / number` | `undefined` | 当前选中 name；提供时受控 |
| default-value | `string / number` | `undefined` | 非受控初值，省略选首个可用项 |
| variant | `line / card / outline / plain / capsule / enclosed` | `line` | 视觉变体 |
| size | `xs / sm / md / lg / xl` | `全局值或 md` | 尺寸 |
| orientation | `horizontal / vertical` | `horizontal` | 导航方向 |
| indicator-position | `normal / reverse` | `normal` | 指示器在内容侧或相反侧 |
| editable | `boolean` | `false` | 允许关闭标签 |
| show-add-button | `boolean` | `false` | 编辑模式显示新增按钮 |
| auto-switch | `boolean` | `false` | 新增后切换最后一个可用标签 |
| lazy-load | `boolean` | `false` | 首次激活挂载 |
| destroy-on-hide | `boolean` | `false` | 隐藏即卸载内容 |
| justify | `boolean` | `false` | 水平方向撑满容器高度 |
| animation | `boolean` | `false` | 内容淡入动画 |
| item-class | `string / object / array` | `undefined` | 每页内容内层类名，合并内置类名 |
| item-style | `StyleValue` | `undefined` | 每页内容内层样式，支持字符串、对象和数组 |
| item-wrapper-class | `string / object / array` | `undefined` | 每页内容外层容器类名，合并内置类名 |
| item-wrapper-style | `StyleValue` | `undefined` | 每页内容外层容器样式，支持字符串、对象和数组 |
| tab-class | `string / object / array` | `undefined` | 导航标签外层（含标题与关闭按钮）类名，合并内置类名 |
| tab-style | `StyleValue` | `undefined` | 导航标签外层（含标题与关闭按钮）样式，支持字符串、对象和数组 |
| hide-content | `boolean` | `false` | 隐藏内容区域 |
| trigger | `click / hover` | `click` | 鼠标触发方式，触摸始终点击 |
| scroll-position | `start / end / center / auto / number` | `auto` | 选中标签滚动位置，数字为起点偏移 |
| scroll-buttons | `boolean / auto` | `auto` | 溢出时显示箭头，auto 在触摸设备隐藏 |
| activation-mode | `automatic / manual` | `automatic` | 方向键是否立即选中 |
| swipeable | `boolean` | `false` | 内容横向触摸切换；不循环 |

### Tabs Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:model-value | name: string / number | 请求更新选中值 |
| change | name: string / number | 选择不同可用项时通知；受控模式仍由父级更新 modelValue |
| tab-click | name, event: Event | 点击可用项，重复点击仍触发；hover/方向键/滑动不触发 |
| add | event: Event | 请求增加标签；由使用者修改数据 |
| delete | name, event: Event | 请求删除标签；由使用者修改数据 |

### TabPane Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name **(必填)** | string / number | — | 业务唯一标识，与 modelValue 对应 |
| title | string | undefined | 导航标题 |
| disabled | boolean | false | 禁止选择和关闭 |
| closable | boolean | true | editable 模式显示关闭按钮 |
| item-vertical | boolean | false | 图标文字垂直布局 |
| lazy-load | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |
| destroy-on-hide | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |

### TabNav Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name **(必填)** | string / number | — | 业务唯一标识，与 modelValue 对应 |
| title | string | undefined | 标题 |
| disabled | boolean | false | 禁止选择和关闭 |
| closable | boolean | true | editable 模式显示关闭按钮 |
| item-vertical | boolean | false | 图标文字垂直布局 |

TabNav 与 TabItem 使用相同的 `name` 建立对应关系；`name` 在同组内唯一，数字 `1` 与字符串 `'1'` 不同。Vue 的 `key` 只负责节点复用，循环渲染时仍应提供 `:key`，它不参与选中值计算。

### TabItem Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name **(必填)** | string / number | — | 业务唯一标识，与 modelValue 对应 |
| lazy-load | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |
| destroy-on-hide | boolean | undefined | 继承 Tabs，显式 false 可覆盖 |

未激活的 panel 始终带 hidden，内部状态是否保留由上述属性决定。destroy-on-hide 优先于 lazy-load；active 内容始终挂载。TabsNavs 和 TabsItems 没有业务 Props。

### Slots

| 组件 | 插槽 | 说明 |
| --- | --- | --- |
| Tabs | default | TabPane 列表；或高级组合所需的 TabsNavs 与 TabsItems |
| TabPane | default / title | 面板内容 / 自定义导航标题 |
| TabsNavs | default | TabNav 列表 |
| TabsNavs | prefix / suffix / add-icon | 导航前后附加区、新增图标 |
| TabNav | title / default / icon | title 插槽或默认插槽为自定义标题；icon 为图标 |
| TabsItems | default | TabItem 列表 |
| TabItem | default | 面板内容 |

### Expose

`TabsNavs.resize(): void` 重新测量溢出并将选中标签滚入可见区域。尺寸变化有 ResizeObserver 自动监听。

### 键盘与方向

方向键跳过禁用项并循环；Home/End 到首尾；可编辑标签按 Delete 请求关闭。horizontal 使用左右键，vertical 使用上下键。manual 模式只移动焦点，Enter/Space 通过原生 button 激活。使用 `dir="rtl"` 支持从右向左布局。TabsNavs 可传 `aria-label` 为导航命名。

### 类型

导出 TabsName、TabsVariant、TabsTrigger、TabsIndicatorPosition、TabsScrollPosition、TabsActivationMode，以及六组件对应的 Props / Instance / 运行时 props / `_XxxComponent`。同一 props 定义用于两端。

## 自定义内部样式

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

六个样式属性统一配置在 Tabs 上，对所有对应项生效。自定义类名与内置类名合并；内联样式可覆盖默认间距。`item-wrapper-*` 对应 role="tabpanel" 外层，`item-*` 对应实际内容内层，`tab-*` 对应导航标签外层。

内容间距使用 `item-style`，导航整体间距可通过 TabsNavs 的 `style` 或 CSS token 调整。

## 样式变量

相同 token 后缀在两端意义一致，只有默认值不同。[完整跨端对比与设计依据](./comparison.md)。

| 变量 | 默认值 |
| --- | --- |
| `--mp-tabs-background` | `var(--mp-sys-color-surface-default)` |
| `--mp-tabs-title-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-tabs-title-text-color-active` | `var(--mp-sys-color-content-brand)` |
| `--mp-tabs-title-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-tabs-muted-background` | `var(--mp-sys-color-surface-muted)` |
| `--mp-tabs-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-tabs-hover-background` | `var(--mp-sys-color-state-hover)` |
| `--mp-tabs-nav-gap` | `var(--mp-sys-space-2)` |
| `--mp-tabs-tab-gap` | `var(--mp-sys-space-2)` |
| `--mp-tabs-header-padding` | `var(--mp-sys-space-4)` |
| `--mp-tabs-control-height` | `var(--mp-sys-control-height-xs)` |
| `--mp-tabs-touch-target` | `var(--mp-sys-control-touch-target)` |
| `--mp-tabs-border-width` | `1px` |
| `--mp-tabs-focus-width` | `2px` |
| `--mp-tabs-focus-offset` | `-3px` |
| `--mp-tabs-radius` | `var(--mp-sys-radius-md)` |
| `--mp-tabs-icon-gap` | `var(--mp-sys-space-3)` |
| `--mp-tabs-content-padding` | `var(--mp-sys-space-5)` |
| `--mp-tabs-indicator-size` | `2px` |
| `--mp-tabs-indicator-radius` | `1px` |
| `--mp-tabs-animation-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-tabs-active-font-weight` | `var(--mp-sys-font-weight-semibold)` |
| `--mp-tabs-group-padding` | `var(--mp-sys-space-2)` |
| `--mp-tabs-capsule-radius` | `12px` |
| `--mp-tabs-active-shadow` | `none` |
| `--mp-tabs-size-xs-tab-height` | `var(--mp-sys-control-height-xs)` |
| `--mp-tabs-size-xs-tab-padding` | `var(--mp-sys-space-2) var(--mp-sys-space-4)` |
| `--mp-tabs-size-xs-tab-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-tabs-size-sm-tab-height` | `var(--mp-sys-control-height-sm)` |
| `--mp-tabs-size-sm-tab-padding` | `var(--mp-sys-space-3) var(--mp-sys-space-5)` |
| `--mp-tabs-size-sm-tab-font-size` | `var(--mp-sys-font-size-sm)` |
| `--mp-tabs-size-md-tab-height` | `var(--mp-sys-control-height-md)` |
| `--mp-tabs-size-md-tab-padding` | `var(--mp-sys-space-4) var(--mp-sys-space-6)` |
| `--mp-tabs-size-md-tab-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-tabs-size-lg-tab-height` | `var(--mp-sys-control-height-lg)` |
| `--mp-tabs-size-lg-tab-padding` | `10px var(--mp-sys-space-7)` |
| `--mp-tabs-size-lg-tab-font-size` | `var(--mp-sys-font-size-lg)` |
| `--mp-tabs-size-xl-tab-height` | `var(--mp-sys-control-height-xl)` |
| `--mp-tabs-size-xl-tab-padding` | `var(--mp-sys-space-5) var(--mp-sys-space-8)` |
| `--mp-tabs-size-xl-tab-font-size` | `var(--mp-sys-font-size-xl)` |

## 独立同源与公开类型

两端独立维护 Tabs、TabPane、TabsNavs、TabNav、TabsItems、TabItem 六件套，不跨库引用运行时，也不使用通用平台配置。size 的 xs/sm/md/lg/xl 五档均已实现。Cedar 继承 ConfigProvider 的 size/rtl；Maple 默认 md，支持 setPropsDefaults、显式 size 与 DOM dir。面板通过原生 hidden 显隐，InfiniteScroll 直接观察可见性，不再依赖旧面板注册。

公开类型包括 TabsEmits、TabsSlots、TabPaneSlots、TabsNavsSlots、TabNavSlots、TabsItemsSlots、TabItemSlots、TabsNavsExpose。自有实例方法仅 TabsNavs.resize()；其余成员没有自有命令式方法或通知事件，选择及编辑事件归属 Tabs。
