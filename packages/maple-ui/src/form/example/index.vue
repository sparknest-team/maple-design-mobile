<script setup>
import { computed, reactive, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import MpCustomFormComponent from './CustomFormComponent'
import { t, use } from './locale'

const formData = reactive({
  username: '',
  password: '',
  email: '',
  department: '',
  gender: undefined,
  license: false,
  range: 0,
  count: 0,
  group: [],
  score: 0,
  like: [],
  files: [],
  custom: false,
})

const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)
const suggestions = computed(() =>
  ['@qq.com', '@163.com', '@gmail.com'].map((suffix) => {
    const [prefix] = formData.email.split('@')
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  }),
)

watchLang((lang) => {
  use(lang)
  form.value?.reset()
})

onThemeChange()
</script>

<template>
  <app-type>{{ t('example') }}</app-type>

  <mp-form
    ref="form"
    :disabled="disabled"
    :readonly="readonly"
    scroll-to-error="start"
    scroll-to-error-offset-y="14.4vmin"
  >
    <mp-space direction="column" :size="['4vmin', 0]">
      <mp-input
        v-model="formData.username"
        :placeholder="t('username')"
        :rules="[(v) => !!v || t('usernameMessage')]"
      />
      <mp-input
        v-model="formData.password"
        type="password"
        :placeholder="t('password')"
        :rules="[(v) => !!v || t('passwordMessage'), (v) => v.length >= 8 || t('passwordMinLengthMessage')]"
      />
      <mp-auto-complete
        v-model="formData.email"
        :placeholder="t('email')"
        :rules="[(v) => !!v || t('emailMessage')]"
        :options="suggestions"
      />
      <mp-select
        v-model="formData.department"
        :placeholder="t('department')"
        :rules="[(v) => !!v || t('departmentMessage')]"
      >
        <mp-option :label="`${t('eat')}${t('departmentUnit')}`" />
        <mp-option :label="`${t('sleep')}${t('departmentUnit')}`" />
        <mp-option :label="`${t('play')}${t('departmentUnit')}`" />
      </mp-select>
      <mp-select
        v-model="formData.group"
        multiple
        :placeholder="t('group')"
        :rules="[(v) => v.length >= 1 || t('groupMessage')]"
      >
        <mp-option :label="`${t('eat')}${t('groupUnit')}`" />
        <mp-option :label="`${t('sleep')}${t('groupUnit')}`" />
        <mp-option :label="`${t('play')}${t('groupUnit')}`" />
      </mp-select>
      <mp-radio-group v-model="formData.gender" :rules="[(v) => !!v || t('genderMessage')]">
        <mp-radio :checked-value="1">{{ t('male') }}</mp-radio>
        <mp-radio :checked-value="2">{{ t('female') }}</mp-radio>
      </mp-radio-group>
      <mp-checkbox-group v-model="formData.like" :rules="[(v) => v.length > 0 || t('likeMessage')]">
        <mp-checkbox :checked-value="1">{{ t('eat') }}</mp-checkbox>
        <mp-checkbox :checked-value="2">{{ t('sleep') }}</mp-checkbox>
        <mp-checkbox :checked-value="3">{{ t('play') }}</mp-checkbox>
      </mp-checkbox-group>
      <mp-rate v-model="formData.score" :rules="[(v) => v >= 3 || t('rateMessage')]" />
      <mp-switch v-model="formData.license" variant :rules="[(v) => !!v || t('licenseMessage')]" />
      <mp-counter v-model="formData.count" :rules="[(v) => v > 10 || t('countMessage')]" />
      <mp-slider v-model="formData.range" :rules="[(v) => v > 10 || t('rangeMessage')]" />
      <mp-uploader v-model="formData.files" :rules="[(v) => v.length >= 1 || t('filesMessage')]" />
    </mp-space>

    <app-type>{{ t('customFormComponent') }}</app-type>
    <mp-custom-form-component
      v-model="formData.custom"
      :extra-message="t('customExtraMessage')"
      :rules="[(v) => !!v || t('customErrorMessage')]"
    >
      {{ t('customLabel') }}
    </mp-custom-form-component>
  </mp-form>

  <app-type>{{ t('controller') }}</app-type>

  <mp-space direction="column" :size="['4vmin', 0]">
    <mp-button block type="danger" @click="form.reset()">{{ t('reset') }}</mp-button>
    <mp-button block type="warning" @click="form.resetValidation()">{{ t('resetValidation') }}</mp-button>
    <mp-button block type="success" @click="form.validate()">{{ t('validate') }}</mp-button>
    <mp-button block type="info" @click="disabled = !disabled">{{ t('disabled') }}</mp-button>
    <mp-button block type="primary" @click="readonly = !readonly">{{ t('readonly') }}</mp-button>
  </mp-space>

  <div class="space"></div>
</template>

<style scoped lang="less">
.space {
  height: 40px;
}
</style>
