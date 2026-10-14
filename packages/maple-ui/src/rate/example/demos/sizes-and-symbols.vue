<template>
  <mp-space direction="vertical">
    <mp-rate :default-value="3" :size="20" aria-label="20 像素评分" />
    <mp-rate :default-value="3.5" size="2rem" gap="0.5rem" allow-half aria-label="自定义尺寸评分" />
    <mp-rate :default-value="4" grading aria-label="表情评分" />
    <mp-rate :default-value="3" aria-label="自定义字符评分">
      <template #character="{ value, active }"
        ><span>{{ active ? '♥' : '♡' }}{{ value }}</span></template
      >
    </mp-rate>
  </mp-space>
</template>
