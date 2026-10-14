<template>
  <div class="verification-demo">
    <mp-verification-code
      default-value="123456"
      readonly
      aria-label="Readonly verification code"
    /><mp-verification-code
      default-value="123456"
      disabled
      aria-label="Disabled verification code"
    /><mp-verification-code default-value="12" error aria-label="Error verification code" />
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
