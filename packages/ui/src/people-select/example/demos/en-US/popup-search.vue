<script setup lang="ts">
import type { PeopleSelectOptionsLoader } from '@maple-design/ui-vue'
import { ref } from 'vue'

const open = ref(false)
const personId = ref<string | null>(null)
const reason = ref('')
const people = Array.from({ length: 20 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')
  return { value: `demo-${number}`, label: `Test person ${number} (demo-${number})` }
})

const loadPeople: PeopleSelectOptionsLoader = async (query, { signal }) => {
  const keyword = query.trim().toLowerCase()
  if (!keyword) return []

  await new Promise<void>((resolve) => setTimeout(resolve, 150))
  if (signal.aborted) return []

  return people.filter((person) => person.label.toLowerCase().includes(keyword))
}
</script>

<template>
  <mp-button @click="open = true">Open people search</mp-button>

  <mp-popup v-model:open="open" placement="bottom" lock-scroll>
    <section style="display: grid; gap: 16px; padding: 16px; text-align: start">
      <h3 style="margin: 0">Reassign handler</h3>
      <p style="margin: 0">Type “Test” to find 20 sample people.</p>
      <mp-people-select
        v-model="personId"
        edit-mode="direct"
        :options="loadPeople"
        :search-delay="0"
        aria-label="New handler"
        placeholder="Search sample people"
      />
      <mp-textarea
        v-model="reason"
        edit-mode="direct"
        :rows="3"
        aria-label="Reason for reassignment"
        placeholder="Enter a reason for reassignment"
      />
      <output aria-live="polite">Selected person ID {{ personId || 'None' }}</output>
      <mp-button @click="open = false">Close</mp-button>
    </section>
  </mp-popup>
</template>
