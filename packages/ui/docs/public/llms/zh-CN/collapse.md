<!-- Source: src/collapse/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/collapse -->

# Collapse

可以折叠 / 展开的内容区域。示例与 Cedar Design Web 保持一致，布局按移动端换行。

## 基础示例

### 基础用法

用于将复杂的内容区域分组和隐藏，可折叠或展开。默认可以展开多个面板。

Example source: src/collapse/example/demos/basic.vue

```vue
<template>
  <mp-collapse :default-value="['1', 2]">
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

## 外观与状态

### 禁用

通过 `disabled` 禁用面板。

Example source: src/collapse/example/demos/disabled.vue

```vue
<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-button @click="disabled = !disabled">
      {{ disabled ? 'Enable' : 'Disable' }}
    </mp-button>
    <mp-collapse :default-value="[1]">
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="1" :disabled="disabled">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2" :disabled="disabled">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>
```

## 布局与排列

### 嵌套面板

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `default-value` | 非受控初始展开面板 | 嵌套面板、展开图标位置 |
| `destroy-on-hide` | 是否在隐藏时销毁内容 | 嵌套面板 |
| `offset` | 展开面板是否显示间距 | 展开间距 |
| `expand-icon-position` | 展开图标在标题区域的 left 或 right 位置，默认 left；不控制内容展开方向 | 展开图标位置 |
| `show-expand-icon` | 是否显示展开图标；未设置时由子项决定 | 展开图标位置 |
<!-- demo-config-notes:end -->

面板多层嵌套。

Example source: src/collapse/example/demos/nested.vue

```vue
<template>
  <mp-collapse :default-value="['1', 2]" destroy-on-hide>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <mp-collapse :default-value="['1.1']" destroy-on-hide>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1.1">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1.2">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
      </mp-collapse>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

### 展开间距

通过 `offset` 控制展开面板之间的间距。

Example source: src/collapse/example/demos/offset.vue

```vue
<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-button @click="offset = !offset">
      {{ offset ? 'Hide offset' : 'Show offset' }}
    </mp-button>
    <mp-collapse v-model="activeNames" :offset="offset">
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const offset = ref(true)
const activeNames = ref<(string | number)[]>(['1', '2'])
</script>
```

### 展开图标位置

通过 `expand-icon-position` 属性设置展开图标的位置。

Example source: src/collapse/example/demos/icon-position.vue

```vue
<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-space>
      <mp-button @click="position = position === 'right' ? 'left' : 'right'">
        {{ position === 'right' ? 'Icon left' : 'Icon right' }}
      </mp-button>
      <mp-button @click="hideIcon = !hideIcon">
        {{ hideIcon ? 'Show icon' : 'Hide icon' }}
      </mp-button>
    </mp-space>
    <mp-collapse :default-value="['1']" :expand-icon-position="position" :show-expand-icon="!hideIcon">
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
        <template #extra>
          <mp-tag size="sm">city</mp-tag>
        </template>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2" disabled>
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
      <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
        <div>Beijing Toutiao Technology Co., Ltd.</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const position = ref<'left' | 'right'>('left')
const hideIcon = ref(false)
</script>
```

## 内容与展示

### 手风琴模式

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `default-value` | 非受控初始展开面板 | 手风琴模式、边框与分隔线、展开图标 |
| `accordion` | 手风琴模式，同时最多展开一项 | 手风琴模式 |
| `bordered` | 是否显示边框 | 边框与分隔线 |
| `divider` | 是否显示面板分割线 | 边框与分隔线 |
| `destroy-on-hide` | 是否在隐藏时销毁内容 | 隐藏时销毁 |
<!-- demo-config-notes:end -->

通过 `accordion` 开启手风琴模式，同时只能打开一个面板。手风琴模式下 `modelValue` 仍为数组，最多包含一项。

Example source: src/collapse/example/demos/accordion.vue

```vue
<template>
  <mp-collapse :default-value="[1]" accordion>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

### 边框与分隔线

比较外边框和面板间分隔线，分别展开面板观察两种装饰的边界。

<details>
<summary>配置说明与使用限制</summary>

#### 无边框模式

通过设置 `bordered="false"` 隐藏边框。

#### 分割线

通过 `divider` 控制面板之间的分割线。

</details>

Example source: src/collapse/example/demos/border-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, ref } from 'vue'

const scene2 = demoProxyRefs(
  (() => {
    const divider = ref(true)
    return { divider }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="border-less">
      <h4><span lang="zh-CN">无边框模式</span><span lang="en-US">Borderless</span></h4>
      <mp-collapse :default-value="['1']" :bordered="false">
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2" disabled>
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
      </mp-collapse>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="divider">
      <h4><span lang="zh-CN">分割线</span><span lang="en-US">Divider</span></h4>
      <mp-space
        direction="column"
        :style="{
          width: '100%',
        }"
      >
        <mp-button @click="scene2.divider = !scene2.divider">
          {{ scene2.divider ? 'Hide divider' : 'Show divider' }}
        </mp-button>
        <mp-collapse :default-value="[]" :divider="scene2.divider">
          <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </mp-collapse-item>
          <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="2">
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </mp-collapse-item>
          <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </mp-collapse-item>
        </mp-collapse>
      </mp-space>
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

### 额外节点

通过 `extra` 可以设置额外节点。点击 `extra` 区域不会触发展开。

Example source: src/collapse/example/demos/extra.vue

```vue
<template>
  <mp-collapse>
    <mp-collapse-item :heading-level="3" :region="false" title="Beijing Toutiao Technology Co., Ltd." name="1">
      <template #extra>Extra</template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item :heading-level="3" :region="false" title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <template #extra>
        <mp-button status="primary" size="sm">Action</mp-button>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item :heading-level="3" :region="false" title="Beijing Toutiao Technology Co., Ltd." name="3">
      <template #extra>
        <mp-tag size="sm">city</mp-tag>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

### 展开图标

为展开项自定义展开图标。父级 `expand-icon` 插槽会下发给未自定义图标的子项。

Example source: src/collapse/example/demos/expand-icon.vue

```vue
<template>
  <mp-collapse :default-value="['1', 2]">
    <template #expand-icon="{ expanded }">
      <span>{{ expanded ? '▼' : '▶' }}</span>
    </template>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <template #expand-icon="{ expanded }">
        <span>{{ expanded ? '^^' : 'vv' }}</span>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

### 隐藏时销毁

通过设置 `destroy-on-hide` 可以让面板内容在隐藏时销毁。

Example source: src/collapse/example/demos/destroy.vue

```vue
<template>
  <mp-collapse :default-value="['1', 2]" destroy-on-hide>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3" :show-expand-icon="false">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
```

## 自定义与插槽

### 自定义样式

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `default-value` | 非受控初始展开面板 | 自定义样式 |
| `bordered` | 是否显示边框 | 自定义样式 |
<!-- demo-config-notes:end -->

自定义面板样式。

Example source: src/collapse/example/demos/custom.vue

```vue
<template>
  <mp-collapse :default-value="['1', 2]" :bordered="false">
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :style="customStyle" name="1">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :style="customStyle" :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :style="customStyle" name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup>
const customStyle = {
  borderRadius: '6px',
  marginBottom: '12px',
  overflow: 'hidden',
}
</script>
```

## 交互与控制

### 切换全部

通过 `toggleAll` 批量展开 / 收起面板。手风琴模式下不可用。

Example source: src/collapse/example/demos/toggle-all.vue

```vue
<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-space wrap>
      <mp-button @click="toggleAll({ expand: 'inverse' })">Toggle all</mp-button>
      <mp-button @click="toggleAll({ expand: 'inverse', skipDisabled: true })">Toggle all (skip disabled)</mp-button>
      <mp-button @click="toggleAll({ expand: true })">Expand all</mp-button>
      <mp-button @click="toggleAll({ expand: true, skipDisabled: true })">Expand all (skip disabled)</mp-button>
      <mp-button @click="toggleAll({ expand: false })">Collapse all</mp-button>
      <mp-button @click="toggleAll({ expand: false, skipDisabled: true })">Collapse all (skip disabled)</mp-button>
    </mp-space>
    <mp-collapse ref="collapseRef" v-model="activeNames">
      <mp-collapse-item title="Panel 1" name="1">
        <div>Content 1</div>
      </mp-collapse-item>
      <mp-collapse-item title="Panel 2" name="2">
        <div>Content 2</div>
      </mp-collapse-item>
      <mp-collapse-item title="Panel 3" name="3" disabled>
        <div>Content 3</div>
      </mp-collapse-item>
      <mp-collapse-item title="Panel 4" name="4" disabled>
        <div>Content 4</div>
      </mp-collapse-item>
    </mp-collapse>
  </mp-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const collapseRef = ref<{
  toggleAll: (options: { expand: boolean | 'inverse'; skipDisabled?: boolean }) => void
}>()
const activeNames = ref<(string | number)[]>(['2', '4'])

const toggleAll = (options: { expand: boolean | 'inverse'; skipDisabled?: boolean }) => {
  collapseRef.value?.toggleAll(options)
}
</script>
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。标题文字与扩展内容继承阅读方向，展开状态不因切换方向改变。expand-icon-position 的 left/right 始终表示物理侧，不改为逻辑起止；自定义展开图形不额外镜像。

## API

主值使用普通 `v-model`：`modelValue` 表示展开面板的 name 数组，手风琴模式也使用数组。`defaultValue` 仅在创建时初始化非受控状态，之后修改不会重置当前值；初始化不触发 `update:modelValue`。提供 `modelValue` 时由父级控制，以受控值为准。

<!-- same-source-api:start -->

### Collapse Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 当前展开面板的 name，支持 v-model | `(string \| number)[]` | `—` |
| default-value | 非受控初始展开面板 | `(string \| number)[]` | `[]` |
| accordion | 手风琴模式，同时最多展开一项 | `boolean` | `false` |
| show-expand-icon | 是否显示展开图标；未设置时由子项决定 | `boolean` | `—` |
| expand-icon-position | 展开图标在标题区域的 left 或 right 位置，默认 left；不控制内容展开方向 | `'left' \| 'right'` | `'left'` |
| bordered | 是否显示边框 | `boolean` | `true` |
| divider | 是否显示面板分割线 | `boolean` | `true` |
| offset | 展开面板是否显示间距 | `boolean` | `false` |
| destroy-on-hide | 是否在隐藏时销毁内容 | `boolean` | `false` |

默认会立即挂载所有面板内容；父级或子项任一设置 `destroy-on-hide` 时，关闭的内容会在收起过渡结束后销毁，过渡中重新展开会保留内容。关闭状态下修改该配置会立即生效。父级显式设置 `show-expand-icon` 时覆盖子项配置。

### Collapse Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:model-value | 请求更新展开面板 | `(string \| number)[]` |
| change | 展开面板变化时触发 | `(string \| number)[]`, `Event` |

### Collapse Slots

| Slot | Description | Scope |
| --- | --- | --- |
| default | 面板列表 | `—` |

### Collapse Methods

| Method | Description |
| --- | --- |
| toggleAll | 开启或关闭所有面板（手风琴模式下无效） |

<!-- same-source-api:end -->


父级可通过 `expand-icon` 插槽下发默认展开图标，作用域为 `expanded`、`disabled`、`position`。该插槽由子项读取，不在根节点渲染。

### CollapseItem Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name **(必填)** | 面板唯一标识，对应 `modelValue` 中的值 | `string \| number` | `—` |
| title | 面板的标题 | `string` | `—` |
| heading-level | 标题语义层级，按页面结构设置 1–6；未设置时不添加标题角色 | `1–6` | `—` |
| region | 是否将内容声明为区域地标 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| show-expand-icon | 是否显示展开图标 | `boolean` | `true` |
| destroy-on-hide | 是否在隐藏时销毁内容 | `boolean` | `false` |

按页面结构设置 `heading-level`；面板较多时可设 `:region="false"`，避免产生过多区域地标。`extra` 位于标题按钮之外，适合放置独立操作；标题和展开图标插槽应避免放置交互控件。右侧展开图标位于标题按钮内，`extra` 位于按钮之后。

### CollapseItem Slots

| 插槽名 | 描述 | 参数 |
| --- | --- | --- |
| title | 面板的标题 | `—` |
| extra | 额外内容 | `—` |
| expand-icon | 展开图标 | expanded: `boolean`<br>disabled: `boolean`<br>position: `'left' \| 'right'` |
| default | 面板内容 | `—` |

## Types

### CollapseToggleAllOptions

| 参数 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expand | `'inverse'` 切换全部；`boolean` 控制全部展开或收起 | `'inverse' \| boolean` | `—` |
| skipDisabled | 是否跳过禁用面板 | `boolean` | `false` |

组件导出以下类型定义。`Collapse.Item` 与 `mp-collapse-item` 为同一组件，`app.use(Collapse)` 会同时注册两者。

```ts
import type { CollapseInstance, CollapseToggleAllOptions, ExpandIconPosition } from '@maple-design/ui-vue'
```

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-collapse-border-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-collapse-border-radius` | `4px` | `border-radius` |
| `--mp-collapse-border-width` | `1px` | `border` |
| `--mp-collapse-content-bg` | `var(--mp-sys-color-surface-muted)` | `background-color` |
| `--mp-collapse-content-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-collapse-content-padding-vertical` | `10px` | `padding` |
| `--mp-collapse-content-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-collapse-content-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-collapse-expand-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-collapse-expand-icon-active-transform` | `rotate(-180deg)` | `transform` |
| `--mp-collapse-expand-icon-right-active-transform` | `rotate(-180deg)` | `transform` |
| `--mp-collapse-expand-icon-right-transform` | `rotate(0deg)` | `transform` |
| `--mp-collapse-expand-icon-size` | `16px` | `font-size` |
| `--mp-collapse-expand-icon-spacing-text` | `8px` | `gap` |
| `--mp-collapse-expand-icon-transform` | `rotate(0deg)` | `transform` |
| `--mp-collapse-focus-color` | `currentColor` | `outline` |
| `--mp-collapse-focus-offset` | `-2px` | `outline-offset` |
| `--mp-collapse-focus-width` | `2px` | `outline` |
| `--mp-collapse-item-border-color` | `var(--mp-sys-color-border-default)` | `border-bottom` |
| `--mp-collapse-item-border-width` | `1px` | `border-bottom` |
| `--mp-collapse-item-margin-top` | `16px` | `margin-top` |
| `--mp-collapse-line-height` | `1.5` | `line-height` |
| `--mp-collapse-motion-duration` | `0.25s` | `transition` |
| `--mp-collapse-motion-easing` | `ease` | `transition` |
| `--mp-collapse-title-bg` | `var(--mp-sys-color-surface-default)` | `background`, `background-color` |
| `--mp-collapse-title-bg-active` | `var(--mp-sys-color-surface-default)` | `background-color` |
| `--mp-collapse-title-bg-disabled` | `var(--mp-sys-color-surface-default)` | `background-color` |
| `--mp-collapse-title-font-size` | `var(--mp-font-size-lg)` | `font-size` |
| `--mp-collapse-title-font-weight-active` | `500` | `font-weight` |
| `--mp-collapse-title-line-height` | `24px` | `line-height` |
| `--mp-collapse-title-padding-horizontal` | `12px` | `padding` |
| `--mp-collapse-title-padding-vertical` | `10px` | `padding` |
| `--mp-collapse-title-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-collapse-title-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-collapse-border-color: var(--mp-sys-color-border-default);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 颜色

Collapse 的公开颜色变量使用 system 语义作为默认值，Maple 与 Cedar 保持一致：

| 变量 | 默认语义 |
| --- | --- |
| `--mp-collapse-border-color` | `--mp-sys-color-border-default` |
| `--mp-collapse-title-bg` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-bg-active` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-bg-disabled` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-text-color` | `--mp-sys-color-content-primary` |
| `--mp-collapse-title-text-color-disabled` | `--mp-sys-color-content-disabled` |
| `--mp-collapse-content-text-color` | `--mp-sys-color-content-primary` |
| `--mp-collapse-content-text-color-disabled` | `--mp-sys-color-content-disabled` |
| `--mp-collapse-content-bg` | `--mp-sys-color-surface-muted` |
| `--mp-collapse-expand-icon` | `var(--mp-sys-color-content-secondary)` |
| `--mp-collapse-item-border-color` | `--mp-sys-color-border-default` |

#### 减少动态效果

内置 CSS 过渡遵循 `prefers-reduced-motion: reduce`。关闭过渡不改变最终显隐、选中／展开状态及事件语义；插槽内自定义动画由应用自行控制。
