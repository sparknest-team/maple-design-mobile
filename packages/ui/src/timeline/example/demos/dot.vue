<template>
  <div :style="{ display: 'flex' }">
    <mp-timeline :style="{ marginRight: '40px' }">
      <mp-timeline-item label="2020-04-12" dotColor="#00B42A"> The first milestone </mp-timeline-item>
      <mp-timeline-item label="2020-05-17"> The second milestone </mp-timeline-item>
      <mp-timeline-item label="2020-06-22">
        <template #dot>
          <mp-icon-clock-circle :style="{ fontSize: '12px', color: '#F53F3F' }" />
        </template>
        The third milestone
      </mp-timeline-item>
      <mp-timeline-item label="2020-06-22" dotColor="var(--color-fill-4)"> The third milestone </mp-timeline-item>
    </mp-timeline>

    <mp-timeline :style="{ marginRight: '40px' }">
      <mp-timeline-item label="2020-04-12">
        <template #dot>
          <mp-icon-check
            :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light-1)',
            }"
          />
        </template>
        The first milestone
      </mp-timeline-item>
      <mp-timeline-item label="2020-05-17">
        <template #dot>
          <mp-icon-check
            :style="{
              fontSize: '12px',
              padding: '2px',
              boxSizing: 'border-box',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light-1)',
            }"
          />
        </template>
      </mp-timeline-item>
      <mp-timeline-item label="2020-06-22">The third milestone</mp-timeline-item>
      <mp-timeline-item label="2020-06-22" dotColor="var(--color-fill-4)"> The third milestone </mp-timeline-item>
    </mp-timeline>

    <mp-timeline>
      <mp-timeline-item label="2020-04-12">The first milestone</mp-timeline-item>
      <mp-timeline-item label="2020-05-17" dotColor="var(--color-fill-4)"> The second milestone </mp-timeline-item>
      <mp-timeline-item label="2020-06-22" dotColor="var(--color-fill-4)"> The third milestone </mp-timeline-item>
    </mp-timeline>
  </div>
</template>

<script setup></script>
