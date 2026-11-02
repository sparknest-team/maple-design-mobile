<!-- Source: src/pagination/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/pagination -->

# Pagination

两端统一 API、交互与演示，支持按容器宽度自适应布局。

## 案例

### 基础与双向绑定

Example source: src/pagination/example/demos/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination v-model="current" :total="50" />
    <span>Current: {{ current }}</span>
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### 五档尺寸与阴影

Example source: src/pagination/example/demos/size.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const size = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
const elevation = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <mp-radio-group v-model="size"
      ><mp-radio v-for="value in ['xs', 'sm', 'md', 'lg', 'xl']" :key="value" :value="value">{{
        value
      }}</mp-radio></mp-radio-group
    >
    <div class="pagination-demo-controls"><mp-switch v-model="elevation" /> Elevation</div>
    <mp-pagination :size="size" :elevation="elevation" :total="50" show-page-size show-jumper />
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### 禁用与单页隐藏

Example source: src/pagination/example/demos/disabled.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(true)
const single = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-switch v-model="disabled" /> Disabled<mp-switch v-model="single" /> Single page
    </div>
    <mp-pagination
      :total="single ? 5 : 200"
      :disabled="disabled"
      hide-on-single-page
      show-jumper
      show-page-size
      show-total
    />
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### 更多页码与省略跳转

Example source: src/pagination/example/demos/more-page-size.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const buffer = ref(2)
const more = ref(false)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-radio-group v-model="buffer"
        ><mp-radio v-for="value in [0, 1, 2]" :key="value" :value="value">Buffer {{ value }}</mp-radio></mp-radio-group
      ><mp-switch v-model="more" /> Show more
    </div>
    <mp-pagination :total="500" :default-value="12" :buffer-size="buffer" :show-more="more" :responsive="false" />
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### 每页条数与公共选择器配置

Example source: src/pagination/example/demos/show-page-size.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const pageSize = ref(10)
const current = ref(5)
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination
      v-model="current"
      v-model:page-size="pageSize"
      :total="200"
      show-page-size
      :page-size-options="[10, 20, 50, 100]"
      :page-size-props="{ placement: 'bottom-start' }"
    />
    <span>Current: {{ current }} · Page size: {{ pageSize }}</span>
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### 跳转与前后缀插槽

Example source: src/pagination/example/demos/show-jumper.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination :total="200" show-jumper :responsive="false">
      <template #jumper-prepend>Go to</template><template #jumper-append>page</template>
    </mp-pagination>
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### 简洁模式

Example source: src/pagination/example/demos/simple.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const current = ref(3)
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination v-model="current" :total="200" simple show-total show-page-size />
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### 自定义总数插槽

Example source: src/pagination/example/demos/show-total.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination :total="200" show-total
      ><template #total="{ total }">{{ total }} records</template></mp-pagination
    >
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### 完整功能交互

Example source: src/pagination/example/demos/all.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const total = ref(true)
const jumper = ref(true)
const pageSize = ref(true)
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-switch v-model="total" /> Total<mp-switch v-model="jumper" /> Jumper<mp-switch v-model="pageSize" /> Page size
    </div>
    <mp-pagination :total="125" :show-total="total" :show-jumper="jumper" :show-page-size="pageSize" />
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### 数据变化与自动调整

Example source: src/pagination/example/demos/auto-adjust.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const total = ref(200)
const current = ref(18)
const autoAdjust = ref(true)
function reset() {
  total.value = 200
  current.value = 18
}
</script>
<template>
  <div class="pagination-demo">
    <div class="pagination-demo-controls">
      <mp-switch v-model="autoAdjust" /> Auto adjust<mp-button @click="total = 25">Reduce total</mp-button
      ><mp-button @click="reset">Reset</mp-button>
    </div>
    <mp-pagination v-model="current" :total="total" :auto-adjust="autoAdjust" show-total show-page-size />
    <span>Current: {{ current }} · Total: {{ total }}</span>
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### 容器宽度与窄屏布局

Example source: src/pagination/example/demos/responsive.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const width = ref(360)
const responsive = ref(true)
</script>
<template>
  <div class="pagination-demo">
    <mp-radio-group v-model="width" wrap
      ><mp-radio v-for="value in [280, 360, 480, 640]" :key="value" :value="value"
        >{{ value }}px</mp-radio
      ></mp-radio-group
    >
    <div class="pagination-demo-controls"><mp-switch v-model="responsive" /> Responsive</div>
    <div :style="{ width: width + 'px', maxWidth: '100%' }">
      <mp-pagination :total="250" :responsive="responsive" show-total show-jumper show-page-size />
    </div>
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

### 自定义分页按钮与样式

Example source: src/pagination/example/demos/custom-page-button.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
</script>
<template>
  <div class="pagination-demo">
    <mp-pagination
      :total="300"
      :default-value="10"
      :buffer-size="0"
      :responsive="false"
      :page-item-style="{ borderRadius: '8px' }"
      :active-page-item-style="{ fontWeight: '700' }"
    >
      <template #page-item="{ page }">{{ page }}</template>
      <template #page-item-step="{ type }">{{ type === 'previous' ? 'Prev' : 'Next' }}</template>
      <template #page-item-ellipsis>✦</template>
    </mp-pagination>
  </div>
</template>
<style scoped>
.pagination-demo {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.pagination-demo-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
```

## API

主值使用普通 `v-model`：`modelValue` 表示当前页码，从 1 开始；pageSize 仍独立控制每页条数。`defaultValue` 仅在创建时初始化非受控状态，之后修改不会重置当前值；初始化不触发 `update:modelValue`。提供 `modelValue` 时由父级控制，以受控值为准。

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| total | 数据总数（必填） | `number` | `—` |
| model-value | 当前页码，支持 v-model | `number` | `—` |
| default-value | 非受控初始页码 | `number` | `1` |
| page-size | 每页条数，支持 v-model:page-size | `number` | `—` |
| default-page-size | 非受控初始条数 | `number` | `10` |
| disabled | 禁用所有交互 | `boolean` | `false` |
| hide-on-single-page | 不足两页时隐藏 | `boolean` | `false` |
| simple | 显式启用简洁模式 | `boolean` | `false` |
| show-total | 显示总数 | `boolean` | `false` |
| show-more | 完整模式追加向后跳页按钮 | `boolean` | `false` |
| show-jumper | 完整模式显示独立跳转框；简洁模式已有页码输入 | `boolean` | `false` |
| show-page-size | 显示条数选择器 | `boolean` | `false` |
| page-size-options | 正整数条数选项 | `number[]` | `[10, 20, 30, 40, 50]` |
| page-size-props | 公共选择器配置，不能覆盖分页值、选项和尺寸 | `PaginationPageSizeProps` | `—` |
| size | 所有内部控件尺寸 | `'xs' / 'sm' / 'md' / 'lg' / 'xl'` | `'md'` |
| page-item-style | 数字页码基础样式 | `CSSProperties` | `—` |
| active-page-item-style | 叠加到当前数字页码的样式 | `CSSProperties` | `—` |
| base-size | 完整模式省略阈值的基础数 | `number` | `6` |
| buffer-size | 当前页两侧的页码数 | `number` | `2` |
| elevation | 页码按钮阴影；true 使用 2 级 | `boolean / number` | `false` |
| responsive | 按容器宽度自动切换简洁模式 | `boolean` | `true` |
| compact-breakpoint | 简洁模式的最大容器宽度，单位 px | `number` | `480` |
| auto-adjust | 条数变化时保留首条位置；总数减少时修正越界页码 | `boolean` | `true` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:model-value | 请求更新页码 | `number` |
| change | 页码提交变化（与 update:modelValue 成对） | `number` |
| update:page-size | 请求更新条数 | `number` |
| page-size-change | 条数提交变化（与 update:page-size 成对） | `number` |

### Slots

| Slot | Description | Scope |
| --- | --- | --- |
| total | 总数 | `{ total: number }` |
| page-item | 数字页码 | `{ page: number }` |
| page-item-step | 上一页、下一页 | `{ type: 'previous' / 'next' }` |
| page-item-ellipsis | 省略跳转按钮 | `—` |
| jumper-prepend | 独立跳转框前缀 | `—` |
| jumper-append | 独立跳转框后缀 | `—` |

### Methods

| Method | Description |
| --- | --- |

<!-- same-source-api:end -->

## 行为说明

容器宽度不超过 `compact-breakpoint` 时自动使用简洁模式；桌面侧栏与移动端规则相同。保留总数和条数选择器，辅助控件换行，上一页、下一页按钮跟随 size，不再在窄屏强制放大（默认 36px）。设置 `responsive=false` 保留完整页码，极窄时仅页码列表横向滚动，不撑宽页面。

简洁模式的当前页输入框承担跳转功能，不重复展示独立 jumper。`page-item`、`page-item-ellipsis`、`jumper-prepend`、`jumper-append` 仅在完整模式的对应控件中渲染。

页码按钮支持 Tab、Enter、Space，当前页使用 `aria-current=page`。跳转框使用数字键盘提示，Enter 或失焦提交；空值、非数字、小数不跳转，整数越界限制到有效页码。禁用状态阻止所有提交。

`auto-adjust` 在条数改变时尽量保留原页面首条数据的位置，总数减少时限制到最后一页，零条数据时页码回到 1。受控模式只发出更新请求，显示由父组件决定；父组件同一批更新明确设置 modelValue 时优先遵循该值。

完整模式和简洁模式的“前往”输入框均显示当前页码。点击翻页、外部更新 modelValue 或切换每页条数触发页码调整时同步回显；非法输入恢复为当前页码。

### PaginationPageSizeProps

每页条数选择器按已选文字与下拉箭头自适应宽度，两者之间仅保留条目间距，切换选项或语言时自动更新。可通过 `--mp-pagination-select-width` 自定义宽度。弹出菜单仍按选项内容独立计算宽度。

两端支持相同配置：`disabled?: boolean`、`placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'`、`popupContainer?: string | HTMLElement | false`、`class?: string`、`style?: CSSProperties`。外层 disabled 优先。默认 placement 为 bottom-start。

此配置不再透传任意 SelectProps/MenuProps。分页值、选项和尺寸分别使用 page-size、page-size-options、size。

## 类型定义

```ts
import type { PaginationProps, PaginationInstance, PaginationPageSizeProps } from '@maple-design/ui'
```

## 样式变量

| Token | Default |
| --- | --- |
| `--mp-pagination-text-color` | `var(--mp-color-text-1)` |
| `--mp-pagination-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-pagination-gap` | `var(--mp-sys-space-5)` |
| `--mp-pagination-item-gap` | `var(--mp-sys-space-2)` |
| `--mp-pagination-focus-space` | `3px` |
| `--mp-pagination-size-xs` | `24px` |
| `--mp-pagination-size-sm` | `28px` |
| `--mp-pagination-size-md` | `36px` |
| `--mp-pagination-size-lg` | `44px` |
| `--mp-pagination-size-xl` | `52px` |
| `--mp-pagination-item-padding` | `var(--mp-sys-space-4)` |
| `--mp-pagination-item-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-pagination-icon-size` | `16px` |
| `--mp-pagination-input-width` | `32px` |
| `--mp-pagination-select-width` | `max-content` |
| `--mp-pagination-touch-size` | `44px` |
| `--mp-pagination-focus-width` | `2px` |
| `--mp-pagination-focus-offset` | `1px` |
| `--mp-pagination-focus-color` | `var(--mp-color-primary)` |
| `--mp-pagination-item-background` | `transparent` |
| `--mp-pagination-hover-background` | `var(--mp-color-fill-1)` |
| `--mp-pagination-active-background` | `var(--mp-color-primary-light-1)` |
| `--mp-pagination-active-color` | `var(--mp-color-primary)` |
| `--mp-pagination-disabled-color` | `var(--mp-color-text-disabled)` |
| `--mp-pagination-disabled-background` | `var(--mp-color-fill-1)` |
