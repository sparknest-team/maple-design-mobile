<template>
  <mp-row justify="space-between">
    <mp-timeline mode="alternate" :style="{ flex: 1 }">
      <mp-timeline-item label="2017-03-10">The first milestone</mp-timeline-item>
      <mp-timeline-item label="2018-05-12">The second milestone</mp-timeline-item>
      <mp-timeline-item label="2020-09-30" content-placement="left"> The third milestone </mp-timeline-item>
    </mp-timeline>
    <mp-timeline mode="right" :style="{ flex: 1 }">
      <mp-timeline-item label="2017-03-10">The first milestone</mp-timeline-item>
      <mp-timeline-item label="2018-05-12">The second milestone</mp-timeline-item>
      <mp-timeline-item label="2020-09-30" content-placement="left"> The third milestone </mp-timeline-item>
    </mp-timeline>
  </mp-row>
</template>

<script setup></script>
