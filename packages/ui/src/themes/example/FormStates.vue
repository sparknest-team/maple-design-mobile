<script setup lang="ts">
import { computed, ref } from 'vue'
import type { UploadFileItem } from '../../upload/interfaces'

const variant = ref<'outline' | 'filled' | 'standard'>('outline')
const editMode = ref<'direct' | 'popup'>('direct')
const state = ref('normal')
const flags = computed(() => ({
  disabled: state.value === 'disabled',
  readonly: state.value === 'readonly',
  error: state.value === 'error',
}))
const cities = [
  { value: 'shanghai', label: '上海' },
  { value: 'beijing', label: '北京' },
  { value: 'disabled', label: '不可选城市', disabled: true },
]
const regions = [{ value: 'china', label: '中国', children: cities }]
const single = ref('shanghai')
const multiple = ref(['shanghai', 'beijing'])
const region = ref('shanghai')
const regionMultiple = ref(['shanghai', 'beijing'])
const date = ref('2026-10-26')
const datetime = ref('2026-10-26 14:30:00')
const time = ref('14:30:00')
const dates = ref(['2026-10-26', '2026-11-03'])
const times = ref(['09:00:00', '18:00:00'])
const checks = ref(['selected'])
const radio = ref('selected')
const buttonRadio = ref('selected')
const switches = ref({ circle: true, round: true, line: true, tonal: true })
const switchVariants = ['circle', 'round', 'line', 'tonal'] as const
const listTypes = ['text', 'picture', 'picture-card'] as const
const image =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="160" height="120" fill="#5865a8"/><circle cx="80" cy="60" r="32" fill="#dce4ff"/></svg>',
  )
const files = (): UploadFileItem[] => [
  {
    uid: 'image',
    name: '已完成图片.svg',
    type: 'image/svg+xml',
    url: image,
    size: 4096,
    status: 'success',
    percent: 100,
  },
  { uid: 'video', name: '体验视频.mp4', type: 'video/mp4', duration: 125, size: 8192, status: 'success', percent: 100 },
  { uid: 'pending', name: '上传中.txt', size: 1024, status: 'uploading', percent: 42 },
  { uid: 'error', name: '上传失败.txt', size: 2048, status: 'error', percent: 0 },
]
const uploads = ref({ text: files(), picture: files(), 'picture-card': files() })
function resetUploads() {
  uploads.value = { text: files(), picture: files(), 'picture-card': files() }
}
</script>

<template>
  <section class="form-state-demo" aria-label="选择与上传状态对照">
    <p>在上方切换八套主题。以下控件可实际操作；上传使用本地文件，不会发送网络请求。</p>
    <mp-space direction="column" block>
      <mp-radio-group v-model="variant" edit-mode="direct" aria-label="状态对照字段变体">
        <mp-radio v-for="v in ['outline', 'filled', 'standard']" :key="v" :value="v">{{ v }}</mp-radio>
      </mp-radio-group>
      <mp-radio-group v-model="editMode" edit-mode="direct" aria-label="状态对照编辑方式">
        <mp-radio value="inline">inline 浮层</mp-radio><mp-radio value="popup">popup 弹层</mp-radio>
      </mp-radio-group>
      <mp-radio-group v-model="state" edit-mode="direct" aria-label="状态对照交互状态">
        <mp-radio value="normal">正常</mp-radio><mp-radio value="disabled">禁用</mp-radio>
        <mp-radio value="readonly">只读</mp-radio><mp-radio value="error">错误</mp-radio>
      </mp-radio-group>
    </mp-space>
    <h3>Select / Cascader：单选、多选、搜索与禁用选项</h3>
    <mp-space direction="column" block>
      <mp-select
        v-model="single"
        v-bind="flags"
        :variant="variant"
        :edit-mode="editMode"
        :options="cities"
        filterable
        clearable
        placeholder="单选城市"
        aria-label="状态单选城市"
      />
      <mp-select
        v-model="multiple"
        v-bind="flags"
        :variant="variant"
        :edit-mode="editMode"
        :options="cities"
        multiple
        filterable
        clearable
        placeholder="多选城市"
        aria-label="状态多选城市"
      />
      <mp-cascader
        v-model="region"
        v-bind="flags"
        :variant="variant"
        :edit-mode="editMode"
        :options="regions"
        filterable
        clearable
        placeholder="单选地区"
        aria-label="状态单选地区"
      />
      <mp-cascader
        v-model="regionMultiple"
        v-bind="flags"
        :variant="variant"
        :edit-mode="editMode"
        :options="regions"
        multiple
        filterable
        clearable
        placeholder="多选地区"
        aria-label="状态多选地区"
      />
    </mp-space>
    <h3>日期时间：日期、日期时间、时间与范围</h3>
    <mp-space direction="column" block>
      <mp-date
        v-model="date"
        v-bind="flags"
        :variant="variant"
        :edit-mode="editMode"
        clearable
        placeholder="日期"
        aria-label="状态日期"
      />
      <mp-date
        v-model="datetime"
        v-bind="flags"
        :variant="variant"
        :edit-mode="editMode"
        show-time
        clearable
        placeholder="日期时间"
        aria-label="状态日期时间"
      />
      <mp-time
        v-model="time"
        v-bind="flags"
        :variant="variant"
        :edit-mode="editMode"
        clearable
        placeholder="时间"
        aria-label="状态时间"
      />
      <mp-date-range
        v-model="dates"
        v-bind="flags"
        :variant="variant"
        :edit-mode="editMode"
        clearable
        aria-label="状态日期范围"
      />
      <mp-time-range
        v-model="times"
        v-bind="flags"
        :variant="variant"
        :edit-mode="editMode"
        clearable
        aria-label="状态时间范围"
      />
    </mp-space>
    <h3>Checkbox：未选、已选、半选</h3>
    <mp-checkbox-group v-model="checks" v-bind="flags" edit-mode="direct" aria-label="状态复选组">
      <mp-checkbox value="empty">未选</mp-checkbox><mp-checkbox value="selected">已选</mp-checkbox>
    </mp-checkbox-group>
    <mp-checkbox v-bind="flags" indeterminate edit-mode="direct">半选</mp-checkbox>
    <h3>Radio：普通与按钮</h3>
    <mp-radio-group v-model="radio" v-bind="flags" edit-mode="direct" aria-label="状态单选组">
      <mp-radio value="empty">未选</mp-radio><mp-radio value="selected">已选</mp-radio>
    </mp-radio-group>
    <mp-radio-group
      v-model="buttonRadio"
      v-bind="flags"
      variant="button"
      edit-mode="direct"
      aria-label="状态按钮单选组"
    >
      <mp-radio value="empty">未选</mp-radio><mp-radio value="selected">已选</mp-radio>
    </mp-radio-group>
    <h3>Switch：四种造型、开关与加载</h3>
    <mp-space wrap :size="20">
      <div v-for="v in switchVariants" :key="v" :data-switch-variant="v">
        <p>{{ v }}</p>
        <mp-space direction="column">
          <mp-switch
            v-model="switches[v]"
            v-bind="flags"
            :variant="v"
            checked-text="开"
            unchecked-text="关"
            :aria-label="`状态开关 ${v}`"
          />
          <mp-switch v-bind="flags" :variant="v" checked-text="开" unchecked-text="关" :aria-label="`状态关闭 ${v}`" />
          <mp-switch :variant="v" loading :model-value="true" :aria-label="`加载开关 ${v}`" />
        </mp-space>
      </div>
    </mp-space>
    <h3>上传：文字、图片、卡片，完成、进行中与失败</h3>
    <mp-button @click="resetUploads">重置上传示例</mp-button>
    <section v-for="kind in listTypes" :key="kind" :data-upload-type="kind">
      <h4>{{ kind }}</h4>
      <mp-upload
        v-model="uploads[kind]"
        :list-type="kind"
        :disabled="flags.disabled"
        :readonly="flags.readonly"
        :auto-upload="false"
        reupload
        :draggable="kind === 'text'"
      />
    </section>
    <p>错误开关作用于支持表单错误态的选择、日期和选择控件；Upload 通过文件的上传状态显示失败。</p>
  </section>
</template>
