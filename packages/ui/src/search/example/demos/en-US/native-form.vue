<script setup>
import { ref, useId } from 'vue'

const uid = useId()
const formId = 'native-search-form-' + uid
const inputId = 'native-search-query-' + uid
const helpId = 'native-search-help-' + uid
const form = ref()
const query = ref('report')
const waiting = ref(false)
const loadingMode = ref('default')
const searchEvents = ref(0)
const submitted = ref([])
function submit() {
  if (waiting.value || !form.value) {
    return
  }
  submitted.value = [...new form.value.ownerDocument.defaultView.FormData(form.value).entries()]
}
</script>
<template>
  <section>
    <p>Edit in history, then submit one native keyword value.</p>
    <mp-space wrap>
      <mp-button html-type="button" @click="waiting = !waiting">Toggle waiting</mp-button>
      <mp-button html-type="button" @click="loadingMode = loadingMode === 'default' ? 'line' : 'default'">Toggle loading layout</mp-button>
    </mp-space>
    <form :id="formId" ref="form" @submit.prevent="submit">
      <mp-search
        v-model="query"
        label="Keywords"
        edit-mode="popup"
        :recent-searches="['report', 'invoice']"
        :loading="waiting"
        :loading-mode="loadingMode"
        :input-attrs="{
          id: inputId,
          name: 'keyword',
          form: formId,
          required: true,
          'aria-describedby': helpId,
        }"
        @search="searchEvents++"
      />
      <p :id="helpId">Edits update immediately; native required validation belongs to this form.</p>
      <mp-button html-type="submit" :disabled="waiting">Capture native form</mp-button>
    </form>
    <p>Reading preview</p>
    <mp-search :model-value="query" read-pretty :loading="waiting" :loading-mode="loadingMode" />
    <pre class="native-search-results" role="status">{{
      JSON.stringify({ submitted, searchEvents, query, waiting, loadingMode })
    }}</pre>
  </section>
</template>
<style scoped>
.native-search-results {
  max-width: 100%;
  overflow-x: auto;
}
</style>
