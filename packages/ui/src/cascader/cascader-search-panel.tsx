import { isShadowRoot } from '../_utils/is-shadow-root'
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  onBeforeUpdate,
  onUpdated,
  PropType,
  ref,
  watch,
  watchPostEffect,
} from 'vue'
import { useEmptySlot } from '../_components/selection-field/empty-slot'
import Scrollbar from '../_components/selection-scrollbar'
import Empty from '../empty'
import Loading from '../loading/Loading.vue'
import { createNamespace, getPrefixCls } from '../utils/components'
import CascaderOption from './cascader-option'
import { cascaderInjectionKey } from './context'
import { CascaderOptionInfo } from './types'
import { useCascaderMenuFocus } from './use-menu-focus'

const { name } = createNamespace('cascader-search-panel')

export default defineComponent({
  name,
  props: {
    options: {
      type: Array as PropType<CascaderOptionInfo[]>,
      required: true,
    },
    loading: Boolean,
    activeKey: String,
    multiple: Boolean,
    multipleGroup: Boolean,
    multipleDialog: Boolean,
    reportPopupElement: Function as PropType<(element: HTMLElement | null) => void>,
    focusRecoveryEnabled: { type: Boolean, default: true },
    focusFallback: Function as PropType<() => void>,
    checkStrictly: Boolean,
    pathLabel: Boolean,
    listboxId: String,
    listboxLabel: String,
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('cascader')
    const panelRef = ref<{ $el: HTMLElement }>()
    watchPostEffect(() => {
      const panel = panelRef.value?.$el
      const selector = props.multipleDialog ? '[role="dialog"]' : props.listboxId ? '[role="listbox"]' : undefined
      const popup = selector ? (panel?.matches(selector) ? panel : panel?.querySelector<HTMLElement>(selector)) : null
      props.reportPopupElement?.(popup ?? null)
    })
    onBeforeUnmount(() => props.reportPopupElement?.(null))
    let previousCheckbox: HTMLInputElement | null = null
    const ownFocusedCheckbox = () => {
      const panel = panelRef.value?.$el
      const root = panel?.getRootNode() as Document | ShadowRoot | undefined
      const focused = root?.activeElement as HTMLInputElement | null | undefined
      const searchPanel = panel?.querySelector(`.${prefixCls}-search-panel`)
      if (
        !props.multiple ||
        focused?.tagName !== 'INPUT' ||
        focused.type !== 'checkbox' ||
        !focused.closest(`.${prefixCls}-option-checkbox`) ||
        focused.closest(`.${prefixCls}-search-panel`) !== searchPanel
      ) {
        return undefined
      }
      return { focused, root: root!, doc: panel!.ownerDocument }
    }
    const isFocusUnclaimed = (root: Document | ShadowRoot, doc: Document) => {
      const active = root.activeElement
      if (active && active !== doc.body && active !== doc.documentElement) {
        return false
      }
      if (isShadowRoot(root)) {
        let host = root.host
        let parent = host.getRootNode()
        while (isShadowRoot(parent)) {
          if (parent.activeElement && parent.activeElement !== host) {
            return false
          }
          host = parent.host
          parent = host.getRootNode()
        }
        if (
          doc.activeElement &&
          doc.activeElement !== host &&
          doc.activeElement !== doc.body &&
          doc.activeElement !== doc.documentElement
        ) {
          return false
        }
      }
      return true
    }
    onBeforeUnmount(() => {
      const current = ownFocusedCheckbox()
      if (!current || !props.focusRecoveryEnabled) {
        return
      }
      void nextTick(() => {
        if (!current.focused.isConnected && isFocusUnclaimed(current.root, current.doc)) {
          props.focusFallback?.()
        }
      })
    })
    onBeforeUpdate(() => {
      previousCheckbox = ownFocusedCheckbox()?.focused ?? null
    })
    onUpdated(() => {
      const previous = previousCheckbox
      previousCheckbox = null
      if (!previous || (previous.isConnected && !previous.disabled) || !props.multiple || !props.focusRecoveryEnabled) {
        return
      }
      const panel = panelRef.value?.$el
      if (!panel?.isConnected) {
        return
      }
      const root = panel.getRootNode() as Document | ShadowRoot
      if (root.activeElement !== previous && !isFocusUnclaimed(root, panel.ownerDocument)) {
        return
      }
      const searchPanel = panel.querySelector(`.${prefixCls}-search-panel`)
      const candidates = panel.querySelectorAll<HTMLInputElement>(
        `.${prefixCls}-option-checkbox input[type="checkbox"]:not(:disabled)`,
      )
      const next = Array.from(candidates).find(
        (candidate) => candidate.closest(`.${prefixCls}-search-panel`) === searchPanel,
      )
      if (next) {
        next.focus()
      } else {
        props.focusFallback?.()
      }
    })
    const emptySlot = useEmptySlot()
    const cascader = inject(cascaderInjectionKey, undefined)
    const { focusedKey, onFocusin, onFocusout } = useCascaderMenuFocus('ul[role="menu"]')
    watch(
      () => [props.loading, props.listboxId, props.options.map((item) => item.key)] as const,
      ([loading, listboxId, keys]) => {
        if (loading || listboxId || (focusedKey.value !== undefined && !keys.includes(focusedKey.value))) {
          focusedKey.value = undefined
        }
      },
      { flush: 'sync' },
    )
    const tabKey = computed(() => {
      const enabled = props.options.filter((item) => !item.disabled)
      return (
        props.options.find((item) => item.key === focusedKey.value)?.key ??
        enabled.find((item) => item.key === props.activeKey)?.key ??
        enabled.find((item) => cascader?.valueMap?.has(item.key))?.key ??
        enabled[0]?.key ??
        props.options[0]?.key
      )
    })

    const renderContent = () => {
      if (props.listboxId) {
        const active = props.options.some((item) => item.key === props.activeKey && !item.disabled)
          ? props.activeKey
          : undefined
        return (
          <>
            <ul
              role="listbox"
              id={props.listboxId}
              aria-label={props.listboxLabel}
              aria-busy={props.loading || undefined}
              class={[`${prefixCls}-list`, `${prefixCls}-search-list`]}
            >
              {!props.loading &&
                props.options.map((item, index) => (
                  <CascaderOption
                    key={item.key}
                    class={`${prefixCls}-search-option`}
                    option={item}
                    active={item.key === props.activeKey}
                    multiple={false}
                    checkStrictly={props.checkStrictly}
                    pathLabel={props.pathLabel}
                    searchOption
                    listboxOption
                    listboxSelected={active ? item.key === active : Boolean(cascader?.valueMap?.has(item.key))}
                    optionId={`${props.listboxId}-option-${index}`}
                    tabIndex={-1}
                  />
                ))}
            </ul>
            {props.loading ? (
              <Loading />
            ) : props.options.length === 0 ? (
              <div class={`${prefixCls}-list-empty`}>
                {slots.empty?.() ?? emptySlot.value?.({ component: 'cascader' }) ?? <Empty />}
              </div>
            ) : null}
          </>
        )
      }
      if (props.loading) {
        return <Loading />
      }
      if (props.options.length === 0) {
        return (
          <div class={`${prefixCls}-list-empty`}>
            {slots.empty?.() ?? emptySlot.value?.({ component: 'cascader' }) ?? <Empty />}
          </div>
        )
      }
      return (
        <ul
          role={props.multipleGroup || props.multipleDialog ? 'presentation' : 'menu'}
          onFocusin={onFocusin}
          onFocusout={onFocusout}
          class={[
            `${prefixCls}-list`,
            `${prefixCls}-search-list`,
            {
              [`${prefixCls}-list-multiple`]: props.multiple,
            },
          ]}
        >
          {props.options.map((item) => (
            <CascaderOption
              key={item.key}
              class={`${prefixCls}-search-option`}
              option={item}
              active={item.key === props.activeKey}
              multiple={props.multiple}
              multipleGroupOption={props.multipleGroup || props.multipleDialog}
              checkStrictly={props.checkStrictly}
              pathLabel={props.pathLabel}
              searchOption
              tabIndex={
                props.multipleGroup || props.multipleDialog ? -1 : props.multiple || item.key === tabKey.value ? 0 : -1
              }
            />
          ))}
        </ul>
      )
    }

    return () => (
      <Scrollbar
        ref={panelRef}
        {...{
          role: props.multipleDialog ? 'dialog' : props.multipleGroup ? 'group' : undefined,
          'aria-label': props.multipleGroup || props.multipleDialog ? props.listboxLabel : undefined,
          'aria-busy': (props.multipleGroup || props.multipleDialog) && props.loading ? true : undefined,
        }}
        class={[`${prefixCls}-panel`, `${prefixCls}-search-panel`]}
      >
        {renderContent()}
      </Scrollbar>
    )
  },
})
