<script setup lang="ts">
import { computed, proxyRefs as demoProxyRefs, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli/client'

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
      value6: 0,
      value9: 0,
      optionValue: 0,
      fieldValue: 0,
    })

    const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
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
      optionValue,
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
      value6: 0,
      value9: 0,
      optionValue: 0,
      fieldValue: 0,
    })

    const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)

    const options = computed(() => [
      { label: english.value ? 'Eat' : '吃饭', value: 0 },
      { label: english.value ? 'Sleep' : '睡觉', value: 1 },
      { label: english.value ? 'Game' : '打游戏', value: 2, disabled: true },
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
      <h4><span lang="zh-CN">单选框组</span><span lang="en-US">RadioGroup</span></h4>
      <mp-radio-group v-model="scene1.value6">
        <mp-radio :value="0">{{ scene1.english ? 'Eat' : '吃饭' }}</mp-radio>
        <mp-radio :value="1">{{ scene1.english ? 'Sleep' : '睡觉' }}</mp-radio>
      </mp-radio-group>
      <div class="relation">{{ scene1.english ? 'Current value' : '当前的值' }}: {{ scene1.value6 }}</div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="radio-group-options">
      <h4><span lang="zh-CN">选项式 API</span><span lang="en-US">Options API</span></h4>
      <mp-radio-group v-model="scene2.optionValue" :options="scene2.options" />
      <div class="relation">{{ scene2.english ? 'Current value' : '当前的值' }}: {{ scene2.optionValue }}</div>
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
