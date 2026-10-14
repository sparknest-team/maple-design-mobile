<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maplejs/maple-cli/client'

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
</script>

<template>
  <mp-radio-group v-model="value6">
    <mp-radio :value="0">{{ english ? 'Eat' : '吃饭' }}</mp-radio>
    <mp-radio :value="1">{{ english ? 'Sleep' : '睡觉' }}</mp-radio>
  </mp-radio-group>
  <div class="relation">{{ english ? 'Current value' : '当前的值' }}: {{ value6 }}</div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
