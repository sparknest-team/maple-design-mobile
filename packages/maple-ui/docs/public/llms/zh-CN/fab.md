<!-- Source: src/fab/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/fab -->

# 悬浮动作按钮

## 案例

### 介绍

悬浮动作按钮组件，按下可显示一组动作按钮。

右侧示例提供实时预览区，初始展开动作，点击动作后弹出 Message 并收起。调整方向时会将按钮移到可容纳菜单的一侧，避免菜单跑出屏幕。hover 适合鼠标操作，触摸设备建议使用 click。

普通预览使用 `fixed=false`、`popup-container=false`，定位在预览容器内。拖拽示例保留默认的 `fixed=true` 以启用拖拽能力，使用 `popup-container=false` 将按钮留在预览容器内，拖动边界按容器尺寸计算。拖拽使用触摸手势。

开启或关闭拖拽时，预览区和按钮持续显示；关闭后停止拖动。预览区随页面正常滚动。

### 基础用法

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

### 主题色按钮

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

### 禁用

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

### 触发器位置

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

### 触发方式

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

### 动作菜单弹出方向

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

### 开启拖拽

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

### 整体显示/隐藏

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

### 动作菜单展开/收起

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

### 自定义触发器

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

### visible 与 v-if

不需要保留实例时，直接使用 `<mp-fab v-if="showFab" />`，无需再传 visible。v-if=false 会销毁 FAB、拖拽状态与动作子组件；重新显示会重新读取 defaultOpen。`:visible="showFab"` 保留实例和内部状态，只隐藏触发器与动作内容。FAB 默认通过 Drag/Teleport 挂到弹层容器，visible 在实际内容内部控制显示；不要依赖对 Teleport 组件直接使用 v-show。动作菜单自身仍使用 open。

## API

`open` / `update:open` 通过 `v-model:open` 控制动作菜单展开；未绑定时使用 `defaultOpen` 初始化，之后由组件维护。`visible` 控制整个组件显示，不改变动作菜单保存的展开状态。`trigger` 插槽参数为 `{ open }`。

### 属性

| 参数              | 说明                                                             | 类型     | 默认值        |
|------------------|----------------------------------------------------------------- |----------|----------------|
| `v-model:open` | 动作菜单是否展开                                                    | _boolean_ | `false`       |
| `default-open` | 非受控初始展开状态，仅创建时读取 | _boolean_ | `false` |
| `visible`           | 是否显示整个组件 | _boolean_ | `true`    |
| `drag`      | Drag 组件配置，用于深度定制（支持 `direction` `attraction` `boundary`） | _boolean \| DragProps_  | `false`    |
| `status`         | 状态，可选值为 `default` `primary` `info` `success` `warning` `danger` | _string_ | `primary`    |
| `position` | 触发器位置，可选值为 `left-top` `right-top` `left-bottom` `right-bottom` | _string_ | `right-bottom`    |
| `direction` | 动作菜单弹出方向，可选值为 `top` `bottom` `left` `right` | _string_ | `top`    |
| `trigger` | 触发方式 `click` `hover` | _string_ | `click`    |
| `disabled` | 是否禁用 | _boolean_ | `false`    |
| `color` | 触发器颜色 | _string_ | `-`    |
| `closed-icon` | 未展开时触发器图标 | _string_ | `plus`    |
| `open-icon` | 展开时触发器图标 | _string_ | `close`    |
| `closed-icon-size` | 未展开时触发器图标尺寸 | _string \| number_ | `-` |
| `open-icon-size` | 展开时触发器图标尺寸 | _string \| number_ | `-` |
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
| `click` | 点击触发器时触发，在 `disabled` 状态为 `true` 时不触发 | `open: boolean, event: Event` |
| `open` | 在激活并打开动作菜单时触发 | `-` |
| `opened` | 在激活并打开动作菜单的动画结束时触发 | `-` |
| `close` | 在失活并关闭动作菜单时触发 | `-` |
| `closed` | 在失活并关闭动作菜单的动画结束时触发 | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 动作菜单 |  `-` |
| `trigger` | 触发器 | `{ open: boolean }` |


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
| `--mp-fab-trigger-inactive-icon-size` | `26px` |
| `--mp-fab-trigger-active-icon-size` | `22px` |
| `--fab-actions-padding` | `10px 0` |
| `--fab-action-margin` | `6px` |
| `--fab-action-size` | `40px` |
| `--fab-action-border-radius` | `50%` |
| `--fab-transition-standard-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` |
