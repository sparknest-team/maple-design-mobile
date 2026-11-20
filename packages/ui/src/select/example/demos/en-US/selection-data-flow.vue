<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const autoFirst = ref(true)
const generation = ref(0)
const form = reactive<{ city?: string; panelCity?: string }>({ city: undefined, panelCity: undefined })
const logs = reactive<{ inline: string[]; panel: string[] }>({ inline: [], panel: [] })
const counts = reactive({ inline: 0, panel: 0 })
const options = computed(() => [
  { label: 'Hangzhou', value: 'hangzhou' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Beijing (disabled)', value: 'beijing', disabled: true },
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
    <mp-button @click="reset">Reset both forms and logs</mp-button>
    <p>
      Each field starts empty. Open it and inspect the highlighted candidate: highlighting does not select a city.
      Change the switch to remount both fields.
    </p>

    <section>
      <h4>inline · Selection commits immediately</h4>
      <mp-form-item layout="vertical" hide-label>
        <mp-select
          :key="`inline-${generation}`"
          v-model="form.city"
          edit-mode="direct"
          :options="options"
          :default-active-first-option="autoFirst"
          placeholder="Choose a city"
          @update:model-value="record('inline', 'update:modelValue', $event)"
          @change="record('inline', 'change', $event)"
          @open-change="record('inline', 'open-change', $event)"
        >
          <template #footer>
            <p class="panel-value">form.city = {{ show(form.city) }} · update:modelValue × {{ counts.inline }}</p>
          </template>
        </mp-select>
      </mp-form-item>
      <p>
        Move with arrow keys, then press Enter, or click a city. Closing without selecting leaves the form unchanged.
      </p>
      <p role="status">
        form.city = <code>{{ show(form.city) }}</code> · update:modelValue × {{ counts.inline }}
      </p>
      <ol v-if="logs.inline.length" aria-live="polite">
        <li v-for="(entry, index) in logs.inline" :key="index">
          <code>{{ entry }}</code>
        </li>
      </ol>
      <p v-else>No component events yet.</p>
    </section>

    <section>
      <h4>popup · Confirm commits the draft</h4>
      <mp-form-item layout="vertical" hide-label>
        <mp-select
          :key="`panel-${generation}`"
          v-model="form.panelCity"
          edit-mode="popup"
          need-confirm
          :options="options"
          :default-active-first-option="autoFirst"
          placeholder="Choose a city, then confirm"
          @update:model-value="record('panel', 'update:modelValue', $event)"
          @change="record('panel', 'change', $event)"
          @open-change="record('panel', 'open-change', $event)"
        >
          <template #footer>
            <p class="panel-value">
              Committed form value：{{ show(form.panelCity) }} · update:modelValue ×
              {{ counts.panel }}
            </p>
          </template>
        </mp-select>
      </mp-form-item>
      <p>
        Choose a city in the editor: the selection mark is a draft. Confirm saves it; cancel or Escape discards it.
        Highlighting a candidate alone is not a draft selection.
      </p>
      <p role="status">
        form.panelCity = <code>{{ show(form.panelCity) }}</code> · update:modelValue × {{ counts.panel }}
      </p>
      <ol v-if="logs.panel.length" aria-live="polite">
        <li v-for="(entry, index) in logs.panel" :key="index">
          <code>{{ entry }}</code>
        </li>
      </ol>
      <p v-else>No component events yet.</p>
    </section>
    <p>
      Logs are newest first. open-change only changes panel visibility; update:modelValue is the event that writes the
      form value.
    </p>
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
