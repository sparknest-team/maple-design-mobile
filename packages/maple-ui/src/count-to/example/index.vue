<script setup>
import { ref } from 'vue'
import { AppType, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const countToRef = ref()

watchLang(use)
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-count-to :to="123456" />

  <app-type>{{ t('precision') }}</app-type>
  <mp-count-to :to="123456" :precision="2" />

  <app-type>{{ t('customDuration') }}</app-type>
  <mp-count-to :to="123456" :duration="10000" />

  <app-type>{{ t('customStyle') }}</app-type>
  <mp-count-to :to="123456">
    <template #default="{ value }">
      {{ value.toLocaleString() }}
    </template>
  </mp-count-to>

  <app-type>{{ t('customAnimationCurve') }}</app-type>
  <mp-count-to :to="123456" :timing-function="(v) => 1 - Math.pow(1 - v, 3)" />

  <app-type>{{ t('manualControl') }}</app-type>
  <mp-count-to ref="countToRef" :to="123456" :auto-start="false" />
  <mp-row justify="space-between" align="center" style="margin-top: 10px">
    <mp-button type="primary" @click="countToRef.start()">{{ t('startText') }}</mp-button>
    <mp-button @click="countToRef.pause()">{{ t('pauseText') }}</mp-button>
    <mp-button @click="countToRef.reset()">{{ t('resetText') }} </mp-button>
  </mp-row>
</template>
