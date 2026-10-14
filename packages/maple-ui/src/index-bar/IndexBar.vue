<template>
  <div ref="barEl" :class="n()">
    <div :class="n('anchor-list-container')" :style="{ zIndex: toNumber(zIndex) + 2 }">
      <ul :class="n('anchor-list')" :style="{ display: hideList ? 'none' : 'block' }">
        <li
          v-for="anchorName in anchorNameList"
          :key="anchorName"
          :class="classes(n('anchor-item'), [active === anchorName, n('anchor-item--active')])"
          :style="{ color: active === anchorName && highlightColor ? highlightColor : undefined }"
          @click="anchorClick({ anchorName, manualCall: true })"
        >
          <slot name="anchor-name" :anchor-name="anchorName">
            {{ anchorName }}
          </slot>
        </li>
      </ul>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, onBeforeUnmount, onDeactivated, ref, watch } from 'vue'
import { getRect, getScrollLeft, getScrollTop, isPlainObject, toNumber } from '@maplejs/maple-shared'
import { onSmartMounted } from '@maplejs/maple-use'
import { createNamespace } from '../utils/components'
import { getParentScroller, toPxNum } from '../utils/elements'
import { type IndexAnchorProvider } from './anchor-provide'
import { props, type ClickOptions, type IndexBarScrollToOptions } from './props'
import { useIndexAnchors, type IndexBarProvider } from './provide'
import { createIndexScrollTask } from './scroll-task'

const { name, n, classes } = createNamespace('index-bar')

export default defineComponent({
  name,
  props,
  emits: ['change', 'click'],
  setup(props, { emit }) {
    const clickedName = ref<string | number>('')
    const barEl = ref<HTMLElement | null>(null)
    const anchorNameList = ref<(number | string)[]>([])
    const active = ref<number | string | undefined>()
    const sticky = computed(() => props.sticky)
    const cssMode = computed(() => props.stickyCssMode)
    const stickyOffsetTop = computed(() => toPxNum(props.stickyOffsetTop))
    const zIndex = computed(() => props.zIndex)
    const { length, indexAnchors, bindIndexAnchors } = useIndexAnchors()

    let scroller: HTMLElement | Window | null = null
    let isDeactivated = false
    let disposed = false
    type ScrollTask = ReturnType<typeof createIndexScrollTask>
    let scrollTask: ScrollTask | undefined
    let listTask: ScrollTask | undefined
    const indexBarProvider: IndexBarProvider = {
      active,
      sticky,
      cssMode,
      stickyOffsetTop,
      zIndex,
    }

    watch(() => length.value, refreshAnchorNames, { flush: 'post' })

    onSmartMounted(setupScroller)

    onBeforeUnmount(() => {
      disposed = true
      cancelTasks()
      removeScrollerListener()
    })

    onDeactivated(() => {
      isDeactivated = true
      cancelTasks()
      removeScrollerListener()
    })

    onActivated(() => {
      if (!isDeactivated) {
        return
      }
      isDeactivated = false
      refreshAnchorNames()
      if (active.value !== undefined) {
        scheduleScroll(active.value, { event: false }, true)
      }
    })

    bindIndexAnchors(indexBarProvider)

    function cancelTasks() {
      scrollTask?.cancel()
      listTask?.cancel()
      scrollTask = listTask = undefined
      clickedName.value = ''
    }

    function beginScroll() {
      const view = barEl.value?.ownerDocument.defaultView
      if (disposed || isDeactivated || !scroller || !view) {
        return
      }
      scrollTask?.cancel()
      clickedName.value = ''
      const task: ScrollTask = createIndexScrollTask(view, () => !disposed && !isDeactivated && scrollTask === task)
      scrollTask = task
      return task
    }

    async function refreshAnchorNames() {
      listTask?.cancel()
      const view = barEl.value?.ownerDocument.defaultView
      if (disposed || isDeactivated || !view) {
        return
      }
      const task: ScrollTask = createIndexScrollTask(view, () => !disposed && !isDeactivated && listTask === task)
      listTask = task
      if (!(await task.frames(2)) || !task.valid()) {
        return
      }
      anchorNameList.value = indexAnchors
        .filter(({ name }) => name.value != null)
        .map(({ name }) => name.value) as Array<string | number>
    }

    function emitEvent(anchor: IndexAnchorProvider | number | string, options?: IndexBarScrollToOptions) {
      const anchorName = isPlainObject(anchor) ? anchor.name.value : anchor
      if (anchorName === active.value || anchorName === undefined) {
        return
      }

      active.value = anchorName
      if (options?.event !== false) {
        emit('change', anchorName)
      }
    }

    function getOffsetTop() {
      const { top: parentTop } = getRect(scroller!)
      const { top: targetTop } = getRect(barEl.value!)
      const scrollTop = getScrollTop(scroller!)

      return scrollTop - parentTop + targetTop
    }

    function handleScroll() {
      if (disposed || isDeactivated || !scroller || !barEl.value) {
        return
      }
      const scrollTop = getScrollTop(scroller!)
      const scrollHeight = scroller === window ? document.body.scrollHeight : (scroller as HTMLElement).scrollHeight
      const offsetTop = getOffsetTop()

      indexAnchors.forEach((anchor: IndexAnchorProvider, index: number) => {
        const anchorTop = anchor.getOffsetTop()
        const top = scrollTop - anchorTop + stickyOffsetTop.value - offsetTop
        const distance =
          index === indexAnchors.length - 1
            ? scrollHeight
            : indexAnchors[index + 1].getOffsetTop() - anchor.getOffsetTop()

        anchor.setDisabled(true)

        if (top >= 0 && top < distance && clickedName.value === '') {
          anchor.setDisabled(false)
          emitEvent(anchor)
        }
      })
    }

    async function anchorClick(
      { anchorName, manualCall = false, options }: ClickOptions,
      supplied?: ScrollTask,
      force = false,
    ) {
      if (disposed || isDeactivated || !scroller || !barEl.value || (supplied && !supplied.valid())) {
        return
      }
      const previousTask = scrollTask
      if (manualCall) {
        emit('click', anchorName)
      }
      if (disposed || isDeactivated || scrollTask !== previousTask || (supplied && !supplied.valid())) {
        return
      }
      if (anchorName === active.value && clickedName.value === '' && !force && !supplied) {
        return
      }

      const indexAnchor = indexAnchors.find(({ name }: IndexAnchorProvider) => anchorName === name.value)
      if (!indexAnchor) {
        return
      }

      const task = supplied ?? beginScroll()
      if (!task?.valid()) {
        return
      }

      const offsetTop = getOffsetTop()
      const indexAnchorTop = indexAnchor.getOffsetTop()
      const top = indexAnchorTop - stickyOffsetTop.value + offsetTop
      const left = getScrollLeft(scroller!)

      clickedName.value = anchorName
      emitEvent(anchorName, options)
      if (!task.valid() || !(await task.scroll(scroller!, left, top, toNumber(props.duration)))) {
        return
      }
      if (!(await task.frames(2)) || !task.valid()) {
        return
      }
      clickedName.value = ''
    }

    function setupScroller() {
      if (disposed || !barEl.value) {
        return
      }
      removeScrollerListener()
      scroller = getParentScroller(barEl.value as HTMLElement)
      scroller.addEventListener('scroll', handleScroll)
    }

    function removeScrollerListener() {
      if (!scroller) {
        // may be null in nuxt
        return
      }

      scroller.removeEventListener('scroll', handleScroll)
    }

    // expose
    function scheduleScroll(index: number | string, options?: IndexBarScrollToOptions, force = false) {
      const task = beginScroll()
      if (!task) {
        return
      }
      void task.frames(1).then((completed) => {
        if (completed) {
          void anchorClick({ anchorName: index, options }, task, force)
        }
      })
    }

    function scrollTo(index: number | string, options?: IndexBarScrollToOptions) {
      scheduleScroll(index, options)
    }

    return {
      barEl,
      active,
      zIndex,
      anchorNameList,
      n,
      classes,
      toNumber,
      scrollTo,
      anchorClick,
    }
  },
})
</script>
