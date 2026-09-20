<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input model-value="Maple Design" readonly placeholder="只读状态" />
    <mp-input model-value="Maple Design" disabled placeholder="禁用状态" />
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
