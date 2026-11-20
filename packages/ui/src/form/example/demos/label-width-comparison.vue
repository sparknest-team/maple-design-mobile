<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

const mode = ref<'auto' | 'columns' | 'fixed'>('auto')
const showExtra = ref(true)
const customLabel = ref('')
const model = reactive({ name: '', department: '', contact: '' })
const widthLabels = { auto: '自动测量', columns: '响应式栅格', fixed: '固定宽度' }
const choices = computed(() =>
  (['auto', 'columns', 'fixed'] as const).map((value) => ({ label: widthLabels[value], value })),
)
</script>
<template>
  <div class="label-width-comparison" data-config-comparison="form-label-width">
    <mp-radio-group v-model="mode" :options="choices" aria-label="标签宽度方案" />
    <p>切换标签宽度方案，输入数据保持不变。栅格在 576px 以下上下排列；固定标签为 6rem，联系方式一项覆盖为 8rem。</p>
    <mp-checkbox v-model="showExtra">显示额外字段</mp-checkbox>
    <label>修改最长标签<mp-input v-model="customLabel" placeholder="联系方式" /></label>
    <mp-form
      :model="model"
      layout="horizontal"
      label-align="left"
      :auto-label-width="mode === 'auto'"
      :label-col-flex="mode === 'fixed' ? '6rem' : undefined"
      :label-col-props="mode === 'columns' ? { span: 6, xs: 24, sm: 6 } : undefined"
      :wrapper-col-props="mode === 'columns' ? { span: 18, xs: 24, sm: 18 } : undefined"
    >
      <mp-form-item field="name" label="姓名"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="department" label="部门"><mp-input v-model="model.department" /></mp-form-item>
      <mp-form-item
        v-if="showExtra"
        field="contact"
        :label="customLabel || '联系方式'"
        :label-col-flex="mode === 'fixed' ? '8rem' : undefined"
        ><mp-input v-model="model.contact"
      /></mp-form-item>
    </mp-form>
    <p role="status">当前数据: {{ JSON.stringify(model) }}</p>
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
