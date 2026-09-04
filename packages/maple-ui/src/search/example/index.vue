<script setup>
import { computed, reactive, ref } from 'vue'
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
const model = reactive({})

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
  console.log('search', result)
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
  console.log('change', value, model)
}

function reset() {
  Object.keys(model).forEach((key) => {
    delete model[key]
  })
}

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basic') }}</app-type>
  <mp-search v-model="value" :label="t('label')" :placeholder="t('placeholder')" @search="handleSearch" />

  <app-type style="margin-top: 8vmin">{{ t('action') }}</app-type>
  <mp-search v-model="actionValue" :placeholder="t('placeholder')" show-action :action-text="t('cancel')" />

  <app-type style="margin-top: 8vmin">{{ t('searchButton') }}</app-type>
  <mp-search
    v-model="searchButtonValue"
    :placeholder="t('placeholder')"
    show-action
    action-type="search"
    :action-text="t('search')"
    @search="handleSearch"
  />

  <mp-search
    v-model="menuHistoryValue"
    :placeholder="t('placeholder')"
    :recent-searches="menuRecentSearches"
    :history-popup="false"
    show-action
    action-type="search"
    :action-text="t('search')"
    @search="handleMenuHistorySearch"
  />

  <app-type style="margin-top: 8vmin">{{ t('history') }}</app-type>
  <mp-search
    v-model="historyValue"
    :placeholder="t('placeholder')"
    :recent-searches="recentSearches"
    show-action
    action-type="search"
    :action-text="t('search')"
    @search="handleHistorySearch"
  />

  <app-type style="margin-top: 8vmin">{{ t('fields') }}</app-type>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-search
      v-model:model-field="modelField"
      :model="model"
      :fields="fields"
      :select-style="{ minWidth: '28vmin' }"
      show-action
      action-type="search"
      :action-text="t('search')"
      @change="handleChange"
      @search="handleSearch"
    />
    <mp-button variant="text" @click="reset">{{ t('reset') }}</mp-button>
  </mp-space>

  <app-type style="margin-top: 8vmin">{{ t('shape') }}</app-type>
  <mp-search v-model="squareValue" :placeholder="t('placeholder')" shape="square" />

  <app-type style="margin-top: 8vmin">{{ t('state') }}</app-type>
  <mp-search v-model="disabledValue" :placeholder="t('placeholder')" disabled />
</template>
