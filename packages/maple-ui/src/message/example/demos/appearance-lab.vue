<script setup>
import { reactive as __demoReactive, reactive, toRefs } from 'vue'

const shows = reactive({
  show1: false,
  show2: false,
  show3: false,
  show4: false,
  show5: false,
  showCenter: false,
  showClosable: false,
})
const { show1, show2, show3, show4, show5, showCenter, showClosable } = toRefs(shows)
const __demoAppearance = __demoReactive({ variant: 'neutral', status: 'default' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'neutral', value: 'neutral' },
            { label: 'tonal', value: 'tonal' },
            { label: 'solid', value: 'solid' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>status</span
        ><mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
            { label: 'loading', value: 'loading' },
          ]"
          aria-label="status"
        />
      </div>
    </mp-space>
    <mp-message v-model:open="show1" v-bind="__demoAppearance"> 这是一条消息提示 </mp-message>
  </mp-space>
</template>
