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
  form.value?.resetFields()
})

onThemeChange()
</script>

<template>
  <app-type>{{ t('example') }}</app-type>

  <mp-form
    ref="form"
    :model="formData"
    :disabled="disabled"
    :readonly="readonly"
    scroll-to-error="start"
    scroll-to-error-offset-y="14.4vmin"
  >
    <mp-space direction="column" :size="['4vmin', 0]">
      <mp-form-item field="username" :rules="[(v) => !!v || t('usernameMessage')]">
        <mp-input v-model="formData.username" :placeholder="t('username')" />
      </mp-form-item>
      <mp-form-item
        field="password"
        :rules="[(v) => !!v || t('passwordMessage'), (v) => v.length >= 8 || t('passwordMinLengthMessage')]"
      >
        <mp-input v-model="formData.password" type="password" :placeholder="t('password')" />
      </mp-form-item>
      <mp-form-item field="email" :rules="[(v) => !!v || t('emailMessage')]">
        <mp-auto-complete v-model="formData.email" :placeholder="t('email')" :options="suggestions" />
      </mp-form-item>
      <mp-form-item field="department" :rules="[(v) => !!v || t('departmentMessage')]">
        <mp-select v-model="formData.department" :placeholder="t('department')">
          <mp-option :label="`${t('eat')}${t('departmentUnit')}`" />
          <mp-option :label="`${t('sleep')}${t('departmentUnit')}`" />
          <mp-option :label="`${t('play')}${t('departmentUnit')}`" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="group" :rules="[(v) => v.length >= 1 || t('groupMessage')]">
        <mp-select v-model="formData.group" multiple :placeholder="t('group')">
          <mp-option :label="`${t('eat')}${t('groupUnit')}`" />
          <mp-option :label="`${t('sleep')}${t('groupUnit')}`" />
          <mp-option :label="`${t('play')}${t('groupUnit')}`" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="gender" :rules="[(v) => !!v || t('genderMessage')]">
        <mp-radio-group v-model="formData.gender">
          <mp-radio :checked-value="1">{{ t('male') }}</mp-radio>
          <mp-radio :checked-value="2">{{ t('female') }}</mp-radio>
        </mp-radio-group>
      </mp-form-item>
      <mp-form-item field="like" :rules="[(v) => v.length > 0 || t('likeMessage')]">
        <mp-checkbox-group v-model="formData.like">
          <mp-checkbox :checked-value="1">{{ t('eat') }}</mp-checkbox>
          <mp-checkbox :checked-value="2">{{ t('sleep') }}</mp-checkbox>
          <mp-checkbox :checked-value="3">{{ t('play') }}</mp-checkbox>
        </mp-checkbox-group>
      </mp-form-item>
      <mp-form-item field="score" :rules="[(v) => v >= 3 || t('rateMessage')]">
        <mp-rate v-model="formData.score" />
      </mp-form-item>
      <mp-form-item field="license" :rules="[(v) => !!v || t('licenseMessage')]">
        <mp-switch v-model="formData.license" variant />
      </mp-form-item>
      <mp-form-item field="count" :rules="[(v) => v > 10 || t('countMessage')]">
        <mp-counter v-model="formData.count" />
      </mp-form-item>
      <mp-form-item field="range" :rules="[(v) => v > 10 || t('rangeMessage')]">
        <mp-slider v-model="formData.range" />
      </mp-form-item>
      <mp-form-item field="files" :rules="[(v) => v.length >= 1 || t('filesMessage')]">
        <mp-uploader v-model="formData.files" />
      </mp-form-item>
    </mp-space>

    <app-type>{{ t('customFormComponent') }}</app-type>
    <mp-form-item field="custom" :rules="[(v) => !!v || t('customErrorMessage')]" :help="t('customExtraMessage')">
      <mp-custom-form-component v-model="formData.custom">
        {{ t('customLabel') }}
      </mp-custom-form-component>
    </mp-form-item>
  </mp-form>

  <app-type>{{ t('controller') }}</app-type>

  <mp-space direction="column" :size="['4vmin', 0]">
    <mp-button block status="danger" @click="form.resetFields()">{{ t('reset') }}</mp-button>
    <mp-button block status="warning" @click="form.clearValidate()">{{ t('resetValidation') }}</mp-button>
    <mp-button block status="success" @click="form.validate()">{{ t('validate') }}</mp-button>
    <mp-button block status="info" @click="disabled = !disabled">{{ t('disabled') }}</mp-button>
    <mp-button block status="primary" @click="readonly = !readonly">{{ t('readonly') }}</mp-button>
  </mp-space>

  <div class="space"></div>
</template>

<style scoped lang="less">
.space {
  height: 40px;
}
</style>
