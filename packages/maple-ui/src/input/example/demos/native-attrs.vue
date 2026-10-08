<template>
  <mp-input
    enterkeyhint="next"
    aria-label="请输入邮箱"
    :input-attrs="{ name: 'email', autocomplete: 'email', autocapitalize: 'none' }"
    placeholder="请输入邮箱"
    type="email"
  />

  <div class="input-example__bottom-space" />
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
