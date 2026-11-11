<!-- Source: src/signature/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/signature -->

# 签名

### 介绍

基于 `Canvas` 的签名组件。

## 基础示例

### 基本使用

通过组件方法 `confirm` 获取画布的 `data url`，画布为空时会获取到 `空字符串`。

Example source: src/signature/example/demos/basic-usage.vue

```vue
<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'

const signature = ref('')
const signatureRef = ref()
function confirmSignature() {
  signature.value = signatureRef.value.confirm()
}
function resetSignature() {
  signature.value = ''
  signatureRef.value.reset()
}
onThemeChange(() => {
  signatureRef.value?.reset()
  signature.value = ''
})
</script>

<template>
  <mp-signature ref="signatureRef" />
  <mp-space class="gap">
    <mp-button status="primary" @click="confirmSignature">确认</mp-button>
    <mp-button status="primary" @click="resetSignature">重置</mp-button>
  </mp-space>
  <img v-if="signature" class="gap" :src="signature" />
</template>

<style scoped>
.gap {
  margin-top: 10px !important;
}
</style>
```

## 自定义与插槽

### 自定义样式

可以通过 `stroke-style`、`line-width` 自定义签名的样式，`stroke-style` 默认是 `currentColor`，会继承文字颜色，所以也可以通过 `css color` 来设置颜色。

Example source: src/signature/example/demos/custom-style.vue

```vue
<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'

const customStyleSignature = ref('')
const customStyleSignatureRef = ref()
function confirmCustomStyleSignature() {
  customStyleSignature.value = customStyleSignatureRef.value.confirm()
}
function clearCustomStyleSignature() {
  customStyleSignature.value = ''
  customStyleSignatureRef.value.reset()
}
onThemeChange(() => {
  customStyleSignatureRef.value?.reset()
  customStyleSignature.value = ''
})
</script>

<template>
  <mp-signature ref="customStyleSignatureRef" style="color: var(--mp-sys-color-content-primary)" :line-width="4" />
  <mp-space class="gap">
    <mp-button status="primary" @click="confirmCustomStyleSignature">确认</mp-button>
    <mp-button status="primary" @click="clearCustomStyleSignature">重置</mp-button>
  </mp-space>
  <img v-if="customStyleSignature" :src="customStyleSignature" class="gap" />
</template>

<style scoped>
.gap {
  margin-top: 10px !important;
}
</style>
```

## 书写会话

### 书写会话取消

一笔由发起时的单个 touch identifier 持有；额外触点不重开当前笔画，其他触点的 move/end 以及早于本次 start 的事件不能接管它。原生 `touchcancel`、重置、KeepAlive 停用、卸载、所属窗口失焦、所属文档隐藏，以及原有尺寸重置都会让活动会话结束一次；正常抬手同样只发一次 `end`，没有活动笔画时清理不制造事件。取消或再次激活后，旧触点继续移动不能恢复书写，必须重新 `touchstart`。

`end` 表示交互结束，包含取消，不代表自动保存或校验任务。取消保留已绘制内容；显式重置会先清空画布再通知 `end`。普通事件回调返回的 Promise 不被等待。示例在 start 通知中由业务安排重置/停用，并在会话结束后清理计时器，不通过伪造浏览器取消事件展示功能。尺寸变化的笔迹保留和位图导出见下文。

Example source: src/signature/example/demos/session-lifecycle.vue

```vue
<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import type { SignatureInstance } from '../..'

const pad = ref<SignatureInstance>()
const visible = ref(true)
const nextCleanup = ref<'none' | 'reset' | 'pause'>('none')
const starts = ref(0)
const signs = ref(0)
const ends = ref(0)
const status = ref('触屏落笔后移动；结束事件只表示交互结束 / Draw with touch; end is an interaction notification')
let timer: ReturnType<typeof setTimeout> | undefined
function clearPending() {
  if (timer !== undefined) {
    clearTimeout(timer)
  }
  timer = undefined
}
function start() {
  starts.value++
  clearPending()
  const cleanup = nextCleanup.value
  nextCleanup.value = 'none'
  if (cleanup === 'none') {
    status.value = '正在书写 / Writing'
    return
  }
  status.value = '保持触点，1 秒后取消本次交互 / Keep touching; the interaction stops in one second'
  timer = setTimeout(() => {
    timer = undefined
    if (cleanup === 'reset') {
      pad.value?.reset()
      status.value = '已重置，需重新落笔 / Reset; a fresh touchstart is required'
    } else {
      visible.value = false
      status.value = '已停用，恢复后需重新落笔 / Paused; resume and start a new stroke'
    }
  }, 1000)
}
function end() {
  ends.value++
  clearPending()
  if (visible.value) {
    status.value = '本次交互已结束 / Interaction ended'
  }
}
function resume() {
  visible.value = true
  status.value = '已恢复，请重新落笔 / Resumed; start a fresh stroke'
}
function resetNow() {
  if (!pad.value) {
    return
  }
  clearPending()
  pad.value.reset()
  status.value = '已重置，需重新落笔 / Reset; a fresh touchstart is required'
}
function arm(cleanup: 'reset' | 'pause') {
  nextCleanup.value = cleanup
  status.value = '下次落笔后等待 1 秒 / Touch down, then wait one second'
}
onBeforeUnmount(clearPending)
</script>
<template>
  <mp-space direction="column" style="width: 100%" :size="16">
    <p>
      先选择自动重置或停用，再用触屏书写并保持触点。后续移动不应延续已取消笔画。Arm a cleanup, then draw and keep the
      contact down; later moves must not resume the canceled stroke.
    </p>
    <KeepAlive>
      <mp-signature
        v-if="visible"
        ref="pad"
        role="img"
        aria-label="签名书写区域 / Signature pad"
        @start="start"
        @signing="signs++"
        @end="end"
      />
    </KeepAlive>
    <mp-space wrap>
      <mp-button @click="arm('reset')">下次自动重置 / Arm reset</mp-button>
      <mp-button @click="arm('pause')">下次自动停用 / Arm pause</mp-button>
      <mp-button @click="resume">恢复签名区 / Resume pad</mp-button>
      <mp-button :disabled="!visible" @click="resetNow">立即重置 / Reset now</mp-button>
    </mp-space>
    <p role="status">start: {{ starts }}；signing: {{ signs }}；end: {{ ends }}；{{ status }}</p>
  </mp-space>
</template>
```

## 绘制与导出边界

目前只处理触摸输入，不提供鼠标、手写笔或键盘绘制。业务应提供清晰说明和可访问的替代签署方式，例如上传已有签名或其他非画布流程；本组件不判断签名法律效力。轻点并抬手会留下圆点，移动会从起点连线，笔帽和连接处为圆形；取消不会新增圆点。

画布按容器尺寸和设备像素比设置位图。容器尺寸变化时按新尺寸缩放已有位图；隐藏导致尺寸为零时保留原图，重新显示后恢复。重复缩放可能产生像素插值。支持 ResizeObserver 的浏览器会跟踪容器变化，否则在窗口 resize 时更新；设备像素比变化也在窗口 resize 时更新。

PNG 保留透明背景；JPEG 使用白色背景，因此白色笔迹在 JPEG 中可能不可见。根元素的 CSS 背景只用于显示，不会进入 PNG 或替换 JPEG 的白底。`line-width` 为正有限数或可解析的数字字符串，允许小于 1 的笔宽；无效值回退 2px。`stroke-style` 使用 Canvas 支持的颜色；`currentColor` 在起笔时读取组件颜色。

## API

### Signature Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `stroke-style` | 画笔颜色 | _string_ | `currentColor` |
| `line-width` | 画笔粗细 | _string \| number_ | `2` |
| `data-url-type` | 生成图片的格式 | _'png' \| 'jpg'_ | `'png'` |

### Signature Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `start` | 开始签名时触发 | `-` |
| `signing` | 签名过程中触发 | `-` |
| `end` | 结束签名时触发 | `-` |

### Signature Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `reset` | 重置签名 | `-` | `-` |
| `confirm` | 返回图片 data URL；空画布返回空字符串，画布未挂载时返回 undefined | `-` | `string \| undefined` |

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-signature-background-color` | `var(--mp-color-fill-3)` | `background` |
| `--mp-signature-border-radius` | `4px` | `border-radius` |
| `--mp-signature-height` | `200px` | `height` |
| `--mp-signature-stroke-color` | `#333` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-signature-background-color: var(--mp-color-fill-3);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
