<template>
  <div v-if="!(hideOnSinglePage && pages <= 1)" :class="rootCls">
    <span v-if="showTotal" :class="classes(n('total'), [disabled, n('item--disabled')])">
      <slot name="total" :total="toNumber(total)">
        {{ totalText }}
      </slot>
    </span>

    <span v-if="simple" :class="n('simple-wrap')">
      <page-item-step
        type="previous"
        :current="computedCurrent"
        :pages="pages"
        :disabled="disabled"
        :elevation="elevation"
        simple
        @click="handleClick"
      >
        <template v-if="$slots['page-item-step']" #default="slotProps">
          <slot name="page-item-step" v-bind="slotProps" />
        </template>
      </page-item-step>
      <page-jumper :disabled="disabled" :current="computedCurrent" :pages="pages" simple @change="handleClick" />
      <page-item-step
        type="next"
        :current="computedCurrent"
        :pages="pages"
        :disabled="disabled"
        :elevation="elevation"
        simple
        @click="handleClick"
      >
        <template v-if="$slots['page-item-step']" #default="slotProps">
          <slot name="page-item-step" v-bind="slotProps" />
        </template>
      </page-item-step>
    </span>

    <ul v-else :class="n('list')">
      <page-item-step
        type="previous"
        :current="computedCurrent"
        :pages="pages"
        :disabled="disabled"
        :elevation="elevation"
        @click="handleClick"
      >
        <template v-if="$slots['page-item-step']" #default="slotProps">
          <slot name="page-item-step" v-bind="slotProps" />
        </template>
      </page-item-step>

      <template v-for="item in pageList" :key="item.key">
        <page-item-ellipsis
          v-if="item.type === 'more'"
          :current="computedCurrent"
          :pages="pages"
          :step="item.step"
          :disabled="disabled"
          :elevation="elevation"
          @click="handleClick"
        >
          <slot v-if="$slots['page-item-ellipsis']" name="page-item-ellipsis" />
        </page-item-ellipsis>
        <page-item
          v-else
          :page-number="item.pageNumber"
          :current="computedCurrent"
          :disabled="disabled"
          :style="pageItemStyle"
          :active-style="activePageItemStyle"
          :elevation="elevation"
          @click="handleClick"
        >
          <template v-if="$slots['page-item']" #default="slotProps">
            <slot name="page-item" v-bind="slotProps" />
          </template>
        </page-item>
      </template>

      <page-item-ellipsis
        v-if="showMore"
        key="more"
        :current="computedCurrent"
        :pages="pages"
        :step="bufferSize * 2 + 1"
        :disabled="disabled"
        :elevation="elevation"
        @click="handleClick"
      >
        <slot v-if="$slots['page-item-ellipsis']" name="page-item-ellipsis" />
      </page-item-ellipsis>

      <page-item-step
        type="next"
        :current="computedCurrent"
        :pages="pages"
        :disabled="disabled"
        :elevation="elevation"
        @click="handleClick"
      >
        <template v-if="$slots['page-item-step']" #default="slotProps">
          <slot name="page-item-step" v-bind="slotProps" />
        </template>
      </page-item-step>
    </ul>

    <page-options
      v-if="showPageSize"
      :disabled="disabled"
      :size-options="pageSizeOptions"
      :page-size="computedPageSize"
      :select-props="pageSizeProps"
      @change="handlePageSizeChange"
    />

    <page-jumper
      v-if="!simple && showJumper"
      :disabled="disabled"
      :current="computedCurrent"
      :pages="pages"
      @change="handleClick"
    >
      <template v-if="$slots['jumper-prepend']" #jumper-prepend>
        <slot name="jumper-prepend" />
      </template>
      <template v-if="$slots['jumper-append']" #jumper-append>
        <slot name="jumper-append" />
      </template>
    </page-jumper>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from 'vue'
import { call, isNumber, toNumber } from '@maplejs/maple-shared'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { createNamespace } from '../utils/components'
import PageItemEllipsis from './page-item-ellipsis.vue'
import PageItemStep from './page-item-step.vue'
import PageItem from './page-item.vue'
import PageJumper from './page-jumper.vue'
import PageOptions from './page-options.vue'
import { props } from './props'

const { name, n, classes } = createNamespace('pagination')

type PageListItem = { type: 'page'; key: number; pageNumber: number } | { type: 'more'; key: string; step: number }

export default defineComponent({
  name,
  components: {
    PageItem,
    PageItemStep,
    PageItemEllipsis,
    PageJumper,
    PageOptions,
  },
  props,
  setup(props) {
    const { t: pt } = injectLocaleProvider()
    const {
      disabled,
      pageItemStyle,
      activePageItemStyle,
      elevation,
      hideOnSinglePage,
      simple,
      showTotal,
      showMore,
      showJumper,
      showPageSize,
      pageSizeOptions,
      pageSizeProps,
      bufferSize,
      total,
    } = toRefs(props)

    const _current = ref(props.defaultCurrent)
    const _pageSize = ref(props.defaultPageSize)

    const computedCurrent = computed(() => toNumber(props.current ?? _current.value) || 1)
    const computedPageSize = computed(() => toNumber(props.pageSize ?? _pageSize.value) || 10)
    const pages = computed(() => Math.ceil(toNumber(props.total) / computedPageSize.value) || 0)
    const totalText = computed(() => {
      const template = String((pt || t)('paginationTotal') ?? 'Total: {0}')
      return template.replace('{0}', String(toNumber(props.total)))
    })

    const handleClick = (page: number) => {
      if (page !== computedCurrent.value && isNumber(page) && !props.disabled) {
        _current.value = page
        call(props['onUpdate:current'], page)
        call(props.onChange, page)
      }
    }

    const handlePageSizeChange = (pageSize: number) => {
      _pageSize.value = pageSize
      call(props['onUpdate:pageSize'], pageSize)
      call(props.onPageSizeChange, pageSize)
    }

    const pageList = computed(() => {
      const list: PageListItem[] = []

      if (pages.value < props.baseSize + props.bufferSize * 2) {
        for (let i = 1; i <= pages.value; i++) {
          list.push({ type: 'page', key: i, pageNumber: i })
        }
      } else {
        let left = 1
        let right = pages.value
        let hasLeftEllipsis = false
        let hasRightEllipsis = false

        if (computedCurrent.value > 2 + props.bufferSize) {
          hasLeftEllipsis = true
          left = Math.min(computedCurrent.value - props.bufferSize, pages.value - 2 * props.bufferSize)
        }
        if (computedCurrent.value < pages.value - (props.bufferSize + 1)) {
          hasRightEllipsis = true
          right = Math.max(computedCurrent.value + props.bufferSize, 2 * props.bufferSize + 1)
        }

        if (hasLeftEllipsis) {
          list.push({ type: 'page', key: 1, pageNumber: 1 })
          list.push({
            type: 'more',
            key: 'left-ellipsis-pager',
            step: -(props.bufferSize * 2 + 1),
          })
        }

        for (let i = left; i <= right; i++) {
          list.push({ type: 'page', key: i, pageNumber: i })
        }

        if (hasRightEllipsis) {
          list.push({
            type: 'more',
            key: 'right-ellipsis-pager',
            step: props.bufferSize * 2 + 1,
          })
          list.push({
            type: 'page',
            key: pages.value,
            pageNumber: pages.value,
          })
        }
      }

      return list
    })

    watch(computedPageSize, (curPageSize, prePageSize) => {
      if (props.autoAdjust && curPageSize !== prePageSize && computedCurrent.value > 1) {
        const index = prePageSize * (computedCurrent.value - 1) + 1
        const newPage = Math.ceil(index / curPageSize)
        if (newPage !== computedCurrent.value) {
          _current.value = newPage
          call(props['onUpdate:current'], newPage)
          call(props.onChange, newPage)
        }
      }
    })

    watch(pages, (curPages, prePages) => {
      if (props.autoAdjust && curPages !== prePages && computedCurrent.value > 1 && computedCurrent.value > curPages) {
        const newCurrent = Math.max(curPages, 1)
        _current.value = newCurrent
        call(props['onUpdate:current'], newCurrent)
        call(props.onChange, newCurrent)
      }
    })

    const rootCls = computed(() => classes(n(), [props.simple, n('--simple')], [props.disabled, n('--disabled')]))

    return {
      n,
      classes,
      t,
      pt,
      toNumber,
      rootCls,
      computedCurrent,
      computedPageSize,
      pages,
      pageList,
      disabled,
      pageItemStyle,
      activePageItemStyle,
      elevation,
      hideOnSinglePage,
      simple,
      showTotal,
      showMore,
      showJumper,
      showPageSize,
      pageSizeOptions,
      pageSizeProps,
      bufferSize,
      total,
      totalText,
      handleClick,
      handlePageSizeChange,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../popover/popover';
@import '../menu/menu';
@import '../menu-option/menuOption';
@import '../cell/cell';
@import '../ripple/ripple';
@import '../icon/icon';
@import '../field-decorator/fieldDecorator';
@import '../form-details/formDetails';
@import '../input/input';
@import './pagination';
</style>
