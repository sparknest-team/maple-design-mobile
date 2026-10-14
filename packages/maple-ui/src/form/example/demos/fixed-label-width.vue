<script setup>
import { reactive } from 'vue'

const model = reactive({ name: '', contact: '' })
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>固定标签宽度 6rem；其中一项覆盖为 8rem。数字 flex 表示伸缩比例。</p>
    <mp-form :model="model" layout="horizontal" label-col-flex="6rem" label-align="left">
      <mp-form-item field="name" label="姓名"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="contact" label="联系方式" label-col-flex="8rem">
        <mp-input v-model="model.contact" />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
