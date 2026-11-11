<!-- Source: src/split-button/docs/en-US.md; locale: en-US; page: /en-US/split-button -->

# SplitButton

Demo text follows the site language selector. Middle cards and the right-hand mobile collection load the same Vue source without activating a local locale dictionary.

Disabled segments reuse Button disabled colors and suppress interaction feedback. Disabling the entire group also removes its elevation; disabling only the menu button blocks menu opening and closes an uncontrolled open menu.

Both segments inherit the same variant, status and custom colors. The arrow uses the icon slot; its layout does not change the shared palette.

### Introduction

Combines a primary action button with a menu of related actions. The main button performs the action and the trailing button opens the menu.

Examples use `Message.info(...)`, supported on both platforms. Selection closes the menu by default; only the repeated-selection example keeps it open while showing a Message. The outline / text arrow retains a transparent background.

## Basic examples

### Basic usage

The main button publishes; the arrow opens related actions. Options have stable values and include a disabled action.

Example source: src/split-button/example/basic.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import { Message } from '@maple-design/ui-vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const publish = () => {
  Message.info(english.value ? 'Published' : '发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-split-button placement="bottom-end" @click="publish" @select="handleSelect">
    {{ english ? 'Publish' : '发布' }}

    <template #content>
      <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
      <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
      <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
    </template>
  </mp-split-button>
</template>
```

## Appearance and states

### Variants

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `variant` | Button group variant | Variants |
| `disabled` | Whether the entire split button is disabled | Disabled states |
| `button-props` | Props for the primary button | Disabled states |
| `trigger-button-props` | Props for the menu trigger button | Disabled states |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Appearance configuration comparison |
<!-- demo-config-notes:end -->


Compare default, outline, tonal and text variants.

Example source: src/split-button/example/variants.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import { Message } from '@maple-design/ui-vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const publish = () => {
  Message.info(english.value ? 'Published' : '发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const variants = ['default', 'outline', 'tonal', 'text'] as const
</script>

<template>
  <mp-space wrap>
    <mp-split-button
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
      @click="publish"
      @select="handleSelect"
    >
      {{ variant }}

      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
```

### Disabled states

Compare disabling the whole group, only the main button and only the menu button. Overall disabled cannot be overridden by disabled: false on either child.

Example source: src/split-button/example/disabled.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import { Message } from '@maple-design/ui-vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const publish = () => {
  Message.info(english.value ? 'Published' : '发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space wrap>
    <mp-split-button
      disabled
      :button-props="{ disabled: false }"
      :trigger-button-props="{ disabled: false }"
      @click="publish"
      @select="handleSelect"
    >
      {{ english ? 'All disabled' : '整体禁用' }}

      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button :button-props="{ disabled: true }" @click="publish" @select="handleSelect">
      {{ english ? 'Main disabled' : '仅禁用主按钮' }}

      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button :trigger-button-props="{ disabled: true }" @click="publish" @select="handleSelect">
      {{ english ? 'Menu disabled' : '仅禁用菜单按钮' }}

      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
```

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Five sizes

All five sizes are supported: xs, sm, md (default), lg and xl. Examples wrap on narrow screens.

#### Appearance combinations

Use this example for a primary action and secondary menu. Adjust status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

Example source: src/split-button/example/demos/appearance-lab.vue

```vue
<script setup lang="ts">
import { computed, computed as demoComputed, ref as demoRef, reactive, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import { Message } from '@maple-design/ui-vue'
import type { ComponentSize, SemanticStatus } from '../../../utils/constants'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const publish = () => {
  Message.info(english.value ? 'Published' : '发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const __demoAppearance = reactive<{ status: SemanticStatus; size: ComponentSize }>({ status: 'default', size: 'md' })

const demoCompareFields = [
  { name: 'status', values: ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] },
  { name: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'] },
]
const demoCompareAxis = demoRef('status')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" align="flex-start" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="status">
        <mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'primary', value: 'primary' },
            { label: 'secondary', value: 'secondary' },
            { label: 'tertiary', value: 'tertiary' },
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
          ]"
          aria-label="status"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-split-button
          placement="bottom-end"
          v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"
          @click="publish"
          @select="handleSelect"
        >
          {{ english ? 'Publish' : '发布' }}

          <template #content>
            <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
            <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
            <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
          </template>
        </mp-split-button>
      </section>
    </div>
  </mp-space>
</template>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
```

## Content and presentation

### Popup and repeated selection

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | Popup and repeated selection |
| `offset-y` | Vertical menu offset | Popup and repeated selection |
| `popup-max-height` | Maximum menu height | Popup and repeated selection |
| `hide-on-select` | Close the menu after selection | Popup and repeated selection |
<!-- demo-config-notes:end -->


Use bottom-start, an 8px vertical offset and a 160px maximum height. With hide-on-select=false, repeated selections keep the menu open and display the latest value.

Example source: src/split-button/example/popup.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import { Message } from '@maple-design/ui-vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const lastAction = ref('')
const handleSelect = (value: unknown, option: { label?: unknown }) => {
  lastAction.value = String(value)
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button
      placement="bottom-start"
      :offset-y="8"
      :popup-max-height="160"
      :hide-on-select="false"
      @click="lastAction = 'publish'"
      @select="handleSelect"
    >
      {{ english ? 'Choose action' : '选择操作' }}
      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite"
      >{{ english ? 'Last action' : '最近操作' }}: {{ lastAction || (english ? 'None' : '暂无操作') }}</span
    >
    <span>{{
      english
        ? 'The menu stays open after selection; click outside to close.'
        : '选择后菜单保持展开，可连续选择；点击外部关闭。'
    }}</span>
  </mp-space>
</template>
```

## Customization and slots

### Custom icon

Rotate the same arrow icon on both platforms using the open slot parameter.

Example source: src/split-button/example/custom-icon.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import { Message } from '@maple-design/ui-vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const publish = () => {
  Message.info(english.value ? 'Published' : '发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-split-button @click="publish" @select="handleSelect">
    {{ english ? 'Publish' : '发布' }}
    <template #icon="{ open }">
      <m-icon-menu-down
        :style="{
          transform: open ? 'rotate(180deg)' : undefined,
          transition: 'transform 0.2s',
        }"
      />
    </template>
    <template #content>
      <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
      <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
      <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
    </template>
  </mp-split-button>
</template>
```

## Interaction and control

### Controlled menu

Use `@click.stop` on external controls so the opening click is not also treated as an outside click. Other outside clicks still close the menu.

Use v-model:open to synchronize external controls, the trigger and selection-driven closing.

Example source: src/split-button/example/controlled.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import { Message } from '@maple-design/ui-vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const publish = () => {
  Message.info(english.value ? 'Published' : '发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const open = ref(false)
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-space wrap>
      <mp-button @click.stop="open = true">{{ english ? 'Open menu' : '展开菜单' }}</mp-button>
      <mp-button @click.stop="open = false">{{ english ? 'Close menu' : '关闭菜单' }}</mp-button>
    </mp-space>
    <mp-split-button v-model:open="open" @click="publish" @select="handleSelect">
      {{ english ? 'Publish' : '发布' }}

      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ open ? (english ? 'Opened' : '已展开') : english ? 'Closed' : '已关闭' }}</span>
  </mp-space>
</template>
```

## Async and dynamic data

### Async action

Use an async @click handler and control button-props.loading with business state. Reset loading in finally on both success and failure; the counter shows completed operations.

Example source: src/split-button/example/async-action.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import { Message } from '@maple-design/ui-vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const completed = ref(0)
const publishing = ref(false)
const publish = async () => {
  if (publishing.value) {
    return
  }
  publishing.value = true
  try {
    await new Promise<void>((resolve) => setTimeout(resolve, 800))
    completed.value += 1
    Message.info('发布成功 / Published')
  } finally {
    publishing.value = false
  }
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button :button-props="{ loading: publishing }" @click="publish" @select="handleSelect">
      {{ english ? 'Publish' : '发布' }}

      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ english ? 'Completed' : '完成次数' }}: {{ completed }}</span>
  </mp-space>
</template>
```

## Reading direction

The main button sits at inline start and the menu button at inline end. LTR/RTL changes do not swap business actions or emit extra selections. Enter/Space retain native button behavior. The menu button opens via Up/Down and skips disabled options; Home/End reaches boundaries, Enter selects, and Escape closes and restores focus. Popovers inherit trigger direction; start/end alignment follows direction while explicit left/right stays physical. Custom downward icons are not mirrored automatically.

## Menu button name

The menu trigger defaults to a localized “More actions” name. Override it with `aria-label` or `aria-labelledby` through `trigger-button-props`.

## Triggers and positioning

### Popup placement

Use `placement` to position the extra-actions menu. See `MenuPlacement` for the available values.

## API

### SplitButton Props

| Prop | Description | Type | Default |
| ---------------------- | ------------------------------------ | -------------------------------- | ----------- |
| `open` | Whether the menu is open. Supports `v-model:open` | _boolean_ | `undefined` |
| `default-open` | Whether the menu is open initially | _boolean_ | `false` |
| `disabled` | Whether the entire split button is disabled | _boolean_ | `false` |
| `status` | Button group semantic status | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `default` |
| `variant` | Button group variant | _ButtonVariant_<br>`'text' \| 'default' \| 'outline' \| 'tonal'` | `default` |
| `size` | Button group size; does not affect menu item size | _ComponentSize_<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| `color` | Background color | _string_ | `undefined` |
| `text-color` | Custom text color | _string_ | `''` |
| `elevation` | Button group elevation | _boolean \| number_ | `true` |
| `button-props` | Primary button props, including native attributes and events | `SplitButtonButtonProps` | `undefined` |
| `trigger-button-props` | Menu trigger button props, including native attributes and events | `SplitButtonButtonProps` | `undefined` |
| `trigger` | Menu trigger method | _TriggerEvent \| TriggerEvent[]_<br>`TriggerEvent: 'manual' \| 'focus' \| 'hover' \| 'click' \| 'contextMenu'` | `click` |
| `placement` | Preferred popup side relative to the trigger, default bottom. With the default auto-fit-position enabled, Trigger may flip and constrain it to the viewport when space is limited; this is not a fixed final position | `MenuPlacement`<br>`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `bottom` |
| `popup-container` | Menu mount container | _PopupContainer_ | `body` |
| `popup-max-height` | Maximum menu height | _boolean \| number_ | `true` |
| `popup-class` | Menu popup class | _string \| array \| object_ | `undefined` |
| `offset-x` | Horizontal menu offset | _string \| number_ | `0` |
| `offset-y` | Vertical menu offset | _string \| number_ | `0` |
| `hide-on-select` | Close the menu after selection | _boolean_ | `true` |

### SplitButton Events

| Event | Description | Callback arguments |
| ------------- | -------------------------- | ---------------------- |
| `update:open` | Emitted when an open-state update is requested | `open: boolean` |
| `open-change` | Emitted when an open-state update is requested | `open: boolean` |
| `click` | Emitted when the primary button is clicked | `event: Event` |
| `select` | Emitted when a menu option is selected | `value, option, event` |

### SplitButton Slots

| Slot | Description | Prop |
| --------- | ---------------- | --------------- |
| `default` | Primary button content | `-` |
| `icon` | Menu trigger button icon | `open: boolean` |
| `content` | Menu content | `-` |

### Asynchronous actions and click semantics

`click` is a notification event. The component does not process listener return values or automatically change its loading state. Business code controls `button-props.loading`; for asynchronous operations, reset it in `finally`. Disabled or loading links have no effective `href`.

```html
<script setup>
import { ref } from 'vue'
const publishing = ref(false)
const publish = async () => {
  if (publishing.value) return
  publishing.value = true
  try { await new Promise((resolve) => setTimeout(resolve, 800)) }
  finally { publishing.value = false }
}
</script>

<template>
  <mp-split-button :button-props="{ loading: publishing }" @click="publish">
    Publish
    <template #content><mp-menu-option label="Save draft" /></template>
  </mp-split-button>
</template>
```

`click` is an ordinary Emits notification. The main button bubbles normally without opening the menu. Overall disabled takes precedence over both buttons' disabled configuration.

### SplitButton Methods

| Method | Description |
| -------- | -------------------------- |
| open() | Request menu opening; disabled prevents opening |
| close() | Request menu closing |
| resize() | Recalculate menu position |

Controlled open requests updates only; callers update the binding. offset-x/offset-y use screen X/Y axes; numbers are px and length strings use existing conversion tools.

## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page. The appearance of composed controls follows the public variables of `button`, `menu`; a shared variable can affect other controls in the same DOM subtree.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
