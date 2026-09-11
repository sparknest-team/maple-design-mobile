# Avatar

Both libraries use the same implementation and examples; package prefixes, themes and registration stay local.

## Examples

### Basic usage

Avatars default to a circle at the default size. Use the default slot for text or icons, or pass an image.

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

### Size

`size` sets width and height. Numbers are px; strings are CSS lengths such as `3rem`. Text and image avatars both use it.

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

### Shape

`shape` supports circle and square.

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

### Auto-fit text

Long text scales to the avatar width by default. Edit the input to see it; set `autoFixFontSize` to `false` to keep the original size.

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

### Image avatar

Set `imageUrl` and provide `alt`. You can also put `img` / `picture` in the default slot.

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

### Image fit

`objectFit` controls how the image fills the avatar.

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

### Loading and fallback

`lazy` enables lazy loading. `loading` is the placeholder. Failed loads can use an `error` image or the `error` slot.

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

### Color and border

`color` sets the background. `bordered` / `borderColor` control the outline.

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

### Avatar group

`AvatarGroup` stacks children. Use `bordered` for layered outlines, `maxCount` to fold extras into a Popover, `maxStyle` for the summary avatar, and `zIndexAscend` for stacking order. `shape` / `size` / `offset` apply to every child.

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

### Vertical group

`vertical` stacks avatars in a column. `offset` is the overlap, in px when numeric.

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

### Hoverable

`hoverable` scales the avatar on hover, alone or inside a group.

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

### Trigger icon

The `trigger-icon` slot adds an action. `triggerType` is `button` or `overlay`; clicks emit `click`.

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
| shape | Avatar shape | `circle / square` | `circle` |
| image-url | Image URL | `string` | `-` |
| alt | Image alternative text | `string` | `''` |
| size | Width and height; numbers are px, strings are CSS lengths | `number / string` | `-` |
| auto-fix-font-size | Scale overflow text automatically | `boolean` | `true` |
| trigger-type | How the action icon is shown | `button / overlay` | `button` |
| trigger-icon-style | Custom style for the action icon | `CSSProperties` | `-` |
| object-fit | Image fitting mode | `fill / contain / cover / none / scale-down` | `cover` |
| color | Background color | `string` | `-` |
| bordered | Whether to show a border | `boolean` | `false` |
| border-color | Border color | `string` | `-` |
| loading | Placeholder image while loading | `string` | `-` |
| error | Fallback image on load failure | `string` | `-` |
| lazy | Whether to lazy-load the image | `boolean` | `false` |
| hoverable | Whether to scale on hover | `boolean` | `false` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| click | Emitted when the avatar is clicked | `(event: MouseEvent) => void` |
| load | Emitted when the image loads | `() => void` |
| error | Emitted when the image fails to load | `() => void` |

### Slots

| 插槽 | 说明 |
| --- | --- |
| default | Text, icon, or loading content |
| error | Fallback when the image fails |
| trigger-icon | Action icon on the avatar |

### Methods

No public methods.
<!-- same-source-api:end -->

### AvatarGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| shape | Child avatar shape | `circle / square` | `circle` |
| size | Child width and height; numbers are px, strings are CSS lengths | `number / string` | `-` |
| auto-fix-font-size | Scale overflow text on children | `boolean` | `true` |
| max-count | Maximum visible avatars; `0` means unlimited | `number` | `0` |
| z-index-ascend | Use ascending stacking order | `boolean` | `false` |
| max-style | Custom summary avatar style | `CSSProperties` | `-` |
| max-popover-props | Summary Popover props | `PopoverProps` | `-` |
| offset | Overlap offset | `number / string` | `-` |
| vertical | Stack avatars vertically | `boolean` | `false` |

### AvatarGroup Slots

| Slot | Description |
| --- | --- |
| default | Avatar list |

### Type Definitions

```ts
import type {
  AvatarGroupInstance,
  AvatarGroupProps,
  AvatarInstance,
  AvatarProps,
  AvatarObjectFit,
  AvatarShape,
  AvatarTriggerType,
} from '@maplejs/maple-ui'
```
