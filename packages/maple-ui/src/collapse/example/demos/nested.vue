<template>
  <mp-collapse :default-active-names="['1', 2]" destroy-on-hide>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1">
      <mp-collapse :default-active-names="['1.1']" destroy-on-hide>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1.1">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
        <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="1.2">
          <div>Beijing Toutiao Technology Co., Ltd.</div>
        </mp-collapse-item>
      </mp-collapse>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." :name="2">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
    <mp-collapse-item title="Beijing Toutiao Technology Co., Ltd." name="3">
      <div>Beijing Toutiao Technology Co., Ltd.</div>
    </mp-collapse-item>
  </mp-collapse>
</template>
<script lang="ts" setup></script>
