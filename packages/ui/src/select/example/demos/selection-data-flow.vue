<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const autoFirst = ref(true)
const generation = ref(0)
const form = reactive<{ city?: string; panelCity?: string }>({ city: undefined, panelCity: undefined })
const logs = reactive<{ inline: string[]; panel: string[] }>({ inline: [], panel: [] })
const counts = reactive({ inline: 0, panel: 0 })
const options = computed(() => [
  { label: '杭州', value: 'hangzhou' },
  { label: '上海', value: 'shanghai' },
  { label: '北京（禁用）', value: 'beijing', disabled: true },
])
function show(value: unknown) {
  return value === undefined ? 'undefined' : JSON.stringify(value)
}
function record(kind: 'inline' | 'panel', event: string, value: unknown) {
  if (event === 'update:modelValue') {
    counts[kind]++
  }
  logs[kind].unshift(`${event}(${show(value)})`)
  logs[kind].splice(8)
}
function reset() {
  generation.value++
  form.city = undefined
  form.panelCity = undefined
  counts.inline = counts.panel = 0
  logs.inline = []
  logs.panel = []
}
</script>

<template>
  <div class="selection-data-flow">
    <mp-checkbox v-model="autoFirst" edit-mode="direct" @change="reset"
      >defaultActiveFirstOption = {{ autoFirst }}</mp-checkbox
    >
    <mp-button @click="reset">重置两组表单和日志</mp-button>
    <p>
      两组字段初始都没有值。打开后观察候选行的高亮：高亮不代表选中城市。切换开关会重建两组字段，便于从空值重新比较。
    </p>

    <section>
      <h4>inline · 选择即提交</h4>
      <mp-form-item layout="vertical" hide-label>
        <mp-select
          :key="`inline-${generation}`"
          v-model="form.city"
          edit-mode="direct"
          :options="options"
          :default-active-first-option="autoFirst"
          placeholder="请选择城市"
          @update:model-value="record('inline', 'update:modelValue', $event)"
          @change="record('inline', 'change', $event)"
          @open-change="record('inline', 'open-change', $event)"
        >
          <template #footer>
            <p class="panel-value">form.city = {{ show(form.city) }} · update:modelValue × {{ counts.inline }}</p>
          </template>
        </mp-select>
      </mp-form-item>
      <p>上下键移动后按 Enter，或点击城市，才更新表单。只打开、移动候选或关闭，不更新表单。</p>
      <p role="status">
        form.city = <code>{{ show(form.city) }}</code> · update:modelValue × {{ counts.inline }}
      </p>
      <ol v-if="logs.inline.length" aria-live="polite">
        <li v-for="(entry, index) in logs.inline" :key="index">
          <code>{{ entry }}</code>
        </li>
      </ol>
      <p v-else>尚无组件事件。</p>
    </section>

    <section>
      <h4>popup · 确认后提交草稿</h4>
      <mp-form-item layout="vertical" hide-label>
        <mp-select
          :key="`panel-${generation}`"
          v-model="form.panelCity"
          edit-mode="popup"
          need-confirm
          :options="options"
          :default-active-first-option="autoFirst"
          placeholder="选择城市后确认"
          @update:model-value="record('panel', 'update:modelValue', $event)"
          @change="record('panel', 'change', $event)"
          @open-change="record('panel', 'open-change', $event)"
        >
          <template #footer>
            <p class="panel-value">
              已提交表单值：{{ show(form.panelCity) }} · update:modelValue ×
              {{ counts.panel }}
            </p>
          </template>
        </mp-select>
      </mp-form-item>
      <p>
        在编辑面板选择城市后，勾选标记表示草稿；确认才保存，取消或 Escape
        丢弃草稿。只有候选高亮、尚未选择，不算草稿选择。
      </p>
      <p role="status">
        form.panelCity = <code>{{ show(form.panelCity) }}</code> · update:modelValue × {{ counts.panel }}
      </p>
      <ol v-if="logs.panel.length" aria-live="polite">
        <li v-for="(entry, index) in logs.panel" :key="index">
          <code>{{ entry }}</code>
        </li>
      </ol>
      <p v-else>尚无组件事件。</p>
    </section>
    <p>日志按最新在前排列。open-change 只表示打开或关闭面板；update:modelValue 才对应表单值更新。</p>
  </div>
</template>

<style scoped>
.selection-data-flow {
  display: grid;
  gap: 12px;
  min-width: 0;
}
.selection-data-flow section {
  display: grid;
  gap: 8px;
  min-width: 0;
}
.selection-data-flow p,
.selection-data-flow h4 {
  margin: 0;
}
.selection-data-flow code {
  overflow-wrap: anywhere;
}
.panel-value {
  padding: 8px;
}
</style>
