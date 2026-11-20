<script setup lang="ts">
import { computed, proxyRefs as demoProxyRefs, reactive, toRefs } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
    const values = reactive({
      value: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,
      value6: 0,
      value9: 0,
      optionValue: 0,
      fieldValue: 0,
    })

    const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
    return {
      values,
      value,
      value2,
      value3,
      value4,
      value5,
      value6,
      value9,
      optionValue,
      fieldValue,
    }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
    const values = reactive({
      value: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,
      value6: 0,
      value9: 0,
      optionValue: 0,
      fieldValue: 0,
    })

    const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)

    const options = computed(() => [
      { label: 'Eat', value: 0 },
      { label: 'Sleep', value: 1 },
      { label: 'Game', value: 2, disabled: true },
    ])
    return {
      values,
      value,
      value2,
      value3,
      value4,
      value5,
      value6,
      value9,
      optionValue,
      fieldValue,
      options,
    }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="radio-group">
      <h4>RadioGroup</h4>
      <mp-radio-group v-model="scene1.value6">
        <mp-radio :value="0">Eat</mp-radio>
        <mp-radio :value="1">Sleep</mp-radio>
      </mp-radio-group>
      <div class="relation">Current value: {{ scene1.value6 }}</div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="radio-group-options">
      <h4>Options API</h4>
      <mp-radio-group v-model="scene2.optionValue" :options="scene2.options" />
      <div class="relation">Current value: {{ scene2.optionValue }}</div>
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

.demo-comparison-case--1 {
  .relation {
    margin-top: 10px;
  }

  .button {
    margin-right: 10px;
  }

  .space {
    height: 40px;
  }
}
.demo-comparison-case--2 {
  .relation {
    margin-top: 10px;
  }

  .button {
    margin-right: 10px;
  }

  .space {
    height: 40px;
  }
}
</style>
