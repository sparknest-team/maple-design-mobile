# 底部标签栏

### 介绍

在页面底部显示导航和关键操作。

### 基本使用

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### 通过名称匹配

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'

const active = ref('home-fill')
</script>

<template>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item name="home-fill" label="标签">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="search" label="标签">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="heart-fill" label="标签">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item name="user" label="标签">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### 徽标提示

TabBar 徽标默认使用 xs 尺寸并向图标右上方外侧展开；通过 badge 对象可覆盖 size、position、offsetX、offsetY。普通与 variant 模式均支持红点、数字和 max 上限。

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref, reactive } from 'vue'

const active = ref(0)
const variant = ref(false)
const badgeProps = reactive({
  status: 'primary',
  content: '66'
})
</script>

<template>
  <mp-switch v-model="variant" />
  <mp-tab-bar v-model:active="active" :variant="variant">
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" badge>
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" :badge="badgeProps">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" :badge="{ content: 125, max: 99 }">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### 自定义颜色

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tab-bar active-color="var(--mp-color-warning)" v-model:active="active">
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### 监听切换事件

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const active = ref(0)

function handleChange(active) {
  Message.info(`changed to ${active}`)
}
</script>

<template>
  <mp-tab-bar v-model:active="active" @change="handleChange">
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### 监听点击事件

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const active = ref(0)

function handleClick(active) {
  Message.success(`clicked ${active}`)
}
</script>

<template>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item label="标签" @click="handleClick">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" @click="handleClick">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" @click="handleClick">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" @click="handleClick">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### 悬浮按钮

悬浮按钮用于发布、拍摄或新建等主要操作。点击加号打开发布框，不切换当前导航。

导航项为偶数时按钮居中，为奇数时靠右；下方单独切换导航项数量来观察布局。

```html
<script setup>
import { IconBellFill as MIconBellFill, IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconPlus as MIconPlus, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const active = ref(0)
const isEven = ref(true)
const composerOpen = ref(false)
const draft = ref('')
</script>

<template>
  <mp-space wrap role="group" :aria-label="'悬浮按钮位置演示'">
    <mp-button :variant="isEven ? 'default' : 'outline'" :aria-pressed="isEven" @click="isEven = true">4 个导航项：按钮居中</mp-button>
    <mp-button :variant="isEven ? 'outline' : 'default'" :aria-pressed="!isEven" @click="isEven = false">5 个导航项：按钮靠右</mp-button>
  </mp-space>
  <mp-tab-bar
    v-model:active="active"
    style="margin-top: 40px"
    :fab-props="{ 'aria-label': '发布动态' }"
    @fab-click="composerOpen = true"
  >
    <template #fab><mp-icon :size="24"><m-icon-plus /></mp-icon></template>
    <mp-tab-bar-item :label="'首页'">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="'发现'">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="'收藏'">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item :label="'消息'">
      <template #icon><mp-icon :size="22"><m-icon-bell-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item v-if="!isEven" :label="'我的'">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
  <mp-dialog
    v-model:open="composerOpen"
    :title="'发布动态'"
    :confirm-button-text="'发布动态'"
    @confirm="Message.success('发布操作演示完成'); draft = ''"
  >
    <p>这是发布入口的交互演示，内容不会发送到服务器。</p>
    <mp-textarea v-model="draft" :placeholder="'分享此刻的想法'" :aria-label="'分享此刻的想法'" />
  </mp-dialog>
</template>
```

### 变体

```html
<script setup>
import { IconHeartFill as MIconHeartFill, IconHomeFill as MIconHomeFill, IconSearch as MIconSearch, IconUserCircleFill as MIconUserCircleFill } from '@maplejs/icons-vue'
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-tab-bar variant v-model:active="active">
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-home-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-search /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-heart-fill /></mp-icon></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### 非受控初始选中

```html
<script setup>
</script>
<template>
  <p>无需 v-model，初始选中收藏，点击即可切换。default-active 仅在初始化时读取。</p>
  <mp-tab-bar default-active="favorites">
    <mp-tab-bar-item name="home" :label="'首页'" />
    <mp-tab-bar-item name="favorites" :label="'收藏'" />
    <mp-tab-bar-item name="profile" :label="'我的'" />
  </mp-tab-bar>
</template>
```

### 数字名称与重排

```html
<script setup>
import { ref } from 'vue'
const active = ref(0)
const reversed = ref(false)
</script>
<template>
  <p>名称 0、10、20 是稳定标识，重排后仍选中同一名称，而不是原来的位置。</p>
  <mp-button @click="reversed = !reversed">反转顺序</mp-button>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item v-for="id in (reversed ? [20, 10, 0] : [0, 10, 20])" :key="id" :name="id" :label="String(id)" />
  </mp-tab-bar>
  <p aria-live="polite">当前选中: {{ active }}</p>
</template>
```

### 自定义选中标签

```html
<script setup>
import { ref } from 'vue'
const active = ref('home')
const labels = {'home': '首页', 'favorites': '收藏', 'profile': '我的'}
</script>
<template>
  <p>default 插槽接收 active，可根据选中状态改变字重和标记。</p>
  <mp-tab-bar v-model:active="active">
    <mp-tab-bar-item v-for="name in ['home', 'favorites', 'profile']" :key="name" :name="name">
      <template #default="{ active: selected }">
        <span :style="{ fontWeight: selected ? 700 : 400 }">{{ selected ? '● ' : '' }}{{ labels[name] }}</span>
      </template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
```

### 异步切换与拦截

```html
<script setup>
import { ref } from 'vue'
const active = ref(0)
async function beforeChange(value) {
  if (value === 3) return false
  if (value === 4) throw new Error('Demo: rejected selection')
  await new Promise(resolve => setTimeout(resolve, value === 1 ? 1200 : 250))
  return true
}
</script>
<template>
  <p>先点慢速（1.2 秒），再点快速（0.25 秒），最终只切到快速；拒绝和异常都会保持当前选中。等待时点击当前标签可取消切换。</p>
  <mp-tab-bar v-model:active="active" :before-change="beforeChange">
    <mp-tab-bar-item :label="'首页'" />
    <mp-tab-bar-item :label="'慢速'" />
    <mp-tab-bar-item :label="'快速'" />
    <mp-tab-bar-item :label="'拒绝'" />
    <mp-tab-bar-item :label="'异常'" />
  </mp-tab-bar>
  <p aria-live="polite">当前选中: {{ active }}</p>
</template>
```

## API

### 属性

#### TabBar Props

| 参数               | 说明              | 类型 | 默认值 |
|------------------|-----------------| ---- | ---- |
| `v-model:active` | 当前选中名称或索引；传入时为受控模式 | _number \| string_ | `undefined` |
| `default-active` | 非受控初始选中值，仅初始化时读取 | _number \| string_ | `0` |
| `before-change` | 切换前校验；返回真值允许，假值、抛错或 Promise 拒绝取消；仅最后一次请求可生效 | _(active: number \| string) => boolean \| Promise&lt;boolean&gt;_ | `-` |
| `fixed`          | 是否固定在底部         | _boolean_ | `false` |
| `border`         | 是否显示外边框         | _boolean_ | `false` |
| `safe-area`       | 是否开启底部安全区适配 | _boolean_ | `false` |
| `z-index`        | 元素 z-index      | _number \| string_ | `1` |
| `active-color`   | 选中标签的颜色         | _string_ | `-` |
| `inactive-color` | 未选中标签的颜色        | _string_ | `-` |
| `placeholder`  ***3.2.11***   | 是否在底部生成相同高度的占位元素(需设置 `fixed`)  | _boolean_ | `false` |
| `fab-props`      | 悬浮按钮属性          | _ButtonProps_ | `{ status: 'primary' }` |
| `variant` ***3.2.0***      | 变体模式          | _boolean_ | `false` |

未传 active 时组件自行维护选中值；传入 active 时仅通知调用者更新。撤去 active 后从最后的受控值继续。数字 name 优先于无 name 子项的索引；有 name 的子项不再按索引匹配。

#### TabBarItem Props

|参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| `name` | 标签名称，作为匹配的标识符 | _number \| string_ | `-` |
| `icon` | 图标名称，等同于 Icon 组件的 [name](#/zh-CN/icon) | _string_ | `-` |
| `label` | 标签文字内容 | _string_ | - |
| `badge` | 图标右上角徽标 | _boolean \| BadgeProps_ | `false` |

### 事件

#### TabBar Events

|事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| `change` | 切换标签时触发 | `active: number \| string` |
| `fab-click` | 悬浮按钮点击时触发 | `-` |

#### TabBarItem Events

|事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| `click` | 点击时触发 | `active: number \| string` |

### 插槽

#### TabBar Slots

| 名称 | 说明                    | 参数 |
| ---- |-----------------------| ----|
| `default` | 底部导航栏内容               |`-` |
| `fab` | 支持在组件中插入一个自定义的 fab 按钮 | `-` |

#### TabBarItem Slots

| 名称 | 说明 | 参数 |
| ---- | ---- | ----|
| `default` | 自定义标签文字内容，会覆盖 `label` 的内容  | `active: boolean` |
| `icon` | 自定义图标 | `active: boolean` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### TabBar Variables

| 变量名 | 默认值 |
| --- | --- |
| `--mp-tab-bar-height` | `50px` |
| `--mp-tab-bar-variant-height` | `66px` |
| `--mp-tab-bar-z-index` | `1` |
| `--mp-tab-bar-background-color` | `var(--mp-color-bg-2)` |
| `--mp-tab-bar-border-color` | `var(--color-border-2)` |
| `--mp-tab-bar-fab-offset` | `4px` |

#### TabBarItem Variables

| 变量名 | 默认值 |
| --- | --- |
| `--mp-tab-bar-item-font-size` | `var(--font-size-sm)` |
| `--mp-tab-bar-item-inactive-color` | `var(--mp-color-text-2)` |
| `--mp-tab-bar-item-active-color` | `var(--color-primary)` |
| `--mp-tab-bar-item-active-background-color` | `transparent` |
| `--mp-tab-bar-item-line-height` | `1` |
| `--mp-tab-bar-item-icon-size` | `22px` |
| `--mp-tab-bar-item-icon-margin-bottom` | `5px` |
| `--mp-tab-bar-fab-border-radius` | `50%` ` |
| `--mp-tab-bar-item-variant-icon-container-height` | `30px` |
| `--mp-tab-bar-item-variant-icon-container-border-radius` | `100px` |
| `--mp-tab-bar-item-variant-icon-container-max-width` | `58px` |
| `--mp-tab-bar-item-variant-active-background-color` | `color-mix(in srgb, var(--mp-color-primary) 14%, var(--mp-tab-bar-background-color))` |
| `--mp-tab-bar-item-variant-active-color` | `var(--mp-color-primary)` |
