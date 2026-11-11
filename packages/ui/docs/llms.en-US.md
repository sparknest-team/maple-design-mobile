# LLM documentation

Maple Design Mobile provides plain text and Markdown documentation for large language models (LLMs), including guides, component APIs and Vue examples. Give an AI coding assistant the online URLs so it can consult the documentation before writing code.

## Online documentation

Assistants that can read web pages can access these URLs directly. **Start with the index and read the component pages relevant to your task.**

| Document | Online URL | When to use |
| --- | --- | --- |
| Documentation index | [https://maple.show/llms.txt](https://maple.show/llms.txt) | Find guides and individual component Markdown pages; recommended starting point |
| Full documentation | [https://maple.show/llms-full.txt](https://maple.show/llms-full.txt) | Read all documentation and examples when the tool has enough context capacity |

Each component in the index has its own Markdown URL. Open it, give it to an assistant, or save it locally.

## Use with an AI assistant

### Provide the documentation URL

Copy this prompt and add your requirements at the end:

```text
Use Maple Design Mobile and Vue 3 to implement my requirements.
Read the official documentation index first: https://maple.show/llms.txt
Then read the quick start and relevant component pages. Check installation, imports and styles.
Use only the documented props, events, slots and examples.
If an API is not documented, say so instead of guessing.

My requirements:
```

### Add project reference material

If your coding assistant supports documentation sources, add the online index URL above. In your project instructions, ask it to consult the official documentation when using `@maple-design/ui-vue`.

If the tool cannot access the web, save the files you need as `.txt` or `.md` and attach them to your task. The full document may exceed tool reading limits; prefer the index and individual pages for focused tasks.

## Choose a language

| Language | Documentation index | Full documentation |
| --- | --- | --- |
| 中文 | [https://maple.show/llms.zh-CN.txt](https://maple.show/llms.zh-CN.txt) | [https://maple.show/llms-full.zh-CN.txt](https://maple.show/llms-full.zh-CN.txt) |
| English | [https://maple.show/llms.en-US.txt](https://maple.show/llms.en-US.txt) | [https://maple.show/llms-full.en-US.txt](https://maple.show/llms-full.en-US.txt) |

Language-specific files only include authored documentation in that language. Missing translations are not generated automatically. Use the combined index above to find all available pages.

## Content and updates

Files are generated from the guides and component documentation. API tables are retained and Demo references are expanded to Vue source. Relative imports inside examples remain relative to their annotated source paths.

Files are regenerated during each documentation site build and deployed with the site. Check that the documentation matches your installed library version.
