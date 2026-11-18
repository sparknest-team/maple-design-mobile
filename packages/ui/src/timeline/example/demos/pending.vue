<template>
  <mp-row align="center" :style="{ marginBottom: '24px' }">
    <mp-checkbox
      :checked="pendingProps.orientation === 'horizontal'"
      @change="(v) => onChange({ orientation: v ? 'horizontal' : 'vertical' })"
    >
      horizontal &nbsp; &nbsp;
    </mp-checkbox>
    <mp-checkbox :checked="!!pendingProps.reverse" @change="(v) => onChange({ reverse: v })">
      reverse &nbsp; &nbsp;
    </mp-checkbox>
    <mp-checkbox
      :checked="!!pendingProps.pending"
      @change="(v) => onChange({ pending: v ? 'This is a pending dot' : false })"
    >
      pending &nbsp; &nbsp;
    </mp-checkbox>
    <mp-checkbox :checked="!!pendingProps.hasPendingDot" @change="(v) => onChange({ hasPendingDot: v })">
      custom pendingDot
    </mp-checkbox>
  </mp-row>
  <mp-timeline v-bind="pendingProps">
    <template v-if="pendingProps.hasPendingDot" #dot>
      <mp-icon-fire :style="{ color: '#e70a0a' }" />
    </template>
    <mp-timeline-item label="2017-03-10" dotColor="#52C419"> The first milestone </mp-timeline-item>
    <mp-timeline-item label="2018-05-12" dotColor="#F5222D"> The second milestone </mp-timeline-item>
    <mp-timeline-item label="2020-09-30">The third milestone</mp-timeline-item>
  </mp-timeline>
  <mp-timeline>
    <template #pending>Waiting for the next milestone</template>
  </mp-timeline>
</template>

<script setup>
import { ref } from 'vue'
import { IconFire as MpIconFire } from '@maple-design/icons-vue'

const pendingProps = ref({})

const onChange = (newProps) => {
  pendingProps.value = {
    ...pendingProps.value,
    ...newProps,
  }
}
</script>
