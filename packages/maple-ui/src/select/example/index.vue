<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const standardValue = ref()
const standardValue2 = ref()
const standardValue3 = ref()
const standardValue4 = ref()
const standardValue5 = ref()
const standardValue6 = ref()
const standardValue7 = ref()
const standardValue8 = ref()
const standardValue9 = ref([])
const standardValue10 = ref([])
const standardValue13 = ref()
const standardValue14 = ref()
const standardValue15 = ref([])
const standardValue16 = ref()

const outlinedValue = ref()
const outlinedValue2 = ref()
const outlinedValue3 = ref()
const outlinedValue4 = ref()
const outlinedValue5 = ref()
const outlinedValue6 = ref()
const outlinedValue7 = ref()
const outlinedValue8 = ref()
const outlinedValue9 = ref([])
const outlinedValue10 = ref([])
const outlinedValue13 = ref()
const outlinedValue14 = ref()
const outlinedValue15 = ref([])
const outlinedValue16 = ref()

const pickerValue = ref()
const pickerValue2 = ref()
const pickerMultiple = ref([])
const listValue = ref()
const listMultiple = ref([])
const options = computed(() => [
  {
    label: t('eat'),
    value: 1,
  },
  {
    label: t('sleep'),
    value: 2,
  },
  {
    label: t('play'),
    value: 3,
    disabled: true,
  },
])
const keyOptions = computed(() => [
  {
    name: t('eat'),
    id: 1,
  },
  {
    name: t('sleep'),
    id: 2,
  },
  {
    name: t('play'),
    id: 3,
    disabled: true,
  },
])

onThemeChange()
watchLang((lang) => {
  standardValue.value = undefined
  standardValue2.value = undefined
  standardValue3.value = undefined
  standardValue4.value = undefined
  standardValue5.value = undefined
  standardValue6.value = undefined
  standardValue7.value = undefined
  standardValue8.value = undefined
  standardValue9.value = []
  standardValue10.value = []
  standardValue13.value = undefined
  standardValue14.value = undefined
  standardValue15.value = []
  standardValue16.value = undefined

  outlinedValue.value = undefined
  outlinedValue2.value = undefined
  outlinedValue3.value = undefined
  outlinedValue4.value = undefined
  outlinedValue5.value = undefined
  outlinedValue6.value = undefined
  outlinedValue7.value = undefined
  outlinedValue8.value = undefined
  outlinedValue9.value = []
  outlinedValue10.value = []
  outlinedValue13.value = undefined
  outlinedValue14.value = undefined
  outlinedValue15.value = []
  outlinedValue16.value = undefined

  pickerValue.value = undefined
  pickerValue2.value = undefined
  pickerMultiple.value = []
  listValue.value = undefined
  listMultiple.value = []

  use(lang)
})
</script>

<template>
  <app-type>{{ t('standard') }}</app-type>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-select v-model="standardValue" :placeholder="t('placeholder')">
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
    </mp-select>
    <mp-select v-model="standardValue2" :placeholder="t('relation')">
      <mp-option :label="t('eat')" :value="1" />
      <mp-option :label="t('sleep')" :value="2" />
    </mp-select>
    <div class="relation">{{ t('currentSelect') }} {{ standardValue2 }}</div>
    <mp-select v-model="standardValue3" :placeholder="t('readonly')" readonly>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
    </mp-select>
    <mp-select v-model="standardValue4" :placeholder="t('disabled')" disabled>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
    </mp-select>
    <mp-select v-model="standardValue5" :placeholder="t('clearable')" clearable>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
    </mp-select>
    <mp-select v-model="standardValue6" :placeholder="t('clearIconSlot')" clearable>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
      <template #clear-icon="{ clear }">
        <m-icon-github class="clear-icon" @click="clear" />
      </template>
    </mp-select>
    <mp-select v-model="standardValue7" :placeholder="t('customIcon')">
      <template #default>
        <mp-option :label="t('eat')">
          <m-icon-cake-variant class="selected-icon" />
          <span>{{ t('eat') }}</span>
        </mp-option>
        <mp-option :label="t('sleep')">
          <m-icon-weather-night class="selected-icon" />
          <span>{{ t('sleep') }}</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="standardValue7 === t('eat')" class="selected-icon" />
        <m-icon-weather-night v-else class="selected-icon" />
        <span>{{ standardValue7 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
    <mp-select v-model="standardValue8" :placeholder="t('customIconSize')">
      <template #default>
        <mp-option :label="t('eat')">
          <m-icon-cake-variant class="selected-icon" />
          <span>{{ t('eat') }}</span>
        </mp-option>
        <mp-option :label="t('sleep')">
          <m-icon-weather-night class="selected-icon" />
          <span>{{ t('sleep') }}</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="standardValue8 === t('eat')" class="selected-icon" size="8vmin" />
        <m-icon-weather-night v-else class="selected-icon" size="8vmin" />
        <span>{{ standardValue8 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" size="8vmin" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" size="12vmin" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
    <mp-select v-model="standardValue9" :placeholder="t('multiple')" multiple>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
      <mp-option :label="t('play')" />
      <mp-option :label="t('coding')" />
    </mp-select>
    <mp-select v-model="standardValue10" :placeholder="t('tagMultiple')" tag multiple>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
      <mp-option :label="t('play')" />
      <mp-option :label="t('coding')" />
    </mp-select>
    <mp-select v-model="standardValue13" :placeholder="t('smallSize')">
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
    </mp-select>
    <mp-select v-model="standardValue14" :placeholder="t('selectOptions')" :options="options" />
    <mp-select v-model="standardValue15" :placeholder="t('selectOptionsMultiple')" :options="options" multiple />
    <mp-select
      v-model="standardValue16"
      :placeholder="t('customFields')"
      :options="keyOptions"
      :field-names="{ label: 'name', value: 'id' }"
    />
  </mp-space>

  <app-type style="margin-top: 10vmin">{{ t('outlined') }}</app-type>
  <mp-space direction="column" :size="['6vmin', 0]">
    <mp-select v-model="outlinedValue" variant="outlined" :placeholder="t('placeholder')">
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
    </mp-select>
    <mp-select v-model="outlinedValue2" variant="outlined" :placeholder="t('relation')">
      <mp-option :label="t('eat')" :value="1" />
      <mp-option :label="t('sleep')" :value="2" />
    </mp-select>
    <div class="relation">{{ t('currentSelect') }} {{ outlinedValue2 }}</div>
    <mp-select v-model="outlinedValue3" variant="outlined" :placeholder="t('readonly')" readonly>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
    </mp-select>
    <mp-select v-model="outlinedValue4" variant="outlined" :placeholder="t('disabled')" disabled>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
    </mp-select>
    <mp-select v-model="outlinedValue5" variant="outlined" :placeholder="t('clearable')" clearable>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
    </mp-select>
    <mp-select v-model="outlinedValue6" variant="outlined" :placeholder="t('clearIconSlot')" clearable>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
      <template #clear-icon="{ clear }">
        <m-icon-github class="clear-icon" @click="clear" />
      </template>
    </mp-select>
    <mp-select v-model="outlinedValue7" variant="outlined" :placeholder="t('customIcon')">
      <template #default>
        <mp-option :label="t('eat')">
          <m-icon-cake-variant class="selected-icon" />
          <span>{{ t('eat') }}</span>
        </mp-option>
        <mp-option :label="t('sleep')">
          <m-icon-weather-night class="selected-icon" />
          <span>{{ t('sleep') }}</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="outlinedValue7 === t('eat')" class="selected-icon" />
        <m-icon-weather-night v-else class="selected-icon" />
        <span>{{ outlinedValue7 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
    <mp-select v-model="outlinedValue8" variant="outlined" :placeholder="t('customIconSize')">
      <template #default>
        <mp-option :label="t('eat')">
          <m-icon-cake-variant class="selected-icon" />
          <span>{{ t('eat') }}</span>
        </mp-option>
        <mp-option :label="t('sleep')">
          <m-icon-weather-night class="selected-icon" />
          <span>{{ t('sleep') }}</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="outlinedValue8 === t('eat')" class="selected-icon" size="8vmin" />
        <m-icon-weather-night v-else class="selected-icon" size="8vmin" />
        <span>{{ outlinedValue8 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" size="8vmin" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" size="12vmin" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
    <mp-select v-model="outlinedValue9" variant="outlined" :placeholder="t('multiple')" multiple>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
      <mp-option :label="t('play')" />
      <mp-option :label="t('coding')" />
    </mp-select>
    <mp-select v-model="outlinedValue10" variant="outlined" :placeholder="t('tagMultiple')" tag multiple>
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
      <mp-option :label="t('play')" />
      <mp-option :label="t('coding')" />
    </mp-select>
    <mp-select v-model="outlinedValue13" variant="outlined" size="sm" :placeholder="t('smallSize')">
      <mp-option :label="t('eat')" />
      <mp-option :label="t('sleep')" />
    </mp-select>
    <mp-select v-model="outlinedValue14" variant="outlined" :placeholder="t('selectOptions')" :options="options" />
    <mp-select
      v-model="outlinedValue15"
      variant="outlined"
      :placeholder="t('selectOptionsMultiple')"
      :options="options"
      multiple
    />
    <mp-select
      v-model="outlinedValue16"
      variant="outlined"
      :placeholder="t('customFields')"
      :options="keyOptions"
      :field-names="{ label: 'name', value: 'id' }"
    />
  </mp-space>

  <app-type style="margin-top: 10vmin">{{ t('picker') }}</app-type>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-select v-model="pickerValue" presentation="picker" :placeholder="t('pickerPlaceholder')" :options="options" />
    <mp-select
      v-model="pickerValue2"
      presentation="picker"
      :placeholder="t('pickerCustomFields')"
      :options="keyOptions"
      :field-names="{ label: 'name', value: 'id' }"
    />
    <mp-select
      v-model="pickerMultiple"
      presentation="picker"
      multiple
      tag
      clearable
      :placeholder="t('pickerMultiple')"
      :options="options"
    />
  </mp-space>

  <app-type style="margin-top: 10vmin">{{ t('list') }}</app-type>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-select v-model="listValue" presentation="list" :placeholder="t('listPlaceholder')" :options="options" />
    <mp-select
      v-model="listMultiple"
      presentation="list"
      multiple
      tag
      clearable
      :placeholder="t('listMultiple')"
      :options="options"
    />
  </mp-space>

  <div class="space"></div>
</template>

<style scoped lang="less">
.space {
  height: 200px;
}

.selected-icon {
  margin-right: 6px;
}

.prefix {
  margin-right: 6px;
}

.suffix {
  margin-left: 6px;
}

.arrow-icon-rotate {
  transform: rotate(180deg);
}
</style>
