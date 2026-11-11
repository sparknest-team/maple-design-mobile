<!-- Source: src/index-bar/docs/en-US.md; locale: en-US; page: /en-US/index-bar -->

# IndexBar

### Intro

Hyperlinks to scroll on one page.

## Basic examples

### Basic Usage

When you click the index bar, it will automatically jump to the corresponding `IndexAnchor` anchor position.

Example source: src/index-bar/example/demos/basic.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
const list = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))
const active = ref('A')
const languagePlatform = typeof window !== 'undefined' && window.location.hash.includes('language=') ? 'mobile' : 'pc'

watchLang((value) => {
  language.value = value
}, languagePlatform)
onThemeChange()

function handleChange(value) {
  active.value = String(value)
}
</script>

<template>
  <app-type>{{ english ? 'Basic Usage' : '基本使用' }} · {{ english ? 'Active' : '当前' }} {{ active }}</app-type>
  <div class="index-bar-demo-surface">
    <mp-index-bar duration="300" @change="handleChange">
      <div v-for="item in list" :key="item">
        <mp-index-anchor
          :index="item"
          class="index-bar-example-anchor"
          :style="{
            background: 'var(--mp-tag-status-primary-color)',
            color: 'var(--mp-tag-status-primary-text-color)',
          }"
        >
          {{ english ? 'Title' : '标题' }} {{ item }}
        </mp-index-anchor>
        <mp-cell>{{ item }} {{ english ? 'Item' : '文本' }}</mp-cell>
        <mp-cell>{{ item }} {{ english ? 'Item' : '文本' }}</mp-cell>
      </div>
    </mp-index-bar>
  </div>
</template>

<style lang="less">
.index-bar-demo-surface {
  position: relative;
  height: 520px;
  overflow-y: auto;
  overscroll-behavior: contain;
  border: 1px solid var(--mp-color-border-2);
  border-radius: 8px;

  .mp-index-bar__anchor-list-container {
    position: sticky;
    top: 0;
    right: auto;
    bottom: auto;
    left: auto;
    width: 100%;
    height: 0;
    transform: none;
    pointer-events: none;
  }

  .mp-index-bar__anchor-list {
    position: absolute;
    top: 26px;
    right: 0;
    background: transparent !important;
    pointer-events: auto;
  }
}

.index-bar-example-anchor {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  transition: all 0.25s;
}
</style>
```

## Lifecycle and edge cases

### Deactivation, disposal and retained commands

Example source: src/index-bar/example/demos/lifecycle.vue

```vue
<script setup>
import { computed, KeepAlive, ref, watch } from 'vue'
import { AppType, watchLang } from '@maple-design/cli-vue/client'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang(
  (value) => {
    language.value = value
  },
  typeof window !== 'undefined' && window.location.hash.includes('language=') ? 'mobile' : 'pc',
)
const mounted = ref(true),
  active = ref(true),
  bar = ref(),
  changes = ref([])
let retained
watch(bar, (value) => {
  if (value) {
    retained = value
  }
})
const command = (index) => retained?.scrollTo(index)
const record = (value) => {
  changes.value.push(value)
}
</script>

<template>
  <app-type>{{ english ? 'Lifecycle and retained commands' : '生命周期与保留命令' }}</app-type>
  <mp-space wrap>
    <mp-button @click="command('C')">{{ english ? 'Scroll to C' : '跳转 C' }}</mp-button>
    <mp-button @click="active = !active">{{ english ? 'Toggle active' : '切换激活' }}</mp-button>
    <mp-button @click="mounted = !mounted">{{ english ? 'Toggle mounted' : '切换挂载' }}</mp-button>
    <mp-button @click="command('A')">{{ english ? 'Retained command A' : '保留命令 A' }}</mp-button>
  </mp-space>
  <p>{{ english ? 'Changes' : '变化事件' }}: {{ changes.join(' / ') }}</p>
  <div class="index-lifecycle-surface">
    <KeepAlive v-if="mounted">
      <mp-index-bar v-if="active" ref="bar" :duration="600" @change="record">
        <div v-for="index in ['A', 'B', 'C']" :key="index" class="index-lifecycle-group">
          <mp-index-anchor :index="index" />
          <p>{{ english ? 'Group' : '分组' }} {{ index }}</p>
        </div>
      </mp-index-bar>
    </KeepAlive>
  </div>
  <p>
    {{
      english
        ? 'Inactive/disposed retained commands do not scroll or notify. Activation restores active without another change event.'
        : '停用／卸载后保留命令不滚动、不通知；激活恢复当前定位，不重复变化事件。'
    }}
  </p>
</template>

<style lang="less">
.index-lifecycle-surface {
  height: 180px;
  overflow: auto;
  position: relative;
  border: 1px solid var(--mp-color-border-2);
}
.index-lifecycle-group {
  height: 240px;
}
</style>
```

## Reading direction

The default index list sits at inline end. Letter/item order and vertical scroll coordinates do not reverse. Safe areas and sticky top offsets retain their physical meaning.

No index is initially active until scrolling or `scrollTo` selects one. Navigation uses native buttons supporting Tab, Enter and Space. Provide readable, noninteractive content in `anchor-name`.

Identifiers use strict equality: numeric `0` differs from string `"0"`. An omitted index is excluded; an empty string is valid. Use unique identifiers; with duplicates, programmatic navigation uses the first match. `duration` is read as milliseconds from a number or numeric string; nonpositive or nonfinite values scroll immediately. `sticky-offset-top` uses the existing length conversion and refers to the physical top. A new scroll command replaces the previous one; deactivation and unmount cancel pending scrolling.

## API

### IndexBar Props

| Prop | Description | Type | Default |
| ------------------- | -------------------------- | ------------------ | ------- |
| `sticky` | Whether to enable anchor sticky top | _boolean_ | `true` |
| `sticky-offset-top` | Anchor offset top when sticky | _number \| string_ | `0` |
| `hide-list` | Whether to hide anchor list | _boolean_ | `false` |
| `sticky-css-mode` | Enable native `css sticky` mode | _boolean_ | `false` |
| `z-index` | z-index | _number \| string_ | `1` |
| `highlight-color` | Index character highlight color | _string_ | `-` |
| `duration` | Animation duration | _string \| number_ | `0` |

### IndexAnchor Props

| Prop | Description | Type | Default |
| ------- | -------- | ------------------ | ------ |
| `index` | Index | _number \| string_ | `-` |

### IndexBar Events

| Event | Description | Callback arguments |
| -------- | ---------------------------- | ------------------------- |
| `click` | Emitted when an index is clicked | `index: number \| string` |
| `change` | Emitted when active index changed | `index: number \| string` |

### IndexBar Slots

| Name | Description | Prop |
| --------- | ---------- | ---- |
| `default` | Index-bar content | `-` |
| `anchor-name` | Navigation button content; use noninteractive content | `{ anchorName: number \| string }` |

### IndexAnchor Slots

| Name | Description | Prop |
| ------------- | -------------- | ----------------------------- |
| `default` | Custom index character | `-` |

### IndexBar Methods

Access IndexBar through ref to call instance methods

| Method | Description | Arguments | Returns |
| ---------- | -------------- | ------------------------------------------------------------ | ------ |
| `scrollTo` | Scroll to target element | `index: number \| string, options?: IndexBarScrollToOptions` | `-` |

## Types

### IndexBarScrollToOptions

| Prop | Description | Type | Default |
| ------- | ------------------------------------- | --------- | ------ |
| `event` | Prevent `change` emit event when `false` | _boolean_ | `-` |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-index-bar-list-bottom` | `auto` | `bottom` |
| `--mp-index-bar-list-item-active-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-index-bar-list-item-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-index-bar-list-item-font-size` | `var(--mp-font-size-xs)` | `font-size` |
| `--mp-index-bar-list-item-height` | `14px` | `height` |
| `--mp-index-bar-list-item-padding` | `0 10px` | `padding` |
| `--mp-index-bar-list-left` | `auto` | `inset-inline-start` |
| `--mp-index-bar-list-right` | `0` | `inset-inline-end` |
| `--mp-index-bar-list-top` | `50%` | `top` |
| `--mp-index-bar-list-transform` | `translate(0, -50%)` | `transform` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-index-bar-list-item-active-color: var(--mp-sys-color-content-danger);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
