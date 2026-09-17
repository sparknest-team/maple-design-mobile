<script setup>
import { getCurrentInstance, ref } from 'vue'
import { IconCheckboxMarkedCircleFill, IconInfoCircleFill } from '@maplejs/icons-vue'

const iconName = ref('info-circle-fill')
const app = getCurrentInstance()?.appContext.app

if (app && !app.component('IconInfoCircleFill')) {
  app.component('IconInfoCircleFill', IconInfoCircleFill)
}
if (app && !app.component('IconCheckboxMarkedCircleFill')) {
  app.component('IconCheckboxMarkedCircleFill', IconCheckboxMarkedCircleFill)
}

function toggle() {
  iconName.value = iconName.value === 'info-circle-fill' ? 'checkbox-marked-circle-fill' : 'info-circle-fill'
}
</script>

<template>
  <mp-icon
    class="icon-example__animation-icon"
    color="var(--mp-color-primary)"
    :size="30"
    :transition="300"
    :name="iconName"
    @click="toggle"
  />
</template>

<style lang="less" scoped>
@import '../../../style/elevation';

.icon-example {
  &__animation {
    display: flex;
    align-items: center;
    padding-left: 8px;
  }

  &__animation-icon {
    margin-left: 5px;
  }

  &__transform-demo {
    display: flex;
    gap: 24px;

    > div {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
  }

  &__icons {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
    gap: 12px;
  }

  &__group {
    margin: 24px 8px 0;

    h3 {
      margin: 0 0 12px;
      font-size: 16px;
    }
    small {
      margin-left: 6px;
      color: var(--mp-text-color-secondary);
      font-weight: normal;
    }
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    padding: 18px 10px;
    border: 1px solid var(--mp-border-color);
    border-radius: 8px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    transition: background-color 0.25s;
  }

  &__search {
    margin: 6px 8px 22px;
  }

  &__icon-name {
    width: 100%;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 8px;
  }
}

.search-icon {
  margin-left: 6px;
}

.fade {
  opacity: 0;
  transition-property: opacity;
}
</style>
