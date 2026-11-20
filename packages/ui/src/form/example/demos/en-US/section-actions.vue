<script setup lang="ts">
import { reactive, ref } from 'vue'

const feedbackMessages = {
  applied: 'Onsite handling template applied.',
  cleared: 'Onsite fields cleared. The skill level is unchanged.',
}
const model = reactive({ sop: '', safety: '', points: '', skill: 'L3' })
const feedback = ref<'applied' | 'cleared' | ''>('')
function applyTemplate() {
  Object.assign(model, {
    sop: 'Standard onsite review SOP',
    safety: 'Read the onsite safety notice and confirm working conditions.',
    points: 'Review the onsite checklist and record the outcome.',
  })
  feedback.value = 'applied'
}
function clearSection() {
  Object.assign(model, { sop: '', safety: '', points: '' })
  feedback.value = 'cleared'
}
</script>
<template>
  <div data-section-demo="actions">
    <mp-form :model="model" layout="horizontal" label-col-flex="7rem" edit-mode="direct">
      <mp-section
        title="Onsite handling"
        description="Use a template to fill this section. Clearing it preserves the skill level outside the section."
      >
        <template #extra>
          <mp-space size="sm" wrap>
            <mp-button variant="text" size="sm" @click="applyTemplate">Use template</mp-button>
            <mp-button variant="text" size="sm" @click="clearSection">Clear</mp-button>
          </mp-space>
        </template>
        <mp-form-item field="sop" label="Onsite SOP"><mp-input v-model="model.sop" /></mp-form-item>
        <mp-form-item field="safety" label="Safety notice"
          ><mp-textarea v-model="model.safety" :max-length="200" show-word-limit
        /></mp-form-item>
        <mp-form-item field="points" label="Key points"
          ><mp-textarea v-model="model.points" :max-length="200" show-word-limit
        /></mp-form-item>
      </mp-section>
      <mp-divider />
      <mp-form-item field="skill" label="Skill level"><mp-input v-model="model.skill" /></mp-form-item>
    </mp-form>
    <p v-if="feedback" role="status">{{ feedbackMessages[feedback] }}</p>
  </div>
</template>
