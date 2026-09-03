<template>
  <mp-row :gutter="10">
    <mp-col
      v-for="i in 4"
      :key="i"
      :xs="{ span: 12, offset: 6 }"
      :sm="{ span: 6 }"
      :md="{ span: 4, offset: 4 }"
      :lg="{ span: 3, offset: 3 }"
      :xl="{ span: 2, offset: 2 }"
      :xxl="{ span: 1, offset: 1 }"
    >
      <div class="item">{{ i }}</div>
    </mp-col>
  </mp-row>
</template>

<style scoped lang="less">
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  box-sizing: border-box;
  color: var(--mp-color-text-1);
  border: 1px solid var(--mp-color-border-2);
  background: var(--mp-color-fill-2);
}
</style>
