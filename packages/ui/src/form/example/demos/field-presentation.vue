<script setup>
import { computed, ref } from 'vue'
import ModelOutput from '../components/ModelOutput.vue'

const editMode = ref('popup')
const readPretty = ref(false)
const layout = ref('horizontal')
const layoutOptions = ['vertical', 'horizontal', 'inline'].map((value) => ({ label: value, value }))

const options = ref([
  { value: 1, label: '研发设备' },
  { value: 2, label: '设计设备' },
  { value: 3, label: '运营设备' },
])
const form = ref({ name: '默认确认后保存', deviceIds: [2], note: '此项始终直接编辑', summary: '只读展示' })
const status = ref('')

const modeOptions = ['direct', 'popup'].map((value) => ({ label: value, value }))
const committed = computed(() => JSON.stringify(form.value))
const presentationHint = computed(() =>
  readPretty.value
    ? '只展示已保存的值；下方“单项覆盖 direct”通过 readPretty=false 保持可编辑。'
    : editMode.value === 'direct'
      ? '直接编辑，即时更新下方模型；选择设备无需额外确认。'
      : '按展示方式进入编辑；确认才更新下方模型，取消不保存本次修改。',
)
</script>
<template>
  <mp-space direction="column" align="stretch" :size="16">
    <mp-form-item layout="vertical" size="sm" label="Form 展示方式">
      <mp-radio-group v-model="editMode" aria-label="Form 展示方式" :options="modeOptions" variant="button" size="sm" />
    </mp-form-item>
    <mp-form-item layout="vertical" size="sm" label="layout">
      <mp-radio-group v-model="layout" :options="layoutOptions" variant="button" size="sm" />
    </mp-form-item>
    <mp-space wrap>
      <mp-checkbox v-model="readPretty">纯阅读 readPretty</mp-checkbox>
    </mp-space>
    <p>{{ presentationHint }}<br />前两项继承 Form 展示方式，后两项演示字段局部覆盖。</p>
    <mp-form
      :layout="layout"
      :model="form"
      :edit-mode="editMode"
      :read-pretty="readPretty"
      @submit-success="status = '表单已提交'"
      @submit-failed="status = '请完成当前编辑或修正校验错误'"
    >
      <mp-form-item field="name" label="名称" :rules="[(value) => Boolean(value) || '名称不能为空']">
        <mp-input v-model="form.name" placeholder="请输入名称" clearable />
      </mp-form-item>
      <mp-form-item field="deviceIds" label="设备" :rules="[(value) => value.length > 0 || '请选择设备']">
        <mp-select v-model="form.deviceIds" :options="options" multiple filterable :limit="3" placeholder="搜索设备" />
      </mp-form-item>
      <mp-form-item field="note" label="单项覆盖 direct" edit-mode="direct" :read-pretty="false">
        <mp-input v-model="form.note" />
      </mp-form-item>
      <mp-form-item field="summary" label="固定 readPretty" read-pretty>
        <mp-input v-model="form.summary" />
      </mp-form-item>
      <mp-button html-type="submit">提交表单</mp-button>
    </mp-form>
    <ModelOutput role="status">当前模型：{{ committed }}</ModelOutput>
    <p v-if="status" role="status">{{ status }}</p>
  </mp-space>
</template>
