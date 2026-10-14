<script setup>
import { ref } from 'vue'

const accepted = ref(['a'])
const proposed = ref([])
const readonly = ref(false)
const options = [
  { label: '设备 A', value: 'a' },
  { label: '设备 B', value: 'b' },
]
</script>

<template>
  <mp-space direction="column">
    <div>
      <p>非受控：default-value 只用于初始值</p>
      <mp-checkbox-group :default-value="['a']" :options="options" />
    </div>
    <div>
      <p>受控：父级接受更新 {{ accepted }}</p>
      <mp-checkbox-group v-model="accepted" :options="options" :readonly="readonly" />
      <mp-button size="sm" @click="readonly = !readonly">{{ readonly ? '解除只读' : '设为只读' }}</mp-button>
    </div>
    <div>
      <p>父级拒绝更新：仅记录提议 {{ proposed }}</p>
      <mp-checkbox-group :model-value="[]" :options="options" @update:model-value="proposed = $event" />
    </div>
  </mp-space>
</template>
