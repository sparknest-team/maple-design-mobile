<template>
  <mp-timeline>
    <mp-timeline-item label="2017-03-10" dotColor="#00B42A"> The first milestone </mp-timeline-item>
    <mp-timeline-item label="2018-05-22">The second milestone</mp-timeline-item>
    <mp-timeline-item label="2020-06-22" dotColor="#F53F3F">
      The third milestone
      <mp-icon-exclamation-circle-fill :style="{ color: '#F53F3F', fontSize: '12px', marginLeft: '4px' }" />
    </mp-timeline-item>
    <mp-timeline-item label="2020-09-30" dotColor="#C9CDD4"> The fourth milestone </mp-timeline-item>
  </mp-timeline>
</template>

<script setup>
import { IconExclamationCircleFill as MpIconExclamationCircleFill } from '@maple-design/icons-vue'
</script>
