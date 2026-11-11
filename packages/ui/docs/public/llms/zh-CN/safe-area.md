<!-- Source: src/safe-area/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/safe-area -->

# SafeArea 安全区

为贴近屏幕边缘的内容预留空间，避免被刘海、圆角或底部手势区域遮挡。浏览器通常自动提供安全区；App WebView 也可以传入自己的边距。

## 什么时候用

| 页面情况                           | 建议                                         |
| ---------------------------------- | -------------------------------------------- |
| 普通页面，没有贴边内容             | 通常无需额外设置                             |
| 底部操作栏、全屏内容靠近设备边缘   | 用 SafeArea 包裹需要避让的区域，指定 `edges` |
| Popup、TabBar 等组件已经开启安全区 | 使用组件自身的开关，避免外层再次添加相同留白 |
| App 已经为 WebView 避让            | 显式传入对应边的 `0`                         |

## 基础示例

### 底部留白与嵌套

先看最常见的底部操作栏。斜纹表示安全区，修改数值可在桌面浏览器中观察效果；关闭嵌套保护可对比重复留白。

Example source: src/safe-area/example/demos/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const bottom = ref(24)
const consume = ref(true)
</script>

<template>
  <section class="safe-area-basic" aria-label="底部安全区与嵌套">
    <div class="safe-area-basic__controls">
      <label class="safe-area-basic__inset-label"
        >底部留白（CSS px）<mp-input-number v-model="bottom" :min="0" :max="80" aria-label="底部留白"
      /></label>
      <mp-checkbox v-model="consume">避免嵌套重复留白</mp-checkbox>
    </div>
    <p>斜纹是安全区，实色是内容。将底部设为 0，或关闭嵌套保护，比较留白变化。</p>
    <mp-safe-area class="safe-area-basic__outer" :edges="['bottom']" :insets="{ bottom }" :consume="consume">
      <div class="safe-area-basic__content">
        <p>页面内容</p>
        <mp-safe-area class="safe-area-basic__nested" :edges="['bottom']">
          <div class="safe-area-basic__action"><mp-button status="primary" block>底部操作栏</mp-button></div>
        </mp-safe-area>
      </div>
    </mp-safe-area>
    <p role="status">外层 {{ bottom }}px · 嵌套 {{ consume ? 0 : bottom }}px</p>
  </section>
</template>

<style scoped>
.safe-area-basic__controls {
  display: grid;
  gap: 12px;
}
.safe-area-basic__inset-label {
  display: grid;
  gap: 8px;
}
.safe-area-basic__outer,
.safe-area-basic__nested {
  background: repeating-linear-gradient(
    135deg,
    var(--mp-sys-color-surface-muted) 0 6px,
    var(--mp-sys-color-border-default) 6px 12px
  );
}
.safe-area-basic__outer {
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-md);
  overflow: hidden;
}
.safe-area-basic__content > p,
.safe-area-basic__action {
  margin: 0;
  padding: 16px;
  background: var(--mp-sys-color-surface-default);
}
</style>
```

## 页面与组件组合

### App 页面模拟

选择竖屏、横屏、Duo 左右不对称模拟或四边归零，观察滚动内容、固定提交栏和字段弹层。四边可独立输入 0–120 CSS px；横屏默认缩放到可用宽度，也可切换原尺寸查看。

页面避让上、左、右，提交栏只避让底部；嵌套容器不重复增加留白。测量区显示实际 padding，弹层数值包含其原有内容间距。表单状态、上传和日期等附加控制放在“更多表单选项”中。

Example source: src/safe-area/example/demos/app-form.vue

```vue
<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import demoVideo from './assets/drive.webm?url'
import { duoViewports } from './duo-presets'

const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)
const readPretty = ref(false)
const editMode = ref('direct')
const fieldVariant = ref('outline')
const fieldSize = ref('md')
const calendarMode = ref('page')
const calendarZone = ref('Asia/Shanghai')
const rangeLock = ref('none')
const dateScenario = ref('cross-month')
const rangeLocks = computed(() => [
  rangeLock.value === 'start' || rangeLock.value === 'both',
  rangeLock.value === 'end' || rangeLock.value === 'both',
])
const guardMode = ref('allow')
const guardedOpen = ref(false)
const guardedPopup = ref(null)
const guardMessage = ref('')
async function beforeClose({ reason }, _done, { signal }) {
  guardMessage.value = `正在检查：${reason}`
  await new Promise((resolve) => {
    const timer = setTimeout(resolve, 500)
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(timer)
        resolve()
      },
      { once: true },
    )
  })
  if (signal.aborted) {
    return false
  }
  if (guardMode.value === 'error') {
    throw new Error('模拟关闭检查失败')
  }
  guardMessage.value = `${reason}：${guardMode.value === 'allow' ? '允许关闭' : '保留弹层和草稿'}`
  return guardMode.value === 'allow'
}
const result = ref('')
const uploadScenario = ref('success')
const uploadLayout = ref('picture-card')
const protectFiles = ref(false)
const uploadTimers = new Set()
const failedUploads = new Set()
const model = reactive({
  name: '',
  phone: '13800000000',
  city: 'shanghai',
  location: ['east', 'shanghai'],
  date: '2026-11-01',
  zonedAppointment: Date.parse('2026-11-01T03:30:00Z'),
  tripRange: [Date.parse('2026-10-31T14:30:00Z'), Date.parse('2026-11-02T15:00:00Z')],
  time: '10:30:00',
  passengers: 2,
  service: 'test-drive',
  features: ['charging'],
  notice: true,
  note: '',
  files: [],
})
const instantDescription = computed(() => {
  if (model.zonedAppointment == null || !Number.isFinite(new Date(model.zonedAppointment).getTime())) {
    return '未选择真实时刻'
  }
  const date = new Date(model.zonedAppointment)
  return `${date.toISOString()}；${new Intl.DateTimeFormat('zh-CN', { timeZone: calendarZone.value, dateStyle: 'short', timeStyle: 'long' }).format(date)}`
})
const cities = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
  { label: '广州（暂未开放）', value: 'guangzhou', disabled: true },
]
watch(dateScenario, (scenario) => {
  const presets = {
    'cross-month': ['America/New_York', '2026-10-31T14:30:00Z', '2026-11-02T15:00:00Z'],
    'dst-gap': ['America/New_York', '2026-03-08T06:30:00Z', '2026-03-08T07:30:00Z'],
    'dst-fold': ['America/New_York', '2026-11-01T05:30:00Z', '2026-11-01T07:30:00Z'],
    'dst-fold-late': ['America/New_York', '2026-11-01T06:30:00Z', '2026-11-01T07:30:00Z'],
    'dst-half-hour': ['Australia/Lord_Howe', '2026-10-03T15:00:00Z', '2026-10-03T16:00:00Z'],
  }
  const [zone, start, end] = presets[scenario]
  calendarZone.value = zone
  model.zonedAppointment = Date.parse(start)
  model.tripRange = [Date.parse(start), Date.parse(end)]
})
const locations = [
  {
    label: '华东',
    value: 'east',
    children: [
      { label: '上海', value: 'shanghai' },
      { label: '杭州', value: 'hangzhou' },
    ],
  },
]
const requiredName = [(value) => Boolean(value?.trim()) || '请填写联系人姓名']
function reset() {
  form.value?.reset()
  result.value = ''
}
function uploadRequest({ file, onProgress, onSuccess, onError }) {
  // Local transport exercises the actual uploader lifecycle; no file is transmitted.
  const shouldFail = uploadScenario.value === 'retry' && !failedUploads.has(file.uid)
  let percent = 0
  const timer = setInterval(() => {
    percent = Math.min(100, percent + (uploadScenario.value === 'slow' ? 5 : 25))
    onProgress({ percent })
    if (percent < 100) {
      return
    }
    clearInterval(timer)
    uploadTimers.delete(timer)
    if (shouldFail) {
      failedUploads.add(file.uid)
      onError(new Error('本地模拟失败，请重试'))
    } else {
      onSuccess({ local: true })
    }
  }, 200)
  uploadTimers.add(timer)
  return {
    abort: () => {
      clearInterval(timer)
      uploadTimers.delete(timer)
    },
  }
}
function addDemoVideo() {
  if (disabled.value || readonly.value || readPretty.value || model.files.length >= 3) {
    return
  }
  model.files.push({
    uid: `demo-video-${Date.now()}`,
    name: '试驾介绍.webm',
    type: 'video/webm',
    url: demoVideo,
    duration: 2,
    status: 'success',
    percent: 100,
  })
}
function rejected(files) {
  const reasons = { 'max-files': '最多 3 个附件', 'max-file-size': '单文件不能超过 5MB', accept: '文件类型不支持' }
  result.value = files.map(({ reason }) => reasons[reason] || '附件未通过校验').join('；')
}
const orientation = ref('portrait')
const viewportPreset = ref('portrait')
const viewportHeightMode = ref('small')
const duoViewport = computed(() => duoViewports[viewportPreset.value])
const insets = reactive({ top: 24, right: 0, bottom: 34, left: 0 })
const previewRoot = ref(null)
const previewScroll = ref(null)
const nativeSize = ref(false)
const availableWidth = ref(390)
const viewportWidth = computed(() => duoViewport.value?.width ?? (orientation.value === 'landscape' ? 844 : 390))
const viewportHeight = computed(() =>
  duoViewport.value
    ? viewportHeightMode.value === 'large'
      ? duoViewport.value.largeHeight
      : duoViewport.value.smallHeight
    : orientation.value === 'landscape'
      ? 390
      : 720,
)
const previewScale = computed(() => (nativeSize.value ? 1 : Math.min(1, availableWidth.value / viewportWidth.value)))
const canvasStyle = computed(() => ({
  width: `${viewportWidth.value * previewScale.value}px`,
  height: `${viewportHeight.value * previewScale.value}px`,
}))
const measurements = ref(null)
const effectiveInsets = computed(() =>
  Object.fromEntries(
    Object.entries(insets).map(([side, value]) => [side, Math.max(0, Math.min(120, Number(value) || 0))]),
  ),
)
const previewStyle = computed(() => ({
  width: `${viewportWidth.value}px`,
  transform: `scale(${previewScale.value})`,
  height: `${viewportHeight.value}px`,
  ...Object.fromEntries(
    Object.entries(effectiveInsets.value).map(([side, value]) => [`--mp-safe-area-${side}`, `${value}px`]),
  ),
  '--mp-field-presentation-viewport-max-height': `${viewportHeight.value - effectiveInsets.value.top}px`,
}))
function preset(value) {
  if (value === 'duo-right' || value === 'duo-left') {
    if (!duoViewport.value) {
      viewportPreset.value = 'duo-outer-portrait'
    }
    const selected = duoViewports[viewportPreset.value]
    orientation.value = selected.width > selected.smallHeight ? 'landscape' : 'portrait'
    Object.assign(insets, selected.insets, value === 'duo-right' ? { left: 12, right: 72 } : { left: 72, right: 12 })
    return
  }
  if (duoViewports[value]) {
    viewportPreset.value = value
    const selected = duoViewports[value]
    orientation.value = selected.width > selected.smallHeight ? 'landscape' : 'portrait'
    Object.assign(insets, selected.insets)
    return
  }
  if (value === 'zero') {
    Object.assign(insets, { top: 0, right: 0, bottom: 0, left: 0 })
    return
  }
  viewportPreset.value = value
  orientation.value = value === 'landscape' ? 'landscape' : 'portrait'
  Object.assign(
    insets,
    value === 'landscape' ? { top: 0, right: 44, bottom: 21, left: 44 } : { top: 24, right: 0, bottom: 34, left: 0 },
  )
}
function measure() {
  const root = previewRoot.value
  if (previewScroll.value) {
    availableWidth.value = Math.max(1, previewScroll.value.clientWidth - 4)
  }
  if (!root) {
    return
  }
  const style = (selector) => getComputedStyle(root.querySelector(selector))
  const shell = style('.brand-form-shell')
  const footer = style('.brand-form-footer')
  const nested = style('.brand-form-footer-nested')
  const panel = [...root.querySelectorAll('.mp-field-presentation__panel')].find(
    (el) => el.getBoundingClientRect().height > 0,
  )
  measurements.value = {
    top: parseFloat(shell.paddingTop),
    right: parseFloat(shell.paddingRight),
    left: parseFloat(shell.paddingLeft),
    footer: parseFloat(footer.paddingBottom),
    nested: parseFloat(nested.paddingBottom),
    panelBase: panel ? parseFloat(getComputedStyle(panel).getPropertyValue('--mp-field-presentation-padding')) : 8,
    panel: panel
      ? ['paddingLeft', 'paddingRight', 'paddingBottom'].map((key) => parseFloat(getComputedStyle(panel)[key]))
      : null,
  }
}
const noDuplicate = computed(
  () =>
    measurements.value &&
    measurements.value.footer === effectiveInsets.value.bottom &&
    measurements.value.nested === 0 &&
    measurements.value.top === effectiveInsets.value.top &&
    measurements.value.left === effectiveInsets.value.left &&
    measurements.value.right === effectiveInsets.value.right &&
    (!measurements.value.panel ||
      measurements.value.panel.every(
        (value, i) => value === measurements.value.panelBase + effectiveInsets.value[['left', 'right', 'bottom'][i]],
      )),
)
let resizeObserver
let mutationObserver
onMounted(() => {
  resizeObserver = new ResizeObserver(measure)
  resizeObserver.observe(previewRoot.value)
  resizeObserver.observe(previewScroll.value)
  mutationObserver = new MutationObserver(measure)
  mutationObserver.observe(previewRoot.value, { attributes: true, childList: true, subtree: true })
  measure()
})
watch([effectiveInsets, orientation, viewportWidth, viewportHeight], async () => {
  await nextTick()
  measure()
})
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
  uploadTimers.forEach(clearInterval)
})
defineExpose({
  model,
  form,
  insets,
  orientation,
  measurements,
  preset,
  viewportPreset,
  viewportHeightMode,
  viewportWidth,
  viewportHeight,
  calendarMode,
  calendarZone,
  rangeLock,
  dateScenario,
  guardedOpen,
  guardedPopup,
  guardMode,
})
</script>

<template>
  <section class="brand-form-demo" aria-label="完整预约表单">
    <h2>App 页面与固定提交栏</h2>
    <p>先选择设备方向并调整安全区，再打开表单字段观察弹层。斜纹区域表示需要避让的边缘。</p>
    <section class="brand-form-simulation" aria-label="App 安全区模拟">
      <h3>App 安全区模拟</h3>
      <p>输入 CSS px。斜纹表示安全区；提交栏固定在预览底部。默认缩放以显示完整视口；原尺寸模式可横向滚动。</p>
      <mp-space wrap>
        <mp-button @click="preset('portrait')">竖屏刘海</mp-button>
        <mp-button @click="preset('landscape')">横屏刘海</mp-button>
        <mp-button @click="preset('duo-right')">Duo 右侧避让（模拟）</mp-button>
        <mp-button @click="preset('duo-left')">Duo 左侧避让（模拟）</mp-button>
        <mp-button @click="preset('zero')">四边归零</mp-button>
      </mp-space>
      <mp-space wrap aria-label="Duo 视口预设">
        <mp-button
          v-for="(device, key) in duoViewports"
          :key="key"
          :aria-pressed="viewportPreset === key"
          @click="preset(key)"
          >{{ device.label }}</mp-button
        >
      </mp-space>
      <mp-radio-group
        v-if="duoViewport"
        v-model="viewportHeightMode"
        aria-label="Safari 工具栏状态"
        :options="[
          { label: '工具栏展开（小视口）', value: 'small' },
          { label: '工具栏收起（大视口）', value: 'large' },
        ]"
        variant="button"
        size="sm"
      />
      <p>
        切换 Duo 预设会同时更新视口和四边模拟值。尺寸参考 Safari 27.1 的 CSS
        视口，安全区是独立的压力测试值，不代表对应姿态的实测值。Safari 已避让的系统侧栏不应再重复补偿。
      </p>
      <mp-checkbox v-model="nativeSize">原尺寸查看（可横向滚动）</mp-checkbox>
      <p>
        {{ duoViewport?.label ?? (orientation === 'landscape' ? '普通横屏' : '普通竖屏') }} · {{ viewportWidth }} ×
        {{ viewportHeight }} CSS px · 显示 {{ Math.round(previewScale * 100) }}%
      </p>
      <div class="brand-form-insets">
        <div v-for="(label, side) in { top: '顶部', right: '右侧', bottom: '底部', left: '左侧' }" :key="side">
          <span>{{ label }} inset（px）</span>
          <mp-input-number
            v-model="insets[side]"
            :aria-label="`${label} inset`"
            :min="0"
            :max="120"
            edit-mode="direct"
          />
        </div>
      </div>
      <p v-if="measurements" role="status" aria-label="安全区测量结果">
        页面避让：上 {{ measurements.top }} / 右 {{ measurements.right }} / 左 {{ measurements.left }}px； 提交栏底部
        {{ measurements.footer }}px，嵌套安全区 {{ measurements.nested }}px。
        <strong>{{ noDuplicate ? '检查通过：未重复留白' : '正在核对留白' }}</strong>
        <br />编辑弹层：{{
          measurements.panel
            ? `左 ${measurements.panel[0]} / 右 ${measurements.panel[1]} / 下 ${measurements.panel[2]}px（含面板原有 ${measurements.panelBase}px 留白）`
            : '打开字段后查看实际留白'
        }}
      </p>
      <p>弹层挂载到本模拟视口，单独消费 inset；模拟数值不会写入文档全局或其他示例。</p>
    </section>
    <mp-collapse class="brand-form-options"
      ><mp-collapse-item title="更多表单选项（状态、日期、上传与关闭行为）" name="details">
        <mp-space wrap>
          <mp-checkbox v-model="disabled">禁用表单</mp-checkbox>
          <mp-checkbox v-model="readonly">只读表单</mp-checkbox>
          <mp-checkbox v-model="readPretty">纯阅读</mp-checkbox>
        </mp-space>
        <mp-form-item layout="vertical" size="sm" label="表单字段变体">
          <mp-radio-group
            v-model="fieldVariant"
            aria-label="表单字段变体"
            :options="[
              { label: 'outline 描边', value: 'outline' },
              { label: 'filled 填充', value: 'filled' },
              { label: 'standard 下划线', value: 'standard' },
            ]"
            variant="button"
            size="sm"
          />
        </mp-form-item>
        <mp-form-item layout="vertical" size="sm" label="表单控件尺寸">
          <mp-radio-group
            v-model="fieldSize"
            aria-label="表单控件尺寸"
            :options="['xs', 'sm', 'md', 'lg', 'xl'].map((value) => ({ label: value, value }))"
            variant="button"
            size="sm"
          />
        </mp-form-item>
        <mp-form-item layout="vertical" size="sm" label="字段编辑方式">
          <mp-radio-group
            v-model="editMode"
            aria-label="字段编辑方式"
            :options="[
              { label: '直接编辑', value: 'inline' },
              { label: '弹层确认后保存', value: 'popup' },
            ]"
            variant="button"
            size="sm"
          />
        </mp-form-item>

        <mp-form-item layout="vertical" size="sm" label="日历交互模式">
          <mp-radio-group
            v-model="calendarMode"
            aria-label="日历交互模式"
            :options="[
              { label: '翻页日历', value: 'page' },
              { label: '多月虚拟滚动（十年）', value: 'scroll' },
              { label: '单行周日历', value: 'line' },
            ]"
            variant="button"
            size="sm"
          />
        </mp-form-item>
        <mp-form-item layout="vertical" size="sm" label="日历时区">
          <mp-radio-group
            v-model="calendarZone"
            aria-label="日历时区"
            :options="[
              { label: '上海 UTC+8', value: 'Asia/Shanghai' },
              { label: '纽约（含夏令时）', value: 'America/New_York' },
              { label: 'UTC', value: 'UTC' },
              { label: '豪勋爵岛（半小时夏令时）', value: 'Australia/Lord_Howe' },
            ]"
            variant="button"
            size="sm"
          />
        </mp-form-item>
        <p>当前真实时刻：{{ instantDescription }}</p>
        <p>日历字符串按 {{ calendarZone }} 的当地日期解释；Date／时间戳保持同一真实时刻。</p>
        <mp-form-item layout="vertical" size="sm" label="日期时间场景">
          <mp-radio-group
            v-model="dateScenario"
            aria-label="日期时间场景"
            :options="[
              { label: '跨月行程', value: 'cross-month' },
              { label: '纽约春季跳时', value: 'dst-gap' },
              { label: '纽约秋季重复时间', value: 'dst-fold' },
              { label: '纽约秋季第二次 01:30', value: 'dst-fold-late' },
              { label: '半小时夏令时', value: 'dst-half-hour' },
            ]"
            variant="button"
            size="sm"
          />
        </mp-form-item>
        <mp-form-item layout="vertical" size="sm" label="范围端点锁定">
          <mp-radio-group
            v-model="rangeLock"
            aria-label="范围端点锁定"
            :options="[
              { label: '两端可编辑', value: 'none' },
              { label: '锁定开始', value: 'start' },
              { label: '锁定结束', value: 'end' },
              { label: '两端锁定', value: 'both' },
            ]"
            variant="button"
            size="sm"
          />
        </mp-form-item>
        <mp-form-item layout="vertical" size="sm" label="关闭检查结果">
          <mp-radio-group
            v-model="guardMode"
            aria-label="关闭检查结果"
            :options="[
              { label: '延迟后允许', value: 'allow' },
              { label: '延迟后拒绝', value: 'reject' },
              { label: '检查报错', value: 'error' },
            ]"
            variant="button"
            size="sm"
          />
        </mp-form-item>
        <mp-button @click="guardedOpen = true">打开异步关闭验证弹层</mp-button>
        <mp-button @click="guardedOpen = false">外部关闭验证弹层</mp-button>
        <mp-button @click="guardedPopup?.close()">实例方法关闭验证弹层</mp-button>
        <p role="status">{{ guardMessage }}</p>
        <mp-popup
          ref="guardedPopup"
          v-model:open="guardedOpen"
          placement="bottom"
          :before-close="beforeClose"
          :popup-container="previewRoot || undefined"
          swipe-to-close
          close-on-route-change
          safe-area-inset-bottom
          aria-label="异步关闭验证"
          @close-error="guardMessage = '检查报错：保留弹层和草稿'"
        >
          <template #default="{ close, pending }">
            <div class="brand-form-guard">
              <header data-popup-swipe-handle>拖动这里关闭 · 异步拦截</header>
              <p>遮罩、Esc、路由、下拉、按钮、实例方法、外部 open 均经过同一检查。等待时不会重复触发。</p>
              <mp-input default-value="关闭被拒绝时保留的草稿" aria-label="关闭验证草稿" />
              <mp-button :disabled="pending" @click="close('close', $event)">{{
                pending ? '检查中…' : '关闭弹层'
              }}</mp-button>
              <mp-button :disabled="pending" @click="guardedOpen = false">外部设置 open=false</mp-button>
              <mp-button :disabled="pending" @click="guardedPopup?.close()">实例 close()</mp-button>
            </div>
          </template>
        </mp-popup>
        <mp-form-item layout="vertical" size="sm" label="上传演示">
          <mp-radio-group
            v-model="uploadScenario"
            aria-label="上传演示"
            :options="[
              { label: '上传成功', value: 'success' },
              { label: '首次失败，重试成功', value: 'retry' },
              { label: '慢速进度，可取消', value: 'slow' },
            ]"
            variant="button"
            size="sm"
          />
        </mp-form-item>
        <mp-form-item layout="vertical" size="sm" label="附件布局">
          <mp-radio-group
            v-model="uploadLayout"
            aria-label="附件布局"
            :options="[
              { label: '图片卡片', value: 'picture-card' },
              { label: '图文列表', value: 'picture' },
              { label: '文件列表', value: 'text' },
            ]"
            variant="button"
            size="sm"
          />
        </mp-form-item>

        <mp-button :disabled="disabled || readonly || readPretty || model.files.length >= 3" @click="addDemoVideo"
          >添加 2 秒演示视频</mp-button
        >
        <mp-checkbox v-model="protectFiles">保护现有附件（拒绝替换和删除）</mp-checkbox>
        <p>附件可逐个替换；取消选择或校验失败会保留原文件。弹层可从标题空白处向下拖动关闭，未确认的草稿会取消。</p>
      </mp-collapse-item></mp-collapse
    >

    <div ref="previewScroll" class="brand-form-preview-scroll">
      <div class="brand-form-preview-canvas" :style="canvasStyle">
        <div
          ref="previewRoot"
          class="brand-form-screen"
          :style="previewStyle"
          :data-orientation="orientation"
          :data-viewport-preset="viewportPreset"
          aria-label="模拟 App 视口"
        >
          <mp-safe-area class="brand-form-shell" :edges="['top', 'right', 'left']">
            <mp-form
              ref="form"
              class="brand-form-screen-form"
              novalidate
              :model="model"
              :size="fieldSize"
              :disabled="disabled"
              :readonly="readonly"
              :read-pretty="readPretty"
              :edit-mode="editMode"
              layout="vertical"
              @submit-success="result = '预约信息校验通过（本地演示）'"
              @submit-failed="result = '请检查必填信息'"
            >
              <div class="brand-form-fields">
                <mp-form-item field="name" label="联系人" required :rules="requiredName">
                  <mp-input
                    v-model="model.name"
                    :variant="fieldVariant"
                    :popup-container="previewRoot || undefined"
                    aria-label="联系人"
                    placeholder="请输入姓名"
                    clearable
                  />
                </mp-form-item>
                <mp-form-item field="phone" label="手机号码" help="仅用于本次预约联系">
                  <mp-input
                    v-model="model.phone"
                    :variant="fieldVariant"
                    :popup-container="previewRoot || undefined"
                    aria-label="手机号码"
                    type="tel"
                  />
                </mp-form-item>
                <mp-form-item field="city" label="预约城市">
                  <mp-select
                    v-model="model.city"
                    :variant="fieldVariant"
                    :popup-container="previewRoot || undefined"
                    :options="cities"
                    aria-label="预约城市"
                  />
                </mp-form-item>
                <mp-form-item field="location" label="体验中心">
                  <mp-cascader
                    v-model="model.location"
                    :variant="fieldVariant"
                    :popup-container="previewRoot || undefined"
                    :options="locations"
                    path-mode
                    aria-label="体验中心"
                  />
                </mp-form-item>
                <mp-form-item
                  field="date"
                  label="预约日期"
                  :help="calendarMode === 'scroll' ? '可选 2021–2030 年，按需渲染月份' : '可选 2026 年 11 月'"
                  ><mp-date
                    v-model="model.date"
                    :interactive-mode="calendarMode"
                    :time-zone="calendarZone"
                    :popup-container="previewRoot || undefined"
                    :variant="fieldVariant"
                    :min="calendarMode === 'scroll' ? '2021-01-01' : '2026-11-01'"
                    :max="calendarMode === 'scroll' ? '2030-12-31' : '2026-11-30'"
                    aria-label="预约日期"
                /></mp-form-item>
                <mp-form-item
                  field="zonedAppointment"
                  label="跨时区预约"
                  help="时间戳保持同一时刻；切换时区会改变日期和时间显示。"
                >
                  <mp-date
                    v-model="model.zonedAppointment"
                    :time-zone="calendarZone"
                    show-time
                    :interactive-mode="calendarMode"
                    value-format="timestamp"
                    :popup-container="previewRoot || undefined"
                    aria-label="跨时区预约"
                    :variant="fieldVariant"
                  />
                </mp-form-item>
                <mp-form-item
                  field="tripRange"
                  label="行程起止"
                  help="跨月／夏令时范围：端点锁定后不能改写，取消保留原值，确认才保存。"
                >
                  <mp-date-range
                    v-model="model.tripRange"
                    show-time
                    value-format="timestamp"
                    :time-zone="calendarZone"
                    :interactive-mode="calendarMode"
                    :disabled="rangeLocks"
                    :popup-container="previewRoot || undefined"
                    aria-label="行程起止"
                    :variant="fieldVariant"
                  />
                </mp-form-item>
                <mp-form-item field="time" label="预约时间" help="09:00–18:00，每 15 分钟一档"
                  ><mp-time
                    v-model="model.time"
                    :popup-container="previewRoot || undefined"
                    :variant="fieldVariant"
                    min="09:00:00"
                    max="18:00:00"
                    :step="{ minute: 15, second: 60 }"
                    aria-label="预约时间"
                /></mp-form-item>
                <mp-form-item field="passengers" label="同行人数"
                  ><mp-input-number
                    v-model="model.passengers"
                    :variant="fieldVariant"
                    :popup-container="previewRoot || undefined"
                    :min="1"
                    :max="6"
                    aria-label="同行人数"
                /></mp-form-item>
                <mp-form-item field="service" label="体验项目">
                  <mp-radio-group v-model="model.service" :popup-container="previewRoot || undefined">
                    <mp-radio value="test-drive">试驾体验</mp-radio><mp-radio value="showroom">静态看车</mp-radio>
                  </mp-radio-group>
                </mp-form-item>
                <mp-form-item field="features" label="感兴趣的服务">
                  <mp-checkbox-group v-model="model.features" :popup-container="previewRoot || undefined">
                    <mp-checkbox value="charging">补能服务</mp-checkbox
                    ><mp-checkbox value="finance">金融方案</mp-checkbox>
                  </mp-checkbox-group>
                </mp-form-item>
                <mp-form-item field="notice" label="接收预约提醒"
                  ><mp-switch
                    v-model="model.notice"
                    :popup-container="previewRoot || undefined"
                    aria-label="接收预约提醒"
                /></mp-form-item>
                <mp-form-item field="note" label="其他需求"
                  ><mp-textarea
                    v-model="model.note"
                    :variant="fieldVariant"
                    :popup-container="previewRoot || undefined"
                    aria-label="其他需求"
                    placeholder="如儿童座椅、无障碍需求"
                    :max-length="200"
                    show-word-limit
                /></mp-form-item>
                <mp-form-item
                  field="files"
                  label="补充附件"
                  help="本地模拟上传，不发送网络请求；最多 3 个，单文件 5MB。上方可切换失败、慢速进度和附件布局。"
                  ><mp-upload
                    v-model="model.files"
                    reupload
                    :before-remove="() => !protectFiles"
                    resolve-type="data-url"
                    :popup-container="previewRoot || undefined"
                    :list-type="uploadLayout"
                    :custom-request="uploadRequest"
                    :max-files="3"
                    :max-file-size="5 * 1024 * 1024"
                    multiple
                    @rejected="rejected"
                /></mp-form-item>
                <mp-form-item label="状态对照" edit-mode="direct" :read-pretty="false">
                  <mp-space direction="column" :size="12">
                    <mp-input
                      :variant="fieldVariant"
                      :popup-container="previewRoot || undefined"
                      model-value="不可编辑的示例"
                      disabled
                      aria-label="禁用字段"
                    />
                    <mp-input
                      :variant="fieldVariant"
                      :popup-container="previewRoot || undefined"
                      model-value="可复制的只读内容"
                      readonly
                      aria-label="只读字段"
                    />
                    <mp-input
                      :variant="fieldVariant"
                      :popup-container="previewRoot || undefined"
                      model-value="格式有误"
                      error
                      aria-label="错误字段"
                    />
                  </mp-space>
                </mp-form-item>
                <p role="status" aria-live="polite">{{ result }}</p>
                <mp-collapse
                  ><mp-collapse-item title="当前表单数据" name="details">
                    <pre aria-label="表单数据">{{ JSON.stringify(model, null, 2) }}</pre>
                  </mp-collapse-item></mp-collapse
                >
              </div>
              <mp-safe-area class="brand-form-footer" :edges="['bottom']">
                <mp-safe-area class="brand-form-footer-nested" :edges="['bottom']">
                  <mp-space direction="column" :size="12">
                    <mp-button status="primary" block html-type="submit" :disabled="disabled || readonly || readPretty"
                      >提交预约</mp-button
                    >
                    <mp-button block @click="reset">重置表单</mp-button>
                  </mp-space>
                </mp-safe-area>
              </mp-safe-area>
            </mp-form>
          </mp-safe-area>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brand-form-demo {
  min-width: 0;
}
.brand-form-guard {
  padding: 16px;
  background: var(--mp-sys-color-surface-overlay);
}
.brand-form-guard header {
  padding-block: 16px;
  font-weight: 600;
}
.brand-form-simulation {
  padding: 16px;
  margin-block: 16px;
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-md);
}
.brand-form-options {
  margin-block: 16px;
  padding: 12px 16px;
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-md);
}

.brand-form-insets {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-block: 16px;
}
.brand-form-insets > div {
  min-width: 0;
}
.brand-form-preview-scroll {
  max-width: 100%;
  overflow-x: auto;
  padding: 2px;
}
.brand-form-preview-canvas {
  position: relative;
  overflow: hidden;
}
.brand-form-screen {
  position: absolute;
  inset: 0 auto auto 0;
  transform-origin: top left;
  isolation: isolate;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid var(--mp-sys-color-border-strong);
  color: var(--mp-sys-color-content-primary);
  background: repeating-linear-gradient(
    135deg,
    var(--mp-sys-color-surface-muted) 0 6px,
    var(--mp-sys-color-border-subtle) 6px 12px
  );
}
.brand-form-shell {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.brand-form-screen-form {
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--mp-sys-color-surface-page);
}
.brand-form-fields {
  min-height: 0;
  flex: 1;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 16px;
}
.brand-form-footer {
  background: repeating-linear-gradient(
    135deg,
    var(--mp-sys-color-surface-muted) 0 6px,
    var(--mp-sys-color-border-subtle) 6px 12px
  );
  flex-shrink: 0;
  border-top: 1px solid var(--mp-sys-color-border-default);
}
.brand-form-footer-nested {
  background: var(--mp-sys-color-surface-default);
}
.brand-form-footer-nested > * {
  padding: 12px;
}
</style>
```

### 组件联动

选择一个贴边组件，独立调整底部、左侧和右侧留白，再打开或操作它。需要核对具体数值时，展开测量结果。所有模拟值只作用于当前示例。

Example source: src/safe-area/example/demos/affected-components.vue

```vue
<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { SafeArea } from '@maple-design/ui-vue'

const bottom = ref(34)
const left = ref(12)
const right = ref(72)
function preset(side: 'left' | 'right' | 'zero') {
  left.value = side === 'left' ? 72 : side === 'right' ? 12 : 0
  right.value = side === 'right' ? 72 : side === 'left' ? 12 : 0
  bottom.value = side === 'zero' ? 0 : 34
}
const active = ref('popup')
const open = ref(false)
const host = ref<HTMLElement>()
const person = ref('a')
const consumers = [
  'popup',
  'picker',
  'action-sheet',
  'number-keyboard',
  'tab-bar',
  'floating-panel',
  'fab',
  'field-editor',
]
const insets = computed(() => ({ top: 0, bottom: bottom.value, left: left.value, right: right.value }))
watch(
  [host, insets],
  ([target, value], previous) => {
    const old = previous?.[0]
    if (old && old !== target) {
      SafeArea.setInsets(null, old)
    }
    if (target) {
      SafeArea.setInsets(value, target)
    }
  },
  { flush: 'post' },
)
onBeforeUnmount(() => {
  if (host.value) {
    SafeArea.setInsets(null, host.value)
  }
})
const measurements = ref<{ component: string; padding: string; margin: string; bottom: string }[]>([])
function measure() {
  measurements.value = Array.from(
    host.value?.querySelectorAll<HTMLElement>(
      '.mp-popup__content, .mp-picker, .mp-tab-bar, .mp-floating-panel, .mp-fab',
    ) ?? [],
  ).map((element) => {
    const style = getComputedStyle(element)
    return { component: active.value, padding: style.padding, margin: style.margin, bottom: style.bottom }
  })
}
</script>
<template>
  <mp-space direction="column" align="stretch">
    <div>Bottom / 底部 px <mp-input-number v-model="bottom" :min="0" :max="80" /></div>
    <div>Left / 左侧 px <mp-input-number v-model="left" :min="0" :max="120" /></div>
    <div>Right / 右侧 px <mp-input-number v-model="right" :min="0" :max="120" /></div>
    <mp-space wrap>
      <mp-button @click="preset('right')">Duo · Right / 右侧</mp-button>
      <mp-button @click="preset('left')">Duo · Left / 左侧</mp-button>
      <mp-button @click="preset('zero')">Zero / 归零</mp-button>
    </mp-space>
    <p>Duo asymmetric simulation, not device constants. / Duo 不对称模拟，数值不是设备固定参数。</p>
    <mp-form-item layout="vertical" size="sm" label="active">
      <mp-select
        v-model="active"
        aria-label="active"
        :options="consumers.map((value) => ({ value, label: value }))"
        @change="open = false"
      />
    </mp-form-item>
    <mp-collapse class="safe-area-measurements"
      ><mp-collapse-item title="查看留白测量 / Inspect spacing" name="details">
        <mp-button @click="measure">读取当前值 / Measure</mp-button>
        <div v-if="measurements.length" class="safe-area-measurements__scroll">
          <table>
            <thead>
              <tr>
                <th>组件 / Component</th>
                <th>内边距 / Padding</th>
                <th>外边距 / Margin</th>
                <th>底部位置 / Bottom</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in measurements" :key="index">
                <td>{{ row.component }}</td>
                <td>{{ row.padding }}</td>
                <td>{{ row.margin }}</td>
                <td>{{ row.bottom }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else>打开组件后读取数值。 / Open a component, then measure.</p>
      </mp-collapse-item></mp-collapse
    >
    <div ref="host" class="safe-area-consumers" aria-label="组件安全区预览 / Component safe-area preview">
      <mp-safe-area :edges="[]">
        <p>Local host / 局部宿主：{{ insets }}</p>
        <mp-button v-if="['popup', 'picker', 'action-sheet', 'number-keyboard'].includes(active)" @click="open = true"
          >Open / 打开</mp-button
        >
        <mp-popup
          v-if="active === 'popup'"
          v-model:open="open"
          placement="bottom"
          :popup-container="host"
          safe-area-inset-bottom
          safe-area-inset-left
          safe-area-inset-right
        >
          <div class="safe-area-content">
            Popup consumes bottom, left and right.<br />Popup 消费底部、左、右安全区。
          </div>
        </mp-popup>
        <mp-picker
          v-if="active === 'picker'"
          v-model:open="open"
          dynamic
          :popup-container="host"
          :columns="[[{ text: 'Alice' }, { text: 'Bob' }]]"
          safe-area
        />
        <mp-action-sheet
          v-if="active === 'action-sheet'"
          v-model:open="open"
          :popup-container="host"
          :actions="[{ name: 'Alice' }, { name: 'Bob' }]"
          safe-area
        />
        <mp-number-keyboard
          v-if="active === 'number-keyboard'"
          v-model:open="open"
          :popup-container="host"
          safe-area
          title="Keyboard"
        />
        <mp-tab-bar v-if="active === 'tab-bar'" safe-area>
          <mp-tab-bar-item label="Home" /><mp-tab-bar-item label="Profile" />
        </mp-tab-bar>
        <mp-floating-panel v-if="active === 'floating-panel'" :anchors="[140, 240]" :popup-container="host" safe-area
          ><p>Bottom, left and right / 底部、左、右留白</p></mp-floating-panel
        >
        <mp-fab v-if="active === 'fab'" :popup-container="host" safe-area />
        <mp-select
          v-if="active === 'field-editor'"
          v-model="person"
          edit-mode="popup"
          :popup-container="host"
          :options="[
            { value: 'a', label: 'Alice' },
            { value: 'b', label: 'Bob' },
          ]"
        />
      </mp-safe-area>
    </div>
  </mp-space>
</template>
<style scoped>
.safe-area-measurements__scroll {
  max-width: 100%;
  overflow-x: auto;
}
.safe-area-measurements table {
  width: 100%;
  border-collapse: collapse;
}
.safe-area-measurements th,
.safe-area-measurements td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid var(--mp-sys-color-border-default);
}

.safe-area-consumers {
  position: relative;
  transform: translateZ(0);
  height: 340px;
  overflow: hidden;
  border: 1px solid var(--mp-sys-color-border-default);
}
.safe-area-content {
  padding: 16px;
}
</style>
```

### Duo 不对称安全区

Duo 外屏横竖屏、内屏横竖屏和左右分屏预设会同时切换视口与四边模拟值；工具栏展开 / 收起切换小 / 大视口高度。左右避让按钮可在当前视口上交换不对称边距，归零只清空安全区。

尺寸采用 WebKit 公布的 Safari 27.1 CSS 视口：外屏竖屏 382 × 580/618，外屏横屏 594 × 368/406，内屏竖屏 669 × 867/902，内屏横屏 951 × 585/620，分屏每窗 385 × 571/609。它们不是设备物理屏幕尺寸。安全区值仅用于独立压力测试，不是这些视口对应的实测 inset；Safari 已避让的侧栏不要重复补偿。四边必须独立读取；宿主在折叠、展开、旋转、分屏及安全区变化后更新相对 WebView 内容视口的剩余边距，已经避让的边传 `0`。

Safari 与原生 App 的可用视口可能不同，不要把原生侧边栏宽度直接补到网页上。保留浏览器 `env()` 默认行为，宿主有准确数据时才覆盖。屏幕中间的折叠区域需要单独的分段布局，不能用四边 inset 表达。

参考：[WebKit 网页适配说明](https://webkit.org/blog/18486/webkit-features-for-safari-27-1/)、[苹果安全区适配说明](https://developer.apple.com/videos/play/tech-talks/111461/)。

## 在应用中使用

### 1. 开启浏览器适配

在应用 HTML 中配置视口：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

包裹需要留白的区域。默认读取浏览器 `env(safe-area-inset-*, 0px)`，无需写死某款手机的尺寸：

```vue
<mp-safe-area :edges="['bottom']">
  <mp-button status="primary" block>提交</mp-button>
</mp-safe-area>
```

按需引入时加载 `@maple-design/ui-vue/safe-area/style`；使用自动导入 Resolver 时由工具处理样式。

### 2. App 提供边距时再覆盖

传入 WebView **内容视口仍需避让的 CSS 像素**，不是设备物理像素，也不是键盘高度。

```ts
import { SafeArea } from '@maple-design/ui-vue'

SafeArea.setInsets({ top: 0, right: 0, bottom: 34, left: 0 })
SafeArea.setInsets(null) // 移除覆盖，恢复浏览器或继承值
```

`0` 是有效覆盖。每次调用替换目标的四边覆盖，省略的边恢复继承或浏览器值。应用适配器统一负责初始快照、旋转及页面恢复后的更新和退订；移除适配器时再清理全局覆盖。没有原生数据时保留浏览器默认值即可。

### 3. 局部容器和弹层

```vue
<mp-safe-area :edges="[]" :insets="{ top: 0, bottom: 20 }">
  <!-- 只提供局部边距，不给本层增加 padding -->
  <YourContent />
</mp-safe-area>
```

边距沿实际 DOM 继承。传送到 body 的弹层离开了局部容器，应使用根节点覆盖，或把弹层挂载到带有正确边距的 `popup-container`。也可以调用 `SafeArea.setInsets(insets, hostElement)`，只更新指定宿主；iframe 需要在自己的文档加载样式。

## 避免重复留白

- `edges`：本层给哪些边增加 padding；`[]` 表示不增加。
- `insets`：当前子树使用的有效边距；省略边继承，`0` 表示无需避让。
- `consume`：默认 `true`，已使用的边在直接元素子节点重置为 0，后代继续继承。

同一条内容路径选择一个避让位置。例如底栏已启用 `safe-area`，就不要再给外层手写相同的 padding。需要后代独立避让时才设 `consume=false`。相对视口固定定位的元素应有明确的宿主或边距，不能假设普通流祖先已经为它避让。

| 组件                                  | 开启方式                                | 行为                                 |
| ------------------------------------- | --------------------------------------- | ------------------------------------ |
| Popup                                 | `safe-area-inset-top/right/bottom/left` | 对指定边增加 padding                 |
| Picker / ActionSheet / NumberKeyboard | `safe-area`                             | 底部及左右留白转交给 Popup                 |
| TabBar / FloatingPanel                | `safe-area`                             | 增加底部及左右 padding                     |
| Fab                                   | `safe-area`                             | 按 position 避让所在角落的上下及左右安全区                     |
| 表单 popup 编辑层                     | 自动处理底部与左右边距                  | 继承实际弹层宿主，不改变草稿确认流程 |

## 常见问题

**桌面浏览器为什么没有留白？** 没有设备安全区时 `env()` 通常为 0。上方示例使用局部模拟值，便于观察。

**键盘弹出后要更新 bottom 吗？** 不要把键盘高度直接当作安全区。WebView 的 resize、overlay、输入滚动和固定操作栏需要结合宿主策略处理。

**切换主题会重置安全区吗？** 不会。主题管理外观，SafeArea 管理运行环境边距。模拟器能检查布局，系统状态栏、键盘和设备旋转仍需在实际 iOS / Android WebView 中验证。

## API

### SafeArea Props

| 属性    | 类型           | 默认值    | 说明                                 |
| ------- | -------------- | --------- | ------------------------------------ |
| edges | `SafeAreaEdge[]`<br>`SafeAreaEdge: 'left' \| 'right' \| 'bottom' \| 'top'` | `['top', 'right', 'bottom', 'left']` | 需要留白的物理边；[] 不补偿，不表示位置或展开方向 |
| insets  | SafeAreaInsets | undefined | 局部 CSS px 覆盖，0 有效，省略边继承 |
| consume | boolean        | true      | 对后代清除已消费的边                 |
| tag     | string         | div       | 容器标签                             |

默认插槽为内容，无新增事件。

`SafeArea.setInsets(insets, target?)`：insets 为 SafeAreaInsets 或 null；target 默认为当前 document.documentElement。替换该目标四边覆盖，保留目标其他 CSS；不隐式注册原生监听。SSR 无 document 时安全返回；组件 insets 可以在 SSR 中输出，避免把请求相关数据写入全局模块。数值必须有限且非负，否则抛 TypeError，并在校验全部通过前不修改 DOM。

## Types

```ts
import SafeArea from '@maple-design/ui-vue/safe-area'
import type { SafeAreaProps, SafeAreaInstance, SafeAreaEdge, SafeAreaInsets } from '@maple-design/ui-vue'
import type { SafeAreaProps as SubSafeAreaProps } from '@maple-design/ui-vue/safe-area'
const options: SafeAreaProps = { edges: ['bottom'], insets: { bottom: 0 } }
SafeArea.setInsets({ bottom: 0 })
```

SafeAreaEdge 是 top/right/bottom/left 的联合类型，SafeAreaInsets 是这些边到 number 的可选映射。SafeAreaInstance 表示组件实例，没有 setInsets 实例方法；setInsets 是组件对象上的静态方法，模板 ref 上不要调用。

## CSS Variables

这些是运行环境值，不要把它们写入 Alps/Firefly 品牌主题。品牌切换使用 ThemeProvider；App 适配使用 SafeArea，两者不互相清空。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-safe-area-bottom` | `env(safe-area-inset-bottom, 0px)` | `margin-bottom`, `padding-bottom` |
| `--mp-safe-area-left` | `env(safe-area-inset-left, 0px)` | `inset-inline-end`, `margin-left`, `padding-left`, `width` |
| `--mp-safe-area-right` | `env(safe-area-inset-right, 0px)` | `inset-inline-end`, `margin-right`, `padding-right`, `width` |
| `--mp-safe-area-top` | `env(safe-area-inset-top, 0px)` | `margin-top`, `padding-top` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-safe-area-bottom: env(safe-area-inset-bottom, 0px);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
