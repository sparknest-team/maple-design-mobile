import { computed } from 'vue'
import type { ExtractPropTypes, Ref } from 'vue'
import { getValueByPath, setValueByPath } from '../../../_utils/get-value-by-path'
import { isFunction, isNull, isNumber, isUndefined } from '../../../_utils/is'
import type { tableProps } from '../../props'
import type { TableColumnData, TableData, TableDataWithRaw } from '../../types'

/** Summary consumes the already filtered, sorted and paginated pipeline. */
export function useSummaryData(options: {
  props: Pick<ExtractPropTypes<typeof tableProps>, 'summary' | 'summaryText' | 'rowKey'>
  dataColumns: Readonly<Ref<TableColumnData[]>>
  flattenData: Readonly<Ref<TableDataWithRaw[]>>
  flattenRawData: Readonly<Ref<TableData[]>>
}) {
  const { props, dataColumns, flattenData, flattenRawData } = options
  const getSummaryData = () => {
    return dataColumns.value.reduce(
      (per, column, index) => {
        if (column.dataIndex) {
          if (index === 0) {
            setValueByPath(per, column.dataIndex, props.summaryText, {
              addPath: true,
            })
          } else {
            let count = 0
            let isNotNumber = false
            flattenData.value.forEach((data) => {
              if (column.dataIndex) {
                const _number = getValueByPath(data.raw, column.dataIndex)
                if (isNumber(_number)) {
                  count += _number
                } else if (!isUndefined(_number) && !isNull(_number)) {
                  isNotNumber = true
                }
              }
            })
            setValueByPath(per, column.dataIndex, isNotNumber ? '' : count, {
              addPath: true,
            })
          }
        }

        return per
      },
      {} as Record<string, any>,
    )
  }

  const getTableDataWithRaw = (data?: TableData[]): TableDataWithRaw[] => {
    if (data && data.length > 0) {
      return data.map((raw) => {
        return {
          raw,
          key: raw[props.rowKey],
        }
      })
    }
    return []
  }

  const summaryData = computed(() => {
    if (props.summary) {
      if (isFunction(props.summary)) {
        return getTableDataWithRaw(
          props.summary({
            columns: dataColumns.value,
            data: flattenRawData.value,
          }),
        )
      }
      return getTableDataWithRaw([getSummaryData()])
    }
    return []
  })

  return summaryData
}
