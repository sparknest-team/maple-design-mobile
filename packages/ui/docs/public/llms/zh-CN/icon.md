<!-- Source: src/icon/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/icon -->

# 图标

图标以独立 SVG Vue 组件提供。推荐通过 Resolver 自动按需导入；需要统一尺寸、颜色或旋转时，使用 Icon 容器包裹图标。

图标容器的命名和类型判断复用 maple-shared 的静态工具；尺寸转换和默认 props 处理保留在 UI 工具中。按需引入只保留实际使用的工具，图形仍由独立 SVG 组件提供。

## 基础示例

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

## 外观与状态

### 图标尺寸与颜色

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `size` | `inherit` | 图标尺寸与颜色 |
| `color` | 图标颜色 | 图标尺寸与颜色 |
<!-- demo-config-notes:end -->

比较相同图标的尺寸和颜色，旋转/动画与点击行为另行展示。

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

## 内容与展示

### 旋转与持续旋转

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `size` | `inherit` | 旋转与持续旋转 |
| `rotate` | 旋转角度 | 旋转与持续旋转 |
| `spin` | 是否持续旋转 | 旋转与持续旋转 |
<!-- demo-config-notes:end -->

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

### 全部图标

两端使用同一套规范名称。搜索忽略首尾空格和大小写，清空后恢复全部图标。卡片放大展示图标，完整名称可换行；点击或按 Enter / Space 复制对应标签。复制使用浏览器 Clipboard API，需要安全上下文及剪贴板权限；失败时显示错误反馈。

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

## 自定义与插槽

### 自定义图标

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `size` | `inherit` | 自定义图标 |
| `color` | 图标颜色 | 自定义图标 |
<!-- demo-config-notes:end -->

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

## 交互与控制

### 点击事件

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `size` | `inherit` | 点击事件、动态名称 |
| `color` | 图标颜色 | 点击事件 |
| `name` | 已注册图标名称；默认插槽优先 | 动态名称 |
| `transition` | 过渡动画时间（ms） | 动态名称 |
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

## 生命周期与边界

### 名称切换与生命周期

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `name` | 已注册图标名称；默认插槽优先 | 名称切换与生命周期 |
| `transition` | 过渡动画时间（ms） | 名称切换与生命周期 |
| `size` | `inherit` | 名称切换与生命周期 |
<!-- demo-config-notes:end -->

Example source: src/icon/example/demos/lifecycle.vue

```vue
<script setup>
import { getCurrentInstance, KeepAlive, ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import { IconArrowLeft, IconArrowRight } from '@maple-design/icons-vue'

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

### 独立图标样式与使用边界

Resolver 自动导入独立图标时会一并引入轻量旋转样式；`importStyle: false` 时由业务自行引入。UI Icon 的样式入口也包含这份样式，不需要加载全部图标。

手动导入独立 SVG 组件时，若使用 `spin`，请在应用入口引入一次：

```ts
import '@maple-design/icons-vue/style.css'
```

`rotate` 与 `spin` 可以组合；内置旋转遵循减少动态效果设置。`transition` 只控制注册名称的切换，以毫秒数值或数字字符串传入（如 `200` / `"200"`），不解析 `"200ms"` / `"1s"`。默认插槽接管内容后不执行名称切换动画，移除插槽时立即显示最新名称。自定义 `animation-class` 应避免覆盖持续旋转使用的 `transform`，并自行适配减少动态效果设置。

`name` 只查找当前应用在渲染前显式注册的图标，不自动下载资源；挂载后补注册不会自动刷新。容器的原生 `title` 不会传给内部 SVG，需要图像名称时在独立图标上设置 `title`；作为操作入口时使用带可访问名称的 Button。`click` 是普通通知事件，支持 Vue 的 `.once`，不会根据监听器返回的 Promise 管理等待状态。`stroke-*` 只作用于描边，填充或固定多色资源不保证随这些属性变化。


### Icon Props

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

### Icon Events

| 事件名  | 说明           | 参数           |
| ------- | -------------- | -------------- |
| `click` | 点击图标时触发 | `event: MouseEvent` |

### Icon Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义内容，优先于 name |

## Types

```ts
import type { IconProps, IconInstance } from '@maple-design/ui-vue'
```

## 使用说明



只解析当前应用已注册的图标。连续切换 name 时只展示最新请求的图标，卸载后停止切换。

两端 Icon 默认继承宿主字号。需要固定 20px 的场景请显式设置 size="20" 或 icon-size 变量；size 属性优先于变量，颜色默认继承宿主。

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-icon-size` | `inherit` | `font-size` |
| `--mp-icon-spin-duration` | `1s` | `animation` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-icon-size: inherit;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 动效

内置动效遵循 prefers-reduced-motion: reduce：保留内容与状态反馈，关闭装饰性旋转、扫光和波纹。Icon 名称切换直接显示最新值并取消未结束阶段，CSS与JS时长保持一致；自定义动画类由调用方负责适配。自定义动画应遵循用户的减少动态效果偏好。
