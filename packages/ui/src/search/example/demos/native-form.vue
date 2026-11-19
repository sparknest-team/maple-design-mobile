<script setup>
import { ref, useId } from 'vue'
import { useDemoLocale as useInlineDemoLocale } from '../../../__demos__/locale'

const inlineCopy = useInlineDemoLocale('searchNativeFormInline')

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
    <p>{{ inlineCopy.editInHistoryThenSubmit }}</p>
    <mp-space wrap>
      <mp-button html-type="button" @click="waiting = !waiting">{{ inlineCopy.toggleWaiting }}</mp-button>
      <mp-button html-type="button" @click="loadingMode = loadingMode === 'default' ? 'line' : 'default'">{{
        inlineCopy.toggleLoadingLayout
      }}</mp-button>
    </mp-space>
    <form :id="formId" ref="form" @submit.prevent="submit">
      <mp-search
        v-model="query"
        :label="inlineCopy.keywords"
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
      <p :id="helpId">{{ inlineCopy.editsUpdateImmediatelyNativeRequired }}</p>
      <mp-button html-type="submit" :disabled="waiting">{{ inlineCopy.captureNativeForm }}</mp-button>
    </form>
    <p>{{ inlineCopy.readingPreview }}</p>
    <mp-search :model-value="query" read-pretty :loading="waiting" :loading-mode="loadingMode" />
    <pre class="native-search-results" role="status">{{
      JSON.stringify({ submitted, searchEvents, query, waiting, loadingMode })
    }}</pre>
  </section>
</template>
