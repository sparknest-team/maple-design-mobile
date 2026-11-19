import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'

const messages = {
  'en-US': {
    textareaAutoSizeInline: {
      firstLine: 'First line',
      nativeThreeRows: 'Native three rows',
      growWithContent: 'Grow with content',
      fillSixLines: 'Fill six lines',
      toggleRowLimit: 'Toggle row limit:',
    },
    searchNativeFormInline: {
      toggleWaiting: 'Toggle waiting',
      toggleLoadingLayout: 'Toggle loading layout',
      keywords: 'Keywords',
      captureNativeForm: 'Capture native form',
      readingPreview: 'Reading preview',
      editInHistoryThenSubmit: 'Edit in history, then submit one native keyword value.',
      editsUpdateImmediatelyNativeRequired:
        'Edits update immediately; native required validation belongs to this form.',
    },
  },
  'zh-CN': {
    textareaAutoSizeInline: {
      firstLine: '第一行',
      nativeThreeRows: '原生三行',
      growWithContent: '随内容增高',
      fillSixLines: '填入六行',
      toggleRowLimit: '切换行数上限',
    },
    searchNativeFormInline: {
      toggleWaiting: '切换等待',
      toggleLoadingLayout: '切换加载布局',
      keywords: '关键词',
      captureNativeForm: '记录原生表单',
      readingPreview: '阅读预览',
      editInHistoryThenSubmit: '编辑历史弹层后提交，关键词只提交一份。',
      editsUpdateImmediatelyNativeRequired: '输入即时更新；HTML 必填校验关联此表单。',
    },
  },
}

export function useDemoLocale<K extends keyof (typeof messages)['zh-CN']>(scope: K) {
  const language = ref<'en-US' | 'zh-CN'>('zh-CN')
  watchLang((value) => {
    language.value = value === 'en-US' ? value : 'zh-CN'
  })
  return computed(() => messages[language.value][scope])
}
