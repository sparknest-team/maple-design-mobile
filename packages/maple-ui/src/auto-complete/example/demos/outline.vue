<script setup>
import { computed, ref } from 'vue'

const { value: outlineValue, options: outlineOptions } = useAutoComplete()
const { value: outlineValue2, options: outlineOptions2 } = useAutoComplete()
const { value: outlineValue3, options: outlineOptions3 } = useAutoComplete()
const { value: outlineValue4, options: outlineOptions4 } = useAutoComplete()
const { value: outlineValue5, options: outlineOptions5 } = useAutoComplete()
const { value: outlineValue7, options: outlineOptions7 } = useAutoComplete()
const { value: outlineValue8, options: outlineOptions8 } = useAutoComplete()
const { value: outlineValue9, options: outlineOptions9 } = useAutoComplete()
const { value: outlineValue10, options: outlineOptions10 } = useAutoComplete()
const { value: outlineValue11, options: outlineOptions11 } = useAutoComplete()
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
  <mp-space direction="column" :size="['6vmin', 0]">
    <mp-auto-complete v-model="outlineValue" variant="outline" placeholder="请输入文本" :options="outlineOptions" />
    <mp-auto-complete
      v-model="outlineValue2"
      variant="outline"
      readonly
      placeholder="只读"
      :options="outlineOptions2"
    />
    <mp-auto-complete
      v-model="outlineValue3"
      variant="outline"
      disabled
      placeholder="禁用"
      :options="outlineOptions3"
    />
    <mp-auto-complete
      v-model="outlineValue4"
      variant="outline"
      clearable
      placeholder="可清除"
      :options="outlineOptions4"
    />
    <mp-auto-complete
      v-model="outlineValue5"
      variant="outline"
      clearable
      placeholder="使用插槽自定义清除图标"
      :options="outlineOptions5"
    >
      <template #clear-icon="{ clear }">
        <m-icon-error @click="clear" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete v-model="outlineValue7" variant="outline" placeholder="显示图标" :options="outlineOptions7">
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete v-model="outlineValue8" variant="outline" placeholder="自定义图标尺寸" :options="outlineOptions8">
      <template #prefix>
        <m-icon-github class="prefix" size="8vmin" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" size="12vmin" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete
      v-model="outlineValue9"
      variant="outline"
      placeholder="最大长度"
      :max-length="10"
      :options="outlineOptions9"
    />
    <mp-auto-complete
      v-model="outlineValue10"
      variant="outline"
      placeholder="自定义菜单显示时机"
      :should-open="(value) => value.length > 3"
      :options="outlineOptions10"
    />
    <mp-auto-complete
      v-model="outlineValue11"
      variant="outline"
      size="sm"
      placeholder="小尺寸"
      :options="outlineOptions11"
    />
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
