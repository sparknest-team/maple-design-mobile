<template>
  <div :style="{ marginBottom: '40px' }">
    <span :style="{ verticalAlign: 'middle', marginRight: '8px' }"> Reverse </span>
    <mp-radio-group v-model="isReverse" :style="{ marginBottom: '30px' }" @change="onChange">
      <mp-radio :value="false">No Reverse</mp-radio>
      <mp-radio :value="true">Reverse</mp-radio>
    </mp-radio-group>
  </div>
  <mp-timeline :reverse="isReverse">
    <mp-timeline-item label="2017-03-10">The first milestone</mp-timeline-item>
    <mp-timeline-item label="2018-05-12">The second milestone</mp-timeline-item>
    <mp-timeline-item label="2020-09-30">The third milestone</mp-timeline-item>
  </mp-timeline>
</template>

<script setup>
import { ref } from 'vue'

const isReverse = ref(false)

const onChange = (bool) => {
  isReverse.value = bool
}
</script>
