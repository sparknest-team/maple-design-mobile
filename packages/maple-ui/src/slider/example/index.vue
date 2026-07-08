<script setup>
import { reactive } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { z } from 'zod'
import { t, use } from './locale'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value8: 20,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
  value14: 20,
})

watchLang(use)
onThemeChange()

function handleChange(v) {
  console.log(v)
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-slider v-model="values.value" />

  <app-type>{{ t('stepSize') }}</app-type>
  <mp-slider v-model="values.value2" :step="10" />

  <app-type>{{ t('dualThumb') }}</app-type>
  <mp-slider v-model="values.value1" range @change="handleChange" />

  <app-type>{{ t('range') }}</app-type>
  <mp-slider v-model="values.value11" :max="210" :min="-50" label-visible="always" />

  <app-type>{{ t('disable') }}</app-type>
  <mp-slider v-model="values.value3" disabled />

  <app-type>{{ t('readonly') }}</app-type>
  <mp-slider v-model="values.value3" readonly />

  <app-type>{{ t('sliderSize') }}</app-type>
  <mp-slider v-model="values.value10" track-height="1.5vmin" range />

  <app-type>{{ t('customStyle') }}</app-type>
  <mp-slider
    v-model="values.value4"
    label-color="purple"
    active-color="#e0732c"
    track-color="#3a68b4"
    thumb-color="#e25241"
    label-text-color="#ededed"
  />

  <app-type>{{ t('customBtn') }}</app-type>
  <mp-slider v-model="values.value9" range active-color="#52af77">
    <template #button="{ currentValue }">
      <div class="slider-example__block">{{ currentValue }}</div>
    </template>
  </mp-slider>

  <app-type>{{ t('showLabel') }}</app-type>
  <mp-slider v-model="values.value5" label-visible="never" />
  <mp-slider v-model="values.value6" />
  <mp-slider v-model="values.value7" label-visible="always" />

  <app-type>{{ t('validateValue') }}</app-type>
  <mp-slider v-model="values.value8" :rules="[(v) => v > 35 || t('errMsg')]" />

  <app-type>{{ t('validateWithZod') }}</app-type>
  <mp-slider v-model="values.value14" :rules="z.number().min(36, t('errMsg'))" />

  <app-type>{{ t('vertical') }}</app-type>
  <mp-space justify="space-around">
    <div style="height: 300px">
      <mp-slider v-model="values.value12" direction="vertical" />
    </div>
    <div style="height: 300px">
      <mp-slider v-model="values.value13" range label-visible="always" direction="vertical" />
    </div>
  </mp-space>
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
