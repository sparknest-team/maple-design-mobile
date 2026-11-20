import { ref, watch, onActivated, onDeactivated, onBeforeUnmount } from 'vue'
import type { TableData, TableDataWithRaw } from '../../types'
import type { TableContext } from '../../context'

export function useCellLoad(props: { readonly record: TableDataWithRaw }, tableCtx: Partial<TableContext>) {
    const isLoading = ref(false);
    let lazyActive = true;
    let lazyRun = 0;
    const cancelLazyLoad = () => { lazyRun++; isLoading.value = false; };
    watch([() => props.record?.raw, () => props.record?.key, () => props.record?.isLeaf, () => props.record?.children, () => tableCtx.loadMore], cancelLazyLoad, { flush: 'sync' });
    onActivated(() => { lazyActive = true; });
    const stopLazyLoad = () => { lazyActive = false; cancelLazyLoad(); };
    onDeactivated(stopLazyLoad);
    onBeforeUnmount(stopLazyLoad);
    const handleClick = (ev: Event) => {
      ev.stopPropagation();
      const record = props.record;
      const loader = tableCtx.loadMore;
      if (!lazyActive || isLoading.value || typeof loader !== 'function' || record.isLeaf || record.children) return;
      const run = ++lazyRun;
      let settled = false;
      isLoading.value = true;
      const done = (children?: TableData[]) => {
        if (settled) return;
        settled = true;
        if (!lazyActive || run !== lazyRun || props.record.raw !== record.raw || props.record.key !== record.key || tableCtx.loadMore !== loader) return;
        isLoading.value = false;
        if (children !== undefined) tableCtx.addLazyLoadData?.(children, record);
      };
      try {
        const result = loader(record.raw, done) as unknown;
        if (result && typeof (result as PromiseLike<unknown>).then === 'function') {
          return Promise.resolve(result).catch((error) => { done(); throw error; });
        }
      } catch (error) {
        done();
        throw error;
      }
    };

  return { isLoading, handleClick }
}
