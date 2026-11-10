import {
  defineComponent,
  type ComponentPublicInstance,
  type DefineComponent,
  type PropType,
  type UnwrapNestedRefs,
} from 'vue'
import VirtualList from '../_components/virtual-list-v2'
import { isFunction } from '../_utils/is'
import { createNamespace } from '../utils/components'
import OptGroup from './Optgroup.vue'
import Option from './Option.vue'
import SelectDropdown from './SelectDropdown.vue'
import type { SelectOptionGroupInfo, SelectOptionInfo } from './types'
import type { SelectController } from './use-select-controller'
import { isGroupOptionInfo, isValidOption } from './utils'

interface SelectMenuProps {
  controller: UnwrapNestedRefs<SelectController>
}

const SelectMenu: DefineComponent<SelectMenuProps> = defineComponent({
  name: createNamespace('select-menu').name,
  props: { controller: { type: Object as PropType<UnwrapNestedRefs<SelectController>>, required: true } },
  setup({ controller }, { slots }) {
    const getOptionContentFunc = (optionInfo: SelectOptionInfo) => {
      if (isFunction(slots.option)) {
        const optionSlot = slots.option
        return () => optionSlot({ data: optionInfo.raw })
      }
      if (isFunction(optionInfo.render)) {
        return optionInfo.render
      }
      return () => optionInfo.label
    }

    const renderOption = (optionInfo: SelectOptionInfo | SelectOptionGroupInfo) => {
      if (isGroupOptionInfo(optionInfo)) {
        return (
          <OptGroup key={optionInfo.key} label={optionInfo.label}>
            {optionInfo.options.map((child) => renderOption(child))}
          </OptGroup>
        )
      }

      if (
        !isValidOption(optionInfo, {
          inputValue: controller.computedInputValue,
          filterOption: controller.props.filterOption,
          caseSensitive: controller.props.caseSensitive,
          searchFields: controller.props.searchFields,
        })
      ) {
        return null
      }

      return (
        <Option
          v-slots={{
            default: getOptionContentFunc(optionInfo),
          }}

          ref={(ref: Element | ComponentPublicInstance | null) => {
            if (ref && '$el' in ref) {
              controller.optionRefs[optionInfo.key] = ref.$el
            } else if (!ref) {
              delete controller.optionRefs[optionInfo.key]
            }
          }}
          key={optionInfo.key}
          value={optionInfo.value}
          label={optionInfo.label}
          disabled={optionInfo.disabled || controller.session.pending}
          internal
        />
      )
    }

    const renderDropDown = () => {
      return (
        <>
          {controller.props.virtualListProps && <div hidden>{slots.default?.()}</div>}
          <SelectDropdown
            onUserInteraction={controller.cancelPendingInitialScroll}
            listboxId={controller.listboxId}
            multiple={controller.props.multiple}
            ref={(el) => {
              controller.dropdownRef = el as ComponentPublicInstance
            }}
            v-slots={{
              default: () => [...(slots.default?.() ?? []), ...controller.validOptions.map(renderOption)],
              'virtual-list': () => (
                <VirtualList
                  {...controller.props.virtualListProps}
                  onScroll={controller.handleDropdownScroll}
                  onReach-bottom={controller.handleDropdownReachBottom}
                  ref={(el) => {
                    controller.virtualListRef = el
                  }}
                  data={[
                    ...controller.validOptionInfos.filter((option) => option.origin === 'slot'),
                    ...controller.validOptions,
                  ]}
                  v-slots={{
                    item: ({ item }: { item: SelectOptionInfo | SelectOptionGroupInfo }) => renderOption(item),
                  }}
                />
              ),
              empty: slots.empty,
              header: slots.header,
              footer: slots.footer,
            }}
            loading={controller.loading}
            empty={controller.validOptionInfos.length === 0}
            virtualList={Boolean(controller.props.virtualListProps)}
            scrollbar={controller.props.scrollbar}
            showHeaderOnEmpty={controller.props.showHeaderOnEmpty}
            showFooterOnEmpty={controller.props.showFooterOnEmpty}
            onScroll={controller.handleDropdownScroll}
            onReach-bottom={controller.handleDropdownReachBottom}
          />
        </>
      )
    }

    return renderDropDown
  },
})

export default SelectMenu
