<script setup>
import { reactive, ref, useId } from 'vue'

const id = useId()
const form = ref()
const model = reactive({ a: 'A initial', b: 'B initial' })
const field = ref('a')
const submissions = ref(0)
const result = ref('-')
function reset() {
  if (field.value) {
    form.value?.resetFields(field.value)
  }
}
function submitted(data) {
  submissions.value++
  result.value = data.errors ? 'invalid' : 'valid'
}
</script>
<template>
  <section>
    <p>
      同一个 FormItem 切换 A/B：编辑后重置，各自回到第一次绑定时的初值。The same item retains a separate initial value
      for each field.
    </p>
    <mp-space wrap>
      <mp-button :disabled="field === 'a'" @click="field = 'a'">绑定 A / Bind A</mp-button>
      <mp-button :disabled="field === 'b'" @click="field = 'b'">绑定 B / Bind B</mp-button>
      <mp-button :disabled="!field" @click="field = ''">取消绑定 / Unbind</mp-button>
    </mp-space>
    <mp-form ref="form" :model="model" edit-mode="direct" @submit="submitted">
      <mp-form-item
        :field="field"
        :label="field ? 'Field ' + field.toUpperCase() : 'Unbound'"
        :label-attrs="{ for: id }"
        required
        feedback
        :validate-trigger="[]"
      >
        <mp-input v-if="field" :id="id" v-model="model[field]" edit-mode="direct" />
        <span v-else>尚未绑定字段 / No bound field</span>
      </mp-form-item>
      <mp-space wrap>
        <mp-button html-type="button" :disabled="!field" @click="reset">重置当前字段 / Reset current</mp-button>
        <mp-button html-type="submit" :disabled="!field">校验并提交 / Validate and submit</mp-button>
      </mp-space>
    </mp-form>
    <p role="status">Field: {{ field || '-' }}; submissions: {{ submissions }}; result: {{ result }}</p>
    <pre class="field-model">{{ JSON.stringify(model) }}</pre>
  </section>
</template>
