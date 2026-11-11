<!-- Source: src/nav-menu/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/nav-menu -->

# NavMenu 导航菜单

移动端提供横向筛选入口，支持 NavMenu / NavMenuItem、独立选中值、标题跟随、插槽和受控状态；不提供桌面侧栏、折叠导航、悬停展开或“更多”收纳。

## 基础示例

### 横向筛选栏

分类使用纵向选项，地区横向平铺；普通面板默认通栏。更多筛选通过 `popup-layout="full"` 撑满筛选栏下方可视区域，自定义内容负责草稿、应用、重置及固定底部操作区。

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

## 布局与排列

### 长内容与固定操作区

普通面板限制在剩余可视区域内，长列表在面板内滚动；铺满面板的正文独立滚动，底部按钮始终保留。展开时锁定背景滚动。

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

## 数据与状态控制

### 受控状态与禁用

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

普通 v-model 保存每个 Item 独立的筛选值；v-model:open 控制面板展开。更新事件只是请求，受控父级必须接收更新；父级拒绝关闭时面板保持展开。非受控入口同一时间只展开一个，切换入口不清空其他值或已挂载插槽内容。关闭不会自动应用或重置表单。

使用 content 插槽时，自定义面板的无障碍名称跟随入口的名称；入口可通过 aria-label 或 aria-labelledby 指定名称。请确保自定义入口具有有意义的名称。

默认标题跟随匹配选项，无匹配时使用 label；label 插槽可固定标题。highlight 只覆盖视觉强调，打开面板不会让筛选自动生效。需要根级业务单选时，为 Item 设置唯一 name，并使用根 active-item。

## 交互与控制

### 面板状态与关闭

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

### 两端对应关系

两端面板均在首次展开时创建，关闭或切换入口后默认保留挂载，内部草稿和分支展开状态继续保留。设置 `unmount-on-close` 后，在关闭过渡结束时卸载面板；再次展开会重新创建内部组件，但不会清空 Item 自身的选中值。草稿提交、重置和筛选生效时机由业务决定。

根 `close()` 只请求关闭 Item 面板并恢复入口焦点，不改变选中值、active-item 或桌面导航树的 expanded-keys。受控 open 拒绝更新时仍保持展开。没有 options 且没有 content 插槽的入口不展开；异步 options 到达后按当前 open 状态展示。KeepAlive 停用期间隐藏面板并请求关闭，重新激活时仍以受控值为准。

Item 的选中值、展开状态、事件、插槽上下文及 `select/close/setOpen` 方法保持一致。两端根菜单都提供 `close/resize/setActiveItem`。`name` 必须在当前菜单内唯一，动态修改后会释放旧名称；同一次更新允许交换名称或在重排时复用旧名称，以更新完成后的名称检查重复。纵向选项会在初始值、受控值或 options 更新时展开当前值的可用祖先路径；用户仍可手动收起分支。

| 能力 | Cedar | Maple |
| --- | --- | --- |
| 根菜单 | options 导航树或 Item 入口；默认 vertical | 仅 Item 筛选栏；默认 horizontal |
| popup-layout | dropdown（默认）/ full-width / full-height / full | full-width（默认）/ full |
| 面板起点 | 当前入口底边 | 整个筛选栏底边；独立 Item 使用自身底边 |
| 触发与定位 | trigger / placement | 固定点击向下展开 |
| 遮罩与滚动 | 非模态，不锁背景滚动 | 根级 overlay / overlay-closable / lock-scroll / esc-to-close / z-index |
| 主题 | theme 可覆盖 | 跟随全局主题，无 theme 属性 |
| 导航树专用方法 | showOption / scrollTo / setCollapsed | — |

两端 `NavMenuPopupLayout` 分别导出本端支持的值域；Maple 的 `NavMenuMode` 仅为 horizontal，`options-mode` 仍支持两个方向。入口 default 插槽替换入口内部内容，移动端位于原生按钮中，请使用文本、图标等非交互内容；表单和操作按钮放在 content 插槽。

## API

### NavMenu Props

| 属性                              | 说明                                                                                     | 默认值           |
| --------------------------------- | ---------------------------------------------------------------------------------------- | ---------------- |
| mode                              | 移动端仅 horizontal                                                                      | horizontal       |
| active-item / default-active-item | 具名入口的受控 / 初始激活项                                                              | undefined / null |
| size                              | xs / sm / md / lg / xl                                                                   | md               |
| disabled                          | 禁用所有入口                                                                             | false            |
| popup-container                   | 浮层挂载容器；false 原地渲染；不改变视口布局参照，祖先 transform 可能改变 fixed 定位基准 | body             |
| popup-class                       | 面板附加类名                                                                             | —                |
| overlay                           | 显示背景遮罩；false 保留透明的点击关闭区域                                               | true             |
| overlay-closable                  | 点击遮罩区域关闭                                                                         | true             |
| lock-scroll                       | 展开及关闭过渡期间锁定背景滚动                                                           | true             |
| esc-to-close                      | Escape 关闭当前面板                                                                      | true             |
| z-index                           | 遮罩与面板的层级                                                                         | 自动分配         |

事件：update:active-item。方法：close()、resize()、setActiveItem(key)。默认插槽放置 mp-nav-menu-item；也可使用 NavMenu.Item。

### NavMenuItem Props

| 属性                          | 说明                                                                                                                         | 默认值            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| name                          | 根级业务激活项的唯一标识；省略时各筛选独立高亮                                                                               | —                 |
| label                         | 未匹配选项时的入口标题                                                                                                       | —                 |
| options / field-names         | Cedar 选项结构与字段映射                                                                                                     | [] / —            |
| model-value / default-value   | 受控 / 初始选中 key，支持字符串、数字和 null                                                                                 | undefined / null  |
| open / default-open           | 受控 / 初始展开状态                                                                                                          | undefined / false |
| highlight                     | 视觉强调覆盖，省略时跟随业务 active                                                                                          | undefined         |
| disabled                      | 禁用入口，同时遵循父菜单                                                                                                     | undefined             |
| hide-on-select                | 调用 select 后关闭面板                                                                                                       | true              |
| unmount-on-close | 关闭过渡结束后卸载面板；默认保留首次展开后的内容 | false |
| popup-layout                  | full-width：通栏，内容自适应高度；full：宽高占满筛选栏下方可视区域。均从整个筛选栏底边向下展开，不自动翻转，宽度不随入口变化 | full-width        |
| popup-style                   | 自定义面板样式                                                                                                               | —                 |
| popup-container / popup-class | 覆盖父菜单的挂载位置 / 面板类名                                                                                              | 跟随父菜单        |
| options-mode                  | 面板内选项的 vertical / horizontal 排列                                                                                      | vertical          |

独立使用 NavMenuItem 时，以自身底边作为面板起点。触发固定为点击，入口不足时横向滚动。移动端不提供 placement/trigger、dropdown 或侧向 full-height 布局。

事件：update:model-value、update:open、select(key, option, event)、click(event)。方法：select(key, event?)、close()、setOpen(open)。

插槽：default（入口内部内容）、label、icon、content（替换默认选项面板）、option-label、option-icon、option-extra。入口与 content 插槽收到 `{ modelValue, selectedOption, active, open, select, close }`；选项插槽收到 `{ option, active, expanded, level }`。

## Types

NavMenuKey 为 string | number。NavMenuOption 使用 key、label、icon、extra、children、disabled、show、props，type 为 item/group/divider。label/icon/extra 支持 VNode 或上下文渲染函数。数字 0 和空字符串是有效 key；普通项缺少 key 或重复 key 抛错。禁用向子项继承，隐藏项及其子树不展示。所有类型从 @maple-design/ui-vue 导出。

## 阅读方向与键盘交互

NavMenu 继承最近的原生 `dir`，支持动态切换和局部覆盖。导航栏左右键按阅读方向移动焦点，Home/End 聚焦首尾可用项；下键打开选项面板，Escape 关闭并返回触发项。选项面板的水平按键随方向调整，上下键保持原有顺序。Teleport 面板继承触发项的方向，切换方向不会清空筛选值或选中项。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
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

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-nav-menu-active-color: var(--mp-sys-color-content-brand);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
