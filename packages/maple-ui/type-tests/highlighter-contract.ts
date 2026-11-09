import type { CodeToHtmlOptions, Highlighter } from '@maple-design/ui'
import type {
  Highlighter as EntryHighlighter,
  CodeToHtmlOptions as EntryOptions,
} from '@maple-design/ui/highlighter-provider'

const options: EntryOptions = { lang: 'typescript', theme: 'light' }
const sync: Highlighter = { codeToHtml: (code: string, _options: CodeToHtmlOptions) => code }
const asyncHighlighter: EntryHighlighter = { codeToHtml: async (code) => code }
// @ts-expect-error A highlighter must return a string, synchronously or asynchronously.
const invalid: Highlighter = { codeToHtml: () => 123 }
void [options, sync, asyncHighlighter, invalid]
