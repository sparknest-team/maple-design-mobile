<script setup>
import { reactive, ref } from 'vue'
import { AppType, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const state = reactive({
  score: 5,
  license: true,
})

const styleVars = ref(null)

const successTheme = {
  '--mp-rate-primary-color': 'var(--mp-color-success)',
  '--mp-button-primary-color': 'var(--mp-color-success)',
  '--mp-switch-handle-active-background': 'var(--mp-color-success)',
  '--mp-switch-track-active-background': 'var(--mp-color-success)',
}

watchLang(use)

function toggleTheme() {
  styleVars.value = styleVars.value ? null : successTheme
}
</script>

<template>
  <app-type>{{ t('componentCall') }}</app-type>
  <mp-style-provider :style-vars="styleVars">
    <mp-rate v-model="state.score" />
    <mp-switch v-model="state.license" />
    <mp-button style="margin-top: 10px" status="primary" block @click="toggleTheme">{{ t('toggleTheme') }}</mp-button>
  </mp-style-provider>
</template>
