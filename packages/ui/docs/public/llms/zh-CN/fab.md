<!-- Source: src/fab/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/fab -->

# 悬浮动作按钮

### 介绍

悬浮动作按钮组件，按下可显示一组动作按钮。

右侧示例提供实时预览区，初始展开动作，点击动作后弹出 Message 并收起。调整方向时会将按钮移到可容纳菜单的一侧，避免菜单跑出屏幕。hover 适合鼠标操作，触摸设备建议使用 click。

普通预览使用 `fixed=false`、`popup-container=false`，定位在预览容器内。拖拽示例保留默认的 `fixed=true` 以启用拖拽能力，使用 `popup-container=false` 将按钮留在预览容器内，拖动边界按容器尺寸计算。拖拽使用触摸手势。

开启或关闭拖拽时，预览区和按钮持续显示；关闭后停止拖动。预览区随页面正常滚动。

## 基础示例

### 基础用法

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

## 外观与状态

### 主题色按钮

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `fixed` | 是否使用固定定位，设置为 `false` 可开启绝对定位（绝对定位无法使用拖拽） | 主题色按钮、禁用 |
| `popup-container` | 组件挂载的元素 | 主题色按钮、禁用 |
| `status` | 状态，可选值为 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | 主题色按钮、禁用 |
| `disabled` | 是否禁用 | 禁用 |
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

## 外观与定位

### 触发器位置

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `fixed` | 是否使用固定定位，设置为 `false` 可开启绝对定位（绝对定位无法使用拖拽） | 触发器位置 |
| `popup-container` | 组件挂载的元素 | 触发器位置 |
| `position` | 按钮自身在屏幕或定位容器中的角落，默认 bottom-right；四角统一使用上下在前的拼写 | 触发器位置 |
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

## 动作与交互

### 触发方式

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `popup-container` | 组件挂载的元素 | 触发方式、动作菜单弹出方向、开启拖拽 |
| `fixed` | 是否使用固定定位，设置为 `false` 可开启绝对定位（绝对定位无法使用拖拽） | 触发方式、动作菜单弹出方向、整体显示/隐藏 |
| `status` | 状态，可选值为 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | 触发方式、动作菜单弹出方向、整体显示/隐藏 |
| `trigger` | 触发方式 `click` `hover` | 触发方式 |
| `position` | 按钮自身在屏幕或定位容器中的角落，默认 bottom-right；四角统一使用上下在前的拼写 | 动作菜单弹出方向 |
| `placement` | 动作菜单相对按钮的放置侧，默认 top；不会自动翻转，不改变按钮自身 position | 动作菜单弹出方向 |
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

### 动作菜单弹出方向

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

### 开启拖拽

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

### visible 与 v-if

不需要保留实例时，直接使用 `<mp-fab v-if="showFab" />`，无需再传 visible。v-if=false 会销毁 FAB、拖拽状态与动作子组件；重新显示会重新读取 defaultOpen。`:visible="showFab"` 保留实例和内部状态，只隐藏触发器与动作内容。FAB 默认通过 Drag/Teleport 挂到弹层容器，visible 在实际内容内部控制显示；不要依赖对 Teleport 组件直接使用 v-show。动作菜单自身仍使用 open。

默认图标按钮有本地化名称；可通过 `aria-label` 或 `aria-labelledby` 指定名称。若有动作，触发器还暴露 `aria-expanded` 和 `aria-controls`。自定义触发器应把 `triggerProps` 绑定到实际可聚焦按钮，并由业务自行处理禁用。

hover 模式支持触发器上的 Enter/Space；焦点仍在触发器或动作区时鼠标离开不会收起，焦点与鼠标均离开时收起。Escape 请求关闭，焦点位于动作区时回到触发器。动作点击不会自动关闭，业务可使用 `v-model:open` 收起。

`open`/`close` 表示交互请求，受控父级可以拒绝；外部改变 `open` 或禁用时的状态变化不保证产生相应请求事件。`opened`/`closed` 在动画结束时提供动作区元素。位置与展开方向均是物理方向，动作区不会自动翻转；`FabDrag` 为 boolean 或包含 `axis`、`attraction`、`boundary` 的对象。

## 使用说明

### 配置说明

按需直接导入时，请同时导入 `@maple-design/ui-vue/fab/style`；也可使用全量样式 `@maple-design/ui-vue/style`。

## API

`open` / `update:open` 通过 `v-model:open` 控制动作菜单展开；未绑定时使用 `defaultOpen` 初始化，之后由组件维护。`visible` 控制整个组件显示，不改变动作菜单保存的展开状态。`trigger` 插槽参数为 `{ open, triggerProps }`，自定义原生按钮应使用 `v-bind="triggerProps"`。

### Fab Props

| 参数              | 说明                                                             | 类型     | 默认值        |
|------------------|----------------------------------------------------------------- |----------|----------------|
| `v-model:open` | 动作菜单是否展开                                                    | _boolean_ | `false`       |
| `default-open` | 非受控初始展开状态，仅创建时读取 | _boolean_ | `false` |
| `visible`           | 是否显示整个组件 | _boolean_ | `true`    |
| `drag`      | Drag 组件配置，用于深度定制（支持 `axis` `attraction` `boundary`） | _FabDrag_  | `false`    |
| `status`         | 状态，可选值为 `default` `primary` `secondary` `tertiary` `info` `success` `warning` `danger` | _string_ | `primary`    |
| `position` | 按钮自身在屏幕或定位容器中的角落，默认 bottom-right；四角统一使用上下在前的拼写 | _string_ | `bottom-right`    |
| `placement` | 动作菜单相对按钮的放置侧，默认 top；不会自动翻转，不改变按钮自身 position | _string_ | `top`    |
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
| `safe-area` | 是否按 position 避让所在角落的上下及左右安全区	 | _boolean_ | `false` |
| `popup-container` | 组件挂载的元素 | _TeleportProps['to'] \| false_ | `body` |
| `elevation`      | 海拔高度，可选值为 `true`、`false` 和 `0-24` 的等级 | _number \| boolean_ | `true`            |

### Fab Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击触发器时触发，在 `disabled` 状态为 `true` 时不触发 | `open: boolean, event: Event` |
| `open` | 在激活并打开动作菜单时触发 | `-` |
| `opened` | 动作区打开动画结束 | `element: Element` |
| `close` | 在失活并关闭动作菜单时触发 | `-` |
| `closed` | 动作区关闭动画结束 | `element: Element` |

### Fab Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 动作菜单 |  `-` |
| `trigger` | 触发器 | `{ open: boolean, triggerProps: FabTriggerProps }` |

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
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

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-fab-action-border-radius: 50%;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
