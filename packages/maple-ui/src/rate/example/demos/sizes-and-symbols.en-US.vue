<template>
  <mp-space direction="column">
    <mp-rate :default-value="3" :size="20" aria-label="20 pixel rating" />
    <mp-rate :default-value="3.5" size="2rem" gap="0.5rem" allow-half aria-label="Custom size rating" />
    <mp-rate :default-value="4" grading aria-label="Grading" />
    <mp-rate :default-value="3" aria-label="Custom characters">
      <template #character="{ value, active }"
        ><span>{{ active ? '♥' : '♡' }}{{ value }}</span></template
      >
    </mp-rate>
  </mp-space>
</template>
