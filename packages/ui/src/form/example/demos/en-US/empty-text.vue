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
    <p>
      Initially, reading mode shows “-” for Name, overrides for Code and Nickname, and the valid number 0 for Quantity.
    </p>
    <mp-space wrap>
      <mp-button @click="reading = !reading">Toggle reading/editing</mp-button>
      <mp-button @click="emptyText = 'No data'">Use “No data”</mp-button>
      <mp-button @click="emptyText = '-'">Use default “-”</mp-button>
    </mp-space>
    <mp-form :model="model" layout="vertical" :read-pretty="reading" :empty-text="emptyText">
      <mp-form-item field="name" label="Name: inherits Form"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="code" label="Code: FormItem override" empty-text="Unassigned"
        ><mp-input v-model="model.code"
      /></mp-form-item>
      <mp-form-item field="nickname" label="Nickname: field override" empty-text="Unassigned"
        ><mp-input v-model="model.nickname" empty-text="Anonymous"
      /></mp-form-item>
      <mp-form-item field="quantity" label="Quantity"><mp-input-number v-model="model.quantity" /></mp-form-item>
    </mp-form>
    <p>
      Current model: <output>{{ JSON.stringify(model) }}</output>
    </p>
  </mp-space>
</template>
