<script setup>
import { computed, onBeforeUnmount, onDeactivated, ref } from 'vue'

const fresh = () => ({ title: '', department: 'ops', priority: 'normal' })
const draft = ref(fresh())
const saved = ref(null)
const stage = ref('edit')
const message = ref('填写任务后进入确认；也可以直接提交空表单查看校验。')
const busy = ref(false)
const failNext = ref(false)
const formRef = ref()
const rules = [(value) => !!value?.trim() || '请输入任务名称']
const departments = [
  { value: 'ops', label: '运营部' },
  { value: 'dev', label: '研发部' },
  { value: 'design', label: '设计部' },
]
const priorities = [
  { value: 'normal', label: '普通' },
  { value: 'urgent', label: '紧急' },
]
const departmentLabel = computed(() => departments.find((item) => item.value === draft.value.department)?.label)
let timer
let epoch = 0
function cancelPending() {
  epoch++
  clearTimeout(timer)
  busy.value = false
}
onBeforeUnmount(cancelPending)
onDeactivated(cancelPending)
function review({ errors }) {
  if (errors) {
    message.value = '请补全必填项，任务尚未提交。'
    return
  }
  stage.value = 'review'
  message.value = '核对信息后确认提交；返回修改不会改变上次提交记录。'
}
function submit() {
  if (busy.value) {
    return
  }
  const current = ++epoch
  const snapshot = { ...draft.value }
  const shouldFail = failNext.value
  failNext.value = false
  busy.value = true
  message.value = '正在本地模拟保存…'
  timer = setTimeout(() => {
    if (current !== epoch) {
      return
    }
    busy.value = false
    if (shouldFail) {
      message.value = '保存失败：草稿已保留，请点击“重试提交”。'
      return
    }
    saved.value = snapshot
    stage.value = 'done'
    message.value = '提交成功，已生成任务记录。'
  }, 500)
}
function reset() {
  cancelPending()
  draft.value = fresh()
  saved.value = null
  stage.value = 'edit'
  failNext.value = false
  message.value = '已重置，可以重新演示。'
  formRef.value?.clearValidate()
}
function fill() {
  draft.value = { title: '展厅设备巡检', department: 'ops', priority: 'urgent' }
  formRef.value?.clearValidate()
}
</script>
<template>
  <section class="workflow-demo" aria-label="巡检任务完整流程">
    <ol class="workflow-demo__steps" aria-label="任务流程">
      <li :aria-current="stage === 'edit' ? 'step' : undefined">01 填写与校验</li>
      <li :aria-current="stage === 'review' ? 'step' : undefined">02 核对与提交</li>
      <li :aria-current="stage === 'done' ? 'step' : undefined">03 结果与记录</li>
    </ol>
    <mp-form v-if="stage === 'edit'" ref="formRef" :model="draft" layout="vertical" @submit="review">
      <mp-form-item label="任务名称" field="title" :rules="rules" feedback
        ><mp-input v-model="draft.title" edit-mode="direct" placeholder="例如：展厅设备巡检"
      /></mp-form-item>
      <mp-form-item label="执行部门" field="department"
        ><mp-select v-model="draft.department" :options="departments" edit-mode="popup"
      /></mp-form-item>
      <mp-form-item label="任务优先级" field="priority"
        ><mp-select v-model="draft.priority" :options="priorities" edit-mode="popup"
      /></mp-form-item>
      <mp-space wrap
        ><mp-button html-type="submit" status="primary">校验并预览</mp-button
        ><mp-button @click="fill">填入演示数据</mp-button></mp-space
      >
    </mp-form>
    <div v-else-if="stage === 'review'">
      <h4>确认巡检任务</h4>
      <dl>
        <dt>任务</dt>
        <dd>{{ draft.title }}</dd>
        <dt>部门</dt>
        <dd>{{ departmentLabel }}</dd>
        <dt>优先级</dt>
        <dd>{{ draft.priority === 'urgent' ? '紧急' : '普通' }}</dd>
      </dl>
      <mp-checkbox v-model="failNext" :disabled="busy">模拟下一次保存失败（本地）</mp-checkbox>
      <mp-space wrap
        ><mp-button status="primary" :loading="busy" :disabled="busy" @click="submit">{{
          message.includes('保存失败') ? '重试提交' : '确认提交'
        }}</mp-button
        ><mp-button :disabled="busy" @click="stage = 'edit'">返回修改</mp-button></mp-space
      >
    </div>
    <div v-else>
      <h4>任务已创建</h4>
      <p>{{ saved.title }} · {{ saved.priority === 'urgent' ? '紧急处理' : '普通处理' }}</p>
      <mp-button @click="stage = 'edit'">继续编辑</mp-button>
    </div>
    <p role="status" aria-live="polite">{{ message }}</p>
    <mp-collapse>
      <mp-collapse-item title="查看已提交记录" name="saved">
        <pre>{{
          saved ? JSON.stringify(saved, null, 2) : '尚无记录；校验失败、返回修改或保存失败都不会创建记录。'
        }}</pre>
      </mp-collapse-item>
    </mp-collapse>
    <mp-button @click="reset">重新演示</mp-button>
    <small>本例使用本地模拟保存，不访问业务服务。校验、确认、保存与失败恢复由业务流程组合。</small>
  </section>
</template>
<style scoped>
.workflow-demo {
  width: 100%;
  min-width: 0;
}
.workflow-demo__steps {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  padding: 0;
}
.workflow-demo__steps li {
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--mp-color-fill-1);
}
.workflow-demo__steps [aria-current] {
  color: var(--mp-sys-color-content-brand);
  font-weight: 700;
}
.workflow-demo dl {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
}
.workflow-demo dd {
  margin: 0;
  overflow-wrap: anywhere;
}
.workflow-demo pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.workflow-demo small {
  display: block;
  margin-top: 12px;
  color: var(--mp-color-text-2);
}
</style>
