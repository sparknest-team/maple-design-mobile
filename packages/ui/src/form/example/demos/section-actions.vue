<script setup lang="ts">
import { reactive, ref } from 'vue'

const feedbackMessages = { applied: '已引用现场处置模板。', cleared: '已清空现场处置，技能等级保持不变。' }
const model = reactive({ sop: '', safety: '', points: '', skill: 'L3' })
const feedback = ref<'applied' | 'cleared' | ''>('')
function applyTemplate() {
  Object.assign(model, {
    sop: '现场核验标准 SOP',
    safety: '请先阅读现场安全说明，确认作业条件。',
    points: '按现场处置清单逐项核验，并记录处理结果。',
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
      <mp-section show-marker title="现场处置" description="引用模板填充本分区；清空后，分区外的技能等级保持不变。">
        <template #extra>
          <mp-space size="sm" wrap>
            <mp-button variant="text" size="sm" @click="applyTemplate">引用模板</mp-button>
            <mp-button variant="text" size="sm" @click="clearSection">清空</mp-button>
          </mp-space>
        </template>
        <mp-form-item field="sop" label="现场处置SOP"><mp-input v-model="model.sop" /></mp-form-item>
        <mp-form-item field="safety" label="安全须知"
          ><mp-textarea v-model="model.safety" :max-length="200" show-word-limit
        /></mp-form-item>
        <mp-form-item field="points" label="处置要点"
          ><mp-textarea v-model="model.points" :max-length="200" show-word-limit
        /></mp-form-item>
      </mp-section>
      <mp-divider />
      <mp-form-item field="skill" label="技能等级"><mp-input v-model="model.skill" /></mp-form-item>
    </mp-form>
    <p v-if="feedback" role="status">{{ feedbackMessages[feedback] }}</p>
  </div>
</template>
