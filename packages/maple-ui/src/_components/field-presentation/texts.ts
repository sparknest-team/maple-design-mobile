import { computed } from 'vue'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { fieldGlobalText as t } from './default-texts'

export function useFieldTexts() {
  const { t: translate } = injectLocaleProvider()
  return {
    input: computed(() => translate?.('fieldPresentation.input') ?? t('fieldPresentation.input')),
    select: computed(() => translate?.('pickerTitle') ?? t('pickerTitle')),
    edit: computed(() => translate?.('fieldPresentation.edit') ?? t('fieldPresentation.edit')),
    close: computed(() => translate?.('fieldPresentation.close') ?? t('fieldPresentation.close')),
    search: computed(() => translate?.('fieldPresentation.search') ?? t('fieldPresentation.search')),
    clear: computed(() => translate?.('common.clear') ?? t('common.clear')),
    selectionCount: computed(
      () => translate?.('fieldPresentation.selectionCount') ?? t('fieldPresentation.selectionCount'),
    ),
    selectionRemove: computed(
      () => translate?.('fieldPresentation.selectionRemove') ?? t('fieldPresentation.selectionRemove'),
    ),
    selectionBack: computed(
      () => translate?.('fieldPresentation.selectionBack') ?? t('fieldPresentation.selectionBack'),
    ),
    selectionEmpty: computed(
      () => translate?.('fieldPresentation.selectionEmpty') ?? t('fieldPresentation.selectionEmpty'),
    ),
    selected: computed(() => translate?.('fieldPresentation.selected') ?? t('fieldPresentation.selected')),
    limit: computed(() => translate?.('fieldPresentation.limit') ?? t('fieldPresentation.limit')),
  }
}
