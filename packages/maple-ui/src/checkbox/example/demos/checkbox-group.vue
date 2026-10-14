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
</script>

<template>
  <mp-checkbox-group ref="group" v-model="value6">
    <mp-checkbox :value="0">{{ english ? 'Eat' : '吃饭' }}</mp-checkbox>
    <mp-checkbox :value="1">{{ english ? 'Sleep' : '睡觉' }}</mp-checkbox>
  </mp-checkbox-group>
  <div class="relation">{{ english ? 'Current value' : '当前的值' }}: {{ value6 }}</div>
  <mp-divider size-y="14px" />
  <mp-space :size="[0, 10]">
    <mp-button status="primary" @click="$refs.group.checkAll()">{{ english ? 'Check all' : '全选' }}</mp-button>
    <mp-button status="primary" @click="$refs.group.inverseAll()">{{ english ? 'Invert' : '反选' }}</mp-button>
  </mp-space>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
