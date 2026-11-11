<template>
  <Component :is="mergedComponent.container" ref="containerRef" :class="prefixCls" :style="style" @scroll="onScroll">
    <Component
      :is="mergedComponent.list"
      v-bind="listAttrs"
      :style="
        virtualEnabled && paddingPosition === 'list'
          ? {
              paddingTop: `${frontPadding}px`,
              paddingBottom: `${behindPadding}px`,
            }
          : {}
      "
    >
      <slot name="list-prefix" />
      <Component
        :is="mergedComponent.content"
        ref="contentRef"
        v-bind="contentAttrs"
        :style="
          virtualEnabled && paddingPosition === 'content'
            ? {
                paddingTop: `${frontPadding}px`,
                paddingBottom: `${behindPadding}px`,
              }
            : {}
        "
      >
        <VirtualListItem
          v-for="(item, index) of currentList"
          :key="getItemKey(item, virtualEnabled ? start + index : index)"
          :index="virtualEnabled ? start + index : index"
          :has-item-size="hasItemSize"
          :set-item-size="setItemSize"
        >
          <slot name="item" :item="item" :index="virtualEnabled ? start + index : index" />
        </VirtualListItem>
      </Component>
    </Component>
  </Component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue'
import { inlineScrollLeft, setInlineScrollLeft, useDirection } from '../../_utils/direction'
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
      validator: (value: number) => Number.isFinite(value) && value > 0,
    },
    buffer: {
      type: Number,
      default: 10,
      validator: (value: number) => Number.isInteger(value) && value >= 0,
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
    const { dir } = useDirection(() => containerRef.value)
    let readingOffset = 0
    const contentRef = ref<HTMLElement>()
    const viewportHeight = ref(typeof props.height === 'number' && props.height > 0 ? props.height : 200)
    const scrollOffset = ref(0)
    let viewportObserver: ResizeObserver | undefined
    const updateViewport = () => {
      const actual = containerRef.value?.clientHeight ?? 0
      if (actual > 0) {
        viewportHeight.value = actual
      }
    }
    onMounted(() => {
      updateViewport()
      const element = containerRef.value
      const Observer = element?.ownerDocument.defaultView?.ResizeObserver
      if (element && Observer) {
        viewportObserver = new Observer(updateViewport)
        viewportObserver.observe(element)
      }
    })
    onBeforeUnmount(() => viewportObserver?.disconnect())
    watch(height, async () => {
      await nextTick()
      updateViewport()
    })
    onActivated(async () => {
      await nextTick()
      updateViewport()
    })

    let scrollRequest = 0
    let commandedScroll: { top: number; correct: () => void } | undefined
    let mounted = false
    let active = true
    let disposed = false
    const available = () => mounted && active && !disposed && !!containerRef.value
    const isCurrent = (request: number, element: HTMLElement) =>
      available() && request === scrollRequest && containerRef.value === element
    onMounted(() => {
      mounted = true
    })
    onActivated(() => {
      if (!disposed) {
        active = true
      }
    })
    onDeactivated(() => {
      active = false
      scrollRequest++
      commandedScroll = undefined
    })
    onBeforeUnmount(() => {
      disposed = true
      mounted = active = false
      scrollRequest++
      commandedScroll = undefined
    })

    watch(
      dir,
      () => {
        if (available() && containerRef.value) {
          setInlineScrollLeft(containerRef.value, readingOffset)
        }
      },
      { flush: 'post' },
    )

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
      viewportHeight,
      scrollOffset,
    })

    watch(
      viewportHeight,
      () => {
        if (containerRef.value) {
          setStart(getStartByScroll(containerRef.value.scrollTop))
        }
      },
      { flush: 'post' },
    )

    watch(
      [fixedSize, estimatedSize],
      () => {
        scrollRequest++
        commandedScroll = undefined
        if (containerRef.value) {
          setStart(getStartByScroll(containerRef.value.scrollTop))
        }
      },
      { flush: 'post' },
    )

    const virtualEnabled = computed(() => !props.threshold || data.value.length > props.threshold)
    watch([dataKeys, virtualEnabled], ([keys, enabled], [previousKeys, previousEnabled]) => {
      if (
        enabled === previousEnabled &&
        keys.length === previousKeys.length &&
        keys.every((key, index) => key === previousKeys[index])
      ) {
        return
      }
      scrollRequest++
      commandedScroll = undefined
      setStart(start.value)
    })

    const currentList = computed(() => {
      if (!virtualEnabled.value) {
        return data.value
      }

      return data.value.slice(start.value, end.value)
    })

    const onScroll = (ev: Event) => {
      if (!available()) {
        return
      }
      const element = containerRef.value!
      readingOffset = inlineScrollLeft(element)
      const { scrollTop, scrollHeight, offsetHeight } = ev.target as HTMLElement
      // Our own scroll event can render additional measured rows. Keep its
      // alignment transaction; a different native position cancels it.
      const correction = commandedScroll?.top === scrollTop ? commandedScroll.correct : undefined
      const request = correction ? scrollRequest : ++scrollRequest
      if (!correction) {
        commandedScroll = undefined
      }
      const _start = getStartByScroll(scrollTop)
      if (virtualEnabled.value && _start !== start.value) {
        setStart(_start)
        nextTick(() => {
          if (!isCurrent(request, element)) {
            return
          }
          if (correction) {
            correction()
          } else {
            scrollTo(scrollTop)
          }
        })
      }
      emit('scroll', ev)
      if (!isCurrent(request, element)) {
        return
      }
      const bottom = Math.floor(scrollHeight - (scrollTop + offsetHeight))
      if (bottom <= 0) {
        emit('reach-bottom', ev)
      }
    }

    const scrollTo = (options: ScrollOptions) => {
      if (!available()) {
        return
      }
      const element = containerRef.value
      if (!element) {
        return
      }
      const request = ++scrollRequest
      commandedScroll = undefined
      if (isNumber(options)) {
        if (Number.isFinite(options)) {
          element.scrollTop = Math.max(0, options)
          if (virtualEnabled.value) {
            setStart(getStartByScroll(element.scrollTop))
          }
        }
        return
      }
      const index = options.index ?? dataKeys.value.indexOf(options.key ?? '')
      if (!Number.isInteger(index) || index < 0 || index >= dataKeys.value.length) {
        return
      }
      const align = options.align ?? 'top'
      const bounds = () => {
        const rows = Array.from(element.querySelectorAll<HTMLElement>(`[data-virtual-list-index="${index}"]`))
        const rects = rows
          .filter((row) => row.closest(`.${prefixCls}`) === element)
          .map((row) => row.getBoundingClientRect())
          .filter((rect) => rect.height)
        if (rects.length) {
          const origin = element.getBoundingClientRect().top + element.clientTop
          return {
            top: element.scrollTop + Math.min(...rects.map((rect) => rect.top)) - origin,
            bottom: element.scrollTop + Math.max(...rects.map((rect) => rect.bottom)) - origin,
          }
        }
        return { top: getScrollOffset(index), bottom: getScrollOffset(index + 1) }
      }
      const viewport = element.clientHeight || element.offsetHeight
      const initialBounds = bounds()
      if (
        align === 'auto' &&
        initialBounds.top >= element.scrollTop &&
        initialBounds.bottom <= element.scrollTop + viewport
      ) {
        return
      }
      const apply = () => {
        const target = containerRef.value
        if (!target || !isCurrent(request, element)) {
          return
        }
        const { top, bottom } = bounds()
        const viewport = target.clientHeight || target.offsetHeight
        const current = target.scrollTop
        const next =
          align === 'bottom'
            ? bottom - viewport
            : align === 'auto'
              ? top < current
                ? top
                : bottom > current + viewport
                  ? bottom - viewport
                  : current
              : top
        target.scrollTop = Math.max(0, next)
        scrollOffset.value = target.scrollTop
        commandedScroll = { top: target.scrollTop, correct: apply }
      }
      if (virtualEnabled.value) {
        setStart(index - buffer.value)
      }
      apply()
      let corrected = false
      nextTick(() => {
        if (corrected) {
          return
        }
        corrected = true
        apply()
      })
    }

    return {
      prefixCls,
      virtualEnabled,
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
