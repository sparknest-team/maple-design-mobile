# SplitButton

### Introduction

Combines a primary action button with a menu of related actions. The main button performs the action and the trailing button opens the menu.

Examples use `Message.info(...)`, supported on both platforms. Selection closes the menu by default; only the repeated-selection example keeps it open while showing a Message. The outline / text arrow retains a transparent background.

### Basic usage

The main button publishes; the arrow opens related actions. Options have stable values and include a disabled action.

```html
<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: 'Published successfully',
  publish: 'Publish',
  saveNow: 'Save draft',
  saveAndPublish: 'Save and publish',
  unavailable: 'No permission',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-split-button status="primary" placement="bottom-end" @click="publish" @select="handleSelect">
    {{ t('publish') }}

    <template #content>
      <mp-menu-option :label="t('saveNow')" value="draft" />
      <mp-menu-option :label="t('saveAndPublish')" value="publish" />
      <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
    </template>
  </mp-split-button>
</template>
```

### Variants

Compare default, outline, tonal and text variants.

```html
<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: 'Published successfully',
  saveNow: 'Save draft',
  saveAndPublish: 'Save and publish',
  unavailable: 'No permission',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
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
      status="primary"
      @click="publish"
      @select="handleSelect"
    >
      {{ variant }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
```

### Five sizes

All five sizes are supported: xs, sm, md (default), lg and xl. Examples wrap on narrow screens.

```html
<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: 'Published successfully',
  saveNow: 'Save draft',
  saveAndPublish: 'Save and publish',
  unavailable: 'No permission',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>

<template>
  <mp-space wrap align="center">
    <mp-split-button
      v-for="size in sizes"
      :key="size"
      :size="size"
      status="primary"
      @click="publish"
      @select="handleSelect"
    >
      {{ size }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
```

### Disabled states

Compare disabling the whole group, only the main button and only the menu button. Overall disabled cannot be overridden by disabled: false on either child.

```html
<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: 'Published successfully',
  allDisabled: 'All disabled',
  saveNow: 'Save draft',
  saveAndPublish: 'Save and publish',
  unavailable: 'No permission',
  mainDisabled: 'Main disabled',
  triggerDisabled: 'Menu disabled',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space wrap>
    <mp-split-button
      disabled
      status="primary"
      :button-props="{ disabled: false }"
      :trigger-button-props="{ disabled: false }"
      @click="publish"
      @select="handleSelect"
    >
      {{ t('allDisabled') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button status="primary" :button-props="{ disabled: true }" @click="publish" @select="handleSelect">
      {{ t('mainDisabled') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <mp-split-button
      status="primary"
      :trigger-button-props="{ disabled: true }"
      @click="publish"
      @select="handleSelect"
    >
      {{ t('triggerDisabled') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
  </mp-space>
</template>
```

### Async action

Return a Promise directly from @click. Auto-loading waits and prevents repeated clicks; the counter shows completed operations.

```html
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: 'Published successfully',
  publish: 'Publish',
  saveNow: 'Save draft',
  saveAndPublish: 'Save and publish',
  unavailable: 'No permission',
  completed: 'Completed',
} as const
const t = (key: keyof typeof messages) => messages[key]

const completed = ref(0)
const publish = async () => {
  await new Promise<void>((resolve) => setTimeout(resolve, 800))
  completed.value += 1
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button status="primary" auto-loading @click="publish" @select="handleSelect">
      {{ t('publish') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ t('completed') }}: {{ completed }}</span>
  </mp-space>
</template>
```

### Custom icon

Rotate the same arrow icon on both platforms using the open slot parameter.

```html
<script setup lang="ts">
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: 'Published successfully',
  publish: 'Publish',
  saveNow: 'Save draft',
  saveAndPublish: 'Save and publish',
  unavailable: 'No permission',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
</script>

<template>
  <mp-split-button status="primary" @click="publish" @select="handleSelect">
    {{ t('publish') }}
    <template #icon="{ open }">
      <m-icon-menu-down :style="{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s' }" />
    </template>
    <template #content>
      <mp-menu-option :label="t('saveNow')" value="draft" />
      <mp-menu-option :label="t('saveAndPublish')" value="publish" />
      <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
    </template>
  </mp-split-button>
</template>
```

### Controlled menu

Use `@click.stop` on external controls so the opening click is not also treated as an outside click. Other outside clicks still close the menu.

Use v-model:open to synchronize external controls, the trigger and selection-driven closing.

```html
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'
const messages = {
  published: 'Published successfully',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  publish: 'Publish',
  saveNow: 'Save draft',
  saveAndPublish: 'Save and publish',
  unavailable: 'No permission',
  opened: 'Open',
  closed: 'Closed',
} as const
const t = (key: keyof typeof messages) => messages[key]

const publish = () => {
  Message.info(t('published'))
}
const handleSelect = (_value: unknown, option: { label?: unknown }) => {
  Message.info(String(option.label))
}
const open = ref(false)
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-space wrap>
      <mp-button @click.stop="open = true">{{ t('openMenu') }}</mp-button>
      <mp-button @click.stop="open = false">{{ t('closeMenu') }}</mp-button>
    </mp-space>
    <mp-split-button v-model:open="open" status="primary" @click="publish" @select="handleSelect">
      {{ t('publish') }}

      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ open ? t('opened') : t('closed') }}</span>
  </mp-space>
</template>
```

### Popup and repeated selection

Use bottom-start, an 8px vertical offset and a 160px maximum height. With hide-on-select=false, repeated selections keep the menu open and display the latest value.

```html
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'
const messages = {
  choose: 'Choose action',
  saveNow: 'Save draft',
  saveAndPublish: 'Save and publish',
  unavailable: 'No permission',
  lastAction: 'Last action',
  none: 'No action yet',
  popupHint: 'The menu stays open after selection. Click outside to close.',
} as const
const t = (key: keyof typeof messages) => messages[key]

const lastAction = ref('')
const handleSelect = (value: unknown, option: { label?: unknown }) => {
  lastAction.value = String(value)
  Message.info(String(option.label))
}
</script>

<template>
  <mp-space direction="column" align="flex-start">
    <mp-split-button
      status="primary"
      placement="bottom-start"
      :offset-y="8"
      :popup-max-height="160"
      :hide-on-select="false"
      @click="lastAction = 'publish'"
      @select="handleSelect"
    >
      {{ t('choose') }}
      <template #content>
        <mp-menu-option :label="t('saveNow')" value="draft" />
        <mp-menu-option :label="t('saveAndPublish')" value="publish" />
        <mp-menu-option :label="t('unavailable')" value="restricted" disabled />
      </template>
    </mp-split-button>
    <span aria-live="polite">{{ t('lastAction') }}: {{ lastAction || t('none') }}</span>
    <span>{{ t('popupHint') }}</span>
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
