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
      :should-open="(value) => value.length > 3"
      :options="standardOptions10"
    />
    <mp-auto-complete v-model="standardValue11" size="sm" :placeholder="t('smallSize')" :options="standardOptions11" />
  </mp-space>

  <app-type style="margin-top: 10vmin">{{ t('outline') }}</app-type>
  <mp-space direction="column" :size="['6vmin', 0]">
    <mp-auto-complete
      v-model="outlineValue"
      variant="outline"
      :placeholder="t('placeholder')"
      :options="outlineOptions"
    />
    <mp-auto-complete
      v-model="outlineValue2"
      variant="outline"
      readonly
      :placeholder="t('readonly')"
      :options="outlineOptions2"
    />
    <mp-auto-complete
      v-model="outlineValue3"
      variant="outline"
      disabled
      :placeholder="t('disabled')"
      :options="outlineOptions3"
    />
    <mp-auto-complete
      v-model="outlineValue4"
      variant="outline"
      clearable
      :placeholder="t('clearable')"
      :options="outlineOptions4"
    />
    <mp-auto-complete
      v-model="outlineValue5"
      variant="outline"
      clearable
      :placeholder="t('clearIconSlot')"
      :options="outlineOptions5"
    >
      <template #clear-icon="{ clear }">
        <m-icon-error @click="clear" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete
      v-model="outlineValue7"
      variant="outline"
      :placeholder="t('displayIcon')"
      :options="outlineOptions7"
    >
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
    </mp-auto-complete>
    <mp-auto-complete
      v-model="outlineValue8"
      variant="outline"
      :placeholder="t('customIconSize')"
      :options="outlineOptions8"
    >
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
      :placeholder="t('maxLength')"
      :max-length="10"
      :options="outlineOptions9"
    />
    <mp-auto-complete
      v-model="outlineValue10"
      variant="outline"
      :placeholder="t('customMenuShowTiming')"
      :should-open="(value) => value.length > 3"
      :options="outlineOptions10"
    />
    <mp-auto-complete
      v-model="outlineValue11"
      variant="outline"
      size="sm"
      :placeholder="t('smallSize')"
      :options="outlineOptions11"
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
