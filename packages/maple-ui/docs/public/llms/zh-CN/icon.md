<!-- Source: src/icon/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/icon -->

# 图标

图标以独立 SVG Vue 组件提供。推荐通过 Resolver 自动按需导入；需要统一尺寸、颜色或旋转时，使用 Icon 容器包裹图标。

图标容器的命名和类型判断复用 maple-shared 的静态工具；尺寸转换和默认 props 处理保留在 UI 工具中。按需引入只保留实际使用的工具，图形仍由独立 SVG 组件提供。

## 案例

### 基础用法

Example source: src/icon/example/demos/basic.vue

```vue
<script setup lang="ts">
import { IconCheckCircleFill } from '@maple-design/icons-vue'
</script>
<template>
  <div class="icon-demo-row">
    <div>
      <p>Resolver 自动按需导入</p>
      <mp-icon size="40" color="red"><m-icon-check-circle-fill /></mp-icon>
    </div>
    <div>
      <p>手动按需导入</p>
      <mp-icon size="40" color="red"><IconCheckCircleFill /></mp-icon>
    </div>
  </div>
</template>
<style scoped>
.icon-demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 32px;
}
p {
  margin: 0 0 12px;
  font-size: 14px;
}
</style>
```

### 图标尺寸

Example source: src/icon/example/demos/icon-size.vue

```vue
<template>
  <mp-space wrap align="center" :size="24">
    <mp-icon size="20"><m-icon-check-circle /></mp-icon>
    <mp-icon size="28"><m-icon-check-circle /></mp-icon>
    <mp-icon size="36"><m-icon-check-circle /></mp-icon>
  </mp-space>
</template>
```

### 图标颜色

Example source: src/icon/example/demos/icon-color.vue

```vue
<template>
  <mp-space wrap :size="24">
    <mp-icon size="28" color="var(--mp-color-primary)"><m-icon-check-circle /></mp-icon>
    <mp-icon size="28" color="var(--mp-color-success)"><m-icon-check-circle /></mp-icon>
  </mp-space>
</template>
```

### 旋转与持续旋转

`rotate` 设置静态角度，`spin` 开启持续旋转动画，两者可以组合使用。

Example source: src/icon/example/demos/rotate-and-spin.vue

```vue
<template>
  <mp-space wrap align="center" :size="32">
    <div class="demo-item">
      <mp-icon size="32" :rotate="90"><m-icon-arrow-right /></mp-icon>
      <span>rotate="90"</span>
    </div>
    <div class="demo-item">
      <mp-icon size="32" spin><m-icon-refresh /></mp-icon>
      <span>spin</span>
    </div>
  </mp-space>
</template>
<style scoped>
.demo-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
```

### 点击事件

Example source: src/icon/example/demos/click-event.vue

```vue
<script setup lang="ts">
import { Message } from '@maple-design/ui'
</script>
<template>
  <mp-icon size="28" color="var(--mp-color-primary)" style="cursor: pointer" @click="Message.success('点击成功')">
    <m-icon-check-circle />
  </mp-icon>
</template>
```

### 自定义图标

在默认插槽内放入自定义 SVG，尺寸和颜色由 Icon 容器统一控制。

Example source: src/icon/example/demos/custom.vue

```vue
<template>
  <mp-icon size="40" color="currentColor">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" role="img" aria-label="自定义菱形图标">
      <path d="M12 2 22 12 12 22 2 12Z" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  </mp-icon>
</template>
```

### 动态名称

`name` 使用短横线名称（例如 `arrow-left`），只查找当前 Vue 应用已注册的图标，不会自动加载图标全集。点击“切换图标”查看名称与图形同步变化。设置默认插槽时，优先显示插槽内容，`name` 不再决定图形。

Example source: src/icon/example/demos/icon-animation.vue

```vue
<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheckCircle,
  IconInfoCircle,
  IconRefresh,
  IconSearch,
} from '@maple-design/icons-vue'

const iconName = ref('arrow-left')
const app = getCurrentInstance()?.appContext.app
const icons = { IconArrowLeft, IconArrowRight, IconCheckCircle, IconInfoCircle, IconRefresh, IconSearch }
for (const [name, component] of Object.entries(icons)) {
  if (app && !app.component(name)) {
    app.component(name, component)
  }
}
function toggle() {
  iconName.value = iconName.value === 'arrow-left' ? 'arrow-right' : 'arrow-left'
}
</script>
<template>
  <p>
    name 是已注册图标的名称。本例提供
    arrow-left、arrow-right、check-circle、info-circle、refresh、search；默认插槽存在时优先显示插槽内容。
  </p>
  <div class="icon-name-demo">
    <mp-space wrap align="center" :size="24">
      <mp-button @click="toggle">切换图标</mp-button>
      <mp-icon :name="iconName" :size="32" :transition="300" />
    </mp-space>
  </div>
</template>
```

### 全部图标

两端使用同一套规范名称。搜索忽略首尾空格和大小写，清空后恢复全部图标。卡片放大展示图标，完整名称可换行；点击或按 Enter / Space 复制对应标签。复制使用浏览器 Clipboard API，需要安全上下文及剪贴板权限；失败时显示错误反馈。

Example source: src/icon/example/demos/icon-list.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import { iconNames as icons } from '@maple-design/icons-vue'
import * as MapleIcons from '@maple-design/icons-vue'
import { pascalCase } from '@maple-design/shared'
import { Message } from '@maple-design/ui'

const demoText = {
  basic: '基础用法',
  iconSize: '图标尺寸',
  iconColor: '图标颜色',
  rotateAndSpin: '旋转与持续旋转',
  clickEvent: '点击事件',
  iconAnimation: '动态名称（特殊场景，点击切换）',
  iconList: '图标列表 (点击复制)',
  copySuccess: '复制成功：',
  clickSuccess: '点击成功',
  searchIcon: '搜索图标',
  groupDirection: '方向',
  groupFeedback: '状态与反馈',
  groupEditing: '编辑',
  groupFiles: '文件',
  groupMedia: '媒体',
  groupCommunication: '通信与用户',
  groupBrands: '品牌',
  groupWeather: '天气',
  groupCommerce: '商业',
  groupGeneral: '通用',
}

const searchText = ref('')
const searchIcons = computed(() =>
  searchText.value ? icons.filter((name) => name.includes(searchText.value.trim().toLowerCase())) : icons,
)
const groupRules = [
  [
    'groupDirection',
    /(^|-)(arrow|caret|chevron|left|right|up|down|expand|shrink|swap|rotate|fullscreen|backward|forward)(-|$)/,
  ],
  ['groupFeedback', /(^|-)(alert|check|close|error|exclamation|info|question|success|warning|empty|stop)(-|$)/],
  [
    'groupEditing',
    /(^|-)(align|attachment|bold|brush|copy|delete|edit|eraser|filter|font|formula|italic|link|list|paste|quote|redo|scissor|sort|underline|undo|zoom)(-|$)/,
  ],
  ['groupFiles', /(^|-)(archive|book|bookmark|drive|file|folder|save|storage)(-|$)/],
  ['groupMedia', /(^|-)(camera|image|live|music|mute|pause|play|record|skip|sound|video|voice)(-|$)/],
  ['groupCommunication', /(^|-)(email|message|notification|phone|send|share|subscribe|user|robot)(-|$)/],
  ['groupBrands', /(alipay|bytedance|codepen|facebook|github|gitlab|google|lark|qq|tiktok|twitter|wechat|weibo|xigua)/],
  ['groupWeather', /(^|-)weather-|(^|-)sun(-|$)|(^|-)moon(-|$)/],
  ['groupCommerce', /(^|-)(barcode|cart|gift|shopping|tag)(-|$)/],
]
const iconGroups = computed(() => {
  const groups = new Map()
  for (const name of searchIcons.value) {
    const key = groupRules.find(([, rule]) => rule.test(name))?.[0] ?? 'groupGeneral'
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    groups.get(key).push(name)
  }
  return [...groupRules.map(([key]) => key), 'groupGeneral'].flatMap((key) => {
    const names = groups.get(key)
    return names?.length ? [[demoText[key] ?? String(key), names.sort()]] : []
  })
})
function resolveIcon(name) {
  return MapleIcons[`Icon${pascalCase(name)}`]
}

async function copyIcon(name) {
  const markup = `<m-icon-${name} />`
  try {
    await navigator.clipboard.writeText(markup)
    Message.success(`已复制 ${markup}`)
  } catch {
    Message.error('复制失败，请检查浏览器剪贴板权限')
  }
}
</script>

<template>
  <div>
    <mp-input
      v-model.trim="searchText"
      class="icon-example__search"
      size="sm"
      variant="outline"
      placeholder="搜索图标名称"
      clearable
    >
      <template #suffix>
        <m-icon-search class="search-icon" />
      </template>
    </mp-input>

    <section v-for="[group, names] in iconGroups" :key="group" class="icon-example__group">
      <h3>
        {{ group }} <small>{{ names.length }}</small>
      </h3>
      <div class="icon-example__icons">
        <mp-button
          v-for="name in names"
          :key="name"
          class="icon-example__icon"
          variant="outline"
          @click="copyIcon(name)"
        >
          <span class="icon-example__icon-content">
            <component :is="resolveIcon(name)" :size="40" />
            <span class="icon-example__icon-name">{{ name }}</span>
          </span>
        </mp-button>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
@import '../../../style/elevation';

.icon-example {
  &__icons {
    width: 100%;
    display: grid;
    grid-template-columns: ~'repeat(auto-fill, minmax(min(100%, 168px), 1fr))';
    gap: 16px;
  }

  &__group {
    margin: 24px 8px 0;

    h3 {
      margin: 0 0 12px;
      font-size: 16px;
    }
    small {
      margin-left: 6px;
      color: var(--mp-color-text-3);
      font-weight: normal;
    }
  }

  &__icon {
    min-height: 132px;
    height: auto;
    justify-content: center;
    font: inherit;
    line-height: 1.5;
    color: var(--mp-color-text-1);
    background: var(--mp-paper-background);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    padding: 20px 14px;
    border: 1px solid var(--mp-color-border-2);
    border-radius: 8px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    transition: background-color 0.25s;
  }

  &__search {
    width: auto;
    margin: 6px 8px 22px;
  }

  &__icon-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__icon-name {
    width: 100%;
    font-size: 13px;
    text-align: center;

    overflow-wrap: anywhere;
    white-space: normal;
    margin-top: 12px;
    line-height: 1.5;
  }
}

.search-icon {
  margin-left: 6px;
}
</style>
```

### 名称切换与生命周期

Example source: src/icon/example/demos/lifecycle.vue

```vue
<script setup>
import { computed, getCurrentInstance, KeepAlive, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import { IconArrowLeft, IconArrowRight } from '@maple-design/icons-vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang(
  (value) => {
    language.value = value
  },
  typeof window !== 'undefined' && window.location.hash.includes('language=') ? 'mobile' : 'pc',
)
const active = ref(true),
  iconName = ref('arrow-left'),
  duration = ref(300)
const app = getCurrentInstance()?.appContext.app
if (app && !app.component('IconArrowLeft')) {
  app.component('IconArrowLeft', IconArrowLeft)
}
if (app && !app.component('IconArrowRight')) {
  app.component('IconArrowRight', IconArrowRight)
}
function toggleName() {
  iconName.value = iconName.value === 'arrow-left' ? 'arrow-right' : 'arrow-left'
}
</script>
<template>
  <mp-space wrap>
    <mp-button @click="toggleName">{{ english ? 'Switch name' : '切换名称' }}</mp-button>
    <mp-button @click="active = !active">{{ english ? 'Toggle active' : '切换激活' }}</mp-button>
    <mp-button @click="duration = duration ? 0 : 300"
      >{{ english ? 'Toggle duration' : '切换时长' }} {{ duration }}ms</mp-button
    >
    <KeepAlive><mp-icon v-if="active" :name="iconName" :transition="duration" :size="32" /></KeepAlive>
  </mp-space>
  <p>
    {{
      english
        ? 'Inactive changes commit on activation without replay. Duration changes cancel the old phase; zero shows the latest name immediately.'
        : '停用后切换名称，激活直接显示最新图标，不重放旧动画；时长变更取消旧阶段，0立即显示最新名称。'
    }}
  </p>
</template>
```

## API

### 属性

| 参数              | 说明                         | 类型               | 默认值  |
| ----------------- | ---------------------------- | ------------------ | ------- |
| `name`            | 已注册图标名称；默认插槽优先 | _string_           | `-`     |
| `size`            | `inherit`                    | _string \| number_ | `-`     |
| `color`           | 图标颜色                     | _string_           | `-`     |
| `rotate`          | 旋转角度                     | _number_           | `-`     |
| `spin`            | 是否持续旋转                 | _boolean_          | `false` |
| `animation-class` | 过渡动画类名                 | _string_           | `-`     |
| `transition`      | 过渡动画时间（ms）           | _string \| number_ | `0`     |

### 独立 SVG 图标属性

| 参数              | 说明       | 类型                                         | 默认值    |
| ----------------- | ---------- | -------------------------------------------- | --------- |
| `size`            | `inherit`  | _string \| number_                           | `-`       |
| `color`           | 图标颜色   | _string_                                     | `-`       |
| `rotate`          | 旋转角度   | _number_                                     | `-`       |
| `spin`            | 是否旋转   | _boolean_                                    | `false`   |
| `title`           | 无障碍标题 | _string_                                     | `-`       |
| `stroke-width`    | 线宽       | _number_                                     | `4`       |
| `stroke-linecap`  | 端点类型   | _'butt' \| 'round' \| 'square'_              | `'butt'`  |
| `stroke-linejoin` | 拐角类型   | _'bevel' \| 'inherit' \| 'miter' \| 'round'_ | `'miter'` |

### 事件

| 事件名  | 说明           | 参数           |
| ------- | -------------- | -------------- |
| `click` | 点击图标时触发 | `event: Event` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名        | 默认值 |
| ------------- | ------ |
| `--icon-size` | `20px` |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

只解析本应用已注册的图标；连续切换 name 会取消过期定时器，卸载后不再执行切换。各库注册前缀和历史 spin 类由本地适配保留，图标资源不跨库引用。

两端 Icon 默认继承宿主字号。需要固定 20px 的场景请显式设置 size="20" 或 icon-size 变量；size 属性优先于变量，颜色默认继承宿主。

### 动效变量

| Token                     | Default |
| ------------------------- | ------- |
| `--mp-icon-spin-duration` | `1s`    |

内置动效遵循 prefers-reduced-motion: reduce：保留内容与状态反馈，关闭装饰性旋转、扫光和波纹。Icon 名称切换直接显示最新值并取消未结束阶段，CSS与JS时长保持一致；自定义动画类由调用方负责适配。Ripple的时长与清理策略以Ripple组件文档为准，不将其历史250ms规则当作Icon的时长上限。
