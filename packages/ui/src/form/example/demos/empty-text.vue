<script setup lang="ts">
import { reactive, ref } from 'vue'

const reading = ref(true)
const emptyText = ref('-')
const model = reactive({
  name: null as string | null,
  code: null as string | null,
  nickname: null as string | null,
  quantity: 0 as number | null | undefined,
})
</script>
<template>
  <mp-space direction="column">
    <p>初始阅读模式：姓名显示“-”，编号和昵称使用各自覆盖；数量 0 仍显示 0。</p>
    <mp-space wrap>
      <mp-button @click="reading = !reading">切换阅读/编辑</mp-button>
      <mp-button @click="emptyText = '暂无'">使用“暂无”</mp-button>
      <mp-button @click="emptyText = '-'">使用默认“-”</mp-button>
    </mp-space>
    <mp-form :model="model" layout="vertical" :read-pretty="reading" :empty-text="emptyText">
      <mp-form-item field="name" label="姓名：继承 Form"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="code" label="编号：覆盖 FormItem" empty-text="未分配"
        ><mp-input v-model="model.code"
      /></mp-form-item>
      <mp-form-item field="nickname" label="昵称：覆盖字段" empty-text="未分配"
        ><mp-input v-model="model.nickname" empty-text="匿名"
      /></mp-form-item>
      <mp-form-item field="quantity" label="数量"><mp-input-number v-model="model.quantity" /></mp-form-item>
    </mp-form>
    <p>
      当前模型: <output>{{ JSON.stringify(model) }}</output>
    </p>
  </mp-space>
</template>
