<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const value = ref('')
const actionValue = ref('')
const searchButtonValue = ref('')
const historyValue = ref('')
const menuHistoryValue = ref('')
const recentSearches = ref(['Maple', 'Cedar', 'InputNumber'])
const menuRecentSearches = ref(['设备名称', '订单编号', '操作人'])
const squareValue = ref('')
const disabledValue = ref('Disabled')
const modelField = ref('name')
const fieldValue = ref('')
const model = ref({})
const latestResult = ref()
const latestChange = ref('')

const fields = computed(() => [
  {
    value: 'id',
    label: t('deviceId'),
    placeholder: t('idPlaceholder'),
  },
  {
    value: 'name',
    label: t('deviceName'),
    placeholder: t('namePlaceholder'),
  },
  {
    value: 'desc',
    label: t('deviceDesc'),
    placeholder: t('descPlaceholder'),
  },
])

function handleSearch(result) {
  latestResult.value = result
}

function handleHistorySearch(result) {
  recentSearches.value = result.recentSearches
  handleSearch(result)
}

function handleMenuHistorySearch(result) {
  menuRecentSearches.value = result.recentSearches
  handleSearch(result)
}

function handleChange(value) {
  latestChange.value = value
}

function reset() {
  model.value = {}
}

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basic') }}</app-type>
  <mp-search v-model="value" :label="t('label')" :placeholder="t('placeholder')" clearable @search="handleSearch" />

  <app-type style="margin-top: 8vmin">{{ t('action') }}</app-type>
  <mp-search v-model="actionValue" :placeholder="t('placeholder')" show-action :action-text="t('cancel')" />

  <app-type style="margin-top: 8vmin">{{ t('searchButton') }}</app-type>
  <mp-search
    v-model="searchButtonValue"
    :placeholder="t('placeholder')"
    search-button
    :button-text="t('search')"
    @search="handleSearch"
  />

  <mp-search
    v-model="menuHistoryValue"
    :placeholder="t('placeholder')"
    :recent-searches="menuRecentSearches"
    :history-popup="false"
    search-button
    :button-text="t('search')"
    @search="handleMenuHistorySearch"
  />

  <app-type style="margin-top: 8vmin">{{ t('history') }}</app-type>
  <mp-search
    v-model="historyValue"
    :placeholder="t('placeholder')"
    :recent-searches="recentSearches"
    search-button
    :button-text="t('search')"
    @search="handleHistorySearch"
  />

  <app-type style="margin-top: 8vmin">{{ t('fields') }}</app-type>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-search
      v-model="fieldValue"
      v-model:model-field="modelField"
      v-model:model="model"
      :fields="fields"
      :select-style="{ minWidth: '28vmin' }"
      search-button
      :button-text="t('search')"
      @change="handleChange"
      @search="handleSearch"
    />
    <mp-button text @click="reset">{{ t('reset') }}</mp-button>
  </mp-space>

  <app-type style="margin-top: 8vmin">{{ t('shape') }}</app-type>
  <mp-search v-model="squareValue" :placeholder="t('placeholder')" shape="square" />

  <app-type style="margin-top: 8vmin">{{ t('state') }}</app-type>
  <mp-search v-model="disabledValue" :placeholder="t('placeholder')" disabled />
  <mp-search :placeholder="t('placeholder')" search-button :button-text="t('search')" loading />

  <app-type v-if="latestResult" style="margin-top: 8vmin">{{ t('result') }}</app-type>
  <pre v-if="latestResult">{{ JSON.stringify(latestResult, null, 2) }}</pre>
  <div v-if="latestChange">{{ t('change') }}: {{ latestChange }}</div>
</template>
