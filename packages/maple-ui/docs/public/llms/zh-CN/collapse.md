<!-- Source: src/collapse/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/collapse -->

# Collapse

可以折叠 / 展开的内容区域。示例与 Cedar Design Web 保持一致，布局按移动端换行。

## 案例

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

### 手风琴模式

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

### 嵌套面板

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

### 无边框模式

通过设置 `bordered="false"` 隐藏边框。

Example source: src/collapse/example/demos/border-less.vue

```vue
<template>
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
</template>
<script lang="ts" setup></script>
```

### 分割线

通过 `divider` 控制面板之间的分割线。

Example source: src/collapse/example/demos/divider.vue

```vue
<template>
  <mp-space direction="column" :style="{ width: '100%' }">
    <mp-button @click="divider = !divider">
      {{ divider ? 'Hide divider' : 'Show divider' }}
    </mp-button>
    <mp-collapse :default-value="[]" :divider="divider">
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

const divider = ref(true)
</script>
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

### 额外节点

通过 `extra` 可以设置额外节点。点击 `extra` 区域不会触发展开。

Example source: src/collapse/example/demos/extra.vue

```vue
<template>
  <mp-collapse>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <template #extra>Extra</template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <template #extra>
        <mp-button status="primary" size="sm">Action</mp-button>
      </template>
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
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

### 自定义样式

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

## API

主值使用普通 `v-model`：`modelValue` 表示展开面板的 name 数组，手风琴模式也使用数组。`defaultValue` 仅在创建时初始化非受控状态，之后修改不会重置当前值；初始化不触发 `update:modelValue`。提供 `modelValue` 时由父级控制，以受控值为准。

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 当前展开面板的 name，支持 v-model | `(string \| number)[]` | `—` |
| default-value | 非受控初始展开面板 | `(string \| number)[]` | `[]` |
| accordion | 手风琴模式，同时最多展开一项 | `boolean` | `false` |
| show-expand-icon | 是否显示展开图标；未设置时由子项决定 | `boolean` | `—` |
| expand-icon-position | 展开图标位置 | `'left' \| 'right'` | `'left'` |
| bordered | 是否显示边框 | `boolean` | `true` |
| divider | 是否显示面板分割线 | `boolean` | `true` |
| offset | 展开面板是否显示间距 | `boolean` | `false` |
| destroy-on-hide | 是否在隐藏时销毁内容 | `boolean` | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:model-value | 请求更新展开面板 | `(string \| number)[]` |
| change | 展开面板变化时触发 | `(string \| number)[]`, `Event` |

### Slots

| Slot | Description | Scope |
| --- | --- | --- |
| default | 面板列表 | `—` |

### Methods

| Method | Description |
| --- | --- |
| toggleAll | 开启或关闭所有面板（手风琴模式下无效） |

<!-- same-source-api:end -->


父级可通过 `expand-icon` 插槽下发默认展开图标，作用域为 `expanded`、`disabled`、`position`。该插槽由子项读取，不在根节点渲染。

#### CollapseToggleAllOptions

| 参数 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expand | `'inverse'` 切换全部；`boolean` 控制全部展开或收起 | `'inverse' \| boolean` | `—` |
| skipDisabled | 是否跳过禁用面板 | `boolean` | `false` |

### `<collapse-item>` Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name **(必填)** | 面板唯一标识，对应 `modelValue` 中的值 | `string \| number` | `—` |
| title | 面板的标题 | `string` | `—` |
| disabled | 是否禁用 | `boolean` | `false` |
| show-expand-icon | 是否显示展开图标 | `boolean` | `true` |
| destroy-on-hide | 是否在隐藏时销毁内容 | `boolean` | `false` |

### `<collapse-item>` Slots

| 插槽名 | 描述 | 参数 |
| --- | --- | --- |
| title | 面板的标题 | `—` |
| extra | 额外内容 | `—` |
| expand-icon | 展开图标 | expanded: `boolean`<br>disabled: `boolean`<br>position: `'left' \| 'right'` |
| default | 面板内容 | `—` |

### 类型定义

组件导出以下类型定义。`Collapse.Item` 与 `mp-collapse-item` 为同一组件，`app.use(Collapse)` 会同时注册两者。

```ts
import type { CollapseInstance, CollapseToggleAllOptions, ExpandIconPosition } from '@maple-design/ui'
```

## 颜色变量

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

### 减少动态效果

内置 CSS 过渡遵循 `prefers-reduced-motion: reduce`。关闭过渡不改变最终显隐、选中／展开状态及事件语义；插槽内自定义动画由应用自行控制。
