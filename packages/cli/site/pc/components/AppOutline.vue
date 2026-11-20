<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    root?: HTMLElement | null
    language?: string
    pageKey?: string
    visible?: boolean
    outlineHref?: (id: string) => string
  }>(),
  { visible: true },
)
const emit = defineEmits<{ navigate: [id: string]; 'active-change': [id: string] }>()
const headings = ref<{ id: string; title: string; level: number; element: HTMLElement }[]>([])
const activeId = ref('')
const outline = ref<HTMLElement | null>(null)
let observer: MutationObserver | undefined
let scrollTimer: ReturnType<typeof setTimeout> | undefined

function updateActive() {
  let active: (typeof headings.value)[number] | undefined
  for (const heading of headings.value) {
    if (heading.element.getBoundingClientRect().top > 120) break
    active = heading
  }
  activeId.value = active?.id ?? headings.value[0]?.id ?? ''
  return active?.id ?? ''
}

function navigate(event: MouseEvent, id: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()
  emit('navigate', id)
}

function followActive() {
  const container = outline.value
  if (!props.visible || !container) return
  const link = container.querySelector<HTMLElement>('[aria-current="location"]')
  if (!link) return
  const bounds = container.getBoundingClientRect()
  if (!bounds.height) return
  const item = link.getBoundingClientRect()
  if (item.top < bounds.top) {
    container.scrollTo({ top: container.scrollTop + item.top - bounds.top, behavior: 'smooth' })
  } else if (item.bottom > bounds.bottom) {
    container.scrollTo({ top: container.scrollTop + item.bottom - bounds.bottom, behavior: 'smooth' })
  }
}

watch([activeId, () => props.visible, () => props.pageKey], () => nextTick(followActive), { flush: 'post' })

function onScroll(event: Event) {
  // Ignore independent demo, sidebar and outline scrolling.
  if (event.target !== document && event.target !== props.root) return
  updateActive()
  nextTick(followActive)
  clearTimeout(scrollTimer)
  const scroller = event.target === props.root ? props.root : document.scrollingElement
  scrollTimer = setTimeout(() => {
    const id = updateActive()
    emit('active-change', scroller?.scrollTop === 0 ? '' : id)
  }, 150)
}

function collect() {
  const elements = props.root?.querySelectorAll<HTMLElement>('.maple-site-doc h2, .maple-site-doc h3') ?? []
  headings.value = Array.from(elements)
    .filter((element) => !element.closest('.loca-doc-preview__example, details'))
    .map((element, index) => {
      if (!element.id) {
        let id = `maple-doc-section-${index}`
        while (document.getElementById(id)) id += '-section'
        element.id = id
      }
      const label = element.cloneNode(true) as HTMLElement
      label.querySelectorAll('a').forEach((link) => {
        if (link.textContent?.trim() === '#') link.remove()
      })
      return {
        id: element.id,
        title: label.textContent?.trim() ?? '',
        level: Number(element.tagName.slice(1)),
        element,
      }
    })
    .filter((heading) => heading.title)
  updateActive()
}

watch(
  () => [props.root, props.pageKey],
  () => {
    observer?.disconnect()
    collect()
    if (props.root) {
      observer = new MutationObserver(collect)
      observer.observe(props.root, { childList: true, subtree: true, characterData: true })
    }
  },
  { immediate: true, flush: 'post' },
)

watch(() => props.pageKey, () => clearTimeout(scrollTimer), { flush: 'sync' })

// Capture also covers a document container that scrolls independently of the window.
document.addEventListener('scroll', onScroll, { capture: true, passive: true })
onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(scrollTimer)
  document.removeEventListener('scroll', onScroll, true)
})
</script>

<template>
  <nav ref="outline" class="maple-site-outline" :aria-label="language === 'en-US' ? 'On this page' : '本页目录'">
    <a
      v-for="heading in headings"
      :key="heading.id"
      :href="outlineHref?.(heading.id) ?? `#${heading.id}`"
      class="maple-site-outline__link"
      :class="{ 'maple-site-outline__link--nested': heading.level === 3 }"
      :aria-current="activeId === heading.id ? 'location' : undefined"
      @click="navigate($event, heading.id)"
      >{{ heading.title }}</a
    >
    <p v-if="!headings.length" class="maple-site-outline__empty">
      {{ language === 'en-US' ? 'No headings on this page' : '本页暂无目录' }}
    </p>
  </nav>
</template>

<style lang="less">
.maple-site-outline {
  padding: 16px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--site-config-color-border) transparent;

  &__link {
    display: block;
    padding: 3px 12px;
    border-left: 2px solid var(--site-config-color-border);
    color: var(--site-config-color-sub-text);
    font-size: 14px;
    line-height: 1.7rem;
    text-decoration: none;
    overflow-wrap: anywhere;

    &--nested {
      padding-left: 20px;
      font-size: 13px;
    }

    &:hover {
      color: var(--mp-sys-color-content-brand, var(--site-config-color-text));
    }

    &[aria-current='location'] {
      color: var(--mp-sys-color-content-brand, var(--site-config-color-text));
      border-left-color: currentColor;
      font-weight: 600;
    }

    &:focus-visible {
      outline: 2px solid var(--site-config-color-text);
      outline-offset: -2px;
    }
  }

  &__empty {
    color: var(--site-config-color-sub-text);
    font-size: 14px;
  }
}
</style>
