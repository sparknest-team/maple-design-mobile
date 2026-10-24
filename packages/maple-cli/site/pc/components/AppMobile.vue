<template>
  <div class="maple-site-mobile">
    <div class="maple-site-mobile-content">
      <iframe
        id="mobile"
        :src="`${getMobileIndex()}#/${componentName}?language=${language}&platform=pc&replace=${replace}${
          hash ? `#${hash}` : ''
        }`"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { getMobileIndex } from '@maple-design/cli/client'

export default {
  name: 'AppMobile',
  props: {
    componentName: {
      type: String,
    },
    language: {
      type: String,
    },
    replace: {
      type: String,
    },
    hash: {
      type: String,
    },
  },
  setup() {
    return {
      getMobileIndex,
    }
  },
}
</script>

<style lang="less">
.maple-site-mobile {
  position: sticky;
  flex: 0 1 clamp(300px, 27vw, 375px);
  min-width: 0;
  top: 80px;
  height: calc(100vh - 100px);
  margin-right: clamp(12px, 2.5vw, 38px);
  overflow: hidden;
  box-shadow: 0 0 14px 6px var(--site-config-color-shadow);
  border-radius: 2px;
  margin-top: 20px;

  &-content {
    width: 100%;
    height: 100%;
  }

  &-image {
    width: 100%;
    pointer-events: none;
    height: 100%;
    top: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
