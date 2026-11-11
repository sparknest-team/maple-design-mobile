<!-- Source: src/action-sheet/docs/en-US.md; locale: en-US; page: /en-US/action-sheet -->

# ActionSheet

### Intro

An action sheet pops up to give the user the ability to select options.
`ActionSheet` supports service and component calls. The service uses a separate application and mounts to body; the component uses its host application context and `popup-container`.
The function returns a `Promise`, on selection return `action`. Click modal close to return `close`.

## Basic examples

### Function Call

Example source: src/action-sheet/example/demos/function-call.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { ActionSheet, Message } from '@maple-design/ui-vue'

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

## Declarative usage and state

### Component Call

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `actions` | Action list | Component Call |
| `title` | Action sheet title | Component Call |
| `close-on-click-action` | Whether to close the actions sheet when clicking action | Component Call |
<!-- demo-config-notes:end -->


Example source: src/action-sheet/example/demos/component-call.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { ActionSheet, Message } from '@maple-design/ui-vue'

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

## Function calls

### Basic usage

```html
<script setup>
  import { ActionSheet, Message } from '@maple-design/ui-vue'

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

    action !== 'close' && Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="createBasic">Basic usage</mp-button>
</template>
```

### Custom title

```html
<script setup>
  import { ActionSheet, Message } from '@maple-design/ui-vue'

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
      title: 'Choose an option',
    })

    action !== 'close' && Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">Custom title</mp-button>
</template>
```

### Disabled options

Set `disabled` on options to disable them.

```html
<script setup>
  import { ActionSheet, Message } from '@maple-design/ui-vue'

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

    action !== 'close' && Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">Disabled options</mp-button>
</template>
```

### Keep actions open after selection

`closeOnClickAction` prevents `ActionSheet` from closing automatically on selection, allowing repeated choices.
Since a `Promise` resolves only once, use `onSelect` to observe repeated user choices.

```html
<script setup>
  import { ActionSheet, Message } from '@maple-design/ui-vue'

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
      onSelect: (action) => Message(`Selected: ${action.name}`),
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">Keep actions open</mp-button>
</template>
```

### Custom option styles

Options accept style configuration; see the Action data structure for all fields.

```html
<script setup>
  import { ActionSheet, Message } from '@maple-design/ui-vue'

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

    action !== 'close' && Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">Custom option styles</mp-button>
</template>
```

## Component calls

### Basic usage

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui-vue'

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
    Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Basic usage</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="show" @select="handleSelect" />
</template>
```

### Custom title

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui-vue'

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
    Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Custom title</mp-button>
  <mp-action-sheet title="Choose an option" :actions="actions" v-model:open="show" @select="handleSelect" />
</template>
```

### Disabled options

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui-vue'

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
    Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Disabled options</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="show" @select="handleSelect" />
</template>
```

### Keep actions open after selection

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui-vue'

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
    Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Keep actions open</mp-button>
  <mp-action-sheet :close-on-click-action="false" :actions="actions" v-model:open="show" @select="handleSelect" />
</template>
```

### Custom option styles

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui-vue'

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
    Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Custom option styles</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="show" @select="handleSelect" />
</template>
```

## Keyboard and dialog name

Default actions use native buttons; disabled actions cannot be focused or selected. The title or title slot names the dialog, unless an explicit `aria-label` or `aria-labelledby` overrides it. The visible cancel button requests closure through the close guard.

## Controlled state

When an action is selected, `close-on-click-action` requests an `open` update. A controlled parent that keeps `open=true` keeps the sheet `open`. Without `open`, `default-open` initializes internal state.

## Usage notes

### Closing from the title dropdown

`swipe-to-close` defaults to false. When enabled, the header can be dragged down to close; `swipe-threshold` defaults to 40 CSS px. Custom title slots use the surrounding header handle. Body options and header buttons do not initiate dragging. See Popup for gesture details.
`before-close` forwards to Popup. Overlay, Esc, route, dropdown and post-action `open` changes may be rejected asynchronously. Exceptions emit `close-error(error, reason)`. An action `select` event does not mean closing was approved.

## API

`open/defaultOpen` control current/initial uncontrolled panel visibility. Use `v-model:open` for two-way binding. defaultOpen is read once without initialization writeback.

### ActionSheet Props

| Prop | Description | Type | Default |
| ----------------------- | ------------------------------------------------------ | ------------------------------ | -------- |
| `v-model:open` | Controlled visibility | _boolean_ | `-` |
| `default-open` | Initial uncontrolled visibility | _boolean_ | `false` |
| `before-close` | Close guard | _PopupBeforeClose_ | `-` |
| `swipe-to-close` | Enable downward swipe in the header | _boolean_ | `false` |
| `swipe-threshold` | Downward close threshold (CSS px) | _number_ | `40` |
| `actions` | Action list | _Actions_ | `[]` |
| `title` | Action sheet title | _string_ | `请选择` |
| `overlay` | Show overlay | _boolean_ | `true` |
| `overlay-class` | Custom overlay class | _string_ | `-` |
| `overlay-style` | Custom overlay style | _object_ | `-` |
| `lock-scroll` | Whether to disable scrolling penetration, scrolling the Dialog when disabled will not cause the body to scroll | _boolean_ | `true` |
| `close-on-click-action` | Whether to close the actions sheet when clicking action | _boolean_ | `true` |
| `overlay-closable` | Whether to click the overlay to close the action sheet | _boolean_ | `true` |
| `esc-to-close` | Whether to support keyboard ESC to close the action sheet | _boolean_ | `true` |
| `safe-area` | Whether to adapt to the bottom, left and right safe areas | _boolean_ | `false` |
| `popup-container` | The location of the action sheet to mount | _TeleportProps['to'] \| false_ | `body` |

### ActionSheet Events

| Event | Description | Arguments |
| --------------- | -------------------------- | ---------------- |
| `update:open` | Request an update to visibility | `boolean` |
| `close-error` | Close guard error | `error: unknown, reason: PopupCloseReason` |
| `select` | Triggered when selecting an action sheet | `action: Action` |
| `open` | Triggered when opening an action sheet | `-` |
| `opened` | Triggered when an action sheet open-animation ends | `-` |
| `close` | Triggered when closing an action sheet | `-` |
| `closed` | Triggered when an action sheet close-animation ends | `-` |
| `click-overlay` | Triggered when clicking the overlay | `MouseEvent` |
| `key-escape` | Triggered when pressing ESC | `KeyboardEvent` |

### ActionSheet Methods

| Method | Description | Arguments | Returns |
| --------------------------------- | ------------------ | --------- | ------ |
| `ActionSheet` | Show action sheet | _options_ | `Promise<ActionSheetActions \| void>` |
| `ActionSheet.close` | Close action sheet | _-_ | `-` |
| `ActionSheet.setDefaultOptions` | Set default option configuration | _options_ | `-` |
| `ActionSheet.resetDefaultOptions` | Reset default option configuration | _-_ | `-` |

### FunctionCall Options

The service sets `open=true` after creation and forces body as its mount target; its `open` and `popupContainer` options do not control initial visibility or mount location.

| Prop | Description | Type | Default |
| -------------------- | ------------------------------------------------------ | ----------------------------- | -------- |
| `beforeClose` | Close guard | _PopupBeforeClose_ | `-` |
| `swipeToClose` | Enable downward swipe in the header | _boolean_ | `false` |
| `swipeThreshold` | Downward close threshold (CSS px) | _number_ | `40` |
| `onCloseError` | Close guard error notification | _(error: unknown, reason: PopupCloseReason) => void_ | `-` |
| `actions` | Action list | _Actions_ | `[]` |
| `title` | Action sheet title | _string_ | `请选择` |
| `overlay` | Show overlay | _boolean_ | `true` |
| `overlayClass` | Custom overlay class | _string_ | `-` |
| `overlayStyle` | Custom overlay style | _object_ | `-` |
| `lockScroll` | Whether to disable scrolling penetration, scrolling the Dialog when disabled will not cause the body to scroll | _boolean_ | `true` |
| `closeOnClickAction` | Whether to close the actions sheet when clicking action | _boolean_ | `true` |
| `overlayClosable` | Whether to click the overlay to close the action sheet | _boolean_ | `true` |
| `escToClose` | Whether to support keyboard ESC to close the action sheet | _boolean_ | `true` |
| `safeArea` | Whether to adapt to the bottom, left and right safe areas | _boolean_ | `false` |
| `onOpen` | Action sheet open callback | _() => void_ | `-` |
| `onOpened` | Action sheet open-animation ends callback | _() => void_ | `-` |
| `onClose` | Action sheet close callback | _() => void_ | `-` |
| `onClosed` | Action sheet close-animation ends callback | _() => void_ | `-` |
| `onSelect` | Action sheet click action callback | _(action: Action) => void_ | `-` |
| `onClickOverlay` | Click overlay callback | _(event: MouseEvent) => void_ | `-` |
| `onKeyEscape` | Triggered when click keyboard ESC | _(event: KeyboardEvent) => void_ | `-` |

### ActionSheet Action

| Prop | Description | Type | Default |
| ----------- | --------------------------- | --------- | ------- |
| `name` | Action name | _string_ | `-` |
| `color` | Action text color | _string_ | `-` |
| `icon` | Registered icon name | _string_ | `-` |
| `iconSize` | Icon size | _string \| number_ | `-` |
| `namespace` | Compatibility field; not used by current icon rendering | _string_ | `-` |
| `className` | Class name | _string_ | `-` |
| `disabled` | Disable or not option | _boolean_ | `false` |

### ActionSheet Slots

| Slot | Description | Prop |
| --------- | ------------ | ---- |
| `actions` | Action list | `-` |
| `title` | Action sheet title | `-` |

## Close guards

The guard signature is `beforeClose({ reason }, done, { signal, event })`.

Return true/false or `Promise<boolean>`; a normally resolved async void result allows closing. Call done() to allow or done(false) to reject; synchronous void waits for done. The first result wins. Pending requests are deduplicated; errors retain the sheet and restore temporary button state. The third context argument supplies `signal` and the optional original `event`. Closing, unmounting or replacing the hook invalidates stale results.

Synchronous logging-only hooks must explicitly return true; synchronous undefined means awaiting a callback. Earlier `Promise<void>` hooks without done now allow closing when their Promise resolves.

Popup reasons are overlay, escape, route, swipe, close, api and model. Rejecting an external open=false requests update:open(true). The component does not expose `requestClose()`; use an existing guarded close entry. Direct destruction does not wait for the hook.

Programmatic notification callbacks do not control task completion. Service selection/closing results settle independently of callback errors, and closing completion always releases the owned host. Exceptions still propagate through the caller or Vue error channel; returned Promises do not control loading or closing.
`ActionSheet.close()` requests closing and respects `beforeClose`. A veto retains the service owner so closing can be requested again. A new programmatic invocation replaces the previous singleton: it disposes the previous host and settles its result as `close`, without waiting for that `close` guard or synthesizing lifecycle notifications.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-action-sheet-action-item-color` | `#333` | `color` |
| `--mp-action-sheet-action-item-disabled-color` | `var(--mp-color-text-disabled)` | `color` |
| `--mp-action-sheet-action-item-height` | `48px` | `height`, `max-height` |
| `--mp-action-sheet-action-item-padding` | `0 18px` | `padding` |
| `--mp-action-sheet-background` | `#fff` | `background` |
| `--mp-action-sheet-border-radius` | `2px` | `border-radius` |
| `--mp-action-sheet-border-top` | `none` | `border-top` |
| `--mp-action-sheet-icon-margin` | `0 20px 0 0` | `margin` |
| `--mp-action-sheet-icon-size` | `24px` | `font-size`, `height`, `width` |
| `--mp-action-sheet-title-color` | `#888` | `color` |
| `--mp-action-sheet-title-font-size` | `14px` | `font-size` |
| `--mp-action-sheet-title-padding` | `10px 16px` | `padding` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-action-sheet-action-item-color: #333;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
