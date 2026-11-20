<script setup>
import { KeepAlive, ref, watch } from 'vue'

const mounted = ref(true),
  active = ref(true),
  bar = ref(),
  changes = ref([])
let retained
watch(bar, (value) => {
  if (value) {
    retained = value
  }
})
const command = (index) => retained?.scrollTo(index)
const record = (value) => {
  changes.value.push(value)
}
</script>

<template>
  <h3>Lifecycle and retained commands</h3>
  <mp-space wrap>
    <mp-button @click="command('C')">Scroll to C</mp-button>
    <mp-button @click="active = !active">Toggle active</mp-button>
    <mp-button @click="mounted = !mounted">Toggle mounted</mp-button>
    <mp-button @click="command('A')">Retained command A</mp-button>
  </mp-space>
  <p>Changes: {{ changes.join(' / ') }}</p>
  <div class="index-lifecycle-surface">
    <KeepAlive v-if="mounted">
      <mp-index-bar v-if="active" ref="bar" :duration="600" @change="record">
        <div v-for="index in ['A', 'B', 'C']" :key="index" class="index-lifecycle-group">
          <mp-index-anchor :index="index" />
          <p>Group {{ index }}</p>
        </div>
      </mp-index-bar>
    </KeepAlive>
  </div>
  <p>
    Inactive/disposed retained commands do not scroll or notify. Activation restores active without another change
    event.
  </p>
</template>

<style lang="less">
.index-lifecycle-surface {
  height: 180px;
  overflow: auto;
  position: relative;
  border: 1px solid var(--mp-color-border-2);
}
.index-lifecycle-group {
  height: 240px;
}
</style>
