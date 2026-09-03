<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const started = ref(false)
const values = [8, 88, 888, 1888, 12880]
const index = ref(0)
const count = ref(values[0])
let timer = 0

watchLang(use)
onThemeChange()

onMounted(() => {
  timer = window.setInterval(() => {
    index.value = (index.value + 1) % values.length
    count.value = values[index.value]
  }, 800)
})

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-statistic :title="t('downloads')" :value="125670" show-group-separator />
    <mp-statistic :title="t('comments')" :extra="t('comparedToYesterday')" :value="40509" :precision="2" />
    <mp-statistic :title="t('activeUsers')" value="1.28k" />
  </mp-space>

  <app-type>{{ t('prefixSuffix') }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-statistic :title="t('accountBalance')" :value="125670" prefix="$" show-group-separator />
    <mp-statistic
      :title="t('growthRate')"
      :value="12.8"
      :precision="1"
      suffix="%"
      :value-style="{ color: 'var(--mp-color-success)' }"
    >
      <template #prefix>▲</template>
    </mp-statistic>
    <mp-statistic
      :title="t('bounceRate')"
      :value="3.2"
      :precision="1"
      suffix="%"
      :value-style="{ color: 'var(--mp-color-danger)' }"
    >
      <template #prefix>▼</template>
    </mp-statistic>
  </mp-space>

  <app-type>{{ t('tabularNums') }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-statistic :title="t('tabularOff')" :value="count" show-group-separator />
    <mp-statistic :title="t('tabularNums')" :value="count" show-group-separator tabular-nums />
  </mp-space>

  <app-type>{{ t('extra') }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-statistic :title="t('revenue')" :value="9280" prefix="$" show-group-separator :extra="t('extraRevenue')" />
    <mp-statistic :title="t('newUsers')" :value="1280" show-group-separator>
      <template #extra>
        <span style="color: var(--mp-color-success)">{{ t('extraLastWeek') }}</span>
      </template>
    </mp-statistic>
  </mp-space>

  <app-type>{{ t('animation') }}</app-type>
  <mp-space align="flex-end" size="lg">
    <mp-statistic
      :title="t('growthRate')"
      :value="50.52"
      :precision="2"
      :value-from="0"
      :start="started"
      suffix="%"
      animation
    >
      <template #prefix>▲</template>
    </mp-statistic>
    <mp-button status="primary" @click="started = true">{{ t('startText') }}</mp-button>
  </mp-space>

  <app-type>{{ t('customValue') }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-statistic :title="t('activeUsers')">
      <mp-count-to :from="0" :to="125670" :duration="2000" />
    </mp-statistic>
    <mp-statistic :title="t('conversionRate')" suffix="%">
      <mp-count-to :from="0" :to="36.8" :duration="2000" :precision="1" />
    </mp-statistic>
  </mp-space>

  <app-type>{{ t('countdown') }}</app-type>
  <mp-space direction="column" size="lg">
    <mp-statistic :title="t('countdown')">
      <mp-countdown :time="2 * 60 * 60 * 1000" />
    </mp-statistic>
    <mp-statistic :title="t('campaign')">
      <mp-countdown :time="4 * 24 * 60 * 60 * 1000" format="DD 天 HH 时 mm 分 ss 秒" />
    </mp-statistic>
  </mp-space>
</template>
