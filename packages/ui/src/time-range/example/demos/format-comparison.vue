<script setup lang="ts">
import { proxyRefs as demoProxyRefs, reactive, ref } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const range = ref([])

    const range24 = ref([])
    return { range, range24 }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const value = ref(['11:30 pm', '12:30 am'])

    const workday = ref(['09:00 AM', '06:00 PM'])
    return { value, workday }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="hour24">
      <h4>24 小时制与秒</h4>
      <mp-space direction="column" size="lg">
        <mp-time-range v-model="scene1.range24" format="HH:mm:ss" placeholder="含秒的时间范围" clearable />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="ampm">
      <h4>AM/PM 与午夜/中午</h4>
      <mp-space direction="column" :size="12" style="width: 100%">
        <p>分别切换起止端的 AM/PM；12 AM 是午夜，12 PM 是中午。</p>
        <mp-time-range
          v-model="scene2.value"
          format="hh:mm a"
          use12-hours
          show-next-day
          style="width: 100%; max-width: 360px"
        />

        <mp-time-range v-model="scene2.workday" format="hh:mm A" use12-hours />
        <mp-time-range-picker v-model="scene2.value" format="hh:mm a" use12-hours show-next-day />
        <span>当前值: {{ scene2.value }}</span>
      </mp-space>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
</style>
