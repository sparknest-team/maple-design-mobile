<script setup>
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const rows = Array.from({ length: 100 }, (_, key) => ({ key }))
let retained
const capture = (instance) => {
  if (instance) {
    retained = instance
  }
}
const jump = () => retained?.scrollIntoView({ key: 50, align: 'top' })
</script>

<template>
  <div>
    <mp-button @click="active = !active">Activate / deactivate</mp-button>
    <mp-button @click="mounted = !mounted">Mount / dispose cache</mp-button>
    <mp-button @click="jump">Retained command: row 51</mp-button>
    <p>Inactive/disposed commands do nothing. Activation never replays them.</p>
    <KeepAlive v-if="mounted">
      <mp-list
        v-if="active"
        :ref="capture"
        :data="rows"
        :virtual-list-props="{ height: 100, fixedSize: true, estimatedSize: 20, buffer: 2, itemKey: 'key' }"
      >
        <template #item="{ item }"
          ><div style="height: 20px">{{ item.key + 1 }}</div></template
        >
      </mp-list>
    </KeepAlive>
  </div>
</template>
