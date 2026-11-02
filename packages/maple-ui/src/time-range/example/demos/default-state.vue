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
  <mp-space direction="column" size="12px" style="width: 100%">
    <p>非受控初始值，无需绑定 v-model</p>
    <mp-time-range edit-mode="direct" :default-value="['09:00', '10:00']" format="HH:mm" clearable />
    <p>受控值与展开状态</p>
    <mp-checkbox v-model="acceptValue" edit-mode="direct">接受值更新</mp-checkbox>
    <mp-checkbox v-model="acceptOpen" edit-mode="direct">接受展开更新</mp-checkbox>
    <mp-time-range
      edit-mode="direct"
      :model-value="value"
      :open="open"
      format="HH:mm"
      clearable
      @update:model-value="updateValue"
      @update:open="updateOpen"
      @change="commits++"
    />
    <span>{{ value }} / {{ open }}</span>
    <mp-checkbox v-model="acceptClose" edit-mode="direct">接受关闭请求</mp-checkbox>
    <output aria-label="Commit count">{{ commits }}</output>
    <output aria-label="Controlled proposals">{{ JSON.stringify({ value: proposal, open: openProposal }) }}</output>
  </mp-space>
</template>
