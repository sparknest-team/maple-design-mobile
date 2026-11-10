import { computed, defineComponent, inject, PropType } from 'vue'
import { useEmptySlot } from '../_components/selection-field/empty-slot'
import Scrollbar from '../_components/selection-scrollbar'
import Empty from '../empty'
import Loading from '../loading/Loading.vue'
import { createNamespace, getPrefixCls } from '../utils/components'
import CascaderOption from './cascader-option'
import { cascaderInjectionKey } from './context'
import { CascaderOptionInfo } from './types'

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
    checkStrictly: Boolean,
    pathLabel: Boolean,
    listboxId: String,
    listboxLabel: String,
  },
  setup(props, { slots }) {
    const prefixCls = getPrefixCls('cascader')
    const emptySlot = useEmptySlot()
    const cascader = inject(cascaderInjectionKey, undefined)
    const tabKey = computed(() => {
      const enabled = props.options.filter((item) => !item.disabled)
      return (
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
          role="menu"
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
              checkStrictly={props.checkStrictly}
              pathLabel={props.pathLabel}
              searchOption
              tabIndex={props.multiple || item.key === tabKey.value ? 0 : -1}
            />
          ))}
        </ul>
      )
    }

    return () => <Scrollbar class={[`${prefixCls}-panel`, `${prefixCls}-search-panel`]}>{renderContent()}</Scrollbar>
  },
})
