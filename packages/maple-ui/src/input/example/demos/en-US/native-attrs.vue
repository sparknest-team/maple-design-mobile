<template>
  <mp-input
    enterkeyhint="next"
    aria-label="Enter your email"
    :input-attrs="{ name: 'email', autocomplete: 'off', autocapitalize: 'none' }"
    placeholder="Enter your email"
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
