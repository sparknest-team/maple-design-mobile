# Avatar 头像

两端使用同一份实现和示例，组件前缀、主题基础变量与注册入口各自保留。

## 案例

### 基础用法

头像默认使用圆形、默认尺寸。没有图片时，可以通过默认插槽展示文字或图标；也可以直接传入图片。

```html
<template>
  <mp-space align="center" :size="16" wrap>
    <mp-avatar>C</mp-avatar>
    <mp-avatar>CD</mp-avatar>
    <mp-avatar shape="square">Cedar</mp-avatar>
    <mp-avatar color="#00bebe">U</mp-avatar>
    <mp-avatar image-url="/cat.jpg" alt="一只猫" />
  </mp-space>
</template>
```

### 尺寸

`size` 控制头像宽高：数字为 px，字符串为 CSS 长度（如 `3rem`）。未设置时使用默认尺寸 token。可同时用于文字头像和图片头像。

```html
<template>
  <mp-space direction="column" :size="20">
    <mp-space align="flex-end" :size="16" wrap>
      <mp-space v-for="size in numericSizes" :key="size" direction="column" align="center" :size="8">
        <mp-avatar :size="size">{{ labels[size] }}</mp-avatar>
        <span class="label">{{ size }}px</span>
      </mp-space>
    </mp-space>

    <mp-space align="flex-end" :size="16" wrap>
      <mp-space v-for="size in imageSizes" :key="size" direction="column" align="center" :size="8">
        <mp-avatar image-url="/cat.jpg" :alt="`${size}px`" :size="size" />
        <span class="label">{{ size }}px</span>
      </mp-space>
    </mp-space>

    <mp-space align="flex-end" :size="16" wrap>
      <mp-space v-for="size in cssSizes" :key="size" direction="column" align="center" :size="8">
        <mp-avatar :size="size">Aa</mp-avatar>
        <span class="label">{{ size }}</span>
      </mp-space>
    </mp-space>
  </mp-space>
</template>

<script lang="ts" setup>
const numericSizes = [24, 32, 40, 48, 64] as const
const labels = { 24: 'A', 32: 'B', 40: 'C', 48: 'D', 64: 'E' } as const
const imageSizes = [28, 36, 48, 64, 78] as const
const cssSizes = ['3rem', '2.5em', '48px'] as const
</script>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

### 形状

`shape` 支持圆形和方形。

```html
<template>
  <mp-space align="flex-end" :size="16" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar>圆</mp-avatar>
      <span class="label">circle</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar shape="square">方</mp-avatar>
      <span class="label">square</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" alt="圆形图片" />
      <span class="label">circle · 图片</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" alt="方形图片" shape="square" />
      <span class="label">square · 图片</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

### 文字自适应

默认会按头像宽度缩放过长文字。修改输入框内容可以实时看到缩放效果；将 `autoFixFontSize` 设为 `false` 后保持原始字号。

```html
<template>
  <mp-space direction="column" :size="16">
    <mp-space align="center" :size="16" wrap>
      <mp-space direction="column" align="center" :size="8">
        <mp-avatar>{{ text }}</mp-avatar>
        <span class="label">圆形 · 自适应</span>
      </mp-space>
      <mp-space direction="column" align="center" :size="8">
        <mp-avatar shape="square">{{ text }}</mp-avatar>
        <span class="label">方形 · 自适应</span>
      </mp-space>
      <mp-space direction="column" align="center" :size="8">
        <mp-avatar :auto-fix-font-size="false">{{ text }}</mp-avatar>
        <span class="label">关闭自适应</span>
      </mp-space>
    </mp-space>
    <mp-input v-model="text" :style="{ width: '240px' }" placeholder="输入更长的文字看缩放" clearable />
  </mp-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('Cedar')
</script>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

### 图片头像

使用 `imageUrl` 设置图片，并通过 `alt` 提供可访问的替代文本。也可以在默认插槽里放 `img` / `picture`，组件会按图片头像处理。

```html
<template>
  <mp-space align="center" :size="16" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" alt="一只猫" />
      <span class="label">image-url</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat2.jpg" alt="一只猫" :size="48" shape="square" />
      <span class="label">方形图片</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar :size="48">
        <img src="/cat.jpg" alt="默认插槽中的图片" />
      </mp-avatar>
      <span class="label">默认插槽 img</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

### 图片填充

`objectFit` 控制图片在头像区域内的填充方式。

```html
<template>
  <mp-space align="flex-end" :size="24" wrap>
    <mp-space v-for="fit in fits" :key="fit" direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" :alt="fit" :object-fit="fit" :size="56" />
      <span class="label">{{ fit }}</span>
    </mp-space>
  </mp-space>
</template>

<script lang="ts" setup>
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
</script>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

### 加载与回退

`lazy` 开启懒加载，`loading` 指定加载中占位图。失败时可用 `error` 占位图，或使用 `error` 插槽自定义内容。

```html
<template>
  <mp-space align="flex-end" :size="24" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar lazy image-url="/cat.jpg" loading="/cat2.jpg" alt="懒加载与占位图" :size="48" />
      <span class="label">lazy + loading</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/missing-avatar.jpg" error="/cat.jpg" alt="失败时回退到占位图" :size="48" />
      <span class="label">error 图片</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/missing-avatar.jpg" alt="失败插槽" :size="48">
        <template #error>NA</template>
      </mp-avatar>
      <span class="label">error 插槽</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

### 颜色与边框

使用 `color` 设置背景色，可传入主题色变量。`bordered` / `borderColor` 控制描边。

```html
<template>
  <mp-space align="center" :size="16" wrap>
    <mp-avatar color="var(--mp-color-warning)">火</mp-avatar>
    <mp-avatar color="var(--mp-color-danger)">Cedar</mp-avatar>
    <mp-avatar color="#00bebe">CD</mp-avatar>
    <mp-avatar color="#7b61ff" shape="square">A</mp-avatar>
    <mp-avatar bordered>B</mp-avatar>
    <mp-avatar bordered border-color="#00bebe" color="#e6fffb">C</mp-avatar>
  </mp-space>
</template>
```

### 头像组

`AvatarGroup` 会自动堆叠子头像。可以用 `bordered` 做出叠层描边，`maxCount` 将超出的头像收纳到 Popover，`maxStyle` 定制汇总头像，`zIndexAscend` 按顺序递增层级。`shape` / `size` / `offset` 会作用到组内全部子头像。

```html
<template>
  <mp-space direction="column" :size="24">
    <mp-space direction="column" :size="8">
      <span class="label">默认叠层</span>
      <mp-avatar-group>
        <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
        <mp-avatar image-url="/cat.jpg" alt="用户三" bordered />
        <mp-avatar bordered>+2</mp-avatar>
      </mp-avatar-group>
    </mp-space>

    <mp-space direction="column" :size="8">
      <span class="label">max-count + max-style</span>
      <mp-avatar-group
        :max-count="3"
        :size="48"
        :max-style="{ backgroundColor: '#1d2129', color: '#fff' }"
      >
        <mp-avatar image-url="/cat.jpg" alt="用户一" />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" />
        <mp-avatar color="#00bebe">A</mp-avatar>
        <mp-avatar color="#f59e0b">B</mp-avatar>
        <mp-avatar color="#ef4444">C</mp-avatar>
      </mp-avatar-group>
    </mp-space>

    <mp-space direction="column" :size="8">
      <span class="label">z-index-ascend</span>
      <mp-avatar-group z-index-ascend>
        <mp-avatar image-url="/cat.jpg" alt="用户一" />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" />
        <mp-avatar color="#7b61ff">CD</mp-avatar>
      </mp-avatar-group>
    </mp-space>

    <mp-space direction="column" :size="8">
      <span class="label">shape="square" · offset="-16"</span>
      <mp-avatar-group shape="square" :offset="-16" :size="40">
        <mp-avatar image-url="/cat.jpg" alt="用户一" />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" />
        <mp-avatar color="#00bebe">A</mp-avatar>
        <mp-avatar color="#7b61ff">B</mp-avatar>
      </mp-avatar-group>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

### 纵向头像组

`vertical` 改为纵向堆叠，`offset` 控制重叠间距，数字为 px。

```html
<template>
  <mp-space align="flex-end" :size="32" wrap>
    <mp-space direction="column" :size="8">
      <span class="label">offset = -12</span>
      <mp-avatar-group vertical :offset="-12">
        <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
        <mp-avatar image-url="/cat.jpg" alt="用户三" bordered />
        <mp-avatar bordered>+2</mp-avatar>
      </mp-avatar-group>
    </mp-space>
    <mp-space direction="column" :size="8">
      <span class="label">offset = -20</span>
      <mp-avatar-group vertical :offset="-20" :size="48">
        <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
        <mp-avatar color="#00bebe">A</mp-avatar>
      </mp-avatar-group>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

### 头像可悬停

设置 `hoverable` 后，鼠标悬停时头像会放大，可单独使用，也可以用在头像组里。

```html
<template>
  <mp-space direction="column" :size="24">
    <mp-space align="center" :size="16" wrap>
      <mp-avatar hoverable>H</mp-avatar>
      <mp-avatar hoverable image-url="/cat.jpg" alt="悬停放大" />
      <mp-avatar hoverable shape="square">方</mp-avatar>
    </mp-space>
    <mp-avatar-group>
      <mp-avatar hoverable image-url="/cat.jpg" alt="用户一" bordered />
      <mp-avatar hoverable image-url="/cat2.jpg" alt="用户二" bordered />
      <mp-avatar hoverable image-url="/cat.jpg" alt="用户三" bordered />
      <mp-avatar hoverable bordered>+2</mp-avatar>
    </mp-avatar-group>
  </mp-space>
</template>
```

### 交互图标

使用 `trigger-icon` 插槽添加交互入口。`triggerType` 支持独立按钮（`button`）和悬浮背景层（`overlay`）两种形式；点击会触发 `click`。

```html
<template>
  <mp-space align="flex-end" :size="32" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" alt="编辑头像" :size="56" @click="onClick('button')">
        <template #trigger-icon>+</template>
      </mp-avatar>
      <span class="label">{{ last === 'button' ? 'click · button' : 'trigger-type="button"' }}</span>
    </mp-space>

    <mp-space direction="column" align="center" :size="8">
      <mp-avatar
        image-url="/cat2.jpg"
        alt="更换头像"
        :size="56"
        trigger-type="overlay"
        @click="onClick('overlay')"
      >
        <template #trigger-icon>+</template>
      </mp-avatar>
      <span class="label">{{ last === 'overlay' ? 'click · overlay' : 'trigger-type="overlay"' }}</span>
    </mp-space>
  </mp-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const last = ref('')

function onClick(type: string) {
  last.value = type
}
</script>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
```

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| shape | 头像形状 | `circle / square` | `circle` |
| image-url | 图片地址 | `string` | `-` |
| alt | 图片替代文本 | `string` | `''` |
| size | 头像宽高；数字为 px，字符串为 CSS 长度 | `number / string` | `-` |
| auto-fix-font-size | 是否自动缩放过长的文字内容 | `boolean` | `true` |
| trigger-type | 交互图标展示方式 | `button / overlay` | `button` |
| trigger-icon-style | 交互图标的自定义样式 | `CSSProperties` | `-` |
| object-fit | 图片填充方式 | `fill / contain / cover / none / scale-down` | `cover` |
| color | 头像背景色 | `string` | `-` |
| bordered | 是否显示描边 | `boolean` | `false` |
| border-color | 描边颜色 | `string` | `-` |
| loading | 图片加载中的占位图地址 | `string` | `-` |
| error | 图片加载失败的占位图地址 | `string` | `-` |
| lazy | 是否懒加载图片 | `boolean` | `false` |
| hoverable | 是否开启悬停放大效果 | `boolean` | `false` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击头像时触发 | `(event: MouseEvent) => void` |
| load | 图片加载成功触发 | `() => void` |
| error | 图片加载失败触发 | `() => void` |

### Slots

| 插槽 | 说明 |
| --- | --- |
| default | 文字、图标或图片加载中内容 |
| error | 图片加载失败时的回退内容 |
| trigger-icon | 头像上的交互图标 |

### Methods

无自定义公开方法。
<!-- same-source-api:end -->

### AvatarGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| shape | 子头像形状 | `circle / square` | `circle` |
| size | 子头像宽高；数字为 px，字符串为 CSS 长度 | `number / string` | `-` |
| auto-fix-font-size | 是否自动缩放子头像中的文字 | `boolean` | `true` |
| max-count | 最多直接展示的头像数，`0` 表示不限 | `number` | `0` |
| z-index-ascend | 头像层级是否按顺序递增 | `boolean` | `false` |
| max-style | 数量汇总头像的自定义样式 | `CSSProperties` | `-` |
| max-popover-props | 汇总 Popover 的属性 | `PopoverProps` | `-` |
| offset | 组内头像的重叠偏移量 | `number / string` | `-` |
| vertical | 是否纵向堆叠 | `boolean` | `false` |

### AvatarGroup Slots

| 插槽 | 说明 |
| --- | --- |
| default | 头像列表 |

### 类型定义

```ts
import type {
  AvatarGroupInstance,
  AvatarGroupProps,
  AvatarInstance,
  AvatarProps,
  AvatarObjectFit,
  AvatarShape,
  AvatarTriggerType,
} from '@maplejs/maple-ui';
```
