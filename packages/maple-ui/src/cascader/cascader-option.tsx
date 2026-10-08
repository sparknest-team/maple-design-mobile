import type { PropType } from 'vue'
import { computed, defineComponent, inject, ref } from 'vue'
import { IconLoading, IconRight } from '@maplejs/icons-vue'
import SelectionIndicator from '../_components/selection-field/SelectionIndicator.vue'
import { isFunction } from '../_utils/is'
import { createNamespace, getPrefixCls } from '../utils/components'
import { CascaderContext, cascaderInjectionKey } from './context'
import type { CascaderOption, CascaderOptionInfo } from './types'
import { getCheckedStatus, getOptionLabel } from './utils'

const { name } = createNamespace('cascader-option')

export default defineComponent({
  name,
  props: {
    option: {
      type: Object as PropType<CascaderOptionInfo>,
      required: true,
    },
    active: Boolean,
    multiple: Boolean,
    checkStrictly: Boolean,
    searchOption: Boolean,
    pathLabel: Boolean,
  },
  setup(props) {
    const prefixCls = getPrefixCls('cascader-option')
    const cascaderCtx = inject<Partial<CascaderContext>>(cascaderInjectionKey, {})

    const isLoading = ref(false)
    const events: Record<string, any> = {}

    const handlePathChange = (_event: Event) => {
      if (props.option.disabled) {
        return
      }
      if (cascaderCtx.expandOption) {
        isLoading.value = true
        void cascaderCtx
          .expandOption(props.option)
          .catch(() => undefined)
          .finally(() => {
            isLoading.value = false
          })
      } else {
        if (cascaderCtx.loadMore && !props.option.isLeaf && !props.option.children && !isLoading.value) {
          isLoading.value = true
          cascaderCtx.loadMore(props.option.raw, (children) => {
            isLoading.value = false
            if (children) {
              cascaderCtx.addLazyLoadOptions?.(children, props.option.key)
            }
          })
        }
        cascaderCtx.setSelectedPath?.(props.option.key)
      }
    }

    if (!props.option.disabled) {
      events.onMouseenter = [() => cascaderCtx.setActiveKey?.(props.option.key)]
      events.onMouseleave = () => cascaderCtx.setActiveKey?.()
      events.onClick = []
      if (cascaderCtx.expandTrigger === 'hover') {
        events.onMouseenter.push((ev: Event) => handlePathChange(ev))
      } else {
        events.onClick.push((ev: Event) => handlePathChange(ev))
      }
      if (props.option.isLeaf || props.checkStrictly) {
        events.onClick.push((ev: Event) => {
          handlePathChange(ev)
          cascaderCtx.onClickOption?.(props.option, !checkedStatus.value.checked)
        })
      }
    }

    const cls = computed(() => [
      prefixCls,
      {
        [`${prefixCls}-active`]: props.active,
        [`${prefixCls}-disabled`]: props.option.disabled,
      },
    ])

    const checkedStatus = computed(() => {
      if (props.checkStrictly) {
        return {
          checked: cascaderCtx.valueMap?.has(props.option.key),
          indeterminate: false,
        }
      }
      return getCheckedStatus(props.option, cascaderCtx.valueMap)
    })

    const renderLabelContent = () => {
      if (props.pathLabel) {
        return cascaderCtx?.formatLabel?.(props.option.path.map((item) => item.raw)) ?? getOptionLabel(props.option)
      }
      if (cascaderCtx.slots?.option) {
        return cascaderCtx.slots.option({ data: props.option })
      }
      if (isFunction(props.option.render)) {
        return props.option.render()
      }
      return props.option.label
    }

    const renderIcon = () => {
      if (isLoading.value) {
        return <IconLoading class={`${prefixCls}-loading-icon`} />
      }
      if (!props.searchOption && !props.option.isLeaf) {
        return <IconRight class={`${prefixCls}-expand-icon`} />
      }
      return null
    }

    return () => (
      <li
        tabindex="0"
        role="menuitem"
        aria-disabled={props.option.disabled}
        aria-haspopup={!props.option.isLeaf}
        aria-expanded={!props.option.isLeaf && props.active}
        title={props.option.label}
        class={cls.value}
        {...events}
      >
        {(props.multiple || props.checkStrictly) && (
          <span
            onClick={(event: MouseEvent) => {
              event.stopPropagation()
              if (props.option.disabled || props.option.selectionDisabled) {
                return
              }
              handlePathChange(event)
              cascaderCtx.onClickOption?.(props.option, !checkedStatus.value.checked)
            }}
          >
            <SelectionIndicator
              checked={checkedStatus.value.checked}
              indeterminate={checkedStatus.value.indeterminate}
              radio={!props.multiple}
            />
          </span>
        )}
        <div class={`${prefixCls}-label`}>
          {renderLabelContent()}
          {renderIcon()}
        </div>
      </li>
    )
  },
})
