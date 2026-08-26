<script setup>
import { computed, ref } from 'vue'
import { AppType, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

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

const { value: outlinedValue, options: outlinedOptions } = useAutoComplete()
const { value: outlinedValue2, options: outlinedOptions2 } = useAutoComplete()
const { value: outlinedValue3, options: outlinedOptions3 } = useAutoComplete()
const { value: outlinedValue4, options: outlinedOptions4 } = useAutoComplete()
const { value: outlinedValue5, options: outlinedOptions5 } = useAutoComplete()
const { value: outlinedValue7, options: outlinedOptions7 } = useAutoComplete()
const { value: outlinedValue8, options: outlinedOptions8 } = useAutoComplete()
const { value: outlinedValue9, options: outlinedOptions9 } = useAutoComplete()
const { value: outlinedValue10, options: outlinedOptions10 } = useAutoComplete()
const { value: outlinedValue11, options: outlinedOptions11 } = useAutoComplete()

watchLang(use)

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
  <app-type>{{ t('standard') }}</app-type>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-auto-complete v-model="standardValue" :placeholder="t('placeholder')" :options="standardOptions" />
    <mp-auto-complete v-model="standardValue2" readonly :placeholder="t('readonly')" :options="standardOptions2" />
    <mp-auto-complete v-model="standardValue3" disabled :placeholder="t('disabled')" :options="standardOptions3" />
    <mp-auto-complete v-model="standardValue4" clearable :placeholder="t('clearable')" :options="standardOptions4" />
    <mp-auto-complete v-model="standardValue5" clearable :placeholder="t('clearIconSlot')" :options="standardOptions5">
      <template #clear-icon="{ clear }">
        <m-icon-error @click="clear" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete v-model="standardValue7" :placeholder="t('displayIcon')" :options="standardOptions7">
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete v-model="standardValue8" :placeholder="t('customIconSize')" :options="standardOptions8">
      <template #prefix>
        <m-icon-github class="prefix" size="8vmin" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" size="12vmin" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete
      v-model="standardValue9"
      :placeholder="t('maxLength')"
      :max-length="10"
      :options="standardOptions9"
    />
    <mp-auto-complete
      v-model="standardValue10"
      :placeholder="t('customMenuShowTiming')"
      :get-show="(value) => value.length > 3"
      :options="standardOptions10"
    />
    <mp-auto-complete v-model="standardValue11" size="sm" :placeholder="t('smallSize')" :options="standardOptions11" />
  </mp-space>

  <app-type style="margin-top: 10vmin">{{ t('outlined') }}</app-type>
  <mp-space direction="column" :size="['6vmin', 0]">
    <mp-auto-complete
      v-model="outlinedValue"
      variant="outlined"
      :placeholder="t('placeholder')"
      :options="outlinedOptions"
    />
    <mp-auto-complete
      v-model="outlinedValue2"
      variant="outlined"
      readonly
      :placeholder="t('readonly')"
      :options="outlinedOptions2"
    />
    <mp-auto-complete
      v-model="outlinedValue3"
      variant="outlined"
      disabled
      :placeholder="t('disabled')"
      :options="outlinedOptions3"
    />
    <mp-auto-complete
      v-model="outlinedValue4"
      variant="outlined"
      clearable
      :placeholder="t('clearable')"
      :options="outlinedOptions4"
    />
    <mp-auto-complete
      v-model="outlinedValue5"
      variant="outlined"
      clearable
      :placeholder="t('clearIconSlot')"
      :options="outlinedOptions5"
    >
      <template #clear-icon="{ clear }">
        <m-icon-error @click="clear" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete
      v-model="outlinedValue7"
      variant="outlined"
      :placeholder="t('displayIcon')"
      :options="outlinedOptions7"
    >
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete
      v-model="outlinedValue8"
      variant="outlined"
      :placeholder="t('customIconSize')"
      :options="outlinedOptions8"
    >
      <template #prefix>
        <m-icon-github class="prefix" size="8vmin" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" size="12vmin" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete
      v-model="outlinedValue9"
      variant="outlined"
      :placeholder="t('maxLength')"
      :max-length="10"
      :options="outlinedOptions9"
    />
    <mp-auto-complete
      v-model="outlinedValue10"
      variant="outlined"
      :placeholder="t('customMenuShowTiming')"
      :get-show="(value) => value.length > 3"
      :options="outlinedOptions10"
    />
    <mp-auto-complete
      v-model="outlinedValue11"
      variant="outlined"
      size="sm"
      :placeholder="t('smallSize')"
      :options="outlinedOptions11"
    />
  </mp-space>
</template>

<style scoped lang="less">
.prefix {
  margin-right: 6px;
}

.suffix {
  margin-left: 6px;
}
</style>
