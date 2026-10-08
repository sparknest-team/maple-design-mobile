<template>
  <Component :is="mergedComponent.container" ref="containerRef" :class="prefixCls" :style="style" @scroll="onScroll">
    <Component
      :is="mergedComponent.list"
      v-bind="listAttrs"
      :style="
        paddingPosition === 'list'
          ? {
              paddingTop: `${frontPadding}px`,
              paddingBottom: `${behindPadding}px`,
            }
          : {}
      "
    >
      <Component
        :is="mergedComponent.content"
        ref="contentRef"
        v-bind="contentAttrs"
        :style="
          paddingPosition === 'content'
            ? {
                paddingTop: `${frontPadding}px`,
                paddingBottom: `${behindPadding}px`,
              }
            : {}
        "
      >
        <VirtualListItem
          v-for="(item, index) of currentList"
          :key="getItemKey(item, start + index)"
          :has-item-size="hasItemSize"
          :set-item-size="setItemSize"
        >
          <slot name="item" :item="item" :index="start + index" />
        </VirtualListItem>
      </Component>
    </Component>
  </Component>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, ref, toRefs } from 'vue'
import { isNumber, isObject } from '../../_utils/is'
import { createNamespace, getPrefixCls } from '../../utils/components'
import { useSize } from './hooks/use-size'
import { ScrollOptions } from './interface'
import VirtualListItem from './virtual-list-item'

export default defineComponent({
  name: createNamespace('virtual-list').name,
  components: { VirtualListItem },
  props: {
    height: {
      type: [Number, String],
      default: 200,
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    threshold: {
      type: Number,
      default: 0,
    },
    itemKey: {
      type: [String, Function] as PropType<string | ((item: unknown) => string | number)>,
      default: 'key',
    },
    fixedSize: {
      type: Boolean,
      default: false,
    },
    estimatedSize: {
      type: Number,
      default: 30,
    },
    buffer: {
      type: Number,
      default: 10,
    },
    component: {
      type: [String, Object],
      default: 'div',
    },
    listAttrs: {
      type: Object,
    },
    contentAttrs: {
      type: Object,
    },
    paddingPosition: {
      type: String,
      default: 'content',
    },
  },
  emits: {
    scroll: (ev: Event) => true,
    'reach-bottom': (ev: Event) => true,
  },
  setup(props, { emit }) {
    const { data, itemKey, fixedSize, estimatedSize, buffer, height } = toRefs(props)
    const prefixCls = getPrefixCls('virtual-list')
    const mergedComponent = computed(() => {
      if (isObject(props.component)) {
        return {
          container: 'div',
          list: 'div',
          content: 'div',
          ...props.component,
        }
      }
      return {
        container: props.component,
        list: 'div',
        content: 'div',
      }
    })

    const containerRef = ref<HTMLElement>()
    const contentRef = ref<HTMLElement>()

    const style = computed(() => {
      return {
        height: isNumber(height.value) ? `${height.value}px` : height.value,
        overflow: 'auto',
      }
    })

    const getItemKey = (item: any, index: number) => {
      const key = typeof itemKey.value === 'function' ? itemKey.value(item) : item?.[itemKey.value]
      return (key ?? index) as string | number
    }

    const dataKeys = computed(() => data.value.map((item: any, index) => getItemKey(item, index)))

    const {
      frontPadding,
      behindPadding,
      start,
      end,
      getStartByScroll,
      setItemSize,
      hasItemSize,
      setStart,
      getScrollOffset,
    } = useSize({
      dataKeys,
      contentRef,
      fixedSize,
      estimatedSize,
      buffer,
    })

    const currentList = computed(() => {
      if (props.threshold && data.value.length <= props.threshold) {
        return data.value
      }

      return data.value.slice(start.value, end.value)
    })

    const onScroll = (ev: Event) => {
      const { scrollTop, scrollHeight, offsetHeight } = ev.target as HTMLElement
      const _start = getStartByScroll(scrollTop)
      if (_start !== start.value) {
        setStart(_start)
        nextTick(() => {
          scrollTo(scrollTop)
        })
      }
      emit('scroll', ev)
      const bottom = Math.floor(scrollHeight - (scrollTop + offsetHeight))
      if (bottom <= 0) {
        emit('reach-bottom', ev)
      }
    }

    const scrollTo = (options: ScrollOptions) => {
      if (containerRef.value) {
        if (isNumber(options)) {
          containerRef.value.scrollTop = options
        } else {
          const { align = 'top' } = options
          const _index = options.index ?? dataKeys.value.indexOf(options.key ?? '')
          setStart(_index - buffer.value)
          containerRef.value.scrollTop = getScrollOffset(_index)
          nextTick(() => {
            if (containerRef.value) {
              const _scrollTop = getScrollOffset(_index)
              if (_scrollTop !== containerRef.value.scrollTop) {
                containerRef.value.scrollTop = _scrollTop
              }
            }
          })
        }
      }
    }

    return {
      prefixCls,
      containerRef,
      contentRef,
      frontPadding,
      currentList,
      behindPadding,
      onScroll,
      setItemSize,
      hasItemSize,
      start,
      scrollTo,
      style,
      mergedComponent,
      getItemKey,
    }
  },
})
</script>
