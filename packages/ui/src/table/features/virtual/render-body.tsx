import type {
  ComponentPublicInstance,
  CSSProperties,
  Ref,
  VNodeChild,
} from "vue";
import type { TableDataWithRaw } from "../../types";
import type {
  VirtualRange,
  VirtualRowPlan,
  VirtualRowPositions,
} from "./row-plan";
import { createVirtualRowPlanner } from "./row-plan";
import { useI18n } from "../../mobile-locale";
import VirtualList from "../../../_components/virtual-list-v2";
import { firstStructuralNode } from "../../structural-slot";

/** Native VirtualList adapter, not a wrapper component or a second data owner. */
export function createVirtualBody<Detail>(
  options: Parameters<typeof createVirtualRowPlanner<Detail>>[0] & {
    prefixCls: string;
    tbodyComRef: Ref<HTMLElement | ComponentPublicInstance | undefined>;
    contentStyle: Readonly<Ref<CSSProperties | undefined>>;
    renderSemanticHeader: (
      surface: "body",
      positions?: VirtualRowPositions<Detail>,
    ) => VNodeChild;
    renderRecord: (
      item: TableDataWithRaw,
      index: number,
      options: { positions?: VirtualRowPositions<Detail> },
    ) => VNodeChild;
    onTbodyScroll: (event: Event) => void;
  },
) {
  const {
    props,
    slots,
    prefixCls,
    flattenData,
    tbodyComRef,
    contentStyle,
    renderSemanticHeader,
    renderRecord,
    onTbodyScroll,
  } = options;
  const { t } = useI18n();
  const calculateVirtualRowPositions = createVirtualRowPlanner(options);
  const renderVirtualBody = (
    positions?: VirtualRowPositions<Detail>,
    prepareRange?: VirtualRowPlan<Detail>["prepareRange"],
  ) => (
    <VirtualList
      v-slots={{
        "list-prefix": ({ range }: { range?: VirtualRange<Detail> }) =>
          renderSemanticHeader("body", range?.positions ?? positions),
        item: ({
          item,
          index,
          range,
        }: {
          range?: VirtualRange<Detail>;
          item: TableDataWithRaw;
          index: number;
        }) =>
          renderRecord(item, index, {
            positions: range?.positions ?? positions,
          }),
      }}
      ref={tbodyComRef}
      {...{ role: "region", tabindex: 0, "aria-label": t("table.scrollable") }}
      class={`${prefixCls}-body`}
      data={flattenData.value as any}
      itemKey="key"
      component={{
        list: "table",
        content:
          props.virtualListProps?.component === undefined
            ? (firstStructuralNode(slots.tbody?.()) ?? "tbody")
            : "tbody",
      }}
      listAttrs={{
        class: `${prefixCls}-element`,
        style: contentStyle.value,
        "aria-rowcount": positions?.rowCount,
      }}
      paddingPosition="list"
      height="auto"
      {...props.virtualListProps}
      prepareRange={prepareRange}
      onScroll={onTbodyScroll}
    />
  );
  return { plan: calculateVirtualRowPositions, render: renderVirtualBody };
}
