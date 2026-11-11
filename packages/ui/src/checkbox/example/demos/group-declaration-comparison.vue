<script setup lang="ts">
import { computed, proxyRefs as demoProxyRefs, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'
import type { CheckboxGroupInstance } from '@maple-design/ui-vue'

const scene1 = demoProxyRefs(
  (() => {
    const demoLanguage = ref('zh-CN')

    const english = computed(() => demoLanguage.value === 'en-US')

    watchLang((value) => {
      demoLanguage.value = value
    })

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
      demoLanguage,
      english,
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
    const demoLanguage = ref('zh-CN')

    const english = computed(() => demoLanguage.value === 'en-US')

    watchLang((value) => {
      demoLanguage.value = value
    })

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
      { label: english.value ? 'Eat' : '吃饭', value: 0 },
      { label: english.value ? 'Sleep' : '睡觉', value: 1 },
      { label: english.value ? 'Game' : '游戏', value: 2, disabled: true },
    ])
    return {
      demoLanguage,
      english,
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
      <h4><span lang="zh-CN">复选框组</span><span lang="en-US">CheckboxGroup</span></h4>
      <mp-checkbox-group
        :ref="(element: unknown) => (scene1.group = element as CheckboxGroupInstance | null)"
        v-model="scene1.value6"
      >
        <mp-checkbox :value="0">{{ scene1.english ? 'Eat' : '吃饭' }}</mp-checkbox>
        <mp-checkbox :value="1">{{ scene1.english ? 'Sleep' : '睡觉' }}</mp-checkbox>
      </mp-checkbox-group>
      <div class="relation">{{ scene1.english ? 'Current value' : '当前的值' }}: {{ scene1.value6 }}</div>
      <mp-divider spacing="14px" />
      <mp-space wrap :size="[0, 10]">
        <mp-button status="primary" @click="scene1.group?.checkAll()">{{
          scene1.english ? 'Check all' : '全选'
        }}</mp-button>
        <mp-button status="primary" @click="scene1.group?.inverseAll()">{{
          scene1.english ? 'Invert' : '反选'
        }}</mp-button>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="checkbox-group-options">
      <h4><span lang="zh-CN">选项式 API</span><span lang="en-US">Options API</span></h4>
      <mp-checkbox-group v-model="scene2.optionsValue" :options="scene2.options" />
      <div class="relation">{{ scene2.english ? 'Current value' : '当前的值' }}: {{ scene2.optionsValue }}</div>
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
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
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
