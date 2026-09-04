<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { AppType } from '@maplejs/maple-cli/client'
import MpFormItem from '..'
import MpButton from '../../button'
import MpForm from '../../form'
import MpInput from '../../input'
import MpSpace from '../../space'

export default defineComponent({
  name: 'FormItemExample',
  components: {
    AppType,
    MpForm,
    MpFormItem,
    MpInput,
    MpButton,
    MpSpace,
  },
  setup() {
    const form = ref<InstanceType<typeof MpForm> | null>(null)
    const horizontalForm = ref<InstanceType<typeof MpForm> | null>(null)
    const noLabelForm = ref<InstanceType<typeof MpForm> | null>(null)
    const formData = reactive({
      username: '',
      password: '',
    })
    const horizontalData = reactive({
      username: '',
      password: '',
    })
    const noLabelData = reactive({
      username: '',
      password: '',
    })

    function validateAll() {
      form.value?.validate()
      horizontalForm.value?.validate()
      noLabelForm.value?.validate()
    }

    function clearValidateAll() {
      form.value?.clearValidate()
      horizontalForm.value?.clearValidate()
      noLabelForm.value?.clearValidate()
    }

    function resetAll() {
      form.value?.resetFields()
      horizontalForm.value?.resetFields()
      noLabelForm.value?.resetFields()
    }

    return {
      form,
      horizontalForm,
      noLabelForm,
      formData,
      horizontalData,
      noLabelData,
      validateAll,
      clearValidateAll,
      resetAll,
    }
  },
})
</script>

<template>
  <mp-space direction="column" :size="[14, 0]">
    <app-type>外置标签</app-type>
    <mp-form ref="form" :model="formData" layout="vertical">
      <mp-form-item
        field="username"
        label="用户名"
        required
        :rules="[(v) => !!v || '用户名不能为空']"
        :validate-trigger="['input', 'change']"
      >
        <mp-input v-model="formData.username" placeholder="请输入" />
      </mp-form-item>

      <mp-form-item
        field="password"
        label="密码"
        help="至少 8 位"
        :rules="[(v) => !!v || '密码不能为空', (v) => (v && v.length >= 8) || '密码长度不能低于8位']"
      >
        <mp-input v-model="formData.password" type="password" placeholder="请输入" />
      </mp-form-item>
    </mp-form>

    <app-type>左右布局</app-type>
    <mp-form ref="horizontalForm" :model="horizontalData" layout="horizontal">
      <mp-form-item field="username" label="用户名" required>
        <mp-input v-model="horizontalData.username" placeholder="请输入" />
      </mp-form-item>
      <mp-form-item field="password" label="密码">
        <mp-input v-model="horizontalData.password" type="password" placeholder="请输入" />
      </mp-form-item>
    </mp-form>

    <app-type>无 Label（浮动 Placeholder）</app-type>
    <mp-form ref="noLabelForm" :model="noLabelData" layout="vertical">
      <mp-form-item
        field="username"
        required
        :rules="[(v) => !!v || '用户名不能为空']"
        :validate-trigger="['input', 'change']"
      >
        <mp-input v-model="noLabelData.username" placeholder="用户名" />
      </mp-form-item>
      <mp-form-item
        field="password"
        :rules="[(v) => !!v || '密码不能为空', (v) => (v && v.length >= 8) || '密码长度不能低于8位']"
      >
        <mp-input v-model="noLabelData.password" type="password" placeholder="密码" />
      </mp-form-item>
    </mp-form>

    <mp-button block status="primary" @click="validateAll">校验</mp-button>
    <mp-button block status="warning" @click="clearValidateAll">清空校验</mp-button>
    <mp-button block status="danger" @click="resetAll">重置</mp-button>
  </mp-space>
</template>
