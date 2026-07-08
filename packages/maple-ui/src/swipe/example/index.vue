<script setup>
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { Snackbar } from '@maplejs/maple-ui'
import { t, use } from './locale'

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-swipe class="swipe">
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </mp-swipe-item>
  </mp-swipe>

  <app-type>{{ t('forbidLoop') }}</app-type>
  <mp-swipe class="swipe" :loop="false">
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </mp-swipe-item>
  </mp-swipe>

  <app-type>{{ t('autoplay') }}</app-type>
  <mp-swipe class="swipe" :autoplay="2000">
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </mp-swipe-item>
  </mp-swipe>

  <app-type>{{ t('vertical') }}</app-type>
  <mp-swipe class="swipe" vertical>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </mp-swipe-item>
  </mp-swipe>

  <app-type>{{ t('navigation') }}</app-type>
  <mp-swipe class="swipe" navigation>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </mp-swipe-item>
  </mp-swipe>

  <mp-swipe class="swipe" style="margin-top: 12px" navigation="hover">
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </mp-swipe-item>
  </mp-swipe>

  <app-type>{{ t('handleChange') }}</app-type>
  <mp-swipe class="swipe" @change="(index) => Snackbar(String(index))">
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" alt="" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" alt="" />
    </mp-swipe-item>
  </mp-swipe>

  <app-type>{{ t('customIndicator') }}</app-type>
  <mp-swipe class="swipe-example">
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat.jpg'" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat2.jpg'" />
    </mp-swipe-item>
    <mp-swipe-item>
      <img class="swipe-item" :src="'cat3.jpg'" />
    </mp-swipe-item>
    <template #indicator="{ index, length, to }">
      <div class="swipe-indicators">
        <div
          v-for="(l, idx) in length"
          :key="l"
          class="swipe-indicator"
          :class="{ 'swipe-active-indicator': idx === index }"
          @click="to(idx)"
        ></div>
      </div>
    </template>
  </mp-swipe>

  <div class="space"></div>
</template>

<style scoped lang="less">
.swipe {
  height: 160px;
}

.swipe-example {
  height: 160px;
}

.swipe-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.swipe-indicators {
  position: absolute;
  display: flex;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.swipe-indicator {
  width: 8px;
  height: 8px;
  background: #fff;
  opacity: 0.3;
  margin: 0 4px;
  transition: opacity 0.3s;
}

.swipe-active-indicator {
  opacity: 1;
}

.space {
  height: 20px;
}
</style>
