<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const range = ref([])
const rangeClock = ref(['09:00', '18:00'])
const rangePickerSeconds = ref(['09:00:00', '18:00:00'])
const range24 = ref([])
const customSeparator = ref(['09:00', '18:00'])
const nextDayRange = ref(['22:00', '06:00'])
const disabledRange = ref(['09:00', '18:00'])
const form = ref(null)
const formData = reactive({
  period: [],
})

use()
watchLang(use)
onThemeChange()
</script>

<template>
  <mp-space direction="column" size="lg">
    <app-type>{{ t('basicUsage') }}</app-type>
    <mp-time-range v-model="range" :placeholder="t('placeholder')" clearable />

    <app-type>{{ t('clockMode') }}</app-type>
    <mp-time-range
      v-model="rangeClock"
      presentation="clock"
      format="24hr"
      :placeholder="t('clockPlaceholder')"
      clearable
    />

    <app-type>{{ t('pickerSeconds') }}</app-type>
    <mp-time-range
      v-model="rangePickerSeconds"
      format="24hr"
      use-seconds
      :placeholder="t('pickerSecondsPlaceholder')"
      clearable
    />

    <app-type>{{ t('hour24') }}</app-type>
    <mp-time-range v-model="range24" format="24hr" use-seconds :placeholder="t('secondsPlaceholder')" clearable />

    <app-type>{{ t('separator') }}</app-type>
    <mp-time-range
      v-model="customSeparator"
      separator=" 至 "
      format="24hr"
      :placeholder="t('separatorPlaceholder')"
      clearable
    />

    <app-type>{{ t('nextDay') }}</app-type>
    <mp-time-range
      v-model="nextDayRange"
      show-next-day
      format="24hr"
      :placeholder="t('nextDayPlaceholder')"
      clearable
    />

    <app-type>{{ t('disabled') }}</app-type>
    <mp-time-range v-model="disabledRange" format="24hr" disabled />

    <app-type>{{ t('withFormItem') }}</app-type>
    <mp-form ref="form" :model="formData">
      <mp-form-item field="period" :label="t('period')" required>
        <mp-time-range v-model="formData.period" :placeholder="t('formPlaceholder')" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
