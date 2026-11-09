<template>
  <div ref="barEl" :class="n()">
    <nav :class="n('anchor-list-container')" :style="{ zIndex: toNumber(zIndex) + 2 }" :aria-label="navigationLabel">
      <ul :class="n('anchor-list')" :style="{ display: hideList ? 'none' : 'block' }">
        <li
          v-for="entry in anchorNameList"
          :key="entry.key"
          :class="classes(n('anchor-item'), [active === entry.name, n('anchor-item--active')])"
          :style="{ color: active === entry.name && highlightColor ? highlightColor : undefined }"
        >
          <button
            type="button"
            :class="n('anchor-button')"
            :aria-current="active === entry.name ? 'location' : undefined"
            @click="anchorClick({ anchorName: entry.name, manualCall: true })"
          >
            <slot name="anchor-name" :anchor-name="entry.name">
              {{ entry.name }}
            </slot>
          </button>
        </li>
      </ul>
    </nav>
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onActivated, onBeforeUnmount, onDeactivated, ref, watch } from 'vue'
import { getRect, getScrollLeft, getScrollTop, isPlainObject, toNumber } from '@maple-design/shared'
import { onSmartMounted } from '@maple-design/use'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
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
    const clickedName = ref<string | number | undefined>()
    const barEl = ref<HTMLElement | null>(null)
    const anchorNameList = ref<Array<{ key: number; name: number | string }>>([])
    const active = ref<number | string | undefined>()
    const sticky = computed(() => props.sticky)
    const cssMode = computed(() => props.stickyCssMode)
    const stickyOffsetTop = computed(() => toPxNum(props.stickyOffsetTop))
    const zIndex = computed(() => props.zIndex)
    const { length, indexAnchors, bindIndexAnchors } = useIndexAnchors()
    const { t: localT } = injectLocaleProvider()
    const navigationLabel = computed(() => (localT || t)('indexBar.navigation') ?? 'Index navigation')
    const anchorKeys = new WeakMap<IndexAnchorProvider, number>()
    let nextAnchorKey = 0
    let previousAnchors: Array<{ anchor: IndexAnchorProvider; name: string | number | undefined }> = []

    let scroller: HTMLElement | Window | null = null
    let isDeactivated = false
    let restoring = false
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

    watch(
      () => {
        void length.value
        const entries = indexAnchors.map((anchor) => ({ anchor, name: anchor.name.value, index: anchor.index?.value }))
        return { entries }
      },
      ({ entries }) => {
        if (isDeactivated) {
          return
        }
        if (
          entries.length === previousAnchors.length &&
          entries.every(
            (entry, index) =>
              entry.anchor === previousAnchors[index].anchor && entry.name === previousAnchors[index].name,
          )
        ) {
          return
        }
        const oldActive =
          active.value === undefined ? undefined : previousAnchors.find((entry) => entry.name === active.value)
        if (oldActive) {
          const replacement = entries.find((entry) => entry.anchor === oldActive.anchor)
          active.value =
            replacement?.name ??
            (restoring && entries.some((entry) => entry.name === active.value) ? active.value : undefined)
        }
        previousAnchors = entries
        if (restoring) {
          refreshAnchorNames()
          return
        }
        scrollTask?.cancel()
        scrollTask = undefined
        clickedName.value = undefined
        refreshAnchorNames()
      },
      { flush: 'post' },
    )

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
      restoring = true
      nextTick(() => {
        restoring = false
      })
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
      clickedName.value = undefined
    }

    function beginScroll() {
      const view = barEl.value?.ownerDocument.defaultView
      if (disposed || isDeactivated || !scroller || !view) {
        return
      }
      scrollTask?.cancel()
      clickedName.value = undefined
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
      anchorNameList.value = indexAnchors.flatMap((anchor) => {
        if (anchor.name.value == null) {
          return []
        }
        if (!anchorKeys.has(anchor)) {
          anchorKeys.set(anchor, nextAnchorKey++)
        }
        return [{ key: anchorKeys.get(anchor)!, name: anchor.name.value }]
      })
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

        if (top >= 0 && top < distance && clickedName.value === undefined) {
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
      if (anchorName === active.value && clickedName.value === undefined && !force && !supplied) {
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
      clickedName.value = undefined
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
      navigationLabel,
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
