<!-- Source: src/icon/docs/en-US.md; locale: en-US; page: /en-US/icon -->

# Icon

Icons are independent SVG Vue components. Use the Resolver for on-demand imports and the Icon wrapper to control size, color, and rotation.

The wrapper reuses static namespace and predicate helpers from maple-shared. CSS size conversion and prop defaults remain in the UI utilities. On-demand imports retain only the helpers and individual SVG components you use.

## Examples

### Basic Usage

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

### Icon Size

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

### Icon Color

Example source: src/icon/example/demos/icon-color.vue

```vue
<template>
  <mp-space wrap :size="24">
    <mp-icon size="28" color="var(--mp-color-primary)"><m-icon-check-circle /></mp-icon>
    <mp-icon size="28" color="var(--mp-color-success)"><m-icon-check-circle /></mp-icon>
  </mp-space>
</template>
```

### Rotate and Spin

Use `rotate` for a static angle and `spin` for continuous rotation; they can be combined.

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

### Click Event

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

### Custom Icon

Place a custom SVG in the default slot. The Icon wrapper controls its size and color.

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

### Dynamic Name

`name` is a kebab-case name such as `arrow-left`. It only resolves icons registered in the current Vue app and does not load the entire library. Click the button to switch the name and icon together. When a default slot is provided, its content takes priority over `name`.

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

### All Icons

Both libraries use the same canonical names. Search ignores surrounding whitespace and case; clearing restores all icons. Larger cards wrap the complete name. Click or press Enter / Space to copy a tag. Copying uses the Clipboard API and requires a secure context and clipboard permission; failures display an error.

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

### Name Changes and Lifecycle

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

### Props

| Prop              | Description                            | Type               | Default |
| ----------------- | -------------------------------------- | ------------------ | ------- |
| `name`            | icon name                              | _string_           | `-`     |
| `size`            | `inherit`                              | _string \| number_ | `-`     |
| `color`           | Icon color                             | _string_           | `-`     |
| `rotate`          | Rotation angle                         | _number_           | `-`     |
| `spin`            | Whether to spin continuously           | _boolean_          | `false` |
| `animation-class` | Name of the transition animation class | _string_           | `-`     |
| `transition`      | Transition animation time(ms)          | _string \| number_ | `0`     |

### Standalone SVG Icon Props

| Prop              | Description      | Type                                         | Default   |
| ----------------- | ---------------- | -------------------------------------------- | --------- |
| `size`            | `inherit`        | _string \| number_                           | `-`       |
| `color`           | Icon color       | _string_                                     | `-`       |
| `rotate`          | Rotation angle   | _number_                                     | `-`       |
| `spin`            | Whether to spin  | _boolean_                                    | `false`   |
| `title`           | Accessible title | _string_                                     | `-`       |
| `stroke-width`    | Stroke width     | _number_                                     | `4`       |
| `stroke-linecap`  | Stroke line cap  | _'butt' \| 'round' \| 'square'_              | `'butt'`  |
| `stroke-linejoin` | Stroke line join | _'bevel' \| 'inherit' \| 'miter' \| 'round'_ | `'miter'` |

### Events

| Event   | Description                          | Arguments      |
| ------- | ------------------------------------ | -------------- |
| `click` | Triggered when you click on the icon | `event: Event` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable      | Default |
| ------------- | ------- |
| `--icon-size` | `20px`  |

Default Icon size now inherits the host font size on both platforms. Set size="20" or --mp-icon-size: 20px explicitly if a standalone 20px icon is required. The size prop takes precedence over the token; color inherits unless supplied.

### Motion tokens

| Token                     | Default |
| ------------------------- | ------- |
| `--mp-icon-spin-duration` | `1s`    |

Built-in motion honors prefers-reduced-motion: reduce. State/content remain visible; decorative spin, shimmer and ripple are suppressed. Icon name changes show the latest value and cancel pending phases, using the same normalized CSS/JS duration. Custom animation classes remain the caller's responsibility. See Ripple's own documentation for its duration/cleanup policy; its historical250ms policy is not an Icon duration limit.
