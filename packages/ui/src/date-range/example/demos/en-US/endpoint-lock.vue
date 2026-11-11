<script setup>
import { ref } from 'vue'

const value = ref(['2026-09-10', '2026-09-15'])
const lockStart = ref(true)
const lockEnd = ref(false)
const confirms = ref(0)
const selections = ref(0)
</script>

<template>
  <section class="date-range-lock-demo">
    <p>
      Local dates: lock one endpoint, edit the other and confirm. Locking both endpoints blocks selection. Lock changes
      do not submit drafts.
    </p>
    <mp-checkbox v-model="lockStart">Lock start</mp-checkbox>
    <mp-checkbox v-model="lockEnd">Lock end</mp-checkbox>
    <mp-button html-type="button" @click="value = ['2026-09-18', '2026-09-22']">External range 18~22</mp-button>
    <mp-date-range-picker
      v-model="value"
      presentation="calendar"
      :disable-confirm="false"
      :disabled="[lockStart, lockEnd]"
      @select="selections++"
      @confirm="confirms++"
    />
    <p role="status">Selections：{{ selections }}；Confirmations：{{ confirms }}</p>
    <output>{{ value }}</output>
  </section>
</template>
