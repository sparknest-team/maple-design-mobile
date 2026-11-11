<!-- Source: src/icon/docs/en-US.md; locale: en-US; page: /en-US/icon -->

# Icon

Icons are independent SVG Vue components. Use the Resolver for on-demand imports and the Icon wrapper to control size, color, and rotation.

The wrapper reuses static namespace and predicate helpers from maple-shared. CSS size conversion and prop defaults remain in the UI utilities. On-demand imports retain only the helpers and individual SVG components you use.

## Basic examples

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

## Appearance and states

### Icon size and color

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | `inherit` | Icon size and color |
| `color` | Icon color | Icon size and color |
<!-- demo-config-notes:end -->


Compare size and color independently of rotation, animation and click handling.

Example source: src/icon/example/demos/appearance-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="icon-size">
      <h4><span lang="zh-CN">图标尺寸</span><span lang="en-US">Icon Size</span></h4>
      <mp-space wrap align="center" :size="24">
        <mp-icon size="20"><m-icon-check-circle /></mp-icon>
        <mp-icon size="28"><m-icon-check-circle /></mp-icon>
        <mp-icon size="36"><m-icon-check-circle /></mp-icon>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="icon-color">
      <h4><span lang="zh-CN">图标颜色</span><span lang="en-US">Icon Color</span></h4>
      <mp-space wrap :size="24">
        <mp-icon size="28" color="var(--mp-color-primary)"><m-icon-check-circle /></mp-icon>
        <mp-icon size="28" color="var(--mp-color-success)"><m-icon-check-circle /></mp-icon>
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
</style>
```

## Content and presentation

### Rotate and Spin

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | `inherit` | Rotate and Spin |
| `rotate` | Rotation angle | Rotate and Spin |
| `spin` | Whether to rotate continuously | Rotate and Spin |
<!-- demo-config-notes:end -->


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
    <div class="demo-item">
      <m-icon-refresh :size="32" :rotate="45" spin />
      <span>独立 SVG：rotate + spin</span>
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

### All Icons

Both libraries use the same canonical names. Search ignores surrounding whitespace and case; clearing restores all icons. Larger cards wrap the complete name. Click or press Enter / Space to copy a tag. Copying uses the Clipboard API and requires a secure context and clipboard permission; failures display an error.

Example source: src/icon/example/demos/icon-list.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import { iconNames as icons } from '@maple-design/icons-vue'
import * as MapleIcons from '@maple-design/icons-vue'
import { pascalCase } from '@maple-design/shared-vue'
import { Message } from '@maple-design/ui-vue'

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

## Customization and slots

### Custom Icon

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | `inherit` | Custom Icon |
| `color` | Icon color | Custom Icon |
<!-- demo-config-notes:end -->


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

## Interaction and control

### Click Event

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | `inherit` | Click Event, Dynamic Name |
| `color` | Icon color | Click Event |
| `name` | icon name | Dynamic Name |
| `transition` | Transition animation time(ms) | Dynamic Name |
<!-- demo-config-notes:end -->


Example source: src/icon/example/demos/click-event.vue

```vue
<script setup lang="ts">
import { Message } from '@maple-design/ui-vue'
</script>
<template>
  <mp-button variant="text" round aria-label="确认操作" @click="Message.success('点击成功')">
    <template #icon><m-icon-check-circle /></template>
  </mp-button>
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

## Lifecycle and edge cases

### Name Changes and Lifecycle

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `name` | icon name | Name Changes and Lifecycle |
| `transition` | Transition animation time(ms) | Name Changes and Lifecycle |
| `size` | `inherit` | Name Changes and Lifecycle |
<!-- demo-config-notes:end -->


Example source: src/icon/example/demos/lifecycle.vue

```vue
<script setup>
import { computed, getCurrentInstance, KeepAlive, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
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

### Standalone icon styles and usage boundaries

Resolver auto-imports include the lightweight rotation styles for standalone icons. With `importStyle: false`, applications must import those styles. The UI Icon style entry also includes them; loading every icon is unnecessary.

When manually importing standalone SVG components, import this stylesheet once in your application entry when using `spin`:

```ts
import '@maple-design/icons-vue/style.css'
```

`rotate` and `spin` can be combined; built-in rotation respects reduced motion. `transition` controls registered-name changes only, using milliseconds as a number or numeric string, such as `200` / `"200"`; it does not parse `"200ms"` / `"1s"`. The default slot owns content and skips name-`transition` animation. Removing it immediately shows the latest name. Custom `animation-class` should avoid overriding the `transform` used for continuous rotation and should implement reduced-motion behavior.

`name` only resolves icons explicitly registered in the current application before rendering; it does not download resources. Registration after mount does not refresh an existing icon automatically. The container's native `title` is not forwarded to its SVG. Set `title` on standalone icons for image naming, and use an accessibly named Button for actions. `click` is a notification supporting Vue `.once`; listener Promises do not manage waiting. `stroke-*` affects strokes only; filled or fixed multicolor artwork may not respond.


### Icon Props

| Prop | Description | Type | Default |
| ----------------- | ---------------------------- | ------------------ | ------- |
| `name` | icon name | _string_ | `-` |
| `size` | `inherit` | _string \| number_ | `-` |
| `color` | Icon color | _string_ | `-` |
| `rotate` | Rotation angle | _number_ | `-` |
| `spin` | Whether to rotate continuously | _boolean_ | `false` |
| `animation-class` | Name of the transition animation class | _string_ | `-` |
| `transition` | Transition animation time(ms) | _string \| number_ | `0` |

### Standalone SVG icon props

| Prop | Description | Type | Default |
| ----------------- | ---------- | -------------------------------------------- | --------- |
| `size` | `inherit` | _string \| number_ | `-` |
| `color` | Icon color | _string_ | `-` |
| `rotate` | Rotation angle | _number_ | `-` |
| `spin` | Whether to rotate | _boolean_ | `false` |
| `title` | Accessible title | _string_ | `-` |
| `stroke-width` | Stroke width | _number_ | `4` |
| `stroke-linecap` | Stroke line cap | _'butt' \| 'round' \| 'square'_ | `'butt'` |
| `stroke-linejoin` | Stroke line join | _'bevel' \| 'inherit' \| 'miter' \| 'round'_ | `'miter'` |

### Icon Events

| Event | Description | Arguments |
| ------- | -------------- | -------------- |
| `click` | Triggered when you click on the icon | `event: MouseEvent` |

### Icon Slots

| Slot | Description |
| --- | --- |
| `default` | Custom content; takes precedence over name |

## Types

```ts
import type { IconProps, IconInstance } from '@maple-design/ui-vue'
```

## Usage notes



Only resolves icons registered in the current application. Repeated name changes display the latest requested icon, and unmounting stops pending switches.

Icons inherit the host font size on both platforms. For a fixed 20px icon, set size="20" or icon-size explicitly. The size prop overrides the variable; color inherits from the host by default.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-icon-size` | `inherit` | `font-size` |
| `--mp-icon-spin-duration` | `1s` | `animation` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-icon-size: inherit;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Motion

Built-in motion follows prefers-reduced-motion: reduce: content and state feedback remain, while decorative spinning, shimmer and ripples stop. Icon name changes display the latest value immediately and cancel unfinished phases, keeping CSS and JS durations aligned. Callers must adapt custom animation classes. Ripple duration/cleanup follows Ripple documentation; its historical 250ms rule is not an Icon duration limit.
