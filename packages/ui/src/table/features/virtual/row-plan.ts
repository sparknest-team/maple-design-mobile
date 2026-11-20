import type { ExtractPropTypes, Ref, Slots, VNodeChild } from "vue";
import type { tableProps } from "../../props";
import type { TableDataWithRaw } from "../../types";
import type { VirtualListProps } from "../../../_components/virtual-list-v2/interface";
import { isFunction } from "../../../_utils/is";

type RowKey = TableDataWithRaw["key"];
export interface VirtualRowPositions<Detail = VNodeChild> {
  indices: Map<RowKey, number>;
  extraIndices: Map<RowKey, number>;
  details: Map<RowKey, Detail>;
  rowCount: number;
}
export interface VirtualRange<Detail = VNodeChild> {
  positions?: VirtualRowPositions<Detail>;
  listAttrs: { "aria-rowcount": number };
}
export interface VirtualRowPlan<Detail = VNodeChild> {
  positions?: VirtualRowPositions<Detail>;
  prepareRange?: (items: TableDataWithRaw[]) => VirtualRange<Detail>;
}

/** Snapshot once per Table render, never compute offscreen business content. */
export function createVirtualRowPlanner<Detail>(options: {
  props: Pick<
    ExtractPropTypes<typeof tableProps>,
    "virtualListProps" | "showHeader" | "expandable"
  >;
  slots: Slots;
  flattenData: Readonly<Ref<TableDataWithRaw[]>>;
  displayHeaderRows: Readonly<Ref<unknown[]>>;
  expandedRowKeys: Readonly<Ref<(string | number)[]>>;
  showEmptyTree: Readonly<Ref<boolean>>;
  renderExpandContent: (record: TableDataWithRaw) => Detail;
}) {
  const {
    props,
    slots,
    flattenData,
    displayHeaderRows,
    expandedRowKeys,
    showEmptyTree,
    renderExpandContent,
  } = options;
  const calculateVirtualRowPositions = ():
    VirtualRowPlan<Detail> | undefined => {
    const virtual = props.virtualListProps as
      (VirtualListProps & { listAttrs?: unknown }) | undefined;
    if (
      !virtual ||
      !flattenData.value.length ||
      slots.tr ||
      slots.tbody ||
      virtual.data !== undefined ||
      virtual.component !== undefined ||
      virtual.listAttrs !== undefined ||
      (virtual.threshold && flattenData.value.length <= virtual.threshold)
    )
      return undefined;
    const headerRows = props.showHeader ? displayHeaderRows.value.length : 0;
    const expanded = new Set(expandedRowKeys.value);
    let firstOptionalIndex = Infinity;
    let optionalCount = 0;
    const createPositions = (
      rowCount: number,
    ): VirtualRowPositions<Detail> => ({
      indices: new Map(),
      extraIndices: new Map(),
      details: new Map(),
      rowCount,
    });
    const visit = (
      records: TableDataWithRaw[],
      positions: VirtualRowPositions<Detail>,
      renderDetails: boolean,
    ): boolean => {
      for (const record of records) {
        if (positions.indices.has(record.key)) return false;
        positions.indices.set(record.key, ++positions.rowCount);
        if (!expanded.has(record.key)) continue;
        if (record.hasSubtree) {
          if (record.children?.length === 0 && showEmptyTree.value)
            positions.extraIndices.set(record.key, ++positions.rowCount);
          else if (
            record.children &&
            !visit(record.children, positions, renderDetails)
          )
            return false;
        } else if (
          isFunction(record.expand) ||
          (!record.expand &&
            !slots["expand-row"] &&
            props.expandable?.expandedRowRender)
        ) {
          if (renderDetails) {
            const content = renderExpandContent(record);
            positions.details.set(record.key, content);
            if (content)
              positions.extraIndices.set(record.key, ++positions.rowCount);
          } else {
            firstOptionalIndex = Math.min(
              firstOptionalIndex,
              positions.rowCount,
            );
            optionalCount++;
          }
        } else if (record.expand || slots["expand-row"])
          positions.extraIndices.set(record.key, ++positions.rowCount);
      }
      return true;
    };
    // Use stable keys across server-rendered virtual items. This pass counts
    // unconditional rows once, without invoking any business callbacks.
    const baseline = createPositions(headerRows);
    if (!visit(flattenData.value, baseline, false)) return undefined;
    if (!optionalCount) return { positions: baseline };
    const prepareRange = (items: TableDataWithRaw[]): VirtualRange<Detail> => {
      const firstIndex = items.length
        ? baseline.indices.get(items[0].key)
        : undefined;
      if (firstIndex === undefined || firstOptionalIndex < firstIndex) {
        // An offscreen predecessor can change the position of every visible row.
        return { listAttrs: { "aria-rowcount": -1 } };
      }
      const positions = createPositions(firstIndex - 1);
      visit(items, positions, true);
      const total =
        positions.details.size === optionalCount
          ? baseline.rowCount +
            Array.from(positions.details.values()).filter(Boolean).length
          : -1;
      positions.rowCount = total;
      return { positions, listAttrs: { "aria-rowcount": total } };
    };
    return { prepareRange };
  };
  return calculateVirtualRowPositions;
}
