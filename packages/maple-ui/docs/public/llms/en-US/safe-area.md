<!-- Source: src/safe-area/docs/en-US.md; locale: en-US; page: /en-US/safe-area -->

# SafeArea

Keep edge-aligned content clear of display cutouts, rounded corners and the home indicator. Browsers normally provide the insets; an App WebView can supply its own values.

## When to use

| Layout                                     | Approach                                                |
| ------------------------------------------ | ------------------------------------------------------- |
| Content away from viewport edges           | Usually no extra configuration                          |
| Bottom actions or fullscreen edge content  | Wrap the affected region and choose `edges`             |
| Popup or TabBar already handles safe areas | Use its own switch; avoid adding the same outer padding |
| Native host already avoids an edge         | Explicitly override that edge with `0`                  |

## Examples

### Bottom padding and nesting

Stripes show safe-area padding. Change the inset, set it to zero, or disable nested protection to compare duplicate spacing, even on desktop.

Example source: src/safe-area/example/demos/en-US/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const bottom = ref(24)
const consume = ref(true)
</script>

<template>
  <section class="safe-area-basic" aria-label="Bottom safe area and nesting">
    <div class="safe-area-basic__controls">
      <label
        >Bottom inset (CSS px)<mp-input-number v-model="bottom" :min="0" :max="80" aria-label="Bottom inset"
      /></label>
      <mp-checkbox v-model="consume">Prevent duplicate nested padding</mp-checkbox>
    </div>
    <p>Stripes show safe-area padding. Set the inset to zero or disable nested protection to compare.</p>
    <mp-safe-area class="safe-area-basic__outer" :edges="['bottom']" :insets="{ bottom }" :consume="consume">
      <div class="safe-area-basic__content">
        <p>Page content</p>
        <mp-safe-area class="safe-area-basic__nested" :edges="['bottom']">
          <div class="safe-area-basic__action"><mp-button status="primary" block>Bottom actions</mp-button></div>
        </mp-safe-area>
      </div>
    </mp-safe-area>
    <p role="status">Outer {{ bottom }}px · Nested {{ consume ? 0 : bottom }}px</p>
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

### App page simulation

Choose portrait, landscape or zero insets. Inspect a scrolling page, fixed actions and field popups. Each edge accepts 0–120 CSS px. Landscape fits the available width; native-size viewing is optional.

The page consumes top/left/right; the footer consumes bottom once. Measurements show real padding, including the popup's normal content spacing. Extra form, upload and date controls are grouped under “更多表单选项”. This complete fixture currently uses Chinese labels.

Example source: src/safe-area/example/demos/app-form.vue

```vue
<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import demoVideo from './assets/drive.webm?url'

const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)
const readPretty = ref(false)
const presentation = ref('inline')
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
async function beforeClose(reason, { signal }) {
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
const insets = reactive({ top: 24, right: 0, bottom: 34, left: 0 })
const previewRoot = ref(null)
const previewScroll = ref(null)
const nativeSize = ref(false)
const availableWidth = ref(390)
const viewportWidth = computed(() => (orientation.value === 'landscape' ? 844 : 390))
const viewportHeight = computed(() => (orientation.value === 'landscape' ? 390 : 720))
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
  '--mp-field-presentation-viewport-max-height': `${(orientation.value === 'landscape' ? 390 : 720) - effectiveInsets.value.top}px`,
}))
function preset(value) {
  orientation.value = value === 'landscape' ? 'landscape' : 'portrait'
  Object.assign(
    insets,
    value === 'landscape'
      ? { top: 0, right: 44, bottom: 21, left: 44 }
      : value === 'zero'
        ? { top: 0, right: 0, bottom: 0, left: 0 }
        : { top: 24, right: 0, bottom: 34, left: 0 },
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
watch([effectiveInsets, orientation], async () => {
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
        <mp-button @click="preset('zero')">四边归零</mp-button>
      </mp-space>
      <mp-checkbox v-model="nativeSize">原尺寸查看（可横向滚动）</mp-checkbox>
      <p>模拟 {{ viewportWidth }} × {{ viewportHeight }} CSS px · 显示 {{ Math.round(previewScale * 100) }}%</p>
      <div class="brand-form-insets">
        <div v-for="(label, side) in { top: '顶部', right: '右侧', bottom: '底部', left: '左侧' }" :key="side">
          <span>{{ label }} inset（px）</span>
          <mp-input-number
            v-model="insets[side]"
            :aria-label="`${label} inset`"
            :min="0"
            :max="120"
            presentation="inline"
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
    <details class="brand-form-options">
      <summary>更多表单选项（状态、日期、上传与关闭行为）</summary>
      <mp-space wrap>
        <mp-checkbox v-model="disabled">禁用表单</mp-checkbox>
        <mp-checkbox v-model="readonly">只读表单</mp-checkbox>
        <mp-checkbox v-model="readPretty">纯阅读</mp-checkbox>
      </mp-space>
      <mp-select
        v-model="fieldVariant"
        presentation="inline"
        aria-label="表单字段变体"
        :clearable="false"
        :options="[
          { label: 'outline 描边', value: 'outline' },
          { label: 'filled 填充', value: 'filled' },
          { label: 'standard 下划线', value: 'standard' },
        ]"
      />
      <mp-select
        v-model="fieldSize"
        presentation="inline"
        aria-label="表单控件尺寸"
        :clearable="false"
        :options="['xs', 'sm', 'md', 'lg', 'xl'].map((value) => ({ label: value, value }))"
      />
      <mp-select
        v-model="presentation"
        presentation="inline"
        aria-label="字段编辑方式"
        :clearable="false"
        :options="[
          { label: '直接编辑', value: 'inline' },
          { label: '弹层确认后保存', value: 'popup' },
        ]"
      />

      <mp-select
        v-model="calendarMode"
        presentation="inline"
        aria-label="日历交互模式"
        :clearable="false"
        :options="[
          { label: '翻页日历', value: 'page' },
          { label: '多月虚拟滚动（十年）', value: 'scroll' },
          { label: '单行周日历', value: 'line' },
        ]"
      />
      <mp-select
        v-model="calendarZone"
        presentation="inline"
        aria-label="日历时区"
        :clearable="false"
        :options="[
          { label: '上海 UTC+8', value: 'Asia/Shanghai' },
          { label: '纽约（含夏令时）', value: 'America/New_York' },
          { label: 'UTC', value: 'UTC' },
          { label: '豪勋爵岛（半小时夏令时）', value: 'Australia/Lord_Howe' },
        ]"
      />
      <p>当前真实时刻：{{ instantDescription }}</p>
      <p>日历字符串按 {{ calendarZone }} 的当地日期解释；Date／时间戳保持同一真实时刻。</p>
      <mp-select
        v-model="dateScenario"
        presentation="inline"
        aria-label="日期时间场景"
        :clearable="false"
        :options="[
          { label: '跨月行程', value: 'cross-month' },
          { label: '纽约春季跳时', value: 'dst-gap' },
          { label: '纽约秋季重复时间', value: 'dst-fold' },
          { label: '纽约秋季第二次 01:30', value: 'dst-fold-late' },
          { label: '半小时夏令时', value: 'dst-half-hour' },
        ]"
      />
      <mp-select
        v-model="rangeLock"
        presentation="inline"
        aria-label="范围端点锁定"
        :clearable="false"
        :options="[
          { label: '两端可编辑', value: 'none' },
          { label: '锁定开始', value: 'start' },
          { label: '锁定结束', value: 'end' },
          { label: '两端锁定', value: 'both' },
        ]"
      />
      <mp-select
        v-model="guardMode"
        presentation="inline"
        aria-label="关闭检查结果"
        :clearable="false"
        :options="[
          { label: '延迟后允许', value: 'allow' },
          { label: '延迟后拒绝', value: 'reject' },
          { label: '检查报错', value: 'error' },
        ]"
      />
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
      <mp-select
        v-model="uploadScenario"
        presentation="inline"
        aria-label="上传演示"
        :clearable="false"
        :options="[
          { label: '上传成功', value: 'success' },
          { label: '首次失败，重试成功', value: 'retry' },
          { label: '慢速进度，可取消', value: 'slow' },
        ]"
      />
      <mp-select
        v-model="uploadLayout"
        presentation="inline"
        aria-label="附件布局"
        :clearable="false"
        :options="[
          { label: '图片卡片', value: 'picture-card' },
          { label: '图文列表', value: 'picture' },
          { label: '文件列表', value: 'text' },
        ]"
      />

      <mp-button :disabled="disabled || readonly || readPretty || model.files.length >= 3" @click="addDemoVideo"
        >添加 2 秒演示视频</mp-button
      >
      <mp-checkbox v-model="protectFiles">保护现有附件（拒绝替换和删除）</mp-checkbox>
      <p>附件可逐个替换；取消选择或校验失败会保留原文件。弹层可从标题空白处向下拖动关闭，未确认的草稿会取消。</p>
    </details>

    <div ref="previewScroll" class="brand-form-preview-scroll">
      <div class="brand-form-preview-canvas" :style="canvasStyle">
        <div
          ref="previewRoot"
          class="brand-form-screen"
          :style="previewStyle"
          :data-orientation="orientation"
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
              :presentation="presentation"
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
                <mp-form-item label="状态对照" presentation="inline" :read-pretty="false">
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
                <details>
                  <summary>当前表单数据</summary>
                  <pre aria-label="表单数据">{{ JSON.stringify(model, null, 2) }}</pre>
                </details>
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
.brand-form-options summary {
  cursor: pointer;
  font-weight: 600;
  line-height: 1.6;
}
.brand-form-options[open] summary {
  margin-bottom: 16px;
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

### Component integration

Choose an edge-aligned component, adjust bottom/horizontal insets and open it. Expand the measurements when you need exact values. Simulation stays local to this example.

Example source: src/safe-area/example/demos/en-US/affected-components.vue

```vue
<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { SafeArea } from '@maple-design/ui'

const bottom = ref(34)
const horizontal = ref(12)
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
const insets = computed(() => ({ top: 0, bottom: bottom.value, left: horizontal.value, right: horizontal.value }))
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
const measurements = ref<{ component: string; padding: string; bottom: string }[]>([])
function measure() {
  measurements.value = Array.from(
    host.value?.querySelectorAll<HTMLElement>(
      '.mp-popup__content, .mp-picker, .mp-tab-bar, .mp-floating-panel, .mp-fab',
    ) ?? [],
  ).map((element) => {
    const style = getComputedStyle(element)
    return { component: active.value, padding: style.padding, bottom: style.bottom }
  })
}
</script>
<template>
  <mp-space direction="column">
    <div>Bottom px <mp-input-number v-model="bottom" :min="0" :max="80" /></div>
    <div>Left + right px <mp-input-number v-model="horizontal" :min="0" :max="60" /></div>
    <mp-select v-model="active" :options="consumers.map((value) => ({ value, label: value }))" @change="open = false" />
    <details class="safe-area-measurements">
      <summary>Inspect spacing</summary>
      <mp-button @click="measure">Measure current values</mp-button>
      <div v-if="measurements.length" class="safe-area-measurements__scroll">
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Padding</th>
              <th>Bottom</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in measurements" :key="index">
              <td>{{ row.component }}</td>
              <td>{{ row.padding }}</td>
              <td>{{ row.bottom }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>Open a component, then measure.</p>
    </details>
    <div ref="host" class="safe-area-consumers" aria-label="Component safe-area preview">
      <mp-safe-area :edges="[]">
        <p>Local host：{{ insets }}</p>
        <mp-button v-if="['popup', 'picker', 'action-sheet', 'number-keyboard'].includes(active)" @click="open = true"
          >Open</mp-button
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
          <div class="safe-area-content">Popup consumes bottom, left and right.</div>
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
          ><p>Bottom padding</p></mp-floating-panel
        >
        <mp-fab v-if="active === 'fab'" :popup-container="host" safe-area />
        <mp-select
          v-if="active === 'field-editor'"
          v-model="person"
          presentation="popup"
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
.safe-area-measurements summary {
  cursor: pointer;
  margin-bottom: 12px;
}
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

## Use in your app

### 1. Enable browser adaptation

Configure the HTML viewport:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

Wrap only the region that needs padding. Values default to `env(safe-area-inset-*, 0px)` rather than hard-coded device sizes:

```vue
<mp-safe-area :edges="['bottom']">
  <mp-button status="primary" block>Submit</mp-button>
</mp-safe-area>
```

For manual on-demand imports, load `@maple-design/ui/safe-area/style`. The automatic Resolver handles component styles.

### 2. Override when native insets are available

Use non-negative CSS pixels still needed inside the WebView content viewport, rather than physical pixels or keyboard height.

```ts
import { SafeArea } from '@maple-design/ui'

SafeArea.setInsets({ top: 0, right: 0, bottom: 34, left: 0 })
SafeArea.setInsets(null) // Restore browser/inherited values
```

Zero is a valid override. Each call replaces all four overrides on its target; omitted edges return to inheritance/browser values. One app adapter owns the initial snapshot, rotation/resume updates and subscription cleanup. Clear global overrides when removing that adapter. Without native data, keep browser defaults.

### 3. Local hosts and popups

```vue
<mp-safe-area :edges="[]" :insets="{ top: 0, bottom: 20 }">
  <!-- Provide local values without adding padding to this wrapper. -->
  <YourContent />
</mp-safe-area>
```

Insets follow actual DOM ancestry. A body Teleport leaves its local scope: use root overrides or a `popup-container` with the correct values. `SafeArea.setInsets(insets, hostElement)` updates a specific host. Each iframe document must load its own styles.

## Avoid duplicate padding

- `edges` selects which edges receive padding here; `[]` adds none.
- `insets` sets values for this subtree; omitted edges inherit and `0` means no avoidance is needed.
- `consume` defaults to `true`, resetting used edges to zero on direct element children for descendants to inherit.

Choose one compensation point along a content path. Do not add matching outer padding around a bottom bar that already enables `safe-area`. Use `consume=false` only when descendants must independently consume the inset. Viewport-fixed elements need an explicit host or inset instead of assuming normal-flow ancestors handle them.

| Component                             | Switch                                  | Behavior                                          |
| ------------------------------------- | --------------------------------------- | ------------------------------------------------- |
| Popup                                 | `safe-area-inset-top/right/bottom/left` | Padding on enabled edges                          |
| Picker / ActionSheet / NumberKeyboard | `safe-area`                             | Forward bottom handling to Popup                  |
| TabBar / FloatingPanel                | `safe-area`                             | Bottom padding                                    |
| Fab                                   | `safe-area`                             | Offset its bottom position                        |
| Field popup editors                   | Automatic bottom/horizontal handling    | Follow the real host; preserve draft transactions |

## FAQ

**Why is there no padding on desktop?** Browser `env()` values are normally zero without device insets. The examples use local simulated values.

**Should bottom track keyboard height?** Do not equate keyboard geometry with safe-area insets. WebView resize/overlay behavior, input scrolling and fixed actions require host-specific handling.

**Does changing themes reset the insets?** No. Themes own appearance; SafeArea owns runtime geometry. Simulations check layout, while system bars, keyboard and rotation still require real iOS/Android WebView testing.

## API

| Prop    | Type           | Default        |
| ------- | -------------- | -------------- |
| edges   | SafeAreaEdge[] | all four edges |
| insets  | SafeAreaInsets | undefined      |
| consume | boolean        | true           |
| tag     | string         | div            |

Default slot: content. No events. Exported types: SafeAreaProps, SafeAreaInstance, SafeAreaEdge, SafeAreaInsets.

## CSS variables

| Variable              | Default                          |
| --------------------- | -------------------------------- |
| --mp-safe-area-top    | env(safe-area-inset-top, 0px)    |
| --mp-safe-area-right  | env(safe-area-inset-right, 0px)  |
| --mp-safe-area-bottom | env(safe-area-inset-bottom, 0px) |
| --mp-safe-area-left   | env(safe-area-inset-left, 0px)   |

These values describe the runtime host, not a brand theme. StyleProvider theme updates and SafeArea native updates have separate ownership.
