<script setup>
import { computed, reactive, toRefs } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { z } from 'zod'
import { t, use } from './locale'

const values = reactive({
  value: false,
  value2: 0,
  value3: false,
  value4: false,
  value5: false,
  value6: [],
  value7: false,
  value8: [],
  value9: [],
  value10: false,
  value11: [],
  value12: false,
  value13: [],
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
  value7,
  value8,
  value9,
  group,
  value10,
  value11,
  value12,
  value13,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)

const options = computed(() => [
  { label: t('eat'), value: 0 },
  { label: t('sleep'), value: 1 },
  { label: t('game'), value: 2, disabled: true },
])

const fieldOptions = computed(() => [
  { name: t('eat'), id: 0 },
  { name: t('sleep'), id: 1 },
  { name: t('game'), id: 2 },
])

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-checkbox v-model="value">{{ t('currentValue') }} {{ value }}</mp-checkbox>

  <app-type>{{ t('setState') }}</app-type>
  <mp-checkbox v-model="value2" :unchecked-value="0" :checked-value="1">
    {{ t('currentValue') }} {{ value2 }}
  </mp-checkbox>

  <app-type>{{ t('setStyle') }}</app-type>
  <mp-checkbox v-model="value3" unchecked-color="var(--mp-color-warning)" checked-color="var(--mp-color-danger)">
    <template #unchecked-icon>
      <mp-icon name="heart-half-full" size="24px" />
    </template>
    <template #checked-icon>
      <mp-icon name="heart" size="24px" />
    </template>
    <template #default> {{ t('currentValue') }} {{ value3 }} </template>
  </mp-checkbox>

  <app-type>{{ t('disabled') }}</app-type>
  <mp-checkbox v-model="value4" disabled>{{ t('currentValue') }} {{ value4 }}</mp-checkbox>

  <app-type>{{ t('readonly') }}</app-type>
  <mp-checkbox v-model="value5" readonly>{{ t('currentValue') }} {{ value5 }}</mp-checkbox>

  <app-type>{{ t('indeterminate') }}</app-type>
  <mp-space :size="[0, 10]">
    <mp-checkbox v-model="value10" v-model:indeterminate="indeterminate">
      {{ t('indeterminateValue') }} {{ indeterminate }}
    </mp-checkbox>
    <mp-button type="primary" @click="indeterminate = !indeterminate">{{ t('toggle') }}</mp-button>
  </mp-space>

  <app-type>{{ t('checkboxGroup') }}</app-type>
  <mp-checkbox-group ref="group" v-model="value6">
    <mp-checkbox :checked-value="0">{{ t('eat') }}</mp-checkbox>
    <mp-checkbox :checked-value="1">{{ t('sleep') }}</mp-checkbox>
  </mp-checkbox-group>
  <div class="relation">{{ t('currentValue') }} {{ value6 }}</div>
  <mp-divider margin="14px 0" />
  <mp-space :size="[0, 10]">
    <mp-button type="primary" @click="$refs.group.checkAll()">{{ t('checkAll') }}</mp-button>
    <mp-button type="primary" @click="$refs.group.inverseAll()">{{ t('inverseAll') }}</mp-button>
  </mp-space>

  <app-type>{{ t('checkboxGroupOptions') }}</app-type>
  <mp-checkbox-group v-model="optionsValue" :options="options" />
  <div class="relation">{{ t('currentValue') }} {{ optionsValue }}</div>

  <app-type>{{ t('customFields') }}</app-type>
  <mp-checkbox-group v-model="fieldValue" :options="fieldOptions" label-key="name" value-key="id" />
  <div class="relation">{{ t('currentValue') }} {{ fieldValue }}</div>

  <app-type>{{ t('vertical') }}</app-type>
  <mp-checkbox-group v-model="value9" direction="vertical">
    <mp-checkbox :checked-value="0">{{ t('eat') }}</mp-checkbox>
    <mp-checkbox :checked-value="1">{{ t('sleep') }}</mp-checkbox>
  </mp-checkbox-group>
  <div class="relation">{{ t('currentValue') }} {{ value9 }}</div>

  <app-type>{{ t('max') }}</app-type>
  <mp-checkbox-group v-model="value11" :max="1">
    <mp-checkbox :checked-value="0">{{ t('eat') }}</mp-checkbox>
    <mp-checkbox :checked-value="1">{{ t('sleep') }}</mp-checkbox>
  </mp-checkbox-group>

  <app-type>{{ t('checkboxValidate') }}</app-type>
  <mp-checkbox v-model="value7" :rules="[(v) => v || t('checkboxValidateMessage')]">
    {{ t('currentValue') }} {{ value7 }}
  </mp-checkbox>

  <app-type>{{ t('checkboxValidateWithZod') }}</app-type>
  <mp-checkbox v-model="value12" :rules="z.boolean().refine((v) => v, { message: t('checkboxValidateMessage') })">
    {{ t('currentValue') }} {{ value12 }}
  </mp-checkbox>

  <app-type>{{ t('checkboxGroupValidate') }}</app-type>
  <mp-checkbox-group v-model="value8" :rules="[(v) => v.length === 2 || t('checkboxGroupValidateMessage')]">
    <mp-checkbox :checked-value="0">{{ t('eat') }}</mp-checkbox>
    <mp-checkbox :checked-value="1">{{ t('sleep') }}</mp-checkbox>
  </mp-checkbox-group>
  <div class="relation">{{ t('currentValue') }} {{ value8 }}</div>

  <app-type>{{ t('checkboxGroupValidateWithZod') }}</app-type>
  <mp-checkbox-group
    v-model="value13"
    :rules="z.array(z.number()).length(2, { message: t('checkboxGroupValidateMessage') })"
  >
    <mp-checkbox :checked-value="0">{{ t('eat') }}</mp-checkbox>
    <mp-checkbox :checked-value="1">{{ t('sleep') }}</mp-checkbox>
  </mp-checkbox-group>
  <div class="relation">{{ t('currentValue') }} {{ value13 }}</div>

  <div class="space"></div>
</template>

<style scoped lang="less">
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
