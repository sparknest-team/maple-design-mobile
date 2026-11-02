# ActionSheet

### Intro

An action sheet pops up to give the user the ability to select options.
`ActionSheet` Functional and component use methods are provided, and there is no essential difference between the two effects and parameters.
The function returns a `Promise`, on selection return `action`. Click modal close to return `close`.

## Basic examples

### Function Call

```demo
../example/demos/function-call.vue
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


```demo
../example/demos/component-call.vue
```

## Function calls

### Basic usage

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
    Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Basic usage</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### Custom title

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
    Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Custom title</mp-button>
  <mp-action-sheet title="Choose an option" :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### Disabled options

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
    Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Disabled options</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### Keep actions open after selection

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
    Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Keep actions open</mp-button>
  <mp-action-sheet :close-on-click-action="false" :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### Custom option styles

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
    Message(`Selected: ${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">Custom option styles</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

## API

`open/defaultOpen` control current/initial uncontrolled panel visibility. Use `v-model:open` for two-way binding. defaultOpen is read once without initialization writeback.

### Props

| Arguments | Description | Type | Default |
| ----------------------- | ------------------------------------------------------ | ------------------------------ | -------- |
| `v-model:open` | Whether to display the action sheet | _boolean_ | `false` |
| `actions` | Action list | _Actions_ | `[]` |
| `title` | Action sheet title | _string_ | `请选择` |
| `overlay` | Show overlay | _boolean_ | `true` |
| `overlay-class` | Custom overlay class | _string_ | `-` |
| `overlay-style` | Custom overlay style | _object_ | `-` |
| `lock-scroll` | Whether to disable scrolling penetration, scrolling the Dialog when disabled will not cause the body to scroll | _boolean_ | `true` |
| `close-on-click-action` | Whether to close the actions sheet when clicking action | _boolean_ | `true` |
| `overlay-closable` | Whether to click the overlay to close the action sheet | _boolean_ | `true` |
| `esc-to-close` | Whether to support keyboard ESC to close the action sheet | _boolean_ | `true` |
| `safe-area` | Whether to enable bottom safety zone adaptation | _boolean_ | `false` |
| `popup-container` | The location of the action sheet to mount | _TeleportProps['to'] \| false_ | `body` |

### Events

| Event | Description | Arguments |
| --------------- | -------------------------- | ---------------- |
| `select` | Triggered when selecting an action sheet | `action: Action` |
| `open` | Triggered when opening an action sheet | `-` |
| `opened` | Triggered when an action sheet open-animation ends | `-` |
| `close` | Triggered when closing an action sheet | `-` |
| `closed` | Triggered when an action sheet close-animation ends | `-` |
| `click-overlay` | Triggered when clicking the overlay | `MouseEvent` |
| `key-escape` | Triggered when pressing ESC | `KeyboardEvent` |

### Methods

| Method | Description | Arguments | Returns |
| --------------------------------- | ------------------ | --------- | ------ |
| `ActionSheet` | Show action sheet | _options_ | `-` |
| `ActionSheet.close` | Close action sheet | _-_ | `-` |
| `ActionSheet.setDefaultOptions` | Set default option configuration | _options_ | `-` |
| `ActionSheet.resetDefaultOptions` | Reset default option configuration | _-_ | `-` |

### ActionSheet Options

#### Function-call options

| Arguments | Description | Type | Default |
| -------------------- | ------------------------------------------------------ | ----------------------------- | -------- |
| `actions` | Action list | _Actions_ | `[]` |
| `title` | Action sheet title | _string_ | `请选择` |
| `overlay` | Show overlay | _boolean_ | `true` |
| `overlayClass` | Custom overlay class | _string_ | `-` |
| `overlayStyle` | Custom overlay style | _object_ | `-` |
| `lockScroll` | Whether to disable scrolling penetration, scrolling the Dialog when disabled will not cause the body to scroll | _boolean_ | `true` |
| `closeOnClickAction` | Whether to close the actions sheet when clicking action | _boolean_ | `true` |
| `overlayClosable` | Whether to click the overlay to close the action sheet | _boolean_ | `true` |
| `escToClose` | Whether to support keyboard ESC to close the action sheet | _boolean_ | `true` |
| `safe-area` | Whether to enable bottom safety zone adaptation | _boolean_ | `false` |
| `onOpen` | Action sheet open callback | _() => void_ | `-` |
| `onOpened` | Action sheet open-animation ends callback | _() => void_ | `-` |
| `onClose` | Action sheet close callback | _() => void_ | `-` |
| `onClosed` | Action sheet close-animation ends callback | _() => void_ | `-` |
| `onSelect` | Action sheet click action callback | _(action: Action) => void_ | `-` |
| `onClickOverlay` | Click overlay callback | _(event: MouseEvent) => void_ | `-` |
| `onKeyEscape` | Triggered when click keyboard ESC | _() => void_ | `-` |

### ActionSheet Action

| Arguments | Description | Type | Default |
| ----------- | --------------------------- | --------- | ------- |
| `name` | Action name | _string_ | `-` |
| `color` | Action text color | _string_ | `-` |
| `icon` | Icon, support network image address | _string_ | `-` |
| `iconSize` | Icon size | _string_ | `-` |
| `namespace` | Icon namespace | _string_ | `-` |
| `className` | Class name | _string_ | `-` |
| `disabled` | Disable or not option | _boolean_ | `false` |

### Slots

| Slot | Description | Arguments |
| --------- | ------------ | ---- |
| `actions` | Action list | `-` |
| `title` | Action sheet title | `-` |

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| ------------------------------------------- | ---------------------------- |
| `--action-sheet-border-radius` | `2px` |
| `--action-sheet-border-top` | `none` |
| `--action-sheet-background` | `#fff` |
| `--action-sheet-title-color` | `#888` |
| `--action-sheet-title-padding` | `10px 16px` |
| `--action-sheet-title-font-size` | `14px` |
| `--action-sheet-action-item-height` | `48px` |
| `--action-sheet-action-item-padding` | `0px 18px` |
| `--action-sheet-action-item-color` | `#333` |
| `--action-sheet-action-item-disabled-color` | `var(--color-text-disabled)` |
| `--action-sheet-icon-margin` | `0 0 20px 0` |
| `--action-sheet-icon-size` | `24px` |

### Closing from the title dropdown

For bottom placement, opt in with `swipe-to-close` and mark a noninteractive header with `data-popup-swipe-handle`. `swipe-threshold` defaults to 40 layout CSS px and accounts for ancestor scaling. A sufficient downward gesture requests update:open(false) and emits swipe-close(PointerEvent). Short/upward/horizontal gestures, pointer cancellation, body scrolling and interactive header controls do not dismiss. Controlled refusal keeps the sheet open. Field editors opt in and cancel unconfirmed drafts; pending confirmation disables dismissal. ActionSheet forwards both props; custom title slots must mark their handle.
`before-close` forwards to Popup. Overlay, Esc, route, dropdown and post-action `open` changes may be rejected asynchronously. Exceptions emit `close-error(error, reason)`. An action `select` event does not mean closing was approved.

## before hooks and done compatibility

`beforeClose(reason, done)` is the common entry; no alternate naming is added.

Return true/false or `Promise<boolean>`. A normally completed async function returning void allows closing. Callback style uses done() to allow or done(false) to reject. Synchronous void waits for done, which may be asynchronous. If both return values and done are used, first completion wins. Pending requests deduplicate; exceptions retain the popup and restore temporary button state. done also carries signal/event. Dialog/Drawer retain their original third refs argument. Closing, unmounting or replacing hooks invalidates stale results.

Synchronous logging-only hooks must explicitly return true; synchronous undefined means awaiting a callback. Earlier `Promise<void>` hooks without done now allow closing when their Promise resolves.

Popup reasons: overlay, escape, route, swipe, close, api, model. Rejecting external open=false requests update:open(true). Direct destruction cannot await hooks; await requestClose() first.

Service notification callbacks do not control task completion. The selected/closed result is settled independently of callback errors, and closing completion always releases the owned host. Callback errors still propagate through the calling/Vue error path; returned Promises do not control loading or closing.
`ActionSheet.close()` requests closing and respects `beforeClose`; a veto retains the service owner so closing can be requested again. A new function invocation replaces the previous singleton: it disposes the previous host and settles its result as `close`, without waiting for its close guard or synthesizing lifecycle notifications.
