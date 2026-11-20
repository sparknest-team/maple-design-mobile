import { ref, toRaw, watch, onActivated, onDeactivated, onBeforeUnmount } from 'vue'
import type { ExtractPropTypes } from 'vue'
import type { tableProps } from '../../props'
import type { TableData, TableDataWithRaw } from '../../types'

export function useLazyData(props: Pick<ExtractPropTypes<typeof tableProps>, 'data' | 'rowKey' | 'loadMore'>) {
    const lazyLoadRevision = ref(0);
    let lazyLoadData = new WeakMap<TableData, { key: string; children: TableData[] }>();
    let lazyActive = true;
    onActivated(() => { lazyActive = true; });
    onDeactivated(() => { lazyActive = false; });
    onBeforeUnmount(() => { lazyActive = false; lazyLoadData = new WeakMap(); });
    watch([() => props.loadMore, () => props.rowKey], () => {
      lazyLoadData = new WeakMap();
      lazyLoadRevision.value++;
    }, { flush: 'sync' });
    const getLazyChildren = (record: TableData) => {
      const cached = lazyLoadData.get(toRaw(record));
      return cached && cached.key === record[props.rowKey] ? cached.children : undefined;
    };
    const ownsLazyRecord = (record: TableDataWithRaw) => {
      const expected = toRaw(record.raw);
      if (expected[props.rowKey] !== record.key) return false;
      const seen = new Set<TableData>();
      const contains = (data: TableData[]): boolean => {
        for (const item of data) {
          const raw = toRaw(item);
          if (seen.has(raw)) continue;
          seen.add(raw);
          if (raw === expected) return true;
          const children = item.children ?? getLazyChildren(item);
          if (children && contains(children)) return true;
        }
        return false;
      };
      return contains(props.data ?? []);
    };
    const addLazyLoadData = (children: TableData[] | undefined, record: TableDataWithRaw) => {
      if (lazyActive && children && ownsLazyRecord(record)) {
        lazyLoadData.set(toRaw(record.raw), { key: record.key, children });
        lazyLoadRevision.value++;
      }
    };

  return { lazyLoadRevision, getLazyChildren, addLazyLoadData }
}
