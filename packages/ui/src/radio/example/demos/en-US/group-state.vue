<script setup>
import { ref } from 'vue'

const accepted = ref('a')
const proposed = ref('')
const readonly = ref(false)
const options = [
  { label: 'Device A', value: 'a' },
  { label: 'Device B', value: 'b' },
]
</script>

<template>
  <mp-space direction="column">
    <div>
      <p>Uncontrolled: default-value initializes only</p>
      <mp-radio-group :default-value="'a'" :options="options" />
    </div>
    <div>
      <p>Controlled: parent accepts updates {{ accepted }}</p>
      <mp-radio-group v-model="accepted" :options="options" :readonly="readonly" />
      <mp-button size="sm" @click="readonly = !readonly">{{ readonly ? 'Unlock' : 'Read only' }}</mp-button>
    </div>
    <div>
      <p>Parent rejects updates; proposals only {{ proposed }}</p>
      <mp-radio-group :model-value="''" :options="options" @update:model-value="proposed = $event" />
    </div>
  </mp-space>
</template>
