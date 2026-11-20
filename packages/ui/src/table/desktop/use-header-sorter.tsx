import type { Ref } from 'vue'
import { IconCaretDown } from '@maple-design/icons-vue/icon-caret-down'
import { IconCaretUp } from '@maple-design/icons-vue/icon-caret-up'
import type { TableColumnData } from '../types'
import type { TableContext } from '../context'
import { useColumnSorter } from '../features/sort/use-column-sorter'

export function useDesktopHeaderSorter(column: Ref<TableColumnData>, tableCtx: Partial<TableContext>, prefixCls: string) {
  const state = useColumnSorter({ column, tableCtx })
  const { hasSorter, hasAscendBtn, hasDescendBtn, sortOrder } = state
    const renderSorterNode = () => {
      if (!hasSorter.value) return null;
      return (
        <span class={`${prefixCls}-sorter`}>
          {hasAscendBtn.value && (
            <div
              class={[
                `${prefixCls}-sorter-icon`,
                {
                  [`${prefixCls}-sorter-icon-active`]:
                    sortOrder.value === "ascend",
                },
              ]}
            >
              <IconCaretUp />
            </div>
          )}
          {hasDescendBtn.value && (
            <div
              class={[
                `${prefixCls}-sorter-icon`,
                {
                  [`${prefixCls}-sorter-icon-active`]:
                    sortOrder.value === "descend",
                },
              ]}
            >
              <IconCaretDown />
            </div>
          )}
        </span>
      );
    };

  return { ...state, renderSorterNode }
}
