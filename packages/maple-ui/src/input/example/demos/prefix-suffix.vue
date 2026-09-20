<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input placeholder="请输入手机号"><template #prefix>+86</template></mp-input>
    <mp-input placeholder="请输入金额"><template #suffix>RMB</template></mp-input>
    <mp-input placeholder="请输入搜索内容">
      <template #prefix><m-icon-search /></template>
      <template #suffix><m-icon-close-circle-fill /></template>
    </mp-input>
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
