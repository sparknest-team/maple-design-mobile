<script setup>
import { computed, reactive, ref } from 'vue'
import { onThemeChange } from '@maple-design/cli-vue/client'

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
onThemeChange()
</script>

<template>
  <mp-form
    ref="form"
    :model="formData"
    :disabled="disabled"
    :readonly="readonly"
    scroll-to-error="start"
    scroll-to-error-offset-y="14.4vmin"
  >
    <mp-space direction="column" align="stretch">
      <mp-form-item field="username" :rules="[(v) => !!v || '用户名不能为空']">
        <mp-input v-model="formData.username" placeholder="请输入用户名" />
      </mp-form-item>
      <mp-form-item
        field="password"
        :rules="[(v) => !!v || '密码不能为空', (v) => v.length >= 8 || '密码长度不能低于8位']"
      >
        <mp-input v-model="formData.password" type="password" placeholder="请输入密码" />
      </mp-form-item>
      <mp-form-item field="email" :rules="[(v) => !!v || '邮箱不能为空']">
        <mp-auto-complete v-model="formData.email" placeholder="请输入邮箱" :options="suggestions" />
      </mp-form-item>
      <mp-form-item field="department" :rules="[(v) => !!v || '必须选一个部门']">
        <mp-select v-model="formData.department" placeholder="请选择部门">
          <mp-option :label="`${'吃饭'}${'部'}`" />
          <mp-option :label="`${'睡觉'}${'部'}`" />
          <mp-option :label="`${'打游戏'}${'部'}`" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="group" :rules="[(v) => v.length >= 1 || '至少选择一个组织']">
        <mp-select v-model="formData.group" multiple placeholder="请选择组织">
          <mp-option :label="`${'吃饭'}${'组'}`" />
          <mp-option :label="`${'睡觉'}${'组'}`" />
          <mp-option :label="`${'打游戏'}${'组'}`" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="gender" :rules="[(v) => !!v || '必须选择一个性别']">
        <mp-radio-group v-model="formData.gender">
          <mp-radio :checked-value="1">男</mp-radio>
          <mp-radio :checked-value="2">女</mp-radio>
        </mp-radio-group>
      </mp-form-item>
      <mp-form-item field="like" :rules="[(v) => v.length > 0 || '至少选择一个爱好']">
        <mp-checkbox-group v-model="formData.like">
          <mp-checkbox :checked-value="1">吃饭</mp-checkbox>
          <mp-checkbox :checked-value="2">睡觉</mp-checkbox>
          <mp-checkbox :checked-value="3">打游戏</mp-checkbox>
        </mp-checkbox-group>
      </mp-form-item>
      <mp-form-item field="score" :rules="[(v) => v >= 3 || '必须大于2']">
        <mp-rate v-model="formData.score" />
      </mp-form-item>
      <mp-form-item field="license" :rules="[(v) => !!v || '您必须开启']">
        <mp-switch v-model="formData.license" variant="tonal" />
      </mp-form-item>
      <mp-form-item field="count" :rules="[(v) => v > 10 || '必须大于10']">
        <mp-input-number v-model="formData.count" mode="button" edit-mode="direct" aria-label="数量" />
      </mp-form-item>
      <mp-form-item field="range" :rules="[(v) => v > 10 || '必须大于10']">
        <mp-slider v-model="formData.range" />
      </mp-form-item>
      <mp-form-item field="files" :rules="[(v) => v.length >= 1 || '至少上传一张图片']">
        <mp-upload v-model="formData.files" />
      </mp-form-item>
    </mp-space>
  </mp-form>
</template>
