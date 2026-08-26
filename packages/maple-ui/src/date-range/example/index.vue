<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const range = ref([])
const rangeCalendar = ref(['2024-01-01', '2024-12-31'])
const dateTimeRange = ref([])
const yearRange = ref([])
const monthRange = ref([])
const customSeparator = ref([])
const disabledRange = ref(['2024-01-01', '2024-01-15'])
const form = ref(null)
const formData = reactive({
  period: [],
})

use()
watchLang(use)
onThemeChange()
</script>

<template>
  <mp-space direction="column" size="large">
    <app-type>{{ t('basicUsage') }}</app-type>
    <mp-date-range v-model="range" :placeholder="t('placeholder')" clearable />

    <app-type>{{ t('calendarMode') }}</app-type>
    <mp-date-range v-model="rangeCalendar" presentation="calendar" :placeholder="t('calendarPlaceholder')" clearable />

    <app-type>{{ t('dateTime') }}</app-type>
    <mp-date-range v-model="dateTimeRange" show-time :placeholder="t('dateTimePlaceholder')" clearable />

    <app-type>{{ t('type') }}</app-type>
    <mp-date-range v-model="yearRange" type="year" :placeholder="t('year')" clearable />
    <mp-date-range v-model="monthRange" type="month" :placeholder="t('month')" clearable />

    <app-type>{{ t('separator') }}</app-type>
    <mp-date-range v-model="customSeparator" separator=" 至 " :placeholder="t('separatorPlaceholder')" clearable />

    <app-type>{{ t('disabled') }}</app-type>
    <mp-date-range v-model="disabledRange" disabled />

    <app-type>{{ t('withFormItem') }}</app-type>
    <mp-form ref="form" :model="formData">
      <mp-form-item field="period" :label="t('period')" required>
        <mp-date-range v-model="formData.period" :placeholder="t('formPlaceholder')" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
