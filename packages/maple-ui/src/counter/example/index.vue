<script setup>
import { reactive } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const values = reactive({
  value: 0,
  value2: 0,
  value3: 0,
  value4: 0,
  value5: 0,
  value6: 0,
  value7: 0,
  value8: 0,
})

watchLang(use)
onThemeChange()

function handleBeforeChange(value, change) {
  setTimeout(() => {
    change(value)
  }, 500)
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-counter v-model="values.value" />

  <app-type>{{ t('range') }}</app-type>
  <mp-counter v-model="values.value2" :min="0" :max="5" />

  <app-type>{{ t('step') }}</app-type>
  <mp-counter v-model="values.value3" :step="10" />

  <app-type>{{ t('toFixed') }}</app-type>
  <mp-counter v-model="values.value4" :decimal-length="1" />

  <app-type>{{ t('size') }}</app-type>
  <mp-counter v-model="values.value5" input-text-size="18px" input-width="50px" button-size="36px" />

  <app-type>{{ t('disabled') }}</app-type>
  <mp-counter v-model="values.value6" disabled />

  <app-type>{{ t('readonly') }}</app-type>
  <mp-counter v-model="values.value7" readonly />

  <app-type>{{ t('lazyChange') }}</app-type>
  <mp-counter v-model="values.value8" lazy-change @before-change="handleBeforeChange" />

  <div class="space"></div>
</template>

<style scoped lang="less">
.space {
  height: 40px;
}
</style>
