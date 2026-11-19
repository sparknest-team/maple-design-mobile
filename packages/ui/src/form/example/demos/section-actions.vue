<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const copy = computed(() =>
  english.value
    ? {
        actionsDescription:
          'Use a template to fill this section. Clearing it preserves the skill level outside the section.',
        applyTemplate: 'Use template',
        clearSection: 'Clear',
        applied: 'Onsite handling template applied.',
        cleared: 'Onsite fields cleared. The skill level is unchanged.',
        templateSop: 'Standard onsite review SOP',
        templateSafety: 'Read the onsite safety notice and confirm working conditions.',
        templatePoints: 'Review the onsite checklist and record the outcome.',
        section: 'Onsite handling',
        onsite: 'Onsite SOP',
        safety: 'Safety notice',
        points: 'Key points',
        skill: 'Skill level',
      }
    : {
        actionsDescription: '引用模板填充本分区；清空后，分区外的技能等级保持不变。',
        applyTemplate: '引用模板',
        clearSection: '清空',
        applied: '已引用现场处置模板。',
        cleared: '已清空现场处置，技能等级保持不变。',
        templateSop: '现场核验标准 SOP',
        templateSafety: '请先阅读现场安全说明，确认作业条件。',
        templatePoints: '按现场处置清单逐项核验，并记录处理结果。',
        section: '现场处置',
        onsite: '现场处置SOP',
        safety: '安全须知',
        points: '处置要点',
        skill: '技能等级',
      },
)
const model = reactive({ sop: '', safety: '', points: '', skill: 'L3' })
const feedback = ref<'applied' | 'cleared' | ''>('')
function applyTemplate() {
  Object.assign(model, {
    sop: copy.value.templateSop,
    safety: copy.value.templateSafety,
    points: copy.value.templatePoints,
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
      <mp-section :title="copy.section" :description="copy.actionsDescription" show-end-divider>
        <template #extra>
          <mp-space size="sm" wrap>
            <mp-button variant="text" size="sm" @click="applyTemplate">{{ copy.applyTemplate }}</mp-button>
            <mp-button variant="text" size="sm" @click="clearSection">{{ copy.clearSection }}</mp-button>
          </mp-space>
        </template>
        <mp-form-item field="sop" :label="copy.onsite"><mp-input v-model="model.sop" /></mp-form-item>
        <mp-form-item field="safety" :label="copy.safety"
          ><mp-textarea v-model="model.safety" :max-length="200" show-word-limit
        /></mp-form-item>
        <mp-form-item field="points" :label="copy.points"
          ><mp-textarea v-model="model.points" :max-length="200" show-word-limit
        /></mp-form-item>
      </mp-section>
      <mp-form-item field="skill" :label="copy.skill"><mp-input v-model="model.skill" /></mp-form-item>
    </mp-form>
    <p v-if="feedback" role="status">{{ copy[feedback] }}</p>
  </div>
</template>
