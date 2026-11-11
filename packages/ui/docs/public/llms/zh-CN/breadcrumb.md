<!-- Source: src/breadcrumb/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/breadcrumb -->

# 面包屑

当前位置（最后一级）默认使用主文字色，不额外加粗，并标记 `aria-current="page"`。纯文本无点击反馈；配置 `href` 的链接、绑定 `@click` 的操作和下拉入口显示品牌色、手型及悬停 / 按下反馈，键盘聚焦时显示焦点轮廓。`@click` 操作支持 Enter 和空格。最后一级通常保持纯文本；显式提供链接或操作时仍可交互。

触屏设备上，可点击项的触摸区域至少为 44 × 44px；按下显示底色和下划线，松手后恢复，不保留鼠标悬停效果。默认省略图标仅用于提示；如需查看隐藏路径，可通过 more-icon 插槽提供可聚焦的按钮并组合 Tooltip。

默认导航区域和省略提示的无障碍名称随当前语言变化；可通过根组件的 aria-label 自定义导航区域名称。

### 介绍

用于识别页面在层次结构中的位置，并按需向上返回。API 对齐 Cedar Design Web 的核心能力（`routes` / `max-count` / 分隔符插槽），不包含 PC 向的 sticky。

## 基础示例

### 基本使用

Example source: src/breadcrumb/example/demos/basic-usage.vue

```vue
<template>
  <mp-breadcrumb>
    <mp-breadcrumb-item>Home</mp-breadcrumb-item>
    <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
    <mp-breadcrumb-item>News</mp-breadcrumb-item>
  </mp-breadcrumb>
</template>
```

## 内容与展示

### 参数化配置

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `routes` | 路径数据（非空时优先；为空时使用默认插槽） | 参数化配置、下拉菜单、显示省略 |
| `max-count` | 最多展示的正常面包屑项数量，不包含 more；`0` 表示不限制 | 显示省略 |
<!-- demo-config-notes:end -->

通过 `routes` 传递面包屑数据。默认仅为前面的层级渲染链接，最后一级保持文本；可用 `#item-render` 自定义渲染。

Example source: src/breadcrumb/example/demos/routes-mode.vue

```vue
<template>
  <mp-space direction="column">
    <mp-breadcrumb :routes="routes" @click.prevent />
    <mp-breadcrumb :routes="routes">
      <template #item-render="{ route, routes, paths }">
        <span v-if="route === routes[routes.length - 1]">{{ route.label }}</span>
        <mp-link v-else :href="paths.join('/')" @click.prevent>
          {{ route.label }}
        </mp-link>
      </template>
    </mp-breadcrumb>
    <mp-breadcrumb :routes="routes">
      <template #item-render="{ route, routes }">
        <span v-if="route === routes[routes.length - 1]">{{ route.label }}</span>
        <RouterLink v-else :to="route.to">
          {{ route.label }}
        </RouterLink>
      </template>
    </mp-breadcrumb>
  </mp-space>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'

export default {
  components: { RouterLink },
  setup() {
    const routes = [
      {
        path: '/',
        to: { query: { breadcrumb: 'home' } },
        label: 'Home',
      },
      {
        path: '/channel',
        to: { query: { breadcrumb: 'channel' } },
        label: 'Channel',
      },
      {
        path: '/news',
        to: { query: { breadcrumb: 'news' } },
        label: 'News',
      },
    ]
    return { routes }
  },
}
</script>
```

### 下拉菜单

Example source: src/breadcrumb/example/demos/dropdown.vue

```vue
<template>
  <mp-space direction="column">
    <mp-breadcrumb :routes="routes" @click.prevent @select="handleSelect" />
    <span v-if="selectedPath">Selected: {{ selectedPath }}</span>
    <mp-breadcrumb>
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item :droplist="droplist"> Channel </mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <mp-breadcrumb>
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>
        <template #droplist>
          <mp-menu-option>Option 1</mp-menu-option>
          <mp-menu-option>Option 2</mp-menu-option>
          <mp-menu-option>Option 3</mp-menu-option>
        </template>
        Channel
      </mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
  </mp-space>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const selectedPath = ref('')
    const handleSelect = (route: { path: string }) => {
      selectedPath.value = route.path
    }
    const routes = [
      {
        path: '/',
        label: 'Home',
      },
      {
        path: '/channel',
        label: 'Channel',
        children: [
          { path: '/goods', label: 'Goods' },
          { path: '/wallet', label: 'Wallet' },
        ],
      },
      {
        path: '/news',
        label: 'News',
      },
    ]
    const droplist = [
      {
        path: '/goods',
        label: 'Goods',
      },
      {
        path: '/wallet',
        label: 'Wallet',
      },
    ]
    return { routes, droplist, selectedPath, handleSelect }
  },
}
</script>
```

### 显示省略

通过 `max-count` 限制展示数量，超出部分折叠为省略号；可用 `#more-icon` 自定义省略图标。

示例在 Tooltip 内使用可聚焦的按钮，支持键盘聚焦及触屏点击。

Example source: src/breadcrumb/example/demos/max-count.vue

```vue
<template>
  <mp-space direction="column">
    <mp-breadcrumb :max-count="3">
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>Sub Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>All Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
      <mp-breadcrumb-item>Post</mp-breadcrumb-item>
    </mp-breadcrumb>
    <mp-breadcrumb :routes="maxRoutes" :max-count="3" @click.prevent>
      <template #more-icon="{ omittedItems }">
        <mp-tooltip :trigger="['hover', 'focus', 'click']" :content="omittedLabel(omittedItems)">
          <mp-button html-type="button" variant="text" class="more-trigger" aria-label="查看隐藏路径">
            <m-icon-more aria-hidden="true" />
          </mp-button>
        </mp-tooltip>
      </template>
    </mp-breadcrumb>
  </mp-space>
</template>

<script lang="ts">
import type { BreadcrumbRoute } from '../../types'

const omittedLabel = (items: BreadcrumbRoute[]) => items.map((item) => item.label).join(' / ')

export default {
  setup() {
    const maxRoutes = [
      { path: '/', label: 'Home' },
      { path: '/sub-home', label: 'Sub Home' },
      { path: '/all-channel', label: 'All Channel' },
      { path: '/channel', label: 'Channel' },
      { path: '/news', label: 'News' },
      { path: '/post', label: 'Post' },
    ]
    return { maxRoutes, omittedLabel }
  },
}
</script>

<style scoped>
.more-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  cursor: pointer;
}
</style>
```

### 链接与点击

对比纯文本、`href` 链接和 `@click` 操作。点击后下方显示选择结果；最后一级默认保持纯文本。省略项不会触发 `click`。

Example source: src/breadcrumb/example/demos/click-event.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const lastAction = ref('尚未操作')
const record = (label: string) => {
  lastAction.value = `已选择 ${label}`
}
</script>

<template>
  <mp-space direction="column">
    <div>纯文本：仅展示路径</div>
    <mp-breadcrumb>
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <div>链接：悬停或聚焦查看反馈</div>
    <mp-breadcrumb>
      <mp-breadcrumb-item href="#/home" @click.prevent="record('Home')">Home</mp-breadcrumb-item>
      <mp-breadcrumb-item href="#/channel" @click.prevent="record('Channel')">Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <div>点击操作：支持 Enter / 空格</div>
    <mp-breadcrumb>
      <mp-breadcrumb-item @click="record('Home')">Home</mp-breadcrumb-item>
      <mp-breadcrumb-item @click="record('Channel')">Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <span role="status">{{ lastAction }}</span>
  </mp-space>
</template>
```

## 自定义与插槽

### 自定义分隔符

通过 `separator` 属性或插槽自定义分隔符；子项配置优先于父级。同一示例对比分隔符插槽、父级属性和子项覆盖。

Example source: src/breadcrumb/example/demos/separator.vue

```vue
<script setup>
import ChildSeparatorDemo from './child-separator.vue'
import SeparatorSlotDemo from './separator-slot.vue'
</script>

<template>
  <mp-space direction="column">
    <SeparatorSlotDemo />
    <mp-breadcrumb separator="~">
      <mp-breadcrumb-item>Home</mp-breadcrumb-item>
      <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <ChildSeparatorDemo />
  </mp-space>
</template>
```

### 自定义图标

Example source: src/breadcrumb/example/demos/custom-icon.vue

```vue
<template>
  <mp-space direction="column">
    <mp-breadcrumb>
      <mp-breadcrumb-item>
        <m-icon-home-fill />
      </mp-breadcrumb-item>
      <mp-breadcrumb-item>Channel</mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
    <mp-breadcrumb>
      <mp-breadcrumb-item>
        <m-icon-home-fill />
      </mp-breadcrumb-item>
      <mp-breadcrumb-item>
        <m-icon-link />
        Channel
      </mp-breadcrumb-item>
      <mp-breadcrumb-item>News</mp-breadcrumb-item>
    </mp-breadcrumb>
  </mp-space>
</template>
```

routes 中含 children 的项目保留父路径链接，并提供独立的下拉按钮；选择子项时根组件派发 select(route, event)，由业务决定是否导航。手写 BreadcrumbItem 的 select 仍由该项监听。

## API

### Breadcrumb Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `separator` | 分隔符 | _string \| number_ | `/` |
| `max-count` | 最多展示的正常面包屑项数量，不包含 more；`0` 表示不限制 | _number_ | `0` |
| `routes` | 路径数据（非空时优先；为空时使用默认插槽） | _BreadcrumbRoute[]_ | `-` |

### Breadcrumb Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| select | routes 模式选择内置下拉子项时触发 | `route: BreadcrumbRoute, event?: Event` |

`more-icon` 的 omittedItems 仅在 routes 模式提供被省略的路径数据；默认插槽组合模式下为空数组，count、start 和 end 仍描述省略范围。

### BreadcrumbItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `separator` | 分隔符（覆盖父级） | _string \| number_ | `-` |
| `href` | 跳转链接 | _string_ | `-` |
| `droplist` | 下拉菜单内容 | _BreadcrumbRoute['children']_ | `-` |
| `dropdown-props` | 下拉菜单属性；open、onUpdate:open 和 onSelect 由组件管理 | _MenuProps_ | `-` |

### BreadcrumbItem Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发（省略项不触发） | `event: MouseEvent` |
| `select` | 选择内置下拉项时触发 | `route: BreadcrumbRoute, event?: Event` |

### BreadcrumbItem Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 面包屑内容 | `-` |
| `separator` | 自定义分隔符（优先于父级） | `-` |
| `droplist` | 自定义下拉菜单 | `-` |

### Breadcrumb Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 面包屑子项 | `-` |
| `separator` | 自定义分隔符 | `-` |
| `item-render` | `routes` 模式下自定义渲染 | `route` `routes` `paths` |
| `more-icon` | 自定义省略图标 | `omittedItems` `count` `start` `end` |

## Types

```ts
interface BreadcrumbRoute {
  label: string
  path: string
  children?: BreadcrumbRoute[]
}
```

## 使用说明



- 非空 `routes` 优先于默认插槽；空数组回退到插槽。默认路由渲染仅前面的项目带链接，最后一项标记 `aria-current="page"`；`item-render` 自行控制链接。
- 分隔符优先级：子项插槽 → 子项属性 → 父级插槽 → 父级属性；支持 `0` 和空字符串。
- `max-count` 为非负整数，0 表示不限制；设置 1 时按 2 处理，以保留首项和当前位置。正数小数向下取整后至少按 2 处理，负数或非有限数按 0 处理；无效值会在开发环境提示。总数大于有效数量加 1 才折叠，省略位置不触发原项的点击、链接或下拉菜单。
- 内置下拉选择派发 `select(route, event)`。动态增删、重排及 SSR 会同步计算索引和分隔符。
- 自定义属性作用于面包屑项的内容节点。

## CSS Variables

以下为组件使用的 CSS 变量，可使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-breadcrumb-bg` | `transparent` | `background-color` |
| `--mp-breadcrumb-bg-hover` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-breadcrumb-dropdown-icon` | `var(--mp-breadcrumb-item-inactive-color)` | `color` |
| `--mp-breadcrumb-font-weight-active` | `400` | `font-weight` |
| `--mp-breadcrumb-icon-color` | `var(--mp-breadcrumb-item-inactive-color)` | `color` |
| `--mp-breadcrumb-item-active-color` | `rgb(var(--mp-primary-8))` | `color` |
| `--mp-breadcrumb-item-inactive-color` | `var(--mp-color-text-2)` | `color` |
| `--mp-breadcrumb-item-separator-font-size` | `14px` | `font-size` |
| `--mp-breadcrumb-item-separator-margin` | `0 var(--mp-breadcrumb-margin-separator-horizontal)` | `margin` |
| `--mp-breadcrumb-link-text-color` | `var(--mp-breadcrumb-item-active-color)` | `color` |
| `--mp-breadcrumb-link-text-color-hover` | `rgb(var(--mp-primary-9))` | `color` |
| `--mp-breadcrumb-margin-dropdown-icon-left` | `4px` | `margin-inline-start` |
| `--mp-breadcrumb-margin-separator-horizontal` | `10px` | `margin` |
| `--mp-breadcrumb-padding-text-horizontal` | `0px` | `margin`, `padding` |
| `--mp-breadcrumb-separator-color` | `var(--mp-breadcrumb-item-inactive-color)` | `color` |
| `--mp-breadcrumb-separator-font-size` | `var(--mp-breadcrumb-item-separator-font-size)` | `font-size` |
| `--mp-breadcrumb-separator-margin` | `var(--mp-breadcrumb-item-separator-margin)` | `margin` |
| `--mp-breadcrumb-size-dropdown-icon` | `12px` | `font-size` |
| `--mp-breadcrumb-size-font-size` | `14px` | `font-size` |
| `--mp-breadcrumb-size-text-height` | `24px` | `line-height` |
| `--mp-breadcrumb-text-border-radius-hover` | `var(--mp-sys-radius-sm)` | `border-radius` |
| `--mp-breadcrumb-text-color` | `var(--mp-breadcrumb-item-inactive-color)` | `color` |
| `--mp-breadcrumb-text-color-active` | `var(--mp-color-text-1)` | `color` |
| `--mp-breadcrumb-touch-target-size` | `44px` | `min-height`, `min-width` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-breadcrumb-icon-color: var(--mp-breadcrumb-item-inactive-color);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
