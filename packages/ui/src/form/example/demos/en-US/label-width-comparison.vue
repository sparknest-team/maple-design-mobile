<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const mode = ref<'auto' | 'columns' | 'fixed'>('auto')
const showExtra = ref(true)
const customLabel = ref('')
const model = reactive({ name: '', department: '', contact: '' })
const widthLabels = { auto: 'Measured labels', columns: 'Responsive columns', fixed: 'Fixed width' }
const choices = computed(() =>
  (['auto', 'columns', 'fixed'] as const).map((value) => ({ label: widthLabels[value], value })),
)
</script>
<template>
  <div class="label-width-comparison" data-config-comparison="form-label-width">
    <mp-radio-group v-model="mode" :options="choices" aria-label="Label width strategy" />
    <p>
      Switch label sizing with the same model. Responsive columns stack below 576px; fixed labels use 6rem, with an 8rem
      override on the contact field.
    </p>
    <mp-checkbox v-model="showExtra">Show extra field</mp-checkbox>
    <label>Change the longest label<mp-input v-model="customLabel" placeholder="Contact details" /></label>
    <mp-form
      :model="model"
      layout="horizontal"
      label-align="left"
      :auto-label-width="mode === 'auto'"
      :label-col-flex="mode === 'fixed' ? '6rem' : undefined"
      :label-col-props="mode === 'columns' ? { span: 6, xs: 24, sm: 6 } : undefined"
      :wrapper-col-props="mode === 'columns' ? { span: 18, xs: 24, sm: 18 } : undefined"
    >
      <mp-form-item field="name" label="Name"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="department" label="Department"><mp-input v-model="model.department" /></mp-form-item>
      <mp-form-item
        v-if="showExtra"
        field="contact"
        :label="customLabel || 'Contact details'"
        :label-col-flex="mode === 'fixed' ? '8rem' : undefined"
        ><mp-input v-model="model.contact"
      /></mp-form-item>
    </mp-form>
    <p role="status">Current model: {{ JSON.stringify(model) }}</p>
  </div>
</template>
<style scoped>
.label-width-comparison {
  display: grid;
  gap: 12px;
  min-width: 0;
  max-width: 100%;
}
p {
  margin: 0;
  overflow-wrap: anywhere;
}
</style>
