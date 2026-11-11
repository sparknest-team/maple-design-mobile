<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'

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
  group: null,
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
const fieldOptions = computed(() => [
  { name: english.value ? 'Eat' : '吃饭', id: 0 },
  { name: english.value ? 'Sleep' : '睡觉', id: 1 },
  { name: english.value ? 'Game' : '游戏', id: 2 },
])
</script>

<template>
  <mp-checkbox-group v-model="fieldValue" :options="fieldOptions" :field-names="{ label: 'name', value: 'id' }" />
  <div class="relation">{{ english ? 'Current value' : '当前的值' }}: {{ fieldValue }}</div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
