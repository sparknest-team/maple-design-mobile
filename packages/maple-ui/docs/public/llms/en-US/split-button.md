<!-- Source: src/split-button/docs/en-US.md; locale: en-US; page: /en-US/split-button -->

# SplitButton

Demo text follows the site language selector. Middle cards and the right-hand mobile collection load the same Vue source without activating a local locale dictionary.

Disabled segments reuse Button disabled colors and suppress interaction feedback. Disabling the entire group also removes its elevation; disabling only the menu button blocks menu opening and closes an uncontrolled open menu.

Both segments inherit the same variant, status and custom colors. The arrow uses the icon slot; its layout does not change the shared palette.

## Examples

### Introduction

Combines a primary action button with a menu of related actions. The main button performs the action and the trailing button opens the menu.

Examples use `Message.info(...)`, supported on both platforms. Selection closes the menu by default; only the repeated-selection example keeps it open while showing a Message. The outline / text arrow retains a transparent background.

### Basic usage

The main button publishes; the arrow opens related actions. Options have stable values and include a disabled action.

Example source: src/split-button/example/basic.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import { Message } from '@maple-design/ui'

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

### Variants

Compare default, outline, tonal and text variants.

Example source: src/split-button/example/variants.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import { Message } from '@maple-design/ui'

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
import { watchLang } from '@maple-design/cli/client'
import { Message } from '@maple-design/ui'

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

### Five sizes

All five sizes are supported: xs, sm, md (default), lg and xl. Examples wrap on narrow screens.

Example source: src/split-button/example/sizes.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import { Message } from '@maple-design/ui'

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
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space wrap align="center">
    <mp-split-button v-for="size in sizes" :key="size" :size="size" @click="publish" @select="handleSelect">
      {{ size }}

      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
```

### Custom icon

Rotate the same arrow icon on both platforms using the open slot parameter.

Example source: src/split-button/example/custom-icon.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import { Message } from '@maple-design/ui'

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

### Controlled menu

Use `@click.stop` on external controls so the opening click is not also treated as an outside click. Other outside clicks still close the menu.

Use v-model:open to synchronize external controls, the trigger and selection-driven closing.

Example source: src/split-button/example/controlled.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import { Message } from '@maple-design/ui'

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

### Popup and repeated selection

Use bottom-start, an 8px vertical offset and a 160px maximum height. With hide-on-select=false, repeated selections keep the menu open and display the latest value.

Example source: src/split-button/example/popup.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import { Message } from '@maple-design/ui'

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

### Appearance combinations

Use this example for a primary action and secondary menu. Adjust status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/split-button/example/demos/appearance-lab.vue

```vue
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import { Message } from '@maple-design/ui'
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
const appearance = reactive<{ status: SemanticStatus; size: ComponentSize }>({ status: 'default', size: 'md' })
</script>
<template>
  <mp-space direction="column" align="flex-start" :size="16">
    <mp-space wrap>
      <div>
        <span>status</span
        ><mp-select
          v-model="appearance['status']"
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
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="appearance['size']"
          :clearable="false"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-split-button placement="bottom-end" v-bind="appearance" @click="publish" @select="handleSelect">
      {{ english ? 'Publish' : '发布' }}

      <template #content>
        <mp-menu-option :label="english ? 'Save draft' : '保存草稿'" value="draft" />
        <mp-menu-option :label="english ? 'Save and publish' : '保存并发布'" value="publish" />
        <mp-menu-option :label="english ? 'Unavailable' : '暂无权限'" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
```

### Async action

Return a Promise directly from @click. Auto-loading waits and prevents repeated clicks; the counter shows completed operations.

Example source: src/split-button/example/async-action.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'
import { Message } from '@maple-design/ui'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const completed = ref(0)
const publish = async () => {
  await new Promise<void>((resolve) => setTimeout(resolve, 800))
  completed.value += 1
  Message.info(english.value ? 'Published' : '发布成功')
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button auto-loading @click="publish" @select="handleSelect">
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

## API

### Props

| Name                   | Description                                                            | Type                             | Default     |
| ---------------------- | ---------------------------------------------------------------------- | -------------------------------- | ----------- |
| `open`                 | Whether the menu is open. Supports `v-model:open`                      | _boolean_                        | `undefined` |
| `default-open`         | Whether the menu is open initially                                     | _boolean_                        | `false`     |
| `disabled`             | Whether the entire split button is disabled                            | _boolean_                        | `false`     |
| `status`               | Button group semantic status                                           | _SemanticStatus_                 | `default`   |
| `variant`              | Button group variant                                                   | _ButtonVariant_                  | `default`   |
| `size`                 | Button group size                                                      | _ComponentSize_                  | `md`        |
| `color`                | Custom background color                                                | _string_                         | `''`        |
| `text-color`           | Custom text color                                                      | _string_                         | `''`        |
| `elevation`            | Button group elevation                                                 | _boolean \| number_              | `true`      |
| `button-props`         | Props for the primary button                                           | `Partial<ButtonProps>`           | `undefined` |
| `trigger-button-props` | Props for the menu trigger button                                      | `Partial<ButtonProps>`           | `undefined` |
| `auto-loading`         | Automatically show loading while the primary action promise is pending | _boolean_                        | `false`     |
| `trigger`              | Menu trigger method                                                    | _TriggerEvent \| TriggerEvent[]_ | `click`     |
| `placement`            | Menu placement                                                         | _PopoverPlacement_               | `bottom`    |
| `popup-container`      | Menu mount container                                                   | _PopupContainer_                 | `body`      |
| `popup-max-height`     | Maximum menu height                                                    | _boolean \| number_              | `true`      |
| `popup-class`          | Menu popup class                                                       | _string \| array \| object_      | `undefined` |
| `offset-x`             | Horizontal menu offset                                                 | _string \| number_               | `0`         |
| `offset-y`             | Vertical menu offset                                                   | _string \| number_               | `0`         |
| `hide-on-select`       | Close the menu after selection                                         | _boolean_                        | `true`      |

### Events

| Event         | Description                                    | Parameters             |
| ------------- | ---------------------------------------------- | ---------------------- |
| `update:open` | Emitted when an open-state update is requested | `open: boolean`        |
| `open-change` | Emitted when the menu open state changes       | `open: boolean`        |
| `click`       | Emitted when the primary button is clicked     | `event: Event`         |
| `select`      | Emitted when a menu option is selected         | `value, option, event` |

### Slots

| Name      | Description              | Parameters      |
| --------- | ------------------------ | --------------- |
| `default` | Primary button content   | `-`             |
| `icon`    | Menu trigger button icon | `open: boolean` |
| `content` | Menu content             | `-`             |

### Async action and methods

With `auto-loading`, return a Promise from `@click`. Both `@click` and `button-props.onClick` run once; the primary button waits for all returned Promises to settle. Synchronous callbacks do not flash a loading state. Like Button, click is an onClick callback prop that consumes return values, not a second emitted notification. Primary clicks bubble normally and never open the menu. Overall disabled takes priority over either button configuration.

Expose: `open()` requests opening (unless disabled), `close()` requests closing, and `resize()` recalculates popup positioning. A controlled open value must be updated by its owner. `offset-x` / `offset-y` are screen-axis offsets; numbers use pixels and length strings use the existing length conversion utility.

The two libraries maintain independent copies of the implementation, Props, style imports and contract tests, with local Menu adapters and no shared runtime or instances.
