<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

watchLang(use)
onThemeChange()

const text = ref('Maple')
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
</script>

<template>
  <app-type>{{ t('basicUsage') }}</app-type>
  <mp-space align="center" :size="16">
    <mp-avatar :size="32">C</mp-avatar>
    <mp-avatar :size="40">CD</mp-avatar>
    <mp-avatar :size="48" shape="square">Cedar</mp-avatar>
    <mp-avatar :size="56" color="#00bebe">
      <m-icon-account-circle />
    </mp-avatar>
  </mp-space>

  <app-type>{{ t('size') }}</app-type>
  <mp-space direction="column" :size="16">
    <mp-space align="center" :size="16">
      <mp-avatar :size="24">A</mp-avatar>
      <mp-avatar :size="32">B</mp-avatar>
      <mp-avatar :size="40">C</mp-avatar>
      <mp-avatar :size="48">D</mp-avatar>
      <mp-avatar :size="64">E</mp-avatar>
    </mp-space>
    <mp-space align="center" :size="16">
      <mp-avatar image-url="cat.jpg" :alt="t('catAlt')" :size="28" />
      <mp-avatar image-url="cat.jpg" :alt="t('catAlt')" :size="36" />
      <mp-avatar image-url="cat.jpg" :alt="t('catAlt')" :size="48" />
      <mp-avatar image-url="cat.jpg" :alt="t('catAlt')" :size="64" />
      <mp-avatar image-url="cat.jpg" :alt="t('catAlt')" :size="78" />
    </mp-space>
  </mp-space>

  <app-type>{{ t('shape') }}</app-type>
  <mp-space align="center" :size="16">
    <mp-avatar>{{ t('circleText') }}</mp-avatar>
    <mp-avatar shape="square">{{ t('squareText') }}</mp-avatar>
    <mp-avatar image-url="cat.jpg" :alt="t('circleImage')" />
    <mp-avatar image-url="cat.jpg" :alt="t('squareImage')" shape="square" />
  </mp-space>

  <app-type>{{ t('autoFix') }}</app-type>
  <mp-space direction="column" :size="16">
    <mp-space align="center" :size="16">
      <mp-avatar>{{ text }}</mp-avatar>
      <mp-avatar shape="square">{{ text }}</mp-avatar>
      <mp-avatar :auto-fix-font-size="false">{{ text }}</mp-avatar>
    </mp-space>
    <mp-input v-model="text" :placeholder="t('inputText')" />
  </mp-space>

  <app-type>{{ t('imageAvatar') }}</app-type>
  <mp-space align="center" :size="16">
    <mp-avatar image-url="cat.jpg" :alt="t('catAlt')" />
    <mp-avatar image-url="cat2.jpg" :alt="t('catAlt')" :size="48" shape="square" />
  </mp-space>

  <app-type>{{ t('objectFit') }}</app-type>
  <mp-space align="center" :size="24">
    <div v-for="fit in fits" :key="fit" style="text-align: center">
      <mp-avatar image-url="cat.jpg" :alt="fit" :object-fit="fit" :size="56" />
      <div style="margin-top: 8px">{{ fit }}</div>
    </div>
  </mp-space>

  <app-type>{{ t('fallback') }}</app-type>
  <mp-space align="center" :size="16">
    <mp-avatar lazy image-url="cat.jpg" loading="cat2.jpg" :alt="t('lazyAlt')" :size="48" />
    <mp-avatar image-url="missing-avatar.jpg" error="cat.jpg" :alt="t('errorImageAlt')" :size="48" />
    <mp-avatar image-url="missing-avatar.jpg" :alt="t('fallbackAlt')" :size="48">
      <template #error>NA</template>
    </mp-avatar>
  </mp-space>

  <app-type>{{ t('colorAndBorder') }}</app-type>
  <mp-space align="center" :size="16">
    <mp-avatar color="var(--mp-color-warning)">
      <m-icon-fire />
    </mp-avatar>
    <mp-avatar color="var(--mp-color-danger)">Maple</mp-avatar>
    <mp-avatar color="#00bebe">CD</mp-avatar>
    <mp-avatar color="#7b61ff" shape="square">A</mp-avatar>
    <mp-avatar bordered>B</mp-avatar>
    <mp-avatar bordered border-color="#00bebe" color="#e6fffb">C</mp-avatar>
  </mp-space>

  <app-type>{{ t('avatarGroup') }}</app-type>
  <mp-space direction="column" :size="20">
    <mp-avatar-group>
      <mp-avatar image-url="cat.jpg" :alt="t('userOne')" bordered />
      <mp-avatar image-url="cat2.jpg" :alt="t('userTwo')" bordered />
      <mp-avatar image-url="cat.jpg" :alt="t('userThree')" bordered />
      <mp-avatar bordered>+2</mp-avatar>
    </mp-avatar-group>

    <mp-avatar-group :max-count="3" :size="48">
      <mp-avatar image-url="cat.jpg" :alt="t('userOne')" />
      <mp-avatar image-url="cat2.jpg" :alt="t('userTwo')" />
      <mp-avatar color="#00bebe">A</mp-avatar>
      <mp-avatar color="#f59e0b">B</mp-avatar>
      <mp-avatar color="#ef4444">C</mp-avatar>
    </mp-avatar-group>

    <mp-avatar-group z-index-ascend>
      <mp-avatar image-url="cat.jpg" :alt="t('userOne')" />
      <mp-avatar image-url="cat2.jpg" :alt="t('userTwo')" />
      <mp-avatar color="#7b61ff">CD</mp-avatar>
    </mp-avatar-group>
  </mp-space>

  <app-type>{{ t('groupVertical') }}</app-type>
  <mp-avatar-group vertical :offset="-12">
    <mp-avatar image-url="cat.jpg" :alt="t('userOne')" bordered />
    <mp-avatar image-url="cat2.jpg" :alt="t('userTwo')" bordered />
    <mp-avatar image-url="cat.jpg" :alt="t('userThree')" bordered />
    <mp-avatar bordered>+2</mp-avatar>
  </mp-avatar-group>

  <app-type>{{ t('hoverable') }}</app-type>
  <mp-avatar-group>
    <mp-avatar hoverable image-url="cat.jpg" :alt="t('userOne')" bordered />
    <mp-avatar hoverable image-url="cat2.jpg" :alt="t('userTwo')" bordered />
    <mp-avatar hoverable image-url="cat.jpg" :alt="t('userThree')" bordered />
    <mp-avatar hoverable bordered>+2</mp-avatar>
  </mp-avatar-group>

  <app-type>{{ t('triggerIcon') }}</app-type>
  <mp-space align="center" :size="24">
    <mp-avatar image-url="cat.jpg" :alt="t('editAvatar')" :size="56">
      <template #trigger-icon><m-icon-image /></template>
    </mp-avatar>
    <mp-avatar image-url="cat2.jpg" :alt="t('changeAvatar')" :size="56" trigger-type="mask">
      <template #trigger-icon><m-icon-camera /></template>
    </mp-avatar>
  </mp-space>
</template>
