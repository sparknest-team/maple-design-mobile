# 动作面板

### 介绍

弹出一个动作面板提供用户选择选项的能力。
`ActionSheet` 提供了函数式和组件式两种使用方式，两种使用效果和参数并没有本质区别。
函数返回一个 `Promise`，选择时返回 `当前选择的 action`，点击背景层关闭返回 `close`。

## 基础示例

### 函数调用

```demo
../example/demos/function-call.vue
```

## 声明式与状态控制

### 组件调用

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `actions` | 选项列表 | 组件调用 |
| `title` | 动作面板标题 | 组件调用 |
| `close-on-click-action` | 是否点击选项时关闭动作面板 | 组件调用 |
<!-- demo-config-notes:end -->

```demo
../example/demos/component-call.vue
```

## 函数调用

### 基本使用

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

    action !== 'close' && Message(`您选择的是:${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="createBasic">基本使用</mp-button>
</template>
```

### 修改标题

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
      title: '选择一个你喜欢的吧',
    })

    action !== 'close' && Message(`您选择的是:${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">修改标题</mp-button>
</template>
```

### 禁用选项

选项传入 `disabled` 可以使选项处于禁用状态。

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

    action !== 'close' && Message(`您选择的是:${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">禁用选项</mp-button>
</template>
```

### 禁用点击选项时关闭动作面板

方法传入 `closeOnClickAction` 可以禁用在选择选项时 `ActionSheet` 自动关闭的行为，用户可以多次选择，
由于 `Promise` 只会被 `resolve` 一次，所以推荐使用 `onSelect` 监听用户选择行为。

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
      onSelect: (action) => Message(`您选择的是:${action.name}`),
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">禁用关闭动作面板</mp-button>
</template>
```

### 自定义选项样式

选项提供了可以配置样式的参数，具体选项的参数可选项见 `Action 的数据结构`。

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

    action !== 'close' && Message(`您选择的是:${action.name}`)
  }
</script>

<template>
  <mp-button status="primary" block @click="handleSelect">自定义选项样式</mp-button>
</template>
```

## 组件调用

### 基本使用

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
    Message(`您选择的是:${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">基本使用</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### 修改标题

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
    Message(`您选择的是:${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">修改标题</mp-button>
  <mp-action-sheet title="选择一个你喜欢的吧" :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### 禁用选项

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
    Message(`您选择的是:${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">禁用选项</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### 禁用点击选项时关闭动作面板

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
    Message(`您选择的是:${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">禁用点击选项时关闭动作面板</mp-button>
  <mp-action-sheet :close-on-click-action="false" :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

### 自定义选项样式

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
    Message(`您选择的是:${action.name}`)
  }
</script>

<template>
  <mp-button status="warning" block @click="show = true">自定义选项样式</mp-button>
  <mp-action-sheet :actions="actions" v-model:open="open" @select="handleSelect" />
</template>
```

## API

`open/defaultOpen` 分别控制面板状态与非受控初始开合；使用 `v-model:open` 双向绑定。defaultOpen 只在创建时读取，不在初始化时回写。

### 属性

| 参数                    | 说明                                                   | 类型                           | 默认值   |
| ----------------------- | ------------------------------------------------------ | ------------------------------ | -------- |
| `v-model:open`          | 是否显示动作面板                                       | _boolean_                      | `false`  |
| `actions`               | 选项列表                                               | _Actions_                      | `[]`     |
| `title`                 | 动作面板标题                                           | _string_                       | `请选择` |
| `overlay`               | 是否显示背景层                                         | _boolean_                      | `true`   |
| `overlay-class`         | 自定义背景层的 class                                   | _string_                       | `-`      |
| `overlay-style`         | 自定义背景层的 style                                   | _object_                       | `-`      |
| `lock-scroll`           | 是否禁止滚动穿透，禁止时滚动弹出层不会引发 body 的滚动 | _boolean_                      | `true`   |
| `close-on-click-action` | 是否点击选项时关闭动作面板                             | _boolean_                      | `true`   |
| `overlay-closable`      | 是否点击背景层关闭动作面板                             | _boolean_                      | `true`   |
| `esc-to-close`          | 是否支持键盘 ESC 关闭动作面板                          | _boolean_                      | `true`   |
| `safe-area`             | 是否开启底部安全区适配                                 | _boolean_                      | `false`  |
| `popup-container`        | 动作面板挂载的位置                                     | _TeleportProps['to'] \| false_ | `body`   |

### 事件

| 事件名          | 说明                       | 参数             |
| --------------- | -------------------------- | ---------------- |
| `select`        | 选择选项时触发             | `action: Action` |
| `open`          | 打开动作面板时触发         | `-`              |
| `opened`        | 打开动作面板动画结束时触发 | `-`              |
| `close`         | 关闭动作面板时触发         | `-`              |
| `closed`        | 关闭动作面板动画结束时触发 | `-`              |
| `click-overlay` | 点击背景层时触发           | `MouseEvent`     |
| `key-escape`    | 按下 ESC 时触发            | `KeyboardEvent`  |

### 方法

| 方法名                            | 说明               | 参数      | 返回值 |
| --------------------------------- | ------------------ | --------- | ------ |
| `ActionSheet`                     | 显示动作面板       | _options_ | `-`    |
| `ActionSheet.close`               | 关闭动作面板       | _-_       | `-`    |
| `ActionSheet.setDefaultOptions`   | 设置默认的选项配置 | _options_ | `-`    |
| `ActionSheet.resetDefaultOptions` | 重置默认的选项配置 | _-_       | `-`    |

### ActionSheet Options

#### 函数式调用时传入的选项

| 参数                 | 说明                                                   | 类型                          | 默认值   |
| -------------------- | ------------------------------------------------------ | ----------------------------- | -------- |
| `actions`            | 选项列表                                               | _Actions_                     | `[]`     |
| `title`              | 动作面板标题                                           | _string_                      | `请选择` |
| `overlay`            | 是否显示背景层                                         | _boolean_                     | `true`   |
| `overlayClass`       | 自定义背景层的 class                                   | _string_                      | `-`      |
| `overlayStyle`       | 自定义背景层的 style                                   | _object_                      | `-`      |
| `lockScroll`         | 是否禁止滚动穿透，禁止时滚动弹出层不会引发 body 的滚动 | _boolean_                     | `true`   |
| `closeOnClickAction` | 是否点击选项时关闭动作面板                             | _boolean_                     | `true`   |
| `overlayClosable`    | 是否点击背景层关闭弹出层                               | _boolean_                     | `true`   |
| `escToClose`         | 是否支持键盘 ESC 关闭动作面板                          | _boolean_                     | `true`   |
| `safe-area`          | 是否开启底部安全区适配                                 | _boolean_                     | `false`  |
| `onOpen`             | 动作面板开启回调                                       | _() => void_                  | `-`      |
| `onOpened`           | 动作面板开启动画结束回调                               | _() => void_                  | `-`      |
| `onClose`            | 动作面板关闭回调                                       | _() => void_                  | `-`      |
| `onClosed`           | 动作面板关闭动画结束回调                               | _() => void_                  | `-`      |
| `onSelect`           | 选项选择时回调                                         | _(action: Action) => void_    | `-`      |
| `onClickOverlay`     | 背景层点击回调                                         | _(event: MouseEvent) => void_ | `-`      |
| `onKeyEscape`        | 点击键盘 ESC 时触发                                    | _() => void_                  | `-`      |

### ActionSheet Action

| 参数        | 说明                        | 类型      | 默认值  |
| ----------- | --------------------------- | --------- | ------- |
| `name`      | 选项名称                    | _string_  | `-`     |
| `color`     | 选项文字颜色                | _string_  | `-`     |
| `icon`      | icon 图标，支持网络图片地址 | _string_  | `-`     |
| `iconSize`  | 图标尺寸                    | _string_  | `-`     |
| `namespace` | 图标命名空间                | _string_  | `-`     |
| `className` | 选项附加类名                | _string_  | `-`     |
| `disabled`  | 是否禁用选项                | _boolean_ | `false` |

### 插槽

| 插槽名    | 说明         | 参数 |
| --------- | ------------ | ---- |
| `actions` | 选项列表     | `-`  |
| `title`   | 动作面板标题 | `-`  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                      | 默认值                       |
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

### 标题下拉关闭

`swipe-to-close` 默认 false；开启后可以从默认标题向下拖动关闭。`swipe-threshold` 默认为 40 CSS px。自定义 title 插槽需添加 `data-popup-swipe-handle`，正文选项和标题内按钮不会触发拖动关闭。详见 Popup 的头部手势说明。
`before-close` 透传到 Popup，遮罩、Esc、路由、下拉以及操作后修改 `open` 的关闭请求均可异步拒绝；异常触发 `close-error(error, reason)`。操作的 `select` 表示选择事件，不代表关闭已获批准。

## before 钩子与 done 兼容

`beforeClose(reason, done)` 为统一入口，不新增另一套命名。

返回 true/false 或 `Promise<boolean>`；async 函数正常完成且返回 void 时放行。回调方式使用 done() 放行、done(false) 拒绝；同步返回 void 时等待 done，可异步调用。返回值和 done 同时使用时，第一次完成生效。等待中去重；异常保留弹层并恢复临时按钮状态。done 同时携带 signal/event，Dialog/Drawer 原第三参数 refs 保留。关闭、卸载或更换钩子会使旧结果失效。

只记录日志的同步钩子应显式 return true；同步 undefined 表示仍在等待回调。注意：以前返回 `Promise<void>` 却不调用 done 的异步钩子，现在会在 Promise 完成后放行。

Popup 原因为 overlay、escape、route、swipe、close、api、model。拒绝外部 open=false 时请求 update:open(true)。直接销毁组件不能等待内部钩子，应先 await requestClose()。

函数调用的通知回调不控制任务完成。服务的选择或关闭结果独立于回调异常结算，关闭完成时仍会清理所属宿主。异常继续通过调用方或 Vue 错误通道传递；回调返回 Promise 不控制 loading 或关闭。
`ActionSheet.close()` 是遵守 `beforeClose` 的关闭请求；拒绝后保留服务所有权，可以再次请求关闭。再次函数调用会替换旧单例：直接清理旧宿主并将旧结果结算为 `close`，不等待旧关闭守卫，也不合成生命周期通知。
