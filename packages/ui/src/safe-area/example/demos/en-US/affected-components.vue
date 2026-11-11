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
    <div>Bottom px <mp-input-number v-model="bottom" :min="0" :max="80" /></div>
    <div>Left px <mp-input-number v-model="left" :min="0" :max="120" /></div>
    <div>Right px <mp-input-number v-model="right" :min="0" :max="120" /></div>
    <mp-space wrap>
      <mp-button @click="preset('right')">Duo · Right</mp-button>
      <mp-button @click="preset('left')">Duo · Left</mp-button>
      <mp-button @click="preset('zero')">Zero</mp-button>
    </mp-space>
    <p>Duo asymmetric simulation; values are not device constants.</p>
    <mp-form-item layout="vertical" size="sm" label="active">
      <mp-select
        v-model="active"
        aria-label="active"
        :options="consumers.map((value) => ({ value, label: value }))"
        @change="open = false"
      />
    </mp-form-item>
    <mp-collapse class="safe-area-measurements"
      ><mp-collapse-item title="Inspect spacing" name="details">
        <mp-button @click="measure">Measure current values</mp-button>
        <div v-if="measurements.length" class="safe-area-measurements__scroll">
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Padding</th>
                <th>Margin</th>
                <th>Bottom</th>
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
        <p v-else>Open a component, then measure.</p>
      </mp-collapse-item></mp-collapse
    >
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
          ><p>Bottom, left and right padding</p></mp-floating-panel
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
