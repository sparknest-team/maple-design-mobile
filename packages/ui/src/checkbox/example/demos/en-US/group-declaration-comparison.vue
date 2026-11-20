<script setup lang="ts">
import { computed, proxyRefs as demoProxyRefs, reactive, ref, toRefs } from 'vue'
import type { CheckboxGroupInstance } from '@maple-design/ui-vue'

const scene1 = demoProxyRefs(
  (() => {
    const values = reactive({
      value: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,
      value6: [],
      value9: [],
      value10: false,
      value11: [],
      group: null as CheckboxGroupInstance | null,
      indeterminate: true,
      optionsValue: [],
      fieldValue: [],
    })

    const {
      value,
      value2,
      value3,
      value4,
      value5,
      value6,
      value9,
      group,
      value10,
      value11,
      indeterminate,
      optionsValue,
      fieldValue,
    } = toRefs(values)
    return {
      values,
      value,
      value2,
      value3,
      value4,
      value5,
      value6,
      value9,
      group,
      value10,
      value11,
      indeterminate,
      optionsValue,
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
      value6: [],
      value9: [],
      value10: false,
      value11: [],
      group: null as CheckboxGroupInstance | null,
      indeterminate: true,
      optionsValue: [],
      fieldValue: [],
    })

    const {
      value,
      value2,
      value3,
      value4,
      value5,
      value6,
      value9,
      group,
      value10,
      value11,
      indeterminate,
      optionsValue,
      fieldValue,
    } = toRefs(values)

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
      group,
      value10,
      value11,
      indeterminate,
      optionsValue,
      fieldValue,
      options,
    }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="checkbox-group">
      <h4>CheckboxGroup</h4>
      <mp-checkbox-group
        :ref="(element: unknown) => (scene1.group = element as CheckboxGroupInstance | null)"
        v-model="scene1.value6"
      >
        <mp-checkbox :value="0">Eat</mp-checkbox>
        <mp-checkbox :value="1">Sleep</mp-checkbox>
      </mp-checkbox-group>
      <div class="relation">Current value: {{ scene1.value6 }}</div>
      <mp-divider spacing="14px" />
      <mp-space wrap :size="[0, 10]">
        <mp-button status="primary" @click="scene1.group?.checkAll()">Check all</mp-button>
        <mp-button status="primary" @click="scene1.group?.inverseAll()">Invert</mp-button>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="checkbox-group-options">
      <h4>Options API</h4>
      <mp-checkbox-group v-model="scene2.optionsValue" :options="scene2.options" />
      <div class="relation">Current value: {{ scene2.optionsValue }}</div>
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

  .space {
    height: 40px;
  }
}
.demo-comparison-case--2 {
  .relation {
    margin-top: 10px;
  }

  .space {
    height: 40px;
  }
}
</style>
