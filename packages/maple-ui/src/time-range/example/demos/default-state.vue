<script setup>
import { ref } from 'vue'

const value = ref(['09:00', '10:00'])
const open = ref(false)
const acceptValue = ref(true)
const acceptOpen = ref(true)
const acceptClose = ref(true)
const commits = ref(0)
const proposal = ref()
const openProposal = ref()
const updateValue = (next) => {
  proposal.value = next
  if (acceptValue.value) {
    value.value = next
  }
}
const updateOpen = (next) => {
  openProposal.value = next
  if (acceptOpen.value && (next || acceptClose.value)) {
    open.value = next
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <p>非受控初始值，无需绑定 v-model</p>
    <mp-time-range :default-value="['09:00', '10:00']" format="HH:mm" clearable />
    <p>受控值与展开状态</p>
    <mp-checkbox v-model="acceptValue">接受值更新</mp-checkbox>
    <mp-checkbox v-model="acceptOpen">接受展开更新</mp-checkbox>
    <mp-time-range
      :model-value="value"
      :open="open"
      format="HH:mm"
      clearable
      @update:model-value="updateValue"
      @update:open="updateOpen"
      @change="commits++"
    />
    <span>{{ value }} / {{ open }}</span>
    <mp-checkbox v-model="acceptClose">接受关闭请求</mp-checkbox>
    <output aria-label="Commit count">{{ commits }}</output>
    <output aria-label="Controlled proposals">{{ JSON.stringify({ value: proposal, open: openProposal }) }}</output>
  </div>
</template>
