<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const date = ref()
const calendarDate = ref()
const year = ref()
const month = ref()
const multiple = ref([])
const dateTime = ref()
const disabledDate = ref('2024-01-15')
const form = ref(null)
const formData = reactive({
  birthday: undefined,
})

use()
watchLang(use)
onThemeChange()
</script>

<template>
  <mp-space direction="column" size="lg">
    <app-type>{{ t('basicUsage') }}</app-type>
    <mp-date v-model="date" :placeholder="t('placeholder')" clearable />

    <app-type>{{ t('calendarMode') }}</app-type>
    <mp-date v-model="calendarDate" presentation="calendar" :placeholder="t('calendarPlaceholder')" clearable />

    <app-type>{{ t('type') }}</app-type>
    <mp-date v-model="year" type="year" :placeholder="t('year')" clearable />
    <mp-date v-model="month" type="month" :placeholder="t('month')" clearable />

    <app-type>{{ t('multiple') }}</app-type>
    <mp-date v-model="multiple" multiple :placeholder="t('multiplePlaceholder')" clearable />

    <app-type>{{ t('dateTime') }}</app-type>
    <mp-date v-model="dateTime" show-time :placeholder="t('dateTimePlaceholder')" clearable />

    <app-type>{{ t('disabled') }}</app-type>
    <mp-date v-model="disabledDate" disabled />

    <app-type>{{ t('withFormItem') }}</app-type>
    <mp-form ref="form" :model="formData">
      <mp-form-item field="birthday" :label="t('birthday')" required>
        <mp-date v-model="formData.birthday" :placeholder="t('formPlaceholder')" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
