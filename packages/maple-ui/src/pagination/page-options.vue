<template>
  <mp-menu
    :model-value="pageSize"
    placement="cover-top"
    :disabled="disabled"
    v-bind="selectProps"
    @update:model-value="handleChange"
  >
    <li :class="classes(n('size'), [disabled, n('item--disabled')])">
      <div :class="classes(n('size--open'), [disabled, n('size--open--disabled')])">
        <span>{{ pageSize }}{{ (pt ? pt : t)('paginationItem') }} / {{ (pt ? pt : t)('paginationPage') }}</span>
        <mp-icon :class="n('size--open-icon')" mp-pagination-cover><MIconMenuDown /></mp-icon>
      </div>
    </li>

    <template #content>
      <mp-menu-option v-for="(option, index) in sizeOptions" :key="index" :value="option">
        {{ option }}{{ (pt ? pt : t)('paginationItem') }} / {{ (pt ? pt : t)('paginationPage') }}
      </mp-menu-option>
    </template>
  </mp-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IconMenuDown as MIconMenuDown } from '@maplejs/icons-vue'
import MpIcon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import MpMenu from '../menu'
import MpMenuOption from '../menu/MenuOption.vue'
import { createNamespace } from '../utils/components'

const { n, classes } = createNamespace('pagination')

export default defineComponent({
  name: createNamespace('pagination-options').name,
  components: {
    MIconMenuDown,
    MpMenu,
    MpMenuOption,
    MpIcon,
  },
  props: {
    sizeOptions: {
      type: Array as PropType<number[]>,
      required: true,
    },
    pageSize: Number,
    disabled: Boolean,
    selectProps: {
      type: Object as PropType<Record<string, any>>,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { t: pt } = injectLocaleProvider()

    const handleChange = (value: number | string) => {
      emit('change', Number(value))
    }

    return {
      n,
      classes,
      t,
      pt,
      handleChange,
    }
  },
})
</script>
