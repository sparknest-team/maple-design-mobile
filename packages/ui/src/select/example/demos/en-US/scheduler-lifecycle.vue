<script setup>
import { ref } from 'vue'

const active = ref(true)
const open = ref(false)
const value = ref('Item 101')
const options = Array.from({ length: 200 }, (_, index) => 'Item ' + (index + 1))
</script>
<template>
  <div>
    <mp-button @click="open = !open">Open / close</mp-button>
    <mp-button @click="active = !active">Activate / deactivate</mp-button>
    <p>Open the menu, navigate with Arrow keys, then close or deactivate. Old scrolling must not replay.</p>
    <KeepAlive>
      <mp-select
        v-if="active"
        v-model="value"
        v-model:open="open"
        :options="options"
        edit-mode="popup"
        style="width: 240px"
      />
    </KeepAlive>
  </div>
</template>
