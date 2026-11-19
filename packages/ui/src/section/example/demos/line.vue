<template>
  <mp-section :title="copy.history" variant="line">
    <template #extra>
      <mp-button :aria-expanded="expanded" @click="expanded = !expanded">
        {{ expanded ? copy.latest : copy.all }}
      </mp-button>
    </template>
    <ul>
      <li>{{ copy.exportRelease }}</li>
      <li v-if="expanded">{{ copy.memberRelease }}</li>
    </ul>
  </mp-section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { copy } from '../messages'

const expanded = ref(false)
</script>
