# 动作面板

### 介绍

弹出一个动作面板提供用户选择选项的能力。
`ActionSheet` 提供函数式和组件式调用。函数服务使用独立应用并强制挂载到 body；组件遵循所在应用上下文和 `popup-container`。
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
  <mp-action-sheet :actions="actions" v-model:open="show" @select="handleSelect" />
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
  <mp-action-sheet title="选择一个你喜欢的吧" :actions="actions" v-model:open="show" @select="handleSelect" />
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
  <mp-action-sheet :actions="actions" v-model:open="show" @select="handleSelect" />
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
  <mp-action-sheet :close-on-click-action="false" :actions="actions" v-model:open="show" @select="handleSelect" />
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
  <mp-action-sheet :actions="actions" v-model:open="show" @select="handleSelect" />
</template>
```

## 键盘与对话框名称

默认动作使用原生按钮，禁用动作不可聚焦或选择。标题和 title 插槽为对话框提供名称；显式 `aria-label` 或 `aria-labelledby` 可覆盖。可见的取消按钮通过关闭守卫请求关闭。

## 受控状态

选择动作时，`close-on-click-action` 会请求更新 `open`；受控父组件保持 `open=true` 时面板保持打开。未传 `open` 时使用 `default-open` 初始化内部状态。

## 使用说明

### 标题下拉关闭

`swipe-to-close` 默认 false；开启后可以从默认标题向下拖动关闭。`swipe-threshold` 默认为 40 CSS px。自定义 title 插槽沿用外层标题拖动区域，正文选项和标题内按钮不会触发拖动关闭。详见 Popup 的头部手势说明。
`before-close` 透传到 Popup，遮罩、Esc、路由、下拉以及操作后修改 `open` 的关闭请求均可异步拒绝；异常触发 `close-error(error, reason)`。操作的 `select` 表示选择事件，不代表关闭已获批准。

## API

`open/defaultOpen` 分别控制面板状态与非受控初始开合；使用 `v-model:open` 双向绑定。defaultOpen 只在创建时读取，不在初始化时回写。

### ActionSheet Props

| 参数                    | 说明                                                   | 类型                           | 默认值   |
| ----------------------- | ------------------------------------------------------ | ------------------------------ | -------- |
| `v-model:open` | 受控显示状态 | _boolean_ | `-` |
| `default-open` | 非受控初始开合状态 | _boolean_ | `false` |
| `before-close` | 关闭守卫 | _PopupBeforeClose_ | `-` |
| `swipe-to-close` | 启用标题区域下滑关闭 | _boolean_ | `false` |
| `swipe-threshold` | 下滑关闭阈值（CSS px） | _number_ | `40` |
| `actions`               | 选项列表                                               | _Actions_                      | `[]`     |
| `title`                 | 动作面板标题                                           | _string_                       | `请选择` |
| `overlay`               | 是否显示背景层                                         | _boolean_                      | `true`   |
| `overlay-class`         | 自定义背景层的 class                                   | _string_                       | `-`      |
| `overlay-style`         | 自定义背景层的 style                                   | _object_                       | `-`      |
| `lock-scroll`           | 是否禁止滚动穿透，禁止时滚动弹出层不会引发 body 的滚动 | _boolean_                      | `true`   |
| `close-on-click-action` | 是否点击选项时关闭动作面板                             | _boolean_                      | `true`   |
| `overlay-closable`      | 是否点击背景层关闭动作面板                             | _boolean_                      | `true`   |
| `esc-to-close`          | 是否支持键盘 ESC 关闭动作面板                          | _boolean_                      | `true`   |
| `safe-area`             | 是否开启底部及左右安全区适配                                 | _boolean_                      | `false`  |
| `popup-container`        | 动作面板挂载的位置                                     | _TeleportProps['to'] \| false_ | `body`   |

### ActionSheet Events

| 事件名          | 说明                       | 参数             |
| --------------- | -------------------------- | ---------------- |
| `update:open` | 请求更新显示状态 | `boolean` |
| `close-error` | 关闭守卫异常 | `error: unknown, reason: PopupCloseReason` |
| `select`        | 选择选项时触发             | `action: Action` |
| `open`          | 打开动作面板时触发         | `-`              |
| `opened`        | 打开动作面板动画结束时触发 | `-`              |
| `close`         | 关闭动作面板时触发         | `-`              |
| `closed`        | 关闭动作面板动画结束时触发 | `-`              |
| `click-overlay` | 点击背景层时触发           | `MouseEvent`     |
| `key-escape`    | 按下 ESC 时触发            | `KeyboardEvent`  |

### ActionSheet Methods

| 方法名                            | 说明               | 参数      | 返回值 |
| --------------------------------- | ------------------ | --------- | ------ |
| `ActionSheet`                     | 显示动作面板       | _options_ | `Promise<ActionSheetActions \| void>` |
| `ActionSheet.close`               | 关闭动作面板       | _-_       | `-`    |
| `ActionSheet.setDefaultOptions`   | 设置默认的选项配置 | _options_ | `-`    |
| `ActionSheet.resetDefaultOptions` | 重置默认的选项配置 | _-_       | `-`    |

### ActionSheet Options

#### 函数式调用时传入的选项

服务创建后会设置 `open=true` 并强制使用 body；选项中的 `open` 和 `popupContainer` 不是控制服务显示和挂载位置的入口。

| 参数                 | 说明                                                   | 类型                          | 默认值   |
| -------------------- | ------------------------------------------------------ | ----------------------------- | -------- |
| `beforeClose` | 关闭守卫 | _PopupBeforeClose_ | `-` |
| `swipeToClose` | 启用标题区域下滑关闭 | _boolean_ | `false` |
| `swipeThreshold` | 下滑关闭阈值（CSS px） | _number_ | `40` |
| `onCloseError` | 关闭守卫异常通知 | _(error: unknown, reason: PopupCloseReason) => void_ | `-` |
| `actions`            | 选项列表                                               | _Actions_                     | `[]`     |
| `title`              | 动作面板标题                                           | _string_                      | `请选择` |
| `overlay`            | 是否显示背景层                                         | _boolean_                     | `true`   |
| `overlayClass`       | 自定义背景层的 class                                   | _string_                      | `-`      |
| `overlayStyle`       | 自定义背景层的 style                                   | _object_                      | `-`      |
| `lockScroll`         | 是否禁止滚动穿透，禁止时滚动弹出层不会引发 body 的滚动 | _boolean_                     | `true`   |
| `closeOnClickAction` | 是否点击选项时关闭动作面板                             | _boolean_                     | `true`   |
| `overlayClosable`    | 是否点击背景层关闭弹出层                               | _boolean_                     | `true`   |
| `escToClose`         | 是否支持键盘 ESC 关闭动作面板                          | _boolean_                     | `true`   |
| `safeArea`           | 是否开启底部及左右安全区适配                                 | _boolean_                     | `false`  |
| `onOpen`             | 动作面板开启回调                                       | _() => void_                  | `-`      |
| `onOpened`           | 动作面板开启动画结束回调                               | _() => void_                  | `-`      |
| `onClose`            | 动作面板关闭回调                                       | _() => void_                  | `-`      |
| `onClosed`           | 动作面板关闭动画结束回调                               | _() => void_                  | `-`      |
| `onSelect`           | 选项选择时回调                                         | _(action: Action) => void_    | `-`      |
| `onClickOverlay`     | 背景层点击回调                                         | _(event: MouseEvent) => void_ | `-`      |
| `onKeyEscape`        | 点击键盘 ESC 时触发                                    | _(event: KeyboardEvent) => void_                  | `-`      |

### ActionSheet Action

| 参数        | 说明                        | 类型      | 默认值  |
| ----------- | --------------------------- | --------- | ------- |
| `name`      | 选项名称                    | _string_  | `-`     |
| `color`     | 选项文字颜色                | _string_  | `-`     |
| `icon`      | 已注册图标名称 | _string_  | `-`     |
| `iconSize`  | 图标尺寸                    | _string \| number_  | `-`     |
| `namespace` | 兼容字段；当前图标渲染不使用 | _string_  | `-`     |
| `className` | 选项附加类名                | _string_  | `-`     |
| `disabled`  | 是否禁用选项                | _boolean_ | `false` |

### ActionSheet Slots

| 插槽名    | 说明         | 参数 |
| --------- | ------------ | ---- |
| `actions` | 选项列表     | `-`  |
| `title`   | 动作面板标题 | `-`  |

## 关闭守卫

守卫签名为 `beforeClose({ reason }, done, { signal, event })`。

返回 true/false 或 `Promise<boolean>`；async 函数正常完成且返回 void 时放行。回调方式使用 done() 放行、done(false) 拒绝；同步返回 void 时等待 done，可异步调用。返回值和 done 同时使用时，第一次完成生效。等待中去重；异常保留弹层并恢复临时按钮状态。`signal` 和可选原始 `event` 由第三个 context 参数提供。关闭、卸载或更换钩子会使旧结果失效。

只记录日志的同步钩子应显式 return true；同步 undefined 表示仍在等待回调。注意：以前返回 `Promise<void>` 却不调用 done 的异步钩子，现在会在 Promise 完成后放行。

Popup 原因为 overlay、escape、route、swipe、close、api、model。拒绝外部 open=false 时请求 update:open(true)。组件未公开 `requestClose()`；需要受守卫控制的关闭时使用现有关闭入口，直接销毁组件不会等待内部钩子。

函数调用的通知回调不控制任务完成。服务的选择或关闭结果独立于回调异常结算，关闭完成时仍会清理所属宿主。异常继续通过调用方或 Vue 错误通道传递；回调返回 Promise 不控制 loading 或关闭。
`ActionSheet.close()` 是遵守 `beforeClose` 的关闭请求；拒绝后保留服务所有权，可以再次请求关闭。再次函数调用会替换旧单例：直接清理旧宿主并将旧结果结算为 `close`，不等待旧关闭守卫，也不合成生命周期通知。

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
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

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-action-sheet-action-item-color: #333;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
