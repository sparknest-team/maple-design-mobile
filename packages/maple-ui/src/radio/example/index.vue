<script setup>
import { computed, reactive, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value9: 0,
  optionValue: 0,
  fieldValue: 0,
})
const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)

const options = computed(() => [
  { label: t('eat'), value: 0 },
  { label: t('sleep'), value: 1 },
  { label: t('game'), value: 2, disabled: true },
])

const fieldOptions = computed(() => [
  { name: t('eat'), id: 0 },
  { name: t('sleep'), id: 1 },
  { name: t('game'), id: 2 },
])

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-radio v-model="value">{{ t('currentValue') }} {{ value }}</mp-radio>

  <app-type>{{ t('setState') }}</app-type>
  <mp-radio v-model="value2" :value="1"> {{ t('currentValue') }} {{ value2 }} </mp-radio>

  <app-type>{{ t('setStyle') }}</app-type>
  <mp-radio v-model="value3" unchecked-color="var(--mp-color-warning)" checked-color="var(--mp-color-danger)">
    <template #unchecked-icon>
      <m-icon-heart-half-full size="24px" />
    </template>
    <template #checked-icon>
      <m-icon-heart-fill size="24px" />
    </template>
    <template #default> {{ t('currentValue') }} {{ value3 }} </template>
  </mp-radio>

  <app-type>{{ t('disabled') }}</app-type>
  <mp-radio v-model="value4" disabled>{{ t('currentValue') }} {{ value4 }}</mp-radio>

  <app-type>{{ t('readonly') }}</app-type>
  <mp-radio v-model="value5" readonly>{{ t('currentValue') }} {{ value5 }}</mp-radio>

  <app-type>{{ t('radioGroup') }}</app-type>
  <mp-radio-group v-model="value6">
    <mp-radio :value="0">{{ t('eat') }}</mp-radio>
    <mp-radio :value="1">{{ t('sleep') }}</mp-radio>
  </mp-radio-group>
  <div class="relation">{{ t('currentValue') }} {{ value6 }}</div>

  <app-type>{{ t('radioGroupOptions') }}</app-type>
  <mp-radio-group v-model="optionValue" :options="options" />
  <div class="relation">{{ t('currentValue') }} {{ optionValue }}</div>

  <app-type>{{ t('customFields') }}</app-type>
  <mp-radio-group v-model="fieldValue" :options="fieldOptions" :field-names="{ label: 'name', value: 'id' }" />
  <div class="relation">{{ t('currentValue') }} {{ fieldValue }}</div>

  <app-type>{{ t('vertical') }}</app-type>
  <mp-radio-group v-model="value9" direction="vertical">
    <mp-radio :value="0">{{ t('eat') }}</mp-radio>
    <mp-radio :value="1">{{ t('sleep') }}</mp-radio>
  </mp-radio-group>
  <div class="relation">{{ t('currentValue') }} {{ value9 }}</div>

  <div class="space"></div>
</template>

<style scoped lang="less">
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
