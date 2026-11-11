<template>
  <mp-skeleton>
    <template #template>
      <mp-space block direction="column" size="lg">
        <mp-skeleton-line :rows="3" :widths="['100%', '100%', '60%']" />
        <mp-skeleton-shape shape="circle" />
      </mp-space>
    </template>
    加载的数据
  </mp-skeleton>
</template>
