<!-- Source: src/action-sheet/docs/en-US.md; locale: en-US; page: /en-US/action-sheet -->

# ActionSheet

## Examples

### Intro

An action sheet pops up to give the user the ability to select options.
`ActionSheet` Functional and component use methods are provided, and there is no essential difference between the two effects and parameters.
The function returns a `Promise`, on selection return `action`. Click modal close to return `close`.

### Function Call

Example source: src/action-sheet/example/demos/function-call.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { ActionSheet, Message } from '@maple-design/ui'

const rawActions = [
  {
    name: 'Item 01',
    icon: 'user-circle-fill',
  },
  {
    name: 'Item 02',
    icon: 'notebook',
  },
  {
    name: 'Item 03',
    icon: 'wifi',
  },
]
const rawDisabledActions = [
  {
    name: 'Item 01',
    icon: 'user-circle-fill',
  },
  {
    name: 'Item 02',
    icon: 'notebook',
  },
  {
    name: 'Item 03',
    icon: 'wifi',
    disabled: true,
  },
]
const rawCustomStyleActions = [
  {
    name: 'Item 01',
    icon: 'user-circle-fill',
    color: 'var(--mp-color-success)',
  },
  {
    name: 'Item 02',
    icon: 'notebook',
    color: 'var(--mp-color-warning)',
  },
  {
    name: 'Item 03',
    icon: 'wifi',
    color: 'var(--mp-color-info)',
  },
]
const actions = reactive(rawActions)
async function createBasic() {
  const action = await ActionSheet({ actions: rawActions })

  action !== 'close' && Message(`${'您选择的是:'}${action.name}`)
}
async function modifyTitle() {
  const action = await ActionSheet({
    actions: rawActions,
    title: '选择一个你喜欢的吧',
  })
  action !== 'close' && Message(`${'您选择的是:'}${action.name}`)
}
async function disableAction() {
  const action = await ActionSheet({
    actions: rawDisabledActions,
  })

  action !== 'close' && Message(`${'您选择的是:'}${action.name}`)
}
async function customActionStyles() {
  const action = await ActionSheet({
    actions: rawCustomStyleActions,
  })

  action !== 'close' && Message(`${'您选择的是:'}${action.name}`)
}
function disableCloseOnClickAction() {
  ActionSheet({
    actions: [
      {
        name: 'Item 01',
        icon: 'user-circle-fill',
      },
      {
        name: 'Item 02',
        icon: 'notebook',
      },
      {
        name: 'Item 03',
        icon: 'wifi',
      },
    ],
    closeOnClickAction: false,
    onSelect: (action) => Message(`${'您选择的是:'}${action.name}`),
  })
}
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="primary" block @click="createBasic">基本使用</mp-button>
    <mp-button status="primary" block @click="modifyTitle">修改标题</mp-button>
    <mp-button status="primary" block @click="disableAction">禁用选项</mp-button>
    <mp-button status="primary" block @click="disableCloseOnClickAction">禁用点击选项时关闭动作面板 </mp-button>
    <mp-button status="primary" block @click="customActionStyles">自定义选项样式</mp-button>
  </mp-space>
</template>
```

### Component Call

Example source: src/action-sheet/example/demos/component-call.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { ActionSheet, Message } from '@maple-design/ui'

const rawActions = [
  {
    name: 'Item 01',
    icon: 'user-circle-fill',
  },
  {
    name: 'Item 02',
    icon: 'notebook',
  },
  {
    name: 'Item 03',
    icon: 'wifi',
  },
]
const rawDisabledActions = [
  {
    name: 'Item 01',
    icon: 'user-circle-fill',
  },
  {
    name: 'Item 02',
    icon: 'notebook',
  },
  {
    name: 'Item 03',
    icon: 'wifi',
    disabled: true,
  },
]
const rawCustomStyleActions = [
  {
    name: 'Item 01',
    icon: 'user-circle-fill',
    color: 'var(--mp-color-success)',
  },
  {
    name: 'Item 02',
    icon: 'notebook',
    color: 'var(--mp-color-warning)',
  },
  {
    name: 'Item 03',
    icon: 'wifi',
    color: 'var(--mp-color-info)',
  },
]
const actions = reactive(rawActions)
const disabledActions = reactive(rawDisabledActions)
const customStyleActions = reactive(rawCustomStyleActions)
const open = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
async function modifyTitle() {
  const action = await ActionSheet({
    actions: rawActions,
    title: '选择一个你喜欢的吧',
  })
  action !== 'close' && Message(`${'您选择的是:'}${action.name}`)
}
async function customActionStyles() {
  const action = await ActionSheet({
    actions: rawCustomStyleActions,
  })

  action !== 'close' && Message(`${'您选择的是:'}${action.name}`)
}
function disableCloseOnClickAction() {
  ActionSheet({
    actions: [
      {
        name: 'Item 01',
        icon: 'user-circle-fill',
      },
      {
        name: 'Item 02',
        icon: 'notebook',
      },
      {
        name: 'Item 03',
        icon: 'wifi',
      },
    ],
    closeOnClickAction: false,
    onSelect: (action) => Message(`${'您选择的是:'}${action.name}`),
  })
}
function handleSelect(action) {
  Message(`${'您选择的是:'}${action.name}`)
}
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="warning" block @click="open = true">基本使用</mp-button>
    <mp-button status="warning" block @click="show1 = true">修改标题</mp-button>
    <mp-button status="warning" block @click="show2 = true">禁用选项</mp-button>
    <mp-button status="warning" block @click="show3 = true">禁用点击选项时关闭动作面板</mp-button>
    <mp-button status="warning" block @click="show4 = true">自定义选项样式</mp-button>
  </mp-space>

  <mp-action-sheet v-model:open="open" :actions="actions" @select="handleSelect" />
  <mp-action-sheet v-model:open="show1" title="选择一个你喜欢的吧" :actions="actions" @select="handleSelect" />
  <mp-action-sheet v-model:open="show2" :actions="disabledActions" @select="handleSelect" />
  <mp-action-sheet v-model:open="show3" :close-on-click-action="false" :actions="actions" @select="handleSelect" />
  <mp-action-sheet v-model:open="show4" :actions="customStyleActions" @select="handleSelect" />
</template>
```

## Function Call

### Basic Usage

```html
<script setup>
  import { ActionSheet, Message } from '@maple-design/ui'

  async function createBasic() {
    const action = await ActionSheet({
      actions: [
        {
          name: 'Item 01',
          icon: 'user-circle-fill',
        },
        {
          name: 'Item 02',
          icon: 'notebook',
        },
        {
          name: 'Item 03',
          icon: 'wifi',
        },
      ],
    })

    action !== 'close' && Message(`Your selected is:${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="createBasic">Basic Use</mp-button>
</template>
```

### Modify Title

```html
<script setup>
  import { ActionSheet, Message } from '@maple-design/ui'

  async function handleSelect() {
    const action = await ActionSheet({
      actions: [
        {
          name: 'Item 01',
          icon: 'user-circle-fill',
        },
        {
          name: 'Item 02',
          icon: 'notebook',
        },
        {
          name: 'Item 03',
          icon: 'wifi',
        },
      ],
      title: 'Choose whichever you like',
    })

    action !== 'close' && Message(`Your selected is:${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">Modify Title</mp-button>
</template>
```

### Action Disabled

The option is passed `disabled` to leave the action in the disabled state.

```html
<script setup>
  import { ActionSheet, Message } from '@maple-design/ui'

  async function handleSelect() {
    const action = await ActionSheet({
      actions: [
        {
          name: 'Item 01',
          icon: 'user-circle-fill',
        },
        {
          name: 'Item 02',
          icon: 'notebook',
        },
        {
          name: 'Item 03',
          icon: 'wifi',
          disabled: true,
        },
      ],
    })

    action !== 'close' && Message(`Your selected is:${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">Action Disabled</mp-button>
</template>
```

### Disable Close On Click Action

Passing in `CloseOnClickAction` disallows the action of `ActionSheet` closing automatically when the option is selected. The user can select the action multiple times. Because `Promise` is only resolved once, it is recommended to use `onSelect` to listen for the action of the user.

```html
<script setup>
  import { ActionSheet, Message } from '@maple-design/ui'

  async function handleSelect() {
    await ActionSheet({
      actions: [
        {
          name: 'Item 01',
          icon: 'user-circle-fill',
        },
        {
          name: 'Item 02',
          icon: 'notebook',
        },
        {
          name: 'Item 03',
          icon: 'wifi',
        },
      ],
      closeOnClickAction: false,
      onSelect: (action) => Message(`Your selected is:${action.name}`),
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">Disable Close On Click Action</mp-button>
</template>
```

### Custom Action Styles

Options provide parameters to configure the style. See the `Action` data structure for options.

```html
<script setup>
  import { ActionSheet, Message } from '@maple-design/ui'

  async function handleSelect() {
    const action = await ActionSheet({
      actions: [
        {
          name: 'Item 01',
          icon: 'user-circle-fill',
          color: 'var(--color-success)',
        },
        {
          name: 'Item 02',
          icon: 'notebook',
          color: 'var(--color-warning)',
        },
        {
          name: 'Item 03',
          icon: 'wifi',
          color: 'var(--color-info)',
        },
      ],
    })

    action !== 'close' && Message(`Your selected is:${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">Custom Action Styles</mp-button>
</template>
```

## Component Call

### Basic Usage

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const show = ref(false)
  const actions = ref([
    {
      name: 'Item 01',
      icon: 'user-circle-fill',
    },
    {
      name: 'Item 02',
      icon: 'notebook',
    },
    {
      name: 'Item 03',
      icon: 'wifi',
    },
  ])

  function handleSelect(action) {
    Message(`Your selected is:${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Basic Usage</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### Modify Title

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const show = ref(false)
  const actions = ref([
    {
      name: 'Item 01',
      icon: 'user-circle-fill',
    },
    {
      name: 'Item 02',
      icon: 'notebook',
    },
    {
      name: 'Item 03',
      icon: 'wifi',
    },
  ])

  function handleSelect(action) {
    Message(`Your selected is:${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Modify Title</mp-button>
  <mp-action-sheet title="Choose whichever you like" :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### Action Disabled

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const show = ref(false)
  const actions = ref([
    {
      name: 'Item 01',
      icon: 'user-circle-fill',
    },
    {
      name: 'Item 02',
      icon: 'notebook',
    },
    {
      name: 'Item 03',
      icon: 'wifi',
      disabled: true,
    },
  ])

  function handleSelect(action) {
    Message(`Your selected is:${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Action Disabled</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### Disable Close On Click Action

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const show = ref(false)
  const actions = ref([
    {
      name: 'Item 01',
      icon: 'user-circle-fill',
    },
    {
      name: 'Item 02',
      icon: 'notebook',
    },
    {
      name: 'Item 03',
      icon: 'wifi',
    },
  ])

  function handleSelect(action) {
    Message(`Your selected is:${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Disable close on click action</mp-button>
  <mp-action-sheet :close-on-click-action="false" :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### Custom Action Styles

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const show = ref(false)
  const actions = ref([
    {
      name: 'Item 01',
      icon: 'user-circle-fill',
      color: 'var(--color-success)',
    },
    {
      name: 'Item 02',
      icon: 'notebook',
      color: 'var(--color-warning)',
    },
    {
      name: 'Item 03',
      icon: 'wifi',
      color: 'var(--color-info)',
    },
  ])

  function handleSelect(action) {
    Message(`Your selected is:${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Custom Action Styles</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

## API

Use `v-model:open` for the panel state; `defaultOpen` initializes uncontrolled opening once, without emitting an initialization update.

### Props

| Prop                    | Description                                                                                                    | Type                           | Default      |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------ |
| `v-model:open`          | Whether to display the action sheet                                                                            | _boolean_                      | `false`      |
| `actions`               | Action list                                                                                                    | _Actions_                      | `[]`         |
| `title`                 | Action sheet title                                                                                             | _string_                       | `Select One` |
| `overlay`               | Whether to display the overlay                                                                                 | _boolean_                      | `true`       |
| `overlay-class`         | Custom overlay class                                                                                           | _string_                       | `-`          |
| `overlay-style`         | Custom overlay style                                                                                           | _object_                       | `-`          |
| `lock-scroll`           | Whether to disable scrolling penetration, scrolling the Dialog when disabled will not cause the body to scroll | _boolean_                      | `true`       |
| `close-on-click-action` | Whether to close the actions sheet when clicking action                                                        | _boolean_                      | `true`       |
| `overlay-closable`      | Whether to click the overlay to close the action sheet                                                         | _boolean_                      | `true`       |
| `esc-to-close`          | Whether to support keyboard ESC to close the action sheet                                                      | _boolean_                      | `true`       |
| `safe-area`             | Whether to enable bottom safety zone adaptation                                                                | _boolean_                      | `false`      |
| `popup-container`        | The location of the action sheet to mount                                                                      | _TeleportProps['to'] \| false_ | `body`       |

### Events

| Event           | Description                                         | Arguments        |
| --------------- | --------------------------------------------------- | ---------------- |
| `select`        | Triggered when selecting an action sheet            | `action: Action` |
| `open`          | Triggered when opening an action sheet              | `-`              |
| `opened`        | Triggered when an action sheet open-animation ends  | `-`              |
| `close`         | Triggered when closing an action sheet              | `-`              |
| `closed`        | Triggered when an action sheet close-animation ends | `-`              |
| `click-overlay` | Triggered when clicking the overlay                 | `MouseEvent`     |
| `key-escape`    | Triggered when pressing ESC                         | `KeyboardEvent`  |

### Methods

| Method                            | Description                        | Arguments           | Return |
| --------------------------------- | ---------------------------------- | ------------------- | ------ |
| `ActionSheet`                     | Show action sheet                  | _options \| string_ | `-`    |
| `ActionSheet.close`               | Close action sheet                 | _-_                 | `-`    |
| `ActionSheet.setDefaultOptions`   | Set default option configuration   | _options_           | `-`    |
| `ActionSheet.resetDefaultOptions` | Reset default option configuration | _-_                 | `-`    |

### ActionSheet Options

#### Options passed in for a functional call

| Option               | Description                                                                                                          | Type                          | Default      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------ |
| `title`              | Action sheet title                                                                                                   | _string_                      | `Select One` |
| `overlay`            | Whether to display the overlay                                                                                       | _boolean_                     | `true`       |
| `overlayClass`       | Custom overlay class                                                                                                 | _string_                      | `-`          |
| `overlayStyle`       | Custom overlay style                                                                                                 | _object_                      | `-`          |
| `lockScroll`         | Whether to disable scrolling penetration, scrolling the action sheet when disabled will not cause the body to scroll | _boolean_                     | `true`       |
| `closeOnClickAction` | Whether to close the actions sheet when clicking action                                                              | _boolean_                     | `true`       |
| `overlayClosable`    | Whether to click the overlay to close the action sheet                                                               | _boolean_                     | `true`       |
| `escToClose`         | Whether to support keyboard ESC to close the action sheet                                                            | _boolean_                     | `true`       |
| `safe-area`          | Whether to enable bottom safety zone adaptation                                                                      | _boolean_                     | `false`      |
| `onOpen`             | Action sheet open callback                                                                                           | _() => void_                  | `-`          |
| `onOpened`           | Action sheet open-animation ends callback                                                                            | _() => void_                  | `-`          |
| `onClose`            | Action sheet close callback                                                                                          | _() => void_                  | `-`          |
| `onClosed`           | Action sheet close-animation ends callback                                                                           | _() => void_                  | `-`          |
| `onSelect`           | Action sheet click action callback                                                                                   | _(action: Action) => void_    | `-`          |
| `onClickOverlay`     | Click overlay callback                                                                                               | _(event: MouseEvent) => void_ | `-`          |
| `onKeyEscape`        | Triggered when click keyboard ESC                                                                                    | _() => void_                  | `-`          |

### ActionSheet Action

| Prop        | Description                         | Type      | Default |
| ----------- | ----------------------------------- | --------- | ------- |
| `name`      | Action name                         | _string_  | `-`     |
| `color`     | Action text color                   | _string_  | `-`     |
| `icon`      | Icon, support network image address | _string_  | `-`     |
| `iconSize`  | Icon size                           | _string_  | `-`     |
| `namespace` | Icon namespace                      | _string_  | `-`     |
| `className` | Class name                          | _string_  | `-`     |
| `disabled`  | Disable or not option               | _boolean_ | `false` |

### Slots

| Name      | Description        | SlotProps |
| --------- | ------------------ | --------- |
| `actions` | Action list        | `-`       |
| `title`   | Action sheet title | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                                    | Default                      |
| ------------------------------------------- | ---------------------------- |
| `--action-sheet-border-radius`              | `2px`                        |
| `--action-sheet-border-top`                 | `none`                       |
| `--action-sheet-background`                 | `#fff`                       |
| `--action-sheet-title-color`                | `#888`                       |
| `--action-sheet-title-padding`              | `10px 16px`                  |
| `--action-sheet-title-font-size`            | `14px`                       |
| `--action-sheet-action-item-height`         | `48px`                       |
| `--action-sheet-action-item-padding`        | `0px 18px`                   |
| `--action-sheet-action-item-color`          | `#333`                       |
| `--action-sheet-action-item-disabled-color` | `var(--color-text-disabled)` |
| `--action-sheet-icon-margin`                | `0 0 20px 0`                 |
| `--action-sheet-icon-size`                  | `24px`                       |

`swipe-to-close` defaults false and enables downward dragging from the default title. `swipe-threshold` defaults to 40 layout CSS px. Mark custom title handles with data-popup-swipe-handle; action content and header buttons do not initiate the gesture.
`before-close` forwards to Popup and guards overlay, Escape, route, swipe and model-driven closure after selecting an action. Errors emit `close-error(error, reason)`. The `select` event does not imply that closure was approved.

## Before hooks and callback compatibility

`beforeClose(reason, done)` is the only hook entry. No new closeGuard/confirmGuard/cancelGuard prop is introduced.

Return true/false or `Promise<boolean>`; an async function resolving void allows completion. For callbacks, call done() to allow or done(false) to reject. A synchronous void return waits for done(), so a callback may finish later. First completion wins if callbacks and returned values compete. Pending operations are deduplicated. Throws/rejections preserve the surface and restore temporary button state. The callable done also exposes signal/event for cancellation-aware tasks; Dialog/Drawer retain the original third refs argument. A cancelled or replaced hook cannot commit a late result.

A before hook that only logs synchronously must explicitly return true; synchronous undefined means callback completion is still pending. Old async callbacks that returned `Promise<void>` without calling done now complete on Promise resolution.

Popup reasons: overlay, escape, route, swipe, close, api, model. Rejected external open=false emits update:open(true). Removing a component cannot await its hook; await requestClose() before destroying it.
