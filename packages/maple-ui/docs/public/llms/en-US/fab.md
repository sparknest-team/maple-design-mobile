<!-- Source: src/fab/docs/en-US.md; locale: en-US; page: /en-US/fab -->

# Fab

## Examples

### Intro

The floating action button component, press to display a group of action buttons.

The live preview starts expanded. Actions show a Message and collapse the menu. Changing direction moves the button to a compatible edge. Use click on touch devices; hover is intended for a mouse.

The local preview uses `fixed=false` and `popup-container=false`. The drag example keeps the default `fixed=true` to enable dragging and uses `popup-container=false` to keep the button inside the preview container. Drag boundaries use the container dimensions. Dragging uses touch gestures.

The preview and button remain visible when toggling dragging. Switching it off stops dragging. The preview scrolls with the page.

### Basic Usage

Example source: src/fab/example/demos/basic.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message } from '@maple-design/ui'

const demoText = {
  basic: '基础用法',
  preview: '实时预览',
  previewHint: '点击悬浮按钮展开或收起，点击动作按钮查看提示。下方参数实时生效。',
  dragHint: '拖拽模式：按钮位于屏幕角落，可用触摸拖动；关闭拖拽回到预览区。',
  hiddenState: '按钮已隐藏',
  expandedState: '动作已展开',
  collapsedState: '动作已收起',
  profile: '查看用户',
  complete: '标记完成',
  notify: '发送提醒',
  type: '主题色按钮',
  trigger: '触发方式',
  direction: '动作菜单弹出方向',
  position: '触发器位置',
  default: '默认',
  primary: '主要',
  info: '信息',
  success: '成功',
  warning: '警告',
  danger: '危险',
  drag: '拖拽',
  disabled: '禁用',
  elevation: '海拔效果',
  triggerToggle: '触发器显示/隐藏',
  actionsToggle: '动作菜单展开/收起',
  customTrigger: '自定义触发器',
  toggle: '切换',
}

const open = ref(false)

function runAction(action) {
  Message.info(demoText[action] ?? String(action))
  open.value = false
}
</script>

<template>
  <div class="fab-demo-stage">
    <p>点击悬浮按钮展开或收起，点击动作按钮查看提示。下方参数实时生效。</p>
    <mp-fab v-model:open="open" :fixed="false" :popup-container="false" status="primary">
      <mp-button status="info" variant="tonal" :elevation="false" aria-label="查看用户" @click="runAction('profile')">
        <template #icon><m-icon-user-circle-fill /></template>
      </mp-button>
      <mp-button
        status="success"
        variant="tonal"
        :elevation="false"
        aria-label="标记完成"
        @click="runAction('complete')"
      >
        <template #icon><m-icon-checkbox-marked-circle-fill /></template>
      </mp-button>
      <mp-button status="warning" variant="tonal" :elevation="false" aria-label="发送提醒" @click="runAction('notify')">
        <template #icon><m-icon-bell-fill /></template>
      </mp-button>
    </mp-fab>
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  box-sizing: border-box;
  min-height: 250px;
  padding: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
.fab-demo-stage p {
  max-width: calc(100% - 72px);
  margin: 0;
  color: var(--mp-color-text-3);
  font-size: 13px;
  line-height: 1.5;
}
</style>
```

### Theme Color Button

Example source: src/fab/example/demos/status.vue

```vue
<script setup>
import { ref } from 'vue'

const demoText = {
  basic: '基础用法',
  preview: '实时预览',
  previewHint: '点击悬浮按钮展开或收起，点击动作按钮查看提示。下方参数实时生效。',
  dragHint: '拖拽模式：按钮位于屏幕角落，可用触摸拖动；关闭拖拽回到预览区。',
  hiddenState: '按钮已隐藏',
  expandedState: '动作已展开',
  collapsedState: '动作已收起',
  profile: '查看用户',
  complete: '标记完成',
  notify: '发送提醒',
  type: '主题色按钮',
  trigger: '触发方式',
  direction: '动作菜单弹出方向',
  position: '触发器位置',
  default: '默认',
  primary: '主要',
  info: '信息',
  success: '成功',
  warning: '警告',
  danger: '危险',
  drag: '拖拽',
  disabled: '禁用',
  elevation: '海拔效果',
  triggerToggle: '触发器显示/隐藏',
  actionsToggle: '动作菜单展开/收起',
  customTrigger: '自定义触发器',
  toggle: '切换',
}

const status = ref('primary')
</script>

<template>
  <mp-radio-group v-model="status">
    <mp-radio v-for="item in ['default', 'primary', 'info', 'success', 'warning', 'danger']" :key="item" :value="item">
      {{ demoText[item] ?? String(item) }}
    </mp-radio>
  </mp-radio-group>
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false" :status="status" />
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  min-height: 120px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

### Disabled

Example source: src/fab/example/demos/disabled.vue

```vue
<script setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>

<template>
  <mp-switch v-model="disabled" />
  <span class="fab-demo-label">禁用: {{ disabled }}</span>
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false" :disabled="disabled" status="primary">
      <mp-button status="info" variant="tonal" :elevation="false"
        ><template #icon><m-icon-user-circle-fill /></template
      ></mp-button>
    </mp-fab>
  </div>
</template>

<style scoped>
.fab-demo-label {
  margin-left: 8px;
}
.fab-demo-stage {
  position: relative;
  min-height: 180px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

### Trigger Position

Example source: src/fab/example/demos/position.vue

```vue
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
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false" :position="position" />
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  min-height: 210px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
  --mp-fab-top: 16px;
}
</style>
```

### Trigger Method

Example source: src/fab/example/demos/trigger.vue

```vue
<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-radio-group v-model="trigger">
    <mp-radio value="click">click</mp-radio>
    <mp-radio value="hover">hover</mp-radio>
  </mp-radio-group>
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false" :trigger="trigger" status="primary">
      <mp-button status="info" variant="tonal" :elevation="false"
        ><template #icon><m-icon-user-circle-fill /></template
      ></mp-button>
      <mp-button status="success" variant="tonal" :elevation="false"
        ><template #icon><m-icon-checkbox-marked-circle-fill /></template
      ></mp-button>
    </mp-fab>
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  min-height: 210px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

### Action Menu Popup Direction

Example source: src/fab/example/demos/direction.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const direction = ref('top')
const positions = { top: 'right-bottom', right: 'left-bottom', bottom: 'right-top', left: 'right-bottom' }
const position = computed(() => positions[direction.value])
</script>

<template>
  <mp-radio-group v-model="direction">
    <mp-radio value="top">top</mp-radio>
    <mp-radio value="right">right</mp-radio>
    <mp-radio value="bottom">bottom</mp-radio>
    <mp-radio value="left">left</mp-radio>
  </mp-radio-group>
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false" :position="position" :direction="direction" status="primary">
      <mp-button status="info" variant="tonal" :elevation="false"
        ><template #icon><m-icon-user-circle-fill /></template
      ></mp-button>
      <mp-button status="success" variant="tonal" :elevation="false"
        ><template #icon><m-icon-checkbox-marked-circle-fill /></template
      ></mp-button>
    </mp-fab>
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  min-height: 230px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
  --mp-fab-top: 16px;
}
</style>
```

### Drag

Example source: src/fab/example/demos/drag.vue

```vue
<script setup>
import { ref } from 'vue'

const drag = ref(false)
</script>

<template>
  <mp-switch v-model="drag" presentation="inline" />
  <span class="fab-demo-label">拖拽: {{ drag }}</span>
  <p class="fab-demo-hint">开启后可用触摸在预览区内拖动按钮；关闭后停止拖动。</p>
  <div class="fab-demo-stage">
    <mp-fab :drag="drag" :popup-container="false" />
  </div>
</template>

<style scoped>
.fab-demo-label {
  margin-left: 8px;
}
.fab-demo-hint {
  margin: 8px 0;
  color: var(--mp-color-text-3);
  font-size: 13px;
}
.fab-demo-stage {
  position: relative;
  min-height: 240px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

### Trigger Show/Hide

Example source: src/fab/example/demos/visibility.vue

```vue
<script setup>
import { ref } from 'vue'

const visible = ref(true)
</script>

<template>
  <mp-button status="primary" @click.stop="visible = !visible">切换</mp-button>
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false" :visible="visible" status="primary" />
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  min-height: 120px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

### Action Menu Expand/Collapse

Example source: src/fab/example/demos/controlled.vue

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <mp-button status="primary" @click.stop="open = !open">切换</mp-button>
  <span class="fab-demo-label">open: {{ open }}</span>
  <div class="fab-demo-stage">
    <mp-fab v-model:open="open" :fixed="false" :popup-container="false" status="primary">
      <mp-button status="info" variant="tonal" :elevation="false" @click="open = false"
        ><template #icon><m-icon-user-circle-fill /></template
      ></mp-button>
      <mp-button status="success" variant="tonal" :elevation="false" @click="open = false"
        ><template #icon><m-icon-checkbox-marked-circle-fill /></template
      ></mp-button>
    </mp-fab>
  </div>
</template>

<style scoped>
.fab-demo-label {
  margin-left: 8px;
}
.fab-demo-stage {
  position: relative;
  min-height: 210px;
  margin-top: 16px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
</style>
```

### Custom Trigger

Example source: src/fab/example/demos/custom-trigger.vue

```vue
<template>
  <div class="fab-demo-stage">
    <mp-fab :fixed="false" :popup-container="false">
      <mp-button status="info" variant="tonal" :elevation="false"
        ><template #icon><m-icon-user-circle-fill /></template
      ></mp-button>
      <mp-button status="success" variant="tonal" :elevation="false"
        ><template #icon><m-icon-checkbox-marked-circle-fill /></template
      ></mp-button>
      <template #trigger="{ open }">
        <mp-button class="custom-trigger" status="primary">
          <template #icon>
            <m-icon-heart-fill v-if="open" :size="24" />
            <m-icon-heart-half-full v-else :size="24" />
          </template>
        </mp-button>
      </template>
    </mp-fab>
  </div>
</template>

<style scoped>
.fab-demo-stage {
  position: relative;
  min-height: 210px;
  overflow: hidden;
  border: 1px dashed var(--mp-color-border-2);
  border-radius: 8px;
}
.custom-trigger {
  width: 64px !important;
  height: 64px !important;
  border-radius: 8px !important;
}
</style>
```

### visible versus v-if

Use `<mp-fab v-if="showFab" />` when destroying the instance is acceptable; visible is optional. v-if=false destroys FAB, its drag state and action children; remounting reads defaultOpen again. `:visible="showFab"` retains the instance and internal state while hiding its trigger and actions. FAB uses Drag/Teleport, so visible controls the actual content internally; avoid relying on v-show on the Teleport component. The action menu itself still uses open.

## API

Bind `v-model:open` to control the action menu. Otherwise, `defaultOpen` initializes internal state once. `visible` controls the entire widget without resetting its open state. The trigger slot receives `{ open }`.

### Props

| Prop  | Description  | Type      | Default        |
| ------- | ---- | ----- | ---- |
| `v-model:open` | Whether to activate the action menu | _boolean_ | `false` |
| `default-open` | Initial uncontrolled action-menu state, read only at creation | _boolean_ | `false` |
| `visible` | Whether to show the whole widget | _boolean_ | `true` |
| `drag` | Drag component props, for deep customization (support `direction` `attraction` `boundary`） | _boolean \| DragProps_ | `false` |
| `status` | Semantic status, optional values are `default` `primary` `info` `success` `warning` `danger` | _string_ | `primary` |
| `position` | trigger position, optional values are `left-top` `right-top` `left-bottom` `right-bottom` | _string_ | `right-bottom` |
| `direction` | Action menu popup direction, optional values are `top` `bottom` `left` `right` | _string_ | `top` |
| `trigger` | trigger method `click` `hover` | _string_ | `click` |
| `disabled` | Whether to disable | _boolean_ | `false` |
| `color` | trigger color | _string_ | `-` |
| `closed-icon` | Inactive trigger icon | _string_ | `plus` |
| `open-icon` | trigger icon when open | _string_ | `close` |
| `closed-icon-size` | Inactive trigger icon size | _string \| number_ | `-` |
| `open-icon-size` | Trigger icon size when open | _string \| number_ | `-` |
| `fixed` | Whether to use fixed positioning, set to `false` to enable absolute positioning (absolute positioning prohibited from dragging) | _boolean_ | `true` |
| `z-index` | Same as css z-index, used for custom trigger level | _string \| number_ | `90` |
| `top` | Same as css top, for custom trigger position | _string \| number_ | `-` |
| `bottom` | Same as css bottom, for custom trigger position | _string \| number_ | `-` |
| `left` | Same as css left, for custom trigger position | _string \| number_ | `-` |
| `right` | Same as css right, for custom trigger position | _string \| number_ | `-` |
| `safe-area` | Whether to enable bottom safe area adaptation	 | _boolean_ | `false` |
| `popup-container` | element to which the component mounts | _TeleportProps['to'] \| false_ | `body` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_|   `true`    |

### Events

| Event | Description  | Arguments  |
| ---- | ---- | ---- |
| `click` | Triggered when the trigger is clicked, not triggered when `disabled` state is `true` | `open: boolean, event: Event` |
| `open` | Fires when the action menu is activated and opened | `-` |
| `opened` | Fires at the end of the animation that activates and opens the action menu | `-` |
| `close` | Triggered when the action menu is deactivated and closed | `-` |
| `closed` | Fires when the animation of inactivating and closing the action menu ends | `-` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Action menu | `-` |
| `trigger` | Trigger | `{ open: boolean }` |


### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable  | Default  |
| ---------- | -------- |
| `--fab-top` | `70px` |
| `--fab-bottom` | `16px` |
| `--fab-left` | `16px` |
| `--fab-right` | `16px` |
| `--fab-trigger-size` | `56px` |
| `--fab-trigger-border-radius` | `50%` |
| `--mp-fab-trigger-inactive-icon-size` | `26px` |
| `--mp-fab-trigger-active-icon-size` | `22px` |
| `--fab-actions-padding` | `10px 0` |
| `--fab-action-margin` | `6px` |
| `--fab-action-size` | `40px` |
| `--fab-action-border-radius` | `50%` |
| `--fab-transition-standard-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` |
