<!-- Source: src/index-bar/docs/en-US.md; locale: en-US; page: /en-US/index-bar -->

# IndexBar

## Examples

### Lifecycle-owned scrolling

New commands replace older scrolling. Deactivation/disposal cancels entry/interpolation/two-frame settlement; retained methods cannot write or notify. Activation waits for child registration before restoring active/event:false. Cancellation stops without jumping to an old target. Public scrollTo still returns void; default0/cubic easing and events remain. Private tasks replace the generic-helper call, with no new public cancellation API/CSS variable. Reduced motion skips interpolation, not necessary list/clickedName settlement frames.

Consumer11/private task4/existing9 pass (24). Final real IAB4/4 covers replacement, settlement, disposal and KeepAlive, nodes0/no warn-error. Scope is default/light parent document with native entry clicks and fixture-scripted commands/scroll events; native gestures, OS and other themes/windows remain separate. The helper records below are historical independent evidence.

Shared helper8 real IAB cases pass: main default/zero and same-origin iframe element/Window on both platforms. Default302.5–313.9ms, zero has no RAF, iframe host RAF0, stable targets and cleanup. This certifies scoped helper execution, not IndexBar entry-frame/doubleRaf/clickedName/disposal cancellation or OS reduced motion.

Earlier helper10 tests per platform and real IAB8 cases are independent tool evidence. IndexBar now privately owns cancellation, owner preference and settlement for zero/nonpositive/nonfinite duration; the generic helper receives no cancellation parameter. Zero duration retains entry/two-frame waits, and CSS tokens do not replace duration. Parallel Form remains untouched.

### Intro

Hyperlinks to scroll on one page.

### Basic Usage

When you click the index bar, it will automatically jump to the corresponding `IndexAnchor` anchor position.

Example source: src/index-bar/example/demos/basic.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'

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

### Deactivation, disposal and retained commands

Example source: src/index-bar/example/demos/lifecycle.vue

```vue
<script setup>
import { computed, KeepAlive, ref, watch } from 'vue'
import { AppType, watchLang } from '@maple-design/cli/client'

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

## API

### Props

#### IndexBar Props

| Prop                | Description                         | Type               | Default |
| ------------------- | ----------------------------------- | ------------------ | ------- |
| `sticky`            | Whether to enable anchor sticky top | _boolean_          | `true`  |
| `sticky-offset-top` | Anchor offset top when sticky       | _number \| string_ | `0`     |
| `hide-list`         | Whether to hide anchor list         | _boolean_          | `false` |
| `sticky-css-mode`   | Enable native `css sticky` mode     | _boolean_          | `false` |
| `z-index`           | z-index                             | _string \| number_ | `1`     |
| `highlight-color`   | Index character highlight color     | _string_           | `-`     |
| `duration`          | Animation duration                  | _string \| number_ | `0`     |

#### IndexAnchor Props

| Prop    | Description | Type               | Default |
| ------- | ----------- | ------------------ | ------- |
| `index` | Index       | _string \| number_ | `-`     |

### Events

#### IndexBar Events

| Event    | Description                       | arguments                 |
| -------- | --------------------------------- | ------------------------- |
| `click`  | Emitted when an index is clicked  | `index: number \| string` |
| `change` | Emitted when active index changed | `index: number \| string` |

### Slots

#### IndexBar Slots

| Name      | Description          | SlotProps |
| --------- | -------------------- | --------- |
| `default` | Content of index bar | `-`       |

#### IndexAnchor Slots

| Name          | Description            | SlotProps                           |
| ------------- | ---------------------- | ----------------------------------- |
| `default`     | Custom index character | `-`                                 |
| `anchor-name` | Custom anchor content  | `anchorName: string` anchor content |

### Methods

Use ref to get IndexBar instance and call instance methods.

| Method     | Description              | arguments                                                    | Return |
| ---------- | ------------------------ | ------------------------------------------------------------ | ------ |
| `scrollTo` | Scroll to target element | `index: number \| string, options?: IndexBarScrollToOptions` | `-`    |

#### IndexBarScrollToOptions

| Option  | Description                              | Type      | Default |
| ------- | ---------------------------------------- | --------- | ------- |
| `event` | Prevent `change` emit event when `false` | _boolean_ | `-`     |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                                | Default                   |
| --------------------------------------- | ------------------------- |
| `--mp-index-bar-list-right`             | `0`                       |
| `--mp-index-bar-list-top`               | `50%`                     |
| `--mp-index-bar-list-left`              | `auto`                    |
| `--mp-index-bar-list-bottom`            | `auto`                    |
| `--mp-index-bar-list-transform`         | `translate(0, -50%)`      |
| `--mp-index-bar-list-item-font-size`    | `var(--mp-font-size-xs)`  |
| `--mp-index-bar-list-item-color`        | `var(--mp-color-primary)` |
| `--mp-index-bar-list-item-active-color` | `var(--mp-color-danger)`  |
| `--mp-index-bar-list-item-height`       | `14px`                    |
| `--mp-index-bar-list-item-padding`      | `0 10px`                  |

### API

### Props

| Prop    | Description | Type               | Default |
| ------- | ----------- | ------------------ | ------- |
| `index` | Index       | _string \| number_ | `-`     |

### Slots

| Name      | Description            | SlotProps |
| --------- | ---------------------- | --------- |
| `default` | Custom index character | `-`       |
