# 悬浮动作按钮

### 介绍

悬浮动作按钮组件，按下可显示一组动作按钮。

右侧示例提供实时预览区，初始展开动作，点击动作后弹出 Message 并收起。调整方向时会将按钮移到可容纳菜单的一侧，避免菜单跑出屏幕。hover 适合鼠标操作，触摸设备建议使用 click。

预览使用 `fixed=false`、`popup-container=false`，定位在预览容器内。开启拖拽后改为屏幕固定定位；拖拽使用触摸手势。默认挂载到 body，也可以显式指定容器。

预览区随页面正常滚动，不吸顶覆盖控制项或屏幕上的 Fab。开启拖拽后按钮离开预览区，显示在屏幕所选角落；关闭拖拽则返回预览区。

### 主题色按钮

```html
<script setup>
import { ref } from 'vue'

const status = ref('primary')
</script>

<template>
  <mp-select v-model="status">
    <mp-option label="默认" value="default"/>
    <mp-option label="主要" value="primary"/>
    <mp-option label="信息" value="info"/>
    <mp-option label="成功" value="success"/>
    <mp-option label="警告" value="warning"/>
    <mp-option label="危险" value="danger"/>
  </mp-select>

  <mp-fab :status="status" />
</template>
```

### 触发器位置

```html
<script setup>
import { ref } from 'vue'

const position = ref('right-bottom')
</script>

<template>
  <mp-radio-group v-model="position">
    <mp-radio value="left-top">left-top</mp-radio>
    <mp-radio value="right-top">right-top</mp-radio>
    <mp-radio value="left-bottom">left-bottom</mp-radio>
    <mp-radio value="right-bottom">right-bottom</mp-radio>
  </mp-radio-group>

  <mp-fab :position="position" />
</template>
```

### 触发方式

```html
<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-radio-group v-model="trigger">
    <mp-radio value="click">click</mp-radio>
    <mp-radio value="hover">hover</mp-radio>
  </mp-radio-group>

  <mp-fab status="primary" :trigger="trigger">
    <mp-button status="info" icon-container>
      <m-icon-user-circle-fill />
    </mp-button>
    <mp-button status="success" icon-container>
      <m-icon-checkbox-marked-circle-fill />
    </mp-button>
    <mp-button status="warning" icon-container>
      <m-icon-bell-fill />
    </mp-button>
    <mp-button status="danger" icon-container>
      <m-icon-delete />
    </mp-button>
  </mp-fab>
</template>
```

### 动作菜单弹出方向

```html
<script setup>
import { ref } from 'vue'

const direction = ref('top')
</script>

<template>
  <mp-radio-group v-model="direction">
    <mp-radio value="top">top</mp-radio>
    <mp-radio value="right">right</mp-radio>
    <mp-radio value="bottom">bottom</mp-radio>
    <mp-radio value="left">left</mp-radio>
  </mp-radio-group>

  <mp-fab status="primary" :direction="direction">
    <mp-button status="info" icon-container>
      <m-icon-user-circle-fill />
    </mp-button>
    <mp-button status="success" icon-container>
      <m-icon-checkbox-marked-circle-fill />
    </mp-button>
    <mp-button status="warning" icon-container>
      <m-icon-bell-fill />
    </mp-button>
    <mp-button status="danger" icon-container>
      <m-icon-delete />
    </mp-button>
  </mp-fab>
</template>
```

### 开启拖拽

```html
<script setup>
import { ref } from 'vue'

const drag = ref(false)
</script>

<template>
  <mp-switch v-model="drag" />

  <mp-fab :drag="drag" />
</template>
```

### 禁用

```html
<script setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>

<template>
  <mp-switch v-model="disabled" />

  <mp-fab :disabled="disabled" />
</template>
```

### 触发器显示/隐藏

```html
<script setup>
import { ref } from 'vue'

const open = ref(true)

function toggle() {
  open.value = !open.value
}
</script>

<template>
  <mp-button status="primary" @click.stop="toggle">切换</mp-button>

  <mp-fab :open="open" />
</template>
```

### 动作菜单展开/收起

```html
<script setup>
import { ref } from 'vue'

const active = ref(false)

function toggle() {
  active.value = !active.value
}
</script>

<template>
  <mp-button status="primary" @click.stop="toggle">切换</mp-button>

  <mp-fab v-model:active="active" status="primary">
    <mp-button status="info" icon-container>
      <m-icon-user-circle-fill />
    </mp-button>
    <mp-button status="success" icon-container>
      <m-icon-checkbox-marked-circle-fill />
    </mp-button>
    <mp-button status="warning" icon-container>
      <m-icon-bell-fill />
    </mp-button>
    <mp-button status="danger" icon-container>
      <m-icon-delete />
    </mp-button>
  </mp-fab>
</template>
```

### 自定义触发器

```html
<template>
  <mp-fab>
    <mp-button status="info" icon-container>
      <m-icon-user-circle-fill :size="24" />
    </mp-button>
    <mp-button status="success" icon-container>
      <m-icon-checkbox-marked-circle-fill :size="24" />
    </mp-button>
    <mp-button status="warning" icon-container>
      <m-icon-bell-fill :size="24" />
    </mp-button>
    <mp-button status="danger" icon-container>
      <m-icon-delete :size="24" />
    </mp-button>

    <template #trigger="{ active }">
      <mp-button class="trigger" status="primary" round>
        <m-icon-heart-fill v-if="active" :size="24" />
        <m-icon-heart-half-full v-else :size="24" />
      </mp-button>
    </template>
  </mp-fab>
</template>

<style>
.trigger {
  width: 64px !important;
  height: 64px !important;
  border-radius: 8px !important;
}

.fade {
  transition-property: opacity, transform;
  opacity: 0;
  transform: rotate(90deg)
}
</style>
```

## API

### 属性

| 参数              | 说明                                                             | 类型     | 默认值        |
|------------------|----------------------------------------------------------------- |----------|----------------|
| `v-model:active` | 是否激活动作菜单                                                    | _boolean_ | `false`       |
| `open`           | 是否显示触发器 | _boolean_ | `true`    |
| `drag`      | Drag 组件配置，用于深度定制（支持 `direction` `attraction` `boundary`） | _boolean \| DragProps_  | `false`    |
| `status`         | 状态，可选值为 `default` `primary` `info` `success` `warning` `danger` | _string_ | `primary`    |
| `position` | 触发器位置，可选值为 `left-top` `right-top` `left-bottom` `right-bottom` | _string_ | `right-bottom`    |
| `direction` | 动作菜单弹出方向，可选值为 `top` `bottom` `left` `right` | _string_ | `top`    |
| `trigger` | 触发方式 `click` `hover` | _string_ | `click`    |
| `disabled` | 是否禁用 | _boolean_ | `false`    |
| `color` | 触发器颜色 | _string_ | `-`    |
| `inactive-icon` | 未激活时触发器图标 | _string_ | `plus`    |
| `active-icon` | 激活时触发器图标 | _string_ | `window-close`    |
| `inactive-icon-size` | 未激活时触发器图标尺寸 | _string \| number_ | `-` |
| `active-icon-size` | 激活时触发器图标尺寸 | _string \| number_ | `-` |
| `inactive-icon-namespace` | 未激活时触发器图标的命名空间 | _string_ | `mp-icon`    |
| `active-icon-namespace` | 激活时触发器图标的命名空间 | _string_ | `mp-icon`  |
| `fixed` | 是否使用固定定位，设置为 `false` 可开启绝对定位（绝对定位无法使用拖拽） | _boolean_ | `true` |
| `z-index` | 同 css z-index，用于自定义触发器层级 | _string \| number_ | `90` |
| `top` | 同 css top，用于自定义触发器位置 | _string \| number_ | `-` |
| `bottom` | 同 css bottom，用于自定义触发器位置 | _string \| number_ | `-` |
| `left` | 同 css left，用于自定义触发器位置 | _string \| number_ | `-` |
| `right` | 同 css right，用于自定义触发器位置 | _string \| number_ | `-` |
| `safe-area` | 是否开启底部安全区适配	 | _boolean_ | `false` |
| `popup-container` | 组件挂载的元素 | _TeleportProps['to'] \| false_ | `body` |
| `elevation`      | 海拔高度，可选值为 `true`、`false` 和 `0-24` 的等级 | _number \| boolean_ | `true`            |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击触发器时触发，在 `disabled` 状态为 `true` 时不触发 | `active: boolean, event: Event` |
| `open` | 在激活并打开动作菜单时触发 | `-` |
| `opened` | 在激活并打开动作菜单的动画结束时触发 | `-` |
| `close` | 在失活并关闭动作菜单时触发 | `-` |
| `closed` | 在失活并关闭动作菜单的动画结束时触发 | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 动作菜单 |  `-` |
| `trigger` | 触发器 | `{ active: boolean }` |


### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--fab-top` | `70px` |
| `--fab-bottom` | `16px` |
| `--fab-left` | `16px` |
| `--fab-right` | `16px` |
| `--fab-trigger-size` | `56px` |
| `--fab-trigger-border-radius` | `50%` |
| `--fab-trigger-inactive-icon-size` | `26px` |
| `--fab-trigger-active-icon-size` | `22px` |
| `--fab-actions-padding` | `10px 0` |
| `--fab-action-margin` | `6px` |
| `--fab-action-size` | `40px` |
| `--fab-action-border-radius` | `50%` |
| `--fab-transition-standard-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` |
