<template>
  <div class="verification-demo">
    <mp-verification-code
      default-value="1234"
      :length="4"
      masked
      mask-symbol="*"
      aria-label="掩码验证码"
    /><mp-verification-code
      default-value="1234"
      :length="4"
      variant="filled"
      size="lg"
      align="start"
      :gutter="12"
      aria-label="填充验证码"
    /><mp-verification-code
      default-value="12"
      :length="4"
      variant="standard"
      focus-color="#6750a4"
      aria-label="线条验证码"
    />
  </div>
</template>
<style scoped>
.verification-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 420px;
}
</style>
