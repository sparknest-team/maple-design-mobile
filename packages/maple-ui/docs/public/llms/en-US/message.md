<!-- Source: src/message/docs/en-US.md; locale: en-US; page: /en-US/message -->

# Message

Display duration is a business deadline, not CSS enter/leave time. Zero is persistent; only finite positive values schedule auto-close. Hover preserves remaining time; KeepAlive activation restarts the full configured deadline, while suspension/disposal invalidate old timers. The2026-10-15 reconciliation confirms the existing audited source hash and adds business-clock classification only. Current39 tests do not add native-browser acceptance or certify service nextTick update identity/cross-document adoption.

## 案例

### Description

Message provides lightweight, non-modal global feedback. Maple and Cedar share the same public contract, queue, timer, and imperative service while keeping separate source copies and platform-specific styling. Message never locks scrolling or blocks background interaction.

### Function Calls

Example source: src/message/example/demos/function-call.vue

```vue
<script setup>
import { h, onBeforeUnmount, resolveComponent } from 'vue'
import { Message } from '@maple-design/ui'

function createMessage(type) {
  if (type === 'time') {
    Message({
      content: '这是一条消息提示',
      duration: 1000,
    })
  }

  if (type === 'position') {
    Message({
      content: '这是一条消息提示',
      position: 'bottom',
    })
  }

  if (type === 'icon') {
    Message.info({
      content: '这是一条消息提示',
      icon: () => h(resolveComponent('MIconHeart'), { style: { paddingRight: '12px' } }),
    })
  }

  if (type === 'action') {
    const customMessage = Message({
      content: 'Hello, Maple',
      action: () =>
        h(
          resolveComponent('MpButton'),
          { size: 'sm', status: 'primary', onClick: () => customMessage.close() },
          { default: () => '关闭' },
        ),
    })
  }

  if (type === 'closable') {
    Message({
      content: '这是一条消息提示',
      closable: true,
      duration: 0,
    })
  }

  if (type === 'update') {
    Message.info({
      id: 'demo-update',
      content: '更新中...',
      duration: 0,
      resetOnUpdate: true,
    })

    setTimeout(() => {
      Message.success({
        id: 'demo-update',
        content: '更新完成',
        duration: 2000,
        resetOnUpdate: true,
      })
    }, 1000)
  }

  if (type === 'loading') {
    const message = Message.loading('等待中...')
    setTimeout(() => {
      message.close()
      Message.success('加载成功')
    }, 2000)
  }

  if (!type) {
    Message('这是一条消息提示')
  }
}
function openMultiple() {
  const message1 = Message('Message 1')
  Message.success('Message 2')
  Message.warning('Message 3')

  setTimeout(() => {
    message1.close()
  }, 1000)
}
onBeforeUnmount(() => {
  Message.clear()
})
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="warning" block @click="createMessage()">基本使用</mp-button>
    <mp-button status="warning" block @click="createMessage('icon')">自定义图标</mp-button>
    <mp-button status="warning" block @click="createMessage('position')">位置</mp-button>
    <mp-button status="warning" block @click="createMessage('time')">显示时长</mp-button>
    <mp-button status="warning" block @click="createMessage('closable')">可关闭</mp-button>
    <mp-button status="warning" block @click="createMessage('update')">更新内容</mp-button>
    <mp-button status="warning" block @click="createMessage('loading')">Loading 常驻</mp-button>
    <mp-button status="warning" block @click="openMultiple">多实例</mp-button>
    <mp-button status="warning" block @click="createMessage('action')">自定义操作</mp-button>
  </mp-space>
</template>
```

### Statuses

The standard statuses are `default / info / success / warning / danger / loading`. The convenience method is named `error`, while the component receives `status="danger"`. Call `Message(...)` for a default message; there is no `normal` alias.

Example source: src/message/example/demos/type.vue

```vue
<script setup>
import { onBeforeUnmount } from 'vue'
import { Message } from '@maple-design/ui'

function create(type) {
  const text = type === 'loading' ? '等待中...' : '这是一条消息提示'
  const message = Message[type](text)

  if (type === 'loading') {
    setTimeout(() => {
      message.close()
      Message.success('加载成功')
    }, 2000)
  }
}
onBeforeUnmount(() => {
  Message.clear()
})
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="success" block @click="create('success')">成功</mp-button>
    <mp-button status="warning" block @click="create('warning')">警告</mp-button>
    <mp-button status="info" block @click="create('info')">信息</mp-button>
    <mp-button status="danger" block @click="create('error')">错误</mp-button>
    <mp-button status="primary" block @click="create('loading')">加载</mp-button>
    <mp-button status="default" block @click="Message('普通提示')">普通</mp-button>
  </mp-space>
</template>
```

### Component Usage

Example source: src/message/example/demos/component-call.vue

```vue
<script setup>
import { reactive, toRefs } from 'vue'

const shows = reactive({
  show1: false,
  show2: false,
  show3: false,
  show4: false,
  show5: false,
  showCenter: false,
  showClosable: false,
})
const { show1, show2, show3, show4, show5, showCenter, showClosable } = toRefs(shows)
function changeValue(type) {
  shows[type] = !shows[type]
}
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="primary" block @click="changeValue('show1')">基本使用</mp-button>
    <mp-button status="primary" block @click="changeValue('show3')">操作区</mp-button>
    <mp-button status="primary" block @click="changeValue('show2')">底部显示</mp-button>
    <mp-button status="primary" block @click="changeValue('show4')">显示时长</mp-button>
    <mp-button status="primary" block @click="changeValue('show5')">自定义图标</mp-button>
    <mp-button status="primary" block @click="changeValue('showCenter')">居中显示</mp-button>
    <mp-button status="primary" block @click="changeValue('showClosable')">可关闭</mp-button>
  </mp-space>

  <div class="message-demo">
    <mp-message v-model:open="show1"> 这是一条消息提示 </mp-message>

    <mp-message v-model:open="show2" position="bottom">
      这是一条消息提示
      <template #action>
        <mp-button status="primary" :elevation="false" size="sm" @click="show2 = false">关闭</mp-button>
      </template>
    </mp-message>

    <mp-message v-model:open="show3" :duration="0">
      这是一条消息提示
      <template #action>
        <mp-button status="primary" :elevation="false" size="sm" @click="show3 = false">关闭</mp-button>
      </template>
    </mp-message>

    <mp-message v-model:open="show4" :duration="1000"> 这条提示会在一秒后关闭 </mp-message>

    <mp-message v-model:open="show5">
      这是一条消息提示
      <template #icon>
        <m-icon-heart />
      </template>
    </mp-message>

    <mp-message v-model:open="showCenter" position="center" :duration="0" closable> 居中提示 </mp-message>

    <mp-message v-model:open="showClosable" closable :duration="0" status="info"> 这是一条消息提示 </mp-message>
  </div>
</template>
```

## Behavior

- `duration` is measured in milliseconds; `0` disables auto-close and `Message.loading(...)` defaults to `0`.
- The same `id` updates one instance within the same container and position.
- An update restarts the full duration only when `resetOnUpdate` is `true`.
- `pauseOnHover` preserves the remaining duration and resumes from it.
- Display deadlines are independent of CSS motion. Restart, hover pause, clear and unmount invalidate stale timer callbacks; execution rechecks open.
- KeepAlive deactivation cancels timers; reactivation starts the full current duration. Inactive updates and restart after unmount cannot schedule work.
- Resuming an exhausted positive hover deadline requests close; an explicit reset to zero remains persistent. Only finite positive durations schedule auto-close.
- Service disposal waits for real leaving completion, not forced 150ms/200ms waits. Close/clear before mount disposes directly and reports onClosed without inventing component open/opened/close animation events. Business duration remains separate from CSS transition duration.
- Four real IAB default/light/top service cases pass: default, 600ms, zero and reopen while leaving. Reopen may replace the root DOM. Other themes/positions, hover, KeepAlive and real OS preference still need separate acceptance.
- Local reduced-motion styles disable transitions/displacement but retain standalone horizontal/center positioning, colors and display deadlines. Isolated Less checks do not prove real OS switching.
- Queues are isolated by `popupContainer + position`.

## Visual variants

Visual emphasis is independent of status: neutral uses an overlay surface and status icon; tonal uses a subtle status background; solid uses a strong status fill and paired foreground. Cedar and Maple both default to neutral. Explicit solid / tonal variants share the same color contract. Solid default/loading retain a dark surface. MessageVariant is exported; imperative calls, default options and same-id updates accept variant.

Example source: src/message/example/demos/variant.vue

```vue
<script setup lang="ts">
import { Message } from '@maple-design/ui'

const variants = ['neutral', 'tonal', 'solid'] as const
</script>

<template>
  <mp-space wrap>
    <mp-button @click="Message.success({ content: 'neutral (default)', closable: true })">neutral (default)</mp-button>
    <mp-button
      v-for="variant in variants"
      :key="variant"
      @click="Message.success({ content: variant, variant, closable: true })"
      >{{ variant }}</mp-button
    >
  </mp-space>
</template>
```

### Appearance combinations

Use this example for immediate feedback after an action. Adjust variant, status and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/message/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, reactive, toRefs } from 'vue'

const shows = reactive({
  show1: false,
  show2: false,
  show3: false,
  show4: false,
  show5: false,
  showCenter: false,
  showClosable: false,
})
const { show1, show2, show3, show4, show5, showCenter, showClosable } = toRefs(shows)
const __demoAppearance = __demoReactive({ variant: 'neutral', status: 'default' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'neutral', value: 'neutral' },
            { label: 'tonal', value: 'tonal' },
            { label: 'solid', value: 'solid' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>status</span
        ><mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
            { label: 'loading', value: 'loading' },
          ]"
          aria-label="status"
        />
      </div>
    </mp-space>
    <mp-message v-model:open="show1" v-bind="__demoAppearance"> 这是一条消息提示 </mp-message>
  </mp-space>
</template>
```

## API

### Props / MessageOptions

| Prop                          | Description                         | Type                                                         | Default         |
| ----------------------------- | ----------------------------------- | ------------------------------------------------------------ | --------------- |
| `open` / `v-model:open`       | Controlled visibility               | `boolean`                                                    | `false`         |
| `id`                          | Unique id in one queue              | `string \| number`                                           | generated       |
| `status`                      | Semantic status                     | `default \| info \| success \| warning \| danger \| loading` | `default`       |
| variant | Visual emphasis | `neutral \| tonal \| solid` | `neutral` |
| `position`                    | Placement                           | `top \| center \| bottom`                                    | `top`           |
| `content` / `icon` / `action` | Renderable content                  | `MessageContent`                                             | -               |
| `duration`                    | Auto-close duration in ms           | `number`                                                     | `3000`          |
| `showIcon` / `closable`       | Icon and close control              | `boolean`                                                    | `true / false`  |
| `pauseOnHover`                | Pause while hovered                 | `boolean`                                                    | `false`         |
| `resetOnUpdate`               | Restart duration after an id update | `boolean`                                                    | `false`         |
| `closeButtonAriaLabel`        | Accessible close label              | `string`                                                     | `Close message` |
| `popupContainer`              | Mount target                        | `string \| HTMLElement \| false`                             | `body`          |

Function options also accept `onOpen / onOpened / onClose / onClosed`; close callbacks receive the current id.

### Events

`update:open`, `open`, `opened`, `close`, and `closed`, emitted once per visibility cycle.

### Methods

`Message(...)`, `Message.info/success/warning/error/loading(...)`, `Message.clear(position?)`, `Message.setDefaultOptions(options)`, and `Message.resetDefaultOptions()`.

The returned handle contains an idempotent `close()` method. Slots: `default`, `icon`, and `action`.

## Public CSS variables

Visual emphasis is independent of status: neutral uses an overlay surface and status icon; tonal uses a subtle status background; solid uses a strong status fill and paired foreground. Cedar and Maple both default to neutral. Explicit solid / tonal variants share the same color contract. Solid default/loading retain a dark surface. MessageVariant is exported; imperative calls, default options and same-id updates accept variant.

Color names follow `--mp-message-{variant}-{status}-{bg|content-color|icon-color|border-color|close-color}`。Each color is independently overridable; custom backgrounds require checking all foregrounds. Geometry remains platform-specific. Variables must be applied on the actual teleport ancestor.

| Variable | Default |
| --- | --- |
| `--mp-message-viewport-padding` | `24px` |
| `--mp-message-wrapper-margin-top` | `5%` |
| `--mp-message-wrapper-margin-bottom` | `5%` |
| `--mp-message-z-index` | `2000` |
| `--mp-message-box-shadow` | `0 4px 12px rgba(0, 0, 0, 0.2)` |
| `--mp-message-icon-font-size` | `20px` |
| `--mp-message-close-size` | `32px` |
| `--mp-message-close-margin-right` | `4px` |
| `--mp-message-close-border-radius` | `50%` |
| `--mp-message-focus-outline-width` | `2px` |
| `--mp-message-focus-outline-offset` | `-4px` |
| `--mp-message-transition-distance` | `-12px` |
| `--mp-message-transition-duration` | `150ms` |
| `--mp-message-transition-timing-function` | `var(--mp-cubic-bezier)` |
| `--mp-message-neutral-default-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-default-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-default-icon-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-default-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-default-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-neutral-info-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-info-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-info-icon-color` | `var(--mp-sys-color-content-info)` |
| `--mp-message-neutral-info-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-info-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-neutral-success-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-success-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-success-icon-color` | `var(--mp-sys-color-content-success)` |
| `--mp-message-neutral-success-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-success-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-neutral-warning-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-warning-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-warning-icon-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-message-neutral-warning-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-warning-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-neutral-danger-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-danger-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-danger-icon-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-message-neutral-danger-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-danger-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-neutral-loading-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-message-neutral-loading-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-neutral-loading-icon-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-message-neutral-loading-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-message-neutral-loading-close-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-message-tonal-default-bg` | `var(--mp-sys-color-surface-muted)` |
| `--mp-message-tonal-default-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-default-icon-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-default-border-color` | `transparent` |
| `--mp-message-tonal-default-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-info-bg` | `rgba(var(--mp-blue-6), 0.12)` |
| `--mp-message-tonal-info-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-info-icon-color` | `var(--mp-sys-color-content-info)` |
| `--mp-message-tonal-info-border-color` | `transparent` |
| `--mp-message-tonal-info-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-success-bg` | `var(--mp-color-success-light-1)` |
| `--mp-message-tonal-success-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-success-icon-color` | `var(--mp-sys-color-content-success)` |
| `--mp-message-tonal-success-border-color` | `transparent` |
| `--mp-message-tonal-success-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-warning-bg` | `var(--mp-color-warning-light-1)` |
| `--mp-message-tonal-warning-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-warning-icon-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-message-tonal-warning-border-color` | `transparent` |
| `--mp-message-tonal-warning-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-danger-bg` | `var(--mp-color-danger-light-1)` |
| `--mp-message-tonal-danger-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-danger-icon-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-message-tonal-danger-border-color` | `transparent` |
| `--mp-message-tonal-danger-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-loading-bg` | `var(--mp-color-primary-light-1)` |
| `--mp-message-tonal-loading-content-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-tonal-loading-icon-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-message-tonal-loading-border-color` | `transparent` |
| `--mp-message-tonal-loading-close-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-message-solid-default-bg` | `#333` |
| `--mp-message-solid-default-content-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-solid-default-icon-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-solid-default-border-color` | `transparent` |
| `--mp-message-solid-default-close-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-solid-info-bg` | `var(--mp-sys-color-status-info)` |
| `--mp-message-solid-info-content-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-info-icon-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-info-border-color` | `transparent` |
| `--mp-message-solid-info-close-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-success-bg` | `var(--mp-sys-color-status-success)` |
| `--mp-message-solid-success-content-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-success-icon-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-success-border-color` | `transparent` |
| `--mp-message-solid-success-close-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-warning-bg` | `var(--mp-sys-color-status-warning)` |
| `--mp-message-solid-warning-content-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-warning-icon-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-warning-border-color` | `transparent` |
| `--mp-message-solid-warning-close-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-danger-bg` | `var(--mp-sys-color-status-danger)` |
| `--mp-message-solid-danger-content-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-danger-icon-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-danger-border-color` | `transparent` |
| `--mp-message-solid-danger-close-color` | `var(--mp-sys-color-content-on-bright)` |
| `--mp-message-solid-loading-bg` | `#333` |
| `--mp-message-solid-loading-content-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-solid-loading-icon-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-solid-loading-border-color` | `transparent` |
| `--mp-message-solid-loading-close-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-message-width` | `256px` |
| `--mp-message-border-radius` | `4px` |
| `--mp-message-font-size` | `var(--mp-font-size-md)` |
| `--mp-message-margin` | `6px 24px` |
| `--mp-message-content-padding` | `14px 16px` |
| `--mp-message-action-margin` | `0 8px` |
| `--mp-message-icon-margin` | `0 8px` |
