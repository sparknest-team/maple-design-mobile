<template>
  <mp-row :gutter="10">
    <mp-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" :xxl="1">
      <div class="item">1</div>
    </mp-col>
    <mp-col :xs="4" :sm="6" :md="8" :lg="9" :xl="10" :xxl="11">
      <div class="item">2</div>
    </mp-col>
    <mp-col :xs="4" :sm="6" :md="8" :lg="9" :xl="10" :xxl="11">
      <div class="item">3</div>
    </mp-col>
    <mp-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" :xxl="1">
      <div class="item">4</div>
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
