<!-- Source: src/fab/docs/en-US.md; locale: en-US; page: /en-US/fab -->

# Fab

### Intro

The floating action button component, press to display a group of action buttons.

The live preview starts expanded. Actions show a Message and collapse the menu. Changing direction moves the button to a compatible edge. Use click on touch devices; hover is intended for a mouse.

The local preview uses `fixed=false` and `popup-container=false`. The drag example keeps the default `fixed=true` to enable dragging and uses `popup-container=false` to keep the button inside the preview container. Drag boundaries use the container dimensions. Dragging uses touch gestures.

The preview and button remain visible when toggling dragging. Switching it off stops dragging. The preview scrolls with the page.

## Basic examples

### Basic Usage

Example source: src/fab/example/demos/basic.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message } from '@maple-design/ui-vue'

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

## Appearance and states

### Theme Color Button

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `fixed` | Whether to use fixed positioning, set to `false` to enable absolute positioning (absolute positioning prohibited from dragging) | Theme Color Button, Disabled |
| `popup-container` | element to which the component mounts | Theme Color Button, Disabled |
| `status` | Semantic status, optional values are `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | Theme Color Button, Disabled |
| `disabled` | Whether disabled | Disabled |
<!-- demo-config-notes:end -->


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

## Appearance and positioning

### Trigger Position

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `fixed` | Whether to use fixed positioning, set to `false` to enable absolute positioning (absolute positioning prohibited from dragging) | Trigger Position |
| `popup-container` | element to which the component mounts | Trigger Position |
| `position` | Corner of the button itself within the screen or positioning container, default bottom-right. Corner values use vertical-first spelling | Trigger Position |
<!-- demo-config-notes:end -->


Example source: src/fab/example/demos/position.vue

```vue
<script setup>
import { ref } from 'vue'

const position = ref('bottom-right')
</script>

<template>
  <mp-radio-group v-model="position">
    <mp-radio value="top-left">top-left</mp-radio>
    <mp-radio value="top-right">top-right</mp-radio>
    <mp-radio value="bottom-left">bottom-left</mp-radio>
    <mp-radio value="bottom-right">bottom-right</mp-radio>
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

## Actions and interaction

### Trigger Method

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `popup-container` | element to which the component mounts | Trigger Method, Action Menu Popup Direction, Drag |
| `fixed` | Whether to use fixed positioning, set to `false` to enable absolute positioning (absolute positioning prohibited from dragging) | Trigger Method, Action Menu Popup Direction, Trigger Show/Hide |
| `status` | Semantic status, optional values are `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | Trigger Method, Action Menu Popup Direction, Trigger Show/Hide |
| `trigger` | Trigger: `click`/`hover` | Trigger Method |
| `position` | Corner of the button itself within the screen or positioning container, default bottom-right. Corner values use vertical-first spelling | Action Menu Popup Direction |
| `placement` | Action-menu placement relative to the button, default top; no automatic flipping. Does not change the button position | Action Menu Popup Direction |
<!-- demo-config-notes:end -->


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
const positions = { top: 'bottom-right', right: 'bottom-left', bottom: 'top-right', left: 'bottom-right' }
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
    <mp-fab :fixed="false" :popup-container="false" :position="position" :placement="direction" status="primary">
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
  <mp-switch v-model="drag" edit-mode="direct" />
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
      <template #trigger="{ open, triggerProps }">
        <mp-button v-bind="triggerProps" class="custom-trigger" status="primary">
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

The default icon button has a localized name; pass `aria-label` or `aria-labelledby` to customize it. When actions exist, the trigger also exposes `aria-expanded` and `aria-controls`. Bind the `triggerProps` slot value to a custom focusable button; the application owns its disabled state.

Hover mode supports Enter/Space on the trigger. It stays open while focus remains on the trigger or actions after the pointer leaves, and closes when both pointer and focus leave. Escape requests close and returns focus to the trigger when focus was in the actions. Action clicks do not close automatically; control `v-model:open` in the application when desired.

`open` and `close` are interaction requests which a controlled parent may reject. External model changes and disabling do not necessarily emit matching request events. `opened`/`closed` receive the action element after the animation. Position and placement use physical sides without automatic flipping; `FabDrag` is a boolean or an object with `axis`, `attraction`, and `boundary`.

## Usage notes

### Configuration

When importing on demand, also import `@maple-design/ui-vue/fab/style`, or use the full stylesheet `@maple-design/ui-vue/style`.

## API

`open`/`update:open` control the action menu through `v-model:open`. Without binding, `defaultOpen` initializes internally maintained state. `visible` controls the whole component without changing saved menu-`open` state. The `trigger` slot receives `{ open, triggerProps }`; bind `triggerProps` to its actual focusable button.

### Fab Props

| Prop | Description | Type | Default |
| ------------------ | ----------------------------------------------------------------- | ---------- | ---------------- |
| `v-model:open` | Whether to activate the action menu | _boolean_ | `false` |
| `default-open` | Initial uncontrolled action-menu state, read only at creation | _boolean_ | `false` |
| `visible` | Whether to show the whole widget | _boolean_ | `true` |
| `drag` | Drag component props, for deep customization (support `axis` `attraction` `boundary`） | _FabDrag_ | `false` |
| `status` | Semantic status, optional values are `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `primary` |
| `position` | Corner of the button itself within the screen or positioning container, default bottom-right. Corner values use vertical-first spelling | _string_ | `bottom-right` |
| `placement` | Action-menu placement relative to the button, default top; no automatic flipping. Does not change the button position | _string_ | `top` |
| `trigger` | Trigger: `click`/`hover` | _string_ | `click` |
| `disabled` | Whether disabled | _boolean_ | `false` |
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
| `safe-area` | Whether to respect the vertical and horizontal safe areas at the corner selected by position | _boolean_ | `false` |
| `popup-container` | element to which the component mounts | _TeleportProps['to'] \| false_ | `body` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_ | `true` |

### Fab Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered when the trigger is clicked, not triggered when `disabled` state is `true` | `open: boolean, event: Event` |
| `open` | Fires when the action menu is activated and opened | `-` |
| `opened` | The action region finished opening | `element: Element` |
| `close` | Triggered when the action menu is deactivated and closed | `-` |
| `closed` | The action region finished closing | `element: Element` |

### Fab Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `default` | Action menu | `-` |
| `trigger` | Trigger | `{ open: boolean, triggerProps: FabTriggerProps }` |

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-fab-action-border-radius` | `50%` | `border-radius` |
| `--mp-fab-action-margin` | `6px` | `margin` |
| `--mp-fab-action-size` | `40px` | `height`, `min-width`, `width` |
| `--mp-fab-actions-padding` | `10px 0` | `padding` |
| `--mp-fab-bottom` | `16px` | `bottom` |
| `--mp-fab-left` | `16px` | `left` |
| `--mp-fab-right` | `16px` | `right` |
| `--mp-fab-top` | `70px` | `top` |
| `--mp-fab-transition-standard-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | `transition` |
| `--mp-fab-trigger-active-icon-size` | `22px` | `font-size` |
| `--mp-fab-trigger-border-radius` | `50%` | `border-radius` |
| `--mp-fab-trigger-inactive-icon-size` | `26px` | `font-size` |
| `--mp-fab-trigger-size` | `56px` | `height`, `min-width`, `width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-fab-action-border-radius: 50%;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
