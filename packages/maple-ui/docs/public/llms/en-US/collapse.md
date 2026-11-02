<!-- Source: src/collapse/docs/en-US.md; locale: en-US; page: /en-US/collapse -->

# Collapse

A content area which can be collapsed and expanded. Examples match Cedar Design Web, with a more compact mobile layout.

## Examples

### Basic usage

Group and hide complex content. Multiple panels can stay open.

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

### Disabled

Disable a panel with `disabled`.

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

### Accordion

Use `accordion` so only one panel is open. `modelValue` remains an array with at most one item.

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

### Nested panels

Panels can be nested.

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

### Borderless

Hide the border with `bordered="false"`.

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

### Divider

Control item dividers with `divider`.

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

### Expanded offset

Control the gap between expanded panels with `offset`.

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

### Extra

Set extra content with the `extra` slot. Clicking it does not toggle the panel.

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

### Expand icon

Customize the expand icon. The parent `expand-icon` slot is used by items without their own icon.

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

### Icon position

Set `expand-icon-position` to `left` or `right`.

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

### Destroy on hide

Destroy panel content after collapse with `destroy-on-hide`.

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

### Toggle all

Use `toggleAll` to expand or collapse all panels. It is a no-op in accordion mode.

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

### Custom style

Customize panel styles.

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

Use ordinary `v-model` for the primary value: `modelValue` is an array of expanded panel names, including accordion mode. `defaultValue` initializes uncontrolled state only at creation; later changes do not reset it. Initialization emits no `update:modelValue`. A supplied `modelValue` takes precedence and remains parent-controlled.

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value | Expanded names; v-model | `(string \| number)[]` | `—` |
| default-value | Uncontrolled initial expanded names | `(string \| number)[]` | `[]` |
| accordion | Accordion mode; at most one open panel | `boolean` | `false` |
| show-expand-icon | Show expand icons; unset defers to the item | `boolean` | `—` |
| expand-icon-position | Expand icon position | `'left' \| 'right'` | `'left'` |
| bordered | Show border | `boolean` | `true` |
| divider | Show dividers | `boolean` | `true` |
| offset | Gap between expanded panels | `boolean` | `false` |
| destroy-on-hide | Destroy content when hidden | `boolean` | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:model-value | Request an expanded-name update | `(string \| number)[]` |
| change | Emitted when expanded panels change | `(string \| number)[]`, `Event` |

### Slots

| Slot | Description | Scope |
| --- | --- | --- |
| default | Panel list | `—` |

### Methods

| Method | Description |
| --- | --- |
| toggleAll | Expand or collapse all panels (no-op in accordion) |

<!-- same-source-api:end -->

The parent `expand-icon` slot is forwarded to items that do not provide their own icon. Scope: `expanded`, `disabled`, `position`. It is not rendered on the root node.

#### CollapseToggleAllOptions

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| expand | `'inverse'` toggles all; `boolean` expands or collapses all | `'inverse' \| boolean` | `—` |
| skipDisabled | Skip disabled panels | `boolean` | `false` |

### `<collapse-item>` Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| name **(required)** | Unique name, corresponding to `modelValue` | `string \| number` | `—` |
| title | Panel title | `string` | `—` |
| disabled | Disable the panel | `boolean` | `false` |
| show-expand-icon | Whether to show the expand icon | `boolean` | `true` |
| destroy-on-hide | Destroy content when hidden | `boolean` | `false` |

### `<collapse-item>` Slots

| Slot | Description | Scope |
| --- | --- | --- |
| title | Panel title | `—` |
| extra | Extra content | `—` |
| expand-icon | Expand icon | expanded: `boolean`<br>disabled: `boolean`<br>position: `'left' \| 'right'` |
| default | Panel content | `—` |

### Types

`Collapse.Item` is the same component as `mp-collapse-item`; `app.use(Collapse)` registers both.

```ts
import type { CollapseInstance, CollapseToggleAllOptions, ExpandIconPosition } from '@maple-design/ui'
```

## Color variables

Public Collapse color variables use system semantics by default and stay aligned with Cedar:

| Variable | Default semantic role |
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

### Reduced motion

Built-in CSS transitions respect `prefers-reduced-motion: reduce`. Final visibility, checked/expanded state and event semantics remain unchanged; custom slot animations are controlled by the application.
