<script setup>
import MpInputTag from '../../index'
import '../../style'
</script>
<template>
  <mp-input-tag
    :default-value="['one', 'two', 'three', 'four']"
    placeholder="Please Enter"
    :max-tag-count="3"
    clearable
  />
</template>
