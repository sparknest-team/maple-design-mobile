import type {
  CSSProperties,
  ExtractPropTypes,
  Ref,
  Slots,
  VNodeChild,
} from "vue";
import type { tableProps } from "../../props";
import type {
  TableColumnData,
  TableDataWithRaw,
  TableOperationColumn,
} from "../../types";
import { isFunction } from "../../../_utils/is";
import { getColumnLayoutKey } from "../../extra-column";
import { useSpan } from "../span/use-span";
import Tr from "../../table-tr";
import Td from "../../table-td";
import OperationTd from "../../table-operation-td";

type SummaryCellEvents = (
  record: TableDataWithRaw,
  column: TableColumnData,
) => {
  onClick: (event: Event) => void;
  onDblclick: (event: Event) => void;
  onMouseenter: (event: Event) => void;
  onMouseleave: (event: Event) => void;
  onContextmenu: (event: Event) => void;
};

interface SummaryRenderOptions {
  props: Pick<ExtractPropTypes<typeof tableProps>, "rowClass">;
  slots: Slots;
  prefixCls: string;
  summaryData: Readonly<Ref<TableDataWithRaw[]>>;
  dataColumns: Readonly<Ref<TableColumnData[]>>;
  operations: Readonly<Ref<TableOperationColumn[]>>;
  allColumns: Readonly<Ref<(TableColumnData | TableOperationColumn)[]>>;
  summarySpanMethod: Parameters<typeof useSpan>[0]["spanMethod"];
  getVirtualColumnStyle: (
    name: string | undefined,
  ) => CSSProperties | undefined;
  cellHeaders: (
    surface: "summary",
    start: number,
    span: number,
  ) => string | undefined;
  handleRowClick: (record: TableDataWithRaw, event: Event) => void;
  summaryRef: Ref<HTMLElement | undefined>;
  hasScrollBar: Readonly<Ref<boolean>>;
  contentStyle: Readonly<Ref<CSSProperties | undefined>>;
  renderSemanticHeader: (surface: "summary") => VNodeChild;
}

/** Private full-Table adapter. Slots and refs keep their original owners. */
export function useSummaryRender(
  options: SummaryRenderOptions,
  cellEvents: SummaryCellEvents,
  renderColumns: () => VNodeChild,
) {
  const {
    props,
    slots,
    prefixCls,
    summaryData,
    dataColumns,
    operations,
    allColumns,
    summarySpanMethod,
    getVirtualColumnStyle,
    cellHeaders,
    handleRowClick,
    summaryRef,
    hasScrollBar,
    contentStyle,
    renderSemanticHeader,
  } = options;
  const { tableSpan: tableSummarySpan, removedCells: removedSummaryCells } =
    useSpan({
      spanMethod: summarySpanMethod,
      data: summaryData,
      columns: allColumns,
    });
  const renderSummaryRow = (record: TableDataWithRaw, rowIndex: number) => {
    return (
      <Tr
        v-slots={{
          tr: slots.tr,
        }}
        key={`table-summary-${rowIndex}`}
        class={[
          `${prefixCls}-tr-summary`,
          isFunction(props.rowClass)
            ? props.rowClass(record.raw, rowIndex)
            : props.rowClass,
        ]}
        // @ts-ignore
        onClick={(ev: Event) => handleRowClick(record, ev)}
      >
        {operations.value.map((operation, index) => {
          const cellId = `${rowIndex}-${index}-${record.key}`;
          const [rowspan, colspan] = tableSummarySpan.value[cellId] ?? [1, 1];

          if (removedSummaryCells.value.includes(cellId)) {
            return null;
          }

          const style = getVirtualColumnStyle(operation.name);

          return (
            <OperationTd
              headers={cellHeaders("summary", index, colspan)}
              style={style}
              operationColumn={operation}
              operations={operations.value}
              record={record}
              rowSpan={rowspan}
              colSpan={colspan}
              summary
            />
          );
        })}
        {dataColumns.value.map((column, index) => {
          const cellId = `${rowIndex}-${operations.value.length + index}-${record.key}`;
          const [rowspan, colspan] = tableSummarySpan.value[cellId] ?? [1, 1];

          if (removedSummaryCells.value.includes(cellId)) {
            return null;
          }

          const style = getVirtualColumnStyle(getColumnLayoutKey(column));

          return (
            <Td
              headers={cellHeaders(
                "summary",
                operations.value.length + index,
                colspan,
              )}
              v-slots={{
                td: slots.td,
                cell: slots["summary-cell"],
                // Preserve the compiled SSR slot while forwarding it to Td.
                _: 2,
              }}
              key={`td-${cellId}`}
              style={style}
              rowIndex={rowIndex}
              record={record}
              column={column}
              operations={operations.value}
              dataColumns={dataColumns.value}
              rowSpan={rowspan}
              colSpan={colspan}
              summary
              {...cellEvents(record, column)}
            />
          );
        })}
      </Tr>
    );
  };

  const renderSummary = () => {
    if (summaryData.value.length > 0) {
      return (
        <tfoot>
          {summaryData.value.map((data, index) =>
            renderSummaryRow(data, index),
          )}
        </tfoot>
      );
    }
    return null;
  };

  const renderSummaryPanel = () =>
    summaryData.value.length > 0 && (
      <div
        ref={summaryRef}
        class={`${prefixCls}-tfoot`}
        style={{
          overflowY: hasScrollBar.value ? "scroll" : "hidden",
        }}
      >
        <table
          class={`${prefixCls}-element`}
          style={contentStyle.value}
          cellpadding={0}
          cellspacing={0}
        >
          {renderColumns()}
          {renderSemanticHeader("summary")}
          {renderSummary()}
        </table>
      </div>
    );
  return { render: renderSummary, panel: renderSummaryPanel };
}
