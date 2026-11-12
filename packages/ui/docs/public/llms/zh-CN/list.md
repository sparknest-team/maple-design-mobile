<!-- Source: src/list/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/list -->

# 列表 List

`scrollIntoView` 仅在虚拟模式可用，参数与内部 VirtualList 的 `scrollTo` 一致，不等同于原生 DOM 的 `scrollIntoView`。

纯展示型列表。分页加载请组合使用 `InfiniteScroll`。

```html
<mp-list :data="items" size="md" bordered>
  <template #header>联系人</template>
  <template #item="{ item, index }">
    <mp-list-item>
      <template #prefix>{{ index + 1 }}</template>
      {{ item.name }}
      <template #suffix>{{ item.phone }}</template>
    </mp-list-item>
  </template>
  <template #empty>暂无联系人</template>
  <template #footer>共 {{ items.length }} 项</template>
</mp-list>
```

也可以直接传入默认插槽。默认插槽与 `data` 同时存在时，默认插槽优先，`item` 不会被调用。

```html
<mp-list :data="items">
  <mp-list-item>默认插槽内容</mp-list-item>
  <template #item="{ item }">{{ item }}</template>
</mp-list>
```

`loading` 表示整张列表首次加载或刷新，不表示下一页正在加载。空列表加载时不会同时显示空态。

## 基础示例

### basic usage

Example source: src/list/example/demos/basic-usage.vue

```vue
<script setup>
const items = [
  { name: 'Alice', value: '138 0000 0001' },
  { name: 'Bob', value: '138 0000 0002' },
  { name: 'Carol', value: '138 0000 0003' },
]
</script>

<template>
  <mp-list :data="items" bordered>
    <template #header>联系人</template>
    <template #item="{ item, index }">
      <mp-list-item>
        <template #prefix>{{ index + 1 }}</template>
        {{ item.name }}
        <template #suffix>{{ item.value }}</template>
      </mp-list-item>
    </template>
    <template #footer>{{ items.length }} 项</template>
  </mp-list>
</template>
```

## 外观与状态

### states

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `data` | 数据，与 item 插槽配合 | states |
| `loading` | 首次加载/刷新反馈，不管理分页 | states |
<!-- demo-config-notes:end -->

Example source: src/list/example/demos/states.vue

```vue
<script setup></script>

<template>
  <mp-list :data="[]" loading />
  <mp-list :data="[]" style="margin-top: 12px">
    <template #empty>暂无联系人</template>
  </mp-list>
</template>
```

## 滚动与虚拟列表

### 容器滚动

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `data` | 数据，与 item 插槽配合 | 容器滚动、虚拟定位 |
| `size` | 仅实现 sm/md/lg，不支持 xs/xl | 容器滚动、manual usage |
| `max-height` | 普通列表最大高度；数字px/CSS长度，0不限 | 容器滚动 |
| `scrollbar` | 普通列表自定义滚动条；false使用原生滚动 | 容器滚动 |
| `split` | 头尾及列表项分隔线，与边框独立 | 容器滚动 |
| `virtual-list-props` | 数据模式虚拟化；default插槽存在时忽略 | 虚拟定位 |
<!-- demo-config-notes:end -->

Example source: src/list/example/demos/bounded-scroll.vue

```vue
<script setup>
const rows = Array.from({ length: 20 }, (_, index) => ({ id: index, name: '记录 ' + (index + 1) }))
</script>
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-list :data="rows" :max-height="180" :scrollbar="false">
      <template #header>原生滚动条</template>
      <template #item="{ item }"
        ><mp-list-item>{{ item.name }}</mp-list-item></template
      >
    </mp-list>
    <mp-list :data="rows" max-height="12rem" :scrollbar="{ type: 'track' }" size="sm" :split="false">
      <template #header>自定义滚动条，无分隔线</template>
      <template #item="{ item }"
        ><mp-list-item>{{ item.name }}</mp-list-item></template
      >
    </mp-list>
  </mp-space>
</template>
```

### 虚拟定位

示例使用 `Space direction="column"` 将操作区放在列表上方，列表独占可用宽度；`estimatedSize` 是未测量行的估计高度，不要求业务行采用固定高度。

定位优先使用已渲染行的真实边界，行高测量会同步更新虚拟留白。程序滚动触发的渲染保留当前对齐；不同位置的原生滚动、新命令、数据替换、停用或卸载会取消旧补偿。`auto` 对已完整可见行不改变滚动位置和渲染窗口。支持 `ResizeObserver` 时，已观察根节点的尺寸变化会更新测量；任意布局变化不保证持续追踪。

Example source: src/list/example/demos/virtual-navigation.vue

```vue
<script setup>
import { ref } from 'vue'

const list = ref()
const rows = Array.from({ length: 1000 }, (_, id) => ({ id, name: '记录 ' + (id + 1) }))
</script>
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-space wrap>
      <mp-button @click="list.scrollIntoView({ key: 499, align: 'top' })">第 500 项置顶</mp-button>
      <mp-button @click="list.scrollIntoView({ key: 499, align: 'bottom' })">第 500 项置底</mp-button>
      <mp-button @click="list.scrollIntoView({ key: 499, align: 'auto' })">仅滚动到可见</mp-button>
    </mp-space>
    <mp-list
      ref="list"
      :data="rows"
      :virtual-list-props="{ height: 240, itemKey: 'id', estimatedSize: 48, buffer: 10 }"
    >
      <template #item="{ item, index }"
        ><mp-list-item
          ><template #prefix>{{ index + 1 }}</template
          >{{ item.name }}</mp-list-item
        ></template
      >
    </mp-list>
  </mp-space>
</template>
```

### manual usage

Example source: src/list/example/demos/manual-usage.vue

```vue
<script setup>
const items = [
  { name: 'Alice', value: '138 0000 0001' },
  { name: 'Bob', value: '138 0000 0002' },
  { name: 'Carol', value: '138 0000 0003' },
]
</script>

<template>
  <mp-list size="lg">
    <mp-list-item v-for="item in items" :key="item.name">{{ item.name }}</mp-list-item>
  </mp-list>
</template>
```

## 生命周期

### 保留命令与 KeepAlive 生命周期

KeepAlive 重新激活时，虚拟列表恢复最近记录的纵向和横向滚动位置；内容或容器尺寸变化时，位置受当前可滚动范围限制。重新激活时发出的新滚动命令优先。

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `data` | 数据，与 item 插槽配合 | 保留命令与 KeepAlive 生命周期 |
| `virtual-list-props` | 数据模式虚拟化；default插槽存在时忽略 | 保留命令与 KeepAlive 生命周期 |
<!-- demo-config-notes:end -->

Example source: src/list/example/demos/virtual-lifecycle.vue

```vue
<script setup>
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const rows = Array.from({ length: 100 }, (_, key) => ({ key }))
let retained
const capture = (instance) => {
  if (instance) {
    retained = instance
  }
}
const jump = () => retained?.scrollIntoView({ key: 50, align: 'top' })
</script>

<template>
  <div>
    <mp-button @click="active = !active">Activate / deactivate</mp-button>
    <mp-button @click="mounted = !mounted">Mount / dispose cache</mp-button>
    <mp-button @click="jump">Retained command: row 51</mp-button>
    <p>Inactive/disposed commands do nothing. Activation never replays them.</p>
    <KeepAlive v-if="mounted">
      <mp-list
        v-if="active"
        :ref="capture"
        :data="rows"
        :virtual-list-props="{ height: 100, fixedSize: true, estimatedSize: 20, buffer: 2, itemKey: 'key' }"
      >
        <template #item="{ item }"
          ><div style="height: 20px">{{ item.key + 1 }}</div></template
        >
      </mp-list>
    </KeepAlive>
  </div>
</template>
```

## API

虚拟列表先覆盖视口，再按 `buffer` 在前后预渲染；`buffer=0` 合法，`estimatedSize` 必须是有限正数（包括小于 1 的值），无效值回退 30px。`fixedSize` 可动态切换；可变高度使用已测量值和估计值，支持 `ResizeObserver` 时会监听已挂载的可测量根节点尺寸变化。`item` 插槽接收原始索引和 unknown 数据，可返回多个可测量根节点，并应提供稳定的 `itemKey`；测量按同一项目的根节点整体边界计算。需要向辅助技术表达完整集合时，可在业务行上按实际数据提供 `aria-setsize` 和 `aria-posinset`。

服务端渲染时，`default`、`header`、`footer`、`empty` 或 `item` 插槽中同一节点同时使用 `v-for` 和 `v-memo` 当前会报错；数据模式是否启用虚拟化均受影响。可暂时移除该节点的 `v-memo` 并验证更新行为。

### List Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据，与 item 插槽配合 | unknown[] | undefined |
| size | 仅实现 sm/md/lg，不支持 xs/xl | 'sm' \| 'md' \| 'lg' | md |
| bordered | 外边框 | boolean | true |
| split | 头尾及列表项分隔线，与边框独立 | boolean | true |
| loading | 首次加载/刷新反馈，不管理分页 | boolean | false |
| max-height | 普通列表最大高度；数字px/CSS长度，0不限 | number \| string | 0 |
| virtual-list-props | 数据模式虚拟化；default插槽存在时忽略 | ListVirtualListProps | undefined |
| scrollbar | 普通列表自定义滚动条；false使用原生滚动 | boolean \| ListScrollbarProps | true |

虚拟列表使用独立视口，不额外嵌套自定义滚动条。virtualListProps.height 优先于 maxHeight；均省略时虚拟视口默认 200px。数字/带单位CSS长度受支持，非法或非正 max-height 不限制高度。

ListVirtualListProps 支持 height、threshold、fixedSize、estimatedSize、buffer、itemKey、component。没有废弃的 isStaticItemHeight；data 统一由 List.data 提供。数据量小于或等于 threshold 时渲染全部；非固定高度使用测量值与 estimatedSize 估计，buffer 控制前后预渲染行数。

ListScrollbarProps 支持 type: 'track'|'embed'、outerClass、outerStyle、hide、disableHorizontal、disableVertical。属性作为 JavaScript 对象字段使用 camelCase。

### List Events / Methods

- scroll(event: Event)：真实滚动事件，一次滚动通知一次。
- scrollIntoView({ index?, key?, align })：虚拟列表定位，index 优先；align 为 top/bottom/auto。auto 在项目已完整可见时不滚动，否则最小滚动使其可见。无效目标、非虚拟模式不操作。

### List Slots

List：default（优先于data）、item({ item, index })、header、footer、empty。空态仅无默认插槽、无数据、非加载时渲染。ListItem：prefix、default、suffix，保持列表项语义，不管理按钮/业务交互。

## Types

ListProps、ListSize、ListVirtualListProps、ListScrollbarProps、ListExpose、ListSlots、ListEmits、ListInstance、ListItemInstance。

List 与 InfiniteScroll 分工独立：List管理展示与可选虚拟视口；无限分页应组合 InfiniteScroll 的 status/target 交互，不在 List 中重复维护加载状态机。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-list-background` | `var(--mp-color-bg-1)` | `background` |
| `--mp-list-border-color` | `var(--mp-color-border-2)` | `border`, `border-bottom`, `border-top` |
| `--mp-list-border-radius` | `4px` | `border-radius` |
| `--mp-list-border-width` | `1px` | `border`, `border-bottom`, `border-top` |
| `--mp-list-empty-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-list-empty-padding` | `24px 16px` | `padding` |
| `--mp-list-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-list-font-size-header` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-list-font-weight-header` | `500` | `font-weight` |
| `--mp-list-item-prefix-margin-right` | `12px` | `margin-inline-end` |
| `--mp-list-item-suffix-margin-left` | `12px` | `margin-inline-start` |
| `--mp-list-line-height` | `1.5` | `line-height` |
| `--mp-list-line-height-header` | `1.5` | `line-height` |
| `--mp-list-loading-padding` | `16px` | `padding` |
| `--mp-list-size-lg-padding-horizontal-footer` | `16px` | `padding` |
| `--mp-list-size-lg-padding-horizontal-header` | `16px` | `padding` |
| `--mp-list-size-lg-padding-horizontal-item` | `20px` | `padding` |
| `--mp-list-size-lg-padding-vertical-footer` | `12px` | `padding` |
| `--mp-list-size-lg-padding-vertical-header` | `12px` | `padding` |
| `--mp-list-size-lg-padding-vertical-item` | `16px` | `padding` |
| `--mp-list-size-md-padding-horizontal-footer` | `16px` | `padding` |
| `--mp-list-size-md-padding-horizontal-header` | `16px` | `padding` |
| `--mp-list-size-md-padding-horizontal-item` | `16px` | `padding` |
| `--mp-list-size-md-padding-vertical-footer` | `12px` | `padding` |
| `--mp-list-size-md-padding-vertical-header` | `12px` | `padding` |
| `--mp-list-size-md-padding-vertical-item` | `12px` | `padding` |
| `--mp-list-size-sm-padding-horizontal-footer` | `16px` | `padding` |
| `--mp-list-size-sm-padding-horizontal-header` | `16px` | `padding` |
| `--mp-list-size-sm-padding-horizontal-item` | `12px` | `padding` |
| `--mp-list-size-sm-padding-vertical-footer` | `12px` | `padding` |
| `--mp-list-size-sm-padding-vertical-header` | `12px` | `padding` |
| `--mp-list-size-sm-padding-vertical-item` | `8px` | `padding` |
| `--mp-list-text-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-list-text-color-header` | `var(--mp-color-text-1)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-list-background: var(--mp-color-bg-1);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
