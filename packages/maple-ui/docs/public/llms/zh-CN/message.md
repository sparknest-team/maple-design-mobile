<!-- Source: src/message/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/message -->

# 全局提示

展示duration是业务期限，不是CSS进出场时长；0常驻，只有有限正值排自动关闭。hover保留剩余期限，KeepAlive重新激活重新开始完整配置期限；停用／卸载使旧计时失效。2026-10-15计时源码与既有审计hash一致，本次仅补录business-clock分类；当前39项回归不增加原生浏览器验收，也不自动认证服务nextTick更新身份或跨文档迁移。

## 案例

### 介绍

用于展示轻量级、非模态的全局反馈。Maple 与 Cedar 共享同一套公开契约、队列、计时和命令式服务；两端分别维护源码和端侧外观。Message 不锁滚动，也不阻断页面操作。

### 函数调用

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

### 消息状态

状态统一为 `default / info / success / warning / danger / loading`。函数方法使用 `error`，组件状态使用标准语义 `danger`；普通提示直接调用 `Message(...)`，不提供 `normal` 别名。

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

### 组件调用

声明式组件支持受控 `open`、三种位置、操作区、自定义图标和可关闭按钮。

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

## 行为说明

- `duration` 单位为毫秒，`0` 表示常驻；`Message.loading(...)` 默认常驻。
- 同一挂载容器和位置内，相同 `id` 更新原实例，不创建重复 DOM。
- 仅当 `resetOnUpdate` 为 `true` 时，相同 id 更新会重新计算完整显示时长。
- `pauseOnHover` 保存剩余时间，鼠标离开后从剩余时间继续。
- 展示期限独立于 CSS 动效；重启、hover 暂停、清理或卸载使旧计时回调失效，执行时再次检查 open。
- KeepAlive 停用取消计时，激活从当前配置完整 duration 重启；停用更新和卸载后保留的 restart 不调度。
- hover 正时长已耗尽时恢复会请求关闭；显式重置为0仍常驻。仅有限正 duration 自动关闭，负数和非有限值不调度。
- 服务等待真实离场完成，不再强制150ms或200ms退出。未挂载就 close/clear 直接清理并报告服务 onClosed，不伪造组件 open/opened/close 动画事件；业务 duration 独立于 CSS 过渡。
- 真实IAB default/light/top服务默认、600ms、零和离场重开四组已通过；重开可替换根DOM，其他主题／位置、hover、KeepAlive及真实OS仍需独立验收。
- 局部减少动效取消进出过渡和动画位移，保留独立提示的水平/居中静态定位、颜色及业务展示期限；不依赖全局极短时长，隔离Less检查不是实际OS验收。
- 队列按 `popupContainer + position` 隔离；`Message.clear(position?)` 可按位置清理。

## 视觉变体

视觉变体与 status 独立：neutral 是中性浮层与状态图标；tonal 是低强调状态色底与深色正文；solid 是高强调实色底与配套前景。Cedar 与 Maple 默认均为 neutral；显式 solid / tonal 保持相同视觉语义。default/loading 的 solid 保留深色底，loading 图标仍表达进度。两端导出 MessageVariant，函数调用、setDefaultOptions 和相同 id 更新都支持 variant。

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

### 外观组合

适用于操作结果的即时反馈。调整变体、状态，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

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

| 参数                    | 说明                               | 类型                                                         | 默认值          |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------ | --------------- |
| `open` / `v-model:open` | 是否显示（组件）                   | `boolean`                                                    | `false`         |
| `id`                    | 队列内唯一标识                     | `string \| number`                                           | 自动生成        |
| `status`                | 语义状态                           | `default \| info \| success \| warning \| danger \| loading` | `default`       |
| variant | 视觉强调层级 | `neutral \| tonal \| solid` | `neutral` |
| `position`              | 显示位置                           | `top \| center \| bottom`                                    | `top`           |
| `content`               | 内容                               | `MessageContent`                                             | -               |
| `icon`                  | 自定义图标                         | `MessageContent`                                             | -               |
| `action`                | 操作区                             | `MessageContent`                                             | -               |
| `duration`              | 自动关闭时长（ms），`0` 不自动关闭 | `number`                                                     | `3000`          |
| `showIcon`              | 是否显示状态图标                   | `boolean`                                                    | `true`          |
| `closable`              | 是否显示关闭按钮                   | `boolean`                                                    | `false`         |
| `pauseOnHover`          | 悬停时暂停并保存剩余时间           | `boolean`                                                    | `false`         |
| `resetOnUpdate`         | 更新时是否重置完整时长             | `boolean`                                                    | `false`         |
| `closeButtonAriaLabel`  | 关闭按钮无障碍名称                 | `string`                                                     | `Close message` |
| `popupContainer`        | 挂载容器                           | `string \| HTMLElement \| false`                             | `body`          |

函数选项另支持 `onOpen / onOpened / onClose / onClosed`，关闭回调接收当前 `id`。

### 事件

`update:open`、`open`、`opened`、`close`、`closed`；每次开关周期各触发一次。

### 方法

| 方法                                              | 说明                     |
| ------------------------------------------------- | ------------------------ |
| `Message(options \| string)`                      | 打开默认提示             |
| `Message.info/success/warning/error/loading(...)` | 打开对应状态提示         |
| `Message.clear(position?)`                        | 清空全部或指定位置的提示 |
| `Message.setDefaultOptions(options)`              | 设置后续调用默认值       |
| `Message.resetDefaultOptions()`                   | 恢复默认值               |

返回 `{ close() }`；重复调用 `close()` 不会重复触发关闭生命周期。

### 插槽

`default`、`icon`、`action`。

## 公开 CSS 变量

视觉变体与 status 独立：neutral 是中性浮层与状态图标；tonal 是低强调状态色底与深色正文；solid 是高强调实色底与配套前景。Cedar 与 Maple 默认均为 neutral；显式 solid / tonal 保持相同视觉语义。default/loading 的 solid 保留深色底，loading 图标仍表达进度。两端导出 MessageVariant，函数调用、setDefaultOptions 和相同 id 更新都支持 variant。

颜色命名为 `--mp-message-{variant}-{status}-{bg|content-color|icon-color|border-color|close-color}`。bg 控制面板底，content-color 控制正文与未单独设色的 action，icon-color 控制状态图标，border-color 控制边线，close-color 控制关闭按钮。自定义背景时需要同时验证三个前景。几何变量保留端侧密度，不要求两端强行同值。变量必须作用于实际 Teleport 容器祖先。

| 变量 | 默认值 |
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
