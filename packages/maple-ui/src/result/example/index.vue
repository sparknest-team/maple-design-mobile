<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const success = ref(false)
const error = ref(false)
const info = ref(false)
const warning = ref(false)
const question = ref(false)
const empty = ref(false)

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-result :title="t('success')" :description="t('description')">
    <template #footer>
      <mp-button type="success" @click="success = false">{{ t('button') }}</mp-button>
    </template>
  </mp-result>

  <app-type>{{ t('type') }}</app-type>
  <mp-space direction="column" size="large">
    <mp-button type="success" block @click="success = true">{{ t('success') }}</mp-button>
    <mp-button type="warning" block @click="warning = true">{{ t('warning') }}</mp-button>
    <mp-button type="info" block @click="info = true">{{ t('info') }}</mp-button>
    <mp-button type="danger" block @click="error = true">{{ t('error') }}</mp-button>
    <mp-button color="var(--mp-result-question-color)" text-color="#fff" block @click="question = true">
      {{ t('question') }}
    </mp-button>
    <mp-button color="var(--mp-result-empty-color)" text-color="#fff" block @click="empty = true">
      {{ t('empty') }}
    </mp-button>
  </mp-space>

  <mp-popup v-model:show="success" :default-style="false">
    <mp-result class="result" :title="t('success')" :description="t('description')">
      <template #footer>
        <mp-button type="success" @click="success = false">{{ t('button') }}</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:show="error" :default-style="false">
    <mp-result class="result" type="error" :title="t('error')" :description="t('description')">
      <template #footer>
        <mp-button type="danger" @click="error = false">{{ t('button') }}</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:show="warning" :default-style="false">
    <mp-result class="result" type="warning" :title="t('warning')" :description="t('description')">
      <template #footer>
        <mp-button type="warning" @click="warning = false">{{ t('button') }}</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:show="info" :default-style="false">
    <mp-result class="result" type="info" :title="t('info')" :description="t('description')">
      <template #footer>
        <mp-button type="info" @click="info = false">{{ t('button') }}</mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:show="question" :default-style="false">
    <mp-result class="result" type="question" :title="t('question')" :description="t('description')">
      <template #footer>
        <mp-button color="var(--mp-result-question-color)" text-color="#fff" @click="question = false"
          >{{ t('button') }}
        </mp-button>
      </template>
    </mp-result>
  </mp-popup>

  <mp-popup v-model:show="empty" :default-style="false">
    <mp-result class="result" type="empty" :title="t('empty')" :description="t('description')">
      <template #footer>
        <mp-button color="var(--mp-result-empty-color)" text-color="#fff" @click="empty = false"
          >{{ t('button') }}
        </mp-button>
      </template>
    </mp-result>
  </mp-popup>
</template>

<style scoped>
.result {
  width: 75vmin;
}
</style>
