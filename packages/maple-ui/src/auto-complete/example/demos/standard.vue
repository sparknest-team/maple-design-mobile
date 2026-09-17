<script setup>
import { computed, ref } from 'vue'

const { value: standardValue, options: standardOptions } = useAutoComplete()
const { value: standardValue2, options: standardOptions2 } = useAutoComplete()
const { value: standardValue3, options: standardOptions3 } = useAutoComplete()
const { value: standardValue4, options: standardOptions4 } = useAutoComplete()
const { value: standardValue5, options: standardOptions5 } = useAutoComplete()
const { value: standardValue7, options: standardOptions7 } = useAutoComplete()
const { value: standardValue8, options: standardOptions8 } = useAutoComplete()
const { value: standardValue9, options: standardOptions9 } = useAutoComplete()
const { value: standardValue10, options: standardOptions10 } = useAutoComplete()
const { value: standardValue11, options: standardOptions11 } = useAutoComplete()
function useAutoComplete() {
  const value = ref('')
  const options = computed(() =>
    ['@qq.com', '@163.com', '@gmail.com'].map((suffix) => {
      const [prefix] = value.value.split('@')
      return {
        label: `${prefix}${suffix}`,
        value: `${prefix}${suffix}`,
      }
    }),
  )

  return {
    value,
    options,
  }
}
</script>

<template>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-auto-complete v-model="standardValue" placeholder="请输入文本" :options="standardOptions" />
    <mp-auto-complete v-model="standardValue2" readonly placeholder="只读" :options="standardOptions2" />
    <mp-auto-complete v-model="standardValue3" disabled placeholder="禁用" :options="standardOptions3" />
    <mp-auto-complete v-model="standardValue4" clearable placeholder="可清除" :options="standardOptions4" />
    <mp-auto-complete
      v-model="standardValue5"
      clearable
      placeholder="使用插槽自定义清除图标"
      :options="standardOptions5"
    >
      <template #clear-icon="{ clear }">
        <m-icon-error @click="clear" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete v-model="standardValue7" placeholder="显示图标" :options="standardOptions7">
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete v-model="standardValue8" placeholder="自定义图标尺寸" :options="standardOptions8">
      <template #prefix>
        <m-icon-github class="prefix" size="8vmin" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" size="12vmin" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete v-model="standardValue9" placeholder="最大长度" :max-length="10" :options="standardOptions9" />
    <mp-auto-complete
      v-model="standardValue10"
      placeholder="自定义菜单显示时机"
      :should-open="(value) => value.length > 3"
      :options="standardOptions10"
    />
    <mp-auto-complete v-model="standardValue11" size="sm" placeholder="小尺寸" :options="standardOptions11" />
  </mp-space>
</template>

<style lang="less" scoped>
.prefix {
  margin-right: 6px;
}

.suffix {
  margin-left: 6px;
}
</style>
