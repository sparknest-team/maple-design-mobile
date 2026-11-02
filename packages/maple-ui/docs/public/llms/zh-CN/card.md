<!-- Source: src/card/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/card -->

# Card

## 案例

### 基础用法与副标题

Example source: src/card/example/demos/basic.vue

```vue
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card title="Project overview" description="Keep the team informed." />
    <mp-card
      title="Project overview"
      subtitle="Updated today"
      description="Keep the team informed."
      top-divider
      bottom-divider
    >
      Release checklist and project updates.
      <template #title-action><mp-button size="sm">More</mp-button></template>
      <template #footer><mp-button status="primary">View details</mp-button></template>
    </mp-card>
  </mp-space>
</template>
```

### 变体与阴影

Example source: src/card/example/demos/variant.vue

```vue
<script setup lang="ts">
const variants = ['default', 'outline', 'tonal'] as const
</script>

<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card v-for="variant in variants" :key="variant" :variant="variant" :title="variant">Card content</mp-card>
    <mp-card :elevation="false" title="No elevation">Card content</mp-card>
    <mp-card :elevation="4" title="Elevation 4">Card content</mp-card>
  </mp-space>
</template>
```

### 尺寸

Example source: src/card/example/demos/size.vue

```vue
<script setup lang="ts">
const sizes = ['sm', 'md'] as const
</script>

<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card v-for="size in sizes" :key="size" :size="size" :title="size" subtitle="Content density"
      >Card content</mp-card
    >
  </mp-space>
</template>
```

### 外观组合

适用于信息分组和内容层次。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/card/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive } from 'vue'

const __demoAppearance = __demoReactive({ variant: 'default', size: 'md' })
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
            { label: 'default', value: 'default' },
            { label: 'outline', value: 'outline' },
            { label: 'tonal', value: 'tonal' },
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
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-card title="Project overview" description="Keep the team informed." v-bind="__demoAppearance" />
  </mp-space>
</template>
```

### 自定义标题区域

Example source: src/card/example/demos/no-padding.vue

```vue
<template>
  <mp-card title="Fallback title">
    <template #header
      ><header style="padding: 16px">
        <strong>Custom header</strong>
        <p>Replaces the title and subtitle region.</p>
      </header></template
    >
    Card content
  </mp-card>
</template>
```

### 悬浮样式

Example source: src/card/example/demos/hoverable.vue

```vue
<template>
  <mp-card hoverable title="Hover over this card" style="width: 100%; max-width: 360px"
    >Hover feedback on pointer devices.</mp-card
  >
</template>
```

### 图片与三种布局

Example source: src/card/example/demos/image.vue

```vue
<script setup lang="ts">
const imageSrc = `${(import.meta as ImportMeta & { env: { BASE_URL: string } }).env.BASE_URL}cat.jpg`
const directions = ['column', 'row', 'row-reverse'] as const
</script>

<template>
  <mp-space direction="column" style="width: 100%">
    <mp-card
      v-for="direction in directions"
      :key="direction"
      :direction="direction"
      :title="direction"
      :src="imageSrc"
      alt="Cat"
      :image-height="120"
      :image-width="direction === 'column' ? '100%' : 100"
      fit="cover"
      >Card content</mp-card
    >
    <mp-card title="Custom cover"
      ><template #cover
        ><img :src="imageSrc" alt="Cat" style="width: 100%; height: 120px; object-fit: cover" /></template
      >Cover slot overrides the image.</mp-card
    >
  </mp-space>
</template>
```

### 长标题与提示

Example source: src/card/example/demos/tooltip.vue

```vue
<script setup lang="ts">
const title = 'Project overview with a long title that does not fit on one line'
</script>

<template>
  <mp-card style="width: 100%; max-width: 280px">
    <template #title
      ><span class="long-title" :title="title">{{ title }}</span></template
    >
    <template #description
      ><span class="long-title" :title="title">{{ title }}</span></template
    >
    Native title tooltip on pointer devices; the full text remains in the DOM.
  </mp-card>
</template>

<style scoped>
.long-title {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
```

### 水波与点击事件

Example source: src/card/example/demos/ripple.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const clicks = ref(0)
</script>

<template>
  <mp-card ripple title="Click this card" @click="clicks++"
    >Clicks: <output aria-live="polite">{{ clicks }}</output></mp-card
  >
</template>
```

### 全屏展开与关闭

Example source: src/card/example/demos/floating.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const floating = ref(false)
</script>

<template>
  <mp-card v-model:floating="floating" title="Project overview" :floating-duration="250">
    Summary content
    <template #footer><mp-button status="primary" @click="floating = true">Expand</mp-button></template>
    <template #floating-content><p style="padding: 16px">Expanded project details.</p></template>
    <template #close-button
      ><mp-button aria-label="Close expanded card" @click.stop="floating = false">Close</mp-button></template
    >
  </mp-card>
</template>
```

### 内容插槽

Example source: src/card/example/demos/slots.vue

```vue
<template>
  <mp-card top-divider bottom-divider>
    <template #cover><div style="padding: 16px">Custom cover</div></template>
    <template #title="{ slotClass }"><strong :class="slotClass">Custom title</strong></template>
    <template #title-action><mp-button size="sm">More</mp-button></template>
    <template #subtitle="{ slotClass }"><span :class="slotClass">Custom subtitle</span></template>
    <template #description="{ slotClass }"><p :class="slotClass">Custom description</p></template>
    Default content
    <template #footer><mp-button status="primary">Confirm</mp-button></template>
  </mp-card>
</template>
```

### Floating scheduler lifecycle / 浮起调度生命周期

Example source: src/card/example/demos/scheduler-lifecycle.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const floating = ref(false)
const ripple = ref(true)
const duration = ref(250)
</script>
<template>
  <div>
    <mp-button @click="floating = !floating">Float / 浮起与回落</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="mounted = !mounted">Mount / 卸载与挂载</mp-button>
    <mp-button @click="ripple = !ripple">Ripple wait / 涟漪等待</mp-button>
    <mp-button @click="duration = duration ? 0 : 250">Duration / 零与默认时长</mp-button>
    <p>
      Toggle floating rapidly, suspend during500ms ripple wait or layout settlement, then activate. Old tasks must not
      reset a newer phase. Underlying doubleRaf frames are not physically canceled.
    </p>
    <KeepAlive v-if="mounted">
      <mp-card
        v-if="active"
        v-model:floating="floating"
        :ripple="ripple"
        :floating-duration="duration"
        title="Floating lifecycle / 浮起生命周期"
      >
        Card content / 卡片内容
        <template #floating-content>
          <mp-button @click.stop="floating = false">Collapse / 回落</mp-button>
          <mp-button @click.stop="active = false">Deactivate / 停用</mp-button>
          <mp-button @click.stop="mounted = false">Unmount / 卸载</mp-button>
        </template>
      </mp-card>
    </KeepAlive>
  </div>
</template>
```

与 Cedar 使用相同场景、参数和交互顺序；示例源码仅替换组件前缀，主题与站点外壳各自保留。

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 卡片外观 | `default / outline / tonal` | `default` |
| size | 内容密度；省略时按平台规则回退，见下方说明 | `sm / md` | `undefined` |
| direction | 封面与正文排列 | `row / column / row-reverse` | `column` |
| hoverable | 悬浮样式 | `boolean` | `false` |
| title-style | 标题行样式 | `CSSProperties` | `undefined` |
| title | 标题 | `string` | `undefined` |
| subtitle | 副标题 | `string` | `undefined` |
| description | 描述 | `string` | `undefined` |
| top-divider | 上分割线 | `boolean` | `false` |
| bottom-divider | 下分割线 | `boolean` | `false` |
| src | 封面图片地址；cover 插槽优先 | `string` | `undefined` |
| fit | 封面图片填充方式 | `fill / contain / cover / none / scale-down` | `cover` |
| image-height | 封面图片高度，数字单位为 px | `string / number` | `undefined` |
| image-width | 封面图片宽度，数字单位为 px | `string / number` | `undefined` |
| alt | 封面图片替代文本 | `string` | `undefined` |
| elevation | default 变体阴影；true 为等级 1，false 为无阴影，数字范围 0～24 | `boolean / number` | `true` |
| ripple | 点击水波 | `boolean` | `false` |
| floating | 全屏展开状态，支持 v-model:floating | `boolean` | `false` |
| floating-duration | 全屏展开与关闭动画时长，单位 ms | `number` | `250` |

### Events

| 事件 | 参数与时机 |
| --- | --- |
| click | `(event: Event)`，点击卡片时触发 |
| update:floating | `(value: boolean)`，内置关闭按钮请求关闭时发送 false；展开由父级设置 |

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 正文 | — |
| cover | 封面，覆盖 src 图片 | — |
| header | 整个标题区域，覆盖 title、title-action 和 subtitle | — |
| title | 标题 | `{ slotClass: string }` |
| title-action | 标题右侧操作 | — |
| subtitle | 副标题 | `{ slotClass: string }` |
| description | 描述 | `{ slotClass: string }` |
| footer | 底部操作 | — |
| floating-content | 全屏扩展内容，仅 column 布局渲染 | — |
| close-button | 自定义关闭按钮；需自行更新 floating | — |

### Methods

无公开方法。

### 跨端说明

属性、事件参数及插槽契约一致。Cedar 省略 size 时继承全局尺寸（xs/sm 映射 sm，其余映射 md）；Maple 回退 md。需要一致密度时显式传入 size。主题和 CSS 前缀分别使用各端配置。
Card 不再提供 loading 属性；加载遮罩使用 Loading 指令组合。
<!-- same-source-api:end -->

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-card-hover-shadow` | `0 4px 12px rgb(0 0 0 / 12%)` |
| `--mp-card-size-sm-title-font-size` | `16px` |
| `--mp-card-size-sm-section-margin` | `8px 0 0` |
| `--mp-card-size-sm-section-padding` | `0 12px` |
| `--mp-card-padding` | `0 0 15px 0` |
| `--mp-card-background` | `var(--mp-sys-color-surface-default)` |
| `--mp-card-filled-background` | `var(--mp-sys-color-surface-muted)` |
| `--mp-card-outline-color` | `var(--mp-sys-color-border-default)` |
| `--mp-card-border-radius` | `4px` |
| `--mp-card-image-width` | `100%` |
| `--mp-card-row-image-width` | `140px` |
| `--mp-card-image-height` | `200px` |
| `--mp-card-row-height` | `140px` |
| `--mp-card-title-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-card-title-font-size` | `20px` |
| `--mp-card-title-padding` | `0 12px` |
| `--mp-card-title-margin` | `15px 0 0 0` |
| `--mp-card-title-row-margin` | `12px 0` |
| `--mp-card-content-padding` | `0 16px` |
| `--mp-card-content-margin` | `16px 0 0 0` |
| `--mp-card-content-color` | `var(--mp-sys-color-content-tertiary)` |
| `--mp-card-content-font-size` | `14px` |
| `--mp-card-content-row-margin` | `16px 0 0 0` |
| `--mp-card-subtitle-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-card-subtitle-font-size` | `14px` |
| `--mp-card-subtitle-padding` | `0 12px` |
| `--mp-card-subtitle-margin` | `10px 0 0 0` |
| `--mp-card-subtitle-row-margin` | `-8px 0 0 0` |
| `--mp-card-description-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-card-description-font-size` | `14px` |
| `--mp-card-description-margin` | `20px 0 0 0` |
| `--mp-card-description-padding` | `0 13px` |
| `--mp-card-footer-padding` | `0 12px` |
| `--mp-card-footer-right` | `13px` |
| `--mp-card-footer-bottom` | `9px` |
| `--mp-card-footer-margin` | `30px 0 0 0` |
| `--mp-card-line-height` | `22px` |
| `--mp-card-row-line-height` | `1.5` |
| `--mp-card-floating-buttons-bottom` | `16px` |
| `--mp-card-floating-buttons-right` | `16px` |
| `--mp-card-floating-buttons-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-card-close-button-icon-size` | `24px` |
| `--mp-card-close-button-size` | `56px` |
| `--mp-card-close-button-background` | `#212121` |
| `--mp-card-close-button-text-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-card-close-button-border-radius` | `50%` |

Card 主体颜色与 Cedar 共用 system 语义：普通背景、filled 背景和描边分别使用 `surface-default`、`surface-muted`、`border-default`；标题、正文、辅助文字分别使用 `content-primary`、`content-tertiary`、`content-secondary`。暗色主题沿用相同角色。展开后的悬浮按钮容器位于卡片表面，使用 `content-primary`；深色关闭按钮上的文字与图标使用 `content-on-dark`。关闭按钮背景 `#212121` 是 Card 专属值，并非全局主操作色。旧变量名的迁移关系见 Design Token 规范。

### 变量消费约定

横向内容区独立消费 `--mp-card-content-row-margin`，不再误用标题间距。Card 的密度 API 明确只支持 sm/md，不套用表单控件五档。动效时长 `--mp-card-animation-duration` 默认为 `var(--mp-sys-motion-duration-slow)`，曲线 `--mp-card-animation-easing` 默认为 `var(--mp-sys-motion-easing-standard)`。reduced-motion 关闭所有 Card 动画分区的过渡。
