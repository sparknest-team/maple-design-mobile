<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Snackbar } from '@maplejs/maple-ui'
import { t, use } from './locale'

const value = ref()
const valueNormal = ref()
const valueSmall = ref()
const valueMini = ref()
const valueLarge = ref()
const valueOptionDisabled = ref()
const valueMapping = ref()
const valueScrollable = ref()
const valueCloseOnSelect = ref()
const valueMultiple = ref([])
const valueSelectOptions = ref()
const valueKeyedSelectOptions = ref()
const options = ref(Array.from({ length: 30 }, (_, index) => ({ label: `Option ${index + 1}`, value: index })))
const selectOptions = computed(() => [
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
const keyedSelectOptions = computed(() => [
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

const cascadeValue = ref()
const cascadeMultipleValue = ref([])
const cascadeOptions = ref([
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
    children: [
      {
        label: '2-1',
        value: 21,
        children: [
          {
            label: '2-1-1',
            value: 211,
          },
          {
            label: '2-1-2',
            value: 212,
          },
        ],
      },
      {
        label: '2-2',
        value: 22,
      },
    ],
  },
  {
    label: '3',
    value: 3,
  },
])

watchLang((lang) => {
  use(lang)
  value.value = undefined
  valueNormal.value = undefined
  valueSmall.value = undefined
  valueLarge.value = undefined
  valueMini.value = undefined
  valueOptionDisabled.value = undefined
  valueMapping.value = undefined
  valueScrollable.value = undefined
  valueCloseOnSelect.value = undefined
  valueMultiple.value = []
  cascadeValue.value = undefined
  cascadeMultipleValue.value = []
})

onThemeChange()

function handleSelect(value) {
  Snackbar(`Select: ${value}`)
}
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-menu-select v-model="value">
    <mp-button type="primary">{{ value ? value : t('please') }}</mp-button>

    <template #options>
      <mp-menu-option :label="t('eat')" />
      <mp-menu-option :label="t('sleep')" />
      <mp-menu-option :label="t('play')" />
    </template>
  </mp-menu-select>

  <app-type>{{ t('onSelect') }}</app-type>
  <mp-menu-select @select="handleSelect">
    <mp-button type="primary">{{ t('please') }}</mp-button>

    <template #options>
      <mp-menu-option :label="t('eat')" />
      <mp-menu-option :label="t('sleep')" />
      <mp-menu-option :label="t('play')" />
    </template>
  </mp-menu-select>

  <app-type>{{ t('size') }}</app-type>
  <mp-space align="center" :size="[20, 60]">
    <mp-menu-select v-model="valueNormal">
      <mp-button type="primary">{{ valueNormal ? valueNormal : t('normal') }}</mp-button>

      <template #options>
        <mp-menu-option :label="t('eat')" />
        <mp-menu-option :label="t('sleep')" />
        <mp-menu-option :label="t('play')" />
      </template>
    </mp-menu-select>

    <mp-menu-select v-model="valueSmall" size="small">
      <mp-button type="primary">{{ valueSmall ? valueSmall : t('small') }}</mp-button>

      <template #options>
        <mp-menu-option :label="t('eat')" />
        <mp-menu-option :label="t('sleep')" />
        <mp-menu-option :label="t('play')" />
      </template>
    </mp-menu-select>

    <mp-menu-select v-model="valueMini" size="mini">
      <mp-button type="primary">{{ valueMini ? valueMini : t('mini') }}</mp-button>

      <template #options>
        <mp-menu-option :label="t('eat')" />
        <mp-menu-option :label="t('sleep')" />
        <mp-menu-option :label="t('play')" />
      </template>
    </mp-menu-select>

    <mp-menu-select v-model="valueLarge" size="large">
      <mp-button type="primary">{{ valueLarge ? valueLarge : t('large') }}</mp-button>

      <template #options>
        <mp-menu-option :label="t('eat')" />
        <mp-menu-option :label="t('sleep')" />
        <mp-menu-option :label="t('play')" />
      </template>
    </mp-menu-select>
  </mp-space>

  <app-type>{{ t('valueMapping') }}</app-type>
  <mp-menu-select v-model="valueMapping">
    <mp-button type="primary">{{ valueMapping ? `value: ${valueMapping}` : t('please') }}</mp-button>

    <template #options>
      <mp-menu-option :label="t('eat')" :value="1" />
      <mp-menu-option :label="t('sleep')" :value="2" />
      <mp-menu-option :label="t('play')" :value="3" />
    </template>
  </mp-menu-select>

  <app-type>{{ t('scrollable') }}</app-type>
  <mp-menu-select v-model="valueScrollable" scrollable>
    <mp-button type="primary">{{ valueScrollable ? valueScrollable : t('please') }}</mp-button>

    <template #options>
      <mp-menu-option v-for="option in options" :key="option.value" :label="option.label" />
    </template>
  </mp-menu-select>

  <app-type>{{ t('optionDisabled') }}</app-type>
  <mp-menu-select v-model="valueOptionDisabled">
    <mp-button type="primary">{{ valueOptionDisabled ? valueOptionDisabled : t('please') }}</mp-button>

    <template #options>
      <mp-menu-option :label="t('eat')" />
      <mp-menu-option :label="t('sleep')" />
      <mp-menu-option :label="t('play')" disabled />
    </template>
  </mp-menu-select>

  <app-type>{{ t('multiple') }}</app-type>
  <mp-menu-select v-model="valueMultiple" multiple>
    <mp-button type="primary">{{ valueMultiple.length ? valueMultiple : t('please') }}</mp-button>

    <template #options>
      <mp-menu-option :label="t('eat')" />
      <mp-menu-option :label="t('sleep')" />
      <mp-menu-option :label="t('play')" />
      <mp-menu-option :label="t('coding')" />
      <mp-menu-option :label="t('rest')" />
    </template>
  </mp-menu-select>

  <app-type>{{ t('closeOnSelect') }}</app-type>
  <mp-menu-select v-model="valueCloseOnSelect" :close-on-select="false">
    <mp-button type="primary">{{ valueCloseOnSelect ? valueCloseOnSelect : t('please') }}</mp-button>

    <template #options>
      <mp-menu-option :label="t('eat')" />
      <mp-menu-option :label="t('sleep')" />
      <mp-menu-option :label="t('play')" />
    </template>
  </mp-menu-select>

  <app-type>{{ t('selectOptions') }}</app-type>
  <mp-menu-select v-model="valueSelectOptions" :options="selectOptions">
    <mp-button type="primary">{{ valueSelectOptions ? valueSelectOptions : t('please') }}</mp-button>
  </mp-menu-select>

  <app-type>{{ t('cascade') }}</app-type>
  <mp-menu-select v-model="cascadeValue" :options="cascadeOptions">
    <mp-button type="primary">{{ cascadeValue ? cascadeValue : t('please') }}</mp-button>
  </mp-menu-select>

  <app-type>{{ t('multipleCascade') }}</app-type>
  <mp-menu-select v-model="cascadeMultipleValue" multiple :options="cascadeOptions">
    <mp-button type="primary">{{ cascadeMultipleValue.length ? cascadeMultipleValue : t('please') }}</mp-button>
  </mp-menu-select>

  <app-type>{{ t('selectOptionsWithCustomizedKey') }}</app-type>
  <mp-menu-select v-model="valueKeyedSelectOptions" :options="keyedSelectOptions" label-key="name" value-key="id">
    <mp-button type="primary">{{ valueKeyedSelectOptions ? valueKeyedSelectOptions : t('please') }}</mp-button>
  </mp-menu-select>
</template>
