<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Message } from '@maplejs/maple-ui'
import { t, use } from './locale'

const countdown = ref(null)
const time = ref(3000)

watchLang(use)
onThemeChange()

function end() {
  Message.info('end!')
}

function change() {
  console.log('change')
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-countdown time="108000000" />

  <app-type>{{ t('customFormat') }}</app-type>
  <mp-countdown time="108000000" :format="t('format')" />

  <app-type>{{ t('showMillisecond') }}</app-type>
  <mp-countdown time="108000000" format="HH : mm : ss : SS" />

  <app-type>{{ t('customStyle') }}</app-type>
  <mp-countdown time="108000000">
    <template #default="timeData">
      <span class="countdown-example-block">{{ timeData.hours }}</span>
      <span class="countdown-example-colon">:</span>
      <span class="countdown-example-block">{{ timeData.minutes }}</span>
      <span class="countdown-example-colon">:</span>
      <span class="countdown-example-block">{{ timeData.seconds }}</span>
    </template>
  </mp-countdown>

  <app-type>{{ t('manualControl') }}</app-type>
  <mp-countdown ref="countdown" :time="time" :auto-start="false" format="ss : SSS" @end="end" @change="change" />
  <mp-row justify="space-between" align="center" style="margin-top: 10px">
    <mp-button type="primary" @click="$refs.countdown.start()">{{ t('startText') }}</mp-button>
    <mp-button @click="$refs.countdown.pause()">{{ t('pauseText') }}</mp-button>
    <mp-button @click="$refs.countdown.reset()">{{ t('resetText') }}</mp-button>
  </mp-row>
</template>

<style scoped>
.countdown-example-block {
  background: var(--mp-color-primary);
  color: var(--mp-color-on-primary);
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
