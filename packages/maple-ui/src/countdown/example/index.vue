<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const countdownRef = ref()

watchLang(use)
onThemeChange()

function handleEnd() {
  Message.info('end!')
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-countdown :time="2 * 60 * 60 * 1000" />

  <app-type>{{ t('customFormat') }}</app-type>
  <mp-countdown :time="4 * 24 * 60 * 60 * 1000" :format="t('format')" />

  <app-type>{{ t('showMillisecond') }}</app-type>
  <mp-countdown :time="2 * 60 * 60 * 1000" format="HH:mm:ss.SSS" />

  <app-type>{{ t('customStyle') }}</app-type>
  <mp-countdown :time="108000000">
    <template #default="{ hours, minutes, seconds }">
      <span class="countdown-example-block">{{ hours }}</span>
      <span class="countdown-example-colon">:</span>
      <span class="countdown-example-block">{{ minutes }}</span>
      <span class="countdown-example-colon">:</span>
      <span class="countdown-example-block">{{ seconds }}</span>
    </template>
  </mp-countdown>

  <app-type>{{ t('manualControl') }}</app-type>
  <mp-countdown ref="countdownRef" :time="5000" :auto-start="false" format="ss.SSS" @end="handleEnd" />
  <mp-row justify="space-between" align="center" style="margin-top: 10px">
    <mp-button status="primary" @click="countdownRef.start()">{{ t('startText') }}</mp-button>
    <mp-button @click="countdownRef.pause()">{{ t('pauseText') }}</mp-button>
    <mp-button @click="countdownRef.reset()">{{ t('resetText') }}</mp-button>
  </mp-row>

  <app-type>{{ t('embedStatistic') }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-statistic :title="t('countdown')">
      <mp-countdown :time="2 * 60 * 60 * 1000" />
    </mp-statistic>
    <mp-statistic :title="t('campaign')">
      <mp-countdown :time="4 * 24 * 60 * 60 * 1000" format="DD 天 HH 时 mm 分 ss 秒" />
    </mp-statistic>
  </mp-space>
</template>

<style scoped>
.countdown-example-block {
  background: var(--mp-color-primary);
  color: var(--mp-color-white);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.countdown-example-colon {
  margin: 0 5px;
  font-size: 18px;
  font-weight: 500;
}
</style>
