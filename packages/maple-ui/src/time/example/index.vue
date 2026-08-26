<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const time = ref()
const time24 = ref()
const timeWithSeconds = ref()
const clockTime = ref()
const disabledTime = ref('09:30')
const readonlyTime = ref('09:30')
const form = ref(null)
const formData = reactive({
  alarm: undefined,
})

use()
watchLang(use)
onThemeChange()
</script>

<template>
  <mp-space direction="column" size="large">
    <app-type>{{ t('basicUsage') }}</app-type>
    <mp-time v-model="time" :placeholder="t('placeholder')" clearable />

    <app-type>{{ t('hour24') }}</app-type>
    <mp-time v-model="time24" format="24hr" :placeholder="t('hour24Placeholder')" clearable />

    <app-type>{{ t('showSecond') }}</app-type>
    <mp-time v-model="timeWithSeconds" format="24hr" use-seconds :placeholder="t('secondsPlaceholder')" clearable />

    <app-type>{{ t('clockPresentation') }}</app-type>
    <mp-time v-model="clockTime" format="24hr" presentation="clock" :placeholder="t('clockPlaceholder')" clearable />

    <app-type>{{ t('disabled') }}</app-type>
    <mp-time v-model="disabledTime" format="24hr" disabled />

    <app-type>{{ t('readonly') }}</app-type>
    <mp-time v-model="readonlyTime" format="24hr" readonly />

    <app-type>{{ t('withFormItem') }}</app-type>
    <mp-form ref="form" :model="formData">
      <mp-form-item field="alarm" :label="t('alarm')" required>
        <mp-time v-model="formData.alarm" :placeholder="t('formPlaceholder')" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
