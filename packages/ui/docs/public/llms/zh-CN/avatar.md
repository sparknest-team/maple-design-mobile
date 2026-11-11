<!-- Source: src/avatar/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/avatar -->

# Avatar 头像

两端使用同一份实现和示例，组件前缀、主题基础变量与注册入口各自保留。

## 基础示例

### 基础用法

头像默认使用圆形、默认尺寸。没有图片时，可以通过默认插槽展示文字或图标；也可以直接传入图片。

Example source: src/avatar/example/demos/basic.vue

```vue
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

## 外观与状态

### 尺寸与形状对比

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `shape` | 头像形状 | 尺寸与形状对比、颜色与边框、头像可悬停 |
| `image-url` | 图片地址 | 尺寸与形状对比、头像可悬停 |
| `alt` | 图片替代文本 | 尺寸与形状对比、头像可悬停 |
| `bordered` | 是否显示描边 | 颜色与边框、头像可悬停 |
| `size` | 头像宽高；数字为 px，字符串为 CSS 长度 | 尺寸与形状对比 |
| `color` | 头像背景色 | 颜色与边框 |
<!-- demo-config-notes:end -->

先比较相同内容在各尺寸下的占位，再比较圆形和方形边界；图片适配与错误回退保持独立。

<details>
<summary>配置说明与使用限制</summary>

#### 尺寸

`size` 控制头像宽高：数字为 px，字符串为 CSS 长度（如 `3rem`）。未设置时使用默认尺寸 token。可同时用于文字头像和图片头像。

#### 形状

`shape` 支持圆形和方形。

</details>

Example source: src/avatar/example/demos/shape-size-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const numericSizes = [24, 32, 40, 48, 64] as const

    const labels = { 24: 'A', 32: 'B', 40: 'C', 48: 'D', 64: 'E' } as const

    const imageSizes = [28, 36, 48, 64, 78] as const

    const cssSizes = ['3rem', '2.5em', '48px'] as const
    return { numericSizes, labels, imageSizes, cssSizes }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="size">
      <h4><span lang="zh-CN">尺寸</span><span lang="en-US">Size</span></h4>
      <mp-space direction="column" :size="20">
        <mp-space align="flex-end" :size="16" wrap>
          <mp-space v-for="size in scene1.numericSizes" :key="size" direction="column" align="center" :size="8">
            <mp-avatar :size="size">{{ scene1.labels[size] }}</mp-avatar>
            <span class="label">{{ size }}px</span>
          </mp-space>
        </mp-space>

        <mp-space align="flex-end" :size="16" wrap>
          <mp-space v-for="size in scene1.imageSizes" :key="size" direction="column" align="center" :size="8">
            <mp-avatar image-url="/cat.jpg" :alt="`${size}px`" :size="size" />
            <span class="label">{{ size }}px</span>
          </mp-space>
        </mp-space>

        <mp-space align="flex-end" :size="16" wrap>
          <mp-space v-for="size in scene1.cssSizes" :key="size" direction="column" align="center" :size="8">
            <mp-avatar :size="size">Aa</mp-avatar>
            <span class="label">{{ size }}</span>
          </mp-space>
        </mp-space>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="shape">
      <h4><span lang="zh-CN">形状</span><span lang="en-US">Shape</span></h4>
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
.demo-comparison-case--1 {
  .label {
    color: var(--mp-color-text-3);
    font-size: var(--mp-font-size-sm);
  }
}
.demo-comparison-case--2 {
  .label {
    color: var(--mp-color-text-3);
    font-size: var(--mp-font-size-sm);
  }
}
</style>
```

### 颜色与边框

使用 `color` 设置背景色，可传入主题色变量。`bordered` / `borderColor` 控制描边。

Example source: src/avatar/example/demos/style.vue

```vue
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

### 头像可悬停

设置 `hoverable` 后，鼠标悬停时头像会放大，可单独使用，也可以用在头像组里。

Example source: src/avatar/example/demos/hoverable.vue

```vue
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

## 布局与排列

### 头像组排列与溢出

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `image-url` | 图片地址 | 头像组排列与溢出 |
| `alt` | 图片替代文本 | 头像组排列与溢出 |
| `bordered` | 是否显示描边 | 头像组排列与溢出 |
| `color` | 头像背景色 | 头像组排列与溢出 |
<!-- demo-config-notes:end -->

比较横向和纵向头像组，观察最大数量、重叠顺序和溢出提示。

<details>
<summary>配置说明与使用限制</summary>

#### 头像组

`AvatarGroup` 会自动堆叠子头像。可以用 `bordered` 做出叠层描边，`maxCount` 将超出的头像收纳到 Popover，`maxStyle` 定制汇总头像，`zIndexAscend` 按顺序递增层级。`shape` / `size` / `offset` 会作用到组内全部子头像。

#### 纵向头像组

`vertical` 改为纵向堆叠，`offset` 控制重叠间距，数字为 px。

</details>

Example source: src/avatar/example/demos/group-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="group">
      <h4><span lang="zh-CN">头像组</span><span lang="en-US">Avatar group</span></h4>
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
            :max-style="{
              backgroundColor: '#1d2129',
              color: '#fff',
            }"
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
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="group-vertical">
      <h4><span lang="zh-CN">纵向头像组</span><span lang="en-US">Vertical group</span></h4>
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
.demo-comparison-case--1 {
  .label {
    color: var(--mp-color-text-3);
    font-size: var(--mp-font-size-sm);
  }
}
.demo-comparison-case--2 {
  .label {
    color: var(--mp-color-text-3);
    font-size: var(--mp-font-size-sm);
  }
}
</style>
```

## 内容与展示

### 文字自适应

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `image-url` | 图片地址 | 图片头像、图片填充、加载与回退 |
| `alt` | 图片替代文本 | 图片头像、图片填充、加载与回退 |
| `size` | 头像宽高；数字为 px，字符串为 CSS 长度 | 图片头像、图片填充、加载与回退 |
| `shape` | 头像形状 | 文字自适应、图片头像 |
| `auto-fix-font-size` | 是否自动缩放过长的文字内容 | 文字自适应 |
| `object-fit` | 图片填充方式 | 图片填充 |
<!-- demo-config-notes:end -->

默认会按头像宽度缩放过长文字。插槽文本更新后会重新测量；改回可容纳的短文本时恢复原始比例。将 `auto-fix-font-size` 设为 `false` 后保持原始字号。

Example source: src/avatar/example/demos/auto-fix.vue

```vue
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

Example source: src/avatar/example/demos/image.vue

```vue
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

Example source: src/avatar/example/demos/fit.vue

```vue
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

Example source: src/avatar/example/demos/fallback.vue

```vue
<template>
  <mp-space align="flex-end" :size="24" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar lazy image-url="/cat.jpg" loading="/cat2.jpg" alt="懒加载与占位图" :size="48" />
      <span class="label">lazy + loading</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="data:image/png;base64,AA==" error="/cat.jpg" alt="失败时回退到占位图" :size="48" />
      <span class="label">error 图片</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="data:image/png;base64,AA==" alt="失败插槽" :size="48">
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

## 交互与控制

### 交互图标

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `image-url` | 图片地址 | 交互图标 |
| `alt` | 图片替代文本 | 交互图标 |
| `size` | 头像宽高；数字为 px，字符串为 CSS 长度 | 交互图标 |
| `trigger-type` | 交互图标展示方式 | 交互图标 |
<!-- demo-config-notes:end -->

使用 `trigger-icon` 插槽添加交互入口。`triggerType` 支持独立按钮（`button`）和悬浮背景层（`overlay`）两种形式；点击会触发 `click`。

Example source: src/avatar/example/demos/trigger.vue

```vue
<template>
  <mp-space align="flex-end" :size="32" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" alt="头像" trigger-aria-label="编辑头像" :size="56" @click="onClick('button')">
        <template #trigger-icon>+</template>
      </mp-avatar>
      <span class="label">{{ last === 'button' ? 'click · button' : 'trigger-type="button"' }}</span>
    </mp-space>

    <mp-space direction="column" align="center" :size="8">
      <mp-avatar
        image-url="/cat2.jpg"
        alt="头像"
        trigger-aria-label="更换头像"
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
默认图片加载失败图标会保留非空 `alt` 的辅助名称；空 `alt` 表示装饰内容。自定义 `error` 插槽由业务提供相应语义。默认插槽可在图片和文字之间动态切换；插槽图片的加载事件与样式由业务负责。

当 `trigger-icon` 不含交互控件时，头像提供按钮语义并支持 Enter 和 Space；请通过 `trigger-aria-label` 或根元素 `aria-label` 描述操作。插槽自带按钮等交互控件时由该控件负责键盘操作。头像组默认点击触发的汇总入口可通过键盘打开，Escape 关闭后返回焦点。

### Avatar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| shape | 头像形状 | `circle / square` | `circle` |
| image-url | 图片地址 | `string` | `-` |
| alt | 图片替代文本 | `string` | `''` |
| size | 头像宽高；数字为 px，字符串为 CSS 长度 | `number / string` | `-` |
| auto-fix-font-size | 是否自动缩放过长的文字内容 | `boolean` | `true` |
| trigger-type | 交互图标展示方式 | `button / overlay` | `button` |
| trigger-aria-label | 交互入口的可访问名称 | `string` | `—` |
| trigger-icon-style | 交互图标的自定义样式 | `CSSProperties` | `-` |
| object-fit | 图片填充方式 | `fill / contain / cover / none / scale-down` | `cover` |
| color | 头像背景色 | `string` | `-` |
| bordered | 是否显示描边 | `boolean` | `false` |
| border-color | 描边颜色 | `string` | `-` |
| loading | 图片加载中的占位图地址 | `string` | `-` |
| error | 图片加载失败的占位图地址 | `string` | `-` |
| lazy | 是否懒加载图片 | `boolean` | `false` |
| hoverable | 是否开启悬停放大效果 | `boolean` | `false` |

### Avatar Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击头像时触发 | `(event: MouseEvent) => void` |
| load | 图片加载成功触发 | `() => void` |
| error | 图片加载失败触发 | `() => void` |

### Avatar Slots

| 插槽 | 说明 |
| --- | --- |
| default | 文字、图标或图片加载中内容 |
| error | 图片加载失败时的回退内容 |
| trigger-icon | 头像上的交互图标 |

### Avatar Methods

无自定义公开方法。
<!-- same-source-api:end -->

组级 `shape` 和 `auto-fix-font-size` 优先于子头像，组级 `size` 有值时优先。`max-count` 为非负整数，0 表示不限制，无效值回退为 0；数值 `size` 为有限非负数，无效数值使用默认尺寸，字符串按 CSS 长度处理。`offset` 接受有限负数或 CSS 长度字符串，无效数值使用默认间距。汇总头像参与组内层级排序，`max-style` 的 z-index 由组排序覆盖。

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

## Types

```ts
import type {
  AvatarGroupInstance,
  AvatarGroupProps,
  AvatarInstance,
  AvatarProps,
  AvatarObjectFit,
  AvatarShape,
  AvatarTriggerType,
} from '@maple-design/ui-vue';
```

## CSS Variables

文字、汇总数量和按钮式触发图标默认使用主要内容色；描边跟随容器表面；只有深色交互遮罩上的图标使用 `content-on-dark`。头像背景的 `fill-4`、按钮背景与 hover 阶梯、黑色半透明遮罩保留为组件视觉值。使用 `color` 属性覆盖头像背景时，应同步检查文字对比度，必要时覆盖 `text-color`。Maple 暗色主题背景仍采用组件专属的 `#303030`。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-avatar-bg` | `var(--mp-color-fill-4)` | `background-color` |
| `--mp-avatar-border-color` | `var(--mp-sys-color-surface-default)` | `border` |
| `--mp-avatar-border-width` | `2px` | `border` |
| `--mp-avatar-circle-border-radius` | `50%` | `border-radius` |
| `--mp-avatar-font-size-max-count` | `20px` | `font-size` |
| `--mp-avatar-font-size-text` | `20px` | `font-size` |
| `--mp-avatar-font-weight-text` | `500` | `font-weight` |
| `--mp-avatar-group-item-border` | `var(--mp-sys-color-surface-default)` | `border` |
| `--mp-avatar-group-item-border-width` | `2px` | `border` |
| `--mp-avatar-group-offset` | `-10px` | `margin-block-start`, `margin-inline-start` |
| `--mp-avatar-group-popover-item-spacing` | `8px` | `gap` |
| `--mp-avatar-hover-transform` | `scale(1.1)` | `transform` |
| `--mp-avatar-max-count-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-avatar-motion-duration` | `0.2s` | `transition` |
| `--mp-avatar-size-default` | `40px` | `height`, `width` |
| `--mp-avatar-size-trigger-button` | `20px` | `height`, `width` |
| `--mp-avatar-size-trigger-icon` | `12px` | `font-size` |
| `--mp-avatar-spacing-trigger-button-bottom` | `4px` | `bottom` |
| `--mp-avatar-spacing-trigger-button-right` | `4px` | `inset-inline-end` |
| `--mp-avatar-square-border-radius` | `4px` | `border-radius` |
| `--mp-avatar-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-avatar-text-padding-inline` | `4px` | `padding-inline` |
| `--mp-avatar-trigger-button-bg` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-avatar-trigger-button-bg-hover` | `var(--mp-color-fill-3)` | `background-color` |
| `--mp-avatar-trigger-button-border-radius` | `50%` | `border-radius` |
| `--mp-avatar-trigger-icon-button` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-avatar-trigger-overlay-bg` | `color-mix(in srgb, var(--mp-color-black) 60%, transparent)` | `background-color` |
| `--mp-avatar-trigger-overlay-font-size` | `16px` | `font-size` |
| `--mp-avatar-trigger-overlay-icon` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-avatar-z-index-overlay` | `0` | `z-index` |
| `--mp-avatar-z-index-overlay-hover` | `2` | `z-index` |
| `--mp-avatar-z-index-trigger` | `1` | `z-index` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-avatar-border-color: var(--mp-sys-color-surface-default);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 减少动态效果

内置 CSS 过渡遵循 `prefers-reduced-motion: reduce`。关闭过渡不改变最终显隐、选中／展开状态及事件语义；插槽内自定义动画由应用自行控制。
